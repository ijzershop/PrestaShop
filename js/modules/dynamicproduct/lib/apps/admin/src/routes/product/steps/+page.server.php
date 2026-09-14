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
use DynamicProduct\classes\models\DynamicProductStep;
use DynamicProduct\classes\models\DynamicStep;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');
    $id_lang = DynamicContext::getLanguageId();

    $product_config = DynamicProductConfig::getByProduct($id_product);

    return [
        'config_page_url' => DynamicContext::getLink()->getAdminLink('AdminModules') . '&configure=' . $module->name,
        'steps' => DynamicStep::getAll($id_lang),
        'product_steps' => DynamicProductStep::getByIdProduct($id_product, true, $id_lang),
        'groups' => DynamicFieldGroup::getAll($id_lang),
        'product_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true, $id_lang),
        'fields' => DynamicField::getFieldRowsByProduct($id_product),
        'enable_steps' => $product_config->enable_steps,
        'all_steps_required' => $product_config->all_steps_required,
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

        if ($action_name === 'delete') {
            $id_step = (int) $action_value;

            \Db::getInstance()->update(
                'dynamicproduct_field',
                ['id_step' => 0],
                'id_step = ' . (int) $id_step
            );

            \Db::getInstance()->update(
                'dynamicproduct_product_field_group',
                ['id_step' => 0],
                'id_step = ' . (int) $id_step
            );

            $obj = new DynamicProductStep($action_value);
            $obj->delete();
        }

        $id_lang = DynamicContext::getLanguageId();

        return [
            'product_steps' => DynamicProductStep::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function add_step()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_step = (int) \Tools::getValue('id_step');

        if (!$id_step) {
            return [
                'error' => true,
                'message' => self::$module->l('Please select a step.'),
            ];
        }

        $existing = \Db::getInstance()->getRow('SELECT *
            FROM `' . _DB_PREFIX_ . 'dynamicproduct_product_step`
            WHERE `id_product` = ' . (int) $id_product . '
            AND `id_step` = ' . (int) $id_step
        );

        if ($existing) {
            return [
                'error' => true,
                'message' => self::$module->l('This step is already added to the product.'),
            ];
        }

        $obj = new DynamicProductStep();
        $obj->id_product = $id_product;
        $obj->id_step = $id_step;
        $obj->position = DynamicProductStep::getHighestPosition($obj);
        $obj->save();

        $id_lang = DynamicContext::getLanguageId();

        return [
            'message' => self::$module->l('Step added successfully.'),
            'product_steps' => DynamicProductStep::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function reload()
    {
        $id_lang = DynamicContext::getLanguageId();

        return [
            'message' => self::$module->l('The steps have been reloaded.'),
            'steps' => DynamicStep::getAll($id_lang),
        ];
    }

    public static function sort()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id) {
            $obj = new DynamicProductStep($id);
            $obj->position = $position++;
            $obj->save();
        }

        $id_lang = DynamicContext::getLanguageId();

        return [
            'product_steps' => DynamicProductStep::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function sort_fields()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_step = (int) \Tools::getValue('id_step');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id) {
            $obj = new DynamicField($id);
            $obj->id_step = $id_step;
            $obj->position = $position++;
            $obj->save();
        }

        $id_lang = DynamicContext::getLanguageId();

        return [
            'product_steps' => DynamicProductStep::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function sort_groups()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $id_step = (int) \Tools::getValue('id_step');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id) {
            $obj = new DynamicProductFieldGroup($id);
            $obj->id_step = $id_step;
            $obj->position = $position++;
            $obj->save();
        }

        $id_lang = DynamicContext::getLanguageId();

        return [
            'product_steps' => DynamicProductStep::getByIdProduct($id_product, true, $id_lang),
        ];
    }

    public static function save_settings()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $enable_steps = \Tools::getValue('enable_steps');
        $all_steps_required = \Tools::getValue('all_steps_required');
        $product_config = DynamicProductConfig::getByProduct($id_product);

        $product_config->enable_steps = (int) $enable_steps;
        $product_config->all_steps_required = (int) $all_steps_required;
        $product_config->save();

        return [];
    }
}
