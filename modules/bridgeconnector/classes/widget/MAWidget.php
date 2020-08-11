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

includedWidgetFiles();

/**
 * Class MAWidget
 */

class MAWidget extends EM1Main implements EM1WidgetInterface
{
    /** @var int $shopId shop_id from request, id_shop field in database */
    protected $shopId;

    /** @var int $langId lang_id from request, id_lang field in database */
    protected $langId;

    /** @var int $dateFrom date_from from request in format of timestamp with milliseconds */
    private $dateFrom;

    /** @var int $dateTo date_to from request in format of timestamp with milliseconds */
    private $dateTo;

    /** @var string $orderStatuses order_statuses from request */
    private $orderStatuses;

    /** @var string $orderStatuses order_statuses from request */
    private $whereQuery = '1';

    /**
     * MAWidget constructor.
     * @param   $shopId   int
     */

    public function __construct($shopId)
    {
        $this->shopId = $shopId;
    }

    /**
     * @param $dateFrom
     * @param $dateTo
     * @param array $orderStatuses
     * @throws EM1Exception
     */
    public function getWidgetData($dateFrom, $dateTo, $orderStatuses = array())
    {
        $this->prepareData($dateFrom, $dateTo, $orderStatuses);
        $this->widgetResponse(
            array_merge(
                $this->getOrdersData(),
                $this->getCustomerData()
            )
        );
    }

    public function widgetResponse($widgetData = array())
    {
        self::generateResponse(
            array(
                self::KEY_CUSTOMERS_COUNT           => (int)$widgetData['customers_count'],
                self::KEY_ORDERS_COUNT              => (int)$widgetData['orders_count'],
                self::KEY_FORMATTED_ORDERS_TOTAL    => Tools::displayPrice((float)$widgetData['orders_total'])
            )
        );
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    private function getOrdersData()
    {
        // Prepare where statements
        $this->prepareConditions(true, 'o');

        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryRow(
            $dbQuery->select(
                'COUNT(o.`id_order`) AS orders_count, 
                    IFNULL(SUM(o.`total_paid_tax_incl`/o.`conversion_rate`), 0) AS orders_total'
            )
                ->from('orders', 'o')
                ->leftJoin(
                    'order_state_lang',
                    'osl',
                    'osl.`id_order_state` = o.`current_state` AND osl.`id_lang` = '
                    . (int)Configuration::get('PS_LANG_DEFAULT')
                )
                ->where($this->whereQuery)
        );
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    private function getCustomerData()
    {
        // Prepare where statements
        $this->prepareConditions();

        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryRow(
            $dbQuery->select('COUNT(*) AS customers_count')
                ->from('customer')
                ->where($this->whereQuery)
        );
    }

    /**
     * @param $dateFrom
     * @param $dateTo
     * @param $orderStatuses
     * @throws EM1Exception
     */
    private function prepareData($dateFrom, $dateTo, $orderStatuses)
    {
        // Prepare dates before using
        if (!empty($dateFrom) && !empty($dateTo) && $dateFrom !== -1 && $dateTo !== -1) {
            $this->dateFrom = self::convertMillisecondsTimestampToTimestamp($dateFrom);
            $this->dateTo   = self::convertMillisecondsTimestampToTimestamp($dateTo);
        }

        if ($dateTo === -1 || $dateFrom === -1) {
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
                $this->dateFrom = strtotime($dateRange['date_from']);
            }

            if (empty($this->dateTo) && !empty($dateRange)) {
                $this->dateTo = strtotime($dateRange['date_to']);
            }
        }

        $this->orderStatuses = implode(',', $orderStatuses);
    }

    private function prepareConditions($includeOrderStatuses = false, $alias = null)
    {
        // Prepare where statements
        $this->whereQuery = '1';
        if ($this->dateFrom !== $this->dateTo) {
            $this->whereQuery .= ' AND ' . ($alias ? pSQL($alias.'.') : '')
                . '`date_add` >= \'' . date(self::WIDGET_DATE_FORMAT, $this->dateFrom) . '\'';
            $this->whereQuery .= ' AND ' . ($alias ? pSQL($alias.'.') : '')
                . '`date_add` <= \'' . date(self::WIDGET_DATE_FORMAT, $this->dateTo) . '\'';
        }

        if ($this->shopId > 0) {
            $this->whereQuery .= ' AND ' . ($alias ? pSQL($alias.'.') : '') . '`id_shop` = ' . $this->shopId;
        }

        if ($includeOrderStatuses && !empty($this->orderStatuses)) {
            $this->whereQuery .= ' AND ' . ($alias ? pSQL($alias.'.') : '')
                . '`current_state` IN (' . pSQL($this->orderStatuses) . ')';
        }

        return $this->whereQuery;
    }
}

/**
 *
 */
function includedWidgetFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/widget/EM1WidgetInterface.php';
}
