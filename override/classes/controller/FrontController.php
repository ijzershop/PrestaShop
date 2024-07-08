<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
class FrontController extends FrontControllerCore
{
    public function getTemplateVarShop()
    {
        $shop = parent::getTemplateVarShop();
        if (Module::isEnabled('wkwebp')
            && Configuration::get('WK_WEBP_ENABLE_MODULE')
            && Configuration::get('WK_WEBP_SHOW_SHOP_LOGO')) {
                $filename = Configuration::get('PS_LOGO', (int)Context::getContext()->language->id, (int)Context::getContext()->shop->id_shop_group, (int)Context::getContext()->shop->id);
                $lastDotPosition = strrpos(Configuration::get('PS_LOGO', (int)Context::getContext()->language->id, (int)Context::getContext()->shop->id_shop_group, (int)Context::getContext()->shop->id), '.');
                if ($lastDotPosition !== false) {
                    $filename = substr($filename, 0, $lastDotPosition);
                }
            $shop['logo'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
            'modules/wkwebp/views/img/store/'.$filename.'.webp';
            if (isset($shop['logo_details'])) {
                $shop['logo_details']['src'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                'modules/wkwebp/views/img/store/'.$filename.'.webp';
            }
        }
        return $shop;
    }
}
