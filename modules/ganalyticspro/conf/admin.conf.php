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

define('_GAP_PATH_LIB_ADMIN', _GAP_PATH_LIB . 'admin/');
define('_GAP_TPL_ADMIN_PATH', 'admin/');

/* defines body tpl */
define('_GAP_TPL_BODY', 'body.tpl');
define('_GAP_TPL_UA', 'ua.tpl');
define('_GAP_TPL_G4', 'g4.tpl');
define('_GAP_TPL_ADVANCED', 'advanced.tpl');
define('_GAP_TPL_CONSENT', 'consent.tpl');

/* defines update sql file */
define('_GAP_REFUND_SQL_FILE', 'refund.sql');

/* defines constant for external BT API URL */
define('_GAP_BT_API_MAIN_URL', '');

/* defines constant for external BT FAQ URL */
define('_GAP_BT_FAQ_MAIN_URL', 'http://faq.businesstech.fr/');

/* defines loader gif name*/
define('_GAP_LOADER_GIF', 'bx_loader.gif');

/* defines variable for sql update */
$GLOBALS[_GAP_MODULE_NAME . '_SQL_UPDATE'] = array(
    'table' => array(
        'refund' => _GAP_REFUND_SQL_FILE,
    ),
);

/* defines variable for setting all request params : use for ajax request in to admin context */
$GLOBALS[_GAP_MODULE_NAME . '_REQUEST_PARAMS'] = array(
    'ua' => array('action' => 'update', 'type' => 'ua'),
    'gfour' => array('action' => 'update', 'type' => 'gfour'),
    'advanced' => array('action' => 'update', 'type' => 'advanced'),
    'consent' => array('action' => 'update', 'type' => 'consent'),
);

/* defines variable for templates we need to check changes for tracking events */
$GLOBALS[_GAP_MODULE_NAME . '_TEMPLATES_LIST'] = array(
    'product-list' => array(
        'name' => 'product-list',
        'theme' => true,
        'path' => _PS_THEME_DIR_,
        'template' => 'product-list.tpl',
        'pattern' => array(
            (version_compare(_PS_VERSION_, '1.6','>=') ? ' data-product-id="{$product.id_product|intval}"' : ' data-product-id="{$product.id_product|intval}"')
        ),
    ),
    'product-comparison' => array(
        'name' => 'product-comparison',
        'theme' => true,
        'path' => _PS_THEME_DIR_,
        'template' => 'products-comparison.tpl',
        'pattern' => array(
            (version_compare(_PS_VERSION_, '1.6','>=') ? ' data-product-id="{$product->id|intval}"' : ' data-product-id="{$product->id|intval}"')
        ),
    ),
    'product' => array(
        'name' => 'product',
        'theme' => true,
        'path' => _PS_THEME_DIR_,
        'template' => 'product.tpl',
        'pattern' => array(
            (version_compare(_PS_VERSION_, '1.6','>=') ? ' data-product-id="{$accessory.id_product|intval}"' : ' data-product-id="{$accessory.id_product|intval}"')
        ),
    ),
);
