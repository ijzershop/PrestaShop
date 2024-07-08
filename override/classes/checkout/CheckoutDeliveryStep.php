<?php
class CheckoutDeliveryStep extends CheckoutDeliveryStepCore
{
public $shippingFieldError;
    public function handleRequest(array $requestParams = [])
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
        $delivery_option = "";
        if(isset($requestParams['delivery_option']) && !is_null($requestParams['delivery_option'])){
            $delivery_option = (int)reset($requestParams['delivery_option']);
        }
        if((int)Configuration::get('ADDTOORDER_DELIVERY_METHOD') == $delivery_option || (int)Configuration::get('ADDTOORDER_DELIVERY_METHOD') == (int)$this->context->cart->id_carrier){
            if(isset($requestParams['added_to_order'])){
                if($requestParams['added_to_order'] === ''){
                    $this->getCheckoutProcess()->setHasErrors(true);
                    $this->setAddedToOrderValidationMsg('Er is geen order referentie geselecteerd waaraan u deze bestelling wilt toevoegen!',$delivery_option, 'error');
                    return false;
                }
                $this->context->cart->added_to_order = $requestParams['added_to_order'];
                $this->context->cart->update();
            } else {
            }
        } else {
            $this->context->cart->added_to_order = null;
            $this->context->cart->update();
        }
        if (isset($requestParams['delivery_message'])) {
            $this->getCheckoutSession()->setMessage($requestParams['delivery_message']);
        }
        if ($this->isReachable() && isset($requestParams['confirmDeliveryOption'])) {
            $deliveryOptions = $this->getCheckoutSession()->getDeliveryOptions();
            $this->setNextStepAsCurrent();
            $this->setComplete(
                !empty($deliveryOptions)
                && $this->getCheckoutSession()->getSelectedDeliveryOption()
                && $this->isModuleComplete($requestParams)
            );
        }
        $this->setTitle($this->getTranslator()->trans('Shipping Method', [], 'Shop.Theme.Checkout'));
        Hook::exec('actionCarrierProcess', ['cart' => $this->getCheckoutSession()->getCart()]);
    }
    private function setAddedToOrderValidationMsg ($msg, $field, $type='error')
    {
        $notificationsType = 'Error';
        switch ($type){
            case 'success':
                $this->shippingFieldError = [
                    'field' => $field.',',
                    'validation_msg' => 'De order is gevonden. U kunt nu uw bestelling afrekenen',
                    'class' => 'is-valid',
                ];
                $validationMsg = $this->getTranslator()->trans(
                    $msg,
                    [],
                    'Shop.Notifications.'.$notificationsType);
                break;
            case 'warning':
                $this->shippingFieldError = [
                    'field' => $field.',',
                    'validation_msg' => 'Er ging wat mis tijdens het zoeken naar uw order, probeer het nogmaal',
                    'class' => 'is-valid',
                ];
                $validationMsg = $this->getTranslator()->trans(
                    $msg,
                    [],
                    'Shop.Notifications.'.$notificationsType);
                break;
            default:
                $this->shippingFieldError = [
                    'field' => $field.',',
                    'validation_msg' => 'U moet een lopende order selecteren om deze bestelling aan toe te voegen',
                    'class' => 'is-invalid',
                ];
                $this->context->controller->errors[] = $this->getTranslator()->trans(
                    $msg,
                    [],
                    'Shop.Notifications.'.$notificationsType);
            }
    }
    private function getAddedToOrderValidationMsg()
    {
        return $this->shippingFieldError;
    }
    /*
    * module: wkwebp
    * date: 2024-07-03 14:05:51
    * version: 4.1.2
    */
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
