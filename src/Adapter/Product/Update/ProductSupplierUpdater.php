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

namespace PrestaShop\PrestaShop\Adapter\Product\Update;

use PrestaShop\PrestaShop\Adapter\Product\Repository\ProductRepository;
use PrestaShop\PrestaShop\Adapter\Product\Repository\ProductSupplierRepository;
use PrestaShop\PrestaShop\Adapter\Supplier\Repository\SupplierRepository;
use PrestaShop\PrestaShop\Core\Domain\Product\Combination\ValueObject\CombinationId;
use PrestaShop\PrestaShop\Core\Domain\Product\Exception\CannotUpdateProductException;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\Exception\ProductSupplierNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Product\Supplier\ValueObject\ProductSupplierId;
use PrestaShop\PrestaShop\Core\Domain\Product\ValueObject\ProductId;
use PrestaShop\PrestaShop\Core\Domain\Supplier\ValueObject\SupplierId;
use Product;
use ProductSupplier;

/**
 * Updates product supplier relation
 */
class ProductSupplierUpdater
{
    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * @var SupplierRepository
     */
    private $supplierRepository;

    /**
     * @var ProductSupplierRepository
     */
    private $productSupplierRepository;

    /**
     * @param ProductRepository $productRepository
     * @param SupplierRepository $supplierRepository
     * @param ProductSupplierRepository $productSupplierRepository
     */
    public function __construct(
        ProductRepository $productRepository,
        SupplierRepository $supplierRepository,
        ProductSupplierRepository $productSupplierRepository
    ) {
        $this->productRepository = $productRepository;
        $this->supplierRepository = $supplierRepository;
        $this->productSupplierRepository = $productSupplierRepository;
    }

    /**
     * @param ProductId $productId
     * @param SupplierId $defaultSupplierId
     * @param ProductSupplier[] $productSuppliers
     *
     * @return ProductSupplierId[]
     */
    public function setProductSuppliers(
        ProductId $productId,
        SupplierId $defaultSupplierId,
        array $productSuppliers
    ): array {
        $this->persistProductSuppliers($productId, $productSuppliers);
        $this->updateDefaultSupplier($productId, $defaultSupplierId);

        return $this->getCurrentProductSupplierIds($productId);
    }

    /**
     * @param ProductId $productId
     * @param CombinationId $combinationId
     * @param array<int, ProductSupplier> $productSuppliers
     *
     * @return ProductSupplierId[]
     */
    public function setCombinationSuppliers(
        ProductId $productId,
        CombinationId $combinationId,
        array $productSuppliers
    ): array {
        $this->persistProductSuppliers($productId, $productSuppliers, $combinationId);

        return $this->getCurrentProductSupplierIds($productId, $combinationId);
    }

    /**
     * Removes associated product suppliers
     * If combinationId is provided, then it only removes product suppliers associated to that combination
     * If combinationId is null, then it only removes product suppliers that are not associated to any combination
     *
     * @param ProductId $productId
     * @param CombinationId|null $combinationId
     */
    public function removeAll(ProductId $productId, ?CombinationId $combinationId = null): void
    {
        $product = $this->productRepository->get($productId);
        $productSuppliersInfo = $this->productSupplierRepository->getProductSuppliersInfo($productId, $combinationId);

        $productSupplierIds = [];
        foreach ($productSuppliersInfo as $productSupplier) {
            $productSupplierIds[] = new ProductSupplierId((int) $productSupplier['id_product_supplier']);
        }

        $this->productSupplierRepository->bulkDelete($productSupplierIds);
        $this->resetDefaultSupplier($product);
    }

    /**
     * @param ProductId $productId
     * @param ProductSupplier[] $productSuppliers
     * @param CombinationId|null $combinationId
     */
    private function persistProductSuppliers(ProductId $productId, array $productSuppliers, ?CombinationId $combinationId = null): void
    {
        $deletableProductSupplierIds = $this->getDeletableProductSupplierIds($productId, $productSuppliers, $combinationId);

        foreach ($productSuppliers as $productSupplier) {
            if ($productSupplier->id) {
                $this->productSupplierRepository->update($productSupplier);
            } else {
                $this->productSupplierRepository->add($productSupplier);
            }
        }

        $this->productSupplierRepository->bulkDelete($deletableProductSupplierIds);
    }

    /**
     * @param Product $product
     */
    public function resetDefaultSupplier(Product $product): void
    {
        $product->supplier_reference = '';
        $product->wholesale_price = '0';
        $product->id_supplier = 0;

        $this->productRepository->partialUpdate(
            $product,
            ['supplier_reference', 'wholesale_price', 'id_supplier'],
            CannotUpdateProductException::FAILED_UPDATE_DEFAULT_SUPPLIER
        );
    }

    /**
     * @param ProductId $productId
     * @param SupplierId $supplierId
     */
    public function updateDefaultSupplier(ProductId $productId, SupplierId $supplierId): void
    {
        $product = $this->productRepository->get($productId);
        $supplierIdValue = $supplierId->getValue();
        $productIdValue = (int) $product->id;

        if ($product->hasCombinations()) {
            $this->resetDefaultSupplier($product);

            return;
        }

        if ((int) $product->id_supplier === $supplierIdValue) {
            return;
        }

        $this->supplierRepository->assertSupplierExists($supplierId);
        $productSupplierId = (int) ProductSupplier::getIdByProductAndSupplier($productIdValue, 0, $supplierIdValue);

        if (!$productSupplierId) {
            throw new ProductSupplierNotFoundException(sprintf(
                'Supplier #%d is not associated with product #%d', $supplierIdValue, $productIdValue
            ));
        }

        $product->supplier_reference = ProductSupplier::getProductSupplierReference($productIdValue, 0, $supplierIdValue);
        $product->wholesale_price = (string) ProductSupplier::getProductSupplierPrice($productIdValue, 0, $supplierIdValue);
        $product->id_supplier = $supplierIdValue;

        $this->productRepository->partialUpdate(
            $product,
            ['supplier_reference', 'wholesale_price', 'id_supplier'],
            CannotUpdateProductException::FAILED_UPDATE_DEFAULT_SUPPLIER
        );
    }

    /**
     * @param ProductId $productId
     * @param ProductSupplier[] $providedProductSuppliers
     * @param CombinationId|null $combinationId
     *
     * @return array<int, ProductSupplierId>
     */
    private function getDeletableProductSupplierIds(
        ProductId $productId,
        array $providedProductSuppliers,
        ?CombinationId $combinationId
    ): array {
        $existingIds = $this->getCurrentProductSupplierIds($productId, $combinationId);
        $idsForDeletion = [];

        foreach ($existingIds as $productSupplierId) {
            $idsForDeletion[$productSupplierId->getValue()] = $productSupplierId;
        }

        foreach ($providedProductSuppliers as $productSupplier) {
            $productSupplierId = (int) $productSupplier->id;

            if (isset($idsForDeletion[$productSupplierId])) {
                unset($idsForDeletion[$productSupplierId]);
            }
        }

        return $idsForDeletion;
    }

    /**
     * @param ProductId $productId
     * @param CombinationId|null $combinationId
     *
     * @return ProductSupplierId[]
     */
    private function getCurrentProductSupplierIds(ProductId $productId, ?CombinationId $combinationId = null): array
    {
        return array_map(function (array $currentSupplier): ProductSupplierId {
            return new ProductSupplierId((int) $currentSupplier['id_product_supplier']);
        }, $this->productSupplierRepository->getProductSuppliersInfo($productId, $combinationId));
    }
}
