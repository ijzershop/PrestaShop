<?php
class Product extends ProductCore {
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    public $id_oi_offer;
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    public $name;
    public $saw_loss;
    public $min_saw_size;
    public $min_cut_size;
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    public function __construct($id_product = null, $full = false, $id_lang = null, $id_shop = null, Context $context = null)
    {
        self::$definition['fields']['saw_loss'] = array('type' => self::TYPE_INT, 
                                                                'shop' => 'true', 
                                                                'validate' => 
                                                                'isNullOrUnsignedId', 
                                                                'required' => false);
        self::$definition['fields']['min_saw_size'] = array('type' => self::TYPE_INT, 
                                                                'shop' => 'true', 
                                                                'validate' => 
                                                                'isNullOrUnsignedId', 
                                                                'required' => false);
        self::$definition['fields']['min_cut_size'] = array('type' => self::TYPE_INT, 
                                                                'shop' => 'true', 
                                                                'validate' => 
                                                                'isNullOrUnsignedId', 
                                                                'required' => false);
        
        self::$definition['fields']['id_oi_offer'] = array('type' => ObjectModel::TYPE_INT,
                                                                 'shop' => 'true',
                                                                 'required' => false);
        // self::$definition['fields']['name'] = array('type' => ObjectModel::TYPE_STRING,
        //                                                          'lang' => true,
        //                                                          'validate' => 'isCatalogName',
        //                                                          'required' => true, 'size' => 255);

        parent::__construct($id_product, $full, $id_lang, $id_shop);
    }
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    public static function getOfferRows($id_oi_offer = null, $id_lang = 1) {
        if ($id_oi_offer == null || !is_numeric($id_oi_offer)) {
            return array();
        }
        $query = 'SELECT p.*, product_shop.*, pl.* , m.`name` AS manufacturer_name, s.`name` AS supplier_name FROM `' . _DB_PREFIX_ . 'product` as `p` 
                    '.Shop::addSqlAssociation('product', 'p').'
                    LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` AS `pl` ON `p`.`id_product` = `pl`.`id_product` 
                    LEFT JOIN `'._DB_PREFIX_.'manufacturer` m ON (m.`id_manufacturer` = p.`id_manufacturer`)
                    LEFT JOIN `'._DB_PREFIX_.'supplier` s ON (s.`id_supplier` = p.`id_supplier`) 
                    WHERE `p`.`id_oi_offer` = ' . $id_oi_offer . '
                    AND `pl`.`id_lang` = ' . $id_lang . ';';
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
        $results_array = array();
        foreach ($result as $row) {
            $row['price_tax_inc'] = Product::getPriceStatic($row['id_product'], true, null, 2);
            $row['price_tax_exc'] = Product::getPriceStatic($row['id_product'], false, null, 2);
            $results_array[] = $row;
        }
        return $results_array;
    }
}