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
use classes\models\ExecOrder;

class DynamicProductExecOrderController extends ModuleAdminController
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
        $this->id_product = (int) Tools::getValue('id_product');
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

    private function processAddItem()
    {
        $id_exec = (int) Tools::getValue('id_exec');
        $exec_order = new ExecOrder();
        $exec_order->id_product = $this->id_product;
        $exec_order->id_exec = $id_exec;
        $exec_order->position = ExecOrder::getHighestPosition($exec_order);
        $exec_order->save();
        $this->respond(array(
            'exec_order' => ExecOrder::getByIdProduct($this->id_product)
        ));
    }

    private function processDeleteItem()
    {
        $id_item = (int) Tools::getValue('id_item');
        $exec_order = new ExecOrder($id_item);
        $exec_order->delete();
        $this->respond();
    }

    private function processReorderExecOrder()
    {
        $order = (array) Tools::getValue('order');
        foreach ($order as $position => $id_exec_order) {
            $exec_order = new ExecOrder((int) $id_exec_order);
            $exec_order->position = (int) $position + 1;
            $exec_order->save();
        }
        $this->respond();
    }

    private function processResetToDefault()
    {
        $exec_order = ExecOrder::getByIdProduct($this->id_product);
        foreach ($exec_order as $item) {
            $item->delete();
        }
        $this->respond();
    }

    private function respond($data = array(), $success = 1)
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
