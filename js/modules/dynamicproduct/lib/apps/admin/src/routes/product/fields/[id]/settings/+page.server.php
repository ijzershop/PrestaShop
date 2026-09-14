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

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicUnit;

function load(\DynamicProduct $module)
{
    $id_field = (int) \Tools::getValue('id_field');
    $dynamic_field = new DynamicField($id_field);
    $id_lang = DynamicContext::getLanguageId();

    return [
        'field' => $dynamic_field->getObjectValues(),
        'field_types' => array_values($module->field_types),
        'units' => array_values(DynamicUnit::getAll($id_lang)),
    ];
}

class Actions
{
    public static $module;

    public static function update()
    {
        $id_field = (int) \Tools::getValue('id_field');
        $settings = \Tools::getValue('settings');

        $field = new DynamicField($id_field);
        $field->settings->copyFromArray($settings);

        foreach ($field->settings->short_description as &$item) {
            if ($item === '<p></p>') {
                $item = '';
            }
        }

        foreach ($field->settings->description as &$item) {
            if ($item === '<p></p>') {
                $item = '';
            }
        }

        $field->save();

        return [
            'settings' => $field->getSettings(),
        ];
    }

    public static function upload_image()
    {
        $img_dir = self::$module->provider->getDataDir('images/field/');

        $uploader = new \Uploader();
        $uploader->setName('files');
        $uploader->setAcceptTypes(['jpeg', 'webp', 'png', 'jpg']);

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
        $extention = pathinfo($save_path, PATHINFO_EXTENSION);
        list($width, $height) = getimagesize($save_path);
        $filename = 'cms-' . uniqid() . '.' . $extention;
        $new_path = $img_dir . $filename;
        copy($save_path, $new_path);
        $src = DynamicContext::getShopBaseUri() . 'dynamicproduct/images/field/' . $filename;

        return [
            'src' => $src,
            'width' => $width,
            'height' => $height,
        ];
    }
}
