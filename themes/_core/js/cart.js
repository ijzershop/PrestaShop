/**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
import $ from 'jquery';
import prestashop from 'prestashop';

$(document).ready(() => {
  prestashop.on('updateCart', (event) => {
    var getCartViewUrl = $('.js-cart').data('refresh-url');
    var requestData = {};

    if (event && event.reason) {
      requestData = {
        id_product_attribute: event.reason.idProductAttribute,
        id_product: event.reason.idProduct
      };
    }

    $.post(getCartViewUrl, requestData).then((resp) => {
      $('.cart-detailed-totals').replaceWith(resp.cart_detailed_totals);
      $('.cart-summary-items-subtotal').replaceWith(resp.cart_summary_items_subtotal);
      $('.cart-summary-totals').replaceWith(resp.cart_summary_totals);
      $('.cart-detailed-actions').replaceWith(resp.cart_detailed_actions);
      $('.cart-voucher').replaceWith(resp.cart_voucher);
      $('.cart-overview').replaceWith(resp.cart_detailed);

      $('.js-cart-line-product-quantity').each((index, input) => {
        var $input = $(input);
        $input.attr('value', $input.val());
      });

      prestashop.emit('updatedCart');
    }).fail((resp) => {
      prestashop.emit('handleError', {eventType: 'updateCart', resp: resp})
    });
  });

  var $body = $('body');

  $body.on(
    'click',
    '[data-button-action="add-to-cart"]',
    (event) => {
      event.preventDefault();

      var $form = $($(event.target).closest('form'));
      var query = $form.serialize() + '&add=1&action=update';
      var actionURL = $form.attr('action');

      let isQuantityInputValid = ($input) => {
        var validInput = true;

        $input.each((index, input) => {
          let $input = $(input);
          let minimalValue = parseInt($input.attr('min'), 10);
          if (minimalValue && $input.val() < minimalValue) {
              onInvalidQuantity($input);
              validInput = false;
          }
        });

        return validInput;
      };

      let onInvalidQuantity = ($input) => {
        $($input.parents('.product-add-to-cart')[0]).find('.product-minimal-quantity')
            .addClass('error');
        $input.parent().find('label').addClass('error');
      };

      let $quantityInput = $form.find('input[min]' );
      if (!isQuantityInputValid($quantityInput)) {
        onInvalidQuantity($quantityInput);

        return;
      }

      $.post(actionURL, query, null, 'json').then((resp) => {
        prestashop.emit('updateCart', {
          reason: {
            idProduct: resp.id_product,
            idProductAttribute: resp.id_product_attribute,
            linkAction: 'add-to-cart'
          }
        });
      }).fail((resp) => {
        prestashop.emit('handleError', {eventType: 'addProductToCart', resp: resp});
      });
    }
  );

  $body.on(
    'submit',
    '[data-link-action="add-voucher"]',
    (event) => {
      event.preventDefault();

      let $addVoucherForm = $(event.currentTarget);
      let getCartViewUrl = $addVoucherForm.attr('action');

      if (0 === $addVoucherForm.find('[name=action]').length) {
        $addVoucherForm.append($('<input>', {'type': 'hidden', 'name': 'ajax', "value": 1}));
      }
      if (0 === $addVoucherForm.find('[name=action]').length) {
        $addVoucherForm.append($('<input>', {'type': 'hidden', 'name': 'action', "value": "update"}));
      }

      $.post(getCartViewUrl, $addVoucherForm.serialize(), null, 'json').then((resp) => {
        if (resp.hasError) {
          $('.js-error').show().find('.js-error-text').text(resp.errors[0]);

          return;
        }

        // Refresh cart preview
        prestashop.emit('updateCart', {reason: event.target.dataset});
      }).fail((resp) => {
        prestashop.emit('handleError', {eventType: 'addVoucher', resp: resp});
      })
    }
  );
});
