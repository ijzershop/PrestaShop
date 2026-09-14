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
use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\classes\models\DynamicProductConfigCategoryLink;
use DynamicProduct\classes\models\DynamicProductConfigLink;

function load(\DynamicProduct $module)
{
    $id_lang = DynamicContext::getLanguageId();

    $categories_list = \Category::getSimpleCategories($id_lang);
    $categories = [];
    foreach ($categories_list as $item) {
        $categories[(int) $item['id_category']] = $item;
    }

    return [
        'active_products' => DynamicProductConfig::getActiveProductsWithLabels($id_lang),
        'categories' => $categories,
    ];
}

class Actions
{
    public static $module;

    public static function load_product_config()
    {
        $source = basename(__FILE__, '.php');
        $id_source_product = (int) \Tools::getValue('id_source_product');
        $id_target_product = (int) \Tools::getValue('id_product');

        if (!$id_source_product) {
            return [
                'error' => true,
                'message' => self::$module->l('Please select a product to import', $source),
            ];
        }

        $link_product_config = (int) \Tools::getValue('link_product_config');
        $clear_current_config = (int) \Tools::getValue('clear_current_config');

        if ($link_product_config) {
            if ($clear_current_config) {
                self::$module->handler->clearConfig($id_target_product);
            }
            DynamicProductConfigLink::createLink($id_target_product, $id_source_product);

            return [
                'reload' => true,
                'message' => self::$module->l('Product configuration linked successfully', $source),
            ];
        } else {
            $clear_existing_items = (int) \Tools::getValue('clear_existing_items');
            $options = \Tools::getValue('options');

            DynamicProductConfigLink::removeLink($id_target_product);
            self::$module->handler->copyConfig($id_target_product, $id_source_product, $options, $clear_existing_items);

            return [
                'reload' => true,
                'message' => self::$module->l('Product configuration copied successfully', $source),
            ];
        }
    }

    public static function copy_to_category()
    {
        $source = basename(__FILE__, '.php');
        $id_source_product = (int) \Tools::getValue('id_product');
        $id_target_category = (int) \Tools::getValue('id_target_category');

        if (!$id_target_category) {
            return [
                'error' => true,
                'message' => self::$module->l('Please select a target category', $source),
            ];
        }

        $link_category_config = (int) \Tools::getValue('link_category_config');

        if ($link_category_config) {
            $existing_link = DynamicProductConfigCategoryLink::getLinkByCategory($id_target_category);
            if (is_array($existing_link) && count($existing_link) > 0) {
                return [
                    'error' => true,
                    'message' => sprintf(self::$module->l('This category is already linked to product #%d!', $source), $existing_link['id_product']),
                ];
            }

            DynamicProductConfigCategoryLink::createLink($id_source_product, $id_target_category);

            return [
                'message' => self::$module->l('The configuration was linked to the category successfully', $source),
            ];
        } else {
            $clear_existing_items = (int) \Tools::getValue('clear_existing_items');
            $options = \Tools::getValue('options');
            $category = new \Category($id_target_category);
            $products = $category->getProducts(
                DynamicContext::getLanguageId(),
                0,
                100000000,
                null,
                null,
                false,
                false,
                false,
                1,
                false
            );
            $total = count($products);
            $next = (int) \Tools::getValue('next', 0);

            $product = $products[$next];
            $id_target_product = (int) $product['id_product'];
            if ($id_target_product === $id_source_product) {
                return [
                    'next' => $next + 1,
                    'progress' => ($next + 1) / $total * 100,
                    'progress_str' => ($next + 1) . "/$total",
                ];
            }

            DynamicProductConfigCategoryLink::removeCategoryLink($id_target_category);
            self::$module->handler->copyConfig($id_target_product, $id_source_product, $options, $clear_existing_items);

            if ($next >= $total - 1) {
                return [
                    'reset' => true,
                    'progress' => 100,
                    'progress_str' => "$total/$total",
                    'message' => self::$module->l('The configuration was copied to all products in the category successfully', $source),
                ];
            }

            return [
                'next' => $next + 1,
                'progress' => ($next + 1) / $total * 100,
                'progress_str' => ($next + 1) . "/$total",
            ];
        }
    }

    public static function import_file()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('id_product');

        $uploader = new \Uploader();
        $uploader->setMaxSize(1024 * 1000 * 100);
        $uploader->setName('file');
        $uploader->setAcceptTypes(['json']);
        $file = $uploader->process();
        if (!count($file)) {
            return [
                'error' => true,
                'message' => self::$module->l('Please select a file to import', $source),
            ];
        }
        $upload = $file[0];

        if ($upload['error']) {
            return [
                'error' => true,
                'message' => $upload['error'],
            ];
        }

        $save_path = $upload['save_path'];
        $contents = \Tools::file_get_contents($save_path);
        $data = json_decode($contents, true);
        if (!$data) {
            $source = DynamicTools::getSource();

            return [
                'error' => true,
                'message' => self::$module->l('Could not import data, please check your file then try again', $source),
            ];
        }

        try {
            self::$module->handler->importConfig($id_product, $data);
        } catch (Exception $e) {
            if (_PS_MODE_DEV_) {
                throw $e;
            }

            return [
                'error' => true,
                'message' => $e->getMessage(),
            ];
        }

        return [
            'reload' => true,
            'message' => self::$module->l('Data imported successfully', $source),
        ];
    }

    public static function export_config()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $link_images = (int) \Tools::getValue('link_images');
        $data = self::$module->handler->exportConfig($id_product, $link_images);
        $filename = 'product-config-' . $id_product . '.json';
        header('Content-Type: application/json');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        echo json_encode($data);
        exit;
    }
}
