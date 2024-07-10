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
 
/* Includes files */
require_once(_PS_MODULE_DIR_ . 'advancedvatmanager/classes/ValidationEngine.php');
require_once(_PS_MODULE_DIR_ . 'advancedvatmanager/classes/CustomersVAT.php');

class AdvancedVatManagerCronValidationProcessModuleFrontController extends ModuleFrontController
{
    public $auth = false;
    public $ssl = true;
    public $ajax;

    public function display()
    {
        $this->ajax = 1;

        if (!in_array(php_sapi_name(), array('apache', 'apache2handler', 'cgi', 'cgi-fcgi', 'cli', 'cli-server', 'embed', 'fpm-fcgi', 'litespeed', 'phpdbg'))) {
            $this->ajaxDie('Forbidden call.');
        }
        
        /* Check to security token */
        if (Tools::substr(Tools::encrypt('advancedvatmanager'), 0, 12) != Tools::getValue('token')) {
            $this->ajaxDie('Bad token');
        }
        if (!Module::isEnabled('advancedvatmanager')) {
            $this->ajaxDie('Module disabled.');
        }
        
        //License feature
        if (!AdvancedVatManager::$prestashopAddons) {     
            $APIresponse = AdvancedVatManager::checkIsLicenseRegistered();
            if ($APIresponse != 'localhost') {
                if (!$APIresponse || (isset($APIresponse->success) && !$APIresponse->success)) {
                    $this->ajaxDie('License has not been registered!');
                    if (isset($APIresponse->message)) {
                       $this->ajaxDie($APIresponse->message);   
                    }
                }
            }
        }
        
        $autoInsertCompany = (bool)Configuration::get('ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY');
        ValidationEngine::$checkVatCron = true;
        if (Configuration::get('ADVANCEDVATMANAGER_CRON_SCANFROMLAST')) {
            $remaining_address = CustomersVAT::getRemainCustomersAddressToCheck();
            if ($remaining_address) {
                $addresses = CustomersVAT::getCustomerAddresses($remaining_address);        
            }
            else {
                $addresses = false;    
            }   
        }
        else {
            $addresses = CustomersVAT::getCustomerAddresses(); 
            // Truncate table
            CustomersVAT::truncateTable(); 
        }
        
        if ($addresses) {
            foreach ($addresses as $address) {
                $id_customer = $address['id_customer'];
                $id_country = $address['id_country'];
                $id_address = $address['id_address'];
                $company = $address['company'];
                $vat = $address['vat_number'];
                $company_address = array(
                    'address1' => $address['address1'],
                    'address2' => $address['address2'],
                    'city' => $address['city'],
                    'postcode' => $address['postcode'],  
                );
                $module = Module::getInstanceByName('advancedvatmanager');
                $ve = new ValidationEngine($vat);
                ValidationEngine::$skip_api_fails = (bool)Configuration::get('ADVANCEDVATMANAGER_CRON_SKIPAPISYSTEMFAIL');
                $ve->VATValidationProcess($id_country, $id_customer, $id_address, $company, $company_address);
                $valid = $ve->getVATValidation();

                if (!ValidationEngine::$skip_validation_process) {
                    // Insert element into table ps_advancedvatmanager_customers
                    $cv = new CustomersVAT();
                    if ($cv->addCustomersVAT(ValidationEngine::getVat(), $id_customer, $id_address, ValidationEngine::getVATValidation(),ValidationEngine::$company_valid, ValidationEngine::$companyAddress_valid, ValidationEngine::getStatus(), ValidationEngine::checkClientType(), $autoInsertCompany?ValidationEngine::getRegisteredCompanyName():null, ValidationEngine::getSystemFail())) {
                        if ($autoInsertCompany) {
                            CustomersVAT::updateCompanyName($id_address, ValidationEngine::getRegisteredCompanyName());
                            echo sprintf('The company name %s has been updated correctly in address ID#%s', $company, $id_address);
                        }
                        echo sprintf('The address with ID#%s and VAT number %s has been saved into the Customer VAT list',$id_address, ValidationEngine::getVat()).'<br />';
                    }
                    else {
                        echo sprintf('The address with ID#%s and VAT number %s could not be saved into the Customer VAT list',$id_address, ValidationEngine::getVat()).'<br />';
                    }
                    if (Configuration::get('ADVANCEDVATMANAGER_CRON_ASSIGN_GROUP')) {
                        ValidationEngine::manageCustomerGroups($id_country, $id_customer, $id_address, $valid);
                    } 
                    
                    if (!$ve->getVATValidation()) {
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_DELETE_EMPTY') && !ValidationEngine::getVat()) {
                            CustomersVAT::deleteByIDAddress($id_address);
                            if (Db::getInstance()->update('address', array('deleted' => '1'), 'id_address ='.(int)$id_address)) {
                                echo sprintf('The address with ID#%s has been deleted',$id_address).'<br />';
                            }
                            else {
                                echo sprintf('The address with ID#%s could not be deleted',$id_address).'<br />';    
                            }  
                        } 
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_DELETE_INVALID')) {
                            CustomersVAT::deleteByIDAddress($id_address);
                            if (Db::getInstance()->update('address', array('deleted' => '1'), 'id_address ='.(int)$id_address)) {
                                echo sprintf('The address with ID#%s has been deleted',$id_address).'<br />';
                            }
                            else {
                                echo sprintf('The address with ID#%s could not be deleted',$id_address).'<br />';    
                            }  
                        }
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_DELETE_DUPLICATED') && ValidationEngine::$duplicated) {
                            CustomersVAT::deleteByIDAddress($id_address);
                            if (Db::getInstance()->update('address', array('deleted' => '1'), 'id_address ='.(int)$id_address)) {
                                echo sprintf('The address with ID#%s has been deleted',$id_address).'<br />';
                            }
                            else {
                                echo sprintf('The address with ID#%s could not be deleted',$id_address).'<br />';    
                            }    
                        }
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY') && !ValidationEngine::getVat()) {
                            if ($module->sendEmail(2, CustomersVAT::getCustomerAddress($id_customer, $id_address))) {
                                echo sprintf('Email to customer ID#%s has been sent successfully.',$id_customer).'<br />';    
                            }
                            else {
                                echo sprintf('Email to customer ID#%s could not be sent due an error.',$id_address).'<br />';
                            }    
                        } 
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_DUPLICATED') && ValidationEngine::$duplicated) {
                            if ($module->sendEmail(5, CustomersVAT::getCustomerAddress($id_customer, $id_address))) {
                                echo sprintf('Email to customer ID#%s has been sent successfully.',$id_customer).'<br />';        
                            }
                            else {
                                echo sprintf('Email to customer ID#%s could not be sent due an error.',$id_address).'<br />';    
                            }    
                        }
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID')) {
                            if ($module->sendEmail(3, CustomersVAT::getCustomerAddress($id_customer, $id_address))) {
                                echo sprintf('Email to customer ID#%s has been sent successfully.',$id_customer).'<br />';         
                            }
                            else {
                                echo sprintf('Email to customer ID#%s could not be sent due an error.',$id_address).'<br />';        
                            }        
                        }
                    }
                    if (Configuration::get('ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY') == 0) {
                        // If option "company validation" is enabled
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANY') && ValidationEngine::$company_valid == 0) {
                            if ($module->sendEmail(6, CustomersVAT::getCustomerAddress($id_customer, $id_address))) {
                                echo sprintf('Email to customer ID#%s has been sent successfully.',$id_customer).'<br />';         
                            }
                            else {
                                echo sprintf('Email to customer ID#%s could not be sent due an error.',$id_address).'<br />';        
                            }        
                        }
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_EMPTY_COMPANY') && empty($company)) {
                            if ($module->sendEmail(7, CustomersVAT::getCustomerAddress($id_customer, $id_address))) {
                                echo sprintf('Email to customer ID#%s has been sent successfully.',$id_customer).'<br />';         
                            }
                            else {
                                echo sprintf('Email to customer ID#%s could not be sent due an error.',$id_address).'<br />';        
                            }        
                        }
                    } 
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_ADDRESS_VALIDATION')) {
                        if (Configuration::get('ADVANCEDVATMANAGER_CRON_SENDEMAIL_INVALID_COMPANYADDRESS') && ValidationEngine::$companyAddress_valid != 1) {
                            if ($module->sendEmail(9, CustomersVAT::getCustomerAddress($id_customer, $id_address))) {
                                echo sprintf('Email to customer ID#%s has been sent successfully.',$id_customer).'<br />';         
                            }
                            else {
                                echo sprintf('Email to customer ID#%s could not be sent due an error.',$id_address).'<br />';        
                            } 
                        }
                    }
                }
            }
        }
        else {
            $this->ajaxDie('No address to check.'); 
        }
    }
}
