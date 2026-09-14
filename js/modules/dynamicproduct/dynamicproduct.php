<?php
/**
 * 2007-2026 TuniSoft
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
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
use Doctrine\DBAL\Query\QueryBuilder;
use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\helpers\ConfigLinkHelper;
use DynamicProduct\classes\helpers\DynamicCalculatorHelper;
use DynamicProduct\classes\helpers\DynamicCustomizationHelper;
use DynamicProduct\classes\helpers\DynamicInputFieldsHelper;
use DynamicProduct\classes\helpers\DynamicProductCost;
use DynamicProduct\classes\helpers\DynamicUploadHelper;
use DynamicProduct\classes\helpers\PreviewHelper;
use DynamicProduct\classes\helpers\RotatingFileHandler;
use DynamicProduct\classes\helpers\ScriptsHelper;
use DynamicProduct\classes\helpers\SummaryHelper;
use DynamicProduct\classes\models\DynamicEquation;
use DynamicProduct\classes\models\DynamicFieldGroup;
use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\DynamicInputField;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\classes\models\DynamicProductConfigLink;
use DynamicProduct\classes\models\DynamicStep;
use DynamicProduct\classes\models\DynamicUnit;
use DynamicProduct\classes\models\input_fields\UploadInputField;
use DynamicProduct\classes\module\DynamicCalculator;
use DynamicProduct\classes\module\DynamicHandler;
use DynamicProduct\classes\module\DynamicInstaller;
use DynamicProduct\classes\module\DynamicLoader;
use DynamicProduct\classes\module\DynamicMedia;
use DynamicProduct\classes\module\DynamicPresenter;
use DynamicProduct\classes\module\DynamicProcessor;
use DynamicProduct\classes\module\DynamicProvider;
use DynamicProduct\classes\module\DynamicViewer;
use DynamicProduct\lib\dp_trans\TranslationHelper;
use DynamicProduct\lib\media\DynamicEntriesHelper;
use DynamicProduct\libs\ModuleFixer\ModuleFixer;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\HtmlColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ImageColumn;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchQuery;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchResult;
use PrestaShopBundle\Form\Admin\Type\YesAndNoChoiceType;

require_once dirname(__FILE__) . '/vendor/autoload.php';

/**
 * @property bool bootstrap
 *
 * @noinspection PhpUnused
 */
class DynamicProduct extends Module
{
    /** @var DynamicProcessor */
    public $processor;
    /** @var DynamicPresenter */
    public $presenter;
    /** @var DynamicViewer */
    public $viewer;
    /** @var DynamicHandler */
    public $handler;
    /** @var DynamicLoader */
    public $loader;
    /** @var DynamicInstaller */
    public $installer;
    /** @var DynamicMedia */
    public $media;
    /** @var DynamicProvider */
    public $provider;
    /** @var DynamicCalculator */
    public $calculator;
    /** @var Monolog\Logger */
    public static $logger;

    public $languages;
    public $dp_module_dir;
    public $currentIndex = 'index.php?controller=AdminModules';

    public $field_types = [];

    public $restricted_units = [];

    public $strings = [];

    private $displayed_container = false;

    public static $debug_messages = [
        'errors' => [],
        'validation' => [],
        'calculation' => [],
    ];

    public function __construct()
    {
        $this->name = 'dynamicproduct';
        $this->tab = 'front_office_features';
        $this->version = '5.0.67';
        $this->author = 'Tuni-Soft';
        $this->need_instance = 0;
        $this->module_key = 'e7d243d9b0b857ca2dba85c8d3b0afda';
        $this->bootstrap = true;

        parent::__construct();
        $this->registerAutoload();
        $this->initDefines();
        $this->displayName = $this->l('Dynamic Product');
        $this->description = $this->l(
            'Allow your clients to customize their order by modifying various aspects of their products.'
        );
        $this->ps_versions_compliancy = ['min' => '1.7', 'max' => _PS_VERSION_];

        $this->initHelpers();

        $this->initFieldTypesList();

        if ((int) Configuration::get('PS_DISABLE_OVERRIDES')) {
            $this->warning = $this->l(
                'You must enable overrides (in Performance) in order for the module to work properly'
            );
        }

        $this->initVariables();
    }

    public function install()
    {
        if (!parent::install()) {
            return false;
        }

        if (!$this->installer->installDataDir()) {
            return false;
        }

        if (!$this->installer->installHooks()) {
            return false;
        }

        if (!$this->installer->installControllers()) {
            return false;
        }

        if (!$this->execSQL('sql/install')) {
            return false;
        }

        $module_fixer = new ModuleFixer($this);
        $module_fixer->fixTemplates();

        return true;
    }

    public function uninstall()
    {
        // if (!$this->installer->execUninstallScript()) {
        // return false;
        // }

        $this->installer->uninstallControllers();

        return parent::uninstall();
    }

    public function execSQL($type)
    {
        $path = dirname(__FILE__) . '/' . $type . '.sql';

        return $this->installer->execSQLFile($path);
    }

    private function registerAutoload()
    {
        spl_autoload_register([__CLASS__, 'autoloadClass']);
    }

    public function autoloadClass($class_name)
    {
        $class_name = str_replace('\\', '/', $class_name);

        if (strpos($class_name, 'DynamicProductData') !== false) {
            $class_name = str_replace('DynamicProductData/', '', $class_name);
            $class_path = _PS_ROOT_DIR_ . '/dynamicproduct/' . $class_name . '.php';
            if (is_file($class_path)) {
                require_once $class_path;

                return;
            }
        }

        $class_path = dirname(__FILE__) . '/' . $class_name . '.php';
        if (is_file($class_path)) {
            require_once $class_path;

            return;
        }

        // libs folder
        $class_path = dirname(__FILE__) . '/libs/' . $class_name . '.php';
        if (is_file($class_path)) {
            require_once $class_path;

            return;
        }

        // data libs folder
        $class_path = _PS_ROOT_DIR_ . '/dynamicproduct/libs/' . $class_name . '.php';
        if (is_file($class_path)) {
            require_once $class_path;
        }
    }

    public function getUpgrades()
    {
        $this->loadUpgradeVersionList(
            $this->name,
            $this->version,
            '2.58.0'
        );

        $upgrade_file_left = static::$modules_cache[$this->name]['upgrade']['upgrade_file_left'];
        // clear the modules cache to avoid issues with loading the next modules
        static::$modules_cache = null;

        return $upgrade_file_left;
    }

    public function getDbVersion()
    {
        return Db::getInstance()->getValue(
            'SELECT version FROM ' . _DB_PREFIX_ . "module WHERE name='" . pSQL($this->name) . "'"
        );
    }

    public function initDefines()
    {
        if (!defined('_DP_FRONT_DEV_PORT_')) {
            define('_DP_FRONT_DEV_PORT_', 5001);
        }
        if (!defined('_DP_ADMIN_DEV_PORT_')) {
            define('_DP_ADMIN_DEV_PORT_', 2001);
        }
        include dirname(__FILE__) . '/types.php';
    }

    private function initFieldTypesList()
    {
        $this->field_types = [
            _DP_INPUT_ => [
                'type' => _DP_INPUT_,
                'name' => 'input',
                'label' => $this->l('Numeric Input'),
                'color' => '#f44336',
                'position' => 1,
            ],
            _DP_SLIDER_ => [
                'type' => _DP_SLIDER_,
                'name' => 'slider',
                'label' => $this->l('Slider'),
                'color' => '#cd9321',
                'position' => 2,
            ],
            _DP_DROPDOWN_ => [
                'type' => _DP_DROPDOWN_,
                'name' => 'dropdown',
                'label' => $this->l('Dropdown'),
                'color' => '#9c27b0',
                'options' => true,
                'position' => 3,
            ],
            _DP_RADIO_ => [
                'type' => _DP_RADIO_,
                'name' => 'radio',
                'label' => $this->l('Radio buttons'),
                'color' => '#673ab7',
                'options' => true,
                'position' => 4,
            ],
            _DP_THUMBNAILS_ => [
                'type' => _DP_THUMBNAILS_,
                'name' => 'thumbnails',
                'label' => $this->l('Image list'),
                'color' => '#3f51b5',
                'options' => true,
                'position' => 5,
            ],
            _DP_CHECKBOX_ => [
                'type' => _DP_CHECKBOX_,
                'name' => 'checkbox',
                'label' => $this->l('Checkbox'),
                'color' => '#2196f3',
                'position' => 6,
            ],
            _DP_SWITCH_ => [
                'type' => _DP_SWITCH_,
                'name' => 'switch',
                'label' => $this->l('Switch'),
                'color' => '#3f51b5',
                'position' => 6,
            ],
            _DP_TEXT_ => [
                'type' => _DP_TEXT_,
                'name' => 'text',
                'label' => $this->l('Text'),
                'color' => '#03a9f4',
                'position' => 7,
            ],
            _DP_TEXTAREA_ => [
                'type' => _DP_TEXTAREA_,
                'name' => 'textarea',
                'label' => $this->l('Text Area'),
                'color' => '#00bcd4',
                'position' => 8,
            ],
            _DP_DATE_ => [
                'type' => _DP_DATE_,
                'name' => 'date',
                'label' => $this->l('Date'),
                'color' => '#009688',
                'position' => 9,
            ],
            _DP_IMAGE_ => [
                'type' => _DP_IMAGE_,
                'name' => 'image',
                'label' => $this->l('Image'),
                'color' => '#4caf50',
                'position' => 10,
            ],
            _DP_FILE_ => [
                'type' => _DP_FILE_,
                'name' => 'file',
                'label' => $this->l('File'),
                'color' => '#8bc34a',
                'position' => 11,
            ],
            _DP_FIXED_ => [
                'type' => _DP_FIXED_,
                'name' => 'fixed',
                'label' => $this->l('Fixed Value'),
                'color' => '#2196f3',
                'position' => 12,
            ],
            _DP_PRICE_ => [
                'type' => _DP_PRICE_,
                'name' => 'price',
                'label' => $this->l('Price'),
                'color' => '#9c27b0',
                'position' => 13,
            ],
            _DP_PHP_ => [
                'type' => _DP_PHP_,
                'name' => 'php',
                'label' => $this->l('Dynamic Variable'),
                'color' => '#ffc107',
                'position' => 14,
            ],
            _DP_FEATURE_ => [
                'type' => _DP_FEATURE_,
                'name' => 'feature',
                'label' => $this->l('Feature'),
                'color' => '#ff9800',
                'position' => 15,
            ],
            _DP_DIVIDER_ => [
                'type' => _DP_DIVIDER_,
                'name' => 'divider',
                'label' => $this->l('Divider'),
                'color' => '#ff5722',
                'position' => 16,
            ],
            _DP_COLORPICKER_ => [
                'type' => _DP_COLORPICKER_,
                'name' => 'colorpicker',
                'label' => $this->l('Color picker'),
                'color' => '#607d8b',
                'position' => 17,
            ],
            _DP_HTML_ => [
                'type' => _DP_HTML_,
                'name' => 'html',
                'label' => 'Html',
                'color' => '#3f51b5',
                'position' => 18,
            ],
            _DP_ERROR_ => [
                'type' => _DP_ERROR_,
                'name' => 'error',
                'label' => $this->l('Error message'),
                'color' => '#d0121a',
                'position' => 19,
            ],
            _DP_CUSTOM_ => [
                'type' => _DP_CUSTOM_,
                'name' => 'custom',
                'label' => $this->l('Custom field'),
                'color' => '#9c27b0',
                'position' => 22,
            ],
            _DP_PREVIEW_ => [
                'type' => _DP_PREVIEW_,
                'name' => 'preview',
                'label' => $this->l('Preview field'),
                'color' => '#4caf50',
                'position' => 21,
            ],
            _DP_COUNTRY_ => [
                'type' => _DP_COUNTRY_,
                'name' => 'country',
                'label' => $this->l('Country'),
                'color' => '#673ab7',
                'position' => 23,
            ],
            _DP_FONT_ => [
                'type' => _DP_FONT_,
                'name' => 'font',
                'label' => $this->l('Font list'),
                'color' => '#2196f3',
                'position' => 23,
            ],
        ];
    }

    private function initHelpers()
    {
        $this->processor = new DynamicProcessor($this);
        $this->presenter = new DynamicPresenter($this);
        $this->viewer = new DynamicViewer($this);
        $this->handler = new DynamicHandler($this);
        $this->loader = new DynamicLoader($this);
        $this->provider = new DynamicProvider($this);
        $this->calculator = new DynamicCalculator($this);
        $this->installer = new DynamicInstaller($this);
        $this->media = new DynamicMedia($this);
        self::$logger = new Monolog\Logger($this->name);

        $handler = new RotatingFileHandler($this->provider->getDataFile('cache/dynamic.txt'), Monolog\Logger::DEBUG);
        self::$logger->pushHandler($handler);
    }

    private function initVariables()
    {
        $this->dp_module_dir = $this->getUrl();
        $this->smarty->assign('dp_module_dir', $this->dp_module_dir);
        $this->smarty->assign('ps_base_url', $this->getBaseUrl());
        $this->strings = [
            $this->l('Customization'),
            $this->l('Product Customization'),
            $this->l('This product adds the total customizations cost to your cart'),
        ];
        $this->restricted_units = DynamicTools::getRestricted('_DP_RESTRICTED_UNITS_');
        $this->languages = Language::getLanguages();
    }

    public function getPath()
    {
        return $this->_path;
    }

    public function getModuleDir()
    {
        return '/modules/' . $this->name . '/';
    }

    public function getBaseUrl()
    {
        return DynamicContext::getShopBaseUrl();
    }

    public function getDir()
    {
        return dirname(__FILE__) . DIRECTORY_SEPARATOR;
    }

    public function getFolderPath($folder)
    {
        return $this->getDir() . $folder . (Tools::strlen($folder) ? '/' : '');
    }

    public function getUrl()
    {
        return $this->getBaseUrl() . 'modules/dynamicproduct/';
    }

    public function getFolderUrl($folder)
    {
        return $this->getUrl() . $folder;
    }

    public function getPathUri()
    {
        return __PS_BASE_URI__ . 'modules/' . $this->name . '/';
    }

    public function getContent()
    {
        $output = '';
        if (!Tools::getIsset('view_upgrade_checker') && !Tools::getIsset('view_troubleshooter')) {
            $moduleFixer = new ModuleFixer($this);
            $output .= $moduleFixer->displayDiagnostics();
        }

        $admin_link = DynamicTools::getAdminLink();
        $id_lang = DynamicContext::getLanguageId();

        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'link' => DynamicContext::getLink(),
                'req' => $admin_link,
                'dp_languages' => $this->languages,
                'dp_lang' => (int) $id_lang,
                'dp_module_link' => DynamicContext::getLink()->getAdminLink('AdminModules') . '&configure=' . $this->name,
            ]);
        }

        $this->postProcess();

        $action = $this->presenter->getCurrentAction();
        if ($action) {
            $method = 'display' . Tools::toCamelCase($action, true);
            if (method_exists($this, $method)) {
                return $this->{$method}();
            }
        }

        $view_action = $this->viewer->getCurrentAction();
        if ($view_action) {
            return $this->viewer->display($view_action);
        }

        $this->smarty->assign([
            'dp_uri' => $this->getPathUri(),
            'iframe_uri' => DynamicTools::isHotMode(5173) ?
              'http://localhost/dev/' :
              $this->getPathUri() . 'lib/apps/admin/build/',
        ]);

        $output .= $this->display(__FILE__, 'views/templates/admin/hook/admin.tpl');

        return $output;
    }

    private function isAdminController()
    {
        if ($this->isAdminPdfController()) {
            return false;
        }
        $controller = DynamicContext::getController();
        if ($controller !== null) {
            return $controller->controller_type === 'admin';
        }

        return false;
    }

    private function isAdminPdfController()
    {
        global $kernel;
        if (!$kernel) {
            return false;
        }
        $requestStack = $kernel->getContainer()->get('request_stack');
        $request = $requestStack->getCurrentRequest();
        if (!$request) {
            return false;
        }

        return strpos($request->getPathInfo(), 'generate-invoice-pdf') !== false;
    }

    protected function postProcess()
    {
        $action = $this->processor->getCurrentAction();
        if ($action) {
            $method = 'process' . Tools::toCamelCase($action, true);
            if (method_exists($this->processor, $method)) {
                $this->processor->{$method}();
            }
        }

        if (Tools::getIsset('submitCancel')) {
            DynamicTools::redirect();
        }
    }

    public function hookDisplayHeader()
    {
        $scripts = [];
        $output = '';

        if ((int) Tools::getValue('ajax')) {
            return '';
        }

        $entries_helper = new DynamicEntriesHelper($this);

        $is_hot_mode = DynamicTools::isHotMode(_DP_FRONT_DEV_PORT_);

        $controller_name = Tools::getValue('controller');

        if ($controller_name === 'product') {
            $id_product = (int) Tools::getValue('id_product');

            $product_config = DynamicProductConfig::getByProduct($id_product);
            $this->smarty->assign('dp_hide_qty', $product_config->hide_qty);
            if ($product_config->active) {
                $this->handler->addCustomField($id_product);

                $id_source_product = ConfigLinkHelper::getSourceProduct($id_product);

                $vars = $this->loader->getFrontProductVars();

                $custom_scripts = ScriptsHelper::getAssets($vars['dp_vars']['grouped_fields']);
                foreach ($custom_scripts['js'] as $js_file) {
                    DynamicContext::getController()->registerJavascript(
                        'dp_custom_' . $js_file['hash'],
                        $js_file['path'],
                        ['position' => 'bottom', 'priority' => 20, 'version' => $js_file['hash']]
                    );
                }
                $vars['dp_vars']['script_hashes'] = $custom_scripts['hash'];

                Media::addJsDef($vars);

                foreach ($custom_scripts['css'] as $css_file) {
                    DynamicContext::getController()->registerStylesheet(
                        'dp_custom_' . $css_file['hash'],
                        $css_file['path'],
                        ['media' => 'all', 'priority' => 20, 'version' => $css_file['hash']]
                    );
                }

                foreach ($custom_scripts['modules'] as $module) {
                    $this->smarty->assign('script', $module);
                    $output .= $this->display(__FILE__, 'views/templates/hook/vite-script.tpl');
                }

                $user_js_def = DynamicEquation::getUserJsDefinitions($id_product);
                if (count($user_js_def)) {
                    Media::addJsDef($user_js_def);
                }

                $custom_js_path = $this->provider->getDataFile('scripts/head.js');
                if (is_file($custom_js_path)) {
                    $this->media->addJS('dynamicproduct/scripts/head.js', ['version' => filemtime($custom_js_path)]);
                } else {
                    $this->media->addJS('views/js/head.js', ['version' => $this->version]);
                }

                $custom_css_path = $this->provider->getDataFile('scripts/head.css');
                if (is_file($custom_css_path)) {
                    $this->media->addCSS('dynamicproduct/scripts/head.css', ['version' => filemtime($custom_css_path)]);
                } else {
                    $this->media->addCSS('views/css/head.css', ['version' => $this->version]);
                }

                $this->media->addJS([
                    $this->media->getJSDir() . 'dynamic/custom.js',
                    $this->media->getJSDir() . 'dynamic/custom' . $id_source_product . '.js',
                    $this->media->getThemeJSDir() . 'dynamic/custom.js',
                    $this->media->getThemeJSDir() . 'dynamic/custom' . $id_source_product . '.js',
                ]);

                if (!$is_hot_mode) {
                    $scripts = array_merge($scripts, [
                        $entries_helper->getEntry('src/main-legacy.ts', 'product'),
                    ]);
                } else {
                    $this->smarty->assign('script', 'http://localhost:5001/src/main.ts');
                    $output .= $this->display(__FILE__, 'views/templates/hook/vite-script.tpl');
                }
            }
        }

        Media::addJsDef([
            'dp_version' => $this->version,
        ]);

        $output .= $this->display(__FILE__, 'views/templates/hook/display-header.tpl');

        $this->media->addCSS([
            $this->media->getCSSDir() . 'dynamic.css',
            $this->media->getThemeCSSDir() . 'dynamic.css',
        ]);

        if ($controller_name === 'product') {
            $id_product = (int) Tools::getValue('id_product');
            $id_source_product = ConfigLinkHelper::getSourceProduct($id_product);

            $this->media->addCSS([
                $this->media->getCSSDir() . 'dynamic' . $id_source_product . '.css',
                $this->media->getThemeCSSDir() . 'dynamic' . $id_source_product . '.css',
            ]);
        }

        Media::addJsDef([
            'dp_scripts' => array_map(function ($script) {
                return $this->getPathUri() . $script;
            }, array_unique($scripts)),
        ]);

        if (count($scripts)) {
            $output .= $this->display(__FILE__, 'views/templates/api/scripts.tpl');
        }

        return $output;
    }

    public function hookDisplayCustomerAccount()
    {
        $this->smarty->assign([
            'link' => DynamicContext::getLink()->getModuleLink($this->name, 'products'),
        ]);

        return $this->display(__FILE__, 'views/templates/hook/front/customer-account.tpl');
    }

    public function hookDisplayPaymentTop()
    {
        $this->smarty->assign([
            'dp_disabled_options' => $this->handler->getDisabledOptions(),
            'dp_oos_inputs' => $this->handler->getOOSInputs(),
        ]);

        return $this->display(__FILE__, 'views/templates/hook/display-payment-top.tpl');
    }

    public function hookDisplayCheckoutSummaryTop()
    {
        return $this->hookDisplayPaymentTop();
    }

    public function hookDisplayShoppingCart()
    {
        return $this->hookDisplayPaymentTop();
    }

    public function hookDisplayBeforeShoppingCartBlock()
    {
        return $this->hookDisplayPaymentTop();
    }

    public function hookActionValidateOrder($params)
    {
        /** @var Order $order */
        $order = $params['order'];
        $id_cart = (int) $order->id_cart;

        self::$logger->info('Order validated', [
            'order_id' => $order->id,
            'cart_id' => $id_cart,
        ]);

        DynamicInput::updateCartQuantities(new Cart($id_cart));

        $upload_helper = new DynamicUploadHelper($this);
        $upload_helper->copyOrderFilesToKeep($id_cart);

        $product_cost = new DynamicProductCost($this);
        $product_cost->updateCost($order->id);

        $dynamic_inputs = DynamicInput::getInputsByIdCart($id_cart);
        if (count($dynamic_inputs)) {
            Db::getInstance()->insert($this->name . '_custom_orders', [
                'id_order' => $order->id,
            ]);
        }
    }

    public function hookActionPresentProductListing($params)
    {
        $presentedProduct = clone $params['presentedProduct'];

        $id_customization = (int) $presentedProduct['id_customization'];
        if (!$id_customization) {
            return;
        }

        $dynamic_input = DynamicInput::getInputByCustomization($id_customization);
        if (!Validate::isLoadedObject($dynamic_input)) {
            return;
        }

        $input_fields = $dynamic_input->getInputFields(DynamicContext::getLanguageId());
        $preview_helper = new PreviewHelper($this);
        $preview_helper->addPreviewField($input_fields);

        if (!isset($input_fields['preview'])) {
            return;
        }
        /** @var UploadInputField $preview_field */
        $preview_field = $input_fields['preview'];
        if (!isset($preview_field->data[0])) {
            return;
        }

        $preview = $preview_field->data[0];
        $thumb_url = $preview_field->getThumbUrl($preview['file']);
        $file_path = $preview_field->getFilePath($preview['file']);
        if (!is_file($file_path)) {
            return;
        }

        list($width, $height) = getimagesize($file_path);

        $image = json_decode(json_encode($presentedProduct['default_image']), true);
        $image['bySize'][ImageType::getFormattedName('cart')]['url'] = $thumb_url;
        $image['bySize'][ImageType::getFormattedName('large')]['url'] = $thumb_url;
        $image['bySize'][ImageType::getFormattedName('medium')]['url'] = $thumb_url;
        $image['bySize'][ImageType::getFormattedName('small')]['url'] = $thumb_url;
        $infos = [
            'url' => $thumb_url,
            'width' => $width,
            'height' => $height,
        ];
        $image['bySize']['default_md'] = $infos;
        $image['bySize']['default_m'] = $infos;
        $image['bySize']['default_xs'] = $infos;
        $image['large']['url'] = $thumb_url;
        $image['medium']['url'] = $thumb_url;
        $image['small']['url'] = $thumb_url;
        $image['id_customization'] = $id_customization;

        $presentedProduct->default_image = json_decode(json_encode($image), true);
        $params['presentedProduct'] = $presentedProduct;
    }

    public function hookActionOrderStatusPostUpdate($params)
    {
        $error_or_canceled_statuses = [
            Configuration::get('PS_OS_ERROR'),
            Configuration::get('PS_OS_CANCELED'),
        ];
        /** @var OrderState $order_status */
        $order_status = $params['newOrderStatus'];
        $id_order = (int) $params['id_order'];
        $id_cart = (int) Order::getCartIdStatic($id_order);

        $cart = new Cart($id_cart);
        $is_canceled = in_array($order_status->id, $error_or_canceled_statuses);
        if ($is_canceled) {
            DynamicInput::updateCartQuantities($cart, true);
        }
    }

    public function hookActionClearCompileCache()
    {
        Tools::deleteDirectory($this->provider->getDataDir('cache'), false);
    }

    public function hookDisplayProductButton()
    {
        $id_product = (int) Tools::getValue('id_product');

        $this->smarty->assign([
            'product_link' => $this->provider->getProductLink($id_product),
            'product_config' => DynamicProductConfig::getByProduct($id_product),
        ]);

        return $this->display(
            __FILE__,
            'views/templates/hook/display-product-button.tpl',
            $this->name . "-button-$id_product",
            $this->name . "-button-$id_product"
        );
    }

    public function hookDisplayProductAdditionalInfo($params, $hookName = null)
    {
        if (Tools::getValue('ajax')) {
            return false;
        }

        $id_product = (int) Tools::getValue('id_product');

        $dp_config = DynamicProductConfig::getByProduct($id_product);

        if ($dp_config->active && Tools::getValue('action') === 'quickview') {
            return $this->hookDisplayProductButton();
        }

        if ($this->displayed_container) {
            return false;
        }
        $this->displayed_container = true;

        if (!$dp_config->active) {
            return false;
        }

        $this->smarty->assign([
            'hookName' => $hookName,
        ]);

        return $this->display(
            __FILE__,
            'views/templates/hook/display-product-buttons.tpl',
            $this->name . '-buttons-' . $hookName,
            $this->name . '-buttons-' . $hookName
        );
    }

    public function hookDynamicProduct()
    {
        return $this->hookDisplayProductAdditionalInfo([], 'DynamicProduct');
    }

    public function hookDisplayCustomization($params)
    {
        if (!isset($params['customization'])) {
            return '';
        }
        $id_input = $this->provider->getDynamicInputId($params['customization']);
        if (!$id_input) {
            return $params['customization']['value'];
        }

        if (isset($params['array'])) {
            return $this->hookDisplayCustomizationValues($id_input);
        }

        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'is_pdf' => false,
                'weight_unit' => Configuration::get('PS_WEIGHT_UNIT'),
            ]);
        }
        if ($session = DynamicContext::getSession()) {
            $session->set('dp_is_pdf', false);
        }
        $is_admin = $params['is_admin'] ?? $this->isAdminController();
        $is_order_state = $this->provider->isOrderStateRequest();
        if ($is_admin && !$is_order_state) {
            return $this->hookDisplayAdminInputSummary($id_input, $params);
        }

        return $this->hookDisplayInputSummary($id_input, $params);
    }

    public function hookAddWebserviceResources()
    {
        return [
            'dynamic_inputs' => [
                'description' => 'Dynamic inputs',
                'class' => 'DynamicProduct\classes\models\DynamicInput',
            ],
            'dynamic_input_fields' => [
                'description' => 'Dynamic input fields',
                'class' => 'DynamicProduct\classes\models\DynamicInputField',
            ],
        ];
    }

    public function hookDisplayProductPriceBlock($params)
    {
        if (!isset($params['product']['id_product'])) {
            return null;
        }

        $id_product = (int) $params['product']['id_product'];

        $dynamic_config = DynamicProductConfig::getByProduct($id_product);
        $is_active = (int) $dynamic_config->active;
        if ($is_active) {
            if ($params['type'] === 'before_price') {
                if ($dynamic_config->display_starting_from) {
                    return $this->l('Starting from');
                }

                return null;
            }
            if ($params['type'] === 'unit_price' && !$dynamic_config->display_dynamic_price) {
                return $dynamic_config->displayed_price_label;
            }

            if ($params['type'] === 'dynamicproduct_price') {
                return $dynamic_config->displayed_price . ' ' . $dynamic_config->displayed_price_label;
            }
        }

        return null;
    }

    public function hookActionProductSearchProviderRunQueryAfter($params)
    {
        /** @var ProductSearchQuery $query */
        $query = $params['query'];
        /** @var ProductSearchResult $result */
        $result = $params['result'];

        $sort_order = $query->getSortOrder();
        if ($sort_order->getEntity() === 'product' && $sort_order->getField() === 'price') {
            $products = $result->getProducts();
            foreach ($products as &$product) {
                $id_product = $product['id_product'];
                $dynamic_config = DynamicProductConfig::getByProduct($id_product);
                if ($dynamic_config->active) {
                    $displayed_price = $dynamic_config->displayed_price;
                    if ($displayed_price || $dynamic_config->display_dynamic_price) {
                        $this->calculator->assignProductPrices($product, $displayed_price, $product);
                        $product['price_min'] = $product['price'];
                        if (!(float) ($product['price_max'] ?? 0)) {
                            $product['price_max'] = $product['price'];
                        }
                    }
                }
            }
            $direction = $sort_order->getDirection();
            usort($products, function ($p1, $p2) use ($direction) {
                if (!isset($p1['price_min']) || !isset($p2['price_min'])) {
                    return 0;
                }

                return $direction === 'asc' ?
                  $p1['price_min'] > $p2['price_min'] :
                  $p2['price_max'] > $p1['price_max'];
            });
            $result->setProducts($products);
        }
    }

    public function hookActionAdminControllerSetMedia()
    {
        $link = DynamicContext::getLink();
        $translation_helper = new TranslationHelper($this);

        Media::addJsDef([
            'dp_id_module' => $this->id,
            'ps_module_dev' => DynamicTools::isModuleDevMode(),
            'dp_public_path' => $this->getFolderUrl('lib/media/dist/'),
            'dp_translations' => $translation_helper->getAdminTranslations(),
            'dp_module_link' => $link->getAdminLink('AdminModules') . '&configure=' . $this->name,
        ]);

        $controller_name = DynamicContext::getController()->controller_name;

        if ($controller_name === 'AdminProducts' && $this->provider->getCurrentProductID()) {
            Media::addJsDef($this->loader->getAdminProductVars($this->provider->getCurrentProductID()));
        }

        if ($controller_name === 'AdminOrders') {
            Media::addJsDef([
                'dp_uri' => $this->getPathUri(),
                'dp_product_redirect' => $link->getModuleLink($this->name, 'redirect', [
                    'id_product' => '__ID_PRODUCT__',
                    'dp_customer' => '__ID_CUSTOMER__',
                    'action' => 'create_customization',
                ]),
                'dp_product_settings' => $link->getAdminLink('DynamicProductSettings'),
                'dp_id_order' => (int) $this->provider->getRequestParameter('orderId'),
            ]);

            $entries_helper = new DynamicEntriesHelper($this);
            $css = $entries_helper->getCSS('admin/order.ts');
            if (is_array($css)) {
                foreach ($css as $css_file) {
                    DynamicContext::getController()->addCSS($this->getPathUri() . 'lib/media/dist/' . $css_file);
                }
            }
        }

        if ($controller_name === 'AdminModules' && Tools::getValue('configure') === $this->name) {
            DynamicContext::getController()->addCSS($this->_path . 'views/css/module.css');
            Media::addJsDef($this->loader->getAdminModuleVars());
        }

        DynamicContext::getController()->addCSS($this->_path . 'views/css/admin.css');

        if (Tools::getIsset('view_upgrade_checker')) {
            DynamicContext::getController()->addCSS($this->_path . 'views/css/upgrade-checker.css');
        }
    }

    public function hookDisplayBackOfficeHeader()
    {
        $output = '';

        $controller = Tools::getValue('controller');
        $is_hot_mode = DynamicTools::isHotMode(_DP_ADMIN_DEV_PORT_);

        if ($controller === 'AdminProducts') {
            $id_product = $this->provider->getCurrentProductID();

            if (!$id_product) {
                if ($is_hot_mode) {
                    $this->smarty->assign('script', DynamicTools::addScriptBase('admin/products-list.ts'));
                } else {
                    $entries_helper = new DynamicEntriesHelper($this);
                    $this->smarty->assign('script', $this->getPathUri() . $entries_helper->getEntry('admin/products-list.ts'));
                }
                $output .= $this->display(__FILE__, 'views/templates/hook/vite-script.tpl');
            }
        }

        if ($controller === 'AdminOrders') {
            if ($is_hot_mode) {
                $this->smarty->assign('script', DynamicTools::addScriptBase('admin/order.ts'));
            } else {
                $entries_helper = new DynamicEntriesHelper($this);
                $this->smarty->assign('script', $this->getPathUri() . $entries_helper->getEntry('admin/order.ts'));
            }
            $output .= $this->display(__FILE__, 'views/templates/hook/vite-script.tpl');
        }

        if ($controller === 'AdminModules' && Tools::getValue('configure') === $this->name) {
            if ($is_hot_mode) {
                $this->smarty->assign('script', DynamicTools::addScriptBase('admin/module-form.ts'));
            } else {
                $entries_helper = new DynamicEntriesHelper($this);
                $this->smarty->assign('script', $this->getPathUri() . $entries_helper->getEntry('admin/module-form.ts'));
            }
            $output .= $this->display(__FILE__, 'views/templates/hook/vite-script.tpl');
        }

        return $output;
    }

    public function hookDisplayAdminProductsExtra($params)
    {
        $id_product = isset($params['id_product']) ? (int) $params['id_product'] : 0;
        $id_product = $id_product ?: Tools::getValue('id_product');

        if (!$id_product) {
            return $this->displayConfirmation(
                $this->l('You will be able to configure the module for this product after saving it.')
            );
        }

        $output = '';

        $moduleFixer = new ModuleFixer($this);
        $output .= $moduleFixer->displayDiagnostics();

        $this->smarty->assign([
            'dp_uri' => $this->getPathUri(),
            'iframe_uri' => DynamicTools::isHotMode(5173) ?
              'http://localhost/dev/' :
              $this->getPathUri() . 'lib/apps/admin/build/',
            'dev_link' => DynamicTools::addQueryToUrl(
                DynamicContext::getLink()->getAdminLink('DynamicProductDev'),
                [
                    'id_product' => $id_product,
                    'initial_path' => 'product',
                    'rand' => '_rand_',
                    'new_tab' => 1,
                ]
            ),
        ]);

        $output .= $this->display(__FILE__, 'views/templates/admin/hook/extra.tpl');

        return $output;
    }

    public function hookActionCartSave($params)
    {
        /** @var Cart $cart */
        $cart = $params['cart'] ?? null;

        if (!Validate::isLoadedObject(Context::getContext()->cart)) {
            return;
        }

        if (Tools::getIsset('add_to_cart')) {
            return;
        }

        if ($cart) {
            $products = $cart->getProducts();
            foreach ($products as $product) {
                $this->recalc($product);
            }
        }
    }

    public function hookActionCartUpdateQuantityBefore($params)
    {
        if ($params['operator'] !== 'up') {
            return;
        }

        $id_customization = (int) $params['id_customization'];
        if (!$id_customization) {
            return;
        }

        $customized_data = Db::getInstance()->getValue('
            SELECT `value` FROM `' . _DB_PREFIX_ . 'customized_data`
            WHERE `id_customization` = ' . $id_customization);

        if (empty($customized_data)) {
            return;
        }

        if (preg_match('/\[(\d+)\]/', $customized_data, $match)) {
            $id_input = (int) $match[1];
            $input = new DynamicInput($id_input);
            if (!Validate::isLoadedObject($input)) {
                return;
            }

            $input->id_customization = $id_customization;
            $input->cart_quantity = (int) $params['quantity'];
            $input->save();

            Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . 'customized_data`
                SET `value` = "' . (int) $input->id . '",
                `id_module` = ' . (int) $this->id . ',
                `price` = ' . (float) $input->price . ',
                `weight` = ' . (float) $input->weight . '
                WHERE `id_customization` = ' . $id_customization);
        }
    }

    public function hookActionFrontControllerInitBefore()
    {
        $controller = Tools::getValue('controller');
        if (!in_array($controller, ['cart', 'order', 'order-opc'])) {
            return;
        }

        $id_cart = (int) DynamicContext::getCookie()->id_cart;
        if (!$id_cart) {
            return;
        }

        $results = Db::getInstance()->executeS('
            SELECT * FROM `' . _DB_PREFIX_ . 'cart_product` cp
            JOIN `' . _DB_PREFIX_ . $this->name . '_config` c ON c.`id_product` = cp.`id_product`
            WHERE `id_cart` = ' . (int) $id_cart . '
            AND name = "always_recalc" AND value = 1
        ');
        if (count($results)) {
            $id_products = array_map(function ($item) {
                return (int) $item['id_product'];
            }, $results);
            $products = Db::getInstance()->executeS('
                SELECT * FROM `' . _DB_PREFIX_ . 'cart_product` cp
                WHERE `id_cart` = ' . (int) $id_cart);

            $context = DynamicContext::getLegacyContext();
            $context->cart = new Cart($id_cart);
            $context->currency = new Currency($this->provider->getCurrency());

            foreach ($products as $product) {
                $id_product = (int) $product['id_product'];
                if (in_array($id_product, $id_products)) {
                    $this->recalc($product, true);
                }
            }
        }
    }

    private function recalc($product, $force = false)
    {
        $id_lang = DynamicContext::getLanguageId();

        $id_product = (int) $product['id_product'];
        $id_attribute = (int) $product['id_product_attribute'];
        $id_customization = (int) $product['id_customization'];
        $quantity = (int) ($product['cart_quantity'] ?? $product['quantity']);

        $dynamic_config = DynamicProductConfig::getByProduct($id_product);
        if ((int) $dynamic_config->active) {
            $price_equation = DynamicEquation::getPriceEquation($id_product);
            $weight_equation = DynamicEquation::getWeightEquation($id_product);

            $recalc_all = (int) $dynamic_config->recalc;
            $recalc_price = $recalc_all || DynamicEquation::containsQuantityField($price_equation->formula);
            $recalc_weight = $recalc_all || DynamicEquation::containsQuantityField($weight_equation->formula);
            $is_reorder = Tools::getIsset('submitReorder');
            $recalc = $recalc_price || $recalc_weight || $is_reorder;

            $force = $force || $is_reorder;

            if ($recalc) {
                $quantity_input_field = new DynamicInputField();
                $quantity_input_field->name = 'quantity';
                $quantity_input_field->value = (int) $quantity;
                $customization_input = DynamicInput::getInputByCustomization($id_customization, !$is_reorder);
                if (Validate::isLoadedObject($customization_input)
                  && ((int) $customization_input->cart_quantity !== (int) $quantity || $force)) {
                    $db_input_fields = $customization_input->getInputFields($id_lang);
                    $db_input_fields['quantity'] = $quantity_input_field;

                    $fields = DynamicTools::convertToArray($db_input_fields);

                    list($input_fields) = DynamicInputField::getInputFieldsFromData(
                        $id_product,
                        $id_attribute,
                        $fields,
                        DynamicInputField::LOAD_ALL
                    );

                    $save_input_fields = false;

                    if ($recalc_price || $is_reorder) {
                        $price = DynamicEquation::calculatePriceFormula(
                            $id_product,
                            $id_attribute,
                            $price_equation,
                            $input_fields
                        );
                        $customization_input->updatePrice($price);
                        $save_input_fields = true;
                    }

                    if ($recalc_weight || $is_reorder) {
                        $weight = DynamicEquation::calculateWeightFormula(
                            $id_product,
                            $id_attribute,
                            $weight_equation,
                            $input_fields
                        );
                        $customization_input->updateWeight($weight);
                        $save_input_fields = true;
                    }

                    if ($save_input_fields) {
                        $customization_helper = new DynamicCustomizationHelper($this);
                        $old_input_fields = $customization_input->getInputFields();
                        $customization_helper->saveInputFields($id_product, $input_fields, $customization_input->id);
                        foreach ($old_input_fields as $input_field) {
                            $input_field->delete();
                        }
                        $customization_input->cart_quantity = (int) $quantity;
                        $customization_input->dynamic_quantity = DynamicEquation::getDynamicQuantity(
                            $customization_input,
                            $input_fields
                        );
                        $customization_input->save();
                    }
                }
            }
        }
    }

    public function hookActionObjectCartDuplicateAfter($params)
    {
        $id_cart_old = $params['oldObject']->id;
        $id_cart_new = $params['newObject']->id;
        $this->handler->duplicateInputs($id_cart_old, $id_cart_new);
        $this->hookActionCartSave(['cart' => new Cart($id_cart_new)]);
    }

    public function hookDisplayInputSummary($id_input, $params = [])
    {
        $id_lang = DynamicContext::getLanguageId();
        $summary_helper = new SummaryHelper($this);

        $controller = Tools::getValue('controller');
        $has_post = !empty($_POST) && $controller !== 'cart';
        $is_pdf = isset($params['is_pdf'])
          || $controller === 'pdfinvoice'
          || $controller === 'validation'
          || $has_post
          || strpos(strtolower($controller), 'pdf') !== false
          || $this->isAdminPdfController()
          || Tools::getIsset('viewopartdevis');
        if ($session = DynamicContext::getSession()) {
            $session->set('dp_is_pdf', $is_pdf);
        }
        $is_order_detail = in_array($controller, ['orderdetail', 'orderconfirmation']);

        $input = new DynamicInput($id_input, $id_lang);

        if ($summary = $summary_helper->getCachedSummary('input', $input, $id_lang, $is_pdf, $is_order_detail)) {
            return $summary;
        }

        $input_fields = $input->getInputFields($id_lang);

        $dynamic_config = DynamicProductConfig::getByProduct($input->id_product);
        if ($dynamic_config->split_summary) {
            $grouped_fields = DynamicInputFieldsHelper::groupFields($input->id_product, $input_fields);
        } else {
            $grouped_fields = [
                [
                    'label' => null,
                    'fields' => DynamicInputFieldsHelper::sortFields($input_fields),
                ],
            ];
        }

        $calculator_helper = new DynamicCalculatorHelper($this);
        $id_cart = DynamicContext::getCartId();
        $prices = $calculator_helper->getCustomizationPrices(
            $input->id_product,
            $input->id_attribute,
            $input->price,
            $input->cart_quantity,
            $id_cart
        );

        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'id_lang' => $id_lang,
                'input' => $input,
                'grouped_fields' => $grouped_fields,
                'is_pdf' => $is_pdf,
                'is_order_detail' => $is_order_detail,
                'params' => $params,
                'show_price' => $dynamic_config->display_customization_cost,
                'price' => $this->provider->convertAndFormatPrice($prices['price_ttc']),
            ]);
        }

        $summary = $this->display(__FILE__, 'views/templates/hook/display-input-summary.tpl');
        $summary_helper->cacheSummary('input', $input, $id_lang, $is_pdf, $is_order_detail, $summary);

        return $summary;
    }

    public function hookDisplayAdminInputSummary($id_input, $params)
    {
        $id_lang = (int) DynamicContext::getLanguageId();
        $input = new DynamicInput($id_input, $id_lang);

        $is_pdf = isset($params['is_pdf'])
          || Tools::getValue('controller') === 'AdminPdf'
          || strpos($_SERVER['REQUEST_URI'], 'generate-invoice-pdf') !== false
          || strpos($_SERVER['REQUEST_URI'], 'generate-delivery-slip-pdf') !== false
          || !empty($_POST);
        if ($session = DynamicContext::getSession()) {
            $session->set('dp_is_pdf', $is_pdf);
        }

        $summary_helper = new SummaryHelper($this);
        $summary_name = 'admin_input';
        if ($summary = $summary_helper->getCachedSummary($summary_name, $input, $id_lang, $is_pdf, false)) {
            return $summary;
        }

        $input_fields = $input->getInputFields($id_lang);

        if (Tools::getValue('controller') === 'validation') {
            $input->price = $this->calculator->applyTax($input->price, false, false, $input->id_product);
        }

        $dynamic_config = DynamicProductConfig::getByProduct($input->id_product);
        if ($dynamic_config->split_summary) {
            $grouped_fields = DynamicInputFieldsHelper::groupFields($input->id_product, $input_fields);
        } else {
            $grouped_fields = [
                [
                    'label' => null,
                    'fields' => DynamicInputFieldsHelper::sortFields($input_fields),
                ],
            ];
        }

        $price = $this->calculator->applyTax($input->price, DynamicContext::getCart(), false, $input->id_product);

        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'id_lang' => $id_lang,
                'input' => $input,
                'grouped_fields' => $grouped_fields,
                'is_pdf' => $is_pdf,
                'is_order_detail' => false,
                'is_admin' => true,
                'show_price' => $dynamic_config->display_customization_cost,
                'price' => $this->provider->convertAndFormatPrice($price),
            ]);
        }

        $summary = $this->display(__FILE__, 'views/templates/hook/display-admin-input-summary.tpl');

        $summary_helper->cacheSummary($summary_name, $input, $id_lang, $is_pdf, false, $summary);

        return $summary;
    }

    public function hookDisplayCustomizationValues($id_input)
    {
        $id_lang = (int) DynamicContext::getLanguageId();
        $input = new DynamicInput($id_input, $id_lang);
        $input_fields = $input->getInputFields($id_lang);

        $summary = [];
        foreach ($input_fields as $input_field) {
            if (!$input_field->isSkipped()) {
                $summary[] = [
                    'label' => $input_field->label,
                    'value' => $input_field->getDynamicValue($input_fields),
                ];
            }
        }

        return $summary;
    }

    public function hookActionProductAdd($params)
    {
        if ($this->provider->isDuplicateRequest()) {
            $id_product_old = (int) $this->provider->getProductIdFromDuplicateRequest();
            $id_source_product = ConfigLinkHelper::getSourceProduct($id_product_old);

            $id_product_new = (int) $params['id_product'];

            if ($id_source_product == $id_product_old) {
                $has_config = Db::getInstance()->getRow(
                    'SELECT * FROM `' . _DB_PREFIX_ . $this->name . '_product_config`
                    WHERE `id_product` = ' . (int) $id_product_new
                );
                if ($has_config) {
                    return;
                }

                $this->handler->copyConfig($id_product_new, $id_product_old, [], true);
            } else {
                DynamicProductConfigLink::createLink($id_product_new, $id_source_product);
            }
        }
    }

    public function hookActionProductSave($params)
    {
        $this->hookActionProductAdd($params);
    }

    private function displayUpdateUnit()
    {
        $id_unit = (int) Tools::getValue('id_unit');
        $unit = new DynamicUnit($id_unit);

        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'urlhash' => '#dp_units_form',
                'unit' => $unit,
            ]);
        }
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/units/unit-form.tpl');
    }

    private function displayAddUnit()
    {
        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'urlhash' => '#units_form',
                'unit' => new DynamicUnit(0),
            ]);
        }
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/units/unit-form.tpl');
    }

    private function displayUpdateFieldGroup()
    {
        $id_field_group = (int) Tools::getValue('id_field_group');
        $field_group = new DynamicFieldGroup($id_field_group);

        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'urlhash' => '#field-groups',
                'field_group' => $field_group,
            ]);
        }
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/field-groups/field-group-form.tpl');
    }

    private function displayAddFieldGroup()
    {
        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'urlhash' => '#field-groups',
                'field_group' => new DynamicFieldGroup(0),
            ]);
        }
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/field-groups/field-group-form.tpl');
    }

    private function displayUpdateStep()
    {
        $id_step = (int) Tools::getValue('id_step');
        $step = new DynamicStep($id_step);

        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'urlhash' => '#steps',
                'step' => $step,
            ]);
        }
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/steps/step-form.tpl');
    }

    private function displayAddStep()
    {
        if ($smarty = DynamicContext::getSmarty()) {
            $smarty->assign([
                'urlhash' => '#steps',
                'step' => new DynamicStep(0),
            ]);
        }
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/steps/step-form.tpl');
    }

    public function getAdminMessages()
    {
        $source = DynamicTools::getSource();

        return [
            'success' => $this->l('Data saved', $source),
            'error' => $this->l('An error occurred', $source),
        ];
    }

    public function hookActionProductGridDefinitionModifier($params)
    {
        /** @var PrestaShop\PrestaShop\Core\Grid\Definition\GridDefinition $definition */
        $definition = $params['definition'];
        $columns = $definition->getColumns();
        $items = $columns->toArray();
        $has_image = false;
        foreach ($items as $item) {
            if ($item['id'] === 'image') {
                $has_image = true;
                break;
            }
        }
        if ($has_image) {
            $filters = $definition->getFilters();
            $filters->add(
                (new Filter('dp_active', YesAndNoChoiceType::class))
                  ->setAssociatedColumn('dp_active')
            );
            $definition->setFilters($filters);

            $columns->addAfter(
                'image',
                (new HtmlColumn('dp_active'))
                  ->setName($this->trans('Dynamic', [], 'Admin.Global'))
                  ->setOptions([
                      'field' => 'dp_edit_link',
                      'clickable' => false,
                  ])
            );
        }
    }

    public function hookActionProductGridQueryBuilderModifier($params)
    {
        /** @var QueryBuilder $search_query */
        $search_query = $params['search_query_builder'];
        $search_query->addSelect('IF(dp_config.`data` LIKE \'%\"active\":true%\' OR dp_config_linked.`data` LIKE \'%\"active\":true%\' OR dp_config_linked_2.`data` LIKE \'%\"active\":true%\', 1, 0) AS dp_active');
        $search_query->leftJoin(
            'p',
            _DB_PREFIX_ . $this->name . '_product_config',
            'dp_config',
            'dp_config.`id_product` = p.`id_product`'
        );

        $search_query->addSelect('IF(dp_config_linked.`data` LIKE \'%\"active\":true%\', 1, 0) AS dp_linked');
        $search_query->addSelect('IF(dp_config_linked_2.`data` LIKE \'%\"active\":true%\', 1, 0) AS dp_category_linked');

        $search_query->leftJoin(
            'p',
            _DB_PREFIX_ . $this->name . '_product_config_link',
            'dp_product_config_link',
            'dp_product_config_link.`id_product` = p.`id_product`'
        );
        $search_query->leftJoin(
            'p',
            _DB_PREFIX_ . $this->name . '_product_config_category_link',
            'ccl',
            'ccl.`id_category` IN (SELECT id_category FROM ' . _DB_PREFIX_ . 'category_product WHERE id_product = p.id_product)'
        );
        $search_query->leftJoin(
            'p',
            _DB_PREFIX_ . $this->name . '_product_config',
            'dp_config_linked',
            'dp_config_linked.`id_product` = dp_product_config_link.`id_product_source`'
        );
        $search_query->leftJoin(
            'p',
            _DB_PREFIX_ . $this->name . '_product_config',
            'dp_config_linked_2',
            'dp_config_linked_2.`id_product` = ccl.`id_product`'
        );

        /** @var PrestaShop\PrestaShop\Core\Search\Filters\ProductFilters $searchCriteria */
        $searchCriteria = $params['search_criteria'];
        $filters = $searchCriteria->getFilters();
        if (isset($filters['dp_active'])) {
            if ((int) $filters['dp_active'] === 1) {
                $search_query->andWhere('IF(dp_config.`data` LIKE \'%\"active\":true%\' OR dp_config_linked.`data` LIKE \'%\"active\":true%\' OR dp_config_linked_2.`data` LIKE \'%\"active\":true%\', 1, 0) = 1');
            } else {
                $search_query->andWhere('IF(dp_config.`data` LIKE \'%\"active\":true%\' OR dp_config_linked.`data` LIKE \'%\"active\":true%\' OR dp_config_linked_2.`data` LIKE \'%\"active\":true%\', 1, 0) = 0');
            }
        }
    }

    public function hookActionProductGridDataModifier($params)
    {
        /** @var PrestaShop\PrestaShop\Core\Grid\Data\GridData $data */
        $data = $params['data'];
        $items = $data->getRecords()->all();
        foreach ($items as $index => $item) {
            if ($item['dp_active']) {
                $icon = $item['dp_linked'] || $item['dp_category_linked'] ? 'active-linked' : 'active';
                if ($smarty = DynamicContext::getSmarty()) {
                    $smarty->assign([
                        'edit_link' => DynamicTools::addQueryToUrl(
                            DynamicContext::getLink()->getAdminLink('DynamicProductDev'),
                            [
                                'id_product' => $item['id_product'],
                                'rand' => '_rand_',
                                'new_tab' => 1,
                            ]
                        ),
                        'icon_url' => $this->getUrl() . "views/img/logos/$icon.png",
                    ]);
                }
                $item['dp_edit_link'] = $this->display(__FILE__, 'views/templates/hook/product-grid-icon.tpl');
            } else {
                $item['dp_edit_link'] = '';
            }
            $items[$index] = $item;
        }

        $params['data'] = new PrestaShop\PrestaShop\Core\Grid\Data\GridData(
            new PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection($items),
            $data->getRecordsTotal(),
            $data->getQuery()
        );
    }

    public function hookActionOrderGridDefinitionModifier($params)
    {
        /** @var PrestaShop\PrestaShop\Core\Grid\Definition\GridDefinition $definition */
        $definition = $params['definition'];
        $columns = $definition->getColumns();
        $items = $columns->toArray();
        $filters = $definition->getFilters();
        $filters->add(
            (new Filter('dp_customized', YesAndNoChoiceType::class))
              ->setAssociatedColumn('dp_customized')
        );
        $definition->setFilters($filters);

        $columns->addAfter(
            'id_order',
            (new ImageColumn('dp_customized'))
              ->setName($this->trans('Dynamic', [], 'Admin.Global'))
              ->setOptions([
                  'src_field' => 'dp_customized_logo',
              ])
        );
    }

    public function hookActionOrderGridQueryBuilderModifier($params)
    {
        /** @var QueryBuilder $search_query */
        $search_query = $params['search_query_builder'];

        $search_query->addSelect('IF(dp_cus.`id_order`, 1, 0) AS dp_customized');

        $search_query->leftJoin(
            'o',
            _DB_PREFIX_ . 'dynamicproduct_custom_orders',
            'dp_cus',
            'dp_cus.`id_order` = o.`id_order`'
        );

        /** @var PrestaShop\PrestaShop\Core\Search\Filters\ProductFilters $searchCriteria */
        $searchCriteria = $params['search_criteria'];
        $filters = $searchCriteria->getFilters();
        if (isset($filters['dp_customized'])) {
            if ((int) $filters['dp_customized'] === 1) {
                $search_query->andWhere('IF(dp_cus.`id_order`, 1, 0) = 1');
            } else {
                $search_query->andWhere('IF(dp_cus.`id_order`, 1, 0) = 0');
            }
        }
    }

    public function hookActionOrderGridDataModifier($params)
    {
        /** @var PrestaShop\PrestaShop\Core\Grid\Data\GridData $data */
        $data = $params['data'];
        $items = $data->getRecords()->all();
        foreach ($items as $index => $item) {
            if (isset($item['dp_customized']) && $item['dp_customized']) {
                $item['dp_customized_logo'] = $this->getUrl() . 'views/img/logos/active.png';
            } else {
                $item['dp_customized_logo'] = $this->getUrl() . 'views/img/pixel.png';
            }
            $items[$index] = $item;
        }

        $params['data'] = new PrestaShop\PrestaShop\Core\Grid\Data\GridData(
            new PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection($items),
            $data->getRecordsTotal(),
            $data->getQuery()
        );
    }

    public function hookActionFilterDeliveryOptionList($params)
    {
        $cart = DynamicContext::getCart();
        // If there is no cart to work on, do nothing
        if (empty($cart)) {
            return;
        }

        $max_sizes = DynamicInput::getCartMaxSizes($cart);
        $cart_weight = $this->calculator->getCartWeight($cart);

        // self::$logger->info('Filtering delivery options', ['max_sizes' => $max_sizes, 'cart_weight' => $cart_weight]);

        foreach ($params['delivery_option_list'] as &$options) {
            foreach ($options as $option_key => &$option) {
                foreach ($option['carrier_list'] as $carrier_data) {
                    $carrier = $carrier_data['instance'];
                    if (($carrier->max_width > 0 && $carrier->max_width < $max_sizes['width'])
                      || ($carrier->max_height > 0 && $carrier->max_height < $max_sizes['height'])
                      || ($carrier->max_depth > 0 && $carrier->max_depth < $max_sizes['depth'])
                      || ($carrier->max_weight > 0 && $carrier->max_weight < $cart_weight)
                    ) {
                        unset($options[$option_key]);
                    }
                }
            }
        }
    }

    public function hookActionGetProductPropertiesAfterUnitPrice($params)
    {
        $row = $params['product'];
        $id_product = (int) ($row['id_product'] ?? $row['id']);
        $dynamic_config = DynamicProductConfig::getByProduct($id_product);
        if ($dynamic_config->active) {
            $displayed_price = $dynamic_config->displayed_price;
            if ($displayed_price || $dynamic_config->display_dynamic_price) {
                $this->calculator->assignProductPrices($row, $displayed_price, $params['product']);
            }
        }
    }
}
