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
    public static function getProductProperties($id_lang, $row, Context $context = null)
    {
        $result = parent::getProductProperties($id_lang, $row, $context);
        /** @var DynamicProduct $module */
        $module = Module::getInstanceByName('dynamicproduct');
        if (Module::isEnabled('dynamicproduct')) {
            if (DpCompat::isAfter1730()) {
                $id_product = (int)$row['id_product'];
                $is_active = DynamicConfig::isActive($id_product);
                if ($is_active) {
                    $displayed_price = DynamicConfig::getDisplayedPrice($id_product);
                    if ((float)$displayed_price) {
                        $module->calculator->assignProductPrices($row, $displayed_price, $result);
                    }
                }
            }
        }
        return $result;
    }
}
