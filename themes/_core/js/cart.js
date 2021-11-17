/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
// import $ from 'jquery';
// import prestashop from 'prestashop';
// import {refreshCheckoutPage} from './common';

// $(document).ready(() => {
//
//   var $body = $('body');
//
//     $.post(actionURL, query, null, 'json')
//       .then((resp) => {
//         prestashop.emit('updateCart', {
//           reason: {
//             idProduct: resp.id_product,
//             idProductAttribute: resp.id_product_attribute,
//             idCustomization: resp.id_customization,
//             linkAction: 'add-to-cart',
//             cart: resp.cart,
//           },
//           resp,
//         });
//       })
//       .fail((resp) => {
//         prestashop.emit('handleError', {
//           eventType: 'addProductToCart',
//           resp,
//         });
//       })
//       .always(() => {
//         setTimeout(() => {
//           addToCartButton.prop('disabled', false);
//         }, 1000);
//       });
//
//
//   $body.on('submit', '[data-link-action="add-voucher"]', (event) => {
//     event.preventDefault();
//
//     const $addVoucherForm = $(event.currentTarget);
//     const getCartViewUrl = $addVoucherForm.attr('action');
//
//     if ($addVoucherForm.find('[name=action]').length === 0) {
//       $addVoucherForm.append(
//         $('<input>', {type: 'hidden', name: 'ajax', value: 1}),
//       );
//     }
//     if ($addVoucherForm.find('[name=action]').length === 0) {
//       $addVoucherForm.append(
//         $('<input>', {type: 'hidden', name: 'action', value: 'update'}),
//       );
//     }
//
//     $.post(getCartViewUrl, $addVoucherForm.serialize(), null, 'json')
//       .then((resp) => {
//         if (resp.hasError) {
//           $('.js-error')
//             .show()
//             .find('.js-error-text')
//             .text(resp.errors[0]);
//
//           return;
//         }
//
//         // Refresh cart preview
//         prestashop.emit('updateCart', {
//           reason: event.target.dataset,
//           resp,
//         });
//       })
//       .fail((resp) => {
//         prestashop.emit('handleError', {eventType: 'updateCart', resp});
//       });
//   });
// });
