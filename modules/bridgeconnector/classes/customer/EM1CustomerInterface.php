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

interface EM1CustomerInterface
{
    /** Keys */
    const KEY_ADDRESS_ID                         = 'address_id';
    const KEY_CUSTOMER_ID                        = 'customer_id';
    const KEY_ID_CUSTOMER                        = 'id_customer';
    const KEY_ID_ORDER                           = 'id_order';
    const KEY_ITEMS_COUNT                        = 'items_count';
    const KEY_FIRST_NAME                         = 'first_name';
    const KEY_LAST_NAME                          = 'last_name';
    const KEY_COMPANY                            = 'company';
    const KEY_ADDRESS1                           = 'address1';
    const KEY_ADDRESS2                           = 'address2';
    const KEY_VAT_NUMBER                         = 'vat_number';
    const KEY_POST_CODE                          = 'post_code';
    const KEY_CITY                               = 'city';
    const KEY_COUNTRY                            = 'country';
    const KEY_STATE                              = 'state';
    const KEY_PHONE                              = 'phone';
    const KEY_PHONE_MOBILE                       = 'phone_mobile';
    const KEY_ORDERS_ID                          = 'order_id';
    const KEY_REFERENCE                          = 'reference';
    const KEY_SHOP_ID                            = 'shop_id';
    const KEY_CUSTOMER_EMAIL                     = 'customer_email';
    const KEY_CUSTOMER_FIRST_NAME                = 'customer_first_name';
    const KEY_CUSTOMER_LAST_NAME                 = 'customer_last_name';
    const KEY_STATUS_ID                          = 'status_id';
    const KEY_TOTAL                              = 'total';
    const KEY_FORMATTED_TOTAL                    = 'formatted_total';
    const KEY_DATE_ADD                           = 'date_add';
    const KEY_PRODUCTS_COUNT                     = 'products_count';
    const KEY_ORDERS_TOTAL                       = 'orders_total';
    const KEY_FORMATTED_ORDERS_TOTAL             = 'formatted_orders_total';
    const KEY_ORDERS_COUNT                       = 'orders_count';
    const KEY_ORDERS                             = 'orders';
    const KEY_ADDRESSES                          = 'addresses';
    const KEY_EMAIL                              = 'email';
    const KEY_CUSTOMERS_COUNT                    = 'customers_count';
    const KEY_CUSTOMERS                          = 'customers';
    const KEY_CUSTOMER                           = 'customer';
    const KEY_DNI                                = 'dni';
    const KEY_ADDRESSES_COUNT                    = 'addresses_count';

    /** Order by ENUM */
    const ORDER_BY_DATE_CREATED                  = 'DATE_CREATED';
    const ORDER_BY_CUSTOMER_NAME                 = 'NAME';
    const ORDER_BY_ORDERS_COUNT                  = 'ORDERS_COUNT';
    const ORDER_BY_ORDERS_TOTAL                  = 'ORDERS_TOTAL';

    const KEY_ORDER_BY                           = array(
        self::ORDER_BY_DATE_CREATED     => 'c.`date_add`',
        self::ORDER_BY_CUSTOMER_NAME    => "CONCAT(c.`firstname`, ' ', c.`lastname`)",
        self::ORDER_BY_ORDERS_COUNT     => 'orders_count',
        self::ORDER_BY_ORDERS_TOTAL     => 'orders_total'
    );

    const ORDER_BY_DIRECTION_ASC            = 'ASC';
    const ORDER_BY_DIRECTION_DESC           = 'DESC';

    const KEY_ORDER_BY_DIRECTION = array(
        self::ORDER_BY_DIRECTION_ASC  => self::ORDER_BY_DIRECTION_ASC,
        self::ORDER_BY_DIRECTION_DESC => self::ORDER_BY_DIRECTION_DESC
    );

    /**
     * Get specific customer details based on {id}
     * GET  Request is {url}/get_customer_details&data=
     * POST Request is {url}/get_customer_details
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
     * @param $customerId       int     Customer Id
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  void    Returns formatted customer details, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function getCustomerDetails($customerId, $pageIndex, $pageSize);

    /**
     * Get customers, can be based on filters or date range filters
     * GET  Request is {url}/get_customers&data=
     * POST Request is {url}/get_customers
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
     *  "sort_direction": (string),
     *  "only_with_orders": (int)
     * }
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     * @param $sortField        string  Sorting field based on which sort is applying
     * @param $sortDirection    string  Sorting direction (means, ascending or descending)
     * @param $onlyWithOrders   bool    Flag to see customers with orders only
     *
     * @return                  void    Returns formatted customers, or error code if fails
     */
    public function getCustomers(
        $dateFrom,
        $dateTo,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection,
        $onlyWithOrders
    );

    /**
     * Search customers based on search phrase.
     * GET  Request is {url}/search_customers&data=
     * POST Request is {url}/search_customers
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "search_value": (string),
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
     * @param $onlyWithOrders   bool    Flag to see customers with orders only
     *
     * @return                  void    Returns searched formatted customers, or error code if fails
     */
    public function searchCustomers(
        $dateFrom,
        $dateTo,
        $searchPhrase,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection,
        $onlyWithOrders
    );

    /**
     * Get specific customer orders based on {id}
     * GET  Request is {url}/get_customer_orders&data=
     * POST Request is {url}/get_customer_orders
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "id": (int),
     *  "page_size": (int),
     *  "page_index": (int)
     * }
     *
     * @param $customerId       int     Customer Id
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  void    Returns searched formatted abandoned carts, or error code if fails
     */
    public function getCustomerOrders($customerId, $pageIndex, $pageSize);
}
