<?php

namespace PrestaShop\PrestaShop\Adapter\Supplier;

use PrestaShop\PrestaShop\Core\Business\Product\Search\ProductSearchProviderInterface;
use PrestaShop\PrestaShop\Core\Business\Product\Search\ProductSearchContext;
use PrestaShop\PrestaShop\Core\Business\Product\Search\ProductSearchQuery;
use PrestaShop\PrestaShop\Core\Business\Product\Search\ProductSearchResult;
use PrestaShop\PrestaShop\Core\Business\Product\Search\Pagination;
use PrestaShop\PrestaShop\Core\Business\Product\Search\SortOrderFactory;
use PrestaShop\PrestaShop\Adapter\Translator;
use Supplier;

class SupplierProductSearchProvider implements ProductSearchProviderInterface
{
    private $translator;
    private $supplier;
    private $sortOrderFactory;

    public function __construct(
        Translator $translator,
        Supplier $supplier
    ) {
        $this->translator = $translator;
        $this->supplier = $supplier;
        $this->sortOrderFactory = new SortOrderFactory($this->translator);
    }

    private function getProductsOrCount(
        ProductSearchContext $context,
        ProductSearchQuery $query,
        $type = 'products'
    ) {
        return $this->supplier->getProducts(
            $this->supplier->id,
            $context->getIdLang(),
            $query->getPage(),
            $query->getResultsPerPage(),
            $query->getSortOrder()->toLegacyOrderBy(),
            $query->getSortOrder()->toLegacyOrderWay(),
            $type !== 'products'
        );
    }

    public function runQuery(
        ProductSearchContext $context,
        ProductSearchQuery $query
    ) {
        $products = $this->getProductsOrCount($context, $query, 'products');
        $count = $this->getProductsOrCount($context, $query, 'count');

        $result = new ProductSearchResult;
        $result->setProducts($products);

        $pagination = new Pagination;
        $pagination
            ->setTotalResultsCount($count)
            ->setResultsCount(count($products))
        ;
        $result->setPagination($pagination);

        $result->setAvailableSortOrders(
            $this->sortOrderFactory->getDefaultSortOrders()
        );

        return $result;
    }
}
