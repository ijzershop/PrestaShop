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

namespace classes\models;

use classes\DynamicTools;
use classes\factory\DynamicFieldFactory;
use classes\factory\InputFieldFactory;
use classes\helpers\DynamicCalculatorHelper;
use classes\helpers\DynamicFieldsHelper;
use classes\helpers\FieldsVisibilityHelper;
use classes\models\intervals\IntervalCondition;
use Db;
use DbQuery;
use Validate;

class DynamicInputField extends DynamicObject
{
    /** @var DynamicField */
    protected $field;

    public $id_input;
    public $id_field;

    public $name;
    public $label;
    public $value;
    public $secondary_value = 0;
    public $options;
    public $type;
    public $visible;

    public $value_formatted;
    public $selected_options;

    public $image_url;
    public $thumb_url;
    public $image_size;

    private $excluded = false;
    private $excluded_options = array();

    private $locked_value = false;

    protected $skipped_names = array('quantity');

    private static $null_values = array(
        _DP_INPUT_       => 0,
        _DP_TEXT_        => '',
        _DP_DATE_        => '',
        _DP_IMAGE_       => '',
        _DP_DROPDOWN_    => 0,
        _DP_CHECKBOX_    => 0,
        _DP_SWITCH_      => 0,
        _DP_FILE_        => '',
        _DP_SLIDER_      => 0,
        _DP_THUMBNAILS_  => 0,
        _DP_TEXTAREA_    => '',
        _DP_RADIO_       => 0,
        _DP_COLORPICKER_ => ''
    );

    protected $webserviceParameters = [
        'objectNodeName'  => 'dynamic_input_field',
        'objectsNodeName' => 'dynamic_input_fields',
        'fields'          => [
            'id_input'        => ['required' => true, 'xlink_resource' => 'dynamic_inputs'],
            'id_field'        => [],
            'name'            => [],
            'value'           => ['getter' => 'displayValue'],
            'secondary_value' => [],
            'type'            => [],
            'visible'         => [],
        ],
    ];

    public static $definition = array(
        'table'   => 'dynamicproduct_input_field',
        'primary' => 'id_input_field',
        'fields'  => array(
            'id_input'        => array('type' => self::TYPE_INT),
            'id_field'        => array('type' => self::TYPE_INT),
            'name'            => array('type' => self::TYPE_STRING),
            'value'           => array('type' => self::TYPE_HTML),
            'secondary_value' => array('type' => self::TYPE_STRING),
            'options'         => array('type' => self::TYPE_STRING),
            'type'            => array('type' => self::TYPE_INT),
            'visible'         => array('type' => self::TYPE_BOOL),
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        $this->module = DynamicTools::getModule();
        if (!$id_lang) {
            $id_lang = $this->module->provider->getLangID($this->context);
        }
        parent::__construct($id, $id_lang, $id_shop);
        $this->setData($id_lang);
    }

    public function setData($id_lang)
    {
        $this->setDynamicField($id_lang);
        $this->setFormattedValue();
        $this->setLabel();
        $this->setSelectedOptions();
    }

    /**
     * @param $id_input
     * @param $id_lang
     * @return DynamicInputField[]
     */
    public static function getByIdInput($id_input, $id_lang = null)
    {
        $input_fields = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('id_input = ' . (int) $id_input);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_input_field = $row['id_input_field'];
            $dynamic_input_field = InputFieldFactory::create((int) $row['type'], (int) $id_input_field, $id_lang);
            if (Validate::isLoadedObject($dynamic_input_field)) {
                $input_fields[$dynamic_input_field->name] = $dynamic_input_field;
            }
        }
        return $input_fields;
    }

    protected function setDynamicField($id_lang)
    {
        $this->field = DynamicFieldFactory::create($this->type, $this->id_field, $id_lang);
    }

    public function getDynamicField()
    {
        return $this->field;
    }

    public function setValue($value)
    {
        if (!$this->locked_value) {
            $this->value = $value;
            $this->setFormattedValue();
        }
    }

    public function setSecondaryValue($secondary_value)
    {
        if (!$this->locked_value) {
            $this->secondary_value = $secondary_value;
        }
    }

    public function setFormattedValue()
    {
        $this->value_formatted = $this->value;
        if ($this->type === _DP_PRICE_) {
            $this->value_formatted = $this->module->provider->convertAndFormatPrice((float) $this->value);
        }
    }

    public function getValueForCalculation()
    {
        if ($this->isExcluded()) {
            return $this->getNullValue();
        }
        if ($this->hasExcludedOptions()) {
            return (float) $this->value - $this->getExcludedOptionsValue();
        }

        $reset = false;
        $value = $this->value;

        $str_values = array();

        if (is_array($this->selected_options) && count($this->selected_options)) {
            $has_strings = false;

            foreach ($this->selected_options as $selected_option) {
                if (isset($this->field->options[$selected_option])) {
                    $option_value = $this->field->options[$selected_option]->value;
                    if (!is_numeric($option_value) && !empty($option_value)) {
                        $has_strings = true;
                        break;
                    }
                }
            }

            foreach ($this->selected_options as $selected_option) {
                if (isset($this->field->options[$selected_option])) {
                    if (!$reset) {
                        // only reset value if we have options, if not, use the value directly
                        $value = 0;
                        $reset = true;
                    }
                    // if we encounter a string, return it immediately
                    $option_value = $this->field->options[$selected_option]->value;
                    if ($has_strings) {
                        $str_values[] = $option_value;
                    } else {
                        $value += (float) $option_value;
                    }
                }
            }
        }
        if (count($str_values)) {
            if (count($str_values) === 1 && !$this->getDynamicField()->settings->multiselect) {
                return $str_values[0];
            }
            return implode(';', $str_values) . ';';
        }
        return $value;
    }

    public function getSecondaryValueForCalculation()
    {
        if ($this->isExcluded()) {
            return $this->getNullValue();
        }
        if ($this->hasExcludedOptions()) {
            return $this->secondary_value - $this->getExcludedOptionsValue();
        }
        $reset = false;
        $value = $this->secondary_value;

        if (is_array($this->selected_options) && count($this->selected_options)) {
            foreach ($this->selected_options as $selected_option) {
                if (isset($this->field->options[$selected_option])) {
                    if (!$reset) {
                        // only reset value if we have options, if not, use the secondary value directly
                        $value = 0;
                        $reset = true;
                    }
                    // if we encounter a string, return it immediately
                    $option_secondary_value = $this->field->options[$selected_option]->secondary_value;
                    if (!is_numeric($option_secondary_value) && !empty($option_secondary_value)) {
                        return $option_secondary_value;
                    }
                    $value += (float) $option_secondary_value;
                }
            }
        }
        return $value;
    }

    /**
     * @param DynamicInputField[] $input_fields
     * @return mixed
     */
    public function getDynamicValue($input_fields)
    {
        $value = $this->displayValue();

        foreach ($input_fields as $input_field) {
            $value = str_replace(
                "[{$input_field->name}]",
                htmlspecialchars($input_field->value_formatted),
                $value
            );
        }

        return $value;
    }

    /**
     * @param IntervalCondition $interval_condition
     */
    public function isWithinLimit($interval_condition)
    {
        return $this->value >= $interval_condition->min &&
            ($this->value < $interval_condition->max || (float) $interval_condition->max === (float) 0);
    }

    /**
     * @param IntervalCondition $interval_condition
     */
    public function isWithinValues($interval_condition)
    {
        return in_array((float) $this->value, $interval_condition->values, true);
    }

    private function setLabel()
    {
        if ($this->name === 'quantity') {
            $this->label = 'Quantity';
        }
        $field = $this->getDynamicField();
        if (Validate::isLoadedObject($field)) {
            $this->label = $field->label;
        }
    }

    public function getNullValue()
    {
        if (isset(self::$null_values[$this->type])) {
            return self::$null_values[$this->type];
        }

        return $this->value;
    }

    public function setExcluded()
    {
        $this->excluded = true;
    }

    public function isExcluded()
    {
        return $this->excluded;
    }

    public function setExcludedOptions($visibility)
    {
        $excluded_options = array();
        foreach ($visibility as $id_option => $visible) {
            if ((int) $visible === 0) {
                $excluded_options[] = $id_option;
            }
        }
        $this->excluded_options = $excluded_options;
    }

    public function hasExcludedOptions()
    {
        return count($this->excluded_options) > 0;
    }

    public function isSelectedOptionExcluded()
    {
        if (!isset($this->selected_options[0])) {
            return false;
        }
        return in_array($this->selected_options[0], $this->excluded_options, false);
    }

    public function getExcludedOptionsValue()
    {
        $total_value = 0;
        foreach ($this->excluded_options as $id_option) {
            if (isset($this->field->options[$id_option]) && in_array($id_option, $this->selected_options, false)) {
                $total_value += (float) $this->field->options[$id_option]->value;
            }
        }
        return $total_value;
    }

    public function selectFirstVisibleOption()
    {
        if ($this->hasExcludedOptions()) {
            foreach ($this->field->options as $option) {
                $id_option = $option->id;
                if (!in_array($id_option, $this->excluded_options)) {
                    $this->setSelectOption($option);
                    return true;
                }
            }
        }
        return true;
    }

    private function setSelectedOptions()
    {
        if (is_string($this->options)) {
            $this->selected_options = json_decode($this->options, true);
        }

        if (is_array($this->options)) {
            $this->selected_options = $this->options;
        }
    }

    /**
     * @param DynamicDropdownOption $option
     */
    private function setSelectOption($option)
    {
        if (!$this->locked_value) {
            $id_option = (int) $option->id;
            $this->selected_options = array($id_option);
            $this->options = json_encode(array($id_option));
            $this->setValue($option->value);
        }
    }

    protected function getFirstOption()
    {
        return isset($this->selected_options[0]) ? (int) $this->selected_options[0] : 0;
    }

    public static function getDefaultInputFields($id_product, $id_attribute, $load_all = false, $values = array())
    {
        return self::getInputFieldsFromData($id_product, $id_attribute, array(), $load_all, $values);
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $fields
     * @param bool $load_all
     * @param array $values
     * @return array[DynamicInputField[], array]
     */
    public static function getInputFieldsFromData(
        $id_product,
        $id_attribute,
        $fields,
        $load_all = false,
        $values = array()
    ) {
        $module = DynamicTools::getModule();
        $context = DynamicTools::getContext();

        $fields_helper = new DynamicFieldsHelper($module, $context);
        $fields_helper->addFields($id_product, $id_attribute, $fields, $load_all, $values);
        $fields_helper->addAttributes($id_product, $id_attribute, $fields);
        $fields_helper->addFeatures($id_product, $fields);
        $fields_helper->addExtraFields($id_product, $id_attribute, $fields);

        $has_changed_field = isset($fields['changed']) && !empty($fields['changed']['value']);

        $input_fields = array();
        foreach ($fields as $field) {
            if (isset($field['name']) && !empty($field['name'])) {
                $input_fields[$field['name']] =
                    self::getInputFieldFromData($field, $context->language->id, $has_changed_field);
            }
        }

        $calculator_helper = new DynamicCalculatorHelper($module, $context);
        $calculator_helper->applyProportions($id_product, $input_fields);

        DynamicEquation::hookAllocator($id_product, $id_attribute, $input_fields);

        $exec_order = ExecOrder::getByIdProduct($id_product, true);
        if (count($exec_order)) {
            list($fields_visibility) = DynamicEquation::processExecOrder(
                $id_product,
                $id_attribute,
                $exec_order,
                $input_fields
            );
        } else {
            $visibility_helper = new FieldsVisibilityHelper($module, $context);
            $fields_visibility = $visibility_helper->getFieldsVisibility(
                $id_product,
                $id_attribute,
                $input_fields
            );

            $visibility_helper->setExcludedFields($input_fields, $fields_visibility);

            DynamicEquation::execIntervalConditions($id_product, $input_fields);
            DynamicEquation::execFieldFormulas($id_product, $input_fields);
            DynamicEquation::execGrids($id_product, $input_fields);
        }

        return [$input_fields, $fields_visibility];
    }

    /**
     * @param $field
     * @param $id_lang
     * @param bool $has_changed_field
     * @return DynamicInputField
     */
    public static function getInputFieldFromData($field, $id_lang, $has_changed_field = false)
    {
        $input_field = InputFieldFactory::create($field['type']);

        foreach (self::$definition['fields'] as $field_name => $field_info) {
            if (isset($field[$field_name])) {
                if (!in_array($field_info['type'], array(self::TYPE_STRING, self::TYPE_HTML))) {
                    $value = self::formatValue($field[$field_name], $field_info['type']);
                } else {
                    $value = $field[$field_name];
                }
                $input_field->{$field_name} = $value;
            }
        }

        $input_field->setData($id_lang);

        // Disallow setting the html value from javascript
        if ((int) $field['type'] === _DP_HTML_) {
            $input_field->value = "";
            $input_field->value_formatted = "";
        }

        if (isset($field['selected_options'])) {
            $input_field->selected_options = $field['selected_options'];
            $input_field->options = json_encode($input_field->selected_options, true);
            $input_field->value = $input_field->getValueForCalculation();
            $input_field->secondary_value = $input_field->getSecondaryValueForCalculation();
        }

        if (!$has_changed_field && $input_field->type === _DP_INPUT_ && !(float) $input_field->value) {
            $dynamic_calculator_helper = new DynamicCalculatorHelper(
                DynamicTools::getModule(),
                DynamicTools::getContext()
            );
            $input_field->value = $dynamic_calculator_helper->getValueFromProportion($input_field->id_field);
        }
        return $input_field;
    }

    public function isSkipped()
    {
        return !$this->visible || in_array($this->name, $this->skipped_names, true);
    }

    public function isSkippedName()
    {
        return strpos($this->field->name, "_") === 0;
    }

    public function isAdminField()
    {
        return strpos($this->field->name, "admin_") === 0;
    }

    public function lockValue()
    {
        $this->locked_value = true;
    }

    public function unlockValue()
    {
        $this->locked_value = false;
    }

    public function displayValue()
    {
        return $this->value;
    }

    private function getTemplateName()
    {
        if (isset($this->module->field_types[$this->type])) {
            return $this->module->field_types[$this->type]['name'];
        }
        return null;
    }

    /** @noinspection PhpUnused */
    public function getTemplatePath()
    {
        $template = sprintf('views/templates/hook/partial/%s.tpl', $this->getTemplateName());
        $path = $this->module->getDir() . $template;
        if (!is_file($path)) {
            return false;
        }
        return sprintf(
            'module:%s/%s',
            $this->module->name,
            $template
        );
    }

    public function getImagesUrls()
    {
        return array();
    }
}
