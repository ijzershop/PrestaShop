<?php

class customDeliverySlipsExportAdminController extends AdminController { 	
	
	var $configuration = array();

	public function __construct()
    {
        $this->module = 'customdeliveryslipsexport';
	    $this->lang = false;
	    $this->context = Context::getContext();
	    $this->bootstrap = true;		
		parent::__construct();	
		
    }

	public function initContent()
	{
		$token = Tools::getAdminTokenLite('AdminOrders');
		
    $pdfResult = $this->processGenerateDeliverySlipsPDF();

    $redirUrl = "index.php?controller=AdminOrders&token=" . $token . (isset($_GET["auto"]) ? "&auto=1" : "");

    if(isset($_GET["ajax"])){

      echo json_encode(array("url" => $redirUrl, "printed" => ($pdfResult ? 1 : 0)));

    }else{
      if(!$pdfResult){
        $this->displayInformation($this->l('No delivery slips found'));
      }


      Tools::redirectAdmin($redirUrl);
    }
		
		
		parent::initContent();
	}
	
	public function renderForm()
	{
		// $this->initToolbar();
		
		//Get values for selectboxes
		$id_lang = (int)$this->context->language->id;
		$config = $this->_getConfiguration();
		$orderstatus = OrderStateCore::getOrderStates($id_lang);	
		$orderstatus_default = $config['select_status'];

		$this->fields_value['date_from'] = date('Y-m-d', strtotime('-7 days'));
		$this->fields_value['date_to'] = date('Y-m-d', time());
		$this->fields_value['state'] = $orderstatus_default;
		
		$this->fields_form = array(
	        'legend' => array(
	            'title' => $this->l('Generate multiple delivery slips')
	        ),
	        'input' => array(
	            array(
	                'type' => 'date',
	                'label' => $this->l('From'),
	                'name' => 'date_from',
	                'size' => 70,
	                'required' => true
	            ), 
	            array(
	                'type' => 'date',
	                'label' => $this->l('To'),
	                'name' => 'date_to',
	                'size' => 70,
	                'required' => true
	            ),
				array(     
					'type' => 'select',                              
					'label' => $this->l('Status'),
					'desc' => $this->l('Choose the status of the orders to export.'), 
					'name' => 'state',   
					'required' => true,           
					'options' => array(
						'query' => $orderstatus, 
						'id' => 'id_order_state',  
						'name' => 'name'
					)
				)
	
	        ),
	        'submit' => array(
				'title' => $this->l('Generate PDF file'),
				'icon' => 'process-icon-download-alt'	
			)
	    );
	    return parent::renderForm();

	}
	
	/**
	 * Get orders for desired interval and state
	 * Branch of function in classes/order/OrderInvoice
	 * Added order_state functionality	
	 * @since 1.5.0.3
	 * @static
	 * @param $date_from
	 * @param $date_to
	 * @return array collection of invoice
	 */
	private function _getByDeliveryDateInterval($date_from, $date_to, $state)
	{
		/*$order_invoice_list = Db::getInstance()->executeS('
			SELECT oi.*
			FROM `'._DB_PREFIX_.'order_invoice` oi
			LEFT JOIN `'._DB_PREFIX_.'orders` o ON (o.`id_order` = oi.`id_order`)
			WHERE DATE_ADD(oi.date_add, INTERVAL -1 DAY) <= \''.pSQL($date_to).'\'
			AND oi.date_add >= \''.pSQL($date_from).'\'
			AND o.current_state = \''.$state.'\'
			'.Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o').'
			ORDER BY oi.delivery_date ASC
		');*/
		
		$order_invoice_list = Db::getInstance()->executeS('
			SELECT oi.*
			FROM `'._DB_PREFIX_.'order_invoice` oi
			LEFT JOIN `'._DB_PREFIX_.'orders` o ON (o.`id_order` = oi.`id_order`)
			WHERE o.current_state = \''.$state.'\'
			'.Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o').'
			ORDER BY oi.delivery_date ASC
		');

		return ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list);
	}
	
	/**
	 * Process form to pdf
	 * Branch of function in controllers/admin/AdminPDFController
	 **/
	public function processGenerateDeliverySlipsPDF()
	{
		$config = $this->_getConfiguration();
		
		#$order_invoice_collection = $this->_getByDeliveryDateInterval(Tools::getValue('date_from'), Tools::getValue('date_to'), Tools::getValue('state'));
		$order_invoice_collection = $this->_getByDeliveryDateInterval(null, null, $config['select_status']);

		if (!count($order_invoice_collection))
			return false; //die(Tools::displayError('No invoice was found.'));

    $this->generatePDF($order_invoice_collection, PDF::TEMPLATE_DELIVERY_SLIP);

    if(isset($config['update_bool']) && $config['update_bool'] == 1 && is_numeric($config['update_status'])){
      foreach($order_invoice_collection as $order){
			  $orderObject = new Order($order->id_order);
			  $orderObject->setCurrentState($config['update_status'], 0);
      }
    }

		return true;
	}
	
	/**
	 * Generate PDF
	 * Branch of function in controllers/admin/AdminPDFController
	 **/
	public function generatePDF($object, $template)
	{
		$pdf = new PDF($object, $template, Context::getContext()->smarty);

    ob_start();

		$pdf->render();

    $pakbonnenpdf = ob_get_contents();

    ob_end_clean(); //straks ob_end_clean() van maken

    // pdf opslaan in upload/koopman map zodat deze wordt opgepakt voor automatisch printen..
    file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/upload/koopman/pakbonnen_" . time() . ".pdf", $pakbonnenpdf);
	}
	
  private function _isDuracom(){
    return $_SERVER["REMOTE_ADDR"] = "94.168.53.82";
  }

	/**
	 * Retreive module configuration
	 **/
	private function _getConfiguration()
	{
		
		return unserialize(Configuration::get('customDeliverySlipsExport'));
	}
	
}