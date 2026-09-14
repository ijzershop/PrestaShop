<?php
/**
 * Module upgrade: 1.0.8
 *
 * Adds the GA4 identifier columns to the cart table:
 * - cart.ga_client_id
 * - cart.ga_session_id
 * - cart.ga_analytics_consent
 *
 * These let the cart carry the GA4 client_id/session_id across a redirect payment
 * (iDEAL, Bancontact, PayPal, creditcard). Mollie's webhook creates the order
 * server-to-server with an empty $_COOKIE, so actionObjectOrderAddAfter could never
 * capture the identifiers for those flows and every such purchase reached GA4 without
 * attribution. installGaCartColumns() is idempotent and also runs during install().
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_8(Module $module): bool
{
    return $module->installGaCartColumns();
}
