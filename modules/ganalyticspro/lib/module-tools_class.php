<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

class BT_GapModuleTools
{
    /**
     * detectCurrentPage() method returns current page type
     */
    public static function detectCurrentPage()
    {
        // Get the current step of the checkout process
        $iStep = self::getStepId((int)Context::getContext()->cart->id);
        // use case - home page
        if (Tools::getValue('controller') == 'index') {
            $sCurrentTypePage = 'home';
        } // use case - search results page
        elseif (Tools::getValue('controller') == 'search' && empty(Context::getContext()->controller->module)) {
            $sCurrentTypePage = 'search';
        } // use case - order page
        elseif ((Tools::getValue('controller') == 'order'
            || Tools::getValue('controller') == 'orderopc')) {
            if (!empty(GAnalyticsPro::$bCompare17)) {
                if (isset(Context::getContext()->controller->page_name)) {
                    if (Context::getContext()->controller->page_name == 'checkout') {
                        $sCurrentTypePage = 'checkout';
                    } else {
                        $sCurrentTypePage = 'cart';
                    }
                } else {
                    $sCurrentTypePage = 'cart';
                }
            } else { // Todo case 1.6
                if ($iStep == 1 && Tools::getValue('controller') == 'order') {
                    $sCurrentTypePage = 'checkout';
                } else {
                    $sCurrentTypePage = 'cart';
                }
            }
            // Use case handle the placeOrder information
            if ($iStep == 2  && Tools::getValue('controller') == 'order') {
                $sCurrentTypePage = 'shipping';
            }

            // Use case handle the AddPayment information
            if ($iStep == 3) {
                $sCurrentTypePage = 'payment';
            }
        } // use case - order confirmation page
        elseif ((version_compare(_PS_VERSION_, '1.5', '>')
            && Tools::getValue('controller') == 'orderconfirmation'
            && Tools::getValue('id_order') != false)) {
            $sCurrentTypePage = 'purchase';
        } elseif ((Tools::getValue('controller') == 'submit') || Tools::getValue('controller') == 'orderconfirmation') {
            $sCurrentTypePage = 'purchase';
        } // use case - category page
        elseif (Tools::getvalue('id_category')) {
            $sCurrentTypePage = 'category';
        } // use case - product page
        elseif (Tools::getvalue('id_product')) {
            $sCurrentTypePage = 'product';
        } elseif (Tools::getValue('controller') == 'manufacturer') {
            $sCurrentTypePage = 'other';
        } elseif (Tools::getValue('controller') == 'pricesdrop') {
            $sCurrentTypePage = 'promotion';
        } elseif (Tools::getValue('controller') == 'newproducts') {
            $sCurrentTypePage = 'newproducts';
        } elseif (Tools::getValue('controller') == 'bestsales') {
            $sCurrentTypePage = 'bestsales';
        } elseif (Tools::getValue('controller') == 'cart') {
            $sCurrentTypePage = 'cart';
        } elseif (Tools::getValue('controller') == 'contact') {
            $sCurrentTypePage = 'lead';
        } else {
            $sCurrentTypePage = 'other';
        }

        return $sCurrentTypePage;
    }

    /**
     * get the FAQ lang
     *
     * @param string $sLangIso
     */
    public static function getFaqLang($sLangIso)
    {
        $sLang = '';

        if ($sLangIso == 'en' || $sLangIso == 'fr') {
            $sLang = $sLangIso;
        } else {
            $sLang = 'en';
        }

        return $sLang;
    }

    /**
     * Get the order id by its cart id.
     *
     * @param int $id_cart Cart id
     *
     * @return int $id_order
     */
    public static function getIdByCartId($id_cart)
    {
        $sql = 'SELECT `id_order` 
            FROM `' . _DB_PREFIX_ . 'orders`
            WHERE `id_cart` = ' . (int) $id_cart .
            Shop::addSqlRestriction();

        $result = Db::getInstance()->getValue($sql);

        return !empty($result) ? (int) $result : false;
    }

    /**
     * build the display tag
     *
     * @param array $aDynTags
     * @param array $sPageType
     * @return array $aAssign all tag information
     * @throws
     */
    public static function buildDynDisplayTag($aDynTags, $sPageType)
    {

        require_once(_GAP_PATH_LIB_GTAG . 'base-tags_class.php');
        //get the pixel information
        $oTagsCtrl = BT_BaseGapFourTaglTags::get($sPageType, $aDynTags);
        $oTagsCtrl->set();
        return $oTagsCtrl->display();
    }

    /**
     * getCategory() method get the category name according whit the option
     * 
     * @param int $iCategoryId
     *
     * @return array
     */
    public static function getCategoryName($iCategoryId)
    {
        $sName = '';
        if (GAnalyticsPro::$aConfiguration['GAP_CAT_LABEL_FORMAT'] == "short") {
            $oCategory = new Category($iCategoryId, GAnalyticsPro::$iCurrentLang);
            $sName .= $oCategory->name;
        } else {
            $sName .= self::getPath($iCategoryId, GAnalyticsPro::$iCurrentLang, '', '>', false);
        }

        return $sName;
    }


    /**
     * getListName() method returns the good matching list name according to the current controller name
     *
     * @param string $sController
     * @param int $iStep
     * @return array
     */
    public static function getListName($sController, $iStep)
    {
        $sName = '';

        if ($sController) {
            switch ($sController) {
                case 'index':
                    $sName = GAnalyticsPro::$oModule->l('Home page', 'module-tools_class');
                    break;
                case 'category':
                    $sName = GAnalyticsPro::$oModule->l('Category', 'module-tools_class');

                    $iCategoryId = Tools::getValue('id_category');
                    if (!empty($iCategoryId)) {
                        $sName .= ': ';
                        if ('long' == GAnalyticsPro::$aConfiguration[_GAP_MODULE_NAME . '_CAT_LABEL_FORMAT']) {
                            $sName .= self::getPath($iCategoryId, GAnalyticsPro::$iCurrentLang, '', '>', false);
                        } else {
                            $oCategory = new Category($iCategoryId, GAnalyticsPro::$iCurrentLang);
                            $sName .= $oCategory->name;
                            unset($oCategory);
                        }
                    }
                    break;
                case 'manufacturer':
                    $sName = GAnalyticsPro::$oModule->l('Manufacturer', 'module-tools_class');

                    $iManufacturerId = Tools::getValue('id_manufacturer');
                    if (!empty($iManufacturerId)) {
                        $oManufacturer = new Manufacturer($iManufacturerId, GAnalyticsPro::$iCurrentLang);
                        $sName .= ': ' . $oManufacturer->name;
                        unset($oManufacturer);
                    }
                    break;
                case 'supplier':
                    $sName = GAnalyticsPro::$oModule->l('Supplier', 'module-tools_class');

                    $iSupplierId = Tools::getValue('id_supplier');
                    if (!empty($iSupplierId)) {
                        $oSupplier = new Supplier($iSupplierId, GAnalyticsPro::$iCurrentLang);
                        $sName .= ': ' . $oSupplier->name;
                        unset($oSupplier);
                    }
                    break;
                case 'search':
                    $sName = GAnalyticsPro::$oModule->l('Search', 'module-tools_class');
                    break;
                case 'bestsales':
                    $sName = GAnalyticsPro::$oModule->l('Best sales', 'module-tools_class');
                    break;
                case 'newproducts':
                    $sName = GAnalyticsPro::$oModule->l('New products', 'module-tools_class');
                    break;
                case 'productscomparison':
                    $sName = GAnalyticsPro::$oModule->l('Products comparison', 'module-tools_class');
                    break;
                case 'order':
                    $sName = self::getStepName($iStep);
                    break;
                default:
                    $sName = GAnalyticsPro::$oModule->l('Index', 'module-tools_class');
                    break;
            }
        }

        return array('ctrl' => $sController, 'display' => $sName);
    }

    /**
     * getStepName() method returns the good matching list name according to the current controller name
     *
     * @param int $iStep
     * @return string
     */
    public static function getStepName($iStep)
    {
        $sName = '';

        switch ($iStep) {
            case 0:
                $sName = GAnalyticsPro::$oModule->l('Review cart', 'module-tools_class');;
                break;
            case 1:
                $sName = GAnalyticsPro::$oModule->l('Address', 'module-tools_class');;
                break;
            case 2:
                $sName = GAnalyticsPro::$oModule->l('Shipping', 'module-tools_class');;
                break;
            case 3:
                $sName = GAnalyticsPro::$oModule->l('Payment', 'module-tools_class');;
                break;
            default:
                break;
        }
        return $sName;
    }


    /**
     * getStepId() method returns the good matching list name according to the current controller name
     *
     * @param int $iCartId
     * @return int
     */
    public static function getStepId($iCartId = 0)
    {
        $iStepId = 0;

        // use case - >= PS 1.7
        if (!empty(GAnalyticsPro::$bCompare17) && $iCartId != 0) {
            // require
            require_once(_GAP_PATH_LIB . 'module-dao_class.php');

            $oCheckout = BT_GapModuleDao::getCartSteps($iCartId);

            if (!empty($oCheckout)) {
                // detect the personal information - step 0
                if (
                    isset($oCheckout['checkout-personal-information-step'])
                    && (isset($oCheckout['checkout-personal-information-step']->step_is_reachable)
                        && $oCheckout['checkout-personal-information-step']->step_is_reachable == 1)
                    && (isset($oCheckout['checkout-personal-information-step']->step_is_complete)
                        && $oCheckout['checkout-personal-information-step']->step_is_complete == 0)
                ) {
                    $iStepId = 0;
                }
                // detect the address information - step 1
                if (
                    isset($oCheckout['checkout-addresses-step'])
                    && (isset($oCheckout['checkout-addresses-step']->step_is_reachable)
                        && $oCheckout['checkout-addresses-step']->step_is_reachable == 1)
                    && (isset($oCheckout['checkout-addresses-step']->step_is_complete)
                        && $oCheckout['checkout-addresses-step']->step_is_complete == 0)
                ) {
                    $iStepId = 1;
                }
                // detect the delivery information - step 2
                if (
                    isset($oCheckout['checkout-delivery-step'])
                    && (isset($oCheckout['checkout-delivery-step']->step_is_reachable)
                        && $oCheckout['checkout-delivery-step']->step_is_reachable == 1)
                    && (isset($oCheckout['checkout-delivery-step']->step_is_complete)
                        && $oCheckout['checkout-delivery-step']->step_is_complete == 0)
                ) {
                    $iStepId = 2;
                }
                // detect the payment information - step 3
                if (
                    isset($oCheckout['checkout-payment-step'])
                    && (isset($oCheckout['checkout-payment-step']->step_is_reachable)
                        && $oCheckout['checkout-payment-step']->step_is_reachable == 1)
                    && (isset($oCheckout['checkout-payment-step']->step_is_complete)
                        && $oCheckout['checkout-payment-step']->step_is_complete == 0)
                ) {
                    $iStepId = 3;
                }
            }
        } // use case - < PS 1.7.
        else {
            $iStepId = (int)Tools::getValue('step');
        }

        return $iStepId;
    }

    /**
     * getHomeProductTabs() method returns all products displayed by home product tabs module
     *
     * @param string $sName
     * @param int $iLimit
     * @return array $aProducts
     */
    public static function getHomeProductTabs($sName, $iLimit)
    {
        // set var
        $aProducts = array();
        $aProductIds = array();

        require_once(_PS_MODULE_DIR_ . $sName . '/conf/hook.conf.php');
        require_once(_PS_MODULE_DIR_ . $sName . '/lib/hook/i-hook_class.php');
        require_once(_PS_MODULE_DIR_ . $sName . '/lib/hook/hook-home_class.php');

        // get the home object
        $oHome = new BT_HookHome('home');

        $aData = $oHome->display(array());

        if (!empty($aData['assign']['aCategories'])) {
            foreach ($aData['assign']['aCategories'] as $aCategory) {
                if (!empty($aCategory['aProducts'])) {
                    $aProducts = array_merge($aProducts, $aCategory['aProducts']);
                }
            }
        }

        foreach ($aProducts as $id => $aProduct) {
            if (!isset($aProductIds[$aProduct['id_product']])) {
                $aProductIds[$aProduct['id_product']] = $aProduct;
            }
        }
        unset($aProducts);

        return $aProductIds;
    }

    /**
     * getHomeFeaturedProducts() method returns all products displayed by home featured module
     *
     * @param string $sName
     * @param int $iLimit
     * @return array $aProducts
     */
    public static function getHomeFeaturedProducts($sName, $iLimit)
    {
        $oCategory = new Category(Context::getContext()->shop->getCategory(), GAnalyticsPro::$iCurrentLang);

        return ($oCategory->getProducts((int)GAnalyticsPro::$iCurrentLang, 1, $iLimit, 'position'));
    }

    /**
     * getNewProducts() method returns all products displayed by block new products module
     *
     * @param string $sName
     * @param int $iLimit
     * @return array $aProducts
     */
    public static function getNewProducts($sName, $iLimit)
    {
        // set var
        $aProducts = array();

        if (
            !Configuration::get('PS_NB_DAYS_NEW_PRODUCT')
            || Configuration::get('PS_BLOCK_NEWPRODUCTS_DISPLAY')
        ) {
            $aProducts = Product::getNewProducts((int)GAnalyticsPro::$iCurrentLang, 0, $iLimit);
        }

        return $aProducts;
    }

    /**
     * getBestSellersProducts() method returns all products displayed by block best sellers module
     *
     * @param string $sName
     * @param int $iLimit
     * @return array $aProducts
     */
    public static function getBestSellersProducts($sName, $iLimit)
    {
        // set var
        $aProducts = array();

        if (
            !Configuration::get('PS_CATALOG_MODE')
            || Configuration::get('PS_BLOCK_BESTSELLERS_DISPLAY')
        ) {
            $aProducts = ProductSale::getBestSalesLight((int)GAnalyticsPro::$iCurrentLang, 0, $iLimit);
        }

        return $aProducts;
    }

    /**
     * getBlockSpecials() method returns all products displayed by block specials module
     *
     * @param string $sName
     * @param int $iLimit
     * @return array $aProducts
     */
    public static function getBlockSpecials($sName, $iLimit)
    {
        // set var
        $aProducts = array();

        if (
            !Configuration::get('BLOCKSPECIALS_SPECIALS_NBR')
            || Configuration::get('PS_BLOCK_SPECIALS_DISPLAY')
        ) {
            $aProducts = Product::getPricesDrop((int)GAnalyticsPro::$iCurrentLang, 0, $iLimit);
        }

        return $aProducts;
    }

    /**
     * translateJsMsg() method returns good translated errors
     */
    public static function translateJsMsg()
    {
        $GLOBALS[_GAP_MODULE_NAME . '_JS_MSG']['gaId'] = GAnalyticsPro::$oModule->l('You have not filled out your Google Analytics ID option', 'module-tools_class');
        $GLOBALS[_GAP_MODULE_NAME . '_JS_MSG']['htmlElement'] = GAnalyticsPro::$oModule->l('You have not filled the html element', 'module-tools_class');
    }

    /**
     * translateJsFrontMsg() method returns good translated errors
     */
    public static function translateJsFrontMsg()
    {
        $GLOBALS[_GAP_MODULE_NAME . '_JS_FRONT_MSG'][1] = GAnalyticsPro::$oModule->l('The module could not retrieve the link detected by the clicked html tag', 'module-tools_class');
        $GLOBALS[_GAP_MODULE_NAME . '_JS_FRONT_MSG'][2] = GAnalyticsPro::$oModule->l('The module could not find the product ID, please refer to the module\'s prerequisites about the data-product-id included in your template files', 'module-tools_class');
    }

    /**
     * translateModulesName() method returns good translated modules name
     */
    public static function translateModulesName()
    {
        $GLOBALS[_GAP_MODULE_NAME . '_MODULES_LIST']['homeproducttabs']['displayName'] = GAnalyticsPro::$oModule->l('Advanced Featured Products', 'module-tools_class');
        $GLOBALS[_GAP_MODULE_NAME . '_MODULES_LIST']['homefeatured']['displayName'] = GAnalyticsPro::$oModule->l('Home featured', 'module-tools_class');
        $GLOBALS[_GAP_MODULE_NAME . '_MODULES_LIST']['blocknewproducts']['displayName'] = GAnalyticsPro::$oModule->l('New products block', 'module-tools_class');
        $GLOBALS[_GAP_MODULE_NAME . '_MODULES_LIST']['blockbestsellers']['displayName'] = GAnalyticsPro::$oModule->l('Top-sellers block', 'module-tools_class');
        $GLOBALS[_GAP_MODULE_NAME . '_MODULES_LIST']['blockspecials']['displayName'] = GAnalyticsPro::$oModule->l('Special block', 'module-tools_class');
    }

    /**
     * translateLabelFormat() method sets display label format's titles
     */
    public static function translateLabelFormat()
    {
        $GLOBALS[_GAP_MODULE_NAME . '_LABEL_FORMAT']['short'] = GAnalyticsPro::$oModule->l('Current category name (short format)', 'module-tools_class');
        $GLOBALS[_GAP_MODULE_NAME . '_LABEL_FORMAT']['long'] = GAnalyticsPro::$oModule->l('Full breadcrumb (long format)', 'module-tools_class');
    }

    /**
     * checkTemplateFile() method check if a string is present into a template file
     *
     * @param string $sTemplateFileDir
     * @param string $sPattern
     * @return bool
     */
    public static function checkTemplateFile($sTemplateFileDir, $sPattern)
    {
        $bReturn = false;

        // detect template file
        if (file_exists($sTemplateFileDir)) {
            $sFileContent = file_get_contents($sTemplateFileDir);

            $bReturn = !strstr($sFileContent, $sPattern) ? false : true;
        } else {
            $bReturn;
        }

        return $bReturn;
    }


    /**
     * updateConfiguration() method update new keys in new module version
     */
    public static function updateConfiguration()
    {
        // check to update new module version
        foreach ($GLOBALS[_GAP_MODULE_NAME . '_CONFIGURATION'] as $sKey => $mVal) {
            // use case - not exists
            if (Configuration::get($sKey) === false) {
                // update key/ value
                Configuration::updateValue($sKey, $mVal);
            }
        }
    }

    /**
     * getConfiguration() method set all constant module in ps_configuration
     *
     * @param int $iShopId
     */
    public static function getConfiguration($iShopId = null)
    {
        // get configuration options
        if (null !== $iShopId && is_numeric($iShopId)) {
            GAnalyticsPro::$aConfiguration = Configuration::getMultiple(array_keys($GLOBALS[_GAP_MODULE_NAME . '_CONFIGURATION']), null, null, $iShopId);
        } else {
            GAnalyticsPro::$aConfiguration = Configuration::getMultiple(array_keys($GLOBALS[_GAP_MODULE_NAME . '_CONFIGURATION']));
        }
    }

    /**
     * isActiveLang() method defines if the language is active
     *
     * @param mixed $mLang
     * @return bool
     */
    public static function isActiveLang($mLang)
    {
        if (is_numeric($mLang)) {
            $sField = 'id_lang';
        } else {
            $sField = 'iso_code';
            $mLang = strtolower($mLang);
        }

        $mResult = Db::getInstance()->getValue('SELECT count(*) FROM `' . _DB_PREFIX_ . 'lang` WHERE active = 1 AND `' . $sField . '` = "' . pSQL($mLang) . '"');

        return (!empty($mResult) ? true : false);
    }

    /**
     * getLangIso() method set good iso lang
     *
     * @return string
     */
    public static function getLangIso($iLangId = null)
    {
        if (null === $iLangId) {
            $iLangId = GAnalyticsPro::$iCurrentLang;
        }

        // get iso lang
        $sIsoLang = Language::getIsoById($iLangId);

        if (false === $sIsoLang) {
            $sIsoLang = 'en';
        }
        return $sIsoLang;
    }

    /**
     * getLangId() method return Lang id from iso code
     *
     * @param string $sIsoCode
     * @return int
     */
    public static function getLangId($sIsoCode, $iDefaultId = null)
    {
        // get iso lang
        $iLangId = Language::getIdByIso($sIsoCode);

        if (empty($iLangId) && $iDefaultId !== null) {
            $iLangId = $iDefaultId;
        }
        return $iLangId;
    }

    /**
     * getCurrency() method returns current currency sign or id
     *
     * @param string $sField : field name has to be returned
     * @param string $iCurrencyId : currency id
     * @return mixed : string or array
     */
    public static function getCurrency($sField = null, $iCurrencyId = null)
    {
        // set
        $mCurrency = null;

        // get currency id
        if (null === $iCurrencyId) {
            $iCurrencyId = Configuration::get('PS_CURRENCY_DEFAULT');
        }

        $aCurrency = Currency::getCurrency($iCurrencyId);

        if ($sField !== null) {
            switch ($sField) {
                case 'id_currency':
                    $mCurrency = $aCurrency['id_currency'];
                    break;
                case 'name':
                    $mCurrency = $aCurrency['name'];
                    break;
                case 'iso_code':
                    $mCurrency = $aCurrency['iso_code'];
                    break;
                case 'iso_code_num':
                    $mCurrency = $aCurrency['iso_code_num'];
                    break;
                case 'sign':
                    if (empty($aCurrency['sign'])) {
                        $oCurrency = new Currency($iCurrencyId);
                        if (!empty($oCurrency)) {
                            $mCurrency = $oCurrency->getSign();
                        }
                        unset($oCurrency);
                    } else {
                        $mCurrency = $aCurrency['sign'];
                    }
                    break;
                case 'conversion_rate':
                    $mCurrency = $aCurrency['conversion_rate'];
                    break;
                case 'format':
                    if (empty($aCurrency['sign'])) {
                        $oCurrency = new Currency($iCurrencyId);
                        if (!empty($oCurrency)) {
                            $mCurrency = $oCurrency->format;
                        }
                        unset($oCurrency);
                    } else {
                        $mCurrency = $aCurrency['format'];
                    }
                    break;
                default:
                    $mCurrency = $aCurrency;
                    break;
            }
        }

        return $mCurrency;
    }

    /**
     * getOrderSource() method get the order source
     * @param int $iOrderId
     * @return string
     */
    public static function getOrderSource($iOrderId)
    {
        // use case - get order source
        $sSource = ConnectionsSource::getOrderSources($iOrderId);

        return (!empty($sSource[0]['http_referer']) ? parse_url($sSource[0]['http_referer'], PHP_URL_HOST) : '');
    }

    /**
     * getVoucher() method get the order's voucher code
     * @param obj $oOrder
     * @return string
     */
    public static function getVoucher($oOrder)
    {
        $aVoucher = $oOrder->getCartRules();

        return (!empty($aVoucher[0]['name']) ? $aVoucher[0]['name'] : '');
    }

    /**
     * setUserId() method set a random user ID according to the Google API protocol
     *
     * @return string
     */
    public static function setUserId()
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff)
        );
    }


    /**
     * getProductPrice() method returns the good price to display as the front-office
     *
     * @param int $iProductId
     * @param int $iAttributeId
     * @param int $iAttributeId
     * @return float
     */
    public static function getProductPrice($iProductId, $iAttributeId = null, $iCustomerId = null)
    {
        $fPrice = 0.00;

        // get the tx method
        $bUseTax = Product::getTaxCalculationMethod($iCustomerId) != PS_TAX_EXC;

        $fProductDiscountedPrice = Product::getPriceStatic((int)$iProductId, $bUseTax, $iAttributeId, 6);
        $fProductSalePrice = Product::getPriceStatic((int)$iProductId, $bUseTax, $iAttributeId, 6, null, false, false);

        // use case - test if the discounted price is lower than the sale price
        if ($fProductDiscountedPrice < $fProductSalePrice) {
            $fPrice = self::round($fProductDiscountedPrice, _PS_PRICE_DISPLAY_PRECISION_);
        } else {
            $fPrice = self::round($fProductSalePrice, _PS_PRICE_DISPLAY_PRECISION_);
        }

        return $fPrice;
    }

    /**
     * getTimeStamp() method returns timestamp
     *
     * @param string $sDate
     * @param string $sType
     * @return mixed : bool or int
     */
    public static function getTimeStamp($sDate, $sType = 'en')
    {
        // set variable
        $iTimeStamp = false;

        // get date
        $aTmpDate = explode(' ', str_replace(array('-', '/', ':'), ' ', $sDate));

        if (count($aTmpDate) > 1) {
            if ($sType == 'en') {
                $iTimeStamp = mktime(0, 0, 0, $aTmpDate[0], $aTmpDate[1], $aTmpDate[2]);
            } elseif ($sType == 'db') {
                $iTimeStamp = mktime(0, 0, 0, $aTmpDate[1], $aTmpDate[2], $aTmpDate[0]);
            } else {
                $iTimeStamp = mktime(0, 0, 0, $aTmpDate[1], $aTmpDate[0], $aTmpDate[2]);
            }
        }
        // destruct
        unset($aTmpDate);

        return $iTimeStamp;
    }

    /**
     * getUntilDate() method returns valid ISO format date
     *
     * @param string $sDate
     * @param string $sType
     * @return string
     */
    public static function getUntilDate($sDate, $sType = 'en')
    {
        // set
        $sUntilDate = '';

        // get timestamp
        $iTimestamp = self::getTimeStamp($sDate, $sType);

        if ($iTimestamp && $iTimestamp > time()) {
            $sUntilDate = date('Y-m-d', $iTimestamp);
        }

        return $sUntilDate;
    }

    /**
     * formatTimestamp() method returns a formatted date
     *
     * @param int $iTimestamp
     * @param mixed $mLocale
     * @param string $sLangIso
     * @return string
     */
    public static function formatTimestamp($iTimestamp, $sTemplate = null, $mLocale = false, $sLangIso = null)
    {
        // set
        $sDate = '';

        if ($mLocale !== false) {
            if (null === $sTemplate) {
                $sTemplate = '%d %h. %Y';
            }
            // set date with locale format
            $sDate = strftime($sTemplate, $iTimestamp);
        } else {
            // get Lang ISO
            $sLangIso = ($sLangIso !== null) ? $sLangIso : GAnalyticsPro::$sCurrentLang;

            switch ($sTemplate) {
                case 'snippet':
                    $sDate = date('d', $iTimestamp) . ' ' . (!empty($GLOBALS[_GAP_MODULE_NAME . '_MONTH'][$sLangIso]) ? $GLOBALS[_GAP_MODULE_NAME . '_MONTH'][$sLangIso]['long'][date('n', $iTimestamp)] : date('M', $iTimestamp)) . ' ' . date('Y', $iTimestamp);
                    break;
                default:
                    // set date with matching month or with default language
                    $sDate = date('d', $iTimestamp) . ' ' . (!empty($GLOBALS[_GAP_MODULE_NAME . '_MONTH'][$sLangIso]) ? $GLOBALS[_GAP_MODULE_NAME . '_MONTH'][$sLangIso]['short'][date('n', $iTimestamp)] : date('M', $iTimestamp)) . ' ' . date('Y', $iTimestamp);
                    break;
            }
        }
        return $sDate;
    }


    /**
     * getPageName() method returns formatted URI for page name type
     *
     * @return mixed
     */
    public static function getPageName()
    {
        $sScriptName = '';

        // use case - script name filled
        if (!empty($_SERVER['SCRIPT_NAME'])) {
            $sScriptName = $_SERVER['SCRIPT_NAME'];
        } // use case - php_self filled
        elseif ($_SERVER['PHP_SELF']) {
            $sScriptName = $_SERVER['PHP_SELF'];
        } // use case - default script name
        else {
            $sScriptName = 'index.php';
        }
        return (substr(basename($sScriptName), 0, strpos(basename($sScriptName), '.')));
    }

    /**
     * getTemplatePath() method returns template path
     *
     * @param string $sTemplate
     * @param bool $bForceManual
     * @param string $sModuleName
     * @return string
     */
    public static function getTemplatePath($sTemplate, $bForceManual = false, $sModuleName = '')
    {
        // set
        $mTemplatePath = null;

        if (
            version_compare(_PS_VERSION_, '1.5', '>')
            && $bForceManual == false
        ) {
            $mTemplatePath = GAnalyticsPro::$oModule->getTemplatePath($sTemplate);
        } else {
            empty($sModuleName) ? $sModuleName = GAnalyticsPro::$oModule->name : '';

            if (file_exists(_PS_THEME_DIR_ . 'modules/' . $sModuleName . '/' . $sTemplate)) {
                $mTemplatePath = _PS_THEME_DIR_ . 'modules/' . $sModuleName . '/' . $sTemplate;
            } elseif (file_exists(_PS_MODULE_DIR_ . $sModuleName . '/' . $sTemplate)) {
                $mTemplatePath = _PS_MODULE_DIR_ . $sModuleName . '/' . $sTemplate;
            }
        }

        return $mTemplatePath;
    }

    /**
     * getLinkObj() method returns link object
     *
     * @return obj
     */
    public static function getLinkObj()
    {
        return GAnalyticsPro::$oModule->context->link;
    }

    /**
     * getLoginLink() method returns link object
     *
     * @param string $sURI : relative URI
     * @return obj
     */
    public static function getLoginLink($sURI)
    {
        // for 1.5
        if (version_compare(_PS_VERSION_, '1.5', '>')) {
            $sLoginURI = BT_GapModuleTools::getLinkObj()->getPageLink('authentication', true) . (Configuration::get('PS_REWRITING_SETTINGS') ? '?' : '&') . 'back=' . urlencode(self::detectHttpUri($sURI));
        } // over 1.4
        elseif (version_compare(_PS_VERSION_, '1.4', '>')) {
            $sLoginURI = '/authentication.php?back=' . urlencode($sURI);
        } // under 1.4
        else {
            $sURI = substr($sURI, 1, strlen($sURI));
            $sLoginURI = '/authentication.php?back=' . urlencode($sURI);
        }

        return $sLoginURI;
    }

    /**
     * getProductImage() method returns product image
     *
     * @param obj $oProduct
     * @param string $sImageType
     * @return obj
     */
    public static function getProductImage(Product &$oProduct, $sImageType)
    {
        $sImgUrl = '';

        if (Validate::isLoadedObject($oProduct)) {
            // use case - get Image
            $aImage = Image::getCover($oProduct->id);

            if (!empty($aImage)) {
                // get image url
                $sImgUrl = self::getLinkObj()->getImageLink($oProduct->link_rewrite, $oProduct->id . '-' . $aImage['id_image'], $sImageType);

                // use case - get valid IMG URI before  Prestashop 1.4
                $sImgUrl = self::detectHttpUri($sImgUrl);
            }
        }
        return $sImgUrl;
    }

    /**
     * detectHttpUri() method detects and returns available URI - resolve Prestashop compatibility
     *
     * @param string $sURI
     * @param string $sForceDomain
     * @return mixed
     */
    public static function detectHttpUri($sURI, $sForceDomain = '')
    {
        // use case - only with relative URI
        if (!strstr($sURI, 'http')) {
            $sURI = 'http' . (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 's' : '') . '://' . ($sForceDomain != '' ? $sForceDomain : $_SERVER['HTTP_HOST']) . $sURI;
        }
        return $sURI;
    }

    /**
     * truncateUri() method truncate current request_uri in order to delete params : sAction and sType
     *
     * @param mixed: string or array $mNeedle
     * @return mixed
     */
    public static function truncateUri($mNeedle = '&sAction')
    {
        // set tmp
        $aQuery = is_array($mNeedle) ? $mNeedle : array($mNeedle);

        // get URI
        $sURI = $_SERVER['REQUEST_URI'];

        foreach ($aQuery as $sNeedle) {
            $sURI = strstr($sURI, $sNeedle) ? substr($sURI, 0, strpos($sURI, $sNeedle)) : $sURI;
        }
        return $sURI;
    }

    /**
     * jsonEncode() method detects available method and apply json encode
     *
     * @return string
     */
    public static function jsonEncode($aData)
    {
        if (function_exists('json_encode')) {
            $aData = json_encode($aData);
        } elseif (method_exists('Tools', 'jsonEncode')) {
            $aData = Tools::jsonEncode($aData);
        } else {
            if (is_null($aData)) {
                return 'null';
            }
            if ($aData === false) {
                return 'false';
            }
            if ($aData === true) {
                return 'true';
            }
            if (is_scalar($aData)) {
                $aData = addslashes($aData);
                $aData = str_replace("\n", '\n', $aData);
                $aData = str_replace("\r", '\r', $aData);
                $aData = preg_replace('{(</)(script)}i', "$1'+'$2", $aData);
                return "'$aData'";
            }
            $isList = true;
            for ($i = 0, reset($aData); $i < count($aData); $i++, next($aData)) {
                if (key($aData) !== $i) {
                    $isList = false;
                    break;
                }
            }
            $result = array();

            if ($isList) {
                foreach ($aData as $v) {
                    $result[] = self::json_encode($v);
                }
                $aData = '[ ' . join(', ', $result) . ' ]';
            } else {
                foreach ($aData as $k => $v) {
                    $result[] = self::json_encode($k) . ': ' . self::json_encode($v);
                }
                $aData = '{ ' . join(', ', $result) . ' }';
            }
        }

        return $aData;
    }

    /**
     * jsonDecode() method detects available method and apply json decode
     *
     * @return mixed
     */
    public static function jsonDecode($aData)
    {
        if (function_exists('json_decode')) {
            $aData = json_decode($aData);
        } elseif (method_exists('Tools', 'jsonDecode')) {
            $aData = Tools::jsonDecode($aData);
        }
        return $aData;
    }

    /**
     * method check if specific module and module's vars are available
     *
     * @param int $sModuleName
     * @param array $aCheckedVars
     * @param bool $bObjReturn
     * @param bool $bOnlyInstalled
     * @return mixed : true or false or obj
     */
    public static function isInstalled($sModuleName, array $aCheckedVars = array(), $bObjReturn = false, $bOnlyInstalled = false)
    {
        $mReturn = false;

        // use case - check module is installed in DB
        if (Module::isInstalled($sModuleName)) {
            if (!$bOnlyInstalled) {
                $oModule = Module::getInstanceByName($sModuleName);

                if (!empty($oModule)) {
                    // check if module is activated
                    $aActivated = Db::getInstance()->ExecuteS('SELECT id_module as id, active FROM ' . _DB_PREFIX_ . 'module WHERE name = "' . pSQL($sModuleName) . '" AND active = 1');

                    if (!empty($aActivated[0]['active'])) {
                        $mReturn = true;

                        if (version_compare(_PS_VERSION_, '1.5', '>')) {
                            $aActivated = Db::getInstance()->ExecuteS('SELECT * FROM ' . _DB_PREFIX_ . 'module_shop WHERE id_module = ' . pSQL($aActivated[0]['id']) . ' AND id_shop = ' . Context::getContext()->shop->id);

                            if (empty($aActivated)) {
                                $mReturn = false;
                            }
                        }

                        if ($mReturn) {
                            if (!empty($aCheckedVars)) {
                                foreach ($aCheckedVars as $sVarName) {
                                    $mVar = Configuration::get($sVarName);

                                    if (empty($mVar)) {
                                        $mReturn = false;
                                    }
                                }
                            }
                        }
                    }
                }
                if ($mReturn && $bObjReturn) {
                    $mReturn = $oModule;
                }
                unset($oModule);
            } else {
                $mReturn = true;
            }
        }
        return $mReturn;
    }

    /**
     * isProductObj() method check if the product is a valid obj
     *
     * @param int $iProdId
     * @param int $iLangId
     * @param bool $bObjReturn
     * @param bool $bAllProperties
     * @return mixed : true or false
     */
    public static function isProductObj($iProdId, $iLangId, $bObjReturn = false, $bAllProperties = false)
    {
        // set
        $bReturn = false;

        $oProduct = new Product($iProdId, $bAllProperties, $iLangId);

        if (Validate::isLoadedObject($oProduct)) {
            $bReturn = true;
        }

        return (!empty($bObjReturn) && $bReturn ? $oProduct : $bReturn);
    }

    /**
     * getProductPath() method write breadcrumbs of product for category
     *
     * @param int $iCatId
     * @param int $iCatId
     * @return string
     */
    public static function getProductPath($iCatId, $iLangId)
    {
        $oCategory = new Category($iCatId);

        return (
            (Validate::isLoadedObject($oCategory) ? str_replace('>', ' &gt; ', strip_tags(self::getPath((int)($oCategory->id), (int)($iLangId)))) : ''));
    }

    /**
     * getPath() method write breadcrumbs of product for category
     *
     * Forced to redo the function from Tools here as it works with cookie
     * for language, not a passed parameter in the function
     *
     * @param int $iCatId
     * @param int $iLangId
     * @param string $sPath
     * @param string $sForcePipe
     * @param bool $bHtml
     * @return string
     */
    public static function getPath($iCatId, $iLangId, $sPath = '', $sForcePipe = '', $bHtml = true)
    {
        $mReturn = '';

        if ($iCatId == 1) {
            $mReturn = $sPath;
        } else {
            // get pipe
            if (empty($sForcePipe)) {
                $sPipe = Configuration::get('PS_NAVIGATION_PIPE');

                if (empty($sPipe)) {
                    $sPipe = '>';
                }
            } else {
                $sPipe = $sForcePipe;
            }

            $sFullPath = '';

            if (version_compare(_PS_VERSION_, '1.5.6.0', '<')) {
                $aCurrentCategory = Db::getInstance()->getRow(
                    '
                    SELECT id_category, level_depth, nleft, nright
                    FROM ' . _DB_PREFIX_ . 'category
                    WHERE id_category = ' . (int)$iCatId
                );

                if (isset($aCurrentCategory['id_category'])) {
                    $sQuery = 'SELECT c.id_category, cl.name, cl.link_rewrite FROM ' . _DB_PREFIX_ . 'category c';

                    // use case 1.5
                    if (version_compare(_PS_VERSION_, '1.5', '>')) {
                        Shop::addSqlAssociation('category', 'c', false);
                    }

                    $sQuery .= ' LEFT JOIN ' . _DB_PREFIX_ . 'category_lang cl ON (cl.id_category = c.id_category AND cl.`id_lang` = ' . (int)($iLangId) . (version_compare(
                        _PS_VERSION_,
                        '1.5',
                        '>'
                    ) ? Shop::addSqlRestrictionOnLang('cl') : '') . ')';

                    $sQuery .= '
                        WHERE c.nleft <= ' . (int)$aCurrentCategory['nleft'] . ' AND c.nright >= ' . (int)$aCurrentCategory['nright'] . ' AND cl.id_lang = ' . (int)($iLangId) . ' AND c.id_category != 1
                        ORDER BY c.level_depth ASC
                        LIMIT ' . (int)$aCurrentCategory['level_depth'];

                    $aCategories = Db::getInstance()->ExecuteS($sQuery);

                    $iCount = 1;
                    $nCategories = count($aCategories);

                    foreach ($aCategories as $aCategory) {
                        if ($bHtml) {
                            $sFullPath .= htmlentities($aCategory['name'], ENT_NOQUOTES, 'UTF-8')
                                . (($iCount++ != $nCategories or !empty($sPath)) ? '<span class="navigation-pipe">' . $sPipe . '</span>' : '');
                        } else {
                            $sFullPath .= $aCategory['name'] . (($iCount++ != $nCategories or !empty($sPath)) ? $sPipe : '');
                        }
                    }
                    $mReturn = $sFullPath . $sPath;
                }
            } else {
                $aInterval = Category::getInterval($iCatId);
                $aIntervalRoot = Category::getInterval(Context::getContext()->shop->getCategory());

                if (!empty($aInterval) && !empty($aIntervalRoot)) {
                    $sQuery = 'SELECT c.id_category, cl.name, cl.link_rewrite'
                        . ' FROM ' . _DB_PREFIX_ . 'category c'
                        . (version_compare(_PS_VERSION_, '1.5', '>') ? Shop::addSqlAssociation(
                            'category',
                            'c',
                            false
                        ) : '')
                        . ' LEFT JOIN ' . _DB_PREFIX_ . 'category_lang cl ON (cl.id_category = c.id_category' . Shop::addSqlRestrictionOnLang('cl') . ')'
                        . 'WHERE c.nleft <= ' . $aInterval['nleft']
                        . ' AND c.nright >= ' . $aInterval['nright']
                        . ' AND c.nleft >= ' . $aIntervalRoot['nleft']
                        . ' AND c.nright <= ' . $aIntervalRoot['nright']
                        . ' AND cl.id_lang = ' . (int)$iLangId
                        . ' AND c.level_depth > ' . (int)$aIntervalRoot['level_depth']
                        . ' ORDER BY c.level_depth ASC';

                    $aCategories = Db::getInstance()->executeS($sQuery);

                    $iCount = 1;
                    $nCategories = count($aCategories);

                    foreach ($aCategories as $aCategory) {
                        if ($bHtml) {
                            $sFullPath .= htmlentities($aCategory['name'], ENT_NOQUOTES, 'UTF-8')
                                . (($iCount++ != $nCategories or !empty($sPath)) ? '<span class="navigation-pipe">' . $sPipe . '</span>' : '');
                        } else {
                            $sFullPath .= $aCategory['name'] . (($iCount++ != $nCategories or !empty($sPath)) ? $sPipe : '');
                        }
                    }
                    $mReturn = $sFullPath . $sPath;
                }
            }
        }
        return $mReturn;
    }

    /**
     * getSortDesc() method returns configured desc
     *
     * @return array
     */
    public static function getSortDesc()
    {
        // set variables
        $aTmpDesc = array();

        if (!empty(GAnalyticsPro::$aConfiguration[_GAP_MODULE_NAME . '_SORT_DESC'])) {
            $aDescPosition = unserialize(GAnalyticsPro::$aConfiguration[_GAP_MODULE_NAME . '_SORT_DESC']);
        } else {
            $aDescPosition = array('meta', 'short', 'long');
        }
        foreach ($aDescPosition as $sDesc) {
            $aTmpDesc[$sDesc] = $GLOBALS[_GAP_MODULE_NAME . '_SORT_DESC'][$sDesc];
        }
        // destruct
        unset($aDescPosition);

        return ($aTmpDesc);
    }

    /**
     * recursiveCategoryTree() method process categories to generate tree of them
     *
     * @param array $aCategories
     * @param array $aIndexedCat
     * @param array $aCurrentCat
     * @param int $iCurrentIndex
     * @param int $iDefaultId
     * @return array
     */
    public static function recursiveCategoryTree(array $aCategories, array $aIndexedCat, $aCurrentCat, $iCurrentIndex = 1, $iDefaultId = null)
    {
        // set variables
        static $_aTmpCat;
        static $_aFormatCat;

        if ($iCurrentIndex == 1) {
            $_aTmpCat = null;
            $_aFormatCat = null;
        }

        if (!isset($_aTmpCat[$aCurrentCat['infos']['id_parent']])) {
            $_aTmpCat[$aCurrentCat['infos']['id_parent']] = 0;
        }
        $_aTmpCat[$aCurrentCat['infos']['id_parent']] += 1;

        // calculate new level
        $aCurrentCat['infos']['iNewLevel'] = $aCurrentCat['infos']['level_depth'] + (version_compare(_PS_VERSION_, '1.5.0') != -1 ? 0 : 1);

        // calculate type of gif to display - displays tree in good
        $aCurrentCat['infos']['sGifType'] = (count($aCategories[$aCurrentCat['infos']['id_parent']]) == $_aTmpCat[$aCurrentCat['infos']['id_parent']] ? 'f' : 'b');

        // calculate if checked
        if (in_array($iCurrentIndex, $aIndexedCat)) {
            $aCurrentCat['infos']['bCurrent'] = true;
        } else {
            $aCurrentCat['infos']['bCurrent'] = false;
        }

        // define classname with default cat id
        $aCurrentCat['infos']['mDefaultCat'] = ($iDefaultId === null) ? 'default' : $iCurrentIndex;

        $_aFormatCat[] = $aCurrentCat['infos'];

        if (isset($aCategories[$iCurrentIndex])) {
            foreach ($aCategories[$iCurrentIndex] as $iCatId => $aCat) {
                if ($iCatId != 'infos') {
                    self::recursiveCategoryTree($aCategories, $aIndexedCat, $aCategories[$iCurrentIndex][$iCatId], $iCatId);
                }
            }
        }
        return $_aFormatCat;
    }


    /**
     * round() method round on numeric
     *
     * @param float $fVal
     * @param int $iPrecision
     * @return float
     */
    public static function round($fVal, $iPrecision = 2)
    {
        if (method_exists('Tools', 'ps_round')) {
            $fVal = Tools::ps_round($fVal, $iPrecision);
        } else {
            $fVal = round($fVal, $iPrecision);
        }

        return $fVal;
    }


    /**
     * checkGroupMultiShop() method check if multi-shop is activated and if the group or global context is used
     *
     * @return bool
     */
    public static function checkGroupMultiShop()
    {
        return (Configuration::get('PS_MULTISHOP_FEATURE_ACTIVE')
            && empty(GAnalyticsPro::$oCookie->shopContext));
    }

    /**
     * method returns price by considering the merchant option in the back office
     * @param array $aParams
     * @param bool $bUseTax
     * @param bool $bUseShippings
     * @param bool $bUseWrapping
     * @return float
     */
    public static function getOrderPrice($aParams, $bUseTax, $bUseShipping, $bUseWrapping)
    {
        $fOderAmount = 0.0;

        if (!empty($aParams)) {
            //case with tax
            if (!empty($bUseTax)) {
                if (!empty($bUseShipping) && !empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_paid;
                } elseif (empty($bUseShipping) && !empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_paid - $aParams->total_shipping_tax_incl;
                } elseif (!empty($bUseShipping) && empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_paid - $aParams->total_wrapping_tax_incl;
                } elseif (empty($bUseShipping) && empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_paid - $aParams->total_wrapping_tax_incl - $aParams->total_shipping_tax_incl;
                }
            } //case without tax
            elseif (empty($bUseTax)) {
                if (!empty($bUseShipping) && !empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_paid_tax_excl;
                } elseif (empty($bUseShipping) && !empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_products + $aParams->total_wrapping_tax_excl;
                } elseif (!empty($bUseShipping) && empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_products + $aParams->total_shipping_tax_excl;
                } elseif (empty($bUseShipping) && empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_products;
                }
            }
        }

        return $fOderAmount;
    }


    /**
     * method returns the consent status
     * @return int
     */
    public static function getConsentStatus()
    {
        $iConsentLvl = 0;

        // Use case with ACB module
        if (!empty(BT_GapModuleTools::isInstalled('pm_advancedcookiebanner'))) {
            $iConsentLvl = AcbCookie::getConsentLevel();
        } else {
            // Use case with the trigger click event on accept all button
            $iConsentLvl = isset(Context::getContext()->cookie->bt_gap_consent_lvl) ? Context::getContext()->cookie->bt_gap_consent_lvl : 0;
        }

        return $iConsentLvl;
    }

    /**
     * return the array of element for reset HTML element according to the 
     * @return array
     */
    public static function resetHtmlSelector()
    {
        $aSelectorDefault = array();
        
        // use case 1.7.0 to 1.7.8
        if (!empty(GAnalyticsPro::$bCompare17)) {

            $aSelectorDefault = array(
                'add_to_cart' => '.add-to-cart',
                'category' => 'li.product-miniature',
                'remove_cart' => 'a.remove-from-cart',
                'shipping' => 'input[type=radio]',
                'payment' => '.ps-shown-by-js',
                'add_to_cart_list' => 'a[rel="ajax_id_product__PRODUCT_ID_"].ajax_add_to_cart_button',
                'order_selector' => '.btn-primary',
                'login' => 'button#submit-login',
                'signup' => 'div.no-account',
                'wish_cat' => 'button.wishlist-button-add',
                'wish_prod' => 'button.wishlist-button-product',
            );
        }

        if (!empty(GAnalyticsPro::$bCompare1780)) {

            $aSelectorDefault = array(
                'add_to_cart' => 'button.add-to-cart',
                'category' => 'article.product-miniature',
                'remove_cart' => 'a.remove-from-cart',
                'shipping' => 'input[type=radio]',
                'payment' => '.ps-shown-by-js',
                'add_to_cart_list' => 'a[rel="ajax_id_product__PRODUCT_ID_"].ajax_add_to_cart_button',
                'order_selector' => '.btn-primary',
                'login' => 'button#submit-login',
                'signup' => 'div.no-account',
                'wish_cat' => 'button.wishlist-button-add',
                'wish_prod' => 'button.wishlist-button-product',
            );
        }

        return $aSelectorDefault;
    }
}
