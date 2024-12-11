$(function () {
  let profileId = $('#employee-profile-id').val();

  $('.createRetour').on('click', function (event) {
    event.stopImmediatePropagation();
    let orderId = $(this).attr('data-order-id');

    $.fancybox({
      width: 800,
      height: 800,
      autoSize: false,
      href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=orderretourinit&id_order=' + orderId + '&token=' + token,
      cache: false,
      type: 'ajax'
    });
    return false;
  });

  $(document).on('click', '.saveRetourRequest', function (event) {
    event.preventDefault();
    let orderId = $('form#retourForm [name="order_id"]').val();
    let data = $('form#retourForm').serialize();
    if ($('[name="collie_type[]"]').length <= 0) {
      return $('form#retourForm .messages').html('<h3 style="color:red;font-weight:bold;width:100%;text-align:center;">Vul de paketten in waar u een retour opdracht voor wilt maken</h3>');
    }

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=orderretoursubmit&id_order=' + orderId + '&token=' + token,
      type: 'GET',
      data: data,
    }).done(function (e) {
      $('form#retourForm .messages').html(e);
    })
      .fail(function (e) {
        $('form#retourForm .messages').html(e);
      });
  });

  $('.showShippingState').on('click', function (event) {
    event.stopImmediatePropagation();
    let reference = $(this).attr('data-order-reference');

    $.fancybox({
      width: 800,
      height: 800,
      autoSize: false,
      href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=orderstatus&render_template=true&reference=' + reference + '&token=' + token,
      cache: false,
      type: 'ajax'
    });
    return false;
  });

  $('div.beingprepared-btn label').click(function () {
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.beingprepared-btn');
    let order = $btnRow.attr('data-order');

    setProcessingTimeOutButton($btnRow, order, true);

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=beingprepared_status&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        location.reload();

        setProcessingTimeOutButton($btnRow, order, false);
      });
  });

  $(document).on('click', 'div.workshop-btn label', function (e) {
    e.preventDefault();
    let $clickedLabel = $(this);
    let $input = $clickedLabel.prev('input');
    let $btnRow = $clickedLabel.closest('div.workshop-btn');
    let $tr = $clickedLabel.closest('TR');
    let order = $btnRow.attr('data-order');
    let type = $input.val();
    let reference = $tr.find("td.column-reference").text().trim();
    let customer = $tr.find("td.column-customer").text().trim();

    $('#trello_order').val(order);
    $('#trello_type').val(type);
    $('#trello_card_title').val('Werkzaamheden klant: ' + customer + ' voor bestelling ' + reference);

  });


  $(document).on('click', '#trelloActionClose', function (e) {
    $('#trello_card_descr').val('');
    $('#trello_order').val('');
    $('#trello_type').val('');
    $('#trello_card_title').val('');
  });

  $(document).on('click', '#trelloActionOnlyStatus', function (e) {
    let trello_order = $('#trello_order').val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=workshop_status&id_order=' + trello_order + '&token=' + token,
      type: 'GET',
      data: {
        'type': 'status',
        'trello_order': trello_order
      }
    }).done(function (data) {
      location.reload();
    });
  });

  $(document).on('click', '#trelloActionStatusAndCard', function (e) {
    let trello_card_descr = $('#trello_card_descr').val();
    let trello_order = $('#trello_order').val();
    let trello_type = $('#trello_type').val();
    let trello_card_lane = $('#trello_card_lane').val();
    let trello_title = $('#trello_card_title').val();

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
    }).done(function (data) {
      location.reload();
    });
  });


  $(document).on('click', 'div.backorder-btn label', function () {

    let $clickedLabel = $(this);
    let $input = $clickedLabel.prev('input');
    let $btnRow = $clickedLabel.closest('div.backorder-btn');
    let $tr = $clickedLabel.closest('TR');
    let order = $btnRow.attr('data-order');
    let type = $input.val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=backorder_status&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        location.reload();
      });

  });


  $(document).on('click', 'label.aftehalen', function () {
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.aftehalen-btn');
    let order = $btnRow.attr('data-order');

    setProcessingTimeOutButton($btnRow, order, true);

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=afhalen&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        $('form#retourForm .messages').html(data);
        location.reload();

        setProcessingTimeOutButton($btnRow, order, false);
      });

  });

  $(document).on('click', 'div.afgehaald-btn label', function () {
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.afgehaald-btn');
    let order = $btnRow.attr('data-order');

    setProcessingTimeOutButton($btnRow, order, true);
    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=afgehaald&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        $('form#retourForm .messages').html(data);
        location.reload();

        setProcessingTimeOutButton($btnRow, order, false);
      });

  });

  $(document).on('click', 'div.toegevoegd-btn label', function () {
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.toegevoegd-btn');
    let order = $btnRow.attr('data-order');

    setProcessingTimeOutButton($btnRow, order, true);

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=toegevoegd&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        $('form#retourForm .messages').html(data);
        location.reload();

        setProcessingTimeOutButton($btnRow, order, false);
      });
  });




  $(document).on('click', '.print-button, .pallet-button',function (e) {
    e.stopImmediatePropagation();
    let $clickedBtn = $(this);
    let orderId = $clickedBtn.attr('data-order');
    let collies = $('.selected_collie_values[data-row-id="'+orderId+'"]').val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=print-label&id_order=' +
        orderId + '&token=' + token,
      type: 'POST',
      data: {
        'order': orderId,
        'collies': collies
      }
    })
      .done(function (data) {
        if(data === 'printed'){
          location.reload();
        } else {
          $('#updateAddressModal .modal-content').html(data);
          $('#updateAddressModal').modal('show');
        }
      });

  });

  $(document).on('click', 'div.koopman label',function (e) {
    let $clickedLabel = $(this);
    let $input = $clickedLabel.prev('input');
    let $btnRow = $clickedLabel.closest('div.koopman');
    let $tr = $clickedLabel.closest('TR');
    let orderId = $input.attr('data-id-order');
    let type = $input.val();
    let gewicht = 0;

    $clickedLabel.toggleClass('temp_disabled', "");
    $tr.toggleClass('temp_disabled_row', "");
    /*
    *  Gewijzigd door JB Stoker - Moderne Smid
    *  Pakket maten en soorten aangepast, tevens type pakket toegevoegd voor maatvoering
    *  1 -Envelop : (50 x 30 x 1=1Kg) / value = envelope
    *  2 -Plaat : (50 x 30 x 1=15Kg) / value = plaat
    *  3 -1 Meter : (50 x 30 x 1=15Kg) / value = 1-meter
    *  4 -2 Meter < 15 : (50 x 30 x 1= 14Kg) / value = collie-smaller
    *  5 -2 Meter > 15 : (50 x 30 x 1= 30Kg) / value = collie-larger
    *
    */
    if (type !== -1) {
      switch (type) {
        case 'envelope':
          gewicht = 5;
          break;
        case 'plaat':
          gewicht = 10;
          break;
        case '1-meter':
          gewicht = 15;
          break;
        case 'collie-smaller':
          gewicht = 20;
          break;
        case 'collie-larger':
          gewicht = 30;
          break;
      }

      $.ajax({
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=print-label&id_order=' +
          orderId + '&weight='+gewicht+'&type='+type+'&token=' + token,
        type: 'GET'
      })
        .done(function (data) {
          if(data === 'printed'){
            location.reload();
          } else {
            $('#updateAddressModal .modal-content').html(data);
            $('#updateAddressModal').modal('show');
          }
        });
      }
  });


  $(document).on('click', '.updateAddress', function () {
    let orderId = $('#updateAddressKoopman [name="id_order"]').val();
    let profileId = $('#updateAddressKoopman [name="profile"]').val();
    let type = $('#updateAddressKoopman [name="type"]').val();
    let gewicht = $('#updateAddressKoopman [name="weight"]').val();
    let token = $('#updateAddressKoopman [name="token"]').val();

    let chosenCollies = $('#updateAddressKoopman [name="collies"]').val();
    let collieType = $('#updateAddressKoopman [name="collie_type"]').val();
    let weightOption = $('#updateAddressKoopman [name="weight_option"]').val();


    let address1 = $('.address-input-text#address1').val();
    let house_number = $('.address-input-text#house_number').val();
    let house_number_extension = $('.address-input-text#house_number_extension').val();
    let postcode = $('.address-input-text#postcode').val();
    let city = $('.address-input-text#city').val();

    /*
    *  Gewijzigd door JB Stoker - Moderne Smid
    *  Pakket maten en soorten aangepast, tevens type pakket toegevoegd voor maatvoering
    *  1 -Envelop : (50 x 30 x 1=1Kg) / value = envelope
    *  2 -Plaat : (50 x 30 x 1=15Kg) / value = plaat
    *  3 -1 Meter : (50 x 30 x 1=15Kg) / value = 1-meter
    *  4 -2 Meter < 15 : (50 x 30 x 1= 14Kg) / value = collie-smaller
    *  5 -2 Meter > 15 : (50 x 30 x 1= 30Kg) / value = collie-larger
    */

    if (type !== -1) {
      switch (type) {
        case 'envelope':
          gewicht = 5;
          break;
        case 'plaat':
          gewicht = 10;
          break;
        case '1-meter':
          gewicht = 15;
          break;
        case 'collie-smaller':
          gewicht = 20;
          break;
        case 'collie-larger':
          gewicht = 30;
          break;
      }

      let data = {
        '_token': token,
        'profile': profileId,
        'id_order': orderId,
        'type': type,
        'weight': gewicht,
        'collies': chosenCollies,
        'collie_type': collieType,
        'weight_option': weightOption,
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
      })
        .done(function (data) {
          if (data === 'printed') {
            location.reload();
          } else {
            $('#updateAddressModal .modal-content').html(data);
            $('#updateAddressModal').modal('show');
          }
        });
    }
  });


  $(document).on('click', '.insert-address', function (e) {
    let row = e.currentTarget.dataset.rowid;
    let street = document.querySelector('.insert-address-street[data-rowid="' + row + '"]').innerText;
    let city = document.querySelector('.insert-address-city[data-rowid="' + row + '"]').innerText;

    $('#address1').val(street);
    $('#city').val(city);

    e.preventDefault();
  });


  let setProcessingTimeOutButton = function (element, rowId, status=0){
      if(status){
        element.addClass('temp_disabled');
        element.closest('.koopman_label_button_2-type').parent('tr').addClass('temp_disabled_row');
      } else {
        element.removeClass('temp_disabled');
        element.closest('.koopman_label_button_2-type').parent('tr').removeClass('temp_disabled_row');
      }
  }


  $(document).on('click', 'button#dag-afsluiting', function () {
    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=dag-afsluiting&token=' + token,
      type: 'GET'
    }).done(function (data) {
      location.reload();
    });

  });

  const MAX_PACKAGE_WEIGHT = 23;
  const VOLUME_MULTIPLIER = 250;
  const PALLET_THRESHOLD = 150;
  const MINI_PALLET_THRESHOLD = 150;
  const EURO_PALLET_THRESHOLD = 250;
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

  let centerAndFocusCollieTable = function (rowId, elem) {
      const collieTable = $(`.collie-table[data-row-id="${rowId}"]`);
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const tableHeight = collieTable.outerHeight();
      const tableWidth = collieTable.outerWidth();

      // Calculate scroll position to center vertically
      const scrollTop = collieTable.offset().top - (windowHeight/2) + (tableHeight/2) - 100;

      // Calculate scroll position to center horizontally
      const scrollLeft = collieTable.offset().left - (windowWidth/2) + (tableWidth/2) - 20;

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

  // Berekend in meter voor prijs, centimeters op het label: lengte * breedte * hoogte * 250
  let calculateVolumeSize = function (weight, type) {

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
        packageSize.width = volumeWidth*100;
        packageSize.height = volumeHeight*100;
        packageSize.length = ENVELOPE_LENGTH*100;
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
        packageSize.width = volumeWidth*100;
        packageSize.height = volumeHeight*100;
        packageSize.length = PLAAT_LENGTH*100;
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
        packageSize.width = volumeWidth*100;
        packageSize.height = volumeHeight*100;
        packageSize.length = METER_LENGTH*100;
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

        packageSize.width = volumeWidth*100;
        packageSize.height = volumeHeight*100;
        packageSize.length = METER_2_LENGTH*100;
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

  let updateCollieTable = function (rowId, newCollies) {
    let table = $('.collie-table[data-row-id="' + rowId + '"] tbody');
    let buttonBlock = table.find('tr:first td:last').html();
    let tbody = '';

    for (let i = 0; i < newCollies.length; i++) {
      let fixedIndex = i + 1;
      tbody += '<tr>';
      tbody += '<td><nav class="collie-nav collieTypeSelect" aria-label="" data-index="'+fixedIndex+'" data-row-id="'+rowId+'"><ul class="pagination pagination-lg mb-0">';
      tbody += '<li data-type="envelope" data-index="'+fixedIndex+'" data-row-id="'+rowId+'" class="page-item ';
      if (newCollies[i]['name'] === 'envelope') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#" alt="Envelop"><img src="/upload/envelope-sharp-thin.svg" alt="Envelop"></a></li>';
      tbody += '<li data-type="plaat" data-index="'+fixedIndex+'" data-row-id="'+rowId+'" class="page-item ';
      if (newCollies[i]['name'] === 'plaat') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#" alt="Plaat"><img src="/upload/rectangle-wide-sharp-thin.svg" alt="Plaat"></a></li>';
      tbody += '<li data-type="1-meter" data-index="'+fixedIndex+'" data-row-id="'+rowId+'" class="page-item ';
      if (newCollies[i]['name'] === '1-meter') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#" alt="1 Meter"><img src="/upload/1m.svg" alt="1 Meter"></a></li>';
      tbody += '<li data-type="2-meter" data-index="'+fixedIndex+'" data-row-id="'+rowId+'" class="page-item ';
      if (newCollies[i]['name'] === '2-meter') {
        tbody += 'active';
      }
      tbody += '"><a class="page-link" href="#" alt="2 Meter"><img src="/upload/2m.svg" alt="2 Meter"></a></li>';
      tbody += '</ul></nav></td>';

      tbody += '<td class="font-weight-bold" style="min-width: 150px;">' + newCollies[i]['size'] + '</td>';
      tbody += '<td class="font-weight-bold" style="min-width: 150px;">' + newCollies[i]['weight'] + 'Kg</td>';

      if (i === 0) {
        tbody += '<td style="width:120px;vertical-align: top;text-align: center;" rowspan="5">' + buttonBlock + '</td>';
      }
      tbody += '</tr>';
    }
    table.html(tbody);
  }


  //plus/minus button
  let updateCollieListWs = function (rowId, method = 'collie') {
    let selectedColliesInput = $('.selected_collie_values[data-row-id="' + rowId + '"]');
    let collieData = selectedColliesInput.val();

    let collieInput;
    let weightInput;
    let weight = 0;
    let qty = 0;
    collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="' + rowId + '"]');
    weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + rowId + '"]');

    qty = parseInt(collieInput.val().replace('Collie(s)', ''));
    weight = parseFloat(weightInput.val().replace('Kg', ''));

    let newData = updateCollieItemList(qty, weight, JSON.parse(collieData));
    selectedColliesInput.val(JSON.stringify(newData));

    updateCollieTable(rowId, newData);
  }


  $(document).on('click', '.collieTypeSelect li', function (e) {
    e.stopImmediatePropagation();
    let clickedElem = $(this);
    let data = $(this).data();
    let index = data.index;
    let rowId = data.rowId;
    let collieType = data.type;

    let selectedColliesInput = $('.selected_collie_values[data-row-id="' + rowId + '"]');
    let collieData = selectedColliesInput.val();

    let collieInput;
    let weightInput;
    let weight = 0;
    let qty = 0;
    collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="' + rowId + '"]');
    weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="' + rowId + '"]');

    qty = parseInt(collieInput.val().replace('Collie(s)', ''));
    weight = parseFloat(weightInput.val().replace('Kg', ''));

    let newData = updateCollieItemList(qty, weight, JSON.parse(collieData), index, collieType);
    selectedColliesInput.val(JSON.stringify(newData));

    updateCollieTable(rowId, newData);

    centerAndFocusCollieTable(rowId, $(this));
  });


  function handleCollieQuantityChange(orderId, type) {
    let collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="' + orderId + '"]');
    let qty = parseInt(collieInput.val().replace('Collie(s)', ''));

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
    } else {
      if (qty <= 5 && qty >= 2) {
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
      }
    }

    let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="'+orderId+'"]');
    let totalWeight = parseFloat(weightInput.val().replace('Kg',''));
    if(totalWeight > 0.01) {
      $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="plus"]')
        .attr('disabled', false)
        .removeClass('disabled-btn');
    } else {
      $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="plus"]')
        .attr('disabled', true)
        .addClass('disabled-btn');
    }
    if(totalWeight < (MAX_PACKAGE_WEIGHT*5)) {
      $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="plus"]')
        .attr('disabled', false)
        .removeClass('disabled-btn');
    } else {
      $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="plus"]')
        .attr('disabled', true)
        .addClass('disabled-btn');
    }
  }

  function handleWeightChange(orderId, type) {
    let weightInput = $('.collie-table tfoot .input-group.total_weight input[data-row-id="'+orderId+'"]');
    let totalWeight = parseFloat(weightInput.val().replace('Kg',''));
    let collieInput = $('.collie-table tfoot .input-group.total_collies input[data-row-id="'+orderId+'"]');
    let currentCollies = parseInt(collieInput.val().replace('Collie(s)',''));

    if(type === 'plus') {
      $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="'+orderId+'"][data-type="minus"]')
        .attr('disabled', false)
        .removeClass('disabled-btn');

      // Check if weight per collie would exceed MAX_PACKAGE_WEIGHT
      let weightPerCollie = (totalWeight + 0.01) / currentCollies;

      if(weightPerCollie > MAX_PACKAGE_WEIGHT) {
        if(currentCollies < 5) {
          // Add new collie
          handleCollieQuantityChange(orderId, 'plus');
          // Keep total weight, just increment it
          weightInput.val((totalWeight + 0.01).toFixed(2) + " Kg");
        } else {
          // Max collies reached
          $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="plus"]')
            .attr('disabled', true)
            .addClass('disabled-btn');
        }
      } else {
        weightInput.val((totalWeight + 0.01).toFixed(2) + " Kg");
      }
    } else {
      if(totalWeight >= 0.02){
        $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="' + orderId + '"][data-type="minus"]')
          .attr('disabled', false)
          .removeClass('disabled-btn');
        weightInput.val((totalWeight - 0.01).toFixed(2) + " Kg");
      } else {
        $('.collie-table tfoot .input-group.total_weight .btn[data-row-id="'+orderId+'"][data-type="minus"]')
          .attr('disabled', true)
          .addClass('disabled-btn');
      }
    }
  }


  let intervalId = null;
  const REPEAT_DELAY = 50; // Milliseconds between repeats

  $(document).on('mousedown', '.collie-table tfoot .input-group .btn', function (e) {
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
    updateCollieListWs(orderId, method);

    // Setup repeat interval
    intervalId = setInterval(() => {
      if (method === 'weight') {
        handleWeightChange(orderId, type);
      }
      updateCollieListWs(orderId, method);
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


  let updateCollieItemList = function (totalQty, totalWeight, collieData, index=null, collieName=null) {

    let fixedIndex = index-1;
    let weight = totalWeight / totalQty;
    let newList = [];
    // If index and collieName are provided, update specific collie

    if (fixedIndex !== null && collieName !== null) {
      console.log('updateCollieItemList', collieData[fixedIndex],  collieData, index, fixedIndex, collieName);
      collieData[fixedIndex].name = collieName;
      // Recalculate package size for updated collie
      let packageSize = calculateVolumeSize(weight, collieName);
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
      let rest = totalQty - collieData.length;

      for (let i = 0; i < collieData.length; i++) {
        let collieItem = {};
        let collieName = collieData[i].name;
        let packageSize = calculateVolumeSize(weight, collieName);
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
        let packageSize = calculateVolumeSize(weight, '2-meter');
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
        let packageSize = calculateVolumeSize(weight, collieName);
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


  $.fancyConfirmKoopmanLabel = function (reference, button, row, trackingNumbers = "") {
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
            fetchNewLabel(button, row);
            $.fancybox.close(e);
          });
          $("#cancelConfirm").click(function (e) {
            button.removeClass('temp_disabled', "");
            row.removeClass('temp_disabled_row', "");
            $.fancybox.close(e);
          });
        }
      }
    );
  }
  //   pallet selectie button
  $(document).on('click', '[name="package_total_pallet"]', function () {
    let orderId = $(this).attr('data-row-id');
    $('.pallet_selection_box[data-row-id="' + orderId + '"]').toggle();
  });

  $(document).on('click', '.remove-collie', function () {
    let collie = $(this).attr('data-collo');
    let shipmentNumber = $(this).attr('data-nrzend');
    if (confirm("Weet je zeker dat je dit label uit de transmission portal wilt verwijderen?!") == true) {
      console.debug(['click ok', collie, shipmentNumber]);
    } else {
      console.debug('false');
      return false;
    }
  });


  $(document).on('click', '.collie-selection', function (e) {
    let $clickedLabel = $(this);
    $clickedLabel.toggleClass('temp_disabled', "");
    let $tr = $clickedLabel.closest('TR');
    let trackingEl = $clickedLabel.parents('td').find('.tracking_number');
    //Allready has tracking number
    let trackingNumbers = trackingEl.text().trim();
    if (trackingEl.text().trim().length > 0) {
      let reference = trackingEl.attr('data-reference');
      // Open customized confirmation dialog window
      $.fancyConfirmKoopmanLabel(reference, $clickedLabel, $tr, trackingNumbers);
    } else {
      fetchNewLabel($clickedLabel, $tr);
    }
  });


  $(document).on('keyup','.total_weight input', function (e) {
    let elem = $(this);
    let rowId = elem.data('row-id');
    let value = parseFloat(elem.val().replace('Kg',''));
    if(value > 115){
      $('.print-button[data-order="'+rowId+'"]').addClass('disabled').attr('disabled', true);
      $('.pallet-button[data-order="'+rowId+'"]').removeClass('disabled').removeAttr('disabled');
      $('.collie-table[data-row-id="'+rowId+'"] tbody tr td:first').addClass('disabled');
    } else {
      $('.print-button[data-order="'+rowId+'"]').removeClass('disabled').removeAttr('disabled');
      $('.pallet-button[data-order="'+rowId+'"]').addClass('disabled').attr('disabled', true);
      $('.collie-table[data-row-id="'+rowId+'"] tbody tr td:first').removeClass('disabled');
    }
  });


  let fetchNewLabel = function (button, row) {
    row.toggleClass('temp_disabled_row', "");
    let orderId = button.attr('data-row-id');
    let weightOption = $('.package_size_select[data-row-id="' + orderId + '"]').val();
    let orderWeight = button.attr('data-order-weight');
    let chosenCollies = button.attr('data-collies');

    let collieType = button.attr('data-collie-type');

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=print-label&id_order=' + orderId +
        '&weight=' + orderWeight +
        '&weight_option=' + weightOption +
        '&collies=' + chosenCollies +
        '&collie_type=' + collieType +
        '&token=' + token,
      type: 'GET'
    }).done(function (data) {
      if (data === 'printed') {
        location.reload();
      } else {
        $('#updateAddressModal .modal-body').html(data);
        $('#updateAddressModal').modal('show');
      }
    });
  }

  $(document).on('click', '#toevoegingForm button', function (e) {
    let weight = 0;
    let idProfile = $('#toevoegingForm [name="profile"]').val();
    let idOrder = $('#toevoegingForm [name="id_order"]').val();
    let defaultWeight = $('#toevoegingForm [name="weight"]').val();
    let weightOption = $('#toevoegingForm [name="weight_option"]').val();
    let collies = $('#toevoegingForm [name="collies"]').val();
    let collieType = $('#toevoegingForm [name="collie_type"]').val();
    let connectedOrders = [];

    if ($(e).attr('data-all') !== "0") {
      //current and all selected orders
      $('#toevoegingForm .linked_order:checked').each(function (key, val) {
        weight = parseFloat(weight) + parseFloat($(val).attr('data-weight'));
        connectedOrders.push($(val).val());
      });
      defaultWeight = parseFloat(defaultWeight) + parseFloat(weight);
    }

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + idProfile + '&method=print-label&id_order=' + idOrder +
        '&connected_orders=' + connectedOrders +
        '&weight=' + defaultWeight +
        '&weight_option=' + weightOption +
        '&collies=' + collies +
        '&collie_type=' + collieType +
        '&token=' + token,
      type: 'GET'
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
