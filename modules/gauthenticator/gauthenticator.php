<?php
/**
 * Google Authenticator Security Module for Prestashop
 *
 * Tested in Prestashop v1.5.0.17, 1.5.6.2, 1.6.0.5, 1.6.1.14, 1.7.0.2, 1.7.1.0, 1.7.2.0
 *
 * @author    Rinku Kazeno <development@kazeno.co>
 *
 * @copyright Copyright (c) 2012-2017, Rinku Kazeno
 * @license   This module is licensed to the user, upon purchase
 *   from either Prestashop Addons or directly from the author,
 *   for use on a single commercial Prestashop install, plus an
 *   optional separate non-commercial install (for development/testing
 *   purposes only). This license is non-assignable and non-transferable.
 *   To use in additional Prestashop installations an additional
 *   license of the module must be purchased for each one.

 *   The user may modify the source of this module to suit their
 *   own business needs, as long as no distribution of either the
 *   original module or the user-modified version is made.
 *
 * @version 1.22
 */

if (!defined( '_PS_VERSION_') OR !defined('_CAN_LOAD_FILES_'))
    exit;
if (!defined('_PS_ADMIN_DIR_')) {
    if (defined('PS_ADMIN_DIR'))
        define('_PS_ADMIN_DIR_', PS_ADMIN_DIR);
    else
        exit;
}

class Gauthenticator extends Module
{
    const CONFIG_PREFIX = 'GAUTHENTICATOR_';     //prefix for all internal config constants
    const MODULE_NAME = 'gauthenticator';       //DON'T CHANGE!!

    public static $logErrorSeverity = 4;

    public function __construct($name = NULL)
    {
        $this->name = 'gauthenticator';     //DON'T CHANGE!!
        $this->tab = 'administration';
        $this->version = '1.22';
        $this->author = 'R. Kazeno';
        $this->module_key = '593a8f4855e8e79dd370d4ee832ac80c';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = array('min' => '1.5', 'max' => '1.7');
        $this->bootstrap = true;
        
        parent::__construct($name);
        $this->displayName = $this->l('Google Authenticator');
        $this->description = $this->l('Secure your store by requiring two-factor authentication for your employee logins by means of a mobile device.');
        $this->confirmUninstall = $this->l('This will delete all saved Google Authenticator user data for this store. Continue?');
        require_once _PS_MODULE_DIR_."{$this->name}/classes/GAuthenticatedEmployee.php";
    }
    
    public function install()
    {
        if (_PS_VERSION_ < '1.6')
            $tplver = '1.5';
        elseif (_PS_VERSION_ < '1.7')
            $tplver = _PS_VERSION_ < '1.6.1' ? '1.6' : '1.6.1';
        else
            $tplver = _PS_VERSION_ < '1.7.2' ? '1.7' : '1.7.2';
        if ((_PS_VERSION_ > '1.6') && (_PS_VERSION_ < '1.6.1'))
            self::updateTranslationsAfterInstall(false);
        if (!is_dir(_PS_ROOT_DIR_.'/override/controllers/admin/templates/login'))
            mkdir(_PS_ROOT_DIR_.'/override/controllers/admin/templates/login');
        copy(_PS_MODULE_DIR_."/gauthenticator/views/templates/admin/login/content_{$tplver}.tpx", _PS_ROOT_DIR_.'/override/controllers/admin/templates/login/content.tpl');  //replace login template
        if (_PS_VERSION_ < '1.7')
            $employeeTabId = Tab::getIdFromClassName('AdminAdmin') or die('no tab');
        else
            $employeeTabId = Tab::getIdFromClassName('AdminParentEmployees') or die('no tab');
        //create admin tab
        $tab = new Tab;
        $tab->position = Tab::getNbTabs($employeeTabId);
        $tab->class_name = 'AdminGauth';
        $tab->module = $this->name;
        $tab->id_parent = $employeeTabId;
        $names = array();
        foreach (Language::getLanguages() as $lang) {
            $names[$lang['id_lang']] = $this->l('Google Authenticator');
        }
        $tab->name = $names;
        copy(_PS_ROOT_DIR_.'/modules/gauthenticator/logo.gif', _PS_ROOT_DIR_.'/img/t/AdminGauth.gif');
        $db = Db::getInstance();
        return (parent::install() AND
            $tab->add() AND
            $db->Execute('ALTER TABLE `'.pSQL(_DB_PREFIX_).'employee` ADD gatoken TEXT NULL') AND
            Configuration::updateValue(self::CONFIG_PREFIX.'LOGIN_MODIFIED', '1') AND
            Configuration::updateValue(self::CONFIG_PREFIX.'RECOVERY_CODE', '') AND
            Configuration::updateValue(self::CONFIG_PREFIX.'RECOVERY_USER', '')
        );
    }
    
    public function uninstall()
    {
        //remove admin tab
        $tab = new Tab();
        $tab->id = Tab::getIdFromClassName('AdminGauth');
        $tab->delete();
        //remove imported files
        unlink(_PS_ROOT_DIR_.'/override/controllers/admin/templates/login/content.tpl');
        $db = Db::getInstance();
        return (parent::uninstall() AND
          $db->Execute('ALTER TABLE `'.pSQL(_DB_PREFIX_).'employee` DROP gatoken') AND
          Configuration::deleteByName(self::CONFIG_PREFIX.'LOGIN_MODIFIED') AND
          Configuration::deleteByName(self::CONFIG_PREFIX.'RECOVERY_CODE') AND
          Configuration::deleteByName(self::CONFIG_PREFIX.'RECOVERY_USER')
        );
    }
    
    public function disable($forceForAll = FALSE)
    {
        Configuration::updateValue(self::CONFIG_PREFIX.'LOGIN_MODIFIED', '0');
        return parent::disable($forceForAll);
    }
    
    public function enable($forceForAll = FALSE)
    {
        Configuration::updateValue(self::CONFIG_PREFIX.'LOGIN_MODIFIED', '1');
        return parent::enable($forceForAll);
    }
    
    public function getContent()    //redirects to Manager Tab
    {
        Tools::redirectAdmin('?tab=AdminGauth&token='.Tools::getAdminToken('AdminGauth'.(int)Tab::getIdFromClassName('AdminGauth').(int)$this->context->employee->id));
    }

}