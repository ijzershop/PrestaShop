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

declare(strict_types=1);

namespace PrestaShop\PrestaShop\Adapter\Product\CommandHandler;

use PrestaShop\PrestaShop\Adapter\Product\AbstractProductSupplierHandler;
use PrestaShop\PrestaShop\Adapter\Product\ProductUpdater;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\Command\RemoveAllAssociatedProductSuppliersCommand;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\CommandHandler\RemoveAllAssociatedProductSuppliersHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\ProductSupplierDeleterInterface;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\ValueObject\ProductSupplierId;
use ProductSupplier;

/**
 * Handles @see RemoveAllAssociatedProductSuppliersCommand using legacy object model
 */
final class RemoveAllAssociatedProductSuppliersHandler extends AbstractProductSupplierHandler implements RemoveAllAssociatedProductSuppliersHandlerInterface
{
    /**
     * @var ProductSupplierDeleterInterface
     */
    private $productSupplierDeleter;

    /**
     * @var ProductUpdater
     */
    private $productUpdater;

    /**
     * @param ProductSupplierDeleterInterface $productSupplierDeleter
     * @param ProductUpdater $productUpdater
     */
    public function __construct(
        ProductSupplierDeleterInterface $productSupplierDeleter,
        ProductUpdater $productUpdater
    ) {
        $this->productSupplierDeleter = $productSupplierDeleter;
        $this->productUpdater = $productUpdater;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(RemoveAllAssociatedProductSuppliersCommand $command): void
    {
        $product = $this->getProduct($command->getProductId());

        $productSupplierIds = [];
        foreach (ProductSupplier::getSupplierCollection($product->id) as $productSupplier) {
            $productSupplierIds[] = new ProductSupplierId((int) $productSupplier->id);
        }

        $this->productSupplierDeleter->bulkDelete($productSupplierIds);
        $this->productUpdater->resetDefaultSupplier($product);
    }
}
