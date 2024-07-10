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

$sql = array(
'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_customers` (
    `id_advancedvatmanager_customers` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_customer` int(11) UNSIGNED NOT NULL,
    `id_address` int(11) UNSIGNED NOT NULL UNIQUE,
    `id_shop` int(11) UNSIGNED NOT NULL DEFAULT 1, 
	`vat` varchar(32),
	`validated` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    `validated_company` TINYINT(1) UNSIGNED,
    `validated_company_address` TINYINT(1) UNSIGNED,
    `client_type` VARCHAR(20) DEFAULT NULL,
    `system_check` TINYINT(1) UNSIGNED DEFAULT NULL,
    `status` varchar(255) NOT NULL,
    `date_upd` datetime NOT NULL,
    `date_add` datetime NOT NULL,
    PRIMARY KEY  (`id_advancedvatmanager_customers`)
) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;', 
'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_orders` (
    `id_advancedvatmanager_orders` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_order` int(11) UNSIGNED NOT NULL UNIQUE,
    `id_shop` int(11) UNSIGNED NOT NULL DEFAULT 1,
    `id_customer` int(11) UNSIGNED NOT NULL,
	`notax` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    `brexit` TINYINT(1) UNSIGNED DEFAULT 0,
    `voec` TINYINT(1) UNSIGNED DEFAULT 0,
    `client_type` VARCHAR(20) DEFAULT NULL,
    `invoice` int(11) UNSIGNED DEFAULT 0,
    `date_upd` datetime NOT NULL,
    `date_add` datetime NOT NULL,
    PRIMARY KEY  (`id_advancedvatmanager_orders`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;',
'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_customers_exemption` (
    `id_advancedvatmanager_customers_exemption` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_customer` int(11) UNSIGNED NOT NULL UNIQUE,
    `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    `date_upd` datetime NOT NULL,
    `date_add` datetime NOT NULL,
    PRIMARY KEY  (`id_advancedvatmanager_customers_exemption`)
) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;',
'CREATE TABLE IF NOT EXISTS `'._DB_PREFIX_.'advancedvatmanager_customers_exemption_shop` (
    `id_advancedvatmanager_customers_exemption` int(11) UNSIGNED NOT NULL,
    `id_shop` int(11) UNSIGNED NOT NULL,
      PRIMARY KEY (`id_advancedvatmanager_customers_exemption`,`id_shop`),
      KEY `id_shop` (`id_shop`)
) ENGINE='._MYSQL_ENGINE_.' DEFAULT CHARSET=utf8;' ,
'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart` (
    `id_advancedvatmanager_customer_cart` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_cart` int(11) UNSIGNED NOT NULL,
    `id_customer` int(11) UNSIGNED NOT NULL,
    `id_address_delivery` int(11) UNSIGNED,
    `id_address_invoice` int(11) UNSIGNED,
    `id_shop` int(11) UNSIGNED NOT NULL DEFAULT 1,
    `total` DECIMAL(20,6) DEFAULT "0.000000",
    `products`  TEXT NULL DEFAULT NULL,
    `date_upd` datetime NOT NULL,
    `date_add` datetime NOT NULL,
    PRIMARY KEY  (`id_advancedvatmanager_customer_cart`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;',   
);

foreach ($sql as $query) {
    if (Db::getInstance()->execute($query) === false) {
        die('Error while creating Database tables.');
    }
}
