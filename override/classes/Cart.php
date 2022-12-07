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
        $use_cache = false,
        bool $keepOrderPrices = false
    ) {
        if ((int)$id_carrier <= 0) {
            $id_carrier = null;
        }
        if (!is_null(Context::getContext()->cart) && (int)Context::getContext()->cart->id_carrier > 0) {
            $id_carrier = Context::getContext()->cart->id_carrier;
        }
        if($id_carrier == 0 && !empty($cart->delivery_option)){
            $deliveryOption = json_decode($cart->delivery_option);
            $id_carrier = reset($deliveryOption);
            $cart->id_carrier = $id_carrier;
            $order->id_carrier = $id_carrier;
        }
        if ($type == Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) {
            $type = Cart::ONLY_PRODUCTS;
        }
        $type = (int)$type;
        $allowedTypes = [
            Cart::ONLY_PRODUCTS,
            Cart::ONLY_DISCOUNTS,
            Cart::BOTH,
            Cart::BOTH_WITHOUT_SHIPPING,
            Cart::ONLY_SHIPPING,
            Cart::ONLY_WRAPPING,
            Cart::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING,
        ];
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
            $products = $this->getProducts(false, false, null, true, $keepOrderPrices);
        }
        if ($type == Cart::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING) {
            foreach ($products as $key => $product) {
                if (!empty($product['is_virtual'])) {
                    unset($products[$key]);
                }
            }
            $type = Cart::ONLY_PRODUCTS;
        }
        if ($type == Cart::ONLY_PRODUCTS) {
            foreach ($products as $key => $product) {
                if (!empty($product['is_gift'])) {
                    unset($products[$key]);
                }
            }
        }
        if (Tax::excludeTaxeOption()) {
            $withTaxes = false;
        }
        $cartRules = [];
        if (in_array($type, [Cart::BOTH, Cart::BOTH_WITHOUT_SHIPPING, Cart::ONLY_DISCOUNTS])) {
            $cartRules = $this->getTotalCalculationCartRules($type, $type == Cart::BOTH);
        }
        $computePrecision = Context::getContext()->getComputingPrecision();
        $calculator = $this->newCalculator($products, $cartRules, $id_carrier, $computePrecision, $keepOrderPrices);
        $small_order_fee_addition = 0;
        $discounts = 0;

        switch ($type) {
            case Cart::ONLY_SHIPPING:
                $calculator->calculateRows();
                $calculator->calculateFees();
                $amount = $calculator->getFees()->getInitialShippingFees();
                break;
            case Cart::ONLY_WRAPPING:
                $calculator->calculateRows();
                $calculator->calculateFees();
                $amount = $calculator->getFees()->getInitialWrappingFees();
                break;
            case Cart::BOTH:
                $calculator->processCalculation();
                $amount = $calculator->getTotal();
                $productTotal = $calculator->getRowTotal()->getTaxExcluded();

                if (!Module::isEnabled('smallorderfee') || (!is_null($productTotal) && (double)$productTotal > (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT')) || $productTotal === 0.0) {
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
                if (!Module::isEnabled('smallorderfee') || (!is_null($productTotal) && (double)$productTotal > (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT')) || $productTotal === 0.0) {
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
                $calculator->processCalculation();
                $amount = $calculator->getDiscountTotal();
                break;
            default:
                throw new \Exception('unknown cart calculation type : ' . $type);
        }
        $value = $withTaxes ? $amount->getTaxIncluded() + $small_order_fee_addition : $amount->getTaxExcluded() + $small_order_fee_addition;

        return Tools::ps_round($value, $computePrecision);
    }


    public function getTotalShippingCost($delivery_option = null, $use_tax = true, Country $default_country = null)
    {
        if (isset(Context::getContext()->cookie->id_country)) {
            $default_country = new Country(Context::getContext()->cookie->id_country);
        }
        if (null === $delivery_option) {
            $delivery_option = $this->getDeliveryOption($default_country, false, false);
        }
        $_total_shipping = [
            'with_tax' => 0,
            'without_tax' => 0,
        ];
        $delivery_option_list = $this->getDeliveryOptionList($default_country);
        foreach ($delivery_option as $id_address => $key) {
            if (!isset($delivery_option_list[$id_address]) || !isset($delivery_option_list[$id_address][$key])) {
                continue;
            }
            $_total_shipping['with_tax'] += $delivery_option_list[$id_address][$key]['total_price_with_tax'];
            $_total_shipping['without_tax'] += $delivery_option_list[$id_address][$key]['total_price_without_tax'];
        }
        $extraShippingFee = 0;
        if (Module::isEnabled('offerintegration')) {
            foreach (Context::getContext()->cart->getProducts() as $key => $prod) {
                $prodObj = new Product($prod['id_product']);
                if ($prodObj->oi_offer_extra_shipping > 0 && $extraShippingFee == 0) {
                    $offerConf = unserialize(Configuration::get('OFFER_INTEGRATION'));
                    if ($offerConf) {
                        $extraShippingFee = $_total_shipping['without_tax'] / 100 * $offerConf['extra_shipping'] - $_total_shipping['without_tax'];
                    }
                }
            }
        }
        return ($use_tax) ? $_total_shipping['with_tax'] + $extraShippingFee : $_total_shipping['without_tax'] + $extraShippingFee;
    }
    public function getPackageShippingCost(
        $id_carrier = null,
        $use_tax = true,
        Country $default_country = null,
        $product_list = null,
        $id_zone = null,
        bool $keepOrderPrices = false
    ) {
        if ($this->isVirtualCart()) {
            return 0;
        }
        if (!$default_country) {
            $default_country = Context::getContext()->country;
        }
        if (null === $product_list) {
            $products = $this->getProducts(false, false, null, true, $keepOrderPrices);
        } else {
            foreach ($product_list as $key => $value) {
                if ($value['is_virtual'] == 1) {
                    unset($product_list[$key]);
                }
            }
            $products = $product_list;
        }
        if (Configuration::get('PS_TAX_ADDRESS_TYPE') == 'id_address_invoice') {
            $address_id = (int)$this->id_address_invoice;
        } elseif (is_array($product_list) && count($product_list)) {
            $prod = current($product_list);
            $address_id = (int)$prod['id_address_delivery'];
        } else {
            $address_id = null;
        }
        if (!Address::addressExists($address_id)) {
            $address_id = null;
        }
        if (null === $id_carrier && !empty($this->id_carrier)) {
            $id_carrier = (int)$this->id_carrier;
        }
        $cache_id = 'getPackageShippingCost_' . (int)$this->id . '_' . (int)$address_id . '_' . (int)$id_carrier . '_' . (int)$use_tax . '_' . (int)$default_country->id . '_' . (int)$id_zone;
        if ($products) {
            foreach ($products as $product) {
                $cache_id .= '_' . (int)$product['id_product'] . '_' . (int)$product['id_product_attribute'];
            }
        }
        if (Cache::isStored($cache_id)) {
            return Cache::retrieve($cache_id);
        }
        $order_total = $this->getOrderTotal(true, Cart::BOTH_WITHOUT_SHIPPING, $product_list, $id_carrier, false,
            $keepOrderPrices);
        $shipping_cost = 0;
        if (!count($products)) {
            Cache::store($cache_id, $shipping_cost);
            return $shipping_cost;
        }
        if (!isset($id_zone)) {
            if (!$this->isMultiAddressDelivery()
                && isset($this->id_address_delivery) // Be careful, id_address_delivery is not useful one 1.5
                && $this->id_address_delivery
                && Customer::customerHasAddress($this->id_customer, $this->id_address_delivery)
            ) {
                $id_zone = Address::getZoneById((int)$this->id_address_delivery);
            } else {
                if (!Validate::isLoadedObject($default_country)) {
                    $default_country = new Country(Configuration::get('PS_COUNTRY_DEFAULT'),
                        Configuration::get('PS_LANG_DEFAULT'));
                }
                $id_zone = (int)$default_country->id_zone;
            }
        }
        if ($id_carrier && !$this->isCarrierInRange((int)$id_carrier, (int)$id_zone)) {
            $id_carrier = '';
        }
        if (empty($id_carrier) && $this->isCarrierInRange((int)Configuration::get('PS_CARRIER_DEFAULT'),
                (int)$id_zone)) {
            $id_carrier = (int)Configuration::get('PS_CARRIER_DEFAULT');
        }
        if (empty($id_carrier)) {
            if ((int)$this->id_customer) {
                $customer = new Customer((int)$this->id_customer);
                $result = Carrier::getCarriers((int)Configuration::get('PS_LANG_DEFAULT'), true, false, (int)$id_zone,
                    $customer->getGroups());
                unset($customer);
            } else {
                $result = Carrier::getCarriers((int)Configuration::get('PS_LANG_DEFAULT'), true, false, (int)$id_zone);
            }
            foreach ($result as $k => $row) {
                if ($row['id_carrier'] == Configuration::get('PS_CARRIER_DEFAULT')) {
                    continue;
                }
                if (!isset(self::$_carriers[$row['id_carrier']])) {
                    self::$_carriers[$row['id_carrier']] = new Carrier((int)$row['id_carrier']);
                }
                $carrier = self::$_carriers[$row['id_carrier']];
                $shipping_method = $carrier->getShippingMethod();
                if (($shipping_method == Carrier::SHIPPING_METHOD_WEIGHT && $carrier->getMaxDeliveryPriceByWeight((int)$id_zone) === false)
                    || ($shipping_method == Carrier::SHIPPING_METHOD_PRICE && $carrier->getMaxDeliveryPriceByPrice((int)$id_zone) === false)) {
                    unset($result[$k]);
                    continue;
                }
                if ($row['range_behavior']) {
                    $check_delivery_price_by_weight = Carrier::checkDeliveryPriceByWeight($row['id_carrier'],
                        $this->getTotalWeight(), (int)$id_zone);
                    $check_delivery_price_by_price = Carrier::checkDeliveryPriceByPrice($row['id_carrier'],
                        $order_total, (int)$id_zone, (int)$this->id_currency);
                    if (($shipping_method == Carrier::SHIPPING_METHOD_WEIGHT && !$check_delivery_price_by_weight)
                        || ($shipping_method == Carrier::SHIPPING_METHOD_PRICE && !$check_delivery_price_by_price)) {
                        unset($result[$k]);
                        continue;
                    }
                }
                if ($shipping_method == Carrier::SHIPPING_METHOD_WEIGHT) {
                    $shipping = $carrier->getDeliveryPriceByWeight($this->getTotalWeight($product_list), (int)$id_zone);
                } else {
                    $shipping = $carrier->getDeliveryPriceByPrice($order_total, (int)$id_zone, (int)$this->id_currency);
                }
                if (!isset($min_shipping_price)) {
                    $min_shipping_price = $shipping;
                }
                if ($shipping <= $min_shipping_price) {
                    $id_carrier = (int)$row['id_carrier'];
                    $min_shipping_price = $shipping;
                }
            }
        }
        if (empty($id_carrier)) {
            $id_carrier = Configuration::get('PS_CARRIER_DEFAULT');
        }
        if (!isset(self::$_carriers[$id_carrier])) {
            self::$_carriers[$id_carrier] = new Carrier((int)$id_carrier, Configuration::get('PS_LANG_DEFAULT'));
        }
        $carrier = self::$_carriers[$id_carrier];
        if (!Validate::isLoadedObject($carrier)) {
            Cache::store($cache_id, 0);
            return 0;
        }
        $shipping_method = $carrier->getShippingMethod();
        if (!$carrier->active) {
            Cache::store($cache_id, $shipping_cost);
            return $shipping_cost;
        }
        if ($carrier->is_free == 1) {
            Cache::store($cache_id, 0);
            return 0;
        }
        if ($use_tax && !Tax::excludeTaxeOption()) {
            $address = Address::initialize((int)$address_id);
            if (Configuration::get('PS_ATCP_SHIPWRAP')) {
                $carrier_tax = 0;
            } else {
                $carrier_tax = $carrier->getTaxesRate($address);
            }
        }
        $configuration = Configuration::getMultiple([
            'PS_SHIPPING_FREE_PRICE',
            'PS_SHIPPING_HANDLING',
            'PS_SHIPPING_METHOD',
            'PS_SHIPPING_FREE_WEIGHT',
        ]);
        $free_fees_price = 0;
        if (isset($configuration['PS_SHIPPING_FREE_PRICE'])) {
            $free_fees_price = Tools::convertPrice((float)$configuration['PS_SHIPPING_FREE_PRICE'],
                Currency::getCurrencyInstance((int)$this->id_currency));
        }
        $orderTotalwithDiscounts = $this->getOrderTotal(true, Cart::BOTH_WITHOUT_SHIPPING, null, null, false);
        if ($orderTotalwithDiscounts >= (float)($free_fees_price) && (float)($free_fees_price) > 0) {
            $shipping_cost = $this->getPackageShippingCostFromModule($carrier, $shipping_cost, $products);
            Cache::store($cache_id, $shipping_cost);
            return $shipping_cost;
        }
        if (isset($configuration['PS_SHIPPING_FREE_WEIGHT'])
            && $this->getTotalWeight() >= (float)$configuration['PS_SHIPPING_FREE_WEIGHT']
            && (float)$configuration['PS_SHIPPING_FREE_WEIGHT'] > 0) {
            $shipping_cost = $this->getPackageShippingCostFromModule($carrier, $shipping_cost, $products);
            Cache::store($cache_id, $shipping_cost);
            return $shipping_cost;
        }
        if ($carrier->range_behavior) {
            if (!isset($id_zone)) {
                if (isset($this->id_address_delivery)
                    && $this->id_address_delivery
                    && Customer::customerHasAddress($this->id_customer, $this->id_address_delivery)) {
                    $id_zone = Address::getZoneById((int)$this->id_address_delivery);
                } else {
                    $id_zone = (int)$default_country->id_zone;
                }
            }
            if (($shipping_method == Carrier::SHIPPING_METHOD_WEIGHT && !Carrier::checkDeliveryPriceByWeight($carrier->id,
                        $this->getTotalWeight(), (int)$id_zone))
                || (
                    $shipping_method == Carrier::SHIPPING_METHOD_PRICE && !Carrier::checkDeliveryPriceByPrice($carrier->id,
                        $order_total, $id_zone, (int)$this->id_currency)
                )) {
                $shipping_cost += 0;
            } else {
                if ($shipping_method == Carrier::SHIPPING_METHOD_WEIGHT) {
                    $shipping_cost += $carrier->getDeliveryPriceByWeight($this->getTotalWeight($product_list),
                        $id_zone);
                } else { // by price
                    $shipping_cost += $carrier->getDeliveryPriceByPrice($order_total, $id_zone,
                        (int)$this->id_currency);
                }
            }
        } else {
            if ($shipping_method == Carrier::SHIPPING_METHOD_WEIGHT) {
                $shipping_cost += $carrier->getDeliveryPriceByWeight($this->getTotalWeight($product_list), $id_zone);
            } else {
                $shipping_cost += $carrier->getDeliveryPriceByPrice($order_total, $id_zone, (int)$this->id_currency);
            }
        }
        if (isset($configuration['PS_SHIPPING_HANDLING']) && $carrier->shipping_handling) {
            $shipping_cost += (float)$configuration['PS_SHIPPING_HANDLING'];
        }
        foreach ($products as $product) {
            if (!$product['is_virtual']) {
                $shipping_cost += $product['additional_shipping_cost'] * $product['cart_quantity'];
            }
        }
        $shipping_cost = Tools::convertPrice($shipping_cost, Currency::getCurrencyInstance((int)$this->id_currency));
        $shipping_cost = $this->getPackageShippingCostFromModule($carrier, $shipping_cost, $products);
        if ($shipping_cost === false) {
            Cache::store($cache_id, false);
            return false;
        }
        if (Configuration::get('PS_ATCP_SHIPWRAP')) {
            if (!$use_tax) {
                $shipping_cost /= (1 + $this->getAverageProductsTaxRate());
            }
        } else {
            if ($use_tax && isset($carrier_tax)) {
                $shipping_cost *= 1 + ($carrier_tax / 100);
            }
        }
        $extraShippingFee = 0;
        if (Module::isEnabled('offerintegration')) {
            foreach (Context::getContext()->cart->getProducts() as $key => $prod) {
                $prodObj = new Product($prod['id_product']);
                if ($prodObj->oi_offer_extra_shipping > 0 && $extraShippingFee == 0) {
                    $offerConf = unserialize(Configuration::get('OFFER_INTEGRATION'));
                    if ($offerConf) {
                        $extraShippingFee = $shipping_cost / 100 * $offerConf['extra_shipping'] - $shipping_cost;
                    }
                }
            }
        }
        $shipping_cost = (float)Tools::ps_round((float)$shipping_cost + $extraShippingFee, 2);
        Cache::store($cache_id, $shipping_cost);
        return $shipping_cost;
    }
    public function deleteProduct(
        $id_product,
        $id_product_attribute = 0,
        $id_customization = 0,
        $id_address_delivery = 0,
        bool $preserveGiftsRemoval = true,
        bool $useOrderPrices = false
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
        if ($productItem && $productItem->reference == Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_REFERENCE')) {
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
        $preservedGifts = [];
        $giftKey = (int) $id_product . '-' . (int) $id_product_attribute;
        if ($preserveGiftsRemoval) {
            $preservedGifts = $this->getProductsGifts($id_product, $id_product_attribute);
            if (isset($preservedGifts[$giftKey]) && $preservedGifts[$giftKey] > 0) {
                return Db::getInstance()->execute(
                    'UPDATE `' . _DB_PREFIX_ . 'cart_product`
                    SET `quantity` = ' . (int) $preservedGifts[(int) $id_product . '-' . (int) $id_product_attribute] . '
                    WHERE `id_cart` = ' . (int) $this->id . '
                    AND `id_product` = ' . (int) $id_product .
                    ($id_product_attribute != null ? ' AND `id_product_attribute` = ' . (int) $id_product_attribute : '')
                );
            }
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
            if (!isset($preservedGifts[$giftKey]) || $preservedGifts[$giftKey] <= 0) {
                CartRule::autoRemoveFromCart(null, $useOrderPrices);
                CartRule::autoAddToCart(null, $useOrderPrices);
            }
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
        $result = $this->getProductQuantity(
            $id_product,
            $id_product_attribute,
            $id_customization,
            $id_address_delivery
        );
        if (empty($result['quantity'])) {
            return false;
        }
        return ['quantity' => $result['quantity']];
    }
    public function updateQty(
        $quantity,
        $id_product,
        $id_product_attribute = null,
        $id_customization = false,
        $operator = 'up',
        $id_address_delivery = 0,
        Shop $shop = null,
        $auto_add_cart_rule = true,
        $skipAvailabilityCheckOutOfStock = false,
        bool $preserveGiftRemoval = true,
        bool $useOrderPrices = false
    ) {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($id_product)) {
            return parent::updateQty($quantity, $id_product, $id_product_attribute, $id_customization, $operator,
                $id_address_delivery, $shop, $auto_add_cart_rule, $skipAvailabilityCheckOutOfStock);
        }
        if (!$shop) {
            $shop = Context::getContext()->shop;
        }
        if (Validate::isLoadedObject(Context::getContext()->customer)) {
            if ($id_address_delivery == 0 && (int) $this->id_address_delivery) {
                $id_address_delivery = $this->id_address_delivery;
            } elseif ($id_address_delivery == 0) {
                $id_address_delivery = (int) Address::getFirstCustomerAddressId(
                    (int) Context::getContext()->customer->id
                );
            } elseif (!Customer::customerHasAddress(Context::getContext()->customer->id, $id_address_delivery)) {
                $id_address_delivery = 0;
            }
        } else {
            $id_address_delivery = 0;
        }
        $quantity = (int) $quantity;
        $id_product = (int) $id_product;
        $id_product_attribute = (int) $id_product_attribute;
        $product = new Product($id_product, false, Configuration::get('PS_LANG_DEFAULT'), $shop->id);
        if ($id_product_attribute) {
            $combination = new Combination((int) $id_product_attribute);
            if ($combination->id_product != $id_product) {
                return false;
            }
        }
        if (!empty($id_product_attribute)) {
            $minimal_quantity = (int) Attribute::getAttributeMinimalQty($id_product_attribute);
        } else {
            $minimal_quantity = (int) $product->minimal_quantity;
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
        $data = [
            'cart' => $this,
            'product' => $product,
            'id_product_attribute' => $id_product_attribute,
            'id_customization' => $id_customization,
            'quantity' => $quantity,
            'operator' => $operator,
            'id_address_delivery' => $id_address_delivery,
            'shop' => $shop,
            'auto_add_cart_rule' => $auto_add_cart_rule,
        ];
        Hook::exec('actionCartUpdateQuantityBefore', $data);
        if ((int) $quantity <= 0) {
            return $this->deleteProduct($id_product, $id_product_attribute, (int) $id_customization, (int) $id_address_delivery, $preserveGiftRemoval, $useOrderPrices);
        }
        if (!$product->available_for_order
            || (
                Configuration::isCatalogMode()
                && !defined('_PS_ADMIN_DIR_')
            )
        ) {
            return false;
        }
        $cartProductQuantity = $this->getProductQuantity(
            $id_product,
            $id_product_attribute,
            (int) $id_customization,
            (int) $id_address_delivery
        );
        if (!empty($cartProductQuantity['quantity'])) {
            $productQuantity = Product::getQuantity($id_product, $id_product_attribute, null, $this);
            $availableOutOfStock = Product::isAvailableWhenOutOfStock(StockAvailable::outOfStock($product->id));
            if ($operator == 'up') {
                $updateQuantity = '+ ' . $quantity;
                $newProductQuantity = $productQuantity - $quantity;
                if ($newProductQuantity < 0 && !$availableOutOfStock && !$skipAvailabilityCheckOutOfStock) {
                    return false;
                }
            } elseif ($operator == 'down') {
                $cartFirstLevelProductQuantity = $this->getProductQuantity(
                    (int) $id_product,
                    (int) $id_product_attribute,
                    $id_customization
                );
                $updateQuantity = '- ' . $quantity;
                if ($cartFirstLevelProductQuantity['quantity'] <= 1
                    || $cartProductQuantity['quantity'] - $quantity <= 0
                ) {
                    return $this->deleteProduct((int) $id_product, (int) $id_product_attribute, (int) $id_customization, (int) $id_address_delivery, $preserveGiftRemoval, $useOrderPrices);
                }
            } else {
                return false;
            }
            Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'cart_product`
                    SET `quantity` = `quantity` ' . $updateQuantity . '
                    WHERE `id_product` = ' . (int) $id_product .
                ' AND `id_customization` = ' . (int) $id_customization .
                (!empty($id_product_attribute) ? ' AND `id_product_attribute` = ' . (int) $id_product_attribute : '') . '
                    AND `id_cart` = ' . (int) $this->id . (Configuration::get('PS_ALLOW_MULTISHIPPING') && $this->isMultiAddressDelivery() ? ' AND `id_address_delivery` = ' . (int) $id_address_delivery : '') . '
                    LIMIT 1'
            );
        } elseif ($operator == 'up') {
            $sql = 'SELECT stock.out_of_stock, IFNULL(stock.quantity, 0) as quantity
                        FROM ' . _DB_PREFIX_ . 'product p
                        ' . Product::sqlStock('p', $id_product_attribute, true, $shop) . '
                        WHERE p.id_product = ' . $id_product;
            $result2 = Db::getInstance()->getRow($sql);
            if (Pack::isPack($id_product)) {
                $result2['quantity'] = Pack::getQuantity($id_product, $id_product_attribute, null, $this);
            }
            if (!Product::isAvailableWhenOutOfStock((int) $result2['out_of_stock']) && !$skipAvailabilityCheckOutOfStock) {
                if ((int) $quantity > $result2['quantity']) {
                    return false;
                }
            }
            if ((int) $quantity < $minimal_quantity) {
                return -1;
            }
            $result_add = Db::getInstance()->insert('cart_product', [
                'id_product' => (int) $id_product,
                'id_product_attribute' => (int) $id_product_attribute,
                'id_cart' => (int) $this->id,
                'id_address_delivery' => (int) $id_address_delivery,
                'id_shop' => $shop->id,
                'quantity' => (int) $quantity,
                'date_add' => date('Y-m-d H:i:s'),
                'id_customization' => (int) $id_customization,
            ]);
            if (!$result_add) {
                return false;
            }
        }
        $this->_products = $this->getProducts(true);
        $this->update();
        $context = Context::getContext()->cloneContext();
        $context->cart = $this;
        Cache::clean('getContextualValue_*');
        CartRule::autoRemoveFromCart(null, $useOrderPrices);
        if ($auto_add_cart_rule) {
            CartRule::autoAddToCart($context, $useOrderPrices);
        }
        if ($product->customizable) {
            return $this->_updateCustomizationQuantity(
                (int) $quantity,
                (int) $id_customization,
                (int) $id_product,
                (int) $id_product_attribute,
                (int) $id_address_delivery,
                $operator
            );
        }
        return true;
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
