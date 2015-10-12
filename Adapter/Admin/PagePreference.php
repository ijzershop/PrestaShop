<?php
/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2015 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
namespace PrestaShop\PrestaShop\Adapter\Admin;

use PrestaShopCoreAdminBundle\TransitionalBehavior\AdminPagePreferenceInterface;

class PagePreference implements AdminPagePreferenceInterface
{
    /* (non-PHPdoc)
     * @see \PrestaShopCoreAdminBundle\TransitionalBehavior\AdminPagePreferenceInterface::getTemporaryShouldUseLegacyPage()
     */
    public function getTemporaryShouldUseLegacyPage($page)
    {
        if (!$page) {
            throw new \InvalidParameterException('$page parameter missing');
        }

        $legacyCookie = \Context::getContext()->cookie;
        /* @var $legacyCookie \CookieCore */
        return (!empty($legacyCookie->{'should_use_legacy_page_for_'.$page}) && $legacyCookie->{'should_use_legacy_page_for_'.$page} == 1);
    }

    /* (non-PHPdoc)
     * @see \PrestaShopCoreAdminBundle\TransitionalBehavior\AdminPagePreferenceInterface::setTemporaryShouldUseLegacyPage()
     */
    public function setTemporaryShouldUseLegacyPage($page, $useLegacy)
    {
        if (!$page) {
            throw new \InvalidParameterException('$page parameter missing');
        }

        $legacyCookie = \Context::getContext()->cookie;
        /* @var $legacyCookie \CookieCore */
        if ((bool)$useLegacy) {
            $legacyCookie->__set('should_use_legacy_page_for_'.$page, 1);
        } else {
            $legacyCookie->__unset('should_use_legacy_page_for_'.$page);
        }
    }

    /* (non-PHPdoc)
     * @see \PrestaShopCoreAdminBundle\TransitionalBehavior\AdminPagePreferenceInterface::getTemporaryShouldAllowUseLegacyPage()
     */
    public function getTemporaryShouldAllowUseLegacyPage($page = null)
    {
        if (_PS_MODE_DEV_) {
            return true;
        }

        $version = \Db::getInstance()->getValue('SELECT `value` FROM `'._DB_PREFIX_.'configuration` WHERE `name` = "PS_INSTALL_VERSION"');
        if (!$version) {
            return false;
        }
        $installVersion = explode('.', $version);
        $currentVersion = explode('.', _PS_VERSION_);

        switch ($page) {
            case 'product':
                // show only for 1.7.0
                if ($currentVersion[0] != '1' || $currentVersion[1] != '7' || $currentVersion[2] != '0') {
                    return false;
                }
                // show only if upgrade from older version than 1.7
                if ($installVersion[0] != '1' || $installVersion[1] >= '7') {
                    return false;
                }
                // no break; !
            default:
                // show only for 1.7.x
                if ($currentVersion[0] != '1' || $currentVersion[1] != '7') {
                    return false;
                }
                // show only if upgrade from older version than current one
                if ($installVersion[0] >= $currentVersion[0] || $installVersion[1] >= $currentVersion[1]) {
                    return false;
                }
        }

        return true;
    }
}
