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
class BT_GapHookDisplay implements BT_IGapHook
{
    /**
     * @var string $sHookType : define hook type
     */
    protected $sHookType = null;

    /**
     * Magic Method __construct assigns few information about hook
     *
     * @param string
     */
    public function __construct($sHookType)
    {
        // set hook type
        $this->sHookType = $sHookType;
    }

    /**
     * Magic Method __destruct
     */
    public function __destruct()
    {
    }

    /**
     * run() method execute hook
     *
     * @param array $aParams
     * @return array
     */
    public function run(array $aParams = array())
    {
        if (!empty(GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR']) && !empty(GAnalyticsPro::$aConfiguration['GAP_GFOUR_ID'])) {
            require_once(_GAP_PATH_LIB_PIXEL_TAGS . 'base-tags_class.php');
        }

        // set variables
        $aDisplayHook = array();

        switch ($this->sHookType) {
            case 'header':
                // use case - display in header
                $aDisplayHook = call_user_func(array($this, 'displayHeader'));
                break;
            case 'home':
                // use case - display in home
                $aDisplayHook = call_user_func(array($this, 'displayHome'));
                break;
            default:
                break;
        }

        return $aDisplayHook;
    }

    /**
     * displayHeader() method display header elements
     *
     * @return array
     */
    private function displayHeader()
    {
        $aAssign = array();

        // Use case for G4 code and the value is set
        if (!empty(GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR']) || !empty(GAnalyticsPro::$aConfiguration['GAP_USE_UA'])) {

            require_once(_GAP_PATH_LIB . 'module-dao_class.php');

            $sPageType = (!empty($aParams['sPageType']) ? $aParams['sPageType'] : BT_GapModuleTools::detectCurrentPage());
            // get required values
            $iProductId = Tools::getvalue('id_product');
            $iCatId = Tools::getvalue('id_category');
            $iManufacturerId = Tools::getvalue('id_manufacturer');
            $iOrderId = 0;
            $iCartId = !empty(Tools::getValue('id_cart')) ? Tools::getValue('id_cart') : Context::getContext()->cart->id;


            // Use case for the orderId for Paybox
            if ($sPageType == 'purchase') {

                if (!empty(Tools::getvalue('id_order'))) {
                    $iOrderId = Tools::getvalue('id_order');
                } else if (!empty(Context::getContext()->controller->id_order)) {
                    $iOrderId = (int)Context::getContext()->controller->id_order;
                }

                if (empty($iOrderId)) {
                    $iOrderId = BT_GapModuleTools::getIdByCartId($iCartId);
                }
            }

            // Use for custom controllers name
            if (!empty($iCartId)) {
                if (empty($iOrderId)) {
                    $iOrderId = BT_GapModuleTools::getIdByCartId($iCartId);
                }
            }

            $aDynTags = array(
                'iProductId' => $iProductId,
                'iCategoryId' => $iCatId,
                'iManufacturerId' => $iManufacturerId,
                'iCartId' => $iCartId,
                'iOrderId' => $iOrderId,
                'js' => array(
                    'elementCategoryProduct' => GAnalyticsPro::$aConfiguration['GAP_JS_CATEGORY_PROD'],
                    'elementRemoveCart' => GAnalyticsPro::$aConfiguration['GAP_JS_REMOVE_CART'],
                    'elementShipping' => GAnalyticsPro::$aConfiguration['GAP_JS_SHIPPING'],
                    'elementPayment' => GAnalyticsPro::$aConfiguration['GAP_JS_PAYMENT'],
                    'elementlogin' => GAnalyticsPro::$aConfiguration['GAP_JS_LOGIN'],
                    'elementsignup' => GAnalyticsPro::$aConfiguration['GAP_JS_SIGNUP'],
                    'elementWishCat' => GAnalyticsPro::$aConfiguration['GAP_JS_WISH_CAT'],
                    'elementWishProd' => GAnalyticsPro::$aConfiguration['GAP_JS_WISH_PROD'],
                )
            );

            $jsDefs['tagContent'] = BT_GapModuleTools::buildDynDisplayTag($aDynTags, $sPageType);
            $jsDefs['bAddToCartTrigger'] = GAnalyticsPro::$aConfiguration['GAP_TRACK_ADD_CART_PAGE'];
            $jsDefs['elementCategoryProduct'] = $aDynTags['js']['elementCategoryProduct'];
            $jsDefs['elementRemoveCart'] = $aDynTags['js']['elementRemoveCart'];
            $jsDefs['elementShipping'] = $aDynTags['js']['elementShipping'];
            $jsDefs['elementPayment'] = $aDynTags['js']['elementPayment'];
            $jsDefs['elementlogin'] = $aDynTags['js']['elementlogin'];
            $jsDefs['elementsignup'] = $aDynTags['js']['elementsignup'];
            $jsDefs['elementWishCat'] = $aDynTags['js']['elementWishCat'];
            $jsDefs['elementWishProd'] = $aDynTags['js']['elementWishProd'];
            $jsDefs['gaId'] = GAnalyticsPro::$aConfiguration['GAP_GFOUR_ID'];
            $jsDefs['gaEnable'] = GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR'];
            $jsDefs['bEnableUa'] = GAnalyticsPro::$aConfiguration['GAP_USE_UA'];
            $jsDefs['sUAcode'] = GAnalyticsPro::$aConfiguration['GAP_GA_ID'];
            $jsDefs['ajaxUrl'] = Context::getContext()->link->getModuleLink('ganalyticspro', 'ajax', array());
            $jsDefs['token'] = Tools::getToken(false);
            $jsDefs['bRefund'] = BT_GapModuleDao::hasRefundToHandle(GAnalyticsPro::$iShopId);
            $jsDefs['bPartialRefund'] = BT_GapModuleDao::hasRefundPartialToHandle(GAnalyticsPro::$iShopId);
            $jsDefs['bUseConsent'] =  GAnalyticsPro::$aConfiguration['GAP_USE_CONSENT'];
            $jsDefs['bConsentHtmlElement'] = !empty(GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID']) ? GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID'] : '';
            $jsDefs['iConsentConsentLvl'] = BT_GapModuleTools::getConsentStatus();

            $aAssign['btGtagSource'] = 'https://www.googletagmanager.com/gtag/js?id='  . GAnalyticsPro::$aConfiguration['GAP_GFOUR_ID'] . '';
            $aAssign['btUseGFour'] = GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR'];

            Media::addJsDef(array('btGapTag' => $jsDefs));
            Context::getContext()->controller->addJS(_GAP_URL_JS . 'bt_g4.js');
        }

        return (array('tpl' => _GAP_TPL_HOOK_PATH . _GAP_TPL_HEADER, 'assign' => $aAssign));
    }


    /**
     * _displayHome() method display home elements
     *
     * @return array
     */
    private function displayHome()
    {
        // set
        $aAssign = array('bActive' => false);
        $iPosition = 1;

        return (array('tpl' => _GAP_TPL_HOOK_PATH . _GAP_TPL_HOME, 'assign' => $aAssign));
    }

    /**
     * displayOrderConfirmation() method display order confirmation content
     *
     * @return array
     */
    private function displayOrderConfirmation(array $aParams)
    {
        $aAssign = array();

        return (array('tpl' => _GAP_TPL_HOOK_PATH . _GAP_TPL_ORDER_CONFIRMATION, 'assign' => $aAssign));
    }

    /**
     * displayFooter() method display footer content
     *
     * @params array $aParams
     * @return array
     */
    private function displayFooter(array $aParams)
    {
        // set
        $aAssign = array();
        return (array('tpl' => _GAP_TPL_HOOK_PATH . _GAP_TPL_FOOTER, 'assign' => $aAssign));
    }


    /**
     * handleRefundedProducts() method handle if the order has been refunded or not
     *
     * @params int $iOrderId
     * @return bool
     */
    private function handleRefundedOrder($iOrderId)
    {
    }

    /**
     * handleAddOrder() method handle if GA add the order
     *
     * @params obj $oOrder
     * @return bool
     */
    private function handleAddOrder($oOrder)
    {
    }
}
