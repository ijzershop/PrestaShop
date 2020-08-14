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

function upgrade_module_1_4_6($module)
{
    $queries = array(
        'RENAME TABLE `'._DB_PREFIX_.$module->name.'_unit_trans` 
                    TO `'._DB_PREFIX_.$module->name.'_unit_lang`;',

        'RENAME TABLE `'._DB_PREFIX_.$module->name.'_field_trans` 
                    TO `'._DB_PREFIX_.$module->name.'_field_lang`;',

        'RENAME TABLE `'._DB_PREFIX_.$module->name.'_dropdown_option_trans` 
                    TO `'._DB_PREFIX_.$module->name.'_dropdown_option_lang`;',

        'RENAME TABLE `'._DB_PREFIX_.$module->name.'_thumbnails_option_trans` 
                    TO `'._DB_PREFIX_.$module->name.'_thumbnails_option_lang`;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_dropdown_option_lang` DROP `value`;',
        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_thumbnails_option_lang` DROP `value`;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_unit_group` CHANGE `group_name` `name` VARCHAR(25);',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_unit_value` DROP PRIMARY KEY;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_unit_value`
        ADD `id_unit_value` INT(11) NOT NULL AUTO_INCREMENT FIRST, 
        ADD PRIMARY KEY (`id_unit_value`);',

        'RENAME TABLE `'._DB_PREFIX_.$module->name.'_combination` 
        TO `'._DB_PREFIX_.$module->name.'_combination_value`;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_combination_value` DROP PRIMARY KEY;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_combination_value`
        ADD `id_combination_value` INT(11) NOT NULL AUTO_INCREMENT FIRST, 
        ADD PRIMARY KEY (`id_combination_value`);',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_combination_value` CHANGE `init` `value` DECIMAL(20,6) NOT NULL;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_country_unit` DROP PRIMARY KEY;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_country_unit`
        ADD `id_country_unit` INT(11) NOT NULL AUTO_INCREMENT FIRST, 
        ADD PRIMARY KEY (`id_country_unit`);',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_equation` DROP PRIMARY KEY;',

        'ALTER TABLE `'._DB_PREFIX_.$module->name.'_equation`
        ADD `id_equation` INT(11) NOT NULL AUTO_INCREMENT FIRST, 
        ADD PRIMARY KEY (`id_equation`);'
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
