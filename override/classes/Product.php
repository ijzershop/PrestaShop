<?php
use DynamicProduct\classes\models\DynamicConfig;
use DynamicProduct\classes\models\DynamicEquation;
use PrestaShop\PrestaShop\Adapter\Entity\StockAvailable;

class Product extends ProductCore {
        /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $min_cut_remainder;
    public $saw_loss;

    public $min_saw_size;

    public $min_cut_size;
    /*
    * module: offerintegration
    * date: 2020-08-21 11:00:54
    * version: 1.0.9.1
    */
    public $link_rewrite;
    public $seo_keywords;
    public $alternate_name;
    public $jsonld;
    public $oi_offer_memo;
    public $id_oi_offer;
    public $oi_offer_extra_shipping;

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
        self::$definition['fields']['oi_offer_memo'] = array('type' => self::TYPE_STRING, 'required' => false);
        self::$definition['fields']['name'] = array('type' => self::TYPE_STRING,
                                                                 'lang' => true,
                                                                 'validate' => 'isCatalogName',
                                                                 'required' => false, 'size' => 255);
        self::$definition['fields']['alternate_name'] = array('type' => self::TYPE_STRING, 'required' => false);
        self::$definition['fields']['seo_keywords'] = array('type' => self::TYPE_STRING, 'required' => false);
        self::$definition['fields']['jsonld'] = array('type' => self::TYPE_STRING, 'required' => false);
        self::$definition['fields']['link_rewrite'] = array('type' => self::TYPE_STRING,
            'lang' => true,
            'validate' => 'isString',
            'required' => false, 'size' => 255);

        parent::__construct($id_product, $full, $id_lang, $id_shop);
    }


    public static function getProductProperties($id_lang, $row, Context $context = null)
    {
        $result = parent::getProductProperties($id_lang, $row, $context);


        $context = Context::getContext();
        $result['out_of_stock'] = StockAvailable::outOfStock((int)$result['id_product']);

        $cartRules = $context->cart->getOrderedCartRulesIds();

        $prio = 50;
        $cartReductionPercent = 0;
        $id_product_attribute = $row['id_product_attribute'] = (!empty($row['id_product_attribute']) ? (int) $row['id_product_attribute'] : null);

        $firstDiscountRule = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_FIRST', $context->language->id, $context->shop->id_shop_group, $context->shop->id_shop);
        $secondDiscountRule = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_SECOND', $context->language->id, $context->shop->id_shop_group, $context->shop->id_shop);
        $thirdDiscountRule = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_THIRD', $context->language->id, $context->shop->id_shop_group, $context->shop->id_shop);
        foreach ($cartRules as $rule){

            $ruleId = (int)$rule['id_cart_rule'];
            if(in_array($ruleId, [158 ,$firstDiscountRule ,$secondDiscountRule ,$thirdDiscountRule])){
                $cartRule = new CartRule($ruleId);
                if($cartRule->priority <= $prio){
                    $prio = $cartRule->priority;
                    $cartReductionPercent = (float)$cartRule->reduction_percent;
                }
            }
        }

        if (isset($row['quantity_wanted'])) {
            $quantity = max((int) $row['minimal_quantity'], (int) $row['quantity_wanted']);
        } elseif (isset($row['cart_quantity'])) {
            $quantity = max((int) $row['minimal_quantity'], (int) $row['cart_quantity']);
        } else {
            $quantity = (int) $row['minimal_quantity'];
        }

        $spec_price = Product::getPriceStatic(
            (int) $result['id_product'],
            false,
            $id_product_attribute,
            6,
            null,
            false,
            false,
            $quantity
        );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $result['price_after_cartrule_reduction_without_tax'] = $spec_price - $specific_price_reduction;

        $spec_price = Product::getPriceStatic(
            (int) $result['id_product'],
            false,
            $id_product_attribute,
            6,
            null,
            false,
            false,
            $quantity
        );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $result['price_reduction_after_cartrule_reduction_with_tax'] = $specific_price_reduction*1.21;

        $spec_price = Product::getPriceStatic(
            (int) $result['id_product'],
            false,
            $id_product_attribute,
            6,
            null,
            false,
            false,
            $quantity
        );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $result['price_reduction_after_cartrule_reduction_without_tax'] = $specific_price_reduction;

        $spec_price = Product::getPriceStatic(
            (int) $result['id_product'],
            false,
            $id_product_attribute,
            6,
            null,
            false,
            false,
            $quantity
        );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $result['price_after_cartrule_reduction_with_tax'] = ($spec_price - $specific_price_reduction) * 1.21;


        $module = Module::getInstanceByName('dynamicproduct');
        if (Module::isEnabled('dynamicproduct') && $module->provider->isAfter1730()) {
            $id_product = (int) $result['id_product'];

            $controller = Tools::getValue('controller');
            if ($controller == 'product') {
                $current_product = (int) Tools::getValue('id_product');
                if ($current_product == $id_product) {
                    return $result;
                }
            }

            $dynamic_config = DynamicConfig::getByProduct($id_product);
            if ($dynamic_config->active) {
                $displayed_price = DynamicConfig::getDisplayedPrice($id_product);
                if ($displayed_price || $dynamic_config->display_dynamic_price) {
                    $module->calculator->assignProductPrices($row, $displayed_price, $result);
                }
            }
        }




        return $result;
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
                    product_attribute_shop.`minimal_quantity`, product_attribute_shop.`available_date`, ag.`group_type`,
                    pal.`available_now`, pal.`available_later`
                FROM `' . _DB_PREFIX_ . 'product_attribute` pa
                ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
                ' . Product::sqlStock('pa', 'pa') . '
                LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_lang` pal
                    ON (
                        pa.`id_product_attribute` = pal.`id_product_attribute` AND
                        pal.`id_lang` = ' . (int) Context::getContext()->language->id . ')
                LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_combination` pac ON (pac.`id_product_attribute` = pa.`id_product_attribute`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON (a.`id_attribute` = pac.`id_attribute`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group` ag ON (ag.`id_attribute_group` = a.`id_attribute_group`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` al ON (a.`id_attribute` = al.`id_attribute`)
                LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group_lang` agl ON (ag.`id_attribute_group` = agl.`id_attribute_group`)
                ' . Shop::addSqlAssociation('attribute', 'a') . '
                WHERE pa.`id_product` = ' . (int) $this->id . '
                    AND al.`id_lang` = ' . (int) $id_lang . '
                    AND agl.`id_lang` = ' . (int) $id_lang . '
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

        $equation = DynamicEquation::getEquationsByIdProduct($id_product);

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

        $customized_datas = [];
        foreach ($result as $row) {
            if ((int) $row['id_module'] && (int) $row['type'] == Product::CUSTOMIZE_TEXTFIELD) {
                $row['value'] = Hook::exec('displayCustomization', ['customization' => $row], (int) $row['id_module']);
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
        $id_shop = Context::getContext()->shop->id;

        $query = 'SELECT p.*, product_shop.*, pl.* , m.`name` AS manufacturer_name, s.`name` AS supplier_name FROM `' . _DB_PREFIX_ . 'product` as `p`
                    '.Shop::addSqlAssociation('product', 'p').'
                    LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` AS `pl` ON `p`.`id_product` = `pl`.`id_product`
                    LEFT JOIN `'._DB_PREFIX_.'manufacturer` m ON (m.`id_manufacturer` = p.`id_manufacturer`)
                    LEFT JOIN `'._DB_PREFIX_.'supplier` s ON (s.`id_supplier` = p.`id_supplier`)
                    WHERE `p`.`id_oi_offer` = ' . $id_oi_offer . '
                    AND `pl`.`id_lang` = ' . $id_lang . ' GROUP BY `p`.`id_product`;';
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
        $results_array = array();
        foreach ($result as $key => $row) {
        if($row['id_shop'] !== $id_shop){
            unset($result[$key]);
        }
            $row['price_tax_inc'] = Product::getPriceStatic($row['id_product'], true, null, 2);
            $row['price_tax_exc'] = Product::getPriceStatic($row['id_product'], false, null, 2);
            $row['quantity'] = (int)StockAvailable::getQuantityAvailableByProduct($row['id_product'], null);
            $row['out_of_stock'] = (int)StockAvailable::outOfStock((int)$row['id_product']);
            $row['packedProducts'] = Pack::getItems($row['id_product'], $id_lang);

            foreach ($row['packedProducts'] as $key => $pack){
                $row['packedProducts'][$key]->attributes = Product::getAttributesParams($pack->id, $pack->id_pack_product_attribute);
            }
            $results_array[] = $row;
        }

        return $results_array;
    }

    public static function getOfferRowsAsObject($id_oi_offer = null, $id_lang = 1) {
        if ($id_oi_offer == null || !is_numeric($id_oi_offer)) {
            return array();
        }
        $context = Context::getContext();
        $id_shop = $context->shop->id;
        $presenter = new ProductPresenterFactory($context);
        $assembler = new ProductAssembler($context);

        $query = 'SELECT p.id_product FROM `' . _DB_PREFIX_ . 'product` as `p`
                    '.Shop::addSqlAssociation('product', 'p').'
                    LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` AS `pl` ON `p`.`id_product` = `pl`.`id_product`

                    WHERE `p`.`id_oi_offer` = ' . $id_oi_offer . '
                    AND `pl`.`id_lang` = ' . $id_lang . ' GROUP BY `p`.`id_product`;';
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);

        $results_array = array();
        foreach ($result as $product){
            $results_array[] = $presenter->getPresenter()->present($presenter->getPresentationSettings(),  $assembler->assembleProduct(['id_product' => $product['id_product']]), $context->language);
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



    public static function isAvailableForOrderCustom($idProduct, $idProductAttr=0, $type=null){
        $qty = 0;
        $min = 1;
        $max = 9999;
        $restrictedByStock = false;

        $style = '';
        $attr = '';
        $class = '';

        $availableForOrder = true;

        $product = new Product($idProduct);
        $qty = StockAvailable::getQuantityAvailableByProduct($idProduct);
        $out_of_stock = StockAvailable::outOfStock($idProduct);
        $location = StockAvailable::getLocation($idProduct) ?: '';

        if(Configuration::get('PS_STOCK_MANAGEMENT') && $out_of_stock === 0){
            $max = $qty;
            $restrictedByStock = true;
            if($qty <= 0){
                $availableForOrder = false;
                $style = "pointer-events:none;";
                $attr = 'disabled="disabled"';
                $class = "disabled";
            }
        }

        switch ($type){
            case 'qty':
                return $qty;

            case 'min':
                return $min;

            case 'max':
                return $max;

            case 'restricted_by_stock':
                return $restrictedByStock;

            case 'available_for_order':
                return $availableForOrder;

            case 'style':
                return $style;

            case 'attr':
                return $attr;

            case 'class':
                return $class;

            default:
                return $availableForOrder;
        }
    }
}
