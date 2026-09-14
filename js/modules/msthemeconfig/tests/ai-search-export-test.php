<?php
declare(strict_types=1);

/** Real exporter SELECTs against an isolated SQLite catalogue; no webshop bootstrap. */
if (PHP_SAPI !== 'cli') { exit(1); }

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

class Db
{
    public PDO $pdo;
    public array $queries = [];
    public function __construct()
    {
        $this->pdo = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    }
    public function executeS(string $sql, bool $array = true, bool $cache = true): array
    {
        check(!$cache, 'Snapshot reads must not reuse an old request cache.');
        check((bool) preg_match('/^SELECT\s/i', trim($sql)), 'Only SELECTs may reach the catalogue.');
        check(!preg_match('/SELECT\s+(?:[a-z]+\.)?\*/i', $sql), 'All selected fields must be explicit.');
        preg_match_all('/\b(?:FROM|JOIN)\s+([a-z_0-9]+)/i', $sql, $matches);
        foreach ($matches[1] as $table) {
            check(str_starts_with($table, _DB_PREFIX_), 'Every table must use the configured prefix.');
            check(!preg_match('/customer|order|cart|address|specific_price|configuration/', $table), 'Private operational tables are forbidden.');
        }
        $this->queries[] = $sql;
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }
}

class Link
{
    public int $loads = 0;
    public function getCategoryLink($id, $alias = null, $lang = null, $filters = null, $shop = null): string
    {
        check($lang === 1 && $shop === 1, 'Category URLs must use the selected Dutch shop.');
        return "https://shop.example/nl/category/{$id}-{$alias}";
    }
    public function getProductObject($id, $lang, $shop): object
    {
        check($lang === 1 && $shop === 1, 'Product objects must use the selected Dutch shop.');
        ++$this->loads;
        return (object) ['id' => $id];
    }
    public function getProductLink($product, $alias = null, $category = null, $ean = null, $lang = null, $shop = null, $combination = null): string
    {
        check(is_object($product) && $lang === 1 && $shop === 1, 'Product URL scope or object reuse is incorrect.');
        return "https://shop.example/nl/{$category}/{$product->id}-{$alias}" . ($combination ? '#variant-' . $combination : '');
    }
}

define('_DB_PREFIX_', 'search_export_test_');
require __DIR__ . '/../src/AI/Search/SearchPolicy.php';
require __DIR__ . '/../src/AI/Search/CatalogSnapshotExporter.php';

use MsThemeConfig\AI\Search\CatalogSnapshotExporter;
use MsThemeConfig\AI\Search\SearchPolicy;

try {
    $db = new Db();
    $link = new Link();
    $schema = [
        'shop' => 'id_shop INTEGER PRIMARY KEY, id_category INTEGER, active INTEGER, deleted INTEGER',
        'lang' => 'id_lang INTEGER PRIMARY KEY, iso_code TEXT, active INTEGER',
        'lang_shop' => 'id_lang INTEGER, id_shop INTEGER',
        'category' => 'id_category INTEGER PRIMARY KEY, id_parent INTEGER, nleft INTEGER, nright INTEGER, active INTEGER, is_root_category INTEGER',
        'category_shop' => 'id_category INTEGER, id_shop INTEGER',
        'category_group' => 'id_category INTEGER, id_group INTEGER',
        'category_lang' => 'id_category INTEGER, id_shop INTEGER, id_lang INTEGER, name TEXT, second_name TEXT, link_rewrite TEXT',
        'msthemeconfig_category_relation' => 'id_shop INTEGER, id_category INTEGER, id_related_category INTEGER, note TEXT, position INTEGER',
        'product' => 'id_product INTEGER PRIMARY KEY, second_name TEXT, reference TEXT, id_oi_offer INTEGER, private_memo TEXT, wholesale_price REAL',
        'product_shop' => 'id_product INTEGER, id_shop INTEGER, id_category_default INTEGER, active INTEGER, visibility TEXT, id_oi_offer INTEGER',
        'product_lang' => 'id_product INTEGER, id_shop INTEGER, id_lang INTEGER, name TEXT, link_rewrite TEXT, description_short TEXT, description TEXT',
        'category_product' => 'id_category INTEGER, id_product INTEGER',
        'accessory' => 'id_product_1 INTEGER, id_product_2 INTEGER',
        'feature' => 'id_feature INTEGER PRIMARY KEY, position INTEGER',
        'feature_shop' => 'id_feature INTEGER, id_shop INTEGER',
        'feature_lang' => 'id_feature INTEGER, id_lang INTEGER, name TEXT',
        'feature_product' => 'id_product INTEGER, id_feature INTEGER, id_feature_value INTEGER',
        'feature_value_lang' => 'id_feature_value INTEGER, id_lang INTEGER, value TEXT',
        'product_attribute' => 'id_product_attribute INTEGER PRIMARY KEY, id_product INTEGER, reference TEXT',
        'product_attribute_shop' => 'id_product_attribute INTEGER, id_shop INTEGER',
        'product_attribute_combination' => 'id_product_attribute INTEGER, id_attribute INTEGER',
        'attribute' => 'id_attribute INTEGER PRIMARY KEY, id_attribute_group INTEGER, position INTEGER',
        'attribute_shop' => 'id_attribute INTEGER, id_shop INTEGER',
        'attribute_group' => 'id_attribute_group INTEGER PRIMARY KEY, position INTEGER',
        'attribute_group_shop' => 'id_attribute_group INTEGER, id_shop INTEGER',
        'attribute_lang' => 'id_attribute INTEGER, id_lang INTEGER, name TEXT',
        'attribute_group_lang' => 'id_attribute_group INTEGER, id_lang INTEGER, name TEXT, public_name TEXT',
    ];
    foreach ($schema as $table => $columns) { $db->pdo->exec('CREATE TABLE ' . _DB_PREFIX_ . $table . ' (' . $columns . ')'); }
    $insert = static function (string $table, array $values) use ($db): void {
        $db->pdo->prepare('INSERT INTO ' . _DB_PREFIX_ . $table . ' VALUES (' . implode(',', array_fill(0, count($values), '?')) . ')')->execute($values);
    };
    $insert('shop', [1, 1, 1, 0]);
    $insert('shop', [2, 90, 1, 0]);
    $insert('lang', [1, 'nl', 1]);
    $insert('lang', [2, 'en', 1]);
    $insert('lang_shop', [1, 1]);
    $insert('lang_shop', [2, 1]);
    $addCategory = static function (int $id, int $parent, int $left, int $right, int $active = 1, int $shop = 1, int $group = 1, int $lang = 1) use ($insert): void {
        $insert('category', [$id, $parent, $left, $right, $active, $parent === 0 ? 1 : 0]);
        $insert('category_shop', [$id, $shop]);
        $insert('category_group', [$id, $group]);
        $insert('category_lang', [$id, $shop, $lang, 'Categorie ' . $id, null, 'categorie-' . $id]);
    };
    $addCategory(1, 0, 1, 50);
    $addCategory(10, 1, 2, 19);
    $addCategory(11, 10, 3, 4);
    $addCategory(12, 10, 5, 6, active: 0);
    $addCategory(13, 10, 7, 10, active: 0);
    $addCategory(14, 13, 8, 9);
    $addCategory(15, 10, 11, 14, group: 3);
    $addCategory(16, 15, 12, 13);
    $addCategory(17, 10, 15, 18, shop: 2);
    $addCategory(18, 17, 16, 17);
    $addCategory(20, 1, 20, 27);
    $addCategory(21, 20, 21, 22);
    $addCategory(22, 20, 23, 24, lang: 2);
    $addCategory(90, 0, 60, 63);
    $addCategory(91, 90, 61, 62);
    $db->pdo->exec("UPDATE " . _DB_PREFIX_ . "category_lang SET second_name = '<b>Staal</b> &amp; metaal' WHERE id_category = 10");

    $addProduct = static function (int $id, int $category = 11, int $shop = 1, int $lang = 1, int $active = 1,
        string $visibility = 'both', int $offer = 0, int $shopOffer = 0, ?int $default = null) use ($insert): void {
        $insert('product', [$id, $id === 101 ? '<b>Stalen plaat</b> &amp; strip' : "\u{200B} ", 'REF-' . $id, $offer, 'PRIVATE-CUSTOMER-MEMO', 9987.12]);
        $insert('product_shop', [$id, $shop, $default ?? $category, $active, $visibility, $shopOffer]);
        $insert('product_lang', [$id, $shop, $lang, 'Plaat ' . $id, 'plaat-' . $id,
            '<p>Staal &amp; metaal.</p><script>PRIVATE-SCRIPT</script>', '<div>Geschikt</div><div>voor lassen.</div>']);
        $insert('category_product', [$category, $id]);
    };
    $addProduct(101);
    $addProduct(102, 20, visibility: 'search');
    $addProduct(103, visibility: 'none');
    $addProduct(104, visibility: 'catalog');
    $addProduct(105, active: 0);
    $addProduct(106, shop: 2);
    $addProduct(107, lang: 2);
    $addProduct(108, 14);
    $addProduct(109, 16);
    $addProduct(110, 18);
    $addProduct(111, 91);
    $addProduct(112, offer: 70);
    $addProduct(113, shopOffer: 70);
    $addProduct(114, 22);
    $addProduct(115, 10);
    $addProduct(116, default: 15);
    $insert('category_product', [20, 115]);
    $insert('category_product', [15, 101]);
    $insert('msthemeconfig_category_relation', [1, 10, 20, '<p>Gebruik &amp; montage</p>', 3]);
    $insert('msthemeconfig_category_relation', [1, 10, 15, 'PRIVATE-RELATION-NOTE', 0]);
    $insert('msthemeconfig_category_relation', [2, 20, 10, 'OTHER-SHOP-NOTE', 0]);
    $insert('accessory', [101, 102]);
    $insert('accessory', [101, 109]);
    $insert('accessory', [101, 112]);
    $insert('accessory', [101, 101]);
    foreach ([[1, 'Materiaal', 'Staal'], [2, 'Kwaliteit', 'S235'], [3, 'Afwerking', 'Blank']] as [$id, $name, $value]) {
        $insert('feature', [$id, $id]);
        $insert('feature_shop', [$id, 1]);
        $insert('feature_lang', [$id, 1, $name]);
        $insert('feature_lang', [$id, 2, 'Wrong language']);
        $insert('feature_product', [101, $id, $id]);
        $insert('feature_value_lang', [$id, 1, $value]);
        $insert('feature_value_lang', [$id, 2, 'PRIVATE-ENGLISH-VALUE']);
    }
    foreach ([[1, 'Width', 'Breedte'], [2, 'Thickness', 'Dikte']] as [$id, $internal, $public]) {
        $insert('attribute_group', [$id, $id]);
        $insert('attribute_group_shop', [$id, 1]);
        $insert('attribute_group_lang', [$id, 1, $internal, $public]);
    }
    foreach ([[1, 1, '20 mm'], [2, 2, '2 mm'], [3, 1, '40 mm'], [4, 2, '3 mm']] as [$id, $group, $name]) {
        $insert('attribute', [$id, $group, $id]);
        $insert('attribute_shop', [$id, 1]);
        $insert('attribute_lang', [$id, 1, $name]);
    }
    foreach ([[1001, 1, [1, 2]], [1002, 1, [3, 4]], [1003, 2, [1, 4]]] as [$id, $shop, $attributes]) {
        $insert('product_attribute', [$id, 101, 'VARIANT-' . $id]);
        $insert('product_attribute_shop', [$id, $shop]);
        foreach ($attributes as $attribute) { $insert('product_attribute_combination', [$id, $attribute]); }
    }
    $build = static function (array $overrides = [], int $lang = 1) use ($db, $link): array {
        return (new CatalogSnapshotExporter($db, $link, 1, $lang, 1, SearchPolicy::validate($overrides)))->build();
    };
    $rejects = static function (callable $action, string $messageFragment): void {
        try { $action(); } catch (RuntimeException $error) {
            check(str_contains($error->getMessage(), $messageFragment), 'Expected actionable error: ' . $messageFragment);
            return;
        }
        throw new RuntimeException('Expected export rejection: ' . $messageFragment);
    };

    $snapshot = $build();
    check(array_column($snapshot['categories'], 'id') === [10, 11, 20, 21], 'Categories must obey public ancestor access, shop root and language.');
    check(array_column($snapshot['products'], 'id') === [101, 102, 115, 116], 'Exclude private, hidden, inactive, wrong-language, wrong-shop and offer products.');
    check($snapshot['language'] === 'nl' && $snapshot['language_id'] === 1 && $snapshot['shop_id'] === 1, 'Dutch shop identity must be explicit.');
    check($snapshot['export_policy_hash'] === SearchPolicy::sourceFingerprint(SearchPolicy::validate([])), 'Snapshot must bind its export policy.');
    check((bool) preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/', $snapshot['generated_at']), 'Timestamp must be UTC ISO 8601.');
    check($link->loads === 4 && count($db->queries) <= 10, 'Reads must be batched and product objects reused for combination URLs.');
    $categories = array_column($snapshot['categories'], null, 'id');
    $products = array_column($snapshot['products'], null, 'id');
    check($categories[10]['display_name'] === 'Staal & metaal' && $categories[10]['parent_id'] === 0 && $categories[11]['parent_id'] === 10, 'Names and surviving hierarchy must be preserved.');
    check($categories[10]['related_categories'] === [['id' => 20, 'note' => 'Gebruik & montage', 'position' => 3]]
        && $categories[20]['related_categories'] === [], 'Category relations must preserve direction, note, order and shop scope.');
    check($products[101]['category_ids'] === [11] && $products[115]['category_ids'] === [10, 20], 'Product membership must retain all public categories without duplicating products.');
    check($products[116]['default_category_id'] === 11 && !str_contains($products[116]['url'], 'categorie-15'), 'Private default categories must not escape through identifiers or generated paths.');
    check($products[101]['display_name'] === 'Stalen plaat & strip' && $products[102]['display_name'] === 'Plaat 102', 'Sanitized extended names need deterministic fallback.');
    check($products[101]['description'] === 'Staal & metaal. Geschikt voor lassen.', 'Descriptions must strip scripts and preserve word boundaries.');
    check($products[101]['related_product_ids'] === [102] && $products[102]['related_product_ids'] === [], 'Accessory edges must be directional and have public exported endpoints.');
    check($products[101]['features'] === [['name' => 'Materiaal', 'value' => 'Staal'], ['name' => 'Kwaliteit', 'value' => 'S235'], ['name' => 'Afwerking', 'value' => 'Blank']], 'Features must stay in the selected language.');
    check($products[101]['combinations'][0]['attributes'] === [['name' => 'Breedte', 'value' => '20 mm'], ['name' => 'Dikte', 'value' => '2 mm']]
        && $products[101]['combinations'][1]['attributes'] === [['name' => 'Breedte', 'value' => '40 mm'], ['name' => 'Dikte', 'value' => '3 mm']], 'Combination dimensions must retain their exact tuples.');
    check(count($products[101]['combinations']) === 2 && str_ends_with($products[101]['combinations'][1]['url'], '#variant-1002'), 'Combination links must select existing shop variants.');
    check($products[102]['combinations'] === [] && !$snapshot['coverage']['truncated'], 'Plain products and complete snapshots need explicit, truthful coverage.');
    check(!str_contains(json_encode($snapshot), 'PRIVATE-') && !str_contains(json_encode($snapshot), '9987.12'), 'Private database columns, scripts, foreign languages and inaccessible relations must not escape.');

    $selected = $build(['category_ids' => [10], 'excluded_category_ids' => [11]]);
    check(array_column($selected['categories'], 'id') === [10] && array_column($selected['products'], 'id') === [115], 'Selected subtrees and excluded subtrees must combine deterministically.');
    check($selected['categories'][0]['related_categories'] === [] && $selected['products'][0]['category_ids'] === [10], 'Policy boundaries must remove links and memberships outside the selected scope.');
    $excluded = $build(['excluded_category_ids' => [10]]);
    check(array_column($excluded['categories'], 'id') === [20, 21] && array_column($excluded['products'], 'id') === [102, 115], 'Excluding a parent must exclude descendants while keeping products with another public membership.');
    $empty = $build(['category_ids' => [15]]);
    check($empty['categories'] === [] && $empty['products'] === [] && !$empty['coverage']['truncated'], 'Selecting a private branch must not expose data.');

    $start = count($db->queries);
    $minimal = $build(['product_fields' => []]);
    foreach ($minimal['products'] as $product) {
        check(!array_intersect(['reference', 'description', 'features', 'combinations'], array_keys($product)), 'Excluded product fields must be absent.');
    }
    check(!preg_match('/\b(?:reference|description_short|feature_product|product_attribute)\b/', implode(' ', array_slice($db->queries, $start))), 'Excluded data must not even be selected from the database.');
    $limited = $build(['max_features' => 1, 'max_combinations' => 1, 'max_description_chars' => 12, 'max_relation_note_chars' => 5]);
    check($limited['coverage']['features_omitted'] === 2 && $limited['coverage']['combinations_omitted'] === 1
        && $limited['coverage']['text_fields_truncated'] >= 5 && $limited['coverage']['truncated'], 'All secondary record and text truncation must be reported.');
    check(mb_strlen($limited['products'][0]['description'], 'UTF-8') <= 12 && mb_strlen($limited['categories'][0]['related_categories'][0]['note'], 'UTF-8') <= 5, 'Text caps must respect Unicode character boundaries.');
    $zero = $build(['max_features' => 0, 'max_combinations' => 0, 'max_description_chars' => 0, 'max_relation_note_chars' => 0]);
    check($zero['products'][0]['features'] === [] && $zero['products'][0]['combinations'] === [] && $zero['products'][0]['description'] === '', 'Zero limits must suppress optional facts without corrupting JSON.');
    foreach (['', " \t\n", '<p>&nbsp;<br></p>', "\u{200B}\u{FEFF}", '<script>Hidden name</script>'] as $blankName) {
        $db->pdo->beginTransaction();
        $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'product_lang SET name = ? WHERE id_product = 101')->execute([$blankName]);
        $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'product SET second_name = ? WHERE id_product = 101')->execute([$blankName]);
        $insert('accessory', [102, 101]);
        $unnamed = $build();
        check(array_column($unnamed['products'], 'id') === [102, 115, 116]
            && $unnamed['coverage']['unnamed_products_omitted'] === 1 && $unnamed['coverage']['truncated'],
            'Products with blank, HTML-only or format-only names must be omitted and reported.');
        check($unnamed['products'][0]['related_product_ids'] === [], 'Accessory edges must not retain an unnamed endpoint.');
        $db->pdo->rollBack();
    }
    $db->pdo->beginTransaction();
    $db->pdo->exec("UPDATE " . _DB_PREFIX_ . "product_lang SET name = '' WHERE id_product = 101");
    $secondOnly = $build();
    check($secondOnly['products'][0]['display_name'] === 'Stalen plaat & strip'
        && $secondOnly['coverage']['unnamed_products_omitted'] === 0, 'A valid extended product name must preserve a record with an empty primary name.');
    $db->pdo->exec("UPDATE " . _DB_PREFIX_ . "category_lang SET name = '<p>&nbsp;</p>', second_name = '' WHERE id_category = 20");
    $unnamedCategory = $build();
    $remainingCategories = array_column($unnamedCategory['categories'], null, 'id');
    $remainingProducts = array_column($unnamedCategory['products'], null, 'id');
    check(array_keys($remainingCategories) === [10, 11, 21] && $remainingCategories[21]['parent_id'] === 0
        && $unnamedCategory['coverage']['unnamed_categories_omitted'] === 1, 'Unnamed categories must be omitted and reported without dangling parent IDs.');
    check(array_keys($remainingProducts) === [101, 115, 116] && $remainingProducts[115]['category_ids'] === [10]
        && $remainingCategories[10]['related_categories'] === [] && $remainingProducts[101]['related_product_ids'] === [],
        'Removing an unnamed category must remove its memberships, private-only products and dangling relation edges.');
    $db->pdo->rollBack();
    check((new CatalogSnapshotExporter($db, $link, 1, 1, 1, []))->build()['products'] === $snapshot['products'], 'The service must normalize omitted policy defaults itself.');
    try {
        new CatalogSnapshotExporter($db, $link, 1, 1, 1, ['max_products' => 0]);
        throw new RuntimeException('The service accepted an invalid cap.');
    } catch (InvalidArgumentException $expected) {}

    foreach (["DELETE FROM %sattribute_lang WHERE id_attribute = 4", "UPDATE %sattribute_shop SET id_shop = 2 WHERE id_attribute = 3"] as $sql) {
        $db->pdo->beginTransaction();
        $db->pdo->exec(sprintf($sql, _DB_PREFIX_));
        $incomplete = $build();
        check(array_column($incomplete['products'][0]['combinations'], 'id') === [1001]
            && $incomplete['coverage']['combinations_omitted'] === 1 && $incomplete['coverage']['truncated'], 'An incomplete tuple must be omitted and reported instead of becoming a partial specification.');
        $db->pdo->rollBack();
    }
    $db->pdo->beginTransaction();
    $longHtml = '<p>Voorbeeld.</p><script>' . str_repeat('PRIVATE-LONG-SCRIPT', 1500) . '</script><p>Einde.</p>';
    $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'product_lang SET description = ? WHERE id_product = 101')->execute([$longHtml]);
    $bounded = $build();
    check($bounded['products'][0]['description'] === 'Staal & metaal. Voorbeeld.'
        && $bounded['coverage']['text_fields_truncated'] >= 1 && $bounded['coverage']['truncated'], 'Oversized raw HTML must be clipped in SQL, reported, and stripped safely even if clipping cuts a script block.');
    $db->pdo->rollBack();

    $db->pdo->beginTransaction();
    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'category SET nright = 110 WHERE id_category = 1');
    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'category SET nleft = nleft + 1000, nright = nright + 1000 WHERE id_category IN (90,91)');
    for ($index = 0; $index < 21; ++$index) {
        $id = 200 + $index;
        $addCategory($id, 1, 60 + $index * 2, 61 + $index * 2);
        $addProduct(2000 + $index, $id);
        $insert('msthemeconfig_category_relation', [1, 10, $id, 'Aanvullend product', 10 + $index]);
        $insert('accessory', [101, 2000 + $index]);
    }
    $relationLimits = $build();
    check(count($relationLimits['categories'][0]['related_categories']) === 20 && count($relationLimits['products'][0]['related_product_ids']) === 20
        && $relationLimits['coverage']['category_relations_omitted'] === 2 && $relationLimits['coverage']['product_relations_omitted'] === 2,
        'Relation caps must preserve the first ordered public links and report every omitted edge.');
    $db->pdo->rollBack();
    $rejects(fn() => $build(['max_products' => 3]), 'max_products');
    $rejects(fn() => $build(['max_categories' => 3]), 'max_categories');
    $rejects(fn() => $build(['max_snapshot_bytes' => 1024]), 'max_snapshot_bytes');
    $rejects(fn() => $build(lang: 2), 'Nederlandse taal');
    foreach (["UPDATE %slang SET active = 0 WHERE id_lang = 1", "DELETE FROM %slang_shop WHERE id_lang = 1", "UPDATE %sshop SET active = 0 WHERE id_shop = 1", "UPDATE %sshop SET deleted = 1 WHERE id_shop = 1"] as $sql) {
        $db->pdo->beginTransaction();
        $db->pdo->exec(sprintf($sql, _DB_PREFIX_));
        $rejects(fn() => $build(), 'Nederlandse taal');
        $db->pdo->rollBack();
    }
    $db->pdo->beginTransaction();
    $db->pdo->exec('DELETE FROM ' . _DB_PREFIX_ . 'category_group WHERE id_category = 1');
    check($build()['products'] === [], 'A restricted shop root must hide all descendant products.');
    $db->pdo->rollBack();
    $db->pdo->beginTransaction();
    $db->pdo->exec('DROP TABLE ' . _DB_PREFIX_ . 'msthemeconfig_category_relation');
    $rejects(fn() => $build(), 'module-upgrades');
    $db->pdo->rollBack();
    $db->pdo->exec('DROP TABLE ' . _DB_PREFIX_ . 'accessory');
    $rejects(fn() => $build(), 'accessoiretabel');
    fwrite(STDOUT, "AI search export tests passed.\n");
} catch (Throwable $error) {
    fwrite(STDERR, $error->getMessage() . "\n" . $error->getTraceAsString() . "\n");
    exit(1);
}
