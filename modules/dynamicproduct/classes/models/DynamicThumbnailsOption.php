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
 * @author    Tuni-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\models;

use Db;
use DbQuery;
use ImageManager;
use Validate;

class DynamicThumbnailsOption extends DynamicObject
{
    public $dir = 'images/thumbnails';

    public $id_field;
    public $value;
    public $is_default;
    public $position;
    public $color;
    public $label;

    public $image;
    public $image_full;
    public $has_image;
    public $has_color;

    public static $definition = array(
        'table'      => 'dynamicproduct_thumbnails_option',
        'primary'    => 'id_thumbnails_option',
        'group_by'   => 'id_field',
        'complement' => 'is_default',
        'multilang'  => true,
        'fields'     => array(
            'id_field'   => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'value'      => array('type' => self::TYPE_FLOAT, 'validate' => 'isFloat'),
            'color'      => array('type' => self::TYPE_STRING),
            'is_default' => array('type' => self::TYPE_INT),
            'position'   => array('type' => self::TYPE_INT),
            /* Lang fields */
            'label'      => array(
                'type'     => self::TYPE_STRING,
                'lang'     => true,
                'required' => false,
                'validate' => 'isGenericName',
                'size'     => 200
            )
        )
    );

    /**
     * @param $id_field
     * @param $id_lang
     * @return DynamicThumbnailsOption[]
     */
    public static function getThumbnailsOptionsByIdField($id_field, $id_lang = null)
    {
        $thumbnails_options = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->select('id_thumbnails_option');
        $sql->where('id_field = ' . (int)$id_field);
        $sql->orderBy('`position` ASC');
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_thumbnails_option = (int)$row['id_thumbnails_option'];
            $thumbnails_option = new self($id_thumbnails_option, $id_lang);
            if (Validate::isLoadedObject($thumbnails_option)) {
                $thumbnails_options[$id_thumbnails_option] = $thumbnails_option;
            }
        }
        return $thumbnails_options;
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
        $path = $this->getThumbPath('id');
        if (!$path) {
            $image_path = $this->getPath('id');
            ImageManager::resize($image_path, $this->getDir() . $this->id . '-thumb.jpg', _DP_THUMB_, _DP_THUMB_);
            $path = $this->getThumbPath('id');
        }
        return $this->getUrl() . basename($path);
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

    public function copyImagesFrom($id_thumnails_option)
    {
        $thumnails_option = new self($id_thumnails_option);

        $image = $thumnails_option->getImage();
        if (is_file($image)) {
            $dest_image = $this->getPathForCreation('id');
            copy($image, $dest_image);
        }

        $thumb = $thumnails_option->getThumb();
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
        parent::delete();
    }
}
