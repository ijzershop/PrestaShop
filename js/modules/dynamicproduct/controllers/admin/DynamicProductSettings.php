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
/* @noinspection PhpUnusedPrivateMethodInspection */

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\DynamicProductConfig;

class DynamicProductSettingsController extends ModuleAdminController
{
    /** @var DynamicProduct */
    public $module;
    public $action;
    public $id_product;
    public $id_default_lang;

    public function __construct()
    {
        if (empty($_POST)) {
            $_POST = json_decode(Tools::file_get_contents('php://input'), true);
            if (is_null($_POST)) {
                $_POST = [];
            }
        }
        parent::__construct();
        $this->action = Tools::getValue('action');
        $this->id_product = (int) Tools::getValue('id_product');
        $this->id_default_lang = (int) Configuration::get('PS_LANG_DEFAULT');
    }

    public function postProcess()
    {
        $source = basename(__FILE__, '.php');
        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if (DynamicContext::getEmployeeProfileId() !== 1 && in_array($this->id_product, $restricted)) {
            exit(json_encode([
                'error' => true,
                'message' => $this->module->l('This product is for viewing only!', $source),
            ]));
        }

        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }

        exit;
    }

    protected function processGetActiveProducts()
    {
        $products = DynamicProductConfig::getActiveProductsWithLabels($this->id_default_lang);
        exit(json_encode(['products' => $products]));
    }

    protected function processAddProductToOrder()
    {
        $id_order = (int) Tools::getValue('id_order');
        $id_product = (int) Tools::getValue('id_product');
        $id_attribute = (int) Tools::getValue('id_attribute');
        $id_input = (int) Tools::getValue('id_input');
        $quantity = (int) Tools::getValue('quantity', 1);

        $order = new Order($id_order);
        $id_cart = $order->id_cart;

        $input = new DynamicInput($id_input);
        $product = new Product($id_product, true, DynamicContext::getLanguageId());

        $id_customization_field = $this->module->handler->addCustomField($id_product);

        Db::getInstance()->insert('customization', [
            'id_product' => $id_product,
            'id_product_attribute' => $id_attribute,
            'id_cart' => $id_cart,
            'quantity' => $quantity,
            'in_cart' => 1,
        ]);
        $id_customization = (int) Db::getInstance()->Insert_ID();

        Db::getInstance()->insert('customized_data', [
            'id_customization' => $id_customization,
            'type' => ProductCore::CUSTOMIZE_TEXTFIELD,
            'value' => $id_input,
            'index' => $id_customization_field,
            'price' => $input->price,
            'weight' => $input->weight,
            'id_module' => $this->module->id,
        ]);

        $input->id_customization = $id_customization;
        $input->save();

        Db::getInstance()->insert('cart_product', [
            'id_cart' => $id_cart,
            'id_shop' => $order->id_shop,
            'id_address_delivery' => $order->id_address_delivery,
            'id_product' => $id_product,
            'id_product_attribute' => $id_attribute,
            'id_customization' => $id_customization,
            'quantity' => $quantity,
        ]);

        $product_price = Product::getPriceStatic(
            $id_product,
            false,
            $id_attribute,
            6,
            null,
            false,
            false,
            $quantity
        );

        $price_tax_incl = Product::getPriceStatic(
            $id_product,
            true,
            $id_attribute,
            6,
            null,
            false,
            false,
            $quantity,
            false,
            null,
            $id_cart,
            null,
            $specific_price_output,
            true,
            true,
            null,
            true,
            $id_customization
        );

        $id_order_invoice = (int) Db::getInstance()->getValue('
            SELECT id_order_invoice 
            FROM ' . _DB_PREFIX_ . 'order_invoice 
            WHERE id_order = ' . $id_order
        );

        Db::getInstance()->insert('order_detail', [
            'id_order' => $id_order,
            'id_order_invoice' => $id_order_invoice,
            'id_shop' => $order->id_shop,
            'product_id' => $id_product,
            'product_attribute_id' => $id_attribute,
            'product_name' => $product->name,
            'product_quantity' => $quantity,
            'product_price' => $product_price,
            'product_weight' => $input->weight,
            'product_reference' => $product->reference,
            'product_supplier_reference' => $product->supplier_reference,
            'id_customization' => $id_customization,

            'unit_price_tax_incl' => $price_tax_incl,
            'unit_price_tax_excl' => $product_price,

            'total_price_tax_incl' => $price_tax_incl * $quantity,
            'total_price_tax_excl' => $product_price * $quantity,
        ]);

        $products = $order->getProductsDetail();
        $totalProductsWithTaxes = array_reduce($products, function ($carry, $product) {
            return $carry + $product['total_price_tax_incl'];
        }, 0);
        $totalProductsWithoutTaxes = array_reduce($products, function ($carry, $product) {
            return $carry + $product['total_price_tax_excl'];
        }, 0);

        Db::getInstance()->update('orders', [
            'total_products_wt' => $totalProductsWithoutTaxes,
            'total_products' => $totalProductsWithTaxes,
            'total_paid_tax_incl' => $totalProductsWithTaxes,
            'total_paid_tax_excl' => $totalProductsWithoutTaxes,
        ], 'id_order = ' . $id_order);

        Db::getInstance()->update('order_invoice', [
            'total_products_wt' => $totalProductsWithoutTaxes,
            'total_products' => $totalProductsWithTaxes,
            'total_paid_tax_incl' => $totalProductsWithTaxes,
            'total_paid_tax_excl' => $totalProductsWithoutTaxes,
        ], 'id_order = ' . $id_order);

        exit(json_encode([
            'success' => true,
            'id_customization' => $id_customization,
        ]));
    }
}
