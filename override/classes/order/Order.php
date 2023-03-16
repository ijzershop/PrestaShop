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
            'conversion_rate' => ['type' => self::TYPE_FLOAT, 'validate' => 'isFloat', 'required' => true],
            'invoice_number' => ['type' => self::TYPE_INT],
            'delivery_number' => ['type' => self::TYPE_INT],
            'invoice_date' => ['type' => self::TYPE_DATE],
            'delivery_date' => ['type' => self::TYPE_DATE],
            'valid' => ['type' => self::TYPE_BOOL],
            'reference' => ['type' => self::TYPE_STRING],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
            'note' => ['type' => self::TYPE_HTML],
            'added_to_order' => ['type' => self::TYPE_STRING],
            'desired_delivery_date' => ['type' => self::TYPE_DATE],
        ],
    ];

    public function getProductsDetail()
    {
        // The `od.ecotax` is a newly added at end as ecotax is used in multiples columns but it's the ecotax value we need
        $sql = 'SELECT p.*, ps.*, od.*, pl.*, cd.value as customization, cd.technical_image as technical_image';
        $sql .= ' FROM `%sorder_detail` od';
        $sql .= ' LEFT JOIN `%sproduct` p ON (p.id_product = od.product_id)';
        $sql .= ' LEFT JOIN `%sproduct_shop` ps ON (ps.id_product = p.id_product AND ps.id_shop = od.id_shop)';
        $sql .= ' LEFT JOIN `%scustomized_data` cd ON (cd.id_customization = od.id_customization)';
        /**
         * Start add relation product language
         */
        $sql .= ' LEFT JOIN `%sproduct_lang` pl ON (pl.id_product = od.product_id)';
        /**
         * End add relation product language
         */
        $sql .= ' WHERE od.`id_order` = %d';
        $sql = sprintf($sql, _DB_PREFIX_, _DB_PREFIX_, _DB_PREFIX_, _DB_PREFIX_, _DB_PREFIX_, (int) $this->id);

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

    /**
     * @since 1.5.0.4
     *
     * @return OrderState|null null if Order haven't a state
     */
    public function getCurrentOrderState()
    {
        if ($this->current_state && $this->current_state != 0) {
            return new OrderState($this->current_state);
        } elseif ($this->current_state && $this->current_state != 0){
            return new OrderState();
        }

        return null;
    }
    /**
     *
     *
     * Depricated in Order Class
     *
     * @param $id_order
     * @return mixed
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    static public function getDiscountRuleFromOrder($id_order){
        $order = new Order($id_order);
        foreach ($order->getCartRules() as $cartRule){
            return $cartRule['value_tax_excl'];
        }
    }


    /**
     * Get customer orders.
     *
     * @param int $id_customer Customer id
     * @param bool $show_hidden_status Display or not hidden order statuses
     *
     * @return array Customer orders
     */
    public static function getCustomerOrders($id_customer, $show_hidden_status = false, Context $context = null)
    {

        if (!$context) {
            $context = Context::getContext();
        }

        $orderStates = OrderState::getOrderStates((int) $context->language->id, false);
        $indexedOrderStates = [];
        foreach ($orderStates as $orderState) {
            $indexedOrderStates[$orderState['id_order_state']] = $orderState;
        }

        $res = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
        SELECT o.*,
          (SELECT SUM(od.`product_quantity`) FROM `' . _DB_PREFIX_ . 'order_detail` od WHERE od.`id_order` = o.`id_order`) nb_products,
          (SELECT oh.`id_order_state` FROM `' . _DB_PREFIX_ . 'order_history` oh
           LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON (os.`id_order_state` = oh.`id_order_state`)
           WHERE oh.`id_order` = o.`id_order` ' .
            (!$show_hidden_status ? ' AND os.`hidden` != 1' : '') .
            ' ORDER BY oh.`date_add` DESC, oh.`id_order_history` DESC LIMIT 1) id_order_state
        FROM `' . _DB_PREFIX_ . 'orders` o
        WHERE o.`id_customer` = ' . (int) $id_customer .
            Shop::addSqlRestriction(Shop::SHARE_ORDER) . '
        GROUP BY o.`id_order`
        ORDER BY o.`date_add` DESC');

        if (!$res) {
            return [];
        }


        foreach ($res as $key => $val) {
            // In case order creation crashed midway some data might be absent
            $orderState = !empty($val['id_order_state']) ? $indexedOrderStates[$val['id_order_state']] : null;
            //Small fix for orders with empty status code
            if($orderState == null){
                continue;
            }
            //End small fix orders with empty status code
            $res[$key]['order_state'] = $orderState['name'] ?: null;
            $res[$key]['invoice'] = $orderState['invoice'] ?: null;
            $res[$key]['order_state_color'] = $orderState['color'] ?: null;
        }

        return $res;
    }

    /**
     * Return a unique reference like : GWJTHMZUN#2.
     *
     * With multishipping, order reference are the same for all orders made with the same cart
     * in this case this method suffix the order reference by a # and the order number
     *
     * @since 1.5.0.14
     */
    public function getUniqReference($onlyInteger=false)
    {
        $query = new DbQuery();
        $query->select('MIN(id_order) as min, MAX(id_order) as max');
        $query->from('orders');
        $query->where('id_cart = ' . (int) $this->id_cart);

        $order = Db::getInstance()->getRow($query);

        if($onlyInteger){
            $this->reference = preg_filter('/[^\d.\n]|(?<!\d)\./', "", $this->reference);
        }

        if ($order['min'] == $order['max']) {
            return $this->reference;
        } else {
            return $this->reference . '#' . ($this->id + 1 - $order['min']);

        }
    }

    public function getFirstMessageWithId()
    {
        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow('
            SELECT `message`,`id_message`
            FROM `' . _DB_PREFIX_ . 'message`
            WHERE `id_order` = ' . (int) $this->id . '
            ORDER BY `id_message`');
    }
}
