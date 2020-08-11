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

includedDashboardFiles();

/***
 * Class MADashboard
 */
class MADashboard extends EM1Main implements EM1DashboardInterface
{
    /** @var int $shopId shop_id from request, id_shop field in database */
    protected $shopId;

    /** @var int $languageId lang_id from request, id_lang field in database */
    protected $languageId;

    /** @var int $currencyId currency_id from request, id_currency field in database */
    protected $currencyId;

    /** @var int $dateFrom date_from from request in format of timestamp with milliseconds */
    protected $dateFrom;

    /** @var int $dateTo date_to from request in format of timestamp with milliseconds */
    protected $dateTo;

    /** @var array $orderStatuses order_statuses from request */
    protected $orderStatuses;

    /** @var string $dashboardGrouping dashboard grouping value */
    protected $dashboardGrouping;

    /**
     * MADashboard constructor.
     *
     * @param $shopId                   int
     * @param $languageId               int
     * @param $currencyId               int
     * @param $dateFrom                 int
     * @param $dateTo                   int
     * @param $orderStatuses            array
     *
     * @throws EM1Exception
     */
    public function __construct(
        $shopId,
        $languageId,
        $currencyId,
        $dateFrom,
        $dateTo,
        $orderStatuses = array()
    ) {

        $this->shopId               = $shopId;
        $this->currencyId           = $currencyId;
        $this->languageId           = $languageId;
        $this->orderStatuses        = implode(',', $orderStatuses);

        // Prepare dates before using
        if (!empty($dateFrom) && !empty($dateTo) && $dateFrom !== -1 && $dateTo !== -1) {
            $this->dateFrom = self::convertMillisecondsTimestampToTimestamp($dateFrom);
            $this->dateTo   = self::convertMillisecondsTimestampToTimestamp($dateTo);
        }

        if ($dateTo === -1 || $dateFrom === -1) {
            try {
                $dateRange = self::getQueryRow(
                    'SELECT MIN(dateRange.max_date) AS `date_from`, MAX(dateRange.min_date) AS `date_to` FROM (
                    SELECT MIN(`date_add`) AS `max_date`, MAX(`date_add`) AS `min_date`
                    FROM `' . _DB_PREFIX_ . 'orders`
                    UNION ALL
                    SELECT MIN(`date_add`) AS `max_date`, MAX(`date_add`) AS `min_date`
                    FROM `' . _DB_PREFIX_ . 'customer`
                ) AS dateRange'
                );

                if (empty($this->dateFrom) && !empty($dateRange)) {
                    $this->dateFrom = strtotime($dateRange[self::KEY_DATE_FROM]);
                }

                if (empty($this->dateTo) && !empty($dateRange)) {
                    $this->dateTo = strtotime($dateRange[self::KEY_DATE_TO]);
                }
            } catch (PrestaShopException $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $e->getMessage());
            }
        }

        $this->dashboardGrouping    = $this->getDashboardGrouping($this->dateFrom, $this->dateTo);
    }

    /**
     * @param $timestampFrom
     * @param $timestampTo
     * @return string
     * @throws EM1Exception
     */
    private function getDashboardGrouping($timestampFrom, $timestampTo)
    {
        try {
            $dateTo     = new DateTime(date(EM1Constants::GLOBAL_DATE_FORMAT, $timestampTo));
            $dateFrom   = new DateTime(date(EM1Constants::GLOBAL_DATE_FORMAT, $timestampFrom));
        } catch (Exception $e) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_CREATE_DATETIME_OBJECT,
                $e->getMessage()
            );
        }

        /** @var DateTime $dateTo */
        /** @var DateTime $dateFrom */
        $timestampDifferences = date_diff($dateTo, $dateFrom);
        switch (true) {
            case ($timestampDifferences->y >= 1):
                return self::GROUP_BY_MONTH;
            case ($timestampDifferences->y === 0 && $timestampDifferences->m >= 3):
                return self::GROUP_BY_WEEK;
            case ($timestampDifferences->y === 0 && $timestampDifferences->days <= 3):
                return self::GROUP_BY_HOUR;
            default:
                return self::GROUP_BY_DAY;
        }
    }

    /**
     * Here we get full store statistics -  orders customers total sales
     * @throws EM1Exception
     */
    public function getDashboard()
    {
        $storeStatisticData = array();

        // Get statistics data
        $statisticData              = $this->getStoreStatisticsData();
        $dataGraphsData             = $this->getGraphsData();
        $orderStatusStatisticData   = $this->getStatusStatistic();

        // Convert total sales price depending on currency
        // Add count and sum of orders into return array
        // Add count and sum of products into return array
        // Add count of customers into return array
        $storeStatisticData[self::KEY_STORE_STATISTICS] = array(
            self::KEY_ORDERS_TOTAL      => (double)$statisticData[self::KEY_ORDERS]['orders_total'],
            self::KEY_ORDERS_COUNT      => (int)$statisticData[self::KEY_ORDERS]['orders_count'],
            self::KEY_PRODUCTS_COUNT    => (int)$statisticData[self::KEY_PRODUCTS]['products_count'],
            self::KEY_CUSTOMERS_COUNT   => (int)$statisticData[self::KEY_CUSTOMERS]['customers_count'],
        );

        self::generateResponse(array_merge($storeStatisticData, $dataGraphsData, $orderStatusStatisticData));
    }

    /**
     * Prepare data with sql requests
     * @throws EM1Exception
     */
    private function getStoreStatisticsData()
    {
        // Get statistics data of orders
        // Get statistics data of products
        // Get count of customers
        return array(
            self::KEY_ORDERS    => $this->getOrdersStoreStatisticData(),
            self::KEY_PRODUCTS  => $this->getProductsStoreStatisticsData(),
            self::KEY_CUSTOMERS => $this->getCustomersStoreStatisticsData(),
        );
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    public function getOrdersStoreStatisticData()
    {
        $queryDBWhereParts = array();
        // Prepare where statements
        if ($this->dateFrom !== $this->dateTo) {
            $queryDBWhereParts[] = 'o.date_add >= \'' . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateFrom) . '\'';
            $queryDBWhereParts[] = 'o.date_add <= \'' . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateTo) . '\'';
        }

        if ($this->shopId > 0) {
            $queryDBWhereParts[] = 'o.id_shop = ' . $this->shopId;
        }

        if (!empty($this->orderStatuses)) {
            $queryDBWhereParts[] = 'o.current_state IN (' . pSQL($this->orderStatuses) . ')';
        }

        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryRow(
            $dbQuery
                ->select('COUNT(o.id_order) AS orders_count, IFNULL(SUM(o.total_paid_tax_excl), 0) AS orders_total')
                ->from('orders', 'o')
                ->leftJoin(
                    'order_state_lang',
                    'osl',
                    'osl.id_order_state = o.current_state AND osl.id_lang = ' . $this->languageId
                )
                ->where(implode(' AND ', $queryDBWhereParts))
        );
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    public function getProductsStoreStatisticsData()
    {
        $queryDBWhereParts = array();
        // Prepare where statements
        if ($this->dateFrom !== $this->dateTo) {
            $queryDBWhereParts[] = 'o.date_add >= \'' . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateFrom) . '\'';
            $queryDBWhereParts[] = 'o.date_add <= \'' . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateTo) . '\'';
        }

        if ($this->shopId > 0) {
            $queryDBWhereParts[] = 'o.id_shop = ' . $this->shopId;
        }

        if (!empty($this->orderStatuses)) {
            $queryDBWhereParts[] = 'o.current_state IN (' . pSQL($this->orderStatuses) . ')';
        }

        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryRow(
            $dbQuery
                ->select('COUNT(od.product_id) AS products_count')
                ->from('orders', 'o')
                ->leftJoin('order_detail', 'od', 'od.id_order = o.id_order')
                ->leftJoin(
                    'order_state_lang',
                    'osl',
                    'osl.id_order_state = o.current_state AND osl.id_lang = ' . $this->languageId
                )
                ->where(implode(' AND ', $queryDBWhereParts))
        );
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    public function getCustomersStoreStatisticsData()
    {
        $queryDBWhereParts = array();
        if ($this->dateFrom !== $this->dateTo) {
            $queryDBWhereParts[] = 'date_add >= \'' . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateFrom) . '\'';
            $queryDBWhereParts[] = 'date_add <= \'' . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateTo) . '\'';
        }
        if ($this->shopId > 0) {
            $queryDBWhereParts[] = 'id_shop = ' . $this->shopId;
        }

        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryRow(
            $dbQuery->select('COUNT(*) AS customers_count')
                ->from('customer')
                ->where(implode(' AND ', $queryDBWhereParts))
        );
    }

    /**
     * Prepare data with sql requests
     *
     * @return array
     * @throws EM1Exception
     */
    public function getGraphsData()
    {
        $startDate  = !empty($this->dateFrom) ? $this->dateFrom : time();
        $endDate    = !empty($this->dateTo) ? $this->dateTo : time();

        $startDateFormatted = date(EM1Constants::GLOBAL_DATE_FORMAT, $startDate);
        $endDateFormatted   = date(EM1Constants::GLOBAL_DATE_FORMAT, $endDate);

        $generalWhereStatement = '';
        $generalWhereIdShop = '';
        if ($this->shopId > 0) {
            $generalWhereIdShop     = ' AND id_shop = ' . $this->shopId . ' ';
            $generalWhereStatement .= ' AND id_shop = ' . $this->shopId . ' ';
        }

        $generalWhereStatuses = '';
        if (!empty($this->orderStatuses)) {
            $generalWhereStatuses = ' AND o.current_state IN (' . pSQL($this->orderStatuses) . ') ';
        }
        // Start get orders
        $ordersWhereStatement    = "AND o.date_add >= '{$startDateFormatted}' AND o.date_add <= '{$endDateFormatted}' "
            . $generalWhereStatement . $generalWhereStatuses;
        $customersWhereStatement = "AND `date_add` >= '{$startDateFormatted}' AND `date_add` <= '{$endDateFormatted}' "
            . $generalWhereIdShop;

        $groupingByDay = false;
        if ($this->dashboardGrouping !== self::GROUP_BY_HOUR) {
            $groupingByDay = true;
        }

        return $this->getGraphsValues(
            $this->getOrderGraphResultData($ordersWhereStatement, $groupingByDay),
            $this->getCustomersGraphResultData($customersWhereStatement, $groupingByDay)
        );
    }

    /**
     * @param $orders
     * @param $customers
     * @return array
     * @throws EM1Exception
     */
    private function getGraphsValues($orders, $customers)
    {
        if (empty($orders) && empty($customers)) {
            $this->graphResponse();
        }

        if (!empty($orders)) {
            try {
                $minDate = $this->getDateTimeTimestamp(reset($orders)[self::KEY_ORDERS_DATE]);
                $maxDate = $this->getDateTimeTimestamp(end($orders)[self::KEY_ORDERS_DATE]);
            } catch (Exception $e) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_COULD_NOT_CREATE_DATETIME_OBJECT,
                    $e->getMessage()
                );
            }
        } elseif (!empty($customers)) {
            try {
                $minDate = $this->getDateTimeTimestamp(reset($customers)[self::KEY_CUSTOMERS_DATE]);
                $maxDate = $this->getDateTimeTimestamp(end($customers)[self::KEY_CUSTOMERS_DATE]);
            } catch (Exception $e) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_COULD_NOT_CREATE_DATETIME_OBJECT,
                    $e->getMessage()
                );
            }
        } else {
            try {
                $orderMinDate = $this->getDateTimeTimestamp(reset($orders)[self::KEY_ORDERS_DATE]);
                $orderMaxDate = $this->getDateTimeTimestamp(end($orders)[self::KEY_ORDERS_DATE]);

                $customerMinDate = $this->getDateTimeTimestamp(reset($customers)[self::KEY_CUSTOMERS_DATE]);
                $customerMaxDate = $this->getDateTimeTimestamp(end($customers)[self::KEY_CUSTOMERS_DATE]);

                $minDate = $orderMinDate > $customerMinDate ? $customerMinDate : $orderMinDate;
                $maxDate = $orderMaxDate > $customerMaxDate ? $orderMaxDate : $customerMaxDate;
            } catch (Exception $e) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_COULD_NOT_CREATE_DATETIME_OBJECT,
                    $e->getMessage()
                );
            }
        }

        if (empty($minDate) && $this->dateFrom > 0) {
            try {
                $minDate = $this->getDateTimeTimestamp($this->dateFrom);
            } catch (Exception $e) {
                throw new EM1Exception(
                    EM1Exception::ERROR_CODE_COULD_NOT_CREATE_DATETIME_OBJECT,
                    $e->getMessage()
                );
            }
        }

        $period = 0;
        $sumOrdersTotal = 0;
        $sumOrdersCount = 0;
        $sumCustomersCount = 0;
        $ordersResult = array();
        $newMaxDate = $maxDate;
        for ($timestamp = $minDate, $dateTime = new DateTime(),
             $dateInterval = new DateInterval(self::INTERVAL[$this->dashboardGrouping]);
             $timestamp <= $maxDate;
             $timestamp = $dateTime->setTimestamp($timestamp)->add($dateInterval)->getTimestamp()) {
            $newMaxDate = $dateTime->setTimestamp($timestamp)->add($dateInterval)->getTimestamp();
        }

        $maxDate = $newMaxDate;
        try {
            for ($timestamp = $minDate, $dateTime = new DateTime(),
                 $dateInterval = new DateInterval(self::INTERVAL[$this->dashboardGrouping]);
                 $timestamp <= $maxDate;
                 $timestamp = $dateTime->setTimestamp($timestamp)->add($dateInterval)->getTimestamp()) {
                $ordersTotal = 0;
                $ordersCount = 0;
                $customerCount = 0;

                foreach ($orders as $orderValue) {
                    $orderDateTime = new DateTime($orderValue[self::KEY_ORDERS_DATE]);
                    $orderTimestamp = $orderDateTime->getTimestamp();
                    if ($this->compareDatesByGrouping($timestamp, $orderTimestamp)) {
                        $ordersTotal += (float)$orderValue[self::KEY_ORDERS_TOTAL];
                        $ordersCount += (int)$orderValue[self::KEY_ORDERS_COUNT];
                        continue;
                    }
                }

                foreach ($customers as $customerValue) {
                    $customerDateTime = new DateTime($customerValue[self::KEY_CUSTOMERS_DATE]);
                    $customerTimestamp = $customerDateTime->getTimestamp();
                    if ($this->compareDatesByGrouping($timestamp, $customerTimestamp)) {
                        $customerCount += (int)$customerValue[self::KEY_CUSTOMERS_COUNT];
                        continue;
                    }
                }

                $ordersResult[] = array(
                    self::KEY_TIMESTAMP         => self::convertTimestampToMillisecondsTimestamp($timestamp),
                    self::KEY_ORDERS_TOTAL      => (float)$ordersTotal,
                    self::KEY_ORDERS_COUNT      => $ordersCount,
                    self::KEY_CUSTOMERS_COUNT   => $customerCount
                );

                $period++;
                $sumOrdersTotal += (float)$ordersTotal;
                $sumOrdersCount += $ordersCount;
                $sumCustomersCount += $customerCount;
            }
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $e->getMessage());
        }

        $averageOrdersTotal     = 0;
        $averageOrdersCount     = 0;
        $averageCustomersCount  = 0;
        if ($period > 0) {
            $averageOrdersTotal = (float)($sumOrdersTotal / $period);
            $averageOrdersCount = (float)($sumOrdersCount / $period);
            $averageCustomersCount = (float)($sumCustomersCount / $period);
        }
        $averageOrdersTotalPerCustomer = ($sumOrdersTotal > 0 && $sumCustomersCount > 0)
            ? $sumOrdersTotal / $sumCustomersCount
            : 0;

        $average = array(
            self::KEY_ORDERS_TOTAL              => Tools::displayPrice($averageOrdersTotal),
            self::KEY_ORDERS_COUNT              => $this->round($averageOrdersCount, 2),
            self::KEY_CUSTOMERS_COUNT           => $this->round($averageCustomersCount, 2),
            self::KEY_ORDERS_TOTAL_PER_CUSTOMER => Tools::displayPrice($averageOrdersTotalPerCustomer)
        );

        $total = array(
            self::KEY_ORDERS_TOTAL => Tools::displayPrice((float)$sumOrdersTotal),
            self::KEY_ORDERS_COUNT => $sumOrdersCount,
            self::KEY_PRODUCTS_COUNT => $this->getProductsStoreStatisticsData()['products_count'],
            self::KEY_CUSTOMERS_COUNT => $sumCustomersCount
        );

        return $this->graphResponse($ordersResult, $average, $total);
    }

    public function graphResponse($graphData = array(), $average = array(), $total = array())
    {
        return array(
            self::KEY_GRAPH_DATA        => $graphData,
            self::KEY_AVERAGE           => $average,
            self::KEY_TOTAL             => $total,
            self::KEY_GROUP_BY          => self::GROUP_BY[$this->dashboardGrouping],
            self::KEY_CURRENCY_SYMBOL   => Currency::getDefaultCurrency()->sign
        );
    }

    /**
     * @param $timestamp
     * @return int
     * @throws EM1Exception
     */
    private function getDateTimeTimestamp($timestamp)
    {
        if (is_string($timestamp)) {
            $timestamp = strtotime($timestamp);
        }
        try {
            $dateTime = new DateTime();
            $dateTimeTimestamp = $dateTime->setTimestamp($timestamp)->getTimestamp();
        } catch (Exception $e) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_COULD_NOT_CREATE_DATETIME_OBJECT,
                $e->getMessage()
            );
        }

        return $dateTimeTimestamp;
    }

    public function compareDatesByGrouping($timestamp, $comparedTimestamp)
    {
        switch ($this->dashboardGrouping) {
            case self::GROUP_BY_HOUR:
                return (
                    date('H', $timestamp) === date('H', $comparedTimestamp)
                    && date('d', $timestamp) === date('d', $comparedTimestamp)
                    && date('m', $timestamp) === date('m', $comparedTimestamp)
                    && date('Y', $timestamp) === date('Y', $comparedTimestamp)
                );
            case self::GROUP_BY_DAY:
                return $timestamp === $comparedTimestamp;
            case self::GROUP_BY_WEEK:
                return (
                    date('W', $timestamp) === date('W', $comparedTimestamp)
                    && date('Y', $timestamp) === date('Y', $comparedTimestamp)
                );
            case self::GROUP_BY_MONTH:
                return (
                    date('m', $timestamp) === date('m', $comparedTimestamp)
                    && date('Y', $timestamp) === date('Y', $comparedTimestamp)
                );
            default:
                return false;
        }
    }

    /**
     * @param $ordersWhereStatement
     * @param $groupingByDay
     * @return array
     * @throws EM1Exception
     */
    private function getOrderGraphResultData($ordersWhereStatement, $groupingByDay)
    {
        // Execute query
        return self::getQueryResult(
            'SELECT ' .
            ($groupingByDay ? 'o.`date_add`'
                : "CONCAT(DATE(o.`date_add`), ' ', HOUR(o.`date_add`), ':00:00')") .
            ' AS orders_date,
              SUM(o.`total_paid_tax_excl`) AS orders_total,
              COUNT(o.`id_order`) AS orders_count
          FROM `' . _DB_PREFIX_ . 'orders` AS o
          LEFT JOIN `' . _DB_PREFIX_ . 'order_state_lang` AS osl ON osl.id_order_state = o.current_state
              AND osl.id_lang = ' . $this->languageId . '
          WHERE 1 ' . $ordersWhereStatement .
            Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o') .
            ($groupingByDay ? ' GROUP BY DATE(o.`date_add`)' : ' GROUP BY o.`date_add`') . '
          ORDER BY o.date_add'
        );
    }

    /**
     * @param $customersWhereStatement
     * @param $groupingByDay
     * @return array
     * @throws EM1Exception
     */
    private function getCustomersGraphResultData($customersWhereStatement, $groupingByDay)
    {
        // Execute query
        return self::getQueryResult(
            'SELECT ' .
            ($groupingByDay ? '`date_add`'
                : "CONCAT(DATE(`date_add`), ' ', HOUR(`date_add`), ':00:00')") .
            ' AS customers_date, 
              COUNT(`id_customer`) AS customers_count
          FROM `' . _DB_PREFIX_ . 'customer`
          WHERE 1 ' . $customersWhereStatement .
            ($groupingByDay ? ' GROUP BY DATE(`date_add`)' : ' GROUP BY `date_add`') . '
          ORDER BY date_add'
        );
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    public function getStatusStatistic()
    {
        $orderStatusesReturn = array();
        $orderStatuses = OrderState::getOrderStates($this->languageId);
        foreach ($this->getStatusStatisticData() as $orderStatus) {
            $orderStateId = (int)$orderStatus['id'];
            if ($orderStateId > 0) {
                $statusName = '';
                foreach ($orderStatuses as $status) {
                    if ((int)$status['id_order_state'] == $orderStateId) {
                        $statusName = (string)$status['name'];
                        break;
                    }
                }

                $orderStatusesReturn[] = array(
                    self::KEY_ID                        => $orderStateId,
                    self::KEY_TITLE                     => $statusName,
                    self::KEY_FORMATTED_ORDERS_TOTAL    => Tools::displayPrice((float)$orderStatus['total']),
                    self::KEY_ORDERS_COUNT              => (int)$orderStatus['count'],
                );
            }
        }

        return array(self::KEY_ORDER_STATUSES_STATISTICS => $orderStatusesReturn);
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    private function getStatusStatisticData()
    {
        $queryDBWhereParts = '';

        if ($this->dateFrom !== $this->dateTo) {
            $queryDBWhereParts .= " AND o.`date_add` >= '" . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateFrom)
                . "'";
            $queryDBWhereParts .= " AND o.`date_add` <= '" . date(EM1Constants::GLOBAL_DATE_FORMAT, $this->dateTo)
                . "'";
        }

        if ($this->shopId > 0) {
            $queryDBWhereParts .= ' AND o.`id_shop` = ' . $this->shopId;
        }

        if (!empty($this->orderStatuses)) {
            $queryDBWhereParts .= ' AND o.current_state IN (' . pSQL($this->orderStatuses) . ')';
        }

        // Execute query
        return self::getQueryResult(
            'SELECT o.`current_state` AS `id`, osl.`name` AS title, 
                          COUNT(o.`id_order`) AS count, SUM(o.`total_paid_tax_excl`) AS total
             FROM `' . _DB_PREFIX_ . 'orders` o 
             LEFT JOIN `' . _DB_PREFIX_ . 'order_state_lang` osl ON osl.`id_order_state` = o.`current_state` 
             AND osl.`id_lang` = ' . $this->languageId . '
             WHERE 1 ' . $queryDBWhereParts . '
             GROUP BY o.`current_state`
             ORDER BY count DESC '
        );
    }

    public function graphGroupingIdentifier($timestamp)
    {
        switch ($this->dashboardGrouping) {
            case self::GROUP_BY_HOUR:
                return date('H', $timestamp)
                    . date('d', $timestamp)
                    . date('m', $timestamp)
                    . date('Y', $timestamp);
            case self::GROUP_BY_DAY:
                return $timestamp;
            case self::GROUP_BY_WEEK:
                return date('W', $timestamp) . date('Y', $timestamp);
            case self::GROUP_BY_MONTH:
                return date('m', $timestamp) . date('Y', $timestamp);
            default:
                return false;
        }
    }
}

/**
 * Included files
 */
function includedDashboardFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/dashboard/EM1DashboardInterface.php';
}
