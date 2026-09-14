<?php
$n1edShopRoot = require dirname(__DIR__) . '/shop-root.php';
require __DIR__ . '/vendor/autoload.php';

use EdSDK\FlmngrServer\FlmngrServer;

// Uncomment line below to enable CORS if your request domain and server domain are different
// header('Access-Control-Allow-Origin: *');
if (!defined('_PS_ROOT_DIR_')) {
    define('_PS_ROOT_DIR_', $n1edShopRoot);
}
if (!defined('_MODULE_ROOT_DIR_')) {
    define('_MODULE_ROOT_DIR_', dirname(__DIR__) . '/');
}

echo FlmngrServer::flmngrRequest([
    'dirFiles' => $n1edShopRoot . '/img/cms',
]);
