<?php

use PrestaShop\PrestaShop\Core\Cart\AmountImmutable;

class Cart extends CartCore
{
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
    public $added_to_order;

    public const ONLY_DISCOUNTS_NO_CALCULATION = 9;
    public const ONLY_REMAINDER_OF_DISCOUNTS = 10;
    public const ONLY_REMAINDER_UNTIL_STORE_DISCOUNT = 11;
    public const ONLY_PRODUCTS_NO_DISCOUNTS = 12;

    public
    function getTotalShippingCost($delivery_option = null, $use_tax = true, Country $default_country = null)
    {
        if (isset(Context::getContext()->country->id)) {
            $default_country = new Country(Context::getContext()->country->id);
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
        foreach (Context::getContext()->cart->getProducts() as $key => $prod) {
            $prodObj = new Product($prod['id_product']);
            if ($prodObj->oi_offer_extra_shipping > 0 && $extraShippingFee == 0) {
                $extraShippingFee = $_total_shipping['without_tax'] / 100 * Configuration::get('MSTHEMECONFIG_OFFER_INTEGRATION_EXTRA_SHIPPING', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) - $_total_shipping['without_tax'];
            }
        }
        return ($use_tax) ? $_total_shipping['with_tax'] + $extraShippingFee : $_total_shipping['without_tax'] + $extraShippingFee;
    }

    public function getDeliveryOption($default_country = null, $dontAutoSelectOptions = false, $use_cache = true)
    {
        $cache_id = (int)(is_object($default_country) ? $default_country->id : 0) . '-' . (int)$dontAutoSelectOptions;
        if (isset(static::$cacheDeliveryOption[$cache_id]) && $use_cache) {
            return static::$cacheDeliveryOption[$cache_id];
        }
        $delivery_option_list = $this->getDeliveryOptionList($default_country);
        if (isset($this->delivery_option) && $this->delivery_option != '') {
            $delivery_option = json_decode($this->delivery_option, true);
            $validated = true;
            if (is_array($delivery_option)) {
                foreach ($delivery_option as $id_address => $key) {
                    if (!isset($delivery_option_list[$id_address][$key])) {
                        $validated = false;
                        break;
                    }
                }
                if ($validated) {
                    static::$cacheDeliveryOption[$cache_id] = $delivery_option;
                    return $delivery_option;
                }
            }
        }
        if ($dontAutoSelectOptions) {
            return false;
        }
        $delivery_option = [];
        foreach ($delivery_option_list as $id_address => $options) {
            $context = Context::getContext()->cloneContext();
            foreach ($options as $key => $option) {
                if (Configuration::get('PS_CARRIER_DEFAULT') == -1 && $option['is_best_price']) {
                    $delivery_option[$id_address] = $key;
                    break;
                } elseif (Configuration::get('PS_CARRIER_DEFAULT') == -2 && $option['is_best_grade']) {
                    $delivery_option[$id_address] = $key;
                    break;
                } elseif ($option['unique_carrier'] && in_array(Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER', $context->language->id,
                        $context->shop->id_shop_group,
                        $context->shop->id), array_keys($option['carrier_list'])) &&
                    Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
                        $context->language->id,
                        $context->shop->id_shop_group,
                        $context->shop->id) == (int)$context->customer->id) {
                    $delivery_option[$id_address] = $key;
                    break;
                } elseif ($option['unique_carrier'] && in_array(Configuration::get('PS_CARRIER_DEFAULT'), array_keys($option['carrier_list'])) && Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
                        $context->language->id,
                        $context->shop->id_shop_group,
                        $context->shop->id) != $context->customer->id) {
                    $delivery_option[$id_address] = $key;
                    break;
                }
            }
            reset($options);
            if (!isset($delivery_option[$id_address])) {
                $delivery_option[$id_address] = key($options);
            }
        }
        static::$cacheDeliveryOption[$cache_id] = $delivery_option;
        return $delivery_option;
    }

    public
    function getPackageShippingCost(
        $id_carrier = null,
        $use_tax = true,
        Country $default_country = null,
        $product_list = null,
        $id_zone = null,
        bool $keepOrderPrices = false
    )
    {
        if ($this->isVirtualCart()) {
            return 0;
        }
        if (!$default_country) {
            $default_country = new Country(Context::getContext()->country->id);
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
        foreach (Context::getContext()->cart->getProducts() as $key => $prod) {
            $prodObj = new Product($prod['id_product']);
            if ($prodObj->oi_offer_extra_shipping > 0 && $extraShippingFee == 0) {
                $extraShippingFee = $shipping_cost / 100 * Configuration::get('MSTHEMECONFIG_OFFER_INTEGRATION_EXTRA_SHIPPING', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) - $shipping_cost;
            }
        }
        $shipping_cost = (float)Tools::ps_round((float)$shipping_cost + $extraShippingFee, 2);
        Cache::store($cache_id, $shipping_cost);
        return $shipping_cost;
    }

//    public function getOrderTotal(
//        $withTaxes = true,
//        $type = Cart::BOTH,
//        $products = null,
//        $id_carrier = null,
//        $use_cache = false,
//        $keepOrderPrices = false
//    )
//    {
//        if (!is_numeric($id_carrier) && isset(Context::getContext()->cart->id_carrier) && (int)Context::getContext()->cart->id_carrier > 0) {
//            $id_carrier = (int)Context::getContext()->cart->id_carrier;
//        }
//
//
//
//        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
//            || !($moduleClass instanceof KlCartRuleExtender)
//            || !$moduleClass->isEnabledForShopContext()
//            || (!Configuration::get('KL_CART_RULE_EXTENDER_SHIPPING_FEES') && !Configuration::get('KL_CART_RULE_EXTENDER_WRAPPING_FEES'))
//            || $this->getNbOfPackages() > 1
//        ) {
//            if(!in_array($type, [Cart::ONLY_DISCOUNTS_NO_CALCULATION, Cart::ONLY_REMAINDER_OF_DISCOUNTS, Cart::ONLY_REMAINDER_UNTIL_STORE_DISCOUNT, Cart::ONLY_PRODUCTS_NO_DISCOUNTS])){
//
//                $value = parent::getOrderTotal(
//                    $withTaxes,
//                    (int)$type,
//                    $products,
//                    $id_carrier,
//                    $use_cache,
//                    $keepOrderPrices
//                );
//                return $value;
//            }
//        }
//        if ((int)$id_carrier <= 0) {
//            $id_carrier = null;
//        }
//
//        if(!($moduleClass = Module::getInstanceByName('klcartruleextender')) || !($moduleClass instanceof KlCartRuleExtender) || !$moduleClass->isEnabledForShopContext()){
//            $cartRules = [];
//            if (in_array($type, [Cart::BOTH, Cart::BOTH_WITHOUT_SHIPPING, Cart::ONLY_DISCOUNTS])) {
//                $cartRules = parent::getCartRules(CartRule::FILTER_ACTION_ALL, false, false);
//            }
//            if (null === $products) {
//                $products = $this->getProducts(false, false, null, true, $keepOrderPrices);
//            }
//
//            $this->getCartRules(CartRule::FILTER_ACTION_ALL, false, false, $products, $id_carrier, $keepOrderPrices);
//            $computePrecision = Context::getContext()->getComputingPrecision();
//            $calculator = parent::newCalculator($products, $cartRules, $id_carrier, $computePrecision, $keepOrderPrices);
//            $calculator->calculateRows();
//        } else {
//            $calculator = $moduleClass->getCalculator();
//        }
//        switch ($type) {
//            case Cart::BOTH:
//                $amount = $calculator->getTotal(false, true);
//                break;
//            case Cart::ONLY_DISCOUNTS:
//                $amount = $calculator->getDiscountTotal();
//                break;
//            case Cart::ONLY_DISCOUNTS_NO_CALCULATION:
//                $amount = $calculator->getDiscountTotal(true);
//                break;
//            case Cart::ONLY_PRODUCTS_NO_DISCOUNTS:
//                $amount = $calculator->getRowTotalWithoutDiscount();
//                break;
//            case Cart::ONLY_REMAINDER_OF_DISCOUNTS:
//                $discount = $calculator->getDiscountTotal(true);
//                if ($discount->getTaxExcluded() > 0) {
//                    $amount = $calculator->getTotal(false, true);
//                } else {
//                    $amount = new AmountImmutable(0, 0);
//                }
//                break;
//        }
//        $value = $withTaxes ? $amount->getTaxIncluded() : $amount->getTaxExcluded();
//        if ($type == Cart::BOTH) {
//            $value = max(0, $value);
//        }
//        return Tools::ps_round($value, Context::getContext()->getComputingPrecision());
//    }


    public function  getOrderTotal(
        $withTaxes = true,
        $type = Cart::BOTH,
        $products = null,
        $id_carrier = null,
        $use_cache = false,
        bool $keepOrderPrices = false
    ) {
        if ((int) $id_carrier <= 0) {
            $id_carrier = null;
        }

        // deprecated type
        if ($type == Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) {
            $type = Cart::ONLY_PRODUCTS;
        }

        // check type
        $type = (int) $type;
        $allowedTypes = [
            Cart::ONLY_PRODUCTS,
            Cart::ONLY_DISCOUNTS,
            Cart::BOTH,
            Cart::BOTH_WITHOUT_SHIPPING,
            Cart::ONLY_SHIPPING,
            Cart::ONLY_WRAPPING,
            Cart::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING,
            Cart::ONLY_DISCOUNTS_NO_CALCULATION,
            Cart::ONLY_REMAINDER_OF_DISCOUNTS,
            Cart::ONLY_REMAINDER_UNTIL_STORE_DISCOUNT,
            Cart::ONLY_PRODUCTS_NO_DISCOUNTS,
        ];
        if (!in_array($type, $allowedTypes)) {
            throw new \Exception('Invalid calculation type: ' . $type);
        }

        // EARLY RETURNS

        // if cart rules are not used
        if ($type == Cart::ONLY_DISCOUNTS && !CartRule::isFeatureActive()) {
            return 0;
        }
        // no shipping cost if is a cart with only virtuals products
        $virtual = $this->isVirtualCart();
        if ($virtual && $type == Cart::ONLY_SHIPPING) {
            return 0;
        }
        if ($virtual && $type == Cart::BOTH) {
            $type = Cart::BOTH_WITHOUT_SHIPPING;
        }

        // filter products
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

        // CART CALCULATION
        $cartRules = [];
        if (in_array($type, [Cart::BOTH, Cart::BOTH_WITHOUT_SHIPPING, Cart::ONLY_DISCOUNTS, Cart::ONLY_DISCOUNTS_NO_CALCULATION, Cart::ONLY_REMAINDER_OF_DISCOUNTS])) {
            $cartRules = $this->getTotalCalculationCartRules($type, $type == Cart::BOTH);
        }

        $computePrecision = Context::getContext()->getComputingPrecision();
        $calculator = $this->newCalculator($products, $cartRules, $id_carrier, $computePrecision, $keepOrderPrices);
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

                break;
            case Cart::BOTH_WITHOUT_SHIPPING:
                $calculator->calculateRows();
                // dont process free shipping to avoid calculation loop (and maximum nested functions !)
                $calculator->calculateCartRulesWithoutFreeShipping();
                $amount = $calculator->getTotal(true);

                break;
            case Cart::ONLY_PRODUCTS:
                $calculator->calculateRows();
                $amount = $calculator->getRowTotal();

                break;
            case Cart::ONLY_DISCOUNTS:
                $calculator->processCalculation();
                $amount = $calculator->getDiscountTotal();

                break;
            case Cart::ONLY_DISCOUNTS_NO_CALCULATION:
                $calculator->processCalculation();
                $amount = $this->getDiscountTotal($calculator, $this->getTotalCalculationCartRules(CartRule::FILTER_ACTION_REDUCTION, false));
                break;
            case Cart::ONLY_PRODUCTS_NO_DISCOUNTS:
                $calculator->calculateRows();
                $amount = $calculator->getRowTotalWithoutDiscount();

                break;
            case Cart::ONLY_REMAINDER_OF_DISCOUNTS:
                $calculator->calculateRows();
                $discount = $this->getDiscountTotal($calculator, $this->getTotalCalculationCartRules(CartRule::FILTER_ACTION_REDUCTION, false));
                if ($discount->getTaxExcluded() > 0) {
                    $calculator->calculateRows();
                    $calculator->calculateFees();

                    $total = $calculator->getRowTotal();
                    $total->add($calculator->getFees()->getFinalShippingFees());

                    $amount = $total->sub($discount);
                } else {
                    $amount = new AmountImmutable(0, 0);
                }

                break;

            default:
                throw new \Exception('unknown cart calculation type : ' . $type);
        }

        $value = $withTaxes ? $amount->getTaxIncluded() : $amount->getTaxExcluded();
        if ($type == Cart::BOTH) {
            $value = max(0, $value);
        }


        return Tools::ps_round($value, Context::getContext()->getComputingPrecision());
    }

    /**
     * @return AmountImmutable
     *
     * @throws \Exception
     */
    public function getDiscountTotal($calculator, $cart_rules)
    {
        $amount = new AmountImmutable();
        $isFreeShippingAppliedToAmount = false;
        foreach ($cart_rules as $cartRule) {
            if((float)$cartRule['reduction_percent'] > 0){
                //percentage discount
                $amount = $amount->add(new AmountImmutable($cartRule['value_real'],$cartRule['value_tax_exc']));
            } else {
                //money amount
                $amount = $amount->add(new AmountImmutable($cartRule['reduction_amount'],$cartRule['reduction_amount']/1.21));
            }
        }

//        $allowedMaxDiscount = $calculator->getRowTotalWithoutDiscount();
//
//        if (null !== $calculator->getFees()->getFinalShippingFees()) {
//            $shippingDiscount = (new AmountImmutable())
//                ->add($calculator->getFees()->getInitialShippingFees())
//                ->sub($calculator->getFees()->getFinalShippingFees())
//            ;
//            $allowedMaxDiscount = $allowedMaxDiscount->add($shippingDiscount);
//        }
//        // discount cannot be above total cart price
//        if ($amount > $allowedMaxDiscount) {
//            $amount = $allowedMaxDiscount;
//        }

        return $amount;
    }

    public function getCartRules(
        $filter = CartRule::FILTER_ACTION_ALL,
        $autoAdd = true,
        $useOrderPrices = false,
        $products = null,
        $id_carrier = null,
        $keepOrderPrices = false
    )
    {
        $result = parent::getCartRules($filter, $autoAdd, $useOrderPrices);
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
            || (!Configuration::get('KL_CART_RULE_EXTENDER_SHIPPING_FEES') && !Configuration::get('KL_CART_RULE_EXTENDER_WRAPPING_FEES'))
            || !in_array($filter, [CartRule::FILTER_ACTION_ALL])
            || $this->getNbOfPackages() > 1
        ) {
            return $result;
        }
        if ((int)$id_carrier <= 0) {
            $id_carrier = null;
        }
        if (null === $products) {
            $products = $this->getProducts(false, false, null, true, $keepOrderPrices);
        }
        $computePrecision = Context::getContext()->getComputingPrecision();
        $newCalculator = $this->newCalculator($products, $result, $id_carrier, $computePrecision, $keepOrderPrices);
        $calculator = $moduleClass->getCalculator();
        $calculator
            ->setCalculator($newCalculator)
            ->process();
        if ($calculator->isProcessed) {
            $result = $calculator->getCartRules();
        }
        return $result;
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
    )
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($id_product)) {
            return parent::updateQty($quantity, $id_product, $id_product_attribute, $id_customization, $operator,
                $id_address_delivery, $shop, $auto_add_cart_rule, $skipAvailabilityCheckOutOfStock);
        }
        if (!$shop) {
            $shop = Context::getContext()->shop;
        }
        if (Validate::isLoadedObject(Context::getContext()->customer)) {
            if ($id_address_delivery == 0 && (int)$this->id_address_delivery) {
                $id_address_delivery = $this->id_address_delivery;
            } elseif ($id_address_delivery == 0) {
                $id_address_delivery = (int)Address::getFirstCustomerAddressId(
                    (int)Context::getContext()->customer->id
                );
            } elseif (!Customer::customerHasAddress(Context::getContext()->customer->id, $id_address_delivery)) {
                $id_address_delivery = 0;
            }
        } else {
            $id_address_delivery = 0;
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
        if (!empty($id_product_attribute)) {
            $minimal_quantity = (int)ProductAttribute::getAttributeMinimalQty($id_product_attribute);
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
        if ((int)$quantity <= 0) {
            return $this->deleteProduct($id_product, $id_product_attribute, (int)$id_customization, (int)$id_address_delivery, $preserveGiftRemoval, $useOrderPrices);
        } else if (!$product->available_for_order
            || (
                Configuration::isCatalogMode()
                && !defined('_PS_ADMIN_DIR_')
            )
        ) {
            return false;
        } else {
            $result = $this->containsProduct($id_product, $id_product_attribute, (int)$id_customization, (int)$id_address_delivery);
            if ($result) {
                if ($operator == 'up') {
                    $sql = 'SELECT stock.out_of_stock, IFNULL(stock.quantity, 0) as quantity
                            FROM ' . _DB_PREFIX_ . 'product p
                            ' . Product::sqlStock('p', $id_product_attribute_default, true, $shop) . '
                            WHERE p.id_product = ' . $id_product;
                    $result2 = Db::getInstance()->getRow($sql);
                    $product_qty = (int)$result2['quantity'];
                    if (Pack::isPack($id_product)) {
                        $product_qty = Pack::getQuantity($id_product, $id_product_attribute);
                    }
                    $new_qty = (int)$result['quantity'] + (int)$quantity;
                    $qty = '+ ' . (int)$quantity;
                    if (!$skipAvailabilityCheckOutOfStock && !Product::isAvailableWhenOutOfStock((int)$result2['out_of_stock'])) {
                        if ($new_qty > $product_qty) {
                            return false;
                        }
                    }
                } elseif ($operator == 'down') {
                    $qty = '- ' . (int)$quantity;
                    $new_qty = (int)$result['quantity'] - (int)$quantity;
                    if ($new_qty < $minimal_quantity && $minimal_quantity > 1) {
                        return -1;
                    }
                } else {
                    return false;
                }
                if ($new_qty <= 0) {
                    return $this->deleteProduct((int)$id_product, (int)$id_product_attribute, (int)$id_customization);
                } elseif ($new_qty < $minimal_quantity) {
                    return -1;
                } else {
                    Db::getInstance()->execute(
                        'UPDATE `' . _DB_PREFIX_ . 'cart_product`
                        SET `quantity` = `quantity` ' . $qty . '
                        WHERE `id_product` = ' . (int)$id_product .
                        ' AND `id_customization` = ' . (int)$id_customization .
                        (!empty($id_product_attribute) ? ' AND `id_product_attribute` = ' . (int)$id_product_attribute : '') . '
                        AND `id_cart` = ' . (int)$this->id . (Configuration::get('PS_ALLOW_MULTISHIPPING') && $this->isMultiAddressDelivery() ? ' AND `id_address_delivery` = ' . (int)$id_address_delivery : '') . '
                        LIMIT 1'
                    );
                }
            } elseif ($operator == 'up') {
                $sql = 'SELECT stock.out_of_stock, IFNULL(stock.quantity, 0) as quantity
                        FROM ' . _DB_PREFIX_ . 'product p
                        ' . Product::sqlStock('p', $id_product_attribute_default, true, $shop) . '
                        WHERE p.id_product = ' . $id_product;
                $result2 = Db::getInstance()->getRow($sql);
                if (Pack::isPack($id_product)) {
                    $result2['quantity'] = Pack::getQuantity($id_product, $id_product_attribute);
                }
                $cart_items = $this->getWsCartRows();
                $product_qty_by_id = 0;
                foreach ($cart_items as $cart_item) {
                    if ($cart_item['id_product'] == $id_product) {
                        $product_qty_by_id += (int)$cart_item['quantity'];
                    }
                }
                if (!Product::isAvailableWhenOutOfStock((int)$result2['out_of_stock'])) {
                    if (((int)$quantity + (int)$product_qty_by_id) > $result2['quantity']) {
                        return false;
                    }
                }
                if ((int)$quantity < $minimal_quantity) {
                    return -1;
                }
                $result_add = Db::getInstance()->insert('cart_product', array(
                    'id_product' => (int)$id_product,
                    'id_product_attribute' => (int)$id_product_attribute,
                    'id_cart' => (int)$this->id,
                    'id_address_delivery' => (int)$id_address_delivery,
                    'id_shop' => $shop->id,
                    'quantity' => (int)$quantity,
                    'date_add' => date('Y-m-d H:i:s'),
                    'id_customization' => (int)$id_customization,
                ));
                if (!$result_add) {
                    return false;
                }
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
            return $this->_updateCustomizationQuantity((int)$quantity, (int)$id_customization, (int)$id_product, (int)$id_product_attribute, (int)$id_address_delivery, $operator);
        } else {
            return true;
        }
    }

    public
    function deleteProduct(
        $id_product,
        $id_product_attribute = 0,
        $id_customization = 0,
        $id_address_delivery = 0,
        bool $preserveGiftsRemoval = true,
        bool $useOrderPrices = false
    )
    {
        if (isset(self::$_nbProducts[$this->id])) {
            unset(self::$_nbProducts[$this->id]);
        }
        if (isset(self::$_totalWeight[$this->id])) {
            unset(self::$_totalWeight[$this->id]);
        }
        if ((int)$id_customization) {
            if (!$this->_deleteCustomization((int)$id_customization, (int)$id_product, (int)$id_product_attribute, (int)$id_address_delivery)) {
                return false;
            }
        }
        $result = Db::getInstance()->getRow('
            SELECT SUM(`quantity`) AS \'quantity\'
            FROM `' . _DB_PREFIX_ . 'customization`
            WHERE `id_cart` = ' . (int)$this->id . '
            AND `id_product` = ' . (int)$id_product . '
            AND `id_customization` = ' . (int)$id_customization . '
            AND `id_product_attribute` = ' . (int)$id_product_attribute);
        if ($result === false) {
            return false;
        }
        if (Db::getInstance()->numRows() && (int)$result['quantity']) {
            return Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'cart_product`
                SET `quantity` = ' . (int)$result['quantity'] . '
                WHERE `id_cart` = ' . (int)$this->id . '
                AND `id_product` = ' . (int)$id_product . '
                AND `id_customization` = ' . (int)$id_customization .
                ($id_product_attribute != null ? ' AND `id_product_attribute` = ' . (int)$id_product_attribute : '')
            );
        }
        $preservedGifts = [];
        $giftKey = (int)$id_product . '-' . (int)$id_product_attribute;
        if ($preserveGiftsRemoval) {
            $preservedGifts = $this->getProductsGifts($id_product, $id_product_attribute);
            if (isset($preservedGifts[$giftKey]) && $preservedGifts[$giftKey] > 0) {
                return Db::getInstance()->execute(
                    'UPDATE `' . _DB_PREFIX_ . 'cart_product`
                    SET `quantity` = ' . (int)$preservedGifts[(int)$id_product . '-' . (int)$id_product_attribute] . '
                    WHERE `id_cart` = ' . (int)$this->id . '
                    AND `id_product` = ' . (int)$id_product .
                    ($id_product_attribute != null ? ' AND `id_product_attribute` = ' . (int)$id_product_attribute : '')
                );
            }
        }
        $result = Db::getInstance()->execute('
        DELETE FROM `' . _DB_PREFIX_ . 'cart_product`
        WHERE `id_product` = ' . (int)$id_product . '
        AND `id_customization` = ' . (int)$id_customization .
            (null !== $id_product_attribute ? ' AND `id_product_attribute` = ' . (int)$id_product_attribute : '') . '
        AND `id_cart` = ' . (int)$this->id . '
        ' . ((int)$id_address_delivery ? 'AND `id_address_delivery` = ' . (int)$id_address_delivery : ''));
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

    /*
   * module: klcartruleextender
   * date: 2023-04-05 08:02:35
   * version: 1.0.1
   */

    public function containsProduct($id_product, $id_product_attribute = 0, $id_customization = 0, $id_address_delivery = 0)
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($id_product)) {
            return parent::containsProduct($id_product, $id_product_attribute, $id_customization, $id_address_delivery);
        }
        $sql = 'SELECT cp.`quantity` FROM `' . _DB_PREFIX_ . 'cart_product` cp';
        if ($id_customization) {
            $sql .= '
                LEFT JOIN `' . _DB_PREFIX_ . 'customization` c ON (
                    c.`id_product` = cp.`id_product`
                    AND c.`id_product_attribute` = cp.`id_product_attribute`
                )';
        }
        $sql .= '
            WHERE cp.`id_product` = ' . (int)$id_product . '
            AND cp.`id_product_attribute` = ' . (int)$id_product_attribute . '
            AND cp.`id_customization` = ' . (int)$id_customization . '
            AND cp.`id_cart` = ' . (int)$this->id;
        if (Configuration::get('PS_ALLOW_MULTISHIPPING') && $this->isMultiAddressDelivery()) {
            $sql .= ' AND cp.`id_address_delivery` = ' . (int)$id_address_delivery;
        }
        if ($id_customization) {
            $sql .= ' AND c.`id_customization` = ' . (int)$id_customization;
        }
        $ret = Db::getInstance()->getRow($sql);
        if (isset($ret['quantity']) && $ret['quantity'] > 0) {
            $sql = 'SELECT sum(cp.`quantity`) as qty FROM `' . _DB_PREFIX_ . 'cart_product` cp
                WHERE cp.`id_product` = ' . (int)$id_product . '
                AND cp.`id_cart` = ' . (int)$this->id;
            $qty = Db::getInstance()->getRow($sql);
            if (isset($qty['qty'])) {
                $ret['quantity'] = $qty['qty'];
            }
        }
        return $ret;
    }

    /*
    * module: klcartruleextender
    * date: 2023-04-05 08:02:35
    * version: 1.0.1
    */

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
                (bool)Context::getContext()->customer->isLogged() &&
                ($delivery = $this->getDeliveryOption()) &&
                !empty($delivery)
            ) {
                $product['stock_quantity'] = StockManager::getStockByCarrier(
                    (int)$product['id_product'],
                    (int)$product['id_product_attribute'],
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

    public function getTotalBeforeNextAutoDiscount($withTaxes = true, $parts = 'all')
    {
        $cartRulesCheck = CartRule::getAutoAddToCartRules(Context::getContext(), true);
        $amount = new AmountImmutable($cartRulesCheck['remaining_amount'] * 1.21, $cartRulesCheck['remaining_amount']);
        $rule = new CartRule($cartRulesCheck['cart_rule']->id);
        $value = $withTaxes ? $amount->getTaxIncluded() : $amount->getTaxExcluded();
        switch ($parts) {
            case 'name':
                return $rule->getFieldByLang('name', $this->id_lang);
                break;
            case 'rule':
                return $cartRulesCheck['cart_rule'];
                break;
            case 'amount':
                return Tools::ps_round($value, Context::getContext()->getComputingPrecision());
                break;
            default:
                return ['cart_rule_name' => $rule->getFieldByLang('name', $this->id_lang), 'cart_rule' => $cartRulesCheck['cart_rule'], 'amount' => Tools::ps_round($value, Context::getContext()->getComputingPrecision())];
                break;
        }
    }
}
