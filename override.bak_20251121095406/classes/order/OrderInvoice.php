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
    
    
    
    
    
}
