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
 * @author    Tunis-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use AttributeGroup;
use classes\DynamicTools;
use Configuration;
use Context;
use DynamicProduct;
use Product;
use Tools;

class ProductHelper
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public static function getProductFeatureFields($id_product)
    {
        $feature_fields = array();
        $product_features = Product::getFrontFeaturesStatic((int) Configuration::get('PS_LANG_DEFAULT'), $id_product);
        foreach ($product_features as $product_feature) {
            $label = $product_feature['name'];
            $name = self::getCleanFeatureName($label);
            $feature_fields[] = array(
                'name'  => $name,
                'label' => $label,
                'value' => $product_feature['value']
            );
        }
        return $feature_fields;
    }

    public static function getProductAttributeFields($id_product)
    {
        $attribute_fields = array();
        $groups = AttributeGroup::getAttributesGroups((int) Configuration::get('PS_LANG_DEFAULT'));
        foreach ($groups as $group) {
            $id_group = $group['id_attribute_group'];
            if (DynamicTools::productHasAttributeGroup($id_product, $id_group)) {
                $label = $group['name'];
                $name = self::getCleanAttributeName($label);
                $attribute_fields[] = array(
                    'name'  => $name,
                    'label' => $label
                );
            }
        }
        return $attribute_fields;
    }

    public static function getProductDatabaseFields()
    {
        $module = DynamicTools::getModule();
        $database_fields = array();
        $csv_files = Tools::scandir($module->provider->getDataDir('databases'), 'csv');

        foreach ($csv_files as $csv_file) {
            $label = pathinfo($csv_file, PATHINFO_FILENAME);
            $name = $label;
            $database_fields[] = array(
                'name'  => $name,
                'label' => $label
            );
        }
        return $database_fields;
    }

    public static function getCleanAttributeName($label)
    {
        $name = Tools::replaceAccentedChars($label);
        $name = 'attribute_' . str_replace(' ', '_', Tools::strtolower($name));
        return $name;
    }

    public static function getCleanFeatureName($label)
    {
        $name = Tools::replaceAccentedChars($label);
        $name = str_replace(' ', '_', Tools::strtolower($name));
        $name = preg_replace('/[^0-9a-zA-Z_]/', '', $name);
        $name = 'feature_' . Tools::strtolower($name);
        return $name;
    }

    public function isAvailableWhenOutOfStock($id_product)
    {
        $product = new Product($id_product, true);
        return Product::isAvailableWhenOutOfStock($product->out_of_stock);
    }
}
