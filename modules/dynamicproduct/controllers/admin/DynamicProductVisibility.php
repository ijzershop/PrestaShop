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

class DynamicProductVisibilityController extends ModuleAdminController
{

    /** @var DynamicProduct */
    public $module;
    public $action;

    /** @var Context $context */
    public $context;
    public $id_field;
    public $id_product;
    public $id_default_lang;

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int) Tools::getValue('id_product');
        $this->id_field = (int) Tools::getValue('id_field');
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

    private function processSaveState()
    {
        $visible = (int) Tools::getValue('visible');

        $id_attribute = Tools::getValue('id_attribute');

        if (!$visible) {
            $data = array();
            $data['id_product'] = (int) $this->id_product;
            $data['id_attribute'] = (int) $id_attribute;
            $data['id_field'] = (int) $this->id_field;
            $data['visible'] = $visible;
            Db::getInstance()->insert($this->module->name . '_visibility', $data, false, true, Db::REPLACE);
        } else {
            Db::getInstance()->delete(
                $this->module->name . '_visibility',
                'id_product = ' . (int) $this->id_product . ' AND ' .
                'id_attribute = ' . (int) $id_attribute . ' AND ' .
                'id_field = ' . (int) $this->id_field
            );
        }

        $this->respond($this->getNewData());
    }

    private function getNewData()
    {
        //get product combinations
        $combinations = $this->module->provider->getProductCombinations($this->id_product);
        $visibility_values = false;
        if (is_array($combinations) && count($combinations)) {
            $visibility_values = $this->module->provider->getVisibilityValues($this->id_product);
        }
        return array(
            'combinations' => array(
                'visibility' => $visibility_values,
            ),
        );
    }

    public function respond($data = array(), $success = 1)
    {
        $success = $success && (int) !array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
        );
        $arr = array_merge($arr, $data);
        exit(json_encode($arr));
    }
}
