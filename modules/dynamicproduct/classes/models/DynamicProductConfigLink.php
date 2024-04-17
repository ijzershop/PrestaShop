<?php
/**
 * 2007-2023 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2023 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\models;

use DynamicProduct\classes\DynamicTools;

class DynamicProductConfigLink extends DynamicObject
{
    /** @var \DynamicProduct */
    protected $module;

    public $id_product;
    public $id_product_source;

    private static $cache = [];

    public static $definition = [
        'table' => 'dynamicproduct_product_config_link',
        'primary' => 'id_product_config_link',
        'fields' => [
            'id_product' => ['type' => self::TYPE_INT],
            'id_product_source' => ['type' => self::TYPE_INT],
        ],
    ];

    /**
     * @param $id_product
     * @param $id_product_source
     *
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
        $sql = new \DbQuery();
        $sql->select('id_product_source');
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int) $id_product);
        $id_source_product = (int) \Db::getInstance()->getValue($sql);
        $result = $id_source_product ?: (int) $id_product;
        self::$cache[$id_product] = $result;

        return $result;
    }

    public static function getSourceAttribute($id_product_source, $id_product, $id_attribute)
    {
        if (!(int) $id_attribute) {
            return $id_attribute;
        }

        if ($id_product_source == $id_product) {
            return $id_attribute;
        }

        $attributes_source = \Product::getProductAttributesIds($id_product_source);
        $attributes_current = \Product::getProductAttributesIds($id_product);

        $attributes_mapping = DynamicTools::mapAttributes($attributes_current, $attributes_source, true);

        $source_attribute = $attributes_mapping[$id_attribute] ?? $id_attribute;

        if (!$source_attribute) {
            $source_attribute = $id_attribute;
        }

        return $source_attribute;
    }

    public static function getNbLinkedConfigs($id_source_product)
    {
        $sql = new \DbQuery();
        $sql->select('COUNT(id_product)');
        $sql->from(self::$definition['table']);
        $sql->where('id_product_source = ' . (int) $id_source_product);
        $sql->groupBy('id_product_source');

        return (int) \Db::getInstance()->getValue($sql);
    }

    public static function removeLink($id_product)
    {
        return \Db::getInstance()->delete(self::$definition['table'], 'id_product = ' . (int) $id_product);
    }

    public static function removeLinks($id_source_product)
    {
        return \Db::getInstance()->delete(self::$definition['table'], 'id_product_source = ' . (int) $id_source_product);
    }

    public static function getLinkedConfigs()
    {
        $sql = new \DbQuery();
        $sql->select('id_product');
        $sql->from(self::$definition['table']);
        $result = \Db::getInstance()->executeS($sql);

        return DynamicTools::organizeBy('id_product', $result);
    }
}
