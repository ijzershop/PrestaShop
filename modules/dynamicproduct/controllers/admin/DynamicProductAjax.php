<?php
/**
 * 2010-2018 Tuni-Soft
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
 * @copyright 2010-2018 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

/** @noinspection PhpUnusedPrivateMethodInspection */

class DynamicProductAjaxController extends ModuleAdminController
{

    /** @var DynamicProduct */
    public $module;
    public $action;

    /** @var Context $context */
    public $context;
    public $id_product;

    private $auto_create = false;

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int)Tools::getValue('id_product');
    }

    public function postProcess()
    {
        // parent::postProcess();

        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if ($this->context->employee->id_profile != 1 && in_array($this->id_product, $restricted)) {
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

    private function processSaveGeneralConfig()
    {
        $name = pSQL(Tools::getValue('name'));
        $value = Tools::getValue('value');

        $key = Tools::strtoupper($name);

        // Validate config name so we don't accept other names
        if (!isset($this->module->config[$key])) {
            $this->respond(array(
                'error' => $this->module->l('Invalid request!')
            ));
        }

        // Escape the value depending on the default value type
        $default = $this->module->config[$key];
        if (is_numeric($default)) {
            $value = (int)$value;
        } else {
            $value = pSQL($value);
        }

        Configuration::updateValue($key, $value);

        $this->respond();
    }

    private function processSaveConfig()
    {
        $name = Tools::getValue('name');
        $value = Tools::getValue('value');

        $product_config = new DynamicConfig($this->id_product);
        $product_config->saveValue($name, $value);

        if ($name == 'active' || $name == 'required') {
            $this->module->handler->addCustomField($this->id_product, false);
        }

        if ($name == 'active' && (int)$value == 0) {
            $this->module->handler->setCustomFieldRequired($this->id_product, false);
        }

        if ($name == 'active' && (int)$value == 1) {
            $calculator_file = DynamicTools::getDir() . 'calculator/product' . $this->id_product . '.php';
            if (!file_exists($calculator_file) && $this->auto_create) {
                file_put_contents($calculator_file, "<?php\n");
            }

            $weight_file = DynamicTools::getDir() . 'calculator/weight' . $this->id_product . '.php';
            if (!file_exists($weight_file) && $this->auto_create) {
                file_put_contents($weight_file, "<?php\n");
            }
        }

        $this->respond();
    }

    private function processLoadConfig()
    {
        $id_product_load = (int)Tools::getValue('id_product_load');

        $this->module->handler->copyConfig($this->id_product, $id_product_load);

        $this->respond();
    }

    private function processCopyConfig()
    {
        $id_category = (int)Tools::getValue('id_target_category');

        $category = new Category($id_category);
        $products = $category->getProducts(
            $this->context->language->id,
            0,
            100000000,
            null,
            null,
            false,
            false,
            false,
            1,
            false
        );
        foreach ($products as $product) {
            $id_destination_product = (int)$product['id_product'];
            if ($id_destination_product !== $this->id_product) {
                $this->module->handler->copyConfig($id_destination_product, $this->id_product);
            }
        }

        $this->respond();
    }

    private function processLoadField()
    {
        $id_favorite_field = (int)Tools::getValue('id_favorite_field');
        $field = new DynamicField($id_favorite_field);
        $new_field = $this->module->handler->copyField($field, $this->id_product);

        $new_field->position = DynamicField::getHighestPosition($new_field);
        $new_field->favorite = false;
        $new_field->save();

        $this->respond(array(
            'field' => $new_field
        ));
    }

    private function processLoadCommonField()
    {
        $id_field = (int)Tools::getValue('id_field');
        $dynamic_field = new DynamicField($id_field);

        if ((int)$dynamic_field->id_product === (int)$this->id_product) {
            $this->respond(array(
                'error' => $this->module->l('A common field can only be included once in the same product')
            ));
        }

        $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $this->id_product);
        $common_field->save();

        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processReloadTab()
    {
        exit($this->module->hookReloadTab($this->id_product));
    }

    private function processGetCustomizationField()
    {
        $id_customization_field = (int)Tools::getValue('id_customization_field');
        $customization_field = new CustomizationField($id_customization_field);
        $sql = new DbQuery();
        $sql->from($this->module->name . '_customization_field');
        $sql->where('id_product = ' . (int)$customization_field->id_product);
        $sql->where('id_customization_field   = ' . (int)$id_customization_field);
        $result = Db::getInstance()->getRow($sql);
        $product_link = $this->module->provider->getProductLink(
            $customization_field->id_product,
            0,
            array('content_only' => 1)
        );
        $this->respond(array(
            'customization_field' => $result ? $customization_field : false,
            'product_link' => $product_link
        ));
    }

    private function processSaveField()
    {
        $type = (int)Tools::getValue('type');

        if ($type == _DP_PHP_) {
            $allocation_file = DynamicTools::getDir() . 'allocations/product' . $this->id_product . '.php';
            if (!file_exists($allocation_file) && $this->auto_create) {
                file_put_contents($allocation_file, "<?php\n");
            }
        }

        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $type = $field->type;
        $id_product_original = $field->id_product;
        $field->saveFromPost();
        if ((int)$field->common) {
            $field->id_product = (int)$id_product_original;
            $field->save();
        }
        if ((int)$field->type !== (int)$type) {
            $unit_values = $field->getUnitValues();
            $unit_values->delete();
        }
        $this->respond(array('id_field' => (int)$field->id));
    }

    private function processDeleteField()
    {
        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);

        if ((int)$field->common) {
            if ($this->id_product === (int)$field->id_product) {
                $common_fields = DynamicCommonField::getByIdField($id_field);
                foreach ($common_fields as $common_field) {
                    $common_field->delete();
                }
            } else {
                $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $this->id_product);
                $common_field->delete();
                $this->respond(array('id_field' => (int)$id_field));
            }
        }

        $dropdown_options = DynamicDropdownOption::getDropdownOptionsByIdField($id_field);
        foreach ($dropdown_options as &$dropdown_option) {
            $dropdown_option->delete();
        }
        $radio_options = DynamicRadioOption::getRadioOptionsByIdField($id_field);
        foreach ($radio_options as &$radio_option) {
            $radio_option->delete();
        }
        $thumbnails_options = DynamicThumbnailsOption::getThumbnailsOptionsByIdField($id_field);
        foreach ($thumbnails_options as &$thumbnails_option) {
            $thumbnails_option->delete();
        }

        $field->delete();

        $unit_values = $field->getUnitValues();
        $unit_values->delete();
        $combination_values = DynamicCombinationValue::getValuesByIdField($id_field);
        foreach ($combination_values as $combination_value) {
            $combination_value->delete();
        }
        $this->respond(array('id_field' => (int)$id_field));
    }

    private function processSaveFieldTrans()
    {
        $name = pSQL(Tools::getValue('name'));

        $id_field = (int)Tools::getValue('id_field');
        $id_lang = (int)Tools::getValue('id_lang');
        $trans = Tools::getValue($name);

        $field = new DynamicField($id_field);
        $translations = $field->$name;
        $translations[$id_lang] = pSQL($trans);
        $field->$name = $translations;
        $field->save();
        $this->respond();
    }

    private function processAddFieldToFavorites()
    {
        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $field->favorite = true;
        $field->save();
        $this->respond();
    }

    private function processRemoveFieldFromFavorites()
    {
        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $field->favorite = false;
        $field->save();
        $this->respond();
    }

    private function processAddFieldToCommonFields()
    {
        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $field->common = true;
        $field->save();

        $this->respond();
    }

    private function processRemoveFieldFromCommonFields()
    {
        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $field->common = false;
        $field->save();

        $this->respond();
    }

    private function processSaveEquation()
    {
        $id_formula = (int)Tools::getValue('id_formula');

        $formula = Tools::getValue('formula');
        $validation = DynamicEquation::checkFormula($formula, $this->id_product);
        if ($validation !== true) {
            $this->respond(array('error' => $validation));
        }
        $dynamic_equation = DynamicEquation::getEquationByIdFormula($this->id_product, $id_formula);
        $dynamic_equation->id_product = (int)$this->id_product;
        $dynamic_equation->id_formula = (int)$id_formula;
        $dynamic_equation->formula = pSQL($formula, true);
        $dynamic_equation->save();
        $this->respond();
    }

    private function processFieldImage()
    {
        $id_field = (int)Tools::getValue('id_field');
        $img_dir = DynamicTools::getDir() . 'views/img/field/';

        $uploader = new Uploader();
        $uploader->setName('image');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $file = $uploader->process();
        $upload = $file[0];

        if ($upload['error']) {
            $this->respond(array('error' => $upload['error']));
        }

        $save_path = $upload['save_path'];
        ImageManager::resize($save_path, $img_dir . $id_field . '.jpg');
        ImageManager::resize($save_path, $img_dir . $id_field . '-thumb.jpg', 35, 35);
        $this->respond(array('id_field' => $id_field));
    }

    private function processDeleteFieldImage()
    {
        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $path = $field->getImage();
        $thumb = $field->getThumb();
        if (is_file($path)) {
            unlink($path);
        }
        if (is_file($thumb)) {
            unlink($thumb);
        }
        $this->respond();
    }

    private function processGetUnitValue()
    {
        $id_field = (int)Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $type = (int)$field->type;
        switch ($type) {
            case _DP_INPUT_:
                $init = (float)Tools::getValue('init');
                exit($this->module->hookDisplayUnitValue($id_field, $init));
            case _DP_TEXT_:
                exit($this->module->hookDisplayTextOptions($id_field));
            case _DP_TEXTAREA_:
                exit($this->module->hookDisplayTextAreaOptions($id_field));
            case _DP_DATE_:
                exit($this->module->hookDisplayDateOptions($id_field));
            case _DP_CHECKBOX_:
                exit($this->module->hookDisplayCheckboxOptions($id_field));
            case _DP_IMAGE_:
                exit($this->module->hookDisplayImageOptions($id_field));
            case _DP_DROPDOWN_:
                exit($this->module->hookDisplayDropdownOptions($id_field));
            case _DP_RADIO_:
                exit($this->module->hookDisplayRadioOptions($id_field));
            case _DP_THUMBNAILS_:
                exit($this->module->hookDisplayThumbnailsOptions($id_field));
            case _DP_FILE_:
                exit($this->module->hookDisplayFileOptions($id_field));
            case _DP_SLIDER_:
                $init = (float)Tools::getValue('init');
                exit($this->module->hookDisplaySliderOptions($id_field, $init));
            case _DP_FEATURE_:
                exit($this->module->hookDisplayFeatureOptions($id_field));
            case _DP_COLORPICKER_:
                exit($this->module->hookDisplayColorPickerOptions($id_field));
        }
    }

    private function processSaveUnitValue()
    {
        $id_field = (int)Tools::getValue('id_field');
        $unit_value_data = Tools::getValue('unit_values');
        $init = (float)$unit_value_data['init'];
        $field = new DynamicField($id_field);
        $field->init = (float)$init;
        $field->save();

        $unit_value = DynamicUnitValue::getUnitValue($id_field, $field->id_unit);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = $field->id_unit;
        $unit_value->init = (float)$unit_value_data['init'];
        $unit_value->min = (float)$unit_value_data['min'];
        $unit_value->max = (float)$unit_value_data['max'];
        $unit_value->step = (float)$unit_value_data['step'];
        $unit_value->save();

        $field_options = Tools::getValue('field_options');
        $descriptions = $field_options['description'];
        if (is_array($descriptions)) {
            $field = new DynamicField($id_field);
            foreach ($descriptions as $id_lang => $description) {
                $field->description[(int)$id_lang] = $description;
            }
            $field->save();
        }

        $this->respond(array('init' => $init));
    }

    private function processSaveTextOptions()
    {
        $id_field = (int)Tools::getValue('id_field');
        $text_options = Tools::getValue('text_options');

        $unit_value = DynamicUnitValue::getUnitValue($id_field, 0);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = 0;
        $unit_value->init = 0;
        $unit_value->min = (int)$text_options['min'];
        $unit_value->max = (int)$text_options['max'];
        $unit_value->step = (int)$text_options['required'];
        $unit_value->save();

        $values = $text_options['value'];
        if (is_array($values)) {
            $field = new DynamicField($id_field);
            foreach ($values as $id_lang => $value) {
                $field->value[(int)$id_lang] = $value;
            }
            $field->save();
        }

        $descriptions = $text_options['description'];
        if (is_array($descriptions)) {
            $field = new DynamicField($id_field);
            foreach ($descriptions as $id_lang => $description) {
                $field->description[(int)$id_lang] = $description;
            }
            $field->save();
        }

        $this->respond();
    }

    private function processSaveImageOptions()
    {
        $id_field = (int)Tools::getValue('id_field');
        $image_options = Tools::getValue('image_options');

        $unit_value = DynamicUnitValue::getUnitValue($id_field, 0);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = 0;
        $unit_value->init = (float)$image_options['max_size'];
        $unit_value->min = (float)$image_options['min_width'];
        $unit_value->max = (float)$image_options['min_height'];
        $unit_value->step = (int)$image_options['required'];
        $unit_value->save();
        $this->respond();
    }

    private function processSaveDateOptions()
    {
        $id_field = (int)Tools::getValue('id_field');
        $date_options = Tools::getValue('date_options');

        $unit_value = DynamicUnitValue::getUnitValue($id_field, 0);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = 0;
        $unit_value->step = (int)$date_options['required'];
        $unit_value->save();

        $descriptions = $date_options['description'];
        if (is_array($descriptions)) {
            $field = new DynamicField($id_field);
            foreach ($descriptions as $id_lang => $description) {
                $field->description[(int)$id_lang] = $description;
            }
            $field->save();
        }

        $this->respond();
    }

    private function processSaveCheckboxOptions()
    {
        $id_field = (int)Tools::getValue('id_field');

        $field_options = Tools::getValue('checkbox_options');
        $descriptions = $field_options['description'];
        if (is_array($descriptions)) {
            $field = new DynamicField($id_field);
            foreach ($descriptions as $id_lang => $description) {
                $field->description[(int)$id_lang] = $description;
            }
            $field->save();
        }

        $this->respond();
    }

    private function processSaveFileOptions()
    {
        $id_field = (int)Tools::getValue('id_field');
        $file_options = Tools::getValue('file_options');

        // if demo mode enabled,only accept these types
        if (DynamicTools::isDemoMode()) {
            $file_options['extensions'] = 'pdf,doc,docx';
        }

        $unit_value = DynamicUnitValue::getUnitValue($id_field, 0);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = 0;
        $unit_value->init = (float)$file_options['max_size'];
        $unit_value->step = (int)$file_options['required'];
        $unit_value->extra = pSQL($file_options['extensions']);
        $unit_value->save();

        $descriptions = $file_options['description'];
        if (is_array($descriptions)) {
            $field = new DynamicField($id_field);
            foreach ($descriptions as $id_lang => $description) {
                $field->description[(int)$id_lang] = $description;
            }
            $field->save();
        }

        $this->respond();
    }

    private function processSaveSliderOptions()
    {
        $id_field = (int)Tools::getValue('id_field');
        $unit_value_data = Tools::getValue('unit_values');
        $init = (float)$unit_value_data['init'];
        $field = new DynamicField($id_field);
        $field->init = (float)$init;
        $field->save();

        $unit_value = DynamicUnitValue::getUnitValue($id_field, $field->id_unit);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = (int)$field->id_unit;
        $unit_value->init = (float)$unit_value_data['init'];
        $unit_value->min = (float)$unit_value_data['min'];
        $unit_value->max = (float)$unit_value_data['max'];
        $unit_value->step = (float)$unit_value_data['step'];
        $unit_value->save();

        $field_options = Tools::getValue('slider_options');
        $descriptions = $field_options['description'];
        if (is_array($descriptions)) {
            $field = new DynamicField($id_field);
            foreach ($descriptions as $id_lang => $description) {
                $field->description[(int)$id_lang] = $description;
            }
            $field->save();
        }

        $this->respond(array('init' => $init));
    }

    private function processSaveCombination()
    {
        $id_attribute = (int)Tools::getValue('id_attribute');
        $id_field = (int)Tools::getValue('id_field');
        $combination_value = DynamicCombinationValue::getCombinationValue($id_attribute, $id_field);
        $value = Tools::getValue('value');
        if (!Tools::strlen($value)) {
            //if the admin emptied the value, delete it
            $combination_value->delete();
            $this->respond();
        }
        $combination_value->saveFromPost();
        $this->respond();
    }

    private function processSaveVisibility()
    {
        $id_attribute = (int)Tools::getValue('id_attribute');
        $id_field = (int)Tools::getValue('id_field');

        $data = array();
        $data['id_product'] = (int)$this->id_product;
        $data['id_attribute'] = (int)$id_attribute;
        $data['id_field'] = (int)$id_field;
        $data['visible'] = (int)Tools::getValue('visible');

        Db::getInstance()->insert($this->module->name . '_visibility', $data, false, true, Db::REPLACE);
        $this->respond();
    }

    private function processOrderField()
    {
        $order = Tools::getValue('order');
        if (is_array($order)) {
            foreach ($order as $position => $id_field) {
                $field = new DynamicField($id_field);
                if ((int)$field->id_product !== $this->id_product) {
                    $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $this->id_product);
                    $common_field->position = $position;
                    $common_field->save();
                } else {
                    $field->position = (int)$position;
                    $field->save();
                }
            }
        }
        $this->respond();
    }

    private function processCheckFormula()
    {
        $formula = Tools::getValue('formula');
        $check = DynamicEquation::checkFormula($formula, $this->id_product);
        if ($check !== true) {
            $this->respond(array('error' => $check));
        }
        $this->respond();
    }

    private function processSaveDropdownOption()
    {
        $id_dropdown_option = (int)Tools::getValue('id_dropdown_option');
        $dropdown_option = new DynamicDropdownOption($id_dropdown_option);
        $dropdown_option->saveFromPost();
        $dropdown_option->value = pSQL(Tools::getValue('value'));
        $this->respond(array('id_dropdown_option' => $dropdown_option->id));
    }

    private function processDeleteDropdownOption()
    {
        $id_dropdown_option = (int)Tools::getValue('id_dropdown_option');
        $dropdown_option = new DynamicDropdownOption($id_dropdown_option);
        $dropdown_option->delete();
        $this->respond(array('id_dropdown_option' => (int)$id_dropdown_option));
    }

    private function processSaveDropdownOptionTrans()
    {
        $name = pSQL(Tools::getValue('name'));

        $id_dropdown_option = (int)Tools::getValue('id_dropdown_option');
        $id_lang = (int)Tools::getValue('id_lang');
        $trans = pSQL(Tools::getValue($name));

        $dropdown_option = new DynamicDropdownOption($id_dropdown_option);
        $translations = $dropdown_option->$name;
        $translations[$id_lang] = pSQL($trans);
        $dropdown_option->$name = $translations;
        $dropdown_option->save();

        $this->respond();
    }

    private function processOrderDropdownOption()
    {
        $order = Tools::getValue('order');
        if (is_array($order)) {
            foreach ($order as $position => $id_dropdown_option) {
                $dropdown_option = new DynamicDropdownOption($id_dropdown_option);
                $dropdown_option->position = (int)$position;
                $dropdown_option->save();
            }
        }
        $this->respond();
    }

    private function processDropdownImage()
    {
        $id_dropdown_option = (int)Tools::getValue('id_dropdown_option');
        $img_dir = DynamicTools::getDir() . 'views/img/dropdown/';

        $uploader = new Uploader();
        $uploader->setName('image');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $file = $uploader->process();
        $upload = $file[0];

        if ($upload['error']) {
            $this->respond(array('error' => $upload['error']));
        }

        $save_path = $upload['save_path'];
        ImageManager::resize($save_path, $img_dir . $id_dropdown_option . '.jpg');
        ImageManager::resize($save_path, $img_dir . $id_dropdown_option . '-thumb.jpg', _DP_THUMB_, _DP_THUMB_);
        $this->respond(array('id_dropdown_option' => $id_dropdown_option));
    }

    private function processDeleteDropdownOptionImage()
    {
        $id_dropdown_option = (int)Tools::getValue('id_dropdown_option');
        $dropdown_option = new DynamicDropdownOption($id_dropdown_option);
        $dropdown_option->color = '';
        $dropdown_option->save();
        if (is_file($dropdown_option->getPath('id'))) {
            unlink($dropdown_option->getPath('id'));
        }
        if (is_file($dropdown_option->getThumbPath('id'))) {
            unlink($dropdown_option->getThumbPath('id'));
        }
        $this->respond();
    }

    private function processSaveRadioOption()
    {
        $id_radio_option = (int)Tools::getValue('id_radio_option');
        $radio_option = new DynamicRadioOption($id_radio_option);
        $radio_option->saveFromPost();
        $radio_option->value = pSQL(Tools::getValue('value'));
        $this->respond(array('id_radio_option' => $radio_option->id));
    }

    private function processDeleteRadioOption()
    {
        $id_radio_option = (int)Tools::getValue('id_radio_option');
        $radio_option = new DynamicRadioOption($id_radio_option);
        $radio_option->delete();
        $this->respond(array('id_radio_option' => (int)$id_radio_option));
    }

    private function processSaveRadioOptionTrans()
    {
        $name = pSQL(Tools::getValue('name'));

        $id_radio_option = (int)Tools::getValue('id_radio_option');
        $id_lang = (int)Tools::getValue('id_lang');
        $trans = pSQL(Tools::getValue($name));

        $radio_option = new DynamicRadioOption($id_radio_option);
        $translations = $radio_option->$name;
        $translations[$id_lang] = pSQL($trans);
        $radio_option->$name = $translations;
        $radio_option->save();

        $this->respond();
    }

    private function processOrderRadioOption()
    {
        $order = Tools::getValue('order');
        if (is_array($order)) {
            foreach ($order as $position => $id_radio_option) {
                $radio_option = new DynamicRadioOption($id_radio_option);
                $radio_option->position = (int)$position;
                $radio_option->save();
            }
        }
        $this->respond();
    }

    private function processSaveThumbnailsOption()
    {
        $id_thumbnails_option = (int)Tools::getValue('id_thumbnails_option');
        $thumbnails_option = new DynamicThumbnailsOption($id_thumbnails_option);
        $thumbnails_option->saveFromPost();
        $this->respond(array('id_thumbnails_option' => $thumbnails_option->id));
    }

    private function processDeleteThumbnailsOption()
    {
        $id_thumbnails_option = (int)Tools::getValue('id_thumbnails_option');
        $thumbnails_option = new DynamicThumbnailsOption($id_thumbnails_option);
        $thumbnails_option->delete();
        $this->respond(array('id_thumbnails_option' => (int)$id_thumbnails_option));
    }

    private function processSaveThumbnailsOptionTrans()
    {
        $name = pSQL(Tools::getValue('name'));

        $id_thumbnails_option = (int)Tools::getValue('id_thumbnails_option');
        $id_lang = (int)Tools::getValue('id_lang');
        $trans = pSQL(Tools::getValue($name));

        $thumbnails_option = new DynamicThumbnailsOption($id_thumbnails_option);
        $translations = $thumbnails_option->$name;
        $translations[$id_lang] = pSQL($trans);
        $thumbnails_option->$name = $translations;
        $thumbnails_option->save();

        $this->respond();
    }

    private function processSaveThumbnailsOptionInput()
    {
        $id_field = (int)Tools::getValue('id_field');
        $name = pSQL(Tools::getValue('name'));
        $value = pSQL(Tools::getValue('value'));

        $unit_value = DynamicUnitValue::getUnitValue($id_field, 0);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = 0;
        if ($name === 'multiselect') {
            $unit_value->init = $value;
        }
        $unit_value->save();

        $this->respond();
    }

    private function processOrderThumbnailsOption()
    {
        $order = Tools::getValue('order');
        if (is_array($order)) {
            foreach ($order as $position => $id_thumbnails_option) {
                $thumbnails_option = new DynamicThumbnailsOption($id_thumbnails_option);
                $thumbnails_option->position = (int)$position;
                $thumbnails_option->save();
            }
        }
        $this->respond();
    }

    private function processThumbnailsImage()
    {
        $id_thumbnails_option = (int)Tools::getValue('id_thumbnails_option');
        $img_dir = DynamicTools::getDir() . 'views/img/thumbnails/';

        $uploader = new Uploader();
        $uploader->setName('image');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $file = $uploader->process();
        $upload = $file[0];

        if ($upload['error']) {
            $this->respond(array('error' => $upload['error']));
        }

        $save_path = $upload['save_path'];
        ImageManager::resize($save_path, $img_dir . $id_thumbnails_option . '.jpg');
        ImageManager::resize($save_path, $img_dir . $id_thumbnails_option . '-thumb.jpg', _DP_THUMB_, _DP_THUMB_);
        $this->respond(array('id_thumbnails_option' => $id_thumbnails_option));
    }

    private function processDeleteThumbnailsOptionImage()
    {
        $id_thumbnails_option = (int)Tools::getValue('id_thumbnails_option');
        $thumbnails_option = new DynamicThumbnailsOption($id_thumbnails_option);
        $thumbnails_option->color = '';
        $thumbnails_option->save();
        if (is_file($thumbnails_option->getPath('id'))) {
            unlink($thumbnails_option->getPath('id'));
        }
        if (is_file($thumbnails_option->getThumbPath('id'))) {
            unlink($thumbnails_option->getThumbPath('id'));
        }
        $this->respond();
    }

    private function processSaveColorpickerOptions()
    {
        $id_field = (int)Tools::getValue('id_field');
        $colorpicker_options = Tools::getValue('colorpicker_options');

        $unit_value = DynamicUnitValue::getUnitValue($id_field, 0);
        $unit_value->id_field = (int)$id_field;
        $unit_value->id_unit = 0;
        $unit_value->extra = $colorpicker_options['extra'];
        $unit_value->save();

        $descriptions = $colorpicker_options['description'];
        if (is_array($descriptions)) {
            $field = new DynamicField($id_field);
            foreach ($descriptions as $id_lang => $description) {
                $field->description[(int)$id_lang] = $description;
            }
            $field->save();
        }

        $this->respond();
    }

    private function processDownloadCsv()
    {
        $id_input = (int)Tools::getValue('id_input');
        header('Content-type: text/csv');
        header('Content-Disposition: attachment; filename="CSV_' . $id_input . '.csv"');
        exit($this->module->hookDownloadCSV($id_input));
    }

    private function processSaveProportion()
    {
        $id_proportion = (int)Tools::getValue('id_proportion');
        $proportion = new DynamicProportion($id_proportion);
        $proportion->copyFromPost();
        $proportion->save();
        $this->respond(array(
            'proportion' => $proportion
        ));
    }

    private function processDeleteProportion()
    {
        $id_proportion = (int)Tools::getValue('id_proportion');
        $proportion = new DynamicProportion($id_proportion);
        $proportion->delete();
        $this->respond();
    }

    private function processDisplayProportion()
    {
        $id_proportion = (int)Tools::getValue('id_proportion');
        exit($this->module->hookDisplayProportion($id_proportion));
    }

    private function processDisplayProportions()
    {
        exit($this->module->hookDisplayProportions($this->id_product));
    }

    public function respond($data = array(), $success = 1)
    {
        $success = $success && (int)!array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
            'action' => $this->action
        );
        $arr = array_merge($arr, $data);
        exit(Tools::jsonEncode($arr));
    }
}
