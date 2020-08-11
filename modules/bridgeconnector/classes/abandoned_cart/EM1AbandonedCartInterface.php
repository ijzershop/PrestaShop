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

interface EM1AbandonedCartInterface
{
    /** Keys */
    const KEY_CART                              = 'cart';
    const KEY_CARTS                             = 'carts';
    const KEY_CART_ID                           = 'cart_id';
    const KEY_ID_CART                           = 'id_cart';
    const KEY_ID_IMAGE                          = 'id_image';
    const KEY_ID_PRODUCT                        = 'id_product';
    const KEY_ID_PRODUCT_ATTRIBUTE              = 'id_product_attribute';
    const KEY_CART_COUNT_PRODUCTS               = 'cart_count_products';
    const KEY_PRODUCT_ATTRIBUTE_ID              = 'product_attribute_id';
    const KEY_SHOP_ID                           = 'shop_id';
    const KEY_CUSTOMER_ID                       = 'customer_id';
    const KEY_CUSTOMER_EMAIL                    = 'customer_email';
    const KEY_CUSTOMER_FIRST_NAME               = 'customer_first_name';
    const KEY_CUSTOMER_LAST_NAME                = 'customer_last_name';
    const KEY_CUSTOMER_REGISTRATION_DATE        = 'customer_registration_date';
    const KEY_STATUS_ID                         = 'status_id';
    const KEY_TOTAL                             = 'total';
    const KEY_FORMATTED_TOTAL                   = 'formatted_total';
    const KEY_DATE_ADD                          = 'date_add';
    const KEY_PRODUCTS_COUNT                    = 'products_count';
    const KEY_CARTS_COUNT                       = 'carts_count';
    const KEY_CART_COUNT                        = 'cart_count';
    const KEY_CART_TOTAL                        = 'cart_total';
    const KEY_CARTS_TOTAL                       = 'carts_total';
    const KEY_FORMATTED_CART_TOTAL              = 'formatted_cart_total';
    const KEY_FORMATTED_CARTS_TOTAL             = 'formatted_carts_total';
    const KEY_PRODUCTS                          = 'products';
    const KEY_PRODUCT_ID                        = 'product_id';
    const KEY_PRODUCT_NAME                      = 'product_name';
    const KEY_REFERENCE                         = 'reference';
    const KEY_QUANTITY                          = 'quantity';
    const KEY_FORMATTED_TOTAL_PRICE_WITHOUT_TAX = 'formatted_total_price_without_tax';
    const KEY_IMAGE_URL                         = 'image_url';
    const KEY_SHOPS                             = 'shops';
    const IMAGE_NAME_TYPE_HOME                  = 'home';

    /** Order by ENUM */
    const ORDER_BY_DATE_CREATED                 = 'DATE_CREATED';
    const ORDER_BY_CUSTOMER_NAME                = 'CUSTOMER_NAME';
    const ORDER_BY_TOTAL                        = 'CART_TOTAL';
    const ORDER_BY_PRODUCTS_COUNT               = 'PRODUCTS_COUNT';

    const KEY_ORDER_BY                          = array(
        self::ORDER_BY_DATE_CREATED     =>  'cart.`date_add`',
        self::ORDER_BY_CUSTOMER_NAME    =>  'CONCAT(customer.`firstname`, \' \', customer.`lastname`)',
        self::ORDER_BY_TOTAL            =>  'cart_total',
        self::ORDER_BY_PRODUCTS_COUNT   =>  'cart_count_products'
    );

    const ORDER_BY_DIRECTION_ASC                = 'ASC';
    const ORDER_BY_DIRECTION_DESC               = 'DESC';

    const KEY_ORDER_BY_DIRECTION = array(
        self::ORDER_BY_DIRECTION_ASC    =>  self::ORDER_BY_DIRECTION_ASC,
        self::ORDER_BY_DIRECTION_DESC   =>  self::ORDER_BY_DIRECTION_DESC
    );

    /**
     * Get specific abandoned cart details based on {id}
     * GET  Request is {url}/get_abandoned_cart_details&data=
     * POST Request is {url}/get_abandoned_cart_details
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "id": (int),
     *  "page_size": (int),
     *  "page_index": (int)
     * }
     *
     * @param $abandonedCartId  int             Cart Id
     * @param $pageSize         int             Pagination page size number
     * @param $pageIndex        int             Pagination page index number
     *
     * @return                  void            Returns formatted abandoned cart details, or error code if fails
     *
     * @throws                  EM1Exception    Custom exception
     */
    public function getAbandonedCartDetails(
        $abandonedCartId,
        $pageSize,
        $pageIndex
    );

    /**
     * Get abandoned carts, can be based on filters or date range filters
     * GET  Request is {url}/get_abandoned_carts&data=
     * POST Request is {url}/get_abandoned_carts
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "date_from": (int),
     *  "date_to": (int),
     *  "page_size": (int),
     *  "page_index": (int),
     *  "sort_field": (string),
     *  "sort_direction": (string)
     * }
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     * @param $sortField        string  Sorting field based on which sort is applying
     * @param $sortDirection    string  Sorting direction (means, ascending or descending)
     *
     * @return                  void    Returns formatted abandoned carts, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function getAbandonedCarts(
        $dateFrom,
        $dateTo,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection
    );

    /**
     * Search abandoned carts based on search phrase.
     * GET  Request is {url}/search_abandoned_carts&data=
     * POST Request is {url}/search_abandoned_carts
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "date_from": (int),
     *  "date_to": (int),
     *  "search_phrase": (string),
     *  "page_size": (int),
     *  "page_index": (int),
     *  "sort_field": (string),
     *  "sort_direction": (string)
     * }
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     * @param $searchPhrase     string  Search phrase
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     * @param $sortField        string  Sorting field based on which sort is applying
     * @param $sortDirection    string  Sorting direction (means, ascending or descending)
     *
     * @return                  void    Returns searched formatted abandoned carts, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function searchAbandonedCartsBy(
        $dateFrom,
        $dateTo,
        $searchPhrase,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection
    );

    /**
     * Get specific abandoned cart products based on {id}
     * GET  Request is {url}/get_abandoned_cart_products&data=
     * POST Request is {url}/get_abandoned_cart_products
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "id": (int),
     *  "page_size": (int),
     *  "page_index": (int)
     * }
     *
     * @param $abandonedCartId  int     Cart Id
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  void    Returns searched formatted abandoned carts, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function getAbandonedCartProducts(
        $abandonedCartId,
        $pageSize,
        $pageIndex
    );
}
