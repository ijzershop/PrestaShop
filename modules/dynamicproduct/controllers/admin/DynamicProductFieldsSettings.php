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

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int) Tools::getValue('id_product');
        $this->id_field = (int) Tools::getValue('id_field');
        $this->id_default_lang = (int) Configuration::get('PS_LANG_DEFAULT');
    }

    public function postProcess()
    {
        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if ((int) $this->context->employee->id_profile !== 1 && in_array($this->id_product, $restricted, false)) {
            exit(json_encode(array(
                'error'   => true,
                'message' => $this->module->l('This product is for viewing only!')
            )));
        }

        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }

        exit();
    }

    private function processSaveFieldSettings()
    {
        $id_field = (int) Tools::getValue('id');
        $dynamic_field = new DynamicField($id_field);
        $id_product_original = (int) $dynamic_field->id_product;
        $dynamic_field->saveFromPost();
        if ($id_product_original !== $this->id_product) {
            $dynamic_field->id_product = $id_product_original;
            $dynamic_field->save();
        }

        $translation_helper = new TranslationHelper($this->module, $this->context);

        $unit_value = DynamicUnitValue::getUnitValue($id_field);
        $settings = Tools::getValue('settings');
        $unit_value = DynamicUnitValue::copyFromArray($settings, $unit_value);
        $translation_helper->fillEmpty($settings['price_unit']);
        $unit_value->price_unit = $settings['price_unit'];
        $unit_value->id_field = $id_field;
        $unit_value->save();

        $short_descriptions = Tools::getValue('short_description');
        $translation_helper->fillEmpty($short_descriptions);

        $descriptions = Tools::getValue('description');
        $translation_helper->fillEmpty($descriptions);

        $field = new DynamicField($id_field);
        $field->short_description = $short_descriptions;
        $field->description = $descriptions;
        $field->save();

        $this->respond();
    }

    private function processSaveTextSettings()
    {
        $options = Tools::getValue('options');

        $unit_value = DynamicUnitValue::getUnitValue($this->id_field);
        $unit_value->id_field = $this->id_field;
        $unit_value->min = (int) $options['min'];
        $unit_value->max = (int) $options['max'];
        $unit_value->required = (int) $options['required'];
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
        $unit_value->step = (int) $options['required'];
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
        if (DynamicTools::isDemoMode() && !DynamicTools::isSuperAdmin()) {
            $this->respond(array(
                'error'   => true,
                'message' => 'This function is not available in the demo mode!',
            ));
        }
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
        $unit_value->id_field = (int) $this->id_field;
        $unit_value->max_size = (float) $options['max_size'];
        $unit_value->required = (int) $options['required'];
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
        $unit_value->id_field = (int) $this->id_field;
        $unit_value->max_size = (float) $options['max_size'];
        $unit_value->min_width = (float) $options['min_width'];
        $unit_value->min_height = (float) $options['min_height'];
        $unit_value->required = (int) $options['required'];
        $unit_value->save();
        $this->respond();
    }

    private function processSaveFieldMultiselect()
    {
        $value = (int) Tools::getValue('value');
        $options = DynamicUnitValue::getUnitValue($this->id_field);
        $options->id_field = $this->id_field;
        $options->multiselect = $value;
        $options->save();
        $this->respond();
    }

    private function processSaveThumbnailSize()
    {
        $value = (int) Tools::getValue('value');
        $options = DynamicUnitValue::getUnitValue($this->id_field);
        $options->id_field = $this->id_field;
        $options->max_size = $value;
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
        $success = $success && (int) !array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
        );
        $arr = array_merge($arr, $data);
        exit(json_encode($arr));
    }
}
