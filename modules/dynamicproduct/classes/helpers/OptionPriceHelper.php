<?php
/**
 * 2010-2021 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tunis-Soft
 * @copyright 2010-2021 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use classes\DynamicTools;
use classes\models\DynamicDropdownOption;
use classes\models\DynamicRadioOption;
use classes\models\DynamicThumbnailsOption;
use Context;
use DynamicProduct;

class OptionPriceHelper
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    /**
     * @param DynamicDropdownOption[]|DynamicRadioOption[]|DynamicThumbnailsOption[] $options
     */
    public function addPriceFromValue($options, $id_product)
    {
        foreach ($options as $option) {
            if ((float)$option->value) {
                $option->displayed_price = DynamicTools::formatPrice(
                    $this->module->calculator->applyTax((float)$option->value, false, false, $id_product)
                );
            }
        }
        return $options;
    }

    /**
     * @param DynamicDropdownOption[]|DynamicRadioOption[]|DynamicThumbnailsOption[] $options
     */
    public function addPriceFromSecondaryValue($options, $id_product)
    {
        foreach ($options as $option) {
            if ((float)$option->secondary_value) {
                $option->displayed_price = DynamicTools::formatPrice(
                    $this->module->calculator->applyTax((float)$option->secondary_value, false, false, $id_product)
                );
            }
        }
        return $options;
    }
}
