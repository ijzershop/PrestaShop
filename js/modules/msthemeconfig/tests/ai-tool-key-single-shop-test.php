<?php

declare(strict_types=1);

/** Exercise exact-shop credential SQL against an in-memory database, without bootstrapping the shop. */
if (PHP_SAPI !== 'cli') { exit(1); }
define('_DB_PREFIX_', 'test_');
function pSQL($value): string { return str_replace("'", "''", (string) $value); }

class Shop
{
    public const CONTEXT_SHOP = 1;
    public int $id;
    public int $id_shop_group = 7;
    public function __construct(int $id) { $this->id = $id; }
    public static function getContext(): int { return self::CONTEXT_SHOP; }
    public static function isFeatureActive(): bool { return false; }
}
class Employee
{
    public int $id = 1;
    public int $id_profile = 1;
    public function isLoggedBack(): bool { return true; }
    public function isSuperAdmin(): bool { return true; }
}
class Context
{
    public static object $instance;
    public static function getContext(): object { return self::$instance; }
}
class Module
{
    public static function getInstanceByName($name): self { return new self(); }
    public function getPermission($operation, $employee): bool { return $operation === 'configure'; }
}
class Tools
{
    public static function getAdminTokenLite($tab): string { return 'test-csrf'; }
}
class Configuration
{
    public static function get(...$args) { throw new LogicException('Native Configuration would ignore explicit shop IDs.'); }
    public static function updateValue(...$args) { throw new LogicException('Native Configuration would create a global key.'); }
}
class Db
{
    public static PDO $pdo;
    public static function getInstance(): self { return new self(); }
    public function getValue(string $sql, bool $cache)
    {
        if ($cache) { throw new LogicException('Credential reads must not enter the query cache.'); }
        return self::$pdo->query($sql)->fetchColumn();
    }
    public function insert(string $table, array $data): bool
    {
        $columns = implode(', ', array_map(fn ($name) => '`' . $name . '`', array_keys($data)));
        $values = implode(', ', array_map(fn ($value) => "'" . $value . "'", $data));
        return self::$pdo->exec('INSERT INTO `' . _DB_PREFIX_ . $table . '` (' . $columns . ') VALUES (' . $values . ')') !== false;
    }
    public function update(string $table, array $data, string $where): bool
    {
        $assignments = [];
        foreach ($data as $name => $value) { $assignments[] = '`' . $name . "` = '" . $value . "'"; }
        return self::$pdo->exec('UPDATE `' . _DB_PREFIX_ . $table . '` SET ' . implode(', ', $assignments) . ' WHERE ' . $where) !== false;
    }
}

require __DIR__ . '/../src/AI/ToolKeySettings.php';
use MsThemeConfig\AI\ToolKeySettings;

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

Db::$pdo = new PDO('sqlite::memory:');
Db::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
Db::$pdo->exec('CREATE TABLE test_configuration (id_configuration INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,
    value TEXT, id_shop_group INTEGER, id_shop INTEGER, date_add TEXT, date_upd TEXT)');
$key = ToolKeySettings::KEYS['search'];
$seed = Db::$pdo->prepare('INSERT INTO test_configuration (name, value, id_shop_group, id_shop) VALUES (?, ?, ?, ?)');
$seed->execute([$key, 'sk-example-global', null, null]);
$seed->execute([$key, 'sk-example-group', 7, null]);
$seed->execute([$key, 'sk-example-other-shop', 7, 2]);
$seed->execute([$key, 'sk-example-wrong-group', 8, 1]);
Context::$instance = (object) ['shop' => new Shop(1), 'employee' => new Employee()];
$_SERVER['REQUEST_METHOD'] = 'POST';
$csrf = [ToolKeySettings::TOKEN_FIELD => 'test-csrf'];
check(ToolKeySettings::get('search', 1) === '', 'An exact shop credential must ignore global, group and other-shop rows.');
$newKey = "sk-example-insert-'quote";
ToolKeySettings::saveRequest($csrf + [$key => $newKey]);
check(ToolKeySettings::get('search', 1) === $newKey, 'A new credential must survive an exact-shop insert and read.');
ToolKeySettings::saveRequest($csrf + [$key => '']);
check(ToolKeySettings::get('search', 1) === $newKey, 'An empty form must preserve the stored value.');
ToolKeySettings::saveRequest($csrf + [$key => 'sk-example-updated']);
check(ToolKeySettings::get('search', 1) === 'sk-example-updated', 'Replacing a key must update its existing row.');
check((int) Db::$pdo->query('SELECT COUNT(*) FROM test_configuration')->fetchColumn() === 5, 'Updating credentials must not create duplicates.');
ToolKeySettings::saveRequest($csrf + [$key . '_REMOVE' => '1']);
check(ToolKeySettings::get('search', 1) === '', 'Removal must retain an empty exact-shop row.');
check(ToolKeySettings::get('search', 2) === 'sk-example-other-shop', 'Another shop credential must remain untouched.');
$global = Db::$pdo->query('SELECT value FROM test_configuration WHERE id_shop IS NULL ORDER BY id_configuration')->fetchAll(PDO::FETCH_COLUMN);
check($global === ['sk-example-global', 'sk-example-group'], 'Single-shop writes must never modify global or group settings.');

// Real SQL failure must be sanitized for reads and writes, without chained driver details.
Db::$pdo->exec('DROP TABLE test_configuration');
foreach ([fn () => ToolKeySettings::get('search', 1), fn () => ToolKeySettings::saveRequest($csrf + [$key => 'sk-example-private'])] as $operation) {
    try {
        $operation();
        throw new RuntimeException('SQL failures must be reported.');
    } catch (DomainException $error) {
        check($error->getPrevious() === null && !str_contains($error->getMessage(), 'test_configuration')
            && !str_contains($error->getMessage(), 'sk-example-private'), 'SQL failure details and credentials must remain private.');
    }
}
echo "PASS: Exact-shop credential SQL with multishop disabled, insert/update/remove isolation and sanitized SQL failures.\n";
