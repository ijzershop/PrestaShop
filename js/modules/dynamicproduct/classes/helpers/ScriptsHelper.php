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
namespace DynamicProduct\classes\helpers;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;

class ScriptsHelper
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    public static function getHashes()
    {
        $hashes = [];
        $scripts_dir = DynamicTools::getModule()->provider->getDataDir('scripts');
        $files = array_filter(glob($scripts_dir . '*/*'), function ($file) {
            return !preg_match('/\.php$/', $file);
        });
        foreach ($files as $file) {
            $basename = str_replace($scripts_dir, '', $file);
            $hashes[$basename] = md5(filemtime($file));
        }

        return $hashes;
    }

    public static function getAssets($grouped_fields)
    {
        $assets = [
            'hash' => [],
            'js' => [],
            'css' => [],
            'modules' => [],
        ];

        foreach ($grouped_fields as $step) {
            foreach ($step['groups'] as $group) {
                foreach ($group['fields'] as $field) {
                    if ($field['type'] === _DP_CUSTOM_) {
                        $script_name = $field['settings']['script_name'];
                        if (empty($script_name)) {
                            $script_name = $field['name'];
                        }
                        if (empty($script_name)) {
                            continue;
                        }

                        $assets['hash'][$script_name] = filemtime(_PS_ROOT_DIR_ . '/dynamicproduct/scripts/' . $script_name);

                        if (DynamicTools::isModuleDevMode()) {
                            $dev_port = (int) ($field['settings']['dev_port'] ?? 3000);
                            if (!$dev_port) {
                                $dev_port = 3000;
                            }
                            if (DynamicTools::isHotMode($dev_port)) {
                                $assets['modules'][] = 'http://localhost:' . $dev_port . '/src/main.ts';
                                continue;
                            }
                        }

                        $js_file = '/dynamicproduct/scripts/' . $script_name . '/script.js';
                        $css_file = '/dynamicproduct/scripts/' . $script_name . '/style.css';

                        $js_path = _PS_ROOT_DIR_ . $js_file;
                        $css_path = _PS_ROOT_DIR_ . $css_file;

                        if (is_file($js_path)) {
                            $assets['js'][] = [
                                'path' => $js_file,
                                'hash' => md5(filemtime($js_path)),
                            ];
                        }

                        if (is_file($css_path)) {
                            $assets['css'][] = [
                                'path' => $css_file,
                                'hash' => md5(filemtime($css_path)),
                            ];
                        }
                    }
                }
            }
        }

        return $assets;
    }
}
