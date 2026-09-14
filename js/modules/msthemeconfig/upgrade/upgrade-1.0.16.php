<?php
/** Module upgrade 1.0.16: guest registration validation and conversion emails. */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_16(Module $module): bool
{
    return $module->registerHook('actionSubmitAccountBefore')
        && $module->registerHook('actionEmailAddAfterContent');
}
