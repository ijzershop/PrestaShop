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
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersCart.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersExemption.php');

class ValidationEngine extends Module
{
    private static $vat;
    private static $vat_number;
    private static $vat_iso_code;
    
    private static $valid;
    private static $system_fail = null;  
    private static $status = array();  
    
    // API response data
    private static $traderStreet;
    private static $traderPostcode;
    private static $traderCity;
    private static $traderName;
    private $address;
    private static $registered_company_name;
    private $website;
    private $requester_vat_number;
    private $requester_vat_iso_code;
    private $requestDate; 
    public static $skip_api_fails = false;
    
    private $error_code_vies;
    private $error_code_govUK;
    
    protected $eu_prefix = array();
    
    // Add more ISO code to update European countries
    public static $european_countries_iso = array('AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK');
    public static $european_zipCodeFormat = array('AT' => 'NNNN','BE' => 'NNNN','BG' => 'NNNN','CY' => 'NNNN','CZ' => 'NNN NN','DE' => 'NNNNN','DK' => 'NNNN','EE' => 'NNNNN','ES' => 'NNNNN','FI' => 'NNNNN','FR' => 'NNNNN','GR' => 'NNNNN','HR' => 'NNNNN','HU' => 'NNNN','IE' => 'NNNNNNN','IT' => 'NNNNN','LT' => 'NNNNN','LU' => 'NNNN','LV' => 'C-NNNN','MT' => 'LLL NNNN','NL' => 'NNNN LL','PL' => 'NNNNN','PT' => 'NNNN-NNN','RO' => 'NNNNNN','SE' => 'NNN NN','SI' => 'NNNN','SK' => 'NNN NN');
    public static $north_ireland_states = array('GB-NIR', 'GB-ANT','GB-ARM','GB-DOW','GB-BFS','GB-BNB','GB-BLA','GB-BLY','GB-CKF','GB-CLR','GB-CKT','GB-CGV','GB-DRY','GB-DGN','GB-FER','GB-LRN','GB-LMV','GB-LSB','GB-MFT','GB-NTA','GB-NYM','GB-OMH');
    public static $brexit_countries_iso = array('GB');
    public static $voec_countries_iso = array('NO');
    
    public static $country_state_iso = null;
    public static $countryID;
    public static $country_iso;
    
    public static $company_valid = 2;// 1 Valid, 0 Invalid, 2 Not checked
    public static $companyAddress_valid = 2;// 1 Valid, 0 Invalid, 2 Not checked
    public static $validation_process = false;
    public static $skip_validation_process = false;
    public static $addressValidationError = false;
    public static $fieldValidationError = false; //Save field name and error message to be displayed in address form.
    public static $duplicated = false;
    public static $notax_customer = false;
    public static $customer_with_vat_valid = false;
    public static $brexit_customer = false;
    public static $voec_customer = false;
    public static $voec_company = false;
    public static $no_voec_product = false;// True when a product is 3.000 NOK or higher
    public static $voec_product = false;
    public static $allow_checkout = true;
    public static $init_validation_process = false;
    public static $id_address_used;
    public static $merchant_validation = false;
    public static $checkVatCron = false; // True when it is using the Check VAT Cron task 
    public static $checkVatProcess = false; // True when it is using the Check VAT in customer VAT number management 
    public static $checkVATTool = false;
    public $message;
    public static $admin_scan = false;
    public static $company_autoinsert_otion = false;

    /**
     * Characters to scape from Documents
     *
     * @var array
     */
    protected $escapeChars = array(".", ",", "-", "_", " ");
    
    /**
     * ValidationEngine::__construct()
     * 
     * @param bool $vat
     * @return
     */
    public function __construct($vat = null)
    {         
        $this->error_code_vies = array(
            'INVALID_INPUT' => $this->l('Invalid country ISO code', 'ValidationEngine'),
            'INVALID_REQUESTER_INFO' => $this->l('Invalid Merchant VAT information', 'ValidationEngine'),
            'SERVICE_UNAVAILABLE' => $this->l('Service unavailable', 'ValidationEngine'),
            'MS_UNAVAILABLE' => $this->l('Request unavailable', 'ValidationEngine'),
            'TIMEOUT' => $this->l('Timeout', 'ValidationEngine'),
            'VAT_BLOCKED' => $this->l('VAT number is blocked', 'ValidationEngine'),
            'IP_BLOCKED' => $this->l('Mercahnt server IP address is blocked', 'ValidationEngine'),
            'GLOBAL_MAX_CONCURRENT_REQ' => $this->l('Maximum global of concurrent requests reached', 'ValidationEngine'),
            'GLOBAL_MAX_CONCURRENT_REQ_TIME' => $this->l('Maximum global time of concurrent requests reached', 'ValidationEngine'),
            'MS_MAX_CONCURRENT_REQ' => $this->l('Maximum of concurrent requests reached', 'ValidationEngine'),
            'MS_MAX_CONCURRENT_REQ_TIME' => $this->l('Maximum time of concurrent requests reached', 'ValidationEngine'),
            'NOT_FOUND' => $this->l('UK VAT number is not found as registered company', 'ValidationEngine'),
            'INVALID_REQUEST' => $this->l('Invalid API request', 'ValidationEngine'),
            'INTERNAL_SERVER_ERROR' => $this->l('Internal server error', 'ValidationEngine'),
        );
        
        $this->error_code_govUK = array(
            '400' => Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM') == '1-way'?$this->l('Invalid VAT number. Number should be 9 or 12 digits', 'ValidationEngine'):$this->l('Invalid merchant VAT number. Number should be 9 or 12 digits', 'ValidationEngine'),
            '404' => $this->l('VAT number does not match a registered company.', 'ValidationEngine'),
            '403' => $this->l('Merchant VAT number does not match a registered company.', 'ValidationEngine'),
        );
        
        // Company address validation resuts. None for no validation. success or error depends on the validation results.
        self::$addressValidationError = array(
            'address1' => array('validation' => '', 'message' => sprintf($this->l('The content of this field [%s] must match what is registered in the company address.', 'ValidationEngine'), $this->l('Address', 'ValidationEngine'))), 
            'postcode' => array('validation' => '', 'message' => sprintf($this->l('The content of this field [%s] must match what is registered in the company address.', 'ValidationEngine'), $this->l('Postcode', 'ValidationEngine'))), 
            'city' => array('validation' => '', 'message' => sprintf($this->l('The content of this field [%s] must match what is registered in the company address.', 'ValidationEngine'), $this->l('City', 'ValidationEngine')))
        );
        
        self::$fieldValidationError = array(
            'vat_number' => array('validation' => '', 'message' => ''),
            'company' => array('validation' => '', 'message' => '')
        ); 

        // Save countries ISO code for VAT
        $countries_id = CustomersVAT::getCountriesIDForValidation();
        if (!empty($countries_id)) {
            foreach ($countries_id as $id) {
                // Fix brexit with Nord of Ireland
                if (Country::getIsoById($id) == 'GB') {
                    $this->eu_prefix[Country::getIsoById($id)] = 'XI'; 
                }
                // Fix Greece iso code in VAT
                else if (Country::getIsoById($id) == 'GR') {
                    $this->eu_prefix[Country::getIsoById($id)] = 'EL'; 
                }
                else {
                    $this->eu_prefix[Country::getIsoById($id)] = Country::getIsoById($id);
                }
            }    
        }
        // Register merchant VAT as requester
        if (Tools::getValue('ADVANCEDVATMANAGER_MERCHANT_VAT')) {
            $this->requester_vat_number = Tools::substr(Tools::getValue('ADVANCEDVATMANAGER_MERCHANT_VAT'), 2);
            $this->requester_vat_iso_code = Tools::substr(Tools::getValue('ADVANCEDVATMANAGER_MERCHANT_VAT'), 0, 2);     
        }
        else if (configuration::get('ADVANCEDVATMANAGER_MERCHANT_VAT')) {
            $this->requester_vat_number = Tools::substr(configuration::get('ADVANCEDVATMANAGER_MERCHANT_VAT'), 2);
            $this->requester_vat_iso_code = Tools::substr(configuration::get('ADVANCEDVATMANAGER_MERCHANT_VAT'), 0, 2);     
        }
        else {
            $this->requester_vat_number = '';
            $this->requester_vat_iso_code = '';    
        }
        
        self::$vat = $this->formatVAT($vat);// Format VAT number
        self::$vat_number = Tools::substr(self::$vat, 2);
        self::$vat_iso_code = Tools::substr(self::$vat, 0, 2);  
        self::$status = array();
        self::$company_valid = 2;
        self::$companyAddress_valid = 2;
        
        if ((Configuration::get('ADVANCEDVATMANAGER_SKIPAPISYSTEMFAIL') == 1 && self::$checkVatCron == false && self::$checkVatProcess == false && self::$checkVATTool == false))
        {
            self::$skip_api_fails = true;
        }
        parent::__construct();
    }
    
    /**
     * ValidationEngine::getVATValidation()
     * Gets VAT number validation (true or false)
     * @return
     */
    public static function getVATValidation()
    {
        return self::$valid;
    }
    
    /**
     * ValidationEngine::setVATValidation()
     * 
     * @param mixed $valid
     * @return
     */
    public static function setVATValidation($valid = null)
    {
        if ($valid !== null) {
            self::$valid = $valid;    
        }
        return self::$valid;
    }
    
    /**
     * ValidationEngine::getSystemFail()
     * 
     * @return
     */
    public static function getSystemFail()
    {
        return self::$system_fail;
    }
    
    /**
     * ValidationEngine::setSystemFail()
     * 
     * @param mixed $system_fail
     * @return
     */
    public static function setSystemFail($system_fail)
    {
        self::$system_fail = $system_fail;
        return self::$system_fail;
    }
    
    /**
     * ValidationEngine::getAddress()
     * 
     * @return
     */
    public function getAddress()
    {
        return $this->address;
    }
    
    /**
     * ValidationEngine::getTraderStreet()
     * 
     * @return
     */
    public static function getTraderStreet()
    {
        return self::$traderStreet;
    }
    
    /**
     * ValidationEngine::getTraderCity()
     * 
     * @return
     */
    public static function getTraderCity()
    {
        return self::$traderCity;
    }
    
    /**
     * ValidationEngine::getTraderPostcode()
     * 
     * @return
     */
    public static function getTraderPostcode()
    {
        return self::$traderPostcode;
    }
    
    /**
     * ValidationEngine::getTraderName()
     * 
     * @return
     */
    public static function getTraderName()
    {
        return self::$traderName;
    }    
    
    /**
     * ValidationEngine::getWebsite()
     * 
     * @return
     */
    public function getWebsite()
    {
        return $this->website;
    }
    
    /**
     * ValidationEngine::getRegisteredCompanyName()
     * 
     * @return
     */
    public static function getRegisteredCompanyName()
    {
        return self::$registered_company_name;
    }
    
    /**
     * ValidationEngine::getRequestDate()
     * 
     * @return
     */
    public function getRequestDate()
    {
        return $this->requestDate;
    }
    
    /**
     * ValidationEngine::getVat()
     * Gets VAT number complete (with ISO code)
     * @return
     */
    public static function getVat()
    {
        return self::$vat;
    }
    
    /**
     * ValidationEngine::setVat()
     * Sets VAT number complete (with ISO code)
     * @params $vat VAT number with ISO code
     * @return
     */
    public static function setVat($vat)
    {
        if ($vat !== null) {
            self::$vat = $vat;    
        }
        return self::$vat;
    }
    
    /**
     * ValidationEngine::getVatNumber()
     * Gets VAT number with no ISO code
     * @return
     */
    public static function getVatNumber()
    {
        return self::$vat_number;
    }
    
    /**
     * ValidationEngine::setVatNumber()
     * Sets VAT number with no ISO code
     * @params $vat VAT number with no ISO code
     * @return
     */
    public static function setVatNumber($vat)
    {
        self::$vat_number = $vat;
    }
    
    /**
     * ValidationEngine::getVatIso()
     * Gets ISO code from VAT number
     * @return
     */
    public static function getVatIso()
    {
        return self::$vat_iso_code;
    }
    
    /**
     * ValidationEngine::setVatIso()
     * Gets ISO code from VAT number
     * @return
     */
    public static function setVatIso($iso_code)
    {
        self::$vat_iso_code = $iso_code;
    }
    
    /**
     * ValidationEngine::getrequesterVatNumber()
     * 
     * @return
     */
    public function getrequesterVatNumber()
    {
        return $this->requester_vat_number;
    }
    
    /**
     * ValidationEngine::getrequesterVatIso()
     * 
     * @return
     */
    public function getrequesterVatIso()
    {
        return $this->requester_vat_iso_code;
    }
    
    /**
     * ValidationEngine::getVIESresponse()
     * 
     * @return
     */
    public function getVIESresponse()
    {
        return $this->response;
    }
    
    /**
     * ValidationEngine::getEUPrefix()
     * 
     * @return
     */
    public function getEUPrefix()
    {
        return $this->eu_prefix;
    }
    
    /**
     * ValidationEngine::getStatus()
     * 
     * @return
     */
    public static function getStatus()
    {
        return implode(' | ', self::$status);
    }
    
    /**
     * ValidationEngine::setStatus()
     * 
     * @param mixed $status
     * @return
     */
    public static function setStatus($status = null)
    {
        if ($status !== null) {
            self::$status[] = $status;    
        }
    }
    
    /**
     * ValidationEngine::getMessage()
     * 
     * @return
     */
    public function getMessage()
    {
        return $this->message;
    }
    
    /**
     * ValidationEngine::setMessage()
     * 
     * @param mixed $message
     * @return
     */
    public function setMessage($message = null)
    {
        if ($message !== null) {
            if (!empty($this->message)) {
                $this->message .= '<br />'.$message;
            }
            else {
                $this->message = $message;     
            } 
        }
        return $this->message;
    }
    
    /**
     * ValidationEngine::escape()
     * Escape the Document or any string. Remove the $scape_chars of the string.
     * @param mixed $string
     * @return
     */
    public function escape($string)
    {
        return str_replace($this->escapeChars, "", $string);
    }
     
    /**
     * ValidationEngine::skipVATFieldBycountry()
     * Skip validation for non selected countries for validation
     * @param mixed $country_id
     * @return
     */
    public static function skipVATFieldBycountry($country_id = null)
    {
        $countries = CustomersVAT::getCountriesIDForValidation();
        // Checks countries to skip validation
        if (!$countries || ($country_id && !in_array($country_id, $countries))) {
            return true;    
        }   
        return false;
    }
    /**
     * ValidationEngine::skipVATValidation()
     * Skip validation for determined conditions
     * @param mixed $country_id
     * @param mixed $company
     * @param mixed $vat_number
     * @return
     */
    public static function skipVATValidation($country_id = null, $company =  null, $vat_number = null)
    {
        if ($vat_number == null) {
            $vat_number = Tools::getValue('vat_number');
        }
        
        if ($company == null) {
            $company = Tools::getValue('company');
        }
        
        if ($country_id == null) {
            $country_id = Tools::getValue('id_country');
        }
        
        // Reforce validation system to avoid issues validating wrong VAT numbers in wrong countries what happens in the execution of cron tasks to import orders in third-party modules.
        if ($country_id == null || $country_id == '') {
            return true;    
        }
        
        // Skip validation for modules selected
        if ($disabled_mod = json_decode(Configuration::get('ADVANCEDVATMANAGER_DISABLE_FORMODULES'), true)) {
            foreach ($disabled_mod as $module) {
                if (self::checkModuleController($module)) {
                    return true;
                }    
            }    
        }
        
        // Checks if country is selected to verify VAT numbers.
        if (self::skipVATFieldBycountry($country_id)) {
            return true;
        } 

        // Checks Front validation enabled
        if (Context::getContext()->controller instanceof FrontController) {
            if (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION') == 0 && self::$admin_scan == false) {
                return true;
            }
            // Checks if VAT number is empty and field is optional
            if (empty($vat_number) && Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional') {
                return true;        
            }
            // Checks company field
            if (Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') && ((Tools::getIsset('company') && Tools::getValue('company') == '') || empty($company))) {
                return true;    
            }    
        }
        // Checks Admin validation enabled
        else if (Context::getContext()->controller instanceof AdminController) {
            // Admin VAT validation
            if (Context::getContext()->controller->controller_name ==  'AdminVATValidation') {
                if (empty($vat_number)) {
                    return true;
                }
            }
            if (Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION') == 0 && self::$admin_scan == false) {
                return true;
            }
             // Checks if VAT number is empty and field is optional
            if (empty($vat_number) && Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional') {
                return true;        
            }            
        }
        return false;
    }
    
    /**
     * ValidationEngine::VATValidationProcess()
     * Validation process included skip validation process
     * If skip validation is success then this method returns false and variable self::$skip_validation_process is true.
     * @param mixed $country_id
     * @param mixed $id_customer
     * @param mixed $id_address
     * @param mixed $company
     * @param array $company_address
     * @return
     */
    public function VATValidationProcess($country_id = null, $id_customer = null, $id_address = null, $company = null, $company_address = null)
    { 
        self::$init_validation_process = true;
        
        if ($id_customer == null) {
            $id_customer = (isset(Context::getContext()->customer->id) && Context::getContext()->customer->id?Context::getContext()->customer->id:Tools::getValue('id_customer'));    
        }
        if ($id_address == null) {
            $id_address = Tools::getIsset('id_address')?Tools::getValue('id_address'):false;
        }
        
        $customer = new Customer($id_customer);
        
        // Company name for validation
        if ($company == null) {
            $company = Tools::getValue('company');  
        }
        self::$traderName = $company;

        // Company address for validation
        if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
            if ($company_address == null) {
                self::$traderStreet = (Tools::getValue('address1')?Tools::getValue('address1'):'').(Tools::getValue('address2')?' '.Tools::getValue('address2'):'');
                self::$traderCity = Tools::getValue('city')?Tools::getValue('city'):'';
                self::$traderPostcode = Tools::getValue('postcode')?Tools::getValue('postcode'):'';
            }
            else {
                self::$traderStreet = $company_address['address1'].' '.$company_address['address2'];
                self::$traderCity = $company_address['city'];
                self::$traderPostcode = $company_address['postcode'];
            }
        }
        
        // Customer info for email sends
        $customer_info = array('id_customer' => $customer->id, 'firstname' => $customer->firstname, 'lastname' => $customer->lastname, 'id_country' => $country_id, 'vat' => self::$vat, 'email' => $customer->email, 'id_address' => $id_address);
        
        if ($country_id == null) {
            $country_id = Tools::getValue('id_country');        
        }
        if ($country_id) {
            self::$countryID = $country_id;
            self::$country_iso = Country::getIsoById($country_id);
            if (Tools::getValue('id_state')) {
                $state = new State((int)Tools::getValue('id_state'));
                self::$country_state_iso = $state->iso_code;
            }
        }
        
        // Skip validation process
        if (self::skipVATValidation($country_id, self::$traderName, self::$vat) == false) {
            // Checks blacklist
            if (Configuration::get('ADVANCEDVATMANAGER_BLACKLIST') != '') {
                $blacklist = explode(',', Configuration::get('ADVANCEDVATMANAGER_BLACKLIST'));
                if (in_array(self::$vat, $blacklist)) {
                    $this->message = sprintf($this->l('The VAT number %s is banned and into a blacklist. You cannot register the address with this VAT number.', 'ValidationEngine'), self::$vat);    
                    return self::$valid = false;
                    
                }
            }
            // Validation type
            if (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_TYPE') == 'format') {
                $this->formatValidation($country_id, self::$traderName);
            }
            elseif (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_TYPE') == 'api') {
                if ($this->formatValidation($country_id, self::$traderName)) {
                    //UK VAT
                    if (self::$country_iso == 'GB' && self::$vat_iso_code != $this->eu_prefix['GB']) {
                        if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 1) {
                            $this->validationForUKVAT();      
                        }
                        else {
                            self::$valid = false;
                            $this->message = sprintf($this->l('The VAT number %s belongs to the United Kingdom and this shop does not have validation activated for VAT numbers from this country.', 'ValidationEngine'), self::$vat);
                            self::$status[] = $this->l('The VAT number belongs to the United Kingdom and Brexit option is disabled.', 'ValidationEngine');
                        }
                    }
                    else if (self::$country_iso == 'NO') {
                        if (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1) {
                            $this->validationForNORWVAT();      
                        }
                        else {
                            self::$valid = false;
                            $this->message = sprintf($this->l('The VAT number %s belongs to the Norway and VOEC option is disabled.', 'ValidationEngine'), self::$vat);
                            self::$status[] = $this->l('The VAT number %s belongs to the Norway and VOEC option is disabled.', 'ValidationEngine');
                        }
                    }
                    else if (self::$country_iso != 'GB' || (self::$country_iso == 'GB' && self::$vat_iso_code == $this->eu_prefix['GB'])) {
                        $this->vatValidationVies();  
                    } 
                }
                // No admin scan and send email after API validation
                if (self::$admin_scan == false) {
                    if (self::$valid) {
                        $module = Module::getInstanceByName('advancedvatmanager');
                        // API system process fails
                        if (self::$system_fail == true) {
                            if (Configuration::get('ADVANCEDVATMANAGER_SENDAPIALERT') == 1) {
                                $module->sendEmail(0, $customer_info);    
                            }   
                        }
                        else {
                            if (Configuration::get('ADVANCEDVATMANAGER_SENDEMAILVALIDATION') == 1) {
                                if ($id_address) {
                                    if (!CustomersVAT::checkCustomerVATValid($customer->id, $id_address)) {
                                        $module->sendEmail(1, $customer_info);    
                                    }    
                                }
                                else {
                                    $module->sendEmail(1, $customer_info);        
                                }
                            } 
                        }
                    }
                }
            }
            // Checks duplicated once validation is performed
            if (CustomersVAT::checkduplicated(self::$vat, $id_customer)) {
                self::$duplicated = true;
                if (!empty(self::$vat) && (bool)Configuration::get('ADVANCEDVATMANAGER_ALLOWDUPLICATED') == false && self::$valid) {
                    $this->message = sprintf($this->l('The VAT number %s is already in our database associated to another customer.', 'ValidationEngine'), self::$vat);
                    self::$status[] = $this->l('The VAT number is duplicated.', 'ValidationEngine');
                    self::$valid = false;
                }
                elseif (!empty(self::$vat) && (bool)Configuration::get('ADVANCEDVATMANAGER_ALLOWDUPLICATED') == true && self::$valid) {
                    $this->message = sprintf($this->l('The VAT number %s is already in our database associated to another customer.', 'ValidationEngine'), self::$vat);
                    self::$status[] = $this->l('The VAT number is duplicated.', 'ValidationEngine');
                    self::$valid = true;
                }   
            }
            
            // Save validation in field vat_number
            self::$fieldValidationError['vat_number'] = ['validation' => self::$valid?'success':'error', 'message' => $this->message];     
                    
            //Checks company name
            if (self::$valid && Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')) {
                // If company is not checked yet
                if (self::$company_valid == 2) {
                    if (!empty(self::$traderName) && !$this->companyNameCheckEngine(self::$registered_company_name, self::$traderName)) {
                        self::$company_valid = 0;
                        self::$status[] = sprintf($this->l('The company name %s does not match the company name registered in API system', 'ValidationEngine'), self::$traderName);
                        $this->message = sprintf($this->l('The company name %s is not valid. Please enter the exact name of the company that is registered under that VAT number', 'ValidationEngine'), self::$traderName); 
                        self::$fieldValidationError['company'] = ['validation' => 'error', 'message' => $this->message];     
                    }
                    else if (!empty(self::$traderName) && $this->companyNameCheckEngine(self::$registered_company_name, self::$traderName)) {
                        self::$company_valid = 1;
                        self::$status[] = $this->l('The company validation is successfully', 'ValidationEngine');
                        $this->message = $this->l('The company validation is successfully', 'ValidationEngine');
                        self::$fieldValidationError['company'] = ['validation' => 'success', 'message' => $this->message]; 
                    }
                    else if (empty(self::$traderName)) {
                        self::$company_valid = 0; 
                        self::$status[] = $this->l('The company name field is empty', 'ValidationEngine');
                        $this->message = $this->l('The company name field is empty', 'ValidationEngine'); 
                        self::$fieldValidationError['company'] = ['validation' => 'error', 'message' => $this->message]; 
                    }   
                }
                else if (self::$company_valid == 0) {
                    self::$status[] = sprintf($this->l('The company name %s does not match the company name registered in API system', 'ValidationEngine'), self::$traderName);
                    $this->message = sprintf($this->l('The company name %s is not valid. Please enter the exact name of the company that is registered under that VAT number', 'ValidationEngine'), self::$traderName); 
                }
            }
            if (self::$valid && (Configuration::get('ADVANCEDVATMANAGER_COMPANY_AUTOINSERT') || self::$company_autoinsert_otion)) {
                if (!$this->companyNameCheckEngine(self::$registered_company_name, self::$traderName)) {
                    $this->message = sprintf($this->l('The company name %s has been changed to %s which is the company registered in API system for the VAT number validated'),self::$traderName, self::$registered_company_name);
                }
                self::$company_valid = 1;
            }
            
            // Check company address validation
            if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
                $addressValidatorError = array_column(self::$addressValidationError, 'validation');
                $addressValidatorError = array_count_values($addressValidatorError);
                if (isset($addressValidatorError['error']) && $addressValidatorError['error'] > 0) {
                    self::$companyAddress_valid = 0;
                    self::$status[] = $this->l('The company address inserted by client does not match with the registered in API system.', 'ValidationEngine');
                    //$this->message = $this->l('The company address inserted by client does not match with the registered in API system.', 'ValidationEngine');
                }
                else if (isset($addressValidatorError['success']) && $addressValidatorError['success'] == 3) {
                    self::$status[] = $this->l('The company address validation is successfully.', 'ValidationEngine');
                    //$this->message = $this->l('The company address validation is successfully.', 'ValidationEngine');
                    self::$companyAddress_valid = 1;    
                }
            }
            
            // Assign customer group after validating
            if (!self::$checkVatProcess) {
                self::manageCustomerGroups($country_id, $id_customer, $id_address, self::$valid);    
            }
            // Save static values
            self::$validation_process = true;
            self::$skip_validation_process = false;
            return self::$valid;
        }
        else {
            // Save static values
            self::$validation_process = false;
            self::$skip_validation_process = true;
            
            // Assign customer group after validating
            if (!self::$checkVatProcess) {
                self::manageCustomerGroups($country_id, $id_customer, $id_address, self::$valid);    
            }
            return false;
        }
    }

    /**
     * ValidationEngine::vatValidationVies()
     * API to check VAT number in VIES
     * Example of object response
     * public 'countryCode' => string 'ES'
     * public 'vatNumber' => string '98715847R'
     * public 'requestDate' => string '2021-10-12+02:00'
     * public 'valid' => boolean true
     * public 'name' => string '---'
     * public 'address' => string '---'
     * @params $vat string (Full VAT number with iso code included)
     * @param bool $skip_api_system_fail (Skip validation if API system fails))
     * @return self::$valid boolean (true if validation is OK)
    */
    public function vatValidationVies()
    {
        self::$system_fail = false;
        self::$valid = false;
        // Initialize SOAP Client
        $options = [
            'cache_wsdl'     => WSDL_CACHE_NONE,
            'trace'          => 1,
            'stream_context' => stream_context_create(
                [
                    'ssl' => [
                        'verify_peer'       => false,
                        'verify_peer_name'  => false,
                        'allow_self_signed' => true
                    ]
                ]
            )
        ];
        $client = new SoapClient("https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl", $options);

        try {
            if (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM') == '1-way') {
                $data = array(
                    'countryCode' => self::$vat_iso_code,
                    'vatNumber' => self::$vat_number,
                );
            }
            if (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM') == '2-way') {
                $data['requesterVatNumber'] = $this->requester_vat_number;
                $data['requesterCountryCode'] = $this->requester_vat_iso_code;
            }
            if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
                $data['traderStreet'] = self::$traderStreet;
                $data['traderPostcode'] = self::$traderPostcode;  
                $data['traderCity'] = self::$traderCity;
            }
            
            if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')) {
                $data['traderName'] = self::$traderName;
                $data['traderCompanyType'] = '';
            }
            
            $validation = $client->checkVatApprox($data);
            self::$valid = $validation->valid; 
            $this->requestDate = $validation->requestDate;
            
            if (isset($validation->traderNameMatch)) {
                if ($validation->traderNameMatch == 1) {
                    self::$registered_company_name = $validation->traderName;
                    self::$company_valid = 1;
                }
                else if ($validation->traderNameMatch == 2) {
                    self::$registered_company_name = '';
                    self::$company_valid = 0;
                }
                else if ($validation->traderNameMatch == 3) {
                    self::$company_valid = 2;        
                }
            }
            else if (!isset($validation->traderNameMatch) && !empty($validation->traderName)) {
                self::$registered_company_name = $validation->traderName;        
            }
            else {
                self::$registered_company_name = '';    
            }
            
            $this->address = isset($validation->traderAddress) && !empty($validation->traderAddress)?$validation->traderAddress:'';  
            // Gets response code (200 is OK)
            preg_match("/HTTP\/\d\.\d\s*\K[\d]+/", $client->__getLastResponseHeaders(), $response);
            
            if ((int)$response[0] != 200) {
                self::$system_fail =  true; 
                if (self::$skip_api_fails) {
                    self::$valid =  true;             
                }
                $this->message = sprintf($this->l('An error occurred while the validation process was running [%s]', 'ValidationEngine'), $response[0]);
            }
            else {
                if (self::$valid) {
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && !self::$checkVATTool) {
                        if ($this->address) {
                            if (isset($validation->traderStreetMatch)) {
                                self::$addressValidationError['address1']['validation'] = $validation->traderStreetMatch == 1 || $validation->traderStreetMatch == 3?'success':'error';    
                            }
                            else {
                                self::$addressValidationError['address1']['validation'] = $this->companyAddressCheckEngine($this->address, self::$traderStreet, false)?'success':'error';  
                            }
                            if (isset($validation->traderCityMatch)) {
                                self::$addressValidationError['city']['validation'] = $validation->traderCityMatch == 1 || $validation->traderCityMatch == 3?'success':'error';
                            }
                            else {
                                self::$addressValidationError['city']['validation'] = $this->companyAddressCheckEngine($this->address, self::$traderCity, false, 'city')?'success':'error';  
                            }
                            if (isset($validation->traderPostcodeMatch)) {
                                self::$addressValidationError['postcode']['validation'] = $validation->traderPostcodeMatch == 1 || $validation->traderPostcodeMatch == 3?'success':'error';
                            }
                            else {
                                self::$addressValidationError['postcode']['validation'] = $this->companyAddressCheckEngine($this->address, self::$traderPostcode, false, 'postcode')?'success':'error'; 
                            }
                        }
                        else {
                            if (isset($validation->traderStreetMatch)) {
                                self::$addressValidationError['address1']['validation'] = $validation->traderStreetMatch == 1 || $validation->traderStreetMatch == 3?'success':'error';    
                            }
                            if (isset($validation->traderCityMatch)) {
                                self::$addressValidationError['city']['validation'] = $validation->traderCityMatch == 1 || $validation->traderCityMatch == 3?'success':'error';
                            }
                            if (isset($validation->traderPostcodeMatch)) {
                                self::$addressValidationError['postcode']['validation'] = $validation->traderPostcodeMatch == 1 || $validation->traderPostcodeMatch == 3?'success':'error';
                            }
                        }
                    }
                    $this->message = $this->l('VAT number has been validated successfully by VIES.', 'ValidationEngine');        
                }
                else {
                    $this->message = $this->l('VAT number is invalid.', 'ValidationEngine');       
                }
            }
            self::$status[] = sprintf($this->l('[HTTP code %s | VIES API validation mode %s] - %s'), $response[0],Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM'), $this->message);
        } catch (Exception $e)  {
            self::$system_fail =  true; 
            if (self::$skip_api_fails) {
                self::$valid =  true;
                self::$status[] = sprintf($this->l('An error occurred during the VAT number validation process but system has validated the VAT number to avoid blocking ordering. The error code is [%s].', 'ValidationEngine'), $this->error_code_vies[$e->getMessage()]);
                $this->message = sprintf($this->l('An error occurred during the VAT number validation process. The error code is [%s].', 'ValidationEngine'), $this->error_code_vies[$e->getMessage()]);
            }
            else {
                self::$status[] = sprintf($this->l('%s', 'ValidationEngine'), isset($this->error_code_vies[$e->getMessage()])?$this->error_code_vies[$e->getMessage()]:$e->getMessage());
                $this->message = sprintf($this->l('An error occurred during the VAT number validation process. The error code is [%s].', 'ValidationEngine'), isset($this->error_code_vies[$e->getMessage()])?$this->error_code_vies[$e->getMessage()]:$e->getMessage());
            } 
        }
        return self::$valid;
    }
    
    /**
     * ValidationEngine::validationForUKVAT()
     * API to check UK VAT number in GOV.UK system
     * 
     * @param bool $skip_api_system_fail (Skip validation if API system fails))
     * @return self::$valid boolean (true if validation is OK)
     */
    public function validationForUKVAT()
    {
        self::$system_fail = false;
        self::$valid = false;
        $headers = array(
            'Accept: application/vnd.hmrc.1.0+json',
        ); 
        
        if (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM') == '1-way') {
            $url = 'https://api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/'.self::$vat_number;  
        }
        else if (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM') == '2-way') {
            $url = 'https://api.service.hmrc.gov.uk/organisations/vat/check-vat-number/lookup/'.self::$vat_number.'/'.$this->requester_vat_number;
        }
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT,10);
        
        $response = json_decode(curl_exec($ch), true);

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if ($http_code == 200) {
            self::$valid =  true;
            $this->message = $this->l('UK VAT number has been validated successfully by HMRC GOV.UK system.', 'ValidationEngine');
            self::$registered_company_name = $response['target']['name'];
            $address = '';
            if (isset($response['target']['address'])) {
                foreach ($response['target']['address'] as $value => $line) {
                    if ($value != 'countryCode') {
                        $address .= $line.PHP_EOL;       
                    } 
                }
            }
            $this->address = $address;
            $this->requestDate = $response['processingDate'];
            if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && !self::$checkVATTool) {   
                self::$addressValidationError['address1']['validation'] = $this->companyAddressCheckEngine($address,self::$traderStreet, false)?'success':'error';
                self::$addressValidationError['city']['validation'] = $this->companyAddressCheckEngine($address, self::$traderCity, false, 'city')?'success':'error'; 
                self::$addressValidationError['postcode']['validation'] = $this->companyAddressCheckEngine($response['target']['address']['postcode'], self::$traderPostcode, true)?'success':'error';
            }
        }
        else if ($http_code < 500) {
            if (isset($this->error_code_govUK[$http_code])) {
                $this->message = $this->error_code_govUK[$http_code];    
            }
            else {
                $this->message = sprintf($this->l('An error occurred during the UK VAT number validation process. The error code is [%s].', 'ValidationEngine'), $http_code);    
            }     
        }
        else if ($http_code >= 500) {
            if (self::$skip_api_fails) {
                self::$valid =  true;
                self::$system_fail =  true;   
                self::$status[] = $this->l('An error occurred during the VAT number validation process but system has validated the VAT number to avoid blocking ordering.', 'ValidationEngine');           
            }
            $this->message = sprintf($this->l('An error occurred during the UK VAT number validation process. The error code is [%s].', 'ValidationEngine'), $http_code);    
        }
        
        self::$status[] = sprintf($this->l('[HTTP code %s | HMRC GOV.UK API validation mode %s] - %s'), $http_code,Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM'), $this->message);
        return self::$valid;
    }
    
    /**
     * ValidationEngine::validationForNORWVAT()
     * API to check Norwegian VAT number in data.brreg.no system
     * 
     * @param bool $skip_api_system_fail (Skip validation if API system fails))
     * @return self::$valid boolean (true if validation is OK)
     */
    public function validationForNORWVAT()
    {
        self::$system_fail = false;
        self::$valid = false;
        
        $url = 'https://data.brreg.no/enhetsregisteret/api/enheter/'.self::$vat;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT,10);
        
        $response = json_decode(curl_exec($ch), true);

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if ($http_code == 200) {
            self::$valid =  true;
            $this->message = $this->l('Norwegian VAT number has been validated successfully by data.brreg.no system.', 'ValidationEngine');
            
            self::$registered_company_name = isset($response['navn'])?$response['navn']:'';
            $this->address = (isset($response['forretningsadresse'])?'<strong>'.$this->l('Business address', 'ValidationEngine').'</strong><br /><br />'.implode('<br />', $response['forretningsadresse']['adresse']).'<br />'.$response['forretningsadresse']['postnummer'].' '.$response['forretningsadresse']['kommune'].'<br />'.$response['forretningsadresse']['land']:'').(isset($response['postadresse'])?'<br /><br /><strong>'.$this->l('Postal address', 'ValidationEngine').'</strong><br /><br />'.implode('<br />', $response['postadresse']['adresse']).'<br />'.$response['postadresse']['postnummer'].' '.$response['postadresse']['kommune'].'<br />'.$response['postadresse']['land']:'');           
            $this->requestDate = date("Y-m-d H:i:s"); 
            $this->website = isset($response['hjemmeside'])?$response['hjemmeside']:''; 
            
            $address = isset($response['forretningsadresse'])?implode('', $response['forretningsadresse']['adresse']):'';
            $postcode = isset($response['forretningsadresse'])?$response['forretningsadresse']['postnummer']:'';
            $city = isset($response['forretningsadresse'])?$response['forretningsadresse']['kommune']:'';

            if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && !self::$checkVATTool) {   
                self::$addressValidationError['address1']['validation'] = $this->companyAddressCheckEngine($address, self::$traderStreet, false)?'success':'error';
                self::$addressValidationError['city']['validation'] = $this->companyAddressCheckEngine($city, self::$traderCity, true)?'success':'error';
                self::$addressValidationError['postcode']['validation'] = $this->companyAddressCheckEngine($postcode, self::$traderPostcode, true)?'success':'error';
            }       
        }
        else if ($http_code == 404) {
            $this->message = sprintf($this->l('VAT number %s does not exist', 'ValidationEngine'), self::$vat);
        }
        else if ($http_code == 400) {
            $this->message = sprintf($this->l('VAT number %s is invalid', 'ValidationEngine'), self::$vat);
        }
        else if ($http_code >= 500) {
            if (self::$skip_api_fails) {
                self::$valid =  true;
                self::$system_fail =  true;   
                self::$status[] = $this->l('An error occurred during the VAT number validation process but system has validated the VAT number to avoid blocking ordering.', 'ValidationEngine');           
            }
            $this->message = sprintf($this->l('An error occurred during the UK VAT number validation process. The error code is [%s].', 'ValidationEngine'), $http_code);    
        }
        self::$status[] = sprintf($this->l('[HTTP code %s | data.brreg.no API validation mode %s] - %s'), $http_code,Configuration::get('ADVANCEDVATMANAGER_VALIDATION_SYSTEM'), $this->message);
        return self::$valid;
    }
    
    /**
     * ValidationEngine::companyAddressCheckEngine()
     * Checks company address by score and matches
     * @param string $registeredAddress
     * @param string $contentToCheck
     * @param boolean $exact_match (true for one string comparison mode, false for concurrences mode)
     * @params string $extraContent (content to be added for string comparison)
     * @params string $type (postcode, city, address)
     * @return
     */
    private function companyAddressCheckEngine($registeredAddress, $contentToCheck, $exact_match = false, $type = null)
    {
        $dataExtracted  = array();
        $dataExtracted2 = array(); 
        $dataExtracted3 = array();
        $country_iso = self::$country_iso;
        $special_symbols = array('.',',','_',':',';','(',')','nº','n.',"\r","\n");
        $zipFormat = isset(self::$european_zipCodeFormat[$country_iso])?self::$european_zipCodeFormat[$country_iso]:'';
        
        
        // To lower all strings
        $contentToCheck = Tools::strtolower($contentToCheck);
        $registeredAddress = Tools::strtolower($registeredAddress);
        
        // Remove symbols
        $registeredAddress =  str_ireplace($special_symbols, ' ', $registeredAddress);
        $contentToCheck = str_ireplace($special_symbols, ' ',$contentToCheck);
        
        // Remove double spaces
        $registeredAddress =  str_ireplace('  ', ' ',$registeredAddress);
        $contentToCheck =  str_ireplace('  ', ' ',$contentToCheck);
        
        // Remove extra spaces at beginning and at the end.
        $registeredAddress = trim($registeredAddress);
        $contentToCheck = trim($contentToCheck);
        
                
        $contentToCheck_utf8 = iconv('UTF-8','ASCII//TRANSLIT', $contentToCheck);
        $registeredAddress_utf8 = iconv('UTF-8','ASCII//TRANSLIT', $registeredAddress);
        
        if ($zipFormat) {
            // Build pattern from zip format
            $zipFormatRegex = str_replace('-', '\-', $zipFormat);
            $zipFormatRegex = str_replace(array('L', 'N', 'C', ' '), array('[a-zA-Z]', '[0-9]', $country_iso, '\s?'), $zipFormatRegex);
            // Extracted all strings matches like pattern built in Zip format from registered address to figure out wich one is the postcode
            preg_match("/(\b$zipFormatRegex\b){1}/i", $registeredAddress, $dataExtracted);
            preg_match("/(\b$country_iso$zipFormatRegex\b){1}/i", $registeredAddress, $dataExtracted2);
            preg_match("/(\b$country_iso\-$zipFormatRegex\b){1}/i", $registeredAddress, $dataExtracted3);
        }
        
        if ($exact_match) {
            return ($contentToCheck == $registeredAddress) || ($contentToCheck_utf8 == $registeredAddress_utf8);
        }
        else {
            // If it is a zip code then calculate zip code format to figure out easily the postcode and perform valdiation
            if ($type == 'postcode') {
                if (isset($dataExtracted) && !empty($dataExtracted)) {
                    // Remove space in postalcodes to fix issue with VIES returning postalcodes with no spaces
                    $contentToCheck_space_removed = str_replace(' ', '', $contentToCheck);
                    // Search postcode inserted by customer within data extracted.
                    return in_array($contentToCheck, $dataExtracted) || in_array($contentToCheck_space_removed, $dataExtracted); 
                }
                // In last instance, then compare two strings knowing that matches with space in the middle is like two words separated.
                return preg_match("/\s*(\b$contentToCheck\b){1}\s*/i", $registeredAddress);   
            }
            else if ($type == 'city') {
                // utf8 to avoid issues with strange symbols or accents.
                return preg_match("/\s*(\b$contentToCheck_utf8\b){1}\s*/i", $registeredAddress_utf8);      
            }
            else {
                if (!empty($dataExtracted) || !empty($dataExtracted2) || !empty($dataExtracted3)) {
                    // Remove Postcode from registered address full string
                    $registeredAddress_utf8 = str_replace('  ', ' ', str_replace(array_merge($dataExtracted3, $dataExtracted2, $dataExtracted), '', $registeredAddress_utf8)); 
                }
                // Help removing city inserted by client if it matches into whole string
                if (self::$traderCity) {
                    $registeredAddress_utf8 = trim(str_ireplace(self::$traderCity, '', $registeredAddress_utf8));     
                }

                // Use similar_text function to compare string with utf8 and original content.
                $sim1 = similar_text($contentToCheck, $registeredAddress, $percen1);
                $sim2 = similar_text($contentToCheck_utf8 , $registeredAddress_utf8 , $percen2);
                $max_percent_matches = Tools::ps_round(max(array($percen1, $percen2)));
                
                /*$levenshtein_score1 = levenshtein($contentToCheck, $registeredAddress);
                $levenshtein_score2 = levenshtein($contentToCheck_utf8, $registeredAddress_utf8);
                $best_lv_score = min(array($levenshtein_score1, $levenshtein_score2));*/

                if ($max_percent_matches >= Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
     * ValidationEngine::companyAddressCheckEngine()
     * Checks company name by score and matches
     * @param string $registeredCompany
     * @param string $contentToCheck
     * @return
     */
    private function companyNameCheckEngine($registeredCompany, $contentToCheck)
    {
        $special_symbols = array('.',',','-','_',':',';','(',')','[',']');
        // To lower all strings
        $contentToCheck = Tools::strtolower($contentToCheck);
        $registeredCompany = Tools::strtolower($registeredCompany);
        
        // Remove symbols
        $registeredCompany =  str_ireplace($special_symbols, ' ', $registeredCompany);
        $contentToCheck = str_ireplace($special_symbols, ' ',$contentToCheck);
        
        // Remove double spaces
        $registeredCompany =  str_ireplace('  ', ' ',$registeredCompany);
        $contentToCheck =  str_ireplace('  ', ' ',$contentToCheck);
        
        // Remove extra spaces at beginning and at the end.
        $registeredCompany = trim($registeredCompany);
        $contentToCheck = trim($contentToCheck);
        
                
        $contentToCheck_utf8 = iconv('UTF-8','ASCII//TRANSLIT', $contentToCheck);
        $registeredCompany_utf8 = iconv('UTF-8','ASCII//TRANSLIT', $registeredCompany);
        
        $sim1 = similar_text($contentToCheck, $registeredCompany, $percen1);
        $sim2 = similar_text($contentToCheck_utf8 , $registeredCompany_utf8 , $percen2);
        $max_percent_matches = Tools::ps_round(max(array($percen1, $percen2)));
        if ($max_percent_matches >= Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')) {
            return true;
        }
        return false;
    }
    
    /**
     * ValidationEngine::formatVAT()
     * Format VAT number
     * @param mixed $vat
     * @return
     */
    public function formatVAT($vat)
    {
        self::$vat = $vat;    
        
        if (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_MODE') == 'smart') {
            // Format number
            self::$vat = $this->escape(self::$vat);          
        }
        if (Configuration::get('ADVANCEDVATMANAGER_SAVETOUPPERCASE')) {
            self::$vat = Tools::strtoupper(self::$vat);
        }
        return self::$vat;      
    }
    
    /**
     * ValidationEngine::formatValidation()
     * Format validation process
     * @param mixed $country_id
     * @param mixed $company
     * @return
     */
    public function formatValidation($country_id = null, $company = null)
    { 
        // First char
        $first_char = Tools::substr(self::$vat, 0, 1);
        $country_iso = Country::getIsoById($country_id);
        
        // Add ISO Code if it is missed by client and if smart validation mode is enabled
        if (Configuration::get('ADVANCEDVATMANAGER_VALIDATION_MODE') == 'smart') {  
            // checks iso code digits except Norway
            if (preg_match('/^[0-9]{2}$/', (int)self::$vat_iso_code) && !in_array($country_iso, self::$voec_countries_iso)) {
                // United Kingdom
                if (in_array($country_iso, self::$brexit_countries_iso)) {
                    // Checks North Ireland states
                    if (in_array(self::$country_state_iso, self::$north_ireland_states)) {
                        self::setVatIso($this->eu_prefix[$country_iso]);             
                        self::setVatNumber(self::$vat);                
                        self::setVat(self::$vat_iso_code.self::$vat);    
                    }
                    else {
                        self::setVatIso('GB');             
                        self::setVatNumber(self::$vat);                
                        self::setVat(self::$vat_iso_code.self::$vat);  
                    }   
                }
                else {
                    self::setVatIso($this->eu_prefix[$country_iso]);             
                    self::setVatNumber(self::$vat);                
                    self::setVat(self::$vat_iso_code.self::$vat);  
                }     
            }
        }
        if (empty(self::$vat)) {
            if (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required' || (empty(self::$vat) && Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 1 && $company)) {
                $this->message = $this->l('VAT number is empty.', 'ValidationEngine');
                self::$status[] = $this->l('VAT number empty', 'ValidationEngine');
                self::$valid = false;
                return false;                        
            }     
        }
        if (!empty(self::$vat)) {
            // United Kingdom
            if ($country_iso == 'GB') {
                // UK VAT but Brexit disabled
                if (self::$vat_iso_code == $country_iso && Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 0) {
                    $this->message = sprintf($this->l('The VAT number %s belongs to the United Kingdom and this shop does not have validation activated for VAT numbers from this country.', 'ValidationEngine'), self::$vat);
                    self::$status[] = $this->l('The VAT number belongs to the United Kingdom and Brexit option is disabled.', 'ValidationEngine');
                    self::$valid = false;
                    return false;
                }
                // EU VAT in UK area
                else if ($country_iso != self::$vat_iso_code && $this->eu_prefix[$country_iso] != self::$vat_iso_code) {
                    $this->message = $this->l('VAT number format is not correct. Should contain country iso code at beginning.', 'ValidationEngine');    
                    self::$status[] = $this->l('VAT number format invalid', 'ValidationEngine');
                    self::$valid = false;
                    return false;
                } 
            }
            // Norway
            else if ($country_iso == 'NO') {
                // Norwegian VAT but VOEC disabled
                if (in_array($first_char, array('8','9')) && Tools::strlen(self::$vat) == 9 && Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 0) {
                    $this->message = sprintf($this->l('The VAT number %s belongs to the Norway and VOEC option is disabled.', 'ValidationEngine'), self::$vat);
                    self::$valid = false;
                    return false; 
                }
                // Norwegian VAT with bad format
                else if (!in_array($first_char, array('8','9')) || Tools::strlen(self::$vat) != 9) {
                    $this->message = $this->l('VAT number format is not correct. Should contain 9 digits of length beginning with 8 or 9.', 'ValidationEngine');    
                    self::$status[] = $this->l('VAT number format invalid', 'ValidationEngine');
                    self::$valid = false;
                    return false;
                }
            }
            // EU VAT with wrong ISO code
            else {
                if ($this->eu_prefix[$country_iso] != self::$vat_iso_code) {
                    $this->message = $this->l('VAT number format is not correct. Should contain country iso code at beginning.', 'ValidationEngine');    
                    self::$status[] = $this->l('VAT number format invalid', 'ValidationEngine');
                    self::$valid = false;
                    return false;
                }
            }
            // ISO code validation except Norwegian VAT numbers
            if ($country_iso != 'NO') {           
                if (!$this->ISOCodeValidation(self::$vat_number, self::$vat_iso_code)) {
                    self::$status[] = $this->l('VAT number format invalid', 'ValidationEngine');
                    self::$valid = false;
                    return false;
                }
            }
        }
        // Format validation success
        self::$status[] = $this->l('Format validation', 'ValidationEngine');
        self::$valid = true;
        return true;        
    }

    /**
     * ValidationEngine::basicFormatValidation()
     * Basic format validation process
     * @param mixed $vat
     * @return
     */
    public function basicFormatValidation($vat)
    { 
        //Put it in uppercase
        $vat = Tools::strtoupper($vat);
        // VAT iso code
        $vat_iso_code = Tools::substr($vat, 0, 2);
        // Separate 2 parts of number
        $vat_number = Tools::substr($vat, 2);
     
        if (empty($vat)) {
            $this->message = $this->l('VAT number is empty.', 'ValidationEngine');
            return false;    
        }
        if (in_array($first_char, array('8','9')) && Tools::strlen($vat) == 9 && Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1) {
            return true;    
        }
        else if (!$this->ISOCodeValidation($vat_number, $vat_iso_code)) {
            $this->message = $this->l('VAT number format invalid', 'ValidationEngine');
            return false;
        }
       
        // Format validation success
        return true;        
    }
    
    /**
     * ValidationEngine::ISOCodeValidation()
     * VAT ISO code validation
     * @param mixed $vat_number
     * @param mixed $vat_iso_code
     * @return
     */
    public function ISOCodeValidation($vat_number, $vat_iso_code)
    {
        $valid = true;
        switch ($vat_iso_code) {
            // Austria
            case 'AT':
                if (Tools::strlen($vat_number) != 9 || Tools::substr($vat_number, 0, 1) != 'U' || !preg_match('/^\d+$/', Tools::substr($vat_number, 1))) {
                    $valid = false;
                } 
                break;
            // Belgium
            case 'BE':
                if (Tools::strlen($vat_number) != 10 || !in_array(Tools::substr($vat_number, 0, 1), array(0,1)) || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Bulgaria
            case 'BG':
                if (!in_array(Tools::strlen($vat_number),  array(9, 10)) || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Cyprus
            case 'CY':
                if (Tools::strlen($vat_number) != 9 || !self::isInt(Tools::substr($vat_number, 1, -1)) || !Validate::isString(Tools::substr($vat_number, -1, 1))) {
                    $valid = false;
                } 
                break;
            // Czech Republic
            case 'CZ':
                if (!in_array(Tools::strlen($vat_number),  array(8, 9, 10)) || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Germany
            case 'DE':
                if (Tools::strlen($vat_number) != 9 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break; 
            // Denmark
            case 'DK':
                if (Tools::strlen($vat_number) != 8 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;  
            // Estonia
            case 'EE':
                if (Tools::strlen($vat_number) != 9 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Greece
            case 'EL':
                if (Tools::strlen($vat_number) != 9 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Spain
            case 'ES':
                if (!$this->checkSpanishVATStructure($vat_number)) {
                    $valid = false;
                } 
                break; 
            // Finland
            case 'FI':
                if (Tools::strlen($vat_number) != 8 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Finland
            case 'FI':
                if (Tools::strlen($vat_number) != 8 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // France
            case 'FR':
                if (Tools::strlen($vat_number) != 11 || !self::isInt(Tools::substr($vat_number, 2))) {
                    $valid = false;
                } 
                break;
            // UK
            case 'GB':
                if ((Tools::strlen($vat_number) != 12 && Tools::strlen($vat_number) != 9) || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Croatia
            case 'HR':
                if (Tools::strlen($vat_number) != 11 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Hungary
            case 'HU':
                if (Tools::strlen($vat_number) != 8 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Ireland (Could be improved the format validation for Ireland)
            case 'IE':
                if (!in_array(Tools::strlen($vat_number),  array(8, 9))) {
                    $valid = false;
                } 
                break;
            // Italy
            case 'IT':
                if (Tools::strlen($vat_number) != 11 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break; 
            // Lithuania
            case 'LT':
                if (!in_array(Tools::strlen($vat_number),  array(9, 12)) || Tools::substr($vat_number, 0, 1) != 1 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Luxembourg
            case 'LU':
                if (Tools::strlen($vat_number) != 8 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Latvia
            case 'LV':
                if (Tools::strlen($vat_number) != 11 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Malta
            case 'MT':
                if (Tools::strlen($vat_number) != 8 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Netherlands  
            case 'NL':
                if (Tools::strlen($vat_number) != 12 || Tools::substr($vat_number, 9, 1) != 'B' || !self::isInt(Tools::substr($vat_number, -2))) {
                    $valid = false;
                } 
                break;
            // Poland  
            case 'PL':
                if (Tools::strlen($vat_number) != 10 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Portugal 
            case 'PT':
                if (Tools::strlen($vat_number) != 9 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Romania
            case 'RO':
                if ((Tools::strlen($vat_number) < 2 && Tools::strlen($vat_number) > 10) || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Sweden
            case 'SE':
                if (Tools::strlen($vat_number) != 12 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Slovenia
            case 'SI':
                if (Tools::strlen($vat_number) != 8 || !self::isInt($vat_number)) {
                    $valid = false;
                } 
                break;
            // Slovakia
            case 'SK':
                if (Tools::strlen($vat_number) != 10 || !self::isInt($vat_number) || ($vat_number % 11 != 0)) {
                    $valid = false;
                } 
                break;
            // North of Ireland
            case 'XI':
                if (!in_array(Tools::strlen($vat_number),  array(5, 9, 12)) || (in_array(Tools::strlen($vat_number),  array(9, 12)) && !self::isInt($vat_number))) {
                    $valid = false;
                } 
                break;
        } 
        if ($valid == false) {
            $this->message = $this->l('VAT number format is not valid.', 'ValidationEngine');
        }
        return $valid; 
    }
    
    /**
     * ValidationEngine::checkSpanishVATStructure()
     * Checks spanish VAT number structure
     * @param mixed $vat_number
     * @return
     */
    public function checkSpanishVATStructure($vat_number)
    {
        $dni_chars = array('t', 'r', 'w', 'a', 'g', 'm', 'y', 'f', 'p', 'd', 'x', 'b', 'n', 'j', 'z', 's', 'q', 'v', 'h', 'l', 'c', 'k', 'e');
        $nie_chars = array('x', 'y', 'z');  
        $cif_chars = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'n', 'p', 'q', 'r', 's', 'u', 'v', 'w');
        $control_digits = array('j', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i');
        $split_doc = str_split($vat_number);// split number in array.                              
        
        if (Tools::strlen($vat_number) == 9) {
            // Checks if DNI structure
            if (is_numeric(Tools::substr($vat_number, 0, -1)) && is_string($split_doc[8]) && in_array(Tools::strtolower($split_doc[8]), $dni_chars)) {
                return true;    
            }
            // Checks if NIE structure
            elseif (is_string($split_doc[0]) && in_array(Tools::strtolower($split_doc[0]), $nie_chars) && is_string($split_doc[8]) && in_array(Tools::strtolower($split_doc[8]), $dni_chars)) {
                return true;    
            }
            // Checks if CIF structure
            elseif (is_string($split_doc[0]) && in_array(Tools::strtolower($split_doc[0]), $cif_chars) && is_numeric(Tools::substr($vat_number, 1, -1)) && ((is_string($split_doc[8]) && in_array(Tools::strtolower($split_doc[8]), $control_digits)) || is_numeric($split_doc[8]))) {
                return true;    
            }
        }
        return false;  
    }
    
    /**
     * ValidationEngine::checkNoTax()
     * Checks VAT exemption
     * @param mixed $id_customer
     * @param mixed $id_address
     * @return
     */
    public static function checkNoTax($id_customer = null, $id_address = null, $country_id = null)
    {
        $country_iso = '';
        self::$allow_checkout = true;        
        self::$notax_customer = false;
        self::$brexit_customer = false;
        self::$voec_customer = false;
        self::$voec_company = false;
        self::$customer_with_vat_valid = false;
        self::$no_voec_product = false;
        self::$voec_product = false;
        
        if ($country_id !== null) {
            $country_iso = Country::getIsoById($country_id);
        }        
        
        if ($id_address !== null) {
            $address = new Address($id_address);
            ValidationEngine::$id_address_used = $address->id;
        }
        else {
            ValidationEngine::$id_address_used = $id_address;
        }
        
        if ($country_iso == 'GB') {
            if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED') == 1) {
                // Check North Ireland states as excluded in Brexit.
                if (isset($address->id_state) && !in_array($address->id_state, self::$north_ireland_states)) { 
                    self::$brexit_customer = true;    
                }
            }
        }
        else if ($country_iso == 'NO') {
            if (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED') == 1) {
                self::$voec_customer = true;
            }
        }

        // PRIORITY OPTIONS START
        if ($id_customer == null && $id_address == null && $country_id == null) {
            return false;
        }
        
        // Skip tax for modules selected
        if ($disabled_mod = json_decode(Configuration::get('ADVANCEDVATMANAGER_DISABLE_FORMODULES'), true)) {
            foreach ($disabled_mod as $module) {
                if (self::checkModuleController($module)) {
                    return false;
                }    
            }    
        }
                
        // Checks local country for tax or if country is not set as country for VAT validations
        if (Configuration::get('ADVANCEDVATMANAGER_LOCAL_COUNTRY') && $country_id && $country_id == Configuration::get('ADVANCEDVATMANAGER_LOCAL_COUNTRY')) { 
            return false;
        }
           
        // Checks if customer exemption is set for this customer
        if (CustomersExemption::checkCustomerExemption($id_customer)) {
            self::$notax_customer = true;
            return true; 
        }
        else if (CustomersExemption::checkCustomerForceVATCollection($id_customer)) {
            self::$notax_customer = false;
            return false; 
        }
        
        // Checks group exemption
        if (self::checkGroupExemption($id_customer)) {
            self::$notax_customer = true;
            return true;    
        }             
        // PRIORITY OPTIONS END       

        // Get Cart from table advancedvatmanager_customer_cart
        $products_cart = CustomersCart::getProducts($id_customer, Context::getContext()->shop->id);
        $total_cart = (float)CustomersCart::getTotalCart($id_customer, Context::getContext()->shop->id);
                   
        // Brexit mode for VAT exemption when country address is UK
        if (self::$brexit_customer) {
            self::$customer_with_vat_valid = CustomersVAT::checkCustomerVATValid($id_customer, $id_address);
            $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
            if ($total_cart && $advancedvatmanager->checkNotAllowCheckoutBrexit($total_cart)) {
                self::$allow_checkout = false;     
            }
            // More than 135GBP no tax in any case
            if ($total_cart && $total_cart > $advancedvatmanager->getCurrencyAmount('GBP', AVM_BREXIT_LIMIT)) {
                self::$notax_customer = true;  
            }
            // Less or equal than 135GBP
            else if (self::$customer_with_vat_valid && Configuration::get('ADVANCEDVATMANAGER_BREXIT_VATEXEMPT_LESSTHAN135GBP') == 1) {
                // If company with UK VAT number valid, then no tax
                self::$notax_customer = true; 
            }
        }
        // VOEC mode for VAT exemtpion depends on the VOEC mode selected
        else if (self::$voec_customer) {
            $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
            //No tax if the customer is a company with valid VAT number and VOEC customer is false because it is a company
            if (CustomersVAT::checkCustomerVATValid($id_customer, $id_address)) {
                self::$notax_customer = true; 
                self::$customer_with_vat_valid = true; 
                self::$voec_customer = false;
                self::$voec_company = true; 
            }
            // CHECK SHOPPING CART FOR VOEC AND NON VOEC PROUCTS
            // More than 3.000 NOK
            else if ($total_cart && $total_cart > $advancedvatmanager->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT)) {
                // Checks product prices
                // 3.000 or higher product price then there is a non VOEC product.
                if (max($products_cart) >= $advancedvatmanager->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT)) {
                    self::$no_voec_product = true; 
                } 
                // Less than 3.000 NOK is VOEC product
                if (min($products_cart) < $advancedvatmanager->getCurrencyAmount('NOK', AVM_NOK_PRODUCT_LIMIT)) {
                    self::$voec_product = true; 
                }    
                // Cart contains NON VOEC AND VOEC products
                if (self::$no_voec_product && self::$voec_product) {
                    // Option to allow bundling
                    if (Configuration::get('ADVANCEDVATMANAGER_VOEC_MODE') == 2) {
                        self::$notax_customer = true;    
                    }
                    // Option to not allow bundling and not allow checkour until non VOEC product is deleted.
                    else if (Configuration::get('ADVANCEDVATMANAGER_VOEC_MODE') == 1) {
                        self::$notax_customer = true;
                        self::$allow_checkout = false;     
                    }
                }
                // Cart contains only VOEC products
                else if (!self::$no_voec_product && self::$voec_product) {
                     self::$notax_customer = false; 
                }
                // Cart contains only NON VOEC produts
                else if (self::$no_voec_product && !self::$voec_product) {
                     self::$notax_customer = true; 
                }
                // Check non VOEC products and if shop allow Non VOEC products in shopping cart
                if (self::$no_voec_product && Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC')) {
                    if (
                        (Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'consumer' && self::$voec_customer ) ||
                        (Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'company' && self::$voec_company) ||
                        Configuration::get('ADVANCEDVATMANAGER_VOEC_DISABLE_CART_NONVOEC') == 'all'
                    ){
                        self::$allow_checkout = false;            
                    }
                }  
            }
            // Less or equal than 3.000 NOK then taxed
            else {
                self::$notax_customer = false;
            }         
        }
        else {
            if (Configuration::get('ADVANCEDVATMANAGER_VATEXEMPTION')) {
                if(CustomersVAT::checkCustomerVATValid($id_customer, $id_address)) {
                    self::$notax_customer = true;
                    self::$customer_with_vat_valid = true;   
                } 
            }           
        }
        return self::$notax_customer;
    }
    
    /**
     * Checks if the controller belongs to a module
     *
     * @param string $module Module name lowcase
     * @param string $controller Module name lowcase
     *
     * @return bool
     */
    public static function checkModuleController($module) 
    {   
        if (isset (Context::getContext()->controller->module)) {
            return Context::getContext()->controller->module instanceof $module;    
        }
        return false;
    }
    
    /**
     * ValidationEngine::checkClientType()
     * Checks client type 
     * @return string (consumer, company_nv, company or certified_company)
     */
    public static function checkClientType()
    {
        if (self::getVATValidation()) {
            if (self::$company_valid == 1 && self::$companyAddress_valid == 1) {
                return 'certified_company';
            }
            else if (self::$company_valid == 1 || self::$companyAddress_valid == 1) {
                return 'company';    
            } 
            else {
                return 'company_nv';    
            } 
        }
        else {
            if (self::getTraderName()) {
                return 'company_nv';
            }
            return 'consumer';
        }     
    }
    
    /**
     * ValidationEngine::checkGroupExemption()
     * Checks customer group exemptions
     * @param int $id_customer
     * @return
     */
    public static function checkGroupExemption($id_customer)
    {
        $group_exemption = explode(',',Configuration::get('ADVANCEDVATMANAGER_GROUP_VATEXEMPTION'));
        if (!empty($group_exemption)) {
            foreach ($group_exemption as $group) {
                if (in_array($group, Customer::getGroupsStatic($id_customer))) {
                    return true;
                }    
            }    
        }
        return false;   
    }
    
    /**
     * ValidationEngine::removeCustomerGroup()
     * Remove customer from ID group
     * @param int $customer_id
     * @param int $group_id
     * @return
     */
    public static function removeCustomerGroup($customer_id, $group_id)
    {
        return Db::getInstance()->delete('customer_group', 'id_customer = '.(int)$customer_id.' AND id_group = '.(int)$group_id, 0 , false);
    }
    
    /**
     * ValidationEngine::setDefaultCustomerGroup()
     * Remove customer from ID group
     * @param int $customer_id
     * @param int $default_group
     * @return
     */
    public static function setDefaultCustomerGroup($customer_id, $default_group)
    {
        return Db::getInstance()->update('customer', array('id_default_group' => (int)$default_group), 'id_customer = '.(int)$customer_id); 
    }
    
    /**
     * ValidationEngine::manageCustomerGroups()
     * Manage customer groups depends on valid or not valid VAT number.
     * @param int $id_country
     * @param int $id_customer
     * @param int $id_address
     * @param bool $vat_valid
     * @return array $output_msg (Displays message in Cron task and Customer VAT scanner)
     */
    public static function manageCustomerGroups($id_country, $id_customer, $id_address, $vat_valid = false)
    {
        $group_assignation_bycountry = Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$id_country);
        $countries_with_valid_vat = CustomersVAT::getCustomerAddressesWithVATValidWithAddressExemption($id_customer, $id_address);
        $customer = new Customer($id_customer);
        $customer_groups = $customer->getGroups();
        $assigned_groups = array();
        $output_msg = array();

        // Checks countries address with valid VAT
        if (!empty($countries_with_valid_vat)) {
            // All groups by country set in this module by customer except the current country
            foreach ($countries_with_valid_vat as $country) {
                if ($country['id_country'] == $id_country) {
                    continue;    
                }
                if (configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$country['id_country'])) {
                    $assigned_groups[] = configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$country['id_country']);    
                } 
            }
        }
        
        if (!empty($group_assignation_bycountry)) {
            if ($vat_valid) {
                if (Configuration::get('ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS')) {
                    // Removes customer previous groups and only add the group by country selected in this module.
                    $customer->cleanGroups();
                    $customer->addGroups(array($group_assignation_bycountry));
                    // Set by default Group to avoid issues with no default group assignation after deleting all previous customer groups.
                    self::setDefaultCustomerGroup($id_customer, (int)$group_assignation_bycountry);
                }
                else {
                    // Add to group by country
                    $customer->addGroups(array($group_assignation_bycountry));  
                }                
                $output_msg[] = sprintf(Translate::getModuleTranslation('advancedvatmanager','The client with ID#%s has been assigned to the group %s by the address ID#%s','ValidationEngine'),$id_customer, self::getGroupAssignation($group_assignation_bycountry), $id_address);  
                
                // Set as default group.
                if (Configuration::get('ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION')) {
                    self::setDefaultCustomerGroup($id_customer, (int)$group_assignation_bycountry);// Set default customer group.
                    $output_msg[] = sprintf(Translate::getModuleTranslation('advancedvatmanager','The client with ID#%s has been assigned to the default group %s by the address ID#%s','ValidationEngine'),$id_customer, self::getGroupAssignation($group_assignation_bycountry),  $id_address);  
                }
            }
            else {
                // Remove customer group if the customer has not a valid VAT in this country and not having same group assigned by another VAt valid address.
                if (!CustomersVAT::checkCustomerHasVATValidByCountryWithAddressExemption($id_customer, $id_country, $id_address) && !in_array($group_assignation_bycountry, $assigned_groups)) {  
                    // If customer is assigned into a group
                    if ($customer_groups) {
                        if (in_array($group_assignation_bycountry, $customer_groups)) {
                            self::removeCustomerGroup($id_customer, $group_assignation_bycountry);
                            // If customer group is only one and this is the same as assigned by module, then remove it and assign default customer group by configuration
                            if (count($customer_groups) == 1) {
                                $customer->addGroups(array((int)Configuration::get('PS_CUSTOMER_GROUP')));
                                self::setDefaultCustomerGroup($id_customer, (int)Configuration::get('PS_CUSTOMER_GROUP'));   
                            }
                            else if (count($customer_groups) > 1) {                            
                                // If customer is assigned to another groups from module configuration, then assign as default group
                                if (!empty($assigned_groups)) {
                                    // Set one default group by country configured in this module by customer
                                    self::setDefaultCustomerGroup($id_customer, (int)max($assigned_groups));
                                    $output_msg[] = sprintf(Translate::getModuleTranslation('advancedvatmanager', 'The client with ID#%s has been assigned to the default group %s by the address ID#%s','ValidationEngine'),$id_customer, self::getGroupAssignation((int)$assigned_groups[0], $id_address));   
                                } 
                                // Assign to Prestashop default group another group from Prestashop
                                else {
                                    if ($pos = array_search($group_assignation_bycountry, $customer_groups)) {
                                        unset($customer_groups[$pos]);  
                                    }
                                    self::setDefaultCustomerGroup((int)$id_customer, (int)max($customer_groups));  
                                }  
                            }
                        }
                        else {
                            // Set the newest groups as default customer groups
                            self::setDefaultCustomerGroup((int)$id_customer, (int)max($customer_groups));        
                        }   
                    }
                    else {
                        // Set customer into a default customer group to avoid issues
                        $customer->addGroups(array((int)Configuration::get('PS_CUSTOMER_GROUP')));
                        self::setDefaultCustomerGroup((int)$id_customer, (int)Configuration::get('PS_CUSTOMER_GROUP'));
                    }
                }    
            } 
        }
        $noVATGroup = Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY');
        $noVATConsumerGroup = Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER');
        if (($noVATConsumerGroup || $noVATGroup) && (!$vat_valid || empty(self::$vat))) {
            if (!empty(self::$traderName) && $noVATGroup) {
                if (Configuration::get('ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS')) {
                    // Removes customer previous groups and only add the group by country selected in this module.
                    $customer->cleanGroups();
                    $customer->addGroups(array($noVATGroup)); 
                    // Set by default Group to avoid issues with no default group assignation after deleting all previous customer groups.
                    self::setDefaultCustomerGroup($id_customer, (int)$noVATGroup);
                }
                else {
                    $customer->addGroups(array($noVATGroup));     
                }
                // Set as default group.
                if (Configuration::get('ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION')) {
                    self::setDefaultCustomerGroup($id_customer, (int)$noVATGroup);// Set default customer group.
                    $output_msg[] = sprintf(Translate::getModuleTranslation('advancedvatmanager','The client with ID#%s has been assigned to the default group %s by the address ID#%s','ValidationEngine'),$id_customer, self::getGroupAssignation($noVATGroup), $id_address);  
                }
            }
            else if (empty(self::$traderName) && $noVATConsumerGroup) {
                if (Configuration::get('ADVANCEDVATMANAGER_DELETE_PREVIOUS_GROUPS')) {
                    // Removes customer previous groups and only add the group by country selected in this module.
                    $customer->cleanGroups();
                    $customer->addGroups(array($noVATConsumerGroup)); 
                    // Set by default Group to avoid issues with no default group assignation after deleting all previous customer groups.
                    self::setDefaultCustomerGroup($id_customer, (int)$noVATConsumerGroup);
                }
                else {
                    $customer->addGroups(array($noVATConsumerGroup));     
                }
                // Set as default group.
                if (Configuration::get('ADVANCEDVATMANAGER_DEFAULT_GROUP_ASSIGNATION')) {
                    self::setDefaultCustomerGroup($id_customer, (int)$noVATConsumerGroup);// Set default customer group.
                    $output_msg[] = sprintf(Translate::getModuleTranslation('advancedvatmanager','The client with ID#%s has been assigned to the default group %s by the address ID#%s','ValidationEngine'),$id_customer, self::getGroupAssignation($noVATConsumerGroup), $id_address);  
                }
            }
        }
        
        if (empty($output_msg)) {
            $output_msg[] = sprintf(Translate::getModuleTranslation('advancedvatmanager', 'The client with ID#%s has not been assigned to any customer groups by the address ID#%s','ValidationEngine'),$id_customer, $id_address);       
        }
        return $output_msg; 
    }
    
    /**
     * ValidationEngine::getGroupAssignation()
     * 
     * @return
     */
    public static function getGroupAssignation($group_assigned)
    {
        $groups = array();
        // Get Selected customer group
        foreach (Group::getGroups(Context::getContext()->language->id) as $group) {            
            if ($group['id_group'] == $group_assigned) {
                $groups[] = $group['name'];
            }
        }
        return implode(',',$groups);
    }
    
    /**
     * ValidationEngine::changeCustomerGroupsByAddress()
     * Change customer default group depends on address country selected during checkout.
     * @param int $id_address
     * @param int $id_customer
     * @return
     */
    public static function changeCustomerGroupsByAddress($id_address, $id_customer)
    {
        $address = Address::getCountryAndState($id_address);
        $group_assignation_bycountry = configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_COUNTRY_'.$address['id_country']);
        $customer_groups = Customer::getGroupsStatic($id_customer);
        // Checks if the customer belongs to this group to assign as default.
        if ($group_assignation_bycountry && in_array($group_assignation_bycountry, $customer_groups) && CustomersVAT::checkCustomerVATValid($id_customer, $id_address)) {
            return self::setDefaultCustomerGroup($id_customer, $group_assignation_bycountry);// Set default customer group.
        }
        else if (!CustomersVAT::checkCustomerVATValid($id_customer, $id_address)) {
            $addressObject = new Address($id_address);
            if (Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY') != 0) {
                if (!empty($addressObject->company)) {
                    return self::setDefaultCustomerGroup($id_customer, Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_COMPANY'));// Set default customer group.        
                }
            }
            if (Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER') != 0) {
                if (empty($addressObject->company)) {
                    return self::setDefaultCustomerGroup($id_customer, Configuration::get('ADVANCEDVATMANAGER_GROUPS_ASSIGNATION_NOVAT_CONSUMER'));// Set default customer group.        
                }
            }
        }
        // Assign default customer group if VAt is not valid or group is not assigned within customer groups
        return self::setDefaultCustomerGroup((int)$id_customer, (int)Configuration::get('PS_CUSTOMER_GROUP'));
    }  
    
    /**
     * ValidationEngine::isInt()
     * Checks customer group exemptions
     * @param mixed $number
     * @return
     */
    public static function isInt($number) {
        return (bool)preg_match('/^\d+$/', $number);
    }
    
    /**
     * ValidationEngine::cleanCache()
     * Clean all Prestashop Cache.
     * @return
     */
    public static function cleanCache()
    {
        // Clear cache.
        if (method_exists('Tools', 'clearAllCache')) {
            Tools::clearAllCache();    
        }
        else if (method_exists('Tools', 'clearSmartyCache')) {
            Tools::clearSmartyCache();    
        }
    }
}