<?php
declare(strict_types=1);

/**
 * Integration check of the real MySQL statements, using one connection-local TEMPORARY
 * table with a random prefix. Refuses non-loopback hosts and never bootstraps PrestaShop.
 * php module/msthemeconfig/tests/refund-store-test.php
 */
if (PHP_SAPI !== 'cli') { exit(1); }

use MsThemeConfig\Analytics\Ga4RefundStore;

spl_autoload_register(static function (string $class): void {
    if (str_starts_with($class, 'MsThemeConfig\\')) {
        require_once __DIR__ . '/../src/' . str_replace('\\', '/', substr($class, 14)) . '.php';
    }
});

/** Minimal adapter around PDO; matches the Db methods used by the production register. */
class Db
{
    public static PDO $pdo;
    public static string $testTable;
    private int $affected = 0;
    public static function getInstance(): self { return new self(); }
    private function guard(string $sql): void {
        if (!str_contains($sql, '`' . self::$testTable . '`')) {
            throw new RuntimeException('The integration check may only access its temporary register.');
        }
    }
    public function execute(string $sql): bool {
        $this->guard($sql);
        $sql = preg_replace('/^CREATE TABLE IF NOT EXISTS /', 'CREATE TEMPORARY TABLE IF NOT EXISTS ', $sql);
        $count = self::$pdo->exec($sql);
        $this->affected = $count === false ? 0 : $count;
        return $count !== false;
    }
    public function Affected_Rows(): int { return $this->affected; }
    public function executeS(string $sql, bool $array = true, bool $cache = true) {
        $this->guard($sql);
        $statement = self::$pdo->query($sql);
        return $statement === false ? false : $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}
function pSQL(string $text): string { return substr(Db::$pdo->quote($text), 1, -1); }
function check(bool $condition, string $message): void {
    if (!$condition) { throw new RuntimeException($message); }
}

try {
    $root = dirname(__DIR__, 5);
    $parameters = require $root . '/app/config/parameters.php';
    $config = $parameters['parameters'] ?? $parameters;
    $host = (string)($config['database_host'] ?? '');
    if (!in_array($host, ['127.0.0.1', 'localhost', '::1'], true)) {
        throw new RuntimeException('Only the local development database is allowed.');
    }
    $port = (int)($config['database_port'] ?: 3306);
    $database = (string)$config['database_name'];
    if (!preg_match('/^[A-Za-z0-9_-]+$/D', $database)) {
        throw new RuntimeException('Invalid local database name.');
    }
    Db::$pdo = new PDO(
        'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $database . ';charset=utf8mb4',
        (string)$config['database_user'],
        (string)$config['database_password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    define('_DB_PREFIX_', 'refund_test_' . bin2hex(random_bytes(6)) . '_');
    Db::$testTable = _DB_PREFIX_ . 'ga4_refund_dispatch';

    // Production can suppress SQL exceptions. A missing register is still an error,
    // not proof that no dispatch has been recorded for a note.
    Db::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    $missingRegisterRejected = false;
    try { (new Ga4RefundStore())->find(1, 17); }
    catch (RuntimeException $expected) {
        $missingRegisterRejected = $expected->getMessage() === 'refund_dispatch_read_failed';
    } finally {
        Db::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    check($missingRegisterRejected, 'A missing register was reported as an unsent note.');
    check(Ga4RefundStore::install(), 'Temporary schema creation failed.');
    check(Ga4RefundStore::install(), 'Schema creation is not idempotent.');

    $first = new Ga4RefundStore();
    $second = new Ga4RefundStore();
    check($first->find(1, 17) === null, 'An empty register was reported as an error.');
    $key = ['id_shop' => 1, 'id_order_slip' => 17, 'id_order' => 175030, 'order_reference' => "TEST-REFUND-'QUOTED"];
    $token = $first->claim($key, false);
    check($token !== null, 'New credit note was not claimed.');
    check($second->claim($key, false) === null, 'Duplicate claim succeeded.');
    check($second->claim($key, true) === null, 'Preparing claim was retried.');
    check($first->find(1, 17)['order_reference'] === $key['order_reference'], 'Reference was not safely quoted.');
    $first->update($key, $token, 'sending', 'http_request_started');
    check($second->claim($key, true) === null, 'Sending claim was retried.');
    $first->update($key, $token, 'accepted', 'endpoint_accepted', ['http_status' => 204, 'curl_errno' => 0]);
    $record = $first->find(1, 17);
    check($record['state'] === 'accepted' && $record['accepted_at'] !== null, 'Acknowledgement was not persisted.');
    check((int)$record['http_status'] === 204 && (int)$record['attempt_count'] === 1, 'Stored response/attempt count is wrong.');
    check($second->claim($key, true) === null, 'Accepted credit note was retried.');

    $next = array_merge($key, ['id_order_slip' => 18]);
    $oldToken = $first->claim($next, false);
    check($oldToken !== null, 'A second credit note on the same order was blocked.');
    $first->update($next, $oldToken, 'blocked', 'missing_refund_configuration');
    $newToken = $second->claim($next, true);
    check($newToken !== null && $newToken !== $oldToken, 'Retry did not get a new claim.');
    $staleClaimRejected = false;
    try { $first->update($next, $oldToken, 'sending', 'stale_attempt'); }
    catch (RuntimeException $expected) { $staleClaimRejected = true; }
    check($staleClaimRejected, 'A stale worker could overwrite a new attempt.');
    $second->update($next, $newToken, 'sending', 'http_request_started');
    $second->update($next, $newToken, 'failed', 'connection_failed_before_delivery', ['http_status' => 0, 'curl_errno' => 6]);
    $thirdToken = $first->claim($next, true);
    check($thirdToken !== null, 'Definitely unsent request could not be retried.');
    $first->update($next, $thirdToken, 'sending', 'http_request_started');
    $first->update($next, $thirdToken, 'uncertain', 'delivery_requires_verification', ['http_status' => 0, 'curl_errno' => 28]);
    check($second->claim($next, true) === null, 'Uncertain delivery was retried.');
    check((int)$first->find(1, 18)['attempt_count'] === 3, 'Retry attempts were not counted.');

    $otherShop = array_merge($key, ['id_shop' => 2]);
    check($second->claim($otherShop, false) !== null, 'Claim was not scoped by shop.');
    check($second->find(2, 17)['event_id'] === 'refund-2-17', 'Wrong shop event ID.');
    echo "Refund register SQL checks passed on a local TEMPORARY table; no shop records were changed.\n";
} catch (Throwable $error) {
    // Do not print connection exceptions containing configuration or credentials.
    fwrite(STDERR, "Refund register integration check failed (" . get_class($error) . ").\n");
    exit(1);
}
// The connection-local temporary table disappears when this process disconnects.
