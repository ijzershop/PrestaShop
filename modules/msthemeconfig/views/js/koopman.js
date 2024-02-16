$(function () {
  let profileId = $('#employee-profile-id').val();

  $('.createRetour').on('click', function (event) {
    event.stopImmediatePropagation();
    let orderId = $(this).attr('data-order-id');

    $.fancybox({
      width: 800,
      height: 800,
      autoSize: false,
      href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=orderretourinit&id_order=' + orderId + '&token=' + token,
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
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=orderretoursubmit&id_order=' + orderId + '&token=' + token,
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
        href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=orderstatus&render_template=true&reference=' + reference + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=beingprepared_status&id_order=' + order + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=workshop_status&id_order=' + trello_order + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=workshop_status&id_order=' + trello_order + '&token=' + token,
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


    $(document).on('click', 'div.backorder-btn label',function () {

      let $clickedLabel = $(this);
      let $input = $clickedLabel.prev('input');
      let $btnRow = $clickedLabel.closest('div.backorder-btn');
      let $tr = $clickedLabel.closest('TR');
      let order = $btnRow.attr('data-order');
      let type = $input.val();

      $.ajax({
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=backorder_status&id_order=' + order + '&token=' + token,
        type: 'GET'
      })
        .done(function (data) {
          // $('form#retourForm .messages').html(data);
          location.reload();
        });

    });


    $(document).on('click', 'label.aftehalen',function () {
      let $clickedLabel = $(this);
      let $btnRow = $clickedLabel.closest('div.aftehalen-btn');
      let order = $btnRow.attr('data-order');

      $.ajax({
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=afhalen&id_order=' + order + '&token=' + token,
        type: 'GET'
      })
        .done(function (data) {
          $('form#retourForm .messages').html(data);
          location.reload();
        });

    });

    $(document).on('click', 'div.afgehaald-btn label',function () {
      let $clickedLabel = $(this);
      let $input = $clickedLabel.prev('input');
      let $btnRow = $clickedLabel.closest('div.afgehaald-btn');
      let $tr = $clickedLabel.closest('TR');
      let order = $btnRow.attr('data-order');
      let type = $input.val();

      $.ajax({
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=afgehaald&id_order=' + order + '&token=' + token,
        type: 'GET'
      })
        .done(function (data) {
          $('form#retourForm .messages').html(data);
          location.reload();
        });

    });

    $(document).on('click', 'div.toegevoegd-btn label',function () {
      let $clickedLabel = $(this);
      let $input = $clickedLabel.prev('input');
      let $btnRow = $clickedLabel.closest('div.toegevoegd-btn');
      let $tr = $clickedLabel.closest('TR');
      let order = $btnRow.attr('data-order');
      let type = $input.val();

      $.ajax({
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=toegevoegd&id_order=' + order + '&token=' + token,
        type: 'GET'
      })
        .done(function (data) {
          $('form#retourForm .messages').html(data);
          location.reload();
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
      *  4 -2 Meter < 15 : (50 x 30 x 1= 14Kg) / value = 2-meter-smaller
      *  5 -2 Meter > 15 : (50 x 30 x 1= 30Kg) / value = 2-meter-larger
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
          case '2-meter-smaller':
            gewicht = 20;
            break;
          case '2-meter-larger':
            gewicht = 30;
            break;
        }


        $.ajax({
          url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=print-label&id_order=' + orderId + '&weight='+gewicht+'&type='+type+'&token=' + token,
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




  $(document).on('click', '.updateAddress',function () {
    let orderId = $('#updateAddressKoopman [name="id_order"]').val();
    let profileId = $('#updateAddressKoopman [name="profile"]').val();
    let type = $('#updateAddressKoopman [name="type"]').val();
    let gewicht = $('#updateAddressKoopman [name="weight"]').val();
    let token = $('#updateAddressKoopman [name="token"]').val();

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
        'address1': address1,
        'house_number': house_number,
        'house_number_extension': house_number_extension,
        'postcode': postcode,
        'city': city,
        'updateAddress': 1,
      }

      $.ajax({
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=print-label',
        type: 'POST',
        data: data
      })
        .done(function (data) {
          console.log([data === 'printed', data])
          if(data === 'printed'){
            location.reload();
          } else {
            $('#updateAddressModal .modal-content').html(data);
            $('#updateAddressModal').modal('show');
          }
        });
    }
  });



    $(document).on('click','.insert-address',function (e) {
        let row = e.currentTarget.dataset.rowid;
      let street = document.querySelector('.insert-address-street[data-rowid="'+row+'"]').innerText;
        let city = document.querySelector('.insert-address-city[data-rowid="'+row+'"]').innerText;

        $('#address1').val(street);
        $('#city').val(city);

        e.preventDefault();
    });


  $(document).on('click', 'button#dag-afsluiting',function () {

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=dag-afsluiting&token=' + token,
      type: 'GET'
    }).done(function (data) {
        // location.reload();
      });

  });




















//   Nieuwe opzet label print kolom

  //   minus button
  $(document).on('click', '[name="package_size_minus"]', function(){
      let orderId = $(this).attr('data-row-id');
      let selectBox = $('[name="package_size"][data-row-id="'+orderId+'"]')[0];
      let index = selectBox.selectedIndex;
      if(index > 0){
        selectBox.selectedIndex = index-1;
      }
  });

  //   plus button
  $(document).on('click', '[name="package_size_plus"]', function(){
    let orderId = $(this).attr('data-row-id');
    let selectBox = $('[name="package_size"][data-row-id="'+orderId+'"]')[0];
    let index = selectBox.selectedIndex;
    if(index < 20){
      selectBox.selectedIndex = index+1;
    }
  });

  //   pallet selectie button
  $(document).on('click', '[name="package_total_pallet"]', function(){
    let orderId = $(this).attr('data-row-id');
      $('.pallet_selection_box[data-row-id="'+orderId+'"]').toggle();
  });

  $(document).on('click', '.collie-selection',function (e) {
    let $clickedLabel = $(this);
    $clickedLabel.toggleClass('temp_disabled', "");
    let $tr = $clickedLabel.closest('TR');
    $tr.toggleClass('temp_disabled_row', "");

    let orderId = $clickedLabel.attr('data-row-id');
    let weightOption = $('.package_size_select[data-row-id="'+orderId+'"]').val();
    let orderWeight = $clickedLabel.attr('data-order-weight');
    let chosenCollies = $clickedLabel.attr('data-collies');
    let collieType = $clickedLabel.attr('data-collie-type');

    $.ajax({
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&profile='+profileId+'&method=print-label&id_order=' + orderId +
        '&weight=' + orderWeight +
        '&weight_option=' + weightOption +
        '&collies=' + chosenCollies +
        '&collie_type=' + collieType +
        '&token=' + token,
      type: 'GET'
    }).done(function (data) {
      if(data === 'printed'){
        location.reload();
      } else {
        $('#updateAddressModal .modal-body').html(data);
        $('#updateAddressModal').modal('show');
      }
    });
  });










});
