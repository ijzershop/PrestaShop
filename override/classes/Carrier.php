<?php
/**
 * 2010-2022 Tuni-Soft
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
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
class Carrier extends CarrierCore
{
    /*
    * module: dynamicproduct
    * date: 2023-01-13 08:06:00
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
