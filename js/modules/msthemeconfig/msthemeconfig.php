<?php

declare(strict_types=1);

if (!defined('_PS_VERSION_')) {
    exit;
}
require_once __DIR__ . '/vendor/autoload.php';

use MsThemeConfig\Class\MailTheme;
use MsThemeConfig\Class\ModernAjax;
use MsThemeConfig\Class\ModernConfigurator;
use MsThemeConfig\Class\ModernHook;
use PrestaShop\PrestaShop\Core\Localization\Exception\LocalizationException;
// Important: use legacy Tab class (global \Tab). Do NOT import the Symfony Tab entity.
use ShopCore as Shop;

/**
 * Module for Modernesmid Theme Configuration
 */
class MsThemeConfig extends Module
{
    public $transDomain;

    public $idShop;
    public $idShopGroup;
    public $idLang;
    public $name;
    public $author;
    public $need_instance;
    public $bootstrap;
    public $version;
    public $tab;
    public $displayName;
    public $description;
    public $confirmUninstall;
    public $ps_versions_compliancy;
    public $warning;
    private $ssaConfig = null;

    /**
     * Add Tab to side menu for this module
     */
    public $tabs = [
        // Parent menu under CONFIGURE
        [
            'name' => [
                'en' => 'Moderne Smid',
                'nl' => 'Moderne Smid'
            ],
            'route_name' => '',
            'module_name' => 'msthemeconfig',
            'class_name' => 'AdminModerneSmidParent',
            'visible' => true,
            'active' => true,
            'icon' => 'settings',
            // Place our parent menu under the CONFIGURE heading (top category)
            'parent_class_name' => 'CONFIGURE',
            'wording' => 'Moderne Smid',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ],
        // Configuratie module (child of Moderne Smid parent)
        [
            'name' => [
                'en' => 'Configurator',
                'nl' => 'Configurator'
            ],
            'route_name' => '',
            'module_name' => 'msthemeconfig',
            'class_name' => 'MsAdminThemeConf',
            'visible' => true,
            'position' => 1,
            'icon' => 'account_circle',
            'parent_class_name' => 'AdminModerneSmidParent',
            'wording' => 'ModerneSmid Configurator',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ],
        // AI Descriptions module (child of Moderne Smid parent)
        [
            'name' => [
                'en' => 'AI Descriptions',
                'nl' => 'AI Beschrijvingen'
            ],
            'route_name' => '',
            'module_name' => 'msthemeconfig',
            'class_name' => 'MsAdminAIDescriptions',
            'visible' => true,
            'position' => 2,
            'icon' => 'psychology',
            'parent_class_name' => 'AdminModerneSmidParent',
            'wording' => 'AI Descriptions',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ],
        // AI Categories module (child of Moderne Smid parent)
        [
            'name' => [
                'en' => 'AI Categories',
                'nl' => 'AI Categorieën'
            ],
            'route_name' => '',
            'module_name' => 'msthemeconfig',
            'class_name' => 'MsAdminAICategories',
            'visible' => true,
            'position' => 3,
            'icon' => 'category',
            'parent_class_name' => 'AdminModerneSmidParent',
            'wording' => 'AI Categories',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ],
        // AI CMS Pages module (child of Moderne Smid parent)
        [
            'name' => [
                'en' => 'AI CMS Pages',
                'nl' => 'AI CMS Pagina\'s'
            ],
            'route_name' => '',
            'module_name' => 'msthemeconfig',
            'class_name' => 'MsAdminAICms',
            'visible' => true,
            'position' => 4,
            'icon' => 'article',
            'parent_class_name' => 'AdminModerneSmidParent',
            'wording' => 'AI CMS Pages',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ],
        // Catalog Backup module (child of Moderne Smid parent)
        [
            'name' => [
                'en' => 'Catalog Backup',
                'nl' => 'Catalogus Backup'
            ],
            'route_name' => '',
            'module_name' => 'msthemeconfig',
            'class_name' => 'MsAdminCatalogBackup',
            'visible' => true,
            'position' => 5,
            'icon' => 'backup',
            'parent_class_name' => 'AdminModerneSmidParent',
            'wording' => 'Catalog Backup',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ],
        // Certificate Authentication module (child of Moderne Smid parent)
        [
            'name' => [
                'en' => 'Certificate Auth',
                'nl' => 'Certificaat Authenticatie'
            ],
            'route_name' => '',
            'module_name' => 'msthemeconfig',
            'class_name' => 'MsAdminCertificateAuth',
            'visible' => true,
            'position' => 6,
            'icon' => 'security',
            'parent_class_name' => 'AdminModerneSmidParent',
            'wording' => 'Certificate Authentication',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ],
        [
            'name' => ['en' => 'Plasma parts library', 'nl' => 'Plasma onderdelenbibliotheek'],
            'class_name' => 'MsAdminPlasmaLibrary',
            'module_name' => 'msthemeconfig',
            'visible' => true,
            'position' => 7,
            'icon' => 'content_cut',
            'parent_class_name' => 'AdminModerneSmidParent',
            'wording' => 'Plasma parts library',
            'wording_domain' => 'Modules.Msthemeconfig.Admin',
        ],
        // Offerte module
        [
            'name' => [
                'en' => 'Offer management',
                'nl' => 'Offerte Beheer'
            ],
            'route_name' => 'offerintegration_index',
            'class_name' => 'AdminOfferController',
            'visible' => true,
            'parent_class_name' => 'AdminParentOrders',
            'icon' => 'account_circle',
            'wording' => 'Offerte beheer',
            'wording_domain' => 'Modules.MsThemeConfig.Module',
        ]
    ];


    public function __construct()
    {
        // Basic identifiers must be set before calling parent constructor
        $this->name = 'msthemeconfig';
        $this->author = 'Jelmer Stoker';
        $this->need_instance = 1;
        $this->bootstrap = true;
        $this->version = '1.0.18';
        $this->tab = 'front_office_features';

        // Ensure Module base class is initialized (required for BO actions like install/uninstall/reset)
        parent::__construct();

        $this->transDomain = 'Modules.MsThemeConfig.msthemeconfig.php';

        // Now translations are safe to use
        $this->displayName = $this->trans('Moderne Smid Theme Configurator V2', [],
            $this->transDomain);

        $this->description = $this->trans('Module for the configurations of the Moderne Smid BV', [],
            $this->transDomain);

        $this->confirmUninstall = $this->trans('Are you sure to remove this module, all records from the database wil be removed',
            [], $this->transDomain);

        $this->ps_versions_compliancy = [
            'min' => '1.7',
            'max' => '9.99.99',
        ];

        $this->context = Context::getContext();
        $this->initializeMultistoreContext();
        $this->idLang = $this->context->language->id;

        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }
    }

    /**
     * Registers Smarty plugins to the given Smarty instance.
     * Use global smartyRegisterFunction to ensure compatibility with Smarty 5 and PrestaShop 9.
     *
     * @param Smarty $smarty
     */
    public function registerSmartyPlugins($smarty): void
    {
        if (!($smarty instanceof Smarty)) {
            return;
        }

        if (!defined('_CUSTOMIZE_TEXTFIELD_')) {
            define('_CUSTOMIZE_TEXTFIELD_', Product::CUSTOMIZE_TEXTFIELD);
        }

        foreach (['Address', 'Order', 'Cart', 'Category'] as $className) {
            if (!isset($smarty->registered_classes[$className])) {
                $smarty->registerClass($className, $className);
            }
        }

        // Register classes
        if (!isset($smarty->registered_classes['AttributeGroup'])) {
            $smarty->registerClass('AttributeGroup', 'AttributeGroup');
        }
        if (!isset($smarty->registered_classes['Message'])) {
            $smarty->registerClass('Message', 'Message');
        }
        if (!isset($smarty->registered_classes['Product'])) {
            $smarty->registerClass('Product', 'Product');
        }
        if (!isset($smarty->registered_classes['Configuration'])) {
            $smarty->registerClass('Configuration', 'Configuration');
        }

        // Assign an instance for non-static calls if needed (Legacy support)
        if (class_exists('AttributeGroup')) {
            $smarty->assign('AttributeGroup', new AttributeGroup());
        }

            // Register modifiers using the global helper which handles LazyRegister
            if (function_exists('smartyRegisterFunction')) {
                // Check if modifiers are already registered to avoid "Plugin tag already registered" exception
                $lazy_register = SmartyLazyRegister::getInstance($smarty);

                if (!$lazy_register->isRegistered('is_numeric') && !isset($smarty->registered_plugins['modifier']['is_numeric'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'is_numeric', 'is_numeric');
                }
                if (!$lazy_register->isRegistered('number_format') && !isset($smarty->registered_plugins['modifier']['number_format'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'number_format', 'number_format');
                }
                if (!$lazy_register->isRegistered('abs') && !isset($smarty->registered_plugins['modifier']['abs'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'abs', 'abs');
                }
                if (!$lazy_register->isRegistered('is_array') && !isset($smarty->registered_plugins['modifier']['is_array'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'is_array', 'is_array');
                }
                if (!$lazy_register->isRegistered('count') && !isset($smarty->registered_plugins['modifier']['count'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'count', 'count');
                }
                if (!$lazy_register->isRegistered('round') && !isset($smarty->registered_plugins['modifier']['round'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'round', 'round');
                }
                if (!$lazy_register->isRegistered('date_create') && !isset($smarty->registered_plugins['modifier']['date_create'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'date_create', 'date_create');
                }
                if (!$lazy_register->isRegistered('strtotime') && !isset($smarty->registered_plugins['modifier']['strtotime'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'strtotime', 'strtotime');
                }

                // Standard Smarty date_format modifier might not be loaded yet in some contexts (like PDF)
                // when using SmartyLazyRegister. We ensure the plugin file is included.
                $dateModifierFile = _PS_VENDOR_DIR_ . 'smarty/smarty/libs/plugins/modifier.date_format.php';
                if (file_exists($dateModifierFile)) {
                    require_once $dateModifierFile;
                }
                if (!$lazy_register->isRegistered('date_format') && !isset($smarty->registered_plugins['modifier']['date_format'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'date_format', 'smarty_modifier_date_format');
                }

                if (!$lazy_register->isRegistered('array_key_exists') && !isset($smarty->registered_plugins['modifier']['array_key_exists'])) {
                    smartyRegisterFunction($smarty, 'modifier', 'array_key_exists', [$this, 'arrayKeyExistsModifier']);
                }

            // For AttributeGroup, we use the class name directly if it's a static method
            // Smarty 5 expects the full callable for non-global functions
            if (!isset($smarty->registered_plugins['modifier']['AttributeGroup::stripSawCutModuleAttributeGroupName'])) {
                smartyRegisterFunction($smarty, 'modifier', 'AttributeGroup::stripSawCutModuleAttributeGroupName', ['AttributeGroup', 'stripSawCutModuleAttributeGroupName']);
            }
            if (!isset($smarty->registered_plugins['modifier']['stripSawCutModuleAttributeGroupName'])) {
                smartyRegisterFunction($smarty, 'modifier', 'stripSawCutModuleAttributeGroupName', ['AttributeGroup', 'stripSawCutModuleAttributeGroupName']);
            }
            if (!isset($smarty->registered_plugins['modifier']['stripSawCutName'])) {
                smartyRegisterFunction($smarty, 'modifier', 'stripSawCutName', ['AttributeGroup', 'stripSawCutModuleAttributeGroupName']);
            }
            if (!isset($smarty->registered_plugins['modifier']['getSawCutModuleAttributeGroupNames'])) {
                smartyRegisterFunction($smarty, 'modifier', 'getSawCutModuleAttributeGroupNames', ['AttributeGroup', 'getSawCutModuleAttributeGroupNames']);
            }
            if (!isset($smarty->registered_plugins['modifier']['getSawCutModuleAttributeGroupName'])) {
                smartyRegisterFunction($smarty, 'modifier', 'getSawCutModuleAttributeGroupName', ['AttributeGroup', 'getSawCutModuleAttributeGroupName']);
            }
            if (!isset($smarty->registered_plugins['modifier']['getMessagesByOrderId'])) {
                smartyRegisterFunction($smarty, 'modifier', 'getMessagesByOrderId', ['Message', 'getMessagesByOrderId']);
            }
            if (!isset($smarty->registered_plugins['modifier']['webp'])) {
                smartyRegisterFunction($smarty, 'modifier', 'webp', [$this, 'webpModifier']);
            }
            } else {
                // Fallback for environments where the helper is missing
                if (!isset($smarty->registered_plugins['modifier']['is_numeric'])) {
                    $smarty->registerPlugin('modifier', 'is_numeric', 'is_numeric');
                }
                if (!isset($smarty->registered_plugins['modifier']['number_format'])) {
                    $smarty->registerPlugin('modifier', 'number_format', 'number_format');
                }
                if (!isset($smarty->registered_plugins['modifier']['abs'])) {
                    $smarty->registerPlugin('modifier', 'abs', 'abs');
                }
                if (!isset($smarty->registered_plugins['modifier']['is_array'])) {
                    $smarty->registerPlugin('modifier', 'is_array', 'is_array');
                }
                if (!isset($smarty->registered_plugins['modifier']['count'])) {
                    $smarty->registerPlugin('modifier', 'count', 'count');
                }
                if (!isset($smarty->registered_plugins['modifier']['round'])) {
                    $smarty->registerPlugin('modifier', 'round', 'round');
                }
                if (!isset($smarty->registered_plugins['modifier']['date_create'])) {
                    $smarty->registerPlugin('modifier', 'date_create', 'date_create');
                }
                if (!isset($smarty->registered_plugins['modifier']['strtotime'])) {
                    $smarty->registerPlugin('modifier', 'strtotime', 'strtotime');
                }

                $dateModifierFile = _PS_VENDOR_DIR_ . 'smarty/smarty/libs/plugins/modifier.date_format.php';
                if (file_exists($dateModifierFile)) {
                    require_once $dateModifierFile;
                }
                if (!isset($smarty->registered_plugins['modifier']['date_format'])) {
                    $smarty->registerPlugin('modifier', 'date_format', 'smarty_modifier_date_format');
                }

                $smarty->registerPlugin('modifier', 'getMessagesByOrderId', ['Message', 'getMessagesByOrderId']);
                $smarty->registerPlugin('modifier', 'stripSawCutModuleAttributeGroupName', ['AttributeGroup', 'stripSawCutModuleAttributeGroupName']);
                $smarty->registerPlugin('modifier', 'stripSawCutName', ['AttributeGroup', 'stripSawCutModuleAttributeGroupName']);
                $smarty->registerPlugin('modifier', 'webp', [$this, 'webpModifier']);
                if (!isset($smarty->registered_plugins['modifier']['array_key_exists'])) {
                    $smarty->registerPlugin('modifier', 'array_key_exists', [$this, 'arrayKeyExistsModifier']);
                }
            }
    }

    public function arrayKeyExistsModifier($array, $key): bool
    {
        if (!is_array($array) && !($array instanceof ArrayAccess)) {
            return false;
        }

        return array_key_exists($key, (array) $array);
    }

    public function webpModifier($url)
    {
        if (Configuration::get('MSTHEMECONFIG_USE_WEBP', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id, 0)) {
            // Regex to replace .jpg, .jpeg (case-insensitive) with .webp, preserving anything before and after (like query params)
            $newUrl = preg_replace('/\.(jpe?g)(\?.*)?$/i', '.webp$2', (string) $url);

            // Check if it's an absolute URL
            if (strpos($newUrl, 'http') === 0) {
                return $newUrl;
            }

            // If it's a relative URL, ensure it starts with /
            if ($newUrl[0] !== '/') {
                $newUrl = '/' . $newUrl;
            }

            return $newUrl;
        }

        return $url;
    }

    /**
     * @throws PrestaShopException
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException|PrestaShopException
     */
    public function getModernConfig(): ModernConfigurator
    {
        // Retrieve from service container to get injected Twig environment (PS9-compatible)
        try {
            /** @var ModernConfigurator $svc */
            $svc = $this->get(ModernConfigurator::class);

            return $svc;
        } catch (Exception $e) {
            // Fallback to legacy instantiation without Twig injection (will still work with Smarty parts)
            return new ModernConfigurator($this->get('prestashop.adapter.legacy.context'), null);
        }
    }

    /**
     * @return ModernHook
     */
    public function getModernHooks(): ModernHook
    {
        try {
            /** @var ModernHook $svc */
            $svc = $this->get(ModernHook::class);

            if ($svc instanceof ModernHook) {
                return $svc;
            }
//
//            // Service not available or misconfigured; fall back to legacy instantiation.
//            PrestaShopLogger::addLog(
//                'msthemeconfig: ModernHook service missing or invalid; using fallback instantiation.',
//                2
//            );
            return new ModernHook($this, $this->context, null);
        } catch (Exception $e) {
//            // Fallback for non-Symfony context
//            PrestaShopLogger::addLog(
//                'msthemeconfig: ModernHook service exception; using fallback instantiation.',
//                2,
//                null,
//                'MsThemeConfig'
//            );
            return new ModernHook($this, $this->context, null);
        }
    }

    private function getSsaConfigValue(string $primaryKey, string $fallbackKey = '')
    {
        $val = Configuration::get($primaryKey, $this->idLang, $this->idShopGroup, $this->idShop);
        if (($val === null || $val === '') && $fallbackKey !== '') {
            $val = Configuration::get($fallbackKey, $this->idLang, $this->idShopGroup, $this->idShop);
        }

        return $val;
    }

    private function decodeSsaConfigList($value): array
    {
        if (is_array($value)) {
            $list = $value;
        } elseif ($value === null || $value === '') {
            $list = [];
        } else {
            $raw = trim((string) $value);
            $list = [];

            if ($raw !== '' && ($raw[0] === '[' || $raw[0] === '{')) {
                $decoded = json_decode($raw, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $list = $decoded;
                }
            }

            if (empty($list) && strpos($raw, ',') !== false) {
                $list = array_map('trim', explode(',', $raw));
            }

            if (empty($list)) {
                $maybe = @unserialize($raw);
                if ($maybe !== false || $raw === 'b:0;') {
                    $list = is_array($maybe) ? $maybe : [];
                } elseif ($raw !== '') {
                    $list = [$raw];
                }
            }
        }

        $normalized = array_values(array_filter(array_map(function ($v) {
            if (is_array($v) && isset($v['id'])) { $v = $v['id']; }
            if (is_object($v) && isset($v->id)) { $v = $v->id; }
            $v = is_string($v) ? trim($v) : $v;
            return (int) $v;
        }, (array) $list), function ($v) { return (int) $v > 0; }));

        return $normalized;
    }

    private function getSsaConfig(): array
    {
        if ($this->ssaConfig !== null) {
            return $this->ssaConfig;
        }

        $type = (int) $this->getSsaConfigValue('MSTHEMECONFIG_SSA_PRODUCTS_TYPE', 'SSA_PRODUCTS_TYPE');
        $productsRaw = $this->getSsaConfigValue('MSTHEMECONFIG_SSA_PRODUCTS', 'SSA_PRODUCTS');
        $categoriesRaw = $this->getSsaConfigValue('MSTHEMECONFIG_SSA_CATEGORIES', 'SSA_CATEGORIES');

        $this->ssaConfig = [
            'products_type' => $type,
            'products' => $this->decodeSsaConfigList($productsRaw),
            'categories' => $this->decodeSsaConfigList($categoriesRaw),
        ];

        return $this->ssaConfig;
    }

    private function categoryHasProduct(int $idCategory, int $idProduct): bool
    {
        $cats = array_map('intval', (array) Product::getProductCategories($idProduct));
        if (empty($cats)) {
            return false;
        }

        if (in_array($idCategory, $cats, true)) {
            return true;
        }

        try {
            $categoryObj = new Category($idCategory, (int) $this->idLang);
            $children = $categoryObj->getAllChildren((int) $this->idLang);
        } catch (\Throwable $e) {
            $children = [];
        }

        if (!empty($children)) {
            foreach ($children as $child) {
                $childId = is_object($child) && isset($child->id) ? (int) $child->id : (int) $child;
                if ($childId && in_array($childId, $cats, true)) {
                    return true;
                }
            }
        }

        return false;
    }

    public function useSSA(int $idProduct): bool
    {
        $cfg = $this->getSsaConfig();
        $type = (int) ($cfg['products_type'] ?? 0);
        $products = $cfg['products'] ?? [];
        $categories = $cfg['categories'] ?? [];

        if ($type === 0) {
            return true;
        }

        $inProducts = in_array($idProduct, $products, true);
        $inCategory = false;
        if (!empty($categories)) {
            foreach ($categories as $idCategory) {
                if ($this->categoryHasProduct((int) $idCategory, $idProduct)) {
                    $inCategory = true;
                    break;
                }
            }
        }

        if ($type === 1) {
            return $inProducts || $inCategory;
        }

        if ($type === 2) {
            return !($inProducts || $inCategory);
        }

        return false;
    }

    /**
     * Insert module into datable.
     */
    public function install()
    {
        // Prepare logger for detailed diagnostics
        $sep = DIRECTORY_SEPARATOR;
        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');
        $logger->logInfo('[msthemeconfig] Install start');

        try {
            // Always call parent::install() first to register the module properly
            if (!parent::install()) {
                $logger->logError('[msthemeconfig] parent::install() failed');

                return false;
            }

            // Create base table (idempotent)
            $createOfferTableQuery = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'offer_integration` (
                `id_oi_offer` int(11) NOT NULL AUTO_INCREMENT,
                `code` varchar(16) DEFAULT NULL,
                `name` varchar(64) DEFAULT NULL,
                `email` varchar(128) DEFAULT NULL,
                `phone` varchar(32) DEFAULT NULL,
                `message` TEXT DEFAULT NULL,
                `access_code` VARCHAR(10) DEFAULT NULL,
                `date_exp` DATETIME DEFAULT NULL,
                `date_add` DATETIME NOT NULL,
                `date_upd` DATETIME NOT NULL,
                PRIMARY KEY (`id_oi_offer`),
                UNIQUE KEY (`code`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
            Db::getInstance()->execute($createOfferTableQuery);
            $logger->logInfo('[msthemeconfig] offer table ensured');
            // Create base table (idempotent)
            $createKiyohTableQuery = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'kiyoh_custom` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `kiyoh_comments_total` int(11) NOT NULL,
                `kiyoh_average_percentage` int(11) NOT NULL,
                `kiyoh_average` DECIMAL(10,1) NOT NULL,
                `kiyoh_latest_feed` LONGTEXT NOT NULL,
                `kiyoh_updated` DATETIME NOT NULL,
                PRIMARY KEY (`id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
            Db::getInstance()->execute($createKiyohTableQuery);
            $logger->logInfo('[msthemeconfig] kiyoh table ensured');

            // Create base table (idempotent)
            $createVatHistoryTableQuery = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'modernesmid_vat_history` (
                  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                  `date_from` DATETIME DEFAULT NULL,
                  `date_to` DATETIME DEFAULT NULL,
                  `total_excl` DECIMAL(20,6) UNSIGNED DEFAULT NULL,
                  `total_incl` DECIMAL(20,6) UNSIGNED DEFAULT NULL,
                  `total_vat` DECIMAL(20,6) DEFAULT NULL,
                  `total_orders` INT UNSIGNED DEFAULT NULL,
                  `reference_list` TEXT COLLATE utf8mb4_unicode_ci,
                  PRIMARY KEY (`id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
            Db::getInstance()->execute($createVatHistoryTableQuery);
            $logger->logInfo('[msthemeconfig] vat history ensured');

            // Create certificate authentication tables (idempotent)
            $createCertAuthTableQuery = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'employee_certificate_auth` (
                `id_employee` int(11) NOT NULL,
                `require_certificate` tinyint(1) NOT NULL DEFAULT 0,
                `date_add` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                `date_upd` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (`id_employee`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
            Db::getInstance()->execute($createCertAuthTableQuery);
            $logger->logInfo('[msthemeconfig] employee_certificate_auth table ensured');

            $createCertAuthLogTableQuery = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'employee_certificate_auth_log` (
                `id_log` int(11) NOT NULL AUTO_INCREMENT,
                `id_employee` int(11) NOT NULL,
                `success` tinyint(1) NOT NULL DEFAULT 0,
                `ip_address` varchar(45) DEFAULT NULL,
                `certificate_subject` varchar(255) DEFAULT NULL,
                `date_add` DATETIME NOT NULL,
                PRIMARY KEY (`id_log`),
                KEY `id_employee` (`id_employee`),
                KEY `date_add` (`date_add`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
            Db::getInstance()->execute($createCertAuthLogTableQuery);
            $logger->logInfo('[msthemeconfig] employee_certificate_auth_log table ensured');

            // Koopman shipment status cache table (idempotent)
            $createShipmentStatusTableQuery = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'koopman_shipment_status` (
                `id` INT(11) NOT NULL AUTO_INCREMENT,
                `id_order` INT(11) NOT NULL,
                `tracking_number` VARCHAR(64) NOT NULL,
                `status_code` VARCHAR(16) DEFAULT NULL,
                `status_description` VARCHAR(255) DEFAULT NULL,
                `status_date` DATE DEFAULT NULL,
                `status_time` VARCHAR(16) DEFAULT NULL,
                `status_depot` INT(11) DEFAULT NULL,
                `eta_date` DATE DEFAULT NULL,
                `eta_from` VARCHAR(16) DEFAULT NULL,
                `eta_to` VARCHAR(16) DEFAULT NULL,
                `is_completed` TINYINT(1) NOT NULL DEFAULT 0,
                `full_history` MEDIUMTEXT DEFAULT NULL,
                `date_add` DATETIME NOT NULL,
                `date_upd` DATETIME NOT NULL,
                PRIMARY KEY (`id`),
                UNIQUE KEY `tracking_number` (`tracking_number`),
                KEY `id_order` (`id_order`),
                KEY `is_completed` (`is_completed`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;';
            Db::getInstance()->execute($createShipmentStatusTableQuery);
            $logger->logInfo('[msthemeconfig] koopman_shipment_status table ensured');

            // Idempotent column additions for product and product_shop
            if (!$this->columnExists('product', 'id_oi_offer')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `id_oi_offer` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product.id_oi_offer added');
            }

            if (!$this->columnExists('product', 'oi_offer_memo')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `oi_offer_memo` MEDIUMTEXT DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product.oi_offer_memo added');
            } elseif ($this->columnType('product', 'oi_offer_memo') !== 'mediumtext') {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` MODIFY COLUMN `oi_offer_memo` MEDIUMTEXT DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product.oi_offer_memo migrated to MEDIUMTEXT');
            }
            if (!$this->columnExists('product', 'oi_offer_extra_shipping')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `oi_offer_extra_shipping` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product.oi_offer_extra_shipping added');
            }
            if (!$this->columnExists('product_shop', 'id_oi_offer')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `id_oi_offer` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product_shop.id_oi_offer added');
            }
            if (!$this->columnExists('product_shop', 'oi_offer_extra_shipping')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `oi_offer_extra_shipping` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product_shop.oi_offer_extra_shipping added');
            }

            // Saw & Cut columns
            if (!$this->columnExists('product', 'saw_loss')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `saw_loss` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product.saw_loss added');
            }
            if (!$this->columnExists('product_shop', 'saw_loss')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `saw_loss` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product_shop.saw_loss added');
            }
            if (!$this->columnExists('product', 'min_saw_size')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `min_saw_size` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product.min_saw_size added');
            }
            if (!$this->columnExists('product_shop', 'min_saw_size')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `min_saw_size` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product_shop.min_saw_size added');
            }
            if (!$this->columnExists('product', 'min_cut_size')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `min_cut_size` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product.min_cut_size added');
            }
            if (!$this->columnExists('product_shop', 'min_cut_size')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `min_cut_size` int(11) DEFAULT NULL');
                $logger->logInfo('[msthemeconfig] product_shop.min_cut_size added');
            }

            // Saw & Cut customization technical reference
            if (!$this->columnExists('customized_data', 'technical_reference')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'customized_data` ADD `technical_reference` BLOB DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add customized_data.technical_reference: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add customized_data.technical_reference column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] customized_data.technical_reference added');
            }
            if (!$this->columnExists('customized_data', 'technical_image')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'customized_data` ADD `technical_image` BLOB DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add customized_data.technical_image: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add customized_data.technical_image column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] customized_data.technical_image added');
            }

            // Missing field reported: min_cut_remainder
            if (!$this->columnExists('product', 'min_cut_remainder')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `min_cut_remainder` DECIMAL(20,6) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add product.min_cut_remainder: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add product.min_cut_remainder column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] product.min_cut_remainder added');
            }

            // Ensure new OrderState column used by overrides: visible_in_select_box
            if (!$this->columnExists('order_state', 'visible_in_select_box')) {
                Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'order_state` ADD `visible_in_select_box` TINYINT(1) NOT NULL DEFAULT 0');
                $logger->logInfo('[msthemeconfig] order_state.visible_in_select_box added');
            }

            // Ensure orders.added_to_order exists for Order grid usage
            if (!$this->columnExists('orders', 'added_to_order')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'orders` ADD `added_to_order` VARCHAR(100) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add orders.added_to_order: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add orders.added_to_order column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] orders.added_to_order added');
            }

            // GA4 client_id captured from browser _ga cookie at order confirmation time
            // Used by server-side Measurement Protocol events to link them to the real browser session
            if (!$this->columnExists('orders', 'ga_client_id')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'orders` ADD `ga_client_id` VARCHAR(100) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add orders.ga_client_id: ' . Db::getInstance()->getMsgError());
                } else {
                    $logger->logInfo('[msthemeconfig] orders.ga_client_id added');
                }
            }

            // GA4 session_id captured from browser _ga_XXXX cookie at order confirmation time
            // Used alongside client_id in Measurement Protocol so attribution (source/medium) flows to purchase
            if (!$this->columnExists('orders', 'ga_session_id')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'orders` ADD `ga_session_id` VARCHAR(50) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add orders.ga_session_id: ' . Db::getInstance()->getMsgError());
                } else {
                    $logger->logInfo('[msthemeconfig] orders.ga_session_id added');
                }
            }

            // Analytics consent captured from cookie-consent cookie at order confirmation time.
            // 1 = user consented to analytics, 0 = declined, NULL = unknown (pre-feature orders).
            if (!$this->columnExists('orders', 'ga_analytics_consent')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'orders` ADD `ga_analytics_consent` TINYINT(1) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add orders.ga_analytics_consent: ' . Db::getInstance()->getMsgError());
                } else {
                    $logger->logInfo('[msthemeconfig] orders.ga_analytics_consent added');
                }
            }

            // Same GA4 identifiers on the cart. The cart carries them across the Mollie redirect
            // so the order hook can recover them when the webhook (no cookies) creates the order.
            $this->installGaCartColumns();

            // Consent-gated advertising attribution identifiers follow the same cart-to-order
            // route. This keeps redirect payments attributable without making a browser return
            // page a prerequisite for Google Ads, Meta or Microsoft Ads.
            $this->installAdAttributionColumns();

            if (!$this->installGa4RefundDispatchTable()) {
                $logger->logError('[msthemeconfig] Failed to create the GA4 refund dispatch register');
                return false;
            }

            // Persist the business channel and test-order flag at order creation time. These
            // fields deliberately contain classifications only, never a customer or employee ID.
            $this->installAnalyticsOrderClassificationColumns();

            // Product extra fields from overrides
            if (!$this->columnExists('product', 'seo_keywords')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `seo_keywords` varchar(255) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add product.seo_keywords: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add product.seo_keywords column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] product.seo_keywords added');
            }
            if (!$this->columnExists('product', 'jsonld')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `jsonld` TEXT DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add product.jsonld: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add product.jsonld column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] product.jsonld added');
            }
            // Missing field reported: second_name on product
            if (!$this->columnExists('product', 'second_name')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `second_name` VARCHAR(255) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add product.second_name: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add product.second_name column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] product.second_name added');
            }
            if (!$this->columnExists('product', 'default_cut_price')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `default_cut_price` DECIMAL(20,6) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add product.default_cut_price: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add product.default_cut_price column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] product.default_cut_price added');
            }
            if (!$this->columnExists('product_shop', 'default_cut_price')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `default_cut_price` DECIMAL(20,6) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add product_shop.default_cut_price: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add product_shop.default_cut_price column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] product_shop.default_cut_price added');
            }

            // Category language extra fields from overrides
            if (!$this->installCategoryRelations()) {
                $logger->logError('[msthemeconfig] Failed to create category relations table');
                return false;
            }
            if (!$this->columnExists('category_lang', 'second_name')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'category_lang` ADD `second_name` varchar(255) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add category_lang.second_name: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add category_lang.second_name column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] category_lang.second_name added');
            }
            if (!$this->columnExists('category_lang', 'top_description')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'category_lang` ADD `top_description` MEDIUMTEXT DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add category_lang.top_description: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add category_lang.top_description column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] category_lang.top_description added');
            }
            if (!$this->columnExists('category_lang', 'jsonld')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'category_lang` ADD `jsonld` TEXT DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add category_lang.jsonld: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add category_lang.jsonld column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] category_lang.jsonld added');
            }

            // Ensure address extra fields used by overrides
            if (!$this->columnExists('orders', 'shipping_number')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'orders` ADD `shipping_number` varchar(255) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add orders.shipping_number: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add orders.shipping_number column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] orders.shipping_number added');
            }

            if (!$this->columnExists('address', 'house_number')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'address` ADD `house_number` varchar(8) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add address.house_number: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add address.house_number column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] address.house_number added');
            }
            if (!$this->columnExists('address', 'house_number_extension')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'address` ADD `house_number_extension` varchar(8) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add address.house_number_extension: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add address.house_number_extension column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] address.house_number_extension added');
            }

            // Order carrier extra columns used by module
            if (!$this->columnExists('order_carrier', 'tracking_url')) {
                if (!Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'order_carrier` ADD `tracking_url` varchar(255) DEFAULT NULL')) {
                    $logger->logError('[msthemeconfig] Failed to add order_carrier.tracking_url: ' . Db::getInstance()->getMsgError());
                    if (property_exists($this, '_errors')) {
                        $this->_errors[] = 'Failed to add order_carrier.tracking_url column';
                    }
                    return false;
                }
                $logger->logInfo('[msthemeconfig] order_carrier.tracking_url added');
            }

            // Create the special Offers category on older PS versions only
            if (version_compare(_PS_VERSION_, '9.0.0', '<')) {
                try {
                    $this->createOfferIntegrationCategory();
                    $logger->logInfo('[msthemeconfig] Offers category ensured (< PS9)');
                } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                    $logger->logWarning('[msthemeconfig] Offers category creation skipped: ' . $e->getMessage());
                }
            }

            // Mail theme symlink is optional on some hosts (Windows/permissions)
            try {
                $mailClass = new MailTheme();
                if (!$mailClass->makeThemeSymlink()) {
                    $logger->logWarning('[msthemeconfig] makeThemeSymlink() returned false; continuing without symlink');
                }
            } catch (Exception $e) {
                $logger->logWarning('[msthemeconfig] makeThemeSymlink() failed: ' . $e->getMessage());
            }

            // Basic config
            Configuration::updateValue('MSTHEMECONIG_NAME', 'Moderne Smid Webshop Thema Configuratie', false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_AI_FRONTEND_ENABLED', [$this->idLang => 0], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_AI_CONTEXT_SEARCH', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_AI_CONTEXT_PLATE_CUTS', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_AI_CONTEXT_SAW_CUTS', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);
            // GA4 Measurement Protocol
            Configuration::updateValue('MSTHEMECONFIG_GA4_MEASUREMENT_ID', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_GA4_API_SECRET', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_GA4_TRIGGER_STATES', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_GA4_ENDPOINT', [$this->idLang => 'https://www.google-analytics.com/mp/collect'], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_GTM_SERVER_URL', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_GA4_PAYMENT_LOG', [$this->idLang => '0'], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_GA4_EVENT_LOG', [$this->idLang => '0'], false, $this->idShopGroup, $this->idShop);
            Configuration::updateValue('MSTHEMECONFIG_GA4_CANCEL_STATES', [$this->idLang => ''], false, $this->idShopGroup, $this->idShop);

//            // Ensure BO Tab route params are set (idempotent)
//            try {
//                if (class_exists('Tab')) {
//                    $tabId = (int)\Tab::getIdFromClassName('MsAdminThemeConf');
//                    if ($tabId > 0) {
//                        $tab = new \Tab($tabId);
//                        $needsSave = false;
//                        // Clear any invalid Symfony route for this legacy controller; let PrestaShop use legacy URL
//                        if (!empty($tab->route_name)) {
//                            $tab->route_name = '';
//                            $needsSave = true;
//                        }
//                        if (!empty($tab->route_params)) {
//                            $tab->route_params = null;
//                            $needsSave = true;
//                        }
//                        if (property_exists($tab, 'wording') && $tab->wording !== 'Moderne Smid Thema Conf') {
//                            $tab->wording = 'Moderne Smid Thema Conf';
//                            $needsSave = true;
//                        }
//                        if (property_exists($tab, 'wording_domain') && $tab->wording_domain !== 'Modules.MsThemeConfig.Module') {
//                            $tab->wording_domain = 'Modules.MsThemeConfig.Module';
//                            $needsSave = true;
//                        }
//                        if ($needsSave) {
//                            $tab->save();
//                            $logger->logInfo('[msthemeconfig] Ensured Tab legacy URL/wording for MsAdminThemeConfController');
//                        }
//                    }
//                }
//            } catch (\Throwable $e) {
//                $logger->logWarning('[msthemeconfig] Ensuring Tab route params failed: ' . $e->getMessage());
//            }

            // Register hooks (do not fail install if some hooks are unavailable; just log)
            $hooksOk = $this->installHooks();
            if (!$hooksOk) {
                $logger->logWarning('[msthemeconfig] Some hooks failed to register');
            }

            // Install admin tabs
            $tabsOk = $this->installTabs();
            if (!$tabsOk) {
                $logger->logWarning('[msthemeconfig] Some tabs failed to install');
            }

            if (!\MsThemeConfig\Plasma\PlasmaInstaller::install($this)) {
                throw new RuntimeException('Plasma schema or hooks could not be installed.');
            }
            $logger->logInfo('[msthemeconfig] Install finished successfully');

            return true;
        } catch (Exception $e) {
            // Provide context back to the installer
            $message = '[msthemeconfig] Install failed: ' . $e->getMessage();
            $logger->logError($message);
            if (property_exists($this, '_errors')) {
                $this->_errors[] = $message;
            }

            return false;
        }
    }

    /**
     * Delete module from datable.
     *
     * @return bool result
     */
    public function uninstall(): bool
    {
        // Drop columns only if they exist
        // Offer integration table columns
        if ($this->columnExists('offer_integration', 'oi_offer_memo')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'offer_integration` DROP COLUMN `oi_offer_memo`');
        }

        $hasIdOiOfferProduct = $this->columnExists('product', 'id_oi_offer');
        if ($hasIdOiOfferProduct) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `id_oi_offer`');
        }

        $hasOfferMemoOiOfferProduct = $this->columnExists('product', 'oi_offer_memo');
        if ($hasOfferMemoOiOfferProduct) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `oi_offer_memo`');
        }

        $hasExtraShippingProduct = $this->columnExists('product', 'oi_offer_extra_shipping');
        if ($hasExtraShippingProduct) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `oi_offer_extra_shipping`');
        }

        $hasIdOiOfferProductShop = $this->columnExists('product_shop', 'id_oi_offer');
        if ($hasIdOiOfferProductShop) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` DROP COLUMN `id_oi_offer`');
        }
        if ($this->columnExists('product_shop', 'oi_offer_memo')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` DROP COLUMN `oi_offer_memo`');
        }

        // Address extra columns
        if ($this->columnExists('address', 'house_number')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'address` DROP COLUMN `house_number`');
        }
        if ($this->columnExists('address', 'house_number_extension')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'address` DROP COLUMN `house_number_extension`');
        }

        $hasExtraShippingProductShop = $this->columnExists('product_shop', 'oi_offer_extra_shipping');
        if ($hasExtraShippingProductShop) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` DROP COLUMN `oi_offer_extra_shipping`');
        }

        // Saw & Cut columns
        if ($this->columnExists('product', 'saw_loss')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `saw_loss`');
        }
        if ($this->columnExists('product_shop', 'saw_loss')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` DROP COLUMN `saw_loss`');
        }
        if ($this->columnExists('product', 'min_saw_size')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `min_saw_size`');
        }
        if ($this->columnExists('product_shop', 'min_saw_size')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` DROP COLUMN `min_saw_size`');
        }
        if ($this->columnExists('product', 'min_cut_size')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `min_cut_size`');
        }
        if ($this->columnExists('product_shop', 'min_cut_size')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` DROP COLUMN `min_cut_size`');
        }
        if ($this->columnExists('customized_data', 'technical_reference')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'customized_data` DROP COLUMN `technical_reference`');
        }
        if ($this->columnExists('customized_data', 'technical_image')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'customized_data` DROP COLUMN `technical_image`');
        }
        // Newly added columns by this module
        if ($this->columnExists('product', 'min_cut_remainder')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `min_cut_remainder`');
        }

        // Product extra fields from overrides
        if ($this->columnExists('product', 'seo_keywords')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `seo_keywords`');
        }
        if ($this->columnExists('product', 'jsonld')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `jsonld`');
        }
        if ($this->columnExists('product', 'second_name')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `second_name`');
        }
        if ($this->columnExists('product', 'default_cut_price')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product` DROP COLUMN `default_cut_price`');
        }
        if ($this->columnExists('product_shop', 'default_cut_price')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` DROP COLUMN `default_cut_price`');
        }

        // Category language extra fields from overrides
        if ($this->columnExists('category_lang', 'second_name')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'category_lang` DROP COLUMN `second_name`');
        }
        if ($this->columnExists('category_lang', 'top_description')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'category_lang` DROP COLUMN `top_description`');
        }
        if ($this->columnExists('category_lang', 'jsonld')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'category_lang` DROP COLUMN `jsonld`');
        }

        // Order carrier extra columns used by module
        if ($this->columnExists('order_carrier', 'tracking_url')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'order_carrier` DROP COLUMN `tracking_url`');
        }

        // OrderState extra column added by this module's overrides
        if ($this->columnExists('order_state', 'visible_in_select_box')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'order_state` DROP COLUMN `visible_in_select_box`');
        }

        // Orders table extra column used by module
        if ($this->columnExists('orders', 'added_to_order')) {
            Db::getInstance()->execute('ALTER TABLE `' . _DB_PREFIX_ . 'orders` DROP COLUMN `added_to_order`');
        }

        // Drop tables created by this module if they exist
        Db::getInstance()->execute('DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'offer_integration`');
        Db::getInstance()->execute('DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'modernesmid_vat_history`');
        Db::getInstance()->execute('DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'kiyoh_custom`');
        Db::getInstance()->execute('DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'employee_certificate_auth_log`');
        Db::getInstance()->execute('DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'employee_certificate_auth`');

        $mailClass = new MailTheme();
        // Unregister and clean configuration
        $ok = $mailClass->removeThemeSymlink();
        $ok = $ok && Configuration::deleteByName('MSTHEMECONIG_NAME');

        // Uninstall tabs
        $ok = $ok && $this->uninstallTabs();

        // Call parent uninstall at the end
        return $ok && parent::uninstall();
    }

    /**
     * Add the GA4 identifier columns to the cart table.
     *
     * The cart is the only place a GA4 client_id can be captured reliably for redirect-based
     * payments (iDEAL, Bancontact, PayPal, creditcard). Mollie's webhook creates the order
     * server-to-server, so $_COOKIE is empty by the time actionObjectOrderAddAfter fires.
     * Capturing against the cart while the customer is still browsing lets the order hook
     * read the identifiers back regardless of which context created the order.
     *
     * Public because upgrade-1.0.8.php calls it. Idempotent — safe to re-run.
     * Failures are logged but never fatal: analytics must not be able to block an install.
     *
     * @return bool
     */
    public function installGaCartColumns(): bool
    {
        $sep = DIRECTORY_SEPARATOR;
        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');

        $columns = [
            'ga_client_id' => 'VARCHAR(100) DEFAULT NULL',
            'ga_session_id' => 'VARCHAR(50) DEFAULT NULL',
            'ga_analytics_consent' => 'TINYINT(1) DEFAULT NULL',
        ];

        foreach ($columns as $column => $definition) {
            if ($this->columnExists('cart', $column)) {
                continue;
            }

            $sql = 'ALTER TABLE `' . _DB_PREFIX_ . 'cart` ADD `' . $column . '` ' . $definition;
            if (!Db::getInstance()->execute($sql)) {
                $logger->logError('[msthemeconfig] Failed to add cart.' . $column . ': ' . Db::getInstance()->getMsgError());
            } else {
                $logger->logInfo('[msthemeconfig] cart.' . $column . ' added');
            }
        }

        return true;
    }

    /** Idempotent schema setup for manually selected complementary categories. */
    public function installCategoryRelations(): bool
    {
        return (new \MsThemeConfig\Category\CategoryRelationRepository(Db::getInstance()))->install();
    }

    /** Idempotent; required before the refund hook may send any external request. */
    public function installGa4RefundDispatchTable(): bool
    {
        return \MsThemeConfig\Analytics\Ga4RefundStore::install();
    }

    /**
     * Add consent and advertising-attribution snapshots to carts and orders.
     *
     * The browser can disappear during a redirect payment while Mollie's webhook creates the
     * order. Persisting these values on the cart first lets that server-to-server request copy
     * the exact same snapshot to the order. Identifier columns remain NULL unless marketing
     * consent was explicitly granted; a later refusal clears them from the active cart.
     *
     * Raw identifiers stay in the operational database only. The BigQuery sync exports the
     * consent field, but deliberately excludes every identifier below.
     *
     * Public because upgrade-1.0.14.php calls it. Idempotent and safe to re-run.
     */
    public function installAdAttributionColumns(): bool
    {
        $sep = DIRECTORY_SEPARATOR;
        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');

        $columns = [
            'ad_marketing_consent' => 'TINYINT(1) DEFAULT NULL',
            'ad_gclid' => 'VARCHAR(255) DEFAULT NULL',
            'ad_gbraid' => 'VARCHAR(255) DEFAULT NULL',
            'ad_wbraid' => 'VARCHAR(255) DEFAULT NULL',
            'ad_gcl_au' => 'VARCHAR(255) DEFAULT NULL',
            'ad_gcl_aw' => 'VARCHAR(255) DEFAULT NULL',
            'ad_meta_fbp' => 'VARCHAR(255) DEFAULT NULL',
            'ad_meta_fbc' => 'VARCHAR(255) DEFAULT NULL',
            'ad_msclkid' => 'VARCHAR(255) DEFAULT NULL',
        ];
        $success = true;

        foreach (['cart', 'orders'] as $table) {
            $additions = [];
            $addedColumns = [];
            foreach ($columns as $column => $definition) {
                if ($this->columnExists($table, $column)) {
                    continue;
                }

                $additions[] = 'ADD `' . $column . '` ' . $definition;
                $addedColumns[] = $column;
            }

            if (empty($additions)) {
                continue;
            }

            // One ALTER per table avoids repeatedly rebuilding/locking large cart/order tables
            // on MariaDB versions where ADD COLUMN is not an instant metadata operation.
            $sql = 'ALTER TABLE `' . _DB_PREFIX_ . $table . '` ' . implode(', ', $additions);
            if (!Db::getInstance()->execute($sql)) {
                $success = false;
                $logger->logError(
                    '[msthemeconfig] Failed to add advertising columns to ' . $table . ': '
                    . Db::getInstance()->getMsgError()
                );
            } else {
                $logger->logInfo(
                    '[msthemeconfig] ' . $table . ' advertising columns added: '
                    . implode(', ', $addedColumns)
                );
            }
        }

        return $success;
    }

    /**
     * Add consent-independent analytics classifications to the orders table.
     *
     * `analytics_order_channel` distinguishes online, counter and back-office revenue.
     * `analytics_is_test` lets reports exclude selected front-office test accounts. Both
     * values are snapshots taken when the order is created, so changing the configuration
     * later cannot silently rewrite historical reporting.
     *
     * Public because upgrade-1.0.10.php calls it. Idempotent and non-fatal by design.
     */
    public function installAnalyticsOrderClassificationColumns(): bool
    {
        $sep = DIRECTORY_SEPARATOR;
        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');

        $columns = [
            'analytics_order_channel' => 'VARCHAR(20) DEFAULT NULL',
            'analytics_is_test' => 'TINYINT(1) NOT NULL DEFAULT 0',
        ];

        foreach ($columns as $column => $definition) {
            if ($this->columnExists('orders', $column)) {
                continue;
            }

            $sql = 'ALTER TABLE `' . _DB_PREFIX_ . 'orders` ADD `' . $column . '` ' . $definition;
            if (!Db::getInstance()->execute($sql)) {
                $logger->logError('[msthemeconfig] Failed to add orders.' . $column . ': ' . Db::getInstance()->getMsgError());
            } else {
                $logger->logInfo('[msthemeconfig] orders.' . $column . ' added');
            }
        }

        return true;
    }

    /**
     * Hook list for install
     *
     * @return bool
     */
    public function installHooks(): bool
    {
        $hookArray = [
            // Product form (Symfony) data & builder hooks
            'actionProductFormDataProviderData',
            'actionAddressFormBuilderModifier',
            'actionAdminControllerSetMedia',
            'actionAdminProductsControllerSaveAfter',
            'actionAddressGridQueryBuilderModifier',
            'actionAfterCreateAddressFormHandler',
            'actionAfterCreateCategoryFormHandler',
            'actionAfterUpdateCategoryFormHandler',
            'actionAfterCreateCustomerAddressFormHandler',
            'actionAfterCreateCustomerFormHandler',
            'actionAfterCreateProductFormHandler',
            'actionAfterCreateRootCategoryFormHandler',
            // Generic object update hook (needed to react as early as possible on Product updates)
            'actionObjectUpdateAfter',
            'actionObjectCategoryUpdateAfter',
            'actionAfterUpdateCustomerAddressFormHandler',
            'actionAfterUpdateCustomerFormHandler',
            'actionAfterUpdateOrderAddressFormHandler',
            'actionAfterUpdateOrderStateFormHandler',
            'actionAfterUpdateProductFormHandler',
            'actionAfterUpdateRootCategoryFormHandler',
            'actionBuildFrontEndObject',
            'actionBuildMailLayoutVariables',
            // Block core low-stock ("productoutofstock") e-mails via the custom Mail override's actionEmailSendBefore hook
            'actionEmailSendBefore',
            'actionEmailAddAfterContent',
            'sendMailAlterTemplateVars',
            'actionProductFormBuilderModifier',
            'actionCancelProductFormBuilderModifier',
            'actionCategoryFormBuilderModifier',
            'actionCustomerAccountAdd',
            'actionSubmitAccountBefore',
            'actionAuthentication',
            'actionCustomerLogoutBefore',
            'actionCustomerAddressFormBuilderModifier',
            'actionCustomerFormBuilderModifier',
            'actionFrontControllerInitAfter',
            'actionFrontControllerSetVariables',
            'actionDispatcherAfter',
            'actionFrontControllerSetMedia',
            'actionListMailThemes',
            'actionOrderGridDataModifier',
            'actionOrderGridDefinitionModifier',
            'actionOrderGridQueryBuilderModifier',
            'actionOrderStateGridDefinitionModifier',
            'actionOrderStateGridQueryBuilderModifier',
            'actionOrderStateFormBuilderModifier',
            'actionOrderStateFormDataProviderData',
            'actionAfterUpdateOrderStateFormHandler',
            'actionAfterCreateOrderStateFormHandler',
            'actionValidateOrder',
            'actionGetProductPropertiesAfterUnitPrice',
            'actionOrderStatusPostUpdate',
            'actionProductCancel',
            'actionOrderEdited',
            'actionObjectOrderStatusUpdateAfter',
            'actionObjectOrderAddAfter',
            'actionProductSearchAfter',
            'actionProductSearchProviderRunQueryAfter',
            'actionRootCategoryFormBuilderModifier',
            'additionalCustomerFields',
            'displayAdditionalCategoryFields',
            'displayAdditionalCustomerAddressFields',
            'displayAdditionalRootCategoryFields',
            'displayAdminProductsSeoStepBottom',
            'displayBackOfficeHeader',
            'displayFooter',
            'displayHeader',
            'displayHome',
            'displayOrderConfirmation',
            'displayPDFDeliverySlip',
            'displayPDFInvoice',
            'displayPDFOrderReturn',
            'displayPDFOrderSlip',
            'displayPDFPhysicalOnCreditOrderSlip',
            'displayPDFPhysicalOrderSlip',
            'displayPDFSupplyOrderForm',
            'filterProductContent',
            'kiyohBanner',
            // sawandcutmodule compatibility hooks
            'displayBeforeBodyClosingTag',
            'displayProductListReviews',
            'displayProductSawAndCutButtons',
            // Keep registration for these in case they are used elsewhere,
            // but our implementations will return empty to avoid duplicate UI for Product form
            'displayAdminProductsExtra',
            'displayAdminProductsMainStepLeftColumnMiddle',
            'displayAdminProductsMainStepLeftColumnBottom',
            'displayAdminProductsMainStepRightColumnBottom',
            'actionProductUpdate',
            // Dynamic product hooks
            'displayCustomizationMinified',
            // Product grid columns
            'actionProductGridDefinitionModifier',
            'actionProductGridQueryBuilderModifier',
            'actionOrderSlipAdd',
        ];

        $sep = DIRECTORY_SEPARATOR;

        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');

        $allOK = true;
        foreach ($hookArray as $hook) {
            $ok = $this->registerHook($hook);
            if (!$ok) {
                $logger->logDebug('Registration of hook ' . $hook . ' failed');
            }
            $allOK = $allOK && $ok;
        }

        return $allOK;
    }

    /**
     * Install admin tabs defined in $tabs property
     *
     * @return bool
     */
    public function installTabs(): bool
    {
        $sep = DIRECTORY_SEPARATOR;
        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');

        $allOK = true;

        foreach ($this->tabs as $tabData) {
            // Check if tab already exists
            $tabId = (int) Tab::getIdFromClassName($tabData['class_name']);
            $createFresh = function() use ($tabData, $logger) {
                $tab = new \Tab();
                // In newer PS versions, active is a bool. Use boolean to be safe.
                if (property_exists($tab, 'active')) {
                    $tab->active = 1;
                }
                $tab->class_name = $tabData['class_name'];
                if (property_exists($tab, 'module')) {
                    $tab->module = $this->name;
                }

                // Set tab name for all languages
                foreach (Language::getLanguages(true) as $lang) {
                    $langCode = $lang['iso_code'];
                    if (isset($tabData['name'][$langCode])) {
                        $tab->name[$lang['id_lang']] = $tabData['name'][$langCode];
                    } elseif (isset($tabData['name']['en'])) {
                        $tab->name[$lang['id_lang']] = $tabData['name']['en'];
                    } else {
                        $tab->name[$lang['id_lang']] = reset($tabData['name']);
                    }
                }

                // Set parent
                if (isset($tabData['parent_class_name']) && !empty($tabData['parent_class_name'])) {
                    $pid = (int) \Tab::getIdFromClassName($tabData['parent_class_name']);
                    // Fallback: if CONFIGURE pseudo-root not found, try Advanced Parameters section under Configure
                    if ($pid <= 0 && $tabData['parent_class_name'] === 'CONFIGURE') {
                        $pid = (int) \Tab::getIdFromClassName('AdminAdvancedParameters');
                    }
                    $tab->id_parent = $pid;
                } else {
                    $tab->id_parent = 0;
                }

                // Set icon if available
                if (isset($tabData['icon']) && !empty($tabData['icon']) && property_exists($tab, 'icon')) {
                    $tab->icon = $tabData['icon'];
                }

                // Set route if available
                if (property_exists($tab, 'route_name')) {
                    if (isset($tabData['route_name']) && !empty($tabData['route_name'])) {
                        $tab->route_name = $tabData['route_name'];
                    } else {
                        // PS9+ prefers NULL over empty string for nullable columns (CHECK constraints)
                        $tab->route_name = null;
                    }
                }

                // Normalize route_params: must be NULL or valid JSON (PS9 JSON/NULL constraint)
                $tab->route_params = null;
                if (property_exists($tab, 'route_params')) {
                    if (isset($tabData['route_params']) && is_array($tabData['route_params']) && !empty($tabData['route_params'])) {
                        // Legacy Tab class expects stringified JSON in older versions; JSON column in PS9 accepts JSON string as well
                        $tab->route_params = json_encode($tabData['route_params']);
                    } else {
                        $tab->route_params = null;
                    }
                }

                // Set wording if available (PS 1.7.7+)
                if (property_exists($tab, 'wording') && isset($tabData['wording'])) {
                    $tab->wording = $tabData['wording'];
                }
                if (property_exists($tab, 'wording_domain') && isset($tabData['wording_domain'])) {
                    $tab->wording_domain = $tabData['wording_domain'];
                }

                $result = $tab->add();
                return [ $result, $tab ];
            };

            if ($tabId) {
                // Update existing tab with new settings
                $logger->logInfo('[msthemeconfig] Tab exists: updating ' . $tabData['class_name']);
                $tab = new \Tab($tabId);
                if (property_exists($tab, 'active')) {
                    $tab->active = 1;
                }
                if (property_exists($tab, 'module')) {
                    $tab->module = $this->name;
                }
                // Update names across languages
                foreach (Language::getLanguages(true) as $lang) {
                    $langCode = $lang['iso_code'];
                    if (isset($tabData['name'][$langCode])) {
                        $tab->name[$lang['id_lang']] = $tabData['name'][$langCode];
                    } elseif (isset($tabData['name']['en'])) {
                        $tab->name[$lang['id_lang']] = $tabData['name']['en'];
                    } else {
                        $tab->name[$lang['id_lang']] = reset($tabData['name']);
                    }
                }
                // Parent
                if (isset($tabData['parent_class_name']) && !empty($tabData['parent_class_name'])) {
                    $pid = (int) \Tab::getIdFromClassName($tabData['parent_class_name']);
                    if ($pid <= 0 && $tabData['parent_class_name'] === 'CONFIGURE') {
                        $pid = (int) \Tab::getIdFromClassName('AdminAdvancedParameters');
                    }
                    $tab->id_parent = $pid;
                } else {
                    $tab->id_parent = 0;
                }
                // Icon
                if (isset($tabData['icon']) && !empty($tabData['icon']) && property_exists($tab, 'icon')) {
                    $tab->icon = $tabData['icon'];
                }
                // Route
                if (property_exists($tab, 'route_name')) {
                    if (isset($tabData['route_name']) && !empty($tabData['route_name'])) {
                        $tab->route_name = $tabData['route_name'];
                    } else {
                        // Use NULL instead of empty string to satisfy PS9 DB constraints
                        $tab->route_name = null;
                    }
                }
                // Route params
                if (property_exists($tab, 'route_params')) {
                    if (isset($tabData['route_params']) && is_array($tabData['route_params']) && !empty($tabData['route_params'])) {
                        $tab->route_params = json_encode($tabData['route_params']);
                    } else {
                        $tab->route_params = null;
                    }
                }
                // Wording
                if (property_exists($tab, 'wording') && isset($tabData['wording'])) {
                    $tab->wording = $tabData['wording'];
                }
                if (property_exists($tab, 'wording_domain') && isset($tabData['wording_domain'])) {
                    $tab->wording_domain = $tabData['wording_domain'];
                }

                $saved = false;
                try {
                    $saved = (bool)$tab->save();
                } catch (\Throwable $e) {
                    $saved = false;
                    $logger->logWarning('[msthemeconfig] Failed to update tab ' . $tabData['class_name'] . ' via save(): ' . $e->getMessage());
                }

                if (!$saved) {
                    // Fallback: delete and recreate
                    try {
                        if ($tab->delete()) {
                            $logger->logInfo('[msthemeconfig] Deleted existing tab ' . $tabData['class_name'] . ' to recreate with new settings');
                            list($okAdd, $newTab) = $createFresh();
                            if (!$okAdd) {
                                $logger->logError('[msthemeconfig] Failed to recreate tab: ' . $tabData['class_name']);
                                $allOK = false;
                            } else {
                                $logger->logInfo('[msthemeconfig] Recreated tab: ' . $tabData['class_name']);
                            }
                        } else {
                            $logger->logError('[msthemeconfig] Could not delete existing tab ' . $tabData['class_name'] . ' for recreation');
                            $allOK = false;
                        }
                    } catch (\Throwable $e) {
                        $logger->logError('[msthemeconfig] Exception while recreating tab ' . $tabData['class_name'] . ': ' . $e->getMessage());
                        $allOK = false;
                    }
                } else {
                    $logger->logInfo('[msthemeconfig] Updated tab: ' . $tabData['class_name']);
                }
            } else {
                // Create fresh
                list($result, $tab) = $createFresh();
                if (!$result) {
                    $logger->logError('[msthemeconfig] Failed to install tab: ' . $tabData['class_name']);
                    $allOK = false;
                } else {
                    $logger->logInfo('[msthemeconfig] Tab installed: ' . $tabData['class_name']);
                }
            }
        }

        // Reset Tab static cache after changes to ensure BO picks up new structure immediately
        if (method_exists('Tab', 'resetStaticCache')) {
            try { \Tab::resetStaticCache(); } catch (\Throwable $e) {}
        }

        return $allOK;
    }

    /**
     * Uninstall admin tabs defined in $tabs property
     *
     * @return bool
     */
    private function uninstallTabs(): bool
    {
        $allOK = true;

        foreach ($this->tabs as $tabData) {
            $tabId = (int) \Tab::getIdFromClassName($tabData['class_name']);

            if ($tabId) {
                $tab = new \Tab($tabId);
                if (!$tab->delete()) {
                    $allOK = false;
                }
            }
        }

        return $allOK;
    }

    /**
     * Quick maintenance utility to fix or rebuild Back Office Tabs without reinstalling the module.
     * Intended to be called from Back Office context (e.g., via hookDisplayBackOfficeHeader guard).
     *
     * Modes:
     * - ensure: verify tabs presence via installTabs() but do not force delete existing
     * - reinstall: remove known tabs then install again
     *
     * Returns true on success, false if any step failed.
     */
    public function repairTabs(string $mode = 'ensure'): bool
    {
        $sep = DIRECTORY_SEPARATOR;
        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');

        try {
            $mode = Tools::strtolower($mode);
        } catch (\Throwable $e) {
            // fallback
        }

        // Reset Tab static cache to avoid stale id lookups
        if (method_exists('Tab', 'resetStaticCache')) {
            try { \Tab::resetStaticCache(); } catch (\Throwable $e) {}
        }

        if ($mode === 'reinstall') {
            $logger->logInfo('[msthemeconfig] repairTabs: reinstall requested');
            $ok = $this->uninstallTabs();
            if (!$ok) {
                $logger->logWarning('[msthemeconfig] repairTabs: uninstallTabs reported failures');
            }
            $ok2 = $this->installTabs();
            if (!$ok2) {
                $logger->logError('[msthemeconfig] repairTabs: installTabs reported failures');
            }
            // Reset cache again after changes
            if (method_exists('Tab', 'resetStaticCache')) {
                try { \Tab::resetStaticCache(); } catch (\Throwable $e) {}
            }
            return $ok && $ok2;
        }

        // Default: ensure (idempotent install only where missing)
        $logger->logInfo('[msthemeconfig] repairTabs: ensure requested');
        $ok = $this->installTabs();
        if (!$ok) {
            $logger->logWarning('[msthemeconfig] repairTabs: installTabs reported failures while ensuring');
        }
        if (method_exists('Tab', 'resetStaticCache')) {
            try { \Tab::resetStaticCache(); } catch (\Throwable $e) {}
        }
        return $ok;
    }

    /**
     * Load the configuration form.
     */
    public function getContent(): string
    {
        $configurationError = '';
        /*
         * If values have been submitted in the form, process.
         */
        if (Tools::getValue('submitMsThemeConfig') == 1) {
            try {
                $this->postProcess();
                $this->installHooks();
            } catch (\DomainException $error) {
                $configurationError = $this->displayError($error->getMessage());
            }
        }

        try {
            $modernConfig = $this->getModernConfig();
            /** @var ModernAjax $modernAjax */
            $modernAjax = $this->get(ModernAjax::class);
            $ajaxUrl = $modernAjax->getAjaxUrl();
            $select2Url = str_replace('%20', '', $modernAjax->getSelect2Url());
            $symlinkMailthemeUrl = str_replace('%20', '', $modernAjax->getSymlinkMailthemeUrl());

            $access = $modernConfig->getAccessiblePanelsUser($this->context->employee->id_profile);

            $viewData = [
                'ajax_url' => $ajaxUrl,
                'module_dir' => $this->_path,
                'select2_url' => $select2Url,
                'symlink_mailtheme_url' => $symlinkMailthemeUrl,
                'employee_access' => $access,
            ];

            return $configurationError . $modernConfig->getConfigPage($viewData);
        } catch (PrestaShopDatabaseException|PrestaShopException|PrestaShopException $e) {
            return $e->getMessage();
        }
    }

    /**
     * Upload a new file uploaded at configuration page
     *
     * @param $file
     * @param $dest
     *
     * @return mixed|void
     */
    protected function uploadFiles($file, $dest = null)
    {
        // Upload files
        $allowed = [
            'png',
            'jpeg',
            'gif',
            'jpg',
            'svg',
        ];
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        if (file_exists($file['tmp_name']) && in_array($extension, $allowed)) {
            $filename = uniqid() . '-' . basename($file['name']);
            $filename = str_replace(' ', '-', $filename);
            $filename = htmlspecialchars(strtolower($filename));
            $filename = filter_var($filename);

            $file['name'] = $filename;

            $uploader = new UploaderCore();
            $uploader->upload($file, $dest);

            return $file['name'];
        }
    }

    /**
     * Save the data send from POST form
     */
    protected function postProcess(): void
    {
        // Refresh multistore context at runtime to ensure correct shop/group/lang IDs when saving
        $this->refreshMultistoreContext();
        $this->idLang = (int)$this->context->language->id;

        $imgKeys = [
            'MSTHEMECONFIG_ADMIN_HEADER_LOGO',
            'MSTHEMECONFIG_BANNER_FIRST_IMAGE',
            'MSTHEMECONFIG_BANNER_SECOND_IMAGE',
            'MSTHEMECONFIG_BANNER_THIRD_IMAGE',
            'MSTHEMECONFIG_BANNER_FOURTH_IMAGE',
            'MSTHEMECONFIG_BANNER_FIFTH_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIRST_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_SECOND_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_THIRD_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_IMAGE',
            'MSTHEMECONFIG_ADMIN_HEADER_LOGO',
        ];

        // TinyMCE fields (must be saved as RAW HTML)
        $textareaKeys = [
            'MSTHEMECONFIG_FOOTERTOP_ABOUTUS_TEXT',
            'MSTHEMECONFIG_FOOTERTOP_ABOUTUS_LINK',
            'MSTHEMECONFIG_FOOTERTOP_INFORMATION',
            'MSTHEMECONFIG_FOOTERTOP_PARTNERS',
            'MSTHEMECONFIG_HOMEPAGE_TEXT',
            'MSTHEMECONFIG_SHOP_NOTIFICATION_TEXT',
            'MSTHEMECONFIG_CATEGORY_BOTTOM_TEXT',
            'MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_TEXT',
            'MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_TEXT',
            'MSTHEMECONFIG_FOOTERTOP_STOREINFO_OPENED',
        ];

        // Select2 multiple (should be stored as JSON array of integers)
        $multipleSelectKeys = [
            'MSTHEMECONFIG_CHANNABLE_CATEGORIES',
            'MSTHEMECONFIG_GA4_TRIGGER_STATES',
            'MSTHEMECONFIG_GA4_CANCEL_STATES',
            'MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES',
            'MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES',
            'MSTHEMECONFIG_EMPLOYEE_SHOP_PROFILES',
            'MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
            'MSTHEMECONFIG_ANALYTICS_TEST_CUSTOMERS',
            'MSTHEMECONFIG_FEATURE_ENABLED',
            'MSTHEMECONFIG_FEATURE_ENABLED_SORTED',
            'KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES',
            'KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES',
            'KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES',
            'KOOPMANORDEREXPORT_SELECT_STATUS',
            // Ensure homepage selected categories is treated as multi-select (saved as JSON)
            'MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES',
            'MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED',
            'MSTHEMECONFIG_SSA_PRODUCTS',
            'MSTHEMECONFIG_SSA_CATEGORIES',
            // Balie checkout: allowed carrier id_references (stored as JSON int[])
            'MSTHEMECONFIG_COUNTER_CARRIER_REFS',
            // Balie checkout: allowed payment module names (stored as JSON string[])
            'MSTHEMECONFIG_COUNTER_PAYMENT_MODULES',
        ];

        // Select2 single (should be stored as integers)
        $singleIntegerKeys = [
            'MSTHEMECONFIG_FEATURE_WIDTH',
            'MSTHEMECONFIG_FEATURE_HEIGHT',
            'MSTHEMECONFIG_FEATURE_LENGTH',
            'MSTHEMECONFIG_FEATURE_WEIGHT',
            'MSTHEMECONFIG_FEATURE_MATERIAL',
            // contact/cms page linkers
            'MSTHEMECONFIG_CONTACTPAGE_CONSTRUCTION',
            'MSTHEMECONFIG_CONTACTPAGE_FAQ',
            'MSTHEMECONFIG_CONTACTPAGE_PRIVACY',
            'MSTHEMECONFIG_AVG_INFO_PAGE',
            'MSTHEMECONFIG_SSA_PRODUCTS_TYPE',
            'MSTHEMECONFIG_RETOUR_COST_NL',
            'MSTHEMECONFIG_RETOUR_COST_BE',
        ];

        // Carrier config keys should be stored as carrier id_reference
        $carrierKeys = [
            'MSTHEMECONFIG_SHIPPING_CARRIER',
            'MSTHEMECONFIG_PICKUP_CARRIER',
            'MSTHEMECONFIG_ADD2ORDER_CARRIER',
            'KOOPMANORDEREXPORT_SELECT_CARRIER',
            'KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER',
            'KOOPMANORDEREXPORT_SELECT_ADDEDORDER_CARRIER',
            // Balie checkout: single default carrier (stored as id_reference)
            'MSTHEMECONFIG_COUNTER_DEFAULT_CARRIER_REF',
        ];

        $form_values = Tools::getAllValues();
        \MsThemeConfig\AI\ToolKeySettings::saveRequest($_POST);
        \MsThemeConfig\Plasma\PlasmaSettings::saveRequest($form_values);
        $hasFeatureEnabledOrder = array_key_exists('MSTHEMECONFIG_FEATURE_ENABLED_SORTED', $form_values);

        foreach (array_keys($form_values) as $key) {
            // Credentials have their own POST-only, authenticated, shop-scoped save path.
            if (\MsThemeConfig\AI\ToolKeySettings::isManagedField($key)) {
                continue;
            }
            if (str_starts_with($key, 'MSTHEMECONFIG_PLASMA_')) {
                continue;
            }
            if (!preg_match('/^[A-Z0-9_]+$/', $key)) {
                continue;
            }

            // The sortable hidden input is canonical and also handles an empty selection.
            if ($key === 'MSTHEMECONFIG_FEATURE_ENABLED' && $hasFeatureEnabledOrder) {
                continue;
            }

            // check if is multiple select (Save JSON array of integers)
            if (in_array($key, $multipleSelectKeys)) {
                // Collect values from request; support both name="KEY[]" and name="KEY"
                $raw = Tools::getValue($key);
                // If PHP receives a string (because template missed []), try to split CSV
                if (!is_array($raw)) {
                    if (is_string($raw) && $raw !== '') {
                        // Select2 usually posts comma-separated when not using []
                        // Remove all [ and ] characters before splitting
                        $raw = preg_replace('/[\[\]"]/', '', $raw);

                        $raw = array_map('trim', explode(',', $raw));
                    } else {
                        $raw = [];
                    }
                }

                // Notification pages include non-numeric IDs (e.g. "product", "home").
                // Preserve strings while normalizing numeric IDs to integers.
                if (in_array($key, ['MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES', 'MSTHEMECONFIG_COUNTER_PAYMENT_MODULES'], true)) {
                    $normalized = array_values(array_filter(array_map(function ($v) {
                        if (is_array($v) && isset($v['id'])) { $v = $v['id']; }
                        if (is_object($v) && isset($v->id)) { $v = $v->id; }
                        $v = is_string($v) ? trim($v) : $v;
                        if ($v === '' || $v === null) {
                            return null;
                        }
                        if (is_numeric($v) && ctype_digit((string)$v)) {
                            return (int)$v;
                        }
                        return (string)$v;
                    }, (array)$raw), function ($v) { return $v !== null && $v !== ''; }));

                    $json = json_encode($normalized, JSON_UNESCAPED_SLASHES);
                    $this->updateConfigValue($key, [$this->idLang => $json]);
                    continue;
                }

                // Normalize to integers and keep non-zero IDs only
                $normalized = array_values(array_filter(array_map(function ($v) {
                    // Support objects coming from some JS serializers
                    if (is_array($v) && isset($v['id'])) { $v = $v['id']; }
                    if (is_object($v) && isset($v->id)) { $v = $v->id; }
                    $v = is_string($v) ? trim($v) : $v;
                    return (int)$v;
                }, (array)$raw), function ($v) { return (int)$v !== 0; }));
                $json = json_encode($normalized, JSON_UNESCAPED_SLASHES);

                $this->updateConfigValue($key, [$this->idLang => $json]);
                if ($key === 'MSTHEMECONFIG_FEATURE_ENABLED_SORTED') {
                    // Keep the existing public configuration key backwards compatible.
                    $this->updateConfigValue('MSTHEMECONFIG_FEATURE_ENABLED', [$this->idLang => $json]);
                }
                continue;
            }

            if (in_array($key, $carrierKeys, true)) {
                $val = Tools::getValue($key);
                $carrierId = is_array($val) ? (int) reset($val) : (int) $val;
                $carrierRef = $this->normalizeCarrierReferenceId($carrierId);
                $this->updateConfigValue($key, [$this->idLang => $carrierRef]);
                continue;
            }

            if (in_array($key, $imgKeys)) {
                if (!isset($_FILES[$key]) || $_FILES[$key]['name'] == '') {
                    continue;
                }

                $file = $this->uploadFiles($_FILES[$key]);
                $this->updateConfigValue($key, [$this->idLang => $file]);
                continue;
            } elseif (in_array($key, $textareaKeys)) {
                // Save raw HTML (no purifier). Configuration::updateValue($html=true)
                $raw = Tools::getValue($key); // keep raw; allowHtml flag controls purifier
                $this->updateConfigValue($key, [$this->idLang => $raw], true);
                continue;
            } elseif (in_array($key, $singleIntegerKeys)) {
                $val = Tools::getValue($key);
                $intVal = is_array($val) ? (int)reset($val) : (int)$val;
                if (strpos($key, 'RETOUR_COST') !== false) {
                    $this->updateConfigValue($key, $intVal);
                } else {
                    $this->updateConfigValue($key, [$this->idLang => $intVal]);
                }
                continue;
            } elseif (in_array($key, ['MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON', 'SENDMAIL_ORDER_STATUS', 'SENDMAIL_ORDER_STATUS_FIRST_EMAIL', 'SENDMAIL_ORDER_STATUS_SECOND_EMAIL'])) {
                if (in_array($key, ['SENDMAIL_ORDER_STATUS', 'SENDMAIL_ORDER_STATUS_FIRST_EMAIL', 'SENDMAIL_ORDER_STATUS_SECOND_EMAIL'])) {
                    continue;
                }
                $orderStateIds = Tools::getValue('SENDMAIL_ORDER_STATUS');
                $orderStateFirstEmails = Tools::getValue('SENDMAIL_ORDER_STATUS_FIRST_EMAIL');
                $orderStateSecondEmails = Tools::getValue('SENDMAIL_ORDER_STATUS_SECOND_EMAIL');
                $orderStateIdEmailArr = [];
                $orderStateJSON = '';

                if (is_array($orderStateIds) && count($orderStateIds) > 0) {
                    for ($i = 0; $i < count($orderStateIds); ++$i) {
                        $state = new OrderState($orderStateIds[$i]);

                        $orderStateIdEmailArr[$i] = [];
                        $orderStateIdEmailArr[$i]['id_order_state'] = $orderStateIds[$i];
                        $orderStateIdEmailArr[$i]['id_order_state_text'] = $state->getFieldByLang('name', 1);
                        $orderStateIdEmailArr[$i]['first_email_order_state'] = $orderStateFirstEmails[$i];
                        $orderStateIdEmailArr[$i]['second_email_order_state'] = $orderStateSecondEmails[$i];
                    }

                    $orderStateJSON = json_encode($orderStateIdEmailArr);
                }
                $this->updateConfigValue($key, [$this->idLang => $orderStateJSON]);
                continue;
            } else {
                // is only text
                $this->updateConfigValue($key, [$this->idLang => Tools::getValue($key)]);
                continue;
            }
        }

        // Persist Saw & Cut configuration as separate values
        try {
            $map = [
                'SAWANDCUT_ATTRIBUTE_GROUP',
                'SAWANDCUT_ATTRIBUTE_GROUP_CUT',
                'SAWANDCUT_FEATURE_LENGTH',
                'SAWANDCUT_FEATURE_CUTLENGTH',
                'SAWANDCUT_FEATURE_CUTWIDTH',
                'SAWANDCUT_DEFAULT_SAWLOSS',
                'SAWANDCUT_DEFAULT_MINSAWSIZE',
                'SAWANDCUT_DEFAULT_MINCUTSIZE',
                'SAWANDCUT_DEFAULT_MINCUTREMAINDER',
                'SAWANDCUT_DEFAULT_CUT_PRICE',
                'SAWANDCUT_SINGLE_CUT_ENABLED',
                'SAWANDCUT_OFFER_PAGE',
                'SAWANDCUT_SAWINFO_PAGE',
                'SAWANDCUT_CUTINFO_PAGE',
            ];

            $hasSawcutField = false;
            foreach ($map as $formKey) {
                if (Tools::getIsset($formKey)) { $hasSawcutField = true; break; }
            }
            if ($hasSawcutField) {
                foreach ($map as $formKey) {
                    $val = Tools::getValue($formKey, null);
                    if ($val === null) { continue; }
                    // Select2 values may come as JSON like ["12"], normalize to scalar
                    if (is_array($val)) {
                        $val = reset($val);
                    }
                    $val = trim((string) $val);
                    $this->updateConfigValue($formKey, $val);
                }
            }
        } catch (\Throwable $e) {
            // ignore errors to not block saving other settings
        }
    }

    /**
     * Initialize multistore context based on current shop context
     */
    private function initializeMultistoreContext(): void
    {
        $shopContext = Shop::getContext();

        switch ($shopContext) {
            case Shop::CONTEXT_ALL:
                $this->idShop = null;
                $this->idShopGroup = null;
                break;

            case Shop::CONTEXT_GROUP:
                $this->idShop = null;
                $this->idShopGroup = $this->context->shop->getGroup()->id;
                break;

            case Shop::CONTEXT_SHOP:
            default:
                $this->idShop = $this->context->shop->id;
                $this->idShopGroup = $this->context->shop->getGroup()->id;
                break;
        }
    }

    /**
     * Refresh multistore context just-in-time before saving or loading form data.
     * Ensures we use the current Back Office context (All shops / Group / Shop)
     * and a valid language id.
     */
    private function refreshMultistoreContext(): void
    {
        // Re-evaluate the active shop context
        $this->initializeMultistoreContext();

        // Normalize types and fallbacks
        if ($this->idShop !== null) {
            $this->idShop = (int) $this->idShop;
        }
        if ($this->idShopGroup !== null) {
            $this->idShopGroup = (int) $this->idShopGroup;
        }

        // Always use the current employee language in BO for saves
        $this->idLang = (int) ($this->context && $this->context->language ? $this->context->language->id : (int) Configuration::get('PS_LANG_DEFAULT'));
    }

    /**
     * Get configuration value with proper multistore context
     *
     * @param string $key Configuration key
     * @param mixed $default Default value if not found
     *
     * @return mixed
     */
    private function getConfigValue(string $key, $default = null)
    {
        return Configuration::get(
            $key,
            $this->idLang,
            $this->idShopGroup,
            $this->idShop,
            $default
        );
    }

    /**
     * Update configuration value with proper multistore context
     *
     * @param string $key Configuration key
     * @param mixed $value Value to set
     *
     * @return bool
     */
    private function updateConfigValue(string $key, $value, bool $allowHtml = false): bool
    {
        return Configuration::updateValue(
            $key,
            $value,
            $allowHtml, // allow raw HTML when saving TinyMCE fields
            $this->idShopGroup,
            $this->idShop
        );
    }

    /**
     * Normalize carrier configuration value to id_reference.
     */
    private function normalizeCarrierReferenceId(int $carrierId): int
    {
        if ($carrierId <= 0) {
            return 0;
        }

        $carrier = new \Carrier($carrierId);
        if (\Validate::isLoadedObject($carrier)) {
            return (int) ($carrier->id_reference ?: $carrier->id);
        }

        $carrierByReference = \Carrier::getCarrierByReference($carrierId);
        if ($carrierByReference && \Validate::isLoadedObject($carrierByReference)) {
            return (int) ($carrierByReference->id_reference ?: $carrierId);
        }

        return (int) $carrierId;
    }

    /**
     * Safe column existence check compatible with MySQL and PrestaShop Db::getValue
     */
    private function columnExists(string $table, string $column): bool
    {
        $sql = 'SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS'
            . ' WHERE TABLE_SCHEMA = "' . pSQL(_DB_NAME_) . '"'
            . ' AND TABLE_NAME = "' . pSQL(_DB_PREFIX_ . $table) . '"'
            . ' AND COLUMN_NAME = "' . pSQL($column) . '"';

        return (bool) Db::getInstance()->getValue($sql);
    }

    private function columnType(string $table, string $column): string
    {
        $sql = 'SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS'
            . ' WHERE TABLE_SCHEMA = "' . pSQL(_DB_NAME_) . '"'
            . ' AND TABLE_NAME = "' . pSQL(_DB_PREFIX_ . $table) . '"'
            . ' AND COLUMN_NAME = "' . pSQL($column) . '"'
            . ' LIMIT 1';

        return (string) Db::getInstance()->getValue($sql);
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function createOfferIntegrationCategory(): bool
    {
        $check = Category::searchByName((int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop), 'Offertes', true);

        if (empty($check)) {
            $category = new Category();
            $category->name = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offertes'];
            $category->second_name = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte Category'];
            $category->link_rewrite = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte'];
            $category->description = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Speciale Categorie voor Offertes'];
            $category->active = 1;
            $category->is_root_category = 0;
            $category->position = 1;
            $category->id_parent = 1;

            if ($category->add()) {
                Configuration::set('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', (int) $category->id_category, $this->idShopGroup, $this->idShop);

                return true;
            }
        } else {
            $category = new Category((int) $check['id_category']);
            $category->name = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offertes'];
            $category->second_name = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte Category'];
            $category->link_rewrite = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte'];
            $category->description = [(int) Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Speciale Categorie voor Offertes'];
            $category->active = 1;
            $category->is_root_category = 0;
            $category->position = 1;
            $category->id_parent = 1;

            if ($category->update()) {
                Configuration::set('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', (int) $category->id_category, $this->idShopGroup, $this->idShop);

                return true;
            }
        }

        return false;
    }

    /**
     * @param $params
     *
     * @return string
     *
     * @throws PrestaShopException
     */
    public function hookDisplayHome($params): string
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayHome();
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayFooter($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayFooter();
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayBackOfficeHeader($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayBackOfficeHeader($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayHeader($params): void
    {
        // Keep existing header behavior
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayHeader();
        // No Dynamic Product assets here; rely on native module hooks.
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayOrderConfirmation($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayOrderConfirmation($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayPDFDeliverySlip($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayPDFDeliverySlip($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayPDFInvoice($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
    }

    /**
     * @param $params
     *
     * @return void
     */
    public function hookDisplayPDFOrderReturn($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
    }

    /**
     * @param $params
     *
     * @return void
     */
    public function hookDisplayPDFOrderSlip($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
    }

    /**
     * @param $params
     *
     * @return void
     */
    public function hookDisplayPDFPhysicalOnCreditOrderSlip($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
    }

    /**
     * @param $params
     *
     * @return void
     */
    public function hookDisplayPDFPhysicalOrderSlip($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
    }

    /**
     * @param $params
     *
     * @return void
     */
    public function hookDisplayPDFSupplyOrderForm($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookFilterProductContent($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookFilterProductContent($params);
    }

    /**
     * @param array $params
     *
     * @return void
     */
    public function hookActionProductSearchAfter(array $params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionProductSearchAfter($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionProductSearchProviderRunQueryAfter($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionProductSearchProviderRunQueryAfter($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionBuildFrontEndObject($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionBuildFrontEndObject($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function hookDisplayAdminProductsSeoStepBottom($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayAdminProductsSeoStepBottom($params);
    }

    /**
     * @param $params
     *
     * @return mixed
     *
     * @throws PrestaShopException
     */
    public function hookActionAdminProductsControllerSaveAfter($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookActionAdminProductsControllerSaveAfter($params);
    }

    /**
     * @param $data
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException|LocalizationException
     */
    public function hookActionObjectOrderAddAfter(array $params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionObjectOrderAddAfter($params);
    }

    public function hookActionOrderStatusPostUpdate($data): void
    {
        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderStatusPostUpdate($data);
    }

    /**
     * @param array $params
     *
     * @return void
     */
    public function hookActionValidateOrder($params): void
    {
        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }
        $hookClass = $this->getModernHooks();
        if (method_exists($hookClass, 'hookActionValidateOrder')) {
            $hookClass->hookActionValidateOrder($params);
        }
    }

    /**
     * @param array $params
     *
     * @return void
     */
    public function hookActionGetProductPropertiesAfterUnitPrice(&$params): void
    {
        $hookClass = $this->getModernHooks();
        if (method_exists($hookClass, 'hookActionGetProductPropertiesAfterUnitPrice')) {
            $hookClass->hookActionGetProductPropertiesAfterUnitPrice($params);
        }
    }

    /**
     * @param array $params
     *
     * @return void
     */
    public function hookActionOrderEdited($params): void
    {
        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }
        $hookClass = $this->getModernHooks();
        if (method_exists($hookClass, 'hookActionOrderEdited')) {
            $hookClass->hookActionOrderEdited($params);
        }
    }

    public function hookActionProductCancel(array $params): void
    {
        $hookClass = $this->getModernHooks();
        if (method_exists($hookClass, 'hookActionProductCancel')) {
            $hookClass->hookActionProductCancel($params);
        }
    }

    /**
     * @param $customer
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionCustomerAccountAdd($customer): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCustomerAccountAdd($customer);
    }

    public function hookActionAuthentication(array $params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAuthentication($params);
    }

    public function hookActionSubmitAccountBefore(array $params): bool
    {
        return (new \MsThemeConfig\Customer\RegistrationValidator())->validate(
            $this->context,
            Tools::getAllValues()
        );
    }

    public function hookActionCustomerLogoutBefore(array $params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCustomerLogoutBefore($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionCustomerAddressFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCustomerAddressFormBuilderModifier($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayAdditionalCustomerAddressFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayAdditionalCustomerAddressFields($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionAfterUpdateCustomerAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateCustomerAddressFormHandler($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionAfterCreateCustomerAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateCustomerAddressFormHandler($params);
    }

    /**
     * @param $params
     *
     * @return void
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws ModuleErrorException|PrestaShopException
     */
    public function hookActionAddressFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAddressFormBuilderModifier();
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException|PrestaShopException
     */
    public function hookActionAfterCreateAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateAddressFormHandler($params);
    }

    /**
     * @param $params;
     *
     * @throws PrestaShopException
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookActionFrontControllerSetMedia($params)
    {
        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }

        $hookClass = $this->getModernHooks();

        return $hookClass->hookActionFrontControllerSetMedia();
    }

    /**
     * @param $params;
     *
     * @throws PrestaShopException
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookActionAdminControllerSetMedia($params): void
    {
        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAdminControllerSetMedia($params);
    }

    /**
     * @return string|bool
     */
    public function hookKiyohBanner(): string|bool
    {
        try {
            $hookClass = $this->getModernHooks();

             return $hookClass->hookKiyohBanner();
        } catch (PrestaShopException|PrestaShopException|SmartyException) {
            return '';
        }
    }

    // Saw & Cut compatibility hooks
    public function hookDisplayBeforeBodyClosingTag($params)
    {
        $hookClass = $this->getModernHooks();
        return (string)$hookClass->hookDisplayBeforeBodyClosingTag($params);
    }

    public function hookDisplayProductListReviews($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayProductListReviews($params);
    }

    public function hookDisplayProductSawAndCutButtons($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayProductSawAndCutButtons($params);
    }

    public function hookDisplayAdminProductsExtra($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayAdminProductsExtra($params);
    }

    public function hookDisplayAdminProductsMainStepLeftColumnMiddle($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayAdminProductsMainStepLeftColumnMiddle($params);
    }

    public function hookDisplayAdminProductsMainStepLeftColumnBottom($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayAdminProductsMainStepLeftColumnBottom($params);
    }

    public function hookDisplayAdminProductsMainStepRightColumnBottom($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookDisplayAdminProductsMainStepRightColumnBottom($params);
    }

    public function hookActionProductUpdate($params)
    {
        $hookClass = $this->getModernHooks();

        return $hookClass->hookActionProductUpdate($params);
    }

    /**
     * Forward generic object update hook to ModernHook so we can handle Product-specific updates
     * as early as possible in the update lifecycle.
     *
     * @param array $params
     * @return void
     */
    public function hookActionObjectUpdateAfter($params): void
    {
        $hookClass = $this->getModernHooks();
        if (method_exists($hookClass, 'hookActionObjectUpdateAfter')) {
            $hookClass->hookActionObjectUpdateAfter($params);
        }
    }

    /**
     * @throws PrestaShopException
     * @throws Exception
     */
    public function hookActionFrontControllerInitAfter(): void
    {
        $this->registerSmartyPlugins($this->context->smarty);
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionFrontControllerInitAfter();
    }

    /**
     * @throws PrestaShopException
     */
    public function hookActionCategoryFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCategoryFormBuilderModifier($params);
    }

    /**
     * @throws PrestaShopException
     */
    public function hookDisplayAdditionalCategoryFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayAdditionalCategoryFields();
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionObjectCategoryUpdateAfter($params)
    {
        try {
            $hookClass = $this->getModernHooks();

            return $hookClass->hookActionObjectCategoryUpdateAfter($params);
        } catch (PrestaShopException $e) {
            // Swallow exception to avoid breaking flow in production; consider logging if needed.
            return null;
        }
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionAfterCreateCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateCategoryFormHandler($params);
    }

    public function hookActionAfterUpdateCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateCategoryFormHandler($params);
    }

    /**
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookActionRootCategoryFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionRootCategoryFormBuilderModifier($params);
    }

    /**
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookDisplayAdditionalRootCategoryFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayAdditionalRootCategoryFields();
    }

    /**
     * @param $params
     *
     * @throws ModuleErrorException
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookActionAfterUpdateRootCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateRootCategoryFormHandler($params);
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException|PrestaShopException
     */
    public function hookActionAfterCreateRootCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateRootCategoryFormHandler($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookActionAfterUpdateOrderAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateOrderAddressFormHandler($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookActionCustomerFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCustomerFormBuilderModifier($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException|PrestaShopException
     */
    public function hookAdditionalCustomerFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookAdditionalCustomerFields();
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     * @throws ModuleErrorException|PrestaShopException
     */
    public function hookActionAfterUpdateCustomerFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateCustomerFormHandler($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionAfterCreateCustomerFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateCustomerFormHandler($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     * @throws ColumnNotFoundException|PrestaShopException
     */
    public function hookActionOrderGridDefinitionModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderGridDefinitionModifier($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionOrderGridDataModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderGridDataModifier($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionOrderGridQueryBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderGridQueryBuilderModifier($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionAddressGridQueryBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAddressGridQueryBuilderModifier($params);
    }

    /**
     * @param $params
     * @return void
     */
    public function hookActionProductGridDefinitionModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionProductGridDefinitionModifier($params);
    }

    /**
     * @param $params
     * @return void
     */
    public function hookActionProductGridQueryBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionProductGridQueryBuilderModifier($params);
    }

    /**
     * @param $params
     * @return void
     */
    public function hookActionObjectOrderStatusUpdateAfter($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionObjectOrderStatusUpdateAfter($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionProductFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionProductFormBuilderModifier($params);
        \MsThemeConfig\Plasma\PlasmaProductForm::build($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionCancelProductFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCancelProductFormBuilderModifier($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionListMailThemes($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionListMailThemes($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionBuildMailLayoutVariables($params): void
    {
        if (isset($params['smarty'])) {
            $this->registerSmartyPlugins($params['smarty']);
        }
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionBuildMailLayoutVariables($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionFrontControllerSetVariables($params): void
    {
        (new \MsThemeConfig\Customer\GuestLoginNotification())->update($this->context);
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionFrontControllerSetVariables($params);
    }

    /**
     * @param $params
     *
     * @throws PrestaShopException
     */
    public function hookActionDispatcherAfter($params): void
    {
        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }

        $hookClass = $this->getModernHooks();
        $hookClass->hookActionDispatcherAfter($params);
    }


    /**
     * Prefill product form data before the Symfony form is built.
     * Ensures our custom fields have initial values in the correct data paths.
     *
     * @param $params
     */
    public function hookActionProductFormDataProviderData($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionProductFormDataProviderData($params);
        \MsThemeConfig\Plasma\PlasmaProductForm::provideData($params);
    }

    /**
     * Persist custom product fields after update
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionAfterUpdateProductFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateProductFormHandler($params);
        \MsThemeConfig\Plasma\PlasmaProductForm::save($params);
    }

    /**
     * Persist custom product fields after create
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionAfterCreateProductFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateProductFormHandler($params);
        \MsThemeConfig\Plasma\PlasmaProductForm::save($params);
    }

    /**
     * @param $params
     */
    public function hookActionOrderStateFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderStateFormBuilderModifier($params);
    }

    /**
     * @param $params
     */
    public function hookActionOrderStateFormDataProviderData($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderStateFormDataProviderData($params);
    }

    /**
     * @param $params
     */
    public function hookActionAfterUpdateOrderStateFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateOrderStateFormHandler($params);
    }

    /**
     * @param $params
     */
    public function hookActionAfterCreateOrderStateFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateOrderStateFormHandler($params);
    }

    /**
     * @param array $params
     */
    public function hookActionOrderStateGridDefinitionModifier(array $params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderStateGridDefinitionModifier($params);
    }

    /**
     * @param array $params
     */
    public function hookActionOrderStateGridQueryBuilderModifier(array $params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderStateGridQueryBuilderModifier($params);
    }

    /**
     * @param array $params
     */
    public function hookActionOrderSlipAdd(array $params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderSlipAdd($params);
    }

    public function hookActionProductPriceCalculation(array $params): void
    {
        \MsThemeConfig\Plasma\PlasmaHooks::price($params);
    }

    public function hookActionCartUpdateQuantityBefore(array $params): void
    {
        \MsThemeConfig\Plasma\PlasmaHooks::guardCart($params);
    }

    public function hookActionValidateOrderBefore(array $params): void
    {
        \MsThemeConfig\Plasma\PlasmaHooks::validateOrder($params);
    }

    public function isPlasmaCartLineValid(Cart $cart, array $product): bool
    {
        try {
            \MsThemeConfig\Plasma\PlasmaHooks::guardCart(['cart' => $cart,
                'product' => (object) ['id' => $product['id_product']], 'shop' => (object) ['id' => $cart->id_shop],
                'id_product_attribute' => $product['id_product_attribute'], 'id_customization' => $product['id_customization'],
                'quantity' => $product['cart_quantity'], 'operator' => 'up']);
            return true;
        } catch (\PrestaShopException $error) {
            return false;
        }
    }

    public function hookDisplayAdminOrderMainBottom(array $params): string
    {
        return \MsThemeConfig\Plasma\PlasmaHooks::order($params, $this);
    }

    public function hookActionPresentProduct(array $params): void
    {
        \MsThemeConfig\Plasma\PlasmaHooks::present($params);
    }

    public function hookActionPresentProductListing(array $params): void
    {
        \MsThemeConfig\Plasma\PlasmaHooks::present($params);
    }

    public function hookDisplayCustomizationMinified($params)
    {
        // No-op placeholder to satisfy hook; dynamic rendering is handled via AJAX/modal
        return '';
    }

    public function hookSendMailAlterTemplateVars(array $params): void
    {
        if (isset($this->context->smarty)) {
            $this->registerSmartyPlugins($this->context->smarty);
        }
        $hookClass = $this->getModernHooks();
        $hookClass->hookSendMailAlterTemplateVars($params);
    }

    public function hookActionEmailAddAfterContent(array $params): void
    {
        if (($params['template'] ?? '') !== 'guest_to_customer') {
            return;
        }

        $locale = Language::getLocaleById((int) ($params['id_lang'] ?? $this->context->language->id));
        $instructions = $this->context->getTranslator()->trans(
            'Click on the following link to set up your password:',
            [],
            'Emails.Body',
            $locale
        );
        \MsThemeConfig\Service\GuestAccountEmail::ensurePasswordSetupLink($params, $instructions);
    }

    /**
     * Block the "productoutofstock" (low stock alert) e-mail.
     *
     * In PrestaShop 9 the core StockManager (src/Core/Stock/StockManager.php)
     * sends low-stock notifications to employees using the "productoutofstock"
     * template. The shop's custom Mail override fires the actionEmailSendBefore
     * hook and cancels the e-mail when any module returns false, so we return
     * false for that template only. All other mail and stock behaviour stays
     * unchanged (stock movements, thresholds and tracking still run as normal).
     *
     * @param array $params
     *
     * @return bool|null
     */
    public function hookActionEmailSendBefore(array $params): ?bool
    {
        $template = $params['template'] ?? '';

        if ($template === 'productoutofstock') {
            return false;
        }

        return null;
    }
}
