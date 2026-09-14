<?php

declare(strict_types=1);

/** Offline regression checks: SQLite memory storage and a fake carrier, no PrestaShop bootstrap. */
if (PHP_SAPI !== 'cli') {
    exit(1);
}

use MsThemeConfig\Class\ExportOrdersMultipleCollies;
use MsThemeConfig\Class\KoopmanReturnShipment;

define('_DB_PREFIX_', 'test_');
define('_PS_MODULE_DIR_', dirname(__DIR__, 2) . '/');

class Db
{
    public PDO $pdo;
    public int $queryCount = 0;
    public bool $failLabels = false;
    private int $affected = 0;

    public function __construct()
    {
        $this->pdo = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    }

    public function execute(string $sql): bool
    {
        ++$this->queryCount;
        if ($this->failLabels && str_contains($sql, 'SET `labels`')) {
            return false;
        }
        if (str_starts_with($sql, 'CREATE TABLE')) {
            // SQLite spelling of the same key and column definitions.
            $sql = str_replace('id_return INT UNSIGNED NOT NULL AUTO_INCREMENT', 'id_return INTEGER PRIMARY KEY AUTOINCREMENT', $sql);
            $sql = str_replace(['PRIMARY KEY (id_return),', 'UNIQUE KEY order_return', ' UNSIGNED', ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'], ['', 'UNIQUE', '', ''], $sql);
        }
        $sql = str_replace('INSERT IGNORE INTO', 'INSERT OR IGNORE INTO', $sql);
        $count = $this->pdo->exec($sql);
        $this->affected = $count === false ? 0 : $count;
        return $count !== false;
    }

    public function executeS(string $sql, bool $array = true, bool $cache = true)
    {
        ++$this->queryCount;
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Affected_Rows(): int
    {
        return $this->affected;
    }
}

function pSQL(string $value, bool $html = false): string
{
    return str_replace("'", "''", $value);
}

class Order
{
    public int $id;
    public int $id_shop = 2;
    public int $id_lang = 1;
    public int $id_address_delivery = 10;
    public int $id_customer = 20;
    public string $reference = 'REAL-ORDER';
    public string $shipping_number = 'OUTBOUND-123';

    public function __construct(int $id)
    {
        $this->id = $id;
    }
}

class Address
{
    public int $id;
    public int $id_country = 1;
    public string $firstname = 'Anne';
    public string $lastname = "O'Neil";
    public string $company = '';
    public string $address1 = 'Klantstraat';
    public string $house_number = '12';
    public string $house_number_extension = 'A';
    public string $postcode = '1234 AB';
    public string $city = 'Amsterdam';
    public string $phone_mobile = '0612345678';
    public string $phone = '';

    public function __construct(int $id)
    {
        $this->id = $id;
    }
}

class Country
{
    public int $id;
    public string $iso_code = 'NL';

    public function __construct(int $id)
    {
        $this->id = $id;
    }
}

class Customer
{
    public int $id;
    public string $email = 'customer@example.test';

    public function __construct(int $id)
    {
        $this->id = $id;
    }
}

class Validate
{
    public static function isLoadedObject(object $value): bool
    {
        return $value->id > 0;
    }
}

class Shop
{
    public int $id_shop_group = 8;
    public function __construct(public int $id) {}
}

class Language
{
    public function __construct(public int $id) {}
}

class Smarty {}

class Context
{
    public Shop $shop;
    public Language $language;
    public Smarty $smarty;

    public static function getContext(): self
    {
        static $context;
        if (!$context) {
            $context = new self();
            $context->shop = new Shop(99);
            $context->language = new Language(88);
            $context->smarty = new Smarty();
        }
        return $context;
    }
}

class Configuration
{
    public static array $reads = [];
    public static function get(string $key, ?int $language = null, ?int $group = null, ?int $shop = null): string
    {
        self::$reads[] = [$key, $language, $group, $shop];
        return '1';
    }
}

require_once __DIR__ . '/../src/Class/ExportOrdersMultipleCollies.php';
require_once __DIR__ . '/../src/Class/KoopmanTemplateRenderer.php';
require_once __DIR__ . '/../src/Class/KoopmanReturnShipment.php';

class FakeCarrier extends ExportOrdersMultipleCollies
{
    public int $calls = 0;
    public array $payload = [];
    public array $response;
    public bool $timeout = false;
    public bool $authFailure = false;
    public int $authCalls = 0;
    public ?Closure $duringRequest = null;

    public function __construct()
    {
        $this->apiOrderEndpoint = '/shipments/shipment';
        $this->apiDepot = '123';
        $this->apiVerlader = '456';
        $this->afzenderNaam = 'De Moderne Smid';
        $this->afzenderNaam2 = '';
        $this->afzenderStraat = 'Winkelstraat';
        $this->afzenderHuisnr = '5';
        $this->afzenderPostcode = '9876 AB';
        $this->afzenderPlaats = 'Groningen';
        $this->afzenderLand = 'NL';
        $this->response = ['http_code' => 200, 'data' => ['status' => 200, 'data' => [
            'transport_number' => 'RETURN-321',
            'tracking_url' => 'https://tracking.example.test/RETURN-321',
            'labels' => ['type' => 'PDF', 'label_content' => base64_encode('%PDF-1.4 test return label')],
        ]]];
    }

    public function authenticate(): void
    {
        ++$this->authCalls;
        if ($this->authFailure) {
            throw new RuntimeException('Sensitive authentication failure details');
        }
    }

    public function makeApiRequestRaw(string $endpoint, array $data = [], string $method = 'GET'): array
    {
        check($endpoint === '/shipments/shipment' && $method === 'POST', 'Unexpected external operation.');
        ++$this->calls;
        $this->payload = $data;
        if ($this->duringRequest) {
            ($this->duringRequest)();
        }
        if ($this->timeout) {
            throw new RuntimeException('Network timeout with sensitive transport detail');
        }
        return $this->response;
    }

    public function addTrackingNumberToOrder($id_order, $trackingNumber = null, $trackingUrl = null): void
    {
        throw new RuntimeException('Return booking must never write outbound tracking.');
    }
}

function check(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

function rejects(Closure $operation, string $message): void
{
    try {
        $operation();
    } catch (InvalidArgumentException | RuntimeException $expected) {
        return;
    }
    throw new RuntimeException($message);
}

$form = [
    'pickup_date' => (new DateTimeImmutable('today', new DateTimeZone('Europe/Amsterdam')))->format('Y-m-d'),
    'order_msg' => 'Aanbellen bij de klant.',
    'collie_type' => ['COL', 'PLH', 'MP'],
    'collie_total' => ['2', '1', '1'],
    'collie_length' => ['50', '120', '120'],
    'collie_width' => ['30', '80', '80'],
    'collie_height' => ['20', '30', '40'],
    'collie_weight' => ['3,5', '45', '50'],
];
$firstKey = str_repeat('a', 64);
$nextKey = str_repeat('b', 64);
$db = new Db();
$carrier = new FakeCarrier();
$service = new KoopmanReturnShipment($carrier, $db);
$order = new Order(100);

// Form preflight and booking share the same normalized, required customer phone.
$phoneAddress = new Address(10);
$phoneAddress->phone_mobile = ' 0612345678 ';
$phoneAddress->phone = '0201234567';
check(KoopmanReturnShipment::getCustomerPhone($phoneAddress) === '0612345678', 'Mobile phone was not trimmed or preferred.');
$phoneAddress->phone_mobile = " \t ";
check(KoopmanReturnShipment::getCustomerPhone($phoneAddress) === '0201234567', 'Blank mobile did not fall back to the landline.');
$phoneAddress->phone = str_repeat('1', 30);
check(KoopmanReturnShipment::getCustomerPhone($phoneAddress) === str_repeat('1', 30), 'A phone at the carrier length limit was rejected.');
foreach (['', " \t ", str_repeat('1', 31), "061\0" . '23'] as $invalidPhone) {
    $phoneAddress->phone = $invalidPhone;
    rejects(fn() => KoopmanReturnShipment::getCustomerPhone($phoneAddress), 'Invalid phone was accepted by form/booking validation.');
}

// Shop collie names selected in the return form must retain their outbound carrier mapping.
$shopTypes = ['envelope', 'plaat', '1-meter', '2-meter', 'pallet', 'plaat-pallet', 'balk-pallet'];
$shopUnits = KoopmanReturnShipment::validatePackages([
    'collie_type' => $shopTypes,
    'collie_total' => array_fill(0, count($shopTypes), '1'),
    'collie_length' => ['25', '100', '100', '200', '200', '100', '200'],
    'collie_width' => ['30', '50', '20', '25', '30', '50', '15'],
    'collie_height' => ['0.5', '0.5', '5', '5', '30', '15', '15'],
    'collie_weight' => array_fill(0, count($shopTypes), '2.5'),
]);
check(array_column($shopUnits, 'unit_type') === ['COL', 'COL', 'COL', 'COL', 'PLH', 'MP', 'PLH'], 'Shop collie names have incorrect carrier types.');
check($shopUnits[0]['measurements']['height'] === 0.5 && $shopUnits[5]['measurements']['length'] === 100.0, 'Return collie measurements were changed before export.');

// Reject malformed, empty and abusive quantities before any database/API operation.
$invalidForms = [
    array_replace($form, ['collie_type' => []]),
    array_replace($form, ['collie_type' => 'COL']),
    array_replace($form, ['collie_type' => ['UNKNOWN', 'PLH', 'MP']]),
    array_replace($form, ['collie_total' => ['1.5', '1', '1']]),
    array_replace($form, ['collie_total' => ['100', '1', '1']]),
    array_replace($form, ['collie_weight' => ['0', '1', '1']]),
    array_replace($form, ['collie_length' => ['-1', '1', '1']]),
    array_replace($form, ['collie_width' => ['1e9', '1', '1']]),
    array_replace($form, ['collie_height' => ['1', '1']]),
    array_replace($form, ['pickup_date' => '2026-02-30']),
    array_replace($form, ['pickup_date' => '2000-01-01']),
    array_replace($form, ['pickup_date' => "2026-09-10\0"]),
    array_replace($form, ['order_msg' => str_repeat('x', 181)]),
];
foreach ($invalidForms as $invalidForm) {
    rejects(fn() => $service->create($order, $invalidForm, $firstKey, 4), 'Invalid input was accepted.');
}
rejects(fn() => $service->create($order, $form, '../../invalid-key', 4), 'Invalid request key was accepted.');
check($carrier->calls === 0 && $db->queryCount === 0, 'Validation made external/storage changes.');

// Failed login happens before the durable booking claim, so fixing credentials allows retry.
$carrier->authFailure = true;
try {
    $service->create(new Order(50), $form, $firstKey, 4);
    throw new RuntimeException('Authentication failure was accepted.');
} catch (InvalidArgumentException $expected) {
    check(!str_contains($expected->getMessage(), 'Sensitive'), 'Authentication failure exposed transport details.');
}
check($service->getForOrder(new Order(50)) === null && $carrier->calls === 0, 'Failed login created a durable shipment claim.');
$carrier->authFailure = false;
check($service->create(new Order(50), $form, $firstKey, 4)['status'] === 'created', 'Corrected login could not retry the same request.');
$carrier->calls = 0;

// A second worker reaching the API concurrently sees the pending claim and never books again.
$secondWorker = new KoopmanReturnShipment($carrier, $db);
$carrier->duringRequest = function () use ($secondWorker, $order, $form, $nextKey): void {
    $pending = $secondWorker->create($order, $form, $nextKey, 5);
    check($pending['status'] === 'creating', 'Concurrent worker did not see pending booking.');
};
$result = $service->create($order, $form, $firstKey, 4);
$carrier->duringRequest = null;
check($result['status'] === 'created' && $result['tracking_number'] === 'RETURN-321', 'Return was not persisted.');
check($result['label_count'] === 1 && $carrier->calls === 1, 'Label missing or duplicate booking occurred.');
check($order->shipping_number === 'OUTBOUND-123', 'Outbound tracking changed.');
check($carrier->payload['type'] === 'A' && $carrier->payload['labels'] === 'PDF', 'Wrong return type or format.');
check($carrier->payload['depot_number'] === '123' && $carrier->payload['customer_number'] === '456', 'Missing carrier account scope.');
check($carrier->payload['references'][0]['reference'] === 'REAL-ORDER-R', 'Hardcoded or outbound reference used.');
check(array_column($carrier->payload['addresses'], 'type') === ['pickup', 'consignor'], 'Type A returns require customer pickup and shop consignor; delivery is rejected by Transmission.');
check($carrier->payload['addresses'][0]['address1'] === 'Klantstraat' && $carrier->payload['addresses'][1]['address1'] === 'Winkelstraat', 'Return direction is wrong.');
check($carrier->payload['addresses'][0]['name'] === "Anne O'Neil", 'Real customer data was not used.');
check($carrier->payload['addresses'][0]['contact']['phonenumber'] === '0612345678', 'Booking did not use the validated customer phone.');
check($carrier->payload['addresses'][0]['date'] === $form['pickup_date'], 'Pickup date not sent.');
check($carrier->payload['text_messages'][0]['remarks'] === $form['order_msg'], 'Driver note not sent.');
check(array_column($carrier->payload['shipment_units'], 'unit_type') === ['COL', 'COL', 'PLH', 'MP'], 'Package quantities/types were not expanded correctly.');
check($carrier->payload['shipment_units'][0]['measurements']['weight'] === 3.5, 'Decimal comma weight was misread.');
$label = $service->getLabel($order, $result['id'], 0);
check($label['content'] === '%PDF-1.4 test return label' && str_ends_with($label['filename'], '.pdf'), 'PDF did not roundtrip.');
check($service->create($order, $form, $firstKey, 4)['id'] === $result['id'], 'Same-key duplicate did not reuse booking.');
check($service->create($order, $form, $nextKey, 4)['id'] === $result['id'], 'Reopened form rebooked an order.');
check($carrier->calls === 1, 'Duplicate booking sent to carrier.');
$authCalls = $carrier->authCalls;
$carrier->authFailure = true;
check($service->create($order, $form, $nextKey, 4)['status'] === 'created', 'An existing return depended on carrier credentials.');
check($carrier->authCalls === $authCalls, 'Duplicate request unnecessarily authenticated with the carrier.');
$carrier->authFailure = false;

// Label access requires both the original order and its shop.
$otherOrder = new Order(101);
$otherShopOrder = clone $order;
$otherShopOrder->id_shop = 3;
rejects(fn() => $service->getLabel($otherOrder, $result['id'], 0), 'Cross-order PDF access succeeded.');
rejects(fn() => $service->getLabel($otherShopOrder, $result['id'], 0), 'Cross-shop PDF access succeeded.');
rejects(fn() => $service->getLabel($order, $result['id'], -1), 'Negative label index accepted.');
check($service->getForOrder($otherShopOrder) === null, 'Return lookup leaked another shop.');

// A timeout survives a new worker/key and cannot silently become a duplicate booking.
$carrier->timeout = true;
$uncertain = $service->create(new Order(200), $form, $firstKey, 4);
check($uncertain['status'] === 'uncertain' && !str_contains($uncertain['message'], 'sensitive'), 'Timeout handling is unsafe.');
$carrier->timeout = false;
$calls = $carrier->calls;
check($secondWorker->create(new Order(200), $form, $nextKey, 4)['status'] === 'uncertain', 'Uncertain booking was retried.');
check($carrier->calls === $calls, 'Uncertain booking generated a second API call.');

// A definitive validation rejection can be corrected only via a new request key.
$successResponse = $carrier->response;
$carrier->response = ['http_code' => 422, 'data' => ['status' => 422, 'meta' => ['error_list' => [['POSTCODE', 'Postal code is invalid']]]]];
$failed = $service->create(new Order(300), $form, $firstKey, 4);
check($failed['status'] === 'failed' && str_contains($failed['message'], 'Postal code is invalid'), 'Useful rejection detail missing.');
$calls = $carrier->calls;
$service->create(new Order(300), $form, $firstKey, 4);
check($carrier->calls === $calls, 'Same rejected request was blindly retried.');
$carrier->response = $successResponse;
check($service->create(new Order(300), $form, $nextKey, 4)['status'] === 'created', 'Corrected failed booking could not be retried.');

// The reported return-address rejection stays visible and can be retried after reopening.
$carrier->response = ['http_code' => 422, 'data' => ['status' => 422, 'meta' => ['error_list' => [
    ['ERR_SHIPMENT_PICKUP_REQUIRED', 'Pickup at is required (Address type: pickup)'],
    ['ADDRESS_TYPE', 'Unknown address type: delivery to for return order'],
]]]];
$rejectedReturn = $service->create(new Order(301), $form, $firstKey, 4);
check($rejectedReturn['status'] === 'failed'
    && str_contains($rejectedReturn['message'], 'Pickup at is required')
    && str_contains($rejectedReturn['message'], 'Unknown address type: delivery'), 'Return address rejection was hidden or marked as an uncertain booking.');
$calls = $carrier->calls;
$service->create(new Order(301), $form, $firstKey, 4);
check($carrier->calls === $calls, 'Rejected return was repeated without reopening.');
$carrier->response = $successResponse;
check($service->create(new Order(301), $form, $nextKey, 4)['status'] === 'created', 'Reopening could not retry the corrected return payload.');
check(array_column($carrier->payload['addresses'], 'type') === ['pickup', 'consignor'], 'Corrected retry included ordinary shipment address roles.');

// Carrier accepted without a PDF: preserve booking, state and transport number.
$carrier->response['data']['data']['labels'] = ['type' => 'ZPL', 'label_content' => base64_encode('^XA^XZ')];
$withoutPdf = $service->create(new Order(400), $form, $firstKey, 4);
check($withoutPdf['status'] === 'created' && $withoutPdf['label_count'] === 0, 'Non-PDF response lost booking or was downloadable.');
$carrier->response = $successResponse;
$carrier->response['data']['data']['labels'] = [
    ['type' => 'PDF', 'label_content' => base64_encode('%PDF-1.4 first')],
    ['type' => 'PDF', 'label_content' => '%PDF-1.4 second'],
];
$multiple = $service->create(new Order(500), $form, $firstKey, 4);
check($multiple['label_count'] === 2 && $service->getLabel(new Order(500), $multiple['id'], 1)['content'] === '%PDF-1.4 second', 'Multiple labels did not persist.');

// A PDF storage error must leave the accepted carrier booking intact and non-repeatable.
$db->failLabels = true;
$labelFailure = $service->create(new Order(600), $form, $firstKey, 4);
check($labelFailure['status'] === 'created' && str_contains($labelFailure['message'], 'niet worden opgeslagen'), 'Label storage failure lost acceptance.');
$db->failLabels = false;
$calls = $carrier->calls;
$service->create(new Order(600), $form, $nextKey, 4);
check($carrier->calls === $calls, 'Label storage failure caused rebooking.');

// Incomplete success, conflict and server failure need manual reconciliation, never retries.
foreach ([200, 409, 500] as $code) {
    $carrier->response = ['http_code' => $code, 'data' => ['status' => $code, 'data' => []]];
    $incomplete = $service->create(new Order(1000 + $code), $form, $firstKey, 4);
    check($incomplete['status'] === 'uncertain', 'Ambiguous carrier response became retryable.');
}

// The real exporter constructor uses the order's shop/language without writing outbound labels.
$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/no-return-test-files';
$originalShop = Context::getContext()->shop;
$originalLanguage = Context::getContext()->language;
$getClient = new ReflectionMethod(KoopmanReturnShipment::class, 'getClient');
$getClient->setAccessible(true);
$scopedClient = $getClient->invoke(new KoopmanReturnShipment(null, $db), $order);
check($scopedClient->idShop === 2 && $scopedClient->idLang === 1 && $scopedClient->idShopGroup === 8, 'API client used back-office context instead of order scope.');
check(Context::getContext()->shop === $originalShop && Context::getContext()->language === $originalLanguage, 'Order scope leaked into the shared context.');
foreach (Configuration::$reads as [$key, $language, $group, $shop]) {
    check($language === 1 && $group === 8 && $shop === 2, 'Carrier configuration read outside the order shop/language.');
}
check(!is_dir($_SERVER['DOCUMENT_ROOT']), 'Return client created outbound label files.');

echo "Koopman return checks passed: payload, validation, duplicate claims, PDF access, scoped persistence, rejection/timeout handling; no carrier requests or shop database changes.\n";
