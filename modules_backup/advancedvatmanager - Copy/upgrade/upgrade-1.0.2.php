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
function upgrade_module_1_0_2($module)
{
    /* Install configuration values for Customer group assignation by countries */
    $countries = json_decode(Configuration::get('ADVANCEDVATMANAGER_COUNTRY'));
    if (!empty($countries)) {
        foreach ($countries as $country) {
            Configuration::updateValue('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$country, 0);
        }
    }
    $module->registerHook('actionCartSave');
    
    Configuration::updateValue('ADVANCEDVATMANAGER_BREXIT_ENABLED', 1);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_ASSIGN_GROUP', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_DUPLICATED', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_DELETE_DUPLICATED', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_DELETE_INVALID', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_DELETE_EMPTY', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CRON_OVERWRITE_TABLE', 0);
    Configuration::updateValue('ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION',0);
    Configuration::updateValue('ADVANCEDVATMANAGER_CHANGE_DEFAULT_GROUP_WITHADDRESS', 0);
    
    if(Configuration::get('ADVANCEDVATMANAGER_VALIDATION_TYPE') == 'vies') {
        Configuration::updateValue('ADVANCEDVATMANAGER_VALIDATION_TYPE', 'api');    
    }
    Configuration::updateValue('ADVANCEDVATMANAGER_COUNTRY', $module->getEUCountriesID());
    Configuration::updateValue('ADVANCEDVATMANAGER_SENDAPIALERT', Configuration::get('ADVANCEDVATMANAGER_SENDVIESALERT'));
    Configuration::deleteByName('ADVANCEDVATMANAGER_SENDVIESALERT');
    Configuration::deleteByName('ADVANCEDVATMANAGER_GROUP_ASSIGNATION');
    
    Tools::deleteFile(_PS_MODULE_DIR_.'advancedvatmanager/classes/SimpleXLSXGen.php');
    return true; 
}
