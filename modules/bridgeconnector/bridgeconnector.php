<?php
/**
 *    This file is part of eMagicOne Store Manager Bridge Connector.
 *
 *   eMagicOne Store Manager Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Store Manager Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

/**
 * @property int    $is_configurable
 * @property int    $confirmUninstall
 * @property bool   $bootstrap
 * @property string $defaultShop
 */
class Bridgeconnector extends Module
{
    private $eM1Logger;
    private $cartVersion;
    private $defaultTmpDirectory;

    public function __construct()
    {
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/classes/helper/EM1Constants.php';
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/classes/helper/EM1FileLogger.php';
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/functions/functions.php';
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/functions/for_ajax.php';

        // Module settings
        $this->name                 = 'bridgeconnector';
        $this->tab                  = 'others';
        $this->version              = '3.0.8';
        $this->author               = 'eMagicOne';
        $this->module_key           = '0d90a4ec7c4a83fa979f710a1ead2c72';
        $this->need_instance        = 0;
        $this->is_configurable      = 1;
        $this->bootstrap            = true;

        $this->cartVersion          = Configuration::get('PS_INSTALL_VERSION');
        $this->defaultShop          = Configuration::get('PS_SHOP_DEFAULT');
        $this->defaultTmpDirectory  = '/modules/' . $this->name . '/tmp';

        if (Tools::getIsset('auth_key')) {
            include_once _PS_MODULE_DIR_ . '/bridgeconnector/functions/ajax.php';
            die();
        }

        if (version_compare($this->cartVersion, '1.7.0.1', '!=')) {
            $this->ps_versions_compliancy = array('min' => '1.5.1', 'max' => '1.7');
        }

        // Initialize logger
        $this->eM1Logger = new EM1FileLogger();
        $this->eM1Logger->setFilename(_PS_MODULE_DIR_ . $this->name . '/log/' . EM1Constants::LOG_FILENAME);

        parent::__construct();

        $this->displayName = $this->l('eMagicOne Store Manager Bridge Connector');
        $this->description = $this->l(
            'Install eMagicOne Bridge Connector module to fluently connect Store Manager desktop application to 
            PrestaShop database and connect to Mobile Assistant app installed on your mobile device. Increase 
            speed of data management, take advantage of simplicity and reliability with all-in-one Store 
            Manager and have access to the real-time store data reports at your fingertips from your Android 
            device wherever you are.'
        );

        $this->checkAndUpdateToNewVersion();
        $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');

        if (!Configuration::get(EM1Constants::OPTIONS_KEY)) {
            $this->warning = $this->l('No name provided');
        }
    }

    public function install()
    {
        if (Shop::isFeatureActive()) {
            try {
                Shop::setContext(Shop::CONTEXT_ALL);
            } catch (PrestaShopException $e) {
                $this->eM1Logger->logMessageCall(
                    'Exception while installing - ' . $e->getMessage(),
                    $this->eM1Logger->level
                );
            }
        }

        return (
            parent::install()
            && $this->registerHook(EM1Constants::HOOK_ACTION_VALIDATE_ORDER)
            && $this->registerHook(EM1Constants::HOOK_ACTION_ORDER_STATUS_POST_UPDATE)
            && $this->registerHook('actionOrderHistoryAddAfter')
            && $this->registerHook('actionAdminCustomerThreadsControllerDeleteBefore')
            && $this->registerHook('actionAdminCustomerThreadsControllerDeleteAfter')
            && $this->registerHook('actionObjectCustomerMessageAddAfter')
            && $this->registerHook('actionObjectCustomerThreadAddAfter')
            && (version_compare(_PS_VERSION_, '1.7', '>=')
                ? $this->registerHook(EM1Constants::HOOK_ACTION_CUSTOMER_ACCOUNT_ADD)
                : $this->registerHook(EM1Constants::HOOK_CREATE_ACCOUNT))
            && $this->createTables()
            && $this->populateTableUsers()
            && $this->saveBridgeData()
        );
    }

    public function uninstall()
    {
        return !(!parent::uninstall()
            || !Configuration::deleteByName(EM1Constants::OPTIONS_KEY)
            || !Configuration::deleteByName(EM1Constants::MODULE_API_KEY)
            || !Configuration::deleteByName(EM1Constants::MODULE_TN_TEXT)
            || !Configuration::deleteByName(EM1Constants::MODULE_TN_LNG)
            || !Configuration::deleteByName(EM1Constants::MODULE_CL_DATE)
            || !$this->dropTables());
    }

    public function getContent()
    {
        $output = null;

        if (Tools::getIsset('bridgeconnector_login')
            && Tools::getIsset('bridgeconnector_password')
            && Tools::isSubmit('submit' . $this->name)
        ) {
            $my_module_name = (string) Tools::getValue('submitbridgeconnector');

            if (!$my_module_name || empty($my_module_name) || !Validate::isGenericName($my_module_name)) {
                $output .= $this->displayError($this->l('Invalid Configuration value'));
            } else {
                $this->saveBridgeData(true);
                $output .= $this->displayConfirmation($this->l('Settings updated'));
            }
        }

        $bridge_options = unserialize(Configuration::get(EM1Constants::OPTIONS_KEY));

        if ($bridge_options['bridge_hash'] === md5('11')) {
            $output .= $this->displayError(
                $this->l(
                    'Store Manager Bridge Connector: Default login and password are "1". 
                    Change them because of security reasons, please!'
                )
            );
        }

        if (!is_dir(_PS_ROOT_DIR_ . $bridge_options['tmp_dir'])) {
            $output .= $this->displayError($this->l('Directory for module operations does not exist'));
        } elseif (!is_writable(_PS_ROOT_DIR_ . $bridge_options['tmp_dir'])) {
            $output .= $this->displayError($this->l('Set writing permissions for temporary directory'));
        }

        return $output . $this->displayForm($bridge_options);
    }

    private function displayForm($bridgeOptions)
    {
        // Get default language
        $default_lang = (int)Configuration::get('PS_LANG_DEFAULT');

        // Init Fields form array
        $fields_form = array();

        // Init Fields form array
        $fields_form[0]['form'] = array(
            'legend' => array(
                'title' => $this->l('Store Manager Bridge Connector Settings'),
            ),
            'input' => array(
                array(
                    'type'  => 'text',
                    'label' => $this->l('Login'),
                    'name'  => 'bridgeconnector_login',
                    'id'    => 'bridgeconnector_login',
                    'desc'  => $this->l(
                        'Login for accessing Bridge Connector from eMagicOne Store Manager for PrestaShop.'
                    )
                ),
                array(
                    // To avoid auto fill
                    'type'  => 'password',
                    'name'  => 'bridgeconnector_password_fake',
                    'id'    => 'bridgeconnector_password_fake',
                ),
                array(
                    'type'  => 'password',
                    'label' => $this->l('Password'),
                    'name'  => 'bridgeconnector_password',
                    'id'    => 'bridgeconnector_password',
                    'desc'  => $this->l(
                        'Password for accessing Bridge Connector from eMagicOne Store Manager for PrestaShop.'
                    ),
                ),
                array(
                    'type'  => 'text',
                    'label' => $this->l('Directory for Module Operations'),
                    'name'  => 'bridgeconnector_tmp_dir',
                    'id'    => 'bridgeconnector_tmp_dir',
                    'desc'  => $this->l('Enter temporary folder path. It should be writable.'),
                ),
                array(
                    'type'      => 'switch',
                    'label'     => $this->l('Allow Compression'),
                    'is_bool'   => true,
                    'name'      => 'bridgeconnector_allow_compression',
                    'id'        => 'bridgeconnector_allow_compression',
                    'desc'      => $this->l(
                        'Compression of generated dump file. It is recommended for save space and faster getting data
                        in Store Manager.'
                    ),
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
                    'type'  => 'text',
                    'label' => $this->l('Compress Level'),
                    'name'  => 'bridgeconnector_compress_level',
                    'id'    => 'bridgeconnector_compress_level',
                    'desc'  => $this->l(
                        'Values between 1 and 9 will trade off speed and efficiency. The 1 flag means "fast but less
                        efficient" compression, and 9 means "slow but most efficient" compression.'
                    ),
                    'class' => 'fixed-width-xs'
                ),
                array(
                    'type'  => 'text',
                    'label' => $this->l('Selection Query Size'),
                    'name'  => 'bridgeconnector_limit_query_size',
                    'id'    => 'bridgeconnector_limit_query_size',
                    'desc'  => $this->l('Restrict capacity of queries per one request (kB).'),
                    'class' => 'fixed-width-xl'
                ),
                array(
                    'type'  => 'text',
                    'label' => $this->l('Package Size'),
                    'name'  => 'bridgeconnector_package_size',
                    'id'    => 'bridgeconnector_package_size',
                    'desc'  => 'Size of parts for getting dump file (kB).',
                    'class' => 'fixed-width-xl'
                ),
                array(
                    'type'  => 'text',
                    'label' => $this->l('Exclude Tables'),
                    'name'  => 'bridgeconnector_db_tables_invisible',
                    'id'    => 'bridgeconnector_db_tables_invisible',
                    'class' => 'bridgeconnector_invisible',
                ),
                array(
                    'type'  => 'hidden',
                    'name'  => 'bridgeconnector_db_tables_hidden',
                    'id'    => 'bridgeconnector_db_tables_hidden',
                ),
                array(
                    'type'  => 'text',
                    'label' => $this->l('Allowed IPs'),
                    'name'  => 'bridgeconnector_allowed_ips',
                    'id'    => 'bridgeconnector_allowed_ips',
                    'desc'  => $this->l(
                        'In order to allow module using only from specific IP address you should add IP address here
                        (for example, 48.78.88.98 - only one IP address; 48.78.88.98, 15.25.35.45 - two IP addresses;
                        48.78.x.x - all IP addresses which begin from 48.78.)'
                    ),
                ),
            ),
            'submit' => array(
                'title' => version_compare($this->cartVersion, '1.6.0.0', '<')
                    ? $this->l('Update settings')
                    : $this->l('Save'),
                'class' => 'btn btn-default pull-right'
            )
        );

        $fields_form[1]['form'] = array(
            'legend' => array(
                'title' => $this->l('Mobile Assistant Connector Settings'),
            ),
            'input' => array(
                array(
                    'type'  => 'text',
                    'label' => $this->l('Users'),
                    'name'  => 'mobassistantconnector_users',
                    'id'    => 'mobassistantconnector_users',
                    'class' => 'mobassistantconnector_invisible',
                ),
                array(
                    'type' => 'hidden',
                    'name' => 'mobassistantconnector_base_url',
                    'id'   => 'mobassistantconnector_base_url',
                ),
                array(
                    'type' => 'hidden',
                    'name' => 'mobassistantconnector_admin_module_url',
                    'id'   => 'mobassistantconnector_admin_module_url',
                ),
                array(
                    'type' => 'hidden',
                    'name' => 'mobassistantconnector_key',
                    'id'   => 'mobassistantconnector_key',
                ),
            ),
            'submit' => array(
                'title' => (Tools::substr($this->cartVersion, 0, 3) === '1.5')
                    ? $this->l('Update settings')
                    : $this->l('Save'),
                'class' => 'btn btn-default pull-right'
            )
        );

        $fields_form[2]['form'] = array(
            'legend' => array(
                'title' => $this->l('Get the Mobile Assistant for PrestaShop App from Google Play'),
            ),
            'input' => array(
                array(
                    'type'  => 'text',
                    'label' => $this->l('QR-code for the Mobile Assistant for PrestaShop App'),
                    'name'  => 'mobassistantconnector_qrcode_app',
                    'id'    => 'mobassistantconnector_qrcode_app',
                    'desc'  => 'Use your device camera to read the QR-code',
                    'class' => 'mobassistantconnector_invisible',
                ),
            )
        );

        $helper = new HelperForm();

        // Module, token and currentIndex
        $helper->module          = $this;
        $helper->name_controller = $this->name;
        $helper->token           = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex    = AdminController::$currentIndex . '&configure=' . $this->name;

        // Language
        $helper->default_form_language    = $default_lang;
        $helper->allow_employee_form_lang = $default_lang;

        // Title and toolbar
        $helper->title = $this->displayName;
        (version_compare($this->cartVersion, '1.6.0.0', '<')
            && version_compare($this->cartVersion, '1.5.0.0', '>='))
            ? $helper->show_toolbar = false
            : $helper->show_toolbar = true;         // false -> remove toolbar
        $helper->toolbar_scroll = true;             // yes -> Toolbar is always visible on the top of the screen.
        $helper->submit_action  = 'submit' . $this->name;
        $helper->toolbar_btn    = array(
            'save' =>
                array(
                    'desc' => $this->l('Save'),
                    'href' => AdminController::$currentIndex . '&configure=' . $this->name . '&save' . $this->name .
                        '&token=' . Tools::getAdminTokenLite('AdminModules'),
                ),
            'back' => array(
                'href' => AdminController::$currentIndex.'&token=' . Tools::getAdminTokenLite('AdminModules'),
                'desc' => $this->l('Back to list')
            )
        );

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFieldsValues($bridgeOptions),
            'languages'    => $this->context->controller->getLanguages(),
            'id_language'  => $this->context->language->id
        );

        // todo: find other way to clear old js files from web browser
        $cssSources = array(
            $this->_path . 'views/css/jquery-ui.min.css',
            $this->_path . 'views/css/mobassistantconnector.css',
            $this->_path . 'views/css/bridgeconnector.css'
        );

        if (version_compare($this->cartVersion, '1.6', '>=')) {
            $cssSources[] = $this->_path . 'views/css/1.5_more.css';
        }

        $jsSources = array(
            $this->_path . 'views/js/jquery-ui.min.js',
            $this->_path . 'views/js/qrcode.min.js',
            $this->_path . 'views/js/common.js'
        );

        if (version_compare($this->cartVersion, '1.6.0.0', '<')) {
            $jsSources[] = $this->_path . 'views/js/ps_1.5.js';
        } else {
            $jsSources[] = $this->_path . 'views/js/ps_1.6.js';
        }

        $this->context->controller->addCSS($cssSources);
        $this->context->controller->addJS($jsSources);

        $helper->fields_value['submitbridgeconnector'] = Configuration::get('submitbridgeconnector');
        return $helper->generateForm($fields_form);
    }

    /**
     * @param $bridge_options
     *
     * @return array
     */
    private function getConfigFieldsValues($bridge_options)
    {
        $baseUrl        = '';
        $adminModuleUrl = '';
        $languages      = Language::getLanguages(false);

        try {
            $shopUrl        = new ShopUrl((int)Configuration::get('PS_SHOP_DEFAULT'));
            $baseUrl        = self::prepareUrlProtocol($shopUrl->getURL(Configuration::get('PS_SSL_ENABLED')));
            $adminModuleUrl = AdminController::$currentIndex . "&configure=$this->name&token="
                . Tools::getAdminTokenLite('AdminModules') . "&tab_module=$this->tab&module_name=$this->name";
        } catch (PrestaShopDatabaseException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while get configuration fields - ' . $e->getMessage(),
                $this->eM1Logger->level
            );
        } catch (PrestaShopException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while get configuration fields - ' . $e->getMessage(),
                $this->eM1Logger->level
            );
        }

        $data = array(
            'bridgeconnector_login'               => $bridge_options['login'],
            'bridgeconnector_password'            => $bridge_options['password'],
            'bridgeconnector_tmp_dir'             => $bridge_options['tmp_dir'],
            'bridgeconnector_allow_compression'   => $bridge_options['allow_compression'],
            'bridgeconnector_compress_level'      => $bridge_options['compress_level'],
            'bridgeconnector_limit_query_size'    => $bridge_options['limit_query_size'],
            'bridgeconnector_package_size'        => $bridge_options['package_size'],
            'bridgeconnector_allowed_ips'         => $bridge_options['allowed_ips'],
            'bridgeconnector_db_tables_hidden'    => '',
            'bridgeconnector_db_tables_invisible' => '',
            'mobassistantconnector_tracknum_message_lng_all' => Configuration::get(
                EM1Constants::MODULE_TN_LNG
            ),
            'mobassistantconnector_qrcode_app' => '',
            'mobassistantconnector_users' => '',
            'mobassistantconnector_base_url' => $baseUrl,
            'mobassistantconnector_admin_module_url' => $adminModuleUrl,
            'mobassistantconnector_key' => hash('sha256', _COOKIE_KEY_),
        );

        foreach ($languages as $lang) {
            $data['mobassistantconnector_tracknum_template_text'][$lang['id_lang']] = Configuration::get(
                EM1Constants::MODULE_TN_TEXT,
                $lang['id_lang']
            );
        }

        return $data;
    }

    private function saveBridgeData($is_submit = false)
    {
        $config = array();

        if ($is_submit) {
            $excluded_tables = Tools::getValue('bridgeconnector_exclude_db_tables_checked');

            $stored_data                 = unserialize(Configuration::get(EM1Constants::OPTIONS_KEY));
            $config['login']             = (string)Tools::getValue('bridgeconnector_login');
            $config['password']          = $this->getDecryptedPassword($stored_data['password']);
            $config['tmp_dir']           = (string)Tools::getValue('bridgeconnector_tmp_dir');
            $config['allow_compression'] = (int)Tools::getValue('bridgeconnector_allow_compression');
            $config['compress_level']    = (int)Tools::getValue('bridgeconnector_compress_level');
            $config['limit_query_size']  = (int)Tools::getValue('bridgeconnector_limit_query_size');
            $config['package_size']      = (int)Tools::getValue('bridgeconnector_package_size');
            $config['exclude_db_tables'] = !empty($excluded_tables) ? implode(';', $excluded_tables) : array();
            $config['allowed_ips']       = (string)Tools::getValue('bridgeconnector_allowed_ips');
            $config['last_clear_date']   = isset($stored_data['last_clear_date'])
                ? (int)$stored_data['last_clear_date']
                : time();

            $request_password = Tools::getValue('bridgeconnector_password');

            if (Tools::strlen($request_password) > 0) {
                $config['password'] = $request_password;
            }

            $config = $this->prepareData($config);
        } else {
            $config['login']             = EM1Constants::BRIDGECONNECTOR_DEFAULT_LOGIN;
            $config['password']          = EM1Constants::BRIDGECONNECTOR_DEFAULT_PASSWORD;
            $config['tmp_dir']           = $this->defaultTmpDirectory;
            $config['allow_compression'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_ALLOW_COMPRESSION;
            $config['compress_level']    = EM1Constants::BRIDGECONNECTOR_DEFAULT_COMPRESS_LEVEL;
            $config['limit_query_size']  = EM1Constants::BRIDGECONNECTOR_DEFAULT_LIMIT_QUERY_SIZE;
            $config['package_size']      = EM1Constants::BRIDGECONNECTOR_DEFAULT_PACKAGE_SIZE;
            $config['exclude_db_tables'] = implode(';', $this->getDefaultExcludedTables());
            $config['allowed_ips']       = EM1Constants::BRIDGECONNECTOR_DEFAULT_ALLOWED_IPS;
            $config['last_clear_date']   = time();
        }

        $config['bridge_hash'] = md5($config['login'] . $config['password']);
        $config['password']    = $this->getEncryptedPassword($config['password']);

        return Configuration::updateGlobalValue(EM1Constants::OPTIONS_KEY, serialize($config));
    }

    public function hookActionValidateOrder($params)
    {
        if (Module::isEnabled($this->name)) {
            $this->sendNewOrderMessage($params);
        }
    }

    public function hookActionOrderStatusPostUpdate($params)
    {
        if ((!isset($GLOBALS['hookNewOrder']) || $GLOBALS['hookNewOrder'] !== 1) && Module::isEnabled($this->name)) {
            $this->sendOrderStatusChangeMessage($params);
        }
    }

    public function hookActionCustomerAccountAdd($params)
    {
        if (Module::isEnabled($this->name)) {
            $this->sendCreateAccountMessage($params);
        }
    }

    public function hookActionOrderHistoryAddAfter($params)
    {
        // create first status and order history at all/ change orders status/ ?
        if (Module::isEnabled($this->name)) {
            $this->sendOrderHistoryUpdate($params);
        }
    }

    public function hookActionAdminCustomerThreadsControllerDeleteAfter($params)
    {
        // to create custom webhook use action+ControllerName+acrion+before/after
        if (Module::isEnabled($this->name)) {
            $this->sendDeleteCustomerThreadMessage($params);
        }
    }

    public function hookActionObjectCustomerMessageAddAfter($params)
    {
        // forward/send message/customer send from account/contact form
        if (Module::isEnabled($this->name)) {
            switch (true) {
                // Forward message to employee or other email
                case (isset($_REQUEST['id_employee_forward'], $_REQUEST['submitForward'])
                    && (
                        ($_REQUEST['id_employee_forward'] > 0)
                        || ((string)$_REQUEST['id_employee_forward'] === '0' && !empty($_REQUEST['email']))
                    )
                    && !empty($_REQUEST['message_forward'])
                ):
                    break;
                // From Admin Customer Service reply
                case (
                    isset($_REQUEST['submitReply']) && !empty($_REQUEST['msg_email'])
                    && !empty($_REQUEST['reply_message'])
                ):
                    break;
                // From Admin Order messages
                case (
                    !empty($_REQUEST['id_order']) && !empty($_REQUEST['id_customer'])
                    && !empty($_REQUEST['submitMessage']) && !empty($_REQUEST['message'])
                    && (isset($_REQUEST['order_message']) || $_REQUEST['order_message'] === '0')
                ):
                    break;
                // From Customer Account to specific order
                case (
                    isset($_REQUEST['submitMessage']) && !empty($_REQUEST['id_order']) && !empty($_REQUEST['msgText'])
                ):
                    break;
                // From Contact Form reply
                case (
                    !empty($_REQUEST['id_order']) && $_REQUEST['message']
                    && (string)$_REQUEST['submitMessage'] === 'Send' && $_REQUEST['from']
                ):
                    break;
            }

            // for forward message write other logic
            $this->sendCustomerThreadNewMessage($params);
        }
    }

    public function hookActionObjectCustomerThreadAddAfter($params)
    {
        // Customer new thread/ contact us form / order create if not exists
        file_put_contents('./hook.log', var_export($params, true), FILE_APPEND);
//        var_dump($params);
    }

    public function sendOrderHistoryUpdate($params)
    {
        if (array_key_exists('object', $params) && !empty($params['object'])) {
            $activeDevices = $this->getActiveDevices();

            $notificationType = 'new_customer_thread_message';
            $customerThreadActions = $params['object'];
            foreach ($activeDevices as $device) {
                $device = $this->preparePushSettings($device);

                $registrationId  = $device['registration_id'];
                $appConnectionId = $device['app_connection_id'];

                if (!empty($appConnectionId)
                    && !empty($registrationId)
                ) {
                    $fileLink = '';
                    if (isset($customerThreadActions->file_name)
                        && file_exists(_PS_UPLOAD_DIR_ . $customerThreadActions->file_name)
                        && Validate::isFileName($customerThreadActions->file_name)
                    ) {
//                        $fileLink = EM1Main::getUploadedFileLink($customerThreadActions->file_name);
                    }

                    $employeeId = (int)$customerThreadActions->id_employee;
                    /** @var EmployeeCore $employee */
                    $employee = new Employee($employeeId);
                    $employeeFullName = ($employee->firstname . ' ' . $employee->lastname);
                    $orderMessageTimestamp = strtotime($customerThreadActions->date_add);
                    $orderMessageTimestamp = $orderMessageTimestamp * 1000; // workaround EM1Main::convertTimestampToMillisecondsTimestamp($orderMessageTimestamp)

                    $response = $this->sendFCM(array(
                        'notification_type' => $notificationType,
                        'app_connection_id' => (string)$appConnectionId,
                        'customer_thread_id' => (int)$customerThreadActions->id_customer_thread,
                        'message_id' => (int)$customerThreadActions->id,
                        'employee_id' => $employeeId,
                        'from' => $employeeFullName,
                        'message' => (string)$customerThreadActions->message,
                        'url_attachment' => (int)$fileLink,
                        'is_private' => (bool)$customerThreadActions->private,
                        'date_add' => $orderMessageTimestamp,
                    ), $registrationId);

                    $this->proceedFCMResponse($response, $registrationId);
                }
            }
        }
    }

    public function sendDeleteCustomerThreadMessage($params)
    {
        if (array_key_exists('return', $params) && !empty($params['return'])) {
            $activeDevices = $this->getActiveDevices();

            $notificationType = 'deleted_customer_thread';
            $deletedCustomerThread = $params['return'];
            foreach ($activeDevices as $device) {
                $device = $this->preparePushSettings($device);

                $registrationId  = $device['registration_id'];
                $appConnectionId = $device['app_connection_id'];

                if (!empty($appConnectionId)
                   && !empty($registrationId)
                ) {
                    $response = $this->sendFCM(array(
                       'notification_type' => $notificationType,
                       'app_connection_id' => (string)$appConnectionId,
                       'thread_id' => (int)$deletedCustomerThread['id'],
                       'shop_id' => (int)$deletedCustomerThread['id_shop'],
                       'language_id' => (int)$deletedCustomerThread['id_lang'],
                       'order_id' => (int)$deletedCustomerThread['id_order'],
                       'customer_id' => (int)$deletedCustomerThread['id_customer']
                    ), $registrationId);

                    $this->proceedFCMResponse($response, $registrationId);
                }
            }
        }
    }

    public function sendCustomerThreadNewMessage($params)
    {
        if (array_key_exists('object', $params) && !empty($params['object'])) {
            $activeDevices = $this->getActiveDevices();

            $notificationType = 'new_customer_thread_message';
            $customerThreadActions = $params['object'];
            foreach ($activeDevices as $device) {
                $device = $this->preparePushSettings($device);

                $registrationId  = $device['registration_id'];
                $appConnectionId = $device['app_connection_id'];

                if (!empty($appConnectionId)
                    && !empty($registrationId)
                ) {
                    $fileLink = '';
                    if (isset($customerThreadActions->file_name)
                        && file_exists(_PS_UPLOAD_DIR_ . $customerThreadActions->file_name)
                        && Validate::isFileName($customerThreadActions->file_name)
                    ) {
//                        $fileLink = EM1Main::getUploadedFileLink($customerThreadActions->file_name);
                    }

                    $employeeId = (int)$customerThreadActions->id_employee;
                    /** @var EmployeeCore $employee */
                    $employee = new Employee($employeeId);
                    $employeeFullName = ($employee->firstname . ' ' . $employee->lastname);
                    $orderMessageTimestamp = strtotime($customerThreadActions->date_add);
                    $orderMessageTimestamp = $orderMessageTimestamp * 1000; // workaround EM1Main::convertTimestampToMillisecondsTimestamp($orderMessageTimestamp)

                    $response = $this->sendFCM(array(
                        'notification_type' => $notificationType,
                        'app_connection_id' => (string)$appConnectionId,
                        'customer_thread_id' => (int)$customerThreadActions->id_customer_thread,
                        'message_id' => (int)$customerThreadActions->id,
                        'employee_id' => $employeeId,
                        'from' => $employeeFullName,
                        'message' => (string)$customerThreadActions->message,
                        'url_attachment' => (int)$fileLink,
                        'is_private' => (bool)$customerThreadActions->private,
                        'date_add' => $orderMessageTimestamp,
                    ), $registrationId);

                    $this->proceedFCMResponse($response, $registrationId);
                }
            }
        }
    }

    private function sendOrderStatusChangeMessage($data)
    {
        $activeDevices = $this->getActiveDevices();

        $notificationType = 'order_status_changed';

        try {
            $order    = new Order($data['id_order']);
            $customer = $order->getCustomer();
        } catch (PrestaShopDatabaseException $e) {
            EM1Main::generateResponse(array(), 'could_not_load_order_object');
        } catch (PrestaShopException $e) {
            EM1Main::generateResponse(array(), 'could_not_load_order_object');
        }

        $statusId = (int)$data['newOrderStatus']->id;
        foreach ($activeDevices as $device) {
            $device                    = $this->preparePushSettings($device);
            $excludedPushOrderStatuses = $this->getPushStatuses($device['not_notified_order_status_ids']);

            $registrationId  = $device['registration_id'];
            $appConnectionId = $device['app_connection_id'];

            if (!empty($appConnectionId)
                && !empty($registrationId)
                && $device['status'] === 1
                && $device['push_order_statuses'] === 1
                && !in_array($statusId, $excludedPushOrderStatuses, true)
            ) {

                /** @var $order */
                /** @var $customer */
                $response = $this->sendFCM(array(
                    'notification_type'     => $notificationType,
                    'app_connection_id'     => (string)$appConnectionId,
                    'shop_id'               => (int)$order->id_shop,
                    'order_id'              => (int)$order->id,
                    'reference'             => (string)$order->reference,
                    'customer_id'           => (int)$customer->id,
                    'customer_email'        => (string)$customer->email,
                    'customer_first_name'   => (string)$customer->firstname,
                    'customer_last_name'    => (string)$customer->lastname,
                    'status_id'             => $statusId,
                    'total'                 => round((float)$order->total_paid, 6),
                    'formatted_total'       => (string)Tools::displayPrice(
                        (float)$order->total_paid,
                        Currency::getCurrencyInstance((int)$order->id_currency)
                    ),
                    'date_add'              => (float)$order->date_add,
                    'products_count'        => count($order->getOrderDetailList()),
                ), $registrationId);

                $this->proceedFCMResponse($response, $registrationId);
            }
        }
    }

    private function sendCreateAccountMessage($data)
    {
        $activeDevices = $this->getActiveDevices();

        $notificationType = 'new_customer';
        $customer         = $data['newCustomer'];
        foreach ($activeDevices as $device) {
            $device          = $this->preparePushSettings($device);

            $registrationId  = $device['registration_id'];
            $appConnectionId = $device['app_connection_id'];

            if (!empty($appConnectionId)
                && !empty($registrationId)
                && $device['push_new_customer'] === 1
            ) {
                $response = $this->sendFCM(array(
                    'notification_type'         => $notificationType,
                    'app_connection_id'         => (string)$appConnectionId,
                    'shop_id'                   => (int)$customer->id_shop,
                    'customer_id'               => (int)$customer->id,
                    'email'                     => (string)$customer->email,
                    'first_name'                => (string)$customer->firstname,
                    'last_name'                 => (string)$customer->lastname,
                    'date_add'                  => (int)strtotime($customer->date_add),
                    'orders_count'              => 0,
                    'orders_total'              => 0,
                    'formatted_orders_total'    => (string)Tools::displayPrice(
                        (float)0,
                        Currency::getCurrencyInstance(1)
                    )
                ), $registrationId);

                $this->proceedFCMResponse($response, $registrationId);
            }
        }
    }

    private function sendNewOrderMessage($data)
    {
        $activeDevices      = $this->getActiveDevices();
        $order              = $data['order'];
        $customer           = $data['customer'];
        $notificationType   = 'new_order';

        $GLOBALS['hookNewOrder'] = 1;
        $statusId                = $data['orderStatus']->id;
        foreach ($activeDevices as $device) {
            $device          = $this->preparePushSettings($device);
            $registrationId  = $device['registration_id'];
            $appConnectionId = $device['app_connection_id'];
            if (!empty($appConnectionId)
                && !empty($registrationId)
                && $device['push_new_order'] === 1
                && $device['status'] === 1
            ) {
                $data = array(
                    'notification_type'     => $notificationType,
                    'app_connection_id'     => (string)$appConnectionId,
                    'shop_id'               => (int)$order->id_shop,
                    'order_id'              => (int)$order->id,
                    'reference'             => (string)$order->reference,
                    'customer_id'           => (int)$customer->id,
                    'customer_email'        => (string)$customer->email,
                    'customer_first_name'   => (string)$customer->firstname,
                    'customer_last_name'    => (string)$customer->lastname,
                    'status_id'             => (int)$statusId,
                    'total'                 => round((float)$order->total_paid, 6),
                    'formatted_total'       => (string)Tools::displayPrice(
                        (float)$order->total_paid,
                        Currency::getCurrencyInstance((int)$order->id_currency)
                    ),
                    'date_add'              => (int)strtotime($order->date_add),
                    'products_count'        => count($order->product_list)
                );
                $response = $this->sendFCM($data, $registrationId);

                $this->proceedFCMResponse($response, $registrationId);
            }
        }
    }

    private function getEncryptedPassword($data)
    {
        // rework deprecated mcrypt_encrypt function
        return call_user_func(
            'base64_encode',
            openssl_encrypt(
                $data,
                'aes-192-ecb',
                EM1Constants::CRYPT_KEY,
                OPENSSL_RAW_DATA
            )
        );
    }

    private function getDecryptedPassword($data)
    {
        // rework deprecated mcrypt_decrypt function
        return trim(
            preg_replace(
                "/(^\s+)|(\s+$)/us",
                '',
                openssl_decrypt(
                    call_user_func(
                        'base64_decode',
                        $data
                    ),
                    'aes-192-ecb',
                    EM1Constants::CRYPT_KEY,
                    OPENSSL_RAW_DATA | OPENSSL_ZERO_PADDING
                )
            ),
            "\x00..\x1F"
        );
    }

    private function prepareData($config)
    {
        // trim '/', '\', '.' from begin and end
        $config['tmp_dir'] = preg_replace('/^[\/|\\\|\.]*|[\/|\\\|\.]*$/', '', $config['tmp_dir']);

        // add '/' to begin
        $config['tmp_dir'] = '/' . $config['tmp_dir'];

        if ($config['compress_level'] < EM1Constants::BRIDGECONNECTOR_MIN_COMPRESS_LEVEL) {
            $config['compress_level'] = EM1Constants::BRIDGECONNECTOR_MIN_COMPRESS_LEVEL;
        } elseif ($config['compress_level'] > EM1Constants::BRIDGECONNECTOR_MAX_COMPRESS_LEVEL) {
            $config['compress_level'] = EM1Constants::BRIDGECONNECTOR_MAX_COMPRESS_LEVEL;
        }

        if ($config['limit_query_size'] < EM1Constants::BRIDGECONNECTOR_MIN_LIMIT_QUERY_SIZE) {
            $config['limit_query_size'] = EM1Constants::BRIDGECONNECTOR_MIN_LIMIT_QUERY_SIZE;
        } elseif ($config['limit_query_size'] > EM1Constants::BRIDGECONNECTOR_MAX_LIMIT_QUERY_SIZE) {
            $config['limit_query_size'] = EM1Constants::BRIDGECONNECTOR_MAX_LIMIT_QUERY_SIZE;
        }

        if ($config['package_size'] < EM1Constants::BRIDGECONNECTOR_MIN_PACKAGE_SIZE) {
            $config['package_size'] = EM1Constants::BRIDGECONNECTOR_MIN_PACKAGE_SIZE;
        } elseif ($config['package_size'] > EM1Constants::BRIDGECONNECTOR_MAX_PACKAGE_SIZE) {
            $config['package_size'] = EM1Constants::BRIDGECONNECTOR_MAX_PACKAGE_SIZE;
        }

        return $config;
    }

    private function getDefaultExcludedTables()
    {
        $query = array();
        try {
            $query = Db::getInstance()->executeS(
                "SELECT `table_name`
                    FROM information_schema.tables
                    WHERE table_schema = '" . _DB_NAME_ . "'
                        AND table_name NOT LIKE '" . str_replace('_', '\_', _DB_PREFIX_) . "%'"
            );

            if (!is_array($query)) {
                $this->eM1Logger->logMessageCall(
                    'Failed while executing query',
                    $this->eM1Logger->level
                );
            }
        } catch (PrestaShopDatabaseException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while executing query - ' . $e->getMessage(),
                $this->eM1Logger->level
            );
        }

        $tableExcluded = array(
            _DB_PREFIX_ . 'connections',
            _DB_PREFIX_ . 'guest',
            _DB_PREFIX_ . 'pagenotfound',
            _DB_PREFIX_ . 'log',
        );

        foreach ($query as $table) {
            $tableExcluded[] = $table;
        }

        return $tableExcluded;
    }

    private function getModuleVersion()
    {
        $dbQuery = new DbQuery();

        try {
            $query = Db::getInstance()->executeS(
                $dbQuery->select('version')
                    ->from('module')
                    ->where('id_module = ' . (int)$this->id)
                    ->build()
            );

            if (!is_array($query)) {
                $this->eM1Logger->logMessageCall(
                    'Failed while executing query',
                    $this->eM1Logger->level
                );
                return false;
            }
        } catch (PrestaShopDatabaseException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while executing query - ' . $e->getMessage(),
                $this->eM1Logger->level
            );
            return false;
        } catch (PrestaShopException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while executing query - ' . $e->getMessage(),
                $this->eM1Logger->level
            );
            return false;
        }

        return count($query) > 0 ? $query[0]['version'] : false;
    }

    private function createTables()
    {
        return $this->createBridgeconnectorMATableUsers()
            && $this->createBridgeconnectorMATableTokens()
            && $this->createBridgeconnectorMATableFailedLogin()
            && $this->createBridgeconnectorMATablePushNotifications()
            && $this->createBridgeconnectorTableSessionKeys()
            && $this->createBridgeconnectorTableFailedLogin();
    }

    private function dropTables()
    {
        // Drop table `bridgeconnector_ma_session_keys`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_TOKENS . '`';
        $tableDropMobileAssistantTokens = Db::getInstance()->execute($sql);

        // Drop table `bridgeconnector_ma_failed_login`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_FAILED_LOGIN . '`';
        $tableDropMobileAssistantFailedAttempts = Db::getInstance()->execute($sql);

        // Drop table `bridgeconnector_ma_push_notifications`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_PUSH_NOTIFICATIONS . '`';
        $tableDropMobileAssistantPushNotifications = Db::getInstance()->execute($sql);

        // Drop table `bridgeconnector_ma_users`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '`';
        $dropTableMobileAssistantUsers = Db::getInstance()->execute($sql);

        // Drop table `bridgeconnector_session_keys`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_BC_SESSION_KEYS . '`';
        $dropTableBridgeconnectorSessionKeys = Db::getInstance()->execute($sql);

        // Drop table `bridgeconnector_failed_login`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_BC_FAILED_LOGIN . '`';
        $dropTableBridgeconnectorFailedLogin = Db::getInstance()->execute($sql);

        return $tableDropMobileAssistantTokens
            && $tableDropMobileAssistantFailedAttempts
            && $tableDropMobileAssistantPushNotifications
            && $dropTableMobileAssistantUsers
            && $dropTableBridgeconnectorSessionKeys
            && $dropTableBridgeconnectorFailedLogin;
    }

    private function getActiveDevices()
    {
        $query   = array();
        $dbQuery = new DbQuery();
        try {
            $query = Db::getInstance()->executeS(
                $dbQuery->select('
                    mpn.`id`,
                    mpn.`registration_id`,
                    mpn.`app_connection_id`,
                    mu.`status`,
                    mpn.`push_new_customer`,
                    mpn.`push_new_order`,
                    mpn.`push_order_statuses`,
                    mpn.`not_notified_order_status_ids`
                ')
                    ->from(EM1Constants::TABLE_MA_PUSH_NOTIFICATIONS, 'mpn')
                    ->leftJoin(EM1Constants::TABLE_MA_USERS, 'mu', 'mu.`user_id` = mpn.`user_id`')
                    ->where('mu.`status` = 1')
                    ->build()
            );

            if (!is_array($query)) {
                $this->eM1Logger->logMessageCall(
                    'Failed while executing query',
                    $this->eM1Logger->level
                );
            }
        } catch (PrestaShopDatabaseException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while executing query - ' . $e->getMessage(),
                $this->eM1Logger->level
            );
        } catch (PrestaShopException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while executing query - ' . $e->getMessage(),
                $this->eM1Logger->level
            );
        }

        return $query;
    }

    private function preparePushSettings($data)
    {
        if (!is_array($data)) {
            $data = array();
        }

        $data['registration_id'] = (!isset($data['registration_id']) || $data['registration_id'] === null)
            ? ''
            : (string)$data['registration_id'];
        $data['app_connection_id'] = empty((string)$data['app_connection_id'])
            ? ''
            : (string)$data['app_connection_id'];
        $data['status'] = !isset($data['status'])
            ? 1
            : (int)$data['status'];
        $data['push_new_customer'] = !isset($data['push_new_customer'])
            ? 1
            : (int)$data['push_new_customer'];
        $data['push_new_order'] = !isset($data['push_new_order'])
            ? 1
            : (int)$data['push_new_order'];
        $data['push_order_statuses'] = !isset($data['push_order_statuses'])
            ? 1
            : (int)$data['push_order_statuses'];
        $data['not_notified_order_status_ids'] = !isset($data['not_notified_order_status_ids'])
            ? ''
            : (string)$data['not_notified_order_status_ids'];

        return $data;
    }

    private function getPushStatuses($data)
    {
        $statuses = array();

        if (!$data || !is_string($data)) {
            return $statuses;
        }

        $statuses = explode(',', $data);
        foreach ($statuses as $status) {
            $status[] = (int)trim($status);
        }

        return $statuses;
    }

    private function createBridgeconnectorTableSessionKeys()
    {
        // Create table `bridgeconnector_session_keys`
        $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_BC_SESSION_KEYS . '` (
            `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
            `session_key` VARCHAR(100) NOT NULL,
            `date_added` DATETIME NOT NULL,
            `last_activity` DATETIME NOT NULL,
            PRIMARY KEY (`id`))';
        return Db::getInstance()->execute($sql);
    }

    private function createBridgeconnectorTableFailedLogin()
    {
        // Create table `bridgeconnector_failed_login`
        $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_BC_FAILED_LOGIN . '` (
            `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
            `ip` VARCHAR(20) NOT NULL,
            `date_added` DATETIME NOT NULL,
            PRIMARY KEY (`id`))';

        return Db::getInstance()->execute($sql);
    }

    private function createBridgeconnectorMATableTokens()
    {
        // Create table `bridgeconnector__ma_tokens`
        $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_TOKENS . '` (
            `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
            `token` VARCHAR(100) NOT NULL,
            `user_id` INT(10),
            `date_added` DATETIME NOT NULL,
            PRIMARY KEY (`id`),
            UNIQUE KEY UNIQUE_KEY_BRIDGECONNECTOR_MA_USER_ID (`user_id`))';

        return Db::getInstance()->execute($sql);
    }

    private function createBridgeconnectorMATableFailedLogin()
    {
        $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_FAILED_LOGIN . '` (
            `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
            `ip` VARCHAR(50) NOT NULL,
            `date_added` DATETIME NOT NULL,
            PRIMARY KEY (`id`))';

        return Db::getInstance()->execute($sql);
    }

    private function createBridgeconnectorMATablePushNotifications()
    {
        $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_PUSH_NOTIFICATIONS . '` (
            `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
            `user_id` INT(10),
            `app_connection_id` VARCHAR(100),
            `registration_id` VARCHAR(200),
            `push_new_customer` TINYINT,
            `push_new_order` TINYINT,
            `push_order_statuses` TINYINT,
            `not_notified_order_status_ids` VARCHAR(200),
            PRIMARY KEY (`id`))';

        return Db::getInstance()->execute($sql);
    }

    private function createBridgeconnectorMATableUsers()
    {
        $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '` (
            `user_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
            `username` VARCHAR(100) NOT NULL,
            `password` VARCHAR(35) NOT NULL,
            `employee_id` VARCHAR(5),
            `allowed_actions` VARCHAR(1000),
            `qr_code_hash` VARCHAR(70),
            `status` TINYINT,
            PRIMARY KEY (`user_id`),
            UNIQUE KEY UNQ_MOB_USER (`username`))';

        return Db::getInstance()->execute($sql);
    }

    private function addEmployeeIdColumnToMATableUsers()
    {
        $sql = 'ALTER TABLE `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '` 
                ADD COLUMN `employee_id` VARCHAR(5)';

        return Db::getInstance()->execute($sql);
    }

    private function addEmployeeIdValueToExistingUsers()
    {
        $employeeId = Db::getInstance()->getValue(
            'SELECT id_employee FROM ' . _DB_PREFIX_ . 'employee WHERE active = 1;'
        );
        $sql = 'UPDATE `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '`
                SET employee_id = ' . $employeeId .
                ' WHERE employee_id IS NULL';

        return Db::getInstance()->execute($sql);
    }

    private function getActionsCodes()
    {
        $preparedActions = array();
        $actions         = emoGetRestrictedActions();
        foreach ($actions as $action) {
            foreach ($action['items'] as $item) {
                $preparedActions[] = $item['code'];
            }
        }

        return $preparedActions;
    }

    private function populateTableUsers()
    {
        $count = (int)Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '`'
        );

        if ($count > 0) {
            return true;
        }

        return Db::getInstance()->insert(
            EM1Constants::TABLE_MA_USERS,
            array(
                'username'        => 'user',
                'password'        => md5(time()),
                'employee_id'     => (int)Context::getContext()->employee->id,
                'allowed_actions' => pSQL(implode(';', $this->getActionsCodes())),
                'qr_code_hash'    => hash('sha256', time()),
                'status'          => 1,
            )
        );
    }

    private function checkAndUpdateToNewVersion()
    {
        $moduleVersion = $this->getModuleVersion();
        if (!$moduleVersion) {
            return;
        }

        if (version_compare($moduleVersion, $this->version, '<')) {
            // Update module version in database
            if (version_compare($moduleVersion, '2.0', '<')) {
                $this->createBridgeconnectorMATableUsers();
                $this->createBridgeconnectorMATableTokens();
                $this->createBridgeconnectorMATablePushNotifications();
                $this->createBridgeconnectorMATableFailedLogin();

                $this->addPermissionsOnUpdate();
            }
            $isNewUserAdded = $this->addDefaultUserOnUpdate();
            $this->addNewUserPermissions();
            if (version_compare($moduleVersion, '3.0.4', '<')) {
                $this->addEmployeeIdColumnToMATableUsers();
            }
            if (!$isNewUserAdded) {
                $this->addEmployeeIdValueToExistingUsers();
            }

            self::upgradeModuleVersion($this->name, $this->version);
            $this->_generateConfigXml();
        }
    }

    private function addDefaultUserOnUpdate()
    {
        $count = (int)Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '`'
        );

        if ($count > 0) {
            return false;
        }
        $employeeId = Db::getInstance()->getValue(
            'SELECT id_employee FROM ' . _DB_PREFIX_ . 'employee WHERE active = 1 LIMIT 1;'
        );

        Db::getInstance()->insert(
            EM1Constants::TABLE_MA_USERS,
            array(
                'username'        => 'user',
                'password'        => md5(time()),
                'employee_id'     => $employeeId,
                'allowed_actions' => pSQL(implode(';', $this->getActionsCodes())),
                'qr_code_hash'    => hash('sha256', time()),
                'status'          => 1,
            )
        );

        return true;
    }

    private function addPermissionsOnUpdate()
    {
        $count = (int)Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '`'
        );

        if ($count > 0) {
            Db::getInstance()->update(
                EM1Constants::TABLE_MA_USERS,
                array(
                    'allowed_actions' => pSQL(implode(';', $this->getActionsCodes())),
                )
            );
        }
    }

    private function addNewUserPermissions()
    {
        $users = array();
        try {
            $users = Db::getInstance()->executeS(
                'SELECT `user_id`, `allowed_actions` FROM `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_USERS . '`'
            );

            if (!is_array($users)) {
                $this->eM1Logger->logMessageCall(
                    'Executing of query in function \'addNewUserPermissions\' was failed',
                    $this->eM1Logger->level
                );

                return;
            }
        } catch (PrestaShopDatabaseException $e) {
            $this->eM1Logger->logMessageCall(
                'Exception while executing query in function \'addNewUserPermissions\' - ' . $e->getMessage(),
                $this->eM1Logger->level
            );

            return;
        }

        $userAllPermissions        = $this->getActionsCodes();
        $userAllPermissionsCount   = count($userAllPermissions);
        $addedInReleaseRequests    = EM1Constants::MA_MODULE_NEW_REQUESTS;
        foreach ($users as $user) {
            $userPermissions = explode(';', $user['allowed_actions']);
            if (empty($userPermissions)) {
                continue;
            }

            $userPermissionsCount = count($userPermissions);
            if (($userAllPermissionsCount - $userPermissionsCount) !== $addedInReleaseRequests) {
                continue;
            }

            Db::getInstance()->update(
                EM1Constants::TABLE_MA_USERS,
                array(
                    'allowed_actions' => pSQL(implode(';', $userAllPermissions)),
                ),
                '`user_id` = ' . (int)$user['user_id']
            );
        }
    }

    private static function getCurrentProtocol()
    {
        return (!empty($_SERVER['HTTPS']) && Tools::strtolower($_SERVER['HTTPS']) !== 'off') ? 'https://' : 'http://';
    }

    private static function prepareUrlProtocol($url)
    {
        return self::getCurrentProtocol() . str_replace(array('http://', 'https://'), '', $url);
    }

    //todo use other way to send if curl not active

    /**
     * @param $dataBody
     * @param $registrationId
     *
     * @return bool|string
     */
    private function sendFCM($dataBody, $registrationId)
    {
        $result = false;
        if (is_callable('curl_init')) {
            $data = array(
                'to'            => $registrationId,
                // If we ever will work with notification title/body.
                // Should be fixed firstly from firebase side - https://github.com/firebase/quickstart-android/issues/4
                // 'notification'  => array(
                //     'body'          => $notificationTitle,
                //     'title'         => $notificationBody,
                //     'icon'          => 'ic_launcher',
                //     'sound'         => 'default',
                //     'badge'         => '1'
                // ),
                'data'          => $dataBody,
                'priority'      => 'high'
            );

            $headers = array(
                'Authorization: key=' . EM1Constants::FSM_SERVER_KEY,
                'Content-Type: application/json'
            );

            $url = 'https://fcm.googleapis.com/fcm/send';
            $ch  = curl_init();
            // Disabled Inspection in some cases
            /** @noinspection CurlSslServerSpoofingInspection */
            curl_setopt_array(
                $ch,
                array(
                    CURLOPT_URL             => $url,
                    CURLOPT_POST            => true,
                    CURLOPT_HTTPHEADER      => $headers,
                    CURLOPT_RETURNTRANSFER  => true,
                    CURLOPT_SSL_VERIFYHOST  => 0,
                    CURLOPT_SSL_VERIFYPEER  => false,
                    CURLOPT_POSTFIELDS      => json_encode($data)
                )
            );

            $result = curl_exec($ch);

            if ($result === false && curl_errno($ch)) {
                $this->eM1Logger->logMessageCall(
                    'Push message error while sending CURL request: ' . $result .
                    ' registration_id=' . $registrationId .
                    ' curl_error=' . curl_error($ch),
                    $this->eM1Logger->level
                );
            }

            curl_close($ch);
        }

        return $result;
    }

    private function proceedFCMResponse($response, $registrationId)
    {
        $json = array();
        if ($response && !empty($response)) {
            $json = json_decode($response, true);

            if (!is_array($json)) {
                $json = array();
            }
        }

        if (empty($json) || !isset($json['results'])) {
            return;
        }

        $results = is_array($json['results']) ? $json['results'] : array();

        foreach ($results as $result) {
            if ((isset($result['registration_id'], $json['canonical_ids'])
                    && (int)$json['canonical_ids'] > 0) || (isset($result['error'])
                    && ($result['error'] === 'NotRegistered' || $result['error'] === 'InvalidRegistration'))
            ) {
                if ((int)$json['canonical_ids'] > 0 && isset($result['registration_id'], $json['canonical_ids'])) {
                    // Delete old records if new push settings are stored
                    Db::getInstance()->execute(
                        'DELETE mp FROM `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_PUSH_NOTIFICATIONS . '` mp
                        LEFT JOIN `' . _DB_PREFIX_ . EM1Constants::TABLE_MA_PUSH_NOTIFICATIONS
                        . "` pn1 ON pn1.`app_connection_id` = pn.`app_connection_id` AND pn1.`user_id` = pn.`user_id`
                        WHERE pn.`registration_id` = '$registrationId'
                        AND pn1.`registration_id` = '{$result['registration_id']}'"
                    );

                    // Replace old registration ids with new
                    Db::getInstance()->update(
                        EM1Constants::TABLE_MA_PUSH_NOTIFICATIONS,
                        array('registration_id' => $result['registration_id']),
                        "registration_id = '$registrationId'"
                    );
                } else {
                    Db::getInstance()->delete(
                        EM1Constants::TABLE_MA_PUSH_NOTIFICATIONS,
                        "registration_id = '$registrationId'"
                    );
                    $this->eM1Logger->logMessageCall(
                        "Google error response: {$response}",
                        $this->eM1Logger->level
                    );
                }
            }
        }
    }
}
