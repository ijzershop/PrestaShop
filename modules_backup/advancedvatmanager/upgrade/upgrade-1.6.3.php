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
function upgrade_module_1_6_3($module)
{
    Configuration::updateValue('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_DISPLAY_PRODUCT_PRICE_MODE', 'price_default');
    Configuration::updateValue('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT', '');
    Configuration::updateValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT', '');
    Configuration::updateValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT', '');
    
    Configuration::deleteByName('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_LABEL');
    Configuration::deleteByName('ADVANCEDVATMANAGER_DISPLAY_VATEXEMPT_LABEL_PRODUCT');
    Configuration::deleteByName('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_LABEL_TAX_EXEMPT');
    Configuration::deleteByName('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_LABEL');
    
    if (method_exists($module, 'uninstallCompatibilityWithModules')) {
        $module->uninstallCompatibilityWithModules();    
    }
    if (method_exists($module, 'uninstallThirtyPartyModulesOverridesForCompatibility')) {
        $module->uninstallThirtyPartyModulesOverridesForCompatibility();    
    }
    
    $module->uninstallOverrides();
    $module->installOverrides(); 
    
    @unlink(_PS_MODULE_DIR_.'/advancedvatmanager/views/templates/hook/displayProductPriceBlock.tpl');
    @unlink(_PS_MODULE_DIR_.'/advancedvatmanager/views/templates/hook/displayExpressCheckout.tpl');
    @unlink(_PS_MODULE_DIR_.'/advancedvatmanager/views/js/hook/displayProductPriceBlock/fix_price_label.js');
    
    // Clear cache.
    if (method_exists('Tools', 'clearAllCache')) {
        Tools::clearAllCache();    
    }
    else if (method_exists('Tools', 'clearSmartyCache')) {
        Tools::clearSmartyCache();    
    }
    
    return true; 
}
