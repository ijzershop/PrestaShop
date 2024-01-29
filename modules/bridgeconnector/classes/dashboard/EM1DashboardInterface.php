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
 * Interface EM1DashboardInterface
 */

interface EM1DashboardInterface
{
    const KEY_COUNT_ORDERS                  = 'count_orders';
    const KEY_DATE_FROM                     = 'date_from';
    const KEY_DATE_TO                       = 'date_to';
    const KEY_ORDERS_DATE                   = 'orders_date';
    const KEY_CUSTOMERS_DATE                = 'customers_date';
    const KEY_COUNT_PRODUCTS                = 'count_products';
    const KEY_COUNT_CUSTOMERS               = 'count_customers';
    const KEY_COUNT_NEW_ORDERS              = 'count_new_orders';
    const KEY_TOTAL                         = 'total';
    const KEY_TOTAL_SALES                   = 'total_sales';
    const KEY_LAST_ORDER_ID                 = 'last_order_id';
    const KEY_ORDERS                        = 'orders';
    const KEY_PRODUCTS                      = 'products';
    const KEY_CUSTOMERS                     = 'customers';
    const KEY_LAST_ORDERS                   = 'last_orders';
    const KEY_ORDERS_TOTAL                  = 'orders_total';
    const KEY_ORDERS_COUNT                  = 'orders_count';
    const KEY_PRODUCTS_COUNT                = 'products_count';
    const KEY_CUSTOMERS_COUNT               = 'customers_count';
    const KEY_STORE_STATISTICS              = 'store_statistics';
    const KEY_TIMESTAMP                     = 'timestamp';
    const KEY_ORDERS_TOTAL_PER_CUSTOMER     = 'orders_total_per_customer';
    const KEY_GRAPH_DATA                    = 'graph_data';
    const KEY_AVERAGE                       = 'average';
    const KEY_GROUP_BY                      = 'group_by';
    const KEY_CURRENCY_SYMBOL               = 'currency_symbol';
    const KEY_ID                            = 'id';
    const KEY_TITLE                         = 'title';
    const KEY_FORMATTED_ORDERS_TOTAL        = 'formatted_orders_total';
    const KEY_ORDER_STATUSES_STATISTICS     = 'order_statuses_statistics';

    const INTERVAL_ONE_DAY                  = 'P1D';
    const INTERVAL_ONE_WEEK                 = 'P1W';
    const INTERVAL_ONE_MONTH                = 'P1M';
    const INTERVAL_ONE_HOUR                 = 'PT1H';

    const INTERVAL                          = array(
        self::GROUP_BY_HOUR     => self::INTERVAL_ONE_HOUR,
        self::GROUP_BY_DAY      => self::INTERVAL_ONE_DAY,
        self::GROUP_BY_WEEK     => self::INTERVAL_ONE_WEEK,
        self::GROUP_BY_MONTH    => self::INTERVAL_ONE_MONTH,
    );

    const GROUP_BY                          = array(
        self::GROUP_BY_HOUR     => 'HOUR',
        self::GROUP_BY_DAY      => 'DAY',
        self::GROUP_BY_WEEK     => 'WEEK',
        self::GROUP_BY_MONTH    => 'MONTH',
    );

    const GROUP_BY_DAY                      = 'd';
    const GROUP_BY_MONTH                    = 'm';
    const GROUP_BY_HOUR                     = 'h';
    const GROUP_BY_WEEK                     = 'W';

    /**
     * Some desc
     *
     * @return array
     * @throws EM1Exception
     */
    public function getDashboard();

    /**
     * Some desc
     *
     * @return array
     * @throws EM1Exception
     */
    public function getStatusStatistic();

    /**
     * Some desc
     *
     * @return array
     * @throws EM1Exception
     */
    public function getGraphsData();
}
