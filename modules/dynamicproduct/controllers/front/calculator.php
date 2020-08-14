<?php
/**
 * 2010-2019 Tuni-Soft
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
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

/** @noinspection PhpUnusedPrivateMethodInspection */

use classes\helpers\DynamicCalculatorHelper;
use classes\helpers\FieldsVisibilityHelper;
use classes\models\DynamicInputField;

class DynamicProductCalculatorModuleFrontController extends ModuleFrontController
{
    /** @var DynamicProduct */
    public $module;
    public $action;
    private $id_product;
    private $id_attribute;

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int)Tools::getValue('id_product');
        $this->id_attribute = $this->getAttributeID();
    }

    private function getAttributeID()
    {
        $id_attribute = (int)Tools::getValue('id_attribute');
        $attributes = Tools::getValue('attributes');
        if ($attributes) {
            $id_attribute = $this->module->provider->getAttributeID($this->id_product, $attributes);
        }
        return $id_attribute;
    }

    public function initContent()
    {
        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }
        exit();
    }

    private function processCalculateResult()
    {
        $changed_field = Tools::getValue('changed_field');
        $fields = Tools::getValue('fields');

        $input_fields = DynamicInputField::getInputFieldsFromData(
            $this->id_product,
            $this->id_attribute,
            $fields,
            $changed_field
        );

        $calculator_helper = new DynamicCalculatorHelper($this->module, $this->context);

        try {
            $calculator_helper->checkFormulas($this->id_product, $this->id_attribute, $input_fields);
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => 1,
                'message' => $e->getMessage()
            ));
        }

        $visibility_helper = new FieldsVisibilityHelper($this->module, $this->context);
        $fields_visibility = $visibility_helper->getFieldsVisibility(
            $this->id_product,
            $this->id_attribute,
            $input_fields
        );
        $visibility_helper->setExcludedFields($input_fields, $fields_visibility);

        $calculated_prices = $calculator_helper->getCalculatedPrices(
            $this->id_product,
            $this->id_attribute,
            $input_fields
        );

        $calculated_weight = $calculator_helper->getCalculatedWeight(
            $this->id_product,
            $this->id_attribute,
            $input_fields
        );

        $in_stock = $calculator_helper->checkProductStock($this->id_product, $this->id_attribute, $input_fields);

        $fields_visibility = $calculator_helper->getFieldsVisibility($fields_visibility);

        $met_conditions = $visibility_helper->getMetConditions(
            $this->id_product,
            $input_fields
        );

        $debug_messages = $calculator_helper->getDebugMessages($this->id_product, $this->id_attribute, $input_fields);

        $response =
            $calculated_prices +
            $calculated_weight +
            $fields_visibility +
            $met_conditions +
            $debug_messages +
            $in_stock +
            array('input_fields' => $input_fields);

        $this->respond($response);
    }

    public function respond($data = array(), $success = 1)
    {
        if (array_key_exists('error', $data)) {
            $success = 0;
        }
        $arr = array(
            'success' => $success,
            'action'  => $this->action
        );
        $arr = array_merge($arr, $data);
        exit(Tools::jsonEncode($arr));
    }
}
