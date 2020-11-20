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

use PrestaShop\Module\Ps_metrics\Api\Analytics\Reportings;
use PrestaShop\Module\Ps_metrics\Cache\DataCache;
use PrestaShop\Module\Ps_metrics\Helper\DataHelper;

class VisitsData implements DataInterface
{
    /**
     * @var array
     */
    private $dateRange;

    /**
     * @var DataHelper
     */
    private $dataHelper;

    /**
     * @var DataCache
     */
    private $dataCache;

    /**
     * @var string
     */
    private $granularity;

    /**
     * __construct
     *
     * @param array $dateRange
     * @param array $granularity
     *
     * @return void
     */
    public function __construct(array $dateRange, array $granularity)
    {
        $this->dateRange = $dateRange;
        $this->dataHelper = new DataHelper();
        $this->dataCache = new DataCache();
        $this->granularity = $granularity['type'];
    }

    /**
     * Return all visits data
     *
     * @return array
     */
    public function getAll()
    {
        $dataCacheName = 'visits' . implode($this->dateRange) . $this->granularity;
        $visitsCache = $this->dataCache->get($dataCacheName);

        if (false !== $visitsCache) {
            return $visitsCache;
        }

        $googleReportings = new Reportings();
        $googleReportings->create();
        $reportings = $googleReportings->getByDate([
            'dateRange' => $this->dateRange,
            'granularity' => $this->granularity,
        ]);

        if (201 !== $reportings['httpCode']) {
            return $this->setEmptyVisitsData();
        }

        return $this->dataCache->set(
            $this->getReworkedGoogleVisitsArray($reportings),
            $dataCacheName
        );
    }

    /**
     * Rework $googleVisits array to get 'byDate' with date key
     *
     * @param array $googleVisits
     *
     * @return array
     */
    private function getReworkedGoogleVisitsArray(array $googleVisits)
    {
        if (empty($googleVisits['body'])) {
            return $this->setEmptyVisitsData();
        }

        $googleVisits['body']['byDate'] = $this->dataHelper->modifyArrayMainKeys($googleVisits['body']['byDate'], 'date');

        return $googleVisits['body'];
    }

    /**
     * setEmptyVisitsData
     *
     * @return array
     */
    private function setEmptyVisitsData()
    {
        return [
            'byCategorie' => [],
            'byDate' => [],
            'bySource' => [],
            'total' => [
                'totalSession' => 0,
                'totalUniqueUser' => 0,
            ],
        ];
    }
}
