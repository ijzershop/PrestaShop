<?php
use classes\models\DynamicConfig;
use classes\models\DynamicEquation;
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



    /**
     * @param int $id_lang Language identifier
     * @param array $row
     * @param Context|null $context
     *
     * @return array|false
     */
    public static function getProductProperties($id_lang, $row, Context $context = null)
    {
        Hook::exec('actionGetProductPropertiesBefore', [
            'id_lang' => $id_lang,
            'product' => &$row,
            'context' => $context,
        ]);

        if (!$row['id_product']) {
            return false;
        }

        if ($context == null) {
            $context = Context::getContext();
        }

        $id_product_attribute = $row['id_product_attribute'] = (!empty($row['id_product_attribute']) ? (int) $row['id_product_attribute'] : null);

        // Product::getDefaultAttribute is only called if id_product_attribute is missing from the SQL query at the origin of it:
        // consider adding it in order to avoid unnecessary queries
        $row['allow_oosp'] = Product::isAvailableWhenOutOfStock($row['out_of_stock']);
        if (
            Combination::isFeatureActive() &&
            $id_product_attribute === null &&
            (
                (isset($row['cache_default_attribute']) && ($ipa_default = $row['cache_default_attribute']) !== null)
                || ($ipa_default = Product::getDefaultAttribute($row['id_product'], (int) !$row['allow_oosp']))
            )
        ) {
            $id_product_attribute = $row['id_product_attribute'] = $ipa_default;
        }
        if (!Combination::isFeatureActive() || !isset($row['id_product_attribute'])) {
            $id_product_attribute = $row['id_product_attribute'] = 0;
        }

        // Tax
        $usetax = !Tax::excludeTaxeOption();

        $cache_key = $row['id_product'] . '-' . $id_product_attribute . '-' . $id_lang . '-' . (int) $usetax;
        if (isset($row['id_product_pack'])) {
            $cache_key .= '-pack' . $row['id_product_pack'];
        }

        if (!isset($row['cover_image_id'])) {
            $cover = static::getCover($row['id_product']);
            if (isset($cover['id_image'])) {
                $row['cover_image_id'] = $cover['id_image'];
            }
        }

        if (isset($row['cover_image_id'])) {
            $cache_key .= '-cover' . (int) $row['cover_image_id'];
        }

        if (isset(self::$productPropertiesCache[$cache_key])) {
            return array_merge($row, self::$productPropertiesCache[$cache_key]);
        }

        // Datas
        $row['category'] = Category::getLinkRewrite((int) $row['id_category_default'], (int) $id_lang);
        $row['category_name'] = Db::getInstance()->getValue('SELECT name FROM ' . _DB_PREFIX_ . 'category_lang WHERE id_shop = ' . (int) $context->shop->id . ' AND id_lang = ' . (int) $id_lang . ' AND id_category = ' . (int) $row['id_category_default']);
        $row['link'] = $context->link->getProductLink((int) $row['id_product'], $row['link_rewrite'], $row['category'], $row['ean13']);

        // Get manufacturer name if missing
        if (empty($row['manufacturer_name'])) {
            // Assign empty value
            $row['manufacturer_name'] = null;

            // If we have manufacturer ID, we wil try to load it's name and assign it
            if (!empty($row['id_manufacturer'])) {
                $manufacturerName = Manufacturer::getNameById((int) $row['id_manufacturer']);
                if (!empty($manufacturerName)) {
                    $row['manufacturer_name'] = $manufacturerName;
                }
            }
        }

        $row['attribute_price'] = 0;
        if ($id_product_attribute) {
            $row['attribute_price'] = (float) Combination::getPrice($id_product_attribute);
        }

        if (isset($row['quantity_wanted'])) {
            // 'quantity_wanted' may very well be zero even if set
            $quantity = max((int) $row['minimal_quantity'], (int) $row['quantity_wanted']);
        } elseif (isset($row['cart_quantity'])) {
            $quantity = max((int) $row['minimal_quantity'], (int) $row['cart_quantity']);
        } else {
            $quantity = (int) $row['minimal_quantity'];
        }

        // We save value in $priceTaxExcluded and $priceTaxIncluded before they may be rounded
        $row['price_tax_exc'] = $priceTaxExcluded = Product::getPriceStatic(
            (int) $row['id_product'],
            false,
            $id_product_attribute,
            (self::$_taxCalculationMethod == PS_TAX_EXC ? Context::getContext()->getComputingPrecision() : 6),
            null,
            false,
            true,
            $quantity
        );

        if (self::$_taxCalculationMethod == PS_TAX_EXC) {
            $row['price_tax_exc'] = Tools::ps_round($priceTaxExcluded, Context::getContext()->getComputingPrecision());
            $row['price'] = $priceTaxIncluded = Product::getPriceStatic(
                (int) $row['id_product'],
                true,
                $id_product_attribute,
                6,
                null,
                false,
                true,
                $quantity
            );
            $row['price_without_reduction'] = $row['price_without_reduction_without_tax'] = Product::getPriceStatic(
                (int) $row['id_product'],
                false,
                $id_product_attribute,
                2,
                null,
                false,
                false,
                $quantity
            );
        } else {
            $priceTaxIncluded = Product::getPriceStatic(
                (int) $row['id_product'],
                true,
                $id_product_attribute,
                6,
                null,
                false,
                true,
                $quantity
            );
            $row['price'] = Tools::ps_round($priceTaxIncluded, Context::getContext()->getComputingPrecision());
            $row['price_without_reduction'] = Product::getPriceStatic(
                (int) $row['id_product'],
                true,
                $id_product_attribute,
                6,
                null,
                false,
                false,
                $quantity
            );
            $row['price_without_reduction_without_tax'] = Product::getPriceStatic(
                (int) $row['id_product'],
                false,
                $id_product_attribute,
                6,
                null,
                false,
                false,
                $quantity
            );
        }

        $row['reduction'] = Product::getPriceStatic(
            (int) $row['id_product'],
            (bool) $usetax,
            $id_product_attribute,
            6,
            null,
            true,
            true,
            $quantity,
            true,
            null,
            null,
            null,
            $specific_prices
        );

        $row['reduction_without_tax'] = Product::getPriceStatic(
            (int) $row['id_product'],
            false,
            $id_product_attribute,
            6,
            null,
            true,
            true,
            $quantity,
            true,
            null,
            null,
            null,
            $specific_prices
        );


        //Added cart reduction percent to show an all products
        $context = Context::getContext();
        $cartRules = $context->cart->getOrderedCartRulesIds();

        $prio = 50;
        $cartReductionPercent = 0;
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


        $spec_price = Product::getPriceStatic(
                (int) $row['id_product'],
                false,
                $id_product_attribute,
                6,
                null,
                false,
                false,
                $quantity
            );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $row['price_after_cartrule_reduction_without_tax'] = $spec_price - $specific_price_reduction;

        $spec_price = Product::getPriceStatic(
                (int) $row['id_product'],
                false,
                $id_product_attribute,
                6,
                null,
                false,
                false,
                $quantity
            );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $row['price_reduction_after_cartrule_reduction_with_tax'] = $specific_price_reduction*1.21;

        $spec_price = Product::getPriceStatic(
                (int) $row['id_product'],
                false,
                $id_product_attribute,
                6,
                null,
                false,
                false,
                $quantity
            );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $row['price_reduction_after_cartrule_reduction_without_tax'] = $specific_price_reduction;

        $spec_price = Product::getPriceStatic(
                (int) $row['id_product'],
                false,
                $id_product_attribute,
                6,
                null,
                false,
                false,
                $quantity
            );
        $specific_price_reduction = ($spec_price * $cartReductionPercent) / 100;

        $row['price_after_cartrule_reduction_with_tax'] = ($spec_price - $specific_price_reduction) * 1.21;

        $row['specific_prices'] = $specific_prices;
        /* Get quantity of the base product.
         * For products without combinations - self explanatory.
         * For products with combinations - this value is a SUM of quantities of all combinations.
         * You have 2 black shirts + 2 white shirts = $quantity 4.
         */
        $row['quantity'] = Product::getQuantity(
            (int) $row['id_product'],
            0,
            isset($row['cache_is_pack']) ? $row['cache_is_pack'] : null,
            $context->cart
        );

        $row['quantity_all_versions'] = $row['quantity'];

        // If we have some combination ID specified, we will return more precise stock and date for this combination
        if ($row['id_product_attribute']) {
            $row['quantity'] = Product::getQuantity(
                (int) $row['id_product'],
                $id_product_attribute,
                isset($row['cache_is_pack']) ? $row['cache_is_pack'] : null,
                $context->cart
            );

            $row['available_date'] = Product::getAvailableDate(
                (int) $row['id_product'],
                $id_product_attribute
            );
        }

        $row['id_image'] = Product::defineProductImage($row, $id_lang);
        $row['features'] = Product::getFrontFeaturesStatic((int) $id_lang, $row['id_product']);

        /*
         * Loading of files attached to product. This is using cache_has_attachments property which needs to be managed
         * every time a file is changed. It can sometimes lead to database inconsistency.
         *
         * It would be better to lazy load it in ProductLazyArray so we can just always take the live data
         * if needed and would not need to take care about cache_has_attachments.
         */
        $row['attachments'] = [];
        if (!isset($row['cache_has_attachments']) || $row['cache_has_attachments']) {
            $row['attachments'] = Product::getAttachmentsStatic((int) $id_lang, $row['id_product']);
        }

        $row['virtual'] = ((!isset($row['is_virtual']) || $row['is_virtual']) ? 1 : 0);

        // Pack management
        $row['pack'] = (!isset($row['cache_is_pack']) ? Pack::isPack($row['id_product']) : (int) $row['cache_is_pack']);
        $row['packItems'] = $row['pack'] ? Pack::getItemTable($row['id_product'], $id_lang) : [];
        $row['nopackprice'] = $row['pack'] ? Pack::noPackPrice($row['id_product']) : 0;

        if ($row['pack'] && !Pack::isInStock($row['id_product'], $quantity, $context->cart)) {
            $row['quantity'] = 0;
        }

        $row['customization_required'] = false;
        if (isset($row['customizable']) && $row['customizable'] && Customization::isFeatureActive()) {
            if (count(Product::getRequiredCustomizableFieldsStatic((int) $row['id_product']))) {
                $row['customization_required'] = true;
            }
        }

        if (!isset($row['attributes'])) {
            $attributes = Product::getAttributesParams($row['id_product'], $row['id_product_attribute']);

            foreach ($attributes as $attribute) {
                $row['attributes'][$attribute['id_attribute_group']] = $attribute;
            }
        }

        $row = Product::getTaxesInformations($row, $context);

        $row['ecotax_rate'] = (float) Tax::getProductEcotaxRate($context->cart->{Configuration::get('PS_TAX_ADDRESS_TYPE')});

        Hook::exec('actionGetProductPropertiesAfter', [
            'id_lang' => $id_lang,
            'product' => &$row,
            'context' => $context,
        ]);

        // Always recompute unit prices based on initial ratio so that discounts are applied on unit price as well
        $unitPriceRatio = self::computeUnitPriceRatio($row, $id_product_attribute, $quantity, $context);
        $row['unit_price_ratio'] = $unitPriceRatio;
        $row['unit_price_tax_excluded'] = $unitPriceRatio != 0 ? $priceTaxExcluded / $unitPriceRatio : 0.0;
        $row['unit_price_tax_included'] = $unitPriceRatio != 0 ? $priceTaxIncluded / $unitPriceRatio : 0.0;

        Hook::exec('actionGetProductPropertiesAfterUnitPrice', [
            'id_lang' => $id_lang,
            'product' => &$row,
            'context' => $context,
        ]);

        self::$productPropertiesCache[$cache_key] = $row;

        return self::$productPropertiesCache[$cache_key];
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
            $row['quantity'] = (int)StockAvailable::getQuantityAvailableByProduct($row['id_product'], null);
            $row['out_of_stock'] = (int)StockAvailable::outOfStock($row['id_product'], null);
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
