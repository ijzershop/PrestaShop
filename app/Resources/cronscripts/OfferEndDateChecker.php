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
 * Class OfferEndDateChecker.
 */
class OfferEndDateChecker
{
    /**
     * @var array
     */
    private $disabledOffers;
    /**
     * @var array
     */
    private $disabledProducts;
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

    public function checkOfferDates(){
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
    }


    public static function setOfferProductQtyToZero($id_product){
        return StockAvailable::setQuantity($id_product, null, 0);
    }

    public static function setOfferProductStockToDisabled($id_product){
        $query = 'UPDATE `' . _DB_PREFIX_ . 'product`  SET `out_of_stock` = 0 WHERE `id_product` = "' . $id_product . '";';
        $query2 = 'UPDATE `' . _DB_PREFIX_ . 'stock_available`  SET `out_of_stock` = 0 WHERE `id_product` = "' . $id_product . '";';

        $db = Db::getInstance(_PS_USE_SQL_SLAVE_);
        $db->execute($query);
        $db->execute($query2);
        return true;
    }

    public static function getAllOffers($check_date = null)
    {
        if(is_null($check_date)) {
            $check_date = date("Y-m-d H:i:s");
        }

        $query = 'SELECT * FROM `' . _DB_PREFIX_ . 'oi_offer` WHERE `date_exp` <= "' . $check_date . '";';

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
    }

    public static function getOfferProducts($id_offer)
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
} catch (PrestaShopDatabaseException | PrestaShopException $exeption) {
    return $exeption;
}
