<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

namespace GanalyticsPro\Hook;

use GanalyticsPro\Models\orderRefund;
use GanalyticsPro\Models\orderPartialRefund;
use GanalyticsPro\Configuration\moduleConfiguration;

class hookAction implements hookInterface
{
    /**
     * @var string : define hook type
     */
    protected $sHookType = null;

    /**
     * Magic Method __construct assigns few information about hook
     *
     * @param string
     */
    public function __construct($sHookType)
    {
        // set hook type
        $this->sHookType = $sHookType;
    }

    /**
     * Magic Method __destruct
     */
    public function __destruct()
    {
    }

    /**
     * run() method execute hook
     *
     * @param array $aParams
     *
     * @return array
     */
    public function run(array $aParams = null)
    {
        // set variables
        $aDisplayHook = [];

        switch ($this->sHookType) {
            case 'orderStatusUpdate':
                // use case - display update order status
                $aDisplayHook = call_user_func_array([$this, 'runOrderStatusUpdate'], [$aParams]);
                break;
            default:
                break;
        }

        return $aDisplayHook;
    }

    /**
     * runOrderStatusUpdate() method make a refund code when both "cancelled" and "refunded" statuses are reached
     *
     * @param array $aParams
     *
     * @return array
     */
    private function runOrderStatusUpdate($aParams = null)
    {
        try {
            // set
            $aAssign = ['bActive' => false];

            // handle for data refund with GA4
            $aRefundStatus = !empty(\GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) ? unserialize(\GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) : \GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION'];
            $aPartialRefundStatus = !empty(\GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) ? unserialize(\GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) : \GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED'];

            // use case full refund
            if (in_array($aParams['newOrderStatus']->id, $aRefundStatus)) {
                $bRefundData = orderRefund::checkRefundDataExist(\GAnalyticsPro::$iShopId, $aParams['id_order']);

                // If data don't exist insert in on table
                if (empty($bRefundData)) {
                    $oOrder = new \Order($aParams['id_order']);

                    $orderRefund = new orderRefund();
                    $orderRefund->shop_id = (int) \GAnalyticsPro::$iShopId;
                    $orderRefund->order_id = (int) $aParams['id_order'];
                    $orderRefund->cust_id = (int) $oOrder->id_customer;
                    $orderRefund->sent = 0;

                    $orderRefund->add();
                }
            }

            // use case for partial refund
            if (isset($aPartialRefundStatus) && is_array($aPartialRefundStatus)) {
                if (in_array($aParams['newOrderStatus']->id, $aPartialRefundStatus)) {
                    $bRefundDataPartial = orderPartialRefund::checkRefundPartialDataExist(\GAnalyticsPro::$iShopId, $aParams['id_order']);

                    // If data don't exist insert in on table
                    if (empty($bRefundDataPartial)) {
                        $oOrder = new \Order($aParams['id_order']);

                        $orderPartialRefund = new orderPartialRefund();
                        $orderPartialRefund->shop_id = (int) \GAnalyticsPro::$iShopId;
                        $orderPartialRefund->order_id = (int) $aParams['id_order'];
                        $orderPartialRefund->cust_id = (int) $oOrder->id_customer;
                        $orderPartialRefund->sent = 0;

                        $orderPartialRefund->add();
                    }
                }
            }
        } catch (\Exception $e) {
            \PrestaShopLogger::addLog($e->getMessage(), 1, $e->getCode(), null, null, true);
        }
        return ['tpl' => moduleConfiguration::GAP_TPL_HOOK_PATH . 'ajax', 'assign' => $aAssign];
    }
}
