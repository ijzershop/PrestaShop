<?php

use PrestaShop\PrestaShop\Core\Business\Product\ProductPresenter;
use PrestaShop\PrestaShop\Core\Business\Product\ProductPresentationSettings;
use PrestaShop\PrestaShop\Core\Business\Product\Search\ProductSearchQuery;
use PrestaShop\PrestaShop\Core\Business\Product\Search\ProductSearchContext;
use PrestaShop\PrestaShop\Core\Business\Product\Search\Facet;
use PrestaShop\PrestaShop\Core\Business\Product\Search\SortOrder;
use PrestaShop\PrestaShop\Core\Business\Product\Search\ProductSearchProviderInterface;

/**
 * This class is the base class for all front-end "product listing" controllers,
 * like "CategoryController", that is, controllers whose primary job is
 * to display a list of products and filters to make navigation easier.
 */
abstract class ProductListingFrontControllerCore extends ProductPresentingFrontController
{
    /**
     * This method is used by "prepareProductForTemplate" to add missing fields
     * to the product array.
     * The minimal fields that must be contained in $rawProduct is "id_product".
     * You should not need to use this method directly.
     *
     * @internal
     * @param array $rawProduct an associative array with at least the "id_product" key
     * @return array
     */
    private function addMissingProductFields(array $rawProduct)
    {
        $id_shop = (int)$this->getProductSearchContext()->getIdShop();
        $id_lang = (int)$this->getProductSearchContext()->getIdLang();
        $id_product = (int)$rawProduct['id_product'];
        $prefix = _DB_PREFIX_;

        $nb_days_new_product = (int)Configuration::get('PS_NB_DAYS_NEW_PRODUCT');
        if (!Validate::isUnsignedInt($nb_days_new_product)) {
            $nb_days_new_product = 20;
        }
        $now = date('Y-m-d') . ' 00:00:00';

        $sql = "SELECT
                    p.*,
                    pl.*,
                    (DATE_SUB('$now', INTERVAL $nb_days_new_product DAY) > 0) as new
                FROM {$prefix}product p
                INNER JOIN {$prefix}product_lang pl
                    ON pl.id_product = p.id_product
                    AND pl.id_shop = $id_shop
                    AND pl.id_lang = $id_lang
                    AND p.id_product = $id_product";

        $rows = Db::getInstance()->executeS($sql);
        return array_merge($rows[0], $rawProduct);
    }

    /**
     * Takes an associative array with at least the "id_product" key
     * and returns an array containing all information necessary for
     * rendering the product in the template.
     *
     * @param  array  $rawProduct an associative array with at least the "id_product" key
     * @return array  a product ready for templating
     */
    private function prepareProductForTemplate(array $rawProduct)
    {
        $enrichedProduct = $this->addMissingProductFields(
            $rawProduct
        );

        $product = Product::getProductProperties(
            $this->getProductSearchContext()->getIdLang(),
            $enrichedProduct,
            $this->context
        );

        $presenter = $this->getProductPresenter();
        $settings = $this->getProductPresentationSettings();

        return $presenter->presentForListing(
            $settings,
            $product,
            $this->context->language
        );
    }

    protected function prepareProductsForTemplate(array $products)
    {
        return array_map([$this, 'prepareProductForTemplate'], $products);
    }

    protected function getProductSearchContext()
    {
        return (new ProductSearchContext)
            ->setIdShop($this->context->shop->id)
            ->setIdLang($this->context->language->id)
        ;
    }

    protected function prepareFacetForTemplate(Facet $facet)
    {
        $facetsArray = $facet->toArray();
        foreach ($facetsArray['filters'] as &$filter) {
            if ($filter['nextEncodedFacets']) {
                $filter['nextEncodedFacetsURL'] = $this->makeURL([
                    'q' => $filter['nextEncodedFacets'],
                    'page' => null
                ]);
            } else {
                $filter['nextEncodedFacetsURL'] = $this->makeURL([
                    'q' => null
                ]);
            }
        }
        unset($filter);
        return $facetsArray;
    }

    protected function renderFacets(array $facets)
    {
        $facetsVar = array_map([$this, 'prepareFacetForTemplate'], $facets);

        return $this->render('catalog/_partials/facets.tpl', [
            'facets'        => $facetsVar,
            'jsEnabled'     => $this->ajax
        ]);
    }

    private function getProductSearchProviderFromModules($query)
    {
        $providers = Hook::exec(
            'productSearchProvider',
            ['query' => $query],
            null,
            true
        );

        if (!is_array($providers)) {
            $providers = [];
        }

        foreach ($providers as $provider) {
            if ($provider instanceof ProductSearchProviderInterface) {
                return $provider;
            }
        }

        return null;
    }

    protected function getProductSearchVariables()
    {
        $context    = $this->getProductSearchContext();
        $query      = $this->getProductSearchQuery();
        $provider   = $this->getProductSearchProviderFromModules($query);

        if (null === $provider) {
            $provider = $this->getDefaultProductSearchProvider();
        }

        $query
            ->setResultsPerPage(Configuration::get('PS_PRODUCTS_PER_PAGE'))
            ->setPage(max((int)Tools::getValue('page'), 1))
        ;

        if (($encodedSortOrder = Tools::getValue('order'))) {
            $query->setSortOrder(SortOrder::fromURLParameter(
                $encodedSortOrder
            ));
        }

        $encodedFacets = Tools::getValue('q');
        $provider->addFacetsToQuery(
            $context,
            $encodedFacets,
            $query
        );

        $result   = $provider->runQuery(
            $context,
            $query
        );

        $products = $this->prepareProductsForTemplate(
            $result->getProducts()
        );

        $ps_search_filters = $this->renderFacets(
            $result->getNextQuery()->getFacets()
        );

        $pagination = array_map(function ($link) {
            $link['url'] = $this->makeURL([
                'page'  => $link['page']
            ]);
            return $link;
        }, $result->getPaginationResult()->buildLinks());

        $ps_search_sort_order = $query->getSortOrder()->getURLParameter();

        $sort_orders = array_map(function ($sortOrder) use ($ps_search_sort_order) {
            $order = $sortOrder->toArray();
            $order['current'] = $order['urlParameter'] === $ps_search_sort_order;
            $order['url'] = $this->makeURL([
                'order' => $order['urlParameter'],
                'page'  => null
            ]);
            return $order;
        }, $result->getAvailableSortOrders());

        return [
            'products'          => $products,
            'sort_orders'       => $sort_orders,
            'pagination'        => $pagination,
            'ps_search_filters' => $ps_search_filters,
            'ps_search_encoded_facets' => $result->getEncodedFacets(),
            'ps_search_sort_order' => $ps_search_sort_order,
            'jsEnabled'         => $this->ajax
        ];
    }

    protected function getRenderedProductSearchWidgets()
    {
        $search = $this->getProductSearchVariables();

        $products = $this->render('catalog/products.tpl', $search);

        $data = [
            'products'            => $products,
            'ps_search_filters'   => $search['ps_search_filters'],
            'current_url'         => $this->makeURL([
                'q' => $search['ps_search_encoded_facets']
            ])
        ];

        return $data;
    }

    abstract protected function getProductSearchQuery();
    abstract protected function getDefaultProductSearchProvider();
}
