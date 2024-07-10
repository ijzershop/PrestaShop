<?php
/**
* 2007-2020 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

class AddToOrder extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'addtoorder';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'ijzershop';
        $this->need_instance = 1;
        $this->context = Context::getContext();
        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->trans('Add to order delivery option extended', [], 'Modules.AddToOrder.addtoorder.php');
        $this->description = $this->trans('Module for the configurations of the Moderne Smid BV', [], 'Modules.AddToOrder.addtoorder.php');
 
        $this->confirmUninstall = $this->trans('Are you sure to remove this module, all records from the database wil be removed', [], 'Modules.AddToOrder.addtoorder.php');

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
    }

    private function executeSQL($requests){
        foreach ($requests as $q) {
            if (!DB::getInstance()->execute($q)) {
                return false;
            }
        }
    }

    public function install()
    {
        Configuration::updateValue('ADDTOORDER_LIVE_MODE', false);
        Configuration::updateValue('ADDTOORDER_DELIVERY_METHOD', 14);
        Configuration::updateValue('ADDTOORDER_ORDER_STATUSES', implode(',', [2,3,7,10,16]));

        parent::install();
        $this->registerHook('addToOrderDelivery');
        $this->registerHook('addToOrderAdmin');

        $sql = array();

        $sql[] = "ALTER TABLE `"._DB_PREFIX_."cart` ADD added_to_order VARCHAR(100)";
        $sql[] = "ALTER TABLE `"._DB_PREFIX_."orders` ADD added_to_order VARCHAR(100)";

        $this->executeSQL($sql);

        return true;
    }

    public function uninstall()
    {
        Configuration::deleteByName('ADDTOORDER_LIVE_MODE');
        Configuration::deleteByName('ADDTOORDER_DELIVERY_METHOD');
        Configuration::deleteByName('ADDTOORDER_ORDER_STATUSES');

        $sql = array();
        $sql[] = "ALTER TABLE `"._DB_PREFIX_."cart` DROP added_to_order";
        $sql[] = "ALTER TABLE `"._DB_PREFIX_."orders` DROP added_to_order";

        $this->executeSQL($sql);

        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitAddToOrder')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output.$this->renderForm();
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitAddToOrder';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm($this->getConfigForm());
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {

        //Get values for selectboxes
        $id_lang = (int)$this->context->language->id;
        $delivery_methods = Carrier::getCarriers($id_lang, true);
        $statuses = OrderState::getOrderStates($id_lang);
// var_export($statuses);
        return array(array(
            // Basic settings
            'form' => array(
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->trans('Live mode', [], 'Modules.AddToOrder.addtoorder.php'),
                        'name' => 'ADDTOORDER_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->trans('Use this module in live mode', [], 'Modules.AddToOrder.addtoorder.php'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->trans('Enabled', [], 'Modules.AddToOrder.addtoorder.php')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->trans('Disabled', [], 'Modules.AddToOrder.addtoorder.php')
                            )
                        ),
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Select delivery method'),
                        'desc' => $this->l('Select deliver method to attach the extended options'),
                        'name' => 'ADDTOORDER_DELIVERY_METHOD',
                        'required' => true,
                        'options' => array(
                            'query' => $delivery_methods,
                            'id' => 'id_carrier',
                            'name' => 'name'
                        )
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Select order statuses'),
                        'desc' => $this->l('Select deliver method to attach the extended options'),
                        'name' => 'ADDTOORDER_ORDER_STATUSES[]',
                        'id' => 'ADDTOORDER_ORDER_STATUSES',
                        'multiple' => true,
                        'required' => true,
                        'options' => array(
                            'query' => $statuses,
                            'id' => 'id_order_state',
                            'name' => 'name'
                        )
                    ),
                ),
                    'submit' => array(
                        'title' => $this->trans('Save', [], 'Modules.AddToOrder.addtoorder.php'),
                    )
                )
            )
        );
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
    return array(
        'ADDTOORDER_LIVE_MODE' => Configuration::get('ADDTOORDER_LIVE_MODE', true),
        'ADDTOORDER_DELIVERY_METHOD' => Configuration::get('ADDTOORDER_DELIVERY_METHOD', 14),
        'ADDTOORDER_ORDER_STATUSES[]' => explode(',',Configuration::get('ADDTOORDER_ORDER_STATUSES')),
        );
    }


    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();
        foreach (array_keys($form_values) as $key) {  
             //check if is multiple select
            if (in_array($key, array('ADDTOORDER_ORDER_STATUSES[]'))) {
                    $statuses = Tools::getValue('ADDTOORDER_ORDER_STATUSES');
                    if(!is_array($statuses)){
                        $selectedStatuses = implode(',', [2,3,7,10,16]);
                    } else {
                        $selectedStatuses = implode(',', $statuses);
                    }
                    // echo $orderStatusString;                  
                    Configuration::updateValue('ADDTOORDER_ORDER_STATUSES', $selectedStatuses, false);
                continue;
            } else {
                Configuration::updateValue($key, Tools::getValue($key), false);
            }


        }
    }

    public function hookActionCarrierProcess(Array $params)
    {

        $cart = $params['cart'];
        if (!($cart instanceof Cart))
            return;


        if( isset($params['cart']->added_to_order) ){

            $cart->added_to_order = $params['cart']->added_to_order;

        }
        $cart->save();
        
    }

    public function hookAddToOrderDelivery($params){
        return 'addToOrderDelivery';
    }
    public function hookAddToOrderAdmin($params){
        return 'addToOrderAdmin';
    }

}
