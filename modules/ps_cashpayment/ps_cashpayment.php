<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

use PrestaShop\PrestaShop\Core\Payment\PaymentOption;

if (!defined('_PS_VERSION_')) {
    exit;
}

class Ps_Cashpayment extends PaymentModule
{
    const FLAG_DISPLAY_PAYMENT_INVITE = 'BANK_CASH_PAYMENT_INVITE';

    protected $_html = '';
    protected $_postErrors = array();

    public $details;
    public $owner;
    public $address;
    public $extra_mail_vars;

    public function __construct()
    {
        $this->name = 'ps_cashpayment';
        $this->tab = 'payments_gateways';
        $this->version = '2.1.0';
        $this->ps_versions_compliancy = array('min' => '1.7.1.0', 'max' => _PS_VERSION_);
        $this->author = 'PrestaShop';
        $this->controllers = array('payment', 'validation');
        $this->is_eu_compatible = 1;

        $this->currencies = true;
        $this->currencies_mode = 'checkbox';

        $this->bootstrap = true;
        parent::__construct();

        $this->displayName = $this->trans('Cash payment', array(), 'Modules.Cashpayment.Admin');
        $this->description = $this->trans('Accept cash payments by displaying your account details during the checkout and make it easy for your customers to purchase on your store.', array(), 'Modules.Cashpayment.Admin');
        $this->confirmUninstall = $this->trans('Are you sure about removing these details?', array(), 'Modules.Cashpayment.Admin');
        if (!isset($this->owner) || !isset($this->details) || !isset($this->address)) {
            $this->warning = $this->trans('Account owner and account details must be configured before using this module.', array(), 'Modules.Cashpayment.Admin');
        }
        if (!count(Currency::checkPaymentCurrencies($this->id))) {
            $this->warning = $this->trans('No currency has been set for this module.', array(), 'Modules.Cashpayment.Admin');
        }
    }

    public function install()
    {
        if (!parent::install() || !$this->registerHook('paymentReturn') || !$this->registerHook('paymentOptions') || !$this->addOrderState($this->trans('Cash Payment',  array(), 'Modules.Cashpayment.Admin'))) {
            return false;
        }
        return true;
    }

    public function uninstall()
    {
        $languages = Language::getLanguages(false);
        foreach ($languages as $lang) {
            if (!Configuration::deleteByName('BANK_CASH_CUSTOM_TEXT', $lang['id_lang'])) {
                return false;
            }
        }

        if (!parent::uninstall()) {
            return false;
        }
        return true;
    }


public function addOrderState($name)
    {
        $state_exist = false;
        $states = OrderState::getOrderStates((int)$this->context->language->id);
        $stateId = null;
        foreach ($states as $state) {
            if (in_array($name, $state)) {
                $state_exist = true;
                $stateId = $state['id_order_state'];
                break;
            }
        }

        if (!$state_exist) {
            // create new order state
            $order_state = new OrderState();
            $order_state->color = '#0000FF';
            $order_state->send_email = false;
            $order_state->paid = true;
            $order_state->shipped = true;
            $order_state->module_name = $this->name;
            $order_state->template = '';
            $order_state->name = array();
            $languages = Language::getLanguages(false);
            foreach ($languages as $language)
                $order_state->name[ $language['id_lang'] ] = $name;
            $order_state->add();

            $stateId = $order_state->id;
        }
        Configuration::updateValue('PS_OS_BANKCASH', (int)$stateId);
        return true;
    }

    protected function _postProcess()
    {
        if (Tools::isSubmit('btnSubmit')) {

            $custom_text = array();
            $languages = Language::getLanguages(false);
            foreach ($languages as $lang) {
                if (Tools::getIsset('BANK_CASH_CUSTOM_TEXT_'.$lang['id_lang'])) {
                    $custom_text[$lang['id_lang']] = Tools::getValue('BANK_CASH_CUSTOM_TEXT_'.$lang['id_lang']);
                }
            }
        }
        $this->_html .= $this->displayConfirmation($this->trans('Settings updated', array(), 'Admin.Global'));
    }

    public function getContent()
    {
        if (Tools::isSubmit('btnSubmit')){
            if (!count($this->_postErrors)) {
                $this->_postProcess();
            } else {
                foreach ($this->_postErrors as $err) {
                    $this->_html .= $this->displayError($err);
                }
            }
        } else {
            $this->_html .= '<br />';
        }

        $this->_html .= $this->renderForm();

        return $this->_html;
    }

    public function hookPaymentOptions($params)
    {
        if (!$this->active) {
            return [];
        }

        if (!$this->checkCurrency($params['cart'])) {
            return [];
        }

        $this->smarty->assign(
            $this->getTemplateVarInfos()
        );


        $newOption = new PaymentOption();
        $newOption->setModuleName($this->name)
                ->setCallToActionText($this->trans('Contant betalen', array(), 'Modules.Cashpayment.Shop'))
                ->setAction($this->context->link->getModuleLink($this->name, 'validation', array(), true))
                ->setLogo(_MODULE_DIR_ .'/ps_cashpayment/ps_cashpayment.png')
                ->setAdditionalInformation($this->fetch('module:ps_cashpayment/views/templates/hook/ps_cashpayment_intro.tpl'));
        $payment_options = [
            $newOption,
        ];
        return $payment_options;
    }

    public function hookPaymentReturn($params)
    {
        if (!$this->active || !Configuration::get(self::FLAG_DISPLAY_PAYMENT_INVITE)) {
            return;
        }

        $state = $params['order']->getCurrentState();
        if (
            in_array(
                $state,
                array(
                    Configuration::get('PS_OS_BANKCASH'),
                    Configuration::get('PS_OS_OUTOFSTOCK'),
                    Configuration::get('PS_OS_OUTOFSTOCK_UNPAID'),
                )
        )) {
            $totalToPaid = $params['order']->getOrdersTotalPaid() - $params['order']->getTotalPaid();
            $this->smarty->assign(array(
                'shop_name' => $this->context->shop->name,
                'total' => Tools::displayPrice(
                    $totalToPaid,
                    new Currency($params['order']->id_currency),
                    false
                ),
                'status' => 'ok',
                'reference' => $params['order']->reference,
                'contact_url' => $this->context->link->getPageLink('contact', true)
            ));
        } else {
            $this->smarty->assign(
                array(
                    'status' => 'failed',
                    'contact_url' => $this->context->link->getPageLink('contact', true),
                )
            );
        }

        return $this->fetch('module:ps_cashpayment/views/templates/hook/payment_return.tpl');
    }

    public function checkCurrency($cart)
    {
        $currency_order = new Currency($cart->id_currency);
        $currencies_module = $this->getCurrency($cart->id_currency);

        if (is_array($currencies_module)) {
            foreach ($currencies_module as $currency_module) {
                if ($currency_order->id == $currency_module['id_currency']) {
                    return true;
                }
            }
        }
        return false;
    }

    public function renderForm()
    {
        $fields_form_customization = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->trans('Customization', array(), 'Modules.Cashpayment.Admin'),
                    'icon' => 'icon-cogs'
                ),
                'input' => array(
                    array(
                        'type' => 'textarea',
                        'label' => $this->trans('Information to the customer', array(), 'Modules.Cashpayment.Admin'),
                        'name' => 'BANK_CASH_CUSTOM_TEXT',
                        'desc' => $this->trans('Information on the cash transfer', array(), 'Modules.Cashpayment.Admin'),
                        'lang' => true
                    ),
                ),
                'submit' => array(
                    'title' => $this->trans('Save', array(), 'Admin.Actions'),
                )
            ),
        );

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? : 0;
        $helper->id = (int)Tools::getValue('id_carrier');
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'btnSubmit';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false).'&configure='
            .$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id
        );

        return $helper->generateForm(array($fields_form_customization));
    }

    public function getConfigFieldsValues()
    {
        $custom_text = array();
        $languages = Language::getLanguages(false);
        foreach ($languages as $lang) {
            $custom_text[$lang['id_lang']] = Tools::getValue(
                'BANK_CASH_CUSTOM_TEXT_'.$lang['id_lang'],
                Configuration::get('BANK_CASH_CUSTOM_TEXT', $lang['id_lang'])
            );
        }

        return array(
            'BANK_CASH_CUSTOM_TEXT' => $custom_text
        );
    }

    public function getTemplateVarInfos()
    {
        $cart = $this->context->cart;
        $total = sprintf(
            $this->trans('%1$s (tax incl.)', array(), 'Modules.Cashpayment.Shop'),
            Tools::displayPrice($cart->getOrderTotal(true, Cart::BOTH))
        );

        $bankcashCustomText = Tools::nl2br(Configuration::get('BANK_CASH_CUSTOM_TEXT', $this->context->language->id));
        if (false === $bankcashCustomText) {
            $bankcashCustomText = '';
        }

        return array(
            'total' => $total,
            'bankcashCustomText' => $bankcashCustomText,
        );
    }
}
