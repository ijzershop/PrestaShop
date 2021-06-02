<?php
/**
 * 2010-2020 Tuni-Soft
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
 * @copyright 2010-2020 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\models;

use Db;
use DbQuery;
use Validate;

class DynamicCommonField extends DynamicObject
{

    public $id_field;
    public $id_product;
    public $position;

    public static $definition = array(
        'table'     => 'dynamicproduct_common_field',
        'primary'   => 'id_common_field',
        'multilang' => false,
        'fields'    => array(
            'id_field'   => array('type' => self::TYPE_INT),
            'id_product' => array('type' => self::TYPE_INT),
            'position'   => array('type' => self::TYPE_INT),
        )
    );

    /**
     * @param $id_field
     * @return DynamicCommonField[]
     */
    public static function getByIdField($id_field)
    {
        $common_fields = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('id_field = ' . (int)$id_field);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_field = $row['id_common_field'];
            $common_field = new self($id_field);
            if (Validate::isLoadedObject($common_field)) {
                $common_fields[$id_field] = $common_field;
            }
        }
        return $common_fields;
    }

    /**
     * @param $id_product
     * @return DynamicCommonField[]
     */
    public static function getByIdProduct($id_product, $order=false)
    {
        $common_fields = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int)$id_product);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_field = $row['id_common_field'];
            $common_field = new self($id_field);
            if (Validate::isLoadedObject($common_field)) {
                $common_fields[$id_field] = $common_field;
            }
        }
        return $common_fields;
    }

    public static function getByFieldAndProduct($id_field, $id_product)
    {
        $sql = new DbQuery();
        $sql->select(self::$definition['primary']);
        $sql->from(self::$definition['table']);
        $sql->where('id_field = ' . (int)$id_field);
        $sql->where('id_product = ' . (int)$id_product);
        $id_common_field = (int)Db::getInstance()->getValue($sql);
        $common_field = new self($id_common_field);
        $common_field->id_field = (int)$id_field;
        $common_field->id_product = (int)$id_product;
        return $common_field;
    }
}
