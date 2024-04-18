<?php
/**
 * 2007-2024 TuniSoft
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
 * @copyright 2007-2024 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\models;

if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\helpers\ModelHelper;

class DynamicRadioOption extends DynamicObject
{
    public $dir = 'images/radio';
    public $id_field;

    public $value;
    public $secondary_value;
    public $sku;
    public $is_default;
    public $position;
    public $color;
    public $label;

    public $deleted = 0;
    public $active = 1;

    public $image;

    public $preview;
    public $preview_url;
    public $preview_thumb_url;

    private static $radio_options;

    public $displayed_value;

    public $date_add;
    public $date_upd;

    public static $definition = [
        'table' => 'dynamicproduct_radio_option',
        'primary' => 'id_radio_option',
        'group_by' => 'id_field',
        'complement' => 'is_default',
        'multilang' => true,
        'fields' => [
            'id_field' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'value' => ['type' => self::TYPE_STRING],
            'secondary_value' => ['type' => self::TYPE_STRING],
            'sku' => ['type' => self::TYPE_STRING],
            'color' => ['type' => self::TYPE_STRING],
            'preview' => ['type' => self::TYPE_STRING],
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
        $this->initPreview();
    }

    /**
     * @param $id_field
     * @param $id_lang
     *
     * @return DynamicRadioOption[]
     */
    public static function getRadioOptionsByIdField($id_field, $id_lang = null)
    {
        $module = DynamicTools::getModule();

        $rows = \Db::getInstance()->executeS('
            SELECT *, o.id_radio_option as id FROM `' . _DB_PREFIX_ . 'dynamicproduct_radio_option` o
            LEFT JOIN `' . _DB_PREFIX_ . 'dynamicproduct_radio_option_lang` ol 
            ON (o.`id_radio_option` = ol.`id_radio_option`)
            WHERE `id_field` = ' . (int) $id_field . ' 
            AND `deleted` = 0 ' . ($id_lang ? 'AND `id_lang` = ' . (int) $id_lang : '') . '
            ORDER BY `position` ASC
        ');

        $options = ModelHelper::groupByLang($rows, $id_lang, ['label']);

        $options = ModelHelper::castNumericValues($options, self::class);

        $base_url = $module->provider->getDataDirUrl('images/radio');
        foreach ($options as &$option) {
            if ($option['preview']) {
                $option['preview_url'] = $base_url . $option['preview'];
                $option['preview_thumb_url'] = $base_url . $option['id'] . '-preview-thumb.jpg';
            }
        }

        return $options;
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

    public function copyImagesFrom($id_radio_option)
    {
        $radio_option = new self($id_radio_option);

        $image = $radio_option->getImage();
        if (is_file($image)) {
            $extension = pathinfo($image, PATHINFO_EXTENSION);
            $this->image = $this->id . '.' . $extension;
            $dest_image = $this->getPathForCreation('id');
            copy($image, $dest_image);
        }

        $thumb = $radio_option->getThumb();
        if (is_file($thumb)) {
            $dest_thumb = $this->getThumbPathForCreation('id');
            copy($thumb, $dest_thumb);
        }

        $image = $radio_option->getPreview();
        if (is_file($image)) {
            $extension = pathinfo($image, PATHINFO_EXTENSION);
            $this->preview = $this->id . '.' . $extension;
            $dest_image = $this->getPreview();
            copy($image, $dest_image);
        }

        $thumb = $radio_option->getPreviewThumb();
        if (is_file($thumb)) {
            $dest_thumb = $this->getPreviewThumb();
            copy($thumb, $dest_thumb);
        }

        $this->save();
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

        $this->deleted = true;
        $this->save();
    }
}
