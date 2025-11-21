<?php
/**
 * Class AdminController Overide fixed for 1.7.7.8
 */
use PrestaShop\PrestaShop\Core\Feature\TokenInUrls;

class AdminController extends AdminControllerCore
{

    /** @var array Number of results in list per page (used in select field) */
    protected $_pagination = [20, 50, 100, 250, 500, 750, 1000, 1250, 1500];


    public function getTemplateViewVars()
    {
        $this->setClasses();
        $this->setPlugins();
        return $this->tpl_view_vars;
    }

    public function setClasses(){
        $this->context->smarty->registerClass('Context', 'Context');
        $this->context->smarty->registerClass('Configuration', 'Configuration');
        $this->context->smarty->registerClass('Tools', 'Tools');
        $this->context->smarty->registerClass('Cart', 'Cart');
        $this->context->smarty->registerClass('Product', 'Product');
        $this->context->smarty->registerClass('Order', 'Order');
        $this->context->smarty->registerClass('Category', 'Category');
        $this->context->smarty->registerClass('AttributeGroup', 'AttributeGroup');
        $this->context->smarty->registerClass('Address', 'Address');
        $this->context->smarty->registerClass('Module', 'Module');
        $this->context->smarty->registerClass('ShopGroup', 'ShopGroup');
        $this->context->smarty->registerClass('Shop', 'Shop');
    }

    public function setPlugins(){
        $this->context->smarty->loadPlugin('unserialize', true);
        $this->context->smarty->loadPlugin('serialize', true);
        $this->context->smarty->loadPlugin('number_format', true);
        $this->context->smarty->loadPlugin('basename', true);
        $this->context->smarty->loadPlugin('is_object', true);
    }

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
        if ($token === $this->token || $token === Configuration::get('MSTHEMECONFIG_TOKEN')) {
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
