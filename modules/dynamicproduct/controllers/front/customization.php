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

use classes\controllers\front\DynamicFrontController;
use classes\helpers\DynamicCalculatorHelper;
use classes\helpers\DynamicCustomizationHelper;
use classes\helpers\FieldsVisibilityHelper;
use classes\models\DynamicInput;
use classes\models\DynamicInputField;

/** @noinspection PhpUnused */

class DynamicProductCustomizationModuleFrontController extends DynamicFrontController
{
    /** @noinspection PhpUnused */
    protected function processSaveCustomization()
    {
        $id_customization = (int)Tools::getValue('id_customization');

        $dp_input = (int)Tools::getValue('dp_id_input');
        DynamicInput::deleteCustomization($dp_input);

        $fields = Tools::getValue('fields');
        $input_fields = DynamicInputField::getInputFieldsFromData(
            $this->id_product,
            $this->id_attribute,
            $fields,
            false
        );

        $calculator_helper = new DynamicCalculatorHelper($this->module, $this->context);

        try {
            $calculator_helper->checkFormulas($this->id_product, $input_fields);
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => 1,
                'message' => $e->getMessage()
            ));
        }

        $visibility_helper = new FieldsVisibilityHelper($this->module, $this->context);
        $fields_visibility = array();
        try {
            $fields_visibility = $visibility_helper->getFieldsVisibility(
                $this->id_product,
                $this->id_attribute,
                $input_fields
            );
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => 1,
                'message' => $e->getMessage()
            ));
        }
        $visibility_helper->setExcludedFields($input_fields, $fields_visibility);

        $dp_cart = (int)Tools::getValue('dp_cart', 0);
        $id_cart = $dp_cart ?: (int)$this->module->handler->addCart();
        $id_customization_field = $this->module->handler->addCustomField($this->id_product);

        $id_address_delivery = $this->module->provider->getDeliveryAddressID($this->context);

        $customization_helper = new DynamicCustomizationHelper($this->module, $this->context);

        if (!$id_customization) {
            $id_customization = $customization_helper->saveCustomization(
                $this->id_product,
                $this->id_attribute,
                $id_address_delivery,
                $id_cart
            );
        }

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
            'id_module'        => $this->module->id,
            'id_customization' => $id_customization,
        ));
    }

    /** @noinspection PhpUnused */
    public function processSaveInput()
    {
        if (!$this->module->provider->isAdmin()) {
            $this->respond(array(
                'error'   => true,
                'message' => 'Forbidden'
            ));
        }

        $id_input = (int)Tools::getValue('dp_id_input');
        $dynamic_input = new DynamicInput($id_input);

        $fields = Tools::getValue('fields');
        $input_fields = DynamicInputField::getInputFieldsFromData(
            $this->id_product,
            $this->id_attribute,
            $fields,
            false
        );

        $visibility_helper = new FieldsVisibilityHelper($this->module, $this->context);
        $fields_visibility = array();
        try {
            $fields_visibility = $visibility_helper->getFieldsVisibility(
                $this->id_product,
                $this->id_attribute,
                $input_fields
            );
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => 1,
                'message' => $e->getMessage()
            ));
        }
        $visibility_helper->setExcludedFields($input_fields, $fields_visibility);

        $customization_helper = new DynamicCustomizationHelper($this->module, $this->context);

        $input_fields_old = DynamicInputField::getByIdInput($dynamic_input->id);
        foreach ($input_fields_old as $input_field) {
            $input_field->delete();
        }

        $customization_helper->saveInputFields($input_fields, $dynamic_input->id);
        $this->respond();
    }
}
