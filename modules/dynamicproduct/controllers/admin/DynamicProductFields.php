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
use classes\factory\DynamicFieldFactory;
use classes\helpers\DynamicFieldsHelper;
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

    private function processAddField()
    {
        $dynamic_field = new DynamicField();
        $dynamic_field->id_product = $this->id_product;
        $dynamic_field->position = DynamicField::getHighestPosition($dynamic_field);
        $dynamic_field->type = 1;
        $dynamic_field->active = 1;
        $dynamic_field->save();
        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processSaveField()
    {
        $id_field = (int) Tools::getValue('id');
        $dynamic_field = new DynamicField($id_field);
        $id_product_original = (int) $dynamic_field->id_product;
        $dynamic_field->saveFromPost();
        if ($id_product_original !== $this->id_product) {
            $dynamic_field->id_product = $id_product_original;
            $dynamic_field->save();
        }
        $this->respond(array(
            'field' => DynamicFieldFactory::create($dynamic_field->type, $dynamic_field->id),
        ));
    }

    private function processDuplicateField()
    {
        $this->module->handler->copyField($this->id_field, $this->id_product);
        $this->respond(array(
            'fields' => DynamicField::getFieldsByIdProduct($this->id_product),
        ));
    }

    private function processDeleteField()
    {
        $fields_helper = new DynamicFieldsHelper($this->module, $this->context);
        $dynamic_field = $fields_helper->deleteField($this->id_product, $this->id_field);

        $this->respond(array(
            'field' => $dynamic_field
        ));
    }

    private function processDeleteFields()
    {
        $fields = Tools::getValue('fields');
        $fields_helper = new DynamicFieldsHelper($this->module, $this->context);

        foreach ($fields as $id_field) {
            $fields_helper->deleteField($this->id_product, (int) $id_field);
        }

        $this->respond();
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
            $this->respond(array(
                'error'   => true,
                'message' => $upload['error']
            ));
        }

        $save_path = $upload['save_path'];
        ImageManager::resize($save_path, $img_dir . $this->id_field . '.jpg');
        ImageManager::resize($save_path, $img_dir . $this->id_field . '-thumb.jpg', 35, 35);

        $this->respond(array(
            'field' => new DynamicField($this->id_field),
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

        $this->respond(array(
            'field' => new DynamicField($this->id_field),
        ));
    }

    private function processSaveFieldsOrder()
    {
        $order = Tools::getValue('order');
        if (is_array($order)) {
            foreach ($order as $position => $id_field) {
                $field = new DynamicField($id_field);
                if ((int) $field->id_product !== $this->id_product) {
                    $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $this->id_product);
                    $common_field->position = $position;
                    $common_field->save();
                } else {
                    $field->position = (int) $position;
                    $field->save();
                }
            }
        }
        $this->respond();
    }

    private function processLoadFavoriteField()
    {
        $id_field = (int) Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $new_field = $this->module->handler->copyField($field->id, $this->id_product);
        $id_new_field = $new_field['id_field'];

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
        $id_field = (int) Tools::getValue('id_field');
        $dynamic_field = new DynamicField($id_field);

        $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $this->id_product);
        if (Validate::isLoadedObject($common_field)) {
            $this->respond(array(
                'error'   => true,
                'message' => $this->module->l('A common field can only be included once in the same product')
            ));
        }
        $common_field->position = 1;

        $product_fields = array_values(DynamicField::getByIdProduct($this->id_product));
        if (!empty($product_fields)) {
            $common_field->position = DynamicField::getHighestPosition($product_fields[0]);
        }

        $common_field->save();

        // modify original field for display only
        $dynamic_field->position = $common_field->position;
        $dynamic_field->common = true;
        $dynamic_field->linked = true;

        $this->respond(array(
            'field' => $dynamic_field
        ));
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
