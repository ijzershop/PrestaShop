/**
 * 2007-2019 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

const {$} = window;

/**
 * This handler displays use theme modal and handles the submit form logic.
 */
export default class UseThemeHandler {
  constructor() {
    $(document).on('click', '.js-display-use-theme-modal', (e) => this.displayUseThemeModal(e));
  }

  /**
   * Displays modal with its own event handling.
   *
   * @param e
   * @private
   */
  displayUseThemeModal(e) {
    const $modal = $('#use_theme_modal');

    $modal.modal('show');

    this.submitForm($modal, e);
  }

  /**
   * Submits form by adding click event listener for modal and calling original form event.
   *
   * @param $modal
   * @param originalButtonEvent
   *
   * @private
   */
  submitForm($modal, originalButtonEvent) {
    const $formButton = $(originalButtonEvent.currentTarget);

    $modal.on('click', '.js-submit-use-theme', () => {
      const $form = $formButton.closest('form');
      $form.submit();
    });
  }
}
