<?php
use classes\models\DynamicConfig;
use classes\models\DynamicEquation;
class Product extends ProductCore {

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


    /*
    * module: dynamicproduct
    * date: 2020-08-14 11:59:27
    * version: 2.3.4
    */
    public static function getProductProperties($id_lang, $row, Context $context = null)
    {
        $result = parent::getProductProperties($id_lang, $row, $context);
        
        $module = Module::getInstanceByName('dynamicproduct');

        if (Module::isEnabled('dynamicproduct') && $module->provider->isAfter1730()) {
            $id_product = (int)$row['id_product'];
            $is_active = DynamicConfig::isActive($id_product);
            if ($is_active) {
                $displayed_price = DynamicConfig::getDisplayedPrice($id_product);
                if ($displayed_price) {
                    $module->calculator->assignProductPrices($row, $displayed_price, $result);
                }
            }
        }
        return $result;
   }
    
    
    
    
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $min_saw_size;
    
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $min_cut_size;
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $id_oi_offer;
    
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $oi_offer_extra_shipping;
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $name;
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
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
        
        self::$definition['fields']['id_oi_offer'] = array('type' => ObjectModel::TYPE_INT,
                                                                 'shop' => 'true',
                                                                 'required' => false);
        self::$definition['fields']['oi_offer_extra_shipping'] = array('type' => ObjectModel::TYPE_INT,
                                                                 'shop' => 'true',
                                                                 'required' => false);
        self::$definition['fields']['name'] = array('type' => ObjectModel::TYPE_STRING,
                                                                 'lang' => true,
                                                                 'validate' => 'isCatalogName',
                                                                 'required' => true, 'size' => 255);
        parent::__construct($id_product, $full, $id_lang, $id_shop);
    }
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
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

     public static function getPriceStatic(
        $id_product,
        $usetax = true,
        $id_product_attribute = null,
        $decimals = 6,
        $divisor = null,
        $only_reduc = false,
        $usereduc = true,
        $quantity = 1,
        $force_associated_tax = false,
        $id_customer = null,
        $id_cart = null,
        $id_address = null,
        &$specific_price_output = null,
        $with_ecotax = true,
        $use_group_reduction = true,
        Context $context = null,
        $use_customer_price = true,
        $id_customization = null
    ) {
        if (!$context) {
            $context = Context::getContext();
        }
        $return = parent::getPriceStatic(
            $id_product,
            $usetax,
            $id_product_attribute,
            $decimals,
            $divisor,
            $only_reduc,
            $usereduc,
            $quantity,
            $force_associated_tax,
            $id_customer,
            $id_cart,
            $id_address,
            $specific_price_output,
            $with_ecotax,
            $use_group_reduction,
            $context,
            $use_customer_price,
            $id_customization
        );

        $module = Module::getInstanceByName('dynamicproduct');
        if (!$module->active|| $only_reduc) {
            return $return;
        }
        if ((int)$id_cart && DynamicConfig::isExcluded($id_product)) {
            if ((int)$id_product_attribute || (int)$id_customization) {
                $base_price = parent::getPriceStatic(
                    $id_product,
                    $usetax,
                    false,
                    $decimals,
                    $divisor,
                    $only_reduc,
                    $usereduc,
                    $quantity,
                    $force_associated_tax,
                    $id_customer,
                    $id_cart,
                    $id_address,
                    $specific_price_output,
                    $with_ecotax,
                    $use_group_reduction,
                    $context,
                    $use_customer_price
                );
                $difference = $return - $base_price;
                $id_currency = Validate::isLoadedObject($context->currency) ?
                    (int)$context->currency->id :
                    (int) Configuration::get('PS_CURRENCY_DEFAULT');
                $difference = Tools::convertPrice($difference, $id_currency);
                return max($difference, 0);
            } else {
                return 0;
            }
        }
        return $return;
    }
}