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
namespace DynamicProduct\classes\helpers;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;
use DynamicProduct\libs\TextMeasure\TextMeasure;

class FontHelper
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    public function getFontPreviewPath($font_path, $text, $font_color)
    {
        if (!$font_path || !is_file($font_path)) {
            return false;
        }
        $font_size = 40;

        $font_preview_cache = $this->getCachedPreviewPath($font_path, $text, $font_color);

        if (is_file($font_preview_cache)) {
            return $font_preview_cache;
        }

        $text_measure = new TextMeasure($text, $font_path, $font_size);
        $measure = $text_measure->measureText();

        if ($measure) {
            $text_renderer = new TextRenderer($this->module, DynamicTools::getContext());
            $gd_image = $text_renderer->renderText($text, $font_path, $font_size, $font_color, $measure);

            $text_renderer->saveImage($gd_image, $font_preview_cache);

            return $font_preview_cache;
        }

        return $font_preview_cache;
    }

    private function getCachedPreviewPath($font_path, $text, $font_color)
    {
        $cache_dir = $this->module->provider->getDataDir('cache');

        $mtime = 'null';
        if (is_file($font_path)) {
            $mtime = filemtime($font_path);
        }

        return $cache_dir .
          'font-' . $mtime . md5($text) . md5($font_color) . '.png';
    }
}
