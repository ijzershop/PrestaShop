<?php
declare(strict_types=1);

/**
 * php module/msthemeconfig/tests/refund-test.php
 * No PrestaShop bootstrap, real database, HTTP request or payment/refund operation.
 */
use MsThemeConfig\Analytics\Ga4RefundBuilder as Builder;
use MsThemeConfig\Analytics\Ga4RefundDispatcher as Dispatcher;
use MsThemeConfig\Analytics\Ga4RefundTransport as Transport;
use MsThemeConfig\Analytics\RefundDispatchStore;

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

spl_autoload_register(static function (string $class): void {
    $prefix = 'MsThemeConfig\\';
    if (str_starts_with($class, $prefix)) {
        require_once __DIR__ . '/../src/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
    }
});

const REFUND_TEST_NOW = 1788351247;
function fixture(): array { return require __DIR__ . '/fixtures/refund.php'; }
function params(array $snapshot): array { return Builder::build($snapshot, REFUND_TEST_NOW)['events'][0]['params']; }
function same($expected, $actual): void {
    if ($expected !== $actual) {
        throw new RuntimeException('Expected ' . json_encode($expected) . ', got ' . json_encode($actual));
    }
}
function closeTo(float $expected, float $actual): void {
    if (abs($expected - $actual) > 0.000001) {
        throw new RuntimeException("Expected $expected, got $actual");
    }
}
function domainError(string $reason, callable $run): void {
    try { $run(); } catch (DomainException $error) { same($reason, $error->getMessage()); return; }
    throw new RuntimeException('Expected DomainException: ' . $reason);
}
function keyFor(array $snapshot): array {
    return [
        'id_shop' => $snapshot['order']['id_shop'], 'id_order' => $snapshot['order']['id_order'],
        'id_order_slip' => $snapshot['slip']['id_order_slip'], 'order_reference' => $snapshot['order']['reference'],
    ];
}
function itemValue(array $params): float {
    return array_sum(array_map(static fn(array $item) => $item['price'] * $item['quantity'], $params['items'] ?? []));
}

final class MemoryRefundStore implements RefundDispatchStore
{
    public array $rows = [];
    public ?string $failState = null;
    private int $sequence = 0;
    public function claim(array $key, bool $retry): ?string {
        $id = $key['id_shop'] . ':' . $key['id_order_slip'];
        $row = $this->rows[$id] ?? null;
        if (!$retry && $row !== null) { return null; }
        if ($retry && ($row === null || !in_array($row['state'], ['blocked', 'failed'], true)
            || $row['id_order'] !== $key['id_order'])) { return null; }
        $token = 'token-' . ++$this->sequence;
        $this->rows[$id] = $key + [
            'state' => 'preparing', 'reason' => '', 'claim_token' => $token,
            'attempt_count' => ($row['attempt_count'] ?? 0) + 1,
            'event_id' => Builder::eventId($key['id_shop'], $key['id_order_slip']),
        ];
        return $token;
    }
    public function update(array $key, string $token, string $state, string $reason, array $response = []): void {
        if ($this->failState === $state) {
            $this->failState = null;
            throw new RuntimeException('Simulated persistence failure');
        }
        $id = $key['id_shop'] . ':' . $key['id_order_slip'];
        if (($this->rows[$id]['claim_token'] ?? '') !== $token
            || !in_array($this->rows[$id]['state'], ['preparing', 'sending'], true)) {
            throw new RuntimeException('Lost dispatch claim');
        }
        $this->rows[$id] = array_merge($this->rows[$id], $response, ['state' => $state, 'reason' => $reason]);
    }
    public function find(int $shopId, int $slipId): ?array { return $this->rows[$shopId . ':' . $slipId] ?? null; }
}

$tests = [];
$tests['full credit: order reference, amounts, products and timestamp'] = static function (): void {
    $event = Builder::build(fixture(), REFUND_TEST_NOW);
    same('refund', $event['events'][0]['name']);
    same(1788351187000000, $event['timestamp_micros']);
    $p = $event['events'][0]['params'];
    same('YS-175030', $p['transaction_id']);
    same('refund-1-17', $p['event_id']);
    same('17', $p['refund_id']);
    closeTo(51.56, $p['value']); closeTo(10.83, $p['tax']); closeTo(0, $p['shipping']);
    same('988', $p['items'][0]['item_id']); same(2, $p['items'][0]['quantity']);
    closeTo(25.78, $p['items'][0]['price']);
};
$tests['partial credit uses credited amount and fractional-cent unit price'] = static function (): void {
    $s = fixture();
    $s['slip']['total_products_tax_excl'] = 32.70;
    $s['slip']['total_products_tax_incl'] = 39.572;
    $s['slip']['amount'] = 39.572;
    $s['lines'][0]['amount_tax_excl'] = 32.70;
    $s['lines'][0]['amount_tax_incl'] = 39.57;
    $s['lines'][0]['product_quantity'] = 8;
    $p = params($s);
    closeTo(32.70, $p['value']); closeTo(6.87, $p['tax']);
    closeTo(4.0875, $p['items'][0]['price']); closeTo(32.70, itemValue($p));
};
$tests['shipping is separate from value and included in tax'] = static function (): void {
    $s = fixture();
    $s['slip']['order_slip_type'] = 2;
    $s['slip']['total_shipping_tax_excl'] = 6.50;
    $s['slip']['total_shipping_tax_incl'] = 7.865;
    $p = params($s);
    closeTo(51.56, $p['value']); closeTo(6.50, $p['shipping']); closeTo(12.19, $p['tax']);
};
$tests['shipping-only credit does not invent product returns'] = static function (): void {
    $s = fixture();
    $s['lines'] = [];
    $s['slip'] = array_merge($s['slip'], [
        'total_products_tax_excl' => 0, 'total_products_tax_incl' => 0, 'amount' => 0,
        'total_shipping_tax_excl' => 10, 'total_shipping_tax_incl' => 12.10, 'order_slip_type' => 2,
    ]);
    $p = params($s);
    closeTo(0, $p['value']); closeTo(10, $p['shipping']); closeTo(2.10, $p['tax']);
    same(false, isset($p['items']));
};
$tests['return costs reduce the refund without returning a fee product'] = static function (): void {
    $s = fixture();
    $s['slip']['total_products_tax_excl'] -= 5;
    $s['slip']['total_products_tax_incl'] -= 6.05;
    $s['slip']['amount'] -= 6.05;
    $s['lines'][] = array_merge($s['lines'][0], [
        'id_order_detail' => 8885, 'product_id' => 999, 'product_quantity' => 1,
        'amount_tax_excl' => -5, 'amount_tax_incl' => -6.05,
    ]);
    $p = params($s);
    closeTo(46.56, $p['value']); closeTo(9.78, $p['tax']); closeTo(46.56, itemValue($p));
    same(1, count($p['items'])); same('988', $p['items'][0]['item_id']); same(2, $p['items'][0]['quantity']);
};
$tests['mixed VAT rates are read from the note, not a fixed 21 percent'] = static function (): void {
    $s = fixture();
    $s['slip']['total_products_tax_excl'] = 200;
    $s['slip']['total_products_tax_incl'] = 230;
    $s['slip']['amount'] = 230;
    $s['lines'][0] = array_merge($s['lines'][0], ['product_quantity' => 1, 'amount_tax_excl' => 100, 'amount_tax_incl' => 121]);
    $s['lines'][] = array_merge($s['lines'][0], ['id_order_detail' => 8885, 'product_id' => 989, 'amount_tax_incl' => 109]);
    $p = params($s);
    closeTo(200, $p['value']); closeTo(30, $p['tax']); closeTo(200, itemValue($p));
};
$tests['rounding tolerance never produces a negative tax amount'] = static function (): void {
    $s = fixture();
    $s['slip']['total_products_tax_incl'] = $s['slip']['total_products_tax_excl'] - 0.01;
    domainError('inconsistent_credit_note_totals', static fn() => params($s));
    $s['slip']['total_products_tax_incl'] = $s['slip']['total_products_tax_excl'] - 0.000001;
    closeTo(0, params($s)['tax']);
};
$tests['net deductions preserve the sum of item values after rounding'] = static function (): void {
    $s = fixture();
    $line = array_merge($s['lines'][0], ['product_quantity' => 3, 'amount_tax_excl' => 1, 'amount_tax_incl' => 1.21]);
    $s['lines'] = [$line, array_merge($line, ['id_order_detail' => 8885]), array_merge($line, ['id_order_detail' => 8886])];
    $s['slip']['total_products_tax_excl'] = 1;
    $s['slip']['total_products_tax_incl'] = 1.21;
    closeTo(1, itemValue(params($s)));
};
$tests['monetary corrections without quantities omit item counts'] = static function (): void {
    $s = fixture(); $s['lines'][0]['product_quantity'] = 0;
    $p = params($s);
    closeTo(51.56, $p['value']); same(false, isset($p['items'])); same('amount_only', $p['refund_items_status']);
};
$tests['explicitly denied consent is rejected before identity validation'] = static function (): void {
    $s = fixture(); $s['order']['ga_analytics_consent'] = '0'; $s['order']['ga_client_id'] = '';
    domainError('analytics_consent_denied', static fn() => params($s));
};
$tests['unknown legacy consent follows the existing purchase policy'] = static function (): void {
    $s = fixture(); $s['order']['ga_analytics_consent'] = null;
    $r = Transport::request($s, Builder::build($s, REFUND_TEST_NOW));
    same(true, in_array('X-MS-Analytics-Consent: unknown', $r['headers'], true));
};
$tests['first-party route preserves the existing fallback purchaser identity'] = static function (): void {
    $s = fixture(); $s['order']['ga_client_id'] = '';
    same('server-175030', Builder::build($s, REFUND_TEST_NOW)['client_id']);
};
$tests['direct Google route requires a valid stored client ID'] = static function (): void {
    $s = fixture(); $s['order']['ga_client_id'] = ''; $s['first_party'] = false;
    $s['endpoint'] = 'https://www.google-analytics.com/mp/collect';
    domainError('missing_or_invalid_ga_client_id', static fn() => params($s));
};
$tests['refund after the original session preserves only the original session reference'] = static function (): void {
    $s = fixture(); $s['order']['ga_session_id'] = (string)($s['timestamp'] - 2 * 86400);
    $p = params($s);
    same($s['order']['ga_session_id'], $p['original_session_id']);
    same(false, isset($p['session_id'])); same(false, isset($p['engagement_time_msec']));
};
$tests['recent original session can still be associated with the refund'] = static function (): void {
    $s = fixture(); same($s['order']['ga_session_id'], params($s)['session_id']);
};
$tests['historical refund timestamp is never silently shifted to today'] = static function (): void {
    $s = fixture(); $s['timestamp'] = REFUND_TEST_NOW - 72 * 3600;
    domainError('credit_note_older_than_72_hours', static fn() => params($s));
};
$tests['future date, foreign order, bad amounts and missing products are rejected'] = static function (): void {
    $s = fixture(); $s['timestamp'] = REFUND_TEST_NOW + 301;
    domainError('invalid_credit_note_timestamp', static fn() => params($s));
    $s = fixture(); $s['slip']['id_order'] = 123;
    domainError('credit_note_order_mismatch', static fn() => params($s));
    $s = fixture(); $s['lines'][0]['id_order'] = 123;
    domainError('credit_note_line_order_mismatch', static fn() => params($s));
    $s = fixture(); $s['slip']['total_products_tax_excl'] = 'invalid';
    domainError('invalid_credit_note_amount', static fn() => params($s));
    $s = fixture(); $s['lines'][0]['product_id'] = 0;
    domainError('missing_refunded_product', static fn() => params($s));
};
$tests['ambiguous legacy voucher and chosen amounts cannot overstate the refund'] = static function (): void {
    $s = fixture(); $s['slip']['order_slip_type'] = 1;
    domainError('voucher_refund_requires_reconciliation', static fn() => params($s));
    $s['slip']['order_slip_type'] = 2; $s['slip']['amount'] = 10;
    domainError('specific_refund_amount_requires_reconciliation', static fn() => params($s));
};
$tests['shipping flag cannot hide inconsistent voucher totals'] = static function (): void {
    foreach (['total_products_tax_excl', 'total_products_tax_incl'] as $discountedTotal) {
        $s = fixture();
        $s['slip']['order_slip_type'] = 2;
        $s['slip']['total_shipping_tax_excl'] = 5;
        $s['slip']['total_shipping_tax_incl'] = 6.05;
        $s['slip']['amount'] = $discountedTotal === 'total_products_tax_excl'
            ? $s['slip']['total_products_tax_incl'] : $s['slip']['total_products_tax_excl'];
        $s['slip'][$discountedTotal] -= 5;
        domainError('credit_note_lines_do_not_match_totals', static fn() => params($s));
    }
};
$tests['order classification and currency do not become employee/EUR defaults'] = static function (): void {
    $s = fixture(); $s['currency'] = 'USD'; $s['order']['id_shop'] = 2;
    $s['metadata']['order_channel'] = 'counter'; $s['metadata']['session_type'] = 'counter';
    $p = params($s);
    same('USD', $p['currency']); same('2', $p['shop_id']); same('refund-2-17', $p['event_id']);
    same('counter', $p['order_channel']); same(false, isset($p['traffic_type']));
};
$tests['only the refund payload and analytics headers reach the request'] = static function (): void {
    $s = fixture(); $s['metadata']['value'] = 999; $s['metadata']['transaction_id'] = 'wrong';
    $s['order']['ad_meta_fbp'] = 'must-not-leak';
    $r = Transport::request($s, Builder::build($s, REFUND_TEST_NOW));
    same(true, in_array('X-MS-Analytics-Consent: granted', $r['headers'], true));
    same(true, in_array('X-MS-Marketing-Consent: denied', $r['headers'], true));
    same(false, str_contains($r['body'], 'must-not-leak'));
    closeTo(51.56, json_decode($r['body'], true)['events'][0]['params']['value']);
    $s['endpoint'] = 'https://region1.google-analytics.com/mp/collect'; $s['first_party'] = false;
    same(['Content-Type: application/json'], Transport::request($s, Builder::build($s, REFUND_TEST_NOW))['headers']);
};
$tests['bad endpoints and missing configuration never form a collection request'] = static function (): void {
    foreach (['http://example.test/mp/collect', 'https://example.test/g/collect', 'https://user:pass@example.test/mp/collect', 'https://example.test/mp/collect?api_secret=bad'] as $endpoint) {
        $s = fixture(); $s['endpoint'] = $endpoint;
        domainError('invalid_refund_endpoint', static fn() => Transport::request($s, Builder::build($s, REFUND_TEST_NOW)));
    }
    $s = fixture(); $s['api_secret'] = '';
    domainError('missing_refund_configuration', static fn() => Transport::request($s, Builder::build($s, REFUND_TEST_NOW)));
};
$tests['duplicate and overlapping hook calls send exactly once'] = static function (): void {
    $s = fixture(); $key = keyFor($s); $store = new MemoryRefundStore(); $calls = 0; $reads = 0; $dispatcher = null;
    $reader = static function () use ($s, &$reads): array { ++$reads; return $s; };
    $sender = static function (array $request) use (&$dispatcher, $key, $reader, &$calls): array {
        ++$calls;
        same('refund', json_decode($request['body'], true)['events'][0]['name']);
        same(false, $dispatcher->dispatch($key, $reader)['processed']);
        return ['http_status' => 204, 'curl_errno' => 0];
    };
    $dispatcher = new Dispatcher($store, $sender, static fn() => REFUND_TEST_NOW);
    same('accepted', $dispatcher->dispatch($key, $reader)['record']['state']);
    same(false, $dispatcher->dispatch($key, $reader)['processed']);
    same(1, $calls); same(1, $reads);
};
$tests['two partial credit notes on the same order each get their own event'] = static function (): void {
    $store = new MemoryRefundStore(); $ids = [];
    $d = new Dispatcher($store, static function (array $request) use (&$ids): array {
        $p = json_decode($request['body'], true)['events'][0]['params'];
        same('YS-175030', $p['transaction_id']); $ids[] = $p['event_id'];
        return ['http_status' => 200, 'curl_errno' => 0];
    }, static fn() => REFUND_TEST_NOW);
    foreach ([17, 18] as $slipId) {
        $s = fixture(); $s['slip']['id_order_slip'] = $slipId; $s['lines'][0]['id_order_slip'] = $slipId;
        $s['slip']['total_products_tax_excl'] = 25.78; $s['slip']['total_products_tax_incl'] = 31.194;
        $s['lines'][0]['product_quantity'] = 1; $s['lines'][0]['amount_tax_excl'] = 25.78;
        $s['lines'][0]['amount_tax_incl'] = 31.194;
        same('accepted', $d->dispatch(keyFor($s), static fn() => $s)['record']['state']);
    }
    same(['refund-1-17', 'refund-1-18'], $ids);
};
$tests['denied consent and expired notes are recorded without HTTP'] = static function (): void {
    foreach (['denied', 'expired'] as $case) {
        $s = fixture(); $store = new MemoryRefundStore(); $calls = 0;
        if ($case === 'denied') { $s['order']['ga_analytics_consent'] = 0; }
        else { $s['timestamp'] = REFUND_TEST_NOW - 73 * 3600; }
        $d = new Dispatcher($store, static function () use (&$calls): array { ++$calls; return []; }, static fn() => REFUND_TEST_NOW);
        same($case === 'denied' ? 'skipped' : 'expired', $d->dispatch(keyFor($s), static fn() => $s)['record']['state']);
        same(false, $d->dispatch(keyFor($s), static fn() => $s, true)['processed']); same(0, $calls);
    }
};
$tests['a preparation problem can be explicitly retried after fixing it'] = static function (): void {
    $s = fixture(); $s['api_secret'] = ''; $store = new MemoryRefundStore(); $calls = 0;
    $d = new Dispatcher($store, static function () use (&$calls): array { ++$calls; return ['http_status' => 200, 'curl_errno' => 0]; }, static fn() => REFUND_TEST_NOW);
    same('blocked', $d->dispatch(keyFor($s), static fn() => $s)['record']['state']); same(0, $calls);
    $s['api_secret'] = 'fixed-test-secret';
    same(false, $d->dispatch(keyFor($s), static fn() => $s)['processed']);
    $result = $d->dispatch(keyFor($s), static fn() => $s, true);
    same('accepted', $result['record']['state']); same(2, $result['record']['attempt_count']); same(1, $calls);
};
$tests['definite DNS failure may be explicitly retried with the same event ID'] = static function (): void {
    $s = fixture(); $store = new MemoryRefundStore(); $ids = [];
    $d = new Dispatcher($store, static function (array $request) use (&$ids): array {
        $ids[] = json_decode($request['body'], true)['events'][0]['params']['event_id'];
        return count($ids) === 1 ? ['http_status' => 0, 'curl_errno' => 6] : ['http_status' => 200, 'curl_errno' => 0];
    }, static fn() => REFUND_TEST_NOW);
    same('failed', $d->dispatch(keyFor($s), static fn() => $s)['record']['state']);
    same('accepted', $d->dispatch(keyFor($s), static fn() => $s, true)['record']['state']);
    same(['refund-1-17', 'refund-1-17'], $ids);
};
$tests['timeout, HTTP error and an interrupted send are never automatically replayed'] = static function (): void {
    foreach ([['http_status' => 0, 'curl_errno' => 28], ['http_status' => 500, 'curl_errno' => 0], ['http_status' => 400, 'curl_errno' => 0], null] as $response) {
        $s = fixture(); $store = new MemoryRefundStore(); $calls = 0;
        $d = new Dispatcher($store, static function () use ($response, &$calls): array {
            ++$calls;
            if ($response === null) { throw new RuntimeException('synthetic-secret-must-not-be-logged'); }
            return $response;
        }, static fn() => REFUND_TEST_NOW);
        $r = $d->dispatch(keyFor($s), static fn() => $s);
        same('uncertain', $r['record']['state']);
        same(false, str_contains(json_encode($r), 'synthetic-secret'));
        same(false, $d->dispatch(keyFor($s), static fn() => $s, true)['processed']); same(1, $calls);
    }
};
$tests['a failed pre-send state write prevents HTTP'] = static function (): void {
    $s = fixture(); $store = new MemoryRefundStore(); $store->failState = 'sending'; $calls = 0;
    $d = new Dispatcher($store, static function () use (&$calls): array { ++$calls; return []; }, static fn() => REFUND_TEST_NOW);
    same('blocked', $d->dispatch(keyFor($s), static fn() => $s)['record']['state']); same(0, $calls);
};
$tests['lost persistence after delivery is uncertain and blocks a duplicate'] = static function (): void {
    $s = fixture(); $store = new MemoryRefundStore(); $store->failState = 'accepted'; $calls = 0;
    $d = new Dispatcher($store, static function () use (&$calls): array { ++$calls; return ['http_status' => 200, 'curl_errno' => 0]; }, static fn() => REFUND_TEST_NOW);
    same('uncertain', $d->dispatch(keyFor($s), static fn() => $s)['record']['state']);
    same(false, $d->dispatch(keyFor($s), static fn() => $s, true)['processed']); same(1, $calls);
};
$tests['snapshot cannot send another shops order under the claimed credit ID'] = static function (): void {
    $s = fixture(); $key = keyFor($s); $s['order']['id_shop'] = 2; $calls = 0;
    $d = new Dispatcher(new MemoryRefundStore(), static function () use (&$calls): array { ++$calls; return []; }, static fn() => REFUND_TEST_NOW);
    $r = $d->dispatch($key, static fn() => $s);
    same('blocked', $r['record']['state']); same('refund_snapshot_key_mismatch', $r['record']['reason']); same(0, $calls);
};

// Minimal in-memory legacy classes exercise the actual hook boundary and the existing
// return-cost adjustment. They cannot reach PrestaShop's database or financial services.
class Order {
    public int $id = 175030; public int $id_shop = 1; public string $reference = 'YS-175030';
    public array $details = [];
    public function getOrderDetailList(): array { return $this->details; }
}
class OrderSlip {
    public int $id = 17; public int $id_order = 175030; public int $saveCount = 0;
    public float $total_products_tax_excl = 51.56; public float $total_products_tax_incl = 62.388;
    public float $amount = 62.388;
    public function save(): bool { ++$this->saveCount; return true; }
}
class OrderDetail {
    public int $id; public int $product_quantity = 1; public int $product_quantity_refunded = 0;
    public float $unit_price_tax_excl = 5; public float $unit_price_tax_incl = 6.05;
    public float $total_refunded_tax_excl = 0; public float $total_refunded_tax_incl = 0;
    public function __construct(int $id) { $this->id = $id; }
    public function save(): bool { return true; }
}
class Validate {
    public static function isLoadedObject($object): bool { return is_object($object) && ($object->id ?? 0) > 0; }
}
class Configuration {
    public static int $returnProduct = 0;
    public static function get($key, $lang = null, $group = null, $shop = null) {
        same(1, $shop);
        return $key === 'MSTHEMECONFIG_RETOUR_COST_NL' ? self::$returnProduct : 0;
    }
}
class Db {
    public static array $inserts = [];
    public static function getInstance(): self { return new self(); }
    public function insert($table, $data): bool { self::$inserts[] = [$table, $data]; return true; }
    public function execute($sql): bool { throw new RuntimeException('Simulated missing analytics register'); }
}
class PrestaShopLogger {
    public static array $entries = [];
    public static function addLog(...$args): void { self::$entries[] = $args; }
}
function pSQL(string $value): string { return addslashes($value); }
define('_DB_PREFIX_', 'test_');
class CapturingRefundHook extends \MsThemeConfig\Class\ModernHook {
    public array $seen = [];
    public function __construct() {}
    protected function handleGa4RefundTracking(Order $order, OrderSlip $slip): void {
        $this->seen[] = ['id' => $slip->id, 'excl' => $slip->total_products_tax_excl, 'incl' => $slip->total_products_tax_incl];
    }
}
class ActualRefundHook extends \MsThemeConfig\Class\ModernHook {
    public function __construct() {}
}
$tests['credit-note hook dispatches even when no return-cost product is configured'] = static function (): void {
    Configuration::$returnProduct = 0;
    $hook = new CapturingRefundHook(); $slip = new OrderSlip();
    $hook->hookActionOrderSlipAdd(['order' => new Order(), 'orderSlipCreated' => $slip]);
    same(1, count($hook->seen)); closeTo(51.56, $hook->seen[0]['excl']); same(0, $slip->saveCount);
};
$tests['analytics runs after the existing return-cost adjustment'] = static function (): void {
    Configuration::$returnProduct = 999; Db::$inserts = [];
    $order = new Order(); $order->details = [['product_id' => 999, 'id_order_detail' => 8885]];
    $slip = new OrderSlip(); $hook = new CapturingRefundHook();
    $hook->hookActionOrderSlipAdd(['order' => $order, 'orderSlipCreated' => $slip]);
    closeTo(46.56, $hook->seen[0]['excl']); closeTo(56.338, $hook->seen[0]['incl']);
    same('order_slip_detail', Db::$inserts[0][0]); closeTo(-5, Db::$inserts[0][1]['amount_tax_excl']);
    same(1, $slip->saveCount);
    Configuration::$returnProduct = 0;
};
$tests['foreign credit-note object never reaches financial or analytics handling'] = static function (): void {
    $hook = new CapturingRefundHook(); $slip = new OrderSlip(); $slip->id_order = 999;
    $hook->hookActionOrderSlipAdd(['order' => new Order(), 'orderSlipCreated' => $slip]);
    same([], $hook->seen); same(0, $slip->saveCount);
};
$tests['missing analytics register cannot interrupt the credit-note hook'] = static function (): void {
    Configuration::$returnProduct = 0; PrestaShopLogger::$entries = [];
    $hook = new ActualRefundHook();
    $hook->hookActionOrderSlipAdd(['order' => new Order(), 'orderSlipCreated' => new OrderSlip()]);
    same(1, count(PrestaShopLogger::$entries));
    same(true, str_contains(PrestaShopLogger::$entries[0][0], 'tracking unavailable'));
};

$failures = 0;
foreach ($tests as $name => $test) {
    try { $test(); } catch (Throwable $error) {
        ++$failures;
        fwrite(STDERR, "FAIL: $name\n  " . get_class($error) . ': ' . $error->getMessage() . "\n");
    }
}
echo (count($tests) - $failures) . '/' . count($tests) . " refund tests passed. No real DB, HTTP or financial actions.\n";
exit($failures === 0 ? 0 : 1);
