<?php
/**
 * 2010-2019 Tuni-Soft
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
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\models;

use classes\DynamicTools;
use classes\factory\InputFieldFactory;
use classes\helpers\DynamicCalculatorHelper;
use classes\helpers\DynamicFieldsHelper;
use Db;
use DbQuery;
use Product;
use Validate;

class DynamicInputField extends DynamicObject
{
    /** @var DynamicField */
    private $field;

    public $id_input;
    public $id_product;
    public $id_field;

    public $name;
    public $label;
    public $value;
    public $options;
    public $type;
    public $visible;
    public $disabled;
    public $width;
    public $height;
    public $size;

    public $value_formatted;
    public $selected_options;

    private $excluded = false;

    protected $skipped_names = array('quantity');

    private static $null_values = array(
        _DP_INPUT_       => 0,
        _DP_TEXT_        => '',
        _DP_DATE_        => '',
        _DP_IMAGE_       => '',
        _DP_DROPDOWN_    => 0,
        _DP_CHECKBOX_    => 0,
        _DP_FILE_        => '',
        _DP_SLIDER_      => 0,
        _DP_THUMBNAILS_  => 0,
        _DP_TEXTAREA_    => '',
        _DP_RADIO_       => 0,
        _DP_COLORPICKER_ => ''
    );

    public static $definition = array(
        'table'   => 'dynamicproduct_input_field',
        'primary' => 'id_input_field',
        'fields'  => array(
            'id_input'   => array('type' => self::TYPE_INT),
            'id_product' => array('type' => self::TYPE_INT),
            'id_field'   => array('type' => self::TYPE_INT),
            'name'       => array('type' => self::TYPE_STRING),
            'value'      => array('type' => self::TYPE_STRING),
            'options'    => array('type' => self::TYPE_STRING),
            'type'       => array('type' => self::TYPE_INT),
            'visible'    => array('type' => self::TYPE_BOOL),
            'disabled'   => array('type' => self::TYPE_BOOL),
            'width'      => array('type' => self::TYPE_INT),
            'height'     => array('type' => self::TYPE_INT),
            'size'       => array('type' => self::TYPE_INT),
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        $this->module = DynamicTools::getModule();
        if (!$id_lang) {
            $id_lang = $this->module->provider->getLangID($this->context);
        }
        parent::__construct($id, $id_lang, $id_shop);
        $this->setDynamicField($id_lang);
        $this->setFormattedValue();
        $this->setLabel();
        $this->setSelectedOptions();
    }

    public static function getByIdInput($id_input, $id_lang)
    {
        $input_fields = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('id_input = ' . (int)$id_input);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_input_field = $row['id_input_field'];
            $dynamic_input_field = InputFieldFactory::create((int)$row['type'], (int)$id_input_field, $id_lang);
            if (Validate::isLoadedObject($dynamic_input_field)) {
                $input_fields[$dynamic_input_field->name] = $dynamic_input_field;
            }
        }
        return $input_fields;
    }

    private function setDynamicField()
    {
        $this->field = new DynamicField($this->id_field, $this->id_lang);
    }

    protected function getDynamicField()
    {
        return $this->field;
    }

    public function setValue($value)
    {
        $this->value = $value;
        $this->setFormattedValue();
    }

    public function setFormattedValue()
    {
        $this->value_formatted = $this->value;
        if ($this->type === _DP_PRICE_) {
            $this->value_formatted = Product::convertAndFormatPrice($this->value);
        }
    }

    public function getValueForCalculation()
    {
        if ($this->isExcluded()) {
            return $this->getNullValue();
        }
        return $this->value;
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

    public function setToNullValue()
    {
        if (isset(self::$null_values[$this->type])) {
            $this->setValue(self::$null_values[$this->type]);
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

    private function setSelectedOptions()
    {
        $this->selected_options = json_decode($this->options);
    }

    protected function getFirstOption()
    {
        return isset($this->selected_options[0]) ? (int)$this->selected_options[0] : 0;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $fields
     * @param $changed_field
     * @return DynamicInputField[]
     */
    public static function getInputFieldsFromData($id_product, $id_attribute, $fields, $changed_field = array())
    {
        $module = DynamicTools::getModule();
        $context = DynamicTools::getContext();

        $fields_helper = new DynamicFieldsHelper($module, $context);
        $fields_helper->addFields($id_product, $id_attribute, $fields);
        $fields_helper->addAttributes($id_product, $id_attribute, $fields);
        $fields_helper->addFeatures($id_product, $fields);

        $input_fields = array();
        foreach ($fields as $field) {
            $input_fields[$field['name']] = self::getInputFieldFromData($field);
        }

        $calculator_helper = new DynamicCalculatorHelper($module, $context);
        $calculator_helper->applyProportions($id_product, $input_fields, $changed_field);

        DynamicEquation::execFieldFormulas($id_product, $id_attribute, $input_fields);
        DynamicEquation::hookAllocator($id_product, $id_attribute, $input_fields, $changed_field);

        return $input_fields;
    }

    /**
     * @param $field
     * @return DynamicInputField
     */
    public static function getInputFieldFromData($field)
    {
        $input_field = InputFieldFactory::create($field['type']);
        foreach (self::$definition['fields'] as $field_name => $field_info) {
            if (isset($field[$field_name])) {
                if ($field_info['type'] !== self::TYPE_STRING) {
                    $value = self::formatValue($field[$field_name], $field_info['type']);
                } else {
                    $value = $field[$field_name];
                }
                $input_field->{$field_name} = $value;
            }
        }
        $input_field->setFormattedValue();
        return $input_field;
    }

    public function isSkipped()
    {
        return !$this->visible || in_array($this->name, $this->skipped_names, true);
    }

    public function displayValue()
    {
        return $this->value;
    }

    private function getTemplateName()
    {
        return $this->module->field_types[$this->type]['name'];
    }

    public function getTemplatePath()
    {
        return $this->module->getFolderPath('views/templates/hook/partial/') . $this->getTemplateName() . '.tpl';
    }
}
