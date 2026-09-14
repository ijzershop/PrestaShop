<?php
/**
 * 2007-2026 TuniSoft
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
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\models;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\helpers\ConfigLinkHelper;

class DynamicProductConfig extends DynamicObject
{
    /** @var \DynamicProduct */
    protected $module;

    public $id_product;
    public $data;

    private $config = [];

    public $active = false;
    public $required = false;
    public $exclude = false;
    public $displayed_price = false;
    public $displayed_price_label;
    public $display_starting_from = true;
    public $display_dynamic_price = false;
    public $display_customization_cost = false;
    public $recalc = false;
    public $always_recalc = false;
    public $display_weight = false;
    public $hide_qty = false;
    public $multiply_price = false;
    public $allow_save = false;
    public $split_summary = false;
    public $custom_calculation = false;
    public $enable_steps = true;
    public $all_steps_required = true;
    public $ungrouped_fields_on_top = false;

    public static $definition = [
        'table' => 'dynamicproduct_product_config',
        'primary' => 'id_product_config',
        'fields' => [
            'id_product' => ['type' => self::TYPE_INT],
            'data' => ['type' => self::TYPE_STRING],
        ],
        'schema' => [
            'active' => ['type' => self::TYPE_BOOL],
            'required' => ['type' => self::TYPE_BOOL],
            'exclude' => ['type' => self::TYPE_BOOL],
            'displayed_price' => ['type' => self::TYPE_FLOAT],
            'displayed_price_label' => ['type' => self::TYPE_STRING],
            'display_starting_from' => ['type' => self::TYPE_BOOL],
            'display_dynamic_price' => ['type' => self::TYPE_BOOL],
            'display_customization_cost' => ['type' => self::TYPE_BOOL],
            'recalc' => ['type' => self::TYPE_BOOL],
            'always_recalc' => ['type' => self::TYPE_BOOL],
            'display_weight' => ['type' => self::TYPE_BOOL],
            'hide_qty' => ['type' => self::TYPE_BOOL],
            'multiply_price' => ['type' => self::TYPE_BOOL],
            'allow_save' => ['type' => self::TYPE_BOOL],
            'split_summary' => ['type' => self::TYPE_BOOL],
            'custom_calculation' => ['type' => self::TYPE_BOOL],
            'enable_steps' => ['type' => self::TYPE_BOOL],
            'all_steps_required' => ['type' => self::TYPE_BOOL],
            'ungrouped_fields_on_top' => ['type' => self::TYPE_BOOL],
        ],
    ];

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        if ($this->data === null) {
            $this->data = '{}';
        }
        $data = json_decode($this->data, true);
        $this->setProps($data);
    }

    /**
     * @param $id_product
     *
     * @return self
     *
     * @throws \PrestaShopDatabaseException
     * @throws \PrestaShopException
     */
    public static function getByProduct($id_product)
    {
        $id_source_product = ConfigLinkHelper::getSourceProduct($id_product);

        $id = (int) \Db::getInstance()->getValue('
            SELECT `id_product_config`
            FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_config`
            WHERE `id_product` = ' . $id_source_product);

        $product_config = new self($id);
        $product_config->id_product = (int) $id_product;

        return $product_config;
    }

    public static function isActive($id_product)
    {
        return self::getByProduct($id_product)->active;
    }

    public static function getActiveProducts()
    {
        $rows = \Db::getInstance()->executeS('
            SELECT `id_product`, `data`
            FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_config`
            WHERE `data` LIKE \'%\"active\":true%\'
        ');

        return DynamicTools::organizeBy('id_product', $rows);
    }

    public static function getActiveProductsWithLabels($id_lang)
    {
        $products = [];
        $active_products = array_keys(self::getActiveProducts());
        foreach ($active_products as $id_product) {
            $products[$id_product] = [
                'id_product' => $id_product,
                'label' => $id_product . ' - ' . \Product::getProductName($id_product, null, $id_lang),
            ];
        }

        return $products;
    }

    public function save($null_values = false, $auto_date = true)
    {
        $data = [];
        $keys = array_keys(self::$definition['schema']);
        foreach ($keys as $key) {
            $data[$key] = $this->$key;
        }
        $this->data = json_encode($data, JSON_NUMERIC_CHECK);

        return parent::save($null_values, $auto_date);
    }

    /**
     * @return array
     */
    public function getConfig()
    {
        $def = self::$definition['schema'];
        $config = [];
        foreach ($def as $key => $value) {
            $config[$key] = $this->$key;
        }

        return $config;
    }

    public static function getDisplayedPrice($id_product)
    {
        $config = self::getByProduct($id_product);

        return $config->displayed_price;
    }

    /**
     * @param $data
     *
     * @return void
     */
    public function setProps($data): void
    {
        $keys = array_keys(self::$definition['schema']);
        foreach ($keys as $key) {
            if (isset($data[$key])) {
                $this->$key = $data[$key];
            }
        }
    }
}
