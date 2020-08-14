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

namespace classes\factory;

use classes\models\DynamicInputField;
use classes\models\input_fields\CheckboxInputField;
use classes\models\input_fields\ColorPickerInputField;
use classes\models\input_fields\DateInputField;
use classes\models\input_fields\DropdownInputField;
use classes\models\input_fields\FileInputField;
use classes\models\input_fields\FixedInputField;
use classes\models\input_fields\HtmlInputField;
use classes\models\input_fields\ImageInputField;
use classes\models\input_fields\NumericInputField;
use classes\models\input_fields\PhpVariableInputField;
use classes\models\input_fields\PriceInputField;
use classes\models\input_fields\RadioInputField;
use classes\models\input_fields\SliderInputField;
use classes\models\input_fields\TextAreaInputField;
use classes\models\input_fields\TextInputField;
use classes\models\input_fields\ThumbnailsInputField;
use Context;
use DynamicProduct;

class InputFieldFactory
{
    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    private static $types = array(
        _DP_INPUT_       => NumericInputField::class,
        _DP_FIXED_       => FixedInputField::class,
        _DP_PRICE_       => PriceInputField::class,
        _DP_TEXT_        => TextInputField::class,
        _DP_DATE_        => DateInputField::class,
        _DP_IMAGE_       => ImageInputField::class,
        _DP_PHP_         => PhpVariableInputField::class,
        _DP_DROPDOWN_    => DropdownInputField::class,
        _DP_CHECKBOX_    => CheckboxInputField::class,
        _DP_FILE_        => FileInputField::class,
        _DP_SLIDER_      => SliderInputField::class,
        _DP_THUMBNAILS_  => ThumbnailsInputField::class,
        _DP_TEXTAREA_    => TextAreaInputField::class,
        _DP_RADIO_       => RadioInputField::class,
        _DP_COLORPICKER_ => ColorPickerInputField::class,
        _DP_HTML_        => HtmlInputField::class,
    );

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    /**
     * @param int $type
     * @param int $id_input_field
     * @param int $id_lang
     * @return DynamicInputField
     */
    public static function create($type, $id_input_field = null, $id_lang = null)
    {
        if (isset(self::$types[$type])) {
            return new self::$types[$type]($id_input_field, $id_lang);
        }

        return new DynamicInputField($id_input_field, $id_lang);
    }
}
