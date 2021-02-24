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

use PrestaShop\Module\Ps_metrics\Kpi\Configuration\KpiConfiguration;

class TotalKpi extends Kpi implements KpiStrategyInterface
{
    /**
     * @var VisitsKpi
     */
    private $visitsKpi;

    /**
     * @var OrdersKpi
     */
    private $ordersKpi;

    /**
     * @var RevenuesKpi
     */
    private $revenuesKpi;

    /**
     * TotalKpi constructor.
     *
     * @param KpiConfiguration $kpiConfiguration
     * @param VisitsKpi $visitsKpi
     * @param OrdersKpi $ordersKpi
     * @param RevenuesKpi $revenuesKpi
     */
    public function __construct(
        KpiConfiguration $kpiConfiguration,
        VisitsKpi $visitsKpi,
        OrdersKpi $ordersKpi,
        RevenuesKpi $revenuesKpi
    ) {
        parent::__construct($kpiConfiguration);
        $this->visitsKpi = $visitsKpi;
        $this->ordersKpi = $ordersKpi;
        $this->revenuesKpi = $revenuesKpi;
    }

    /**
     * Return all revenues data
     *
     * @return array
     */
    public function present()
    {
        $this->revenuesKpi->setConfiguration($this->getConfiguration());
        $this->ordersKpi->setConfiguration($this->getConfiguration());
        $this->visitsKpi->setConfiguration($this->getConfiguration());

        return [
            'revenuesTotal' => $this->revenuesKpi->getTotal(),
            'ordersTotal' => $this->ordersKpi->getTotal(),
            'visits' => $this->visitsKpi->getTotal(),
        ];
    }
}
