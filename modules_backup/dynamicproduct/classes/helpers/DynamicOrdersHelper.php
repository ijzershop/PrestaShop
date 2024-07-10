<?php
/**
 * 2007-2024 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2024 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\helpers;

if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;

class DynamicOrdersHelper
{
    public static function getCustomizedOrders()
    {
        $orders = [];
        $prefix = _DB_PREFIX_;
        $module = DynamicTools::getModule();
        $sql = "SELECT DISTINCT o.id_order FROM {$prefix}{$module->name}_input i
            JOIN {$prefix}customized_data cd ON cd.value = i.id_input
            JOIN {$prefix}customization c ON c.id_customization = cd.id_customization AND c.id_cart = i.id_cart
            JOIN {$prefix}cart_product cp ON cp.id_customization = cd.id_customization
            JOIN {$prefix}orders o ON o.id_cart = i.id_cart
            WHERE c.in_cart = 1";
        $result = \Db::getInstance()->executeS($sql);
        if (is_array($result)) {
            foreach ($result as $item) {
                $orders[] = (int) $item['id_order'];
            }
        }

        return $orders;
    }
}
