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

/**
 * @param DynamicProduct $module
 * @return boolean
 */
function upgrade_module_1_8_2($module)
{
    $override_order_detail = _PS_OVERRIDE_DIR_ . 'classes/order/OrderDetail.php';

    if (is_file($override_order_detail)) {
        $content = Tools::file_get_contents($override_order_detail);
        $content = str_replace('function checkProductStock(', 'function _checkProductStock(', $content);
        file_put_contents($override_order_detail, $content);
    }

    return $module->registerHook('displayPaymentTop') &&
        $module->registerHook('displayBeforeShoppingCartBlock') &&
        $module->registerHook('actionOrderStatusPostUpdate');
}
