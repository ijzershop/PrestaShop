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

define('_GAP_MODULE_NAME', 'GAP');
define('_GAP_SUPPORT_BT', false);
define('_GAP_SUPPORT_URL', 'https://addons.prestashop.com/');
//define('_GAP_SUPPORT_URL', 'http://www.businesstech.fr/');
define('_GAP_SUPPORT_ID', '21956');
define('_GAP_MODULE_SET_NAME', 'ganalyticspro');
define('_GAP_PATH_ROOT', _PS_MODULE_DIR_ . _GAP_MODULE_SET_NAME . '/');
define('_GAP_PATH_CONF', _GAP_PATH_ROOT . 'conf/');
define('_GAP_PATH_LIB', _GAP_PATH_ROOT . 'lib/');
define('_GAP_PATH_LIB_PIXEL_TAGS', _GAP_PATH_LIB . 'gtag/');
define('_GAP_PATH_LIB_COMMON', _GAP_PATH_LIB . 'common/');
define('_GAP_PATH_LIB_ANALYTICS', _GAP_PATH_LIB . 'analytics/');
define('_GAP_PATH_SQL', _GAP_PATH_ROOT . 'sql/');
define('_GAP_PATH_VIEWS', 'views/');
define('_GAP_URL_JS', _MODULE_DIR_ . _GAP_MODULE_SET_NAME . '/' . _GAP_PATH_VIEWS . 'js/');
define('_GAP_URL_CSS', _MODULE_DIR_ . _GAP_MODULE_SET_NAME . '/' . _GAP_PATH_VIEWS . 'css/');
define('_GAP_MODULE_URL', _MODULE_DIR_ . _GAP_MODULE_SET_NAME . '/');
define('_GAP_PATH_IMG', 'img/');
define('_GAP_URL_IMG', _MODULE_DIR_ . _GAP_MODULE_SET_NAME . '/' . _GAP_PATH_VIEWS . _GAP_PATH_IMG);
define('_GAP_TPL_FRONT_PATH', 'front/');
define('_GAP_PATH_TPL_NAME', _GAP_PATH_VIEWS . 'templates/');
define('_GAP_PATH_TPL', _GAP_PATH_ROOT . _GAP_PATH_TPL_NAME);
define('_GAP_TPL_HOOK_PATH', 'hook/');
define('_GAP_TPL_HEADER', 'header.tpl');
define('_GAP_TPL_ERROR', 'error.tpl');
define('_GAP_TPL_CONFIRM', 'confirm.tpl');
define('_GAP_TPL_AJAX', 'ajax.tpl');
define('_GAP_DEBUG', false);
define('_GAP_USE_JS', true);
define('_GAP_PARAM_CTRL_NAME', 'sController');
define('_GAP_ADMIN_CTRL', 'admin');
define('_GAP_JS_NAME', 'BTGA');

/* defines variables to configuration settings */
$GLOBALS['GAP_CONFIGURATION'] = array(
    'GAP_MODULE_VERSION' => '1.0.0',
    'GAP_GA_ID' => '',
    'GAP_USE_UA' => false,
    'GAP_GFOUR_ID' => '',
    'GAP_USE_GFOUR' => false,
    'GAP_TRACK_ADD_CART_PAGE' => false,
    'GAP_UPDATE_HTML_ELEM' => false,
    'GAP_JS_CATEGORY_PROD' => '',
    'GAP_JS_REMOVE_CART' => '',
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
    'GAP_ELEMENT_HTML_ID' => '',
    'GAP_STATUS_SELECTION' => serialize(array(6, 7)),
    'GAP_STATUS_PARTIAL_REFUNDED' => serialize(array(18)),
    'GAP_PRODUCT_CLICK' => serialize(
        array(
            'selector' => array('.product_img_link, .product-name, .button.lnk_view, a.product_image, .s_title_block a, .product-name a, .product_desc a, .lnk_more'),
            'link' => '$(this).attr(\'href\')',
            'id' => array(
                '$(this).closest(\'li\').attr(\'data-product-id\')', '$(this).closest(\'td[data-product-id]\').attr(\'data-product-id\')'
            )
        )
    ),
    'GAP_STEP_CHECKOUT' => serialize(array('selector' => array('.standard-checkout'))),
    'GAP_STEP_SHIPPING' => serialize(
        array(
            'selector' => array('#cgv', 'input#cgv:checked'),
            'find' => (version_compare(_PS_VERSION_, '1.6', '>=') ? '$(\'.delivery_options input:checked\').closest(\'tr\').find(\'strong\').text()' : '$(\'.delivery_options input:checked\').parent().find(\'.delivery_option_title\').text()')
        )
    ),
    'GAP_STEP_PAYMENT' => serialize(
        array(
            'selector' => (version_compare(_PS_VERSION_, '1.7', '>=') ? array('input#conditions_to_approve[terms-and-conditions]:checked') : array('#HOOK_PAYMENT a')),
            'find' => (version_compare(_PS_VERSION_, '1.7', '>=') ? '$(\'.payment-options input:checked\').attr(\'data-module-name\')' : ''), 'method' => '$(this).attr(\'title\')',
            'link' => '$(this).attr(\'href\')',
        )
    ),
    'GAP_STEP_OPC' => serialize(
        array(
            'selector' => array('#HOOK_PAYMENT a'),
            'find' => (version_compare(_PS_VERSION_, '1.6', '>=') ? '$(\'.delivery_options input:checked\').closest(\'tr\').find(\'strong\').text()' : '$(\'.delivery_options input:checked\').parent().find(\'.delivery_option_title\').text()'),
            'method' => '$(this).attr(\'title\')',
            'link' => '$(this).attr(\'href\')',
        )
    ),
);
/* defines variable to hooks settings */
$GLOBALS['GAP_HOOKS'] = array(
    array('name' => 'displayHeader', 'use' => false, 'title' => 'Header'),
    array('name' => 'displayHome', 'use' => false, 'title' => 'Home'),
    array('name' => 'actionOrderStatusUpdate', 'use' => false, 'title' => 'Admin Order Status Update'),
);
if (version_compare(_PS_VERSION_, '1.7', '>=')) {
    $GLOBALS['GAP_HOOKS'][] = array(
        'name' => 'displayBeforeBodyClosingTag',
        'use' => false,
        'title' => 'display before closing tag'
    );
}
/* defines variable to assign Admin Tab titles */
$GLOBALS['GAP_TABS'] = array(
    'AdminGoogleAnalyticsPro' => array(
        'lang' => array(
            'en' => 'Google Analytics Pro',
            'fr' => 'Google Analytics Pro',
            'de' => 'Google Analytics Pro',
            'it' => 'Google Analytics Pro',
            'es' => 'Google Analytics Pro',
        ),
        'parent' => 'AdminStats',
        'oldName' => 'AdminGoogleAnalyticsPro'
    ),
);
/* defines variable to translate js msg */
$GLOBALS['GAP_JS_MSG'] = array();

/* defines modules list to set  */
$GLOBALS['GAP_MODULES_LIST'] = array(
    'homefeatured' => array(
        'name' => 'homefeatured',
        'displayName' => '',
        'limit' => (Configuration::get('HOME_FEATURED_NBR') ? (int) Configuration::get('HOME_FEATURED_NBR') : 8),
        'callback' => array('class' => 'BT_GapModuleTools', 'method' => 'getHomeFeaturedProducts'),
        'template' => 'homefeatured.tpl',
        'pattern' => array(
            'product-list.tpl', (version_compare(_PS_VERSION_, '1.6', '>=') ? ' data-product-id="{$product.id_product|intval}"' : ' data-product-id="{$aProduct.id_product|intval}"')
        )
    ),
    'blocknewproducts' => array(
        'name' => 'blocknewproducts',
        'displayName' => '',
        'limit' => (Configuration::get('NEW_PRODUCTS_NBR') ? (int) Configuration::get('NEW_PRODUCTS_NBR') : 8),
        'callback' => array('class' => 'BT_GapModuleTools', 'method' => 'getNewProducts'),
        'template' => 'blocknewproducts_home.tpl',
        'pattern' => array(
            'product-list.tpl', (version_compare(_PS_VERSION_, '1.6', '>=') ? ' data-product-id="{$product.id_product|intval}"' : ' data-product-id="{$product.id_product|intval}"')
        )
    ),
    'blockbestsellers' => array(
        'name' => 'blockbestsellers',
        'displayName' => '',
        'limit' => 8,
        'callback' => array('class' => 'BT_GapModuleTools', 'method' => 'getBestSellersProducts'),
        'template' => 'blockbestsellers-home.tpl',
        'pattern' => array(
            'product-list.tpl', (version_compare(_PS_VERSION_, '1.6', '>=') ? ' data-product-id="{$product.id_product|intval}"' : ' data-product-id="{$product.id_product|intval}"')
        )
    ),
    'blockspecials' => array(
        'name' => 'blockspecials',
        'displayName' => '',
        'limit' => (Configuration::get('BLOCKSPECIALS_SPECIALS_NBR') ? (int) Configuration::get('BLOCKSPECIALS_SPECIALS_NBR') : 8),
        'callback' => array('class' => 'BT_GapModuleTools', 'method' => 'getBlockSpecials'),
        'template' => 'blockspecials-home.tpl',
        'pattern' => array(
            'product-list.tpl', (version_compare(_PS_VERSION_, '1.6', '>=') ? ' data-product-id="{$product.id_product|intval}"' : ' data-product-id="{$product.id_product|intval}"')
        )
    ),
    'homeproducttabs' => array(
        'name' => 'homeproducttabs',
        'displayName' => '',
        'limit' => (Configuration::get('HPPRTB_PROD_PER_PAGE') ? (int) Configuration::get('HPPRTB_PROD_PER_PAGE') : 6),
        'callback' => array('class' => 'BT_GapModuleTools', 'method' => 'getHomeProductTabs'),
        'template' => 'home-tab-content.tpl',
        'pattern' => array((version_compare(_PS_VERSION_, '1.6', '>=') ? ' data-product-id="{$product.id_product|intval}"' : ' data-product-id="{$product.id_product|intval}"')
        )
    ),
);


/* defines label format to set  */
$GLOBALS['GAP_LABEL_FORMAT'] = array('short' => '', 'long' => '');

$GLOBALS['GAP_TAGS_TYPE'] = array(
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
);
