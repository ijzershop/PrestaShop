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

class BT_GapModuleDao
{
    /**
     * Magic Method __construct
     */
    private function __construct()
    {
    }

    /**
     * addOrder() method check if an order exist
     *
     * @param int $iShopId
     * @param int $iOrderId
     * @param int $iCustId
     * @param int $bSent
     * @param int $iRefundState
     * @return bool
     */
    public static function addOrder($iShopId, $iOrderId, $iCustId, $bSent = 0, $iRefundState = 0)
    {
        $sQuery = 'INSERT INTO ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_analyticspro (gap_shop_id, gap_order_id, gap_cust_id, gap_sent, gap_refunded, gap_date_add) '
            . 'VALUES(' . (int)$iShopId . ', ' . (int)$iOrderId . ', ' . (int)$iCustId . ', "' . (int)$bSent . '", "' . (int)$iRefundState . '", NOW())';

        return (Db::getInstance()->Execute($sQuery));
    }

    /**
     * addRefundPartial() method add a refund to handle 
     *
     * @param int $iShopId
     * @param int $iOrderId
     * @param int $iCustId
     * @param int $bSent
     * @return bool
     */
    public static function addRefundPartial($iShopId, $iOrderId, $iCustId, $bSent = 0)
    {
        $sQuery = 'INSERT INTO ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund_partial (shop_id, order_id, cust_id, sent)' . ' VALUES (' . (int)$iShopId . ', ' . (int)$iOrderId . ', ' . (int)$iCustId . ', "' . (int)$bSent . '")';

        return (Db::getInstance()->Execute($sQuery));
    }

    /**
     * checkRefundPartialDataExist() method check if the refund data is added on the table
     * @param int $iShopId
     * @param int $iOrderId
     * @param int $bSent
     * @return bool
     */
    public static function checkRefundPartialDataExist($iShopId, $iOrderId)
    {
        $sQuery = 'SELECT id FROM ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund_partial WHERE order_id = ' . $iOrderId . ' AND shop_id = ' . (int)$iShopId;

        return !empty(Db::getInstance()->getValue($sQuery)) ? true : false;
    }

    /**
     * hasRefundPartialToHandle() method check if there is refund to handle
     * @param int $iShopId
     * @return bool
     */
    public static function hasRefundPartialToHandle($iShopId)
    {
        $sQuery = 'SELECT id FROM ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund_partial WHERE sent = "0" AND shop_id = ' . (int)$iShopId;

        return !empty(Db::getInstance()->executeS($sQuery)) ? true : false;
    }

    /**
     * getRefundPartialToSend() method check if there is order refunded
     * @param int $iShopId
     * @return bool
     */
    public static function getRefundPartialToSend($iShopId)
    {
        $sQuery = 'SELECT * FROM ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund_partial WHERE sent = "0" AND shop_id = ' . (int)$iShopId;

        return Db::getInstance()->ExecuteS($sQuery);
    }

    /**
     * updateSentPartialOrders() method check if there is order refunded
     * @param int $iShopId
     * @param int $bSent
     * @return bool
     */
    public static function updateSentPartialOrders($iShopId, $iOrderId)
    {
        $sQuery = 'UPDATE ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund_partial SET sent = "1" WHERE order_id = ' . $iOrderId . ' AND shop_id = ' . (int)$iShopId;

        return (Db::getInstance()->Execute($sQuery));
    }

    /**
     * addRefund() method add a refund to handle 
     *
     * @param int $iShopId
     * @param int $iOrderId
     * @param int $iCustId
     * @param int $bSent
     * @return bool
     */
    public static function addRefund($iShopId, $iOrderId, $iCustId, $bSent = 0)
    {
        $sQuery = 'INSERT INTO ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund (shop_id, order_id, cust_id, sent)' . ' VALUES (' . (int)$iShopId . ', ' . (int)$iOrderId . ', ' . (int)$iCustId . ', "' . (int)$bSent . '")';

        return (Db::getInstance()->Execute($sQuery));
    }

    /**
     * checkRefundDataExist() method check if the refund data is added on the table
     * @param int $iShopId
     * @param int $iOrderId
     * @param int $bSent
     * @return bool
     */
    public static function checkRefundDataExist($iShopId, $iOrderId)
    {
        $sQuery = 'SELECT id FROM ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund WHERE order_id = ' . $iOrderId . ' AND shop_id = ' . (int)$iShopId;

        return !empty(Db::getInstance()->getValue($sQuery)) ? true : false;
    }

    /**
     * hasRefundToHandle() method check if there is refund to handle
     * @param int $iShopId
     * @return bool
     */
    public static function hasRefundToHandle($iShopId)
    {
        $sQuery = 'SELECT id FROM ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund WHERE sent = "0" AND shop_id = ' . (int)$iShopId;

        return !empty(Db::getInstance()->executeS($sQuery)) ? true : false;
    }

    /**
     * getRefundToSend() method check if there is order refunded
     * @param int $iShopId
     * @return bool
     */
    public static function getRefundToSend($iShopId)
    {
        $sQuery = 'SELECT * FROM ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund WHERE sent = "0" AND shop_id = ' . (int)$iShopId;

        return Db::getInstance()->ExecuteS($sQuery);
    }

    /**
     * updateSentOrders() method check if there is order refunded
     * @param int $iShopId
     * @param int $bSent
     * @return bool
     */
    public static function updateSentOrders($iShopId, $iOrderId)
    {
        $sQuery = 'UPDATE ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_refund SET sent = "1" WHERE order_id = ' . $iOrderId . ' AND shop_id = ' . (int)$iShopId;

        return (Db::getInstance()->Execute($sQuery));
    }

    /**
     * getOrderStatus() method returns list of status order
     *
     * @return array
     */
    public static function getOrderStatus()
    {
        // set variable
        $aStatusTmp = array();

        // set query
        $sQuery = 'SELECT * FROM ' . _DB_PREFIX_ . 'order_state_lang';

        $aStatusTmp = Db::getInstance()->ExecuteS($sQuery);

        foreach ($aStatusTmp as $aStatus) {
            $aStatusOrder[$aStatus['id_order_state']][$aStatus['id_lang']] = $aStatus['name'];
        }
        // destruct
        unset($aStatusTmp);

        return $aStatusOrder;
    }


    /**
     * getRefundedProducts() method returns list of refunded products
     *
     * @param int $iOrderId
     * @return array
     */
    public static function getRefundedProducts($iOrderId)
    {
        // set query
        $sQuery = 'SELECT `product_id` as `id_product`, `product_attribute_id`, `product_quantity_refunded` as `quantity`'
            . ' FROM `' . _DB_PREFIX_ . 'order_detail`'
            . ' WHERE `id_order` = ' . (int)$iOrderId;

        return (Db::getInstance()->ExecuteS($sQuery));
    }

    /**
     * getCartSteps() method returns list of the cart steps
     *
     * @param int $iCartId
     * @return array
     */
    public static function getCartSteps($iCartId)
    {
        $checkout_step = array();

        $query = new \DbQuery();
        $query->select('c.checkout_session_data as checkout');
        $query->from('cart', 'c');
        $query->where('c.`id_cart` = ' . (int)$iCartId);

        $results = \Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);

        if (!empty($results)) {
            $checkout_step = (array)Tools::jsonDecode($results[0]['checkout']);
        }

        return $checkout_step;
    }
}
