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
    let $tr = $clickedLabel.closest('TR');
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
  $(document).on('click', '.print-button, .pallet-button', function (e) {
    e.stopImmediatePropagation();
    let $clickedBtn = $(this);
    let orderId = $clickedBtn.attr('data-order');
    let collies = $('.selected_collie_values[data-row-id="' + orderId + '"]').val();

    setProcessingTimeOutButton($clickedBtn, orderId, true);
    if($clickedBtn.hasClass('pallet-button')){
      let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + orderId + '"]');

      let currentWeight = parseFloat(weightInput.val().replace('Kg', ''));
      let newPalletQty = Math.ceil(currentWeight/1000);
      let splitWeight = currentWeight/newPalletQty;
      collies = '[';
      let collieList = [];
      while(newPalletQty > 0){
        collieList.push('{"name":"pallet",' +
          '"width":"80",' +
          '"height":"220",' +
          '"length":"200",' +
          '"formula":"none",' +
          '"size":"200 x 80 x 220",' +
          '"weight":'+splitWeight+'}');

        newPalletQty--;
      }
      collies += collieList.join(',');
      collies += ']';
    }

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
    let $clickedBtn = $(this);
    let orderId = $clickedBtn.attr('data-order');
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
      element.closest('.koopman_label_button_2-type').parent('tr').addClass('temp_disabled_row');
    } else {
      element.removeClass('temp_disabled');
      element.closest('.koopman_label_button_2-type').parent('tr').removeClass('temp_disabled_row');
    }
  }
  /**
   * Action button to create day closing after pickup of packages by carrier company
   */
  $(document).on('click', 'button#dag-afsluiting', function () {
    let profileId = $('#employee-profile-id').val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=dag-afsluiting&token=' + token,
      type: 'GET'
    }).done(function () {
      location.reload();
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
          ' x ' + (volumeWidth * 100).toFixed((volumeWidth * 100) % 1 ? 2 : 0).toString() +
          ' x ' + (volumeHeight * 100).toFixed((volumeHeight * 100) % 1 ? 2 : 0).toString() + '';
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
          ' x ' + (volumeWidth * 100).toFixed((volumeWidth * 100) % 1 ? 2 : 0).toString() +
          ' x ' + (volumeHeight * 100).toFixed((volumeHeight * 100) % 1 ? 2 : 0).toString() + '';
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
          ' x ' + (volumeWidth * 100).toFixed((volumeWidth * 100) % 1 ? 2 : 0).toString() +
          ' x ' + (volumeHeight * 100).toFixed((volumeHeight * 100) % 1 ? 2 : 0).toString() + '';
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
          ' x ' + (volumeWidth * 100).toFixed((volumeWidth * 100) % 1 ? 2 : 0).toString() +
          ' x ' + (volumeHeight * 100).toFixed((volumeHeight * 100) % 1 ? 2 : 0).toString() + '';
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
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/envelope.png"  alt="Envelop"></a></li>';
      tbody += '<li data-type="plaat" data-index="' + fixedIndex + '" data-row-id="' + rowId + '" class="page-item ';
      if (newCollies[i]['name'] === 'plaat') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/plaat.png"  alt="Plaat"></a></li>';
      tbody += '<li data-type="1-meter" data-index="' + fixedIndex + '" data-row-id="' + rowId + '" class="page-item ';
      if (newCollies[i]['name'] === '1-meter') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/1m.png" alt="1 Meter"></a></li>';
      tbody += '<li data-type="2-meter" data-index="' + fixedIndex + '" data-row-id="' + rowId + '" class="page-item ';
      if (newCollies[i]['name'] === '2-meter') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#"><img src="/upload/koopman/icons/2m.png" alt="2 Meter"></a></li>';
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
      totalOrderWeight = 0.01;
    }
    return totalOrderWeight;
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

  /**
   * click / hold function for collie qty and total weight buttons. Weight buttons are handled separately so they can have a hold functionality
   * @type {null}
   */
  let intervalId = null;
  const REPEAT_DELAY = 50; // Milliseconds between repeats
  $(document).on('mousedown', '.collie-table tfoot .input-group .btn', function () {
    const $button = $(this);
    const orderId = $button.attr('data-row-id');
    const type = $button.attr('data-type');
    const method = $button.attr('data-method');
    // Execute once immediately
    if (method === 'collie') {
      handleCollieQuantityChange(orderId, type);
    } else if (method === 'weight') {
      handleWeightChange(orderId, type);
    }
    updateCollieListWs(orderId);
    // Setup repeat interval for hold
    intervalId = setInterval(() => {
      if (method === 'weight') {
        handleWeightChange(orderId, type);
      }
      updateCollieListWs(orderId);
    }, REPEAT_DELAY);
  }).on('touchstart', function (e) {
    e.preventDefault();
    $(this).trigger('mousedown');
  }).on('touchend touchcancel', function (e) {
    e.preventDefault();
    $(this).trigger('mouseup');
  }).on('mouseup mouseleave', '.collie-table tfoot .input-group .btn', function () {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    const $button = $(this);
    const orderId = $button.attr('data-row-id');
    centerAndFocusCollieTable(orderId, $(this));
  });

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
        'collies': collies
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
    let connectedOrders = [];

    if ($(this).attr('data-all') !== "0") {
      $('#toevoegingForm .linked_order:checked').each(function (key, val) {
        weight = parseFloat(weight) + parseFloat($(val).attr('data-weight'));
        connectedOrders.push($(val).val());
      });
    }

    let data = {
      '_token': token,
      'collies': collies,
      'connected_orders': connectedOrders,
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
});
