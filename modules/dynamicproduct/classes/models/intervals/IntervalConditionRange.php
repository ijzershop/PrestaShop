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

class IntervalConditionRange extends DynamicObject
{

    public $id_interval_condition;
    public $min;
    public $max;

    /** @var integer[] */
    public $values;

    public static $definition = array(
        'table'     => 'dynamicproduct_interval_condition_range',
        'primary'   => 'id_interval_condition_range',
        'multilang' => false,
        'fields'    => array(
            'id_interval_condition' => array('type' => self::TYPE_INT),
            'min'                   => array('type' => self::TYPE_FLOAT),
            'max'                   => array('type' => self::TYPE_FLOAT),
        )
    );

    /**
     * @param $id_interval
     * @return IntervalConditionRange
     */
    public static function getByIntervalCondition($id_interval_condition)
    {
        $sql = new DbQuery();
        $sql->select(self::$definition['primary']);
        $sql->from(static::$definition['table']);
        $sql->where('id_interval_condition = ' . (int) $id_interval_condition);
        $id = (int) Db::getInstance()->getValue($sql);
        $object = new self($id);
        $object->id_interval_condition = (int) $id_interval_condition;
        return $object;
    }
}
