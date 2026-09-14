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

use ObjectModelCore as Obj;

class DynamicFieldSettings
{
    public $id_unit = 0;

    public $min = 0;
    public $max = 100;
    public $step = 1;
    public $init;

    public $checked_by_default = 0;
    public $initial_date;
    public $thumbnail_size = 64;
    public $display_label;

    public $initial_value;
    public $placeholder;
    public $short_description;
    public $description;

    public $required;
    public $min_width;
    public $min_height;
    public $max_size;
    public $max_files = 1;
    public $extensions = '';
    public $min_date;
    public $max_date;
    public $disabled_days;
    public $multiselect;
    public $color;
    public $display_value_price;
    public $display_secondary_value_price;
    public $display_secondary_value_description;
    public $display_price_tax_excl;
    public $custom_suffix;
    public $display_in_popup;
    public $hide_when_empty;
    public $show_image_in_summary;
    public $show_in_summary;
    public $is_dynamic_value = true;
    public $price_unit = [];
    public $ps_style;
    public $show_dropzone;
    public $script_name;
    public $dev_port = 3000;
    public $json_config;

    private $definition = [
        'fields' => [
            'id_unit' => ['type' => Obj::TYPE_INT],
            'min' => ['type' => Obj::TYPE_FLOAT],
            'max' => ['type' => Obj::TYPE_FLOAT],
            'step' => ['type' => Obj::TYPE_FLOAT],
            'init' => ['type' => Obj::TYPE_STRING],
            'checked_by_default' => ['type' => Obj::TYPE_BOOL],
            'initial_date' => ['type' => Obj::TYPE_STRING],

            'initial_value' => ['type' => Obj::TYPE_NOTHING],
            'placeholder' => ['type' => Obj::TYPE_NOTHING],
            'short_description' => ['type' => Obj::TYPE_NOTHING],
            'description' => ['type' => Obj::TYPE_NOTHING],

            'thumbnail_size' => ['type' => Obj::TYPE_STRING],
            'display_label' => ['type' => Obj::TYPE_BOOL],
            'required' => ['type' => Obj::TYPE_BOOL],
            'min_width' => ['type' => Obj::TYPE_INT],
            'min_height' => ['type' => Obj::TYPE_INT],
            'max_size' => ['type' => Obj::TYPE_INT],
            'max_files' => ['type' => Obj::TYPE_INT],
            'extensions' => ['type' => Obj::TYPE_STRING],
            'min_date' => ['type' => Obj::TYPE_STRING],
            'max_date' => ['type' => Obj::TYPE_STRING],
            'disabled_days' => ['type' => Obj::TYPE_STRING],
            'multiselect' => ['type' => Obj::TYPE_BOOL],
            'color' => ['type' => Obj::TYPE_STRING],
            'display_value_price' => ['type' => Obj::TYPE_BOOL],
            'display_secondary_value_price' => ['type' => Obj::TYPE_BOOL],
            'display_secondary_value_description' => ['type' => Obj::TYPE_BOOL],
            'display_price_tax_excl' => ['type' => Obj::TYPE_BOOL],
            'custom_suffix' => ['type' => Obj::TYPE_STRING],
            'display_in_popup' => ['type' => Obj::TYPE_BOOL],
            'hide_when_empty' => ['type' => Obj::TYPE_BOOL],
            'show_in_summary' => ['type' => Obj::TYPE_BOOL],
            'show_image_in_summary' => ['type' => Obj::TYPE_BOOL],
            'is_dynamic_value' => ['type' => Obj::TYPE_BOOL],
            'price_unit' => ['type' => Obj::TYPE_NOTHING],
            'ps_style' => ['type' => Obj::TYPE_BOOL],
            'show_dropzone' => ['type' => Obj::TYPE_BOOL],
            'script_name' => ['type' => Obj::TYPE_STRING],
            'dev_port' => ['type' => Obj::TYPE_INT],
            'json_config' => ['type' => Obj::TYPE_STRING],
        ],
    ];

    public static function getDefaultValues()
    {
        return get_class_vars(__CLASS__);
    }

    /**
     * @param array $settings
     *
     * @return $this
     */
    public function copyFromArray($settings)
    {
        $definition = $this->definition['fields'];
        foreach ($settings as $key => $value) {
            if (property_exists($this, $key)) {
                $type = $definition[$key]['type'];
                switch ($type) {
                    case Obj::TYPE_INT:
                        $this->{$key} = (int) $value;
                        break;
                    case Obj::TYPE_FLOAT:
                        $this->{$key} = (float) $value;
                        break;
                    case Obj::TYPE_BOOL:
                        $this->{$key} = (bool) $value;
                        break;
                    case Obj::TYPE_STRING:
                        $this->{$key} = (string) $value;
                        break;
                    default:
                        $this->{$key} = $value;
                }
            }
        }

        return $this;
    }
}
