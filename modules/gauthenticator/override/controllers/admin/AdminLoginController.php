<?php
/**
 * Google Authenticator Security Module for Prestashop
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
 * @file-version 1.21
 */

class AdminLoginController extends AdminLoginControllerCore
{
    public function setMedia($isNewTheme = false)
    {
        include_once(_PS_ROOT_DIR_.'/modules/gauthenticator/gauthenticator.php');
        $gaHelperClass = new Gauthenticator();      //GAuthenticator: Class Loaded for translations
        $gauthVars = array('gauthText' => $gaHelperClass->l('Google Authenticator One-Time Code'));
        if (defined('_GOOGLE_AUTHENTICATOR_DISABLE_') || !Configuration::get(Gauthenticator::CONFIG_PREFIX.'LOGIN_MODIFIED'))
            $gauthVars['bypassGauth'] = 1;      //backwards compatibility
        else
            $gauthVars['enableGauth'] = 1;
        $this->context->smarty->assign($gauthVars);
        return parent::setMedia($isNewTheme);
    }
    
    public function processLogin()
	{
		$passwd = trim(Tools::getValue('passwd'));
		$email = trim(Tools::getValue('email'));
        include_once(_PS_MODULE_DIR_.'gauthenticator/gauthenticator.php');
		if (!defined('_GOOGLE_AUTHENTICATOR_DISABLE_') && Configuration::get(Gauthenticator::CONFIG_PREFIX.'LOGIN_MODIFIED') && (!empty($email) && !empty($passwd))) {
			$employee = new Employee();
            $employee->gatoken = '';
			$is_employee_loaded = $employee->getByemail($email, $passwd);
            include_once(_PS_MODULE_DIR_.'gauthenticator/lib/gauth.php');
            include_once(_PS_MODULE_DIR_.'gauthenticator/classes/GAuthenticatedEmployee.php');
            $gaHelperClass = new Gauthenticator();      //GAuthenticator: Class Loaded for translations
            $gauth = new GAuth;
            if ($is_employee_loaded && $gauth->importData($employee->gatoken) && $gauth->getEnabledStatus()) {
                $gauthCode = Tools::getValue('gauthcode');
                $recoveryCode = $gauth->getUserData('recovery');
				if ($recoveryCode && Tools::strlen($recoveryCode) && ((string)$gauthCode === $recoveryCode)) {
                    $recoveryToken = 'R'.Tools::passwdGen(12, 'ALPHANUMERIC');
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE', $recoveryToken);
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER', $employee->id);
                    Mail::Send(
                        (int)$employee->id_lang,
                        'recovery',
                        Mail::l('Two-factor code recovery', (int)$employee->id_lang),
                        array('{recovery_token}' => $recoveryToken, '{firstname}' => $employee->firstname, '{lastname}' => $employee->lastname),
                        $employee->email,
                        $employee->firstname.' '.$employee->lastname,
                        null,
                        null,
                        null,
                        null,
                        _PS_MODULE_DIR_.'gauthenticator/mails/'
                    );
                    $this->errors[] = $gaHelperClass->l('Google Authenticator recovery code sent by email.');
                    if (class_exists('PrestaShopLogger'))
                        PrestaShopLogger::addLog(sprintf($this->l('Back office Google Authenticator recovery code requested from %s'), Tools::getRemoteAddr()), Gauthenticator::$logErrorSeverity, null, '', 0, true, (int)$employee->id);
                    else
                        Logger::addLog(sprintf($this->l('Back office Google Authenticator recovery code requested from %s'), Tools::getRemoteAddr()), Gauthenticator::$logErrorSeverity, null, '', 0, true, (int)$employee->id);
                } elseif (Tools::strlen($gauthCode) && (Tools::substr(trim($gauthCode), 0, 1) === 'R') && (trim($gauthCode) === Configuration::get(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE')) && ((int)$employee->id === (int)Configuration::get(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER'))) {     //code recovery
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_CODE', '');
                    Configuration::updateValue(Gauthenticator::CONFIG_PREFIX.'RECOVERY_USER', '');
                } elseif (!Tools::strlen($gauthCode) || !$gauth->authenticate($gauthCode)) {
                    $this->errors[] = $gaHelperClass->l('Google Authenticator Code is incorrect.');
                    if (class_exists('PrestaShopLogger'))
                        PrestaShopLogger::addLog(sprintf($this->l('Back office connection attempt with incorrect Google Authenticator code from %s'), Tools::getRemoteAddr()), Gauthenticator::$logErrorSeverity, null, '', 0, true, (int)$employee->id);
                    else
                        Logger::addLog(sprintf($this->l('Back office connection attempt with incorrect Google Authenticator code from %s'), Tools::getRemoteAddr()), Gauthenticator::$logErrorSeverity, null, '', 0, true, (int)$employee->id);
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

        return parent::processLogin();
	}
}

?>