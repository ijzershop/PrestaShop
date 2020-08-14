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

namespace classes\models;

class DynamicUnit extends DynamicObject
{

    public $symbol;
    public $displayed = 1;
    public $name;

    private static $units = array();

    public static $definition = array(
        'table' => 'dynamicproduct_unit',
        'primary' => 'id_unit',
        'multilang' => true,
        'fields' => array(
            'symbol' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName'),
            'displayed' => array('type' => self::TYPE_INT),
            /* Lang fields */
            'name' => array(
                'type' => self::TYPE_STRING,
                'lang' => true,
                'required' => false,
                'validate' => 'isGenericName',
                'size' => 64
            ),
        )
    );

    public static function getUnitSymbol($id_unit)
    {
        return (new self($id_unit))->symbol;
    }

    public static function getUnit($id_unit, $id_lang = null)
    {
        $key = $id_unit . '_' . $id_lang;
        if (isset(self::$units[$key])) {
            return self::$units[$key];
        }
        return self::$units[$key] = new self($id_unit, $id_lang);
    }
}
