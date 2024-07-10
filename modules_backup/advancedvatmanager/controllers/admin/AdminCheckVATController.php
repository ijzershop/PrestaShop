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

class AdminCheckVATController extends ModuleAdminController
{
    private $message = array();

    /**
     * AdminCheckVATControllerController::__construct()
     * 
     * @return
     */
    public function __construct()
    {
        $this->context = Context::getContext();
        $this->bootstrap = true;
        $this->show_toolbar = true;
        $this->module = Module::getInstanceByName('advancedvatmanager');
        $this->controller_name = 'AdminCheckVAT';
        
        parent::__construct();
    }
    
    /**
     * AdminCheckVATControllerController::initContent()
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
     * AdminCheckVATControllerController::initToolbar()
     * 
     * @return
     */
    public function initToolbar()
    {
        parent::initToolbar();

        $this->toolbar_title = $this->meta_title;              
        
        // Remove add new button
         unset($this->toolbar_btn);
    }

    /**
     * AdminCheckVATControllerController::initPageHeaderToolbar()
     * 
     * @return
     */
    public function initPageHeaderToolbar()
    {
        parent::initPageHeaderToolbar();
    }

    /**
     * AdminCheckVATControllerController::initProcess()
     * 
     * @return
     */
    public function initProcess()
    {
        parent::initProcess();
    }
    
    /**
     * AdminCheckVATControllerController::renderList()
     * 
     * @return
     */
    public function renderList()
    {   
        $helper = new HelperList();
        $helper->module = $this;
        $this->toolbar_title = $this->l('Check VAT Tool',$this->controller_name); // title
        $tpl_panel = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCheckVAT/checkVATTool.tpl');

        return $tpl_panel->fetch();
    }

    /**
     * AdminCheckVATControllerController::renderView()
     * 
     * @return
     */
    public function renderView()
    {
        return parent::renderView();  
    }
    
    /**
     * AdminCheckVATControllerController::setMedia()
     * 
     * @param bool $isNewTheme
     * @return
     */
    public function setMedia($isNewTheme = true)
    {
        parent::setMedia(); 
        
        Media::addJsDef(array(
            'ajax_url_checkVAT' => $this->context->link->getAdminLink($this->controller_name),
            'vat_number_desc' => $this->l('Insert full VAT number included country ISO code (Ex: FR12325448)',$this->controller_name),
            'norway_number_desc' => $this->l('Norway company identification number is 9 digits number with no ISO code (Ex: 914778271)',$this->controller_name)
        ));
        
        //Fontawesome
        $this->addCSS('https://pro.fontawesome.com/releases/v5.15.4/css/all.css');                   

        $this->addCSS(_PS_MODULE_DIR_ . 'advancedvatmanager/views/css/admin/AdminCheckVAT/checkVATTool.css');
        $this->addJS(_PS_MODULE_DIR_ . 'advancedvatmanager/views/js/admin/AdminCheckVAT/checkVATTool.js');       
    }
    
    /**
     * AdminCheckVATControllerController::postProcess()
     * 
     * @return
     */
    public function postProcess()
    {
        parent::postProcess();
    }
    
    /**
     * AdminCheckVATControllerController::ajaxProcessCheckCustomerVAT()
     * 
     * @return
     */
    public function ajaxProcessCheckVATTool()
    {
        if (Tools::getValue('token')) {
            $check_system = '';
            $country_name = '';
            $ve = new ValidationEngine(Tools::getValue('vat_number'));
            ValidationEngine::$checkVATTool = true;
            if (Tools::getValue('vat_select') == 'eu_uk_vat') {
                if ($ve->ISOCodeValidation($ve->getVatNumber(),$ve->getVatIso())) {
                    if ($ve->getVatIso() == 'GB') {
                        $ve->validationForUKVAT(); 
                        $check_system =  'HMRC GOV.UK';  
                    }
                    else {
                        $ve->vatValidationVies();
                        $check_system =  'VIES';     
                    }
                    $country_id = Country::getByIso($ve->getVatIso());
                    $country_name = Country::getNameById($this->context->language->id, $country_id);
                    $country_iso = Country::getIsoById($country_id); 
                }
                else {
                    ValidationEngine::setVATValidation(false);    
                }
            }
            else if (Tools::getValue('vat_select') == 'norw_vat') {
                $ve->validationForNORWVAT();
                $check_system =  'data.brreg.no';
                $country_id = Country::getByIso('NO');
                $country_name = Country::getNameById($this->context->language->id, $country_id);
                $country_iso = Country::getIsoById($country_id);   
            }
            die(json_encode(array(
                'valid' => ValidationEngine::getVATValidation(), 
                'vat_number' => $ve->getVatNumber(),
                'vat_iso' => $ve->getVatIso(),
                'country' => $country_name,
                'company' => $ve->getRegisteredCompanyName(),
                'address' => $ve->getAddress(),
                'website' => $ve->getWebsite(),
                'request_date' => $ve->getRequestDate(),
                'check_system' => $check_system,
                'message' => $ve->getMessage()
            )));   
        }
        else {
            die('Token is not valid!');
        }
    }
    
    /**
     * AdminCheckVATControllerController::l()
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