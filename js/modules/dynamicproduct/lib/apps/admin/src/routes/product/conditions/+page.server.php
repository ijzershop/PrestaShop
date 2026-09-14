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

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\helpers\DynamicFieldsHelper;
use DynamicProduct\classes\helpers\ProductHelper;
use DynamicProduct\classes\models\DynamicCondition;
use DynamicProduct\classes\models\DynamicEquation;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicFieldGroup;
use DynamicProduct\classes\models\DynamicProductFieldGroup;
use DynamicProduct\classes\models\DynamicProductStep;
use DynamicProduct\classes\models\DynamicStep;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');
    $id_lang = DynamicContext::getLanguageId();

    return [
        'conditions' => DynamicCondition::getByIdProduct($id_product),
        'fields' => DynamicField::getFieldRowsByProduct($id_product),

        'groups' => DynamicFieldGroup::getRowsByProduct($id_product, $id_lang),
        'product_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_lang),

        'steps' => DynamicStep::getRowsByProduct($id_product, $id_lang),
        'product_steps' => DynamicProductStep::getByIdProduct($id_product),

        'features' => ProductHelper::getProductFeatureFields($id_product),
        'attributes' => ProductHelper::getProductAttributeFields($id_product),
        'ps_fields' => ProductHelper::getPrestaShopFields(),
        'databases' => ProductHelper::getProductDatabaseFields(),
    ];
}

class Actions
{
    public static $module;

    public static function update()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        $conditions = \Tools::getValue('conditions');

        foreach ($conditions as $condition) {
            $field_names = DynamicFieldsHelper::getFieldsNames($id_product);
            $validation = DynamicEquation::checkFormula($id_product, $condition['editable_formula'], $field_names);
            if ($validation !== true) {
                return [
                    'error' => true,
                    'message' => $validation,
                    'id' => $condition['id'],
                ];
            }
        }

        foreach ($conditions as $condition) {
            $dynamic_condition = new DynamicCondition($condition['id']);
            $dynamic_condition->name = $condition['name'];
            $dynamic_condition->formula = $condition['editable_formula'];
            $dynamic_condition->save();
        }

        foreach ($conditions as $condition) {
            \Db::getInstance()->delete(
                self::$module->name . '_condition_visibility',
                'id_condition = ' . (int) $condition['id']
            );

            foreach ($condition['hidden_fields'] as $id_field) {
                if ((int) $id_field) {
                    \Db::getInstance()->insert(
                        self::$module->name . '_condition_visibility',
                        [
                            'id_condition' => (int) $condition['id'],
                            'id_field' => (int) $id_field,
                            'visible' => 0,
                        ],
                        false,
                        true,
                        \Db::REPLACE
                    );
                }
            }

            foreach ($condition['hidden_options'] as $id_field => $hidden_options) {
                \Db::getInstance()->delete(
                    self::$module->name . '_condition_option_visibility',
                    'id_condition = ' . (int) $condition['id'] . ' AND id_field = ' . (int) $id_field
                );

                foreach ($hidden_options as $id_option) {
                    if ((int) $id_option) {
                        \Db::getInstance()->insert(
                            self::$module->name . '_condition_option_visibility',
                            [
                                'id_condition' => (int) $condition['id'],
                                'id_field' => (int) $id_field,
                                'id_option' => (int) $id_option,
                                'visible' => 0,
                            ],
                            false,
                            true,
                            \DbCore::REPLACE
                        );
                    }
                }
            }

            \Db::getInstance()->delete(
                self::$module->name . '_condition_group_visibility',
                'id_condition = ' . (int) $condition['id']
            );

            foreach ($condition['hidden_groups'] as $id_group) {
                if ((int) $id_group) {
                    \Db::getInstance()->insert(
                        self::$module->name . '_condition_group_visibility',
                        [
                            'id_condition' => (int) $condition['id'],
                            'id_group' => (int) $id_group,
                            'visible' => 0,
                        ],
                        false,
                        true,
                        \DbCore::REPLACE
                    );
                }
            }

            \Db::getInstance()->delete(
                self::$module->name . '_condition_step_visibility',
                'id_condition = ' . (int) $condition['id']
            );

            foreach ($condition['hidden_steps'] as $id_step) {
                if ((int) $id_step) {
                    \Db::getInstance()->insert(
                        self::$module->name . '_condition_step_visibility',
                        [
                            'id_condition' => (int) $condition['id'],
                            'id_step' => (int) $id_step,
                            'visible' => 0,
                        ],
                        false,
                        true,
                        \DbCore::REPLACE
                    );
                }
            }
        }

        if ($action_name === 'add') {
            $dynamic_condition = new DynamicCondition();
            $dynamic_condition->id_product = $id_product;
            $dynamic_condition->name = '';
            $dynamic_condition->formula = '';
            $dynamic_condition->position = DynamicCondition::getHighestPosition($dynamic_condition) + 1;
            $dynamic_condition->save();
        }

        if ($action_name === 'delete') {
            $dynamic_condition = new DynamicCondition($action_value);
            $dynamic_condition->delete();
        }

        return [
            'conditions' => DynamicCondition::getByIdProduct($id_product),
        ];
    }

    public static function sort()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id_condition) {
            $dynamic_condition = new DynamicCondition($id_condition);
            $dynamic_condition->position = $position++;
            $dynamic_condition->save();
        }

        return [
            'conditions' => DynamicCondition::getByIdProduct($id_product),
        ];
    }
}
