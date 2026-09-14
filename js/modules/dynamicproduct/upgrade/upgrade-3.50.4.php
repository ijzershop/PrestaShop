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
use DynamicProduct\classes\helpers\DynamicFieldsHelper;

/**
 * @param DynamicProduct $module
 *
 * @return bool
 *
 * @noinspection PhpUnused called by PrestaShop internally
 */
function upgrade_module_3_50_4($module)
{
    $fields = Db::getInstance()->executeS('
        SELECT id_field, type, id_unit, image
        FROM ' . _DB_PREFIX_ . 'dynamicproduct_field
        WHERE settings = "" || 1
    ');

    foreach ($fields as $field) {
        DynamicFieldsHelper::migrateFieldSettings($field, $module);
    }

    return true;
}
