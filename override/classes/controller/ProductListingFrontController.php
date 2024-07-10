<?php
/**
 * Class ProductListingFrontController Overide fixed for 1.7.7.8
 */
use PrestaShop\PrestaShop\Core\Product\Search\Facet;
use PrestaShop\PrestaShop\Core\Product\Search\FacetsRendererInterface;
use PrestaShop\PrestaShop\Core\Product\Search\Pagination;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchContext;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchProviderInterface;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchQuery;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchResult;
use PrestaShop\PrestaShop\Core\Product\Search\SortOrder;


/**
 * This class is the base class for all front-end "product listing" controllers,
 * like "CategoryController", that is, controllers whose primary job is
 * to display a list of products and filters to make navigation easier.
 */
abstract class ProductListingFrontController extends ProductListingFrontControllerCore
{
    /**
     * Similar to "getProductSearchVariables" but used in AJAX queries.
     *
     * It returns an array with the HTML for the products and facets,
     * and the current URL to put it in the browser URL bar (we don't want to
     * break the back button!).
     *
     * @return array
     */
    protected function getAjaxProductSearchVariables()
    {
        $search = $this->getProductSearchVariables();
        /**
         * Start add module dynamic prices
         */
        foreach ($search['products'] as $key => $product) {
            if(!$this->checkIfActiveInShop($product, Context::getContext())){
                unset($search['products'][$key]);
            } else {
                if($product->price_amount == 0 && class_exists('DynamicProductController')){
                    $dynModule = new DynamicProductController();
                    $data = $dynModule->getDefaultDynamicProductPrices($product, $product->id_attribute);

                    if(array_key_exists('formatted_prices', $data) && array_key_exists('final_prices', $data) && array_key_exists('unit_prices', $data)){
                        $product->price = $data['formatted_prices']['price_ttc'];
                        $product->price_amount = $data['final_prices']['price_ttc'];
                        $product->regular_price = $data['formatted_prices']['price_ttc'];
                        $product->regular_price_amount = $data['unit_prices']['price_ttc_nr'];
                        $product->unit_price = $data['unit_prices']['price_ttc'];
                    }
                }
            }
        }


        /**
         * End add module dynamic prices
         */
        $rendered_products_top = $this->render('catalog/_partials/products-top', ['listing' => $search]);
        $rendered_products = $this->render('catalog/_partials/products', ['listing' => $search]);
        $rendered_products_bottom = $this->render('catalog/_partials/products-bottom', ['listing' => $search]);

        $data = array_merge(
            [
                'rendered_products_top' => $rendered_products_top,
                'rendered_products' => $rendered_products,
                'rendered_products_bottom' => $rendered_products_bottom,
            ],
            $search
        );


        if (!empty($data['products']) && is_array($data['products'])) {
            $data['products'] = $this->prepareProductArrayForAjaxReturn($data['products']);
        }

        return $data;
    }

    private function checkIfActiveInShop($product, $context){

        $db = Db::getInstance(_PS_USE_SQL_SLAVE_);

        $query = 'SELECT COUNT(id_product) as active FROM `' . _DB_PREFIX_ . 'product_shop` ps 
        INNER JOIN `' . _DB_PREFIX_ . 'category_shop` cs ON ps.`id_shop` = cs.`id_shop` WHERE ps.`id_shop` = ' . (int) $context->shop->id .
            ' AND ps.`id_product` = ' . $product['id_product'] . ' ' .
            ' AND ps.`active` = 1 ' .
            ' AND ps.`visibility` IN ("both", "search");';


        $result = $db->executeS($query);

        return  boolval($result[0]['active']);
    }

}
