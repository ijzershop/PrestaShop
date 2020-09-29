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
use classes\helpers\FieldsVisibilityHelper;
use classes\models\DynamicInputField;

/** @noinspection PhpUnused */

class DynamicProductCalculatorModuleFrontController extends DynamicFrontController
{
    /** @noinspection PhpUnused */
    protected function processCalculateResult()
    {
        $fields = Tools::getValue('fields');
        $adapter_data = Tools::getValue('adapter_data');
        $input_fields = array();

        try {
            $input_fields = DynamicInputField::getInputFieldsFromData(
                $this->id_product,
                $this->id_attribute,
                $fields,
                empty($fields['changed']['value'])
            );
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => 1,
                'message' => $e->getMessage()
            ));
        }

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

        $calculated_prices = array();
        try {
            $calculated_prices = $calculator_helper->getCalculatedPrices(
                $this->id_product,
                $this->id_attribute,
                $input_fields,
                $adapter_data
            );
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => true,
                'message' => $e->getMessage()
            ));
        }

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

        $debug_messages = $calculator_helper->getDebugMessages($this->id_product, $input_fields);

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
}
