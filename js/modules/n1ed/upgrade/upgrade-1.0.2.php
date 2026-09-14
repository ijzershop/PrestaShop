<?php
/**
 * @author    N1ED http://n1ed.com
 * @copyright N1ED/EdSDK
 * @license   Proprietary license
 * @file      N1 TinyMCE - TinyMCE+N1ED module for PrestaShop
 */

if (!defined('_PS_VERSION_')) {
  exit;
}

/**
 * Module update function
 */
function upgrade_module_1_0_2($module)
{
    if (!Configuration::hasKey('N1ED_APIKEY') || Configuration::get('N1ED_APIKEY') === "oLYgeawo") {
        Configuration::updateValue('N1ED_APIKEY', 'oLYgeawo');
        Configuration::updateValue('N1ED_TOKEN', '');
    }

    return true;
}
