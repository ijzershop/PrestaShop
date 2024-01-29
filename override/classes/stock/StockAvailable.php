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
    /**
     * For a given id_product and id_product_attribute updates the quantity available
     * If $avoid_parent_pack_update is true, then packs containing the given product won't be updated.
     *
     * @param int $id_product
     * @param int $id_product_attribute Optional
     * @param int $delta_quantity The delta quantity to update
     * @param int $id_shop Optional
     * @param bool $add_movement Optional
     * @param array $params Optional
     */
    public static function updateQuantity($id_product, $id_product_attribute, $delta_quantity, $id_shop = null, $add_movement = false, $params = [])
    {
        if (!Validate::isUnsignedId($id_product)) {
            return false;
        }
        $product = new Product((int)$id_product);
        if (!Validate::isLoadedObject($product)) {
            return false;
        }
        $stockManager = ServiceLocator::get('\\MsThemeConfig\\Core\\Stock\\StockManager');
        $stockManager->updateQuantity($product, $id_product_attribute, $delta_quantity, $id_shop, $add_movement, $params);

        return true;
    }
}
