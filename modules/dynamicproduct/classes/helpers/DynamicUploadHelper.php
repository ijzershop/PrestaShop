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
 * @author    Tunis-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use classes\models\DynamicInput;
use classes\models\input_fields\UploadInputField;
use Context;
use DynamicProduct;

class DynamicUploadHelper
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function copyOrderFilesToKeep($id_cart)
    {
        $dest = $this->module->provider->getDataDir('upload_keep');
        $types = array(_DP_IMAGE_, _DP_FILE_);
        $dynamic_inputs = DynamicInput::getInputsByIdCart($id_cart);
        foreach ($dynamic_inputs as $dynamic_input) {
            $dynamic_input->assignInputFields($this->context->language->id);
            $input_fields = $dynamic_input->input_fields;
            foreach ($input_fields as $input_field) {
                if (in_array((int) $input_field->type, $types, true)) {
                    if ($input_field instanceof UploadInputField) {
                        $file_path = $input_field->getFilePath();
                        $thumb_path = $input_field->getThumbPath();
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
