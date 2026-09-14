<?php
if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * Legacy proxy controller for MsThemeConfig module.
 * It ensures the legacy router can find the controller and redirects
 * to the standard AdminModules configure page for this module.
 */
class MsAdminThemeConfController extends ModuleAdminController
{
    public function initContent()
    {
        $moduleName = 'msthemeconfig';

        // Prefer robust link building through PrestaShop Link helper
        if (isset($this->context) && $this->context->link) {
            $url = $this->context->link->getAdminLink('AdminModules', true, [], [
                'configure'   => $moduleName,
                'module_name' => $moduleName,
            ]);
            Tools::redirectAdmin($url);
            return;
        }

        // Fallback legacy URL
        $fallback = 'index.php?controller=AdminModules&configure=' . urlencode($moduleName) . '&module_name=' . urlencode($moduleName);
        Tools::redirectAdmin($fallback);
    }
}
