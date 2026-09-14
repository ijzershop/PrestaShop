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
namespace DynamicProduct\classes\helpers;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\models\DynamicCombinationValue;
use DynamicProduct\classes\models\DynamicCommonField;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicFieldSettings;
use DynamicProduct\classes\models\DynamicInputField;

class DynamicFieldsHelper
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    public static function getFieldNames(int $id_product)
    {
        $field_names = [];
        $dynamic_fields = DynamicField::getFieldRowsByProduct($id_product);
        foreach ($dynamic_fields as $dynamic_field) {
            if (!empty($dynamic_field['name'])) {
                $field_names[] = $dynamic_field['name'];
            }
        }

        return $field_names;
    }

    public static function getFieldsNames(int $id_product)
    {
        $names = DynamicFieldsHelper::getFieldNames($id_product);
        $attributes = ProductHelper::getProductAttributeFields($id_product);
        $names = array_merge($names, array_map(function ($attribute) {
            return $attribute['name'];
        }, $attributes));

        $features = ProductHelper::getProductFeatureFields($id_product);
        $names = array_merge($names, array_map(function ($feature) {
            return $feature['name'];
        }, $features));

        return array_merge($names, ['product_price', 'product_weight', 'changed', 'quantity']);
    }

    public function addFields($id_product, $id_attribute, &$fields, $load, $values, $dynamic_fields = [])
    {
        $id_lang = DynamicContext::getLanguageId();
        if (empty($dynamic_fields)) {
            $dynamic_fields = DynamicField::getFieldRowsByProduct($id_product, $id_lang);
        }

        $combination_fields = $this->getCombinationFields($id_product);

        foreach ($dynamic_fields as $dynamic_field) {
            $field_name = $dynamic_field['name'];
            if (empty($field_name)) {
                $field_name = 'field_' . $dynamic_field['id'];
            }
            $is_dynamic_value = in_array((int) $dynamic_field['type'], [_DP_PRICE_, _DP_FIXED_, _DP_PHP_], true);
            $need_initial_value = !isset($fields[$field_name]) || $is_dynamic_value;
            $initial_value = null;
            $initial_options = [];

            if ($need_initial_value) {
                $forced_initial_value = null;
                if (isset($values[$field_name])) {
                    $forced_initial_value = $values[$field_name];
                    if (is_numeric($forced_initial_value)) {
                        $forced_initial_value = (float) $forced_initial_value;
                    }
                }

                [$initial_value, $initial_options] = $this->getInitialValue($dynamic_field, $forced_initial_value);
            }

            if (!isset($fields[$field_name])) {
                $this->addField($fields, [
                    'id_product' => (int) $id_product,
                    'id_field' => (int) $dynamic_field['id'],
                    'position' => (int) $dynamic_field['position'],
                    'id_group' => (int) $dynamic_field['id_group'],
                    'id_step' => (int) $dynamic_field['id_step'],
                    'name' => $field_name,
                    'value' => $initial_value,
                    'value_formatted' => $initial_value,
                    'options' => $initial_options,
                    'selected_options' => $initial_options,
                    'type' => $dynamic_field['type'],
                    'duplicated' => $dynamic_field['duplicated'] ?? false,
                ]);
            }

            if ($is_dynamic_value) {
                $fields[$field_name]['value'] = $initial_value;
            }

            $value = null;
            if (in_array((int) $dynamic_field['id'], $combination_fields, true)) {
                $value = $this->getCombinationValue($id_product, $id_attribute, $dynamic_field);
            }

            if ($load !== DynamicInputField::LOAD_NONE || $is_dynamic_value) {
                if ($value !== null) {
                    $fields[$field_name]['value'] = $value;
                }
            }
        }
    }

    public function duplicateFields($id_product, $fields)
    {
        $grouped_fields = DynamicField::getGroupedFields($id_product, DynamicContext::getLanguageId());

        return DynamicGroupsHelper::duplicateGroups($grouped_fields, $fields);
    }

    public function addAttributes($id_product, $id_attribute, &$fields)
    {
        $product = new \Product($id_product);

        $attributeFields = ProductHelper::getProductAttributeFields($id_product);
        foreach ($attributeFields as $attributeField) {
            $this->addField($fields, [
                'id_product' => (int) $id_product,
                'id_field' => 0,
                'name' => $attributeField['name'],
                'value' => '',
                'type' => 0,
                'visible' => 0,
            ]);
        }

        $attributes = $product->getAttributeCombinationsById($id_attribute, \Configuration::get('PS_LANG_DEFAULT'));
        foreach ($attributes as $attribute) {
            $this->addField($fields, [
                'id_product' => (int) $id_product,
                'id_field' => 0,
                'name' => ProductHelper::getCleanAttributeName($attribute['group_name']),
                'value' => $attribute['attribute_name'],
                'type' => 0,
                'visible' => 0,
            ]);
        }
    }

    public function addFeatures($id_product, &$fields)
    {
        $features = ProductHelper::getProductFeatureFields($id_product);
        foreach ($features as $feature) {
            $this->addField($fields, [
                'id_product' => (int) $id_product,
                'id_field' => 0,
                'name' => $feature['name'],
                'value' => $feature['value'],
                'type' => 0,
                'visible' => 0,
            ]);
        }
    }

    public function addExtraFields($id_product, $id_attribute, &$fields): void
    {
        $product_price = $this->module->provider->getProductPrice($id_product, $id_attribute);

        $this->addField($fields, [
            'id_product' => (int) $id_product,
            'id_field' => 0,
            'name' => 'product_price',
            'value' => $product_price,
            'type' => 0,
            'visible' => 0,
        ]);

        $product_weight = $this->module->provider->getProductWeight($id_product, $id_attribute);

        $this->addField($fields, [
            'id_product' => (int) $id_product,
            'id_field' => 0,
            'name' => 'product_weight',
            'value' => $product_weight,
            'type' => 0,
            'visible' => 0,
        ]);

        if (!isset($fields['quantity'])) {
            $this->addField($fields, [
                'id_product' => (int) $id_product,
                'id_field' => 0,
                'name' => 'quantity',
                'value' => \Tools::getValue('quantity', 1),
                'type' => 0,
                'visible' => 0,
            ]);
        }

        if (!isset($fields['changed'])) {
            $this->addField($fields, [
                'id_product' => (int) $id_product,
                'id_field' => 0,
                'name' => 'changed',
                'value' => '',
                'type' => _DP_TEXT_,
                'visible' => 0,
            ]);
        }
    }

    private function getCombinationFields($id_product): array
    {
        $rows = \Db::getInstance()->executeS('
        SELECT id_field 
        FROM ' . _DB_PREFIX_ . 'dynamicproduct_combination_field 
        WHERE id_product = ' . (int) $id_product);

        return array_map(function ($row) {
            return (int) $row['id_field'];
        }, $rows);
    }

    private function getCombinationValue($id_product, $id_attribute, $dynamic_field)
    {
        $id_product_source = ConfigLinkHelper::getSourceProduct($id_product);
        $id_attribute_source = ConfigLinkHelper::getSourceAttribute($id_product_source, $id_product, $id_attribute);

        $combination_value = DynamicCombinationValue::getCombinationValue(
            $id_product_source,
            $id_attribute_source,
            $dynamic_field['id']
        );
        if (\Validate::isLoadedObject($combination_value)) {
            return $combination_value->value;
        }

        return null;
    }

    private function addField(&$fields, $field): void
    {
        $name = $field['name'];
        if (isset($fields[$name])) {
            $fields[$name] = array_merge($fields[$name], $field);
        } else {
            $fields[$name] = $field;
        }

        // assign position
        if (isset($field['position'])) {
            $fields[$name]['position'] = DynamicInputFieldsHelper::getFieldPosition(
                $field['position'],
                $field['id_group'],
                $field['id_step']
            );
        }
    }

    public static function deleteField($id_product, $id_field)
    {
        $dynamic_field = new DynamicField($id_field);

        if ($id_product === (int) $dynamic_field->id_product) {
            $common_fields = DynamicCommonField::getByIdField($id_field);
            foreach ($common_fields as $common_field) {
                $common_field->delete();
            }
            $dynamic_field->delete();
        } else {
            $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $id_product);
            $common_field->delete();
        }

        return $dynamic_field;
    }

    public function getInitialValue($field, $forced_initial_value)
    {
        $type = $field['type'];
        $settings = $field['settings'];
        $options = $field['options'];
        $initial_value = $field['init'];
        $initial_options = [];

        switch ($type) {
            case _DP_INPUT_:
                $initial_value = (float) $field['init'];
                break;
            case _DP_SLIDER_:
                $init = (int) $field['init'];
                if ($init < (int) $settings['min']) {
                    $init = (int) $settings['min'];
                }
                if ($init > (int) $settings['max']) {
                    $init = (int) $settings['max'];
                }
                $initial_value = $init;
                break;
            case _DP_SWITCH_:
            case _DP_CHECKBOX_:
                $initial_value = (int) $settings['checked_by_default'];
                break;
            case _DP_COLORPICKER_:
                $initial_value = $settings['color'];
                break;
            case _DP_FILE_:
            case _DP_HTML_:
            case _DP_IMAGE_:
            case _DP_DATE_:
                $initial_value = '';
                break;
            case _DP_DROPDOWN_:
            case _DP_FONT_:
                if ($forced_initial_value) {
                    foreach ($options as $option) {
                        if ($option['value'] == $forced_initial_value) {
                            $initial_options = [$option['id']];
                            break 2;
                        }
                    }
                }
                foreach ($options as $option) {
                    if ((int) $option['is_default']) {
                        $initial_value = $option['value'];
                        $initial_options[] = $option['id'];
                        break 2;
                    }
                }
                if (count($options)) {
                    $ids = array_keys($options);
                    $first = (int) $ids[0];
                    $initial_options[] = $first;
                    $initial_value = $options[$first]['value'];
                    break;
                }
                $initial_value = 0;
                break;
            case _DP_THUMBNAILS_:
            case _DP_RADIO_:
                if ($forced_initial_value) {
                    foreach ($options as $option) {
                        if ($option['value'] == $forced_initial_value) {
                            $initial_options = [$option['id']];
                            break 2;
                        }
                    }
                }
                foreach ($options as $option) {
                    if ((int) $option['is_default']) {
                        $initial_value = $option['value'];
                        $initial_options[] = $option['id'];
                        break 2;
                    }
                }
                $initial_value = 0;
                break;
            case _DP_PREVIEW_:
                if ($forced_initial_value) {
                    foreach ($options as $option) {
                        if ($option['value'] == $forced_initial_value) {
                            $initial_options = [$option['id']];
                            break 2;
                        }
                    }
                }

                foreach ($options as $option) {
                    if ($option['value'] == $initial_value) {
                        $initial_options = [$option['id']];
                        break 2;
                    }
                }

                break;
            case _DP_TEXT_:
            case _DP_TEXTAREA_:
                $initial_value = $field['value'];
                break;
            case _DP_COUNTRY_:
                $initial_options = ['0'];
                break;
        }

        if ($forced_initial_value !== null) {
            $initial_value = $forced_initial_value;
        }

        return [$initial_value, $initial_options];
    }

    public static function getUnitSymbolOrName($field)
    {
        $unit = $field['unit'];

        return $unit['symbol'] ?: $unit['name'];
    }

    /**
     * @param $field
     * @param \DynamicProduct $module
     *
     * @return void
     *
     * @throws \PrestaShopDatabaseException
     * @throws \PrestaShopException
     */
    public static function migrateFieldSettings($field, \DynamicProduct $module): void
    {
        $settings_obj = [];

        $settings = \Db::getInstance()->getRow('
            SELECT * 
            FROM ' . _DB_PREFIX_ . 'dynamicproduct_unit_value
            WHERE id_field = ' . (int) $field['id_field']
        );

        if (!$settings) {
            $settings = [];
        }

        $settings_lang = [];

        $field_lang = \Db::getInstance()->executeS('
            SELECT * 
            FROM ' . _DB_PREFIX_ . 'dynamicproduct_field_lang
            WHERE id_field = ' . (int) $field['id_field']
        );

        if (isset($settings['id_unit_value'])) {
            $settings_lang = \Db::getInstance()->executeS('
                SELECT * 
                FROM ' . _DB_PREFIX_ . 'dynamicproduct_unit_value_lang
                WHERE id_unit_value = ' . (int) $settings['id_unit_value']
            );
        }

        $columns = array_keys(get_class_vars(DynamicFieldSettings::class));
        foreach ($columns as $column) {
            if ($column === 'price_unit') {
                $settings_obj[$column] = [];
                foreach ($settings_lang as $lang) {
                    $settings_obj[$column][$lang['id_lang']] = $lang[$column];
                }
            } elseif (isset($settings[$column])) {
                $settings_obj[$column] = $settings[$column];
            }

            switch ((int) $field['type']) {
                case _DP_CHECKBOX_:
                case _DP_SWITCH_:
                    $settings_obj['checked_by_default'] = $settings['extra'] ?? false;
                    unset($settings_obj['extra']);
                    break;
                case _DP_DATE_:
                    $settings_obj['initial_date'] = $settings['extra'] ?? '';
                    unset($settings_obj['extra']);
                    break;
                case _DP_DROPDOWN_:
                    $settings_obj['thumbnail_size'] = $settings['max_size'] ?? 128;
                    unset($settings_obj['max_size']);
                    break;
                case _DP_THUMBNAILS_:
                    $settings_obj['display_label'] = $settings['extra'] ?? false;
                    unset($settings_obj['extra']);

                    $settings_obj['thumbnail_size'] = $settings['max_size'] ?? 32;
                    unset($settings_obj['max_size']);
                    break;
            }

            $settings_obj['initial_value'] = [];
            $settings_obj['placeholder'] = [];
            $settings_obj['short_description'] = [];
            $settings_obj['description'] = [];

            $image_html = '';
            if (!empty($field['image'])) {
                $path = $module->provider->getDataFile('images/field/' . $field['image']);
                if (is_file($path)) {
                    $uri = Context::getContext()->shop->getBaseURI() . 'dynamicproduct/images/field/' . $field['image'];
                    $image_html = '<img src="' . $uri . '" alt="' . $field['image'] . '" style="max-width: 100%; height: auto;"><br>' . "\n";
                }
            }

            foreach ($field_lang as $lang) {
                $settings_obj['initial_value'][$lang['id_lang']] = $lang['value'];
                $settings_obj['placeholder'][$lang['id_lang']] = $lang['placeholder'];
                $settings_obj['short_description'][$lang['id_lang']] = $lang['short_description'];
                $settings_obj['description'][$lang['id_lang']] = $image_html . $lang['description'];
            }
        }

        $settings_obj['id_unit'] = (int) $field['id_unit'];
        unset($settings_obj['id_field']);
        unset($settings_obj['extra']);

        $updated = \Db::getInstance()->update(
            'dynamicproduct_field',
            ['settings' => pSQL(json_encode($settings_obj, JSON_NUMERIC_CHECK), true)],
            'id_field = ' . (int) $field['id_field']
        );

        if (!$updated) {
            throw new \PrestaShopException('Error while updating dynamicproduct_field table');
        }
    }
}
