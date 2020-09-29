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

namespace classes\models;

use classes\DynamicTools;
use classes\factory\DynamicFieldFactory;
use classes\helpers\ColorHelper;
use classes\helpers\FieldGroupHelper;
use classes\models\intervals\IntervalField;
use Context;
use Db;
use DbQuery;
use Validate;

class DynamicField extends DynamicObject
{
    public $dir = 'images/field';

    public $id_product;
    public $id_group;
    public $id_unit;
    public $name;
    public $type;
    public $init;
    public $active;
    public $favorite;
    public $common;
    public $label;
    public $value;
    public $description;

    /** @var DynamicUnitValue */
    public $settings;

    /** @var DynamicDropdownOption[]|DynamicThumbnailsOption[]|DynamicRadioOption[] */
    public $options;

    public $unit;
    public $linked = false;

    private static $fields_by_name = array();

    public static $definition = array(
        'table'     => 'dynamicproduct_field',
        'primary'   => 'id_field',
        'group_by'  => 'id_product',
        'multilang' => true,
        'fields'    => array(
            'id_product'  => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_group'    => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_unit'     => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'type'        => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'name'        => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName'),
            'init'        => array('type' => self::TYPE_FLOAT),
            'active'      => array('type' => self::TYPE_INT),
            'favorite'    => array('type' => self::TYPE_INT),
            'common'      => array('type' => self::TYPE_INT),
            'position'    => array('type' => self::TYPE_INT),
            /* Lang fields */
            'label'       => array(
                'type'     => self::TYPE_STRING,
                'lang'     => true,
                'required' => false,
                'validate' => 'isGenericName',
                'size'     => 200
            ),
            'value'       => array(
                'type'     => self::TYPE_STRING,
                'lang'     => true,
                'required' => false,
                'validate' => 'isCleanHtml',
                'size'     => 100
            ),
            'description' => array(
                'type'     => self::TYPE_HTML,
                'lang'     => true,
                'required' => false,
                'validate' => 'iscleanhtml',
            ),
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->initSettings($id_lang);
        $this->initOptions();
    }

    /**
     * @param $id_product
     * @param $field_name
     * @param null $id_lang
     * @return DynamicField
     * @internal param $id_lang
     */
    public static function getFieldByName($id_product, $field_name, $id_lang = null)
    {
        $key = $id_product . '_' . $field_name . '_' . $id_lang;
        if (isset(self::$fields_by_name[$key])) {
            return self::$fields_by_name[$key];
        }
        $sql = new DbQuery();
        $sql->select('id_field');
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int)$id_product);
        $sql->where('name = "' . pSQL($field_name) . '"');
        $id_field = Db::getInstance()->getValue($sql);
        return self::$fields_by_name[$key] = new DynamicField($id_field, $id_lang);
    }

    /**
     * @param $id_product
     * @param $id_lang
     * @return DynamicField[]
     */
    public static function getFieldsByIdProduct($id_product, $id_lang = null)
    {
        $dynamic_fields = array();
        $sql = 'SELECT `id_field`, `type`, `position`, false as linked 
        FROM `' . _DB_PREFIX_ . 'dynamicproduct_field`
        WHERE id_product = ' . (int)$id_product . ' 
        UNION
        (SELECT cf.`id_field`, f.`type`, cf.`position`, true as linked 
        FROM `' . _DB_PREFIX_ . 'dynamicproduct_common_field` cf
        JOIN `' . _DB_PREFIX_ . 'dynamicproduct_field` f
        ON f.`id_field` = cf.`id_field`
        WHERE cf.`id_product` = ' . (int)$id_product . ')
        ORDER BY `position`';
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_field = $row['id_field'];
            $dynamic_field = DynamicFieldFactory::create((int)$row['type'], $id_field, $id_lang);
            $dynamic_field->linked = $row['linked'];
            $dynamic_fields[$id_field] = $dynamic_field;
        }
        return $dynamic_fields;
    }

    public static function getGroupedFields($id_product, $id_lang)
    {
        $module = DynamicTools::getModule();

        $grouped = array();

        $group_helper = new FieldGroupHelper($module, Context::getContext());

        /** @var DynamicFieldGroup[] $groups */
        $groups = DynamicFieldGroup::getAll($id_lang);

        /** @var DynamicProductFieldGroup[] $product_groups */
        $product_groups = DynamicProductFieldGroup::getByIdProduct($id_product, true);

        foreach ($product_groups as $product_group) {
            $grouped[$product_group->id] = array(
                'group' => $group_helper->getGroup($product_group->id_field_group, $groups),
                'fields' => array(),
            );
        }
        // add a default group for fields with no group
        $grouped[0] = array(
            'group' => $group_helper->getGroup(0, $groups),
            'fields' => array(),
        );

        $fields = self::getFieldsByIdProduct($id_product, $id_lang);
        foreach ($fields as $field) {
            $id_group = $field->id_group;
            if (!isset($grouped[$id_group])) {
                $grouped[0]['fields'][$field->id] = $field;
            } else {
                $grouped[$id_group]['fields'][$field->id] = $field;
            }
        }

        // clear empty groups
        foreach ($grouped as $id_field_group => $item) {
            if (!count($item['fields'])) {
                unset($grouped[$id_field_group]);
            }
        }

        return $grouped;
    }

    /**
     * @param $id_lang
     * @return DynamicField[]
     */
    public static function getFavoriteFields($id_lang)
    {
        $dynamic_fields = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('favorite = 1');
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_field = $row['id_field'];
            $dynamic_field = new DynamicField($id_field, $id_lang);
            if (Validate::isLoadedObject($dynamic_field)) {
                $dynamic_fields[$id_field] = $dynamic_field;
            }
        }
        return $dynamic_fields;
    }

    /**
     * @param $id_lang
     * @return DynamicField[]
     */
    public static function getCommonFields($id_lang)
    {
        $dynamic_fields = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('common = 1');
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_field = $row['id_field'];
            $dynamic_field = new DynamicField($id_field, $id_lang);
            if (Validate::isLoadedObject($dynamic_field)) {
                $dynamic_fields[$id_field] = $dynamic_field;
            }
        }
        return $dynamic_fields;
    }

    private function initSettings($id_lang)
    {
        $this->settings = $this->getSettings($id_lang);
    }

    /**
     * @return DynamicUnitValue
     */
    public function getSettings($id_lang = null)
    {
        return DynamicUnitValue::getUnitValue($this->id, $id_lang);
    }

    private function initOptions()
    {
        $this->options = $this->getOptions();
    }

    public function getInitialValue()
    {
        return $this->init;
    }

    public function getOptions()
    {
        return array();
    }

    /**
     * @param $id_field
     * @return DynamicUnitValue
     */
    public function getUnitValues()
    {
        return DynamicUnitValue::getUnitValuesByIdField($this->id);
    }

    /**
     * @return DynamicUnit
     */
    public function getUnit()
    {
        return DynamicUnit::getUnit($this->id_unit, $this->context->language->id);
    }

    public function getUnitName()
    {
        if (!$this->unit) {
            $this->unit = $this->getUnit();
        }
        return $this->unit->name;
    }

    public function getUnitSymbol()
    {
        if (!$this->unit) {
            $this->unit = $this->getUnit();
        }
        return $this->unit->symbol;
    }

    public function hasImage()
    {
        return $this->getPath('id');
    }

    public function getThumb()
    {
        return $this->getThumbPath('id');
    }

    public function getThumbUrl()
    {
        if ($path = $this->getThumbPath('id')) {
            return $this->getUrl() . basename($path);
        }
        return $this->getPixelUrl();
    }

    public function getImage()
    {
        return $this->getPath('id');
    }

    public function getImageUrl()
    {
        if ($path = $this->getPath('id')) {
            return $this->getUrl() . basename($path);
        }
        return $this->getPixelUrl();
    }

    public function copyImagesFrom($id_field)
    {
        $field = new DynamicField($id_field);

        $image = $field->getImage();
        if (is_file($image)) {
            $dest_image = $this->getPathForCreation('id');
            copy($image, $dest_image);
        }

        $thumb = $field->getThumb();
        if (is_file($thumb)) {
            $dest_thumb = $this->getThumbPathForCreation('id');
            copy($thumb, $dest_thumb);
        }
    }

    public function delete()
    {
        $path = $this->getPath('id');
        $thumb = $this->getThumbPath('id');
        if (is_file($path)) {
            unlink($path);
        }
        if (is_file($thumb)) {
            unlink($thumb);
        }

        $interval_fields = IntervalField::getByField($this->id);
        foreach ($interval_fields as $interval_field) {
            $interval_field->delete();
        }

        parent::delete();
    }

    public function getClearColor()
    {
        $color_helper = new ColorHelper($this->module, $this->context);
        return $color_helper->getClearColor($this->value);
    }

    public static function createDefaultField($id_product)
    {
        $dynamic_field = new DynamicField();
        $dynamic_field->id_product = $id_product;
        $dynamic_field->active = true;
        $dynamic_field->type = _DP_INPUT_;
        return $dynamic_field;
    }
}
