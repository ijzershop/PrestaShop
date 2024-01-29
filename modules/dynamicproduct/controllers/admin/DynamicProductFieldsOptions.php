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
use classes\models\DynamicDropdownOption;
use classes\models\DynamicField;
use classes\models\DynamicRadioOption;
use classes\models\DynamicThumbnailsOption;
use Eventviva\ImageResize;

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
        $this->id_product = (int) Tools::getValue('id_product');
        $this->id_field = (int) Tools::getValue('id_field');
        $this->id_option = (int) Tools::getValue('id_option');
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
        $this->respond(array(
            'error'   => true,
            'message' => 'Invalid action!',
        ));
        exit();
    }

    private function processAddOption()
    {
        $new_option = $this->getOptionClass($this->id_field);
        $new_option->value = 0;
        $new_option->id_field = $this->id_field;
        $new_option->position = $new_option::getHighestPosition($new_option);
        $new_option->save();

        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
        ));
    }

    private function processSaveOption()
    {
        $id_option = (int) Tools::getValue('id');
        /** @var DynamicDropdownOption $dynamic_option */
        $dynamic_option = $this->getOptionClass($this->id_field, $id_option);
        $dynamic_option->saveFromPost();

        if ($dynamic_option->is_default) {
            /** @noinspection PhpUndefinedVariableInspection */
            $table = $dynamic_option::$definition['table'];
            $primary = $dynamic_option::$definition['primary'];
            Db::getInstance()->update(
                $table,
                array('is_default' => 0),
                'id_field = ' . (int) $this->id_field .
                ' AND `' . bqSQL($primary) . '` != ' . $id_option
            );
        }

        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
        ));
    }

    private function processSaveColor()
    {
        $color = Tools::getValue('color');
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $option->color = $color;
        $option->save();

        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
        ));
    }

    private function processSaveOptionsOrder()
    {
        $order = Tools::getValue('order');
        if (is_array($order)) {
            foreach ($order as $position => $id_option) {
                $option = $this->getOptionClass($this->id_field, $id_option);
                $option->position = (int) $position;
                $option->save();
            }
        }
        $this->respond();
    }

    private function processDeleteOption()
    {
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $option->delete();
        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
        ));
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
            $this->respond(array(
                'error'   => true,
                'message' => $upload['error']
            ));
        }

        $save_path = $upload['save_path'];

        ImageManager::resize($save_path, $img_dir . $this->id_option . '.jpg');

        $image = new ImageResize($save_path);
        $image->resizeToHeight(_DP_THUMB_);
        $image->save($img_dir . $this->id_option . '-thumb.jpg', null, 100);

        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
        ));
    }

    private function processImportImages()
    {
        $dynamic_field = new DynamicField($this->id_field);
        $type = (int) $dynamic_field->type;
        $image_folder = self::$image_folders[$type];
        $img_dir = $this->module->provider->getDataDir('images/' . $image_folder);

        $languages = Language::getLanguages();

        $uploader = new Uploader();
        $uploader->setName('files');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $files = $uploader->process();

        foreach ($files as $file) {
            if ($file['error'] === 0) {
                $path = $file['save_path'];

                /** @var DynamicDropdownOption | DynamicThumbnailsOption | DynamicRadioOption $class_name */
                $class_name = self::$types[$type];
                /** @var DynamicDropdownOption | DynamicThumbnailsOption | DynamicRadioOption $option */
                $option = new $class_name();
                $option->value = 0;
                $option->id_field = $this->id_field;
                $option->position = $class_name::getHighestPosition($option);
                foreach ($languages as $language) {
                    $option->label[$language['id_lang']] = DynamicTools::capitalizeFilename(basename($path));
                }
                $option->save();

                ImageManager::resize($path, $img_dir . $option->id . '.jpg');

                $image = new ImageResize($path);
                $image->resizeToHeight(_DP_THUMB_);
                $image->save($img_dir . $option->id . '-thumb.jpg', null, 100);
            }
        }

        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
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

        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
        ));
    }

    private function processDeleteOptionColor()
    {
        $option = $this->getOptionClass($this->id_field, $this->id_option);
        $option->color = null;
        $option->save();

        $this->respond(array(
            'field' => DynamicFieldFactory::create(null, $this->id_field),
        ));
    }

    /**
     * @param int $id_option
     * @return DynamicDropdownOption | DynamicThumbnailsOption | DynamicRadioOption
     */
    private function getOptionClass($id_field, $id_option = 0)
    {
        $dynamic_field = new DynamicField($id_field);
        $type = (int) $dynamic_field->type;
        $class_name = self::$types[$type];
        return new $class_name($id_option);
    }

    public function respond($data = array(), $success = 1)
    {
        /** @noinspection CallableParameterUseCaseInTypeContextInspection */
        $success = $success && (int) !array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
        );
        $arr = array_merge($arr, $data);
        exit(json_encode($arr));
    }
}
