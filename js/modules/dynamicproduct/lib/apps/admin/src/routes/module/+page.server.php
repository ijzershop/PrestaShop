<?php
/**
 * 2007-2026 TuniSoft
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
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\models\DynamicMainConfig;

function load(\DynamicProduct $module): array
{
    $main_config = DynamicMainConfig::getConfig();
    if (strpos($main_config->gemini_api_key, 'AIzaSy') !== false) {
        $main_config->gemini_api_key = 'GEMINI_API_KEY (Hidden value)';
    }

    return [
        'main_config' => $main_config,
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function default()
    {
        $config = DynamicMainConfig::getConfig();
        $config->id = 1;
        $config->debug_mode = (bool) \Tools::getValue('debug_mode');
        $gemimi_api_key = \Tools::getValue('gemini_api_key');
        if (strpos($gemimi_api_key, 'AIzaSy') !== false) {
            $config->gemini_api_key = \Tools::getValue('gemini_api_key');
        }
        $saved = $config->save();

        $main_config = $config->getConfig();
        if (strpos($main_config->gemini_api_key, 'AIzaSy') !== false) {
            $main_config->gemini_api_key = 'GEMINI_API_KEY (Hidden value)';
        }

        return $main_config;
    }
}
