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
class BT_AdminDisplay implements BT_IAdmin
{
    /**
     * @var array $aFlagIds : array for all flag ids used in option translation
     */
    protected $aFlagIds = array();

    /**
     * Magic Method __construct
     */
    private function __construct()
    {
    }

    /**
     * Magic Method __destruct
     */
    public function __destruct()
    {
    }

    /**
     * run() method display all configured data admin tabs
     *
     * @param string $sType => define which method to execute
     * @param array $aParam
     * @return array
     */
    public function run($sType, array $aParam = null)
    {
        // set variables
        $aDisplayInfo = array();

        if (empty($sType)) {
            $sType = 'tabs';
        }

        switch ($sType) {
            case 'tabs': // use case - display first page with all tabs
            case 'ua': // use case - display ua settings form
            case 'gfour': // use case - g4 settings form
            case 'advanced': // use case - display fancybox advice layout
            case 'consent': // use case - display fancybox advice layout
                // execute match function
                $aDisplayInfo = call_user_func_array(array($this, 'display' . ucfirst($sType)), array($aParam));
                break;
            default:
                break;
        }
        // use case - generic assign
        if (!empty($aDisplayInfo)) {
            $aDisplayInfo['assign'] = array_merge($aDisplayInfo['assign'], $this->assign());
        }

        return ($aDisplayInfo);
    }

    /**
     * assign() method assigns transverse data
     *
     * @return array
     */
    private function assign()
    {
        $iSupportToUse = _GAP_SUPPORT_BT;

        // set smarty variables
        $aAssign = array(
            'sURI' => BT_GapModuleTools::truncateUri(array('&sAction', '&sType', '&sDisplay')),
            'sCtrlParamName' => _GAP_PARAM_CTRL_NAME,
            'bMultiShop' => BT_GapModuleTools::checkGroupMultiShop(),
            'sController' => _GAP_ADMIN_CTRL,
            'sDisplay' => Tools::getValue('sDisplay'),
            'aQueryParams' => $GLOBALS['GAP_REQUEST_PARAMS'],
            'iCurrentLang' => intval(GAnalyticsPro::$iCurrentLang),
            'sCurrentLang' => GAnalyticsPro::$sCurrentLang,
            'sFaqLang' => BT_GapModuleTools::getFaqLang(GAnalyticsPro::$sCurrentLang),
            'sTs' => time(),
            'bCompare17' => GAnalyticsPro::$bCompare17,
            'bCompare1780' => GAnalyticsPro::$bCompare1780,
            'sLoadingImg' => _GAP_URL_IMG . _GAP_LOADER_GIF,
            'bHideConfiguration' => BT_GapWarning::create()->bStopExecution,
            'sHeaderInclude' => BT_GapModuleTools::getTemplatePath(_GAP_PATH_TPL_NAME . _GAP_TPL_ADMIN_PATH . _GAP_TPL_HEADER),
            'sErrorInclude' => BT_GapModuleTools::getTemplatePath(_GAP_PATH_TPL_NAME . _GAP_TPL_ADMIN_PATH . _GAP_TPL_ERROR),
            'sConfirmInclude' => BT_GapModuleTools::getTemplatePath(_GAP_PATH_TPL_NAME . _GAP_TPL_ADMIN_PATH . _GAP_TPL_CONFIRM),
            'sContactUs' => !empty($iSupportToUse) ? _GAP_SUPPORT_URL . ((GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/contactez-nous' : 'en/contact-us') : _GAP_SUPPORT_URL . ((GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/ecrire-au-developpeur?id_product=' . _GAP_SUPPORT_ID : 'en/write-to-developper?id_product=' . _GAP_SUPPORT_ID),
            'sRateUrl' => !empty($iSupportToUse) ? _GAP_SUPPORT_URL . ((GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/modules-prestashop-google-et-publicite/46-google-analytics-pro-avec-enhanced-ecommerce-0656272943080.html' : 'en/google-and-advertising-modules-for-prestashop/46-google-analytics-pro-with-enhanced-ecommerce-0656272943080.html') : _GAP_SUPPORT_URL . ((GAnalyticsPro::$sCurrentLang == 'fr') ? '/fr/ratings.php' : '/en/ratings.php'),
        );

        return $aAssign;
    }

    /**
     * displayTabs() method displays admin's first page with all tabs
     *
     * @param array $aPost
     * @return array
     */
    private function displayTabs(array $aPost)
    {
        // set smarty variables
        $aAssign = array(
            'sDocUri' => _MODULE_DIR_ . _GAP_MODULE_SET_NAME . '/',
            'sDocName' => 'readme_' . ((GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr' : 'en') . '.pdf',
            'sContactUs' => 'http://www.businesstech.fr/' . ((GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/contactez-nous' : 'en/contact-us'),
            'sCurrentIso' => Language::getIsoById(GAnalyticsPro::$iCurrentLang),
        );

        // use case - get display data of basics settings
        $aData = $this->displayUa($aPost);

        $aAssign = array_merge($aAssign, $aData['assign']);

        // use case - get display data of advanced settings
        $aData = $this->displayAdvanced($aPost);

        $aAssign = array_merge($aAssign, $aData['assign']);

        // use case - get display data of diagnostic tool settings
        $aData = $this->displayGfour($aPost);

        $aAssign = array_merge($aAssign, $aData['assign']);

        // use case - get display data of diagnostic tool settings
        $aData = $this->displayConsent($aPost);

        $aAssign = array_merge($aAssign, $aData['assign']);

        // assign all included templates files
        $aAssign['sUaInclude'] = BT_GapModuleTools::getTemplatePath(_GAP_PATH_TPL_NAME . _GAP_TPL_ADMIN_PATH . _GAP_TPL_UA);
        $aAssign['sG4Include'] = BT_GapModuleTools::getTemplatePath(_GAP_PATH_TPL_NAME . _GAP_TPL_ADMIN_PATH . _GAP_TPL_G4);
        $aAssign['sAdvancedInclude'] = BT_GapModuleTools::getTemplatePath(_GAP_PATH_TPL_NAME . _GAP_TPL_ADMIN_PATH . _GAP_TPL_ADVANCED);
        $aAssign['sConsentInclude'] = BT_GapModuleTools::getTemplatePath(_GAP_PATH_TPL_NAME . _GAP_TPL_ADMIN_PATH . _GAP_TPL_CONSENT);
        $aAssign['sModuleVersion'] = GAnalyticsPro::$oModule->version;

        // set css and js use
        $GLOBALS['GAP_USE_JS_CSS']['bUseJqueryUI'] = true;

        return (array(
            'tpl' => _GAP_TPL_ADMIN_PATH . _GAP_TPL_BODY,
            'assign' => array_merge($aAssign, $GLOBALS['GAP_USE_JS_CSS']),
        ));
    }
    /**
     * displayUa() method displays basic settings
     *
     * @param array $aPost
     * @return array
     */
    private function displayUa(array $aPost = null)
    {
        $aAssign = array(
            'sGaId' => GAnalyticsPro::$aConfiguration['GAP_GA_ID'],
            'bActivateUa' => GAnalyticsPro::$aConfiguration['GAP_USE_UA'],
        );

        return (array(
            'tpl' => _GAP_TPL_ADMIN_PATH . _GAP_TPL_UA,
            'assign' => $aAssign,
        ));
    }

    /**
     * displayAdvanced() method displays advanced settings
     *
     * @param array $aPost
     * @return array
     */
    private function displayAdvanced(array $aPost = null)
    {
        // require
        require_once(_GAP_PATH_LIB . 'module-dao_class.php');

        BT_GapModuleTools::translateLabelFormat();

        // get pre-selection
        $aSelection = !empty(GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) ? unserialize(GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) : array(6, 7);
        $aStatusSelectionPartialRefund = !empty(GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) ? unserialize(GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) : array(18);

        $aAssign = array(
            'aStatusSelection' => $aSelection,
            'aStatusSelectionPartialRefund' => $aStatusSelectionPartialRefund,
            'aOrderStatusTitle' => BT_GapModuleDao::getOrderStatus(),
            'sLabelFormat' => GAnalyticsPro::$aConfiguration['GAP_CAT_LABEL_FORMAT'],
            'aLabelFormat' => $GLOBALS['GAP_LABEL_FORMAT'],
            'bTrackCartPage' => GAnalyticsPro::$aConfiguration['GAP_TRACK_ADD_CART_PAGE'],
            'sDomCategoryProduct' => GAnalyticsPro::$aConfiguration['GAP_JS_CATEGORY_PROD'],
            'sDomRemoveCart' => GAnalyticsPro::$aConfiguration['GAP_JS_REMOVE_CART'],
            'sDomShipping' => GAnalyticsPro::$aConfiguration['GAP_JS_SHIPPING'],
            'sDomPayment' => GAnalyticsPro::$aConfiguration['GAP_JS_PAYMENT'],
            'sDomLogin' => GAnalyticsPro::$aConfiguration['GAP_JS_LOGIN'],
            'sDomSignup' => GAnalyticsPro::$aConfiguration['GAP_JS_SIGNUP'],
            'sDomWishCat' => GAnalyticsPro::$aConfiguration['GAP_JS_WISH_CAT'],
            'sDomWishProd' => GAnalyticsPro::$aConfiguration['GAP_JS_WISH_PROD'],
            'bUseTax' => GAnalyticsPro::$aConfiguration['GAP_USE_TAX'],
            'bUseShipping' => GAnalyticsPro::$aConfiguration['GAP_USE_SHIPPING'],
            'bUseWrapping' => GAnalyticsPro::$aConfiguration['GAP_USE_WRAPPING'],
            'aSelectorDefault' => BT_GapModuleTools::resetHtmlSelector(),
        );

        return (array(
            'tpl' => _GAP_TPL_ADMIN_PATH . _GAP_TPL_ADVANCED,
            'assign' => $aAssign,
        ));
    }

    /**
     * displayG4() method display GA4 options
     *
     * @param array $aPost
     * @return array
     */
    private function displayGFour(array $aPost = null)
    {
        $aAssign = array(
            'sGfourId' => GAnalyticsPro::$aConfiguration['GAP_GFOUR_ID'],
            'bActivateGfour' => GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR'],
        );

        return (array(
            'tpl' => _GAP_TPL_ADMIN_PATH . _GAP_TPL_G4,
            'assign' => $aAssign,
        ));
    }


    /**
     * displayConsent() method display consent options
     *
     * @param array $aPost
     * @return array
     */
    private function displayConsent(array $aPost = null)
    {
        $aAssign = array(
            'bActivateConsent' => GAnalyticsPro::$aConfiguration['GAP_USE_CONSENT'],
            'bPmCookieBanner' => BT_GapModuleTools::isInstalled('pm_advancedcookiebanner'),
            'sAcceptElement' => GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID'],
        );

        return (array(
            'tpl' => _GAP_TPL_ADMIN_PATH . _GAP_TPL_CONSENT,
            'assign' => $aAssign,
        ));
    }

    /**
     * create() method set singleton
     *
     * @return obj
     */
    public static function create()
    {
        static $oDisplay;

        if (null === $oDisplay) {
            $oDisplay = new BT_AdminDisplay();
        }
        return $oDisplay;
    }
}
