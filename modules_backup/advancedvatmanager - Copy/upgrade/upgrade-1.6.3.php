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
