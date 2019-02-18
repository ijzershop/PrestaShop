/**
 * 2007-2018 PrestaShop
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

const $ = window.$;

/**
 * Class PageNameOptionHandler is responsible for handling any logic related with current page name.
 */
export default class PageNameOptionHandler {
  constructor() {
    const currentPage = $(this.pageNameSelector).val();
    this.setUrlRewriteDisabledStatusByCurrentPage(currentPage);

    $(document).on('change', this.pageNameSelector, event => this.changePageNameEvent(event));
  }

  /**
   * Gets page name selector name.
   * @returns {string}
   * @private
   */
  get pageNameSelector() {
    return '.js-meta-page-name';
  }

  /**
   * An event which is being called after the selector is being updated.
   * @param {object} event
   * @private
   */
  changePageNameEvent(event) {
    const $this = $(event.currentTarget);
    const currentPage = $this.val();

    this.setUrlRewriteDisabledStatusByCurrentPage(currentPage);
  }

  /**
   * Sets url rewrite form field to disabled or enabled according to current page value.
   * @param {string} currentPage
   * @private
   */
  setUrlRewriteDisabledStatusByCurrentPage(currentPage) {
    $('.js-url-rewrite input').prop('disabled', currentPage === 'index');
  }
}
