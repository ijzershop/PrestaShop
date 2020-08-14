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
use DynamicProduct;
use ObjectModel;
use Product;

class DynamicConfig
{

    const TYPE_INT = 1;
    const TYPE_FLOAT = 4;

    /** @var DynamicProduct $module */
    protected $module;

    public $id_product;
    public $active = 0;
    public $required = 0;
    public $exclude = 0;
    public $displayed_price = 0;
    public $display_weight = 0;
    public $hide_qty = 0;
    public $multiply_price = 0;

    public static $definition = array(
        'table'  => 'dynamicproduct_config',
        'fields' => array(
            'id_product'      => array('type' => self::TYPE_INT),
            'active'          => array('type' => self::TYPE_INT),
            'required'        => array('type' => self::TYPE_INT),
            'exclude'         => array('type' => self::TYPE_INT),
            'displayed_price' => array('type' => self::TYPE_FLOAT),
            'display_weight'  => array('type' => self::TYPE_INT),
            'hide_qty'        => array('type' => self::TYPE_INT),
            'multiply_price'  => array('type' => self::TYPE_INT)
        )
    );

    public function __construct($id_product = null)
    {
        $this->id_product = (int)$id_product;
        $this->module = DynamicTools::getModule();
        $this->setValues();
    }

    private function setValues()
    {
        $fields = self::$definition['fields'];
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->select('name, value');
        $sql->where('id_product = ' . (int)$this->id_product);
        $result = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($result)) {
            $property = $row['name'];
            $value = $row['value'];
            if (isset($fields[$property])) {
                $field = $fields[$property];
                $value = ObjectModel::formatValue($value, $field['type']);
                $this->$property = $value;
            }
        }
    }

    public function isProductPriceExcluded()
    {
        return $this->active && $this->exclude && !$this->module->provider->isAfter1730();
    }

    public static function isActive($id_product)
    {
        return (new DynamicConfig($id_product))->active;
    }

    public static function isExcluded($id_product)
    {
        $product_config = new DynamicConfig($id_product);
        return $product_config->isProductPriceExcluded();
    }

    public static function getDisplayWeight($id_product)
    {
        return (new DynamicConfig($id_product))->display_weight;
    }

    public static function getMultiplyPrice($id_product)
    {
        return (new DynamicConfig($id_product))->multiply_price;
    }

    public static function getDisplayedPrice($id_product)
    {
        $product_config = new DynamicConfig($id_product);
        return (float)$product_config->displayed_price;
    }

    public static function getActiveProducts()
    {
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->select('id_product, value');
        $sql->where('name="active" AND value=1');
        $result = Db::getInstance()->executeS($sql);
        return DynamicTools::organizeBy('id_product', $result, 'value');
    }

    public static function getActiveProductsWithLabels($id_lang)
    {
        $products = array();
        $active_products = array_keys(self::getActiveProducts());
        foreach ($active_products as $id_product) {
            $products[$id_product] = array(
                'id_product' => $id_product,
                'label' => $id_product . ' - ' . Product::getProductName($id_product, null, $id_lang)
            );
        }
        return $products;
    }

    public function saveValue($name, $value)
    {
        $fields = self::$definition['fields'];
        if (!isset($fields[$name])) {
            return false;
        }
        $field = $fields[$name];
        $value = ObjectModel::formatValue($value, $field['type']);
        $data = array(
            'id_product' => (int)$this->id_product,
            'name'       => pSQL($name),
            'value'      => pSQL($value)
        );
        return Db::getInstance()->insert(self::$definition['table'], $data, false, true, Db::REPLACE);
    }

    public function save()
    {
        $fields = self::$definition['fields'];
        foreach ($fields as $property => $info) {
            $value = ObjectModel::formatValue($this->$property, $info['type']);
            $data = array(
                'id_product' => (int)$this->id_product,
                'name'       => pSQL($property),
                'value'      => pSQL($value)
            );
            Db::getInstance()->insert(self::$definition['table'], $data, false, true, Db::REPLACE);
        }
    }

    public function delete()
    {
        Db::getInstance()->delete(self::$definition['table'], 'id_product = ' . (int)$this->id_product);
    }
}
