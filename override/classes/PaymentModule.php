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
use PrestaShop\PrestaShop\Adapter\StockManager;

class PaymentModule extends PaymentModuleCore
{
    protected function createOrderFromCart(
        Cart $cart,
        Currency $currency,
        $productList,
        $addressId,
        $context,
        $reference,
        $secure_key,
        $payment_method,
        $name,
        $dont_touch_amount,
        $amount_paid,
        $warehouseId,
        $cart_total_paid,
        $debug,
        $order_status,
        $id_order_state,
        $carrierId = null
    ) {


        $order = new Order();
        $order->product_list = $productList;

        if (Configuration::get('PS_TAX_ADDRESS_TYPE') == 'id_address_delivery') {
            $address = new Address((int) $addressId);
            $context->country = new Country((int) $address->id_country, (int) $cart->id_lang);
            if (!$context->country->active) {
                throw new PrestaShopException('The delivery address country is not active.');
            }
        }

//        $carrier = null;
//        if (!$cart->isVirtualCart() && isset($carrierId)) {
//            $carrier = new Carrier((int) $carrierId, (int) $cart->id_lang);
//            $order->id_carrier = (int) $carrier->id;
//            $carrierId = (int) $carrier->id;
//        } else {
//            $order->id_carrier = 0;
//            $carrierId = 0;
//        }

        $carrier = null;
        if (!$cart->isVirtualCart() && isset($cart->id_carrier)) {
            $carrier = new Carrier((int) $cart->id_carrier, (int) $cart->id_lang);
            $order->id_carrier = (int) $carrier->id;
            $carrierId = (int) $carrier->id;
        } else {
            $order->id_carrier = 0;
            $carrierId = 0;
        }

        $order->id_customer = (int) $cart->id_customer;
        $order->id_address_invoice = (int) $cart->id_address_invoice;
        $order->id_address_delivery = (int) $addressId;
        $order->id_currency = $currency->id;
        $order->id_lang = (int) $cart->id_lang;
        $order->id_cart = (int) $cart->id;
        $order->reference = $reference;

        //-------------------------------------------------------------------- Add value added to order
        $order->added_to_order = $cart->added_to_order;

        $order->id_shop = (int) $context->shop->id;
        $order->id_shop_group = (int) $context->shop->id_shop_group;

        $order->secure_key = ($secure_key ? pSQL($secure_key) : pSQL($context->customer->secure_key));
        $order->payment = $payment_method;
        if (isset($name)) {
            $order->module = $name;
        }
        $order->recyclable = $cart->recyclable;
        $order->gift = (int) $cart->gift;
        $order->gift_message = $cart->gift_message;
        $order->mobile_theme = $cart->mobile_theme;
        $order->conversion_rate = $currency->conversion_rate;
        $amount_paid = !$dont_touch_amount ? Tools::ps_round((float) $amount_paid, _PS_PRICE_COMPUTE_PRECISION_) : $amount_paid;
        $order->total_paid_real = 0;

        $order->total_products = (float) $cart->getOrderTotal(false, Cart::ONLY_PRODUCTS, $order->product_list, $carrierId);
        $order->total_products_wt = (float) $cart->getOrderTotal(true, Cart::ONLY_PRODUCTS, $order->product_list, $carrierId);
        $order->total_discounts_tax_excl = (float) abs($cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS, $order->product_list, $carrierId));
        $order->total_discounts_tax_incl = (float) abs($cart->getOrderTotal(true, Cart::ONLY_DISCOUNTS, $order->product_list, $carrierId));
        $order->total_discounts = $order->total_discounts_tax_incl;

        $order->total_shipping_tax_excl = (float) $cart->getTotalShippingCost(null, false);
        $order->total_shipping_tax_incl = (float) $cart->getTotalShippingCost(null, true);
        $order->total_shipping = $order->total_shipping_tax_incl;

        if (null !== $carrier && Validate::isLoadedObject($carrier)) {
            $order->carrier_tax_rate = $carrier->getTaxesRate(new Address((int) $cart->{Configuration::get('PS_TAX_ADDRESS_TYPE')}));
        }

        $order->total_wrapping_tax_excl = (float) abs($cart->getOrderTotal(false, Cart::ONLY_WRAPPING, $order->product_list, $carrierId));
        $order->total_wrapping_tax_incl = (float) abs($cart->getOrderTotal(true, Cart::ONLY_WRAPPING, $order->product_list, $carrierId));
        $order->total_wrapping = $order->total_wrapping_tax_incl;

        $order->total_paid_tax_excl = (float) Tools::ps_round((float) $cart->getOrderTotal(false, Cart::BOTH, $order->product_list, $carrierId), _PS_PRICE_COMPUTE_PRECISION_);
        $order->total_paid_tax_incl = (float) Tools::ps_round((float) $cart->getOrderTotal(true, Cart::BOTH, $order->product_list, $carrierId), _PS_PRICE_COMPUTE_PRECISION_);
        $order->total_paid = $order->total_paid_tax_incl;
        $order->round_mode = Configuration::get('PS_PRICE_ROUND_MODE');
        $order->round_type = Configuration::get('PS_ROUND_TYPE');

        $order->invoice_date = '0000-00-00 00:00:00';
        $order->delivery_date = '0000-00-00 00:00:00';
        $order->desired_delivery_date = '0000-00-00 00:00:00';

        if ($debug) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Order is about to be added', 1, null, 'Cart', (int) $cart->id, true);
        }

        // Creating order
        $result = $order->add();

        if (!$result) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Order cannot be created', 3, null, 'Cart', (int) $cart->id, true);
            throw new PrestaShopException('Can\'t save Order');
        }

        if ($debug) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - OrderDetail is about to be added', 1, null, 'Cart', (int) $cart->id, true);
        }

        // Insert new Order detail list using cart for the current order
        $order_detail = new OrderDetail(null, null, $context);
        $order_detail->createList($order, $cart, $id_order_state, $order->product_list, 0, true, $warehouseId);

        if ($debug) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - OrderCarrier is about to be added', 1, null, 'Cart', (int) $cart->id, true);
        }

        // Adding an entry in order_carrier table
        if (null !== $carrier) {
            $order_carrier = new OrderCarrier();
            $order_carrier->id_order = (int) $order->id;
            $order_carrier->id_carrier = $carrierId;
            $order_carrier->weight = (float) $order->getTotalWeight();
            $order_carrier->shipping_cost_tax_excl = (float) $order->total_shipping_tax_excl;
            $order_carrier->shipping_cost_tax_incl = (float) $order->total_shipping_tax_incl;
            $order_carrier->add();
        }

        return ['order' => $order, 'orderDetail' => $order_detail];
    }

















}
