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
use DynamicProduct\classes\helpers\FieldOptionHelper;
use DynamicProduct\classes\models\DynamicCalculationItem;
use DynamicProduct\classes\models\DynamicCondition;
use DynamicProduct\classes\models\DynamicEquation;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicFieldGroup;
use DynamicProduct\classes\models\DynamicMainConfig;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\classes\models\DynamicProductFieldGroup;
use DynamicProduct\classes\models\DynamicProductStep;
use DynamicProduct\classes\models\DynamicStep;
use DynamicProduct\classes\models\FieldFormula;
use DynamicProduct\classes\models\grids\Grid;
use DynamicProduct\classes\models\grids\GridColumn;
use DynamicProduct\classes\models\grids\GridRow;
use DynamicProduct\classes\models\grids\GridValue;
use DynamicProduct\classes\models\intervals\Interval;
use DynamicProduct\classes\models\intervals\IntervalCondition;
use DynamicProduct\classes\models\intervals\IntervalConditionGroup;
use DynamicProduct\classes\models\intervals\IntervalConditionRange;
use DynamicProduct\classes\models\intervals\IntervalConditionValue;
use DynamicProduct\classes\models\intervals\IntervalField;
use DynamicProduct\classes\models\intervals\IntervalFormula;
use iamgerwin\Toon\Toon;

function load(\DynamicProduct $module)
{
    return [
        'main_config' => DynamicMainConfig::getConfig(),
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function load_context()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_default_lang = \Configuration::get('PS_LANG_DEFAULT');

        $fields = DynamicField::getFieldRowsByProduct($id_product);
        $field_types = array_values(self::$module->field_types);
        $type_labels = [];
        foreach ($field_types as $field_type) {
            $type_labels[$field_type['type']] = $field_type['label'];
        }

        $context = '';

        $product_config = DynamicProductConfig::getByProduct($id_product);
        if (empty($product_config->data)) {
            $product_config->data = '{}';
        }
        $data = json_decode($product_config->data, true);
        $context .= "Product Configuration:\n" . Toon::encode($data) . "\n\n";

        $fields_infos = [];
        foreach ($fields as $field) {
            $options = [];
            foreach ($field['options'] as $option) {
                $options[] = [
                    'id' => $option['id'],
                    'label' => $option['label'][$id_default_lang],
                    'value' => $option['value'],
                    'secondary_value' => $option['secondary_value'],
                ];
            }

            $fields_infos[$field['id']] = [
                'id' => $field['id'],
                'type' => $type_labels[$field['type']],
                'label' => $field['label'][$id_default_lang],
                'options' => $options,
            ];
        }

        $context .= "Existing Fields:\n" . Toon::encode($fields_infos) . "\n";
        $context .= "When updating or deleting a field, use the field ID.\n";
        $context .= "When updating or deleting a field option, use the option ID and field ID.\n\n";

        $context .= "Supported field types:\n" . Toon::encode(array_values($type_labels)) . "\n";
        $context .= "The Image list type also supports a color list.\n\n";

        $equations = DynamicEquation::getEquationsByIdProduct($id_product);
        $equation_names = [
            DynamicEquation::_DP_PRICE_EQ_ => 'Price',
            DynamicEquation::_DP_WEIGHT_EQ_ => 'Weight',
            DynamicEquation::_DP_QUANTITY_EQ_ => 'Quantity',
            DynamicEquation::_DP_COST_EQ_ => 'Cost',
        ];
        $equations_infos = [];
        foreach ($equations as $equation) {
            $equations_infos[$equation_names[$equation->id_formula]] = $equation->formula;
        }
        $context .= "Existing Equations:\n" . Toon::encode($equations_infos) . "\n";
        $context .= "When creating or updating or deleting an equation, use one of these names: Price, Weight, Quantity, Cost\n\n";

        $field_formulas = FieldFormula::getByIdProduct($id_product);
        $field_formulas_infos = [];
        foreach ($field_formulas as $formula) {
            $target = FieldFormula::getTargetField($formula->formula);
            $field_formulas_infos[$target] = [
                'id' => $formula->id,
                'formula' => $formula->formula,
            ];
        }
        $context .= "Use field formulas to assign a formula to a field.\n";
        $context .= "Existing Field Formulas:\n" . Toon::encode($field_formulas_infos) . "\n";
        $context .= "When updating or deleting a field formula, use the field formula ID.\n\n";

        $conditions = DynamicCondition::getByIdProduct($id_product);
        $conditions_infos = [];
        foreach ($conditions as $condition) {
            $field_names = array_map(function ($field_id) use ($fields) {
                return $fields[$field_id]['name'];
            }, $condition->hidden_fields);
            $conditions_infos[$condition->id] = [
                'formula' => $condition->formula,
                'hidden_fields' => $field_names,
            ];
        }
        $context .= "Use conditions to show or hide fields, options, groups, or steps based on a formula.\n";
        $context .= "Existing Conditions:\n" . Toon::encode($conditions_infos) . "\n";
        $context .= "Create a new condition if existing conditions don't meet your needs.\n";
        $context .= "When updating or deleting a condition, use the condition ID.\n\n";

        $intervals = Interval::getByIdProduct($id_product);
        $intervals_infos = [];
        foreach ($intervals as $interval) {
            $interval_fields = [];
            foreach ($interval->interval_fields as $if) {
                $field_name = $fields[$if->id_field]['name'] ?? null;
                $interval_fields[] = [
                    'id' => $if->id,
                    'field' => $field_name,
                    'id_field' => $if->id_field,
                ];
            }

            $condition_groups = [];
            foreach ($interval->condition_groups as $cg_id => $cg) {
                $conditions = [];
                foreach ($cg->conditions as $c_id => $c) {
                    $cond_field_name = $fields[$c->id_field]['name'] ?? null;
                    $condition = [
                        'id' => $c_id,
                        'field' => $cond_field_name,
                        'id_field' => $c->id_field,
                        'type' => $c->type,
                    ];
                    if ($c->type === 'range') {
                        $condition['min'] = $c->min;
                        $condition['max'] = $c->max;
                    } else {
                        $condition['values'] = $c->values;
                    }
                    $conditions[] = $condition;
                }
                $condition_groups[] = [
                    'id' => $cg_id,
                    'conditions' => $conditions,
                ];
            }

            $formulas = array_map(function ($formula) {
                return $formula->formula;
            }, $interval->interval_formulas);

            $intervals_infos[] = [
                'id' => $interval->id,
                'interval_fields' => $interval_fields,
                'condition_groups' => $condition_groups,
                'formulas' => $formulas,
            ];
        }
        $context .= "Use intervals to vary field values based on conditions (ranges or discrete values).\n";
        $context .= "Existing Intervals:\n" . Toon::encode($intervals_infos) . "\n";
        $context .= "Formulas are keyed by {id_interval_field}-{id_condition_group}.\n\n";

        $grids = Grid::getByIdProduct($id_product);
        $grids_infos = [];
        foreach ($grids as $grid) {
            $target_field = $fields[$grid->id_field_target]['name'] ?? null;
            $column_field = $fields[$grid->id_field_column]['name'] ?? null;
            $row_field = $fields[$grid->id_field_row]['name'] ?? null;

            $columns = [];
            foreach ($grid->columns as $col) {
                $columns[] = ['id' => $col->id, 'value' => $col->value];
            }

            $rows = [];
            foreach ($grid->rows as $row) {
                $rows[] = ['id' => $row->id, 'value' => $row->value];
            }

            $grids_infos[] = [
                'id' => $grid->id,
                'target_field' => $target_field,
                'column_field' => $column_field,
                'row_field' => $row_field,
                'columns' => $columns,
                'rows' => $rows,
                'values' => $grid->values,
            ];
        }
        $context .= "Use grids to vary field values based on two other fields (2D lookup table).\n";
        $context .= "Existing Grids:\n" . Toon::encode($grids_infos) . "\n";
        $context .= "Grid values are keyed by {id_row}-{id_column}.\n\n";

        $groups = DynamicFieldGroup::getAll($id_default_lang);
        $groups_infos = [];
        foreach ($groups as $group) {
            $groups_infos[] = [
                'id' => $group->id,
                'name' => $group->name,
                'label' => $group->label,
            ];
        }
        $context .= "Available Field Groups:\n" . Toon::encode($groups_infos) . "\n";

        $product_groups = DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_default_lang);
        $product_groups_infos = [];
        foreach ($product_groups as $pg) {
            $product_groups_infos[] = [
                'id' => $pg->id,
                'id_field_group' => $pg->id_field_group,
            ];
        }
        $context .= "Product Field Groups (already added):\n" . Toon::encode($product_groups_infos) . "\n";
        $context .= "Use add_field_group with id_group, delete_field_group with id.\n\n";

        $steps = DynamicStep::getAll($id_default_lang);
        $steps_infos = [];
        foreach ($steps as $step) {
            $steps_infos[] = [
                'id' => $step->id,
                'name' => $step->name,
                'label' => $step->label,
            ];
        }
        $context .= "Available Steps:\n" . Toon::encode($steps_infos) . "\n";

        $product_steps = DynamicProductStep::getByIdProduct($id_product, true, $id_default_lang);
        $product_steps_infos = [];
        foreach ($product_steps as $ps) {
            $product_steps_infos[] = [
                'id' => $ps->id,
                'id_step' => $ps->id_step,
            ];
        }
        $context .= "Product Steps (already added):\n" . Toon::encode($product_steps_infos) . "\n";
        $context .= "Use add_step with id_step, delete_step with id.\n\n";

        $calculation_items = DynamicCalculationItem::getByIdProduct($id_product);
        $calculation_items_infos = [];
        foreach ($calculation_items as $item) {
            $calculation_items_infos[] = [
                'id' => $item->id,
                'type' => $item->type,
                'id_item' => $item->id_item ?: 'all',
                'position' => $item->position,
            ];
        }

        $context .= "You may need to enable custom calculation order if needed and add calculation items in the logical order.\n";
        if ($product_config->custom_calculation) {
            $context .= "Custom calculation order is ENABLED.\n";
            $context .= "Existing Calculation Items (executed in order):\n" . Toon::encode($calculation_items_infos) . "\n";
            $context .= "Types: condition, field_formula, interval, grid. id_item='all' means all items of that type.\n";
        } else {
            $context .= "Custom calculation order is DISABLED. Default order: intervals, field_formulas, grids, conditions.\n";
        }

        $extra_content = \Tools::file_get_contents(__DIR__ . '/AI.php');
        $context .= "\n" . $extra_content;

        return ['success' => true, 'context' => $context];
    }

    public static function execute_tool()
    {
        $tool = \Tools::getValue('tool');

        if (empty($tool['name'] ?? '')) {
            return ['error' => true, 'message' => 'Invalid tool'];
        }

        $method = $tool['name'];
        if (!method_exists(self::class, $method)) {
            return ['error' => true, 'message' => 'Invalid tool'];
        }

        $args = $tool['arguments'] ?? [];

        return call_user_func([self::class, $method], $args);
    }

    public static function create_field($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_default_lang = (int) \Configuration::get('PS_LANG_DEFAULT');

        $type_label = $args['type'];
        $field_types = array_values(self::$module->field_types);
        $type = array_search($type_label, array_column($field_types, 'label'));
        $id_type = $field_types[$type]['type'];

        $dynamic_field = new DynamicField();
        $dynamic_field->id_product = $id_product;
        $dynamic_field->type = (int) $id_type;
        $dynamic_field->name = $args['name'];
        $dynamic_field->label = [$id_default_lang => $args['label']];
        $dynamic_field->position = DynamicField::getHighestPosition($dynamic_field) + 1;
        $dynamic_field->active = true;
        $success = $dynamic_field->save();

        return $success ?
          ['success' => true, 'message' => "Field '{$args['name']}' created successfully", 'goto' => '/product/fields/'] :
          ['error' => true, 'message' => 'Failed to create field'];
    }

    public static function update_field($args)
    {
        $id_default_lang = (int) \Configuration::get('PS_LANG_DEFAULT');
        $id_field = (int) $args['id'];

        $id_type = null;
        if (isset($args['type'])) {
            $type_label = $args['type'];
            $field_types = array_values(self::$module->field_types);
            $type = array_search($type_label, array_column($field_types, 'label'));
            $id_type = $field_types[$type]['type'];
        }

        $dynamic_field = new DynamicField($id_field);
        if (!$dynamic_field->id) {
            return ['error' => true, 'message' => 'Field not found'];
        }
        if (isset($args['name'])) {
            $dynamic_field->name = $args['name'];
        }
        if (isset($args['label'])) {
            $dynamic_field->label = [$id_default_lang => $args['label']];
        }
        if ($id_type) {
            $dynamic_field->type = (int) $id_type;
        }
        $success = $dynamic_field->save();

        return $success ?
          ['success' => true, 'message' => "Field '{$dynamic_field->name}' updated successfully", 'goto' => '/product/fields/'] :
          ['error' => true, 'message' => "Failed to update field '{$id_field}'"];
    }

    public static function delete_field($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_field = (int) $args['id'];

        $dynamic_field = new DynamicField($id_field);
        if (!$dynamic_field->id) {
            return ['error' => true, 'message' => 'Field not found'];
        }
        $success = DynamicFieldsHelper::deleteField($id_product, $id_field);

        return $success ?
          ['success' => true, 'message' => "Field '{$dynamic_field->name}' deleted successfully", 'goto' => '/product/fields/'] :
          ['error' => true, 'message' => "Failed to delete field '{$id_field}'"];
    }

    public static function create_condition($args)
    {
        $id_product = (int) \Tools::getValue('id_product');

        $condition = new DynamicCondition();
        $condition->id_product = $id_product;
        $condition->formula = $args['formula'];
        $condition->position = DynamicField::getHighestPosition($condition) + 1;
        $success = $condition->save();

        $field_names = $args['hidden_fields'];
        $product_fields = array_values(DynamicField::getFieldRowsByProduct($id_product));
        $field_ids = array_map(function ($field_name) use ($product_fields) {
            return array_search($field_name, array_column($product_fields, 'name'));
        }, $field_names);
        $field_ids = array_filter($field_ids, function ($index) {
            return $index !== false;
        });
        $field_ids = array_map(function ($index) use ($product_fields) {
            return $product_fields[$index]['id'];
        }, $field_ids);

        foreach ($field_ids as $id_field) {
            if ((int) $id_field) {
                \Db::getInstance()->insert(
                    self::$module->name . '_condition_visibility',
                    [
                        'id_condition' => (int) $condition->id,
                        'id_field' => (int) $id_field,
                        'visible' => 0,
                    ],
                    false,
                    true,
                    \DbCore::REPLACE
                );
            }
        }

        return $success ?
          ['success' => true, 'message' => "Condition created successfully: {$args['formula']}", 'goto' => '/product/conditions/'] :
          ['error' => true, 'message' => 'Failed to create condition'];
    }

    public static function update_condition($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_condition = $args['id'];
        $formula = $args['formula'];

        if (!$id_condition) {
            return ['error' => true, 'message' => "Condition not found: {$id_condition}"];
        }

        $condition = new DynamicCondition($id_condition);
        $condition->formula = $formula;
        if (isset($args['hidden_fields'])) {
            $condition->hidden_fields = $args['hidden_fields'];
        }
        $success = $condition->save();

        $field_names = $args['hidden_fields'];
        $product_fields = array_values(DynamicField::getFieldRowsByProduct($id_product));
        $field_ids = array_map(function ($field_name) use ($product_fields) {
            return array_search($field_name, array_column($product_fields, 'name'));
        }, $field_names);
        $field_ids = array_filter($field_ids, function ($index) {
            return $index !== false;
        });
        $field_ids = array_map(function ($index) use ($product_fields) {
            return $product_fields[$index]['id'];
        }, $field_ids);

        if (count($field_ids) > 0) {
            \Db::getInstance()->delete(
                self::$module->name . '_condition_visibility',
                'id_condition = ' . (int) $condition->id
            );
        }

        foreach ($field_ids as $id_field) {
            if ((int) $id_field) {
                \Db::getInstance()->insert(
                    self::$module->name . '_condition_visibility',
                    [
                        'id_condition' => (int) $condition->id,
                        'id_field' => (int) $id_field,
                        'visible' => 0,
                    ],
                    false,
                    true,
                    \DbCore::REPLACE
                );
            }
        }

        return $success ?
          ['success' => true, 'message' => "Condition updated successfully: {$id_condition}", 'goto' => '/product/conditions/'] :
          ['error' => true, 'message' => "Failed to update condition: {$id_condition}"];
    }

    public static function delete_condition($args)
    {
        $id_condition = $args['id'];

        if (!$id_condition) {
            return ['error' => true, 'message' => "Condition not found: {$id_condition}"];
        }

        $condition = new DynamicCondition($id_condition);
        $success = $condition->delete();

        return $success ?
          ['success' => true, 'message' => "Condition deleted successfully: {$id_condition}", 'goto' => '/product/conditions/'] :
          ['error' => true, 'message' => "Failed to delete condition: {$id_condition}"];
    }

    public static function create_formula($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $formula = $args['formula'];
        $name = $args['name'] ?? 'Price';
        $types = [
            'Price' => DynamicEquation::_DP_PRICE_EQ_,
            'Weight' => DynamicEquation::_DP_WEIGHT_EQ_,
            'Quantity' => DynamicEquation::_DP_QUANTITY_EQ_,
            'Cost' => DynamicEquation::_DP_COST_EQ_,
        ];
        $equation = DynamicEquation::getEquationByIdFormula($id_product, $types[$name]);
        $equation->formula = $formula;
        $success = $equation->save();

        return $success ?
          ['success' => true, 'message' => "Formula created successfully for {$name}: {$formula}", 'goto' => '/product/formulas/'] :
          ['error' => true, 'message' => "Failed to create {$name} formula"];
    }

    public static function update_formula($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $formula = $args['formula'];
        $name = $args['name'] ?? 'Price';
        $types = [
            'Price' => DynamicEquation::_DP_PRICE_EQ_,
            'Weight' => DynamicEquation::_DP_WEIGHT_EQ_,
            'Quantity' => DynamicEquation::_DP_QUANTITY_EQ_,
            'Cost' => DynamicEquation::_DP_COST_EQ_,
        ];
        $equation = DynamicEquation::getEquationByIdFormula($id_product, $types[$name]);
        $equation->formula = $formula;
        $success = $equation->save();

        return $success ?
          ['success' => true, 'message' => "Formula updated successfully for {$name}: {$formula}", 'goto' => '/product/formulas/'] :
          ['error' => true, 'message' => "Failed to update {$name} formula"];
    }

    public static function delete_formula($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $name = $args['name'] ?? 'Price';
        $types = [
            'Price' => DynamicEquation::_DP_PRICE_EQ_,
            'Weight' => DynamicEquation::_DP_WEIGHT_EQ_,
            'Quantity' => DynamicEquation::_DP_QUANTITY_EQ_,
            'Cost' => DynamicEquation::_DP_COST_EQ_,
        ];
        $equation = DynamicEquation::getEquationByIdFormula($id_product, $types[$name]);
        $success = $equation->delete();

        return $success ?
          ['success' => true, 'message' => "Formula deleted successfully for {$name}", 'goto' => '/product/formulas/'] :
          ['error' => true, 'message' => "Failed to delete {$name} formula"];
    }

    public static function create_field_formula($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $target = $args['target'];
        $formula = $args['formula'];
        $id_field_formula = (int) \Db::getInstance()->getValue('
      SELECT id_field_formula
      FROM ' . _DB_PREFIX_ . 'dynamicproduct_field_formula 
      WHERE id_product = ' . (int) $id_product . ' AND formula LIKE "[' . pSQL($target) . ']%=%"
      ORDER BY position DESC'
        );

        $target_field = FieldFormula::getTargetField($formula);
        if (!$target_field) {
            $formula = "[$target] = {$formula}";
        }

        $field_formula = new FieldFormula($id_field_formula);
        $field_formula->id_product = $id_product;
        $field_formula->formula = $formula;
        $success = $field_formula->save();

        return $success ?
          ['success' => true, 'message' => "Formula created successfully for {$target}: {$formula}", 'goto' => '/product/field-formulas/'] :
          ['error' => true, 'message' => "Failed to create {$target} formula"];
    }

    public static function update_field_formula($args)
    {
        $id_field_formula = (int) $args['id'];
        $formula = $args['formula'];

        $field_formula = new FieldFormula($id_field_formula);
        if (!$field_formula->id) {
            return ['error' => true, 'message' => "Field formula not found: {$id_field_formula}"];
        }

        $field_formula->formula = $formula;
        $success = $field_formula->save();
        $target = FieldFormula::getTargetField($formula);

        return $success ?
          ['success' => true, 'message' => "Formula updated successfully for {$target}: {$formula}", 'goto' => '/product/field-formulas/'] :
          ['error' => true, 'message' => "Failed to update field formula {$id_field_formula}"];
    }

    public static function delete_field_formula($args)
    {
        $id_field_formula = (int) $args['id'];

        $field_formula = new FieldFormula($id_field_formula);
        if (!$field_formula->id) {
            return ['error' => true, 'message' => "Field formula not found: {$id_field_formula}"];
        }

        $target = FieldFormula::getTargetField($field_formula->formula);
        $success = $field_formula->delete();

        return $success ?
          ['success' => true, 'message' => "Formula deleted successfully for {$target}", 'goto' => '/product/field-formulas/'] :
          ['error' => true, 'message' => "Failed to delete field formula {$id_field_formula}"];
    }

    public static function create_field_option($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_default_lang = (int) \Configuration::get('PS_LANG_DEFAULT');
        $field_name = $args['field_name'];

        $field = DynamicField::getFieldByName($id_product, $field_name);
        if (!$field) {
            return ['error' => true, 'message' => "Field not found: $field_name"];
        }

        $option = FieldOptionHelper::getOptionInstance(null, $field->type);
        if (!$option) {
            return ['error' => true, 'message' => "Field type does not support options: $field_name"];
        }

        $option->id_field = $field->id;
        $option->value = $args['value'];
        $option->label = [$id_default_lang => $args['label']];
        $option->is_default = !empty($args['is_default']) ? 1 : 0;
        if (isset($args['color'])) {
            $option->color = $args['color'];
        }
        $option->position = FieldOptionHelper::getHighestOptionPosition($field->id, $field->type) + 1;
        $success = $option->save();

        return $success ?
          ['success' => true, 'message' => "Option '{$args['value']}' created for field '$field_name'"] :
          ['error' => true, 'message' => "Failed to create option for field '$field_name'"];
    }

    public static function update_field_option($args)
    {
        $id_default_lang = (int) \Configuration::get('PS_LANG_DEFAULT');
        $id_option = (int) $args['id'];
        $id_field = (int) $args['field_id'];

        $field = new DynamicField($id_field);
        if (!$field->id) {
            return ['error' => true, 'message' => "Field not found: $id_field"];
        }

        $option = FieldOptionHelper::getOptionInstance($id_option, $field->type);
        if (!$option || !$option->id) {
            return ['error' => true, 'message' => "Option not found: $id_option"];
        }

        if (isset($args['value'])) {
            $option->value = $args['value'];
        }
        if (isset($args['label'])) {
            $option->label = [$id_default_lang => $args['label']];
        }
        if (isset($args['is_default'])) {
            $option->is_default = !empty($args['is_default']) ? 1 : 0;
        }
        if (isset($args['color'])) {
            $option->color = $args['color'];
        }
        $success = $option->save();

        return $success ?
          ['success' => true, 'message' => "Option '{$option->value}' updated"] :
          ['error' => true, 'message' => "Failed to update option '$id_option'"];
    }

    public static function delete_field_option($args)
    {
        $id_option = (int) $args['id'];
        $id_field = (int) $args['field_id'];

        $field = new DynamicField($id_field);
        if (!$field->id) {
            return ['error' => true, 'message' => "Field not found: $id_field"];
        }

        $option = FieldOptionHelper::getOptionInstance($id_option, $field->type);
        if (!$option || !$option->id) {
            return ['error' => true, 'message' => "Option not found: $id_option"];
        }

        $value = $option->value;
        $success = $option->delete();

        return $success ?
          ['success' => true, 'message' => "Option '$value' deleted"] :
          ['error' => true, 'message' => "Failed to delete option '$id_option'"];
    }

    public static function update_product_config($args)
    {
        $id_product = (int) \Tools::getValue('id_product');

        $config = DynamicProductConfig::getByProduct($id_product);

        $schema_keys = array_keys(DynamicProductConfig::$definition['schema']);
        foreach ($schema_keys as $key) {
            if (isset($args[$key])) {
                $config->$key = $args[$key];
            }
        }

        $success = $config->save();

        return $success ?
          ['success' => true, 'message' => 'Product configuration updated', 'goto' => '/product/'] :
          ['error' => true, 'message' => 'Failed to update product configuration'];
    }

    public static function add_field_group($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_group = (int) ($args['id_group'] ?? 0);

        if (!$id_group) {
            return ['error' => true, 'message' => 'Please specify a valid group ID'];
        }

        $existing = \Db::getInstance()->getRow('SELECT *
      FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_field_group`
      WHERE `id_product` = ' . (int) $id_product . '
      AND `id_field_group` = ' . (int) $id_group
        );

        if ($existing) {
            return ['error' => true, 'message' => 'This group is already added to the product'];
        }

        $product_group = new DynamicProductFieldGroup();
        $product_group->id_product = $id_product;
        $product_group->id_field_group = $id_group;
        $product_group->position = DynamicProductFieldGroup::getHighestPosition($product_group);
        $success = $product_group->save();

        return $success ?
          ['success' => true, 'message' => 'Field group added', 'goto' => '/product/groups/'] :
          ['error' => true, 'message' => 'Failed to add field group'];
    }

    public static function add_step($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_step = (int) ($args['id_step'] ?? 0);

        if (!$id_step) {
            return ['error' => true, 'message' => 'Please specify a valid step ID'];
        }

        $existing = \Db::getInstance()->getRow('SELECT *
      FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_step`
      WHERE `id_product` = ' . (int) $id_product . '
      AND `id_step` = ' . (int) $id_step
        );

        if ($existing) {
            return ['error' => true, 'message' => 'This step is already added to the product'];
        }

        $product_step = new DynamicProductStep();
        $product_step->id_product = $id_product;
        $product_step->id_step = $id_step;
        $product_step->position = DynamicProductStep::getHighestPosition($product_step);
        $success = $product_step->save();

        return $success ?
          ['success' => true, 'message' => 'Step added', 'goto' => '/product/steps/'] :
          ['error' => true, 'message' => 'Failed to add step'];
    }

    public static function delete_field_group($args)
    {
        $id = (int) ($args['id'] ?? 0);

        if (!$id) {
            return ['error' => true, 'message' => 'Please specify a valid product field group ID'];
        }

        $obj = new DynamicProductFieldGroup($id);
        if (!$obj->id) {
            return ['error' => true, 'message' => 'Product field group not found'];
        }

        \Db::getInstance()->update(
            'dynamicproduct_field',
            ['id_group' => 0],
            'id_group = ' . (int) $obj->id_field_group
        );

        $success = $obj->delete();

        return $success ?
          ['success' => true, 'message' => 'Field group removed', 'goto' => '/product/groups/'] :
          ['error' => true, 'message' => 'Failed to remove field group'];
    }

    public static function delete_step($args)
    {
        $id = (int) ($args['id'] ?? 0);

        if (!$id) {
            return ['error' => true, 'message' => 'Please specify a valid product step ID'];
        }

        $obj = new DynamicProductStep($id);
        if (!$obj->id) {
            return ['error' => true, 'message' => 'Product step not found'];
        }

        \Db::getInstance()->update(
            'dynamicproduct_field',
            ['id_step' => 0],
            'id_step = ' . (int) $obj->id_step
        );

        \Db::getInstance()->update(
            'dynamicproduct_product_field_group',
            ['id_step' => 0],
            'id_step = ' . (int) $obj->id_step
        );

        $success = $obj->delete();

        return $success ?
          ['success' => true, 'message' => 'Step removed', 'goto' => '/product/steps/'] :
          ['error' => true, 'message' => 'Failed to remove step'];
    }

    public static function add_field_to_group($args)
    {
        $id_field = (int) ($args['id_field'] ?? 0);

        if (!$id_field) {
            return ['error' => true, 'message' => 'Please specify a field ID'];
        }

        $field = new DynamicField($id_field);
        if (!$field->id) {
            return ['error' => true, 'message' => 'Field not found'];
        }

        $id_field_group = \Db::getInstance()->getValue('
      SELECT `id_product_field_group` 
      FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_field_group`
      WHERE `id_product` = ' . (int) \Tools::getValue('id_product') . '
      AND `id_field_group` = ' . (int) $args['id_group']
        );
        $field->id_group = $id_field_group;
        $success = $field->save();

        return $success ?
          ['success' => true, 'message' => 'Field added to group', 'goto' => '/product/groups/'] :
          ['error' => true, 'message' => 'Failed to add field to group'];
    }

    public static function remove_field_from_group($args)
    {
        $id_field = (int) ($args['id_field'] ?? 0);

        if (!$id_field) {
            return ['error' => true, 'message' => 'Please specify a field ID'];
        }

        $field = new DynamicField($id_field);
        if (!$field->id) {
            return ['error' => true, 'message' => 'Field not found'];
        }

        $field->id_group = 0;
        $success = $field->save();

        return $success ?
          ['success' => true, 'message' => 'Field removed from group', 'goto' => '/product/groups/'] :
          ['error' => true, 'message' => 'Failed to remove field from group'];
    }

    public static function add_field_to_step($args)
    {
        $id_field = (int) ($args['id_field'] ?? 0);
        $id_step = (int) ($args['id_step'] ?? 0);

        if (!$id_field) {
            return ['error' => true, 'message' => 'Please specify a field ID'];
        }

        $field = new DynamicField($id_field);
        if (!$field->id) {
            return ['error' => true, 'message' => 'Field not found'];
        }

        $field->id_step = $id_step;
        $success = $field->save();

        return $success ?
          ['success' => true, 'message' => 'Field added to step', 'goto' => '/product/steps/'] :
          ['error' => true, 'message' => 'Failed to add field to step'];
    }

    public static function remove_field_from_step($args)
    {
        $id_field = (int) ($args['id_field'] ?? 0);

        if (!$id_field) {
            return ['error' => true, 'message' => 'Please specify a field ID'];
        }

        $field = new DynamicField($id_field);
        if (!$field->id) {
            return ['error' => true, 'message' => 'Field not found'];
        }

        $field->id_step = 0;
        $success = $field->save();

        return $success ?
          ['success' => true, 'message' => 'Field removed from step', 'goto' => '/product/steps/'] :
          ['error' => true, 'message' => 'Failed to remove field from step'];
    }

    public static function add_group_to_step($args)
    {
        $id_group = (int) ($args['id_group'] ?? 0);
        $id_step = (int) ($args['id_step'] ?? 0);

        if (!$id_group) {
            return ['error' => true, 'message' => 'Please specify a group ID'];
        }

        $id_field_group = \Db::getInstance()->getValue('
      SELECT `id_product_field_group` 
      FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_field_group`
      WHERE `id_product` = ' . (int) \Tools::getValue('id_product') . '
      AND `id_field_group` = ' . (int) $args['id_group']
        );
        $group = new DynamicProductFieldGroup($id_field_group);
        if (!$group->id) {
            return ['error' => true, 'message' => 'Product field group not found'];
        }

        $group->id_step = $id_step;
        $success = $group->save();

        return $success ?
          ['success' => true, 'message' => 'Group added to step', 'goto' => '/product/steps/'] :
          ['error' => true, 'message' => 'Failed to add group to step'];
    }

    public static function remove_group_from_step($args)
    {
        $id_group = (int) ($args['id_group'] ?? 0);

        if (!$id_group) {
            return ['error' => true, 'message' => 'Please specify a group ID'];
        }

        $group = new DynamicProductFieldGroup($id_group);
        if (!$group->id) {
            return ['error' => true, 'message' => 'Product field group not found'];
        }

        $group->id_step = 0;
        $success = $group->save();

        return $success ?
          ['success' => true, 'message' => 'Group removed from step', 'goto' => '/product/steps/'] :
          ['error' => true, 'message' => 'Failed to remove group from step'];
    }

    public static function add_calculation_item($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $type = $args['type'] ?? '';
        $id_item = $args['id_item'] ?? 0;
        $position = $args['position'] ?? null;

        $valid_types = ['condition', 'field_formula', 'interval', 'grid'];
        if (!in_array($type, $valid_types)) {
            return ['error' => true, 'message' => "Invalid type: $type. Must be one of: " . implode(', ', $valid_types)];
        }

        $item = new DynamicCalculationItem();
        $item->id_product = $id_product;
        $item->type = $type;
        $item->id_item = (int) $id_item;

        if ($position !== null) {
            // Shift existing items at or after this position
            \Db::getInstance()->execute('
        UPDATE `' . _DB_PREFIX_ . 'dynamicproduct_calculation_item`
        SET `position` = `position` + 1
        WHERE `id_product` = ' . (int) $id_product . ' AND `position` >= ' . (int) $position
            );
            $item->position = (int) $position;
        } else {
            $item->position = DynamicCalculationItem::getHighestPosition($item) + 1;
        }

        $success = $item->save();

        $label = $id_item ? "$type #$id_item" : "$type step";

        return $success ?
          ['success' => true, 'message' => "Calculation item added: $label", 'goto' => '/product/calculation/'] :
          ['error' => true, 'message' => 'Failed to add calculation item'];
    }

    public static function delete_calculation_item($args)
    {
        $id = (int) $args['id'];

        $item = new DynamicCalculationItem($id);
        if (!$item->id) {
            return ['error' => true, 'message' => "Calculation item not found: $id"];
        }

        $success = $item->delete();

        return $success ?
          ['success' => true, 'message' => "Calculation item deleted: $id", 'goto' => '/product/calculation/'] :
          ['error' => true, 'message' => "Failed to delete calculation item: $id"];
    }

    public static function create_interval($args)
    {
        $id_product = (int) \Tools::getValue('id_product');

        $interval = new Interval();
        $interval->id_product = $id_product;
        $interval->save();

        $interval_field_ids = [];
        $interval_fields_arg = $args['interval_fields'] ?? [];
        if (count($interval_fields_arg)) {
            foreach ($interval_fields_arg as $if) {
                $interval_field = new IntervalField();
                $interval_field->id_interval = $interval->id;
                $interval_field->id_field = (int) ($if['id_field'] ?? 0);
                $interval_field->save();
                $interval_field_ids[] = $interval_field->id;
            }
        } else {
            $interval_field = new IntervalField();
            $interval_field->id_interval = $interval->id;
            $interval_field->save();
            $interval_field_ids[] = $interval_field->id;
        }

        $condition_group_ids = [];
        $condition_groups_arg = $args['condition_groups'] ?? [];
        if (count($condition_groups_arg)) {
            foreach ($condition_groups_arg as $cg) {
                $condition_group = new IntervalConditionGroup();
                $condition_group->id_interval = $interval->id;
                $condition_group->save();
                $condition_group_ids[] = $condition_group->id;

                $conditions = $cg['conditions'] ?? [];
                if (count($conditions)) {
                    foreach ($conditions as $c) {
                        $type = $c['type'] ?? 'range';
                        $interval_condition = new IntervalCondition();
                        $interval_condition->id_interval_condition_group = $condition_group->id;
                        $interval_condition->id_field = (int) ($c['id_field'] ?? 0);
                        $interval_condition->type = $type;
                        $interval_condition->save();

                        if ($type === 'range') {
                            $condition_range = new IntervalConditionRange();
                            $condition_range->id_interval_condition = $interval_condition->id;
                            $condition_range->min = (float) ($c['min'] ?? 0);
                            $condition_range->max = (float) ($c['max'] ?? 0);
                            $condition_range->save();
                        } elseif ($type === 'values' && isset($c['values'])) {
                            foreach ($c['values'] as $value) {
                                $condition_value = new IntervalConditionValue();
                                $condition_value->id_interval_condition = $interval_condition->id;
                                $condition_value->value = $value;
                                $condition_value->save();
                            }
                        }
                    }
                } else {
                    $interval_condition = new IntervalCondition();
                    $interval_condition->id_interval_condition_group = $condition_group->id;
                    $interval_condition->type = 'range';
                    $interval_condition->save();
                }
            }
        } else {
            $condition_group = new IntervalConditionGroup();
            $condition_group->id_interval = $interval->id;
            $condition_group->save();
            $condition_group_ids[] = $condition_group->id;

            $interval_condition = new IntervalCondition();
            $interval_condition->id_interval_condition_group = $condition_group->id;
            $interval_condition->type = 'range';
            $interval_condition->save();
        }

        $interval_formulas_arg = $args['interval_formulas'] ?? [];
        foreach ($interval_formulas_arg as $key => $formula) {
            [$field_idx, $group_idx] = explode('-', $key);
            $id_interval_field = $interval_field_ids[(int) $field_idx] ?? null;
            $id_condition_group = $condition_group_ids[(int) $group_idx] ?? null;
            if ($id_interval_field && $id_condition_group) {
                $interval_formula = new IntervalFormula();
                $interval_formula->id_interval_field = $id_interval_field;
                $interval_formula->id_interval_condition_group = $id_condition_group;
                $interval_formula->formula = $formula;
                $interval_formula->save();
            }
        }

        return [
            'success' => true,
            'message' => "Interval created: #{$interval->id}",
            'goto' => '/product/intervals/',
        ];
    }

    public static function delete_interval($args)
    {
        $id = (int) $args['id'];

        $interval = new Interval($id);
        if (!$interval->id) {
            return ['error' => true, 'message' => "Interval not found: $id"];
        }

        $success = $interval->delete();

        return $success ?
          ['success' => true, 'message' => "Interval deleted: $id", 'goto' => '/product/intervals/'] :
          ['error' => true, 'message' => "Failed to delete interval: $id"];
    }

    public static function add_interval_field($args)
    {
        $id_interval = (int) $args['id_interval'];
        $id_field = (int) ($args['id_field'] ?? 0);

        $interval = new Interval($id_interval);
        if (!$interval->id) {
            return ['error' => true, 'message' => "Interval not found: $id_interval"];
        }

        $interval_field = new IntervalField();
        $interval_field->id_interval = $id_interval;
        $interval_field->id_field = $id_field;
        $success = $interval_field->save();

        return $success ?
          ['success' => true, 'message' => 'Interval field added', 'goto' => '/product/intervals/'] :
          ['error' => true, 'message' => 'Failed to add interval field'];
    }

    public static function delete_interval_field($args)
    {
        $id = (int) $args['id'];

        $interval_field = new IntervalField($id);
        if (!$interval_field->id) {
            return ['error' => true, 'message' => "Interval field not found: $id"];
        }

        $success = $interval_field->delete();

        return $success ?
          ['success' => true, 'message' => "Interval field deleted: $id", 'goto' => '/product/intervals/'] :
          ['error' => true, 'message' => "Failed to delete interval field: $id"];
    }

    public static function add_condition_group($args)
    {
        $id_interval = (int) $args['id_interval'];

        $interval = new Interval($id_interval);
        if (!$interval->id) {
            return ['error' => true, 'message' => "Interval not found: $id_interval"];
        }

        IntervalConditionGroup::resetCache();

        $condition_group = new IntervalConditionGroup();
        $condition_group->id_interval = $id_interval;
        $condition_group->save();

        $conditions_arg = $args['conditions'] ?? [];
        if (count($conditions_arg)) {
            foreach ($conditions_arg as $c) {
                $type = $c['type'] ?? 'range';
                $interval_condition = new IntervalCondition();
                $interval_condition->id_interval_condition_group = $condition_group->id;
                $interval_condition->id_field = (int) ($c['id_field'] ?? 0);
                $interval_condition->type = $type;
                $interval_condition->save();

                if ($type === 'range') {
                    $condition_range = new IntervalConditionRange();
                    $condition_range->id_interval_condition = $interval_condition->id;
                    $condition_range->min = (float) ($c['min'] ?? 0);
                    $condition_range->max = (float) ($c['max'] ?? 0);
                    $condition_range->save();
                } elseif ($type === 'values' && isset($c['values'])) {
                    foreach ($c['values'] as $value) {
                        $condition_value = new IntervalConditionValue();
                        $condition_value->id_interval_condition = $interval_condition->id;
                        $condition_value->value = $value;
                        $condition_value->save();
                    }
                }
            }
        } else {
            $added = false;
            $last_condition_group = IntervalConditionGroup::getLastConditionGroup($id_interval);
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

        $interval_fields = IntervalField::getByInterval($id_interval);
        $existing_field_ids = array_map(function ($if) {
            return (int) $if->id_field;
        }, $interval_fields);

        $interval_fields_arg = $args['interval_fields'] ?? [];
        foreach ($interval_fields_arg as $if_arg) {
            $id_field = (int) ($if_arg['id_field'] ?? 0);
            if ($id_field && !in_array($id_field, $existing_field_ids)) {
                $interval_field = new IntervalField();
                $interval_field->id_interval = $id_interval;
                $interval_field->id_field = $id_field;
                $interval_field->save();
            }
        }

        $interval_fields = IntervalField::getByInterval($id_interval);
        $interval_formulas_arg = $args['interval_formulas'] ?? [];
        foreach ($interval_formulas_arg as $id_field => $formula) {
            $id_interval_field = null;
            foreach ($interval_fields as $if) {
                if ((int) $if->id_field === (int) $id_field) {
                    $id_interval_field = $if->id;
                    break;
                }
            }
            if ($id_interval_field) {
                $interval_formula = new IntervalFormula();
                $interval_formula->id_interval_field = $id_interval_field;
                $interval_formula->id_interval_condition_group = $condition_group->id;
                $interval_formula->formula = $formula;
                $interval_formula->save();
            }
        }

        return [
            'success' => true,
            'message' => "Condition group added to interval $id_interval",
            'goto' => '/product/intervals/',
        ];
    }

    public static function delete_condition_group($args)
    {
        $id = (int) $args['id'];

        $condition_group = new IntervalConditionGroup($id);
        if (!$condition_group->id) {
            return ['error' => true, 'message' => "Condition group not found: $id"];
        }

        $success = $condition_group->delete();

        return $success ?
          ['success' => true, 'message' => "Condition group deleted: $id", 'goto' => '/product/intervals/'] :
          ['error' => true, 'message' => "Failed to delete condition group: $id"];
    }

    public static function update_interval_formula($args)
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_interval_field = (int) $args['id_interval_field'];
        $id_condition_group = (int) $args['id_condition_group'];
        $formula = $args['formula'];

        $field_names = DynamicFieldsHelper::getFieldsNames($id_product);
        $validation = DynamicEquation::checkFormula($id_product, $formula, $field_names);
        if ($validation !== true) {
            return ['error' => true, 'message' => $validation];
        }

        $obj = IntervalFormula::get($id_interval_field, $id_condition_group);
        $obj->formula = $formula;
        $success = $obj->save();

        return $success ?
          ['success' => true, 'message' => 'Interval formula updated', 'goto' => '/product/intervals/'] :
          ['error' => true, 'message' => 'Failed to update interval formula'];
    }

    public static function add_interval_condition($args)
    {
        $id_condition_group = (int) $args['id_condition_group'];
        $id_field = (int) ($args['id_field'] ?? 0);
        $type = $args['type'] ?? 'range';

        $condition_group = new IntervalConditionGroup($id_condition_group);
        if (!$condition_group->id) {
            return ['error' => true, 'message' => "Condition group not found: $id_condition_group"];
        }

        $interval_condition = new IntervalCondition();
        $interval_condition->id_interval_condition_group = $id_condition_group;
        $interval_condition->id_field = $id_field;
        $interval_condition->type = $type;
        $interval_condition->save();

        if ($type === 'range') {
            $condition_range = new IntervalConditionRange();
            $condition_range->id_interval_condition = $interval_condition->id;
            $condition_range->min = (float) ($args['min'] ?? 0);
            $condition_range->max = (float) ($args['max'] ?? 0);
            $condition_range->save();
        } elseif ($type === 'values' && isset($args['values'])) {
            foreach ($args['values'] as $value) {
                $condition_value = new IntervalConditionValue();
                $condition_value->id_interval_condition = $interval_condition->id;
                $condition_value->value = $value;
                $condition_value->save();
            }
        }

        return [
            'success' => true,
            'message' => 'Interval condition added',
            'goto' => '/product/intervals/',
        ];
    }

    public static function delete_interval_condition($args)
    {
        $id = (int) $args['id'];

        $interval_condition = new IntervalCondition($id);
        if (!$interval_condition->id) {
            return ['error' => true, 'message' => "Interval condition not found: $id"];
        }

        $success = $interval_condition->delete();

        return $success ?
          ['success' => true, 'message' => "Interval condition deleted: $id", 'goto' => '/product/intervals/'] :
          ['error' => true, 'message' => "Failed to delete interval condition: $id"];
    }

    public static function update_interval_condition($args)
    {
        $id = (int) $args['id'];
        $type = $args['type'] ?? 'range';

        $interval_condition = new IntervalCondition($id);
        if (!\Validate::isLoadedObject($interval_condition)) {
            return ['error' => true, 'message' => "Interval condition not found: $id"];
        }

        if (isset($args['id_field'])) {
            $interval_condition->id_field = (int) $args['id_field'];
        }
        $interval_condition->type = $type;
        $interval_condition->save();

        if ($type === 'range') {
            $condition_range = IntervalConditionRange::getByIntervalCondition($id);
            if (isset($args['min'])) {
                $condition_range->min = (float) $args['min'];
            }
            if (isset($args['max'])) {
                $condition_range->max = (float) $args['max'];
            }
            $condition_range->save();
        }

        if ($type === 'values' && isset($args['values'])) {
            $condition_values = IntervalConditionValue::getByIntervalCondition($id);
            foreach ($condition_values as $condition_value) {
                $condition_value->delete();
            }
            foreach ($args['values'] as $value) {
                $condition_value = new IntervalConditionValue();
                $condition_value->id_interval_condition = $id;
                $condition_value->value = $value;
                $condition_value->save();
            }
        }

        return [
            'success' => true,
            'message' => 'Interval condition updated',
            'goto' => '/product/intervals/',
        ];
    }

    public static function create_grid($args)
    {
        $id_product = (int) \Tools::getValue('id_product');

        $grid = new Grid();
        $grid->id_product = $id_product;
        $grid->id_field_target = (int) $args['id_field_target'];
        $grid->id_field_column = (int) $args['id_field_column'];
        $grid->id_field_row = (int) $args['id_field_row'];
        $grid->save();

        $id_grid = (int) $grid->id;

        $column_ids = [];
        foreach ($args['columns'] as $value) {
            $grid_column = new GridColumn();
            $grid_column->id_grid = $id_grid;
            $grid_column->value = (float) $value;
            $grid_column->save();
            $column_ids[] = (int) $grid_column->id;
        }

        $row_ids = [];
        foreach ($args['rows'] as $value) {
            $grid_row = new GridRow();
            $grid_row->id_grid = $id_grid;
            $grid_row->value = (float) $value;
            $grid_row->add();
            $row_ids[] = (int) $grid_row->id;
        }

        if (isset($args['values'])) {
            foreach ($args['values'] as $key => $value) {
                [$row_idx, $col_idx] = explode('-', $key);
                $id_column = $column_ids[(int) $col_idx] ?? null;
                $id_row = $row_ids[(int) $row_idx] ?? null;
                if ($id_column && $id_row) {
                    $grid_value = new GridValue();
                    $grid_value->id_grid = $id_grid;
                    $grid_value->id_grid_column = $id_column;
                    $grid_value->id_grid_row = $id_row;
                    $grid_value->value = (float) $value;
                    $grid_value->save();
                }
            }
        }

        return [
            'success' => true,
            'message' => "Grid created: #{$grid->id}",
            'goto' => '/product/grids/',
        ];
    }

    public static function delete_grid($args)
    {
        $id = (int) $args['id'];

        $grid = new Grid($id);
        if (!$grid->id) {
            return ['error' => true, 'message' => "Grid not found: $id"];
        }

        $success = $grid->delete();

        return $success ?
          ['success' => true, 'message' => "Grid deleted: $id", 'goto' => '/product/grids/'] :
          ['error' => true, 'message' => "Failed to delete grid: $id"];
    }

    public static function update_grid($args)
    {
        $id = (int) $args['id'];

        $grid = new Grid($id);
        if (!$grid->id) {
            return ['error' => true, 'message' => "Grid not found: $id"];
        }

        if (isset($args['id_field_target'])) {
            $grid->id_field_target = (int) $args['id_field_target'];
        }
        if (isset($args['id_field_column'])) {
            $grid->id_field_column = (int) $args['id_field_column'];
        }
        if (isset($args['id_field_row'])) {
            $grid->id_field_row = (int) $args['id_field_row'];
        }
        $success = $grid->save();

        return $success ?
          ['success' => true, 'message' => "Grid updated: $id", 'goto' => '/product/grids/'] :
          ['error' => true, 'message' => "Failed to update grid: $id"];
    }

    public static function add_grid_column($args)
    {
        $id_grid = (int) $args['id_grid'];
        $value = (float) ($args['value'] ?? 0);

        $grid = new Grid($id_grid);
        if (!$grid->id) {
            return ['error' => true, 'message' => "Grid not found: $id_grid"];
        }

        $grid_column = new GridColumn();
        $grid_column->id_grid = $id_grid;
        $grid_column->value = $value;
        $success = $grid_column->save();

        return $success ?
          ['success' => true, 'message' => 'Grid column added', 'goto' => '/product/grids/'] :
          ['error' => true, 'message' => 'Failed to add grid column'];
    }

    public static function delete_grid_column($args)
    {
        $id = (int) $args['id'];

        $grid_column = new GridColumn($id);
        if (!$grid_column->id) {
            return ['error' => true, 'message' => "Grid column not found: $id"];
        }

        $success = $grid_column->delete();

        return $success ?
          ['success' => true, 'message' => "Grid column deleted: $id", 'goto' => '/product/grids/'] :
          ['error' => true, 'message' => "Failed to delete grid column: $id"];
    }

    public static function add_grid_row($args)
    {
        $id_grid = (int) $args['id_grid'];
        $value = (float) ($args['value'] ?? 0);

        $grid = new Grid($id_grid);
        if (!$grid->id) {
            return ['error' => true, 'message' => "Grid not found: $id_grid"];
        }

        $grid_row = new GridRow();
        $grid_row->id_grid = $id_grid;
        $grid_row->value = $value;
        $success = $grid_row->add();

        return $success ?
          ['success' => true, 'message' => 'Grid row added', 'goto' => '/product/grids/'] :
          ['error' => true, 'message' => 'Failed to add grid row'];
    }

    public static function delete_grid_row($args)
    {
        $id = (int) $args['id'];

        $grid_row = new GridRow($id);
        if (!$grid_row->id) {
            return ['error' => true, 'message' => "Grid row not found: $id"];
        }

        $success = $grid_row->delete();

        return $success ?
          ['success' => true, 'message' => "Grid row deleted: $id", 'goto' => '/product/grids/'] :
          ['error' => true, 'message' => "Failed to delete grid row: $id"];
    }

    public static function update_grid_value($args)
    {
        $id_grid = (int) $args['id_grid'];
        $id_column = (int) $args['id_column'];
        $id_row = (int) $args['id_row'];
        $value = (float) $args['value'];

        $grid_value = GridValue::getByProperties($id_grid, $id_column, $id_row);
        $grid_value->value = $value;
        $success = $grid_value->save();

        return $success ?
          ['success' => true, 'message' => 'Grid value updated', 'goto' => '/product/grids/'] :
          ['error' => true, 'message' => 'Failed to update grid value'];
    }
}
