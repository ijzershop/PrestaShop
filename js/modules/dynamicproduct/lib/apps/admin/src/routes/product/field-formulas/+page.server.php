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

use DynamicProduct\classes\helpers\DynamicFieldsHelper;
use DynamicProduct\classes\helpers\ProductHelper;
use DynamicProduct\classes\models\DynamicEquation;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\FieldFormula;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    return [
        'field_formulas' => FieldFormula::getByIdProduct($id_product),
        'fields' => DynamicField::getFieldRowsByProduct($id_product),
        'features' => ProductHelper::getProductFeatureFields($id_product),
        'attributes' => ProductHelper::getProductAttributeFields($id_product),
        'ps_fields' => ProductHelper::getPrestaShopFields(),
        'databases' => ProductHelper::getProductDatabaseFields(),
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function update()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        if ($action_name === 'add-field') {
            $field_name = \Tools::getValue('field_name');
            if (empty($field_name)) {
                return [
                    'error' => true,
                    'message' => 'The field name is required',
                ];
            }

            $dynamic_field = new DynamicField();
            $dynamic_field->id_product = $id_product;
            $dynamic_field->type = _DP_INPUT_;
            $dynamic_field->name = $field_name;
            $dynamic_field->position = DynamicField::getHighestPosition($dynamic_field) + 1;
            $dynamic_field->active = true;
            $dynamic_field->save();

            return [
                'fields' => DynamicField::getFieldRowsByProduct($id_product),
            ];
        }

        $field_formulas = \Tools::getValue('field_formulas');

        foreach ($field_formulas as $field_formula) {
            $field_names = DynamicFieldsHelper::getFieldsNames($id_product);
            $validation = DynamicEquation::checkFormula($id_product, $field_formula['editable_formula'], $field_names);
            if ($validation !== true) {
                return [
                    'error' => true,
                    'message' => $validation,
                    'id' => $field_formula['id'],
                ];
            }
        }

        foreach ($field_formulas as $field_formula) {
            $dynamic_field_formula = new FieldFormula($field_formula['id']);
            $dynamic_field_formula->formula = $field_formula['editable_formula'];
            $dynamic_field_formula->save();
        }

        if ($action_name === 'add') {
            $dynamic_field_formula = new FieldFormula();
            $dynamic_field_formula->id_product = $id_product;
            $dynamic_field_formula->formula = '';
            $dynamic_field_formula->position = FieldFormula::getHighestPosition($dynamic_field_formula) + 1;
            $dynamic_field_formula->save();
        }

        if ($action_name === 'delete') {
            $dynamic_field_formula = new FieldFormula($action_value);
            $dynamic_field_formula->delete();
        }

        return [
            'field_formulas' => FieldFormula::getByIdProduct($id_product),
        ];
    }

    public static function sort()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id_field_formula) {
            $dynamic_field_formula = new FieldFormula($id_field_formula);
            $dynamic_field_formula->position = $position++;
            $dynamic_field_formula->save();
        }

        return [
            'field_formulas' => FieldFormula::getByIdProduct($id_product),
        ];
    }
}
