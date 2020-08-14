<?php
/**
* 2010-2018 Tuni-Soft
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
* @author    Tuni-Soft
* @copyright 2010-2018 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

if (!class_exists('DpCompat')) {
    class DpCompat
    {
        private static $module_name = 'dynamicproduct';
        /** @var DynamicProduct */
        private static $module = null;

        private static $js_dir = null;
        private static $css_dir = null;

        private static $is_seven = null;
        private static $is_after_1730 = null;

        public static function isPsSeven()
        {
            if (self::$is_seven === null) {
                self::$is_seven = version_compare(_PS_VERSION_, '1.7') >= 0;
            }
            return self::$is_seven;
        }

        public static function isAfter1730()
        {
            if (self::$is_after_1730 === null) {
                self::$is_after_1730 = version_compare(_PS_VERSION_, '1.7.3.0') >= 0;
            }
            return self::$is_after_1730;
        }

        public static function addJS($js_uri)
        {
            if (!self::$module) {
                self::$module = DynamicTools::getModule();
            }
            $controller = Context::getContext()->controller;
            if (!is_array($js_uri)) {
                $js_uri = array($js_uri);
            }
            if (self::isPsSeven() && method_exists($controller, 'registerJavascript')) {
                foreach ($js_uri as $js_file) {
                    if (strpos($js_file, 'views/') === 0) {
                        $js_file = self::$module->getModuleDir().$js_file;
                    }
                    $controller->registerJavascript(md5($js_file), $js_file, array('priority' => 100));
                }
            } else {
                foreach ($js_uri as &$js_file) {
                    if (strpos($js_file, 'views/') === 0) {
                        $js_file = self::$module->getPath().$js_file;
                    }
                }
                $controller->addJS($js_uri);
            }
        }

        public static function addCSS($css_uri)
        {
            if (!self::$module) {
                self::$module = DynamicTools::getModule();
            }
            $controller = Context::getContext()->controller;
            if (!is_array($css_uri)) {
                $css_uri = array($css_uri);
            }
            if (self::isPsSeven() && method_exists($controller, 'registerStylesheet')) {
                foreach ($css_uri as $css_file) {
                    if (strpos($css_file, 'views/') === 0) {
                        $css_file = self::$module->getModuleDir().$css_file;
                    }
                    $controller->registerStylesheet(md5($css_file), $css_file);
                }
            } else {
                foreach ($css_uri as &$css_file) {
                    if (strpos($css_file, 'views/') === 0) {
                        $css_file = self::$module->getPath().$css_file;
                    }
                }
                $controller->addCSS($css_uri);
            }
        }

        public static function getJSDir()
        {
            if (self::$js_dir) {
                return self::$js_dir;
            }
            if (self::isPsSeven()) {
                return 'js/';
            } else {
                return _PS_JS_DIR_;
            }
        }

        public static function getCSSDir()
        {
            if (self::$css_dir) {
                return self::$css_dir;
            }
            if (self::isPsSeven()) {
                return 'css/';
            } else {
                return _PS_CSS_DIR_;
            }
        }

        public static function getThemeJSDir()
        {
            if (self::$js_dir) {
                return self::$js_dir;
            }
            if (self::isPsSeven()) {
                return '/themes/'._THEME_NAME_.'/assets/js/';
            } else {
                return _THEME_DIR_.'js/';
            }
        }

        public static function getThemeCSSDir()
        {
            if (self::$css_dir) {
                return self::$css_dir;
            }
            if (self::isPsSeven()) {
                return '/themes/'._THEME_NAME_.'/assets/css/';
            } else {
                return _THEME_DIR_.'css/';
            }
        }
    }
}
