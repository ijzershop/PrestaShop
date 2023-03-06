/**
 * 2007-2020 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    PrestaShop SA <contact@prestashop.com>
 *  @copyright 2007-2020 PrestaShop SA
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 *
 * Don't forget to prefix your containers with your own identifier
 * to avoid any conflicts with others containers.
 */


  function setSortable($parentFormElement) {
    let selectedArray = [];
    if ($parentFormElement.find('ol').length === 0) {
      $parentFormElement.append('<ol id="home_categories_sorted" class="col-xs-8 col-xs-offset-4 ui-sortable"></ol><input type="hidden" name="MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED" id="MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED"/>');
    } else {
      $('#home_categories_sorted').html('');
    }
    $('#MSTHEMECONFIG_HOMEPAGE_CATEGORIES option:selected').each(function (index, val) {
      $('#home_categories_sorted').append('<li data-id="' + val.value + '">' + val.textContent + '</li>');

        selectedArray.push(val.value);

      $('#MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED').val(JSON.stringify(selectedArray));
    });


    $('#home_categories_sorted').sortable({
      update: function (event, ui) {
        let selectedArray = [];
        $('#home_categories_sorted li').each(function (index, el) {

            selectedArray.push(el.dataset.id);

          $('#MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED').val(JSON.stringify(selectedArray));
        });
      }
    });
  }
$(function () {
  $(document).on('select2:select', '#MSTHEMECONFIG_HOMEPAGE_CATEGORIES', function (event) {
    let $parentFormElement = $(this).parents('.form-group');
    setSortable($parentFormElement);
  });


  function setEmailInputList($parentFormElement) {
    if ($parentFormElement.find('ol').length === 0) {
      $parentFormElement.append('<style type="text/css"> #extra_email_settings li{padding: 5px; border: 1px solid grey;} </style>');
      $parentFormElement.append('<ol id="extra_email_settings" class="col-xs-12 list-unstyled"></ol>');
    } else {
      $('#extra_email_settings').html('');
    }

    let jsonVal = $('#MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON').val();
    if (typeof jsonVal !== 'undefined' && jsonVal !== '') {
      let existingData = JSON.parse(jsonVal);
      if (existingData !== null) {
        for (let i = 0; i < existingData.length; i++) {
          let statusText = $('#MSTHEMECONFIG_ORDERSTATE_SENDMAIL option[value=' + existingData[i].id_order_state + ']').text();
          let statusId = existingData[i].id_order_state;
          let statusFirstEmail = existingData[i].first_email_order_state;
          let statusSecondEmail = existingData[i].second_email_order_state;

          $('#extra_email_settings').append('<li data-id="' + statusId + '"><div class="row" data-id="' + statusId + '"> <div class="form-group col-xs-12" data-tab-id="email"><div class="form-group text-center" data-tab-id="email"><h2>Orderstatus: ' + statusText + '</h2></div> </div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Eerste email adres <input type="hidden" name="SENDMAIL_ORDER_STATUS[]" value="' + statusId + '"> </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_FIRST_EMAIL[]" value="' + statusFirstEmail + '" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon gezonden moet worden by order status wijziging </p></div></div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Tweede email adres </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_SECOND_EMAIL[]" value="' + statusSecondEmail + '" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon email CC moet worden </p></div></div><div class="form-group col-xs-2" data-tab-id="email"><label class="control-label col-lg-3"></label><div class="col-lg-9"><a class="btn btn-danger trash-sendmail-row" data-id="' + statusId + '"><i class="icon-trash"></i></a></div></div></li>');
        }
      }
    }
  }

  function setEmailInputRow($parentFormElement, statusText, statusId) {
    $('#extra_email_settings').append('<li data-id="' + statusId + '"><div class="row" data-id="' + statusId + '"> <div class="form-group col-xs-12" data-tab-id="email"><div class="form-group text-center" data-tab-id="email"><h2>Orderstatus: ' + statusText + '</h2></div> </div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Eerste email adres <input type="hidden" name="SENDMAIL_ORDER_STATUS[]" value="' + statusId + '"> </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_FIRST_EMAIL[]" value="" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon gezonden moet worden by order status wijziging </p></div></div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Tweede email adres </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_SECOND_EMAIL[]" value="" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon email CC moet worden</p></div></div><div class="form-group col-xs-2" data-tab-id="email"><label class="control-label col-lg-3"></label><div class="col-lg-9"><a class="btn btn-danger trash-sendmail-row" data-id="' + statusId + '"><i class="icon-trash"></i></a></div></div></li>');
  }

  $(document).on('select2:select', '#MSTHEMECONFIG_ORDERSTATE_SENDMAIL', function (event) {

    event.preventDefault();
    let text = event.params.data.text;
    let value = event.params.data.id;
    let $parentFormElement = $(this).closest('.form-group');
    let exists = false;
    $('ol#extra_email_settings li').each(function (index, el) {
      if ($(el).attr('data-id') === value) {
        exists = true;
        return;
      }
    });

    if (!exists) {
      setEmailInputRow($parentFormElement, text, value);
    }
  });

  $(document).on('click', '.trash-sendmail-row', function (event) {
    event.preventDefault();
    let id = $(this).attr('data-id');
    $('#extra_email_settings li[data-id="' + id + '"]').remove();
  });

  /**
   * Update styling of config form
   */
  $('.nav.nav-tabs').addClass('nav-pills nav-stacked col-sm-3').removeClass('nav-tabs');
  $('.tab-content').addClass('col-sm-9');
  $('#fieldset_0').addClass('row');
  $('.panel-footer').addClass('col-xs-12');
  $('.form-wrapper').css('max-width', '100%');


  $('.nav#modernesmid-config-tab button').on('show.bs.tab', function (event) {
    let panel = $(event.target).attr('data-panel');

    $.ajax({
      url: window.msThemeConfigAjaxUrl + panel,
    }).done(function (e) {
      $('#v-pills-' + panel).html(e);

      new window.prestashop.component.TinyMCEEditor();

      setSortable($('.form-group[data-tab-id="main"]').first());
      setEmailInputList($('.form-group[data-tab-id="email"]'));

      //Select2 input without ajax call
      $('.select2-native-input').each(function (elem, index) {
        $(this).select2();
      });
      //Select2 input with ajax call
      $('.select2-data-input').each(function (elem, index) {
        let domElem = $(this);
        let dataType = domElem.attr('data-type');
        let multiple = domElem.get(0).hasAttribute('multiple');

        if (multiple) {
          $(this).select2({
            width: '100%',
            multiple: true,
            ajax: {
              cache: true,
              url: window.msThemeConfigSelect2Url + dataType,
              dataType: 'json',
              data: function (params) {
                return {
                  search: params.term,
                };
              }
            }
          });
        } else {
          $(this).select2({
            width: '100%',
            ajax: {
              cache: true,
              url: window.msThemeConfigSelect2Url + dataType,
              dataType: 'json',
              data: function (params) {
                return {
                  search: params.term,
                };
              }
            }
          });
        }
      });
    });

  });





  //
  // function setTinyMceAfterPanelLoad(domId){
  //
  //   const editor = new window.prestashop.component.TinyMCEEditor();
  //
  //
  //
  //   let editorElem = editor.panelLoaded();
  //
  //   // console.log([domId, editorElem]);
  //   // if (editorElem) {
  //   //   // Reset content to force refresh of editor
  //   //   editorElem.destroy();
  //   // }
  // }

    $(document).on('change', '#mailtheme-symlink', function(){
        let enabled = $(this).prop('checked');
        $.ajax({
          url: msThemeConfigSymLinkMailTheme + enabled,
          type: 'GET',
        }).done(function (e) {
          $('form#retourForm .messages').html(e);
        })
          .fail(function (e) {
            $('form#retourForm .messages').html(e);
          });
      });
});

