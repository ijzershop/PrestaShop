/**
 * Supply a Playwright Page and JSON from `php tests/koopman-return-ui-test.php --fixture`.
 * Uses a separate page, the real jQuery/Koopman scripts, rendered forms and fake AJAX.
 * All network requests are blocked. No shop login or carrier connection is needed.
 */
module.exports = async function testKoopmanReturnUi(page, assets) {
  const testPage = await page.context().newPage();
  const errors = [];
  testPage.on('pageerror', error => errors.push(error.message));
  await testPage.route('**/*', route => route.abort());
  try {
    await testPage.setContent('<!doctype html><html><body><div class="fancybox-inner" style="height:300px;overflow:auto;"><div id="form-host"></div></div></body></html>');
    await testPage.addScriptTag({content: assets.jquery});
    await testPage.evaluate(() => {
      $.fancybox = options => { window.retourFancyboxOptions = options; };
      window.retourCloseCount = 0;
      $.fancybox.close = () => { window.retourCloseCount++; };
      window.retourLayoutUpdates = 0;
      $.fancybox.update = () => { window.retourLayoutUpdates++; };
      window.retourRequests = [];
      $.ajax = options => {
        const deferred = $.Deferred();
        window.retourRequests.push({options, deferred});
        return deferred.promise();
      };
    });
    await testPage.addScriptTag({content: assets.koopman});
    await testPage.evaluate(() => new Promise(resolve => $(resolve)));
    const result = await testPage.evaluate(forms => {
      let checks = 0;
      function check(ok, description) {
        if (!ok) {
          throw new Error(description);
        }
        checks++;
      }
      function resetForm(state = 'new') {
        $('#form-host').html(forms[state]);
        return $('#retourForm');
      }
      function fillPackages($form) {
        $form.find('[name="collie_type[]"]').val('envelope').trigger('change');
        $form.find('[name="collie_length[]"], [name="collie_width[]"], [name="collie_height[]"]').val('10');
        $form.find('[name="collie_weight[]"]').val('2.5');
      }
      function dimensions($row) {
        return ['length', 'width', 'height'].map(name => $row.find('[name="collie_' + name + '[]"]').val());
      }
      function checkDimensions($row, expected, description) {
        check(JSON.stringify(dimensions($row)) === JSON.stringify(expected.map(String)), description);
      }
      const presets = {
        envelope: [25, 30, 0.5],
        plaat: [100, 50, 0.5],
        '1-meter': [100, 20, 5],
        '2-meter': [200, 25, 5],
        pallet: [200, 30, 30],
        'plaat-pallet': [100, 50, 15],
        'balk-pallet': [200, 15, 15],
      };
      let $form = resetForm();
      // The grid inserts/replaces these buttons after page initialization.
      $('<button class="createRetour" data-order-id="123" data-retour-url="/admin/returns?token=test"><i class="material-icons">undo</i></button>').appendTo('body').trigger('click');
      check(window.retourFancyboxOptions.href === '/admin/returns?token=test&id_order=123', 'delegated button uses authenticated URL');
      window.retourFancyboxOptions.afterShow();
      check($form.find('#new_collies .parentRow').length === 1, 'opening form adds one editable package');
      const $firstRow = $form.find('#new_collies .parentRow').first();
      const $type = $firstRow.find('[name="collie_type[]"]');
      const $weight = $firstRow.find('[name="collie_weight[]"]');
      check($type.val() === '' && dimensions($firstRow).every(value => value === '') && $weight.val() === '', 'new package starts without a preset or invented weight');
      check($type.find('option').map((index, option) => option.value).get().join(',') === ',' + Object.keys(presets).join(','), 'package selector exposes all seven local names');
      for (const [type, base] of Object.entries(presets)) {
        for (const weight of ['', '0', '-1']) {
          $weight.val(weight);
          $type.val(type).trigger('change');
          checkDimensions($firstRow, base, type + ' uses base dimensions for weight ' + JSON.stringify(weight));
          check($weight.val() === weight, type + ' leaves entered weight unchanged');
        }
      }
      // Literal expected dimensions exercise both minimum-height and calculated-height branches.
      const weightedDimensions = {
        envelope: [[10, [25, 30, 53.33]], [0.13, [25, 30, 0.69]], [0.01, [25, 3.2, 0.5]]],
        plaat: [[10, [100, 50, 8]], [0.13, [100, 10.4, 0.5]], [0.01, [100, 0.8, 0.5]]],
        '1-meter': [[10, [100, 20, 20]], [0.13, [100, 1.04, 5]], [0.01, [100, 0.08, 5]]],
        '2-meter': [[10, [200, 25, 8]], [0.13, [200, 0.52, 5]], [0.01, [200, 0.04, 5]]],
      };
      for (const [type, samples] of Object.entries(weightedDimensions)) {
        $type.val(type).trigger('change');
        for (const [weight, expected] of samples) {
          $weight.val(String(weight)).trigger('input');
          checkDimensions($firstRow, expected, type + ' recalculates and rounds dimensions for ' + weight + ' kg');
          check($weight.val() === String(weight), type + ' preserves actual weight during calculation');
          check($form[0].checkValidity(), type + ' calculated dimensions satisfy browser constraints at ' + weight + ' kg');
        }
      }
      $weight.val('0.13').trigger('change');
      for (const [type, expected] of Object.entries({envelope: [25, 30, 0.69], plaat: [100, 10.4, 0.5], '1-meter': [100, 1.04, 5], '2-meter': [200, 0.52, 5]})) {
        $type.val(type).trigger('change');
        checkDimensions($firstRow, expected, 'switch to ' + type + ' recalculates using the retained weight');
        check($weight.val() === '0.13', 'switch to ' + type + ' retains the entered weight');
      }
      for (const type of ['pallet', 'plaat-pallet', 'balk-pallet']) {
        $type.val(type).trigger('change');
        for (const weight of ['0.13', '120']) {
          $weight.val(weight).trigger('change');
          checkDimensions($firstRow, presets[type], type + ' dimensions stay fixed at ' + weight + ' kg');
          check($weight.val() === weight, type + ' never replaces the actual weight');
        }
      }
      $weight.val('10');
      $type.val('envelope').trigger('change');
      for (const [index, name] of ['length', 'width', 'height'].entries()) {
        const $input = $firstRow.find('[name="collie_' + name + '[]"]');
        check(!$input.prop('readonly') && !$input.prop('disabled'), name + ' remains editable after calculation');
        $input.val(String(31 + index)).trigger('input').trigger('change');
      }
      check(dimensions($firstRow).join(',') === '31,32,33', 'manual dimensions are preserved through their own input events');
      $firstRow.find('[name="collie_total[]"]').val('2').trigger('change');
      $form.find('[name="order_msg"]').val('Ophalen bij voordeur').trigger('input');
      check(dimensions($firstRow).join(',') === '31,32,33', 'quantity and driver-message edits preserve manual dimensions');
      $form.find('#addNewCollie').trigger('click');
      const $secondRow = $form.find('#new_collies .parentRow').last();
      check($form.find('#new_collies .parentRow').length === 2 && dimensions($firstRow).join(',') === '31,32,33', 'adding a row leaves existing manual dimensions alone');
      check($secondRow.find('[name="collie_type[]"]').val() === '' && $secondRow.find('[name="collie_weight[]"]').val() === '' && dimensions($secondRow).every(value => value === ''), 'additional row starts independently blank');
      $secondRow.find('[name="collie_weight[]"]').val('0.13');
      $secondRow.find('[name="collie_type[]"]').val('plaat').trigger('change');
      checkDimensions($secondRow, [100, 10.4, 0.5], 'second row computes its own dimensions');
      check(dimensions($firstRow).join(',') === '31,32,33' && $type.val() === 'envelope' && $weight.val() === '10', 'second-row type changes leave first row unchanged');
      $weight.val('0.13').trigger('change');
      checkDimensions($firstRow, [25, 30, 0.69], 'weight edit replaces manual dimensions with a fresh calculation');
      checkDimensions($secondRow, [100, 10.4, 0.5], 'first-row weight change leaves second row unchanged');
      $firstRow.find('[name="collie_length[]"]').val('42');
      $type.val('1-meter').trigger('change');
      checkDimensions($firstRow, [100, 1.04, 5], 'type edit replaces manual dimensions with a fresh calculation');
      for (const lockedState of ['booking', 'blocked']) {
        const before = dimensions($firstRow).join(',');
        $form.data(lockedState, true);
        $type.val('envelope').trigger('change');
        $weight.val('20').trigger('input').trigger('change');
        $form.find('#addNewCollie').trigger('click');
        check(dimensions($firstRow).join(',') === before && $form.find('#new_collies .parentRow').length === 2, lockedState + ' blocks dimension recalculation and row additions');
        $form.data(lockedState, false);
      }
      $secondRow.find('.removeCollieRow').trigger('click');
      check($form.find('#new_collies .parentRow').length === 1, 'removing one package leaves the other row available');
      fillPackages($form);
      $type.val('').trigger('change');
      $form.trigger('submit');
      check(window.retourRequests.length === 0, 'placeholder cannot submit despite valid dimensions and weight');
      $type.val('envelope').trigger('change');
      $weight.val('');
      $form.trigger('submit');
      check(window.retourRequests.length === 0, 'invalid package prevents AJAX');
      fillPackages($form);
      $form.trigger('submit');
      $form.trigger('submit');
      check(window.retourRequests.length === 1, 'double submit books once');
      check($form.find('fieldset').prop('disabled') && !window.retourFancyboxOptions.beforeClose(), 'form and close lock during booking');
      const first = window.retourRequests[0];
      const data = new URLSearchParams(first.options.data);
      check(first.options.type === 'POST' && first.options.dataType === 'json', 'booking uses JSON POST response');
      check(data.get('token') && data.get('request_key') === '0123456789' && data.get('id_order') === '123', 'POST keeps authentication and duplicate protection fields');
      check(data.getAll('collie_type[]').join(',') === 'envelope' && data.getAll('collie_weight[]').join(',') === '2.5', 'serializes exactly the visible package using its local name');
      first.deferred.resolve({success: false, message: '<img src=x onerror=alert(1)>'});
      check(!$form.find('fieldset').prop('disabled') && window.retourFancyboxOptions.beforeClose(), 'validation failure allows correction');
      check(!$form.find('.messages img').length && $form.find('.messages').text().includes('<img'), 'carrier error is displayed as text');
      $form.trigger('submit');
      window.retourRequests[1].deferred.resolve({success: false, blocked: true, message: 'Controleer bij Koopman'});
      $form.trigger('submit');
      check(window.retourRequests.length === 2 && $form.find('fieldset').prop('disabled'), 'uncertain carrier response blocks retry');

      $form = resetForm();
      for (const type of Object.keys(presets)) {
        $form.find('#addNewCollie').trigger('click');
        const $row = $form.find('#new_collies .parentRow').last();
        $row.find('[name="collie_weight[]"]').val('2.5');
        $row.find('[name="collie_type[]"]').val(type).trigger('change');
      }
      $('.fancybox-inner').scrollTop(500);
      check($('.fancybox-inner').scrollTop() > 0, 'long form scroll fixture');
      $form.trigger('submit');
      const allPackageData = new URLSearchParams(window.retourRequests[2].options.data);
      check(allPackageData.getAll('collie_type[]').join(',') === Object.keys(presets).join(','), 'booking sends all seven local package names in row order');
      check(allPackageData.getAll('collie_weight[]').length === 7 && allPackageData.getAll('collie_weight[]').every(value => value === '2.5'), 'booking keeps each package weight instead of a calculated or shared weight');
      window.retourRequests[2].deferred.resolve({
        success: true, message: 'Aangemaakt', tracking_number: '<b>RETURN123</b>',
        tracking_url: 'https://tracking.example/RETURN123',
        return_id: 456, send_url: 'https://shop.example/admin/return/send', customer_email: 'customer@example.com',
        notification: {status: 'unsent', can_send: true, message: ''},
        labels: [
          {url: 'https://shop.example/admin/return-label?id=123', preview_url: 'https://shop.example/admin/preview?id=123', label: '<img src=x>'},
          {url: 'https://shop.example/admin/return-label?id=124', preview_url: 'https://shop.example/admin/preview?id=124', label: 'Label 2'},
          {url: 'javascript:alert(1)', label: 'Unsafe'},
        ],
      });
      check($form.find('fieldset').css('display') === 'none', 'successful booking hides create controls');
      check($form.find('.retour-result a').length === 3 && !$form.find('.retour-result img, .retour-result b').length, 'tracking and PDF links render safely');
      check(!$form.find('.retour-review-stage').prop('hidden') && $form.find('.retour-label-preview').attr('src') === 'https://shop.example/admin/preview?id=123', 'created PDF appears inside modal');
      check($('.fancybox-inner').scrollTop() === 0 && window.retourLayoutUpdates === 1, 'preview resets modal scroll and refreshes layout');
      check($form.find('#retour-preview-choice option').length === 2, 'multiple PDF labels can be reviewed');
      $form.find('#retour-preview-choice').val('1').trigger('change');
      check($form.find('.retour-label-preview').attr('src') === 'https://shop.example/admin/preview?id=124', 'label choice switches inline preview');
      check($form.find('.retour-email-recipient').text().includes('customer@example.com'), 'preview shows recipient');
      check($('.createRetour .material-icons').text() === 'done', 'grid reflects saved return');
      $form.trigger('submit');
      check(window.retourRequests.length === 3, 'booking success sends no email and saved form cannot book again');
      $form.find('.cancelRetourLabel').trigger('click');
      check(window.retourCloseCount === 1 && window.retourRequests.length === 3, 'Cancel closes modal without email or cancelling carrier booking');

      $form = resetForm();
      $form.find('#addNewCollie').trigger('click');
      fillPackages($form);
      $form.trigger('submit');
      window.retourRequests[3].deferred.reject({});
      $form.trigger('submit');
      check(window.retourRequests.length === 4 && $form.find('fieldset').prop('disabled'), 'lost confirmation requires reopening instead of retrying');
      check(!$form.data('booking') && window.retourFancyboxOptions.beforeClose(), 'failed network response still allows closing');

      for (const state of ['created', 'blocked']) {
        resetForm(state).trigger('submit');
        check(window.retourRequests.length === 4, state + ' rendered form never submits');
      }

      $form = resetForm('created');
      window.retourFancyboxOptions.afterShow();
      check($form.find('.retour-label-preview').length === 1 && window.retourRequests.length === 4, 'reopened return previews PDF without sending email');
      $form.find('.sendRetourToCustomer').trigger('click').trigger('click');
      check(window.retourRequests.length === 5, 'explicit send click sends once despite repeated clicks');
      check(!window.retourFancyboxOptions.beforeClose() && $form.find('.cancelRetourLabel').prop('disabled'), 'sending email locks modal closing');
      $form.find('.cancelRetourLabel').trigger('click');
      check(window.retourCloseCount === 1, 'in-flight Cancel cannot close modal');
      const email = window.retourRequests[4];
      check(email.options.type === 'POST' && email.options.url.includes('/admin/return/send') && email.options.data.id_order === '123' && email.options.data.return_id === '456' && email.options.data.token, 'email POST targets saved return with CSRF token');
      email.deferred.resolve({success: false, notification: {status: 'failed', can_send: true, message: '<img src=x onerror=alert(1)>'}});
      check(!$form.find('.sendRetourToCustomer').prop('disabled') && $form.find('.retour-label-preview').length === 1, 'known email failure permits retry and retains PDF');
      check(!$form.find('.retour-email-message img').length && $form.find('.retour-email-message').text().includes('<img'), 'email failure text is escaped');
      $form.find('.sendRetourToCustomer').trigger('click');
      window.retourRequests[5].deferred.resolve({success: true, notification: {status: 'sent', can_send: false, message: 'Verstuurd'}});
      $form.find('.sendRetourToCustomer').trigger('click');
      check(window.retourRequests.length === 6 && $form.find('.sendRetourToCustomer').prop('disabled') && $form.find('.sendRetourToCustomer').text() === 'Verstuurd', 'successful email cannot be sent again');
      check($form.find('.retour-label-preview').length === 1 && window.retourFancyboxOptions.beforeClose(), 'send success preserves preview and allows closing');

      $form = resetForm('created');
      window.retourFancyboxOptions.afterShow();
      $form.find('.sendRetourToCustomer').trigger('click');
      window.retourRequests[6].deferred.reject({});
      $form.find('.sendRetourToCustomer').trigger('click');
      check(window.retourRequests.length === 7 && $form.find('.sendRetourToCustomer').prop('disabled'), 'lost email confirmation blocks repeat send');
      $form.find('.cancelRetourLabel').trigger('click');
      check(window.retourCloseCount === 2 && window.retourRequests.length === 7, 'Cancel after email uncertainty only closes modal');

      for (const state of ['email_sent', 'email_sending', 'email_uncertain', 'email_missing']) {
        $form = resetForm(state);
        window.retourFancyboxOptions.afterShow();
        $form.find('.sendRetourToCustomer').trigger('click');
        check(window.retourRequests.length === 7 && $form.find('.sendRetourToCustomer').prop('disabled'), state + ' prevents sending on reopen');
      }
      check(!$form.find('.retour-label-preview').length && $form.find('.retour-preview-content').text().includes('geen PDF-label'), 'missing PDF provides a visible explanation');
      $form = resetForm('email_failed');
      window.retourFancyboxOptions.afterShow();
      $form.find('.sendRetourToCustomer').trigger('click');
      check(window.retourRequests.length === 8, 'known failed email may be retried after reopening');
      window.retourRequests[7].deferred.reject({responseJSON: {success: false, blocked: true, message: 'Controleer de e-mailstatus'}});
      check($form.find('.sendRetourToCustomer').prop('disabled'), 'ambiguous server email failure prevents resend');
      return {checks, simulatedRequests: window.retourRequests.length};
    }, assets.forms);
    if (errors.length) {
      throw new Error('Unexpected browser errors: ' + errors.join('; '));
    }
    return result;
  } finally {
    await testPage.close();
  }
};
