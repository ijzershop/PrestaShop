<?php
/**
 * 2010-2022 Tuni-Soft
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
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\module;

use classes\DynamicTools;
use classes\helpers\FolderHelper;
use Context;
use Db;
use DynamicProduct;
use Language;
use Tab;
use Tools;

class DynamicInstaller
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    private $hooks_front = array(
        'displayHeader',
        'displayProductAdditionalInfo',
        'actionValidateOrder',
        'displayProductPriceBlock',
        'displayCustomization',
        'displayPaymentTop',
        'displayBeforeShoppingCartBlock',
        'displayShoppingCart',
        'actionCartSave',
        'addWebserviceResources',
    );
    private $hooks_admin = array(
        'displayBackOfficeHeader',
        'displayAdminProductsExtra',
        'actionProductAdd',
        'actionAdminControllerSetMedia',
        'actionOrderStatusPostUpdate',
        'actionClearCompileCache',
    );

    private static $controllers = array(
        array(
            'name'  => 'Dynamic Main Config',
            'class' => 'DynamicMainConfig'
        ),
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
        array(
            'name'  => 'Dynamic Product Intervals',
            'class' => 'DynamicProductIntervals'
        ),
        array(
            'name'  => 'Dynamic Product Grids',
            'class' => 'DynamicProductGrids'
        ),
        array(
            'name'  => 'Dynamic Product Exec Order',
            'class' => 'DynamicProductExecOrder'
        ),
        array(
            'name'  => 'Dynamic Product Field Groups',
            'class' => 'DynamicProductFieldGroups'
        ),
        array(
            'name'  => 'Dynamic Product Steps',
            'class' => 'DynamicProductSteps'
        ),
        array(
            'name'  => 'Dynamic Product Dev',
            'class' => 'DynamicProductDev'
        ),
        array(
            'name'  => 'Dynamic Product CSV',
            'class' => 'DynamicProductCSV'
        ),
    );

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function getHooks()
    {
        return array_merge($this->hooks_front, $this->hooks_admin);
    }

    public function getFrontHooks()
    {
        return $this->hooks_front;
    }

    public function installHooks()
    {
        foreach ($this->getHooks() as $hook) {
            $this->module->registerHook($hook);
        }
        return true;
    }

    public function uninstallHooks()
    {
        foreach ($this->getHooks() as $hook) {
            $this->module->unregisterHook($hook);
        }
        return true;
    }

    public function installControllers()
    {
        $success = true;
        foreach (self::$controllers as $controller) {
            $success &= $this->installController($controller);
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

    public function uninstallController($name)
    {
        $tab = new Tab((int) Tab::getIdFromClassName($name));
        return $tab->delete();
    }

    public function uninstallControllers()
    {
        $success = true;
        foreach (self::$controllers as $controller) {
            $success &= $this->uninstallController($controller ['class']);
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
            'databases',
            'upload',
            'upload_keep',
            'cache',
            'images',
            'images/field',
            'images/thumbnails',
            'images/dropdown',
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
            'install/calculator/.htaccess'  => 'calculator/.htaccess',
            'install/calculator/readme.txt' => 'calculator/readme.txt',

            'install/allocations/.htaccess' => 'allocations/.htaccess',

            'install/declarations/.htaccess' => 'declarations/.htaccess',

            'install/databases/.htaccess'  => 'databases/.htaccess',
            'install/databases/readme.txt' => 'databases/readme.txt',

            'install/cache/.htaccess' => 'cache/.htaccess',

            'install/upload_keep/readme.txt' => 'upload_keep/readme.txt',
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

    public function execSQLFile($path)
    {
        if (!file_exists($path)) {
            return false;
        }

        if (!$sql = Tools::file_get_contents($path)) {
            return false;
        }
        $sql = str_replace(
            array('__PREFIX', '_MYSQL_ENGINE_'),
            array(_DB_PREFIX_ . $this->module->name, _MYSQL_ENGINE_),
            $sql
        );
        $sql = preg_split('/;\s*[\r\n]+/', $sql);
        foreach ($sql as $query) {
            if (trim($query) && !Db::getInstance()->execute(trim($query))) {
                return false;
            }
        }
        return true;
    }

    public function execUninstallScript()
    {
        $success = true;
        $uninstall_script = $this->module->getDir() . 'sql/tables.json';
        $contents = Tools::file_get_contents($uninstall_script);
        $tables = json_decode($contents, true);
        if (is_array($tables)) {
            foreach ($tables as $table) {
                $table = $this->restoreTableName($table);
                $sql = 'DROP TABLE IF EXISTS `__PREFIX_' . pSQL($table) . '`;';
                $sql = str_replace('__PREFIX', pSQL(_DB_PREFIX_ . $this->module->name), $sql);
                $success &= Db::getInstance()->execute($sql);
            }
        }
        return $success;
    }

    private function restoreTableName($table)
    {
        if (!DynamicTools::isModuleDevMode() && Tools::substr($table, 0, 1) === '_') {
            $table = Tools::substr($table, 1);
        }
        return $table;
    }

    public function upgradeSQL($version)
    {
        $path = $this->module->getFolderPath('upgrade/sql') . "upgrade-{$version}.sql";
        return $this->execSQLFile($path);
    }
}
