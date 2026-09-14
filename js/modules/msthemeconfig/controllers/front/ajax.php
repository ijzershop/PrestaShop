<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

require_once _PS_CORE_DIR_ . '/config/config.inc.php';
require_once _PS_CORE_DIR_ . '/init.php';

use MsThemeConfig\Class\ExportOrdersMultipleCollies;
use MsThemeConfig\Service\WorkshopDeliverySlipFile;
use PrestaShop\PrestaShop\Core\Domain\Product\Pack\ValueObject\PackStockType;

class msthemeconfigAjaxModuleFrontController extends ModuleFrontController
{
    /** @var SawController */
    private $sawController;
    /** @var CutController */
    private $cutController;
    /** @var StaffelController */
    private $staffelController;

    private string $apiPath;
    private string $token;
    public $soapoptions;
    /**
     * @var false|mixed
     */
    private mixed $action;
    /**
     * Legacy sawandcutmodule method parameter.
     *
     * @var false|mixed
     */
    private mixed $method;

    public function __construct()
    {
        parent::__construct();
        $this->token = 'JNtOUInXJD27nRgH';
        $this->apiPath = 'https://api.pro6pp.nl/v2/autocomplete';
        $this->soapoptions = [
            'stream_context' => stream_context_create(
                [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ],
                ]
            ),
        ];

        $this->action = Tools::getValue('action');
        $this->method = Tools::getValue('method');

        // Load admin employee session for back-office related actions
        if (!($this->context->employee instanceof Employee) || !$this->context->employee->id) {
            $cookie = new Cookie('psAdmin');
            if ($cookie->id_employee) {
                $this->context->employee = new Employee((int) $cookie->id_employee);
                $this->context->cookie = $cookie;
            }
        }

        // Load admin employee session for backup operations
        if (in_array($this->action, ['StartExport', 'StartImport', 'Tail'])) {
        }

        // Prefer local integrated Saw & Cut controllers under msthemeconfig; fallback to legacy module if missing
        if (!in_array($this->action, ['StartExport', 'StartImport', 'Tail'])) {
            $localControllers = _PS_MODULE_DIR_ . 'msthemeconfig/controllers/';
            if (file_exists($localControllers . 'SawController.php')) {
                require_once $localControllers . 'SawConfigurationController.php';
                require_once $localControllers . 'SawController.php';
                require_once $localControllers . 'CutController.php';
                require_once $localControllers . 'StaffelController.php';
                $this->sawController = new SawController();
                $this->cutController = new CutController();
                $this->staffelController = new StaffelController();
            } else {
                $legacyControllers = _PS_MODULE_DIR_ . 'msthemeconfig/legacy_sawcut/';
                if (file_exists($legacyControllers . 'SawController.php')) {
                    require_once $legacyControllers . 'SawConfigurationController.php';
                    require_once $legacyControllers . 'SawController.php';
                    require_once $legacyControllers . 'CutController.php';
                    require_once $legacyControllers . 'StaffelController.php';
                    $this->sawController = new SawController();
                    $this->cutController = new CutController();
                    $this->staffelController = new StaffelController();
                } else {
                    $sawModuleControllers = _PS_MODULE_DIR_ . 'sawandcutmodule/controllers/';
                    if (file_exists($sawModuleControllers . 'SawController.php')) {
                        require_once $sawModuleControllers . 'SawConfigurationController.php';
                        require_once $sawModuleControllers . 'SawController.php';
                        require_once $sawModuleControllers . 'CutController.php';
                        require_once $sawModuleControllers . 'StaffelController.php';
                        $this->sawController = new SawController();
                        $this->cutController = new CutController();
                        $this->staffelController = new StaffelController();
                    }
                }
            }
        }
    }

    /**
     * @throws PrestaShopException
     */
    public function initContent()
    {
        $this->ajax = true;
        parent::init();
        //        parent::initContent();

        // Legacy compatibility using ?method=...
        if (empty($this->action) && !empty($this->method)) {
            $legacyMap = [
                'getmodal' => 'sawForm',
                'getcutmodal' => 'cutForm',
                'getstaffelmodal' => 'staffelForm',
                'addtocart' => 'addtocart',
                'addcuttedtocart' => 'addcuttedtocart',
                'addstaffeltocart' => 'addstaffeltocart',
                'calculate' => 'calculate',
                'calculatecutted' => 'calculatecutted',
                'calculatestaffel' => 'calculatestaffel',
                'delivery_message' => 'delivery_message',
                'save_delivery_message' => 'save_delivery_message',
                'orderstatus' => 'orderstatus',
                'orderlabelstatus' => 'orderlabelstatus',
                'orderretourinit' => 'orderretourinit',
                'orderretoursubmit' => 'orderretoursubmit',
                'afhalen' => 'afTeHalen',
                'afgehaald' => 'afgehaald',
                'toegevoegd' => 'toegevoegd',
                'beingprepared_status' => 'beingprepared_status',
                'workshop_status' => 'workshop_status',
                'backorder_status' => 'backorder_status',
                'print-label' => 'printedLabel',
                'dag-afsluiting' => 'dayClosing',
                'set-viewed-be-vat-msg' => 'setViewedBeVatMsg',
                'set-viewed-geo-shipping-msg' => 'setViewedGeoShippingMsg',
            ];
            if (array_key_exists($this->method, $legacyMap)) {
                $this->action = $legacyMap[$this->method];
            }
        }

        try {
            switch ($this->action) {
                case 'sawForm':
                    $this->renderSawForm();
                    break;
                case 'cutForm':
                    $this->renderCutForm();
                    break;
                case 'staffelForm':
                    $this->renderStaffelForm();
                    break;
                case 'addtocart':
                    $this->proxySawAddToCart();
                    break;
                case 'addcuttedtocart':
                    $this->proxyCutAddToCart();
                    break;
                    // Legacy method names mapped in place to keep old JS working
                case 'calculatecutted':
                    $this->proxyCutCalculate();
                    break;
                case 'calculatestaffel':
                    $this->proxyStaffelCalculate();
                    break;
                case 'addstaffeltocart':
                    $this->proxyStaffelAddToCart();
                    break;
                case 'calculate':
                    $this->proxySawCalculate();
                    break;
                case 'calculatecutted':
                    $this->proxyCutCalculate();
                    break;
                case 'calculatestaffel':
                    $this->proxyStaffelCalculate();
                    break;
                case 'set_vat_visibility':
                    $this->setVatVisibility();
                    break;
                case 'sendCustomerInfoToAdministration':
                    $this->sendCustomerInfoToAdministration();
                    break;
                case 'sendAiContext':
                    $this->sendAiContext();
                    break;
                case 'check_for_existing_email_address':
                    $this->checkForExistingEmailAddress(Tools::getValue('email'));
                    break;
                case 'add_custom_product_to_cart':
                    $this->addCustomProductToCart();
                    break;
                case 'remove_custom_product_to_cart':
                    $this->removeCustomProductToCart();
                    break;
                case 'print_shoppingcart_by_employee':
                    $this->generatePdfOfShoppingCartByEmployee();
                    break;
                case 'remove_gdpr':
                    $this->setPsGdprCustomerToRemove();
                    break;
                case 'upload_files':
                    $this->uploadPastedFilesEditor();
                    break;
                case 'search_customer':
                    $this->searchCustomer();
                    break;
                case 'add_data_to_google_check_csv':
                    $this->addGoogleDataToCsvForTesting();
                    break;
                case 'resendOrderMessage':
                    $this->resendOrderMessage();
                    break;
                case 'migrateOrderToCustomer':
                    $this->migrateOrderToCustomer();
                    break;
                case 'regenerateMails':
                    $this->regenerateMails();
                    break;
                case 'setDesiredDeliveryDate':
                    $this->setDesiredDeliveryDate();
                    break;
                case 'addReturnCostToOrder':
                    $this->addReturnCostToOrder();
                    break;
                case 'delivery_message':
                    $this->getDeliverySlipMessage((int) Tools::getValue('id'));
                    break;
                case 'save_delivery_message':
                    $this->updateDeliverySlipMessage();
                    break;
                case 'orderstatus':
                    $this->getKoopmanOrderStatus();
                    break;
                case 'orderlabelstatus':
                    $this->getKoopmanOrderLabelStatus();
                    break;
                case 'orderretourinit':
                    $this->getKoopmanInitRetour();
                    break;
                case 'orderretoursubmit':
                    $this->getKoopmanSubmitRetour();
                    break;
                case 'afTeHalen':
                    $this->getKoopmanAfTeHalen();
                    break;
                case 'afgehaald':
                    $this->getKoopmanAfgehaald();
                    break;
                case 'toegevoegd':
                    $this->getKoopmanToegevoegd();
                    break;
                case 'beingprepared_status':
                    $this->getKoopmanBeingPreparedStatus();
                    break;
                case 'workshop_status':
                    $this->getKoopmanWorkShopStatus();
                    break;
                case 'backorder_status':
                    $this->getKoopmanBackOrderStatus();
                    break;
                case 'printedLabel':
                    $this->getKoopmanPrintedLabel();
                    break;
                case 'dayClosing':
                    $this->runKoopmanDayClosing();
                    break;
                case 'setViewedBeVatMsg':
                    $cookie = $this->context->cookie;
                    if ($cookie instanceof Cookie && (int) $cookie->id_employee > 0 && (int) $cookie->id_customer === 0) {
                        $cookie = $this->getFrontOfficeCookie();
                    }
                    $cookie->__set('accepted_vat_be', true);
                    $cookie->write();

                    die(json_encode(['success' => true]));
                case 'setViewedGeoShippingMsg':
                    $cookie = $this->context->cookie;
                    if ($cookie instanceof Cookie && (int) $cookie->id_employee > 0 && (int) $cookie->id_customer === 0) {
                        $cookie = $this->getFrontOfficeCookie();
                    }
                    $cookie->__set('accepted_shipping_msg', true);
                    $cookie->write();

                    die(json_encode(['success' => true]));
                case 'fetch_products_for_retour':
                    $this->fetchProductsForRetourForm(Tools::getValue('id_order'), Tools::getValue('postalcode'));
                    break;
                case 'pro6pp_lookup':
                    $this->pro6ppLookup();
                    break;
                case 'remove_default_discount_cart_rule_counter_access':
                    $this->removeDefaultCartDiscountRuleCounterAccess();
                    break;
                case 'StartExport':
                    $this->startExport();
                    break;
                case 'StartImport':
                    $this->startImport();
                    break;
                case 'Tail':
                    $this->tailLog();
                    break;
                default:
                    die(json_encode(['error' => 'unknown action']));
            }
        } catch (Exception $e) {
            die(json_encode(['error' => $e->getMessage()]));
        }
    }

    private function ensureSawModuleControllers(): void
    {
        if (!$this->sawController || !$this->cutController || !$this->staffelController) {
            throw new Exception('Saw & Cut module controllers not available');
        }
    }

    private function renderSawForm(): void
    {
        $this->ensureSawModuleControllers();
        $idProduct = (int) Tools::getValue('id_product');
        if (!$idProduct) {
            $idProduct = (int) Tools::getValue('product');
        }
        $product = new Product($idProduct, false, $this->context->language->id, $this->context->shop->id);
        $params = $this->sawController->getModalParameters($product);
        $params['showAddToCartButton'] = $this->canShowAddToCartButton();
        $params = array_merge($params, $this->getSawCutInfoPages());
        $params = array_merge($params, $this->getAiFrontendParams());
        $params['has_specific_prices'] = !empty(SpecificPrice::getByProductId((int) $product->id));
        $params = $this->addPriceParams($params, false);
        if (!empty($params['cuts']) && is_array($params['cuts'])) {
            foreach ($params['cuts'] as $key => $cut) {
                $cutPrice = isset($cut['price']) ? (float) $cut['price'] : 0.0;
                $cutPriceConverted = Tools::convertPrice($cutPrice);
                $params['cuts'][$key]['price_formatted'] = $this->formatPriceForDisplay((float) $cutPriceConverted);
                $params['cuts'][$key]['price_converted'] = $this->formatPriceNumber((float) $cutPriceConverted);
            }
        }
        $this->context->smarty->assign($params);
        // Use integrated template from msthemeconfig, fallback to legacy module if missing
        $path = _PS_MODULE_DIR_ . 'msthemeconfig/views/templates/front/saw-form.tpl';
        if (!file_exists($path)) {
            $path = _PS_MODULE_DIR_ . 'sawandcutmodule/views/templates/front/saw-form.tpl';
        }
        echo $this->context->smarty->fetch($path);
        exit;
    }

    private function renderCutForm(): void
    {
        $this->ensureSawModuleControllers();
        $idProduct = (int) Tools::getValue('id_product');
        if (!$idProduct) {
            $idProduct = (int) Tools::getValue('product');
        }
        $product = new Product($idProduct, false, $this->context->language->id, $this->context->shop->id);
        $params = $this->cutController->getModalParameters($product);
        $params['showAddToCartButton'] = $this->canShowAddToCartButton();
        $params = array_merge($params, $this->getSawCutInfoPages(true));
        $params = array_merge($params, $this->getCutCombinationParams($product));
        $params = array_merge($params, $this->getAiFrontendParams());
        $params['has_specific_prices'] = !empty(SpecificPrice::getByProductId((int) $product->id));
        $params = $this->addPriceParams($params, true);
        $this->context->smarty->assign($params);
        $useSingle = !empty($params['singleCutEnabled']) && !Tools::getIsset('extended');
        $template = $useSingle ? 'single-cut-form.tpl' : 'cut-form.tpl';
        $path = _PS_MODULE_DIR_ . 'msthemeconfig/views/templates/front/' . $template;
        if (!file_exists($path)) {
            $path = _PS_MODULE_DIR_ . 'sawandcutmodule/views/templates/front/' . $template;
        }
        echo $this->context->smarty->fetch($path);
        exit;
    }

    private function renderStaffelForm(): void
    {
        $this->ensureSawModuleControllers();
        $idProduct = (int) Tools::getValue('id_product');
        if (!$idProduct) {
            $idProduct = (int) Tools::getValue('product');
        }
        $product = new Product($idProduct, false, $this->context->language->id, $this->context->shop->id);
        $specificPrices = SpecificPrice::getByProductId((int) $product->id);
        $params = [
            'product' => $product,
            'specific_prices' => $specificPrices,
            'has_specific_prices' => !empty($specificPrices),
            'price_excl' => $product->getPrice(false),
            'price_incl' => $product->getPrice(true),
            'language' => $this->context->language->id,
            'offer_page' => $this->getSawCutConfigValue('id_cms_offerpage'),
        ];
        $this->context->smarty->assign($params);
        $path = _PS_MODULE_DIR_ . 'msthemeconfig/views/templates/front/staffel-form.tpl';
        if (!file_exists($path)) {
            $path = _PS_MODULE_DIR_ . 'sawandcutmodule/views/templates/front/staffel-form.tpl';
        }
        echo $this->context->smarty->fetch($path);
        exit;
    }

    private function proxySawAddToCart(): void
    {
        $this->ensureSawModuleControllers();
        $json = $this->sawController->ajaxRequest(true);
        $data = json_decode($json, true);
        if (is_array($data)) {
            $data['status'] = 'OK';
            die(json_encode($data));
        }
        die($json);
    }

    private function proxyCutAddToCart(): void
    {
        $this->ensureSawModuleControllers();
        $json = $this->cutController->ajaxRequest(true);
        $data = json_decode($json, true);
        if (is_array($data)) {
            $data['status'] = 'OK';
            die(json_encode($data));
        }
        die($json);
    }

    private function proxyStaffelAddToCart(): void
    {
        $this->ensureSawModuleControllers();
        $json = $this->staffelController->ajaxRequest(true);
        $data = json_decode($json, true);
        if (is_array($data)) {
            $data['status'] = 'OK';
            die(json_encode($data));
        }
        die($json);
    }

    private function proxySawCalculate(): void
    {
        $this->ensureSawModuleControllers();
        die($this->sawController->ajaxRequest(false));
    }

    private function proxyCutCalculate(): void
    {
        $this->ensureSawModuleControllers();
        die($this->cutController->ajaxRequest(false));
    }

    private function proxyStaffelCalculate(): void
    {
        $this->ensureSawModuleControllers();
        die($this->staffelController->ajaxRequest(false));
    }

    private function regenerateMails()
    {
        if (!($this->context->employee instanceof Employee) || !$this->context->employee->id) {
            header('Content-Type: application/json');
            die(json_encode(['success' => false, 'message' => 'Forbidden']));
        }

        $command = 'php bin/console prestashop:mail:generate modernesmid nl -o 1';
        $output = [];
        $return_var = 0;

        // Change directory to PrestaShop root
        $rootDir = _PS_ROOT_DIR_;
        chdir($rootDir);

        exec($command . ' 2>&1', $output, $return_var);

        header('Content-Type: application/json');
        if ($return_var === 0) {
            die(json_encode(['success' => true, 'output' => $output]));
        } else {
            die(json_encode(['success' => false, 'message' => 'Command failed', 'output' => $output]));
        }
    }

    private function setVatVisibility()
    {
        $vat = Tools::getValue('incl_vat');
        $vatValue = ($vat === true || $vat === 1 || $vat === '1' || $vat === 'true') ? 'true' : 'false';
        try {
            $cookie = $this->context->cookie;
            if ($cookie instanceof Cookie && (int) $cookie->id_employee > 0 && (int) $cookie->id_customer === 0) {
                // If context cookie is admin (psAdmin), write the VAT setting to the front-office cookie instead.
                $cookie = $this->getFrontOfficeCookie();
            }
            // Set new value for price_vat_settings_incl
            $cookie->__set('price_vat_settings_incl', $vatValue);
            // Persist cookie
            $cookie->write();
            // Clear cache
            Tools::clearCache();

            return die(json_encode(['msg' => 'Vat preference is set to ' . $vatValue, 'success' => true, 'incl_vat' => $vatValue]));
        } catch (Exception $exception) {
            return die(json_encode(['msg' => $exception->getMessage(), 'success' => false, 'incl_vat' => $vatValue]));
        }
    }

    private function getFrontOfficeCookie(): Cookie
    {
        $cookieLifetime = (int) Configuration::get('PS_COOKIE_LIFETIME_FO');
        if ($cookieLifetime > 0) {
            $cookieLifetime = time() + (max($cookieLifetime, 1) * 3600);
        }
        $forceSsl = (bool) Configuration::get('PS_SSL_ENABLED');
        $domains = null;

        if ($this->context->shop->getGroup()->share_order) {
            return new Cookie(
                'ps-sg' . $this->context->shop->getGroup()->id,
                '',
                $cookieLifetime,
                $this->context->shop->getUrlsSharedCart(),
                false,
                $forceSsl
            );
        }

        if ($this->context->shop->domain != $this->context->shop->domain_ssl) {
            $domains = [$this->context->shop->domain_ssl, $this->context->shop->domain];
        }

        return new Cookie(
            'ps-s' . $this->context->shop->id,
            '',
            $cookieLifetime,
            $domains,
            false,
            $forceSsl
        );
    }

    private function getSawCutConfigValue(string $key, $default = null)
    {
        $cfg = SawConfigurationController::getInstance()->getConfiguration();

        return array_key_exists($key, $cfg) ? $cfg[$key] : $default;
    }

    private function getAiFrontendParams(): array
    {
        $idLang = (int) $this->context->language->id;
        $idShopGroup = (int) $this->context->shop->id_shop_group;
        $idShop = (int) $this->context->shop->id;

        return [
            'ai_frontend_enabled' => (int) Configuration::get('MSTHEMECONFIG_AI_FRONTEND_ENABLED', $idLang, $idShopGroup, $idShop, 0),
            'ai_context_search' => (string) Configuration::get('MSTHEMECONFIG_AI_CONTEXT_SEARCH', $idLang, $idShopGroup, $idShop, ''),
            'ai_context_plate_cuts' => (string) Configuration::get('MSTHEMECONFIG_AI_CONTEXT_PLATE_CUTS', $idLang, $idShopGroup, $idShop, ''),
            'ai_context_saw_cuts' => (string) Configuration::get('MSTHEMECONFIG_AI_CONTEXT_SAW_CUTS', $idLang, $idShopGroup, $idShop, ''),
        ];
    }

    private function getSawCutInfoPages(bool $forCut = false): array
    {
        $config = SawConfigurationController::getInstance();
        try {
            $infoPageId = $forCut ? $config->getValue('id_cms_cutinfo_page') : $config->getValue('id_cms_sawinfo_page');
            $infoPage = (new Link())->getCMSLink(new CMS($infoPageId));
        } catch (Exception $exception) {
            $infoPage = '#';
        }
        try {
            $offerPage = $config->getValue('id_cms_offerpage');
        } catch (Exception $exception) {
            $offerPage = '#';
        }

        return [
            'info_page' => $infoPage,
            'offer_page' => $offerPage,
        ];
    }

    private function getCutCombinationParams(Product $product): array
    {
        $cutAttributeId = (int) $this->getSawCutConfigValue('id_attribute_group_cut', 0);
        $productAttributes = Product::getAttributesInformationsByProduct((int) $product->id);

        $maxCuts = 0;
        $combiPrices = [];
        foreach ($productAttributes as $attribute) {
            $combination = $product->getAttributeCombinationsById(
                $attribute['id_attribute'],
                $this->context->cookie->id_lang,
                false
            );

            if (!empty($combination)) {
                if ((int) $attribute['id_attribute_group'] === $cutAttributeId) {
                    $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                    ++$maxCuts;
                }
            }
        }
        asort($combiPrices);

        return [
            'combiPrices' => json_encode($combiPrices),
            'maxCuts' => $maxCuts - 1,
            'singleCutEnabled' => (bool) $this->getSawCutConfigValue('single_cut_form_enabled', 0),
        ];
    }

    private function addPriceParams(array $params, bool $includeTax): array
    {
        $priceExclConverted = Tools::convertPrice((float) ($params['price_excl'] ?? 0));
        $priceInclConverted = Tools::convertPrice((float) ($params['price_incl'] ?? 0));
        $params['price_excl_converted'] = $this->formatPriceNumber((float) $priceExclConverted);
        $params['price_incl_converted'] = $this->formatPriceNumber((float) $priceInclConverted);
        $params['price_excl_formatted'] = $this->formatPriceForDisplay((float) $priceExclConverted);
        $params['price_incl_formatted'] = $this->formatPriceForDisplay((float) $priceInclConverted);
        $params['zero_price_formatted'] = $this->formatPriceForDisplay((float) Tools::convertPrice(0));
        $params['price_excl_formatted_plain'] = number_format((float) $priceExclConverted, 2, ',', '.');
        $params['price_incl_formatted_plain'] = number_format((float) $priceInclConverted, 2, ',', '.');
        $params['zero_price_formatted_plain'] = number_format((float) Tools::convertPrice(0), 2, ',', '.');
        $params['zero_price_simple'] = '0';
        if ($includeTax && array_key_exists('tax', $params)) {
            $taxConverted = Tools::convertPrice((float) $params['tax']);
            $params['tax_formatted'] = $this->formatPriceForDisplay((float) $taxConverted);
            $params['tax_formatted_plain'] = number_format((float) $taxConverted, 2, ',', '.');
        }

        return $params;
    }

    private function formatPriceForDisplay(float $price): string
    {
        $iso = $this->context->currency ? $this->context->currency->iso_code : 'EUR';
        try {
            return $this->context->currentLocale->formatPrice($price, $iso);
        } catch (Throwable $exception) {
            return number_format($price, 2, ',', '.');
        }
    }

    private function formatPriceNumber(float $price): string
    {
        return number_format($price, 2, '.', '');
    }

    private function canShowAddToCartButton(): bool
    {
        try {
            if ((bool) Configuration::get('PS_CATALOG_MODE')) {
                return false;
            }
            if ((bool) Context::getContext()->cookie->is_restricted_country) {
                return false;
            }
            if (!Configuration::showPrices()) {
                return false;
            }
        } catch (Exception $exception) {
            return true;
        }

        return true;
    }

    /**
     * Verify SuperAdmin access for catalog backup operations
     */
    private function verifySuperAdmin(): void
    {
        if (!$this->context->employee || !$this->context->employee->id || !$this->context->employee->isSuperAdmin()) {
            die(json_encode(['ok' => false, 'error' => 'Access denied. SuperAdmin only.']));
        }
    }

    private function sendAiContext(): void
    {
        $context = trim((string) Tools::getValue('context', ''));
        $contextType = trim((string) Tools::getValue('context_type', ''));
        $productId = (int) Tools::getValue('product_id', 0);

        if ($context === '') {
            die(json_encode(['ok' => false, 'error' => 'Context is verplicht.']));
        }
        if (!in_array($contextType, ['saw', 'plate'], true)) {
            die(json_encode(['ok' => false, 'error' => 'Onbekend context type.']));
        }

        $cookieKey = $contextType === 'saw' ? 'ai_context_saw_cuts' : 'ai_context_plate_cuts';
        $this->context->cookie->{$cookieKey} = str_replace(['|', '¤'], ' ', $context);
        $this->context->cookie->ai_context_product_id = (string) $productId;
        $this->context->cookie->ai_context_updated_at = (string) time();
        $this->context->cookie->write();

        die(json_encode([
            'ok' => true,
            'message' => 'Context opgeslagen.',
            'context_type' => $contextType,
            'product_id' => $productId,
        ]));
    }

    /**
     * Start catalog export
     */
    private function startExport(): void
    {
        $this->verifySuperAdmin();

        $scriptsDir = _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'external' . DIRECTORY_SEPARATOR . 'modernesmid_webshop' . DIRECTORY_SEPARATOR . 'scripts';
        $dataDir = $scriptsDir . DIRECTORY_SEPARATOR . 'data';

        if (!is_dir($dataDir)) {
            @mkdir($dataDir, 0777, true);
        }

        $logsDir = $dataDir . DIRECTORY_SEPARATOR . 'logs';
        if (!is_dir($logsDir)) {
            @mkdir($logsDir, 0777, true);
        }

        $ts = date('YmdHis');
        $json = $dataDir . DIRECTORY_SEPARATOR . 'catalog-export-' . $ts . '.json';
        $log = $logsDir . DIRECTORY_SEPARATOR . 'export-' . $ts . '.log';

        $cmd = 'php ' . escapeshellarg($scriptsDir . DIRECTORY_SEPARATOR . 'export-catalog.php')
             . ' --output-json=' . escapeshellarg($json);

        $this->spawnBackgroundProcess($cmd, $log);
    }

    /**
     * Start catalog import
     */
    private function startImport(): void
    {
        $this->verifySuperAdmin();

        $scriptsDir = _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'external' . DIRECTORY_SEPARATOR . 'modernesmid_webshop' . DIRECTORY_SEPARATOR . 'scripts';
        $dataDir = $scriptsDir . DIRECTORY_SEPARATOR . 'data';
        $json = Tools::getValue('json');

        if (!$json || !is_file($json)) {
            die(json_encode(['ok' => false, 'error' => 'JSON file not found: ' . $json]));
        }

        $logsDir = $dataDir . DIRECTORY_SEPARATOR . 'logs';
        if (!is_dir($logsDir)) {
            @mkdir($logsDir, 0777, true);
        }

        $ts = date('YmdHis');
        $log = $logsDir . DIRECTORY_SEPARATOR . 'import-' . $ts . '.log';

        $cmd = 'php ' . escapeshellarg($scriptsDir . DIRECTORY_SEPARATOR . 'import-catalog.php')
             . ' --input-json=' . escapeshellarg($json) . ' --strict-shops --wipe-catalog';

        $this->spawnBackgroundProcess($cmd, $log);
    }

    /**
     * Tail log file for streaming output
     */
    private function tailLog(): void
    {
        $this->verifySuperAdmin();

        $log = Tools::getValue('log');

        if (!$log || !is_file($log)) {
            die(json_encode(['ok' => false, 'error' => 'Log file not found']));
        }

        $offset = (int) Tools::getValue('offset', 0);
        $len = filesize($log);

        if ($offset < 0 || $offset > $len) {
            $offset = 0;
        }

        $fh = fopen($log, 'rb');
        fseek($fh, $offset);
        $chunk = stream_get_contents($fh);
        fclose($fh);

        die(json_encode(['ok' => true, 'offset' => $offset + strlen($chunk), 'data' => $chunk]));
    }

    /**
     * Spawn background process
     */
    private function spawnBackgroundProcess(string $cmd, string $log): void
    {
        // Start background process redirecting output to log
        if (PHP_OS_FAMILY === 'Windows') {
            $bg = 'start /B ' . $cmd . ' > ' . escapeshellarg($log) . ' 2>&1';
            pclose(popen($bg, 'r'));
        } else {
            $bg = $cmd . ' > ' . escapeshellarg($log) . ' 2>&1 &';
            exec($bg);
        }

        die(json_encode(['ok' => true, 'log' => $log]));
    }

    public function testPostcode($postcode)
    {
        $postcodeRegex = '/^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$/';
        preg_match($postcodeRegex, $postcode, $check);
        if (empty($check)) {
            return false;
        }

        return true;
    }

    public function testCountry($id_country)
    {
        if (empty($id_country)) {
            return false;
        }

        if ($id_country == 13) {
            return 'nl';
        } else {
            return 'be';
        }

        return true;
    }

    public function getMatchingMessage($key)
    {
        $msgArray = [
            'invalid nl_sixpp format' => [
                'msg' => 'Het formaat dient te bestaan uit 4 cijfers en 2 letters. Extra spatiëring en gebruik van hoofd- of kleine letters worden automatisch gecorrigeerd.',
                'field' => 'postcode',
            ],
            'NO_RESULTS_FOUND' => [
                'msg' => 'Er zijn geen resultaten gevonden in de database',
                'field' => 'postcode',
            ],
            'nl_sixpp not found' => [
                'msg' => 'De opgevraagde postcode is niet bekend in de database.',
                'field' => 'postcode',
            ],
            'invalid be_fourpp format' => [
                'msg' => 'Het formaat dient te bestaan uit 4 cijfers. Extra spatiëring wordt automatisch gecorrigeerd.',
                'field' => 'postcode',
            ],
            'be_fourpp not found' => [
                'msg' => 'De opgevraagde postcode is niet bekend in de database.',
                'field' => 'postcode',
            ],
        ];

        if (array_key_exists($key, $msgArray)) {
            return $msgArray[$key];
        }

        return ['msg' => 'Unknown error', 'field' => 'postcode'];
    }

    private function pro6ppLookup()
    {
        $postcode = Tools::getValue('postcode');
        $street = Tools::getValue('street');
        $houseNumber = Tools::getValue('houseNumber');
        $extension = Tools::getValue('extension');
        $id_country = (int) Tools::getValue('id_country');
        $city = str_replace(' ', '%', Tools::getValue('city'));

        $urlNl = $this->apiPath . '/nl?authKey=' . $this->token . '&postalCode=' . urlencode($postcode) . '&streetNumber=' . urlencode($houseNumber) . '&premise=' . urlencode($extension);
        $urlBe = $this->apiPath . '/be?authKey=' . $this->token . '&postalCode=' . urlencode($postcode) . '&street=' . urlencode($street) . '&streetNumber=' . urlencode($houseNumber);

        $valid = false;
        $zip_code_format = Country::getZipCodeFormat($id_country);

        if (Country::getNeedZipCode($id_country)) {
            if ($zip_code_format !== '') {
                $zip_regexp = '/^' . $zip_code_format . '$/ui';
                $zip_regexp = str_replace(' ', '( |)', $zip_regexp);
                $zip_regexp = str_replace('-', '(-|)', $zip_regexp);
                $zip_regexp = str_replace('N', '[0-9]', $zip_regexp);
                $zip_regexp = str_replace('L', '[a-zA-Z]', $zip_regexp);
                $zip_regexp = str_replace('C', Country::getIsoById($id_country), $zip_regexp);

                if (!preg_match($zip_regexp, $postcode)) {
                    $returnedAddressMsg = 'Invalid Zip Code. Must be typed as follows: ' . str_replace('C', Country::getIsoById($id_country), str_replace('N', '0', str_replace('L', 'A', $zip_code_format)));
                } else {
                    $valid = true;
                }
            } elseif ($postcode && !preg_match('/^[0-9a-zA-Z -]{4,9}$/ui', $postcode)) {
                $returnedAddressMsg = 'Invalid Zip Code';
            } else {
                $valid = true;
            }
        } else {
            $valid = true;
        }

        $curl = curl_init();
        if ($this->testCountry($id_country) == 'nl') {
            curl_setopt($curl, CURLOPT_URL, $urlNl);
        } else {
            curl_setopt($curl, CURLOPT_URL, $urlBe);
        }

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, ['X-Api-Key:' . $this->token]);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($curl);
        curl_close($curl);

        if (!$result) {
            die(json_encode(['warning' => 'connection failed']));
        }

        $data = json_decode($result);
        if (!is_null($data)) {
            if (isset($data->errors)) {
                $returnedAddressMsg = $this->getMatchingMessage(strtolower($data->error_id))['msg'];
                $returnedAddress = [];
            } elseif (strtolower($street) !== strtolower($data->street)) {
                $returnedAddressMsg = 'De ingevoerde straat komt niet overeen met de postcode';
                $returnedAddress = [];
                $valid = false;
            } elseif (strtolower($city) !== strtolower($data->settlement)) {
                $returnedAddressMsg = 'De ingevoerde stad komt niet overeen met de postcode';
                $returnedAddress = [];
                $valid = false;
            } else {
                $returnedAddressMsg = 'ok';
                $returnedAddress = (array) $data;
                $valid = true;
            }
        } else {
            $returnedAddressMsg = 'Fetching address failed';
            $returnedAddress = [];
        }

        die(json_encode(['address' => $returnedAddress, 'msg' => $returnedAddressMsg, 'valid' => $valid]));
    }

    private function checkForExistingEmailAddress($email)
    {
        if (Customer::customerExists($email)) {
            die(json_encode(['exists' => true, 'msg' => 'Email address already exists']));
        }
        die(json_encode(['exists' => false]));
    }

    private function addCustomProductToCart()
    {
        $label = $_POST['label'];
        $qty = (int) $_POST['qty'];
        $price = (float) $_POST['price'];
        $discount = (float) (isset($_POST['discount']) ? $_POST['discount'] : 0);
        $description = $_POST['description'];
        $paid = $_POST['switchinput'] === 'true' || $_POST['switchinput'] === '1' || $_POST['switchinput'] === 1;
        $withTax = (int) $_POST['with_tax'];

        $reference = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_REFERENCE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
        $category = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $cart = Context::getContext()->cart;

        if (!$cart->id) {
            $cart->add();
            Context::getContext()->cart = $cart;
            Context::getContext()->cookie->id_cart = (int) $cart->id;
            Context::getContext()->cookie->write();
        }

        $originalPrice = $price;

        $discountAmount = 0;
        if ($discount > 0) {
            $discountAmount = ($price * $discount) / 100;
            $price = $price - $discountAmount;
        }

        if ($withTax) {
            $productPrice = number_format($price/ 1.21, 6, '.', '');
        } else {
            $productPrice = number_format($price, 6, '.', '');
        }

        if ($paid) {
            $product = new Product();
            $product->ean13 = '';
            $product->name = [(int) Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => $label];
            $product->link_rewrite = [(int) Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => uniqid()];
            $product->description_short = [1 => $description];
            $product->reference = $reference;
            $product->id_category_default = $category;
            $product->redirect_type = '301';
            $product->quantity = $qty + 10;
            $product->price = $productPrice;
            $product->minimal_quantity = 1;
            $product->show_price = 1;
            $product->on_sale = 0;
            $product->id_tax_rules_group = '1';
            $product->online_only = 0;
            $product->meta_description = '';
            $product->pack_stock_type = PackStockType::STOCK_TYPE_DEFAULT;
            $product->out_of_stock = '1';
            $product->location = 'CP';
            $product->product_type = 'standard';
            $productAdded = $product->save(false, true);
            StockAvailable::setQuantity($product->id, (int) null, $qty + 10, Context::getContext()->shop->id);

            $product->addToCategories([$category]);

            $url_imagem = _PS_BASE_URL_ . '/themes/modernesmid/assets/img/missing-product-image.jpg';
            $shops = Shop::getShops(true, null, true);
            $image = new Image();
            $image->id_product = $product->id;
            $image->position = Image::getHighestPosition($product->id) + 1;
            $image->cover = true;

            if ($image->validateFields(false, true) === true
                && $image->validateFieldsLang(false, true) === true
                && $image->add()) {
                $image->associateTo($shops);

                if (!$this->copyImg((int) $product->id, (int) $image->id, $url_imagem, 'products', false)) {
                    $image->delete();
                }
            }

            $res = $cart->updateQty($qty, $product->id);
            $cart->update();

            // Log if updateQty failed
            if (!$res) {
                PrestaShopLogger::addLog('Custom product addition failed in ajax.php: updateQty returned false for product ' . $product->id . ' and cart ' . $cart->id, 3);
            }

            if ($discount > 0 && $productAdded) {
                $totalDiscountAmount = $discountAmount * $qty;

                $cartRule = new CartRule();
                $cartRule->name = [(int) Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => 'Korting: ' . $label . ' (' . uniqid() . ')'];
                $cartRule->description = 'Berekende korting voor product op maat: ' . $label;
                $cartRule->code = 'DISC-' . uniqid();
                $cartRule->quantity = 1;
                $cartRule->quantity_per_user = 1;
                $cartRule->id_customer = $cart->id_customer;
                $cartRule->date_from = date('Y-m-d H:i:s');
                $cartRule->date_to = date('Y-m-d H:i:s', strtotime('+1 day'));
                $cartRule->reduction_amount = $totalDiscountAmount;
                $cartRule->reduction_tax = $withTax ? 1 : 0;
                $cartRule->reduction_currency = (int) Configuration::get('PS_CURRENCY_DEFAULT', null, Shop::getContext(), Shop::getContextShopID());
                $cartRule->active = 1;
                $cartRule->add();

                $cart->addCartRule($cartRule->id);
            }

            die(json_encode(['valid' => $res, 'cart' => $cart]));
        } else {
            $creditPrice = (int) $qty * (float) $originalPrice;

            if ($discount > 0) {
                $discountAmount = ($creditPrice * $discount) / 100;
                $creditPrice = $creditPrice - $discountAmount;
            }

            $uniqueVoucherIdentifier = 'EGC-' . uniqid() . '-' . mt_rand(1000, 9999);

            $credit = new CartRule();
            $credit->name = [(int) Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => 'Tegoed: ' . $label . ' (' . $uniqueVoucherIdentifier . ')'];
            $credit->description = strip_tags($description) . ' - Created at ' . date('Y-m-d H:i:s');
            $credit->id_customer = $cart->id_customer > 0 ? $cart->id_customer : 0;
            $credit->date_from = date('Y-m-d H:i:s');
            $credit->date_to = date('Y-m-d H:i:s', strtotime('+15 minutes'));
            $credit->quantity = 1;
            $credit->quantity_per_user = 1;
            $credit->priority = 1;
            $credit->partial_use = 0;
            $credit->code = $uniqueVoucherIdentifier;

            if ($credit->cartRuleExists($credit->code)) {
                $credit->code = $uniqueVoucherIdentifier . '-' . mt_rand(1000, 9999);
            }

            $credit->minimum_amount = 0.00;
            $credit->minimum_amount_tax = 0;
            $credit->minimum_amount_currency = 0;
            $credit->minimum_amount_shipping = 0;
            $credit->country_restriction = 0;
            $credit->carrier_restriction = 0;
            $credit->group_restriction = 0;
            $credit->cart_rule_restriction = 0;
            $credit->product_restriction = 0;
            $credit->shop_restriction = 0;
            $credit->free_shipping = 0;
            $credit->reduction_percent = 0;
            $credit->reduction_amount = number_format($creditPrice, 6, '.', '');
            $credit->reduction_tax = $withTax ? 1 : 0;
            $credit->reduction_currency = (int) Configuration::get('PS_CURRENCY_DEFAULT', null, Shop::getContext(), Shop::getContextShopID());
            $credit->reduction_product = 0;
            $credit->reduction_exlude_special = 0;
            $credit->gift_product = 0;
            $credit->gift_product_attribute = 0;
            $credit->highlight = 0;
            $credit->active = 1;
            $credit->id_connected_cart = $cart->id;

            if (!$credit->add(true, true)) {
                die(json_encode(['valid' => false, 'error' => 'Failed to create voucher']));
            }

            $result = $cart->addCartRule($credit->id);

            if (!$result) {
                die(json_encode(['valid' => false, 'error' => 'Failed to apply voucher to cart']));
            }

            $cart->update();

            die(json_encode(['valid' => true]));
        }
    }

    private function removeCustomProductToCart()
    {
        die(json_encode(['error' => 'Not implemented yet']));
    }

    private function generatePdfOfShoppingCartByEmployee()
    {
        $cart = Context::getContext()->cart;
        $pdf = new PDF($cart, 'PhysicalOrderSlip', Context::getContext()->smarty);
        $pdf->render(false);
        die;
    }

    private function setPsGdprCustomerToRemove()
    {
        Context::getContext()->cookie->__set('psgdpr_remove', 1);
        die(true);
    }

    private function uploadPastedFilesEditor()
    {
        $file = $_FILES['file'];
        $allowed = ['png', 'jpeg', 'gif', 'jpg', 'svg'];
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        if (file_exists($file['tmp_name']) && in_array($extension, $allowed)) {
            $filename = uniqid() . '-' . basename($file['name']);
            $filename = str_replace(' ', '-', $filename);
            $filename = strtolower($filename);
            $filename = filter_var($filename, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $dest = Tools::getValue('path');
            $path = _PS_UPLOAD_DIR_ . $dest;
            $file['name'] = $filename;
            $uploader = new UploaderCore();
            $uploader->setSavePath($path);
            $uploader->upload($file);
            die(json_encode(['valid' => true, 'location' => $dest . '/' . $file['name']]));
        }
        die(false);
    }

    private function searchCustomer()
    {
        $searches = explode(' ', Tools::getValue('customer_search'));
        $limit = (int) Tools::getValue('list_limit', 50);
        $customers = [];
        foreach (array_unique($searches) as $search) {
            if (!empty($search) && ($results = Customer::searchByName($search, $limit))) {
                foreach ($results as $result) {
                    if ($result['active']) {
                        $result['fullname_and_email'] = $result['firstname'] . ' ' . $result['lastname'] . ' - ' . $result['email'];
                        $customers[$result['id_customer']] = $result;
                    }
                }
            }
        }
        die(json_encode(Tools::getValue('sf2') ? $customers : ['customers' => $customers, 'found' => !empty($customers)]));
    }

    private function addGoogleDataToCsvForTesting()
    {
        $data = Tools::getValue('data');

        if ($data != null) {
            $event = $data['event'];
            $idEvent = $data['eventId'];
            $eventData = $data['data'];
            $idCustomer = Context::getContext()->customer->id;

            $date = new DateTime();
            $ip_customer = Tools::getRemoteAddr();

            $headerArray = ['Datum', 'Event Naam', 'Event Id', 'Klant Id', 'Klant IP', 'Doorgestuurde Data'];
            $dataArray = ['date' => $date->format('D, d M Y H:i:s'), 'event' => $event, 'id' => $idEvent, 'customer' => $idCustomer, 'ip_customer' => $ip_customer, 'data' => json_encode($eventData)];
            $data2Array = ['date' => $date->format('D, d M Y H:i:s'), 'event' => $event, 'id' => $idEvent, 'customer' => $idCustomer, 'ip_customer' => $ip_customer, 'data' => json_encode($eventData)];

            $dir = _PS_ROOT_DIR_ . '/google_dumps/';
            $filesPurchase = [];
            $filesBulk = [];
            $ignored = ['.', '..', 'index.php', '.htaccess'];

            foreach (scandir($dir) as $file) {
                if (in_array($file, $ignored)) {
                    continue;
                }
                if (str_contains($file, 'Purchases')) {
                    $filesPurchase[$file] = filemtime($dir . '/' . $file);
                } else {
                    $filesBulk[$file] = filemtime($dir . '/' . $file);
                }
            }

            asort($filesBulk);
            $filesBulk = array_keys($filesBulk);
            $lengthBulk = count($filesBulk);

            for ($i = $lengthBulk; $i > 15; --$i) {
                unlink($dir . $filesBulk[$i]);
            }

            if (filesize($dir . end($filesBulk)) >= 524288) {
                $callback = function ($matches) {
                    return $matches[1] . ($matches[2] + 1);
                };
                $csvBulkName = preg_replace_callback('/(\D*)(\d+)/', $callback, end($filesBulk));
                $file = new SplFileObject($dir . $csvBulkName, 'a');
                $file->fputcsv($headerArray);
                $file->fputcsv($dataArray);
                $file = null;
            } else {
                $csvBulkName = end($filesBulk);
                $file = new SplFileObject($dir . $csvBulkName, 'a');
                $file->fputcsv($dataArray);
                $file = null;
            }

            asort($filesPurchase);
            $filesPurchase = array_keys($filesPurchase);
            $lengthPurch = count($filesPurchase);

            for ($i = $lengthPurch; $i > 15; --$i) {
                unlink($dir . $filesPurchase[$i]);
            }

            if ($event === 'purchase' || $event === 'refund') {
                if (filesize($dir . end($filesPurchase)) >= 524288) {
                    $callbackPurchase = function ($matches) {
                        return $matches[1] . ($matches[2] + 1);
                    };
                    $filesPurchaseName = preg_replace_callback('/(\D*)(\d+)/', $callbackPurchase, end($filesPurchase));
                    $purchaseFile = new SplFileObject($dir . $filesPurchaseName, 'a');
                    $purchaseFile->fputcsv($headerArray);
                    $purchaseFile->fputcsv($data2Array);
                    $purchaseFile = null;
                } else {
                    $filesPurchaseName = end($filesPurchase);
                    $purchaseFile = new SplFileObject($dir . $filesPurchaseName, 'a');
                    $purchaseFile->fputcsv($data2Array);
                    $purchaseFile = null;
                }
            }
        }

        die;
    }

    private function copyImg($id_entity, $id_image = null, $url = '', $entity = 'products', $regenerate = true)
    {
        $tmpfile = tempnam(_PS_TMP_IMG_DIR_, 'ps_import');
        $watermark_types = explode(',', Configuration::get('WATERMARK_TYPES', null, Shop::getContext(), Shop::getContextShopID()));

        switch ($entity) {
            default:
            case 'products':
                $image_obj = new Image($id_image);
                $path = $image_obj->getPathForCreation();
                break;
            case 'categories':
                $path = _PS_CAT_IMG_DIR_ . (int) $id_entity;
                break;
            case 'manufacturers':
                $path = _PS_MANU_IMG_DIR_ . (int) $id_entity;
                break;
            case 'suppliers':
                $path = _PS_SUPP_IMG_DIR_ . (int) $id_entity;
                break;
            case 'stores':
                $path = _PS_STORE_IMG_DIR_ . (int) $id_entity;
                break;
        }

        $url = urldecode(trim($url));
        $parced_url = parse_url($url);

        if (isset($parced_url['path'])) {
            $uri = ltrim($parced_url['path'], '/');
            $parts = explode('/', $uri);
            foreach ($parts as &$part) {
                $part = rawurlencode($part);
            }
            unset($part);
            $parced_url['path'] = '/' . implode('/', $parts);
        }

        if (isset($parced_url['query'])) {
            $query_parts = [];
            parse_str($parced_url['query'], $query_parts);
            $parced_url['query'] = http_build_query($query_parts);
        }

        if (!function_exists('http_build_url')) {
            require_once _PS_TOOL_DIR_ . 'http_build_url/http_build_url.php';
        }

        $url = http_build_url('', $parced_url);
        $orig_tmpfile = $tmpfile;

        if (Tools::copy($url, $tmpfile)) {
            if (!ImageManager::checkImageMemoryLimit($tmpfile)) {
                @unlink($tmpfile);

                return false;
            }

            $tgt_width = $tgt_height = 0;
            $src_width = $src_height = 0;
            $error = 0;
            ImageManager::resize($tmpfile, $path . '.jpg', null, null, 'jpg', false, $error, $tgt_width, $tgt_height, 5, $src_width, $src_height);
            $images_types = ImageType::getImagesTypes($entity, true);

            if ($regenerate) {
                $path_infos = [];
                $path_infos[] = [$tgt_width, $tgt_height, $path . '.jpg'];
                foreach ($images_types as $image_type) {
                    $tmpfile = self::get_best_path($image_type['width'], $image_type['height'], $path_infos);

                    if (ImageManager::resize($tmpfile, $path . '-' . stripslashes($image_type['name']) . '.jpg', $image_type['width'], $image_type['height'], 'jpg', false, $error, $tgt_width, $tgt_height, 5, $src_width, $src_height)) {
                        if ($tgt_width <= $src_width && $tgt_height <= $src_height) {
                            $path_infos[] = [$tgt_width, $tgt_height, $path . '-' . stripslashes($image_type['name']) . '.jpg'];
                        }
                        if ($entity == 'products') {
                            if (is_file(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '.jpg')) {
                                unlink(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '.jpg');
                            }
                            if (is_file(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '_' . (int) Context::getContext()->shop->id . '.jpg')) {
                                unlink(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '_' . (int) Context::getContext()->shop->id . '.jpg');
                            }
                        }
                    }
                    if (in_array($image_type['id_image_type'], $watermark_types)) {
                        Hook::exec('actionWatermark', ['id_image' => $id_image, 'id_product' => $id_entity]);
                    }
                }
            }
        } else {
            @unlink($orig_tmpfile);

            return false;
        }
        unlink($orig_tmpfile);

        return true;
    }

    protected static function get_best_path($tgt_width, $tgt_height, $path_infos)
    {
        $path_infos = array_reverse($path_infos);
        $path = '';
        foreach ($path_infos as $path_info) {
            list($width, $height, $path) = $path_info;
            if ($width >= $tgt_width && $height >= $tgt_height) {
                return $path;
            }
        }

        return $path;
    }

    public function doApiCall($route, $params, array $headerParams = []): mixed
    {
        $curl = curl_init();

        $apiUrl = Configuration::get('MSTHEMECONFIG_DASHBOARD_API_URL', (int) $this->context->language->id, (int) $this->context->shop->id_shop_group, (int) $this->context->shop->id);

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiUrl . '/api/' . $route,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_POSTFIELDS => $params,
            CURLOPT_HTTPHEADER => $headerParams,
        ]);
        $response = curl_exec($curl);
        $returnData = curl_errno($curl) ? [] : json_decode($response);
        curl_close($curl);

        return $returnData;
    }

    private function makeApiCallToDashboard(string $type = 'generate-label', $id_order = null, $reference = null): void
    {
        $idLang = (int) $this->context->language->id;
        $idShopGroup = (int) $this->context->shop->id_shop_group;
        $idShop = (int) $this->context->shop->id;

        $loginCall = $this->doApiCall('api-auth', [
            'email' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_USER', $idLang, $idShopGroup, $idShop),
            'password' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_PASS', $idLang, $idShopGroup, $idShop),
        ], []);

        $firstname = isset($this->context->employee->firstname) ? $this->context->employee->firstname : (isset($this->context->customer->firstname) ? $this->context->customer->firstname : '');

        if (!empty($loginCall) && isset($loginCall->access_token)) {
            $successRecord = empty($reference) ? Order::getUniqReferenceOf($id_order) : $reference;
            $message = [
                'text' => $firstname . ' heeft op een koopman actie uitgevoerd',
                'status' => 'success',
                'sub_type' => $type,
                'error_records' => null,
                'success_records' => [$successRecord],
                'time' => date('Y-m-d H:i:s'),
            ];

            $this->doApiCall('log-message', [
                'profile' => $this->context->shop->getUrls()[0]['domain'] . 'test',
                'type' => 'koopman-actions',
                'version' => _PS_VERSION_,
                'message' => json_encode($message),
            ], [
                'Content-Type: application/x-www-form-urlencoded',
                'Accept: application/json',
                'Authorization: Bearer ' . $loginCall->access_token,
            ]);
        }
    }

    private function getDeliverySlipMessage(int $id)
    {
        $order = new Order($id);
        $message = $order->getFirstMessageWithId();
        die(json_encode([
            'message' => $message ? $message['message'] : '',
            'id_message' => $message ? (int) $message['id_message'] : 0,
            'id_order' => $order->id,
            'id_customer' => $order->id_customer,
            'id_cart' => $order->id_cart,
        ]));
    }

    private function updateDeliverySlipMessage()
    {
        try {
            $id_order = (int) Tools::getValue('id_order');
            $message_text = Tools::getValue('message');
            $order = new Order($id_order);
            $existingMessage = $order->getFirstMessageWithId();
            $id_message = $existingMessage ? (int) $existingMessage['id_message'] : 0;

            if ($id_message == 0) {
                $msg = new Message();
                $msg->id_order = $id_order;
                $msg->id_cart = (int) $order->id_cart;
                $msg->id_customer = (int) $order->id_customer;
                $msg->message = $message_text;
                $msg->private = false;
                $msg->add();
            } else {
                $msg = new Message($id_message);
                $msg->message = $message_text;
                $msg->update();
            }
            die(json_encode(['success' => true, 'msg' => 'Bericht bijgewerkt']));
        } catch (Exception $e) {
            die(json_encode(['success' => false, 'msg' => $e->getMessage()]));
        }
    }

    private function getKoopmanOrderStatus()
    {
        $ref = Tools::getValue('reference');
        try {
            $order = Order::getByReference($ref)->getFirst();
            if (!$order) {
                die(json_encode(['error' => 'Bestelling niet gevonden!']));
            }

            $client = new ExportOrdersMultipleCollies($order->id);
            $statusList = json_decode($client->getShipmentStatus());

            if (empty($statusList)) {
                die('<div class="w-100 mt-4 text-center text-danger h2">De bestelling is nog niet aangemeld of is al verzonden!</div>');
            }

            $shipmentData = null;
            foreach ($statusList as $response) {
                if (isset($response->data) && is_array($response->data)) {
                    foreach ($response->data as $shipment) {
                        if (isset($shipment->order_reference) && $shipment->order_reference === $ref) {
                            $shipmentData = $shipment;
                            break 2;
                        }
                    }
                }
            }

            if (!$shipmentData) {
                die('<div class="w-100 mt-4 text-center text-danger h2">Geen verzendgegevens gevonden voor deze bestelling!</div>');
            }

            $data = [
                'reference' => $ref,
                'shipping_number' => $shipmentData->transport_number ?? '',
                'main_history' => [],
                'scheduled_delivery_moment' => [
                    'planned_delivery_date' => $shipmentData->eta->date ?? '',
                    'from' => $shipmentData->eta->from ?? '',
                    'to' => $shipmentData->eta->to ?? '',
                ],
                'collies' => [],
            ];

            foreach ($order->getHistory($this->context->language->id) as $history) {
                array_unshift($data['main_history'], [
                    'state_id' => $history['id_order_state'],
                    'date' => $history['date_add'],
                    'name' => $history['ostate_name'],
                    'color' => $history['color'],
                    'from' => 'web',
                ]);
            }

            if (isset($shipmentData->shipment_units) && is_array($shipmentData->shipment_units)) {
                foreach ($shipmentData->shipment_units as $unit) {
                    $history = [[
                        'state_id' => $shipmentData->status_code ?? '',
                        'depot' => $shipmentData->status_depot ?? '',
                        'date' => $shipmentData->status_date ?? '',
                        'time' => $shipmentData->status_time ?? '',
                        'name' => $shipmentData->status_description ?? '',
                        'from' => 'api',
                    ]];
                    $data['collies'][] = [
                        'nr' => $unit->unit_number ?? '',
                        'type' => $unit->unit_type ?? '',
                        'weight' => $unit->weight ?? '',
                        'history' => $history,
                    ];
                }
            }

            die($this->context->smarty->createTemplate('@Modules/msthemeconfig/views/templates/admin/shipping_state_form.html.twig', null, null, $this->context->smarty)->fetch($data));
        } catch (Exception $e) {
            die(json_encode(['error' => $e->getMessage()]));
        }
    }

    private function getKoopmanOrderLabelStatus()
    {
        $ref = Tools::getValue('reference');
        try {
            $order = Order::getByReference($ref)->getFirst();
            if (!$order) {
                die(json_encode(['error' => 'Bestelling niet gevonden!']));
            }
            $orderDetails = $order->getOrderDetailList();
            $client = new ExportOrdersMultipleCollies($order->id);
            $statusList = json_decode($client->getShipmentStatus());

            if (empty($statusList)) {
                die('<div class="w-100 mt-4 text-center text-danger h2">De bestelling is nog niet aangemeld of is al verzonden!</div>');
            }

            $shipmentData = null;
            foreach ($statusList as $response) {
                if (isset($response->data) && is_array($response->data)) {
                    foreach ($response->data as $shipment) {
                        if (isset($shipment->order_reference) && $shipment->order_reference === $ref) {
                            $shipmentData = $shipment;
                            break 2;
                        }
                    }
                }
            }

            if (!$shipmentData) {
                die('<div class="w-100 mt-4 text-center text-danger h2">Geen verzendgegevens gevonden voor deze bestelling!</div>');
            }

            $colliesData = [];
            if (isset($shipmentData->shipment_units) && is_array($shipmentData->shipment_units)) {
                foreach ($shipmentData->shipment_units as $unit) {
                    $collie = [
                        'nr' => $unit->unit_number ?? '',
                        'type' => $unit->unit_type ?? '',
                        'weight' => $unit->weight ?? '',
                        'length' => $unit->measured[0]->length ?? '',
                        'height' => $unit->measured[0]->height ?? '',
                        'breedte' => $unit->measured[0]->width ?? '',
                    ];
                    $colliesData[] = $collie;
                }
            }

            $customer = new Customer($order->id_customer);
            $address = new Address($order->id_address_delivery);

            $data = [
                'collies' => $colliesData,
                'products' => $orderDetails,
                'datum' => $shipmentData->date_transport ?? '',
                'nrorder' => $ref,
                'nrzend' => $shipmentData->transport_number ?? '',
                'postcode' => $shipmentData->address->postalcode ?? $address->postcode,
                'plaats' => $shipmentData->address->city ?? $address->city,
                'land' => $shipmentData->address->country_code ?? Country::getIsoById($address->id_country),
                'naam' => $address->firstname,
                'naam2' => $address->lastname,
                'straat' => $address->address1,
                'huisnr' => $address->house_number . ' ' . $address->house_number_extension,
                'telefoon' => $address->phone,
                'email' => $customer->email,
                'eta' => [
                    'date' => $shipmentData->eta->date ?? '',
                    'from' => $shipmentData->eta->from ?? '',
                    'to' => $shipmentData->eta->to ?? '',
                ],
            ];

            die($this->context->smarty->createTemplate('@Modules/msthemeconfig/views/templates/admin/label_state_form.html.twig', null, null, $this->context->smarty)->fetch($data));
        } catch (Exception $e) {
            die(json_encode(['error' => $e->getMessage()]));
        }
    }

    private function getKoopmanInitRetour()
    {
        // Return bookings now use the authenticated back-office routes.
        http_response_code(410);
        die('<div class="alert alert-warning">Open Retour opnieuw vanuit de bestellingenlijst in het beheer.</div>');
    }

    private function getKoopmanSubmitRetour()
    {
        http_response_code(410);
        header('Content-Type: application/json');
        die(json_encode(['success' => false, 'message' => 'Open Retour opnieuw vanuit de bestellingenlijst in het beheer.']));
    }

    private function getKoopmanAfTeHalen()
    {
        $id_order = Tools::getValue('id_order');
        $order = new Order($id_order);
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int) $id_order;
        $history->changeIdOrderState((int) $new_status, (int) $id_order);
        $history->addWithemail($order);
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar af te halen</h3>');
    }

    private function getKoopmanAfgehaald()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKEDUP_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int) $id_order;
        $history->changeIdOrderState((int) $new_status, (int) $id_order);
        $history->add();
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar afgeleverd</h3>');
    }

    private function getKoopmanToegevoegd()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int) $id_order;
        $history->changeIdOrderState((int) $new_status, (int) $id_order);
        $history->add();
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar toegevoegd</h3>');
    }

    private function getKoopmanBeingPreparedStatus()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int) $id_order;
        $history->changeIdOrderState((int) $new_status, (int) $id_order);
        $history->add();
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar word voorbereid</h3>');
    }

    private function getKoopmanWorkShopStatus()
    {
        $type = Tools::getValue('type');
        $id_order = (int) Tools::getValue('id_order');

        if ($type == 'statusandcard') {
            $idLang = Context::getContext()->language->id;
            $idShopGroup = Context::getContext()->shop->id_shop_group;
            $idShop = Context::getContext()->shop->id;

            $trello_url = Configuration::get('MSTHEMECONFIG_TRELLO_URL', $idLang, $idShopGroup, $idShop);
            $trello_secret = Configuration::get('MSTHEMECONFIG_TRELLO_SECRET', $idLang, $idShopGroup, $idShop);
            $trello_token = Configuration::get('MSTHEMECONFIG_TRELLO_TOKEN', $idLang, $idShopGroup, $idShop);

            $action_type = Tools::getValue('action_type', '');
            $trello_card_lane = Tools::getValue('trello_card_lane', '');
            $trello_title = Tools::getValue('trello_title', '');
            $trello_card_descr = Tools::getValue('trello_card_descr', '');

            if ($trello_card_lane == '' || $trello_title == '') {
                $this->workshopError('Vul een kaarttitel in en kies een Trello-lijst.', 422);
            }

            if ($trello_card_lane != '' && $trello_title != '') {
                $sql_query = new DbQuery();
                $sql_query->select('oi.*');
                $sql_query->from('order_invoice', 'oi');
                $sql_query->where('o.id_order = \'' . $id_order . '\'' . Shop::addSqlRestriction(Shop::SHARE_ORDER, 'o'));
                $sql_query->leftJoin('orders', 'o', 'o.id_order = oi.id_order');
                $sql_query->orderBy('oi.delivery_date ASC');

                $order_invoice_list = Db::getInstance()->executeS($sql_query);
                $orderModel = ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list);

                if (!count($orderModel)) {
                    $this->workshopError('Er is nog geen factuur voor deze bestelling beschikbaar om een pakbon te maken. Er is geen Trello-kaart aangemaakt en de bestelstatus is niet gewijzigd.', 422);
                }

                if (count($orderModel)) {
                    try {
                        $pdf_file = new PDF($orderModel, PDF::TEMPLATE_DELIVERY_SLIP, Context::getContext()->smarty);
                        WorkshopDeliverySlipFile::save(_PS_UPLOAD_DIR_, $id_order, $pdf_file->render('S'));
                    } catch (Throwable $e) {
                        PrestaShopLogger::addLog('Workshop delivery slip could not be saved: ' . $e->getMessage(), 3, null, 'Order', $id_order);
                        $this->workshopError('De pakbon kon niet worden opgeslagen. Er is geen Trello-kaart aangemaakt en de bestelstatus is niet gewijzigd. Neem contact op met de beheerder.');
                    }
                    $deliverySlipFilePath = '/upload/werkplaats/pakbon_' . $id_order . '.pdf';

                    $query = [
                        'key' => $trello_secret,
                        'token' => $trello_token,
                        'idList' => $trello_card_lane,
                        'name' => $trello_title,
                        'desc' => $trello_card_descr,
                        'pos' => 'bottom',
                    ];

                    $curlCard = curl_init();
                    curl_setopt_array($curlCard, [
                        CURLOPT_URL => $trello_url . '/1/cards',
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_MAXREDIRS => 10,
                        CURLOPT_TIMEOUT => 10,
                        CURLOPT_FOLLOWLOCATION => true,
                        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                        CURLOPT_CUSTOMREQUEST => 'POST',
                        CURLOPT_POSTFIELDS => $query,
                    ]);
                    $response = curl_exec($curlCard);
                    $cardId = !curl_errno($curlCard) ? json_decode($response)->id : null;
                    curl_close($curlCard);

                    if ($cardId) {
                        $query2 = [
                            'key' => $trello_secret,
                            'token' => $trello_token,
                            'name' => 'pakbon_' . $id_order . '.pdf',
                            'url' => 'https://ijzershop.nl' . $deliverySlipFilePath,
                            'mimeType' => 'application/pdf',
                            'setCover' => false,
                        ];
                        $curlAttach = curl_init();
                        curl_setopt_array($curlAttach, [
                            CURLOPT_URL => $trello_url . '/1/cards/' . $cardId . '/attachments',
                            CURLOPT_RETURNTRANSFER => true,
                            CURLOPT_MAXREDIRS => 10,
                            CURLOPT_TIMEOUT => 10,
                            CURLOPT_FOLLOWLOCATION => true,
                            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                            CURLOPT_CUSTOMREQUEST => 'POST',
                            CURLOPT_POSTFIELDS => $query2,
                        ]);
                        curl_exec($curlAttach);
                        curl_close($curlAttach);
                    }
                }
            }
        }

        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_WORKSHOP_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int) $id_order;
        $history->changeIdOrderState((int) $new_status, (int) $id_order);
        $history->add();

        if ($type == 'statusandcard') {
            die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar werkplaats en de trello card is aangemaakt</h3>');
        } else {
            die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar werkplaats</h3>');
        }
    }

    private function workshopError(string $message, int $status = 500): void
    {
        http_response_code($status);
        header('Content-Type: application/json');
        die(json_encode(['error' => $message]));
    }

    private function getKoopmanBackOrderStatus()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_WAITING_STOCK_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int) $id_order;
        $history->changeIdOrderState((int) $new_status, (int) $id_order);
        $history->add();
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar wachtend op vooraad</h3>');
    }

    private function getKoopmanPrintedLabel()
    {
        if (Tools::getIsset('updateAddress')) {
            $this->updateOrderDeliveryAddress(Tools::getAllValues());
        }

        $id_order = (int) Tools::getValue('id_order');
        $collies = json_decode(str_replace("'", '"', (string) Tools::getValue('collies')), true);

        $export = new ExportOrdersMultipleCollies($id_order, $collies);
        $export->export();

        if ($export->redirect) {
            $readyForShippingStatus = Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
            $order = new Order($id_order);

            if ((int) $readyForShippingStatus !== (int) $order->current_state) {
                $history = new OrderHistory();
                $history->id_order = (int) $id_order;
                $history->changeIdOrderState((int) $readyForShippingStatus, (int) $id_order);
                $history->add();
            }

            die('printed');
        } else {
            die($export->output);
        }
    }

    private function updateOrderDeliveryAddress($getAllValues)
    {
        try {
            $order = new Order($getAllValues['id_order'] ?? 0);

            if (!is_null($order->id_address_delivery)) {
                $address = new Address($order->id_address_delivery);
                $address->address1 = $getAllValues['address1'];
                $address->house_number = $getAllValues['house_number'];
                $address->house_number_extension = $getAllValues['house_number_extension'];
                $address->postcode = $getAllValues['postcode'];
                $address->city = $getAllValues['city'];
                $address->update(false);
            }
        } catch (PrestaShopDatabaseException|PrestaShopException $e) {
            return false;
        }

        return true;
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function runKoopmanDayClosing()
    {
        $mode = Tools::getValue('mode', 'preview');
        if (!in_array($mode, ['preview', 'all', 'ok'], true)) {
            $mode = 'preview';
        }
        $export = new ExportOrdersMultipleCollies(0);
        die(json_encode($export->dagafsluiting($mode)));
    }

    private function fetchProductsForRetourForm($idOrder, $postcode = '')
    {
        if (!empty($postcode)) {
            $order = Order::getByReference($idOrder)->getFirst();
        } else {
            $order = new Order((int) $idOrder);
        }

        if (!$order || !Validate::isLoadedObject($order)) {
            die(json_encode(['success' => false, 'msg' => 'Bestelling niet gevonden']));
        }

        $products = $order->getProductsDetail();
        die(json_encode(['success' => true, 'data' => $products]));
    }

    private function removeDefaultCartDiscountRuleCounterAccess()
    {
        $cartRuleId = (int) Configuration::get(
            'MSTHEMECONFIG_NO_DISCOUNT_RULE',
            (int) $this->context->language->id,
            (int) $this->context->shop->id_shop_group,
            (int) $this->context->shop->id
        );
        if ($cartRuleId && $this->context->cart->id) {
            $this->context->cart->addCartRule($cartRuleId);
            die(json_encode(['success' => true, 'msg' => 'Discount Rules are removed']));
        }
        die(json_encode(['success' => false]));
    }

    private function sendCustomerInfoToAdministration()
    {
        $customerDataRaw = Tools::getValue('customerData');
        $customerData = json_decode($customerDataRaw, true);

        if (!$customerData) {
            die(json_encode(['success' => false, 'message' => 'Geen geldige data ontvangen']));
        }

        $customerInfo = '<div style="font-family: Arial, sans-serif; color: #333;">';
        $customerInfo .= '<h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px;">Klant Bezoek Informatie</h2>';
        $customerInfo .= '<table style="width: 100%; border-collapse: collapse;">';

        foreach ($customerData as $label => $data) {
            if (!empty($data)) {
                $customerInfo .= '<tr>';
                $customerInfo .= '<td style="width: 30%; padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">' . strip_tags($label) . '</td>';
                $customerInfo .= '<td style="width: 70%; padding: 10px; border-bottom: 1px solid #eee;">' . (is_array($data) ? json_encode($data) : $data) . '</td>';
                $customerInfo .= '</tr>';
            }
        }
        $customerInfo .= '</table></div>';

        $template_vars = [
            'customer_info' => $customerInfo,
            'shop_url' => Context::getContext()->shop->domain_ssl,
            'date' => date('d-m-Y H:i:s'),
        ];

        try {
            $result = Mail::send(
                Context::getContext()->language->id,
                'customer_info',
                'Klant data rapport - ' . Context::getContext()->shop->name,
                $template_vars,
                Configuration::get('PS_SHOP_EMAIL'),
                'Administrator',
                null,
                null,
                null,
                null,
                _PS_MAIL_DIR_,
                false,
                (int) Context::getContext()->shop->id
            );

            if ($result) {
                die(json_encode(['success' => true]));
            } else {
                die(json_encode(['success' => false, 'message' => 'Fout bij het verzenden van de e-mail']));
            }
        } catch (Exception $e) {
            die(json_encode(['success' => false, 'message' => $e->getMessage()]));
        }
    }

    private function resendOrderMessage()
    {
        $id_order = (int) Tools::getValue('id_order');
        $order = new Order($id_order);
        if (!Validate::isLoadedObject($order)) {
            die(json_encode(['success' => false, 'msg' => 'Bestelling niet gevonden']));
        }
        $customer = new Customer($order->id_customer);
        $result = PaymentModule::resendOrderConfirmationMailToCustomer($order);

        if ($result) {
            die(json_encode(['success' => true, 'msg' => 'Bestelbevestiging verzonden naar ' . $customer->firstname . ' ' . $customer->lastname]));
        } else {
            die(json_encode(['success' => false, 'msg' => 'Bestelbevestiging verzenden naar ' . $customer->firstname . ' ' . $customer->lastname . ' is niet gelukt, probeer het nogmaals']));
        }
    }

    private function migrateOrderToCustomer()
    {
        $email = Tools::getValue('customer_email');
        $customer_id = (int) Tools::getValue('customer');
        $id_order = (int) Tools::getValue('order');

        $cust = new Customer($customer_id);
        if (Validate::isLoadedObject($cust)) {
            $result = Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . 'orders` SET `id_customer`=' . (int) $cust->id . ' WHERE `id_order` = ' . (int) $id_order);
            if ($result) {
                die(json_encode(['success' => true, 'msg' => 'Bestelling gekoppeld aan klant: ' . $cust->firstname . ' ' . $cust->lastname]));
            } else {
                die(json_encode(['success' => false, 'msg' => 'Koppelen van de bestelling aan klant : ' . $cust->firstname . ' ' . $cust->lastname . ' is niet gelukt, probeer het nogmaals']));
            }
        }
        die(json_encode(['success' => false, 'msg' => 'Klant met id: ' . $customer_id . ' en email adres: ' . $email . ' kon niet gevonden worden in de database']));
    }

    private function setDesiredDeliveryDate()
    {
        $id_order = (int) Tools::getValue('id_order');
        $date = Tools::getValue('date');
        if ($date !== null) {
            $result = Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . "orders` SET `desired_delivery_date`='" . pSQL($date) . "' WHERE `id_order` = " . (int) $id_order);

            if ($result) {
                die(json_encode(['success' => true, 'msg' => 'Gewenste leverdatum ' . $date . ' is ingesteld']));
            } else {
                die(json_encode(['success' => false, 'msg' => 'Het instellen van de gewenste leverdatum is niet gelukt']));
            }
        }
        die(json_encode(['success' => false, 'msg' => 'U heeft geen datum geselecteerd, selecteer de gewenste leverdatum en probeer opnieuw']));
    }

    private function addReturnCostToOrder()
    {
        $id_order = (int) Tools::getValue('id_order');
        $type = Tools::getValue('type'); // NL or BE
        $order = new Order($id_order);
        if (!Validate::isLoadedObject($order)) {
            die(json_encode(['success' => false, 'msg' => 'Bestelling niet gevonden']));
        }

        $configKey = 'MSTHEMECONFIG_RETOUR_COST_' . strtoupper($type);
        $id_product = (int) Configuration::get($configKey, null, null, (int) $order->id_shop);
        if (!$id_product) {
            die(json_encode(['success' => false, 'msg' => 'Geen retour product geconfigureerd voor ' . $type]));
        }

        $product = new Product($id_product, false, $order->id_lang);
        if (!Validate::isLoadedObject($product)) {
            die(json_encode(['success' => false, 'msg' => 'Retour product niet gevonden']));
        }

        // Add product to order
        $order_detail = new OrderDetail();
        $order_detail->id_order = $order->id;
        $order_detail->product_id = $product->id;
        $order_detail->product_attribute_id = 0;
        $order_detail->product_name = $product->name;
        $order_detail->product_quantity = 1;
        $order_detail->product_price = $product->price;
        $order_detail->unit_price_tax_incl = (float) $product->getPrice(true, null, 6);
        $order_detail->unit_price_tax_excl = (float) $product->getPrice(false, null, 6);
        $order_detail->total_price_tax_incl = $order_detail->unit_price_tax_incl;
        $order_detail->total_price_tax_excl = $order_detail->unit_price_tax_excl;
        $order_detail->product_ean13 = $product->ean13;
        $order_detail->product_reference = $product->reference;
        $order_detail->product_weight = $product->weight;
        $order_detail->id_shop = $order->id_shop;
        $order_detail->id_warehouse = 0;
        $order_detail->id_tax_rules_group = (int) $product->id_tax_rules_group;

        if ($order_detail->add()) {
            // Update order totals
            $order->total_products += $order_detail->total_price_tax_excl;
            $order->total_products_wt += $order_detail->total_price_tax_incl;
            $order->total_paid += $order_detail->total_price_tax_incl;
            $order->total_paid_tax_incl += $order_detail->total_price_tax_incl;
            $order->total_paid_tax_excl += $order_detail->total_price_tax_excl;
            $order->update();

            // Handle taxes for the order detail
            $address = new Address($order->id_address_delivery);
            $tax_manager = TaxManagerFactory::getManager($address, $order_detail->id_tax_rules_group);
            $tax_calculator = $tax_manager->getTaxCalculator();
            $taxes = $tax_calculator->getTaxesAmount($order_detail->unit_price_tax_excl);

            foreach ($taxes as $id_tax => $amount) {
                Db::getInstance()->insert('order_detail_tax', [
                    'id_order_detail' => (int) $order_detail->id,
                    'id_tax' => (int) $id_tax,
                    'unit_amount' => (float) $amount,
                    'total_amount' => (float) $amount,
                ]);
            }

            // If there's an invoice, we should update it too
            $invoices = $order->getInvoicesCollection();
            if ($invoices->count() > 0) {
                foreach ($invoices as $invoice) {
                    $invoice->total_products += $order_detail->total_price_tax_excl;
                    $invoice->total_products_tax_incl += $order_detail->total_price_tax_incl;
                    $invoice->total_paid_tax_incl += $order_detail->total_price_tax_incl;
                    $invoice->total_paid_tax_excl += $order_detail->total_price_tax_excl;
                    $invoice->save();
                }
            }

            die(json_encode(['success' => true, 'msg' => 'Retour kosten product toegevoegd aan bestelling']));
        }

        die(json_encode(['success' => false, 'msg' => 'Fout bij het toevoegen van retour kosten']));
    }
}
