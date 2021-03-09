<?php
use classes\models\DynamicInput;
class Carrier extends CarrierCore
{

    public static function getAvailableCarrierList(
        Product $product,
        $id_warehouse,
        $id_address_delivery = null,
        $id_shop = null,
        $cart = null,
        &$error = array()
    ) {

        $storeCustomer = (int)Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMPLOYEE_CUSTOMER_PROFILE');
        $storeCustomerLoggedIn = false;

        if(!is_null(Context::getContext()->customer) && $storeCustomer == Context::getContext()->customer->id){
            $storeCustomerLoggedIn = true;
        }

        if (!Module::isEnabled('dynamicproduct')) {
            $carrierList = parent::getAvailableCarrierList(
                $product,
                $id_warehouse,
                $id_address_delivery,
                $id_shop,
                $cart,
                $error
            );
            return $carrierList;
        }
        if ($cart === null) {
            $cart = Context::getContext()->cart;
        }
        $sizes = DynamicInput::getMaxSizes($cart->id);
        $product->width = $sizes['width'];
        $product->height = $sizes['height'];
        $product->depth = $sizes['depth'];
        $carrierList = parent::getAvailableCarrierList($product, $id_warehouse, $id_address_delivery, $id_shop, $cart, $error);
        if($storeCustomerLoggedIn){
            $paidShippingCarrier = unserialize(Configuration::get("koopmanOrderExport"));
            if(!empty($paidShippingCarrier) && isset($paidShippingCarrier['select_carrier'])){
                unset($carrierList[(int)$paidShippingCarrier['select_carrier']]);
            }
        }
        return $carrierList;
    }
}
