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
 * @author    Tunis-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use Context;
use DynamicProduct;

class FolderHelper
{
    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function copyFolder($src, $dest)
    {
        if (is_dir($src)) {
            $files = scandir($src, SCANDIR_SORT_ASCENDING);
            foreach ($files as $file) {
                if ($file !== '.' && $file !== '..') {
                    $src = rtrim($src, DIRECTORY_SEPARATOR);
                    $dest = rtrim($dest, DIRECTORY_SEPARATOR);
                    $this->copyFolder("$src/$file", "$dest/$file");
                }
            }
        } elseif (file_exists($src)) {
            copy($src, $dest);
        }
    }
}
