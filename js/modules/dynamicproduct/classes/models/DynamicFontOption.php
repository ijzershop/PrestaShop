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
use DynamicProduct\classes\helpers\FontHelper;
use DynamicProduct\classes\helpers\ModelHelper;

class DynamicFontOption extends DynamicObject
{
    public $dir = 'images/fonts';

    public $id_field;
    public $value;
    public $secondary_value;
    public $sku;
    public $is_default;
    public $position;
    public $label;

    public $deleted = 0;
    public $active = 1;

    public $font;
    public $font_url;
    public $font_thumb_url;

    public $preview;
    public $preview_width;
    public $preview_height;
    public $preview_url;
    public $preview_thumb_url;

    public $displayed_value;

    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'dynamicproduct_font_option',
        'primary' => 'id_font_option',
        'group_by' => 'id_field',
        'complement' => 'is_default',
        'multilang' => true,
        'fields' => [
            'id_field' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'value' => ['type' => self::TYPE_STRING],
            'secondary_value' => ['type' => self::TYPE_STRING],
            'sku' => ['type' => self::TYPE_STRING],
            'font' => ['type' => self::TYPE_STRING],
            'preview' => ['type' => self::TYPE_STRING],
            'preview_width' => ['type' => self::TYPE_INT],
            'preview_height' => ['type' => self::TYPE_INT],
            'is_default' => ['type' => self::TYPE_INT],
            'position' => ['type' => self::TYPE_INT],
            'deleted' => ['type' => self::TYPE_INT],
            'active' => ['type' => self::TYPE_INT],
            /* Lang fields */
            'label' => [
                'type' => self::TYPE_STRING,
                'lang' => true,
                'required' => false,
                'validate' => 'isGenericName',
                'size' => 200,
            ],
            'date_add' => ['type' => self::TYPE_DATE],
            'date_upd' => ['type' => self::TYPE_DATE],
        ],
    ];

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->initFont();
        $this->initPreview();
    }

    /**
     * @param $id_field
     * @param $id_lang
     *
     * @return DynamicFontOption[]
     */
    public static function getFontOptionsByIdField($id_field, $id_lang = null)
    {
        $module = DynamicTools::getModule();

        $rows = \Db::getInstance()->executeS('
            SELECT *, o.id_font_option as id FROM `' . _DB_PREFIX_ . 'dynamicproduct_font_option` o
            LEFT JOIN `' . _DB_PREFIX_ . 'dynamicproduct_font_option_lang` ol 
            ON (o.`id_font_option` = ol.`id_font_option`)
            WHERE `id_field` = ' . (int) $id_field . ' 
            AND `deleted` = 0 ' . ($id_lang ? 'AND `id_lang` = ' . (int) $id_lang : '') . '
            ORDER BY `position` ASC
        ');

        $id_default_lang = \Configuration::get('PS_LANG_DEFAULT');
        $options = ModelHelper::groupByLang($rows, ['label']);
        $options = ModelHelper::pickLang($options, $id_lang, $id_default_lang, ['label']);
        $options = ModelHelper::castNumericValues($options, self::class);

        $base_url = $module->provider->getDataDirUrl('images/fonts');
        foreach ($options as &$option) {
            if (!empty($option['font'])) {
                // TODO: generate font thumb
                $option['font_url'] = $base_url . $option['font'];
                $base_path = $module->provider->getDataDir('images/fonts');
                $preview_path = self::getFontPreview(
                    $base_path . $option['font'],
                    $option['label'][$id_default_lang] ?? 'Preview',
                    '#24b9d7'
                );
                $cache_url = $module->provider->getDataDirUrl('cache');
                $option['font_thumb_url'] = $preview_path ? $cache_url . basename($preview_path) : null;
            }
            if (!empty($option['preview'])) {
                $option['preview_url'] = $base_url . $option['preview'];
                $option['preview_thumb_url'] = $base_url . $option['id'] . '-preview-thumb.jpg';
            }
        }

        return $options;
    }

    private function initFont()
    {
        if ($this->hasFont()) {
            $this->font_url = $this->getFontUrl();
            $this->font_thumb_url = $this->getFontThumbUrl();
        }
    }

    public function hasFont()
    {
        return $this->getPath('font');
    }

    public static function getFontPreview($font_path, $text, $font_color)
    {
        $font_helper = new FontHelper(DynamicTools::getModule(), DynamicTools::getContext());
        $preview_path = $font_helper->getFontPreviewPath($font_path, $text, $font_color);
        if (is_file($preview_path)) {
            return $preview_path;
        }

        return null;
    }

    public function getFont()
    {
        return $this->getPath('font');
    }

    public function getFontUrl()
    {
        if ($path = $this->getPath('font')) {
            return $this->getUrl() . basename($path);
        }

        return $this->getPixelUrl();
    }

    public function getFontThumbUrl()
    {
        return $this->getPixelUrl();
    }

    private function initPreview()
    {
        if ($this->hasPreview()) {
            $this->preview_url = $this->getPreviewUrl();
            $this->preview_thumb_url = $this->getPreviewThumbUrl();
        }
    }

    public function getPreview()
    {
        return $this->getDir() . $this->preview;
    }

    public function hasPreview()
    {
        return $this->preview && is_file($this->getPreview());
    }

    public function getPreviewThumb()
    {
        return $this->getDir() . $this->id . '-preview-thumb.jpg';
    }

    public function getPreviewUrl()
    {
        return $this->getUrl() . $this->preview;
    }

    public function getPreviewThumbUrl()
    {
        return $this->getUrl() . $this->id . '-preview-thumb.jpg';
    }

    public function copyImagesFrom($id_option)
    {
        $thumbnails_option = new self($id_option);

        $font = $thumbnails_option->getFont();
        if (is_file($font)) {
            $extention = pathinfo($font, PATHINFO_EXTENSION);
            $this->font = $this->id . '.' . $extention;
            $dest_font = $this->getPathForCreation('font');
            copy($font, $dest_font);
        }

        $image = $thumbnails_option->getPreview();
        if (is_file($image)) {
            $extention = pathinfo($image, PATHINFO_EXTENSION);
            $this->preview = $this->id . '-preview.' . $extention;
            $dest_image = $this->getPreview();
            copy($image, $dest_image);
        }

        $thumb = $thumbnails_option->getPreviewThumb();
        if (is_file($thumb)) {
            $dest_thumb = $this->getPreviewThumb();
            copy($thumb, $dest_thumb);
        }

        return $this->save();
    }

    public function delete()
    {
        $path = $this->getPath('font');
        $thumb = $this->getThumbPath('font');
        if (is_file($path)) {
            unlink($path);
        }
        if (is_file($thumb)) {
            unlink($thumb);
        }

        $this->deleted = true;

        return $this->save();
    }
}
