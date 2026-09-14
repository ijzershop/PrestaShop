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
use DynamicProduct\classes\models\intervals\Interval;
use DynamicProduct\classes\models\intervals\IntervalCondition;
use DynamicProduct\classes\models\intervals\IntervalConditionGroup;
use DynamicProduct\classes\models\intervals\IntervalConditionRange;
use DynamicProduct\classes\models\intervals\IntervalConditionValue;
use DynamicProduct\classes\models\intervals\IntervalField;
use DynamicProduct\classes\models\intervals\IntervalFormula;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    return [
        'intervals' => Interval::getByIdProduct($id_product),
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

        $intervals = \Tools::getValue('intervals');

        if ($action_name === 'update') {
            foreach ($intervals as $interval) {
                $interval_formulas = $interval['interval_formulas'];
                $interval_formula = $interval_formulas[$action_value] ?? null;
                if ($interval_formula) {
                    [$id_interval_field, $id_condition_group] = explode('-', $action_value);
                    $field_names = DynamicFieldsHelper::getFieldsNames($id_product);
                    $validation = DynamicEquation::checkFormula($id_product, $interval_formula['editable_formula'], $field_names);
                    if ($validation !== true) {
                        return [
                            'error' => true,
                            'message' => $validation,
                            'id' => $action_value,
                            'id_interval' => $interval['id'],
                        ];
                    }

                    $obj = IntervalFormula::get($id_interval_field, $id_condition_group);
                    $obj->formula = $interval_formula['editable_formula'];
                    $obj->save();
                }
            }
        }

        if ($action_name === 'add') {
            $interval = new Interval();
            $interval->id_product = $id_product;
            $interval->save();

            $interval_condition_group = new IntervalConditionGroup();
            $interval_condition_group->id_interval = $interval->id;
            $interval_condition_group->save();

            $interval_condition = new IntervalCondition();
            $interval_condition->id_interval_condition_group = $interval_condition_group->id;
            $interval_condition->type = 'range';
            $interval_condition->save();

            $interval_field = new IntervalField();
            $interval_field->id_interval = $interval->id;
            $interval_field->save();
        }

        if ($action_name === 'delete') {
            $interval = new Interval($action_value);
            $interval->delete();
        }

        if ($action_name === 'add-interval-field') {
            $interval_field = new IntervalField();
            $interval_field->id_interval = $action_value;
            $interval_field->save();
        }

        if ($action_name === 'delete-interval-field') {
            $interval_field = new IntervalField($action_value);
            $interval_field->delete();
        }

        if ($action_name === 'add-condition-group') {
            $id_interval = (int) $action_value;

            $last_condition_group = IntervalConditionGroup::getLastConditionGroup($id_interval);
            IntervalConditionGroup::resetCache();

            $condition_group = new IntervalConditionGroup();
            $condition_group->id_interval = $id_interval;
            $condition_group->save();

            $added = false;
            if (\Validate::isLoadedObject($last_condition_group)) {
                $interval_conditions = IntervalCondition::getByIntervalConditionGroup($last_condition_group->id);
                foreach ($interval_conditions as $interval_condition) {
                    $id_interval_condition = $interval_condition->id;
                    $interval_condition->id_interval_condition_group = $condition_group->id;
                    $interval_condition->add();
                    $added = true;

                    $condition_range = IntervalConditionRange::getByIntervalCondition($id_interval_condition);
                    if (\Validate::isLoadedObject($condition_range)) {
                        $condition_range->id_interval_condition = $interval_condition->id;
                        $diff = (float) $condition_range->max - (float) $condition_range->min;
                        $condition_range->min = (float) $condition_range->max;
                        $condition_range->max += $diff;
                        $condition_range->add();
                    }

                    $condition_values = IntervalConditionValue::getByIntervalCondition($id_interval_condition);
                    foreach ($condition_values as $condition_value) {
                        $condition_value->id_interval_condition = $interval_condition->id;
                        $condition_value->add();
                    }
                }
            }

            if (!$added) {
                $interval_condition = new IntervalCondition();
                $interval_condition->id_interval_condition_group = $condition_group->id;
                $interval_condition->type = 'range';
                $interval_condition->save();
            }
        }

        if ($action_name === 'delete-condition-group') {
            $interval_condition_group = new IntervalConditionGroup($action_value);
            $interval_condition_group->delete();
        }

        if ($action_name === 'update-interval-condition') {
            [$id_interval, $id_condition_group, $id_condition] = explode('-', $action_value);
            $condition = $intervals[$id_interval]['condition_groups'][$id_condition_group]['conditions'][$id_condition]
              ?? null;
            if ($condition) {
                $max = $condition['max'];
                if ($max === '∞') {
                    // 0 as the max is alias for +inf
                    $max = 0;
                } else {
                    $max = (float) $max;
                }
                $interval_condition = new IntervalCondition($id_condition);
                if (\Validate::isLoadedObject($interval_condition)) {
                    $interval_condition->id_field = $condition['id_field'];

                    $type = $condition['type'];
                    $interval_condition->type = $type;
                    $interval_condition->save();

                    if ($type === 'range') {
                        $condition_range = IntervalConditionRange::getByIntervalCondition($id_condition);
                        $condition_range->min = $condition['min'];
                        $condition_range->max = $max;
                        $condition_range->save();
                    }

                    if ($type === 'values') {
                        $condition_values = IntervalConditionValue::getByIntervalCondition($id_condition);
                        foreach ($condition_values as $condition_value) {
                            $condition_value->delete();
                        }
                        foreach ($condition['values'] as $value) {
                            $condition_value = new IntervalConditionValue();
                            $condition_value->id_interval_condition = $id_condition;
                            $condition_value->value = $value;
                            $condition_value->save();
                        }
                    }
                }
            }
        }

        return [
            'intervals' => Interval::getByIdProduct($id_product),
        ];
    }

    public static function insert_condition()
    {
        $id_condition_group = (int) \Tools::getValue('id_condition_group');

        $condition = new IntervalCondition();
        $condition->id_interval_condition_group = $id_condition_group;
        $condition->type = 'range';
        $condition->save();

        $condition_range = new IntervalConditionRange();
        $condition_range->id_interval_condition = $condition->id;
        $condition_range->min = 0;
        $condition_range->max = 0;
        $condition_range->save();

        return [
            'intervals' => Interval::getByIdProduct((int) \Tools::getValue('id_product')),
        ];
    }

    public static function delete_condition()
    {
        $id_condition = (int) \Tools::getValue('id_condition');
        $condition = new IntervalCondition($id_condition);
        $condition->delete();

        return [
            'intervals' => Interval::getByIdProduct((int) \Tools::getValue('id_product')),
        ];
    }

    public static function save_interval_field()
    {
        $id_product = (int) \Tools::getValue('id_product');

        $id = (int) \Tools::getValue('id');
        $id_field = (int) \Tools::getValue('id_field');

        $row = new IntervalField($id);
        $row->id_field = $id_field;
        $row->save();

        return [
            'intervals' => Interval::getByIdProduct($id_product),
        ];
    }
}
