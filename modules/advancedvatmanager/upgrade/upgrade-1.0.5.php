<?php
/**
* 2007-2017 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2017 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * This function updates your module from previous versions to the version 1.1,
 * usefull when you modify your database, or register a new hook ...
 * Don't forget to create one file per version.
 */
function upgrade_module_1_0_5($module)
{
    Configuration::updateValue('ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP', 1);
    $module->uninstallOverrides();
    $module->installOverrides();
    $module->registerHook('actionValidateOrder');
    
    $sql = array(
        'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'advancedvatmanager_orders` (
        `id_advancedvatmanager_orders` int(11) NOT NULL AUTO_INCREMENT,
        `id_order` int(11) NOT NULL UNIQUE,
        `id_customer` int(11) NOT NULL,
        `id_address_invoice` int(11) NOT NULL,
        `id_address_delivery` int(11) NOT NULL,
        `country_iso` varchar(32),  
    	`vat` varchar(32),
    	`notax` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
        `date_add` datetime NOT NULL,
        PRIMARY KEY  (`id_advancedvatmanager_orders`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;');
    
    foreach ($sql as $query) {
        if (Db::getInstance()->execute($query) === false) {
            die('Error while creating Database tables.');
        }
    }

    return true; 
}
