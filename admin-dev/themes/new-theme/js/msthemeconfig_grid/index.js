// admin-dev/themes/new-theme/js/pages/tax/index.js

// 1. import the grid component
import Grid from '@components/grid/grid';
import SortingExtension from '@components/grid/extension/sorting-extension';
import FiltersResetExtension from '@components/grid/extension/filters-reset-extension';
import ReloadListActionExtension from '@components/grid/extension/reload-list-extension';
import ColumnTogglingExtension from '@components/grid/extension/column-toggling-extension';
import SubmitRowActionExtension
  from '@components/grid/extension/action/row/product-price-modifier-submit-row-action-extension';
import SubmitBulkExtension from '@components/grid/extension/product-price-modifier-submit-bulk-action-extension';
import FiltersSubmitButtonEnablerExtension from '@components/grid/extension/filters-submit-button-enabler-extension';
import LinkRowActionExtension from '@components/grid/extension/link-row-action-extension';
import TranslatableInput from "@components/translatable-input";
import BulkActionCheckboxExtension from "@components/grid/extension/bulk-action-checkbox-extension";

import "select2";


const $ = window.$;

$(() => {
// 2. initialize the grid component by providing grid id
  const offerIntegrationGrid = new Grid('oi_offer');

  offerIntegrationGrid.addExtension(new ReloadListActionExtension());
  offerIntegrationGrid.addExtension(new SortingExtension());
  offerIntegrationGrid.addExtension(new FiltersResetExtension());
  offerIntegrationGrid.addExtension(new ColumnTogglingExtension());
  offerIntegrationGrid.addExtension(new SubmitRowActionExtension());
  offerIntegrationGrid.addExtension(new SubmitBulkExtension());
  offerIntegrationGrid.addExtension(new BulkActionCheckboxExtension());
  offerIntegrationGrid.addExtension(new FiltersSubmitButtonEnablerExtension());
  offerIntegrationGrid.addExtension(new LinkRowActionExtension());

  new TranslatableInput();
  new window.prestashop.component.TinyMCEEditor();

  const offerFormTemplate = function (data) {
    let extraShippingSelectNo = 'checked="true"';
    let extraShippingSelectYes = '';
    if (parseInt(data.oi_offer_extra_shipping) === 1) {
      extraShippingSelectNo = '';
      extraShippingSelectYes = 'checked="true';
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
      <input type="hidden" name="offer-row-id" value="${data.id_product}"/>
      <input type="hidden" name="offer-new" value="${data.new}"/>
        <div class="form-group">
          <label for="store-products">Product</label>
          <select id="store-products" class="form-control" name="offer-row-product" data-toggle="select2" data-minimumresultsforsearch="0" aria-hidden="true" readonly="true">
            <<option value="${data.id}" selected>${data.name}</option>
          </select>
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

  let initSelect2 = function (url, readonly = false) {
    jQuery('#store-products').select2({
      dropdownParent: $('#offer-row-form'),
      disabled: readonly,
      width: '100%',
      ajax: {
        dataType: 'json',
        type: "GET",
        url: url, processResults: function (data) {
          // Transforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data.items
          };
        }
      }
    });
  };

  $(document).on('click', '.update-offer-row', function (e) {
    let id = $(this).attr('data-row-id');
    let putLink = $('#offer-put-url').val();
    let offer = JSON.parse($(this).attr('data-offer'));
    offer.formTitle = 'Update offer';
    offer.link = putLink;
    offer.new = false;

    $.fancybox.open(offerFormTemplate(offer), {
      dropdownParent: $('#offer-row-form'),
      width: '800',
      height: '800',
      autoDimensions: false,
      afterShow: function (e) {
        let url = $('#select2-url').val();
        initSelect2(url, true);

        if (typeof window.tinyMCE != 'undefined' && $(window.tinyMCE.editors).length > 0) {
          $(window.tinyMCE.editors).each(function (idx) {
            try {
              tinyMCE.remove(idx);
            } catch (e) {
            }
          });
        }
        new window.prestashop.component.TinyMCEEditor();
      }
    });
  });

  $(document).on('click', '#add-new-product', function (e) {
    if(checkIfRequiredFieldsFilled()){


    let id = $(this).attr('data-offer-id');
    let putLink = $('#offer-put-url').val();

    let offer = [];
    offer.formTitle = 'Create offer';
    offer.id_product = '';
    offer.id_oi_offer = id;
    offer.name = '';
    offer.price = '';
    offer.quantity = '';
    offer.extra_shipping = '';
    offer.weight = '';
    offer.description_short = '';
    offer.link = putLink;
    offer.new = true;

    $.fancybox.open(offerFormTemplate(offer), {
      dropdownParent: $('#offer-row-form'),
      width: '800',
      height: '800',
      autoDimensions: false,
      afterShow: function (e) {
        let url = $('#select2-url').val();
        initSelect2(url, false);

        if (typeof window.tinyMCE != 'undefined' && $(window.tinyMCE.editors).length > 0) {
          $(window.tinyMCE.editors).each(function (idx) {
            try {
              tinyMCE.remove(idx);
            } catch (e) {
            }
          });
        }
        new window.prestashop.component.TinyMCEEditor();
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
      formData['offer-message'] = $('#offer_integration_message').val();
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
          <tr data-row-id="${offer.id_product}">
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
                          data-row-id="${offer.id_product}"
                          id="button_${offer.id_product}">Wijzig</button>
                <button type="button"
                        class="btn btn-sm btn-danger delete-offer-row w-100"
                        data-link="/admin-dev/index.php/modules/modernesmid/offerintegration/admin-offer/row/${offer.id_product}/delete"
                        data-row-id="${offer.id_product}"
                        id="delete_button_${offer.id_product}">Delete</button>
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
});
