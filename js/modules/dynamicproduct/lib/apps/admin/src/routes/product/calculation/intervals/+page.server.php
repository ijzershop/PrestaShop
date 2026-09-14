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
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\intervals\Interval;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    return [
        'items' => Interval::getByIdProduct($id_product),
        'fields' => DynamicField::getFieldRowsByProduct($id_product),
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function add_single_step()
    {
        $id_product = (int) \Tools::getValue('id_product');

        $obj = new DynamicCalculationItem();
        $obj->id_product = $id_product;
        $obj->position = DynamicCalculationItem::getHighestPosition($obj) + 1;
        $obj->type = DynamicCalculationItem::INTERVAL_ITEM;
        $obj->id_item = 0;
        $obj->save();

        return [
        ];
    }

    public static function add_all()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $items = Interval::getByIdProduct($id_product);

        foreach ($items as $item) {
            $calculation_item = new DynamicCalculationItem();
            $calculation_item->id_product = $id_product;
            $calculation_item->id_item = $item->id;
            $calculation_item->type = DynamicCalculationItem::INTERVAL_ITEM;
            $calculation_item->position = DynamicCalculationItem::getHighestPosition($calculation_item);
            $calculation_item->save();
        }

        return [
        ];
    }

    public static function add_selected()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('id_product');
        $items = \Tools::getValue('selected', []);

        if (count($items) == 0) {
            return [
                'error' => true,
                'message' => self::$module->l('Please select at least one item to add.', $source),
            ];
        }

        foreach ($items as $id_item) {
            $calculation_item = new DynamicCalculationItem();
            $calculation_item->id_product = $id_product;
            $calculation_item->id_item = $id_item;
            $calculation_item->type = DynamicCalculationItem::INTERVAL_ITEM;
            $calculation_item->position = DynamicCalculationItem::getHighestPosition($calculation_item);
            $calculation_item->save();
        }

        return [
        ];
    }
}
