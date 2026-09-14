<?php
/**
 * Module upgrade: 1.0.4
 * Installs new admin tabs: MsAdminAICategories and MsAdminAICms.
 * All existing configuration is preserved — only tabs are added/updated.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_4(Module $module): bool
{
    return $module->installTabs();
}
