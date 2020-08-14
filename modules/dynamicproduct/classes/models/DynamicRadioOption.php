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
use Validate;

class DynamicRadioOption extends DynamicObject
{
    public $dir = 'radio';
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

    private static $radio_options;

    public static $definition = array(
        'table'      => 'dynamicproduct_radio_option',
        'primary'    => 'id_radio_option',
        'group_by'   => 'id_field',
        'complement' => 'is_default',
        'multilang'  => true,
        'fields'     => array(
            'id_field'   => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'value'      => array('type' => self::TYPE_STRING),
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
     * @return DynamicRadioOption[]
     */
    public static function getRadioOptionsByIdField($id_field, $id_lang = null)
    {
        $radio_options = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->select('id_radio_option');
        $sql->where('id_field = ' . (int)$id_field);
        $sql->orderBy('`position` ASC');
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_radio_option = (int)$row['id_radio_option'];
            $radio_option = new self($id_radio_option, $id_lang);
            if (Validate::isLoadedObject($radio_option)) {
                $radio_options[$id_radio_option] = $radio_option;
            }
        }
        return $radio_options;
    }

    public static function getRadioOption($id_radio_option, $id_lang)
    {
        $key = $id_radio_option . '_' . $id_lang;
        if (isset(self::$radio_options[$key])) {
            return self::$radio_options[$key];
        }
        return self::$radio_options[$key] = new self($id_radio_option, $id_lang);
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

    public function copyImagesFrom($id_radio_option)
    {
        $radio_option = new self($id_radio_option);

        $image = $radio_option->getImage();
        if (is_file($image)) {
            $dest_image = $this->getPathForCreation('id');
            copy($image, $dest_image);
        }

        $thumb = $radio_option->getThumb();
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
