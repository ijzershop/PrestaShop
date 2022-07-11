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

class BT_GapHookAction implements BT_IGapHook
{
    /**
     * @var string $sHookType : define hook type
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
     *
     */
    public function __destruct()
    {
    }

    /**
     * run() method execute hook
     *
     * @param array $aParams
     * @return array
     */
    public function run(array $aParams = null)
    {
        // set variables
        $aDisplayHook = array();

        switch ($this->sHookType) {
            case 'orderStatusUpdate':
                // use case - display update order status
                $aDisplayHook = call_user_func_array(array($this, 'runOrderStatusUpdate'), array($aParams));
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
     * @return array
     */
    private function runOrderStatusUpdate($aParams = null)
    {
        try {
            // set
            $aAssign = array('bActive' => false);
            require_once(_GAP_PATH_LIB . 'module-dao_class.php');

            // handle for data refund with GA4 
            $aRefundStatus = !empty(GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) ? unserialize(GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) : GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION'];
            $aPartialRefundStatus = !empty(GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) ? unserialize(GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) : GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED'];

            // use case full refund
            if (in_array($aParams['newOrderStatus']->id, $aRefundStatus)) {

                $bRefundData = BT_GapModuleDao::checkRefundDataExist(GAnalyticsPro::$iShopId, $aParams['id_order']);

                // If data don't exist insert in on table
                if (empty($bRefundData)) {
                    $oOrder = new Order($aParams['id_order']);
                    BT_GapModuleDao::addRefund(GAnalyticsPro::$iShopId, $aParams['id_order'], (int)$oOrder->id_customer);
                }
            }

            //use case for partial refund
            if (isset($aPartialRefundStatus) && is_array($aPartialRefundStatus)) {
                if (in_array($aParams['newOrderStatus']->id, $aPartialRefundStatus)) {

                    $bRefundDataPartial = BT_GapModuleDao::checkRefundPartialDataExist(GAnalyticsPro::$iShopId, $aParams['id_order']);

                    // If data don't exist insert in on table
                    if (empty($bRefundDataPartial)) {
                        $oOrder = new Order($aParams['id_order']);
                        BT_GapModuleDao::addRefundPartial(GAnalyticsPro::$iShopId, $aParams['id_order'], (int)$oOrder->id_customer);
                    }
                }
            }
        } catch (Exception $e) {
            PrestaShopLogger::addLog($e->getMessage(), 1, $e->getCode(), null, null, true);
        }
        return (array('tpl' => _GAP_TPL_HOOK_PATH . _GAP_TPL_AJAX, 'assign' => $aAssign));
    }
}
