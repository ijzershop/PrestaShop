<?php
class Cart extends CartCore
{
    public $added_to_order;
    public static $definition = array(
        'table' => 'cart',
        'primary' => 'id_cart',
        'fields' => array(
            'id_shop_group' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId'),
            'id_shop' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId'),
            'id_address_delivery' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId'),
            'id_address_invoice' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId'),
            'id_carrier' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId'),
            'id_currency' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'id_customer' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId'),
            'id_guest' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId'),
            'id_lang' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'recyclable' => array('type' => self::TYPE_BOOL, 'validate' => 'isBool'),
            'gift' => array('type' => self::TYPE_BOOL, 'validate' => 'isBool'),
            'gift_message' => array('type' => self::TYPE_STRING, 'validate' => 'isMessage'),
            'mobile_theme' => array('type' => self::TYPE_BOOL, 'validate' => 'isBool'),
            'delivery_option' => array('type' => self::TYPE_STRING),
            'secure_key' => array('type' => self::TYPE_STRING, 'size' => 32),
            'allow_seperated_package' => array('type' => self::TYPE_BOOL, 'validate' => 'isBool'),
            'date_add' => array('type' => self::TYPE_DATE, 'validate' => 'isDate'),
            'date_upd' => array('type' => self::TYPE_DATE, 'validate' => 'isDate'),
            'added_to_order' => array('type' => self::TYPE_STRING),
        ),
    );
    public function getOrderTotal(
        $withTaxes = true,
        $type = Cart::BOTH,
        $products = null,
        $id_carrier = null,
        $use_cache = false
    ) {
        if ((int) $id_carrier <= 0) {
            $id_carrier = null;
        }
        if(!is_null(Context::getContext()->cart->id_carrier) && (int)Context::getContext()->cart->id_carrier > 0) {
            $id_carrier = Context::getContext()->cart->id_carrier;
        }
        if ($type == Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) {
            $type = Cart::ONLY_PRODUCTS;
        }
        $type = (int) $type;
        $allowedTypes = array(
            Cart::ONLY_PRODUCTS,
            Cart::ONLY_DISCOUNTS,
            Cart::BOTH,
            Cart::BOTH_WITHOUT_SHIPPING,
            Cart::ONLY_SHIPPING,
            Cart::ONLY_WRAPPING,
            Cart::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING,
        );
        if (!in_array($type, $allowedTypes)) {
            throw new \Exception('Invalid calculation type: ' . $type);
        }
        if ($type == Cart::ONLY_DISCOUNTS && !CartRule::isFeatureActive()) {
            return 0;
        }
        $virtual = $this->isVirtualCart();
        if ($virtual && $type == Cart::ONLY_SHIPPING) {
            return 0;
        }
        if ($virtual && $type == Cart::BOTH) {
            $type = Cart::BOTH_WITHOUT_SHIPPING;
        }
        if (null === $products) {
            $products = $this->getProducts();
        }
        if ($type == Cart::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING) {
            foreach ($products as $key => $product) {
                if ($product['is_virtual']) {
                    unset($products[$key]);
                }
            }
            $type = Cart::ONLY_PRODUCTS;
        }
        if (Tax::excludeTaxeOption()) {
            $withTaxes = false;
        }
        $cartRules = array();
        if (in_array($type, [Cart::BOTH, Cart::BOTH_WITHOUT_SHIPPING, Cart::ONLY_DISCOUNTS])) {
            $cartRules = $this->getTotalCalculationCartRules($type, $type == Cart::BOTH);
        }
        $calculator = $this->newCalculator($products, $cartRules, $id_carrier);
        $computePrecision = $this->configuration->get('_PS_PRICE_COMPUTE_PRECISION_');
        $small_order_fee_addition = 0;
            switch ($type) {
                case Cart::ONLY_SHIPPING:
                    $calculator->calculateRows();
                    $calculator->calculateFees($computePrecision);
                    $amount = $calculator->getFees()->getInitialShippingFees();
                    break;
                case Cart::ONLY_WRAPPING:
                    $calculator->calculateRows();
                    $calculator->calculateFees($computePrecision);
                    $amount = $calculator->getFees()->getInitialWrappingFees();
                    break;
                case Cart::BOTH:
                    $calculator->processCalculation($computePrecision);
                    $amount = $calculator->getTotal();
                    $productTotal = $calculator->getRowTotal()->getTaxExcluded();
                    if(!Module::isEnabled('smallorderfee') || (!is_null($productTotal) && (double)$productTotal > (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT')) || $productTotal === 0.0){
                       $small_order_fee_addition = 0;
                    } else {
                       $small_order_fee_addition = (double)Configuration::get('SMALLORDERFEE_ORDER_FEE');
                    }
                    break;
                case Cart::BOTH_WITHOUT_SHIPPING:
                    $calculator->calculateRows();
                    $calculator->calculateCartRulesWithoutFreeShipping();
                    $amount = $calculator->getTotal(true);
                    $productTotal = $calculator->getRowTotal()->getTaxExcluded();
                    if(!Module::isEnabled('smallorderfee') || (!is_null($productTotal) && (double)$productTotal > (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT')) || $productTotal === 0.0){
                       $small_order_fee_addition = 0;
                    } else {
                       $small_order_fee_addition = (double)Configuration::get('SMALLORDERFEE_ORDER_FEE');
                    }
                    break;
                case Cart::ONLY_PRODUCTS:
                    $calculator->calculateRows();
                    $amount = $calculator->getRowTotal();
                    break;
                case Cart::ONLY_DISCOUNTS:
                    $calculator->processCalculation($computePrecision);
                    $amount = $calculator->getDiscountTotal();
                    break;
                default:
                    throw new \Exception('unknown cart calculation type : ' . $type);
                }
        $value = $withTaxes ? $amount->getTaxIncluded() + $small_order_fee_addition : $amount->getTaxExcluded() + $small_order_fee_addition;
        $compute_precision = $this->configuration->get('_PS_PRICE_COMPUTE_PRECISION_');
        return Tools::ps_round($value, $compute_precision);
    }


    public function getTotalShippingCost($delivery_option = null, $use_tax = true, Country $default_country = null)
    {
        if (isset(Context::getContext()->cookie->id_country)) {
            $default_country = new Country(Context::getContext()->cookie->id_country);
        }
        if (null === $delivery_option) {
            $delivery_option = $this->getDeliveryOption($default_country, false, false);
        }
        $_total_shipping = array(
            'with_tax' => 0,
            'without_tax' => 0,
        );
        $delivery_option_list = $this->getDeliveryOptionList($default_country);
        foreach ($delivery_option as $id_address => $key) {
            if (!isset($delivery_option_list[$id_address]) || !isset($delivery_option_list[$id_address][$key])) {
                continue;
            }
            $_total_shipping['with_tax'] += $delivery_option_list[$id_address][$key]['total_price_with_tax'];
            $_total_shipping['without_tax'] += $delivery_option_list[$id_address][$key]['total_price_without_tax'];
        }
        $extraShippingFee = 0;
        foreach (Context::getContext()->cart->getProducts() as $key => $prod) {
            $prodObj = new Product($prod['id_product']);
            if($prodObj->oi_offer_extra_shipping > 0 && $extraShippingFee == 0){
                $offerConf = unserialize(Configuration::get('OFFER_INTEGRATION'));
                if($offerConf){
                    $extraShippingFee = $_total_shipping['without_tax']/100*$offerConf['extra_shipping']-$_total_shipping['without_tax'];
                }
            }
        }
        return ($use_tax) ? $_total_shipping['with_tax']+$extraShippingFee: $_total_shipping['without_tax']+$extraShippingFee;
    }
    public function deleteProduct(
        $id_product,
        $id_product_attribute = 0,
        $id_customization = 0,
        $id_address_delivery = 0
    ) {
        if (isset(self::$_nbProducts[$this->id])) {
            unset(self::$_nbProducts[$this->id]);
        }
        if (isset(self::$_totalWeight[$this->id])) {
            unset(self::$_totalWeight[$this->id]);
        }
        if ((int) $id_customization) {
            if (!$this->_deleteCustomization((int) $id_customization, (int) $id_product, (int) $id_product_attribute, (int) $id_address_delivery)) {
                return false;
            }
        }
        $productItem = new Product($id_product);
        if($productItem && $productItem->reference == Configuration::get('MODERNESMIDTHEMECONFIGURATOR_CUSTOM_PRODUCT_REFERENCE')){
            $productItem->delete();
        }
        $result = Db::getInstance()->getRow('
            SELECT SUM(`quantity`) AS \'quantity\'
            FROM `' . _DB_PREFIX_ . 'customization`
            WHERE `id_cart` = ' . (int) $this->id . '
            AND `id_product` = ' . (int) $id_product . '
            AND `id_customization` = ' . (int) $id_customization . '
            AND `id_product_attribute` = ' . (int) $id_product_attribute);
        if ($result === false) {
            return false;
        }
        if (Db::getInstance()->numRows() && (int) $result['quantity']) {
            return Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'cart_product`
                SET `quantity` = ' . (int) $result['quantity'] . '
                WHERE `id_cart` = ' . (int) $this->id . '
                AND `id_product` = ' . (int) $id_product . '
                AND `id_customization` = ' . (int) $id_customization .
                ($id_product_attribute != null ? ' AND `id_product_attribute` = ' . (int) $id_product_attribute : '')
            );
        }
        $preservedGifts = $this->getProductsGifts($id_product, $id_product_attribute);
        if ($preservedGifts[(int) $id_product . '-' . (int) $id_product_attribute] > 0) {
            return Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'cart_product`
                SET `quantity` = ' . (int) $preservedGifts[(int) $id_product . '-' . (int) $id_product_attribute] . '
                WHERE `id_cart` = ' . (int) $this->id . '
                AND `id_product` = ' . (int) $id_product .
                ($id_product_attribute != null ? ' AND `id_product_attribute` = ' . (int) $id_product_attribute : '')
            );
        }
        $result = Db::getInstance()->execute('
        DELETE FROM `' . _DB_PREFIX_ . 'cart_product`
        WHERE `id_product` = ' . (int) $id_product . '
        AND `id_customization` = ' . (int) $id_customization .
            (null !== $id_product_attribute ? ' AND `id_product_attribute` = ' . (int) $id_product_attribute : '') . '
        AND `id_cart` = ' . (int) $this->id . '
        ' . ((int) $id_address_delivery ? 'AND `id_address_delivery` = ' . (int) $id_address_delivery : ''));
        if ($result) {
            $return = $this->update();
            $this->_products = $this->getProducts(true);
            CartRule::autoRemoveFromCart();
            CartRule::autoAddToCart();
            return $return;
        }
        return false;
    }
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
        $auto_add_cart_rule = true,
        $skipAvailabilityCheckOutOfStock = false
    ) {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($id_product)) {
            return parent::updateQty($quantity, $id_product, $id_product_attribute, $id_customization, $operator, $id_address_delivery, $shop, $auto_add_cart_rule, $skipAvailabilityCheckOutOfStock);
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

                    if (!$skipAvailabilityCheckOutOfStock && !Product::isAvailableWhenOutOfStock((int)$result2['out_of_stock'])) {
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
    /*
    * module: dynamicproduct
    * date: 2021-03-08 12:46:15
    * version: 2.8.3
    */
    public function duplicate()
    {
        $id_cart_old = (int)$this->id;
        $result = parent::duplicate();
        $id_cart_new = (int)$this->id;
        if (Module::isEnabled('dynamicproduct')) {

            $module = Module::getInstanceByName('dynamicproduct');
            $module->hookCartDuplicated(array(
                'id_cart_old' => $id_cart_old,
                'id_cart_new' => $id_cart_new,
            ));
        }
        return $result;
    }
}
