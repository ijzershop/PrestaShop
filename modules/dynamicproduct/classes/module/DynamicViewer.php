<?php
/**
 * 2010-2022 Tuni-Soft
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
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\module;

use classes\viewers\DesignViewer;
use Context;
use DynamicProduct;
use Tools;

class DynamicViewer
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

    public function getCurrentAction()
    {
        $keys = array_keys($_GET);
        foreach ($keys as $key) {
            if (0 === strpos($key, 'view_')) {
                return str_replace('view_', '', $key);
            }
        }
        return false;
    }

    public function display($view_action)
    {
        $namescape = 'classes\viewers\\';
        $class_name = $namescape . Tools::toCamelCase($view_action, true) . 'Viewer';
        /** @var DesignViewer $viewer */
        if (class_exists($class_name)) {
            $viewer = new $class_name($this->module, $this->context);
            return $viewer->display();
        }
        return null;
    }
}
