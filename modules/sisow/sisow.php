<?php
require(dirname(__FILE__) . '/api/sisow.php');

use PrestaShop\PrestaShop\Core\Payment\PaymentOption;

if (!defined('_PS_VERSION_')) {
    exit;
}

class Sisow extends PaymentModule
{
	public function __construct()
    {
		$this->name = 'sisow';
        $this->tab = 'payments_gateways';
        $this->version = '5.3.0';
        $this->author = 'Sisow';
        $this->controllers = array('payment', 'validation');
		
		$this->currencies = true;
        $this->currencies_mode = 'radio';
		
		$this->bootstrap = true;
        parent::__construct();
		
		$this->displayName = $this->l('Sisow Payment Methods');
        $this->description = $this->l('This module allows you to accept payments with Sisow.');
        $this->confirmUninstall = $this->l('Are you sure you want to delete these details?');
        $this->ps_versions_compliancy = array('min' => '1.7.0.0', 'max' => _PS_VERSION_);

		$this->paymentMethods = array();
		$this->paymentMethods[] = array("id" => "ideal", "name" => $this->l("iDEAL"));
		$this->paymentMethods[] = array("id" => "idealqr", "name" => $this->l("iDEAL QR"));
		$this->paymentMethods[] = array("id" => "bunq", "name" => $this->l("bunq"));
		$this->paymentMethods[] = array("id" => "mistercash", "name" => $this->l("Bancontact"));
		$this->paymentMethods[] = array("id" => "homepay", "name" => $this->l("ING Home'Pay"));
		$this->paymentMethods[] = array("id" => "creditcard", "name" => $this->l("Creditcard"));
		$this->paymentMethods[] = array("id" => "overboeking", "name" => $this->l("Overboeking"));
		$this->paymentMethods[] = array("id" => "maestro", "name" => $this->l("Maestro"));
		$this->paymentMethods[] = array("id" => "vpay", "name" => $this->l("V PAY"));
		$this->paymentMethods[] = array("id" => "paypalec", "name" => $this->l("PayPal"));
		$this->paymentMethods[] = array("id" => "sofort", "name" => $this->l("SofortBanking"));
		$this->paymentMethods[] = array("id" => "giropay", "name" => $this->l("Giropay"));
		$this->paymentMethods[] = array("id" => "eps", "name" => $this->l("EPS"));
		$this->paymentMethods[] = array("id" => "vvv", "name" => $this->l("VVV Giftcard"));
		$this->paymentMethods[] = array("id" => "webshop", "name" => $this->l("Webshop Giftcard"));
		$this->paymentMethods[] = array("id" => "focum", "name" => $this->l("Focum Achteraf Betalen"));
		$this->paymentMethods[] = array("id" => "afterpay", "name" => $this->l("Afterpay"));
		$this->paymentMethods[] = array("id" => "billink", "name" => $this->l("Billink"));
		$this->paymentMethods[] = array("id" => "belfius", "name" => $this->l("Belfius Pay Button"));
		$this->paymentMethods[] = array("id" => "capayable", "name" => $this->l("Capayable Gespreid Betalen"));
		$this->paymentMethods[] = array("id" => "cbc", "name" => $this->l("CBC betaalknop"));
		$this->paymentMethods[] = array("id" => "kbc", "name" => $this->l("KBC betaalknop"));
		$this->paymentMethods[] = array("id" => "spraypay", "name" => $this->l("Spraypay Gespreid Betalen"));
		$this->paymentMethods[] = array("id" => "klarna", "name" => $this->l("Klarna Achteraf Betalen"));
		
		for($i = 0; $i < count($this->paymentMethods); $i ++)
		{
			$this->paymentMethods[$i]['sortOrder'] = Configuration::get('SISOW_SORTORDER_' . $this->paymentMethods[$i]['id']);
			
			if(empty($this->paymentMethods[$i]['sortOrder'])){
				$this->paymentMethods[$i]['sortOrder'] = 100 + $i;
			}
		}
		
		usort($this->paymentMethods, function($a, $b) {
			return $a['sortOrder'] - $b['sortOrder'];
		});
	}
	
	public function install()
    {
        return parent::install()
            && $this->registerHook('paymentOptions')
            && $this->registerHook('paymentReturn')
			&& $this->registerHook('displayHeader')
        ;
    }
	
	public function hookDisplayHeader($params)
	{
		$this->context->controller->addJS(($this->_path).'res/giroeps.min.js');
		$this->context->controller->addCSS(($this->_path).'res/giroeps.min.css');
	}

    public function uninstall()
    {
        return parent::uninstall();
    }
	
	private function _postValidation()
    {
		$this->_postErrors = array();
        if (Tools::isSubmit('btnSubmit')) {
            if (!Tools::getValue('SISOW_MERCHANTID')) {
                $this->_postErrors[] = $this->l('The "Merchant ID" field is required.');
            } elseif (!Tools::getValue('SISOW_MERCHANTKEY')) {
                $this->_postErrors[] = $this->l('The "Merchant Key" field is required.');
            }
        }
    }
	
	private function _postProcess()
    {
        if (Tools::isSubmit('btnSubmit')) {					
            Configuration::updateValue('SISOW_MERCHANTID', Tools::getValue('SISOW_MERCHANTID'));
            Configuration::updateValue('SISOW_MERCHANTKEY', Tools::getValue('SISOW_MERCHANTKEY'));
			Configuration::updateValue('SISOW_SHOPID', Tools::getValue('SISOW_SHOPID'));
			Configuration::updateValue('SISOW_DESCRIPTION', Tools::getValue('SISOW_DESCRIPTION'));
			Configuration::updateValue('SISOW_UPDATEPURCHASEID', Tools::getValue('SISOW_UPDATEPURCHASEID'));
			Configuration::updateValue('SISOW_LOGOS', Tools::getValue('SISOW_LOGOS'));
			Configuration::updateValue('SISOW_PAYMENTERRORFIX', Tools::getValue('SISOW_PAYMENTERRORFIX'));
			
			foreach($this->paymentMethods as $method)
			{
				Configuration::updateValue('SISOW_PAYMENTMETHODS_' . $method['id'], Tools::getValue('SISOW_PAYMENTMETHODS_' . $method['id']));
				
				Configuration::updateValue('SISOW_SORTORDER_' . $method['id'], Tools::getValue('SISOW_SORTORDER_' . $method['id']));
				
				if($method['id'] != 'focum' && $method['id'] != 'spraypay')
					Configuration::updateValue('SISOW_TESTMODE_' . $method['id'], Tools::getValue('SISOW_TESTMODE_' . $method['id']));
				
				if($method['id'] == 'overboeking')
				{
					Configuration::updateValue('SISOW_DAYS_' . $method['id'], Tools::getValue('SISOW_DAYS_' . $method['id']));
					Configuration::updateValue('SISOW_INCLUDE_' . $method['id'], Tools::getValue('SISOW_INCLUDE_' . $method['id']));
				}
				
				if($method['id'] == 'afterpay' || $method['id'] == 'capayable')
					Configuration::updateValue('SISOW_USEB2B_' . $method['id'], Tools::getValue('SISOW_USEB2B_' . $method['id']));
				
				foreach(Country::getCountries($this->context->cookie->id_lang, true) as $country)
				{
					Configuration::updateValue('SISOW_COUNTRY_' . $method['id'] . '_' . $country['id_country'], Tools::getValue('SISOW_COUNTRY_' . $method['id'] . '_' . $country['id_country']));
				}
			}
        }
        $this->_html .= $this->displayConfirmation($this->l('Settings updated'));
    }
	
	public function getContent()
    {
        $this->_html = '';
		
        if (Tools::isSubmit('btnSubmit')) {
            $this->_postValidation();
            if (!count($this->_postErrors)) {
                $this->_postProcess();
            } else {
                foreach ($this->_postErrors as $err) {
                    $this->_html .= $this->displayError($err);
                }
            }
        }

		// Generate the Form
		$fields_form[0] = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Sisow General Settings'),
                    'icon' => 'icon-cog'
                ),
                'input' => array(
                    array(
                        'type' => 'text',
                        'label' => $this->l('Merchant ID'),
                        'name' => 'SISOW_MERCHANTID',
                        'required' => true
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Merchant Key'),
                        'name' => 'SISOW_MERCHANTKEY',
                        'required' => true
                    ),
					array(
                        'type' => 'text',
                        'label' => $this->l('Shop ID'),
                        'name' => 'SISOW_SHOPID',
                        'required' => false
                    ),
					array(
                        'type' => 'text',
                        'label' => $this->l('Description'),
                        'name' => 'SISOW_DESCRIPTION',
                        'required' => false
                    ),
					array(
						'type'      => 'radio',                               // This is an <input type="checkbox"> tag.
						'label'     => $this->l('Update Purchase ID'),        // The <label> for this <input> tag.
						'desc'      => $this->l('Update Purchase ID after payment complete to order ID'),   // A help text, displayed right next to the <input> tag.
						'name'      => 'SISOW_UPDATEPURCHASEID',                              // The content of the 'id' attribute of the <input> tag.
						'required'  => false,                                  // If set to true, this option must be set.
						'class'     => 't',                                   // The content of the 'class' attribute of the <label> tag for the <input> tag.
						'is_bool'   => true,                                  // If set to true, this means you want to display a yes/no or true/false option.
																				// The CSS styling will therefore use green mark for the option value '1', and a red mark for value '2'.
																				// If set to false, this means there can be more than two radio buttons,
																				// and the option label text will be displayed instead of marks.
						'values'    => array(                                 // $values contains the data itself.
							array(
								'id'    => 'active_on',                           // The content of the 'id' attribute of the <input> tag, and of the 'for' attribute for the <label> tag.
								'value' => 1,                                     // The content of the 'value' attribute of the <input> tag.   
								'label' => $this->l('Enabled')                    // The <label> for this radio button.
								),
							array(
								'id'    => 'active_off',
								'value' => 0,
								'label' => $this->l('Disabled')
								)
						),
                    ),
					array(
					  'type'      => 'radio',                               // This is an <input type="checkbox"> tag.
					  'label'     => $this->l('Logo\'s'),        // The <label> for this <input> tag.
					  'desc'      => $this->l('Display payment logo\'s in checkout?'),   // A help text, displayed right next to the <input> tag.
					  'name'      => 'SISOW_LOGOS',                              // The content of the 'id' attribute of the <input> tag.
					  'required'  => false,                                  // If set to true, this option must be set.
					  'class'     => 't',                                   // The content of the 'class' attribute of the <label> tag for the <input> tag.
					  'is_bool'   => true,                                  // If set to true, this means you want to display a yes/no or true/false option.
																			// The CSS styling will therefore use green mark for the option value '1', and a red mark for value '2'.
																			// If set to false, this means there can be more than two radio buttons,
																			// and the option label text will be displayed instead of marks.
					  'values'    => array(                                 // $values contains the data itself.
						array(
						  'id'    => 'active_on',                           // The content of the 'id' attribute of the <input> tag, and of the 'for' attribute for the <label> tag.
						  'value' => 1,                                     // The content of the 'value' attribute of the <input> tag.   
						  'label' => $this->l('Enabled')                    // The <label> for this radio button.
						),
						array(
						  'id'    => 'active_off',
						  'value' => 0,
						  'label' => $this->l('Disabled')
						)
					  ),
					),
					array(
					  'type'      => 'radio',                               // This is an <input type="checkbox"> tag.
					  'label'     => $this->l('Enable Payment Error fix'),        // The <label> for this <input> tag.
					  'desc'      => $this->l('Activate when receiving payment error as order status?'),   // A help text, displayed right next to the <input> tag.
					  'name'      => 'SISOW_PAYMENTERRORFIX',                              // The content of the 'id' attribute of the <input> tag.
					  'required'  => false,                                  // If set to true, this option must be set.
					  'class'     => 't',                                   // The content of the 'class' attribute of the <label> tag for the <input> tag.
					  'is_bool'   => true,                                  // If set to true, this means you want to display a yes/no or true/false option.
																			// The CSS styling will therefore use green mark for the option value '1', and a red mark for value '2'.
																			// If set to false, this means there can be more than two radio buttons,
																			// and the option label text will be displayed instead of marks.
					  'values'    => array(                                 // $values contains the data itself.
						array(
						  'id'    => 'active_on',                           // The content of the 'id' attribute of the <input> tag, and of the 'for' attribute for the <label> tag.
						  'value' => 1,                                     // The content of the 'value' attribute of the <input> tag.   
						  'label' => $this->l('Enabled')                    // The <label> for this radio button.
						),
						array(
						  'id'    => 'active_off',
						  'value' => 0,
						  'label' => $this->l('Disabled')
						)
					  ),
					)
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                )
            ),
        );
		
		$fields_form[1] = array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Sisow Payment Methods'),
                    'icon' => 'icon-sliders'
                ),
                'input' => array(
                    array(
                        'type' => 'checkbox',
                        'label' => $this->l('Enabled Payment Methods'),
                        'name' => 'SISOW_PAYMENTMETHODS',
                        'required' => true,
						'multiple' => true,
						'values' => array(
							'query' => $this->paymentMethods,
							'id'    => 'id', 
							'name'  => 'name'
						)
                    )
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                )
            ),
        );
		
		$field_values = array(
								'SISOW_MERCHANTID' => Tools::getValue('SISOW_MERCHANTID', Configuration::get('SISOW_MERCHANTID')),
								'SISOW_MERCHANTKEY' => Tools::getValue('SISOW_MERCHANTKEY', Configuration::get('SISOW_MERCHANTKEY')),
								'SISOW_SHOPID' => Tools::getValue('SISOW_SHOPID', Configuration::get('SISOW_SHOPID')),
								'SISOW_DESCRIPTION' => Tools::getValue('SISOW_DESCRIPTION', Configuration::get('SISOW_DESCRIPTION')),
								'SISOW_UPDATEPURCHASEID' => Tools::getValue('SISOW_UPDATEPURCHASEID', Configuration::get('SISOW_UPDATEPURCHASEID')),
								'SISOW_LOGOS' => Tools::getValue('SISOW_LOGOS', Configuration::get('SISOW_LOGOS')),
								'SISOW_PAYMENTERRORFIX' => Tools::getValue('SISOW_PAYMENTERRORFIX', Configuration::get('SISOW_PAYMENTERRORFIX'))
								);
						
		$field_form_nr = 2;
		foreach($this->paymentMethods as $method)
		{
			$method_on = Tools::getValue('SISOW_PAYMENTMETHODS_' . $method['id'], Configuration::get('SISOW_PAYMENTMETHODS_' . $method['id']));
			$field_values['SISOW_PAYMENTMETHODS_' . $method['id']] = $method_on;
			
			if($method_on == 'on')
			{
				$input = array();
				
				$input[] = array(
						'type' => 'text',
                        'label' => $this->l('Sort Order'),
                        'name' => 'SISOW_SORTORDER_' . $method['id']
					);
				
				if($method['id'] != 'focum' && $method['id'] != 'spraypay')
				{
					$input[] = array(
								'type' => 'radio',
								'label' => $this->l('Test Mode'),
								'name' => 'SISOW_TESTMODE_' . $method['id'],
								'required' => false,
								'is_bool'   => true,                                  // If set to true, this means you want to display a yes/no or true/false option.
																						// The CSS styling will therefore use green mark for the option value '1', and a red mark for value '2'.
																						// If set to false, this means there can be more than two radio buttons,
																						// and the option label text will be displayed instead of marks.
								  'values'    => array(                                 // $values contains the data itself.
									array(
									  'id'    => 'active_on',                           // The content of the 'id' attribute of the <input> tag, and of the 'for' attribute for the <label> tag.
									  'value' => 1,                                     // The content of the 'value' attribute of the <input> tag.   
									  'label' => $this->l('Enabled')                    // The <label> for this radio button.
									),
									array(
									  'id'    => 'active_off',
									  'value' => 0,
									  'label' => $this->l('Disabled')
									)
								)
							);
							
					$field_values['SISOW_TESTMODE_' . $method['id']] = Tools::getValue('SISOW_TESTMODE_' . $method['id'], Configuration::get('SISOW_TESTMODE_' . $method['id']));
				}
				
				if($method['id'] == 'overboeking')
				{
					$input[] = array(
						'type' => 'text',
                        'label' => $this->l('Days valid'),
                        'name' => 'SISOW_DAYS_' . $method['id']
					);
					
					$input[] = array(
						'type' => 'radio',
                        'label' => $this->l('Include paylink'),
                        'name' => 'SISOW_INCLUDE_' . $method['id'],
						'is_bool'   => true,                                  // If set to true, this means you want to display a yes/no or true/false option.
																			// The CSS styling will therefore use green mark for the option value '1', and a red mark for value '2'.
																			// If set to false, this means there can be more than two radio buttons,
																			// and the option label text will be displayed instead of marks.
						'values'    => array(                                 // $values contains the data itself.
							array(
								'id'    => 'active_on',                           // The content of the 'id' attribute of the <input> tag, and of the 'for' attribute for the <label> tag.
								'value' => 1,                                     // The content of the 'value' attribute of the <input> tag.   
								'label' => $this->l('Yes')                    // The <label> for this radio button.
							),
							array(
								'id'    => 'active_off',
								'value' => 0,
								'label' => $this->l('No')
							)
						)
					);
					
					$field_values['SISOW_DAYS_' . $method['id']] = Tools::getValue('SISOW_DAYS_' . $method['id'], Configuration::get('SISOW_DAYS_' . $method['id']));
					$field_values['SISOW_INCLUDE_' . $method['id']] = Tools::getValue('SISOW_INCLUDE_' . $method['id'], Configuration::get('SISOW_INCLUDE_' . $method['id']));
				}
				
				if($method['id'] == 'afterpay' || $method['id'] == 'capayable')
				{					
					$input[] = array(
						'type' => 'radio',
                        'label' => $this->l('Use B2B'),
                        'name' => 'SISOW_USEB2B_' . $method['id'],
						'is_bool'   => true,                                  // If set to true, this means you want to display a yes/no or true/false option.
																			// The CSS styling will therefore use green mark for the option value '1', and a red mark for value '2'.
																			// If set to false, this means there can be more than two radio buttons,
																			// and the option label text will be displayed instead of marks.
						'values'    => array(                                 // $values contains the data itself.
							array(
								'id'    => 'active_on',                           // The content of the 'id' attribute of the <input> tag, and of the 'for' attribute for the <label> tag.
								'value' => 1,                                     // The content of the 'value' attribute of the <input> tag.   
								'label' => $this->l('Yes')                    // The <label> for this radio button.
							),
							array(
								'id'    => 'active_off',
								'value' => 0,
								'label' => $this->l('No')
							)
						)
					);
					
					$field_values['SISOW_USEB2B_' . $method['id']] = Tools::getValue('SISOW_USEB2B_' . $method['id'], Configuration::get('SISOW_USEB2B_' . $method['id']));
				}
				
				$input[] = array(
                        'type' => 'checkbox',
                        'label' => $this->l('Enabled in country'),
                        'name' => 'SISOW_COUNTRY_' . $method['id'],
                        'required' => false,
						'multiple' => true,
						'values' => array(
							'query' => Country::getCountries($this->context->cookie->id_lang, true),
							'id'    => 'id_country', 
							'name'  => 'country'
						)
                );
				
				// Generate the Form
				$fields_form[$field_form_nr] = array(
					'form' => array(
						'legend' => array(
							'title' => $method['name'] . ' Settings',
							'icon' => 'icon-cog'
						),
						'input' => $input,
						'submit' => array(
							'title' => $this->l('Save'),
						)
					),
				);
				
				$field_values['SISOW_SORTORDER_' . $method['id']] = Tools::getValue('SISOW_SORTORDER_' . $method['id'], Configuration::get('SISOW_SORTORDER_' . $method['id']));
				
				
				foreach(Country::getCountries($this->context->cookie->id_lang, true) as $country)
					$field_values['SISOW_COUNTRY_' . $method['id'] . '_' . $country['id_country']] = Tools::getValue('SISOW_COUNTRY_' . $method['id'] . '_' . $country['id_country'], Configuration::get('SISOW_COUNTRY_' . $method['id'] . '_' . $country['id_country']));
				
				
				$field_form_nr++;
			}
		}

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->id = (int)Tools::getValue('id_carrier');
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'btnSubmit';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false).'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = array(
            'fields_value' => $field_values,
        );

        $this->fields_form = array();

        $this->_html .= $helper->generateForm($fields_form);
		
		

        return $this->_html;
    }
	
	public function hookPaymentOptions($params)
    {		
        if (!$this->active) {
            return;
        }

        // Check if cart has product download
        //if ($this->hasProductDownload($params['cart'])) {
        //    return;
        //}
		
		$countries = Country::getCountries($this->context->cookie->id_lang, true);	
		
		$payment_options = array();
		
		foreach($this->paymentMethods as $method)
		{
			$methodOn = Configuration::get('SISOW_PAYMENTMETHODS_' . $method['id']);
			if($methodOn != 'on')	
				continue;
			
			// validate country
			$countryAllowed = false;
			$anyCountryOn = false;
		
			foreach($countries as $country)
			{
				$countryOn = Configuration::get('SISOW_COUNTRY_' . $method['id'] . '_' . $country['id_country']);
				
				if($countryOn == 'on'){
					$anyCountryOn = true;
					
					if($this->context->cart->id_address_invoice > 0){
						$billingAddress = new Address($this->context->cart->id_address_invoice);
						$countryAllowed = $billingAddress->id_country == $country['id_country'];
						
						if($countryAllowed)
							break;
					}
				}
			}
			
			if($anyCountryOn && !$countryAllowed)
				continue;
			
			$newOption = new PaymentOption();
			
			if((bool)Configuration::get('SISOW_LOGOS')){
				if($method['id'] == 'klarna')
					$newOption->setLogo( 'https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg');
				else
					$newOption->setLogo( _MODULE_DIR_ . 'sisow/images/logo/' . $method['id'] . '.png');
			}
			
			switch($method['id'])
			{
				case 'ideal':
					$newOption->setCallToActionText($method['name'])
					->setForm($this->generateIdealForm());
					break;
				case 'giropay':
					$newOption->setCallToActionText($method['name'])
					->setForm($this->generateGiropayForm());
					break;
				case 'eps':
					$newOption->setCallToActionText($method['name'])
					->setForm($this->generateEpsForm());
					break;
				case 'focum':
					$newOption->setCallToActionText($method['name'])
					->setForm($this->generateFocumForm());
					break;
				case 'afterpay':
					$newOption->setCallToActionText($method['name'])
					->setForm($this->generateAfterpayForm());
					break;
				case 'billink':
					$newOption->setCallToActionText($method['name'])
					->setForm($this->generateBillinkForm());
					break;
				case 'capayable':
					$newOption->setCallToActionText($method['name'])
					->setForm($this->generateCapayableForm());
					break;
				default:
					$newOption->setCallToActionText($method['name'])
					->setAction($this->context->link->getModuleLink($this->name, 'payment', array('payment' => $method['id']), true));
					break;
			}			
			$payment_options[] = $newOption;
		}
		
        return $payment_options;
    }

	public function processNotify($cartId, $trxId, $carrier)
	{
		$merchantid = Configuration::get('SISOW_MERCHANTID');
		$merchantkey = Configuration::get('SISOW_MERCHANTKEY');
		$shopid = Configuration::get('SISOW_SHOPID');
		$payment = Tools::getValue('payment');
		
		$paymentName;
		
		foreach($this->paymentMethods as $k => $v)
		{
			if($v['id'] == $payment)
			{
				$paymentName = $v['name'];
				break;
			}
		}
		
		$sisow = new SisowApi($merchantid, $merchantkey, $shopid);
		if(!$sisow->StatusRequest($trxId))
		{
			exit('Transaction ID failed');
		}
		
		if($payment == 'overboeking')
		{
			if($sisow->status == 'Success' || $sisow->status == 'Paid' || $sisow->status == 'Reservation')
			{
				$orderId = Order::getOrderByCartId($cartId);
			
				$history = new OrderHistory();
				$history->id_order = (int)$orderId;
				$history->changeIdOrderState((int)Configuration::get('PS_OS_PAYMENT'), $orderId, true);
				$history->addWithemail();
			}
		}
		else
		{
			if($sisow->status == 'Success' || $sisow->status == 'Paid' || $sisow->status == 'Reservation')
			{
				$cart = new Cart($cartId);
				
				if ($cart->id_customer == 0 || $cart->id_address_delivery == 0 || $cart->id_address_invoice == 0 || !$this->active){
					exit('can\'t load cart');
				}
				
				$amountPaid = (bool)Configuration::get('SISOW_PAYMENTERRORFIX') ? $cart->getOrderTotal(true, Cart::BOTH) : $sisow->amount;
				
				$this->validateOrder(
					$cart->id, 
					Configuration::get('PS_OS_PAYMENT'), 
					$amountPaid, 
					$paymentName, 
					null, 
					array('transaction_id' => $trxId),
					null, 
					false, 
					$cart->secure_key);
					
				if((bool)Configuration::get('SISOW_UPDATEPURCHASEID')){
					$sisow->AdjustPurchaseId($trxId, $cart->id, $this->currentOrder);
				}
				
				exit('Notify Ok!');
			}	
		}
		
		exit('Notify Ok!');
	}

	protected function generateIdealForm()
	{
		// Init Sisow API
		$merchantid = Configuration::get('SISOW_MERCHANTID');
		$merchantkey = Configuration::get('SISOW_MERCHANTKEY');
		$shopid = Configuration::get('SISOW_SHOPID');
		
		$testMode = Configuration::get('SISOW_TESTMODE_ideal');
		
		$sisow = new SisowApi($merchantid, $merchantkey, $shopid);
		$issuers = $sisow->DirectoryRequest((bool)$testMode) ? $sisow->issuers : array();
				
        $this->context->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array('payment' => 'ideal'), true),
			'issuers' => $issuers
        ]);
        
		return $this->context->smarty->fetch('module:sisow/views/templates/front/ideal.tpl');
	}
	
	public function generateGiropayForm()
	{
		$this->context->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array('payment' => 'giropay'), true)
        ]);
        
		return $this->context->smarty->fetch('module:sisow/views/templates/front/giropay.tpl');
	}
	
	public function generateEpsForm()
	{
		$this->context->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array('payment' => 'eps'), true)
        ]);
        
		return $this->context->smarty->fetch('module:sisow/views/templates/front/eps.tpl');
	}
	
	public function generateFocumForm()
	{
		$this->context->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array('payment' => 'focum'), true)
        ]);
        
		return $this->context->smarty->fetch('module:sisow/views/templates/front/focum.tpl');
	}
	
	public function generateAfterpayForm()
	{	
		$billingAddress = new Address($this->context->cart->id_address_invoice);
		$billingCountry = new Country($billingAddress->id_country);
		
		$useB2b = !empty($billingAddress->company) && $billingCountry->iso_code == 'NL' && (bool)Configuration::get('SISOW_USEB2B_afterpay');	
		
		if($billingCountry->iso_code == 'BE')
			$terms = 'https://www.afterpay.be/be/footer/betalen-met-afterpay/betalingsvoorwaarden';
		else if($useB2b)
			$terms = 'https://www.afterpay.nl/nl/algemeen/zakelijke-partners/betalingsvoorwaarden-zakelijk';
		else
			$terms = 'https://www.afterpay.nl/nl/algemeen/betalen-met-afterpay/betalingsvoorwaarden';
				
		$this->context->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array('payment' => 'afterpay'), true),
			'terms' => $terms,
			'useb2b' => $useB2b
        ]);
        
		return $this->context->smarty->fetch('module:sisow/views/templates/front/afterpay.tpl');
	}
	
	public function generateBillinkForm()
	{	
		$this->context->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array('payment' => 'billink'), true)
        ]);
        
		return $this->context->smarty->fetch('module:sisow/views/templates/front/billink.tpl');
	}
	
	public function generateCapayableForm()
	{	
		$useB2b = (bool)Configuration::get('SISOW_USEB2B_capayable');	
		
		$this->context->smarty->assign([
            'action' => $this->context->link->getModuleLink($this->name, 'payment', array('payment' => 'capayable'), true)
        ]);
        
		if($useB2b)
			return $this->context->smarty->fetch('module:sisow/views/templates/front/capayableb2b.tpl');
		else
			return $this->context->smarty->fetch('module:sisow/views/templates/front/capayable.tpl');
	}
}
?>