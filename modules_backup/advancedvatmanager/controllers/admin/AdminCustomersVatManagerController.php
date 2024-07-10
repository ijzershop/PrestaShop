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

require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/ValidationEngine.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersVAT.php');

class AdminCustomersVatManagerController extends ModuleAdminController
{
    private $message = array();
    private $id_address;

    /**
     * AdminCustomersVatManagerController::__construct()
     * 
     * @return
     */
    public function __construct()
    {
        $this->context = Context::getContext();
        $this->bootstrap = true;
        $this->show_toolbar = true;
        $this->module = Module::getInstanceByName('advancedvatmanager');
        $this->table = 'advancedvatmanager_customers';
        $this->identifier = 'id_advancedvatmanager_customers';
        $this->className = 'CustomersVAT';
        $this->controller_name = 'AdminCustomersVatManager';
        $this->allow_export = true;
        $this->lang = false;
        $this->delete = true;
        $this->_use_found_rows = true;
        $this->list_simple_header = false;
        $this->requiredDatabase = true;
        $this->explicitSelect = true;
        
        parent::__construct();
        
        $this->_orderWay = 'DESC';
        $this->addRowAction('edit');
        $this->addRowAction('viewCustomer');
        $this->addRowAction('checkVAT');
        $this->addRowAction('validateVATManual');
        $this->addRowAction('validateAPI');
        $this->addRowAction('sendVATValidationEmail');
        $this->addRowAction('sendCompanyNameValidationEmail');
        $this->addRowAction('sendCompanyAddressValidationEmail');
        $this->addRowAction('deleteVAT');
        $this->addRowAction('delete');
        
        $this->bulk_actions = array(
                    'validateManually' => array('text' => $this->l('Validate VAT Manually',$this->controller_name), 'icon' => 'fas fa-user-check','confirm' => $this->l('Would you like to validate VAT number for the selected customers?',$this->controller_name)),
                    'validateAPI' => array('text' => $this->l('Validate VAT with API system',$this->controller_name), 'icon' => 'fas fa-user-cog','confirm' => $this->l('Would you like to validate VAT number for the selected customers?',$this->controller_name)),
                    'sendVATValidationEmail' => array('text' => $this->l('Send VAT validation email request',$this->controller_name), 'icon' => 'far fa-envelope','confirm' => $this->l('Would you like to send email to request validate VAT number for the selected customers?',$this->controller_name)),
                    'sendCompanyNameValidationEmail' => array('text' => $this->l('Send Company name validation email request',$this->controller_name), 'icon' => 'far fa-envelope','confirm' => $this->l('Would you like to send email to request validate VAT number for the selected customers?',$this->controller_name)),
                    'sendCompanyAddressValidationEmail' => array('text' => $this->l('Send Company address validation email request',$this->controller_name), 'icon' => 'far fa-envelope','confirm' => $this->l('Would you like to send email to request validate VAT number for the selected customers?',$this->controller_name)),
                    'deleteVAT' => array('text' => $this->l('Delete VAT',$this->controller_name), 'icon' => 'fas fa-user-times','confirm' => $this->l('Would you like to delete VAT number for the selected items?',$this->controller_name)),
                    'delete' => array('text' => $this->l('Delete',$this->controller_name), 'icon' => 'far fa-trash-alt','confirm' => $this->l("Would you like to delete selected items from the list?','AdminCustomersVatManager"))
        );
        
        $this->_select = 'CONCAT(LEFT(ad.`firstname`,1),\'.\',ad.`lastname`) `customer_name`,c.`email`, CONCAT(ad.`address1`,\' \', ad.`address2`) `address`, ad.`company`, cl.`name` as country, co.`iso_code`, gl.`name` as group_name, c.`id_shop`';
        
        $this->_join = 'LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = a.`id_customer`)
		LEFT JOIN `' . _DB_PREFIX_ . 'address` ad ON (ad.`id_customer` = c.id_customer AND ad.`id_address` = a.`id_address`)
        LEFT JOIN `' . _DB_PREFIX_ . 'country` co ON (co.`id_country` = ad.`id_country`)
        LEFT JOIN `' . _DB_PREFIX_ . 'country_lang` cl ON (co.`id_country` = cl.`id_country` AND cl.`id_lang` ='.(int)$this->context->language->id.')
        LEFT JOIN `' . _DB_PREFIX_ . 'group_lang` gl ON (gl.`id_group` = c.`id_default_group` AND gl.`id_lang` ='.(int)$this->context->language->id.')';
        
        $this->_where = 'AND ad.`deleted` = 0 AND ad.`active` = 1'.Shop::addSqlRestriction(Shop::SHARE_CUSTOMER, 'c');

        $shops_name = array();
        foreach (Shop::getShops() as $shop) {
            $shops_name[$shop['id_shop']] = $shop['name'];
        }
        
        $company_validation = array(
            '0' => $this->l('Invalid',$this->controller_name),
            '1' => $this->l('Valid',$this->controller_name), 
            '2' => $this->l('Not validated yet',$this->controller_name)
        );
        
        $client_types = array('consumer' => $this->l('Consumer',$this->controller_name), 'company_nv' => $this->l('Company not validated',$this->controller_name), 'certified_company' => $this->l('Company certified',$this->controller_name), 'company' => $this->l('Company',$this->controller_name));
         
        $this->fields_list = array(
            'id_advancedvatmanager_customers' => array('title' => $this->l('ID',$this->controller_name), 'type' => 'text', 'align' => 'text-center', 'class' => 'fixed-width-xs'),
            'id_customer' => array('title' => $this->l('ID Customer',$this->controller_name), 'filter_key' => 'a!id_customer', 'align' => 'text-center', 'class' => 'fixed-width-xs'),
            'id_address' => array('title' => $this->l('ID Address',$this->controller_name), 'filter_key' => 'a!id_address', 'align' => 'text-center', 'class' => 'fixed-width-xs', 'callback' => 'getIdAddress'),
            'customer_name' => array('title' => $this->l('Name',$this->controller_name), 'type' => 'text', 'filter_key' => 'ad!lastname', 'align' => 'text-center'),
            'id_shop' => array('title' => $this->l('Shop',$this->controller_name), 'type' => 'text','callback' => 'getShop', 'align' => 'text-center', 'filter_type' => 'int', 'filter_key' => 'c!id_shop', 'list' => $shops_name,'type' => 'select',),
            'email' => array('title' => $this->l('Email',$this->controller_name), 'type' => 'text', 'align' => 'text-center', 'filter_key' => 'c!email'),
            'company' => array('title' => $this->l('Company',$this->controller_name), 'type' => 'text', 'align' => 'text-center', 'filter_key' => 'ad!company'),
            'address' => array('title' => $this->l('Address',$this->controller_name), 'type' => 'text', 'filter_key' => 'ad!address1', 'align' => 'text-center'),
            'country' => array('title' => $this->l('Country',$this->controller_name), 'type' => 'text', 'filter_key' => 'cl!name', 'align' => 'text-center'),
            'iso_code' => array('title' => $this->l('Country ISO code',$this->controller_name), 'type' => 'text', 'filter_key' => 'co!iso_code', 'align' => 'text-center'),
            'group_name' => array('title' => $this->l('Default group',$this->controller_name), 'type' => 'text', 'filter_key' => 'gl!name', 'align' => 'text-center'),
            'vat' => array('title' => $this->l('VAT number',$this->controller_name), 'type' => 'text', 'callback' => 'vatText', 'align' => 'text-center'),
            'validated' => array('title' => $this->l('VAT Validation', $this->controller_name), 'align' => 'center','type' => 'bool', 'filter_key' => 'a!validated', 'callback' => 'showValidateIcons', 'class' => 'fixed-width-xs',),
            'validated_company' => array('title' => $this->l('Company validation', $this->controller_name), 'align' => 'center','list' => $company_validation,'type' => 'select', 'filter_key' => 'a!validated_company', 'callback' => 'showValidateCompanyIcons', 'class' => 'fixed-width-xs',),
            'validated_company_address' => array('title' => $this->l('Company address validation', $this->controller_name), 'align' => 'center','list' => $company_validation,'type' => 'select', 'filter_key' => 'a!validated_company_address', 'callback' => 'showValidateCompanyAddressIcons', 'class' => 'fixed-width-xs',),
            'client_type' => array('title' => $this->l('Customer type',$this->controller_name), 'filter_key' => 'a!client_type', 'align' => 'center', 'list' => $client_types, 'type' => 'select', 'callback' => 'showClientType'),
            'system_check' => array('title' => $this->l('System check', $this->controller_name), 'align' => 'center','type' => 'bool','filter_key' => 'a!system_check', 'callback' => 'showValidatesystemIcons', 'class' => 'fixed-width-xs',),
            'status' => array('title' => $this->l('Status',$this->controller_name), 'type' => 'text', 'align' => 'center', 'callback' => 'showStatus'),
            'date_upd' => array('title' => $this->l('Date updated',$this->controller_name), 'type' => 'datetime', 'align' => 'text-left','filter_key' => 'a!date_upd'),
            'date_add' => array('title' => $this->l('Date added',$this->controller_name), 'type' => 'datetime', 'align' => 'text-left','filter_key' => 'a!date_add')
        );
    }
    
    /**
     * AdminCustomersVatManagerController::getShop()
     * 
     * @param mixed $value
     * @return
     */
    public function getShop($value)
    {
        return Shop::getShop($value)['name'];
    } 
    
    public function getIdAddress($value)
    {
        $this->id_address = $value;
        return $value;    
    }
    
    /**
     * AdminCustomersVatManagerController::showClientType()
     * 
     * @param mixed $value
     * @return
     */
    public function showClientType($value)
    {
        $content = '';
        if ($value == 'company') {
            $content = '<img src="../modules/advancedvatmanager/views/img/company.png" width="25" height="25" data-toggle="tooltip" data-placement="top" title="'.$this->l('Company',$this->controller_name).'"/>';
        }
        else if ($value == 'company_nv') {
            $content = '<img src="../modules/advancedvatmanager/views/img/company_nv.png" width="25" height="25" data-toggle="tooltip" data-placement="top" title="'.$this->l('Company not validated',$this->controller_name).'"/>';
        }
        else if ($value == 'certified_company') {
            $content = '<img src="../modules/advancedvatmanager/views/img/company_certified.png" width="25" height="25" data-toggle="tooltip" data-placement="top" title="'.$this->l('Company certified',$this->controller_name).'"/>';        
        }
        else {
            $content = '<img src="../modules/advancedvatmanager/views/img/consumer.png" width="25" height="25" data-toggle="tooltip" data-placement="top" title="'.$this->l('Consumer',$this->controller_name).'"/>'; 
        }
        return $content;
    }
       
    /**
     * AdminCustomersVatManagerController::showStatus()
     * 
     * @param mixed $value
     * @return
     */
    public function showStatus($value)
    {
        return '<i style="font-size:20px;color:#25b9d7;" class="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="'.$value.'"></i>';
    }
    
    /**
     * AdminCustomersVatManagerController::showValidateIcons()
     * 
     * @param mixed $value
     * @return
     */
    public function showValidateIcons($value)
    {
        if ($value == 1) {
            $content = '<i style="font-size:20px;color:#32db1d;" class="fal fa-badge-percent" data-toggle="tooltip" data-placement="top" title="'.$this->l('VAT validated', $this->controller_name).'"></i>';
            if (CustomersVAT::checkVATWithSystemFails($this->id_address)) {
                $content .= '<i style="font-size:20px;color:#fdc700;position:relative;right:2px;" class="fal fa-exclamation-triangle" data-toggle="tooltip" data-placement="top" title="'.$this->l('VAT number validated by skipping validation when the API system failed. Repeat API validation is required.', $this->controller_name).'"></i>';
            }  
        }
        else if ($value == 0) {
            $content ='<i style="font-size:20px;color:#f92727;" class="fal fa-badge-percent" data-toggle="tooltip" data-placement="top" title="'.$this->l('VAT invalid', $this->controller_name).'"></i>';     
        }
        return $content;
    }
    
    /**
     * AdminCustomersVatManagerController::showValidateCompanyIcons()
     * 
     * @param mixed $value
     * @return
     */
    public function showValidateCompanyIcons($value)
    {
        if ($value == 1) {
            $text = $this->l('Company name validated', $this->controller_name);
            return '<i style="font-size:20px;color:#32db1d;" class="fal fa-briefcase" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';   
        }
        else if ($value == 2) {
            $text = $this->l('Company name not checked', $this->controller_name);
            return '<i style="font-size:20px;color:#000000;" class="fal fa-briefcase" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';    
        }
        else if ($value == 0) {
            $text = $this->l('Company name invalid', $this->controller_name);
            return '<i style="font-size:20px;color:#f92727;" class="fal fa-briefcase" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';    
        }
    }
    
    /**
     * AdminCustomersVatManagerController::showValidateCompanyAddressIcons()
     * 
     * @param mixed $value
     * @return
     */
    public function showValidateCompanyAddressIcons($value)
    {
        if ($value == 1) {
            $text = $this->l('Company address validated', $this->controller_name);
            return '<i style="font-size:20px;color:#32db1d;" class="fad fa-map-marked-alt" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';   
        }
        else if ($value == 2) {
            $text = $this->l('Company address not checked', $this->controller_name);
            return '<i style="font-size:20px;color:#000000;" class="fad fa-map-marked-alt" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';    
        }
        else if ($value == 0) {
            $text = $this->l('Company address invalid', $this->controller_name);
            return '<i style="font-size:20px;color:#f92727;" class="fad fa-map-marked-alt" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';    
        }
    }
    
    /**
     * AdminCustomersVatManagerController::showValidateIcons()
     * 
     * @param mixed $value
     * @return
     */
    public function showValidateSystemIcons($value)
    {
        if ($value == 1) {
            $text = $this->l('API request processed successfully', $this->controller_name);
            return '<i style="font-size:20px;color:#32db1d;" class="fas fa-server" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';   
        }
        else if ($value == 0 && $value !== null) {
            $text = $this->l('API request processing error', $this->controller_name);
            return '<i style="font-size:20px;color:#f92727;" class="fas fa-server" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';    
        }
    }
    
    /**
     * AdminCustomersVatManagerController::vatText()
     * 
     * @param mixed $value
     * @return
     */
    public function vatText($value)
    {
        return '<span style="font-size:13px;color:#00a2ef;font-weight:600;">'.$value.'</span>';
    }
   
    /**
     * AdminCustomersVatManagerController::initContent()
     * 
     * @return
     */
    public function initContent()
    {
        //License feature
        if (!AdvancedVatManager::$prestashopAddons) {
            $APIresponse = AdvancedVatManager::checkIsLicenseRegistered();
            if ($APIresponse != 'localhost') {    
                if (!$APIresponse || (isset($APIresponse->success) && $APIresponse->success === false)) {
                    Tools::redirectAdmin($this->context->link->getAdminLink('AdminModules', false) . '&configure=advancedvatmanager&tab_module=others&module_name=advancedvatmanager&token=' . Tools::getAdminTokenLite('AdminModules'));   
                }
            }
        }
        parent::initContent();           
    }
    
    /**
     * AdminCustomersVatManagerController::setMedia()
     * 
     * @param bool $isNewTheme
     * @return
     */
    public function setMedia($isNewTheme = true)
    {
        parent::setMedia(); 
        Media::addJsDef(array(
            'ajax_url_avm_scanner' => $this->context->link->getAdminLink($this->controller_name),
            'scanning' => $this->l('Processing', $this->controller_name),
            'get_total_addresses' => $this->l('Getting addresses from database', $this->controller_name),
            'checking_vat_numbers' => $this->l('Verifying VAT numbers and adding to the Customer VAT list', $this->controller_name),
            'remaining_addresses' => $this->l('Addresses remaining', $this->controller_name),
            'addresses_found' => $this->l('Addresses found', $this->controller_name),
            'empty_addresses' => $this->l('There is not addresses saved in database', $this->controller_name),
            'cancel_process' => $this->l('Scan has been stopped!', $this->controller_name),
            'process_finished_success' => $this->l('Process finished successfully!', $this->controller_name),
            'process_finished_error' => $this->l('Process finished with errors!', $this->controller_name),
            'deleting_empty' => $this->l('Deleting addresses with empty VAT number', $this->controller_name),
            'deleting_duplicated' => $this->l('Deleting addresses with duplicated VAT number', $this->controller_name),
            'deleting_invalid' => $this->l('Deleting addresses with invalid VAT number', $this->controller_name),
            'assign_customerGroups' => $this->l('Assigning customers to groups for valid VAT numbers'),
            'create_file' => $this->l('Generating Customer VAT list file', $this->controller_name),
            'reset_tablelist' => $this->l('Deleting old list data', $this->controller_name),
            'send_email' => $this->l('Sending email to customers', $this->controller_name),
            'allow_duplicated' => (bool)Configuration::get('ADVANCEDVATMANAGER_ALLOWDUPLICATED'),
            'danger' => $this->l('Error'),
            'warning' => $this->l('Warning'),
            'success' => $this->l('Success'),
            'info' => $this->l('Information'),
            'company_validation' => (bool)Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION'),
            'reload_page_url' => $this->context->link->getAdminLink($this->controller_name, true)
        ));
        
        //Fontawesome
        $this->addCSS('https://pro.fontawesome.com/releases/v5.15.4/css/all.css'); 
                
        // Slick modal
        $this->addCSS(_PS_MODULE_DIR_ . 'advancedvatmanager/libs/slickmodal/css/slickmodal.min.css');
        $this->addJS(_PS_MODULE_DIR_ . 'advancedvatmanager/libs/slickmodal/js/jquery.slickmodal.min.js');
                
        // Progress circle
        $this->addJS(_PS_MODULE_DIR_ . 'advancedvatmanager/libs/circle-progress/js/circle-progress.min.js');
                 
        // Timer
        $this->addJS(_PS_MODULE_DIR_ . 'advancedvatmanager/libs/easytimer/easytimer.min.js');                       
        
        // Bootstrap switches
        $this->addCSS(_PS_MODULE_DIR_ . 'advancedvatmanager/libs/bootstrap-switch/css/bootstrap-switch.min.css');
        $this->addJS(_PS_MODULE_DIR_ . 'advancedvatmanager/libs/bootstrap-switch/js/bootstrap-switch.min.js');
        
        $this->addCSS(_PS_MODULE_DIR_ . 'advancedvatmanager/views/css/admin/AdminCustomersVatManager/vat_manager.css');
        $this->addJS(_PS_MODULE_DIR_ . 'advancedvatmanager/views/js/admin/AdminCustomersVatManager/vat_manager.js');
    }

    /**
     * AdminCustomersVatManagerController::initToolbar()
     * 
     * @return
     */
    public function initToolbar()
    {
        parent::initToolbar();

        $this->toolbar_title = $this->meta_title;              
        
        // Remove add new button
         unset($this->toolbar_btn['new']);
    }

    /**
     * AdminCustomersVatManagerController::initPageHeaderToolbar()
     * 
     * @return
     */
    public function initPageHeaderToolbar()
    {
        parent::initPageHeaderToolbar();
    }

    /**
     * AdminCustomersVatManagerController::initProcess()
     * 
     * @return
     */
    public function initProcess()
    {
        parent::initProcess();
    }
    
    /**
     * AdminCustomersVatManagerController::renderForm()
     * 
     * @return
     */
    public function renderForm()
    {
        $this->fields_form = array(
            'legend' => array('title' => $this->l('Edit and Validate VAT number', $this->controller_name),
                    'icon' => 'fas fa-user-edit'),
            'warning' =>  $this->l('If you edit VAT number and validated option here, the changes will be saved without VAT validation process.', $this->controller_name),
            'input' => array(
                array(
                    'type' => 'text',
                    'label' => $this->l('VAT number', $this->controller_name),
                    'name' => 'vat',
                    'col' => 3,
                    'required' => true),
                array(
                    'type' => 'switch',
                    'label' => $this->l('Validate VAT', $this->controller_name),
                    'name' => 'validated',
                    'desc' => $this->l('Select to validate VAT number manually.', $this->controller_name),
                    'required' => false,
                    'is_bool' => true,
                    'values' => array(
                        array(
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Validated', $this->controller_name)
                        ),
                        array(
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Invalid', $this->controller_name)
                        )
                    ),
                ),
                array(
                    'type' => 'select',
                    'label' => $this->l('Validate Company', $this->controller_name),
                    'name' => 'validated_company',
                    'desc' => $this->l('Select to validate company name manually.', $this->controller_name),
                    'required' => false,
                    'options' => array(
                            'query' => array(
                                array('id' => 0, 'name' => $this->l('Invalid', $this->controller_name)),
                                array('id' => 1, 'name' => $this->l('Validated', $this->controller_name)),
                                array('id' => 2, 'name' => $this->l('Not validated yet', $this->controller_name)),
                            ),
                            'id' => 'id',
                            'name' => 'name'
                    )
                ),
                array(
                    'type' => 'select',
                    'label' => $this->l('Validate Company address', $this->controller_name),
                    'name' => 'validated_company_address',
                    'desc' => $this->l('Select to validate company address manually.', $this->controller_name),
                    'required' => false,
                    'options' => array(
                            'query' => array(
                                array('id' => 0, 'name' => $this->l('Invalid', $this->controller_name)),
                                array('id' => 1, 'name' => $this->l('Validated', $this->controller_name)),
                                array('id' => 2, 'name' => $this->l('Not validated yet', $this->controller_name)),
                            ),
                            'id' => 'id',
                            'name' => 'name'
                    )
                ),
                array(
                    'type' => 'select',
                    'label' => $this->l('Customer type', $this->controller_name),
                    'name' => 'client_type',
                    'desc' => $this->l('Select the customer type manually.', $this->controller_name),
                    'required' => false,
                    'options' => array(
                            'query' => array(
                                array('id' => 'consumer', 'name' => $this->l('Consumer', $this->controller_name)),
                                array('id' => 'company_nv' , 'name' => $this->l('Company not validated', $this->controller_name)),
                                array('id' => 'company' , 'name' => $this->l('Company', $this->controller_name)),
                                array('id' => 'certified_company' , 'name' => $this->l('Company certified', $this->controller_name)),
                            ),
                            'id' => 'id',
                            'name' => 'name'
                    )
                ),
                array(
                    'type' => 'textarea',
                    'label' => $this->l('Status', $this->controller_name),
                    'name' => 'status',
                    'desc' => $this->l('Select to modify the status manually.', $this->controller_name),
                ),
            ),
            'submit' => array('title' => $this->l('Save', $this->controller_name)
            )
        );
        return parent::renderForm();
    }

    /**
     * AdminCustomersVatManagerController::renderList()
     * 
     * @return
     */
    public function renderList()
    {   
        $helper = new HelperList();
        $helper->module = $this;
        $this->toolbar_title = $this->l('Customer VAT number list',$this->controller_name); // title
        $tpl_scan = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/scan_panel.tpl');
        $tpl_statistics = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/vat_statistics.tpl');
        $tpl_legend = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/legend.tpl');
        $tpl_popup = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/checkCustomerVAT.tpl');
        
        $countries_ID = CustomersVAT::getCountriesIDForValidation();
        if (!empty($countries_ID)) {
            $countries = array();
            foreach ($countries_ID as $country_id) {
                $countries[] = Country::getNameById($this->context->language->id, $country_id);       
            }
        }
        
        $tpl_statistics->assign(array(
            'total_vat_valid' => CustomersVAT::getTotalWithVATValid(),
            'total_vat_invalid' => CustomersVAT::getTotalWithVATInvalid(),
            'total_company_valid' => CustomersVAT::getTotalWithCompanyValid(),
            'total_company_invalid' => CustomersVAT::getTotalWithCompanyInvalid(),
            'total_company_notvalidated' => CustomersVAT::getTotalWithCompanyNotValidated(),
            'total_companyAddress_valid' => CustomersVAT::getTotalWithCompanyAddressValid(),
            'total_companyAddress_invalid' => CustomersVAT::getTotalWithCompanyAddressInvalid(),
            'total_companyAddress_notvalidated' => CustomersVAT::getTotalWithCompanyAddressNotValidated(),
            
            'total_companies' => CustomersVAT::getTotalCompanies(),
            'total_companiesNotValidated' => CustomersVAT::getTotalCompaniesNv(),
            'total_companiesCertified' => CustomersVAT::getTotalCompaniesCertified(),
            'total_consumers' => CustomersVAT::getTotalConsumers(),
        ));
		$tpl_scan->assign(array(
                'href' => $this->context->link->getAdminLink($this->controller_name).'&action=downloadList&token='.$this->token,
                'countries' => implode(', ', $countries),
                'validation_type' =>  Configuration::get('ADVANCEDVATMANAGER_VALIDATION_TYPE') == 'api'?$this->l('Format + API system validation', $this->controller_name):$this->l('Format validation', $this->controller_name),
                'validation_mode' =>  Configuration::get('ADVANCEDVATMANAGER_VALIDATION_MODE') == 'smart'?$this->l('Smart mode', $this->controller_name):$this->l('Strict mode', $this->controller_name),
                'field_condition' => Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required'?$this->l('Required',$this->controller_name):$this->l('Optional',$this->controller_name),
                'show_with_company' => (bool)Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY'),
                'allow_duplicated' => (bool)Configuration::get('ADVANCEDVATMANAGER_ALLOWDUPLICATED'),
                'saveVATuppercase' => (bool)Configuration::get('ADVANCEDVATMANAGER_SAVETOUPPERCASE'),
                'company_validation' => (bool)Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION'),
                'company_validation_address' => (bool)Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION'),
		));
        return $tpl_legend->fetch().$tpl_statistics->fetch().parent::renderList().$tpl_popup->fetch().$tpl_scan->fetch();
    }

    /**
     * AdminCustomersVatManagerController::renderView()
     * 
     * @return
     */
    public function renderView()
    {
        return parent::renderView();  
    }

    /**
     * AdminCustomersVatManagerController::postProcess()
     * 
     * @return
     */
    public function postProcess()
    {
        parent::postProcess();
        
        $id = Tools::getValue('id_advancedvatmanager_customers');

        // Download excel file
        if (Tools::getValue('action') == 'downloadList') {
            $this->downloadFile();    
        }
        // Validate VAT manually
        else if (Tools::getValue('action') == 'validateVatManually') {
            $this->updateVatProcess($id, 1, $this->l('Manual validation', $this->controller_name));
            CustomersVAT::updateVATAddress(CustomersVAT::getAddressIDbyID($id), Tools::getValue('vat')); 
            
            $this->confirmations[] =  sprintf($this->l('#%s - The VAT number has been validated', $this->controller_name),$id);   
        }
        // Delete VAT
        else if (Tools::getValue('action') == 'deleteVAT') {
            CustomersVAT::deleteVATbyID($id);
            $this->confirmations[] = sprintf($this->l('#%s - The VAT number has been deleted', $this->controller_name),$id);      
        }
        // Validate VAT via API system
        else if (Tools::getValue('action') == 'validateVatAPI') {
            $vat = CustomersVAT::getVATbyID($id);
            $vat_iso = Tools::substr(CustomersVAT::getVATbyID($id), 0, 2);
            $address = new Address((int)CustomersVAT::getAddressIDbyID($id));
            $country_iso = Country::getIsoById((int)$address->id_country);
            
            $ve =  new ValidationEngine($vat);
            if ($vat_iso == 'GB' && Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED')) {
                $ve->validationForUKVAT();
            }
            else if ($country_iso == 'NO' && Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED')) {
                $ve->validationForNORWVAT();    
            }
            else {
                $ve->vatValidationVies(); 
            }
            
            if ($ve->getVATValidation()) {
                $this->updateVatProcess($id, 1, ValidationEngine::getStatus(), ValidationEngine::getSystemFail());
                $this->confirmations[] = sprintf($this->l('#%s - The VAT number %s has been validated', $this->controller_name).'<br />',$id,ValidationEngine::getVat());    
            }
            else {
                $this->updateVatProcess($id, 0, ValidationEngine::getStatus(), ValidationEngine::getSystemFail());
                $this->errors[] = sprintf($this->l('#%s - The VAT number %s could not be valided [%s]', $this->controller_name).'<br />',$id,ValidationEngine::getVat(),$ve->getMessage()); 
            }
        }
        // Send VAT validation email to customer
        else if (Tools::getValue('action') == 'sendVATValidationEmail') {
            $avm = new AdvancedVatManager();
            if ($avm->sendEmail(4, CustomersVAT::getCustomerAddress(self::getCustomerId($id), self::getAddressId($id)))) {
                $this->confirmations[] = sprintf($this->l('#%s - Email sent successfully!', $this->controller_name),$id);
            }
            else {
                $this->errors[] = sprintf($this->l('#%s - An error occurred while sending the email!', $this->controller_name),$id);
            }
        }
        // Send company name validation email to customer
        else if (Tools::getValue('action') == 'sendCompanyNameValidationEmail') {
            $avm = new AdvancedVatManager();
            if ($avm->sendEmail(6, CustomersVAT::getCustomerAddress(self::getCustomerId($id), self::getAddressId($id)))) {
                $this->confirmations[] = sprintf($this->l('#%s - Email sent successfully!', $this->controller_name),$id);
            }
            else {
                $this->errors[] = sprintf($this->l('#%s - An error occurred while sending the email!', $this->controller_name),$id);
            }
        }
        // Send company address validation email to customer
        else if (Tools::getValue('action') == 'sendCompanyAddressValidationEmail') {
            $avm = new AdvancedVatManager();
            if ($avm->sendEmail(9, CustomersVAT::getCustomerAddress(self::getCustomerId($id), self::getAddressId($id)))) {
                $this->confirmations[] = sprintf($this->l('#%s - Email sent successfully!', $this->controller_name),$id);
            }
            else {
                $this->errors[] = sprintf($this->l('#%s - An error occurred while sending the email!', $this->controller_name),$id);
            }
        }
        // Update record
        if (Tools::getValue('submitAddadvancedvatmanager_customers')) {
            CustomersVAT::updateVATAddress(CustomersVAT::getAddressIDbyID($id), Tools::getValue('vat'));
            CustomersVAT::updateVATSystemCheckById($id, null);  
            CustomersVAT::updateVATStatusById($id, $this->l('Manual data modification', $this->controller_name));
        }
    }
    
    /**
     * AdminCustomersVatManagerController::processBulkSendValidationEmail()
     * 
     * @return
     */
    public function processBulkSendVATValidationEmail()
    {
        if ($this->boxes) {
            foreach ($this->boxes as $id) {
                $customer = new Customer(self::getCustomerId($id));
                $avm = new AdvancedVatManager();
                if ($avm->sendEmail(4, $customer)) {
                    $this->confirmations[] = sprintf($this->l('#%s - Email sent successfully to %s!', $this->controller_name).'<br />',$id, $customer->email);   
                }
                else {
                    $this->errors[] = sprintf($this->l('#%s - An error occurred while sending the email to %s!', $this->controller_name).'<br />',$id, $customer->email);       
                }    
            }
        }
    }
    
    /**
     * AdminCustomersVatManagerController::processBulkSendValidationEmail()
     * 
     * @return
     */
    public function processBulkSendCompanyNameValidationEmail()
    {
        if ($this->boxes) {
            foreach ($this->boxes as $id) {
                $customer = new Customer(self::getCustomerId($id));
                $avm = new AdvancedVatManager();
                if ($avm->sendEmail(6, $customer)) {
                    $this->confirmations[] = sprintf($this->l('#%s - Email sent successfully to %s!', $this->controller_name).'<br />',$id, $customer->email);   
                }
                else {
                    $this->errors[] = sprintf($this->l('#%s - An error occurred while sending the email to %s!', $this->controller_name).'<br />',$id, $customer->email);       
                }    
            }
        }
    }
    
    /**
     * AdminCustomersVatManagerController::processBulkSendValidationEmail()
     * 
     * @return
     */
    public function processBulkSendCompanyAddressValidationEmail()
    {
        if ($this->boxes) {
            foreach ($this->boxes as $id) {
                $customer = new Customer(self::getCustomerId($id));
                $avm = new AdvancedVatManager();
                if ($avm->sendEmail(9, $customer)) {
                    $this->confirmations[] = sprintf($this->l('#%s - Email sent successfully to %s!', $this->controller_name).'<br />',$id, $customer->email);   
                }
                else {
                    $this->errors[] = sprintf($this->l('#%s - An error occurred while sending the email to %s!', $this->controller_name).'<br />',$id, $customer->email);       
                }    
            }
        }
    }
    
    /**
     * AdminCustomersVatManagerController::processBulkValidateManually()
     * 
     * @return
     */
    public function processBulkValidateManually() 
    {
        if ($this->boxes) {
            foreach ($this->boxes as $id) {
                CustomersVAT::validateVATbyID($id, 1);
                $this->confirmations[] = sprintf($this->l('#%s - The VAT number has been validated', $this->controller_name).'<br />',$id);       
            }
        }
    }
    
    /**
     * AdminCustomersVatManagerController::processBulkDeleteVAT()
     * 
     * @return
     */
    public function processBulkDeleteVAT() 
    {
        if ($this->boxes) {
            foreach ($this->boxes as $id) {
                CustomersVAT::deleteVATbyID($id);
                $this->confirmations[] = sprintf($this->l('#%s - The VAT number has been deleted', $this->controller_name).'<br />',$id);        
            }
        }
    }
    
    /**
     * AdminCustomersVatManagerController::processBulkValidateVies()
     * 
     * @return
     */
    public function processBulkValidateAPI() 
    {
        if ($this->boxes) {
            foreach ($this->boxes as $id) {
                $vat = CustomersVAT::getVATbyID($id);
                $vat_iso = Tools::substr(CustomersVAT::getVATbyID($id), 0, 2);
                $address = new Address((int)CustomersVAT::getAddressIDbyID($id));
                $country_iso = Country::getIsoById((int)$address->id_country);
                
                $ve =  new ValidationEngine($vat);
                if ($vat_iso == 'GB' && Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED')) {
                    $ve->validationForUKVAT();
                }
                else if ($country_iso == 'NO' && Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED')) {
                    $ve->validationForNORWVAT();    
                }
                else {
                    $ve->vatValidationVies(); 
                }
                
                if ($ve->getVATValidation()) {
                    $this->updateVatProcess($id, 1, ValidationEngine::getStatus(), ValidationEngine::getSystemFail());
                    $this->confirmations[] = sprintf($this->l('#%s - The VAT number %s has been validated', $this->controller_name).'<br />',$id,ValidationEngine::getVat());    
                }
                else {
                    $this->updateVatProcess($id, 0, ValidationEngine::getStatus(), ValidationEngine::getSystemFail());
                    $this->errors[] = sprintf($this->l('#%s - The VAT number %s could not be valided [%s]', $this->controller_name).'<br />',$id,ValidationEngine::getVat(),$ve->getMessage()); 
                }   
            }
        }
    }
    
    
    /**
     * AdminCustomersVatManagerController::processBulkDelete()
     * 
     * @return
     */
    public function processBulkDelete() 
    {
        parent::processBulkDelete();  
    }
    
    /**
     * AdminCustomersVatManagerController::updateVatProcess()
     * 
     * @param int $id
     * @param int $valid
     * @param mixed $status
     * @param int $system
     * @return
     */
    public function updateVatProcess($id, $valid, $status, $system = null)
    {
        CustomersVAT::validateVATbyID($id, $valid);
        CustomersVAT::updateVATStatusById($id, $status);
        CustomersVAT::updateVATSystemCheckById($id, $system);    
    }
    
    /**
     * AdminCustomersVatManagerController::displayViewCustomerLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displayViewCustomerLink($token = null, $id)
    {
        $customer = self::getCustomerId($id);
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/view_customer.tpl');
		$tpl->assign(array(
				'href' => '?tab=AdminCustomers&id_customer='.(int)$customer.'&viewcustomer&token='.Tools::getAdminTokenLite('AdminCustomers'),
				'action' => $this->l('View customer details', $this->controller_name),
		));
	
		return $tpl->fetch();
    }
    
    /**
     * AdminCustomersVatManagerController::displayCheckVATLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displayCheckVATLink($token = null, $id)
    {
        $vat_details = self::getVATDetails($id);
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/check_vat.tpl');
		$tpl->assign(array(
				'action' => $vat_details['country_iso'] != 'GB'?$this->l('Check VAT in VIES', $this->controller_name):$this->l('Check VAT in GOV.UK', $this->controller_name),
                'emptyVAT' => CustomersVAT::checkCustomerVATempty($id),
                'vat_details' => $vat_details,
                'id' => $id,
		));
	
		return $tpl->fetch();
    }
   
    /**
     * AdminCustomersVatManagerController::displayValidateVATManualLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displayValidateVATManualLink($token = null, $id)
    {
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/validate_vat_manually.tpl');
		$tpl->assign(array(
				'href' => $this->context->link->getAdminLink($this->controller_name).'&'.$this->identifier.'='.(int)$id.'&action=validateVatManually&token='.($token !== null ? $token : $this->token),
                'emptyVAT' => CustomersVAT::checkCustomerVATempty($id),
				'action' => $this->l('Validate VAT mnually', $this->controller_name),
		));
	
		return $tpl->fetch();
    }
    
    /**
     * AdminCustomersVatManagerController::displayValidateAPILink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displayValidateAPILink($token = null, $id)
	{
	    $vat_details = self::getVATDetails($id);
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/validate_vat_api.tpl');
		$tpl->assign(array(
				'href' => $this->context->link->getAdminLink($this->controller_name).'&'.$this->identifier.'='.(int)$id.'&action=validateVatAPI&token='.($token !== null ? $token : $this->token),
                'emptyVAT' => CustomersVAT::checkCustomerVATempty($id),
				'action' => $vat_details['country_iso'] != 'GB'?$this->l('Validate VAT with VIES', $this->controller_name):$this->l('Validate VAT with GOV.UK', $this->controller_name),
		));
	
		return $tpl->fetch();
	}
    
    /**
     * AdminCustomersVatManagerController::displayDeleteVATLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displayDeleteVATLink($token = null, $id)
	{
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/delete_vat.tpl');
		$tpl->assign(array(
				'href' => $this->context->link->getAdminLink($this->controller_name).'&'.$this->identifier.'='.(int)$id.'&action=deleteVAT&token='.($token !== null ? $token : $this->token),
                'emptyVAT' => CustomersVAT::checkCustomerVATempty($id),
				'action' => $this->l('Delete VAT number', $this->controller_name),
				'id' => $id,
		));
	
		return $tpl->fetch();
	}
    
    /**
     * AdminCustomersVatManagerController::displaySendValidationEmailLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displaySendVATValidationEmailLink($token = null, $id)
	{
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/send_VATvalidation_email.tpl');
		$tpl->assign(array(
				'href' => $this->context->link->getAdminLink($this->controller_name).'&'.$this->identifier.'='.(int)$id.'&action=sendValidationEmail&token='.($token !== null ? $token : $this->token),
				'action' => $this->l('Send request VAT validation email', $this->controller_name),
				'id' => $id,
		));
	
		return $tpl->fetch();
	}
    
    /**
     * AdminCustomersVatManagerController::displaySendCompanyNameValidationEmailLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displaySendCompanyNameValidationEmailLink($token = null, $id)
	{
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/send_companyNameValidation_email.tpl');
		$tpl->assign(array(
				'href' => $this->context->link->getAdminLink($this->controller_name).'&'.$this->identifier.'='.(int)$id.'&action=sendCompanyNameValidationEmail&token='.($token !== null ? $token : $this->token),
				'action' => $this->l('Send request company name validation email', $this->controller_name),
				'id' => $id,
		));
	
		return $tpl->fetch();
	}
    
    /**
     * AdminCustomersVatManagerController::displaySendCompanyAddressValidationEmailLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displaySendCompanyAddressValidationEmailLink($token = null, $id)
	{
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersVatManager/send_companyAddressValidation_email.tpl');
		$tpl->assign(array(
				'href' => $this->context->link->getAdminLink($this->controller_name).'&'.$this->identifier.'='.(int)$id.'&action=sendCompanyAddressValidationEmail&token='.($token !== null ? $token : $this->token),
				'action' => $this->l('Send request company address validation email', $this->controller_name),
				'id' => $id,
		));
	
		return $tpl->fetch();
	}
    
    /**
     * AdminCustomersVatManagerController::getCustomerId()
     * 
     * @param mixed $id
     * @return
     */
    protected static function getCustomerId($id)
    {
        $sql = 'SELECT id_customer FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customers` WHERE id_advancedvatmanager_customers = '.(int)$id; 
        $id_customer = Db::getInstance()->getValue($sql);
        return (int)$id_customer;
    }
    
    /**
     * AdminCustomersVatManagerController::getAddressId()
     * 
     * @param mixed $id
     * @return
     */
    protected static function getAddressId($id)
    {
        $sql = 'SELECT id_address FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customers` WHERE id_advancedvatmanager_customers = '.(int)$id; 
        $id_customer = Db::getInstance()->getValue($sql);
        return (int)$id_customer;
    }
    
    /**
     * AdminCustomersVatManagerController::getVATDetails()
     * 
     * @param mixed $id
     * @return
     */
    protected static function getVATDetails($id)
    {
        $sql = 'SELECT vat, id_customer FROM `' . _DB_PREFIX_ . 'advancedvatmanager_customers` WHERE id_advancedvatmanager_customers = '.(int)$id; 
        $vat_details = array();
        if ($row = Db::getInstance()->getRow($sql)) {
            $vat_details['vat'] =  Tools::substr($row['vat'], 2);
            $vat_details['country_iso'] =  Tools::substr($row['vat'], 0, 2);
            $vat_details['vat_number'] = $row['vat'];
            $customer = new Customer($row['id_customer']);
            $vat_details['customer'] = $customer->firstname.' '.$customer->lastname;
            return $vat_details;
        }
        return false;
    }
    
    /**
     * AdminCustomersVatManagerController::getMessage()
     * 
     * @return
     */
    private function getMessage()
    {
        return array_unique($this->message);
    }
    
    /**
     * AdminCustomersVatManagerController::downloadFile()
     * 
     * @return
     */
    public function downloadFile()
    {
        $file = _PS_MODULE_DIR_.'advancedvatmanager/download/customers_vat.xlsx';
        // Process download
        if (file_exists($file)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($file) . '"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            flush(); // Flush system output buffer
            readfile($file);
        }
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessCheckTotalAddress()
     * 
     * @return
     */
    public function ajaxProcessCheckTotalAddress()
    {
        if (Tools::getValue('token')) {
            $results = CustomersVAT::getCustomerAddresses();
            if (filter_var(Tools::getValue('scanFromLastMode'), FILTER_VALIDATE_BOOLEAN) === true) {
                $remaining_address = CustomersVAT::getRemainCustomersAddressToCheck();
                if ($remaining_address) {
                    $results = CustomersVAT::getCustomerAddresses($remaining_address);        
                }
                else {
                    $results = false;    
                } 
            }
            else {
                $results = CustomersVAT::getCustomerAddresses();
            }
            
            if ($results) {
                $this->message['success'] = sprintf($this->l('%s addresses have been found in database',$this->controller_name),count($results));    
            }
            else {
                $this->message['info'] = $this->l('No addresses have been found',$this->controller_name);    
            }
            die(json_encode(array('total' => $results!== false?count($results):0, 'addresses' => $results, 'message' => $this->getMessage())));
        }
        else {
            die('Token is not valid!');
        }
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessRemoveVAT()
     * 
     * @return
     */
    public function ajaxProcessRemoveVAT()
    {
        if (Tools::getValue('token')) {
            $vat_address = Tools::getValue('address');
            $result = false;
            if (!empty($vat_address)) {
                if (Tools::getIsset('duplicated')) {
                    $var_duplicated = array();
                    foreach ($vat_address as $element) {
                        $var_duplicated[$element['vat_number']][] = $element['id_address'];
                    }
                    foreach ($var_duplicated as $id_addresses) {
                        $min_address = min($id_addresses);
                        $customer_allowed = CustomersVAT::getCustomerIDByAddress($min_address);
                        foreach ($id_addresses as $id_address) {
                            if ($customer_allowed != CustomersVAT::getCustomerIDByAddress($id_address)) {
                                CustomersVAT::deleteByIDAddress($id_address);
                                if ($result = Db::getInstance()->update('address', array('deleted' => '1'), 'id_address ='.(int)$id_address)) {
                                    $this->message['success'][] = sprintf($this->l('The address with ID#%s has been deleted',$this->controller_name),$id_address);
                                }
                                else {
                                    $this->message['danger'][] = sprintf($this->l('The address with ID#%s could not be deleted',$this->controller_name),$id_address);    
                                } 
                            }
                        }
                    }
                }
                else {
                    CustomersVAT::deleteByIDAddress($vat_address['id_address']); 
                    if ($result = Db::getInstance()->update('address', array('deleted' => '1'), 'id_address ='.(int)$vat_address['id_address'])) {
                        $this->message['success'] = sprintf($this->l('The address with ID#%s has been deleted',$this->controller_name),$vat_address['id_address']);
                    }
                    else {
                        $this->message['danger'] = sprintf($this->l('The address with ID#%s could not be deleted',$this->controller_name),$vat_address['id_address']);    
                    }  
                }
            }
            die(json_encode(array('success' => $result, 'message' => $this->getMessage())));
        }
        else {
            die('Token is not valid!');
        }
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessAssignCustomerGroup()
     * 
     * @return
     */
    public function ajaxProcessAssignCustomerGroup()
    {
        if (Tools::getValue('token')) {
            $vat_address = Tools::getValue('address');
            if (!empty($vat_address)) {
                if (isset($vat_address['invalid_vat'])) {
                    $message = ValidationEngine::manageCustomerGroups($vat_address['invalid_vat']['id_country'], $vat_address['invalid_vat']['id_customer'], $vat_address['invalid_vat']['id_address'], false);    
                }
                else if (isset($vat_address['valid_vat'])) {
                    $message = ValidationEngine::manageCustomerGroups($vat_address['valid_vat']['id_country'], $vat_address['valid_vat']['id_customer'], $vat_address['valid_vat']['id_address'], true);
                }
            }
            $this->message['success'] = implode('<br />', $message);
            die(json_encode(array('success' => true, 'message' => $this->getMessage())));
        }
        else {
            die('Token is not valid!');
        }
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessCreateFile()
     * 
     * @return
     */
    public function ajaxProcessCreateFile()
    {
        if (Tools::getValue('token')) {
            require_once(_PS_MODULE_DIR_ . 'advancedvatmanager/libs/simplexlsxgen/SimpleXLSXGen.php');
            $vat_address = CustomersVAT::getCustomerAddressesWithValidationInfo();
            $content = array();
            if (!empty($vat_address)) {
                // Create Excel File
                $file = _PS_MODULE_DIR_.'advancedvatmanager/download/customers_vat.xlsx';

                $content[] = [$this->l('ID Address',$this->controller_name), $this->l('ID Customer',$this->controller_name), $this->l('Customer name',$this->controller_name), $this->l('Email',$this->controller_name), $this->l('Address',$this->controller_name), $this->l('VAT Number',$this->controller_name), $this->l('VAT Validated',$this->controller_name), $this->l('Company validated',$this->controller_name), $this->l('System check',$this->controller_name), $this->l('Status',$this->controller_name)];
                
                foreach ($vat_address as $fields) {
                    $content[] = [$fields['id_address'], $fields['id_customer'], $fields['firstname'].' '.$fields['lastname'], $fields['email'], $fields['address1'].' - '.$fields['address2'], $fields['vat'], (int)$fields['validated'], (int)$fields['validated_company'], (int)$fields['system_check'], $fields['status']];
                }
                
                $xlsx = SimpleXLSXGen::fromArray($content);
                $xlsx->saveAs($file);
                
                $this->message['success'] = $this->l('File with Customer VAT list has been created successfully',$this->controller_name);
            }
            die(json_encode(array('success' => true, 'message' => $this->getMessage())));
        }
        else {
            die('Token is not valid!');
        }          
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessSendEmail()
     * 
     * @return
     */
    public function ajaxProcessSendEmail()
    {
        if (Tools::getValue('token')) {
            $vat_address = Tools::getValue('address');
            if (!empty($vat_address)) {
                $avm = new AdvancedVatManager();
                $customer_address = CustomersVAT::getCustomerAddress($vat_address['id_customer'], $vat_address['id_address']);
                $success = $avm->sendEmail(Tools::getValue('mode'), $customer_address);
                if ($success) {
                    $this->message['success'] = sprintf($this->l('The email has been sent successfully to customer %s with email address %s',$this->controller_name),$customer_address['firstname'].' '.$customer_address['lastname'], $customer_address['email']);
                }
                else {
                    $this->message['danger'] = sprintf($this->l('The email could not be sent to customer %s with email address %s due an error.',$this->controller_name),$customer_address['firstname'].' '.$customer_address['lastname'], $customer_address['email']);    
                }
                
            }
            die(json_encode(array('success' => $success, 'message' => $this->getMessage())));
        }
        else {
            die('Token is not valid!');
        }        
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessResetListTable()
     * 
     * @return
     */
    public function ajaxProcessResetListTable()
    {
        if (Tools::getValue('token')) {
            if ($success = CustomersVAT::truncateTable()) {
                $this->message['success'] = $this->l('Customers VAT list has been deleted successfully!',$this->controller_name);
            }
            else {
                $this->message['danger'] = $this->l('Customers VAT list could not be deleted due an error!',$this->controller_name);
            }
            die(json_encode(array('success' => $success, 'message' => $this->getMessage())));
        }
        else {
            die('Token is not valid!');
        }
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessCheckVATNumber()
     * 
     * @return
     */
    public function ajaxProcessCheckVATNumber()
    {
        if (Tools::getValue('token')) {
            $autoInsertCompany = ValidationEngine::$company_autoinsert_otion =(bool)Tools::getValue('autofillcompany');
            $empty_vat = array();
            $invalid_vat = array();
            $invalid_company = array();
            $invalid_companyAddress = array();
            $empty_company = array();
            $valid_vat = array();
            $valid_vat_skipping_validation = array();
            $duplicated_vat = array();
            $message = '';
            // Address values
            $address =  Tools::getValue('address');
            $id_customer = $address['id_customer'];
            $id_country = $address['id_country'];
            $id_address = $address['id_address'];
            $company = $address['company'];
            $customer_name = $address['firstname'].' '.$address['lastname'];
            $email = $address['email'];
            $vat = $address['vat_number'];
            $company_address = array(
                'address1' => $address['address1'],
                'address2' => $address['address2'],
                'city' => $address['city'],
                'postcode' => $address['postcode'],  
            );
            $ve = new ValidationEngine($vat);
            ValidationEngine::$skip_api_fails = (bool)Tools::getValue('skip_apisystemfails');
            ValidationEngine::$admin_scan = true;
            $valid = $ve->VATValidationProcess($id_country, $id_customer, $id_address, $company, $company_address);
            $vat_number = ValidationEngine::getVat();
            $validation = ValidationEngine::getVATValidation();
            $status = ValidationEngine::getStatus();
            $validation_company = ValidationEngine::$company_valid;
            $registered_company = ValidationEngine::getRegisteredCompanyName();
            
            if (!ValidationEngine::$skip_validation_process) {
                if (!$valid) {
                    if (!$vat_number){
                        $empty_vat = $address;   
                    }
                    else {
                        $invalid_vat  = $address;       
                    }
                }
                else if ($valid) {
                    // Duplicated VAT
                    if (ValidationEngine::$duplicated === true) {
                        $duplicated_vat = $address;    
                    }
                    // Auto-inser mode on
                    if ($autoInsertCompany) {
                        $company = $registered_company;  
                    }
                    else {
                        // Checks empty company name
                        if (empty($company) && $validation_company == 0) {
                            $empty_company = $address;    
                        }
                        // Checks invalid company
                        else if (!empty($company) && $validation_company == 0) {
                            $invalid_company  = $address;       
                        } 
                    }
                    
                    if (ValidationEngine::getSystemFail() && ValidationEngine::$skip_api_fails) {
                        $valid_vat_skipping_validation = $address;
                    }
                    else {
                        $valid_vat  = $address;    
                    }
                    
                    // Company address validation
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
                        if (!ValidationEngine::$companyAddress_valid) {
                            $invalid_companyAddress = $address; 
                            foreach (ValidationEngine::$addressValidationError as $field => $content) {
                                if ($content['validation'] == 'error') {
                                    $ve->setMessage($content['message']);
                                }    
                            }
                        }
                    }
                }
                // Insert element into table ps_advancedvatmanager_customers
                $cv = new CustomersVAT();
                if ($cv->addCustomersVAT($vat_number, $id_customer, $id_address, $validation, $validation_company, ValidationEngine::$companyAddress_valid, $status,  ValidationEngine::checkClientType(), Configuration::get('ADVANCEDVATMANAGER_COMPANY_AUTOINSERT')?$company:null, ValidationEngine::getSystemFail())) {
                    $this->message['success'] = sprintf($this->l('The address with ID#%s and VAT number %s has been saved into the Customer VAT list',$this->controller_name),$id_address, $vat_number);
                    if ($autoInsertCompany) {
                        CustomersVAT::updateCompanyName($id_address, $company);
                        $this->message['success'] = sprintf($this->l('The company name %s has been updated correctly in address ID#%s',$this->controller_name), $company, $id_address);
                    }
                }
                else {
                    $this->message['danger'] = sprintf($this->l('The address with ID#%s and VAT number %s could not be saved into the Customer VAT list',$this->controller_name),$id_address, $vat_number);
                }
            }

            // Build message
            $message .= sprintf($this->l('ID Address: %s', $this->controller_name), $id_address).'<br />';
            $message .= sprintf($this->l('ID Customer: %s', $this->controller_name), $id_customer).'<br />';
            $message .= sprintf($this->l('Name: %s', $this->controller_name), $customer_name).'<br />';
            $message .= sprintf($this->l('Email: %s', $this->controller_name), $email).'<br />';
            $message .= sprintf($this->l('VAT number: %s', $this->controller_name), $vat_number).'<br />';
            $message .= sprintf($this->l('Country: %s', $this->controller_name), Country::getNameById($this->context->language->id, $id_country)).'<br />';
            $message .= sprintf($this->l('Company: %s', $this->controller_name), $company).'<br />';
            $message .= sprintf($this->l('Message: %s', $this->controller_name), $ve->getMessage()).'<br />';
            $message .= sprintf($this->l('Status: %s', $this->controller_name), $status).'<br />'; 
            
            die(json_encode(array(
                'valid' => $validation,
                'valid_vat' => $valid_vat,
                'valid_vat_skipping_validation' => $valid_vat_skipping_validation,  
                'invalid_vat' => $invalid_vat,
                'invalid_company' => $invalid_company,
                'invalid_companyAddress' => $invalid_companyAddress,
                'empty_company' => $empty_company,
                'duplicated_vat' => $duplicated_vat, 
                'empty_vat' => $empty_vat, 
                'company' => $company,
                'message' => $message, 
                'message_onlive' => $this->getMessage()
            )));
        }
        else {
            die('Token is not valid!');
        }
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessCleanCache()
     * 
     * @return
     */
    public function ajaxProcessCleanCache()
    {
        if (method_exists('Tools','clearAllCache')) {
            Tools::clearAllCache();      
        }
        else if (method_exists('Tools','clearSmartyCache')) {
            Tools::clearSmartyCache();    
        }
        die(json_encode(array(
            'success' => true
        )));  
    }
    
    /**
     * AdminCustomersVatManagerController::ajaxProcessCheckVATNumber()
     * 
     * @return
     */
    public function ajaxProcessCheckCustomerVAT()
    {
        if (Tools::getValue('token')) {
            $check_system = '';
            if (Tools::getValue('country_iso') == 'GB' && Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED')) {
                $ve = new ValidationEngine(Tools::getValue('vat_number'));
                $valid = $ve->validationForUKVAT(); 
                $check_system = 'HMRC GOV.UK';  
            }
            else if (Tools::getValue('country_iso') == 'NO' && Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED')) {
                $ve = new ValidationEngine(Tools::getValue('vat_number'));
                $valid = $ve->validationForNORWVAT();
                $check_system = 'data.brreg.no';  
            }
            else {
                $ve = new ValidationEngine(Tools::getValue('vat_number'));
                $valid = $ve->vatValidationVies();
                $check_system = 'VIES'; 
            }
            die(json_encode(array(
                'valid' => $valid, 
                'vat_number' => $ve->getVatNumber(),
                'vat_iso' => $ve->getVatIso(),
                'company' => $ve->getRegisteredCompanyName(),
                'address' => $ve->getAddress(),
                'request_date' => $ve->getRequestDate(),
                'customer' => Tools::getValue('customer'),
                'check_system' => $check_system,
                'message' => $ve->getMessage()
            )));
        }
        else {
            die('Token is not valid!');
        }
    }
    
    /**
     * AdminCustomersVatManagerController::l()
     * Implements translations compatibility
     * @param mixed $string
     * @param mixed $class
     * @param bool $addslashes
     * @param bool $htmlentities
     * @return
     */
    protected function l($string, $class = null, $addslashes = false, $htmlentities = true)
    {
        if (version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
            return $this->module->l($string, $class.'Controller');
        } else {
            return parent::l($string, $class, $addslashes, $htmlentities);
        }
    }          
}