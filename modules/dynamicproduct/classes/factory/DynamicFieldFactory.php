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

use classes\DynamicTools;
use classes\models\dynamic_fields\ColorPickerField;
use classes\models\dynamic_fields\DateField;
use classes\models\dynamic_fields\DropDownField;
use classes\models\dynamic_fields\FeatureField;
use classes\models\dynamic_fields\FileField;
use classes\models\dynamic_fields\HtmlField;
use classes\models\dynamic_fields\ImageField;
use classes\models\dynamic_fields\NumericField;
use classes\models\dynamic_fields\PHPField;
use classes\models\dynamic_fields\RadioField;
use classes\models\dynamic_fields\SliderField;
use classes\models\dynamic_fields\TextAreaField;
use classes\models\dynamic_fields\TextField;
use classes\models\dynamic_fields\ThumbnailsField;
use classes\models\DynamicField;
use Context;
use Db;
use DbQuery;
use DynamicProduct;

class DynamicFieldFactory
{
    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    private static $types = array(
        _DP_INPUT_       => NumericField::class,
        _DP_TEXT_        => TextField::class,
        _DP_DATE_        => DateField::class,
        _DP_IMAGE_       => ImageField::class,
        _DP_PHP_         => PHPField::class,
        _DP_DROPDOWN_    => DropDownField::class,
        _DP_FILE_        => FileField::class,
        _DP_SLIDER_      => SliderField::class,
        _DP_THUMBNAILS_  => ThumbnailsField::class,
        _DP_TEXTAREA_    => TextAreaField::class,
        _DP_FEATURE_     => FeatureField::class,
        _DP_RADIO_       => RadioField::class,
        _DP_COLORPICKER_ => ColorPickerField::class,
        _DP_HTML_        => HtmlField::class,
    );

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    /**
     * @param int $type
     * @param int $id_field
     * @param int $id_lang
     * @return DynamicField
     */
    public static function create($type = null, $id_field = null, $id_lang = null)
    {
        if (!$type) {
            $type = self::getFieldType($id_field);
        }

        if (isset(self::$types[$type])) {
            return new self::$types[$type]($id_field, $id_lang);
        }

        return new DynamicField($id_field, $id_lang);
    }

    private static function getFieldType($id_field)
    {
        $module = DynamicTools::getModule();
        $sql = new DbQuery();
        $sql->select('type');
        $sql->from($module->name . '_field');
        $sql->where('id_field = ' . (int)$id_field);
        return (int)Db::getInstance()->getValue($sql);
    }
}
