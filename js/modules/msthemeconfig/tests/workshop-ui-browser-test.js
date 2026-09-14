/**
 * Supply a Playwright Page and {jquery, koopman, template} source strings.
 * Uses the actual workshop modal markup and scripts with fake AJAX on a separate
 * page. All requests are blocked; no shop session or Trello connection is used.
 */
module.exports = async function testWorkshopUi(page, assets) {
  const testPage = await page.context().newPage();
  const errors = [];
  testPage.on('pageerror', error => errors.push(error.message));
  await testPage.route('**/*', route => route.abort());
  try {
    const start = assets.template.indexOf('<div class="modal fade" id="trelloModal"');
    const end = assets.template.indexOf('<div class="modal fade" id="updateAddressModal"', start);
    if (start < 0 || end < 0) {
      throw new Error('Workshop modal boundaries were not found in the production template');
    }
    // Translation expressions contain only display text; the actual modal DOM
    // (including its feedback element, fields and buttons) remains unchanged.
    const modal = assets.template.slice(start, end).replace(/\{\{[\s\S]*?\}\}/g, '');
    await testPage.setContent('<!doctype html><html><head><style>.d-none{display:none}</style></head><body>' +
      '<input id="employee-profile-id" value="1"><table><tbody id="orders"></tbody></table>' + modal + '</body></html>');
    await testPage.addScriptTag({content: assets.jquery});
    await testPage.evaluate(() => {
      window.token = 'fixture-token';
      window.workshopRequests = [];
      $.ajax = options => {
        const deferred = $.Deferred();
        window.workshopRequests.push({options, deferred});
        return deferred.promise();
      };
    });
    await testPage.addScriptTag({content: assets.koopman});
    await testPage.evaluate(() => new Promise(resolve => $(resolve)));
    const result = await testPage.evaluate(() => {
      let checks = 0;
      function check(ok, description) {
        if (!ok) {
          throw new Error(description);
        }
        checks++;
      }
      const fieldNames = ['trello_order', 'trello_type', 'trello_card_title', 'trello_card_descr', 'trello_card_lane'];
      function snapshot() {
        return fieldNames.map(name => $('#' + name).val()).join('\n');
      }
      function submit() {
        const before = window.workshopRequests.length;
        $('#trelloActionStatusAndCard').trigger('click');
        check(window.workshopRequests.length === before + 1, 'explicit submit sends one request');
        check($('#trelloFeedback').hasClass('d-none') && $('#trelloFeedback').text() === '', 'submit clears previous feedback');
        return window.workshopRequests[before];
      }
      function checkFailure(expectedText, previousFields, requestCount) {
        check($('#trelloFeedback').text() === expectedText, 'failure displays expected text');
        check($('#trelloFeedback').is(':visible'), 'failure feedback is visible inside the modal');
        check(snapshot() === previousFields, 'failure preserves order, description, title and chosen lane');
        check($('#trelloModal').length === 1 && $('#trelloActionStatusAndCard').length === 1, 'failure retains modal and submit controls');
        check(window.workshopRequests.length === requestCount, 'failure emits no extra request or status action');
      }
      check($('#trelloFeedback').length === 1 && $('#trelloFeedback').hasClass('d-none'), 'production template supplies hidden feedback');
      // Grid rows are also replaced dynamically after initialization.
      $('#orders').append('<tr><td class="column-reference">TESTORDER</td><td class="column-customer">Testklant</td>' +
        '<td class="column-label"><div class="workshop-btn" data-order="123"><input value="workshop"><label>Werkplaats</label></div></td></tr>');
      $('.workshop-btn label').trigger('click');
      check($('#trello_order').val() === '123' && $('#trello_type').val() === 'workshop', 'delegated opener selects the order and type');
      check($('#trello_card_title').val() === 'Werkzaamheden klant: Testklant voor bestelling TESTORDER', 'opener populates customer and order reference');
      check(window.workshopRequests.length === 0, 'opening the modal makes no API request');
      $('#trello_card_descr').val('Maak drie gaten van 8 mm.');
      $('#trello_card_lane').prop('selectedIndex', 1);
      const fields = snapshot();
      let request = submit();
      check(request.options.url.includes('method=workshop_status') && request.options.url.includes('id_order=123') && request.options.url.includes('token=fixture-token'), 'submit uses the workshop endpoint and selected order');
      check(request.options.data.type === 'statusandcard' && request.options.data.trello_order === '123', 'submit requests card and status together');
      check(request.options.data.trello_card_descr === 'Maak drie gaten van 8 mm.' && request.options.data.trello_card_lane === $('#trello_card_lane').val(), 'submit retains employee description and lane');
      const writeError = 'De orderbon kon niet worden opgeslagen. Neem contact op met de beheerder.';
      request.deferred.reject({status: 500, responseJSON: {error: writeError}});
      checkFailure(writeError, fields, 1);

      request = submit();
      request.deferred.resolve({error: writeError});
      checkFailure(writeError, fields, 2);

      request = submit();
      request.deferred.resolve(JSON.stringify({error: writeError}));
      checkFailure(writeError, fields, 3);

      const arbitraryError = '<img src=x onerror="window.workshopXss=true"><script>window.workshopXss=true</script>';
      request = submit();
      request.deferred.reject({status: 500, responseJSON: {error: arbitraryError}});
      checkFailure(arbitraryError, fields, 4);
      check($('#trelloFeedback').children().length === 0 && !window.workshopXss, 'server error is escaped instead of interpreted as HTML');

      request = submit();
      request.deferred.resolve('{broken JSON');
      checkFailure('De bevestiging kon niet worden gelezen. Controleer eerst de bestelling en Trello voordat je opnieuw verstuurt.', fields, 5);

      request = submit();
      request.deferred.reject({status: 0});
      checkFailure('De opdracht kon niet worden bevestigd. Controleer eerst de bestelling en Trello voordat je opnieuw verstuurt.', fields, 6);

      $('.workshop-btn label').trigger('click');
      check($('#trelloFeedback').hasClass('d-none') && $('#trelloFeedback').text() === '', 'reopening the workshop modal clears the previous error');
      check(window.workshopRequests.length === 6, 'reopening after failure does not repeat the request');
      return {checks, requests: window.workshopRequests.length};
    });
    // Allow pending navigation/script errors to surface before closing the page.
    await testPage.evaluate(() => new Promise(resolve => setTimeout(resolve, 0)));
    if (errors.length) {
      throw new Error(errors.join('\n'));
    }
    return result;
  } finally {
    await testPage.close();
  }
};
