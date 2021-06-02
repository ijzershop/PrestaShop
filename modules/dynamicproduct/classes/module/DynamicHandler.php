<?php
/**
 * 2010-2020 Tuni-Soft
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
 * @copyright 2010-2020 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\module;

use Address;
use Cart;
use classes\DynamicTools;
use classes\models\DynamicCombinationValue;
use classes\models\DynamicCommonField;
use classes\models\DynamicCondition;
use classes\models\DynamicConfig;
use classes\models\DynamicDropdownOption;
use classes\models\DynamicEquation;
use classes\models\DynamicField;
use classes\models\DynamicInput;
use classes\models\DynamicProportion;
use classes\models\DynamicRadioOption;
use classes\models\DynamicThumbnailsOption;
use classes\models\DynamicUnitValue;
use classes\models\FieldFormula;
use classes\models\grids\Grid;
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
            if (!(int)$product_field->common) {
                $unit_value = $product_field->getUnitValues();
                $unit_value->delete();
                $product_field->delete();
            }
            $common_field = DynamicCommonField::getByFieldAndProduct($product_field->id, $id_product_new);
            $common_field->delete();
        }

        $product_equations = DynamicEquation::getEquationsByIdProduct($id_product_new);
        foreach ($product_equations as $product_equation) {
            $product_equation->delete();
        }
        $product_config = new DynamicConfig($id_product_new);
        $product_config->delete();

        $product_fields = DynamicField::getFieldsByIdProduct($id_product_old);
        $product_equations = DynamicEquation::getEquationsByIdProduct($id_product_old);
        $product_config = new DynamicConfig($id_product_old);
        $fields_new = array();
        $options_new = array();

        foreach ($product_fields as &$field) {
            $new_field = $this->copyField($field->id, $id_product_new);
            $options_new[$field->id] = $new_field['options'];
            $id_new_field = $new_field['id_field'];
            if ($id_new_field !== (int)$field->id) {
                $fields_new[(int)$field->id] = $id_new_field;
            }
        }

        unset($field);

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
                        $combination_value->id_attribute = $id_attribute_new;
                        $combination_value->id_product = $id_product_new;
                        $combination_value->id_field = $this->module->provider->getOldField(
                            $fields_new,
                            $combination_value->id_field
                        );
                        $combination_value->add();
                    }
                }
            }

            Db::getInstance()->delete('dynamicproduct_visibility', 'id_product = ' . (int)$id_product_new);
            $fields_visibility_values = $this->module->provider->getVisibilityValues($id_product_old);
            foreach ($attributes_mapping as $id_attribute_old => $id_attribute_new) {
                if (isset($fields_visibility_values[$id_attribute_old])) {
                    $values = $fields_visibility_values[$id_attribute_old];
                    foreach ($values as $id_field => $visible) {
                        if (isset($fields_new[$id_field])) {
                            Db::getInstance()->insert(
                                $this->module->name . '_visibility',
                                array(
                                    'id_product'   => (int)$id_product_new,
                                    'id_attribute' => (int)$id_attribute_new,
                                    'id_field'     => (int)$this->module->provider->getOldField($fields_new, $id_field),
                                    'visible'      => (int)$visible
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
            $proportion->id_field = $this->module->provider->getOldField($fields_new, $proportion->id_field);
            $proportion->id_field_src = $this->module->provider->getOldField($fields_new, $proportion->id_field_src);
            $proportion->add();
        }

        DynamicCondition::deleteByProduct($id_product_new);
        $conditions = DynamicCondition::getByProduct($id_product_old);
        foreach ($conditions as $condition) {
            $fields_visibility_values = $condition->getFieldsVisibilityValues();
            $options_visibility_values = $condition->getOptionsVisibilityValues();

            $condition->id_product = $id_product_new;
            $condition->add();
            $id_condition_new = (int)$condition->id;

            foreach ($fields_visibility_values as $id_field_old => $visible) {
                $id_field_new = $this->module->provider->getOldField($fields_new, $id_field_old);
                /** @noinspection UnnecessaryCastingInspection */
                $data = array(
                    'id_condition' => (int)$id_condition_new,
                    'id_field'     => (int)$id_field_new,
                    'visible'      => (int)$visible
                );
                Db::getInstance()->insert(
                    $this->module->name . '_condition_visibility',
                    $data,
                    false,
                    true,
                    Db::REPLACE
                );
            }

            foreach ($options_visibility_values as $id_field_old => $options_visibility) {
                $id_field_new = $this->module->provider->getOldField($fields_new, $id_field_old);
                foreach ($options_visibility as $id_option_old => $visible) {
                    $id_option_new = $this->module->provider->getOldOption($options_new, $id_field_old, $id_option_old);
                    /** @noinspection UnnecessaryCastingInspection */
                    $data = array(
                        'id_condition' => (int)$id_condition_new,
                        'id_field'     => (int)$id_field_new,
                        'id_option'    => (int)$id_option_new,
                        'visible'      => (int)$visible
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
        }

        FieldFormula::deleteByProduct($id_product_new);
        $field_formulas = FieldFormula::getByProduct($id_product_old);
        foreach ($field_formulas as $field_formula) {
            $field_formula->id_product = $id_product_new;
            $field_formula->add();
        }

        /** @var Interval[] $old_intervals */
        $old_intervals = Interval::getByIdProduct($id_product_new);
        foreach ($old_intervals as $old_interval) {
            $old_interval->delete();
        }

        $new_interval_fields = array();
        /** @var Interval[] $intervals */
        $intervals = Interval::getByIdProduct($id_product_old);
        foreach ($intervals as $interval) {
            $id_interval = $interval->id;
            $interval->id_product = $id_product_new;
            $interval->add();

            $interval_fields = IntervalField::getByInterval($id_interval);
            foreach ($interval_fields as $interval_field) {
                $id_interval_field = $interval_field->id;
                $interval_field->id_interval = $interval->id;
                $id_field_new = $this->module->provider->getOldField($fields_new, $interval_field->id_field);
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
                    $id_field_new = $this->module->provider->getOldField($fields_new, $interval_condition->id_field);
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

        $existing_grids = Grid::getByIdProduct($id_product_new);
        foreach ($existing_grids as $grid) {
            $grid->delete();
        }

        /** @var Grid[] $grids */
        $grids = Grid::getByIdProduct($id_product_old);
        foreach ($grids as $grid) {
            $grid->id_product = $id_product_new;
            $grid->id_field_column = $this->module->provider->getOldField(
                $fields_new,
                $grid->id_field_column
            );
            $grid->id_field_row = $this->module->provider->getOldField(
                $fields_new,
                $grid->id_field_row
            );
            $grid->id_field_target = $this->module->provider->getOldField(
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

        $product_config->id_product = (int)$id_product_new;
        $product_config->save();
    }

    public function addCustomField($id_product, $no_add = false)
    {
        DynamicTools::checkAddress();

        $field_table = $this->module->name . '_customization_field';
        $sql = new DbQuery();
        $sql->from($field_table);
        $sql->where('id_product = ' . (int)$id_product);
        $row = Db::getInstance()->getRow($sql);

        if ($row && $this->customFieldNotReservedByModule((int)$row['id_customization_field'])) {
            $id_customization_field = (int)$row['id_customization_field'];
            //check if customization really exists
            $sql = new DbQuery();
            $sql->from('customization_field');
            $sql->where('id_product = ' . (int)$id_product);
            $sql->where('id_customization_field = ' . (int)$id_customization_field);
            $customization_field = Db::getInstance()->getRow($sql);
            if (!$customization_field) {
                Db::getInstance()->delete($field_table, 'id_product = ' . (int)$id_product);
                return $this->addCustomField($id_product);
            }

            $product_config = new DynamicConfig($id_product);
            if ((int)$customization_field['required'] !== (int)$product_config->required) {
                $active = $product_config->active;
                $required = $product_config->required;
                $data = array(
                    'required'  => $required && $active,
                    'is_module' => 1,
                );
                Db::getInstance()->update(
                    'customization_field',
                    $data,
                    'id_customization_field = ' . (int)$id_customization_field
                );
                if ($no_add) {
                    return (int)$id_customization_field;
                }
            } else {
                $data = array(
                    'is_module' => 1
                );
                Db::getInstance()->update(
                    'customization_field',
                    $data,
                    'id_customization_field = ' . (int)$id_customization_field
                );
            }
            $product = new Product($id_product);
            $sql = new DbQuery();
            $sql->from('customization_field');
            $sql->where('id_product = ' . (int)$id_product);
            /** @noinspection UnnecessaryCastingInspection */
            $sql->where('type = ' . (int)Product::CUSTOMIZE_TEXTFIELD);
            $customization_fields = Db::getInstance()->executeS($sql);
            $count = count($customization_fields);

            if (!$product->customizable || (int)$product->text_fields !== $count) {
                /** @noinspection UnnecessaryCastingInspection */
                Db::getInstance()->update(
                    'product',
                    array(
                        'text_fields'  => (int)$count,
                        'customizable' => 1
                    ),
                    'id_product = ' . (int)$id_product
                );
                /** @noinspection UnnecessaryCastingInspection */
                Db::getInstance()->update(
                    'product_shop',
                    array(
                        'text_fields'  => (int)$count,
                        'customizable' => 1
                    ),
                    'id_product = ' . (int)$id_product
                );
            }
            $this->reserveCustomField($id_customization_field);
            return $id_customization_field;
        }

        if ($no_add) {
            return null;
        }

        $product_config = new DynamicConfig($id_product);

        if ($no_add === 'auto' && !$product_config->active) {
            return null;
        }

        Configuration::updateGlobalValue('PS_CUSTOMIZATION_FEATURE_ACTIVE', 1);

        //check if product has customization field before adding
        $sql = new DbQuery();
        $sql->from('customization_field');
        $sql->where('id_product = ' . (int)$id_product);
        /** @noinspection UnnecessaryCastingInspection */
        $sql->where('type = ' . (int)Product::CUSTOMIZE_TEXTFIELD);
        $customization_fields = Db::getInstance()->executeS($sql);
        if (count($customization_fields)) {
            $customization_field = $customization_fields[0];
            $id_customization_field = (int)$customization_field['id_customization_field'];
            if ($this->customFieldNotReservedByModule($id_customization_field)) {
                $data = array(
                    'required'  => (int)$product_config->required,
                    'is_module' => 1
                );

                Db::getInstance()->update(
                    'customization_field',
                    $data,
                    'id_customization_field = ' . (int)$id_customization_field
                );
            }
        } else {
            /** @noinspection UnnecessaryCastingInspection */
            $data = array(
                'id_product' => (int)$id_product,
                'type'       => (int)Product::CUSTOMIZE_TEXTFIELD,
                'required'   => (int)$product_config->required,
                'is_module'  => 1
            );

            Db::getInstance()->insert('customization_field', $data);
            $id_customization_field = (int)Db::getInstance()->Insert_ID();

            $languages = Language::getLanguages();
            foreach ($languages as $lang) {
                $iso = $lang['iso_code'];
                $id_lang = $lang['id_lang'];
                $label = DynamicTools::translate('Customization', $iso, 'display-extra');
                $data = array(
                    'id_customization_field' => (int)$id_customization_field,
                    'id_lang'                => (int)$id_lang,
                    'name'                   => pSQL($label),
                );
                Db::getInstance()->insert('customization_field_lang', $data);
            }
        }
        $data = array(
            'id_product'             => (int)$id_product,
            'id_customization_field' => (int)$id_customization_field
        );

        Db::getInstance()->insert($field_table, $data);
        $id_customization_field = (int)Db::getInstance()->Insert_ID();

        $product = new Product($id_product);

        $sql = new DbQuery();
        $sql->from('customization_field');
        $sql->where('id_product = ' . (int)$id_product);
        /** @noinspection UnnecessaryCastingInspection */
        $sql->where('type = ' . (int)Product::CUSTOMIZE_TEXTFIELD);
        $customization_fields = Db::getInstance()->executeS($sql);
        $count = count($customization_fields);

        if (!$product->customizable || (int)$product->text_fields !== $count) {
            /** @noinspection UnnecessaryCastingInspection */
            Db::getInstance()->update(
                'product',
                array(
                    'text_fields'  => (int)$count,
                    'customizable' => 1
                ),
                'id_product = ' . (int)$id_product
            );
            /** @noinspection UnnecessaryCastingInspection */
            Db::getInstance()->update(
                'product_shop',
                array(
                    'text_fields'  => (int)$count,
                    'customizable' => 1
                ),
                'id_product = ' . (int)$id_product
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
            array('required' => (int)$required),
            'id_customization_field = ' . (int)$id_customization_field
        );
    }

    public function customFieldNotReservedByModule($id_customization_field)
    {
        $key = "TN_CUSTOM_FIELD_$id_customization_field";
        $id_module = (int)Configuration::get($key);
        return !$id_module || $id_module === (int)$this->module->id;
    }

    public function reserveCustomField($id_customization_field)
    {
        $key = "TN_CUSTOM_FIELD_$id_customization_field";
        Configuration::updateValue($key, $this->module->id);
    }

    public function duplicateInputs($id_cart_old, $id_cart_new)
    {
        if (!(int)$id_cart_new) {
            return false;
        }
        if (!(int)$id_cart_old) {
            return false;
        }
        $dynamic_inputs = DynamicInput::getInputsByIdCart($id_cart_old);

        foreach ($dynamic_inputs as $dynamic_input) {
            $id_custom_product_new = (int)$dynamic_input->duplicateInput($id_cart_new);
            if ($id_custom_product_new) {
                $new_value = '|' . $id_custom_product_new . '|';
                $old_value = '|' . (int)$dynamic_input->id . '|';
                $sql = '
                UPDATE  `' . _DB_PREFIX_ . 'customized_data` cd
                JOIN    `' . _DB_PREFIX_ . 'customization` c ON cd.id_customization = c.id_customization
                SET     cd.value = "' . pSQL($new_value) . '"
                WHERE   cd.value = "' . pSQL($old_value) . '" AND c.id_cart = ' . (int)$id_cart_new . ';';
                Db::getInstance()->execute($sql);
            }
        }
        return true;
    }

    public function addCart()
    {
        if ((int)$this->context->cookie->id_cart) {
            $id_cart = (int)$this->context->cookie->id_cart;
            if (!Validate::isLoadedObject($this->context->cart)) {
                $this->context->cart = new Cart($id_cart);
            }
            return $id_cart;
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

        $this->context->cart->add();
        if ($this->context->cart->id) {
            $this->context->cookie->id_cart = (int)$this->context->cart->id;
            $this->context->cookie->write();
            $this->context->cart->id = (int)$this->context->cart->id;
        }
        return (int)$this->context->cart->id;
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

    private function mapAttributes($attributes_old, $attributes_new)
    {
        $mapping = array();
        if (count($attributes_old) !== count($attributes_new)) {
            return false;
        }
        foreach ($attributes_old as $index => $attribute) {
            $mapping[(int)$attribute['id_product_attribute']] = (int)$attributes_new[$index]['id_product_attribute'];
        }
        return $mapping;
    }

    /**
     * @param DynamicField $field
     * @param $id_product_new
     * @return int
     */
    public function copyField($id_field, $id_product_new)
    {
        $options_new = array();
        $field = new DynamicField($id_field);
        if ($field->common) {
            $common_field = DynamicCommonField::getByFieldAndProduct($field->id, $field->id_product);
            $common_field->id_product = (int)$id_product_new;
            $common_field->save();
            return $field->id;
        }
        $field->id_product = (int)$id_product_new;
        $field->favorite = false;
        $id_field_old = (int)$field->id;
        $field->add();
        $field->copyImagesFrom($id_field_old);
        $id_field_new = (int)$field->id;

        if (!$field->common) {
            $unit_value = DynamicUnitValue::getUnitValuesByIdField($id_field_old);
            $unit_value->id_field = $id_field_new;
            $unit_value->add();
        }

        if ((int)$field->type === _DP_DROPDOWN_) {
            $dropdown_options = DynamicDropdownOption::getDropdownOptionsByIdField($id_field_old);
            foreach ($dropdown_options as &$dropdown_option) {
                $id_dropdown_option = (int)$dropdown_option->id;
                $dropdown_option->id_field = $id_field_new;
                $dropdown_option->add();
                $options_new[$id_dropdown_option] = (int)$dropdown_option->id;
                $dropdown_option->copyImagesFrom($id_dropdown_option);
            }
        }

        unset($dropdown_option);

        if ((int)$field->type === _DP_RADIO_) {
            $radio_options = DynamicRadioOption::getRadioOptionsByIdField($id_field_old);
            foreach ($radio_options as &$radio_option) {
                $id_radio_option = (int)$radio_option->id;
                $radio_option->id_field = $id_field_new;
                $radio_option->add();
                $options_new[$id_radio_option] = (int)$radio_option->id;
                $radio_option->copyImagesFrom($id_radio_option);
            }
        }

        unset($radio_option);

        if ((int)$field->type === _DP_THUMBNAILS_) {
            $thumbnails_options = DynamicThumbnailsOption::getThumbnailsOptionsByIdField($id_field_old);
            foreach ($thumbnails_options as &$thumbnails_option) {
                $id_thumbnails_option = $thumbnails_option->id;
                $thumbnails_option->id_field = $id_field_new;
                $thumbnails_option->add();
                $options_new[$id_thumbnails_option] = (int)$thumbnails_option->id;
                $thumbnails_option->copyImagesFrom($id_thumbnails_option);
            }
        }
        return array(
            'id_field' => (int)$id_field_new,
            'options'  => $options_new,
        );
    }
}
