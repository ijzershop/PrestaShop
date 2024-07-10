<?php
/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * In some cases you should not drop the tables.
 * Maybe the merchant will just try to reset the module
 * but does not want to loose all of the data associated to the module.
 */
$sql = array('DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_customers`;', 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_orders`;', 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_customers_exemption`;', 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_customers_exemption_shop`;','DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart`;');
foreach ($sql as $query) {
    if (Db::getInstance()->execute($query) == false) {
        return false;
    }
}
