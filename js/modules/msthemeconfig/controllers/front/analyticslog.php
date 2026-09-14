<?php
/**
 * Analytics Event Log — front controller
 *
 * Receives a navigator.sendBeacon() POST from tagmanager.js and appends one JSON line
 * to var/logs/analytics_events.log.
 *
 * Enabled/disabled via: msthemeconfig admin → Services panel → "Analytics event logging (browser)".
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class MsthemeconfigAnalyticslogModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        // Only accept POST (sendBeacon always uses POST)
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            die(json_encode(['ok' => false, 'reason' => 'method']));
        }

        // Read config — same fallback pattern as GA4_PAYMENT_LOG
        $ctx     = Context::getContext();
        $idLang  = $ctx->language ? $ctx->language->id : null;
        $idShop  = $ctx->shop ? $ctx->shop->id : null;
        $idGroup = ($ctx->shop && isset($ctx->shop->id_shop_group)) ? $ctx->shop->id_shop_group : null;

        $logEnabled = $idLang
            ? (int) Configuration::get('MSTHEMECONFIG_GA4_EVENT_LOG', $idLang, $idGroup, $idShop)
            : 0;

        if (!$logEnabled) {
            $logEnabled = (int) Db::getInstance()->getValue(
                'SELECT cl.`value`
                 FROM `' . _DB_PREFIX_ . 'configuration_lang` cl
                 INNER JOIN `' . _DB_PREFIX_ . 'configuration` c
                   ON c.id_configuration = cl.id_configuration
                 WHERE c.`name` = "MSTHEMECONFIG_GA4_EVENT_LOG"
                 ORDER BY cl.`value` DESC
                 LIMIT 1'
            );
        }

        if (!$logEnabled) {
            die(json_encode(['ok' => false, 'reason' => 'disabled']));
        }

        // Parse sendBeacon payload (raw JSON body)
        $raw  = (string) file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (empty($data['event'])) {
            die(json_encode(['ok' => false, 'reason' => 'no_event']));
        }

        // Write log entry
        $logFile = rtrim(_PS_ROOT_DIR_, '/\\') . '/var/logs/analytics_events.log';

        $entry = json_encode([
            'ts'      => date('Y-m-d H:i:s'),
            'event'   => $data['event'],
            'page'    => $data['page'] ?? '',
            'cart_id' => $data['cart_id'] ?? null,
            'data'    => $data['data'] ?? [],
        ], JSON_UNESCAPED_UNICODE) . "\n";

        file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);

        die(json_encode(['ok' => true]));
    }
}
