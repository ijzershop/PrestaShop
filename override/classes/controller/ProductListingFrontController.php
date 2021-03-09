
<?php
/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
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
        //Fetch dynamic product price when product price amount is 0
        foreach ($search['products'] as $product) {
            if($product->price_amount == 0){
                $dynModule = Module::getInstanceByName('modernesmiddynamicproduct');
                $data = $dynModule::fetchDefaultDynamicProductPrice($product, $product->id_attribute);
                if(array_key_exists('formatted_prices', $data) && array_key_exists('final_prices', $data) && array_key_exists('unit_prices', $data)){
                   $product->price = $data['formatted_prices']['price_ttc'];
                   $product->price_amount = $data['final_prices']['price_ttc'];
                   $product->regular_price = $data['formatted_prices']['price_ttc'];
                   $product->regular_price_amount = $data['unit_prices']['price_ttc_nr'];
                   $product->unit_price = $data['unit_prices']['price_ttc'];
                }
            }
        }

        $rendered_products_top = $this->render('catalog/_partials/products-top', array('listing' => $search));
        $rendered_products = $this->render('catalog/_partials/products', array('listing' => $search));
        $rendered_products_bottom = $this->render('catalog/_partials/products-bottom', array('listing' => $search));

        $data = array_merge(
            array(
                'rendered_products_top' => $rendered_products_top,
                'rendered_products' => $rendered_products,
                'rendered_products_bottom' => $rendered_products_bottom,
            ),
            $search
        );

        if (!empty($data['products']) && is_array($data['products'])) {
            $data['products'] = $this->prepareProductArrayForAjaxReturn($data['products']);
        }

        return $data;
    }
}
