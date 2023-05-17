<?php
/**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 */
 
/* Includes files */
require_once(_PS_MODULE_DIR_ . 'advancedvatmanager/classes/ValidationEngine.php');
require_once(_PS_MODULE_DIR_ . 'advancedvatmanager/classes/CustomersVAT.php');

class AdvancedVatManagerCronCurrencyRateUpdate16ModuleFrontController extends ModuleFrontController
{
    public $auth = false;
    public $ssl = true;
    public $ajax;

    public function display()
    {
        $this->ajax = 1;
        
        if (!in_array(php_sapi_name(), array('apache', 'apache2handler', 'cgi', 'cgi-fcgi', 'cli', 'cli-server', 'embed', 'fpm-fcgi', 'litespeed', 'phpdbg'))) {
            return die('Forbidden call.');
        }
        
        /* Check to security tocken */
        if (Tools::substr(Tools::encrypt('advancedvatmanager'), 0, 12) != Tools::getValue('token')) {
            return die('Bad token');
        }
        if (!Module::isEnabled('advancedvatmanager')) {
            return die('Module disabled.');
        }
        /* Check shop id */
        if (Tools::getValue('id_shop') == Context::getContext()->shop->id) {
            if (Currency::refreshCurrencies() != '') {
                $response = Currency::refreshCurrencies();    
            }
            else {
                $response = 'Currency rates have been updated successfully!.'; 
                Configuration::updateValue('ADVANCEDVATMANAGER_CURRENCY_RATE_UPDATED', date("d-m-Y H:i:s"));   
            }
            return $response;
        }
        else {
            return die('Bad Shop ID');
        }
    }
}
