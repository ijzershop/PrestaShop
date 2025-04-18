<?php
declare(strict_types=1);

namespace app\Resources\cron_scripts;

require_once dirname(__DIR__).'/../../config/config.inc.php';
require_once dirname(__DIR__).'/../../vendor/autoload.php';

use DB;
use Exception;
use mysqli_result;
use PDOStatement;
use PrestaShopDatabaseException;
use PrestaShopException;
use StockAvailable;


error_reporting(E_ALL); ini_set('display_errors', 'on');
/**
 * Class OfferEndDateChecker.
 */
class OfferEndDateChecker
{
    /**
     * @var array
     */
    private array $disabledOffers;
    /**
     * @var array
     */
    private array $disabledProducts;
    /**
     * @var array
     */
    private array $errorRecords;
    /**
     * @var bool
     */
    private bool $debug;

    /**
     * OrderSlipGenerator constructor.
     * @param bool $debug
     */
    public function __construct($debug=false)
    {
        $this->disabledOffers = [];
        $this->disabledProducts = [];
        $this->errorRecords = [];
        $this->debug = $debug;
    }

    public function checkOfferDates(){
        try{
            $offers  = $this->getAllOffers();
            for($oi=0; $oi < count($offers); $oi++){
                $products = $this->getOfferProducts($offers[$oi]['id_oi_offer']);
                array_push($this->disabledOffers, $offers[$oi]['id_oi_offer']);
                for($pr=0; $pr < count($products); $pr++) {
                    $id_product = $products[$pr]['id_product'];
                    $this->setOfferProductQtyToZero($id_product);
                    $this->setOfferProductStockToDisabled($id_product);
                    array_push($this->disabledProducts, $products[$pr]['id_product']);
                }
            }

            die(json_encode(['offers'=> $this->disabledOffers, 'products'=> $this->disabledProducts]));
        } catch (PrestaShopDatabaseException $exception){
            die($exception->getMessage());
        }
    }


    /**
     * @param $id_product
     * @return void
     */
    private function setOfferProductQtyToZero($id_product): void
    {
        StockAvailable::setQuantity($id_product, 0, 0);
    }

    /**
     * @param $id_product
     * @return void
     */
    private function setOfferProductStockToDisabled($id_product): void
    {
        $query = 'UPDATE `' . _DB_PREFIX_ . 'product`  SET `out_of_stock` = 0 WHERE `id_product` = "' . $id_product . '";';
        $query2 = 'UPDATE `' . _DB_PREFIX_ . 'stock_available`  SET `out_of_stock` = 0 WHERE `id_product` = "' . $id_product . '";';

        $db = Db::getInstance(_PS_USE_SQL_SLAVE_);
        $db->execute($query);
        $db->execute($query2);
    }

    /**
     * @param $check_date
     * @return array|bool|mysqli_result|PDOStatement|resource|null
     * @throws PrestaShopDatabaseException
     */
    private function getAllOffers($check_date = null)
    {
        if(is_null($check_date)) {
            $check_date = date("Y-m-d H:i:s");
        }

        $query = 'SELECT * FROM `' . _DB_PREFIX_ . 'oi_offer` WHERE `date_exp` <= "' . $check_date . '";';

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
    }

    /**
     * @param $id_offer
     * @return array|bool|mysqli_result|PDOStatement|resource|null
     * @throws PrestaShopDatabaseException
     */
    private function getOfferProducts($id_offer)
    {
        if(!$id_offer){
            return error("no offer id");
        }
        $query = 'SELECT * FROM `' . _DB_PREFIX_ . 'product` WHERE `id_oi_offer` = "' . $id_offer . '";';

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
    }

}

try {
    $batch = new OfferEndDateChecker(true);
    $batch->checkOfferDates();
} catch (Exception $exception) {
    return $exception->getMessage();
}
