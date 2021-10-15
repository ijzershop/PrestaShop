<?php
/**
 * 2010-2021 Tuni-Soft
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
 * @copyright 2010-2021 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\module;

use Address;
use classes\DynamicTools;
use classes\helpers\DynamicCalculatorHelper;
use classes\models\DynamicConfig;
use Configuration;
use Context;
use Customer;
use DynamicProduct;
use Exception;
use Group;
use GroupReductionCore;
use PrestaShopLogger;
use Product;
use SpecificPrice;
use Tax;
use Validate;

class DynamicCalculator
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    private $addresses = array();

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function getTax($id_product, $force_tax = false, $cart = false)
    {
        if (!$cart && Validate::isLoadedObject($this->context->cart)) {
            $cart = $this->context->cart;
        }

        if (Validate::isLoadedObject($cart)) {
            $id_customer = (int)$cart->id_customer;
        } else {
            $id_customer = $this->module->provider->getCustomer();
        }

        if (Tax::excludeTaxeOption()) {
            return 0;
        }

        if ($id_customer) {
            $tax_calculation_method = (int)Group::getPriceDisplayMethod(Customer::getDefaultGroupId($id_customer));
        } else {
            $tax_calculation_method = (int)Group::getPriceDisplayMethod((int)Group::getCurrent()->id);
        }

        if ($tax_calculation_method === PS_TAX_EXC && !$force_tax) {
            return 0;
        }

        if (Validate::isLoadedObject($cart)) {
            $address = $this->getAddress($cart->{Configuration::get('PS_TAX_ADDRESS_TYPE')});
        } else {
            $address = new Address(0);
        }
        return (float)Tax::getProductTaxRate(
            (int)$id_product,
            (int)$address->id,
            DynamicTools::getContext()
        );
    }

    public function applyTax($result, $cart = false, $force_tax = false, $id_product = false)
    {
        if (!$id_product) {
            return $result;
        }
        $tax_rate = $this->getTax($id_product, $force_tax, $cart);
        if ($tax_rate) {
            $result *= (1 + $tax_rate / 100);
        }
        return $result;
    }

    public function getReduction($customized_data)
    {
        $specific_price = SpecificPrice::getSpecificPrice(
            (int)$customized_data['id_product'],
            (int)$this->context->shop->id,
            (int)$this->module->provider->getCurrency(),
            (int)$this->module->provider->getCountry(),
            (int)$this->context->customer->id_default_group,
            (int)$customized_data['quantity'],
            (int)$customized_data['id_product_attribute'],
            (int)$this->module->provider->getCustomer(),
            (int)$customized_data['id_cart']
        );
        return $specific_price;
    }

    public function getProductReduction($id_product)
    {
        return SpecificPrice::getSpecificPrice(
            (int)$id_product,
            (int)$this->context->shop->id,
            (int)$this->module->provider->getCurrency(),
            (int)$this->module->provider->getCountry(),
            (int)$this->module->provider->getCustomerGroup(),
            1,
            Product::getDefaultAttribute($id_product),
            (int)$this->module->provider->getCustomer(),
            (int)$this->module->provider->getCart()
        );
    }

    public function applyReduction($price, $specific_price)
    {
        if (!$specific_price) {
            return $price;
        }
        $type = $specific_price['reduction_type'];
        $reduction = (float)$specific_price['reduction'];
        if ($type === 'percentage') {
            $price -= $price * $reduction;
        }
        return $price;
    }

    public function applyGroupReduction($price, $id_cart = null)
    {
        if (!$id_cart) {
            $id_customer = $this->module->provider->getCustomer();
        } else {
            $id_customer = $this->module->provider->getCustomerFromCart($id_cart);
        }
        $group_reduction = Group::getReduction($id_customer);
        $reduction = (float)$group_reduction / 100;
        $price -= $price * $reduction;
        return $price;
    }

    public function applyGroupCategoryReduction($price, $id_product, $id_cart = null)
    {
        if (!$id_cart) {
            $id_customer = $this->module->provider->getCustomer();
        } else {
            $id_customer = $this->module->provider->getCustomerFromCart($id_cart);
        }
        $id_group = $id_customer ? Customer::getDefaultGroupId($id_customer) : (int)Group::getCurrent()->id;
        $reduction = GroupReductionCore::getValueForProduct($id_product, $id_group);
        $price -= $price * (float)$reduction;
        return array($price, $reduction);
    }

    public function getAddress($id_address)
    {
        if (isset($this->addresses[$id_address])) {
            return $this->addresses[$id_address];
        }
        return $this->addresses[$id_address] = new Address($id_address);
    }

    private function calculateDisplayPrice($id_product, $display_price, $with_tax = true, $use_reduc = true)
    {
        $result = $display_price;
        if ($with_tax) {
            $result = $this->module->calculator->applyTax($result, false, false, $id_product);
        }
        $calculator_helper = new DynamicCalculatorHelper($this->module, $this->context);
        if ($use_reduc) {
            $result = $calculator_helper->applyReductions(
                $result,
                $id_product,
                $this->getProductReduction($id_product)
            );
        }
        return $result;
    }

    public function assignProductPrices($product, $display_price, &$result)
    {
        $id_product = (int)$product['id_product'];

        $dynamic_config = DynamicConfig::getByProduct($id_product);

        $id_attribute = isset($product['id_product_attribute']) ?
            (int)$product['id_product_attribute'] :
            (int)Product::getDefaultAttribute($id_product);
        $product_price_ttc = Product::getPriceStatic(
            $id_product,
            !Product::getTaxCalculationMethod(),
            $id_attribute
        );

        $product_price_ht = Product::getPriceStatic(
            $id_product,
            false,
            $id_attribute
        );

        $product_price_nr = Product::getPriceStatic(
            $id_product,
            !Product::getTaxCalculationMethod(),
            $id_attribute,
            6,
            null,
            false,
            false
        );

        if ($dynamic_config->display_dynamic_price) {
            $dynamic_calculator_helper = new DynamicCalculatorHelper($this->module, $this->context);
            try {
                $display_price = $dynamic_calculator_helper->calculateDisplayPrice(
                    $id_product,
                    $id_attribute
                );
            } catch (Exception $e) {
                PrestaShopLogger::addLog(
                    sprintf('Error in formula: %s', DynamicTools::reportException($e, true)),
                    3,
                    1,
                    'Product',
                    $id_product,
                    false
                );
            }
        }

        $display_price_ttc = $this->calculateDisplayPrice($id_product, $display_price);
        $display_price_ht = $this->calculateDisplayPrice($id_product, $display_price, false);
        $display_price_nr = $this->calculateDisplayPrice($id_product, $display_price, true, false);

        $price_ttc = $display_price_ttc + $product_price_ttc;
        $price_ht = $display_price_ht + $product_price_ht;
        $price_nr = $display_price_nr + $product_price_nr;

        $result['price'] = $price_ttc;
        $result['price_tax_exc'] = $price_ht;
        $result['price_without_reduction'] = $price_nr;
    }
}
