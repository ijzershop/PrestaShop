<?php
/**
 * 2007-2026 TuniSoft
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
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\models\DynamicCombinationField;
use DynamicProduct\classes\models\DynamicCombinationValue;
use DynamicProduct\classes\models\DynamicField;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    $combination_values = DynamicCombinationValue::getValuesByIdProduct($id_product);
    $values = [];
    foreach ($combination_values as $combination_value) {
        $values["{$combination_value->id_attribute}-{$combination_value->id_field}"] = $combination_value->value;
    }

    return [
        'combinations' => $module->provider->getProductCombinations($id_product),
        'combination_fields' => DynamicCombinationField::getByIdProduct($id_product),
        'values' => $values,
        'fields' => DynamicField::getFieldRowsByProduct($id_product),
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function update()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('id_product');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        $values = \Tools::getValue('values');

        if ($action_name === 'update') {
            foreach ($values as $id => $value) {
                [$id_attribute, $id_field] = explode('-', $id);
                $combination_value = DynamicCombinationValue::getCombinationValue(
                    $id_product,
                    $id_attribute,
                    $id_field
                );

                if (!\Tools::strlen($value)) {
                    // if the admin emptied the value, delete it
                    if (\Validate::isLoadedObject($combination_value)) {
                        $combination_value->delete();
                    }
                } else {
                    $combination_value->value = (float) $value;
                    $combination_value->save();
                }
            }
        }

        if ($action_name === 'add-column') {
            $id_field = (int) \Tools::getValue('id_field');

            if (!$id_field) {
                return [
                    'error' => true,
                    'message' => self::$module->l('Please select a field', $source),
                ];
            }

            $combination_field = DynamicCombinationField::getByProductAndField($id_product, $id_field);
            if (\Validate::isLoadedObject($combination_field)) {
                return [
                    'error' => true,
                    'message' => self::$module->l('This column already exists', $source),
                ];
            }
            $combination_field->save();
        }

        if ($action_name === 'delete-column') {
            $combination_field = DynamicCombinationField::getByProductAndField($id_product, $action_value);
            $combination_field->delete();

            if (\Validate::isLoadedObject($combination_field)) {
                \Db::getInstance()->execute('
                    DELETE FROM ' . _DB_PREFIX_ . 'dynamicproduct_combination_value
                    WHERE id_field = ' . (int) $combination_field->id_field
                );
            }
        }

        return [];
    }
}
