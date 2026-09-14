<?php
declare(strict_types=1);

/**
 * Run the real category save controller against one connection-local TEMPORARY table.
 * Requires the local development database; never bootstraps PrestaShop or edits shop rows.
 * php module/msthemeconfig/tests/ai-categories-save-test.php
 */
if (PHP_SAPI !== 'cli') { exit(1); }

class CategorySaveTestFailure extends RuntimeException {}
function check(bool $condition, string $message): void {
    if (!$condition) { throw new CategorySaveTestFailure($message); }
}

class ModuleAdminController { public $context; }
class Tools
{
    public static array $values = [];
    public static function getValue(string $name, $default = false) {
        return self::$values[$name] ?? $default;
    }
}
class Configuration
{
    public static function get(string $name) {
        check($name === 'PS_LANG_DEFAULT', 'Unexpected configuration read.');
        return 1;
    }
    public static function updateValue(...$arguments): bool {
        throw new CategorySaveTestFailure('Category JSON-LD must stay in its category/shop/language row.');
    }
}
class Db
{
    public static PDO $pdo;
    public static string $testTable;
    public static function getInstance(): self { return new self(); }
    private function guard(string $sql): void {
        $table = '`?' . preg_quote(self::$testTable, '/') . '`?';
        check((bool)preg_match('/\A(?:UPDATE\s+' . $table . '\s+SET\s|SELECT\s+.+?\s+FROM\s+' . $table . '\s+WHERE\s)/is', $sql),
            'The controller may only access the temporary category table.');
    }
    public function escape(string $value, bool $html = false): string {
        return substr(self::$pdo->quote($value), 1, -1);
    }
    public function execute(string $sql): bool {
        $this->guard($sql);
        return self::$pdo->exec($sql) !== false;
    }
    public function getValue(string $sql) {
        $this->guard($sql);
        return self::$pdo->query($sql)->fetchColumn();
    }
}
function pSQL(string $value): string { return substr(Db::$pdo->quote($value), 1, -1); }
function reportFailure(Throwable $error): void {
    // Connection/SQL exceptions can include configuration; only our assertion messages are safe.
    $detail = $error instanceof CategorySaveTestFailure ? ': ' . $error->getMessage() : '';
    fwrite(STDERR, 'AI category save integration check failed (' . get_class($error) . ')' . $detail . ".\n");
}

try {
    $parameters = require dirname(__DIR__, 5) . '/app/config/parameters.php';
    $config = $parameters['parameters'] ?? $parameters;
    $host = (string)($config['database_host'] ?? '');
    check(in_array($host, ['127.0.0.1', 'localhost', '::1'], true), 'Only a loopback database is allowed.');
    $database = (string)$config['database_name'];
    check((bool)preg_match('/^[A-Za-z0-9_-]+$/D', $database), 'Invalid local database name.');
    $port = (int)($config['database_port'] ?: 3306);
    Db::$pdo = new PDO(
        'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $database . ';charset=utf8mb4',
        (string)$config['database_user'], (string)$config['database_password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_MULTI_STATEMENTS => false]
    );
    unset($parameters, $config);
    define('_DB_PREFIX_', 'ai_category_test_' . bin2hex(random_bytes(6)) . '_');
    define('_PS_VERSION_', 'test');
    Db::$testTable = _DB_PREFIX_ . 'category_lang';
    // The current category schema has jsonld, but deliberately no meta_keywords column.
    Db::$pdo->exec('CREATE TEMPORARY TABLE `' . Db::$testTable . '` (
        id_category INT NOT NULL, id_shop INT NOT NULL, id_lang INT NOT NULL,
        description LONGTEXT NOT NULL, top_description LONGTEXT NOT NULL,
        meta_title VARCHAR(255) NOT NULL,
        meta_description VARCHAR(512) NOT NULL, jsonld LONGTEXT NULL,
        PRIMARY KEY (id_category, id_shop, id_lang)
    )');
    $insert = Db::$pdo->prepare('INSERT INTO `' . Db::$testTable . '` VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    foreach ([[1, 1, 1], [1, 2, 1], [1, 1, 2], [2, 1, 1], [2, 2, 1], [2, 1, 2], [3, 1, 1]] as $key) {
        $insert->execute(array_merge($key, ['Original bottom description', 'Original top description',
            'Original title', 'Original meta', '{"original":true}']));
    }
    $jsonld = json_encode(['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => []], JSON_THROW_ON_ERROR);
    $description = "<p>Stalen poorten & smid's beslag.</p>"
        . '<p class="mb-0"><i class="fasl fa-circle-question" aria-hidden="true"></i> <strong>Welke maat past?</strong></p>'
        . '<p><i class="fasl fa-circle-info" aria-hidden="true"></i> Bekijk de beschikbare maten.</p>';
    Tools::$values = ['id_lang' => 1, 'drafts' => json_encode([
        ['id_category' => 1, 'description' => $description, 'meta_title' => 'Stalen poorten',
            'meta_description' => 'Beslag voor uw poort.', 'meta_keywords' => 'legacy, obsolete'],
        ['id_category' => 2, 'description' => '<p>Met FAQ.</p>', 'seo_jsonld' => $jsonld],
        ['id_category' => 999999, 'description' => 'This category does not exist'],
        ['id_category' => 3, 'description' => 'Must not be partially saved', 'meta_title' => 'Must not change',
            'seo_jsonld' => '{invalid json}'],
    ], JSON_THROW_ON_ERROR)];

    require __DIR__ . '/../controllers/admin/MsAdminAICategoriesController.php';
    $reflection = new ReflectionClass(MsAdminAICategoriesController::class);
    $controller = $reflection->newInstanceWithoutConstructor();
    $controller->context = (object)['shop' => (object)['id' => 1]];
    $save = $reflection->getMethod('ajaxSaveDrafts');
    $save->setAccessible(true);

    // ajaxDie exits the process; inspect its JSON and the same temporary table at shutdown.
    ob_start();
    register_shutdown_function(static function () use ($jsonld, $description): void {
        $output = ob_get_clean();
        try {
            $response = json_decode((string)$output, true, 512, JSON_THROW_ON_ERROR);
            check(($response['ok'] ?? null) === false, 'A partially failed batch must report failure.');
            check(($response['saved'] ?? null) === 2, 'Only the two valid existing categories should count as saved.');
            check(count($response['errors'] ?? []) === 2, 'Missing category and invalid JSON-LD must both be reported.');
            $rows = Db::$pdo->query('SELECT * FROM `' . Db::$testTable . '`')->fetchAll(PDO::FETCH_ASSOC);
            check(count($rows) === 7, 'Save must not insert or remove rows.');
            foreach ($rows as $row) {
                check($row['description'] === 'Original bottom description',
                    'The existing bottom description must remain unchanged for every category, shop and language.');
                $category = (int)$row['id_category'];
                $target = (int)$row['id_shop'] === 1 && (int)$row['id_lang'] === 1;
                if ($target && $category === 1) {
                    check($row['top_description'] === $description && $row['meta_title'] === 'Stalen poorten'
                        && $row['meta_description'] === 'Beslag voor uw poort.',
                        'Draft HTML, empty FAQ icons or aria attributes were not preserved in the top description, or metadata changed.');
                    check($row['jsonld'] === '{"original":true}', 'Omitted JSON-LD was overwritten.');
                } elseif ($target && $category === 2) {
                    check($row['top_description'] === '<p>Met FAQ.</p>' && $row['jsonld'] === $jsonld,
                        'Top description and JSON-LD were not saved on the intended row.');
                    check($row['meta_title'] === 'Original title' && $row['meta_description'] === 'Original meta',
                        'Omitted metadata was overwritten.');
                } else {
                    check($row['top_description'] === 'Original top description' && $row['meta_title'] === 'Original title'
                        && $row['meta_description'] === 'Original meta' && $row['jsonld'] === '{"original":true}',
                        'Another shop/language or the invalid JSON-LD draft was modified.');
                }
            }
            echo "AI category save SQL checks passed on a local TEMPORARY table; no shop records were changed.\n";
        } catch (Throwable $error) {
            reportFailure($error);
            exit(1);
        }
    });
    $save->invoke($controller);
} catch (Throwable $error) {
    reportFailure($error);
    exit(1);
}
// The temporary table disappears automatically when this connection closes.
