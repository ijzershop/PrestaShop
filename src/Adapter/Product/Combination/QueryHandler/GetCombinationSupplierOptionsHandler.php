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

namespace PrestaShop\PrestaShop\Adapter\Product\Combination\QueryHandler;

use PrestaShop\PrestaShop\Adapter\Product\Combination\Repository\CombinationRepository;
use PrestaShop\PrestaShop\Adapter\Product\QueryHandler\AbstractSupplierOptionsHandler;
use PrestaShop\PrestaShop\Adapter\Product\Repository\ProductRepository;
use PrestaShop\PrestaShop\Adapter\Product\Repository\ProductSupplierRepository;
use PrestaShop\PrestaShop\Core\Domain\Product\Combination\Query\GetCombinationSupplierOptions;
use PrestaShop\PrestaShop\Core\Domain\Product\Combination\QueryHandler\GetCombinationSupplierOptionsHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Product\Combination\QueryResult\CombinationSupplierOptions;
use PrestaShop\PrestaShop\Core\Domain\Product\ValueObject\ProductId;

final class GetCombinationSupplierOptionsHandler extends AbstractSupplierOptionsHandler implements GetCombinationSupplierOptionsHandlerInterface
{
    /**
     * @var CombinationRepository
     */
    private $combinationRepository;

    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * @param ProductSupplierRepository $productSupplierRepository
     * @param CombinationRepository $combinationRepository
     * @param ProductRepository $productRepository
     */
    public function __construct(
        ProductSupplierRepository $productSupplierRepository,
        CombinationRepository $combinationRepository,
        ProductRepository $productRepository
    ) {
        parent::__construct($productSupplierRepository);
        $this->combinationRepository = $combinationRepository;
        $this->productRepository = $productRepository;
    }

    public function handle(GetCombinationSupplierOptions $query): CombinationSupplierOptions
    {
        $combination = $this->combinationRepository->get($query->getCombinationId());
        $productId = new ProductId((int) $combination->id_product);
        $product = $this->productRepository->get($productId);

        return new CombinationSupplierOptions(
            (int) $product->id_supplier,
            $this->getProductSuppliersInfo($productId, $query->getCombinationId())
        );
    }
}
