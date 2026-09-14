<?php

declare(strict_types=1);

/** PHP CLI only. Fake credentials and in-memory settings; no shop data or provider requests. */
if (PHP_SAPI !== 'cli') { exit(1); }
define('_DB_PREFIX_', 'test_');
function pSQL($value): string { return addslashes((string) $value); }

class Shop
{
    public const CONTEXT_SHOP = 1;
    public const CONTEXT_GROUP = 2;
    public const CONTEXT_ALL = 3;
    public static int $scope = self::CONTEXT_SHOP;
    public static bool $featureActive = true;
    public int $id;
    public int $id_shop_group = 7;
    public function __construct(int $id) { $this->id = $id; }
    public static function getContext(): int { return self::$scope; }
    public static function isFeatureActive(): bool { return self::$featureActive; }
}

class Employee
{
    public int $id = 1;
    public int $id_profile = 2;
    public bool $logged = true;
    public array $shops = [1, 2];
    public function isLoggedBack(): bool { return $this->logged; }
    public function isSuperAdmin(): bool { return $this->id_profile === 1; }
    public function getAssociatedShops(): array { return $this->shops; }
}

class Context
{
    public static object $instance;
    public static function getContext(): object { return self::$instance; }
}

class Module
{
    public static bool $configure = true;
    public static function getInstanceByName(string $name): self { return new self(); }
    public function getPermission(string $operation, Employee $employee): bool
    {
        if ($operation !== 'configure') { throw new RuntimeException('Wrong module permission.'); }
        return self::$configure;
    }
}

class Tools
{
    public static function getAdminTokenLite(string $tab): string
    {
        if ($tab !== 'AdminModules') { throw new RuntimeException('Wrong CSRF scope.'); }
        return 'employee-session-csrf-example';
    }
}

class Configuration
{
    public static array $values = [];
    public static array $globals = [];
    public static array $writes = [];
    public static array $reads = [];
    public static bool $failWrites = false;
    public static bool $returnFalse = false;
    public static function get($key, $lang = null, $group = null, $shop = null, $default = false)
    {
        self::$reads[] = [$key, $lang, $group, $shop];
        return self::$values[$shop][$key] ?? self::$globals[$key] ?? $default;
    }
    public static function hasKey($key, $lang = null, $group = null, $shop = null): bool
    {
        return $shop !== null && array_key_exists($key, self::$values[$shop] ?? []);
    }
    public static function updateValue($key, $value, $html, $group, $shop): bool
    {
        if (self::$failWrites) { throw new RuntimeException('Database error for secret: ' . $value); }
        if (self::$returnFalse) { return false; }
        if (!Shop::$featureActive) { throw new RuntimeException('Core configuration writes would become global with multishop disabled.'); }
        self::$writes[] = [$key, $value, $html, $group, $shop];
        self::$values[$shop][$key] = $value;
        return true;
    }
}

class Db
{
    public static function getInstance(): self { return new self(); }
    private static function scope(string $where): array
    {
        if (!preg_match("/`name` = '([^']+)' AND `id_shop_group` = ([0-9]+) AND `id_shop` = ([0-9]+)/", $where, $matches)) {
            throw new RuntimeException('Credential SQL must always use an exact shop and group.');
        }
        return [$matches[1], (int) $matches[2], (int) $matches[3]];
    }
    public function getValue(string $sql, bool $cache)
    {
        check(!$cache, 'Direct credential reads must not enter the query cache.');
        [$key, $group, $shop] = self::scope($sql);
        if (!array_key_exists($key, Configuration::$values[$shop] ?? [])) { return false; }
        return str_contains($sql, 'SELECT `id_configuration`') ? 1 : Configuration::$values[$shop][$key];
    }
    public function update(string $table, array $data, string $where): bool
    {
        [$key, $group, $shop] = self::scope($where);
        return $this->persist($table, $key, $group, $shop, $data);
    }
    public function insert(string $table, array $data): bool
    {
        return $this->persist($table, $data['name'], $data['id_shop_group'], $data['id_shop'], $data);
    }
    private function persist(string $table, string $key, int $group, int $shop, array $data): bool
    {
        check($table === 'configuration', 'Credentials must use the existing configuration table.');
        if (Configuration::$failWrites) { throw new RuntimeException('Database error for secret: ' . $data['value']); }
        if (Configuration::$returnFalse) { return false; }
        $value = stripslashes($data['value']);
        Configuration::$writes[] = [$key, $value, false, $group, $shop];
        Configuration::$values[$shop][$key] = $value;
        return true;
    }
}

require dirname(__DIR__, 5) . '/vendor/autoload.php';
require __DIR__ . '/../src/AI/ToolKeySettings.php';

use MsThemeConfig\AI\ToolKeySettings;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

function rejects(callable $operation, string $message): void
{
    $before = Configuration::$writes;
    try {
        $operation();
    } catch (DomainException $error) {
        check(Configuration::$writes === $before, 'Rejected credentials must not partly persist.');
        return;
    }
    throw new RuntimeException($message);
}

Context::$instance = (object) ['shop' => new Shop(1), 'employee' => new Employee(), 'language' => (object) ['id' => 3]];
$_SERVER['REQUEST_METHOD'] = 'POST';
$csrf = [ToolKeySettings::TOKEN_FIELD => Tools::getAdminTokenLite('AdminModules')];
$keys = ToolKeySettings::KEYS;
check(count($keys) === 4 && count(array_unique($keys)) === 4, 'Each customer tool has its own credential.');
$submitted = $csrf;
foreach ($keys as $tool => $key) { $submitted[$key] = 'sk-example-' . $tool; }
ToolKeySettings::saveRequest($submitted);
check(count(Configuration::$writes) === 4, 'The four credentials must be persisted.');
foreach (Configuration::$writes as [$key, $value, $html, $group, $shop]) {
    check(is_string($value) && !$html && $group === 7 && $shop === 1, 'Keys must be scalar, shop-specific settings.');
}

$before = Configuration::$writes;
ToolKeySettings::saveRequest($csrf + array_fill_keys(array_values($keys), ''));
check(Configuration::$writes === $before, 'Submitting blank password controls must retain all saved keys.');
Context::$instance->language->id = 1;
check(ToolKeySettings::get('search', 1) === 'sk-example-search', 'Credentials must work independently of the admin language.');
check(Configuration::$reads[0][1] === null, 'Credential reads must not use language-specific storage.');

Context::$instance->shop = new Shop(2);
check(ToolKeySettings::get('search', 2) === '', 'Another shop must not inherit credentials.');
ToolKeySettings::saveRequest($csrf + [$keys['search'] => 'sk-example-second-shop']);
check(ToolKeySettings::get('search', 1) === 'sk-example-search', 'Changing one shop must not change another.');
check(ToolKeySettings::get('search', 2) === 'sk-example-second-shop', 'The selected shop receives its own credential.');
Configuration::$globals[$keys['search']] = 'sk-example-global-must-never-inherit';
check(ToolKeySettings::get('search', 3) === '', 'A group or global fallback is not a tool credential.');
ToolKeySettings::saveRequest($csrf + [$keys['search'] . '_REMOVE' => '1']);
check(ToolKeySettings::get('search', 2) === '', 'Explicit removal must leave the selected shop without a credential.');
check(ToolKeySettings::get('search', 1) === 'sk-example-search', 'Removing one shop key must preserve the other shop key.');

Context::$instance->shop = new Shop(1);
$change = $csrf + [$keys['search'] => 'sk-example-replacement'];
foreach (['', 'wrong-token', ['invalid']] as $token) {
    rejects(fn () => ToolKeySettings::saveRequest(array_replace($change, [ToolKeySettings::TOKEN_FIELD => $token])), 'Invalid CSRF must fail.');
}
rejects(fn () => ToolKeySettings::saveRequest([$keys['search'] => 'sk-example']), 'Missing CSRF must fail.');
foreach (['GET', 'PUT'] as $method) {
    $_SERVER['REQUEST_METHOD'] = $method;
    rejects(fn () => ToolKeySettings::saveRequest($change), 'Non-POST key changes must fail.');
}
$_SERVER['REQUEST_METHOD'] = 'POST';
Context::$instance->employee->logged = false;
rejects(fn () => ToolKeySettings::saveRequest($change), 'An expired employee session must fail.');
check(!ToolKeySettings::viewData()['ai_tool_keys_allowed'], 'Expired sessions must not receive credential status or controls.');
Context::$instance->employee->logged = true;
Context::$instance->employee->id_profile = 5;
rejects(fn () => ToolKeySettings::saveRequest($change), 'A profile without access to the main panel must fail.');
Context::$instance->employee->id_profile = 2;
Module::$configure = false;
rejects(fn () => ToolKeySettings::saveRequest($change), 'The module configure permission is mandatory.');
Module::$configure = true;
Context::$instance->employee->shops = [2];
rejects(fn () => ToolKeySettings::saveRequest($change), 'An employee cannot write another shop.');
Context::$instance->employee->shops = [1, 2];
foreach ([Shop::CONTEXT_GROUP, Shop::CONTEXT_ALL] as $scope) {
    Shop::$scope = $scope;
    rejects(fn () => ToolKeySettings::saveRequest($change), 'Group and all-shop key changes must fail.');
    check(!ToolKeySettings::viewData()['ai_tool_keys_shop_allowed'], 'All-shop or group forms must disable credential fields.');
}
Shop::$scope = Shop::CONTEXT_SHOP;
$employee = Context::$instance->employee;
Context::$instance->employee = null;
rejects(fn () => ToolKeySettings::saveRequest($change), 'A customer session without an employee must fail.');
Context::$instance->employee = $employee;

foreach ([['array'], str_repeat('a', 2049), "sk-example\nembedded", 'sk example'] as $invalid) {
    rejects(fn () => ToolKeySettings::saveRequest($change + [$keys['sawing'] => $invalid]), 'Malformed credentials must reject the whole submission.');
}
rejects(fn () => ToolKeySettings::saveRequest($change + [$keys['search'] . '_REMOVE' => '1']), 'Replace and remove together must fail.');
rejects(fn () => ToolKeySettings::saveRequest($csrf + [$keys['search'] . '_REMOVE' => ['1']]), 'Malformed removal controls must fail.');
Configuration::$failWrites = true;
try {
    ToolKeySettings::saveRequest($change);
    throw new RuntimeException('Storage errors must be reported.');
} catch (DomainException $error) {
    check(!str_contains((string) $error, 'sk-example-replacement'), 'Storage errors must not expose keys through messages or previous exceptions.');
}
Configuration::$failWrites = false;
Configuration::$returnFalse = true;
rejects(fn () => ToolKeySettings::saveRequest($change), 'A false storage result must report failure.');
Configuration::$returnFalse = false;

Shop::$featureActive = false;
check(ToolKeySettings::get('search', 1) === 'sk-example-search', 'Disabling multishop must preserve reads of the exact shop row.');
check(ToolKeySettings::get('search', 3) === '', 'Single-shop mode must not accept a global credential.');
ToolKeySettings::saveRequest($csrf + [$keys['search'] => "sk-example-single-shop-'quote"]);
check(ToolKeySettings::get('search', 1) === "sk-example-single-shop-'quote", 'Single-shop mode must update and escape the exact shop credential.');
Context::$instance->shop = new Shop(2);
ToolKeySettings::saveRequest($csrf + [$keys['sawing'] => 'sk-example-new-single-shop']);
check(ToolKeySettings::get('sawing', 2) === 'sk-example-new-single-shop', 'Single-shop mode must insert a shop-scoped credential.');
check(ToolKeySettings::get('sawing', 1) === 'sk-example-sawing', 'Single-shop writes must not touch another shop.');
ToolKeySettings::saveRequest($csrf + [$keys['sawing'] . '_REMOVE' => '1']);
check(ToolKeySettings::get('sawing', 2) === '', 'Single-shop removal must remain local.');
Context::$instance->shop = new Shop(1);
Configuration::$returnFalse = true;
rejects(fn () => ToolKeySettings::saveRequest($change), 'A false single-shop storage result must report failure.');
Configuration::$returnFalse = false;
Shop::$featureActive = true;
ToolKeySettings::saveRequest($csrf + [$keys['search'] => 'sk-example-search']);

$view = ToolKeySettings::viewData();
check($view['ai_tool_key_fields'][0]['configured'] === true, 'The form must indicate a saved key without including it.');
$twig = new Environment(new FilesystemLoader(__DIR__ . '/../views/templates/admin/panels'));
$html = $twig->render('panel-config-main.html.twig', $view);
foreach ($submitted as $name => $value) {
    if (ToolKeySettings::isManagedField($name)) {
        check(!str_contains(json_encode($view), $value) && !str_contains($html, $value), 'Saved credentials must never enter Twig data or HTML.');
    }
}
check(substr_count($html, 'type="password"') === 4, 'The settings panel must render four password inputs.');
check(substr_count($html, 'value=""') >= 4, 'Password fields must always render empty.');
check(str_contains($html, 'Laat leeg om deze te behouden.') && str_contains($html, 'Opgeslagen sleutel verwijderen'), 'Preserve and remove behavior must be explained in Dutch.');

$moduleSource = file_get_contents(__DIR__ . '/../msthemeconfig.php');
check(str_contains($moduleSource, 'ToolKeySettings::saveRequest($_POST)'), 'Only the POST body may supply credentials.');
check(str_contains($moduleSource, 'ToolKeySettings::isManagedField($key)'), 'The generic configuration saver must skip managed fields.');
$hookSource = file_get_contents(__DIR__ . '/../src/Class/ModernHook.php');
preg_match('/\$confKeys = \[(.*?)\];/s', $hookSource, $frontConfig);
check(!empty($frontConfig[1]), 'Storefront settings must have an explicit allowlist.');
foreach ($keys as $key) {
    check(!str_contains($frontConfig[1], $key), 'Credentials must be absent from the storefront config projection.');
}

echo "PASS: Four shop-scoped AI keys, blank preservation, removal, authentication, CSRF and secret-free HTML.\n";
