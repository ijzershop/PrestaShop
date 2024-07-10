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

class CustomerAddressForm extends CustomerAddressFormCore
{
    public function getTemplateVariables()
    {
        $context = Context::getContext();
        if (!$this->formFields) {
            $this->formFields = $this->formatter->getFormat();
        }
        if (method_exists($this, 'getPersister')) {
            $this->setValue('token', $this->getPersister()->getToken());    
        }
        else if (isset($this->persister)) {
            $this->setValue('token', $this->persister->getToken());    
        }
        
        $formFields = array_map(
            function (FormField $item) {
                return $item->toArray();
            },
            $this->formFields
        );
        if (empty($formFields['firstname']['value'])) {
            $formFields['firstname']['value'] = $context->customer->firstname;
        }
        if (empty($formFields['lastname']['value'])) {
            $formFields['lastname']['value'] = $context->customer->lastname;
        }
        if (Module::isEnabled('dniverificator') && Configuration::get('DNIVERIFICATOR_FO') && in_array('dni', AddressFormat::getOrderedAddressFields($formFields['id_country']['value']))) {
            require_once(_PS_MODULE_DIR_.'/dniverificator/classes/VerificationEngine.php');
            $module = Module::getInstanceByName('dniverificator');
            $default_dnifield = false;
            $default_companyfield = false;
            if (isset($formFields['dni'])) {
                $default_dnifield = $formFields['dni']['required'];    
            }
            if (isset($formFields['company'])) {
                $default_companyfield = $formFields['company']['required'];    
            }
            if (!VerificationEngine::skipDNIFieldBycountry($formFields['id_country']['value'])) {
                $label = Configuration::get('DNIVERIFICATOR_LABEL', $context->language->id);
                $legend = Configuration::get('DNIVERIFICATOR_LEGEND', $context->language->id);
                if ($label) {
                    $formFields['dni']['label'] = $label;    
                }
                if ($legend) {
                    $formFields['dni']['availableValues']['comment'] = $legend;    
                }
                if (Configuration::get('DNIVERIFICATOR_FIELD') == 'required') {
                    $formFields['dni']['required'] = true;  
                    // Displays DNI value if customer has a DNI number registered in data information and this field is required.
                    $dni_number = CustomersDNI::getDNIInCustomerForm($context->customer->id);
                    if ($dni_number && empty($formFields['dni']['value'])) {
                        $formFields['dni']['value'] = $dni_number;    
                    }
                }
                else {
                    $formFields['dni']['required'] = false;               
                }
                
                $formFields['company']['availableValues']['comment'] = (Configuration::get('DNIVERIFICATOR_COMPANY_VALIDATION')?$module->controller_msg['COMPANY_VALIDATION_COMMENT']:'').' '.(Configuration::get('DNIVERIFICATOR_DISPLAY_WITH_COMPANY')?$module->controller_msg['COMPANY_DISPLAY_COMMENT']:'');
                
                if (Configuration::get('DNIVERIFICATOR_DISPLAY_WITH_COMPANY') == 1) {
                    if (empty($formFields['company']['value'])){
                        CustomersDNI::updateDNIAddress(Tools::getValue('id_address'), '');
                        unset($formFields['dni']);
                    }
                }
                if (Configuration::get('DNIVERIFICATOR_COMPANY_VALIDATION') == 1) {
                    if (!empty($formFields['dni']['value'])) {
                        $formFields['company']['required'] = true;    
                    }
                    else {
                        $formFields['company']['required'] = false;
                    }
                } 
            }
            else {
                $formFields['dni']['required'] = $default_dnifield;
                $formFields['company']['required'] = $default_companyfield;   
            }
        }
        if (Module::isEnabled('advancedvatmanager') && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')) {
            $default_vatfield = false;
            $default_companyfield = false;
            $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
            if (in_array('vat_number', AddressFormat::getOrderedAddressFields($formFields['id_country']['value']))) {
                if (isset($formFields['vat_number'])) {
                    $default_vatfield = $formFields['vat_number']['required'];    
                }
                if (isset($formFields['company'])) {
                    $default_companyfield = $formFields['company']['required'];    
                }
            }
            if (!ValidationEngine::skipVATFieldBycountry($formFields['id_country']['value'])) {
                $label = Configuration::get('ADVANCEDVATMANAGER_FIELD_LABEL', $context->language->id);
                $legend = Configuration::get('ADVANCEDVATMANAGER_FIELD_LEGEND', $context->language->id);
                if ($label) {
                    $formFields['vat_number']['label'] = $label;    
                }
                if ($legend) {
                    $formFields['vat_number']['availableValues']['comment'] = $legend;    
                }
                if (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required') {
                    $formFields['vat_number']['required'] = true;   
                }
                else {
                    $formFields['vat_number']['required'] = false;               
                }
                
                $formFields['company']['availableValues']['comment'] = (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')?$advancedvatmanager->controller_msg['COMPANY_VALIDATION_COMMENT']:'').' '.(Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY')?$advancedvatmanager->controller_msg['COMPANY_DISPLAY_COMMENT']:'');
                
                if (Configuration::get('ADVANCEDVATMANAGER_DISPLAY_WITH_COMPANY') == 1) {
                    if (empty($formFields['company']['value'])){
                        // Delete VAT number from address table
                        require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersVAT.php');
                        CustomersVAT::updateVATAddress(Tools::getValue('id_address'), '');
                        unset($formFields['vat_number']);
                    }
                    else {
                        if (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'required') {
                            $formFields['vat_number']['required'] = true;
                        }
                        else {
                            $formFields['vat_number']['required'] = false;    
                        }   
                    }
                }
                if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION')) {
                    if (!empty($formFields['vat_number']['value'])) {
                        $formFields['company']['required'] = true;    
                    }
                    else {
                        $formFields['company']['required'] = false;
                    }
                } 
            }
            else {
                if (in_array('vat_number', AddressFormat::getOrderedAddressFields($formFields['id_country']['value']))) {
                    $formFields['vat_number']['required'] = $default_vatfield;
                    $formFields['company']['required'] = $default_companyfield;
                }    
            }
        }
        if (Module::isEnabled('advancedvatmanager') || Module::isEnabled('dniverificator')) {
            return [
                'id_address' => ($this->getAddress()) ? $this->getAddress()->id : 0,
                'action' => $this->action,
                'errors' => $this->getErrors(),
                'formFields' => $formFields,
            ];
        }
        else {
            return parent::getTemplateVariables();
        }
    }
}
