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
use classes\models\DynamicCondition;
use classes\models\DynamicEquation;

class DynamicProductConditionsController extends ModuleAdminController
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

    public function processAddCondition()
    {
        $dynamic_condition = new DynamicCondition();
        $dynamic_condition->id_product = $this->id_product;
        $dynamic_condition->save();
        $this->respond();
    }

    public function processSaveCondition()
    {
        $id_condition = (int)Tools::getValue('id_condition');
        $dynamic_condition = new DynamicCondition($id_condition);
        $dynamic_condition->formula = Tools::getValue('formula');
        $dynamic_condition->save();
        $this->respond();
    }

    private function processSaveFieldState()
    {
        $id_condition = Tools::getValue('id_condition');
        $id_field = Tools::getValue('id_field');
        $visible = Tools::getValue('visible');
        if (!(int)$visible) {
            Db::getInstance()->insert(
                $this->module->name . '_condition_visibility',
                array(
                    'id_condition' => (int)$id_condition,
                    'id_field'     => (int)$id_field,
                    'visible'      => (int)$visible,
                ),
                false,
                true,
                Db::REPLACE
            );
        } else {
            Db::getInstance()->delete(
                $this->module->name . '_condition_visibility',
                'id_condition = ' . (int)$id_condition . ' AND ' .
                'id_field = ' . (int)$id_field
            );
        }
        $this->respond();
    }

    private function processSaveName()
    {
        $id_condition = (int)Tools::getValue('id_condition');
        $dynamic_condition = new DynamicCondition($id_condition);
        $dynamic_condition->name = Tools::getValue('name');
        $dynamic_condition->save();
        $this->respond();
    }

    private function processSaveFormula()
    {
        $id_condition = (int)Tools::getValue('id_condition');
        $formula = Tools::getValue('formula');
        $fields = Tools::getValue('fields');
        $validation = DynamicEquation::checkFormula($this->id_product, $formula, $fields);
        if ($validation !== true) {
            $this->respond(array('error' => $validation));
        }
        $dynamic_condition = new DynamicCondition($id_condition);
        $dynamic_condition->formula = $formula;
        $dynamic_condition->save();
        $this->respond();
    }

    public function processDeleteCondition()
    {
        $id_condition = (int)Tools::getValue('id_condition');
        $dynamic_condition = new DynamicCondition($id_condition);
        $dynamic_condition->delete();
        $this->respond();
    }

    private function processDisplayOptions()
    {
        $id_condition = (int)Tools::getValue('id_condition');
        $id_field = (int)Tools::getValue('id_field');
        exit($this->module->hookDisplayOptionsList($id_condition, $id_field));
    }

    private function processSaveOptionState()
    {
        $id_condition = Tools::getValue('id_condition');
        $id_field = Tools::getValue('id_field');
        $id_option = Tools::getValue('id_option');
        $visible = Tools::getValue('visible');
        if (!(int)$visible) {
            Db::getInstance()->insert(
                $this->module->name . '_condition_option_visibility',
                array(
                    'id_condition' => (int)$id_condition,
                    'id_field'     => (int)$id_field,
                    'id_option'     => (int)$id_option,
                    'visible'      => (int)$visible,
                ),
                false,
                true,
                Db::REPLACE
            );
        } else {
            Db::getInstance()->delete(
                $this->module->name . '_condition_option_visibility',
                'id_condition = ' . (int)$id_condition . ' AND ' .
                'id_field = ' . (int)$id_field . ' AND ' .
                'id_option = ' . (int)$id_option
            );
        }
        $this->respond();
    }

    private function processReloadList()
    {
        exit($this->module->hookDisplayConditionsList($this->id_product));
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
