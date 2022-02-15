<?php
/**
 * 2010-2022 Tuni-Soft
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
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use classes\DynamicTools;
use classes\models\DynamicDropdownOption;
use classes\models\DynamicRadioOption;
use classes\models\DynamicThumbnailsOption;
use classes\models\DynamicUnitValue;
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
     * @param integer $id_product
     * @param DynamicUnitValue $settings
     * @return DynamicDropdownOption[]|DynamicRadioOption[]|DynamicThumbnailsOption[]
     */
    public function displayValue($options, $id_product, $settings)
    {
        foreach ($options as $option) {
            if ((float) $option->value) {
                if (!$settings->custom_suffix) {
                    $option->displayed_value = DynamicTools::formatPrice(
                        $this->module->calculator->applyTax((float) $option->value, false, false, $id_product)
                    );
                } else {
                    $option->displayed_value = (float) $option->value . $settings->custom_suffix;
                }
            }
        }
        return $options;
    }

    /**
     * @param DynamicDropdownOption[]|DynamicRadioOption[]|DynamicThumbnailsOption[] $options
     * @param integer $id_product
     * @param DynamicUnitValue $settings
     * @return DynamicDropdownOption[]|DynamicRadioOption[]|DynamicThumbnailsOption[]
     */
    public function displaySecondaryValue($options, $id_product, $settings)
    {
        foreach ($options as $option) {
            if ((float) $option->secondary_value) {
                if (!$settings->custom_suffix) {
                    $option->displayed_value = DynamicTools::formatPrice(
                        $this->module->calculator->applyTax((float) $option->secondary_value, false, false, $id_product)
                    );
                } else {
                    $option->displayed_value = (float) $option->secondary_value . $settings->custom_suffix;
                }
            }
        }
        return $options;
    }
}
