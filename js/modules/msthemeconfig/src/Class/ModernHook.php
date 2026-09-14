<?php
/** @noinspection ALL */
declare(strict_types=1);

namespace MsThemeConfig\Class;

use Address;
use AppKernel;
use Carrier;
use Cart;
use CartRule;
use Category;
use Configuration;
use Contact;
use Context;
use Currency;
use Customer;
use Db;
use Dispatcher;
use Exception;
use Feature;
use FeatureValue;
use FormField;
use Mail;
use Module;
use Cache;
use MsThemeConfig\Analytics\Ga4RefundDispatcher;
use MsThemeConfig\Analytics\Ga4RefundStore;
use MsThemeConfig\Analytics\Ga4RefundTransport;
use MsThemeConfig\Category\CategoryRelationRepository;
use MsThemeConfig\Controller\Admin\DmsAdminOrderController;
use MsThemeConfig\Controller\Admin\DmsMailThemeController;
use MsThemeConfig\Form\CategoryDescriptionConstraints;
use MsThemeConfig\Form\CategoryRelationsForm;
use MsThemeConfig\Grid\Action\Type\PreviewRowAction;
use MsThemeConfig\Grid\Action\Type\ShippingStateAction;
use MsThemeConfig\Grid\Column\Type\ShopFaviconColumn;
use MsThemeConfig\Grid\Column\ButtonColumn;
use MsThemeConfig\Grid\Column\LabelButtonColumn;
use Order;
use OrderDetail;
use OrderSlip;
use OrderState;
use Pack;
use PDFCore;
use PrestaShop\PrestaShop\Adapter\MailTemplate\MailPreviewVariablesBuilder;
use PrestaShopBundle\Form\Admin\Type\FormattedTextareaType;
use PrestaShopBundle\Form\Admin\Type\TranslatableType;
use PrestaShopBundle\Form\Admin\Type\TranslateType;
use PrestaShopDatabaseException;
use PrestaShopException;
use PrestaShopLogger;
use PrestaShop\PrestaShop\Core\ConstraintValidator\Constraints\CleanHtml;
use PrestaShop\PrestaShop\Core\Exception\FileNotFoundException;
use PrestaShop\PrestaShop\Core\Exception\TypeException;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnInterface;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\PreviewColumn;
use PrestaShop\PrestaShop\Core\Grid\Definition\GridDefinitionInterface;
use PrestaShop\PrestaShop\Core\Grid\Exception\ColumnNotFoundException;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Localization\Exception\LocalizationException;
use PrestaShop\PrestaShop\Core\MailTemplate\FolderThemeScanner;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCollectionInterface;
use Product;
use StockAvailable;
use SmartyException;
use SpecificPrice;
use Store;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use PrestaShopBundle\Form\Admin\Type\SwitchType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Twig\Environment as TwigEnvironment;
use Tools;
use Validate;
use Zone;
use Media;
use PrestaShop\PrestaShop\Core\Grid\Data\GridData;
use PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ToggleColumn;
use PrestaShop\PrestaShop\Core\Grid\Filter\FilterCollection;
use PrestaShopBundle\Form\Admin\Type\YesAndNoChoiceType;
use Doctrine\DBAL\Query\QueryBuilder;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\RowActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\LinkRowAction;
use Tab;
/**
 *
 * Hooks Class for all hooks within the prestashop theme configurator
 *
 */

define('MAX_PACKAGE_WEIGHT', 23);
define('VOLUME_MULTIPLIER', 250);
define('PALLET_THRESHOLD', 115);
define('MINI_PALLET_THRESHOLD', 150);
define('EURO_PALLET_THRESHOLD', 250);
define('ENVELOPE_WIDTH', 0.30);
define('ENVELOPE_LENGTH', 0.25);
define('MIN_ENVELOPE_HEIGHT', 0.005);
define('PLAAT_WIDTH', 0.50);
define('PLAAT_LENGTH', 1);
define('MIN_PLAAT_HEIGHT', 0.005);
define('METER_WIDTH', 0.20);
define('METER_LENGTH', 1);
define('MIN_METER_HEIGHT', 0.05);
define('METER_2_WIDTH', 0.25);
define('METER_2_LENGTH', 2);
define('MIN_METER_2_HEIGHT', 0.05);
define('COLLIE_WIDTH_THRESHOLD', 0.7);
define('COLLIE_HEIGHT_THRESHOLD', 0.7);


class ModernHook
{
    public $module;
    public $context;
    private $idShop;
    private $idShopGroup;
    private $idLang;
    private $shopName;
    private $currencyId;
    private $currencyCode;
    private $controller;
    private $smarty;
    private $link;
    private ?array $ssaConfig = null;
    private ?TwigEnvironment $twig;

    public const TEMPLATE_INVOICE = 'Invoice';
    public const TEMPLATE_ORDER_RETURN = 'OrderReturn';
    public const TEMPLATE_ORDER_SLIP = 'OrderSlip';
    public const TEMPLATE_DELIVERY_SLIP = 'DeliverySlip';
    public const TEMPLATE_SUPPLY_ORDER_FORM = 'SupplyOrderForm';

    /**
     * @param $module
     * @param $context
     * @param TwigEnvironment $twig
     * @throws PrestaShopException
     */
    public function __construct($module, $context, TwigEnvironment $twig = null)
    {
        $this->module = $module;
        // Handle both LegacyContext (Symfony) and standard Context (legacy)
        if ($context instanceof \PrestaShop\PrestaShop\Adapter\LegacyContext) {
            $this->context = $context->getContext();
        } else {
            $this->context = $context;
        }

        $this->twig = $twig;

        if ($this->twig !== null) {
            $this->twig->addGlobal('_PS_IMG_', _PS_IMG_);
        }
        $this->controller = $this->context->controller;
        $this->idShop = $this->context->shop->id;
        $this->idShopGroup = $this->context->shop->getGroup()->id;
        $this->idLang = $this->context->language->id;
        $this->shopName = $this->context->shop->name;

        if(is_null($this->context->currency)){
            $currency = new Currency($this->idLang);
            $this->currencyId = $currency->id;
            $this->currencyCode = $currency->iso_code;
        } else {
            $this->currencyId = $this->context->currency->id;
            $this->currencyCode = $this->context->currency->iso_code;
        }
        $this->smarty = $this->context->smarty;
        $this->link = $this->context->link;
    }

    /**
     *
     * add necessary javascript and stylesheets to products back office
     *
     * @param $params
     * @return void
     */
    public function hookActionAdminControllerSetMedia($params): void
    {
            // Inject custom admin header logo CSS if configured (multistore-aware)
            try {
                $adminLogoFilename = Configuration::get('MSTHEMECONFIG_ADMIN_HEADER_LOGO', $this->idLang, $this->idShopGroup, $this->idShop);
                if (!empty($adminLogoFilename)) {
                    $logoUrl = _MODULE_DIR_ . 'msthemeconfig/views/img/' . $adminLogoFilename;
                    // Inject inline CSS to replace the header logo
                    $customCss = '
                    <style>
                        #header_logo {
                            background-image: url("' . $logoUrl . '") !important;
                            background-size: contain !important;
                            background-repeat: no-repeat !important;
                            background-position: center !important;
                            width: 200px !important;
                            height: 50px !important;
                        }
                        #header_logo img {
                            display: none !important;
                        }
                    </style>
                    ';
                    echo $customCss;
                }
            } catch (\Throwable $e) {
                // Fail silently to avoid breaking BO
            }

        // Debug logging for PS9 compatibility and asset loading on BO
        try {
            $sep = DIRECTORY_SEPARATOR;
            $logger = new \FileLogger(0);
            $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');
            $ctrlName = $this->context && $this->context->controller ? ($this->context->controller->controller_name ?? '') : '';
            $cssCount = $this->context && $this->context->controller && isset($this->context->controller->css_files) && is_array($this->context->controller->css_files)
                ? count($this->context->controller->css_files) : -1;
            $logger->logInfo('[msthemeconfig] hookActionAdminControllerSetMedia controller=' . $ctrlName . ' css_count_before=' . $cssCount);
        } catch (\Throwable $e) { /* ignore */ }

        // Ensure MsThemeConfig Tab has required route params to avoid BO navbar exception
        $this->ensureMsTabRouteParams();

        // Detect our module configure page for both legacy and Symfony routes
        $isModuleConfigure = false;
        $moduleName = $this->module->name;

        // 1. Legacy URL: index.php?controller=AdminModules&configure=msthemeconfig
        if (Tools::getValue('configure') === $moduleName || Tools::getValue('module_name') === $moduleName) {
            $isModuleConfigure = true;
        }

        // 2. Symfony route: /improve/modules/manage/action/configure/msthemeconfig
        if (!$isModuleConfigure) {
            $uri = $_SERVER['REQUEST_URI'] ?? '';
            if (str_contains($uri, '/configure/' . $moduleName) || str_contains($uri, 'configure=' . $moduleName)) {
                $isModuleConfigure = true;
            }
        }

        // 3. Symfony request attributes (module_name as route parameter)
        if (!$isModuleConfigure) {
            try {
                $requestStack = $this->module->get('request_stack');
                if ($requestStack) {
                    $request = $requestStack->getCurrentRequest();
                    if ($request) {
                        $reqModule = $request->attributes->get('module_name')
                            ?? $request->get('module_name')
                            ?? $request->attributes->get('module')
                            ?? $request->get('module');
                        if ($reqModule === $moduleName) {
                            $isModuleConfigure = true;
                        }
                    }
                }
            } catch (\Throwable $e) {
                // ignore
            }
        }

        if ($isModuleConfigure) {
            $this->context->controller->addCSS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/jquery-ui/themes/base/theme.css');
            $this->context->controller->addCSS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/jquery-ui/themes/base/datepicker.css');
            $this->context->controller->addCSS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/jquery-ui-multidatespicker/jquery-ui.multidatespicker.css');
            $this->context->controller->addCSS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/select2/dist/css/select2.min.css');
            $this->context->controller->addCss(_MODULE_DIR_ . '/' . $this->module->name . '/views/css/msthemeconfig.css', 'all');

            $this->context->controller->addJqueryUI('ui.sortable');
            $this->context->controller->addJqueryUI('ui.datepicker');
            // Only module-local JS; avoid hardcoded admin-dev assets which can break BO styling
            $this->context->controller->addJS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/jquery-ui-multidatespicker/jquery-ui.multidatespicker.js');
            $this->context->controller->addJS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/select2/dist/js/select2.full.js');
            $this->context->controller->addJs(_MODULE_DIR_ . '/' . $this->module->name . '/views/js/msthemeconfig.js');

            // Ensure TinyMCE is available and initialized for autoload_rte fields on the configure page
            $this->context->controller->addJS(__PS_BASE_URI__ . 'js/tiny_mce/tiny_mce.js'); // TinyMCE core
            $this->context->controller->addJS(__PS_BASE_URI__ . 'js/admin/tinymce.inc.js'); // Defines tinySetup
            $this->context->controller->addJS(__PS_BASE_URI__ . 'js/admin/tinymce_loader.js'); // Initializes editors
        }

        // PrestaShop selects the matching legacy or Symfony theme assets.
        // Mixing both themes on the dashboard overrides its legacy layout styles.
        $adminBase = __PS_BASE_URI__ . basename(_PS_ADMIN_DIR_);
        if ($this->controller && $this->controller->controller_name == 'AdminOfferController' || $this->controller->controller_name == 'AdminOffer') {
            $this->controller->addCSS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/select2/dist/css/select2.min.css');
            $this->controller->addJS(_MODULE_DIR_ . '/' . $this->module->name . '/node_modules/select2/dist/js/select2.full.min.js');
            $this->controller->addCSS($adminBase . '/themes/new-theme/public/msthemeconfig_offergrid.css');
            $this->controller->addJS($adminBase . '/themes/new-theme/public/msthemeconfig_offergrid.bundle.js');

            // Removed hardcoded /admin-dev bundle injection to prevent conflicts
        }

        if ($this->controller && $this->controller->controller_name == 'AdminModules' && Tools::getValue('configure') == 'offerrow') {
            $this->context->controller->addJquery();
            $this->context->controller->addJS(_MODULE_DIR_ . '/' . $this->module->name . '/views/templates/admin/js/oi_admin.js');
        }

        if ($this->controller && $this->controller->controller_name == 'AdminOrders') {
            $this->context->controller->addCSS(_MODULE_DIR_ . '/' . $this->module->name . '/views/css/koopman-order-grid.css');
            $this->context->controller->addJS(_MODULE_DIR_ . '/' . $this->module->name . '/views/js/koopman.js');
        }

        if ($this->context->controller && $this->context->controller->controller_name == 'AdminCustomers') {
            $this->context->controller->addJS(_MODULE_DIR_ . '/' . $this->module->name . '/views/js/customer.js');
        }

        if ($this->context->controller && $this->context->controller->controller_name == 'AdminCategories') {
            $this->context->controller->addJS(_MODULE_DIR_ . $this->module->name . '/views/js/category-relations.js');
        }
    }

    // Ensure Tab params and parents early to avoid BO navbar exceptions
    private function ensureMsTabRouteParams(): void
    {
        try {
            $log = new \FileLogger(0);
            $log->setFilename(_PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'var' . DIRECTORY_SEPARATOR . 'logs' . DIRECTORY_SEPARATOR . 'MsThemeConfig.log');

            // Ensure required back-office Tabs exist so Link::getAdminLink() works for our controllers
            // Key = class_name, Value = parent class_name
            // Place our module menu under CONFIGURE heading as a dropdown with three children
            $allowedTabs = [
                'AdminModerneSmidParent' => 'CONFIGURE',
                'MsAdminThemeConf' => 'AdminModerneSmidParent',
                'MsAdminAIDescriptions' => 'AdminModerneSmidParent',
                'MsAdminAICategories' => 'AdminModerneSmidParent',
                'MsAdminAICms' => 'AdminModerneSmidParent',
                'MsAdminCatalogBackup' => 'AdminModerneSmidParent',
                'MsAdminCertificateAuth' => 'AdminModerneSmidParent',
                // Offer management remains under Orders section
                'AdminOfferController' => 'AdminParentOrders',
            ];

            foreach ($allowedTabs as $className => $parentClass) {
                $tabId = (int)\Tab::getIdFromClassName($className);
                if ($tabId <= 0) {
                    // Create tab if missing (only for our own module classes)
                    $tab = new \Tab();
                    $tab->active = 1;
                    $tab->class_name = $className;
                    $tab->module = $this->module->name;
                    $tab->name = [];
                    foreach (\Language::getLanguages(false) as $lang) {
                        $iso = isset($lang['iso_code']) ? strtolower($lang['iso_code']) : '';
                        if ($className === 'MsAdminThemeConf') {
                            $label = ($iso === 'nl') ? 'ModerneSmid Configurator' : 'ModerneSmid Configurator';
                        } elseif ($className === 'AdminOfferController') {
                            $label = ($iso === 'nl') ? 'Offerte beheer' : 'Offer management';
                        } elseif ($className === 'MsAdminAIDescriptions') {
                            $label = ($iso === 'nl') ? 'AI productomschrijvingen' : 'AI product descriptions';
                            $tab->active = 0;
                        } else {
                            $label = $className;
                        }
                        $tab->name[(int)$lang['id_lang']] = $label;
                    }
                    // Resolve parent id; support CONFIGURE pseudo-root used by PS headings
                    $pid = (int)\Tab::getIdFromClassName($parentClass);
                    if ($pid <= 0 && $parentClass === 'CONFIGURE') {
                        // Fallback to a Configure section tab if the pseudo-root is not present in this PS version
                        $pid = (int)\Tab::getIdFromClassName('AdminAdvancedParameters');
                    }
                    $tab->id_parent = $pid > 0 ? $pid : 0;
                    if ($className === 'MsAdminThemeConf') {
                        // Do not set a Symfony route for this legacy controller; let PrestaShop generate legacy URL
                        if (property_exists($tab, 'route_name')) {
                            $tab->route_name = '';
                        }
                        if (property_exists($tab, 'route_params')) {
                            $tab->route_params = null;
                        }
                        // Ensure wording fields exist for BO label and translations
                        if (property_exists($tab, 'wording')) {
                            $tab->wording = 'Moderne Smid Thema Conf';
                        }
                        if (property_exists($tab, 'wording_domain')) {
                            $tab->wording_domain = 'Modules.MsThemeConfig.Module';
                        }
                    }
                    if ($className === 'AdminOfferController') {
                        // ensure offer tab has its Symfony route set
                        if (property_exists($tab, 'route_name')) {
                            $tab->route_name = 'offerintegration_index';
                        }
                        if (property_exists($tab, 'wording')) {
                            $tab->wording = 'Offerte aanmaken';
                        }
                        if (property_exists($tab, 'wording_domain')) {
                            $tab->wording_domain = 'Modules.MsThemeConfig.Module';
                        }
                    }
                    if ($className === 'MsAdminAIDescriptions') {
                        // Legacy controller, no symfony route
                        if (property_exists($tab, 'route_name')) {
                            $tab->route_name = '';
                        }
                        if (property_exists($tab, 'route_params')) {
                            $tab->route_params = null;
                        }
                        // Prefer to hide from main menu if supported by PS version
                        if (property_exists($tab, 'visible')) {
                            $tab->visible = false;
                        }
                        if (property_exists($tab, 'wording')) {
                            $tab->wording = 'AI productomschrijvingen';
                        }
                        if (property_exists($tab, 'wording_domain')) {
                            $tab->wording_domain = 'Modules.MsThemeConfig.Module';
                        }
                    }
                    if ($tab->add()) {
                        $log->logInfo('[msthemeconfig] Created missing Tab ' . $className . ' with parent ' . $parentClass);
                    }
                    continue;
                }

                $tab = new \Tab($tabId);
                $needsSave = false;

                // Ensure correct parent
                $expectedParentId = (int)\Tab::getIdFromClassName($parentClass) ?: 0;
                if ($expectedParentId > 0 && (int)$tab->id_parent !== $expectedParentId) {
                    $tab->id_parent = $expectedParentId;
                    $needsSave = true;
                }

                // Only the MsAdminThemeConf tab needs configure/redirect handling
                if ($className === 'MsAdminThemeConf') {
                    // Clear any invalid Symfony route to let PrestaShop use legacy URL for this controller
                    if (!empty($tab->route_name)) {
                        $tab->route_name = '';
                        $needsSave = true;
                    }
                    if (!empty($tab->route_params)) {
                        $tab->route_params = null;
                        $needsSave = true;
                    }

                    // Enforce wording fields
                    $wordingChanged = false;
                    if (property_exists($tab, 'wording') && $tab->wording !== 'Moderne Smid Thema Conf') {
                        $tab->wording = 'Moderne Smid Thema Conf';
                        $wordingChanged = true;
                    }
                    if (property_exists($tab, 'wording_domain') && $tab->wording_domain !== 'Modules.MsThemeConfig.Module') {
                        $tab->wording_domain = 'Modules.MsThemeConfig.Module';
                        $wordingChanged = true;
                    }
                    if ($wordingChanged) {
                        $needsSave = true;
                    }
                }

                // Ensure Offer tab has the correct route
                if ($className === 'AdminOfferController') {
                    if ($tab->route_name !== 'offerintegration_index') {
                        $tab->route_name = 'offerintegration_index';
                        $needsSave = true;
                    }
                    // Enforce wording fields for Offer tab
                    $offerWordingChanged = false;
                    if (property_exists($tab, 'wording') && $tab->wording !== 'Offerte aanmaken') {
                        $tab->wording = 'Offerte aanmaken';
                        $offerWordingChanged = true;
                    }
                    if (property_exists($tab, 'wording_domain') && $tab->wording_domain !== 'Modules.MsThemeConfig.Module') {
                        $tab->wording_domain = 'Modules.MsThemeConfig.Module';
                        $offerWordingChanged = true;
                    }
                    if ($offerWordingChanged) {
                        $needsSave = true;
                    }
                }

                // Ensure human-friendly tab names instead of class names
                $namesChanged = false;
                $languages = \Language::getLanguages(false);
                foreach ($languages as $lang) {
                    $idLang = (int)$lang['id_lang'];
                    $current = is_array($tab->name) && isset($tab->name[$idLang]) ? $tab->name[$idLang] : '';
                    $iso = isset($lang['iso_code']) ? strtolower($lang['iso_code']) : '';
                    if ($className === 'MsAdminThemeConf') {
                        $label = ($iso === 'nl') ? 'ModerneSmid Configurator' : 'ModerneSmid Configurator';
                    } elseif ($className === 'AdminOfferController') {
                        $label = ($iso === 'nl') ? 'Offerte beheer' : 'Offer management';
                    } else {
                        $label = $current ?: $className;
                    }
                    if ($current === $className || $current === '' || $current === null) {
                        if (!is_array($tab->name)) { $tab->name = []; }
                        $tab->name[$idLang] = $label;
                        $namesChanged = true;
                    }
                }
                if ($namesChanged) { $needsSave = true; }

                if ($needsSave) {
                    $tab->save();
                    // Re-read after save to ensure legacy URL is preserved for MsAdminThemeConf
                    if ($className === 'MsAdminThemeConf') {
                        $check = new \Tab($tab->id);
                        if (!empty($check->route_name) || !empty($check->route_params)) {
                            $check->route_name = '';
                            $check->route_params = null;
                            $check->save();
                        }
                    }
                    $log->logInfo('[msthemeconfig] Ensured Tab integrity for ' . $className . ' (parent, route params)');
                }
            }

            // Deactivate any other tabs registered by this module to keep side menu clean
            $allTabs = \Tab::getTabs((int)\Context::getContext()->language->id);
            $allowedClassNames = array_keys($allowedTabs);
            foreach ($allTabs as $t) {
                if (!isset($t['class_name'])) {
                    continue;
                }
                $class = $t['class_name'];
                if (in_array($class, $allowedClassNames, true)) {
                    continue;
                }
                // Only affect tabs belonging to this module
                $tabId = (int)\Tab::getIdFromClassName($class);
                if ($tabId > 0) {
                    $tabObj = new \Tab($tabId);
                    if (isset($tabObj->module) && $tabObj->module === $this->module->name) {
                        if ((int)$tabObj->active !== 0) {
                            $tabObj->active = 0; // hide from side menu
                            $tabObj->save();
                            $log->logInfo('[msthemeconfig] Deactivated extra Tab ' . $class . ' to comply with menu rules');
                        }
                    }
                }
            }
        } catch (\Throwable $e) {
            // ignore
        }
    }

    /**
     * Hook Homepage
     *
     * Show categorie jsonld on homepage
     *
     * @return string
     */
    public function hookDisplayHome(): string
    {
        $cacheId = 'ModernHook::hookDisplayHome_' . (int)$this->idLang . '_' . (int)$this->idShop;
        if (Cache::isStored($cacheId)) {
            return Cache::retrieve($cacheId);
        }

        $selectedCats = explode(',', (string)Configuration::get('MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES', $this->idLang, $this->idShop, $this->idShopGroup));
        $itemList = [];

        $position = 0;
        foreach ($selectedCats as $catId){
            $subCat = new Category($catId);
            $itemList[] =  $this->createCategoryJSONLD($subCat, false, true, $position);
            $position++;
        }

        $cat = new Category(2);

        $catDescription = '';
        if (isset($cat->top_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->top_description[$this->idLang]));
        }

        if (isset($cat->additional_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->additional_description[$this->idLang]));
        } elseif(isset($cat->description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->description[$this->idLang]));
        }

        $alternateName = '';
        if(isset($cat->second_name[$this->idLang])){
            $alternateName = $cat->second_name[$this->idLang];
        }


        $jsonLDCategory = [
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'url' => $this->link->getCategoryLink($cat->id),
            'numberOfItems' => count($itemList),
            'name' => $cat->name[$this->idLang],
            'alternateName' => $alternateName,
            'description' => $catDescription,
            'itemListElement' => $itemList
        ];

        $homeList = json_encode($jsonLDCategory, JSON_UNESCAPED_SLASHES);

        $result = '<script type="application/ld+json">'.$homeList.'</script>';
        Cache::store($cacheId, $result);

        return $result;
    }

    /**
     *
     * Hook to modify OrderConfirmation
     *
     * @param $params
     * @return void
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function hookDisplayOrderConfirmation($params): void
    {

        if (isset($params['order'])) {
            $idOrder = $params['order']->id;
            $idCart = $params['order']->id_cart;
            $orderObject = new Order($idOrder);
            $cartObject = new Cart($idCart);

            $cartRules = $cartObject->getCartRules();
            $total_discount = $cartObject->getOrderTotal(true, Cart::ONLY_DISCOUNTS, $orderObject->getCartProducts());
            $total_discount_tax_exc = $cartObject->getOrderTotal(false, Cart::ONLY_DISCOUNTS, $orderObject->getCartProducts());
            $total_discount_no_calc = $cartObject->getOrderTotal(true, Cart::ONLY_DISCOUNTS_NO_CALCULATION, $orderObject->getCartProducts());
            $total_discount_no_calc_tax_exc = $cartObject->getOrderTotal(false, Cart::ONLY_DISCOUNTS_NO_CALCULATION, $orderObject->getCartProducts());
            $total_remainder = $cartObject->getOrderTotal(true, Cart::ONLY_REMAINDER_OF_DISCOUNTS, $orderObject->getCartProducts());
            $total_remainder_tax_exc = $cartObject->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS, $orderObject->getCartProducts());

            $shipping = $orderObject->getShipping();
            $this->smarty->assign([
                'total_discount' => $total_discount,
                'total_discount_tax_exc' => $total_discount_tax_exc,
                'total_discount_no_calc' => $total_discount_no_calc,
                'total_discount_no_calc_tax_exc' => $total_discount_no_calc_tax_exc,
                'total_remainder' => $total_remainder,
                'total_remainder_tax_exc' => $total_remainder_tax_exc,
                'cart_rules' => $cartRules,
            ]);

        }
    }
    /**
     *
     * Hook to modify the delivery slip
     *
     * @param $hookArgs
     * @return void
     */
    public function hookDisplayPDFDeliverySlip($hookArgs): void
    {
        try {
            $order = new Order($hookArgs['object']->id_order);
            $hookArgs['object']->added_to_order = $order->added_to_order;
            $hookArgs['object']->desired_delivery_date = $order->desired_delivery_date;
        } catch (\PrestaShopDatabaseException|PrestaShopException) {
        }
    }
    /**
     * Filter to modify product page content
     *
     * Add JSON LD of product to product page
     *
     * @param array $params
     * @return array
     */
    public function hookFilterProductContent(array $params): array
    {
        $productId = 0;
        if (isset($params['object'])) {
            if (is_object($params['object']) && isset($params['object']->id)) {
                $productId = (int) $params['object']->id;
            } elseif (is_array($params['object']) && isset($params['object']['id_product'])) {
                $productId = (int) $params['object']['id_product'];
            }
        }

        if ($productId <= 0) {
            return $params;
        }

        try {
            $jsonLD = $this->createProductJSONLD($productId);
            if (is_object($params['object'])) {
                $params['object']->jsonld_product_seo = json_encode($jsonLD, JSON_UNESCAPED_SLASHES);
            } else {
                $params['object']['jsonld_product_seo'] = json_encode($jsonLD, JSON_UNESCAPED_SLASHES);
            }
        } catch (\PrestaShopDatabaseException|PrestaShopException) {
        }
        try {
            $sawFeatureId = (int) $this->getSawCutConfigValue('id_feature_product_length', 0);
            $cutFeatureId = (int) $this->getSawCutConfigValue('id_feature_product_cutlength', 0);
            $enabled = false;
            if ($sawFeatureId || $cutFeatureId) {
                $features = Product::getFrontFeaturesStatic($this->idLang, $productId);
                foreach ($features as $feature) {
                    $idFeature = (int) ($feature['id_feature'] ?? 0);
                    $val = (int) ($feature['value'] ?? 0);
                    if (($sawFeatureId && $idFeature === $sawFeatureId && $val > 0)
                        || ($cutFeatureId && $idFeature === $cutFeatureId && $val > 0)) {
                        $enabled = true;
                        break;
                    }
                }
            }
            if (is_object($params['object'])) {
                $params['object']->saw_cut_enabled = $enabled;
            } else {
                $params['object']['saw_cut_enabled'] = $enabled;
            }
        } catch (\Throwable $e) {
        }
        return $params;
    }

    /**
     * Create JSON LD for products
     *
     * Some needed variables are below, these are used because google wants shortcodes
     *
     * per pakket =  PK
     * per stuk = C62
     * kg per meter = KL
     * kg per m2 = 28
     * kg = KGM
     * mm = MMT
     * m = MTR
     * m2 = MTK
     * cmt = CMT
     *
     * @param $idProduct
     * @return array
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function createProductJSONLD($idProduct): array
    {
        $product = new Product($idProduct);

        if (isset($product->description_short[$this->idLang])) {
            $description = trim(strip_tags($product->description_short[$this->idLang]));
        } elseif(isset($product->description[$this->idLang])) {
            $description = trim(strip_tags($product->description[$this->idLang]));
        } else {
            $description = "";
        }
        $images = [];
        foreach ($product->getWsImages() as $image) {
            $images[] = $this->link->getImageLink($product->link_rewrite[$this->idLang], $image['id']);
        }

        $priceValidUntil = date('Y-m-d', strtotime("+2 day"));
        $features = [];
        $weight = [
            '@context' => 'https://schema.org/',
            '@type' => 'QuantitativeValue',
            'value' => $product->weight,
            'unitCode' => 'KGM',
            'unitText' => 'Kg'
        ];
        $width = [];
        $height = [];
        $depth = [];
        $material = '';
        $color = '';
        $additionalProperty = [];

        foreach ($product->getFeatures() as $feature) {
            $feat = new Feature($feature['id_feature']);
            $featVal = new FeatureValue($feature['id_feature_value']);

            switch ($feature['id_feature']) {
                case Configuration::get('MSTHEMECONFIG_FEATURE_LENGTH', $this->idLang, $this->idShop, $this->idShopGroup):
                    $depth = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_WIDTH', $this->idLang, $this->idShop, $this->idShopGroup):
                    $width = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_HEIGHT', $this->idLang, $this->idShop, $this->idShopGroup):
                    $height = ['@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_WEIGHT', $this->idLang, $this->idShop, $this->idShopGroup):
                    $weight = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'KGM',
                        'unitText' => 'Kg'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_MATERIAL', $this->idLang, $this->idShop, $this->idShopGroup):
                    $material = $this->checkFeatVal($featVal->value, $this->idLang);
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_COLOR', $this->idLang, $this->idShop, $this->idShopGroup):
                    $color = $this->checkFeatVal($featVal->value, $this->idLang);
                    break;
                default:
                    if (str_contains($this->checkFeatVal($featVal->value, $this->idLang), 'mm')) {
                        $additionalProperty[] = [
                            '@context' => 'https://schema.org/',
                            '@type' => 'PropertyValue',
                            'name' => $feat->name[$this->idLang],
                            'value' => str_replace('mm', '', $this->checkFeatVal($featVal->value, $this->idLang)),
                            'unitCode' => 'MMT',
                            'unitText' => 'mm'
                        ];
                    } else {
                        $additionalProperty[] = [
                            '@context' => 'https://schema.org/',
                            '@type' => 'PropertyValue',
                            'name' => $feat->name[$this->idLang],
                            'value' => $this->checkFeatVal($featVal->value, $this->idLang)
                        ];
                    }
                    break;
            }
        }

        $specificPrices = SpecificPrice::getByProductId((int)$product->id);
        $priceSpecification = [];
        $price = $product->getPrice();

        if (empty($specificPrices)) {
            $priceSpecification[] = [
                '@context' => 'https://schema.org/',
                '@type' => 'UnitPriceSpecification',
                'priceType' => 'https://schema.org/SalePrice',
                'price' => round($price, 2),
                'priceCurrency' => 'EUR',
                'valueAddedTaxIncluded' => true,
                'billingIncrement' => 1,
                'unitCode' => 'C62',
                'eligibleQuantity' => [
                    '@type' => 'QuantitativeValue',
                    'minValue' => 1,
                    'unitCode' => 'C62'
                ]
            ];
        } else {
            $priceSpecification[] = [
                '@context' => 'https://schema.org/',
                '@type' => 'UnitPriceSpecification',
                'priceType' => 'https://schema.org/SalePrice',
                'price' => round($price, 2),
                'priceCurrency' => 'EUR',
                'valueAddedTaxIncluded' => true,
                'billingIncrement' => 1,
                'unitCode' => 'C62',
                'eligibleQuantity' => [
                    '@type' => 'QuantitativeValue',
                    'minValue' => 1,
                    'maxValue' => (int)$specificPrices[0]['from_quantity'] - 1,
                    'unitCode' => 'C62'
                ]
            ];
        }

        foreach ($specificPrices as $key => $item) {
            if (array_key_exists($key + 1, $specificPrices)) {
                $priceSpecification[] = [
                    '@context' => 'https://schema.org/',
                    '@type' => 'UnitPriceSpecification',
                    'priceType' => 'https://schema.org/SalePrice',
                    'price' => Product::getPriceStatic($product->id, true, null, 2, null, false, true, (int)$item['from_quantity']),
                    'priceCurrency' => 'EUR',
                    'valueAddedTaxIncluded' => true,
                    'billingIncrement' => 1,
                    'unitCode' => 'C62',
                    'eligibleQuantity' => [
                        '@type' => 'QuantitativeValue',
                        'minValue' => (int)$item['from_quantity'],
                        'maxValue' => (int)$specificPrices[$key + 1]['from_quantity'] - 1,
                        'unitCode' => 'C62'
                    ]
                ];
            } else {
                $priceSpecification[] = [
                    '@context' => 'https://schema.org/',
                    '@type' => 'UnitPriceSpecification',
                    'priceType' => 'https://schema.org/SalePrice',
                    'price' => Product::getPriceStatic($product->id, true, null, 2, null, false, true, (int)$item['from_quantity']),
                    'priceCurrency' => 'EUR',
                    'valueAddedTaxIncluded' => true,
                    'billingIncrement' => 1,
                    'unitCode' => 'C62',
                    'eligibleQuantity' => [
                        '@type' => 'QuantitativeValue',
                        'minValue' => (int)$item['from_quantity'],
                        'unitCode' => 'C62'
                    ]
                ];
            }
        }

        $shippingCarrierId = Carrier::resolveCarrierIdFromConfig((int) Configuration::get('MSTHEMECONFIG_SHIPPING_CARRIER', $this->idLang, $this->idShop, $this->idShopGroup));
        $carrier = new Carrier($shippingCarrierId);
        $deliveryPrice = $carrier->getDeliveryPriceByPrice(5, Zone::getIdByName('Europe'), $this->currencyId);

        $availableStock = 'https://schema.org/InStock';

        $store = new Store($this->idShop, $this->idLang);

        $contacts = [];

        $contacts[] = [
            '@context' => 'https://schema.org/',
            '@type' => 'ContactPoint',
            'telephone' => Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_WHATSAPP', $this->idLang, $this->idShop, $this->idShopGroup),
            'contactType' => 'whatsapp'
        ];

        foreach (Contact::getContacts($this->idLang) as $contact) {
            $contacts[] = [
                '@context' => 'https://schema.org/',
                '@type' => 'ContactPoint',
                'telephone' => Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE', $this->idLang, $this->idShop, $this->idShopGroup),
                'email' => $contact['email'],
                'contactType' => $contact['name']
            ];
        }

        return [
            '@context' => 'https://schema.org/',
            '@type' => 'Product',
            'sku' => $this->shopName . '-' . $product->reference,
//            'gtin14' => (int)$this->shopName . '-' . $product->id,
            'image' => $images,
            'name' => $product->name[$this->idLang],
            'alternateName' => isset($product->second_name) ? $product->second_name : null,
            'description' => $description,
            'keywords' => $product->seo_keywords,
            'material' => $material,
            'color' => $color,
            'weight' => $weight,
            'depth' => $depth,
            'height' => $height,
            'width' => $width,
            'additionalProperty' => $additionalProperty,
            'brand' => ['@type' => 'Brand',
                'name' => $this->shopName
            ],
            "review" => [],
            "aggregateRating" => [
                "@type" => "AggregateRating",
                "ratingValue" => 5,
                "reviewCount" => 1
            ],
            'offers' => [
                "hasMerchantReturnPolicy" => [
                    "@type" => "MerchantReturnPolicy",
                    "applicableCountry" => "NL",
                    "returnPolicyCategory" => "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays" => 30,
                    "returnMethod" => "https://schema.org/ReturnByMail",
                    "returnShippingFeesAmount" => [
                        '@type' => 'MonetaryAmount',
                        'minValue' => '10',
                        'maxValue' => '250',
                        'value' => '35',
                        'currency' => 'EUR'
                    ],
                ],
                '@context' => 'http://schema.org',
                '@type' => 'Offer',
                'url' => $this->link->getProductLink($product->id),
                'itemCondition' => 'https://schema.org/NewCondition',
                'availability' => $availableStock,
                'priceValidUntil' => $priceValidUntil,
                'price' => round($price, 2),
                'priceCurrency' => $this->currencyCode,
                'priceSpecification' => [$priceSpecification],
                'seller' => [
                    '@context' => 'http://schema.org',
                    '@type' => 'Organization',
                    'url' => $this->context->shop->getBaseURL(true),
                    'logo' => $this->context->shop->getBaseURL(true) . 'img/' . Configuration::get('PS_LOGO', $this->idLang, $this->idShop, $this->idShopGroup),
                    'image' => [
                        'https://demodernesmid.nl/upload/uploaded_files/jota-570.png',
                        'https://ijzershop.nl/upload/supportdesk.png',
                        'https://constructiebalk.nl/upload/IJzershop-corten.png'
                    ],
                    'name' => $this->shopName,
                    'telephone' => $store->phone,
                    'email' => $store->email,
                    'contactPoint' => $contacts,
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressCountry' => 'Nederland',
                        'addressLocality' => $store->city,
                        'postalCode' => $store->postcode,
                        'streetAddress' => $store->address1
                    ], 'geo' => [
                        '@type' => 'GeoCoordinates',
                        'latitude' => $store->latitude,
                        'longitude' => $store->longitude
                    ],
                    'openingHoursSpecification' => [
                        [
                            '@type' => 'OpeningHoursSpecification',
                            'dayOfWeek' => [
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday'
                            ],
                            'opens' => '8:00',
                            'closes' => '17:00'
                        ]
                    ],
                ],
                'shippingDetails' => [
                    '@context' => 'http://schema.org',
                    '@type' => 'OfferShippingDetails',
                    'shippingLabel' => 'Verzending met Transmission',
                    'shippingRate' => [
                        '@type' => 'MonetaryAmount',
                        'value' => round($deliveryPrice * 1.21, 2),
                        'currency' => 'EUR'
                    ],
                    'shippingDestination' => [
                        '@context' => 'http://schema.org',
                        '@type' => 'DefinedRegion',
                        'addressCountry' => 'NL',
                        'postalCodeRange' => [
                            'context' => 'https://schema.org',
                            '@type' => 'PostalCodeRangeSpecification',
                            'postalCodeBegin' => '1000 AA',
                            'postalCodeEnd' => '9999 ZZ'
                        ]
                    ],
                    'deliveryTime' => [
                        '@context' => 'https://schema.org/',
                        '@type' => 'ShippingDeliveryTime',
                        'handlingTime' => [
                            '@type' => 'QuantitativeValue',
                            'minValue' => '0',
                            'maxValue' => '1',
                            'unitCode' => 'd'
                        ],
                        'transitTime' => [
                            '@context' => 'https://schema.org/',
                            '@type' => 'QuantitativeValue',
                            'minValue' => '1',
                            'maxValue' => '7',
                            'unitCode' => 'd'
                        ],
                        'cutoffTime' => '17:00-08:00',
                        'businessDays' => [
                            '@context' => 'http://schema.org',
                            '@type' => 'OpeningHoursSpecification',
                            'dayOfWeek' => [
                                'https://schema.org/Monday',
                                'https://schema.org/Tuesday',
                                'https://schema.org/Wednesday',
                                'https://schema.org/Thursday',
                                'https://schema.org/Friday'
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }
    /**
     * GA4 view_item_list / select_item: publish the rendered product listing to the front-end object.
     *
     * This must not live in hookActionFrontControllerSetVariables(). That hook fires inside
     * FrontController::assignGeneralPurposeVariables(), where $templateVars only contains a fixed set of
     * keys (cart, currency, customer, page, shop, urls, ...). The listing does not exist yet; it is
     * assigned later, in ProductListingFrontController::initContent(). Reading
     * $templateVars['listing']['products'] there therefore always yielded [], so view_item_list was never
     * pushed to the data layer and item_list_name fell back to the literal string 'Categorie'.
     *
     * actionProductSearchAfter fires once the search has run and receives the presented products plus the
     * listing label. Media::getJsDef() is only read in FrontController::display(), i.e. after
     * initContent(), so a read-modify-write of the already-built 'prestashop' object still reaches the
     * browser. Media::addJsDef() overwrites per top-level key, hence the read-modify-write instead of a
     * nested add.
     *
     * @param array $params result, label, products, sort_orders, pagination, ...
     */
    public function hookActionProductSearchAfter(array $params): void
    {
        $products = $params['products'] ?? [];
        if (!is_array($products) || empty($products)) {
            return;
        }

        // getListingLabel() gives the real name: the category name, 'Search results',
        // 'Best sellers', 'New products', 'Prices drop' or the manufacturer/supplier label.
        $listName = trim((string)($params['label'] ?? ''));
        if ($listName === '') {
            $listName = 'Productlijst';
        }

        $items = [];
        foreach (array_values($products) as $index => $product) {
            $items[] = [
                'item_id'       => (int)($product['id_product'] ?? 0),
                'item_name'     => (string)($product['name'] ?? ''),
                'price'         => round((float)($product['price_amount']
                    ?? $product['price_with_reduction_without_tax']
                    ?? $product['price_tax_exc']
                    ?? 0), 2),
                'item_category' => (string)($product['category_name'] ?? ''),
                'index'         => $index,
            ];
        }

        // On the AJAX facet-filter request there is no full page render and therefore no
        // 'prestashop' object to extend. Bail out rather than create a partial one.
        $jsDef = Media::getJsDef();
        if (!isset($jsDef['prestashop']) || !is_array($jsDef['prestashop'])) {
            return;
        }

        $frontEndObject = $jsDef['prestashop'];
        if (!isset($frontEndObject['analytics_data']) || !is_array($frontEndObject['analytics_data'])) {
            $frontEndObject['analytics_data'] = [];
        }
        $frontEndObject['analytics_data']['item_list'] = [
            'item_list_name' => $listName,
            'items'          => $items,
        ];

        Media::addJsDef(['prestashop' => $frontEndObject]);
    }

    /**
     * Modify search result content
     *
     * Add json ld to category pages when search provider is used
     *
     * @param $hookArgs
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws \PrestaShopDatabaseException|PrestaShopException
     */
    public function hookActionProductSearchProviderRunQueryAfter($hookArgs): void
    {
        $cat = new Category($hookArgs['query']->getIdCategory());
        $catImages = [$this->link->getCatImageLink($cat->link_rewrite, $cat->id_category)];
        $catTotalProducts = 0;
        $catDescription = "";
        if (!empty($cat->top_description) && isset($cat->top_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->top_description[$this->idLang]));
        }

        if (!empty($cat->additional_description) && isset($cat->additional_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->additional_description[$this->idLang]));
        } elseif(isset($cat->description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->description[$this->idLang]));
        }

        $jsonLD = [];
        $products = $cat->getProducts($this->idLang, 0, 100);
        if (is_countable($products)) {
            $catTotalProducts = count($products);
            foreach ($cat->getProducts($this->idLang, 0, 100) as $prod) {
                $jsonLD[] = $this->createProductJSONLD($prod['id_product']);
            }
        }

        $alternateName = '';
        if(isset($cat->second_name[$this->idLang])){
            $alternateName = $cat->second_name[$this->idLang];
        }


        $jsonLDCategory = [];
        if (!is_null($cat->id)) {
            $jsonLDCategory = [
                '@context' => 'https://schema.org',
                '@type' => 'ItemList',
                'url' => $this->link->getCategoryLink($cat->id),
                'numberOfItems' => $catTotalProducts,
                'name' => $cat->name[$this->idLang],
                'alternateName' => $alternateName,
                'description' => $catDescription,
                'image' => $catImages,
                'itemListElement' => $jsonLD
            ];
        }

        $this->context->smarty->assign('jsonld_category_seo', json_encode($jsonLDCategory, JSON_UNESCAPED_SLASHES));

        try {
            $products = [];
            if (isset($hookArgs['result']) && method_exists($hookArgs['result'], 'getProducts')) {
                $products = $hookArgs['result']->getProducts();
            } elseif (isset($hookArgs['products']) && is_array($hookArgs['products'])) {
                $products = $hookArgs['products'];
            }

            if (is_array($products) && !empty($products)) {
                foreach ($products as &$product) {
                    $idProduct = 0;
                    if (is_array($product)) {
                        $idProduct = (int) ($product['id_product'] ?? $product['id'] ?? 0);
                    } elseif (is_object($product) && isset($product->id)) {
                        $idProduct = (int) $product->id;
                    }
                    if ($idProduct > 0) {
                        $enabled = $this->isSawCutEnabledForProduct($idProduct);
                        if (is_array($product)) {
                            $product['saw_cut_enabled'] = $enabled;
                        } elseif (is_object($product)) {
                            $product->saw_cut_enabled = $enabled;
                        }
                    }
                }
                unset($product);

                if (isset($hookArgs['result']) && method_exists($hookArgs['result'], 'setProducts')) {
                    $hookArgs['result']->setProducts($products);
                } elseif (isset($hookArgs['products']) && is_array($hookArgs['products'])) {
                    $hookArgs['products'] = $products;
                }
            }
        } catch (\Throwable $e) {
        }
    }

    private function isSawCutEnabledForProduct(int $productId): bool
    {
        $sawFeatureId = (int) $this->getSawCutConfigValue('id_feature_product_length', 0);
        $cutFeatureId = (int) $this->getSawCutConfigValue('id_feature_product_cutlength', 0);
        if (!$sawFeatureId && !$cutFeatureId) {
            return false;
        }
        $features = Product::getFrontFeaturesStatic($this->idLang, $productId);
        foreach ($features as $feature) {
            $idFeature = (int) ($feature['id_feature'] ?? 0);
            $val = (int) ($feature['value'] ?? 0);
            if (($sawFeatureId && $idFeature === $sawFeatureId && $val > 0)
                || ($cutFeatureId && $idFeature === $cutFeatureId && $val > 0)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Modify the object of the front controller
     *
     * Add stock management data to configuration object, so it can be used in the templates
     *
     * @param $params
     * @return void
     */
    public function hookActionBuildFrontEndObject(&$params): void
    {
        $params['obj']['configuration']['stock_management'] = (int)Configuration::get('PS_STOCK_MANAGEMENT', $this->idLang, $this->idShop, $this->idShopGroup, 0);
        $params['obj']['configuration']['order_out_of_stock'] = (int)Configuration::get('PS_ORDER_OUT_OF_STOCK', $this->idLang, $this->idShop, $this->idShopGroup, 1);
    }

    /**
     *
     * @param $params
     * @return mixed
     */
    public function hookDisplayAdminProductsSeoStepBottom($params): mixed
    {
        $id_product = (int)$params['id_product'];
        // Use PrestaShop core object to avoid booting Symfony kernel in PS9
        $product = new Product($id_product, false, (int)$this->idLang, (int)$this->idShop);

        $formData = [];

        $formData['second_name'] = $product->second_name;
        $formData['seo_keywords'] = $product->seo_keywords;

        if (!empty($product->jsonld)) {
            $formData['jsonld'] = $product->jsonld;
        } else {
            $formData['jsonld'] = "{}";
        }

        // Get Symfony form factory via module container (PS9-compatible)
        $formFactory = $this->module->get('form.factory');

        $form = $formFactory->createBuilder(FormType::class, $formData)
            ->add('second_name', TextType::class, [
                'required' => false,
                'label' => 'Second name',
                'help' => 'Voeg hier de gewenste tweede productnaam in om toe te voegen aan de Google schema',
                'label_attr' => [
                    'class' => 'text-left w-auto'
                ],
                'attr' => [
                    'class' => 'col-12',
                ]
            ])
            ->add('seo_keywords', TextType::class, [
                'required' => false,
                'label' => 'SEO Keywords',
                'help' => 'Voeg hier de gewenste extra SEO sleutelwoorden in om toe te voegen aan de google schema',
                'label_attr' => [
                    'class' => 'text-left w-auto'
                ],
                'attr' => [
                    'class' => 'col-12',
                ]
            ])->add('jsonld', TextareaType::class, [
                'required' => false,
                'label' => 'JSON+LD',
                'help' => 'Voeg hier de gewenste extra json+ld waarden in om toe te voegen aan de google',
                'label_attr' => [
                    'class' => 'text-left w-auto'
                ],
                'attr' => [
                    'class' => 'col-12',
                    'rows' => '20'
                ]
            ])
            ->getForm();

        $jsonldForm = [];
        $jsonldForm['form'] = $form->createView();

        if ($this->twig) {
            return $this->twig->render('@Modules\msthemeconfig\views\templates\admin\custom-product-fields.html.twig', $jsonldForm);
        }

        return '';
    }

    /**
     *
     * @param $params
     * @return mixed
     * @throws PrestaShopException
     */
    public function hookActionAdminProductsControllerSaveAfter($params): mixed
    {
        $idProduct = (int)Tools::getValue('id_product');
        $productObject = new Product($idProduct);

        $jsonLd = $_REQUEST['form']['jsonld'];
        if (!isset($params) || $params['controller']->controller_name != 'AdminProducts') { // Make sure datas come form this form
            return false;
        }
        $productObject->second_name = $_REQUEST['form']['second_name'];
        $productObject->seo_keywords = $_REQUEST['form']['seo_keywords'];

        json_decode($jsonLd);
        if (json_last_error() === JSON_ERROR_NONE) {
            $productObject->jsonld = $jsonLd;
//            die();
        }

        $productObject->save();

        if (!Validate::isLoadedObject($productObject)) {
            return false;
        }
        return true;
    }
    /**
     * Fires when a new Order object is first saved to the database.
     *
     * Two contexts reach this hook, and only one of them has cookies:
     *   - msmollie controllers/front/return.php:516 — the customer's browser is back from the
     *     bank, so $_COOKIE is populated.
     *   - msmollie controllers/front/webhook.php:397 — Mollie POSTs server-to-server and there
     *     are no cookies at all. This is normally the one that wins the race, which is why
     *     96.4% of iDEAL orders used to end up with no GA4 identity.
     *
     * resolveGaIdentifiers() falls back to the cart, populated while the customer was browsing,
     * so both contexts now produce the same result.
     */
    public function hookActionObjectOrderAddAfter(array $params): void
    {
        /** @var Order $order */
        $order = $params['object'] ?? null;
        if (!($order instanceof Order) || !Validate::isLoadedObject($order)) {
            return;
        }
        $orderId = (int)$order->id;

        // Snapshot the source at creation time. An order can be updated by an employee days
        // later, so looking at the employee context in the status hook would misclassify an
        // ordinary online order as backoffice. No customer or employee identifier is stored.
        $classification = self::classifyNewOrder($order);
        try {
            $stored = Db::getInstance()->update('orders', [
                'analytics_order_channel' => pSQL($classification['order_channel']),
                'analytics_is_test' => $classification['is_test_order'] ? 1 : 0,
            ], '`id_order` = ' . $orderId);

            self::logPayment('ORDER_ADD', $stored ? 'classification_stored' : 'classification_store_failed', [
                'orderId' => $orderId,
                'order_channel' => $classification['order_channel'],
                'is_test_order' => $classification['is_test_order'],
            ]);
        } catch (\Throwable $e) {
            // Deploying the PHP before running the module upgrade must never block checkout.
            self::logPayment('ORDER_ADD', 'classification_store_failed', [
                'orderId' => $orderId,
                'reason' => $e->getMessage(),
            ]);
        }

        // Keep the existing GA snapshot idempotent, but do not return early: advertising
        // attribution has its own consent and may still need to be copied on an upgraded shop.
        $existingClientId = Db::getInstance()->getValue(
            'SELECT `ga_client_id` FROM `' . _DB_PREFIX_ . 'orders` WHERE `id_order` = ' . $orderId
        );
        if (empty($existingClientId)) {
            $ga = self::resolveGaIdentifiers((int)$order->id_cart);
            $gaClientId = $ga['client_id'];
            $gaSessionId = $ga['session_id'];
            $analyticsConsent = $ga['consent'];

            $updateData = [
                'ga_client_id'  => pSQL($gaClientId),
                'ga_session_id' => pSQL($gaSessionId),
            ];
            if ($analyticsConsent !== null) {
                $updateData['ga_analytics_consent'] = (int)$analyticsConsent;
            }
            Db::getInstance()->update('orders', $updateData, '`id_order` = ' . $orderId);

            self::logPayment('ORDER_ADD', 'ga_identifiers_stored', [
                'orderId'          => $orderId,
                'id_cart'          => (int)$order->id_cart,
                'source'           => !empty($_COOKIE['_ga']) ? 'browser_cookie' : 'cart_fallback',
                'ga_client_id'     => $gaClientId ?: '(none)',
                'ga_session_id'    => $gaSessionId ?: '(none)',
                'analytics_consent'=> $analyticsConsent ?? 'null',
            ]);
        }

        self::storeAdAttributionOnOrder(
            $order,
            self::resolveAdAttribution((int)$order->id_cart),
            true
        );
    }

    /**
     * @param array $params
     */
    public function hookActionOrderSlipAdd(array $params): void
    {
        /** @var Order $order */
        $order = $params['order'] ?? null;
        /** @var OrderSlip $orderSlip */
        $orderSlip = $params['orderSlipCreated'] ?? null;

        if (!$order instanceof Order || !$orderSlip instanceof OrderSlip
            || !Validate::isLoadedObject($order) || !Validate::isLoadedObject($orderSlip)
            || (int)$orderSlip->id_order !== (int)$order->id) {
            return;
        }

        $this->applyOrderSlipReturnCosts($order, $orderSlip);
        $this->handleGa4RefundTracking($order, $orderSlip);
    }

    /** Keep the existing financial adjustment before taking the analytics snapshot. */
    private function applyOrderSlipReturnCosts(Order $order, OrderSlip $orderSlip): void
    {
        $id_shop = (int)$order->id_shop;
        $retourCostNl = (int)Configuration::get('MSTHEMECONFIG_RETOUR_COST_NL', null, null, $id_shop);
        $retourCostBe = (int)Configuration::get('MSTHEMECONFIG_RETOUR_COST_BE', null, null, $id_shop);

        $retourCostProductIds = array_filter([$retourCostNl, $retourCostBe]);
        if (empty($retourCostProductIds)) {
            return;
        }

        $orderDetails = $order->getOrderDetailList();
        $totalDeductionTaxExcl = 0;
        $totalDeductionTaxIncl = 0;
        $deductionMade = false;

        foreach ($orderDetails as $detail) {
            if (in_array((int)$detail['product_id'], $retourCostProductIds)) {
                $orderDetailObj = new OrderDetail((int)$detail['id_order_detail']);
                if (!Validate::isLoadedObject($orderDetailObj)) {
                    continue;
                }

                // Check if already refunded (to avoid double deduction on second partial return)
                if ($orderDetailObj->product_quantity_refunded >= $orderDetailObj->product_quantity) {
                    continue;
                }

                // Add to order_slip_detail with negative values to reduce the total credit slip amount
                $unitPriceExcl = (float)$orderDetailObj->unit_price_tax_excl;
                $unitPriceIncl = (float)$orderDetailObj->unit_price_tax_incl;

                Db::getInstance()->insert('order_slip_detail', [
                    'id_order_slip' => (int)$orderSlip->id,
                    'id_order_detail' => (int)$orderDetailObj->id,
                    'product_quantity' => 1,
                    'unit_price_tax_excl' => -$unitPriceExcl,
                    'unit_price_tax_incl' => -$unitPriceIncl,
                    'total_price_tax_excl' => -$unitPriceExcl,
                    'total_price_tax_incl' => -$unitPriceIncl,
                    'amount_tax_excl' => -$unitPriceExcl,
                    'amount_tax_incl' => -$unitPriceIncl,
                ]);

                $totalDeductionTaxExcl += $unitPriceExcl;
                $totalDeductionTaxIncl += $unitPriceIncl;

                // Mark as refunded so we don't do it again
                $orderDetailObj->product_quantity_refunded += 1;
                $orderDetailObj->total_refunded_tax_excl += $unitPriceExcl;
                $orderDetailObj->total_refunded_tax_incl += $unitPriceIncl;
                $orderDetailObj->save();

                $deductionMade = true;
            }
        }

        if ($deductionMade) {
            $orderSlip->total_products_tax_excl -= $totalDeductionTaxExcl;
            $orderSlip->total_products_tax_incl -= $totalDeductionTaxIncl;

            // Update amount proportionally. We assume it matches one of the totals.
            if ($orderSlip->amount > 0) {
                $orderSlip->amount -= $totalDeductionTaxIncl;
            } else {
                $orderSlip->amount = $orderSlip->total_products_tax_excl;
            }

            if ($orderSlip->amount < 0) {
                $orderSlip->amount = 0;
            }

            $orderSlip->save();
        }
    }

    /** Analytics failures must never prevent the shop from completing a credit note. */
    protected function handleGa4RefundTracking(Order $order, OrderSlip $orderSlip): void
    {
        try {
            $key = [
                'id_shop' => (int)$order->id_shop,
                'id_order' => (int)$order->id,
                'id_order_slip' => (int)$orderSlip->id,
                'order_reference' => (string)$order->reference,
            ];
            $dispatcher = new Ga4RefundDispatcher(new Ga4RefundStore());
            $result = $dispatcher->dispatch($key, static fn() => self::ga4RefundSnapshot($order, $orderSlip));
            if (!empty($result['processed'])) {
                $record = $result['record'] ?? [];
                self::logPayment('REFUND', 'dispatch_result', $record);
                PrestaShopLogger::addLog(
                    'ModernHook GA4: refund ' . ($record['state'] ?? 'unknown')
                    . ' for credit note ' . (int)$orderSlip->id . ' / order ' . $order->reference
                    . ' (' . ($record['reason'] ?? 'unknown') . ')',
                    in_array($record['state'] ?? '', ['accepted', 'skipped'], true) ? 1 : 2,
                    null,
                    'OrderSlip',
                    (int)$orderSlip->id,
                    true
                );
            }
        } catch (\Throwable $exception) {
            // Log only a stable reason and the note ID, never an exception/URL with a secret.
            try {
                PrestaShopLogger::addLog(
                    'ModernHook GA4: refund tracking unavailable for credit note ' . (int)$orderSlip->id,
                    2,
                    null,
                    'OrderSlip',
                    (int)$orderSlip->id,
                    true
                );
            } catch (\Throwable $ignored) {
                // A failed analytics/logging database write must not affect the credit.
            }
        }
    }

    /**
     * Read-only input for the automatic sender and CLI diagnostics. Contains the scoped API
     * secret and GA identifiers: callers must never print/log the complete snapshot.
     */
    public static function ga4RefundSnapshot(Order $order, OrderSlip $orderSlip): array
    {
        if (!Validate::isLoadedObject($order) || !Validate::isLoadedObject($orderSlip)
            || (int)$orderSlip->id_order !== (int)$order->id) {
            throw new \DomainException('credit_note_order_mismatch');
        }
        $db = Db::getInstance();
        $orderId = (int)$order->id;
        $slipId = (int)$orderSlip->id;
        $storedOrder = $db->getRow(
            'SELECT `ga_client_id`, `ga_session_id`, `ga_analytics_consent`'
            . ' FROM `' . _DB_PREFIX_ . 'orders` WHERE `id_order` = ' . $orderId,
            false
        );
        $slip = $db->getRow(
            'SELECT `id_order_slip`, `id_order`, `date_add`, `partial`, `order_slip_type`, `amount`,'
            . ' `total_products_tax_excl`, `total_products_tax_incl`,'
            . ' `total_shipping_tax_excl`, `total_shipping_tax_incl`'
            . ' FROM `' . _DB_PREFIX_ . 'order_slip` WHERE `id_order_slip` = ' . $slipId,
            false
        );
        $lines = $db->executeS(
            'SELECT sd.`id_order_slip`, sd.`id_order_detail`, sd.`product_quantity`,'
            . ' sd.`amount_tax_excl`, sd.`amount_tax_incl`, od.`id_order`,'
            . ' od.`product_id`, od.`product_name`'
            . ' FROM `' . _DB_PREFIX_ . 'order_slip_detail` sd'
            . ' LEFT JOIN `' . _DB_PREFIX_ . 'order_detail` od ON od.`id_order_detail` = sd.`id_order_detail`'
            . ' WHERE sd.`id_order_slip` = ' . $slipId . ' ORDER BY sd.`id_order_detail`',
            true,
            false
        );
        if (!is_array($storedOrder) || !$storedOrder || !is_array($slip) || !$slip || !is_array($lines)) {
            throw new \DomainException('refund_snapshot_unavailable');
        }
        $currency = new Currency((int)$order->id_currency);
        if (!Validate::isLoadedObject($currency)) {
            throw new \DomainException('invalid_currency');
        }
        $scope = [(int)$order->id_shop, (int)$order->id_lang, (int)$order->id_shop_group];
        $endpoint = self::getGa4Config('MSTHEMECONFIG_GA4_ENDPOINT', ...$scope)
            ?: 'https://www.google-analytics.com/mp/collect';
        $timezone = (string)Configuration::get('PS_TIMEZONE', null, $scope[2], $scope[0]);
        $date = \DateTimeImmutable::createFromFormat(
            '!Y-m-d H:i:s',
            (string)$slip['date_add'],
            new \DateTimeZone($timezone ?: date_default_timezone_get())
        );
        if (!$date || $date->format('Y-m-d H:i:s') !== $slip['date_add']) {
            throw new \DomainException('invalid_credit_note_timestamp');
        }
        $classification = self::getOrderAnalyticsClassification($order);
        $identity = self::getOrderShopIdentity($order);
        $checkout = self::getOrderCheckoutTypes($order);
        $trafficType = ($classification['order_channel'] === 'backoffice' || $classification['is_test_order'])
            ? 'internal' : self::gaTrafficType($identity['shop_domain']);

        return [
            'order' => array_merge($storedOrder, [
                'id_order' => $orderId,
                'id_shop' => (int)$order->id_shop,
                'id_cart' => (int)$order->id_cart,
                'reference' => (string)$order->reference,
            ]),
            'slip' => $slip,
            'lines' => $lines,
            'currency' => (string)$currency->iso_code,
            'currency_precision' => (int)$currency->precision,
            'timestamp' => $date->getTimestamp(),
            'endpoint' => $endpoint,
            'first_party' => Ga4RefundTransport::isFirstParty($endpoint),
            'measurement_id' => self::getGa4Config('MSTHEMECONFIG_GA4_MEASUREMENT_ID', ...$scope),
            'api_secret' => self::getGa4Config('MSTHEMECONFIG_GA4_API_SECRET', ...$scope),
            'metadata' => [
                'session_type' => $classification['order_channel'] === 'counter' ? 'counter' : 'customer',
                'order_channel' => $classification['order_channel'],
                'shop_name' => $identity['shop_name'],
                'shop_domain' => $identity['shop_domain'],
                'page_location' => $identity['base_url'],
                'shipping_tier' => $checkout['shipping_tier'],
                'payment_type' => $checkout['payment_type'],
                'traffic_type' => $trafficType,
            ],
        ];
    }

    /**
     *
     * Send delivery slip to multiple email addresses set in de config page
     *
     * @TODO check function
     *
     * @param $data
     * @return bool|void
     * @throws LocalizationException
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionOrderStatusPostUpdate($data)
    {
        // GA4 must run first — $data gets overwritten further down by the email block
        $this->handleGa4PurchaseTracking($data);
        $this->handleGa4CanceledTracking($data);

        $sendResult = null;
        $conf = Configuration::get('MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON', $this->idLang, $this->idShopGroup, $this->idShop, '');
        if (!empty($conf)) {
            $dbData = json_decode($conf);
            $newOrderStateId = $data['newOrderStatus']->id;
            $orderId = $data['id_order'];
            $order = new Order($orderId);
            if (Validate::isLoadedObject($order)) {
                for ($i = 0; $i < count($dbData); $i++) {
                    if ((int)$dbData[$i]->id_order_state == (int)$newOrderStateId) {
                        //configured orderstate send delivery slip to emails
                        $firstEmail = $dbData[$i]->first_email_order_state; //send to email
                        $secondEmail = $dbData[$i]->second_email_order_state; //cc to email

                        $id_order_history = Db::getInstance()->getValue('
                        SELECT `id_order_history`
                        FROM `' . _DB_PREFIX_ . 'order_history`
                        WHERE `id_order` = ' . (int)$orderId . '
                        ORDER BY `date_add` DESC, `id_order_history` DESC');

                        $result = Db::getInstance()->getRow('
            SELECT osl.`template`, c.`lastname`, c.`firstname`, osl.`name` AS osname, c.`email`, os.`module_name`, os.`id_order_state`, os.`pdf_invoice`, os.`pdf_delivery`
            FROM `' . _DB_PREFIX_ . 'order_history` oh
                LEFT JOIN `' . _DB_PREFIX_ . 'orders` o ON oh.`id_order` = o.`id_order`
                LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON o.`id_customer` = c.`id_customer`
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON oh.`id_order_state` = os.`id_order_state`
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state_lang` osl ON (os.`id_order_state` = osl.`id_order_state` AND osl.`id_lang` = o.`id_lang`)
            WHERE oh.`id_order_history` = ' . (int)$id_order_history . ' AND os.`send_email` = 1');

                        $carrierUrl = '';
                        if (Validate::isLoadedObject($carrier = new Carrier((int)$order->id_carrier,
                            $order->id_lang))) {
                            $carrierUrl = $carrier->url;
                        }

                        $mailData = [
                            '{lastname}' => $result['lastname'],
                            '{firstname}' => $result['firstname'],
                            '{id_order}' => (int)$orderId,
                            '{order_name}' => $order->getUniqReference(),
                            '{followup}' => str_replace('@', $order->getWsShippingNumber(), $carrierUrl),
                            '{shipping_number}' => $order->getWsShippingNumber(),
                            '{desired_delivery_date}' => date_format(date_create($order->desired_delivery_date),
                                'd-m-Y'),
                        ];

                        if ($result['module_name']) {
                            $module = Module::getInstanceByName($result['module_name']);
                            if (Validate::isLoadedObject($module) && isset($module->extra_mail_vars) && is_array($module->extra_mail_vars)) {
                                $mailData = array_merge($mailData, $module->extra_mail_vars);
                            }
                        }

                        $mailData['{total_paid}'] = $this->context->currentLocale->formatPrice((float)$order->total_paid,
                            'EUR');

                        // Attach invoice and / or delivery-slip if they exist and status is set to attach them
                        $invoice = $order->getInvoicesCollection();
                        $file_attachment = [];

                        if ($order->delivery_number) {
                            $pdf = new PDFCore($invoice, self::TEMPLATE_DELIVERY_SLIP, $this->context->smarty);
                            $file_attachment['content'] = $pdf->render(false);
                            $file_attachment['name'] = Configuration::get('PS_DELIVERY_PREFIX',
                                    $this->idLang, null, $order->id_shop) . '.pdf';
                            $file_attachment['mime'] = 'application/pdf';
                        }

                        if (Validate::isEmail($firstEmail)) {
                            $bcc = (Validate::isEmail($secondEmail) ? $secondEmail : null);
                            $mail = Mail::send(
                                (int)$order->id_lang,
                                'dropshipping_request',
                                'Nieuwe bestelling',
                                $mailData,
                                $firstEmail,
                                'Leverancier',
                                'info@v15.nl',
                                'De moderne smid',
                                $file_attachment,
                                null,
                                _PS_MAIL_DIR_,
                                false,
                                (int)$order->id_shop,
                                $bcc,
                                'info@v15.nl',
                                'de Moderne Smid'
                            );
                            $sendResult = (bool) $mail;
                            break;
                        } else {
                            PrestaShopLogger::addLog('ModernHook: Invalid first email for dropshipping_request: ' . $firstEmail, 3);
                            $sendResult = false;
                            break;
                        }
                    }
                }
            }
        }

        $this->applySsaOrderStatusPostUpdate($data);

        return $sendResult;
    }

    /**
     * Send a GA4 Measurement Protocol purchase event when an order first reaches any configured state.
     * Uses the order history to guarantee one purchase across the complete trigger-state set.
     */
    private function handleGa4PurchaseTracking(array $data): void
    {
        $newStateId = (int)$data['newOrderStatus']->id;
        $orderId    = (int)$data['id_order'];
        $order      = new Order($orderId);
        if (!Validate::isLoadedObject($order)) {
            self::logPayment('GA4', 'early_exit', ['reason' => 'order_not_loaded', 'orderId' => $orderId]);
            return;
        }

        // Resolve every setting against the order's immutable shop, not the current request or
        // back-office shop selector. This is essential when one installation serves several domains.
        $configScope = [(int)$order->id_shop, (int)$order->id_lang, (int)$order->id_shop_group];
        $measurementId    = self::getGa4Config('MSTHEMECONFIG_GA4_MEASUREMENT_ID', ...$configScope);
        $apiSecret        = self::getGa4Config('MSTHEMECONFIG_GA4_API_SECRET', ...$configScope);
        $triggerStatesRaw = self::getGa4Config('MSTHEMECONFIG_GA4_TRIGGER_STATES', ...$configScope);
        $endpoint         = self::getGa4Config('MSTHEMECONFIG_GA4_ENDPOINT', ...$configScope)
            ?: 'https://www.google-analytics.com/mp/collect';

        self::logPayment('GA4', 'entry', [
            'orderId'           => $orderId,
            'shopId'            => (int)$order->id_shop,
            'newStateId'        => $newStateId,
            'measurementId'     => $measurementId ? substr($measurementId, 0, 4) . '****' : '(empty)',
            'apiSecret'         => $apiSecret ? '****' : '(empty)',
            'triggerStatesRaw'  => $triggerStatesRaw,
            'endpoint'          => $endpoint,
        ]);

        if (empty($measurementId) || empty($apiSecret) || empty($triggerStatesRaw)) {
            self::logPayment('GA4', 'early_exit', ['reason' => 'missing config', 'measurementId_empty' => empty($measurementId), 'apiSecret_empty' => empty($apiSecret), 'triggerStates_empty' => empty($triggerStatesRaw)]);
            return;
        }

        // Stored as JSON array (e.g. "[2,12]") when saved via multi-select, or comma-separated legacy string
        $trimmed = trim((string)$triggerStatesRaw);
        if ($trimmed !== '' && $trimmed[0] === '[') {
            $decoded = json_decode($trimmed, true);
            $triggerStates = is_array($decoded) ? $decoded : [];
        } else {
            $triggerStates = explode(',', $trimmed);
        }
        $triggerStates = array_values(array_filter(array_map('intval', $triggerStates)));

        self::logPayment('GA4', 'trigger_check', [
            'triggerStates' => $triggerStates,
            'newStateId'    => $newStateId,
            'matches'       => in_array($newStateId, $triggerStates, true),
        ]);

        if (!in_array($newStateId, $triggerStates, true)) {
            self::logPayment('GA4', 'early_exit', ['reason' => 'state_not_in_trigger_list', 'newStateId' => $newStateId]);
            return;
        }

        // actionOrderStatusPostUpdate runs from OrderHistory::changeIdOrderState(), before the caller
        // persists the current OrderHistory row with addWithemail(). Every matching row found here is
        // therefore an earlier purchase trigger. Check the whole configured set, not only the current
        // state: an order can move through several configured paid states but must produce one purchase.
        $priorTriggerCount = (int)Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'order_history`
             WHERE `id_order` = ' . $orderId . '
             AND `id_order_state` IN (' . implode(',', $triggerStates) . ')'
        );

        self::logPayment('GA4', 'dedup_check', [
            'orderId'           => $orderId,
            'newStateId'        => $newStateId,
            'triggerStates'     => $triggerStates,
            'priorTriggerCount' => $priorTriggerCount,
            'will_fire'         => $priorTriggerCount === 0,
        ]);

        if ($priorTriggerCount > 0) {
            self::logPayment('GA4', 'early_exit', [
                'reason'            => 'purchase_already_triggered',
                'priorTriggerCount' => $priorTriggerCount,
            ]);
            return;
        }

        $cart = new Cart($order->id_cart);
        if (!Validate::isLoadedObject($cart)) {
            self::logPayment('GA4', 'early_exit', ['reason' => 'cart_not_loaded', 'cartId' => $order->id_cart]);
            return;
        }

        $items = [];
        foreach ($cart->getProducts() as $product) {
            $items[] = [
                'item_id' => (string)$product['id_product'],
                'item_name' => $product['name'],
                'price' => round((float)$product['price_with_reduction_without_tax'], 2),
                'quantity' => (int)$product['quantity'],
                'discount' => round((float)($product['price_without_reduction_without_tax'] - $product['price_with_reduction_without_tax']), 2),
            ];
        }

        $coupon = '';
        $cartRules = $cart->getCartRules();
        if (!empty($cartRules)) {
            $coupon = implode(',', array_column($cartRules, 'name'));
        }

        // Use the GA4 client_id captured from the customer's browser during order confirmation.
        // Falling back to 'server-{orderId}' only if the cookie was never stored
        // (e.g. phone orders, old orders placed before this feature was deployed).
        $storedRow = Db::getInstance()->getRow(
            'SELECT `ga_client_id`, `ga_session_id`, `ga_analytics_consent` FROM `' . _DB_PREFIX_ . 'orders` WHERE `id_order` = ' . $orderId
        );

        // Respect the customer's analytics consent: 0 = explicitly declined, skip MP event.
        // NULL means the order predates consent tracking — fire for backward compatibility.
        $analyticsConsent = isset($storedRow['ga_analytics_consent']) ? $storedRow['ga_analytics_consent'] : null;
        if ($analyticsConsent !== null && (int)$analyticsConsent === 0) {
            self::logPayment('GA4', 'early_exit', ['reason' => 'analytics_consent_denied', 'orderId' => $orderId]);
            return;
        }

        $clientId  = !empty($storedRow['ga_client_id'])  ? $storedRow['ga_client_id']  : 'server-' . $orderId;
        $sessionId = !empty($storedRow['ga_session_id']) ? (string)$storedRow['ga_session_id'] : '';
        $adAttribution = self::getStoredOrderAdAttribution($orderId);
        $purchaseEventId = self::purchaseEventId($order);

        $classification = self::getOrderAnalyticsClassification($order);
        $shopIdentity = self::getOrderShopIdentity($order);
        $checkoutTypes = self::getOrderCheckoutTypes($order);
        // Keep the existing session_type contract for current GTM/BigQuery consumers. The
        // explicit order_channel adds backoffice without changing those two established values.
        $sessionType = $classification['order_channel'] === 'counter' ? 'counter' : 'customer';
        $trafficType = ($classification['order_channel'] === 'backoffice' || $classification['is_test_order'])
            ? 'internal'
            : self::gaTrafficType($shopIdentity['shop_domain']);

        self::logPayment('GA4', 'identifiers', [
            'client_id_source'   => !empty($storedRow['ga_client_id']) ? 'stored_cookie' : 'fallback',
            'client_id'          => $clientId,
            'session_id'         => $sessionId ?: '(missing)',
            'analytics_consent'  => $analyticsConsent ?? 'null (legacy)',
            'session_type'       => $sessionType,
            'order_channel'      => $classification['order_channel'],
            'is_test_order'      => $classification['is_test_order'],
            'shop_id'            => $shopIdentity['shop_id'],
            'shop_name'          => $shopIdentity['shop_name'],
            'shop_domain'        => $shopIdentity['shop_domain'],
            'shipping_tier'      => $checkoutTypes['shipping_tier'],
            'payment_type'       => $checkoutTypes['payment_type'],
            'traffic_type'       => $trafficType ?: '(not internal)',
            'purchase_event_id'  => $purchaseEventId,
            'marketing_consent'  => $adAttribution['consent'] ?? 'null',
            // Log field names only. Click/browser identifiers must not be copied into log files.
            'ad_identifier_fields' => self::populatedAdAttributionFields($adAttribution),
        ]);

        $eventParams = [
            'transaction_id'       => $order->reference,
            // Shared with the browser Pixel purchase. Meta can use this stable value to
            // deduplicate browser and Conversions API copies of the same order.
            'event_id'             => $purchaseEventId,
            'cart_id'              => $order->id_cart,
            'value'                => round((float)$cart->getOrderTotal(false), 2),
            'currency'             => 'EUR',
            'tax'                  => round((float)($cart->getOrderTotal() - $cart->getOrderTotal(false)), 2),
            'shipping'             => round((float)$cart->getOrderTotal(false, Cart::ONLY_SHIPPING), 2),
            'coupon'               => $coupon,
            'items'                => $items,
            'session_type'         => $sessionType,
            'order_channel'        => $classification['order_channel'],
            'shop_id'              => $shopIdentity['shop_id'],
            'shop_name'            => $shopIdentity['shop_name'],
            'shop_domain'          => $shopIdentity['shop_domain'],
            // engagement_time_msec is required by GA4 MP for the event to count as an engaged session
            'engagement_time_msec' => 1,
        ];
        if (!empty($sessionId)) {
            $eventParams['session_id'] = $sessionId;
        }
        if ($checkoutTypes['shipping_tier'] !== '') {
            $eventParams['shipping_tier'] = $checkoutTypes['shipping_tier'];
        }
        if ($checkoutTypes['payment_type'] !== '') {
            $eventParams['payment_type'] = $checkoutTypes['payment_type'];
        }
        $pageLocation = self::gaPageLocation($order, $shopIdentity);
        if ($pageLocation !== '') {
            $eventParams['page_location'] = $pageLocation;
        }
        if ($trafficType !== '') {
            $eventParams['traffic_type'] = $trafficType;
        }

        $payload = [
            'client_id' => $clientId,
            'events' => [
                [
                    'name'   => 'purchase',
                    'params' => $eventParams,
                ],
            ],
        ];

        $url = rtrim($endpoint, '/')
            . '?measurement_id=' . rawurlencode($measurementId)
            . '&api_secret=' . rawurlencode($apiSecret);

        $maskedUrl = rtrim($endpoint, '/')
            . '?measurement_id=' . rawurlencode($measurementId)
            . '&api_secret=****';

        self::logPayment('GA4', 'payload', [
            'url'     => $maskedUrl,
            'payload' => $payload,
            'request_header_fields' => self::adAttributionHeaderNames(
                $adAttribution,
                $analyticsConsent === null ? null : (int)$analyticsConsent,
                $endpoint
            ),
        ]);

        $ch = curl_init($url);
        $responseHeaders = [];
        $requestHeaders = array_merge(
            ['Content-Type: application/json'],
            self::buildAdAttributionHeaders(
                $adAttribution,
                $analyticsConsent === null ? null : (int)$analyticsConsent,
                $purchaseEventId,
                $endpoint
            )
        );
        curl_setopt_array($ch, [
            CURLOPT_POST            => true,
            CURLOPT_POSTFIELDS      => json_encode($payload),
            CURLOPT_HTTPHEADER      => $requestHeaders,
            CURLOPT_USERAGENT       => 'ModernSmid-GA4/1.0 PrestaShop/' . _PS_VERSION_,
            CURLOPT_RETURNTRANSFER  => true,
            CURLOPT_TIMEOUT         => 5,
            // Do not forward destination-specific identifiers through an unexpected redirect.
            CURLOPT_FOLLOWLOCATION  => false,
            CURLOPT_HEADERFUNCTION  => function ($curl, $header) use (&$responseHeaders) {
                $trimmed = trim($header);
                if ($trimmed !== '' && strpos($trimmed, ':') !== false) {
                    $responseHeaders[] = $trimmed;
                }
                return strlen($header);
            },
        ]);
        $response  = curl_exec($ch);
        $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        self::logPayment('GA4', 'http_response', [
            'orderId'         => $orderId,
            'reference'       => $order->reference,
            'httpCode'        => $httpCode,
            'response'        => $response,
            'responseHeaders' => $responseHeaders ?: null,
            'curlError'       => $curlError ?: null,
        ]);

        PrestaShopLogger::addLog(
            'ModernHook GA4: purchase event sent for order ' . $order->reference
            . ' on state ' . $newStateId . ' (HTTP ' . $httpCode . ')',
            1,
            null,
            'Order',
            $orderId,
            true
        );
    }

    /**
     * Send a GA4 Measurement Protocol 'canceled' event when an order first reaches a configured cancel state.
     * Same deduplication logic as handleGa4PurchaseTracking.
     */
    private function handleGa4CanceledTracking(array $data): void
    {
        $newStateId = (int)$data['newOrderStatus']->id;
        $orderId    = (int)$data['id_order'];
        $order      = new Order($orderId);
        if (!Validate::isLoadedObject($order)) {
            self::logPayment('CANCEL', 'early_exit', ['reason' => 'order_not_loaded', 'orderId' => $orderId]);
            return;
        }

        $configScope = [(int)$order->id_shop, (int)$order->id_lang, (int)$order->id_shop_group];
        $measurementId   = self::getGa4Config('MSTHEMECONFIG_GA4_MEASUREMENT_ID', ...$configScope);
        $apiSecret       = self::getGa4Config('MSTHEMECONFIG_GA4_API_SECRET', ...$configScope);
        $cancelStatesRaw = self::getGa4Config('MSTHEMECONFIG_GA4_CANCEL_STATES', ...$configScope);
        $endpoint        = self::getGa4Config('MSTHEMECONFIG_GA4_ENDPOINT', ...$configScope)
            ?: 'https://www.google-analytics.com/mp/collect';

        self::logPayment('CANCEL', 'entry', [
            'orderId'         => $orderId,
            'shopId'          => (int)$order->id_shop,
            'newStateId'      => $newStateId,
            'cancelStatesRaw' => $cancelStatesRaw,
        ]);

        if (empty($measurementId) || empty($apiSecret) || empty($cancelStatesRaw)) {
            self::logPayment('CANCEL', 'early_exit', ['reason' => 'missing config']);
            return;
        }

        $trimmed = trim((string)$cancelStatesRaw);
        if ($trimmed !== '' && $trimmed[0] === '[') {
            $decoded = json_decode($trimmed, true);
            $cancelStates = is_array($decoded) ? $decoded : [];
        } else {
            $cancelStates = explode(',', $trimmed);
        }
        $cancelStates = array_values(array_filter(array_map('intval', $cancelStates)));

        if (!in_array($newStateId, $cancelStates, true)) {
            self::logPayment('CANCEL', 'early_exit', ['reason' => 'state_not_in_cancel_list', 'newStateId' => $newStateId]);
            return;
        }

        // As with purchase tracking, the current history row has not been persisted yet. Any row
        // matching any configured cancel state represents a canceled event already sent earlier.
        $priorCancelTriggerCount = (int)Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'order_history`
             WHERE `id_order` = ' . $orderId . '
             AND `id_order_state` IN (' . implode(',', $cancelStates) . ')'
        );

        self::logPayment('CANCEL', 'dedup_check', [
            'cancelStates'            => $cancelStates,
            'priorCancelTriggerCount' => $priorCancelTriggerCount,
            'will_fire'               => $priorCancelTriggerCount === 0,
        ]);

        if ($priorCancelTriggerCount > 0) {
            self::logPayment('CANCEL', 'early_exit', [
                'reason'                  => 'cancel_already_triggered',
                'priorCancelTriggerCount' => $priorCancelTriggerCount,
            ]);
            return;
        }

        $cancelRow = Db::getInstance()->getRow(
            'SELECT `ga_client_id`, `ga_session_id`, `ga_analytics_consent` FROM `' . _DB_PREFIX_ . 'orders` WHERE `id_order` = ' . $orderId
        );

        // Respect customer analytics consent — skip if explicitly declined.
        $cancelConsent = isset($cancelRow['ga_analytics_consent']) ? $cancelRow['ga_analytics_consent'] : null;
        if ($cancelConsent !== null && (int)$cancelConsent === 0) {
            self::logPayment('CANCEL', 'early_exit', ['reason' => 'analytics_consent_denied', 'orderId' => $orderId]);
            return;
        }

        $clientId  = !empty($cancelRow['ga_client_id'])  ? $cancelRow['ga_client_id']  : 'server-' . $orderId;
        $sessionId = !empty($cancelRow['ga_session_id']) ? (string)$cancelRow['ga_session_id'] : '';
        $classification = self::getOrderAnalyticsClassification($order);
        $shopIdentity = self::getOrderShopIdentity($order);
        $checkoutTypes = self::getOrderCheckoutTypes($order);

        $cancelParams = [
            'transaction_id'       => $order->reference,
            'cart_id'              => $order->id_cart,
            'currency'             => 'EUR',
            'value'                => round((float)$order->total_paid_tax_excl, 2),
            'session_type'         => $classification['order_channel'] === 'counter' ? 'counter' : 'customer',
            'order_channel'        => $classification['order_channel'],
            'shop_id'              => $shopIdentity['shop_id'],
            'shop_name'            => $shopIdentity['shop_name'],
            'shop_domain'          => $shopIdentity['shop_domain'],
            'engagement_time_msec' => 1,
        ];
        if (!empty($sessionId)) {
            $cancelParams['session_id'] = $sessionId;
        }
        if ($checkoutTypes['shipping_tier'] !== '') {
            $cancelParams['shipping_tier'] = $checkoutTypes['shipping_tier'];
        }
        if ($checkoutTypes['payment_type'] !== '') {
            $cancelParams['payment_type'] = $checkoutTypes['payment_type'];
        }
        $cancelPageLocation = self::gaPageLocation($order, $shopIdentity);
        if ($cancelPageLocation !== '') {
            $cancelParams['page_location'] = $cancelPageLocation;
        }
        $cancelTrafficType = ($classification['order_channel'] === 'backoffice' || $classification['is_test_order'])
            ? 'internal'
            : self::gaTrafficType($shopIdentity['shop_domain']);
        if ($cancelTrafficType !== '') {
            $cancelParams['traffic_type'] = $cancelTrafficType;
        }

        $payload = [
            'client_id' => $clientId,
            'events'    => [
                [
                    'name'   => 'canceled',
                    'params' => $cancelParams,
                ],
            ],
        ];

        $url = rtrim($endpoint, '/')
            . '?measurement_id=' . rawurlencode($measurementId)
            . '&api_secret=' . rawurlencode($apiSecret);

        self::logPayment('CANCEL', 'payload', ['reference' => $order->reference, 'payload' => $payload]);

        $ch = curl_init($url);
        $responseHeaders = [];
        curl_setopt_array($ch, [
            CURLOPT_POST            => true,
            CURLOPT_POSTFIELDS      => json_encode($payload),
            CURLOPT_HTTPHEADER      => ['Content-Type: application/json'],
            CURLOPT_USERAGENT       => 'ModernSmid-GA4/1.0 PrestaShop/' . _PS_VERSION_,
            CURLOPT_RETURNTRANSFER  => true,
            CURLOPT_TIMEOUT         => 5,
            CURLOPT_FOLLOWLOCATION  => true,
            CURLOPT_HEADERFUNCTION  => function ($curl, $header) use (&$responseHeaders) {
                $trimmed = trim($header);
                if ($trimmed !== '' && strpos($trimmed, ':') !== false) {
                    $responseHeaders[] = $trimmed;
                }
                return strlen($header);
            },
        ]);
        $response  = curl_exec($ch);
        $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        self::logPayment('CANCEL', 'http_response', [
            'orderId'         => $orderId,
            'httpCode'        => $httpCode,
            'response'        => $response,
            'responseHeaders' => $responseHeaders ?: null,
            'curlError'       => $curlError ?: null,
        ]);

        PrestaShopLogger::addLog(
            'ModernHook GA4: canceled event sent for order ' . $order->reference
            . ' on state ' . $newStateId . ' (HTTP ' . $httpCode . ')',
            1,
            null,
            'Order',
            $orderId,
            true
        );
    }

    /** Record completed customer registrations. */
    public function hookActionCustomerAccountAdd($customer): void
    {
        if (empty($customer['newCustomer']->id) || $customer['newCustomer']->is_guest) {
            return;
        }

        // An email entered at registration does not prove ownership of past guest
        // orders. Session/admin conversion retains the original customer ID and
        // its orders; fresh registrations must not claim orders by email alone.
        // Analytics: fire register event on next page load
        $_SESSION['analytics_account_event'] = 'register';
    }

    /**
     * Analytics: fire login event on next page load after successful authentication.
     */
    public function hookActionAuthentication(array $params): void
    {
        $_SESSION['analytics_account_event'] = 'login';
    }

    /**
     * Analytics: fire logout event on next page load after customer signs out.
     */
    public function hookActionCustomerLogoutBefore(array $params): void
    {
        $_SESSION['analytics_account_event'] = 'logout';
    }

    /**
     * Add house number and house number extension fields to address form
     *
     *
     * @param array $params
     *
     */
    public function hookActionCustomerAddressFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];

        $allFields = $formBuilder->all();
        foreach ($allFields as $inputField => $input) {
            $formBuilder->remove($inputField);
        }

        foreach ($allFields as $inputField => $input) {
            $formBuilder->add($input);
            if ($inputField == 'address1') {
                $formBuilder->add('house_number', TextType::class, [
                    'label' => $this->module->getTranslator()->trans('House Number', [],
                        'Modules.MsThemeConfig'),
                    'required' => true,
                ]);

                $formBuilder->add('house_number_extension', TextType::class,
                    [
                        'label' => $this->module->getTranslator()->trans('House Number Extension', [],
                            'Modules.MsThemeConfig'),
                        'required' => false,
                    ]);
            }
        }

        if (empty($params['id'])) {
            return;
        }

        $address = new Address($params['id']);

        $params['data']['house_number'] = $address->house_number;
        $params['data']['house_number_extension'] = $address->house_number_extension;

        $formBuilder->setData($params['data']);
    }

    /**
     *
     * @param array $params
     * @return array
     */
    public function hookDisplayAdditionalCustomerAddressFields(array $params): array
    {
        return [
            (new FormField())
                ->setName('house_number')
                ->setType('text')
                ->setRequired(true)
                ->setLabel($this->module->l('House Number')),
            (new FormField())
                ->setName('house_number_extension')
                ->setType('text')
                ->setLabel($this->module->l('House Number Extension')),
        ];
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     *     * @todo remove hook
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateCustomerAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     *
     * @todo remove hook
     * Update / Create custom address fields
     *
     * @param array $params
     *
     */
    private function updateCustomAddressFields(array $params): void
    {
        if (isset($params['form_data']) && (!empty($params['form_data']['house_number']) || !empty($params['form_data']['house_number_extension']))) {
            $addressId = (int)$params['id'];
            $addressFormData = $params['form_data'];

            // If we have an address_type, it's likely an Order Address edit where $params['id'] is orderId
            if (isset($addressFormData['address_type'])) {
                $orderId = $addressId;
                $addressType = $addressFormData['address_type'];

                $order = new Order($orderId);
                if (Validate::isLoadedObject($order)) {
                    $addressId = ($addressType === 'delivery_address') ? $order->id_address_delivery : $order->id_address_invoice;
                } else {
                    return; // Invalid order
                }
            }

            // Load and update the address
            if ($addressId) {
                $address = new Address($addressId);
                if (Validate::isLoadedObject($address)) {
                    if (isset($addressFormData['house_number'])) {
                        $address->house_number = $addressFormData['house_number'];
                    }
                    if (isset($addressFormData['house_number_extension'])) {
                        $address->house_number_extension = $addressFormData['house_number_extension'];
                    }
                    $address->update();
                }
            }
        }
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateCustomerAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     *
     * @throws PrestaShopException
     * @throws PrestaShopException
     */
    public function hookActionFrontControllerSetMedia(): bool

    {
        try {
            $ms = $this->getMsPayload();
        } catch (\Throwable $e) {
            $ms = ['config' => []];
        }
        // Provide $ms.* data for templates and JS
        try {
            // Provide frequently used configuration values to templates
            // Expose to Smarty and JS
            if ($this->context->smarty) {
                try {
                    $existingSmartyMsData = $this->context->smarty->tpl_vars['ms'] ?? [];
                    if (!$existingSmartyMsData) {
                        $this->context->smarty->assign('ms', $ms);
                    } else {
                        // Merge existing data with new data
                        $mergedData = array_merge($existingSmartyMsData->value, $ms);
                        $this->context->smarty->assign('ms', $mergedData);
                    }
                } catch (\Throwable $e) {
                    $this->context->smarty->assign('ms', $ms);
                }
            }
            Media::addJsDef(['ms' => $ms]);

        } catch (\Throwable $e) {
            // fail silently to avoid breaking FO
        }

        $reviewPage = Configuration::get('IJZERSHOPKIYOH_REVIEW_PAGE', $this->idLang, $this->idShop, $this->idShopGroup);
        $min = ''; // Can be adjusted if minification logic is needed

        if (Dispatcher::getInstance()->getController() == 'cart') {
            $this->controller->registerJavascript('tinymce', 'js/tiny_mce/tinymce.min.js', ['priority' => 200, 'attribute' => 'defer']);
        } elseif (Dispatcher::getInstance()->getController() == 'cms') {
            $cms = $this->controller->getCms();
            if ($cms && (int)$cms->id == (int)$reviewPage) {
                $this->controller->registerJavascript(
                    'module-msthemeconfig-kiyohxmlconvertjs',
                    'modules/' . $this->module->name . '/views/js/xmlconvert' . $min . '.js',
                    [
                        'priority' => 200,
                        'attribute' => 'defer',
                    ]
                );

                $this->controller->registerJavascript(
                    'msthemeconfig-kiyohjs',
                    'modules/' . $this->module->name . '/views/js/ijzershopkiyoh' . $min . '.js',
                    [
                        'priority' => 200,
                        'attribute' => 'defer'
                    ]
                );

                $this->controller->registerStyleSheet(
                    'module-msthemeconfig-kiyohstyle',
                    'modules/' . $this->module->name . '/views/css/ijzershopkiyoh' . $min . '.css');
            }
        }
        return true;
    }

    /**
     * Build the full $ms payload, utilizing cache for static parts
     *
     * @return array
     */
    private function getMsPayload(): array
    {
        $static = $this->getMsStaticPayload();

        $shop = $this->context->shop;
        $link = $this->context->link;
        $cart = $this->context->cart;
        $customer = $this->context->customer ?: new \Customer();
        $currency = $this->context->currency ?: new \Currency((int)Configuration::get('PS_CURRENCY_DEFAULT'));

        $countryName = '';
        try {
            $country = $this->context->country ?: new \Country((int)Configuration::get('PS_COUNTRY_DEFAULT'), $this->idLang);
            $countryName = is_array($country->name) ? ($country->name[$this->idLang] ?? '') : (string)$country->name;
        } catch (\Throwable $e) {
        }

        // Totals from cart
        $nbProducts = 0;
        $totalIncl = 0.0;
        $totalExcl = 0.0;
        $productsTotalIncl = 0.0;
        $productsTotalExcl = 0.0;
        $shippingIncl = 0.0;
        $shippingExcl = 0.0;
        $discounts = 0.0;
        $cartTotalOrder = 0.0;
        $cartProducts = [];

        try {
            $nbProducts = ($cart ? (int)$cart->nbProducts() : 0);
            $totalIncl = $cart ? (float)$cart->getOrderTotal(true) : 0.0;
            $totalExcl = $cart ? (float)$cart->getOrderTotal(false) : 0.0;
            $productsTotalIncl = $cart ? (float)$cart->getOrderTotal(true, \Cart::ONLY_PRODUCTS) : 0.0;
            $productsTotalExcl = $cart ? (float)$cart->getOrderTotal(false, \Cart::ONLY_PRODUCTS) : 0.0;
            $shippingIncl = $cart ? (float)$cart->getOrderTotal(true, \Cart::ONLY_SHIPPING) : 0.0;
            $shippingExcl = $cart ? (float)$cart->getOrderTotal(false, \Cart::ONLY_SHIPPING) : 0.0;
            $discounts = $cart ? (float)$cart->getOrderTotal(true, \Cart::ONLY_DISCOUNTS) : 0.0;
            $cartTotalOrder = $cart ? (float)$cart->getOrderTotal() : 0.0;
            $cartProducts = $cart ? $cart->getProducts() : [];
        } catch (\Throwable $e) {
            // Log if possible or fail silently to avoid breaking FO
        }

        $format = function ($amount) use ($currency) {
            if (!$this->context->currentLocale) {
                return (string)$amount;
            }
            return $this->context->currentLocale->formatPrice((float)$amount, $currency->iso_code);
        };

        // Country & Zone for shipping zekereheden
        $carrier = Carrier::getCarrierByReference(2, (int)$this->idLang);
        $priceZone = 0.0;
        try {
            $zoneId = (int)($this->context->country->id_zone ?? 0);
            if ($carrier && $zoneId) {
                $priceZone = (float)$carrier->getMaxDeliveryPriceByPrice($zoneId);
            }
        } catch (\Throwable $e) {
        }
        $priceInclConverted = Tools::convertPrice($priceZone);
        if(((string)($this->context->cookie->price_vat_settings_incl ?? 'true')) !== 'false'){
            $priceInclConverted = (float)$priceInclConverted*1.21;
        }

        $priceFormatted = number_format((float)$priceInclConverted, 2, ',', '.');

        $dynamic = [
            'cart_nb_products' => $nbProducts,
            'customer' => [
                'is_logged' => (bool)($customer && (int)$customer->id > 0),
                'id' => (int)($customer->id ?? 0),
                'firstname' => (string)($customer->firstname ?? ''),
                'lastname' => (string)($customer->lastname ?? ''),
                'email' => (string)($customer->email ?? ''),
                'is_guest' => (bool)($customer->is_guest ?? false),
                'country_name' => $countryName,
                'country_iso' => (string)($this->context->country->iso_code ?? ''),
            ],
            'currency' => [
                'id' => (int)($currency->id ?? 0),
                'iso_code' => (string)($currency->iso_code ?? 'EUR'),
                'name' => (string)($currency->name ?? ''),
                'sign' => (string)($currency->sign ?? '€'),
            ],
            'cart' => [
                'id' => (int)($cart->id ?? 0),
                'nb_products' => $nbProducts,
                'currency_iso' => (string)($currency->iso_code ?? 'EUR'),
                'products' => $cartProducts,
                'totals' => [
                    'total_incl' => $totalIncl,
                    'total_excl' => $totalExcl,
                    'products_incl' => $productsTotalIncl,
                    'products_excl' => $productsTotalExcl,
                    'shipping_incl' => $shippingIncl,
                    'shipping_excl' => $shippingExcl,
                    'discounts' => $discounts,
                    'total_order' => $cartTotalOrder,
                    'formatted' => [
                        'total_incl' => $format($totalIncl),
                        'total_excl' => $format($totalExcl),
                        'products_incl' => $format($productsTotalIncl),
                        'products_excl' => $format($productsTotalExcl),
                        'shipping_incl' => $format($shippingIncl),
                        'shipping_excl' => $format($shippingExcl),
                        'discounts' => $format($discounts),
                    ],
                ],
            ],
            'ip_address' => Tools::getRemoteAddr(),
            'withTax' => ((string)($this->context->cookie->price_vat_settings_incl ?? 'true')) !== 'false',
            'cart_total_products_tax_incl' => $productsTotalIncl,
            'cart_total_products_tax_incl_formatted' => $format($productsTotalIncl),
        ];


        // Update shipping banner with dynamic country/price
        $zekerheden = $static['zekerheden'] ?? [];
        if (isset($zekerheden['fourth'])) {
            $zekerheden['fourth']['country'] = $countryName;
            $zekerheden['fourth']['price'] = $priceInclConverted;
            $zekerheden['fourth']['price_formatted'] = $priceFormatted;
            $zekerheden['fourth']['title'] = sprintf($zekerheden['fourth']['title_raw'], $countryName, $priceFormatted);
            $zekerheden['fourth']['text'] = sprintf($zekerheden['fourth']['text_raw'], $countryName, $priceFormatted);
            $dynamic['zekerheden'] = $zekerheden;
        }

        return array_replace_recursive($static, $dynamic);
    }

    /**
     * Build static/config parts of $ms payload and cache it
     *
     * @return array
     */
    private function getMsStaticPayload(): array
    {
        $cacheId = 'ModernHook::getMsStaticPayload_' . (int)$this->idLang . '_' . (int)$this->idShop;
        if (Cache::isStored($cacheId)) {
            return Cache::retrieve($cacheId);
        }

        $shop = $this->context->shop;
        $link = $this->context->link;
        $shopName = isset($shop->name) ? (string)$shop->name : '';

        $get = function (string $key, $default = '') {
            $normalized = str_starts_with($key, 'MSTHEMECONFIG_') ? $key : ('MSTHEMECONFIG_' . $key);
            $value = Configuration::get($normalized, $this->idLang, $this->idShopGroup, $this->idShop);
            if ($value === null || $value === '') {
                if (str_starts_with($normalized, 'MSTHEMECONFIG_')) {
                    $legacy = 'MSTHEMECONFIG_' . substr($normalized, strlen('MSTHEMECONFIG_'));
                    $value = Configuration::get($legacy, $this->idLang, $this->idShopGroup, $this->idShop);
                }
            }
            return ($value === null || $value === '') ? $default : $value;
        };

        $gtmServerUrl = self::resolveGtmServerUrl(
            (string)$get('GTM_SERVER_URL', ''),
            (string)$get('GA4_ENDPOINT', '')
        );

        $ms = [
            'show_payment_error_checkout' => $get('MSTHEMECONFIG_SHOW_PAYMENT_ERROR_CHECKOUT', false),
            'favicon_shop' => $get('MSTHEMECONFIG_FAVICON_SHOP', 'IJ'),
            'primary_color' => $get('PRIMARY_COLOR', '#3b56ad'),
            'contact_information_page' => $get('CONTACTPAGE_CONTACTINFORMATION_PAGE'),
            'contact_offer_page' => $get('CONTACTPAGE_CONTACTOFFER_PAGE'),
            'footer_leverinsvoorwaarden' => Context::getContext()->link->getCMSLink(10),
            'footer_herroepingsrecht' => Context::getContext()->link->getCMSLink(13),
            'footer_privacy' => Context::getContext()->link->getCMSLink($get('MSTHEMECONFIG_CONTACTPAGE_PRIVACY')),
            'footer_garantie' => Context::getContext()->link->getCMSLink(12),
            'footer_payment' => Context::getContext()->link->getCMSLink(15),
            'footer_avg' => Context::getContext()->link->getCMSLink($get('MSTHEMECONFIG_AVG_INFO_PAGE')),
            'footer_aboutus' => Context::getContext()->link->getCMSLink(18),
            'header_whatsapp_link' => $get('HEADER_WHATSAPP_LINK'),
            'header_whatsapp_text' => $get('HEADER_WHATSAPP_TEXT'),
            'header_phone_link' => $get('HEADER_PHONENUMBER_LINK'),
            'header_phone_text' => $get('HEADER_PHONENUMBER_TEXT'),
            'header_mail_text' => $get('HEADER_MAIL_TEXT'),
            'test_websites' => $get('TEST_WEBSITES', []),
            'is_ps_shoppingcart_enabled' => (bool)Module::isEnabled('ps_shoppingcart'),
            'is_ps_categorytree_enabled' => (bool)Module::isEnabled('ps_categorytree'),
            'is_ps_searchbar_enabled' => (bool)Module::isEnabled('ps_searchbar'),
            'is_dynamicproduct_enabled' => (bool)Module::isEnabled('dynamicproduct'),
            'shop' => [
                'name' => $shopName,
                'email' => Configuration::get('PS_SHOP_EMAIL'),
                'domain_ssl' => $shop->domain_ssl,
            ],
            'analytics' => [
                // Shop-scoped origin only; no secret and no endpoint path. head.tpl uses this
                // for the GTM loader, so every storefront can use its own first-party host.
                'gtm_server_url' => $gtmServerUrl,
            ],
            'language' => [
                'id' => (int)$this->idLang,
                'name' => (string)($this->context->language->name ?? ''),
                'iso_code' => (string)($this->context->language->iso_code ?? ''),
            ],
            'urls' => [
                'cart_update' => $link ? $link->getPageLink('cart', true, null, 'action=update') : '/cart?action=update',
                'cart_url' => $link ? $link->getPageLink('cart', true, null, 'action=show') : '/cart?action=show',
            ],
            'clarity_id' => $get('CLARITY_ID', '7bu3k08a1u'),
            'tawkto_widget_id' => $get('TAWKTO_WIDGET_ID', '1gb4md3r7'),
            'store_phone' => $get('FOOTERTOP_STOREINFO_PHONE'),
            'store_google_string' => $get('FOOTERTOP_STOREINFO_GOOGLE_STRING'),
            'category_image_size' => $get('CATEGORY_IMAGE_SIZE', 'col-sm-4 col-md-2'),
            'catalog_mode' => (bool)Configuration::get('PS_CATALOG_MODE'),
            'catalog_mode_with_prices' => (bool)Configuration::get('PS_CATALOG_MODE_WITH_PRICES'),
            'stock_management' => (bool)Configuration::get('PS_STOCK_MANAGEMENT'),
            'is_specific_price_enabled' => (bool)Module::isEnabled('specificprice'),
            'saw_and_cut' => $this->getSawCutConfig(),
            'addtoorder_method' => Configuration::get('ADDTOORDER_DELIVERY_METHOD'),
            'customer' => [
                'selected_delivery_country' => (int)$this->context->cart->getDeliveryCountry(),
                'accepted_vat_be' => (bool)$this->context->cookie->accepted_vat_be,
                'accepted_shipping_msg' => (bool)$this->context->cookie->accepted_shipping_msg,
            ]
        ];
        $multistoreShops = [];
        try {
            $shops = \Shop::getShops(true, null, false);
            foreach ($shops as $shopData) {
                $shopId = (int)$shopData['id_shop'];
                $shopObj = new \Shop($shopId);
                $baseUrl = $shopObj->getBaseURL(true);
                if (!$baseUrl) {
                    $baseUrl = $shopObj->getBaseURL(false);
                }
                $logoFile = Configuration::get('PS_LOGO', $this->idLang, (int)$shopData['id_shop_group'], $shopId);
                $logoUrl = $baseUrl ? ($baseUrl . 'img/' . $logoFile) : '';

                $multistoreShops[] = [
                    'id' => $shopId,
                    'name' => (string)$shopData['name'],
                    'url' => $baseUrl ?: '',
                    'logo' => $logoUrl,
                    'logo_file' => (string)$logoFile,
                ];
            }
        } catch (\Throwable $e) {
            $multistoreShops = [];
        }

        $ms['multistore'] = [
            'current_shop_id' => (int)$this->idShop,
            'shops' => $multistoreShops,
        ];


        $ms['test_websites_array'] = array_filter(array_map('trim', explode(',', (string)$ms['test_websites'])));

        // Kiyoh data
        $ms['kiyoh'] = $this->getKiyohDataForMs();

        // Config block
        $confKeys = [
            'PS_CATALOG_MODE', 'PS_CATALOG_MODE_WITH_PRICES', 'SHOW_PRODUCT_FEATURES', 'PS_WEIGHT_UNIT',
            'MSTHEMECONFIG_CATEGORY_SHOW_PRODUCT_PAGE', 'MSTHEMECONFIG_CATEGORY_BOTTOM_TEXT',
            'MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME', 'MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME_SKIPPING_DATES',
            'MSTHEMECONFIG_AI_FRONTEND_ENABLED', 'MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE',
            'MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_TEXT', 'MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_TEXT',
            'MSTHEMECONFIG_CONTACTPAGE_CONTACTRETOUR_TEXT', 'MSTHEMECONFIG_MY_ACCOUNT_LANDING_TEXT',
            'MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE', 'ADDTOORDER_ORDER_STATUSES',
            'SMALLORDERFEE_MIN_AMOUNT', 'SMALLORDERFEE_ORDER_FEE', 'SMALLORDERFEE_ORDER_FEE_LABEL',
            'MSTHEMECONFIG_FEATURE_ENABLED', 'MSTHEMECONFIG_FEATURE_WIDTH', 'MSTHEMECONFIG_FEATURE_HEIGHT',
            'MSTHEMECONFIG_FEATURE_LENGTH', 'MSTHEMECONFIG_FEATURE_WEIGHT', 'MSTHEMECONFIG_HOMEPAGE_TEXT',
            'MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES', 'MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED',
            'MSTHEMECONFIG_HOMEPAGE_TEXT_BACKGROUND', 'MSTHEMECONFIG_HOMEPAGE_BACKGROUND_COLOR',
            'MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES', 'MSTHEMECONFIG_SHOP_NOTIFICATION_TYPE',
            'MSTHEMECONFIG_SHOP_NOTIFICATION_TEXT', 'MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE',
            'MSTHEMECONFIG_FOOTERTOP_ABOUTUS_HEADER', 'MSTHEMECONFIG_FOOTERTOP_ABOUTUS_TEXT',
            'MSTHEMECONFIG_FOOTERTOP_ABOUTUS_LINK', 'MSTHEMECONFIG_INFORMATION_FOOTERTOP_BOX_ACTIVE',
            'MSTHEMECONFIG_FOOTERTOP_INFORMATION_HEADER', 'MSTHEMECONFIG_FOOTERTOP_INFORMATION',
            'MSTHEMECONFIG_PARTNERS_FOOTERTOP_BOX_ACTIVE', 'MSTHEMECONFIG_FOOTERTOP_PARTNERS_HEADER',
            'MSTHEMECONFIG_FOOTERTOP_PARTNERS', 'MSTHEMECONFIG_STORE_INFORMATION_FOOTERTOP_BOX_ACTIVE',
            'MSTHEMECONFIG_FOOTERTOP_STOREINFO_LINK', 'MSTHEMECONFIG_FOOTERTOP_STOREINFO_OPENED',
            'MSTHEMECONFIG_FOOTERTOP_STOREINFO_GOOGLE_STRING', 'MSTHEMECONFIG_FOOTERTOP_STOREINFO_ADDRESS',
            'MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE', 'MSTHEMECONFIG_FOOTERTOP_STOREINFO_WHATSAPP',
            'MSTHEMECONFIG_HEADER_WHATSAPP_LINK', 'MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE',
            'MSTHEMECONFIG_HEADER_MAIL_TEXT', 'MSTHEMECONFIG_WHATSAPP_TEXT', 'MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE',
            'MSTHEMECONFIG_FIRST_FOOTERBOTTOM_BOX_ACTIVE', 'MSTHEMECONFIG_FOOTERBOTTOM_FIRST_LINK',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TITLE', 'MSTHEMECONFIG_FOOTERBOTTOM_FIRST_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TEXT', 'MSTHEMECONFIG_SECOND_FOOTERBOTTOM_BOX_ACTIVE',
            'MSTHEMECONFIG_FOOTERBOTTOM_SECOND_LINK', 'MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TITLE',
            'MSTHEMECONFIG_FOOTERBOTTOM_SECOND_IMAGE', 'MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TEXT',
            'MSTHEMECONFIG_THIRD_FOOTERBOTTOM_BOX_ACTIVE', 'MSTHEMECONFIG_FOOTERBOTTOM_THIRD_LINK',
            'MSTHEMECONFIG_FOOTERBOTTOM_THIRD_TITLE', 'MSTHEMECONFIG_FOOTERBOTTOM_THIRD_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_THIRD_TEXT', 'MSTHEMECONFIG_FOURTH_FOOTERBOTTOM_BOX_ACTIVE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_LINK', 'MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_TITLE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_IMAGE', 'MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_TEXT',
            'MSTHEMECONFIG_FIFTH_FOOTERBOTTOM_BOX_ACTIVE', 'MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_LINK',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TITLE', 'MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TEXT',
        ];

        $ms['config'] = [];
        foreach ($confKeys as $k) {
            $ms['config'][$k] = Configuration::get($k, $this->idLang, $this->idShopGroup, $this->idShop);
        }

        // Normalize arrays
        $arrayKeys = [
            'MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES', 'MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED',
            'MSTHEMECONFIG_FEATURE_ENABLED', 'MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES','ADDTOORDER_ORDER_STATUSES',
        ];
        foreach ($arrayKeys as $ak) {
            if (!isset($ms['config'][$ak])) continue;
            $val = $ms['config'][$ak];
            $arr = is_array($val) ? $val : [];
            if (is_string($val)) {
                $trim = trim($val);
                $parsedJson = false;
                if ($trim !== '' && ($trim[0] === '[' || $trim[0] === '{')) {
                    $decoded = json_decode($trim, true);
                    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                        $arr = $decoded;
                        $parsedJson = true;
                    }
                }
                if (!$parsedJson && empty($arr) && strpos($trim, ',') !== false) {
                    $arr = array_filter(array_map('trim', explode(',', $trim)));
                }
                if (!$parsedJson && empty($arr) && $trim !== '') {
                    $arr = [$trim];
                }
            }
            $ms['config'][$ak] = array_map(function($v){ return ctype_digit((string)$v) ? (int)$v : $v; }, (array)$arr);
        }

        // Homepage categories
        $homePageCatgeories = [];

        foreach ((array)($ms['config']['MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED'] ?? []) as $index => $cat) {
            try {
                $category = Category::getCategoryInformation([$cat], $this->idLang);
                if (!isset($category[$cat])) {
                    continue;
                }
                $homePageCatgeories[] = [
                    'index' => $index,
                    'name' => $category[$cat]['name'],
                    'link_rewrite' => $link->getCategoryLink($category[$cat]['id_category'], $category[$cat]['link_rewrite'], $category[$cat]['id_lang']),
                    'image' => $link->getCatImageLink($category[$cat]['link_rewrite'], $category[$cat]['id_category'], 'category_default'),
                    'id_category' => $category[$cat]['id_category'],
                    'id_lang' => $category[$cat]['id_lang']
                ];
            } catch (\Throwable $e) {
                // skip deleted/missing category
            }
        }
        $ms['config']['MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES'] = $homePageCatgeories;

        // Banner (zekerheden) - Static parts
        $ms['zekerheden'] = [
            'first' => [
                'active' => (bool)$get('FIRST_BOX_ACTIVE'),
                'link' => $link ? $link->getCMSLink((int)$get('BANNER_FIRST_LINK')) : '#',
                'image' => (string)$get('BANNER_FIRST_IMAGE'),
                'title' => (string)$get('BANNER_FIRST_TITLE'),
                'text' => (string)$get('BANNER_FIRST_TEXT'),
            ],
            'second' => [
                'active' => (bool)$get('SECOND_BOX_ACTIVE'),
                'link' => '/' . ltrim((string)$get('BANNER_SECOND_LINK'), '/'),
                'image' => (string)$get('BANNER_SECOND_IMAGE'),
                'title' => (string)$get('BANNER_SECOND_TITLE'),
                'text' => (string)$get('BANNER_SECOND_TEXT'),
            ],
            'third' => [
                'active' => (bool)$get('THIRD_BOX_ACTIVE'),
                'link' => $link ? $link->getCMSLink((int)$get('BANNER_THIRD_LINK')) : '#',
                'image' => (string)$get('BANNER_THIRD_IMAGE'),
                'title' => (string)$get('BANNER_THIRD_TITLE'),
                'text' => (string)$get('BANNER_THIRD_TEXT'),
            ],
            'fourth' => [
                'active' => (bool)$get('FOURTH_BOX_ACTIVE'),
                'link' => $link ? $link->getCMSLink((int)$get('BANNER_FOURTH_LINK')) : '#',
                'image' => (string)$get('BANNER_FOURTH_IMAGE'),
                'title_raw' => (string)$get('BANNER_FOURTH_TITLE'),
                'text_raw' => (string)$get('BANNER_FOURTH_TEXT'),
            ],
            'fifth' => [
                'active' => (bool)($get('FIFTH_BOX_ACTIVE') ?: $get('FIFT_BOX_ACTIVE')),
                'link' => '/' . ltrim((string)$get('BANNER_FIFTH_LINK'), '/'),
                'image' => (string)$get('BANNER_FIFTH_IMAGE'),
                'title' => (string)$get('BANNER_FIFTH_TITLE'),
                'text' => (string)$get('BANNER_FIFTH_TEXT'),
            ],
        ];
        $ms['zekerheden']['any_active'] = array_reduce($ms['zekerheden'], function($carry, $item){ return $carry || ($item['active'] ?? false); }, false);

        Cache::store($cacheId, $ms);
        return $ms;
    }

    private function getKiyohDataForMs(): array
    {
        $kiyohCacheId = 'ModernHook::kiyoh_data_' . (int)$this->idLang . '_' . (int)$this->idShop;
        if (Cache::isStored($kiyohCacheId)) {
            return Cache::retrieve($kiyohCacheId);
        }

        $query = "SELECT * FROM `" . _DB_PREFIX_ . "kiyoh_custom` WHERE `id` = '1'";
        try {
            $kiyohResults = Db::getInstance()->executeS($query, true, true);
        } catch (\Exception $exception) {
            $kiyohResults = [];
        }

        if (!empty($kiyohResults) && isset($kiyohResults[0])) {
            $latestFeed = $kiyohResults[0]['kiyoh_latest_feed'] ?? null;
            $latestReviews = [];
            if ($latestFeed !== null) {
                $decodedFeed = json_decode($latestFeed, true);
                $latestReviews = is_array($decodedFeed) ? array_slice($decodedFeed, 0, 5) : [];
            }
            $data = [
                'averageRating' => (float)($kiyohResults[0]['kiyoh_average'] ?? 0),
                'averageRatingPercentage' => (float)($kiyohResults[0]['kiyoh_average_percentage'] ?? 0),
                'totalReviews' => (int)($kiyohResults[0]['kiyoh_comments_total'] ?? 0),
                'lastUpdated' => $kiyohResults[0]['kiyoh_updated'] ?? null,
                'latestFeed' => $latestReviews
            ];
        } else {
            $data = [
                'averageRating' => 0, 'averageRatingPercentage' => 0, 'totalReviews' => 0,
                'lastUpdated' => null, 'latestFeed' => null
            ];
        }
        Cache::store($kiyohCacheId, $data);
        return $data;
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws SmartyException
     * @throws \PrestaShopDatabaseException
     */
    public function hookKiyohBanner()
    {
        $cacheId = 'ModernHook::hookKiyohBanner_' . (int)$this->idLang . '_' . (int)$this->idShop;
        if (Cache::isStored($cacheId)) {
            return Cache::retrieve($cacheId);
        }

        $attr = [];

        $query = "SELECT * FROM `" . _DB_PREFIX_ . "kiyoh_custom` WHERE `id` = '1'";
        try {
            $results = Db::getInstance()->executeS($query, true, true);
        } catch (\Exception $exception) {
            $results = [];
        }

        if (empty($results) || !$results) {
            $attr = [
                'averageRating' => 10,
                'averageRatingPercentage' => 99,
                'totalReviews' => 2400,
            ];
        } else {
            $attr = [
                'averageRating' => (float)($results[0]['kiyoh_average'] ?? 0),
                'averageRatingPercentage' => (float)($results[0]['kiyoh_average_percentage'] ?? 0),
                'totalReviews' => (int)($results[0]['kiyoh_comments_total'] ?? 0),
            ];
        }
        // Decide if we should refresh from API: if no record or older than 7 days
        $needsRefresh = true;
        $lastUpdated = null;
        if (!empty($results) && isset($results[0]['kiyoh_updated'])) {
            $lastUpdated = strtotime((string)$results[0]['kiyoh_updated']);
        }
        if (!empty($results) && $lastUpdated !== false && $lastUpdated !== null) {
            $needsRefresh = (time() - (int)$lastUpdated) > (7 * 24 * 60 * 60);
        }
        if (empty($results)) {
            $needsRefresh = true;
        }

        if ($needsRefresh) {
            try {
                // Read configuration set in the kiyoh-panel (adjust keys to your config storage)
                $kiyohApiKey    = (string)Configuration::get('IJZERSHOPKIYOH_TOKEN', $this->idLang, $this->idShop, $this->idShopGroup);
                $timeout        = 2.5; // seconds
                if (!empty($kiyohApiKey)) {
                    // JKetelaar/PHP-Kiyoh-API usage (basic pattern)
                    $kiyoh = new \JKetelaar\Kiyoh\Kiyoh($kiyohApiKey, 100);
                    $summary = $kiyoh->getCompany();

                    // Extract values safely; API library returns objects/arrays depending on version
                    $apiAverage = null;
                    $apiAveragePct = null;
                    $apiTotal = null;

                    if (is_object($summary)) {
                        // Common getters — adjust if your installed version differs
                        if (method_exists($summary, 'getAverageRating')) {
                            $apiAverage = (float)$summary->getAverageRating();
                        }
                        if (method_exists($summary, 'getPercentageRecommendation')) {
                            $apiAveragePct = (float)$summary->getPercentageRecommendation();
                        }
                        if (method_exists($summary, 'getNumberReviews')) {
                            $apiTotal = (int)$summary->getNumberReviews();
                        }
                    } elseif (is_array($summary)) {
                        $apiAverage = isset($summary['average_rating']) ? (float)$summary['average_rating'] : null;
                        $apiAveragePct = isset($summary['average_rating_percentage']) ? (float)$summary['average_rating_percentage'] : null;
                        $apiTotal = isset($summary['total_reviews']) ? (int)$summary['total_reviews'] : null;
                    }

                    // Only overwrite if API returned meaningful data
                    $gotMeaningfulData = false;
                    if ($apiTotal !== null && $apiTotal > 0) {
                        $attr['totalReviews'] = $apiTotal;
                        $gotMeaningfulData = true;
                    }
                    if ($apiAverage !== null && $apiAverage > 0) {
                        $attr['averageRating'] = $apiAverage;
                        $gotMeaningfulData = true;
                    }
                    if ($apiAveragePct !== null && $apiAveragePct > 0) {
                        $attr['averageRatingPercentage'] = $apiAveragePct;
                        $gotMeaningfulData = true;
                    }
                    // If we received meaningful data, persist it to the database
                    if ($gotMeaningfulData) {
                        try {
                            $avg = (float)$attr['averageRating'];
                            $avgPct = (float)$attr['averageRatingPercentage'];
                            $total = (int)$attr['totalReviews'];
                            $reviews = $summary->getReviews();
                            try {
                                $reviewsJson = KiyohReviewSerializer::toJson($reviews);
                            } catch (\Throwable $e) {
                                // If review processing fails, store empty array
                                $reviewsJson = '[]';
                            }
                            $now = date('Y-m-d H:i:s');


                            // Ensure record exists; if not, insert it
                            if (empty($results)) {
                                $insertQuery = "INSERT INTO `" . _DB_PREFIX_ . "kiyoh_custom` (`id`, `kiyoh_average`, `kiyoh_average_percentage`, `kiyoh_comments_total`, `kiyoh_updated`,`kiyoh_latest_feed`) VALUES ('1', " . (float)$avg . ", " . (float)$avgPct . ", " . (int)$total . ", '" . pSQL($now) . "', '" . pSQL($reviewsJson) . "')";
                                Db::getInstance()->execute($insertQuery);
                            } else {
                                $updateQuery = "UPDATE `" . _DB_PREFIX_ . "kiyoh_custom` SET `kiyoh_average` = " . (float)$avg . ", `kiyoh_average_percentage` = " . (float)$avgPct . ", `kiyoh_comments_total` = " . (int)$total . ", `kiyoh_updated` = '" . pSQL($now) . "', `kiyoh_latest_feed` = '" . pSQL($reviewsJson) . "' WHERE `id` = '1'";
                                Db::getInstance()->execute($updateQuery);
                            }
                        } catch (\Throwable $persistEx) {
                            // Do not break rendering if persisting fails
                        }
                    }
                }
            } catch (\Throwable $e) {
                // Skip on any failure (timeouts, network, parse, library exceptions)
                // Optionally log: PrestaShopLogger::addLog('Kiyoh API error: '.$e->getMessage(), 2);
            }
        }

        $grade = ((float)$attr['averageRating'] == 0) ? 10 : (float)$attr['averageRating'];

        $rating = [
            '@context' => 'https://schema.org/',
            '@type' => 'AggregateRating',
            'ratingValue' => (float)$grade / 2,
            'reviewCount' => (int)$attr['totalReviews'] + 1,
        ];

        $idCarrier = Carrier::resolveCarrierIdFromConfig((int) Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER', $this->idLang, $this->idShop, $this->idShopGroup, 1));
        $carrier = new Carrier($idCarrier);
        $idZone = (int)($this->context->country->id_zone ?? 0);
        if ($idZone === 0) {
            $defaultCountry = new \Country((int)Configuration::get('PS_COUNTRY_DEFAULT'));
            $idZone = (int)$defaultCountry->id_zone;
        }

        $defaultShippingPrice = 0;
        if (Validate::isLoadedObject($carrier)) {
            if ($carrier->getShippingMethod() == Carrier::SHIPPING_METHOD_WEIGHT) {
                $defaultShippingPrice = (float)$carrier->getDeliveryPriceByWeight(1.00, $idZone);
            } else {
                $defaultShippingPrice = (float)$carrier->getDeliveryPriceByPrice(1.00, $idZone);
            }
        }

        if ((float)$defaultShippingPrice === 0.0 || $defaultShippingPrice === false) {
             $defaultShippingPrice = (float)$carrier->getMaxDeliveryPriceByWeight($idZone);
        }

        if ((float)$defaultShippingPrice === 0.0 || $defaultShippingPrice === false) {
             $defaultShippingPrice = (float)$carrier->getMaxDeliveryPriceByPrice($idZone);
        }

        $attr['defaultShippingPrice'] = $defaultShippingPrice;
        $withTax = ((string)$this->context->cookie->price_vat_settings_incl) !== 'false';
        if ($withTax) {
            $shippingPriceIncl = Tools::convertPrice($defaultShippingPrice * 1.21);
            $attr['shippingPriceText'] = '€ ' . number_format((float)$shippingPriceIncl, 0, ',', '.') . ',-';
        } else {
            $shippingPriceExcl = Tools::convertPrice($defaultShippingPrice);
            $attr['shippingPriceText'] = '€ ' . number_format((float)$shippingPriceExcl, 2, ',', '.');
        }

        $attr['shippingPage'] = Context::getContext()->link->getCMSLink(
            Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK', $this->idLang, $this->idShop, $this->idShopGroup),
            null,
            null,
            $this->idLang,
            $this->idShop
        );
        $attr['rating'] = json_encode($rating, JSON_UNESCAPED_SLASHES);

        $this->context->smarty->assign('attr', $attr);

        $result = $this->context->smarty->fetch(_PS_MODULE_DIR_ . $this->module->name . '/views/templates/front/kiyoh-score-header-block.tpl');
        Cache::store($cacheId, $result);

        return $result;
    }

    /**
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    protected function getDiscountAdvertisement(): array
    {
        $cacheId = 'ModernHook::getDiscountAdvertisement_' . (int)$this->idLang . '_' . (int)$this->idShop . '_' . (int)$this->context->cart->id . '_' . ($this->context->cookie->price_vat_settings_incl ?? 'f');
        if (Cache::isStored($cacheId)) {
            return Cache::retrieve($cacheId);
        }

        $maxReductionPercent = 0;
        $idLang = Context::getContext()->language->id;
        $idShopGroup = Context::getContext()->shop->id_shop_group;
        $idShop = Context::getContext()->shop->id;

        $first = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_FIRST', $idLang, $idShopGroup, $idShop,  0);
        $second = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_SECOND', $idLang, $idShopGroup, $idShop,  0);
        $third = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_THIRD', $idLang, $idShopGroup, $idShop,  0);
        $no = Configuration::get('MSTHEMECONFIG_NO_DISCOUNT_RULE', $idLang, $idShopGroup, $idShop);

        $firstRule = new CartRule($first);
        $secondRule = new CartRule($second);
        $thirdRule = new CartRule($third);
        $noRule = new CartRule($no);

        $isElegibleForDiscount = 0;
        $noDiscountCounterAction = 0;

        $withTax = Context::getContext()->cookie->price_vat_settings_incl;

        $currentCartValue = $this->context->cart->getOrderTotal(false, CART::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING);
        $activeDiscountRules = [];
        $discountText = [];

        $fmt = numfmt_create('nl_NL', \NumberFormatter::CURRENCY);

        $cartRules = $this->context->cart->getCartRules();
        $nextCartRule = $first;
        $vatText = " excl. btw";
        if(count($cartRules) > 0){
            foreach ($cartRules as $index => $cartRule){
                if ((int)$cartRule['id_cart_rule'] == (int)$first && $noDiscountCounterAction != 1) {
                    $isElegibleForDiscount = 1;
                    $nextCartRule = $second;
                } elseif ((int)$cartRule['id_cart_rule'] == (int)$second && $noDiscountCounterAction != 1) {
                    $isElegibleForDiscount = 2;
                    $nextCartRule = $third;
                } elseif ((int)$cartRule['id_cart_rule'] == (int)$third && $noDiscountCounterAction != 1) {
                    $isElegibleForDiscount = 3;
                }

                if ((int)$cartRule['id_cart_rule'] == (int)$no) {
                    $isElegibleForDiscount = 0;
                    $noDiscountCounterAction = 1;
                }

                $name = $cartRule['name'][(int)$idLang] ?? '';

                $activeDiscountRules[$index] = [
                    'id_cart_rule' => $cartRule['id_cart_rule'],
                    'order' => $index,
                    'name' => $name,
                    'minimum_amount' => $cartRule['minimum_amount'],
                    'discount' => $cartRule['reduction_percent'],
                    'next_discount' => $nextCartRule
                ];

                $nextCartRuleObject = new CartRule($nextCartRule);

                if((float)$currentCartValue <= (float)$nextCartRuleObject->minimum_amount){
                    $minAmountText = (int)$nextCartRuleObject->minimum_amount;
                    if($withTax !== "false"){
                        $vatText = " incl. btw";
                        $minAmountText = (int)$nextCartRuleObject->minimum_amount*1.21;
                    }

                    $activeDiscountRules[$index]['next_discount'] = $nextCartRule;
                    $discountText[] = (int)$nextCartRuleObject->reduction_percent.'% korting vanaf € '.$minAmountText.',-<sup>*</sup><br/>';
                    $isElegibleForDiscount = 1;
                }

                if((int)$cartRule['reduction_percent'] > (int)$maxReductionPercent){
                    $maxReductionPercent = $cartRule['reduction_percent'];
                }
            }
        } else {
            $name = $firstRule->name[(int)$idLang] ?? '';

            $activeDiscountRules[0] = [
                'id_cart_rule' => $firstRule->id,
                'order' => 0,
                'name' => $name,
                'minimum_amount' => $firstRule->minimum_amount,
                'discount' => $firstRule->reduction_percent,
                'next_discount' => $first
            ];

            if((float)$currentCartValue < (float)$firstRule->minimum_amount){

                $minAmountText = (int)$firstRule->minimum_amount;
                if($withTax !== "false"){
                    $vatText = " incl. btw";
                    $minAmountText = (int)$firstRule->minimum_amount*1.21;
                }

                $discountText[] = (int)$firstRule->reduction_percent.'% korting vanaf € '.$minAmountText.',-<sup>*</sup><br/>';
                $isElegibleForDiscount = 1;
            }

            if((int)$firstRule->reduction_percent > $maxReductionPercent){
                $maxReductionPercent = $firstRule->reduction_percent;
            }
        }

        $footer_msg = '<br/><br/><i><sup>*</sup>'. $vatText . ' & excl. bezorging</i>';


        $message = '';
        switch ($isElegibleForDiscount){
            case 1:
                $message = '<a>Ontvang '.implode(' of ',$discountText).'</a>';
                break;
            case 3:
            case 2:
                $message = '<a>U heeft de maximale korting van '.(int)$maxReductionPercent.'% al in uw winkelwagen! <br/><a class="text-decoration-none text-black font-weight-bold" href="/'.Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id, '').'">Toch graag een aanbod op maat,<br/> neem dan contact met ons op.</a></a>';
                break;
        }



        if($noDiscountCounterAction == 1){
            $message = 'De korting is verwijderd uit uw winkelwagen door de balie medewerker! Klopt dit niet? <br/><a class="text-decoration-none text-black font-weight-bold" href="/'.Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id, '').'"><br/> Neem dan contact met ons op.</a>';
            $remainingMessage = $this->getRemainingAmountBeforeNextDiscount([]);
        } else {
            $remainingMessage = $this->getRemainingAmountBeforeNextDiscount($activeDiscountRules);
        }

        $result = ['rules' => $activeDiscountRules, 'message' => $message.$remainingMessage['msg'].$footer_msg, 'order_total' => $remainingMessage['current_order_total']];
        Cache::store($cacheId, $result);

        return $result;
    }


    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    private function getRemainingAmountBeforeNextDiscount($discounts): array
    {
        $currentOrderTotal = Context::getContext()->cart->getOrderTotal(false, CART::ONLY_PRODUCTS);
        $withTax = Context::getContext()->cookie->price_vat_settings_incl;
        $msg = '';


        for ($i = 0; $i < count($discounts); $i++) {
            $nextCartRuleObject = new CartRule((int)$discounts[$i]['next_discount']);

            if((float)$nextCartRuleObject->minimum_amount >= (float)$currentOrderTotal){
                $remaining = (float)$nextCartRuleObject->minimum_amount - (float)$currentOrderTotal;
                if($withTax !== "false"){
                    $remaining = $remaining*1.21;
                }
                $fmt = numfmt_create('nl_NL', \NumberFormatter::CURRENCY);
                $remainingTotal =  numfmt_format_currency($fmt,  $remaining, "EUR");

                $msg = '<b id="next-discount-message">Bestel nog <span id="total-until-discount">'.$remainingTotal;


                $msg .='<sup>*</sup></span> extra voor <span id="percentage-next-discount">'.(int)$nextCartRuleObject->reduction_percent.'%</span> korting!  </b>';
//                $msg .='<sup>*</sup></span> aan producten voor meer korting!';
                $msgSet = 1;
            }

        }
//        dd($msg, (float)$discounts[0]['minimum_amount'] , (float)$currentOrderTotal);
        return ['msg' => $msg, 'current_order_total' => $currentOrderTotal];
    }

    /**
     * @throws Exception
     */
    public function hookActionFrontControllerInitAfter(): void
    {
        /**
         * MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE
         * MSTHEMECONFIG_FAVICON_SHOP
         * MSTHEMECONFIG_EMPLOYEE_CUSTOMER_VOUCHER_GROUP
         *
         * MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID
         * MSTHEMECONFIG_CUSTOM_INTERNAL_COSTS_PRODUCT_CATEGORY
         * MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY
         */

        $this->context->shop_name = $this->shopName;
        $this->context->shop_favicon = Configuration::get('MSTHEMECONFIG_FAVICON_SHOP', $this->idLang, $this->idShopGroup, $this->idShop);

        if(empty($this->context->shop_favicon)){
            $this->context->shop_favicon = 'IJ';
        }

        $this->context->is_counter_customer = false;
        $this->context->belongs_to_voucher_group = false;
        $this->context->belongs_to_counter_group = false;

        $this->context->internal_product_categories = [
            (int)Configuration::get('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', $this->idLang, $this->idShopGroup, $this->idShop),
            (int)Configuration::get('MSTHEMECONFIG_CUSTOM_INTERNAL_COSTS_PRODUCT_CATEGORY', $this->idLang, $this->idShopGroup, $this->idShop),
            (int)Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY', $this->idLang, $this->idShopGroup, $this->idShop)
        ];

        if(isset($this->context->cart->id_customer) && Context::getContext()->customer->isLogged())
        {
            if(in_array($this->context->cart->id_customer, json_decode(Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE', $this->idLang, $this->idShopGroup, $this->idShop, '[]')))){
                $this->context->is_counter_customer = true;
            }
            if(in_array((int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_BALIE_GROUP', $this->idLang, $this->idShopGroup, $this->idShop), Customer::getGroupsStatic($this->context->cart->id_customer))){
                $this->context->belongs_to_counter_group = true;
            }

            if(in_array((int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_VOUCHER_GROUP', $this->idLang, $this->idShopGroup, $this->idShop), Customer::getGroupsStatic($this->context->cart->id_customer))){
                $this->context->belongs_to_voucher_group = true;
            }
        }

        $filterManager = $this->module->get('prestashop.core.filter.front_end_object.search_result_product');
        $filterManager->whitelist(['quantity', 'minimal_quantity', 'out_of_stock', 'depends_on_stock']);
    }

    /**
     *
     * @param $params
     */
    public function hookDisplayBackOfficeHeader($params)
    {
        // Quick tab maintenance trigger: use ?ms_tabs=ensure|reinstall in BO to (re)create tabs without reinstalling the module
        try {
            $mode = (string)\Tools::getValue('ms_tabs');
            if ($mode) {
                // Only allow in Back Office with an authenticated employee
                $isBO = defined('_PS_ADMIN_DIR_');
                $employee = $this->context->employee ?? null;
                if ($isBO && $employee && (int)$employee->id > 0) {
                    // Optional: restrict to super admin profiles to be safe
                    $isSuperAdmin = method_exists($employee, 'isSuperAdmin') ? (bool)$employee->isSuperAdmin() : true;
                    if ($isSuperAdmin && method_exists($this->module, 'repairTabs')) {
                        $ok = $this->module->repairTabs($mode);
                        // Feedback in UI
                        if (isset($this->context->controller->confirmations) && is_array($this->context->controller->confirmations)) {
                            $this->context->controller->confirmations[] = sprintf('MsThemeConfig: tabs %s %s.', $mode, $ok ? 'completed' : 'encountered some issues, check var/logs/MsThemeConfig.log');
                        }
                        // Also log
                        try {
                            $logger = new \FileLogger(0);
                            $logger->setFilename(_PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'var' . DIRECTORY_SEPARATOR . 'logs' . DIRECTORY_SEPARATOR . 'MsThemeConfig.log');
                            $logger->logInfo('[msthemeconfig] ms_tabs trigger: mode=' . $mode . ' result=' . ($ok ? 'OK' : 'FAIL'));
                        } catch (\Throwable $e) {}
                    }
                }
            }
        } catch (\Throwable $e) {
            // ignore trigger errors
        }




        // Diagnostic logger: list enqueued CSS/JS on specific BO pages to help debug asset loading
        try {
            // File log as well to confirm hook execution
            try {
                $sep = DIRECTORY_SEPARATOR;
                $logger = new \FileLogger(0);
                $logger->setFilename(_PS_ROOT_DIR_ . $sep . 'var' . $sep . 'logs' . $sep . 'MsThemeConfig.log');
                $logger->logInfo('[msthemeconfig] hookDisplayBackOfficeHeader fired');
            } catch (\Throwable $ignored) {}

            $controller = $this->context->controller ?? null;
            $controllerName = $controller ? ($controller->controller_name ?? '') : '';
            // Log for all Back Office controllers to ensure we capture assets even if controller naming differs

            $requestStack = null;
            $route = '';
            try {
                $requestStack = $this->module->get('request_stack');
                if ($requestStack && $requestStack->getCurrentRequest()) {
                    $route = (string)$requestStack->getCurrentRequest()->attributes->get('_route', '');
                }
            } catch (\Throwable $e) {
                // ignore
            }

            $cssList = [];
            if ($controller && isset($controller->css_files) && is_array($controller->css_files)) {
                // css_files may be an assoc array: path => [media=>..., priority=>...]
                foreach ($controller->css_files as $k => $v) {
                    $cssList[] = is_string($k) ? $k : (is_string($v) ? $v : json_encode($v));
                }
            }

            $jsList = [];
            if ($controller && isset($controller->js_files) && is_array($controller->js_files)) {
                foreach ($controller->js_files as $item) {
                    $jsList[] = is_string($item) ? $item : json_encode($item);
                }
            } elseif ($controller && isset($controller->js) && is_array($controller->js)) {
                foreach ($controller->js as $item) {
                    $jsList[] = is_string($item) ? $item : json_encode($item);
                }
            }

            // Provide TinyMCE API key to JS in a safe way (no inline <script> injection)
            // This exposes: window.ms.tinyApiKey and window.TINYMCE_API_KEY
            Media::addJsDef([
                'ms' => [
                    'tinyApiKey' => 'oLYgeawoG7PR53HJ58cjWLzX',
                ],
                'TINYMCE_API_KEY' => 'oLYgeawoG7PR53HJ58cjWLzX',
            ]);

            $data = [
                'controller' => $controllerName,
                'route' => $route,
                'css' => $cssList,
                'js' => $jsList,
            ];
            $json = json_encode($data);

            $out = '<script>(function(){try{var d=' . $json . ';console.groupCollapsed("BO assets: " + d.controller + (d.route?" ["+d.route+"]":""));console.log("CSS loaded ("+(d.css?d.css.length:0)+")", d.css);console.log("JS loaded ("+(d.js?d.js.length:0)+")", d.js);console.groupEnd();}catch(e){console.warn("BO assets logger error", e);}})();</script>';

            return $out;
        } catch (\Throwable $e) {
            // silent fail
            return;
        }
    }


    /**
     * @throws Exception
     */
    public function hookActionDispatcherAfter(&$param): void
    {
        // Early ensure to prevent BO menu exceptions
        $this->ensureMsTabRouteParams();
//        $result = null;
//        try {
//            $route = '';
//            $type = 'string';
//            if(is_array($param)){
//                $type = 'array';
//                if($param['request']->attributes !== null){
//                    $route = $param['request']->attributes->get('_route');
//                }
//            } elseif (is_object($param)) {
//                $type = 'object';
//                if(isset($param->route)){
//                    $route = $param->route;
//                }
//            }
//            switch ($route) {
//                case 'admin_orders_add_payment':
//                case 'admin_orders_update_product':
//                case 'admin_orders_update_shipping':
//                case 'admin_orders_partial_refund':
//                case 'admin_orders_standard_refund':
//                case 'admin_orders_return_product':
//                case 'admin_orders_add_product':
//                case 'admin_orders_delete_product':
//                case 'admin_orders_cancellation':
//                case 'admin_orders_remove_cart_rule':
//                case 'admin_orders_add_cart_rule':
//                    if($type == 'array'){
//                        $data = $param['request']->request->all();
//                        $attributes = $param['request']->attributes;
//                        $id_order = $attributes->get('orderId');
//
//                        $_SESSION['analytics_data'] = $this->sendAnalyticsDataToSession($data, $attributes, $id_order);
//
////                        var_export([$data, $attributes, $id_order, $result]);
//                    } else {
//                        var_dump('is Object',$param);
//                    }
//
//
////                    break;
//            }
//        } catch(\Exception $exception){
//            dd($exception);
//        }




    }

    /**
     * @param $data
     * @param $attributes
     * @param $id_order
     */
    private function sendAnalyticsDataToSession($data, $attributes, $id_order = null)
    {

        $addedProducts = [];
        $result = [];
        if($id_order){
            $order = new Order($id_order);
            $id_transaction = '';
            $coupon = '';
            foreach($order->getOrderPayments() as $payment){
                if($payment->transaction_id != ""){
                    $id_transaction = $payment->transaction_id;
                }
            }
            // Fallback: use order reference so transaction_id always matches the original purchase event
            if (empty($id_transaction)) {
                $id_transaction = $order->reference;
            }

            if(count($order->getCartRules()) > 0){
                $coupons = [];
                foreach($order->getCartRules() as $rule){
                    $coupons[] = $rule['name'];
                }
                $coupon = implode(',', $coupons);
            }

            if(array_key_exists('cancel_product', $data)){
                $postType= 'refund';
                $cancelProduct = $data['cancel_product'];
                $addProductRow = $data['add_product_row'];
                $editProductRow = $data['edit_product_row'];

                $total_refund = 0;
                $refunded_qty = 0;
                $cat1 = '';
                $cat2 = '';
                foreach ($order->getOrderDetailList() as $orderDetail) {
                    $orderDetailId = $orderDetail['id_order_detail'];

                    $product = new Product($orderDetail['product_id'], true, $this->context->cookie->id_lang);
                    $product_categories = $product->getParentCategories($this->context->cookie->id_lang);
                    if(count($product_categories) >= 2){
                        $cat1 = $product_categories[count($product_categories)-2];
                    }

                    if(count($product_categories) >= 3){
                        $cat2 = $product_categories[count($product_categories)-3];
                    }

                    if (!empty($cancelProduct['quantity_' . $orderDetailId]) || !empty((float) $cancelProduct['amount_' . $orderDetailId])) {
                        $refunded_qty = $cancelProduct['quantity_' . $orderDetailId] ?? 0;
                        $total_refund += (float)$cancelProduct['amount_' . $orderDetailId]/1.21 ?? 0;
                    }

                    $addedProducts[]  =  [
                        'currency' => 'EUR',
                        'price' => (float)$orderDetail['product_price'],
                        'item_id' => (int)$orderDetail['product_id'],
                        'item_name' => $orderDetail['product_name'],
                        'coupon' => '',
                        'discount' => '',
                        'item_category' => $cat2['name'],
                        'item_category2' => $cat1['name'],
                        'quantity' => (int)$refunded_qty
                    ];

                }

                $result['refund']['event_type'] = $postType;
                $result['refund']['transaction_id'] = $id_transaction;
                $result['refund']['cart_id'] = (int)($order->id_cart ?? 0);
                $result['refund']['currency'] = 'EUR';
                $result['refund']['coupon'] = $coupon;
                $result['refund']['value'] = (float)$total_refund;
                $result['refund']['shipping'] = (float)$cancelProduct['shipping_amount'];
                $result['refund']['tax'] = ($total_refund*1.21)-$total_refund;
                $result['refund']['items'] = $addedProducts;

                return $result;
                //End Cancel Product
            }

        }
    }

    /**
     * @param $param
     * @return void
     */
    public function hookActionFrontControllerSetVariables(&$param): void
    {
        // Ensure $ms is available in templateVars for PS 9.x template rendering.
        // hookActionFrontControllerSetMedia assigns $ms directly to Smarty, but
        // hookActionFrontControllerSetVariables is the reliable PS 9.x channel.
        if (empty($param['templateVars']['ms'])) {
            try {
                $param['templateVars']['ms'] = $this->getMsPayload();
            } catch (\Throwable $e) {
                $param['templateVars']['ms'] = ['config' => []];
            }
        }

        // Always inject event-log config so tagmanager.js can set up the beacon interceptor.
        $ctx        = Context::getContext();
        $idLang     = $ctx->language ? $ctx->language->id : null;
        $idShop     = $ctx->shop ? $ctx->shop->id : null;
        $idShopGrp  = ($ctx->shop && isset($ctx->shop->id_shop_group)) ? $ctx->shop->id_shop_group : null;
        $eventLogOn = $idLang
            ? (int)Configuration::get('MSTHEMECONFIG_GA4_EVENT_LOG', $idLang, $idShopGrp, $idShop)
            : 0;
        $param['templateVars']['analytics_event_log_enabled'] = (bool)$eventLogOn;
        $param['templateVars']['analytics_event_log_url']     = $ctx->link->getModuleLink('msthemeconfig', 'analyticslog');
        $param['templateVars']['analytics_ad_consent_url']    = $ctx->link->getModuleLink('msthemeconfig', 'adconsent');

        $param['templateVars']['analytics_data'] = [];

        // The webshop owns the account classification; GTM only transports these anonymous
        // labels. A counter session is legitimate turnover, while a selected test account is
        // internal traffic and can be removed from marketing reports independently.
        $isCounterCustomer = $ctx->customer
            && $ctx->customer->isLogged()
            && self::isCounterCustomer((int)$ctx->customer->id);
        $isAnalyticsTestCustomer = $ctx->customer
            && $ctx->customer->isLogged()
            && self::isAnalyticsTestCustomer((int)$ctx->customer->id);
        $param['templateVars']['analytics_data']['session_type'] = $isCounterCustomer ? 'counter' : 'customer';
        $param['templateVars']['analytics_data']['order_channel'] = $isCounterCustomer ? 'counter' : 'online';
        // id_shop is the immutable reporting key. Name/domain are low-cardinality labels for
        // managers; a later hostname change must not merge or split historical shop identity.
        $param['templateVars']['analytics_data']['shop_id'] = (string)(int)$idShop;
        $param['templateVars']['analytics_data']['shop_name'] = (string)($ctx->shop->name ?? '');
        $shopDomain = trim((string)($ctx->shop->domain_ssl ?? ''));
        if ($shopDomain === '') {
            $shopDomain = trim((string)($ctx->shop->domain ?? ''));
        }
        $param['templateVars']['analytics_data']['shop_domain'] = strtolower($shopDomain);
        if ($isAnalyticsTestCustomer) {
            $param['templateVars']['analytics_data']['traffic_type'] = 'internal';
        }

        // Carry the GA4 identifiers on the cart so they survive a redirect payment.
        //
        // Mollie's webhook (msmollie controllers/front/webhook.php:397) calls validateOrder()
        // server-to-server, so actionObjectOrderAddAfter runs with an empty $_COOKIE and cannot
        // capture anything. Persisting here — on every front-office page, while the customer's
        // browser is present — gives that hook a source to read back from via $order->id_cart.
        // Runs before the switch so it applies to every page type, not just the ones handled below.
        $this->persistGaIdentifiersOnCart($ctx);
        $this->persistAdAttributionOnCart($ctx);

        switch ($param['templateVars']['page']['page_name']){
            case 'product':
                $currentCartId = Context::getContext()->cart->id ? (int)Context::getContext()->cart->id : null;
                if(isset($_SESSION['analytics_data']['product']['type'])){
                    $param['templateVars']['analytics_data']['product'] =  [
                        'event_type' => $_SESSION['analytics_data']['product']['type'],
                        'cart_id' => $currentCartId,
                        'currency' => $_SESSION['analytics_data']['product']['data']['currency'],
                        'price' => $_SESSION['analytics_data']['product']['data']['amount_tax_excl'],
                        'item_id' => $_SESSION['analytics_data']['product']['data']['item_id'],
                        'item_name' => $_SESSION['analytics_data']['product']['data']['item_name'],
                        'coupon' => $_SESSION['analytics_data']['product']['data']['coupon'],
                        'discount' => $_SESSION['analytics_data']['product']['data']['discount'],
                        'item_category' => $_SESSION['analytics_data']['product']['data']['item_category'],
                        'item_category2' => $_SESSION['analytics_data']['product']['data']['item_category2'],
                        'price_without_discount' => $_SESSION['analytics_data']['product']['data']['price_before_discount'],
                        'quantity' => $_SESSION['analytics_data']['product']['data']['quantity'],
                    ];
                    $_SESSION['analytics_data'] = null;
                } else {
                    $product = Context::getContext()->controller->getProduct();
                    $product_categories = $product->getParentCategories($this->context->cookie->id_lang);
                    $name1 = '';
                    $name2 = '';

                    if(count($product_categories) >= 2){
                        $cat1 = $product_categories[count($product_categories)-2];
                        $name2 = $cat1['name'];
                    }

                    if(count($product_categories) >= 3){
                        $cat2 = $product_categories[count($product_categories)-3];
                        $name1 = $cat2['name'];
                    }

                    $param['templateVars']['analytics_data']['product'] =  [
                        'event_type' => null,
                        'cart_id' => $currentCartId,
                        'currency' => 'EUR',
                        'coupon' => '',
                        'price' => $product->getPrice(false),
                        'item_id' => $product->id,
                        'item_name' => $product->name,
                        'discount' => $product->getPrice(true, null, 6, null, true, false, 1),
                        'item_category' => $name1,
                        'item_category2' => $name2,
                        'quantity' => 1,
                    ];
                }

                break;
            case 'order-confirmation':
                $orderId = isset($_GET['id_order']) ? (int)$_GET['id_order'] : 0;
                $analyticsSessionKey = 'analytics_purchase_sent_' . $orderId;

                self::logPayment('CONF', 'entry', [
                    'orderId'            => $orderId,
                    'cartId_get'         => $_GET['id_cart'] ?? '(missing)',
                    'sessionKey'         => $analyticsSessionKey,
                    'sessionKeyAlready'  => !empty($_SESSION[$analyticsSessionKey]),
                ]);

                // Only fire the purchase event once per order per browser session.
                // Prevents duplicate dataLayer pushes on page refresh.
                if ($orderId > 0 && empty($_SESSION[$analyticsSessionKey])) {
                    $_SESSION[$analyticsSessionKey] = true;

                    $cartId = isset($_GET['id_cart']) ? (int)$_GET['id_cart'] : 0;
                    $cart = new Cart($cartId);
                    $transaction_id = '';
                    $reference = '';
                    $order = new Order($orderId);

                    self::logPayment('CONF', 'objects_loaded', [
                        'orderId'       => $orderId,
                        'orderLoaded'   => Validate::isLoadedObject($order),
                        'cartId'        => $cartId,
                        'cartLoaded'    => Validate::isLoadedObject($cart),
                        'orderCartId'   => $order->id_cart ?? null,
                    ]);

                    // Second-chance capture on the confirmation page. Mostly redundant now that
                    // actionObjectOrderAddAfter resolves via the cart, but it still helps when the
                    // order was created before the cart carried anything (e.g. a legacy cart).
                    $ga = self::resolveGaIdentifiers((int)($order->id_cart ?? $cartId));
                    $gaClientId = $ga['client_id'];
                    $gaSessionId = $ga['session_id'];
                    $analyticsConsent = $ga['consent'];

                    if (Validate::isLoadedObject($order)) {
                        $existingClientId = Db::getInstance()->getValue(
                            'SELECT `ga_client_id` FROM `' . _DB_PREFIX_ . 'orders` WHERE `id_order` = ' . (int)$orderId
                        );
                        if (empty($existingClientId)) {
                            $updateData = [
                                'ga_client_id'  => pSQL($gaClientId),
                                'ga_session_id' => pSQL($gaSessionId),
                            ];
                            if ($analyticsConsent !== null) {
                                $updateData['ga_analytics_consent'] = (int)$analyticsConsent;
                            }
                            Db::getInstance()->update('orders', $updateData, '`id_order` = ' . (int)$orderId);
                        }
                    }
                    self::logPayment('CONF', 'ga_identifiers', [
                        'ga_cookie_present'     => !empty($_COOKIE['_ga']),
                        'ga_client_id'          => $gaClientId ?: '(none parsed)',
                        'ga_session_id'         => $gaSessionId ?: '(none parsed)',
                        'analytics_consent'     => $analyticsConsent ?? 'null',
                    ]);

                    // The return page is a useful second chance for legacy carts, but the cart
                    // snapshot remains authoritative when Mollie's webhook created the order.
                    $adAttribution = self::resolveAdAttribution((int)($order->id_cart ?? $cartId));
                    if (Validate::isLoadedObject($order)) {
                        self::storeAdAttributionOnOrder($order, $adAttribution, true);
                    }
                    self::logPayment('CONF', 'ad_attribution', [
                        'marketing_consent' => $adAttribution['consent'] ?? 'null',
                        'identifier_fields' => self::populatedAdAttributionFields($adAttribution),
                    ]);

                    $transIds = $order->getOrderPayments();
                    $reference = $order->reference;
                    // Always use order.reference as transaction_id so the ID is stable across
                    // GA4, BigQuery, refunds and the PrestaShop back office. GA4 does not
                    // deduplicate separate purchase events merely because this value matches.
                    $transaction_id = $reference;

                    self::logPayment('CONF', 'payment_ids', [
                        'reference'      => $reference,
                        'transaction_id' => $transaction_id,
                        'payments_count' => count($transIds),
                        'first_payment_transaction_id' => $transIds[0]->transaction_id ?? '(none)',
                    ]);

                    $items = [];

                    foreach ($cart->getProducts() as $product){
                        $prod = new Product($product['id_product']);
                        $product_categories = $prod->getParentCategories($this->context->cookie->id_lang);
                        $name1 = '';
                        $name2 = '';

                        if(count($product_categories) >= 2){
                            $cat1 = $product_categories[count($product_categories)-2];
                            $name2 = $cat1['name'];
                        }

                        if(count($product_categories) >= 3){
                            $cat2 = $product_categories[count($product_categories)-3];
                            $name1 = $cat2['name'];
                        }
                        $item = [];
                        $item['item_id'] = $product['id_product'];
                        $item['item_name'] = $product['name'];
                        $item['discount'] = (float)($product['price_without_reduction_without_tax'] - $product['price_with_reduction_without_tax']);
                        $item['index'] = count($items);
                        $item['item_category'] = $name1;
                        $item['item_category2'] = $name2;
                        $item['price'] = $product['price_with_reduction_without_tax'];
                        $item['quantity'] = $product['quantity'];
                        $items[] = $item;
                    }

                    $coupon = '';

                    if(count($cart->getCartRules()) > 0){
                        $coupons = [];
                        foreach($cart->getCartRules() as $rule){
                            $coupons[] = $rule['name'];
                        }
                        $coupon = implode(',', $coupons);
                    }

                    $checkoutTypes = Validate::isLoadedObject($order)
                        ? self::getOrderCheckoutTypes($order)
                        : ['shipping_tier' => '', 'payment_type' => ''];

                    $confirmationData = [
                        'transaction_id' => $transaction_id,
                        'event_id' => self::purchaseEventId($order),
                        'reference' => $reference,
                        'cart_id' => $cartId,
                        'currency' => 'EUR',
                        'price' => $cart->getOrderTotal(false),
                        'coupon' => $coupon,
                        'discount' => $cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS),
                        'shipping' => $cart->getOrderTotal(false, Cart::ONLY_SHIPPING),
                        'shipping_tier' => $checkoutTypes['shipping_tier'],
                        'payment_type' => $checkoutTypes['payment_type'],
                        'tax' => $cart->getOrderTotal() - $cart->getOrderTotal(false),
                        'items' => $items,
                    ];

                    self::logPayment('CONF', 'confirmation_data', [
                        'transaction_id' => $confirmationData['transaction_id'],
                        'event_id'       => $confirmationData['event_id'],
                        'reference'      => $confirmationData['reference'],
                        'price'          => $confirmationData['price'],
                        'tax'            => $confirmationData['tax'],
                        'shipping'       => $confirmationData['shipping'],
                        'shipping_tier'  => $confirmationData['shipping_tier'],
                        'payment_type'   => $confirmationData['payment_type'],
                        'discount'       => $confirmationData['discount'],
                        'coupon'         => $confirmationData['coupon'],
                        'items_count'    => count($confirmationData['items']),
                        'first_item'     => $confirmationData['items'][0] ?? null,
                    ]);

                    $param['templateVars']['analytics_data']['confirmation'] = $confirmationData;
                } else {
                    self::logPayment('CONF', 'early_exit', [
                        'reason'  => $orderId <= 0 ? 'invalid_orderId' : 'session_dedup_blocked',
                        'orderId' => $orderId,
                    ]);
                }
                break;
            case 'module-supercheckout-supercheckout':
            case 'checkout':
            case 'category':
            case 'cart':
                $cart = $param['templateVars']['cart'];
                $cartObject = new Cart(Context::getContext()->cart->id);

                $items = [];

                foreach ($cart['products'] as $product){
                    $prod = new Product($product['id_product']);
                    $product_categories = $prod->getParentCategories($this->context->cookie->id_lang);
                    $name1 = '';
                    $name2 = '';

                    if(count($product_categories) >= 2){
                        $cat1 = $product_categories[count($product_categories)-2];
                        $name2 = $cat1['name'];
                    }

                    if(count($product_categories) >= 3){
                        $cat2 = $product_categories[count($product_categories)-3];
                        $name1 = $cat2['name'];
                    }
                    $item = [];

                    $item['item_id'] = $product['id_product'];
                    $item['item_name'] = $product['name'];
                    $item['discount'] = (float)($product['discount_amount'] ?? 0);
                    $item['index'] = count($items);
                    $item['item_category'] = $name1;
                    $item['item_category2'] = $name2;
                    $item['price'] = $product['price_with_reduction_without_tax'];
                    $item['quantity'] = $product['quantity'];
                    $items[] = $item;
                }

                $coupon = '';

                if(count($cartObject->getCartRules()) > 0){
                    $coupons = [];
                    foreach($cartObject->getCartRules() as $rule){
                        $coupons[] = $rule['name'];
                    }
                    $coupon = implode(',', $coupons);
                }

                $param['templateVars']['analytics_data']['cart'] = [
                    'cart_id' => $cartObject->id,
                    'currency' => 'EUR',
                    'coupon' => $coupon,
                    'discount' => $cartObject->getOrderTotal(false, CART::ONLY_DISCOUNTS),
                    'price' => $cart['totals']['total_excluding_tax']['amount'],
                    'items' => $items,
                ];

                if(isset($_SESSION['analytics_data']['product']['event_type'])){
                    $param['templateVars']['analytics_data']['product'] =  [
                        'event_type' => $_SESSION['analytics_data']['product']['event_type'],
                        'currency' => $_SESSION['analytics_data']['product']['data']['currency'],
                        'price' => $_SESSION['analytics_data']['product']['data']['price'],
                        'item_id' => $_SESSION['analytics_data']['product']['data']['item_id'],
                        'item_name' => $_SESSION['analytics_data']['product']['data']['item_name'],
                        'coupon' => $_SESSION['analytics_data']['product']['data']['coupon'],
                        'discount' => $_SESSION['analytics_data']['product']['data']['discount'],
                        'item_category' => $_SESSION['analytics_data']['product']['data']['item_category'],
                        'item_category2' => $_SESSION['analytics_data']['product']['data']['item_category2'],
                        'quantity' => $_SESSION['analytics_data']['product']['data']['quantity'],
                    ];
                    $_SESSION['analytics_data'] = null;
                }

                if(isset($_SESSION['analytics_data']['add_to_cart_product']['event_type'])){
                    $param['templateVars']['analytics_data']['add_to_cart_product'] =  [
                        'event_type' => $_SESSION['analytics_data']['add_to_cart_product']['event_type'],
                        'op' => $_SESSION['analytics_data']['add_to_cart_product']['op'],
                        'cart_id' => $cartObject->id,
                        'currency' => $_SESSION['analytics_data']['add_to_cart_product']['data']['currency'],
                        'price' => $_SESSION['analytics_data']['add_to_cart_product']['data']['price'],
                        'item_id' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_id'],
                        'item_name' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_name'],
                        'coupon' => $_SESSION['analytics_data']['add_to_cart_product']['data']['coupon'],
                        'discount' => $_SESSION['analytics_data']['add_to_cart_product']['data']['discount'],
                        'item_category' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_category'],
                        'item_category2' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_category2'],
                        'quantity' => $_SESSION['analytics_data']['add_to_cart_product']['data']['quantity'],
                    ];
                    $_SESSION['analytics_data'] = null;
                }

                break;
            case 'index'://Home
                break;
            case 'contactinformation'://Informatie aanvraag formulier
                break;
            case 'contactoffer'://Offerte aanvraag formulier
                break;
            case 'authentication'://Login scherm
                break;
            case 'password'://Wachtwoord vergeten scherm
                break;
            case 'cms'://cms pagina
                break;
            case 'search'://zoek pagina
                break;
            default:
//                die($param['templateVars']['page']['page_name']);
                break;
        }

        // Product list analytics (view_item_list / select_item) is deliberately NOT built here.
        // This hook runs inside FrontController::assignGeneralPurposeVariables(), where $templateVars
        // still holds only a fixed set of keys and no 'listing' at all. See
        // hookActionProductSearchAfter() below for where it is built instead.

        // Account analytics: inject login/logout/register event stored in session (any page)
        if (!empty($_SESSION['analytics_account_event'])) {
            $param['templateVars']['analytics_data']['account_event'] = $_SESSION['analytics_account_event'];
            $_SESSION['analytics_account_event'] = null;
        }

        // Refund analytics: inject refund data stored in session by sendAnalyticsDataToSession() (any page)
        if (!empty($_SESSION['analytics_data']['refund'])) {
            $refundData = $_SESSION['analytics_data']['refund'];
            $param['templateVars']['analytics_data']['refund'] = [
                'transaction_id' => $refundData['transaction_id'] ?? '',
                'cart_id'        => (int)($refundData['cart_id'] ?? 0),
                'currency'       => 'EUR',
                'value'          => (float)($refundData['value'] ?? 0),
                'tax'            => (float)($refundData['tax'] ?? 0),
                'shipping'       => (float)($refundData['shipping'] ?? 0),
                'coupon'         => $refundData['coupon'] ?? '',
                'items'          => $refundData['items'] ?? [],
            ];
            $_SESSION['analytics_data']['refund'] = null;
        }
    }

    /**
     * Modify category form
     *
     * @param array $params
     *
     */
    public function hookActionCategoryFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];

        // Store references to all existing field builders
        $originalFields = $formBuilder->all();

        // Remove all fields
        foreach (array_keys($originalFields) as $fieldName) {
            $formBuilder->remove($fieldName);
        }

        // Re-add fields in the correct order
        foreach ($originalFields as $fieldName => $fieldBuilder) {
            // Re-add the existing field builder
            $formBuilder->add($fieldBuilder);

            // Add custom fields right after the 'name' field
            if ($fieldName === 'name') {
                $formBuilder->add('second_name', TranslatableType::class, [
                    'label' => $this->module->getTranslator()->trans('2e Naam', [],
                        'Modules.MsThemeConfig'),
                    'type' => TextType::class,
                    'required' => false,
                ]);

                $formBuilder->add('top_description', TranslateType::class, [
                    'type' => FormattedTextareaType::class,
                    'label' => $this->module->getTranslator()->trans('Top Omschrijving', [],
                        'Modules.MsThemeConfig'),
                    'locales' => [
                        0 =>  [
                            "id_lang" => 1,
                            "name" => "Nederlands (Dutch)",
                            "active" => 1,
                            "iso_code" => "nl",
                            "language_code" => "nl-nl",
                            "locale" => "nl-NL",
                            "date_format_lite" => "d-m-Y",
                            "date_format_full" => "d-m-Y H:i:s",
                            "is_rtl" => 0,
                            "id_shop" => 1,
                            "shops" => [
                                1 => true,
                            ]
                        ]
                    ],
                    'hideTabs' => false,
                    'required' => false,
                    'options' => [
                        'limit' => CategoryDescriptionConstraints::MAX_BYTES,
                        'constraints' => [
                            new CleanHtml([
                                'message' => $this->module->getTranslator()->trans('This field is invalid',[], 'Admin.Notifications.Error'),
                            ]),
                            CategoryDescriptionConstraints::byteLimit(),
                        ]]]);
            }

            // Add jsonld field after meta_description
            if ($fieldName === 'meta_description') {
                $formBuilder->add('jsonld', TranslatableType::class, [
                    'label' => $this->module->getTranslator()->trans('JSON LD', [],
                        'Modules.MsThemeConfig'),
                    'required' => false,
                    'auto_initialize' => false,
                    'type' => TextareaType::class,
                    'help' => $this->module->getTranslator()->trans('(Optional) You can generate the json on: <a target="_blank" href="https://saijogeorge.com/json-ld-schema-generator/faq/">saijogeorge.com</a>'),
                ]);
            }
        }

        $category = new Category($params['id'] ?? null);

        $params['data']['top_description'] = $category->top_description;
        $params['data']['second_name'] = $category->second_name;

        $params['data']['jsonld'][$this->idLang] = Category::getCategoryLdFaq($category->id_category, $this->idLang);

        $this->addCategoryRelationsForm($params);
        $formBuilder->setData($params['data']);
    }


    /**
     * Hook to add addition fields to the category page
     *
     * @TODO check function
     *
     * @return array
     */
    public function hookDisplayAdditionalCategoryFields(): array
    {
        return [
            (new FormField())
                ->setName('top_description')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Top Description')),
            (new FormField())
                ->setName('second_name')
                ->setType('text')
                ->setRequired(false)
                ->setLabel($this->module->l('Second Name')),
            (new FormField())
                ->setName('jsonld')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Faq JSON+LD')),
        ];
    }


    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     *
     * @param array $params
     *
     */
    public function hookActionObjectCategoryUpdateAfter(array $params)
    {
        return $this->updateCustomCategoryFields($params);
    }

    /**
     * Update / Create
     *
     * @param array $params
     *
     */
    private function updateCustomCategoryFields(array $params)
    {

        $idLang = Context::getContext()->language->id;
        $form_values = Tools::getAllValues();
        $object = $params['object'] ?? new Category($params['id']);

        $categoryArray = [];

        if (isset($form_values['category'])) {
            $categoryFormData = $form_values['category'];
        }

        if (isset($form_values['root_category'])) {
            $categoryFormData = $form_values['root_category'];
        }

        if (empty($categoryFormData)) {
            return false;
        }

        if (empty($categoryFormData['additional_description'])) {
            $additional_description = '';
        } else {
            $additional_description = $categoryFormData['additional_description'];
        }

        if (empty($categoryFormData['top_description'])) {
            $top_description = '';
        } else {
            $top_description = $categoryFormData['top_description'];
        }

        if (empty($categoryFormData['second_name'])) {
            $second_name = '';
        } else {
            $second_name = $categoryFormData['second_name'];
        }

        if (empty($categoryFormData['jsonld'])) {
            $jsonld = '';
        } else {
            $jsonld = $categoryFormData['jsonld'];
        }

        // If this table is linked to multishop system, update / insert for all shops from context
        $id_shop_list = \Shop::getShops(true, null, true);
        $id_lang_list = \Language::getIds(true);
        $result = false;
        foreach ($id_shop_list as $id_shop) {
            foreach ($id_lang_list as $id_lang) {
                $where = pSQL('`id_category` = ' . (int)$object->id . ' AND id_lang = ' . (int)$id_lang . ' AND id_shop = ' . (int)$id_shop . ' ');

                $categoryArray['id_shop'] = (int)$id_shop;
                $categoryArray['id_lang'] = (int)$id_lang;
                $categoryArray['second_name'] = $categoryFormData['second_name'][$id_lang];
                $categoryArray['jsonld'] = trim(addslashes($categoryFormData['jsonld'][$id_lang]), '"');
                $categoryArray['top_description'] = $categoryFormData['top_description'][$id_lang];
                $categoryArray['additional_description'] = $categoryFormData['additional_description'][$id_lang];

                if (Db::getInstance()->getValue('SELECT COUNT(*) FROM ' . _DB_PREFIX_ . 'category_lang WHERE ' . $where, false)) {
                    $result = Db::getInstance()->update('category_lang', $categoryArray, $where);
                } else {
                    $categoryArray['id_category'] = $object->id;
                    $categoryArray['name'] = $object->name[$id_lang];
                    $categoryArray['description'] = $object->description[$id_lang];
                    $categoryArray['link_rewrite'] = $object->link_rewrite[$id_lang];
                    $categoryArray['meta_title'] = $object->meta_title[$id_lang];
                    $categoryArray['meta_keywords'] = $object->meta_keywords[$id_lang];
                    $categoryArray['meta_description'] = $object->meta_description[$id_lang];
                    Db::getInstance()->insert('category_lang', $categoryArray, false, false,Db::INSERT, true);
                }
            }
        }
        return $result;
    }

    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateCategoryFormHandler(array $params)
    {
        $this->updateCustomCategoryFields($params);
        $this->saveCategoryRelations($params);
    }

    public function hookActionAfterUpdateCategoryFormHandler(array $params): void
    {
        $this->saveCategoryRelations($params);
    }

    private function addCategoryRelationsForm(array &$params): void
    {
        $editable = \Shop::getContext() === \Shop::CONTEXT_SHOP && (int) $this->idShop > 0;
        $sourceId = (int) ($params['id'] ?? 0);
        $relations = [];
        $choices = [];
        if ($editable) {
            $repository = new CategoryRelationRepository(Db::getInstance());
            $relations = $sourceId > 0 ? $repository->getRelations($sourceId, (int) $this->idShop) : [];
            $choices = $repository->getChoices($sourceId, (int) $this->idShop, (int) $this->idLang);
        }
        CategoryRelationsForm::addTo($params['form_builder'], $sourceId, $relations, $choices, $editable);
        $params['data'][CategoryRelationsForm::FIELD_NAME] = $relations;

        // Also cover Symfony category routes whose media hook used another controller alias.
        if ($this->context->controller && method_exists($this->context->controller, 'addJS')) {
            $this->context->controller->addJS(_MODULE_DIR_ . $this->module->name . '/views/js/category-relations.js');
        }
    }

    /** Called only after the standard category form passed validation and CSRF checks. */
    private function saveCategoryRelations(array $params): void
    {
        $data = $params['form_data'] ?? null;
        $sourceId = (int) ($params['id'] ?? 0);
        if (\Shop::getContext() !== \Shop::CONTEXT_SHOP || (int) $this->idShop <= 0 || $sourceId <= 0
            || !is_array($data) || !array_key_exists(CategoryRelationsForm::FIELD_NAME, $data)) {
            return;
        }
        $relations = $data[CategoryRelationsForm::FIELD_NAME];
        if (!is_array($relations)) {
            throw new \InvalidArgumentException('De aanvullende categorieën zijn ongeldig.');
        }
        (new CategoryRelationRepository(Db::getInstance()))->replace(
            $sourceId,
            (int) $this->idShop,
            (int) $this->idLang,
            $relations
        );
    }


    /**
     * Add category extra description
     */
    public function hookActionRootCategoryFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];

        $formBuilder->add('top_description', TranslateType::class, [
            'type' => FormattedTextareaType::class,
            'locales' => [
                0 =>  [
                    "id_lang" => 1,
                    "name" => "Nederlands (Dutch)",
                    "active" => 1,
                    "iso_code" => "nl",
                    "language_code" => "nl-nl",
                    "locale" => "nl-NL",
                    "date_format_lite" => "d-m-Y",
                    "date_format_full" => "d-m-Y H:i:s",
                    "is_rtl" => 0,
                    "id_shop" => 1,
                    "shops" => [
                        1 => true,
                    ]
                ]
            ],
            'hideTabs' => false,
            'required' => false,
            'options' => [
                'limit' => CategoryDescriptionConstraints::MAX_BYTES,
                'constraints' => [
                    new CleanHtml([
                        'message' => $this->module->getTranslator()->trans('This field is invalid',[], 'Admin.Notifications.Error'),
                    ]),
                    CategoryDescriptionConstraints::byteLimit(),
                ]]]);

        $formBuilder->add('second_name', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Second Name', [],
                'Modules.ModernesSmidThemeConfigurator'),
            'type' => TextType::class,
            'required' => false,
        ]);


        $formBuilder->add('jsonld', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Top Description', [],
                'Modules.ModernesSmidThemeConfigurator'),
            'required' => false,
            'type' => TextareaType::class,
        ]);

        $category = new Category($params['id'] ?? null);

        $params['data']['top_description'] = $category->top_description;
        $params['data']['second_name'] = $category->second_name;

        $params['data']['jsonld'][$this->idLang] = Category::getCategoryLdFaq($category->id_category, $this->idLang);

        $this->addCategoryRelationsForm($params);
        $formBuilder->setData($params['data']);

    }


    /**
     * @TODO check function
     *
     * @return array
     */
    public function hookDisplayAdditionalRootCategoryFields(): array
    {
        return [
            (new FormField())
                ->setName('top_description')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Top Description')),
            (new FormField())
                ->setName('second_name')
                ->setType('text')
                ->setRequired(false)
                ->setLabel($this->module->l('Second Name')),
            (new FormField())
                ->setName('jsonld')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Faq JSON+LD')),
        ];
    }


    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateRootCategoryFormHandler(array $params)
    {
        $this->updateCustomCategoryFields($params);
        $this->saveCategoryRelations($params);
    }

    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateRootCategoryFormHandler(array $params)
    {
        $this->updateCustomCategoryFields($params);
        $this->saveCategoryRelations($params);
    }




    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateOrderAddressFormHandler(array $params): void
    {
//        var_export($params);
//        die('test');
//        $addressId = (int)$params['id'];
//
//        /** @var array $addressFormData */
//        $addressFormData = $params['form_data'];
//        $house_number = $addressFormData['house_number'];
//        $house_number_extension = $addressFormData['house_number_extension'];
//
//        try {
//            $address = new Address($addressId);
//            $address->house_number = $house_number;
//            $address->house_number_extension = $house_number_extension;
//            $address->save();
//
//        } catch (ReviewerException $exception) {
//            throw new \PrestaShop\PrestaShop\Core\Module\Exception\ModuleErrorException($exception);
//        }
    }




    /**
     * All needed function
     */


    private function createCategoryJSONLD($cat, $withProducts=true, $withSubCats = true, $position=0): array
    {
        $catImages = [$this->link->getCatImageLink($cat->link_rewrite, $cat->id_category)];

        $catDescription = "";
        if (isset($cat->top_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->top_description[$this->idLang]));
        }

        if (isset($cat->additional_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->additional_description[$this->idLang]));
        } elseif(isset($cat->description[$this->idLang])){
            $catDescription .= trim(strip_tags($cat->description[$this->idLang]));
        }

        $catTotalItems = 0;
        $jsonLD = [];
        if($withProducts){
            $products = $cat->getProducts($this->idLang, 0, 100);
            if(is_countable($products) && count($products) > 0){
                $catTotalItems = count($products);
                foreach ($products as $prod) {
                    try {
                        $jsonLD[] = $this->createProductJSONLD($prod['id_product']);
                    } catch (PrestaShopDatabaseException|PrestaShopException) {
                    }
                }
            }
        } elseif ($withSubCats) {
            $subCategories = $cat->getSubCategories($this->idLang, true);
            $catTotalItems = count($subCategories);
            $subPos = 0;
            foreach ($subCategories as $category) {
                $cat = new Category($category['id_category']);
                $jsonLD[] = $this->createCategoryJSONLD($cat, $withProducts, false, $subPos);
                $subPos++;
            }
        }

        $alternateName = '';
        if(isset($cat->second_name[$this->idLang])){
            $alternateName = $cat->second_name[$this->idLang];
        }


        $jsonLDCategory = [];
        if($cat->id){
            $jsonLDCategory = [
                '@context' => 'https://schema.org',
                '@type' => 'ItemList',
                'position' => $position,
                'url' => $this->link->getCategoryLink($cat->id),
                'numberOfItems' => $catTotalItems,
                'name' => $cat->name[$this->idLang],
                'alternateName' => $alternateName,
                'description' => $catDescription,
                'image' => $catImages,
                'itemListElement' => $jsonLD
            ];
        }
        return $jsonLDCategory;
    }



    /**
     * @TODO check function
     *
     * @return void
     */
    public function hookDisplayFooter(): void
    {
    }

    /**
     * @TODO check function
     *
     * @return void
     */
    public function hookActionAddressFormBuilderModifier(): void
    {
    }

    /**
     * @return void
     */
    public function hookDisplayHeader(): void
    {
        if (\MsThemeConfig\Plasma\PlasmaSettings::get('ENABLED', (int) $this->context->shop->id, false)) {
            $this->context->controller->registerJavascript('module-msthemeconfig-plasma',
                'modules/msthemeconfig/views/js/plasmacutting.js', ['position' => 'bottom', 'priority' => 160]);
            $this->context->controller->registerStylesheet('module-msthemeconfig-plasma',
                'modules/msthemeconfig/views/css/plasmacutting.css', ['media' => 'all', 'priority' => 160]);
            \Media::addJsDef(['msPlasma' => ['url' => $this->context->link->getModuleLink('msthemeconfig', 'plasma', [], true),
                'token' => \Tools::getToken(false)]]);
        }
        // Unregister core scripts to prevent duplicates and ensure our deferred versions are used
        $this->context->controller->unregisterJavascript('corejs');
        $this->context->controller->unregisterJavascript('theme-main');

        // Force register core.js if it's missing on live but needed for core functionality
        // We use a different ID to avoid conflicts if unregister failed or was bypassed
        // core.js provides jQuery and must NOT be deferred — jQuery UI and other vendor scripts
        // depend on jQuery being available synchronously before DOMContentLoaded fires.
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-corejs-forced',
            'themes/core.js',
            ['position' => 'bottom', 'priority' => 0]
        );

        // Keep existing assets and variables
        $this->context->controller->addCSS('modules/'.$this->module->name.'/views/css/ijzershopkiyoh.css', 'all');
        $this->context->controller->addCSS('modules/'.$this->module->name.'/views/css/dynamicproduct.css', 'all');
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-dynamicproduct',
            'modules/'.$this->module->name.'/views/js/dynamicproduct.js',
            ['position' => 'bottom', 'priority' => 150, 'attribute' => 'defer']
        );

        $this->context->controller->registerJavascript(
            'module-msthemeconfig-fabric',
            'modules/'.$this->module->name.'/views/js/fabric5.js',
            ['position' => 'bottom', 'priority' => 151, 'attribute' => 'defer']
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-sawcut-plate-visualizer',
            'modules/'.$this->module->name.'/views/js/jQueryPlatecutVisualizer.js',
            ['position' => 'bottom', 'priority' => 160, 'attribute' => 'defer']
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-sawcut-saw-visualizer',
            'modules/'.$this->module->name.'/views/js/jQuerySawcutVisualizer.js',
            ['position' => 'bottom', 'priority' => 161, 'attribute' => 'defer']
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-sawcut-single-visualizer',
            'modules/'.$this->module->name.'/views/js/jQuerySinglePlatecutVisualizer.js',
            ['position' => 'bottom', 'priority' => 162, 'attribute' => 'defer']
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-sawcut-module',
            'modules/'.$this->module->name.'/views/js/sawandcutmodule.js',
            ['position' => 'bottom', 'priority' => 170, 'attribute' => 'defer']
        );

        $this->context->controller->registerJavascript(
            'module-msthemeconfig-jquery-ui-core',
            'themes/modernesmid/assets/js/vendor/jquery-ui/jquery.ui.core.min.js',
            ['position' => 'bottom', 'priority' => 20]
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-jquery-ui-widget',
            'themes/modernesmid/assets/js/vendor/jquery-ui/jquery.ui.widget.min.js',
            ['position' => 'bottom', 'priority' => 11]
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-jquery-ui-position',
            'themes/modernesmid/assets/js/vendor/jquery-ui/jquery.ui.position.min.js',
            ['position' => 'bottom', 'priority' => 12]
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-jquery-ui-menu',
            'themes/modernesmid/assets/js/vendor/jquery-ui/jquery.ui.menu.min.js',
            ['position' => 'bottom', 'priority' => 13]
        );
        $this->context->controller->registerJavascript(
            'module-msthemeconfig-jquery-ui-autocomplete',
            'themes/modernesmid/assets/js/vendor/jquery-ui/jquery.ui.autocomplete.min.js',
            ['position' => 'bottom', 'priority' => 14]
        );

        $this->context->controller->registerJavascript(
            'module-msthemeconfig-bootstrap-bundle',
            'themes/modernesmid/assets/js/vendor/bootstrap.bundle.min.js',
            ['position' => 'bottom', 'priority' => 15]
        );

        $this->context->controller->registerJavascript(
            'module-msthemeconfig-header-multistore-dropdown',
            'themes/modernesmid/assets/js/header-multistore-dropdown.js',
            ['position' => 'bottom', 'priority' => 16]
        );

        $this->context->controller->registerJavascript(
            'module-msthemeconfig-modernesmid-js',
            'themes/modernesmid/assets/js/theme.js',
            ['position' => 'bottom', 'priority' => 19]
        );
        $consent_cookie = isset($_COOKIE['cookie-consent']);
        Context::getContext()->smarty->assign([
            'consent_cookie' => $consent_cookie,
            'discount_add' => $this->getDiscountAdvertisement(),
        ]);

        $ms = $this->getMsPayload();

        if ($this->context->smarty) {
            try {
                $existingSmartyMsData = $this->context->smarty->tpl_vars['ms'] ?? null;
                if (!$existingSmartyMsData) {
                    $this->context->smarty->assign('ms', $ms);
                } else {
                    // Merge existing data with new data
                    $mergedData = array_merge($existingSmartyMsData->value, $ms);
                    $this->context->smarty->assign('ms', $mergedData);
                }
            } catch (\Throwable $e) {
                $this->context->smarty->assign('ms', $ms);
            }
        }

        // Include Saw & Cut assets (migrated from sawandcutmodule)
        $this->context->controller->addCSS('modules/'.$this->module->name.'/views/css/sawandcutmodule.css', 'all');
        // $this->context->controller->addJS('modules/'.$this->module->name.'/views/js/sawandcutmodule.js');
        // Fallback to legacy assets to maintain functionality if local files are missing
        $this->context->controller->addCSS('modules/sawandcutmodule/views/css/sawandcutmodule.css', 'all');
        // $this->context->controller->addJS('modules/sawandcutmodule/views/js/sawandcutmodule.js');
    }

    // ===== Saw & Cut merged features =====
    private function getSawCutConfig(): array
    {
        $map = [
            'id_attribute_group' => 'SAWANDCUT_ATTRIBUTE_GROUP',
            'id_attribute_group_cut' => 'SAWANDCUT_ATTRIBUTE_GROUP_CUT',
            'id_feature_product_length' => 'SAWANDCUT_FEATURE_LENGTH',
            'id_feature_product_cutlength' => 'SAWANDCUT_FEATURE_CUTLENGTH',
            'id_feature_product_cutwidth' => 'SAWANDCUT_FEATURE_CUTWIDTH',
            'id_feature_product_default_sawloss' => 'SAWANDCUT_DEFAULT_SAWLOSS',
            'id_feature_product_default_minsawsize' => 'SAWANDCUT_DEFAULT_MINSAWSIZE',
            'id_feature_product_default_mincutsize' => 'SAWANDCUT_DEFAULT_MINCUTSIZE',
            'id_feature_product_default_mincutremainder' => 'SAWANDCUT_DEFAULT_MINCUTREMAINDER',
            'default_cut_price' => 'SAWANDCUT_DEFAULT_CUT_PRICE',
            'id_cms_offerpage' => 'SAWANDCUT_OFFER_PAGE',
            'id_cms_sawinfo_page' => 'SAWANDCUT_SAWINFO_PAGE',
            'id_cms_cutinfo_page' => 'SAWANDCUT_CUTINFO_PAGE',
            'single_cut_form_enabled' => 'SAWANDCUT_SINGLE_CUT_ENABLED',
        ];

        $cfg = [];
        foreach ($map as $internalKey => $configKey) {
            $val = Configuration::get($configKey, $this->idLang, $this->idShopGroup, $this->idShop);
            if ($val !== null && $val !== '') {
                $cfg[$internalKey] = ctype_digit((string) $val) ? (int) $val : $val;
            }
        }

        return $cfg;
    }

    private function getSawCutConfigValue(string $key, $default = null)
    {
        $cfg = $this->getSawCutConfig();
        return array_key_exists($key, $cfg) ? $cfg[$key] : $default;
    }

    // ===== Single Stock Attributes (SSA) =====
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

    private function useSsaForProduct(int $idProduct): bool
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

    private function getProductCombinationIDs(int $idProduct): array
    {
        return Db::getInstance()->executeS('
            SELECT id_product_attribute
            FROM ' . _DB_PREFIX_ . 'product_attribute
            WHERE id_product = ' . (int) $idProduct);
    }

    private function getSsaCombinationsForStockUpdate(int $idProduct): array
    {
        if ((int) Configuration::get('PS_STOCK_MANAGEMENT', $this->idLang, $this->idShopGroup, $this->idShop, 0) !== 1) {
            return [];
        }

        if (!$this->useSsaForProduct($idProduct)) {
            return [];
        }

        $combinations = $this->getProductCombinationIDs($idProduct);
        if (!$combinations) {
            return [];
        }

        return $combinations;
    }

    private function updateSsaStock(int $idProduct, int $idProductAttribute, int $quantity, bool $decrease = true): void
    {
        $combinations = $this->getSsaCombinationsForStockUpdate($idProduct);
        if (empty($combinations)) {
            return;
        }

        foreach ($combinations as $combination) {
            if ((int) $combination['id_product_attribute'] === (int) $idProductAttribute) {
                continue;
            }

            $current = (int) StockAvailable::getQuantityAvailableByProduct(
                $idProduct,
                (int) $combination['id_product_attribute'],
                (int) $this->context->shop->id
            );

            $newQty = $decrease ? ($current - $quantity) : ($current + $quantity);
            StockAvailable::setQuantity($idProduct, (int) $combination['id_product_attribute'], $newQty, (int) $this->context->shop->id, true);
        }
    }

    /**
     * Applies SSA stock synchronisation for a single cart/order line.
     * Expands pack products to their constituent items so that all other
     * combinations of each packed item are also adjusted, matching the
     * behaviour of hookActionValidateOrder.
     */
    private function applySsaStockForProduct(int $idProduct, int $idProductAttribute, int $quantity, bool $decrease): void
    {
        if (Pack::isPack($idProduct)) {
            $packedItems = Pack::getItems($idProduct, (int) Configuration::get('PS_LANG_DEFAULT'));
            foreach ($packedItems as $productItem) {
                $delta = $quantity * (int) $productItem->pack_quantity;
                $this->updateSsaStock(
                    (int) $productItem->id,
                    (int) $productItem->id_pack_product_attribute,
                    $delta,
                    $decrease
                );
            }
            return;
        }

        $this->updateSsaStock($idProduct, $idProductAttribute, $quantity, $decrease);
    }

    private function containsProductInAllVariants(int $idProduct, int $idProductAttribute = 0, int $idCustomization = 0, int $idAddressDelivery = 0)
    {
        if (!$this->context->cart || !(int) $this->context->cart->id) {
            return false;
        }

        $sql = 'SELECT cp.`quantity` FROM `' . _DB_PREFIX_ . 'cart_product` cp';

        if ($idCustomization) {
            $sql .= '
                LEFT JOIN `' . _DB_PREFIX_ . 'customization` c ON (
                    c.`id_product` = cp.`id_product`
                    AND c.`id_product_attribute` = cp.`id_product_attribute`
                )';
        }

        $sql .= ' WHERE cp.`id_product` = ' . (int) $idProduct;

        $sql .= ' AND cp.`id_customization` = ' . (int) $idCustomization . '
            AND cp.`id_cart` = ' . (int) $this->context->cart->id;
        if (Configuration::get('PS_ALLOW_MULTISHIPPING') && $this->context->cart->isMultiAddressDelivery()) {
            $sql .= ' AND cp.`id_address_delivery` = ' . (int) $idAddressDelivery;
        }

        if ($idCustomization) {
            $sql .= ' AND c.`id_customization` = ' . (int) $idCustomization;
        }

        $ret = Db::getInstance()->getRow($sql);
        if (isset($ret['quantity']) && $ret['quantity'] > 0) {
            $sql = 'SELECT sum(cp.`quantity`) as qty FROM `' . _DB_PREFIX_ . 'cart_product` cp
                WHERE cp.`id_product` = ' . (int) $idProduct . '
                AND cp.`id_cart` = ' . (int) $this->context->cart->id;
            $qty = Db::getInstance()->getRow($sql);
            if (isset($qty['qty'])) {
                $ret['quantity'] = $qty['qty'];
            }
        }

        return $ret;
    }

    public function hookActionValidateOrder($params): void
    {
        if ((int) Configuration::get('PS_STOCK_MANAGEMENT', $this->idLang, $this->idShopGroup, $this->idShop, 0) !== 1) {
            return;
        }

        $cart = $params['cart'] ?? null;
        if (!$cart instanceof Cart) {
            return;
        }

        foreach ($cart->getProducts() as $product) {
            $this->applySsaStockForProduct(
                (int) $product['id_product'],
                (int) $product['id_product_attribute'],
                (int) $product['cart_quantity'],
                true // decrease
            );
        }
    }

    public function hookActionGetProductPropertiesAfterUnitPrice(&$params): void
    {
        if (empty($params['product']['id_product'])) {
            return;
        }

        $idProduct = (int) $params['product']['id_product'];
        if (!$this->useSsaForProduct($idProduct)) {
            return;
        }

        $defaultAttribute = (int) Product::getDefaultAttribute($idProduct);
        $defaultStock = (int) StockAvailable::getQuantityAvailableByProduct(
            $idProduct,
            $defaultAttribute,
            (int) $this->context->shop->id
        );

        if ($cartQuantity = $this->containsProductInAllVariants($idProduct)) {
            $defaultStock -= (int) $cartQuantity['quantity'];
        }

        $params['product']['quantity'] = $defaultStock;
        $params['product']['quantity_all_versions'] = $defaultStock;
    }

    public function hookActionOrderEdited($params): void
    {
        if (Tools::getValue('action') !== 'addProductOnOrder') {
            return;
        }
        $product = Tools::getValue('add_product');
        if (!is_array($product)) {
            return;
        }
        if (!isset($product['product_id'], $product['product_attribute_id'], $product['product_quantity'])) {
            return;
        }

        $this->applySsaStockForProduct(
            (int) $product['product_id'],
            (int) $product['product_attribute_id'],
            (int) $product['product_quantity'],
            true // decrease
        );
    }

    public function hookActionProductCancel(array $params): void
    {
        if (empty($params['order']) || empty($params['id_order_detail'])) {
            return;
        }

        $order = $params['order'];
        $idOrderDetail = (int) $params['id_order_detail'];

        $orderDetail = new \OrderDetail($idOrderDetail);
        if (!Validate::isLoadedObject($orderDetail)) {
            return;
        }

        // Only move stock if the cancellation/return actually adds stock back.
        // PrestaShop's core handles the main product's stock. We handle SSA variants.
        //
        // PS 9.x passes `cancel_quantity` from all four cancel handlers:
        //   CancelOrderProductHandler, IssueStandardRefundHandler  → always reinjects stock
        //   IssueReturnProductHandler, IssuePartialRefundHandler    → reinjects only when "restock" is checked
        // The hook fires even when the admin chose NOT to restock (return/partial cases).
        // Since PS does not expose a restock flag in the hook params, we mirror the core:
        // if cancel_quantity > 0 the hook implies at least that quantity was meant to be processed.
        // Edge case: RETURN_PRODUCT / PARTIAL_REFUND without restock will still run this code,
        // but in that scenario the main combination was also not restocked by core, so the
        // SSA imbalance already existed — restoring symmetry here is the safest default.
        $qtyToRefund = (int) ($params['cancel_quantity'] ?? 0);

        if ($qtyToRefund <= 0) {
            return;
        }

        $this->applySsaStockForProduct(
            (int) $orderDetail->product_id,
            (int) $orderDetail->product_attribute_id,
            $qtyToRefund,
            false // increase stock
        );
    }

    private function applySsaOrderStatusPostUpdate($data): void
    {
        if (!defined('_PS_ADMIN_DIR_')) {
            return;
        }
        if (empty($data['id_order']) || empty($data['newOrderStatus'])) {
            return;
        }

        $newOrderStatus = $data['newOrderStatus'];

        // PS core passes both old and new OrderState objects directly in the hook params.
        // Do NOT re-query order_history — the query timing is unreliable (hook fires before
        // the new history row is committed) and the data is already here.
        $oldOrderStatus = $data['oldOrderStatus'] ?? null;
        if (!($oldOrderStatus instanceof \OrderState)) {
            return;
        }

        $order = new Order((int) $data['id_order']);
        if (!Validate::isLoadedObject($order)) {
            return;
        }

        $cart = new Cart((int) $order->id_cart);

        // Cast to int: Configuration::get() returns strings; OrderState->id is int.
        // in_array with strict=true would silently fail on this type mismatch.
        $errorOrCanceledStatuses = [
            (int) Configuration::get('PS_OS_ERROR'),
            (int) Configuration::get('PS_OS_CANCELED'),
            (int) Configuration::get('PS_OS_REFUNDED'),
            (int) Configuration::get('PS_OS_RETURN_COMPLETED'),
        ];

        $moveStock = false;
        $addStock = false;
        $newId = (int) $newOrderStatus->id;
        $oldId = (int) $oldOrderStatus->id;

        if (!$newOrderStatus->logable && $oldOrderStatus->logable && in_array($newId, $errorOrCanceledStatuses)) {
            // logable → cancelled/error: reinstate stock
            $addStock = true;
            $moveStock = true;
        } elseif ($newOrderStatus->logable && !$oldOrderStatus->logable && in_array($oldId, $errorOrCanceledStatuses)) {
            // cancelled/error → logable: re-decrease stock
            $addStock = false;
            $moveStock = true;
        } elseif (!$newOrderStatus->logable && !$oldOrderStatus->logable
            && in_array($newId, $errorOrCanceledStatuses)
            && !in_array($oldId, $errorOrCanceledStatuses)) {
            // non-logable non-cancel → cancelled/error: reinstate stock
            $addStock = true;
            $moveStock = true;
        }

        if (!$moveStock) {
            return;
        }

        foreach ($cart->getProducts() as $product) {
            $this->applySsaStockForProduct(
                (int) $product['id_product'],
                (int) $product['id_product_attribute'],
                (int) $product['cart_quantity'],
                !$addStock
            );
        }
    }

    public function hookDisplayBeforeBodyClosingTag($params)
    {
        $html = $this->context->smarty->fetch('modules/'.$this->module->name.'/views/templates/hook/sawcut_modal.tpl');
        if (\MsThemeConfig\Plasma\PlasmaSettings::get('ENABLED', (int) $this->context->shop->id, false)) {
            $html .= $this->context->smarty->fetch('modules/'.$this->module->name.'/views/templates/hook/plasmacutting_modal.tpl');
        }
        return $html;
    }

    public function hookDisplayProductListReviews($product)
    {
        return $this->renderSawCutAction($product);
    }

    public function hookDisplayProductSawAndCutButtons($product)
    {
        return $this->renderSawCutAction($product);
    }

    private function renderSawCutAction($product)
    {
        $productObj = null;
        $productId = 0;
        if (is_array($product)) {
            if(array_key_exists('product', $product)){
                $product = $product['product'];
            }
            if ($product instanceof \ArrayAccess) {
                $productId = (int) ($product['id_product'] ?? $product['id'] ?? 0);
            } elseif (is_object($product)) {
                $productObj = $product;
                $productId = (int) $product->id;
            } else {
                $productId = isset($product['id_product']) ? (int) $product['id_product'] : 0;
            }
            if ($productId && is_array($product) && (!isset($product['features']) || empty($product['features']))) {
                $product['features'] = Product::getFrontFeaturesStatic($this->idLang, $productId);
            }


            $this->context->smarty->assign('product', $product);
        } elseif ($product instanceof \ArrayAccess) {
            $productId = (int) ($product['id_product'] ?? $product['id'] ?? 0);
            $this->context->smarty->assign('product', $product);
        } elseif (is_object($product)) {
            $productObj = $product;
            $productId = (int) $product->id;
            $this->context->smarty->assign('product', $product);
        }

        if ($productObj && !($productObj instanceof Product) && $productId) {
            $productObj = new Product($productId);
        } elseif (!$productObj && $productId) {
            $productObj = new Product($productId);
            if (is_array($product)) {
                if (!isset($product['default_cut_price'])) {
                    $product['default_cut_price'] = $productObj->default_cut_price;
                }
                if (!isset($product['min_cut_size'])) {
                    $product['min_cut_size'] = $productObj->min_cut_size;
                }
                if (!isset($product['min_cut_remainder'])) {
                    $product['min_cut_remainder'] = $productObj->min_cut_remainder;
                }
                $this->context->smarty->assign('product', $product);
            }
        }

        $this->context->smarty->assign([
            'plasmaEnabled' => $productId > 0 && \MsThemeConfig\Plasma\PlasmaService::enabled($productId),
            'plasmaProductAttributeId' => (int) (is_array($product) || $product instanceof \ArrayAccess
                ? ($product['id_product_attribute'] ?? Product::getDefaultAttribute($productId))
                : ($product->id_product_attribute ?? Product::getDefaultAttribute($productId))),
        ]);
        $cutAttributeId = (int) $this->getSawCutConfigValue('id_attribute_group_cut', 0);
        $sawAttributeId = (int) $this->getSawCutConfigValue('id_attribute_group', 0);
        $maxCuts = 0;
        $maxSawCuts = 0;
        $combiPrices = [];

        if ($productId && $productObj) {
            $productAttributes = Product::getAttributesInformationsByProduct($productId);
            foreach ($productAttributes as $attribute) {
                $combination = $productObj->getAttributeCombinationsById(
                    $attribute['id_attribute'],
                    $this->context->cookie->id_lang,
                    false
                );
                if (!empty($combination)) {
                    switch ((int) $attribute['id_attribute_group']) {
                        case $cutAttributeId:
                            $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                            $maxCuts++;
                            break;
                        case $sawAttributeId:
                            $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                            $maxSawCuts++;
                            break;
                    }
                }
            }
        }

        asort($combiPrices);

        $attr = [
            'singleCutEnabled' => (bool) $this->getSawCutConfigValue('single_cut_form_enabled', 0),
            'combiPrices' => $combiPrices,
            'maxCuts' => $maxCuts - 1,
            'maxSawCuts' => $maxSawCuts - 1,
            'sawLength' => $this->getSawCutConfigValue('id_feature_product_length'),
            'cutLength' => $this->getSawCutConfigValue('id_feature_product_cutlength'),
            'cutWidth' => $this->getSawCutConfigValue('id_feature_product_cutwidth'),
            'defaultSawLoss' => $this->getSawCutConfigValue('id_feature_product_default_sawloss'),
            'defaultSawSize' => $this->getSawCutConfigValue('id_feature_product_default_minsawsize'),
            'defaultMinCutSize' => $this->getSawCutConfigValue('id_feature_product_default_mincutsize'),
            'defaultMinCutRemainder' => $this->getSawCutConfigValue('id_feature_product_default_mincutremainder'),
            'is_catalog' => (bool) Configuration::isCatalogMode(),
        ];
        $this->context->smarty->assign('attr', $attr);
        // Render migrated template (paths adjusted to msthemeconfig)
        return $this->context->smarty->fetch('modules/'.$this->module->name.'/views/templates/front/sawcut_action.tpl');
    }

    public function hookDisplayAdminProductsExtra($params)
    {
        // Cleaned up: do not render fallback blocks here to avoid duplicate UI.
        // All fields are handled via Symfony hooks (DataProvider + FormBuilderModifier).
        return '';
    }

    public function hookActionOrderStateFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];

        $formBuilder->add('visible_in_select_box', SwitchType::class, [
            'label' => $this->module->getTranslator()->trans('Visible in select box', [], 'Modules.Msthemeconfig.Admin'),
            'required' => false,
        ]);
    }

    public function hookActionOrderStateFormDataProviderData(array $params): void
    {
        $idOrderState = (int)$params['id'];
        if (!$idOrderState) {
            return;
        }

        $orderState = new \OrderState($idOrderState);
        $params['data']['visible_in_select_box'] = (bool)$orderState->visible_in_select_box;
    }

    public function hookActionAfterUpdateOrderStateFormHandler(array $params): void
    {
        $this->handleOrderStateFormSave($params);
    }

    public function hookActionAfterCreateOrderStateFormHandler(array $params): void
    {
        $this->handleOrderStateFormSave($params);
    }

    private function handleOrderStateFormSave(array $params): void
    {
        $idOrderState = (int)$params['id'];
        $formData = $params['form_data'];

        if (isset($formData['visible_in_select_box'])) {
            $orderState = new \OrderState($idOrderState);
            $orderState->visible_in_select_box = (int)$formData['visible_in_select_box'];
            $orderState->update();
        }
    }

    /**
     * Inject Saw/Cut inputs into Product Details tab (above the Reference field)
     * via the Symfony form builder hook.
     *
     * Expected nesting: root > details (DetailsType) > references (ReferencesType)
     */
    public function hookActionOrderStateGridDefinitionModifier(array $params): void
    {
        /** @var GridDefinitionInterface $definition */
        $definition = $params['definition'];

        /** @var ColumnCollection $columns */
        $columns = $definition->getColumns();

        $visibleColumn = (new ToggleColumn('visible_in_select_box'))
            ->setName($this->module->getTranslator()->trans('Visible in select box', [], 'Modules.Msthemeconfig.Admin'))
            ->setOptions([
                'field' => 'visible_in_select_box',
                'primary_field' => 'id_order_state',
                'route' => 'admin_order_states_toggle_visible_in_select_box',
                'route_param_name' => 'orderStateId',
            ]);

        try {
            $columns->addAfter('invoice', $visibleColumn);
        } catch (ColumnNotFoundException $e) {
            $columns->add($visibleColumn);
        }

        /** @var FilterCollection $filters */
        $filters = $definition->getFilters();
        $filters->add(
            (new Filter('visible_in_select_box', YesAndNoChoiceType::class))
                ->setAssociatedColumn('visible_in_select_box')
        );

    }

    public function hookActionOrderStateGridQueryBuilderModifier(array $params): void
    {
        /** @var QueryBuilder $searchQueryBuilder */
        $searchQueryBuilder = $params['search_query_builder'];
        $searchQueryBuilder->addSelect('os.visible_in_select_box');

        /** @var QueryBuilder $countQueryBuilder */
        $countQueryBuilder = $params['count_query_builder'];

        // Apply filter
        /** @var SearchCriteriaInterface $searchCriteria */
        $searchCriteria = $params['search_criteria'];
        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {
            if ('visible_in_select_box' === $filterName) {
                $searchQueryBuilder->andWhere('os.`visible_in_select_box` = :visible_in_select_box');
                $searchQueryBuilder->setParameter('visible_in_select_box', $filterValue);

                $countQueryBuilder->andWhere('os.`visible_in_select_box` = :visible_in_select_box');
                $countQueryBuilder->setParameter('visible_in_select_box', $filterValue);
            }
        }
    }

    public function hookActionProductFormBuilderModifier(array $params): void
    {
        try {
            /** @var FormBuilderInterface|null $formBuilder */
            $formBuilder = $params['form_builder'] ?? null;
            if (!$formBuilder) {
                return;
            }
            $this->injectSawCutFieldsIntoReferences($formBuilder, $params);
            $this->injectSecondNameAndJsonLd($formBuilder, $params);
        } catch (\Throwable $e) {
            // Fail silent to avoid blocking product page
        }
    }

    /**
     * Prefill product form data for custom fields before the form is built
     * so that our Symfony-added fields have the right initial values.
     */
    public function hookActionProductFormDataProviderData(array $params): void
    {
        try {
            // In PrestaShop hooks, data is passed by reference in $params['data']
            if (!isset($params['data']) || !is_array($params['data'])) {
                return;
            }
            $data =& $params['data'];

            $idProduct = (int)($params['id'] ?? 0);
            $product = $idProduct > 0 ? new Product($idProduct) : new Product();

            // Ensure nested arrays exist
            if (!isset($data['details']) || !is_array($data['details'])) {
                $data['details'] = [];
            }
            if (!isset($data['details']['references']) || !is_array($data['details']['references'])) {
                $data['details']['references'] = [];
            }

            // Load defaults
            $default_sawloss = $this->getSawCutConfigValue('id_feature_product_default_sawloss', 0);
            $default_minsawsize = $this->getSawCutConfigValue('id_feature_product_default_minsawsize', 0);
            $default_mincutsize = $this->getSawCutConfigValue('id_feature_product_default_mincutsize', 0);
            $default_mincutremainder = $this->getSawCutConfigValue('id_feature_product_default_mincutremainder', 0);

            // References subform values (prefer product value; fallback to defaults when empty/null/0)
            $data['details']['references']['saw_loss'] = (isset($product->saw_loss) && (float)$product->saw_loss > 0)
                ? (string)$product->saw_loss : (string)$default_sawloss;
            $data['details']['references']['min_saw_size'] = (isset($product->min_saw_size) && (float)$product->min_saw_size > 0)
                ? (string)$product->min_saw_size : (string)$default_minsawsize;
            $data['details']['references']['min_cut_size'] = (isset($product->min_cut_size) && (float)$product->min_cut_size > 0)
                ? (string)$product->min_cut_size : (string)$default_mincutsize;
            $data['details']['references']['min_cut_remainder'] = (isset($product->min_cut_remainder) && (float)$product->min_cut_remainder > 0)
                ? (string)$product->min_cut_remainder : (string)$default_mincutremainder;

            // Second name: prefer placing under 'basic', fallback 'information'
            if (!isset($data['header']) || !is_array($data['header'])) {
                $data['header'] = [];
            }
            $data['header']['second_name'] = isset($product->second_name) ? (string)$product->second_name : '';

            // Also set in information if present in this build
            if (isset($data['information']) && is_array($data['information'])) {
                $data['information']['second_name'] = isset($product->second_name) ? (string)$product->second_name : '';
            }

            // JSON-LD resides in SEO section in most builds
            if (!isset($data['seo']) || !is_array($data['seo'])) {
                $data['seo'] = [];
            }
            $data['seo']['jsonld'] = isset($product->jsonld) ? (string)$product->jsonld : '';

            // Fallbacks for alternative SEO keys present in some builds
            if (isset($data['seo_options']) && is_array($data['seo_options'])) {
                $data['seo_options']['jsonld'] = isset($product->jsonld) ? (string)$product->jsonld : '';
            }
            if (isset($data['meta']) && is_array($data['meta'])) {
                $data['meta']['jsonld'] = isset($product->jsonld) ? (string)$product->jsonld : '';
            }

        } catch (\Throwable $e) {
            // silent fail to avoid breaking BO
        }
    }

    private function injectSawCutFieldsIntoReferences(FormBuilderInterface $formBuilder, array $params): void
    {
        if (!$formBuilder->has('details')) {
            return; // Unexpected layout
        }

        $detailsBuilder = $formBuilder->get('details');
        if (!$detailsBuilder->has('references')) {
            return; // Unexpected layout
        }

        $referencesBuilder = $detailsBuilder->get('references');

        // Load defaults & product values
        $idProduct = (int)($params['id'] ?? 0);
        $product = $idProduct > 0 ? new Product($idProduct) : new Product();

        $default_sawloss = $this->getSawCutConfigValue('id_feature_product_default_sawloss', 0);
        $default_minsawsize = $this->getSawCutConfigValue('id_feature_product_default_minsawsize', 0);
        $default_mincutsize = $this->getSawCutConfigValue('id_feature_product_default_mincutsize', 0);
        $default_mincutremainder = $this->getSawCutConfigValue('id_feature_product_default_mincutremainder', 0);
        $default_cut_price = $this->getSawCutConfigValue('default_cut_price', 0);

        // Add a form group for "Saw and Cut"
        $referencesBuilder
            ->add('saw_cut_group', FormType::class, [
                'label' => $this->module->l('Saw and Cut', 'msthemeconfig'),
                'required' => false,
                'attr' => [
                    'class' => 'form-group',
                ],
                'row_attr' => [
                  'class' => 'form-group full-width',
                ],
                'label_attr' => [
                    'class' => 'form-control-label h3',
                ],
            ]);

        // Get the saw_cut_group builder to add fields inside it
        $sawCutGroupBuilder = $referencesBuilder->get('saw_cut_group');

        $sawCutGroupBuilder
            ->add('saw_loss', TextType::class, [
                'required' => false,
                'label' => $this->module->l('Saw Loss', 'msthemeconfig'),
                'empty_data' => '',
                'data' => isset($product->saw_loss) && (float)$product->saw_loss > 0 ? (string)$product->saw_loss : (string)$default_sawloss,
            ])
            ->add('min_saw_size', TextType::class, [
                'required' => false,
                'label' => $this->module->l('Minimum Saw Size', 'msthemeconfig'),
                'empty_data' => '',
                'data' => isset($product->min_saw_size) && (float)$product->min_saw_size > 0 ? (string)$product->min_saw_size : (string)$default_minsawsize,
            ])
            ->add('min_cut_size', TextType::class, [
                'required' => false,
                'label' => $this->module->l('Minimum Cut Size', 'msthemeconfig'),
                'empty_data' => '',
                'data' => isset($product->min_cut_size) && (float)$product->min_cut_size > 0 ? (string)$product->min_cut_size : (string)$default_mincutsize,
            ])
            ->add('min_cut_remainder', TextType::class, [
                'required' => false,
                'label' => $this->module->l('Minimum Cut Remainder', 'msthemeconfig'),
                'empty_data' => '',
                'data' => isset($product->min_cut_remainder) && (float)$product->min_cut_remainder > 0 ? (string)$product->min_cut_remainder : (string)$default_mincutremainder,
            ])
            ->add('default_cut_price', TextType::class, [
                'required' => false,
                'label' => $this->module->l('Default cut price', 'msthemeconfig'),
                'empty_data' => '',
                'data' => (string)$default_cut_price,
            ])
        ;
    }



    private function injectSecondNameAndJsonLd(FormBuilderInterface $formBuilder, array $params): void
    {
        // Inject second_name under Name field (Basic/Information section)
        try {
            $idProduct = (int)($params['id'] ?? 0);
            $product = $idProduct > 0 ? new Product($idProduct) : new Product();

            // Try common containers for name field in PS 9
            $candidates = ['header', 'options'];
            foreach ($candidates as $candidate) {
                if ($formBuilder->has($candidate)) {
                    $sub = $formBuilder->get($candidate);
                    // Add second_name at this level

                    if (!$sub->has('second_name')) {
                        $all = $sub->all();

                        foreach ($all as $item) {
                            $sub->remove($item->getName());
                            if($item->getName() === 'name'){
                                $sub->add($item);
                                $sub->add('second_name', TextType::class, [
                                    'required' => false,
                                    'label' => $this->module->l('Second name', 'msthemeconfig'),
                                    'empty_data' => '',
                                    'data' => isset($product->second_name) ? (string)$product->second_name : '',
                                    'attr' => [
                                        'class' => 'w-100',
                                    ],
                                    'row_attr' => [
                                        'class' => 'form-group header-name',
                                    ],
                                ]);
                            } else {
                                $sub->add($item);
                            }

                        }


                    }
                    break;
                }
            }

            // Inject jsonld into SEO/metadata section
            $seoCandidates = ['seo', 'seo_options', 'meta'];
            $seoBuilder = null;
            foreach ($seoCandidates as $seo) {
                if ($formBuilder->has($seo)) {
                    $seoBuilder = $formBuilder->get($seo);
                    break;
                }
            }
            if ($seoBuilder) {
                if (!$seoBuilder->has('jsonld')) {
                    $seoBuilder->add('jsonld', TextareaType::class, [
                        'required' => false,
                        'label' => $this->module->l('JSON-LD', 'msthemeconfig'),
                        'help' => $this->module->l('Enter custom JSON-LD structured data for this product. Leave empty to use auto-generated data.', 'msthemeconfig'),
                        'empty_data' => '',
                        'data' => isset($product->jsonld) ? (string)$product->jsonld : '',
                        'attr' => [
                            'rows' => 8,
                            'class' => 'monospace',
                        ],
                    ]);
                }
            }
        } catch (\Throwable $e) {
            // silent
        }
    }

    private function renderAdminSawCutFieldsBlock(array $param)
    {
        // No longer used. Kept for backward compatibility.
        return '';
    }

    public function hookDisplayAdminProductsMainStepLeftColumnMiddle($param)
    {
        // Cleaned up: no legacy rendering in product form columns
        return '';
    }

    // PS9 compatibility: some BO layouts use Bottom slots instead of Middle
    public function hookDisplayAdminProductsMainStepLeftColumnBottom($param)
    {
        return '';
    }

    public function hookDisplayAdminProductsMainStepRightColumnBottom($param)
    {
        return '';
    }

    /**
     * Flag to avoid handling product update twice within a single request
     */
    private bool $productUpdateHandled = false;

    /**
     * Called on product update (legacy hook). We use this as an earlier point in the lifecycle
     * than the Symfony form handler "after" hooks in order to persist our custom fields.
     *
     * @param array $params
     * @return string
     */
    public function hookActionProductUpdate($params)
    {
        // Prevent double-processing if we already handled update via another hook in this request
        if ($this->productUpdateHandled) {
            return '';
        }

        // Set guard BEFORE any work so that the nested $product->update() call
        // inside persistSawCutFieldsFromForm cannot trigger this hook again.
        $this->productUpdateHandled = true;

        try {
            // Try to determine product id from various possible params
            $idProduct = 0;
            if (isset($params['id_product'])) {
                $idProduct = (int)$params['id_product'];
            } elseif (isset($params['id'])) {
                $idProduct = (int)$params['id'];
            } elseif (isset($params['product']) && $params['product'] instanceof Product) {
                $idProduct = (int)$params['product']->id;
            }

            // Build a minimal params array compatible with persistSawCutFieldsFromForm
            $formData = [];
            if (isset($params['form_data']) && is_array($params['form_data'])) {
                $formData = $params['form_data'];
            } elseif (isset($_POST['product']) && is_array($_POST['product'])) {
                // Symfony product form usually posts in the 'product' root key
                $formData = $_POST['product'];
            }

            $persistParams = [
                'id' => $idProduct,
                'form_data' => $formData,
            ];

            $this->persistSawCutFieldsFromForm($persistParams);
        } catch (\Throwable $e) {
            // swallow to not break core flow
        }

        return '';
    }

    /**
     * Generic object update after hook. Used to ensure our product update logic runs
     * even when core triggers generic hooks rather than the product-specific one first.
     * This hook is fired before actionAfterUpdateProductFormHandler in core.
     *
     * @param array $params
     * @return void
     */
    public function hookActionObjectUpdateAfter(array $params): void
    {
        if ($this->productUpdateHandled) {
            return; // already handled elsewhere in this request
        }

        if (!isset($params['object']) || !($params['object'] instanceof \ObjectModel)) {
            return;
        }

        $object = $params['object'];
        // Only handle for Product objects
        if ($object instanceof Product) {
            $this->hookActionProductUpdate([
                'product' => $object,
                'id_product' => (int)$object->id,
            ]);
        }
    }


    /**
     * @param $params
     * @return void
     */
    public function hookActionCancelProductFormBuilderModifier($params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];
        $link = parse_url($this->context->link->getAdminLink('AdminOrders'));

        if(array_key_exists('query', $link)){
            $formBuilder->setAction('/admin-dev/sell/orders/'.$params['id'].'/partial-refund?'.$link['query']);
        } else {
            $formBuilder->setAction('/admin-dev/sell/orders/'.$params['id'].'/partial-refund');
        }

    }

    /**
     * Persist custom Saw/Cut fields after product update (or creation)
     */
    public function hookActionAfterUpdateProductFormHandler(array $params): void
    {
        $this->persistSawCutFieldsFromForm($params);
    }

    /**
     * Persist custom Saw/Cut fields after product creation
     */
    public function hookActionAfterCreateProductFormHandler(array $params): void
    {
        $this->persistSawCutFieldsFromForm($params);
    }

    private function persistSawCutFieldsFromForm(array $params): void
    {
        try {
            $idProduct = (int)($params['id'] ?? 0);
            if ($idProduct <= 0) {
                return;
            }

            $formData = $params['form_data'] ?? [];
            if (!is_array($formData)) {
                $formData = [];
            }

            $references = $formData['details']['references'] ?? [];
            if (!is_array($references)) {
                $references = [];
            }

            // Only use raw values that were actually submitted. Tools::getValue()
            // returns false for a missing value; treating that as form data caused
            // this hook to perform a second, unrestricted Product update for every
            // product save (including offer-row saves).
            if ($references === []) {
                foreach (['saw_loss', 'min_saw_size', 'min_cut_size', 'min_cut_remainder'] as $field) {
                    if (Tools::getIsset($field)) {
                        $references[$field] = Tools::getValue($field);
                    }
                }
            }

            $valuesToPersist = [];
            foreach (['saw_loss', 'min_saw_size', 'min_cut_size', 'min_cut_remainder'] as $field) {
                if (
                    array_key_exists($field, $references)
                    && $references[$field] !== ''
                    && $references[$field] !== null
                    && $references[$field] !== false
                ) {
                    $valuesToPersist[$field] = (float)$references[$field];
                }
            }

            // Persist second_name under Header section
            $secondName = null;
            if (isset($formData['header']['second_name'])) {
                $secondName = $formData['header']['second_name'];
            } elseif (isset($formData['basic']['second_name'])) {
                $secondName = $formData['basic']['second_name'];
            } elseif (isset($formData['information']['second_name'])) {
                $secondName = $formData['information']['second_name'];
            } elseif (Tools::getIsset('second_name')) {
                $secondName = Tools::getValue('second_name');
            }
            if ($secondName !== null) {
                $valuesToPersist['second_name'] = (string)$secondName;
            }

            // Persist jsonld in SEO/metadata section
            $jsonLd = null;
            if (isset($formData['seo']['jsonld'])) {
                $jsonLd = $formData['seo']['jsonld'];
            } elseif (isset($formData['seo']['meta']['jsonld'])) {
                $jsonLd = $formData['seo']['meta']['jsonld'];
            } elseif (isset($formData['meta']['jsonld'])) {
                $jsonLd = $formData['meta']['jsonld'];
            } elseif (Tools::getIsset('jsonld')) {
                $jsonLd = Tools::getValue('jsonld');
            }
            if ($jsonLd !== null) {
                $valuesToPersist['jsonld'] = (string)$jsonLd;
            }

            // Most product updates do not contain any of these custom form fields.
            // In that case there is nothing for this hook to persist.
            if ($valuesToPersist === []) {
                return;
            }

            $product = new Product($idProduct);
            $fieldsToUpdate = [];
            foreach ($valuesToPersist as $field => $value) {
                $product->{$field} = $value;
                $fieldsToUpdate[$field] = true;
            }

            // Never rewrite the complete Product from this auxiliary hook. A
            // multistore column with the same name can otherwise shadow a base
            // value while loading and then overwrite that base value with NULL.
            $product->setFieldsToUpdate($fieldsToUpdate);
            $product->update();
        } catch (\Throwable $e) {
            // soft-fail: we don't block product save if our custom persistence fails
        }
    }

    /**
     * @param $url
     * @param string $type
     * @return array
     */
    private function fetchDataFromInformerApi($url, string $type='payment_conditions'): array
    {
        $curlCard = curl_init();

        $security_code = Configuration::get('CREDITPAYMENT_INFORMER_SECURITY_CODE', $this->idLang, $this->idShopGroup, $this->idShop, "62356");
        $api_key = Configuration::get('CREDITPAYMENT_INFORMER_API_KEY', $this->idLang, $this->idShopGroup, $this->idShop, "MEUGbrj3nT8Z4orUVznSQRMCYFxP6SySePckp0tVfJPrcB1DjO2");

        $headers = [
            "accept: application/json",
            "Securitycode: " . $security_code,
            "Apikey: " . $api_key,
        ];

        curl_setopt_array($curlCard, [
            CURLOPT_URL => "https://api.informer.eu/v1/" . $url . "?records=500&page=0",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => json_encode([]),
        ]);
        $info = curl_getinfo($curlCard);
        $response = curl_exec($curlCard);
        if (!curl_errno($curlCard)) {
            $returnData = json_decode($response);
            $arrayList = [];
            foreach ($returnData->{$type} as $index => $item){
                $name = $item->company_name . ' ('.$item->zip.'/'.$item->house_number.$item->house_number_suffix.')';
                if(!empty($item->firstname) || !empty($item->surname_prefix) || !empty($item->surname)){
                    $name .= ' - '.$item->firstname . ' ' . $item->surname_prefix.' '.$item->surname;
                }
                $arrayList[$name] = $index;
            }
        } else {
            $arrayList = [];
        }
        curl_close($curlCard);

        return $arrayList;
    }


    /**
     * Add house number and house number extension fields to address form
     *
     * @param array $params
     *
     */
    public function hookActionCustomerFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];
        $relations = $this->fetchDataFromInformerApi('relations/', 'relation');

        $formBuilder->add('informer_identification', ChoiceType::class, [
            'label' => $this->context->getTranslator()->trans('Informer Identification', [],
                'Modules.ModernesSmidThemeConfigurator'),
            'required' => false,
            'choices' => $relations
        ]);

        $customer = new Customer($params['id']);
        $params['data']['informer_identification'] = $customer->informer_identification;

        $formBuilder->setData($params['data']);
    }


    /**
     * @return array
     */
    public function hookAdditionalCustomerFields(): array
    {
        return [
            (new FormField())
                ->setName('informer_identification')
                ->setType('select')
                ->setRequired(false)
                ->setLabel($this->context->getTranslator()->trans('Informer Identification',[],'MsThemeConfig.Hooks')),
        ];
    }


    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateCustomerFormHandler(array $params)
    {
//        return $this->updateCustomCustomerFields($params);
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateCustomerFormHandler(array $params)
    {
//        return $this->updateCustomCustomerFields($params);
    }

    /**
     * Update / Create
     *
     * @param array $params
     *
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function updateCustomCustomerFields(array $params): array
    {
        $customerId = (int)$params['id'];
        /** @var array $customerFormData */
        $customerFormData = $params['form_data'];

        $informer_identification = $customerFormData['informer_identification'];
        if (!$informer_identification) {
            $informer_identification = 0;
        }
        $customer = new Customer($customerId);
        $customer->informer_identification = $informer_identification;
        $customer->update();

        return $params;
    }

    /**
     * @param $value
     * @return string
     */
    public function callbackMethod($value): string
    {
        if ($value) {
            return '<span class="label label-primary">Retour aangemaakt</span>';
        } else {
            return '<button class="btn btn-primary">Retour aanmaken</button>';
        }
    }

    /**
     *
     * Generate Label for koopman and other status changes
     *
     * @param $object
     * @return void
     */
    private function generateKoopmanLabelButtons($object): void
    {
        $shippingCarrierReference = (int) Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop);
        $pickupCarrierReference = (int) Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop);
        $addedCarrierReference = (int) Configuration::get('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop);

        $shipC = Carrier::getCarrierByReference($shippingCarrierReference);
        $pickC = Carrier::getCarrierByReference($pickupCarrierReference);
        $addC = Carrier::getCarrierByReference($addedCarrierReference);

        $readyForShippingState = (int)Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $shippingState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $workshopState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_WORKSHOP_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $waitingState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_WAITING_STOCK_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $pickupState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $pickedupState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKEDUP_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $addedState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);

        $labelColumn = new LabelButtonColumn('label');
        $labelColumn->setName('Koopman Label');
        $labelColumn->setOptions([
            'ModuleClass' => new DmsAdminOrderController(),
            'label' => $this->context->getTranslator()->trans('Label',[],'MsThemeConfig.Hooks'),
            'stateCarrier' => [
                'shipping' => $shippingCarrierReference,
                'shipping_label' => Validate::isLoadedObject($shipC) ? $shipC->name : '',
                'pickup' => $pickupCarrierReference,
                'pickup_label' => Validate::isLoadedObject($pickC) ? $pickC->name : '',
                'added' => $addedCarrierReference,
                'added_label' => Validate::isLoadedObject($addC) ? $addC->name : ''
            ],
            'stateType' => [
                'ready' => $readyForShippingState,
                'shipping' => $shippingState,
                'workshop' => $workshopState,
                'waiting' => $waitingState,
                'pickup' => $pickupState,
                'pickedup' => $pickedupState,
                'added' => $addedState,

            ]
        ]);
        try {
                $object->addBefore('osname', $labelColumn);
        } catch (ColumnNotFoundException $e) {
            $object->add($labelColumn);
        }
    }

    /**
     * @param array $params
     * @return void
     */
    public function hookActionAddressGridQueryBuilderModifier(array $params)
    {
        $searchQueryBuilder = $params['search_query_builder'];

        $searchQueryBuilder->addSelect('CONCAT(a.`address1`," ", a.`house_number`," ", a.`house_number_extension`) as address1');
    }

    /**
     * Hooks allows to modify Order grid definition.
     * This hook is a right place to add/remove columns or actions (bulk, grid).
     *
     * @param array $params
     * @throws ColumnNotFoundException
     */
    public function hookActionOrderGridDefinitionModifier(array $params): void
    {

        /** @var GridDefinitionInterface $definition */
        $definition = $params['definition'];

        /** @var ColumnCollection */
        $columns = $definition->getColumns();

        $f = $definition->getFilters();

        if(array_key_exists('osname',  $f->all())){
            $this->generateKoopmanLabelButtons($columns);
        }


        $addedToOrderColumn = new DataColumn('added_to_order');
        $addedToOrderColumn->setOptions(['sortable' => true, 'clickable' => false, 'field' => 'added_to_order']);
        $addedToOrderColumn->setName('Toegevoegd');
        try {
            $columns->addAfter('reference', $addedToOrderColumn);
        } catch (ColumnNotFoundException $e) {
            $columns->add($addedToOrderColumn);
        }

        $states = [];
        $createdStates = [];
        $shippedStates = [];
        if (Configuration::get('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop) !== null && !empty(Configuration::get('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop))) {
            $states = KoopmanReturnSettings::parseStates(Configuration::get('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop));
        }

        if (Configuration::get('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop) !== null && !empty(Configuration::get('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop))) {
            $createdStates = KoopmanReturnSettings::parseStates(Configuration::get('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop));
        }

        if (Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop) !== null && !empty(Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop))) {
            $shippedStates = explode(',', Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop));
        }
        $retourColumn = new ButtonColumn('retour');
        $retourColumn->setName('Retour');
        $retourColumn->setOptions([
            'ModuleClass' => new DmsAdminOrderController(),
            'label' => $this->context->getTranslator()->trans('Retour aanmaken Transmission',[],'MsThemeConfig.Hooks'),
            'icon' => 'keyboard_return',
            'acceptedStates' => $states,
            'createdStates' => $createdStates,
            'retourUrl' => $this->context->link->getAdminLink('AdminOrders', true, [
                'route' => 'admin_koopman_return_form',
            ]),
        ]);
        try {
            $columns->addBefore('date_add', $retourColumn);
        } catch (ColumnNotFoundException $e) {
            $columns->add($retourColumn);
        }

        //Profile 3 is werkplaats medewerkers admin is 1
        $workshopProfiles = Configuration::get('MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES', null, null, 1, "5,6,7");

        $profiles = [];
        if (!empty($workshopProfiles)) {
            $profiles = explode(',', $workshopProfiles);
        }
        if (in_array($this->context->cookie->profile, $profiles)) {
            $disabledArray = ['country_name', 'new', 'total_paid_tax_incl', 'payment', 'second_chance', 'retour'];
            foreach ($disabledArray as $column_name) {
                $columns->remove($column_name);
            }
        } else {
            //Adding filters
            $filters = $definition->getFilters();

            $emailFilter = new Filter('email', TextType::class);
            $emailFilter->setTypeOptions([
                'required' => false,
                'attr' => [
                    'placeholder' => $this->context->getTranslator()->trans('Zoek email', [], 'Admin.Actions'),
                ],
            ]);
            $emailFilter->setAssociatedColumn('email');
            $filters->add($emailFilter);

            $postcodeFilter = new Filter('postcode', TextType::class);
            $postcodeFilter->setTypeOptions([
                'required' => false,
                'attr' => [
                    'placeholder' => $this->context->getTranslator()->trans('Zoek postcode', [], 'Admin.Actions'),
                ],
            ]);
            $postcodeFilter->setAssociatedColumn('postcode');
            $filters->add($postcodeFilter);

            $addedToOrderFilter = new Filter('added_to_order', TextType::class);
            $addedToOrderFilter->setTypeOptions([
                'required' => false,
                'attr' => [
                    'placeholder' => $this->context->getTranslator()->trans('Zoek toegevoegd', [], 'Admin.Actions'),
                ],
            ]);
            $addedToOrderFilter->setAssociatedColumn('added_to_order');
            $filters->add($addedToOrderFilter);

            $columns->remove('new');
            $columns->remove('country_name');

            $storeColumn = new ShopFaviconColumn('shop_name');
            $storeColumn->setOptions([
                'shop_id_field' => 'id_shop',
                'shop_name_field' => 'shop_name',
                'sortable' => true,
            ]);
            $storeColumn->setName('Store');
            $columns->add($storeColumn);

            $emailColumn = new DataColumn('email');
            $emailColumn->setOptions(['sortable' => true, 'clickable' => false, 'field' => 'email']);
            $emailColumn->setName('Email');
            try {
                $columns->addAfter('customer', $emailColumn);
            } catch (ColumnNotFoundException $e) {
                $columns->add($emailColumn);
            }

            $postcodeColumn = new DataColumn('postcode');
            $postcodeColumn->setOptions(['sortable' => true, 'clickable' => false, 'field' => 'postcode']);
            $postcodeColumn->setName('Postalcode/Country');
            try {
                $columns->addAfter('email', $postcodeColumn);
            } catch (ColumnNotFoundException $e) {
                $columns->add($postcodeColumn);
            }
        }

        $shippedStates = [];
        if (Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop) !== null && !empty(Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop))) {
            $shippedStates = explode(',', Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop));
        }

        $shippingStateAction = new ShippingStateAction('shipping_state');
        $shippingStateAction->setName($this->context->getTranslator()->trans('Shipping Status', [], 'Admin.Actions'));
        $shippingStateAction->setIcon('truck');
        $shippingStateAction->setOptions([
            'label' => $this->context->getTranslator()->trans('Show current shipping status', [], 'Admin.Actions'),
            'acceptedStates' => $shippedStates,
        ]);

//        $invoiceAction = new LinkRowAction('view_invoice');
//        $invoiceAction->setName('Factuur');
//        $invoiceAction->setIcon('description');
//        $invoiceAction->setOptions([
//            'route' => 'admin_orders_generate_invoice_pdf',
//            'route_param_name' => 'orderId',
//            'route_param_field' => 'id_order',
//            'use_inline_display' => true,
//            'accessibility_checker' => function($record) {
//                return (bool) $record['invoice_number'];
//            }
//        ]);
//
//        $deliveryAction = new LinkRowAction('view_delivery_slip');
//        $deliveryAction->setName('Pakbon');
//        $deliveryAction->setIcon('local_shipping');
//        $deliveryAction->setOptions([
//            'route' => 'admin_orders_generate_delivery_slip_pdf',
//            'route_param_name' => 'orderId',
//            'route_param_field' => 'id_order',
//            'use_inline_display' => true,
//            'accessibility_checker' => function($record) {
//                return (bool) $record['delivery_number'];
//            }
//        ]);

        $previewAction = new PreviewRowAction('preview');
        $previewAction->setName($this->context->getTranslator()->trans('Preview', [], 'Admin.Actions'));
        $previewAction->setOptions([
            'label' => $this->context->getTranslator()->trans('Order preview', [], 'Admin.Actions'),
            'use_inline_display' => true,
        ]);

        $actionsCollectionColumn = $this->getActionsColumn($definition);
        $actionOptions = $actionsCollectionColumn->getOptions();
        $actionsCollection = $actionOptions['actions'];

        $actionsCollection->add($previewAction);
        $actionsCollection->add($shippingStateAction);

        //        $actionsCollection->add($invoiceAction);
        //        $actionsCollection->add($deliveryAction);

        $showRetour = Configuration::get('KOOPMANORDEREXPORT_SHOW_RETOUR', $this->idLang, $this->idShopGroup, $this->idShop);
        if ($showRetour !== false && !(bool) $showRetour && $this->hasColumn($columns, 'retour')) {
            $columns->remove('retour');
        }

        if ($this->hasColumn($columns, 'label')) {
            $columnOrder = [
                'actions' => 0,
                'dp_customized' => 1,
                'reference' => 2,
                'added_to_order' => 3,
                'customer' => 4,
                'email' => 5,
                'postcode' => 6,
                'total_paid_tax_incl' => 7,
                'payment' => 8,
                'label' => 9,
                'retour' => 10,
                'date_add' => 11,
                'shop_name' => 12,
                'orders_bulk' => 13,
            ];

            foreach ($columnOrder as $columnId => $position) {
                if ($this->hasColumn($columns, $columnId)) {
                    $columns->move($columnId, $position);
                }
            }
        }
    }

    /**
     * @param ColumnCollection $columns
     * @param string $id
     * @return bool
     */
    private function hasColumn(ColumnCollection $columns, string $id): bool
    {
        foreach ($columns as $column) {
            if ($id === $column->getId()) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param $gridDefinition
     * @param string $id
     * @return ColumnInterface
     * @throws ColumnNotFoundException
     */
    private function getColumnById($gridDefinition, string $id): ColumnInterface
    {
        /** @var ColumnInterface $column */
        foreach ($gridDefinition->getColumns() as $column) {
            if ($id === $column->getId()) {
                return $column;
            }
        }
        throw new ColumnNotFoundException(sprintf('Column with id "%s" not found', $id));
    }

    /**
     * @param $gridDefinition
     * @return ColumnInterface
     * @throws ColumnNotFoundException
     */
    private function getActionsColumn($gridDefinition): ColumnInterface
    {
        return $this->getColumnById($gridDefinition,'actions');
    }


    /**
     * @param float $weight
     * @param float $maxCollieWeight
     * @return int
     */
    private function calculateCollieTotal(float $weight, float $maxCollieWeight = 23.0): int {
        if($weight > 0){
            return (int)ceil($weight / $maxCollieWeight);
        } else {
            return 1;
        }
    }

    private function calculateVolumeSize(float $weight, string $type): array {
        $newVolumeSize = [];
        switch($type) {
            case 'envelope':
                $height = $weight / (ENVELOPE_LENGTH * ENVELOPE_WIDTH * VOLUME_MULTIPLIER);

                if ($height < MIN_ENVELOPE_HEIGHT) {
                    $height = MIN_ENVELOPE_HEIGHT;
                    // Recalculate width based on fixed height
                    $width = $weight / (ENVELOPE_LENGTH * $height * VOLUME_MULTIPLIER);
                } else {
                    // Original width
                    $width = ENVELOPE_WIDTH;
                }

                $newVolumeSize = [
                    'width' => $width,
                    'height' => $height,
                    'length' => ENVELOPE_LENGTH,
                    'multiplier' => VOLUME_MULTIPLIER,
                    'weight' => $weight,
                    'size' => sprintf('%.0f x %.0f x %.0f',
                        ENVELOPE_LENGTH * 100,
                        $width * 100,
                        $height * 100),
                    'formula' => sprintf('%.2f x %.4f x %.4f x %d = %.2f',
                        ENVELOPE_LENGTH,
                        $width,
                        $height,
                        VOLUME_MULTIPLIER,
                        $weight)
                ];
                break;
            case 'plaat':
                $height = $weight / (PLAAT_LENGTH * PLAAT_WIDTH * VOLUME_MULTIPLIER);

                if ($height < MIN_PLAAT_HEIGHT) {
                    $height = MIN_PLAAT_HEIGHT;
                    // Recalculate width based on fixed height
                    $width = $weight / (PLAAT_LENGTH * $height * VOLUME_MULTIPLIER);
                } else {
                    // Original width
                    $width = PLAAT_WIDTH;
                }

                $newVolumeSize = [
                    'width' => $width,
                    'height' => $height,
                    'length' => PLAAT_LENGTH,
                    'multiplier' => VOLUME_MULTIPLIER,
                    'weight' => $weight,
                    'size' => sprintf('%.0f x %.0f x %.0f',
                        PLAAT_LENGTH * 100,
                        $width * 100,
                        $height * 100),
                    'formula' => sprintf('%.2f x %.4f x %.4f x %d = %.2f',
                        PLAAT_LENGTH,
                        $width,
                        $height,
                        VOLUME_MULTIPLIER,
                        $weight)
                ];
                break;
            case '1-meter':
                $height = $weight / (METER_LENGTH * METER_WIDTH * VOLUME_MULTIPLIER);

                if ($height < MIN_METER_HEIGHT) {
                    $height = MIN_METER_HEIGHT;
                    // Recalculate width based on fixed height
                    $width = $weight / (METER_LENGTH * $height * VOLUME_MULTIPLIER);
                } else {
                    // Original width
                    $width = METER_WIDTH;
                }

                $newVolumeSize = [
                    'width' => $width,
                    'height' => $height,
                    'length' => METER_LENGTH,
                    'multiplier' => VOLUME_MULTIPLIER,
                    'weight' => $weight,
                    'size' => sprintf('%.0f x %.0f x %.0f',
                        METER_LENGTH * 100,
                        $width * 100,
                        $height * 100),
                    'formula' => sprintf('%.2f x %.4f x %.4f x %d = %.2f',
                        METER_LENGTH,
                        $width,
                        $height,
                        VOLUME_MULTIPLIER,
                        $weight)
                ];
                break;
            case '2-meter':
                $height = $weight / (METER_2_LENGTH * METER_2_WIDTH * VOLUME_MULTIPLIER);

                if ($height < MIN_METER_2_HEIGHT) {
                    $height = MIN_METER_2_HEIGHT;
                    // Recalculate width based on fixed height
                    $width = $weight / (METER_2_LENGTH * $height * VOLUME_MULTIPLIER);
                } else {
                    // Original width
                    $width = METER_2_WIDTH;
                }

                $newVolumeSize = [
                    'width' => $width,
                    'height' => $height,
                    'length' => METER_2_LENGTH,
                    'multiplier' => VOLUME_MULTIPLIER,
                    'weight' => $weight,
                    'size' => sprintf('%.0f x %.0f x %.0f',
                        METER_2_LENGTH * 100,
                        $width * 100,
                        $height * 100),
                    'formula' => sprintf('%.2f x %.4f x %.4f x %d = %.2f',
                        METER_2_LENGTH,
                        $width,
                        $height,
                        VOLUME_MULTIPLIER,
                        $weight)
                ];
                break;
            default:
                $height = $weight / (METER_2_LENGTH * METER_2_WIDTH * VOLUME_MULTIPLIER);

                if ($height < MIN_METER_2_HEIGHT) {
                    $height = MIN_METER_2_HEIGHT;
                    // Recalculate width based on fixed height
                    $width = $weight / (METER_2_LENGTH * $height * VOLUME_MULTIPLIER);
                } else {
                    // Original width
                    $width = METER_2_WIDTH;
                }

                $newVolumeSize = [
                    'width' => $width,
                    'height' => $height,
                    'length' => METER_2_LENGTH,
                    'multiplier' => VOLUME_MULTIPLIER,
                    'weight' => $weight,
                    'size' => sprintf('%.0f x %.0f x %.0f',
                        METER_2_LENGTH * 100,
                        $width * 100,
                        $height * 100),
                    'formula' => sprintf('%.2f x %.4f x %.4f x %d = %.2f',
                        METER_2_LENGTH,
                        $width,
                        $height,
                        VOLUME_MULTIPLIER,
                        $weight)
                ];
                break;
        }

        return $newVolumeSize;
    }


    private function combinePackages(array $packages): array {
        // Define priority order for package types
        $priority = [
            'pallet' => 0,    // Highest priority, standalone
            'plaat' => 1,     // Second priority, standalone
            '2-meter' => 2,   // Can combine with 1-meter and envelope
            '1-meter' => 3,   // Can combine with envelope
            'envelope' => 4    // Lowest priority, can be combined with others
        ];

        usort($packages, function($a, $b) use ($priority) {
            return $priority[$a['name']] <=> $priority[$b['name']];
        });

        $combinedPackages = []; // Changed variable name for clarity
        $maxWeight = MAX_PACKAGE_WEIGHT;

        // Try to combine packages starting with largest
        foreach ($packages as $package) {
            $wasCombined = false; // Flag to track if package was combined

            // Special handling for pallet and plaat - add directly without combining
            if ($package['name'] === 'pallet' || $package['name'] === 'plaat') {
                $combinedPackages[] = $package;
                continue;
            }


            // Look for existing package to combine with
            foreach ($combinedPackages as &$existingPackage) {
                $newWeight = $existingPackage['weight'] + $package['weight'];

                if ($newWeight <= $maxWeight &&
                    (($existingPackage['name'] === '2-meter' && in_array($package['name'], ['1-meter','envelope'])) ||
                        ($existingPackage['name'] === '1-meter' && $package['name'] === 'envelope'))) {

                    $existingPackage['weight'] += $package['weight'];
                    $wasCombined = true;
                    break;
                }
            }

            // If couldn't combine, add as new package
            if (!$wasCombined) {
                $combinedPackages[] = $package;
            }
        }

        return $combinedPackages;
    }


    private function updateCollieItemList(
        float $weight,
        string $collieType,
        string $collieTypeId,
        array $items,
        int $qty = 0,
        bool $update = false
    ): array {
        $collieName = strtolower(str_replace(' ', '-', $collieType));


        switch ($collieName) {
            case 'plaat':
            case '1-meter':
            case '2-meter':
            case 'envelope':
                if ($update) {
                    $items[$collieName]['weight'] = $weight;
                } else {
                    $items[$collieName]['weight'] += $weight;
                }

                if ($qty > 0) {
                    $items[$collieName]['qty'] = $qty;
                } else {
                    $items[$collieName]['qty'] = $this->calculateCollieTotal($items[$collieName]['weight']);
                }

                $packageSize = $this->calculateVolumeSize(
                    $items[$collieName]['weight'] / $items[$collieName]['qty'],
                    $collieName
                );

                $items[$collieName] = array_merge($items[$collieName], $packageSize);
                break;
            case 'pallet':
                if ($update) {
                    $items[$collieName]['weight'] = $weight;
                } else {
                    $items[$collieName]['weight'] += $weight;
                }

                if ($qty > 0) {
                    $items[$collieName]['qty'] = $qty;
                } else {
                    $items[$collieName]['qty'] = $this->calculateCollieTotal($items[$collieName]['weight'], 1000);
                }

                $items[$collieName]['width'] = 0.30;
                $items[$collieName]['heigth'] = 1.00;
                $items[$collieName]['length'] = 2.00;
                $items[$collieName]['multiplier'] = 250;
                $items[$collieName]['weight'] = $items[$collieName]['weight'];
                $items[$collieName]['size'] = '200 x 30 x 100';
                $items[$collieName]['formula'] = '';
                break;
            default:
                // Default to 2-meter handling
                if ($update) {
                    $items['2-meter']['weight'] = $weight;
                } else {
                    $items['2-meter']['weight'] += $weight;
                }
                $items['2-meter']['qty'] = $this->calculateCollieTotal($items['2-meter']['weight']);

                $packageSize = $this->calculateVolumeSize(
                    $items['2-meter']['weight'] / $items['2-meter']['qty'],
                    '2-meter'
                );

                $items['2-meter'] = array_merge($items['2-meter'], $packageSize);
        }

        return $items;
    }



    /**
     * @param array $params
     * @return void
     */
    public function hookActionOrderGridDataModifier(array $params)
    {
        /** @var PrestaShop\PrestaShop\Core\Grid\Data\GridData $data */
        $data = $params['data'];
        $records = $data->getRecords()->all();
        foreach ($records as &$record) {
            $newList = [
                'plaat' => [
                    'display_name' => 'Plaat',
                    'name' => 'plaat',
                    'qty' => 0,
                    'weight' => 0,
                    'width' => 0,
                    'height' => 0,
                    'length' => 0,
                    'multiplier' => 0,
                    'weight' => 0,
                    'size' => '',
                    'formula' => ''
                ],
                '1-meter' => [
                    'display_name' => '1 Meter pakket',
                    'name' => '1-meter',
                    'qty' => 0,
                    'weight' => 0,
                    'width' => 0,
                    'height' => 0,
                    'length' => 0,
                    'multiplier' => 0,
                    'weight' => 0,
                    'size' => '',
                    'formula' => ''
                ],
                'pallet' => [
                    'display_name' => 'Pallet',
                    'name' => 'pallet',
                    'qty' => 0,
                    'weight' => 0,
                    'width' => 0,
                    'height' => 0,
                    'length' => 0,
                    'multiplier' => 0,
                    'weight' => 0,
                    'size' => '',
                    'formula' => ''
                ],
                '2-meter' => [
                    'display_name' => 'Collie',
                    'name' => '2-meter',
                    'qty' => 0,
                    'weight' => 0,
                    'width' => 0,
                    'height' => 0,
                    'length' => 0,
                    'multiplier' => 0,
                    'weight' => 0,
                    'size' => '',
                    'formula' => ''
                ],
                'envelope' => [
                    'display_name' => 'Envelope',
                    'name' => 'envelope',
                    'qty' => 0,
                    'weight' => 0,
                    'width' => 0,
                    'height' => 0,
                    'length' => 0,
                    'multiplier' => 0,
                    'weight' => 0,
                    'size' => '',
                    'formula' => ''
                ]
            ];

            $selectedCollies = [];
            $newItemsList = [];

            if((float)$record['total_order_weight'] > PALLET_THRESHOLD) {
                //check if the total weight is eligible for a pallet
                if ((float)$record['total_order_weight'] > PALLET_THRESHOLD) {
                    $newList = $this->updateCollieItemList((float)$record['total_order_weight'], 'pallet', '', $newList, 1);
                    $newItemsList[] = $newList;
                }
            } else {


                if (str_contains($record['product_quantity'], ',')) {
                    $linesQty = explode(',',$record['product_quantity']);
                    $linesWeight = explode(',',$record['product_weight']);
                    $linesCollie = explode(',',$record['shipping_value_names']);
                    $linesCollieIds = explode(',',$record['shipping_values']);

                    $tempList = [];

                    for ($i = 0; $i < count($linesQty); $i++) {
                        if(array_key_exists($linesCollie[$i], $tempList)) {
                            $tempList[$linesCollie[$i]]['weight'] += (float)$linesWeight[$i];
                        } else {
                            $tempList[$linesCollie[$i]] = [];
                            $tempList[$linesCollie[$i]]['weight'] = (float)$linesWeight[$i];
                        }
                    }

                    foreach ($tempList as $key => $item) {
                        $newListTemp = $this->updateCollieItemList((float)$item['weight'], $key, $key, $newList, $this->calculateCollieTotal((float)$item['weight']));

                        $newItemsList[] = $newListTemp;
                    }

                } else {
                    $linesWeight = $record['product_weight'];
                    $linesCollie = $record['shipping_value_names'];
                    $linesCollieIds = $record['shipping_values'];

                    $newList = $this->updateCollieItemList((float)$linesWeight, $linesCollie, $linesCollieIds, $newList,$this->calculateCollieTotal((float)$linesWeight));
                    $newItemsList[] = $newList;
                }
            }

            $totalCollies = 0;
            $totalWeight = 0;
            foreach ($newItemsList as $newList)
            {
                foreach ($newList as $newItem) {

                    if ($newItem['qty'] > 0) {
                        $qty = $newItem['qty'];
                        while ($qty > 0) {
                            $newLine = [];
                            $newLine['name'] = $newItem['name'];
                            $newLine['qty'] = $newItem['qty'];
                            $newLine['width'] = ($newItem['width'] * 100);
                            $newLine['height'] = ($newItem['height'] * 100);
                            $newLine['length'] = ($newItem['length'] * 100);
                            $newLine['weight'] = $newItem['weight'];
                            $newLine['size'] = $newItem['size'];
                            $newLine['formula'] = $newItem['formula'];

                            $totalWeight += $newLine['weight'];
                            $totalCollies++;

                            $selectedCollies[] = $newLine;
                            $qty--;
                        }
                    }

                }
            }

            // Add the optimization here
//            dd($selectedCollies);
            $selectedCollies = $this->combinePackages($selectedCollies);
//            dd($selectedCollies);

            $totalCollies = count($selectedCollies);
            $totalWeight = array_sum(array_column($selectedCollies, 'weight'));

            $record['collie_data'] = $selectedCollies;
            $record['total_calculated_weight'] = $totalWeight;
            $record['total_collies'] = $totalCollies;

            $record['postcode'] = trim(($record['postcode'] ?? '') . ' / ' . ($record['country_name'] ?? ''), ' /');

            // if($record['reference'] == 'YS-145289' && $_SERVER["REMOTE_ADDR"] == '62.131.112.137'){
            //     dd($newItemsList, $newList, $selectedCollies);
            // }
        }

        $params['data'] = new GridData(
            new RecordCollection($records),
            $data->getRecordsTotal(),
            $data->getQuery()
        );
    }

    /**
     * @param array $params
     * @return void
     */
    public function hookActionOrderGridQueryBuilderModifier(array $params): void
    {
        $searchQueryBuilder = $params['search_query_builder'];
        $searchQueryBuilder->addSelect('o.added_to_order as added_to_order');
        $searchQueryBuilder->addSelect('o.invoice_number as invoice_number');
        $searchQueryBuilder->addSelect('o.delivery_number as delivery_number');
        $searchQueryBuilder->addSelect('cu.email as email');
        $searchQueryBuilder->addSelect('a.postcode as postcode');
        $searchQueryBuilder->addSelect('SUM(od.product_weight * od.product_quantity) as total_order_weight');
        $searchQueryBuilder->addSelect('GROUP_CONCAT(COALESCE(od.product_weight * od.product_quantity, 0)) as product_weight');
        $searchQueryBuilder->addSelect('GROUP_CONCAT(COALESCE(od.product_quantity, 0)) as product_quantity');
        $searchQueryBuilder->addSelect('GROUP_CONCAT(COALESCE(fvl.id_feature_value,0)) as shipping_values');
        $searchQueryBuilder->addSelect('GROUP_CONCAT(COALESCE(fvl.value,"Leeg")) as shipping_value_names');
        $searchQueryBuilder->addSelect('oc.tracking_number as shipping_number');
        $searchQueryBuilder->addSelect('cl.name as country_name');
        $searchQueryBuilder->addSelect('s.name as shop_name');
        $searchQueryBuilder->addSelect('o.id_shop as id_shop');
        $searchQueryBuilder->leftJoin(
            'o',
            '`' . pSQL(_DB_PREFIX_) . 'order_detail`',
            'od',
            'o.`id_order` = od.`id_order`'
        );

        $searchQueryBuilder->leftJoin(
            'od',
            '`' . pSQL(_DB_PREFIX_) . 'feature_product`',
            'fp',
            'od.`product_id` = fp.`id_product` AND fp.`id_feature` = 51'
        );

        $searchQueryBuilder->leftJoin(
            'fp',
            '`' . pSQL(_DB_PREFIX_) . 'feature_value_lang`',
            'fvl',
            'fp.`id_feature_value` = fvl.`id_feature_value` AND fvl.`id_lang` = '. $this->context->language->id
        );

        $searchQueryBuilder->leftJoin(
            'o',
            '`' . pSQL(_DB_PREFIX_) . 'order_carrier`',
            'oc',
            'o.`id_order` = oc.`id_order`'
        );

        $searchQueryBuilder->leftJoin(
            'o',
            '`' . pSQL(_DB_PREFIX_) . 'carrier`',
            'ca',
            'o.`id_carrier` = ca.`id_carrier`'
        );

        $searchQueryBuilder->groupBy('o.id_order');
        $countQueryBuilder = $params['count_query_builder'];
        $countQueryBuilder->addSelect('o.added_to_order as added_to_order');
        $countQueryBuilder->addSelect('o.invoice_number as invoice_number');
        $countQueryBuilder->addSelect('o.delivery_number as delivery_number');
        $countQueryBuilder->addSelect('cu.email as email');
        $countQueryBuilder->addSelect('a.postcode as postcode');
        $countQueryBuilder->addSelect('o.id_shop as id_shop');


        $searchCriteria = $params['search_criteria'];

        $searchQueryBuilder->addSelect(
            '`cu`.`email` as `email`'
        );

        $searchQueryBuilder->addSelect(
            '`a`.`postcode` as `postcode`'
        );

        $searchQueryBuilder->addSelect(
            '`ca`.`id_reference` as `id_carrier`'
        );


        if ('email' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('cu.`email`', $searchCriteria->getOrderWay());
        }

        if ('postcode' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('a.`postcode`', $searchCriteria->getOrderWay());
        }

        if ('added_to_order' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('o.`added_to_order`', $searchCriteria->getOrderWay());
        }

        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {
            if ('email' === $filterName) {
                $searchQueryBuilder->andWhere("`cu`.`email` LIKE '%" . $filterValue . "%'");
            }

            if ('postcode' === $filterName) {
                $searchQueryBuilder->andWhere("`a`.`postcode` LIKE '%" . $filterValue . "%'");
            }

            if ('added_to_order' === $filterName) {
                $searchQueryBuilder->andWhere("`o`.`added_to_order` LIKE '%" . $filterValue . "%'");
            }
        }
    }

    /**
     * @param array $hookParams
     */
    public function hookActionListMailThemes(array $hookParams): void
    {
        if (!isset($hookParams['mailThemes'])) {
            return;
        }

        /** @var ThemeCollectionInterface $themes */
        $themes = $hookParams['mailThemes'];
        $scanner = new FolderThemeScanner();
        try {
            $moderneSmidTheme = $scanner->scan(realpath(_MODULE_DIR_.'/'.$this->module->name.'/mails/themes/modernesmid'));

            if (null !== $moderneSmidTheme &&  $moderneSmidTheme->getName() !== 'modernesmid' && $moderneSmidTheme->getLayouts()->count() > 0) {
                $themes->add($moderneSmidTheme);
            }
        } catch (FileNotFoundException|TypeException) {
        }

        // Inject custom admin header logo if configured (multistore-aware)
        $customLogo = Configuration::get('MSTHEMECONFIG_ADMIN_HEADER_LOGO', null, $this->idShopGroup, $this->idShop);
        if (!empty($customLogo)) {
            $logoUrl = _MODULE_DIR_ . $this->module->name . '/views/img/' . $customLogo;
            $css = '<style type="text/css">
                #header_logo {
                    background-image: url("' . $logoUrl . '") !important;
                    background-size: contain !important;
                    background-repeat: no-repeat !important;
                    background-position: center !important;
                }
                #header_logo::before {
                    content: "" !important;
                    background: none !important;
                }
            </style>';
            echo $css;
        }
    }

    /**
     * @param array $hookParams
     */
    public function hookActionBuildMailLayoutVariables(array $hookParams)
    {


        if (!isset($hookParams['mailLayout'])) {
            return;
        }

        /** @var LayoutInterface $mailLayout */
        $mailLayout = $hookParams['mailLayout'];


        if ($this->module->name !== 'msthemeconfig') {
            return;
        }

        $route = '';
        if(array_key_exists('request', $hookParams) && isset($hookParams['request']->attributes->all()['_route']) && $hookParams['request']->attributes->all()['_route'] == 'admin_mail_theme_generate'){
            $route = $hookParams['request']->attributes->all()['_route'];
        }

        if ($this->twig) {
            $hookParams['mailLayoutVariables']['footer_blocks'] = DmsMailThemeController::filterFooterBlocks($mailLayout, $this->twig, $route);
        } else {
            $hookParams['mailLayoutVariables']['footer_blocks'] = '';
        }

        $hookParams['mailLayoutVariables']['shop_name'] = Tools::safeOutput(Configuration::get('PS_SHOP_NAME', $this->idLang, $this->idShopGroup, $this->idShop));
        $hookParams['mailLayoutVariables']['shop_url'] = $this->context->link->getPageLink(
            'index',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['my_account_url'] = $this->context->link->getPageLink(
            'my-account',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['guest_tracking_url'] = $this->context->link->getPageLink(
            'guest-tracking',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['history_url'] = $this->context->link->getPageLink(
            'history',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['order_slip_url'] = $this->context->link->getPageLink(
            'order-slip',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['color'] = Tools::safeOutput(Configuration::get('PS_MAIL_COLOR', $this->idLang, $this->idShopGroup, $this->idShop));

        if (in_array($mailLayout->getName(), ['shipped', 'ready_for_shipping', 'order_conf', 'credit_slip', 'download_product', 'new_order', 'order_canceled', 'pickup2'])) {
            $hookParams['mailLayoutVariables']['order_name'] = true;
        } else {
            $hookParams['mailLayoutVariables']['order_name'] = false;
        }

        if ($mailLayout->getName() === 'order_conf' || $mailLayout->getName() === 'new_order') {
            $hookParams['mailLayoutVariables']['templateType'] = 'html';
            $hookParams['mailLayoutVariables']['products'] = '{products}';
            $hookParams['mailLayoutVariables']['discounts'] = '{discounts}';
            $hookParams['mailLayoutVariables']['products_txt'] = '{products}';
            $hookParams['mailLayoutVariables']['discounts_txt'] = '{discounts}';
            $hookParams['mailLayoutVariables']['total_paid'] = '{total_paid}';
            $hookParams['mailLayoutVariables']['comment'] = '{comment}';
            $hookParams['mailLayoutVariables']['delivery_block_html'] = '{delivery_block_html}';
            $hookParams['mailLayoutVariables']['invoice_block_html'] = '{invoice_block_html}';
        }
    }

    /**
     * @param array|null $value
     * @param mixed $idLang
     * @return mixed|string
     */
    private function checkFeatVal(?array $value, mixed $idLang)
    {
        if(!isset($value[$idLang])){
            return '';
        } else {
            return $value[$idLang];
        }
    }


    /**
     * Populate {tracking_url} in ready_for_shipping and shipped mail templates.
     * Reads tracking numbers (comma-separated) from order_carrier.tracking_url,
     * combines with the delivery postal code to build trans-mission.nl T&T links.
     *
     * @param array $hookParams
     */
    public function hookSendMailAlterTemplateVars(array $hookParams): void
    {
        // Build {payment_info} for all email templates based on payment method
        $payment = $hookParams['template_vars']['{payment}'] ?? '';
        if (!empty($payment)) {
            $totalPaid = $hookParams['template_vars']['{total_paid}'] ?? '';
            $orderName = $hookParams['template_vars']['{order_name}'] ?? '';

            $paymentLower = strtolower($payment);
            if (in_array($paymentLower, ['pin betaling', 'ideal', 'cash'])) {
                $paymentInfo = $payment;
            } elseif ($paymentLower === 'cheque') {
                $paymentInfo = $payment . ' - Uw bestelling wordt verwerkt na ontvangst van de cheque';
            } elseif ($paymentLower === 'banktransfer') {
                $paymentInfo = $payment . ' van ' . $totalPaid . ' met als omschrijving ' . $orderName
                    . '<br/> naar NL24 RABO 0157 6529 47 t.n.v. De Moderne Smid BV';
            } elseif ($paymentLower === 'oncredit') {
                $paymentInfo = $payment . ' - De factuur wordt verstuurd naar het bij ons geregistreerde adres.'
                    . ' <br/> Voor mogelijke vragen kunt u contact opnemen met de klantenservice.';
            } else {
                $paymentInfo = $payment;
            }

            $hookParams['template_vars']['{payment_info}'] = $paymentInfo;
        }

        $template = $hookParams['template'] ?? '';
        if (!in_array($template, ['ready_for_shipping', 'shipped'])) {
            return;
        }

        $idOrder = (int)($hookParams['template_vars']['{id_order}'] ?? 0);
        if ($idOrder <= 0) {
            return;
        }

        $row = Db::getInstance()->getRow(
            'SELECT `tracking_url`, `tracking_number` FROM `' . _DB_PREFIX_ . 'order_carrier`'
            . ' WHERE `id_order` = ' . $idOrder . ' '
        );

        // tracking_url is the custom column (populated by API export);
        // fall back to tracking_number (populated by all flows including XML export).
        $trackingSource = !empty($row['tracking_url']) ? $row['tracking_url'] : ($row['tracking_number'] ?? '');

        if (empty($trackingSource)) {
            return;
        }

        $order = new Order($idOrder);
        if (!Validate::isLoadedObject($order)) {
            return;
        }

        $address = new Address((int)$order->id_address_delivery);
        $postalCode = str_replace(' ', '', $address->postcode);

        $trackingNumbers = array_filter(array_map('trim', explode(',', $trackingSource)));
        $urls = [];
        foreach ($trackingNumbers as $number) {
            if ($number !== '') {
                if (filter_var($number, FILTER_VALIDATE_URL)) {
                    $urls[] = $number;
                } else {
                    $urls[] = 'https://api.trans-mission.nl/tt/' . rawurlencode($number) . '/' . rawurlencode($postalCode);
                }
            }
        }

        if (empty($urls)) {
            return;
        }

        $count = count($urls);
        $buttonStyle = 'border-style:solid;border-color:#4472c4;background:#42d159;border-width:0px;display:block;border-radius:5px;width:auto';
        $aButtonStyle = 'mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:16px;padding:10px 20px 10px 20px;display:block;background:#42d159;border-radius:5px;font-family:Open-sans, sans-serif;font-weight:normal;font-style:normal;line-height:19.2px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #42d159';
        $pStyle = 'Margin:0;mso-line-height-rule:exactly;font-family:Open-sans, sans-serif;line-height:24px;letter-spacing:0;color:#777777;font-size:16px';
        $aLinkStyle = 'mso-line-height-rule:exactly;text-decoration:none;color:#777777;font-size:16px';

        $buttons = '';
        $links = '';
        foreach ($urls as $i => $url) {
            $suffix = $count > 1 ? ' ' . ($i + 1) : '';
            $encodedUrl = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');

            if ($i > 0) {
                $buttons .= '<br>';
            }

            $buttons .= '<span class="es-button-border es-fw" style="' . $buttonStyle . '">'
                      . '<a href="' . $encodedUrl . '" target="_blank" class="es-button" style="' . $aButtonStyle . '">'
                      . 'Volg uw pakket' . $suffix
                      . '</a></span>';

            $links .= '<p style="' . $pStyle . '"><strong><b>'
                    . '<a href="' . $encodedUrl . '" target="_blank" style="' . $aLinkStyle . '">'
                    . '&gt; Volg uw bestelling' . ($count > 1 ? ' (pakket' . $suffix . ')' : '') . ' via Track &amp; Trace'
                    . '</a></b></strong></p>';
        }

        $hookParams['template_vars']['{tracking_url}'] = $urls[0];
        $hookParams['template_vars']['{tracking_buttons}'] = $buttons;
        $hookParams['template_vars']['{tracking_links}'] = $links;
    }

    /*
     * Save order state hook to add visibility
     */
    /**
     * @param $hookParams
     */
    public function hookActionObjectOrderStatusUpdateAfter($hookParams): void
    {
        if (!isset($hookParams['orderState'])) {
            return;
        }
    }

    /**
     * Store the current browser's GA4 identifiers on the active cart.
     *
     * Called from hookActionFrontControllerSetVariables, so it runs on every front-office page
     * render. Deliberately cheap:
     *   - returns immediately when there is nothing to store (no consent cookie, no _ga cookie),
     *     which is the common case for a visitor who has not accepted cookies;
     *   - writes only the fields it actually has a value for, so an empty string never overwrites
     *     a previously captured identifier;
     *   - the WHERE clause uses NULL-safe equality so an unchanged row is not rewritten. The
     *     session_id rotates every 30 minutes, so this does fire again then — by design.
     *
     * Never throws: if the columns are absent because the module has not been upgraded yet, the
     * page must still render.
     */
    private function persistGaIdentifiersOnCart($ctx): void
    {
        try {
            $idCart = (int)($ctx->cart->id ?? 0);
            if ($idCart <= 0) {
                // PrestaShop creates the cart lazily, so a first-time visitor has none yet.
                return;
            }

            $ga = self::resolveGaIdentifiers(null);

            $set = [];
            $conditions = [];
            if ($ga['client_id'] !== '') {
                $set[] = '`ga_client_id` = "' . pSQL($ga['client_id']) . '"';
                $conditions[] = '`ga_client_id` <=> "' . pSQL($ga['client_id']) . '"';
            }
            if ($ga['session_id'] !== '') {
                $set[] = '`ga_session_id` = "' . pSQL($ga['session_id']) . '"';
                $conditions[] = '`ga_session_id` <=> "' . pSQL($ga['session_id']) . '"';
            }
            if ($ga['consent'] !== null) {
                $set[] = '`ga_analytics_consent` = ' . (int)$ga['consent'];
                $conditions[] = '`ga_analytics_consent` <=> ' . (int)$ga['consent'];
            }

            if (empty($set)) {
                return;
            }

            Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'cart`
                 SET ' . implode(', ', $set) . '
                 WHERE `id_cart` = ' . $idCart . '
                   AND NOT (' . implode(' AND ', $conditions) . ')'
            );
        } catch (\Throwable $e) {
            // Columns missing (pre-upgrade) or DB hiccup — analytics must never break the page.
        }
    }

    /**
     * Store consented advertising identifiers on the active cart.
     *
     * An explicit refusal is also data: it clears identifiers captured earlier on this cart,
     * so withdrawing consent cannot leave a stale click ID available to a later webhook.
     * Unknown consent leaves the row untouched.
     */
    private function persistAdAttributionOnCart($ctx): void
    {
        try {
            $idCart = (int)($ctx->cart->id ?? 0);
            if ($idCart <= 0) {
                return;
            }

            $adAttribution = self::resolveAdAttribution(null);
            if ($adAttribution['consent'] === null) {
                return;
            }

            $columnMap = self::adAttributionColumnMap();
            $set = [];
            $conditions = [];

            if ((int)$adAttribution['consent'] === 0) {
                $set[] = '`ad_marketing_consent` = 0';
                $conditions[] = '`ad_marketing_consent` <=> 0';
                foreach ($columnMap as $column) {
                    $set[] = '`' . $column . '` = NULL';
                    $conditions[] = '`' . $column . '` IS NULL';
                }
            } else {
                $set[] = '`ad_marketing_consent` = 1';
                $conditions[] = '`ad_marketing_consent` <=> 1';
                foreach ($columnMap as $key => $column) {
                    $value = $adAttribution[$key] ?? '';
                    if ($value === '') {
                        continue;
                    }
                    $escapedValue = pSQL($value);
                    $set[] = '`' . $column . '` = \'' . $escapedValue . '\'';
                    $conditions[] = '`' . $column . '` <=> \'' . $escapedValue . '\'';
                }
            }

            // Keep the cart watermark honest for the incremental BigQuery consent audit.
            $set[] = '`date_upd` = NOW()';

            Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'cart`
                 SET ' . implode(', ', $set) . '
                 WHERE `id_cart` = ' . $idCart . '
                   AND NOT (' . implode(' AND ', $conditions) . ')'
            );
        } catch (\Throwable $e) {
            // A pre-upgrade schema or analytics failure must never break a storefront request.
        }
    }

    /**
     * Copy a consent/identifier snapshot to an order without rewriting an earlier snapshot.
     *
     * @param array{consent:int|null,gclid:string,gbraid:string,wbraid:string,gcl_au:string,gcl_aw:string,meta_fbp:string,meta_fbc:string,msclkid:string} $adAttribution
     */
    private static function storeAdAttributionOnOrder(
        Order $order,
        array $adAttribution,
        bool $onlyMissing = true
    ): void
    {
        $orderId = (int)$order->id;
        if ($orderId <= 0 || $adAttribution['consent'] === null) {
            return;
        }

        try {
            $columns = array_values(self::adAttributionColumnMap());
            $row = Db::getInstance()->getRow(
                'SELECT `ad_marketing_consent`, `' . implode('`, `', $columns) . '`
                 FROM `' . _DB_PREFIX_ . 'orders` WHERE `id_order` = ' . $orderId
            );
            if (!is_array($row)) {
                return;
            }

            $storedConsent = isset($row['ad_marketing_consent'])
                ? (int)$row['ad_marketing_consent']
                : null;
            $incomingConsent = (int)$adAttribution['consent'];
            $effectiveConsent = $onlyMissing && $storedConsent !== null
                ? $storedConsent
                : $incomingConsent;

            $set = [];
            if (!$onlyMissing || $storedConsent === null) {
                $set[] = '`ad_marketing_consent` = ' . $incomingConsent;
            }

            if ($effectiveConsent === 1) {
                foreach (self::adAttributionColumnMap() as $key => $column) {
                    $value = $adAttribution[$key] ?? '';
                    if ($value === '') {
                        continue;
                    }
                    if ($onlyMissing && !empty($row[$column])) {
                        continue;
                    }
                    $set[] = '`' . $column . '` = \'' . pSQL($value) . '\'';
                }
            } elseif (!$onlyMissing || $storedConsent === null) {
                // Defensive cleanup for an inconsistent legacy row whose consent was unknown.
                foreach (self::adAttributionColumnMap() as $column) {
                    $set[] = '`' . $column . '` = NULL';
                }
            }

            $stored = true;
            if (!empty($set)) {
                $stored = (bool)Db::getInstance()->execute(
                    'UPDATE `' . _DB_PREFIX_ . 'orders` SET ' . implode(', ', $set)
                    . ' WHERE `id_order` = ' . $orderId
                );
            }

            self::logPayment('ORDER_ADD', $stored ? 'ad_attribution_stored' : 'ad_attribution_store_failed', [
                'orderId' => $orderId,
                'marketing_consent' => $effectiveConsent,
                'identifier_fields' => self::populatedAdAttributionFields($adAttribution),
            ]);
        } catch (\Throwable $e) {
            // Deploying PHP before the 1.0.14 module upgrade must not block order creation.
            self::logPayment('ORDER_ADD', 'ad_attribution_store_failed', [
                'orderId' => $orderId,
                // Exception messages can contain a rendered SQL query. Keep identifiers out.
                'reason' => get_class($e),
            ]);
        }
    }

    /** @return array<string,string> Logical payload key to operational database column. */
    private static function adAttributionColumnMap(): array
    {
        return [
            'gclid' => 'ad_gclid',
            'gbraid' => 'ad_gbraid',
            'wbraid' => 'ad_wbraid',
            'gcl_au' => 'ad_gcl_au',
            'gcl_aw' => 'ad_gcl_aw',
            'meta_fbp' => 'ad_meta_fbp',
            'meta_fbc' => 'ad_meta_fbc',
            'msclkid' => 'ad_msclkid',
        ];
    }

    /** @return array{consent:int|null,gclid:string,gbraid:string,wbraid:string,gcl_au:string,gcl_aw:string,meta_fbp:string,meta_fbc:string,msclkid:string} */
    private static function emptyAdAttribution(?int $consent = null): array
    {
        return [
            'consent' => $consent,
            'gclid' => '',
            'gbraid' => '',
            'wbraid' => '',
            'gcl_au' => '',
            'gcl_aw' => '',
            'meta_fbp' => '',
            'meta_fbc' => '',
            'msclkid' => '',
        ];
    }

    /**
     * Resolve consented Google Ads, Meta and Microsoft Ads browser attribution.
     *
     * Browser URL/cookie values win. The cart is the fallback for Mollie's cookie-less
     * webhook. No identifier is read into the result unless final marketing consent is 1.
     *
     * @return array{consent:int|null,gclid:string,gbraid:string,wbraid:string,gcl_au:string,gcl_aw:string,meta_fbp:string,meta_fbc:string,msclkid:string}
     */
    private static function resolveAdAttribution(?int $idCart = null): array
    {
        $consent = self::consentCookieChoice('marketing');
        $result = self::emptyAdAttribution($consent);

        if ($consent === 1) {
            $result['gclid'] = self::firstAdIdentifier([
                $_GET['gclid'] ?? null,
                $_COOKIE['ms_ad_gclid'] ?? null,
            ]);
            $result['gbraid'] = self::firstAdIdentifier([
                $_GET['gbraid'] ?? null,
                $_COOKIE['ms_ad_gbraid'] ?? null,
            ]);
            $result['wbraid'] = self::firstAdIdentifier([
                $_GET['wbraid'] ?? null,
                $_COOKIE['ms_ad_wbraid'] ?? null,
            ]);
            $result['gcl_au'] = self::firstAdIdentifier([$_COOKIE['_gcl_au'] ?? null]);
            $result['gcl_aw'] = self::firstAdIdentifier([
                $_COOKIE['_gcl_aw'] ?? null,
                self::firstCookieWithPrefix('_gcl_aw_'),
            ]);
            $result['meta_fbp'] = self::firstAdIdentifier([$_COOKIE['_fbp'] ?? null]);
            $result['meta_fbc'] = self::firstAdIdentifier([
                $_COOKIE['_fbc'] ?? null,
                $_COOKIE['ms_ad_fbc'] ?? null,
            ]);

            if ($result['meta_fbc'] === '') {
                $fbclid = self::firstAdIdentifier([$_GET['fbclid'] ?? null]);
                if ($fbclid !== '') {
                    $result['meta_fbc'] = self::createMetaFbc($fbclid);
                }
            }

            $result['msclkid'] = self::firstAdIdentifier([
                $_GET['msclkid'] ?? null,
                $_COOKIE['_uetmsclkid'] ?? null,
                $_COOKIE['ms_ad_msclkid'] ?? null,
            ]);
        }

        $cartRow = null;
        if ((int)$idCart > 0) {
            try {
                $columns = array_values(self::adAttributionColumnMap());
                $cartRow = Db::getInstance()->getRow(
                    'SELECT `ad_marketing_consent`, `' . implode('`, `', $columns) . '`
                     FROM `' . _DB_PREFIX_ . 'cart` WHERE `id_cart` = ' . (int)$idCart
                );
            } catch (\Throwable $e) {
                // Module not upgraded yet: stay with current-request data only.
            }
        }

        if ($consent === null && is_array($cartRow) && $cartRow['ad_marketing_consent'] !== null) {
            $consent = (int)$cartRow['ad_marketing_consent'];
            $result['consent'] = $consent;
        }

        if ($consent !== 1) {
            return self::emptyAdAttribution($consent);
        }

        if (is_array($cartRow) && (int)$cartRow['ad_marketing_consent'] === 1) {
            foreach (self::adAttributionColumnMap() as $key => $column) {
                if ($result[$key] === '') {
                    $result[$key] = self::firstAdIdentifier([$cartRow[$column] ?? null]);
                }
            }
        }

        return $result;
    }

    /** Read a boolean consent choice from the first-party JSON cookie. */
    private static function consentCookieChoice(string $choice): ?int
    {
        if (empty($_COOKIE['cookie-consent'])) {
            return null;
        }

        try {
            $consentData = json_decode((string)$_COOKIE['cookie-consent'], true);
            if (!is_array($consentData) || !array_key_exists($choice, $consentData)) {
                return null;
            }

            $value = $consentData[$choice];
            if ($value === true || $value === 1 || $value === '1') {
                return 1;
            }
            if ($value === false || $value === 0 || $value === '0') {
                return 0;
            }

            return null;
        } catch (\Throwable $e) {
            return null;
        }
    }

    /** Return the first well-formed, header-safe browser identifier. */
    private static function firstAdIdentifier(array $values): string
    {
        foreach ($values as $value) {
            if (!is_scalar($value)) {
                continue;
            }
            $value = trim((string)$value);
            if (preg_match('/\A[A-Za-z0-9._~:-]{1,255}\z/D', $value) === 1) {
                return $value;
            }
        }

        return '';
    }

    /** Some Conversion Linker setups suffix _gcl_aw with a destination ID. */
    private static function firstCookieWithPrefix(string $prefix): string
    {
        foreach ($_COOKIE as $name => $value) {
            if (is_string($name) && strpos($name, $prefix) === 0) {
                return is_scalar($value) ? (string)$value : '';
            }
        }

        return '';
    }

    /** Build Meta's documented fbc shape when fbclid arrived before the Pixel cookie existed. */
    private static function createMetaFbc(string $fbclid): string
    {
        return self::firstAdIdentifier([
            'fb.1.' . (string)(int)floor(microtime(true) * 1000) . '.' . $fbclid,
        ]);
    }

    /** Read the immutable order snapshot used by the status-triggered server request. */
    private static function getStoredOrderAdAttribution(int $orderId): array
    {
        $result = self::emptyAdAttribution(null);
        try {
            $columns = array_values(self::adAttributionColumnMap());
            $row = Db::getInstance()->getRow(
                'SELECT `ad_marketing_consent`, `' . implode('`, `', $columns) . '`
                 FROM `' . _DB_PREFIX_ . 'orders` WHERE `id_order` = ' . $orderId
            );
            if (!is_array($row)) {
                return $result;
            }

            if ($row['ad_marketing_consent'] !== null) {
                $result['consent'] = (int)$row['ad_marketing_consent'];
            }
            if ($result['consent'] !== 1) {
                return self::emptyAdAttribution($result['consent']);
            }

            foreach (self::adAttributionColumnMap() as $key => $column) {
                $result[$key] = self::firstAdIdentifier([$row[$column] ?? null]);
            }
        } catch (\Throwable $e) {
            // Old schema: send GA4 as before, with unknown marketing consent and no ad IDs.
        }

        return $result;
    }

    /** Stable cross-route ID for browser Pixel / server CAPI purchase deduplication. */
    private static function purchaseEventId(Order $order): string
    {
        $reference = preg_replace('/[^A-Za-z0-9_-]/', '', (string)$order->reference);
        if ($reference === '') {
            $reference = (string)(int)$order->id;
        }

        return 'purchase-' . (int)$order->id_shop . '-' . $reference;
    }

    /** @return string[] Names only; safe for diagnostics because values never enter logs. */
    private static function populatedAdAttributionFields(array $adAttribution): array
    {
        $fields = [];
        foreach (self::adAttributionColumnMap() as $key => $column) {
            if (!empty($adAttribution[$key])) {
                $fields[] = $column;
            }
        }

        return $fields;
    }

    /**
     * Carry ad context beside, not inside, the GA4 payload.
     *
     * Server GTM Request Header variables can map these values to destination-specific tags.
     * Since they are not GA4 event parameters, Meta/Microsoft browser IDs cannot accidentally
     * become GA4 custom dimensions. Destination tags must require the consent header to equal
     * `granted`.
     *
     * @return string[] cURL header lines
     */
    private static function buildAdAttributionHeaders(
        array $adAttribution,
        ?int $analyticsConsent,
        string $eventId,
        string $endpoint
    ): array
    {
        if (!self::endpointSupportsAdAttributionHeaders($endpoint)) {
            return [];
        }

        $consent = $adAttribution['consent'] ?? null;
        $headers = [
            'X-MS-Analytics-Consent: ' . self::consentHeaderLabel($analyticsConsent),
            'X-MS-Marketing-Consent: ' . self::consentHeaderLabel($consent),
            'X-MS-Purchase-Event-Id: ' . $eventId,
        ];

        if ($consent !== 1) {
            return $headers;
        }

        $headerMap = [
            'gclid' => 'X-MS-Gclid',
            'gbraid' => 'X-MS-Gbraid',
            'wbraid' => 'X-MS-Wbraid',
            'gcl_au' => 'X-MS-Gcl-Au',
            'gcl_aw' => 'X-MS-Gcl-Aw',
            'meta_fbp' => 'X-MS-Meta-Fbp',
            'meta_fbc' => 'X-MS-Meta-Fbc',
            'msclkid' => 'X-MS-Msclkid',
        ];
        foreach ($headerMap as $key => $headerName) {
            if (!empty($adAttribution[$key])) {
                $headers[] = $headerName . ': ' . $adAttribution[$key];
            }
        }

        return $headers;
    }

    /** @return string[] */
    private static function adAttributionHeaderNames(
        array $adAttribution,
        ?int $analyticsConsent,
        string $endpoint
    ): array
    {
        $names = [];
        foreach (self::buildAdAttributionHeaders(
            $adAttribution,
            $analyticsConsent,
            'redacted',
            $endpoint
        ) as $header) {
            $separator = strpos($header, ':');
            if ($separator !== false) {
                $names[] = substr($header, 0, $separator);
            }
        }

        return $names;
    }

    private static function consentHeaderLabel(?int $consent): string
    {
        return $consent === 1 ? 'granted' : ($consent === 0 ? 'denied' : 'unknown');
    }

    /** Never send destination-specific headers to Google's direct GA4 collection endpoint. */
    private static function endpointSupportsAdAttributionHeaders(string $endpoint): bool
    {
        $host = strtolower((string)parse_url($endpoint, PHP_URL_HOST));
        if ($host === '') {
            return false;
        }

        return $host !== 'google-analytics.com'
            && !str_ends_with($host, '.google-analytics.com');
    }

    /**
     * Stable identity and canonical URL data for the shop that owns an order.
     *
     * Never derive this from the active back-office selector: an employee can update an order
     * while "All shops" or another shop is selected. id_shop on the order is authoritative.
     *
     * @return array{shop_id:string,shop_name:string,shop_domain:string,base_url:string}
     */
    private static function getOrderShopIdentity(Order $order): array
    {
        $identity = [
            'shop_id' => (string)(int)$order->id_shop,
            'shop_name' => '',
            'shop_domain' => '',
            'base_url' => '',
        ];

        try {
            $shop = new \Shop((int)$order->id_shop);
            if (!Validate::isLoadedObject($shop)) {
                return $identity;
            }

            $identity['shop_name'] = (string)$shop->name;
            $sslDomain = strtolower(trim((string)$shop->domain_ssl));
            $plainDomain = strtolower(trim((string)$shop->domain));
            $identity['shop_domain'] = $sslDomain !== '' ? $sslDomain : $plainDomain;

            if ($identity['shop_domain'] !== '') {
                $scheme = $sslDomain !== '' ? 'https://' : 'http://';
                $baseUri = '/' . trim((string)$shop->getBaseURI(), '/');
                $identity['base_url'] = $scheme . $identity['shop_domain'] . rtrim($baseUri, '/') . '/';
            }
        } catch (\Throwable $e) {
            // Keep shop_id even if the display metadata cannot be loaded.
        }

        return $identity;
    }

    /**
     * Read the final carrier and payment labels from the order itself.
     *
     * Checkout DOM labels are useful before an order exists, but purchase/canceled events must
     * use the persisted order so browser and webhook payloads cannot disagree after a redirect.
     * These are business labels only; no customer or payment credentials are exposed.
     *
     * @return array{shipping_tier:string,payment_type:string}
     */
    private static function getOrderCheckoutTypes(Order $order): array
    {
        $shippingTier = '';

        try {
            $carrier = new Carrier((int)$order->id_carrier, (int)$order->id_lang);
            if (Validate::isLoadedObject($carrier)) {
                $shippingTier = trim((string)$carrier->name);
            }
        } catch (\Throwable $e) {
            // The event remains valid without a carrier label; BigQuery still has id_carrier.
        }

        return [
            'shipping_tier' => $shippingTier,
            'payment_type' => trim((string)$order->payment),
        ];
    }

    /** Canonical order-confirmation URL for a server-side GA4 `page_location`. */
    private static function gaPageLocation(Order $order, array $shopIdentity): string
    {
        if (($shopIdentity['base_url'] ?? '') === '') {
            return '';
        }

        return $shopIdentity['base_url']
            . 'index.php?controller=order-confirmation&id_order=' . (int)$order->id;
    }

    /**
     * Resolve the shop-scoped origin used to load web GTM.
     *
     * During migration an empty explicit value may reuse the origin of a TAGGRS MP endpoint.
     * A direct Google Analytics endpoint cannot host gtm.js, so it falls back to Google's normal
     * GTM loader until a first-party hostname is configured for that shop.
     */
    private static function resolveGtmServerUrl(string $configuredUrl, string $measurementEndpoint): string
    {
        foreach ([$configuredUrl, $measurementEndpoint] as $candidate) {
            $candidate = trim($candidate);
            if ($candidate === '' || filter_var($candidate, FILTER_VALIDATE_URL) === false) {
                continue;
            }

            $parts = parse_url($candidate);
            $scheme = strtolower((string)($parts['scheme'] ?? ''));
            $host = strtolower((string)($parts['host'] ?? ''));
            if (!in_array($scheme, ['http', 'https'], true) || $host === '') {
                continue;
            }
            if ($host === 'google-analytics.com' || str_ends_with($host, '.google-analytics.com')) {
                continue;
            }

            $port = isset($parts['port']) ? ':' . (int)$parts['port'] : '';
            return $scheme . '://' . $host . $port;
        }

        return 'https://www.googletagmanager.com';
    }

    /**
     * Label hits that originate from a development host, so GA4 can filter them out.
     *
     * A Measurement Protocol hit never passes through the web container, so the GTM
     * internal-traffic trigger (RT - traffic_type) never evaluates. A test order placed on a
     * local copy of the shop therefore lands in the production property as real revenue, and
     * unlike a client-side hit it cannot be cleaned up afterwards: MP writes straight to the
     * property and GA4 has no retroactive filter.
     *
     * Labels rather than blocks, on purpose. Blocking would remove the only signal that the MP
     * route still works after you change something in it, and the label is exactly what the GA4
     * internal-traffic filter keys on -- so the same hit stays visible in DebugView while that
     * filter sits on 'Testen' and is discarded the moment it goes to 'Actief'.
     *
     * Keyed on the shop domain rather than on _PS_MODE_DEV_, also on purpose: dev mode gets
     * switched on live to debug a problem, and that must never start relabelling real orders as
     * internal traffic.
     *
     * Only .local, .test and localhost count as development. A .frl domain is a live testing
     * domain that serves real customers, so it must stay out of this pattern -- see the hostname
     * convention in docs/analytics.md section 17.
     *
     * Returns '' both when the host is not a development host and when it cannot be resolved at
     * all, and the caller omits the param in both cases. That asymmetry is deliberate: a missed
     * label costs one polluted test order, while a wrong 'internal' silently deletes real revenue
     * once the filter is active.
     */
    private static function gaTrafficType(?string $shopDomain = null): string
    {
        $host = strtolower(trim((string)$shopDomain));
        if ($host === '') {
            try {
                $host = strtolower(trim((string)Tools::getShopDomainSsl()));
            } catch (\Throwable $e) {
                return '';
            }
        }

        if ($host === '') {
            return '';
        }

        // A local wamp/valet setup can carry the port in the configured domain, which would make
        // the .local anchor below miss.
        $host = preg_replace('/:\d+$/', '', $host);

        return preg_match('/(\.local|\.test)$|^localhost$/', $host) === 1 ? 'internal' : '';
    }

    /**
     * Build the GA4 session cookie name from a measurement ID.
     *
     * ltrim($id, 'G-g-') treats its second argument as a character SET, not a prefix, so it
     * strips every leading G/g/- character. For G-MS7BRYZ8L9 that happens to give the right
     * answer because "M" stops it, but a stream whose body starts with G (G-GS7BRYZ8L9) would
     * lose that character too and the cookie lookup would silently never match — costing the
     * session_id and therefore all attribution. Strip exactly one leading "G-".
     */
    private static function gaSessionCookieName(string $measurementId): string
    {
        return '_ga_' . preg_replace('/^G-/i', '', trim($measurementId));
    }

    /**
     * Read an analytics configuration value without leaking settings between shops.
     *
     * Server-side order events pass the immutable order scope explicitly. Browser calls may omit
     * it and use Context. The SQL fallback accepts only that shop, its group, or global values;
     * it never borrows another shop's measurement ID, API secret, account list, or endpoint.
     */
    private static function getGa4Config(
        string $key,
        ?int $idShop = null,
        ?int $idLang = null,
        ?int $idShopGroup = null
    ): string
    {
        $value = '';

        try {
            $ctx = \Context::getContext();
            $idLang = $idLang ?: (isset($ctx->language->id) ? (int)$ctx->language->id : null);
            $idShop = $idShop ?: (isset($ctx->shop->id) ? (int)$ctx->shop->id : null);
            if (!$idShopGroup) {
                try {
                    $idShopGroup = ($ctx->shop && method_exists($ctx->shop, 'getGroup'))
                        ? (int)($ctx->shop->getGroup()->id ?? 0)
                        : null;
                } catch (\Throwable $e) {
                    $idShopGroup = null;
                }
            }

            if ($idLang) {
                $value = (string)Configuration::get($key, $idLang, $idShopGroup, $idShop);
            }

            if ($value === '') {
                $scopeConditions = [];
                if ($idShop) {
                    $scopeConditions[] = 'c.`id_shop` = ' . (int)$idShop;
                }
                if ($idShopGroup) {
                    $scopeConditions[] = '(c.`id_shop` IS NULL AND (c.`id_shop_group` = '
                        . (int)$idShopGroup . ' OR c.`id_shop_group` IS NULL))';
                } else {
                    $scopeConditions[] = 'c.`id_shop` IS NULL';
                }

                $shopRank = $idShop
                    ? 'IF(c.`id_shop` = ' . (int)$idShop . ', 0, IF(c.`id_shop` IS NULL, 1, 2))'
                    : 'IF(c.`id_shop` IS NULL, 0, 1)';
                $groupRank = $idShopGroup
                    ? 'IF(c.`id_shop_group` = ' . (int)$idShopGroup . ', 0, IF(c.`id_shop_group` IS NULL, 1, 2))'
                    : 'IF(c.`id_shop_group` IS NULL, 0, 1)';
                $languageRank = $idLang ? 'IF(cl.`id_lang` = ' . (int)$idLang . ', 0, 1)' : 'cl.`id_lang`';

                $value = (string)Db::getInstance()->getValue(
                    'SELECT cl.`value`
                     FROM `' . _DB_PREFIX_ . 'configuration_lang` cl
                     INNER JOIN `' . _DB_PREFIX_ . 'configuration` c ON c.id_configuration = cl.id_configuration
                     WHERE c.`name` = "' . pSQL($key) . '"
                       AND cl.`value` IS NOT NULL AND cl.`value` != ""
                       AND (' . implode(' OR ', $scopeConditions) . ')
                     ORDER BY ' . $shopRank . ', ' . $groupRank . ', ' . $languageRank . ' ASC'
                );
            }
        } catch (\Throwable $e) {
            // Never let a config read break an order flow.
        }

        return $value;
    }

    /**
     * Resolve the GA4 client_id / session_id / analytics consent for the current request.
     *
     * Order of preference:
     *   1. The customer's own browser cookies, when this request came from their browser.
     *   2. The cart row, populated during checkout by hookActionFrontControllerSetVariables.
     *
     * Step 2 is what makes redirect payments work. Mollie's webhook (webhook.php:397) calls
     * validateOrder() server-to-server, so $_COOKIE is empty and step 1 yields nothing — which
     * is why 96.4% of iDEAL orders previously reached GA4 with no identity at all.
     *
     * @return array{client_id: string, session_id: string, consent: int|null}
     */
    private static function resolveGaIdentifiers(?int $idCart = null): array
    {
        $clientId = '';
        $sessionId = '';
        $consent = null;

        // _ga format: GA1.{version}.{part1}.{part2} → client_id = "{part1}.{part2}"
        if (!empty($_COOKIE['_ga'])) {
            $gaParts = explode('.', $_COOKIE['_ga']);
            if (count($gaParts) >= 4) {
                $clientId = $gaParts[2] . '.' . $gaParts[3];
            }
        }

        $measurementId = self::getGa4Config('MSTHEMECONFIG_GA4_MEASUREMENT_ID');
        if ($measurementId !== '') {
            $cookieName = self::gaSessionCookieName($measurementId);
            if (!empty($_COOKIE[$cookieName])) {
                $sessionId = self::extractGa4SessionId($_COOKIE[$cookieName]);
            }
        }

        $consent = self::consentCookieChoice('analytics');

        if ((int)$idCart > 0 && ($clientId === '' || $sessionId === '' || $consent === null)) {
            try {
                $cartRow = Db::getInstance()->getRow(
                    'SELECT `ga_client_id`, `ga_session_id`, `ga_analytics_consent`
                     FROM `' . _DB_PREFIX_ . 'cart` WHERE `id_cart` = ' . (int)$idCart
                );
                if (is_array($cartRow)) {
                    if ($clientId === '' && !empty($cartRow['ga_client_id'])) {
                        $clientId = (string)$cartRow['ga_client_id'];
                    }
                    if ($sessionId === '' && !empty($cartRow['ga_session_id'])) {
                        $sessionId = (string)$cartRow['ga_session_id'];
                    }
                    if ($consent === null && isset($cartRow['ga_analytics_consent']) && $cartRow['ga_analytics_consent'] !== null) {
                        $consent = (int)$cartRow['ga_analytics_consent'];
                    }
                }
            } catch (\Throwable $e) {
                // Columns absent (module not upgraded yet) — degrade to cookie-only behaviour.
            }
        }

        return [
            'client_id' => $clientId,
            'session_id' => $sessionId,
            'consent' => $consent,
        ];
    }

    /**
     * Classify a new order while its true creation context is still available.
     *
     * Priority matters: an order created in the back office stays backoffice even when the
     * selected order customer happens to be the counter account.
     *
     * @return array{order_channel:string,is_test_order:bool}
     */
    private static function classifyNewOrder(Order $order): array
    {
        $employee = Context::getContext()->employee ?? null;
        $isBackoffice = $employee && (int)$employee->id > 0;

        if ($isBackoffice) {
            $orderChannel = 'backoffice';
        } elseif (self::isCounterCustomer((int)$order->id_customer, $order)) {
            $orderChannel = 'counter';
        } else {
            $orderChannel = 'online';
        }

        return [
            'order_channel' => $orderChannel,
            'is_test_order' => self::isAnalyticsTestCustomer((int)$order->id_customer, $order),
        ];
    }

    /**
     * Read the immutable order snapshot, with a conservative fallback for pre-upgrade rows.
     *
     * Historical back-office orders are inferred only from their first order-history row. We
     * never use the current employee context here: an employee updating a genuine online order
     * later must not turn it into a back-office order.
     *
     * @return array{order_channel:string,is_test_order:bool}
     */
    private static function getOrderAnalyticsClassification(Order $order): array
    {
        try {
            $row = Db::getInstance()->getRow(
                'SELECT `analytics_order_channel`, `analytics_is_test`'
                . ' FROM `' . _DB_PREFIX_ . 'orders`'
                . ' WHERE `id_order` = ' . (int)$order->id
            );
            $storedChannel = is_array($row) ? (string)($row['analytics_order_channel'] ?? '') : '';
            if (in_array($storedChannel, ['online', 'counter', 'backoffice'], true)) {
                return [
                    'order_channel' => $storedChannel,
                    'is_test_order' => !empty($row['analytics_is_test']),
                ];
            }
        } catch (\Throwable $e) {
            // Columns absent until module upgrade 1.0.10: use the safe fallback below.
        }

        $firstEmployeeId = 0;
        try {
            $firstEmployeeId = (int)Db::getInstance()->getValue(
                'SELECT `id_employee` FROM `' . _DB_PREFIX_ . 'order_history`'
                . ' WHERE `id_order` = ' . (int)$order->id
                . ' ORDER BY `id_order_history` ASC LIMIT 1'
            );
        } catch (\Throwable $e) {
            // Missing history means the order is still being created; fail towards online.
        }

        if ($firstEmployeeId > 0) {
            $orderChannel = 'backoffice';
        } elseif (self::isCounterCustomer((int)$order->id_customer, $order)) {
            $orderChannel = 'counter';
        } else {
            $orderChannel = 'online';
        }

        return [
            'order_channel' => $orderChannel,
            'is_test_order' => self::isAnalyticsTestCustomer((int)$order->id_customer, $order),
        ];
    }

    /** Is this customer one of the legitimate counter/balie accounts? */
    private static function isCounterCustomer(?int $idCustomer, ?Order $order = null): bool
    {
        return self::isCustomerInAnalyticsList(
            $idCustomer,
            'MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',
            $order
        );
    }

    /** Is this customer a dedicated front-office employee/test account? */
    private static function isAnalyticsTestCustomer(?int $idCustomer, ?Order $order = null): bool
    {
        return self::isCustomerInAnalyticsList(
            $idCustomer,
            'MSTHEMECONFIG_ANALYTICS_TEST_CUSTOMERS',
            $order
        );
    }

    private static function isCustomerInAnalyticsList(
        ?int $idCustomer,
        string $configKey,
        ?Order $order = null
    ): bool
    {
        if (!$idCustomer) {
            return false;
        }

        $raw = $order
            ? self::getGa4Config(
                $configKey,
                (int)$order->id_shop,
                (int)$order->id_lang,
                (int)$order->id_shop_group
            )
            : self::getGa4Config($configKey);
        if ($raw === '') {
            return false;
        }

        $ids = json_decode($raw, true);
        if (!is_array($ids)) {
            return false;
        }

        return in_array((int)$idCustomer, array_map('intval', $ids), true);
    }

    /**
     * Extract the numeric GA4 session_id from a _ga_XXXX cookie value.
     *
     * Two cookie formats exist:
     *   Classic GA4:  GS1.1.{session_id}.{count}.{...}  → parts[2] is already the numeric ID
     *   sGTM format:  GS2.1.s{session_id}$o{...}$...    → parts[2] starts with "s" followed by digits
     *
     * Returns the numeric session_id string, or '' if parsing fails.
     */
    private static function extractGa4SessionId(string $cookieValue): string
    {
        $parts = explode('.', $cookieValue);
        if (count($parts) < 3) {
            return '';
        }
        $raw = $parts[2];
        // sGTM format: s{digits}$...
        if ($raw !== '' && $raw[0] === 's' && preg_match('/^s(\d+)\$/', $raw, $m)) {
            return $m[1];
        }
        // Classic format: plain numeric
        return $raw;
    }

    /**
     * Write a structured log line to var/logs/payment_analytics.log.
     * Never throws — logging must never break the payment flow.
     *
     * @param string $channel  e.g. 'GA4' or 'CONF'
     * @param string $message  short label for the event
     * @param array  $context  key/value data to JSON-encode on the same line
     */
    private static function logPayment(string $channel, string $message, array $context = []): void
    {
        try {
            $ctx = \Context::getContext();
            $idLang = $ctx->language->id ?? null;
            $idShop = $ctx->shop->id ?? null;
            // Isolate getGroup() so a DB exception here doesn't kill the entire log call
            try {
                $idShopGroup = ($ctx->shop && method_exists($ctx->shop, 'getGroup')) ? ($ctx->shop->getGroup()->id ?? null) : null;
            } catch (\Throwable $e) {
                $idShopGroup = null;
            }
            // MSTHEMECONFIG_GA4_PAYMENT_LOG is stored language-specifically.
            // Try with language context first; fall back to any stored value so webhook/background
            // contexts (where $idLang may be null) still respect the flag.
            $logEnabled = $idLang
                ? (int)Configuration::get('MSTHEMECONFIG_GA4_PAYMENT_LOG', $idLang, $idShopGroup, $idShop)
                : 0;
            if (!$logEnabled) {
                $logEnabled = (int)Db::getInstance()->getValue(
                    'SELECT cl.`value`
                     FROM `' . _DB_PREFIX_ . 'configuration_lang` cl
                     INNER JOIN `' . _DB_PREFIX_ . 'configuration` c ON c.id_configuration = cl.id_configuration
                     WHERE c.`name` = "MSTHEMECONFIG_GA4_PAYMENT_LOG"
                     ORDER BY cl.`value` DESC'
                );
            }
            if (!$logEnabled) {
                return;
            }
            $timestamp = date('c');
            $contextJson = empty($context) ? '' : ' | ' . json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $line = "[{$timestamp}] [{$channel}] {$message}{$contextJson}" . PHP_EOL;
            $logFile = rtrim(_PS_ROOT_DIR_, '/\\') . '/var/logs/payment_analytics.log';
            file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
        } catch (\Throwable $e) {
            // intentionally silent
        }
    }

    /**
     * Adds a "Type" column and filter to the backoffice product grid.
     * Values: simple | saw | cut | dynamic | offer
     *
     * @param array $params
     * @throws ColumnNotFoundException
     */
    public function hookActionProductGridDefinitionModifier(array $params): void
    {
        /** @var GridDefinitionInterface $definition */
        $definition = $params['definition'];
        $columns = $definition->getColumns();

        $typeColumn = new DataColumn('ms_product_type');
        $typeColumn->setName('Type');
        $typeColumn->setOptions(['sortable' => false, 'clickable' => false, 'field' => 'ms_product_type']);

        try {
            $columns->addAfter('name', $typeColumn);
        } catch (ColumnNotFoundException $e) {
            $columns->add($typeColumn);
        }

        /** @var FilterCollection $filters */
        $filters = $definition->getFilters();
        $filters->add(
            (new Filter('ms_product_type', ChoiceType::class))
                ->setAssociatedColumn('ms_product_type')
                ->setTypeOptions([
                    'choices' => [
                        'Simpel'     => 'simple',
                        'Zaag'       => 'saw',
                        'Snijden'    => 'cut',
                        'Dynamisch'  => 'dynamic',
                        'Offerte'    => 'offer',
                    ],
                    'required'    => false,
                    'placeholder' => 'Alle typen',
                ])
        );
    }

    /**
     * Adds the ms_product_type computed value to the product grid SQL query
     * and handles filtering when a type is selected.
     * Priority: offer > dynamic > saw > cut > simple
     *
     * Dynamic detection covers all three DynamicProduct linking mechanisms:
     *   1. Direct own config (dynamicproduct_product_config)
     *   2. Product-to-product config link (dynamicproduct_product_config_link)
     *   3. Category-based config link (dynamicproduct_product_config_category_link)
     *
     * @param array $params
     */
    public function hookActionProductGridQueryBuilderModifier(array $params): void
    {
        $searchQueryBuilder = $params['search_query_builder'];
        $countQueryBuilder  = $params['count_query_builder'];
        $prefix = pSQL(_DB_PREFIX_);

        // Attribute group IDs for saw and cut detection (must use shop/lang context)
        $sawGroupId = (int) $this->getSawCutConfigValue('id_attribute_group', 0);
        $cutGroupId = (int) $this->getSawCutConfigValue('id_attribute_group_cut', 0);
        $dynamicActive = Module::isInstalled('dynamicproduct');

        // Build reusable per-type SQL conditions (usable in CASE and WHERE)
        $offerCondition = 'COALESCE(ps.`id_oi_offer`, 0) > 0';

        // Dynamic: check all three linking mechanisms via a single EXISTS subquery.
        // active is stored in the JSON 'data' column (json_encode with JSON_NUMERIC_CHECK → "active":true).
        $dynamicCondition = '1=0';
        if ($dynamicActive) {
            $dynamicCondition = 'EXISTS (
                SELECT 1 FROM `' . $prefix . 'dynamicproduct_product_config` _dpc
                WHERE _dpc.`id_product` = p.`id_product`
                AND _dpc.`data` LIKE \'%"active":true%\'
                UNION ALL
                SELECT 1 FROM `' . $prefix . 'dynamicproduct_product_config_link` _dcl
                JOIN `' . $prefix . 'dynamicproduct_product_config` _dpc2 ON _dpc2.`id_product` = _dcl.`id_product_source`
                WHERE _dcl.`id_product` = p.`id_product`
                AND _dpc2.`data` LIKE \'%"active":true%\'
                UNION ALL
                SELECT 1 FROM `' . $prefix . 'category_product` _cp
                JOIN `' . $prefix . 'dynamicproduct_product_config_category_link` _dccl ON _dccl.`id_category` = _cp.`id_category`
                JOIN `' . $prefix . 'dynamicproduct_product_config` _dpc3 ON _dpc3.`id_product` = _dccl.`id_product`
                WHERE _cp.`id_product` = p.`id_product`
                AND _dpc3.`data` LIKE \'%"active":true%\'
            )';
        }

        $sawCondition = '1=0';
        if ($sawGroupId > 0) {
            $sawCondition = 'EXISTS (
                SELECT 1 FROM `' . $prefix . 'product_attribute` _pa
                JOIN `' . $prefix . 'product_attribute_combination` _pac ON _pa.`id_product_attribute` = _pac.`id_product_attribute`
                JOIN `' . $prefix . 'attribute` _a ON _pac.`id_attribute` = _a.`id_attribute`
                WHERE _pa.`id_product` = p.`id_product`
                AND _a.`id_attribute_group` = ' . $sawGroupId . '
            )';
        }

        $cutCondition = '1=0';
        if ($cutGroupId > 0) {
            $cutCondition = 'EXISTS (
                SELECT 1 FROM `' . $prefix . 'product_attribute` _pa2
                JOIN `' . $prefix . 'product_attribute_combination` _pac2 ON _pa2.`id_product_attribute` = _pac2.`id_product_attribute`
                JOIN `' . $prefix . 'attribute` _a2 ON _pac2.`id_attribute` = _a2.`id_attribute`
                WHERE _pa2.`id_product` = p.`id_product`
                AND _a2.`id_attribute_group` = ' . $cutGroupId . '
            )';
        }

        // Add computed column to SELECT
        $searchQueryBuilder->addSelect(
            'CASE
                WHEN ' . $offerCondition . ' THEN \'offer\'
                WHEN ' . $dynamicCondition . ' THEN \'dynamic\'
                WHEN ' . $sawCondition . ' THEN \'saw\'
                WHEN ' . $cutCondition . ' THEN \'cut\'
                ELSE \'simple\'
            END AS ms_product_type'
        );

        // Apply filter when a type is selected
        /** @var SearchCriteriaInterface $searchCriteria */
        $searchCriteria = $params['search_criteria'];
        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {
            if ('ms_product_type' !== $filterName || $filterValue === null || $filterValue === '') {
                continue;
            }

            switch ($filterValue) {
                case 'offer':
                    $searchQueryBuilder->andWhere($offerCondition);
                    $countQueryBuilder->andWhere($offerCondition);
                    break;
                case 'dynamic':
                    $searchQueryBuilder->andWhere($dynamicCondition);
                    $countQueryBuilder->andWhere($dynamicCondition);
                    break;
                case 'saw':
                    $searchQueryBuilder->andWhere($sawCondition);
                    $countQueryBuilder->andWhere($sawCondition);
                    break;
                case 'cut':
                    $searchQueryBuilder->andWhere($cutCondition);
                    $countQueryBuilder->andWhere($cutCondition);
                    break;
                case 'simple':
                    $simpleCondition = 'NOT (' . $offerCondition . ')'
                        . ' AND NOT (' . $dynamicCondition . ')'
                        . ' AND NOT (' . $sawCondition . ')'
                        . ' AND NOT (' . $cutCondition . ')';
                    $searchQueryBuilder->andWhere($simpleCondition);
                    $countQueryBuilder->andWhere($simpleCondition);
                    break;
            }
        }
    }
}
