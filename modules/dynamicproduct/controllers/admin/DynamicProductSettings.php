<?php
/**
 * 2010-2020 Tuni-Soft
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
 * @copyright 2010-2020 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

/** @noinspection PhpUnusedPrivateMethodInspection */

use classes\DynamicTools;
use classes\models\DynamicConfig;

class DynamicProductSettingsController extends ModuleAdminController
{

    /** @var DynamicProduct */
    public $module;
    public $action;

    /** @var Context $context */
    public $context;
    public $id_product;
    public $id_default_lang;

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int)Tools::getValue('id_product');
        $this->id_default_lang = (int)Configuration::get('PS_LANG_DEFAULT');
    }

    public function postProcess()
    {
        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if ((int)$this->context->employee->id_profile !== 1 && in_array($this->id_product, $restricted, false)) {
            exit(Tools::jsonEncode(array(
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

    private function processSaveInput()
    {
        $name = Tools::getValue('name');
        $value = Tools::getValue('value');

        $product_config = new DynamicConfig($this->id_product);
        $product_config->saveValue($name, $value);

        if ($name === 'active' || $name === 'required') {
            $this->module->handler->addCustomField($this->id_product, false);
        }

        if ($name === 'active' && (int)$value === 0) {
            $this->module->handler->setCustomFieldRequired($this->id_product, false);
        }

        $this->respond();
    }

    private function processCopyProductConfig()
    {
        $id_product_load = (int)Tools::getValue('id_source_product');
        $this->module->handler->copyConfig($this->id_product, $id_product_load);
        $this->respond();
    }

    private function processCopyCategoryConfig()
    {
        if (DynamicTools::isDemoMode() && !DynamicTools::isSuperAdmin()) {
            $this->respond(array(
                'error'   => true,
                'message' => 'This function is not available in the demo mode!',
            ));
        }
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

    public function respond($data = array(), $success = 1)
    {
        $success = $success && (int)!array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
        );
        $arr = array_merge($arr, $data);
        exit(Tools::jsonEncode($arr));
    }
}
