<?php
/**
* 2022 - Keyrnel
*
* NOTICE OF LICENSE
*
* The source code of this module is under a commercial license.
* Each license is unique and can be installed and used on only one shop.
* Any reproduction or representation total or partial of the module, one or more of its components,
* by any means whatsoever, without express permission from us is prohibited.
* If you have not received this module from us, thank you for contacting us.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future.
*
* @author    Keyrnel
* @copyright 2022 - Keyrnel
* @license   commercial
* International Registered Trademark & Property of Keyrnel
*/
class Cart extends CartCore
{
    /**
     * Get Cart Rules.
     *
     * @param int $filter Filter enum:
     *                    - FILTER_ACTION_ALL
     *                    - FILTER_ACTION_SHIPPING
     *                    - FILTER_ACTION_REDUCTION
     *                    - FILTER_ACTION_GIFT
     *                    - FILTER_ACTION_ALL_NOCAP
     * @param bool $autoAdd automatically adds cart rules without code to cart
     * @param bool $useOrderPrices
     *
     * @return array|false|mysqli_result|PDOStatement|resource|null Database result
     */
    public function getCartRules(
        $filter = CartRule::FILTER_ACTION_ALL,
        $autoAdd = true,
        $useOrderPrices = false,
        $products = null,
        $id_carrier = null,
        $keepOrderPrices = false
    ) {
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

        if ((int) $id_carrier <= 0) {
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
     * @param bool $keepOrderPrices When true use the Order saved prices instead of the most recent ones from catalog (if Order exists)
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
        $use_cache = false,
        $keepOrderPrices = false
    ) {
        $value = parent::getOrderTotal(
            $withTaxes,
            $type,
            $products,
            $id_carrier,
            $use_cache,
            $keepOrderPrices
        );

        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
            || (!Configuration::get('KL_CART_RULE_EXTENDER_SHIPPING_FEES') && !Configuration::get('KL_CART_RULE_EXTENDER_WRAPPING_FEES'))
            || !in_array($type, [Cart::BOTH, Cart::ONLY_DISCOUNTS])
            || $this->getNbOfPackages() > 1
        ) {
            return $value;
        }

        if ((int) $id_carrier <= 0) {
            $id_carrier = null;
        }

        $this->getCartRules(CartRule::FILTER_ACTION_ALL, false, false, $products, $id_carrier, $keepOrderPrices);

        $calculator = $moduleClass->getCalculator();

        if (!$calculator->isProcessed) {
            return $value;
        }

        $amount = $type == Cart::BOTH
            ? $calculator->getTotal()
            : $calculator->getDiscountTotal()
        ;

        $value = $withTaxes ? $amount->getTaxIncluded() : $amount->getTaxExcluded();

        if ($type == Cart::BOTH) {
            $value = max(0, $value);
        }

        return Tools::ps_round($value, Context::getContext()->getComputingPrecision());
    }
}
