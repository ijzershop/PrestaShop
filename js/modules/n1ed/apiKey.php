<?php
/**
 * @author    N1ED http://n1ed.com
 * @copyright N1ED/EdSDK
 * @license   Proprietary license
 * @file      Script for setting and updating API key and token of N1ED
 */

$n1edShopRoot = require __DIR__ . '/shop-root.php';
require_once $n1edShopRoot . '/config/config.inc.php';
require_once $n1edShopRoot . '/init.php';
if (Tools::getValue('n1edApiKey') && Tools::getValue('n1edToken')) {
    Configuration::updateValue('N1ED_APIKEY', Tools::getValue('n1edApiKey'));
    Configuration::updateValue('N1ED_TOKEN', Tools::getValue('n1edToken'));
    die('OK');
} else {
    die('No key or token');
}
