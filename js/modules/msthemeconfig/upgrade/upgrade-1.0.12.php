<?php
/**
 * Module upgrade: 1.0.12
 *
 * Registers the actionEmailSendBefore hook so the module can block the
 * core low-stock alert e-mail ("productoutofstock") that PrestaShop 9
 * sends from src/Core/Stock/StockManager.php. All other functionality
 * (stock tracking, thresholds, movements) is left untouched.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_12(Module $module): bool
{
    return $module->registerHook('actionEmailSendBefore');
}
