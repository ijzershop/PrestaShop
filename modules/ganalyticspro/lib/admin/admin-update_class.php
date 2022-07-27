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

class BT_AdminUpdate implements BT_IAdmin
{
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
     * run() method update all tabs content of admin page
     *
     * @param string $sType => define which method to execute
     * @param array $aParam
     * @return array
     */
    public function run($sType, array $aParam = null)
    {
        // set variables
        $aDisplayData = array();

        switch ($sType) {
            case 'ua': // use case - update ua settings
            case 'gfour': // use case - update ga4 settings
            case 'advanced': // use case - update advanced settings
            case 'consent': // use case - update consent
                // execute match function
                $aDisplayData = call_user_func_array(array($this, 'update' . ucfirst($sType)), array($aParam));
                break;
            default:
                break;
        }
        return ($aDisplayData);
    }

    /**
     * updateUa() method update basic settings
     *
     * @param array $aPost
     * @return array
     */
    private function updateUa(array $aPost)
    {
        // clean headers
        @ob_end_clean();

        // set
        $aData = array();

        try {
            Configuration::updateValue('GAP_GA_ID', Tools::getValue('bt_ga-id'));
            Configuration::updateValue('GAP_USE_UA', Tools::getValue('bt_activate_ua'));
        } catch (Exception $e) {
            $aData['aErrors'][] = array('msg' => $e->getMessage(), 'code' => $e->getCode());
        }

        // get configuration options
        BT_GapModuleTools::getConfiguration();

        // require admin configure class - to factorise
        require_once(_GAP_PATH_LIB_ADMIN . 'admin-display_class.php');

        // get run of admin display in order to display first page of admin with basics settings updated
        $aDisplay = BT_AdminDisplay::create()->run('ua');

        // use case - empty error and updating status
        $aDisplay['assign'] = array_merge($aDisplay['assign'], array(
            'bAjaxMode' => GAnalyticsPro::$sQueryMode,
            'bUpdate' => (empty($aData['aErrors']) ? true : false),
        ), $aData);

        // destruct
        unset($aData);

        return $aDisplay;
    }

    /**
     * updateUa() method update basic settings
     *
     * @param array $aPost
     * @return array
     */
    private function updateGfour(array $aPost)
    {
        // clean headers
        @ob_end_clean();

        // set
        $aData = array();

        try {
            Configuration::updateValue('GAP_GFOUR_ID', Tools::getValue('bt_gfour-id'));
            Configuration::updateValue('GAP_USE_GFOUR', Tools::getValue('bt_activate_gfour'));

        } catch (Exception $e) {
            $aData['aErrors'][] = array('msg' => $e->getMessage(), 'code' => $e->getCode());
        }

        // get configuration options
        BT_GapModuleTools::getConfiguration();

        // require admin configure class - to factorise
        require_once(_GAP_PATH_LIB_ADMIN . 'admin-display_class.php');

        // get run of admin display in order to display first page of admin with basics settings updated
        $aDisplay = BT_AdminDisplay::create()->run('gfour');

        // use case - empty error and updating status
        $aDisplay['assign'] = array_merge($aDisplay['assign'], array(
            'bAjaxMode' => GAnalyticsPro::$sQueryMode,
            'bUpdate' => (empty($aData['aErrors']) ? true : false),
        ), $aData);

        // destruct
        unset($aData);

        return $aDisplay;
    }

    /**
     * updateUa() method update basic settings
     *
     * @param array $aPost
     * @return array
     */
    private function updateConsent(array $aPost)
    {
        // clean headers
        @ob_end_clean();

        // set
        $aData = array();

        try {
            Configuration::updateValue('GAP_USE_CONSENT', Tools::getValue('bt_activate_consent'));
            Configuration::updateValue('GAP_ELEMENT_HTML_ID', Tools::getValue('bt_accept_element-id'));

        } catch (Exception $e) {
            $aData['aErrors'][] = array('msg' => $e->getMessage(), 'code' => $e->getCode());
        }

        // get configuration options
        BT_GapModuleTools::getConfiguration();

        // require admin configure class - to factorise
        require_once(_GAP_PATH_LIB_ADMIN . 'admin-display_class.php');

        // get run of admin display in order to display first page of admin with basics settings updated
        $aDisplay = BT_AdminDisplay::create()->run('consent');

        // use case - empty error and updating status
        $aDisplay['assign'] = array_merge($aDisplay['assign'], array(
            'bAjaxMode' => GAnalyticsPro::$sQueryMode,
            'bUpdate' => (empty($aData['aErrors']) ? true : false),
        ), $aData);

        // destruct
        unset($aData);

        return $aDisplay;
    }

    /**
     * updateAdvanced() method update advanced settings
     *
     * @param array $aPost
     * @return array
     */
    private function updateAdvanced(array $aPost)
    {
        // clean headers
        @ob_end_clean();

        // set
        $aData = array();

        try {

            Configuration::updateValue('GAP_STATUS_SELECTION',serialize(Tools::getValue('bt_order-status')));
            Configuration::updateValue('GAP_STATUS_PARTIAL_REFUNDED',serialize(Tools::getValue('bt_order-status_partial_refund')));
            Configuration::updateValue('GAP_CAT_LABEL_FORMAT',Tools::getValue('bt_label-format'));
            Configuration::updateValue('GAP_TRACK_ADD_CART_PAGE', Tools::getValue('bt_track_cart_page'));
            Configuration::updateValue('GAP_JS_CATEGORY_PROD', Tools::getValue('bt_code_category_product'));
            Configuration::updateValue('GAP_JS_REMOVE_CART', Tools::getValue('bt_code_remove_cart'));
            Configuration::updateValue('GAP_JS_SHIPPING', Tools::getValue('bt_code_shipping'));
            Configuration::updateValue('GAP_JS_PAYMENT', Tools::getValue('bt_code_payment'));
            Configuration::updateValue('GAP_JS_LOGIN', Tools::getValue('bt_code_login'));
            Configuration::updateValue('GAP_JS_SIGNUP', Tools::getValue('bt_code_signup'));
            Configuration::updateValue('GAP_JS_WISH_CAT', Tools::getValue('bt_code_wishlist_cat'));
            Configuration::updateValue('GAP_JS_WISH_PROD', Tools::getValue('bt_code_wishlist_prod'));
            Configuration::updateValue('GAP_USE_TAX', Tools::getValue('bt_use-tax'));
            Configuration::updateValue('GAP_USE_SHIPPING', Tools::getValue('bt_use-shipping'));
            Configuration::updateValue('GAP_USE_WRAPPING', Tools::getValue('bt_use-wrapping'));

        } catch (Exception $e) {
            $aData['aErrors'][] = array('msg' => $e->getMessage(), 'code' => $e->getCode());
        }

        // get configuration options
        BT_GapModuleTools::getConfiguration();

        // require admin configure class - to factorise
        require_once(_GAP_PATH_LIB_ADMIN . 'admin-display_class.php');

        // get run of admin display in order to display first page of admin with advanced settings updated
        $aDisplay = BT_AdminDisplay::create()->run('advanced');

        // use case - empty error and updating status
        $aDisplay['assign'] = array_merge($aDisplay['assign'], array(
            'bAjaxMode' => GAnalyticsPro::$sQueryMode,
            'bUpdate' => (empty($aData['aErrors']) ? true : false),
        ), $aData);

        // destruct
        unset($aData);

        return $aDisplay;
    }

    /**
     * create() method set singleton
     *
     * @return obj
     */
    public static function create()
    {
        static $oUpdate;

        if (null === $oUpdate) {
            $oUpdate = new BT_AdminUpdate();
        }
        return $oUpdate;
    }
}
