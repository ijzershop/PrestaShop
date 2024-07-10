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

class AdminVATValidationController extends ModuleAdminController
{
    public function __construct()
    {
        $this->controller_name = 'AdminVATValidation';
        parent::__construct();
    }
    
    public function initContent()
    {
        $this->ajax = true;
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
    
    public function setMedia($isNewTheme = true)
    {
        parent::setMedia(); 
    }
    
    public function postProcess() {
        parent::postProcess(); 
    }

    public function ajaxProcessCheckVATnumberAdminAddresses()
    {
        if (Tools::getValue('token')) {
            $vat_number = new ValidationEngine(Tools::getValue('vat_number'));
            $company_address = array(
                'address1' => Tools::getValue('address1'),
                'address2' => Tools::getValue('address2'),
                'city' => Tools::getValue('city'),
                'postcode' => Tools::getValue('postcode'),
            );
            $result = $vat_number->VATValidationProcess(Tools::getValue('country'), Tools::getValue('id_customer'), Tools::getValue('address'), Tools::getValue('company'), $company_address);            
            if (!ValidationEngine::$skip_validation_process) {
                if (ValidationEngine::getVATValidation()) {
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && ValidationEngine::$companyAddress_valid == 0) {
                        ValidationEngine::setVATValidation(false);
                    } 
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') && ValidationEngine::$company_valid == 0)
                    {
                        ValidationEngine::setVATValidation(false);
                    }
                }
                else {
                    if (Configuration::get('ADVANCEDVATMANAGER_ALLOW_REGISTERADDRESS_VATINVALID') == 1) {
                        die(json_encode(array('success'=> true, 'message' => array_merge(ValidationEngine::$addressValidationError, ValidationEngine::$fieldValidationError))));    
                    }
                }
                die(json_encode(array('success'=> ValidationEngine::getVATValidation(), 'message' => array_merge(ValidationEngine::$addressValidationError, ValidationEngine::$fieldValidationError))));     
            }
            else {
                die(json_encode(array('success'=> true)));  
            }
        }
        else {
            die('Token is not valid!');
        }
    }
    
}
