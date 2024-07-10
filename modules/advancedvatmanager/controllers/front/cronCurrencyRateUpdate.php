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

class AdvancedVatManagerCronCurrencyRateUpdateModuleFrontController extends ModuleFrontController
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
        if (Currency::refreshCurrencies() != '') {
            $response = Currency::refreshCurrencies();    
        }
        else {
            $response = 'Currency rates have been updated successfully!.'; 
            Configuration::updateValue('ADVANCEDVATMANAGER_CURRENCY_RATE_UPDATED', date("d-m-Y H:i:s"));   
        }
        $this->ajaxDie($response);
    }
}
