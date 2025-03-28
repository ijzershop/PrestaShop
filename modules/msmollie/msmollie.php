<?php
/**
 * 2023 ModerneSmid
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 *
 * @author    ModerneSmid <info@modernesmid.nl>
 * @copyright 2023 ModerneSmid
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

use PrestaShop\PrestaShop\Core\Payment\PaymentOption;

if (!defined('_PS_VERSION_')) {
    exit;
}

class MSMollie extends PaymentModule
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'msmollie';
        $this->tab = 'payments_gateways';
        $this->version = '1.0.0';
        $this->author = 'ModerneSmid';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = [
            'min' => '1.7.0.0',
            'max' => _PS_VERSION_
        ];
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('ModerneSmid Mollie Payment');
        $this->description = $this->l('Accept payments through Mollie payment gateway.');
        $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
    }
    /**
      * Install the module and register hooks
      */
    public function install()
    {
        if (extension_loaded('curl') == false) {
            $this->_errors[] = $this->l('You have to enable the cURL extension on your server to install this module');
            return false;
        }

        Configuration::updateValue('MSMOLLIE_LIVE_MODE', false);
        Configuration::updateValue('MSMOLLIE_TEST_API_KEY', '');
        Configuration::updateValue('MSMOLLIE_LIVE_API_KEY', '');
        Configuration::updateValue('MSMOLLIE_DEFAULT_STATUS', Configuration::get('PS_OS_PAYMENT'));
        Configuration::updateValue('MSMOLLIE_WAITING_PAYMENT_STATUS', 52);
        Configuration::updateValue('MSMOLLIE_EMAIL', '');

        // Enable all payment methods by default
        $methods = array('ideal', 'creditcard', 'paypal', 'bancontact');
        foreach ($methods as $method) {
            Configuration::updateValue('MSMOLLIE_METHODS_' . strtoupper($method), 1);
        }

        return parent::install() &&
            $this->registerHook('displayHeader') &&
            $this->registerHook('displayBackOfficeHeader') &&
            $this->registerHook('paymentOptions') &&
            $this->registerHook('displayPaymentReturn');
    }

    /**
      * Uninstall the module
      */
    public function uninstall()
    {
        Configuration::deleteByName('MSMOLLIE_LIVE_MODE');
        Configuration::deleteByName('MSMOLLIE_TEST_API_KEY');
        Configuration::deleteByName('MSMOLLIE_LIVE_API_KEY');
        Configuration::deleteByName('MSMOLLIE_DEFAULT_STATUS');
        Configuration::deleteByName('MSMOLLIE_WAITING_PAYMENT_STATUS');
        Configuration::deleteByName('MSMOLLIE_EMAIL');
        // Remove all payment method configurations
        $methods = array('ideal', 'creditcard', 'paypal', 'bancontact');
        foreach ($methods as $method) {
            Configuration::deleteByName('MSMOLLIE_METHODS_' . strtoupper($method));
        }

        return parent::uninstall();
    }
    /**
     * Load the configuration form
     */
    public function getContent()
    {
        if (((bool)Tools::isSubmit('submitMSMollieModule')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output.$this->renderForm();
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitMSMollieModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }
    /**
      * Create the structure of your form.
      */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Settings'),
                    'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Live mode'),
                        'name' => 'MSMOLLIE_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->l('Use this module in live mode'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'col' => 4,
                        'type' => 'text',
                        'prefix' => '<i class="icon icon-key"></i>',
                        'desc' => $this->l('Enter your Mollie TEST API key (starts with test_)'),
                        'name' => 'MSMOLLIE_TEST_API_KEY',
                        'label' => $this->l('Test API Key'),
                    ),
                    array(
                        'col' => 4,
                        'type' => 'text',
                        'prefix' => '<i class="icon icon-key"></i>',
                        'desc' => $this->l('Enter your Mollie LIVE API key (starts with live_)'),
                        'name' => 'MSMOLLIE_LIVE_API_KEY',
                        'label' => $this->l('Live API Key'),
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Default paid order status'),
                        'name' => 'MSMOLLIE_DEFAULT_STATUS',
                        'desc' => $this->l('Default status for successful payments'),
                        'options' => array(
                            'query' => $this->getOrderStatuses(),
                            'id' => 'id_order_state',
                            'name' => 'name'
                        )
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Default waiting on payment order status'),
                        'name' => 'MSMOLLIE_WAITING_PAYMENT_STATUS',
                        'desc' => $this->l('Default status for waiting on payment'),
                        'options' => array(
                            'query' => $this->getOrderStatuses(),
                            'id' => 'id_order_state',
                            'name' => 'name'
                        )
                    ),
                    array(
                        'col' => 4,
                        'type' => 'text',
                        'prefix' => '<i class="icon icon-envelope"></i>',
                        'desc' => $this->l('Email address for notifications'),
                        'name' => 'MSMOLLIE_EMAIL',
                        'label' => $this->l('Notification Email'),
                    ),
                    array(
                        'type' => 'checkbox',
                        'label' => $this->l('Payment methods'),
                        'name' => 'MSMOLLIE_METHODS',
                        'desc' => $this->l('Select which payment methods to enable'),
                        'values' => array(
                            'query' => $this->getPaymentMethods(),
                            'id' => 'id',
                            'name' => 'name'
                        )
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    /**
      * Get available order statuses
      */
    protected function getOrderStatuses()
    {
        $orderStates = OrderState::getOrderStates($this->context->language->id);
        return $orderStates;
    }

    /**
      * Get available payment methods
      */
    protected function getPaymentMethods()
    {
        return array(
            array('id' => 'IDEAL', 'name' => $this->l('iDEAL')),
            array('id' => 'CREDITCARD', 'name' => $this->l('Credit Card')),
            array('id' => 'PAYPAL', 'name' => $this->l('PayPal')),
            array('id' => 'BANCONTACT', 'name' => $this->l('Bancontact')),
        );
    }
    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        $values = array(
            'MSMOLLIE_LIVE_MODE' => Configuration::get('MSMOLLIE_LIVE_MODE', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
            'MSMOLLIE_TEST_API_KEY' => Configuration::get('MSMOLLIE_TEST_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
            'MSMOLLIE_LIVE_API_KEY' => Configuration::get('MSMOLLIE_LIVE_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
            'MSMOLLIE_DEFAULT_STATUS' => Configuration::get('MSMOLLIE_DEFAULT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
            'MSMOLLIE_WAITING_PAYMENT_STATUS' => Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
            'MSMOLLIE_EMAIL' => Configuration::get('MSMOLLIE_EMAIL'),
        );

        // Get payment method configurations
        $methods = array('ideal', 'creditcard', 'paypal', 'bancontact');
        foreach ($methods as $method) {
            $values['MSMOLLIE_METHODS_' . strtoupper($method)] = Configuration::get('MSMOLLIE_METHODS_' . strtoupper($method), $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
        }

        return $values;
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key), false, $this->context->shop->id_shop_group, $this->context->shop->id);
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be loaded in the BO.
     */
    public function hookDisplayBackOfficeHeader()
    {
        if ($this->context->controller->php_self == 'AdminOrders') {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookDisplayHeader()
    {
        $this->context->controller->addJS($this->_path.'views/js/front.js');
        $this->context->controller->addCSS($this->_path.'views/css/front.css');
    }
    /**
      * Return payment options available for PS 1.7+
      *
      * @param array $params Hook parameters
      *
      * @return array|null
      */
    public function hookPaymentOptions($params)
    {
        if (!$this->active) {
            return [];
        }

        // Check if we have an API key configured
        $apiKey = $this->getApiKey();
        if (empty($apiKey)) {
            return [];
        }

        $payment_options = [];

        // Add enabled payment methods
        if (Configuration::get('MSMOLLIE_METHODS_IDEAL', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)) {
            $payment_options[] = $this->getIDealOption();
        }

        if (Configuration::get('MSMOLLIE_METHODS_CREDITCARD', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)) {
            $payment_options[] = $this->getCreditCardOption();
        }

        if (Configuration::get('MSMOLLIE_METHODS_PAYPAL', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)) {
            $payment_options[] = $this->getPayPalOption();
        }

        if (Configuration::get('MSMOLLIE_METHODS_BANCONTACT', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)) {
            $payment_options[] = $this->getBancontactOption();
        }
        return $payment_options;
    }

    /**
      * Get the appropriate API key based on mode
      */
    protected function getApiKey()
    {
        if (Configuration::get('MSMOLLIE_LIVE_MODE', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)) {
            return Configuration::get('MSMOLLIE_LIVE_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
        } else {
            return Configuration::get('MSMOLLIE_TEST_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
        }
    }

    /**
     * @return PaymentOption
     * @throws SmartyException
     */
    protected function getIDealOption()
    {
        $option = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        $option->setCallToActionText($this->l('Ideal'))
              ->setAction($this->context->link->getModuleLink($this->name, 'validation', ['method' => 'ideal'], true))
              ->setAdditionalInformation($this->context->smarty->fetch('module:msmollie/views/templates/hook/ideal_info.tpl'))
              ->setLogo('/modules/'.$this->name.'/views/img/payment_methods/Name=IDEAL, Size=2-Extra-large, Shape=Card.svg');

        return $option;
    }

    /**
     * @return PaymentOption
     */
    protected function getCreditCardOption()
    {
        $option = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        $option->setCallToActionText($this->l('Credit Card'))
              ->setAction($this->context->link->getModuleLink($this->name, 'validation', ['method' => 'creditcard'], true))
            ->setAdditionalInformation($this->context->smarty->fetch('module:msmollie/views/templates/hook/creditcard_info.tpl'))
              ->setLogo('/modules/'. $this->name.'/views/img/payment_methods/Name=Credit card, Size=2-Extra-large, Shape=Card.svg');

        return $option;
    }

    /**
     * @return PaymentOption
     */
    protected function getPayPalOption()
    {
        $option = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        $option->setCallToActionText($this->l('PayPal'))
              ->setAction($this->context->link->getModuleLink($this->name, 'validation', ['method' => 'paypal'], true))
            ->setAdditionalInformation($this->context->smarty->fetch('module:msmollie/views/templates/hook/paypal_info.tpl'))
              ->setLogo('/modules/'.$this->name.'/views/img/payment_methods/Name=PayPal, Size=2-Extra-large, Shape=Card.svg');

        return $option;
    }

    protected function getBancontactOption()
    {
        $option = new PrestaShop\PrestaShop\Core\Payment\PaymentOption();
        $option->setCallToActionText($this->l('Bancontact'))
              ->setAction($this->context->link->getModuleLink($this->name, 'validation', ['method' => 'bancontact'], true))
            ->setAdditionalInformation($this->context->smarty->fetch('module:msmollie/views/templates/hook/bancontact_info.tpl'))
              ->setLogo('/modules/'.$this->name.'/views/img/payment_methods/Name=Bancontact, Size=2-Extra-large, Shape=Card.svg');
        return $option;
    }

    /**
     * Return payment confirmation details
     *
     * @param array $params Hook parameters
     *
     * @return string
     */
    public function hookDisplayPaymentReturn($params)
    {
        if (!$this->active) {
            return '';
        }

        $order = $params['order'];

        if ($order->getCurrentState() == Configuration::get('PS_OS_PAYMENT', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)) {
            $this->smarty->assign([
                'status' => 'ok',
                'id_order' => $order->id,
                'reference' => $order->reference,
            ]);
        } else {
            $this->smarty->assign('status', 'failed');
        }

        return $this->fetch('module:msmollie/views/templates/hook/payment_return.tpl');
    }

    public function getReturnUrl()
    {
        return 'return url';
    }

    public function getWebhookUrl()
    {
        return 'webhook url';
    }

}

