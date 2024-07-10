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
 * This function updates your module from previous versions to the version 1.1,
 * usefull when you modify your database, or register a new hook ...
 * Don't forget to create one file per version.
 */
function upgrade_module_1_6_4_0($module)
{ 
    if (method_exists($module, 'uninstallCompatibilityWithModules')) {
        $module->uninstallCompatibilityWithModules();    
    }
    if (method_exists($module, 'uninstallThirtyPartyModulesOverridesForCompatibility')) {
        $module->uninstallThirtyPartyModulesOverridesForCompatibility();    
    }
    
    $module->uninstallOverrides();
    $module->installOverrides(); 
    
    @unlink(_PS_MODULE_DIR_.'/advancedvatmanager/currencyrateupdate-cron.php');
    @unlink(_PS_MODULE_DIR_.'/advancedvatmanager/checkcustomervat-cron.php');
    
    Configuration::updateValue('ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID', 0);
    
    $sql = array('ALTER TABLE `' . _DB_PREFIX_ . 'advancedvatmanager_customers` MODIFY COLUMN `system_check` VARCHAR(1) DEFAULT NULL;');
    foreach ($sql as $query) {
        if (Db::getInstance()->execute($query) === false) {
            die('Error while creating Database tables.');
        }
    }
    
    // Clear cache.
    if (method_exists('Tools', 'clearAllCache')) {
        Tools::clearAllCache();    
    }
    else if (method_exists('Tools', 'clearSmartyCache')) {
        Tools::clearSmartyCache();    
    }
    
    return true; 
}
