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

namespace GanalyticsPro\Admin;

use GanalyticsPro\ModuleLib\moduleTools;
use GanalyticsPro\Configuration\moduleConfiguration;

class adminDisplay implements adminInterface
{
    /**
     * @var array : array for all flag ids used in option translation
     */
    protected $aFlagIds = [];

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
     *
     * @return array
     */
    public function run($sType, array $aParam = null)
    {
        // set variables
        $aDisplayInfo = [];

        if (empty($sType)) {
            $sType = 'tabs';
        }

        switch ($sType) {
            case 'tabs': // use case - display first page with all tabs
            case 'gfour': // use case - g4 settings form
            case 'advanced': // use case - display fancybox advice layout
            case 'consent': // use case - display fancybox advice layout
                // execute match function
                $aDisplayInfo = call_user_func_array([$this, 'display' . ucfirst($sType)], [$aParam]);
                break;
            default:
                break;
        }
        // use case - generic assign
        if (!empty($aDisplayInfo)) {
            $aDisplayInfo['assign'] = array_merge($aDisplayInfo['assign'], $this->assign());
        }

        return $aDisplayInfo;
    }

    /**
     * assign() method assigns transverse data
     *
     * @return array
     */
    private function assign()
    {
        $iSupportToUse = moduleConfiguration::GAP_SUPPORT_BT;

        // set smarty variables
        $aAssign = [
            'sURI' => moduleTools::truncateUri(['&sAction', '&sType', '&sDisplay']),
            'sCtrlParamName' => moduleConfiguration::GAP_PARAM_CTRL_NAME,
            'bMultiShop' => moduleTools::checkGroupMultiShop(),
            'sController' => moduleConfiguration::GAP_ADMIN_CTRL,
            'sDisplay' => \Tools::getValue('sDisplay'),
            'aQueryParams' => moduleConfiguration::getRequestParams(),
            'iCurrentLang' => intval(\GAnalyticsPro::$iCurrentLang),
            'sCurrentLang' => \GAnalyticsPro::$sCurrentLang,
            'sFaqLang' => moduleTools::getFaqLang(\GAnalyticsPro::$sCurrentLang),
            'sTs' => time(),
            'bCompare17' => \GAnalyticsPro::$bCompare17,
            'bCompare1780' => \GAnalyticsPro::$bCompare1780,
            'sLoadingImg' => moduleConfiguration::GAP_URL_IMG . 'bx_loader.gif',
            'bHideConfiguration' => false,
            'sHeaderInclude' => moduleTools::getTemplatePath('views/templates/admin/header.tpl'),
            'sErrorInclude' => moduleTools::getTemplatePath('views/templates/admin/error.tpl'),
            'sConfirmInclude' => moduleTools::getTemplatePath('views/templates/admin/confirm.tpl'),
            'sContactUs' => !empty($iSupportToUse) ? moduleConfiguration::GAP_SUPPORT_URL . ((\GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/contactez-nous' : 'en/contact-us') : moduleConfiguration::GAP_SUPPORT_URL . ((\GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/ecrire-au-developpeur?id_product=' . moduleConfiguration::GAP_SUPPORT_ID : 'en/write-to-developper?id_product=' . moduleConfiguration::GAP_SUPPORT_ID),
            'sRateUrl' => !empty($iSupportToUse) ? moduleConfiguration::GAP_SUPPORT_URL . ((\GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/modules-prestashop-google-et-publicite/46-google-analytics-pro-avec-enhanced-ecommerce-0656272943080.html' : 'en/google-and-advertising-modules-for-prestashop/46-google-analytics-pro-with-enhanced-ecommerce-0656272943080.html') : moduleConfiguration::GAP_SUPPORT_URL . ((\GAnalyticsPro::$sCurrentLang == 'fr') ? '/fr/ratings.php' : '/en/ratings.php'),
            'moduleJsPath' => moduleConfiguration::GAP_URL_JS,
            'moduleCssPath' => moduleConfiguration::GAP_URL_CSS,
            'imagePath' => moduleConfiguration::GAP_URL_IMG,
            'useJs' => moduleConfiguration::GAP_USE_JS,
            'sFaqURL' => moduleConfiguration::GAP_BT_FAQ_MAIN_URL,
        ];

        return $aAssign;
    }

    /**
     * displayTabs() method displays admin's first page with all tabs
     *
     * @param array $aPost
     *
     * @return array
     */
    private function displayTabs(array $aPost)
    {
        // set smarty variables
        $aAssign = [
            'sDocUri' => _MODULE_DIR_ . moduleConfiguration::GAP_MODULE_SET_NAME . '/',
            'sDocName' => 'readme_' . ((\GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr' : 'en') . '.pdf',
            'sContactUs' => 'http://www.businesstech.fr/' . ((\GAnalyticsPro::$sCurrentLang == 'fr') ? 'fr/contactez-nous' : 'en/contact-us'),
            'sCurrentIso' => \Language::getIsoById(\GAnalyticsPro::$iCurrentLang),
        ];

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
        $aAssign['sG4Include'] = moduleTools::getTemplatePath('views/templates/admin/g4.tpl');
        $aAssign['sAdvancedInclude'] = moduleTools::getTemplatePath('views/templates/admin/advanced.tpl');
        $aAssign['sConsentInclude'] = moduleTools::getTemplatePath('views/templates/admin/consent.tpl');
        $aAssign['sModuleVersion'] = \GAnalyticsPro::$oModule->version;

        // set css and js use
        $GLOBALS['GAP_USE_JS_CSS']['bUseJqueryUI'] = true;

        return [
            'tpl' => 'admin/body.tpl',
            'assign' => array_merge($aAssign, $GLOBALS['GAP_USE_JS_CSS']),
        ];
    }

    /**
     * displayAdvanced() method displays advanced settings
     *
     * @param array $aPost
     *
     * @return array
     */
    private function displayAdvanced(array $aPost = null)
    {
        moduleTools::translateLabelFormat();

        // get pre-selection
        $aSelection = !empty(\GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) ? unserialize(\GAnalyticsPro::$aConfiguration['GAP_STATUS_SELECTION']) : [6, 7];
        $aStatusSelectionPartialRefund = !empty(\GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) ? unserialize(\GAnalyticsPro::$aConfiguration['GAP_STATUS_PARTIAL_REFUNDED']) : [18];

        $aAssign = [
            'aStatusSelection' => $aSelection,
            'aStatusSelectionPartialRefund' => $aStatusSelectionPartialRefund,
            'aOrderStatusTitle' => \OrderState::getOrderStates((int) \GAnalyticsPro::$iCurrentLang),
            'sLabelFormat' => \GAnalyticsPro::$aConfiguration['GAP_CAT_LABEL_FORMAT'],
            'aLabelFormat' => $GLOBALS['GAP_LABEL_FORMAT'],
            'sDomCategoryProduct' => \GAnalyticsPro::$aConfiguration['GAP_JS_CATEGORY_PROD'],
            'sDomShipping' => \GAnalyticsPro::$aConfiguration['GAP_JS_SHIPPING'],
            'sDomPayment' => \GAnalyticsPro::$aConfiguration['GAP_JS_PAYMENT'],
            'sDomLogin' => \GAnalyticsPro::$aConfiguration['GAP_JS_LOGIN'],
            'sDomSignup' => \GAnalyticsPro::$aConfiguration['GAP_JS_SIGNUP'],
            'sDomWishCat' => \GAnalyticsPro::$aConfiguration['GAP_JS_WISH_CAT'],
            'sDomWishProd' => \GAnalyticsPro::$aConfiguration['GAP_JS_WISH_PROD'],
            'bUseTax' => \GAnalyticsPro::$aConfiguration['GAP_USE_TAX'],
            'bUseShipping' => \GAnalyticsPro::$aConfiguration['GAP_USE_SHIPPING'],
            'bUseWrapping' => \GAnalyticsPro::$aConfiguration['GAP_USE_WRAPPING'],
            'bDeductDiscount' => \GAnalyticsPro::$aConfiguration['GAP_DEDUCT_DISCOUNT'],
            'aSelectorDefault' => moduleTools::resetHtmlSelector(),
            'purchaseTagId' => \GAnalyticsPro::$aConfiguration['GAP_PURCHASE_ID_PREF'],
            'orderMin' => \GAnalyticsPro::$aConfiguration['GAP_ORDER_ID_MIN'],
        ];

        return [
            'tpl' => 'admin/advanced.tpl',
            'assign' => $aAssign,
        ];
    }

    /**
     * displayG4() method display GA4 options
     *
     * @param array $aPost
     *
     * @return array
     */
    private function displayGFour(array $aPost = null)
    {
        $aAssign = [
            'sGfourId' => \GAnalyticsPro::$aConfiguration['GAP_GFOUR_ID'],
            'bActivateGfour' => \GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR'],
            'bUserId' => \GAnalyticsPro::$aConfiguration['GAP_USER_ID'],
        ];

        return [
            'tpl' => 'admin/g4.tpl',
            'assign' => $aAssign,
        ];
    }

    /**
     * displayConsent() method display consent options
     *
     * @param array $aPost
     *
     * @return array
     */
    private function displayConsent(array $aPost = null)
    {
        $aAssign = [
            'bActivateConsent' => \GAnalyticsPro::$aConfiguration['GAP_USE_CONSENT'],
            'bActivateAxeptio' => \GAnalyticsPro::$aConfiguration['GAP_USE_AXEPTIO'],
            'bPmCookieBanner' => moduleTools::isInstalled('pm_advancedcookiebanner'),
            'sAcceptElement' => \GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID'],
            'sAcceptElementSecond' => \GAnalyticsPro::$aConfiguration['GAP_ELEMENT_HTML_ID_SECOND'],
        ];

        return [
            'tpl' => 'admin/consent.tpl',
            'assign' => $aAssign,
        ];
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
            $oDisplay = new adminDisplay();
        }
        return $oDisplay;
    }
}
