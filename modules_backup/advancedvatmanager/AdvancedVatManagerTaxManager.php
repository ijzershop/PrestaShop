<?php
/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */
 
if (!defined('_PS_VERSION_')) {
    exit;
} 

require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/ValidationEngine.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersVAT.php');

class AdvancedVatManagerTaxManager implements TaxManagerInterface
{   
	public static function isAvailableForThisAddress(Address $address)
	{   
        static $cached_address = null;
        
        // Save Address object into static variable
        if ($address->id_customer !== null) {
            $cached_address = $address;
            ValidationEngine::$id_address_used = $cached_address->id;
        }
        
        // Cart context
        $cart = Context::getContext()->cart;
        if (Tools::getValue('id_cart')) {
            $cart = new Cart(Tools::getValue('id_cart'));
        }
        
        // Change customer default group when address is selected by customer (delivery address)) except when address is deleted.
        if (isset($cached_address->id) && Configuration::get('ADVANCEDVATMANAGER_CHANGE_DEFAULT_GROUP_WITHADDRESS') == 1 && !Tools::getValue('deleteAddress') && !Tools::isSubmit('delete')) {
            ValidationEngine::changeCustomerGroupsByAddress($cached_address->id, $cached_address->id_customer);
        } 
        
        if (Validate::isLoadedObject($cart) && $address->id_customer) {
            $id_customer = $cart->id_customer;
            if (Configuration::get('ADVANCEDVATMANAGER_ADDRESS_TYPE') == 'both') {
                $country_delivery = Address::getCountryAndState($cart->id_address_delivery);
                $country_invoice = Address::getCountryAndState($cart->id_address_invoice);                  
                $noTax = ValidationEngine::checkNoTax($id_customer, $cart->id_address_delivery,($country_delivery?$country_delivery['id_country']:null)) || ValidationEngine::checkNoTax($id_customer, $cart->id_address_invoice,($country_invoice?$country_invoice['id_country']:null));
                ValidationEngine::$id_address_used = $cart->id_address_delivery;   
            }
            else {
                $country_id = Address::getCountryAndState($cart->{Configuration::get('ADVANCEDVATMANAGER_ADDRESS_TYPE')})['id_country'];
                ValidationEngine::$id_address_used = $cart->{Configuration::get('ADVANCEDVATMANAGER_ADDRESS_TYPE')};
                $noTax = ValidationEngine::checkNoTax($id_customer, $cart->{Configuration::get('ADVANCEDVATMANAGER_ADDRESS_TYPE')}, $country_id);  
            } 
            // Save customer vat data in cookie to get it in some places where static variables are not executed.
            Context::getContext()->cookie->__set('customer_vat_data', json_encode(array('id_customer' => $address->id_customer, 'voec_company' => ValidationEngine::$voec_company, 'voec_customer' => ValidationEngine::$voec_customer,'voec_company' => ValidationEngine::$voec_company,  'brexit_customer' => ValidationEngine::$brexit_customer, 'notax_customer' => ValidationEngine::$notax_customer, 'id_address_used' => ValidationEngine::$id_address_used, 'allow_checkout' => ValidationEngine::$allow_checkout, 'no_voec_product' => ValidationEngine::$no_voec_product, 'consumer' => !ValidationEngine::$customer_with_vat_valid)));
            return $noTax; 
        }
        else if ($cached_address) {
            $noTax = ValidationEngine::checkNoTax($cached_address->id_customer, $cached_address->id, $cached_address->id_country);
            ValidationEngine::$id_address_used = $cached_address->id;   
            // Save customer vat data in cookie to get it in some places where static variables are not executed.
            Context::getContext()->cookie->__set('customer_vat_data', json_encode(array('id_customer' => $cached_address->id_customer, 'voec_company' => ValidationEngine::$voec_company, 'voec_customer' => ValidationEngine::$voec_customer,'voec_company' => ValidationEngine::$voec_company,  'brexit_customer' => ValidationEngine::$brexit_customer, 'notax_customer' => ValidationEngine::$notax_customer, 'id_address_used' => ValidationEngine::$id_address_used, 'allow_checkout' => ValidationEngine::$allow_checkout, 'no_voec_product' => ValidationEngine::$no_voec_product, 'consumer' => !ValidationEngine::$customer_with_vat_valid)));
            return $noTax;
        } 
        return false;
	}

    public function getTaxCalculator()
    {
    	$tax = new Tax();
    	$tax->rate = 0;// Set 0% to tax rate if TAX EXEMPT
        return new TaxCalculator(array($tax));    
    }
}