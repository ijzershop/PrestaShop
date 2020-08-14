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
 * @author    Tuni-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

/**
 * @param DynamicProduct $module
 * @return bool
 */
function upgrade_module_2_2_3($module)
{

    /** @noinspection UnnecessaryCastingInspection */
    $queries = array(
        'ALTER TABLE `__PREFIX_unit_value` 
        ADD `required` tinyint(1) NOT NULL DEFAULT 0,
        ADD `min_width` int(11) NOT NULL,
        ADD `min_height` int(11) NOT NULL,
        ADD `max_size` int(11) NOT NULL,
        ADD `extensions` VARCHAR(50) NOT NULL,
        ADD `min_date` VARCHAR(50) NOT NULL,
        ADD `max_date` VARCHAR(50) NOT NULL,
        ADD `multiselect` tinyint(1) NOT NULL DEFAULT 0,
        ADD `color` VARCHAR(10) NOT NULL;',
    );

    $success = true;

    foreach ($queries as $query) {
        $query = str_replace(
            array('__PREFIX', '_MYSQL_ENGINE_'),
            array(_DB_PREFIX_ . $module->name, _MYSQL_ENGINE_),
            $query
        );
        $success &= Db::getInstance()->execute($query);
    }

    return $success;
}
