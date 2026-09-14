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
 * @copyright 2014-2025 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * @property int $is_configurable
 * @property string $confirmUninstall
 * @property bool $bootstrap
 * @property string $defaultShop
 */
class Bridgeconnector extends Module
{
    private $eM1Logger;
    private $cartVersion;
    private $defaultTmpDirectory;

    public $is_configurable;
    public $defaultShop;

    public function __construct()
    {
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/classes/helper/EM1Constants.php';
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/classes/helper/EM1FileLogger.php';
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/functions/functions.php';
        include_once _PS_MODULE_DIR_ . '/bridgeconnector/functions/for_ajax.php';

        // Module settings
        $this->name = 'bridgeconnector';
        $this->tab = 'others';
        $this->version = '4.0.0';
        $this->author = 'eMagicOne';
        $this->module_key = '0d90a4ec7c4a83fa979f710a1ead2c72';
        $this->need_instance = 0;
        $this->is_configurable = 1;
        $this->bootstrap = true;

        $this->cartVersion = Configuration::get('PS_INSTALL_VERSION');
        $this->defaultShop = Configuration::get('PS_SHOP_DEFAULT');
        $this->defaultTmpDirectory = '/modules/' . $this->name . '/tmp';

        if (Tools::getIsset('auth_key')) {
            include_once _PS_MODULE_DIR_ . '/bridgeconnector/functions/ajax.php';
            exit;
        }

        $this->ps_versions_compliancy = ['min' => '1.6.0.4', 'max' => '9.5'];

        // Initialize logger
        $this->eM1Logger = new EM1FileLogger();
        $this->eM1Logger->setFilename(_PS_MODULE_DIR_ . $this->name . '/log/' . EM1Constants::LOG_FILENAME);

        parent::__construct();

        $this->displayName = $this->l('eMagicOne Store Manager Bridge Connector');
        $this->description = $this->l(
            'Install eMagicOne Bridge Connector module to fluently connect Store Manager desktop application to 
            PrestaShop database. Increase speed of data management, take advantage of simplicity and reliability  
            with all-in-one Store Manager via eMagicOne Bridge Connector.'
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

        return
            parent::install()

            && $this->createTables()
            && $this->saveBridgeData()
        ;
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
        $options = Configuration::get(EM1Constants::OPTIONS_KEY);

        if ($options && @unserialize($options)) {
            Configuration::updateGlobalValue(EM1Constants::OPTIONS_KEY, json_encode(unserialize($options)));
        }

        $output = null;

        if (Tools::getIsset('bridgeconnector_login')
            && Tools::getIsset('bridgeconnector_password')
            && Tools::isSubmit('submit' . $this->name)
        ) {
            $my_module_name = (string) Tools::getValue('submitbridgeconnector');

            if (!$my_module_name/* || empty($my_module_name) */ || !Validate::isGenericName($my_module_name)) {
                $output .= $this->displayError($this->l('Invalid Configuration value'));
            } else {
                $this->saveBridgeData(true);
                $output .= $this->displayConfirmation($this->l('Settings updated'));
            }
        }

        $bridge_options = json_decode(Configuration::get(EM1Constants::OPTIONS_KEY), true);

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
        $default_lang = (int) Configuration::get('PS_LANG_DEFAULT');

        // Init Fields form array
        $fields_form = [];

        // Init Fields form array
        $fields_form[0]['form'] = [
            'legend' => [
                'title' => $this->l('Store Manager Bridge Connector Settings'),
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => $this->l('Login'),
                    'name' => 'bridgeconnector_login',
                    'id' => 'bridgeconnector_login',
                    'desc' => $this->l(
                        'Login for accessing Bridge Connector from eMagicOne Store Manager for PrestaShop.'
                    ),
                ],
                [
                    // To avoid auto fill
                    'type' => 'password',
                    'name' => 'bridgeconnector_password_fake',
                    'id' => 'bridgeconnector_password_fake',
                ],
                [
                    'type' => 'password',
                    'label' => $this->l('Password'),
                    'name' => 'bridgeconnector_password',
                    'id' => 'bridgeconnector_password',
                    'desc' => $this->l(
                        'Password for accessing Bridge Connector from eMagicOne Store Manager for PrestaShop.'
                    ),
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Directory for Module Operations'),
                    'name' => 'bridgeconnector_tmp_dir',
                    'id' => 'bridgeconnector_tmp_dir',
                    'desc' => $this->l('Enter temporary folder path. It should be writable.'),
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Allow Compression'),
                    'is_bool' => true,
                    'name' => 'bridgeconnector_allow_compression',
                    'id' => 'bridgeconnector_allow_compression',
                    'desc' => $this->l(
                        'Compression of generated dump file. It is recommended for save space and faster getting data
                        in Store Manager.'
                    ),
                    'values' => [
                        [
                            'id' => 'active_on',
                            'value' => 1,
                            'label' => $this->l('Enabled'),
                        ],
                        [
                            'id' => 'active_off',
                            'value' => 0,
                            'label' => $this->l('Disabled'),
                        ],
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Compress Level'),
                    'name' => 'bridgeconnector_compress_level',
                    'id' => 'bridgeconnector_compress_level',
                    'desc' => $this->l(
                        'Values between 1 and 9 will trade off speed and efficiency. The 1 flag means "fast but less
                        efficient" compression, and 9 means "slow but most efficient" compression.'
                    ),
                    'class' => 'fixed-width-xs',
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Selection Query Size'),
                    'name' => 'bridgeconnector_limit_query_size',
                    'id' => 'bridgeconnector_limit_query_size',
                    'desc' => $this->l('Restrict capacity of queries per one request (kB).'),
                    'class' => 'fixed-width-xl',
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Package Size'),
                    'name' => 'bridgeconnector_package_size',
                    'id' => 'bridgeconnector_package_size',
                    'desc' => 'Size of parts for getting dump file (kB).',
                    'class' => 'fixed-width-xl',
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Exclude Tables'),
                    'name' => 'bridgeconnector_db_tables_invisible',
                    'id' => 'bridgeconnector_db_tables_invisible',
                    'class' => 'bridgeconnector_invisible',
                ],
                [
                    'type' => 'hidden',
                    'name' => 'bridgeconnector_db_tables_hidden',
                    'id' => 'bridgeconnector_db_tables_hidden',
                ],
                [
                    'type' => 'hidden',
                    'name' => 'bridgeconnector_admin_module_url',
                    'id' => 'bridgeconnector_admin_module_url',
                ],
                [
                    'type' => 'hidden',
                    'name' => 'bridgeconnector_key',
                    'id' => 'bridgeconnector_key',
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Allowed IPs'),
                    'name' => 'bridgeconnector_allowed_ips',
                    'id' => 'bridgeconnector_allowed_ips',
                    'desc' => $this->l(
                        'In order to allow module using only from specific IP address you should add IP address here
                        (for example, 48.78.88.98 - only one IP address; 48.78.88.98, 15.25.35.45 - two IP addresses;
                        48.78.x.x - all IP addresses which begin from 48.78.)'
                    ),
                ],
            ],
            'submit' => [
                'title' => version_compare($this->cartVersion, '1.6.0.0', '<')
                    ? $this->l('Update settings')
                    : $this->l('Save'),
                'class' => 'btn btn-default pull-right',
            ],
        ];

        $helper = new HelperForm();

        // Module, token and currentIndex
        $helper->module = $this;
        $helper->name_controller = $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;

        // Language
        $helper->default_form_language = $default_lang;
        $helper->allow_employee_form_lang = $default_lang;

        // Title and toolbar
        $helper->title = $this->displayName;
        (version_compare($this->cartVersion, '1.6.0.0', '<')
            && version_compare($this->cartVersion, '1.5.0.0', '>='))
            ? $helper->show_toolbar = false
            : $helper->show_toolbar = true;         // false -> remove toolbar
        $helper->toolbar_scroll = true;             // yes -> Toolbar is always visible on the top of the screen.
        $helper->submit_action = 'submit' . $this->name;
        $helper->toolbar_btn = [
            'save' => [
                    'desc' => $this->l('Save'),
                    'href' => AdminController::$currentIndex . '&configure=' . $this->name . '&save' . $this->name .
                        '&token=' . Tools::getAdminTokenLite('AdminModules'),
                ],
            'back' => [
                'href' => AdminController::$currentIndex . '&token=' . Tools::getAdminTokenLite('AdminModules'),
                'desc' => $this->l('Back to list'),
            ],
        ];

        $helper->tpl_vars = [
            'fields_value' => $this->getConfigFieldsValues($bridgeOptions),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        ];

        // todo: find other way to clear old js files from web browser
        $cssSources = [
            $this->_path . 'views/css/jquery-ui.min.css',
            $this->_path . 'views/css/bridgeconnector.css',
        ];

        if (version_compare($this->cartVersion, '1.6', '>=')) {
            $cssSources[] = $this->_path . 'views/css/1.5_more.css';
        }

        $jsSources = [
            $this->_path . 'views/js/jquery-ui.min.js',
            $this->_path . 'views/js/common.js',
        ];

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
        $baseUrl = '';
        $adminModuleUrl = '';
        $languages = Language::getLanguages(false);

        try {
            $shopUrl = new ShopUrl((int) Configuration::get('PS_SHOP_DEFAULT'));
            $baseUrl = self::prepareUrlProtocol($shopUrl->getURL(Configuration::get('PS_SSL_ENABLED')));
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

        $data = [
            'bridgeconnector_login' => $bridge_options['login'],
            'bridgeconnector_password' => $bridge_options['password'],
            'bridgeconnector_tmp_dir' => $bridge_options['tmp_dir'],
            'bridgeconnector_allow_compression' => $bridge_options['allow_compression'],
            'bridgeconnector_compress_level' => $bridge_options['compress_level'],
            'bridgeconnector_limit_query_size' => $bridge_options['limit_query_size'],
            'bridgeconnector_package_size' => $bridge_options['package_size'],
            'bridgeconnector_allowed_ips' => $bridge_options['allowed_ips'],
            'bridgeconnector_db_tables_hidden' => '',
            'bridgeconnector_db_tables_invisible' => '',

            'bridgeconnector_admin_module_url' => $adminModuleUrl,
            'bridgeconnector_key' => hash('sha256', _COOKIE_KEY_),
        ];

        return $data;
    }

    private function saveBridgeData($is_submit = false)
    {
        $config = [];

        if ($is_submit) {
            $excluded_tables = Tools::getValue('bridgeconnector_exclude_db_tables_checked');

            $stored_data = json_decode(Configuration::get(EM1Constants::OPTIONS_KEY), true);
            $config['login'] = (string) Tools::getValue('bridgeconnector_login');
            $config['password'] = $this->getDecryptedPassword($stored_data['password']);
            $config['tmp_dir'] = (string) Tools::getValue('bridgeconnector_tmp_dir');
            $config['allow_compression'] = (int) Tools::getValue('bridgeconnector_allow_compression');
            $config['compress_level'] = (int) Tools::getValue('bridgeconnector_compress_level');
            $config['limit_query_size'] = (int) Tools::getValue('bridgeconnector_limit_query_size');
            $config['package_size'] = (int) Tools::getValue('bridgeconnector_package_size');
            $config['exclude_db_tables'] = !empty($excluded_tables) ? implode(';', $excluded_tables) : [];
            $config['allowed_ips'] = (string) Tools::getValue('bridgeconnector_allowed_ips');
            $config['last_clear_date'] = isset($stored_data['last_clear_date'])
                ? (int) $stored_data['last_clear_date']
                : time();

            $request_password = Tools::getValue('bridgeconnector_password');

            if (Tools::strlen($request_password) > 0) {
                $config['password'] = $request_password;
            }

            $config = $this->prepareData($config);
        } else {
            $excluded_tables = $this->getDefaultExcludedTables();
            $config['login'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_LOGIN;
            $config['password'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_PASSWORD;
            $config['tmp_dir'] = $this->defaultTmpDirectory;
            $config['allow_compression'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_ALLOW_COMPRESSION;
            $config['compress_level'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_COMPRESS_LEVEL;
            $config['limit_query_size'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_LIMIT_QUERY_SIZE;
            $config['package_size'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_PACKAGE_SIZE;
            $config['exclude_db_tables'] = !empty($excluded_tables) ? implode(';', $excluded_tables) : [];
            $config['allowed_ips'] = EM1Constants::BRIDGECONNECTOR_DEFAULT_ALLOWED_IPS;
            $config['last_clear_date'] = time();
        }

        $config['bridge_hash'] = md5($config['login'] . $config['password']);
        $config['password'] = $this->getEncryptedPassword($config['password']);

        return Configuration::updateGlobalValue(EM1Constants::OPTIONS_KEY, json_encode($config));
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
        $query = [];
        try {
            $query = Db::getInstance()->executeS(
                "SELECT `table_name`
                    FROM information_schema.tables
                    WHERE table_schema = '" . _DB_NAME_ . "'
                        AND (table_name NOT LIKE '" . str_replace('_', '\_', _DB_PREFIX_) . "%'
                            AND table_name NOT LIKE '" . str_replace('_', '\_', 'sm_') . "%')"
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

        $tableExcluded = [
            _DB_PREFIX_ . 'connections',
            _DB_PREFIX_ . 'guest',
            _DB_PREFIX_ . 'pagenotfound',
            _DB_PREFIX_ . 'log',
        ];

        foreach ($query as $table) {
            $tableExcluded[] = array_shift($table);
        }

        return $tableExcluded;
    }

    private function getModuleVersionEMO()
    {
        $dbQuery = new DbQuery();

        try {
            $query = Db::getInstance()->executeS(
                $dbQuery->select('version')
                    ->from('module')
                    ->where('id_module = ' . (int) $this->id)
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
        return $this->createBridgeconnectorTableSessionKeys()
            && $this->createBridgeconnectorTableFailedLogin();
    }

    private function dropTables()
    {
        // Drop table `bridgeconnector_session_keys`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_BC_SESSION_KEYS . '`';
        $dropTableBridgeconnectorSessionKeys = Db::getInstance()->execute($sql);

        // Drop table `bridgeconnector_failed_login`
        $sql = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . EM1Constants::TABLE_BC_FAILED_LOGIN . '`';
        $dropTableBridgeconnectorFailedLogin = Db::getInstance()->execute($sql);

        return
           $dropTableBridgeconnectorSessionKeys
            && $dropTableBridgeconnectorFailedLogin;
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

    private function checkAndUpdateToNewVersion()
    {
        $moduleVersion = $this->getModuleVersionEMO();
        if (!$moduleVersion) {
            return;
        }

        if (version_compare($moduleVersion, $this->version, '<')) {
            if (version_compare($moduleVersion, '3.2.0', '<')) {
                $jsSources = [
                    $this->_path . 'views/js/common.js',
                ];
                $this->context->controller->removeJS($jsSources);
                $this->context->controller->addJS($jsSources);
            }

            self::upgradeModuleVersion($this->name, $this->version);
            $this->_generateConfigXml();
        }
    }

    private static function getCurrentProtocol()
    {
        return (!empty($_SERVER['HTTPS']) && Tools::strtolower($_SERVER['HTTPS']) !== 'off') ? 'https://' : 'http://';
    }

    private static function prepareUrlProtocol($url)
    {
        return self::getCurrentProtocol() . str_replace(['http://', 'https://'], '', $url);
    }
}
