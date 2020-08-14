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

use Db;
use DbQuery;

class DynamicUnitValue extends DynamicObject
{
    public $id_field;
    public $id_unit;
    public $min;
    public $max;
    public $step = 1;
    public $init;
    public $extra;
    public $required;
    public $min_width;
    public $min_height;
    public $max_size;
    public $extensions;
    public $min_date;
    public $max_date;
    public $multiselect;
    public $color;

    private static $unit_values = array();

    public static $definition = array(
        'table'   => 'dynamicproduct_unit_value',
        'primary' => 'id_unit_value',
        'fields'  => array(
            'id_field'    => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_unit'     => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'min'         => array('type' => self::TYPE_FLOAT),
            'max'         => array('type' => self::TYPE_FLOAT),
            'step'        => array('type' => self::TYPE_FLOAT),
            'init'        => array('type' => self::TYPE_FLOAT),
            'extra'       => array('type' => self::TYPE_STRING),
            'required'    => array('type' => self::TYPE_INT),
            'min_width'   => array('type' => self::TYPE_INT),
            'min_height'  => array('type' => self::TYPE_INT),
            'max_size'    => array('type' => self::TYPE_INT),
            'extensions'  => array('type' => self::TYPE_STRING),
            'min_date'    => array('type' => self::TYPE_STRING),
            'max_date'    => array('type' => self::TYPE_STRING),
            'multiselect' => array('type' => self::TYPE_INT),
            'color'       => array('type' => self::TYPE_STRING),
        )
    );

    /**
     * @param $id_field
     * @return DynamicUnitValue
     */
    public static function getUnitValue($id_field)
    {
        $key = $id_field;
        if (isset(self::$unit_values[$key])) {
            return self::$unit_values[$key];
        }
        $sql = new DbQuery();
        $sql->select('id_unit_value');
        $sql->from(self::$definition['table']);
        $sql->where('id_field = ' . (int)$id_field);
        $id_unit_value = Db::getInstance()->getValue($sql);
        return self::$unit_values[$key] = new self($id_unit_value);
    }

    /**
     * @param $id_field
     * @return DynamicUnitValue
     */
    public static function getUnitValuesByIdField($id_field)
    {
        return self::getUnitValue($id_field);
    }

    public function setInitialValue($init)
    {
        $this->init = $init;
    }
}
