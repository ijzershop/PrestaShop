<?php
class SisowPaymentModuleFrontController extends ModuleFrontController
{
    public $ssl = true;
    public $display_column_left = false;

    public function postProcess()
    {
		$payment = Tools::getValue('payment');
		
		// Validate Cart
        if ($this->context->cart->id_customer == 0 || $this->context->cart->id_address_delivery == 0 || $this->context->cart->id_address_invoice == 0 || !$this->module->active) {
            Tools::redirectLink(__PS_BASE_URI__.'order.php?step=1');
        }

		// Validate Customer
        $customer = new Customer($this->context->cart->id_customer);
        if (!Validate::isLoadedObject($customer)) {
            Tools::redirectLink(__PS_BASE_URI__.'order.php?step=1');
        }
		
		// Init Sisow API
		$merchantid = Configuration::get('SISOW_MERCHANTID');
		$merchantkey = Configuration::get('SISOW_MERCHANTKEY');
		$shopid = Configuration::get('SISOW_SHOPID');
		$sisow = new SisowApi($merchantid, $merchantkey, $shopid);
				
		$phone = Tools::getValue($payment . '_phone');
		// Add Shipping Address
		$shippingAddress = new Address($this->context->cart->id_address_delivery);
		$shippingCountry = new Country($shippingAddress->id_country);
		$sisow->AddShippingAddress($shippingAddress->firstname, $shippingAddress->lastname, $customer->email, $shippingAddress->company, $shippingAddress->address1, $shippingAddress->address2, $shippingAddress->postcode, $shippingAddress->city, $shippingCountry->iso_code, empty($phone) ? $shippingAddress->phone : $phone);
		
		// Add Billing Address		
		$billingAddress = new Address($this->context->cart->id_address_invoice);
		$billingCountry = new Country($billingAddress->id_country);
		$sisow->AddBillingAddress($billingAddress->firstname, $billingAddress->lastname, $customer->email, $billingAddress->company, $billingAddress->address1, $billingAddress->address2, $billingAddress->postcode, $billingAddress->city, $billingCountry->iso_code, empty($phone) ? $billingAddress->phone : $phone);
		
		// Set Locale
		$language = new Language( (int)$this->context->cookie->__get('id_lang'));
		$sisow->AddLocale($language->iso_code);
		
		// Add Products
		$orderProducts = $this->context->cart->getProducts();
		
		foreach($orderProducts as $orderProduct)
		{			
			$taxAmount = $orderProduct['total_wt'] - $orderProduct['total'];
			$productType = $orderProduct['is_virtual'] ? 'digital' : 'physical';
			$sisow->AddProduct($orderProduct['reference'], $orderProduct['name'], $orderProduct['cart_quantity'], $orderProduct['price'], $orderProduct['total_wt'], $orderProduct['total'], $taxAmount, $orderProduct['rate'], $productType);
		}

		// Add Shipping Cost
		$carrier = new Carrier($this->context->cart->id_carrier, $this->context->cart->id_lang);
		$shippingCost = $this->context->cart->getPackageShippingCost();
		$shippingCostExTax = $this->context->cart->getPackageShippingCost(null, false);
		if($shippingCost > 0){
			$taxAmount = $shippingCost - $shippingCostExTax;
			$taxRate = round((100.0 * $shippingCost) / $shippingCostExTax) - 100;
			$sisow->AddProduct('shipping', $carrier->name, 1, $shippingCostExTax, $shippingCost, $shippingCostExTax, $taxAmount, $taxRate, 'shipping_fee');
		}
		
		// Add discounts
		foreach($this->context->cart->getCartRules() as $rule)
		{			
		
			$sisow->AddProduct(
				$rule['code'], 
				$rule['description'], 
				1, 
				$rule['value_tax_exc'] * -1, 
				$rule['value_real'] * -1, 
				$rule['value_tax_exc'] * -1, 
				($rule['value_real'] - $rule['value_tax_exc']) * -1, 
				round(($rule['value_real'] * 100) / $rule['value_tax_exc']) - 100,
				'discount'
				);
		}
		
		if($payment == 'ideal')
		{
			$issuer = Tools::getValue('sisow-issuer');
			if(!empty($issuer))
				$sisow->AddIssuer($issuer);
		}
		else if($payment == 'giropay' || $payment == 'eps')
		{
			$bic = Tools::getValue('giropay_bic');
			if(empty($bic))
				$bic = Tools::getValue('eps_bic');
			
			if(!empty($bic))
				$sisow->AddBic($bic);
		}
		else if($payment == 'focum')
		{
			$gender = Tools::getValue('focum_gender');
			$iban = Tools::getValue('focum_iban');
			$day = Tools::getValue('focum_day');
			$month = Tools::getValue('focum_month');
			$year = Tools::getValue('focum_year');
			
			$sisow->AddGender($gender);
			$sisow->AddBirthdate($day . $month . $year);
			$sisow->AddIban($iban);
		}
		else if($payment == 'afterpay')
		{
			$gender = Tools::getValue('afterpay_gender');
			$coc = Tools::getValue('afterpay_coc');
			$day = Tools::getValue('afterpay_day');
			$month = Tools::getValue('afterpay_month');
			$year = Tools::getValue('afterpay_year');
			
			$terms = Tools::getValue('afterpay_terms');
			
			if($terms != 'true')
			{
				$this->errors[] = 'U dient akkoord te gaan met de betalingsvoorwaarden van Afterpay';
			
				$this->redirectWithNotifications(_PS_BASE_URL_ . __PS_BASE_URI__ . 'index.php?controller=order');
				exit;
			}
			
			$sisow->AddGender($gender);
			$sisow->AddBirthdate($day . $month . $year);
			$sisow->AddCoc($coc);
		}
		else if($payment == 'billink')
		{
			$gender = Tools::getValue('billink_gender');
			$coc = Tools::getValue('billink_coc');
			$day = Tools::getValue('billink_day');
			$month = Tools::getValue('billink_month');
			$year = Tools::getValue('billink_year');
			
			$sisow->AddGender($gender);
			$sisow->AddBirthdate($day . $month . $year);
			$sisow->AddCoc($coc);
		}
		else if($payment == 'capayable')
		{
			$gender = Tools::getValue('capayable_gender');
			$coc = Tools::getValue('capayable_coc');
			$day = Tools::getValue('capayable_day');
			$month = Tools::getValue('capayable_month');
			$year = Tools::getValue('capayable_year');
			
			$sisow->AddGender($gender);
			$sisow->AddBirthdate($day . $month . $year);
			$sisow->AddCoc($coc);
		}
		else if($payment == 'overboeking')
		{
			$including = (bool)Configuration::get('SISOW_INCLUDE_' . $payment);
			$days = Configuration::get('SISOW_DAYS_' . $payment);
			
			if($including)
				$sisow->SetIncluding();
			
			if(!empty($days) && $days > 0)
				$sisow->AddDays($days);
		}
				
		// Start Payment
		$payment = $payment;
		$total = $this->context->cart->getOrderTotal(true, Cart::BOTH);
		$currency = new Currency($this->context->cart->id_currency);
		$testmode = Configuration::get('SISOW_TESTMODE_' . $payment);
		$description = Configuration::get('SISOW_DESCRIPTION');
		
		// Description empty? use shopname with orderID
		if(empty($description))
			$description = Configuration::get('PS_SHOP_NAME') . ' ' . $this->context->cart->id;
		
		$returnUrl = $this->context->link->getModuleLink($this->module->name, 'return', array(), true);
		$cancelUrl = $returnUrl;
		$notifyUrl = $this->context->link->getModuleLink($this->module->name, 'notify', array('payment' => $payment, 'carrier' => $this->context->cart->id_carrier), true);
		$callbackUrl = $notifyUrl;
		$entranceCode = $this->context->cart->id;
		
		/* begin */
		if (Module::isEnabled('bestkit_paymentfee')) {
			require_once _PS_MODULE_DIR_ . 'bestkit_paymentfee/includer.php';
			$p_fee = BestkitPaymentfee::getRowByModuleName($paymentname);

			if (isset($p_fee['id_bestkit_paymentfee'])) {
			$total = $total * $p_fee['value_percent'] + $p_fee['value_amount'];
			}
		}
		/* end */

		if(!$sisow->TransactionRequest($payment, $this->context->cart->id, $total, $currency->iso_code, (bool)$testmode, $description, $returnUrl, $cancelUrl, $notifyUrl, $callbackUrl, $entranceCode))
		{
			if($payment == 'afterpay')
				$this->errors[] = 'Het spijt ons u te moeten mededelen dat uw aanvraag om uw bestelling achteraf te betalen op dit moment niet door AfterPay wordt geaccepteerd. Dit kan om diverse (tijdelijke) redenen zijn.Voor vragen over uw afwijzing kunt u contact opnemen met de Klantenservice van AfterPay. Of kijk op de website van AfterPay bij “Veel gestelde vragen” via de link http://www.afterpay.nl/page/consument-faq onder het kopje “Gegevenscontrole”. Wij adviseren u voor een andere betaalmethode te kiezen om alsnog de betaling van uw bestelling af te ronden.';
			else
				$this->errors[] = 'Er is een fout opgetreden tijdens het starten van de betaling. (' . $sisow->errorCode . ')<br/>';
			
			$this->redirectWithNotifications(_PS_BASE_URL_ . __PS_BASE_URI__ . 'index.php?controller=order');
			exit;
		}
		
		if($payment == 'focum')
		{
			$this->module->validateOrder((int)$this->context->cart->id, Configuration::get('PS_OS_PAYMENT'), $total, 'Focum', null, array('transaction_id' => $sisow->trxId), (int)$currency->id, false, $customer->secure_key);
			Tools::redirect('index.php?controller=order-confirmation&id_cart='.(int)$this->context->cart->id.'&id_module='.(int)$this->module->id.'&id_order='.$this->module->currentOrder.'&key='.$customer->secure_key);
		}
		else if($payment == 'afterpay')
		{
			$this->module->validateOrder((int)$this->context->cart->id, Configuration::get('PS_OS_PAYMENT'), $total, 'Afterpay', null, array('transaction_id' => $sisow->trxId), (int)$currency->id, false, $customer->secure_key);
			Tools::redirect('index.php?controller=order-confirmation&id_cart='.(int)$this->context->cart->id.'&id_module='.(int)$this->module->id.'&id_order='.$this->module->currentOrder.'&key='.$customer->secure_key);
		}
		else if($payment == 'billink')
		{
			$this->module->validateOrder((int)$this->context->cart->id, Configuration::get('PS_OS_PAYMENT'), $total, 'Billink', null, array('transaction_id' => $sisow->trxId), (int)$currency->id, false, $customer->secure_key);
			Tools::redirect('index.php?controller=order-confirmation&id_cart='.(int)$this->context->cart->id.'&id_module='.(int)$this->module->id.'&id_order='.$this->module->currentOrder.'&key='.$customer->secure_key);
		}
		else if($payment == 'overboeking')
		{
			$this->module->validateOrder($this->context->cart->id, Configuration::get('PS_OS_BANKWIRE'), $total, 'Overboeking', NULL, array('transaction_id' => $sisow->trxId), (int)$currency->id, false, $customer->secure_key);
			Tools::redirect('index.php?controller=order-confirmation&id_cart='.$this->context->cart->id.'&id_module='.$this->module->id.'&id_order='.$this->module->currentOrder.'&key='.$customer->secure_key);
		}
		else
			Tools::redirectLink($sisow->issuerUrl);
    }
}