<?php
declare(strict_types=1);

/**
 * Real MySQL DDL, queries and transactions using only connection-local TEMPORARY fixtures.
 * php tests/category-relations-mysql-test.php
 * Does not bootstrap PrestaShop or change permanent shop tables.
 */
if (PHP_SAPI !== 'cli') { exit(1); }

class CategoryRelationMysqlTestFailure extends RuntimeException {}
function check(bool $condition, string $message): void
{
    if (!$condition) { throw new CategoryRelationMysqlTestFailure($message); }
}

class Db
{
    public PDO $pdo;
    public array $tables = [];
    public int $locks = 0;
    public int $inserts = 0;
    public ?int $duplicateInsert = null;
    private array $copies = [];

    public function __construct(PDO $pdo) { $this->pdo = $pdo; }

    private function guardTable(string $table): void
    {
        check(isset($this->tables[$table]) && str_starts_with($table, _DB_PREFIX_), 'Only registered temporary fixture tables may be accessed.');
    }

    public function executeS(string $sql, bool $array = true, bool $useCache = true): array
    {
        check((bool) preg_match('/^SELECT\s/i', trim($sql)), 'Only SELECT is accepted by the read adapter.');
        if (str_ends_with($sql, 'FOR UPDATE')) {
            check($this->pdo->inTransaction(), 'The source FOR UPDATE must execute inside the real MySQL transaction.');
            ++$this->locks;
        }
        $seen = [];
        $sql = preg_replace_callback('/\b(FROM|JOIN)\s+`?([a-zA-Z_][a-zA-Z0-9_]*)`?/i', function (array $match) use (&$seen): string {
            $table = $match[2];
            $this->guardTable($table);
            $occurrence = $seen[$table] = ($seen[$table] ?? 0) + 1;
            if ($occurrence === 1) { return $match[0]; }

            // MySQL cannot reopen one temporary table in a self join/subquery. Additional
            // read aliases get temporary copies; the SELECT conditions remain unchanged.
            $copy = $table . '_read' . $occurrence;
            check(strlen($copy) <= 64, 'Temporary fixture identifiers must fit MySQL identifier limits.');
            if (!isset($this->copies[$copy])) {
                $this->pdo->exec("CREATE TEMPORARY TABLE `{$copy}` LIKE `{$table}`");
                $this->copies[$copy] = true;
            } else {
                $this->pdo->exec("DELETE FROM `{$copy}`");
            }
            $this->pdo->exec("INSERT INTO `{$copy}` SELECT * FROM `{$table}`");
            return $match[1] . ' `' . $copy . '`';
        }, $sql);
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function execute(string $sql, bool $useCache = true): bool
    {
        check(!$useCache, 'Repository mutations must bypass query caching.');
        if (in_array($sql, ['START TRANSACTION', 'COMMIT', 'ROLLBACK'], true)) {
            return $this->pdo->exec($sql) !== false;
        }
        $relationTable = _DB_PREFIX_ . 'msthemeconfig_category_relation';
        if (preg_match('/\ACREATE TABLE IF NOT EXISTS `([a-zA-Z0-9_]+)` /', $sql, $match)) {
            check($match[1] === $relationTable, 'Installation may create only the temporary relation fixture.');
            $this->tables[$relationTable] = true;
            // Preserve the actual installation definition, adding only TEMPORARY.
            $sql = preg_replace('/\ACREATE TABLE /', 'CREATE TEMPORARY TABLE ', $sql, 1);
            return $this->pdo->exec($sql) !== false;
        }
        check((bool) preg_match('/\A(?:DELETE FROM|INSERT INTO)\s+([a-zA-Z0-9_]+)\s/s', $sql, $match), 'Only relation fixture inserts and deletions may be executed.');
        $this->guardTable($match[1]);
        check($match[1] === $relationTable, 'The repository may mutate only its temporary relation fixture.');
        if (str_starts_with($sql, 'INSERT INTO')) {
            ++$this->inserts;
            if ($this->duplicateInsert === $this->inserts) {
                // Execute this valid temporary insert twice to cause a real duplicate-key
                // exception after the earlier delete/inserts, testing a genuine DB rollback.
                $this->pdo->exec($sql);
            }
        }
        return $this->pdo->exec($sql) !== false;
    }

    public function escape(string $value, bool $htmlOk = false): string
    {
        return substr($this->pdo->quote($value), 1, -1);
    }
}

class Link
{
    public function getCategoryLink($id, $alias = null, $lang = null, $filters = null, $shop = null): string
    {
        return "https://shop{$shop}.example/category/{$id}-{$alias}?lang={$lang}";
    }
}

try {
    $parameters = require dirname(__DIR__, 5) . '/app/config/parameters.php';
    $config = $parameters['parameters'] ?? $parameters;
    $host = (string) ($config['database_host'] ?? '');
    check(in_array($host, ['127.0.0.1', 'localhost', '::1'], true), 'Only a loopback database is allowed.');
    $database = (string) $config['database_name'];
    check((bool) preg_match('/^[A-Za-z0-9_-]+$/D', $database), 'Invalid local database name.');
    $port = (int) ($config['database_port'] ?: 3306);
    $pdo = new PDO('mysql:host=' . $host . ';port=' . $port . ';dbname=' . $database . ';charset=utf8mb4',
        (string) $config['database_user'], (string) $config['database_password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_MULTI_STATEMENTS => false]);
    unset($parameters, $config);
    define('_DB_PREFIX_', 'cr_test_' . bin2hex(random_bytes(5)) . '_');
    $db = new Db($pdo);
    require __DIR__ . '/../src/Category/CategoryRelationRepository.php';
    require __DIR__ . '/../src/AI/CategorySourceContext.php';

    foreach ([
        'shop' => 'id_shop INT PRIMARY KEY, id_category INT',
        'category' => 'id_category INT PRIMARY KEY, id_parent INT, nleft INT, nright INT, active INT, is_root_category INT',
        'category_shop' => 'id_category INT, id_shop INT, PRIMARY KEY (id_category, id_shop)',
        'category_lang' => 'id_category INT, id_shop INT, id_lang INT, name VARCHAR(255), second_name VARCHAR(255), link_rewrite VARCHAR(255), PRIMARY KEY (id_category, id_shop, id_lang)',
        'category_product' => 'id_category INT, id_product INT',
        'product' => 'id_product INT PRIMARY KEY',
        'product_shop' => 'id_product INT, id_shop INT, active INT, visibility VARCHAR(20)',
        'product_lang' => 'id_product INT, id_shop INT, id_lang INT',
    ] as $suffix => $columns) {
        $table = _DB_PREFIX_ . $suffix;
        $pdo->exec("CREATE TEMPORARY TABLE `{$table}` ({$columns}) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        $db->tables[$table] = true;
    }
    $insert = static function (string $suffix, array $values) use ($pdo, $db): void {
        $table = _DB_PREFIX_ . $suffix;
        check(isset($db->tables[$table]), 'Fixture inserts may only target registered temporary tables.');
        $pdo->prepare('INSERT INTO `' . $table . '` VALUES (' . implode(',', array_fill(0, count($values), '?')) . ')')->execute($values);
    };
    $insert('shop', [1, 2]);
    $insert('shop', [2, 2]);
    foreach ([
        [1, 0, 1, 40, 1, 0], [2, 1, 2, 39, 1, 1], [10, 2, 3, 4, 1, 0],
        [20, 2, 5, 6, 1, 0], [21, 2, 7, 8, 1, 0],
        [30, 2, 9, 12, 0, 0], [31, 30, 10, 11, 1, 0],
        [40, 2, 13, 16, 1, 0], [41, 40, 14, 15, 1, 0],
        [50, 2, 17, 18, 1, 0],
    ] as $category) {
        $id = $category[0];
        $insert('category', $category);
        foreach ($id === 40 ? [2] : (in_array($id, [1, 2, 10, 20], true) ? [1, 2] : [1]) as $shop) {
            $insert('category_shop', [$id, $shop]);
            $insert('category_lang', [$id, $shop, $id === 50 ? 2 : 1,
                "Categorie {$id}", $id === 20 ? "RVS bouten winkel {$shop}" : '', "categorie-{$id}-winkel-{$shop}"]);
        }
    }

    $repository = new MsThemeConfig\Category\CategoryRelationRepository($db);
    check($repository->install() && $repository->install(), 'The actual MySQL installation DDL must be idempotent.');
    $relationTable = _DB_PREFIX_ . 'msthemeconfig_category_relation';
    $ddl = $pdo->query('SHOW CREATE TABLE `' . $relationTable . '`')->fetch(PDO::FETCH_NUM)[1];
    check(str_contains($ddl, 'ENGINE=InnoDB') && str_contains($ddl, 'utf8mb4'), 'Actual relation storage must be transactional and support full Unicode.');
    check(str_contains($ddl, '`note` varchar(500)') && str_contains($ddl, 'KEY `related_category`'), 'Actual MySQL schema must retain the note limit and target index.');
    $choices = array_column($repository->getChoices(10, 1, 1), null, 'id_category');
    check(array_intersect([1, 2, 10, 40, 50], array_keys($choices)) === [], 'Real MySQL choices must exclude self/root/home and unavailable shops/languages.');
    check(!$choices[31]['active'] && !$choices[41]['active'], 'Inactive and other-shop ancestors must disable new selections.');
    check(in_array(10, array_column($repository->getChoices(0, 1, 1), 'id_category'), true), 'Unsaved category forms must retrieve choices.');

    $rows = [
        ['id_related_category' => 21, 'position' => 2, 'note' => 'Aanvullend bevestigingsmateriaal.'],
        ['id_related_category' => 20, 'position' => 0, 'note' => "Voor smid's verbindingen 🔩."],
    ];
    $repository->replace(10, 1, 1, $rows);
    $saved = $repository->getRelations(10, 1);
    check(array_column($saved, 'id_related_category') === [20, 21] && $saved[0]['note'] === "Voor smid's verbindingen 🔩.", 'MySQL must preserve selected order, quotes and four-byte UTF-8 notes.');
    check($db->locks > 0 && !$pdo->inTransaction(), 'The real source lock and successful commit must execute.');
    check($repository->getRelations(20, 1) === [], 'Saving one source must not create reverse connections.');
    $repository->replace(10, 2, 1, [['id_related_category' => 20, 'note' => 'Tweede winkel.']]);
    check($repository->getRelations(10, 1) === $saved, 'Saving another shop must preserve the original shop connections.');
    check($repository->getRelatedCategories(10, 2, 1)[0]['second_name'] === 'RVS bouten winkel 2', 'Related names must use the selected shop.');

    $source = (new MsThemeConfig\AI\CategorySourceContext($db, new Link(), 1, 1))->build([
        'id_category' => 10, 'name' => 'Liggers', 'second_name' => 'RVS liggers', 'link_rewrite' => 'rvs-liggers',
    ]);
    check($source['products'] === [] && array_column($source['related_categories'], 'id') === [20, 21], 'The real source path must include valid category connections even without product fixtures.');
    check($source['related_categories'][0]['url'] === 'https://shop1.example/category/20-categorie-20-winkel-1?lang=1'
        && $source['related_categories'][0]['second_name'] === 'RVS bouten winkel 1', 'Source output must use the scoped canonical category link and extended name.');
    foreach ([1, 2, 10, 30, 31, 40, 41, 50, 999] as $id) {
        $insert('msthemeconfig_category_relation', [1, 10, $id, 20 + $id, 'Oude selectie.']);
    }
    check(array_column($repository->getRelatedCategories(10, 1, 1), 'id_category') === [20, 21], 'Real ancestry queries must exclude stale, hidden, untranslated and other-shop targets.');
    $repository->replace(10, 1, 1, $rows);

    $db->duplicateInsert = $db->inserts + 2;
    try {
        $repository->replace(10, 1, 1, [['id_related_category' => 20, 'note' => 'Changed'], ['id_related_category' => 21]]);
        throw new CategoryRelationMysqlTestFailure('A real duplicate-key error must abort replacement.');
    } catch (RuntimeException $error) {
        if ($error instanceof CategoryRelationMysqlTestFailure) { throw $error; }
        check(str_contains($error->getMessage(), 'konden niet worden opgeslagen'), 'Database failures must report a safe Dutch save error.');
    }
    $db->duplicateInsert = null;
    check(!$pdo->inTransaction() && $repository->getRelations(10, 1) === $saved, 'MySQL rollback must restore the deletion and all partial inserts.');

    $repository->replace(10, 1, 1, [['id_related_category' => 20, 'note' => str_repeat('🔩', 500)]]);
    check(mb_strlen($repository->getRelations(10, 1)[0]['note'], 'UTF-8') === 500, 'MySQL VARCHAR(500) must accept 500 four-byte characters.');
    $repository->replace(10, 1, 1, []);
    check($repository->getRelations(10, 1) === [] && count($repository->getRelations(10, 2)) === 1, 'Clearing must affect only the requested source/shop.');
    echo "Category relation MySQL checks passed: actual installation schema, source locks, scoped choices/source links, Unicode, save/clear and rollback after a real SQL failure; only connection-local TEMPORARY fixtures were used.\n";
} catch (Throwable $error) {
    // PDO and wrapped errors may contain configuration: only controlled assertion text is safe.
    $detail = $error instanceof CategoryRelationMysqlTestFailure ? ': ' . $error->getMessage() : '';
    fwrite(STDERR, 'Category relation MySQL check failed (' . get_class($error) . ')' . $detail . ".\n");
    exit(1);
}
// All temporary fixtures disappear automatically when the connection closes.
