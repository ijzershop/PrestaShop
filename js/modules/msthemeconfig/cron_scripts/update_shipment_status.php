<?php

/**
 * Cron script: update Koopman shipment statuses for all active orders.
 *
 * Run via crontab (every 15 minutes during business hours):
 *   *\/15 7-20 * * 1-5 php /var/www/vhosts/ijzershop.nl/httpdocs/modules/msthemeconfig/cron_scripts/update_shipment_status.php >> /var/log/koopman_shipment_cron.log 2>&1
 *
 * Or trigger via HTTP (secured with token):
 *   https://ijzershop.nl/modules/msthemeconfig/cron_scripts/update_shipment_status.php?token=YOUR_SECRET_TOKEN
 *
 * Set the token below (must match when called via HTTP; CLI always passes).
 */

define('CRON_TOKEN', 'CHANGE_THIS_TO_A_SECURE_RANDOM_TOKEN');

// ── Security ─────────────────────────────────────────────────────────────────
$isCli = (php_sapi_name() === 'cli');
if (!$isCli) {
    $providedToken = $_GET['token'] ?? '';
    if (!hash_equals(CRON_TOKEN, $providedToken)) {
        http_response_code(403);
        die('Forbidden');
    }
    // Prevent browser caching
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
}

// ── Bootstrap PrestaShop ─────────────────────────────────────────────────────
// Path: [PS_ROOT]/modules/msthemeconfig/cron_scripts/this_file.php
//        └── 3 directories up = [PS_ROOT]
$psRoot = realpath(__DIR__ . '/../../../');
if (!$psRoot || !file_exists($psRoot . '/config/config.inc.php')) {
    // Fallback: try one more level (if module is nested deeper)
    $psRoot = realpath(__DIR__ . '/../../../../');
}
if (!$psRoot || !file_exists($psRoot . '/config/config.inc.php')) {
    $msg = 'Could not locate PrestaShop root from ' . __DIR__;
    if ($isCli) {
        fwrite(STDERR, $msg . PHP_EOL);
        exit(1);
    }
    http_response_code(500);
    die(json_encode(['error' => $msg]));
}

define('_PS_ROOT_DIR_', $psRoot);
require_once $psRoot . '/config/config.inc.php';

// ── Run updater ───────────────────────────────────────────────────────────────
use MsThemeConfig\Class\ShipmentStatusUpdater;

$startTime = microtime(true);
$updater = new ShipmentStatusUpdater();
$log = $updater->run();
$elapsed = round(microtime(true) - $startTime, 2);

$result = [
    'success' => true,
    'processed' => count($log),
    'elapsed_seconds' => $elapsed,
    'timestamp' => date('Y-m-d H:i:s'),
    'log' => $log,
];

if ($isCli) {
    echo json_encode($result, JSON_PRETTY_PRINT) . PHP_EOL;
} else {
    echo json_encode($result);
}
