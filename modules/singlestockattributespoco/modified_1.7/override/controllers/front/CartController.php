<?php
/**
 * 2008 - 2020 Presto-Changeo
 *
 * MODULE Single Stock Attributes
 *
 * @author    Presto-Changeo <info@presto-changeo.com>
 * @copyright Copyright (c) permanent, Presto-Changeo
 * @license   Addons PrestaShop license limitation
 * @link      http://www.presto-changeo.com
 * @version   2.0.0
 *
 * NOTICE OF LICENSE
 *
 * Don't use this module on several shops. The license provided by PrestaShop Addons
 * for all its modules is valid only once for a single shop.
 *
 */

class CartController extends CartControllerCore
{
    protected function processChangeProductInCart()
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($this->id_product)) {
            return parent::processChangeProductInCart();
        }

        $mode = (Tools::getIsset('update') && $this->id_product) ? 'update' : 'add';

        if (Tools::getIsset('group')) {
            $this->id_product_attribute = (int)Product::getIdProductAttributesByIdAttributes($this->id_product, Tools::getValue('group'));
        }

        if ($this->qty == 0) {
            $this->errors[] = $this->trans('Null quantity.', array(), 'Shop.Notifications.Error');
        } elseif (!$this->id_product) {
            $this->errors[] = $this->trans('Product not found', array(), 'Shop.Notifications.Error');
        }

        $product = new Product($this->id_product, true, $this->context->language->id);
        if (!$product->id || !$product->active || !$product->checkAccess($this->context->cart->id_customer)) {
            $this->errors[] = $this->trans('This product is no longer available.', array(), 'Shop.Notifications.Error');
            return;
        }

        if (!$this->id_product_attribute && $product->hasAttributes()) {
            $minimum_quantity = ($product->out_of_stock == 2) ? !Configuration::get('PS_ORDER_OUT_OF_STOCK') : !$product->out_of_stock;
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
        if ($this->id_product_attribute) {
            if (!Product::isAvailableWhenOutOfStock($product->out_of_stock) && !Attribute::checkAttributeQty($this->id_product_attribute, $qty_to_check)) {
                $this->errors[] = $this->trans('There are not enough products in stock', array(), 'Shop.Notifications.Error');
            }
        } elseif (!$product->checkQty($qty_to_check)) {
            $this->errors[] = $this->trans('There are not enough products in stock', array(), 'Shop.Notifications.Error');
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
                    $this->context->cookie->id_cart = (int)$this->context->cart->id;
                }
            }

            // Check customizable fields
            if (!$product->hasAllRequiredCustomizableFields() && !$this->customization_id) {
                $this->errors[] = $this->trans('Please fill in all of the required fields, and then save your customizations.', array(), 'Shop.Notifications.Error');
            }

            if (!$this->errors) {
                $cart_rules = $this->context->cart->getCartRules();
                $available_cart_rules = CartRule::getCustomerCartRules($this->context->language->id, (isset($this->context->customer->id) ? $this->context->customer->id : 0), true, true, true, $this->context->cart, false, true);
                $update_quantity = $this->context->cart->updateQty($this->qty, $this->id_product, $this->id_product_attribute, $this->customization_id, Tools::getValue('op', 'up'), $this->id_address_delivery);
                if ($update_quantity < 0) {
                    // If product has attribute, minimal quantity is set with minimal quantity of attribute
                    $minimal_quantity = ($this->id_product_attribute) ? Attribute::getAttributeMinimalQty($this->id_product_attribute) : $product->minimal_quantity;
                    $this->errors[] = $this->trans('You must add %d minimum quantity', array($minimal_quantity), 'Shop.Notifications.Error');
                } elseif (!$update_quantity) {
                    $this->errors[] = $this->trans('You already have the maximum quantity available for this product.', array(), 'Shop.Notifications.Error');
                }
            }
        }

        $removed = CartRule::autoRemoveFromCart();
        CartRule::autoAddToCart();
    }
}
