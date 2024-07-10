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

class AdminAddressesController extends AdminAddressesControllerCore
{
    public function processSave()
    {
        if (Module::isEnabled('dniverificator')) {
            if (Configuration::get('DNIVERIFICATOR_BO') == 1) {  
                if (!VerificationEngine::skipDNIFieldBycountry((int)Tools::getValue('id_country'))) {
                    $name = Tools::getValue('firstname').' '.Tools::getValue('lastname');
                    $dniverificator = new VerificationEngine(Tools::getValue('dni'), $name, Tools::getValue('company'));
                    $validation = $dniverificator->verificationProcess((int)Tools::getValue('id_country'), Tools::getValue('id_customer'));
                    if (!VerificationEngine::$skip_validation) {
                        if ($validation && Configuration::get('DNIVERIFICATOR_COMPANY_VALIDATION') == 1 && !VerificationEngine::$company_valid) {
                            $this->errors[] = $dniverificator->getMessage();
                        }
                        else if (!$validation) {
                            $this->errors[] = $dniverificator->getMessage();
                        }
                    }
                }               
            }
        }
        if (Module::isEnabled('advancedvatmanager') && Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')) {
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
                    // Company address validation
                    foreach (ValidationEngine::$addressValidationError as $field => $content) {
                        if ($content['validation'] == 'error') {
                            $this->context->controller->errors[] = $content['message'];    
                        }
                    } 
                }
                else if (!ValidationEngine::getVATValidation() && ValidationEngine::$skip_validation_process === false) {
                    $this->context->controller->errors[] = $module->getMessage();      
                }
            }
        }
        return parent::processSave();   
    }

    public function processAdd()
    {
        if (Module::isEnabled('dniverificator')) {
            if (Configuration::get('DNIVERIFICATOR_BO') == 1) {  
                if (!VerificationEngine::skipDNIFieldBycountry((int)Tools::getValue('id_country'))) {
                    $name = Tools::getValue('firstname').' '.Tools::getValue('lastname');
                    $dniverificator = new VerificationEngine(Tools::getValue('dni'), $name, Tools::getValue('company'));
                    $validation = $dniverificator->verificationProcess((int)Tools::getValue('id_country'), Tools::getValue('id_customer'));
                    if (!VerificationEngine::$skip_validation) {
                        if ($validation && Configuration::get('DNIVERIFICATOR_COMPANY_VALIDATION') == 1 && !VerificationEngine::$company_valid) {
                            $this->errors[] = $dniverificator->getMessage();
                        }
                        else if (!$validation) {
                            $this->errors[] = $dniverificator->getMessage();
                        }
                    }
                }               
            }
        }
        if (Module::isEnabled('advancedvatmanager') && Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')) {
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
                    // Company address validation
                    foreach (ValidationEngine::$addressValidationError as $field => $content) {
                        if ($content['validation'] == 'error') {
                            $this->context->controller->errors[] = $content['message'];    
                        }
                    } 
                }
                else if (!ValidationEngine::getVATValidation() && ValidationEngine::$skip_validation_process === false) {
                    $this->context->controller->errors[] = $module->getMessage();      
                }
            }
        }
        return parent::processAdd(); 
    }
}
