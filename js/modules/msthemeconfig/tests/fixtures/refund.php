<?php
// Credit-note 17's amounts, with a synthetic GA identity. No customer/payment data.
return [
    'order' => [
        'id_order' => 175030, 'id_shop' => 1, 'id_cart' => 123,
        'reference' => 'YS-175030', 'ga_analytics_consent' => 1,
        'ga_client_id' => '1234567890.1788340000', 'ga_session_id' => '1788347587',
        'psp_transaction_id' => 'must-not-be-used',
    ],
    'slip' => [
        'id_order_slip' => 17, 'id_order' => 175030, 'date_add' => '2026-09-02 14:13:07',
        'partial' => 0, 'order_slip_type' => 0, 'amount' => 62.388,
        'total_products_tax_excl' => 51.56, 'total_products_tax_incl' => 62.388,
        'total_shipping_tax_excl' => 0, 'total_shipping_tax_incl' => 0,
    ],
    'lines' => [[
        'id_order_slip' => 17, 'id_order_detail' => 8884, 'id_order' => 175030,
        'product_id' => 988, 'product_name' => 'Test product', 'product_quantity' => 2,
        'amount_tax_excl' => 51.56, 'amount_tax_incl' => 62.39,
    ]],
    'currency' => 'EUR', 'currency_precision' => 2, 'timestamp' => 1788351187,
    'endpoint' => 'https://sst.example.test/mp/collect', 'first_party' => true,
    'measurement_id' => 'G-REFUNDTEST', 'api_secret' => 'synthetic-test-secret',
    'metadata' => [
        'session_type' => 'customer', 'order_channel' => 'online',
        'shop_name' => 'Test shop', 'shop_domain' => 'example.test',
        'page_location' => 'https://example.test/',
        'shipping_tier' => 'Test carrier', 'payment_type' => 'Test payment',
    ],
];
