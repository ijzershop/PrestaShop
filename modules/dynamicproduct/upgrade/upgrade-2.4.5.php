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
 * @author    Tuni-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

use classes\models\DynamicCombinationField;
use classes\models\DynamicCombinationValue;

/**
 * @param DynamicProduct $module
 * @return bool
 */
function upgrade_module_2_4_5($module)
{
    $result = $module->installer->upgradeSQL('2.4.5');

    $product_values = array();

    /** @var DynamicCombinationValue[] $combination_values */
    $combination_values = DynamicCombinationValue::getAll();
    foreach ($combination_values as $combination_value) {
        $id_product = $combination_value->id_product;
        $id_field = $combination_value->id_field;
        if (!isset($product_values[$id_product])) {
            $product_values[$id_product] = array();
        }
        if (!in_array($id_field, $product_values[$id_product])) {
            $product_values[$id_product][] = $id_field;
        }
    }

    foreach ($product_values as $id_product => $id_fields) {
        foreach ($id_fields as $id_field) {
            $combination_field = new DynamicCombinationField();
            $combination_field->id_product = (int) $id_product;
            $combination_field->id_field = (int) $id_field;
            $combination_field->save();
        }
    }

    return $result;
}
