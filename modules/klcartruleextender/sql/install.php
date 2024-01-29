<?php
/**
* 2022 - Keyrnel
*
* NOTICE OF LICENSE
*
* The source code of this module is under a commercial license.
* Each license is unique and can be installed and used on only one shop.
* Any reproduction or representation total or partial of the module, one or more of its components,
* by any means whatsoever, without express permission from us is prohibited.
* If you have not received this module from us, thank you for contacting us.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future.
*
* @author    Keyrnel
* @copyright 2022 - Keyrnel
* @license   commercial
* International Registered Trademark & Property of Keyrnel
*/
$sql = [
    'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'cart_rule_fees`
  	(
  		`id_cart_rule` int(10) unsigned NOT NULL,
  		PRIMARY KEY  (`id_cart_rule`)
  	) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci',

    'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'order_fees`
  	(
  		`id_order` int(10) unsigned NOT NULL,
  		`include_shipping` tinyint(1) unsigned NOT NULL,
  		`include_wrapping` tinyint(1) unsigned NOT NULL,
  		PRIMARY KEY  (`id_order`)
  	) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci',
];
