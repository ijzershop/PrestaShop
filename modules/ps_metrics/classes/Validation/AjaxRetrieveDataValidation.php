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

namespace PrestaShop\Module\Ps_metrics\Validation;

class AjaxRetrieveDataValidation
{
    /**
     * Verify Data Type
     *
     * @param string $dataType
     *
     * @return bool
     */
    public function dataType($dataType)
    {
        if ('total' === $dataType) {
            return true;
        }

        if ('revenues' === $dataType) {
            return true;
        }

        if ('orders' === $dataType) {
            return true;
        }

        if ('visits' === $dataType) {
            return true;
        }

        if ('conversion' === $dataType) {
            return true;
        }

        return false;
    }

    /**
     * Verify Granularity
     *
     * @param string $granularity
     *
     * @return bool
     */
    public function granularity($granularity)
    {
        if ('days' === $granularity) {
            return true;
        }

        if ('weeks' === $granularity) {
            return true;
        }

        if ('months' === $granularity) {
            return true;
        }

        return false;
    }

    /**
     * Verify Date Range. Range can be 3months max from today
     *
     * @param array $dateRange
     *
     * @return bool
     */
    public function dateRange(array $dateRange)
    {
        $startDate = \DateTime::createFromFormat('Y-m-d', $dateRange['startDate']);
        $endDate = \DateTime::createFromFormat('Y-m-d', $dateRange['endDate']);

        if (false === $startDate || false === $endDate) {
            return false;
        }

        $dateToday = new \DateTime('NOW');
        $dateDiff = $endDate->diff($dateToday);

        if ($this->isMoreThanThreeMonths($dateDiff)) {
            return false;
        }

        return true;
    }

    /**
     * Check if the date difference is more than 3 months or not
     *
     * @param \DateInterval $diff
     *
     * @return bool
     */
    protected function isMoreThanThreeMonths($diff)
    {
        $yearFromDiff = (int) $diff->format('%y');
        $monthFromDiff = (int) $diff->format('%m');
        $monthsDiff = $yearFromDiff * 12 + $monthFromDiff;

        if (3 < $monthsDiff) {
            return true;
        }

        return false;
    }
}
