<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

class CheckoutDeliveryStep extends CheckoutDeliveryStepCore
{
    public function render(array $extraParams = [])
    {
        if (Module::isEnabled('wkwebp')
            && Configuration::get('WK_WEBP_ENABLE_MODULE')
            && !Context::getContext()->cookie->wk_webp_safari
        ) {
            $wkDeliveryOptions = $this->getCheckoutSession()->getDeliveryOptions();
            if ($wkDeliveryOptions) {
                foreach ($wkDeliveryOptions as &$option) {
                    if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/carrier/' . $option['id'] . '.webp')) {
                        $option['logo'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                        '/modules/wkwebp/views/img/carrier/' . $option['id'] . '.webp';
                    }
                }
            }

            return $this->renderTemplate(
                $this->getTemplate(),
                $extraParams,
                [
                    'hookDisplayBeforeCarrier' => Hook::exec('displayBeforeCarrier', ['cart' => $this->getCheckoutSession()->getCart()]),
                    'hookDisplayAfterCarrier' => Hook::exec('displayAfterCarrier', ['cart' => $this->getCheckoutSession()->getCart()]),
                    'id_address' => $this->getCheckoutSession()->getIdAddressDelivery(),
                    'delivery_options' => $wkDeliveryOptions,
                    'delivery_option' => $this->getCheckoutSession()->getSelectedDeliveryOption(),
                    'recyclable' => $this->getCheckoutSession()->isRecyclable(),
                    'recyclablePackAllowed' => $this->isRecyclablePackAllowed(),
                    'delivery_message' => $this->getCheckoutSession()->getMessage(),
                    'gift' => [
                        'allowed' => $this->isGiftAllowed(),
                        'isGift' => $this->getCheckoutSession()->getGift()['isGift'],
                        'label' => $this->getTranslator()->trans(
                            'I would like my order to be gift wrapped %cost%',
                            ['%cost%' => $this->getGiftCostForLabel()],
                            'Shop.Theme.Checkout'
                        ),
                        'message' => $this->getCheckoutSession()->getGift()['message'],
                    ],
                ]
            );
        } else {
            return $this->renderTemplate(
                $this->getTemplate(),
                $extraParams,
                [
                    'hookDisplayBeforeCarrier' => Hook::exec('displayBeforeCarrier', ['cart' => $this->getCheckoutSession()->getCart()]),
                    'hookDisplayAfterCarrier' => Hook::exec('displayAfterCarrier', ['cart' => $this->getCheckoutSession()->getCart()]),
                    'id_address' => $this->getCheckoutSession()->getIdAddressDelivery(),
                    'delivery_options' => $this->getCheckoutSession()->getDeliveryOptions(),
                    'delivery_option' => $this->getCheckoutSession()->getSelectedDeliveryOption(),
                    'recyclable' => $this->getCheckoutSession()->isRecyclable(),
                    'recyclablePackAllowed' => $this->isRecyclablePackAllowed(),
                    'delivery_message' => $this->getCheckoutSession()->getMessage(),
                    'gift' => [
                        'allowed' => $this->isGiftAllowed(),
                        'isGift' => $this->getCheckoutSession()->getGift()['isGift'],
                        'label' => $this->getTranslator()->trans(
                            'I would like my order to be gift wrapped %cost%',
                            ['%cost%' => $this->getGiftCostForLabel()],
                            'Shop.Theme.Checkout'
                        ),
                        'message' => $this->getCheckoutSession()->getGift()['message'],
                    ],
                ]
            );
        }
    }
}
