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
use StockAvailable;
use Product;


error_reporting(E_ALL); ini_set('display_errors', 'on');
/**
 * Class VoucherGenerator.
 */
class VoucherGenerator
{
    /**
     * @var array
     */
    private $disabledVouchers;
    /**
     * @var array
     */
    private $errorRecords;
    /**
     * @var bool
     */
    private $debug;

    /**
     * OrderSlipGenerator constructor.
     * @param false $debug
     */
    public function __construct($debug=false)
    {
        $this->disabledOffers = [];
        $this->disabledProducts = [];
        $this->errorRecords = [];
        $this->debug = $debug;
    }



}

try {
    $batch = new VoucherGenerator(true);
    $batch->generateVouchers();
} catch (PrestaShopDatabaseException | PrestaShopException $exeption) {
    return $exeption;
}
