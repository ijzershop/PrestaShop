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

use PrestaShop\Module\Ps_metrics\Helper\NumberHelper;

class ConversionRateData implements DataInterface
{
    /**
     * @var array
     */
    private $googleStats;

    /**
     * @var array
     */
    private $orders;

    /**
     * __construct
     *
     * @param array $googleStats
     * @param array $orders
     *
     * @return void
     */
    public function __construct(array $googleStats, array $orders)
    {
        $this->googleStats = $googleStats;
        $this->orders = $orders;
    }

    /**
     * Retrun data
     *
     * @return array
     */
    public function getAll()
    {
        if (empty($this->googleStats)) {
            return [
                'conversionRate' => [],
                'conversionRateTotal' => [],
            ];
        }

        return [
            'conversionRate' => $this->getConversionRate($this->googleStats['byDate'], $this->orders['orders']),
            'conversionRateTotal' => $this->getConversionRateTotal($this->googleStats['total'], $this->orders['total']),
        ];
    }

    /**
     * getConversionRate
     *
     * @param array $sessionsByDate
     * @param array $ordersByDate
     *
     * @return array
     */
    public function getConversionRate(array $sessionsByDate, array $ordersByDate)
    {
        $number = new NumberHelper();
        $conversionList = [];

        foreach ($sessionsByDate as $session) {
            $conversion = 0;

            foreach ($ordersByDate as $order) {
                if ($session['date'] === $order['date']) {
                    $conversion += $number->division($order['orders'], $session['sessions']) * 100;
                } else {
                    $conversion += 0;
                }
            }

            $conversionList[$session['date']] = [
                'date' => $session['date'],
                'conversion' => $conversion,
            ];
        }

        return $conversionList;
    }

    /**
     * getConversionRateTotal
     *
     * @param array $sessionsTotal
     * @param int $ordersTotal
     *
     * @return array
     */
    public function getConversionRateTotal(array $sessionsTotal, $ordersTotal)
    {
        $number = new NumberHelper();

        return [
            'sessions' => $number->division($ordersTotal, $sessionsTotal['totalSession']) * 100,
            'sessionsUnique' => $number->division($ordersTotal, $sessionsTotal['totalUniqueUser']) * 100,
        ];
    }
}
