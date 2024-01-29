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

use classes\models\DynamicObject;
use Db;
use DbQuery;
use Validate;

class IntervalConditionValue extends DynamicObject
{

    public $id_interval_condition;
    public $value;

    public static $definition = array(
        'table'     => 'dynamicproduct_interval_condition_value',
        'primary'   => 'id_interval_condition_value',
        'multilang' => false,
        'fields'    => array(
            'id_interval_condition' => array('type' => self::TYPE_INT),
            'value'                 => array('type' => self::TYPE_FLOAT),
        )
    );

    /**
     * @param $id_interval
     * @return IntervalConditionValue[]
     */
    public static function getByIntervalCondition($id_interval_condition)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_interval_condition = ' . (int) $id_interval_condition);
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
