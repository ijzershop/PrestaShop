$(function () {

  const MAX_PACKAGE_WEIGHT = 23;
  const VOLUME_MULTIPLIER = 250;
  const PALLET_THRESHOLD = 115;
  const ENVELOPE_WIDTH = 0.30;
  const ENVELOPE_LENGTH = 0.25;
  const MIN_ENVELOPE_HEIGHT = 0.005;
  const PLAAT_WIDTH = 0.50;
  const PLAAT_LENGTH = 1;
  const MIN_PLAAT_HEIGHT = 0.005;
  const METER_WIDTH = 0.20;
  const METER_LENGTH = 1;
  const MIN_METER_HEIGHT = 0.05;
  const METER_2_WIDTH = 0.25;
  const METER_2_LENGTH = 2;
  const MIN_METER_2_HEIGHT = 0.05;
  const COLLIE_WIDTH_THRESHOLD = 0.7;
  const COLLIE_HEIGHT_THRESHOLD = 0.7;
  /**
   * Show Fancybox to create a retour
   */
  $('.createRetour').on('click', function (event) {
    event.stopImmediatePropagation();
    let orderId = $(this).attr('data-order-id');
    let profileId = $('#employee-profile-id').val();

    $.fancybox({
      width: 800,
      height: 800,
      autoSize: false,
      href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId +
        '&method=orderretourinit&id_order=' + orderId + '&token=' + token,
      cache: false,
      type: 'ajax'
    });
    return false;
  });
  /**
   * Save the retour request
   */
  $(document).on('click', '.saveRetourRequest', function (event) {
    event.preventDefault();
    let orderId = $('form#retourForm [name="order_id"]').val();
    let profileId = $('#employee-profile-id').val();

    let data = $('form#retourForm').serialize();
    if ($('[name="collie_type[]"]').length <= 0) {
      return $('form#retourForm .messages').html('<h3 style="color:red;font-weight:bold;width:100%;text-align:center;">' +
        'Vul de pakketten in waar u een retour opdracht voor wilt maken</h3>');
    }

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId +
        '&method=orderretoursubmit&id_order=' + orderId + '&token=' + token,
      type: 'GET',
      data: data,
    }).done(function (e) {
      $('form#retourForm .messages').html(e);
      if(e.indexOf('De retour aanvraag is geslaagd') !== -1){
        setTimeout(function() {
          $('.fancybox-item.fancybox-close').trigger('click');
        }, 4000);
      }
    })
      .fail(function (e) {
        $('form#retourForm .messages').html(e);
      });
  });
  /**
   * Show the shipping state
   */
  $('.showShippingState').on('click', function (event) {
    event.stopImmediatePropagation();
    let reference = $(this).attr('data-order-reference');
    let profileId = $('#employee-profile-id').val();

    $.fancybox({
      width: 800,
      height: 800,
      autoSize: false,
      href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId +
        '&method=orderstatus&render_template=true&reference=' + reference + '&token=' + token,
      cache: false,
      type: 'ajax'
    });
    return false;
  });
  /**
   * Set order back to being prepared
   */
  $('div.beingprepared-btn label').click(function () {
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.beingprepared-btn');
    let idOrder = $btnRow.attr('data-order');
    let profileId = $('#employee-profile-id').val();

    setProcessingTimeOutButton($btnRow, idOrder, true);

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=beingprepared_status&id_order=' + idOrder + '&token=' + token,
      type: 'GET'
    }).done(function () {
      location.reload();

      setProcessingTimeOutButton($btnRow, idOrder, false);
    });
  });
  /**
   * Set order to workshop
   */
  $(document).on('click', 'div.workshop-btn label', function (e) {
    e.preventDefault();
    let $clickedLabel = $(this);
    let $input = $clickedLabel.prev('input');
    let $btnRow = $clickedLabel.closest('div.workshop-btn');
    let $tr = $clickedLabel.closest('.column-label').closest('TR');
    let idOrder = $btnRow.attr('data-order');
    let type = $input.val();
    let reference = $tr.find("td.column-reference").text().trim();
    let customer = $tr.find("td.column-customer").text().trim();
    $('#trello_order').val(idOrder);
    $('#trello_type').val(type);
    $('#trello_card_title').val('Werkzaamheden klant: ' + customer + ' voor bestelling ' + reference);
  });
  /**
   * Close the trello popup
   */
  $(document).on('click', '#trelloActionClose', function () {
    $('#trello_card_descr').val('');
    $('#trello_order').val('');
    $('#trello_type').val('');
    $('#trello_card_title').val('');
  });
  /**
   * Just send to trello
   */
  $(document).on('click', '#trelloActionOnlyStatus', function () {
    let trello_order = $('#trello_order').val();
    let profileId = $('#employee-profile-id').val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=workshop_status&id_order=' + trello_order + '&token=' + token,
      type: 'GET',
      data: {
        'type': 'status',
        'trello_order': trello_order
      }
    }).done(function () {
      location.reload();
    });
  });
  /**
   * Send to trello with extra data
   */
  $(document).on('click', '#trelloActionStatusAndCard', function () {
    let trello_card_descr = $('#trello_card_descr').val();
    let trello_order = $('#trello_order').val();
    let trello_type = $('#trello_type').val();
    let trello_card_lane = $('#trello_card_lane').val();
    let trello_title = $('#trello_card_title').val();
    let profileId = $('#employee-profile-id').val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=workshop_status&id_order=' + trello_order + '&token=' + token,
      type: 'GET',
      data: {
        'type': 'statusandcard',
        'trello_card_descr': trello_card_descr,
        'trello_order': trello_order,
        'trello_type': trello_type,
        'trello_card_lane': trello_card_lane,
        'trello_title': trello_title
      }
    }).done(function () {
      location.reload();
    });
  });
  /**
   * Set order in backorder button
   */
  $(document).on('click', 'div.backorder-btn label', function () {
    let profileId = $('#employee-profile-id').val();
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.backorder-btn');
    let idOrder = $btnRow.attr('data-order');
    setProcessingTimeOutButton($btnRow, idOrder, true);
    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=backorder_status&id_order=' + idOrder + '&token=' + token,
      type: 'GET'
    }).done(function () {
      location.reload();
    });
  });
  /**
   * Action Button ready for pickup
   */
  $(document).on('click', 'label.aftehalen', function () {
    let profileId = $('#employee-profile-id').val();
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.aftehalen-btn');
    let idOrder = $btnRow.attr('data-order');

    setProcessingTimeOutButton($btnRow, idOrder, true);

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=afhalen&id_order=' + idOrder + '&token=' + token,
      type: 'GET'
    }).done(function (data) {
      $('form#retourForm .messages').html(data);
      location.reload();
      setProcessingTimeOutButton($btnRow, order, false);
    });
  });
  /**
   * Action Button is picked up
   */
  $(document).on('click', 'div.afgehaald-btn label', function () {
    let profileId = $('#employee-profile-id').val();
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.afgehaald-btn');
    let idOrder = $btnRow.attr('data-order');

    setProcessingTimeOutButton($btnRow, idOrder, true);
    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=afgehaald&id_order=' + idOrder + '&token=' + token,
      type: 'GET'
    }).done(function (data) {
      $('form#retourForm .messages').html(data);
      location.reload();
      setProcessingTimeOutButton($btnRow, idOrder, false);
    });
  });
  /**
   * Action Button is packed and added to order
   */
  $(document).on('click', 'div.toegevoegd-btn label', function () {
    let profileId = $('#employee-profile-id').val();
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.toegevoegd-btn');
    let idOrder = $btnRow.attr('data-order');

    setProcessingTimeOutButton($btnRow, idOrder, true);

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=toegevoegd&id_order=' + idOrder + '&token=' + token,
      type: 'GET'
    }).done(function (data) {
      $('form#retourForm .messages').html(data);
      location.reload();
      setProcessingTimeOutButton($btnRow, idOrder, false);
    });
  });
  /**
   * Action Button print collie label(s) or print a pallet label
   */
  $(document).on('click', '.print-button, .standaard-pallet-button, .plaat-pallet-button, .balk-pallet-button', function (e) {
    e.stopImmediatePropagation();
    let $clickedBtn = $(this);
    let orderId = $clickedBtn.attr('data-order');
    let collies = $('.selected_collie_values[data-row-id="' + orderId + '"]').val();

    setProcessingTimeOutButton($clickedBtn, orderId, true);


    // Standaard pallet
    if($clickedBtn.hasClass('standaard-pallet-button')){
      let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + orderId + '"]');
      let currentWeight = parseFloat(weightInput.val().replace('Kg', ''));

      let newPalletQty = Math.ceil(currentWeight/500);
      let splitWeight = currentWeight/newPalletQty;

      collies = '[';
      let collieList = [];
      while(newPalletQty > 0){
        collieList.push('{"name":"pallet",' +
          '"width":"30",' +
          '"height":"30",' +
          '"length":"200",' +
          '"formula":"none",' +
          '"size":"200 x 30 x 30",' +
          '"weight":'+splitWeight+'}');

        newPalletQty--;
      }

      collies += collieList.join(',');
      collies += ']';
    }

    // Balk pallet
    if($clickedBtn.hasClass('balk-pallet-button')){
      let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + orderId + '"]');
      let currentWeight = parseFloat(weightInput.val().replace('Kg', ''));

      let newPalletQty = Math.ceil(currentWeight/500);
      let splitWeight = currentWeight/newPalletQty;

      collies = '[';
      let collieList = [];
      while(newPalletQty > 0){
        collieList.push('{"name":"balk-pallet",' +
          '"width":"15",' +
          '"height":"15",' +
          '"length":"200",' +
          '"formula":"none",' +
          '"size":"200 x 15 x 15",' +
          '"weight":'+splitWeight+'}');

        newPalletQty--;
      }

      collies += collieList.join(',');
      collies += ']';
    }

    // Plaat pallet
    if($clickedBtn.hasClass('plaat-pallet-button')){
      let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + orderId + '"]');
      let currentWeight = parseFloat(weightInput.val().replace('Kg', ''));

      let newPalletQty = Math.ceil(currentWeight/150);
      let splitWeight = currentWeight/newPalletQty;

      collies = '[';
      let collieList = [];
      while(newPalletQty > 0){
        collieList.push('{"name":"plaat-pallet",' +
          '"width":"50",' +
          '"height":"15",' +
          '"length":"100",' +
          '"formula":"none",' +
          '"size":"200 x 50 x 15",' +
          '"weight":'+splitWeight+'}');

        newPalletQty--;
      }

      collies += collieList.join(',');
      collies += ']';
    }





    // if($clickedBtn.hasClass('halve-pallet-button')){
    //   let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + orderId + '"]');
    //
    //   let currentWeight = parseFloat(weightInput.val().replace('Kg', ''));
    //   let newPalletQty = Math.ceil(currentWeight/150);
    //   let splitWeight = currentWeight/newPalletQty;
    //   collies = '[';
    //   let collieList = [];
    //   while(newPalletQty > 0){
    //     collieList.push('{"name":"halve-pallet",' +
    //       '"width":"50",' +
    //       '"height":"50",' +
    //       '"length":"100",' +
    //       '"formula":"none",' +
    //       '"size":"100 x 50 x 50",' +
    //       '"weight":'+splitWeight+'}');
    //
    //     newPalletQty--;
    //   }
    //   collies += collieList.join(',');
    //   collies += ']';
    // }

    let trackingEl = $clickedBtn.parents('td').find('.tracking_number');
    //Already has tracking number
    let trackingNumbers = trackingEl.text().trim();
    if (trackingEl.text().trim().length > 0) {
      let reference = trackingEl.attr('data-reference');
      // Open customized confirmation dialog window
      $.fancyConfirmKoopmanLabel(reference, $clickedBtn, trackingNumbers, orderId, collies);
    } else {
      fetchNewLabel($clickedBtn, orderId, collies);
    }
  });
  /**
   * Update address after wrong address by print label ##TODO
   */
  $(document).on('click', '.updateAddress', function () {
    let profileId = $('#updateAddressKoopman [name="profile"]').val();
    let token = $('#updateAddressKoopman [name="token"]').val();
    let orderId = $('#updateAddressKoopman [name="id_order"]').val();
    let collies = $('.selected_collie_values[data-row-id="' + orderId + '"]').val();
    let address1 = $('.address-input-text#address1').val();
    let house_number = $('.address-input-text#house_number').val();
    let house_number_extension = $('.address-input-text#house_number_extension').val();
    let postcode = $('.address-input-text#postcode').val();
    let city = $('.address-input-text#city').val();

    let data = {
      '_token': token,
      'profile': profileId,
      'id_order': orderId,
      'connected_orders':null,
      'collies': collies,
      'address1': address1,
      'house_number': house_number,
      'house_number_extension': house_number_extension,
      'postcode': postcode,
      'city': city,
      'updateAddress': 1,
    }

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=print-label',
      type: 'POST',
      data: data
    }).done(function (data) {
      if (data === 'printed') {
        location.reload();
      } else {
        $('#updateAddressModal .modal-content').html(data);
        $('#updateAddressModal').modal('show');
      }
    });
  });
  /**
   * Insert address on click link at wrong address after print label
   */
  $(document).on('click', '.insert-address', function (e) {
    let row = e.currentTarget.dataset.rowid;
    let street = document.querySelector('.insert-address-street[data-rowid="' + row + '"]').innerText;
    let city = document.querySelector('.insert-address-city[data-rowid="' + row + '"]').innerText;
    $('#address1').val(street);
    $('#city').val(city);
    e.preventDefault();
  });
  /**
   * Set the temporary timeout for button and row between click and ajax response
   * @param element
   * @param rowId
   * @param status
   */
  let setProcessingTimeOutButton = function (element, rowId, status = 0) {
    if (status) {
      element.addClass('temp_disabled');
      element.closest('.column-label').parent('tr').addClass('temp_disabled_row');
    } else {
      element.removeClass('temp_disabled');
      element.closest('.column-label').parent('tr').removeClass('temp_disabled_row');
    }
  }
  /**
   * Action button to create day closing after pickup of packages by carrier company
   */
  /**
   * Action button to create day closing after pickup of packages by carrier company
   */
  /**
   * Action button to create day closing after pickup of packages by carrier company
   */
  $(document).on('click', 'button#dag-afsluiting', function () {
    let profileId = $('#employee-profile-id').val();

    // Create or get the modal container
    if ($('#dagAfsluitingModal').length === 0) {
      // Create the modal structure if it doesn't exist
      const modalHTML = `
      <div class="modal fade" id="dagAfsluitingModal" tabindex="-1" role="dialog" aria-labelledby="dagAfsluitingModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="dagAfsluitingModalLabel">Dag Afsluiting</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="dagAfsluitingContent">
                <div class="text-center p-5">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Laden...</span>
                  </div>
                  <p class="mt-3">Bezig met verwerken van dag afsluiting...</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Sluiten</button>
            </div>
          </div>
        </div>
      </div>
    `;
      $('body').append(modalHTML);
    } else {
      // If modal exists, reset content to loading state
      $('#dagAfsluitingContent').html(`
      <div class="text-center p-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Laden...</span>
        </div>
        <p class="mt-3">Bezig met verwerken van dag afsluiting...</p>
      </div>
    `);
    }

    // Show the modal
    $('#dagAfsluitingModal').modal('show');

    // Make the AJAX request
    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=dag-afsluiting&token=' + token,
      type: 'GET',
      dataType: 'html',
      success: function(response) {
        // Try to parse as JSON if the response is in JSON format
        let data = typeof response === 'string' ? JSON.parse(response) : response;

        // Create a container for our modal content in the DOM
        if ($('#dag-afsluiting-results-container').length === 0) {
          $('body').append('<div id="dag-afsluiting-results-container" style="display:none;"></div>');
        }

        // Create HTML content for the modal
        let modalContent = '<div class="dag-afsluiting-results">';

        // Add summary section
        if (data.stats && data.stats.combined) {
          modalContent += '<div class="summary-section mb-4">';
          modalContent += '<h3>Samenvatting</h3>';
          modalContent += '<div class="row">';
          modalContent += '<div class="col-md-3 mb-3"><div class="card bg-light"><div class="card-body text-center"><h5>Totaal Orders</h5><span class="badge badge-primary badge-pill">' + data.stats.combined.total + '</span></div></div></div>';
          modalContent += '<div class="col-md-3 mb-3"><div class="card bg-light"><div class="card-body text-center"><h5>Gevonden</h5><span class="badge badge-success badge-pill">' + data.stats.combined.found + '</span></div></div></div>';
          modalContent += '<div class="col-md-3 mb-3"><div class="card bg-light"><div class="card-body text-center"><h5>Niet Gevonden</h5><span class="badge badge-secondary badge-pill">' + data.stats.combined.not_found + '</span></div></div></div>';
          modalContent += '<div class="col-md-3 mb-3"><div class="card bg-light"><div class="card-body text-center"><h5>Bijgewerkt</h5><span class="badge badge-info badge-pill">' + Object.keys(data.stats.updated_orders || {}).length + '</span></div></div></div>';
          modalContent += '</div>';
          modalContent += '</div>';
        }

        // Add carriers section
        if (data.stats && data.stats.used_carriers) {
          modalContent += '<div class="carriers-section mb-4">';
          modalContent += '<h3>Vervoerders</h3>';
          modalContent += '<div class="table-responsive">';
          modalContent += '<table class="table table-striped table-bordered">';
          modalContent += '<thead class="thead-dark"><tr><th>Naam</th><th>Totaal</th><th>Gevonden</th><th>Niet Gevonden</th></tr></thead>';
          modalContent += '<tbody>';

          Object.keys(data.stats.used_carriers).forEach(function(carrierId) {
            const carrier = data.stats.used_carriers[carrierId];
            modalContent += '<tr>';
            modalContent += '<td>' + carrier.name + '</td>';
            modalContent += '<td>' + carrier.total + '</td>';
            modalContent += '<td>' + carrier.found + '</td>';
            modalContent += '<td>' + carrier.not_found + '</td>';
            modalContent += '</tr>';
          });

          modalContent += '</tbody></table>';
          modalContent += '</div>';
          modalContent += '</div>';
        }

        // Add updated orders section with pagination for better performance
        if (data.stats && data.stats.updated_orders) {
          const updatedOrders = Object.values(data.stats.updated_orders);
          const ordersPerPage = 20;
          const totalPages = Math.ceil(updatedOrders.length / ordersPerPage);

          modalContent += '<div class="updated-orders-section mb-4">';
          modalContent += '<h3>Bijgewerkte Orders in Prestashop</h3>';

          // Add pagination controls if needed
          if (totalPages > 1) {
            modalContent += '<div class="pagination-controls mb-3">';
            modalContent += '<nav aria-label="Order pagination"><ul class="pagination pagination-sm justify-content-center" id="orders-pagination">';

            for (let i = 1; i <= totalPages; i++) {
              modalContent += '<li class="page-item' + (i === 1 ? ' active' : '') + '"><a class="page-link" href="#" data-page="' + i + '">' + i + '</a></li>';
            }

            modalContent += '</ul></nav>';
            modalContent += '</div>';
          }

          modalContent += '<div class="table-responsive">';
          modalContent += '<table class="table table-striped table-bordered">';
          modalContent += '<thead class="thead-dark"><tr><th>Referentie</th><th>Klant</th><th>Vervoerder</th><th>Tracking</th><th>Status</th><th>API Status</th></tr></thead>';
          modalContent += '<tbody id="updated-orders-table-body">';

          // Only show first page initially
          const firstPageOrders = updatedOrders.slice(0, ordersPerPage);
          firstPageOrders.forEach(function(order) {
            modalContent += '<tr>';
            modalContent += '<td>' + order.reference + '</td>';
            modalContent += '<td>' + order.customer_name + '</td>';
            modalContent += '<td>' + order.carrier_name + '</td>';
            modalContent += '<td>' + (order.tracking_numbers || '') + '</td>';
            modalContent += '<td>Van ' + order.current_state + ' naar ' + order.new_state + '</td>';

            let apiStatusClass = 'badge-secondary';
            if (order.api_status === 'Gevonden bij Transmission') {
              apiStatusClass = 'badge-success';
            } else if (order.api_status === 'Niet gevonden bij Transmission') {
              apiStatusClass = 'badge-danger';
            }

            modalContent += '<td><span class="badge ' + apiStatusClass + '">' + order.api_status + '</span></td>';
            modalContent += '</tr>';
          });

          modalContent += '</tbody></table>';
          modalContent += '</div>';

          // Store all orders data for pagination
          modalContent += '<script>';
          modalContent += 'window.allUpdatedOrders = ' + JSON.stringify(updatedOrders) + ';';
          modalContent += '</script>';

          modalContent += '</div>';
        }

        if (data.stats && data.stats.not_updated_orders) {
          const notUpdatedOrders = Object.values(data.stats.not_updated_orders);
          const ordersPerPage = 20;
          const totalPages = Math.ceil(notUpdatedOrders.length / ordersPerPage);

          modalContent += '<div class="not-updated-orders-section mb-4">';
          modalContent += '<h3>Beschikbaar Transmission niet in Prestashop</h3>';

          // Add pagination controls if needed
          if (totalPages > 1) {
            modalContent += '<div class="pagination-controls mb-3">';
            modalContent += '<nav aria-label="Non-updated orders pagination"><ul class="pagination pagination-sm justify-content-center" id="not-updated-orders-pagination">';

            for (let i = 1; i <= totalPages; i++) {
              modalContent += '<li class="page-item' + (i === 1 ? ' active' : '') + '"><a class="page-link" href="#" data-page="' + i + '">' + i + '</a></li>';
            }

            modalContent += '</ul></nav>';
            modalContent += '</div>';
          }

          modalContent += '<div class="table-responsive">';
          modalContent += '<table class="table table-striped table-bordered">';
          modalContent += '<thead class="thead-dark"><tr><th>Referentie</th><th>Bestemming</th><th>Tracking</th><th>Status</th><th>Reden</th></tr></thead>';
          modalContent += '<tbody id="not-updated-orders-table-body">';

          // Only show first page initially
          const firstPageOrders = notUpdatedOrders.slice(0, ordersPerPage);
          firstPageOrders.forEach(function(order) {
            modalContent += '<tr>';
            modalContent += '<td>' + order.reference + '</td>';
            modalContent += '<td>' + order.customer_name + '</td>';
            modalContent += '<td>' + (order.tracking_numbers || '') + '</td>';
            modalContent += '<td>' + order.current_state + '</td>';

            let reasonDisplay = "";

            if (order.tracking_numbers) {
              const trackingArray = order.tracking_numbers.split(",");
              if (trackingArray.length > 0) {
                reasonDisplay = "<ul class='mb-0 pl-3' style='list-style: none;min-width:165px;'>";

                trackingArray.forEach(function(trackingNumber) {
                  if (!trackingNumber.trim()) return;

                  let statusBadgeClass = "badge-danger p-1";
                  let statusText = "X";

                  if (order.api_status === "Gevonden bij Transmission") {
                    statusBadgeClass = "badge-success p-1";
                    statusText = "✓";
                  }

                  reasonDisplay += "<li>" + trackingNumber.trim() +
                    " | <span class='" + statusBadgeClass + "'>" + statusText + "</span></li>";
                });

                reasonDisplay += "</ul>";
              } else {
                reasonDisplay = order.tracking_numbers;
              }
            } else {
              // Fallback to reason-based display when no tracking numbers
              let reasonClass = 'badge-secondary';
              if (order.reason === 'Geen tracking nummer beschikbaar') {
                reasonClass = 'badge-danger';
              } else if (order.reason === 'Niet gevonden bij Transmission') {
                reasonClass = 'badge-secondary';
              }
              reasonDisplay = '<span class="badge ' + reasonClass + '">' + (order.reason || 'Onbekend') + '</span>';
            }

            modalContent += '<td>' + reasonDisplay + '</td>';
            modalContent += '</tr>';
          });


          modalContent += '</tbody></table>';
          modalContent += '</div>';

          // Store all non-updated orders data for pagination
          modalContent += '<script>';
          modalContent += 'window.allNotUpdatedOrders = ' + JSON.stringify(notUpdatedOrders) + ';';
          modalContent += '</script>';

          modalContent += '</div>';
        }

// Add pagination script for non-updated orders
        modalContent += '<script>' +
          '$(document).on("click", "#not-updated-orders-pagination .page-item a", function(e) {' +
          '  e.preventDefault();' +
          '  const page = parseInt($(this).data("page"));' +
          '  const ordersPerPage = 20;' +
          '  const start = (page - 1) * ordersPerPage;' +
          '  const end = start + ordersPerPage;' +
          '  const pageOrders = window.allNotUpdatedOrders.slice(start, end);' +
          '  let tableHtml = "";' +
          '  pageOrders.forEach(function(order) {' +
          '    tableHtml += "<tr>";' +
          '    tableHtml += "<td>" + order.reference + "</td>";' +
          '    tableHtml += "<td>" + order.customer_name + "</td>";' +
          '    tableHtml += "<td>" + (order.tracking_numbers || "Geen") + "</td>";' +
          '    tableHtml += "<td>" + order.current_state + "</td>";' +
          '    let reasonClass = "badge-secondary";' +
          '    if (order.reason === "Geen tracking nummer") {' +
          '      reasonClass = "badge-danger";' +
          '    } else if (order.reason === "Niet gevonden bij Transmission") {' +
          '      reasonClass = "badge-secondary";' +
          '    }' +
          '    tableHtml += "<td><span class=\\"badge " + reasonClass + "\\">" + (order.reason || "Onbekend") + "</span></td>";' +
          '    tableHtml += "</tr>";' +
          '  });' +
          '  $("#not-updated-orders-table-body").html(tableHtml);' +
          '  $("#not-updated-orders-pagination .page-item").removeClass("active");' +
          '  $(this).parent(".page-item").addClass("active");' +
          '});' +
          '</script>';


        // Add processed by API section
        if (data.stats && data.stats.processed_by_api && data.stats.processed_by_api.length > 0) {
          modalContent += '<div class="api-processed-section mb-4">';
          modalContent += '<h3>Verwerkt door API</h3>';
          modalContent += '<div class="table-responsive">';
          modalContent += '<table class="table table-striped table-bordered">';
          modalContent += '<thead class="thead-dark"><tr><th>Transport Nummer</th><th>Referentie</th><th>Status Code</th><th>Status Beschrijving</th><th>Verwerkt</th></tr></thead>';
          modalContent += '<tbody>';

          data.stats.processed_by_api.forEach(function(item) {
            modalContent += '<tr>';
            modalContent += '<td>' + item.transport_number + '</td>';
            modalContent += '<td>' + (item.reference || '') + '</td>';
            modalContent += '<td>' + item.status_code + '</td>';
            modalContent += '<td>' + item.status_description + '</td>';
            modalContent += '<td>' + (item.processed ? 'Ja' : 'Nee') + '</td>';
            modalContent += '</tr>';
          });

          modalContent += '</tbody></table>';
          modalContent += '</div>';
          modalContent += '</div>';
        }

        // Add order statuses section
        if (data.stats && data.stats.order_statuses) {
          let hasTrackingStatuses = false;

          // Check if there are any tracking statuses to display
          Object.values(data.stats.order_statuses).forEach(function(statuses) {
            if (statuses.length > 0) {
              hasTrackingStatuses = true;
            }
          });

          if (hasTrackingStatuses) {
            modalContent += '<div class="order-statuses-section mb-4">';
            modalContent += '<h3>Order Tracking Statussen</h3>';
            modalContent += '<div class="table-responsive">';
            modalContent += '<table class="table table-striped table-bordered">';
            modalContent += '<thead class="thead-dark"><tr><th>Tracking Nummer</th><th>Status Code</th><th>Status Beschrijving</th><th>Verwerkt</th></tr></thead>';
            modalContent += '<tbody>';

            Object.entries(data.stats.order_statuses).forEach(function([orderId, statuses]) {
              if (statuses.length > 0) {
                statuses.forEach(function(status) {
                  modalContent += '<tr>';
                  modalContent += '<td>' + status.tracking_number + '</td>';
                  modalContent += '<td>' + status.status_code + '</td>';
                  modalContent += '<td>' + status.status_description + '</td>';
                  modalContent += '<td>' + (status.processed ? 'Ja' : 'Nee') + '</td>';
                  modalContent += '</tr>';
                });
              }
            });

            modalContent += '</tbody></table>';
            modalContent += '</div>';
            modalContent += '</div>';
          }
        }

        modalContent += '</div>';

        // Add some CSS for the modal
        modalContent = '<style type="text/css">' +
          '.dag-afsluiting-results { padding: 20px; }' +
          '.dag-afsluiting-results h2 { color: #333; margin-bottom: 20px; }' +
          '.dag-afsluiting-results h3 { color: #555; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }' +
          '.dag-afsluiting-results .badge { font-size: 14px; padding: 8px 12px; }' +
          '.dag-afsluiting-results .badge-pill { border-radius: 10px; }' +
          '.dag-afsluiting-results .table { margin-bottom: 0; }' +
          '.dag-afsluiting-results .card { box-shadow: 0 2px 5px rgba(0,0,0,0.1); }' +
          '.dag-afsluiting-results .card-body { padding: 15px; }' +
          '</style>' + modalContent;

        modalContent += '<script type="text/javascript">' +
          '$(document).on("click", "#orders-pagination .page-item a", function(e) {' +
          '  e.preventDefault();' +
          '  const page = parseInt($(this).data("page"));' +
          '  const ordersPerPage = 20;' +
          '  const start = (page - 1) * ordersPerPage;' +
          '  const end = start + ordersPerPage;' +
          '  const pageOrders = window.allUpdatedOrders.slice(start, end);' +
          '  let tableHtml = "";' +
          '  pageOrders.forEach(function(order) {' +
          '    tableHtml += "<tr>";' +
          '    tableHtml += "<td>" + order.reference + "</td>";' +
          '    tableHtml += "<td>" + order.customer_name + "</td>";' +
          '    tableHtml += "<td>" + order.carrier_name + " (" + order.carrier_id + ")</td>";' +
          '    ' +
          '    let trackingDisplay = "";' +
          '    ' +
          '    if (order.tracking_numbers) {' +
          '      const trackingArray = order.tracking_numbers.split(",");' +
          '      if (trackingArray.length > 0) {' +
          '        trackingDisplay = "<ul class=\'mb-0 pl-3\' style=\'list-style: none;min-width:165px;\'>";' +
          '        ' +
          '        trackingArray.forEach(function(trackingNumber) {' +
          '          if (!trackingNumber.trim()) return;' +
          '          ' +
          '          let statusBadgeClass = "badge-danger p-1";' +
          '          let statusText = "X";' +
          '          ' +
          '          if (order.api_status === "Gevonden bij Transmission") {' +
          '            statusBadgeClass = "badge-success p-1";' +
          '            statusText = "✓";' +
          '          }' +
          '          ' +
          '          trackingDisplay += "<li>" + trackingNumber.trim() +' +
          '            "| <span class=\'" + statusBadgeClass + "\'>" + statusText + "</span></li>";' +
          '        });' +
          '        ' +
          '        trackingDisplay += "</ul>";' +
          '      } else {' +
          '        trackingDisplay = order.tracking_numbers;' +
          '      }' +
          '    }' +
          '    ' +
          '    tableHtml += "<td>" + trackingDisplay + "</td>";' +
          '    tableHtml += "<td>Van " + order.current_state + " naar " + order.new_state + "</td>";' +
          '    ' +
          '    let apiStatusClass = "badge-secondary";' +
          '    if (order.api_status === "Gevonden bij Transmission") {' +
          '      apiStatusClass = "badge-success";' +
          '    } else if (order.api_status === "Niet gevonden bij Transmission") {' +
          '      apiStatusClass = "badge-danger";' +
          '    } else if (order.api_status === "Geen tracking nummer beschikbaar") {' +
          '      apiStatusClass = "badge-secondary";' +
          '    }' +
          '    ' +
          '    tableHtml += "<td><span class=\\"badge " + apiStatusClass + "\\">" + order.api_status + "</span></td>";' +
          '    tableHtml += "</tr>";' +
          '  });' +
          '  ' +
          '  $("#updated-orders-table-body").html(tableHtml);' +
          '  $("#orders-pagination .page-item").removeClass("active");' +
          '  $(this).parent(".page-item").addClass("active");' +
          '});' +
          '</script>';


// Update modal content with the response
        $('#dagAfsluitingContent').html(
          '<div class="result-container">' +
          '<div class="content-area">' +
          modalContent +
          '</div>' +
          '</div>'
        );

        // Add custom styling for the content
        const customStyles = `
        <style>
          #dagAfsluitingContent .result-container {
            max-width: 100%;
            margin: 0 auto;
          }
          #dagAfsluitingContent .alert {
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid transparent;
            border-radius: 4px;
          }
          #dagAfsluitingContent .alert-success {
            color: #3c763d;
            background-color: #dff0d8;
            border-color: #d6e9c6;
          }
          #dagAfsluitingContent .alert-warning {
            color: #8a6d3b;
            background-color: #fcf8e3;
            border-color: #faebcc;
          }
          #dagAfsluitingContent .alert-danger {
            color: #a94442;
            background-color: #f2dede;
            border-color: #ebccd1;
          }
          #dagAfsluitingContent table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 1rem;
            background-color: transparent;
          }
          #dagAfsluitingContent .table-responsive {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        </style>
      `;
        $('#dagAfsluitingContent').append(customStyles);

        // Update modal title to indicate success
        $('#dagAfsluitingModalLabel').text('Dag Afsluiting Resultaten');
      },
      error: function(xhr, status, error) {
        // Show error message in modal
        $('#dagAfsluitingContent').html(`
        <div class="alert alert-danger">
          <h5 class="alert-heading">Fout bij uitvoeren van dag afsluiting</h5>
          <p>Er is een fout opgetreden bij het ophalen van de resultaten. Probeer het later opnieuw.</p>
          <hr>
          <p class="mb-0">Technische details: ${status} - ${error}</p>
        </div>
      `);

        // Update modal title to indicate error
        $('#dagAfsluitingModalLabel').text('Fout bij Dag Afsluiting');
      }
    });
  });





  /**
   * Calculate the volume size by weight in centimeters and size for on label: length * width * height * 250
   */
  let calculateVolumeSize = function (weight, type) {
    weight = checkFixWeight(weight);

    if (!['envelope', 'plaat', '1-meter', '2-meter', 'pallet'].includes(type)) {
      type = 'collie';
    }

    if (weight <= 0) {
      return 0;
    }

    let volumeHeight = 0;
    let volumeWidth = 0;
    let packageSize = {
      'width': 0,
      'height': 0,
      'length': 0,
      'weight': 0,
      'formula': '',
    };

    switch (type) {
      case 'envelope':
        volumeHeight = weight / (ENVELOPE_LENGTH * ENVELOPE_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = ENVELOPE_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_ENVELOPE_HEIGHT) {
          volumeHeight = MIN_ENVELOPE_HEIGHT;
          volumeWidth = weight / (ENVELOPE_LENGTH * MIN_ENVELOPE_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = ENVELOPE_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (ENVELOPE_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = ENVELOPE_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
      case 'plaat':
        volumeHeight = weight / (PLAAT_LENGTH * PLAAT_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = PLAAT_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_PLAAT_HEIGHT) {
          volumeHeight = MIN_PLAAT_HEIGHT;
          volumeWidth = weight / (PLAAT_LENGTH * MIN_PLAAT_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = PLAAT_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (PLAAT_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = PLAAT_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
      case '1-meter':
        volumeHeight = weight / (METER_LENGTH * METER_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = METER_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_METER_HEIGHT) {
          volumeHeight = MIN_METER_HEIGHT;
          volumeWidth = weight / (METER_LENGTH * MIN_METER_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = METER_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (METER_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = METER_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
      case '2-meter':
        volumeHeight = weight / (METER_2_LENGTH * METER_2_WIDTH * VOLUME_MULTIPLIER);
        volumeWidth = METER_2_WIDTH;
        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_METER_2_HEIGHT) {
          volumeHeight = MIN_METER_2_HEIGHT;
          volumeWidth = weight / (METER_2_LENGTH * MIN_METER_2_HEIGHT * VOLUME_MULTIPLIER);
        }
        packageSize.width = volumeWidth * 100;
        packageSize.height = volumeHeight * 100;
        packageSize.length = METER_2_LENGTH * 100;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = weight;
        packageSize.volumeSize = (METER_2_LENGTH * 100).toString() +
          ' x ' + Math.round(volumeWidth * 100).toString() +
          ' x ' + Math.round(volumeHeight * 100).toString() + '';
        packageSize.formula = METER_2_LENGTH.toString() + ' x ' + volumeWidth.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
    }
    return packageSize;
  }
  /**
   * Update the rows of the collie table after modification of collie data
   *
   * @param rowId
   * @param newCollies
   */
  let updateCollieTable = function (rowId, newCollies) {
    let table = $('.collie-table[data-row-id="' + rowId + '"] tbody');
    let buttonBlock = table.find('tr:first td:last').html();
    let tbody = '';

    let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + rowId + '"]');
    let totalWeight = parseFloat(weightInput.val().replace('Kg', ''));
    let weightMaxOut;
    let weight;
    let size;

    if(totalWeight > (5 * MAX_PACKAGE_WEIGHT)){
      weightMaxOut = '*';
     }

    for (let i = 0; i < newCollies.length; i++) {
      let fixedIndex = i + 1;
      if(weightMaxOut === '*'){
        weight = '*';
        size = '------------------';
      } else {
        weight = newCollies[i]['weight'] +'Kg';
        size = newCollies[i]['size'];
      }

      tbody += '<tr>';
      tbody += '<td><nav class="collie-nav collieTypeSelect" aria-label="" data-index="' + fixedIndex + '" data-row-id="' + rowId + '"><ul class="pagination pagination-lg mb-0">';
      tbody += '<li data-type="envelope" data-index="' + fixedIndex + '" data-row-id="' + rowId + '" class="page-item ';
      if (newCollies[i]['name'] === 'envelope') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/envelope.svg"  alt="Envelop"></a></li>';
      tbody += '<li data-type="plaat" data-index="' + fixedIndex + '" data-row-id="' + rowId + '" class="page-item ';
      if (newCollies[i]['name'] === 'plaat') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/plaat.svg"  alt="Plaat"></a></li>';
      tbody += '<li data-type="1-meter" data-index="' + fixedIndex + '" data-row-id="' + rowId + '" class="page-item ';
      if (newCollies[i]['name'] === '1-meter') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/1m.svg" alt="1 Meter"></a></li>';
      tbody += '<li data-type="2-meter" data-index="' + fixedIndex + '" data-row-id="' + rowId + '" class="page-item ';
      if (newCollies[i]['name'] === '2-meter') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/2m.svg" alt="2 Meter"></a></li>';
      tbody += '</ul></nav></td>';
      tbody += '<td class="font-weight-bold" style="min-width: 150px;">' + size + '</td>';
      tbody += '<td class="font-weight-bold" style="min-width: 150px;">' + weight + '</td>';

      if (i === 0) {
        tbody += '<td style="width:120px;vertical-align: top;text-align: center;" rowspan="5">' + buttonBlock + '</td>';
      }
      tbody += '</tr>';
    }
    table.html(tbody);

    if(totalWeight > (5*MAX_PACKAGE_WEIGHT)){
      switchPalletCollie(rowId, 'pallet');
    } else {
      switchPalletCollie(rowId, 'collie');
    }
  }
  /**
   * Update collie list and add to hidden input for selected collies
   * @param rowId
   */
  let updateCollieListWs = function (rowId) {
    let collieInput;
    let weightInput;
    let weight;
    let qty;
    let selectedColliesInput = $('.selected_collie_values[data-row-id="' + rowId + '"]');
    let collieData = selectedColliesInput.val();
    collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="' + rowId + '"]');
    weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + rowId + '"]');
    qty = parseInt(collieInput.val().replace('Collie(s)', ''));
    weight = parseFloat(weightInput.val().replace('Kg', ''));

    let newData = updateCollieItemList(qty, weight, JSON.parse(collieData));
    selectedColliesInput.val(JSON.stringify(newData));
    updateCollieTable(rowId, newData);
  }


  function switchPalletCollie(orderId, type) {
    let printButton = $('.print-button[data-order="'+orderId+'"]');
    let collieTableFirstRow = $('.collie-table[data-row-id="'+orderId+'"] tbody tr:first td:not(:last-child)');
    let collieTableRemainingRows = $('.collie-table[data-row-id="'+orderId+'"] tbody tr:not(:first) td');
    let collieFooter = $('.collie-table[data-row-id="'+orderId+'"] tfoot tr td:first');
    if (type === 'pallet') {
      printButton.addClass('disabled').attr('disabled', true);
      collieTableFirstRow.addClass('disabled');
      collieTableRemainingRows.addClass('disabled');
      collieFooter.addClass('disabled');
    } else {
      printButton.removeClass('disabled').removeAttr('disabled');
      collieTableFirstRow.removeClass('disabled');
      collieTableRemainingRows.removeClass('disabled');
      collieFooter.removeClass('disabled');
    }
  }

  let checkFixWeight = function (weight) {
    // Add this check when handling weight values
    let totalOrderWeight = parseFloat(weight);
    if (isNaN(totalOrderWeight) || totalOrderWeight <= 0) {
      totalOrderWeight = 1;
    }
    return totalOrderWeight;
  }


  /**
   * Handle the collie quantity change on click qty +/- buttons
   * @param orderId
   * @param type
   */
  function handleCollieQuantityChange(orderId, type) {
    let collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="' + orderId + '"]');
    let qty = parseInt(collieInput.val().replace('Collie(s)', ''));

    let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + orderId + '"]');
    let totalWeight = parseFloat(weightInput.val().replace('Kg', ''));

    // Clicked the plus button
    if (type === 'plus' && qty <= 4) {

      $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="minus"]')
        .attr('disabled', false)
        .removeClass('disabled-btn');

      if (qty === 4) {
        $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="plus"]')
          .attr('disabled', true)
          .addClass('disabled-btn');
      } else {
        $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="plus"]')
          .attr('disabled', false)
          .removeClass('disabled-btn');
      }
      collieInput.val((qty + 1) + " Collie(s)");
    } else
      // Clicked the minus button
    {
      if (qty <= 5 && qty >= 2 && (totalWeight / (qty - 1)) <= MAX_PACKAGE_WEIGHT) {
        $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="plus"]')
          .attr('disabled', false)
          .removeClass('disabled-btn');

        if (qty === 2) {
          $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="minus"]')
            .attr('disabled', true)
            .addClass('disabled-btn');
        } else {
          $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="minus"]')
            .attr('disabled', false)
            .removeClass('disabled-btn');
        }
        collieInput.val((qty - 1) + " Collie(s)");
      } else {
        $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="minus"]')
          .attr('disabled', true)
          .addClass('disabled-btn');
      }
    }
  }

  /**
   * Handle the collie weight change on click weight +/- buttons
   *
   * @param orderId
   * @param type
   */
  function handleWeightChange(orderId, type = null) {
    let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + orderId + '"]');
    let totalWeight = parseFloat(weightInput.val().replace('Kg', ''));
    let collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="' + orderId + '"]');
    let currentCollies = parseInt(collieInput.val().replace('Collie(s)', ''));

    if (type === 'plus') {
      let newWeight = totalWeight + 0.01;
      if (type === null) {
        newWeight = totalWeight;
      }

      // Check if weight per collie would exceed MAX_PACKAGE_WEIGHT
      let weightPerCollie = newWeight / currentCollies;
      if (weightPerCollie > MAX_PACKAGE_WEIGHT) {
        // Calculate how many collies we need for this weight
        let neededCollies = Math.ceil(newWeight / MAX_PACKAGE_WEIGHT);
        if (neededCollies <= 5) {
          // Add collies until we reach the needed amount
          while (currentCollies < neededCollies) {
            handleCollieQuantityChange(orderId, 'plus');
            currentCollies++;
          }
          if (type !== null) {
            weightInput.val(checkFixWeight(newWeight).toFixed(2) + " Kg");
          }
        } else {

          // Switch to pallet mode when more than 5 collies would be needed
          if (type !== null) {
            weightInput.val(checkFixWeight(newWeight).toFixed(2) + " Kg");
          }
        }
      } else {
        if (type !== null) {
          weightInput.val(checkFixWeight(newWeight).toFixed(2) + " Kg");
        }
      }
    } else {
      let newWeight = totalWeight - 0.01;
      if (type === null) {
        newWeight = totalWeight;
      }

      // Check if weight per collie would exceed MAX_PACKAGE_WEIGHT
      let weightPerCollie = newWeight / currentCollies;
      if (weightPerCollie > MAX_PACKAGE_WEIGHT) {
        // Calculate how many collies we need for this weight
        let neededCollies = Math.ceil(newWeight / MAX_PACKAGE_WEIGHT);
        if (neededCollies <= 5) {
          // Add collies until we reach the needed amount
          while (currentCollies < neededCollies) {
            handleCollieQuantityChange(orderId, 'plus');
            currentCollies++;
          }
          if (type !== null) {
            weightInput.val(checkFixWeight(newWeight).toFixed(2) + " Kg");
          }
        } else {
          // Switch to pallet mode when more than 5 collies would be needed
          if (type !== null) {
            weightInput.val(checkFixWeight(newWeight).toFixed(2) + " Kg");
          }
        }
      } else {
        if (totalWeight >= 0.02) {
          $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="minus"]')
            .attr('disabled', false)
            .removeClass('disabled-btn');
          if (type !== null) {
            weightInput.val(checkFixWeight(newWeight).toFixed(2) + " Kg");
          }
        } else {
          $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="minus"]')
            .attr('disabled', true)
            .addClass('disabled-btn');
        }
      }
    }

    if ((totalWeight / (currentCollies + 1)) <= MAX_PACKAGE_WEIGHT) {
      $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="plus"]')
        .attr('disabled', false)
        .removeClass('disabled-btn');
    }

    if ((totalWeight / currentCollies - 1) <= MAX_PACKAGE_WEIGHT) {
      $('.collie-table tfoot .input-group.total_collies .btn[data-row-id="' + orderId + '"][data-type="minus"]')
        .attr('disabled', false)
        .removeClass('disabled-btn');
    }
  }

  $(document).on('mousedown', '.collie-table tfoot .input-group .btn', function (e) {
    handleButtonPress($(this));
  }).on('mouseup mouseleave', '.collie-table tfoot .input-group .btn', function (e) {
    handleButtonRelease($(this));
  });

// Touch events
  $(document).on('touchstart', '.collie-table tfoot .input-group .btn', function (e) {
    e.preventDefault();
    // Disable context menu
    e.stopPropagation();
    $(this).on('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    handleButtonPress($(this));
    // Add touch identifier to track this specific touch
    $(this).data('touchId', e.originalEvent.touches[0].identifier);
  }).on('touchend touchcancel', '.collie-table tfoot .input-group .btn', function (e) {
    e.preventDefault();
    // Only handle release if this is the same touch that started
    if ($(this).data('touchId') === e.originalEvent.changedTouches[0].identifier) {
      handleButtonRelease($(this));
      $(this).removeData('touchId');
    }
  });

  let intervalId = null;
  let holdStartTime = null;
  let shouldContinue = false;
  const INITIAL_DELAY = 300;
  const MIN_DELAY = 0.001;
  const ACCELERATION_RATE = 0.6;

  function handleButtonPress($button) {
    const orderId = $button.attr('data-row-id');
    const type = $button.attr('data-type');
    const method = $button.attr('data-method');
    holdStartTime = Date.now();
    shouldContinue = true;

    // Execute once immediately
    if (method === 'collie') {
      handleCollieQuantityChange(orderId, type);
    } else if (method === 'weight') {
      handleWeightChange(orderId, type);
    }
    updateCollieListWs(orderId);

    function updateWithSpeed() {
      if (!shouldContinue) return;

      if (method === 'weight') {
        handleWeightChange(orderId, type);
        const holdDuration = Date.now() - holdStartTime;
        const currentDelay = Math.max(MIN_DELAY, INITIAL_DELAY * Math.pow(ACCELERATION_RATE, Math.floor(holdDuration / 300)));
        setTimeout(updateWithSpeed, currentDelay);
      }
      updateCollieListWs(orderId);
    }

    setTimeout(updateWithSpeed, INITIAL_DELAY);
  }


  /**
   * Modify the selected collie list, when collie name and index are provided the list is updated else the list is build
   * @param totalQty
   * @param totalWeight
   * @param collieData
   * @param index
   * @param collieName
   * @returns {[]|*}
   */
  let updateCollieItemList = function (totalQty, totalWeight, collieData, index = null, collieName = null) {
    let fixedIndex = index - 1;
    let weight = totalWeight / totalQty;
    let newList = [];

    // Enforce max 5 collies
    totalQty = Math.min(totalQty, 5);

    // If index and collieName are provided, update specific collie
    if (fixedIndex !== null && collieName !== null) {
      collieData[fixedIndex].name = collieName;
      // Ensure weight doesn't exceed MAX_PACKAGE_WEIGHT
      let packageSize = calculateVolumeSize(Math.min(weight, MAX_PACKAGE_WEIGHT), collieName);
      collieData[fixedIndex].width = packageSize.width.toFixed(0);
      collieData[fixedIndex].height = packageSize.height.toFixed(0);
      collieData[fixedIndex].length = packageSize.length.toFixed(0);
      collieData[fixedIndex].formula = packageSize.formula;
      collieData[fixedIndex].size = packageSize.volumeSize;
      collieData[fixedIndex].weight = packageSize.weight.toFixed(2);
      return collieData;
    }

    if (totalQty >= collieData.length) {
      // Add qty to collie total
      let rest = Math.min(totalQty - collieData.length, 5 - collieData.length);
      for (let i = 0; i < collieData.length; i++) {
        let collieItem = {};
        let collieName = collieData[i].name;
        let packageSize = calculateVolumeSize(Math.min(weight, MAX_PACKAGE_WEIGHT), collieName);
        collieItem['name'] = collieName;
        collieItem['width'] = packageSize.width.toFixed(packageSize.width % 1 ? 2 : 0);
        collieItem['height'] = packageSize.height.toFixed(packageSize.height % 1 ? 2 : 0);
        collieItem['length'] = packageSize.length.toFixed(packageSize.length % 1 ? 2 : 0);
        collieItem['formula'] = packageSize.formula;
        collieItem['size'] = packageSize.volumeSize;
        collieItem['weight'] = packageSize.weight.toFixed(packageSize.weight % 1 ? 2 : 0);
        newList.push(collieItem);
      }
      // Add remaining as two meter size
      for (let i = 0; i < rest; i++) {
        let packageSize = calculateVolumeSize(Math.min(weight, MAX_PACKAGE_WEIGHT), '2-meter');
        let collieItem = {};
        collieItem['name'] = '2-meter';
        collieItem['width'] = packageSize.width.toFixed(packageSize.width % 1 ? 2 : 0);
        collieItem['height'] = packageSize.height.toFixed(packageSize.height % 1 ? 2 : 0);
        collieItem['length'] = packageSize.length.toFixed(packageSize.length % 1 ? 2 : 0);
        collieItem['formula'] = packageSize.formula;
        collieItem['size'] = packageSize.volumeSize;
        collieItem['weight'] = packageSize.weight.toFixed(packageSize.weight % 1 ? 2 : 0);
        newList.push(collieItem);
      }
    } else {
      //subtract qty collie of total
      collieData.pop();
      for (let i = 0; i < collieData.length; i++) {
        let collieName = collieData[i].name;
        let packageSize = calculateVolumeSize(Math.min(weight, MAX_PACKAGE_WEIGHT), collieName);
        let collieItem = {};
        collieItem['name'] = collieName;
        collieItem['width'] = packageSize.width.toFixed(packageSize.width % 1 ? 2 : 0);
        collieItem['height'] = packageSize.height.toFixed(packageSize.height % 1 ? 2 : 0);
        collieItem['length'] = packageSize.length.toFixed(packageSize.length % 1 ? 2 : 0);
        collieItem['formula'] = packageSize.formula;
        collieItem['size'] = packageSize.volumeSize;
        collieItem['weight'] = packageSize.weight.toFixed(packageSize.weight % 1 ? 2 : 0);
        newList.push(collieItem);
      }
    }
    return newList;
  }
  /**
   * Fancybox for label status information modal
   * @param reference
   * @param button
   * @param trackingNumbers
   * @param orderId
   * @param collies
   */
  $.fancyConfirmKoopmanLabel = function (reference, button, trackingNumbers = "", orderId = null, collies = null) {
    let profileId = $('#employee-profile-id').val();

    $.fancybox.open({
        type: 'ajax',
        width: 800,
        height: 800,
        autoSize: false,
        href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=orderlabelstatus&render_template=true&reference=' + reference + '&token=' + token,
        modal: true,
        animationDuration: 350,
        animationEffect: 'material',
        afterShow: function () {
          $("#okConfirm").click(function (e) {
            fetchNewLabel(button, orderId, collies);
            $.fancybox.close(e);
          });
          $("#cancelConfirm").click(function (e) {
            $.fancybox.close(e);
            setProcessingTimeOutButton(button, orderId, 0);
          });
        }
      }
    );
  }
  /**
   * Remove a collie from the transmission portal #TODO
   */
  $(document).on('click', '.remove-collie', function () {
    let collie = $(this).attr('data-collo');
    let shipmentNumber = $(this).attr('data-nrzend');
    if (confirm("Weet je zeker dat je dit label uit de transmission portal wilt verwijderen?!") === true) {
      console.debug(['click ok', collie, shipmentNumber]);
    } else {
      return false;
    }
  });
  /**
   * On manual change total weight input field
   */
  $(document).on('keyup', '.total_weight input', function () {
    let elem = $(this);
    let rowId = elem.data('row-id');
    let value = parseFloat(elem.val().replace('Kg', ''));
    let collieTotal = parseInt($('.total_collies input[data-row-id="' + rowId + '"]').val().replace('Collie(s)', ''));
    handleWeightChange(rowId);
    updateCollieListWs(rowId)
  });
  /**
   * Generate the new labels at koopman transmission for the selected collies or pallet
   * @param button
   * @param orderId
   * @param collies
   */
  let fetchNewLabel = function (button, orderId, collies) {
    let profileId = $('#employee-profile-id').val();
    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=print-label&token=' + token,
      type: 'GET',
      data: {
        'id_order': orderId,
        'added_check':0,
        'collies': collies,
      }
    }).done(function (data) {
      if (data === 'printed') {
        location.reload();
      } else {
        $('#updateAddressModal .modal-content').html(data);
        $('#updateAddressModal').modal('show');
      }
    });
  }
  /**
   * Check if the order is linked to another order and submit form
   */
  $(document).on('click', '#toevoegingForm button', function (e) {
    let weight = 0;
    let profileId = $('#employee-profile-id').val();
    let idOrder = $('#toevoegingForm [name="id_order"]').val();
    let collies = $('#toevoegingForm [name="collies"]').val();
    let addedToOrderChoice = $('#toevoegingForm [name="addedToOrderChoice"]').val();
    let connectedOrders = [];

    if ($(this).attr('data-all') !== "0") {
      $('#toevoegingForm .linked_order:checked').each(function (key, val) {
        weight = parseFloat(weight) + parseFloat($(val).attr('data-weight'));
        connectedOrders.push($(val).val());
      });
    }

    let data = {
      '_token': token,
      'connected_orders': connectedOrders,
      'collies': collies,
      'added_check': addedToOrderChoice
    }

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=print-label&id_order=' + idOrder,
      type: 'GET',
      data: data,
    }).done(function (data) {
      if (data === 'printed') {
        location.reload();
      } else {
        $('#updateAddressModal .modal-body').html(data);
        $('#updateAddressModal').modal('show');
      }
    });
  });

  /**
   * Re-center the collie table when the window is resized of reshaped
   * @param rowId
   */
  let centerAndFocusCollieTable = function (rowId) {
    const collieTable = $(`.collie-table[data-row-id="${rowId}"]`);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const tableHeight = collieTable.outerHeight();
    const tableWidth = collieTable.outerWidth();
    // Calculate scroll position to center vertically
    const scrollTop = collieTable.offset().top - (windowHeight / 2) + (tableHeight / 2) - 100;
    // Calculate scroll position to center horizontally
    const scrollLeft = collieTable.offset().left - (windowWidth / 2) + (tableWidth / 2) - 20;
    // Smooth scroll to centered position
    $('html, body').animate({
      scrollTop: scrollTop,
      scrollLeft: scrollLeft
    }, 300);
    // Ensure element stays in view
    collieTable.css({
      'position': 'relative',
      'z-index': 1000
    });
  }

  /**
   * Select the collie type and update the collie table
   */
  $(document).on('click', '.collieTypeSelect li', function (e) {
    e.stopImmediatePropagation();
    let data = $(this).data();
    let index = data.index;
    let rowId = data.rowId;
    let collieType = data.type;
    let collieInput;
    let weightInput;
    let weight;
    let qty;
    let selectedColliesInput = $('.selected_collie_values[data-row-id="' + rowId + '"]');
    let collieData = selectedColliesInput.val();

    collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="' + rowId + '"]');
    weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + rowId + '"]');
    qty = parseInt(collieInput.val().replace('Collie(s)', ''));
    weight = parseFloat(weightInput.val().replace('Kg', ''));

    let newData = updateCollieItemList(qty, weight, JSON.parse(collieData), index, collieType);
    selectedColliesInput.val(JSON.stringify(newData));

    updateCollieTable(rowId, newData);
    centerAndFocusCollieTable(rowId, $(this));
  });

  const $firstTable = $('.collie-table').first();
  if ($firstTable.length) {
    const rowId = $firstTable.data('row-id');
    centerAndFocusCollieTable(rowId);
  }

  function handleButtonRelease($button) {
    shouldContinue = false;
    const orderId = $button.attr('data-row-id');
    centerAndFocusCollieTable(orderId, $button);
  }
});
