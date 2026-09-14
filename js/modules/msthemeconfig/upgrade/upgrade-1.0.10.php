<?php
/**
 * Module upgrade: 1.0.10
 *
 * Adds stable, consent-independent order classifications used by Analytics and BigQuery:
 * - orders.analytics_order_channel: online, counter or backoffice
 * - orders.analytics_is_test: selected front-office test account
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_10(Module $module): bool
{
    return $module->installAnalyticsOrderClassificationColumns();
}
