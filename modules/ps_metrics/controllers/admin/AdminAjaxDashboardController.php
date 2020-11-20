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

use PrestaShop\Module\Ps_metrics\Data\ConversionRateData;
use PrestaShop\Module\Ps_metrics\Data\OrdersData;
use PrestaShop\Module\Ps_metrics\Data\RevenuesData;
use PrestaShop\Module\Ps_metrics\Data\TipsCardsData;
use PrestaShop\Module\Ps_metrics\Data\VisitsData;
use PrestaShop\Module\Ps_metrics\Helper\JsonHelper;
use PrestaShop\Module\Ps_metrics\Helper\NumberHelper;
use PrestaShop\Module\Ps_metrics\Module\Uninstall;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;
use PrestaShop\Module\Ps_metrics\Validation\AjaxRetrieveDataValidation;

class AdminAjaxDashboardController extends ModuleAdminController
{
    const DEFAULT_DATA_TYPE = '';
    const DEFAULT_DATE_RANGE = '{startDate: "", endDate: ""}';
    const DEFAULT_GRANULARITY = 'days';

    /**
     * @var JsonHelper
     */
    private $jsonHelper;

    /**
     * Load JsonHelper to avoid jsonEncode issues on AjaxDie
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->jsonHelper = new JsonHelper();
    }

    /**
     * ajaxProcessGetExistingGoogleTags
     *
     * @return void
     */
    public function ajaxProcessRetrieveData()
    {
        $dataType = Tools::getValue('type', self::DEFAULT_DATA_TYPE);
        $dateRange = $this->jsonHelper->jsonDecode(
            Tools::getValue('dateRange', self::DEFAULT_DATE_RANGE)
        );
        $granularity = $this->getGranularityForSqlDates(
            Tools::getValue('granularity', self::DEFAULT_GRANULARITY)
        );

        $this->verifyRetrievedData($dataType, $dateRange, $granularity['type']);

        $configurationValues = new ConfigurationRepository();
        $gaIsOnboarded = (bool) $configurationValues->getGoogleLinkedValue();

        switch ($dataType) {
            case 'total':
                $this->ajaxDie($this->jsonHelper->jsonEncode([
                    'revenuesTotal' => (new RevenuesData($dateRange, $granularity))->getTotal(),
                    'ordersTotal' => (new OrdersData($dateRange, $granularity))->getTotal(),
                    'visits' => (new VisitsData($dateRange, $granularity))->getAll(),
                ]));
                break;

            case 'revenues':
                $revenues = (new RevenuesData($dateRange, $granularity))->getAll();
                $this->ajaxDie($this->jsonHelper->jsonEncode([
                    'revenues' => $revenues['revenues'],
                    'revenuesTotal' => $revenues['total'],
                    'revenuesCategory' => $revenues['categories'],
                ]));
                break;

            case 'orders':
                $orders = (new OrdersData($dateRange, $granularity))->getAll();
                $revenuesTotal = (new RevenuesData($dateRange, $granularity))->getTotal();
                $this->ajaxDie($this->jsonHelper->jsonEncode([
                    'orders' => $orders['orders'],
                    'ordersTotal' => $orders['total'],
                    'orderCartAverage' => (new NumberHelper())->division($revenuesTotal, $orders['total']),
                    'ordersAbandonedCarts' => $orders['abandonedCarts'],
                ]));
                break;

            case 'visits':
                if (!$gaIsOnboarded) {
                    $this->ajaxDie($this->jsonHelper->jsonEncode([]));
                }
                $this->ajaxDie($this->jsonHelper->jsonEncode([
                    'visits' => (new VisitsData($dateRange, $granularity))->getAll(),
                ]));
                break;

            case 'conversion':
                if (!$gaIsOnboarded) {
                    $this->ajaxDie($this->jsonHelper->jsonEncode([]));
                }
                $conversions = (new ConversionRateData(
                    (new VisitsData($dateRange, $granularity))->getAll(),
                    (new OrdersData($dateRange, $granularity))->getAll()
                ))->getAll();
                $this->ajaxDie($this->jsonHelper->jsonEncode([
                    'conversionRate' => $conversions['conversionRate'],
                    'conversionRateTotal' => $conversions['conversionRateTotal'],
                    'revenuesCustomers' => (new RevenuesData($dateRange, $granularity))->getTotalCustomersRevenues(),
                ]));
                break;

            default:
                $this->ajaxDie($this->jsonHelper->jsonEncode([
                    'value' => false,
                    'message' => $this->module->l('Bad data type request'),
                ]));
                break;
        }
    }

    /**
     * ajaxProcessRetrieveTipsCards
     *
     * @return void
     */
    public function ajaxProcessRetrieveTipsCards()
    {
        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'tipsCards' => (new TipsCardsData($this->context))->getAll(),
        ]));
    }

    /**
     * Enable back dashboard module that has been disable at the installation
     *
     * @return void
     */
    public function ajaxProcessEnableDashboardModules()
    {
        $uninstaller = new Uninstall($this->module);

        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'success' => $uninstaller->enableModules(),
        ]));
    }

    /**
     * Use AjaxDie if there's an error on ajaxProcessRetrieveData
     *
     * @param string $dataType
     * @param array $dateRange
     * @param string $granularity
     *
     * @return void
     */
    private function verifyRetrievedData($dataType, array $dateRange, $granularity)
    {
        $dataValidation = new AjaxRetrieveDataValidation();
        $dataTypeError = $dataValidation->dataType($dataType);
        $dateRangeError = $dataValidation->dateRange($dateRange);
        $granularityError = $dataValidation->granularity($granularity);

        if (false === $dataTypeError || false === $dateRangeError || false === $granularityError) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'dataTypeError' => $dataTypeError,
                'dateRangeError' => $dateRangeError,
                'granularityError' => $granularityError,
            ]));
        }
    }

    /**
     * getGranularityForSqlDates
     *
     * @param string $granularity
     *
     * @return array
     */
    private function getGranularityForSqlDates($granularity)
    {
        if ('weeks' === $granularity) {
            // for day : 0000-00-00
            return [
                'type' => 'weeks',
                'forSql' => 10,
            ];
        }

        if ('months' === $granularity) {
            // for month : 0000-00
            return [
                'type' => 'months',
                'forSql' => 7,
            ];
        }

        // for day : 0000-00-00
        return [
            'type' => 'days',
            'forSql' => 10,
        ];
    }
}
