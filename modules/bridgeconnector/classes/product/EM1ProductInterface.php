<?php
/**
 *    This file is part of eMagicOne Store Manager Bridge Connector.
 *
 *   eMagicOne Store Manager Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Store Manager Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

/**
 * Interface EM1ProductInterface
 */
interface EM1ProductInterface
{
    // Response Product Keys
    const KEY_PRODUCT                                       = 'product';
    const KEY_PRODUCTS                                      = 'products';
    const KEY_PRODUCTS_COUNT                                = 'products_count';
    const KEY_PRODUCT_ID                                    = 'product_id';
    const KEY_PRODUCT_TYPE                                  = 'product_type';
    const KEY_HAS_COMBINATION                               = 'has_combinations';
    const KEY_REFERENCE                                     = 'reference';
    const KEY_EAN13                                         = 'ean13';
    const KEY_UPC                                           = 'upc';
    const KEY_ISBN                                          = 'isbn';
    const KEY_QUANTITY                                      = 'quantity';
    const KEY_RETAIL_PRICE_WITHOUT_TAX                      = 'retail_price_without_tax';
    const KEY_FORMATTED_RETAIL_PRICE_WITHOUT_TAX            = 'formatted_retail_price_without_tax';
    const KEY_RETAIL_PRICE_WITH_TAX                         = 'retail_price_with_tax';
    const KEY_FORMATTED_RETAIL_PRICE_WITH_TAX               = 'formatted_retail_price_with_tax';
    const KEY_COST_PRICE_WITHOUT_TAX                        = 'cost_price_without_tax';
    const KEY_FORMATTED_COST_PRICE_WITHOUT_TAX              = 'formatted_cost_price_without_tax';
    const KEY_TAX_RULE                                      = 'tax_rule';
    const KEY_STATUS                                        = 'status';
    const KEY_TOTAL_ORDERED                                 = 'total_ordered';
    const KEY_LANGUAGE_VALUES                               = 'language_values';
    const KEY_LANGUAGE_ID                                   = 'language_id';
    const KEY_SHOP_ID                                       = 'shop_id';
    const KEY_PRODUCT_NAME                                  = 'product_name';
    const KEY_SHORT_DESCRIPTION                             = 'short_description';
    const KEY_DESCRIPTION                                   = 'description';
    const KEY_LINK_REWRITE                                  = 'link_rewrite';
    const KEY_IMAGES                                        = 'images';
    const KEY_IMAGE_ID                                      = 'image_id';
    const KEY_COVER                                         = 'cover';
    const KEY_POSITION                                      = 'position';
    const KEY_IMAGE_URL                                     = 'image_url';
    const KEY_SHOPS                                         = 'shops';
    const KEY_COMBINATION_COUNT                             = 'combinations_count';

    const IMAGE_NAME_TYPE_HOME                              = 'home';
    const IMAGE_NAME_TYPE_LARGE                             = 'large';
    const IMAGE_NAME_TYPE_THICKBOX                          = 'thickbox';

    const PRODUCT_TYPE_STANDARD                             = 'standard';
    const PRODUCT_TYPE_PACK                                 = 'pack';
    const PRODUCT_TYPE_VIRTUAL                              = 'virtual';
    const VALUE_PRODUCT_TYPE =  array(
        self::PRODUCT_TYPE_STANDARD,
        self::PRODUCT_TYPE_PACK,
        self::PRODUCT_TYPE_VIRTUAL
    );

    const ORDER_BY_PRODUCT_NAME                             = 'NAME';
    const ORDER_BY_QUANTITY                                 = 'QUANTITY';
    const ORDER_BY_PRICE                                    = 'PRICE';
    const ORDER_BY_STATUS                                   = 'STATUS';

    const KEY_ORDER_BY                                      = array(
        self::ORDER_BY_PRODUCT_NAME     =>     'pl.`name`',
        self::ORDER_BY_QUANTITY         =>     'sa.`quantity`',
        self::ORDER_BY_PRICE            =>     'p.`price`',
        self::ORDER_BY_STATUS           =>     'product_shop.`active`',
    );

    const ORDER_BY_DIRECTION_ASC                             = 'ASC';
    const ORDER_BY_DIRECTION_DESC                            = 'DESC';

    const KEY_ORDER_BY_DIRECTION = array(
        self::ORDER_BY_DIRECTION_ASC  => self::ORDER_BY_DIRECTION_ASC,
        self::ORDER_BY_DIRECTION_DESC => self::ORDER_BY_DIRECTION_DESC
    );

    /**
     * @param $pageSize
     * @param $pageIndex
     * @param $sortField
     * @param $sortDirection
     * @return mixed
     */
    // TODO: Write annotation for getProducts() method.
    public function getProducts($pageSize, $pageIndex, $sortField, $sortDirection);

    /**
     * @param $productId
     * @return mixed
     */
    // TODO: Write annotation for getProductDetails() method.
    public function getProductDetails($productId);

    // TODO: Write annotation for getProductEditData() method.
    public function getProductEditData($productId, $languageId, $shopId, $pageIndex, $pageSize);

    // TODO: Write annotation for getProductCreateData() method.
    public function getProductCreateData($languageId);

    // TODO: Write annotation for getProductSpecificPriceData() method.
    public function getProductSpecificPriceData();

    // TODO: Write annotation for deleteProduct() method.
    public function deleteProduct($productId);

    // TODO: Write annotation for deleteProductDescription() method.
    public function deleteProductDescription($productId);

    // TODO: Write annotation for saveProduct() method.

    /**
     * @param $product
     * @return mixed
     */
    public function saveProduct($product);

    // TODO: Write annotation for saveProductSpecificPrice() method.
    public function saveProductSpecificPrice($specificPrice, $shopId);

    /**
     * @param $searchValue
     * @param $pageSize
     * @param $pageIndex
     * @param $sortField
     * @param $sortDirection
     * @return mixed
     */
    // TODO: Write annotation for searchProducts() method.
    public function searchProducts($searchValue, $pageSize, $pageIndex, $sortField, $sortDirection);
}
