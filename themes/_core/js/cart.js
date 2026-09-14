/**
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 */
import $ from 'jquery';
import prestashop from 'prestashop';
import {refreshCheckoutPage} from './common';

$(() => {
  prestashop.on('updateCart', (event) => {
    prestashop.cart = event.resp.cart;
    const getCartViewUrl = $('.js-cart').data('refresh-url');

    if (!getCartViewUrl) {
      return;
    }

    let requestData = {};

    if (event && event.reason) {
      requestData = {
        id_product_attribute: event.reason.idProductAttribute,
        id_product: event.reason.idProduct,
      };
    }

    $.post(getCartViewUrl, requestData)
      .then((resp) => {
        $(prestashop.selectors.cart.detailedTotals).replaceWith(
          resp.cart_detailed_totals,
        );
        $(prestashop.selectors.cart.summaryItemsSubtotal).replaceWith(
          resp.cart_summary_items_subtotal,
        );
        $(prestashop.selectors.cart.summarySubTotalsContainer).replaceWith(
          resp.cart_summary_subtotals_container,
        );
        $(prestashop.selectors.cart.summaryProducts).replaceWith(
          resp.cart_summary_products,
        );
        $(prestashop.selectors.cart.summaryTotals).replaceWith(
          resp.cart_summary_totals,
        );
        $(prestashop.selectors.cart.detailedActions).replaceWith(
          resp.cart_detailed_actions,
        );
        $(prestashop.selectors.cart.voucher).replaceWith(resp.cart_voucher);
        $(prestashop.selectors.cart.overview).replaceWith(resp.cart_detailed);
        $(prestashop.selectors.cart.summaryTop).replaceWith(
          resp.cart_summary_top,
        );

        $(prestashop.selectors.cart.productCustomizationId).val(0);

        $(prestashop.selectors.cart.lineProductQuantity).each(
          (index, input) => {
            const $input = $(input);
            $input.attr('value', $input.val());
          },
        );

        if ($(prestashop.selectors.checkout.cartPaymentStepRefresh).length) {
          // we get the refresh flag : on payment step we need to refresh page to be sure
          // amount is correctly updated on payment modules
          refreshCheckoutPage();
        }

        prestashop.emit('updatedCart', {eventType: 'updateCart', resp});
      })
      .fail((resp) => {
        prestashop.emit('handleError', {eventType: 'updateCart', resp});
      });
  });

  const $body = $('body');

  // Moderne Smid registers its cart handler in theme/modernesmid/_dev/js/theme-core.js.
  // Registering the core handler as well sends two requests for one click.

  $body.on('submit', '[data-link-action="add-voucher"]', (event) => {
    event.preventDefault();

    const $addVoucherForm = $(event.currentTarget);
    const getCartViewUrl = $addVoucherForm.attr('action');

    if ($addVoucherForm.find('[name=action]').length === 0) {
      $addVoucherForm.append(
        $('<input>', {type: 'hidden', name: 'ajax', value: 1}),
      );
    }
    if ($addVoucherForm.find('[name=action]').length === 0) {
      $addVoucherForm.append(
        $('<input>', {type: 'hidden', name: 'action', value: 'update'}),
      );
    }

    $.post(getCartViewUrl, $addVoucherForm.serialize(), null, 'json')
      .then((resp) => {
        if (resp.hasError) {
          $('.js-error')
            .show()
            .find('.js-error-text')
            .text(resp.errors[0]);

          return;
        }

        // Refresh cart preview
        prestashop.emit('updateCart', {
          reason: event.target.dataset,
          resp,
        });
      })
      .fail((resp) => {
        prestashop.emit('handleError', {eventType: 'updateCart', resp});
      });
  });
});
