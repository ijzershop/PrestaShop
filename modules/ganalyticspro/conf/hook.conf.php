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

require_once(dirname(__FILE__) . '/common.conf.php');
define('_GAP_PATH_LIB_HOOK', _GAP_PATH_LIB . 'hook/');
define('_GAP_PATH_LIB_GTAG', _GAP_PATH_LIB . 'gtag/');
define('_GAP_TPL_ADMIN_HEADER', 'admin-header.tpl');
define('_GAP_TPL_HOME', 'home.tpl');
define('_GAP_TPL_FOOTER', 'footer.tpl');
define('_GAP_TPL_ADMIN_FOOTER', 'footer-admin.tpl');
define('_GAP_TPL_PROD_FOOTER', 'product-footer.tpl');
define('_GAP_TPL_PROD_CANCEL', 'product-cancel.tpl');
define('_GAP_TPL_ORDER_STATUS', 'order-status-update.tpl');
define('_GAP_TPL_ORDER_CONFIRMATION', 'order-confirmation.tpl');
define('_GAP_TPL_ADMIN_ORDER', 'admin-order.tpl');
define('_GAP_TPL_GFOUR_JS', 'gfour-js.tpl');
define('_GAP_TPL_GFOUR_JS_17_JS', 'gfour-17-js.tpl');

/* defines variable to translate js msg */
$GLOBALS[_GAP_MODULE_NAME . '_JS_FRONT_MSG'] = array();

/* defines variable for setting all request params */
$GLOBALS[_GAP_MODULE_NAME . '_REQUEST_PARAMS'] = array(
    'basics' => array('action' => 'update', 'type' => 'basics'),
    'productClick' => array('action' => 'click', 'type' => 'product'),
);
