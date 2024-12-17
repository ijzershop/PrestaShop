<?php

/**
 *
 */
class Carrier extends CarrierCore
{
    /**
     * For a given {product, warehouse}, gets the carrier available.
     *
     * @param Product $product The id of the product, or an array with at least the package size and weight
     * @param int|null $id_warehouse Warehouse ID
     * @param int|null $id_address_delivery Delivery Address ID
     * @param int|null $id_shop Shop ID
     * @param CartCore|null $cart Cart object
     * @param array|null $error contain an error message if an error occurs
     *
     * @return array Available Carriers
     *
     * @throws PrestaShopDatabaseException
     * @since 1.5.0
     *
     */
    public static function getAvailableCarrierList(Product $product,
                                                           $id_warehouse,
                                                           $id_address_delivery = null,
                                                           $id_shop = null,
                                                           $cart = null,
                                                           &$error = []
    ): array
    {
        if (!Module::isEnabled('dynamicproduct')) {
            $carrier_list = parent::getAvailableCarrierList($product, $id_warehouse, $id_address_delivery, $id_shop, $cart, $error);
        } else {

            if ($cart === null) {
                $cart = Context::getContext()->cart;
            }

            Module::getInstanceByName('dynamicproduct');
            $sizes = DynamicProduct\classes\models\DynamicInput::getMaxSizes($product);
            if ((float)$sizes['width']) {
                $product->width = $sizes['width'];
            }
            if ((float)$sizes['height']) {
                $product->height = $sizes['height'];
            }
            if ((float)$sizes['depth']) {
                $product->depth = $sizes['depth'];
            }

            $carrier_list = parent::getAvailableCarrierList($product, $id_warehouse, $id_address_delivery, $id_shop, $cart, $error);
        }

        return array_filter($carrier_list, function ($carrier) {
            if (self::customerIsFreeToAddToOrder($carrier)) {
                return $carrier;
            }
            return false;
        });
    }


    /**
     * @param $id_carrier
     * @return bool
     */
    private static function customerIsFreeToAddToOrder($id_carrier): bool
    {
        $addToOrderCarrier = (int)Configuration::get('ADDTOORDER_DELIVERY_METHOD',
            Context::getContext()->cookie->id_lang,
            Context::getContext()->shop->id_shop_group,
            Context::getContext()->shop->id_shop);

        if ((int)$id_carrier == $addToOrderCarrier && !Context::getContext()->cookie->is_guest) {
            $acceptedOrderStatusIds = explode(',', Configuration::get('ADDTOORDER_ORDER_STATUSES',
                Context::getContext()->cookie->id_lang,
                Context::getContext()->shop->id_shop_group,
                Context::getContext()->shop->id_shop));

            foreach (Order::getCustomerOrders(Context::getContext()->cookie->id_customer, true, Context::getContext()) as $order) {
                $orderToCheck = (array)$order;
                if (in_array($orderToCheck['id_order_state'] , $acceptedOrderStatusIds)) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }
}
