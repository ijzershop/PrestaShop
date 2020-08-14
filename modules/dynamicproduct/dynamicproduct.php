<?php
/**
 * 2010-2019 Tuni-Soft
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
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 * @property string author_address
 * @property bool bootstrap
 */

use classes\DynamicTools;
use classes\factory\DynamicFieldFactory;
use classes\helpers\ProductHelper;
use classes\models\DynamicCombinationValue;
use classes\models\DynamicCondition;
use classes\models\DynamicConfig;
use classes\models\DynamicEquation;
use classes\models\DynamicField;
use classes\models\DynamicInput;
use classes\models\DynamicProportion;
use classes\models\DynamicUnit;
use classes\models\FieldFormula;
use classes\module\DynamicCalculator;
use classes\module\DynamicHandler;
use classes\module\DynamicInstaller;
use classes\module\DynamicMedia;
use classes\module\DynamicPresenter;
use classes\module\DynamicProcessor;
use classes\module\DynamicProvider;

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
    /** @var DynamicHandler */
    public $handler;
    /** @var DynamicInstaller */
    public $installer;
    /** @var DynamicMedia */
    public $media;
    /** @var DynamicProvider */
    public $provider;
    /** @var DynamicCalculator */
    public $calculator;

    protected $config_form = false;
    public $html_content = '';
    public $languages;
    public $dp_module_dir;
    public $currentIndex = 'index.php?controller=AdminModules';

    public $field_types = array();

    public $restricted_units = array();

    public $strings = array();

    private $displayed_container = false;

    public function __construct()
    {
        $this->name = 'dynamicproduct';
        $this->tab = 'front_office_features';
        $this->version = '2.3.4';
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

        if ((int)Configuration::get('PS_DISABLE_OVERRIDES')) {
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

        if (!$this->execSQL('install')) {
            return false;
        }

        return true;
    }

    public function uninstall()
    {
        if (!$this->execSQL('uninstall')) {
            return false;
        }

        $this->installer->uninstallControllers();

        return parent::uninstall();
    }

    public function execSQL($type)
    {
        if (!file_exists(dirname(__FILE__) . '/' . $type . '.sql')) {
            return false;
        }

        if (!$sql = Tools::file_get_contents(dirname(__FILE__) . '/' . $type . '.sql')) {
            return false;
        }
        $sql = str_replace(array('__PREFIX', '_MYSQL_ENGINE_'), array(_DB_PREFIX_ . $this->name, _MYSQL_ENGINE_), $sql);
        $sql = preg_split('/;\s*[\r\n]+/', $sql);
        foreach ($sql as $query) {
            if (!Db::getInstance()->execute(trim($query))) {
                return false;
            }
        }
        return true;
    }

    private function registerAutoload()
    {
        spl_autoload_register(array(__CLASS__, 'autoloadClass'));
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    public function autoloadClass($class_name)
    {
        $class_name = str_replace('\\', '/', $class_name);
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
    }

    public function initDefines()
    {
        include dirname(__FILE__) . '/types.php';
    }

    public function assignEditInput()
    {
        if (Tools::getIsset('id_input')) {
            $id_input = (int)Tools::getValue('id_input');
            $dp_input = new DynamicInput($id_input);
            if ($dp_input->checkAuth()) {
                if ((int)$dp_input->id_cart === (int)$this->provider->getCart()) {
                    Media::addJsDef(array(
                        'dp_id_input' => (int)$dp_input->id,
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
                'name' => 'input',
                'label' => $this->l('Numeric Input'),
                'color' => '#f44336'
            ),
            _DP_SLIDER_      => array(
                'name' => 'slider',
                'label' => $this->l('Slider'),
                'color' => '#cd9321'
            ),
            _DP_DROPDOWN_    => array(
                'name' => 'dropdown',
                'label' => $this->l('Dropdown'),
                'color' => '#9c27b0'
            ),
            _DP_RADIO_       => array(
                'name' => 'radio',
                'label' => $this->l('Radio buttons'),
                'color' => '#673ab7'
            ),
            _DP_THUMBNAILS_  => array(
                'name' => 'thumbnails',
                'label' => $this->l('Image list'),
                'color' => '#3f51b5'
            ),
            _DP_CHECKBOX_    => array(
                'name' => 'checkbox',
                'label' => $this->l('Checkbox'),
                'color' => '#2196f3'
            ),
            _DP_TEXT_        => array(
                'name' => 'text',
                'label' => $this->l('Text'),
                'color' => '#03a9f4'
            ),
            _DP_TEXTAREA_    => array(
                'name' => 'textarea',
                'label' => $this->l('Text Area'),
                'color' => '#00bcd4'
            ),
            _DP_DATE_        => array(
                'name' => 'date',
                'label' => $this->l('Date'),
                'color' => '#009688'
            ),
            _DP_IMAGE_       => array(
                'name' => 'image',
                'label' => $this->l('Image'),
                'color' => '#4caf50'
            ),
            _DP_FILE_        => array(
                'name' => 'file',
                'label' => $this->l('File'),
                'color' => '#8bc34a'
            ),
            _DP_FIXED_       => array(
                'name' => 'fixed',
                'label' => $this->l('Fixed Value'),
                'color' => '#2196f3'
            ),
            _DP_PRICE_       => array(
                'name' => 'price',
                'label' => $this->l('Unit Price'),
                'color' => '#9c27b0'
            ),
            _DP_PHP_         => array(
                'name' => 'php',
                'label' => $this->l('Dynamic Variable'),
                'color' => '#ffc107'
            ),
            _DP_FEATURE_     => array(
                'name' => 'feature',
                'label' => $this->l('Feature'),
                'color' => '#ff9800'
            ),
            _DP_DIVIDER_     => array(
                'name' => 'divider',
                'label' => $this->l('Divider'),
                'color' => '#ff5722'
            ),
            _DP_COLORPICKER_ => array(
                'name' => 'colorpicker',
                'label' => $this->l('Color picker'),
                'color' => '#607d8b'
            ),
            _DP_HTML_ => array(
                'name' => 'html',
                'label' => 'Html',
                'color' => '#3f51b5'
            ),
        );
    }

    private function initHelpers()
    {
        $this->processor = new DynamicProcessor($this, $this->context);
        $this->presenter = new DynamicPresenter($this, $this->context);
        $this->handler = new DynamicHandler($this, $this->context);
        $this->provider = new DynamicProvider($this, $this->context);
        $this->calculator = new DynamicCalculator($this, $this->context);
        $this->installer = new DynamicInstaller($this, $this->context);
        $this->media = new DynamicMedia($this, $this->context);
    }

    private function initVariables()
    {
        $this->dp_module_dir = $this->getUrl();
        $this->smarty->assign('dp_module_dir', $this->dp_module_dir);
        $this->smarty->assign('ps_base_url', $this->getBaseUrl(true));
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
            'req'            => $admin_link,
            'dp_languages'   => $this->languages,
            'dp_lang'        => (int)$id_lang,
            'dp_module_link' => $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name,
        ));

        $this->postProcess();

        $this->media->addCSS(array(
            'views/css/admin/dp-module-form.css',
            'views/css/admin/dp_lang.css'
        ));

        $this->media->addJS(array(
            'views/js/plugins/lang/jquery.dp_lang.js',
            'views/js/admin/vendor.js',
            'views/js/admin/common.js',
            'views/js/admin/dp-module-form.js'
        ));

        $action = $this->presenter->getCurrentAction();

        if ($action) {
            $method = 'display' . Tools::toCamelCase($action, true);
            if (method_exists($this, $method)) {
                return $this->{$method}();
            }
        }

        $this->context->smarty->assign(array(
            'units'           => DynamicUnit::getAll($id_lang),
            'favorite_fields' => DynamicField::getFavoriteFields($id_lang),
            'common_fields'   => DynamicField::getCommonFields($id_lang),
            'token'           => Tools::getAdminTokenLite('AdminModules'),
            'default'         => '&configure=' . $this->name . '&module_name=' . $this->name
        ));

        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/display-admin-form.tpl');
    }

    public function hookDisplayHeader()
    {
        $output = '';

        $this->context->controller->addJqueryPlugin('fancybox');

        $this->media->addJS(array(
            'views/js/front/vendor.js',
            'views/js/front/common.js',
            'views/js/front/dp-cart-summary.js'
        ));

        $this->media->addCSS(array(
            $this->media->getCSSDir() . 'global.css',
        ));

        $controller_name = Tools::getValue('controller');

        if ($controller_name === 'product') {
            $id_product = (int)Tools::getValue('id_product');
            $product_config = new DynamicConfig($id_product);
            $this->smarty->assign('dp_config', $product_config);
            if ((int)$product_config->active) {
                $this->handler->addCustomField($id_product);

                $this->media->addCSS(array(
                    'views/css/front/vendor.css',
                    'views/css/front/common.css',
                    'views/css/front/dp-product-buttons.css',
                ));

                $this->assignEditInput();

                $source = $this->name;
                Media::addJsDef(array(
                    'dp_message' => array(
                        'short'               => $this->l(
                            'The value of the field _label_ must be at least _min_ characters long',
                            $source
                        ),
                        'long'                => $this->l(
                            'The value of the field _label_ must be at most _max_ characters long',
                            $source
                        ),
                        'empty'               => $this->l(
                            'The _label_ field is required',
                            $source
                        ),
                        'min_max'               => $this->l(
                            'The _label_ field must be between _min_ and _max_',
                            $source
                        ),
                        'select'              => $this->l(
                            'Please select an option for the _label_ field',
                            $source
                        ),
                        'confirm'             => $this->l(
                            'Are you sure you want to delete this customization?',
                            $source
                        ),
                        'remove_image_upload' => $this->l(
                            'Are you sure you want to delete this image?',
                            $source
                        ),
                        'remove_file_upload'  => $this->l(
                            'Are you sure you want to delete this file?',
                            $source
                        ),
                        'save_error'          => $this->l(
                            'An error occurred while saving your customization, please try again',
                            $source
                        ),
                        'uploading'          => $this->l(
                            'Uploading...',
                            $source
                        ),
                        'complete'          => $this->l(
                            'Complete',
                            $source
                        ),
                    )
                ));

                Media::addJsDef(array(
                    'dp_id_product'         => $id_product,
                    'dp_id_attribute'       => (int)Tools::getValue('id_product_attribute'),
                    'dp_config'             => $product_config,
                    'dp_active'             => DynamicConfig::isActive($id_product),
                    'dp_upload'             => $this->getFolderUrl('upload/'),
                    'dp_proportions'        => DynamicProportion::getDataByProduct($id_product),
                    'dp_combinations_count' => count($this->provider->getProductCombinations($id_product)),
                    'dp_calculator'         => $this->context->link->getModuleLink($this->name, 'calculator'),
                    'dp_customization'      => $this->context->link->getModuleLink($this->name, 'customization'),
                    'dp_uploader'           => $this->context->link->getModuleLink($this->name, 'uploader'),
                ));

                $this->context->controller->addJqueryUI('ui.spinner');
                $this->context->controller->addJqueryUI('ui.slider');
                $this->context->controller->addJqueryUI('ui.datepicker');
                $this->context->controller->addJqueryUI('ui.progressbar');

                $this->media->addJS(array(
                    $this->media->getJSDir() . 'cldr.js',
                    $this->media->getJSDir() . 'tools.js'
                ));

                $user_js_def = DynamicEquation::getUserJsDefinitions($id_product);
                if (count($user_js_def)) {
                    Media::addJsDef($user_js_def);
                }

                $this->media->addJS(array(
                    'views/js/plugins/jquery.ui.touch-punch.min.js',
                    'views/js/plugins/qtip/jquery.qtip.js',
                    'views/js/front/vendor.js',
                    'views/js/front/common.js',
                    'views/js/front/dp-product-buttons.js',
                    $this->media->getJSDir() . 'dynamic/custom.js',
                    $this->media->getJSDir() . 'dynamic/custom' . $id_product . '.js',
                    $this->media->getThemeJSDir() . 'dynamic/custom' . $id_product . '.js'
                ));

                $this->smarty->assign(array(
                    'dp_uploader' => $this->context->link->getModuleLink($this->name, 'uploader'),
                ));
            }
        }

        Media::addJsDef(array(
            'dp_version'     => $this->version,
            'dp_id_cart'     => Tools::getValue('dp_cart', 0),
            'dp_id_customer' => Tools::getValue('dp_customer', 0),
            'dp_public_path' => $this->getFolderUrl('views/js/')
        ));

        $output .= $this->display(__FILE__, 'views/templates/hook/display-header.tpl');

        $this->media->addCSS(array(
            'views/css/front/vendor.css',
            'views/css/front/common.css',
            'views/css/front/dp-cart-summary.css'
        ));

        $this->media->addCSS(array(
            $this->media->getCSSDir() . 'dynamic.css',
            $this->media->getThemeCSSDir() . 'dynamic.css',
        ));

        if ($controller_name === 'product') {
            $id_product = (int)Tools::getValue('id_product');
            $this->media->addCSS(array(
                $this->media->getCSSDir() . 'dynamic' . $id_product . '.css',
                $this->media->getThemeCSSDir() . 'dynamic' . $id_product . '.css',
            ));
        }

        return $output;
    }

    public function hookDisplayPaymentTop()
    {
        $this->smarty->assign('dp_oos_inputs', $this->handler->getOOSInputs());
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
        $id_cart = (int)$order->id_cart;
        DynamicInput::updateCartQuantities(new Cart($id_cart));
    }

    public function hookActionOrderStatusPostUpdate($params)
    {
        $error_or_canceled_statuses = array(
            Configuration::get('PS_OS_ERROR'),
            Configuration::get('PS_OS_CANCELED')
        );
        /** @var OrderState $order_status */
        $order_status = $params['newOrderStatus'];
        $id_order = (int)$params['id_order'];
        $id_cart = (int)Order::getCartIdStatic($id_order);
        $cart = new Cart($id_cart);
        $is_canceled = in_array($order_status->id, $error_or_canceled_statuses, false);
        if ($is_canceled) {
            DynamicInput::updateCartQuantities($cart, true);
        }
    }

    public function hookDisplayRightColumnProduct()
    {
        return $this->hookDisplayProductAdditionalInfo();
    }

    public function hookDisplayLeftColumnProduct()
    {
        return $this->hookDisplayProductAdditionalInfo();
    }

    public function hookDisplayProductButton()
    {
        $id_product = (int)Tools::getValue('id_product');
        $this->smarty->assign(array(
            'product_link'   => $this->provider->getProductLink($id_product),
            'product_config' => new DynamicConfig($id_product)
        ));
        return $this->display(__FILE__, 'views/templates/hook/display-product-button.tpl');
    }

    public function hookDisplayProductAdditionalInfo()
    {
        if (Tools::getValue('ajax')) {
            return false;
        }

        $id_product = (int)Tools::getValue('id_product');
        $dp_config = new DynamicConfig($id_product);

        if ($dp_config->active && Tools::getValue('action') === 'quickview') {
            return $this->hookDisplayProductButton();
        }

        if ($this->displayed_container) {
            return false;
        }
        $this->displayed_container = true;

        $output = '';
        if (!$dp_config->active) {
            return false;
        }

        $id_lang = $this->context->language->id;

        $this->smarty->assign(array(
            'dp_config' => $dp_config,
            'dp_fields' => DynamicField::getFieldsByIdProduct($id_product, $id_lang),
        ));

        $output .= $this->display(__FILE__, 'views/templates/hook/display-product-buttons.tpl');
        return $output;
    }

    public function hookDisplayCustomization($params)
    {
        $id_input = $this->provider->getDynamicInputIdFromString($params['customization']['value']);
        $dynamic_input = new DynamicInput((int)$id_input, (int)$this->context->language->id);
        if (!Validate::isLoadedObject($dynamic_input)) {
            return $params['customization']['value'];
        }
        $this->context->smarty->assign(array(
            'is_pdf' => false
        ));
        $is_admin = $this->isAdminController();
        $is_order_state = $this->provider->isOrderStateRequest();
        if ($is_admin && !$is_order_state) {
            return $this->hookDisplayAdminInputSummary($id_input);
        }
        return $this->hookDisplayInputSummary($id_input);
    }

    public function hookDisplayProductPriceBlock($params)
    {
        $id_product = (int)$params['product']['id_product'];
        $displayed_price = DynamicConfig::getDisplayedPrice($id_product);
        $is_active = DynamicConfig::isActive($id_product);
        if ($is_active && $displayed_price && $params['type'] === 'before_price') {
            return $this->l('starting from');
        }
    }

    public function hookDisplayBackOfficeHeader()
    {
        $controller_name = $this->context->controller->controller_name;
        $id_lang = $this->context->language->id;

        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'id_lang'      => $id_lang,
            'link'         => $this->context->link
        ));

        if ($controller_name === 'AdminProducts') {
            $this->smarty->assign(array(
                'dp_products' => DynamicConfig::getActiveProducts(),
            ));
        }
    }

    public function hookActionAdminControllerSetMedia()
    {
        Media::addJsDef(array(
            'ps_module_dev'  => $this->provider->isDevMode(),
            'dp_public_path' => $this->getFolderUrl('views/js/'),
        ));

        $controller_name = $this->context->controller->controller_name;

        if ($controller_name === 'AdminProducts') {
            $this->media->addCSS(array(
                'views/css/admin/vendor.css',
                'views/css/admin/common.css',
                'views/css/admin/dp-product-config.css',
            ));

            Media::addJsDef(array(
                'dp_product_settings'     => $this->context->link->getAdminLink('DynamicProductSettings'),
                'dp_product_equations'    => $this->context->link->getAdminLink('DynamicProductEquations'),
                'dp_product_fields'       => $this->context->link->getAdminLink('DynamicProductFields'),
                'dp_fields_settings'      => $this->context->link->getAdminLink('DynamicProductFieldsSettings'),
                'dp_fields_options'       => $this->context->link->getAdminLink('DynamicProductFieldsOptions'),
                'dp_product_combinations' => $this->context->link->getAdminLink('DynamicProductCombinations'),
                'dp_product_visibility'   => $this->context->link->getAdminLink('DynamicProductVisibility'),
                'dp_product_proportions'  => $this->context->link->getAdminLink('DynamicProductProportions'),
                'dp_product_conditions'   => $this->context->link->getAdminLink('DynamicProductConditions'),
                'dp_product_field_formulas'   => $this->context->link->getAdminLink('DynamicProductFieldFormulas'),
                'dp_dir'                  => $this->getUrl(),
                'dp_langs'                => $this->languages,
                'dp_products'             => DynamicConfig::getActiveProducts(),
                'dp_logo_url'             => $this->getUrl() . 'logo.png'
            ));

            $source = $this->name;
            Media::addJsDef(array(
                'dp_message' => array(
                    'loading'      => $this->l('Loading...', $source),
                    'success'      => $this->l('Data saved', $source),
                    'error'        => $this->l('An error occurred', $source),
                    'confirm'      => $this->l('Are you sure you want to delete this item?', $source),
                    'erase'        => $this->l('You will lose any unsaved changes to this formula, continue?', $source),
                    'delete_image' => $this->l('Are you sure you want to delete this image?', $source),
                    'close'        => $this->l('You will lose any unsaved changes, continue?', $source),
                    'invalid'      => $this->l('The formula is invalid', $source),
                    'unavailable'  => $this->l('This field does not exist! Double click to remove it.', $source),
                    'empty'        => $this->l('Some values were not filled, continue?', $source),

                    'no_product'    => $this->l('Please select a product first.', $source),
                    'warn_config'   => $this->l('The current configuration will be overwritten, continue?', $source),
                    'loaded_config' => $this->l('The configuration was loaded successfully', $source),

                    'no_category'      => $this->l('Please select a category first.', $source),
                    'warn_copy_config' => $this->l(
                        'Overwrite the configuration of all products of the selected category?',
                        $source
                    ),
                    'copied_config'    => $this->l('The configuration was copied successfully', $source),

                    'no_field'          => $this->l('Please select a field first.', $source),
                    'field_settings'    => $this->l('Field Settings', $source),
                    'condition_formula' => $this->l('Condition formula', $source),
                    'field_formula' => $this->l('Field formula', $source),
                )
            ));

            $this->context->controller->addJqueryPlugin('tablednd');
            $this->context->controller->addJqueryUI('ui.tabs');
            $this->context->controller->addJqueryUI('ui.sortable');

            $this->media->addJS(array(
                'views/js/plugins/colorpicker/colorpicker.js',
                'views/js/plugins/form/jquery.form.js',
                'views/js/plugins/lang/jquery.dp_lang.js',

                'views/js/admin/vendor.js',
                'views/js/admin/common.js',
                'views/js/admin/dp-product-config.js',
                'views/js/admin/dp-products-list.js',

                'views/js/plugins/chosen/chosen.jquery.min.js',
                'views/js/plugins/notify/notify.js'
            ));
        }

        if ($controller_name === 'AdminOrders') {
            $this->media->addCSS(array(
                'views/css/admin/vendor.css',
                'views/css/admin/common.css',
                'views/css/admin/dp-order-summary.css'
            ));
            $this->media->addJS(array(
                'views/js/admin/vendor.js',
                'views/js/admin/common.js',
                'views/js/admin/dp-order-summary.js'
            ));
        }
    }

    public function hookDisplayBackOfficeFooter()
    {
        // avoid conflict with isotope
        if (Module::isEnabled('jscomposer')) {
            return $this->display(__FILE__, 'views/templates/hook/display-back-office-footer.tpl');
        }
    }

    public function hookDisplayAdminProductsExtra($params)
    {
        $id_product = isset($params['id_product']) ? (int)$params['id_product'] : 0;
        $id_product = $id_product ?: Tools::getValue('id_product');

        if (!$id_product) {
            return $this->displayConfirmation(
                $this->l('You will be able to configure the module for this product after saving it.')
            );
        }

        $id_lang = $this->context->language->id;

        //get product combinations
        $combinations = $this->provider->getProductCombinations($id_product);
        $visibility_values = false;
        if (is_array($combinations) && count($combinations)) {
            $visibility_values = $this->provider->getVisibilityValues($id_product);
        }

        $combination_values = DynamicCombinationValue::getValuesByIdProduct($id_product);
        $combination_values = DynamicCombinationValue::organizeByAttributesAndFields($combination_values);

        $this->smarty->assign(array(
            'currency'              => $this->context->currency,
            'dp_fields'             => DynamicField::getFieldsByIdProduct($id_product),
            'dp_features'           => ProductHelper::getProductFeatureFields($id_product),
            'dp_attributes'         => ProductHelper::getProductAttributeFields($id_product),
            'dp_field_types'        => $this->field_types,
            'dp_units'              => DynamicUnit::getAll($id_lang),
            'dp_languages'          => $this->languages,
            'id_lang'               => $id_lang,
            'dp_product_link'       => $this->provider->getProductLink($id_product),
            'dp_module_link'        => $this->context->link->getAdminLink('AdminModules') . '&configure=' . $this->name,
            'dp_config'             => new DynamicConfig($id_product),
            'dp_equations'          => DynamicEquation::getEquationsByIdProduct($id_product),
            'dp_combinations'       => $combinations,
            'dp_combination_values' => $combination_values,
            'dp_visibility'         => $visibility_values,
            'dp_proportions'        => DynamicProportion::getByProduct($id_product),
            'dp_conditions'         => DynamicCondition::getByProduct($id_product),
            'dp_field_formulas'     => FieldFormula::getByProduct($id_product),
            'dp_products'           => DynamicConfig::getActiveProductsWithLabels($id_lang),
            'dp_categories'         => Category::getSimpleCategories($id_lang),
            'dp_favorite_fields'    => DynamicField::getFavoriteFields($id_lang),
            'dp_common_fields'      => DynamicField::getCommonFields($id_lang),
            'dp_product'            => $id_product
        ));
        return $this->display(__FILE__, 'views/templates/admin/hook/display-admin-products-extra.tpl');
    }

    public function hookActionCartSave()
    {
        $this->calculator->emptyCache();

        if (!Validate::isLoadedObject($this->context->cart)) {
            return;
        }

        $id_cart = $this->context->cart->id;
        $where = '';
        $id_guest = $this->context->cookie->id_guest;
        $id_customer = $this->context->cookie->id_customer;

        if ($id_customer && $id_guest) {
            $where = 'AND (id_customer = ' . (int)$id_customer . ' OR id_guest = ' . (int)$id_guest . ')';
        } elseif ($id_customer) {
            $where = 'AND id_customer = ' . (int)$id_customer;
        } elseif ($id_guest) {
            $where = 'AND id_guest = ' . (int)$id_guest;
        }

        if (!empty($where)) {
            $sql = 'UPDATE `' . _DB_PREFIX_ . $this->name . '_input` 
            SET `id_cart` = ' . (int)$id_cart . ' WHERE `id_cart` = 0 ' . pSQL($where);
            Db::getInstance()->execute($sql);
        }
    }

    public function hookCartDuplicated($params)
    {
        $id_cart_old = $params['id_cart_old'];
        $id_cart_new = $params['id_cart_new'];
        $this->handler->duplicateInputs($id_cart_old, $id_cart_new);
        Hook::exec('actionCartSave');
    }

    public function hookDisplayInputSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/input-options.tpl');
    }

    public function hookDisplayTextSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/text-options.tpl');
    }

    public function hookDisplayTextAreaSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/textarea-options.tpl');
    }

    public function hookDisplayFeatureSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/feature-options.tpl');
    }

    public function hookDisplayImageSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/image-options.tpl');
    }

    public function hookDisplayFileSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field),
            'is_demo_mode' => DynamicTools::isDemoMode()
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/file-options.tpl');
    }

    public function hookDisplayDateSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/date-options.tpl');
    }

    public function hookDisplayCheckboxSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/checkbox-options.tpl');
    }

    public function hookDisplayDropdownSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));
        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/dropdown-options.tpl');
    }

    public function hookDisplayRadioSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));
        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/radio-options.tpl');
    }

    public function hookDisplayThumbnailsSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));
        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/thumbnails-options.tpl');
    }

    public function hookDisplaySliderSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/slider-options.tpl');
    }

    public function hookDisplayColorPickerSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/colorpicker-options.tpl');
    }

    public function hookDisplayHtmlSettings($id_field)
    {
        $this->smarty->assign(array(
            'dp_languages' => $this->languages,
            'field'        => DynamicFieldFactory::create(0, $id_field)
        ));

        return $this->display(__FILE__, 'views/templates/hook/admin-tooltip/html-options.tpl');
    }

    public function hookDisplayFieldsList($id_product)
    {
        $id_lang = $this->context->language->id;

        $this->context->smarty->assign(array(
            'id_product'     => (int)$id_product,
            'currency'       => $this->context->currency,
            'dp_fields'      => DynamicField::getFieldsByIdProduct($id_product),
            'dp_field_types' => $this->field_types,
            'dp_units'       => DynamicUnit::getAll($id_lang),
        ));
        return $this->display(__FILE__, 'views/templates/admin/hook/extra/fields/list.tpl');
    }

    public function hookDisplayCombinationsList($id_product)
    {
        //get product combinations
        $combinations = $this->provider->getProductCombinations($id_product);

        $combination_values = DynamicCombinationValue::getValuesByIdProduct($id_product);
        $combination_values = DynamicCombinationValue::organizeByAttributesAndFields($combination_values);

        $this->context->smarty->assign(array(
            'id_product'            => (int)$id_product,
            'currency'              => $this->context->currency,
            'dp_combinations'       => $combinations,
            'dp_combination_values' => $combination_values,
            'dp_fields'             => DynamicField::getFieldsByIdProduct($id_product)
        ));
        return $this->display(__FILE__, 'views/templates/admin/hook/extra/combinations/list.tpl');
    }

    public function hookDisplayVisibilityList($id_product)
    {
        //get product combinations
        $combinations = $this->provider->getProductCombinations($id_product);
        $visibility_values = false;
        if (is_array($combinations) && count($combinations)) {
            $visibility_values = $this->provider->getVisibilityValues($id_product);
        }

        $this->context->smarty->assign(array(
            'id_product'      => (int)$id_product,
            'dp_visibility'   => $visibility_values,
            'dp_combinations' => $combinations,
            'dp_fields'       => DynamicField::getFieldsByIdProduct($id_product)
        ));
        return $this->display(__FILE__, 'views/templates/admin/hook/extra/visibility/list.tpl');
    }

    public function hookDisplayProportionsList($id_product)
    {
        $this->context->smarty->assign(array(
            'dp_proportions' => DynamicProportion::getByProduct($id_product),
            'dp_fields'      => DynamicField::getFieldsByIdProduct($id_product)
        ));
        return $this->display(__FILE__, 'views/templates/admin/hook/extra/proportions/list.tpl');
    }

    public function hookDisplayConditionsList($id_product)
    {
        $this->context->smarty->assign(array(
            'dp_conditions' => DynamicCondition::getByProduct($id_product),
            'dp_fields'     => DynamicField::getFieldsByIdProduct($id_product)
        ));
        return $this->display(__FILE__, 'views/templates/admin/hook/extra/conditions/list.tpl');
    }

    public function hookDisplayFieldFormulasList($id_product)
    {
        $this->context->smarty->assign(array(
            'dp_field_formulas' => FieldFormula::getByProduct($id_product),
            'dp_fields'         => DynamicField::getFieldsByIdProduct($id_product)
        ));
        return $this->display(__FILE__, 'views/templates/admin/hook/extra/field_formulas/list.tpl');
    }

    public function hookReloadTab($id_product)
    {
        $params = array('id_product' => (int)$id_product);
        return $this->hookDisplayAdminProductsExtra($params);
    }

    public function hookDisplayInputSummary($id_input)
    {
        $input = new DynamicInput($id_input, $this->context->language->id);
        $controller = Tools::getValue('controller');
        if ($controller === 'validation') {
            $input->price = $this->calculator->applyTax($input->price, false, false, $input->id_product);
        }
        $this->context->smarty->assign(array(
            'input'  => $input,
            'is_pdf' => $controller === 'pdfinvoice',
        ));
        return $this->display(__FILE__, 'views/templates/hook/display-input-summary.tpl');
    }

    public function hookDisplayAdminInputSummary($id_input)
    {
        $input = new DynamicInput($id_input, (int)$this->context->language->id);
        if (Tools::getValue('controller') === 'validation') {
            $input->price = $this->calculator->applyTax($input->price, false, false, $input->id_product);
        }
        $this->context->smarty->assign(array(
            'is_pdf' => Tools::getValue('controller') === 'AdminPdf',
            'is_admin' => true,
            'input'  => $input,
        ));
        return $this->display(__FILE__, 'views/templates/hook/display-admin-input-summary.tpl');
    }

    public function hookActionProductAdd($params)
    {
        if (Tools::getIsset('duplicateproduct')) {
            $id_product_old = (int)Tools::getValue('id_product');
            $id_product_new = (int)$params['id_product'];
            $this->handler->copyConfig($id_product_new, $id_product_old, true);
        }
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayUpdateUnit()
    {
        $id_lang = $this->context->language->id;
        $id_unit = (int)Tools::getValue('id_unit');
        $unit = new DynamicUnit($id_unit);

        $this->context->smarty->assign(array(
            'new'          => 0,
            'urlhash'      => '#dp_units_form',
            'unit'         => $unit,
            'current_unit' => new DynamicUnit($id_unit, $id_lang),
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/units/unit-form.tpl');
    }

    /** @noinspection PhpUnusedPrivateMethodInspection */
    private function displayAddUnit()
    {
        $this->context->smarty->assign(array(
            'new'     => 1,
            'urlhash' => '#units_form',
        ));
        $this->html_content .= $this->display(__FILE__, 'views/templates/admin/units/unit-form.tpl');
    }
}
