<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_18(Module $module): bool
{
    return \MsThemeConfig\Plasma\PlasmaInstaller::install($module);
}
