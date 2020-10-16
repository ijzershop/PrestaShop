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
use PrestaShop\PrestaShop\Adapter\Presenter\Cart\CartPresenter;

class CartController extends CartControllerCore
{
    protected function updateCart()
    {
        // Update the cart ONLY if $this->cookies are available, in order to avoid ghost carts created by bots
        if ($this->context->cookie->exists()
            && !$this->errors
            && !($this->context->customer->isLogged() && !$this->isTokenValid())
        ) {
            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                $this->processChangeProductInCart();
            } elseif (Tools::getIsset('delete')) {
                $this->processDeleteProductInCart();
            } elseif (Tools::getIsset('deleteAll')) {
                $this->context->cart->delete();
                $this->context->cookie->id_cart = 0;
                die(1);
            } elseif (CartRule::isFeatureActive()) {
                if (Tools::getIsset('addDiscount')) {
                    if (!($code = trim(Tools::getValue('discount_name')))) {
                        $this->errors[] = $this->trans(
                            'You must enter a voucher code.',
                            array(),
                            'Shop.Notifications.Error'
                        );
                    } elseif (!Validate::isCleanHtml($code)) {
                        $this->errors[] = $this->trans(
                            'The voucher code is invalid.',
                            array(),
                            'Shop.Notifications.Error'
                        );
                    } else {
                        if (($cartRule = new CartRule(CartRule::getIdByCode($code)))
                            && Validate::isLoadedObject($cartRule)
                        ) {
                            if ($error = $cartRule->checkValidity($this->context, false, true)) {
                                $this->errors[] = $error;
                            } else {
                                $this->context->cart->addCartRule($cartRule->id);
                            }
                        } else {
                            $this->errors[] = $this->trans(
                                'This voucher does not exist.',
                                array(),
                                'Shop.Notifications.Error'
                            );
                        }
                    }
                } elseif (($id_cart_rule = (int) Tools::getValue('deleteDiscount'))
                    && Validate::isUnsignedId($id_cart_rule)
                ) {
                    $this->context->cart->removeCartRule($id_cart_rule);
                    CartRule::autoAddToCart($this->context);
                }
            }
        } elseif (!$this->isTokenValid() && Tools::getValue('action') !== 'show' && !Tools::getValue('ajax')) {
            Tools::redirect('index.php');
        }
    }

}
