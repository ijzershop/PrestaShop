<?php
class CartRule extends CartRuleCore
{
    public const FILTER_ACTION_ALL = 1;
    public const FILTER_ACTION_SHIPPING = 2;
    public const FILTER_ACTION_REDUCTION = 3;
    public const FILTER_ACTION_GIFT = 4;
    public const FILTER_ACTION_ALL_NOCAP = 5;
    public const BO_ORDER_CODE_PREFIX = 'BO_ORDER_';
    protected static $only_one_gift = [];
    public $id;
    public $name;
    public $id_customer;
    public $date_from;
    public $date_to;
    public $description;
    public $quantity = 1;
    public $quantity_per_user = 1;
    public $priority = 1;
    public $partial_use = true;
    public $code;
    public $minimum_amount;
    public $minimum_amount_tax;
    public $minimum_amount_currency;
    public $minimum_amount_shipping;
    public $country_restriction;
    public $carrier_restriction;
    public $group_restriction;
    public $cart_rule_restriction;
    public $product_restriction;
    public $shop_restriction;
    public $free_shipping;
    public $reduction_percent;
    public $reduction_amount;
    public $reduction_tax;
    public $reduction_currency;
    public $reduction_product;
    public $reduction_exclude_special;
    public $gift_product;
    public $gift_product_attribute;
    public $highlight;
    public $active = true;
    public $date_add;
    public $date_upd;

    public $id_connected_cart = null;

    protected static $cartAmountCache = [];
    public static $definition = [
        'table' => 'cart_rule',
        'primary' => 'id_cart_rule',
        'multilang' => true,
        'fields' => [
            'id_customer' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'date_from' => ['type' => self::TYPE_DATE, 'validate' => 'isDate', 'required' => true],
            'date_to' => ['type' => self::TYPE_DATE, 'validate' => 'isDate', 'required' => true],
            'description' => ['type' => self::TYPE_STRING, 'validate' => 'isCleanHtml', 'size' => 65534],
            'quantity' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'quantity_per_user' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'priority' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'],
            'partial_use' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'code' => ['type' => self::TYPE_STRING, 'validate' => 'isCleanHtml', 'size' => 254],
            'minimum_amount' => ['type' => self::TYPE_FLOAT, 'validate' => 'isFloat'],
            'minimum_amount_tax' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'minimum_amount_currency' => ['type' => self::TYPE_INT, 'validate' => 'isInt'],
            'minimum_amount_shipping' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'country_restriction' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'carrier_restriction' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'group_restriction' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'cart_rule_restriction' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'product_restriction' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'shop_restriction' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'free_shipping' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'reduction_percent' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPercentage'],
            'reduction_amount' => ['type' => self::TYPE_FLOAT, 'validate' => 'isFloat'],
            'reduction_tax' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'reduction_currency' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'reduction_product' => ['type' => self::TYPE_INT, 'validate' => 'isInt'],
            'reduction_exclude_special' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'gift_product' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'gift_product_attribute' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'highlight' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'active' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'id_connected_cart' => ['type' => self::TYPE_STRING],
            'name' => [
                'type' => self::TYPE_HTML,
                'lang' => true,
                'required' => true,
                'size' => 254,
            ],
        ],
    ];
    public static function getAutoAddToCartRules(Context $context = null, bool $useOrderPrices = false)
    {
        if ($context === null) {
            $context = Context::getContext();
        }
        if (!CartRule::isFeatureActive() || !Validate::isLoadedObject($context->cart)) {
            return;
        }
        $sql = '
		SELECT SQL_NO_CACHE cr.*
		FROM ' . _DB_PREFIX_ . 'cart_rule cr
		LEFT JOIN ' . _DB_PREFIX_ . 'cart_rule_shop crs ON cr.id_cart_rule = crs.id_cart_rule
		' . (!Validate::isLoadedObject($context->customer) && Group::isFeatureActive() ? ' LEFT JOIN ' . _DB_PREFIX_ . 'cart_rule_group crg ON cr.id_cart_rule = crg.id_cart_rule' : '') . '
		LEFT JOIN ' . _DB_PREFIX_ . 'cart_rule_carrier crca ON cr.id_cart_rule = crca.id_cart_rule
		' . ($context->cart->id_carrier ? 'LEFT JOIN ' . _DB_PREFIX_ . 'carrier c ON (c.id_reference = crca.id_carrier AND c.deleted = 0)' : '') . '
		LEFT JOIN ' . _DB_PREFIX_ . 'cart_rule_country crco ON cr.id_cart_rule = crco.id_cart_rule
		WHERE cr.active = 1
		AND cr.code = ""
		AND cr.quantity > 0
		AND NOW() BETWEEN cr.date_from AND cr.date_to
		AND (
			cr.id_customer = 0
			' . (Validate::isLoadedObject($context->customer) ? 'OR cr.id_customer = ' . (int)$context->cart->id_customer : '') . '
		)
		AND (
			cr.`carrier_restriction` = 0
			' . ($context->cart->id_carrier ? 'OR c.id_carrier = ' . (int)$context->cart->id_carrier : '') . '
		)
		AND (
			cr.`shop_restriction` = 0
			' . ((Shop::isFeatureActive() && $context->shop->id) ? 'OR crs.id_shop = ' . (int)$context->shop->id : '') . '
		)
		AND (
			cr.`group_restriction` = 0
			' . (Validate::isLoadedObject($context->customer) ? 'OR EXISTS (
				SELECT 1
				FROM `' . _DB_PREFIX_ . 'customer_group` cg
				INNER JOIN `' . _DB_PREFIX_ . 'cart_rule_group` crg ON cg.id_group = crg.id_group
				WHERE cr.`id_cart_rule` = crg.`id_cart_rule`
				AND cg.`id_customer` = ' . (int)$context->customer->id . '
				LIMIT 1
			)' : (Group::isFeatureActive() ? 'OR crg.`id_group` = ' . (int)Configuration::get('PS_UNIDENTIFIED_GROUP') : '')) . '
		)
		AND (
			cr.`reduction_product` <= 0
			OR EXISTS (
				SELECT 1
				FROM `' . _DB_PREFIX_ . 'cart_product`
				WHERE `' . _DB_PREFIX_ . 'cart_product`.`id_product` = cr.`reduction_product` AND `id_cart` = ' . (int)$context->cart->id . '
			)
		)
		AND NOT EXISTS (SELECT 1 FROM ' . _DB_PREFIX_ . 'cart_cart_rule WHERE cr.id_cart_rule = ' . _DB_PREFIX_ . 'cart_cart_rule.id_cart_rule
																			AND id_cart = ' . (int)$context->cart->id . ')
		ORDER BY position';
        $result = Db::getInstance()->executeS($sql, true, false);
        $returnData = ['cart_rule' => null, 'remaining_amount' => 0.00];
        if ($result) {
            $cart_rules = ObjectModel::hydrateCollection('CartRule', $result);
            if ($cart_rules) {
                foreach ($cart_rules as $key => $cart_rule) {
                    if (!$cart_rule->checkValidity($context, false, false, true, false)) {
                        $productTotal = $context->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS);
                        if ($cart_rule->minimum_amount > $productTotal) {
                            $returnData['cart_rule'] = $cart_rule;
                            $returnData['remaining_amount'] = $cart_rule->minimum_amount - $productTotal;
                            return $returnData;
                        }
                    }
                }
            }
        }
        return $returnData;
    }


    /*
    * module: klcartruleextender
    * date: 2024-03-05 08:40:48
    * version: 1.0.2
    */
    public static function copyConditions($id_cart_rule_source, $id_cart_rule_destination)
    {
        parent::copyConditions($id_cart_rule_source, $id_cart_rule_destination);
        if (($moduleClass = Module::getInstanceByName('klcartruleextender'))
            && $moduleClass instanceof KlCartRuleExtender
            && $moduleClass->isEnabledForShopContext()
            && $moduleClass->isCartRuleIncludingFees($id_cart_rule_source)
        ) {
            $moduleClass->addCartRuleFees([$id_cart_rule_destination]);
        }
    }
}
