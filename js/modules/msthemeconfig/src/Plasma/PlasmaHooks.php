<?php

declare(strict_types=1);

namespace MsThemeConfig\Plasma;

final class PlasmaHooks
{
    /** Keep the surcharge after catalog/group discounts; core applies currency and taxes consistently. */
    public static function price(array $params): void
    {
        if (empty($params['id_customization']) || !empty($params['only_reduc'])) {
            return;
        }
        $row = self::customization((int) $params['id_customization'], (int) $params['id_product'],
            (int) $params['id_product_attribute'], (int) $params['id_shop']);
        if (!$row) {
            return;
        }
        $surcharge = (float) \Tools::convertPrice((float) $row['surcharge'], (int) $params['id_currency']);
        if (!empty($params['use_tax'])) {
            $taxManager = \TaxManagerFactory::getManager($params['address'],
                \Product::getIdTaxRulesGroupByIdProduct((int) $params['id_product'], $params['context']));
            $surcharge = $taxManager->getTaxCalculator()->addTaxes($surcharge);
        }
        $params['price'] += $surcharge;
    }

    /** Reject standard-cart bypasses and cross-cart customization reuse before any quantity mutation. */
    public static function guardCart(array $params): void
    {
        if (($params['operator'] ?? 'up') === 'down' || (int) ($params['quantity'] ?? 0) <= 0) {
            return;
        }
        $productId = (int) $params['product']->id;
        $shopId = (int) $params['shop']->id;
        $customizationId = (int) ($params['id_customization'] ?? 0);
        $row = $customizationId ? self::customization($customizationId, $productId, (int) $params['id_product_attribute'], $shopId) : false;
        if (!$row && !PlasmaService::enabled($productId, $shopId)) {
            return;
        }
        if (!$row || (int) $row['id_cart'] !== (int) $params['cart']->id) {
            throw new \PrestaShopException('Configure a verified plasma drawing before adding this sheet to your cart.');
        }
        $metrics = json_decode($row['metrics_json'], true);
        if (!is_array($metrics) || ($metrics['success'] ?? null) !== true || ($metrics['diagnostics']['is_safe_to_cut'] ?? null) !== true
            || ($metrics['diagnostics']['open_loops_count'] ?? null) !== 0) {
            throw new \PrestaShopException('This plasma drawing is not safe to order. Please configure it again.');
        }
    }

    private static function customization(int $customizationId, int $productId, int $attributeId, int $shopId)
    {
        // No queries to new tables before the module upgrade has installed the schema.
        if (\Configuration::getGlobalValue('MSTHEMECONFIG_PLASMA_ENABLED') === false) {
            return false;
        }
        return \Db::getInstance()->getRow('SELECT q.* FROM `' . _DB_PREFIX_ . 'plasma_quote` q
            INNER JOIN `' . _DB_PREFIX_ . 'customization` c ON c.id_customization=q.id_customization AND c.id_cart=q.id_cart
            WHERE q.id_customization=' . $customizationId . ' AND q.id_product=' . $productId
            . ' AND q.id_product_attribute=' . $attributeId . ' AND q.id_shop=' . $shopId, false);
    }

    public static function validateOrder(array $params): void
    {
        $cart = $params['cart'] ?? null;
        if (!$cart || \Configuration::getGlobalValue('MSTHEMECONFIG_PLASMA_ENABLED') === false) {
            return;
        }
        foreach ($cart->getProducts() as $product) {
            self::guardCart(['cart' => $cart, 'product' => (object) ['id' => $product['id_product']],
                'shop' => (object) ['id' => $cart->id_shop], 'id_product_attribute' => $product['id_product_attribute'],
                'id_customization' => $product['id_customization'], 'quantity' => $product['cart_quantity'], 'operator' => 'up']);
        }
    }

    public static function present(array $params): void
    {
        foreach (['presentedProduct', 'presentedProductListing'] as $key) {
            if (!isset($params[$key])) {
                continue;
            }
            $product = &$params[$key];
            $id = (int) ($product['id_product'] ?? $product['id'] ?? 0);
            if ($id && PlasmaService::enabled($id)) {
                // Native add buttons disappear; the existing saw/cut hook supplies the plasma action.
                if (is_object($product) && method_exists($product, 'offsetSet')) {
                    $product->offsetSet('add_to_cart_url', null, true);
                    $product->offsetSet('customizable', 1, true);
                    $product->offsetSet('plasma_enabled', true, true);
                    $product->offsetSet('saw_cut_enabled', true, true);
                } else {
                    $product['add_to_cart_url'] = null;
                    $product['customizable'] = 1;
                    $product['plasma_enabled'] = true;
                    $product['saw_cut_enabled'] = true;
                }
            }
        }
    }

    public static function order(array $params, \Module $module): string
    {
        $orderId = (int) ($params['id_order'] ?? 0);
        if (!$orderId || \Configuration::getGlobalValue('MSTHEMECONFIG_PLASMA_ENABLED') === false) {
            return '';
        }
        $context = \Context::getContext();
        $rows = (new PlasmaService($context))->orderFiles($orderId);
        if (!$rows) {
            return '';
        }
        foreach ($rows as &$row) {
            $parameters = ['plasma_action' => 'order_asset', 'id_order' => $orderId, 'id_customization' => (int) $row['id_customization']];
            $row['download_url'] = $context->link->getAdminLink('MsAdminPlasmaLibrary', true, [], $parameters + ['type' => 'dxf']);
            $row['preview_url'] = $context->link->getAdminLink('MsAdminPlasmaLibrary', true, [], $parameters + ['type' => 'svg']);
        }
        unset($row);
        $context->smarty->assign('plasma_order_parts', $rows);
        return $module->fetch('module:msthemeconfig/views/templates/hook/plasma_order.tpl');
    }
}
