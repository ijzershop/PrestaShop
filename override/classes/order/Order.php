<?php
/**
 * Class Order Overide fixed for 1.7.7.8
 */

class Order extends OrderCore
{
    public $added_to_order;

    public static $definition = [
        'table' => 'orders',
        'primary' => 'id_order',
        'fields' => [
            'id_address_delivery' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'id_address_invoice' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'id_cart' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'id_currency' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'id_shop_group' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'id_shop' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'id_lang' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'id_customer' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'id_carrier' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'current_state' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'secure_key' => ['type' => self::TYPE_STRING, 'validate' => 'isMd5'],
            'payment' => ['type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true],
            'module' => ['type' => self::TYPE_STRING, 'validate' => 'isModuleName', 'required' => true],
            'recyclable' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'gift' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'gift_message' => ['type' => self::TYPE_STRING, 'validate' => 'isMessage'],
            'mobile_theme' => ['type' => self::TYPE_BOOL, 'validate' => 'isBool'],
            'total_discounts' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_discounts_tax_incl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_discounts_tax_excl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_paid' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'total_paid_tax_incl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_paid_tax_excl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_paid_real' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'total_products' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'total_products_wt' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice', 'required' => true],
            'total_shipping' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_shipping_tax_incl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_shipping_tax_excl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'carrier_tax_rate' => ['type' => self::TYPE_FLOAT, 'validate' => 'isFloat'],
            'total_wrapping' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_wrapping_tax_incl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'total_wrapping_tax_excl' => ['type' => self::TYPE_FLOAT, 'validate' => 'isPrice'],
            'round_mode' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'round_type' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'shipping_number' => ['type' => self::TYPE_STRING, 'validate' => 'isTrackingNumber'],
            'conversion_rate' => ['type' => self::TYPE_FLOAT, 'validate' => 'isFloat', 'required' => true],
            'invoice_number' => ['type' => self::TYPE_INT],
            'delivery_number' => ['type' => self::TYPE_INT],
            'invoice_date' => ['type' => self::TYPE_DATE],
            'delivery_date' => ['type' => self::TYPE_DATE],
            'valid' => ['type' => self::TYPE_BOOL],
            'reference' => ['type' => self::TYPE_STRING],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'added_to_order' => ['type' => self::TYPE_STRING],
            'desired_delivery_date' => ['type' => self::TYPE_DATE],
        ],
    ];

    public function getProductsDetail()
    {
        // The `od.ecotax` is a newly added at end as ecotax is used in multiples columns but it's the ecotax value we need
        $sql = 'SELECT p.*, ps.*, od.*, pl.*';
        $sql .= ' FROM `%sorder_detail` od';
        $sql .= ' LEFT JOIN `%sproduct` p ON (p.id_product = od.product_id)';
        $sql .= ' LEFT JOIN `%sproduct_shop` ps ON (ps.id_product = p.id_product AND ps.id_shop = od.id_shop)';
        /**
         * Start add relation product language
         */
        $sql .= ' LEFT JOIN `%sproduct_lang` pl ON (pl.id_product = od.product_id)';
        /**
         * End add relation product language
         */
        $sql .= ' WHERE od.`id_order` = %d';
        $sql = sprintf($sql, _DB_PREFIX_, _DB_PREFIX_, _DB_PREFIX_, _DB_PREFIX_, (int) $this->id);

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
    }

    public static function generateReference()
    {
        if (! Module::isEnabled('gmnumeric')) {
            return parent::generateReference();
        }
        $isRandom = Configuration::get('GMNUMERIC_RANDOM');
        $prefix = Configuration::get('GMNUMERIC_PREFIX');
        $prefixLength = strlen($prefix);
        $restLength = 9 - $prefixLength;

        if ($isRandom) {
            $reference = Tools::passwdGen($restLength, 'NO_NUMERIC');
        } else {
            $query = 'SELECT `reference` FROM '._DB_PREFIX_.'orders ORDER BY `id_order` DESC';

            $previousOrderId = Db::getInstance()->getValue($query);

            $prefix = Configuration::get('GMNUMERIC_PREFIX');
            $nextOrderId = (int) str_replace($prefix, '', $previousOrderId) + 1;

            $zeros = Configuration::get('GMNUMERIC_ZEROS');
            if ($zeros == 'on') {
                $reference = sprintf('%0'.$restLength.'d', $nextOrderId);
            } else {
                $reference = $nextOrderId;
            }
        }

        return strtoupper($prefix.$reference);
    }


    /** Set current order status
     * @param int $id_order_state
     * @param int $id_employee (/!\ not optional except for Webservice
     */
    public function setCurrentState($id_order_state, $id_employee = 0)
    {
        if (empty($id_order_state)) {
            return false;
        }
        $history = new OrderHistory();
        $history->id_order = (int) $this->id;
        $history->id_employee = (int) $id_employee;
        $use_existings_payment = !$this->hasInvoice();
        $history->changeIdOrderState((int) $id_order_state, $this, $use_existings_payment);
        $res = Db::getInstance()->getRow('
            SELECT `invoice_number`, `invoice_date`, `delivery_number`, `delivery_date`
            FROM `' . _DB_PREFIX_ . 'orders`
            WHERE `id_order` = ' . (int) $this->id);
        $this->invoice_date = $res['invoice_date'];
        $this->invoice_number = $res['invoice_number'];
        $this->delivery_date = $res['delivery_date'];
        $this->delivery_number = $res['delivery_number'];
        $this->update();

        $history->addWithemail();
    }

    /**
     * Depricated in Order Class
     *
     * @param $id_order
     * @return mixed
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getDiscountRuleFromOrder($id_order){
        $order = new Order($id_order);
        foreach ($order->getCartRules() as $cartRule){
            return $cartRule['value_tax_excl'];
        }
    }
}
