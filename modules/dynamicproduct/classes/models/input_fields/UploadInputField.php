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
 * @author    Tunis-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\models\input_fields;

use classes\helpers\FileHelper;
use classes\models\DynamicInputField;

class UploadInputField extends DynamicInputField
{
    public $dir = 'upload';

    public function getFileUrl()
    {
        $folder_url = $this->module->provider->getDataDirUrl('upload/');
        return $folder_url . $this->value;
    }

    public function isSkipped()
    {
        if (parent::isSkipped()) {
            return true;
        }
        return !$this->fileExists();
    }

    private function fileExists()
    {
        return is_file($this->getFilePath());
    }

    private function getFilePath()
    {
        return $this->module->provider->getDataDir('upload') . $this->value;
    }

    public function getThumbUrl()
    {
        $folder_url = $this->module->provider->getDataDirUrl('upload/');
        $extension = pathinfo($this->value, PATHINFO_EXTENSION);
        return $folder_url . str_replace('.'.$extension, $this->thumb_suffix, $this->value);
    }

    public function isImage()
    {
        $file_helper = new FileHelper($this->module, $this->context);
        return $file_helper->isImage($this->getFilePath());
    }
}
