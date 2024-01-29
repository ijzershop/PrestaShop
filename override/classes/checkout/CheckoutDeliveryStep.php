<?php
/**
 * Class CheckoutDeliveryStep Overide fixed for 1.7.7.8
 */

class CheckoutDeliveryStep extends CheckoutDeliveryStepCore
{

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
        /**
         * Start module update added2order
         */
        $delivery_option = "";
        if(isset($requestParams['delivery_option']) && !is_null($requestParams['delivery_option'])){
            $delivery_option = (int)reset($requestParams['delivery_option']);
        }
        if((int)Configuration::get('ADDTOORDER_DELIVERY_METHOD') == $delivery_option || (int)Configuration::get('ADDTOORDER_DELIVERY_METHOD') == (int)$this->context->cart->id_carrier){
            // Fetch new value to cart params
            if(isset($requestParams['added_to_order'])){
                $this->context->cart->added_to_order = $requestParams['added_to_order'];
                $this->context->cart->update();
            }
        } else {
            $this->context->cart->added_to_order = null;
            $this->context->cart->update();
        }

        /**
         * End module update added2order
         */


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

        $this->setTitle($this->getTranslator()->trans('Shipping Method', [], 'Shop.Theme.Checkout'));

        Hook::exec('actionCarrierProcess', ['cart' => $this->getCheckoutSession()->getCart()]);
    }
}
