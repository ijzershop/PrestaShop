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

namespace GanalyticsPro\ModuleLib;

use GanalyticsPro\Tag\baseTag;
use GanalyticsPro\Models\orderRefund;
use GanalyticsPro\Models\orderPartialRefund;
use GanalyticsPro\Configuration\moduleConfiguration;

class moduleTools
{
    /**
     * detectCurrentPage() method returns current page type
     */
    public static function detectCurrentPage()
    {
        // Get the current step of the checkout process
        $iStep = self::getStepId((int) \Context::getContext()->cart->id);
        // use case - home page
        if (\Tools::getValue('controller') == 'index') {
            $sCurrentTypePage = 'home';
        } // use case - search results page
        elseif (\Tools::getValue('controller') == 'search' && empty(\Context::getContext()->controller->module)) {
            $sCurrentTypePage = 'search';
        } // use case - order page
        elseif (\Tools::getValue('controller') == 'order'
            || \Tools::getValue('controller') == 'orderopc') {
            if (isset(\Context::getContext()->controller->page_name)) {
                if (\Context::getContext()->controller->page_name == 'checkout') {
                    $sCurrentTypePage = 'checkout';
                } else {
                    $sCurrentTypePage = 'cart';
                }
            } else {
                $sCurrentTypePage = 'cart';
            }
            // Use case handle the placeOrder information
            if ($iStep == 2 && \Tools::getValue('controller') == 'order') {
                $sCurrentTypePage = 'shipping';
            }

            // Use case handle the AddPayment information
            if ($iStep == 3) {
                $sCurrentTypePage = 'payment';
            }
        } // use case - order confirmation page
        elseif (\Tools::getValue('controller') == 'orderconfirmation' && \Tools::getValue('id_order') != false) {
            $sCurrentTypePage = 'purchase';
        } elseif ((\Tools::getValue('controller') == 'submit') || \Tools::getValue('controller') == 'orderconfirmation') {
            $sCurrentTypePage = 'purchase';
        } // use case - category page
        elseif (\Tools::getvalue('id_category')) {
            $sCurrentTypePage = 'category';
        } // use case - product page
        elseif (\Tools::getvalue('id_product')) {
            $sCurrentTypePage = 'product';
        } elseif (\Tools::getValue('controller') == 'manufacturer') {
            $sCurrentTypePage = 'other';
        } elseif (\Tools::getValue('controller') == 'pricesdrop') {
            $sCurrentTypePage = 'promotion';
        } elseif (\Tools::getValue('controller') == 'newproducts') {
            $sCurrentTypePage = 'newproducts';
        } elseif (\Tools::getValue('controller') == 'bestsales') {
            $sCurrentTypePage = 'bestsales';
        } elseif (\Tools::getValue('controller') == 'cart') {
            $sCurrentTypePage = 'cart';
        } elseif (\Tools::getValue('controller') == 'contact') {
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
            \Shop::addSqlRestriction();

        $result = \Db::getInstance()->getValue($sql);

        return !empty($result) ? (int) $result : false;
    }

    /**
     * build the display tag
     *
     * @param array $aDynTags
     * @param array $sPageType
     *
     * @return array $aAssign all tag information
     *
     * @throws
     */
    public static function buildDynDisplayTag($aDynTags, $sPageType)
    {
        // get the pixel information
        $oTagsCtrl = baseTag::get($sPageType, $aDynTags);
        $oTagsCtrl->set();
        return $oTagsCtrl->display();
    }

    /**
     * getCategory( method get the category name according whit the option
     *
     * @param int $iCategoryId
     *
     * @return array
     */
    public static function getCategoryName($iCategoryId)
    {
        $sName = '';
        $oCategory = new \Category($iCategoryId, \GAnalyticsPro::$iCurrentLang);
        $breadcrumbs = \Context::getContext()->smarty->GetTemplateVars('breadcrumb');

        if (\GAnalyticsPro::$aConfiguration['GAP_CAT_LABEL_FORMAT'] == 'short') {
            $sName .= $oCategory->name;
        } else {
            if (isset($breadcrumbs['links'])) {
                if (is_array($breadcrumbs['links']) && !empty($breadcrumbs['links'])) {
                    $lastElement = end($breadcrumbs['links']);
                    foreach ($breadcrumbs['links'] as $data) {
                        $sName .= $data['title'];
                        if ($data != $lastElement) {
                            $sName .= '>';
                        }
                    }
                }
            } else {
                $sName .= $oCategory->name;
            }
        }
        return $sName;
    }

    /**
     * getStepId() method returns the good matching list name according to the current controller name
     *
     * @param int $iCartId
     *
     * @return int
     */
    public static function getStepId($iCartId = 0)
    {
        $iStepId = 0;

        // use case - >= PS 1.7
        if (!empty(\GAnalyticsPro::$bCompare17) && $iCartId != 0) {
            $oCheckout = moduleDao::getCartSteps($iCartId);

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
            $iStepId = (int) \Tools::getValue('step');
        }

        return $iStepId;
    }

    /**
     * translateJsMsg() method returns good translated errors
     */
    public static function translateJsMsg()
    {
    }

    /**
     * translateJsFrontMsg() method returns good translated errors
     */
    public static function translateJsFrontMsg()
    {
    }

    /**
     * translateLabelFormat() method sets display label format's titles
     */
    public static function translateLabelFormat()
    {
        $GLOBALS['GAP_LABEL_FORMAT']['short'] = \GAnalyticsPro::$oModule->l('Current category name (short format)', 'module-tools_class');
        $GLOBALS['GAP_LABEL_FORMAT']['long'] = \GAnalyticsPro::$oModule->l('Full breadcrumb (long format)', 'module-tools_class');
    }

    /**
     * updateConfiguration() method update new keys in new module version
     */
    public static function updateConfiguration()
    {
        // check to update new module version
        foreach (moduleConfiguration::getConfVar() as $sKey => $mVal) {
            // use case - not exists
            if (\Configuration::get($sKey) === false) {
                // update key/ value
                \Configuration::updateValue($sKey, $mVal);
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
            \GAnalyticsPro::$aConfiguration = \Configuration::getMultiple(array_keys(moduleConfiguration::getConfVar()), null, null, $iShopId);
        } else {
            \GAnalyticsPro::$aConfiguration = \Configuration::getMultiple(array_keys(moduleConfiguration::getConfVar()));
        }
    }

    /**
     * getLangIso() method set good iso lang
     *
     * @return string
     */
    public static function getLangIso($iLangId = null)
    {
        if (null === $iLangId) {
            $iLangId = \GAnalyticsPro::$iCurrentLang;
        }

        // get iso lang
        $sIsoLang = \Language::getIsoById($iLangId);

        if (false === $sIsoLang) {
            $sIsoLang = 'en';
        }
        return $sIsoLang;
    }

    /**
     * getTemplatePath() method returns template path
     *
     * @param string $sTemplate
     * @param bool $bForceManual
     * @param string $sModuleName
     *
     * @return string
     */
    public static function getTemplatePath($sTemplate)
    {
        return \GAnalyticsPro::$oModule->getTemplatePath($sTemplate);
    }

    /**
     * truncateUri() method truncate current request_uri in order to delete params : sAction and sType
     *
     * @param mixed: string or array $mNeedle
     *
     * @return mixed
     */
    public static function truncateUri($mNeedle = '&sAction')
    {
        // set tmp
        $aQuery = is_array($mNeedle) ? $mNeedle : [$mNeedle];

        // get URI
        $sURI = $_SERVER['REQUEST_URI'];

        foreach ($aQuery as $sNeedle) {
            $sURI = strstr($sURI, $sNeedle) ? substr($sURI, 0, strpos($sURI, $sNeedle)) : $sURI;
        }
        return $sURI;
    }

    /**
     * method check if specific module and module's vars are available
     *
     * @param int $sModuleName
     * @param array $aCheckedVars
     * @param bool $bObjReturn
     * @param bool $bOnlyInstalled
     *
     * @return mixed : true or false or obj
     */
    public static function isInstalled($sModuleName, array $aCheckedVars = [], $bObjReturn = false, $bOnlyInstalled = false)
    {
        $mReturn = false;

        // use case - check module is installed in DB
        if (\Module::isInstalled($sModuleName)) {
            if (!$bOnlyInstalled) {
                $oModule = \Module::getInstanceByName($sModuleName);

                if (!empty($oModule)) {
                    // check if module is activated
                    $aActivated = \Db::getInstance()->ExecuteS('SELECT id_module as id, active FROM ' . _DB_PREFIX_ . 'module WHERE name = "' . pSQL($sModuleName) . '" AND active = 1');

                    if (!empty($aActivated[0]['active'])) {
                        $mReturn = true;

                        if (version_compare(_PS_VERSION_, '1.5', '>')) {
                            $aActivated = \Db::getInstance()->ExecuteS('SELECT * FROM ' . _DB_PREFIX_ . 'module_shop WHERE id_module = ' . (int) $aActivated[0]['id'] . ' AND id_shop = ' . (int) \Context::getContext()->shop->id);

                            if (empty($aActivated)) {
                                $mReturn = false;
                            }
                        }

                        if ($mReturn) {
                            if (!empty($aCheckedVars)) {
                                foreach ($aCheckedVars as $sVarName) {
                                    $mVar = \Configuration::get($sVarName);

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
     * checkGroupMultiShop() method check if multi-shop is activated and if the group or global context is used
     *
     * @return bool
     */
    public static function checkGroupMultiShop()
    {
        return \Configuration::get('PS_MULTISHOP_FEATURE_ACTIVE')
            && empty(\GAnalyticsPro::$oCookie->shopContext);
    }

    /**
     * method returns price by considering the merchant option in the back office
     *
     * @param array $aParams
     * @param bool $bUseTax
     * @param bool $bUseShippings
     * @param bool $bUseWrapping
     *
     * @return float
     */
    public static function getOrderPrice($aParams, $bUseTax, $bUseShipping, $bUseWrapping)
    {
        $fOderAmount = 0.0;

        if (!empty($aParams)) {
            // case with tax
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
            } // case without tax
            elseif (empty($bUseTax)) {
                if (!empty($bUseShipping) && !empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_paid_tax_excl;
                } elseif (empty($bUseShipping) && !empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_products + $aParams->total_wrapping_tax_excl;
                } elseif (!empty($bUseShipping) && empty($bUseWrapping)) {
                    $fOderAmount = $aParams->total_products + $aParams->total_shipping_tax_excl;
                } elseif (empty($bUseShipping) && empty($bUseWrapping)) {
                    // Use case for the deduct option
                    if (!empty(\GAnalyticsPro::$aConfiguration['GAP_DEDUCT_DISCOUNT'])) {
                        $fOderAmount = $aParams->total_products - $aParams->total_discounts_tax_excl;
                    } else {
                        $fOderAmount = $aParams->total_products;
                    }
                }
            }
        }

        return number_format($fOderAmount, 2, '.', '');
    }

    /**
     * method returns the consent status
     *
     * @return int
     */
    public static function getConsentStatus()
    {
        $iConsentLvl = 0;

        // Use case with ACB module
        if (!empty(moduleTools::isInstalled('pm_advancedcookiebanner'))) {
            $iConsentLvl = \AcbCookie::getConsentLevel();
        } else {
            // Use case with the trigger click event on accept all button
            $iConsentLvl = isset(\Context::getContext()->cookie->bt_gap_consent_lvl) ? \Context::getContext()->cookie->bt_gap_consent_lvl : 0;
        }

        return $iConsentLvl;
    }

    /**
     * return the array of element for reset HTML element according to the
     *
     * @return array
     */
    public static function resetHtmlSelector()
    {
        $aSelectorDefault = [
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
        ];

        return $aSelectorDefault;
    }

    /**
     * method retrun the JS tag build according to the page displayed
     *
     * @return array
     */
    public static function buildJsTag()
    {
        $acbIsInstalled = moduleTools::isInstalled('pm_advancedcookiebanner');

        $sPageType = (!empty($aParams['sPageType']) ? $aParams['sPageType'] : self::detectCurrentPage());
        // get required values
        $iProductId = \Tools::getvalue('id_product');
        $iCatId = \Tools::getvalue('id_category');
        $iManufacturerId = \Tools::getvalue('id_manufacturer');
        $iOrderId = 0;
        $iCartId = !empty(\Tools::getValue('id_cart')) ? \Tools::getValue('id_cart') : \Context::getContext()->cart->id;

        // Use case for the orderId for Paybox
        if ($sPageType == 'purchase') {
            if (!empty(\Tools::getvalue('id_order'))) {
                $iOrderId = \Tools::getvalue('id_order');
            } elseif (!empty(\Context::getContext()->controller->id_order)) {
                $iOrderId = (int) \Context::getContext()->controller->id_order;
            }

            if (empty($iOrderId)) {
                $iOrderId = moduleTools::getIdByCartId($iCartId);
            }
        }

        // Use for custom controllers name
        if (!empty($iCartId)) {
            if (empty($iOrderId)) {
                $iOrderId = moduleTools::getIdByCartId($iCartId);
            }
        }

        $dynTags = [
            'iProductId' => $iProductId,
            'iCategoryId' => $iCatId,
            'iManufacturerId' => $iManufacturerId,
            'iCartId' => $iCartId,
            'iOrderId' => $iOrderId,
            'js' => [
                'elementCategoryProduct' => \GAnalyticsPro::$aConfiguration['GAP_JS_CATEGORY_PROD'],
                'elementShipping' => \GAnalyticsPro::$aConfiguration['GAP_JS_SHIPPING'],
                'elementPayment' => \GAnalyticsPro::$aConfiguration['GAP_JS_PAYMENT'],
                'elementlogin' => \GAnalyticsPro::$aConfiguration['GAP_JS_LOGIN'],
                'elementsignup' => \GAnalyticsPro::$aConfiguration['GAP_JS_SIGNUP'],
                'elementWishCat' => \GAnalyticsPro::$aConfiguration['GAP_JS_WISH_CAT'],
                'elementWishProd' => \GAnalyticsPro::$aConfiguration['GAP_JS_WISH_PROD'],
            ],
        ];

        $jsDefs = [];
        $jsDefs['tagContent'] = self::buildDynDisplayTag($dynTags, $sPageType);
        $jsDefs['elementCategoryProduct'] = $dynTags['js']['elementCategoryProduct'];
        $jsDefs['elementShipping'] = $dynTags['js']['elementShipping'];
        $jsDefs['elementPayment'] = $dynTags['js']['elementPayment'];
        $jsDefs['elementlogin'] = $dynTags['js']['elementlogin'];
        $jsDefs['elementsignup'] = $dynTags['js']['elementsignup'];
        $jsDefs['elementWishCat'] = $dynTags['js']['elementWishCat'];
        $jsDefs['elementWishProd'] = $dynTags['js']['elementWishProd'];
        $jsDefs['gaId'] = \GAnalyticsPro::$aConfiguration['GAP_GFOUR_ID'];
        $jsDefs['gaEnable'] = \GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR'];
        $jsDefs['bEnableUa'] = \GAnalyticsPro::$aConfiguration['GAP_USE_UA'];
        $jsDefs['sUAcode'] = \GAnalyticsPro::$aConfiguration['GAP_GA_ID'];
        $jsDefs['ajaxUrl'] = \Context::getContext()->link->getModuleLink('ganalyticspro', 'ajax', []);
        $jsDefs['token'] = \Tools::getToken(false);
        $jsDefs['bRefund'] = orderRefund::hasRefundToHandle(\GAnalyticsPro::$iShopId);
        $jsDefs['bPartialRefund'] = orderPartialRefund::hasRefundPartialToHandle(\GAnalyticsPro::$iShopId);
        $jsDefs['bUseConsent'] = \GAnalyticsPro::$aConfiguration['GAP_USE_CONSENT'];
        $jsDefs['bConsentHtmlElement'] = !empty(\GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID']) ? \GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID'] : '';
        $jsDefs['bConsentHtmlElementSecond'] = !empty(\GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID_SECOND']) ? \GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID_SECOND'] : '';
        $jsDefs['iConsentConsentLvl'] = moduleTools::getConsentStatus();
        $jsDefs['referer'] = null;
        $jsDefs['acbIsInstalled'] = $acbIsInstalled;
        $jsDefs['tagCurrency'] = \Context::getContext()->currency->iso_code;

        if ($acbIsInstalled) {
            $acb = moduleTools::isInstalled('pm_advancedcookiebanner', [], true);
            // Only handle acbCookie referrer if the version is geater than 2.1.6 (before class didn't exist)
            if (version_compare($acb->version, '2.1.6', '>')) {
                include_once _PS_ROOT_DIR_ . '/modules/pm_advancedcookiebanner/class/AcbReferrerCookie.php';
                $referrer = \AcbReferrerCookie::getReferrer();
                $jsDefs['referer'] = $referrer;
            }
        }

        return $jsDefs;
    }

    /**
     * method retrun the JS tag build according to the page displayed
     *
     * @return array
     */
    public static function buildJsTagContent($page_type, $product)
    {
        $useUa = \GAnalyticsPro::$aConfiguration['GAP_USE_UA'];
        $data = [];
        $combination = '';

        if ($page_type == 'product') {
            $itemId = $product->id;
            $price = \Product::getPriceStatic($product->id, true, false, 2, null, false, true);
            $idDefaultCombibation = \Product::getDefaultAttribute($product->id);

            if (!empty($idDefaultCombibation)) {
                $itemId .= '_' . $idDefaultCombibation;
                $combination = moduleTools::getProductCombinationName($idDefaultCombibation, \Context::getContext()->language->id, \Context::getContext()->shop->id);
            }

            if (!empty($useUa)) {
                $data[] = [
                    'item_id' => $itemId,
                    'item_name' => substr(str_replace('\'', '', $product->name[\GAnalyticsPro::$iCurrentLang] . ' ' . $combination), 0, 149),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'price' => $price,
                    'item_brand' => !empty($product->manufacturer_name) ? $product->manufacturer_name : 'No brand',
                    'id' => $itemId,
                    'name' => substr(str_replace('\'', '', $product->name[\GAnalyticsPro::$iCurrentLang]), 0, 149),
                    'brand' => !empty($product->manufacturer_name) ? $product->manufacturer_name : 'No brand',
                    'category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'list_name' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                ];
            } else {
                $data[] = [
                    'item_id' => $itemId,
                    'item_name' => substr(str_replace('\'', '', $product->name[\GAnalyticsPro::$iCurrentLang] . ' ' . $combination), 0, 149),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'price' => $price,
                    'item_brand' => !empty($product->manufacturer_name) ? $product->manufacturer_name : 'No brand',
                ];
            }
        } elseif ($page_type == 'page_list') {
            if (!empty($product) && is_array($product)) {
                reset($product);

                foreach ($product as $key => $dataProduct) {
                    $quantity = 1;

                    // get the quantity added
                    if (isset($dataProduct['cart_quantity'])) {
                        $quantity = (int) $dataProduct['cart_quantity'];
                    }

                    $oProduct = new \Product((int) $dataProduct['id_product'], \GAnalyticsPro::$iCurrentLang);

                    // Use case purchase tag
                    if (!isset($dataProduct['product_attribute_id']) && empty($dataProduct['product_attribute_id'])) {
                        $price = \Product::getPriceStatic($oProduct->id, true, false, 2, null, false, true);
                    } else {
                        $price = \Product::getPriceStatic($oProduct->id, true, (int) $dataProduct['product_attribute_id'], 2, null, false, true);
                    }

                    // Use case for cart page
                    if (!isset($dataProduct['id_product_attribute']) && empty($dataProduct['id_product_attribute'])) {
                        $price = \Product::getPriceStatic($oProduct->id, true, false, 2, null, false, true);
                    } else {
                        $price = \Product::getPriceStatic($oProduct->id, true, (int) $dataProduct['id_product_attribute'], 2, null, false, true);
                    }

                    $itemId = $dataProduct['id_product'];

                    if (isset($dataProduct['id_product_attribute']) && !empty($dataProduct['id_product_attribute'])) {
                        $idDefaultCombibation = $dataProduct['id_product_attribute'];
                    } else {
                        $idDefaultCombibation = \Product::getDefaultAttribute((int) $dataProduct['id_product']);
                    }

                    if (!empty($idDefaultCombibation)) {
                        $itemId .= '_' . $idDefaultCombibation;
                        $combination = moduleTools::getProductCombinationName($idDefaultCombibation, \Context::getContext()->language->id, \Context::getContext()->shop->id);
                    }

                    if (!empty(\GAnalyticsPro::$aConfiguration['GAP_USE_UA'])) {
                        $data[$key] = [
                            'item_id' => $itemId,
                            'item_name' => substr(str_replace('\'', '', $oProduct->name[\GAnalyticsPro::$iCurrentLang] . ' ' . $combination), 0, 149),
                            'currency' => \Context::getContext()->currency->iso_code,
                            'item_category' => moduleTools::getCategoryName((int) $oProduct->id_category_default, \GAnalyticsPro::$iCurrentLang),
                            'price' => number_format($quantity * $price, 2, ',', ''),
                            'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                            'id' => $itemId,
                            'name' => substr(str_replace('\'', '', $oProduct->name[\GAnalyticsPro::$iCurrentLang]), 0, 149),
                            'brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                            'category' => moduleTools::getCategoryName((int) $oProduct->id_category_default, \GAnalyticsPro::$iCurrentLang),
                            'list_name' => moduleTools::getCategoryName((int) $oProduct->id_category_default, \GAnalyticsPro::$iCurrentLang),
                            'quantity' => $quantity,
                        ];
                    } else {
                        $data[$key] = [
                            'item_id' => $itemId,
                            'item_name' => substr(str_replace('\'', '', $oProduct->name[\GAnalyticsPro::$iCurrentLang] . ' ' . $combination), 0, 149),
                            'currency' => \Context::getContext()->currency->iso_code,
                            'item_category' => moduleTools::getCategoryName((int) $oProduct->id_category_default, \GAnalyticsPro::$iCurrentLang),
                            'price' => number_format($quantity * $price, 2, ',', ''),
                            'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                            'quantity' => $quantity,
                        ];
                    }
                }
            }
        }

        return $data;
    }

    /**
     * method format the product name with combination
     *
     * @param int $attributeProductId
     * @param int $currentLang
     * @param int $idShop
     *
     * @return string
     */
    public static function getProductCombinationName($attributeProductId, $currentLang, $idShop)
    {
        // set var
        $formattedProductName = '';

        $combinationValues = moduleDao::getProductComboAttributes($attributeProductId, $currentLang, $idShop);

        if (!empty($combinationValues)) {
            $extraName = '';
            foreach ($combinationValues as $c) {
                $extraName .= ' ' . \Tools::stripslashes($c['name']);
            }
            $formattedProductName .= $extraName;
            unset($extraName);
        }
        unset($combinationValues);

        return $formattedProductName;
    }
}
