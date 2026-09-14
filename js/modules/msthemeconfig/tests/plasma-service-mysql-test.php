<?php

declare(strict_types=1);

/** Actual MySQL schema/transactions and PlasmaService; only connection-local temporary tables. */
if (PHP_SAPI !== 'cli') {
    exit(1);
}

class PlasmaMysqlTestFailure extends RuntimeException {}
function check(bool $condition, string $message): void
{
    if (!$condition) {
        throw new PlasmaMysqlTestFailure($message);
    }
}
function rejects(callable $operation, string $message): void
{
    try {
        $operation();
    } catch (DomainException $error) {
        return;
    }
    throw new PlasmaMysqlTestFailure($message);
}

class Db
{
    public static self $instance;
    public PDO $pdo;
    public array $tables = [];
    public int $locks = 0;
    public function __construct(PDO $pdo) { $this->pdo = $pdo; }
    public static function getInstance(): self { return self::$instance; }
    private function guard(string $table): void
    {
        check(isset($this->tables[$table]) && str_starts_with($table, _DB_PREFIX_), 'SQL may access only registered connection-local fixtures.');
    }
    public function executeS(string $sql, bool $array = true, bool $cache = true): array
    {
        check((bool) preg_match('/^SELECT\s/i', trim($sql)), 'Read operations must use SELECT.');
        preg_match_all('/\b(?:FROM|JOIN)\s+`?([A-Za-z_][A-Za-z0-9_]*)`?/i', $sql, $matches);
        foreach ($matches[1] as $table) { $this->guard($table); }
        if (str_contains($sql, 'FOR UPDATE')) {
            check($this->pdo->inTransaction() && !$cache, 'Quote locks must run inside a transaction without cached rows.');
            ++$this->locks;
        }
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getRow(string $sql, bool $cache = true)
    {
        // Match PrestaShop's important LIMIT behavior, including invalid FOR UPDATE usage.
        return $this->executeS($sql . ' LIMIT 1', true, $cache)[0] ?? false;
    }
    public function getValue(string $sql, bool $cache = true)
    {
        $row = $this->getRow($sql, $cache);
        return $row ? reset($row) : false;
    }
    public function execute(string $sql, bool $cache = true): bool
    {
        if (in_array($sql, ['START TRANSACTION', 'COMMIT', 'ROLLBACK'], true)) {
            return $this->pdo->exec($sql) !== false;
        }
        if (preg_match('/\ACREATE TABLE IF NOT EXISTS `([A-Za-z0-9_]+)` /', $sql, $match)) {
            check(in_array($match[1], array_map(fn ($name) => _DB_PREFIX_ . $name, ['plasma_product', 'plasma_cutfile_library', 'plasma_quote']), true), 'Only plasma installation tables may be created.');
            $this->tables[$match[1]] = true;
            return $this->pdo->exec(preg_replace('/\ACREATE TABLE /', 'CREATE TEMPORARY TABLE ', $sql, 1)) !== false;
        }
        check((bool) preg_match('/\A(?:INSERT INTO|UPDATE|DELETE FROM)\s+`([A-Za-z0-9_]+)`/i', $sql, $match), 'Only guarded temporary fixture mutations are supported.');
        $this->guard($match[1]);
        return $this->pdo->exec($sql) !== false;
    }
    public function insert(string $table, array $data): bool
    {
        $table = _DB_PREFIX_ . $table;
        $this->guard($table);
        foreach (array_keys($data) as $key) { check((bool) preg_match('/\A[a-zA-Z_]+\z/', $key), 'Valid fixture column name required.'); }
        $values = array_map(fn ($value) => $value === null ? 'NULL' : "'" . $value . "'", array_values($data));
        return $this->execute('INSERT INTO `' . $table . '` (`' . implode('`,`', array_keys($data)) . '`) VALUES (' . implode(',', $values) . ')');
    }
    public function update(string $table, array $data, string $where): bool
    {
        $this->guard(_DB_PREFIX_ . $table);
        $fields = [];
        foreach ($data as $key => $value) {
            check((bool) preg_match('/\A[a-zA-Z_]+\z/', $key), 'Valid fixture update column required.');
            $fields[] = '`' . $key . '`=' . ($value === null ? 'NULL' : "'" . $value . "'");
        }
        return $this->execute('UPDATE `' . _DB_PREFIX_ . $table . '` SET ' . implode(',', $fields) . ' WHERE ' . $where);
    }
    public function Insert_ID(): int { return (int) $this->pdo->lastInsertId(); }
}

function pSQL($value, bool $html = false): string { return substr(Db::getInstance()->pdo->quote((string) $value), 1, -1); }

class Configuration
{
    public static array $values = ['PS_TAX' => 1, 'PS_TAX_ADDRESS_TYPE' => 'id_address_delivery', 'VATNUMBER_MANAGEMENT' => 0];
    public static function getGlobalValue($key) { return self::$values[$key] ?? false; }
    public static function updateGlobalValue($key, $value): bool { self::$values[$key] = $value; return true; }
    public static function get($key, $lang = null, $group = null, $shop = null, $default = false) { return self::$values[$key] ?? $default; }
    public static function isCatalogMode(): bool { return false; }
}
class Module
{
    public string $name = 'msthemeconfig';
    public array $hooks = [];
    public function registerHook(string $hook): bool { $this->hooks[] = $hook; return true; }
    public static function getModuleIdByName($name): int { return 7; }
}
#[AllowDynamicProperties]
class Tab
{
    public static bool $created = false;
    public static function getIdFromClassName($name): int { return $name === 'MsAdminPlasmaLibrary' ? (self::$created ? 50 : 0) : 10; }
    public function add(): bool { self::$created = true; return true; }
}
class Language { public static function getLanguages($active): array { return [['id_lang' => 1]]; } }
class Shop
{
    public int $id;
    public int $id_shop_group = 1;
    public static array $allowed = [1];
    public function __construct(int $id) { $this->id = $id; }
    public static function getShops(...$args): array { return [1, 2]; }
    public static function getContextListShopID(): array { return self::$allowed; }
}
#[AllowDynamicProperties]
class Context
{
    public static self $instance;
    public static function getContext(): self { return self::$instance; }
    public function getCurrentLocale() { return new class { public function formatPrice($amount, $currency): string { return $currency . ' ' . number_format($amount, 2); } }; }
}
class Product
{
    public const CUSTOMIZE_TEXTFIELD = 1;
    public int $id;
    public int $id_tax_rules_group = 1;
    public bool $active = true;
    public bool $available_for_order = true;
    public bool $is_virtual = false;
    public bool $cache_is_pack = false;
    public static array $priceAddresses = [];
    public function __construct(int $id, ...$args) { $this->id = $id; }
    public function checkAccess(int $customerId): bool { return true; }
    public static function getDefaultAttribute(int $id): int { return 0; }
    public static function getTaxCalculationMethod(int $customerId): int { return 0; }
    public static function getPriceStatic($id, $tax, ...$args): float
    {
        $addressId = (int) ($args[9] ?? 0);
        self::$priceAddresses[] = $addressId;
        $address = Address::initialize($addressId);
        $exempt = $address->vat_number !== '' && $address->id_country !== (int) Configuration::get('VATNUMBER_COUNTRY') && Configuration::get('VATNUMBER_MANAGEMENT');
        return $tax && Configuration::get('PS_TAX') && !$exempt ? 100.0 * (1 + $address->rate / 100) : 100.0;
    }
}
class Combination
{
    public int $id;
    public int $id_product = 42;
    public function __construct(int $id, ...$args) { $this->id = $id; }
}
class Validate
{
    public static function isLoadedObject($object): bool { return !empty($object->id); }
    public static function isGenericName($value): bool { return true; }
}
class Tools
{
    public static function convertPrice($value, ...$args): float { return (float) $value; }
    public static function getRemoteAddr(): string { return '127.0.0.1'; }
}
class TaxCalculator
{
    private array $rates;
    public function __construct(array $rates = [21]) { $this->rates = $rates; }
    public function addTaxes(float $price): float { return $price * (1 + array_sum($this->rates) / 100); }
}
class TaxManagerFactory
{
    public static function getManager(Address $address, ...$args)
    {
        return new class($address->rate) {
            private float $rate;
            public function __construct(float $rate) { $this->rate = $rate; }
            public function getTaxCalculator(): TaxCalculator { return new TaxCalculator([$this->rate]); }
        };
    }
}
class Address
{
    public int $id_country = 1;
    public string $vat_number = '';
    public float $rate = 21.0;
    public static array $fixtures = [];
    public static function initialize($id = null, ...$args): self
    {
        $address = new self();
        foreach (self::$fixtures[(int) $id] ?? [] as $key => $value) { $address->{$key} = $value; }
        return $address;
    }
}
#[AllowDynamicProperties]
class Customization
{
    public int $id = 0;
    public function add(): bool
    {
        $values = get_object_vars($this);
        unset($values['id']);
        Db::getInstance()->insert('customization', $values);
        $this->id = Db::getInstance()->Insert_ID();
        return true;
    }
}
class FixtureCart
{
    public int $id = 1;
    public int $id_shop = 1;
    public int $id_address_delivery = 10;
    public int $id_address_invoice = 11;
    public bool $failAdd = false;
    public function updateQty($quantity, $productId, $attributeId, $customizationId): bool
    {
        if ($this->failAdd) { return false; }
        return Db::getInstance()->insert('cart_product', [
            'id_cart' => $this->id, 'id_product' => $productId, 'id_product_attribute' => $attributeId,
            'id_customization' => $customizationId, 'quantity' => $quantity,
        ]);
    }
}

$fixtureRoot = null;
$exitCode = 0;
try {
    $parameters = require dirname(__DIR__, 5) . '/app/config/parameters.php';
    $config = $parameters['parameters'] ?? $parameters;
    $host = (string) ($config['database_host'] ?? '');
    check(in_array($host, ['127.0.0.1', 'localhost', '::1'], true), 'Only a loopback MySQL instance may run this test.');
    $database = (string) $config['database_name'];
    check((bool) preg_match('/^[A-Za-z0-9_-]+$/D', $database), 'Invalid fixture database name.');
    $pdo = new PDO('mysql:host=' . $host . ';port=' . (int) ($config['database_port'] ?: 3306) . ';dbname=' . $database . ';charset=utf8mb4',
        (string) $config['database_user'], (string) $config['database_password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_MULTI_STATEMENTS => false]);
    unset($parameters, $config);
    require dirname(__DIR__, 5) . '/vendor/autoload.php';
    define('_DB_PREFIX_', 'plasma_test_' . bin2hex(random_bytes(4)) . '_');
    define('PS_TAX_EXC', 1);
    define('_COOKIE_KEY_', bin2hex(random_bytes(16)));
    $fixtureRoot = sys_get_temp_dir() . '/msthemeconfig-plasma-test-' . bin2hex(random_bytes(8));
    check(mkdir($fixtureRoot, 0700), 'Create the isolated asset fixture root.');
    define('_PS_ROOT_DIR_', $fixtureRoot);
    $db = Db::$instance = new Db($pdo);
    require __DIR__ . '/../src/Plasma/PlasmaSettings.php';
    require __DIR__ . '/../src/Plasma/PlasmaInstaller.php';
    require __DIR__ . '/../src/Plasma/PlasmaCalculator.php';
    require __DIR__ . '/../src/Plasma/PlasmaService.php';

    $context = Context::$instance = new Context();
    $context->shop = new Shop(1);
    $context->cart = new FixtureCart();
    $context->customer = (object) ['id' => 1];
    $context->language = (object) ['id' => 1];
    $context->currency = (object) ['id' => 1, 'iso_code' => 'EUR'];
    $context->cookie = new class {
        public string $plasma_session;
        public function __construct() { $this->plasma_session = bin2hex(random_bytes(32)); }
        public function write(): bool { return true; }
    };
    $context->link = new class { public function getPageLink(...$args): string { return '/cart?action=show'; } };

    $module = new Module();
    check(MsThemeConfig\Plasma\PlasmaInstaller::install($module) && MsThemeConfig\Plasma\PlasmaInstaller::install($module), 'The actual plasma schema must install idempotently.');
    check(Tab::$created, 'Installer must register the library tab.');
    $quoteDdl = $pdo->query('SHOW CREATE TABLE `' . _DB_PREFIX_ . 'plasma_quote`')->fetch(PDO::FETCH_NUM)[1];
    check(str_contains($quoteDdl, 'ENGINE=InnoDB') && str_contains($quoteDdl, 'utf8mb4') && str_contains($quoteDdl, 'UNIQUE KEY `customization`'), 'Quotes require transactional Unicode storage and distinct customizations.');

    foreach ([
        'product_shop' => 'id_product INT, id_shop INT',
        'product_attribute' => 'id_product_attribute INT, id_product INT',
        'product_attribute_shop' => 'id_product_attribute INT, id_shop INT',
        'feature_product' => 'id_product INT, id_feature INT, id_feature_value INT',
        'feature_value_lang' => 'id_feature_value INT, id_lang INT, value VARCHAR(100)',
        'customization' => 'id_customization INT AUTO_INCREMENT PRIMARY KEY, id_product INT, id_product_attribute INT, id_cart INT, id_address_delivery INT, quantity INT, quantity_refunded INT, quantity_returned INT, in_cart INT',
        'customized_data' => 'id_customization INT, type INT, `index` INT, id_module INT, value TEXT, price DECIMAL(20,6), weight DECIMAL(20,6)',
        'customization_field' => 'id_customization_field INT AUTO_INCREMENT PRIMARY KEY, id_product INT, type INT, required INT, is_module INT, is_deleted INT',
        'customization_field_lang' => 'id_customization_field INT, id_shop INT, id_lang INT, name VARCHAR(100)',
        'cart_product' => 'id_cart INT, id_product INT, id_product_attribute INT, id_customization INT, quantity INT',
        'orders' => 'id_order INT, id_cart INT, id_shop INT',
        'order_detail' => 'id_order INT, id_customization INT, product_id INT, product_attribute_id INT, product_quantity INT',
    ] as $suffix => $columns) {
        $table = _DB_PREFIX_ . $suffix;
        $pdo->exec('CREATE TEMPORARY TABLE `' . $table . '` (' . $columns . ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
        $db->tables[$table] = true;
    }
    $db->insert('product_shop', ['id_product' => 42, 'id_shop' => 1]);
    $db->insert('product_attribute', ['id_product_attribute' => 5, 'id_product' => 42]);
    $db->insert('product_attribute_shop', ['id_product_attribute' => 5, 'id_shop' => 1]);
    $db->insert('plasma_product', ['id_product' => 42, 'id_shop' => 1, 'enabled' => 1]);
    foreach ([11 => 'Staal', 12 => '3 mm'] as $feature => $value) {
        $db->insert('feature_product', ['id_product' => 42, 'id_feature' => $feature, 'id_feature_value' => $feature]);
        $db->insert('feature_value_lang', ['id_feature_value' => $feature, 'id_lang' => 1, 'value' => $value]);
    }
    foreach (['ENABLED' => '1', 'MATERIAL_SOURCE' => 'feature:11', 'THICKNESS_SOURCE' => 'feature:12', 'FEED_RATE' => '600', 'PIERCE_TIME' => '2', 'LEAD_IN_LENGTH' => '3', 'OPERATING_COST_PER_MINUTE' => '4'] as $suffix => $value) {
        Configuration::$values[MsThemeConfig\Plasma\PlasmaSettings::PREFIX . $suffix] = $value;
    }
    $service = new MsThemeConfig\Plasma\PlasmaService($context);
    $assetKey = bin2hex(random_bytes(32));
    $assetDirectory = $service->assetDirectory($assetKey, true);
    $preview = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50"><path d="M0 0H100V50H0Z"/></svg>';
    $optimized = "0\nSECTION\n2\nENTITIES\n0\nENDSEC\n0\nEOF\n";
    file_put_contents($assetDirectory . '/preview.svg', $preview);
    file_put_contents($assetDirectory . '/optimized.dxf', $optimized);
    $metrics = [
        'success' => true, 'total_length_mm' => 300.0, 'total_pierces' => 1, 'part_width_mm' => 100.0,
        'part_height_mm' => 50.0, 'audit_fixes_count' => 0, 'error_message' => null,
        'diagnostics' => ['is_safe_to_cut' => true, 'open_loops_count' => 0, 'duplicate_lines_stripped_count' => 0],
        'asset_hashes' => ['preview.svg' => hash('sha256', $preview), 'optimized.dxf' => hash('sha256', $optimized)],
    ];
    $db->insert('plasma_cutfile_library', [
        'id_shop' => 1, 'filename' => 'master.dxf', 'display_name' => pSQL("Smid's beugel 🔩"), 'category' => 'General',
        'raw_geometry_length_mm' => 300, 'total_pierces' => 1, 'part_width_mm' => 100, 'part_height_mm' => 50,
        'asset_key' => $assetKey, 'metrics_json' => pSQL(json_encode($metrics)), 'date_add' => date('Y-m-d H:i:s'),
    ]);
    $libraryId = $db->Insert_ID();
    check(count($service->libraryParts('beugel')) === 1 && $service->libraryParts('%') === [], 'Library search must retain Unicode and escape wildcards.');
    $quote = $service->libraryQuote(42, 5, $libraryId);
    check($quote['success'] && $quote['quote']['material'] === 'Steel' && abs($quote['quote']['surcharge_excl'] - 2.153333) < 0.000001, 'Cached geometry must use actual material mapping and production formula.');
    $quoteId = $quote['quote_id'];
    Configuration::$values['PS_TAX'] = 0;
    $taxFree = $service->quote($quoteId, 42, 5);
    check(abs($taxFree['quote']['total_price_incl'] - $taxFree['quote']['total_price_excl']) < 0.000001, 'Disabling shop taxes must also disable surcharge taxes.');
    Configuration::$values['PS_TAX'] = 1;
    Configuration::$values['VATNUMBER_MANAGEMENT'] = 1;
    Configuration::$values['VATNUMBER_COUNTRY'] = 1;
    Configuration::$values['PS_TAX_ADDRESS_TYPE'] = 'id_address_invoice';
    Address::$fixtures[11] = ['id_country' => 2, 'vat_number' => 'BE0123456789', 'rate' => 6.0];
    Product::$priceAddresses = [];
    $exempt = $service->quote($quoteId, 42, 5);
    check(abs($exempt['quote']['total_price_incl'] - $exempt['quote']['total_price_excl']) < 0.000001, 'The invoice address VAT exemption must apply to base and surcharge.');
    check(array_unique(Product::$priceAddresses) === [11], 'The base material quote must use the configured invoice tax address.');
    Address::$fixtures[11]['vat_number'] = '';
    $invoiceTax = $service->quote($quoteId, 42, 5);
    check(abs($invoiceTax['quote']['total_price_incl'] - $invoiceTax['quote']['total_price_excl'] * 1.06) < 0.000001, 'Base and surcharge must use the same invoice-country rate.');
    Configuration::$values['PS_TAX_ADDRESS_TYPE'] = 'id_address_delivery';
    Configuration::$values['VATNUMBER_MANAGEMENT'] = 0;
    $owned = new ReflectionMethod($service, 'ownedQuote');
    check($owned->invoke($service, $quoteId, 42, 5)['quote_id'] === $quoteId, 'Owning cart may retrieve its quote.');
    rejects(fn () => $owned->invoke($service, $quoteId, 99, 5), 'Other products must not reuse a quote.');
    rejects(fn () => $owned->invoke($service, $quoteId, 42, 6), 'Other combinations must not reuse a quote.');
    $context->cart->id = 2;
    rejects(fn () => $owned->invoke($service, $quoteId, 42, 5), 'Other carts must not reuse a quote.');
    $context->cart->id = 1;
    $originalSession = $context->cookie->plasma_session;
    $context->cookie->plasma_session = bin2hex(random_bytes(32));
    rejects(fn () => $owned->invoke($service, $quoteId, 42, 5), 'The session must match even when the cart ID matches.');
    $context->cookie->plasma_session = $originalSession;
    $context->shop->id = 2;
    rejects(fn () => $owned->invoke($service, $quoteId, 42, 5), 'Other shops must not reuse a quote.');
    $context->shop->id = 1;

    $added = $service->addToCart($quoteId, 42, 5, 2);
    check($added['success'] && !$pdo->inTransaction() && $db->locks === 1, 'Add-to-cart must lock and commit using valid real MySQL syntax.');
    $customization = $db->getRow('SELECT quantity,in_cart FROM `' . _DB_PREFIX_ . 'customization` WHERE id_customization=' . $added['id_customization']);
    check((int) $customization['quantity'] === 2 && (int) $customization['in_cart'] === 1, 'The legacy shop customization presenter must receive the complete sheet quantity.');
    rejects(fn () => $service->addToCart($quoteId, 42, 5, 2), 'A double submission must not create another customization.');
    $quote2 = $service->libraryQuote(42, 5, $libraryId);
    $added2 = $service->addToCart($quote2['quote_id'], 42, 5, 1);
    check($added2['id_customization'] !== $added['id_customization'], 'Separate drawings of one product must keep distinct cart lines.');
    $customizationCount = (int) $db->getValue('SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'customization`');
    $quote3 = $service->libraryQuote(42, 5, $libraryId);
    $context->cart->failAdd = true;
    rejects(fn () => $service->addToCart($quote3['quote_id'], 42, 5, 1), 'Unavailable stock must roll back all customization mutations.');
    $context->cart->failAdd = false;
    check(!$pdo->inTransaction() && (int) $db->getValue('SELECT COUNT(*) FROM `' . _DB_PREFIX_ . 'customization`') === $customizationCount, 'Failed adds must leave no orphan customizations.');
    check($owned->invoke($service, $quote3['quote_id'], 42, 5)['id_customization'] === null, 'A failed add must leave its quote usable.');
    $db->update('plasma_quote', ['expires_at' => '2001-01-01 00:00:00'], "quote_id='" . $quote3['quote_id'] . "'");
    rejects(fn () => $owned->invoke($service, $quote3['quote_id'], 42, 5), 'Expired quotes must not be usable.');

    $db->insert('orders', ['id_order' => 101, 'id_cart' => 1, 'id_shop' => 1]);
    $db->insert('orders', ['id_order' => 202, 'id_cart' => 2, 'id_shop' => 1]);
    foreach ([$added, $added2] as $part) {
        $db->insert('order_detail', ['id_order' => 101, 'id_customization' => $part['id_customization'], 'product_id' => 42, 'product_attribute_id' => 5, 'product_quantity' => 1]);
    }
    $db->insert('order_detail', ['id_order' => 202, 'id_customization' => $added['id_customization'], 'product_id' => 42, 'product_attribute_id' => 5, 'product_quantity' => 1]);
    check(count($service->orderFiles(101)) === 2 && $service->orderFiles(202) === [], 'Order files must bind order details to the original quote cart.');
    check($service->orderAsset(101, $added['id_customization'], 'dxf')['path'] === $assetDirectory . '/optimized.dxf', 'Authorized production downloads must use the verified optimized DXF.');
    rejects(fn () => $service->orderAsset(202, $added['id_customization'], 'dxf'), 'A customization must not download under another order.');
    Shop::$allowed = [2];
    check($service->orderFiles(101) === [], 'Order assets must respect the current shop scope.');
    Shop::$allowed = [1];
    file_put_contents($assetDirectory . '/optimized.dxf', $optimized . 'tampered');
    rejects(fn () => $service->orderAsset(101, $added['id_customization'], 'dxf'), 'Modified manufacturing artifacts must fail their saved hashes.');
    file_put_contents($assetDirectory . '/optimized.dxf', $optimized);
    $db->update('plasma_cutfile_library', ['active' => 0], 'id_cutfile=' . $libraryId);
    rejects(fn () => $service->libraryQuote(42, 5, $libraryId), 'Archived parts must not create new quotes.');
    check(is_file($service->orderAsset(101, $added['id_customization'], 'dxf')['path']), 'Archiving a library part must preserve existing order assets.');
    // Exercise the real Python process boundary for immutable editor revisions.
    $servicePython = dirname(__DIR__, 5) . '/var/plasma-python-service/python.exe';
    $python = getenv('PLASMA_TEST_PYTHON') ?: (PHP_OS_FAMILY === 'Windows' && is_file($servicePython)
        ? $servicePython : dirname(__DIR__, 5) . '/var/plasma-python-venv/' . (PHP_OS_FAMILY === 'Windows' ? 'Scripts/python.exe' : 'bin/python'));
    check(is_file($python), 'Set PLASMA_TEST_PYTHON to an interpreter containing the plasma engine dependencies.');
    Configuration::$values[MsThemeConfig\Plasma\PlasmaSettings::PREFIX . 'PYTHON_BINARY'] = $python;
    $editorKey = bin2hex(random_bytes(32));
    $editorDirectory = $service->assetDirectory($editorKey, true);
    $source = '<svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="50mm" viewBox="0 0 100 50"><rect x="0" y="0" width="100" height="50"/><rect x="10" y="10" width="20" height="10"/></svg>';
    file_put_contents($editorDirectory . '/source.svg', $source);
    $processAsset = new ReflectionMethod($service, 'processAsset');
    $editorMetrics = $processAsset->invoke($service, $editorDirectory . '/source.svg', $editorDirectory);
    check($editorMetrics['success'] && count($editorMetrics['contours']) === 2, 'The Python boundary must extract two editable contours from the source.');
    // Apache on Windows can run without any interactive user profile. Exercise
    // the real engine with that environment using the private cache prepared above.
    $profilelessProcess = new Symfony\Component\Process\Process([
        $python, dirname(__DIR__) . '/python/plasma_engine.py', $editorDirectory . '/source.svg',
        '--output-dir', $editorDirectory . '/profileless',
    ], $editorDirectory, [
        'USERPROFILE' => false, 'HOMEDRIVE' => false, 'HOMEPATH' => false, 'HOME' => false,
        'XDG_CONFIG_HOME' => $editorDirectory . '/.config', 'XDG_CACHE_HOME' => $editorDirectory . '/.cache',
    ]);
    $profilelessProcess->setTimeout(45);
    $profilelessProcess->run();
    $profilelessMetrics = json_decode($profilelessProcess->getOutput(), true);
    check($profilelessProcess->isSuccessful() && ($profilelessMetrics['success'] ?? false)
        && ($profilelessMetrics['total_pierces'] ?? 0) === 2,
        'The drawing processor must work for a service account without a home or user profile.');
    $newQuote = new ReflectionMethod($service, 'newQuote');
    $editorQuote = $newQuote->invoke($service, 42, 5, $editorKey, $editorMetrics, 'Editor test');
    check($editorQuote['success'], 'The original editor drawing must produce a valid quote.');
    $editorQuoteId = $editorQuote['quote_id'];
    $ids = array_column($editorMetrics['contours'], 'id');
    $initialRecord = $owned->invoke($service, $editorQuoteId, 42, 5);
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, [999999], 0, 0), 'Foreign contour IDs must not reach the parser.');
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, [$ids[0], $ids[0]], 0, 0), 'Duplicate contour IDs must be rejected.');
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, [(string) $ids[0]], 0, 0), 'String contour IDs must not bypass strict selection validation.');
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, $ids, -1, 0), 'Negative placement must fail.');
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, $ids, NAN, 0), 'Nonfinite placement must fail.');
    $context->cart->id = 2;
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, $ids, 0, 0), 'Foreign carts must not configure another drawing.');
    $context->cart->id = 1;
    rejects(fn () => $service->configure($quote3['quote_id'], 42, 5, [], 0, 0), 'Expired quotes must not create a revision.');
    $revision = $service->configure($editorQuoteId, 42, 5, [$ids[0]], 10, 20, 2);
    check($revision['success'] && $revision['quote_id'] !== $editorQuoteId && $revision['metrics']['total_pierces'] === 1 && $revision['quote']['quantity'] === 2, 'Selecting one contour must create a distinct repriced revision for the requested sheet quantity.');
    check($revision['metrics']['placement']['offset_x_mm'] == 10 && $revision['metrics']['placement']['offset_y_mm'] == 20, 'Requested design placement must pass through the real engine.');
    $revisionRecord = $owned->invoke($service, $revision['quote_id'], 42, 5);
    check($revisionRecord['asset_key'] !== $editorKey, 'Editing must never reuse the original asset directory.');
    check(file_get_contents($service->assetDirectory($revisionRecord['asset_key']) . '/source.svg') === $source, 'Each revision must keep the untouched source rather than a client or preview drawing.');
    $originalRecordAfter = $owned->invoke($service, $editorQuoteId, 42, 5);
    check($originalRecordAfter['metrics_json'] === $initialRecord['metrics_json'] && $originalRecordAfter['asset_key'] === $editorKey, 'An editor revision must not mutate the original quote metrics or asset binding.');
    foreach ($editorMetrics['asset_hashes'] as $file => $hash) {
        check(hash_file('sha256', $editorDirectory . '/' . $file) === $hash, 'Original manufacturing and source artifacts must remain immutable.');
    }
    $restored = $service->configure($revision['quote_id'], 42, 5, $ids, 30, 40);
    check($restored['success'] && $restored['metrics']['total_pierces'] === 2, 'A previously disabled contour must remain selectable on the next revision.');
    $empty = $service->configure($revision['quote_id'], 42, 5, [], 0, 0);
    check(!$empty['success'] && $empty['metrics']['total_pierces'] === 0 && !empty($empty['preview_svg']), 'Disabling all contours must retain an editable preview and block checkout.');
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, $ids, 950, 0), 'A translated drawing outside the fixed plate must not quote.');
    file_put_contents($editorDirectory . '/source.svg', $source . 'tampered');
    rejects(fn () => $service->configure($editorQuoteId, 42, 5, $ids, 0, 0), 'Changed source files must fail integrity before reprocessing.');
    file_put_contents($editorDirectory . '/source.svg', $source);
    echo "PASS: Plasma MySQL schema, cached quotes, invoice/VAT taxes, ownership, locks, rollback, order assets and immutable Python editor revisions (temporary fixtures only).\n";
} catch (Throwable $error) {
    // PDO errors can contain local connection details; report only controlled test assertions.
    fwrite(STDERR, 'Plasma MySQL test failed (' . get_class($error) . ')' . ($error instanceof PlasmaMysqlTestFailure ? ': ' . $error->getMessage() : '') . ".\n");
    $exitCode = 1;
} finally {
    if ($fixtureRoot !== null && is_dir($fixtureRoot)) {
        $resolvedRoot = realpath($fixtureRoot);
        if ($resolvedRoot !== false && str_starts_with(basename($resolvedRoot), 'msthemeconfig-plasma-test-')) {
            $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($resolvedRoot, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
            foreach ($iterator as $file) {
                $path = $file->getPathname();
                if (!str_starts_with($path, $resolvedRoot . DIRECTORY_SEPARATOR)) { continue; }
                if ($file->isDir() && !$file->isLink()) { rmdir($path); } else { unlink($path); }
            }
            rmdir($resolvedRoot);
        }
    }
}
exit($exitCode);
