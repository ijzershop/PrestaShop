<?php

namespace _PhpScoper5eddef0da618a;

/*
 * List shipment for an order using the Mollie API.
 */
try {
    /*
     * Initialize the Mollie API library with your API key or OAuth access token.
     */
    require "../initialize.php";
    /*
     * Listing shipments for the order with ID "ord_8wmqcHMN4U".
     *
     * See: https://docs.mollie.com/reference/v2/shipments-api/get-shipment
     */
    $order = $mollie->orders->get('ord_8wmqcHMN4U');
    $shipments = $order->shipments();
    echo 'Shipments for order with ID ' . $order->id . ':';
    foreach ($shipments as $shipment) {
        echo 'Shipment ' . $shipment->id . '. Items:';
        foreach ($shipment->lines as $line) {
            echo $line->name . ' - status: <b>' . $line->status . '</b>.';
        }
    }
} catch (\_PhpScoper5eddef0da618a\Mollie\Api\Exceptions\ApiException $e) {
    echo "API call failed: " . \htmlspecialchars($e->getMessage());
}
