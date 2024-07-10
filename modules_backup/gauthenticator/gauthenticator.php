<?php
/**
 * Google Authenticator Security Module for Prestashop
 *
 * Tested in Prestashop 1.6.0.5, 1.6.1.24, 1.7.0.2, 1.7.8.0, 8.0.0, 8.1.0
 *
 * @author    Rinku Kazeno <development@kazeno.co>
 * @copyright Copyright since 2012 Rinku Kazeno
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
 * @version 1.26
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

if (!defined('_CAN_LOAD_FILES_')) {
    exit;
}

if (!defined('_PS_ADMIN_DIR_')) {
    if (defined('PS_ADMIN_DIR')) {
        define('_PS_ADMIN_DIR_', PS_ADMIN_DIR);
    } else {
        exit;
    }
}


class Gauthenticator extends Module
{
    const CONFIG_PREFIX = 'GAUTHENTICATOR_';     //prefix for all internal config constants

    public static $logErrorSeverity = 4;

    public function __construct($name = NULL)
    {
        $this->name = 'gauthenticator';     //DON'T CHANGE!!
        $this->tab = 'administration';
        $this->version = '1.26';
        $this->author = 'R. Kazeno';
        $this->module_key = '593a8f4855e8e79dd370d4ee832ac80c';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = array('min' => '1.6.0.5', 'max' => '8.999.999');
        $this->bootstrap = true;
        
        parent::__construct($name);
        $this->displayName = $this->l('Google Authenticator');
        $this->description = $this->l('Secure your store by requiring two-factor authentication for your employee logins by means of a mobile device.');
        $this->confirmUninstall = $this->l('This will delete all saved Google Authenticator user data for this store. Continue?');
        if (
            Configuration::get('PS_DISABLE_OVERRIDES') == 1
            && Validate::isLoadedObject($this->context->employee)
        ) {
            $this->warning = $this->l('This module requires overrides to be enabled in order to work. Please turn off the "Disable all overrides" options in Advanced Parameters > Performance.');
        }
        require_once _PS_MODULE_DIR_.$this->name.'/classes/GAuthenticatedEmployee.php';
    }


    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    public function install()
    {
        if (Configuration::get('PS_DISABLE_OVERRIDES') == 1) {
            $this->_errors[] = $this->l('This module requires overrides to be enabled in order to work. Please turn off the "Disable all overrides" options in Advanced Parameters > Performance.');

            return false;
        }

        if (_PS_VERSION_ < '1.6') {
            $tplver = '1.5';
        } elseif (_PS_VERSION_ < '1.7') {
            $tplver = _PS_VERSION_ < '1.6.1' ? '1.6' : '1.6.1';
        } elseif (_PS_VERSION_ < '8') {
            $tplver = _PS_VERSION_ < '1.7.2' ? '1.7' : '1.7.2';
        } else {
            $tplver = '8';
        }
        if (
            '1.6' < _PS_VERSION_
            && _PS_VERSION_ < '1.6.1'
        ) {
            self::updateTranslationsAfterInstall(false);
        }
        if (!is_dir(_PS_ROOT_DIR_.'/override/controllers/admin/templates/login')) {
            mkdir(
                _PS_ROOT_DIR_ . '/override/controllers/admin/templates/login',
                0700,
                true
            );
        }
        copy(
            _PS_MODULE_DIR_."/gauthenticator/views/templates/admin/login/content_{$tplver}.tpx",
            _PS_ROOT_DIR_.'/override/controllers/admin/templates/login/content.tpl'
        );  //replace login template
        if (_PS_VERSION_ < '1.7') {
            $tabId = Tab::getIdFromClassName('AdminAdmin');
        } elseif (_PS_VERSION_ < '8') {
            $tabId = Tab::getIdFromClassName('AdminParentEmployees');
        } else {
            $tabId = Tab::getIdFromClassName('AdminParentSecurity');
        }

        if (!$tabId) {
            $this->_errors[] = $this->l('Error retrieving parent menu Tab Id');

            return false;
        }

        //create admin tab
        $tab = new Tab;
        $tab->position = Tab::getNbTabs($tabId);
        $tab->class_name = 'AdminGauth';
        $tab->module = $this->name;
        $tab->id_parent = $tabId;
        $names = array();
        foreach (Language::getLanguages() as $lang) {
            $names[$lang['id_lang']] = $this->l('Google Authenticator');
        }
        $tab->name = $names;
        copy(_PS_ROOT_DIR_.'/modules/gauthenticator/logo.gif', _PS_ROOT_DIR_.'/img/t/AdminGauth.gif');
        $db = Db::getInstance();
        $hooksAvailable = (
            Hook::getIdByName('actionAdminLoginControllerLoginBefore')
            && Hook::getIdByName('actionAdminLoginControllerSetMedia')
        );

        return (
            parent::install()
            && $tab->add()
            && $db->execute('ALTER TABLE `'.pSQL(_DB_PREFIX_).'employee` ADD gatoken TEXT NULL')
            && Configuration::updateValue(self::CONFIG_PREFIX.'LOGIN_MODIFIED', '1')
            && Configuration::updateValue(self::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED', '0')
            && Configuration::updateValue(self::CONFIG_PREFIX.'RECOVERY_CODE', '')
            && Configuration::updateValue(self::CONFIG_PREFIX.'RECOVERY_USER', '')
            && (
                !$hooksAvailable
                || (
                    $this->registerHook('actionAdminLoginControllerLoginBefore')
                    && $this->registerHook('actionAdminLoginControllerSetMedia')
                )
            )
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

        if (Configuration::get(Gauthenticator::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED')) {
            # reactivate ps_accounts module login override if we had disabled it
            Configuration::updateValue('PS_ACCOUNTS_LOGIN_ENABLED', '1');
        }

        return (
            parent::uninstall()
            && $db->execute('ALTER TABLE `'.pSQL(_DB_PREFIX_).'employee` DROP gatoken')
            && Configuration::deleteByName(self::CONFIG_PREFIX.'LOGIN_MODIFIED')
            && Configuration::deleteByName(self::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED')
            && Configuration::deleteByName(self::CONFIG_PREFIX.'RECOVERY_CODE')
            && Configuration::deleteByName(self::CONFIG_PREFIX.'RECOVERY_USER')
        );
    }


    public function disable($forceAll = FALSE)
    {
        Configuration::updateValue(self::CONFIG_PREFIX.'LOGIN_MODIFIED', '0');
        if (Configuration::get(Gauthenticator::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED')) {
            # reactivate ps_accounts module login override if we had disabled it
            Configuration::updateValue('PS_ACCOUNTS_LOGIN_ENABLED', '1');
        }

        return parent::disable($forceAll);
    }


    public function enable($forceAll = FALSE)
    {
        Configuration::updateValue(self::CONFIG_PREFIX.'LOGIN_MODIFIED', '1');
        if (Configuration::get(Gauthenticator::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED')) {
            # deactivate ps_accounts module login override if we had disabled it
            Configuration::updateValue('PS_ACCOUNTS_LOGIN_ENABLED', '0');
        }

        return parent::enable($forceAll);
    }


    /**
     * @override only use AdminLoginController overrides if AdminLogin hooks are not available
     *
     * @return array|null
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getOverrides()
    {
        if (
            Hook::getIdByName('actionAdminLoginControllerLoginBefore')
            && Hook::getIdByName('actionAdminLoginControllerSetMedia')
        ) {
            return null;
        } else {
            return parent::getOverrides();
        }
    }


    public function getContent()    //redirects to Manager Tab
    {
        Tools::redirectAdmin(
            '?tab=AdminGauth&token='
            .Tools::getAdminToken(
                'AdminGauth'
                .(int)Tab::getIdFromClassName('AdminGauth')
                .(int)$this->context->employee->id
            )
        );
    }


    /**
     * @param $params array{
     *                  'controller': AdminLoginController,
     *                  }
     * @return void
     */
    public function hookActionAdminLoginControllerSetMedia($params)
    {
        $gauthVars = array('gauthText' => $this->l('Google Authenticator One-Time Code'));
        if (
            defined('_GOOGLE_AUTHENTICATOR_DISABLE_')
            || !Configuration::get(Gauthenticator::CONFIG_PREFIX.'LOGIN_MODIFIED')
        ){
            $gauthVars['bypassGauth'] = 1;  //backwards compatibility
        } else {
            $gauthVars['enableGauth'] = 1;
        }
        $this->context->smarty->assign($gauthVars);
    }


    /**
     * @param $params array{
     *                  'controller': AdminLoginController,
     *                  'password': string,
     *                  'email': string
     *                  }
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionAdminLoginControllerLoginBefore($params)
    {
        $controller = $params['controller'];
        $passwd = $params['password'];
        $email = $params['email'];

        if (
            !defined('_GOOGLE_AUTHENTICATOR_DISABLE_')
            && !file_exists(_PS_ROOT_DIR_.'/override/controllers/admin/templates/login/content.tpl')
        ) {
            $controller->errors[] = $this->l('The Google Authenticator module has been installed, but the login template was not copied successfully during install. Please follow the instructions in the module\'s manual for copying the template manually.');
        } elseif (
            !defined('_GOOGLE_AUTHENTICATOR_DISABLE_')
            && Configuration::get(Gauthenticator::CONFIG_PREFIX.'LOGIN_MODIFIED')
            && (
                !empty($email)
                && Validate::isEmail($email)
                && !empty($passwd)
            )
        ) {
            include_once(_PS_MODULE_DIR_.'gauthenticator/lib/gauth.php');
            include_once(_PS_MODULE_DIR_.'gauthenticator/classes/GAuthenticatedEmployee.php');

            $employee = new Employee();
            $employee->gatoken = '';    //initialize property so it's loaded in getByEmail
            $isEmployeeLoaded = $employee->getByemail($email, $passwd);
            $gauth = new GAuth;
            if (
                $isEmployeeLoaded
                && $gauth->importData($employee->gatoken)
                && $gauth->getEnabledStatus()
            ) {
                $gauthCode = Tools::getValue('gauthcode');
                $recoveryCode = $gauth->getUserData('recovery');
                if (
                    $recoveryCode
                    && Tools::strlen($recoveryCode)
                    && ((string)$gauthCode === $recoveryCode)
                ) {
                    $recoveryToken = 'R'.Tools::passwdGen(12, 'ALPHANUMERIC');
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE', $recoveryToken);
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER', $employee->id);
                    Mail::Send(
                        (int)$employee->id_lang,
                        'recovery',
                        Mail::l('Two-factor code recovery', (int)$employee->id_lang),
                        array(
                            '{recovery_token}' => $recoveryToken,
                            '{firstname}' => $employee->firstname,
                            '{lastname}' => $employee->lastname
                        ),
                        $employee->email,
                        $employee->firstname.' '.$employee->lastname,
                        null,
                        null,
                        null,
                        null,
                        _PS_MODULE_DIR_.'gauthenticator/mails/'
                    );
                    $controller->errors[] = $this->l('Google Authenticator recovery code sent by email.');
                    if (class_exists('PrestaShopLogger')) {
                        PrestaShopLogger::addLog(
                            sprintf(
                                $this->l('Back office Google Authenticator recovery code requested from %s'),
                                Tools::getRemoteAddr()
                            ),
                            Gauthenticator::$logErrorSeverity,
                            null,
                            '',
                            0,
                            true,
                            (int)$employee->id);
                    } else {
                        Logger::addLog(
                            sprintf(
                                $this->l('Back office Google Authenticator recovery code requested from %s'),
                                Tools::getRemoteAddr()
                            ),
                            Gauthenticator::$logErrorSeverity,
                            null,
                            '',
                            0,
                            true,
                            (int)$employee->id);
                    }
                } elseif (  //code recovery
                    Tools::strlen($gauthCode)
                    && (Tools::substr(trim($gauthCode), 0, 1) === 'R')
                    && (trim($gauthCode) === Configuration::get(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE'))
                    && ((int)$employee->id === (int)Configuration::get(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER'))
                ) {
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE', '');
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER', '');
                } elseif (  //incorrect one-time code
                    !Tools::strlen($gauthCode)
                    || !$gauth->authenticate($gauthCode)
                ) {
                    $controller->errors[] = $this->l('Google Authenticator Code is incorrect.');
                    if (class_exists('PrestaShopLogger')) {
                        PrestaShopLogger::addLog(
                            sprintf(
                                $this->l('Back office connection attempt with incorrect Google Authenticator code from %s'),
                                Tools::getRemoteAddr()
                            ),
                            Gauthenticator::$logErrorSeverity,
                            null,
                            '',
                            0,
                            true,
                            (int)$employee->id
                        );
                    } else {
                        Logger::addLog(
                            sprintf(
                                $this->l('Back office connection attempt with incorrect Google Authenticator code from %s'),
                                Tools::getRemoteAddr()
                            ),
                            Gauthenticator::$logErrorSeverity,
                            null,
                            '',
                            0,
                            true,
                            (int)$employee->id
                        );
                    }
                } elseif ($gauth->getModified()) {      //GAuthenticator: Save increase in counter in case of HOTP
                    $gauthe = new GAuthenticatedEmployee((int)$employee->id);
                    $gauthe->gatoken = pSQL($gauth->exportData());
                    $gauthe->update();
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE', '');
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER', '');
                } else {
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE', '');
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER', '');
                }
            }
        }

    }

}