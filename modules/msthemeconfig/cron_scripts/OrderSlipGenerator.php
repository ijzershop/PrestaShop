<?php
declare(strict_types=1);

namespace app\Resources\cron_scripts;

require_once dirname(__DIR__).'/../../config/config.inc.php';
$_SERVER['REQUEST_METHOD'] = 'POST';
require_once dirname(__DIR__).'/../../vendor/autoload.php';

use AppKernel;
use Configuration;
use Context;
use Currency;
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
    private array $completedSuccessRecords;
    /**
     * @var array
     */
    private array $errorRecords;
    /**
     * @var bool
     */
    private bool $debug;
    /**
     * @var int
     */
    private int $paidStatus;
    /**
     * @var int
     */
    private int $processedStatus;
    /**
     * @var string
     */
    private string $pdfDeliverySlipTemplate;
    /**
     * @var int
     */
    private int $slipTime;

    /**
     * OrderSlipGenerator constructor.
     * @param false $debug
     */
    public function __construct(false $debug=false)
    {
        $this->pdfDeliverySlipTemplate = PDF::TEMPLATE_DELIVERY_SLIP;
        $this->completedSuccessRecords = [];
        $this->errorRecords = [];
        $this->debug = $debug;
        $this->paidStatus = (int)Configuration::get('MSTHEMECONFIG_ORDERSTATE_PAID', 1,1,1, '2');
        $this->processedStatus = (int)Configuration::get('MSTHEMECONFIG_ORDERSTATE_PROCESSED', 1,1,1, '3');

        global $kernel;
            if(!$kernel){
              require_once _PS_ROOT_DIR_.'/app/AppKernel.php';
              $kernel = new AppKernel('prod', false);
              $kernel->boot();
          }

    }


    /**
     * @param $route
     * @param $params
     * @param array $headerParams
     * @return array|mixed
     */
    public function doApiCall($route, $params, array $headerParams = []): mixed
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_URL',1,1,1).'/api/'.$route,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $params,
            CURLOPT_HTTPHEADER => $headerParams,
        ]);
        $response = curl_exec($curl);
        // Check if any error occurred
        if(!curl_errno($curl))
        {
            $returnData = json_decode($response);
        } else {
            $returnData = [];
        }
        curl_close($curl);
        return $returnData;
    }
    /**
     * Main Generate function to fetch and generate a batch delivery slip pdf.
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

        $loginCall = $this->doApiCall('api-auth', ['email'=>Configuration::get('MSTHEMECONFIG_DASHBOARD_API_USER',1,1,1), 'password'=>Configuration::get('MSTHEMECONFIG_DASHBOARD_API_PASS',1,1,1)]);
        if(!empty($loginCall)){
            $message = [];
            $message['text'] = 'pakbonnen_'.$this->slipTime.'.pdf';
            $message['status'] = 'success';
            $message['error_records'] = $this->errorRecords;
            $message['success_records'] = $this->completedSuccessRecords;
            $message['time'] = $this->slipTime;

           $this->doApiCall('log-message', [
                'profile'     => 'ijzershop.nl',
                'type'        =>  'cron-job',
                'version'     => _PS_VERSION_,
                'message'     => json_encode($message),
            ], ['Content-Type' => 'application/x-www-form-urlencoded', 'Authorization: Bearer '.$loginCall->access_token]);
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
        $date_to = date('Y-m-d H:i:s', strtotime('-5 minutes'));

        $last_updated_date = date('Y-m-d H:i:s', strtotime('-1 year'));

        $sql_query = new DbQuery();
        $sql_query->select('oi.id_order_invoice, oi.id_order, oi.number, oi.delivery_number, oi.delivery_date, oi.total_discount_tax_excl, oi.total_discount_tax_incl, oi.total_paid_tax_excl, oi.total_paid_tax_incl, oi.total_refunded_tax_excl, oi.total_refunded_tax_incl, oi.total_products, oi.total_products_wt, oi.total_shipping_tax_excl, oi.total_shipping_tax_incl, oi.shipping_tax_computation_method, oi.total_wrapping_tax_excl, oi.total_wrapping_tax_incl, oi.shop_address, oi.note, oi.date_add');
        $sql_query->from('orders', 'o');
        $sql_query->leftJoin('order_invoice', 'oi', 'oi.id_order = o.id_order');
        $sql_query->where('o.current_state IN (\''.$this->paidStatus.'\', \'9\')'.Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o'));
        $sql_query->where('o.date_upd >= \''.pSQL($last_updated_date).'\'');
        $sql_query->where('oi.date_add <= \''.pSQL($date_to).'\'');
        $sql_query->orderBy('oi.id_order_invoice ASC');
        $sql_query->orderBy('oi.delivery_date ASC');



        if($this->debug){
             echo $sql_query->__toString();
        }

        $order_invoice_list = Db::getInstance()->executeS($sql_query);

        if($this->debug){
            var_export($order_invoice_list);
        }
        return ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list);
    }

    /**
     * Create order slip pdf and set all new states of the selected orders.
     *
     * @param $order_invoice_collection
     * @return void
     */
    private function createOrderSlipBatch($order_invoice_collection) : void
    {
        if (! count($order_invoice_collection)) {
            return;
        }

        try {
            $chunk_size = 2;
            $first_chunk_order_invoice_collection = array_chunk($order_invoice_collection, $chunk_size);

            if(count($order_invoice_collection) % $chunk_size) {
                $leftovers = array_pop($first_chunk_order_invoice_collection);
                $last      = array_pop($first_chunk_order_invoice_collection);
                $first_chunk_order_invoice_collection[] = array_merge((array)$last, (array)$leftovers);
            }

            foreach($first_chunk_order_invoice_collection as $chunked_order_invoice_collection){
                $this->generateBatchFile($chunked_order_invoice_collection, $this->pdfDeliverySlipTemplate);
                sleep(10);
            }

            foreach ($order_invoice_collection as $order) {
                $order_object = new Order($order->id_order);
                try {
                    $order_object->setCurrentState($this->processedStatus);
                    $order_object->save();
                } catch (PrestaShopException) {
                    $this->errorRecords[] = ['id_order' => $order->id_order, 'reference' => $order_object->reference, 'time' => date('d-m-Y H:i:s')];
                }
                $this->completedSuccessRecords[] = ['id_order' => $order->id_order, 'reference' => $order_object->reference, 'time' => date('d-m-Y H:i:s')];
            }
        } catch (PrestaShopException) {
            return;
        }
    }

    /**
     * Generate Batch PDF file with all to printed delivery slips.
     *
     * Branch of function in controllers/admin/AdminPDFController.
     * @throws PrestaShopException
     */
    public function generateBatchFile($object, $template): true
    {
    	$context = Context::getContext();
    	$context->currency = new Currency(1, 1, 1);
        $pdf_file = new PDF($object, $template, $context->smarty);

        $delivery_slip_pdf = $pdf_file->render(false);
        $this->slipTime = time();

        file_put_contents(dirname(__FILE__, 4).'/upload/pakbonnen/pakbonnen_'.$this->slipTime.'.pdf', $delivery_slip_pdf);
        return true;
    }
}

try {
    $batch = new OrderSlipGenerator(false);
    $batch->generateOrderSlips();
} catch (PrestaShopDatabaseException | PrestaShopException $exception) {
    return $exception;
}
