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
namespace DynamicProduct;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\factory\DynamicFieldFactory;
use DynamicProduct\classes\models\DynamicDropdownOption;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicFontOption;
use DynamicProduct\classes\models\DynamicPreviewOption;
use DynamicProduct\classes\models\DynamicRadioOption;
use DynamicProduct\classes\models\DynamicThumbnailsOption;
use Eventviva\ImageResize;

function load(\DynamicProduct $module)
{
    $id_field = (int) \Tools::getValue('id_field');
    $dynamic_field = DynamicFieldFactory::create(null, $id_field);

    return [
        'field' => $dynamic_field->getObjectValues(),
        'options' => $dynamic_field->getOptions(),
    ];
}

/**
 * @param $type
 *
 * @return DynamicDropdownOption
 */
function getClass($type)
{
    /** @var DynamicDropdownOption[] $classes */
    $classes = [
        _DP_DROPDOWN_ => DynamicDropdownOption::class,
        _DP_RADIO_ => DynamicRadioOption::class,
        _DP_THUMBNAILS_ => DynamicThumbnailsOption::class,
        _DP_PREVIEW_ => DynamicPreviewOption::class,
        _DP_FONT_ => DynamicFontOption::class,
    ];

    return $classes[$type];
}

function getImageFolder($type)
{
    $image_folders = [
        _DP_DROPDOWN_ => 'dropdown',
        _DP_THUMBNAILS_ => 'thumbnails',
        _DP_RADIO_ => 'radio',
        _DP_PREVIEW_ => 'preview',
        _DP_FONT_ => 'fonts',
    ];

    return $image_folders[$type];
}

class Actions
{
    public static $module;
    public static $context;

    public static function update()
    {
        $id_field = (int) \Tools::getValue('id_field');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        $dynamic_field = new DynamicField($id_field);

        $cls = getClass($dynamic_field->type);

        $options = \Tools::getValue('options');

        if (is_array($options)) {
            foreach ($options as $option) {
                $dynamic_option = new $cls($option['id']);
                $cls::copyFromArray($option, $dynamic_option, false);
                $dynamic_option->save();
            }
        }

        if ($action_name === 'add') {
            $dynamic_option = new $cls();
            $dynamic_option->id_field = $id_field;
            $dynamic_option->position = $cls::getHighestPosition($dynamic_option) + 1;
            $dynamic_option->active = true;
            $dynamic_option->save();
        }

        if ($action_name === 'toggle') {
            $id_option = $action_value;
            $dynamic_option = new $cls($id_option);
            $dynamic_option->active = !$dynamic_option->active;
            $dynamic_option->save();
        }

        if ($action_name === 'toggle-default') {
            $id_option = $action_value;
            $dynamic_option = new $cls($id_option);
            $dynamic_option->is_default = !$dynamic_option->is_default;
            $dynamic_option->save();

            if ($dynamic_option->is_default) {
                /**
                 * @var string $table
                 *
                 * @noinspection PhpUndefinedVariableInspection
                 */
                $table = $cls::$definition['table'];
                $primary = $cls::$definition['primary'];
                \Db::getInstance()->update($table, ['is_default' => 0], 'id_field = ' . (int) $id_field . ' AND ' . bqSQL($primary) . ' != ' . (int) $id_option);
            }
        }

        if ($action_name === 'delete') {
            $id_option = $action_value;
            $dynamic_option = new $cls($id_option);
            $dynamic_option->delete();
        }

        if ($action_name === 'delete-image') {
            $id_option = $action_value;
            $dynamic_option = new $cls($id_option);

            $path = $dynamic_option->getImage();
            $thumb = $dynamic_option->getThumb();

            if (is_file($path)) {
                unlink($path);
            }
            if (is_file($thumb)) {
                unlink($thumb);
            }

            $dynamic_option->image = null;
            $dynamic_option->image_width = null;
            $dynamic_option->image_height = null;
            $dynamic_option->save();
        }

        if ($action_name === 'delete-preview') {
            $id_option = $action_value;
            $dynamic_option = new $cls($id_option);

            $path = $dynamic_option->getPreview();
            $thumb = $dynamic_option->getPreviewThumb();

            if (is_file($path)) {
                unlink($path);
            }
            if (is_file($thumb)) {
                unlink($thumb);
            }

            $dynamic_option->preview = null;
            $dynamic_option->save();
        }

        if ($action_name === 'delete-font') {
            $id_option = $action_value;
            /** @var DynamicFontOption $dynamic_option */
            $dynamic_option = new $cls($id_option);

            $path = $dynamic_option->getFont();

            if (is_file($path)) {
                unlink($path);
            }

            $dynamic_option->font = null;
            $dynamic_option->save();
        }

        if ($action_name === 'delete-options') {
            $checked = (array) \Tools::getValue('checked');

            foreach ($checked as $id_option => $is_checked) {
                if (!$is_checked) {
                    continue;
                }

                $dynamic_option = new $cls($id_option);
                $dynamic_option->delete();
            }
        }

        if ($action_name === 'import-images') {
            $image_folder = getImageFolder($dynamic_field->type);
            $img_dir = self::$module->provider->getDataDir('images/' . $image_folder);

            $languages = \Language::getLanguages();

            $uploader = new \Uploader();
            $uploader->setName('files');
            $uploader->setAcceptTypes(['jpeg', 'webp', 'png', 'jpg']);
            $files = $uploader->process();

            foreach ($files as $file) {
                if ($file['error'] === 0) {
                    $path = $file['save_path'];
                    $extension = pathinfo($path, PATHINFO_EXTENSION);

                    $class_name = getClass($dynamic_field->type);
                    $option = new $class_name();
                    $option->value = $option instanceof DynamicPreviewOption ? basename($path, '.' . $extension) : 0;
                    $option->id_field = $id_field;
                    $option->position = $class_name::getHighestPosition($option);
                    $option->save();

                    foreach ($languages as $language) {
                        $option->label[$language['id_lang']] = DynamicTools::capitalizeFilename(basename($path));
                    }

                    list($width, $height) = getimagesize($path);
                    $filename = $option->id . '.' . $extension;
                    \ImageManager::resize($path, $img_dir . $filename);
                    $option->image = $filename;
                    $option->image_width = $width;
                    $option->image_height = $height;
                    $option->save();

                    $image = new ImageResize($path);
                    $image->resizeToHeight(_DP_THUMB_);
                    $image->save($img_dir . $option->id . '-thumb.jpg', null, 100);
                }
            }
        }

        if ($action_name === 'update-image') {
            $id_option = (int) \Tools::getValue('id_option');
            $image_folder = getImageFolder($dynamic_field->type);
            $img_dir = self::$module->provider->getDataDir('images/' . $image_folder);

            $uploader = new \Uploader();
            $uploader->setName('file');
            $uploader->setAcceptTypes(['jpeg', 'webp', 'png', 'jpg']);
            $file = $uploader->process();
            $upload = $file[0];

            if ($upload['error']) {
                return [
                    'error' => true,
                    'message' => $upload['error'],
                ];
            }

            $save_path = $upload['save_path'];
            $extension = pathinfo($save_path, PATHINFO_EXTENSION);

            $filename = $id_option . '.' . $extension;
            \ImageManager::resize($save_path, $img_dir . $filename);

            list($width, $height) = getimagesize($save_path);
            $class_name = getClass($dynamic_field->type);

            $option = new $class_name($id_option);
            $option->image = $filename;
            $option->image_width = $width;
            $option->image_height = $height;
            $option->save();

            $image = new ImageResize($save_path);
            $image->resizeToHeight(_DP_THUMB_);
            $image->save($img_dir . $id_option . '-thumb.jpg', null, 100);
        }

        if ($action_name === 'update-preview') {
            $id_option = (int) \Tools::getValue('id_option');
            $image_folder = getImageFolder($dynamic_field->type);
            $img_dir = self::$module->provider->getDataDir('images/' . $image_folder);

            $uploader = new \Uploader();
            $uploader->setName('file');
            $uploader->setAcceptTypes(['jpeg', 'webp', 'png', 'jpg']);
            $file = $uploader->process();
            $upload = $file[0];

            if ($upload['error']) {
                return [
                    'error' => true,
                    'message' => $upload['error'],
                ];
            }

            $save_path = $upload['save_path'];
            $extension = pathinfo($save_path, PATHINFO_EXTENSION);

            $filename = $id_option . '-preview.' . $extension;
            \ImageManager::resize($save_path, $img_dir . $filename);

            list($width, $height) = getimagesize($save_path);
            $class_name = getClass($dynamic_field->type);

            $option = new $class_name($id_option);
            $option->preview = $filename;
            $option->preview_width = $width;
            $option->preview_height = $height;
            $option->save();

            $image = new ImageResize($save_path);
            $image->resizeToHeight(_DP_THUMB_);
            $image->save($img_dir . $id_option . '-preview-thumb.jpg', null, 100);
        }

        if ($action_name === 'import-fonts') {
            $image_folder = getImageFolder($dynamic_field->type);
            $img_dir = self::$module->provider->getDataDir('images/' . $image_folder);

            $languages = \Language::getLanguages();

            $uploader = new \Uploader();
            $uploader->setName('files');
            $uploader->setAcceptTypes(['ttf']);
            $files = $uploader->process();

            foreach ($files as $file) {
                if ($file['error'] === 0) {
                    $path = $file['save_path'];
                    $extension = pathinfo($path, PATHINFO_EXTENSION);

                    $class_name = getClass($dynamic_field->type);
                    /** @var DynamicFontOption $option */
                    $option = new $class_name();
                    $option->value = 0;
                    $option->id_field = $id_field;
                    $option->position = $class_name::getHighestPosition($option);
                    $option->save();

                    foreach ($languages as $language) {
                        $option->label[$language['id_lang']] = DynamicTools::capitalizeFilename(basename($path));
                    }

                    $filename = $option->id . '.' . $extension;
                    copy($path, $img_dir . $filename);
                    $option->font = $filename;
                    $option->save();
                }
            }
        }

        if ($action_name === 'update-font') {
            $id_option = (int) \Tools::getValue('id_option');
            $image_folder = getImageFolder($dynamic_field->type);
            $img_dir = self::$module->provider->getDataDir('images/' . $image_folder);

            $uploader = new \Uploader();
            $uploader->setName('file');
            $uploader->setAcceptTypes(['ttf']);
            $file = $uploader->process();
            $upload = $file[0];

            if ($upload['error']) {
                return [
                    'error' => true,
                    'message' => $upload['error'],
                ];
            }

            $save_path = $upload['save_path'];
            $extension = pathinfo($save_path, PATHINFO_EXTENSION);

            $filename = $id_option . '.' . $extension;
            copy($save_path, $img_dir . $filename);

            $class_name = getClass($dynamic_field->type);

            /** @var DynamicFontOption $option */
            $option = new $class_name($id_option);
            $option->font = $filename;
            $option->save();
        }

        $dynamic_field = DynamicFieldFactory::create(null, $id_field);

        return [
            'options' => $dynamic_field->getOptions(),
        ];
    }

    public static function sort()
    {
        $id_field = (int) \Tools::getValue('id_field');
        $order = \Tools::getValue('order');

        $dynamic_field = new DynamicField($id_field);

        /** @var DynamicDropdownOption|DynamicRadioOption|DynamicThumbnailsOption|DynamicPreviewOption $cls */
        $cls = getClass($dynamic_field->type);

        $position = 0;
        foreach ($order as $id_option) {
            $dynamic_option = new $cls($id_option);
            $dynamic_option->position = $position++;
            $dynamic_option->save();
        }

        $dynamic_field = DynamicFieldFactory::create(null, $id_field);

        return [
            'options' => $dynamic_field->getOptions(),
        ];
    }
}
