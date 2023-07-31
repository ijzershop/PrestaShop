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

namespace GanalyticsPro\Configuration;

class moduleConfiguration
{
    // General values and path
    const GAP_MODULE_NAME = 'GAP';
    const GAP_MODULE_SET_NAME = 'ganalyticspro';
    const GAP_SUPPORT_ID = '21956';
    const GAP_SUPPORT_BT = false;
    const GAP_SUPPORT_URL = 'https://addons.prestashop.com/';
    const GAP_PATH_TPL = _PS_MODULE_DIR_ . 'ganalyticspro/views/templates/';
    const GAP_SHOP_PATH_ROOT = _PS_ROOT_DIR_ . '/';
    const GAP_PATH_CONF = _PS_MODULE_DIR_ . 'ganalyticspro/conf/';
    const GAP_PATH_SQL = _PS_MODULE_DIR_ . 'ganalyticspro/sql/';
    const GAP_LIB_DAO = _PS_MODULE_DIR_ . 'ganalyticspro/lib/dao/';
    const GAP_URL_JS = _MODULE_DIR_ . 'ganalyticspro/views/js/';
    const GAP_URL_CSS = _MODULE_DIR_ . 'ganalyticspro/views/css/';
    const GAP_MODULE_URL = _MODULE_DIR_ . 'ganalyticspro/';
    const GAP_URL_IMG = _MODULE_DIR_ . 'ganalyticspro/views/img/';
    const GAP_DEBUG = false;
    const GAP_USE_JS = true;
    const GAP_PARAM_CTRL_NAME = 'sController';
    const GAP_ADMIN_CTRL = 'admin';
    const GAP_TPL_FRONT_PATH = 'front/';
    const GAP_TPL_HOOK_PATH = 'hook/';
    const GAP_PATH_LIB_INSTALL = _PS_MODULE_DIR_ . 'ganalyticspro/lib/install/';
    const GAP_INSTALL_SQL_FILE = 'install.sql';
    const GAP_UNINSTALL_SQL_FILE = 'uninstall.sql';
    const GAP_LOG_JAM_SQL = false;
    const GAP_LOG_JAM_CONFIG = false;
    const GAP_BT_FAQ_MAIN_URL = 'http://faq.businesstech.fr/';

    /**
     * return the default conf var
     *
     * @return array
     */
    public static function getConfVar()
    {
        return [
            'GAP_GFOUR_ID' => '',
            'GAP_USE_GFOUR' => false,
            'GAP_UPDATE_HTML_ELEM' => false,
            'GAP_JS_CATEGORY_PROD' => '',
            'GAP_JS_SHIPPING' => '',
            'GAP_JS_PAYMENT' => '',
            'GAP_JS_LOGIN' => '',
            'GAP_JS_SIGNUP' => '',
            'GAP_JS_WISH_CAT' => '',
            'GAP_JS_WISH_PROD' => '',
            'GAP_USE_TAX' => false,
            'GAP_USE_SHIPPING' => false,
            'GAP_USE_WRAPPING' => false,
            'GAP_CAT_LABEL_FORMAT' => 'short',
            'GAP_USE_CONSENT' => false,
            'GAP_USE_AXEPTIO' => false,
            'GAP_ELEMENT_HTML_ID' => '',
            'GAP_ELEMENT_HTML_ID_SECOND' => '',
            'GAP_STATUS_SELECTION' => serialize([6, 7]),
            'GAP_STATUS_PARTIAL_REFUNDED' => serialize([18]),
            'GAP_PURCHASE_ID_PREF' => 'order-reference',
            'GAP_STEP_CHECKOUT' => serialize(['selector' => ['.standard-checkout']]),
            'GAP_DEDUCT_DISCOUNT' => true,
            'GAP_USER_ID' => true,
            'GAP_ORDER_ID_MIN' => true,
        ];
    }

    /* defines variable to hooks settings */
    const GAP_HOOKS = [
        ['name' => 'displayHeader', 'use' => false, 'title' => 'Header'],
        ['name' => 'actionOrderStatusUpdate', 'use' => false, 'title' => 'Admin Order Status Update'],
    ];

    /* defines variable to assign Admin Tab titles */
    const GAP_TABS = [
        'AdminGoogleAnalyticsPro' => [
            'lang' => [
                'en' => 'Google Analytics Pro',
                'fr' => 'Google Analytics Pro',
                'de' => 'Google Analytics Pro',
                'it' => 'Google Analytics Pro',
                'es' => 'Google Analytics Pro',
            ],
            'parent' => 'AdminStats',
            'oldName' => 'AdminGoogleAnalyticsPro',
        ],
    ];

    /**
     * return the default JS messages
     *
     * @return array
     */
    public static function getJsMessage()
    {
        return [
            'gaId' => \GAnalyticsPro::$oModule->l('You have not filled in your GA4 measurement ID', 'module-tools_class'),
            'htmlElement' => \GAnalyticsPro::$oModule->l('You have not filled in the HTML element', 'module-tools_class'),
        ];
    }

    /**
     * return the array of table and SQL files to use
     *
     * @return array
     */
    public static function getSqlUpdateData()
    {
        return [
            'table' => [],
            'field' => [],
        ];
    }

    const GAP_LABEL_FORMAT = ['short' => '', 'long' => ''];

    /**
     * return the array of available request params
     *
     * @return array
     */
    public static function getRequestParams()
    {
        return [
            'gfour' => ['action' => 'update', 'type' => 'gfour'],
            'advanced' => ['action' => 'update', 'type' => 'advanced'],
            'consent' => ['action' => 'update', 'type' => 'consent'],
        ];
    }

    const GAP_TAGS_TYPE = [
        'home' => 'home',
        'category' => 'category',
        'product' => 'product',
        'cart' => 'cart',
        'purchase' => 'purchase',
        'search' => 'searchresults',
        'other' => 'other',
        'manufacturer' => 'manufacturer',
        'promotion' => 'promotion',
        'newproducts' => 'newproducts',
        'bestsales' => 'bestsales',
        'payment' => 'payment',
        'instantSearch' => 'instantSearch',
        'productSub' => 'productSub',
        'checkout' => 'checkout',
        'shipping' => 'shipping',
        'registration' => 'registration',
        'lead' => 'lead',
    ];
}
