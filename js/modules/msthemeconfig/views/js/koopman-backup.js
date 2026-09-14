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

  let clickedButtonCheck = false;


  $('div.beingprepared-btn label').click(function () {
    let $clickedLabel = $(this);
    let $input = $clickedLabel.prev('input');
    let $btnRow = $clickedLabel.closest('div.beingprepared-btn');
    let $tr = $clickedLabel.closest('TR');
    let order = $btnRow.attr('data-order');
    let type = $input.val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=beingprepared_status&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        // $('form#retourForm .messages').html(data);
        location.reload();
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
        // $('form#retourForm .messages').html(data);
        location.reload();
      });

  });


  $(document).on('click', 'label.aftehalen', function () {
    let $clickedLabel = $(this);
    let $btnRow = $clickedLabel.closest('div.aftehalen-btn');
    let order = $btnRow.attr('data-order');

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=afhalen&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        $('form#retourForm .messages').html(data);
        location.reload();
      });

  });

  $(document).on('click', 'div.afgehaald-btn label', function () {
    let $clickedLabel = $(this);
    let $input = $clickedLabel.prev('input');
    let $btnRow = $clickedLabel.closest('div.afgehaald-btn');
    let $tr = $clickedLabel.closest('TR');
    let order = $btnRow.attr('data-order');
    let type = $input.val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=afgehaald&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        $('form#retourForm .messages').html(data);
        location.reload();
      });

  });

  $(document).on('click', 'div.toegevoegd-btn label', function () {
    let $clickedLabel = $(this);
    let $input = $clickedLabel.prev('input');
    let $btnRow = $clickedLabel.closest('div.toegevoegd-btn');
    let $tr = $clickedLabel.closest('TR');
    let order = $btnRow.attr('data-order');
    let type = $input.val();

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=toegevoegd&id_order=' + order + '&token=' + token,
      type: 'GET'
    })
      .done(function (data) {
        $('form#retourForm .messages').html(data);
        location.reload();
      });
  });


  // $(document).on('click', 'div.koopman label',function (e) {
  //   let $clickedLabel = $(this);
  //   let $input = $clickedLabel.prev('input');
  //   let $btnRow = $clickedLabel.closest('div.koopman');
  //   let $tr = $clickedLabel.closest('TR');
  //   let orderId = $input.attr('data-id-order');
  //   let type = $input.val();
  //   let gewicht = 0;
  //
  //   $clickedLabel.toggleClass('temp_disabled', "");
  //   $tr.toggleClass('temp_disabled_row', "");
  //   /*
  //   *  Gewijzigd door JB Stoker - Moderne Smid
  //   *  Pakket maten en soorten aangepast, tevens type pakket toegevoegd voor maatvoering
  //   *  1 -Envelop : (50 x 30 x 1=1Kg) / value = envelope
  //   *  2 -Plaat : (50 x 30 x 1=15Kg) / value = plaat
  //   *  3 -1 Meter : (50 x 30 x 1=15Kg) / value = 1-meter
  //   *  4 -2 Meter < 15 : (50 x 30 x 1= 14Kg) / value = 2-meter-smaller
  //   *  5 -2 Meter > 15 : (50 x 30 x 1= 30Kg) / value = 2-meter-larger
  //   *
  //   */
  //   if (type !== -1) {
  //     switch (type) {
  //       case 'envelope':
  //         gewicht = 5;
  //         break;
  //       case 'plaat':
  //         gewicht = 10;
  //         break;
  //       case '1-meter':
  //         gewicht = 15;
  //         break;
  //       case '2-meter-smaller':
  //         gewicht = 20;
  //         break;
  //       case '2-meter-larger':
  //         gewicht = 30;
  //         break;
  //     }
  //
  //     $.ajax({
  //       url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=print-label&id_order=' +
  //         orderId + '&weight='+gewicht+'&type='+type+'&token=' + token,
  //       type: 'GET'
  //     })
  //       .done(function (data) {
  //         if(data === 'printed'){
  //           location.reload();
  //         } else {
  //           $('#updateAddressModal .modal-content').html(data);
  //           $('#updateAddressModal').modal('show');
  //         }
  //       });
  //     }
  // });


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
    *  4 -2 Meter < 15 : (50 x 30 x 1= 14Kg) / value = 2-meter-smaller
    *  5 -2 Meter > 15 : (50 x 30 x 1= 30Kg) / value = 2-meter-larger
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
        case '2-meter-smaller':
          gewicht = 20;
          break;
        case '2-meter-larger':
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


  $(document).on('click', 'button#dag-afsluiting', function () {

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile=' + profileId + '&method=dag-afsluiting&token=' + token,
      type: 'GET'
    }).done(function (data) {
      // location.reload();
    });

  });


//   Nieuwe opzet label print kolom
//
//   //   minus button
//   $(document).on('click', '[name="package_size_minus"]', function () {
//     let orderId = $(this).attr('data-row-id');
//     let selectBox = $('[name="package_size"][data-row-id="' + orderId + '"]')[0];
//     let index = selectBox.selectedIndex;
//
//     if (index > 0) {
//       selectBox.selectedIndex = index - 1;
//     }
//
//     let selectedWeightValue = parseInt(selectBox.value);
//
//     if (selectedWeightValue > 0) {
//       $('.collie-selection[data-row-id="' + orderId + '"]').attr('data-order-weight', selectedWeightValue)
//     }
//   });
//
//   //   plus button
//   $(document).on('click', '[name="package_size_plus"]', function () {
//     let orderId = $(this).attr('data-row-id');
//     let selectBox = $('[name="package_size"][data-row-id="' + orderId + '"]')[0];
//     let index = selectBox.selectedIndex;
//
//     if (index < 20) {
//       selectBox.selectedIndex = index + 1;
//     }
//     let selectedWeightValue = parseInt(selectBox.value);
//
//     if (selectedWeightValue > 0) {
//       $('.collie-selection[data-row-id="' + orderId + '"]').attr('data-order-weight', selectedWeightValue)
//     }
//   });


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

  // Berekend in meter voor prijs, centimeters op het label: lengte * breedte * hoogte * 250
  let calculateVolumeSize = function (weight, type) {

    if (!['2-meter','pallet'].includes(type)) {
      type = '2-meter';
    }

    if (weight <= 0) {
      return 0;
    }

    let volumeHeight = 0;
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

        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_ENVELOPE_HEIGHT) {
          volumeHeight = MIN_ENVELOPE_HEIGHT;
          // Recalculate width based on fixed height
          packageSize.width = weight / (ENVELOPE_LENGTH * MIN_ENVELOPE_HEIGHT * VOLUME_MULTIPLIER);
        } else {
          packageSize.width = ENVELOPE_WIDTH; // Original width
        }

        packageSize.height = volumeHeight;
        packageSize.length = ENVELOPE_LENGTH;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = ENVELOPE_LENGTH * packageSize.width * volumeHeight * VOLUME_MULTIPLIER;
        packageSize.volumeSize = (ENVELOPE_LENGTH*100).toString() + '<sub>cm</sub> x ' + (packageSize.width*100).toFixed(2).toString() + '<sub>cm</sub> x ' + (volumeHeight*100).toFixed(2).toString() + '<sub>cm</sub>';
        packageSize.formula = ENVELOPE_LENGTH.toString() + ' x ' + packageSize.width.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
      case 'plaat':
        volumeHeight = weight / (PLAAT_LENGTH * PLAAT_WIDTH * VOLUME_MULTIPLIER);


        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_PLAAT_HEIGHT) {
          volumeHeight = MIN_PLAAT_HEIGHT;
          // Recalculate width based on fixed height
          packageSize.width = weight / (PLAAT_LENGTH * MIN_PLAAT_HEIGHT * VOLUME_MULTIPLIER);
        } else {
          packageSize.width = PLAAT_WIDTH; // Original width
        }

        packageSize.height = volumeHeight;
        packageSize.length = PLAAT_LENGTH;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = PLAAT_LENGTH * packageSize.width * volumeHeight * VOLUME_MULTIPLIER;
        packageSize.volumeSize = (PLAAT_LENGTH*100).toString() + '<sub>cm</sub> x ' + (packageSize.width*100).toFixed(2).toString() + '<sub>cm</sub> x ' + (volumeHeight*100).toFixed(2).toString() + '<sub>cm</sub>';
        packageSize.formula = PLAAT_LENGTH.toString() + ' x ' + packageSize.width.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
      case '1-meter':
        volumeHeight = weight / (METER_LENGTH * METER_WIDTH * VOLUME_MULTIPLIER);

        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_METER_HEIGHT) {
          volumeHeight = MIN_METER_HEIGHT;
          // Recalculate width based on fixed height
          packageSize.width = weight / (METER_LENGTH * MIN_METER_HEIGHT * VOLUME_MULTIPLIER);
        } else {
          packageSize.width = METER_WIDTH; // Original width
        }

        packageSize.height = volumeHeight;
        packageSize.length = METER_LENGTH;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = METER_LENGTH * packageSize.width * volumeHeight * VOLUME_MULTIPLIER;
        packageSize.volumeSize = (METER_LENGTH*100).toString() + '<sub>cm</sub> x ' + (packageSize.width*100).toFixed(2).toString() + '<sub>cm</sub> x ' + (volumeHeight*100).toFixed(2).toString() + '<sub>cm</sub>';
        packageSize.formula = METER_LENGTH.toString() + ' x ' + packageSize.width.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
      case '2-meter':
        volumeHeight = weight / (METER_2_LENGTH * METER_2_WIDTH * VOLUME_MULTIPLIER);

        // Add check for minimum height and recalculate width if needed
        if (volumeHeight < MIN_METER_2_HEIGHT) {
          volumeHeight = MIN_METER_2_HEIGHT;
          // Recalculate width based on fixed height
          packageSize.width = weight / (METER_2_LENGTH * MIN_METER_2_HEIGHT * VOLUME_MULTIPLIER);
        } else {
          packageSize.width = METER_2_WIDTH; // Original width
        }

        packageSize.height = volumeHeight;
        packageSize.length = METER_2_LENGTH;
        packageSize.volumeMultiplier = VOLUME_MULTIPLIER;
        packageSize.weight = METER_2_LENGTH * packageSize.width * volumeHeight * VOLUME_MULTIPLIER;
        packageSize.volumeSize = (METER_2_LENGTH*100).toString() + '<sub>cm</sub> x ' + (packageSize.width*100).toFixed(2).toString() + '<sub>cm</sub> x ' + (volumeHeight*100).toFixed(2).toString() + '<sub>cm</sub>';
        packageSize.formula = METER_2_LENGTH.toString() + ' x ' + packageSize.width.toString() + ' x ' + volumeHeight.toFixed(4).toString() + ' x ' + VOLUME_MULTIPLIER.toString();
        break;
    }

    return packageSize;
  }

  let updatePackageVolumes = function(qty, weight, collieType, collieTypeId){
    let collieStorageString = localStorage.getItem('current-collie-list');
    let selectedCollies = {};
    if(collieStorageString){
      let collieList = JSON.parse(collieStorageString);
      let newList = updateCollieItemList(weight, collieType, collieTypeId, collieList, qty, true);

      let tableData = '';
      let totalQty = 0;
      let totalVolumeWeight = 0;
      for (let key in newList) {
        if (newList[key]['qty'] > 0) {
          totalQty += newList[key]['qty'];
          totalVolumeWeight += newList[key]['weight'];
          tableData += '<tr><td>' + newList[key]['display_name'] + '</td>' +
            '<td class="text-center">' + newList[key]['qty'] + '</td>' +
            '<td><b>' + newList[key]['volumeSize'] + '</b> || ( <i>' + newList[key]['volumeFormula'] + ' = ' + newList[key]['volumeWeight'].toFixed(4) + '</i> )</td>' +
            '<td class="text-center">' + newList[key]['weight'].toFixed(2) + '</td></tr>';

          let newLine = {};
          newLine['name'] = newList[key]['name'].toString();
          newLine['qty'] = newList[key]['qty'].toString();
          newLine['width'] = (newList[key]['volumeWidth']*100).toFixed(2);
          newLine['height'] = (newList[key]['volumeHeight']*100).toFixed(2);
          newLine['length'] = (newList[key]['volumeLength']*100).toFixed(2);
          newLine['weight'] = newList[key]['volumeWeight'].toFixed(2);
          Object.assign(selectedCollies, newLine);
        }
      }

      // Replace all double quotes with single quotes using string replace
      selectedCollies = JSON.stringify(selectedCollies).replace(/"/g, "'");
      $('#selected_collie_values').val(selectedCollies);
      // console.log(selectedCollies);
      let htmlFooter = '<div class="row m-0 collie-type-footer"><div class="col-8"><table class="table table-condensed w-100">' +
        '<thead><tr><th>Type</th><th class="text-center">Aantal</th><th>Formaat</th><th class="text-center">Gewicht</th></tr></thead><tbody>' + tableData + '</tbody>' +
        '<tfoot style="border-top: 2px solid" class="border-dark"><tr><th>Totaal pakketten</th><td class="text-center">' + totalQty + '</td><th>Totaal gewicht</th><td class="text-center">' + totalVolumeWeight.toFixed(2) + '</td></tr></tfoot></table>' +
        '</div><div class="col-4">' +
        // '<label><input type="checkbox" name="split_or_move"/>Deel collie gewicht</label>' +
        '<input type="hidden" value="'+ selectedCollies + '" name="selected_collie_values" id="selected_collie_values"><button class="btn btn-primary w-100 print-button">Print</button></div> ' + '</div> ';

      $('.fancybox-inner .collie-type-footer-parent').html(htmlFooter);

      localStorage.setItem('current-collie-list', JSON.stringify(newList));
    }
  }


  let switchCollieType = function(boxId, type){
    // let splitOrMove = $('[name="split_or_move"]').is(':checked');
    let parentElemChecked = $('[name="parent-collie"]:checked');
    let data = parentElemChecked.data();
    let parentElem = $('.collie-input[data-name="'+data.name+'"]');
    let childElem = $('.collie-input[data-name="'+boxId+'"]');
    // if(splitOrMove){ //split collie weight
    //   let parentValueArray = parentElem.val().split('x');
    //   let childValueArray = childElem.val().split('x');
    //
    //   if(type === 'plus') {
    //     let total = parseInt(parentValueArray[0]);
    //     let weight = parseFloat(parentValueArray[1].replace('Kg',''));
    //
    //     if(total === 1){
    //       weight = weight/2;
    //       total = total+1;
    //     }
    //
    //     let newChildValue = 1 + 'x' + weight.toFixed(2) + 'Kg';
    //     let newParentValue = (total-1) + 'x' + weight.toFixed(2) + 'Kg'
    //
    //     parentElem.val(newParentValue);
    //     childElem.val(newChildValue);
    //
    //   } else {
    //
    //   }
    // } else { //move all collies
    let parentVal = parentElem.val();
    let childVal = childElem.val();
    parentElem.val(childVal);
    childElem.val(parentVal);
    // }
  }

  let updateCollieListWs = function(){
    $('.collie-input').each(function (index, elem) {
      let type = $(this).attr('data-name');
      let valueArray = $(this).val().split('x');
      let total = 0;
      let weight = 0;
      if(valueArray[0] !== '...'){
        total = parseInt(valueArray[0]);
        weight = parseFloat(valueArray[1].replace('Kg',''));
      }
      updatePackageVolumes(total, weight*total, type);
    });
  }

  //plus/minus button
  $(document).on('click', '.qty-button', function () {
    let orderId = $(this).attr('data-row-id');
    let boxId = $(this).attr('data-name');
    let type = $(this).attr('data-type');
    let input = $('.collie-input[data-row-id="'+orderId+'"][data-name="'+boxId+'"]');

    let value = input.val();
    let qtyWeightArray = value.replace('Kg','').split('x');
    let weight = parseFloat(qtyWeightArray[1]);
    let qty = parseInt(qtyWeightArray[0]);

    if(value === '...'){
      switchCollieType(boxId, type);
    }

    //Plus button click
    if (type === 'plus' && weight > 0.1) {
      //Calculate new weight
      let newWeight = (qty*weight)/(qty+1);
      //Check if new weight is within pallet thresholds
      if((newWeight >= EURO_PALLET_THRESHOLD && boxId === 'euro-pallet') || (newWeight < EURO_PALLET_THRESHOLD && newWeight >= MINI_PALLET_THRESHOLD && boxId === 'mini-pallet')){
        qtyWeightArray[1] = newWeight;
        qtyWeightArray[0] = qty + 1;
        input.val(qtyWeightArray[0] + 'x' + qtyWeightArray[1].toFixed(2) + 'Kg');
      } else {
        qtyWeightArray[1] = (qty*weight)/(qty+1);
        qtyWeightArray[0] = qty + 1;
        input.val(qtyWeightArray[0] + 'x' + qtyWeightArray[1].toFixed(2) + 'Kg');
      }
    }

    //Minus button click
    if(qtyWeightArray[0] > 1 && type === 'minus') {
      //Calculate new weight
      let newWeight = (qty*weight)/(qty-1);

      //Check if new weight is within allowed weight range for plaat, envelope, 1-meter, 2-meter
      if(newWeight <= MAX_PACKAGE_WEIGHT && ['plaat', 'envelope', '1-meter', '2-meter'].indexOf(boxId) > -1) {
        qtyWeightArray[1] = newWeight;
        qtyWeightArray[0] = qty - 1;
        input.val(qtyWeightArray[0] + 'x' + qtyWeightArray[1].toFixed(2) + 'Kg');
      } else{
        //Check if new weight is within allowed weight range for euro pallet or mini pallet
        if(newWeight < 1000){
          qtyWeightArray[1] = newWeight;
          qtyWeightArray[0] = qty - 1;
          input.val(qtyWeightArray[0] + 'x' + qtyWeightArray[1].toFixed(2) + 'Kg');
        }
      }
    }

    updateCollieListWs();
  });

  //plus/minus weight button
  $(document).on('click', '.qty-weight-button', function () {
    let orderId = $(this).attr('data-row-id');
    let boxId = $(this).attr('data-name');
    let type = $(this).attr('data-type');
    let input = $('.collie-input[data-row-id="'+orderId+'"][data-name="'+boxId+'"]');

    let value = input.val();
    let qtyWeightArray = value.replace('Kg','').split('x');
    let weight = parseFloat(qtyWeightArray[1]);
    let qty = parseInt(qtyWeightArray[0]);
    //Plus button click and check max weight
    if (type === 'plus' && weight < MAX_PACKAGE_WEIGHT && ['plaat', 'envelope', '1-meter', '2-meter'].indexOf(boxId) > -1) {
      let updatedWeight = weight + 0.1;
      qtyWeightArray[1] = (qty*updatedWeight)/qty;
      qtyWeightArray[0] = qty;
      input.val(qtyWeightArray[0] + 'x' + qtyWeightArray[1].toFixed(2) + 'Kg');
    } else {
      //Check if new weight is within allowed weight range for euro pallet or mini pallet
      let updatedWeight = weight + 0.1;
      if(updatedWeight < 1000) {
        qtyWeightArray[1] = updatedWeight;
        qtyWeightArray[0] = qty;
        input.val(qtyWeightArray[0] + 'x' + qtyWeightArray[1].toFixed(2) + 'Kg');
      }
    }

    if(type === 'minus' && weight > 0.1) {
      let updatedWeight = weight - 0.1;
      qtyWeightArray[1] = (qty*updatedWeight)/qty;
      qtyWeightArray[0] = qty;
      input.val(qtyWeightArray[0] + 'x' + qtyWeightArray[1].toFixed(2) + 'Kg');
    }


    updateCollieListWs();
  });

  let htmlCollieChoiceBlock = function (data, rowId) {
    let checked;

    let value = '...';
    if (data.qty > 0) {
      value = data.qty;
    }

    if (data.weight > 0) {
      checked = 'checked';
      value += 'x' + (data.weight / data.qty).toFixed(2) + 'Kg';
    } else {
      checked = '';
    }

    return '      <div class="col-6">' +
      '        <div class="card" style="border:2px solid #0c3b44;">' +
      '          <div class="card-header text-white bg-primary text-center font-weight-bold h2">' + data.display_name + '<input type="radio" name="parent-collie" title="Parent Collie" data-name="'+data.name+'" class="parent-collie float-right"  '+checked+'> </div>' +
      '          <div class="card-body">' +
      '          <div class="row">' +
      '          <div class="col-12 pb-1">' +
      '            <button class="btn btn-success w-100 qty-button" data-type="plus" data-row-id="'+rowId+'" data-name="'+data.name+'" type="button">+</button>' +
      '          </div>' +
      '          </div>' +
      '            <div class="row">' +
      '            <div class="input-group mb-1 col-12">' +
      '              <div class="input-group-prepend">' +
      '                <button class="btn btn-outline-secondary qty-weight-button" data-type="minus" data-row-id="'+rowId+'" data-name="'+data.name+'" type="button">-</button>' +
      '              </div>' +
      '              <input type="text" class="form-control text-center collie-input" data-row-id="'+rowId+'" data-name="'+data.name+'" aria-label="" value="' + value + '">' +
      '              <div class="input-group-append">' +
      '                <button class="btn btn-outline-secondary qty-weight-button" data-type="plus" data-row-id="'+rowId+'" data-name="'+data.name+'">+</button>' +
      '              </div>' +
      '            </div>' +
      '            </div>' +
      '            <div class="row">' +
      '             <div class="col-12">' +
      '            <button class="btn btn-success w-100 qty-button" data-type="minus" data-row-id="'+rowId+'" data-name="'+data.name+'" type="button">-</button>' +
      '          </div>' +
      '            </div>' +
      '          </div>' +
      '        </div>' +
      '      </div>';
  }


  let calculateCollieTotal = function (weight, maxCollieWeight = MAX_PACKAGE_WEIGHT) {
    return Math.ceil(parseFloat(weight) / maxCollieWeight);
  }

  let updateCollieItemList = function (weight, collieType, collieTypeId, items, qty=0, update=false) {
    let packageSize = '';

    let collyName = collieType.toLowerCase().replace(' ', '-');

    switch (collyName) {
      case 'plaat':
        if(update){
          items['plaat']['weight'] = weight;
        } else {
          items['plaat']['weight'] += weight;
        }

        if(qty > 0) {
          items['plaat']['qty'] = qty;
        } else {
          items['plaat']['qty'] = calculateCollieTotal(items['plaat']['weight']);
        }

        packageSize = calculateVolumeSize(items['plaat']['weight'] / items['plaat']['qty'], 'plaat');
        items['plaat']['volumeWidth'] = packageSize.width;
        items['plaat']['volumeHeight'] = packageSize.height;
        items['plaat']['volumeLength'] = packageSize.length;
        items['plaat']['volumeMultiplier'] = packageSize.volumeMultiplier;
        items['plaat']['volumeWeight'] = packageSize.weight;
        items['plaat']['volumeSize'] = packageSize.volumeSize;
        items['plaat']['volumeFormula'] = packageSize.formula;
        break;
      case '1-meter':
        if(update){
          items['1-meter']['weight'] = weight;
        } else {
          items['1-meter']['weight'] += weight;
        }
        if(qty > 0) {
          items['1-meter']['qty'] = qty;
        } else {
          items['1-meter']['qty'] = calculateCollieTotal(items['1-meter']['weight']);
        }
        packageSize = calculateVolumeSize(items['1-meter']['weight'] / items['1-meter']['qty'], '1-meter');
        items['1-meter']['volumeWidth'] = packageSize.width;
        items['1-meter']['volumeHeight'] = packageSize.height;
        items['1-meter']['volumeLength'] = packageSize.length;
        items['1-meter']['volumeMultiplier'] = packageSize.volumeMultiplier;
        items['1-meter']['volumeWeight'] = packageSize.weight;
        items['1-meter']['volumeSize'] = packageSize.volumeSize;
        items['1-meter']['volumeFormula'] = packageSize.formula;
        break;
      case '2-meter':
        if(update){
          items['2-meter']['weight'] = weight;
        } else {
          items['2-meter']['weight'] += weight;
        }
        if(qty > 0) {
          items['2-meter']['qty'] = qty;
        } else {
          items['2-meter']['qty'] = calculateCollieTotal(items['2-meter']['weight']);
        }
        packageSize = calculateVolumeSize(items['2-meter']['weight'] / items['2-meter']['qty'], '2-meter');

        items['2-meter']['volumeWidth'] = packageSize.width;
        items['2-meter']['volumeHeight'] = packageSize.height;
        items['2-meter']['volumeLength'] = packageSize.length;
        items['2-meter']['volumeMultiplier'] = packageSize.volumeMultiplier;
        items['2-meter']['volumeWeight'] = packageSize.weight;
        items['2-meter']['volumeSize'] = packageSize.volumeSize;
        items['2-meter']['volumeFormula'] = packageSize.formula;
        break;
      case 'envelope':
        if(update){
          items['envelope']['weight'] = weight;
        } else {
          items['envelope']['weight'] += weight;
        }
        if(qty > 0) {
          items['envelope']['qty'] = qty;
        } else {
          items['envelope']['qty'] = calculateCollieTotal(items['envelope']['weight']);
        }
        packageSize = calculateVolumeSize(items['envelope']['weight'] / items['envelope']['qty'], 'envelope');
        items['envelope']['volumeWidth'] = packageSize.width;
        items['envelope']['volumeHeight'] = packageSize.height;
        items['envelope']['volumeLength'] = packageSize.length;
        items['envelope']['volumeMultiplier'] = packageSize.volumeMultiplier;
        items['envelope']['volumeWeight'] = packageSize.weight;
        items['envelope']['volumeSize'] = packageSize.volumeSize;
        items['envelope']['volumeFormula'] = packageSize.formula;
        break;
      case 'euro-pallet':
        if(update){
          items['euro-pallet']['weight'] = weight;
        } else {
          items['euro-pallet']['weight'] += weight;
        }
        if(qty > 0) {
          items['euro-pallet']['qty'] = qty;
        } else {
          items['euro-pallet']['qty'] = calculateCollieTotal(items['euro-pallet']['weight'], 1000);
        }
        items['euro-pallet']['volumeWidth'] = 0.80;
        items['euro-pallet']['volumeHeight'] = 2.20;
        items['euro-pallet']['volumeLength'] = 1.20;
        items['euro-pallet']['volumeMultiplier'] = 0;
        items['euro-pallet']['volumeWeight'] = items['euro-pallet']['weight']/items['euro-pallet']['qty'];
        items['euro-pallet']['volumeSize'] =  '120 x 80 x 220';
        items['euro-pallet']['volumeFormula'] = '';
        break;
      case 'mini-pallet':
        if(update){
          items['mini-pallet']['weight'] = weight;
        } else {
          items['mini-pallet']['weight'] += weight;
        }
        if(qty > 0) {
          items['mini-pallet']['qty'] = qty;
        } else {
          items['mini-pallet']['qty'] = calculateCollieTotal(items['mini-pallet']['weight'], 1000);
        }
        items['mini-pallet']['volumeWidth'] = 0.50;
        items['mini-pallet']['volumeHeight'] = 2.20;
        items['mini-pallet']['volumeLength'] = 0.50;
        items['mini-pallet']['volumeMultiplier'] = 0;
        items['mini-pallet']['volumeWeight'] = items['mini-pallet']['weight']/items['mini-pallet']['qty'];
        items['mini-pallet']['volumeSize'] =  '60 x 50 x 120';
        items['mini-pallet']['volumeFormula'] = '';
        break;
      case 'pallet':
        if(update){
          items['pallet']['weight'] = weight;
        } else {
          items['pallet']['weight'] += weight;
        }
        if(qty > 0) {
          items['pallet']['qty'] = qty;
        } else {
          items['pallet']['qty'] = calculateCollieTotal(items['pallet']['weight'], 1000);
        }
        items['pallet']['volumeWidth'] = 1.00;
        items['pallet']['volumeHeight'] = 2.20;
        items['pallet']['volumeLength'] = 2.00;
        items['pallet']['volumeMultiplier'] = 0;
        items['pallet']['volumeWeight'] = items['pallet']['weight']/items['pallet']['qty'];
        items['pallet']['volumeSize'] =  '100 x 200 x 220';
        items['pallet']['volumeFormula'] = '';
        break;
      default:
        if(update){
          items['2-meter']['weight'] = weight;
        } else {
          items['2-meter']['weight'] += weight;
        }
        items['2-meter']['qty'] = calculateCollieTotal(items['2-meter']['weight']);

        packageSize = calculateVolumeSize(items['2-meter']['weight'] / items['2-meter']['qty'], '2-meter');
        items['2-meter']['volumeWidth'] = packageSize.width;
        items['2-meter']['volumeHeight'] = packageSize.height;
        items['2-meter']['volumeLength'] = packageSize.length;
        items['2-meter']['volumeMultiplier'] = packageSize.volumeMultiplier;
        items['2-meter']['volumeWeight'] = packageSize.weight;
        items['2-meter']['volumeSize'] = packageSize.volumeSize;
        items['2-meter']['volumeFormula'] = packageSize.formula;
    }
    return items;
  }


  $.fancyConfirmKoopmanLabelCollieTypeSelection = function (data) {
    let newList = {};
    // newList['plaat'] = {};
    // newList['plaat']['display_name'] = 'Plaat';
    // newList['plaat']['name'] = 'plaat';
    // newList['plaat']['qty'] = 0;
    // newList['plaat']['weight'] = 0;
    // newList['plaat']['volumeWidth'] = 0;
    // newList['plaat']['volumeHeight'] = 0;
    // newList['plaat']['volumeLength'] = 0;
    // newList['plaat']['volumeMultiplier'] = 0;
    // newList['plaat']['volumeWeight'] = 0;
    // newList['plaat']['volumeSize'] = '';
    // newList['plaat']['volumeFormula'] = '';
    // newList['1-meter'] = {};
    // newList['1-meter']['display_name'] = '1 Meter pakket';
    // newList['1-meter']['name'] = '1-meter';
    // newList['1-meter']['qty'] = 0;
    // newList['1-meter']['weight'] = 0;
    // newList['1-meter']['volumeWidth'] = 0;
    // newList['1-meter']['volumeHeight'] = 0;
    // newList['1-meter']['volumeLength'] = 0;
    // newList['1-meter']['volumeMultiplier'] = 0;
    // newList['1-meter']['volumeWeight'] = 0;
    // newList['1-meter']['volumeSize'] = '';
    // newList['1-meter']['volumeFormula'] = '';
    newList['pallet'] = {};
    newList['pallet']['display_name'] = 'Pallet';
    newList['pallet']['name'] = 'pallet';
    newList['pallet']['qty'] = 0;
    newList['pallet']['weight'] = 0;
    newList['pallet']['volumeWidth'] = 0;
    newList['pallet']['volumeHeight'] = 0;
    newList['pallet']['volumeLength'] = 0;
    newList['pallet']['volumeMultiplier'] = 0;
    newList['pallet']['volumeWeight'] = 0;
    newList['pallet']['volumeSize'] = '';
    newList['pallet']['volumeFormula'] = '';
    newList['2-meter'] = {};
    newList['2-meter']['display_name'] = 'Collie';
    newList['2-meter']['name'] = '2-meter';
    newList['2-meter']['qty'] = 0;
    newList['2-meter']['weight'] = 0;
    newList['2-meter']['volumeWidth'] = 0;
    newList['2-meter']['volumeHeight'] = 0;
    newList['2-meter']['volumeLength'] = 0;
    newList['2-meter']['volumeMultiplier'] = 0;
    newList['2-meter']['volumeWeight'] = 0;
    newList['2-meter']['volumeSize'] = '';
    newList['2-meter']['volumeFormula'] = '';
    // newList['envelope'] = {};
    // newList['envelope']['display_name'] = 'Envelope';
    // newList['envelope']['name'] = 'envelope';
    // newList['envelope']['qty'] = 0;
    // newList['envelope']['weight'] = 0;
    // newList['envelope']['volumeWidth'] = 0;
    // newList['envelope']['volumeHeight'] = 0;
    // newList['envelope']['volumeLength'] = 0;
    // newList['envelope']['volumeMultiplier'] = 0;
    // newList['envelope']['volumeWeight'] = 0;
    // newList['envelope']['volumeSize'] = '';
    // newList['envelope']['volumeFormula'] = '';
    // newList['euro-pallet'] = {};
    // newList['euro-pallet']['display_name'] = 'Euro Pallet';
    // newList['euro-pallet']['name'] = 'euro-pallet';
    // newList['euro-pallet']['qty'] = 0;
    // newList['euro-pallet']['weight'] = 0;
    // newList['euro-pallet']['volumeWidth'] = 0;
    // newList['euro-pallet']['volumeHeight'] = 0;
    // newList['euro-pallet']['volumeLength'] = 0;
    // newList['euro-pallet']['volumeMultiplier'] = 0;
    // newList['euro-pallet']['volumeWeight'] = 0;
    // newList['euro-pallet']['volumeSize'] = '';
    // newList['euro-pallet']['volumeFormula'] = '';
    // newList['mini-pallet'] = {};
    // newList['mini-pallet']['display_name'] = 'Mini Pallet';
    // newList['mini-pallet']['name'] = 'mini-pallet';
    // newList['mini-pallet']['qty'] = 0;
    // newList['mini-pallet']['weight'] = 0;
    // newList['mini-pallet']['volumeWidth'] = 0;
    // newList['mini-pallet']['volumeHeight'] = 0;
    // newList['mini-pallet']['volumeLength'] = 0;
    // newList['mini-pallet']['volumeMultiplier'] = 0;
    // newList['mini-pallet']['volumeWeight'] = 0;
    // newList['mini-pallet']['volumeSize'] = '';
    // newList['mini-pallet']['volumeFormula'] = '';



    let selectedCollies = {};

    if(parseFloat(data.totalOrderWeight) > EURO_PALLET_THRESHOLD || parseFloat(data.totalOrderWeight) > MINI_PALLET_THRESHOLD) {
      selectedCollies['euro-pallet'] = newList['euro-pallet'];

      //check if the total weight is eligible for a pallet
      if (parseFloat(data.totalOrderWeight) > PALLET_THRESHOLD) {
        newList = updateCollieItemList(parseFloat(data.totalOrderWeight), 'pallet', '', newList, 1);
      } else if (parseFloat(data.totalOrderWeight) > EURO_PALLET_THRESHOLD) {
        newList = updateCollieItemList(parseFloat(data.totalOrderWeight), 'euro-pallet', '', newList, 1);
      } else if (parseFloat(data.totalOrderWeight) > MINI_PALLET_THRESHOLD) {
        newList = updateCollieItemList(parseFloat(data.totalOrderWeight), 'mini-pallet', '', newList, 1);
      }
    } else {
      if (typeof data.orderlineQty === 'string' || data.orderlineQty instanceof String) {
        let linesQty = data.orderlineQty.split(',');
        let linesWeight = data.orderlineWeight.split(',');
        let linesCollie = data.orderlineShippingTypeName.split(',');
        let linesCollieIds = data.orderlineShippingTypeValue.split(',');

        for (let i = 0; i < linesQty.length; i++) {
          newList = updateCollieItemList(parseFloat(linesWeight[i]), linesCollie[i], linesCollieIds[i], newList, calculateCollieTotal(linesWeight[i]));
        }
      } else {
        let linesWeight = data.orderlineWeight;
        let linesCollie = data.orderlineShippingTypeName;
        let linesCollieIds = data.orderlineShippingTypeValue;

        newList = updateCollieItemList(parseFloat(linesWeight), linesCollie, linesCollieIds, newList,calculateCollieTotal(linesWeight));
      }
    }

    localStorage.setItem('current-collie-list', JSON.stringify(newList));

    let html = '';
    let tableData = '';
    let totalQty = 0;
    let totalVolumeWeight = 0;
    for (let key in newList) {
      html += htmlCollieChoiceBlock(newList[key], data.rowId);

      if (newList[key]['qty'] > 0) {
        totalQty += newList[key]['qty'];
        totalVolumeWeight += newList[key]['weight'];
        tableData += '<tr><td>' + newList[key]['display_name'] + '</td>' +
          '<td class="text-center">' + newList[key]['qty'] + '</td>' +
          '<td><b>' + newList[key]['volumeSize'] + '</b> || ( <i>' + newList[key]['volumeFormula'] + ' = ' + newList[key]['volumeWeight'].toFixed(4) + '</i> )</td>' +
          '<td class="text-center">' + newList[key]['weight'].toFixed(2) + '</td></tr>';

        let newLine = {};
        newLine['name'] = newList[key]['name'].toString();
        newLine['qty'] = newList[key]['qty'].toString();
        newLine['width'] = (newList[key]['volumeWidth']*100).toFixed(2);
        newLine['height'] = (newList[key]['volumeHeight']*100).toFixed(2);
        newLine['length'] = (newList[key]['volumeLength']*100).toFixed(2);
        newLine['weight'] = newList[key]['volumeWeight'].toFixed(2);
        Object.assign(selectedCollies, newLine);
      }
    }

    // Replace all double quotes with single quotes using string replace
    selectedCollies = JSON.stringify(selectedCollies).replace(/"/g, "'");

    let htmlFooter = '<div class="row m-0 collie-type-footer"><div class="col-8"><table class="table table-condensed w-100">' +
      '<thead><tr><th>Type</th><th class="text-center">Aantal</th><th>Formaat</th><th class="text-center">Gewicht</th></tr></thead><tbody>' + tableData + '</tbody>' +
      '<tfoot style="border-top: 2px solid" class="border-dark"><tr><th>Totaal pakketten</th><td class="text-center">' + totalQty + '</td><th>Totaal gewicht</th><td class="text-center">' + totalVolumeWeight.toFixed(2) + '</td></tr></tfoot></table>' +
      '</div><div class="col-4">' +
      // '<label><input type="checkbox" name="split_or_move"/ checked>Deel collie gewicht</label>' +
      '<input type="hidden" value="'+ selectedCollies + '" name="selected_collie_values" id="selected_collie_values"><button class="btn btn-primary w-100 print-button">Print</button></div> ' + '</div> ';

    $.fancybox.open({
        content: '<div class="row m-0"><a type="#" class="fancybox-item fancybox-close" href="javascript:jQuery.fancybox.close();"></a> ' + html + ' </div><div class="collie-type-footer-parent">' + htmlFooter +'</div>',
        type: 'inline',
        autoSize: true,
        modal: true,
        animationDuration: 350,
        animationEffect: 'material',
        afterShow: function () {
          console.log('fancybox opened')
        }
      }
    );
  }

  $(document).on('click', '[name="make-label"]', function () {
    let data = $(this).data();
    $.fancyConfirmKoopmanLabelCollieTypeSelection(data);
  });

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
