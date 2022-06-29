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

import ConfirmModal from '@components/modal';

const {$} = window;

/**
 * Class SubmitRowActionExtension handles submitting of row action
 */
export default class ProductPriceModifierSubmitRowActionExtension {
  /**
   * Extend grid
   *
   * @param {Grid} grid
   */
  extend(grid) {
    grid.getContainer().on('click', '.js-submit-row-action', (event) => {
      event.preventDefault();

      const $button = $(event.currentTarget);
      const confirmMessage = $button.data('confirmMessage');
      const confirmTitle = $button.data('title');
      console.log([]);
      const method = $button.data('method');

      if (confirmTitle) {
        this.showConfirmModal($button, grid, confirmMessage, confirmTitle, method);
      } else {
        if (confirmMessage.length && !window.confirm(confirmMessage)) {
          return;
        }

        this.postForm($button, method);
      }
    });
  }

  postForm($button, method) {
    const isGetOrPostMethod = ['GET', 'POST'].includes(method);

    let clickedRow = $button.closest('tr');
    let conProduct = clickedRow.find('.supplier_connected_product_selection').val();
    let selectedSupplierPrice = clickedRow.find('.selected_formule_item:checked').attr('data-type');
    let formula = clickedRow.find('.formula').val();
    let incrementFormula = clickedRow.find('.increment_formula').val();
    let newPrice = clickedRow.find('.new_price').val();
    let active = clickedRow.find('.ps-togglable-row input:checked').val();

    const $form = $('<form>', {
      action: $button.data('url'),
      method: isGetOrPostMethod ? method : 'POST',
    }).appendTo('body');



    $form.append($('<input>', {
      type: 'hidden',
      name: 'store_product',
      value: conProduct,
    }));

    $form.append($('<input>', {
      type: 'hidden',
      name: 'supplier_price',
      value: selectedSupplierPrice,
    }));


    $form.append($('<input>', {
      type: 'hidden',
      name: 'formula',
      value: formula,
    }));

    $form.append($('<input>', {
      type: 'hidden',
      name: 'increment_formula',
      value: incrementFormula,
    }));

    $form.append($('<input>', {
      type: 'hidden',
      name: 'new_price',
      value: newPrice,
    }));

    $form.append($('<input>', {
      type: 'hidden',
      name: 'active',
      value: active,
    }));

    if (!isGetOrPostMethod) {
      $form.append($('<input>', {
        type: '_hidden',
        name: '_method',
        value: method,
      }));
    }

    $form.submit();
  }

  /**
   * @param {jQuery} $submitBtn
   * @param {Grid} grid
   * @param {string} confirmMessage
   * @param {string} confirmTitle
   * @param {string} method
   */
  showConfirmModal($submitBtn, grid, confirmMessage, confirmTitle, method) {
    const confirmButtonLabel = $submitBtn.data('confirmButtonLabel');
    const closeButtonLabel = $submitBtn.data('closeButtonLabel');
    const confirmButtonClass = $submitBtn.data('confirmButtonClass');

    const modal = new ConfirmModal({
      id: `${grid.getId()}-grid-confirm-modal`,
      confirmTitle,
      confirmMessage,
      confirmButtonLabel,
      closeButtonLabel,
      confirmButtonClass,
    }, () => this.postForm($submitBtn, method));

    modal.show();
  }
}
