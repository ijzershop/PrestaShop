<?php
/**
 * 2007-2025 TuniSoft
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
 * @copyright 2007-2025 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\helpers;

if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\factory\DynamicFieldFactory;
use DynamicProduct\classes\models\DynamicInputField;

class PreviewHelper
{
    /** @var \DynamicProduct */
    public $module;
    /** @var \Context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    /**
     * @param DynamicInputField[] $input_fields
     *
     * @return void
     */
    public function addPreviewField(&$input_fields)
    {
        $preview_paths = [];
        foreach ($input_fields as $input_field) {
            if ($input_field->visible && is_array($input_field->selected_options)) {
                foreach ($input_field->selected_options as $id_option) {
                    $option = DynamicFieldFactory::getOptionInstance($input_field->id_field, $id_option);
                    if ($option->hasPreview()) {
                        $preview_paths[] = [
                            'position' => $input_field->position,
                            'path' => $option->getPreview(),
                            'path_url' => $option->getPreviewUrl(),
                        ];
                    }
                }
            }
        }

        usort($preview_paths, function ($a, $b) {
            return $a['position'] <=> $b['position'];
        });

        if (!count($preview_paths)) {
            return;
        }

        $paths = array_map(function ($preview_path) {
            return $preview_path['path'];
        }, $preview_paths);

        $positions = array_map(function ($preview_path) {
            return $preview_path['position'];
        }, $preview_paths);

        if (isset($_COOKIE['XDEBUG_SESSION'])) {
            $urls = array_map(function ($preview_path) {
                return $preview_path['path_url'];
            }, $preview_paths);
            $html = '<div style="width: 100%; height: 100%; overflow: auto;">';
            foreach ($urls as $url) {
                $html .= '<img src="' . $url . '" style="max-width: 100%; max-height: 100%;" />';
            }
            $html .= '</div>';
            //            exit($html);
        }

        // create hash from paths + mtime
        $hash = md5(implode(',', $paths) . implode(',', array_map('filemtime', $paths)) . implode(',', $positions));

        $filename = 'preview-' . $hash . '.png';
        $filepath = $this->module->provider->getDataFile('upload/' . $filename);
        if (!is_file($filepath)) {
            $bg = null;
            foreach ($paths as $path) {
                list($width, $height, $type) = getimagesize($path);
                $img = \ImageManager::create($type, $path);
                if (!$bg) {
                    $bg = $img;
                    imagealphablending($bg, true);
                    imagesavealpha($bg, true);
                } else {
                    imagealphablending($img, true);
                    imagesavealpha($img, true);
                    imagecopy($bg, $img, 0, 0, 0, 0, $width, $height);
                }
            }

            imagepng($bg, $filepath);

            $thumb = $this->module->provider->getDataFile('upload/preview-' . $hash . '-thumb.jpg');
            \ImageManager::resize($filepath, $thumb, 256, 256);
        }

        if (!isset($input_fields['preview'])) {
            $preview_field = new DynamicInputField();
            $preview_field->name = 'preview';
            $preview_field->label = $this->module->l('Preview', DynamicTools::getSource());
            $preview_field->type = _DP_IMAGE_;
        } else {
            $preview_field = $input_fields['preview'];
        }

        $preview_field->visible = false;
        $preview_field->value = 1;
        $preview_field->data = [[
            'file' => basename($filepath),
        ]];
        $preview_field->setData($this->context->language->id);
        $input_fields['preview'] = $preview_field;
    }
}
