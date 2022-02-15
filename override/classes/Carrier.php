<?php
declare(strict_types=1);
use PrestaShop\PrestaShop\Adapter\Entity\Module;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
class Carrier extends CarrierCore
{
    /*
    * module: dynamicproduct
    * date: 2022-02-07 13:34:27
    * version: 2.43.11
    */
    public static function getAvailableCarrierList(
        $product,
        $id_warehouse,
        $id_address_delivery = null,
        $id_shop = null,
        $cart = null,
        &$error = array()
    ) {
        if (!Module::isEnabled('dynamicproduct')) {
            return parent::getAvailableCarrierList(
                $product,
                $id_warehouse,
                $id_address_delivery,
                $id_shop,
                $cart,
                $error
            );
        }
        if ($cart === null) {
            $cart = Context::getContext()->cart;
        }
        Module::getInstanceByName('dynamicproduct');
        $sizes = classes\models\DynamicInput::getMaxSizes($product);
        if ((float) $sizes['width']) {
            $product->width = $sizes['width'];
        }
        if ((float) $sizes['height']) {
            $product->height = $sizes['height'];
        }
        if ((float) $sizes['depth']) {
            $product->depth = $sizes['depth'];
        }
        return parent::getAvailableCarrierList($product, $id_warehouse, $id_address_delivery, $id_shop, $cart, $error);
    }
}
