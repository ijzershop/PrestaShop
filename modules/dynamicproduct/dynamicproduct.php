<?php
/**
 * 2010-2022 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tuni-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 * @property string author_address
 * @property bool bootstrap
 */

use classes\DynamicTools;
use classes\helpers\DynamicProductCost;
use classes\helpers\DynamicUploadHelper;
use classes\helpers\ProductHelper;
use classes\helpers\SummaryHelper;
use classes\models\DynamicCombinationField;
use classes\models\DynamicCombinationValue;
use classes\models\DynamicCondition;
use classes\models\DynamicConfig;
use classes\models\DynamicEquation;
use classes\models\DynamicField;
use classes\models\DynamicFieldGroup;
use classes\models\DynamicInput;
use classes\models\DynamicInputField;
use classes\models\DynamicProductConfigLink;
use classes\models\DynamicProductFieldGroup;
use classes\models\DynamicProductStep;
use classes\models\DynamicProportion;
use classes\models\DynamicStep;
use classes\models\DynamicUnit;
use classes\models\ExecOrder;
use classes\models\FieldFormula;
use classes\models\grids\Grid;
use classes\models\intervals\Interval;
use classes\module\DynamicCalculator;
use classes\module\DynamicHandler;
use classes\module\DynamicInstaller;
use classes\module\DynamicMedia;
use classes\module\DynamicPresenter;
use classes\module\DynamicProcessor;
use classes\module\DynamicProvider;
use classes\module\DynamicViewer;
use classes\module\HotMedia;
use classes\presenter\MainConfigPresenter;
use lib\dp_trans\TranslationHelper;
use lib\media\DynamicEntriesHelper;

/**
 * @property bool bootstrap
 * @property string author_address
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
    /** @var DynamicInstaller */
    public $installer;
    /** @var DynamicMedia | HotMedia */
    public $media;
    /** @var DynamicProvider */
    public $provider;
    /** @var DynamicCalculator */
    public $calculator;

    public $html_content = '';
    public $languages;
    public $dp_module_dir;
    public $currentIndex = 'index.php?controller=AdminModules';

    public $field_types = array();

    public $restricted_units = array();

    public $strings = array();

    private $displayed_container = false;

    public static $debug_messages = array();

    public $hooks = array(
        'displayHeader',
        'displayProductAdditionalInfo',
        'displayCustomization',
        'displayProductPriceBlock',
        'displayBackOfficeHeader',
        'actionAdminControllerSetMedia',
        'displayAdminProductsExtra',
    );

    public function __construct()
    {
        $this->name = 'dynamicproduct';
        $this->tab = 'front_office_features';
        $this->version = '2.43.11';
        $this->author = 'Tuni-Soft';
        $this->need_instance = 0;
        $this->module_key = 'e7d243d9b0b857ca2dba85c8d3b0afda';
        $this->author_address = '0xD70c56348A5C492162492e0520F09d06e4d8fa7a';
        $this->bootstrap = true;

        parent::__construct();
        $this->registerAutoload();
        $this->initDefines();
        $this->displayName = $this->l('Dynamic Product');
        $this->description = $this->l(
            'Allow your clients to customize their order by modifying various aspects of their products.'
        );
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);

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

        return true;
    }

    public function uninstall()
    {
        if (!$this->installer->execUninstallScript()) {
            return false;
        }

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
        spl_autoload_register(array(__CLASS__, 'autoloadClass'));
    }

    public function autoloadClass($class_name)
    {
        $class_name = str_replace('\\', '/', $class_name);
        $class_path = dirname(__FILE__) . '/' . $class_name . '.php';
        if (is_file($class_path)) {
            /** @noinspection PhpIncludeInspection */
            require_once $class_path;
            return;
        }

        // libs folder
        $class_path = dirname(__FILE__) . '/libs/' . $class_name . '.php';
        if (is_file($class_path)) {
            /** @noinspection PhpIncludeInspection */
            require_once $class_path;
            return;
        }

        // data libs folder
        $class_path = _PS_ROOT_DIR_ . '/dynamicproduct/libs/' . $class_name . '.php';
        if (is_file($class_path)) {
            /** @noinspection PhpIncludeInspection */
            require_once $class_path;
            return;
        }
    }

    public function initDefines()
    {
        if (!defined('_DP_FRONT_DEV_PORT_')) {
            define('_DP_FRONT_DEV_PORT_', 2001);
            define('_DP_ADMIN_DEV_PORT_', 2003);
        }
        include dirname(__FILE__) . '/types.php';
    }

    public function assignEditInput()
    {
        Media::addJsDef(array(
            'dp_id_input' => 0,
        ));
        if (Tools::getIsset('id_input')) {
            $id_input = (int) Tools::getValue('id_input');

            $dp_input = new DynamicInput($id_input);
            $dp_input->assignInputFields($this->context->language->id);

            if ($dp_input->checkAuth()) {
                $is_same_cart = (int) $dp_input->id_cart === (int) $this->provider->getCart();
                $is_admin = Tools::getIsset('is_admin_edit') && $this->provider->isAdmin();
                if ($is_same_cart || $is_admin) {
                    Media::addJsDef(array(
                        'dp_id_input' => (int) $dp_input->id,
                    ));
                }
                Media::addJsDef(array(
                    'dp_input' => $dp_input->input_fields,
                ));
            }
        }
    }

    private function initFieldTypesList()
    {
        $this->field_types = array(
            _DP_INPUT_       => array(
                'type'      => _DP_INPUT_,
                'name'      => 'input',
                'label'     => $this->l('Numeric Input'),
                'color'     => '#f44336',
                'label_pos' => 'after',
                'position'  => 1,
            ),
            _DP_SLIDER_      => array(
                'type'      => _DP_SLIDER_,
                'name'      => 'slider',
                'label'     => $this->l('Slider'),
                'color'     => '#cd9321',
                'label_pos' => 'after',
                'position'  => 2,
            ),
            _DP_DROPDOWN_    => array(
                'type'      => _DP_DROPDOWN_,
                'name'      => 'dropdown',
                'label'     => $this->l('Dropdown'),
                'color'     => '#9c27b0',
                'options'   => true,
                'label_pos' => 'none',
                'position'  => 3,
            ),
            _DP_RADIO_       => array(
                'type'      => _DP_RADIO_,
                'name'      => 'radio',
                'label'     => $this->l('Radio buttons'),
                'color'     => '#673ab7',
                'options'   => true,
                'label_pos' => 'before',
                'position'  => 4,
            ),
            _DP_THUMBNAILS_  => array(
                'type'      => _DP_THUMBNAILS_,
                'name'      => 'thumbnails',
                'label'     => $this->l('Image list'),
                'color'     => '#3f51b5',
                'options'   => true,
                'label_pos' => 'before',
                'position'  => 5,
            ),
            _DP_CHECKBOX_    => array(
                'type'      => _DP_CHECKBOX_,
                'name'      => 'checkbox',
                'label'     => $this->l('Checkbox'),
                'color'     => '#2196f3',
                'label_pos' => 'after',
                'position'  => 6,
            ),
            _DP_SWITCH_      => array(
                'type'      => _DP_SWITCH_,
                'name'      => 'switch',
                'label'     => $this->l('Switch'),
                'color'     => '#3f51b5',
                'label_pos' => 'after',
                'position'  => 6,
            ),
            _DP_TEXT_        => array(
                'type'      => _DP_TEXT_,
                'name'      => 'text',
                'label'     => $this->l('Text'),
                'color'     => '#03a9f4',
                'label_pos' => 'none',
                'position'  => 7,
            ),
            _DP_TEXTAREA_    => array(
                'type'      => _DP_TEXTAREA_,
                'name'      => 'textarea',
                'label'     => $this->l('Text Area'),
                'color'     => '#00bcd4',
                'label_pos' => 'none',
                'position'  => 8,
            ),
            _DP_DATE_        => array(
                'type'      => _DP_DATE_,
                'name'      => 'date',
                'label'     => $this->l('Date'),
                'color'     => '#009688',
                'label_pos' => 'after',
                'position'  => 9,
            ),
            _DP_IMAGE_       => array(
                'type'      => _DP_IMAGE_,
                'name'      => 'image',
                'label'     => $this->l('Image'),
                'color'     => '#4caf50',
                'label_pos' => 'none',
                'position'  => 10,
            ),
            _DP_FILE_        => array(
                'type'      => _DP_FILE_,
                'name'      => 'file',
                'label'     => $this->l('File'),
                'color'     => '#8bc34a',
                'label_pos' => 'none',
                'position'  => 11,
            ),
            _DP_FIXED_       => array(
                'type'      => _DP_FIXED_,
                'name'      => 'fixed',
                'label'     => $this->l('Fixed Value'),
                'color'     => '#2196f3',
                'label_pos' => 'none',
                'position'  => 12,
            ),
            _DP_PRICE_       => array(
                'type'      => _DP_PRICE_,
                'name'      => 'price',
                'label'     => $this->l('Price'),
                'color'     => '#9c27b0',
                'label_pos' => 'none',
                'position'  => 13,
            ),
            _DP_PHP_         => array(
                'type'      => _DP_PHP_,
                'name'      => 'php',
                'label'     => $this->l('Dynamic Variable'),
                'color'     => '#ffc107',
                'label_pos' => 'none',
                'position'  => 14,
            ),
            _DP_FEATURE_     => array(
                'type'      => _DP_FEATURE_,
                'name'      => 'feature',
                'label'     => $this->l('Feature'),
                'color'     => '#ff9800',
                'label_pos' => 'none',
                'position'  => 15,
            ),
            _DP_DIVIDER_     => array(
                'type'      => _DP_DIVIDER_,
                'name'      => 'divider',
                'label'     => $this->l('Divider'),
                'color'     => '#ff5722',
                'label_pos' => 'after',
                'position'  => 16,
            ),
            _DP_COLORPICKER_ => array(
                'type'      => _DP_COLORPICKER_,
                'name'      => 'colorpicker',
                'label'     => $this->l('Color picker'),
                'color'     => '#607d8b',
                'label_pos' => 'none',
                'position'  => 17,
            ),
            _DP_HTML_        => array(
                'type'      => _DP_HTML_,
                'name'      => 'html',
                'label'     => 'Html',
                'color'     => '#3f51b5',
                'label_pos' => 'none',
                'position'  => 18,
            ),
            _DP_ERROR_       => array(
                'type'      => _DP_ERROR_,
                'name'      => 'error',
                'label'     => $this->l('Error message'),
                'color'     => '#d0121a',
                'label_pos' => 'none',
                'position'  => 19,
            ),
        );
    }

    private function initHelpers()
    {
        $this->processor = new DynamicProcessor($this, $this->context);
        $this->presenter = new DynamicPresenter($this, $this->context);
        $this->viewer = new DynamicViewer($this, $this->context);
        $this->handler = new DynamicHandler($this, $this->context);
        $this->provider = new DynamicProvider($this, $this->context);
        $this->calculator = new DynamicCalculator($this, $this->context);
        $this->installer = new DynamicInstaller($this, $this->context);

        $port = DynamicTools::getHotPort();
        if ($port && DynamicTools::isHotMode($port)) {
            $this->media = new HotMedia($this, $this->context);
        } else {
            $this->media = new DynamicMedia($this, $this->context);
        }
    }

    private function initVariables()
    {
        $this->dp_module_dir = $this->getUrl();
        $this->smarty->assign('dp_module_dir', $this->dp_module_dir);
        $this->smarty->assign('ps_base_url', $this->getBaseUrl());
        $this->strings = array(
            $this->l('Customization'),
            $this->l('Product Customization'),
            $this->l('This product adds the total customizations cost to your cart')
        );
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
        return $this->context->shop->getBaseURL(true);
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

    public function getContent()
    {
        $this->displayForm();
        return $this->html_content;
    }

    private function isAdminController()
    {
        if ($this->context->controller !== null) {
            return $this->context->controller->controller_type === 'admin';
        }
        return false;
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

    private function displayForm()
    {
        $admin_link = DynamicTools::getAdminLink();
        $id_lang = $this->context->language->id;

        $this->context->smarty->assign(array(
            'link'           => $this->context->link,
            'req'            => $admin_link,
            'dp_languages'   => $this->languages,
            'dp_lang'        => (int) $id_lang,
            'dp_module_link' => $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name,
        ));

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
            $this->html_content .= $this->viewer->display($view_action);
            return null;
        }

        $this->context->smarty->assign(array(
            'units'           => DynamicUnit::getAll($id_lang),
            'field_groups'    => DynamicFieldGroup::getAll($id_lang),
            'steps'           => DynamicStep::getAll($id_lang),
            'favorite_fields' => DynamicField::getFavoriteFields($id_lang),
            'common_fields'   => DynamicField::getCommonFields($id_lang),
            'token'           => Tools::getAdminTokenLite('AdminModules'),
            'default'         => '&configure=' . $this->name . '&module_name=' . $this->name
        ));

        $main_config_presenter = new MainConfigPresenter($this, $this->context);
        $this->html_content .= $main_config_presenter->display();

        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/display-admin-form.tpl');
        return null;
    }

    /** @noinspection PhpUnused */
    public function hookDisplayHeader()
    {
        $ajax = (int) Tools::getValue('ajax');
        if ($ajax) {
            return null;
        }

        $entries_helper = new DynamicEntriesHelper($this, $this->context);

        $output = '';

        $is_hot_mode = DynamicTools::isHotMode(_DP_FRONT_DEV_PORT_);
        $css_base_path = null;
        $js_base_path = null;

        $cart_entry = $entries_helper->getEntry('dp-cart-summary');
        $this->media->addJS($cart_entry['js'], $js_base_path);
        $this->media->addCSS($cart_entry['css'], $css_base_path);

        $controller_name = Tools::getValue('controller');

        if ($controller_name === 'product') {
            $id_product = (int) Tools::getValue('id_product');

            $id_attribute = $this->provider->getCurrentAttribute($id_product);
            $product_config = DynamicConfig::getByProduct($id_product);
            $this->smarty->assign('dp_config', $product_config);
            if ($product_config->active) {
                $this->handler->addCustomField($id_product);

                $entry = $entries_helper->getEntry('dp-product-buttons');

                if (!$is_hot_mode) {
                    $this->media->addCSS($entry['css'], $css_base_path);
                }

                $this->assignEditInput();

                $is_admin = $this->provider->isAdmin();
                $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);

                Media::addJsDef(array(
                    'dp_hot_mode'   => $is_hot_mode,
                    'ps_module_dev' => DynamicTools::isModuleDevMode(),
                    'dp'            => array(
                        'id_product'        => $id_product,
                        'id_source_product' => $id_source_product,
                        'id_attribute'      => $id_attribute,
                        'is_admin_edit'     => (int) (Tools::getIsset('is_admin_edit') && $is_admin),
                        'controllers'       => array(
                            'loader' => $this->context->link->getModuleLink($this->name, 'loader'),
                        ),
                    )
                ));

                $this->context->controller->addJqueryUI('ui.tooltip');
                $this->context->controller->addJqueryUI('ui.spinner');
                $this->context->controller->addJqueryUI('ui.slider');
                $this->context->controller->addJqueryUI('ui.datepicker');
                $this->context->controller->addJqueryUI('ui.progressbar');

                $user_js_def = DynamicEquation::getUserJsDefinitions($id_product);
                if (count($user_js_def)) {
                    Media::addJsDef($user_js_def);
                }

                $this->media->addJS(array(
                    $this->media->getJSDir() . 'dynamic/custom.js',
                    $this->media->getJSDir() . 'dynamic/custom' . $id_source_product . '.js',
                    $this->media->getThemeJSDir() . 'dynamic/custom.js',
                    $this->media->getThemeJSDir() . 'dynamic/custom' . $id_source_product . '.js'
                ));

                if (!$is_hot_mode) {
                    $this->media->addJS($entry['js']);
                }

                $this->smarty->assign(array(
                    'dp_uploader' => $this->context->link->getModuleLink($this->name, 'uploader'),
                ));
                if ($is_hot_mode) {
                    $output .= $this->display(__FILE__, 'views/templates/hook/vite-script.tpl');
                }
            }
        }

        Media::addJsDef(array(
            'dp_version'     => $this->version,
            'dp_id_module'   => $this->id,
            'dp_public_path' => $this->getFolderUrl('lib/media/dist/')
        ));

        $output .= $this->display(__FILE__, 'views/templates/hook/display-header.tpl');

        $this->media->addCSS(array(
            $this->media->getCSSDir() . 'dynamic.css',
            $this->media->getThemeCSSDir() . 'dynamic.css',
        ));

        if ($controller_name === 'product') {
            $id_product = (int) Tools::getValue('id_product');
            $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);

            $this->media->addCSS(array(
                $this->media->getCSSDir() . 'dynamic' . $id_source_product . '.css',
                $this->media->getThemeCSSDir() . 'dynamic' . $id_source_product . '.css',
            ));
        }

        return $output;
    }

    public function hookDisplayPaymentTop()
    {
        $this->smarty->assign(array(
            'dp_disabled_options' => $this->handler->getDisabledOptions(),
            'dp_oos_inputs'       => $this->handler->getOOSInputs(),
        ));
        return $this->display(__FILE__, 'views/templates/hook/display-payment-top.tpl');
    }

    /** @noinspection PhpUnused */
    public function hookDisplayCheckoutSummaryTop()
    {
        return $this->hookDisplayPaymentTop();
    }

    /** @noinspection PhpUnused */
    public function hookDisplayShoppingCart()
    {
        return $this->hookDisplayPaymentTop();
    }

    /** @noinspection PhpUnused */
    public function hookDisplayBeforeShoppingCartBlock()
    {
        return $this->hookDisplayPaymentTop();
    }

    /** @noinspection PhpUnused */
    public function hookActionValidateOrder($params)
    {
        /** @var Order $order */
        $order = $params['order'];
        $id_cart = (int) $order->id_cart;

        DynamicInput::updateCartQuantities(new Cart($id_cart));

        $upload_helper = new DynamicUploadHelper($this, $this->context);
        $upload_helper->copyOrderFilesToKeep($id_cart);

        $product_cost = new DynamicProductCost($this, $this->context);
        $product_cost->updateCost($order->id);
    }

    /** @noinspection PhpUnused */
    public function hookActionOrderStatusPostUpdate($params)
    {
        $error_or_canceled_statuses = array(
            Configuration::get('PS_OS_ERROR'),
            Configuration::get('PS_OS_CANCELED')
        );
        /** @var OrderState $order_status */
        $order_status = $params['newOrderStatus'];
        $id_order = (int) $params['id_order'];
        $id_cart = (int) Order::getCartIdStatic($id_order);

        $cart = new Cart($id_cart);
        $is_canceled = in_array($order_status->id, $error_or_canceled_statuses, false);
        if ($is_canceled) {
            DynamicInput::updateCartQuantities($cart, true);
        }
    }

    /** @noinspection PhpUnused */
    public function hookActionClearCompileCache()
    {
        Tools::deleteDirectory($this->provider->getDataDir('cache'), false);
    }

    /** @noinspection PhpUnused */
    public function hookDisplayRightColumnProduct()
    {
        return $this->hookDisplayProductAdditionalInfo();
    }

    /** @noinspection PhpUnused */
    public function hookDisplayLeftColumnProduct()
    {
        return $this->hookDisplayProductAdditionalInfo();
    }

    public function hookDisplayProductButton()
    {
        $id_product = (int) Tools::getValue('id_product');

        $this->smarty->assign(array(
            'product_link'   => $this->provider->getProductLink($id_product),
            'product_config' => DynamicConfig::getByProduct($id_product),
        ));
        return $this->display(
            __FILE__,
            'views/templates/hook/display-product-button.tpl',
            $this->name . "-button-$id_product",
            $this->name . "-button-$id_product"
        );
    }

    public function hookDisplayProductAdditionalInfo()
    {
        if (Tools::getValue('ajax')) {
            return false;
        }

        $id_product = (int) Tools::getValue('id_product');

        $dp_config = DynamicConfig::getByProduct($id_product);

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

        return $this->display(
            __FILE__,
            'views/templates/hook/display-product-buttons.tpl',
            $this->name . '-buttons',
            $this->name . '-buttons'
        );
    }

    /** @noinspection PhpUnused */
    public function hookDisplayCustomization($params)
    {
        $id_input = $this->provider->getDynamicInputIdFromString($params['customization']['value']);
        if (!$id_input) {
            return $params['customization']['value'];
        }

        if (isset($params['array'])) {
            return $this->hookDisplayCustomizationValues($id_input);
        }

        $this->context->smarty->assign(array(
            'is_pdf' => false
        ));
        $is_admin = isset($params['is_admin']) || $this->isAdminController();
        $is_order_state = $this->provider->isOrderStateRequest();
        if ($is_admin && !$is_order_state) {
            return $this->hookDisplayAdminInputSummary($id_input, $params);
        }
        return $this->hookDisplayInputSummary($id_input, $params);
    }

    public function hookAddWebserviceResources()
    {
        return array(
            'dynamic_inputs'       => array(
                'description' => 'Dynamic inputs',
                'class'       => 'classes\models\DynamicInput'
            ),
            'dynamic_input_fields' => array(
                'description' => 'Dynamic input fields',
                'class'       => 'classes\models\DynamicInputField'
            ),
        );
    }

    /** @noinspection PhpUnused */
    public function hookDisplayProductPriceBlock($params)
    {
        $id_product = (int) $params['product']['id_product'];
        $dynamic_config = DynamicConfig::getByProduct($id_product);
        $is_active = (int) $dynamic_config->active;
        if ($is_active) {
            if ($params['type'] === 'before_price') {
                if (!empty($dynamic_config->displayed_price_label)) {
                    return null;
                }
                if ($dynamic_config->display_starting_from) {
                    return $this->l('Starting from');
                }
                return null;
            }
            if ($params['type'] === 'unit_price') {
                return $dynamic_config->displayed_price_label;
            }
        }
        return null;
    }

    /** @noinspection PhpUnused */
    public function hookActionAdminControllerSetMedia()
    {
        $translation_helper = new TranslationHelper($this, $this->context);
        $link = $this->context->link;

        Media::addJsDef(array(
            'dp_id_module'    => $this->id,
            'ps_module_dev'   => DynamicTools::isModuleDevMode(),
            'dp_public_path'  => $this->getFolderUrl('lib/media/dist/'),
            'dp_translations' => $translation_helper->getAdminTranslations(),
            'dp_module_link'  => $link->getAdminLink('AdminModules') . '&configure=' . $this->name
        ));

        $controller_name = $this->context->controller->controller_name;

        if ($controller_name === 'AdminProducts') {
            $is_hot_mode = DynamicTools::isHotMode(_DP_FRONT_DEV_PORT_);
            $css_base_path = null;
            $js_base_path = null;

            $id_product = $this->provider->getCurrentProductID();

            if ($id_product) {
                $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);

                $id_lang = $this->context->language->id;

                //get product combinations
                $combinations = $this->provider->getProductCombinations($id_product);
                $visibility_values = false;
                if (is_array($combinations) && count($combinations)) {
                    $visibility_values = $this->provider->getVisibilityValues($id_product);
                }

                $combination_fields = DynamicCombinationField::getByIdProduct($id_product);

                $combination_values = DynamicCombinationValue::getValuesByIdProduct($id_product);
                $combination_values = DynamicCombinationValue::organizeByAttributesAndFields($combination_values);

                Media::addJsDef(array(
                    'dp_hot_mode'      => $is_hot_mode,
                    'dp_hot_mode_port' => DynamicTools::getHotPort(),
                    'dpa_message'      => $this->getAdminMessages(),
                    'dpa'              => array(
                        'version' => $this->version,
                        'ps_uri'  => __PS_BASE_URI__,
                        'uri'     => $this->getPathUri(),

                        'loaded' => false,

                        'demo_mode' => DynamicTools::isDemoMode(),

                        'id_product'             => $id_product,
                        'id_source_product'      => $id_source_product,
                        'id_source_product_name' => Product::getProductName($id_source_product, null, $id_lang),
                        'nb_linked_configs'      => DynamicProductConfigLink::getNbLinkedConfigs($id_source_product),

                        'id_default_lang' => (int) Configuration::get('PS_LANG_DEFAULT'),
                        'languages'       => Language::getLanguages(),
                        'config'          => DynamicConfig::getByProduct($id_product),

                        'currency' => $this->context->currency,

                        'products'   => DynamicConfig::getActiveProductsWithLabels($id_lang),
                        'categories' => Category::getSimpleCategories($id_lang),

                        'fields'      => DynamicField::getFieldsByIdProduct($id_product),
                        'field_types' => $this->field_types,

                        'features'   => ProductHelper::getProductFeatureFields($id_product),
                        'attributes' => ProductHelper::getProductAttributeFields($id_product),
                        'databases'  => ProductHelper::getProductDatabaseFields(),

                        'units' => DynamicUnit::getAll($id_lang),

                        'favorite_fields' => DynamicField::getFavoriteFields($id_lang),
                        'common_fields'   => DynamicField::getCommonFields($id_lang),

                        'equations' => DynamicEquation::getEquationsByIdProduct($id_product),

                        'combinations'       => $combinations,
                        'combination_fields' => $combination_fields,
                        'combination_values' => $combination_values,
                        'visibility'         => $visibility_values,

                        'conditions'     => DynamicCondition::getByProduct($id_product),
                        'field_formulas' => FieldFormula::getByProduct($id_product),
                        'proportions'    => DynamicProportion::getByProduct($id_product),

                        'intervals' => Interval::getByIdProduct($id_product),

                        'grids' => Grid::getByIdProduct($id_product),

                        'product_field_groups' => DynamicProductFieldGroup::getByIdProduct($id_product, true),
                        'field_groups'         => DynamicFieldGroup::getAll($id_lang),

                        'product_steps' => DynamicProductStep::getByIdProduct($id_product, true),
                        'steps'         => DynamicStep::getAll($id_lang),

                        'exec_order'  => ExecOrder::getByIdProduct($id_product),
                        'exec_labels' => ExecOrder::getLabels(),

                        'links' => array(
                            'is_new_tab'         => Tools::getIsset('new_tab'),
                            'dev_link'           => DynamicTools::addQueryToUrl(
                                $link->getAdminLink('DynamicProductDev'),
                                array(
                                    'id_product' => $id_product,
                                    'new_tab'    => 1,
                                )
                            ),
                            'admin_product_link' => $link->getAdminLink(
                                'AdminProducts',
                                true,
                                array('id_product' => $id_product)
                            ),
                            'product_link'       => DynamicTools::addQueryToUrl(
                                $this->provider->getProductLink($id_product),
                                array(
                                    'rand' => '_rand_',
                                )
                            ),
                            'module_link'        =>
                                $link->getAdminLink('AdminModules') . '&configure=' . $this->name,
                        ),

                        'controllers' => array(
                            'product_settings'       => $link->getAdminLink('DynamicProductSettings'),
                            'product_equations'      => $link->getAdminLink('DynamicProductEquations'),
                            'product_fields'         => $link->getAdminLink('DynamicProductFields'),
                            'fields_settings'        => $link->getAdminLink('DynamicProductFieldsSettings'),
                            'fields_options'         => $link->getAdminLink('DynamicProductFieldsOptions'),
                            'product_combinations'   => $link->getAdminLink('DynamicProductCombinations'),
                            'product_visibility'     => $link->getAdminLink('DynamicProductVisibility'),
                            'product_proportions'    => $link->getAdminLink('DynamicProductProportions'),
                            'product_conditions'     => $link->getAdminLink('DynamicProductConditions'),
                            'product_field_formulas' => $link->getAdminLink('DynamicProductFieldFormulas'),
                            'product_intervals'      => $link->getAdminLink('DynamicProductIntervals'),
                            'product_grids'          => $link->getAdminLink('DynamicProductGrids'),
                            'product_exec_order'     => $link->getAdminLink('DynamicProductExecOrder'),
                            'product_field_groups'   => $link->getAdminLink('DynamicProductFieldGroups'),
                            'product_steps'          => $link->getAdminLink('DynamicProductSteps'),
                        )
                    ),
                ));

                $entries_helper = new DynamicEntriesHelper($this, $this->context);
                $entry = $entries_helper->getEntry('dp-product-config');

                if (!$is_hot_mode) {
                    $this->media->addCSS($entry['css'], $css_base_path);
                }

                $this->context->controller->addJqueryPlugin('tablednd');
                $this->context->controller->addJqueryUI('ui.tabs');
                $this->context->controller->addJqueryUI('ui.sortable');
                $this->context->controller->addJqueryUI('ui.draggable');
                $this->context->controller->addJqueryUI('ui.droppable');

                if (!$is_hot_mode) {
                    $this->media->addJS($entry['js'], $js_base_path);
                }
            } else {
                Media::addJsDef(array(
                    'dp_dir'            => $this->getUrl(),
                    'dp_products'       => DynamicConfig::getActiveProducts(),
                    'dp_linked_configs' => DynamicProductConfigLink::getLinkedConfigs(),
                    'dp_logo_url'       => $this->getUrl() . 'logo.png',
                    'dp_logo_link_url'  => $this->getFolderUrl('views/img/icons/') . 'logo-link.png',
                    'dpa_message'       => $this->getAdminMessages()
                ));

                $entries_helper = new DynamicEntriesHelper($this, $this->context);
                $entry = $entries_helper->getEntry('dp-products-list');

                $this->media->addJS($entry['js'], $js_base_path);
            }
        }

        if ($controller_name === 'AdminOrders' || $controller_name === "AdminCarts") {
            $entries_helper = new DynamicEntriesHelper($this, $this->context);
            $entry = $entries_helper->getEntry('dp-order-summary');
            $this->media->addCSS($entry['css']);
            $this->media->addJS($entry['js']);
        }

        if ($controller_name === 'AdminModules' && Tools::getValue('configure') === $this->name) {
            Media::addJsDef(array(
                'dp_config'   => $link->getAdminLink('DynamicMainConfig'),
                'dpa_message' => $this->getAdminMessages(),
            ));

            $entries_helper = new DynamicEntriesHelper($this, $this->context);
            $entry = $entries_helper->getEntry('dp-module-form');
            $this->media->addCSS($entry["css"]);
            $this->media->addJS($entry['js']);
        }

        $this->context->controller->addCSS($this->_path . 'views/css/admin.css');
    }

    /** @noinspection PhpUnused */
    public function hookDisplayBackOfficeHeader()
    {
        $output = '';

        $is_hot_mode = DynamicTools::isHotMode(_DP_FRONT_DEV_PORT_);
        if ($is_hot_mode) {
            $output .= $this->display(__FILE__, 'views/templates/hook/vite-script-admin.tpl');
        }

        return $output;
    }


    /** @noinspection PhpUnused */
    public function hookDisplayBackOfficeFooter()
    {
        $output = '';

        $is_hot_mode = DynamicTools::isHotMode(_DP_FRONT_DEV_PORT_);
        if ($is_hot_mode) {
            $output .= $this->display(__FILE__, 'views/templates/hook/vite-script-admin.tpl');
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

        return $this->display(__FILE__, 'views/templates/admin/hook/display-admin-products-extra.tpl');
    }

    public function hookActionCartSave($params)
    {
        /** @var Cart $cart */
        $cart = isset($params['cart']) ? $params['cart'] : null;

        if (!Validate::isLoadedObject(Context::getContext()->cart)) {
            return;
        }

        if ($cart) {
            $id_lang = $this->context->language->id;
            $products = $cart->getProducts();
            foreach ($products as $product) {
                $id_product = (int) $product['id_product'];
                $dynamic_config = DynamicConfig::getByProduct($id_product);
                if ((int) $dynamic_config->active) {
                    $id_attribute = (int) $product['id_product_attribute'];
                    $id_customization = (int) $product['id_customization'];

                    $price_equation = DynamicEquation::getPriceEquation($id_product);
                    $weight_equation = DynamicEquation::getWeightEquation($id_product);

                    $recalc_price = DynamicEquation::containsQuantityField($price_equation->formula);
                    $recalc_weight = DynamicEquation::containsQuantityField($weight_equation->formula);
                    $is_reorder = Tools::getIsset('submitReorder');
                    $recalc = $recalc_price || $recalc_weight || $is_reorder;

                    if ($recalc) {
                        $quantity_input_field = new DynamicInputField();
                        $quantity_input_field->name = 'quantity';
                        $quantity_input_field->value = (int) $product['quantity'];
                        $customization_input = DynamicInput::getInputByCustomization($id_customization);
                        if (Validate::isLoadedObject($customization_input)) {
                            $customization_input->assignInputFields($id_lang);
                            $input_fields = $customization_input->input_fields;
                            $input_fields['quantity'] = $quantity_input_field;

                            if ($recalc_price || $is_reorder) {
                                $price = DynamicEquation::calculatePriceFormula(
                                    $id_product,
                                    $id_attribute,
                                    $price_equation,
                                    $input_fields
                                );
                                $customization_input->updatePrice($price);
                            }

                            if ($recalc_weight || $is_reorder) {
                                $weight = DynamicEquation::calculateWeightFormula(
                                    $id_product,
                                    $id_attribute,
                                    $weight_equation,
                                    $input_fields
                                );
                                $customization_input->updateWeight($weight);
                            }
                        }
                    }
                }
            }
        }
    }

    public function hookCartDuplicated($params)
    {
        $id_cart_old = $params['id_cart_old'];
        $id_cart_new = $params['id_cart_new'];
        $this->handler->duplicateInputs($id_cart_old, $id_cart_new);
    }

    public function hookDisplayInputSummary($id_input, $params)
    {
        $id_lang = $this->context->language->id;
        $summary_helper = new SummaryHelper($this, $this->context);

        $controller = Tools::getValue('controller');
        $has_post = !empty($_POST) && $controller !== 'cart';
        $is_pdf = isset($params['is_pdf']) || $controller === 'pdfinvoice' || $has_post;
        $is_order_detail = in_array($controller, array('orderdetail', 'orderconfirmation'));

        if ($summary = $summary_helper->getCachedSummary('input', $id_input, $id_lang, $is_pdf, $is_order_detail)) {
            return $summary;
        }

        $input = new DynamicInput($id_input, $id_lang);
        $input->assignInputFields($id_lang);

        $this->context->smarty->assign(array(
            'input'           => $input,
            'is_pdf'          => $is_pdf,
            'is_order_detail' => $is_order_detail,
        ));
        $summary = $this->display(__FILE__, 'views/templates/hook/display-input-summary.tpl');
        $summary_helper->cacheSummary('input', $id_input, $id_lang, $is_pdf, $is_order_detail, $summary);
        return $summary;
    }

    public function hookDisplayAdminInputSummary($id_input, $params)
    {
        $id_lang = (int) $this->context->language->id;
        $input = new DynamicInput($id_input, $id_lang);
        $input->assignInputFields($id_lang);

        if (Tools::getValue('controller') === 'validation') {
            $input->price = $this->calculator->applyTax($input->price, false, false, $input->id_product);
        }

        $this->context->smarty->assign(array(
            'is_pdf'   => isset($params['is_pdf']) ||
                Tools::getValue('controller') === 'AdminPdf'
                || strpos($_SERVER['REQUEST_URI'], 'generate-invoice-pdf') !== false
                || !empty($_POST),
            'is_admin' => true,
            'input'    => $input,
        ));
        return $this->display(__FILE__, 'views/templates/hook/display-admin-input-summary.tpl');
    }

    public function hookDisplayCustomizationValues($id_input)
    {
        $id_lang = (int) $this->context->language->id;
        $input = new DynamicInput($id_input, $id_lang);
        $input->assignInputFields($id_lang);

        $summary = array();
        foreach ($input->input_fields as $input_field) {
            if (!$input_field->isSkipped()) {
                $summary[] = array(
                    'label' => $input_field->label,
                    'value' => $input_field->displayValue(),
                );
            }
        }

        return $summary;
    }

    /** @noinspection PhpUnused */
    public function hookActionProductAdd($params)
    {
        if ($this->provider->isDuplicateRequest()) {
            $id_product_old = (int) $this->provider->getProductIdFromDuplicateRequest();
            $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product_old);

            $id_product_new = (int) $params['id_product'];

            if ($id_source_product == $id_product_old) {
                $this->handler->copyConfig($id_product_new, $id_product_old, true);
            } else {
                DynamicProductConfigLink::createLink($id_product_new, $id_source_product);
            }
        }
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayUpdateUnit()
    {
        $id_unit = (int) Tools::getValue('id_unit');
        $unit = new DynamicUnit($id_unit);

        $this->context->smarty->assign(array(
            'urlhash' => '#dp_units_form',
            'unit'    => $unit,
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/units/unit-form.tpl');
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayAddUnit()
    {
        $this->context->smarty->assign(array(
            'urlhash' => '#units_form',
            'unit'    => new DynamicUnit(0),
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/units/unit-form.tpl');
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayUpdateFieldGroup()
    {
        $id_field_group = (int) Tools::getValue('id_field_group');
        $field_group = new DynamicFieldGroup($id_field_group);

        $this->context->smarty->assign(array(
            'urlhash'     => '#dp_field_groups_form',
            'field_group' => $field_group,
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/field-groups/field-group-form.tpl');
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayAddFieldGroup()
    {
        $this->context->smarty->assign(array(
            'urlhash'     => '#dp_field_groups_form',
            'field_group' => new DynamicFieldGroup(0),
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/field-groups/field-group-form.tpl');
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayUpdateStep()
    {
        $id_step = (int) Tools::getValue('id_step');
        $step = new DynamicStep($id_step);

        $this->context->smarty->assign(array(
            'urlhash' => '#dp_steps_form',
            'step'    => $step,
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/steps/step-form.tpl');
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayAddStep()
    {
        $this->context->smarty->assign(array(
            'urlhash' => '#dp_steps_form',
            'step'    => new DynamicStep(0),
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/steps/step-form.tpl');
    }

    private function getAdminMessages()
    {
        $source = DynamicTools::getSource();
        return array(
            'loading'      => $this->l('Loading...', $source),
            'success'      => $this->l('Data saved', $source),
            'error'        => $this->l('An error occurred', $source),
            'confirm'      => $this->l('Are you sure you want to delete this item?', $source),
            'erase'        => $this->l('You will lose any unsaved changes to this formula, continue?', $source),
            'delete_image' => $this->l('Are you sure you want to delete this image?', $source),
            'close'        => $this->l('You will lose any unsaved changes, continue?', $source),
            'invalid'      => $this->l('The formula is invalid', $source),
            'empty'        => $this->l('Some values were not filled, continue?', $source),

            'no_product'    => $this->l('Please select a product first.', $source),
            'warn_config'   => $this->l('The current configuration will be overwritten, continue?', $source),
            'loaded_config' => $this->l('The configuration was loaded successfully', $source),

            'no_category'             => $this->l('Please select a category first.', $source),
            'warn_copy_config'        => $this->l(
                'Overwrite the configuration of all products of the selected category?',
                $source
            ),
            'copied_config'           => $this->l('The configuration was copied successfully', $source),
            'copied_config_clipboard' => $this->l('Configuration copied to clipboard successfully', $source),

            'warn_unlink_config' => $this->l('This will restore the previous configuration of this product', $source),
            'config_unlinked'    => $this->l('Configuration unlinked successfully', $source),

            'warn_unlink_configs' => $this->l(
                'This will restore the original configurations of the linked products',
                $source
            ),
            'configs_unlinked'    => $this->l('Configurations unlinked successfully', $source),

            'no_field'          => $this->l('Please select a field first.', $source),
            'field_settings'    => $this->l('Field Settings', $source),
            'field_options'     => $this->l('Field Options', $source),
            'condition_formula' => $this->l('Condition formula', $source),
            'field_formula'     => $this->l('Field formula', $source),
            'generic_formula'   => $this->l('Formula', $source),

            'fields' => array(
                'changed'     => $this->l('Holds the name of the field that has changed'),
                'unavailable' => $this->l('This field is unavailable'),
            ),

            'grid' => array(
                'delete'        => $this->l('Are you sure you want to delete this grid?'),
                'column_delete' => $this->l('Are you sure you want to delete this column?'),
                'row_delete'    => $this->l('Are you sure you want to delete this row?'),
            ),
        );
    }
}
