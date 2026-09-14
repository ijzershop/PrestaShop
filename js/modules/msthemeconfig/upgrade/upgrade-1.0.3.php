<?php
/**
 * Module upgrade: 1.0.3
 * Registers sendMailAlterTemplateVars hook so tracking URLs are populated
 * in ready_for_shipping and shipped mail templates.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_3(Module $module): bool
{
    return $module->registerHook('sendMailAlterTemplateVars');
}
