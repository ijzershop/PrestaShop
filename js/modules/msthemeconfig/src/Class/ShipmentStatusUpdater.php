<?php

declare(strict_types=1);

namespace MsThemeConfig\Class;

use Db;
use Exception;

/**
 * Fetches Koopman shipment status for all active (non-completed) tracking numbers
 * and upserts the result into ps_koopman_shipment_status.
 *
 * Completed status codes are those with close_order = 1 in the Koopman API definitions.
 */
class ShipmentStatusUpdater
{
    /**
     * Status codes that definitively close a shipment (close_order = 1).
     * When the latest status is one of these, we stop polling.
     */
    const COMPLETED_STATUS_CODES = [0, 156, 242, 252, 256, 271, 297, 298];

    private ExportOrdersMultipleCollies $api;
    private array $log = [];

    public function __construct()
    {
        // Construct with id_order = null; we only use the API methods
        $this->api = new ExportOrdersMultipleCollies(null);
    }

    /**
     * Main entry point. Fetches and stores status for all active tracking numbers.
     *
     * @return array Log of processed tracking numbers with result/error info
     */
    public function run(): array
    {
        $rows = $this->getActiveTrackingRows();

        foreach ($rows as $row) {
            $orderId = (int) $row['id_order'];
            // A single order_carrier row may hold comma-separated tracking numbers
            $trackingNumbers = array_filter(
                array_map('trim', explode(',', (string) $row['tracking_number'])),
                static fn($t) => strlen($t) > 5
            );

            foreach ($trackingNumbers as $trackingNumber) {
                $this->processTrackingNumber($orderId, $trackingNumber);
            }
        }

        return $this->log;
    }

    /**
     * Returns order_carrier rows whose tracking numbers are not yet completed.
     * Includes rows with no entry in koopman_shipment_status yet.
     */
    private function getActiveTrackingRows(): array
    {
        $sql = 'SELECT oc.id_order, oc.tracking_number
                FROM `' . _DB_PREFIX_ . 'order_carrier` oc
                LEFT JOIN `' . _DB_PREFIX_ . 'koopman_shipment_status` kss
                    ON kss.tracking_number = oc.tracking_number
                WHERE oc.tracking_number IS NOT NULL
                  AND oc.tracking_number != \'\'
                  AND LENGTH(oc.tracking_number) > 5
                  AND (kss.id IS NULL OR kss.is_completed = 0)';

        return Db::getInstance()->executeS($sql) ?: [];
    }

    /**
     * Fetches the current status for one tracking number from the Koopman API
     * and upserts it into the status table.
     *
     * Two-step approach:
     *  1. apiShipmentStatusByTrackingEndpoint — works after package is picked up
     *  2. apiOrderEndpoint/{tracking}         — works when registered but not yet picked up (200)
     *                                           or already sent (406)
     */
    private function processTrackingNumber(int $orderId, string $trackingNumber): void
    {
        try {
            $response = $this->api->makeApiRequest(
                $this->api->apiShipmentStatusByTrackingEndpoint . '/' . $trackingNumber,
                [],
                'GET'
            );

            // data is an array of status history entries (chronological); take the last one
            $history = $response['data'] ?? $response;

            if (is_array($history) && isset($history[0])) {
                $latest = end($history);
                $statusCode = (string) ($latest['status_code'] ?? '');
                $this->upsertFromHistory($orderId, $trackingNumber, $latest, $history);
                $isCompleted = in_array((int) $statusCode, self::COMPLETED_STATUS_CODES);
                $this->log[] = [
                    'tracking' => $trackingNumber,
                    'source' => 'status_endpoint',
                    'status_code' => $statusCode,
                    'status_description' => $latest['status_description'] ?? '',
                    'is_completed' => $isCompleted,
                ];
                return;
            }

            // No history data yet — fall through to the order endpoint fallback
            $this->tryOrderEndpointFallback($orderId, $trackingNumber);
        } catch (Exception $e) {
            // Status endpoint failed (e.g. 404 = not found yet) — try order endpoint
            $this->tryOrderEndpointFallback($orderId, $trackingNumber, $e->getMessage());
        }
    }

    /**
     * Fallback: query apiOrderEndpoint/{tracking} for packages registered in the terminal
     * but not yet picked up (200) or already sent (406).
     */
    private function tryOrderEndpointFallback(int $orderId, string $trackingNumber, string $previousError = ''): void
    {
        try {
            $raw = $this->api->makeApiRequestRaw(
                $this->api->apiOrderEndpoint . '/' . $trackingNumber,
                [],
                'GET'
            );
            $httpCode = $raw['http_code'];

            if ($httpCode === 200) {
                $this->upsertSimpleStatus(
                    $orderId,
                    $trackingNumber,
                    'REGISTERED',
                    'Geregistreerd in terminal (nog niet opgehaald)',
                    false
                );
                $this->log[] = [
                    'tracking' => $trackingNumber,
                    'source' => 'order_endpoint_200',
                    'status_code' => 'REGISTERED',
                    'status_description' => 'Geregistreerd in terminal (nog niet opgehaald)',
                    'is_completed' => false,
                ];
            } elseif ($httpCode === 406) {
                // Package already sent — edge case, should have been caught by status endpoint
                $this->upsertSimpleStatus(
                    $orderId,
                    $trackingNumber,
                    'SENT',
                    'Pakket al verzonden (terminal bevestigd)',
                    false
                );
                $this->log[] = [
                    'tracking' => $trackingNumber,
                    'source' => 'order_endpoint_406',
                    'status_code' => 'SENT',
                    'status_description' => 'Pakket al verzonden (terminal bevestigd)',
                    'is_completed' => false,
                ];
            } else {
                $this->log[] = [
                    'tracking' => $trackingNumber,
                    'source' => 'not_found',
                    'http_code' => $httpCode,
                    'previous_error' => $previousError,
                ];
            }
        } catch (Exception $e) {
            $this->log[] = [
                'tracking' => $trackingNumber,
                'source' => 'error',
                'error' => $e->getMessage(),
                'previous_error' => $previousError,
            ];
        }
    }

    /**
     * Upserts a full status record from a history entry.
     */
    private function upsertFromHistory(int $orderId, string $trackingNumber, array $latest, array $fullHistory): void
    {
        $statusCode = (string) ($latest['status_code'] ?? '');
        $statusDesc = (string) ($latest['status_description'] ?? '');
        $statusDate = $latest['status_date'] ?? null;
        $statusTime = $latest['status_time'] ?? null;
        $statusDepot = isset($latest['status_depot']) ? (int) $latest['status_depot'] : null;
        $etaDate = $latest['eta']['date'] ?? null;
        $etaFrom = $latest['eta']['from'] ?? null;
        $etaTo = $latest['eta']['to'] ?? null;
        $isCompleted = in_array((int) $statusCode, self::COMPLETED_STATUS_CODES) ? 1 : 0;

        $this->upsert(
            $orderId,
            $trackingNumber,
            $statusCode,
            $statusDesc,
            $statusDate,
            $statusTime,
            $statusDepot,
            $etaDate,
            $etaFrom,
            $etaTo,
            $isCompleted,
            json_encode($fullHistory)
        );
    }

    /**
     * Upserts a minimal status record (used for REGISTERED/SENT fallback states).
     */
    private function upsertSimpleStatus(
        int $orderId,
        string $trackingNumber,
        string $statusCode,
        string $statusDesc,
        bool $isCompleted
    ): void {
        $this->upsert($orderId, $trackingNumber, $statusCode, $statusDesc, null, null, null, null, null, null, $isCompleted ? 1 : 0, null);
    }

    /**
     * INSERT ... ON DUPLICATE KEY UPDATE for the status table.
     */
    private function upsert(
        int $orderId,
        string $trackingNumber,
        string $statusCode,
        string $statusDesc,
        ?string $statusDate,
        ?string $statusTime,
        ?int $statusDepot,
        ?string $etaDate,
        ?string $etaFrom,
        ?string $etaTo,
        int $isCompleted,
        ?string $fullHistory
    ): void {
        $db = Db::getInstance();
        $now = date('Y-m-d H:i:s');

        $existing = $db->getValue(
            'SELECT id FROM `' . _DB_PREFIX_ . 'koopman_shipment_status`
             WHERE tracking_number = \'' . pSQL($trackingNumber) . '\''
        );

        $data = [
            'id_order' => $orderId,
            'tracking_number' => pSQL($trackingNumber),
            'status_code' => pSQL($statusCode),
            'status_description' => pSQL($statusDesc),
            'status_date' => $statusDate ? pSQL($statusDate) : null,
            'status_time' => $statusTime ? pSQL($statusTime) : null,
            'status_depot' => $statusDepot,
            'eta_date' => $etaDate ? pSQL($etaDate) : null,
            'eta_from' => $etaFrom ? pSQL($etaFrom) : null,
            'eta_to' => $etaTo ? pSQL($etaTo) : null,
            'is_completed' => $isCompleted,
            'full_history' => $fullHistory ? pSQL($fullHistory, true) : null,
            'date_upd' => pSQL($now),
        ];

        if ($existing) {
            unset($data['id_order'], $data['tracking_number']); // don't overwrite keys
            $db->update('koopman_shipment_status', $data, 'id = ' . (int) $existing);
        } else {
            $data['date_add'] = pSQL($now);
            $db->insert('koopman_shipment_status', $data);
        }
    }

    /**
     * Returns the stored status record for a given tracking number (for the frontend).
     */
    public static function getStatusForTracking(string $trackingNumber): ?array
    {
        $row = Db::getInstance()->getRow(
            'SELECT * FROM `' . _DB_PREFIX_ . 'koopman_shipment_status`
             WHERE tracking_number = \'' . pSQL($trackingNumber) . '\''
        );

        return $row ?: null;
    }

    /**
     * Returns all stored status records for an order (may have multiple collies).
     */
    public static function getStatusesForOrder(int $orderId): array
    {
        return Db::getInstance()->executeS(
            'SELECT * FROM `' . _DB_PREFIX_ . 'koopman_shipment_status`
             WHERE id_order = ' . $orderId . '
             ORDER BY id ASC'
        ) ?: [];
    }
}
