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

namespace classes\models;

use Db;
use DbQuery;

class DynamicCombinationField extends DynamicObject
{

    public $id_product;
    public $id_field;

    public static $definition = array(
        'table'   => 'dynamicproduct_combination_field',
        'primary' => 'id_combination_field',
        'fields'  => array(
            'id_product' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_field'   => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
        )
    );

    public static function getByProductAndField($id_product, $id_field)
    {
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $sql = new DbQuery();
        $sql->select(self::$definition['primary']);
        $sql->from(self::$definition['table']);
        $sql->where('id_field = ' . (int) $id_field);
        $sql->where('id_product = ' . (int) $id_source_product);
        $id_combination_field = (int) Db::getInstance()->getValue($sql);
        $combination_field = new self($id_combination_field);
        $combination_field->id_field = (int) $id_field;
        $combination_field->id_product = (int) $id_source_product;
        return $combination_field;
    }

    public static function getByIdProduct($id_product, $order = false, $id_lang = null)
    {
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        return parent::getByIdProduct($id_source_product, $order, $id_lang);
    }
}
