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
use DynamicProduct\classes\models\DynamicProductConfig;

/**
 * @param DynamicProduct $module
 *
 * @return bool
 */
function upgrade_module_3_50_2($module)
{
    $id_products = Db::getInstance()->executeS('
        SELECT DISTINCT id_product 
        FROM ' . _DB_PREFIX_ . 'dynamicproduct_config'
    );

    foreach ($id_products as $id_product) {
        $product_config = Db::getInstance()->executeS('
            SELECT * 
            FROM ' . _DB_PREFIX_ . 'dynamicproduct_product_config 
            WHERE id_product = ' . (int) $id_product['id_product']
        );

        if (!count($product_config)) {
            $config = Db::getInstance()->executeS('
                SELECT * 
                FROM ' . _DB_PREFIX_ . 'dynamicproduct_config 
                WHERE id_product = ' . (int) $id_product['id_product']
            );
            $data = [];
            $definition = DynamicProductConfig::$definition['schema'];
            foreach ($config as $row) {
                $def = $definition[$row['name']];
                $type = $def['type'];
                $data[$row['name']] = $type == ObjectModelCore::TYPE_BOOL ?
                    (bool) $row['value'] :
                    DynamicProductConfig::formatValue($row['value'], $def['type']);
            }
            $result = Db::getInstance()->insert('dynamicproduct_product_config', [
                'id_product' => (int) $id_product['id_product'],
                'data' => pSQL(json_encode($data, JSON_NUMERIC_CHECK)),
            ]);

            if (!$result) {
                throw new PrestaShopException('Error while inserting data into dynamicproduct_product_config table');
            }
        }
    }

    return true;
}
