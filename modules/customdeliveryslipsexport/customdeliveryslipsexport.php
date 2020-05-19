<?php 
if (!defined('_PS_VERSION_')) 	
	exit; 


class customdeliveryslipsexport extends Module { 	
	
	var $configuration = array();
	
	public function __construct() { 		
		$this->name = 'customdeliveryslipsexport'; 	    
		$this->tab = 'others'; 	    
		$this->version = '1.0.2';
		$this->author = 'Duracom internetdiensten';
		$this->need_instance = 0;
		$this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
		$this->bootstrap = true;
		
		parent::__construct();

		
		$this->displayName = $this->l('Custom Delivery Slips Export');
		$this->description = $this->l('Generate delivery slips with custom parameters.');
		$this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
		
		if (!Configuration::get("customDeliverySlipsExport"))
			$this->warning = $this->l('No name provided');
			
		$this->_getConfiguration();
		
		
	}
	
	public function install() {
		$this->_addMenuTab();
		if (!parent::install())
			return false;
		return true;
	} 
	
	private function _addMenuTab()
	{
		$adminMenuItem = new Tab();
		$adminMenuItem->active = 1;
		$adminMenuItem->name[$this->context->language->id] = $this->l('Custom Delivery Slips');
		$adminMenuItem->class_name = "customDeliverySlipsExportAdmin";
		$adminMenuItem->module = 'customdeliveryslipsexport';
		$adminMenuItem->id_parent = Tab::getIdFromClassName('AdminParentOrders');
		$adminMenuItem->add();

		return true;
	}
		
	public function uninstall()
	{
		if (!parent::uninstall())
			return false;
		return true;
	}
	/**
	 * Configuration page
	 **/
	public function getContent()
	{
		$output = null;
 
	    if (Tools::isSubmit('submit'.$this->name))
	    {
	        $this->configuration['select_status'] = Tools::getValue('select_status');
          $this->configuration['update_bool'] = Tools::getValue('update_bool');
          $this->configuration['update_status'] = Tools::getValue('update_status');

	        $this->_saveConfiguration();
	        $output .= $this->displayConfirmation($this->l('Settings updated'));
	    }
	    return $output.$this->displayForm();
	}
	
	public function displayForm()
	{
		//Get values for selectboxes
		$id_lang = (int)$this->context->language->id;
		$orderstatus = OrderStateCore::getOrderStates($id_lang);
		$carriers = CarrierCore::getCarriers($id_lang);
		
	    // Get default Language
	    $default_lang = (int)Configuration::get('PS_LANG_DEFAULT');
	     
	    // Init Fields form array
	    $fields_form[0]['form'] = array(
	        'legend' => array(
	            'title' => $this->l('Settings'),
	        ),
	        'input' => array(
	            array(     
      					'type' => 'select',
      					'label' => $this->l('Select status condition'),
      					'desc' => $this->l('Choose the status of the orders to export.'),
      					'name' => 'select_status',
      					'required' => true,
      					'options' => array(
      						'query' => $orderstatus,
      						'id' => 'id_order_state',
      						'name' => 'name'
      					)
      				),
      				array(
      					'type'    => 'radio',
      					'label'   => $this->l('Change order status'),
      					'desc'    => $this->l(''),
      					'name'    => 'update_bool',
      					'is_bool' => true,
      					'values'    => array(
      					    array(
      					    	'id'    => 'active_on',
      							'value' => 1,
      							'label' => $this->l('Enabled')
      					    ),
      					    array(
      					    	'id'    => 'active_off',
      							'value' => 0,
      							'label' => $this->l('Disabled')
      					    )
      					),
      				),
      				array(
      					'type' => 'select',
      					'label' => $this->l('Change order-status into'),
      					'desc' => $this->l('Choose the status to convert orders into'),
      					'name' => 'update_status',
      					'required' => true,
      					'options' => array(
      						'query' => $orderstatus,
      						'id' => 'id_order_state',
      						'name' => 'name'
      					)
      				)
  	        ),
			'submit' => array(
	            'title' => $this->l('Save'),
	            'class' => 'button'
	        )
	    );
	     
	    $helper = new HelperForm();
	     
	    // Module, t    oken and currentIndex
	    $helper->module = $this;
	    $helper->name_controller = $this->name;
	    $helper->token = Tools::getAdminTokenLite('AdminModules');
	    $helper->currentIndex = AdminController::$currentIndex.'&configure='.$this->name;
	     
	    // Language
	    $helper->default_form_language = $default_lang;
	    $helper->allow_employee_form_lang = $default_lang;
	     
	    // Title and toolbar
	    $helper->title = $this->displayName;
	    $helper->show_toolbar = true;        // false -> remove toolbar
	    $helper->toolbar_scroll = true;      // yes - > Toolbar is always visible on the top of the screen.
	    $helper->submit_action = 'submit'.$this->name;
	    $helper->toolbar_btn = array(
	        'save' =>
	        array(
	            'desc' => $this->l('Save'),
	            'href' => AdminController::$currentIndex.'&configure='.$this->name.'&save'.$this->name.
	            '&token='.Tools::getAdminTokenLite('AdminModules'),
	        ),
	        'back' => array(
	            'href' => AdminController::$currentIndex.'&token='.Tools::getAdminTokenLite('AdminModules'),
	            'desc' => $this->l('Back to list')
	        )
	    );
	     
	    // Load current value
	    $helper->fields_value['select_status'] = (isset($this->configuration['select_status']))? $this->configuration['select_status']: '';
	    $helper->fields_value['update_bool'] = (isset($this->configuration['update_bool']))? $this->configuration['update_bool']: '0';
	    $helper->fields_value['update_status'] = (isset($this->configuration['update_status']))? $this->configuration['update_status']: '';

	     
	    return $helper->generateForm($fields_form);
	}
	

	
	
	private function _getConfiguration()
	{
		
		$this->configuration = unserialize(Configuration::get('customDeliverySlipsExport'));
	}
	
	private function _saveConfiguration()
	{
		
		if (!empty($this->configuration))
			Configuration::updateValue('customDeliverySlipsExport', serialize($this->configuration));
			

	}	
		
}