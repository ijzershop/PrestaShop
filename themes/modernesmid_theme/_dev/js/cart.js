// import $ from 'jquery';
// import prestashop from 'prestashop';
// import debounce from './components/debounce';
//
// prestashop.cart = prestashop.cart || {};
//
// prestashop.cart.active_inputs = null;
//
// const spinnerSelector = 'input[name="product-quantity-spin"]';
// let hasError = false;
// let isUpdateOperation = false;
// let errorMsg = '';
//
// const CheckUpdateQuantityOperations = {
//   switchErrorStat: () => {
//     /**
//      * if errorMsg is not empty or if notifications are shown, we have error to display
//      * if hasError is true, quantity was not updated : we don't disable checkout button
//      */
//     const $checkoutBtn = $(prestashop.themeSelectors.checkout.btn);
//
//     if ($(prestashop.themeSelectors.notifications.dangerAlert).length || (errorMsg !== '' && !hasError)) {
//       $checkoutBtn.addClass('disabled');
//     }
//
//     if (errorMsg !== '') {
//       const strError = `
//         <article class="alert alert-danger" role="alert" data-alert="danger">
//           <ul>
//             <li>${errorMsg}</li>
//           </ul>
//         </article>
//       `;
//       $(prestashop.themeSelectors.notifications.container).html(strError);
//       errorMsg = '';
//       isUpdateOperation = false;
//       if (hasError) {
//         // if hasError is true, quantity was not updated : allow checkout
//         $checkoutBtn.removeClass('disabled');
//       }
//     } else if (!hasError && isUpdateOperation) {
//       hasError = false;
//       isUpdateOperation = false;
//       $(prestashop.themeSelectors.notifications.container).html('');
//       $checkoutBtn.removeClass('disabled');
//     }
//   },
//   checkUpdateOperation: (resp) => {
//     /**
//      * resp.hasError can be not defined but resp.errors not empty: quantity is updated but order cannot be placed
//      * when resp.hasError=true, quantity is not updated
//      */
//     const {hasError: hasErrorOccurred, errors: errorData} = resp;
//     hasError = hasErrorOccurred ?? false;
//     const errors = errorData ?? '';
//
//     // 1.7.2.x returns errors as string, 1.7.3.x returns array
//     if (errors instanceof Array) {
//       errorMsg = errors.join(' ');
//     } else {
//       errorMsg = errors;
//     }
//
//     isUpdateOperation = true;
//   },
// };
//
//
// const preventCustomModalOpen = (event) => {
//   if (window.shouldPreventModal) {
//     event.preventDefault();
//
//     return false;
//   }
//
//   return true;
// };
//
// $(document).ready(() => {
//   const productLineInCartSelector = prestashop.themeSelectors.cart.productLineQty;
//   const promises = [];
//
//   prestashop.on('updateCart', () => {
//     $(prestashop.themeSelectors.cart.quickview).modal('hide');
//   });
//
//   prestashop.on('updatedCart', () => {
//     window.shouldPreventModal = false;
//
//     $(prestashop.themeSelectors.product.customizationModal).on('show.bs.modal', (modalEvent) => {
//       preventCustomModalOpen(modalEvent);
//     });
//   });
//
//   const $body = $('body');
//
//   function shouldIncreaseProductQuantity(namespace) {
//     return namespace === 'on.startupspin';
//   }
//
//
//   function camelize(subject) {
//     const actionTypeParts = subject.split('-');
//     let i;
//     let part;
//     let camelizedSubject = '';
//
//     for (i = 0; i < actionTypeParts.length; i += 1) {
//       part = actionTypeParts[i];
//
//       if (i !== 0) {
//         part = part.substring(0, 1).toUpperCase() + part.substring(1);
//       }
//
//       camelizedSubject += part;
//     }
//
//     return camelizedSubject;
//   }
//
//   function parseCartAction($target, namespace) {
//
//     const $input = findCartLineProductQuantityInput($target);
//
//     if (!$input) {
//       return false;
//     }
//
//     let cartAction = {};
//
//     if (shouldIncreaseProductQuantity(namespace)) {
//       cartAction = {
//         url: $input.data('up-url'),
//         type: 'increaseProductQuantity',
//       };
//     } else {
//       cartAction = {
//         url: $input.data('down-url'),
//         type: 'decreaseProductQuantity',
//       };
//     }
//
//     return cartAction;
//   }
//
//   const abortPreviousRequests = () => {
//     let promise;
//     while (promises.length > 0) {
//       promise = promises.pop();
//       promise.abort();
//     }
//   };
//
//
//   $(prestashop.themeSelectors.product.customizationModal).on('show.bs.modal', (modalEvent) => {
//     preventCustomModalOpen(modalEvent);
//   });
//
//   const handleCartAction = (event) => {
//     abortPreviousRequests();
//     window.shouldPreventModal = true;
//     event.preventDefault();
//
//     const $target = $(event.currentTarget);
//     const {dataset} = event.currentTarget;
//     const cartAction = parseCartAction($target, event.namespace);
//     const requestData = {
//       ajax: '1',
//       action: 'update',
//     };
//
//     if (!cartAction) {
//       return;
//     }
//
//     $.ajax({
//       url: cartAction.url,
//       method: 'POST',
//       data: requestData,
//       dataType: 'json',
//       beforeSend(jqXHR) {
//         promises.push(jqXHR);
//       },
//     })
//       .then((resp) => {
//
//         CheckUpdateQuantityOperations.checkUpdateOperation(resp);
//
//
//         // Refresh cart preview
//         prestashop.emit('updateCart', {
//           reason: dataset,
//           resp,
//         });
//       })
//       .fail((resp) => {
//         prestashop.emit('handleError', {
//           eventType: 'updateProductInCart',
//           resp,
//           cartAction: cartAction.type,
//         });
//       });
//   };
//
//   $body.on('click', prestashop.themeSelectors.cart.actions, handleCartAction);
//
//   function sendUpdateQuantityInCartRequest(updateQuantityInCartUrl, requestData, $target) {
//     abortPreviousRequests();
//     window.shouldPreventModal = true;
//
//     return $.ajax({
//       url: updateQuantityInCartUrl,
//       method: 'POST',
//       data: requestData,
//       dataType: 'json',
//       beforeSend(jqXHR) {
//         promises.push(jqXHR);
//       },
//     })
//       .then((resp) => {
//         CheckUpdateQuantityOperations.checkUpdateOperation(resp);
//
//         $target.val(resp.quantity);
//         const dataset = ($target && $target.dataset) ? $target.dataset : resp;
//
//         // Refresh cart preview
//         prestashop.emit('updateCart', {
//           reason: dataset,
//           resp,
//         });
//       })
//       .fail((resp) => {
//         prestashop.emit('handleError', {
//           eventType: 'updateProductQuantityInCart',
//           resp,
//         });
//       });
//   }
//
//   function getQuantityChangeType($quantity) {
//     return $quantity > 0 ? 'up' : 'down';
//   }
//
//   function getRequestData(quantity) {
//     return {
//       ajax: '1',
//       qty: Math.abs(quantity),
//       action: 'update',
//       op: getQuantityChangeType(quantity),
//     };
//   }
//
//   function updateProductQuantityInCart(event) {
//     const $target = $(event.currentTarget);
//     const updateQuantityInCartUrl = $target.data('update-url');
//     const baseValue = $target.attr('value');
//
//     // There should be a valid product quantity in cart
//     const targetValue = $target.val();
//     /* eslint-disable */
//     if (targetValue != parseInt(targetValue, 10) || targetValue < 0 || isNaN(targetValue)) {
//       window.shouldPreventModal = false;
//       $target.val(baseValue);
//       return;
//     }
//     /* eslint-enable */
//     // There should be a new product quantity in cart
//     const qty = targetValue - baseValue;
//
//     if (qty === 0) {
//       return;
//     }
//
//     if (targetValue === '0') {
//       $target.closest('.product-line-actions').find('[data-link-action="delete-from-cart"]').click();
//     } else {
//       $target.attr('value', targetValue);
//       sendUpdateQuantityInCartRequest(updateQuantityInCartUrl, getRequestData(qty), $target);
//     }
//   }
//
//
//   $body.on('focusout keyup', productLineInCartSelector, (event) => {
//     if (event.type === 'keyup') {
//       if (event.keyCode === 13) {
//         isUpdateOperation = true;
//         updateProductQuantityInCart(event);
//       }
//
//       return false;
//     }
//
//     if (!isUpdateOperation) {
//       updateProductQuantityInCart(event);
//     }
//
//     return false;
//   });
//
//   const $timeoutEffect = 400;
//
//   $body.on('hidden.bs.collapse', prestashop.themeSelectors.cart.promoCode, () => {
//     $(prestashop.themeSelectors.cart.displayPromo).show($timeoutEffect);
//   });
//
//   $body.on('click', prestashop.themeSelectors.cart.promoCodeButton, (event) => {
//     event.preventDefault();
//
//     $(prestashop.themeSelectors.cart.promoCode).collapse('toggle');
//   });
//
//   $body.on('click', prestashop.themeSelectors.cart.displayPromo, (event) => {
//     $(event.currentTarget).hide($timeoutEffect);
//   });
//
//   $body.on('click', prestashop.themeSelectors.cart.discountCode, (event) => {
//     event.stopPropagation();
//
//     const $code = $(event.currentTarget);
//     const $discountInput = $(prestashop.themeSelectors.cart.discountName);
//
//     $discountInput.val($code.text());
//     // Show promo code field
//     $(prestashop.themeSelectors.cart.promoCode).collapse('show');
//     $(prestashop.themeSelectors.cart.displayPromo).hide($timeoutEffect);
//
//     return false;
//   });
// });
