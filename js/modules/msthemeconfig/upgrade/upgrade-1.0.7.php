<?php
/**
 * Module upgrade: 1.0.7
 *
 * Registers the new hook:
 * - actionOrderSlipAdd (Handles return cost deduction from credit slips)
 *
 * CONVENTION: every time a hook is added to or removed from installHooks(), bump the
 * module version and create a new upgrade-x.x.x.php that calls $module->installHooks().
 * PrestaShop's registerHook() is idempotent, so re-running the full list is always safe.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_7(Module $module): bool
{
    return $module->installHooks();
}
