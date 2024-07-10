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
class AddressController extends AddressControllerCore
{
    /*
    * module: advancedvatmanager
    * date: 2024-07-10 13:39:04
    * version: 1.7.0
    */
    public function processSubmitAddress()
    {
        if (Module::isEnabled('advancedvatmanager') && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')) {
            if (version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
                $module = new ValidationEngine(Tools::getValue('vat_number'));
                $company_address = array(
                    'address1' => Tools::getValue('address1'),
                    'address2' => Tools::getValue('address2'),
                    'city' => Tools::getValue('city'),
                    'postcode' => Tools::getValue('postcode'),
                );
                $module->VATValidationProcess(Tools::getValue('id_country'), $this->context->customer->id, Tools::getValue('id_address'), Tools::getValue('company'), $company_address);
                if (ValidationEngine::$skip_validation_process === false) {
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') && ValidationEngine::getVATValidation() && ValidationEngine::$company_valid == 0) {
                        $this->context->controller->errors[] = $module->getMessage(); 
                    }
                    else if (ValidationEngine::getVATValidation() && Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION') && ValidationEngine::$companyAddress_valid == 0) {
                        foreach (ValidationEngine::$addressValidationError as $field => $content) {
                            if ($content['validation'] == 'error') {
                                $this->context->controller->errors[] = $content['message'];    
                            }
                        } 
                    }
                    else if (!ValidationEngine::getVATValidation() && ValidationEngine::$skip_validation_process === false) {
                        $this->context->controller->errors[] = $module->getMessage();      
                    }
                    if (!empty($this->context->controller->errors)) {
                        return $this->context->controller->errors;
                    }
                }
            }
        }
        return parent::processSubmitAddress();
    }
}
