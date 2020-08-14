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

class MMathparserNParamNode extends MathParserNode
{
    public $nodes;
    public $fptr;

    public function __construct($n, $func_addr)
    {
        $this->nodes = &$n;
        $this->fptr = $func_addr;
    }

    public function getValue()
    {
        if ($this->fptr->name == 'IF') {
            $cond = $this->nodes[0]->getValue();
            if ($cond == 0) {
                return $this->nodes[2]->getValue();
            } else {
                return $this->nodes[1]->getValue();
            }
        } else {
            $p = array();
            $count = count($this->nodes);
            for ($i = 0; $i < $count; $i++) {
                $value = $this->nodes[$i]->getValue();
                if ($value == '""') {
                    $value = '';
                }
                $p[] = $value;
            }
            return call_user_func_array($this->fptr->event_handler, $p);
        }
    }

    public function getValueAsDouble()
    {
        $value = $this->getValue();
        if (is_float($value)) {
            return $value;
        }

        if (is_numeric($value)) {
            return (float)$value;
        }

        throw new Exception('Value is not numeric: ' . $value);
    }

    public function getValueAsString()
    {
        return (string)$this->getValue();
    }

    public function isFunctionUsed($name)
    {
        if ($this->fptr->name === $name) {
            return true;
        }
        foreach ($this->nodes as $n) {
            if ($n->isFunctionUsed($name)) {
                return true;
            }
        }
        return false;
    }

    public function isVariableUsed($name)
    {
        foreach ($this->nodes as $n) {
            if ($n->isVariableUsed($name)) {
                return true;
            }
        }
        return false;
    }

    public function optimize()
    {
        $i = 0;
        foreach ($this->nodes as $n) {
            $this->nodes[$i] = MathParser::optimizeNode($n);
            $i++;
        }
    }
}
