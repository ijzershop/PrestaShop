<?php
/**
 * Class AdminController Overide fixed for 1.7.7.8
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
        /**
         * Start add modernesmid backoffice token validation
         */
        if ($token === $this->token || $token === Configuration::get('MODERNESMIDTHEMECONFIGURATOR_TOKEN')) {
            return true;
        }
        /**
         * End add modernesmid backoffice token validation
         */
        if (count($_POST) || !isset($_GET['controller']) || !Validate::isControllerName($_GET['controller']) || !$token) {
            return false;
        }

        foreach ($_GET as $key => $value) {
            if (is_array($value) || !in_array($key, ['controller', 'controllerUri'])) {
                return false;
            }
        }

        $cookie = Context::getContext()->cookie;
        $whitelist = ['date_add', 'id_lang', 'id_employee', 'email', 'profile', 'passwd', 'remote_addr', 'shopContext', 'collapse_menu', 'checksum'];
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
