<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Data;

use PrestaShop\Module\Ps_metrics\Helper\DataHelper;
use PrestaShop\Module\Ps_metrics\Repository\OrdersRepository;

class RevenuesData implements DataInterface
{
    /**
     * @var OrdersRepository
     */
    private $orderRepository;

    /**
     * @var string
     */
    private $granularity;

    /**
     * @var DataHelper
     */
    private $dataHelper;

    /**
     * @var array
     */
    private $dateRange;

    /**
     * __construct
     *
     * @param array $dateRange
     * @param array $granularity
     *
     * @return void
     */
    public function __construct(array $dateRange, $granularity)
    {
        $this->dataHelper = new DataHelper();
        $this->granularity = $granularity['type'];
        $this->dateRange = $dateRange;
        $this->orderRepository = new OrdersRepository(
            $dateRange['startDate'],
            $dateRange['endDate'],
            $granularity['forSql']
        );
    }

    /**
     * Return data
     *
     * @return array
     */
    public function getAll()
    {
        $revenues = $this->getRevenues();
        $revenuesTotal = $this->getTotalRevenues($revenues);

        return [
            'revenues' => $this->dataHelper->modifyArrayMainKeys($revenues, 'date'),
            'categories' => $this->getRevenuesPerCategoryFinalArray(),
            'total' => $revenuesTotal,
        ];
    }

    /**
     * Retrieve revenues
     *
     * @return array
     */
    public function getRevenues()
    {
        $revenues = $this->dataHelper->subtractDataRecursively(
            $this->orderRepository->findAllRevenuesByDateAndGranularity(),
            'revenues',
            'refund'
        );

        if ('weeks' === $this->granularity) {
            $revenues = $this->dataHelper->transformToGranularityWeeks($revenues, 'revenues');
        }

        return $revenues;
    }

    /**
     * Retrieve Categories data
     *
     * @return array
     */
    public function getCategories()
    {
        return $this->getRevenuesPerCategoryFinalArray();
    }

    /**
     * Retrieve total data
     *
     * @return float
     */
    public function getTotal()
    {
        return $this->getTotalRevenues(
            $this->getRevenues()
        );
    }

    /**
     * getTotalRevenues
     *
     * @param array $revenues
     *
     * @return float
     */
    public function getTotalRevenues(array $revenues = [])
    {
        if (empty($revenues)) {
            return 0;
        }

        $total = 0;

        foreach ($revenues as $revenue) {
            $total += (float) $revenue['revenues'];
        }

        return $total;
    }

    /**
     * Complete a revenue table for customers without orders and customers with orders
     *
     * @return array
     */
    public function getTotalCustomersRevenues()
    {
        $revenues = $this->dataHelper->subtractDataRecursively(
            $this->orderRepository->findAllRevenuesByCustomerByDateAndGranularity(),
            'revenues',
            'refund'
        );
        $totalWithOrders = 0;
        $totalWithoutOrders = 0;

        foreach ($revenues as $revenue) {
            if (true === $this->isCustomerNew($revenue['id_customer'], $revenue['date'])) {
                $totalWithoutOrders += $revenue['revenues'];
            } else {
                $totalWithOrders += $revenue['revenues'];
            }
        }

        return [
            'customer_with_orders' => $totalWithOrders,
            'customer_without_orders' => $totalWithoutOrders,
        ];
    }

    /**
     * Retrieve customer orders and tells if he was a new customer or not in the given date
     *
     * @param int $customerId
     * @param string $invoiceDate
     *
     * @return bool
     */
    private function isCustomerNew($customerId, $invoiceDate)
    {
        $customerOrdersTotal = (int) $this->orderRepository->findCustomerInvoiceDateBySpecificDate(
            $customerId,
            $invoiceDate . ' 23:59:59'
        );

        if ($customerOrdersTotal <= 1) {
            return true;
        }

        return false;
    }

    /**
     * getRevenuesPerCategoryFinalArray
     *
     * @return array
     */
    public function getRevenuesPerCategoryFinalArray()
    {
        $revenuesPerCategory = $this->dataHelper->subtractDataRecursively(
            $this->orderRepository->findAllBestCategoriesRevenuesByDate(),
            'revenues',
            'refund'
        );

        $revenuesPerCategory = $this->dataHelper->arrayMultiSort($revenuesPerCategory, 'revenues');
        $finalArray = [];
        $dateRangeStart = date('Y-m-d', strtotime($this->dateRange['startDate']));
        $dateRangeEnd = date('Y-m-d', strtotime($this->dateRange['endDate']));

        foreach ($revenuesPerCategory as $category) {
            $dateOrder = date('Y-m-d', strtotime($category['date_add']));
            if (($dateOrder >= $dateRangeStart) && ($dateOrder <= $dateRangeEnd)) {
                $finalArray[] = [
                    'name' => $category['name'],
                    'value' => ($category['revenues']),
                ];
            }
        }

        return array_splice($finalArray, 0, 10);
    }
}
