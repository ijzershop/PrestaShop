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

includedCustomerFiles();

/***
 * Class MACustomer
 */

class MACustomer extends EM1Main implements EM1CustomerInterface
{
    /** @var int $customerId id from request, id_customer field in database */
    protected $customerId = 0;

    /** @var int $shopId shop_id from request, id_shop field in database */
    protected $shopId;

    /** @var int $shopGroupId shop_group_id from request, id_shop_group field in database */
    protected $shopGroupId;

    /** @var int $languageId lang_id from request, id_lang field in database */
    protected $languageId;

    /** @var int $currencyId currency_id from request, id_currency field in database */
    protected $currencyId;

    /** @var string $whereQuery preparation of where query part */
    private $whereQuery = '1';

    /** @var string $orderByQuery preparation of order by query part */
    private $orderByQuery;

    /** @var string $havingQuery preparation of having query part */
    private $havingQuery = '1';

    /**
     * MACustomer constructor.
     *
     * @param $languageId   int Language Id from database
     * @param $currencyId   int Currency Id from database
     */
    public function __construct($languageId = null, $currencyId = null)
    {
        $this->languageId = $languageId;
        $this->currencyId = $currencyId;
    }

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
    public function getCustomerDetails($customerId, $pageIndex, $pageSize)
    {
        try {
            // Create Customer object and validate after initialisation
            /** @var CustomerCore $customer */
            $customer = new Customer($customerId);
            if (!Validate::isLoadedObject($customer)) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_CUSTOMER_NOT_FOUND);
            }

            // Get customer addresses and fill array with their information
            $customerAddresses = $this->getCustomerAddresses($customer);

            // Prepare Customer information
            $customerCountsAndTotals = $this->getCustomerTotals($customerId);

            $ordersCount = 0;
            $ordersTotal = 0;
            if ($customerCountsAndTotals
                && array_key_exists(self::KEY_ORDERS_COUNT, $customerCountsAndTotals)
                && array_key_exists(self::KEY_ORDERS_TOTAL, $customerCountsAndTotals)
            ) {
                $ordersCount = (int)$customerCountsAndTotals[self::KEY_ORDERS_COUNT];
                $ordersTotal = (float)$customerCountsAndTotals[self::KEY_ORDERS_TOTAL];
            }

            $customerReturn = array(
                self::KEY_CUSTOMER_ID               => (int)$customer->id,
                self::KEY_SHOP_ID                   => (int)$customer->id_shop,
                self::KEY_EMAIL                     => (string)$customer->email,
                self::KEY_FIRST_NAME                => (string)$customer->firstname,
                self::KEY_LAST_NAME                 => (string)$customer->lastname,
                self::KEY_DATE_ADD                  => self::convertTimestampToMillisecondsTimestamp(
                    strtotime($customer->date_add)
                ),
                self::KEY_ORDERS_COUNT              => $ordersCount,
                self::KEY_FORMATTED_ORDERS_TOTAL    => $this->displayPrice(
                    $ordersTotal,
                    $this->currencyId,
                    $customer->id_lang
                ),
                self::KEY_ADDRESSES                 => $customerAddresses,
                self::KEY_ADDRESSES_COUNT           => count($customerAddresses)
            );
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CUSTOMER_NOT_FOUND, $exception->getMessage());
        }

        $this->customerResponse(
            array_merge($customerReturn, $this->getCustomerOrdersData($customerId, $pageIndex, $pageSize))
        );
    }

    /**
     * @param CustomerCore $customer
     *
     * @return array
     */
    private function getCustomerAddresses($customer)
    {
        $customerAddresses = array();
        if ($customer instanceof Customer) {
            $addresses = $customer->getAddresses($this->languageId);
            foreach ($addresses as $address) {
                $customerAddresses[] = array(
                    self::KEY_ADDRESS_ID            => (int)$address['id_address'],
                    self::KEY_CUSTOMER_ID           => (int)$address['id_customer'],
                    self::KEY_FIRST_NAME            => (string)$address['firstname'],
                    self::KEY_LAST_NAME             => (string)$address['lastname'],
                    self::KEY_COMPANY               => (string)$address['company'],
                    self::KEY_ADDRESS1              => (string)$address['address1'],
                    self::KEY_ADDRESS2              => (string)$address['address2'],
                    self::KEY_VAT_NUMBER            => (string)$address['vat_number'],
                    self::KEY_POST_CODE             => (string)$address['postcode'],
                    self::KEY_CITY                  => (string)$address['city'],
                    self::KEY_COUNTRY               => (string)$address['country'],
                    self::KEY_STATE                 => (string)$address['state'],
                    self::KEY_PHONE                 => (string)$address['phone'],
                    self::KEY_PHONE_MOBILE          => (string)$address['phone_mobile'],
                    self::KEY_DNI                   => (string)$address['dni']
                );
            }
        }

        return $customerAddresses;
    }

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
     *
     * @throws EM1Exception Custom exception
     */
    public function getCustomers(
        $dateFrom,
        $dateTo,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection,
        $onlyWithOrders
    ) {
        // Prepare where, having and order by query parts
        $this->prepareParameters($dateFrom, $dateTo, $sortField, $sortDirection, $onlyWithOrders);

        // Get Customer information and fill array with their information
        $customers = array();
        foreach ($this->getCustomersInformation($pageSize, $pageIndex) as $customerIdWithTotals) {
            /** @var CustomerCore $customer */
            $customer       = new Customer((int)$customerIdWithTotals[self::KEY_ID_CUSTOMER]);
            $ordersTotal    = $this->round($customerIdWithTotals[self::KEY_ORDERS_TOTAL]);

            $customers[] = array(
                self::KEY_CUSTOMER_ID               => (int)$customer->id,
                self::KEY_FIRST_NAME                => (string)$customer->firstname,
                self::KEY_LAST_NAME                 => (string)$customer->lastname,
                self::KEY_EMAIL                     => (string)$customer->email,
                self::KEY_DATE_ADD                  => self::convertTimestampToMillisecondsTimestamp(
                    strtotime($customer->date_add)
                ),
                self::KEY_SHOP_ID                   => (int)$customer->id_shop,
                self::KEY_ORDERS_COUNT              => (int)$customerIdWithTotals[self::KEY_ORDERS_COUNT],
                self::KEY_ORDERS_TOTAL              => $ordersTotal,
                self::KEY_FORMATTED_ORDERS_TOTAL    => $this->displayPrice(
                    $ordersTotal,
                    $this->currencyId,
                    $customer->id_lang
                ),
                self::KEY_ADDRESSES_COUNT           => count($this->getCustomerAddresses($customer))
            );
        }

        $this->customersResponse($customers, $onlyWithOrders);
    }

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
     * @param $dateFrom         int             Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int             Date to get information in format of timestamp with milliseconds
     * @param $searchPhrase     string          Search phrase
     * @param $pageSize         int             Pagination page size number
     * @param $pageIndex        int             Pagination page index number
     * @param $sortField        string          Sorting field based on which sort is applying
     * @param $sortDirection    string          Sorting direction (means, ascending or descending)
     * @param $onlyWithOrders   bool            Flag to see customers with orders only
     *
     * @return                  void            Returns searched formatted customers, or error code if fails
     *
     * @throws                  EM1Exception    Custom exception
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
    ) {
        // Check if search phrase is set and not empty
        if (empty($searchPhrase)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_SEARCH_PHRASE_NOT_SET);
        }

        // Extend where query part based on search phrase
        $this->whereQuery .= $this->prepareSearchDataWherePart($searchPhrase);
        $this->getCustomers(
            $dateFrom,
            $dateTo,
            $pageSize,
            $pageIndex,
            $sortField,
            $sortDirection,
            $onlyWithOrders
        );
    }

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
     * @param $customerId       int             Customer Id
     * @param $pageSize         int             Pagination page size number
     * @param $pageIndex        int             Pagination page index number
     *
     * @return                  void            Returns searched formatted abandoned carts, or error code if fails
     *
     * @throws                  EM1Exception    Custom exception
     */
    public function getCustomerOrders($customerId, $pageIndex, $pageSize)
    {
        // Create Customer object and validate after initialisation
        $customer = new Customer($customerId);
        if (!Validate::isLoadedObject($customer)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CUSTOMER_NOT_FOUND);
        }

        self::generateResponse($this->getCustomerOrdersData($customerId, $pageIndex, $pageSize));
    }

    /**
     * Get customer orders data
     *
     * @param $customerId       int             Customer Id
     * @param $pageSize         int             Pagination page size number
     * @param $pageIndex        int             Pagination page index number
     *
     * @return                  array           Returns cart products data
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function getCustomerOrdersData($customerId, $pageIndex, $pageSize)
    {
        // Get Customer orders information and fill array with their information
        // Create Customer object and validate after initialisation
        /** @var CustomerCore $customer */
        $customer = new Customer($customerId);
        if (!Validate::isLoadedObject($customer)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CUSTOMER_NOT_FOUND);
        }

        $customerOrders = array();
        foreach ($this->getCustomerOrdersInformation($customerId, $pageIndex, $pageSize) as $customerOrderValue) {
            try {
                /** @var Order $order */
                $order              = new Order((int)$customerOrderValue[self::KEY_ID_ORDER]);
                $customerOrderTotal = $this->round($order->total_paid_tax_incl);

                $customerOrders[] = array(
                    self::KEY_ORDERS_ID             => (int)$order->id,
                    self::KEY_REFERENCE             => (string)$order->reference,
                    self::KEY_SHOP_ID               => (int)$order->id_shop,
                    self::KEY_CUSTOMER_ID           => (int)$order->id_customer,
                    self::KEY_CUSTOMER_EMAIL        => (string)$customer->email,
                    self::KEY_CUSTOMER_FIRST_NAME   => (string)$customer->firstname,
                    self::KEY_CUSTOMER_LAST_NAME    => (string)$customer->lastname,
                    self::KEY_STATUS_ID             => (int)$order->current_state,
                    self::KEY_TOTAL                 => $customerOrderTotal,
                    self::KEY_FORMATTED_TOTAL       => $this->displayPrice(
                        $customerOrderTotal,
                        $order->id_currency,
                        $order->id_lang
                    ),
                    self::KEY_DATE_ADD              => self::convertTimestampToMillisecondsTimestamp(
                        strtotime($order->date_add)
                    ),
                    self::KEY_PRODUCTS_COUNT        => (int)$customerOrderValue[self::KEY_ITEMS_COUNT]
                );
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR,
                    $exception->getMessage()
                );
            }
        }

        return array(self::KEY_ORDERS => $customerOrders);
    }

    /**
     * Get customer totals
     *
     * @param $customerId       int             Customer Id
     *
     * @return                  array           Return array with result or error code if fails
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function getCustomerTotals($customerId)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryRow(
            $dbQuery->select(
                'COUNT(*) AS orders_count, 
                 IFNULL(SUM(o.`total_paid_tax_incl`/o.`conversion_rate`), 0) AS orders_total'
            )
                ->from('orders', 'o')
                ->where('o.`id_customer` = ' . $customerId)
        );
    }

    /**
     * Get customer ids and additional information
     *
     * @param $pageSize         int             Pagination page size number
     * @param $pageIndex        int             Pagination page index number
     *
     * @return                  array           Return array with result or error code if fails
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function getCustomersInformation($pageSize, $pageIndex)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryResult(
            $dbQuery->select('
                c.`id_customer`, 
                COUNT(o.`id_order`) AS orders_count, 
                SUM(o.`total_paid_tax_incl`/o.`conversion_rate`) AS orders_total
            ')
                ->from('customer', 'c')
                ->leftJoin('orders', 'o', 'o.`id_customer` = c.`id_customer`')
                ->where($this->whereQuery)
                ->groupBy('c.`id_customer`')
                ->orderBy($this->orderByQuery)
                ->having($this->havingQuery)
                ->limit($pageSize, $this->getLimitOffset($pageSize, $pageIndex))
        );
    }

    /**
     * Get customers count
     *
     * @param $onlyWithOrders   bool            Flag to see customers with orders only
     *
     * @return                  array           Return array with result or error code if fails
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function getCustomersCount($onlyWithOrders)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery    = new DbQuery();
        $where      = $this->whereQuery;

        // Execute query after build it
        if ($onlyWithOrders) {
            /** @var DbQueryCore $whereDbQuery */
            $whereDbQuery = new DbQuery();
            $query = $whereDbQuery->select('c.`id_customer`')
                ->from('customer', 'c')
                ->innerJoin('orders', 'o', 'o.`id_customer` = c.`id_customer`')
                ->groupBy('c.`id_customer`')
                ->having($this->havingQuery)
                ->build();
            $where .= ' AND c.`id_customer` IN (' . $query . ')';
        }

        return self::getQueryRow(
            $dbQuery->select('COUNT(*) AS `customers_count`')
                ->from('customer', 'c')
                ->where($where)
        );
    }

    /**
     * Get customer orders ids and additional information
     *
     * @param $customerId       int             Customer Id
     * @param $pageSize         int             Pagination page size number
     * @param $pageIndex        int             Pagination page index number
     *
     * @return                  array           Return array with result or error code if fails
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function getCustomerOrdersInformation($customerId, $pageIndex, $pageSize)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryResult(
            $dbQuery->select('
                o.`id_order`, 
                COUNT(od.`id_order_detail`) AS items_count
            ')
            ->from('orders', 'o')
            ->leftJoin('order_detail', 'od', 'od.`id_order` = o.`id_order`')
            ->where('o.`id_customer` = '.$customerId)
            ->orderBy('o.`id_order` DESC')
            ->groupBy('o.`id_order`')
            ->limit($pageSize, $this->getLimitOffset($pageSize, $pageIndex))
        );
    }

    /**
     * Prepare where and order by query parts before using in queries
     *
     * @param $dateFrom         int             Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int             Date to get information in format of timestamp with milliseconds
     * @param $sortField        string          Sorting field based on which sort is applying
     * @param $sortDirection    string          Sorting direction (means, ascending or descending)
     * @param $onlyWithOrders   bool            Flag to see customers with orders only
     *
     * @return                  void            initiate instance variables with values
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function prepareParameters(
        $dateFrom,
        $dateTo,
        $sortField,
        $sortDirection,
        $onlyWithOrders
    ) {
        // Prepare query parts:
        // Prepare sorting parameters
        $this->orderByQuery = $this->getOrderBy($sortField, $sortDirection);

        // Prepare where query parts
        $this->whereQuery  .= Shop::addSqlRestriction(Shop::SHARE_CUSTOMER, 'c');
        $this->whereQuery  .= $this->prepareDateRangeWherePart($dateFrom, $dateTo);

        // Prepare having query parts
        if ($onlyWithOrders) {
            $this->havingQuery .= ' AND COUNT(o.`id_order`) > 0';
        }
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
                " AND c.`date_add` >= '" . date(
                    EM1Constants::GLOBAL_DATE_FORMAT,
                    self::convertMillisecondsTimestampToTimestamp($dateFrom)
                ) . "' AND c.`date_add` <= '" . date(
                    EM1Constants::GLOBAL_DATE_FORMAT,
                    self::convertMillisecondsTimestampToTimestamp($dateTo)
                ) . "' ";
        }

        return '';
    }

    /**
     * Prepare search query part before using in where statement
     *
     * @param $searchPhrase     string  Search phrase
     *
     * @return                  string  Returns part of where statement and search condition values
     */
    private function prepareSearchDataWherePart($searchPhrase)
    {
        if (preg_match('/^\d+(?:,\d+)*$/', $searchPhrase)) {
            return /** @lang MySQL */
                ' AND c.`id_customer` IN (' . pSQL($searchPhrase) . ')';
        }

        return /** @lang MySQL */
            " AND (CONCAT(c.`firstname`, ' ', c.`lastname`) LIKE '%" . pSQL($searchPhrase) . "%'  
               OR c.`email` LIKE '%" . pSQL($searchPhrase) . "%') AND c.active = 1";
    }

    /**
     * Get limit offset value based on pageSize and pageIndex
     *
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  int     Returns query limit offset value
     */
    private function getLimitOffset($pageSize, $pageIndex)
    {
        $limitOffset = 0;
        if ($pageIndex) {
            $limitOffset = ($pageIndex - 1) * $pageSize;
        }

        return $limitOffset ?: 0;
    }

    /**
     * Get order by query part
     *
     * @param $sortField        string          Sorting field based on which sort is applying
     * @param $sortDirection    string          Sorting direction (means, ascending or descending)
     *
     * @return                  string          Returns order query part
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function getOrderBy($sortField, $sortDirection)
    {
        if (!array_key_exists($sortField, self::KEY_ORDER_BY)
            || !array_key_exists($sortDirection, self::KEY_ORDER_BY_DIRECTION)
        ) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_INCORRECT_SORT_DATA);
        }

        $orderBy = self::KEY_ORDER_BY[$sortField];
        $orderByDirection = self::KEY_ORDER_BY_DIRECTION[$sortDirection];

        return "$orderBy $orderByDirection";
    }

    /**
     * Formatted customers response
     *
     * @param $customersData    array   Array with formatted customers
     * @param $onlyWithOrders   bool    Flag to see customers with orders only
     *
     * @return                  void    Returns json formatted response (Content-Type: application/json)
     *
     * @throws EM1Exception Custom exception
     */
    private function customersResponse($customersData = array(), $onlyWithOrders = false)
    {
        $customerCount = $this->getCustomersCount($onlyWithOrders);
        self::generateResponse(
            array(
                self::KEY_CUSTOMERS         => $customersData,
                self::KEY_CUSTOMERS_COUNT   => (int)$customerCount[self::KEY_CUSTOMERS_COUNT]
            )
        );
    }

    /**
     * Formatted customer response
     *
     * @param $customerData    array    Array with formatted customer
     *
     * @return                 void     Returns json formatted response (Content-Type: application/json)
     */
    private function customerResponse($customerData = array())
    {
        self::generateResponse(
            array(self::KEY_CUSTOMER => $customerData)
        );
    }

    /**
     * @param $searchPhrase
     * @throws EM1Exception
     */
    public function searchProductEditCustomers($searchPhrase)
    {
        self::generateResponse([
                'customers' => $this->searchCustomersByPhrase($searchPhrase)
            ]);
    }

    /**
     * simple search customers by $searchPhrase
     *
     * @param $searchPhrase
     * @return array
     * @throws EM1Exception
     */
    private function searchCustomersByPhrase($searchPhrase)
    {
        if ($searchPhrase == null) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_SEARCH_PHRASE_NOT_SET);
        }
        $customersArray = [];
        $this->whereQuery .= $this->prepareSearchDataWherePart($searchPhrase);
        $dbQuery = new DbQuery();
        try {
            $customers = self::getQueryResult(
                $dbQuery->select('
                c.`id_customer`, 
                c.`firstname`, 
                c.`lastname`, 
                c.`email` 
                ')
                    ->from('customer', 'c')
                    ->where($this->whereQuery)
            );
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        foreach ($customers as $customer) {
            $customersArray[] = [
                'customer_id' => $customer['id_customer'],
                'first_name'  => $customer['firstname'],
                'last_name'   => $customer['lastname'],
                'email'       => $customer['email']
            ];
        }

        return $customersArray;
    }
}

/**
 * Included files
 */
function includedCustomerFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/customer/EM1CustomerInterface.php';
}
