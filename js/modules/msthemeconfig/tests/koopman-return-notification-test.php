<?php

declare(strict_types=1);

/** Offline: SQLite memory tables, real return reader, fake Mail::send, no shop bootstrap. */
if (PHP_SAPI !== 'cli') {
    exit(1);
}

use MsThemeConfig\Class\KoopmanReturnNotification;
use MsThemeConfig\Class\KoopmanReturnShipment;

define('_DB_PREFIX_', 'test_');
define('_PS_MODULE_DIR_', dirname(__DIR__, 2) . '/');

class Db
{
    public PDO $pdo;
    public bool $failFinalStatus = false;
    public int $labelReads = 0;
    private int $affected = 0;

    public function __construct()
    {
        $this->pdo = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    }

    public function execute(string $sql): bool
    {
        if ($this->failFinalStatus && str_contains($sql, "SET status = 'sent'")) {
            return false;
        }
        if (str_starts_with($sql, 'CREATE TABLE')) {
            $sql = preg_replace('/(id_\w+) INT UNSIGNED NOT NULL AUTO_INCREMENT/', '$1 INTEGER PRIMARY KEY AUTOINCREMENT', $sql);
            $sql = preg_replace('/PRIMARY KEY \(id_\w+\),/', '', $sql);
            $sql = preg_replace('/UNIQUE KEY \w+/', 'UNIQUE', $sql);
            $sql = str_replace([' UNSIGNED', ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'], '', $sql);
        }
        $sql = str_replace('INSERT IGNORE INTO', 'INSERT OR IGNORE INTO', $sql);
        $count = $this->pdo->exec($sql);
        $this->affected = $count === false ? 0 : $count;
        return $count !== false;
    }

    public function executeS(string $sql, bool $array = true, bool $cache = true)
    {
        if (preg_match('/^SELECT\s+labels\s+FROM/i', $sql)) {
            ++$this->labelReads;
        }
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Affected_Rows(): int { return $this->affected; }
}

function pSQL(string $value, bool $html = false): string { return str_replace("'", "''", $value); }

class Order
{
    public int $id_shop = 2;
    public int $id_lang = 1;
    public int $id_customer = 20;
    public string $reference = 'REAL-ORDER';
    public function __construct(public int $id) {}
}

class Customer
{
    public static string $address = 'customer@example.test';
    public string $email;
    public string $firstname = 'Anne';
    public string $lastname = "O'Neil";
    public function __construct(public int $id) { $this->email = self::$address; }
}

class Shop
{
    public const CONTEXT_SHOP = 1;
    public const CONTEXT_GROUP = 2;
    public const CONTEXT_ALL = 4;
    public static int $context = self::CONTEXT_GROUP;
    public static ?int $shopId = null;
    public static ?int $groupId = 77;
    public int $id_shop_group = 8;
    public function __construct(public int $id) {}
    public static function getContext(): int { return self::$context; }
    public static function getContextShopID(): ?int { return self::$shopId; }
    public static function getContextShopGroupID(): ?int { return self::$groupId; }
    public static function setContext(int $type, ?int $id = null): void
    {
        self::$context = $type;
        self::$shopId = $type === self::CONTEXT_SHOP ? $id : null;
        self::$groupId = $type === self::CONTEXT_SHOP ? 8 : ($type === self::CONTEXT_GROUP ? $id : null);
    }
}

class Language
{
    public function __construct(public int $id) {}
    public static function getIsoById(int $id): string { return $id === 1 ? 'nl' : 'fr'; }
}

class Context
{
    public Shop $shop;
    public Language $language;
    public static function getContext(): self
    {
        static $context;
        if (!$context) {
            $context = new self();
            $context->shop = new Shop(99);
            $context->language = new Language(88);
        }
        return $context;
    }
}

class Configuration
{
    public static int $method = 2;
    public static string $sender = 'shop@example.test';
    public static array $reads = [];
    public static function get(string $key, ?int $language = null, ?int $group = null, ?int $shop = null)
    {
        self::$reads[] = [$key, $language, $group, $shop];
        return match ($key) {
            'PS_MAIL_METHOD' => self::$method,
            'PS_SHOP_EMAIL' => self::$sender,
            'PS_SHOP_NAME' => 'De Moderne Smid',
            'PS_LANG_DEFAULT' => 1,
            default => false,
        };
    }
}

class Validate
{
    public static function isLoadedObject(object $value): bool { return $value->id > 0; }
    public static function isEmail(string $value): bool { return filter_var($value, FILTER_VALIDATE_EMAIL) !== false; }
}

class Mail
{
    public const METHOD_DISABLE = 3;
    public static array $calls = [];
    public static bool|int $result = true;
    public static bool $throws = false;
    public static ?Closure $duringSend = null;

    public static function send(...$arguments)
    {
        self::$calls[] = $arguments;
        check(Context::getContext()->shop->id === $arguments[12], 'Mail hooks saw the wrong shop.');
        check(Context::getContext()->language->id === $arguments[0], 'Mail hooks saw the wrong language.');
        check(Shop::getContextShopID() === $arguments[12] && Shop::getContextShopGroupID() === 8, 'Mail SMTP fallback used another shop/group.');
        check($arguments[8] === null, 'Return notification must never attach a PDF label.');
        if (self::$duringSend) {
            (self::$duringSend)();
        }
        if (self::$throws) {
            throw new RuntimeException('Sensitive SMTP credentials in exception');
        }
        return self::$result;
    }
}

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

require_once __DIR__ . '/../src/Class/KoopmanReturnShipment.php';
require_once __DIR__ . '/../src/Class/KoopmanReturnNotification.php';

$db = new Db();
$shipments = new KoopmanReturnShipment(null, $db);
$notifications = new KoopmanReturnNotification($shipments, $db);
$secondWorker = new KoopmanReturnNotification($shipments, $db);

function seedReturn(Order $order, array $changes = []): int
{
    global $db, $shipments;
    $shipments->getForOrder($order);
    $values = array_replace([
        'id_shop' => $order->id_shop,
        'id_order' => $order->id,
        'id_employee' => 4,
        'request_key' => str_repeat('a', 32),
        'status' => 'created',
        'tracking_number' => 'RETURN-321',
        'tracking_url' => 'https://tracking.example.test/return?number=321&postcode=1234AB',
        'labels' => json_encode([base64_encode('%PDF-1.4 first label'), base64_encode('%PDF-1.4 second label')]),
        'label_count' => 2,
        'message' => 'Return created',
        'date_add' => '2026-09-09 10:00:00',
        'date_upd' => '2026-09-09 10:00:00',
    ], $changes);
    $statement = $db->pdo->prepare('INSERT INTO test_msthemeconfig_koopman_return (' . implode(', ', array_keys($values)) . ') VALUES (' . implode(', ', array_fill(0, count($values), '?')) . ')');
    $statement->execute(array_values($values));
    return (int) $db->pdo->lastInsertId();
}

$order = new Order(100);
$returnId = seedReturn($order);
$preview = $notifications->getForReturn($order, $returnId);
check($preview['status'] === 'unsent' && $preview['can_send'] && !$preview['sent'], 'A valid return was not ready for explicit sending.');
check($preview['recipient'] === 'customer@example.test' && $preview['sent_at'] === '', 'Preview recipient/default state is wrong.');
check(count(Mail::$calls) === 0, 'Opening a preview sent an email.');
check($db->labelReads === 0, 'Email availability unnecessarily read a PDF label.');
check((int) $db->pdo->query('SELECT COUNT(*) FROM test_msthemeconfig_koopman_return_email')->fetchColumn() === 0, 'Preview claimed an email.');

$oldShop = Context::getContext()->shop;
$oldLanguage = Context::getContext()->language;
Mail::$duringSend = function () use ($secondWorker, $order, $returnId): void {
    $pending = $secondWorker->send($order, $returnId, 5);
    check($pending['status'] === 'sending' && $pending['blocked'] && !$pending['can_send'], 'Concurrent send was not blocked.');
};
$sent = $notifications->send($order, $returnId, 4);
Mail::$duringSend = null;
check($sent['status'] === 'sent' && $sent['sent'] && !$sent['can_send'] && $sent['sent_at'] !== '', 'Successful mail was not recorded.');
check(count(Mail::$calls) === 1, 'Concurrent worker duplicated mail.');
check(Context::getContext()->shop === $oldShop && Context::getContext()->language === $oldLanguage, 'Mail context was not restored.');
check(Shop::getContext() === Shop::CONTEXT_GROUP && Shop::getContextShopID() === null && Shop::getContextShopGroupID() === 77, 'Static shop/group context was not restored.');
$call = Mail::$calls[0];
check($call[0] === 1 && $call[1] === 'koopman_return_created' && $call[12] === 2, 'Wrong mail language/template/shop.');
check($call[4] === 'customer@example.test' && $call[5] === "Anne O'Neil", 'Recipient did not come from the order customer.');
check($call[6] === 'shop@example.test' && $call[7] === 'De Moderne Smid', 'Sender did not come from shop configuration.');
check($call[10] === _PS_MODULE_DIR_ . 'msthemeconfig/mails/', 'Module template path is wrong.');
check($call[8] === null, 'Email attached a PDF even though the driver supplies the label.');
$html = strtr(file_get_contents($call[10] . 'nl/koopman_return_created.html'), $call[3]);
$text = strtr(file_get_contents($call[10] . 'nl/koopman_return_created.txt'), $call[3]);
check(str_contains($html, 'Er is een retourzending aangemaakt met nummer RETURN-321.'), 'Requested Dutch body is missing.');
check(str_contains($html, 'number=321&amp;postcode=1234AB'), 'Tracking link was not safely HTML-escaped.');
check(str_contains($text, 'number=321&postcode=1234AB') && !str_contains($text, '&amp;'), 'Plain text link was HTML-escaped.');
check(!str_contains($html, '{tracking_') && !str_contains($text, '{tracking_'), 'Email placeholders remain unresolved.');
$secondWorker->send($order, $returnId, 5);
check(count(Mail::$calls) === 1, 'A later send duplicated a sent email.');
Customer::$address = 'changed-customer@example.test';
check($notifications->getForReturn($order, $returnId)['recipient'] === 'customer@example.test', 'Sent recipient was replaced with changed customer data.');
Customer::$address = 'customer@example.test';

// Known local problems disable sending, write failed (not sending), and can be corrected.
$disabledOrder = new Order(200);
$disabledId = seedReturn($disabledOrder);
Configuration::$method = Mail::METHOD_DISABLE;
$disabled = $notifications->getForReturn($disabledOrder, $disabledId);
check(!$disabled['can_send'] && str_contains($disabled['message'], 'uitgeschakeld'), 'Disabled mail was presented as ready.');
$failed = $notifications->send($disabledOrder, $disabledId, 4);
check($failed['status'] === 'failed' && !$failed['sent'] && count(Mail::$calls) === 1, 'Disabled mail was reported as sent.');
Configuration::$method = 2;
check($notifications->getForReturn($disabledOrder, $disabledId)['can_send'], 'Corrected local setting remained blocked.');
check($notifications->send($disabledOrder, $disabledId, 4)['status'] === 'sent', 'Corrected mail configuration could not send.');

foreach ([
    ['tracking_url' => ''],
    ['tracking_url' => 'javascript:alert(1)'],
    ['tracking_number' => ''],
    ['status' => 'uncertain'],
] as $index => $changes) {
    $invalidOrder = new Order(300 + $index);
    $invalidId = seedReturn($invalidOrder, $changes);
    $before = count(Mail::$calls);
    check(!$notifications->getForReturn($invalidOrder, $invalidId)['can_send'], 'Incomplete return was offered for sending.');
    check($notifications->send($invalidOrder, $invalidId, 4)['status'] === 'failed', 'Invalid return was not reported as a local failure.');
    check(count(Mail::$calls) === $before, 'Invalid return sent mail.');
}

// The customer receives only the return number and tracking link; stored PDFs are irrelevant.
foreach ([
    ['label_count' => 0, 'labels' => '[]'],
    ['labels' => json_encode([base64_encode('not a PDF')])],
    ['label_count' => 101, 'labels' => 'invalid JSON'],
] as $index => $changes) {
    $withoutLabelOrder = new Order(350 + $index);
    $withoutLabelId = seedReturn($withoutLabelOrder, $changes);
    $before = count(Mail::$calls);
    check($notifications->getForReturn($withoutLabelOrder, $withoutLabelId)['can_send'], 'Missing or invalid PDF blocked the return email.');
    check($notifications->send($withoutLabelOrder, $withoutLabelId, 4)['status'] === 'sent', 'Return email required a PDF label.');
    check(count(Mail::$calls) === $before + 1 && Mail::$calls[$before][8] === null, 'Return email included an attachment.');
}
check($db->labelReads === 0, 'Sending a return notification read stored PDF data.');

$invalidCustomerOrder = new Order(400);
$invalidCustomerId = seedReturn($invalidCustomerOrder);
Customer::$address = "bad@example.test\r\nBcc: injected@example.test";
check(!$notifications->getForReturn($invalidCustomerOrder, $invalidCustomerId)['can_send'], 'Invalid customer email was accepted.');
check($notifications->send($invalidCustomerOrder, $invalidCustomerId, 4)['status'] === 'failed', 'Invalid customer was sent mail.');
Customer::$address = 'customer@example.test';

// Foreign return IDs never reveal tracking or cause mail to another order/shop.
$foreignOrder = new Order(500);
$foreignShop = clone $order;
$foreignShop->id_shop = 3;
$before = count(Mail::$calls);
check(!$notifications->getForReturn($foreignOrder, $returnId)['can_send'], 'Cross-order return was accepted.');
check(!$notifications->getForReturn($foreignShop, $returnId)['can_send'], 'Cross-shop return was accepted.');
check($notifications->send($foreignOrder, $returnId, 4)['status'] === 'failed', 'Cross-order send was accepted.');
check(count(Mail::$calls) === $before, 'Cross-order request sent mail.');

// False/exception after dispatch may be ambiguous; preserve the lock instead of blindly retrying.
foreach ([false, true] as $throws) {
    $ambiguousOrder = new Order($throws ? 601 : 600);
    $ambiguousId = seedReturn($ambiguousOrder);
    Mail::$result = false;
    Mail::$throws = $throws;
    $uncertain = $notifications->send($ambiguousOrder, $ambiguousId, 4);
    check($uncertain['status'] === 'uncertain' && $uncertain['blocked'] && !$uncertain['can_send'], 'Ambiguous email became retryable.');
    check(!str_contains($uncertain['message'], 'Sensitive'), 'Transport credentials leaked.');
    $before = count(Mail::$calls);
    Mail::$throws = false;
    Mail::$result = true;
    check($secondWorker->send($ambiguousOrder, $ambiguousId, 5)['status'] === 'uncertain', 'Uncertain delivery was retried.');
    check(count(Mail::$calls) === $before, 'Retry caused a duplicate email.');
    check(Shop::getContext() === Shop::CONTEXT_GROUP && Shop::getContextShopGroupID() === 77, 'Mail failure leaked static shop context.');
}

// If completion persistence fails after mail, the durable sending claim still prevents duplication.
$storageOrder = new Order(700);
$storageId = seedReturn($storageOrder);
$db->failFinalStatus = true;
check($notifications->send($storageOrder, $storageId, 4)['status'] === 'uncertain', 'Post-send storage failure was hidden.');
$db->failFinalStatus = false;
$before = count(Mail::$calls);
check($secondWorker->send($storageOrder, $storageId, 5)['status'] === 'sending', 'Failed persistence discarded the send lock.');
check(count(Mail::$calls) === $before, 'Failed persistence generated a second email.');

// Other order languages have a fallback while preserving the requested Dutch text.
$otherLanguage = new Order(800);
$otherLanguage->id_lang = 2;
$otherLanguageId = seedReturn($otherLanguage, ['tracking_number' => 'RETURN<&"']);
Mail::$result = 1;
check($notifications->send($otherLanguage, $otherLanguageId, 4)['status'] === 'sent', 'Fallback language or positive recipient count failed.');
$fallbackCall = Mail::$calls[array_key_last(Mail::$calls)];
check($fallbackCall[0] === 2, 'Order language was silently replaced.');
$fallbackHtml = strtr(file_get_contents($fallbackCall[10] . 'en/koopman_return_created.html'), $fallbackCall[3]);
check(str_contains($fallbackHtml, 'RETURN&lt;&amp;&quot;') && !str_contains($fallbackHtml, 'RETURN<&"'), 'Tracking number injected HTML.');
foreach (Configuration::$reads as [$key, $language, $group, $shop]) {
    check($group === 8 && $shop === 2, 'Mail settings used another shop context.');
}
check($db->labelReads === 0, 'Return notification flow accessed stored PDFs.');

echo "Koopman return notification checks passed: explicit-send state, number/link email without PDF attachments or reads, shop/customer scope, duplicate lock, disabled mail, transport/storage failures; no emails or carrier requests sent.\n";
