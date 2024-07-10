<?php
/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersVAT.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersExemption.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersOrders.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersCart.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/ValidationEngine.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/AdvancedVatManagerOC.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/APILicense.php');

use advancedvatmanager\license; 

// Amount Limits in Brexit and VOEC operations
define('AVM_NOK_PRODUCT_LIMIT', 3000);
define('AVM_NOK_YEAR_LIMIT', 50000);
define('AVM_EU_YEAR_LIMIT', 10000);
define('AVM_BREXIT_LIMIT', 135);

class AdvancedVatManager extends Module
{
    protected $config_form = false;
    private $output;
    public $multistoreCompatibility;
    public $controller_msg;
    public $opc_presteamshop_enabled;
    public static $prestashopAddons = 1;
    public static $lw_reference = 'LWMOD_AVM';

    /**
     * AdvancedVatManager::__construct()
     * 
     * @return
     */
    public function __construct()
    {
        $this->name = 'advancedvatmanager';
        $this->tab = 'checkout';
        $this->version = '1.7.0';
        $this->author = 'Liewebs';
        $this->module_key = 'a0ec580e4f441fe99e13f86d087bf8a7';
        $this->controllers = array(
            'AdvancedVatManagerParent',
            'AdminCustomersVatManager',
            'AdminCustomersExemptionManager',
            'AdminCustomersOrdersManager',
            'AdminCheckVAT',
            'AdminAVMSettings'
        );
        $this->tax_manager_class = 'AdvancedVatManagerTaxManager';
        $this->bootstrap = true;
        
        //Admin Tab translations
        $this->l('Advanced VAT Manager');
        $this->l('Customer VAT Number Management');
        $this->l('Customer VAT Exemption Management');
        $this->l('Orders Management');
        $this->l('VAT Check Tool');
        $this->l('Settings');
        
        // For order state translations
        $this->l('VAT number pending validation');
        $this->l('VAT number validated');
        
        
        parent::__construct();

        $this->displayName = $this->l('Advanced VAT Manager');
        $this->description = $this->l('Check the validity of the VAT numbers of the customers who register in the store. Manage customers with VAT numbers and associate them with customer groups automatically. Remove taxes in product prices, manage Brexit taxes policy and many more options.');

        $this->confirmUninstall = $this->l('Are you sure you want to uninstall the module?');

        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
        
        // Multistore feature from 1.7.8 version
        if (version_compare(_PS_VERSION_, '1.7.8.0', '>=')) {
            $this->multistoreCompatibility = self::MULTISTORE_COMPATIBILITY_YES;
        } 
        $this->controller_msg = array(
            'COMPANY_VALIDATION_COMMENT' => $this->l('The company name must match the one registered in the Official systems system in case of inserting a VAT number.'),
            'COMPANY_DISPLAY_COMMENT' => $this->l('If you fill in this field, the VAT field will be displayed.'),
            'COMPANY_EMPTY' => $this->l('The company name is empty and is required to validate the company together with the registered VAT number.'),
            'COMPANY_EMPTY_WITH_ALIAS' => $this->l('The address with alias [%s] has the company name empty and is required to validate the company together with the registered VAT number.'),
            'COMPANY_INVALID_WITH_NAME' => $this->l('The %s is invalid and it is not registered in Official systems for the VAT number selected. Please edit address inserting a valid VAT number a save again.'),
            'COMPANY_INVALID' => $this->l('The company name of this address is not valid.'),
            'COMPANY_INVALID_REQUIRED' => $this->l('The company name of this address is not valid and it is required.'),
            'COMPANY_ADDRESS_INVALID_REQUIRED' => $this->l('The company address is not valid and it is required.'),
            'COMPANY_INVALID_WITH_ALIAS' => $this->l('The address with alias [%s] has the company name [%s] invalid.'),
            'COMPANY_ADDRESS_INVALID_WITH_ALIAS' => $this->l('The address with alias [%s] has the company address invalid.'),
            'COMPANY_NOT_VALIDATED_REQUIRED_WITH_ALIAS' => $this->l('The address with alias [%s] has the company name %s which has not been validated yet and it is required. Please edit address inserting a valid company name registered in Official systems for the VAT number selected a save again.'),
            'COMPANY_ADDRESS_NOT_VALIDATED_REQUIRED_WITH_ALIAS' => $this->l('The address with alias [%s] has the company address which has not been validated yet and it is required. Please edit address inserting a valid company address registered in Official systems for the VAT number selected a save again.'),
            'COMPANY_NOT_VALIDATED_REQUIRED_WITH_NAME' => $this->l('The %s with name %s has not been validated yet and it is required. Please edit address inserting a valid company name registered in Official systems for the VAT number selected a save again.'),  
            'COMPANY_NOT_VALIDATED_REQUIRED' => $this->l('The company name of this address has not been validated yet. Please insert company name and save again the address form.'), 
            'COMPANY_ADDRESS_NOT_VALIDATED_REQUIRED' => $this->l('The company address has not been validated yet. Please insert a valid address and save again the address form.'),
            'VAT_NOT_VALID_REQUIRED_WITH_NUMBER' => $this->l('The %s %s is not valid and it is required. Please insert a valid VAT number.'),
            'VAT_NOT_VALID_OPTIONAL_WITH_NUMBER' => $this->l('The %s %s is not valid. Please insert a valid VAT number if you want to be tax exempt.'),
            'VAT_NOT_VALID_OPTIONAL' => $this->l('The VAT number of this address is not valid. If you want to be tax exempt, you should insert a valid VAT number.'),
            'VAT_NOT_VALID_REQUIRED' => $this->l('The VAT number of this address is not valid and It is required. Please edit address inserting a valid VAT number a save again.'),
            'VAT_NOT_VALID_WITH_ALIAS' => $this->l('The address with alias [%s] has not valid VAT number.'),
            'VAT_NOT_VALID_OPTIONAL_WITH_ALIAS' => $this->l('The address with alias [%s] has not valid VAT number. If you want to be tax exempt, you should insert a valid VAT number.'),
            'VAT_NOT_VALID_REQUIRED_WITH_ALIAS' => $this->l('The address with alias [%s] has not valid VAT number and it is required.'),
            'VAT_NOT_VALIDATED_REQUIRED_WITH_NUMBER' => $this->l('The %s with number %s has not been validated yet and it is required. Please edit address inserting a valid VAT number a save again.'),
            'VAT_NOT_VALIDATED_REQUIRED' => $this->l('You should validate the VAT number of this address, please insert VAT number and save again.'),
            'VAT_NOT_VALIDATED_OPTIONAL' => $this->l('The VAT number of this address has not been validated yet, please insert VAT number and save again if you want to be tax exempt.'),
            'VAT_NOT_VALIDATED_OPTIONAL_WITH_ALIAS' => $this->l('The address with alias [%s] has a VAT number inserted without has been validated yet. You should save address form again to validate it and get tax exempt.'),
            'VAT_NOT_VALIDATED_REQUIRED_WITH_ALIAS' => $this->l('The address with alias [%s] has to be validated with a valid VAT number.'),    
            'VAT_EMPTY_REQUIRED' => $this->l('The VAT number is empty and is required to validate the address.'),
            'VAT_EMPTY_OPTIONAL' => $this->l('The VAT number is empty. If you want to be tax exempt, you should insert a valid VAT number.'),
            'VAT_EMPTY_OPTIONAL_WITH_ALIAS' => $this->l('The address with alias [%s] has empty the VAT number. If you want to be tax exempt, you should insert a valid VAT number.'),
            'VAT_EMPTY_REQUIRED_WITH_ALIAS' => $this->l('The address with alias [%s] has empty the VAT number and is required to validate the address.'),
            'SYSTEM_FAILS' => $this->l('The VAT number is pending to be validated because the API system failed at the time of registration of this address and could not be validated correctly. Please, save the data of the address again to proceed to the validation of the VAT number again.'),
            'SYSTEM_FAILS_WITH_ALIAS' => $this->l('The address with alias [%s] has the VAT number [%s] pending to be validated because the API system failed at the time of registration of this address and could not be validated correctly. Please go to the mentioned address and save the data of this address again to proceed to the validation of the VAT number again.'),
            'NOT_ALLOW_NONVOEC_PRODUCT_ADDTOCART_ALL' => sprintf($this->l('This product cannot be added to the cart because the store does not allow the purchase of products that are not under the VOEC regulation for customers residing in Norway.')),
            'NOT_ALLOW_NONVOEC_PRODUCT_ADDTOCART_CONSUMER' => sprintf($this->l('This product cannot be added to the cart because the store does not allow the purchase of products that are not under the VOEC regulation for consumers residing in Norway.')),
            'NOT_ALLOW_NONVOEC_PRODUCT_ADDTOCART_COMPANY' => sprintf($this->l('This product cannot be added to the cart because the store does not allow the purchase of products that are not under the VOEC regulation for companies residing in Norway.')),
        );
              
        // Check if the module OPC by Presteamshop is enabled and interface V5 activated.
        $this->opc_presteamshop_enabled = Module::isEnabled('onepagecheckoutps') && method_exists(Module::getInstanceByName('onepagecheckoutps'), 'isCheckoutBetaEnabled') && Module::getInstanceByName('onepagecheckoutps')->isCheckoutBetaEnabled() && (Configuration::get('OPC_ENABLE_DEBUG_NEW_CHECKOUT') == 0 || Configuration::get('OPC_ENABLE_DEBUG_NEW_CHECKOUT') == 1 && in_array(Tools::getRemoteAddr(), explode(',', Configuration::get('OPC_IP_CHECKOUT_BETA'))));
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        if (Shop::isFeatureActive()) {
            Shop::setContext(Shop::CONTEXT_ALL);
        }
        //Check module validation
        if (!Validate::isModuleName('advancedvatmanager')) {
            return false;
        }
        
        //Check module VAT Number is enabled to disable it
        if (Module::isEnabled('vatnumber')) {
            Module::disableByName('vatnumber');        
        }
        //Check if the PS version is older than 1.6.0.0
        if (version_compare(_PS_VERSION_, '1.6.0.0', '<')) {
            $this->_errors[] = $this->l('This module is not compatible with this PrestaShop version.');
            return false;
        }
        
        // Checks if php minimum required extensions is loaded
        $extensions = get_loaded_extensions();
        $minimum_ext = array('soap', 'curl');
        $missing_ext = array_diff($minimum_ext,$extensions);
        if (count($missing_ext)) {
            $this->_errors[] = sprintf($this->l('The minimum extensions [%s] are not installed or loaded. Contact with your hosting provider to get it.'), implode(',', $missing_ext));
            return false;
        }
        
        // Make backup of override directory
        AdvancedVatManagerOC::backupOverrideFolder($this->name);
        
        // Uninstall override methods from thirty party modules compatibles with this module to avoid override conflicts.
        $this->uninstallThirtyPartyModulesOverridesForCompatibility();
        
        if (
            !parent::install() ||
            !$this->installTab('AdvancedVatManagerParent','Advanced VAT Manager', false) ||
            !$this->installTab('AdminCustomersVatManager','Customer VAT Number Management', 'AdvancedVatManagerParent',  'credit_card') ||
            !$this->installTab('AdminCustomersExemptionManager','Customer VAT Exemption Management', 'AdvancedVatManagerParent',  'group_add') ||
            !$this->installTab('AdminCustomersOrdersManager','Orders Management', 'AdvancedVatManagerParent', 'shopping_cart') ||
            !$this->installTab('AdminCheckVAT','VAT Check Tool', 'AdvancedVatManagerParent', 'check_circle') ||
            !$this->installTab('AdminAVMSettings','Settings', 'AdvancedVatManagerParent', 'tune') ||
            //Install Configuration tables
            !Configuration::updateValue('ADVANCEDVATMANAGER_LICENSE', '') ||    
            !Configuration::updateValue('ADVANCEDVATMANAGER_HASH', '') ||   
            !Configuration::updateValue('ADVANCEDVATMANAGER_ADMINVALIDATION', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_FRONTVALIDATION', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DISABLE_FORMODULES', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DISPLAY_WARNING_MESSAGE_ADDRESS', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION', 1) || 
            !Configuration::updateValue('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_EMAIL_ADDRESS', Configuration::get('PS_SHOP_EMAIL')) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_SENDAPIALERT', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_SEND_CUSTOMER_EMAIL_API_FAIL_ORDER', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_SENDEMAILVALIDATION', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VALIDATION_MODE', 'smart') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VATFIELD', 'optional') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_ALLOWDUPLICATED', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_FIELD_LABEL', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_FIELD_LEGEND', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_BLACKLIST', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_SAVETOUPPERCASE', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VALIDATION_TYPE', 'api') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_COMPANY_VALIDATION', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_COMPANY_AUTOINSERT', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VATEXEMPTION', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION',0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_LOCAL_COUNTRY', Configuration::get('PS_COUNTRY_DEFAULT')?(int)Configuration::get('PS_COUNTRY_DEFAULT'):'') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VALIDATION_SYSTEM', '1-way') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_MERCHANT_VAT', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_LEGAL_TEXT', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_INVOICE_NOTE', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_BREXIT_ENABLED', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VOEC_ENABLED', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VOEC_MODE', 1) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_ASSIGN_GROUP', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_DUPLICATED', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_DELETE_DUPLICATED', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_DELETE_INVALID', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_DELETE_EMPTY', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SCANFROMLAST', 0) ||             
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANY', 0) || 
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY_COMPANY', 0) || 
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANYADDRESS', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CRON_SKIPAPISYSTEMFAIL', 0) ||  
            !Configuration::updateValue('ADVANCEDVATMANAGER_CHANGE_DEFAULT_GROUP_WITHADDRESS', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_ADDRESS_TYPE', 'both') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT', '') ||            
            !Configuration::updateValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DISPLAY_PRODUCT_PRICE_MODE', 'price_default') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_CURRENCY_RATE_UPDATED', '') ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_COUNTRY', $this->getCountriesID()) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION', 0) ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY', 0)  ||
            !Configuration::updateValue('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER', 0)  ||
            !$this->registerHook('displayBackOfficeHeader') ||
            !$this->registerHook('displayFooter') ||
            !$this->registerHook('displayExpressCheckout') ||
            !$this->registerHook('displayInvoiceLegalFreeText') ||           
            !$this->registerHook('displayProductPriceBlock') ||
            !$this->registerHook('createAccountForm') ||         
            !$this->registerHook('actionAdminControllerSetMedia') ||
            !$this->registerHook('actionFrontControllerSetMedia') ||
            !$this->registerHook('actionValidateCustomerAddressForm') ||
            !$this->registerHook('actionDispatcher') ||
            !$this->registerHook('actionBeforeSubmitAccount') ||
            !$this->registerHook('actionObjectDeleteAfter') ||
            !$this->registerHook('actionObjectAddAfter') ||
            !$this->registerHook('actionObjectUpdateAfter') ||
            !$this->registerHook('actionPDFInvoiceRender') ||
            !$this->registerHook('actionTaxManager') ||
            !$this->registerHook('taxManager') ||
            !$this->registerHook('actionCartSave') ||
            !$this->registerHook('actionValidateOrder') ||
            !$this->registerHook('actionOrderHistoryAddAfter') ||
            !$this->registerHook('actionCheckoutRender') ||
            !$this->registerHook('actionSetInvoice') ||
            // Compatibility hooks with module One Page Checkout PrestaShop by Presteamshop start
            !$this->registerHook('actionOpcValidatePayment') ||
            !$this->registerHook('actionStepBeforePaymentOPC') ||
            !$this->registerHook('actionOpcCustomerAddressFormFields') ||
            !$this->registerHook('actionOpcValidateVatNumber')
            // Compatibility hooks with module One Page Checkout PrestaShop by Presteamshop end
        )
        {   
            return false; 
        }
        
        /* Install configuration values for Customer group assignation by countries */
        $countries = CustomersVAT::getCountriesIDForValidation();
        if (!empty($countries)) {
            foreach ($countries as $country) {
                Configuration::updateValue('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$country, 0);
            }
        }
        
        /* Install database */
        include(dirname(__file__) . '/sql/install.php');
        include(dirname(__file__) . '/sql/install_uk.php');// Install UK states
        include(dirname(__file__) . '/sql/install_no.php');// Install Norwegian states
        
        if (version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
            $this->removeOverride('TaxRulesTaxManager');// It is not necessary in newest PS versions. 
            $this->unregisterHook('createAccountForm');      
        }
        
        // Creates the Order state from this module if it is not exists
        $this->createOrderStatus(); 
        
        //License feature
        if (!self::$prestashopAddons) {
            advancedvatmanager\license\APILicense::sendLogActivity($this->name, $this->version, Tools::getHttpHost(), Tools::getRemoteAddr(), $this->l('Module has been installed!'), Tools::getAdminToken(self::$lw_reference), Configuration::get('PS_SHOP_EMAIL'), Configuration::get('ADVANCEDVATMANAGER_LICENSE'));
        }
             
        return true;
    }
    
    /**
     * AdvancedVatManager::uninstall()
     * 
     * @return
     */
    public function uninstall()
    {
        if (
            !parent::uninstall() ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_LICENSE') ||      
            !Configuration::deleteByName('ADVANCEDVATMANAGER_HASH') ||  
            !Configuration::deleteByName('ADVANCEDVATMANAGER_ADMINVALIDATION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_FRONTVALIDATION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DISABLE_FORMODULES') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DISPLAY_WARNING_MESSAGE_ADDRESS') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION') || 
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_COUNTRY') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_EMAIL_ADDRESS') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_SENDAPIALERT') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_SEND_CUSTOMER_EMAIL_API_FAIL_ORDER') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_SENDEMAILVALIDATION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VALIDATION_MODE') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VATFIELD') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_ALLOWDUPLICATED') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_FIELD_LABEL') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_FIELD_LEGEND') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_BLACKLIST') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_SAVETOUPPERCASE') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID') ||            
            !Configuration::deleteByName('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VALIDATION_TYPE') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_COMPANY_VALIDATION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_COMPANY_AUTOINSERT') ||          
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VATEXEMPTION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_LOCAL_COUNTRY') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VALIDATION_SYSTEM') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_MERCHANT_VAT') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_LEGAL_TEXT') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_INVOICE_NOTE') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_BREXIT_ENABLED') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VOEC_ENABLED') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VOEC_MODE') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_ASSIGN_GROUP') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SENDEMAIL_DUPLICATED') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_DELETE_DUPLICATED') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_DELETE_INVALID') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_DELETE_EMPTY') ||          
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SCANFROMLAST') ||            
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANY') || 
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY_COMPANY') || 
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY') || 
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SKIPAPISYSTEMFAIL') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANYADDRESS') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CHANGE_DEFAULT_GROUP_WITHADDRESS') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_ADDRESS_TYPE') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DISPLAY_PRODUCT_PRICE_MODE') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS') || 
            !Configuration::deleteByName('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS') ||
            !Configuration::deleteByName('VAT_PENDING_VALIDATION_OS') || 
            !Configuration::deleteByName('VAT_VALID_OS') || 
            !Configuration::deleteByName('ADVANCEDVATMANAGER_CURRENCY_RATE_UPDATED') || 
            !Configuration::deleteByName('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY')  ||
            !Configuration::deleteByName('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER')  ||
            !$this->uninstallTabs()
        ) 
        {
            return false;
        }
        
        /* Uninstall configuration values from checkboxes and multiselects */
        Db::getInstance()->execute('
        DELETE FROM `' . _DB_PREFIX_ .'configuration`
        WHERE `name` LIKE "ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_%"');
        Db::getInstance()->execute('
        DELETE FROM `' . _DB_PREFIX_ .'configuration`
        WHERE `name` LIKE "ADVANCEDVATMANAGER_GROUP_VATEXEMPTION_%"');
        
        /* Uninstall database */
        include(dirname(__file__) . '/sql/uninstall.php');
        
        // Restore modules override methods               
        $this->installThirtyPartyModulesOverridesForCompatibility();
        
        // Removes order state created
        $this->deleteOrderState();
        
        //License feature
        if (!self::$prestashopAddons) {
            advancedvatmanager\license\APILicense::sendLogActivity($this->name, $this->version, Tools::getHttpHost(), Tools::getRemoteAddr(), $this->l('Module has been uninstalled!'), Tools::getAdminToken(self::$lw_reference), Configuration::get('PS_SHOP_EMAIL'), Configuration::get('ADVANCEDVATMANAGER_LICENSE'));
        }
        
        return true;
    }
    
    public function enable($force_all = false)
    {  
        //License feature
        if (!self::$prestashopAddons) {
            advancedvatmanager\license\APILicense::sendLogActivity($this->name, $this->version, Tools::getHttpHost(), Tools::getRemoteAddr(), $this->l('Module has been enabled!'), Tools::getAdminToken(self::$lw_reference), Configuration::get('PS_SHOP_EMAIL'), Configuration::get('ADVANCEDVATMANAGER_LICENSE'));
        }
        
        return $this->uninstallThirtyPartyModulesOverridesForCompatibility() && parent::enable() && (version_compare(_PS_VERSION_, '1.7.0.0', '>=')?$this->removeOverride('TaxRulesTaxManager'):'');
    }
    
    public function disable($force_all = false)
    {
        // Compatiblity between our modules and OPC by Presteamshop
        if (Module::isEnabled('advancedantispamsystem') && !Module::isEnabled('onepagecheckoutps')) {
            $oc = new AdvancedVatManagerOC();
            $oc->removeModuleOverride('advancedantispamsystem', 'OrderController', 'postProcess'); 
        }
        if (Module::isEnabled('dniverificator')) {
            $oc = new AdvancedVatManagerOC();
            if (version_compare(_PS_VERSION_, '1.7.7.0', '<')) {
                $oc->removeModuleOverride('dniverificator', 'AdminAddressesController', 'processSave');
                $oc->removeModuleOverride('dniverificator', 'AdminAddressesController', 'processAdd');  
            }
            $oc->removeModuleOverride('dniverificator', 'CustomerAddressForm', 'getTemplateVariables');
        }
        
        //License feature
        if (!self::$prestashopAddons) {
            advancedvatmanager\license\APILicense::sendLogActivity($this->name, $this->version, Tools::getHttpHost(), Tools::getRemoteAddr(), $this->l('Module has been disabled!'), Tools::getAdminToken(self::$lw_reference), Configuration::get('PS_SHOP_EMAIL'), Configuration::get('ADVANCEDVATMANAGER_LICENSE'));
        }
        
        return parent::disable() && $this->installThirtyPartyModulesOverridesForCompatibility();
    }
    
    /**
     * AdvancedVatManager::installThirtyPartyModulesOverridesForCompatibility()
     * Install thirty party override methods.
     * @return
     */
    public function installThirtyPartyModulesOverridesForCompatibility()
    {      
        if (Module::isEnabled('dniverificator')) {
            $dniVerificator = Module::getInstanceByName('dniverificator');
            $dniVerificator->removeOverride('CustomerAddressForm');  
            $dniVerificator->addOverride('CustomerAddressForm');
            if (version_compare(_PS_VERSION_, '1.7.7.0', '<')) {
                $dniVerificator->removeOverride('AdminAddressesController');
                $dniVerificator->addOverride('AdminAddressesController');    
            }
        }
        
        // Compatiblity between our modules and OPC by Presteamshop
        if (Module::isEnabled('advancedantispamsystem')) {
            $advancedantispamsystem = Module::getInstanceByName('advancedantispamsystem');
            $advancedantispamsystem->removeOverride('OrderController');
            $advancedantispamsystem->addOverride('OrderController');
        }
        else if (Module::isEnabled('onepagecheckoutps')) {
            $onepagecheckoutps = Module::getInstanceByName('onepagecheckoutps');
            $onepagecheckoutps->removeOverride('OrderController');
            $onepagecheckoutps->addOverride('OrderController');
        }
        
        if (Module::isEnabled('ets_onepagecheckout')) {
            $ets_onepagecheckout = Module::getInstanceByName('ets_onepagecheckout');
            $ets_onepagecheckout->removeOverride('HTMLTemplateOrderSlip');
            $ets_onepagecheckout->addOverride('HTMLTemplateOrderSlip');
            $ets_onepagecheckout->unregisterHook('actionTaxManager');
            $ets_onepagecheckout->unregisterHook('taxManager');
        }
        if (Module::isEnabled('ets_geolocation')) {
            $ets_geolocation = Module::getInstanceByName('ets_geolocation');
            $ets_geolocation->unregisterHook('actionTaxManager');
            $ets_geolocation->unregisterHook('taxManager');
        }
        if (Module::isEnabled('eicaptcha')) {
            $eicaptcha = Module::getInstanceByName('eicaptcha');
            $eicaptcha->removeOverride('OrderController');
            $eicaptcha->addOverride('OrderController');
        }
        if (Module::isEnabled('recaptcha')) {
            $recaptcha = Module::getInstanceByName('recaptcha');
            $recaptcha->removeOverride('OrderController');
            $recaptcha->addOverride('OrderController');
        }
        if (Module::isEnabled('paypalfeeplus')) {
            $paypalfeeplus = Module::getInstanceByName('paypalfeeplus');
            $paypalfeeplus->removeOverride('HTMLTemplateOrderSlip');
            $paypalfeeplus->addOverride('HTMLTemplateOrderSlip');
        }
        if (Module::isEnabled('minpurchase')) {
            $minpurchase = Module::getInstanceByName('minpurchase');
            $minpurchase->removeOverride('OrderController');
            $minpurchase->addOverride('OrderController');
        }
        if (Module::isEnabled('hideprice')) {
            $hideprice = Module::getInstanceByName('hideprice');
            $hideprice->removeOverride('OrderController');
            $hideprice->addOverride('OrderController');
        }
        if (Module::isEnabled('gwadvancedinvoice')) {
            $gwadvancedinvoice = Module::getInstanceByName('gwadvancedinvoice');
            $gwadvancedinvoice->removeOverride('HTMLTemplateInvoice');
            $gwadvancedinvoice->addOverride('HTMLTemplateInvoice');
        }
        if (Module::isEnabled('ets_payment_with_fee') && version_compare(Module::getInstanceByName('ets_payment_with_fee')->version, '2.3.9', '>=')) {
            $ets_payment_with_fee = Module::getInstanceByName('ets_payment_with_fee');
            $ets_payment_with_fee->removeOverride('HTMLTemplateInvoice');
            $ets_payment_with_fee->addOverride('HTMLTemplateInvoice');
        }
        
        ValidationEngine::cleanCache();
        return true;
    }
    
    /**
     * AdvancedVatManager::uninstallThirtyPartyModulesOverridesForCompatibility()
     * Uninstall thirty party override methods to make compatibility with this module.
     * @return
     */
    public function uninstallThirtyPartyModulesOverridesForCompatibility()
    {
        $oc = new AdvancedVatManagerOC();        
        if (Module::isEnabled('dniverificator')) { 
            $oc->removeModuleOverride('dniverificator', 'CustomerAddressForm', 'getTemplateVariables');
            if (version_compare(_PS_VERSION_, '1.7.7.0', '<')) {
                $oc->removeModuleOverride('dniverificator', 'AdminAddressesController', 'processSave');
                $oc->removeModuleOverride('dniverificator', 'AdminAddressesController', 'processAdd');  
            }
        }
        // Compatibility with another modules by Liewebs
        if (Module::isEnabled('advancedantispamsystem')) {
            $oc->removeModuleOverride('advancedantispamsystem', 'OrderController', 'postProcess');
        }
        if (Module::isEnabled('onepagecheckoutps')) {
            $oc->removeModuleOverride('onepagecheckoutps', 'OrderController', 'postProcess');  
        }       
        if (Module::isEnabled('ba_prestashop_invoice')) {
            $oc->removeModuleOverride('ba_prestashop_invoice', 'HTMLTemplateOrderSlip', 'getContent');
            $oc->removeModuleOverride('ba_prestashop_invoice', 'HTMLTemplateOrderSlip', 'baGetTaxBreakdown');
        }
        if (Module::isEnabled('eicaptcha')) {
            $oc->removeModuleOverride('eicaptcha', 'OrderController', 'postProcess');
        }
        if (Module::isEnabled('recaptcha')) {
            $oc->removeModuleOverride('recaptcha', 'OrderController', 'postProcess');
        }
        if (Module::isEnabled('paypalfeeplus')) {
            $oc->removeModuleOverride('paypalfeeplus', 'HTMLTemplateOrderSlip', 'getContent');
        } 
        if (Module::isEnabled('minpurchase')) {
            $oc->removeModuleOverride('minpurchase', 'OrderController', 'postProcess');
        }
        if (Module::isEnabled('hideprice')) {
            $oc->removeModuleOverride('hideprice', 'OrderController', 'postProcess');
        }  
        if (Module::isEnabled('gwadvancedinvoice')) {
            $oc->removeModuleOverride('gwadvancedinvoice', 'HTMLTemplateInvoice', 'getTaxTabContent');
        }  
        if (Module::isEnabled('ets_payment_with_fee') && version_compare(Module::getInstanceByName('ets_payment_with_fee')->version, '2.3.9', '>=')) {
            $oc->removeModuleOverride('ets_payment_with_fee', 'HTMLTemplateInvoice', 'getTaxTabContent');
        }
        ValidationEngine::cleanCache();
        return true;
    }


    /**
     * AdvancedVatManager::checkIsLicenseRegistered()
     * Checks if the license code is registered and valid.
     * @return
     */
    public static function checkIsLicenseRegistered()
    { 
        // Disabled in Locahost
        if (in_array(Tools::getRemoteAddr(),['127.0.0.1', '::1'])) {
            return 'localhost';
        }
        if (Configuration::get('ADVANCEDVATMANAGER_LICENSE') && Configuration::get('ADVANCEDVATMANAGER_HASH')) {
            $response = json_decode(advancedvatmanager\license\APILicense::checkValidLicense(self::$lw_reference, Tools::getHttpHost(), Tools::getAdminToken(self::$lw_reference), Configuration::get('ADVANCEDVATMANAGER_HASH'), Configuration::get('ADVANCEDVATMANAGER_LICENSE')));
            return $response;
        }
        return false;
    }

    /**
     * AdvancedVatManager::installTab()
     * Install admin tabs
     * @param mixed $className - name of the admin class
     * @param mixed $tabName - name of the table
     * @param bool $tabParentName - false or name of parent table
     * @param mixed $icon - name of material icon or null
     * @return
     */
    public function installTab($className, $tabName, $tabParentName = false, $icon = null)
    {
        $tabId = (int) Tab::getIdFromClassName($className);
        if (!$tabId) {
            $tab = new Tab();
        }
        else {
            $tab = new Tab($tabId);
        }
        
        $tab->class_name = $className;
        $tab->name = array();
        
        if ($icon !== null) {
            $tab->icon = $icon;
        }
     
        foreach (Language::getLanguages() as $lang) {
            $tab->name[$lang['id_lang']] = $this->_translate($tabName, $lang['iso_code']);
        }
        if ($tabParentName) {
            $tab->id_parent = (int)Tab::getIdFromClassName($tabParentName);
        } else {
            $tab->id_parent = 0;
        }
        $tab->module = $this->name;
        $tab->enabled = true;
        return $tab->save();
    }

    /**
     * AdvancedVatManager::uninstallTabs()
     * Uninstall tabs
     * @return bool
     */
    public function uninstallTabs()
    {
        $uninstallTabCompleted = true;

        foreach ($this->controllers as $controllerName) {
            $id_tab = (int) Tab::getIdFromClassName($controllerName);
            $tab = new Tab($id_tab);
            if (Validate::isLoadedObject($tab)) {
                $uninstallTabCompleted = $uninstallTabCompleted && $tab->delete();
            }
        }
        return $uninstallTabCompleted;
    }
    
    /**
     * AdvancedVatManager::_translate()
     * Return the translation for a string given a language iso code
     * @param mixed $string string to translate
     * @param mixed $iso_lang language iso code
     * @param bool $source source file without extension
     * @param bool $js if it's inside a js string
     * @return
     */
    public function _translate($string, $iso_lang, $source = false, $js= false)
    {
        $file = _PS_MODULE_DIR_.$this->name.'/translations/'.$iso_lang.'.php';
        $_MODULE = array();
        if(!file_exists($file)){
            return $string;    
        } 
        else {
            include($file);    
        }

        $key = md5(str_replace('\'', '\\\'', $string));

        $current_key = Tools::strtolower('<{'.$this->name.'}'._THEME_NAME_.'>'.($source?$source:$this->name)).'_'.$key;
        $default_key = Tools::strtolower('<{'.$this->name.'}prestashop>'.($source?$source:$this->name)).'_'.$key;
        $ret = $string;
        
        if (array_key_exists($current_key, $_MODULE)) {
            $ret = Tools::stripslashes($_MODULE[$current_key]);  
        }
        elseif (array_key_exists($default_key, $_MODULE)) {
            $ret = Tools::stripslashes($_MODULE[$default_key]);
        }
        if ($js) {
            $ret = addslashes($ret);    
        }
        return $ret;
     }
     
    /**
     * AdvancedVatManager::getTabsForm()
     * 
     * @return
     */
    public function getTabsForm()
    {
        //License feature
        if (!self::$prestashopAddons) {
            $addons_support_url = 'https://shop.liewebs.com/'.($this->context->language->iso_code != 'es'?'/en/contact-us':'es/contactenos');
            $addons_ratings_url = 'https://shop.liewebs.com/';
            $catalogue_url = 'https://shop.liewebs.com/'.$this->context->language->iso_code.'/3-modulos-prestashop'; 
        }
        else {
            $addons_support_url = 'https://addons.prestashop.com/'.($this->context->language->iso_code != 'es'?'en/contact-us?id_product=86304':'es/contacte-con-nosotros?id_product=86304');
            $addons_ratings_url = 'https://addons.prestashop.com/ratings.php';
            $catalogue_url = 'https://addons.prestashop.com/'.$this->context->language->iso_code.'/2_community-developer?contributor=70593'; 
        }
        return array(
            'form' => array(
                'activation_tab' => array(
                    'icon' => 'fas fa-power-off',
                    'name' => $this->l('Activation'),
                    'active' => 1,
                ),
                'settings_tab' => array(
                    'icon' => 'fal fa-cogs',
                    'name' => $this->l('General settings'),
                    'active' => 0,
                ),
                'advanced_settings_tab' => array(
                    'icon' => 'far fa-sliders-h-square',
                    'name' => $this->l('Advanced settings'),
                    'active' => 0,
                ),
                'price_tab' => array(
                    'icon' => 'fal fa-tags',
                    'name' => $this->l('Price settings'),
                    'active' => 0,
                ),
                'validation_tab' => array(
                    'icon' => 'far fa-user-check',
                    'name' => $this->l('Validation settings'),
                    'active' => 0,
                ),
                'orderStatus_tab' => array(
                    'icon' => 'fal fa-abacus',
                    'name' => $this->l('Order status management'),
                    'active' => 0,
                ),
                'groupManagement_tab' => array(
                    'icon' => 'fal fa-users',
                    'name' => $this->l('Customer group management'),
                    'active' => 0,
                ),
                'exemption_tab' => array(
                    'icon' => 'fal fa-percentage',
                    'name' => $this->l('VAT exemption settings'),
                    'active' => 0,
                ),
                'invoice_tab' => array(
                    'icon' => 'fal fa-file-invoice',
                    'name' => $this->l('Invoice settings'),
                    'active' => 0,
                ),
                'field_tab' => array(
                    'icon' => 'fal fa-tags',
                    'name' => $this->l('VAT field settings'),
                    'active' => 0,
                ),
                'bretxit_tab' => array(
                    'image' => '../modules/advancedvatmanager/views/img/united-kingdom.png',
                    'name' => $this->l('Brexit settings'),
                    'active' => 0,
                ),
                'voec_tab' => array(
                    'image' => '../modules/advancedvatmanager/views/img/norway.png',
                    'name' => $this->l('VOEC (Norway) settings'),
                    'active' => 0,
                ),
                'email_tab' => array(
                    'icon' => 'far fa-envelope',
                    'name' => $this->l('Email settings'),
                    'active' => 0,
                ),
                'checkvatcron_tab' => array(
                    'icon' => 'fal fa-calendar-alt',
                    'name' => $this->l('Cron settings'),
                    'active' => 0,
                ),
                'currency_rate_tab' => array(
                    'icon' => 'fal fa-euro-sign',
                    'name' => $this->l('Currency exchange rates'),
                    'active' => 0,
                ),
                'tools_tab' => array(
                    'icon' => 'fal fa-wrench',
                    'name' => $this->l('Tools'),
                    'active' => 0,
                ),
                'documentation_tab' => array(
                    'icon' => 'fal fa-book',
                    'name' => $this->l('Documentation'),
                ),
                'compatibility_tab' => array(
                    'icon' => 'fal fa-cubes',
                    'name' => $this->l('Compatibility/Integration with third party modules'),
                ),
                'faq_tab' => array(
                    'icon' => 'fal fa-question',
                    'name' => $this->l('FAQ'),
                ),
                'troubleshooting_tab' => array(
                    'icon' => 'fal fa-laptop-medical',
                    'name' => $this->l('Troubleshooting'),
                ),
                'changelog_tab' => array(
                    'icon' => 'fal fa-code',
                    'name' => $this->l('Changelog'),
                ),
                'license_tab' => array(
                    'icon' => 'fal fa-key',
                    'name' => $this->l('License registration'),
                ),
            ),
            'link_tabs' => array(
                'version' => array(
                    'icon' => 'fal fa-info-circle',
                    'name' => $this->l('Version').' '.$this->version,
                ),
                'support' => array(
                    'icon' => 'fal fa-life-ring',
                    'name' => $this->l('Support system'),
                    'link' => $addons_support_url,
                    'target' => '_blank'
                ),
                'catalogue' => array(
                    'icon' => 'fal fa-cubes',
                    'name' => $this->l('Visit our catalogue of modules'),
                    'link' => $catalogue_url,
                    'target' => '_blank'
                ),
                'rate' => array(
                    'icon' => 'fas fa-star',
                    'name' => $this->l('Leave a feedback and rate the module'),
                    'link' => $addons_ratings_url,
                    'target' => '_blank',
                    'style' => 'background:#363a41;color:#fff;'
                )
            )
        );
    } 

    /**
     * AdvancedVatManager::getContent()
     * Load the configuration form
     * @return
     */
    public function getContent()
    {
        $this->output = '';
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submit_'.$this->name))) {
            $this->postProcess();
            $this->output .= $this->displayConfirmation($this->l('Settings updated successfully.'));            
        }
        
        if ((bool)Tools::isSubmit('submit_refresh_currency_rates')) {
            if (Currency::refreshCurrencies() != '') {
                $this->output .= $this->displayError(Currency::refreshCurrencies());    
            }
            else {
                $this->output .= $this->displayConfirmation($this->l('Currency rates have been updated successfully!.')); 
                Configuration::updateValue('ADVANCEDVATMANAGER_CURRENCY_RATE_UPDATED', date("d-m-Y H:i:s"));   
            }
        }
        if ((bool)Tools::isSubmit('submit_delete_cart_table')) {
            CustomersCart::deleteTable();
            $this->output .= $this->displayConfirmation($this->l('Table records have been deleted successfully!.')); 
        }
        //License feature
        if (!self::$prestashopAddons) {
            if ((bool)Tools::isSubmit('submitLicenseRegistration')) {
                $response = json_decode(advancedvatmanager\license\APILicense::registerLicense(self::$lw_reference, Tools::getHttpHost(), Tools::getAdminToken(self::$lw_reference), Tools::getValue('LWLicense')));
                if ($response->success) {
                    Configuration::updateValue('ADVANCEDVATMANAGER_HASH', $response->hash);
                    Configuration::updateValue('ADVANCEDVATMANAGER_LICENSE', $response->license);
                    advancedvatmanager\license\APILicense::updateLicenseDomain($response->hash, $response->license, $response->domain, $response->id_lwservicemanagement_product_license, Tools::getAdminToken(self::$lw_reference));
                    $this->output .= $this->displayConfirmation($response->message); 
                }
                else {
                    $this->output .= $this->displayError($response->message);     
                } 
                advancedvatmanager\license\APILicense::sendLogActivity($this->name, $this->version, Tools::getHttpHost(), Tools::getRemoteAddr(), $response->message, Tools::getAdminToken(self::$lw_reference), Configuration::get('PS_SHOP_EMAIL'), Configuration::get('ADVANCEDVATMANAGER_LICENSE'));             
            }
            if ((bool)Tools::isSubmit('submitLicenseDeactivation')) {
                $response = json_decode(advancedvatmanager\license\APILicense::unRegisterLicense(self::$lw_reference, Tools::getHttpHost(), Tools::getAdminToken(self::$lw_reference), Configuration::get('ADVANCEDVATMANAGER_HASH'), Configuration::get('ADVANCEDVATMANAGER_LICENSE')));
                if ($response->success) {
                    Configuration::updateValue('ADVANCEDVATMANAGER_HASH', '');
                    Configuration::updateValue('ADVANCEDVATMANAGER_LICENSE', '');
                    advancedvatmanager\license\APILicense::updateLicenseDomain($response->hash, $response->license, '', $response->id_lwservicemanagement_product_license, Tools::getAdminToken(self::$lw_reference));
                    $this->output .= $this->displayConfirmation($response->message); 
                }
                else {
                    $this->output .= $this->displayError($response->message);     
                } 
                advancedvatmanager\license\APILicense::sendLogActivity($this->name, $this->version, Tools::getHttpHost(), Tools::getRemoteAddr(), $response->message, Tools::getAdminToken(self::$lw_reference), Configuration::get('PS_SHOP_EMAIL'), $response->license);             
            }
        }
        $this->context->smarty->assign(array(
            'module_dir' => $this->_path,
            'changelog' => file(_PS_MODULE_DIR_.$this->name.'/Changelog.txt'),
            'checkvat_cron_url' => $this->context->link->getModuleLink('advancedvatmanager', 'cronValidationProcess').'?token=' . Tools::substr(Tools::encrypt('advancedvatmanager'), 0, 12). '&id_shop=' . $this->context->shop->id,
            'getGBPThreshold' => $this->getCurrencyAmount('GBP', AVM_BREXIT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign),
            'getNOKThreshold' => $this->getCurrencyAmount('NOK', AVM_NOK_YEAR_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign), 
            'getNOKProductThreshold' => $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign),
            'license_content' => Tools::file_get_contents(file_exists(_PS_MODULE_DIR_.'advancedvatmanager/license_'.(self::$prestashopAddons?'addons_':'').$this->context->language->iso_code.'.html')?_PS_MODULE_DIR_.'advancedvatmanager/license_'.$this->context->language->iso_code.'.html':_PS_MODULE_DIR_.'advancedvatmanager/license_en.html'),
            'faq_content' => $this->context->smarty->fetch($this->local_path . 'views/templates/admin/faq.tpl'),
            'troubleshooting_content' => $this->context->smarty->fetch($this->local_path . 'views/templates/admin/troubleshooting.tpl'),
            'opc_presteamshop_enabled' => $this->opc_presteamshop_enabled,
            'currency_cron_update' => $this->context->link->getModuleLink('advancedvatmanager', 'cronCurrencyRateUpdate').'?token=' . Tools::substr(Tools::encrypt('advancedvatmanager'), 0, 12),
            'records_cart_table' => CustomersCart::getRecords(),
            'currencies_installed' => Currency::getCurrencies(false, false),
        ));
        Media::addJsDef(array(
            'add_element' => $this->l('Add'),
        ));
        
        /* Adds Javascript and CSS files */
        $this->context->controller->addCSS('https://pro.fontawesome.com/releases/v5.15.4/css/all.css');
        $this->context->controller->addJqueryPlugin('tagify');
        $this->context->controller->addCSS($this->_path.'views/css/admin/back.css');
        $this->context->controller->addJS($this->_path.'views/js/admin/common_form.js');

        $header  = $this->context->smarty->fetch($this->local_path . 'views/templates/admin/configure.tpl');
        
        //License feature
        if (!self::$prestashopAddons) {
            $this->context->controller->addJS($this->_path.'views/js/admin/licenseTools.js');
            $license_reg_form = $this->context->smarty->fetch($this->local_path . 'views/templates/admin/regLic/licenseRegistration_form.tpl');        
            $APIresponse = self::checkIsLicenseRegistered();
            if ($APIresponse != 'localhost') {
                if (!$APIresponse || (isset($APIresponse->success) && !$APIresponse->success)) {
                    $this->adminDisplayInformation(sprintf($this->l('The module %s is not registered. You should activate the license code, otherwise module will not work on this shop.'), $this->displayName)); 
                    if (isset($APIresponse->message)) {
                        $this->output .= $this->displayError($APIresponse->message);     
                    }
                    return $this->output.$header.$license_reg_form;  
                }
            }
        }
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')== 1 || Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            $this->checkAddressFormat();
            $this->checkAvailableCurrency();
            $this->checkIncompatibleOptions();
        }
        return $this->output.$header.$this->renderForm();      
    }
    
    /**
     * AdvancedVatManager::renderForm()
     * Create the form that will be displayed in the configuration of your module.
     * @return
     */
    protected function renderForm()
    {
        $helper = new HelperForm();
        
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        // Language
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);
        
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submit_'.$this->name;
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token  = Tools::getAdminTokenLite('AdminModules');
        
        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(),
            // vertical tabs
            'vertical_tabs' => $this->getTabsForm(),
            /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id
        );
        // allow multiple forms to combine with tabs
        $helper->multiple_fieldsets = true;
        return $helper->generateForm($this->getConfigForm());
    }

     /**
      * AdvancedVatManager::getConfigForm()
      * Create the structure of your form.
      * @return
      */
     protected function getConfigForm()
     {
        $switch = array(
            array(
                'id' => 'active_on',
                'value' => 1,
                'label' => $this->l('Enabled')
            ),
            array(
                'id' => 'active_off',
                'value' => 0,
                'label' => $this->l('Disabled')
            )
        );
        // Get country list
        $countries = array();
        $countries_2 = array();
        $customer_groups_withDisabled = array();
        $groupAssignment = array();
        $order_states = array();
        $modules = array();
        
        $countries_2[] = array('id' => 0, 'name' => $this->l('Disabled'));
        $customer_groups = array();
        $customer_groups_withDisabled[] = array('id' => 0, 'name' => $this->l('Disabled')); 
        
        // Gets customer groups
        foreach (Group::getGroups($this->context->language->id) as $group) {
            $customer_groups[] = array('id' => $group['id_group'], 'name' => $group['name']);
            $customer_groups_withDisabled[] = array('id' => $group['id_group'], 'name' => $group['name']); 
            if (Configuration::get('PS_CUSTOMER_GROUP') == $group['id_group']) {
                $defaultGroup = $group['name'];
            }
        }
        // Gets Countries
        foreach (Country::getCountries($this->context->language->id, false) as $country) {
            $countries[] = array('id' => $country['id_country'], 'name' => $country['name']);
            $countries_2[] = array('id' => $country['id_country'], 'name' => $country['name']);

            if (in_array($country['id_country'], CustomersVAT::getCountriesIDForValidation())) {
                $groupAssignment[] = array('type' => 'select','label' => sprintf($this->l('%s'),$country['name']),'desc' => sprintf($this->l('Customer group assignation for %s.'),$country['name']),'name' => 'ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$country['id_country'],'options' => array('query' => $customer_groups_withDisabled,'id' => 'id','name' => 'name'));
            }
        }
        
        // Gets Order states
        $order_states[] = array('id' => 0, 'name' => $this->l('Disabled'));
        foreach (OrderState::getOrderStates($this->context->language->id) as $order_state) {
            $order_states[] = array('id' => $order_state['id_order_state'], 'name' => $order_state['name']);    
        }
        
        $groupAssignment[] = array(
            'type' => 'select',
            'label' => $this->l('Company group assignment without valid VAT'),
            'name' => 'ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY',
            'desc' => $this->l('Select the customer group where you want to assign the customer that does not have a valid VAT number or it is empty but the company field has been filled in. If the customer has more than one address saved and already belongs to other groups, will be assigned to this group additionally, unless the [Remove customer from another groups] option is activated.'),
            'options' => array('query' => $customer_groups_withDisabled,'id' => 'id','name' => 'name')
        );
        $groupAssignment[] = array(
            'type' => 'select',
            'label' => $this->l('Consumer group assignment'),
            'name' => 'ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER',
            'desc' => $this->l('Select the customer group where you want to assign the customer that does not have a valid VAT number or it is empty and company field is empty (this means that it is a consumer instead company). If the customer has more than one address saved and already belongs to other groups, will be assigned to this group additionally, unless the [Remove customer from another groups] option is activated.'),
            'options' => array('query' => $customer_groups_withDisabled,'id' => 'id','name' => 'name')
        );
        $groupAssignment[] = array(
            'type' => 'switch',
            'label' => $this->l('Use as default group'),
            'name' => 'ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION',
            'desc' => $this->l('This option allows you to assign the group as default customer group. The default customer group will be configured with respect to the last address added by the customer.'),
            'is_bool' => true, 
            'values' => $switch
        );
        $groupAssignment[] = array(
            'type' => 'switch',
            'label' => $this->l('Change default group with address'),
            'name' => 'ADVANCEDVATMANAGER_CHANGE_DEFAULT_GROUP_WITHADDRESS',
            'desc' => $this->l('This option allows you to change the customer default group associated with the country in this section when the customer selects a default address or during the purchase process. If the address selected has not valid VAT number, the system will change to PrestaShop customer default group').' ['.$defaultGroup.']',
            'is_bool' => true, 
            'values' => $switch
        ); 
        $groupAssignment[] = array(
            'type' => 'switch',
            'label' => $this->l('Remove customer from another groups'),
            'name' => 'ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS',
            'desc' => $this->l('This option removes the client from the groups where it was previously assigned and leaves it only assigned to the group that is configured in this section. The default group will be changed to current group assigned.'),
            'is_bool' => true, 
            'values' => $switch
        );
        
        $accuracy_options = array(
            array('id' => 0, 'name' => $this->l('Disabled')),
            array('id' => 10, 'name' => $this->l('10% accuracy')),
            array('id' => 15, 'name' => $this->l('15% accuracy')),
            array('id' => 20, 'name' => $this->l('20% accuracy')),
            array('id' => 25, 'name' => $this->l('25% accuracy')),
            array('id' => 30, 'name' => $this->l('30% accuracy')),
            array('id' => 35, 'name' => $this->l('35% accuracy')),
            array('id' => 40, 'name' => $this->l('40% accuracy')),
            array('id' => 45, 'name' => $this->l('45% accuracy')),
            array('id' => 50, 'name' => $this->l('50% accuracy')),
            array('id' => 55, 'name' => $this->l('55% accuracy')),
            array('id' => 60, 'name' => $this->l('60% accuracy')),
            array('id' => 65, 'name' => $this->l('65% accuracy')),
            array('id' => 70, 'name' => $this->l('70% accuracy')),
            array('id' => 75, 'name' => $this->l('75% accuracy')),
            array('id' => 80, 'name' => $this->l('80% accuracy')),
            array('id' => 85, 'name' => $this->l('85% accuracy')),
            array('id' => 90, 'name' => $this->l('90% accuracy')),
            array('id' => 95, 'name' => $this->l('95% accuracy')),
            array('id' => 100, 'name' => $this->l('100% accuracy'))
        );
        
        // Module list to disable validation
        foreach (Module::getModulesInstalled() as $moduleObject) {
            if ($moduleObject['name'] != $this->name) {
                $mod = Module::getInstanceByName($moduleObject['name']);
                $modules[] = array('id' => $moduleObject['name'],'name' => $mod->displayName);      
            }
        }
                                                
        $config_form = array(
            'activation_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Activation settings'),
                        'icon' => 'fas fa-power-off'
                    ),
                    'description' => $this->l('The correct countries for validation are selected by default except the default country of the store, due to the fact that, following the regulation of intra-community operations, the validation of VAT numbers must be carried out for customers who reside outside the country where the store is located and also belong to the Union european. If still, you want to also validate the VAT numbers of customers who reside within the country where the store is located, you must add it to the list of countries for validation. In a normal situation, that option is predefined and should not be changed. Take in consideration that North of Ireland is included for intra-communitary operations and belongs to United Kingdom (England). If you have enabled VOEC operations, Norway country will be selected in this option.'),
                    'warning' => $this->l('IMPORTANT: This module controls the exemption or collection of taxes depending on the conditions of the client according to the legislation in intra-community operations, VOEC, Brexit, etc...However, it does not manage the types of taxes, their names and the amount of their percentage. You must try to have the tax rules applied to each of the countries well configured so that this module and the application of taxes in the store work correctly.'),
                    'input' => array(
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Back-office validation'),
                            'name' => 'ADVANCEDVATMANAGER_ADMINVALIDATION',
                            'is_bool' => true,
                            'desc' => $this->l('Activate validation for VAT numbers in Address section of Back-office.'),
                            'hint' => $this->l('Some modules use controllers belonging to the back-office for the creation of customer addresses through cron tasks or through processes. For the module to be able to validate the VAT numbers of these created addresses, this option must be activated.'),
                            'identifier' => 'id',
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Front-office validation'),
                            'name' => 'ADVANCEDVATMANAGER_FRONTVALIDATION',
                            'multistore_configuration_key' => 'ADVANCEDVATMANAGER_FRONTVALIDATION',
                            'is_bool' => true,
                            'desc' => $this->l('Activate validation for VAT numbers in Address section of Front-office when a customer create or modify an address or during checkout process.'),
                            'identifier' => 'id',
                            'values' => $switch
                        ),
                        array(
                            'type' => 'select',
                            'label' => $this->l('Countries for validation'),
                            'width' => '300px',
                            'class' => 'advancedvatmanager_country_selector',
                            'desc' => $this->l('Select the countries to activate the validation. You should not modify this list unless the regulations for intra-community operations change and the countries involved are modified or you want to include your local country in the validation.'),
                            'hint' => $this->l('CTRL and click or click and drag for multiple options selection.'),
                            'name' => 'ADVANCEDVATMANAGER_COUNTRY[]',
                            'multiple' => true,
                            'options' => array(
                                'query' => $countries,
                                'id' => 'id',
                                'name' => 'name'
                            )
                        ),
                        array(
                            'type' => 'select',
                            'label' => $this->l('Disable validation in modules'),
                            'width' => 'fit-content',
                            'class' => 'advancedvatmanager_modules_selector',
                            'desc' => $this->l('Select the available modules to disable the VAT number validation from this module. In this list is displayed all modules installed in your shop. There may be modules that intervene in the process of creating customer addresses, such as marketplaces and order synchronization modules, where the purchase operation has already been validated and the amounts assigned. You may be interested in disabling the VAT number validation process of our module to avoid conflict with the operations of these modules.'),
                            'hint' => $this->l('CTRL and click or click and drag for multiple options selection.'),
                            'name' => 'ADVANCEDVATMANAGER_DISABLE_FORMODULES[]',
                            'multiple' => true,
                            'options' => array(
                                'query' => $modules,
                                'id' => 'id',
                                'name' => 'name'
                            )
                        ),
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'settings_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('General settings'),
                        'icon' => 'fal fa-cogs'
                    ),
                    'description' => $this->l('Take in consideration that for the tax exemption operation to be legally correct, the merchant, in addition to the customer, must be registered with a valid intra-community VAT. The system will validate the intra-community VAT number of the merchant by VIES before saving it in the database.'),
                    'input' => array(
                            array(
                                'type' => 'text',
                                'col' => 3,
                                'label' => $this->l('Merchant VAT'),
                                'name' => 'ADVANCEDVATMANAGER_MERCHANT_VAT',
                                'desc' => $this->l('Insert the merchant VAT number (with ISO code) which the business is registered for intra-communitary operations. Write full number with iso code (Ex: FR17852960). VAT numbers from United Kingdom are not allowed.'),
                                'hint' => $this->l('This is necessary for 2-way validation system option. Could leave empty if you do not use 2-way validation system.'),
                            ),   
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'advanced_settings_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Advanced settings'),
                        'icon' => 'far fa-sliders-h-square'
                    ),
                    'input' => array(
                            array(
                                'type' => 'switch',
                                'label' => $this->l('Display warning message in address'),
                                'name' => 'ADVANCEDVATMANAGER_DISPLAY_WARNING_MESSAGE_ADDRESS',
                                'is_bool' => true,
                                'desc' => $this->l('Displays warning messages in the address section of the customers account when they do not have a valid VAT number registered, or have to register a VAT number (mandatory field option activated) or have to validate the company field (company validation option activated).'),
                                'hint' => $this->l('Only works in PrestaShop 1.7 or higher'),
                                'identifier' => 'id',
                                'values' => $switch
                            ),
                            array(
                                'type' => 'switch',
                                'label' => $this->l('Do not allow checkout when the address is incomplete'),
                                'name' => 'ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION',
                                'is_bool' => true,
                                'desc' => $this->l('This option does not allow the customer to continue with the purchase process if the selected address has the VAT number or company name field that must be validated or filled in (Depending on the validation and VAT field configuration options selected). Useful option for clients who already had registered addresses in the database'),
                                'hint' => $this->l('Only works in PrestaShop 1.7 or higher'),
                                'identifier' => 'id',
                                'values' => $switch
                            ),                            
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ), 
            'price_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Price settings'),
                        'icon' => 'fal fa-tags'
                    ),
                    'input' => array(
                            array(
                                'type' => 'text',
                                'col' => 5,
                                'lang' => true,
                                'label' => $this->l('Price label when VAT exempt'),
                                'name' => 'ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT',
                                'desc' => $this->l('Displays this label content on the price at product page and product list when a customer is tax exempt. Leave in blank to display PrestaShop default label.'),
                                'identifier' => 'id',
                            ),
                            array(
                                'type' => 'select',
                                'label' => $this->l('Product price display mode'),
                                'desc' => $this->l('Select the product price mode to display on product page and product list. You can show the price without taxes, the price with taxes included, both or keep the default PrestaShop option.'),
                                'name' => 'ADVANCEDVATMANAGER_DISPLAY_PRODUCT_PRICE_MODE',
                                'hint' => $this->l('Only works in PrestaShop 1.7.8 or higher'),
                                'options' => array(
                                    'query' => array(
                                        array('id' => 'price_default', 'name' => $this->l('PrestaShop default price')),
                                        array('id' => 'price_tax', 'name' => $this->l('Price with tax')),
                                        array('id' => 'price_wt', 'name' => $this->l('Price without tax')),
                                        array('id' => 'price_both', 'name' => $this->l('Both'))
                                    ),
                                    'id' => 'id',
                                    'name' => 'name'
                                )
                            ),
                            array(
                                'type' => 'textarea',
                                'lang' => true,
                                'autoload_rte' => true,
                                'label' => $this->l('Custom price block when tax exempt'),
                                'name' => 'ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT' ,
                                'desc' => $this->l('Add a custom text in product price block (below price) and it will be displayed when a customer has selected an address with valid VAT number and is tax exempt.')
                            ), 
                            array(
                                'type' => 'textarea',
                                'lang' => true,
                                'autoload_rte' => true,
                                'label' => $this->l('Custom price block'),
                                'name' => 'ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT' ,
                                'desc' => $this->l('Add a custom text in product price block (below price) and it will be displayed on the product page of all products in the catalog.')
                            ),  
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),            
            'validation_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Validation settings'),
                        'icon' => 'far fa-users-check'
                    ),
                    'description' => $this->context->smarty->fetch($this->local_path . 'views/templates/admin/validation_description.tpl'),
                    'input' => array(
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Validation system'),
                                    'desc' => $this->l('Select the validation system for VAT number. Validation 1-way only checks and validates the customer VAT number, even when the merchant have not a valid VAT number. Validation 2-way sends merchant VAT number information and customer VAT number and verify if both are already registered to make intra-communitary operations with tax exemption.'),
                                    'hint' => $this->l('Only works with [Format + API system] validation system option selected.'),
                                    'name' => 'ADVANCEDVATMANAGER_VALIDATION_SYSTEM',
                                    'options' => array(
                                        'query' => array(
                                            array('id' => '1-way', 'name' => $this->l('Validation 1-way')),
                                            array('id' => '2-way', 'name' => $this->l('Validation 2-way')),
                                        ),
                                        'id' => 'id',
                                        'name' => 'name'
                                    )
                                ),
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Validation mode'),
                                    'desc' => $this->l('This option set the mode of VAT validation. Strict mode validates VAT numbers with correct format inserted by the customer (Ex: FR01609493). Smart mode validates VAT numbers even the format is not inserted correctly by the customer (Ex: FR-01609493, FR 01609493, FR01.609.493) and save as valid format (Ex: FR01609493). Also validates VAT numbers if the client missed iso code at beginning of the number.'),
                                    'name' => 'ADVANCEDVATMANAGER_VALIDATION_MODE',
                                    'options' => array(
                                        'query' => array(
                                            array('id' => 'strict', 'name' => $this->l('Strict mode')),
                                            array('id' => 'smart', 'name' => $this->l('Smart mode')),
                                        ),
                                        'id' => 'id',
                                        'name' => 'name'
                                    )
                                ),
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Validation type'),
                                    'desc' => $this->l('This option set the type of VAT validation. Format validation mode only validates VAT numbers format (Ex: FR01609493). Format + API validation validates VAT number format and verify it into Official systems API system (recommeded for VAT exemption).'),
                                    'name' => 'ADVANCEDVATMANAGER_VALIDATION_TYPE',
                                    'options' => array(
                                        'query' => array(
                                            array('id' => 'format', 'name' => $this->l('Format validation')),
                                            array('id' => 'api', 'name' => $this->l('Format + API system validation')),
                                        ),
                                        'id' => 'id',
                                        'name' => 'name'
                                    )
                                ),
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Company name validation'),
                                    'name' => 'ADVANCEDVATMANAGER_COMPANY_VALIDATION',
                                    'desc' => $this->l('If it is enabled, the company name field will be validated together with the information obtained from the Official systems system regarding the VAT number. If the customer does not type the company name similar (depends on accuracy level set) as it appears in the Official systems system database, the address will not be validated with this VAT number. The previous customers registered in database with company name not validated yet but valid VAT, they will be required to update the address information before making a purchase in the store. By activating this option, you can select the percentage of accuracy with which the system will check the company address entered by the client comparing it with the one registered in the official data.'),
                                    'hint' => $this->l('To avoid errors in the address forms, make sure that the "company" field is displayed in the form. If this option is enabled, this field will be as required in address form.'),
                                     'options' => array(
                                            'query' => $accuracy_options,
                                            'id' => 'id',
                                            'name' => 'name'
                                     ),
                                ),
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Company address validation'),
                                    'desc' => $this->l('This option checks that the address entered in the address form matches the one officially registered in the VAT number. If the address does not match, the system will not allow the address to be registered and will throw error messages in the corresponding field (address, city, zip code...). By activating this option, you can select the percentage of accuracy with which the system will check the company address entered by the client comparing it with the one registered in the official data.'),
                                    'hint' => $this->l('There are some VAT numbers for which no address is officially registered. In this case, the system will skip address validation.'),
                                    'name' => 'ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION',
                                    'options' => array(
                                            'query' => $accuracy_options,
                                            'id' => 'id',
                                            'name' => 'name'
                                    ),
                                ),
                                array(
                                    'type' => 'switch',
                                    'label' => $this->l('Auto-insert company name'),
                                    'name' => 'ADVANCEDVATMANAGER_COMPANY_AUTOINSERT',
                                    'desc' => $this->l('If enabled, when the customer registers an address with a valid VAT number, the system will insert the registered company name taken from the Official systems system. If the customer has entered another company name in the company field, it will be overwritten with the correct name registered in the system.'),
                                    'hint' => $this->l('This option is not compatible with [Company validation] option enabled.'),
                                    'values' => $switch
                                ),
                                array(
                                    'type' => 'switch',
                                    'label' => $this->l('Allow duplicated VAT'),
                                    'name' => 'ADVANCEDVATMANAGER_ALLOWDUPLICATED',
                                    'desc' => $this->l('This option enable or disable to allow different customer registrations with same VAT numbers.'),
                                    'values' => $switch
                                ),
                                array(
                                    'type' => 'switch',
                                    'label' => $this->l('Skip API system fail'),
                                    'name' => 'ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL',
                                    'desc' => $this->l('This option skips validation in case the Official systems API system fails during the validation process. Customer can continue with address registration and checkout. The VAT number will appear as [Validated] and the system status will appear in red color as [API request processing error] in VAT Management list.'),
                                    'hint' => $this->l('This option only works in API system validation.'),
                                    'values' => $switch
                                ),
                                array(
                                    'type' => 'switch',
                                    'label' => $this->l('Allow customer address registration with VAT invalid'),
                                    'name' => 'ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID',
                                    'desc' => $this->l('This option allows customer address registration in frontend even VAT number inserted is invalid. Customer will be not VAT exempt, but can register the address to place the order. It is useful for clients to register other company identification numbers other than the VAT number, or if you are using API systems or connectors to synchronize with POS or ERP using only one field to register these numbers.'),
                                    'values' => $switch
                                ),
                                array(
                                    'type' => 'switch',
                                    'label' => $this->l('Save in Uppercase'),
                                    'name' => 'ADVANCEDVATMANAGER_SAVETOUPPERCASE',
                                    'desc' => $this->l('Enable this option to save VAT number with letters in uppercase when add or update actions is performed by customer in address form. Ex: FR01609493 instead fr01609493'),
                                    'values' => $switch
                                ),
                                array(
                                    'type' => 'tags',
                                    'label' => $this->l('Blacklist'),
                                    'name' => 'ADVANCEDVATMANAGER_BLACKLIST',
                                    'desc' => $this->l('Set VAT numbers into a blacklist to not allow customer registration with some of these numbers. Write one per one separated by comma.'),
                                ), 
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'orderStatus_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Order status management'),
                        'icon' => 'fal fa-abacus'
                    ),
                    'description' => $this->l('The module will insert the status that has been configured in this section, when the customer places an order. In the case of the order status with the valid VAT number, this will be inserted first and just after the next status will be inserted depending on the payment options chosen in the purchase process. In the case of the status of the order with the VAT number pending validation due API process failure, it will be inserted as the last and current status of the order, so that the customer knows that his order is pending validation with the VAT number.'),
                    'input' => array(
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Order status when VAT is validated'),
                                    'desc' => $this->l('This option configures the status of the order when the VAT number is validated successfully. This status will be displayed at the beginning, just before the default status when ordering. Set [Disable] to disable the option'),
                                    'hint' => $this->l('The module has created it own state called "VAT number validated". But you can use any custom state.'),
                                    'name' => 'ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS',
                                    'options' => array(
                                        'query' => $order_states,
                                        'id' => 'id',
                                        'name' => 'name'
                                    )
                                ),
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Order status when API system fails'),
                                    'desc' => $this->l('This option configures the status of the order when the API system has failed to validate the customer VAT number when the [Skip validation] option has been activated and the customer has been able to continue with the order. Set [Disable] to disable the option'),
                                    'hint' => $this->l('The module has created it own state called "VAT number pending validation". But you can use any custom state.'),
                                    'name' => 'ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS',
                                    'options' => array(
                                        'query' => $order_states,
                                        'id' => 'id',
                                        'name' => 'name'
                                    )
                                ),
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'groupManagement_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Customer group assignment by country'),
                        'icon' => 'fal fa-users'
                    ),
                    'description' => $this->context->smarty->fetch($this->local_path . 'views/templates/admin/groupassignment_description.tpl'),
                    'input' => $groupAssignment,
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'exemption_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('VAT exemption settings'),
                        'icon' => 'fal fa-percentage'
                    ),
                    'description' => $this->l('The system will proceed to validate all the addresses created by the client as long as it meets the conditions for validation, regardless of whether the type of address has been chosen in the option shown in this section. This option is only to determine if the customer will be tax exempt when choosing the address in the checkout process.'),
                    'input' => array(
                                array(
                                    'type' => 'switch',
                                    'label' => $this->l('VAT exemption'),
                                    'name' => 'ADVANCEDVATMANAGER_VATEXEMPTION',
                                    'desc' => $this->l('This option allows you to remove taxes from customers with a valid VAT number. Works for any type of validation (format or API system).'),
                                    'hint' => $this->l('The prices of the products and the amounts of the shopping cart will be shown without taxes.'),
                                    'values' => $switch
                                ),
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Address type'),
                                    'name' => 'ADVANCEDVATMANAGER_ADDRESS_TYPE',
                                    'desc' => $this->l('This option allows you to remove taxes from customers with a valid VAT number in determined address type (delivery address, invoice address or both).'),
                                    'hint' => $this->l('If the "invoice address and delivery address" option is chosen, it will be exempt from taxes if one of the two addresses or both have a valid VAT number.'),
                                    'options' => array(
                                        'query' => array(
                                            array('id' => 'id_address_invoice', 'name' => $this->l('Invoice address')),
                                            array('id' => 'id_address_delivery', 'name' => $this->l('Delivery address')),
                                            array('id' => 'both', 'name' => $this->l('Invoice and Delivery address')),
                                        ),
                                        'id' => 'id',
                                        'name' => 'name'
                                    )
                                ),
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('Local country'),
                                    'name' => 'ADVANCEDVATMANAGER_LOCAL_COUNTRY',
                                    'desc' => $this->l('This option allows you to assign your home country where product prices and orders will always be subject to tax for this country.'),
                                    'options' => array(
                                        'query' => $countries_2,
                                        'id' => 'id',
                                        'name' => 'name'
                                    ),
                                ),
                                array(
                                    'type' => 'checkbox',
                                    'size' => 10,
                                    'label' => $this->l('Customer groups exemption'),
                                    'name' => 'ADVANCEDVATMANAGER_GROUP_VATEXEMPTION',
                                    'desc' => $this->l('This option allows you to remove taxes for certain customers groups even if VAT number is valid or not. Leave empty to disable it for all customers groups. If check any group, the tax exemption will be only applied for customer of selected groups. This option is completely independent of the [VAT exemption] option.'),
                                    'multiple' => true,
                                    'values' => array(
                                        'query' => $customer_groups,
                                        'id' => 'id',
                                        'name' => 'name'
                                    ),
                                ),
                                
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'invoice_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Invoice settings'),
                        'icon' => 'fal fa-file-invoice'
                    ),
                    'description' => $this->l('When a custom text for invoices is configured from this section, the module will include these texts in the orders that it detects are tax exempt and whenever that order has been generated after the installation of the module. If you want the module to include the texts in invoices of previous orders, you must import the orders from the [Orders Management] section.'),
                    'input' => array(
                        array(
                            'type' => 'textarea',
                            'lang' => true,
                            'label' => $this->l('Invoice legal text'),
                            'name' => 'ADVANCEDVATMANAGER_LEGAL_TEXT',
                            'desc' => $this->l('Add the legal text in invoice from a order with VAT exempt. The text will be added below to default legal text.')
                        ),
                        array(
                            'type' => 'textarea',
                            'lang' => true,
                            'autoload_rte' => true,
                            'label' => $this->l('Invoice note'),
                            'name' => 'ADVANCEDVATMANAGER_INVOICE_NOTE',
                            'desc' => $this->l('Add note in invoice from a order with VAT exempt. The text will be added above to added notes.')
                        ),  
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'field_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('VAT field settings'),
                        'icon' => 'fal fa-tags'
                    ),
                    'description' => $this->l('These options will be applied only for countries selected for validation in [Activation] tab.').'<br />'.$this->l('NOTE: These options are not applied in the validation of VAT numbers from the Back-office.'),
                    'warning' => $this->l('Only the checkout modules that we have integrated to 100% are compatible with the options in this section. Some of these options may not work with other checkout modules, even those that are supported by this module and that we mention in the compatibility list. This is because generally the modules that manage the checkout page use their own options and controllers to manage the fields that are displayed in the checkout process of their module.'),
                    'input' => array(
                                array(
                                    'type' => 'select',
                                    'label' => $this->l('VAT field'),
                                    'desc' => $this->l('Select to convert field in optional or required.'),
                                    'hint' => $this->l('This option works only for countries selected for the validation.'),
                                    'name' => 'ADVANCEDVATMANAGER_VATFIELD',
                                    'options' => array(
                                        'query' => array(
                                            array('id' => 'optional', 'name' => $this->l('Optional field')),
                                            array('id' => 'required', 'name' => $this->l('Required field')),
                                        ),
                                        'id' => 'id',
                                        'name' => 'name'
                                    )
                                ),
                                array(
                                    'type' => 'switch',
                                    'label' => $this->l('Display only for company'),
                                    'name' => 'ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY',
                                    'desc' => $this->l('Activate this option to display VAT number field only when customers insert a company name. Hide the VAT number field when no company name and althought you select this field as required, it will be turn into optional.'),
                                    'hint' => $this->l('This option only works in front office. The company field will be displayed in address form but in backoffice in any case.'),
                                    'values' => $switch
                                ),
                                array(
                                    'type' => 'text',
                                    'lang' => true,
                                    'label' => $this->l('Label'),
                                    'name' => 'ADVANCEDVATMANAGER_FIELD_LABEL',
                                    'desc' => $this->l('Customize the VAT number field label. Leave empty for default label.')
                                ),
                                array(
                                    'type' => 'text',
                                    'lang' => true,
                                    'label' => $this->l('Legend'),
                                    'name' => 'ADVANCEDVATMANAGER_FIELD_LEGEND',
                                    'desc' => $this->l('Customize the VAT number field legend. It is located below to the input. Leave empty for default label.')
                                ), 
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'bretxit_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Brexit settings'),
                        'image' => '../modules/advancedvatmanager/views/img/united-kingdom.png',
                    ),
                    'description' => $this->context->smarty->fetch($this->local_path . 'views/templates/admin/brexit_description.tpl'),
                    'warning' => sprintf($this->l('The amount of %s is the threshold for VAT exemption in UK VAT numbers. The exchange rate should be updated dialy by CRON task or in currency section.'), $this->getCurrencyAmount('GBP', AVM_BREXIT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign)),
                    'input' => array(
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Brexit'),
                            'name' => 'ADVANCEDVATMANAGER_BREXIT_ENABLED',
                            'is_bool' => true,
                            'desc' => $this->l('Active Brexit tax rules for exportations to United Kindom country.'),
                            'identifier' => 'id',
                            'values' => $switch
                        ), 
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Vat exemption in companies'),
                            'name' => 'ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP',
                            'is_bool' => true,
                            'desc' => $this->l('This option allows to be vat exemption for companies with a valid UK VAT number when cart total products amount is equal to or less than 135 GBP'),
                            'identifier' => 'id',
                            'values' => $switch
                        ),
                        array(
                            'type' => 'select',
                            'label' => $this->l('Not allow orders'),
                            'name' => 'ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS',
                            'desc' => $this->l('This option allows you to choose between not allowing purchases of amounts less than 135 GBP or greater than 135 GBP.'),
                            'options' => array(
                                    'query' => array(
                                        array('id' => 0, 'name' => $this->l('Disabled')),
                                        array('id' => 1, 'name' => $this->l('Over 135 GBP')),
                                        array('id' => 2, 'name' => $this->l('Below 135 GBP')),
                                    ),
                                    'id' => 'id',
                                    'name' => 'name'
                            )
                        ),
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'voec_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('VOEC (Norway) settings'),
                        'image' => '../modules/advancedvatmanager/views/img/norway.png',
                    ),
                    'description' => $this->context->smarty->fetch($this->local_path . 'views/templates/admin/voec_description.tpl'),
                    'warning' => sprintf($this->l('The amount of %s is the threshold in each product for collect VAT in point of sale. The exchange rate should be updated dialy by CRON task or in currency section.'), $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign)),
                    'input' => array(
                        array(
                            'type' => 'switch',
                            'label' => $this->l('VOEC'),
                            'name' => 'ADVANCEDVATMANAGER_VOEC_ENABLED',
                            'is_bool' => true,
                            'desc' => $this->l('Active VOEC registration tax rules for exportations to Norway country.'),
                            'hint' => $this->l('Activate this option only if you have already registered with the VOEC and have been assigned a VOEC number, otherwise sales made under VOEC rules to Norway would not be valid or legal.'),
                            'identifier' => 'id',
                            'values' => $switch
                        ), 
                        array(
                            'type' => 'select',
                            'label' => $this->l('VOEC mode'),
                            'name' => 'ADVANCEDVATMANAGER_VOEC_MODE',
                            'desc' => $this->l('Depending on the preferences you choose to make sales and shipments of products that are within the VOEC scheme and those that are not, you can choose the most appropriate mode.'),
                            'options' => array(
                                    'query' => array(
                                        array('id' => 1, 'name' => $this->l('Standard mode')),
                                        array('id' => 2, 'name' => $this->l('Bundling mode')),
                                    ),
                                    'id' => 'id',
                                    'name' => 'name'
                            )
                        ),
                        array(
                            'type' => 'select',
                            'label' => $this->l('Non VOEC products in shopping cart'),
                            'name' => 'ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC',
                            'desc' => $this->l('This option does not allow products that do not fall under the VOEC regulation to be added to the cart for customers or companies residing in the country Norway. Disable to maintain the default behavior of the selected VOEC mode.'),
                            'options' => array(
                                    'query' => array(
                                        array('id' => 0, 'name' => $this->l('Disabled')),
                                        array('id' => 'all', 'name' => $this->l('Do not allow for consumers and companies, even with a valid VOEC number')),
                                        array('id' => 'company', 'name' => $this->l('Do not allow for companies with a valid VOEC number')),
                                        array('id' => 'consumer', 'name' => $this->l('Do not allow for consumers')),
                                    ),
                                    'id' => 'id',
                                    'name' => 'name'
                            )
                        ), 
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'email_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('Email settings'),
                        'icon' => 'far fa-envelope'
                    ),
                    'input' => array(
                        array(
                            'type' => 'tags',
                            'label' => $this->l('Email addresses'),
                            'name' => 'ADVANCEDVATMANAGER_EMAIL_ADDRESS',
                            'desc' => $this->l('You can set different email addresses to receive emails from this module. You must write a correct email address. For multiple addresses, you must write them separated with comma (Ex: test@test.com,test2@test2.com...).'),
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('API alert email'),
                            'name' => 'ADVANCEDVATMANAGER_SENDAPIALERT',
                            'is_bool' => true,
                            'desc' => $this->l('Send email alerting when customer is registered and VAT validation by API system fails.'),
                            'identifier' => 'id',
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Send email to client when API fails'),
                            'name' => 'ADVANCEDVATMANAGER_SEND_CUSTOMER_EMAIL_API_FAIL_ORDER',
                            'is_bool' => true,
                            'desc' => $this->l('Send email to the customer notifying them that the status of the order is pending to validate the VAT number, when placing an order with an address where the VAT number could not be validated due to an API system failure and the [Skip validation] option has been activated in the validation settings section allowing the customer to continue with the registration of the address and the order.'),
                            'identifier' => 'id',
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Customer validation email'),
                            'name' => 'ADVANCEDVATMANAGER_SENDEMAILVALIDATION',
                            'is_bool' => true,
                            'desc' => $this->l('Send email informing when customer is registered and VAT validation by API system is performed sucessfully.'),
                            'identifier' => 'id',
                            'values' => $switch
                        ),
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
            'checkvatcron_tab' => array(
                'form' => array(
                    'legend' => array(
                        'title' => $this->l('CRON settings for checking VAT numbers'),
                        'icon' => 'fal fa-calendar-alt'
                    ),
                    'description' => $this->context->smarty->fetch($this->local_path . 'views/templates/admin/checkvatcron.tpl'),
                    'input' => array(
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Continue scan process from last address scanned'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SCANFROMLAST',
                            'is_bool' => true,
                            'desc' => $this->l('This option must be enabled if you want the system to continue scanning from the last address scanned. This is useful when the last scanning process failed or if you do not want the system to rescan from the first address saved in the database.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Skip API system fail'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SKIPAPISYSTEMFAIL',
                            'is_bool' => true,
                            'desc' => $this->l('This option skips validation in case the Official systems API system fails during the validation process. The VAT number will appear as [Validated] and the system status will appear in red color as [API request processing error] in VAT Management list.'),
                            'hint' => $this->l('This option only works in API system validation.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Delete empty VAT number'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_DELETE_EMPTY',
                            'is_bool' => true,
                            'desc' => $this->l('Delete customer address with empty VAT number if the field is required.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Delete invalid VAT number'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_DELETE_INVALID',
                            'is_bool' => true,
                            'desc' => $this->l('Delete customer address with invalid VAT number.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Delete duplicated VAT number'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_DELETE_DUPLICATED',
                            'is_bool' => true,
                            'desc' => $this->l('Delete customer address with duplicated VAT number. The system will leave only the first address created and will delete the rest with duplicated VAT number if duplicated VAT is not allowed.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Send email for invalid VAT number'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID',
                            'is_bool' => true,
                            'desc' => $this->l('Sends email to customers with invalid VAT number.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Send email for empty VAT number'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY',
                            'is_bool' => true,
                            'desc' => $this->l('Sends email to customers with empty VAT number if the field is required.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Send email for duplicated VAT number'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SENDEMAIL_DUPLICATED',
                            'is_bool' => true,
                            'desc' => $this->l('Sends email to customers with duplicated VAT number if duplicated VAT is not allowed.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Customer group assignation'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_ASSIGN_GROUP',
                            'is_bool' => true,
                            'desc' => $this->l('Manages client groups as configured in the [Client Group Assignment] section.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Send email for invalid company name'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANY',
                            'is_bool' => true,
                            'desc' => $this->l('Sends email to customers with VAT number valid but company name not registered in Official systems.'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Send email for empty company name'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY_COMPANY',
                            'is_bool' => true,
                            'desc' => $this->l('Sends email to customers with VAT number valid but company name empty'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Send email for invalid or not validated company address'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANYADDRESS',
                            'is_bool' => true,
                            'desc' => $this->l('Sends email to customers with VAT number valid but company address is invalid or not validated yet'),
                            'values' => $switch
                        ),
                        array(
                            'type' => 'switch',
                            'label' => $this->l('Auto-insert registered company name'),
                            'name' => 'ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY',
                            'is_bool' => true,
                            'desc' => $this->l('The system will insert the registered company name in Official systems for customers who have a valid VAT number.'),
                            'hint' => $this->l('This action will overwrite the company name that the customer already has saved in the address and replace it with the company name that is registered with Official systems.'),
                            'values' => $switch
                        ),
                    ),
                    'submit' => array(
                        'title' => $this->l('Save')
                    )
                ),
            ),
        );
        
        return $config_form;
    }

    /**
     * AdvancedVatManager::getConfigFormValues()
     * Set values for the inputs.
     * @return
     */
    protected function getConfigFormValues()
    {
        $label = array();
        $legend = array();
        $legal_text = array();
        $invoice_note = array();
        $custom_text_product_price = array();
        $custom_text_product_price_tax_exempt = array();
        $product_label_tax_exempt = array();
        $config_fields_2 = array();
        /* Table title for multiple languages */
        foreach (Language::getLanguages(false) as $language) {
            $label[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_FIELD_LABEL_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_FIELD_LABEL', $language['id_lang']));
            $legend[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_FIELD_LEGEND_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_FIELD_LEGEND', $language['id_lang']));
            $legal_text[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_LEGAL_TEXT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_LEGAL_TEXT', $language['id_lang']));
            $invoice_note[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_INVOICE_NOTE_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_INVOICE_NOTE', $language['id_lang']));
            $custom_text_product_price_tax_exempt[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT', $language['id_lang']));
            $custom_text_product_price[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT', $language['id_lang']));
            $product_label_tax_exempt[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT', $language['id_lang']));           
        }
        
        $countries = CustomersVAT::getCountriesIDForValidation();
        if (!empty($countries)) {
            foreach ($countries as $country) {
                $config_fields_2['ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$country] = Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$country);
            }
        }
        
        $config_fields = array(
            'ADVANCEDVATMANAGER_ADMINVALIDATION' => Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION'),
            'ADVANCEDVATMANAGER_FRONTVALIDATION' => Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION'),
            'ADVANCEDVATMANAGER_DISABLE_FORMODULES[]' => json_decode(Configuration::get('ADVANCEDVATMANAGER_DISABLE_FORMODULES'), true),
            'ADVANCEDVATMANAGER_DISPLAY_WARNING_MESSAGE_ADDRESS' => Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WARNING_MESSAGE_ADDRESS'),
            'ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION' => Configuration::get('ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION'),
            'ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT' => $product_label_tax_exempt,
            'ADVANCEDVATMANAGER_COUNTRY[]' => json_decode(Configuration::get('ADVANCEDVATMANAGER_COUNTRY'), true),
            'ADVANCEDVATMANAGER_EMAIL_ADDRESS' => Configuration::get('ADVANCEDVATMANAGER_EMAIL_ADDRESS'),
            'ADVANCEDVATMANAGER_SENDAPIALERT' => Configuration::get('ADVANCEDVATMANAGER_SENDAPIALERT'),
            'ADVANCEDVATMANAGER_SEND_CUSTOMER_EMAIL_API_FAIL_ORDER' => Configuration::get('ADVANCEDVATMANAGER_SEND_CUSTOMER_EMAIL_API_FAIL_ORDER'),
            'ADVANCEDVATMANAGER_SENDEMAILVALIDATION' => Configuration::get('ADVANCEDVATMANAGER_SENDEMAILVALIDATION'),
            'ADVANCEDVATMANAGER_VALIDATION_MODE' => Configuration::get('ADVANCEDVATMANAGER_VALIDATION_MODE'),
            'ADVANCEDVATMANAGER_VATFIELD' => Configuration::get('ADVANCEDVATMANAGER_VATFIELD'),
            'ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY' => Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY'),
            'ADVANCEDVATMANAGER_ALLOWDUPLICATED' => Configuration::get('ADVANCEDVATMANAGER_ALLOWDUPLICATED'),
            'ADVANCEDVATMANAGER_FIELD_LABEL' => $label,
            'ADVANCEDVATMANAGER_FIELD_LEGEND' => $legend,
            'ADVANCEDVATMANAGER_LEGAL_TEXT' => $legal_text, 
            'ADVANCEDVATMANAGER_INVOICE_NOTE' => $invoice_note,
            'ADVANCEDVATMANAGER_BLACKLIST' => Configuration::get('ADVANCEDVATMANAGER_BLACKLIST'),
            'ADVANCEDVATMANAGER_SAVETOUPPERCASE' => Configuration::get('ADVANCEDVATMANAGER_SAVETOUPPERCASE'),
            'ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL' => Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL'),
            'ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID' => Configuration::get('ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID'),
            'ADVANCEDVATMANAGER_VALIDATION_TYPE' => Configuration::get('ADVANCEDVATMANAGER_VALIDATION_TYPE'),
            'ADVANCEDVATMANAGER_COMPANY_VALIDATION' => Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION'),
            'ADVANCEDVATMANAGER_COMPANY_AUTOINSERT' => Configuration::get('ADVANCEDVATMANAGER_COMPANY_AUTOINSERT'),
            'ADVANCEDVATMANAGER_VATEXEMPTION' => Configuration::get('ADVANCEDVATMANAGER_VATEXEMPTION'),
            'ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION' => Configuration::get('ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION'),
            'ADVANCEDVATMANAGER_LOCAL_COUNTRY' => Configuration::get('ADVANCEDVATMANAGER_LOCAL_COUNTRY'),
            'ADVANCEDVATMANAGER_MERCHANT_VAT' => Configuration::get('ADVANCEDVATMANAGER_MERCHANT_VAT'),
            'ADVANCEDVATMANAGER_VALIDATION_SYSTEM' => Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM'),
            'ADVANCEDVATMANAGER_GROUP_VATEXEMPTION' => Configuration::get('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION'),
            'ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS' => Configuration::get('ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS'),               
            'ADVANCEDVATMANAGER_BREXIT_ENABLED' => Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED'),  
            'ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP' => Configuration::get('ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP'), 
            'ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS' => Configuration::get('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS'),
            'ADVANCEDVATMANAGER_VOEC_ENABLED' => Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED'),
            'ADVANCEDVATMANAGER_VOEC_MODE' => Configuration::get('ADVANCEDVATMANAGER_VOEC_MODE'),   
            'ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC' => Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC'),      
            'ADVANCEDVATMANAGER_CRON_ASSIGN_GROUP' => Configuration::get('ADVANCEDVATMANAGER_CRON_ASSIGN_GROUP'), 
            'ADVANCEDVATMANAGER_CRON_SENDEMAIL_DUPLICATED' => Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_DUPLICATED'), 
            'ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY' => Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY'),  
            'ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID' => Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID'), 
            'ADVANCEDVATMANAGER_CRON_DELETE_DUPLICATED' => Configuration::get('ADVANCEDVATMANAGER_CRON_DELETE_DUPLICATED'), 
            'ADVANCEDVATMANAGER_CRON_DELETE_INVALID' => Configuration::get('ADVANCEDVATMANAGER_CRON_DELETE_INVALID'), 
            'ADVANCEDVATMANAGER_CRON_DELETE_EMPTY' => Configuration::get('ADVANCEDVATMANAGER_CRON_DELETE_EMPTY'),           
            'ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANY' => Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANY'),
            'ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY_COMPANY' => Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY_COMPANY'),
            'ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANYADDRESS' => Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANYADDRESS'),
            'ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY' => Configuration::get('ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY'),
            'ADVANCEDVATMANAGER_CRON_SCANFROMLAST' => Configuration::get('ADVANCEDVATMANAGER_CRON_SCANFROMLAST'),
            'ADVANCEDVATMANAGER_CRON_SKIPAPISYSTEMFAIL' => Configuration::get('ADVANCEDVATMANAGER_CRON_SKIPAPISYSTEMFAIL'),          
            'ADVANCEDVATMANAGER_CHANGE_DEFAULT_GROUP_WITHADDRESS' => Configuration::get('ADVANCEDVATMANAGER_CHANGE_DEFAULT_GROUP_WITHADDRESS'), 
            'ADVANCEDVATMANAGER_ADDRESS_TYPE' => Configuration::get('ADVANCEDVATMANAGER_ADDRESS_TYPE'),
            'ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS' => Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS'),
            'ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS' => Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS'),
            'ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT' => $custom_text_product_price_tax_exempt,
            'ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT' => $custom_text_product_price,
            'ADVANCEDVATMANAGER_DISPLAY_PRODUCT_PRICE_MODE' => Configuration::get('ADVANCEDVATMANAGER_DISPLAY_PRODUCT_PRICE_MODE'),
            'ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION' => Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION'), 
            'ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY' => Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY'),
            'ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER' => Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER')    
        );
        
        $config_fields = array_merge($config_fields, $config_fields_2);
        
        $all_opts = Group::getGroups($this->context->language->id);
        $id_checkbox_options = array();
        foreach ($all_opts as $option) {
            $id_checkbox_options[] = $option['id_group'];   
        }
        // get checkbox stuff from $_POST
        $id_checkbox_options_post = array();
        foreach ($id_checkbox_options as $opt_id) {
            if (Tools::getValue('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION_' . (int) $opt_id)) {
                $id_checkbox_options_post['ADVANCEDVATMANAGER_GROUP_VATEXEMPTION_' . (int) $opt_id] = true;
            }
        }
        //get checkbox stuff from Configuration
        $id_checkbox_options_config = array();
        
        if (Configuration::get('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION') != '') {
            $config = explode(',', Configuration::get('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION'));
        } 
        else {
            $config = array();
        } 
        foreach ($config as $conf) {
            $id_checkbox_options_config['ADVANCEDVATMANAGER_GROUP_VATEXEMPTION_' . (int) $conf] = true;    
        }
        //return only common values and value from post
        if (((bool) Tools::isSubmit('submit_'.$this->name)) == true) {
            $config_fields = array_merge($config_fields, array_intersect($id_checkbox_options_post, $id_checkbox_options_config));
        } else {
            $config_fields = array_merge($config_fields, $id_checkbox_options_config);
        }             
        return $config_fields;   
    }

    /**
     * AdvancedVatManager::postProcess()
     * Save form data.
     * @return
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();
        $label = array();
        $legend = array();
        $legal_text = array();
        $invoice_note = array();
        $custom_text_product_price = array();
        $custom_text_product_price_tax_exempt = array();
        $product_label_tax_exempt = array();
        $all_opts = Group::getGroups($this->context->language->id);
        $checkbox_options = array();
        
        foreach (array_keys($form_values) as $key) {
            $aux = array();
            $ve = new ValidationEngine(Tools::getValue($key));
            if ($key == 'ADVANCEDVATMANAGER_COUNTRY[]') {
                $uk_id = Country::getByIso('GB');
                $norw_id = Country::getByIso('NO');
                $countries_id = Tools::getValue('ADVANCEDVATMANAGER_COUNTRY');
                $uk_pos = array_search($uk_id, $countries_id);
                $norw_pos = array_search($norw_id, $countries_id);
                if (Tools::getValue('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 1 && $uk_id) {
                    if ($uk_pos === false) {
                        $countries_id[] = $uk_id;   
                    }  
                }
                if (Tools::getValue('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1 && $norw_id) {
                    if ($norw_pos === false) {
                        $countries_id[] = $norw_id;   
                    }  
                }
                else {
                    if ($norw_pos) {
                        unset($countries_id[$norw_pos]);   
                    } 
                }
                Configuration::updateValue('ADVANCEDVATMANAGER_COUNTRY', json_encode($countries_id)); 
            }
            else if ($key == 'ADVANCEDVATMANAGER_DISABLE_FORMODULES[]') {
                Configuration::updateValue('ADVANCEDVATMANAGER_DISABLE_FORMODULES', json_encode(Tools::getValue('ADVANCEDVATMANAGER_DISABLE_FORMODULES'))); 
            }
            else if ($key == 'ADVANCEDVATMANAGER_MERCHANT_VAT' && Tools::getValue($key) && Configuration::get($key) != Tools::getValue($key)) {
                if ($ve->getrequesterVatIso() != 'GB') {
                    ValidationEngine::$skip_api_fails = false; // Disable skip validation when API system fails.
                    if ($ve->vatValidationVies()) {
                        Configuration::updateValue($key, Tools::getValue($key));
                        $this->output .= $this->adminDisplayInformation($ve->getMessage());    
                    }
                    else {
                        $this->output .= $this->displayError($ve->getMessage());       
                    }     
                }
                else {
                    Configuration::updateValue($key, '');
                    $this->output .= $this->displayError($this->l('The merchant VAT number cannot be from the UK.'));          
                }
            }
            else if ($key == 'ADVANCEDVATMANAGER_EMAIL_ADDRESS' && Tools::getValue($key)) {
                $emails = explode(',', Tools::getValue($key));
                foreach ($emails as $email) {
                    if (!Validate::isEmail($email)) {
                        $this->output .= $this->adminDisplayWarning(sprintf($this->l('The email address %s is not a valid format.'), $email));     
                    }
                    else {
                        $aux[] = $email;
                    }
                    Configuration::updateValue($key, implode(',',$aux));        
                }   
            }
            else if ($key == 'ADVANCEDVATMANAGER_BLACKLIST' && Tools::getValue($key)) {
                $blacklist = explode(',', Tools::getValue($key));
                foreach ($blacklist as $element) {
                    if (!Validate::isString($element) || !$ve->basicFormatValidation($element)) {
                        $this->output .= $this->adminDisplayWarning(sprintf($this->l('The number %s is not a valid format.'), $element));     
                    }
                    else {
                        $aux[] = $element;
                    }
                            
                }
                Configuration::updateValue($key, implode(',',$aux));   
            }           
            else {
                Configuration::updateValue($key, Tools::getValue($key));     
            }
        }
        
        /* Input text for multiple languages */
        foreach (Language::getLanguages(false) as $language) {
            $label[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_FIELD_LABEL_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_FIELD_LABEL', $language['id_lang']));
            $legend[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_FIELD_LEGEND_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_FIELD_LEGEND', $language['id_lang']));
            $legal_text[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_LEGAL_TEXT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_LEGAL_TEXT', $language['id_lang']));
            $invoice_note[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_INVOICE_NOTE_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_INVOICE_NOTE', $language['id_lang']));
            $custom_text_product_price_tax_exempt[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT', $language['id_lang']));
            $custom_text_product_price[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT', $language['id_lang']));
            $product_label_tax_exempt[$language['id_lang']] = Tools::getValue('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT_' . $language['id_lang'], Configuration::get('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT', $language['id_lang']));  
        }
        foreach ($all_opts as $chbx_options) {
            if (Tools::getValue('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION_' . (int) $chbx_options['id_group'])) {
                $checkbox_options[] = $chbx_options['id_group'];
                Configuration::updateValue('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION', implode(',', $checkbox_options));
            }
        }
        Configuration::updateValue('ADVANCEDVATMANAGER_FIELD_LABEL', $label);
        Configuration::updateValue('ADVANCEDVATMANAGER_FIELD_LEGEND', $legend);
        Configuration::updateValue('ADVANCEDVATMANAGER_LEGAL_TEXT', $legal_text);
        Configuration::updateValue('ADVANCEDVATMANAGER_INVOICE_NOTE', $invoice_note, true);
        Configuration::updateValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT', $custom_text_product_price_tax_exempt, true);
        Configuration::updateValue('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT', $custom_text_product_price, true);
        Configuration::updateValue('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT', $product_label_tax_exempt);
        
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')== 1 || Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            $this->checkAddressFormat();
            $this->checkAvailableCurrency();
            $this->checkIncompatibleOptions();
        }
        
        ValidationEngine::cleanCache();
    }
    
    /**
     * AdvancedVatManager::checkAvailableCurrency()
     * Checks available currency and installed
     * @return
     */
    public function checkAvailableCurrency()
    {
        if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 1) {
            if (!Currency::getIdByIsoCode('GBP', $this->context->shop->id, true)) {
                $this->output .= $this->adminDisplayWarning($this->l('The GBP(pound) currency should be installed (active or not active) in order to work with Brexit option.'));     
            }
        }
        if (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1) {
            if (!Currency::getIdByIsoCode('NOK', $this->context->shop->id, true)) {
                $this->output .= $this->adminDisplayWarning($this->l('The NOK(Norwegian krone) currency should be installed (active or not active) in order to work with VOEC option.'));     
            }
        }
    }
    
    /**
     * AdvancedVatManager::checkIncompatibleOptions()
     * Checks incompatible options selected
     * @return
     */
    public function checkIncompatibleOptions()
    {
        if (Configuration::get('ADVANCEDVATMANAGER_MERCHANT_VAT') == '' && Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM') == '2-way') {
            $this->output .= $this->adminDisplayWarning($this->l('The validation system is set to 2-ways. This option requires to be set a valid Merchant VAT number located into [General settings], otherwise errors will arise when validating VAT numbers by clients'));     
        }
        // Checks if scan process has been performed first time.
        if (CustomersVAT::getCustomerAddresses() && CustomersVAT::isEmptyVATList()) {
            $this->adminDisplayWarning($this->l('The VAT number scan has not yet been carried out in the section [customers -> VAT Management]. Scanning is required to verify and validate VAT numbers which are already in the database before the module was installed.'));    
        }
    }
    
    /**
     * AdvancedVatManager::getCountriesID()
     * Gets EU Countries ID
     * @return
     */
    public function getCountriesID()
    {
        $countries = array();
        foreach (self::getEuropeanCountryID() as $country_id) {
            if (Configuration::get('PS_COUNTRY_DEFAULT') && $country_id == (int)Configuration::get('PS_COUNTRY_DEFAULT')) {
                continue;    
            }
            $countries[] = $country_id;    
        }
        foreach (ValidationEngine::$brexit_countries_iso as $iso) {
            $country_id = Country::getByIso($iso);
            if (Configuration::get('PS_COUNTRY_DEFAULT') && $country_id == (int)Configuration::get('PS_COUNTRY_DEFAULT')) {
                continue;    
            }
            $countries[] = Country::getByIso($iso);    
        }
        if (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1) {
            foreach (ValidationEngine::$voec_countries_iso as $iso) {
                $country_id = Country::getByIso($iso);
                if (Configuration::get('PS_COUNTRY_DEFAULT') && $country_id == (int)Configuration::get('PS_COUNTRY_DEFAULT')) {
                    continue;    
                }
                $countries[] = Country::getByIso($iso);    
            }
        }
        return json_encode($countries);
    }
    
    /**
     * AdvancedVatManager::getGB135currencyAmount()
     * Gets The currency amount
     * @return
     */
    public function getCurrencyAmount($currency_iso, $value)
    {
        $id_currency = Currency::getIdByIsoCode($currency_iso, $this->context->shop->id, true);
        $amount = 0;
        if ($this->context->currency->id == $id_currency) {
            $amount = $value; 
        }
        else {
            $currency = new Currency($id_currency);
            if (method_exists($currency, 'getConversionRate')) {
                $amount = $value/$currency->getConversionRate()*($this->context->currency->id != Currency::getDefaultCurrency()->id?$this->context->currency->getConversionRate():1);    
            }
            else {
                $amount = $value/$currency->conversion_rate*($this->context->currency->id != Currency::getDefaultCurrency()->id?$this->context->currency->getConversionRate():1);
            }
        }
        if (method_exists('Tools', 'ps_round')) {
            return Tools::ps_round($amount, 2); 
        }
        else {
            return round($amount, 2); 
        }       
    }
    
    /**
     *AdvancedVatManager::checkNotAllowCheckoutVOEC()
     * Checks products in cart to get if there is VOEC or non VOEC products inside and not allow checkout
     * @param array $products Array with product prices
     * @param float $total_cart
     * @return true if not allow checkout
     */
    public function checkNotAllowCheckoutVOEC($products = false, $total_cart = false)
    {
        if ($total_cart && $products) {
            // More than 3.000 NOK
            if ((float)$total_cart > $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT)) {
                // Checks product prices
                // 3.000 or higher product price then there is a non VOEC product.
                if (max($products) >= $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT) && min($products) < $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT)) {
                    // Option to not allow bundling and not allow checkour until non VOEC product is deleted.
                    if (Configuration::get('ADVANCEDVATMANAGER_VOEC_MODE') == 1) {
                        return true;        
                    } 
                } 
            }
        }
        return false;
    }
    
    /**
     *AdvancedVatManager::checkNotAllowCheckoutBrexit()
     * Checks not allow order in Brexit conditions return true if not allow checkout
     * @param float $total_cart Total cart amount
     * @return true if not allow checkout
     */
    public function checkNotAllowCheckoutBrexit($total_cart)
    {
        if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS') != 0) {
            if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS') == 1?(float)$total_cart > $this->getCurrencyAmount('GBP', AVM_BREXIT_LIMIT):(float)$total_cart < $this->getCurrencyAmount('GBP', AVM_BREXIT_LIMIT)) { 
                return true;    
            } 
        }
        return false;
    }
    
    public function checkAddressFormat()
    {
        if (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION') ||Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')) {
            $countries = CustomersVAT::getCountriesIDForValidation();
            if (!empty($countries)) {
                foreach ($countries as $idCountry) {
                    $country_name = Country::getNameById($this->context->language->id, $idCountry);
                    $country_iso = Country::getIsoById($idCountry);
                    $addressForm = AddressFormat::getOrderedAddressFields($idCountry);
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') && !in_array('company', $addressForm)) {
                        $this->adminDisplayWarning(sprintf($this->l('The country %s does not have the [company] field in the address format. To avoid errors in the validation of this field, edit the country by adding this field to your address format.'), $country_name));    
                    }
                    if (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required' && $idCountry != Configuration::get('ADVANCEDVATMANAGER_LOCAL_COUNTRY') && !in_array('vat_number', $addressForm)) {
                        $this->adminDisplayWarning(sprintf($this->l('The country %s does not have the [vat_number] field in the address format. To avoid errors in the validation of this field, edit the country by adding this field to your address format.'), $country_name));    
                    }
                    if ((Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1 && $country_iso == 'NO') || (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 1 && $country_iso == 'GB')) {
                        if (!in_array('State:name', $addressForm)) {
                            $this->adminDisplayWarning(sprintf($this->l('The country %s does not have the [State:name] field in the address format. To avoid errors in the validation of this field, edit the country by adding this field to your address format.'), $country_name));  
                        }
                        if (!in_array('vat_number', $addressForm)) {
                            $this->adminDisplayWarning(sprintf($this->l('The country %s does not have the [vat_number] field in the address format. To avoid errors in the validation of this field, edit the country by adding this field to your address format.'), $country_name));  
                        }
                    }                
                }
            }
        }
        return true;
    }
    
    /**
     * AdvancedVatManager::sendEmail()
     * Sends email
     * @param mixed $mode (0 -> VIES failed, 1 -> VIES success, 2 -> Customer with empty VAT, 3 -> Customer with invalid VAT, 4 -> Request customer validation, 5 -> Customer with duplicated VAT. 6 -> Customer with invalid company. 7 -> Customer with empty company. 8 -> Customer with VAT not validated due API system failure.
     * @param mixed $customer (address object)
     * @return
     */
    public function sendEmail($mode, $customer)
    {
        $destinations = array();
        if ($mode == 0 || $mode == 1) {
            $destinations = explode(',', Configuration::get('ADVANCEDVATMANAGER_EMAIL_ADDRESS'));    
        }
        else {
            $destinations[] = $customer['email'];    
        }
        if (!empty($destinations)) {
            $link = new Link();
            $vat_iso_code =  Tools::substr($customer['vat'], 0, 2);
            $vat_number =  Tools::substr($customer['vat'], 2);
            $template_vars = array(
                '{customer_id}' => $customer['id_customer'],
                '{id_address}' => $customer['id_address'],
                '{order_reference}' => isset($customer['order_reference'])?$customer['order_reference']:'',
                '{customer_name}' => $customer['firstname'].' '. $customer['lastname'],
                '{vat}' => $customer['vat'],
                '{country}' => Country::getNameById($this->context->language->id, $customer['id_country']),
                '{date}' => date("Y-m-d H:i:s"),
                '{customer_account}' => $link->getPageLink('my-account'),
                '{customer_account_addr}' => $link->getPageLink('addresses')
            );
            
            if ($mode == 0) {
                $template_name = 'api_failed';
                $subject = Mail::l('Official systems API sytem validation failed - Sent from Advanced VAT Manager module.');    
            }
            else if ($mode == 1) {
                $template_name = 'api_success';
                $subject = Mail::l('Official systems API sytem validation success - Sent from Advanced VAT Manager module.');    
            }
            else if ($mode == 2) {
                $template_name = 'customer_empty_vat';
                $subject = Mail::l('You need to update your address and insert a valid VAT number - Mail from').' '.$this->context->shop->name;    
            }
            else if ($mode == 3) {
                $template_name = 'customer_invalid_vat';
                $subject = Mail::l('Invalid VAT number. You need to validate new VAT number - Mail from').' '.$this->context->shop->name;        
            }
            else if ($mode == 4) {
                $template_name = 'request_validation'; 
                $subject = Mail::l('Validation request. You need to validate VAT number - Mail from').' '.$this->context->shop->name;   
            }
            else if ($mode == 5) {
                $template_name = 'customer_duplicated'; 
                $subject = Mail::l('Duplicated VAT number - Mail from').' '.$this->context->shop->name;   
            }
            else if ($mode == 6) {
                $template_name = 'customer_invalid_company'; 
                $subject = Mail::l('Invalid company name - Mail from').' '.$this->context->shop->name;   
            }
            else if ($mode == 7) {
                $template_name = 'customer_empty_company'; 
                $subject = Mail::l('Empty company name - Mail from').' '.$this->context->shop->name;   
            }
            else if ($mode == 8) {
                $template_name = 'customer_pending_validation'; 
                $subject = Mail::l('VAT number is pending of validation - Mail from').' '.$this->context->shop->name;   
            }
            else if ($mode == 9) {
                $template_name = 'customer_invalid_company_address'; 
                $subject = Mail::l('Invalid or not validated company address - Mail from').' '.$this->context->shop->name;   
            }
            
            $shop_email = Configuration::get('PS_SHOP_EMAIL');
            $shop_name = Configuration::get('PS_SHOP_NAME');
            $template_dir = _PS_MODULE_DIR_.'advancedvatmanager/mails/';
            foreach ($destinations as $destination) {
                if (Mail::Send(
                        (int)$this->context->language->id, 
                        $template_name, 
                        $subject, 
                        $template_vars, 
                        $destination, 
                        null, 
                        $shop_email, 
                        $shop_name, 
                        null, 
                        null, 
                        $template_dir, 
                        false, 
                        (int)$this->context->shop->id, 
                        null, 
                        null) 
                    === false) {
                        
                    prestashopLoggerCore::addLog('Advanced VAT Manager - '.$this->l('There is an error while was sending email. The email has not been sent.'));
                    return false;
                } 
            }
        } 
        else {
            prestashopLoggerCore::addLog('Advanced VAT Manager - '.$this->l('The email could not be sent because any email address has been configured.'));
            return false;
        }
    }
    
    /**
     * AdvancedVatManager::checkNotAllowCheckout()
     * Check if purchase is not allowed
     * @return false or string message
     */
    public function checkNotAllowCheckout()
    {
        $customer_vat_data = $this->context->cookie->__isset('customer_vat_data')?json_decode($this->context->cookie->__get('customer_vat_data'), true):'';
        if ($customer_vat_data && isset($customer_vat_data['id_customer'])) {
            // Get Cart from table advancedvatmanager_customer_cart
            $products_cart = CustomersCart::getProducts($customer_vat_data['id_customer'], $this->context->shop->id);
            $total_cart = (float)CustomersCart::getTotalCart($customer_vat_data['id_customer'], $this->context->shop->id);
            
            if (!empty($products_cart) && !empty($customer_vat_data)) {
                if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') && $customer_vat_data['brexit_customer']) {
                    if (!Tools::getIsset('add') && $this->checkNotAllowCheckoutBrexit($total_cart)) { 
                        $currency_amount = $this->getCurrencyAmount('GBP', AVM_BREXIT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign);
                        return sprintf($this->l('This store does not allow purchases %s %s(tax not incl) to the United Kingdom. You cannot continue with the purchase process'), Configuration::get('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS') == 1?$this->l('over'):$this->l('below'), $currency_amount);
                    }
                }
                if (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') && ($customer_vat_data['voec_customer'] || $customer_vat_data['voec_company'])) {
                    $currency_amount = $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign);
                    if ($customer_vat_data['no_voec_product'] && Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC')) {
                        if (
                        (Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'consumer' && $customer_vat_data['voec_customer']) ||
                        (Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'company' && $customer_vat_data['voec_company']) ||
                        Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'all'
                        )
                        {   
                            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                                return $this->controller_msg[(Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'all'?'NOT_ALLOW_NONVOEC_PRODUCT_ADDTOCART_ALL':(Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'company'?'NOT_ALLOW_NONVOEC_PRODUCT_ADDTOCART_COMPANY':'NOT_ALLOW_NONVOEC_PRODUCT_ADDTOCART_CONSUMER'))];
                            }
                            return sprintf($this->l('Payment cannot be carried out because the shopping cart contains non VOEC products and this shop does not allow non VOEC product purchase.'), $currency_amount, $currency_amount);
                        }  
                    }
                    if (!Tools::getIsset('add') && $this->checkNotAllowCheckoutVOEC($products_cart, $total_cart)) {
                        $currency_amount = $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign);
                        return sprintf($this->l('Payment cannot be carried out because the shopping cart contains products that exceed the amount of %s. According to the Norway VOEC regulations, it is not allowed to send low value products (amount below %s) and products that exceed that amount, in the same package. You must eliminate products that exceed the amount or make two separate purchases.'), $currency_amount, $currency_amount);
                    }
                }
            }  
        }
        return false;
    }
    
    /**
     * AdvancedVatManager::getCustomerAddressWithError()
     * Check if customer has an address with errors
     * @params array $id_address
     * @return false or string message
     */
    public function getCustomerAddressWithError($id_address)
    {
        if (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION') == 1 && Configuration::get('ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION') == 1 && $this->context->controller instanceof FrontController) {
            $checkoutWarning = [];
            $address = new Address($id_address);
            if ($id_address) {
                if (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required') { 
                    if (CustomersVAT::checkCustomerVATInvalid($this->context->customer->id, $address->id) ) {
                        $checkoutWarning = ['id_address' => $address->id, 'exception' => $address->vat_number?sprintf($this->controller_msg['VAT_NOT_VALID_REQUIRED_WITH_NUMBER'], $this->l('VAT number'), $address->vat_number):$this->controller_msg['VAT_EMPTY_REQUIRED']];
                    }
                    else if (CustomersVAT::checkCustomerAddressWithoutValidation($this->context->customer->id, $address->id)) {
                        $country_iso = Country::getIsoById($address->id_country);
                        $message = '';
                        if ($address->vat_number) {
                            $message = sprintf($this->controller_msg['VAT_NOT_VALIDATED_REQUIRED_WITH_NUMBER'],$this->l('VAT number'), $address->vat_number);
                        }
                        else {
                            if (!in_array($country_iso, array_merge(ValidationEngine::$voec_countries_iso, ValidationEngine::$brexit_countries_iso))) {
                                $message = $this->controller_msg['VAT_EMPTY_REQUIRED'];     
                            }
                        }
                        $checkoutWarning = ['id_address' => $address->id, 'exception' => $message]; 
                    }    
                }
                
                if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') && $address->vat_number != '') {
                    if (CustomersVAT::checkCustomerCompanyInvalid($this->context->customer->id, $address->id)) {
                        $checkoutWarning = ['id_address' => $address->id, 'exception' => sprintf($this->controller_msg['COMPANY_INVALID_WITH_NAME'], $this->l('Company name'), $address->company)];     
                    }
                    else if (CustomersVAT::checkCustomerCompanyWithoutValidation($this->context->customer->id, $address->id)) {
                        $checkoutWarning = ['id_address' => $address->id, 'exception' => sprintf($this->controller_msg['COMPANY_NOT_VALIDATED_REQUIRED_WITH_NAME'],$this->l('Company name'), $address->company)]; 
                    }
                }
                
                if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && $address->vat_number != '') {
                    if (CustomersVAT::checkCustomerCompanyAddressInvalid($this->context->customer->id, $address->id)) {
                        $checkoutWarning = ['id_address' => $address->id, 'exception' => sprintf($this->controller_msg['COMPANY_ADDRESS_INVALID_REQUIRED'])];     
                    }
                    else if (CustomersVAT::checkCustomerCompanyAddressWithoutValidation($this->context->customer->id, $address->id)) {
                        $checkoutWarning = ['id_address' => $address->id, 'exception' => sprintf($this->controller_msg['COMPANY_ADDRESS_NOT_VALIDATED_REQUIRED'])]; 
                    }
                }
                
                if (Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') == 0 && CustomersVAT::checkVATWithSystemFails($address->id)) {
                    $checkoutWarning = ['id_address' => $address->id, 'exception' => $this->controller_msg['SYSTEM_FAILS']];
                }
            }
            if (!empty($checkoutWarning['exception'])) {
                return $checkoutWarning;
            }
        }
        return false;
    }
    
    /**
     * AdvancedVatManager::checkNotAllowCheckoutByVATandCompanyValidation()
     * Checks if address is not validated with VAT number or company name to not allow checkout process
     * @return bool (false if checkout is allowed) array $message displaying error message disabling checkout process.
     */
    public function checkNotAllowCheckoutByVATandCompanyValidation()
    {
        $message = array();
        if (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION') == 1 && Configuration::get('ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION') == 1 && $this->context->controller instanceof FrontController) {
            $customer_id = $this->context->cart->id_customer;
            $id_address_delivery = $this->context->cart->id_address_delivery;
            $id_address_invoice = $this->context->cart->id_address_invoice;
            $address_delivery = new Address($id_address_delivery);
            $address_invoice = new Address($id_address_invoice);
            
            if (!$customer_id) {
                return false;
            } 
            if (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required') { 
                if (CustomersVAT::checkCustomerVATInvalid($customer_id, $id_address_delivery)) {
                    $message[] = $address_delivery->vat_number?sprintf($this->controller_msg['VAT_NOT_VALID_REQUIRED_WITH_NUMBER'], $this->l('VAT number'), $address_delivery->vat_number):$this->controller_msg['VAT_EMPTY_REQUIRED'];  
                }
                else if (CustomersVAT::checkCustomerAddressWithoutValidation($customer_id, $id_address_delivery)) {
                    $message[] = $address_delivery->vat_number?sprintf($this->controller_msg['VAT_NOT_VALIDATED_REQUIRED_WITH_NUMBER'], $this->l('VAT number'), $address_delivery->vat_number):$this->controller_msg['VAT_EMPTY_REQUIRED'];   
                }               
            }
            if ($id_address_invoice != $id_address_delivery && (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required' && (Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 1 && $address_invoice->company != '') || Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 0)) { 
                if (CustomersVAT::checkCustomerVATInvalid($customer_id, $id_address_invoice)) {
                    $message[] = $address_invoice->vat_number?sprintf($this->controller_msg['VAT_NOT_VALIDATED_REQUIRED_WITH_NUMBER'], $this->l('VAT number'), $address_invoice->vat_number):$this->controller_msg['VAT_EMPTY_REQUIRED'];    
                }  
                else if (CustomersVAT::checkCustomerAddressWithoutValidation($customer_id, $id_address_invoice)) {
                    $message[] = $address_invoice->vat_number?sprintf($this->controller_msg['VAT_NOT_VALIDATED_REQUIRED_WITH_NUMBER'], $this->l('VAT number'), $address_invoice->vat_number):$this->controller_msg['VAT_EMPTY_REQUIRED'];    
                }
            }
            
            if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') && ($address_delivery->vat_number != '' || $address_invoice->vat_number != '')) {
                if (CustomersVAT::checkCustomerCompanyInvalid($customer_id, $id_address_delivery)) {
                    $message[] = sprintf($this->controller_msg[$address_delivery->company?'COMPANY_INVALID_WITH_ALIAS':'COMPANY_EMPTY_WITH_ALIAS'], $address_delivery->alias, $address_invoice->company);  
                }
                else if ($id_address_invoice != $id_address_delivery && CustomersVAT::checkCustomerCompanyInvalid($customer_id, $id_address_invoice)) {
                    $message[] = sprintf($this->controller_msg[$address_invoice->company?'COMPANY_INVALID_WITH_ALIAS':'COMPANY_EMPTY_WITH_ALIAS'], $address_delivery->alias, $address_invoice->company); 
                } 
                
                if (CustomersVAT::checkCustomerCompanyWithoutValidation($customer_id, $id_address_delivery)) {
                    $message[] = sprintf($this->controller_msg[$address_delivery->company?'COMPANY_NOT_VALIDATED_REQUIRED_WITH_NAME':'COMPANY_EMPTY_WITH_ALIAS'], $address_delivery->alias, $address_delivery->company);   
                }
                else if ($id_address_invoice != $id_address_delivery && CustomersVAT::checkCustomerCompanyWithoutValidation($customer_id, $id_address_invoice)) {
                    $message[] = sprintf($this->controller_msg[$address_invoice->company?'COMPANY_NOT_VALIDATED_REQUIRED_WITH_NAME':'COMPANY_EMPTY_WITH_ALIAS'], $address_invoice->alias, $address_invoice->company);    
                }
            }
            
            if (Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') == 0) {
                if (CustomersVAT::checkVATWithSystemFails($id_address_delivery) || CustomersVAT::checkVATWithSystemFails($id_address_invoice)) {
                    $message[] = $this->controller_msg['SYSTEM_FAILS'];  
                }  
            }            
            if (!empty($message)) {
                return array_unique($message);
            }
        }
        return false;
    }
    
    /**
     * AdvancedVatManager::checkModuleOrderStateExists()
     * Checks if the order state created by the module exists 
     * @return
     */
    public function checkModuleOrderStateExists()
    {
        $sql = 'SELECT COUNT(*) FROM '._DB_PREFIX_.'order_state WHERE `module_name` = "advancedvatmanager"'.(version_compare(_PS_VERSION_, '1.7.0.0', '>=')?' AND `deleted` = 0;':'');
        $total_states = Db::getInstance()->getValue($sql);
        return (bool)$total_states;
    }
    
    /**
     * AdvancedVatManager::getModuleOrderState()
     * Gets the id of the order state created by the module
     * @return array
     */
    public function getModuleOrderState()
    {
        $sql = 'SELECT `id_order_state` FROM '._DB_PREFIX_.'order_state WHERE `module_name` = "advancedvatmanager"'.(version_compare(_PS_VERSION_, '1.7.0.0', '>=')?' AND `deleted` = 0;':'');
        return Db::getInstance()->executeS($sql);
    }

    /**
     * Create custom OrderState used for payment
     *
     * @param string $configurationKey Configuration key used to store OrderState identifier
     * @param array $nameByLangIsoCode An array of name for all languages, default is en
     * @param string $color Color of the label
     * @param bool $isLogable consider the associated order as validated
     * @param bool $isPaid set the order as paid
     * @param bool $isInvoice allow a customer to download and view PDF versions of his/her invoices
     * @param bool $isShipped set the order as shipped
     * @param bool $isDelivery show delivery PDF
     * @param bool $isPdfDelivery attach delivery slip PDF to email
     * @param bool $isPdfInvoice attach invoice PDF to email
     * @param bool $isSendEmail send an email to the customer when his/her order status has changed
     * @param string $template Only letters, numbers and underscores are allowed. Email template for both .html and .txt
     * @param bool $isHidden hide this status in all customer orders
     * @param bool $isUnremovable Disallow delete action for this OrderState
     * @param bool $isDeleted Set OrderState deleted
     *
     * @return bool
     *
     * @throws prestashopDatabaseException
     * @throws prestashopException
     */
    private function createOrderState(
        $configurationKey,
        $name,
        $color,
        $isLogable = false,
        $isPaid = false,
        $isInvoice = false,
        $isShipped = false,
        $isDelivery = false,
        $isPdfDelivery = false,
        $isPdfInvoice = false,
        $isSendEmail = false,
        $template = '',
        $isHidden = false,
        $isUnremovable = true,
        $isDeleted = false
    ) {
        $tabNameByLangId = [];

        foreach (Language::getLanguages(false) as $language) {
            $tabNameByLangId[(int) $language['id_lang']] = $this->_translate($name, $language['iso_code']);    
        } 

        $orderState = new OrderState();
        $orderState->module_name = $this->name;
        $orderState->name = $tabNameByLangId;
        $orderState->color = $color;
        $orderState->logable = $isLogable;
        $orderState->paid = $isPaid;
        $orderState->invoice = $isInvoice;
        $orderState->shipped = $isShipped;
        $orderState->delivery = $isDelivery;
        $orderState->pdf_delivery = $isPdfDelivery;
        $orderState->pdf_invoice = $isPdfInvoice;
        $orderState->send_email = $isSendEmail;
        $orderState->hidden = $isHidden;
        $orderState->unremovable = $isUnremovable;
        $orderState->template = $template;
        $orderState->deleted = $isDeleted;
        $result = (bool) $orderState->add();

        if (false === $result) {
            $this->_errors[] = sprintf(
                'Failed to create OrderState %s',
                $configurationKey
            );

            return false;
        }

        $result = (bool) Configuration::updateGlobalValue($configurationKey, (int) $orderState->id);

        if (false === $result) {
            $this->_errors[] = sprintf(
                'Failed to save OrderState %s to Configuration',
                $configurationKey
            );

            return false;
        }

        $orderStateImgPath = $this->getLocalPath() . 'views/img/orderstate/' . $configurationKey . '.png';

        if (false === (bool) Tools::file_exists_cache($orderStateImgPath)) {
            $this->_errors[] = sprintf(
                'Failed to find icon file of OrderState %s',
                $configurationKey
            );

            return false;
        }

        if (false === (bool) Tools::copy($orderStateImgPath, _PS_ORDER_STATE_IMG_DIR_ . $orderState->id . '.gif')) {
            $this->_errors[] = sprintf(
                'Failed to copy icon of OrderState %s',
                $configurationKey
            );

            return false;
        }

        return true;
    }

    /**
     * Delete custom OrderState used for payment
     * We mark them as deleted to not break passed Orders
     *
     * @return bool
     *
     */
    private function deleteOrderState()
    {
        $result = true;
        if (version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
            if ($this->checkModuleOrderStateExists()) {
                foreach ($this->getModuleOrderState() as $row) {
                    $orderState = new OrderState($row['id_order_state']);
                    $result = $result && (bool)$orderState->delete();
                }
            }
        }
        else {
            $orderStateCollection = new prestashopCollection('OrderState');
            $orderStateCollection->where('module_name', '=', $this->name);
            /** @var OrderState[] $orderStates */
            $orderStates = $orderStateCollection->getAll();
    
            foreach ($orderStates as $orderState) {
                $orderState->deleted = true;
                $result = $result && (bool) $orderState->save();
            }
        }
        return $result;
    }
    
    /**
     * Gets european countries ID
     *
     * @return bool
     *
     */
    public static function getEuropeanCountryID()
    {
        $european_countries_id = array();
        foreach (ValidationEngine::$european_countries_iso as $iso_code) {
            $european_countries_id[] = Country::getByIso($iso_code);    
        }
        return $european_countries_id;  
    }
    
    /**
     * Checks if a product is a non VOEC product depends on its price without tax
     *
     * @return bool
     *
     */
    public function checkNonVOECProduct($price_without_reduction_wt)
    {
        if ($price_without_reduction_wt >= $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT)) {
            return true;    
        }
        return false;
    }
    
    /**
     * AdvancedVatManager::createOrderStatus()
     * Creates order states from this module
     * @return
     */
    public function createOrderStatus()
    {
        if (!$this->checkModuleOrderStateExists()) {
            $this->createOrderState('VAT_PENDING_VALIDATION_OS','VAT number pending validation','#ff5100');
            $this->createOrderState('VAT_VALID_OS','VAT number validated','#00af05');  
        }   
    }
    
    /**
     * AdvancedVatManager::hookActionOpcValidatePayment()
     * Compatibility purposes for module One Page Checkout by Presteamshop
     * @return
     */
     public function hookActionOpcValidatePayment()
     {
        if (Module::isEnabled($this->name)) {
            $message = $this->checkNotAllowCheckout();
            if ($message) {
                return array($this->checkNotAllowCheckout());
            }
            $message = $this->checkNotAllowCheckoutByVATandCompanyValidation();
            if ($message) {
                return $message;
            }
        }
     }
     
    /**
     * AdvancedVatManager::hookActionStepBeforePaymentOPC()
     * Compatibility purposes for module One Page Checkout by Presteamshop
     * @return
     */
     public function hookActionStepBeforePaymentOPC()
     {
        if (Module::isEnabled($this->name)) {
            if ($this->getCustomerAddressWithError($this->context->cart->id_address_delivery)) {
                return array('errors' => array($this->getCustomerAddressWithError($this->context->cart->id_address_delivery)['exception']));
            }
            if ($this->getCustomerAddressWithError($this->context->cart->id_address_invoice)) {
                return array('errors' => array($this->getCustomerAddressWithError($this->context->cart->id_address_invoice)['exception']));
            }
        }
     }
     
    /**
     * AdvancedVatManager::hookActionOpcValidateVatNumber()
     * Compatibility purposes for module One Page Checkout by Presteamshop
     * @return
     */
     public function hookActionOpcValidateVatNumber($params)
     {
     }
     
    /**
     * AdvancedVatManager::hookActionOpcCustomerAddressFormFields()
     * Compatibility purposes for module One Page Checkout by Presteamshop
     * @return
     */
    public function hookActionOpcCustomerAddressFormFields($params)
    {
        if (Module::isEnabled($this->name) && version_compare(_PS_VERSION_, '1.7.0.0', '>=') && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION') == 1) {
            $formFields = $params['formFields'];
            if (!ValidationEngine::skipVATFieldBycountry($formFields['id_country']->getValue())) {
                if (isset($formFields['vat_number'])) {
                    $label = Configuration::get('ADVANCEDVATMANAGER_FIELD_LABEL', $this->context->language->id);
                    $legend = Configuration::get('ADVANCEDVATMANAGER_FIELD_LEGEND', $this->context->language->id);
                    if ($label) {
                        $formFields['vat_number']->setLabel($label);    
                    }
                    if ($legend) {
                        $formFields['vat_number']->addAvailableValue('comment', $legend); 
                    }
                }
                if (isset($formFields['company'])) {
                    $formFields['company']->addAvailableValue('comment', (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')?$this->controller_msg['COMPANY_VALIDATION_COMMENT']:'').' '.(Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY')?$this->controller_msg['COMPANY_DISPLAY_COMMENT']:'')); 
                }
            }
        }
    }
              
    /**
     * AdvancedVatManager::hookActionDispatcher()
     * Hook for actions after reload page
     * @return
     */
    public function hookActionDispatcher()
    {
        // Only for PrestaShop 1.7 versions
        if (Module::isEnabled($this->name) && version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
            if (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION') == 1 && Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WARNING_MESSAGE_ADDRESS') == 1 && $this->context->controller instanceof FrontController ) {
                // Display messages when an address has no VAT validated or address is not validated yet, only for countries for validation.
                if (Tools::getValue('controller') == 'addresses') {
                    if ($addresses = CustomersVAT::getCustomerAddressHasVATInvalid($this->context->cookie->id_customer)) {
                        foreach ($addresses as $address) {
                            $address = new Address($address['id_address']);
                            $alias = $address->alias;
                            $this->context->controller->warning[] = sprintf($this->controller_msg[(Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required'?'VAT_NOT_VALID_REQUIRED_WITH_ALIAS':'VAT_NOT_VALID_OPTIONAL_WITH_ALIAS')],$alias);    
                        }   
                    }
                    
                    if ($addresses = CustomersVAT::getCustomerAddressWithoutValidation($this->context->cookie->id_customer)) {
                        foreach ($addresses as $idaddress) {
                            $address = new Address($idaddress['id_address']);
                            $alias = $address->alias;
                            $country_iso = Country::getIsoById($address->id_country);
                            if ((Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required' && (Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 1 && $address->company != '') || Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 0) || (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional' && $address->vat_number != '')) { 
                                $message = '';
                                if ($address->vat_number) {
                                    $message =  sprintf($this->controller_msg[(Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional'?'VAT_NOT_VALIDATED_OPTIONAL_WITH_ALIAS':'VAT_NOT_VALIDATED_REQUIRED_WITH_ALIAS')],$alias);   
                                }
                                else {
                                    // No mandatory for VOEC and Brexit
                                    if (!in_array($country_iso, array_merge(ValidationEngine::$voec_countries_iso, ValidationEngine::$brexit_countries_iso))) {
                                        $message = sprintf($this->controller_msg[(Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional'?'VAT_EMPTY_OPTIONAL_WITH_ALIAS':'VAT_EMPTY_REQUIRED_WITH_ALIAS')],$alias);   
                                    }
                                }
                                if ($message) {
                                     $this->context->controller->warning[] = $message;
                                } 
                            }    
                        }     
                    }
                    
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')) {
                        if ($addresses = CustomersVAT::getCustomerAddressHasCompanyInvalid($this->context->cookie->id_customer)) {
                            foreach ($addresses as $idaddress) {
                                $address = new Address($idaddress['id_address']);
                                $alias = $address->alias;
                                $company = $address->company;
                                $this->context->controller->warning[] = sprintf($this->controller_msg[$company?'COMPANY_INVALID_WITH_ALIAS':'COMPANY_EMPTY_WITH_ALIAS'],$alias, $company);       
                            }
                        }
                        if ($addresses = CustomersVAT::getCustomerAddressHasCompanyWithoutValidation($this->context->cookie->id_customer)) {
                            foreach ($addresses as $idaddress) {
                                $address = new Address($idaddress['id_address']);
                                $alias = $address->alias;
                                $company = $address->company;
                                $country_iso = Country::getIsoById($address->id_country);
                                // No mandatory for VOEC and Brexit
                                if (!in_array($country_iso, array_merge(ValidationEngine::$voec_countries_iso, ValidationEngine::$brexit_countries_iso))) {
                                    $this->context->controller->warning[] = sprintf($this->controller_msg[$company?'COMPANY_NOT_VALIDATED_REQUIRED_WITH_ALIAS':'COMPANY_EMPTY_WITH_ALIAS'],$alias, $company);  
                                    
                                }
  
                            }
                        }  
                    }
                    
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
                        if ($addresses = CustomersVAT::getCustomerAddressHasCompanyAddressInvalid($this->context->cookie->id_customer)) {
                            foreach ($addresses as $idaddress) {
                                $address = new Address($idaddress['id_address']);
                                $alias = $address->alias;
                                $this->context->controller->warning[] = sprintf($this->controller_msg['COMPANY_ADDRESS_INVALID_WITH_ALIAS'],$alias);       
                            }
                        }
                        if ($addresses = CustomersVAT::getCustomerAddressHasCompanyAddressWithoutValidation($this->context->cookie->id_customer)) {
                            foreach ($addresses as $idaddress) {
                                $address = new Address($idaddress['id_address']);
                                $alias = $address->alias;
                                $country_iso = Country::getIsoById($address->id_country);
                                // No mandatory for VOEC and Brexit
                                if (!in_array($country_iso, array_merge(ValidationEngine::$voec_countries_iso, ValidationEngine::$brexit_countries_iso))) {
                                    $this->context->controller->warning[] = sprintf($this->controller_msg['COMPANY_ADDRESS_NOT_VALIDATED_REQUIRED_WITH_ALIAS'],$alias);   
                                }
  
                            }
                        }  
                    }                     
                    
                    // Check if the system fails and skip validation is disabled
                    if (Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') == 0 && $addresses = CustomersVAT::getCustomerAddressesWithSystemFails($this->context->cookie->id_customer)) {
                       foreach ($addresses as $idaddress) {
                            $address = new Address($idaddress['id_address']);
                            $alias = $address->alias;
                            $vat = $address->vat_number;
                            $this->context->controller->warning[] = sprintf($this->controller_msg['SYSTEM_FAILS_WITH_ALIAS'],$alias, $vat);    
                        }  
                    }
                }
                else if (Tools::getValue('controller') == 'address' && !Tools::isSubmit('submitAddress')) {
                    $address = new Address(Tools::getValue('id_address'));
                    $country_iso = Country::getIsoById($address->id_country);
                    if (CustomersVAT::checkCustomerVATInvalid($this->context->cookie->id_customer, $address->id)) {
                        $this->context->controller->warning[] = $this->controller_msg[(Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required'?'VAT_NOT_VALID_REQUIRED':'VAT_NOT_VALID_OPTIONAL')];   
                    }
                    
                    if ((Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required' && (Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 1 && $address->company != '') || Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 0) || (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional' && $address->vat_number != '')) {
                        if (CustomersVAT::checkCustomerAddressWithoutValidation($this->context->cookie->id_customer, $address->id)) {
                            $message = '';
                            if ($address->vat_number) {
                                $message = $this->controller_msg[(Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional'?'VAT_NOT_VALIDATED_OPTIONAL':'VAT_NOT_VALIDATED_REQUIRED')];    
                            }
                            else {
                                if (!in_array($country_iso, array_merge(ValidationEngine::$voec_countries_iso, ValidationEngine::$brexit_countries_iso))) {
                                    $message = $this->controller_msg[(Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional'?'VAT_EMPTY_OPTIONAL':'VAT_EMPTY_REQUIRED')];
                                }
                            }
                            if ($message) {
                                $this->context->controller->warning[] = $message;
                            }
                        }
                    }
                    
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')) {
                        if (CustomersVAT::checkCustomerCompanyInvalid($this->context->cookie->id_customer, $address->id)) {
                            $this->context->controller->warning[] = $this->controller_msg['COMPANY_INVALID_REQUIRED'];      
                        }
                       
                        // No mandatory for VOEC and Brexit
                        if (!in_array($country_iso, array_merge(ValidationEngine::$voec_countries_iso, ValidationEngine::$brexit_countries_iso))) {
                            if (CustomersVAT::checkCustomerCompanyWithoutValidation($this->context->cookie->id_customer, $address->id) && !empty($address->vat_number)) {
                                $this->context->controller->warning[] = $this->controller_msg['COMPANY_NOT_VALIDATED_REQUIRED'];           
                            }
                        }  
                    }
                    
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
                        if (CustomersVAT::checkCustomerCompanyAddressInvalid($this->context->cookie->id_customer, $address->id)) {
                            $this->context->controller->warning[] = $this->controller_msg['COMPANY_ADDRESS_INVALID_REQUIRED'];      
                        }
                        // No mandatory for VOEC and Brexit
                        if (!in_array($country_iso, array_merge(ValidationEngine::$voec_countries_iso, ValidationEngine::$brexit_countries_iso))) {
                            if (CustomersVAT::checkCustomerCompanyAddressWithoutValidation($this->context->cookie->id_customer, $address->id) && !empty($address->vat_number)) {
                                $this->context->controller->warning[] = $this->controller_msg['COMPANY_ADDRESS_NOT_VALIDATED_REQUIRED'];           
                            }
                        }  
                    } 
                    
                    // Check if the system fails and skip validation is disabled
                    if (Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') == 0 && CustomersVAT::checkCustomerAddressWithSystemFails($this->context->cookie->id_customer, $address->id)) {
                        $this->context->controller->warning[] = $this->controller_msg['SYSTEM_FAILS'];
                    }
                }
            }
        }
    }
    
    /**
     * AdvancedVatManager::hookDisplayInvoiceLegalFreeText()
     * 
     * @param mixed $params
     * @return
     */
    public function hookDisplayInvoiceLegalFreeText($params)
    {
        if (Module::isEnabled($this->name)) {
            $order = $params['order'];
            $reverseCharge = '';
            $voec_info = '';
            $legal_text = '';
            if ($vatOrder = CustomersOrders::getVATOrderInDB($order->id)) {
                $brexit = $vatOrder['brexit'];
                $voec = $vatOrder['voec'];
                if ((bool)$vatOrder['notax']) {
                    // Inserts Legal free text in invoice
                    if ((bool)$vatOrder['notax']) {
                        $legal_text = Configuration::get('ADVANCEDVATMANAGER_LEGAL_TEXT', (int)$this->context->language->id, null, (int)$order->id_shop);
                    }
                    // Inserts Legal free text in invoice for Brexit
                    if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 1 && $brexit && Configuration::get('ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP') == 1) {
                        $reverseCharge = PHP_EOL.$this->l('Reverse charge: customer to account for VAT to HMRC');    
                    }   
                }
                // Inserts Legal free text in invoice for VOEC
                if (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1 && $voec) {
                    $voec_info = PHP_EOL.$this->l('Invoice taxed with the tax of the country of destination as it is subject to the regulation of the VOEC scheme.');    
                } 
                return Configuration::get('PS_INVOICE_LEGAL_FREE_TEXT', (int)$this->context->language->id, null, (int)$order->id_shop).$reverseCharge.$voec_info.PHP_EOL.$legal_text; 
            }
        }
    }
    
    /**
     * AdvancedVatManager::hookActionPDFInvoiceRender()
     * 
     * @param mixed $params
     * @return
     */
    public function hookActionPDFInvoiceRender($params)
    {
        if (Module::isEnabled($this->name)) {
            $order = new Order($params['order_invoice_list'][0]->id_order);
            $note = Configuration::get('ADVANCEDVATMANAGER_INVOICE_NOTE', (int)$this->context->language->id, null, (int)$order->id_shop);
            if ($vatOrder =  CustomersOrders::getVATOrderInDB($order->id)) {
                if ((bool)$vatOrder['notax']) {
                    // Inserts Note in invoice
                    if ($note) {   
                        $params['order_invoice_list'][0]->note = $note.PHP_EOL.$params['order_invoice_list'][0]->note;
                    }
                }         
            }
        }
    }
    
    /**
     * AdvancedVatManager::hookActionValidateCustomerAddressForm()
     * Hook for customer account validation ONLY FOR PS 1.7
     * @param mixed $params
     * @return
     */
    public function hookActionValidateCustomerAddressForm($params)
    {
        if (Module::isEnabled($this->name) && version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
            if (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
                $form = $params['form'];
                $vat = $form->getField('vat_number')?$form->getField('vat_number')->getValue():null;
                $ve = new ValidationEngine($vat);
                $id_customer = isset($this->context->customer->id) && $this->context->customer->id?$this->context->customer->id:Tools::getValue('id_customer'); 
                $company_address = array(
                    'address1' => $form->getField('address1')->getValue(),
                    'address2' => $form->getField('address2')?$form->getField('address2')->getValue():'',
                    'city' => $form->getField('city')->getValue(),
                    'postcode' => $form->getField('postcode')->getValue(),
                );
                $ve->VATValidationProcess(Tools::getValue('id_country'), $id_customer, Tools::getValue('id_address'), $form->getField('company')->getValue(), $company_address);
                if (ValidationEngine::$skip_validation_process === false) {
                    if (Configuration::get('ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID') == 0) {
                        if (!ValidationEngine::getVATValidation()) {
                            $form->getField('vat_number')->addError($ve->getMessage());       
                        }
                    }
                    // Company validation
                    if (ValidationEngine::getVATValidation() && Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') && ValidationEngine::$company_valid == 0) {
                        $form->getField('company')->addError($ve->getMessage());
                    }
                    // Company address validation
                    if (ValidationEngine::getVATValidation() && Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && ValidationEngine::$companyAddress_valid == 0) {
                        foreach (ValidationEngine::$addressValidationError as $field => $content) {
                            if ($content['validation'] == 'error') {
                                $form->getField($field)->addError($content['message']);        
                            }
                        }
                    }
                }
            }
        }
    }
    
    /**
     * AdvancedVatManager::hookActionObjectAddressDeleteAfter()
     * Hook executed after deleting address
     * @param mixed $params
     * @return
     */
    public function hookActionObjectDeleteAfter($params)
    {
        if (Module::isEnabled($this->name)) {
            $object = $params['object'];
            if ($object instanceof Address || $object instanceof CustomerAddress) {
                if (CustomersVAT::checkCustomerAddressExists($object->id_customer, $object->id)) {
                    CustomersVAT::deleteByIDAddress($object->id);
                    // Manage Customer groups
                    ValidationEngine::manageCustomerGroups($object->id_country, $object->id_customer, $object->id);
                }
            }
            // Deletes customer from module table
            if ($object instanceof Customer) {
                $customer = new CustomersExemption($object->id);
                if (Validate::isLoadedObject($customer)) {
                    $customer->delete();    
                }
            }
        }        
    }

    /**
     * AdvancedVatManager::hookActionObjectAddressAddAfter()
     * Hook executed after adding address
     * @param mixed $params
     * @return
     */
    public function hookActionObjectAddAfter($params)
    {
        if (Module::isEnabled($this->name)) {
            return $this->hookActionObjectUpdateAfter($params);
        }
    }

    /**
     * AdvancedVatManager::hookActionObjectAddressUpdateAfter()
     * Hook executed after updating address
     * @param mixed $params
     * @return
     */
    public function hookActionObjectUpdateAfter($params)
    {
        if (Module::isEnabled($this->name)) {
            if ((Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')== 1 && $this->context->controller instanceof AdminController) || (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1 && $this->context->controller instanceof FrontController)) {
                $object = $params['object'];
                if ($object instanceof Address || $object instanceof CustomerAddress) {
                    $cv = new CustomersVAT();
                    
                    // Delete address
                    if ($object->deleted == 1) {
                        if (CustomersVAT::checkCustomerAddressExists($object->id_customer, $object->id)) {
                            CustomersVAT::deleteByIDAddress($object->id);
                            // Manage Customer groups
                            ValidationEngine::manageCustomerGroups($object->id_country, $object->id_customer, $object->id);
                        }  
                    }
                    // If validation process was inited
                    else if (ValidationEngine::$init_validation_process && ValidationEngine::$skip_validation_process === false) {
                        $client_type = ValidationEngine::checkClientType();
                        return $cv->addCustomersVAT(ValidationEngine::getVat(), $object->id_customer, $object->id, (int)ValidationEngine::getVATValidation(), ValidationEngine::$company_valid, ValidationEngine::$companyAddress_valid, ValidationEngine::getStatus(), $client_type, Configuration::get('ADVANCEDVATMANAGER_COMPANY_AUTOINSERT')?ValidationEngine::getRegisteredCompanyName():null, ValidationEngine::getSystemFail());
                    }
                    // If address is skipped and should be deleted from table
                    else if (ValidationEngine::$init_validation_process && ValidationEngine::$skip_validation_process) {
                        CustomersVAT::deleteByIDAddress($object->id);    
                    }
                    // If validation process was not inited
                    else if (!ValidationEngine::$init_validation_process) {
                        // Ajax process not saving static mehtods
                        $ve = new ValidationEngine($object->vat_number);
                        $company_address = array(
                            'address1' => $object->address1,
                            'address2' => $object->address2?$object->address2:'',
                            'city' => $object->city,
                            'postcode' => $object->postcode,
                        );
                        $result = $ve->VATValidationProcess($object->id_country, $object->id_customer, $object->id, $object->company, $company_address);
                        $client_type = ValidationEngine::checkClientType();
                        if (ValidationEngine::$skip_validation_process === false) {
                            return $cv->addCustomersVAT(ValidationEngine::getVat(), $object->id_customer, $object->id, (int)$result, ValidationEngine::$company_valid, ValidationEngine::$companyAddress_valid, ValidationEngine::getStatus(), $client_type, Configuration::get('ADVANCEDVATMANAGER_COMPANY_AUTOINSERT')?ValidationEngine::getRegisteredCompanyName():null, ValidationEngine::getSystemFail());
                        }
                        else {
                            if (CustomersVAT::checkCustomerAddressExists($object->id_customer, $object->id)) {
                                CustomersVAT::deleteByIDAddress($object->id);
                                // Manage Customer groups
                                ValidationEngine::manageCustomerGroups($object->id_country, $object->id_customer, $object->id);
                            }
                        } 
                    } 
                }                   
            } 
        } 
    }
    
    /**
     * AdvancedVatManager::hookcreateAccountForm()
     * ONLY FOR PS 1.6
     * @return
     */
    public function hookcreateAccountForm()
    {
        if (Module::isEnabled($this->name) && version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
            $this->hookActionFrontControllerSetMedia();
        }
    }
             
    /**
     * AdvancedVatManager::hookActionBeforeSubmitAccount()
     * Hook for actions before submitting customer account ONLY FOR PS 1.6
     * @return
     */
    public function hookActionBeforeSubmitAccount()
    {  
        if (Module::isEnabled($this->name) && version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
            $ve = new ValidationEngine(Tools::getValue('vat_number'));
            $company_address = array(
                'address1' => Tools::getValue('address1'),
                'address2' => Tools::getValue('address2'),
                'city' => Tools::getValue('city'),
                'postcode' => Tools::getValue('postcode'),
            );
            $ve->VATValidationProcess(Tools::getValue('id_country'), $this->context->customer->id, Tools::getValue('id_address'), Tools::getValue('company'), $company_address);
            if (ValidationEngine::$skip_validation_process === false) {
                if (Configuration::get('ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID') == 0) {
                    if (!ValidationEngine::getVATValidation() && ValidationEngine::$skip_validation_process === false) {
                        $this->context->controller->errors[] = $ve->getMessage();      
                    }
                }
                // Company validation
                if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') && ValidationEngine::getVATValidation() && ValidationEngine::$company_valid == 0) {
                    $this->context->controller->errors[] = $ve->getMessage();  
                }
                if (ValidationEngine::getVATValidation() && Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && ValidationEngine::$companyAddress_valid == 0) {
                    // Company address validation
                    foreach (ValidationEngine::$addressValidationError as $field => $content) {
                        if ($content['validation'] == 'error') {
                            $this->context->controller->errors[] = $content['message'];    
                        }
                    } 
                }
            }
            if (!empty($this->context->controller->errors)) {
                return false;
            }
        }
        return true;
    }
    
    public function hookActionTaxManager($params)
    {
        if (Module::isEnabled($this->name)) {
            return $this->hookTaxManager($params);
        }
    }
    
    /**
     * AdvancedVatManager::hookTaxManager()
     * Hook to manage tax
     * @params array $args
     * @return
     */
    public function hookTaxManager($args)
    {
        if (Module::isEnabled($this->name)) {
            //License feature
            if (!self::$prestashopAddons) {   
                $APIresponse = self::checkIsLicenseRegistered();
                if ($APIresponse != 'localhost') {
                    if (!$APIresponse || (isset($APIresponse->success) && !$APIresponse->success)) {
                        return false;  
                    }
                }
            }
            // Compatibility with third party modules
            if (Module::isEnabled('ets_onepagecheckout')) {
                $ets_onepagecheckout = Module::getInstanceByName('ets_onepagecheckout');
                $ets_onepagecheckout->hookTaxManager($args);
            }
            if (Module::isEnabled('ets_geolocation')) {
                $ets_geolocation = Module::getInstanceByName('ets_geolocation');
                $ets_geolocation->hookTaxManager($args);
            }
            
            $class_file = _PS_MODULE_DIR_.'/'.$this->name.'/'.$this->tax_manager_class.'.php';
    
            if (!isset($this->tax_manager_class) || !file_exists($class_file)) {
                die(sprintf(Tools::displayError('Incorrect Tax Manager class [%s]'), $this->tax_manager_class));
            }
    
            require_once($class_file);
    
            if (!class_exists($this->tax_manager_class)) {
                die(sprintf(Tools::displayError('Tax Manager class not found [%s]'), $this->tax_manager_class));
            }
    
            $class = $this->tax_manager_class;
            if (call_user_func(array($class, 'isAvailableForThisAddress'), $args['address'])) {
                return new $class();
            }
            return false;
        }
    }
    
    /**
     * AdvancedVatManager::hookActionCartSave()
     * @params array $params
     * @return
     */
    public function hookActionCartSave($params)
    {
        if (Module::isEnabled($this->name)) {
            if ($this->context->controller instanceof FrontController) {
                if (Module::isEnabled($this->name) && ($this->context->customer->isLogged() || $this->context->customer->isGuest()) && (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 1 || Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1)) {
                    if (Validate::isLoadedObject($params['cart'])) {
                        $this->saveCartAndCustomerCookie($params['cart']);
                    }
                }
            }
        }
    }
    
    /**
     * AdvancedVatManager::saveCartAndCustomerCookie()
     * Saves customer info in cookie and cart info in table advancedvatmanager_customer_cart
     * @params Cart $cart
     * @return
     */
    public function saveCartAndCustomerCookie(Cart $cart)
    {
        if (isset($cart->id)) {  
            $cart = new Cart($cart->id);
            // Save in table advancedvatmanager_customer_cart
            $customerCart = new CustomersCart();
            $products = $cart->getProducts(true);
            $non_voec_product = false;
            if (!empty($products)) {
                $product_price = array();
                foreach ($products as $product) {
                    $product_price[] = Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']);
                    if ($this->checkNonVOECProduct(Product::getPriceStatic($product['id_product'],false,$product['id_product_attribute']))) {
                        $non_voec_product = true; 
                    }
                }
                $customerCart->addCustomersCart($cart->id, $cart->id_customer, $cart->id_address_delivery, $cart->id_address_invoice, $cart->getOrderTotal(false,Cart::ONLY_PRODUCTS), $product_price); 
            }
            else {
                $customerCart->deleteCart($cart->id, $this->context->shop->id);
            }
            
            // Manage cookies with data stored
            $cookie_customer_vat_data = json_decode($this->context->cookie->__get('customer_vat_data'), true);
            $cookie_customer_vat_data['no_voec_product'] = $non_voec_product;
            $this->context->cookie->__set('customer_vat_data', json_encode($cookie_customer_vat_data));
        } 
    }
    
    /**
     * AdvancedVatManager::hookActionValidateOrder()
     * @params array $params
     * @return
     */
    public function hookActionValidateOrder($params)
    {
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            if ($this->context->employee === null) {
                $order = $params['order'];
                $country_id = Address::getCountryAndState((int)ValidationEngine::$id_address_used)['id_country'];
                $customerOrders = new CustomersOrders(); 

                // Save orders if the order is an intra-community operation, Brexit or VOEC.           
                if (!ValidationEngine::skipVATFieldBycountry($country_id) && $country_id != Configuration::get('ADVANCEDVATMANAGER_LOCAL_COUNTRY')) {
                    $customerOrders->addCustomersOrders($order, $order->id_customer, ValidationEngine::$notax_customer, $order->invoice_number, ValidationEngine::$brexit_customer, ValidationEngine::$voec_customer, (ValidationEngine::$customer_with_vat_valid?'company':'consumer'));  
                }
                // Save order state with VAT validated status
                if (Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS') && ValidationEngine::$customer_with_vat_valid && CustomersVAT::checkVATWithSystemFails) {
                    if ($order->current_state != (int)Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS')) {
                        $order->setCurrentState((int)Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_VALID_STATUS'));    
                    }
                }
                // Send email to customer when API system fails and skip validation option is enabled
                if (Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') && CustomersVAT::checkVATWithSystemFails(ValidationEngine::$id_address_used) && Configuration::get('ADVANCEDVATMANAGER_SEND_CUSTOMER_EMAIL_API_FAIL_ORDER')) {
                    $customer = new Customer($order->id_customer);
                    $address = new Address(ValidationEngine::$id_address_used); 
                    $customer_info = array('id_customer' => $customer->id, 'firstname' => $customer->firstname, 'lastname' => $customer->lastname, 'id_country' => $address->id_country, 'vat' => $address->vat_number, 'email' => $customer->email, 'id_address' => $address->id, 'order_reference' => $order->reference); 
                    $this->sendEmail(8, $customer_info);     
                }
                // Delete Cart record in table advancedvatmanager_customer_cart
                $customerCart = new CustomersCart();
                $customerCart->deleteCart($params['cart']->id, $this->context->shop->id);
            }
        }
    }
    
    public function hookActionOrderHistoryAddAfter($params)
    {
        if (Module::isEnabled($this->name)) {
            if ($this->context->employee === null) {
                // Change order state when system fails and send email to customer.
                if (Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') && CustomersVAT::checkVATWithSystemFails(ValidationEngine::$id_address_used)) {
                    if (Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS') != 0) {  
                        $history = $params['order_history'];
                        $order = new Order($history->id_order);
                        if (Validate::isLoadedObject($order->getCurrentOrderState())) {
                            if ($order->current_state != (int)Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS')) {
                                $order->setCurrentState((int)Configuration::get('ADVANCEDVATMANAGER_DISPLAY_VAT_VALIDATION_PENDING_STATUS'));    
                            }   
                        }             
                    }
                } 
            }
        }  
    }
    
    /**
     * AdvancedVatManager::hookActionSetInvoice()
     * @params array $params
     * @return
     */
    public function hookActionSetInvoice($params)
    {       
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            // Update invoice number when it is created.
            if (CustomersOrders::checkCustomerOrderExists((int)$params['Order']->id_customer, (int)$params['Order']->id)) {
                Db::getInstance()->update('advancedvatmanager_orders', array('invoice' => $params['Order']->invoice_number), $where = 'id_order = '.(int)$params['Order']->id);      
            }       
        }        
    }
    
    /**
     * AdvancedVatManager::hookActionCheckoutRender()
     * @params array $params
     * @return
     */
    public function hookActionCheckoutRender($params)
    {
        if (Module::isEnabled($this->name) && version_compare(_PS_VERSION_, '1.7.8.0', '>=') && !$this->opc_presteamshop_enabled) {
            $checkNotAllowCheckout = $this->checkNotAllowCheckout();
            if($checkNotAllowCheckout !== false) {
                $this->context->controller->errors[] = $checkNotAllowCheckout;
                // Remove checkout steps to avoid make an order from customer.
                foreach ($params['checkoutProcess']->getSteps() as $step) {
                    if (is_a($step, 'CheckoutAddressesStep')) {
                        $step->setCurrent(true);
                    }
                }
                $params['checkoutProcess']->setHasErrors(true);
                $params['checkoutProcess']->invalidateAllStepsAfterCurrent();
            }
        }
    }
    
    /**
     * AdvancedVatManager::JSVariables()
     * Javascript variables
     * @return
     */
    private function JSVariables()
    {        
        // JS variables
        $advancedvatmanagerJS = array('advancedvatmanager' => array(
            'admin_ajax_url_advancedvatmanager' => $this->context->link->getAdminLink('AdminVATValidation'),
            'id_customer' => (isset($this->context->customer->id)?$this->context->customer->id:Tools::getValue('id_customer')),
            'id_customer_field' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[id_customer]':'id_customer',
            'id_address' => (isset($this->context->address->id)?$this->context->address->id:Tools::getValue('id_address')), 
            'vat_number' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[vat_number]':'vat_number',
            'country_name' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[id_country]':'id_country',
            'company' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[company]':'company', 
            'address1' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[address1]':'address1',
            'address2' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[address2]':'address2',
            'postcode' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[postcode]':'postcode',
            'city' => version_compare(_PS_VERSION_, '1.7.7.0', '>=')?'customer_address[city]':'city',             
            'error_msg' => $this->l('Error checking VAT number.'),                    
            'PS1770' => version_compare(_PS_VERSION_, '1.7.7.0', '>='),
            'ps16' => version_compare(_PS_VERSION_, '1.7.0.0', '<'),
            'controller' => $this->context->controller && property_exists($this->context->controller, 'php_self')?$this->context->controller->php_self:Tools::getValue('controller'),
            'ajax_url_addressVAT' => $this->context->link->getModuleLink('advancedvatmanager','AddressVAT'),
            'vat_field' => configuration::get('ADVANCEDVATMANAGER_VATFIELD'),
            'display_with_company' => (bool)Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY'),
            'company_validation' => (bool)Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION'),
            'company_validation_address' => (bool)Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION'),
            'label' => Configuration::get('ADVANCEDVATMANAGER_FIELD_LABEL', (int)$this->context->language->id, null, (int)$this->context->shop->id),
            'legend' => Configuration::get('ADVANCEDVATMANAGER_FIELD_LEGEND', (int)$this->context->language->id, null, (int)$this->context->shop->id),
            'company_legend' => (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')?$this->l('The company name must match the one registered in the Official systems system in case of inserting a VAT number.'):null).(Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 1?$this->l('If you fill in this field, the VAT field will be displayed.'):null),
            'vat_number_label' => $this->l('VAT number'),
            'NOTALLOW_CHECKOUT_WITHOUT_VALIDATION' => Configuration::get('ADVANCEDVATMANAGER_NOTALLOW_CHECKOUT_WITHOUT_VALIDATION'),
            'opc_presteamshop_enabled' => $this->opc_presteamshop_enabled,
            'price_label_exempt' => Configuration::get('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT', (int)$this->context->language->id, null, (int)$this->context->shop->id),
            'product_action_container' => $this->display(__FILE__, 'views/templates/hook/displayProductActions.tpl'),
            'VOEC_limit' => $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT),
            'disable_cart_nonvoec' => Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC')
        ));
        
        // For compatiblity purposes with OPC module older than 4.1.8 (Remove after passing some months)
        $advancedvatmanagerRetroCompatibilityJS = array(
            'ajax_url_addressVAT' => $this->context->link->getModuleLink('advancedvatmanager','AddressVAT'),
            'vat_field' => configuration::get('ADVANCEDVATMANAGER_VATFIELD'),
            'display_with_company' => (bool)Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY')
        ); 
        
        return array_merge($advancedvatmanagerRetroCompatibilityJS, $advancedvatmanagerJS);   
    }

    /**
     * AdvancedVatManager::hookActionAdminControllerSetMedia()
     * Add the CSS & JavaScript files you want to be loaded in the BO.
     * @return
     */
    public function hookActionAdminControllerSetMedia()
    {
        if (Module::isEnabled($this->name)) {
            if (version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
                $this->context->controller->addCSS($this->_path . 'views/css/tab_icon.css');    
            }
            if (Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')== 1 && Tools::getValue('controller') == 'AdminAddresses') {
                Media::addJsDef($this->JSVariables());
                $this->context->controller->addJS($this->_path.'/views/js/admin/vatverificator_adminaddresses.js');
            }
            if (in_array(Tools::getValue('controller'), $this->controllers) || Tools::getValue('module_name') == $this->name) {                        
                // jQuery and plugins
                $this->context->controller->addJquery();
            }
        }
    }
    
    /**
     * AdvancedVatManager::hookActionFrontControllerSetMedia()
     * Add the CSS & JavaScript files you want to be loaded in the FO.
     * @return
     */
    public function hookActionFrontControllerSetMedia()
    {
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            Media::addJsDef($this->JSVariables()); 
            if ( version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
                 $this->context->controller->registerStylesheet('front', 'modules/' . $this->name . '/views/css/front.css', array('media' => 'all', 'priority' => 10));   
                $this->context->controller->registerJavascript('front', 'modules/' . $this->name . '/views/js/front/front.js', array('position' => 'bottom', 'priority' => 20));  
            }
            else {
                $this->context->controller->addCSS($this->_path.'/views/css/front.css');  
                $this->context->controller->addJS($this->_path.'/views/js/front/front.js');    
            }
            if ($this->context->controller instanceof AddressController || $this->context->controller instanceof AddressesController || $this->context->controller instanceof AuthController || $this->context->controller instanceof OrderOpcController || $this->context->controller instanceof OrderController) {
                if ( version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
                    $this->context->controller->registerJavascript('addressVATManagement', 'modules/' . $this->name . '/views/js/front/addressVATManagement.js', array('position' => 'bottom', 'priority' => 20));
                }
                else {
                    $this->context->controller->addJS($this->_path.'/views/js/front/addressVATManagement.js');
                }
                
            }
            if((Configuration::get('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT', (int)$this->context->language->id, null, (int)$this->context->shop->id) && ValidationEngine::$notax_customer && $this->context->controller instanceof ProductController)) {
                $this->context->controller->addJS($this->_path.'/views/js/hook/displayProductPriceBlock/product_price.js');
            }   
        }
    }
    
    /**
     * AdvancedVatManager::hookDisplayProductPriceBlock()
     * Display content in product price block
     * @return
     */
    public function hookDisplayProductPriceBlock($params)
    {
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            $this->context->smarty->assign(array(
                'product_price_mode' => $product_price_mode = Configuration::get('ADVANCEDVATMANAGER_DISPLAY_PRODUCT_PRICE_MODE'),
                'product' => $params['product'],
                'noTax' => ValidationEngine::$notax_customer,
                'price_label_tax_exempt' => Configuration::get('ADVANCEDVATMANAGER_VATEXEMPT_LABEL_PRODUCT', (int)$this->context->language->id, null, (int)$this->context->shop->id),
                'custom_price_text_tax_exempt' => Configuration::get('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT_TAX_EXEMPT', (int)$this->context->language->id, null, (int)$this->context->shop->id),
                'custom_price_text' => Configuration::get('ADVANCEDVATMANAGER_PRODUCT_CUSTOM_TEXT', (int)$this->context->language->id, null, (int)$this->context->shop->id)
            )); 
            // Display custom prices only since PrestaShop 1.7.8 or higher
            if (version_compare(_PS_VERSION_, '1.7.8.0', '>=')) {
                if ($params['type'] == 'custom_price') {
                    return $this->display(__FILE__, 'views/templates/hook/displayProductPriceBlock/product_price_label.tpl');   
                }  
            }
            //Display product custom text block without taxes and custom text block
            if ($params['type'] == 'after_price') {
                return $this->display(__FILE__, 'views/templates/hook/displayProductPriceBlock/product_custom_text.tpl');
            }
        }
    }
    
    /**
     * AdvancedVatManager::hookDisplayExpressCheckout()
     * Display content in express checkout
     * @return
     */
    public function hookDisplayExpressCheckout()
    {
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            if ((Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') && Configuration::get('ADVANCEDVATMANAGER_BREXIT_NOTALLOWORDERS') != 0 && ValidationEngine::$brexit_customer) || (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') && Configuration::get('ADVANCEDVATMANAGER_VOEC_MODE') == 1 && ValidationEngine::$voec_customer)) {
                $this->context->smarty->assign(array(
                    'gbp_currency_threshold' => $this->getCurrencyAmount('GBP', AVM_BREXIT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign),
                    'voec_product_threashold' => $this->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT).(method_exists('Currency', 'getSymbol')?$this->context->currency->getSymbol():$this->context->currency->sign),
                    'brexit_customer' => ValidationEngine::$brexit_customer,
                    'voec_customer' => ValidationEngine::$voec_customer,   
                )); 
                return $this->display(__FILE__, 'views/templates/hook/displayExpressCheckout/not_allow_message.tpl');               
            } 
        }
    }
    
    public function hookDisplayBackOfficeHeader()
    {
    }
    
    public function hookDisplayFooter()
    {
        if (Module::isEnabled($this->name) && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1) {
            if ($this->context->controller instanceof AddressController || $this->context->controller instanceof AuthController || $this->context->controller instanceof OrderOpcController || $this->context->controller instanceof OrderController) {
                if ( version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
                    $this->context->controller->addJS($this->_path.'/views/js/addressManagement.js');  
                }
            }
        }
    }
}
