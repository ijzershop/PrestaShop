$(function () {

  $('.createRetour').on('click', function (event) {
    event.stopImmediatePropagation();
    let orderId = $(this).attr('data-order-id');

    $.fancybox({
      width: 800,
      height: 800,
      autoSize: false,
      href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=orderretourinit&id_order=' + orderId + '&token=' + token,
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
      url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=orderretoursubmit&id_order=' + orderId + '&token=' + token,
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
        href: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=orderstatus&render_template=true&reference=' + reference + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=beingprepared_status&id_order=' + order + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=workshop_status&id_order=' + trello_order + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=workshop_status&id_order=' + trello_order + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=backorder_status&id_order=' + order + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=afhalen&id_order=' + order + '&token=' + token,
        type: 'GET'
      })
        .done(function (data) {
          $('form#retourForm .messages').html(data);
          // location.reload();
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=afgehaald&id_order=' + order + '&token=' + token,
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
        url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1&method=toegevoegd&id_order=' + order + '&token=' + token,
        type: 'GET'
      })
        .done(function (data) {
          $('form#retourForm .messages').html(data);
          location.reload();
        });
    });


    $(document).on('click', 'div.koopman label',function () {
      let $clickedLabel = $(this);
      let $input = $clickedLabel.prev('input');
      let $btnRow = $clickedLabel.closest('div.koopman');
      let $tr = $clickedLabel.closest('TR');
      let link = $btnRow.attr('data-href');
      let type = $input.val();
      let gewicht = 0;

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
            gewicht = 1;
            link += '&gewicht=' + gewicht + '&type=envelope';
            break;
          case 'plaat':
            gewicht = 15;
            link += '&gewicht=' + gewicht + '&type=plaat';
            break;
          case '1-meter':
            gewicht = 10;
            link += '&gewicht=' + gewicht + '&type=1-meter';
            break;
          case '2-meter-smaller':
            gewicht = 14;
            link += '&gewicht=' + gewicht + '&type=2-meter-smaller';
            break;
          case '2-meter-larger':
            gewicht = 30;
            link += '&gewicht=' + gewicht + '&type=2-meter-larger';
            break;
        }
        let d = new Date();
        let n = d.getDay();

        location.href = link;
      }
    });


});
