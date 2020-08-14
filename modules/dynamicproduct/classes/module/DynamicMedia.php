<?php
/**
 * 2010-2019 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tunis-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\module;

use Context;
use DynamicProduct;

class DynamicMedia
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function addJS($js_uri)
    {
        $controller = Context::getContext()->controller;
        if (!is_array($js_uri)) {
            $js_uri = array($js_uri);
        }
        if (method_exists($controller, 'registerJavascript')) {
            foreach ($js_uri as $js_file) {
                if (preg_match("/^views\//", $js_file)) {
                    $js_file = $this->module->getModuleDir() . $js_file;
                }
                $controller->registerJavascript(md5($js_file), $js_file, array('priority' => 100));
            }
        } else {
            foreach ($js_uri as $key => $js_file) {
                if (preg_match("/^views\//", $js_file)) {
                    $js_uri[$key] = $this->module->getPath() . $js_file;
                }
            }
            $controller->addJS($js_uri);
        }
    }

    public function addCSS($css_uri)
    {
        $controller = Context::getContext()->controller;
        if (!is_array($css_uri)) {
            $css_uri = array($css_uri);
        }
        if (method_exists($controller, 'registerStylesheet')) {
            foreach ($css_uri as $css_file) {
                if (preg_match("/^views\//", $css_file)) {
                    $css_file = $this->module->getModuleDir() . $css_file;
                }
                $controller->registerStylesheet(md5($css_file), $css_file);
            }
        } else {
            foreach ($css_uri as $key => $css_file) {
                if (preg_match("/^views\//", $css_file)) {
                    $css_uri[$key] = $this->module->getPath() . $css_file;
                }
            }
            $controller->addCSS($css_uri);
        }
    }

    public function getJSDir()
    {
        return 'js/';
    }

    public function getCSSDir()
    {
        return 'css/';
    }

    public function getThemeJSDir()
    {
        return '/themes/' . _THEME_NAME_ . '/assets/js/';
    }

    public function getThemeCSSDir()
    {
        return '/themes/' . _THEME_NAME_ . '/assets/css/';
    }
}
