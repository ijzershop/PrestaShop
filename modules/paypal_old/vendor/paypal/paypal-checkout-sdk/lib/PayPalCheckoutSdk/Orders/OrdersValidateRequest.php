<?php

// This class was generated on Wed, 01 Aug 2018 16:35:39 PDT by version 0.1.0-dev+0ee05a-dirty of Braintree SDK Generator
// OrdersValidateRequest.php
// @version 0.1.0-dev+0ee05a-dirty
// @type request
// @data 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
// DO NOT EDIT

namespace PayPalCheckoutSdk\Orders;

use PayPalHttp\HttpRequest;

class OrdersValidateRequest extends HttpRequest
{
    function __construct($orderId)
    {
        parent::__construct("/v2/checkout/orders/{order_id}/validate-payment-method?", "POST");

        $this->path = str_replace("{order_id}", urlencode($orderId), $this->path);
        $this->headers["Content-Type"] = "application/json";
    }


    public function payPalClientMetadataId($payPalClientMetadataId)
    {
        $this->headers["PayPal-Client-Metadata-Id"] = $payPalClientMetadataId;
    }
}
