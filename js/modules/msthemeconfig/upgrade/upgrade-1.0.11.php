<?php
/**
 * Module upgrade: 1.0.11
 *
 * Makes existing offer packs move both their own stock and the stock of the
 * products contained in the pack.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

use PrestaShop\PrestaShop\Core\Domain\Product\Pack\ValueObject\PackStockType;

function upgrade_module_1_0_11(Module $module): bool
{
    $stockType = (int) PackStockType::STOCK_TYPE_BOTH;
    $db = Db::getInstance();

    $productShopUpdated = $db->execute(
        'UPDATE `' . _DB_PREFIX_ . 'product_shop` ps
         INNER JOIN `' . _DB_PREFIX_ . 'product` p ON p.`id_product` = ps.`id_product`
         SET ps.`pack_stock_type` = ' . $stockType . '
         WHERE p.`id_oi_offer` > 0'
    );

    $productUpdated = $db->execute(
        'UPDATE `' . _DB_PREFIX_ . 'product`
         SET `pack_stock_type` = ' . $stockType . '
         WHERE `id_oi_offer` > 0'
    );

    return $productShopUpdated && $productUpdated;
}
