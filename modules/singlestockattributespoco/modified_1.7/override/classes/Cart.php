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

class Cart extends CartCore
{
    public function containsProduct($id_product, $id_product_attribute = 0, $id_customization = 0, $id_address_delivery = 0)
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($id_product)) {
            return parent::containsProduct($id_product, $id_product_attribute, $id_customization, $id_address_delivery);
        }

        $sql = 'SELECT cp.`quantity` FROM `'._DB_PREFIX_.'cart_product` cp';

        if ($id_customization) {
            $sql .= '
                LEFT JOIN `'._DB_PREFIX_.'customization` c ON (
                    c.`id_product` = cp.`id_product`
                    AND c.`id_product_attribute` = cp.`id_product_attribute`
                )';
        }

        $sql .= '
            WHERE cp.`id_product` = '.(int)$id_product.'
            AND cp.`id_product_attribute` = '.(int)$id_product_attribute.'
            AND cp.`id_customization` = '.(int)$id_customization.'
            AND cp.`id_cart` = '.(int)$this->id;
        if (Configuration::get('PS_ALLOW_MULTISHIPPING') && $this->isMultiAddressDelivery()) {
            $sql .= ' AND cp.`id_address_delivery` = '.(int)$id_address_delivery;
        }

        if ($id_customization) {
            $sql .= ' AND c.`id_customization` = '.(int)$id_customization;
        }
        /*
        * Modified to return the total products from the cart if the current attribute is already there.
        * This is needed because if this function returns a result, then PS will try to update the quantity
        * of the product in the cart, rather than add it to the cart.
        */
        $ret = Db::getInstance()->getRow($sql);
        if ($ret['quantity'] > 0) {
            $sql = 'SELECT sum(cp.`quantity`) as qty FROM `'._DB_PREFIX_.'cart_product` cp
                WHERE cp.`id_product` = '.(int)$id_product.'
                AND cp.`id_cart` = '.(int)$this->id;
            $qty = Db::getInstance()->getRow($sql);
            if (isset($qty['qty'])) {
                $ret['quantity'] = $qty['qty'];
            }
        }
        return $ret;
    }
    
    /**
     * Update Product quantity
     *
     * @param int    $quantity             Quantity to add (or substract)
     * @param int    $id_product           Product ID
     * @param int    $id_product_attribute Attribute ID if needed
     * @param string $operator             Indicate if quantity must be increased or decreased
     *
     * @return bool Whether the quantity has been succesfully updated
     */
    public function updateQty(
        $quantity,
        $id_product,
        $id_product_attribute = null,
        $id_customization = false,
        $operator = 'up',
        $id_address_delivery = 0,
        Shop $shop = null,
        $auto_add_cart_rule = true
    ) {
        $ssa = Module::getInstanceByName('singlestockattributes');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($id_product)) {
            return parent::updateQty($quantity, $id_product, $id_product_attribute, $id_customization, $operator, $id_address_delivery, $shop, $auto_add_cart_rule);
        }

        if (!$shop) {
            $shop = Context::getContext()->shop;
        }

        if (Context::getContext()->customer->id) {
            if ($id_address_delivery == 0 && (int)$this->id_address_delivery) { // The $id_address_delivery is null, use the cart delivery address
                $id_address_delivery = $this->id_address_delivery;
            } elseif ($id_address_delivery == 0) { // The $id_address_delivery is null, get the default customer address
                $id_address_delivery = (int)Address::getFirstCustomerAddressId((int)Context::getContext()->customer->id);
            } elseif (!Customer::customerHasAddress(Context::getContext()->customer->id, $id_address_delivery)) { // The $id_address_delivery must be linked with customer
                $id_address_delivery = 0;
            }
        }

        $quantity = (int)$quantity;
        $id_product = (int)$id_product;
        $id_product_attribute = (int)$id_product_attribute;
        $product = new Product($id_product, false, Configuration::get('PS_LANG_DEFAULT'), $shop->id);

        if ($id_product_attribute) {
            $combination = new Combination((int)$id_product_attribute);
            if ($combination->id_product != $id_product) {
                return false;
            }
        }
        $id_product_attribute_default = Product::getDefaultAttribute($id_product);

        /* If we have a product combination, the minimal quantity is set with the one of this combination */
        if (!empty($id_product_attribute)) {
            $minimal_quantity = (int)Attribute::getAttributeMinimalQty($id_product_attribute);
        } else {
            $minimal_quantity = (int)$product->minimal_quantity;
        }

        if (!Validate::isLoadedObject($product)) {
            die(Tools::displayError());
        }

        if (isset(self::$_nbProducts[$this->id])) {
            unset(self::$_nbProducts[$this->id]);
        }

        if (isset(self::$_totalWeight[$this->id])) {
            unset(self::$_totalWeight[$this->id]);
        }

        $data = array(
            'cart' => $this,
            'product' => $product,
            'id_product_attribute' => $id_product_attribute,
            'id_customization' => $id_customization,
            'quantity' => $quantity,
            'operator' => $operator,
            'id_address_delivery' => $id_address_delivery,
            'shop' => $shop,
            'auto_add_cart_rule' => $auto_add_cart_rule,
        );

        /* @deprecated deprecated since 1.6.1.1 */
        // Hook::exec('actionBeforeCartUpdateQty', $data);
        Hook::exec('actionCartUpdateQuantityBefore', $data);

        if ((int)$quantity <= 0) {
            return $this->deleteProduct($id_product, $id_product_attribute, (int)$id_customization);
        } elseif (!$product->available_for_order || (Configuration::isCatalogMode() && !defined('_PS_ADMIN_DIR_'))) {
            return false;
        } else {
            /* Check if the product is already in the cart */
            $result = $this->containsProduct($id_product, $id_product_attribute, (int)$id_customization, (int)$id_address_delivery);

            /* Update quantity if product already exist */
            if ($result) {
                if ($operator == 'up') {
                    $sql = 'SELECT stock.out_of_stock, IFNULL(stock.quantity, 0) as quantity
                            FROM '._DB_PREFIX_.'product p
                            '.Product::sqlStock('p', $id_product_attribute_default, true, $shop).'
                            WHERE p.id_product = '.$id_product;

                    $result2 = Db::getInstance()->getRow($sql);
                    $product_qty = (int)$result2['quantity'];
                    // Quantity for product pack
                    if (Pack::isPack($id_product)) {
                        $product_qty = Pack::getQuantity($id_product, $id_product_attribute);
                    }
                    $new_qty = (int)$result['quantity'] + (int)$quantity;
                    $qty = '+ '.(int)$quantity;

                    if (!Product::isAvailableWhenOutOfStock((int)$result2['out_of_stock'])) {
                        if ($new_qty > $product_qty) {
                            return false;
                        }
                    }
                } elseif ($operator == 'down') {
                    $qty = '- '.(int)$quantity;
                    $new_qty = (int)$result['quantity'] - (int)$quantity;
                    if ($new_qty < $minimal_quantity && $minimal_quantity > 1) {
                        return -1;
                    }
                } else {
                    return false;
                }

                /* Delete product from cart */
                if ($new_qty <= 0) {
                    return $this->deleteProduct((int)$id_product, (int)$id_product_attribute, (int)$id_customization);
                } elseif ($new_qty < $minimal_quantity) {
                    return -1;
                } else {
                    Db::getInstance()->execute(
                        'UPDATE `'._DB_PREFIX_.'cart_product`
                        SET `quantity` = `quantity` '.$qty.'
                        WHERE `id_product` = '.(int)$id_product.
                        ' AND `id_customization` = '.(int)$id_customization.
                        (!empty($id_product_attribute) ? ' AND `id_product_attribute` = '.(int)$id_product_attribute : '').'
                        AND `id_cart` = '.(int)$this->id.(Configuration::get('PS_ALLOW_MULTISHIPPING') && $this->isMultiAddressDelivery() ? ' AND `id_address_delivery` = '.(int)$id_address_delivery : '').'
                        LIMIT 1'
                    );
                }
            } elseif ($operator == 'up') {
                /* Add product to the cart */

                $sql = 'SELECT stock.out_of_stock, IFNULL(stock.quantity, 0) as quantity
                        FROM '._DB_PREFIX_.'product p
                        '.Product::sqlStock('p', $id_product_attribute_default, true, $shop).'
                        WHERE p.id_product = '.$id_product;

                $result2 = Db::getInstance()->getRow($sql);

                // Quantity for product pack
                if (Pack::isPack($id_product)) {
                    $result2['quantity'] = Pack::getQuantity($id_product, $id_product_attribute);
                }

                /*
                * Added for checking product count in cart with different combinations.
                * They must be not more than default combination count in stock.
                */
                $cart_items = $this->getWsCartRows();
                $product_qty_by_id = 0;
                foreach ($cart_items as $cart_item) {
                    if ($cart_item['id_product'] == $id_product) {
                        $product_qty_by_id += (int)$cart_item['quantity'];
                    }
                }

                if (!Product::isAvailableWhenOutOfStock((int)$result2['out_of_stock'])) {
                    if (((int)$quantity+(int)$product_qty_by_id) > $result2['quantity']) {
                        return false;
                    }
                }

                if ((int)$quantity < $minimal_quantity) {
                    return -1;
                }

                $result_add = Db::getInstance()->insert('cart_product', array(
                    'id_product' =>            (int)$id_product,
                    'id_product_attribute' =>    (int)$id_product_attribute,
                    'id_cart' =>                (int)$this->id,
                    'id_address_delivery' =>    (int)$id_address_delivery,
                    'id_shop' =>                $shop->id,
                    'quantity' =>                (int)$quantity,
                    'date_add' =>                date('Y-m-d H:i:s'),
                    'id_customization' =>       (int)$id_customization,
                ));

                if (!$result_add) {
                    return false;
                }
            }
        }

        // refresh cache of self::_products
        $this->_products = $this->getProducts(true);
        $this->update();
        $context = Context::getContext()->cloneContext();
        $context->cart = $this;
        Cache::clean('getContextualValue_*');
        if ($auto_add_cart_rule) {
            CartRule::autoAddToCart($context);
        }

        if ($product->customizable) {
            return $this->_updateCustomizationQuantity((int)$quantity, (int)$id_customization, (int)$id_product, (int)$id_product_attribute, (int)$id_address_delivery, $operator);
        } else {
            return true;
        }
    }

    public function checkQuantities($returnProductOnFailure = false)
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (Configuration::isCatalogMode() && !defined('_PS_ADMIN_DIR_')) {
            return false;
        }

        foreach ($this->getProducts() as $product) {
            if (
                !$this->allow_seperated_package &&
                !$product['allow_oosp'] &&
                StockAvailable::dependsOnStock($product['id_product']) &&
                $product['advanced_stock_management'] &&
                (bool) Context::getContext()->customer->isLogged() &&
                ($delivery = $this->getDeliveryOption()) &&
                !empty($delivery)
            ) {
                $product['stock_quantity'] = StockManager::getStockByCarrier(
                    (int) $product['id_product'],
                    (int) $product['id_product_attribute'],
                    $delivery
                );
            }

            if (
                !$product['active'] ||
                !$product['available_for_order'] ||
                (!$product['allow_oosp'] && $product['stock_quantity'] < $product['cart_quantity'])
            ) {
                return $returnProductOnFailure ? $product : false;
            }

            if (!$product['allow_oosp']) {
                if (!$ssa || !$ssa->active || !$ssa->useSSA($product['id_product'])) {
                    $productQuantity = Product::getQuantity(
                        $product['id_product'],
                        $product['id_product_attribute'],
                        null,
                        $this,
                        $product['id_customization']
                    );
                } else {
                    $productQuantity = Product::getQuantity(
                        $product['id_product'],
                        $product['id_product_attribute'],
                        null,
                        null,
                        $product['id_customization']
                    );
                    $cart_qty = 0;
                    foreach ($this->getProducts() as $cart_product) {
                        if ($cart_product['id_product'] == $product['id_product']) {
                            $cart_qty += $cart_product['cart_quantity'];
                        }
                    }
                    $productQuantity -= $cart_qty;
                }
                if ($productQuantity < 0) {
                    return $returnProductOnFailure ? $product : false;
                }
            }
        }

        return true;
    }
}
