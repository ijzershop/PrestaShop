<?php
/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */
 
if (!defined('_PS_VERSION_')) {
    exit;
}

class CustomersCart extends ObjectModel
{
    /* Database column names */
    public $id_advancedvatmanager_customer_cart;
    public $id_cart;
    public $id_customer;
    public $id_address_delivery;
    public $id_address_invoice;
    public $id_shop;
    public $total;
    public $products;
    public $date_upd;
    public $date_add;

    /* Database structure */
    public static $definition = array(
        'table' => 'advancedvatmanager_customer_cart', 
        'primary' => 'id_advancedvatmanager_customer_cart', 
        'fields' => array(
            'id_cart' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'id_customer' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'id_address_delivery' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => false),
            'id_address_invoice' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => false),
            'id_shop' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'total' => array('type' => self::TYPE_FLOAT, 'validate' => 'isFloat', 'required' => false),
            'products' => array('type' => self::TYPE_STRING, 'validate' => 'isString', 'required' => false),
            'date_upd' => array('type' => self::TYPE_DATE,'validate' => 'isDate','size' => 40,'copy_post' => false),
            'date_add' => array('type' => self::TYPE_DATE,'validate' => 'isDate','size' => 40,'copy_post' => false)
        )
    ); 
    
    /**
     *CustomersCart::__construct()
     * 
     * @param int $id
     * @param int $idLang
     * @param int $idShop
     * @return
     */
    public function __construct($id = null, $idLang = null, $idShop = null)
    {
        parent::__construct($id, $idLang, $idShop);
    }
    
    /**
     * CustomersCart::addCustomersCart()
     * Insert record in table
     * @param int $id_cart, 
     * @param int $id_customer
     * @param int $id_address_delivery
     * @param int $id_address_invoice
     * @param mixted $total
     * @param mixted $products
     * @return
     */
    public function addCustomersCart($id_cart, $id_customer = null, $id_address_delivery = null, $id_address_invoice = null, $total = null, $products = null)
    {
        $id_shop =  Context::getContext()->shop->id;

        // Checks if element exists to update it.
        if (self::checkCustomerCartExists($id_customer, $id_shop)) {
            $id = self::getID($id_customer, $id_shop);
            $update = new CustomersCart($id);
            $update->id_customer = $id_customer;
            $update->id_cart = $id_cart;
            $update->id_address_delivery = $id_address_delivery;
            $update->id_address_invoice = $id_address_invoice;
            $update->id_shop = $id_shop;
            $update->total = $total;
            $update->products = json_encode($products);
            return $update->update();
        }
        // Insert new elements
        else {
            $insert = new CustomersCart();
            $insert->id_cart = $id_cart;
            $insert->id_customer = $id_customer;
            $insert->id_address_delivery = $id_address_delivery;
            $insert->id_address_invoice = $id_address_invoice;
            $insert->id_shop = $id_shop;
            $insert->total = $total;
            $insert->products = json_encode($products);
            return $insert->add();
        }
    }
    
    /**
     * CustomersCart::deleteCart()
     * Deletes cart by id_cart
     * @param int $id_cart
     * @param int $id_shop
     * @return
     */
    public static function deleteCart($id_cart, $id_shop)
    {
        $sql = 'DELETE FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart` WHERE `id_cart` = '.(int)$id_cart.' AND `id_shop`= '.(int)$id_shop;
        return Db::getInstance()->execute($sql);
    } 
    
    /**
     * CustomersCart::deleteTable()
     * Truncate table data
     * @return
     */
    public static function deleteTable()
    {
        $sql = 'TRUNCATE TABLE `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart`';
        return Db::getInstance()->execute($sql);
    } 
    
    /**
     * CustomersCart::checkCustomerCartExists()
     * Checks customercart exists
     * @param int $id_customer
     * @param int $id_shop
     * @return
     */
    public static function checkCustomerCartExists($id_customer, $id_shop)
    {
        $sql = 'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart` WHERE `id_customer` = '.(int)$id_customer.' AND `id_shop`= '.(int)$id_shop;
        $result = (bool)Db::getInstance()->getValue($sql);
        return $result;
    } 
    
    /**
     * CustomersCart::getRecords()
     * Gets total records
     * @return
     */
    public static function getRecords()
    {
        $sql = 'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart`';
        $result = Db::getInstance()->getValue($sql);
        return $result;
    }
    
    /**
     * CustomersCart::getTotalCart()
     * Get total Cart
     * @param int $id_customer
     * @param int $id_shop
     * @return
     */
    public static function getTotalCart($id_customer, $id_shop)
    {
        $sql = 'SELECT `total` FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart` WHERE `id_customer` = '.(int)$id_customer.' AND `id_shop`= '.(int)$id_shop;
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql);
        return $result;
    } 
    
    /**
     * CustomersCart::getProducts)
     * Get products
     * @param int $id_customer
     * @param int $id_shop
     * @return
     */
    public static function getProducts($id_customer, $id_shop)
    {
        $sql = 'SELECT `products` FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart` WHERE `id_customer` = '.(int)$id_customer.' AND `id_shop`= '.(int)$id_shop;
        if ($result = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql)) {
            return  json_decode($result, true);
        }
        return false;
    } 
    /**
     * CustomersCart::getIdCart()
     * Gets ID cart of the record
     * @param int $id_customer
     * @param int $id_address
     * @param int $id_shop
     * @return
     */
    public static function getIdCart($id_customer, $id_address, $id_shop)
    {
        $sql = 'SELECT id_cart FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart` WHERE id_customer = '.(int)$id_customer.' AND id_shop='.(int)$id_shop.' AND id_address_delivery='.(int)$id_address; 
        $result = (int)Db::getInstance()->getValue($sql);
        return $result;
    }
    
    /**
     * CustomersCart::getID()
     * Gets ID of the record
     * @param int $id_customer
     * @param int $id_address
     * @return
     */
    public static function getID($id_customer, $id_shop)
    {
        $sql = 'SELECT id_advancedvatmanager_customer_cart FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customer_cart` WHERE id_customer = '.(int)$id_customer.' AND id_shop='.(int)$id_shop; 
        $result = (int)Db::getInstance()->getValue($sql);
        return $result;
    }
    
}