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

use classes\controllers\front\DynamicFrontController;
use classes\helpers\FileHelper;
use classes\models\DynamicField;
use classes\models\input_fields\FileInputField;
use classes\models\input_fields\ImageInputField;

/** @noinspection PhpUnused */

class DynamicProductUploaderModuleFrontController extends DynamicFrontController
{
    /** @noinspection PhpUnused */
    protected function processUploadImage()
    {
        $id_field = (int) Tools::getValue('id_field');

        $field = new DynamicField($id_field);

        if ((int) $field->type !== _DP_IMAGE_) {
            $this->respond(array(
                'error'   => true,
                'message' => $this->module->l('The upload could not be completed')
            ));
        }

        $options = $field->getSettings();

        $size = $options->max_size * 1024 * 1024;
        $img_dir = $this->module->provider->getDataDir('upload');

        $uploader = new Uploader();
        if ($size) {
            $uploader->setMaxSize($size);
        }
        $uploader->setName('file');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $file = $uploader->process();
        $upload = $file[0];

        if ($size && $upload['size'] > $size) {
            $this->respond(array(
                'error'   => true,
                'message' =>
                    $this->module->l('This image is too big, the maximum allowed size is') .
                    ' ' . $options->max_size . ' ' . $this->module->l('MB')
            ));
        }

        if ($upload['error']) {
            $this->respond(array(
                'error'   => true,
                'message' => $upload['error']
            ));
        }

        $save_path = $upload['save_path'];

        $info = getimagesize($save_path);

        if ($options->min_width && (int) $info[0] < $options->min_width) {
            $this->respond(array(
                'error'   => true,
                'message' =>
                    $this->module->l('The minimum required width is')
                    . ' ' . $options->min_width . ' ' . $this->module->l('pixels')
                    . ' (' . $this->module->l('The uploaded image has a width of')
                    . ' ' . $info[0] . ' ' . $this->module->l('pixels') . ')'
            ));
            unlink($save_path);
        }

        if ($options->min_height && (int) $info[1] < $options->min_height) {
            $this->respond(array(
                'error'   => true,
                'message' =>
                    $this->module->l('The minimum required height is')
                    . ' ' . $options->min_height . ' ' . $this->module->l('pixels')
                    . ' (' . $this->module->l('The uploaded image has a height of')
                    . ' ' . $info[1] . ' ' . $this->module->l('pixels') . ')'
            ));
            unlink($save_path);
        }

        $extension = pathinfo($upload['name'], PATHINFO_EXTENSION);
        $filename = time() . '_' . mt_rand();

        $image = $img_dir . $filename . '.' . $extension;
        $thumb = $img_dir . $filename . '-thumb.jpg';
        $folder_url = $this->module->provider->getDataDirUrl('upload');

        ImageManager::resize($save_path, $image, null, null, $extension);
        ImageManager::resize($save_path, $thumb, 256, 256, $extension);

        $input_field = new ImageInputField();
        $input_field->id_field = $id_field;
        $input_field->name = $field->name;
        $input_field->value = basename($image);
        $input_field->image_url = $folder_url . basename($image);
        $input_field->thumb_url = $folder_url . basename($thumb);
        $input_field->visible = 1;

        $this->respond(array(
            'input_field' => $input_field,
        ));
    }

    /** @noinspection PhpUnused */
    protected function processUploadFile()
    {
        $id_field = (int) Tools::getValue('id_field');

        $field = new DynamicField($id_field);

        if ((int) $field->type !== _DP_FILE_) {
            $this->respond(array(
                'error'   => true,
                'message' => $this->module->l('The upload could not be completed')
            ));
        }

        $options = $field->getSettings();
        $extensions = $options->extensions;
        $extensions = explode(',', $extensions);
        foreach ($extensions as $key => $extension) {
            if (!$extension) {
                unset($extensions[$key]);
            }
        }

        $size = $options->max_size * 1024 * 1024;
        $file_dir = $this->module->provider->getDataDir('upload');

        $uploader = new Uploader();
        if ($size) {
            $uploader->setMaxSize($size);
        }
        $uploader->setName('file');
        $uploader->setAcceptTypes($extensions);
        $uploader->setSavePath($file_dir);
        $file = $uploader->process();
        $upload = $file[0];

        if ($size && $upload['size'] > $size) {
            $this->respond(array(
                'error'   => true,
                'message' =>
                    $this->module->l('This file is too big, the maximum allowed size is')
                    . ' ' . $options->max_size . ' ' . $this->module->l('MB')
            ));
        }

        if ($upload['error']) {
            $this->respond(array(
                'error'   => true,
                'message' => $upload['error']
            ));
        }

        $extension = pathinfo($upload['name'], PATHINFO_EXTENSION);
        $filename = time() . '_' . mt_rand();

        $file = $file_dir . $filename . '.' . $extension;

        if (rename($upload['save_path'], $file)) {
            $input_field = new FileInputField();
            $input_field->id_field = $id_field;
            $input_field->name = $field->name;
            $input_field->value = basename($file);
            $input_field->visible = 1;

            $file_helper = new FileHelper($this->module, $this->context);
            if ($file_helper->isImage($file)) {
                $folder_url = $this->module->provider->getDataDirUrl('upload');
                $thumb = $file_dir . $filename . '-thumb.jpg';
                ImageManager::resize($file, $thumb, 256, 256, $extension);
                $input_field->thumb_url = $folder_url . basename($thumb);
                $input_field->image_url = $folder_url . basename($file);
            } else {
                $input_field->thumb_url = null;
                $input_field->image_url = null;
            }
            $this->respond(array(
                'input_field' => $input_field,
            ));
        } else {
            $this->respond(array(
                'error'   => true,
                'message' => $this->module->l('The upload could not be completed')
            ));
        }
    }
}
