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
/* @noinspection PhpUnusedPrivateMethodInspection */

use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\models\ExecOrder;

class DynamicProductExecOrderController extends ModuleAdminController
{
    /** @var DynamicProduct */
    public $module;
    public $action;

    /** @var Context */
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
        $source = basename(__FILE__, '.php');
        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if ((int) $this->context->employee->id_profile !== 1 && in_array($this->id_product, $restricted, false)) {
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

    private function processAddItem()
    {
        $id_exec = (int) Tools::getValue('id_exec');
        $exec_order = new ExecOrder();
        $exec_order->id_product = $this->id_product;
        $exec_order->id_exec = $id_exec;
        $exec_order->position = ExecOrder::getHighestPosition($exec_order);
        $exec_order->save();
        $this->respond([
            'exec_order' => ExecOrder::getRowsByProduct($this->id_product),
        ]);
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
        $this->respond([
            'exec_order' => ExecOrder::getRowsByProduct($this->id_product),
        ]);
    }

    private function processResetToDefault()
    {
        $exec_order = ExecOrder::getByIdProduct($this->id_product);
        foreach ($exec_order as $item) {
            $item->delete();
        }
        $this->respond();
    }

    private function respond($data = [], $success = 1)
    {
        /** @noinspection CallableParameterUseCaseInTypeContextInspection */
        $success = $success && (int) !array_key_exists('error', $data);
        $arr = [
            'success' => $success,
        ];
        $arr = array_merge($arr, $data);
        exit(json_encode($arr));
    }
}
