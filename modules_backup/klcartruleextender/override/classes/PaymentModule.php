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
class PaymentModule extends PaymentModuleCore
{
    protected function createOrderCartRules(
        Order $order,
        Cart $cart,
        $order_list,
        $total_reduction_value_ti,
        $total_reduction_value_tex,
        $id_order_state
    ) {
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
            || (!Configuration::get('KL_CART_RULE_EXTENDER_SHIPPING_FEES') && !Configuration::get('KL_CART_RULE_EXTENDER_WRAPPING_FEES'))
            || count($order_list) > 1
        ) {
            return parent::createOrderCartRules($order, $cart, $order_list, $total_reduction_value_ti, $total_reduction_value_tex, $id_order_state);
        }

        $cart_rules = $cart->getCartRules(CartRule::FILTER_ACTION_ALL, true, false, $order->product_list, $order->id_carrier, false);
        $calculator = $moduleClass->getCalculator();

        if (!$calculator->isProcessed) {
            return parent::createOrderCartRules($order, $cart, $order_list, $total_reduction_value_ti, $total_reduction_value_tex, $id_order_state);
        }

        $cart_rule_used = [];
        $cart_rules_list = [];

        foreach ($cart_rules as $cart_rule) {
            $cartRule = $cart_rule['obj'];

            $values = [
                'tax_incl' => $cart_rule['value_real'],
                'tax_excl' => $cart_rule['value_tax_exc'],
            ];

            // If the reduction is not applicable to this order, then continue with the next one
            if (!$values['tax_excl'] || $values['tax_excl'] <= 0) {
                continue;
            }

            // IF
            //  This is not multi-shipping
            //  The value of the voucher is greater than the total of the order
            //  Partial use is allowed
            //  This is an "amount" reduction, not a reduction in % or a gift
            // THEN
            //  The voucher is cloned with a new value corresponding to the remainder
            $cartRuleReductionAmountConverted = $cartRule->reduction_amount;
            if ((int) $cartRule->reduction_currency !== $cart->id_currency) {
                $cartRuleReductionAmountConverted = Tools::convertPriceFull(
                    $cartRule->reduction_amount,
                    new Currency((int) $cartRule->reduction_currency),
                    new Currency($cart->id_currency)
                );
            }

            $remainingValue = $cartRuleReductionAmountConverted - $values[$cartRule->reduction_tax ? 'tax_incl' : 'tax_excl'];
            $remainingValue = Tools::ps_round($remainingValue, $this->context->getComputingPrecision());
            if (1 == count($order_list) && $remainingValue > 0 && 1 == $cartRule->partial_use && $cartRuleReductionAmountConverted > 0) {
                // Create a new voucher from the original
                $voucher = new CartRule((int) $cartRule->id); // We need to instantiate the CartRule without lang parameter to allow saving it
                unset($voucher->id);

                // Set a new voucher code
                $voucher->code = empty($voucher->code) ? substr(md5($order->id . '-' . $order->id_customer . '-' . $cartRule->id), 0, 16) : $voucher->code . '-2';
                if (preg_match('/\-([0-9]{1,2})\-([0-9]{1,2})$/', $voucher->code, $matches) && $matches[1] == $matches[2]) {
                    $voucher->code = preg_replace('/' . $matches[0] . '$/', '-' . (intval($matches[1]) + 1), $voucher->code);
                }

                // Set the new voucher value
                $voucher->reduction_amount = $remainingValue;
                if ($voucher->reduction_tax) {
                    // Add total shipping amount only if reduction amount > total shipping
                    if (1 == $voucher->free_shipping && $voucher->reduction_amount >= $order->total_shipping_tax_incl) {
                        $voucher->reduction_amount -= $order->total_shipping_tax_incl;
                    }
                } else {
                    // Add total shipping amount only if reduction amount > total shipping
                    if (1 == $voucher->free_shipping && $voucher->reduction_amount >= $order->total_shipping_tax_excl) {
                        $voucher->reduction_amount -= $order->total_shipping_tax_excl;
                    }
                }
                if ($voucher->reduction_amount <= 0) {
                    continue;
                }

                if ($this->context->customer->isGuest()) {
                    $voucher->id_customer = 0;
                } else {
                    $voucher->id_customer = $order->id_customer;
                }

                $voucher->quantity = 1;
                $voucher->reduction_currency = $order->id_currency;
                $voucher->quantity_per_user = 1;
                if ($voucher->add()) {
                    // If the voucher has conditions, they are now copied to the new voucher
                    CartRule::copyConditions($cartRule->id, $voucher->id);
                    $orderLanguage = new Language((int) $order->id_lang);

                    $params = [
                        '{voucher_amount}' => Tools::getContextLocale($this->context)->formatPrice($voucher->reduction_amount, $this->context->currency->iso_code),
                        '{voucher_num}' => $voucher->code,
                        '{firstname}' => $this->context->customer->firstname,
                        '{lastname}' => $this->context->customer->lastname,
                        '{id_order}' => $order->id,
                        '{order_name}' => $order->getUniqReference(),
                    ];
                    Mail::Send(
                        (int) $order->id_lang,
                        'voucher',
                        Context::getContext()->getTranslator()->trans(
                            'New voucher for your order %s',
                            [$order->reference],
                            'Emails.Subject',
                            $orderLanguage->locale
                        ),
                        $params,
                        $this->context->customer->email,
                        $this->context->customer->firstname . ' ' . $this->context->customer->lastname,
                        null,
                        null,
                        null,
                        null,
                        _PS_MAIL_DIR_,
                        false,
                        (int) $order->id_shop
                    );
                }
            }

            $order->addCartRule($cartRule->id, $cartRule->name, $values, 0, $cartRule->free_shipping);

            if ($id_order_state != Configuration::get('PS_OS_ERROR') && $id_order_state != Configuration::get('PS_OS_CANCELED') && !in_array($cartRule->id, $cart_rule_used)) {
                $cart_rule_used[] = $cartRule->id;

                // Create a new instance of Cart Rule without id_lang, in order to update its quantity
                $cart_rule_to_update = new CartRule((int) $cartRule->id);
                $cart_rule_to_update->quantity = max(0, $cart_rule_to_update->quantity - 1);
                $cart_rule_to_update->update();
            }

            $cart_rules_list[] = [
                'voucher_name' => $cartRule->name,
                'voucher_reduction' => (0.00 != $values['tax_incl'] ? '-' : '') . Tools::getContextLocale($this->context)->formatPrice($values['tax_incl'], $this->context->currency->iso_code),
            ];
        }

        return $cart_rules_list;
    }
}
