<?php
class SisowApi
{
	private $merchantId;
	private $merchantKey;
	private $shopId;
	private $arg;
	
	private $sisowResponse;
	
	// DirectoryRequest response values
	public $issuers;
	
	// TransactionRequest response values
	public $trxId;
	public $issuerUrl;
	public $invoiceNo;
	public $documentId;
	public $documentUrl;
	
	// StatusRequest response values
	public $status;
	public $amount;
	public $currency;
	public $purchaseId;
	public $description;
	public $entranceCode;
	public $timestamp;
	public $consumerName;
	public $consumerAccount;
	
	// StatusRequest response values
	public $refundId;
	
	// Errors
	public $errorCode;
	public $errorMessage;
	
	function __construct($merchantId, $merchantKey, $shopId)
	{
		$this->merchantId = $merchantId;
		$this->merchantKey = $merchantKey;
		$this->shopId = $shopId;
		
		$this->arg = array();
	}
	
	function AddShippingAddress($firstname, $lastname, $mail, $company, $address1, $address2, $zip, $city, $countrycode, $phone)
	{
		$this->arg['shipping_firstname'] = $firstname;
		$this->arg['shipping_lastname'] = $lastname;
		$this->arg['shipping_mail'] = $mail;
		$this->arg['shipping_company'] = $company;
		$this->arg['shipping_address1'] = $address1;
		$this->arg['shipping_address2'] = $address2;
		$this->arg['shipping_zip'] = $zip;
		$this->arg['shipping_city'] = $city;
		$this->arg['shipping_countrycode'] = $countrycode;
		$this->arg['shipping_phone'] = $phone;
	}
	
	function AddBillingAddress($firstname, $lastname, $mail, $company, $address1, $address2, $zip, $city, $countrycode, $phone)
	{
		$this->arg['billing_firstname'] = $firstname;
		$this->arg['billing_lastname'] = $lastname;
		$this->arg['billing_mail'] = $mail;
		$this->arg['billing_company'] = $company;
		$this->arg['billing_address1'] = $address1;
		$this->arg['billing_address2'] = $address2;
		$this->arg['billing_zip'] = $zip;
		$this->arg['billing_city'] = $city;
		$this->arg['billing_countrycode'] = $countrycode;
		$this->arg['billing_phone'] = $phone;
	}
	
	function AddProduct($sku, $name, $quantity, $netprice, $total, $nettotal, $tax, $taxrate, $type = 'physical')
	{
		$product_nr = 1;

		while(array_key_exists('product_id_' . $product_nr, $this->arg)){
			$product_nr++;;
		}
		
		$this->arg['product_id_' . $product_nr] = $sku;
		$this->arg['product_description_' . $product_nr] = $name;
		$this->arg['product_quantity_' . $product_nr] = $quantity;
		$this->arg['product_netprice_' . $product_nr] = round($netprice * 100.0, 0);
		$this->arg['product_total_' . $product_nr] = round($total * 100.0, 0);
		$this->arg['product_nettotal_' . $product_nr] = round($nettotal * 100.0, 0);
		$this->arg['product_tax_' . $product_nr] = round($tax * 100.0, 0);
		$this->arg['product_taxrate_' . $product_nr] = round($taxrate * 100.0, 0);
		$this->arg['product_type_' . $product_nr] = $type;
	}
	
	function AddIssuer($issuerId)
	{
		$this->arg['issuerid'] = $issuerId;
	}
	
	function AddCoc($coc)
	{
		$this->arg['billing_coc'] = $coc;
	}
	
	function AddGender($gender)
	{
		$this->arg['gender'] = $gender;
	}
	
	function AddBirthdate($dob)
	{
		$this->arg['birthdate'] = $dob;
	}
	
	function AddBic($bic)
	{
		$this->arg['bic'] = $bic;
	}
	
	function AddIban($iban)
	{
		$this->arg['iban'] = $iban;
	}
	
	function SetIncluding()
	{
		$this->arg['including'] = 'true';
	}
	
	function AddDays($days)
	{
		$this->arg['days'] = $days;
	}
	
	function AddLocale($locale)
	{
		$this->arg['locale'] = $locale;
	}
	
	function DirectoryRequest($test = false)
	{
		if($test){
			$this->arg['test'] = 'true';
		}
			
		if(!$this->Send('DirectoryRequest')){
			return false;
		}
		
		$this->issuers = array();
		
		$issuers = $this->Parse('directory');
		$iss = explode("<issuer>", str_replace("</issuer>", "", $issuers));
		
		foreach($iss as $issuer)
		{
			$this->issuers[$this->parse('issuerid', $issuer)] = $this->parse('issuername', $issuer);
		}
		
		return true;
	}
	
	function TransactionRequest($payment, $purchaseid, $amount, $currency, $testmode, $description, $returnUrl, $cancelUrl = '', $notifyUrl = '', $callbackUrl = '', $entranceCode = '')
	{
		$this->arg['merchantid'] = $this->merchantId;
		$this->arg['shopid'] = $this->shopId;
		$this->arg['payment'] = $payment;
		$this->arg['purchaseid'] = $purchaseid;
		$this->arg['currency'] = $currency;
		$this->arg['amount'] = round($amount * 100.0, 0);
		$this->arg['testmode'] = $testmode ? "true" : "false";
		$this->arg['entrancecode'] = empty($entranceCode) ? $purchaseid : $entranceCode;
		$this->arg['description'] = $description;
		$this->arg['returnurl'] = $returnUrl;
		$this->arg['cancelurl'] = $cancelUrl;
		$this->arg['callbackurl'] = $callbackUrl;
		$this->arg['notifyurl'] = $notifyUrl;
		
		$productId = 1;
		$productTotal = 0;
		
		while(array_key_exists('product_total_' . $productId, $this->arg)){
			$productTotal += $this->arg['product_total_' . $productId];
			$productId++;
		}
		
		if($productTotal != $this->arg['amount']){
			$priceDifferent = ($this->amount * 100) - $productTotal;
			
			$this->arg['product_id_' . $i] = 'correctie';
			$this->arg['product_description_' . $i] = 'Correctieregel';
			$this->arg['product_quantity_' . $i] = 1;
			$this->arg['product_weight_' . $i] = 0;
			$this->arg['product_tax_' . $i] = 0;
			$this->arg['product_taxrate_' . $i] = 0;
			$this->arg['product_netprice_' . $i] = $priceDifferent;
			$this->arg['product_nettotal_' . $i] = $priceDifferent;
			$this->arg['product_total_' . $i] = $priceDifferent;
		}
		
		$this->arg['ipaddress'] = $this->GetIpAddress();
		
		$this->arg['sha1'] = sha1($this->arg['purchaseid'] . $this->arg['entrancecode'] . $this->arg['amount'] . $this->shopId . $this->merchantId . $this->merchantKey);
		
		if(!$this->Send('TransactionRequest', true)){
			return false;
		}
		
		$this->issuerUrl = $this->Parse('issuerurl');
		$this->trxId = $this->Parse('trxid');
		$this->invoiceNo = $this->Parse('invoiceno');
		$this->documentId = $this->Parse('documentid');
		$this->documentUrl = $this->Parse('documenturl');
		
		$sha = $this->Parse('sha1');
		
		if($sha != sha1($this->trxId . $this->issuerUrl . $this->merchantId . $this->merchantKey) && $sha != sha1($this->trxId . $this->invoiceNo . $this->documentId . $this->merchantId . $this->merchantKey) && $sha != sha1($this->trxId . $this->documentId . $this->merchantId . $this->merchantKey))
		{
			$this->errorCode = 'INVSHA';
			$this->errorMessage = 'The security value doesn\'t match the calculated';
			return false;
		}
		
		$this->issuerUrl = urldecode($this->issuerUrl);
		return true;
	}
	
	function StatusRequest($trxid)
	{
		$this->arg['trxid'] = $trxid;
		$this->arg['merchantid'] = $this->merchantId;
		$this->arg['shopid'] = $this->shopId;
		$this->arg['sha1'] = sha1($this->arg['trxid'] . $this->shopId . $this->merchantId . $this->merchantKey);
		
		if(!$this->Send('StatusRequest')){
			return false;
		}
		
		$this->trxId = $this->Parse('trxid');
		$this->status = $this->Parse('status');
		$this->amount = $this->Parse('amount');
		$this->currency = $this->Parse('currency');
		$this->purchaseId = $this->Parse('purchaseid');
		$this->description = $this->Parse('description');
		$this->entranceCode = $this->Parse('entrancecode');
		$this->timestamp = $this->Parse('timestamp');
		$this->consumerName = $this->Parse('consumername');
		$this->consumerAccount = $this->Parse('consumeraccount');
		
		$sha = $this->Parse('sha1');
		
		if($sha != sha1($this->trxId . $this->status . $this->amount . $this->purchaseId . $this->entranceCode . $this->consumerAccount . $this->merchantId . $this->merchantKey))
		{
			$this->errorCode = 'INVSHA';
			$this->errorMessage = 'The security value doesn\'t match the calculated';
			return false;
		}
		
		$this->amount = $this->amount / 100.0;
		
		return true;
	}
	
	// AdjustPurchaseId
	public function AdjustPurchaseId($trxid, $old, $new) {
		$this->arg = array();
		$this->arg["merchantid"] = $this->merchantId;
		$this->arg["trxid"] = $trxid;
		$this->arg["old"] = $old;
		$this->arg["new"] = $new;
		$this->arg["sha1"] = sha1($trxid . $old . $new . $this->merchantId . $this->merchantKey);
		if (!$this->Send("AdjustPurchaseId", $this->arg))
			return false;
		$this->purchaseId = $this->Parse("purchaseid");
		if (!$this->purchaseId) {
			return false;
		}
		return true;
	}
	
	function RefundRequest($trxid, $amount = 0)
	{
		$this->arg['trxid'] = $trxid;
		$this->arg['merchantid'] = $this->merchantId;
		
		if($amount > 0){
			$this->arg['amount'] = round($amount * 100.0, 0);
		}
		
		$this->arg['sha1'] = sha1($this->arg['trxid'] . $this->merchantId . $this->merchantKey);
		
		if(!$this->Send('RefundRequest', true)){
			return false;
		}
		
		$this->refundId = $this->Parse('refundid');
		
		$sha = $this->Parse('sha1');
		
		if($sha != sha1($this->refundId . $this->merchantId . $this->merchantKey))
		{
			$this->errorCode = 'INVSHA';
			$this->errorMessage = 'The security value doesn\'t match the calculated';
			return false;
		}
		
		print_r($sisow);
		return true;
	}
	
	private function GetIpAddress()
	{
		// check for shared internet/ISP IP
		if (!empty($_SERVER['HTTP_CLIENT_IP']) && $this->validate_ip($_SERVER['HTTP_CLIENT_IP'])) {
			return $_SERVER['HTTP_CLIENT_IP'];
		}

		// check for IPs passing through proxies
		if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			// check if multiple ips exist in var
			if (strpos($_SERVER['HTTP_X_FORWARDED_FOR'], ',') !== false) {
				$iplist = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
				foreach ($iplist as $ip) {
					if ($this->validate_ip($ip))
						return $ip;
				}
			} else {
				if ($this->validate_ip($_SERVER['HTTP_X_FORWARDED_FOR']))
					return $_SERVER['HTTP_X_FORWARDED_FOR'];
			}
		}
		if (!empty($_SERVER['HTTP_X_FORWARDED']) && $this->validate_ip($_SERVER['HTTP_X_FORWARDED']))
			return $_SERVER['HTTP_X_FORWARDED'];
		if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && $this->validate_ip($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
			return $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
		if (!empty($_SERVER['HTTP_FORWARDED_FOR']) && $this->validate_ip($_SERVER['HTTP_FORWARDED_FOR']))
			return $_SERVER['HTTP_FORWARDED_FOR'];
		if (!empty($_SERVER['HTTP_FORWARDED']) && $this->validate_ip($_SERVER['HTTP_FORWARDED']))
			return $_SERVER['HTTP_FORWARDED'];

		// return unreliable ip since all else failed
		return $_SERVER['REMOTE_ADDR'];
	}
	
	private function Send($endpoint, $httpMethodPost = false)
	{
		if(!function_exists('curl_version')){
			$this->errorCode = 'NOCURL';
			$this->errorMessage = 'cURL not installed on the server';
			return false;
		}
		
		$data = http_build_query($this->arg, '', '&');
		
		$url = 'https://www.sisow.nl/Sisow/iDeal/RestHandler.ashx/' . $endpoint;
		
		// create curl resource
        $ch = curl_init(); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
		curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
		
		if($httpMethodPost){
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		}
		else{
			$url .= '?' . $data;
		}
		
		curl_setopt($ch, CURLOPT_URL, $url); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
		
		$this->sisowResponse = curl_exec($ch);
		curl_close($ch);
		
		if(empty($this->sisowResponse)){
			$this->errorCode = 'NOCONN';
			$this->errorMessage = 'Can\'t connect to the Sisow server, please check your firewall settings';
			return false;
		}
		else{
			return !$this->HasError();
		}
	}
	
	private function HasError()
	{
		$this->errorCode = $this->Parse('errorcode');
		$this->errorMessage = $this->Parse('errormessage');
		return !empty($this->errorCode) || !empty($this->errorMessage);
	}
	
	private function Parse($search, $xml = false)
	{
		if(!$xml)
			$xml = $this->sisowResponse;
		
		if (($start = strpos($xml, "<" . $search . ">")) === false) {
			return false;
		}
		$start += strlen($search) + 2;
		if (($end = strpos($xml, "</" . $search . ">", $start)) === false) {
			return false;
		}
		return substr($xml, $start, $end - $start);
	}
	
	/**
	 * Ensures an ip address is both a valid IP and does not fall within
	 * a private network range.
	 */
	private function validate_ip($ip) {
		if (strtolower($ip) === 'unknown')
			return false;

		// generate ipv4 network address
		$ip = ip2long($ip);

		// if the ip is set and not equivalent to 255.255.255.255
		if ($ip !== false && $ip !== -1) {
			// make sure to get unsigned long representation of ip
			// due to discrepancies between 32 and 64 bit OSes and
			// signed numbers (ints default to signed in PHP)
			$ip = sprintf('%u', $ip);
			// do private network range checking
			if ($ip >= 0 && $ip <= 50331647) return false;
			if ($ip >= 167772160 && $ip <= 184549375) return false;
			if ($ip >= 2130706432 && $ip <= 2147483647) return false;
			if ($ip >= 2851995648 && $ip <= 2852061183) return false;
			if ($ip >= 2886729728 && $ip <= 2887778303) return false;
			if ($ip >= 3221225984 && $ip <= 3221226239) return false;
			if ($ip >= 3232235520 && $ip <= 3232301055) return false;
			if ($ip >= 4294967040) return false;
		}
		return true;
	}
}
?>