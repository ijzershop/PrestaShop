// admin-dev/themes/new-theme/js/pages/tax/index.js

// 1. import the grid component
import Grid from '@components/grid/grid';
import ReloadListActionExtension from '@components/grid/extension/reload-list-extension';
import FiltersResetExtension from '@components/grid/extension/filters-reset-extension';
import FormSubmitButton from '@components/form-submit-button';
import SortingExtension from '@components/grid/extension/sorting-extension';
import BulkActionCheckboxExtension from '@components/grid/extension/bulk-action-checkbox-extension';
import SubmitBulkExtension from '@components/grid/extension/submit-bulk-action-extension';
import SubmitGridExtension from '@components/grid/extension/submit-grid-action-extension';
import SubmitRowActionExtension from '@components/grid/extension/action/row/submit-row-action-extension';
import LinkRowActionExtension from '@components/grid/extension/link-row-action-extension';
import FiltersSubmitButtonEnablerExtension
  from '@components/grid/extension/filters-submit-button-enabler-extension';

import initPrestashopComponents from "@app/utils/init-components";
import {forEach} from "lodash";
import exports from "@node_modules/webpack";
import forEachRuntime = exports.util.runtime.forEachRuntime;
const {$} = window;
require('select2/dist/js/select2.full')($)
$(() => {
// 2. initialize the grid component by providing grid id
  const offerIntegrationGrid = new Grid('oi_offer');

  offerIntegrationGrid.addExtension(new ReloadListActionExtension());
  offerIntegrationGrid.addExtension(new SortingExtension());
  offerIntegrationGrid.addExtension(new FiltersResetExtension());
  // offerIntegrationGrid.addExtension(new ColumnTogglingExtension());
  offerIntegrationGrid.addExtension(new SubmitRowActionExtension());
  offerIntegrationGrid.addExtension(new SubmitBulkExtension());
  offerIntegrationGrid.addExtension(new SubmitGridExtension());
  offerIntegrationGrid.addExtension(new BulkActionCheckboxExtension());
  offerIntegrationGrid.addExtension(new FiltersSubmitButtonEnablerExtension());
  offerIntegrationGrid.addExtension(new LinkRowActionExtension());

  // new TranslatableInput();
  new window.prestashop.component.TinyMCEEditor();
  initPrestashopComponents();

  const renderMoneyString = function(price: string | number) {
    const formatter = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    });
    return formatter.format(Number(price));
  }

  const packedItemTemplate = function(item: any, rowId: string | number){
    let name;
    let idProduct;
    let price;
    let native_price = 0.00;
    let quantity;
    let customCount;
    let customCountSelected = '';
    let display = 'display:none;'
    let idProductAttribute = 0;
    if(item.data === undefined){
      name = item.name;
      idProduct = item.id;
      quantity = item.pack_quantity;
      native_price = item.price*quantity;
      price  = renderMoneyString(item.price*quantity);
      let testArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      customCount = 0;
      if(item.attributes.length > 0){
        idProductAttribute = item.id_pack_product_attribute;
        customCount = testArr.indexOf(item.attributes[0].name)+1;
        customCountSelected = 'checked';
        display = 'display:table-row;'
      }
    } else {
      name  = item.data.text;
      idProduct  = item.data.id;
      quantity  = 1;
      if(item.data.price !== undefined){
        native_price = item.data.price*quantity;
        price = renderMoneyString(item.data.price*quantity);
      } else {
        price = renderMoneyString('0.00');
      }
      customCount = 1;
    }

    let block = '<li class="list-group-item added"><table class="w-100"><tr><td style="width:5%;padding:4px;"><input type="checkbox" class="form-control customization_check" data-row-id="'+rowId+'" '+customCountSelected+'></td>' +
      '<td style="width:45%;padding:4px;" class="pack_product_name" data-row-id="'+rowId+'">'+name+'</td>' +
      '<td  style="width:30%;padding:4px;">' +
      '<input class="form-control form-control-sm" type="number" name="stock_selected_product_qty[]" data-row-id="'+rowId+'" step="1" min="1" value="'+quantity+'"/>' +
      '<input type="hidden" name="stock_selected_product_id[]" data-row-id="'+rowId+'" value="'+idProduct+'"/>' +
      '<input type="hidden" name="stock_selected_product_attribute_id[]" data-row-id="'+rowId+'" value="'+idProductAttribute+'"/>' +
      '</td>' +
      '<td  style="width:10%;padding:4px;"><span class="price_span" data-row-id="'+rowId+'" data-price="'+native_price+'">'+price+'</span></td>' +
      '<td  style="width:10%;padding:4px;"><button type="button" data-row-id="'+rowId+'" class="btn delete_selected_stock_product btn-danger w-100">X</button></td>' +
      '</tr>' +
      '<tr class="customization_row_'+rowId+'" style="'+display+'">' +
      '<td colspan="2">Aantal knippen of zaagsnedes:</td>' +
      '<td colspan="3">' +
      '<input type="number" step="1" min="1" max="10" name="stock_selected_product_customization[]" data-pack-id="'+idProduct+'" data-row-id="'+rowId+'" value="'+customCount+'" class="form-control"/>' +
      '</td></tr></table></li>';

    return block;
  }

  const updatePackPrice = function(idPack: number, idPackAttribute: number, customizationTotal: number, productCustomization: number, rowId:number){
    let getPriceLink  = $('#price-url').val();

    let price = 0.00;
    let data = {
      'idPack': idPack,
      'idPackAttribute': idPackAttribute,
      'customizationTotal': customizationTotal,
      'productCustomization': productCustomization,
  };

    if(getPriceLink !== undefined){
    $.ajax({
      method: "POST",
      url: getPriceLink.toString(),
      data: data
    }).done(function (e) {
      let data = JSON.parse(e);
      $('.pack_product_name[data-row-id="'+rowId+'"]').text(data.product_name);
      $('.price_span[data-row-id="'+rowId+'"]').text(renderMoneyString(data.price));
      $('.price_span[data-row-id="'+rowId+'"]').attr('data-price', data.price);
      $('[name="stock_selected_product_attribute_id[]"][data-row-id="'+rowId+'"]').val(data.id_product_attribute);
      updateTotalPrice();
    });
    }
  }

  function initChangePacks() {
    $(document).on('change','[name="stock_selected_product_qty[]"],  [name="stock_selected_product_customization[]"]',  function (e) {
      let elem = e.currentTarget;
      let rowId = elem.dataset.rowId;

      let productQty = $('[name="stock_selected_product_qty[]"][data-row-id="'+rowId+'"]').val();
      let productId = $('[name="stock_selected_product_id[]"][data-row-id="'+rowId+'"]').val();
      let productAttributeId = $('[name="stock_selected_product_attribute_id[]"][data-row-id="'+rowId+'"]').val();
      let productCustomization = $('[name="stock_selected_product_customization[]"][data-row-id="'+rowId+'"]').val();
     updatePackPrice(Number(productId), Number(productAttributeId), Number(productQty), Number(productCustomization), Number(rowId));
    })
  }

  const offerFormTemplate = function (data: {
    packedProducts: any;
    oi_offer_extra_shipping: string;
    id_product: number | undefined;
    id: number;
    link: any;
    formTitle: any;
    id_oi_offer: any;
    new: any;
    name: any;
    price: any;
    quantity: any;
    weight: any;
    description_short: any;
  } | undefined) {
    let extraShippingSelectNo = 'checked="true"';
    let extraShippingSelectYes = '';
    if(data === undefined){
      return false;
    }
    // @ts-ignore
    if (parseInt(data.oi_offer_extra_shipping) === 1) {
      extraShippingSelectNo = '';
      extraShippingSelectYes = 'checked="true';
    }

    let idProduct = 0;
    // @ts-ignore
    if(data.id_product !== undefined){
      // @ts-ignore
      idProduct = data.id_product;
    } else {
      // @ts-ignore
      idProduct = data.id;
    }

    let packBlock = '';
    if(data.packedProducts !== undefined && data.packedProducts.length > 0){
      let pack = data.packedProducts;
      for(let i = 0; i < pack.length; i++){
        packBlock += packedItemTemplate(pack[i], i);
      }
    } else {
      packBlock += '<li class="list-group-item empty-text">Selecteer producten voor voorraad beheer</li>';
    }

    return `<div class="card" id="offer-row-card" data-link="${data.link}">
    <div class="card-header">
      Offer row
    </div>
    <div class="card-body">
      <h5 class="card-title"><span>${data.formTitle}</span></h5>
      <p class="card-text">
      <form method="POST" id="offer-row-form">
      <input type="hidden" name="offer-id" value="${data.id_oi_offer}"/>
      <input type="hidden" name="offer-row-id" value="${idProduct}"/>
      <input type="hidden" name="offer-new" value="${data.new}"/>
        <div class="form-group">
          <label for="store-products">Product(en)</label>
            <select id="store-products" class="form-control" name="offer-row-product" data-toggle="select2"  aria-hidden="true" readonly="false">
              <<option value="${data.id}" selected>${data.name}</option>
            </select>
        </div>

        <ul class="list-group mb-4" id="stock_selected_products">
        ${packBlock}
        </ul>
        <div class="form-group">
          <strong id="total_price_pack_products" class="w-100 h3 text-dark">Totaal:<span class="float-right">0.00</span> </strong>

        </div>
        <div class="form-group">
          <label for="offer-row-title">Naam</label>
          <input type="text" class="form-control" name="offer-row-title"  id="offer-row-title" placeholder="Product Naam" value="${data.name}">
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="offer-price">Prijs</label>
            <input type="text" class="form-control" name="offer-price" id="offer-price" placeholder="0.00" value="${data.price}">
          </div>

          <div class="form-group col-md-3">
            <label for="offer-qty">Aantal</label>
            <input type="number" step="1" min="1" class="form-control" name="offer-qty" id="offert-qty" placeholder="1" value="${data.quantity}">
          </div>

          <div class="form-group col-md-3">
            <label for="offer-weight">Gewicht</label>
            <div class="input-group">
              <input type="text" class="form-control" name="offer-weight" id="offer-weight" placeholder="35" value="${data.weight}">
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Kg</span>
              </div>
            </div>

          </div>
          </div>
           <div class="form-row row mb-2">
            <div class="form-check form-check-inline w-50 m-0 p-2">
              <input class="form-check-input" type="radio" name="offer-extra-shipping" id="radio_shipping_1" value="0" ${extraShippingSelectNo}>
              <label class="form-check-label" for="radio_shipping_1">Geen extra verzending</label>
            </div>
            <div class="form-check form-check-inline w-50 m-0 p-2">
              <input class="form-check-input" type="radio" name="offer-extra-shipping" id="radio_shipping_2" value="1" ${extraShippingSelectYes}>
              <label class="form-check-label" for="radio_shipping_2">Extra Verzending</label>
            </div>
           </div>
        <div class="form-group">
          <label for="offer-message">Omschrijving</label>
          <textarea class="autoload_rte form-control" id="offer-message" name="offer-message">
            ${data.description_short}
          </textarea>
        </div>
      <a id="offer-row-submit" class="btn btn-primary">Save</a>
      </form>
      </p>
    </div>
  </div>`;
  };

  let initSelect2 = function (url: string | number | string[] | undefined, readonly = false) {
    $('#store-products').select2({
      dropdownParent: $('#offer-row-form .form-group:first-child'),
      theme: 'default form-control',
      disabled: readonly,
      width: '100%',
      ajax: {
        dataType: 'json',
        type: "GET",
        url: url, processResults: function (data: { items: any; }) {
          // Transforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data.items
          };
        }
      }
    }).on('select2:select', function (e: any) {
      let stockLength = $('#stock_selected_products li.added').length;
      let block = packedItemTemplate(e.params, stockLength);

      if($('#stock_selected_products li.added').length === 0){
        $('#stock_selected_products').html(block);
      } else {
        $('#stock_selected_products').append(block);
      }
      updateTotalPrice();
    });
  };

  $(document).on('click', '.customization_check', function(e){
    $('tr.customization_row_'+$(this).attr('data-row-id')).toggle();
  });
  $(document).on('click', '.delete_selected_stock_product', function(e){
    $(this).parentsUntil('li').parent('li').remove();
    updateTotalPrice();
  });

  $(document).on('click', '.update-offer-row', function (e) {
    let id = $(this).attr('data-row-id');
    let putLink = $('#offer-put-url').val();
    // @ts-ignore
    let offer = JSON.parse($(this).attr('data-offer'));
    offer.formTitle = 'Update offer';
    offer.link = putLink;
    offer.new = false;

    $.fancybox.open(offerFormTemplate(offer), {
      dropdownParent: $('#offer-row-form'),
      minWidth: '90%',
      maxHeight: '90%',
      maxWidth: '1200px',
      top: '5%',
      autoDimensions: false,
      closeClick  : false,
      openEffect  : 'none',
      closeEffect : 'none',
      hideOnOverlayClick: false,
      helpers : {
        overlay : {
          closeClick: false
        }
      },
      afterShow: function () {
        let url = $('#select2-url').val();
        initSelect2(url, false);
        initChangePacks();

        // @ts-ignore
        if (typeof window.tinyMCE != 'undefined' && $(window.tinyMCE.editors).length > 0) {
          // @ts-ignore
          $(window.tinyMCE.editors).each(function (idx) {
            try {
              // @ts-ignore
              window.tinyMCE.remove(idx);
            } catch (e) {
            }
          });
        }
        new window.prestashop.component.TinyMCEEditor();
        updateTotalPrice();
      }
    });
  });

  $(document).on('click',
    '#add-new-product',
    function (e) {
      if (checkIfRequiredFieldsFilled()) {


        let id = $(this).attr('data-offer-id');
        let putLink = $('#offer-put-url').val();

        let offer =  {
          oi_offer_extra_shipping: '',
          id_product: '',
          link: putLink,
          formTitle: 'Create Offer',
          id_oi_offer: id,
          new: true,
          name: '',
          price: '',
          quantity: '',
          weight: '',
          description_short: '',
        }

        // @ts-ignore
        $.fancybox.open(offerFormTemplate(offer), {
          dropdownParent: $('#offer-row-form'),
          width: '800',
          height: '800',
          modal: true,
          autoDimensions: false,
          closeClick  : false,
          openEffect  : 'none',
          closeEffect : 'none',
          hideOnOverlayClick: false,
          helpers : {
            overlay : {
              closeClick: false
            }
          },
          afterShow: function () {
            let url = $('#select2-url').val();
            initSelect2(url, false);
            initChangePacks();

            // @ts-ignore
            if (typeof window.tinyMCE != 'undefined' && $(window.tinyMCE.editors).length > 0) {
              // @ts-ignore
              $(window.tinyMCE.editors).each(function (idx) {
                try {
                  // @ts-ignore
                  window.tinyMCE.remove(idx);
                } catch (e) {
                }
              });
            }
            new window.prestashop.component.TinyMCEEditor();
            updateTotalPrice();
          }
        });

      }
    });

  function checkIfRequiredFieldsFilled(){
    let name = $('#offer_integration_name');
    let email = $('#offer_integration_email');

    if(name.val() === ""){
      name.trigger('focus');
      $('#ajax_confirmation').html('Vul a.u.b. eerst een offerte naam in!').show();
      return false;
    }

    if(email.val() === ""){
      email.trigger('focus');
      $('#ajax_confirmation').html('Vul a.u.b. eerst een email adres in!').show();
      return false;
    }
    return true;
  }

  $(document).on('click', '#offer-row-submit', function (e) {
    let formData = $('#offer-row-form').serializeJSON();
    let putLink = $('#offer-row-card').attr('data-link');

    if(formData['offer-id'] === ""){
      formData['offer-code'] = $('#offer_integration_code').val();
      formData['offer-name'] = $('#offer_integration_name').val();
      formData['offer-email'] = $('#offer_integration_email').val();
      formData['offer-message'] = $('#offer-message').val();
      formData['offer-phone'] = $('#offer_integration_phone').val();
      formData['offer-date-exp'] = $('#offer_integration_date_exp_date').val();
    }

    $.ajax({
      method: "POST",
      url: putLink,
      data: formData
    })
      .done(function (e) {
        let data = JSON.parse(e);
        let offer = data.offer;
        offer.name = offer.name[1];
        offer.description_short = offer.description_short[1];

        let idProduct = offer.id;
        let xShipping = 'Nee';
        if (parseInt(offer.oi_offer_extra_shipping) > 0) {
          xShipping = 'Ja';
        }
        $.fancybox.close();
        $('#ajax_confirmation').html(data.msg).show();


        $('#add-new-product').attr('data-offer-id', offer.id_oi_offer);
        $('#new-offer-id').val( offer.id_oi_offer);

        if (offer.new === true) {
          let newRowHtml = `
          <tr data-row-id="${idProduct}">
              <td>${offer.name}</td>
              <td>
                <div style="max-height: 150px;overflow: scroll">
                  ${offer.description_short}
                </div>
              </td>
              <td>${offer.price}</td>
              <td>${offer.quantity}</td>
              <td>${offer.weight}</td>
              <td>${xShipping}</td>
              <td>
                <button data-offer='${JSON.stringify(offer).toString()}' type="button"
                          class="btn btn-sm btn-warning update-offer-row w-100"
                          data-row-id="${idProduct}"
                          id="button_${idProduct}">Wijzig</button>
                <button type="button"
                        class="btn btn-sm btn-danger delete-offer-row w-100"
                        data-link="/admin-dev/index.php/modules/modernesmid/offerintegration/admin-offer/row/${idProduct}/delete"
                        data-row-id="${idProduct}"
                        id="delete_button_${idProduct}">Delete</button>
              </td>
            </tr>
          `;

          $('#offer-row-table').append(newRowHtml);

        } else {
          //naam
          $('#offer-row-table tr[data-row-id="' + idProduct + '"] td:eq(0)').html(offer.name);
          //descr
          $('#offer-row-table tr[data-row-id="' + idProduct + '"] td:eq(1)').html(`<div style="max-height: 150px;overflow: scroll">${offer.description_short}</div>`);
          //price
          $('#offer-row-table tr[data-row-id="' + idProduct + '"] td:eq(2)').html(offer.price);
          //qty
          $('#offer-row-table tr[data-row-id="' + idProduct + '"] td:eq(3)').html(offer.quantity);
          //weight
          $('#offer-row-table tr[data-row-id="' + idProduct + '"] td:eq(4)').html(offer.weight);
          //extra verzending kosten
          $('#offer-row-table tr[data-row-id="' + idProduct + '"] td:eq(5)').html(xShipping);
        }

        $('button#button_' + idProduct).attr('data-offer', JSON.stringify(offer));
      });
  });

  let updateTotalPrice = function() {
    let totalPackPrice = 0;
    let priceElems = $('.price_span');

    for (let i = 0; i < priceElems.length; i++){
      totalPackPrice = Number(totalPackPrice) + Number($(priceElems[i]).attr('data-price'));
    }

    $('#total_price_pack_products span').text(renderMoneyString(totalPackPrice));
  }

  $(document).on('click', '.delete-offer-row', function (e) {
    let deleteLink = $(this).attr('data-link');

    $.ajax({
      method: "GET",
      url: deleteLink,
    }).done(function (e) {
      let data = JSON.parse(e);
      if(data.error === true){
        $('#ajax_confirmation').html(data.msg).show();
      } else {
        $('#offer-row-table tr[data-row-id="' + data.offer.id + '"]').remove();
      }
      });

  });

  new FormSubmitButton();
});



