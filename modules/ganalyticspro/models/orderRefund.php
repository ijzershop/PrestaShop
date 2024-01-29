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

namespace GanalyticsPro\Models;

class orderRefund extends \ObjectModel
{
    /** @var int id * */
    public $id;

    /** @var int shop_id * */
    public $shop_id;

    /** @var int order_id * */
    public $order_id;

    /** @var int cust_id * */
    public $cust_id;

    /** @var int cust_id * */
    public $sent;

    /**
     * @see ObjectModel::$definition
     */
    public static $definition = [
        'table' => 'gap_refund',
        'primary' => 'id',
        'fields' => [
            'shop_id' => ['type' => self::TYPE_INT, 'validate' => 'isInt', 'required' => true],
            'order_id' => ['type' => self::TYPE_INT, 'validate' => 'isInt', 'required' => true],
            'cust_id' => ['type' => self::TYPE_INT, 'validate' => 'isInt', 'required' => true],
            'sent' => ['type' => self::TYPE_INT, 'validate' => 'isInt', 'required' => true],
        ],
    ];

    /**
     * checkRefundDataExist() method check if the refund data is added on the table
     *
     * @param int $id_shop
     * @param int $id_order
     *
     * @return bool
     */
    public static function checkRefundDataExist($id_shop, $id_order)
    {
        $query = new \DbQuery();
        $query->select('id');
        $query->from('gap_refund', 'gf');
        $query->where('gf.shop_id=' . (int) $id_shop);
        $query->where('gf.order_id=' . (int) $id_order);

        return \Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query);
    }

    /**
     * getIdRefund() get the refund if for an order on a shop
     *
     * @param int $id_shop
     * @param int $id_order
     *
     * @return bool
     */
    public static function getIdRefund($id_shop, $id_order)
    {
        $query = new \DbQuery();
        $query->select('id');
        $query->from('gap_refund', 'gf');
        $query->where('gf.shop_id=' . (int) $id_shop);
        $query->where('gf.order_id=' . (int) $id_order);

        return \Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query);
    }

    /**
     * hasRefundToHandle() method check if there is refund to handle
     *
     * @param int $id_shop
     *
     * @return bool
     */
    public static function hasRefundToHandle($id_shop)
    {
        $refund = false;

        $query = new \DbQuery();
        $query->select('*');
        $query->from('gap_refund', 'gf');
        $query->where('gf.shop_id=' . (int) $id_shop);
        $query->where('gf.sent= "0"');

        if (!empty(\Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query))) {
            $refund = true;
        }

        return $refund;
    }

    /**
     * getRefundToSend() method check if there is order refunded
     *
     * @param int $id_shop
     *
     * @return bool
     */
    public static function getRefundToSend($id_shop)
    {
        $query = new \DbQuery();
        $query->select('*');
        $query->from('gap_refund', 'gf');
        $query->where('gf.shop_id=' . (int) $id_shop);
        $query->where('gf.sent="0"');

        return \Db::getInstance(_PS_USE_SQL_SLAVE_)->ExecuteS($query);
    }
}
