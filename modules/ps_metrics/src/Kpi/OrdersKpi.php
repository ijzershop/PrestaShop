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

namespace PrestaShop\Module\Ps_metrics\Kpi;

use PrestaShop\Module\Ps_metrics\Helper\DataHelper;
use PrestaShop\Module\Ps_metrics\Helper\NumberHelper;
use PrestaShop\Module\Ps_metrics\Kpi\Configuration\KpiConfiguration;
use PrestaShop\Module\Ps_metrics\Repository\OrdersRepository;

class OrdersKpi extends Kpi implements KpiStrategyInterface
{
    /**
     * @var DataHelper
     */
    private $dataHelper;

    /**
     * @var OrdersRepository
     */
    private $ordersRepository;

    /**
     * @var NumberHelper
     */
    private $numberHelper;

    /**
     * @var RevenuesKpi
     */
    private $revenuesKpi;

    /**
     * Orders kpi constructor.
     *
     * @param KpiConfiguration|null $configuration
     * @param DataHelper $dataHelper
     * @param OrdersRepository $ordersRepository
     * @param NumberHelper $numberHelper
     * @param RevenuesKpi $revenuesKpi
     */
    public function __construct(
        KpiConfiguration $configuration = null,
        DataHelper $dataHelper,
        OrdersRepository $ordersRepository,
        NumberHelper $numberHelper,
        RevenuesKpi $revenuesKpi
    ) {
        $this->ordersRepository = $ordersRepository;
        $this->dataHelper = $dataHelper;
        $this->numberHelper = $numberHelper;
        $this->revenuesKpi = $revenuesKpi;

        if ($configuration !== null) {
            $this->setConfiguration($configuration);
        }
    }

    /**
     * Return all orders data
     *
     * @return array
     */
    public function present()
    {
        $orders = $this->ordersRepository->findAllOrdersByDateAndGranularity();

        if ('weeks' === $this->getConfiguration()->granularity['type']) {
            $orders = $this->dataHelper->transformToGranularityWeeks($orders, ['orders']);
        }
        if ('hours' === $this->getConfiguration()->granularity['type']) {
            $orders = $this->dataHelper->transformToGranularityHours($orders, ['orders']);
        }

        $cartsOrdered = $this->ordersRepository->findAllCartsOrderedByDate();

        $total = $this->getTotalShopOrders($orders);

        $this->revenuesKpi->setConfiguration($this->getConfiguration());
        $revenuesTotal = $this->revenuesKpi->getTotal();

        return [
            'orders' => $this->dataHelper->modifyArrayMainKeys($orders, 'date'),
            'total' => $total,
            'orderCartAverage' => $this->numberHelper->division($revenuesTotal, $total),
            'ordersAbandonedCarts' => $this->getAbandonedCarts($cartsOrdered),
            'topOrderedProduct' => $this->ordersRepository->findTopOrderedProduct(),
        ];
    }

    /**
     * Get total orders
     *
     * @return int
     */
    public function getTotal()
    {
        return $this->getTotalShopOrders(
            $this->ordersRepository->findAllOrdersByDateAndGranularity()
        );
    }

    /**
     * getTotalShopOrders
     *
     * @param array $orders
     *
     * @return int
     */
    public function getTotalShopOrders(array $orders = [])
    {
        if (empty($orders)) {
            return 0;
        }

        $total = 0;

        foreach ($orders as $order) {
            $total += (int) $order['orders'];
        }

        return $total;
    }

    /**
     * getAbandonedCarts
     *
     * @param array $cartsOrdered
     *
     * @return float
     */
    public function getAbandonedCarts(array $cartsOrdered)
    {
        // To prevent division by 0
        if ($cartsOrdered['all_cart'] !== 0 && $cartsOrdered['ordered'] === 0) {
            return 100;
        }

        if ($cartsOrdered['all_cart'] == 0) {
            return 0;
        }

        // Get the percentage of abandoned carts
        $percent = 100 - ($cartsOrdered['ordered'] / $cartsOrdered['all_cart']) * 100;

        return round($percent, 2);
    }

    /**
     * @param KpiConfiguration $configuration
     */
    public function setConfiguration(KpiConfiguration $configuration)
    {
        parent::setConfiguration($configuration);

        $this->ordersRepository->setFilters(
            $this->getConfiguration()->dateRange['startDate'],
            $this->getConfiguration()->dateRange['endDate'],
            $this->getConfiguration()->granularity['forSql']
        );
    }
}
