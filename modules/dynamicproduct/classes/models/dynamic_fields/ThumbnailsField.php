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

namespace classes\models\dynamic_fields;

use classes\helpers\OptionPriceHelper;
use classes\models\DynamicField;
use classes\models\DynamicThumbnailsOption;

class ThumbnailsField extends DynamicField
{
    /** @var DynamicThumbnailsOption[] */
    public $options;

    public function getOptions()
    {
        $options = DynamicThumbnailsOption::getThumbnailsOptionsByIdField($this->id, $this->id_lang);
        $option_price_helper = new OptionPriceHelper($this->module, $this->context);
        if ((int)$this->settings->display_value_price) {
            $options = $option_price_helper->addPriceFromValue($options, $this->id_product);
        }
        if ((int)$this->settings->display_secondary_value_price) {
            $options = $option_price_helper->addPriceFromSecondaryValue($options, $this->id_product);
        }
        return $options;
    }

    public function getInitialValue()
    {
        foreach ($this->options as $option) {
            if ($option->is_default) {
                return $option->value;
            }
        }
        return 0;
    }

    public function getInitialOptions()
    {
        foreach ($this->options as $option) {
            if ($option->is_default) {
                return array($option->id);
            }
        }
        return array();
    }
}
