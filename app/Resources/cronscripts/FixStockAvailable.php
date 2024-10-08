<?php
declare(strict_types=1);

namespace app\Resources\cron_scripts;

require_once dirname(__DIR__) . './../../config/config.inc.php';
require_once dirname(__DIR__) . './../../vendor/autoload.php';

use Db;
use DbQuery;
use Exception;
use PrestaShopDatabaseException;
use PrestaShopException;
use Product;
use StockAvailable;


error_reporting(E_ALL);
ini_set('display_errors', 'on');

/**
 * Class FixStockAvailable.
 */
class FixStockAvailable
{
    /**
     * OrderSlipGenerator constructor.
     */
    public function __construct()
    {
        $this->setNewQty = true;
        $this->new_qty = 1000;
        $this->failedQty = -1;
        $this->validList = [];
        $this->unvalidList = [];
        /**
         * isUnifiedStock=true, id_shops = [0], id_shop_group = 1 ==> multi-store with shared stock
         * isUnifiedStock=false, id_shops = [1], id_shop_group = 0 ==> single store with no group
         * isUnifiedStock=false, id_shops = [1,2,3], id_shop_group = 1 ==> multi-store with no shared stock
         */
        $this->isUnifiedStock = false;
        $this->id_shops = [1];
        $this->id_shop_group = 0;
        $this->skippingCategories = [1,2,6,22];
        $this->tmpFolder = 'tmp/';
        $this->errorFile = $this->tmpFolder."errors.txt";
        $this->validFile = $this->tmpFolder."validStock.txt";
        $this->invalidFile = $this->tmpFolder."invalidStock.txt";
    }

    /**
     * @return false|int|string
     */
    public function runStockCleaner(): bool|int|string
    {
        $selectedShopId = null;
        $selectedShopGroupId = $this->id_shop_group;
        try {
            file_put_contents($this->validFile, '', FILE_APPEND);
            if($this->isUnifiedStock){
                //Is a unified stock for all stores. Data is saved by id_group=1 id_shop=0
                $this->findValidProductStockRows(0);
            } else {
                //Is not a unified stock for all stores. Data is saved by id_group=1 and one of the shop ids
                foreach ($this->id_shops as $id_shop){
                    $this->findValidProductStockRows($id_shop);
                }
            }

            $this->subtractInvalidProductStockRows();

            if($this->setNewQty){
                $this->setInvalidRecordsToValue();
            }


        } catch (Exception $exception){
            return file_put_contents($this->errorFile, "Error: ". $exception->getMessage() . "with code:" . $exception->getCode(). PHP_EOL, FILE_APPEND);
        }
        return 'done by using shopID:' . $selectedShopId . ' and groupID:' . $selectedShopGroupId;
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function findValidProductStockRows($id_shop): void
    {
        $this->validList = [];
        $sql = "SELECT `" . _DB_PREFIX_ . "product`.`id_product` FROM `" . _DB_PREFIX_ . "product` WHERE `id_category_default` NOT IN (" . implode(',', $this->skippingCategories) . ")";
        $result = Db::getInstance()->executeS($sql);

        $productIds = array_column($result, 'id_product');
        foreach ($productIds as $item) {
            $product = new Product($item);

            //Skip inactive products
            if(!$product->active){
                continue;
            }


            $newQty = $this->new_qty;
            $combinations = $product->getAttributeCombinations(1);

            if ($combinations) {
                $newQty = 0;
                foreach ($combinations as $combination) {
                    $id_stock_available_combination = $this->getStockAvailableIdByProductId($combination['id_product'], $combination['id_product_attribute'], $id_shop);

                    if ($id_stock_available_combination > 0) {
                        $stockObject = new StockAvailable($id_stock_available_combination);

                        if($stockObject->id_shop_group === $this->id_shop_group){
                                if($this->setNewQty){
                                    $this->setStockAvailableQty($combination['id_product'], $combination['id_product_attribute'], $id_shop, $this->id_shop_group, $this->new_qty);
                                }

                                $newQty = $newQty+$this->new_qty;
                                $combinationStockAvailableId = $id_stock_available_combination . ',';
                                file_put_contents($this->validFile, $combinationStockAvailableId, FILE_APPEND);
                            }
                        }
                }
            }

            $id_stock_available = $this->getStockAvailableIdByProductId($product->id, null, $id_shop);

            if ($id_stock_available > 0) {
                $stockObject = new StockAvailable($id_stock_available);
                if($stockObject->id_shop_group === $this->id_shop_group){
                    if($this->setNewQty){
                        $this->setStockAvailableQty($product->id, 0, $id_shop, $this->id_shop_group, $newQty);
                    }

                    $stockAvailableId = $id_stock_available . ',';
                    file_put_contents($this->validFile, $stockAvailableId, FILE_APPEND);
                }
            }
        }
    }


    /**
     * @param $id_product
     * @param null $id_product_attribute
     * @param null $id_shop
     * @return bool|int|string|null
     */
    public function getStockAvailableIdByProductId($id_product, $id_product_attribute = null, $id_shop = null): bool|int|string|null
    {
        $query = new DbQuery();
        $query->select('id_stock_available');
        $query->from('stock_available');
        $query->where('id_product = ' . (int) $id_product);
        $query->where('id_shop = ' . (int) $id_shop);

        if ($id_product_attribute !== null) {
            $query->where('id_product_attribute = ' . (int) $id_product_attribute);
        }

        return (int)Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query, false);
    }


    /**
     * @param $id_product
     * @param $id_product_attribute
     * @param $id_shop
     * @param $id_shop_group
     * @param $quantity
     * @return bool|int
     */
    public function setStockAvailableQty($id_product, $id_product_attribute, $id_shop, $id_shop_group, $quantity): bool|int
    {
        try {
            $sqlSA = "UPDATE `" . _DB_PREFIX_ . "stock_available` SET `quantity` = '".$quantity.
                "' WHERE `id_product` = '".$id_product.
                "' AND `id_product_attribute` = '".$id_product_attribute.
                "' AND id_shop = '".$id_shop.
                "' AND id_shop_group = '".$id_shop_group. "';";

            $resultSA = Db::getInstance()->execute($sqlSA);
        } catch(Exception $exception){
            return file_put_contents($this->errorFile, "Error set stock: ". $exception->getMessage() . "with code:" . $exception->getCode(). PHP_EOL, FILE_APPEND);
        }
        return $resultSA;
    }

    /**
     * @throws PrestaShopDatabaseException
     */
    public function subtractInvalidProductStockRows(): bool|int
    {
        $foundString = rtrim(file_get_contents($this->validFile), ',');

        if(!empty($foundString)){
            $sqlSA = "SELECT `" . _DB_PREFIX_ . "stock_available`.`id_stock_available` FROM `" . _DB_PREFIX_ . "stock_available` WHERE `id_stock_available` NOT IN (".$foundString.")";
        } else {
            $sqlSA = "SELECT `" . _DB_PREFIX_ . "stock_available`.`id_stock_available` FROM `" . _DB_PREFIX_ . "stock_available`";
        }
        $resultSA = Db::getInstance()->executeS($sqlSA);

        $stockAvailableIds = array_column($resultSA, 'id_stock_available');

        return file_put_contents($this->invalidFile, implode(",", $stockAvailableIds), FILE_APPEND);
    }

    /**
     * @return void
     */
    public function setInvalidRecordsToValue(): void
    {
        $foundString = rtrim(file_get_contents($this->invalidFile), ',');
        if(!empty($foundString) && $this->setNewQty){
            $sqlSA = "UPDATE `" . _DB_PREFIX_ . "stock_available` SET `" . _DB_PREFIX_ . "stock_available`.`quantity` = ".$this->failedQty." WHERE `id_stock_available` IN (".$foundString.")";
            Db::getInstance()->execute($sqlSA);
        }
    }
}


$batch = new FixStockAvailable();
$batch->runStockCleaner();
