<?php
/**
 * Module upgrade: 1.0.14
 *
 * Adds a marketing-consent snapshot and consent-gated Google Ads, Meta and Microsoft Ads
 * attribution identifiers to carts and orders. The cart carries the values through redirect
 * payments so a server-side order creation can retain the browser attribution context.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_14(Module $module): bool
{
    return $module->installAdAttributionColumns();
}
