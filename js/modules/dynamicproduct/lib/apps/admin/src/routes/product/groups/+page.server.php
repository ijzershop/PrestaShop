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

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicFieldGroup;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\classes\models\DynamicProductFieldGroup;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');
    $id_lang = DynamicContext::getLanguageId();

    $product_config = DynamicProductConfig::getByProduct($id_product);

    return [
        'config_page_url' => DynamicContext::getLink()->getAdminLink('AdminModules') . '&configure=' . $module->name,
        'groups' => DynamicFieldGroup::getAll($id_lang),
        'product_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_lang),
        'fields' => DynamicField::getFieldRowsByProduct($id_product),
        'ungrouped_fields_on_top' => $product_config->ungrouped_fields_on_top,
    ];
}

class Actions
{
    public static $module;

    public static function update()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        $product_groups = \Tools::getValue('product_groups');

        foreach ($product_groups as $product_group) {
            $obj = new DynamicProductFieldGroup($product_group['id']);
            $obj->collapsible = $product_group['collapsible'];
            $obj->start_collapsed = $product_group['start_collapsed'];
            $obj->id_control_field = $product_group['id_control_field'];
            $obj->save();
        }

        if ($action_name === 'delete') {
            \Db::getInstance()->update(
                'dynamicproduct_field',
                ['id_group' => 0],
                'id_group = ' . (int) $action_value
            );

            $obj = new DynamicProductFieldGroup($action_value);
            $obj->delete();
        }

        $id_lang = DynamicContext::getLanguageId();

        return [
            'product_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function add_field_group()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_group = (int) \Tools::getValue('id_group');

        if (!$id_group) {
            return [
                'error' => true,
                'message' => self::$module->l('Please select a group.'),
            ];
        }

        $existing = \Db::getInstance()->getRow('SELECT *
            FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_field_group`
            WHERE `id_product` = ' . (int) $id_product . '
            AND `id_field_group` = ' . (int) $id_group
        );

        if ($existing) {
            return [
                'error' => true,
                'message' => self::$module->l('This group is already added to the product.'),
            ];
        }

        $product_group = new DynamicProductFieldGroup();
        $product_group->id_product = $id_product;
        $product_group->id_field_group = $id_group;
        $product_group->position = DynamicProductFieldGroup::getHighestPosition($product_group);
        $product_group->save();

        $id_lang = DynamicContext::getLanguageId();

        return [
            'message' => self::$module->l('Group added successfully.'),
            'product_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function reload()
    {
        $id_lang = DynamicContext::getLanguageId();

        return [
            'message' => self::$module->l('The groups have been reloaded.'),
            'groups' => DynamicFieldGroup::getAll($id_lang),
        ];
    }

    public static function sort()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id) {
            $obj = new DynamicProductFieldGroup($id);
            $obj->position = $position++;
            $obj->save();
        }

        $id_lang = DynamicContext::getLanguageId();

        return [
            'product_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function sort_fields()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_group = (int) \Tools::getValue('id_group');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id) {
            $obj = new DynamicField($id);
            $obj->id_group = $id_group;
            $obj->position = $position++;
            $obj->save();
        }

        $id_lang = DynamicContext::getLanguageId();

        return [
            'product_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function save_settings()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $ungrouped_fields_on_top = \Tools::getValue('ungrouped_fields_on_top');
        $product_config = DynamicProductConfig::getByProduct($id_product);

        $product_config->ungrouped_fields_on_top = (int) $ungrouped_fields_on_top;
        $product_config->save();

        return [];
    }
}
