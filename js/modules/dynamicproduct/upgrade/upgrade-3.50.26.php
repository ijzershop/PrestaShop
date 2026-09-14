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
if (!defined('_PS_VERSION_')) {
    exit;
}
/**
 * @param DynamicProduct $module
 *
 * @return bool
 */
function upgrade_module_3_50_26($module)
{
    $thumbs = Db::getInstance()->executeS('
        SELECT id_thumbnails_option, preview, preview_width, preview_height
        FROM `' . _DB_PREFIX_ . 'dynamicproduct_thumbnails_option`
        WHERE preview IS NOT NULL AND preview_width IS NULL AND preview_height IS NULL    
    ');

    foreach ($thumbs as $thumb) {
        $preview = $thumb['preview'];
        if (!$preview) {
            continue;
        }

        if ($thumb['preview_width'] && $thumb['preview_height']) {
            continue;
        }

        $preview_path = $module->provider->getDataDir('images/thumbnails') . $preview;
        if (!file_exists($preview_path)) {
            continue;
        }

        list($width, $height) = getimagesize($preview_path);
        if (!$width || !$height) {
            continue;
        }

        Db::getInstance()->update(
            'dynamicproduct_thumbnails_option',
            [
                'preview_width' => $width,
                'preview_height' => $height,
            ],
            'id_thumbnails_option = ' . (int) $thumb['id_thumbnails_option']
        );
    }

    $options = Db::getInstance()->executeS('
        SELECT id_dropdown_option, preview, preview_width, preview_height
        FROM `' . _DB_PREFIX_ . 'dynamicproduct_dropdown_option`
        WHERE preview IS NOT NULL AND preview_width IS NULL AND preview_height IS NULL
    ');

    foreach ($options as $option) {
        $preview = $option['preview'];
        if (!$preview) {
            continue;
        }

        if ($option['preview_width'] && $option['preview_height']) {
            continue;
        }

        $preview_path = $module->provider->getDataDir('images/dropdown') . $preview;
        if (!file_exists($preview_path)) {
            continue;
        }

        list($width, $height) = getimagesize($preview_path);
        if (!$width || !$height) {
            continue;
        }

        Db::getInstance()->update(
            'dynamicproduct_dropdown_option',
            [
                'preview_width' => $width,
                'preview_height' => $height,
            ],
            'id_dropdown_option = ' . (int) $option['id_dropdown_option']
        );
    }

    $options = Db::getInstance()->executeS('
        SELECT id_preview_option, preview, preview_width, preview_height
        FROM `' . _DB_PREFIX_ . 'dynamicproduct_preview_option`
        WHERE preview IS NOT NULL AND preview_width IS NULL AND preview_height IS NULL
    ');

    foreach ($options as $option) {
        $preview = $option['preview'];
        if (!$preview) {
            continue;
        }

        if ($option['preview_width'] && $option['preview_height']) {
            continue;
        }

        $preview_path = $module->provider->getDataDir('images/preview') . $preview;
        if (!file_exists($preview_path)) {
            continue;
        }

        list($width, $height) = getimagesize($preview_path);
        if (!$width || !$height) {
            continue;
        }

        Db::getInstance()->update(
            'dynamicproduct_preview_option',
            [
                'preview_width' => $width,
                'preview_height' => $height,
            ],
            'id_preview_option = ' . (int) $option['id_preview_option']
        );
    }

    return true;
}
