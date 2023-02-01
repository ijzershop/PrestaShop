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
use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;

use Ps_Creditpayment\Grid\Column\Type\Common\CustomerGroupsColumn;
use Ps_Creditpayment\Grid\Column\Type\Common\InformerIdentificationColumn;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

use PrestaShop\PrestaShop\Adapter\Entity\Group;

if (!defined('_PS_VERSION_')) {
    exit;
}

class Ps_Creditpayment extends PaymentModule
{
    const FLAG_DISPLAY_PAYMENT_INVITE = 'BANK_CREDIT_PAYMENT_INVITE';

    protected $_html = '';
    protected $_postErrors = array();
    public $extra_mail_vars;

    public function __construct()
    {
        $this->name = 'ps_creditpayment';
        $this->tab = 'payments_gateways';
        $this->version = '2.1.0';
        $this->ps_versions_compliancy = array('min' => '1.7.1.0', 'max' => _PS_VERSION_);
        $this->author = 'JB Stoker';
        $this->controllers = array('payment', 'validation');
        $this->is_eu_compatible = 1;

        $this->currencies = true;
        $this->currencies_mode = 'checkbox';

        $this->bootstrap = true;
        parent::__construct();

        $this->displayName = $this->trans('Credit payment', array(), 'Modules.Creditpayment.Admin');
        $this->description = $this->trans('Accept credit payments by displaying your account details during the checkout and make it easy for your customers to purchase on your store.', array(), 'Modules.Creditpayment.Admin');
        $this->confirmUninstall = $this->trans('Are you sure about removing these details?', array(), 'Modules.Creditpayment.Admin');
    }

    /**
     * Set default medias for this controller
     */
    public function hookDisplayHeader($params)
    {

        $this->context->controller->addCSS(array(
            $this->_path . '/views/css/ps_creditpayment.css',
        ));

        $this->context->controller->addJS(array(
            $this->_path . '/views/js/ps_creditpayment.js',
        ));
    }


    public function install()
    {
        if (!parent::install() ||
            !$this->registerHook('displayHeader') ||
            !$this->registerHook('displayPaymentReturn') ||
            !$this->registerHook('paymentOptions') ||
            !$this->registerHook('actionCustomerGridDefinitionModifier') ||
            !$this->registerHook('actionCustomerGridQueryBuilderModifier') ||
            !$this->addOrderState($this->trans('Credit Payment', array(), 'Modules.Creditpayment.Admin'))) {
            return false;
        }
        return true;
    }

    public function uninstall()
    {
        $languages = Language::getLanguages(false);
        foreach ($languages as $lang) {
            if (!Configuration::deleteByName('BANK_CREDIT_CUSTOM_TEXT', $lang['id_lang'])) {
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
                $order_state->name[$language['id_lang']] = $name;
            $order_state->add();

            $stateId = $order_state->id;
        }
        Configuration::updateValue('PS_OS_BANKCREDIT', (int)$stateId);
        return true;
    }

    protected function _postProcess()
    {
        if (Tools::isSubmit('btnSubmit')) {

            $custom_text = array();
            $languages = Language::getLanguages(false);
            foreach ($languages as $lang) {
                if (Tools::getIsset('BANK_CREDIT_CUSTOM_TEXT_' . $lang['id_lang'])) {
                    $custom_text[$lang['id_lang']] = Tools::getValue('BANK_CREDIT_CUSTOM_TEXT_' . $lang['id_lang']);
                }
            }
            if (Tools::getIsset('BANK_CREDIT_COMPLETE_STATE')) {
                $newState = Tools::getValue('BANK_CREDIT_COMPLETE_STATE');
                Configuration::updateValue('BANK_CREDIT_COMPLETE_STATE', $newState);
            }

            if (Tools::getIsset('CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_CURRENCY_ID')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_CURRENCY_ID');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_CURRENCY_ID', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_VAT_OPTION')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_VAT_OPTION');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_VAT_OPTION', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_TEMPLATE_ID')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_TEMPLATE_ID');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_TEMPLATE_ID', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_LINE_VAT_ID')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_LINE_VAT_ID');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_LINE_VAT_ID', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_LINE_LEDGER_ID')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_LINE_LEDGER_ID');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_LINE_LEDGER_ID', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_SECURITY_CODE')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_SECURITY_CODE');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_SECURITY_CODE', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_API_KEY')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_API_KEY');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_API_KEY', $data);
            }
            if (Tools::getIsset('CREDITPAYMENT_INFORMER_FOOTER_TEXT')) {
                $data = Tools::getValue('CREDITPAYMENT_INFORMER_FOOTER_TEXT');
                Configuration::updateValue('CREDITPAYMENT_INFORMER_FOOTER_TEXT', $data);
            }


        }

        $this->_html .= $this->displayConfirmation($this->trans('Settings updated', array(), 'Admin.Global'));
    }

    public function getContent()
    {
        if (Tools::isSubmit('btnSubmit')) {
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
        $customers = array();
        $creditGroup = new Group(Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_CREDIT_GROUP'), Context::getContext()->language->id, Context::getContext()->shop->id);
        $customersWithGroup = $creditGroup->getCustomers();
        $is_balie_employee = Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') == Context::getContext()->customer->id;
        $add_to_list = false;
        if ($is_balie_employee) {
            $add_to_list = true;
            for ($i = 0; $i <= count($customersWithGroup); $i++) {
                if (isset($customersWithGroup[$i])) {
                    array_push($customers, array('id_customer' => $customersWithGroup[$i]['id_customer'],
                        'company' => $customersWithGroup[$i]['company'],
                        'firstname' => $customersWithGroup[$i]['firstname'],
                        'lastname' => $customersWithGroup[$i]['lastname'],
                        'email' => $customersWithGroup[$i]['email']));
                }
            }
        }
//        else {
//
//            var_export(!Configuration::get('MSTHEMECONFIG_SHOW_ONCREDIT_CUSTOMER'));
//
//
//            for ($i = 0; $i <= count($customersWithGroup); $i++){
//                if(isset($customersWithGroup[$i]) && (int)$customersWithGroup[$i]['id_customer'] == (int)Context::getContext()->customer->id && !Configuration::get('MSTHEMECONFIG_SHOW_ONCREDIT_CUSTOMER')){
//                    array_push($customers, array('id_customer'=> $customerWithGroup[$i]['id_customer'],
//                                         'company'=> $customerWithGroup[$i]['company'],
//                                         'firstname'=> $customerWithGroup[$i]['firstname'],
//                                         'lastname'=> $customerWithGroup[$i]['lastname'],
//                                         'email'=> $customerWithGroup[$i]['email']));
//                }
//
//            }
//        }

        if ($add_to_list) {
            $this->smarty->assign(
                [
                    'customers' => $customers
                ]
            );
            $newOption = new PaymentOption();
            $newOption->setModuleName($this->name)
                ->setCallToActionText($this->trans('Betalen met credit', array(), 'Modules.Creditpayment.Shop'))
                ->setAction($this->context->link->getModuleLink($this->name, 'validation', array(), true))
                ->setLogo(_MODULE_DIR_ . '/ps_creditpayment/ps_creditpayment.png')
                ->setAdditionalInformation($this->fetch('module:ps_creditpayment/views/templates/hook/ps_creditpayment_intro.tpl'));

            $payment_options = [
                $newOption,
            ];
            return $payment_options;
        }
    }

    public function hookDisplayPaymentReturn($params)
    {


        if (!$this->active) {
            return;
        }

        $state = $params['order']->getCurrentState();

        if (
            in_array(
                $state,
                array(
                    Configuration::get('PS_OS_BANKCREDIT'),
                    Configuration::get('PS_OS_OUTOFSTOCK'),
                    Configuration::get('PS_OS_OUTOFSTOCK_UNPAID'),
                )
            )) {
            $totalToPaid = $params['order']->getOrdersTotalPaid() - $params['order']->getTotalPaid();

            $newState = (int)Configuration::get('BANK_CREDIT_COMPLETE_STATE');
            $history = new OrderHistory();
            $history->id_order = (int)$params['order']->id;
            $history->changeIdOrderState($newState, (int)$params['order']->id);
            $history->add();

            $this->context->cookie->supercheckout_temp_address_shipping = null;
            $this->context->cookie->supercheckout_temp_address_invoice = null;
            $this->context->cookie->supercheckout_perm_address_shipping = null;
            $this->context->cookie->supercheckout_perm_address_invoice = null;
            $this->context->cart->id_customer = $this->context->cookie->id_customer;
            $this->context->cart->secure_key = $this->context->cookie->secure_key;
            $this->context->cookie->selected_customer_secure_key = null;
            $this->context->cookie->selected_customer_customer_firstname = null;
            $this->context->cookie->selected_customer_customer_lastname = null;
            $this->context->cookie->selected_customer_id_customer = null;
            $this->context->cookie->selected_customer_email = null;


            $this->smarty->assign(array(
                'shop_name' => $this->context->shop->name,
                'total' => Context::getContext()->currentLocale->formatPrice(
                    $totalToPaid,
                    'EUR'
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

        return $this->fetch('module:ps_creditpayment/views/templates/hook/payment_return.tpl');
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

    private function fetchDataFromInformerApi($url, $type='payment_conditions')
    {
        $curlCard = curl_init();

        $security_code = Configuration::get('CREDITPAYMENT_INFORMER_SECURITY_CODE', null, null, null, "62356");
        $api_key = Configuration::get('CREDITPAYMENT_INFORMER_API_KEY', null, null, null, "MEUGbrj3nT8Z4orUVznSQRMCYFxP6SySePckp0tVfJPrcB1DjO2");

        $headers = array(
            "accept: application/json",
            "Securitycode: " . $security_code,
            "Apikey: " . $api_key,
        );

        curl_setopt_array($curlCard, array(
            CURLOPT_URL => "https://api.informer.eu/v1/" . $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => json_encode([]),
        ));
        $info = curl_getinfo($curlCard);
        $response = curl_exec($curlCard);
        if (!curl_errno($curlCard)) {
            $returnData = json_decode($response);

            $arrayList = [];
            foreach ($returnData->{$type} as $index => $item){
                $arr = [];
                $arr['id'] = $index;

                if(!isset($item->description)){
                    if($type == 'vat'){
                        $arr['name'] = $item->vat_code . ' - ' . $item->name;
                    } else {
                        $arr['name'] = $item->name;
                    }
                } else {
                    $arr['name'] = $item->description;
                }
                $arrayList[] = $arr;
            }
        } else {
            $arrayList = [];
        }
        curl_close($curlCard);

        return $arrayList;
    }


    public function renderForm()
    {
        $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
        $orderStates = OrderState::getOrderStates($lang->id);


        $selectDataPaymentCondition = $this->fetchDataFromInformerApi('payment-conditions/');
        $selectDataCurrency = $this->fetchDataFromInformerApi('currencies/', 'currencies');
        $selectDataTemplate = $this->fetchDataFromInformerApi('templates/','templates');
        $selectDataLineVatId = $this->fetchDataFromInformerApi('vat/','vat');
        $selectDataLineLedgerId = $this->fetchDataFromInformerApi('ledgers/','ledgers');

        $fields_form_customization = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->trans('Customization', array(), 'Modules.Creditpayment.Admin'),
                    'icon' => 'icon-cogs'
                ),
                'input' => array(
                    array(
                        'type' => 'textarea',
                        'label' => $this->trans('Information to the customer', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'BANK_CREDIT_CUSTOM_TEXT',
                        'desc' => $this->trans('Information on the credit transfer', array(), 'Modules.Creditpayment.Admin'),
                        'lang' => true
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->trans('Order state for payment complete', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'BANK_CREDIT_COMPLETE_STATE',
                        'desc' => $this->trans('The state for when payment is complete', array(), 'Modules.Creditpayment.Admin'),
                        'required' => false,
                        'options' => [
                            'query' => $orderStates,
                            'id' => 'id_order_state',
                            'name' => 'name',
                        ]
                    ),
                    array('type' => 'select',
                        'label' => $this->trans('Informer payment condition id', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID',
                        'options' => [
                            'query' => $selectDataPaymentCondition,
                            'id' => 'id',
                            'name' => 'name',
                        ]
                    ),
                    array('type' => 'select',
                        'label' => $this->trans('Informer currency id', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_CURRENCY_ID',
                        'options' => [
                            'query' => $selectDataCurrency,
                            'id' => 'id',
                            'name' => 'name',
                        ]
                    ),
                    array('type' => 'select',
                        'label' => $this->trans('Informer vat option id', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_VAT_OPTION',
                        'options' => [
                            'query' => [
                                ['id' => 'incl', 'name' => 'Inclusief BTW'],
                                ['id' => 'excl', 'name' => 'Exclusief BTW'],
                            ],
                            'id' => 'id',
                            'name' => 'name',
                        ]
                    ),
                    array('type' => 'select',
                        'label' => $this->trans('Informer template id', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_TEMPLATE_ID',
                        'options' => [
                            'query' => $selectDataTemplate,
                            'id' => 'id',
                            'name' => 'name',
                        ]
                    ),
                    array('type' => 'select',
                        'label' => $this->trans('Informer product line vat id', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_LINE_VAT_ID',
                        'options' => [
                            'query' => $selectDataLineVatId,
                            'id' => 'id',
                            'name' => 'name',
                        ]
                    ),
                    array('type' => 'select',
                        'label' => $this->trans('Informer product line ledger id', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_LINE_LEDGER_ID',
                        'options' => [
                            'query' => $selectDataLineLedgerId,
                            'id' => 'id',
                            'name' => 'name',
                        ]
                    ),
                    array('type' => 'text',
                        'label' => $this->trans('Informer security code', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_SECURITY_CODE'),
                    array('type' => 'text',
                        'label' => $this->trans('Informer api key', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_API_KEY'),
                    array('type' => 'text',
                        'label' => $this->trans('Informer footer text', array(), 'Modules.Creditpayment.Admin'),
                        'name' => 'CREDITPAYMENT_INFORMER_FOOTER_TEXT')
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
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ?: 0;
        $helper->id = (int)Tools::getValue('id_carrier');
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'btnSubmit';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false) . '&configure='
            . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
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
                'BANK_CREDIT_CUSTOM_TEXT_' . $lang['id_lang'],
                Configuration::get('BANK_CREDIT_CUSTOM_TEXT', $lang['id_lang'])
            );
        }

        $newState = Tools::getValue('BANK_CREDIT_COMPLETE_STATE', Configuration::get('BANK_CREDIT_COMPLETE_STATE'));
        $creditpayment_informer_payment_condition_id = Tools::getValue('CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID', Configuration::get('CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID'));
        $creditpayment_informer_currency_id = Tools::getValue('CREDITPAYMENT_INFORMER_CURRENCY_ID', Configuration::get('CREDITPAYMENT_INFORMER_CURRENCY_ID'));
        $creditpayment_informer_vat_option = Tools::getValue('CREDITPAYMENT_INFORMER_VAT_OPTION', Configuration::get('CREDITPAYMENT_INFORMER_VAT_OPTION'));
        $creditpayment_informer_template_id = Tools::getValue('CREDITPAYMENT_INFORMER_TEMPLATE_ID', Configuration::get('CREDITPAYMENT_INFORMER_TEMPLATE_ID'));
        $creditpayment_informer_line_vat_id = Tools::getValue('CREDITPAYMENT_INFORMER_LINE_VAT_ID', Configuration::get('CREDITPAYMENT_INFORMER_LINE_VAT_ID'));
        $creditpayment_informer_line_ledger_id = Tools::getValue('CREDITPAYMENT_INFORMER_LINE_LEDGER_ID', Configuration::get('CREDITPAYMENT_INFORMER_LINE_LEDGER_ID'));
        $creditpayment_informer_security_code = Tools::getValue('CREDITPAYMENT_INFORMER_SECURITY_CODE', Configuration::get('CREDITPAYMENT_INFORMER_SECURITY_CODE'));
        $creditpayment_informer_api_key = Tools::getValue('CREDITPAYMENT_INFORMER_API_KEY', Configuration::get('CREDITPAYMENT_INFORMER_API_KEY'));
        $creditpayment_informer_footer_text = Tools::getValue('CREDITPAYMENT_INFORMER_FOOTER_TEXT', Configuration::get('CREDITPAYMENT_INFORMER_FOOTER_TEXT'));

        return array(
            'BANK_CREDIT_CUSTOM_TEXT' => $custom_text,
            'BANK_CREDIT_COMPLETE_STATE' => $newState,
            'CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID' => $creditpayment_informer_payment_condition_id,
            'CREDITPAYMENT_INFORMER_CURRENCY_ID' => $creditpayment_informer_currency_id,
            'CREDITPAYMENT_INFORMER_VAT_OPTION' => $creditpayment_informer_vat_option,
            'CREDITPAYMENT_INFORMER_TEMPLATE_ID' => $creditpayment_informer_template_id,
            'CREDITPAYMENT_INFORMER_LINE_VAT_ID' => $creditpayment_informer_line_vat_id,
            'CREDITPAYMENT_INFORMER_LINE_LEDGER_ID' => $creditpayment_informer_line_ledger_id,
            'CREDITPAYMENT_INFORMER_SECURITY_CODE' => $creditpayment_informer_security_code,
            'CREDITPAYMENT_INFORMER_API_KEY' => $creditpayment_informer_api_key,
            'CREDITPAYMENT_INFORMER_FOOTER_TEXT' => $creditpayment_informer_footer_text,
        );
    }

    public function getTemplateVarInfos()
    {
        $cart = $this->context->cart;
        $total = sprintf(
            $this->trans('%1$s (tax incl.)', array(), 'Modules.Creditpayment.Shop'),
            Context::getContext()->currentLocale->formatPrice($cart->getOrderTotal(true, Cart::BOTH), 'EUR')
        );

        $bankcreditCustomText = Tools::nl2br(Configuration::get('BANK_CREDIT_CUSTOM_TEXT', $this->context->language->id));
        if (false === $bankcreditCustomText) {
            $bankcreditCustomText = '';
        }

        return array(
            'total' => $total,
            'bankcreditCustomText' => $bankcreditCustomText,
        );
    }


    /**
     * Hooks allows to modify Order grid definition.
     * This hook is a right place to add/remove columns or actions (bulk, grid).
     *
     * @param array $params
     */
    public function hookActionCustomerGridDefinitionModifier(array $params)
    {
        /** @var GridDefinitionInterface $definition */
        $definition = $params['definition'];

        /** @var ColumnCollection */
        $columns = $definition->getColumns();
        $columns->remove('social_title');
        $columns->remove('newsletter');
        $columns->remove('optin');
        $columns->remove('date_add');
        $columns->move('active', 7);

        $informerIdColumn = new InformerIdentificationColumn('informer_identification');
        $informerIdColumn->setOptions(['sortable' => false, 'clickable' => false, 'field' => 'informer_identification']);
        $informerIdColumn->setName('Informer Id');
        $columns->addAfter('email', $informerIdColumn);

        $customerGroupColumn = new CustomerGroupsColumn('customer_group');
        $customerGroupColumn->setOptions(['field' => 'customer_group']);
        $customerGroupColumn->setName('Customer Groups');
        $columns->addAfter('email', $customerGroupColumn);

        $filters = $definition->getFilters();

        $informerIDFilter = new Filter('informer_identification', TextType::class);
        $informerIDFilter->setTypeOptions([
            'required' => false,
            'attr' => [
                'placeholder' => $this->trans('Zoek Informer ID', [], 'Admin.Actions'),
            ],
        ]);
        $informerIDFilter->setAssociatedColumn('informer_identification');

        $filters->add($informerIDFilter);


        $groups = Group::getGroups(Context::getContext()->language->getId(), Context::getContext()->shop->id);
        $choices = [];
        foreach ($groups as $group) {
            $choices[$group['name']] = $group['id_group'];
        }

        $customerGroupFilter = new Filter('customer_group', ChoiceType::class);
        $customerGroupFilter->setTypeOptions([
            'choices' => $choices,
            'required' => false,
            'attr' => [
                'multiple' => false,
                'expanded' => false,
                'placeholder' => $this->trans('Zoek groep', [], 'Admin.Actions'),
            ],
        ]);
        $customerGroupFilter->setAssociatedColumn('customer_group');

        $filters->add($customerGroupFilter);

    }


    public function hookActionCustomerGridQueryBuilderModifier(array $params)
    {
        $searchQueryBuilder = $params['search_query_builder'];
        $searchQueryBuilder->addSelect('c.informer_identification as informer_identification');

        $searchQueryBuilder->leftJoin('c', 'ps176_customer_group', 'cg', 'c.id_customer = cg.id_customer');
        $searchQueryBuilder->addSelect('cg.id_group');
        $searchQueryBuilder->leftJoin('cg', 'ps176_group_lang', 'cgl', 'cg.id_group = cgl.id_group');
        $searchQueryBuilder->where('cgl.id_lang = 1');
        $searchQueryBuilder->addSelect('GROUP_CONCAT(DISTINCT cgl.name) as customer_group');
        $searchQueryBuilder->groupBy('c.id_customer');
        $countQueryBuilder = $params['count_query_builder'];
        $countQueryBuilder->addSelect('c.informer_identification as informer_identification');

        $searchCriteria = $params['search_criteria'];

        if ('informer_identification' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('c.`informer_identification`', $searchCriteria->getOrderWay());
        }

        if ('customer_group' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('cgl.`name`', $searchCriteria->getOrderWay());
        }

        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {

            switch ($filterName) {
                case 'id_customer':
                    $searchQueryBuilder->andWhere("`c`.`id_customer` LIKE '%" . $filterValue . "%'");
                    break;
                case 'firstname':
                    $searchQueryBuilder->andWhere("`c`.`firstname` LIKE '%" . $filterValue . "%'");
                    break;
                case 'lastname':
                    $searchQueryBuilder->andWhere("`c`.`lastname` LIKE '%" . $filterValue . "%'");
                    break;
                case 'email':
                    $searchQueryBuilder->andWhere("`c`.`email` LIKE '%" . $filterValue . "%'");
                    break;
                case 'active':
                    $searchQueryBuilder->andWhere("`c`.`active` = '" . $filterValue . "'");
                    break;
                case 'informer_identification':
                    $searchQueryBuilder->andWhere("`c`.`informer_identification` LIKE '%" . $filterValue . "%'");
                    break;
                case 'customer_group':
                    $searchQueryBuilder->andWhere("`cg`.`id_group` IN (" . $filterValue . ")");
                    break;
            }
        }
        return $searchQueryBuilder;

    }
}
