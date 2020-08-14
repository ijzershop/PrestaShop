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
function upgrade_module_1_9_8($module)
{
    $queries = array(
        'ALTER TABLE `' . _DB_PREFIX_ . $module->name . '_field` ADD `id_unit` int(11) NOT NULL DEFAULT 0;'
    );

    $errors = '';
    foreach ($queries as $query) {
        try {
            Db::getInstance()->Execute($query);
        } catch (Exception $e) {
            $errors .= $e->getMessage() . '<br>';
        }
    }

    $fields = Db::getInstance()->executeS(
        'SELECT `id_field`, `id_unit_group` 
        FROM `' . _DB_PREFIX_ . $module->name . '_field`'
    );
    if (is_array($fields)) {
        foreach ($fields as $field) {
            $id_field = (int)$field['id_field'];
            $id_unit_group = (int)$field['id_unit_group'];
            $id_default_unit = (int)Db::getInstance()->getValue(
                'SELECT `id_default_unit` 
                FROM `' . _DB_PREFIX_ . $module->name . '_unit_group` 
                WHERE `id_unit_group` = ' . (int)$id_unit_group
            );
            Db::getInstance()->update(
                $module->name . '_field',
                array(
                    'id_unit' => (int)$id_default_unit
                ),
                'id_field = ' . (int)$id_field
            );
        }
    }

    return true;
}
