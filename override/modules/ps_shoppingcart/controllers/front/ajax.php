<?php
/*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

/**
 *
 */
class Ps_ShoppingcartAjaxModuleFrontControllerOverride extends Ps_ShoppingcartAjaxModuleFrontController
{
    /**
     * @var bool
     */
    public $ssl = true;

    /**
     * @return void
     * @throws Exception
     * @see FrontController::initContent()
     *
     */
    public function initContent()
    {
        $modal = null;

        if ($this->module instanceof Ps_Shoppingcart && Tools::getValue('action') === 'add-to-cart') {
            $modal = $this->module->renderModal(
                $this->context->cart,
                (int)Tools::getValue('id_product'),
                (int)Tools::getValue('id_product_attribute'),
                (int)Tools::getValue('id_customization')
            );
        }

        if (Tools::getValue('action') === 'set_carrier') {
            $carrier = Tools::getValue('checked');
            $id_cart = Context::getContext()->cookie->id_cart;

            $cartObject = new Cart($id_cart);
            $delivery_option_list = $cartObject->getDeliveryOptionList($this->context->country);

            $shippingCarrier = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER');
            $pickupCarrier = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER');

            try {
                switch ($carrier) {
                    case 'shipping':
                        $this->context->cart->id_carrier = $shippingCarrier;
                        foreach ($delivery_option_list as $id_address => $delivery_option) {
                            foreach ($delivery_option as $delivery_option_key => $option) {
                                if ((int)$delivery_option_key == $shippingCarrier) {
                                    $delivery_option_value = [$id_address => $delivery_option_key];
                                    $this->context->cart->setDeliveryOption($delivery_option_value);
                                    $this->context->cart->save();
                                }
                            }
                        }
                        break;
                    case 'pickup':
                        $this->context->cart->id_carrier = $pickupCarrier;
                        foreach ($delivery_option_list as $id_address => $delivery_option) {
                            foreach ($delivery_option as $delivery_option_key => $option) {
                                if ((int)$delivery_option_key == $pickupCarrier) {
                                    $delivery_option_value = [$id_address => $delivery_option_key];
                                    $this->context->cart->setDeliveryOption($delivery_option_value);
                                    $this->context->cart->save();
                                }
                            }
                        }
                        break;
                }
            } catch (PrestaShopException $e) {
                die(json_encode([
                    'success' => false,
                    'error' => $e->getMessage(),
                    'modal' => $this->module->renderList($this->context->cart),
                    'preview' => $this->module->renderWidget(null, ['cart' => $this->context->cart]),
                ]));
            }

            $remainder = (float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_REMAINDER_OF_DISCOUNTS);
            $remainder_excl = (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS);


            if ($remainder > 0) {
                $totalTax = Context::getContext()->currentLocale->formatPrice($remainder_excl - $remainder, 'EUR');
                $total = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS), 'EUR');
                $totalWithTax = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_REMAINDER_OF_DISCOUNTS), 'EUR');
            } else {
                $totalTax = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_PRODUCTS), 'EUR');
                $total = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::BOTH), 'EUR');
                $totalWithTax = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::BOTH), 'EUR');
            }


            $productTotal = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS), 'EUR');
            $productTotalWithTax = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_PRODUCTS), 'EUR');
            $totalShipping = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING), 'EUR');
            $totalShippingWithTax = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_SHIPPING), 'EUR');
            $totalDiscount = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS), 'EUR');
            $totalDiscountWithTax = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_DISCOUNTS), 'EUR');
            $totalDiscountNoCalculation = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS_NO_CALCULATION), 'EUR');
            $totalDiscountNoCalculationWithTax = Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_DISCOUNTS_NO_CALCULATION), 'EUR');


            die(json_encode([
                'cart' => $this->context->cart,
                'total_shipping_with_tax' => $totalShippingWithTax,
                'total_shipping' => $totalShipping,
                'total_products_with_tax' => $productTotalWithTax,
                'total_products' => $productTotal,
                'total_discount_with_tax' => $totalDiscountWithTax,
                'total_discount' => $totalDiscount,
                'total_remainder_with_tax' => $totalDiscountNoCalculationWithTax,
                'total_remainder' => $totalDiscountNoCalculation,
                'total_tax' => $totalTax,
                'total' => $total,
                'total_with_taxes' => $totalWithTax,
                'success' => true,
                'error' => null,
                'modal' => $this->module->renderList($this->context->cart),
                'preview' => $this->module->renderWidget(null, ['cart' => $this->context->cart]),
            ]));
        }

        if (Tools::getValue('action') === 'toggle_cart') {
            $checked = Tools::getValue('checked');
            $this->context->cookie->__set('cart_toggle', $checked);
            die(json_encode(['cart_toggle' => $checked]));
        }

        $modal = $this->module->renderList($this->context->cart);

        ob_end_clean();
        header('Content-Type: application/json');
        die(json_encode([
            'preview' => $this->module instanceof Ps_Shoppingcart ? $this->module->renderWidget(null, ['cart' => $this->context->cart]) : '',
            'modal' => $modal,
        ]));
    }


}
