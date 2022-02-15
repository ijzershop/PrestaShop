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

use classes\DynamicTools;
use Db;
use DbQuery;
use DynamicProduct;

class DynamicProductConfigLink extends DynamicObject
{

    /** @var DynamicProduct $module */
    protected $module;

    public $id_product;
    public $id_product_source;

    private static $cache = array();

    public static $definition = array(
        'table'   => 'dynamicproduct_product_config_link',
        'primary' => 'id_product_config_link',
        'fields'  => array(
            'id_product'        => array('type' => self::TYPE_INT),
            'id_product_source' => array('type' => self::TYPE_INT),
        )
    );

    /**
     * @param $id_product
     * @param $id_product_source
     * @return DynamicProductConfigLink
     */
    public static function createLink($id_product, $id_product_source)
    {
        self::removeLink($id_product);
        $config_link = new self();
        $config_link->id_product = (int) $id_product;
        $config_link->id_product_source = (int) $id_product_source;
        $config_link->save();
        return $config_link;
    }

    public static function getSourceProduct($id_product)
    {
        if (isset(self::$cache[$id_product])) {
            return self::$cache[$id_product];
        }
        $sql = new DbQuery();
        $sql->select('id_product_source');
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int) $id_product);
        $id_source_product = (int) Db::getInstance()->getValue($sql);
        $result = $id_source_product ?: (int) $id_product;
        self::$cache[$id_product] = $result;
        return $result;
    }

    public static function getNbLinkedConfigs($id_source_product)
    {
        $sql = new DbQuery();
        $sql->select('COUNT(id_product)');
        $sql->from(self::$definition['table']);
        $sql->where('id_product_source = ' . (int) $id_source_product);
        $sql->groupBy('id_product_source');
        return (int) Db::getInstance()->getValue($sql);
    }

    public static function removeLink($id_product)
    {
        return Db::getInstance()->delete(self::$definition['table'], 'id_product = ' . (int) $id_product);
    }

    public static function removeLinks($id_source_product)
    {
        return Db::getInstance()->delete(self::$definition['table'], 'id_product_source = ' . (int) $id_source_product);
    }

    public static function getLinkedConfigs()
    {
        $sql = new DbQuery();
        $sql->select('id_product');
        $sql->from(self::$definition['table']);
        $result = Db::getInstance()->executeS($sql);
        return DynamicTools::organizeBy('id_product', $result);
    }
}
