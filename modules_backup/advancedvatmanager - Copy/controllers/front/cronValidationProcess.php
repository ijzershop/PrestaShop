<?php
/**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
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
                $module = Module::getInstanceByName('advancedvatmanager');
                $ve = new ValidationEngine($vat);
                $ve->VATValidationProcess($id_country, $id_customer, $id_address, $company);
                $valid = $ve->getVATValidation();

                if (!ValidationEngine::$skip_validation_process) {
                    // Insert element into table ps_advancedvatmanager_customers
                    $cv = new CustomersVAT();
                    if ($cv->addCustomersVAT(ValidationEngine::getVat(), $id_customer, $id_address, ValidationEngine::getVATValidation(), ValidationEngine::$company_valid, ValidationEngine::getStatus(), Configuration::get('ADVANCEDVATMANAGER_CRON_AUTOINSERT_COMPANY') ? ValidationEngine::getRegisteredCompanyName() : null, ValidationEngine::getSystemFail())) {
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
                }
            }
        }
        else {
            $this->ajaxDie('No address to check.');
        }
    }
}
