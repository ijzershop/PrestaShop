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
 * @author    Tunis-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use AttributeGroup;
use classes\DynamicTools;
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

    public static function getProductFeatures($id_product)
    {
        $features = array();
        $id_lang = Context::getContext()->language->id;
        $product_features = Product::getFrontFeaturesStatic($id_lang, $id_product);
        foreach ($product_features as $product_feature) {
            $name = DynamicTools::convertToVariableName($product_feature['name']);
            $name = 'feature_' . str_replace(' ', '_', Tools::strtolower($name));
            $value = $product_feature['value'];
            $features[$name] = $value;
        }
        return $features;
    }

    public static function getProductFeatureFields($id_product)
    {
        $feature_fields = array();
        $id_lang = Context::getContext()->language->id;
        $product_features = Product::getFrontFeaturesStatic($id_lang, $id_product);
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

    public static function getProductAttributes($id_product, $id_attribute)
    {
        $attributes = array();
        $product = new Product($id_product, false);
        $product_attributes = $product->getAttributeCombinationsById(
            $id_attribute,
            Context::getContext()->language->id
        );
        foreach ($product_attributes as $product_attribute) {
            $name = DynamicTools::convertToVariableName($product_attribute['group_name']);
            $name = 'attribute_' . str_replace(' ', '_', Tools::strtolower($name));
            $value = $product_attribute['attribute_name'];
            $attributes[$name] = $value;
        }
        return $attributes;
    }

    public static function getProductAttributeFields($id_product)
    {
        $attribute_fields = array();
        $groups = AttributeGroup::getAttributesGroups(Context::getContext()->language->id);
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
}
