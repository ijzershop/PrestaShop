<?php
/**
* 2007-2017 PrestaShop
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
*  @copyright 2007-2017 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

class Channable extends Module
{
    protected $config_form = false;
    protected $this_file = __FILE__;
    protected static $sent_update_ids = array();

    /**
     * Channable constructor.
     */
    public function __construct()
    {
        $this->name = 'channable';
        $this->tab = 'market_place';
        $this->version = '2.5.9';
        $this->author = 'patworx multimedia GmbH';
        $this->need_instance = 1;

        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Channable');
        $this->description = $this->l('channable Module to connect your shop to channable service');

        $this->confirmUninstall = $this->l('Are you sure to uninstall this module?');

        $this->ps_versions_compliancy = array('min' => '1.5', 'max' => _PS_VERSION_);

        require_once(dirname(__FILE__) . '/classes/ChannableWebhook.php');
        require_once(dirname(__FILE__) . '/classes/ChannableFeedfield.php');
        require_once(dirname(__FILE__) . '/classes/ChannableOrdersAdditionalData.php');
        require_once(dirname(__FILE__) . '/classes/ChannableProduct.php');
    }

    /**
     * @return bool
     * @throws PrestaShopException
     */
    public function install()
    {
        $this->enableApi();
        Configuration::updateValue('CHANNABLE_SQL_OPTIMIZATION_MODE', 1);
        Configuration::updateValue('CHANNABLE_USE_GUEST_CHECKOUT', 1);
        Configuration::updateValue('CHANNABLE_MULTIQUERY_MODE', 1);
        Configuration::updateValue('CHANNABLE_DEFAULT_PAGE_SIZE', 100);
        Configuration::updateValue('CHANNABLE_COMMENT_AS_NOTE', 1);
        Configuration::updateValue('CHANNABLE_COMMENT_AS_CUSTOMER_THREAD', 1);

        Db::getInstance()->execute('CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'channable_webhooks` (
    `id_channable_webhook` int(11) NOT NULL AUTO_INCREMENT,
	`active` int(11) NOT NULL,
	`action` VARCHAR(255) NOT NULL,
	`address` VARCHAR(255) NOT NULL,
    `date_add` DATETIME,
    PRIMARY KEY  (`id_channable_webhook`)
) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;');

        Db::getInstance()->execute('CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'channable_feedfields` (
    `id_channable_feedfields` int(11) NOT NULL AUTO_INCREMENT,
    `tablename` VARCHAR(255) NOT NULL,
	`field_in_db` VARCHAR(255) NOT NULL,
	`field_in_feed` VARCHAR(255) NOT NULL,
    `date_add` DATETIME,
    PRIMARY KEY  (`id_channable_feedfields`)
) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;');

        Db::getInstance()->execute('CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'channable_orders_additional_data` (
    `id_channable_orders_additional_data` int(11) NOT NULL AUTO_INCREMENT,
    `id_order` int(11) NOT NULL,
	`field_in_post` VARCHAR(255) NOT NULL,
	`value_in_post` VARCHAR(255) NOT NULL,
    `date_add` DATETIME,
    PRIMARY KEY  (`id_channable_orders_additional_data`)
) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8;');

        return parent::install() &&
            $this->registerHook('actionUpdateQuantity') &&
            $this->registerHook('actionProductUpdate') &&
            $this->registerHook('actionProductAttributeUpdate') &&
            $this->registerHook('adminOrder') &&
            $this->registerHook('backOfficeHeader');
    }

    /**
     * @return bool
     */
    public function uninstall()
    {
        Configuration::deleteByName('CHANNABLE_FEEDMODE_ALTERNATIVE');
        Configuration::deleteByName('CHANNABLE_SQL_OPTIMIZATION_MODE');
        Configuration::deleteByName('CHANNABLE_FEEDMODE_SKIP_SHIPPING');
        Configuration::deleteByName('CHANNABLE_ORDER_WAREHOUSE');
        Configuration::deleteByName('CHANNABLE_MULTIQUERY_MODE');
        Configuration::deleteByName('CHANNABLE_DEFAULT_PAGE_SIZE');
        Configuration::deleteByName('CHANNABLE_COMMENT_AS_NOTE');
        Configuration::deleteByName('CHANNABLE_COMMENT_AS_CUSTOMER_THREAD');
        return parent::uninstall();
    }

    /**
     * @return bool|string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws SmartyException
     */
    public function getContent()
    {
        if (((bool)Tools::isSubmit('submitChannableModule')) == true) {
            $this->postProcess();
        }
        $this->context->smarty->assign('module_dir', $this->_path);

        if (Tools::getValue('submitChannableModule') == '1') {
            if ($osData = Tools::getValue('os')) {
                if (isset($osData['shipped'])) {
                    Configuration::updateValue('CHANNABLE_ORDER_STATES_SHIPPED', join(',', $osData['shipped']));
                } else {
                    Configuration::updateValue('CHANNABLE_ORDER_STATES_SHIPPED', join(',', array()));
                }
                if (isset($osData['cancelled'])) {
                    Configuration::updateValue('CHANNABLE_ORDER_STATES_CANCELLED', join(',', $osData['cancelled']));
                } else {
                    Configuration::updateValue('CHANNABLE_ORDER_STATES_CANCELLED', join(',', array()));
                }
            }
            if (Tools::getValue('os_import') != '') {
                Configuration::updateValue('CHANNABLE_ORDER_STATE_IMPORT', (int)Tools::getValue('os_import'));
            }
            if (Tools::getValue('carrier_import') != '') {
                Configuration::updateValue('CHANNABLE_ORDER_CARRIER_ID_IMPORT', (int)Tools::getValue('carrier_import'));
            }
            if (Tools::getValue('order_warehouse') != '') {
                Configuration::updateValue('CHANNABLE_ORDER_WAREHOUSE', (int)Tools::getValue('order_warehouse'));
            }
            if (Tools::getValue('comment_as_note') != '') {
                Configuration::updateValue('CHANNABLE_COMMENT_AS_NOTE', (int)Tools::getValue('comment_as_note'));
            }
            if (Tools::getValue('comment_as_customer_thread') != '') {
                Configuration::updateValue('CHANNABLE_COMMENT_AS_CUSTOMER_THREAD', (int)Tools::getValue('comment_as_customer_thread'));
            }

            $this->context->smarty->assign('success_message', $this->l('Settings updated'));
        }
        if (Tools::getValue('submitChannableAssignmentModule') == '1') {
            ChannableFeedfield::removeAllFeedfields();
            if (Tools::getValue('assigned_fields')) {
                foreach (Tools::getValue('assigned_fields') as $afKey => $data) {
                    $assignedField = new ChannableFeedfield();
                    $assignedField->tablename = $data['tablename'];
                    $assignedField->field_in_db = $data['field_in_db'];
                    $assignedField->field_in_feed = $data['field_in_feed'];
                    $assignedField->save();
                }
            }
            $this->context->smarty->assign('success_message', $this->l('Assigned fields in feed updated'));
        }

        $webservice = new WebserviceKey((int)Configuration::get('CHANNABLE_API_ID'));

        $this->context->smarty->assign('feed_url', $this->context->link->getModuleLink('channable', 'feed', array('key' => $webservice->key, 'limit' => '0,100')));
        $this->context->smarty->assign('auto_connect_feed_url', $this->context->link->getModuleLink('channable', 'feed'));
        $this->context->smarty->assign('webhook_url', $this->context->link->getModuleLink('channable', 'webhooks'));
        $this->context->smarty->assign('order_api_url', $this->context->link->getModuleLink('channable', 'order'));
        $this->context->smarty->assign('order_api_fetch_url', $this->context->link->getModuleLink('channable', 'order', array('order' => 'XX_ORDER_ID_XX')));
        $this->context->smarty->assign('product_api_url', $this->context->link->getModuleLink('channable', 'product', array('key' => $webservice->key, 'id_product' => 'XX_PRODUCT_ID_XX')));
        $this->context->smarty->assign('channable_key', $webservice->key);
        $this->context->smarty->assign('lang_id', Context::getContext()->language->id);
        $this->context->smarty->assign('form_url', $this->context->link->getAdminLink('AdminModules', false) . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name . '&token=' . Tools::getAdminTokenLite('AdminModules'));
        $this->context->smarty->assign('order_states', OrderState::getOrderStates((int) Configuration::get('PS_LANG_DEFAULT')));
        $this->context->smarty->assign('order_states_shipped', $this->getOrderStates('shipped'));
        $this->context->smarty->assign('order_states_cancelled', $this->getOrderStates('cancelled'));
        $this->context->smarty->assign('order_state_import', Configuration::get('CHANNABLE_ORDER_STATE_IMPORT'));
        $this->context->smarty->assign('order_carrier_import', Configuration::get('CHANNABLE_ORDER_CARRIER_ID_IMPORT'));
        $this->context->smarty->assign('order_warehouse', Configuration::get('CHANNABLE_ORDER_WAREHOUSE'));
        $this->context->smarty->assign('feedfields_available', ChannableFeedfield::getAvailableFieldsFiltered());
        $this->context->smarty->assign('feedfields_assigned', ChannableFeedfield::getAllFeedfields());
        $this->context->smarty->assign('carriers', Carrier::getCarriers(Configuration::get('PS_LANG_DEFAULT'), false, false, false, null, Carrier::ALL_CARRIERS));

        if ((int)Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT') == '1') {
            $this->context->smarty->assign('warehouses', Warehouse::getWarehouses());
        }

        $basicform = $this->renderForm();
        $this->context->smarty->assign('mainform', $basicform);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output;
    }

    /**
     * @return string
     * @throws PrestaShopException
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
        $helper->submit_action = 'submitChannableModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
        .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }

    /**
     * @return array[]
     */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                    'title' => $this->l('Feed Settings'),
                    'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'desc' => $this->l('Only change this if you have a high powered server.'),
                        'name' => 'CHANNABLE_MULTIQUERY_MODE',
                        'label' => $this->l('Timeout optimized mode'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'active_multiquery_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_multiquery_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'desc' => $this->l('Use this mode if you experience problems with the product feed.'),
                        'name' => 'CHANNABLE_FEEDMODE_ALTERNATIVE',
                        'label' => $this->l('Alternative Mode'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'desc' => $this->l('Use this mode if you experience problems with the SQL server.'),
                        'name' => 'CHANNABLE_SQL_OPTIMIZATION_MODE',
                        'label' => $this->l('SQL Optimization Mode'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'sql_active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'sql_active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'desc' => $this->l(''),
                        'name' => 'CHANNABLE_DISABLE_OUT_OF_STOCK',
                        'label' => $this->l('Disable out of stock products'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'dos_active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'dos_active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'desc' => $this->l(''),
                        'name' => 'CHANNABLE_DISABLE_INACTIVE',
                        'label' => $this->l('Disable inactive products'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'di_active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'di_active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'type' => 'switch',
                        'desc' => $this->l(''),
                        'name' => 'CHANNABLE_FEEDMODE_SKIP_SHIPPING',
                        'label' => $this->l('Skip shipping calculation'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'skip_active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'skip_active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                    array(
                        'type' => 'text',
                        'desc' => $this->l('Customer and corresponding default address used for shipping cost calculation in feed.'),
                        'name' => 'CHANNABLE_CUSTOMER_ID',
                        'label' => $this->l('Default Customer-ID'),
                        'col' => 3,
                    ),
                    array(
                        'type' => 'text',
                        'name' => 'CHANNABLE_DEFAULT_PAGE_SIZE',
                        'label' => $this->l('Default page size'),
                        'col' => 3,
                    ),
                    array(
                        'type' => 'switch',
                        'desc' => $this->l('If inactive, all incoming order will have created a "real" customer account.'),
                        'name' => 'CHANNABLE_USE_GUEST_CHECKOUT',
                        'label' => $this->l('Use Guest checkout'),
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'uguest_active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'uguest_active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    /**
     * @return array
     */
    protected function getConfigFormValues()
    {
        return array(
            'CHANNABLE_FEEDMODE_ALTERNATIVE' => Tools::getValue('CHANNABLE_FEEDMODE_ALTERNATIVE', Configuration::get('CHANNABLE_FEEDMODE_ALTERNATIVE') == '1' ? 1 : 0),
            'CHANNABLE_MULTIQUERY_MODE' => Tools::getValue('CHANNABLE_MULTIQUERY_MODE', Configuration::get('CHANNABLE_MULTIQUERY_MODE') == '1' ? 1 : 0),
            'CHANNABLE_SQL_OPTIMIZATION_MODE' => Tools::getValue('CHANNABLE_SQL_OPTIMIZATION_MODE', Configuration::get('CHANNABLE_SQL_OPTIMIZATION_MODE') == '1' ? 1 : 0),
            'CHANNABLE_DISABLE_OUT_OF_STOCK' => Tools::getValue('CHANNABLE_DISABLE_OUT_OF_STOCK', Configuration::get('CHANNABLE_DISABLE_OUT_OF_STOCK') == '1' ? 1 : 0),
            'CHANNABLE_DISABLE_INACTIVE' => Tools::getValue('CHANNABLE_DISABLE_INACTIVE', Configuration::get('CHANNABLE_DISABLE_INACTIVE') == '1' ? 1 : 0),
            'CHANNABLE_FEEDMODE_SKIP_SHIPPING' => Tools::getValue('CHANNABLE_FEEDMODE_SKIP_SHIPPING', Configuration::get('CHANNABLE_FEEDMODE_SKIP_SHIPPING') == '1' ? 1 : 0),
            'CHANNABLE_CUSTOMER_ID' => Tools::getValue('CHANNABLE_CUSTOMER_ID', Configuration::get('CHANNABLE_CUSTOMER_ID')),
            'CHANNABLE_DEFAULT_PAGE_SIZE' => Tools::getValue('CHANNABLE_DEFAULT_PAGE_SIZE', Configuration::get('CHANNABLE_DEFAULT_PAGE_SIZE')),
            'CHANNABLE_USE_GUEST_CHECKOUT' => Tools::getValue('CHANNABLE_USE_GUEST_CHECKOUT', Configuration::get('CHANNABLE_USE_GUEST_CHECKOUT') == '1' ? 1 : 0),
        );
    }

    /**
     * update config routine
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    /**
     * Backoffice header hook
     */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('module_name') == $this->name ||
            Tools::getValue('configure') == $this->name) {
            $this->context->controller->addJquery();
            $this->context->controller->addJS($this->_path.'views/js/backend.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * @param $params
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionUpdateQuantity($params)
    {
        $sql = 'SELECT product_attribute_shop.id_product_attribute
				FROM '._DB_PREFIX_.'product_attribute pa
				'.Shop::addSqlAssociation('product_attribute', 'pa').'
				WHERE pa.id_product = '.(int)$params['id_product'];
        $combinations = Db::getInstance()->executeS($sql);
        if ($combinations && is_array($combinations) && sizeof($combinations) > 0) {
            foreach ($combinations as $c) {
                $params['id_product_attribute'] = $c['id_product_attribute'];
                $this->sendProductUpdate($params);
            }
        } else {
            $this->sendProductUpdate($params);
        }
    }

    /**
     * @param $params
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionProductUpdate($params)
    {
        $sql = 'SELECT product_attribute_shop.id_product_attribute
				FROM '._DB_PREFIX_.'product_attribute pa
				'.Shop::addSqlAssociation('product_attribute', 'pa').'
				WHERE pa.id_product = '.(int)$params['id_product'];
        $combinations = Db::getInstance()->executeS($sql);
        if ($combinations && is_array($combinations) && sizeof($combinations) > 0) {
            foreach ($combinations as $c) {
                $params['id_product_attribute'] = $c['id_product_attribute'];
                $this->sendProductUpdate($params);
            }
        } else {
            $this->sendProductUpdate($params);
        }
    }

    /**
     * @param $params
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionProductAttributeUpdate($params)
    {
        $this->sendProductUpdate($params);
    }

    /**
     * @param $params
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    protected function sendProductUpdate($params)
    {
        $webHookData = ChannableWebhook::getAllWebhooks();
        if (sizeof($webHookData) > 0) {
            $jsonData = array(
                'id' => '',
                'created' => '',
                'modified' => date('Y-m-d H:i:s'),
                'gtin' => '',
                'price' => '',
                'stock' => '',
                'title' => ''
            );
            if (isset($params['id_product_attribute']) && $params['id_product_attribute'] > 0) {
                $is_variant = true;
                $combination = new Combination((int)$params['id_product_attribute']);
                $product = new Product((int)$combination->id_product);
                $jsonData['id'] = $product->id . '_' . (int)$params['id_product_attribute'];
                if ($combination->reference != '') {
                    $jsonData['gtin'] = $combination->reference;
                } elseif ($product->reference != '') {
                    $jsonData['gtin'] = $product->reference;
                } else {
                    $jsonData['gtin'] = $product->ean13;
                }
                $jsonData['price'] = $product->price + $combination->price;
                $stockResult = StockAvailable::getQuantityAvailableByProduct($params['id_product'], $params['id_product_attribute']);
                $jsonData['stock'] = $stockResult;
            } elseif (isset($params['id_product'])) {
                $is_variant = false;
                $product = new Product((int)$params['id_product']);
                $jsonData['id'] = (int)$params['id_product'];
                if ($product->reference != '') {
                    $jsonData['gtin'] = $product->reference;
                } else {
                    $jsonData['gtin'] = $product->ean13;
                }
                $jsonData['price'] = $product->price;
                $stockResult = StockAvailable::getQuantityAvailableByProduct($params['id_product']);
                $jsonData['stock'] = $stockResult;
            }
            $jsonData['created'] = $product->date_add;
            $jsonData['title'] = $product->name[Context::getContext()->language->id];
            if ($jsonData['stock'] !== null) {
                $curlJson = json_encode($jsonData);

                if (!isset(self::$sent_update_ids[$jsonData['id']])) {
                    foreach ($webHookData as $webHook) {
                        if ($webHook['active'] == '1') {
                            $ch = curl_init($webHook['address']);
                            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                            curl_setopt($ch, CURLOPT_POSTFIELDS, $curlJson);
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . Tools::strlen($curlJson)));
                            $result = curl_exec($ch);
                        }
                    }
                }
                self::$sent_update_ids[$jsonData['id']] = true;
            }
            /*
            error_log('fired event');
            error_log(json_encode($jsonData));
            header('Content-Type: application/json');
            echo json_encode($jsonData);
            die();
            */
        }
    }

    /**
     * @return bool
     * @throws PrestaShopException
     */
    protected function enableApi()
    {
        Configuration::updateValue('PS_WEBSERVICE', 1);

        $webserviceKey = new WebserviceKey();
        $webserviceKey->active = true;
        $webserviceKey->key = Tools::substr('CHANNABLE' . md5(time()), 0, 32);
        $webserviceKey->description = $this->l('Webservice API Key for channable created by plugin');
        $webserviceKey->save();

        $permissions_to_set = array();
        $ressources = WebserviceRequest::getResources();

        $methods = array('GET' => 'GET', 'PUT' => 'PUT', 'POST' => 'POST', 'DELETE' => 'DELETE', 'HEAD' => 'HEAD');
        foreach ($ressources as $resource_name => $data) {
            if (isset($data['forbidden_method'])) {
                $permissions_to_set[$resource_name] = array();
                foreach ($methods as $method) {
                    if (!in_array($method, $data['forbidden_method'])) {
                        $permissions_to_set[$resource_name][$method] = $method;
                    }
                }
            } else {
                $permissions_to_set[$resource_name] = $methods;
            }
        }

        WebserviceKey::setPermissionForAccount($webserviceKey->id, $permissions_to_set);
        Configuration::updateValue('CHANNABLE_API_ID', (int)$webserviceKey->id);
        return true;
    }

    /**
     * @param $type
     * @return false|string[]
     */
    public function getOrderStates($type)
    {
        $states = Configuration::get('CHANNABLE_ORDER_STATES_' . Tools::strtoupper($type));
        return explode(',', $states);
    }

    /**
     * @param $type
     * @return false|string[]
     */
    public static function getChannableOrderStates($type)
    {
        switch ($type) {
            case 'SHIPPING_SHIPPED':
                $states = Configuration::get('CHANNABLE_ORDER_STATES_SHIPPED');
                return explode(',', $states);
                break;
            case 'SHIPPING_CANCELLED':
                $states = Configuration::get('CHANNABLE_ORDER_STATES_CANCELLED');
                return explode(',', $states);
                break;
        }
    }

    /**
     * @return bool|string
     */
    public static function fetchPhpInput()
    {
        return Tools::file_get_contents('php://input');
    }

    /**
     * @param $params
     * @return bool|string|void
     * @throws PrestaShopDatabaseException
     */
    public function hookAdminOrder($params)
    {
        if (!isset($params['id_order'])) {
            return;
        }
        $additionalData = ChannableOrdersAdditionalData::getByOrderId($params['id_order']);
        if ($additionalData) {
            $this->context->smarty->assign('additionalData', $additionalData);
            return $this->display($this->this_file, 'views/templates/admin/hookAdminOrder.tpl');
        }
    }
}
