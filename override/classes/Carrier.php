<?php
/**
* 2010-2019 Tuni-Soft
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* It is available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future. If you wish to customize the module for your
* needs please refer to
* http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
* for more information.
*
* @author    Tuni-Soft
* @copyright 2010-2019 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/
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

        if($storeCustomer == Context::getContext()->customer->id){
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
            if($storeCustomerLoggedIn){
                $paidShippingCarrier = unserialize(Configuration::get("koopmanOrderExport"));
                if(!empty($paidShippingCarrier) && isset($paidShippingCarrier['select_carrier'])){
                    unset($carrierList[(int)$paidShippingCarrier['select_carrier']]);
                }
            }
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
