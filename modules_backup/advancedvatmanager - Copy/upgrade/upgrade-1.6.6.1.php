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
function upgrade_module_1_6_6_1($module)
{ 
    if (method_exists($module, 'uninstallCompatibilityWithModules')) {
        $module->uninstallCompatibilityWithModules();    
    }
    if (method_exists($module, 'uninstallThirtyPartyModulesOverridesForCompatibility')) {
        $module->uninstallThirtyPartyModulesOverridesForCompatibility();    
    }
    
    $module->uninstallOverrides();
    $module->installOverrides(); 
    
    // Fix issue with parameter PS_USE_ECOTAX with null value
    if (Configuration::get('PS_USE_ECOTAX') == '') {  
        Configuration::updateValue('PS_USE_ECOTAX', '0');
    }
    
    // Clear cache.
    if (method_exists('Tools', 'clearAllCache')) {
        Tools::clearAllCache();    
    }
    else if (method_exists('Tools', 'clearSmartyCache')) {
        Tools::clearSmartyCache();    
    }
    
    $sql = array(
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
    
    return true; 
}
