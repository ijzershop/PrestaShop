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

namespace classes\helpers;

use classes\models\DynamicCombinationValue;
use classes\models\DynamicField;
use Context;
use DynamicProduct;
use Product;
use Validate;

class DynamicFieldsHelper
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

    public function addFields($id_product, $id_attribute, &$fields, $load_all)
    {
        $id_lang = $this->context->language->id;
        $dynamic_fields = DynamicField::getFieldsByIdProduct($id_product, $id_lang);

        foreach ($dynamic_fields as $dynamic_field) {
            $field_name = $dynamic_field->name;
            if (!isset($fields[$field_name])) {
                $this->addField($fields, array(
                    'id_product' => (int)$id_product,
                    'id_field'   => (int)$dynamic_field->id,
                    'name'       => $dynamic_field->name,
                    'value'      => $dynamic_field->getInitialValue(),
                    'type'       => $dynamic_field->type,
                ));
            }
            $is_dynamic_value = in_array((int)$dynamic_field->type, array(_DP_PRICE_, _DP_FIXED_, _DP_PHP_), true);

            if (empty($fields[$field_name]['value']) && $is_dynamic_value) {
                $fields[$field_name]['value'] = $dynamic_field->getInitialValue();
            }

            $value = $this->getCombinationValue($id_product, $id_attribute, $dynamic_field);

            if ($value !== null && ($load_all || $is_dynamic_value)) {
                $fields[$field_name]['value'] = $value;
            }
        }
    }

    public function addAttributes($id_product, $id_attribute, &$fields)
    {
        $product = new Product($id_product);
        $attributes = $product->getAttributeCombinationsById($id_attribute, $this->context->language->id);
        foreach ($attributes as $attribute) {
            $this->addField($fields, array(
                'id_product' => (int)$id_product,
                'id_field'   => 0,
                'name'       => ProductHelper::getCleanAttributeName($attribute['group_name']),
                'value'      => $attribute['attribute_name'],
                'type'       => 0,
                'hidden'     => true
            ));
        }
    }

    public function addFeatures($id_product, &$fields)
    {
        $features = ProductHelper::getProductFeatureFields($id_product);
        foreach ($features as $feature) {
            $this->addField($fields, array(
                'id_product' => (int)$id_product,
                'id_field'   => 0,
                'name'       => $feature['name'],
                'value'      => $feature['value'],
                'type'       => 0,
                'hidden'     => true
            ));
        }
    }

    public function addExtraFields($id_product, $id_attribute, &$fields)
    {
        $product_price = $this->module->provider->getProductPrice($id_product, $id_attribute);

        $this->addField($fields, array(
            'id_product' => (int)$id_product,
            'id_field'   => 0,
            'name'       => 'product_price',
            'value'      => $product_price,
            'type'       => 0,
            'hidden'     => true
        ));

        $product_weight = $this->module->provider->getProductWeight($id_product, $id_attribute);

        $this->addField($fields, array(
            'id_product' => (int)$id_product,
            'id_field'   => 0,
            'name'       => 'product_weight',
            'value'      => $product_weight,
            'type'       => 0,
            'hidden'     => true
        ));
    }

    private function getCombinationValue($id_product, $id_attribute, $dynamic_field)
    {
        $combination_value = DynamicCombinationValue::getCombinationValue(
            $id_product,
            $id_attribute,
            $dynamic_field->id
        );
        if (Validate::isLoadedObject($combination_value)) {
            return $combination_value->value;
        }
        return null;
    }

    private function addField(&$fields, $field)
    {
        $name = $field['name'];
        if (isset($fields[$name])) {
            $fields[$name] = array_merge($fields[$name], $field);
        } else {
            $fields[$name] = $field;
        }
    }
}
