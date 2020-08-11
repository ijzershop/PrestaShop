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

interface EM1OrderInterface
{
    const KEY_ORDER                             = 'order';
    const KEY_ORDERS                            = 'orders';
    const KEY_ORDER_ID                          = 'order_id';
    const KEY_REFERENCE                         = 'reference';
    const KEY_SHOP_ID                           = 'shop_id';
    const KEY_CUSTOMER_ID                       = 'customer_id';
    const KEY_CUSTOMER_EMAIL                    = 'customer_email';
    const KEY_CUSTOMER_FIRST_NAME               = 'customer_first_name';
    const KEY_CUSTOMER_LAST_NAME                = 'customer_last_name';
    const KEY_STATUS_ID                         = 'status_id';
    const KEY_TOTAL                             = 'total';
    const KEY_FORMATTED_TOTAL                   = 'formatted_total';
    const KEY_DATE_ADD                          = 'date_add';
    const KEY_PRODUCTS                          = 'products';
    const KEY_PRODUCTS_COUNT                    = 'products_count';
    const KEY_ORDERS_COUNT                      = 'orders_count';
    const KEY_ORDERS_TOTAL                      = 'orders_total';
    const KEY_FORMATTED_ORDERS_TOTAL            = 'formatted_orders_total';
    const KEY_TOTAL_WITH_TAX                    = 'total';
    const KEY_FORMATTED_TOTAL_PAID              = 'formatted_total_paid';
    const KEY_FORMATTED_TOTAL_DISCOUNTS         = 'formatted_total_discounts';
    const KEY_FORMATTED_TOTAL_SHIPPING          = 'formatted_total_shipping';
    const KEY_FORMATTED_TOTAL_WRAPPING          = 'formatted_total_wrapping';
    const KEY_FORMATTED_TOTAL_PRODUCTS          = 'formatted_total_products';
    const KEY_FORMATTED_TOTAL_PRODUCTS_WITH_TAX = 'formatted_total_products_with_tax';
    const KEY_SHIPPING_ADDRESS                  = 'shipping_address';
    const KEY_INVOICE_ADDRESS                   = 'invoice_address';
    const KEY_CARRIER_ID                        = 'carrier_id';
    const KEY_TRACKING_CODE                     = 'tracking_code';
    const KEY_TRACKING_URL                      = 'tracking_url';
    const KEY_WEIGHT                            = 'weight';
    const KEY_ADDRESS_ID                        = 'address_id';
    const KEY_FIRST_NAME                        = 'first_name';
    const KEY_LAST_NAME                         = 'last_name';
    const KEY_COMPANY                           = 'company';
    const KEY_ADDRESS1                          = 'address1';
    const KEY_ADDRESS2                          = 'address2';
    const KEY_VAT_NUMBER                        = 'vat_number';
    const KEY_POST_CODE                         = 'post_code';
    const KEY_CITY                              = 'city';
    const KEY_COUNTRY                           = 'country';
    const KEY_STATE                             = 'state';
    const KEY_PHONE                             = 'phone';
    const KEY_ORDER_PRODUCT_ID                  = 'order_product_id';
    const KEY_PRODUCT_ID                        = 'product_id';
    const KEY_PRODUCT_NAME                      = 'product_name';
    const KEY_EAN13                             = 'ean13';
    const KEY_ISBN                              = 'isbn';
    const KEY_UPC                               = 'upc';
    const KEY_QUANTITY                          = 'quantity';
    const KEY_TOTAL_PRICE_WITHOUT_TAX           = 'total_price_without_tax';
    const KEY_FORMATTED_TOTAL_PRICE_WITHOUT_TAX = 'formatted_total_price_without_tax';
    const KEY_IMAGE_URL                         = 'image_url';
    const IMAGE_NAME_TYPE_HOME                  = 'home';
    const KEY_PAYMENTS                          = 'payments';
    const KEY_PAYMENTS_COUNT                    = 'payments_count';
    const KEY_TIMELINE                          = 'timeline';
    const KEY_SHOPS                             = 'shops';

    const RESPONSE_CODE_CHANGE_STATUS_ORDER_SUCCESS  = 'change_status_order_success';

    const ORDER_BY_DATE_CREATED     = 'DATE_CREATED';
    const ORDER_BY_CUSTOMER_NAME    = 'CUSTOMER_NAME';
    const ORDER_BY_TOTAL            = 'TOTAL';
    const ORDER_BY_PRODUCTS_COUNT   = 'PRODUCTS_COUNT';

    const KEY_ORDER_BY                      = array(
        self::ORDER_BY_DATE_CREATED     => 'o.date_add',
        self::ORDER_BY_CUSTOMER_NAME    => 'CONCAT(c.firstname, \' \', c.lastname)',
        self::ORDER_BY_TOTAL            => 'o.total_paid_tax_incl/o.conversion_rate',
        self::ORDER_BY_PRODUCTS_COUNT   => 'items_count'
    );

    const ORDER_BY_DIRECTION_ASC                             = 'ASC';
    const ORDER_BY_DIRECTION_DESC                            = 'DESC';

    const KEY_ORDER_BY_DIRECTION = array(
        self::ORDER_BY_DIRECTION_ASC  => self::ORDER_BY_DIRECTION_ASC,
        self::ORDER_BY_DIRECTION_DESC => self::ORDER_BY_DIRECTION_DESC
    );

    public function getOrderDetails($orderId, $pageSize, $pageIndex);

    public function getOrders(
        $dateFrom,
        $dateTo,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection,
        $orderStatuses
    );

    public function searchOrdersBy(
        $dateFrom,
        $dateTo,
        $searchValue,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection,
        $orderStatuses
    );

    public function changeOrderStatus($orderId, $orderStatusId);

    public function checkDownloadOrderInvoiceAvailability($orderId);

    public function downloadOrderInvoice($orderId);

    public function updateOrderShippingDetails($orderId, $carrierId, $trackingNumber, $notifyCustomer = false);
}
