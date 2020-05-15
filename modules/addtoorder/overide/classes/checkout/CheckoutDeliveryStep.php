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

class CheckoutDeliveryStep extends CheckoutDeliveryStepCore
{
 
    public function handleRequest(array $requestParams = array())
    {
        if (isset($requestParams['delivery_option'])) {
            $this->setComplete(false);
            $this->getCheckoutSession()->setDeliveryOption(
                $requestParams['delivery_option']
            );
            $this->getCheckoutSession()->setRecyclable(
                isset($requestParams['recyclable']) ? $requestParams['recyclable'] : false
            );

            $useGift = isset($requestParams['gift']) ? $requestParams['gift'] : false;
            $this->getCheckoutSession()->setGift(
                $useGift,
                ($useGift && isset($requestParams['gift_message'])) ? $requestParams['gift_message'] : ''
            );
        }

        if (isset($requestParams['delivery_message'])) {
            $this->getCheckoutSession()->setMessage($requestParams['delivery_message']);
        }

        if ($this->isReachable() && isset($requestParams['confirmDeliveryOption'])) {
            // we're done if
            // - the step was reached (= all previous steps complete)
            // - user has clicked on "continue"
            // - there are delivery options
            // - the is a selected delivery option
            // - the module associated to the delivery option confirms
            $deliveryOptions = $this->getCheckoutSession()->getDeliveryOptions();
            $this->setNextStepAsCurrent();
            $this->setComplete(
                !empty($deliveryOptions)
                && $this->getCheckoutSession()->getSelectedDeliveryOption()
                && $this->isModuleComplete($requestParams)
            );
        }

        // Fetch new value to cart params
        $checkoutCart = $this->getCheckoutSession()->getCart();
        if( isset($requestParams['added_to_order'])){
            $checkoutCart->added_to_order = $requestParams['added_to_order'];
        }

        $this->setTitle($this->getTranslator()->trans('Shipping Method', array(), 'Shop.Theme.Checkout'));

        Hook::exec('actionCarrierProcess', array('cart' => $checkoutCart));
    }
}
