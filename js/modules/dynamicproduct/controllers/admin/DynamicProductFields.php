<?php
/**
 * 2007-2026 TuniSoft
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
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
/* @noinspection PhpUnusedPrivateMethodInspection */

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\models\input_fields\UploadInputField;
use ZipStream\ZipStream;

class DynamicProductFieldsController extends ModuleAdminController
{
    /** @var DynamicProduct */
    public $module;
    public $action;
    public $id_product;
    public $id_default_lang;

    public function __construct()
    {
        if (empty($_POST)) {
            $_POST = json_decode(Tools::file_get_contents('php://input'), true);
            if (is_null($_POST)) {
                $_POST = [];
            }
        }
        parent::__construct();
        $this->action = Tools::getValue('action');
        $this->id_product = (int) Tools::getValue('id_product');
        $this->id_default_lang = (int) Configuration::get('PS_LANG_DEFAULT');
    }

    public function postProcess()
    {
        $source = basename(__FILE__, '.php');
        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if (DynamicContext::getEmployeeProfileId() !== 1 && in_array($this->id_product, $restricted, false)) {
            exit(json_encode([
                'error' => true,
                'message' => $this->module->l('This product is for viewing only!', $source),
            ]));
        }

        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }

        exit;
    }

    protected function processDownloadFiles()
    {
        $prefix = Tools::getValue('prefix');
        $id_input_field = (int) Tools::getValue('id_input_field');
        $input_field = new UploadInputField($id_input_field);
        $uploads = $input_field->data_obj;
        $files = [];
        foreach ($uploads as $upload) {
            $path = $input_field->getFilePath($upload['file']);
            $keep_path = $input_field->getKeepFilePath($upload['file']);
            if ($keep_path || $path) {
                $files[] = [
                    'path' => $keep_path ?: $path,
                    'file' => $upload['file'],
                ];
            }
        }

        $zip_name = '/tmp/' . (int) $prefix . '-uploads_' . $input_field->name . '_' . $id_input_field . '.zip';

        // Opening a zip stream
        $archive = new \ZipStream\Option\Archive();
        $archive->setSendHttpHeaders(true);
        $zip = new ZipStream(basename($zip_name), $archive);
        foreach ($files as $file) {
            if (!is_file($file['path'])) {
                continue;
            }
            $zip->addFileFromPath($file['file'], $file['path']);
        }

        $zip->finish();
    }
}
