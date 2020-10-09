<?php
/*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

use PrestaShop\PrestaShop\Core\Payment\PaymentOption;

if (!defined('_PS_VERSION_')) {
    exit;
}

class BillinkPayment extends PaymentModule
{

    // BILLINK VERSION 2.7.1
    private $_html = '';
    private $billink_user;
    private $billink_url;
    private $billink_userID;
    private $billink_mode;
    private $billink_costs;
    private $billink_version;
    private $billink_workflow;
    private $billink_advise;
    private $billink_max;

    public $hooks = array(
        'displayPayment',
        'displayPaymentEU',
        'paymentOptions',
        'displayAdminOrder',
        'displayHeader',
        'displayBackOfficeHeader',
        'displayOrderConfirmation',
        'hookPaymentOptions',
        'hookPaymentReturn',
        'hookPayment',
    );

    protected $_postErrors = array();

    public $details;
    public $owner;
    public $address;
    public $extra_mail_vars;

    // CONSTRUCT BILLINK
    public function __construct()
    {
		$this->author = 'OIT';
        $this->name = 'billinkpayment';
        $this->tab = 'payments_gateways';
        $this->version = "2.7.1";
        $this->currencies = false;
        $this->controllers = array('payment', 'validation');
        $this->is_eu_compatible = 1;
        $this->currencies_mode = 'checkbox';
        $this->bootstrap = true;
        $this->page = basename(__FILE__, '.php');
        $this->displayName = $this->l('Koop nu en betaal later');
        $this->description = $this->l('Order verwerking via Billink');

        parent::__construct();

        $this->_init();

    }

    // INSTALL MODULE
    public function install()
    {

        parent::install();

        foreach ($this->hooks as $hook) {
            $this->registerHook($hook);
        }

        // CREATE OR UPDATE BILLINK CONFIGURATION
        Configuration::updateValue('BILLINK_URL', 'https://client.billink.nl');
        Configuration::updateValue('BILLINK_USR', '');
        Configuration::updateValue('BILLINK_MODE', 1);
        Configuration::updateValue('BILLINK_USER_ID', '');
        Configuration::updateValue('BILLINK_COSTS', '');
        Configuration::updateValue('BILLINK_TAX', '');
        Configuration::updateValue('BILLINK_VERSION', 'BILLINK2.0');
        Configuration::updateValue('BILLINK_WORKFLOW', '1');
        Configuration::updateValue('BILLINK_ADVISE', '0,1,2');
        Configuration::updateValue('BILLINK_MAX', '');

        // CREATE BILLINK ORDER STATE
        $OrderState = new OrderState();
        $OrderState->name = array_fill(0,10,$this->l('Billink – Achteraf Betalen'));
        $OrderState->template = array_fill(0,10,$this->l('Billink'));
        $OrderState->send_email = 0;
        $OrderState->invoice = 0;
        $OrderState->color = "#FDCA85";
        $OrderState->unremovable = false;
        $OrderState->logable = 1;
        $OrderState->add();

        Db::getInstance()->Execute("INSERT INTO `"._DB_PREFIX_."product` 
		(`id_product`, 
		`id_supplier`, 
		`id_manufacturer`, 
		`id_category_default`, 
		`id_shop_default`, 
		`id_tax_rules_group`, 
		`on_sale`, 
		`online_only`, 
		`ean13`, 
		`isbn`,
		`upc`,
		`ecotax`,
		`quantity`,
		`minimal_quantity`,
		`price`,
		`wholesale_price`,
		`unity`,
		`unit_price_ratio`,
		`additional_shipping_cost`,
		`reference`,
		`supplier_reference`,
		`location`,
		`width`,
		`height`,
		`depth`,
		`weight`,
		`out_of_stock`,
		`quantity_discount`,
		`customizable`,
		`uploadable_files`,
		`text_fields`,
		`active`,
		`redirect_type`,
		`id_product_redirected`,
		`available_for_order`,
		`available_date`,
		`show_condition`,
		`condition`,
		`show_price`,
		`indexed`,
		`visibility`,
		`cache_is_pack`,
		`cache_has_attachments`,
		`is_virtual`,
		`cache_default_attribute`,
		`date_add`,
		`date_upd`,
		`advanced_stock_management`,
		`pack_stock_type`,
		`state`) VALUES ('0', NULL, NULL, NULL, '1', '1', '0', '0', NULL, NULL, NULL, '0.000000', '0', '1', '0.000000', '0.000000', NULL, '0.000000', '0.00', 'administratiekosten', 
		NULL, NULL, '0.000000', '0.000000', '0.000000', '0.000000', '2', '0', '0', '0', '0', '1', '', '0', '1', NULL, '0', 'new', '1', '0', 'both', '0', '0', '0', NULL, 
		'".date("Y-m-d H:i:s", strtotime("now"))."', '".date("Y-m-d H:i:s", strtotime("now"))."', '0', '3', '1');");
        $last_id = (int)Db::getInstance()->Insert_ID();
        Db::getInstance()->Execute("INSERT INTO `"._DB_PREFIX_."product_shop` (`id_product`,
`id_shop`,
`id_category_default`, `id_tax_rules_group`, `on_sale`, `online_only`, `ecotax`, `minimal_quantity`, `price`, `wholesale_price`, `unity`, `unit_price_ratio`, `additional_shipping_cost`, `customizable`, `uploadable_files`, `text_fields`, `active`, `redirect_type`, `available_for_order`, `available_date`, `show_condition`, `condition`, `show_price`, `indexed`, `visibility`, `cache_default_attribute`, `advanced_stock_management`, `date_add`, `date_upd`, `pack_stock_type`) VALUES ('".$last_id."', '1', NULL, '1', '0', '0', '0.000000', '1', '0.000000', '0.000000', NULL, '0.000000', '0.00', '0', '0', '0', '1', '0', '1', NULL, '1', 'new', '1', '0', 'both', NULL, '0', '".date("Y-m-d H:i:s", strtotime("now"))."', '".date("Y-m-d H:i:s", strtotime("now"))."', '3');");

        Configuration::updateValue('BILLINK_ADMINISTRATION_COSTS', $last_id);
        Configuration::updateValue('BILLINK_STATUS', $OrderState->id);

        return true;

    }
	public function hookDisplayHeader($params)
    {
        $this->context->controller->addCSS($this->_path . 'views/css/billink.css');        
    }
    public function hookOrderConfirmation($params)
    {
        $order = new Order($params['order']->id);

        // UPDATE ORDER TOTALS IN PS 1.7
        if($order->mobile_theme != 1 && $order->module == 'billinkpayment') {
            $billink_costs = Configuration::get('BILLINK_COSTS');
            $billink_tax = Configuration::get('BILLINK_TAX');
            $billink_price = $billink_costs * (1 + ($billink_tax / 100));
			/*
			Db::getInstance()->Execute(
			"UPDATE `"._DB_PREFIX_."orders` AS o SET mobile_theme = 1, total_paid_tax_incl = '".($order->total_paid + $billink_price)."', 
			total_products = '".($order->total_products + $billink_costs)."', total_products_wt = '".($order->total_products_wt + $billink_price)."', 
			total_paid = '".($order->total_paid + $billink_price)."', total_paid_real = '".($order->total_paid + $billink_price)."' WHERE o.id_order='".$order->id."'"
			);
            Db::getInstance()->Execute("UPDATE `"._DB_PREFIX_."order_payment` AS o SET amount = '".($order->total_paid + $billink_price)."' WHERE o.order_reference='".$order->reference."'");			
			*/
			$order->mobile_theme = 1;
			$order->total_paid_tax_incl = ($order->total_paid + $billink_price);
			$order->total_products = ($order->total_products + $billink_costs);
			$order->total_products_wt = ($order->total_products_wt + $billink_price);
			$order->total_paid = ($order->total_paid + $billink_price);
			$order->total_paid_real = ($order->total_paid + $billink_price);
			$order->update();
			
			Db::getInstance()->Execute("UPDATE `"._DB_PREFIX_."order_payment` AS o SET amount = amount+'".$billink_price."' WHERE o.order_reference='".$order->reference."'");
        }

    }
	
    // GET CONTENT FOR ADMIN
    public function getContent()
    {

        // SAVE SETTINGS
        if(Tools::getValue('save')){

            $advise = implode(",", $_POST['billink_advise']);

            if(
                !Configuration::updateValue('BILLINK_URL', strval($_POST['billink_url']))
                OR !Configuration::updateValue('BILLINK_USR', strval($_POST['billink_user']))
                OR !Configuration::updateValue('BILLINK_MODE', intval($_POST['billink_mode']))
                OR !Configuration::updateValue('BILLINK_USER_ID', strval($_POST['billink_userID']))
                OR !Configuration::updateValue('BILLINK_COSTS', floatval($_POST['billink_costs']))
                OR !Configuration::updateValue('BILLINK_TAX', floatval($_POST['billink_tax']))
                OR !Configuration::updateValue('BILLINK_VERSION', strval($_POST['billink_version']))
                OR !Configuration::updateValue('BILLINK_WORKFLOW', strval($_POST['billink_workflow']))
                OR !Configuration::updateValue('BILLINK_ADVISE', strval($advise))
                OR !Configuration::updateValue('BILLINK_STATUS', intval($_POST['billink_status']))
                OR !Configuration::updateValue('BILLINK_MAX', intval($_POST['billink_max']))
            )
                echo $this->l('Fout in het opslaan van de instellingen.');
            else
                Tools::redirectAdmin('index.php?tab=AdminModules&configure='.$this->name.'&token='.Tools::getValue('token').'&confirm=1');

        }

        $this->_html = $this->_displayForm();
        return $this->_html;
    }

    public function hookPaymentOptions($params)
    {
        if (!$this->active) {
            return;
        }

        if (version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
            return null;
        }

        $cart = $this->context->cart;
        $smarty = $this->context->smarty;

        $customer = new Customer($cart->id_customer);
        $invoice_addres = new Address($cart->id_address_invoice);

        $billink_costs = number_format(Configuration::get('BILLINK_COSTS'), 2);
        $billink_tax = Configuration::get('BILLINK_TAX');

        $billink_price =  number_format($billink_costs * (1 + ($billink_tax / 100)), 2);

        /* CHECK IF PHONE NUMBER AND BIRTHDATE ALREADY EXISTS IN ADDRESS */
        $time = strtotime($customer->birthday);
        $birthday_dag = date('d', $time);
        $birthday_maand = (int)date('m', $time);
        $birthday_jaar = date('Y', $time);

        $this->smarty->assign(array(
            'this_path' => $this->_path,
            'billink_costs' => $billink_price,
            'telefoon_account' => $invoice_addres->phone,
            'birthday_dag' => $birthday_dag,
            'birthday_maand' => $birthday_maand,
            'birthday_jaar' => $birthday_jaar,
            'current_year' => date('Y'),
            'maanden' => array(1 => 'januari', 2 => 'februari', 3 => 'maart', 4 => 'april', 5 => 'mei', 6 => 'juni', 7 => 'juli', 8 => 'augustus', 9 => 'september', 10 => 'oktober', 11 => 'november', 12 => 'december'),
            'this_path_ssl' => Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ . 'modules/' . $this->name . '/'
        ));
		
		if(isset($_GET['validateme']) && $_GET['validateme'] == 'yes')
		{
			if ($_GET['dag'] AND $_GET['maand'] AND $_GET['jaar'] AND $_GET['tn'])
			{
				$geboortedatum = $_GET['dag'] . '-' . $_GET['maand'] . '-' . $_GET['jaar'];
				$geboortedatum = date('d-m-Y', strtotime($geboortedatum));
				$telefoon = $_GET['tn'];
	
				$uitkomst = $this->_check('check', $geboortedatum, $telefoon);
	
				if ($uitkomst) {
					$this->smarty->assign('token', $uitkomst);
					$this->smarty->assign('gb', $geboortedatum);
					$this->smarty->assign('tn', $telefoon);
	
	//                Tools::redirectLink(__PS_BASE_URI__.'order-confirmation.php?id_cart='.$cart->id.'&id_module='.$billink->id.'&id_order='.$billink->currentOrder.'&key='.$customer->secure_key);
					Tools::redirectLink($this->context->link->getModuleLink($this->name, 'payment', array(), true).'?dag='.$_GET['dag'].'&maand='.$_GET['maand'].'&jaar='.$_GET['jaar'].'&tn='.$telefoon.'&scbk='.$uitkomst);
				} else {
					$paymentOptions = array();
					$newOption = new PaymentOption();
					$newOption
						->setCallToActionText($this->l('Op basis van een globale controle kunt u niet achteraf betalen.'))
					;
					$paymentOptions[] = $newOption;
					return $paymentOptions;
				}
			}else{
				$paymentOptions = array();
					$newOption = new PaymentOption();
					$newOption
						->setCallToActionText($this->l('Op basis van een globale controle kunt u niet achteraf betalen.'))
					;
					$paymentOptions[] = $newOption;
					return $paymentOptions;
			}
        

        } elseif ($customer->birthday != '' && $customer->birthday != '0000-00-00' && $invoice_addres->phone != '') {

            $geboortedatum = date('d-m-Y', strtotime($customer->birthday));
            $uitkomst = $this->_check('check', $geboortedatum, $invoice_addres->phone);

            if ($uitkomst) {

                $this->smarty->assign('token', $uitkomst);
                $this->smarty->assign('action', $this->context->link->getModuleLink($this->name, 'payment', array(), true));
                $this->smarty->assign('gb', $geboortedatum);
                $this->smarty->assign('tn', $invoice_addres->phone);

                $url = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ . 'modules/' . $this->name . '/';

                $paymentOptions = array();
                $newOption = new PaymentOption();
                $newOption
                    ->setCallToActionText('Billink – Achteraf Betalen')
                    ->setForm($this->fetch('module:billinkpayment/views/templates/front/payment_set.tpl'))
                ;
                $paymentOptions[] = $newOption;
                return $paymentOptions;
            } else {
                $paymentOptions = array();
                $newOption = new PaymentOption();
                $newOption
                    ->setCallToActionText($this->l('Op basis van een globale controle kunt u niet achteraf betalen.'))
                ;
                $paymentOptions[] = $newOption;
                return $paymentOptions;
            }

        } else {
            $this->smarty->assign(array(
                'this_path' => $this->_path,
                'billink_costs' => $billink_price,
                'tn' => $invoice_addres->phone,
                'birthday_dag' => $birthday_dag,
                'birthday_maand' => $birthday_maand,
                'birthday_jaar' => $birthday_jaar,
                'current_year' => date('Y'),
                'maanden' =>  array(1 => 'januari', 2 => 'februari', 3 => 'maart', 4 => 'april', 5 => 'mei', 6 => 'juni', 7 => 'juli', 8 => 'augustus', 9 => 'september', 10 => 'oktober', 11 => 'november', 12 => 'december'),
                'this_path_ssl' => Tools::getShopDomainSsl(true, true).__PS_BASE_URI__.'modules/'.$this->name.'/',
//                'action' => $this->context->link->getModuleLink($this->name, 'payment', array(), true),
                'action' => '',
                'check' => '1'
            ));

            $paymentOptions = array();
            $newOption = new PaymentOption();
            $newOption
                ->setCallToActionText('Billink – Achteraf Betalen')
                ->setForm($this->fetch('module:billinkpayment/views/templates/front/payment_set.tpl'))
            ;
            $paymentOptions[] = $newOption;
            return $paymentOptions;
        }
    }

    public function hookPaymentReturn($params)
    {

    }

    // EXEC PAYMENT
    public function execPayment($cart)
    {

        global $cookie, $smarty;

        $billink_costs = Configuration::get('BILLINK_COSTS');
        $billink_tax = Configuration::get('BILLINK_TAX');

        $billink_price = $billink_costs * (1 + ($billink_tax / 100));

        $smarty->assign(array(
            'nbProducts' => $cart->nbProducts(),
            'total' => $cart->getOrderTotal(true, Cart::BOTH) + $billink_price,
            'this_path' => $this->_path,
            'billink_costs' => $billink_price,
            'this_path_ssl' => Tools::getShopDomainSsl(true, true).__PS_BASE_URI__.'modules/'.$this->name.'/'
        ));

        return $this->display(__FILE__, 'payment_execution.tpl');

    }

    public function checkCurrency($cart)
    {
        $currency_order = new Currency($cart->id_currency);
        $currencies_module = $this->getCurrency($cart->id_currency);

        if (is_array($currencies_module)) {
            foreach ($currencies_module as $currency_module) {
                if ($currency_order->id == $currency_module['id_currency']) {
                    return true;
                }
            }
        }
        return false;
    }

    protected function generateForm($phone, $birthday_dag, $birthday_maand, $birthday_jaar)
    {
        $this->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array(), true),
            'telefoon_account' => $phone,
            'birthday_dag' => $birthday_dag,
            'birthday_jaar' => $birthday_jaar,
            'current_year' => date('Y'),
            'maanden' =>  array(1 => 'januari', 2 => 'februari', 3 => 'maart', 4 => 'april', 5 => 'mei', 6 => 'juni', 7 => 'juli', 8 => 'augustus', 9 => 'september', 10 => 'oktober', 11 => 'november', 12 => 'december'),
        ]);

        return $this->fetch('module:billinkpayment/views/templates/front/payment_set.tpl');
    }

    // RUN BILLINK CHECK
    function _runcheck($data = false)
    {
        if(!$data)
            return false;

        $mode = $this->billink_mode;

        if($mode == 1) {
            $url = "https://client.billink.nl/api/check";
        } else {
            $url = "https://test.billink.nl/api/check";
        }

        $xml = $data;
        $result = $this->post_xml($url, $xml);
        $uitkomst = simplexml_load_string(trim($result));
        $advies = $uitkomst->MSG->DESCRIPTION;
        $geheimecode = $uitkomst->UUID;
        $inhoud = array('advies' => $advies, 'geheimecode' => $geheimecode);

        return $inhoud;
    }

    // CREATE A BILLINK ORDER
    public function createOrder($currentOrder)
    {
        $order = new Order($currentOrder);

        Db::getInstance()->Execute('INSERT INTO `'._DB_PREFIX_.'cart_product` (
          `id_cart`, 
          `id_product`, 
          `id_address_delivery`, 
          `id_shop`, 
          `id_product_attribute`, 
          `id_customization`, 
          `quantity`, 
          `date_add`) VALUES ("'.$order->id_cart.'", "'.Configuration::get('BILLINK_ADMINISTRATION_COSTS').'", "'.$order->id_address_delivery.'", "'.$order->id_shop.'", "0", "0", "1", "'.date("Y-m-d H:i:s").'");');
		
		$osql = '';
        if($order->mobile_theme != 1 && $order->module == 'billinkpayment') {
            $billink_costs = Configuration::get('BILLINK_COSTS');
            $billink_tax = Configuration::get('BILLINK_TAX');
            $billink_price = $billink_costs * (1 + ($billink_tax / 100));
			
			$order->mobile_theme = 1;
			$order->total_paid_tax_incl = ($order->total_paid + $billink_price);
			$order->total_products = ($order->total_products + $billink_costs);
			$order->total_products_wt = ($order->total_products_wt + $billink_price);
			$order->total_paid = ($order->total_paid + $billink_price);
			$order->total_paid_real = ($order->total_paid + $billink_price);
			$order->update();
			
			Db::getInstance()->Execute("UPDATE `"._DB_PREFIX_."order_payment` AS o SET amount = amount+'".$billink_price."' WHERE o.order_reference='".$order->reference."'");
			
        }

        if($order->module == 'billinkpayment') {
            $billink_costs = Configuration::get('BILLINK_COSTS');
            $billink_tax = Configuration::get('BILLINK_TAX');
            $calcutax = 1 + ($billink_tax / 100);

            $values = array(
                'id_order' => (int)($order->id),
                'product_name' => $this->l('Administratiekosten'),
                'product_id' => Configuration::get('BILLINK_ADMINISTRATION_COSTS'),
                'id_shop' => (int)(1),
                'product_attribute_id' => (int)(0),
                'product_quantity' => (int)(1),
                'tax_rate' => (float)($billink_tax),
                'product_price' => (float)($billink_costs),
                'total_price_tax_incl' => ($billink_costs * $calcutax),
                'total_price_tax_excl' => ($billink_costs),
                'unit_price_tax_incl' => ($billink_costs * $calcutax),
                'unit_price_tax_excl' => ($billink_costs)
            );
			
			$invoice_id = 0;
			$invoices = $order->getInvoicesCollection();
			if ($invoices) {
				foreach ($invoices as $invoice) {
					$invoice_id = $invoice->id;
					
					$invoice->total_paid_tax_excl = $invoice->total_paid_tax_excl+ (float)($billink_tax);
					$invoice->total_paid_tax_incl = $invoice->total_paid_tax_incl + ($billink_costs * $calcutax);
					$invoice->total_products = $invoice->total_products + (float)($billink_tax);
					$invoice->total_products_wt = $invoice->total_products_wt + ($billink_costs * $calcutax);
					$invoice->save();
					$values["id_order_invoice"]=$invoice_id;
					break;
				}
			}
			
            $sleutel = '';
            $waarde = '';
            foreach($values AS $key => $value){
                $sleutel .= (!empty($sleutel) ? ', ' : '').'`'.$key.'`';
                $waarde .= (!empty($waarde) ? ', ' : '').'"'.$value.'"';
            }

            Db::getInstance()->Execute('INSERT INTO `'._DB_PREFIX_.'order_detail` ('.$sleutel.') VALUES ('.$waarde.')');
        }

        $customer = new Customer($order->id_customer);
        $invoice = new Address($order->id_address_invoice);
        $datum = date('d-m-Y');
        $pattern = '/[^0-9]*/';
        $geboortedatum = $_GET['gb'];
        $telefoonnummer = $_GET['tn'];
        $vowels = array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
        $straatnaam = str_replace($vowels, '', $invoice->address1);
        $extension = preg_replace("/[^0-9]/","",$invoice->address1);
        $plaats = preg_replace("[^A-Za-z0-9\-]", "" , $invoice->city);

        if($customer->id_gender == 2) {
            $sex = 'V';
        }
        else {
            $sex = 'M';
        }

        $data = '
            <API> 
                <VERSION>'.$this->billink_version.'</VERSION> 
                <CLIENTUSERNAME>'.$this->billink_user.'</CLIENTUSERNAME> 
                <CLIENTID>'.$this->billink_userID.'</CLIENTID> 
                <ACTION>Order</ACTION>
                <WORKFLOWNUMBER>'.$this->billink_workflow.'</WORKFLOWNUMBER>
                <ORDERNUMBER>'.$currentOrder.'</ORDERNUMBER> 
                <DATE>'.$datum.'</DATE>
                <TYPE>P</TYPE>
                <FIRSTNAME>'.$customer->firstname.'</FIRSTNAME>
                <LASTNAME>'.$customer->lastname.'</LASTNAME>
                <SEX>'.$sex.'</SEX>
                <BIRTHDATE>'.$_GET['gb'].'</BIRTHDATE>
                <STREET>'.$straatnaam.'</STREET>
                <HOUSENUMBER>'.$extension.'</HOUSENUMBER>
                <POSTALCODE>'.$invoice->postcode.'</POSTALCODE>
                <CITY>'.$plaats.'</CITY>
                <PHONENUMBER>'.$_GET['tn'].'</PHONENUMBER>
                <EMAIL>'.$customer->email.'</EMAIL>
                <CHECKUUID>'.$_GET['scbk'].'</CHECKUUID>
                <ADITIONALTEXT>Ordernummer: '.$order->id.'</ADITIONALTEXT>
                <ORDERITEMS>
            ';
        $data .= $this->getOrderItems($order->id);
        $data .= $this->getShipping($order->id);

        $data .= '</ORDERITEMS></API>';
		
		
		
        if($this->_runorder($data,$order))
            return true;
        else
            return false;

    }

    // RETURNS A ORDER ITEMS
    public function getOrderItems($orderid)
    {

        global $cart;
        $data = '';
        $order = new Order($orderid);
        $products = $order->getProducts();

        foreach($products AS $product){
            $product_price_excl = Tools::ps_round($product['unit_price_tax_excl'], 2);
            $product_price_incl = Tools::ps_round($product['unit_price_tax_incl'], 2);
            $calctax = (($product_price_incl / $product_price_excl) - 1) * 100;
            $tax = round($calctax, 2);

            $data  .= '
				<ITEM> 
					<CODE>'.$product['product_id'].'</CODE> 
					<DESCRIPTION>'.$product['product_name'].'</DESCRIPTION> 
					<ORDERQUANTITY>'.$product['product_quantity'].'</ORDERQUANTITY> 
					<ITEMQUANTITY>1</ITEMQUANTITY> 
					<PRICEEXCL>'.$product_price_excl.'</PRICEEXCL> 
					<PRICEINCL>'.$product_price_incl.'</PRICEINCL> 
					<BTW>'.Tools::ps_round($product['tax_rate'], 0).'</BTW> 
				</ITEM>
			';

        }

        if($order->total_discounts > 0) {

            $data  .= '
				<ITEM> 
					<CODE>K01</CODE> 
					<DESCRIPTION>Kortingscode</DESCRIPTION> 
					<ORDERQUANTITY>1</ORDERQUANTITY> 
					<ITEMQUANTITY>1</ITEMQUANTITY> 
					<PRICEEXCL>-'.Tools::ps_round($order->total_discounts, 2).'</PRICEEXCL> 
					<PRICEINCL>-'.Tools::ps_round($order->total_discounts, 2).'</PRICEINCL> 
					<BTW>0</BTW> 
				</ITEM>
			';
        }

        return $data;

    }

    // SET SHIPPINGCOSTS
    public function getShipping($orderid)
    {
        $data_ship = '';
        $order = new Order($orderid);
        $price  = $order->total_shipping;

        $shipping_cost_inc = $order->total_shipping_tax_incl;
        $shipping_cost_exc = $order->total_shipping_tax_excl;

        if($shipping_cost_inc > 0) {
            $data_ship .= '
				<ITEM> 
					<CODE>00</CODE> 
					<DESCRIPTION>'.$this->l('Verzendkosten').'</DESCRIPTION> 
					<ORDERQUANTITY>1</ORDERQUANTITY> 
					<ITEMQUANTITY>1</ITEMQUANTITY> 
					<PRICEEXCL>'.Tools::ps_round($shipping_cost_exc, 2).'</PRICEEXCL> 
					<PRICEINCL>'.Tools::ps_round($shipping_cost_inc, 2).'</PRICEINCL> 
					<BTW>'.Tools::ps_round($order->carrier_tax_rate, 0).'</BTW> 
				</ITEM>
			';
        }
        return $data_ship;
    }

    // INITIALIZE BILLINK CONFIGURATION
    private function _init()
    {
        $this->billink_mode = Configuration::get('BILLINK_MODE');
        $this->billink_user = Configuration::get('BILLINK_USR');
        $this->billink_url = Configuration::get('BILLINK_URL');
        $this->billink_userID = Configuration::get('BILLINK_USER_ID');
        $this->billink_costs = Configuration::get('BILLINK_COSTS');
        $this->billink_version = Configuration::get('BILLINK_VERSION');
        $this->billink_workflow = Configuration::get('BILLINK_WORKFLOW');
        $this->billink_state = Configuration::get('BILLINK_STATUS');
        $this->billink_tax = Configuration::get('BILLINK_TAX');
        $this->billink_max = Configuration::get('BILLINK_MAX');
        $this->billink_advise = explode(",", Configuration::get('BILLINK_ADVISE'));
    }

    private function is_digits($element) {
        return !preg_match ("/[^0-9]/", $element);
    }

    private function post_xml($url, $xml) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/xml; charset=utf-8"));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        $result = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);

        return $result;
    }

    // RUN BILLINK CHECK
    private function _runorder($data = false,$order='')
    {

        if(!$data)
            return false;

        $mode = $this->billink_mode;

        if($mode == 1) {
            $url = "https://client.billink.nl/api/order";
        } else {
            $url = "https://test.billink.nl/api/order";
        }

        $xml = $data;
		
        $result = $this->post_xml($url, $xml);

        $return = simplexml_load_string(trim($result));
		
		if(strtolower($return->RESULT) == 'error')
		{
			$history = new OrderHistory();
			$history->id_order = $order->id;
			$history->id_employee = 0;

			$use_existings_payment = false;
			if (!$order->hasInvoice()) {
				$use_existings_payment = true;
			}
			$history->changeIdOrderState((int) Configuration::get('PS_OS_ERROR'), $order, $use_existings_payment);

			$templateVars = array();
			// Save all changes
			$history->addWithemail(true, $templateVars);
			
			$msg = new Message();
			$message = "Billink retourneert bestelfout: ".$return->ERROR->CODE."-".$return->ERROR->DESCRIPTION;
			if (Validate::isCleanHtml($message)) {
				if (self::DEBUG_MODE) {
					PrestaShopLogger::addLog('PaymentModule::validateOrder - Message is about to be added', 1, null, 'Cart', (int) $id_cart, true);
				}
				$msg->message = $message;
				$msg->id_cart = (int) $id_cart;
				$msg->id_customer = (int) ($order->id_customer);
				$msg->id_order = (int) $order->id;
				$msg->private = 1;
				$msg->add();
			}
			
			Tools::redirectLink($this->context->link->getModuleLink($this->name, 'paymenterr', array(), true).'?err='.$return->ERROR->CODE."-".$return->ERROR->DESCRIPTION);
			return $return->ERROR->CODE."-".$return->ERROR->DESCRIPTION;
		}else{
			return $return->MSG->CODE;
		}
    }

    private function huisnummer($str = false){

        if(strpos($str,' ') > 0){
            list($h,$t) = explode(' ',$str);
        }elseif(strpos($str,'-') > 0){
            list($h,$t) = explode('-',$str);
        }else{
            $h = ''; $t = '';
            for($i = 0;$i <= strlen($str)-1; $i++){

                if(is_numeric(substr($str,$i,1))){
                    $h .= substr($str,$i,1);
                }elseif(ctype_alpha(substr($str,$i,1))){
                    $t .= substr($str,$i,1);
                }
            }
        }

        $huisnummer = array($h,$t);
        return $huisnummer;

    }

    //DO REQUEST
    private function _check($action = 'check', $geboortedatum = NULL, $telefoon = NULL)
    {

        global $cart, $smarty;

        $customer = new Customer($cart->id_customer);
        $invoice_addres = new Address($cart->id_address_invoice);

        $order_total = $cart->getOrderTotal(true, Cart::BOTH);

        if($order_total + $this->billink_costs > $this->billink_max){
            $smarty->assign('total_limit', 1);
            return false;
        }

        if(!$action)
            return false;


        $action = ucfirst($action);

        $pattern = '/[^0-9]*/';
		
		if($telefoon == NULL)
		{
			if($invoice_addres->phone == '') {
				$telefoon = preg_replace($pattern,'', $invoice_addres->phone_mobile);
			}else {
				$telefoon = preg_replace($pattern,'', $invoice_addres->phone);
			}
		}else{
			$telefoon = preg_replace($pattern,'', $telefoon);
		}
        $extension = preg_replace("/[^0-9]/","",$invoice_addres->address1);

        $data = '

                    <API> 
                            <VERSION>'.$this->billink_version.'</VERSION> 
                            <CLIENTUSERNAME>'.$this->billink_user.'</CLIENTUSERNAME> 
                            <CLIENTID>'.$this->billink_userID.'</CLIENTID> 
                            <TYPE>P</TYPE>
                            <ACTION>'.$action.'</ACTION>
                            <WORKFLOWNUMBER>'.$this->billink_workflow.'</WORKFLOWNUMBER>
                            <INITIALS>'.$customer->firstname.'</INITIALS>
                            <LASTNAME>'.$customer->lastname.'</LASTNAME>
                            <HOUSENUMBER>'.$extension.'</HOUSENUMBER>
                            <POSTALCODE>'.$invoice_addres->postcode.'</POSTALCODE>
                            <PHONENUMBER>'.$telefoon.'</PHONENUMBER>
                            <EMAIL>'.$customer->email.'</EMAIL>
                            <BIRTHDATE>'.$geboortedatum.'</BIRTHDATE>
                            <ORDERAMOUNT>'.$order_total.'</ORDERAMOUNT>
                            <IP>'.$_SERVER['REMOTE_ADDR'].'</IP>
                    </API>

            ';

        $advies = $this->_runcheck($data);

        // CHECK CREDIT STATUS EN RETURN MESSAGE
        if($advies['advies'] == 'Advies=1') {
            return $advies['geheimecode'];
        }
        else
            return false;

    }

    // SHOW SETTINGS FORM
    private function _displayForm()
    {

        global $cookie;

        if(in_array(2, $this->billink_advise))
            $advise_2 = 'checked="checked"';

        if(in_array(1, $this->billink_advise))
            $advise_1 = 'checked="checked"';

        if(in_array(0, $this->billink_advise))
            $advise_0 = 'checked="checked"';

        if(Tools::getValue('confirm'))
            $this->_html .= '<div class="conf confirm"><img src="/modules/billinkpayment/ok.gif" alt="' .$this->l('ok').'" /> '.$this->l('Instellingen opgeslagen').'</div>';

        $orderstate = new OrderState();
        $orderstates = $orderstate->getOrderStates($cookie->id_lang);

        $taxes = Tax::getTaxes();

        $this->_html .= '<h2>'.$this->l('Billink - Koop nu en betaal later').'</h2>';
        $this->_html .= '<p style="line-height: 21px">'.$this->l('Met Billink kunt u op een veilige manier klanten achteraf laten betalen na ontvangst van het product. Een feit is dat consumenten twee keer zo snel overgaan tot een internetaankoop wanneer de optie achteraf betalen wordt geboden. Let op! Het veld geboortedatum is verplicht voor een juiste controle. Verwijder birthday / geboortedatum niet u Prestashop.').'.</p>';
        $this->_html .= '<p>&nbsp;</p><form action="'.$_SERVER['REQUEST_URI'].'" method="post" style="clear: both;"><input type="hidden" value="'.Tools::getValue('token').'" name="token" />';
        $this->_html .= '

                    <fieldset>
                    <legend><img src="'.$this->_path.'logo.gif" />'.$this->l('Instellingen').'</legend>
                    <label for="billink_user">'.$this->l('Gebruikersnaam Billink').':</label>
                    <div class="margin-form">
                            <input type="text" size="50" name="billink_user" id="billink_user" value="'.htmlentities($this->billink_user, ENT_COMPAT, 'UTF-8').'" />
                            <p class="clear">'.$this->l('Billink gebruikersnaam').'</p>
                    </div>

                    <label for="billink_userID">'.$this->l('GebruikersID Billink').':</label>
                    <div class="margin-form">
                            <input type="text" size="50" id="billink_userID" name="billink_userID" value="'.htmlentities($this->billink_userID, ENT_COMPAT, 'UTF-8').'" />
                            <p class="clear">'.$this->l('Billink gebruikers id').'</p>
                    </div>

                    <label for="billink_version">'.$this->l('Billink api versie').':</label>
                    <div class="margin-form">
                            <input type="text" id="billink_version" size="50" name="billink_version" value="'.htmlentities($this->billink_version, ENT_COMPAT, 'UTF-8').'" />
                            <p class="clear">'.$this->l('Billink api versie').'</p>
                    </div>

                    <label for="billink_version">'.$this->l('Workflow nummer').':</label>
                    <div class="margin-form">
                            <input type="text" id="billink_workflow" size="50" name="billink_workflow" value="'.htmlentities($this->billink_workflow, ENT_COMPAT, 'UTF-8').'" />
                            <p class="clear">'.$this->l('Workflow nummer').'</p>
                    </div>

                    <label for="billink_costs">'.$this->l('Kosten Billink excl. BTW').':</label>
                    <div class="margin-form">
                            <input type="text" size="50" id="billink_costs" name="billink_costs" value="'.htmlentities($this->billink_costs, ENT_COMPAT, 'UTF-8').'" />
                            <p class="clear">'.$this->l('Billink kosten exclusief BTW (deze worden door berekend aan uw klant)').'</p>
                    </div>

                    <label for="billink_costs">'.$this->l('BTW percentage kosten Billink').':</label>
                    <div class="margin-form">
                            <input type="text" size="5" id="billink_tax" name="billink_tax" value="'.htmlentities($this->billink_tax, ENT_COMPAT, 'UTF-8').'" />
                            <p class="clear">'.$this->l('BTW percentage Billink kosten in %').'</p>
                    </div>

                    <label for="billink_max">'.$this->l('Maximaal orderbedrag').':</label>
                    <div class="margin-form">
                            <input type="text" size="5" id="billink_max" name="billink_max" value="'.htmlentities($this->billink_max, ENT_COMPAT, 'UTF-8').'" />
                            <p class="clear">'.$this->l('Maximaal orderbedrag in hele getallen').'</p>
                    </div>

                    <label for="billink_advise">'.$this->l('Billink mode').':</label>
                    <div class="margin-form">
                            <input type="radio" '.($this->billink_mode ? 'checked="checked"' : '').' name="billink_mode" value="1" id="mode_production">&nbsp;<label class="t" for="mode_production">'.$this->l('Productie').'</label>&nbsp;&nbsp;
                            <input type="radio" '.(!$this->billink_mode ? 'checked="checked"' : '').' name="billink_mode" value="0" id="mode_sandbox">&nbsp;<label class="t" for="mode_sandbox">'.$this->l('Sandbox mode').'</label>&nbsp;&nbsp;
                            <p class="clear">'.$this->l('Kies api mode').'</p>
                    </div>

                    <label for="billink_status">'.$this->l('Standaard Billink order status').':</label>
                    <div class="margin-form">
                            <select name="billink_status" id="billink_status">
                    ';

        foreach($orderstates AS $state)
            $this->_html .= '<option '.($state['id_order_state'] == $this->billink_state ? 'selected="selected"' : '').' value="'.$state['id_order_state'].'">'.$state['name'].'</option>';

        $this->_html .= '
                            </select>
                            <p class="clear">'.$this->l('Kies een orderstatus voor elke nieuwe bestelling').'</p>
                    </div>

                    <label></label>
                    <input type="submit" name="save" value="'.$this->l('Instellingen opslaan').'" class="button" />

                    </fieldset>
            ';

        return $this->_html;

    }
}
