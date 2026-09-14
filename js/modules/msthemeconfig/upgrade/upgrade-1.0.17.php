<?php
/** Module upgrade 1.0.17: manually selected complementary category connections. */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_17(Module $module): bool
{
    return $module->installCategoryRelations()
        && $module->registerHook('actionCategoryFormBuilderModifier')
        && $module->registerHook('actionRootCategoryFormBuilderModifier')
        && $module->registerHook('actionAfterCreateCategoryFormHandler')
        && $module->registerHook('actionAfterUpdateCategoryFormHandler')
        && $module->registerHook('actionAfterCreateRootCategoryFormHandler')
        && $module->registerHook('actionAfterUpdateRootCategoryFormHandler')
        && $module->registerHook('actionAdminControllerSetMedia');
}
