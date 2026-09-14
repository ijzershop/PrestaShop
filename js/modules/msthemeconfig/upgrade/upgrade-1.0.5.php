<?php
/**
 * Module upgrade: 1.0.5
 *
 * Ensures all hooks from installHooks() are registered on existing installs.
 * Run after SSA stock-sync fixes (updateSsaStock, applySsaStockForProduct) were added.
 *
 * CONVENTION: every time a hook is added to or removed from installHooks(), bump the
 * module version and create a new upgrade-x.x.x.php that calls $module->installHooks().
 * PrestaShop's registerHook() is idempotent, so re-running the full list is always safe.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_5(Module $module): bool
{
    return $module->installHooks();
}
