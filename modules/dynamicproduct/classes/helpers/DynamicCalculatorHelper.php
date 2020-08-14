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

namespace classes\helpers;

use classes\models\DynamicConfig;
use classes\models\DynamicEquation;
use classes\models\DynamicInput;
use classes\models\DynamicInputField;
use classes\models\DynamicProportion;
use Configuration;
use Context;
use DynamicProduct;
use Exception;
use Product;
use RuntimeException;
use Tools;

class DynamicCalculatorHelper
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     * @throws Exception
     */
    public function checkFormulas($id_product, $id_attribute, $input_fields)
    {
        $price_equation = DynamicEquation::getPriceEquation($id_product);
        $weight_equation = DynamicEquation::getWeightEquation($id_product);
        $quantity_equation = DynamicEquation::getQuantityEquation($id_product);

        try {
            DynamicEquation::evaluateFormula($id_product, $id_attribute, $price_equation->formula, $input_fields);
        } catch (Exception $e) {
            throw new RuntimeException('Price Equation: ' . $e->getMessage());
        }

        try {
            DynamicEquation::evaluateFormula($id_product, $id_attribute, $weight_equation->formula, $input_fields);
        } catch (Exception $e) {
            throw new RuntimeException('Weight Equation: ' . $e->getMessage());
        }

        try {
            DynamicEquation::evaluateFormula($id_product, $id_attribute, $quantity_equation->formula, $input_fields);
        } catch (Exception $e) {
            throw new RuntimeException('Quantity Equation: ' . $e->getMessage());
        }
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $price_ht
     * @param $quantity
     * @param $id_cart
     */
    public function getCustomizationPrices($id_product, $id_attribute, $price_ht, $quantity, $id_cart)
    {
        $specific_price = $this->module->calculator->getReduction(array(
            'id_product'           => $id_product,
            'id_product_attribute' => $id_attribute,
            'quantity'             => $quantity,
            'id_cart'              => $id_cart
        ));

        $price_ht_nr = $price_ht;
        $price_ht = $this->applyReductions($price_ht, $id_product, $specific_price);

        $price_ttc = $this->module->calculator->applyTax($price_ht_nr, null, false, $id_product);
        $price_ttc_nr = $price_ttc;
        $price_ttc = $this->applyReductions($price_ttc, $id_product, $specific_price);
        return array(
            'price_ht'     => $price_ht,
            'price_ht_nr'  => $price_ht_nr,
            'price_ttc'    => $price_ttc,
            'price_ttc_nr' => $price_ttc_nr,
        );
    }

    public function getProductPrices($id_product, $id_attribute, $quantity)
    {
        $use_taxes = !Product::getTaxCalculationMethod();

        $price_ht = Product::getPriceStatic(
            $id_product,
            false,
            $id_attribute,
            6,
            null,
            false,
            true,
            $quantity,
            false,
            null,
            null
        );

        $price_ht_nr = Product::getPriceStatic(
            $id_product,
            false,
            $id_attribute,
            6,
            null,
            false,
            false,
            $quantity,
            false,
            null,
            null
        );

        $price_ttc = Product::getPriceStatic(
            $id_product,
            $use_taxes,
            $id_attribute,
            6,
            null,
            false,
            true,
            $quantity,
            false,
            null,
            null
        );

        $price_ttc_nr = Product::getPriceStatic(
            $id_product,
            !Product::getTaxCalculationMethod(),
            $id_attribute,
            6,
            null,
            false,
            false,
            $quantity,
            false,
            null,
            null
        );

        return array(
            'price_ht'     => $price_ht,
            'price_ht_nr'  => $price_ht_nr,
            'price_ttc'    => $price_ttc,
            'price_ttc_nr' => $price_ttc_nr,
        );
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     * @return float
     */
    public function getPriceEquationResult($id_product, $id_attribute, $input_fields)
    {
        $price_equation = DynamicEquation::getPriceEquation($id_product);
        $price_ht = DynamicEquation::calculatePriceFormula(
            $id_product,
            $id_attribute,
            $price_equation,
            $input_fields
        );
        return $price_ht;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField $input_fields
     * @return float
     */
    public function getWeightEquationResult($id_product, $id_attribute, $input_fields)
    {
        $weight_equation = DynamicEquation::getWeightEquation($id_product);
        $weight = DynamicEquation::calculateWeightFormula(
            $id_product,
            $id_attribute,
            $weight_equation,
            $input_fields
        );
        return $weight;
    }

    /**
     * @param $id_product
     * @param DynamicInputField[] $input_fields
     * @param $changed_field
     */
    public function applyProportions($id_product, &$input_fields, $changed_field)
    {
        if (empty($changed_field)) {
            return;
        }
        $proportions = DynamicProportion::getDataByProduct($id_product);
        $changed_field_value = (int)$input_fields[$changed_field]->value;
        foreach ($proportions as $field_name => $proportion) {
            if ($field_name === $changed_field) {
                $target_field_name = $proportion['target'];
                $value = (float)$proportion['proportion'];
                $target_input_field = $input_fields[$target_field_name];
                $target_input_field->setValue($changed_field_value * $value);
            }
        }
    }

    private function applyReductions($price, $id_product, $specific_price)
    {
        $price = $this->module->calculator->applyGroupReduction($price);
        $price = $this->module->calculator->applyGroupCategoryReduction($price, $id_product);
        return $this->module->calculator->applyReduction($price, $specific_price);
    }

    public function combinePrices($prices, $product_prices)
    {
        return array(
            'price_ht'     => $prices['price_ht'] + $product_prices['price_ht'],
            'price_ht_nr'  => $prices['price_ht_nr'] + $product_prices['price_ht_nr'],
            'price_ttc'    => $prices['price_ttc'] + $product_prices['price_ttc'],
            'price_ttc_nr' => $prices['price_ttc_nr'] + $product_prices['price_ttc_nr'],
        );
    }

    public function multiplyPrices($combined_prices, $quantity)
    {
        return array(
            'price_ht'     => $combined_prices['price_ht'] * $quantity,
            'price_ht_nr'  => $combined_prices['price_ht_nr'] * $quantity,
            'price_ttc'    => $combined_prices['price_ttc'] * $quantity,
            'price_ttc_nr' => $combined_prices['price_ttc_nr'] * $quantity,
        );
    }

    public function formatPrices($final_prices)
    {
        return array(
            'price_ht'     => Tools::displayPrice($final_prices['price_ht']),
            'price_ht_nr'  => Tools::displayPrice($final_prices['price_ht_nr']),
            'price_ttc'    => Tools::displayPrice($final_prices['price_ttc']),
            'price_ttc_nr' => Tools::displayPrice($final_prices['price_ttc_nr']),
        );
    }

    /**
     * @param DynamicInputField[] $input_fields
     * @return array
     */
    public function getCalculatedPrices($id_product, $id_attribute, $input_fields)
    {
        $dynamic_config = new DynamicConfig($id_product);
        $quantity = (int)$input_fields['quantity']->value;

        $price_ht = Tools::convertPriceFull($this->getPriceEquationResult($id_product, $id_attribute, $input_fields));

        $prices = $this->getCustomizationPrices(
            $id_product,
            $id_attribute,
            $price_ht,
            $quantity,
            $this->module->provider->getCart()
        );

        $product_prices = $this->getProductPrices(
            $id_product,
            $id_attribute,
            $quantity
        );

        $final_prices = $this->combinePrices($prices, $product_prices);
        $unit_prices = array(
            'price_ht'     => $final_prices['price_ht'],
            'price_ht_nr'  => $final_prices['price_ht_nr'],
            'price_ttc'    => $final_prices['price_ttc'],
            'price_ttc_nr' => $final_prices['price_ttc_nr'],
        );
        if ($dynamic_config->multiply_price) {
            $final_prices = $this->multiplyPrices($final_prices, $quantity);
        }

        $formatted_unit_prices = $this->formatPrices($unit_prices);
        $formatted_prices = $this->formatPrices($final_prices);

        return array(
            'unit_prices'       => $unit_prices,
            'final_prices'     => $final_prices,
            'formatted_unit_prices' => $formatted_unit_prices,
            'formatted_prices' => $formatted_prices,
            'use_tax'          => !Product::getTaxCalculationMethod(),
        );
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     * @return array
     */
    public function getCalculatedWeight($id_product, $id_attribute, $input_fields)
    {
        $weight = $this->getWeightEquationResult($id_product, $id_attribute, $input_fields);
        $product_weight = $this->module->provider->getProductWeight($id_product, $id_attribute);
        $total_weight = $weight + $product_weight;
        $weight_formatted = $total_weight . ' ' . Configuration::get('PS_WEIGHT_UNIT');
        return array(
            'weight'           => $total_weight,
            'weight_formatted' => $weight_formatted
        );
    }

    public function getFieldsVisibility(array $fields_visibility)
    {
        return array(
            'visibility' => $fields_visibility
        );
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     */
    public function checkProductStock($id_product, $id_attribute, $input_fields)
    {
        $dynamic_input = new DynamicInput();
        $dynamic_input->input_fields = $input_fields;
        $dynamic_input->id_product = $id_product;
        $dynamic_input->id_attribute = $id_attribute;
        $dynamic_input->cart_quantity = $input_fields['quantity']->value;
        return array(
            'in_stock' => DynamicEquation::checkProductStock($dynamic_input)
        );
    }

    public function getDebugMessages($id_product, $id_attribute, $input_fields)
    {
        if (!$this->module->provider->isDevMode()) {
            return array(
                'debug_messages' => null
            );
        }
        $price_equation = DynamicEquation::getPriceEquation($id_product);
        return array(
            'debug_messages' => array(
                'formula'         => $price_equation->formula,
                'formula_literal' => DynamicEquation::getFormulaLiteral(
                    $id_product,
                    $id_attribute,
                    $price_equation->formula,
                    $input_fields
                )
            )
        );
    }
}
