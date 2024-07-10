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
function upgrade_module_1_6_2($module)
{
    Configuration::updateValue('ADVANCEDVATMANAGER_DISPLAY_VATEXEMPT_LABEL_PRODUCT', 1);
    
    if (method_exists($module, 'uninstallCompatibilityWithModules')) {
        $module->uninstallCompatibilityWithModules();    
    }
    if (method_exists($module, 'uninstallThirtyPartyModulesOverridesForCompatibility')) {
        $module->uninstallThirtyPartyModulesOverridesForCompatibility();    
    }
    
    $module->uninstallOverrides();
    $module->installOverrides(); 
    
    // Remove files
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/currencyrateupdate-cron17.php');
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/currencyrateupdate-cron16.php');
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/checkcustomervat-cron16.php');
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/checkcustomervat-cron17.php');
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/controllers/front/cron16.php');
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/controllers/front/cron17.php');
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/controllers/front/cronCurrencyRateUpdate16.php');
    unlink(_PS_MODULE_DIR_.'/advancedvatmanager/controllers/front/cronCurrencyRateUpdate17.php');
    
    // Fix BUG in some shops with null value in PS_USE_ECOTAX
    if (!Configuration::get('PS_USE_ECOTAX')) {
        Configuration::updateValue('PS_USE_ECOTAX', 0);
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
