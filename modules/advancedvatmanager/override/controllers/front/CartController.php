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

class CartController extends CartControllerCore
{
    public function displayAjaxUpdate()
    {
        if (Module::isEnabled('advancedvatmanager')) {           
            $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
            $cookie_customer_vat_data = json_decode(Context::getContext()->cookie->__get('customer_vat_data'), true);
            $idProductAttribute = 0;
            $non_voec_product = false;
            $product_price = array();
            $groups = Tools::getValue('group');
            
            $productsInCart = $this->context->cart->getProducts();
            $updatedProducts = array_filter($productsInCart, [$this, 'productInCartMatchesCriteria']);
            $updatedProduct = reset($updatedProducts);

            if (!empty($groups)) {
                if (method_exists('Product', 'getIdProductAttributeByIdAttributes')) {
                    $idProductAttribute = (int) Product::getIdProductAttributeByIdAttributes(
                        $this->id_product,
                        $groups,
                        true
                    );
                }
                else if (method_exists('Product', 'getIdProductAttributesByIdAttributes')) {
                    $idProductAttribute = (int) Product::getIdProductAttributesByIdAttributes(
                        $this->id_product,
                        $groups,
                        true
                    );
                }
            }
            if ($idProductAttribute == 0 || !$idProductAttribute) {
                if (Tools::getValue('id_product_attribute')) {
                    $idProductAttribute = (int)Tools::getValue('id_product_attribute');    
                }
                else {
                    $idProductAttribute = $this->id_product_attribute;
                } 
            }
            
            // Only for Checkout page
            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($this->id_product,false,$idProductAttribute))) {
                    $non_voec_product = true; 
                }  
            }
            else if (!empty($productsInCart)) {
                // Check Shopping cart content
                $total_cart = $this->context->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS);
                foreach ($productsInCart as $product) {
                    $product_price[] = Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']);
                    if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']))) {
                        $non_voec_product = true; 
                    }
                    
                }
                //save into cookie
                $this->context->cookie->__set('avm_cart', json_encode(array('total' => $total_cart, 'products' => $product_price))); 
            }
            
            $cookie_customer_vat_data['no_voec_product'] = $non_voec_product;
            Context::getContext()->cookie->__set('customer_vat_data', json_encode($cookie_customer_vat_data));
            
            $checkNotAllowCheckout = $advancedvatmanager->checkNotAllowCheckout();
            
            if ($checkNotAllowCheckout !== false && !$advancedvatmanager->opc_presteamshop_enabled) {
                if (isset($this->updateOperationError)) {
                    $this->updateOperationError[] = $checkNotAllowCheckout; 
                }
                else {
                    $this->errors[] = $checkNotAllowCheckout;   
                }   
            }
        }     
        parent::displayAjaxUpdate();
    }

    public function postProcess()
    {
        if (Module::isEnabled('advancedvatmanager')) {
            if (!Tools::getIsset('add')) {
                parent::postProcess();       
            } 
            $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
            $cookie_customer_vat_data = json_decode(Context::getContext()->cookie->__get('customer_vat_data'), true);
            $idProductAttribute = 0;
            $non_voec_product = false;
            $product_price = array();
            $groups = Tools::getValue('group');
            
            $productsInCart = $this->context->cart->getProducts();
            $updatedProducts = array_filter($productsInCart, [$this, 'productInCartMatchesCriteria']);
            $updatedProduct = reset($updatedProducts);
            
            if (!empty($groups)) {
                $idProductAttribute = (int) Product::getIdProductAttributeByIdAttributes(
                    $this->id_product,
                    $groups,
                    true
                );
            }
            if (Tools::getValue('id_product_attribute')) {
                $idProductAttribute = (int)Tools::getValue('id_product_attribute');    
            }

            // Only for Checkout page
            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($this->id_product,false,$idProductAttribute))) {
                    $non_voec_product = true; 
                }  
            }
            else if (!empty($productsInCart)) {
                // Check Shopping cart content
                $total_cart = $this->context->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS);
                foreach ($productsInCart as $product) {
                    $product_price[] = Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']);
                    if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']))) {
                        $non_voec_product = true; 
                    }
                    
                }
                //save into cookie
                $this->context->cookie->__set('avm_cart', json_encode(array('total' => $total_cart, 'products' => $product_price))); 
            }
            
            $cookie_customer_vat_data['no_voec_product'] = $non_voec_product;
            Context::getContext()->cookie->__set('customer_vat_data', json_encode($cookie_customer_vat_data));
            $checkNotAllowCheckout = $advancedvatmanager->checkNotAllowCheckout();
            
            if ($checkNotAllowCheckout !== false && !$advancedvatmanager->opc_presteamshop_enabled) {
                if (version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
                    $this->errors[] =  $checkNotAllowCheckout;  
                }
                else {
                    if (!Tools::getValue('ajax') || !Tools::getIsset('add') || !Tools::getIsset('update')) {
                        $this->errors[] =  $checkNotAllowCheckout;    
                    }    
                }
            }
            if (Tools::getIsset('add')) {
                parent::postProcess();       
            } 
        }
        else {
            parent::postProcess();       
        }
    }
}
