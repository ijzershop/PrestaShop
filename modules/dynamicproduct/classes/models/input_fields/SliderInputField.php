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

namespace classes\models\input_fields;

use classes\models\DynamicInputField;

class SliderInputField extends DynamicInputField
{
    public $type = _DP_SLIDER_;

    public function isSkipped()
    {
        return parent::isSkipped() || $this->skipIfEmpty();
    }

    private function skipIfEmpty()
    {
        return $this->field->settings->hide_when_empty && (float) $this->value === (float) 0;
    }

    public function displayValue()
    {
        return $this->value . ' ' . $this->getDynamicField()->getUnitSymbolOrName();
    }
}
