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

namespace classes\helpers;

use Context;
use DynamicProduct;
use Tools;

class ColorHelper
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

    public function getClearColor($value)
    {
        $dark = '#222';
        $light = '#DDD';
        $luminence = $this->getColorLuminence($value);
        return $luminence > 0.22 ? $dark : $light;
    }

    private function getColorLuminence($value)
    {
        $color = $this->HEXToRGB($value);
        return ((0.2126 * $color[0]) + (0.7152 * $color[1]) + (0.0722 * $color[2])) / 255;
    }

    private function HEXToRGB($value)
    {
        $values = str_replace('#', '', $value);
        switch (Tools::strlen($values)) {
            case 3:
                list($r, $g, $b) = sscanf($values, '%1s%1s%1s');
                return array(hexdec("$r$r"), hexdec("$g$g"), hexdec("$b$b"));
            case 6:
                return array_map('hexdec', sscanf($values, '%2s%2s%2s'));
            default:
                return false;
        }
    }
}
