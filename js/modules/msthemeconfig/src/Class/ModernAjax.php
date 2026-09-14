<?php

declare(strict_types=1);

namespace MsThemeConfig\Class;

use AttributeGroup;
use Carrier;
use Category;
use CMS;
use Configuration;
use Context;
use DateTime;
use Db;
use Employee;
use Feature;
use FeatureValue;
use Group;
use Module;
use NumberFormatter;
use PaymentModule;
use Validate;
use OrderState;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use PrestaShop\PrestaShop\Core\Foundation\Filesystem\Exception;
use PrestaShopCollection;
use PrestaShopDatabaseException;
use PrestaShopException;
use Profile;
use Shop;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Throwable;
use Tools;

class ModernAjax
{
    private ?int $idShop;
    private ?int $idShopGroup;
    private int $idLang;
    private string $prefix;
    private Context $context;
    private RouterInterface $router;
    private CsrfTokenManagerInterface $csrfTokenManager;

    public function __construct(RouterInterface $router, CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->context = Context::getContext();
        $this->initializeMultistoreContext();
        $this->idLang = $this->context->language->id;
        $this->prefix = 'MSTHEMECONFIG_';
        $this->router = $router;
        $this->csrfTokenManager = $csrfTokenManager;
    }

    /**
     * Initialize multistore context based on current shop context
     */
    private function initializeMultistoreContext(): void
    {
        $shopContext = $this->context->shop->getContext();

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
     * Refresh multistore context just-in-time before loading panel data.
     * Ensures we use the current Back Office scope (All/Group/Shop) and language.
     */
    private function refreshMultistoreContext(): void
    {
        $this->initializeMultistoreContext();
        // Normalize and refresh language
        if ($this->idShop !== null) {
            $this->idShop = (int)$this->idShop;
        }
        if ($this->idShopGroup !== null) {
            $this->idShopGroup = (int)$this->idShopGroup;
        }
        $this->idLang = (int)($this->context && $this->context->language ? $this->context->language->id : (int)Configuration::get('PS_LANG_DEFAULT'));
    }

    /**
     * Get configuration value with proper multistore context
     *
     * @param string $key Configuration key
     * @param mixed|null $default Default value if not found
     *
     * @return mixed
     */
    private function normalizeKey(string $key): string
    {
        // Ensure all keys use MSTHEMECONFIG_ prefix
        if ($key === '') {
            return $key;
        }

        // If it already starts with a known module prefix, don't re-prefix it
        $knownPrefixes = ['MSTHEMECONFIG_', 'IJZERSHOPKIYOH_', 'SAWANDCUT_', 'KOOPMANORDEREXPORT_', 'MODERNESMIDMAILTHEME_'];
        foreach ($knownPrefixes as $p) {
            if (str_starts_with($key, $p)) {
                return $key;
            }
        }

        return 'MSTHEMECONFIG_' . $key;
    }

    private function getConfigValue(string $key, mixed $default = null)
    {
        $normalized = $this->normalizeKey($key);
        $val = Configuration::get(
            $normalized,
            $this->idLang,
            $this->idShopGroup,
            $this->idShop,
            null
        );
        if ($val === null || $val === '') {
            // Fallback to legacy key namespace during transition
            $legacyKey = str_starts_with($normalized, 'MSTHEMECONFIG_')
                ? ('MSTHEMECONFIG_' . substr($normalized, strlen('MSTHEMECONFIG_')))
                : $normalized;
            $val = Configuration::get(
                $legacyKey,
                $this->idLang,
                $this->idShopGroup,
                $this->idShop,
                null
            );
        }

        return ($val === null || $val === '') ? $default : $val;
    }

    /**
     * Update configuration value with proper multistore context
     *
     * @param string $key Configuration key
     * @param mixed $value Value to set
     *
     * @return bool
     */
    private function updateConfigValue(string $key, $value): bool
    {
        $normalized = $this->normalizeKey($key);

        return Configuration::updateValue(
            $normalized,
            $value,
            false, // HTML
            $this->idShopGroup,
            $this->idShop
        );
    }

    /**
     * Normalize carrier configuration value to id_reference.
     */
    private function normalizeCarrierReferenceId($value): int
    {
        $id = is_array($value) ? (int) reset($value) : (int) $value;
        if ($id <= 0) {
            return 0;
        }

        $carrier = new Carrier($id);
        if (\Validate::isLoadedObject($carrier)) {
            return (int) ($carrier->id_reference ?: $carrier->id);
        }

        $carrierByReference = Carrier::getCarrierByReference($id);
        if ($carrierByReference && \Validate::isLoadedObject($carrierByReference)) {
            return (int) ($carrierByReference->id_reference ?: $id);
        }

        return $id;
    }

    private function getCarrierConfigValue(string $key, $default = null): int
    {
        $val = $this->getConfigValue($key, $default);
        return $this->normalizeCarrierReferenceId($val);
    }

    /**
     * Get the default url for select2 calls from the module config page
     *
     * @return string
     */
    public function getSelect2Url(): string
    {
        // Generate Symfony route and append the legacy token expected for _legacy_controller=ModernAjax
        // In PrestaShop 9.x, routes with _legacy_controller validate ?token for that legacy controller
        $url = $this->router->generate('modernesmid_config_get_select2_data', [
            // Keep empty to let JS append the actual type; empty keeps the trailing slash predictable
            'data_type' => 'home',
            'token' => Tools::getAdminTokenLite('ModernAjax'),
        ]);

        return $url;
    }

    /**
     * Generate a valid token for this module's Symfony routes
     *
     * @return string
     */
    private function getToken(): string
    {
        try {
            return $this->csrfTokenManager->getToken('modernesmid_config_get_select2_data')->getValue();
        } catch (Throwable $e) {
            // Fallback to employee token
            return Tools::getAdminTokenLite('AdminModules');
        }
    }

    /**
     * Get the default url for ajax calls from the module config page
     *
     * @return string
     */
    public function getAjaxUrl(): string
    {
        $adminLink = $this->router
            ->generate('admin_configuration_get_panel', [
                'panel_name' => '',
            ]);

        return $adminLink;
    }

    /**
     * Get the default url for ajax calls from the module config page
     *
     * @return string
     */
    public function getSymlinkMailthemeUrl(): string
    {
        // Generate Symfony route with correct legacy token for ModernAjax
        return $this->router->generate('admin_configuration_symlink_mailtheme_put', [
            'enabled' => '',
            'token' => Tools::getAdminTokenLite('ModernAjax'),
        ]);
    }

    /**
     * Get access list of panel of employee to show only needed configuration panels
     *
     * Profiles within prestashop
     *
     *  1   Ontwikkelaar
     *  2   Kantoor medewerker
     *  3   Werkplaats medewerker
     *  4   Administrator
     *  5   Winkel Medewerker
     *  6   Inpakbaan 1
     *  7   Inpakbaan 2
     *  8   Inpakbaan 3
     *
     * @param $profile
     *
     * @return array
     */
    public function getAccessiblePanelsUser($profile): array
    {
        $accessiblePanels = [];
        switch ($profile) {
            case '1':
            case '2':
                $accessiblePanels = [
                    'home', 'pages', 'alert', 'main', 'user', 'counter-checkout',
                    'dev', 'email', 'mail-theme', 'footer',
                    'kiyoh', 'koopman', 'sawcut', 'plasma', 'ssa', 'offer', 'services',
                    'backup', 'vat', 'sell', 'ai',
                ];
                break;
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                $accessiblePanels = ['alert'];
                break;
        }

        return $accessiblePanels;
    }

    /**
     * @param $panel_name
     * @param Request $request
     *
     * @return Response
     */
    public function getPanel($panel_name, Request $request): Response
    {
        // Refresh multistore + language context JIT for each request to avoid stale IDs
        $this->refreshMultistoreContext();

        if (empty($panel_name) && !Tools::getValue('panel_name')) {
            $panel_name = 'home';
        } else {
            $panel_name = Tools::getValue('panel_name');
        }

        try {
            if ($panel_name == 'vat') {
                $from = $request->get('from');
                $to = $request->get('to');
                $panelData = $this->fetchVatDataFromOrderTable($from, $to);
                $sqlHistoryVat = 'SELECT * FROM `' . _DB_PREFIX_ . 'modernesmid_vat_history` ORDER BY `' . _DB_PREFIX_ . 'modernesmid_vat_history`.`id`';
                $resultHistory = Db::getInstance()->executeS($sqlHistoryVat);
                $panelData['vat_history'] = $resultHistory;
            } elseif ($panel_name == 'backup') {
                $panelData['console_link'] = $this->context->link->getAdminLink('MsAdminCatalogBackup');
            } elseif ($panel_name == 'ai') {
                $panelData['console_link'] = $this->context->link->getAdminLink('MsAdminAIDescriptions');
            } else {
                $panelData = $this->fetchData($panel_name);
            }

            $panelData['admin_token'] = Tools::getAdminToken('AdminModules');
            $configurator = Module::getInstanceByName('msthemeconfig')->getModernConfig();
            $html = $configurator->render('@Modules/msthemeconfig/views/templates/admin/panels/panel-' . $panel_name . '.html.twig', $panelData);

            return new Response($html, 200, [
                'Content-Type' => 'text/html',
                'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma' => 'no-cache',
                'Expires' => '0',
            ]);
        } catch (PrestaShopException $e) {
            return new Response('Error loading panel data', 500, [
                'Content-Type' => 'text/html',
                'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma' => 'no-cache',
                'Expires' => '0',
            ]);
        }
    }

    /**
     * Fetch the configuration data from the database per panel
     *
     * @param string $panel_name
     *
     * @return array
     *
     * @throws PrestaShopDatabaseException
     */
    private function fetchData(string $panel_name = 'home'): array
    {
        $dataArray = [];
        // Fetch and build configuration data of panel
        switch ($panel_name) {
            // Start Home
            case 'home':
                $dataArray[$this->prefix . 'TOKEN'] = $this->getConfigValue('TOKEN', '');
                $dataArray[$this->prefix . 'FAVICON_SHOP'] = $this->getConfigValue('FAVICON_SHOP', 'IJ');
                $dataArray[$this->prefix . 'SHOW_PAYMENT_ERROR_CHECKOUT'] = $this->getConfigValue('SHOW_PAYMENT_ERROR_CHECKOUT', false);
                break;
            // Start Alert
            case 'pages':
                // Header
                $dataArray[$this->prefix . 'SHOW_MENU_ICON'] = $this->getConfigValue('SHOW_MENU_ICON', 1);
                $dataArray[$this->prefix . 'HEADER_WHATSAPP_TEXT'] = $this->getConfigValue('HEADER_WHATSAPP_TEXT', '0636 58 58 00');
                $dataArray[$this->prefix . 'HEADER_WHATSAPP_LINK'] = $this->getConfigValue('HEADER_WHATSAPP_LINK', 'https://api.whatsapp.com/send?phone=31636585800');
                $dataArray[$this->prefix . 'HEADER_PHONENUMBER_TEXT'] = $this->getConfigValue('HEADER_PHONENUMBER_TEXT', '0900-2502500');
                $dataArray[$this->prefix . 'HEADER_PHONENUMBER_LINK'] = $this->getConfigValue('HEADER_PHONENUMBER_LINK', 'tel://0900-2502500');
                $dataArray[$this->prefix . 'HEADER_MAIL_TEXT'] = $this->getConfigValue('HEADER_MAIL_TEXT', 'Mail');
                $dataArray[$this->prefix . 'HEADER_MAIL_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'HEADER_MAIL_LINK', ''), 'pages');
                $dataArray[$this->prefix . 'OFFER_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'OFFER_LINK', ''), 'pages');
                $dataArray[$this->prefix . 'PRIMARY_COLOR'] = $this->getConfigValue('PRIMARY_COLOR', '#3b56ad');
                // Homepage variables
                $dataArray[$this->prefix . 'HOMEPAGE_CATEGORIES'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'HOMEPAGE_CATEGORIES_SORTED', []), 'categories_home', false);
                $dataArray[$this->prefix . 'HOMEPAGE_CATEGORIES_SORTED'] = $this->getConfigValue($this->prefix . 'HOMEPAGE_CATEGORIES_SORTED', []);
                $dataArray[$this->prefix . 'HOMEPAGE_TEXT'] = $this->getConfigValue('HOMEPAGE_TEXT', '');
                $dataArray[$this->prefix . 'HOMEPAGE_BACKGROUND_COLOR'] = $this->getConfigValue('HOMEPAGE_BACKGROUND_COLOR', '#efefef');
                // Category variables
                $dataArray[$this->prefix . 'CATEGORY_SHOW_PRODUCT_PAGE'] = (int)$this->getConfigValue($this->prefix . 'CATEGORY_SHOW_PRODUCT_PAGE', '');
                $dataArray[$this->prefix . 'CATEGORY_BOTTOM_TEXT'] = $this->getConfigValue('CATEGORY_BOTTOM_TEXT', '');
                $dataArray[$this->prefix . 'CATEGORY_IMAGE_SIZE'] = $this->getConfigValue('CATEGORY_IMAGE_SIZE', 'col-sm-4 col-md-2');
                // Product page
                $dataArray[$this->prefix . 'SHOW_PRODUCT_FEATURES'] = $this->getConfigValue('SHOW_PRODUCT_FEATURES', 'category');
                $featureEnabled = $this->getConfigValue($this->prefix . 'FEATURE_ENABLED', []);
                $featureEnabledSorted = $this->getConfigValue($this->prefix . 'FEATURE_ENABLED_SORTED', null);
                if ($featureEnabledSorted === null || $featureEnabledSorted === false || $featureEnabledSorted === '') {
                    // Migrate existing installations on their next save without losing the current selection.
                    $featureEnabledSorted = $featureEnabled;
                }
                $dataArray[$this->prefix . 'FEATURE_ENABLED'] = $this->getSelect2SelectedOptions($featureEnabledSorted, 'features');
                $dataArray[$this->prefix . 'FEATURE_ENABLED_SORTED'] = $featureEnabledSorted;
                $dataArray[$this->prefix . 'FEATURE_LENGTH'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FEATURE_LENGTH', ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_WIDTH'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FEATURE_WIDTH', ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_HEIGHT'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FEATURE_HEIGHT', ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_WEIGHT'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FEATURE_WEIGHT', ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_MATERIAL'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FEATURE_MATERIAL', ''), 'features');
                $dataArray[$this->prefix . 'FEATURE_COLOR'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FEATURE_COLOR', ''), 'features');
                // Contact page
                $dataArray[$this->prefix . 'CONTACTPAGE_CONSTRUCTION'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'CONTACTPAGE_CONSTRUCTION', ''), 'pages');
                $dataArray[$this->prefix . 'CONTACTPAGE_FAQ'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'CONTACTPAGE_FAQ', ''), 'pages');
                $dataArray[$this->prefix . 'CONTACTPAGE_PRIVACY'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'CONTACTPAGE_PRIVACY', ''), 'pages');

                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTINFORMATION_PAGE'] = $this->getConfigValue('CONTACTPAGE_CONTACTINFORMATION_PAGE', '');
                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTINFORMATION_TEXT'] = $this->getConfigValue('CONTACTPAGE_CONTACTINFORMATION_TEXT', '');
                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTOFFER_PAGE'] = $this->getConfigValue('CONTACTPAGE_CONTACTOFFER_PAGE', '');
                $dataArray[$this->prefix . 'CONTACTPAGE_CONTACTOFFER_TEXT'] = $this->getConfigValue('CONTACTPAGE_CONTACTOFFER_TEXT', '');

                // cookie
                $dataArray[$this->prefix . 'AVG_INFO_PAGE'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'AVG_INFO_PAGE', 52), 'pages');
                break;
            // Start Alert
            case 'alert':
                // Notifications
                $dataArray[$this->prefix . 'SHOP_NOTIFICATION_PAGES'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'SHOP_NOTIFICATION_PAGES', ''), 'notification_pages');
                $dataArray[$this->prefix . 'SHOP_NOTIFICATION_TYPE'] = $this->getConfigValue('SHOP_NOTIFICATION_TYPE', '');
                $dataArray[$this->prefix . 'SHOP_NOTIFICATION_TEXT'] = $this->getConfigValue('SHOP_NOTIFICATION_TEXT', '');
                break;
            case 'email':
                // Emails
                $dataArray[$this->prefix . 'EMAIL_FOOTER_TEXT'] = $this->getConfigValue('EMAIL_FOOTER_TEXT', '');
                $dataArray[$this->prefix . 'EMAIL_FOOTER_TEXT_TXT'] = $this->getConfigValue('EMAIL_FOOTER_TEXT_TXT', '');
                $dataArray[$this->prefix . 'ORDERSTATE_SENDMAIL_JSON'] = $this->getConfigValue('ORDERSTATE_SENDMAIL_JSON', '');

                $dataArray[$this->prefix . 'ORDERSTATE_SENDMAIL'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'ORDERSTATE_SENDMAIL', 52), 'order_states');

                $dataArray[$this->prefix . 'MY_ACCOUNT_LANDING_TEXT'] = $this->getConfigValue('MY_ACCOUNT_LANDING_TEXT', '');
                break;
            case 'ssa':
                $dataArray[$this->prefix . 'SSA_PRODUCTS_TYPE'] = (int)$this->getConfigValue($this->prefix . 'SSA_PRODUCTS_TYPE', 0);
                $dataArray[$this->prefix . 'SSA_PRODUCTS'] = $this->getSelect2SelectedOptions(
                    $this->getConfigValue($this->prefix . 'SSA_PRODUCTS', []),
                    'products'
                );
                $dataArray[$this->prefix . 'SSA_CATEGORIES'] = $this->getSelect2SelectedOptions(
                    $this->getConfigValue($this->prefix . 'SSA_CATEGORIES', []),
                    'categories_home'
                );
                break;
            // Start Alert
            case 'services':
                // Google maps
                $dataArray[$this->prefix . 'MAPS_KEY'] = $this->getConfigValue('MAPS_KEY', '');
                // Clarity
                $dataArray[$this->prefix . 'CLARITY_ID'] = $this->getConfigValue('CLARITY_ID', '7bu3k08a1u');
                // TawkTo
                $dataArray[$this->prefix . 'TAWKTO_WIDGET_ID'] = $this->getConfigValue('TAWKTO_WIDGET_ID', '1gb4md3r7');
                // Trello
                $dataArray[$this->prefix . 'TRELLO_URL'] = $this->getConfigValue('TRELLO_URL', 'https://api.trello.com');
                $dataArray[$this->prefix . 'TRELLO_SECRET'] = $this->getConfigValue('TRELLO_SECRET', '38fb659a1379d6cb0aa5e9ab2a41e8e4');
                $dataArray[$this->prefix . 'TRELLO_TOKEN'] = $this->getConfigValue('TRELLO_TOKEN', 'fc910c51fa24c3fa5f6935409454b317bd70c9eac213b8bfeddef23b7e1c66d4');
                // Dashboard Api
                $dataArray[$this->prefix . 'DASHBOARD_API_URL'] = $this->getConfigValue('DASHBOARD_API_URL', 52);
                $dataArray[$this->prefix . 'DASHBOARD_API_USER'] = $this->getConfigValue('DASHBOARD_API_USER', 52);
                $dataArray[$this->prefix . 'DASHBOARD_API_PASS'] = $this->getConfigValue('DASHBOARD_API_PASS', 52);
                // Channable
                $dataArray[$this->prefix . 'CHANNABLE_CATEGORIES'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'CHANNABLE_CATEGORIES', ''), 'categories_home');
                // GA4 Measurement Protocol
                $dataArray[$this->prefix . 'GA4_MEASUREMENT_ID'] = $this->getConfigValue('GA4_MEASUREMENT_ID', '');
                $dataArray[$this->prefix . 'GA4_API_SECRET'] = $this->getConfigValue('GA4_API_SECRET', '');
                $dataArray[$this->prefix . 'GA4_TRIGGER_STATES'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'GA4_TRIGGER_STATES', ''), 'order_states');
                $dataArray[$this->prefix . 'GA4_CANCEL_STATES'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'GA4_CANCEL_STATES', ''), 'order_states');
                $dataArray[$this->prefix . 'GA4_ENDPOINT'] = $this->getConfigValue('GA4_ENDPOINT', 'https://www.google-analytics.com/mp/collect');
                $dataArray[$this->prefix . 'GTM_SERVER_URL'] = $this->getConfigValue('GTM_SERVER_URL', '');
                $dataArray[$this->prefix . 'GA4_PAYMENT_LOG'] = (int)$this->getConfigValue('GA4_PAYMENT_LOG', 0);
                $dataArray[$this->prefix . 'GA4_EVENT_LOG'] = (int)$this->getConfigValue('GA4_EVENT_LOG', 0);
                break;
            // Start Footer
            case 'footer':
                // Start Certainties banner

                $dataArray[$this->prefix . 'FIRST_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'FIRST_BOX_ACTIVE', 1);
                $dataArray[$this->prefix . 'BANNER_FIRST_TEXT'] = $this->getConfigValue('BANNER_FIRST_TEXT', '');
                $dataArray[$this->prefix . 'BANNER_FIRST_TITLE'] = $this->getConfigValue('BANNER_FIRST_TITLE', '');

                $dataArray[$this->prefix . 'BANNER_FIRST_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'BANNER_FIRST_LINK', ''), 'pages');

                $dataArray[$this->prefix . 'SECOND_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'SECOND_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'BANNER_SECOND_TEXT'] = $this->getConfigValue('BANNER_SECOND_TEXT', '');
                $dataArray[$this->prefix . 'BANNER_SECOND_TITLE'] = $this->getConfigValue('BANNER_SECOND_TITLE', '');

                $dataArray[$this->prefix . 'BANNER_SECOND_LINK'] = $this->getConfigValue('BANNER_SECOND_LINK', '');

                $dataArray[$this->prefix . 'THIRD_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'THIRD_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'BANNER_THIRD_TEXT'] = $this->getConfigValue('BANNER_THIRD_TEXT', '');
                $dataArray[$this->prefix . 'BANNER_THIRD_TITLE'] = $this->getConfigValue('BANNER_THIRD_TITLE', '');

                $dataArray[$this->prefix . 'BANNER_THIRD_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'BANNER_THIRD_LINK', ''), 'pages');

                $dataArray[$this->prefix . 'FOURTH_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'FOURTH_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'BANNER_FOURTH_TEXT'] = $this->getConfigValue('BANNER_FOURTH_TEXT', '');
                $dataArray[$this->prefix . 'BANNER_FOURTH_TITLE'] = $this->getConfigValue('BANNER_FOURTH_TITLE', '');

                $dataArray[$this->prefix . 'BANNER_FOURTH_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'BANNER_FOURTH_LINK', ''), 'pages');

                $dataArray[$this->prefix . 'FIFTH_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'FIFTH_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'BANNER_FIFTH_TEXT'] = $this->getConfigValue('BANNER_FIFTH_TEXT', '');
                $dataArray[$this->prefix . 'BANNER_FIFTH_TITLE'] = $this->getConfigValue('BANNER_FIFTH_TITLE', '');
                $dataArray[$this->prefix . 'BANNER_FIFTH_LINK'] = $this->getConfigValue('BANNER_FIFTH_LINK', '');

                $img1 = $this->getConfigValue('BANNER_FIRST_IMAGE', '');
                $dataArray[$this->prefix . 'BANNER_FIRST_IMAGE'] = $img1 ? '../upload/' . $img1 : '';

                $img2 = $this->getConfigValue('BANNER_SECOND_IMAGE', '');
                $dataArray[$this->prefix . 'BANNER_SECOND_IMAGE'] = $img2 ? '../upload/' . $img2 : '';

                $img3 = $this->getConfigValue('BANNER_THIRD_IMAGE', '');
                $dataArray[$this->prefix . 'BANNER_THIRD_IMAGE'] = $img3 ? '../upload/' . $img3 : '';

                $img4 = $this->getConfigValue('BANNER_FOURTH_IMAGE', '');
                $dataArray[$this->prefix . 'BANNER_FOURTH_IMAGE'] = $img4 ? '../upload/' . $img4 : '';

                $img5 = $this->getConfigValue('BANNER_FIFTH_IMAGE', '');
                $dataArray[$this->prefix . 'BANNER_FIFTH_IMAGE'] = $img5 ? '../upload/' . $img5 : '';

                // Footer top settings
                $dataArray[$this->prefix . 'ABOUT_FOOTERTOP_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'ABOUT_FOOTERTOP_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERTOP_ABOUTUS_HEADER'] = $this->getConfigValue('FOOTERTOP_ABOUTUS_HEADER', 'Over ons');
                $dataArray[$this->prefix . 'FOOTERTOP_ABOUTUS_TEXT'] = $this->getConfigValue('FOOTERTOP_ABOUTUS_TEXT', 'IJzershop.nl levert stalen, aluminium en roestvaste platen en profielen. Wij leveren in heel Nederland aan vakmensen en particulieren. De metalen profielen worden in lengtes van 2 meter geleverd maar kunnen ook op maat worden gezaagd of geknipt.<br/>Samen met de partner webshops van de IJzershop kunnen wij profiteren van een ijzersterk netwerk van leveranciers en expediteurs. De supportdesk van IJzershop.nl is elke werkdag bereikbaar van 7.30 tot 17.00 uur.');

                $dataArray[$this->prefix . 'FOOTERTOP_ABOUTUS_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FOOTERTOP_ABOUTUS_LINK', null), 'pages');

                $dataArray[$this->prefix . 'INFORMATION_FOOTERTOP_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'INFORMATION_FOOTERTOP_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERTOP_INFORMATION_HEADER'] = $this->getConfigValue('FOOTERTOP_INFORMATION_HEADER', null);
                $dataArray[$this->prefix . 'FOOTERTOP_INFORMATION'] = $this->getConfigValue('FOOTERTOP_INFORMATION', null);

                $dataArray[$this->prefix . 'PARTNERS_FOOTERTOP_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'PARTNERS_FOOTERTOP_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERTOP_PARTNERS_HEADER'] = $this->getConfigValue('FOOTERTOP_PARTNERS_HEADER', null);
                $dataArray[$this->prefix . 'FOOTERTOP_PARTNERS'] = $this->getConfigValue('FOOTERTOP_PARTNERS', null);

                $dataArray[$this->prefix . 'STORE_INFORMATION_FOOTERTOP_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'STORE_INFORMATION_FOOTERTOP_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_OPENED'] = $this->getConfigValue('FOOTERTOP_STOREINFO_OPENED', '8.00 - 17.00 uur');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_ADDRESS'] = $this->getConfigValue('FOOTERTOP_STOREINFO_ADDRESS', 'Venusweg 15, 8938 bc Leeuwarden');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_PHONE'] = $this->getConfigValue('FOOTERTOP_STOREINFO_PHONE', '0900-2502500');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_WHATSAPP'] = $this->getConfigValue('FOOTERTOP_STOREINFO_WHATSAPP', '0636 58 58 00');
                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_CONTACTPAGE'] = $this->getConfigValue('FOOTERTOP_STOREINFO_CONTACTPAGE', null);

                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FOOTERTOP_STOREINFO_LINK', null), 'pages');

                $dataArray[$this->prefix . 'FOOTERTOP_STOREINFO_GOOGLE_STRING'] = $this->getConfigValue('FOOTERTOP_STOREINFO_GOOGLE_STRING', 'Venusweg+15,+8938+BC+Leeuwarden,+Nederland/@53.1900453,5.8343069,14.84z/data=!4m5!3m4!1s0x47c8ff1ce41c9249:0x1c9b6585ccebc071!8m2!3d53.1917373!4d5.8470482?hl=nl-NL');

                // Footer bottom settings
                $dataArray[$this->prefix . 'FIRST_FOOTERBOTTOM_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'FIRST_FOOTERBOTTOM_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_TEXT'] = $this->getConfigValue('FOOTERBOTTOM_FIRST_TEXT', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_TITLE'] = $this->getConfigValue('FOOTERBOTTOM_FIRST_TITLE', '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FOOTERBOTTOM_FIRST_LINK', null), 'pages');

                $dataArray[$this->prefix . 'SECOND_FOOTERBOTTOM_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'SECOND_FOOTERBOTTOM_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_TEXT'] = $this->getConfigValue('FOOTERBOTTOM_SECOND_TEXT', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_TITLE'] = $this->getConfigValue('FOOTERBOTTOM_SECOND_TITLE', '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FOOTERBOTTOM_SECOND_LINK', null), 'pages');

                $dataArray[$this->prefix . 'THIRD_FOOTERBOTTOM_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'THIRD_FOOTERBOTTOM_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_TEXT'] = $this->getConfigValue('FOOTERBOTTOM_THIRD_TEXT', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_TITLE'] = $this->getConfigValue('FOOTERBOTTOM_THIRD_TITLE', '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FOOTERBOTTOM_THIRD_LINK', null), 'pages');

                $dataArray[$this->prefix . 'FOURTH_FOOTERBOTTOM_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'FOURTH_FOOTERBOTTOM_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_TEXT'] = $this->getConfigValue('FOOTERBOTTOM_FOURTH_TEXT', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_TITLE'] = $this->getConfigValue('FOOTERBOTTOM_FOURTH_TITLE', '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FOOTERBOTTOM_FOURTH_LINK', null), 'pages');

                $dataArray[$this->prefix . 'FIFTH_FOOTERBOTTOM_BOX_ACTIVE'] = (int)$this->getConfigValue($this->prefix . 'FIFTH_FOOTERBOTTOM_BOX_ACTIVE', true);
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_TEXT'] = $this->getConfigValue('FOOTERBOTTOM_FIFTH_TEXT', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_TITLE'] = $this->getConfigValue('FOOTERBOTTOM_FIFTH_TITLE', '');

                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_LINK'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'FOOTERBOTTOM_FIFTH_LINK', null), 'pages');

                $imgf1 = $this->getConfigValue('FOOTERBOTTOM_FIRST_IMAGE', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIRST_IMAGE'] = $imgf1 ? '../upload/' . $imgf1 : '';

                $imgf2 = $this->getConfigValue('FOOTERBOTTOM_SECOND_IMAGE', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_SECOND_IMAGE'] = $imgf2 ? '../upload/' . $imgf2 : '';

                $imgf3 = $this->getConfigValue('FOOTERBOTTOM_THIRD_IMAGE', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_THIRD_IMAGE'] = $imgf3 ? '../upload/' . $imgf3 : '';

                $imgf4 = $this->getConfigValue('FOOTERBOTTOM_FOURTH_IMAGE', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FOURTH_IMAGE'] = $imgf4 ? '../upload/' . $imgf4 : '';

                $imgf5 = $this->getConfigValue('FOOTERBOTTOM_FIFTH_IMAGE', '');
                $dataArray[$this->prefix . 'FOOTERBOTTOM_FIFTH_IMAGE'] = $imgf5 ? '../upload/' . $imgf5 : '';

                break;
            case 'offer':
                // Custom Product
                $dataArray[$this->prefix . 'OFFER_INTEGRATION_OFFER_CATEGORY_ID'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'OFFER_INTEGRATION_OFFER_CATEGORY_ID', '1'), 'categories_home');
                $dataArray[$this->prefix . 'OFFER_INTEGRATION_EXTRA_SHIPPING'] = $this->getConfigValue('OFFER_INTEGRATION_EXTRA_SHIPPING', '');
                $dataArray[$this->prefix . 'OFFER_INTEGRATION_WEIGHT'] = $this->getConfigValue('OFFER_INTEGRATION_WEIGHT', '35');
                break;
            case 'config-main':
                // Admin Header Logo
                $adminLogo = $this->getConfigValue('ADMIN_HEADER_LOGO', '');
                $dataArray[$this->prefix . 'ADMIN_HEADER_LOGO'] = $adminLogo;

                // Custom Product
                $dataArray[$this->prefix . 'CUSTOM_INTERNAL_COSTS_PRODUCT_CATEGORY'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'CUSTOM_INTERNAL_COSTS_PRODUCT_CATEGORY', '0'), 'categories_home');
                $dataArray[$this->prefix . 'CUSTOM_PRODUCT_CATEGORY'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'CUSTOM_PRODUCT_CATEGORY', '1'), 'categories_home');
                $dataArray[$this->prefix . 'CUSTOM_PRODUCT_REFERENCE'] = $this->getConfigValue('CUSTOM_PRODUCT_REFERENCE', '');
                $dataArray[$this->prefix . 'TIME_BASED_PRODUCTS'] = $this->getConfigValue('TIME_BASED_PRODUCTS', '');

                // Order states
                $dataArray[$this->prefix . 'ORDERSTATE_PAID'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'ORDERSTATE_PAID', ''), 'order_states');
                $dataArray[$this->prefix . 'ORDERSTATE_FREE_ORDER'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'ORDERSTATE_FREE_ORDER', ''), 'order_states');

                // Carriers
                $dataArray[$this->prefix . 'SHIPPING_CARRIER'] = $this->getSelect2SelectedOptions($this->getCarrierConfigValue($this->prefix . 'SHIPPING_CARRIER', '10'), 'carriers');
                $dataArray[$this->prefix . 'PICKUP_CARRIER'] = $this->getSelect2SelectedOptions($this->getCarrierConfigValue($this->prefix . 'PICKUP_CARRIER', '7'), 'carriers');
                $dataArray[$this->prefix . 'ADD2ORDER_CARRIER'] = $this->getSelect2SelectedOptions($this->getCarrierConfigValue($this->prefix . 'ADD2ORDER_CARRIER', '8'), 'carriers');
                $dataArray[$this->prefix . 'CUSTOM_ADDRESS_WHEN_FAIL'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'CUSTOM_ADDRESS_WHEN_FAIL', null), 'addresses');

                // AI Frontend
                $dataArray = array_merge($dataArray, \MsThemeConfig\AI\ToolKeySettings::viewData());
                $dataArray[$this->prefix . 'AI_FRONTEND_ENABLED'] = (int)$this->getConfigValue('AI_FRONTEND_ENABLED', 0);
                $dataArray[$this->prefix . 'AI_CONTEXT_SEARCH'] = $this->getConfigValue('AI_CONTEXT_SEARCH', '');
                $dataArray[$this->prefix . 'AI_CONTEXT_PLATE_CUTS'] = $this->getConfigValue('AI_CONTEXT_PLATE_CUTS', '');
                $dataArray[$this->prefix . 'AI_CONTEXT_SAW_CUTS'] = $this->getConfigValue('AI_CONTEXT_SAW_CUTS', '');
                $dataArray[$this->prefix . 'USE_WEBP'] = $this->getConfigValue('USE_WEBP', 0);
                break;
            case 'counter-checkout':
                $dataArray[$this->prefix . 'COUNTER_CARRIER_REFS'] = $this->getSelect2SelectedOptions(
                    $this->getConfigValue($this->prefix . 'COUNTER_CARRIER_REFS', ''), 'carriers'
                );
                $dataArray[$this->prefix . 'COUNTER_DEFAULT_CARRIER_REF'] = $this->getSelect2SelectedOptions(
                    $this->getConfigValue($this->prefix . 'COUNTER_DEFAULT_CARRIER_REF', ''), 'carriers'
                );
                $dataArray[$this->prefix . 'COUNTER_PAYMENT_MODULES'] = $this->getSelect2SelectedOptions(
                    $this->getConfigValue($this->prefix . 'COUNTER_PAYMENT_MODULES', ''), 'payment_modules'
                );
                $dataArray[$this->prefix . 'COUNTER_DEFAULT_PAYMENT'] = $this->getSelect2SelectedOptions(
                    $this->getConfigValue($this->prefix . 'COUNTER_DEFAULT_PAYMENT', ''), 'payment_modules'
                );
                break;
            case 'config-user':
                $dataArray[$this->prefix . 'EMPLOYEE_WORKSHOP_PROFILES'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'EMPLOYEE_WORKSHOP_PROFILES', ''), 'profiles');
                $dataArray[$this->prefix . 'EMPLOYEE_SHOP_PROFILES'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'EMPLOYEE_SHOP_PROFILES', ''), 'profiles');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_PROFILE'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'EMPLOYEE_CUSTOMER_PROFILE', ''), 'customer');
                $dataArray[$this->prefix . 'ANALYTICS_TEST_CUSTOMERS'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'ANALYTICS_TEST_CUSTOMERS', ''), 'customer');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_BALIE_GROUP'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'EMPLOYEE_CUSTOMER_BALIE_GROUP', ''), 'groups');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_CREDIT_GROUP'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'EMPLOYEE_CUSTOMER_CREDIT_GROUP', ''), 'groups');
                $dataArray[$this->prefix . 'EMPLOYEE_CUSTOMER_VOUCHER_GROUP'] = $this->getSelect2SelectedOptions($this->getConfigValue($this->prefix . 'EMPLOYEE_CUSTOMER_VOUCHER_GROUP', ''), 'groups');
                $dataArray[$this->prefix . 'SHOW_ONCREDIT_CUSTOMER'] = (int)$this->getConfigValue($this->prefix . 'SHOW_ONCREDIT_CUSTOMER', 0);

                break;
            case 'dev':
                $dataArray[$this->prefix . 'ORDERLIST_FILTER_TIME'] = $this->getConfigValue('ORDERLIST_FILTER_TIME', '-4 weeks');
                $dataArray[$this->prefix . 'TEST_WEBSITES'] = $this->getConfigValue('TEST_WEBSITES', '8');
                break;
            case 'mail-theme':
                $defaultMailThemeBlocksData = json_encode([
                    'account' => ['trace' => false, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
                    'account_kb' => ['trace' => false, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
                    'backoffice_order' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'bankwire' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'cheque' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'contact' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
                    'contact_form' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'contact_information' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'contact_offer' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'credit_slip' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'download_product' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'employee_password' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
                    'forward_msg' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'guest_to_customer' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'import' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
                    'in_transit' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'log_alert' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
                    'newsletter' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
                    'order_canceled' => ['trace' => true, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
                    'order_changed' => ['trace' => true, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
                    'order_conf' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'order_customer_comment' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
                    'order_merchant_comment' => ['trace' => false, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
                    'order_return_state' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'outofstock' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'password' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'password_query' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'payment' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'payment_error' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'pickup2' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'preparation' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'productoutofstock' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'refund' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'reply_msg' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'shipped' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'test' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'voucher' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'voucher_new' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    /*
                     * Offer Integration Module
                     */
                    'offernotification' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    /*
                     * gauthenticator Module
                     */
                    'recovery' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    /*
                     * Follow Up Module
                     */
                    'followup_1' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'followup_2' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'followup_3' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'followup_4' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    /*
                     * Email alerts module
                     */
                    'customer_qty' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'order_changed' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'new_order' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
                    'return_slip' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'productoutofstock' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'productcoverage' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    /*
                     * Email subscription Module
                     */
                    'newsletter_conf' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'newsletter_verif' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'newsletter_voucher' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'referralprogram-congratulations' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'referralprogram-invitation' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                    'referralprogram-voucher' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
                ]);

                $dataArray['MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS'] = $this->getConfigValue('MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS', $defaultMailThemeBlocksData);
                break;
            case 'kiyoh':
                $dataArray['IJZERSHOPKIYOH_LIVE_MODE'] = $this->getConfigValue('IJZERSHOPKIYOH_LIVE_MODE', 1);
                $dataArray['IJZERSHOPKIYOH_TOKEN'] = $this->getConfigValue('IJZERSHOPKIYOH_TOKEN', 'e1fk9hurmsnjxrv');
                $dataArray['IJZERSHOPKIYOH_TOTAL_PER_PAGE'] = $this->getConfigValue('IJZERSHOPKIYOH_TOTAL_PER_PAGE', '10');
                $dataArray['IJZERSHOPKIYOH_UPDATE_INTERVAL'] = $this->getConfigValue('IJZERSHOPKIYOH_UPDATE_INTERVAL', '24');
                $dataArray['IJZERSHOPKIYOH_REVIEW_PAGE'] = $this->getSelect2SelectedOptions($this->getConfigValue('IJZERSHOPKIYOH_REVIEW_PAGE', '49'), 'pages');
                break;
            case 'plasma':
                $dataArray = \MsThemeConfig\Plasma\PlasmaSettings::viewData();
                break;
            case 'sawcut':
                $dataArray['SAWANDCUT_DEFAULT_SAWLOSS'] = (string)$this->getConfigValue('SAWANDCUT_DEFAULT_SAWLOSS', '0');
                $dataArray['SAWANDCUT_DEFAULT_MINSAWSIZE'] = (string)$this->getConfigValue('SAWANDCUT_DEFAULT_MINSAWSIZE', '0');
                $dataArray['SAWANDCUT_DEFAULT_MINCUTSIZE'] = (string)$this->getConfigValue('SAWANDCUT_DEFAULT_MINCUTSIZE', '0');
                $dataArray['SAWANDCUT_DEFAULT_MINCUTREMAINDER'] = (string)$this->getConfigValue('SAWANDCUT_DEFAULT_MINCUTREMAINDER', '0');
                $dataArray['SAWANDCUT_DEFAULT_CUT_PRICE'] = (string)$this->getConfigValue('SAWANDCUT_DEFAULT_CUT_PRICE', '0');
                $dataArray['SAWANDCUT_SINGLE_CUT_ENABLED'] = (string)$this->getConfigValue('SAWANDCUT_SINGLE_CUT_ENABLED', '0');
                $dataArray['SAWANDCUT_OFFER_PAGE'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_OFFER_PAGE', ''), 'pages');
                $dataArray['SAWANDCUT_SAWINFO_PAGE'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_SAWINFO_PAGE', ''), 'pages');
                $dataArray['SAWANDCUT_CUTINFO_PAGE'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_CUTINFO_PAGE', ''), 'pages');
                $dataArray['SAWANDCUT_ATTRIBUTE_GROUP'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_ATTRIBUTE_GROUP', ''), 'attribute_groups');
                $dataArray['SAWANDCUT_ATTRIBUTE_GROUP_CUT'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_ATTRIBUTE_GROUP_CUT', ''), 'attribute_groups');
                $dataArray['SAWANDCUT_FEATURE_LENGTH'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_FEATURE_LENGTH', ''), 'features');
                $dataArray['SAWANDCUT_FEATURE_CUTLENGTH'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_FEATURE_CUTLENGTH', ''), 'features');
                $dataArray['SAWANDCUT_FEATURE_CUTWIDTH'] = $this->getSelect2SelectedOptions((string)$this->getConfigValue('SAWANDCUT_FEATURE_CUTWIDTH', ''), 'features');
                break;
            case 'koopman':
                $dataArray['KOOPMANORDEREXPORT_SELECT_STATUS'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_STATUS', '3'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SELECT_CARRIER'] = $this->getSelect2SelectedOptions($this->getCarrierConfigValue('KOOPMANORDEREXPORT_SELECT_CARRIER', '10'), 'carriers');
                $dataArray['KOOPMANORDEREXPORT_UPDATE_BOOL'] = $this->getConfigValue('KOOPMANORDEREXPORT_UPDATE_BOOL', 1);
                $dataArray['KOOPMANORDEREXPORT_UPDATE_STATUS'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_UPDATE_STATUS', '197'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SOAP_URL'] = $this->getConfigValue('KOOPMANORDEREXPORT_SOAP_URL', 'https://portal.trans-mission.nl/webservices/TMSOnline.wsdl');
                $dataArray['KOOPMANORDEREXPORT_API_USERNAME'] = $this->getConfigValue('KOOPMANORDEREXPORT_API_USERNAME', 'info@venusweg15.nl');
                $dataArray['KOOPMANORDEREXPORT_API_PASSWORD'] = $this->getConfigValue('KOOPMANORDEREXPORT_API_PASSWORD', 'viho15');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDER'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDER', 'VIHO Leeuwarden');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM', 'IJzershop');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM2'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM2', "De moderne smid van 't internet");
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDERSTRAAT'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERSTRAAT', 'Ceresweg');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDERHUISNR'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERHUISNR', '1');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPOSTCODE'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPOSTCODE', '8938 BG');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPLAATS'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPLAATS', 'Leeuwarden');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_AFZENDERLAND'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERLAND', 'Nederland');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_DEPOT'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_DEPOT', '9800');
                $dataArray['KOOPMANORDEREXPORT_KOOPMAN_VERLADER'] = $this->getConfigValue('KOOPMANORDEREXPORT_KOOPMAN_VERLADER', '130268');
                $dataArray['KOOPMANORDEREXPORT_LABELS_FOLDER'] = $this->getConfigValue('KOOPMANORDEREXPORT_LABELS_FOLDER', 'koopman');
                $dataArray['KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER'] = $this->getSelect2SelectedOptions($this->getCarrierConfigValue('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER', '7'), 'carriers');
                $dataArray['KOOPMANORDEREXPORT_SELECT_PICKUP_STATUS'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_PICKUP_STATUS', '25'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SELECT_PICKEDUP_STATUS'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_PICKEDUP_STATUS', '5'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SELECT_ADDEDORDER_CARRIER'] = $this->getSelect2SelectedOptions($this->getCarrierConfigValue('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_CARRIER', '8'), 'carriers');
                $dataArray['KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS', '26'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SHOW_RETOUR'] = $this->getConfigValue('KOOPMANORDEREXPORT_SHOW_RETOUR', 1);
                $dataArray['KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES', '5,24,21,2'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES', '20,14'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', '26,4'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_STATUS_TRANSFERRED'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_STATUS_TRANSFERRED', '5'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_STATUS_DEPOT'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_STATUS_DEPOT', '1'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_STATUS_ON_ROUTE'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_STATUS_ON_ROUTE', '1'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_STATUS_DELIVERED'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_STATUS_DELIVERED', '5'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_STATUS_ON_ROUTE_SECOND'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_STATUS_ON_ROUTE_SECOND', '1'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_STATUS_DELIVERY_FAILED'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_STATUS_DELIVERY_FAILED', '6'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SELECT_PACKAGELANE_1_PROFILE'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_1_PROFILE', ''), 'employees');
                $dataArray['KOOPMANORDEREXPORT_SELECT_PACKAGELANE_2_PROFILE'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_2_PROFILE', ''), 'employees');
                $dataArray['KOOPMANORDEREXPORT_SELECT_PACKAGELANE_3_PROFILE'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_3_PROFILE', ''), 'employees');
                $dataArray['KOOPMANORDEREXPORT_SELECT_WORKSHOP_STATUS'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_WORKSHOP_STATUS', '30'), 'order_states');
                $dataArray['KOOPMANORDEREXPORT_SELECT_WAITING_STOCK_STATUS'] = $this->getSelect2SelectedOptions($this->getConfigValue('KOOPMANORDEREXPORT_SELECT_WAITING_STOCK_STATUS', '9'), 'order_states');
                $dataArray['MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME_SKIPPING_DATES'] = $this->getConfigValue('MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME_SKIPPING_DATES', "'12/25/2023', '01/01/2023'");
                $dataArray['MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME'] = $this->getConfigValue('MSTHEMECONFIG_SELL_CARRIER_PICKUP_TIME', '16:00:00');

                $dataArray['MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_FEATURE'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_FEATURE', null), 'features');
                $dataArray['MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_ENVELOPE'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_ENVELOPE', null), 'feature_values');
                $dataArray['MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_PLAAT'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_PLAAT', null), 'feature_values');
                $dataArray['MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_ONE_METER'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_ONE_METER', null), 'feature_values');
                $dataArray['MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_TWO_METER'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_TWO_METER', null), 'feature_values');

                $dataArray[$this->prefix . 'RETOUR_COST_NL'] = $this->getSelect2SelectedOptions($this->getConfigValue('RETOUR_COST_NL', null), 'products');
                $dataArray[$this->prefix . 'RETOUR_COST_BE'] = $this->getSelect2SelectedOptions($this->getConfigValue('RETOUR_COST_BE', null), 'products');

                break;
            case 'sell':
                $dataArray['MSTHEMECONFIG_DISCOUNT_RULE_FIRST'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_DISCOUNT_RULE_FIRST', 0), 'discounts');
                $dataArray['MSTHEMECONFIG_DISCOUNT_RULE_SECOND'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_DISCOUNT_RULE_SECOND', 0), 'discounts');
                $dataArray['MSTHEMECONFIG_DISCOUNT_RULE_THIRD'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_DISCOUNT_RULE_THIRD', 0), 'discounts');
                $dataArray['MSTHEMECONFIG_NO_DISCOUNT_RULE'] = $this->getSelect2SelectedOptions($this->getConfigValue('MSTHEMECONFIG_NO_DISCOUNT_RULE', 0), 'discounts');
                break;
        }

        return $dataArray;
    }

    /**
     * @param $from
     * @param $to
     *
     * @return array
     *
     * @throws PrestaShopDatabaseException
     */
    private function fetchVatDataFromOrderTable($from, $to)
    {
        if ($from === null) {
            $dtfrom = new DateTime('first day of this month 00:00:00');
            $from = $dtfrom->format('Y-m-d 00:00:00');
        } else {
            $dtfrom = DateTime::createFromFormat('Y-m-d', $from);
            $from = $dtfrom->format('Y-m-d 00:00:00');
        }

        if ($to === null) {
            $dtto = new DateTime('last day of this month 12:59:59');
            $to = $dtto->format('Y-m-d 12:59:59');
        } else {
            $dtto = DateTime::createFromFormat('Y-m-d', $to);
            $to = $dtto->format('Y-m-d 12:59:59');
        }

        $vatData = [
            'from' => $dtfrom->format('Y-m-d'),
            'to' => $dtto->format('Y-m-d'),
            'total_belgium_orders' => 0,
            'total_belgium_order_amount_excl' => 0,
            'total_belgium_order_amount_incl' => 0,
            'total_belgium_vat' => 0,
        ];

        $sqlBelgium = 'SELECT `' . _DB_PREFIX_ . 'orders`.`id_address_delivery`, `' . _DB_PREFIX_ . 'orders`.`id_order`, count(`' . _DB_PREFIX_ . 'orders`.`id_order`) as order_total_be,  SUM(`' . _DB_PREFIX_ . 'orders`.`total_paid_tax_excl`) as total_be_tax_excl, SUM(`' . _DB_PREFIX_ . 'orders`.`total_paid_tax_incl`) as total_be_tax_incl FROM `' . _DB_PREFIX_ . 'orders` LEFT JOIN `' . _DB_PREFIX_ . 'address` ON `' . _DB_PREFIX_ . 'orders`.`id_address_delivery` = `' . _DB_PREFIX_ . 'address`.`id_address`
                WHERE `' . _DB_PREFIX_ . "address`.`id_country` = '3' AND `" . _DB_PREFIX_ . "orders`.`date_add` BETWEEN '" . $from . "' AND '" . $to . "' AND `" . _DB_PREFIX_ . "orders`.`current_state` IN ('4','5','18','21','25','26','38')";

        $resultBE = Db::getInstance()->executeS($sqlBelgium);
        $fmt = numfmt_create('nl_NL', NumberFormatter::CURRENCY);

        if ($resultBE) {
            $vatData['total_belgium_orders'] = (int)$resultBE[0]['order_total_be'];
            $vatData['total_belgium_order_amount_excl'] = numfmt_format_currency($fmt, (float)$resultBE[0]['total_be_tax_excl'], 'EUR');
            $vatData['total_belgium_order_amount_incl'] = numfmt_format_currency($fmt, (float)$resultBE[0]['total_be_tax_incl'], 'EUR');
            $vatData['total_belgium_vat'] = numfmt_format_currency($fmt, (float)$resultBE[0]['total_be_tax_incl'] - (float)$resultBE[0]['total_be_tax_excl'], 'EUR');
        }

        return $vatData;
    }

    /**
     * Get the default option list for select2 inputs
     *
     * @throws PrestaShopDatabaseException
     */
    private function getSelect2SelectedOptions($options, $data_type, $sort = true): string
    {
        // Build a robust list of selected IDs from various storage formats:
        // - JSON array string (e.g. "[1,2,3]")
        // - CSV string (e.g. "1,2,3")
        // - Single scalar (e.g. "5" or 5)
        // - Already an array
        $selectedIds = [];

        if (is_array($options)) {
            $selectedIds = $options;
        } elseif ($options === 0 || $options === '0') {
            // Allow zero as a valid selection (e.g., "Geen pagina")
            $selectedIds = [0];
        } elseif (!empty($options)) {
            $raw = (string)$options;
            $trim = trim($raw);
            // JSON array?
            if ($trim !== '' && ($trim[0] === '[' || $trim[0] === '{')) {
                $decoded = json_decode($trim, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    // If object with ids property is ever used, normalize; else assume array of scalars
                    if (is_array($decoded)) {
                        // Flatten simple arrays
                        $selectedIds = $decoded;
                    }
                }
            }
            // CSV fallback
            if (empty($selectedIds) && strpos($trim, ',') !== false) {
                $selectedIds = array_values(array_filter(array_map('trim', explode(',', $trim)), function ($v) {
                    return $v !== '';
                }));
            }
            // Single scalar fallback
            if (empty($selectedIds) && $trim !== '') {
                $selectedIds = [$trim];
            }
        }

        // Normalize values to int when numeric, keep strings otherwise
        $selectedIds = array_map(function ($v) {
            return (is_numeric($v) && ctype_digit((string)$v)) ? (int)$v : $v;
        }, (array)$selectedIds);

        if ($data_type === 'carriers') {
            $selectedIds = array_values(array_filter(array_map(function ($v) {
                return $this->normalizeCarrierReferenceId($v);
            }, $selectedIds), function ($v) {
                return $v !== null && $v !== '';
            }));
        }

        // Nothing selected → no options to render
        if (empty($selectedIds) && $selectedIds !== [0]) {
            return '';
        }

        $selectedOptionList = [];
        $optionList = $this->getSelect2Data($data_type, $sort, $options)->getContent();
        if ($optionList) {
            $data = json_decode($optionList);
            if ($data && isset($data->results) && is_array($data->results)) {
                foreach ($data->results as $option) {
                    $optId = $option->id;
                    $isMatch = false;
                    // Compare as int or string depending on type
                    foreach ($selectedIds as $sel) {
                        if (is_int($sel)) {
                            $isMatch = ((int)$optId === $sel);
                        } else {
                            $isMatch = ((string)$optId === (string)$sel);
                        }
                        if ($isMatch) {
                            break;
                        }
                    }
                    if ($isMatch) {
                        $selectedOptionList[] = '<option value="' . htmlspecialchars((string)$optId, ENT_QUOTES, 'UTF-8') . '" selected>'
                            . htmlspecialchars((string)$option->text, ENT_QUOTES, 'UTF-8') . '</option>';
                    }
                }
            }
        }

        return implode('', $selectedOptionList);
    }

    /**
     * Ajax data for select2 inputs
     *
     * @param $data_type
     *
     * @return JsonResponse
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getSelect2Data($data_type, $sort = true, $options = null): JsonResponse
    {
        if (Tools::getValue('_type') === 'query') {
            try {
                $req = SymfonyContainer::getInstance()->get('request_stack')->getCurrentRequest();
                if ($req) {
                    $data_type = $req->attributes->get('data_type') ?: $req->get('data_type');
                }
            } catch (Throwable $e) {
                // ignore
            }

            $search = Tools::getValue('q');
        } else {
            $search = Tools::getValue('search');
        }
        if (empty($data_type)) {
            $data_type = Tools::getValue('data_type');
        }

        if ($search === null || $search === '') {
            $search = Tools::getValue('term');
        }
        if ($search === null || $search === '') {
            $search = Tools::getValue('q');
        }
        $search = (string)($search ?? '');

        if (empty($data_type)) {
            $data_type = 'pages';
        }


        if (empty($data_type)) {
            return JsonResponse::fromJsonString(json_encode([]));
        }
        switch ($data_type) {
            case 'pages':
                $pages = CMS::listCms($this->idLang);
                $pagesList = [];
                $pagesList['results'][] = ['id' => 0, 'text' => 'Geen pagina'];
                $pagesList = $this->pageLoop($pages, $pagesList, $search);

                if ($sort) {
                    $list = $this->sortSearchResult($pagesList);
                } else {
                    $list = $pagesList;
                }

                return JsonResponse::fromJsonString(json_encode($list));

            case 'notification_pages':
                $pages = CMS::listCms($this->idLang);
                $pagesList = [];
                $pagesList['results'][] = ['id' => '0',      'text' => 'Geen pagina'];
                $pagesList['results'][] = ['id' => 'home',   'text' => 'Home'];
                $pagesList['results'][] = ['id' => 'product', 'text' => 'Producten'];
                $pagesList['results'][] = ['id' => 'category', 'text' => 'Categorieën & zoekresultaten'];
                $pagesList['results'][] = ['id' => 'cart',   'text' => 'Winkelwagen'];
                $pagesList['results'][] = ['id' => 'module-supercheckout-supercheckout', 'text' => 'Checkout pagina'];
                $pagesList['results'][] = ['id' => 'order-confirmation', 'text' => 'Bestelling bevestiging'];
                $pagesList['results'][] = ['id' => 'my-account', 'text' => 'Mijn account pagina\'s'];
                $pagesList['results'][] = ['id' => 'offer',  'text' => 'Offerte aanvragen'];
                $pagesList['results'][] = ['id' => 'information', 'text' => 'Informatie aanvragen'];
                $pagesList['results'][] = ['id' => 'contactretour', 'text' => 'Retour aanvragen'];
                $pagesList['results'][] = ['id' => 'contact', 'text' => 'Contact formulier'];
                $pagesList['results'][] = ['id' => 'all',    'text' => 'Alle paginas'];

                $pagesList = $this->pageLoop($pages, $pagesList, $search);
                if ($sort) {
                    $list = $this->sortSearchResult($pagesList);
                } else {
                    $list = $pagesList;
                }

                return JsonResponse::fromJsonString(json_encode($list));

            case 'features':
                $features = Feature::getFeatures($this->idLang);
                $featuresList = [];

                foreach ($features as $feature) {
                    $title = $feature['name'];
                    $id = $feature['id_feature'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $featuresList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($featuresList);
                } else {
                    $list = $featuresList;
                }

                return JsonResponse::fromJsonString(json_encode($list));
            case 'attribute_groups':
                $groups = AttributeGroup::getAttributesGroups($this->idLang);
                $groupsList = [];
                foreach ($groups as $group) {
                    $title = $group['name'];
                    $id = $group['id_attribute_group'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $groupsList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($groupsList);
                } else {
                    $list = $groupsList;
                }

                return JsonResponse::fromJsonString(json_encode($list));
            case 'feature_values':
                $collieFeature = $this->getConfigValue('MSTHEMECONFIG_SHIPPING_COLLIE_TYPE_FEATURE', 51);

                $featureValues = FeatureValue::getFeatureValuesWithLang($this->idLang, $collieFeature);
                $featureValuesList = [];
                $featureValuesList['results'] = [];

                foreach ($featureValues as $featureValue) {
                    $title = $featureValue['value'];
                    $id = $featureValue['id_feature_value'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $featureValuesList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($featureValuesList);
                } else {
                    $list = $featureValuesList;
                }

                return JsonResponse::fromJsonString(json_encode($list));

            case 'employees':
                $employees = Employee::getEmployees(true);
                $employeesList = [];

                foreach ($employees as $employee) {
                    $title = $employee['firstname'] . ' ' . $employee['lastname'];
                    $id = $employee['id_employee'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $employeesList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($employeesList);
                } else {
                    $list = $employeesList;
                }

                return JsonResponse::fromJsonString(json_encode($list));

            case 'profiles':
                $profiles = Profile::getProfiles($this->idLang);
                $profilesList = [];

                foreach ($profiles as $profile) {
                    $title = $profile['name'];
                    $id = $profile['id_profile'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $profilesList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($profilesList);
                } else {
                    $list = $profilesList;
                }

                return JsonResponse::fromJsonString(json_encode($list));

            case 'order_states':
                $orderStates = OrderState::getOrderStates($this->idLang);
                $orderStatesList = [];

                foreach ($orderStates as $orderState) {
                    $title = $orderState['name'];
                    $id = $orderState['id_order_state'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $orderStatesList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($orderStatesList);
                } else {
                    $list = $orderStatesList;
                }

                return JsonResponse::fromJsonString(json_encode($list));

            case 'carriers':
                $carriers = Carrier::getCarriers($this->idLang, true);
                $carriersList = [];

                foreach ($carriers as $carrier) {
                    $title = $carrier['name'];
                    $id = $carrier['id_reference'] ?? $carrier['id_carrier'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $carriersList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($carriersList);
                } else {
                    $list = $carriersList;
                }

                return JsonResponse::fromJsonString(json_encode($list));

            case 'categories_home':
                $context = Context::getContext();
                if (count(Category::getCategoriesWithoutParent()) > 1
                    && Configuration::get('PS_MULTISHOP_FEATURE_ACTIVE')
                    && count(Shop::getShops(true, null, true)) !== 1) {
                    $idCategoryRoot = (int) Configuration::get('PS_ROOT_CATEGORY');
                } elseif (!$context->shop->id) {
                    $idCategoryRoot = (new Shop((int) Configuration::get('PS_SHOP_DEFAULT')))->id_category;
                } else {
                    $idCategoryRoot = $context->shop->id_category;
                }

                $rootTreeInfo = Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow(
                    'SELECT c.`nleft`, c.`nright` FROM `' . _DB_PREFIX_ . 'category` c ' .
                    'WHERE c.`id_category` = ' . (int) $idCategoryRoot
                );
                if (empty($rootTreeInfo)) {
                    return JsonResponse::fromJsonString(json_encode(['results' => []]));
                }

                $sql = 'SELECT c.`id_category` AS id, c.`id_parent`, cl.`name` AS name, pl.`name` AS parent_name
                    FROM `' . _DB_PREFIX_ . 'category` c
                    LEFT JOIN `' . _DB_PREFIX_ . 'category_lang` cl
                        ON (c.`id_category` = cl.`id_category` AND cl.`id_lang` = ' . (int) $this->idLang . ' ' . Shop::addSqlRestrictionOnLang('cl') . ')
                    LEFT JOIN `' . _DB_PREFIX_ . 'category_lang` pl
                        ON (c.`id_parent` = pl.`id_category` AND pl.`id_lang` = ' . (int) $this->idLang . ' ' . Shop::addSqlRestrictionOnLang('pl') . ')
                    ' . Shop::addSqlAssociation('category', 'c') . '
                    WHERE cl.`id_lang` = ' . (int) $this->idLang . '
                    AND c.`nleft` >= ' . (int) $rootTreeInfo['nleft'] . '
                    AND c.`nright` <= ' . (int) $rootTreeInfo['nright'] . '
                    AND cl.`name` IS NOT NULL AND TRIM(cl.`name`) <> ""';

                if (!empty($search)) {
                    $searchSql = str_replace(' ', '%', pSQL($search));
                    $sql .= " AND (cl.`name` LIKE '%" . $searchSql . "%' OR pl.`name` LIKE '%" . $searchSql . "%' OR c.`id_category` LIKE '%" . $searchSql . "%')";
                }

                if ($options) {
                    if (is_array($options)) {
                        $ids = $options;
                    } else {
                        $raw = trim((string) $options);
                        $ids = [];
                        if ($raw !== '' && ($raw[0] === '[' || $raw[0] === '{')) {
                            $decoded = json_decode($raw, true);
                            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                                $ids = $decoded;
                            }
                        }
                        if (empty($ids) && strpos($raw, ',') !== false) {
                            $ids = explode(',', $raw);
                        }
                        if (empty($ids) && $raw !== '') {
                            $ids = [$raw];
                        }
                    }
                    $ids = array_values(array_filter(array_map('intval', $ids), function ($v) {
                        return $v > 0;
                    }));
                    if (!empty($ids)) {
                        $sql .= ' AND c.`id_category` IN(' . implode(',', $ids) . ')';
                    }
                }

                $limit = $options ? 200 : 50;
                $sql .= ' GROUP BY c.`id_category`, c.`id_parent`, cl.`name`, pl.`name`';
                $sql .= ' ORDER BY cl.`name` ASC LIMIT 0,' . (int) $limit;

                $rows = Db::getInstance()->executeS($sql);
                $categoriesList = ['results' => []];
                foreach ($rows as $row) {
                    if (empty($row['name'])) {
                        continue;
                    }
                    $title = $row['name'];
                    if (!empty($row['parent_name'])) {
                        $title = $row['parent_name'] . ' - ' . $row['name'];
                    }
                    $categoriesList['results'][] = [
                        'id' => (int) $row['id'],
                        'text' => $title,
                    ];
                }

                if ($sort) {
                    $categoriesList = $this->sortSearchResult($categoriesList);
                }

                return JsonResponse::fromJsonString(json_encode($categoriesList));

    case
        'customer':
                $customerList = [];
                $searchArray = explode(' ', $search);
                $likeList = '';
                if (is_array($searchArray)) {
                    foreach ($searchArray as $index => $searchValue) {
                        if ($index != 0) {
                            $likeList .= 'OR ';
                        }
                        $likeList .= "firstname LIKE '%" . $searchValue . "%' OR lastname LIKE '%" . $searchValue . "%' OR email LIKE '%" . $searchValue . "%' ";
                    }
                } else {
                    $likeList = "firstname LIKE '%" . $search . "%' OR lastname LIKE '%" . $search . "%' OR email LIKE '%" . $search . "%'";
                }

                $sql = "SELECT id_customer AS id, CONCAT(firstname, ' ', lastname,' - ', email) AS text FROM `" . _DB_PREFIX_ . 'customer`';
                if (!empty($search)) {
                    $sql .= ' WHERE ' . $likeList . ' AND';
                } else {
                    $sql .= ' WHERE';
                }

                if ($options) {
                    if (is_array($options)) {
                        $sql .= ' `id_customer` IN(' . implode(',', $options) . ') AND ';
                    } else {
                        $sql .= ' `id_customer` IN(' . implode(',', json_decode($options)) . ') AND ';
                    }
                }

                $sql .= " `active` = '1' ORDER BY `text` LIMIT 0,10";

                $customerList['results'] = Db::getInstance()->executeS($sql);

                return JsonResponse::fromJsonString(json_encode($customerList));
            case 'addresses':
                $addressList = [];
                $searchArray = explode(' ', $search);
                $likeList = '';
                if (is_array($searchArray)) {
                    foreach ($searchArray as $index => $searchValue) {
                        if ($index != 0) {
                            $likeList .= 'OR ';
                        }
                        $likeList .= "firstname LIKE '%" . $searchValue . "%' OR
                                        alias LIKE '%" . $searchValue . "%' OR
                                        lastname LIKE '%" . $searchValue . "%' OR
                                        address1 LIKE '%" . $searchValue . "%' OR
                                        address2 LIKE '%" . $searchValue . "%' OR
                                        house_number LIKE '%" . $searchValue . "%' OR
                                        house_number_extension LIKE '%" . $searchValue . "%' OR
                                        postcode LIKE '%" . $searchValue . "%' OR
                                        city LIKE '%" . $searchValue . "%' OR
                                        other LIKE '%" . $searchValue . "%' OR
                                        phone LIKE '%" . $searchValue . "%' OR
                                        phone_mobile LIKE '%" . $searchValue . "%' OR
                                        vat_number LIKE '%" . $searchValue . "%'";
                    }
                } else {
                    $likeList = "firstname LIKE '%" . $search . "%' OR
                                        alias LIKE '%" . $search . "%' OR
                                        lastname LIKE '%" . $search . "%' OR
                                        address1 LIKE '%" . $search . "%' OR
                                        address2 LIKE '%" . $search . "%' OR
                                        house_number LIKE '%" . $search . "%' OR
                                        house_number_extension LIKE '%" . $search . "%' OR
                                        postcode LIKE '%" . $search . "%' OR
                                        city LIKE '%" . $search . "%' OR
                                        other LIKE '%" . $search . "%' OR
                                        phone LIKE '%" . $search . "%' OR
                                        phone_mobile LIKE '%" . $search . "%' OR
                                        vat_number LIKE '%" . $search . "%'";
                }

                $sql = "SELECT id_address AS id, CONCAT(alias,': ', firstname, ' ', lastname,' - ', address1, ' ', house_number, house_number_extension,' ', postcode, ' ', city) AS text FROM `" . _DB_PREFIX_ . 'address`';
                if (!empty($search)) {
                    $sql .= ' WHERE ' . $likeList . ' AND';
                } else {
                    $sql .= ' WHERE';
                }

                if ($options) {
                    if (is_array($options)) {
                        $sql .= ' `id_address` = IN(' . implode(',', $options) . ') AND ';
                    } else {
                        $sql .= ' `id_address` = ' . $options . ' AND ';
                    }
                }

                $sql .= " `active` = '1' ORDER BY `lastname` LIMIT 0,10";

                $addressList['results'] = Db::getInstance()->executeS($sql);

                return JsonResponse::fromJsonString(json_encode($addressList));
            case 'groups':
                $groups = Group::getGroups($this->idLang, $this->idShop);
                $groupsList = [];

                foreach ($groups as $group) {
                    $title = $group['name'];
                    $id = $group['id_group'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $groupsList['results'][] = ['id' => $id, 'text' => $title];
                }
                if ($sort) {
                    $list = $this->sortSearchResult($groupsList);
                } else {
                    $list = $groupsList;
                }

                return JsonResponse::fromJsonString(json_encode($list));
            case 'discounts':
                $cartRules = new PrestaShopCollection('CartRule', 1);
                $cartRules->where('active', '=', 1);
                $cartRules->orderBy('date_upd', 'desc');
                $cartRulesList = [];
                $cartRulesList['results'][] = ['id' => 0, 'text' => 'Geen korting regel'];
                foreach ($cartRules as $cartRule) {
                    $title = $cartRule->name . '   (' . $cartRule->date_from . '-' . $cartRule->date_to . ')';
                    $id = $cartRule->id;
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $cartRulesList['results'][] = ['id' => $id, 'text' => $title];
                }
                $list = $cartRulesList;

                return JsonResponse::fromJsonString(json_encode($list));
            case 'products':
                $productList = [];
                $sql = 'SELECT p.id_product AS id, MAX(pl.name) AS name, p.reference
                    FROM `' . _DB_PREFIX_ . 'product` p
                    LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl
                        ON (p.id_product = pl.id_product AND pl.id_lang = ' . (int)$this->idLang . ')
                    WHERE pl.name IS NOT NULL AND TRIM(pl.name) <> "" AND LOWER(pl.name) NOT LIKE "%offer%"';

                if (!empty($search)) {
                    $searchSql = str_replace(' ', '%', pSQL($search));
                    $sql .= " AND (pl.name LIKE '%" . $searchSql . "%' OR p.reference LIKE '%" . $searchSql . "%' OR p.id_product LIKE '%" . $searchSql . "%')";
                }

                if ($options) {
                    if (is_array($options)) {
                        $ids = $options;
                    } else {
                        $raw = trim((string)$options);
                        $ids = [];
                        if ($raw !== '' && ($raw[0] === '[' || $raw[0] === '{')) {
                            $decoded = json_decode($raw, true);
                            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                                $ids = $decoded;
                            }
                        }
                        if (empty($ids) && strpos($raw, ',') !== false) {
                            $ids = explode(',', $raw);
                        }
                        if (empty($ids) && $raw !== '') {
                            $ids = [$raw];
                        }
                    }
                    $ids = array_values(array_filter(array_map('intval', $ids), function ($v) {
                        return $v > 0;
                    }));
                    if (!empty($ids)) {
                        $sql .= ' AND p.id_product IN(' . implode(',', $ids) . ')';
                    }
                }

                $limit = $options ? 200 : 50;
                $sql .= ' GROUP BY p.id_product, p.reference';
                $sql .= ' ORDER BY name ASC LIMIT 0,' . (int)$limit;

                $rows = Db::getInstance()->executeS($sql);
                $productList['results'] = [];
                foreach ($rows as $row) {
                    if (!empty($row['name'])) {
                        $label = (int)$row['id'] . ' - ' . $row['name'];
                        if (!empty($row['reference'])) {
                            $label .= ' (' . $row['reference'] . ')';
                        }
                        $productList['results'][] = [
                            'id' => (int)$row['id'],
                            'text' => $label,
                        ];
                    }
                }

                if ($sort) {
                    $productList = $this->sortSearchResult($productList);
                }

                return JsonResponse::fromJsonString(json_encode($productList));
            case 'payment_modules':
                $installedModules = PaymentModule::getInstalledPaymentModules();
                $paymentList = ['results' => []];
                foreach ($installedModules as $installedModule) {
                    $module = Module::getInstanceByName($installedModule['name']);
                    if (!$module || !Validate::isLoadedObject($module)) {
                        continue;
                    }
                    $title = $module->displayName ?: $installedModule['name'];
                    $id = $installedModule['name'];
                    if (!empty($search)) {
                        if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                            continue;
                        }
                    }
                    $paymentList['results'][] = ['id' => $id, 'text' => $title];
                }

                return JsonResponse::fromJsonString(json_encode($paymentList));
        }

return JsonResponse::fromJsonString(json_encode([]));
}

/**
 * Loop through all pages and generate list for select2 box
 *
 * @param $pages
 * @param array $pagesList
 * @param string $search
 *
 * @return array
 */
private
function pageLoop($pages, array $pagesList = [], string $search = ''): array
{
    foreach ($pages as $page) {
        $title = $page['meta_title'];
        $id = $page['id_cms'];
        if (!empty($search)) {
            if (!preg_match('(' . strtolower($search) . ')', strtolower($title))) {
                continue;
            }
        }
        $pagesList['results'][] = ['id' => $id, 'text' => $title];
    }

    return $pagesList;
}

/**
 * @param bool $enabled
 *
 * @return Response
 */
public
function putMailthemeSymlink($enabled = false): Response
{
    try {
        $mailTheme = new MailTheme();
        if ($enabled === 'true') {
            $mailTheme->makeThemeSymlink();

            return Response::create('Mail theme created a symlink!', 200);
        } else {
            $mailTheme->removeThemeSymlink();

            return Response::create('Mail theme removed the symlink!', 200);
        }
    } catch (Exception $e) {
        return Response::create('Mail theme failed creation of the symlink: ' . $e->getMessage(), 200);
    }
}

/**
 * Sort the search result alphabetical
 *
 * @param $searchArray
 *
 * @return array
 */
private
function sortSearchResult($searchArray): array
{
    if (!empty($searchArray)) {
        $tempArray = (array)$searchArray['results'];
        $textColumn = array_column($tempArray, 'text');
        if (array_multisort($textColumn, SORT_NATURAL | SORT_FLAG_CASE, $tempArray)) {
            $searchArray['results'] = $tempArray;
        }
    } else {
        $searchArray['result'] = [];
    }

    return $searchArray;
}
}
