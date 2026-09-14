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

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    return [
        'formulas' => [
            DynamicEquation::_DP_PRICE_EQ_ => DynamicEquation::getPriceEquation($id_product),
            DynamicEquation::_DP_WEIGHT_EQ_ => DynamicEquation::getWeightEquation($id_product),
            DynamicEquation::_DP_QUANTITY_EQ_ => DynamicEquation::getQuantityEquation($id_product),
            DynamicEquation::_DP_COST_EQ_ => DynamicEquation::getCostEquation($id_product),
        ],
        'fields' => DynamicField::getFieldRowsByProduct($id_product),
        'attributes' => ProductHelper::getProductAttributeFields($id_product),
        'features' => ProductHelper::getProductFeatureFields($id_product),
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
        $formulas = \Tools::getValue('formulas');
        $id_formula = (int) \Tools::getValue('action_value');

        $formula = $formulas[$id_formula];
        if (empty($formula['editable_formula'])) {
            $equation = DynamicEquation::getEquationByIdFormula($id_product, $id_formula);
            if (\Validate::isLoadedObject($equation)) {
                $equation->delete();

                return [
                    'formulas' => [
                        DynamicEquation::_DP_PRICE_EQ_ => DynamicEquation::getPriceEquation($id_product),
                        DynamicEquation::_DP_WEIGHT_EQ_ => DynamicEquation::getWeightEquation($id_product),
                        DynamicEquation::_DP_QUANTITY_EQ_ => DynamicEquation::getQuantityEquation($id_product),
                        DynamicEquation::_DP_COST_EQ_ => DynamicEquation::getCostEquation($id_product),
                    ],
                ];
            }
        }

        $field_names = DynamicFieldsHelper::getFieldsNames($id_product);
        $validation = DynamicEquation::checkFormula($id_product, $formula['editable_formula'], $field_names);
        if ($validation !== true) {
            return [
                'error' => true,
                'message' => $validation,
            ];
        }

        $equation = DynamicEquation::getEquationByIdFormula($id_product, $id_formula);
        $equation->formula = $formula['editable_formula'];
        $equation->save();

        return [
            'formulas' => [
                DynamicEquation::_DP_PRICE_EQ_ => DynamicEquation::getPriceEquation($id_product),
                DynamicEquation::_DP_WEIGHT_EQ_ => DynamicEquation::getWeightEquation($id_product),
                DynamicEquation::_DP_QUANTITY_EQ_ => DynamicEquation::getQuantityEquation($id_product),
                DynamicEquation::_DP_COST_EQ_ => DynamicEquation::getCostEquation($id_product),
            ],
        ];
    }
}
