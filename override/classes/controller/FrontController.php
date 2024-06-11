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
    /*
    * module: wkwebp
    * date: 2024-04-04 08:26:51
    * version: 4.1.2
    */
    public function getTemplateVarShop()
    {
        $shop = parent::getTemplateVarShop();
        if (Module::isEnabled('wkwebp')
            && Configuration::get('WK_WEBP_ENABLE_MODULE')
            && Configuration::get('WK_WEBP_SHOW_SHOP_LOGO')) {
            $shop['logo'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
            'modules/wkwebp/views/img/store/logo.webp';
            if (isset($shop['logo_details'])) {
                $shop['logo_details']['src'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                'modules/wkwebp/views/img/store/logo.webp';
            }
        }
        return $shop;
    }
}
