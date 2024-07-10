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
require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersOrders.php');

class AdminCustomersOrdersManagerController extends ModuleAdminController
{
    private $message = array();

    /**
     * AdminCustomersOrdersManagerController::__construct()
     * 
     * @return
     */
    public function __construct()
    {
        $this->context = Context::getContext();
        $this->bootstrap = true;
        $this->show_toolbar = true;
        $this->module = Module::getInstanceByName('advancedvatmanager');
        $this->table = 'advancedvatmanager_orders';
        $this->identifier = 'id_advancedvatmanager_orders';
        $this->className = 'CustomersOrders';
        $this->controller_name = 'AdminCustomersOrdersManager';
        $this->allow_export = true;
        $this->lang = false;
        $this->delete = true;
        $this->_use_found_rows = true;
        $this->list_simple_header = false;
        $this->requiredDatabase = true;
        $this->explicitSelect = true;
        
        parent::__construct();
        
        $this->_orderWay = 'DESC';
        $this->addRowAction('view');
        $this->addRowAction('viewCustomer');
        $this->addRowAction('downloadInvoice');
        $this->addRowAction('delete');
        
        $this->bulk_actions = array(
                    'delete' => array('text' => $this->l('Delete','AdminCustomersOrdersManager'), 'icon' => 'far fa-trash-alt','confirm' => $this->l('Would you like to delete selected items from the list?','AdminCustomersOrdersManager')),
                    'downloadInvoices' => array('text' => $this->l('Download invoices','AdminCustomersVatManager'), 'icon' => 'far fa-file-invoice')
                    
        );
        
        $this->_select = 'CONCAT(LEFT(c.`firstname`,1),\'.\',c.`lastname`) `customer_name`, c.`email`, ord.`invoice_date`, ord.`reference`, country_lang.`name` as cname, ord.`payment`, ord.`total_paid`, ord.`total_paid_tax_incl`, ord.`total_paid_tax_excl`, c.`id_shop`';
        
        $this->_join = 'INNER JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = a.`id_customer`)
        INNER JOIN `' . _DB_PREFIX_ . 'orders` ord ON (ord.`id_order` = a.`id_order`)
        INNER JOIN `'._DB_PREFIX_.'address` address ON address.id_address = ord.id_address_delivery
		INNER JOIN `'._DB_PREFIX_.'country` country ON address.id_country = country.id_country
		INNER JOIN `'._DB_PREFIX_.'country_lang` country_lang ON (country.`id_country` = country_lang.`id_country` AND country_lang.`id_lang` = '.(int)$this->context->language->id.')';
        
        $this->_where = Shop::addSqlRestriction(Shop::SHARE_ORDER, 'ord');
        
        $shops_name = array();
        foreach (Shop::getShops() as $shop) {
            $shops_name[$shop['id_shop']] = $shop['name'];
        }
        
        // Gets Countries in orders for filter list
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->ExecuteS('
		SELECT DISTINCT c.id_country, cl.`name`
		FROM `'._DB_PREFIX_.'orders` o
		'.Shop::addSqlAssociation('orders', 'o').'
        INNER JOIN `'._DB_PREFIX_.'advancedvatmanager_orders` avm_ord ON avm_ord.id_order = o.id_order
		INNER JOIN `'._DB_PREFIX_.'address` a ON a.id_address = o.id_address_delivery
		INNER JOIN `'._DB_PREFIX_.'country` c ON a.id_country = c.id_country
		INNER JOIN `'._DB_PREFIX_.'country_lang` cl ON (c.`id_country` = cl.`id_country` AND cl.`id_lang` = '.(int)$this->context->language->id.')
		ORDER BY cl.name ASC');

        $country_array = array();
        foreach ($result as $row) {
            $country_array[$row['id_country']] = $row['name'];
        }
        
        $client_types = array('consumer' => $this->l('Consumer','AdminCustomersOrdersManager'), 'company' => $this->l('Company','AdminCustomersOrdersManager'));
        
        $this->fields_list = array(
            'id_advancedvatmanager_orders' => array('title' => $this->l('ID','AdminCustomersOrdersManager'), 'type' => 'text', 'class' => 'fixed-width-xs', 'align' => 'text-center'),
            //'id_customer' => array('title' => $this->l('ID customer','AdminCustomersOrdersManager'), 'filter_key' => 'a!id_customer', 'align' => 'text-center', 'class' => 'fixed-width-xs'),
            'id_order' => array('title' => $this->l('ID Order','AdminCustomersOrdersManager'), 'filter_key' => 'a!id_order', 'align' => 'text-center', 'class' => 'fixed-width-xs'),
            'id_shop' => array('title' => $this->l('Shop','AdminCustomersVatManager'), 'type' => 'text','callback' => 'getShop', 'align' => 'text-center', 'filter_type' => 'int', 'filter_key' => 'c!id_shop', 'list' => $shops_name,'type' => 'select'),
            'reference' => array('title' => $this->l('Reference','AdminCustomersOrdersManager'), 'type' => 'text', 'filter_key' => 'ord!reference', 'align' => 'text-center'),
            'payment' => array('title' => $this->l('Payment','AdminCustomersOrdersManager'), 'type' => 'text', 'filter_key' => 'ord!payment', 'align' => 'text-center'),
            'cname' => array('title' => $this->l('Delivery','AdminCustomersOrdersManager'), 'type' => 'select', 'filter_key' => 'country!id_country','filter_type' => 'int', 'align' => 'text-center', 'list' => $country_array,),
            'total_paid' => array('title' => $this->l('Total paid','AdminCustomersOrdersManager'), 'type' => 'price', 'filter_key' => 'ord!total_paid', 'align' => 'text-center'),
            'total_paid_tax_incl' => array('title' => $this->l('Total tax incl','AdminCustomersOrdersManager'), 'type' => 'price', 'filter_key' => 'ord!total_paid_tax_incl', 'align' => 'text-center'),
            'total_paid_tax_excl' => array('title' => $this->l('Total tax excl','AdminCustomersOrdersManager'), 'type' => 'price', 'filter_key' => 'ord!total_paid_tax_excl', 'align' => 'text-center'),
            'customer_name' => array('title' => $this->l('Customer','AdminCustomersOrdersManager'), 'type' => 'text', 'filter_key' => 'c!lastname', 'align' => 'text-center'),
            'email' => array('title' => $this->l('Email','AdminCustomersOrdersManager'), 'type' => 'text', 'filter_key' => 'c!email', 'align' => 'text-center'),
            'notax' => array('title' => $this->l('Tax exempt','AdminCustomersOrdersManager'), 'filter_key' => 'a!notax', 'align' => 'center', 'type' => 'bool', 'class' => 'fixed-width-xs', 'callback' => 'showValidateIcons'),
            'brexit' => array('title' => $this->l('Brexit','AdminCustomersOrdersManager'), 'filter_key' => 'a!brexit', 'align' => 'center', 'type' => 'bool', 'class' => 'fixed-width-xs', 'callback' => 'showBrexitIcons'),
            'voec' => array('title' => $this->l('VOEC customer','AdminCustomersOrdersManager'), 'filter_key' => 'a!voec', 'align' => 'center', 'type' => 'bool', 'class' => 'fixed-width-xs', 'callback' => 'showVOECIcons'),
            'client_type' => array('title' => $this->l('Customer type','AdminCustomersOrdersManager'), 'filter_key' => 'a!client_type', 'align' => 'center', 'list' => $client_types, 'type' => 'select', 'callback' => 'showClientType'),
            'invoice' => array('title' => $this->l('Invoice number','AdminCustomersOrdersManager'), 'filter_key' => 'a!invoice', 'align' => 'text-center', 'class' => 'fixed-width-xs'),
            'invoice_date' => array('title' => $this->l('Invoice date','AdminCustomersOrdersManager'), 'type' => 'datetime', 'align' => 'text-left','filter_key' => 'ord!invoice_date'),
            //'date_upd' => array('title' => $this->l('Date updated','AdminCustomersOrdersManager'), 'type' => 'datetime', 'align' => 'text-left','filter_key' => 'a!date_upd'),
            'date_add' => array('title' => $this->l('Date added','AdminCustomersOrdersManager'), 'type' => 'datetime', 'align' => 'text-left','filter_key' => 'a!date_add')
        );
    }
    
    /**
     * AdminCustomersOrdersManagerController::getShop()
     * 
     * @param mixed $value
     * @return
     */
    public function getShop($value)
    {
        return Shop::getShop($value)['name'];
    } 
 
 
    /**
     * AdminCustomersOrdersManagerController::showClientType()
     * 
     * @param mixed $value
     * @return
     */
    public function showClientType($value)
    {
        $text = $value == 'company'?$this->l('Company','AdminCustomersOrdersManager'):$this->l('Consumer','AdminCustomersOrdersManager');
        return $value == 'company' ? '<i style="font-size:20px;" class="fal fa-briefcase" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>' : '<i style="font-size:20px;" class="fal fa-user" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';
    }
        
    /**
     * AdminCustomersOrdersManagerController::showValidateIcons()
     * 
     * @param mixed $value
     * @return
     */
    public function showValidateIcons($value)
    {
        $text = $value == 1?$this->l('Tax exempt validated','AdminCustomersOrdersManager'):$this->l('No tax exempt','AdminCustomersOrdersManager');
        return $value ? '<i style="font-size:20px;color:#32db1d;" class="far fa-check-circle" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>' : '<i style="font-size:20px;color:#f92727;" class="far fa-times-circle" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';
    }
    
    /**
     * AdminCustomersOrdersManagerController::showValidateIcons()
     * 
     * @param mixed $value
     * @return
     */
    public function showBrexitIcons($value)
    {
        $text = $value == 1?$this->l('Yes','AdminCustomersOrdersManager'):$this->l('No','AdminCustomersOrdersManager');
        return $value ? '<img src="../modules/advancedvatmanager/views/img/united-kingdom.png" width="20" height="20" data-toggle="tooltip" data-placement="top" title="'.$text.'"/>' : '<i style="font-size:20px;color:#f92727;" class="far fa-times-circle" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';
    }
    
    /**
     * AdminCustomersOrdersManagerController::showVOECIcons()
     * 
     * @param mixed $value
     * @return
     */
    public function showVOECIcons($value)
    {
        $text = $value == 1?$this->l('Yes','AdminCustomersOrdersManager'):$this->l('No','AdminCustomersOrdersManager');
        return $value ? '<img src="../modules/advancedvatmanager/views/img/norway.png" width="20" height="20" data-toggle="tooltip" data-placement="top" title="'.$text.'"/>' : '<i style="font-size:20px;color:#f92727;" class="far fa-times-circle" data-toggle="tooltip" data-placement="top" title="'.$text.'"></i>';
    }
    
    /**
     * AdminCustomersOrdersManagerController::initContent()
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
     * AdminCustomersOrdersManagerController::initToolbar()
     * 
     * @return
     */
    public function initToolbar()
    {
        parent::initToolbar();

        $this->toolbar_title = $this->meta_title;              
        
        // Remove add new button
         unset($this->toolbar_btn['new']);
    }

    /**
     * AdminCustomersOrdersManagerController::initPageHeaderToolbar()
     * 
     * @return
     */
    public function initPageHeaderToolbar()
    {
        if ($this->display == 'view') {
            $admin_delete_link = $this->context->link->getAdminLink('AdminCustomersOrdersManager') . '&deleteadvancedvatmanager_orders&id_advancedvatmanager_orders=' . (int)Tools::getValue('id_advancedvatmanager_orders');
            $this->page_header_toolbar_btn['back_to_list'] = array(
                'href' => $this->context->link->getAdminLink('AdminCustomersOrdersManager'),
                'desc' => $this->module->l('Back to list','AdminCustomersOrdersManager'),
                'icon' => 'fal fa-arrow-circle-left',
            );
            $this->page_header_toolbar_btn['delete'] = array(
                'href' => $admin_delete_link,
                'desc' => $this->module->l('Delete it','AdminCustomersOrdersManager'),
                'icon' => 'process-icon-delete',
                'js' => "return confirm('" . $this->module->l('Are you sure you want to delete it?','AdminCustomersOrdersManager') .
                    "');",
            );
        }
        parent::initPageHeaderToolbar();
    }

    /**
     * AdminCustomersOrdersManagerController::initProcess()
     * 
     * @return
     */
    public function initProcess()
    {
        parent::initProcess();
    }
    
    /**
     * AdminCustomersOrdersManagerController::renderList()
     * 
     * @return
     */
    public function renderList()
    {   
        $helper = new HelperList();
        $helper->module = $this;
        $this->toolbar_title = $this->l('Orders List','AdminCustomersOrdersManager'); // title
        $tpl_panel = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersOrdersManager/orders_vat_manager_panel.tpl');
        $tpl_statistics = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersOrdersManager/order_statistics.tpl');
        $tpl_thresholds = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersOrdersManager/thresholds.tpl');
        $tpl_export_invoices = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersOrdersManager/export_invoices.tpl');
        $tpl_orders_importation = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersOrdersManager/orders_importation.tpl');
        
        $date = new DateTime(); //Today
        $today = $date->format("Y-m-d H:i:s"); //Get last day
        $dateLast12months = $date->modify("-12 months"); // Last day 12 months ago
        $currentYearDate = (date("Y")).'-01-01 00:00:00';
        $currentYear = date("Y");// Current year
        $lastYear = date("Y")-1;// Last year
        
        $total_last12monthsVOEC = CustomersOrders::getTotalVOEC(false, $dateLast12months->format("Y-m-d H:i:s"), $today);
        $total_currentYearIntracommunity = CustomersOrders::getTotalIntracommunity('consumer', false, date("Y").'-01-01 00:00:00', $today);
        $total_lastYearIntracommunity = CustomersOrders::getTotalIntracommunity('consumer', false, (date("Y")-1).'-01-01 00:00:00', (date("Y")-1).'-12-31 23:59:59');
        
        $module = Module::getInstanceByName('advancedvatmanager');

        $tpl_statistics->assign(array(
            'ps160' => version_compare(_PS_VERSION_, '1.6.1.0', '<'),
            'total_brexit' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice(CustomersOrders::getTotalBrexit(false), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalBrexit(false)),
            'total_brexit_wt' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice(CustomersOrders::getTotalBrexit(), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalBrexit()),
            'total_tax_exempt' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice(CustomersOrders::getTotalTaxExempt(), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalTaxExempt()),
            'total_voec' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice(CustomersOrders::getTotalVOEC(false), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalVOEC(false)),
            'total_voec_wt' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice(CustomersOrders::getTotalVOEC(), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalVOEC()),
            'total_intracommunity' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice(CustomersOrders::getTotalIntracommunity(null, false), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalIntracommunity(false)),
            'total_intracommunity_wt' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice(CustomersOrders::getTotalIntracommunity(), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalIntracommunity()),
        ));
        $tpl_thresholds->assign(array(
            'las12months_voec' => $total_last12monthsVOEC,
            'las12months_voec_currency' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice($total_last12monthsVOEC, $this->context->currency->iso_code):Tools::displayPrice($total_last12monthsVOEC),
            'las12months_voec_percent' => round($total_last12monthsVOEC/ $module->getCurrencyAmount('NOK', AVM_NOK_YEAR_LIMIT)*100, 2),
            'voec_limit_currency' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice($module->getCurrencyAmount('NOK', AVM_NOK_YEAR_LIMIT), $this->context->currency->iso_code):Tools::displayPrice($module->getCurrencyAmount('NOK', AVM_NOK_YEAR_LIMIT)),
            'voec_limit' => $module->getCurrencyAmount('NOK', AVM_NOK_YEAR_LIMIT),
            'dateLast12months' => $dateLast12months->format("Y-m-d H:i:s"),
            'today' => $today,
            'currentYear_intracommunity' => $total_currentYearIntracommunity,
            'currentYear_intracommunity_currency' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice($total_currentYearIntracommunity, $this->context->currency->iso_code):Tools::displayPrice($total_currentYearIntracommunity),
            'total_lastYearIntracommunity' => $total_lastYearIntracommunity,
            'total_lastYearIntracommunity_currency' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice($total_lastYearIntracommunity, $this->context->currency->iso_code):Tools::displayPrice($total_lastYearIntracommunity),
            'intracommunity_limit_currency' => version_compare(_PS_VERSION_, '1.7.6.0', '>=')?$this->context->getCurrentLocale()->formatPrice($module->getCurrencyAmount('EUR', AVM_EU_YEAR_LIMIT), $this->context->currency->iso_code):Tools::displayPrice($module->getCurrencyAmount('EUR', AVM_EU_YEAR_LIMIT)),
            'intracommunity_limit' => $module->getCurrencyAmount('EUR', AVM_EU_YEAR_LIMIT),
            'currentYear_intracommunity_percent' => round($total_currentYearIntracommunity/ $module->getCurrencyAmount('EUR', AVM_EU_YEAR_LIMIT)*100, 2),
            'currentYearDate' => $currentYearDate,
            'lastYear' => $lastYear,
        ));
        return $tpl_panel->fetch().$tpl_statistics->fetch().$tpl_thresholds->fetch().parent::renderList().$tpl_export_invoices->fetch().$tpl_orders_importation->fetch();
    }

    /**
     * AdminCustomersOrdersManagerController::renderView()
     * 
     * @return
     */
    public function renderView()
    {
        $tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ . 'advancedvatmanager/views/templates/admin/AdminCustomersOrdersManager/view.tpl');
        $tpl->assign('advancedvatmanager', $this->object);
        $this->context->smarty->assign(array(
            'shop' => Shop::getShop($this->object->id_shop)['name']
        ));
        
        parent::renderView();    
        return $tpl->fetch();
    }
    
    /**
     * AdminCustomersOrdersManagerController::setMedia()
     * 
     * @param bool $isNewTheme
     * @return
     */
    public function setMedia($isNewTheme = true)
    {
        parent::setMedia(); 

        Media::addJsDef(array(
            'ajax_url_customersordersmanager' => $this->context->link->getAdminLink('AdminCustomersOrdersManager'),
        ));
        
        //Fontawesome
        $this->addCSS('https://pro.fontawesome.com/releases/v5.15.4/css/all.css'); 
        
        $this->addJqueryUi('ui.datepicker');
        $this->addCSS(_PS_MODULE_DIR_ . 'advancedvatmanager/views/css/admin/AdminCustomersOrdersManager/orders_manager.css');
        $this->addJS(_PS_MODULE_DIR_ . 'advancedvatmanager/views/js/admin/AdminCustomersOrdersManager/orders_manager.js');
        
    }
    
    /**
     * AdminCustomersOrdersManagerController::postProcess()
     * 
     * @return
     */
    public function postProcess()
    {
        parent::postProcess();
        
        $id = Tools::getValue('id_advancedvatmanager_orders');
        // Download excel file
        if (Tools::getValue('action') == 'downloadInvoice') {
            $this->generatePDFInvoice(CustomersOrders::getOrderID($id));    
        }
        if (Tools::isSubmit('submit_export_brexit_invoices')) {
            if ($results = CustomersOrders::getBrexitOrdersByDates(Tools::getValue('invoice_date_input_from'), Tools::getValue('invoice_date_input_to'))) {
                $orders = array();
                foreach ($results as $order) {
                    $orders[] = $order['id_order'];
                }
                if (!empty($orders)) {
                    $this->generatePDFInvoice($orders);    
                }    
            }
            else {
                $this->errors[] = $this->l('No invoices generated in these date range.', 'AdminCustomersOrdersManager');    
            }    
        }
        if (Tools::isSubmit('submit_export_tax_exempt_invoices')) {
            if ($results = CustomersOrders::getTaxexemptOrdersByDates(Tools::getValue('invoice_date_input_from'), Tools::getValue('invoice_date_input_to'))) {
                $orders = array();
                foreach ($results as $order) {
                    $orders[] = $order['id_order'];
                }
                if (!empty($orders)) {
                    $this->generatePDFInvoice($orders);    
                }    
            }
            else {
                $this->errors[] = $this->l('No invoices generated in these date range.', 'AdminCustomersOrdersManager');    
            } 
        }
        if (Tools::isSubmit('submit_export_intracommunity_invoices')) {
            if ($results = CustomersOrders::getIntraCommunityOrdersByDates(Tools::getValue('invoice_date_input_from'), Tools::getValue('invoice_date_input_to'))) {
                $orders = array();
                foreach ($results as $order) {
                    $orders[] = $order['id_order'];
                }
                if (!empty($orders)) {
                    $this->generatePDFInvoice($orders);    
                }    
            }
            else {
                $this->errors[] = $this->l('No invoices generated in these date range.', 'AdminCustomersOrdersManager');    
            } 
        }
        if (Tools::isSubmit('submit_export_voec_invoices')) {
            if ($results = CustomersOrders::getVOECOrdersByDates(Tools::getValue('invoice_date_input_from'), Tools::getValue('invoice_date_input_to'))) {
                $orders = array();
                foreach ($results as $order) {
                    $orders[] = $order['id_order'];
                }
                if (!empty($orders)) {
                    $this->generatePDFInvoice($orders);    
                }    
            }
            else {
                $this->errors[] = $this->l('No invoices generated in these date range.', 'AdminCustomersOrdersManager');    
            } 
        }
        if (Tools::isSubmit('submit_import_orders')) {
            $this->importOrders();   
        }
    }
    
    /**
     * AdminCustomersOrdersManagerController::processBulkDownloadInvoices()
     * 
     * @return
     */
    public function processBulkDownloadInvoices()
    {
        if ($this->boxes) {
            $selected = array();
            foreach ($this->boxes as $id) {
                $order_id = CustomersOrders::getOrderID($id);
                $invoice_exist = CustomersOrders::checkInvoiceExistsById($id);
                if ($invoice_exist) {
                    $selected[] = $order_id;
                }                
            }
            if (!empty($selected)) {
                $this->generatePDFInvoice($selected);     
            }
            else {
                $this->errors[] = $this->l('The orders selected have not invoices generated.', 'AdminCustomersOrdersManager');    
            }             
        }
    }
    
    /**
     * AdminCustomersOrdersManagerController::displayDownloadInvoiceLink()
     * 
     * @param mixed $token
     * @param mixed $id
     * @return
     */
    public function displayDownloadInvoiceLink($token = null, $id)
    {
		$tpl = $this->context->smarty->createTemplate(_PS_MODULE_DIR_ .'advancedvatmanager/views/templates/admin/AdminCustomersOrdersManager/download_invoice.tpl');
        $invoice_exist = CustomersOrders::checkInvoiceExistsById($id);
		$tpl->assign(array(
				'href' => $this->context->link->getAdminLink('AdminCustomersOrdersManager').'&'.$this->identifier.'='.(int)$id.'&action=downloadInvoice&token='.($token !== null ? $token : $this->token),
				'action' => $this->l('Validate VAT mnually', 'AdminCustomersOrdersManager'),
                'invoice_exist' => $invoice_exist
		));
	
		return $tpl->fetch();
    }
    
    
    public function importOrders()
    {
        $local_country = Configuration::get('ADVANCEDVATMANAGER_LOCAL_COUNTRY')?Configuration::get('ADVANCEDVATMANAGER_LOCAL_COUNTRY'):Configuration::get('PS_COUNTRY_DEFAULT');
        
        if (Configuration::get('ADVANCEDVATMANAGER_ADDRESS_TYPE') == 'both') {
            $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'orders` ord INNER JOIN `'._DB_PREFIX_.'address` address ON address.id_address = ord.id_address_delivery || address.id_address = ord.id_address_invoice INNER JOIN `'._DB_PREFIX_.'country` country ON address.id_country = country.id_country WHERE address.id_country != '.(int)$local_country;
        }
        else {
            $sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'orders` ord INNER JOIN `'._DB_PREFIX_.'address` address ON address.id_address = ord.'.Configuration::get('ADVANCEDVATMANAGER_ADDRESS_TYPE').' INNER JOIN `'._DB_PREFIX_.'country` country ON address.id_country = country.id_country WHERE address.id_country != '.(int)$local_country;           
        } 
        
        $orders_found = false;
        $countries_iso_for_validation = ValidationEngine::$european_countries_iso;
        if (Configuration::get('ADVANCEDVATMANAGER_BREXIT_ENABLED')) {
            $countries_iso_for_validation = array_merge($countries_iso_for_validation, ValidationEngine::$brexit_countries_iso);
        }
        if (Configuration::get('ADVANCEDVATMANAGER_VOEC_ENABLED')) {
           $countries_iso_for_validation = array_merge($countries_iso_for_validation, ValidationEngine::$voec_countries_iso);
        }
        if ($orders = Db::getInstance()->executeS($sql)) {
            foreach ($orders as $order) {
                $order_country_iso = Country::getIsoById($order['id_country']);
                if (in_array($order['iso_code'], $countries_iso_for_validation) && !CustomersOrders::checkCustomerOrderExists($order['id_customer'], $order['id_order'])) {
                    $orders_found = true;
                    $noTax = $order['total_paid_tax_incl'] == $order['total_paid_tax_excl'];
                    $brexit = false;
                    $voec = false;
                    $ve = new ValidationEngine($order['vat_number']);
                    ValidationEngine::$customer_with_vat_valid = false;
                    //VOEC
                    if ((bool)in_array($order_country_iso, ValidationEngine::$voec_countries_iso)) {
                        if ($order['vat_number'] != '') {
                            if ($ve->validationForNORWVAT()) {
                                $voec = false;    
                            }
                            else {
                                $voec = true;
                            }
                        }
                        else {
                            $voec = true;    
                        }
                    }
                    // Brexit
                    else if ((bool)in_array($order_country_iso, ValidationEngine::$brexit_countries_iso)) {
                         $brexit = true; 
                         if ($order['vat_number'] != '') {
                             if ($ve->validationForUKVAT()) {
                                ValidationEngine::$customer_with_vat_valid = true; 
                             }
                         }
                         else {
                            ValidationEngine::$customer_with_vat_valid =  false;
                         }   
                    }
                    // Check if the customer is a company or consumer for intracommunitaries
                    else {
                        if ($order['vat_number'] != '') {
                            if ($ve->vatValidationVies()) {
                                ValidationEngine::$customer_with_vat_valid = true; 
                            }
                        }
                        else {
                            ValidationEngine::$customer_with_vat_valid =  false;
                        }  
                    }
                    
                    Db::getInstance()->execute('INSERT INTO `' . _DB_PREFIX_ . 'advancedvatmanager_orders` (`id_order`, `id_shop`, `id_customer`, `notax`, `brexit`, `voec`, `client_type` , `invoice`, `date_upd`, `date_add`) 
                    VALUES ('.(int)$order['id_order'].', '.(int)$order['id_shop'].', '.(int)$order['id_customer'].', '.(int)$noTax.', '.(int)$brexit.', '.(int)$voec.', "'.(ValidationEngine::$customer_with_vat_valid?'company':'consumer').'",'.($order['invoice_number']?(int)$order['invoice_number']:'""').', "'.pSQL($order['date_upd']).'", "'.pSQL($order['date_add']).'");');
                }
            }

        }
        if (!$orders_found || empty($orders)) {
            $this->warnings[] = $this->l('No orders to import', 'AdminCustomersOrdersManager');     
        }
        else {
            $this->confirmations[] = sprintf($this->l('Orders have been imported successfully!', 'AdminCustomersOrdersManager'), $order['id_order']).'<br />';  
        }
    }
    
    /**
     * AdminCustomersOrdersManagerController::generatePDFInvoice()
     * 
     * @param mixed $ordersID (array or int)
     * @return
     */
    public function generatePDFInvoice($ordersID)
    {
        $order_invoice_list = array();
        if (is_array($ordersID)) {
            $order_invoice_list = self::getOrderInvoiceCollectionByOrdersID($ordersID) ;  
        }
        else {
            $order = new Order((int)$ordersID);
            if (!Validate::isLoadedObject($order)) {
                $this->errors[] = $this->l('The order cannot be found within your database.', 'AdminCustomersOrdersManager');
            }
            $order_invoice_list = $order->getInvoicesCollection();   
        }
        Hook::exec('actionPDFInvoiceRender', ['order_invoice_list' => $order_invoice_list]);

        $pdf = new PDF($order_invoice_list, PDF::TEMPLATE_INVOICE, Context::getContext()->smarty);
        $pdf->render();
    }
    
    /**
     * AdminCustomersOrdersManagerController::getOrderInvoiceCollectionByOrdersID()
     * Returns all the order invoice that match the id orders.
     *
     * @param int $id_orders
     *
     * @return array collection of OrderInvoice
     */
    public static function getOrderInvoiceCollectionByOrdersID($id_orders)
    {
        $ids = implode(',', $id_orders);
        $order_invoice_list = Db::getInstance()->executeS('
            SELECT oi.*
            FROM `' . _DB_PREFIX_ . 'order_invoice` oi
            LEFT JOIN `' . _DB_PREFIX_ . 'orders` o ON (o.`id_order` = oi.`id_order`)
            WHERE oi.`id_order` IN ('.pSQL($ids).')' . Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o') . '
            AND oi.number > 0 ORDER BY oi.date_add ASC');
        return ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list);
    }
    
    public function ajaxProcessGetTotalsByDates()
    {
        if (Tools::getValue('token')) {
            $date_from = Tools::getValue('date_from');
            $date_to = Tools::getValue('date_to');
            $total_brexit = version_compare(_PS_VERSION_, '1.7.6.0', '>=')?Tools::getContextLocale($this->context)->formatPrice(CustomersOrders::getTotalBrexit(false, $date_from, $date_to), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalBrexit(false, $date_from, $date_to));
            $total_brexit_wt = version_compare(_PS_VERSION_, '1.7.6.0', '>=')?Tools::getContextLocale($this->context)->formatPrice(CustomersOrders::getTotalBrexit(true, $date_from, $date_to), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalBrexit(true, $date_from, $date_to));
            $total_tax_exempt = version_compare(_PS_VERSION_, '1.7.6.0', '>=')?Tools::getContextLocale($this->context)->formatPrice(CustomersOrders::getTotalTaxExempt($date_from, $date_to), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalTaxExempt($date_from, $date_to));
            $total_voec = version_compare(_PS_VERSION_, '1.7.6.0', '>=')?Tools::getContextLocale($this->context)->formatPrice(CustomersOrders::getTotalVOEC(false, $date_from, $date_to), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalVOEC(false, $date_from, $date_to));
            $total_voec_wt = version_compare(_PS_VERSION_, '1.7.6.0', '>=')?Tools::getContextLocale($this->context)->formatPrice(CustomersOrders::getTotalVOEC(true, $date_from, $date_to), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalVOEC(true, $date_from, $date_to));
            $total_intracommunity = version_compare(_PS_VERSION_, '1.7.6.0', '>=')?Tools::getContextLocale($this->context)->formatPrice(CustomersOrders::getTotalIntracommunity(null, false, $date_from, $date_to), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalIntracommunity(null, false, $date_from, $date_to));
            $total_intracommunity_wt = version_compare(_PS_VERSION_, '1.7.6.0', '>=')?Tools::getContextLocale($this->context)->formatPrice(CustomersOrders::getTotalIntracommunity(null, true, $date_from, $date_to), $this->context->currency->iso_code):Tools::displayPrice(CustomersOrders::getTotalIntracommunity(null, true, $date_from, $date_to));
            
            die(json_encode(array(
                'total_brexit' => $total_brexit,
                'total_brexit_wt' => $total_brexit_wt,
                'total_tax_exempt' => $total_tax_exempt,
                'total_voec' => $total_voec,
                'total_voec_wt' => $total_voec_wt,
                'total_intracommunity' => $total_intracommunity,
                'total_intracommunity_wt' => $total_intracommunity_wt
            )));
        }
        else {
            die('Token is not valid!');
        }
    }
          
    /**
     * AdminCustomersOrdersManagerController::l()
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