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

use classes\DynamicTools;
use Db;
use DbQuery;
use Validate;

class DynamicCondition extends DynamicObject
{

    public $id_product;
    public $name;
    public $formula;

    public static $definition = array(
        'table'   => 'dynamicproduct_condition',
        'primary' => 'id_condition',
        'fields'  => array(
            'id_product' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'name'       => array('type' => self::TYPE_STRING),
            'formula'    => array('type' => self::TYPE_STRING),
        )
    );

    /**
     * @param $id_product
     * @return DynamicCondition[]
     */
    public static function getByProduct($id_product)
    {
        $dynamic_conditions = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int)$id_product);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_condition = $row['id_condition'];
            $dynamic_condition = new self($id_condition);
            if (Validate::isLoadedObject($dynamic_condition)) {
                $dynamic_conditions[$id_condition] = $dynamic_condition;
            }
        }
        return $dynamic_conditions;
    }

    public static function deleteByProduct($id_product)
    {
        return Db::getInstance()->delete(self::$definition['table'], 'id_product = ' . (int)$id_product);
    }

    public function getVisibilityValues()
    {
        $sql = new DbQuery();
        $sql->from($this->module->name . '_condition_visibility');
        $sql->where('id_condition = ' . (int)$this->id);
        $sql->where('visible = 0');
        $result = Db::getInstance()->executeS($sql);
        return DynamicTools::organizeBy('id_field', $result, 'visible');
    }
}
