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
use DynamicProduct\classes\models\DynamicCommonField;
use DynamicProduct\classes\models\DynamicFieldGroup;
use DynamicProduct\classes\models\DynamicInputField;
use DynamicProduct\classes\models\DynamicProductFieldGroup;

class DynamicInputFieldsHelper
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * @param int $id_product
     * @param DynamicInputField[] $input_fields
     *
     * @return array
     */
    public static function groupFields($id_product, $input_fields)
    {
        $id_lang = DynamicContext::getLanguageId();
        $id_source_product = ConfigLinkHelper::getSourceProduct($id_product);
        $grouped_fields = [];
        $max_position = 0;

        $grouped_input_fields = [];
        foreach ($input_fields as $input_field) {
            if ($input_field->isSkipped() || $input_field->isSkippedName()) {
                continue;
            }

            $field = $input_field->getDynamicField();
            $id_group = (int) $field['id_group'];
            if ($field['id_product'] !== $id_source_product) {
                $common_field = DynamicCommonField::getByFieldAndProduct($field['id'], $id_source_product);
                $id_group = (int) $common_field->id_group;
            }

            $grouped_input_fields[$id_group][] = $input_field;
        }

        foreach ($grouped_input_fields as $id_group => $input_fields) {
            $product_group = new DynamicProductFieldGroup($id_group, $id_lang);
            $group = new DynamicFieldGroup($product_group->id_field_group, $id_lang);

            if ((int) $product_group->id_control_field) {
                foreach ($input_fields as $input_field) {
                    if (preg_match('/_([0-9]+)$/', $input_field->name, $matches)) {
                        $index = (int) $matches[1];
                        $id_new_group = 10000 * $id_group + $index;

                        if (isset($grouped_fields[$id_new_group])) {
                            $grouped_fields[$id_new_group]['fields'][] = $input_field;
                        } else {
                            $position = (int) $product_group->position;
                            if ($position > $max_position) {
                                $max_position = $position;
                            }
                            $grouped_fields[$id_new_group] = [
                                'label' => $group->label . "($index)",
                                'position' => $position,
                                'fields' => [$input_field],
                            ];
                        }
                    }
                }
                continue;
            }

            $position = (int) $product_group->position;
            if ($position > $max_position) {
                $max_position = $position;
            }
            $grouped_fields[$id_group] = [
                'label' => $group->label,
                'position' => $position,
                'fields' => $input_fields,
            ];
        }

        if (isset($grouped_fields[0])) {
            $grouped_fields[0]['position'] = $max_position + 1;
        }

        uasort($grouped_fields, function ($a, $b) {
            return $a['position'] - $b['position'];
        });

        return $grouped_fields;
    }

    /**
     * @param DynamicInputField[] $input_fields
     *
     * @return array
     */
    public static function sortFields($input_fields)
    {
        $rows = array_values($input_fields);
        uasort($rows, function ($a, $b) {
            return $a->position - $b->position;
        });

        return $rows;
    }

    /**
     * @param string $content
     * @param DynamicInputField[] $input_fields
     * @param bool $skip_html_fields
     *
     * @return string
     */
    public static function replaceFieldValues($content, $input_fields, $skip_html_fields = false)
    {
        if (!$content) {
            return $content;
        }

        if (strpos($content, '[') === false) {
            return $content;
        }

        if (!$skip_html_fields) {
            $html_fields = array_filter($input_fields, function ($f) {
                return $f->type === _DP_HTML_;
            });

            foreach ($html_fields as $input_field) {
                $content = str_replace(
                    '[' . $input_field->name . ']',
                    self::replaceFieldValues(
                        !empty($input_field->value) ? $input_field->value : $input_field->getDynamicField()['description'],
                        $input_fields,
                        true
                    ),
                    $content
                );
            }
        }

        foreach ($input_fields as $input_field) {
            $content = str_replace(
                ['[[' . $input_field->name . ']]', '[' . $input_field->name . ']', '{' . $input_field->name . '}'],
                [htmlspecialchars($input_field->secondary_value), htmlspecialchars($input_field->secondary_value), htmlspecialchars($input_field->display_value)],
                $content
            );
        }

        return $content;
    }

    /**
     * @param DynamicInputField[] $input_fields
     *
     * @return array
     */
    public static function getFieldsFromInput($input_fields)
    {
        //    id_input = null
        //    id_field = {int} 3
        //    name = "material"
        //    value = ""
        //    secondary_value = {int} 0
        //    options = "[11]"
        //    type = {int} 8
        //    visible = null
        //    data = null
        //    data_obj = null
        //    selected_options = {array[1]}
        //    duplicated = {int} 0
        $fields = [];
        foreach ($input_fields as $input_field) {
            $fields[$input_field->name] = [
                'id_input' => $input_field->id_input,
                'id_field' => $input_field->id_field,
                'name' => $input_field->name,
                'value' => $input_field->value,
                'secondary_value' => $input_field->secondary_value,
                'options' => $input_field->options,
                'type' => $input_field->type,
                'visible' => $input_field->visible,
                'data' => $input_field->data,
                'data_obj' => $input_field->data_obj,
                'selected_options' => $input_field->selected_options,
                'duplicated' => $input_field->duplicated,
            ];
        }

        return $fields;
    }

    /**
     * @param int $field_position
     * @param int $id_group
     * @param int $id_step
     *
     * @return float|int
     */
    public static function getFieldPosition($field_position, $id_group, $id_step)
    {
        $group_position = 0;
        $group_step = 0;
        $step_position = 0;
        if ($id_group) {
            $group_position = (int) \Db::getInstance()->getValue(
                'SELECT position FROM ' . _DB_PREFIX_ . 'dynamicproduct_product_field_group WHERE id_product_field_group = ' . $id_group
            );
            $group_step = (int) \Db::getInstance()->getValue(
                'SELECT id_step FROM ' . _DB_PREFIX_ . 'dynamicproduct_product_field_group WHERE id_product_field_group = ' . $id_group
            );
        }
        if ($id_step) {
            $step_position = (int) \Db::getInstance()->getValue(
                'SELECT position FROM ' . _DB_PREFIX_ . 'dynamicproduct_product_step WHERE id_product_step = ' . $id_step
            );
        }
        if ($group_step) {
            $step_position = (int) \Db::getInstance()->getValue(
                'SELECT position FROM ' . _DB_PREFIX_ . 'dynamicproduct_product_step WHERE id_product_step = ' . (int) $group_step
            );
        }

        return $field_position + $group_position * 100 + $step_position * 10000;
    }
}
