<?php
/**
 * 2007-2017 PrestaShop
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
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShopBundle\Localization\Specification;

use PrestaShopBundle\Localization\Specification\Number as NumberSpecification;

/**
 * Currency number (price) specification class
 * Regroups specific rules and data used when formatting a price in a given locale and a given numbering system
 * (latin, arab, ...).
 */
class Currency extends NumberSpecification
{
    /**
     * Currency display option : symbol notation
     * eg: €
     */
    const CURRENCY_DISPLAY_SYMBOL = 'symbol';

    /**
     * Currency display option : ISO code notation
     * eg: EUR
     */
    const CURRENCY_DISPLAY_CODE = 'code';

    /**
     * Type of display for currency symbol
     * cf. self::CURRENCY_DISPLAY_SYMBOL and self::CURRENCY_DISPLAY_CODE constants
     *
     * @var string
     */
    protected $currencyDisplay;

    /**
     * Get type of display for currency symbol
     *
     * @return string
     */
    public function getCurrencyDisplay()
    {
        return $this->currencyDisplay;
    }
}
