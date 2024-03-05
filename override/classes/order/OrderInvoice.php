<?php
class OrderInvoice extends OrderInvoiceCore
{
    public $total_refunded_tax_excl;
    public $total_refunded_tax_incl;
    public static $definition = [
        'table' => 'order_invoice',
        'primary' => 'id_order_invoice',
        'fields' => [
            'id_order' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'number' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true],
            'delivery_number' => ['type' => self::TYPE_INT, 'validate' => 'isUnsignedId'],
            'delivery_date' => ['type' => self::TYPE_DATE, 'validate' => 'isDateFormat'],
            'total_discount_tax_excl' => ['type' => self::TYPE_FLOAT],
            'total_discount_tax_incl' => ['type' => self::TYPE_FLOAT],
            'total_paid_tax_excl' => ['type' => self::TYPE_FLOAT],
            'total_paid_tax_incl' => ['type' => self::TYPE_FLOAT],
            'total_refunded_tax_excl' => ['type' => self::TYPE_FLOAT],
            'total_refunded_tax_incl' => ['type' => self::TYPE_FLOAT],
            'total_products' => ['type' => self::TYPE_FLOAT],
            'total_products_wt' => ['type' => self::TYPE_FLOAT],
            'total_shipping_tax_excl' => ['type' => self::TYPE_FLOAT],
            'total_shipping_tax_incl' => ['type' => self::TYPE_FLOAT],
            'shipping_tax_computation_method' => ['type' => self::TYPE_INT],
            'total_wrapping_tax_excl' => ['type' => self::TYPE_FLOAT],
            'total_wrapping_tax_incl' => ['type' => self::TYPE_FLOAT],
            'shop_address' => ['type' => self::TYPE_HTML, 'validate' => 'isCleanHtml', 'size' => 1000],
            'note' => ['type' => self::TYPE_HTML],
            'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate'],
        ],
    ];
    
    
    
    /*
    * module: klcartruleextender
    * date: 2024-03-05 08:40:48
    * version: 1.0.2
    */
    public function getProductTaxesBreakdown($order = null)
    {
        $breakdown = parent::getProductTaxesBreakdown($order);
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
        ) {
            return $breakdown;
        }
        if (count($breakdown)) {
            $free_shipping = false;
            foreach ($this->getOrder()->getCartRules() as $order_cart_rule) {
                if ($order_cart_rule['free_shipping']) {
                    $free_shipping = true;
                    break;
                }
            }
            $total_products_ws_te = $this->total_products + ($free_shipping ? $this->total_shipping_tax_excl : 0);
            if ($this->total_discount_tax_excl > $total_products_ws_te) {
                foreach ($breakdown as &$data) {
                    $data['total_price_tax_excl'] = 0;
                    $data['total_amount'] = 0;
                }
            }
        }
        return $breakdown;
    }
    
    /*
    * module: klcartruleextender
    * date: 2024-03-05 08:40:48
    * version: 1.0.2
    */
    public function getShippingTaxesBreakdown($order)
    {
        $breakdown = parent::getShippingTaxesBreakdown($order);
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
        ) {
            return $breakdown;
        }
        if (count($breakdown)
            && ($order_fees = $moduleClass->getOrderFeesById($this->getOrder()->id))
            && isset($order_fees['include_shipping'])
            && $order_fees['include_shipping']
        ) {
            $discount_remaining_tax_excl = max(0, $this->total_discount_tax_excl - $this->total_products);
            $shipping_tax_excl = min($this->total_shipping_tax_excl, max(0, $this->total_shipping_tax_excl - $discount_remaining_tax_excl));
            foreach ($breakdown as &$data) {
                $data['total_tax_excl'] = $shipping_tax_excl;
                $data['total_amount'] = Tools::ps_round($shipping_tax_excl * $data['rate'] / 100, Context::getContext()->getComputingPrecision(), $this->getOrder()->round_mode);
            }
        }
        return $breakdown;
    }
    
    /*
    * module: klcartruleextender
    * date: 2024-03-05 08:40:48
    * version: 1.0.2
    */
    public function getWrappingTaxesBreakdown()
    {
        $breakdown = parent::getWrappingTaxesBreakdown();
        if (!($moduleClass = Module::getInstanceByName('klcartruleextender'))
            || !($moduleClass instanceof KlCartRuleExtender)
            || !$moduleClass->isEnabledForShopContext()
        ) {
            return $breakdown;
        }
        if (count($breakdown)
            && ($order_fees = $moduleClass->getOrderFeesById($this->getOrder()->id))
            && isset($order_fees['include_wrapping'])
            && $order_fees['include_wrapping']
        ) {
            $include_shipping = isset($order_fees['include_shipping']) && $order_fees['include_shipping'];
            $free_shipping = false;
            foreach ($this->getOrder()->getCartRules() as $order_cart_rule) {
                if ($order_cart_rule['free_shipping']) {
                    $free_shipping = true;
                    break;
                }
            }
            $total_shipping_te = $free_shipping || $include_shipping ? $this->total_shipping_tax_excl : 0;
            $discount_remaining_tax_excl = max(0, $this->total_discount_tax_excl - $this->total_products - $total_shipping_te);
            $wrapping_tax_excl = min($this->total_wrapping_tax_excl, max(0, $this->total_wrapping_tax_excl - $discount_remaining_tax_excl));
            foreach ($breakdown as &$data) {
                $data['total_tax_excl'] = $wrapping_tax_excl;
                $data['total_amount'] = Tools::ps_round($wrapping_tax_excl * $data['rate'] / 100, Context::getContext()->getComputingPrecision(), $this->getOrder()->round_mode);
            }
        }
        return $breakdown;
    }
}
