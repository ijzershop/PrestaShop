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

class IntervalConditionGroup extends DynamicObject
{

    public $id_interval;

    /** @var IntervalCondition[] */
    public $intervalConditions;

    /** @var $intervalFormula [] */
    public $intervalFormulas;

    public static $definition = array(
        'table'     => 'dynamicproduct_interval_condition_group',
        'primary'   => 'id_interval_condition_group',
        'multilang' => false,
        'fields'    => array(
            'id_interval' => array('type' => self::TYPE_INT),
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->assignConditions();
        $this->assignFormulas();
    }

    /**
     * @param $id_interval
     * @return IntervalConditionGroup[]
     */
    public static function getByInterval($id_interval)
    {
        $objects = array();
        $sql = new DbQuery();
        $sql->from(static::$definition['table']);
        $sql->where('id_interval = ' . (int) $id_interval);
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
     * @param $id_interval
     * @return IntervalConditionGroup
     */
    public static function getLastConditionGroup($id_interval)
    {
        $condition_groups = self::getByInterval($id_interval);
        $count = count($condition_groups);
        if ($count) {
            $array_keys = array_keys($condition_groups);
            $id_condition_group = $array_keys[$count - 1];
            return new self($id_condition_group);
        }
        return new self();
    }

    private function assignConditions()
    {
        $this->intervalConditions = IntervalCondition::getByIntervalConditionGroup($this->id);
    }

    private function assignFormulas()
    {
        $this->intervalFormulas = IntervalFormula::getByConditionGroup($this->id);
    }

    public function delete()
    {
        $interval_conditions = IntervalCondition::getByIntervalConditionGroup($this->id);
        foreach ($interval_conditions as $interval_condition) {
            $interval_condition->delete();
        }
        $interval_formulas = IntervalFormula::getByConditionGroup($this->id);
        foreach ($interval_formulas as $interval_formula) {
            $interval_formula->delete();
        }
        parent::delete();
    }
}
