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
import {ShowcaseExtension} from '@js/types/showcase';

const {$} = window;

/**
 * Class ShowcaseCard is responsible for handling events related with showcase card.
 */
export default class ShowcaseCard {
  id: string;

  $container: JQuery;

  /**
   * Showcase card id.
   *
   * @param {string} id
   */
  constructor(id: string) {
    this.id = id;
    this.$container = $(`#${this.id}`);
  }

  /**
   * Get showcase card container.
   *
   * @returns {jQuery}
   */
  getContainer(): JQuery {
    return this.$container;
  }

  /**
   * Extend showcase card with external extensions.
   *
   * @param {object} extension
   */
  addExtension(extension: ShowcaseExtension): void {
    extension.extend(this);
  }
}
