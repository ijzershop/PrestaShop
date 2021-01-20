<?php
declare(strict_types=1);

namespace app\Resources\cronscripts;

require_once dirname(__DIR__).'./../../config/config.inc.php';
require_once dirname(__DIR__).'./../../vendor/autoload.php';

use Configuration;
use Context;
use DB;
use DbQuery;
use ObjectModel;
use Order;
use PDF;
use PrestaShopDatabaseException;
use PrestaShopException;
use Shop;


error_reporting(E_ALL); ini_set('display_errors', 'on');
/**
 * Class OrderSlipGenerator.
 */
class OrderSlipGenerator
{
    /**
     * @var array
     */
    private $completedSuccessRecords;
    /**
     * @var array
     */
    private $errorRecords;
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
    /**
     * @var string
     */
    private $pdfDeliverySlipTemplate;

    /**
     * OrderSlipGenerator constructor.
     * @param false $debug
     */
    public function __construct($debug=false)
    {
        $this->pdfDeliverySlipTemplate = PDF::TEMPLATE_DELIVERY_SLIP;
        $this->completedSuccessRecords = [];
        $this->errorRecords = [];
        $this->debug = $debug;
        $this->paidStatus = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_ORDERSTATE_PAID', null, null, null, '2');
        $this->processedStatus = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_ORDERSTATE_PROCESSED', null, null, null, '3');
    }

    /**
     * Main Generate function to fetch and generate an batch delivery slip pdf.
     *
     * @return bool
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function generateOrderSlips() : bool
    {
        $order_invoice_collection = $this->fetchPaidAndReadyOrders();

        if (! count($order_invoice_collection)) {
            return false;
        }

        $this->createOrderSlipBatch($order_invoice_collection);

        if(count($this->errorRecords) > 0){
            file_put_contents(dirname(__DIR__).'./../../var/logs/custom.log',
                "<pre>" . print_r($this->errorRecords) . "</pre>\n",
                FILE_APPEND,
                true);
        }

        if($this->debug){
            echo "<pre>".print_r($this->completedSuccessRecords, true)."</pre>";
        }
        return true;
    }

    /**
     * Fetch all orders ready for printing.
     *
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function fetchPaidAndReadyOrders() : array
    {
        $date_from = date('Y-m-d H:i:s', strtotime('-20 day'));
        $date_to = date('Y-m-d H:i:s', strtotime('-5 minutes'));
        $last_updated_date = date('Y-m-d H:i:s', strtotime('-1 minute'));

        $sql_query = new DbQuery();
        $sql_query->select('oi.*');
        $sql_query->from('order_invoice', 'oi');
        $sql_query->where('o.current_state = \''.$this->paidStatus.'\''.Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o'));
        $sql_query->leftJoin('orders', 'o', 'o.id_order = oi.id_order');
        $sql_query->where('oi.date_add <= \''.pSQL($date_to).'\'');
        $sql_query->where('oi.date_add >= \''.pSQL($date_from).'\'');
        $sql_query->where('o.date_upd <= \''.pSQL($last_updated_date).'\'');
        $sql_query->orderBy('oi.delivery_date ASC');

        if($this->debug){
            echo $sql_query->__toString();
        }

        $order_invoice_list = Db::getInstance()->executeS($sql_query);

        return ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list);
    }

    /**
     * Create order slip pdf and set all new states of the selected orders.
     *
     * @param $order_invoice_collection
     * @return false
     */
    private function createOrderSlipBatch($order_invoice_collection) : bool
    {
        if (! count($order_invoice_collection)) {
            return false;
        }

        try {
            $this->generateBatchFile($order_invoice_collection, $this->pdfDeliverySlipTemplate);
            foreach ($order_invoice_collection as $order) {
                try {
                    $order_object = new Order($order->id_order);
                    $order_object->setCurrentState((int)$this->processedStatus, 0);
                } catch (PrestaShopException $exception) {
                    array_push($this->errorRecords, ['id_order' => $order->id_order, 'reference' => $order_object->reference, 'time' => date('d-m-Y H:i:s')]);
                }
                array_push($this->completedSuccessRecords, ['id_order' => $order->id_order, 'reference' => $order_object->reference, 'time' => date('d-m-Y H:i:s')]);
            }
        } catch (PrestaShopException $exception) {
            return false;
        }

        return true;
    }

    /**
     * Generate Batch PDF file with all to printed delivery slips.
     *
     * Branch of function in controllers/admin/AdminPDFController.
     *
     * @throws PrestaShopException
     */
    public function generateBatchFile($object, $template) : void
    {
        $pdf_file = new PDF($object, $template, Context::getContext()->smarty);
        $delivery_slip_pdf = $pdf_file->render(false);
        file_put_contents(dirname(__FILE__, 4).'/upload/pakbonnen/pakbonnen_'.time().'.pdf', $delivery_slip_pdf);
    }
}

try {
    $batch = new OrderSlipGenerator(true);
    $batch->generateOrderSlips();
} catch (PrestaShopDatabaseException | PrestaShopException $exeption) {
    return $exeption;
}
