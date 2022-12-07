<?php
use classes\models\DynamicConfig;
use classes\models\DynamicEquation;
class Product extends ProductCore {
        /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $min_cut_remainder;
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $link_rewrite;
    public $saw_loss;
    public $min_saw_size;
    public $min_cut_size;
    public $id_oi_offer;
    public $oi_offer_extra_shipping;
    public $name;
    public $seo_keywords;
    public $alternate_name;
    public $jsonld;
    public function __construct($id_product = null, $full = false, $id_lang = null, $id_shop = null, Context $context = null)
    {
        self::$definition['fields']['saw_loss'] = array('type' => self::TYPE_INT,
                                                                'shop' => 'true',
                                                                'validate' =>
                                                                'isNullOrUnsignedId',
                                                                'required' => false);
        self::$definition['fields']['default_cut_price'] = array('type' => null,
                                                                'shop' => 'true',
                                                                'validate' => 'isPrice',
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
        self::$definition['fields']['id_oi_offer'] = array('type' => self::TYPE_INT,
                                                                 'shop' => 'true',
                                                                 'required' => false);
        self::$definition['fields']['oi_offer_extra_shipping'] = array('type' => self::TYPE_INT,
                                                                 'shop' => 'true',
                                                                 'required' => false);
        self::$definition['fields']['name'] = array('type' => self::TYPE_STRING,
                                                                 'lang' => true,
                                                                 'validate' => 'isCatalogName',
                                                                 'required' => true, 'size' => 255);
        self::$definition['fields']['alternate_name'] = array('type' => self::TYPE_STRING, 'required' => false);
        self::$definition['fields']['seo_keywords'] = array('type' => self::TYPE_STRING, 'required' => false);
        self::$definition['fields']['jsonld'] = array('type' => self::TYPE_STRING, 'required' => false);
        self::$definition['fields']['link_rewrite'] = array('type' => self::TYPE_STRING,
            'lang' => true,
            'validate' => 'isString',
            'required' => false, 'size' => 255);
        parent::__construct($id_product, $full, $id_lang, $id_shop);
    }
    public function getAttributesGroups($id_lang, $id_product_attribute = null)
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($this->id)) {
            return parent::getAttributesGroups($id_lang);
        }
        if (!Combination::isFeatureActive()) {
            return [];
        }
        $sql = 'SELECT ag.`id_attribute_group`, ag.`is_color_group`, agl.`name` AS group_name, agl.`public_name` AS public_group_name,
                    a.`id_attribute`, al.`name` AS attribute_name, a.`color` AS attribute_color, product_attribute_shop.`id_product_attribute`,
                    IFNULL(stock.quantity, 0) as quantity, product_attribute_shop.`price`, product_attribute_shop.`ecotax`, product_attribute_shop.`weight`,
                    product_attribute_shop.`default_on`, pa.`reference`, pa.`ean13`, pa.`mpn`, pa.`upc`, pa.`isbn`, product_attribute_shop.`unit_price_impact`,
                    product_attribute_shop.`minimal_quantity`, product_attribute_shop.`available_date`, ag.`group_type`
                FROM `' . _DB_PREFIX_ . 'product_attribute` pa
                ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
                ' . Product::sqlStock('pa', 'pa') . '
                LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_combination` pac ON (pac.`id_product_attribute` = pa.`id_product_attribute`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON (a.`id_attribute` = pac.`id_attribute`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group` ag ON (ag.`id_attribute_group` = a.`id_attribute_group`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` al ON (a.`id_attribute` = al.`id_attribute`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group_lang` agl ON (ag.`id_attribute_group` = agl.`id_attribute_group`)
                ' . Shop::addSqlAssociation('attribute', 'a') . '
                WHERE pa.`id_product` = ' . (int) $this->id . '
                    AND al.`id_lang` = ' . (int) $id_lang . '
                    AND agl.`id_lang` = ' . (int) $id_lang .'
                    ';
        if ($id_product_attribute !== null) {
            $sql .= ' AND product_attribute_shop.`id_product_attribute` = ' . (int) $id_product_attribute . ' ';
        }
        $sql .= 'GROUP BY id_attribute_group, id_product_attribute
                ORDER BY ag.`position` ASC, a.`position` ASC, agl.`name` ASC';
        $ret = Db::getInstance()->executeS($sql);
        $stock = '';
        foreach ($ret as &$row) {
            if ($stock == '') {
                $stock = $row['quantity'];
            } else {
                $row['quantity'] = $stock;
            }
        }
        return $ret;
    }
    public static function isDynamicProduct($product){
        if(is_array($product)){
            $id_product = $product['id_product'];
        } else {
            $id_product = $product->id;
        }
        $equation =   DynamicEquation::getEquationsByIdProduct($id_product);
        if(array_key_exists(0, $equation) && !empty($equation[0]->formula)){
            return true;
        }
        return false;
    }
    /*
    * module: offerintegration
    * date: 2020-03-06 14:52:31
    * version: 1.0.9.1
    */
    public $default_cut_price;
    public static function getAllCustomizedDatas($id_cart, $id_lang = null, $only_in_cart = true, $id_shop = null, $id_customization = null)
    {
        if (!Customization::isFeatureActive()) {
            return false;
        }
        if (!$id_cart) {
            return false;
        }
        if ($id_customization === 0) {
            $product_customizations = (int) Db::getInstance()->getValue('
                SELECT COUNT(`id_customization`) FROM `' . _DB_PREFIX_ . 'cart_product`
                WHERE `id_cart` = ' . (int) $id_cart .
                ' AND `id_customization` != 0');
            if ($product_customizations) {
                return false;
            }
        }
        if (!$id_lang) {
            $id_lang = Context::getContext()->language->id;
        }
        if (Shop::isFeatureActive() && !$id_shop) {
            $id_shop = (int) Context::getContext()->shop->id;
        }
        if (!$result = Db::getInstance()->executeS('
            SELECT cd.`id_customization`, c.`id_address_delivery`, c.`id_product`, cfl.`id_customization_field`, c.`id_product_attribute`,
                cd.`type`, cd.`index`, cd.`value`, cd.`id_module`, cd.`technical_reference`, cd.`technical_image`, cfl.`name`
            FROM `' . _DB_PREFIX_ . 'customized_data` cd
            NATURAL JOIN `' . _DB_PREFIX_ . 'customization` c
            LEFT JOIN `' . _DB_PREFIX_ . 'customization_field_lang` cfl ON (cfl.id_customization_field = cd.`index` AND id_lang = ' . (int) $id_lang .
            ($id_shop ? ' AND cfl.`id_shop` = ' . (int) $id_shop : '') . ')
            WHERE c.`id_cart` = ' . (int) $id_cart .
            ($only_in_cart ? ' AND c.`in_cart` = 1' : '') .
            ((int) $id_customization ? ' AND cd.`id_customization` = ' . (int) $id_customization : '') . '
            ORDER BY `id_product`, `id_product_attribute`, `type`, `index`')) {
            return false;
        }
        $customized_datas = array();
        foreach ($result as $row) {
            if ((int) $row['id_module'] && (int) $row['type'] == Product::CUSTOMIZE_TEXTFIELD) {
                $row['value'] = Hook::exec('displayCustomization', array('customization' => $row), (int) $row['id_module']);
            }
            $customized_datas[(int) $row['id_product']][(int) $row['id_product_attribute']][(int) $row['id_address_delivery']][(int) $row['id_customization']]['datas'][(int) $row['type']][] = $row;
        }
        if (!$result = Db::getInstance()->executeS(
            'SELECT `id_product`, `id_product_attribute`, `id_customization`, `id_address_delivery`, `quantity`, `quantity_refunded`, `quantity_returned`
            FROM `' . _DB_PREFIX_ . 'customization`
            WHERE `id_cart` = ' . (int) $id_cart .
            ((int) $id_customization ? ' AND `id_customization` = ' . (int) $id_customization : '') .
            ($only_in_cart ? ' AND `in_cart` = 1' : '')
        )) {
            return false;
        }
        foreach ($result as $row) {
            $customized_datas[(int) $row['id_product']][(int) $row['id_product_attribute']][(int) $row['id_address_delivery']][(int) $row['id_customization']]['quantity'] = (int) $row['quantity'];
            $customized_datas[(int) $row['id_product']][(int) $row['id_product_attribute']][(int) $row['id_address_delivery']][(int) $row['id_customization']]['quantity_refunded'] = (int) $row['quantity_refunded'];
            $customized_datas[(int) $row['id_product']][(int) $row['id_product_attribute']][(int) $row['id_address_delivery']][(int) $row['id_customization']]['quantity_returned'] = (int) $row['quantity_returned'];
            $customized_datas[(int) $row['id_product']][(int) $row['id_product_attribute']][(int) $row['id_address_delivery']][(int) $row['id_customization']]['id_customization'] = (int) $row['id_customization'];
        }
        return $customized_datas;
    }
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

    public static function productIsOrderable($id_product = null){
        $id_lang = (int) Context::getContext()->language->id;
        $id_shop = (int) Context::getContext()->shop->id;
        $id_shop_group = (int) Context::getContext()->shop->id_shop_group;

        if(!$id_product){
            return false;
        }
        $product = new Product($id_product);

        $id_attribute = 0;
        if(isset(Product::getProductAttributesIds($id_product)[0])){
            $id_attribute = (int)reset(Product::getProductAttributesIds($id_product)[0]);
        }

        if((int) Configuration::get('PS_CATALOG_MODE', $id_lang, $id_shop_group, $id_shop,0) == 0){
            if((int) Configuration::get('PS_STOCK_MANAGEMENT', $id_lang, $id_shop_group, $id_shop,0) == 1){
                if((int) StockAvailable::getQuantityAvailableByProduct($id_product, $id_attribute) < (int) $product->minimal_quantity){
                    switch((int)$product->out_of_stock){
                        case 0:
                                return false;
                            break;
                        case 1:
                                return true;
                            break;
                        case 2:
                            if((int) Configuration::get('PS_ORDER_OUT_OF_STOCK', $id_lang, $id_shop_group, $id_shop,1) == 0){
                                return false;
                            } else {
                                return true;
                            }
                            break;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }


    public static function hasMaxProductsRemainingStock($id_product = null, $stock_limit=100){
        $id_lang = (int) Context::getContext()->language->id;
        $id_shop = (int) Context::getContext()->shop->id;
        $id_shop_group = (int) Context::getContext()->shop->id_shop_group;

        if(!$id_product){
            $is_orderable = false;
        }
        $product = new Product($id_product);

        $id_attribute = 0;
        if(isset(Product::getProductAttributesIds($id_product)[0])){
            $id_attribute = (int)reset(Product::getProductAttributesIds($id_product)[0]);
        }
        $available_stock = (int)StockAvailable::getQuantityAvailableByProduct($id_product, $id_attribute);


        if((int) Configuration::get('PS_CATALOG_MODE', $id_lang, $id_shop_group, $id_shop,0) == 0){
            if((int) Configuration::get('PS_STOCK_MANAGEMENT', $id_lang, $id_shop_group, $id_shop,0) == 1){
                if($available_stock < (int) $product->minimal_quantity){
                    switch((int)$product->out_of_stock){
                        case 0:
                            $is_orderable = false;
                            break;
                        case 1:
                            $is_orderable = true;
                            break;
                        case 2:
                            if((int) Configuration::get('PS_ORDER_OUT_OF_STOCK', $id_lang, $id_shop_group, $id_shop,1) == 0){
                                $is_orderable = false;
                            } else {
                                $is_orderable = true;
                            }
                            break;
                    }
                } else {
                    $is_orderable = true;
                }
            } else {
                $is_orderable = true;
            }
        } else {
            $is_orderable = false;
        }

        $msg = '';

        if($available_stock > 0 && $available_stock <= (int)$stock_limit){
            $msg = '<div class="w-100 text-danger text-center">Nog '.$available_stock.' stuks beschikbaar</div>';
        }

        return json_encode(['is_orderable' => $is_orderable, 'remaining_qty_msg' => $msg, 'remaining_stock' => $available_stock]);
    }
}
