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

        $cookie = new Cookie('psAdmin', '', (int)Configuration::get('PS_COOKIE_LIFETIME_BO'));
        if (isset($cookie->id_employee) && $cookie->id_employee) {
            if(in_array($cookie->profile, explode(',',Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMPLOYEE_SHOP_PROFILES')))){
                $id_carrier = 7;
            }
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



    /*
    * module: dynamicproduct
    * date: 2020-08-14 11:59:27
    * version: 2.3.4
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

    /**
     * Return shipping total for the cart.
     *
     * @param array|null $delivery_option Array of the delivery option for each address
     * @param bool $use_tax Use taxes
     * @param Country|null $default_country Default Country
     *
     * @return float Shipping total
     */
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





    /**
     * Delete a product from the cart.
     *
     * @param int $id_product Product ID
     * @param int $id_product_attribute Attribute ID if needed
     * @param int $id_customization Customization id
     * @param int $id_address_delivery Delivery Address id
     *
     * @return bool Whether the product has been successfully deleted
     */
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
        // is an custom product remove product from database
            $productItem->delete();
        }

        /* Get customization quantity */
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

        /* If the product still possesses customization it does not have to be deleted */
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

        /* Product deletion */
        $result = Db::getInstance()->execute('
        DELETE FROM `' . _DB_PREFIX_ . 'cart_product`
        WHERE `id_product` = ' . (int) $id_product . '
        AND `id_customization` = ' . (int) $id_customization .
            (null !== $id_product_attribute ? ' AND `id_product_attribute` = ' . (int) $id_product_attribute : '') . '
        AND `id_cart` = ' . (int) $this->id . '
        ' . ((int) $id_address_delivery ? 'AND `id_address_delivery` = ' . (int) $id_address_delivery : ''));

        if ($result) {
            $return = $this->update();
            // refresh cache of self::_products
            $this->_products = $this->getProducts(true);
            CartRule::autoRemoveFromCart();
            CartRule::autoAddToCart();

            return $return;
        }

        return false;
    }


}
