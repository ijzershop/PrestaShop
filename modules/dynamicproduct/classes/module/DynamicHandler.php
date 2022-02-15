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

namespace classes\module;

use Address;
use Cart;
use classes\DynamicTools;
use classes\models\DynamicCombinationField;
use classes\models\DynamicCombinationValue;
use classes\models\DynamicCommonField;
use classes\models\DynamicCondition;
use classes\models\DynamicConfig;
use classes\models\DynamicDropdownOption;
use classes\models\DynamicEquation;
use classes\models\DynamicField;
use classes\models\DynamicInput;
use classes\models\DynamicObject;
use classes\models\DynamicProductConfigLink;
use classes\models\DynamicProductFieldGroup;
use classes\models\DynamicProductStep;
use classes\models\DynamicProportion;
use classes\models\DynamicRadioOption;
use classes\models\DynamicThumbnailsOption;
use classes\models\DynamicUnitValue;
use classes\models\ExecOrder;
use classes\models\FieldFormula;
use classes\models\grids\Grid;
use classes\models\grids\GridColumn;
use classes\models\grids\GridRow;
use classes\models\grids\GridValue;
use classes\models\intervals\Interval;
use classes\models\intervals\IntervalCondition;
use classes\models\intervals\IntervalConditionGroup;
use classes\models\intervals\IntervalConditionRange;
use classes\models\intervals\IntervalConditionValue;
use classes\models\intervals\IntervalField;
use classes\models\intervals\IntervalFormula;
use Configuration;
use Context;
use Db;
use DbQuery;
use DynamicProduct;
use Guest;
use Language;
use Product;
use Validate;

class DynamicHandler
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function copyConfig($id_product_new, $id_product_old, $duplicating_product = false)
    {
        $product_fields = DynamicField::getFieldsByIdProduct($id_product_new);
        foreach ($product_fields as $product_field) {
            if ((int) $product_field->id_product === (int) $id_product_new) {
                $unit_value = $product_field->getUnitValues();
                $unit_value->delete();
                $product_field->delete();
            }
            $common_field = DynamicCommonField::getByFieldAndProduct($product_field->id, $id_product_new);
            $common_field->delete();
        }

        $field_groups_new = array();
        $product_steps_new = array();
        $fields_new = array();
        $options_new = array();

        DynamicProductStep::deleteByProduct($id_product_new);
        $product_steps = DynamicProductStep::getByIdProduct($id_product_old);
        foreach ($product_steps as $product_step) {
            $id_product_step = $product_step->id;
            $product_step->id_product = $id_product_new;
            $product_step->add();
            $product_steps_new[$id_product_step] = $product_step->id;
        }

        DynamicProductFieldGroup::deleteByProduct($id_product_new);
        $product_field_groups = DynamicProductFieldGroup::getByIdProduct($id_product_old);
        foreach ($product_field_groups as $product_field_group) {
            $id_step_new = (int) $this->module->provider->getNewID(
                $product_steps_new,
                $product_field_group->id_step
            );
            $id_field_group = $product_field_group->id;
            $product_field_group->id_product = $id_product_new;
            $product_field_group->id_step = $id_step_new;
            $product_field_group->add();
            $field_groups_new[$id_field_group] = $product_field_group->id;
        }

        $product_fields = DynamicField::getFieldsByIdProduct($id_product_old);
        foreach ($product_fields as $field) {
            $id_group_new = (int) $this->module->provider->getNewID(
                $field_groups_new,
                $field->id_group
            );
            $id_step_new = (int) $this->module->provider->getNewID(
                $product_steps_new,
                $field->id_step
            );
            $new_field = $this->copyField($field->id, $id_product_new, $id_product_old, $id_group_new, $id_step_new);
            $options_new[$field->id] = $new_field['options'];
            $id_new_field = $new_field['id_field'];
            if ($id_new_field !== (int) $field->id) {
                $fields_new[(int) $field->id] = $id_new_field;
            }
        }

        DynamicEquation::deleteByProduct($id_product_new);
        $product_equations = DynamicEquation::getEquationsByIdProduct($id_product_old);
        foreach ($product_equations as $product_equation) {
            $product_equation->id_product = $id_product_new;
            $product_equation->add();
        }

        if ($duplicating_product) {
            DynamicCombinationValue::deleteByProduct($id_product_new);

            $combination_values = DynamicCombinationValue::getValuesByIdProduct($id_product_old);
            $combination_values = DynamicCombinationValue::organizeByAttributes($combination_values);
            $attributes_old = Product::getProductAttributesIds($id_product_old);
            $attributes_new = Product::getProductAttributesIds($id_product_new);

            $attributes_mapping = $this->mapAttributes($attributes_old, $attributes_new);

            foreach ($attributes_mapping as $id_attribute_old => $id_attribute_new) {
                if (isset($combination_values[$id_attribute_old])) {
                    /** @var DynamicCombinationValue[] $attribute_values */
                    $attribute_values = $combination_values[$id_attribute_old];
                    foreach ($attribute_values as $combination_value) {
                        $combination_value->id_product = $id_product_new;
                        $combination_value->id_attribute = $id_attribute_new;
                        $combination_value->id_field = $this->module->provider->getNewID(
                            $fields_new,
                            $combination_value->id_field
                        );
                        $combination_value->add();
                    }
                }
            }

            $combination_fields = DynamicCombinationField::getByIdProduct($id_product_old);
            foreach ($combination_fields as $combination_field) {
                $combination_field->id_product = $id_product_new;
                $combination_field->id_field = $this->module->provider->getNewID(
                    $fields_new,
                    $combination_field->id_field
                );
                $combination_field->add();
            }

            Db::getInstance()->delete('dynamicproduct_visibility', 'id_product = ' . (int) $id_product_new);
            $hidden_fields = $this->module->provider->getVisibilityValues($id_product_old);
            foreach ($attributes_mapping as $id_attribute_old => $id_attribute_new) {
                if (isset($hidden_fields[$id_attribute_old])) {
                    $values = $hidden_fields[$id_attribute_old];
                    foreach ($values as $id_field => $visible) {
                        if (isset($fields_new[$id_field]) || (int) $id_field === 0) {
                            Db::getInstance()->insert(
                                $this->module->name . '_visibility',
                                array(
                                    'id_product'   => (int) $id_product_new,
                                    'id_attribute' => (int) $id_attribute_new,
                                    'id_field'     => (int) $this->module->provider->getNewID($fields_new, $id_field),
                                    'visible'      => (int) $visible
                                )
                            );
                        }
                    }
                }
            }
        }

        DynamicProportion::deleteByProduct($id_product_new);
        $proportions = DynamicProportion::getByProduct($id_product_old);
        foreach ($proportions as $proportion) {
            $proportion->id_product = $id_product_new;
            $proportion->id_field = $this->module->provider->getNewID($fields_new, $proportion->id_field);
            $proportion->id_field_src = $this->module->provider->getNewID($fields_new, $proportion->id_field_src);
            $proportion->add();
        }

        DynamicCondition::deleteByProduct($id_product_new);
        $conditions = DynamicCondition::getByProduct($id_product_old);
        foreach ($conditions as $condition) {
            $hidden_group = $condition->getHiddenGroups();
            $hidden_steps = $condition->getHiddenSteps();
            $hidden_fields = $condition->getHiddenFields();
            list($hidden_options, $options_map) = $condition->getHiddenOptions();

            $condition->id_product = $id_product_new;
            $condition->add();
            $id_condition_new = (int) $condition->id;

            foreach ($hidden_group as $id_group_old) {
                $id_group_new = $this->module->provider->getNewID($field_groups_new, $id_group_old);
                $data = array(
                    'id_condition' => (int) $id_condition_new,
                    'id_group'     => (int) $id_group_new,
                    'visible'      => 0
                );
                Db::getInstance()->insert(
                    $this->module->name . '_condition_group_visibility',
                    $data,
                    false,
                    true,
                    Db::REPLACE
                );
            }

            foreach ($hidden_steps as $id_step_old) {
                $id_step_new = $this->module->provider->getNewID($product_steps_new, $id_step_old);
                $data = array(
                    'id_condition' => (int) $id_condition_new,
                    'id_step'      => (int) $id_step_new,
                    'visible'      => 0
                );
                Db::getInstance()->insert(
                    $this->module->name . '_condition_step_visibility',
                    $data,
                    false,
                    true,
                    Db::REPLACE
                );
            }

            foreach ($hidden_fields as $id_field_old) {
                $id_field_new = $this->module->provider->getNewID($fields_new, $id_field_old);
                $data = array(
                    'id_condition' => (int) $id_condition_new,
                    'id_field'     => (int) $id_field_new,
                    'visible'      => 0
                );
                Db::getInstance()->insert(
                    $this->module->name . '_condition_visibility',
                    $data,
                    false,
                    true,
                    Db::REPLACE
                );
            }

            foreach ($hidden_options as $id_option_old) {
                $id_field_old = $options_map[$id_option_old];
                $id_field_new = $this->module->provider->getNewID($fields_new, $id_field_old);
                $id_option_new = $this->module->provider->getNewOption($options_new, $id_field_old, $id_option_old);
                $data = array(
                    'id_condition' => (int) $id_condition_new,
                    'id_field'     => (int) $id_field_new,
                    'id_option'    => (int) $id_option_new,
                    'visible'      => 0
                );
                Db::getInstance()->insert(
                    $this->module->name . '_condition_option_visibility',
                    $data,
                    false,
                    true,
                    Db::REPLACE
                );
            }
        }

        FieldFormula::deleteByProduct($id_product_new);
        $field_formulas = FieldFormula::getByProduct($id_product_old);
        foreach ($field_formulas as $field_formula) {
            $field_formula->id_product = $id_product_new;
            $field_formula->add();
        }

        Interval::deleteByProduct($id_product_new);
        $new_interval_fields = array();
        $intervals = Interval::getByIdProduct($id_product_old);
        foreach ($intervals as $interval) {
            $id_interval = $interval->id;
            $interval->id_product = $id_product_new;
            $interval->add();

            $interval_fields = IntervalField::getByInterval($id_interval);
            foreach ($interval_fields as $interval_field) {
                $id_interval_field = $interval_field->id;
                $interval_field->id_interval = $interval->id;
                $id_field_new = $this->module->provider->getNewID($fields_new, $interval_field->id_field);
                $interval_field->id_field = $id_field_new;
                $interval_field->add();
                $new_interval_fields[$id_interval_field] = $interval_field->id;
            }

            $condition_groups = IntervalConditionGroup::getByInterval($id_interval);
            foreach ($condition_groups as $condition_group) {
                $id_condition_group = $condition_group->id;
                $condition_group->id_interval = $interval->id;
                $condition_group->add();

                $interval_conditions = IntervalCondition::getByIntervalConditionGroup($id_condition_group);
                foreach ($interval_conditions as $interval_condition) {
                    $id_interval_condition = $interval_condition->id;
                    $interval_condition->id_interval_condition_group = $condition_group->id;
                    $id_field_new = $this->module->provider->getNewID($fields_new, $interval_condition->id_field);
                    $interval_condition->id_field = $id_field_new;
                    $interval_condition->add();

                    $condition_range = IntervalConditionRange::getByIntervalCondition($id_interval_condition);
                    if (Validate::isLoadedObject($condition_range)) {
                        $condition_range->id_interval_condition = $interval_condition->id;
                        $condition_range->add();
                    }

                    $condition_values = IntervalConditionValue::getByIntervalCondition($id_interval_condition);
                    foreach ($condition_values as $condition_value) {
                        $condition_value->id_interval_condition = $interval_condition->id;
                        $condition_value->add();
                    }
                }

                $interval_formulas = IntervalFormula::getByConditionGroup($id_condition_group);
                foreach ($interval_formulas as $interval_formula) {
                    $interval_formula->id_interval_condition_group = $condition_group->id;
                    $interval_formula->id_interval_field = $new_interval_fields[$interval_formula->id_interval_field];
                    $interval_formula->add();
                }
            }
        }

        Grid::deleteByProduct($id_product_new);

        $grids = Grid::getByIdProduct($id_product_old);
        foreach ($grids as $grid) {
            $grid->id_product = $id_product_new;
            $grid->id_field_column = $this->module->provider->getNewID(
                $fields_new,
                $grid->id_field_column
            );
            $grid->id_field_row = $this->module->provider->getNewID(
                $fields_new,
                $grid->id_field_row
            );
            $grid->id_field_target = $this->module->provider->getNewID(
                $fields_new,
                $grid->id_field_target
            );
            $grid->add();
            $id_grid_new = $grid->id;

            $columns = array();
            foreach ($grid->columns as $column) {
                $id_column = $column->id;
                $column->id_grid = $id_grid_new;
                $column->add();
                $columns[$id_column] = $column->id;
            }

            $rows = array();
            foreach ($grid->rows as $row) {
                $id_row = $row->id;
                $row->id_grid = $id_grid_new;
                $row->add();
                $rows[$id_row] = $row->id;
            }

            foreach ($grid->values as $value) {
                $value->id_grid = $id_grid_new;
                $value->id_grid_column = isset($columns[$value->id_grid_column]) ? $columns[$value->id_grid_column] : 0;
                $value->id_grid_row = isset($rows[$value->id_grid_row]) ? $rows[$value->id_grid_row] : 0;
                $value->add();
            }
        }

        ExecOrder::deleteByProduct($id_product_new);
        $exec_orders = ExecOrder::getByIdProduct($id_product_old);
        foreach ($exec_orders as $exec_order) {
            $exec_order->id_product = $id_product_new;
            $exec_order->add();
        }

        $product_config = DynamicConfig::getByProduct($id_product_new);
        $product_config->delete();
        $product_config = DynamicConfig::getByProduct($id_product_old);
        $product_config->id_product = (int) $id_product_new;
        $product_config->save();

        self::addCustomField($id_product_new);
    }

    public function clearConfig($id_product)
    {
        $product_fields = DynamicField::getFieldsByIdProduct($id_product);
        foreach ($product_fields as $product_field) {
            if ((int) $product_field->id_product === (int) $id_product) {
                $unit_value = $product_field->getUnitValues();
                $unit_value->delete();
                $product_field->delete();
            }
            $common_field = DynamicCommonField::getByFieldAndProduct($product_field->id, $id_product);
            $common_field->delete();
        }

        DynamicProductFieldGroup::deleteByProduct($id_product);

        DynamicCombinationValue::deleteByProduct($id_product);
        Db::getInstance()->delete('dynamicproduct_visibility', 'id_product = ' . (int) $id_product);

        DynamicEquation::deleteByProduct($id_product);

        DynamicProportion::deleteByProduct($id_product);

        DynamicCondition::deleteByProduct($id_product);

        FieldFormula::deleteByProduct($id_product);

        Interval::deleteByProduct($id_product);

        Grid::deleteByProduct($id_product);

        ExecOrder::deleteByProduct($id_product);

        $product_config = DynamicConfig::getByProduct($id_product);
        $product_config->delete();
    }

    public function exportConfig($id_product)
    {
        $data = array();

        $languages = Language::getLanguages(false);
        $lang_data = array();
        foreach ($languages as $language) {
            $lang_data[(int) $language['id_lang']] = $language['iso_code'];
        }
        $data['lang_data'] = $lang_data;

        $data['id_lang_default'] = (int) Configuration::get('PS_LANG_DEFAULT');

        $product_fields = DynamicField::getFieldsByIdProduct($id_product);
        foreach ($product_fields as $product_field) {
            $field_values = $product_field->getObjectValues();
            $image_path = $product_field->getImage();
            $thumb_path = $product_field->getThumb();
            if ($image_path) {
                $field_values['image_data'] = DynamicTools::encodeFile($image_path);
            }
            if ($thumb_path) {
                $field_values['thumb_data'] = DynamicTools::encodeFile($thumb_path);
            }

            if (count($product_field->options)) {
                foreach ($product_field->options as $option) {
                    $image_path = $option->getImage();
                    $thumb_path = $option->getThumb();
                    if ($image_path) {
                        $field_values['options'][$option->id]['image_data'] = DynamicTools::encodeFile($image_path);
                    }
                    if ($thumb_path) {
                        $field_values['options'][$option->id]['thumb_data'] = DynamicTools::encodeFile($thumb_path);
                    }
                }
            }

            $data['fields'][$product_field->id] = $field_values;
        }

        $product_equations = DynamicEquation::getEquationsByIdProduct($id_product);
        foreach ($product_equations as $product_equation) {
            $data['equations'][$product_equation->id] = $product_equation->getObjectValues();
        }

        $combination_values = DynamicCombinationValue::getValuesByIdProduct($id_product);

        $data['combination_values'] = array();

        $attributes_old = Product::getProductAttributesIds($id_product);
        $attributes_new = $this->createDummyAttributes(count($attributes_old));
        $attributes_mapping = $this->mapAttributes($attributes_old, $attributes_new);

        foreach ($combination_values as $combination_value) {
            $combination_value->id_attribute = $attributes_mapping[$combination_value->id_attribute];
            $data['combination_values'][$combination_value->id] = $combination_value->getObjectValues();
        }

        $combination_fields = DynamicCombinationField::getByIdProduct($id_product);
        foreach ($combination_fields as $combination_field) {
            $data['combination_fields'][$combination_field->id] = $combination_field->getObjectValues();
        }

        $fields_visibility_values = $this->module->provider->getVisibilityValues($id_product);
        $mapped_visibility_values = array();

        foreach ($fields_visibility_values as $id_attribute => $visibility_values) {
            $mapped_id = $attributes_mapping[$id_attribute];
            $mapped_visibility_values[$mapped_id] = $visibility_values;
        }
        $data['fields_visibility_values'] = $mapped_visibility_values;

        $product_config = DynamicConfig::getByProduct($id_product);
        $data['config'] = DynamicObject::getValues($product_config);

        $proportions = DynamicProportion::getByIdProduct($id_product);
        foreach ($proportions as $proportion) {
            $data['proportions'][$proportion->id] = $proportion->getObjectValues();
        }

        $conditions = DynamicCondition::getByIdProduct($id_product);
        foreach ($conditions as $condition) {
            $data['conditions'][$condition->id] = $condition->getObjectValues();
        }

        $field_formulas = FieldFormula::getByIdProduct($id_product);
        foreach ($field_formulas as $field_formula) {
            $data['field_formulas'][$field_formula->id] = $field_formula->getObjectValues();
        }

        $intervals = Interval::getByIdProduct($id_product);
        foreach ($intervals as $interval) {
            $data['intervals'][$interval->id] = $interval->getObjectValues();
        }

        $grids = Grid::getByIdProduct($id_product);
        foreach ($grids as $grid) {
            $data['grids'][$grid->id] = $grid->getObjectValues();
        }

        $field_groups = DynamicProductFieldGroup::getByIdProduct($id_product);
        foreach ($field_groups as $field_group) {
            $data['field_groups'][$field_group->id] = $field_group->getObjectValues();
        }

        $product_steps = DynamicProductStep::getByIdProduct($id_product);
        foreach ($product_steps as $product_step) {
            $data['product_steps'][$product_step->id] = $product_step->getObjectValues();
        }

        $exec_orders = ExecOrder::getByIdProduct($id_product);
        foreach ($exec_orders as $exec_order) {
            $data['exec_orders'][$exec_order->id] = $exec_order->getObjectValues();
        }

        return $data;
    }

    public function importConfig($id_product_new, $data)
    {
        DynamicProductConfigLink::removeLink($id_product_new);

        $lang_codes = array();
        $lang_data = $data['lang_data'] ?? null;
        if ($lang_data) {
            $languages = Language::getLanguages(false);
            foreach ($languages as $language) {
                $lang_codes[$language['iso_code']] = (int) $language['id_lang'];
            }
        }

        $first_lang_id = is_array($lang_data) && count(array_keys($lang_data)) ? array_keys($lang_data)[0] : 0;
        $id_lang_lang = isset($data['id_lang_default']) ? (int) $data['id_lang_default'] : $first_lang_id;

        $product_fields = DynamicField::getFieldsByIdProduct($id_product_new);
        foreach ($product_fields as $product_field) {
            if (!(int) $product_field->common ||
                ((int) $product_field->common && (int) $product_field->id_product === $id_product_new)) {
                $unit_value = $product_field->getUnitValues();
                $unit_value->delete();
                $product_field->delete();
            }
            $common_field = DynamicCommonField::getByFieldAndProduct($product_field->id, $id_product_new);
            $common_field->delete();
        }

        $field_groups_new = array();
        $product_steps_new = array();
        $fields_new = array();
        $option_fields = array();
        $options_new = array();

        DynamicProductStep::deleteByProduct($id_product_new);
        if (isset($data['product_steps'])) {
            $product_step = $this->getObjectsFromData($data['product_steps'], DynamicProductStep::class);
            foreach ($product_step as $product_step) {
                $id_product_step = $product_step->id;
                $product_step->id_product = $id_product_new;
                $product_step->add();
                $product_steps_new[$id_product_step] = $product_step->id;
            }
        }

        DynamicProductFieldGroup::deleteByProduct($id_product_new);
        if (isset($data['field_groups'])) {
            /** @var DynamicProductFieldGroup[] $field_groups */
            $field_groups = $this->getObjectsFromData($data['field_groups'], DynamicProductFieldGroup::class);
            foreach ($field_groups as $field_group) {
                $id_step_new = (int) $this->module->provider->getNewID(
                    $product_steps_new,
                    $field_group->id_step
                );
                $id_product_field_group = $field_group->id;
                $field_group->id_product = $id_product_new;
                $field_group->id_step = $id_step_new;
                $field_group->add();
                $field_groups_new[$id_product_field_group] = $field_group->id;
            }
        }

        $option_types = array(
            _DP_DROPDOWN_   => DynamicDropdownOption::class,
            _DP_THUMBNAILS_ => DynamicThumbnailsOption::class,
            _DP_RADIO_      => DynamicRadioOption::class,
        );

        if (isset($data['fields'])) {
            /** @var DynamicField[] $product_fields */
            $product_fields = $this->getObjectsFromData($data['fields'], DynamicField::class);
            foreach ($product_fields as $field) {
                $id_group_new = (int) $this->module->provider->getNewID(
                    $field_groups_new,
                    $field->id_group
                );
                $id_step_new = (int) $this->module->provider->getNewID(
                    $product_steps_new,
                    $field->id_step
                );
                $field->id_product = (int) $id_product_new;
                $field->favorite = false;
                $field->id_group = $id_group_new;
                $field->id_step = $id_step_new;
                $id_field_old = $field->id;
                $this->remapLangIds($field, $lang_data, $lang_codes, $id_lang_lang);
                $field->add();

                $field_data = $data['fields'][$id_field_old];

                $unit_value = DynamicUnitValue::copyFromArray($field_data['settings'], null, false);
                $unit_value->id_field = $field->id;
                $unit_value->add();

                $image_data = $field_data['image_data'] ?? null;
                if ($image_data) {
                    $content = DynamicTools::decodeData($image_data);
                    $image_path = $field->getPathForCreation('id');
                    file_put_contents($image_path, $content);
                }

                $thumb_data = $field_data['thumb_data'] ?? null;
                if ($thumb_data) {
                    $content = DynamicTools::decodeData($thumb_data);
                    $thumb_path = $field->getThumbPathForCreation('id');
                    file_put_contents($thumb_path, $content);
                }

                $id_field_new = (int) $field->id;

                $field_options_new = array();
                $options_class = isset($option_types[$field->type]) ? $option_types[$field->type] : null;
                if ($options_class) {
                    /** @var DynamicDropdownOption[] $options */
                    $options_data = $data['fields'][$id_field_old]['options'];
                    $options = $this->getObjectsFromData($options_data, $options_class);
                    $field_options_new = array();
                    foreach ($options as $option) {
                        $id_option = $option->id;
                        $option_fields[$id_option] = $id_field_old;
                        $option->id_field = $id_field_new;
                        $this->remapLangIds($option, $lang_data, $lang_codes, $id_lang_lang);
                        $option->add();

                        $option_data = $options_data[$id_option];
                        $image_data = $option_data['image_data'] ?? null;
                        if ($image_data) {
                            $content = DynamicTools::decodeData($image_data);
                            $image_path = $option->getPathForCreation('id');
                            file_put_contents($image_path, $content);
                        }

                        $thumb_data = $option_data['thumb_data'] ?? null;
                        if ($thumb_data) {
                            $content = DynamicTools::decodeData($thumb_data);
                            $thumb_path = $option->getThumbPathForCreation('id');
                            file_put_contents($thumb_path, $content);
                        }

                        $field_options_new[$id_option] = $option->id;
                    }
                }
                $options_new[$id_field_old] = $field_options_new;
                $fields_new[$id_field_old] = $id_field_new;
            }
        }

        DynamicEquation::deleteByProduct($id_product_new);
        if (isset($data['equations'])) {
            $equations = $this->getObjectsFromData($data['equations'], DynamicEquation::class);
            foreach ($equations as $equation) {
                $equation->id_product = $id_product_new;
                $equation->add();
            }
        }

        $attributes_new = Product::getProductAttributesIds($id_product_new);
        $attributes_old = $this->createDummyAttributes(count($attributes_new));
        $attributes_mapping = $this->mapAttributes($attributes_old, $attributes_new);

        DynamicCombinationValue::deleteByProduct($id_product_new);
        if (isset($data['combination_values'])) {
            /** @var DynamicCombinationValue[] $combination_values */
            $combination_values = $this->getObjectsFromData(
                $data['combination_values'],
                DynamicCombinationValue::class
            );
            foreach ($combination_values as $combination_value) {
                if (isset($attributes_mapping[$combination_value->id_attribute])) {
                    $combination_value->id_product = $id_product_new;
                    $combination_value->id_attribute = $attributes_mapping[$combination_value->id_attribute];
                    $combination_value->id_field = $this->module->provider->getNewID(
                        $fields_new,
                        $combination_value->id_field
                    );
                    $combination_value->add();
                }
            }
        }

        if (isset($data['combination_fields'])) {
            DynamicCombinationField::deleteByProduct($id_product_new);
            /** @var DynamicCombinationField[] $combination_fields */
            $combination_fields = $this->getObjectsFromData(
                $data['combination_fields'],
                DynamicCombinationField::class
            );
            foreach ($combination_fields as $combination_field) {
                $combination_field->id_product = $id_product_new;
                $combination_field->id_field = $this->module->provider->getNewID(
                    $fields_new,
                    $combination_field->id_field
                );
                $combination_field->add();
            }
        }

        if (isset($data['hidden_fields'])) {
            Db::getInstance()->delete('dynamicproduct_visibility', 'id_product = ' . (int) $id_product_new);
            $hidden_fields = $data['hidden_fields'];
            foreach ($attributes_mapping as $id_attribute_old => $id_attribute_new) {
                if (isset($hidden_fields[$id_attribute_old])) {
                    $values = $hidden_fields[$id_attribute_old];
                    foreach ($values as $id_field => $visible) {
                        if (isset($fields_new[$id_field]) || (int) $id_field === 0) {
                            Db::getInstance()->insert(
                                $this->module->name . '_visibility',
                                array(
                                    'id_product'   => (int) $id_product_new,
                                    'id_attribute' => (int) $id_attribute_new,
                                    'id_field'     => (int) $this->module->provider->getNewID($fields_new, $id_field),
                                    'visible'      => (int) $visible
                                )
                            );
                        }
                    }
                }
            }
        }

        DynamicProportion::deleteByProduct($id_product_new);
        if (isset($data['proportions'])) {
            $proportions = $this->getObjectsFromData($data['proportions'], DynamicProportion::class);
            foreach ($proportions as $proportion) {
                $proportion->id_product = $id_product_new;
                $proportion->id_field = $this->module->provider->getNewID($fields_new, $proportion->id_field);
                $proportion->id_field_src = $this->module->provider->getNewID($fields_new, $proportion->id_field_src);
                $proportion->add();
            }
        }

        DynamicCondition::deleteByProduct($id_product_new);
        if (isset($data['conditions'])) {
            /** @var DynamicCondition[] $conditions */
            $conditions = $this->getObjectsFromData($data['conditions'], DynamicCondition::class);
            foreach ($conditions as $condition) {
                $hidden_groups = $data['conditions'][$condition->id]['hidden_groups'];
                $hidden_steps = $data['conditions'][$condition->id]['hidden_steps'];
                $hidden_fields = $data['conditions'][$condition->id]['hidden_fields'];
                $hidden_options = $data['conditions'][$condition->id]['hidden_options'];

                $condition->id_product = $id_product_new;
                $condition->add();
                $id_condition_new = (int) $condition->id;

                foreach ($hidden_groups as $id_group_old) {
                    $id_group_new = $this->module->provider->getNewID($field_groups_new, $id_group_old);
                    $visibility_data = array(
                        'id_condition' => (int) $id_condition_new,
                        'id_group'     => (int) $id_group_new,
                        'visible'      => 0
                    );
                    Db::getInstance()->insert(
                        $this->module->name . '_condition_group_visibility',
                        $visibility_data,
                        false,
                        true,
                        Db::REPLACE
                    );
                }

                foreach ($hidden_steps as $id_step_old) {
                    $id_step_new = $this->module->provider->getNewID($product_steps_new, $id_step_old);
                    $visibility_data = array(
                        'id_condition' => (int) $id_condition_new,
                        'id_step'      => (int) $id_step_new,
                        'visible'      => 0
                    );
                    Db::getInstance()->insert(
                        $this->module->name . '_condition_step_visibility',
                        $visibility_data,
                        false,
                        true,
                        Db::REPLACE
                    );
                }

                foreach ($hidden_fields as $id_field_old) {
                    $id_field_new = $this->module->provider->getNewID($fields_new, $id_field_old);
                    $visibility_data = array(
                        'id_condition' => (int) $id_condition_new,
                        'id_field'     => (int) $id_field_new,
                        'visible'      => 0
                    );
                    Db::getInstance()->insert(
                        $this->module->name . '_condition_visibility',
                        $visibility_data,
                        false,
                        true,
                        Db::REPLACE
                    );
                }

                foreach ($hidden_options as $id_option_old) {
                    $id_field_old = (int) $option_fields[$id_option_old];
                    $id_field_new = $this->module->provider->getNewID($fields_new, $id_field_old);
                    $id_option_new = $this->module->provider->getNewOption(
                        $options_new,
                        $id_field_old,
                        $id_option_old
                    );
                    $visibility_data = array(
                        'id_condition' => (int) $id_condition_new,
                        'id_field'     => (int) $id_field_new,
                        'id_option'    => (int) $id_option_new,
                        'visible'      => 0
                    );
                    Db::getInstance()->insert(
                        $this->module->name . '_condition_option_visibility',
                        $visibility_data,
                        false,
                        true,
                        Db::REPLACE
                    );
                }
            }
        }

        FieldFormula::deleteByProduct($id_product_new);
        if (isset($data['field_formulas'])) {
            $field_formulas = $this->getObjectsFromData($data['field_formulas'], FieldFormula::class);
            foreach ($field_formulas as $field_formula) {
                $field_formula->id_product = $id_product_new;
                $field_formula->add();
            }
        }

        Interval::deleteByProduct($id_product_new);
        if (isset($data['intervals'])) {
            $new_interval_fields = array();
            $intervals = $this->getObjectsFromData($data['intervals'], Interval::class);
            foreach ($intervals as $interval) {
                $id_interval = $interval->id;
                $interval->id_product = $id_product_new;
                $interval->add();

                $interval_fields = $this->getObjectsFromData(
                    $data['intervals'][$id_interval]['intervalFields'],
                    IntervalField::class
                );
                foreach ($interval_fields as $interval_field) {
                    $id_interval_field = $interval_field->id;
                    $interval_field->id_interval = $interval->id;
                    $id_field_new = $this->module->provider->getNewID($fields_new, $interval_field->id_field);
                    $interval_field->id_field = $id_field_new;
                    $interval_field->add();
                    $new_interval_fields[$id_interval_field] = $interval_field->id;
                }

                $condition_groups = $this->getObjectsFromData(
                    $data['intervals'][$id_interval]['intervalConditionGroups'],
                    IntervalConditionGroup::class
                );
                foreach ($condition_groups as $condition_group) {
                    $id_condition_group = $condition_group->id;
                    $condition_group->id_interval = $interval->id;
                    $condition_group->add();

                    $conditionGroupData =
                        $data['intervals'][$id_interval]['intervalConditionGroups'][$id_condition_group];
                    $interval_conditions = $this->getObjectsFromData(
                        $conditionGroupData['intervalConditions'],
                        IntervalCondition::class
                    );
                    foreach ($interval_conditions as $interval_condition) {
                        $id_interval_condition = $interval_condition->id;
                        $interval_condition->id_interval_condition_group = $condition_group->id;
                        $id_field_new = $this->module->provider->getNewID($fields_new, $interval_condition->id_field);
                        $interval_condition->id_field = $id_field_new;
                        $interval_condition->add();

                        if ($interval_condition->type === "range") {
                            $condition_range = IntervalConditionRange::copyFromArray(
                                $conditionGroupData['intervalConditions'][$id_interval_condition]['condition_range']
                            );
                            $condition_range->id_interval_condition = $interval_condition->id;
                            $condition_range->add();
                        }

                        if ($interval_condition->type === "values") {
                            $condition_values = $this->getObjectsFromData(
                                $conditionGroupData['intervalConditions'][$id_interval_condition]['condition_value'],
                                IntervalConditionValue::class
                            );
                            foreach ($condition_values as $condition_value) {
                                $condition_value->id_interval_condition = $interval_condition->id;
                                $condition_value->add();
                            }
                        }
                    }

                    $interval_formulas = $this->getObjectsFromData(
                        $conditionGroupData['intervalFormulas'],
                        IntervalFormula::class
                    );
                    foreach ($interval_formulas as $interval_formula) {
                        $interval_formula->id_interval_condition_group = $condition_group->id;
                        $interval_formula->id_interval_field =
                            $new_interval_fields[$interval_formula->id_interval_field];
                        $interval_formula->add();
                    }
                }
            }
        }

        Grid::deleteByProduct($id_product_new);
        if (isset($data['grids'])) {
            $grids = $this->getObjectsFromData($data['grids'], Grid::class);
            foreach ($grids as $grid) {
                $id_grid_old = $grid->id;
                $grid->id_product = $id_product_new;
                $grid->id_field_column = $this->module->provider->getNewID(
                    $fields_new,
                    $grid->id_field_column
                );
                $grid->id_field_row = $this->module->provider->getNewID(
                    $fields_new,
                    $grid->id_field_row
                );
                $grid->id_field_target = $this->module->provider->getNewID(
                    $fields_new,
                    $grid->id_field_target
                );
                $grid->add();
                $id_grid_new = $grid->id;

                $columns = array();
                $grid->columns = $this->getObjectsFromData($data['grids'][$id_grid_old]['columns'], GridColumn::class);
                foreach ($grid->columns as $column) {
                    $id_column = $column->id;
                    $column->id_grid = $id_grid_new;
                    $column->add();
                    $columns[$id_column] = $column->id;
                }

                $rows = array();
                $grid->rows = $this->getObjectsFromData($data['grids'][$id_grid_old]['rows'], GridRow::class);
                foreach ($grid->rows as $row) {
                    $id_row = $row->id;
                    $row->id_grid = $id_grid_new;
                    $row->add();
                    $rows[$id_row] = $row->id;
                }

                $grid->values = $this->getObjectsFromData($data['grids'][$id_grid_old]['values'], GridValue::class);
                foreach ($grid->values as $value) {
                    $value->id_grid = $id_grid_new;
                    $value->id_grid_column = isset($columns[$value->id_grid_column]) ?
                        $columns[$value->id_grid_column] :
                        0;
                    $value->id_grid_row = isset($rows[$value->id_grid_row]) ? $rows[$value->id_grid_row] : 0;
                    $value->add();
                }
            }
        }

        ExecOrder::deleteByProduct($id_product_new);
        if (isset($data['exec_orders'])) {
            $exec_orders = $this->getObjectsFromData($data['exec_orders'], ExecOrder::class);
            foreach ($exec_orders as $exec_order) {
                $exec_order->id_product = $id_product_new;
                $exec_order->add();
            }
        }

        $product_config = DynamicConfig::getByProduct($id_product_new);
        $product_config->delete();
        if (isset($data['config'])) {
            $product_config = DynamicConfig::copyFromArray($data['config']);
            $product_config->id_product = (int) $id_product_new;
            $product_config->save();
        }
    }

    public function addCustomField($id_product, $no_add = false)
    {
        DynamicTools::checkAddress();

        $field_table = $this->module->name . '_customization_field';
        $sql = new DbQuery();
        $sql->from($field_table);
        $sql->where('id_product = ' . (int) $id_product);
        $row = Db::getInstance()->getRow($sql);

        if ($row && $this->customFieldNotReservedByModule((int) $row['id_customization_field'])) {
            $id_customization_field = (int) $row['id_customization_field'];
            //check if customization really exists
            $sql = new DbQuery();
            $sql->from('customization_field');
            $sql->where('id_product = ' . (int) $id_product);
            $sql->where('id_customization_field = ' . (int) $id_customization_field);
            $customization_field = Db::getInstance()->getRow($sql);
            if (!$customization_field) {
                Db::getInstance()->delete($field_table, 'id_product = ' . (int) $id_product);
                return $this->addCustomField($id_product);
            }

            $product_config = DynamicConfig::getByProduct($id_product);
            if ((int) $customization_field['required'] !== (int) $product_config->required) {
                $active = $product_config->active;
                $required = $product_config->required;
                $data = array(
                    'required'  => $required && $active,
                    'is_module' => 1,
                );
                Db::getInstance()->update(
                    'customization_field',
                    $data,
                    'id_customization_field = ' . (int) $id_customization_field
                );
                if ($no_add) {
                    return (int) $id_customization_field;
                }
            } else {
                $data = array(
                    'is_module' => 1
                );
                Db::getInstance()->update(
                    'customization_field',
                    $data,
                    'id_customization_field = ' . (int) $id_customization_field
                );
            }
            $product = new Product($id_product);
            $sql = new DbQuery();
            $sql->from('customization_field');
            $sql->where('id_product = ' . (int) $id_product);
            $sql->where('type = ' . (int) Product::CUSTOMIZE_TEXTFIELD);
            $customization_fields = Db::getInstance()->executeS($sql);
            $count = count($customization_fields);

            $customizable = $this->module->provider->hasRequiredField($id_product) ? 2 : 1;
            if ((int) $product->customizable !== $customizable || (int) $product->text_fields !== $count) {
                Db::getInstance()->update(
                    'product',
                    array(
                        'text_fields'  => (int) $count,
                        'customizable' => $customizable
                    ),
                    'id_product = ' . (int) $id_product
                );
                Db::getInstance()->update(
                    'product_shop',
                    array(
                        'text_fields'  => (int) $count,
                        'customizable' => $customizable
                    ),
                    'id_product = ' . (int) $id_product
                );
            }
            $this->reserveCustomField($id_customization_field);
            return $id_customization_field;
        }

        if ($no_add) {
            return null;
        }

        $product_config = DynamicConfig::getByProduct($id_product);

        if ($no_add === 'auto' && !$product_config->active) {
            return null;
        }

        Configuration::updateGlobalValue('PS_CUSTOMIZATION_FEATURE_ACTIVE', 1);

        //check if product has customization field before adding
        $sql = new DbQuery();
        $sql->from('customization_field');
        $sql->where('id_product = ' . (int) $id_product);
        $sql->where('type = ' . (int) Product::CUSTOMIZE_TEXTFIELD);
        $customization_fields = Db::getInstance()->executeS($sql);
        if (count($customization_fields)) {
            $customization_field = $customization_fields[0];
            $id_customization_field = (int) $customization_field['id_customization_field'];
            if ($this->customFieldNotReservedByModule($id_customization_field)) {
                $data = array(
                    'required'  => (int) $product_config->required,
                    'is_module' => 1
                );

                Db::getInstance()->update(
                    'customization_field',
                    $data,
                    'id_customization_field = ' . (int) $id_customization_field
                );
            }
        } else {
            $data = array(
                'id_product' => (int) $id_product,
                'type'       => (int) Product::CUSTOMIZE_TEXTFIELD,
                'required'   => (int) $product_config->required,
                'is_module'  => 1
            );

            Db::getInstance()->insert('customization_field', $data);
            $id_customization_field = (int) Db::getInstance()->Insert_ID();

            $languages = Language::getLanguages();
            foreach ($languages as $lang) {
                $iso = $lang['iso_code'];
                $id_lang = $lang['id_lang'];
                $label = DynamicTools::translate('Customization', $iso, 'display-extra');
                $data = array(
                    'id_customization_field' => (int) $id_customization_field,
                    'id_lang'                => (int) $id_lang,
                    'name'                   => pSQL($label),
                );
                Db::getInstance()->insert('customization_field_lang', $data);
            }
        }
        $data = array(
            'id_product'             => (int) $id_product,
            'id_customization_field' => (int) $id_customization_field
        );

        Db::getInstance()->insert($field_table, $data);
        $id_customization_field = (int) Db::getInstance()->Insert_ID();

        $product = new Product($id_product);

        $sql = new DbQuery();
        $sql->from('customization_field');
        $sql->where('id_product = ' . (int) $id_product);
        $sql->where('type = ' . (int) Product::CUSTOMIZE_TEXTFIELD);
        $customization_fields = Db::getInstance()->executeS($sql);
        $count = count($customization_fields);

        $customizable = $this->module->provider->hasRequiredField($id_product) ? 2 : 1;
        if ((int) $product->customizable !== $customizable || (int) $product->text_fields !== $count) {
            Db::getInstance()->update(
                'product',
                array(
                    'text_fields'  => (int) $count,
                    'customizable' => $customizable
                ),
                'id_product = ' . (int) $id_product
            );
            Db::getInstance()->update(
                'product_shop',
                array(
                    'text_fields'  => (int) $count,
                    'customizable' => $customizable
                ),
                'id_product = ' . (int) $id_product
            );
        }
        $this->reserveCustomField($id_customization_field);
        return $id_customization_field;
    }

    public function setCustomFieldRequired($id_product, $required = 1)
    {
        $id_customization_field = $this->addCustomField($id_product);
        Db::getInstance()->update(
            'customization_field',
            array('required' => (int) $required),
            'id_customization_field = ' . (int) $id_customization_field
        );

        $customizable = $this->module->provider->hasRequiredField($id_product) ? 2 : 1;
        Db::getInstance()->update(
            'product',
            array(
                'customizable' => $customizable
            ),
            'id_product = ' . (int) $id_product
        );
        Db::getInstance()->update(
            'product_shop',
            array(
                'customizable' => $customizable
            ),
            'id_product = ' . (int) $id_product
        );
    }

    public function customFieldNotReservedByModule($id_customization_field)
    {
        $key = "TN_CUSTOM_FIELD_$id_customization_field";
        $id_module = (int) Configuration::get($key);
        return !$id_module || $id_module === (int) $this->module->id;
    }

    public function reserveCustomField($id_customization_field)
    {
        $key = "TN_CUSTOM_FIELD_$id_customization_field";
        Configuration::updateValue($key, $this->module->id);
    }

    public function makeProductCustomizable($id_product)
    {
        $customizable = (int) $this->module->provider->hasRequiredField($id_product) ? 2 : 1;

        Db::getInstance()->update(
            'product',
            array('customizable' => $customizable),
            'id_product = ' . (int) $id_product
        );

        Db::getInstance()->update(
            'product_shop',
            array('customizable' => $customizable),
            'id_product = ' . (int) $id_product
        );
    }


    public function duplicateInputs($id_cart_old, $id_cart_new)
    {
        $has_errors = false;
        if (!(int) $id_cart_new) {
            return false;
        }
        if (!(int) $id_cart_old) {
            return false;
        }
        $dynamic_inputs = DynamicInput::getInputsByIdCart($id_cart_old);
        foreach ($dynamic_inputs as $dynamic_input) {
            $id_input = $dynamic_input->id;
            list($id_input_new, $input_has_errors) = $dynamic_input->duplicateInput($id_cart_new);
            $has_errors |= $input_has_errors;
            if ($id_input_new) {
                $new_value = '|' . $id_input_new . '|';
                $old_value = '|' . $id_input . '|';

                $sql = '
                SELECT c.id_customization FROM `' . _DB_PREFIX_ . 'customization` c
                JOIN    `' . _DB_PREFIX_ . 'customized_data` cd ON cd.id_customization = c.id_customization
                WHERE   (cd.value = "' . pSQL($old_value) . '" OR cd.value = ' . (int) $id_input . ') 
                        AND c.id_cart = ' . (int) $id_cart_new . ';';
                $id_customization_new = (int) Db::getInstance()->getValue($sql);

                $dynamic_input->id_customization = $id_customization_new;
                $dynamic_input->save();

                $sql = '
                UPDATE  `' . _DB_PREFIX_ . 'customized_data` cd
                JOIN    `' . _DB_PREFIX_ . 'customization` c ON cd.id_customization = c.id_customization
                SET     cd.value = "' . pSQL($new_value) . '"
                WHERE   cd.value = "' . pSQL($old_value) . '" AND c.id_cart = ' . (int) $id_cart_new . ';';
                Db::getInstance()->execute($sql);

                // replace id_input directly
                $sql = '
                UPDATE  `' . _DB_PREFIX_ . 'customized_data` cd
                JOIN    `' . _DB_PREFIX_ . 'customization` c ON cd.id_customization = c.id_customization
                SET     cd.value = ' . (int) $id_input_new . '
                WHERE   cd.value = ' . (int) $id_input . ' AND c.id_cart = ' . (int) $id_cart_new . ';';
                Db::getInstance()->execute($sql);
            }

            if ($input_has_errors) {
                $sql = '
                SELECT id_customization FROM `' . _DB_PREFIX_ . 'customized_data`
                 WHERE   value = "' . pSQL($new_value) . '"';
                $id_customization = (int) Db::getInstance()->getValue($sql);
                $this->context->cart->deleteProduct(
                    $dynamic_input->id_product,
                    $dynamic_input->id_attribute,
                    $id_customization,
                    Context::getContext()->cart->id_address_delivery
                );
            }
        }
        return $has_errors;
    }

    public function addCart()
    {
        if ((int) $this->context->cookie->id_cart) {
            $id_cart = (int) $this->context->cookie->id_cart;
            if (!Validate::isLoadedObject($this->context->cart)) {
                $prev_cart = new Cart($id_cart);
                if (Validate::isLoadedObject($prev_cart)) {
                    $this->context->cart = $prev_cart;
                    return $id_cart;
                }
            } else {
                return $id_cart;
            }
        }

        if (!Validate::isLoadedObject($this->context->cart)) {
            $this->context->cart = new Cart();
            $this->context->cart->id_currency = $this->module->provider->getCurrency();
        }

        if (class_exists('Guest')) {
            $guest = new Guest($this->module->provider->getGuest());
            $this->context->cart->mobile_theme = $guest->mobile_theme;
        }

        $id_customer = $this->module->provider->getCustomer();
        if ($id_customer) {
            $id_address = Address::getFirstCustomerAddressId($id_customer);
            $this->context->cart->id_address_delivery = $id_address;
            $this->context->cart->id_address_invoice = $id_address;
        }

        if (!(int) $this->context->cart->id_shop) {
            $this->context->cart->id_shop = $this->context->shop->id;
        }
        if (!(int) $this->context->cart->id_currency) {
            $this->context->cart->id_currency = $this->module->provider->getCurrency();
        }

        $this->context->cart->add();
        if ($this->context->cart->id) {
            $this->context->cookie->id_cart = (int) $this->context->cart->id;
            $this->context->cookie->write();
            $this->context->cart->id = (int) $this->context->cart->id;
        }

        return (int) $this->context->cart->id;
    }

    /**
     * @return DynamicInput[]
     */
    public function getOOSInputs()
    {
        if ($this->context->cart === null) {
            return array();
        }
        $oos_inputs = array();
        $dynamic_inputs = DynamicInput::getInputsByIdCart($this->context->cart->id);
        foreach ($dynamic_inputs as $dynamic_input) {
            $inputs_quantity = DynamicInput::getInputsDynamicQuantity(
                $dynamic_input->id_product,
                $dynamic_input->id_attribute
            );
            $oos_check = DynamicEquation::checkProductStock($dynamic_input, $inputs_quantity);
            if (!$oos_check) {
                $oos_inputs[] = $dynamic_input;
            }
        }
        return $oos_inputs;
    }

    public function getDisabledOptions()
    {
        if ($this->context->cart === null) {
            return array();
        }
        $errors = array();

        $types = array(
            8  => DynamicDropdownOption::class,
            12 => DynamicThumbnailsOption::class,
            16 => DynamicRadioOption::class,
        );

        $sql = "
        SELECT ov.id_option, i.id_input, dpif.type
            FROM `" . _DB_PREFIX_ . "dynamicproduct_condition` c
             JOIN `" . _DB_PREFIX_ . "dynamicproduct_condition_option_visibility` ov 
             ON c.`id_condition` = ov.`id_condition`
             JOIN `" . _DB_PREFIX_ . "dynamicproduct_input` i ON c.`id_product` = i.`id_product`
             JOIN `" . _DB_PREFIX_ . "customization` cus ON i.`id_customization` = cus.`id_customization`
             JOIN `" . _DB_PREFIX_ . "cart_product` cp ON cp.`id_customization` = cus.`id_customization`
             JOIN `" . _DB_PREFIX_ . "dynamicproduct_input_field` dpif
                  ON dpif.`id_input` = i.`id_input` AND dpif.options LIKE CONCAT('%\"', ov.id_option, '\"%')
             WHERE c.`formula` = 1
                AND i.id_cart = " . (int) $this->context->cart->id . "
                AND cus.in_cart = 1";

        $rows = Db::getInstance()->executeS($sql);
        if (is_array($rows)) {
            foreach ($rows as $row) {
                $id_option = $row['id_option'];
                $id_input = $row['id_input'];
                $type = $row['type'];

                $dynamic_input = new DynamicInput($id_input);

                $product = new Product($dynamic_input->id_product, false, $this->context->language->id);

                $class_name = $types[$type];
                /** @var DynamicDropdownOption $option */
                $option = new $class_name($id_option, $this->context->language->id);
                if (Validate::isLoadedObject($option)) {
                    $errors[] = array(
                        'option'    => $option->label,
                        'product'   => $product->name,
                        'edit_link' => $dynamic_input->getEditLink(),
                    );
                }
            }
        }

        return $errors;
    }

    private function mapAttributes($attributes_old, $attributes_new)
    {
        $mapping = array();
        if (count($attributes_old) !== count($attributes_new)) {
            return array();
        }
        foreach ($attributes_old as $index => $attribute) {
            $mapping[(int) $attribute['id_product_attribute']] = (int) $attributes_new[$index]['id_product_attribute'];
        }
        return $mapping;
    }

    private function createDummyAttributes($count)
    {
        $attributes = array();
        $ids = range(1, $count);
        foreach ($ids as $id) {
            $attributes[] = array(
                'id_product_attribute' => $id,
            );
        }
        return $attributes;
    }

    /**
     * @param $items
     * @param DynamicObject $class
     * @return $class
     */
    private function getObjectsFromData($items, $class)
    {
        $objects = array();
        if (!is_array($items)) {
            return array();
        }
        foreach ($items as $item) {
            $obj = $class::copyFromArray($item, null, false);
            $objects[] = $obj;
        }
        return $objects;
    }

    /**
     * @param DynamicField $field
     * @param $id_product_new
     * @return int
     */
    public function copyField($id_field, $id_product_new, $id_product_old = 0, $id_group_new = 0, $id_step_new = 0)
    {
        $options_new = array();
        $field = new DynamicField($id_field);

        if (!$id_product_old) {
            $id_product_old = (int) $field->id_product;
        }

        if ($field->common && (int) $field->id_product !== (int) $id_product_new) {
            $common_field = DynamicCommonField::getByFieldAndProduct($field->id, $id_product_old);
            $common_field->id_product = (int) $id_product_new;
            $common_field->id_group = $id_group_new;
            $common_field->id_step = $id_step_new;
            $common_field->position = $field->position;
            $common_field->add();
            return $field->id;
        }

        $same_product = $id_product_new === $field->id_product;

        if ($same_product) {
            Db::getInstance()->update(
                DynamicField::$definition['table'],
                array('position' => array('type' => 'sql', 'value' => '`position` + 1')),
                "position > " . (int) $field->position
            );
            ++$field->position;
            $field->name = $field->name . '_copy';
        }

        $field->id_product = (int) $id_product_new;
        $field->favorite = false;
        $field->id_group = $id_group_new;
        $field->id_step = $id_step_new;
        $id_field_old = (int) $field->id;
        $field->add();

        $field->copyImagesFrom($id_field_old);
        $id_field_new = (int) $field->id;

        if (!$field->common) {
            $unit_value = DynamicUnitValue::getUnitValuesByIdField($id_field_old);
            $unit_value->id_field = $id_field_new;
            $unit_value->add();
        }

        if ((int) $field->type === _DP_DROPDOWN_) {
            $dropdown_options = DynamicDropdownOption::getDropdownOptionsByIdField($id_field_old);
            foreach ($dropdown_options as $dropdown_option) {
                $id_dropdown_option = (int) $dropdown_option->id;
                $dropdown_option->id_field = $id_field_new;
                $dropdown_option->add();
                $options_new[$id_dropdown_option] = (int) $dropdown_option->id;
                $dropdown_option->copyImagesFrom($id_dropdown_option);
            }
        }

        if ((int) $field->type === _DP_RADIO_) {
            $radio_options = DynamicRadioOption::getRadioOptionsByIdField($id_field_old);
            foreach ($radio_options as $radio_option) {
                $id_radio_option = (int) $radio_option->id;
                $radio_option->id_field = $id_field_new;
                $radio_option->add();
                $options_new[$id_radio_option] = (int) $radio_option->id;
                $radio_option->copyImagesFrom($id_radio_option);
            }
        }

        if ((int) $field->type === _DP_THUMBNAILS_) {
            $thumbnails_options = DynamicThumbnailsOption::getThumbnailsOptionsByIdField($id_field_old);
            foreach ($thumbnails_options as $thumbnails_option) {
                $id_thumbnails_option = $thumbnails_option->id;
                $thumbnails_option->id_field = $id_field_new;
                $thumbnails_option->add();
                $options_new[$id_thumbnails_option] = (int) $thumbnails_option->id;
                $thumbnails_option->copyImagesFrom($id_thumbnails_option);
            }
        }

        return array(
            'id_field' => $id_field_new,
            'options'  => $options_new,
        );
    }

    private function remapLangIds(DynamicObject $object, $lang_data, array $lang_codes, $import_default_lang)
    {
        if (!$lang_data) {
            return;
        }
        $lang_fields = DynamicObject::getLangFields($object);
        foreach ($lang_fields as $lang_field) {
            $values = $object->$lang_field;
            $new_value = array();
            foreach ($values as $id_lang => $value) {
                if (isset($lang_data[$id_lang])) {
                    $iso_code = $lang_data[$id_lang];
                    if (isset($lang_codes[$iso_code])) {
                        $new_id_lang = $lang_codes[$iso_code];
                        $new_value[$new_id_lang] = $value;
                    }
                }
            }
            $id_lang_default = (int) Configuration::get('PS_LANG_DEFAULT');
            if (empty($new_value[$id_lang_default])) {
                $current_lang_value = $object->$lang_field;
                $new_value[$id_lang_default] = isset($current_lang_value[$import_default_lang]) ?
                    $current_lang_value[$import_default_lang] :
                    null;
            }
            $object->$lang_field = $new_value;
        }
    }
}
