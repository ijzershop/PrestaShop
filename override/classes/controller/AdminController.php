<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
use PrestaShop\PrestaShop\Core\Feature\TokenInUrls;

class AdminController extends AdminControllerCore
{
    /**
     * Check for security token.
     *
     * @return bool
     */
    public function checkToken()
    {
        if (TokenInUrls::isDisabled() || $this->isAnonymousAllowed()) {
            return true;
        }

        $token = Tools::getValue('token');

        if ($token === $this->token || $token === Configuration::get('MODERNESMIDTHEMECONFIGURATOR_TOKEN')) {
            return true;
        }

        if (count($_POST) || !isset($_GET['controller']) || !Validate::isControllerName($_GET['controller']) || !$token) {
            return false;
        }

        foreach ($_GET as $key => $value) {
            if (is_array($value) || !in_array($key, array('controller', 'controllerUri'))) {
                return false;
            }
        }

        $cookie = Context::getContext()->cookie;
        $whitelist = array(
            'date_add',
            'id_lang',
            'id_employee',
            'email',
            'profile',
            'passwd',
            'remote_addr',
            'shopContext',
            'collapse_menu',
            'checksum'
        );
        foreach ($cookie->getAll() as $key => $value) {
            if (!in_array($key, $whitelist)) {
                unset($cookie->$key);
            }
        }

        $cookie->write();

        return true;
    }
}

?>
