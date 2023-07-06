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
 *  @file-version 1.21
 */

if (!defined('_PS_VERSION_'))
    exit;

function upgrade_module_1_21($module) {
    try {
        $module->uninstallOverrides();
        $module->installOverrides();
    } catch (Exception $e) {
        return false;
    }
    unlink(_PS_ROOT_DIR_.'/override/controllers/admin/templates/login/content.tpl');
    if (_PS_VERSION_ < '1.6')
        $tplver = '1.5';
    elseif (_PS_VERSION_ < '1.7')
        $tplver = _PS_VERSION_ < '1.6.1' ? '1.6' : '1.6.1';
    else
        $tplver = _PS_VERSION_ < '1.7.2' ? '1.7' : '1.7.2';
    copy(_PS_MODULE_DIR_."/gauthenticator/views/templates/admin/login/content_{$tplver}.tpx", _PS_ROOT_DIR_.'/override/controllers/admin/templates/login/content.tpl');  //replace login template

    return true;
}

?>