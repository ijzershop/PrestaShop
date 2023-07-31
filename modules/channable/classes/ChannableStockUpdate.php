<?php
/**
 * 2007-2022 patworx.de
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade AmazonPay to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    patworx multimedia GmbH <service@patworx.de>
 *  @copyright 2007-2022 patworx multimedia GmbH
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

if (! defined('_PS_VERSION_')) {
    exit();
}

class ChannableStockUpdate extends ObjectModel
{

    public $id;

    public $id_product;

    public $id_product_attribute;

    public $working;
    
    public $date_add;

    public static $definition = array(
        'table' => 'channable_stock_update',
        'primary' => 'id_channable_stock_update',
        'fields' => array(
            'id_product' => array(
                'type' => self::TYPE_INT,
                'validate' => 'isInt'
            ),
            'id_product_attribute' => array(
                'type' => self::TYPE_INT,
                'validate' => 'isInt'
            ),
            'working' => array(
                'type' => self::TYPE_INT,
                'validate' => 'isInt'
            ),
            'date_add' => array(
                'type' => self::TYPE_DATE,
                'validate' => 'isDateFormat'
            )
        )
    );

    /**
     * @return array
     * @throws PrestaShopDatabaseException
     */
    public static function getQualifiedUpdates()
    {
        $return = array();
        $sql = 'SELECT * FROM `'._DB_PREFIX_.self::$definition['table'] . '` WHERE working = 0';
        if ($results = Db::getInstance()->executeS($sql)) {
            foreach ($results as $row) {
                $return[] = array('id_channable_stock_update' => $row['id_channable_stock_update'],
                    'id_product' => $row['id_product'],
                    'id_product_attribute' => $row['id_product_attribute']
                );
            }
        }
        return $return;
    }

    /**
     * @param $id_product
     * @return bool
     * @throws PrestaShopDatabaseException
     */
    public static function existsByIdProduct($id_product, $id_product_attribute = 0)
    {
        $sql = 'SELECT * FROM '._DB_PREFIX_.self::$definition['table'].' WHERE id_product = ' . (int)$id_product . ' AND id_product_attribute = ' . (int)$id_product_attribute;
        if ($results = Db::getInstance()->ExecuteS($sql)) {
            return true;
        }
        return false;
    }
        
}
