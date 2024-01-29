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

use classes\controllers\front\DynamicFrontController;
use classes\DynamicTools;
use classes\helpers\DynamicCalculatorHelper;
use classes\models\DynamicInputField;

/** @noinspection PhpUnused */

class DynamicProductCalculatorModuleFrontController extends DynamicFrontController
{
    /** @noinspection PhpUnused */
    protected function processCalculateResult()
    {
        $calculator_helper = new DynamicCalculatorHelper($this->module, $this->context);

        $fields = Tools::getValue('fields');
        $adapter_data = Tools::getValue('adapter_data');

        $input_fields = array();
        $fields_visibility = array();

        $calculator_helper->resetDebugMessages();

        try {
            [$input_fields, $fields_visibility] = DynamicInputField::getInputFieldsFromData(
                $this->id_product,
                $this->id_attribute,
                $fields,
                empty($fields['changed']['value'])
            );
        } catch (Exception $e) {
            $this->respond(array(
                'error'   => 1,
                'message' => DynamicTools::reportException($e)
            ));
        }

        try {
            $calculation = $calculator_helper->processCalculation(
                $this->id_product,
                $this->id_attribute,
                $input_fields,
                $fields_visibility,
                $adapter_data
            );
        } catch (Exception $e) {
            $calculation = array(
                'input_fields'   => $input_fields,
                'visibility'     => $fields_visibility,
                'debug_messages' => DynamicProduct::$debug_messages,
            );
            $this->respond(array(
                'error'   => 1,
                'message' => DynamicTools::reportException($e)
            ));
        }

        $this->respond($calculation);
    }
}
