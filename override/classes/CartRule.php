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
            'name' => [
                'type' => self::TYPE_HTML,
                'lang' => true,
                'required' => true,
                'size' => 254,
            ],
        ],
    ];

    /*
    * module: klcartruleextender
    * date: 2023-04-03 12:08:24
    * version: 1.0.1
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
