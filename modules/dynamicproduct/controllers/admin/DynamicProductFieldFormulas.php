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

use classes\DynamicTools;
use classes\models\DynamicEquation;
use classes\models\FieldFormula;

/** @noinspection PhpUnused */

class DynamicProductFieldFormulasController extends ModuleAdminController
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

    /** @noinspection PhpUnused */
    public function processAddFieldFormula()
    {
        $field_formula = new FieldFormula();
        $field_formula->id_product = $this->id_product;
        $field_formula->position = FieldFormula::getHighestPosition($field_formula);
        $field_formula->save();
        $this->respond();
    }

    /** @noinspection PhpUnused */
    public function processSaveFieldFormula()
    {
        $id_field_formula = (int)Tools::getValue('id_field_formula');
        $field_formula = new FieldFormula($id_field_formula);
        $field_formula->formula = Tools::getValue('formula');
        $field_formula->save();
        $this->respond();
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function processSaveFormula()
    {
        $id_field_formula = (int)Tools::getValue('id_field_formula');
        $formula = Tools::getValue('formula');

        $fields = Tools::getValue('fields');
        $validation = DynamicEquation::checkFormula($this->id_product, $formula, $fields);
        if ($validation !== true) {
            $this->respond(array('error' => $validation));
        }
        $field_formula = new FieldFormula($id_field_formula);
        $field_formula->formula = $formula;

        $target_field = $field_formula->getTargetField();
        $target_formula = $field_formula->getTargetFormula();
        if (empty($target_field) || empty($target_formula)) {
            $this->respond(array(
                'error' => $this->module->l('The formula must have the format [field] = formula...')
            ));
        }

        $field_formula->save();
        $this->respond();
    }

    /** @noinspection PhpUnused */
    public function processDeleteFieldFormula()
    {
        $id_field_formula = (int)Tools::getValue('id_field_formula');
        $field_formula = new FieldFormula($id_field_formula);
        $field_formula->delete();
        $this->respond();
    }

    /** @noinspection PhpUnused */
    public function processSaveOrder()
    {
        $order = Tools::getValue('order');
        foreach ($order as $index => $id_field_formula) {
            $field_formula = new FieldFormula($id_field_formula);
            $field_formula->position = $index + 1;
            $field_formula->save();
        }
        $this->respond();
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function processReloadList()
    {
        exit($this->module->hookDisplayFieldFormulasList($this->id_product));
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
