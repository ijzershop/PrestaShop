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
import ProductPriceModifierSubmitRowActionExtension
  from "@components/grid/extension/action/row/product-price-modifier-submit-row-action-extension";

const {$} = window;

/**
 * Handles submit of grid actions
 */
export default class ProductPriceModifierSubmitBulkActionExtension {
  constructor() {
    return {
      extend: (grid) => this.extend(grid),
    };
  }

  /**
   * Extend grid with bulk action submitting
   *
   * @param {Grid} grid
   */
  extend(grid) {
    grid.getContainer().on('click', '.js-bulk-action-submit-btn', (event) => {
      this.submit(event, grid);
    });
  }

  /**
   * Handle bulk action submitting
   *
   * @param {Event} event
   * @param {Grid} grid
   *
   * @private
   */
  submit(event, grid) {
    const $submitBtn = $(event.currentTarget);
    const confirmMessage = $submitBtn.data('confirm-message');
    const confirmTitle = $submitBtn.data('confirmTitle');

    if (confirmMessage !== undefined && confirmMessage.length > 0) {
      if (confirmTitle !== undefined) {
        this.showConfirmModal($submitBtn, grid, confirmMessage, confirmTitle);
      } else if (window.confirm(confirmMessage)) {
        this.postForm($submitBtn, grid);
      }
    } else {
      this.postForm($submitBtn, grid);
    }
  }

  /**
   * @param {jQuery} $submitBtn
   * @param {Grid} grid
   * @param {string} confirmMessage
   * @param {string} confirmTitle
   */
  showConfirmModal($submitBtn, grid, confirmMessage, confirmTitle) {
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
    }, () => this.postForm($submitBtn, grid));

    modal.show();
  }

  /**
   * @param {jQuery} $submitBtn
   * @param {Grid} grid
   */
  postForm($submitBtn, grid) {
    const $form = $(`#${grid.getId()}_filter_form`);

    $form.attr('action', $submitBtn.data('form-url'));
    $form.attr('method', $submitBtn.data('form-method'));


    let bulkInputArray = {};

    $('#' + grid.getId() + '_filter_form .js-bulk-action-checkbox:checked').map(function (index, el) {
      let rowId = $(el).val();
      let rowArray = {};

      rowArray.id = rowId;
      rowArray.store_product = $('[name="selected_product_' + rowId + '"]').val();
      rowArray.supplier_price = $('[name="selected_formule_item_' + rowId + '"]:checked').attr('data-type');
      rowArray.formula = $('[name="formula_' + rowId + '"]').val();
      rowArray.increment_formula = $('[name="increment_formula_' + rowId + '"]').val();
      rowArray.new_price = $('[name="new_price_' + rowId + '"]').val();
      rowArray.active = $('[name="input-modernesmid_pricemodifier_price_modification_toggle_status-' + rowId + '"]:checked').val();
      bulkInputArray[index] = rowArray;
    });

    let stringData = JSON.stringify(bulkInputArray);

    $form.append($('<input>', {
      type: 'hidden',
      name: 'bulk_selected_rows_data',
      value: stringData,
    }));

    $form.submit();
  }
}
