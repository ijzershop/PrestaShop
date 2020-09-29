<?php
/**
* 2010-2020 Tuni-Soft
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
* @copyright 2010-2020 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

function upgrade_module_1_8_4($module)
{
    $queries = array(
        'CREATE TABLE IF NOT EXISTS `'._DB_PREFIX_.$module->name.'_radio_option` (
          `id_radio_option` int(11) NOT NULL AUTO_INCREMENT,
          `id_field` int(11) NOT NULL,
          `value` varchar(100) NOT NULL,
          `color` varchar(100) NOT NULL,
          `position` int(11) NOT NULL,
          `is_default` tinyint(1) NOT NULL DEFAULT 0,
          PRIMARY KEY (`id_radio_option`)
        ) ENGINE='._MYSQL_ENGINE_.'  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;',

        'CREATE TABLE IF NOT EXISTS `'._DB_PREFIX_.$module->name.'_radio_option_lang` (
          `id_radio_option` int(11) NOT NULL,
          `id_lang` int(11) NOT NULL,
          `label` varchar(200) NOT NULL,
          `description` varchar(256) NOT NULL,
          PRIMARY KEY (`id_radio_option`,`id_lang`)
        ) ENGINE='._MYSQL_ENGINE_.' DEFAULT CHARSET=utf8;'
    );

    $success = true;

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
