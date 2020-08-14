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
use classes\models\DynamicDropdownOption;
use classes\models\DynamicField;
use classes\models\DynamicRadioOption;
use classes\models\DynamicThumbnailsOption;

class DynamicProductFieldsOptionsController extends ModuleAdminController
{

    /** @var DynamicProduct */
    public $module;
    public $action;

    /** @var Context $context */
    public $context;
    public $id_field;
    public $id_option;
    public $id_product;
    public $id_default_lang;

    private static $types = array(
        8  => DynamicDropdownOption::class,
        12 => DynamicThumbnailsOption::class,
        16 => DynamicRadioOption::class,
    );

    private static $image_folders = array(
        8  => 'dropdown',
        12 => 'thumbnails',
        16 => 'radio',
    );

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int)Tools::getValue('id_product');
        $this->id_field = (int)Tools::getValue('id_field');
        $this->id_option = (int)Tools::getValue('id_option');
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

        exit('hello');
    }

    private function processAddOption()
    {
        $new_option = $this->getOptionClass($this->id_field);
        $new_option->id_field = $this->id_field;
        $new_option->position = $new_option::getHighestPosition($new_option);
        $new_option->save();
        $this->respond(array(
            'id_option' => (int)$new_option->id
        ));
    }

    private function processSaveValue()
    {
        $value = Tools::getValue('value');
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $option->value = $value;
        $option->save();
        $this->respond();
    }

    private function processSaveLabel()
    {
        $labels = Tools::getValue('labels');

        $option = $this->getOptionClass($this->id_field, $this->id_option);

        $translation_helper = new TranslationHelper($this->module, $this->context);
        $translation_helper->fillEmpty($labels);

        $option->label = $labels;
        $option->save();

        $this->respond();
    }

    private function processSaveDefault()
    {
        $is_default = (int)Tools::getValue('is_default');
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $option->is_default = $is_default;
        $option->save();
        $this->respond();
    }

    private function processSaveColor()
    {
        $color = Tools::getValue('color');
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $option->color = $color;
        $option->save();

        $this->respond();
    }

    private function processSaveOptionsOrder()
    {
        $order = Tools::getValue('order');
        if (is_array($order)) {
            foreach ($order as $position => $id_option) {
                $option = $this->getOptionClass($this->id_field, $id_option);
                $option->position = (int)$position;
                $option->save();
            }
        }
        $this->respond();
    }

    private function processDeleteOption()
    {
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $option->delete();
        $this->respond();
    }

    private function processSaveImage()
    {
        $dynamic_field = new DynamicField($this->id_field);
        $image_folder = self::$image_folders[$dynamic_field->type];
        $img_dir = $this->module->provider->getDataDir('images/' . $image_folder);

        $uploader = new Uploader();
        $uploader->setName('file');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $file = $uploader->process();
        $upload = $file[0];

        if ($upload['error']) {
            $this->respond(array('error' => $upload['error']));
        }

        $save_path = $upload['save_path'];
        ImageManager::resize($save_path, $img_dir . $this->id_option . '.jpg');
        ImageManager::resize($save_path, $img_dir . $this->id_option . '-thumb.jpg', _DP_THUMB_, _DP_THUMB_);

        $folder_url = $this->module->provider->getDataDirUrl('images/' . $image_folder);
        $image_url = $folder_url . $this->id_option . '.jpg?' . uniqid('', true);
        $thumb_url = $folder_url . $this->id_option . '-thumb.jpg?' . uniqid('', true);

        $this->respond(array(
            'url'       => $image_url,
            'thumb_url' => $thumb_url
        ));
    }

    private function processDeleteOptionImage()
    {
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $path = $option->getImage();
        $thumb = $option->getThumb();
        if (is_file($path)) {
            unlink($path);
        }
        if (is_file($thumb)) {
            unlink($thumb);
        }

        $folder_url = $this->module->getFolderUrl('views/img/');

        $this->respond(array(
            'empty' => $folder_url . 'pixel.png',
        ));
    }

    /**
     * @param int $id_option
     * @return DynamicThumbnailsOption
     */
    private function getOptionClass($id_field, $id_option = 0)
    {
        $dynamic_field = new DynamicField($id_field);
        $type = (int)$dynamic_field->type;
        $class_name = self::$types[$type];
        return new $class_name($id_option);
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
