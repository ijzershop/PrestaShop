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

/**
 * This file is for emergency use, if you get a blank BO login page after disabling the module.
 * If that happens, copy this file into your store's override/controllers/admin folder
 */

if (!defined('_PS_VERSION_')) {
    exit;
}


class AdminLoginController extends AdminLoginControllerCore
{

}
