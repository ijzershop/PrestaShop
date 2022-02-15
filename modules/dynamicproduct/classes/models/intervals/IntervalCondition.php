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

class IntervalCondition extends DynamicObject
{

    public $id_interval_condition_group;
    public $id_field;
    public $type;

    public static $TYPE_RANGE = 'range';
    public static $TYPE_VALUES = 'values';

    /** @var DynamicField[] */
    public $field;

    public $condition_range;
    public $condition_value;

    /** @var integer[] */
    public $values = array();

    public $min;
    public $max;

    public static $definition = array(
        'table'     => 'dynamicproduct_interval_condition',
        'primary'   => 'id_interval_condition',
        'multilang' => false,
        'fields'    => array(
            'id_interval_condition_group' => array('type' => self::TYPE_INT),
            'id_field'                    => array('type' => self::TYPE_INT),
            'type'                        => array('type' => self::TYPE_STRING),
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->assignField();
        $this->assignValues();
    }

    /**
     * @param $id_interval
     * @return IntervalCondition[]
     */
    public static function getByIntervalConditionGroup($id_interval_condition_group)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_interval_condition_group = ' . (int) $id_interval_condition_group);
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

    private function assignField()
    {
        $this->field = new DynamicField($this->id_field);
    }

    private function assignValues()
    {
        if ($this->type === self::$TYPE_RANGE) {
            $condition_range = IntervalConditionRange::getByIntervalCondition($this->id);
            $this->condition_range = $condition_range;
            $this->min = (float) $condition_range->min;
            $this->max = (float) $condition_range->max;
        }
        if ($this->type === self::$TYPE_VALUES) {
            $condition_values = IntervalConditionValue::getByIntervalCondition($this->id);
            $this->condition_value = $condition_values;
            $this->values = array();
            foreach ($condition_values as $condition_value) {
                $this->values[] = (float) $condition_value->value;
            }
        }
    }

    public function delete()
    {
        $interval_condition_range = IntervalConditionRange::getByIntervalCondition($this->id);
        if (Validate::isLoadedObject($interval_condition_range)) {
            $interval_condition_range->delete();
        }

        $interval_condition_values = IntervalConditionValue::getByIntervalCondition($this->id);
        foreach ($interval_condition_values as $interval_condition_value) {
            $interval_condition_value->delete();
        }
        parent::delete();
    }
}
