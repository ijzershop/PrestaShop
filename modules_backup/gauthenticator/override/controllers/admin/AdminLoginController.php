<?php
/**
 * Google Authenticator Security Module for Prestashop
 *
 * @author    Rinku Kazeno <development@kazeno.co>
 *
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
 * @file-version 1.25.2
 */

if (!defined('_PS_VERSION_')) {
    exit;
}


class AdminLoginController extends AdminLoginControllerCore
{
    public function setMedia($isNewTheme = false)
    {
        include_once(_PS_MODULE_DIR_.'gauthenticator/gauthenticator.php');
        $gauth = new Gauthenticator();
        $gauth->hookActionAdminLoginControllerSetMedia(array('controller' => $this));

        /**
         * Need to add an override for this method from another module?
         * Just replace the return statement after this comment with the full code for that module's override
         */
        return parent::setMedia($isNewTheme);
    }


    public function processLogin()
	{
		$passwd = trim(Tools::getValue('passwd'));
        if (class_exists('PrestaShop\PrestaShop\Core\Util\InternationalizedDomainNameConverter')) {
            $email = (new PrestaShop\PrestaShop\Core\Util\InternationalizedDomainNameConverter())->emailToUtf8(trim(Tools::getValue('email')));
        } else {
            $email = trim(Tools::getValue('email'));
        }

        include_once(_PS_MODULE_DIR_.'gauthenticator/gauthenticator.php');
        $gauth = new Gauthenticator();
        $gauth->hookActionAdminLoginControllerLoginBefore(array(
            'controller' => $this,
            'password' => $passwd,
            'email' => $email,
        ));

        /**
         * Need to add an override for this method from another module?
         * Just replace the return statement after this comment with the full code for that module's override
         */
        return parent::processLogin();
	}
}
