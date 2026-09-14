<?php

require_once 'config/config.inc.php';

/**
 *
 */
class StockMultistoreMigration
{
    private $db;

    public function __construct()
    {
        $this->db = Db::getInstance();
    }

    public function migrateStockToAllShops(): void
    {
        // Get all shops
        $shops = Shop::getShops();

        // Get stock data from default shop (shop_id = 1 or NULL)
        $stockData = $this->getDefaultStockData();

        foreach ($shops as $shop) {
            if ($shop['id_shop'] == 1) continue; // Skip default shop

            $this->copyStockToShop($stockData, $shop['id_shop']);
        }
    }

    /**
     * @return array|bool|mysqli_result|PDOStatement|resource|null
     * @throws PrestaShopDatabaseException
     */
    private function getDefaultStockData()
    {
        $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'stock_available`
                WHERE id_shop = 1';

        return $this->db->executeS($sql);
    }

    /**
     * @param $stockData
     * @param $shopId
     * @return void
     * @throws PrestaShopDatabaseException
     */
    private function copyStockToShop($stockData, $shopId)
    {
        foreach ($stockData as $stock) {
            // Check if stock already exists for this shop
            $existingStock = $this->db->getValue('
                SELECT id_stock_available
                FROM `' . _DB_PREFIX_ . 'stock_available`
                WHERE id_product = ' . (int)$stock['id_product'] . '
                AND id_product_attribute = ' . (int)$stock['id_product_attribute'] . '
                AND id_shop = ' . (int)$shopId
            );

            if (!$existingStock) {
                // Insert new stock record for this shop
                $this->db->insert('stock_available', [
                    'id_product' => (int)$stock['id_product'],
                    'id_product_attribute' => (int)$stock['id_product_attribute'],
                    'id_shop' => (int)$shopId,
                    'id_shop_group' => (int)$stock['id_shop_group'],
                    'quantity' => (int)$stock['quantity'],
                    'physical_quantity' => (int)$stock['physical_quantity'],
                    'reserved_quantity' => (int)$stock['reserved_quantity'],
                    'depends_on_stock' => (int)$stock['depends_on_stock'],
                    'out_of_stock' => (int)$stock['out_of_stock']
                ]);
            }
        }
    }
}

// Run the migration
$migration = new StockMultistoreMigration();
$migration->migrateStockToAllShops();
echo "Stock migration completed!\n";
?>
