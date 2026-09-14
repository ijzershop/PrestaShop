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
use DynamicProduct\classes\models\DynamicCalculationItem;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\classes\models\ExecOrder;

/**
 * @param DynamicProduct $module
 *
 * @return bool
 */
function upgrade_module_3_50_6($module)
{
    $types = [
        ExecOrder::EXEC_INTERVAL => DynamicCalculationItem::INTERVAL_ITEM,
        ExecOrder::EXEC_FIELD_FORMULAS => DynamicCalculationItem::FIELD_FORMULA_ITEM,
        ExecOrder::EXEC_GRIDS => DynamicCalculationItem::GRID_ITEM,
        ExecOrder::EXEC_CONDITIONS => DynamicCalculationItem::CONDITION_ITEM,
    ];

    $exec_orders = Db::getInstance()->executeS('
        SELECT * 
        FROM ' . _DB_PREFIX_ . 'dynamicproduct_exec_order
        ORDER BY position ASC
    ');

    $custom_calc = [];

    foreach ($exec_orders as $exec_order) {
        $id_product = (int) $exec_order['id_product'];
        if (!isset($custom_calc[$id_product])) {
            $product_config = DynamicProductConfig::getByProduct($id_product);
            $custom_calc[$id_product] = $product_config->custom_calculation;
            $product_config->custom_calculation = 1;
            $product_config->save();
        }

        if (!$custom_calc[$id_product]) {
            $current_type = (int) $exec_order['id_exec'];
            $target_type = $types[$current_type];
            $id_calculation_item = Db::getInstance()->getValue('
                SELECT id_calculation_item 
                FROM ' . _DB_PREFIX_ . 'dynamicproduct_calculation_item 
                WHERE id_product = ' . $id_product . ' 
                AND type = "' . $target_type . '" 
                AND position = ' . (int) $exec_order['position']
            );

            if (!$id_calculation_item) {
                $result = Db::getInstance()->insert('dynamicproduct_calculation_item', [
                    'id_product' => $id_product,
                    'type' => $target_type,
                    'position' => (int) $exec_order['position'],
                ]);

                if (!$result) {
                    throw new PrestaShopException('Error while inserting data into dynamicproduct_calculation_item table');
                }
            } else {
                $result = Db::getInstance()->update('dynamicproduct_calculation_item', [
                    'id_product' => $id_product,
                    'type' => $target_type,
                    'position' => (int) $exec_order['position'],
                ], 'id_calculation_item = ' . $id_calculation_item);

                if (!$result) {
                    throw new PrestaShopException('Error while inserting data into dynamicproduct_calculation_item table');
                }
            }
        }
    }

    return true;
}
