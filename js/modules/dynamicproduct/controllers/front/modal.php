<?php
/**
 * 2007-2025 TuniSoft
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
 * @copyright 2007-2025 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\controllers\front\DynamicFrontController;
use DynamicProduct\classes\helpers\ScriptsHelper;
use DynamicProduct\classes\models\DynamicEquation;
use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\lib\media\DynamicEntriesHelper;

/** @noinspection PhpUnused */
class DynamicProductModalModuleFrontController extends DynamicFrontController
{
    /** @noinspection PhpUnused */
    protected function processLoadModal()
    {
        $id_product = (int) Tools::getValue('id_product');
        if (!$id_product) {
            $this->respond([
                'ok' => false,
                'message' => 'Missing product id.',
            ]);
        }

        $product = new Product($id_product, true, $this->context->language->id, $this->context->shop->id);
        if (!Validate::isLoadedObject($product)) {
            $this->respond([
                'ok' => false,
                'message' => 'Invalid product.',
            ]);
        }

        $dp_config = DynamicProductConfig::getByProduct($id_product);
        if (!$dp_config->active) {
            $this->respond([
                'ok' => false,
                'message' => 'Dynamic product not active.',
            ]);
        }

        $id_attribute = (int) Tools::getValue('id_product_attribute');
        if (!$id_attribute) {
            $id_attribute = (int) Product::getDefaultAttribute($id_product);
        }

        $input = DynamicInput::getInputByCustomization(0);
        $dynamicPrices = $product->getDynamicBasePrice();

        $product_data = [
            'id' => $id_product,
            'id_cart' => Context::getContext()->cart->id,
            'id_customer' => $this->context->customer->id,
            'id_product' => $id_product,
            'id_product_attribute' => $id_attribute,
            'id_customization' => 0,
            'minimal_quantity' => (int) $product->minimal_quantity,
            'quantity_wanted' => (int) $product->minimal_quantity,
            'name' => $product->name,
            'dynamic_product_tax' => Tools::getContextLocale($this->context)->formatPrice($dynamicPrices['unit_prices']['price_ttc'] - $dynamicPrices['unit_prices']['price_ht'],  'EUR'),
            'dynamic_product_customization_price' => Tools::getContextLocale($this->context)->formatPrice($dynamicPrices['customization_prices']['price_ht'],  'EUR'),
            'dynamic_prices' => $dynamicPrices,
            'price_tax_excl' => Tools::getContextLocale($this->context)->formatPrice($product->getPriceWithoutReduct(true), 'EUR'),
            'price' => Tools::getContextLocale($this->context)->formatPrice($product->getPriceWithoutReduct(false), 'EUR'),
            'product_tax' => Tools::getContextLocale($this->context)->formatPrice($product->getPriceWithoutReduct(false) - $product->getPriceWithoutReduct(true), 'EUR'),
            'input' => $input,
        ];

        $this->context->smarty->assign([
            'product' => $product_data,
            'static_token' => Tools::getToken(false),
            'link' => $this->context->link,
            'configuration' => [
                'is_catalog' => (bool) Configuration::isCatalogMode(),
            ],
        ]);

        $this->context->smarty->assign([
            'product' => $product_data,
            'static_token' => Tools::getToken(false),
            'link' => $this->context->link,
            'configuration' => [
                'is_catalog' => (bool) Configuration::isCatalogMode(),
            ],
        ]);

//        dd($product_data);

        $html = $this->context->smarty->fetch(
            'module:dynamicproduct/views/templates/hook/dynamicproduct-modal-content.tpl'
        );

        $vars = $this->module->loader->getFrontProductVars();
        $assets = ScriptsHelper::getAssets($vars['dp_vars']['grouped_fields']);
        $entries_helper = new DynamicEntriesHelper($this->module, $this->context);
        $entry = $entries_helper->getEntry('src/main.ts', 'product');
        $entry_css = $entries_helper->getCSS('src/main.ts', 'product') ?: [];

        $base_uri = $this->module->getPathUri() . 'lib/media/product/';

        $custom_js = array_map(function ($item) {
            return $item['path'];
        }, $assets['js']);
        $custom_css = array_map(function ($item) {
            return $item['path'];
        }, $assets['css']);

        $this->respond([
            'ok' => true,
            'html' => $html,
            'dp_vars' => $vars['dp_vars'],
            'user_js_defs' => DynamicEquation::getUserJsDefinitions($id_product),
            'assets' => [
                'entry' => $entry ? ($this->module->getPathUri() . $entry) : null,
                'css' => array_values(array_filter(array_merge(
                    array_map(function ($css) use ($base_uri) {
                        return $base_uri . $css;
                    }, $entry_css),
                    $custom_css
                ))),
                'js' => array_values(array_filter($custom_js)),
                'modules' => $assets['modules'],
            ],
        ]);
    }
}
