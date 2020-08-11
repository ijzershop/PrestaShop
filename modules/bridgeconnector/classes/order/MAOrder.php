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

includeOrderFiles();

/***
 * Class MAOrder
 */

class MAOrder extends EM1Main implements EM1OrderInterface
{
    /** @var int $orderId order_id from request, id_order field in database */
    protected $orderId = 0;

    /** @var int $languageId lang_id from request, id_lang field in database */
    private $languageId;

    /** @var string $whereQuery preparation of where query part */
    private $whereQuery = '1';

    /** @var string $orderByQuery preparation of order by query part */
    private $orderByQuery;

    /**
     * MAOrders constructor.
     *
     * @param int $languageId
     */
    public function __construct($languageId)
    {
        $this->languageId = $languageId;
    }

    /**
     * @param $dateFrom
     * @param $dateTo
     * @param $pageSize
     * @param $pageIndex
     * @param $sortField
     * @param $sortDirection
     * @param $orderStatuses
     *
     * @throws EM1Exception
     */
    public function getOrders(
        $dateFrom,
        $dateTo,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection,
        $orderStatuses
    ) {
        $this->prepareParameters(
            $dateFrom,
            $dateTo,
            $sortField,
            $sortDirection,
            $orderStatuses
        );

        $ordersIds    = $this->getOrdersInformation($pageSize, $pageIndex);
        $ordersResult = array();
        foreach ($ordersIds as $orderValue) {
            $orderId = (int)$orderValue['id_order'];

            try {
                /** @var OrderCore $order */
                $order = new Order($orderId);
                if (!Validate::isLoadedObject($order)) {
                    continue;
                }

                $customerId = (int)$order->id_customer;

                /** @var CustomerCore $orderCustomer */
                $orderCustomer = new Customer($customerId);
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_ORDER_OBJECT_EXECUTION_ERROR, $exception->getMessage());
            }

            $orderTotal         = $this->round(
                (float)$order->total_paid_tax_incl/(float)$order->conversion_rate
            );

            $orderPayments     = $this->getOrderPayments((string)$order->reference, (int)$order->id_lang);
            $ordersResult[] = array(
                self::KEY_ORDER_ID              => (int)$order->id,
                self::KEY_REFERENCE             => (string)$order->reference,
                self::KEY_SHOP_ID               => (int)$order->id_shop,
                self::KEY_CUSTOMER_ID           => $customerId,
                self::KEY_CUSTOMER_EMAIL        => (string)$orderCustomer->email,
                self::KEY_CUSTOMER_FIRST_NAME   => (string)$orderCustomer->firstname,
                self::KEY_CUSTOMER_LAST_NAME    => (string)$orderCustomer->lastname,
                self::KEY_STATUS_ID             => (int)$order->current_state,
                self::KEY_TOTAL                 => $orderTotal,
                self::KEY_FORMATTED_TOTAL       => $this->displayPrice(
                    $orderTotal,
                    $order->id_currency,
                    $order->id_lang
                ),
                self::KEY_DATE_ADD              => self::convertTimestampToMillisecondsTimestamp(
                    (int)strtotime($order->date_add)
                ),
                self::KEY_PRODUCTS_COUNT        => (int)$orderValue['items_count'],
                self::KEY_PAYMENTS_COUNT        => count($orderPayments),
            );
        }

        $this->ordersResponse($ordersResult);
    }

    public function getOrderPickingProducts($orderIds, $pageSize, $pageIndex)
    {
        $responseArray = [
            'products' => []
        ];
        foreach ($orderIds as $orderId) {
            $orderObject = new Order($orderId);
            foreach ($orderObject->getProducts() as $item) {
                $responseArray['products'][] = self::getOrderPickingProductDto($item);
            }
        }

        $responseArray['products'] = array_slice(
            $responseArray['products'],
            ($pageIndex - 1) * $pageSize,
            $pageSize
        );
        self::generateResponse($responseArray);
    }

    public static function getOrderPickingProductDto($product)
    {
        $productObject = new Product($product['product_id'], true, MAProduct::getDefaultLanguageId());
        if (isset($product['image']) && $product['image']->id != null) {
            $imageUrl = MAProduct::getProductImageUrl($productObject->link_rewrite, $product['image']->id);
        } else {
            $imageUrl = '';
        }
        return [
            'order_id'             => (int)$product['id_order'],
            'product_id'           => (int)$product['product_id'],
            'product_attribute_id' => (int)$product['product_attribute_id'],
            'product_name'         => (string)$product['product_name'],
            'reference'            => (string)$product['product_reference'],
            'ean13'                => (string)$product['ean13'],
            'isbn'                 => (string)$product['isbn'],
            'upc'                  => (string)$product['upc'],
            'quantity'             => (int)$product['product_quantity'],
            'image_url'            => $imageUrl,
            'location'             => (string)$product['location'],
        ];
    }

    /**
     * Prepare fields for order details response
     * Request is get_order_details&data={"id":?}
     *
     * @param $orderId
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return void Returns formatted order response with order details, or empty order response with error code
     *
     * @throws EM1Exception
     */
    public function getOrderDetails($orderId, $pageSize, $pageIndex)
    {
        // Check if orderId is valid and has corresponding order
        try {
            // Create Order object and validate after initialisation
            /** @var OrderCore $abandonedCart */
            $order = new Order($orderId);
            if (!Validate::isLoadedObject($order)) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_ORDER_NOT_FOUND);
            }

            $customerId = (int)$order->id_customer;

            /** @var CustomerCore $orderCustomer */
            $customer = new Customer($customerId);
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                $exception->getMessage()
            );
        }

        $orderId             = (int)$order->id;
        $orderCurrencyId     = (int)$order->id_currency;
        $orderConversionRate = (float)$order->conversion_rate;
        $orderPayments      = $this->getOrderPayments((string)$order->reference, (int)$order->id_lang);
        $orderResult         = array(
            self::KEY_ORDER_ID => $orderId,
            self::KEY_REFERENCE => (string)$order->reference,
            self::KEY_SHOP_ID => (int)$order->id_shop,
            self::KEY_CUSTOMER_ID => (int)$order->id_customer,
            self::KEY_CUSTOMER_EMAIL => (string)$customer->email,
            self::KEY_CUSTOMER_FIRST_NAME => (string)$customer->firstname,
            self::KEY_CUSTOMER_LAST_NAME => (string)$customer->lastname,
            self::KEY_STATUS_ID => (int)$order->current_state,
            self::KEY_TOTAL => $this->round($order->total_paid_real / $orderConversionRate),
            self::KEY_FORMATTED_TOTAL => $this->displayPrice(
                $order->total_paid_tax_incl / $orderConversionRate,
                $orderCurrencyId,
                $order->id_lang
            ),
            self::KEY_FORMATTED_TOTAL_PAID => $this->displayPrice(
                $order->total_paid / $orderConversionRate,
                $orderCurrencyId,
                $order->id_lang
            ),
            self::KEY_FORMATTED_TOTAL_DISCOUNTS => $this->displayPrice(
                $order->total_discounts / $orderConversionRate,
                $orderCurrencyId,
                $order->id_lang
            ),
            self::KEY_FORMATTED_TOTAL_SHIPPING => $this->displayPrice(
                $order->total_shipping / $orderConversionRate,
                $orderCurrencyId,
                $order->id_lang
            ),
            self::KEY_FORMATTED_TOTAL_WRAPPING => $this->displayPrice(
                $order->total_wrapping / $orderConversionRate,
                $orderCurrencyId,
                $order->id_lang
            ),
            self::KEY_FORMATTED_TOTAL_PRODUCTS => $this->displayPrice(
                $order->total_products / $orderConversionRate,
                $orderCurrencyId,
                $order->id_lang
            ),
            self::KEY_FORMATTED_TOTAL_PRODUCTS_WITH_TAX => $this->displayPrice(
                $order->total_products_wt / $orderConversionRate,
                $orderCurrencyId,
                $order->id_lang
            ),
            self::KEY_DATE_ADD => self::convertTimestampToMillisecondsTimestamp(
                (int)strtotime($order->date_add)
            ),
            self::KEY_SHIPPING_ADDRESS => (array)$this->getOrderAddress(
                $order->id_address_delivery
            ),
            self::KEY_INVOICE_ADDRESS => (array)$this->getOrderAddress(
                $order->id_address_invoice
            ),
            self::KEY_PRODUCTS_COUNT => (int)$this->getOrderItemsCount(
                $orderId
            ),
            self::KEY_PAYMENTS => $orderPayments,
            self::KEY_PAYMENTS_COUNT => count($orderPayments),
            self::KEY_TIMELINE => MACustomerService::getTimelineDetails(
                $orderId,
                $this->languageId
            )
        );

        $this->orderResponse(
            array_merge(
                $orderResult,
                $this->getOrderCarrier($orderId),
                $this->getOrderItemsData($orderId, $pageSize, $pageIndex)
            )
        );
    }

    /**
     * @param $orderId
     * @param $pageSize
     * @param $pageIndex
     *
     * @throws EM1Exception
     */
    public function getOrderProducts($orderId, $pageSize, $pageIndex)
    {
        // Check if orderId is set
        try {
            $order = new Order($orderId);
            if (!Validate::isLoadedObject($order)) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_ORDER_NOT_FOUND);
            }
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                $exception->getMessage()
            );
        }

        self::generateResponse($this->getOrderItemsData($orderId, $pageSize, $pageIndex));
    }

    /**
     * @param $dateFrom
     * @param $dateTo
     * @param $searchPhrase
     * @param $pageSize
     * @param $pageIndex
     * @param $sortField
     * @param $sortDirection
     * @param $orderStatuses
     *
     * @throws EM1Exception
     */
    public function searchOrdersBy(
        $dateFrom,
        $dateTo,
        $searchPhrase,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection,
        $orderStatuses
    ) {
        if (empty($searchPhrase)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_SEARCH_PHRASE_NOT_SET);
        }

        $this->whereQuery .= $this->prepareSearchData($searchPhrase);
        $this->getOrders(
            $dateFrom,
            $dateTo,
            $pageSize,
            $pageIndex,
            $sortField,
            $sortDirection,
            $orderStatuses
        );
    }

    /**
     * @param $orderId
     * @param $orderStatusId
     *
     * @throws EM1Exception
     */
    public function changeOrderStatus($orderId, $orderStatusId)
    {
        // Check if orderId is set
        try {
            $order = new Order($orderId);
            if (!Validate::isLoadedObject($order)) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_ORDER_NOT_FOUND);
            }
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT);
        }

        try {
            Context::getContext()->cart = new Cart($order->id_cart); // to avoid conflict with giftcard module
            $order->setCurrentState($orderStatusId);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CHANGE_STATUS_ORDER_FAILED, $exception->getMessage());
        }

        self::generateResponse();
    }

    /**
     * @param $orderId
     *
     * @throws EM1Exception
     */
    public function checkDownloadOrderInvoiceAvailability($orderId)
    {
        try {
            $order = new Order($orderId);
            if (!Validate::isLoadedObject($order)) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_ORDER_NOT_FOUND);
            }

            if (!(int)Configuration::get('PS_INVOICE') || !$order->invoice_number) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_INVOICE_NOT_AVAILABLE_FOR_THIS_ORDER);
            }
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                $exception->getMessage()
            );
        }

        self::generateResponse();
    }

    /**
     * @param $orderId
     *
     * @throws EM1Exception
     */
    public function downloadOrderInvoice($orderId)
    {
        try {
            $order = new Order($orderId);
            if (!Validate::isLoadedObject($order)) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_ORDER_NOT_FOUND);
            }
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                $exception->getMessage()
            );
        }

        $orderInvoices = $order->getInvoicesCollection();
        if ($orderInvoices->count()) {
            $pdf = new PDFCore($orderInvoices, PDFCore::TEMPLATE_INVOICE, Context::getContext()->smarty);
        } else {
            try {
                $language = new Language($order->id_lang);
                $template = 'OrderPdf';
                $pdf      = new MAOrderPDF($language->iso_code, $order, $template, Context::getContext()->smarty);

                if (version_compare(_PS_VERSION_, '1.5.6.3', '<=')) {
                    $template = PDFCore::TEMPLATE_INVOICE;
                    // todo if version lower than 1.6 use other logic
                    Hook::exec('actionPDFInvoiceRender', array('order_invoice_list' => $orderInvoices));
                    $pdf = new MAOrderPDF(
                        $language->iso_code,
                        $orderInvoices,
                        $template,
                        Context::getContext()->smarty
                    );
                }
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                    $exception->getMessage()
                );
            }
        }

        try {
            die($pdf->render());
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                $exception->getMessage()
            );
        }
    }

    /**
     * @param $orderId
     * @param $carrierId
     * @param $trackingNumber
     * @param $notifyCustomer
     *
     * @return void
     * @throws EM1Exception
     */
    public function updateOrderShippingDetails($orderId, $carrierId, $trackingNumber, $notifyCustomer = false)
    {
        try {
            $order = new Order((int)$orderId);
            if (!Validate::isLoadedObject($order)) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_ORDER_NOT_FOUND);
            }

            $orderCarrier = new OrderCarrier((int)$order->getIdOrderCarrier());
            if (!Validate::isLoadedObject($orderCarrier)) {
                throw new EM1Exception(EM1Exception::ERROR_THE_ORDER_CARRIER_ID_IS_INVALID);
            }
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                $exception->getMessage()
            );
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                $exception->getMessage()
            );
        }

        if (!empty($trackingNumber) && !Validate::isTrackingNumber($trackingNumber)) {
            throw new EM1Exception(EM1Exception::ERROR_THE_TRACKING_NUMBER_IS_INCORRECT);
        }

        // Update carrier - ONLY if changed - then refresh shipping cost
        $oldCarrierId = (int)$orderCarrier->id_carrier;
        if (!empty($carrierId) && $oldCarrierId !== (int)$carrierId) {
            $order->id_carrier        = (int)$carrierId;
            $orderCarrier->id_carrier = (int)$carrierId;
            try {
                $orderCarrier->update();
            } catch (PrestaShopDatabaseException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_WHILE_UPDATING_ORDER_CARRIER,
                    $exception->getMessage()
                );
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_WHILE_UPDATING_ORDER_CARRIER,
                    $exception->getMessage()
                );
            }

            try {
                $order->refreshShippingCost();
            } catch (Exception $exception) {
                // Can drop exception here, but updating will be completed
            }
        }

        // Load fresh order carrier because updated just before
        try {
            $orderCarrier = new OrderCarrier((int)$order->getIdOrderCarrier());
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_WHILE_LOADING_REFRESHED_ORDER_CARRIER_OBJECT,
                $exception->getMessage()
            );
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_WHILE_LOADING_REFRESHED_ORDER_CARRIER_OBJECT,
                $exception->getMessage()
            );
        }

        // Update shipping number
        // Keep these two following lines for backward compatibility, remove on 1.6 version
        if (method_exists('Order', 'setWsShippingNumber')) {
            $order->shipping_number = pSQL($trackingNumber);
            $orderCarrier->tracking_number = pSQL($trackingNumber);
            try {
                $order->update();
            } catch (PrestaShopDatabaseException $exception) {
                throw new EM1Exception(EM1Exception::ERROR_THE_ORDER_CANNOT_BE_UPDATED, $exception->getMessage());
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(EM1Exception::ERROR_THE_ORDER_CANNOT_BE_UPDATED, $exception->getMessage());
            }

            $order->setWsShippingNumber($trackingNumber);
        } else {
            $order->shipping_number = pSQL($trackingNumber);
            try {
                $order->update();
            } catch (PrestaShopDatabaseException $exception) {
                throw new EM1Exception(EM1Exception::ERROR_THE_ORDER_CANNOT_BE_UPDATED, $exception->getMessage());
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(EM1Exception::ERROR_THE_ORDER_CANNOT_BE_UPDATED, $exception->getMessage());
            }

            $orderCarrier->tracking_number = pSQL($trackingNumber);
            try {
                $orderCarrier->update();
            } catch (PrestaShopDatabaseException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_THE_ORDER_CARRIER_CANNOT_BE_UPDATED,
                    $exception->getMessage()
                );
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_THE_ORDER_CARRIER_CANNOT_BE_UPDATED,
                    $exception->getMessage()
                );
            }
        }

        // Send mail only if tracking number is different AND not empty
        if ((bool)$notifyCustomer) {
            try {
                $sendTransitEmail = $orderCarrier->sendInTransitEmail($order);
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_AN_ERROR_OCCURRED_WHILE_SENDING_AN_EMAIL_TO_THE_CUSTOMER,
                    $exception->getMessage()
                );
            }

            //todo@ hook functionality will added soon
            if ($sendTransitEmail) {
                $customer = new Customer((int)$order->id_customer);
                $carrier = new Carrier((int)$order->id_carrier, $order->id_lang);

                try {
                    Hook::exec('actionAdminOrdersTrackingNumberUpdate', array(
                        'order' => $order,
                        'customer' => $customer,
                        'carrier' => $carrier,
                    ), null, false, true, false, $order->id_shop);
                } catch (PrestaShopException $e) {
                    throw new EM1Exception('an_error_occurred_while_triggering_order_tracking_number_update_hook');
                }
            }
        }

        self::generateResponse();
    }

    /**
     * @param $orderId
     * @param $pageSize
     * @param $pageIndex
     *
     * @return array
     * @throws EM1Exception
     */
    //todo:
    private function getOrderItemsData($orderId, $pageSize, $pageIndex)
    {
        $ordersItemsResult = array();
        foreach ($this->getOrderItemsInformation($orderId, $pageSize, $pageIndex) as $orderItemValue) {
            try {
                $order      = new Order($orderId);
                $orderItem  = new OrderDetail($orderItemValue['id_order_detail']);
            } catch (PrestaShopDatabaseException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                    $exception->getMessage()
                );
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_COULD_NOT_LOAD_PRESTASHOP_ORDER_OBJECT,
                    $exception->getMessage()
                );
            }

            $productId = (int)$orderItem->product_id;
            $productImages = Image::getImages($this->languageId, $productId, $orderItem->product_attribute_id);
            if ($orderItem->product_attribute_id !== null
                && $orderItem->product_attribute_id !== "0"
                && $productImages) {
                $imageUrl = $this->getProductImageUrl(
                    $this->getProductLinkRewrite(
                        $productId,
                        $this->languageId,
                        $orderItem->id_shop
                    ),
                    $productImages[0]['id_image']
                );
            } else {
                $imageUrl = $this->getProductCoverImageUrl(
                    $productId,
                    $this->getProductLinkRewrite($productId, $this->languageId, $orderItem->id_shop)
                );
            }
            $orderItems = array(
                self::KEY_ORDER_PRODUCT_ID                  => (int)$orderItem->id_order_detail,
                self::KEY_PRODUCT_ID                        => $productId,
                self::KEY_ORDER_ID                          => (int)$orderItem->id_order,
                self::KEY_SHOP_ID                           => (int)$orderItem->id_shop,
                self::KEY_PRODUCT_NAME                      => (string)strip_tags($orderItem->product_name),
                self::KEY_REFERENCE                         => (string)$orderItem->product_reference,
                self::KEY_EAN13                             => (string)$orderItem->product_ean13,
                self::KEY_UPC                               => (string)$orderItem->product_upc,
                self::KEY_ISBN                              => (string)(
                property_exists($orderItem, 'product_isbn') ? $orderItem->product_isbn : null
                ),
                self::KEY_QUANTITY                          => (int)$orderItem->product_quantity,
                self::KEY_TOTAL_PRICE_WITHOUT_TAX           => $this->round((float)$orderItem->total_price_tax_excl),
                self::KEY_FORMATTED_TOTAL_PRICE_WITHOUT_TAX => $this->displayPrice(
                    $orderItem->total_price_tax_excl,
                    $orderItemValue['id_currency'],
                    $order->id_lang
                ),
                self::KEY_IMAGE_URL => $imageUrl,
                self::KEY_SHOPS => $this->getProductShopAssociation($productId)
            );

            $ordersItemsResult[] = $orderItems;
        }

        return array(self::KEY_PRODUCTS => $ordersItemsResult);
    }

    private function getProductShopAssociation($productId)
    {
        $productShopsResult = array();
        $product = new Product($productId);
        $productAssociatedShops = $product->getAssociatedShops();
        foreach ($productAssociatedShops as $shopId) {
            $productShopsResult[] = array(
                self::KEY_SHOP_ID => (int)$shopId
            );
        }

        return $productShopsResult;
    }

    /**
     * @param $productId
     * @param $languageId
     * @param $shopId
     *
     * @return string
     * @throws EM1Exception
     */
    private function getProductLinkRewrite($productId, $languageId, $shopId)
    {
        return self::getQueryValue(
            'SELECT `link_rewrite`
                      FROM `' . _DB_PREFIX_ . 'product_lang`
                    WHERE `id_product` = ' . (int)$productId . '
                      AND `id_lang` = ' . (int)$languageId . '
                      AND `id_shop` = ' . (int)$shopId
        );
    }

    /**
     * @param $orderId
     * @param $pageSize
     * @param $pageIndex
     *
     * @return array
     * @throws EM1Exception
     */
    private function getOrderItemsInformation($orderId, $pageSize, $pageIndex)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryResult(
            $dbQuery->select('order_detail.id_order_detail, orders.id_currency')
                ->from('orders', 'orders')
                ->leftJoin(
                    'order_detail',
                    'order_detail',
                    'order_detail.`id_order` = orders.`id_order`'
                )
                ->where('orders.`id_order` =' . $orderId)
                ->limit($pageSize, $this->getLimitOffset($pageSize, $pageIndex))
        );
    }

    /**
     * @param $dateFrom
     * @param $dateTo
     * @param $sortField
     * @param $sortDirection
     * @param $orderStatuses
     *
     * @throws EM1Exception
     */
    private function prepareParameters(
        $dateFrom,
        $dateTo,
        $sortField,
        $sortDirection,
        $orderStatuses
    ) {
        // Prepare query parts:
        // Prepare sorting query part
        $this->orderByQuery = $this->getOrderBy($sortField, $sortDirection);

        // Prepare where query parts
        // Prepare where query of shops
        $this->whereQuery .= Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o');
        // Prepare where query of statuses
        if (!empty($orderStatuses)) {
            $this->whereQuery .= " AND o.current_state IN ($orderStatuses) ";
        }
        // Prepare where query of dateRange
        $this->whereQuery .= $this->prepareDateRangeWherePart($dateFrom, $dateTo);
    }

    /**
     * Prepare date range query part before using in where statement
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     *
     * @return                  string  Return part of where statement and date range values
     */
    private function prepareDateRangeWherePart($dateFrom, $dateTo)
    {
        // Prepare dates range query part
        if (!empty($dateFrom) && !empty($dateTo) && $dateTo !== -1 && $dateFrom !== -1) {
            return /** @lang MySQL */
                " AND o.`date_add` >= '" . date(
                    EM1Constants::GLOBAL_DATE_FORMAT,
                    $dateFrom/1000
                ) . "' AND o.`date_add` <= '" . date(
                    EM1Constants::GLOBAL_DATE_FORMAT,
                    $dateTo/1000
                ) . "' ";
        }

        return '';
    }

    /**
     * Get abandoned carts ids and additional information
     *
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  array   Return array with result or error code if fails
     * @throws EM1Exception
     */
    private function getOrdersInformation($pageSize, $pageIndex)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryResult(
            $dbQuery->select(
                'o.`id_order`, 
                COUNT(od.`id_order_detail`) AS items_count'
            )
                ->from('orders', 'o')
                ->leftJoin('customer', 'c', 'c.`id_customer` = o.`id_customer`')
                ->leftJoin('order_detail', 'od', 'od.`id_order` = o.`id_order`')
                ->where($this->whereQuery)
                ->groupBy('o.`id_order`')
                ->orderBy($this->orderByQuery)
                ->limit($pageSize, $this->getLimitOffset($pageSize, $pageIndex))
        );
    }

    /**
     * @param $orderId
     *
     * @return string
     * @throws EM1Exception
     */
    private function getOrderItemsCount($orderId)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryValue(
            $dbQuery->select('COUNT(order_detail.`id_order_detail`) AS items_count')
                ->from('orders', 'orders')
                ->leftJoin(
                    'customer',
                    'customer',
                    'customer.`id_customer` = orders.`id_customer`'
                )
                ->leftJoin(
                    'order_detail',
                    'order_detail',
                    'order_detail.`id_order` = orders.`id_order`'
                )
                ->where('orders.id_order =' . $orderId)
                ->groupBy('orders.`id_order`')
        );
    }

    private function prepareSearchData($searchPhrase)
    {
        if (preg_match('/^\d+(?:,\d+)*$/', $searchPhrase)) {
            return /** @lang MySQL */
                ' AND o.`id_order` IN (' . pSQL($searchPhrase) . ')';
        }

        return /** @lang MySQL */
            " AND (
          CONCAT(c.`firstname`, ' ', c.`lastname`) LIKE '%" . pSQL($searchPhrase) . "%' 
          OR c.`email` LIKE '%" . pSQL($searchPhrase) . "%'
        ) ";
    }

    /**
     * @param $addressId
     *
     * @return array
     * @throws EM1Exception
     */
    private function getOrderAddress($addressId)
    {
        // Check if orderId is set
        if ($addressId < 1) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_ADDRESS_ID_IS_INCORRECT);
        }

        $orderAddress = new Address($addressId);

        return [
            self::KEY_ADDRESS_ID  => (int)$orderAddress->id,
            self::KEY_CUSTOMER_ID => (int)$orderAddress->id_customer,
            self::KEY_FIRST_NAME  => (string)$orderAddress->firstname,
            self::KEY_LAST_NAME   => (string)$orderAddress->lastname,
            self::KEY_COMPANY     => (string)$orderAddress->company,
            self::KEY_ADDRESS1    => (string)$orderAddress->address1,
            self::KEY_ADDRESS2    => (string)$orderAddress->address2,
            self::KEY_VAT_NUMBER  => (string)$orderAddress->vat_number,
            self::KEY_POST_CODE   => (string)$orderAddress->postcode,
            self::KEY_CITY        => (string)$orderAddress->city,
            self::KEY_COUNTRY     => (string)$orderAddress->country,
            self::KEY_STATE       => (string)State::getNameById($orderAddress->id_state),
            self::KEY_PHONE       => (string)$orderAddress->phone,
            'phone_mobile'        => (string)$orderAddress->phone_mobile
        ];
    }

    private function getOrderPayments($orderReference, $languageId)
    {
        $orderPayments = array();
        foreach (OrderPayment::getByOrderReference($orderReference) as $orderPayment) {
            $orderPayment = (array)$orderPayment;
            $orderPayments[] = array(
                'payment_id'        => (int)$orderPayment['id'],
                'date'              => self::convertTimestampToMillisecondsTimestamp(
                    (int)strtotime($orderPayment['date_add'])
                ),
                'payment_method'    => (string)$orderPayment['payment_method'],
                'formatted_amount'  => $this->displayPrice(
                    $orderPayment['amount'],
                    $orderPayment['id_currency'],
                    $languageId
                )
            );
        }

        return $orderPayments;
    }

    /**
     * @param $orderId
     *
     * @return array
     * @throws EM1Exception
     */
    private function getOrderCarrier($orderId)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        $carrierId = self::getQueryValue(
            $dbQuery->select('id_order_carrier')
                ->from('order_carrier')
                ->where('id_order = ' . (int)$orderId)
        );
        try {
            $orderCarrier = new OrderCarrier($carrierId);
            $carrier      = new Carrier($orderCarrier->id_carrier);

            return array(
                self::KEY_CARRIER_ID      => (int)$orderCarrier->id_carrier,
                self::KEY_TRACKING_CODE   => (string)$orderCarrier->tracking_number,
                self::KEY_TRACKING_URL    => str_replace('@', $orderCarrier->tracking_number, $carrier->url),
                self::KEY_WEIGHT          => (float)$orderCarrier->weight
            );
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_FAILED_WHEN_LOAD_ORDER_CARRIER, $exception->getMessage());
        }
    }

    /**
     * Get product cover image url link
     *
     * @param $productId    int     Product Id
     * @param $linkRewrite  string  Product Link Rewrite
     * @param $imageName    string  Image Type
     *
     * @return              string  Returns product cover image url link
     */
    private function getProductCoverImageUrl($productId, $linkRewrite, $imageName = self::IMAGE_NAME_TYPE_HOME)
    {
        $image = Product::getCover($productId);

        return $this->getProductImageUrl($linkRewrite, (int)$image['id_image'], $imageName);
    }

    /**
     * Get product image url link
     *
     * @param $linkRewrite  string  Product Link Rewrite
     * @param $imageId      int     Image Id
     * @param $imageName    string  Image Type
     *
     * @return              string  Returns product image url link
     */
    private function getProductImageUrl($linkRewrite, $imageId, $imageName = self::IMAGE_NAME_TYPE_HOME)
    {
        $imageUrl    = '';
        $imageId     = (int)$imageId;
        $linkRewrite = (string)$linkRewrite;

        if (method_exists('ImageType', 'getFormattedName')) {
            $imageType = ImageType::{'getFormattedName'}($imageName);
        } elseif (method_exists('ImageType', 'getFormatedName')) {
            $imageType = ImageType::{'getFormatedName'}($imageName);
        } else {
            $imageType = "{$imageName}_default";
        }

        if (!empty($linkRewrite) && $imageId > 0) {
            $imageUrl = Context::getContext()->link->getImageLink($linkRewrite, $imageId, $imageType);
        }

        return $imageUrl;
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    private function getOrdersCountAndTotal()
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        return self::getQueryRow(
            $dbQuery->select(
                'IFNULL(SUM(o.`total_paid_tax_incl`/o.`conversion_rate`), 0) AS orders_total, 
                COUNT(o.`id_order`) AS orders_count'
            )
                ->leftJoin('customer', 'c', 'c.`id_customer` = o.`id_customer`')
                ->from('orders', 'o')
                ->where($this->whereQuery)
        );
    }

    private function getLimitOffset($pageSize, $pageIndex)
    {
        $limitOffset = 0;
        if ($pageIndex) {
            $limitOffset = ($pageIndex - 1) * $pageSize;
        }

        return $limitOffset ?: 0;
    }

    /**
     * @param $sortField
     * @param $sortDirection
     *
     * @return string
     * @throws EM1Exception
     */
    private function getOrderBy($sortField, $sortDirection)
    {
        if (!array_key_exists($sortField, self::KEY_ORDER_BY)
            || !array_key_exists($sortDirection, self::KEY_ORDER_BY_DIRECTION)
        ) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_INCORRECT_SORT_DATA);
        }

        $orderBy          = self::KEY_ORDER_BY[$sortField];
        $orderByDirection = self::KEY_ORDER_BY_DIRECTION[$sortDirection];

        return "$orderBy $orderByDirection";
    }

    /**
     * @param array $orders
     *
     * @throws EM1Exception
     */
    public function ordersResponse($orders = array())
    {
        $ordersCountAndTotal = $this->getOrdersCountAndTotal();

        self::generateResponse(
            array(
                self::KEY_ORDERS => $orders,
                self::KEY_ORDERS_COUNT => (int)$ordersCountAndTotal['orders_count'],
                self::KEY_FORMATTED_ORDERS_TOTAL => $this->displayPrice(
                    $ordersCountAndTotal['orders_total'],
                    Configuration::get('PS_CURRENCY_DEFAULT'),
                    $this->languageId
                )
            )
        );
    }

    public function orderResponse($order)
    {
        self::generateResponse(
            array(self::KEY_ORDER => $order)
        );
    }
}


/**
 * Included files
 */
function includeOrderFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/order/EM1OrderInterface.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/order/MAOrderPDF.php';
}
