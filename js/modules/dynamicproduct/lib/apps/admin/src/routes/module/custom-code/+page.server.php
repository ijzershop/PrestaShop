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

function load(\DynamicProduct $module): array
{
    $module_path = $module->getLocalPath();
    $data_path = $module->provider->getDataDir();

    $custom_js_path = $data_path . 'scripts/head.js';
    $js_path = $module_path . 'views/js/head.js';
    $js_code = is_file($custom_js_path) ? file_get_contents($custom_js_path) : (is_file($js_path) ? file_get_contents($js_path) : '');

    $custom_css_path = $data_path . 'scripts/head.css';
    $css_path = $module_path . 'views/css/head.css';
    $css_code = is_file($custom_css_path) ? file_get_contents($custom_css_path) : (is_file($css_path) ? file_get_contents($css_path) : '');

    return [
        'js_code' => $js_code,
        'css_code' => $css_code,
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function save_js()
    {
        $js_code = \Tools::getValue('js_code');
        $data_path = self::$module->provider->getDataDir();
        $custom_js_path = $data_path . 'scripts/head.js';

        $dir = dirname($custom_js_path);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        file_put_contents($custom_js_path, $js_code);

        return [
            'message' => self::$module->l('JavaScript saved'),
        ];
    }

    public static function reset_js()
    {
        $data_path = self::$module->provider->getDataDir();
        $custom_js_path = $data_path . 'scripts/head.js';

        if (is_file($custom_js_path)) {
            unlink($custom_js_path);
        }

        return [
            'message' => self::$module->l('JavaScript reset to default'),
        ];
    }

    public static function save_css()
    {
        $css_code = \Tools::getValue('css_code');
        $data_path = self::$module->provider->getDataDir();
        $custom_css_path = $data_path . 'scripts/head.css';

        $dir = dirname($custom_css_path);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        file_put_contents($custom_css_path, $css_code);

        return [
            'message' => self::$module->l('CSS saved'),
        ];
    }

    public static function reset_css()
    {
        $data_path = self::$module->provider->getDataDir();
        $custom_css_path = $data_path . 'scripts/head.css';

        if (is_file($custom_css_path)) {
            unlink($custom_css_path);
        }

        return [
            'message' => self::$module->l('CSS reset to default'),
        ];
    }
}
