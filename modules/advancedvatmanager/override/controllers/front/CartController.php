<?php
/**
 * 2007-2016 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2016 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
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
