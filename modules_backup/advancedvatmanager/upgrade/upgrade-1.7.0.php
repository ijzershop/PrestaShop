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
function upgrade_module_1_7_0($module)
{ 
    if (method_exists($module, 'uninstallCompatibilityWithModules')) {
        $module->uninstallCompatibilityWithModules();    
    }
    if (method_exists($module, 'uninstallThirtyPartyModulesOverridesForCompatibility')) {
        $module->uninstallThirtyPartyModulesOverridesForCompatibility();    
    }
    
    $module->uninstallOverrides();
    $module->installOverrides(); 
    
    // Clear cache.
    if (method_exists('Tools', 'clearAllCache')) {
        Tools::clearAllCache();    
    }
    else if (method_exists('Tools', 'clearSmartyCache')) {
        Tools::clearSmartyCache();    
    }
    
    Configuration::updateValue('ADVANCEDVATMANAGER_LICENSE', '');   
    Configuration::updateValue('ADVANCEDVATMANAGER_HASH', '');
    Configuration::updateValue('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANYADDRESS', 0);
    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')) {
        Configuration::updateValue('ADVANCEDVATMANAGER_COMPANY_VALIDATION', 95);    
    }
    
    //Modify database tables
    $sql = array('ALTER TABLE `' . _DB_PREFIX_ . 'advancedvatmanager_orders` ADD COLUMN IF NOT EXISTS `client_type` VARCHAR(20) DEFAULT NULL AFTER `voec`;','ALTER TABLE `' . _DB_PREFIX_ . 'advancedvatmanager_customers` ADD COLUMN IF NOT EXISTS `client_type` VARCHAR(20) DEFAULT NULL AFTER `validated_company`;','ALTER TABLE `' . _DB_PREFIX_ . 'advancedvatmanager_customers` ADD COLUMN IF NOT EXISTS `validated_company_address` TINYINT(1) UNSIGNED AFTER `validated_company`;');
    foreach ($sql as $query) {
        if (Db::getInstance()->execute($query) === false) {
            die('Error while creating Database tables.');
        }
    }
    
    return true; 
}
