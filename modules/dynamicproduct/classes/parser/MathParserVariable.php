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

class MathParserVariable
{
    private $parser;
    public $name;
    public $value;
    public $value_provider;


    public function getRuntimeValue()
    {
        return !isset($this->value_provider) ? $this->value : $this->value_provider($this->parser, $this->name);
    }

    public function __construct($parser, $aname, $new_val, $value_provider)
    {
        $this->parser = $parser;
        $this->name = $aname;
        $this->value = $new_val;
        $this->value_provider = $value_provider;
    }
}
