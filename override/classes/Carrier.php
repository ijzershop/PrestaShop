<?php
declare(strict_types=1);
use PrestaShop\PrestaShop\Adapter\Entity\Module;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
class Carrier extends CarrierCore
{
    /*
    * module: dynamicproduct
    * date: 2021-10-15 10:43:05
    * version: 2.30.0
    */
    public static function getAvailableCarrierList(
        Product $product,
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
        if ((float)$sizes['width']) {
            $product->width = $sizes['width'];
        }
        if ((float)$sizes['height']) {
            $product->height = $sizes['height'];
        }
        if ((float)$sizes['depth']) {
            $product->depth = $sizes['depth'];
        }
        return parent::getAvailableCarrierList($product, $id_warehouse, $id_address_delivery, $id_shop, $cart, $error);
    }
}
