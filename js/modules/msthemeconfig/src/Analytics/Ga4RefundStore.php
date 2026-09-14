<?php
declare(strict_types=1);

namespace MsThemeConfig\Analytics;

use Db;
use RuntimeException;

/** A separate analytics register. Never writes to orders, credit notes or payment tables. */
final class Ga4RefundStore implements RefundDispatchStore
{
    private Db $db;

    public function __construct(?Db $db = null)
    {
        $this->db = $db ?? Db::getInstance();
    }

    public static function install(): bool
    {
        return Db::getInstance()->execute(
            'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'ga4_refund_dispatch` (
                `id_shop` INT UNSIGNED NOT NULL,
                `id_order_slip` INT UNSIGNED NOT NULL,
                `id_order` INT UNSIGNED NOT NULL,
                `order_reference` VARCHAR(100) NOT NULL,
                `event_id` VARCHAR(64) NOT NULL,
                `state` VARCHAR(16) NOT NULL,
                `reason` VARCHAR(96) NOT NULL DEFAULT \'\',
                `claim_token` CHAR(32) NOT NULL,
                `attempt_count` INT UNSIGNED NOT NULL DEFAULT 1,
                `http_status` SMALLINT UNSIGNED DEFAULT NULL,
                `curl_errno` SMALLINT DEFAULT NULL,
                `created_at` DATETIME NOT NULL,
                `updated_at` DATETIME NOT NULL,
                `accepted_at` DATETIME DEFAULT NULL,
                PRIMARY KEY (`id_shop`, `id_order_slip`),
                KEY `order_lookup` (`id_order`),
                KEY `state_lookup` (`state`, `updated_at`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
        );
    }

    public function claim(array $key, bool $retry): ?string
    {
        $shopId = (int)$key['id_shop'];
        $slipId = (int)$key['id_order_slip'];
        $orderId = (int)$key['id_order'];
        if ($shopId <= 0 || $slipId <= 0 || $orderId <= 0) {
            throw new RuntimeException('invalid_refund_dispatch_key');
        }
        $token = bin2hex(random_bytes(16));
        $table = '`' . _DB_PREFIX_ . 'ga4_refund_dispatch`';
        if ($retry) {
            // Explicit retries only. Accepted, skipped, expired and uncertain attempts,
            // including a process that died while sending, cannot be replayed by this path.
            $sql = 'UPDATE ' . $table
                . ' SET `state` = \'preparing\', `reason` = \'\', `claim_token` = \'' . $token . '\','
                . ' `attempt_count` = `attempt_count` + 1, `http_status` = NULL, `curl_errno` = NULL,'
                . ' `updated_at` = UTC_TIMESTAMP()'
                . ' WHERE `id_shop` = ' . $shopId . ' AND `id_order_slip` = ' . $slipId
                . ' AND `id_order` = ' . $orderId . ' AND `state` IN (\'blocked\', \'failed\')';
        } else {
            // The primary key arbitrates concurrent hook calls before either can send HTTP.
            $sql = 'INSERT IGNORE INTO ' . $table
                . ' (`id_shop`, `id_order_slip`, `id_order`, `order_reference`, `event_id`,'
                . ' `state`, `claim_token`, `created_at`, `updated_at`) VALUES ('
                . $shopId . ', ' . $slipId . ', ' . $orderId
                . ', \'' . pSQL((string)$key['order_reference']) . '\''
                . ', \'' . Ga4RefundBuilder::eventId($shopId, $slipId) . '\''
                . ', \'preparing\', \'' . $token . '\', UTC_TIMESTAMP(), UTC_TIMESTAMP())';
        }
        if (!$this->db->execute($sql)) {
            throw new RuntimeException('refund_dispatch_claim_failed');
        }

        return $this->db->Affected_Rows() === 1 ? $token : null;
    }

    public function update(array $key, string $token, string $state, string $reason, array $response = []): void
    {
        if (!in_array($state, ['sending', 'accepted', 'blocked', 'failed', 'uncertain', 'skipped', 'expired'], true)) {
            throw new RuntimeException('invalid_refund_dispatch_state');
        }
        $sql = 'UPDATE `' . _DB_PREFIX_ . 'ga4_refund_dispatch`'
            . ' SET `state` = \'' . pSQL($state) . '\', `reason` = \'' . pSQL($reason) . '\','
            . ' `http_status` = ' . (isset($response['http_status']) ? (int)$response['http_status'] : 'NULL') . ','
            . ' `curl_errno` = ' . (isset($response['curl_errno']) ? (int)$response['curl_errno'] : 'NULL') . ','
            . ' `updated_at` = UTC_TIMESTAMP()'
            . ($state === 'accepted' ? ', `accepted_at` = UTC_TIMESTAMP()' : '')
            . ' WHERE `id_shop` = ' . (int)$key['id_shop']
            . ' AND `id_order_slip` = ' . (int)$key['id_order_slip']
            . ' AND `claim_token` = \'' . pSQL($token) . '\''
            . ' AND `state` IN (\'preparing\', \'sending\')';
        if (!$this->db->execute($sql) || $this->db->Affected_Rows() !== 1) {
            throw new RuntimeException('refund_dispatch_state_write_failed');
        }
    }

    public function find(int $shopId, int $slipId): ?array
    {
        $rows = $this->db->executeS(
            'SELECT `id_shop`, `id_order_slip`, `id_order`, `order_reference`, `event_id`,'
            . ' `state`, `reason`, `attempt_count`, `http_status`, `curl_errno`,'
            . ' `created_at`, `updated_at`, `accepted_at`'
            . ' FROM `' . _DB_PREFIX_ . 'ga4_refund_dispatch`'
            . ' WHERE `id_shop` = ' . $shopId . ' AND `id_order_slip` = ' . $slipId . ' LIMIT 1',
            true,
            false
        );
        // getRow() returns false both for an empty result and an SQL failure when debug
        // mode is off. An unavailable register must not look like a new, unsent note.
        if (!is_array($rows)) {
            throw new RuntimeException('refund_dispatch_read_failed');
        }

        return $rows[0] ?? null;
    }
}
