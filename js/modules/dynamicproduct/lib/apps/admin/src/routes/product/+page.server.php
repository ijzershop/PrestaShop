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
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\classes\models\DynamicProductConfigCategoryLink;
use DynamicProduct\classes\models\DynamicProductConfigLink;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    return [
        'product_config' => DynamicProductConfig::getByProduct($id_product)->getConfig(),
    ];
}

class Actions
{
    public static $module;

    public static function default()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $def = DynamicProductConfig::$definition['schema'];
        $product_config = DynamicProductConfig::getByProduct($id_product);
        foreach ($def as $key => $info) {
            if (!\Tools::getIsset($key)) {
                continue;
            }
            $value = \Tools::getValue($key, $product_config->$key);
            $product_config->$key =
              $info['type'] === \ObjectModelCore::TYPE_BOOL ?
                (bool) $value :
                \ObjectModelCore::formatValue($value, $info['type']);
        }
        $product_config->save();

        return $product_config->getConfig();
    }

    public static function unlink_config()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('action_value');
        DynamicProductConfigLink::removeLink($id_product);

        return [
            'reload' => true,
            'message' => self::$module->l('Are you sure you want to unlink this configuration?', $source),
        ];
    }

    public static function copy_config()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('action_value');
        $id_source_product = (int) \Tools::getValue('id_product');

        DynamicProductConfigLink::removeLink($id_product);
        self::$module->handler->copyConfig($id_product, $id_source_product);

        return [
            'reload' => true,
            'message' => self::$module->l('Configuration copied successfully', $source),
        ];
    }

    public static function unlink_configs()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('id_product');

        DynamicProductConfigLink::removeLinks($id_product);
        DynamicProductConfigCategoryLink::removeLink($id_product);

        return [
            'reload' => true,
            'message' => self::$module->l('Configurations unlinked successfully', $source),
        ];
    }

    public static function search_products()
    {
        $query = \Tools::getValue('query');

        function add_dynamic_flag($products)
        {
            $ids = join(',', array_map('intval', array_column($products, 'id_product')));
            $dynamic_products = \Db::getInstance()->executeS('
        SELECT id_product 
        FROM ' . _DB_PREFIX_ . 'dynamicproduct_product_config 
        WHERE id_product IN (' . $ids . ') AND data LIKE \'%\"active\":true%\'
      ');
            $dynamic_products = array_column($dynamic_products, 'id_product');
            foreach ($products as &$product) {
                $product['dynamic'] = in_array($product['id_product'], $dynamic_products);
            }

            return $products;
        }

        if (is_numeric($query)) {
            $products = \Db::getInstance()->executeS('
        SELECT p.id_product, pl.name
        FROM ' . _DB_PREFIX_ . 'product p
        JOIN ' . _DB_PREFIX_ . 'product_lang pl
        ON p.id_product = pl.id_product
        WHERE p.id_product LIKE \'%' . (int) $query . '%\' AND pl.id_lang = ' . (int) DynamicContext::getLanguageId() . '
        LIMIT 50
      ');

            return ['products' => add_dynamic_flag($products)];
        }

        $products = \Product::searchByName(DynamicContext::getLanguageId(), $query);

        return ['products' => add_dynamic_flag($products)];
    }
}
