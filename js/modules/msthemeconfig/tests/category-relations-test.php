<?php
declare(strict_types=1);

/** php tests/category-relations-test.php; real queries and rollback on an in-memory catalogue. */
if (PHP_SAPI !== 'cli') { exit(1); }

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

class Db
{
    public PDO $pdo;
    public int $installs = 0;
    public int $locks = 0;
    public int $insertCalls = 0;
    public ?int $failInsert = null;
    public bool $failRead = false;
    public bool $failCommit = false;

    public function __construct()
    {
        $this->pdo = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    }

    public function executeS(string $sql, bool $array = true, bool $useCache = true)
    {
        check(!$useCache, 'Repository reads must bypass the request cache after edits.');
        if ($this->failRead) { throw new RuntimeException('Private SQL error.'); }
        if (str_ends_with($sql, 'FOR UPDATE')) {
            check($this->pdo->inTransaction(), 'The source lock must be acquired inside the transaction.');
            ++$this->locks;
            // SQLite serializes this isolated transaction; production uses the MySQL source row lock.
            $sql = substr($sql, 0, -strlen('FOR UPDATE'));
        }
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function execute(string $sql, bool $useCache = true): bool
    {
        check(!$useCache, 'Mutations must explicitly avoid stale query cache reuse.');
        if (str_starts_with($sql, 'CREATE TABLE')) {
            ++$this->installs;
            check(str_contains($sql, 'ENGINE=InnoDB'), 'Relations require transactional storage.');
            check(str_contains($sql, 'VARCHAR(500)') && str_contains($sql, 'utf8mb4'), 'The schema must hold 500 Unicode characters.');
            check(str_contains($sql, 'PRIMARY KEY (`id_shop`, `id_category`, `id_related_category`)'), 'Relations must be unique per source and shop.');
            check(str_contains($sql, 'KEY `related_category` (`id_related_category`, `id_shop`)'), 'The target index must be installed.');
            // Translate only MySQL DDL syntax; all repository data queries execute unmodified.
            $sql = preg_replace('/,\s*KEY `related_category` \(`id_related_category`, `id_shop`\)/', '', $sql);
            $sql = preg_replace('/ ENGINE=InnoDB.*$/s', '', $sql);
            $this->pdo->exec($sql);
            $this->pdo->exec('CREATE INDEX IF NOT EXISTS relation_target ON ' . _DB_PREFIX_ . 'msthemeconfig_category_relation (id_related_category, id_shop)');
            return true;
        }
        if ($sql === 'START TRANSACTION') { return $this->pdo->beginTransaction(); }
        if ($sql === 'COMMIT') { return $this->failCommit ? false : $this->pdo->commit(); }
        if ($sql === 'ROLLBACK') { return $this->pdo->rollBack(); }
        if (str_starts_with($sql, 'INSERT INTO')) {
            ++$this->insertCalls;
            if ($this->failInsert === $this->insertCalls) { return false; }
        }
        return $this->pdo->exec($sql) !== false;
    }

    public function escape(string $value, bool $htmlOk = false): string
    {
        return substr($this->pdo->quote($value), 1, -1);
    }
}

define('_DB_PREFIX_', 'category_relation_test_');
require __DIR__ . '/../src/Category/CategoryRelationRepository.php';

try {
    $db = new Db();
    foreach ([
        'shop' => 'id_shop INTEGER PRIMARY KEY, id_category INTEGER',
        'category' => 'id_category INTEGER PRIMARY KEY, id_parent INTEGER, nleft INTEGER, nright INTEGER, active INTEGER, is_root_category INTEGER',
        'category_shop' => 'id_category INTEGER, id_shop INTEGER, PRIMARY KEY (id_category, id_shop)',
        'category_lang' => 'id_category INTEGER, id_shop INTEGER, id_lang INTEGER, name TEXT, second_name TEXT, link_rewrite TEXT, PRIMARY KEY (id_category, id_shop, id_lang)',
    ] as $table => $columns) {
        $db->pdo->exec('CREATE TABLE ' . _DB_PREFIX_ . $table . ' (' . $columns . ')');
    }
    $insert = static function (string $table, array $values) use ($db): void {
        $db->pdo->prepare('INSERT INTO ' . _DB_PREFIX_ . $table . ' VALUES (' . implode(',', array_fill(0, count($values), '?')) . ')')->execute($values);
    };
    $insert('shop', [1, 2]);
    $insert('shop', [2, 2]);
    $fixture = [
        [1, 0, 1, 100, 1, 0], // Global root is never a suggestion.
        [2, 1, 2, 99, 1, 1], // Shop home is never a suggestion.
        [10, 2, 3, 4, 1, 0], // Source category.
        [20, 2, 5, 6, 1, 0], [21, 2, 7, 8, 1, 0],
        [30, 2, 9, 12, 0, 0], [31, 30, 10, 11, 1, 0], // Inactive ancestor.
        [40, 2, 13, 16, 1, 0], [41, 40, 14, 15, 1, 0], // Ancestor absent from shop 1.
        [50, 2, 17, 18, 1, 0], // No Dutch data.
        [70, 2, 20, 25, 1, 1], // Another root category.
        [80, 1, 101, 102, 1, 0], // Outside the selected shop home tree.
    ];
    foreach ($fixture as $row) {
        $id = $row[0];
        $insert('category', $row);
        $shops = in_array($id, [1, 2, 10, 20], true) ? [1, 2] : ($id === 40 ? [2] : [1]);
        foreach ($shops as $shop) {
            $insert('category_shop', [$id, $shop]);
            $insert('category_lang', [$id, $shop, $id === 50 ? 2 : 1,
                "Categorie {$id} winkel {$shop}", $id === 20 ? "RVS bouten winkel {$shop}" : null, "categorie-{$id}-winkel-{$shop}"]);
        }
    }

    $repository = new MsThemeConfig\Category\CategoryRelationRepository($db);
    check($repository->install() && $repository->install() && $db->installs === 2, 'Installation must be idempotent.');
    check($repository->getRelations(10, 1) === [], 'A category starts with no suggestions.');
    $choices = array_column($repository->getChoices(10, 1, 1), null, 'id_category');
    check(array_intersect([1, 2, 10, 40, 50, 70], array_keys($choices)) === [], 'Self, root, home, other-shop and untranslated choices must be excluded.');
    check(isset($choices[20], $choices[21], $choices[30], $choices[31], $choices[41]), 'Editor choices must keep inactive selections visible.');
    check($choices[20]['second_name'] === 'RVS bouten winkel 1' && $choices[20]['parent_name'] === 'Categorie 2 winkel 1', 'Localized extended names and parent labels must be scoped to the selected shop.');
    check($choices[21]['second_name'] === '' && !$choices[30]['active'], 'A missing second name and inactive status must be explicit.');
    check(!$choices[31]['active'] && !$choices[41]['active'] && !$choices[80]['active'], 'New choices behind hidden ancestors or outside the shop tree must be marked unavailable.');
    check(in_array(10, array_column($repository->getChoices(0, 1, 1), 'id_category'), true), 'Unsaved category forms must be able to load choices before obtaining a source ID.');

    $rows = [
        ['id_related_category' => 21, 'note' => 'Voor moeren.', 'position' => 4],
        ['id_related_category' => '20', 'note' => "  Bouten 'M8'\nvoor verbindingen.  ", 'position' => '1'],
    ];
    $repository->replace(10, 1, 1, $rows);
    $saved = $repository->getRelations(10, 1);
    check(array_column($saved, 'id_related_category') === [20, 21], 'Submitted positions must control ordering independently of the submitted array.');
    check($saved[0]['note'] === "Bouten 'M8' voor verbindingen.", 'Notes must safely round-trip apostrophes and normalize whitespace.');
    check($repository->getRelations(20, 1) === [], 'Relations must not create reciprocal suggestions.');
    $related = $repository->getRelatedCategories(10, 1, 1);
    check(array_column($related, 'id_category') === [20, 21] && $related[0]['link_rewrite'] === 'categorie-20-winkel-1', 'Generation must retain canonical aliases, localized names and selected order.');
    check($repository->install() && $repository->getRelations(10, 1) === $saved, 'Reinstallation must retain existing relations.');

    $repository->replace(10, 2, 1, [['id_related_category' => 20, 'note' => 'Andere winkel.']]);
    check($repository->getRelations(10, 1) === $saved, 'Replacing one shop must not modify another shop.');
    check($repository->getRelatedCategories(10, 2, 1)[0]['second_name'] === 'RVS bouten winkel 2', 'Generation must use the selected shop translation.');
    check($repository->getRelatedCategories(10, 1, 2) === [], 'Generation must not fall back to another language.');

    $expectInvalid = static function (callable $operation, string $label) use ($repository, $saved, $db): void {
        try { $operation(); throw new LogicException('Expected rejection: ' . $label); }
        catch (InvalidArgumentException $error) {
            check(!str_contains($error->getMessage(), 'SQL'), 'Validation must show safe user messages.');
        }
        check($repository->getRelations(10, 1) === $saved, 'Rejected input must preserve all existing relations: ' . $label);
        check(!$db->pdo->inTransaction(), 'Rejected input must leave no transaction open: ' . $label);
    };
    foreach ([0, -1, 1.5, true, '20foo', '2e1', '00020', '4294967296', PHP_INT_MAX, null] as $badId) {
        $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => $badId]]), 'invalid target ID');
    }
    foreach ([1, 2, 10, 40, 50, 60, 70] as $badTarget) {
        $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => $badTarget]]), 'unavailable or forbidden target');
    }
    $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => 20], ['id_related_category' => '20']]), 'duplicate target');
    $expectInvalid(static fn() => $repository->replace(10, 1, 1, array_fill(0, 21, ['id_related_category' => 20])), 'connection limit');
    $expectInvalid(static fn() => $repository->replace(10, 1, 1, ['malformed']), 'non-array relation');
    foreach (['<b>Verbinding</b>', '&lt;script&gt;alert(1)&lt;/script&gt;', "Nul\0byte", str_repeat('é', 501), ['note']] as $badNote) {
        $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => 20, 'note' => $badNote]]), 'invalid note');
    }
    foreach ([-1, 1.2, true, '1e2', '4294967296'] as $badPosition) {
        $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => 20, 'position' => $badPosition]]), 'invalid position');
    }
    $expectInvalid(static fn() => $repository->replace(999, 1, 1, []), 'deleted source');
    $expectInvalid(static fn() => $repository->replace(40, 1, 1, []), 'source in another shop');
    $expectInvalid(static fn() => $repository->replace(10, 1, 2, []), 'source without selected language');
    $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => 30]]), 'new inactive target');
    $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => 31]]), 'new target behind inactive parent');
    $expectInvalid(static fn() => $repository->replace(10, 1, 1, [['id_related_category' => 41]]), 'new target behind other-shop parent');

    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'category SET active = 0 WHERE id_category = 20');
    $repository->replace(10, 1, 1, $rows);
    check($repository->getRelations(10, 1) === $saved, 'Previously selected inactive categories must remain editable.');
    check(array_column($repository->getRelatedCategories(10, 1, 1), 'id_category') === [21], 'Inactive selections must be omitted from generation.');
    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'category SET active = 1 WHERE id_category = 20');

    // Inject stale rows to represent deleted/deactivated categories or a later catalogue reorganization.
    foreach ([1, 2, 10, 30, 31, 40, 41, 50, 60, 70, 80] as $id) {
        $insert('msthemeconfig_category_relation', [1, 10, $id, 10 + $id, 'Oude koppeling.']);
    }
    check(array_column($repository->getRelatedCategories(10, 1, 1), 'id_category') === [20, 21], 'Generation must exclude inactive/deleted/untranslated/other-shop/root/self targets and hidden ancestor branches.');
    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'category SET active = 0 WHERE id_category = 2');
    check($repository->getRelatedCategories(10, 1, 1) === [], 'An inactive shop home must hide the full target branch.');
    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'category SET active = 1 WHERE id_category = 2');
    $repository->replace(10, 1, 1, $rows);
    check($repository->getRelations(10, 1) === $saved, 'Replacing valid links must clear stale outgoing selections.');

    $db->failInsert = $db->insertCalls + 2;
    try {
        $repository->replace(10, 1, 1, [['id_related_category' => 20, 'note' => 'Changed'], ['id_related_category' => 21]]);
        throw new LogicException('A partial insert failure must be reported.');
    } catch (RuntimeException $error) {
        check(str_contains($error->getMessage(), 'konden niet worden opgeslagen'), 'Write failures must use a safe Dutch message.');
    }
    check(!$db->pdo->inTransaction() && $repository->getRelations(10, 1) === $saved, 'A failure after deletion and the first insert must roll back the complete replacement.');
    $db->failInsert = null;
    $db->failCommit = true;
    try { $repository->replace(10, 1, 1, []); throw new LogicException('A commit failure must be reported.'); }
    catch (RuntimeException $error) { check(str_contains($error->getMessage(), 'konden niet worden opgeslagen'), 'A commit failure needs a safe message.'); }
    $db->failCommit = false;
    check(!$db->pdo->inTransaction() && $repository->getRelations(10, 1) === $saved, 'Commit failures must preserve the previous relations.');

    $db->failRead = true;
    try { $repository->getRelatedCategories(10, 1, 1); throw new LogicException('Read errors must not become empty sources.'); }
    catch (RuntimeException $error) { check(!str_contains($error->getMessage(), 'Private SQL') && str_contains($error->getMessage(), 'konden niet worden geladen'), 'Read errors must not expose SQL.'); }
    try { $repository->replace(10, 1, 1, []); throw new LogicException('Failed source lookup must reject the replacement.'); }
    catch (RuntimeException $error) { check(str_contains($error->getMessage(), 'konden niet worden opgeslagen'), 'A failed lookup during a write must report a save error.'); }
    $db->failRead = false;
    check(!$db->pdo->inTransaction() && $repository->getRelations(10, 1) === $saved, 'Source lookup failure must roll back cleanly.');

    $repository->replace(10, 1, 1, [['id_related_category' => 20, 'note' => str_repeat('é', 500)]]);
    check(mb_strlen($repository->getRelations(10, 1)[0]['note'], 'UTF-8') === 500, 'The note limit must count Unicode characters instead of UTF-8 bytes.');
    $maxRelations = [];
    for ($index = 0; $index < 21; ++$index) {
        $id = 100 + $index;
        $insert('category', [$id, 2, 26 + $index * 2, 27 + $index * 2, 1, 0]);
        $insert('category_shop', [$id, 1]);
        $insert('category_lang', [$id, 1, 1, 'Categorie ' . $id, '', 'categorie-' . $id]);
        if ($index < 20) { $maxRelations[] = ['id_related_category' => $id, 'position' => $index]; }
    }
    $repository->replace(10, 1, 1, $maxRelations);
    check(count($repository->getRelations(10, 1)) === 20, 'Exactly the documented maximum number of selections must be accepted.');
    $insert('msthemeconfig_category_relation', [1, 10, 120, 20, 'Extern geïmporteerd.']);
    check(count($repository->getRelatedCategories(10, 1, 1)) === 20, 'Published source retrieval must remain bounded even if extra rows were imported directly.');
    $repository->replace(10, 1, 1, []);
    check($repository->getRelations(10, 1) === [] && count($repository->getRelations(10, 2)) === 1, 'Removing all connections must affect only the selected source/shop.');
    check($db->locks > 0, 'Replacement must lock the source to prevent concurrent interleaved saves.');
    echo "Category relation checks passed: scoped directional storage, choices, published branches, input validation, Unicode notes, order and transaction rollback; no shop database was accessed.\n";
} catch (Throwable $error) {
    fwrite(STDERR, 'Category relation check failed: ' . $error->getMessage() . "\n");
    exit(1);
}
