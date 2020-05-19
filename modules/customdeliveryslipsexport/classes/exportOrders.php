<?php
	
class ExportOrders { 	
	var $configuration;
	
	public function __construct($configuration)
    {
        $this->configuration = $configuration;
    
    }
    
    /**
	 * Export orders
	 **/
    public function export()
    {
	    $orders = $this->_getOrders($this->configuration['select_status']);
		if (empty($orders))
			return false;
			
	    $conversion = $this->_convertOrders($orders);

	    $upload = $this->_saveAsCSV($conversion);
	    
	    //Update orders when selected and uploaded
	    if(isset($this->configuration['update_bool']) && $this->configuration['update_bool'] == 1 && is_numeric($this->configuration['update_status']) && $upload)
	    {
		    $this->_setNewStateForOrders($orders, $this->configuration['update_status']);
	    }
    }
    
    /**
	 * Get orders array for given state.
	 * @param current order state
	 * @param maximum number of records
	 * @return array of orders
	 **/
	private function _getOrders($state, $max = 100)
	{
		if (!is_numeric($state))
			return false;
			
		$sql = new DbQuery();
		$sql->select('*');
		$sql->from('orders', 'o');
		$sql->innerJoin('customer', 'c', 'c.id_customer = o.id_customer');
		$sql->innerJoin('address', 'a', 'a.id_address = o.id_address_delivery');
		$sql->innerJoin('country', 'co', 'co.id_country = a.id_country');
		$sql->where('o.current_state = '.$state);
		$sql->limit($max);
		$sql->orderBy('id_order desc');
		return Db::getInstance()->executeS($sql);
	}

    
    /**
	 * Change state of orders
	 * @param orders array
	 * @param new state
	 * @return success
	 **/
    private function _setNewStateForOrders($orders, $state)
    {
	    //get order object for each order and change status
		foreach($orders as $order)
		{
			$orderObject = new Order($order['id_order']);
			$orderObject->setCurrentState($state, 0);
		}
		return true;
    }
    
    /**
	 * Convert retreived orders into gls csv format
	 * @param orders array
	 * @return converted array
	 **/
    private function _convertOrders($orders)
    {
	    if (empty($orders))
	    	return array();
	    $csv = array();
		
		//Create header
		$csv['0']['naam'] = "NAAM GEADRESSEERDE";
		$csv['0']['naam2'] = "NAAM 2";
		$csv['0']['straatenhuisnummer'] = "STRAATENHUISNUMMER";
		$csv['0']['postcode'] = "POSTCODE";
		$csv['0']['plaats'] = "PLAATS";
		$csv['0']['land'] = "LAND";
		
		$csv['0']['referentie'] = "REFERENTIE";
		$csv['0']['aantal'] = "AANTAL";	
		$csv['0']['gewicht'] = "GEWICHT";
		$csv['0']['verpakking'] = "VERPAKKING";
		$csv['0']['verladernummer'] =  "VERLADERNUMMER";
		$csv['0']['express'] =  "EXPRESS";
		
		$csv['0']['telefoongeeadresseerde'] = "TELEFOONGEADRESSEERDE";
		$csv['0']['sms'] = "SMS";
		$csv['0']['emailadres'] = "EMAILADRES";
		$csv['0']['typeadres'] = "TYPEADRES";
		//Fill array
		foreach($orders as $row)
		{
			$csv[$row['id_order']]['naam'] = $row['firstname']." ".$row['lastname'];
			$csv[$row['id_order']]['naam2'] = $row['company'];
			$csv[$row['id_order']]['straatenhuisnummer'] = $row['address1'];
			$csv[$row['id_order']]['postcode'] = $row['postcode'];
			$csv[$row['id_order']]['plaats'] = $row['city'];
			$csv[$row['id_order']]['land'] = $row['iso_code'];
			
			$csv[$row['id_order']]['referentie'] = $row['id_order'];
			$csv[$row['id_order']]['aantal'] = "1";
			$csv[$row['id_order']]['gewicht'] = "1";
			$csv[$row['id_order']]['verpakking'] = "pco";
			$csv[$row['id_order']]['verladernummer'] = "89010051";
			$csv[$row['id_order']]['express'] =  "";
			
			$csv[$row['id_order']]['telefoongeeadresseerde'] = $row['phone'];
			$csv[$row['id_order']]['sms'] = "";
			$csv[$row['id_order']]['emailadres'] = $row['email'];
			$csv[$row['id_order']]['typeadres'] = "P";	
		}
		return $csv;
    }
    
    /**
	 * Save as csv file on configurated ftp server
	 **/
    private function _saveAsCSV($data)
    {
	    //Create temp file
		$fp = fopen('php://temp', 'r+');
		//Put csv info into temp file
		foreach ($data as $fields) {
		    fputcsv($fp, $fields, ';');
		}
		//Upload temp file to ftp
		rewind($fp);
		$upload = $this->_uploadToFTP($fp, $this->configuration['ftp_dir'], $this->configuration['ftp_host'], $this->configuration['ftp_user'], $this->configuration['ftp_password'], $this->configuration['ftp_port']);
		//Close temp file
		fclose($fp);
		
		return $upload;
    }
    
    /**
	 * Connect to ftp server and return handle
	 * @var string url of ftp server
	 * @var string username
	 * @var string password
	 * @var int portnumber, default: 21
	 * @return ftp handle
	 **/
	private function _uploadToFTP($file_pointer, $upload_dir = '/', $url, $username = null, $password = null, $port = 21 )
	{	
		$succes = false;
		$ftp_connection = ftp_connect($url, $port);
		if (ftp_login($ftp_connection, $username, $password))
		{
			//Login succesfull try uploading file
			$file_name = "GlsExport".time().".csv";
			
			ftp_chdir($ftp_connection, $upload_dir);
			
			$succes = ftp_fput($ftp_connection, $file_name, $file_pointer, FTP_ASCII);
		}
		ftp_close($ftp_connection);
		
		return $succes;
	}
    
}