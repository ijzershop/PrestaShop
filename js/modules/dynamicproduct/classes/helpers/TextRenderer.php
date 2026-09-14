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

class TextRenderer
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * @param $text
     * @param $font_path
     * @param $font_size
     * @param $measure
     *
     * @return resource
     */
    public function renderText($text, $font_path, $font_size, $font_color, $measure)
    {
        $gd_image = imagecreatetruecolor($measure['width'], $measure['height']);
        $transparent = imagecolorallocatealpha($gd_image, 0, 0, 0, 127);
        imagefill($gd_image, 0, 0, $transparent);
        imagesavealpha($gd_image, true);
        $color = $this->getGDColor($gd_image, $font_color);
        imagettftext($gd_image, $font_size, 0, $measure['x'], $measure['y'], $color, $font_path, $text);

        return $gd_image;
    }

    public function getGDColor($gd_image, $color)
    {
        if (\Tools::strlen($color) === 4) {
            $color = $this->getFullHexColor($color);
        }
        list($red, $green, $blue) = sscanf($color, '#%02x%02x%02x');

        return imagecolorallocate($gd_image, $red, $green, $blue);
    }

    private function getFullHexColor($color)
    {
        return '#' . $color[1] . $color[1] . $color[2] . $color[2] . $color[3] . $color[3];
    }

    /**
     * @param resource $gd_image
     * @param $path
     *
     * @return bool
     */
    public function saveImage($gd_image, $path)
    {
        return imagepng($gd_image, $path, 9);
    }
}
