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
 
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/ValidationEngine.php');
require_once(_PS_MODULE_DIR_.'advancedvatmanager/AdvancedVatManagerTaxManager.php');

class AdvancedVatManagerAddressVATModuleFrontController extends ModuleFrontController
{

    public function __construct()
    {
        parent::__construct();
    }
    
    public function initContent()
    {
        parent::initContent();
        $skipvalidation = ValidationEngine::skipVATFieldBycountry(Tools::getValue('id_country')); 
        if (version_compare(_PS_VERSION_, '1.7.0.0', '<')) {           
            if (Tools::getValue('action') == 'updateAddressForm16') {
                //Check vat_number field
                $addressFormat = AddressFormat::getOrderedAddressFields(Tools::getValue('id_country'));
                $vat_field_exists = in_array('vat_number', $addressFormat);
                if (method_exists('AddressFormat', 'getFieldsRequired')) {
                    $vat_required = in_array('vat_number', AddressFormat::getFieldsRequired());
                    $company_required = in_array('company', AddressFormat::getFieldsRequired());
                }
                else {
                    $address = new Address(Tools::getValue('id_address'));
                    $vat_required = in_array('vat_number', array_column($address->getFieldsRequiredDatabase(), 'field_name'));
                    $company_required = in_array('company', array_column($address->getFieldsRequiredDatabase(), 'field_name'));
                }
                //Check to skip validation for VAT field
                $this->ajaxDie(json_encode(array('skipValidation'=> $skipvalidation, 'vat_field_exists' => $vat_field_exists, 'vat_required' => $vat_required, 'company_required' => $company_required)));             
            }
        } 
        else {
            if (Tools::getValue('action') == 'checkoutAddress') {
                $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
                $id_address_invoice = Tools::getValue('id_address_invoice');
                $id_address_delivery = Tools::getValue('id_address_delivery');
                $address_invoice_errors = $advancedvatmanager->getCustomerAddressWithError($id_address_invoice);
                $address_delivery_errors = $advancedvatmanager->getCustomerAddressWithError($id_address_delivery);
                Context::getContext()->cart->id_address_invoice = $id_address_invoice;
                Context::getContext()->cart->id_address_delivery = $id_address_delivery;
                $address = new Address($id_address_delivery);
                ValidationEngine::$id_address_used = $address->id;            
                AdvancedVatManagerTaxManager::isAvailableForThisAddress($address);
                
                $this->ajaxDie(json_encode([
                        'address_invoice_errors' => $address_invoice_errors,
                        'address_delivery_errors' => $address_delivery_errors,
                        'not_allow_checkout' => $advancedvatmanager->checkNotAllowCheckout(),
                ]));  
            }
            if ($skipvalidation === false) {       
                if (Tools::getValue('action') == 'updateAddressForm') {              
                    $addressForm = $this->makeAddressForm();
                    
                    if (Tools::getIsset('id_address') && ($id_address = (int) Tools::getValue('id_address'))) {
                        $addressForm->loadAddressById($id_address);
                    }
                    
                    if (Tools::getIsset('id_country')) {
                        $addressForm->fillWith(['id_country' => Tools::getValue('id_country')]);
                    }
                    
                    // Fill form fields after submitting form.
                    $fields = Tools::getValue('data_form');
                    $additionalTemplateVariables = array();
                    if (!empty($fields)) {
                        $form_values = array();
                        foreach ($fields as $field_value) {
                            $form_values[$field_value['name']] =$field_value['value'];
                        }
                        $addressForm->fillWith($form_values);    
                        $additionalTemplateVariables['type'] = Tools::getValue('saveAddress');           
                        $additionalTemplateVariables['form_has_continue_button'] = Tools::getValue('form_has_continue_button');
                        $additionalTemplateVariables['use_same_address'] = Tools::getValue('use_same_address');
                    }
                    ob_end_clean();
                    header('Content-Type: application/json');
                    $this->ajaxDie(json_encode([
                        'address_form' => $this->render(
                            Tools::getValue('php_self') == 'order'?'checkout/_partials/address-form':'customer/_partials/address-form',
                            Tools::getValue('php_self') == 'order'?array_merge($addressForm->getTemplateVariables(), $additionalTemplateVariables):$addressForm->getTemplateVariables()
                        ),
                    ]));
                }
            }
        }
    }
}