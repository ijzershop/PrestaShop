<?php
/**
 * 2010-2021 Tuni-Soft
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
 * @copyright 2010-2021 Tuni-Soft
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
    public $secondary_value;
    public $is_default;
    public $position;
    public $color;
    public $label;

    public $deleted = 0;

    public $image_url;
    public $thumb_url;

    public $displayed_price;

    public static $definition = array(
        'table'      => 'dynamicproduct_thumbnails_option',
        'primary'    => 'id_thumbnails_option',
        'group_by'   => 'id_field',
        'complement' => 'is_default',
        'multilang'  => true,
        'fields'     => array(
            'id_field'        => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'value'           => array('type' => self::TYPE_STRING),
            'secondary_value' => array('type' => self::TYPE_STRING),
            'color'           => array('type' => self::TYPE_STRING),
            'is_default'      => array('type' => self::TYPE_INT),
            'position'        => array('type' => self::TYPE_INT),
            'deleted'         => array('type' => self::TYPE_INT),
            /* Lang fields */
            'label'           => array(
                'type'     => self::TYPE_STRING,
                'lang'     => true,
                'required' => false,
                'validate' => 'isGenericName',
                'size'     => 200
            )
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->initImage();
    }

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
        $sql->where('!deleted');
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

    private function initImage()
    {
        if ($this->hasImage()) {
            $this->image_url = $this->getImageUrl();
            $this->thumb_url = $this->getThumbUrl();
        }
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
            if ($image_path) {
                ImageManager::resize($image_path, $this->getDir() . $this->id . '-thumb.jpg', _DP_THUMB_, _DP_THUMB_);
                $path = $this->getThumbPath('id');
            }
        }
        if ($path) {
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

        // parent::delete();
        $this->deleted = true;
        $this->save();
    }
}
