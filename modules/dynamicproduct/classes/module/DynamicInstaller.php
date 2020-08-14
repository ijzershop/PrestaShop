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

namespace classes\module;

use classes\helpers\FolderHelper;
use Context;
use DynamicProduct;
use Language;
use Tab;

class DynamicInstaller
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    private static $controllers = array(
        array(
            'name'  => 'Dynamic Product Settings',
            'class' => 'DynamicProductSettings'
        ),
        array(
            'name'  => 'Dynamic Product Equations',
            'class' => 'DynamicProductEquations'
        ),
        array(
            'name'  => 'Dynamic Product Fields',
            'class' => 'DynamicProductFields'
        ),
        array(
            'name'  => 'Dynamic Product Fields Settings',
            'class' => 'DynamicProductFieldsSettings'
        ),
        array(
            'name'  => 'Dynamic Product Fields Options',
            'class' => 'DynamicProductFieldsOptions'
        ),
        array(
            'name'  => 'Dynamic Product Combinations',
            'class' => 'DynamicProductCombinations'
        ),
        array(
            'name'  => 'Dynamic Product Visibility',
            'class' => 'DynamicProductVisibility'
        ),
        array(
            'name'  => 'Dynamic Product Proportions',
            'class' => 'DynamicProductProportions'
        ),
        array(
            'name'  => 'Dynamic Product Conditions',
            'class' => 'DynamicProductConditions'
        ),
        array(
            'name'  => 'Dynamic Product Field Formulas',
            'class' => 'DynamicProductFieldFormulas'
        ),
        array(
            'name'   => 'Dynamic Product',
            'class'  => 'DpRedirect',
            'parent' => 'AdminParentModulesSf'
        ),
    );

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function installHooks()
    {
        return
            $this->module->registerHook('displayBackOfficeHeader') &&
            $this->module->registerHook('displayHeader') &&
            $this->module->registerHook('displayProductAdditionalInfo') &&
            $this->module->registerHook('displayFooterProduct') &&
            $this->module->registerHook('actionCartSave') &&
            $this->module->registerHook('actionValidateOrder') &&
            $this->module->registerHook('displayProductPriceBlock') &&
            $this->module->registerHook('displayCustomization') &&
            $this->module->registerHook('displayAdminProductsExtra') &&
            $this->module->registerHook('hookActionProductAdd') &&
            $this->module->registerHook('actionAdminControllerSetMedia') &&
            $this->module->registerHook('displayPaymentTop') &&
            $this->module->registerHook('displayBeforeShoppingCartBlock') &&
            $this->module->registerHook('displayShoppingCart') &&
            $this->module->registerHook('actionOrderStatusPostUpdate');
    }

    public function installControllers()
    {
        $success = true;
        foreach (self::$controllers as $controller) {
            $success &= $this->installController($controller, $success);
        }
        return $success;
    }

    public function installController($controller)
    {
        $languages = Language::getLanguages();
        $tab = new Tab();
        foreach ($languages as $lang) {
            $tab->name[$lang['id_lang']] = $controller['name'];
        }
        $tab->class_name = $controller['class'];
        if (isset($controller['parent'])) {
            $tab->id_parent = $this->module->provider->getTabID($controller['parent']);
        } else {
            $tab->id_parent = 0;
        }
        $tab->module = $this->module->name;
        $tab->active = 1;
        return $tab->add();
    }

    public function uninstallControllers()
    {
        $success = true;
        foreach (self::$controllers as $controller) {
            $tab = new Tab((int)Tab::getIdFromClassName($controller['class']));
            $success &= $tab->delete();
        }
        return $success;
    }

    public function installDataDir()
    {
        $result = true;

        $folders = array(
            '',
            'allocations',
            'calculator',
            'declarations',
            'scripts',
            'upload',
            'images',
            'images/field',
            'images/thumbnails',
        );

        $index_file = $this->module->getDir() . 'index.php';

        foreach ($folders as $folder) {
            $dir = $this->module->provider->getDataDir($folder);
            if (!is_dir($dir)) {
                $result &= mkdir($dir);
                copy($index_file, $dir . 'index.php');
            }
        }

        $files = array(
            'install/calculator/.htaccess'     => 'calculator/.htaccess',
            'install/calculator/readme.txt'    => 'calculator/readme.txt',

            'install/allocations/.htaccess' => 'allocations/.htaccess',

            'install/declarations/.htaccess' => 'declarations/.htaccess'
        );

        foreach ($files as $src => $dest) {
            $file_path = $this->module->getDir() . $src;
            if (is_file($file_path)) {
                $destination = $this->module->provider->getDataFile($dest);
                if (!is_file($destination)) {
                    copy($file_path, $destination);
                }
            }
        }

        return $result;
    }

    public function copyFiles()
    {
        $folders = array(
            'allocations'          => 'allocations',
            'calculator'           => 'calculator',
            'declarations'         => 'declarations',
            'scripts'              => 'scripts',
            'upload'               => 'upload',
            'views/img/field'      => 'images/field',
            'views/img/thumbnails' => 'images/thumbnails',
        );

        $folder_helper = new FolderHelper($this->module, $this->context);

        foreach ($folders as $src => $dest) {
            $src = $this->module->getFolderPath($src);
            $dest = $this->module->provider->getDataDir($dest);
            $folder_helper->copyFolder($src, $dest);
        }
        return true;
    }
}
