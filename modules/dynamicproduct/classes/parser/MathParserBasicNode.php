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
 * @author    Tuni-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\parser;

use Exception;

class MathParserBasicNode extends MathParserNode
{
    public $value;

    public function __construct($val)
    {
        $this->value = $val;
    }

    public function getValue()
    {
        return $this->value;
    }

    public function getValueAsDouble()
    {
        if (is_float($this->value)) {
            return $this->value;
        } elseif (is_numeric($this->value)) {
            return (float)$this->value;
        }
        throw new Exception('Value is not numeric: ' . $this->value);
    }

    public function getValueAsString()
    {
        return (string)$this->value;
    }

    public function isVariableUsed($name)
    {
        $name .= 'a';
        return false;
    }

    public function isFunctionUsed($name)
    {
        $name .= 'a';
        return false;
    }

    public function optimize()
    {
    }
}
