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

namespace classes\models\intervals;

use classes\models\DynamicField;
use classes\models\DynamicObject;
use Db;
use DbQuery;
use Validate;

class IntervalFormula extends DynamicObject
{

    public $id_interval_condition_group;
    public $id_interval_field;
    public $formula;

    public static $definition = array(
        'table'     => 'dynamicproduct_interval_formula',
        'primary'   => 'id_interval_formula',
        'multilang' => false,
        'fields'    => array(
            'id_interval_condition_group' => array('type' => self::TYPE_INT),
            'id_interval_field'           => array('type' => self::TYPE_INT),
            'formula'                     => array('type' => self::TYPE_HTML),
        )
    );

    /**
     * @param IntervalConditionGroup[] $condition_groups
     * @param DynamicField[] $fields
     * @return IntervalFormula[]
     */
    public static function getIntervalFormulas($condition_groups)
    {
        $field_formulas = array();
        $interval_formulas = self::getByConditionGroups($condition_groups);
        foreach ($interval_formulas as $formula) {
            if (!isset($field_formulas[$formula->id_interval_field])) {
                $field_formulas[$formula->id_interval_field] = array();
            }
            $field_formulas[$formula->id_interval_field][$formula->id_interval_condition_group] = $formula;
        }
        return $field_formulas;
    }

    public static function getIntervalFormula($id_interval_condition_group, $id_interval_field)
    {
        $sql = new DbQuery();
        $sql->select(self::$definition['primary']);
        $sql->from(self::$definition['table']);
        $sql->where('id_interval_condition_group = ' . (int) $id_interval_condition_group);
        $sql->where('id_interval_field = ' . (int) $id_interval_field);
        $id = (int) Db::getInstance()->getValue($sql);
        $interval_formula = new self($id);
        $interval_formula->id_interval_condition_group = (int) $id_interval_condition_group;
        $interval_formula->id_interval_field = (int) $id_interval_field;
        return $interval_formula;
    }

    /**
     * @param IntervalConditionGroup[] $condition_groups
     * @return self[]
     */
    private static function getByConditionGroups($condition_groups)
    {
        $ids = array_map(static function ($condition_group) {
            return (int) $condition_group->id;
        }, $condition_groups);
        if (!count($ids)) {
            return array();
        }
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_interval_condition_group IN(' . pSQL(implode(',', $ids)) . ')');
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

    /**
     * @param $id_condition_group
     * @return IntervalFormula[]
     */
    public static function getByConditionGroup($id_condition_group)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_interval_condition_group = ' . (int) $id_condition_group);
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

    /**
     * @param $id_interval_field
     * @return IntervalFormula[]
     */
    public static function getByIntervalField($id_interval_field)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_interval_field = ' . (int) $id_interval_field);
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
}
