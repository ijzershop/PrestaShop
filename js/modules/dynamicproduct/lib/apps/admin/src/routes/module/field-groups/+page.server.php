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
namespace DynamicProduct;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\models\DynamicFieldGroup;

function load(\DynamicProduct $module): array
{
    return [
        'field_groups' => DynamicFieldGroup::getAll(),
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function default()
    {
    }

    public static function save_field_group()
    {
        $source = basename(__FILE__, '.php');
        $id = (int) \Tools::getValue('id');

        $field_group = new DynamicFieldGroup($id);
        $errors = $field_group->saveFromPost();
        $field_group->show_label = (int) \Tools::getIsset('show_label');
        $field_group->save();

        if (count($errors)) {
            return [
                'error' => true,
                'message' => implode(', ', $errors),
            ];
        }

        return [
            'message' => self::$module->l('Field group saved', $source),
        ];
    }

    public static function toggle_field_group()
    {
        $source = basename(__FILE__, '.php');
        $id = (int) \Tools::getValue('id');
        $field_group = new DynamicFieldGroup($id);
        $field_group->show_label = !$field_group->show_label;
        $field_group->save();

        return [
            'message' => self::$module->l('Field group toggled', $source),
        ];
    }

    public static function delete_field_group()
    {
        $source = basename(__FILE__, '.php');
        $id = (int) \Tools::getValue('id');
        $field_group = new DynamicFieldGroup($id);
        $field_group->delete();

        return [
            'message' => self::$module->l('Field group deleted', $source),
        ];
    }
}
