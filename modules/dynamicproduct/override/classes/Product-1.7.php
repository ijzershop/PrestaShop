<?php
/**
* 2010-2018 Tuni-Soft
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
* @copyright 2010-2018 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

class Product extends ProductCore
{
    public static function getPriceStatic(
        $id_product,
        $usetax = true,
        $id_product_attribute = null,
        $decimals = 6,
        $divisor = null,
        $only_reduc = false,
        $usereduc = true,
        $quantity = 1,
        $force_associated_tax = false,
        $id_customer = null,
        $id_cart = null,
        $id_address = null,
        &$specific_price_output = null,
        $with_ecotax = true,
        $use_group_reduction = true,
        Context $context = null,
        $use_customer_price = true,
        $id_customization = null
    ) {
        if (!$context) {
            $context = Context::getContext();
        }
        $return = parent::getPriceStatic(
            $id_product,
            $usetax,
            $id_product_attribute,
            $decimals,
            $divisor,
            $only_reduc,
            $usereduc,
            $quantity,
            $force_associated_tax,
            $id_customer,
            $id_cart,
            $id_address,
            $specific_price_output,
            $with_ecotax,
            $use_group_reduction,
            $context,
            $use_customer_price,
            $id_customization
        );

        $module = Module::getInstanceByName('dynamicproduct');
        if (!$module->active|| $only_reduc) {
            return $return;
        }
        if ((int)$id_cart && DynamicConfig::isExcluded($id_product)) {
            if ((int)$id_product_attribute || (int)$id_customization) {
                $base_price = parent::getPriceStatic(
                    $id_product,
                    $usetax,
                    false,
                    $decimals,
                    $divisor,
                    $only_reduc,
                    $usereduc,
                    $quantity,
                    $force_associated_tax,
                    $id_customer,
                    $id_cart,
                    $id_address,
                    $specific_price_output,
                    $with_ecotax,
                    $use_group_reduction,
                    $context,
                    $use_customer_price
                );
                $difference = $return - $base_price;
                $id_currency = Validate::isLoadedObject($context->currency) ?
                    (int)$context->currency->id :
                    (int) Configuration::get('PS_CURRENCY_DEFAULT');
                $difference = Tools::convertPrice($difference, $id_currency);
                return max($difference, 0);
            } else {
                return 0;
            }
        }
        return $return;
    }
}
