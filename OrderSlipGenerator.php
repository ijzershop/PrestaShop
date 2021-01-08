<?php
//declare(strict_types=1);
/**
 * Class OrderSlipGenerator.
 */
class OrderSlipGenerator
{
    /**
     * @var string
     */
    private $serverName;
    /**
     * @var string
     */
    private $databaseName;
    /**
     * @var string
     */
    private $databaseTable;
    /**
     * @var string
     */
    private $databaseUserPass;
    /**
     * @var array
     */
    private $completedSuccessRecords;
    /**
     * @var string
     */
    private $databaseUserName;
    /**
     * @var array
     */
    private $errorRecords;
    /**
     * @var array
     */
    private $parameters;
    /**
     * @var bool
     */
    private $debug;
    /**
     * @var int
     */
    private $paidStatus;
    /**
     * @var int
     */
    private $processedStatus;

    public function __construct()
    {
        $this->parameters = require dirname(__FILE__).'/app/config/parameters.php';
        $this->serverName = $this->parameters['parameters']['database_host'];
        $this->databaseName = $this->parameters['parameters']['database_name'];
        $this->databaseUserName = $this->parameters['parameters']['database_user'];
        $this->databaseUserPass = $this->parameters['parameters']['database_password'];
        $this->databaseTable = 'ps176_orders';
        $this->completedSuccessRecords = [];
        $this->errorRecords = [];
        $this->debug = true;
        $this->paidStatus = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_ORDERSTATE_PAID');
        $this->processedStatus = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_ORDERSTATE_PROCESSED');
    }

    public function generateOrderSlips()
    {
        $order_invoice_collection = $this->fetchPaidAndReadyOrders();

        if (! count($order_invoice_collection)) {
            return false;
        }

        $this->createOrderSlip($order_invoice_collection);

        if (is_numeric($this->paidStatus)) {
            foreach ($order_invoice_collection as $order) {
                $orderObject = new Order($order->id_order);
                $orderObject->setCurrentState($this->processedStatus, 0);
            }
        }

        return true;
    }

    private function fetchPaidAndReadyOrders()
    {
        $date_to = date('Y-m-d H:i:s', strtotime('-3 minutes'));
        $date_from = date('Y-m-d H:i:s', strtotime('1 day'));
        $last_updated_date = date('Y-m-d H:i:s', strtotime('-60 seconds'));

        $sql = new DbQuery();
        $sql->select('oi.*');
        $sql->from('order_invoice', 'oi');
        $sql->leftJoin('orders', 'o', 'o.id_order = oi.id_order');
        $sql->where('DATE_ADD(oi.date_add, INTERVAL -1 DAY) <= \''.pSQL($date_to).'\'');
        if (! is_null($date_from)) {
            $sql->where('oi.date_add >= \''.pSQL($date_from).'\'');
        }
        $sql->where('o.current_state = \''.$this->paidStatus.'\''.Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o'));
        $sql->where('o.date_upd <= \''.$last_updated_date.'\'');
        $sql->orderBy('oi.delivery_date ASC');


        var_export($sql->__toString());
        die();

        $order_invoice_list = Db::getInstance()->executeS($sql);

        return ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list);
    }

    private function createOrderSlip($id_order)
    {
        $template = PDF::TEMPLATE_DELIVERY_SLIP;

        var_export($id_order);
        die();
    }
}

$batch = new OrderSlipGenerator();
$batch->generateOrderSlips();
