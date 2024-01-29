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

namespace classes\controllers\front;

use Context;
use DynamicProduct;
use ModuleFrontController;
use Tools;

class DynamicFrontController extends ModuleFrontController
{
    /** @var DynamicProduct */
    public $module;
    protected $action;
    protected $id_product;
    protected $id_attribute;

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int) Tools::getValue('id_product');
        $this->id_attribute = $this->getAttributeID();
    }

    private function getAttributeID()
    {
        $id_attribute = (int) Tools::getValue('id_attribute');
        $attributes = Tools::getValue('attributes');
        if ($attributes) {
            $id_attribute = $this->module->provider->getAttributeID($this->id_product, $attributes);
        }
        return $id_attribute;
    }

    public function initContent()
    {
        if (empty($this->action)) {
            exit('no_action');
        }
        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }
        exit();
    }

    protected function respond($data = array(), $success = 1)
    {
        if (array_key_exists('error', $data)) {
            $success = 0;
        }
        $arr = array(
            'success' => $success,
        );
        $arr = array_merge($arr, $data);
        exit(json_encode($arr));
    }
}
