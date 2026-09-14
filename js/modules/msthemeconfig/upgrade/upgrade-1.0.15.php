<?php
/**
 * Module upgrade 1.0.15: send one GA4 refund per newly created credit note.
 * Creates an empty analytics register; never replays or changes existing credit notes.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_15(Module $module): bool
{
    return $module->installGa4RefundDispatchTable()
        && $module->registerHook('actionOrderSlipAdd');
}
