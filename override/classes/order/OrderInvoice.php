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
class OrderInvoice extends OrderInvoiceCore
{
    /*
    * module: klcartruleextender
    * date: 2023-04-03 12:08:24
    * version: 1.0.1
    */
    public function getProductTaxesBreakdown($order = null)
    {
        $breakdown = parent::getProductTaxesBreakdown($order);
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
        ) {
            return $breakdown;
        }
        if (count($breakdown)) {
            $free_shipping = false;
            foreach ($this->getOrder()->getCartRules() as $order_cart_rule) {
                if ($order_cart_rule['free_shipping']) {
                    $free_shipping = true;
                    break;
                }
            }
            $total_products_ws_te = $this->total_products + ($free_shipping ? $this->total_shipping_tax_excl : 0);
            if ($this->total_discount_tax_excl > $total_products_ws_te) {
                foreach ($breakdown as &$data) {
                    $data['total_price_tax_excl'] = 0;
                    $data['total_amount'] = 0;
                }
            }
        }
        return $breakdown;
    }
    /**
     * Returns the shipping taxes breakdown.
     *
     * @since 1.5
     *
     * @param Order $order
     *
     * @return array
     */
    /*
    * module: klcartruleextender
    * date: 2023-04-03 12:08:24
    * version: 1.0.1
    */
    public function getShippingTaxesBreakdown($order)
    {
        $breakdown = parent::getShippingTaxesBreakdown($order);
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
        ) {
            return $breakdown;
        }
        if (count($breakdown)
            && ($order_fees = $moduleClass->getOrderFeesById($this->getOrder()->id))
            && isset($order_fees['include_shipping'])
            && $order_fees['include_shipping']
        ) {
            $discount_remaining_tax_excl = max(0, $this->total_discount_tax_excl - $this->total_products);
            $shipping_tax_excl = min($this->total_shipping_tax_excl, max(0, $this->total_shipping_tax_excl - $discount_remaining_tax_excl));
            foreach ($breakdown as &$data) {
                $data['total_tax_excl'] = $shipping_tax_excl;
                $data['total_amount'] = Tools::ps_round($shipping_tax_excl * $data['rate'] / 100, Context::getContext()->getComputingPrecision(), $this->getOrder()->round_mode);
            }
        }
        return $breakdown;
    }
    /**
     * Returns the wrapping taxes breakdown.
     *
     * @return array
     */
    /*
    * module: klcartruleextender
    * date: 2023-04-03 12:08:24
    * version: 1.0.1
    */
    public function getWrappingTaxesBreakdown()
    {
        $breakdown = parent::getWrappingTaxesBreakdown();
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
        ) {
            return $breakdown;
        }
        if (count($breakdown)
            && ($order_fees = $moduleClass->getOrderFeesById($this->getOrder()->id))
            && isset($order_fees['include_wrapping'])
            && $order_fees['include_wrapping']
        ) {
            $include_shipping = isset($order_fees['include_shipping']) && $order_fees['include_shipping'];
            $free_shipping = false;
            foreach ($this->getOrder()->getCartRules() as $order_cart_rule) {
                if ($order_cart_rule['free_shipping']) {
                    $free_shipping = true;
                    break;
                }
            }
            $total_shipping_te = $free_shipping || $include_shipping ? $this->total_shipping_tax_excl : 0;
            $discount_remaining_tax_excl = max(0, $this->total_discount_tax_excl - $this->total_products - $total_shipping_te);
            $wrapping_tax_excl = min($this->total_wrapping_tax_excl, max(0, $this->total_wrapping_tax_excl - $discount_remaining_tax_excl));
            foreach ($breakdown as &$data) {
                $data['total_tax_excl'] = $wrapping_tax_excl;
                $data['total_amount'] = Tools::ps_round($wrapping_tax_excl * $data['rate'] / 100, Context::getContext()->getComputingPrecision(), $this->getOrder()->round_mode);
            }
        }
        return $breakdown;
    }
}
