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
if (!defined('_PS_VERSION_')) {
    exit;
}
/**
 * @param DynamicProduct $module
 *
 * @return bool
 */
function upgrade_module_3_50_7($module)
{
    $proportions = Db::getInstance()->executeS('
        SELECT * 
        FROM ' . _DB_PREFIX_ . 'dynamicproduct_proportions
        ORDER BY id_proportion DESC
    ');

    foreach ($proportions as $proportion) {
        $id_product = (int) $proportion['id_product'];
        $id_field = (int) $proportion['id_field'];
        $id_field_src = (int) $proportion['id_field_src'];

        $field_name = Db::getInstance()->getValue('
            SELECT name
            FROM ' . _DB_PREFIX_ . 'dynamicproduct_field
            WHERE id_field = ' . (int) $id_field
        );

        $field_name_src = Db::getInstance()->getValue('
            SELECT name
            FROM ' . _DB_PREFIX_ . 'dynamicproduct_field
            WHERE id_field = ' . (int) $id_field_src
        );

        $value = (float) $proportion['value'];
        $target_template = '[target] = IF("[changed]" = "source", [source] * value, [target])';
        $target_formula = str_replace(
            ['target', 'source', 'value'],
            [$field_name, $field_name_src, $value],
            $target_template
        );

        $source_template = '[source] = IF("[changed]" = "target", [target] / value, [source])';
        $source_formula = str_replace(
            ['source', 'target', 'value'],
            [$field_name_src, $field_name, $value],
            $source_template
        );

        $target_exists = Db::getInstance()->getValue('
            SELECT id_field_formula
            FROM ' . _DB_PREFIX_ . 'dynamicproduct_field_formula
            WHERE formula = "' . pSQL($target_formula) . '" AND id_product = ' . (int) $id_product
        );

        if (!$target_exists) {
            Db::getInstance()->execute('
            UPDATE ' . _DB_PREFIX_ . 'dynamicproduct_field_formula 
            SET position = position + 1
            WHERE id_product = ' . (int) $id_product
            );

            Db::getInstance()->insert('dynamicproduct_field_formula', [
                'id_product' => (int) $id_product,
                'formula' => $target_formula,
                'position' => 1,
            ]);
        }

        $source_exists = Db::getInstance()->getValue('
						SELECT id_field_formula
						FROM ' . _DB_PREFIX_ . 'dynamicproduct_field_formula
						WHERE formula = "' . pSQL($source_formula) . '" AND id_product = ' . (int) $id_product
        );

        if (!$source_exists) {
            Db::getInstance()->execute('
						UPDATE ' . _DB_PREFIX_ . 'dynamicproduct_field_formula 
						SET position = position + 1
						WHERE id_product = ' . (int) $id_product
            );

            Db::getInstance()->insert('dynamicproduct_field_formula', [
                'id_product' => (int) $id_product,
                'formula' => $source_formula,
                'position' => 1,
            ]);
        }
    }

    return true;
}
