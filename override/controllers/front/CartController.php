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
    /*
    * module: advancedvatmanager
    * date: 2024-07-10 13:39:04
    * version: 1.7.0
    */
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

            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($this->id_product,false,$idProductAttribute))) {
                    $non_voec_product = true;
                }
            }
            else if (!empty($productsInCart)) {
                $total_cart = $this->context->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS);
                foreach ($productsInCart as $product) {
                    $product_price[] = Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']);
                    if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']))) {
                        $non_voec_product = true;
                    }

                }
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
    /*
    * module: advancedvatmanager
    * date: 2024-07-10 13:39:04
    * version: 1.7.0
    */
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
            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($this->id_product,false,$idProductAttribute))) {
                    $non_voec_product = true;
                }
            }
            else if (!empty($productsInCart)) {
                $total_cart = $this->context->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS);
                foreach ($productsInCart as $product) {
                    $product_price[] = Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']);
                    if ($advancedvatmanager->checkNonVOECProduct(Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']))) {
                        $non_voec_product = true;
                    }

                }
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


    protected function processChangeProductInCart()
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($this->id_product)) {
            return parent::processChangeProductInCart();
        }

        $mode = (Tools::getIsset('update') && $this->id_product) ? 'update' : 'add';
        $ErrorKey = ('update' === $mode) ? 'updateOperationError' : 'errors';

        if (Tools::getIsset('group')) {
            $this->id_product_attribute = (int) Product::getIdProductAttributeByIdAttributes(
                $this->id_product,
                Tools::getValue('group')
            );
        }

        if ($this->qty == 0) {
            $this->{$ErrorKey}[] = $this->trans(
                'Null quantity.',
                array(),
                'Shop.Notifications.Error'
            );
        } elseif (!$this->id_product) {
            $this->{$ErrorKey}[] = $this->trans(
                'Product not found',
                array(),
                'Shop.Notifications.Error'
            );
        }

        $product = new Product($this->id_product, true, $this->context->language->id);
        if (!$product->id || !$product->active || !$product->checkAccess($this->context->cart->id_customer)) {
            $this->{$ErrorKey}[] = $this->trans(
                'This product (%product%) is no longer available.',
                array('%product%' => $product->name),
                'Shop.Notifications.Error'
            );

            return;
        }

        if (!$this->id_product_attribute && $product->hasAttributes()) {
            $minimum_quantity = ($product->out_of_stock == 2)
                ? !Configuration::get('PS_ORDER_OUT_OF_STOCK')
                : !$product->out_of_stock;
            $this->id_product_attribute = Product::getDefaultAttribute($product->id, $minimum_quantity);
            // @todo do something better than a redirect admin !!
            if (!$this->id_product_attribute) {
                Tools::redirectAdmin($this->context->link->getProductLink($product));
            }
        }

        $qty_to_check = $this->qty;
        $cart_products = $this->context->cart->getProducts();

        $cart_qty = 0;
        if (is_array($cart_products)) {
            foreach ($cart_products as $cart_product) {
                if (isset($this->id_product) && $cart_product['id_product'] == $this->id_product) {
                    $cart_qty += $cart_product['cart_quantity'];
                }
            }

            if ($cart_qty) {
                $qty_to_check = $cart_qty;

                if (Tools::getValue('op', 'up') == 'down') {
                    $qty_to_check -= $this->qty;
                } else {
                    $qty_to_check += $this->qty;
                }
            }
        }

        // Check product quantity availability
        if ('update' !== $mode && $this->shouldAvailabilityErrorBeRaised($product, $qty_to_check)) {
            $this->{$ErrorKey}[] = $this->trans(
                'The item %product% in your cart is no longer available in this quantity. You cannot proceed with your order until the quantity is adjusted.',
                array('%product%' => $product->name),
                'Shop.Notifications.Error'
            );
        }

        // Check minimal_quantity
        if (!$this->id_product_attribute) {
            if ($qty_to_check < $product->minimal_quantity) {
                $this->errors[] = $this->trans(
                    'The minimum purchase order quantity for the product %product% is %quantity%.',
                    array('%product%' => $product->name, '%quantity%' => $product->minimal_quantity),
                    'Shop.Notifications.Error'
                );

                return;
            }
        } else {
            $combination = new Combination($this->id_product_attribute);
            if ($qty_to_check < $combination->minimal_quantity) {
                $this->errors[] = $this->trans(
                    'The minimum purchase order quantity for the product %product% is %quantity%.',
                    array('%product%' => $product->name, '%quantity%' => $combination->minimal_quantity),
                    'Shop.Notifications.Error'
                );

                return;
            }
        }

        // If no errors, process product addition
        if (!$this->errors) {
            // Add cart if no cart found
            if (!$this->context->cart->id) {
                if (Context::getContext()->cookie->id_guest) {
                    $guest = new Guest(Context::getContext()->cookie->id_guest);
                    $this->context->cart->mobile_theme = $guest->mobile_theme;
                }
                $this->context->cart->add();
                if ($this->context->cart->id) {
                    $this->context->cookie->id_cart = (int) $this->context->cart->id;
                }
            }

            // Check customizable fields

            if (!$product->hasAllRequiredCustomizableFields() && !$this->customization_id) {
                $this->{$ErrorKey}[] = $this->trans(
                    'Please fill in all of the required fields, and then save your customizations.',
                    array(),
                    'Shop.Notifications.Error'
                );
            }

            if (!$this->errors) {
                $cart_rules = $this->context->cart->getCartRules();
                $available_cart_rules = CartRule::getCustomerCartRules(
                    $this->context->language->id,
                    (isset($this->context->customer->id) ? $this->context->customer->id : 0),
                    true,
                    true,
                    true,
                    $this->context->cart,
                    false,
                    true
                );
                $update_quantity = $this->context->cart->updateQty(
                    $this->qty,
                    $this->id_product,
                    $this->id_product_attribute,
                    $this->customization_id,
                    Tools::getValue('op', 'up'),
                    $this->id_address_delivery,
                    null,
                    true,
                    true
                );
                if ($update_quantity < 0) {
                    // If product has attribute, minimal quantity is set with minimal quantity of attribute
                    $minimal_quantity = ($this->id_product_attribute)
                        ? Attribute::getAttributeMinimalQty($this->id_product_attribute)
                        : $product->minimal_quantity;
                    $this->{$ErrorKey}[] = $this->trans(
                        'You must add %quantity% minimum quantity',
                        array('%quantity%' => $minimal_quantity),
                        'Shop.Notifications.Error'
                    );
                } elseif (!$update_quantity) {
                    $this->errors[] = $this->trans(
                        'You already have the maximum quantity available for this product.',
                        array(),
                        'Shop.Notifications.Error'
                    );
                } elseif ($this->shouldAvailabilityErrorBeRaised($product, $qty_to_check)) {
                    // check quantity after cart quantity update
                    $this->{$ErrorKey}[] = $this->trans(
                        'The item %product% in your cart is no longer available in this quantity. You cannot proceed with your order until the quantity is adjusted.',
                        array('%product%' => $product->name),
                        'Shop.Notifications.Error'
                    );
                }
            }
        }

        $removed = CartRule::autoRemoveFromCart();
        CartRule::autoAddToCart();
    }

}
