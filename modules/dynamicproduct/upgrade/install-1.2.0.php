<?php
    /**
    * 2010-2018 Tuni-Soft
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
    * @author    Tuni-Soft
    * @copyright 2010-2018 Tuni-Soft
    * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
    */

/**
 * @param DynamicProduct $module
 * @return bool
 */
function upgrade_module_1_2_0($module)
{
    $queries = array(
        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_equation` CHANGE `id_attribute` `id_formula` INT(11) NOT NULL;',
        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_input` ADD `weight` decimal(20,6) NOT NULL;'
    );

    $success = true;

    $success &= $module->uninstallOverrides();
    $success &= $module->installOverrides();

    $errors = '';
    foreach ($queries as $query) {
        try {
            Db::getInstance()->Execute($query);
        } catch (Exception $e) {
            $errors .= $e->getMessage().'<br>';
        }
    }

    return $success;
}
