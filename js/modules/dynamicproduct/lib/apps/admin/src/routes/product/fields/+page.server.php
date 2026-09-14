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

use DynamicProduct\classes\helpers\DynamicFieldsHelper;
use DynamicProduct\classes\helpers\FormulasHelper;
use DynamicProduct\classes\models\DynamicCommonField;
use DynamicProduct\classes\models\DynamicField;

class Actions
{
    public static $module;
    public static $context;

    public static function update()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        $fields = \Tools::getValue('fields');

        foreach ($fields as $field) {
            $dynamic_field = new DynamicField($field['id']);
            $original_name = $dynamic_field->name;
            DynamicField::copyFromArray($field, $dynamic_field, false);
            $dynamic_field->save();
            if ($original_name !== $dynamic_field->name) {
                FormulasHelper::updateFormulas($dynamic_field, $original_name, $dynamic_field->name);
            }
        }

        if ($action_name === 'add') {
            $dynamic_field = new DynamicField();
            $dynamic_field->id_product = $id_product;
            $dynamic_field->type = _DP_INPUT_;
            $dynamic_field->name = '';
            $dynamic_field->position = DynamicField::getHighestPosition($dynamic_field) + 1;
            $dynamic_field->active = true;
            $dynamic_field->save();
        }

        if ($action_name === 'toggle') {
            $id_field = $action_value;
            $dynamic_field = new DynamicField($id_field);
            $dynamic_field->active = !$dynamic_field->active;
            $dynamic_field->save();
        }

        if ($action_name === 'delete') {
            $id_field = $action_value;
            DynamicFieldsHelper::deleteField($id_product, $id_field);
        }

        if ($action_name === 'duplicate') {
            $id_field = $action_value;
            self::$module->handler->copyField($id_field, $id_product);
        }

        if ($action_name === 'insert') {
            $id_field = $action_value;
            $current = new DynamicField($id_field);
            $current_position = $current->position;

            \Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'dynamicproduct_field`
				SET `position` = `position` + 1
				WHERE `id_product` = ' . $id_product . ' AND `position` > ' . $current_position
            );

            $dynamic_field = new DynamicField();
            $dynamic_field->id_product = $id_product;
            $dynamic_field->type = _DP_INPUT_;
            $dynamic_field->name = '';
            $dynamic_field->position = $current_position + 1;
            $dynamic_field->active = true;
            $dynamic_field->save();
        }

        if ($action_name === 'favorite') {
            $id_field = $action_value;
            $dynamic_field = new DynamicField($id_field);
            $dynamic_field->favorite = !$dynamic_field->favorite;
            $dynamic_field->common = false;
            $dynamic_field->save();
        }

        if ($action_name === 'common') {
            $id_field = $action_value;
            $dynamic_field = new DynamicField($id_field);
            $dynamic_field->common = !$dynamic_field->common;
            $dynamic_field->favorite = false;
            $dynamic_field->save();
        }

        if ($action_name === 'delete-fields') {
            $items = (array) \Tools::getValue('checked');

            foreach ($items as $id_field => $checked) {
                if (!$checked) {
                    continue;
                }
                DynamicFieldsHelper::deleteField($id_product, $id_field);
            }
        }

        return [
            'fields' => DynamicField::getFieldRowsByProduct($id_product),
        ];
    }

    public static function sort()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $order = \Tools::getValue('order');

        $position = 0;
        if (is_array($order)) {
            foreach ($order as $id_field) {
                $field = new DynamicField($id_field);
                if ((int) $field->id_product !== $id_product) {
                    $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $id_product);
                    $common_field->position = $position;
                    $common_field->save();
                } else {
                    $field->position = (int) $position;
                    $field->save();
                }
                ++$position;
            }
        }

        return [
            'fields' => DynamicField::getFieldRowsByProduct($id_product),
        ];
    }

    public static function load_favorite()
    {
        $id_product = (int) \Tools::getValue('id_product');

        $id_field = (int) \Tools::getValue('id_field');
        $field = new DynamicField($id_field);
        $new_field = self::$module->handler->copyField($field->id, $id_product);
        $id_new_field = $new_field['id_field'];

        $new_field = new DynamicField($id_new_field);
        $new_field->position = DynamicField::getHighestPosition($new_field);
        $new_field->favorite = false;
        $new_field->save();

        return [
            'fields' => DynamicField::getFieldRowsByProduct($id_product),
        ];
    }

    public static function load_common()
    {
        $source = basename(__FILE__, '.php');
        $id_product = (int) \Tools::getValue('id_product');
        $id_field = (int) \Tools::getValue('id_field');

        $common_field = DynamicCommonField::getByFieldAndProduct($id_field, $id_product);
        if (\Validate::isLoadedObject($common_field)) {
            return [
                'error' => true,
                'message' => self::$module->l('A common field can only be included once in the same product', $source),
            ];
        }
        $common_field->position = 1;

        $product_fields = array_values(DynamicField::getFieldsByIdProduct($id_product));
        if (!empty($product_fields)) {
            $common_field->position = DynamicField::getHighestPosition($product_fields[0]);
        }

        $common_field->save();

        return [
            'fields' => DynamicField::getFieldRowsByProduct($id_product),
        ];
    }
}
