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

namespace PrestaShop\PrestaShop\Adapter\Product;

use PrestaShop\PrestaShop\Adapter\AbstractObjectModelRepository;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\Exception\CannotBulkDeleteProductSupplierException;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\Exception\CannotDeleteProductSupplierException;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\ValueObject\ProductSupplierId;
use ProductSupplier;

/**
 * Deletes Product using legacy object model
 */
final class ProductSupplierDeleter extends AbstractObjectModelRepository
{
    /**
     * @var ProductSupplierRepository
     */
    private $productSupplierRepository;

    /**
     * @param ProductSupplierRepository $productSupplierRepository
     */
    public function __construct(
        ProductSupplierRepository $productSupplierRepository
    ) {
        $this->productSupplierRepository = $productSupplierRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function delete(ProductSupplierId $productSupplierId): void
    {
        $this->performDelete($this->productSupplierRepository->get($productSupplierId));
    }

    /**
     * {@inheritdoc}
     */
    public function bulkDelete(array $productSupplierIds): void
    {
        $failedIds = [];
        foreach ($productSupplierIds as $productSupplierId) {
            try {
                $this->performDelete($this->productSupplierRepository->get($productSupplierId));
            } catch (CannotDeleteProductSupplierException $e) {
                $failedIds[] = $productSupplierId->getValue();
            }
        }

        if (empty($failedIds)) {
            return;
        }

        throw new CannotBulkDeleteProductSupplierException($failedIds, sprintf(
            'Failed to delete following product suppliers: %s',
            implode(', ', $failedIds)
        ));
    }

    /**
     * @param ProductSupplier $productSupplier
     *
     * @throws CannotDeleteProductSupplierException
     */
    private function performDelete(ProductSupplier $productSupplier): void
    {
        $this->deleteObjectModel($productSupplier, CannotDeleteProductSupplierException::class);
    }
}
