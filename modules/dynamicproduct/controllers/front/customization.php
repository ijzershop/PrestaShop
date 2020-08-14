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
use classes\helpers\DynamicCustomizationHelper;
use classes\models\DynamicInput;
use classes\models\DynamicInputField;

class DynamicProductCustomizationModuleFrontController extends ModuleFrontController
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

    private function processSaveCustomization()
    {
        $dp_input = (int)Tools::getValue('dp_id_input');
        DynamicInput::deleteCustomization($dp_input);

        $fields = Tools::getValue('fields');
        $input_fields = DynamicInputField::getInputFieldsFromData($this->id_product, $this->id_attribute, $fields);

        $calculator_helper = new DynamicCalculatorHelper($this->module, $this->context);

        try {
            $calculator_helper->checkFormulas($this->id_product, $this->id_attribute, $input_fields);
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => 1,
                'message' => $e->getMessage()
            ));
        }

        $dp_cart = (int)Tools::getValue('dp_cart', 0);
        $id_cart = $dp_cart ?: (int)$this->module->handler->addCart();
        $id_customization_field = $this->module->handler->addCustomField($this->id_product);

        $id_address_delivery = $this->module->provider->getDeliveryAddressID($this->context);

        $customization_helper = new DynamicCustomizationHelper($this->module, $this->context);

        $id_customization = $customization_helper->saveCustomization(
            $this->id_product,
            $this->id_attribute,
            $id_address_delivery,
            $id_cart
        );

        $price_equation_result = $calculator_helper->getPriceEquationResult(
            $this->id_product,
            $this->id_attribute,
            $input_fields
        );

        $weight_equation_result = $calculator_helper->getWeightEquationResult(
            $this->id_product,
            $this->id_attribute,
            $input_fields
        );

        $dynamic_input = $customization_helper->saveDynamicInput(
            $this->id_product,
            $this->id_attribute,
            $id_cart,
            $id_customization,
            $price_equation_result,
            $weight_equation_result,
            $input_fields
        );

        $customization_helper->saveCustomizationData(
            $this->id_product,
            $this->module->id,
            $id_customization,
            $id_customization_field,
            $dynamic_input
        );

        $customization_helper->saveInputFields($input_fields, $dynamic_input->id);

        $this->respond(array(
            'id_input'         => (int)$dynamic_input->id,
            'id_attribute'     => $this->id_attribute,
            'id_customization' => $id_customization
        ));
    }

    public function respond($data = array(), $success = 1)
    {
        $success = $success && (int)!array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
            'action'  => $this->action
        );
        $arr = array_merge($arr, $data);
        exit(Tools::jsonEncode($arr));
    }
}
