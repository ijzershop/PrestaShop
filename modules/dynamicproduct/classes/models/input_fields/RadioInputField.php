<?php
/**
 * 2007-2024 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
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
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2024 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\models\input_fields;

if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\models\DynamicInputField;

class RadioInputField extends DynamicInputField
{
    public $type = _DP_RADIO_;

    public function isSkipped()
    {
        return parent::isSkipped() || $this->skipIfEmpty();
    }

    private function skipIfEmpty()
    {
        return count($this->selected_options) === 0
            || (int) $this->field['settings']['hide_when_empty'] && empty($this->value);
    }

    public function displayValue()
    {
        if (count($this->selected_options) === 0) {
            return null;
        }

        $id_radio_option = $this->getFirstOption();
        if (!$id_radio_option) {
            return $this->value_formatted;
        }

        $options = $this->field['options'];
        if (isset($options[$id_radio_option])) {
            return $options[$id_radio_option]['label'];
        }

        return null;
    }

    public function getSKU()
    {
        if (count($this->selected_options) === 0) {
            return null;
        }

        $id_radio_option = $this->getFirstOption();
        if (!$id_radio_option) {
            return null;
        }

        $options = $this->field['options'];
        if (isset($options[$id_radio_option])) {
            return $options[$id_radio_option]['sku'];
        }

        return null;
    }
}
