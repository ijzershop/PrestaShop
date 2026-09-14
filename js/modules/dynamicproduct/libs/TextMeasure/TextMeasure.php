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
namespace DynamicProduct\libs\TextMeasure;
if (!defined('_PS_VERSION_')) {
    exit;
}

class TextMeasure
{
    private $text;
    private $font_path;
    private $size;

    public function __construct($text, $font_path, $size)
    {
        $this->text = $text;
        $this->font_path = $font_path;
        $this->size = $size;
    }

    /**
     * Get a precise text measurement by checking lines containing red text pixels
     *
     * @return array
     */
    public function measureText()
    {
        try {
            $box = @imagettfbbox($this->size, 0, $this->font_path, $this->text);
        } catch (\Exception $e) {
            return null;
        }

        if (!$box) {
            return null;
        }

        $min_x = min([$box[0], $box[2], $box[4], $box[6]]);
        $max_x = max([$box[0], $box[2], $box[4], $box[6]]);
        $min_y = min([$box[1], $box[3], $box[5], $box[7]]);
        $max_y = max([$box[1], $box[3], $box[5], $box[7]]);

        $measure = [
            'x' => abs($min_x),
            'y' => abs($min_y),
            'width' => $max_x - $min_x,
            'height' => $max_y - $min_y,
        ];

        // create image & draw text
        $gd_image = $this->drawText($measure, $this->text, $this->size, $this->font_path);

        // check top edge for non black pixels
        $dirty_line = true;
        while ($dirty_line) {
            $black_line = true;
            $y = 1;
            for ($x = 0; $x < $measure['width']; ++$x) {
                // check if first horizontal line is empty
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }
            if ($black_line) {
                $dirty_line = false;
                break;
            } else {
                ++$measure['y'];
                ++$measure['height'];
                imagedestroy($gd_image);
                $gd_image = $this->drawText($measure, $this->text, $this->size, $this->font_path);
            }
        }

        // check bottom edge for non black pixels
        $dirty_line = true;
        while ($dirty_line) {
            $black_line = true;
            $y = $measure['height'] - 1;
            for ($x = 0; $x < $measure['width']; ++$x) {
                // check if last horizontal line is empty
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }
            if ($black_line) {
                $dirty_line = false;
                break;
            } else {
                ++$measure['height'];
                imagedestroy($gd_image);
                $gd_image = $this->drawText($measure, $this->text, $this->size, $this->font_path);
            }
        }

        // check left edge for non black pixels
        $dirty_line = true;
        while ($dirty_line) {
            $black_line = true;
            $x = 1;
            for ($y = 0; $y < $measure['height']; ++$y) {
                // check if first vertical line is empty
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }

            if ($black_line) {
                $dirty_line = false;
                break;
            } else {
                ++$measure['x'];
                ++$measure['width'];
                imagedestroy($gd_image);
                $gd_image = $this->drawText($measure, $this->text, $this->size, $this->font_path);
            }
        }

        // check right edge for non black pixels
        $dirty_line = true;
        while ($dirty_line) {
            $black_line = true;
            $x = $measure['width'] - 1;
            for ($y = 0; $y < $measure['height']; ++$y) {
                // check if first vertical line is empty
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }

            if ($black_line) {
                $dirty_line = false;
                break;
            } else {
                ++$measure['width'];
                imagedestroy($gd_image);
                $gd_image = $this->drawText($measure, $this->text, $this->size, $this->font_path);
            }
        }

        $gd_image = $this->drawText($measure, $this->text, $this->size, $this->font_path);

        // measure trimmed image for further precision
        $measure = $this->measureTrimmedImage($gd_image, $measure);

        return $measure;
    }

    /**
     * @param $measure
     *
     * @return resource
     */
    public function drawText($measure)
    {
        $gd_image = imagecreatetruecolor($measure['width'], $measure['height']);
        $black = imagecolorallocate($gd_image, 0, 0, 0);
        $red = imagecolorallocate($gd_image, 255, 0, 0);
        imagefill($gd_image, 0, 0, $black);
        imagettftext($gd_image, $this->size, 0, (int) $measure['x'], $measure['y'], $red, $this->font_path, $this->text);
        imagecolordeallocate($gd_image, $black);
        imagecolordeallocate($gd_image, $red);

        return $gd_image;
    }

    /**
     * Trim image by removing empty sides and return the new measurement
     *
     * @param $gd_image
     * @param $measure
     *
     * @return array
     */
    public function measureTrimmedImage($gd_image, $measure)
    {
        $width = imagesx($gd_image);
        $height = imagesy($gd_image);

        // trim top
        $black_line = true;
        for ($y = 0; $y < $height; ++$y) {
            for ($x = 0; $x < $width; ++$x) {
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }
            if ($black_line) {
                --$measure['y'];
                --$measure['height'];
            } else {
                break;
            }
        }

        // trim bottom
        $black_line = true;
        for ($y = $height - 1; $y >= 0; --$y) {
            for ($x = 0; $x < $width; ++$x) {
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }
            if ($black_line) {
                --$measure['height'];
            } else {
                break;
            }
        }

        // trim left
        $black_line = true;
        for ($x = 0; $x < $width; ++$x) {
            for ($y = 0; $y < $height; ++$y) {
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }
            if ($black_line) {
                --$measure['x'];
                --$measure['width'];
            } else {
                break;
            }
        }

        // trim right
        $black_line = true;
        for ($x = $width - 1; $x >= 0; --$x) {
            for ($y = 0; $y < $height; ++$y) {
                $color = imagecolorat($gd_image, $x, $y);
                if ($color) {
                    $black_line = false;
                    break;
                }
            }
            if ($black_line) {
                --$measure['width'];
            } else {
                break;
            }
        }

        return $measure;
    }
}
