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
use classes\models\DynamicCommonField;
use classes\models\DynamicField;

class DynamicProductFieldsController extends ModuleAdminController
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

    private function processAddField()
    {
        $dynamic_field = new DynamicField();
        $dynamic_field->id_product = $this->id_product;
        $dynamic_field->position = DynamicField::getHighestPosition($dynamic_field);
        $dynamic_field->type = 1;
        $dynamic_field->active = 1;
        $dynamic_field->save();
        $this->respond(array(
            'id_field' => (int)$dynamic_field->id,
            'type' => (int)$dynamic_field->type,
            'field' => $dynamic_field
        ));
    }

    private function processSaveFieldName()
    {
        $name = Tools::getValue('name');

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->name = $name;
        $dynamic_field->save();

        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processSaveFieldLabels()
    {
        $labels = Tools::getValue('labels');

        $field = new DynamicField($this->id_field);

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($labels);

        $field->label = $labels;
        $field->save();

        $this->respond();
    }

    private function processSaveFieldType()
    {
        $type = (int)Tools::getValue('type');

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->type = $type;
        $dynamic_field->save();

        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processSaveFieldInit()
    {
        $init = (float)Tools::getValue('init');

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->init = $init;
        $dynamic_field->save();

        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processSaveFieldUnit()
    {
        $id_unit = (int)Tools::getValue('id_unit');

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->id_unit = $id_unit;
        $dynamic_field->save();

        $this->respond();
    }

    private function processSaveFieldActive()
    {
        $active = (int)Tools::getValue('active');

        $dynamic_field = new DynamicField($this->id_field);
        $dynamic_field->active = $active;
        $dynamic_field->save();

        $this->respond();
    }

    private function processDuplicateField()
    {
        $this->module->handler->copyField($this->id_field, $this->id_product);
        $this->respond();
    }

    private function processDeleteField()
    {
        $dynamic_field = new DynamicField($this->id_field);

        if ((int)$dynamic_field->common) {
            if ($this->id_product === (int)$dynamic_field->id_product) {
                $common_fields = DynamicCommonField::getByIdField($this->id_field);
                foreach ($common_fields as $common_field) {
                    $common_field->delete();
                }
                $dynamic_field->delete();
            } else {
                $common_field = DynamicCommonField::getByFieldAndProduct($this->id_field, $this->id_product);
                $common_field->delete();
            }
        } else {
            $dynamic_field->delete();
        }

        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processSaveFieldImage()
    {
        $img_dir = $this->module->provider->getDataDir('images/field');

        $uploader = new Uploader();
        $uploader->setName('file');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $file = $uploader->process();
        $upload = $file[0];

        if ($upload['error']) {
            $this->respond(array('error' => $upload['error']));
        }

        $save_path = $upload['save_path'];
        ImageManager::resize($save_path, $img_dir . $this->id_field . '.jpg');
        ImageManager::resize($save_path, $img_dir . $this->id_field . '-thumb.jpg', 35, 35);

        $folder_url = $this->module->provider->getDataDirUrl('images/field');
        $image_url = $folder_url . $this->id_field . '.jpg?' . uniqid('', true);
        $thumb_url = $folder_url . $this->id_field . '-thumb.jpg?' . uniqid('', true);

        $this->respond(array(
            'url'       => $image_url,
            'thumb_url' => $thumb_url
        ));
    }

    private function processDeleteFieldImage()
    {
        $field = new DynamicField($this->id_field);
        $path = $field->getImage();
        $thumb = $field->getThumb();
        if (is_file($path)) {
            unlink($path);
        }
        if (is_file($thumb)) {
            unlink($thumb);
        }

        $folder_url = $this->module->getFolderUrl('views/img/');

        $this->respond(array(
            'empty' => $folder_url . 'empty.png',
        ));
    }

    private function processSaveFieldsOrder()
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

    private function processAddToFavorites()
    {
        $field = new DynamicField($this->id_field);
        $field->favorite = true;
        $field->save();
        $this->respond();
    }

    private function processRemoveFromFavorites()
    {
        $field = new DynamicField($this->id_field);
        $field->favorite = false;
        $field->save();
        $this->respond();
    }

    private function processAddToCommonFields()
    {
        $field = new DynamicField($this->id_field);
        $field->id_product = $this->id_product;
        $field->common = true;
        $field->save();
        $this->respond();
    }

    private function processRemoveFromCommonFields()
    {
        $field = new DynamicField($this->id_field);
        $field->common = false;
        $field->save();
        $this->respond();
    }

    private function processLoadFavoriteField()
    {
        $id_favorite_field = (int)Tools::getValue('id_favorite_field');
        $field = new DynamicField($id_favorite_field);
        $id_new_field = $this->module->handler->copyField($field->id, $this->id_product);

        $new_field = new DynamicField($id_new_field);
        $new_field->position = DynamicField::getHighestPosition($new_field);
        $new_field->favorite = false;
        $new_field->save();

        $this->respond(array(
            'field' => $new_field
        ));
    }

    private function processLoadCommonField()
    {
        $id_common_field = (int)Tools::getValue('id_common_field');
        $dynamic_field = new DynamicField($id_common_field);

        if ((int)$dynamic_field->id_product === (int)$this->id_product) {
            $this->respond(array(
                'error' => $this->module->l('A common field can only be included once in the same product')
            ));
        }

        $common_field = DynamicCommonField::getByFieldAndProduct($id_common_field, $this->id_product);
        $common_field->save();

        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processReloadList()
    {
        exit($this->module->hookDisplayFieldsList($this->id_product));
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
