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

namespace classes\models\grids;

use classes\models\DynamicObject;
use Db;
use DbQuery;
use Validate;

class GridValue extends DynamicObject
{
    public $id_grid;
    public $id_grid_column;
    public $id_grid_row;
    public $value;

    public static $definition = array(
        'table'     => 'dynamicproduct_grid_value',
        'primary'   => 'id_grid_value',
        'multilang' => false,
        'fields'    => array(
            'id_grid'        => array('type' => self::TYPE_INT),
            'id_grid_column' => array('type' => self::TYPE_INT),
            'id_grid_row'    => array('type' => self::TYPE_INT),
            'value'          => array('type' => self::TYPE_FLOAT, 'allow_null' => true),
        )
    );

    public static function getByGrid($id_grid)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_grid = ' . (int) $id_grid);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id = $row[static::$definition['primary']];
            $object = new self($id);
            if (Validate::isLoadedObject($object)) {
                $objects[$id] = $object;
            }
        }
        return $objects;
    }

    public static function getByColumn($id_grid_column)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_grid_column = ' . (int) $id_grid_column);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id = $row[static::$definition['primary']];
            $object = new self($id);
            if (Validate::isLoadedObject($object)) {
                $objects[$id] = $object;
            }
        }
        return $objects;
    }

    public static function getByRow($id_grid_row)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_grid_row = ' . (int) $id_grid_row);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id = $row[static::$definition['primary']];
            $object = new self($id);
            if (Validate::isLoadedObject($object)) {
                $objects[$id] = $object;
            }
        }
        return $objects;
    }

    public static function getByProperties($id_grid, $id_grid_column, $id_grid_row)
    {
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_grid = ' . (int) $id_grid);
        $sql->where('id_grid_column = ' . (int) $id_grid_column);
        $sql->where('id_grid_row = ' . (int) $id_grid_row);
        $id_grid_value = (int) Db::getInstance()->getValue($sql);
        $grid_value = new self($id_grid_value);
        $grid_value->id_grid = (int) $id_grid;
        $grid_value->id_grid_column = (int) $id_grid_column;
        $grid_value->id_grid_row = (int) $id_grid_row;
        return $grid_value;
    }
}
