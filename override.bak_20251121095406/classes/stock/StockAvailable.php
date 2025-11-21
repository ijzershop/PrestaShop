<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
use PrestaShop\PrestaShop\Adapter\ServiceLocator;
use PrestaShop\PrestaShop\Core\Domain\Product\Stock\StockSettings;

/**
 * Represents quantities available
 * It is either synchronized with Stock or manualy set by the seller.
 *
 * @since 1.5.0
 */
class StockAvailable extends StockAvailableCore
{
//    /**
//     * For a given id_product and id_product_attribute updates the quantity available
//     * If $avoid_parent_pack_update is true, then packs containing the given product won't be updated.
//     *
//     * @param int $id_product
//     * @param int $id_product_attribute Optional
//     * @param int $delta_quantity The delta quantity to update
//     * @param int $id_shop Optional
//     * @param bool $add_movement Optional
//     * @param array $params Optional
//     */
//    public static function updateQuantity($id_product, $id_product_attribute, $delta_quantity, $id_shop = null, $add_movement = false, $params = [])
//    {
//        if (!Validate::isUnsignedId($id_product)) {
//            return false;
//        }
//        $product = new Product((int)$id_product);
//        if (!Validate::isLoadedObject($product)) {
//            return false;
//        }
//        $stockManager = ServiceLocator::get('\\MsThemeConfig\\Core\\Stock\\StockManager');
//        $stockManager->updateQuantity($product, $id_product_attribute, $delta_quantity, $id_shop, $add_movement, $params);
//
//        return true;
//    }
//
//
//    /**
//     * For a given id_product and id_product_attribute sets the quantity available.
//     *
//     * @param int $id_product
//     * @param int $id_product_attribute
//     * @param int $quantity
//     * @param int|null $id_shop
//     * @param bool $add_movement
//     *
//     * @return bool|void
//     */
//    public static function setQuantity($id_product, $id_product_attribute, $quantity, $id_shop = null, $add_movement = true)
//    {
//        if (!Validate::isUnsignedId($id_product)) {
//            return false;
//        }
//        $context = Context::getContext();
//        // if there is no $id_shop, gets the context one
//        if ($id_shop === null && Shop::getContext() != Shop::CONTEXT_GROUP) {
//            $id_shop = (int) $context->shop->id;
//        }
//        $depends_on_stock = StockAvailable::dependsOnStock($id_product);
//        //Try to set available quantity if product does not depend on physical stock
//        if (!$depends_on_stock) {
//            $stockManager = ServiceLocator::get('\\PrestaShop\\PrestaShop\\Core\\Stock\\StockManager');
//
//            $id_stock_available = (int) StockAvailable::getStockAvailableIdByProductId($id_product, $id_product_attribute, $id_shop);
//            if ($id_stock_available) {
//                $stock_available = new StockAvailable($id_stock_available);
//
//                $deltaQuantity = (int) $quantity - (int) $stock_available->quantity;
//
//                if($quantity > 2147483647 || $quantity < -2147483647){
//                    $quantity = 2147483647;
//                }
//
//                $stock_available->quantity = (int) $quantity;
//                $stock_available->update();
//
//                if (true === $add_movement && 0 != $deltaQuantity) {
//                    $stockManager->saveMovement($id_product, $id_product_attribute, $deltaQuantity);
//                }
//            } else {
//                $out_of_stock = StockAvailable::outOfStock($id_product, $id_shop);
//                $stock_available = new StockAvailable();
//                $stock_available->out_of_stock = (int) $out_of_stock;
//                $stock_available->id_product = (int) $id_product;
//                $stock_available->id_product_attribute = (int) $id_product_attribute;
//
//                if($quantity > 2147483647 || $quantity < -2147483647){
//                    $quantity = 2147483647;
//                }
//
//                $stock_available->quantity = (int) $quantity;
//                if ($id_shop === null) {
//                    $shop_group = Shop::getContextShopGroup();
//                } else {
//                    $shop_group = new ShopGroup((int) Shop::getGroupFromShop((int) $id_shop));
//                }
//                // if quantities are shared between shops of the group
//                if ($shop_group->share_stock) {
//                    $stock_available->id_shop = 0;
//                    $stock_available->id_shop_group = (int) $shop_group->id;
//                } else {
//                    $stock_available->id_shop = (int) $id_shop;
//                    $stock_available->id_shop_group = 0;
//                }
//                $stock_available->add();
//
//                if (true === $add_movement && 0 != $quantity) {
//                    $stockManager->saveMovement($id_product, $id_product_attribute, (int) $quantity);
//                }
//            }
//
//            Hook::exec(
//                'actionUpdateQuantity',
//                [
//                    'id_product' => $id_product,
//                    'id_product_attribute' => $id_product_attribute,
//                    'quantity' => $stock_available->quantity,
//                    'delta_quantity' => $deltaQuantity ?? null,
//                    'id_shop' => $id_shop,
//                ]
//            );
//        }
//        Cache::clean('StockAvailable::getQuantityAvailableByProduct_' . (int) $id_product . '*');
//    }
}
