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

use DynamicProduct\classes\models\DynamicCalculationItem;
use DynamicProduct\classes\models\DynamicProductConfig;

class Actions
{
    public static $module;
    public static $context;

    public static function update()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        $calculation_items = \Tools::getValue('calculation_items');

        foreach ($calculation_items as $calculation_item) {
            $obj = new DynamicCalculationItem($calculation_item['id']);
            $obj->id_item = $calculation_item['id_item'];
            $obj->type = $calculation_item['type'];
            $obj->save();
        }

        if ($action_name === 'add') {
            $obj = new DynamicCalculationItem();
            $obj->id_product = $id_product;
            $obj->position = DynamicCalculationItem::getHighestPosition($obj) + 1;
            $obj->save();
        }

        if ($action_name === 'delete') {
            $obj = new DynamicCalculationItem($action_value);
            $obj->delete();
        }

        return [
            'calculation_items' => DynamicCalculationItem::getByIdProduct($id_product),
        ];
    }

    public static function sort()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $order = \Tools::getValue('order');

        $position = 0;
        foreach ($order as $id_calculation_item) {
            $obj = new DynamicCalculationItem($id_calculation_item);
            $obj->position = $position++;
            $obj->save();
        }

        return [
            'calculation_items' => DynamicCalculationItem::getByIdProduct($id_product),
        ];
    }

    public static function save_settings()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $custom_calculation = \Tools::getValue('custom_calculation');
        $product_config = DynamicProductConfig::getByProduct($id_product);

        $product_config->custom_calculation = (int) $custom_calculation;
        $product_config->save();

        return [];
    }
}
