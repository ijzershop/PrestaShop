<?php
/**
 * 2007-2023 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2023 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\helpers;

use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\input_fields\UploadInputField;

class DynamicUploadHelper
{
    /** @var \DynamicProduct */
    public $module;
    /** @var \Context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function copyOrderFilesToKeep($id_cart)
    {
        $dest = $this->module->provider->getDataDir('upload_keep');
        $types = [_DP_IMAGE_, _DP_FILE_];
        $dynamic_inputs = DynamicInput::getInputsByIdCart($id_cart);
        foreach ($dynamic_inputs as $dynamic_input) {
            $dynamic_input->assignInputFields($this->context->language->id);
            $input_fields = $dynamic_input->input_fields;
            foreach ($input_fields as $input_field) {
                if (in_array((int) $input_field->type, $types, true)) {
                    if ($input_field instanceof UploadInputField) {
                        if (is_array($input_field->data)) {
                            foreach ($input_field->data as $upload) {
                                $file_path = $input_field->getFilePath($upload['file']);
                                $thumb_path = $input_field->getThumbFilePath($upload['file']);
                                if (is_file($file_path)) {
                                    copy($file_path, $dest . basename($file_path));
                                }
                                if (is_file($thumb_path)) {
                                    copy($thumb_path, $dest . basename($thumb_path));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
