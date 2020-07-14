<?php
/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

class Cart extends CartCore
{
    public $added_to_order;

    /**
     * @see ObjectModel::$definition
     */
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


    /**
     * This function returns the total cart amount.
     *
     * @param bool $withTaxes With or without taxes
     * @param int $type Total type enum
     *                  - Cart::ONLY_PRODUCTS
     *                  - Cart::ONLY_DISCOUNTS
     *                  - Cart::BOTH
     *                  - Cart::BOTH_WITHOUT_SHIPPING
     *                  - Cart::ONLY_SHIPPING
     *                  - Cart::ONLY_WRAPPING
     *                  - Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING
     *                  - Cart::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING
     * @param array $products
     * @param int $id_carrier
     * @param bool $use_cache @deprecated
     *
     * @return float Order total
     *
     * @throws \Exception
     */
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

        // deprecated type
        if ($type == Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) {
            $type = Cart::ONLY_PRODUCTS;
        }

        // check type
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

        // CART CALCULATION
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
    
                    //Add small order fee
                    $productTotal = $calculator->getRowTotal()->getTaxExcluded();
                    if((!is_null($productTotal) && (double)$productTotal > (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT')) || $productTotal === 0.0){
                       $small_order_fee_addition = 0;
                    } else {
                       $small_order_fee_addition = (double)Configuration::get('SMALLORDERFEE_ORDER_FEE');
                    }
                    break;
                case Cart::BOTH_WITHOUT_SHIPPING:
                    $calculator->calculateRows();
                    // dont process free shipping to avoid calculation loop (and maximum nested functions !)
                    $calculator->calculateCartRulesWithoutFreeShipping();
                    $amount = $calculator->getTotal(true);
                    
                    //Add small order fee
                    $productTotal = $calculator->getRowTotal()->getTaxExcluded();
                    if((!is_null($productTotal) && (double)$productTotal > (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT')) || $productTotal === 0.0){
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

   
        // TAXES ?
        $value = $withTaxes ? $amount->getTaxIncluded() + $small_order_fee_addition : $amount->getTaxExcluded() + $small_order_fee_addition;   
        // ROUND AND RETURN

        $compute_precision = $this->configuration->get('_PS_PRICE_COMPUTE_PRECISION_');

        return Tools::ps_round($value, $compute_precision);
    }


}
