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

/** @noinspection PhpUnusedPrivateMethodInspection */

use classes\DynamicTools;
use classes\helpers\TranslationHelper;
use classes\models\DynamicField;
use classes\models\DynamicUnitValue;

class DynamicProductFieldsSettingsController extends ModuleAdminController
{

    /** @var DynamicProduct */
    public $module;
    public $action;

    /** @var Context $context */
    public $context;
    public $id_field;
    public $id_product;
    public $id_default_lang;

    private static $types = array(
        1  => 'Input',
        4  => 'Text',
        5  => 'Date',
        6  => 'Image',
        8  => 'Dropdown',
        9  => 'Checkbox',
        10 => 'File',
        11 => 'Slider',
        12 => 'Thumbnails',
        13 => 'TextArea',
        14 => 'Feature',
        16 => 'Radio',
        17 => 'ColorPicker',
        18 => 'Html'
    );

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int)Tools::getValue('id_product');
        $this->id_field = (int)Tools::getValue('id_field');
        $this->id_default_lang = (int)Configuration::get('PS_LANG_DEFAULT');
    }

    public function postProcess()
    {
        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if ((int)$this->context->employee->id_profile !== 1 && in_array($this->id_product, $restricted, false)) {
            exit(Tools::jsonEncode(array(
                'error' => $this->module->l('This product is for viewing only!')
            )));
        }

        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }

        exit();
    }

    private function processGetDialogContent()
    {
        $dynamic_field = new DynamicField($this->id_field);
        $type = (int)$dynamic_field->type;
        if (isset(self::$types[$type])) {
            $type_name = self::$types[$type];
            $method = 'hookDisplay' . $type_name . 'Settings';
            exit($this->module->{$method}($this->id_field));
        }
    }

    private function processSaveInputSettings()
    {
        $options = Tools::getValue('options');

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = $this->id_field;
        $unit_value->min = (float)$options['min'];
        $unit_value->max = (float)$options['max'];
        $unit_value->step = (float)$options['step'];
        $unit_value->save();

        $field_options = Tools::getValue('field_options');
        $descriptions = $field_options['description'];

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($descriptions);

        $field = new DynamicField($this->id_field);
        $field->description = $descriptions;
        $field->save();

        $this->respond();
    }

    private function processSaveSliderSettings()
    {
        $options = Tools::getValue('options');

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = $this->id_field;
        $unit_value->min = (float)$options['min'];
        $unit_value->max = (float)$options['max'];
        $unit_value->step = (float)$options['step'];
        $unit_value->save();

        $field_options = Tools::getValue('field_options');
        $descriptions = $field_options['description'];

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($descriptions);

        $field = new DynamicField($this->id_field);
        $field->description = $descriptions;
        $field->save();

        $this->respond();
    }

    private function processSaveTextSettings()
    {
        $options = Tools::getValue('options');

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = $this->id_field;
        $unit_value->min = (int)$options['min'];
        $unit_value->max = (int)$options['max'];
        $unit_value->required = (int)$options['required'];
        $unit_value->save();

        $translation_helper = new TranslationHelper($this->module, $this->context);

        $dynamic_field = new DynamicField($this->id_field);

        $values = $options['value'];
        $descriptions = $options['description'];

        $translation_helper->fillEmpty($values);
        $dynamic_field->value = $values;

        $translation_helper->fillEmpty($descriptions);
        $dynamic_field->description = $descriptions;

        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveDateSettings()
    {
        $options = Tools::getValue('options');

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = $this->id_field;
        $unit_value->step = (int)$options['required'];
        $unit_value->min_date = $options['min_date'];
        $unit_value->max_date = $options['max_date'];
        $unit_value->save();

        $descriptions = $options['description'];

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($descriptions);

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->description = $descriptions;

        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveFeatureSettings()
    {
        $options = Tools::getValue('options');

        $translation_helper = new TranslationHelper($this->module, $this->context);

        $dynamic_field = new DynamicField($this->id_field);

        $values = $options['value'];
        $descriptions = $options['description'];

        $translation_helper->fillEmpty($values);
        $dynamic_field->value = $values;

        $translation_helper->fillEmpty($descriptions);
        $dynamic_field->description = $descriptions;

        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveCheckBoxSettings()
    {
        $translation_helper = new TranslationHelper($this->module, $this->context);

        $dynamic_field = new DynamicField($this->id_field);

        $options = Tools::getValue('options');
        $descriptions = $options['description'];

        $translation_helper->fillEmpty($descriptions);
        $dynamic_field->description = $descriptions;

        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveColorPickerSettings()
    {
        $options = Tools::getValue('options');

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = $this->id_field;
        $unit_value->color = $options['color'];
        $unit_value->save();

        $descriptions = $options['description'];

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($descriptions);

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->description = $descriptions;

        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveHtmlSettings()
    {
        $options = Tools::getValue('options');
        $descriptions = $options['description'];

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($descriptions);

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->description = $descriptions;

        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveFileSettings()
    {
        $options = Tools::getValue('options');

        // if demo mode enabled,only accept these types
        if (DynamicTools::isDemoMode()) {
            $options['extensions'] = 'pdf,doc,docx';
        }

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = (int)$this->id_field;
        $unit_value->max_size = (float)$options['max_size'];
        $unit_value->required = (int)$options['required'];
        $unit_value->extensions = $options['extensions'];
        $unit_value->save();

        $descriptions = $options['description'];

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($descriptions);

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->description = $descriptions;

        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveImageSettings()
    {
        $options = Tools::getValue('options');

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = (int)$this->id_field;
        $unit_value->max_size = (float)$options['max_size'];
        $unit_value->min_width = (float)$options['min_width'];
        $unit_value->min_height = (float)$options['min_height'];
        $unit_value->required = (int)$options['required'];
        $unit_value->save();
        $this->respond();
    }

    private function processSaveFieldMultiselect()
    {
        $value = (int)Tools::getValue('value');
        $options = DynamicUnitValue::getUnitValue($this->id_field);
        $options->id_field = $this->id_field;
        $options->multiselect = $value;
        $options->save();
        $this->respond();
    }

    private function processSaveFieldDescription()
    {
        $descriptions = Tools::getValue('description');

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($descriptions);

        $field = new DynamicField($this->id_field);
        $field->description = $descriptions;
        $field->save();
        $this->respond();
    }

    public function respond($data = array(), $success = 1)
    {
        $success = $success && (int)!array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
            'action'  => $this->action
        );
        $arr = array_merge($arr, $data);
        exit(Tools::jsonEncode($arr));
    }
}
