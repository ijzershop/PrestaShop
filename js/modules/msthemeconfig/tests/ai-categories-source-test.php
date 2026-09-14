<?php
declare(strict_types=1);

/** php tests/ai-categories-source-test.php; runs real SELECTs on an in-memory SQLite catalogue. */
if (PHP_SAPI !== 'cli') { exit(1); }

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

class Db
{
    public PDO $pdo;
    public int $queries = 0;
    public bool $fail = false;
    public bool $omitSecondNames = false;
    public function __construct() { $this->pdo = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]); }
    public function executeS(string $sql)
    {
        ++$this->queries;
        check((bool) preg_match('/^SELECT\s/i', trim($sql)), 'The source helper may only read the catalogue.');
        preg_match_all('/\b(?:FROM|JOIN)\s+([a-z_]+)/i', $sql, $tables);
        foreach ($tables[1] as $table) {
            check(str_starts_with($table, _DB_PREFIX_), 'All tables must use the configured prefix.');
        }
        if ($this->fail) { return false; }
        $rows = $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        if ($this->omitSecondNames) {
            foreach ($rows as &$row) { unset($row['second_name']); }
            unset($row);
        }
        return $rows;
    }
}

class Link
{
    public int $productLoads = 0;
    public function getProductObject($id, $idLang, $idShop): object
    {
        ++$this->productLoads;
        check($idLang === 1 && $idShop === 1, 'Product URL objects must use the requested shop and language.');
        return (object) ['id' => (int) $id];
    }
    public function getCategoryLink($category, $alias = null, $idLang = null, $selectedFilters = null, $idShop = null, $relativeProtocol = false): string
    {
        return "https://shop{$idShop}.example/category/{$category}-{$alias}?lang={$idLang}";
    }
    public function getProductLink($product, $alias = null, $category = null, $ean13 = null, $idLang = null, $idShop = null, $ipa = null,
        $forceRoutes = false, $relativeProtocol = false, $withIdInAnchor = false, $extraParams = [], $addAnchor = true): string
    {
        check(is_object($product), 'Reuse one loaded object for each product and its combination URLs.');
        return "https://shop{$idShop}.example/product/{$product->id}-{$alias}?lang={$idLang}"
            . ($ipa ? '&id_product_attribute=' . $ipa : '');
    }
}

define('_DB_PREFIX_', 'ai_source_test_');
require __DIR__ . '/../src/Category/CategoryRelationRepository.php';
require __DIR__ . '/../src/AI/CategorySourceContext.php';

try {
    $db = new Db();
    $link = new Link();
    $schema = [
        'category' => 'id_category INTEGER PRIMARY KEY, id_parent INTEGER, nleft INTEGER, nright INTEGER, active INTEGER, is_root_category INTEGER',
        'shop' => 'id_shop INTEGER PRIMARY KEY, id_category INTEGER',
        'category_shop' => 'id_category INTEGER, id_shop INTEGER',
        'category_lang' => 'id_category INTEGER, id_shop INTEGER, id_lang INTEGER, name TEXT, link_rewrite TEXT, second_name TEXT',
        'msthemeconfig_category_relation' => 'id_shop INTEGER, id_category INTEGER, id_related_category INTEGER, position INTEGER, note TEXT',
        'category_product' => 'id_category INTEGER, id_product INTEGER',
        'product' => 'id_product INTEGER PRIMARY KEY, reference TEXT, ean13 TEXT, second_name TEXT',
        'product_shop' => 'id_product INTEGER, id_shop INTEGER, id_category_default INTEGER, unity TEXT, available_for_order INTEGER, active INTEGER, visibility TEXT',
        'product_lang' => 'id_product INTEGER, id_shop INTEGER, id_lang INTEGER, name TEXT, link_rewrite TEXT, description_short TEXT, description TEXT, available_now TEXT, available_later TEXT',
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
    foreach ($schema as $table => $columns) {
        $db->pdo->exec('CREATE TABLE ' . _DB_PREFIX_ . $table . ' (' . $columns . ')');
    }
    $insert = static function (string $table, array $values) use ($db): void {
        $sql = 'INSERT INTO ' . _DB_PREFIX_ . $table . ' VALUES (' . implode(',', array_fill(0, count($values), '?')) . ')';
        $db->pdo->prepare($sql)->execute($values);
    };
    foreach ([[1, 0, 1, 30, 1], [11, 1, 2, 3, 1], [12, 1, 4, 7, 0], [13, 12, 5, 6, 1],
        [14, 1, 8, 11, 1], [15, 14, 9, 10, 1], [16, 1, 12, 13, 1], [99, 0, 31, 32, 1]] as $row) {
        $row[2] += 2;
        $row[3] += 2;
        if ($row[1] === 0) { $row[1] = 100; }
        $insert('category', array_merge($row, [0]));
        $insert('category_shop', [$row[0], $row[0] === 14 ? 2 : 1]);
        $insert('category_lang', [$row[0], 1, 1, 'Categorie ' . $row[0], 'categorie-' . $row[0], '']);
    }
    $insert('category', [100, 0, 1, 40, 1, 1]);
    $insert('category_shop', [100, 1]);
    $insert('category_lang', [100, 1, 1, 'Shop root', 'home', '']);
    $insert('shop', [1, 100]);
    $insert('shop', [2, 100]);
    $addProduct = static function (int $id, int $category = 11, int $shop = 1, int $lang = 1, int $active = 1, string $visibility = 'both', ?string $secondName = null) use ($insert): void {
        $insert('product', [$id, 'REF-' . $id, '', $secondName]);
        $insert('product_shop', [$id, $shop, $category, 'm', 1, $active, $visibility]);
        $insert('product_lang', [$id, $shop, $lang, 'Aanlasplaat ' . $id, 'aanlasplaat-' . $id,
            '<p>Staal &amp; metaal.</p><script>Niet opnemen.</script><p>Maat ' . $id . ' mm.</p>', '<p>Voor laswerk.</p>', 'Op voorraad', 'Op aanvraag']);
        $insert('category_product', [$category, $id]);
    };
    $addProduct(101, secondName: ' <strong>Stalen</strong> aanlasplaat &amp; montageplaat 80 × 80 × 4 mm ');
    $addProduct(102, secondName: 'Verzinkte stalen aanlasplaat 100 × 100 × 5 mm');
    $addProduct(103, 11, 1, 2); // No selected-language product data.
    $addProduct(104, 11, 1, 1, 1, 'none');
    $addProduct(105, 11, 1, 1, 0);
    $addProduct(106, 11, 2);
    $addProduct(107, 99);
    $addProduct(108);
    $addProduct(109, 13); // Active child behind an inactive parent.
    $addProduct(110, 15); // Active child behind an ancestor belonging only to another shop.
    $insert('category_product', [16, 101]); // Must not duplicate the same product.
    $insert('product_lang', [101, 2, 1, 'Andere winkel', 'verkeerd', '', '', '', '']);
    $insert('product_lang', [101, 1, 2, 'English name', 'english', '', '', '', '']);
    foreach ([[1, 'Kwaliteit', 'S235'], [2, 'Afmetingen', '80 × 80 × 4 mm'], [3, 'Technische gegevens', '.']] as [$id, $name, $value]) {
        $insert('feature', [$id, $id]);
        $insert('feature_shop', [$id, 1]);
        $insert('feature_lang', [$id, 1, $name]);
        $insert('feature_lang', [$id, 2, 'English feature']);
        $insert('feature_product', [101, $id, $id]);
        $insert('feature_value_lang', [$id, 1, $value]);
        $insert('feature_value_lang', [$id, 2, 'Wrong-language value']);
    }
    $insert('feature', [4, 4]);
    $insert('feature_shop', [4, 2]);
    $insert('feature_lang', [4, 1, 'Andere winkel']);
    $insert('feature_product', [101, 4, 4]);
    $insert('feature_value_lang', [4, 1, 'Mag niet lekken']);
    foreach ([[1, 'Interne dikte', 'Dikte'], [2, 'Interne lengte', 'Lengte']] as [$id, $name, $publicName]) {
        $insert('attribute_group', [$id, $id]);
        $insert('attribute_group_shop', [$id, 1]);
        $insert('attribute_group_lang', [$id, 1, $name, $publicName]);
        $insert('attribute_group_lang', [$id, 2, 'English', 'English']);
    }
    foreach ([[1, 1, '8 mm'], [2, 2, '30 mm'], [3, 1, '10 mm'], [4, 2, '40 mm']] as [$id, $group, $value]) {
        $insert('attribute', [$id, $group, $id]);
        $insert('attribute_shop', [$id, 1]);
        $insert('attribute_lang', [$id, 1, $value]);
        $insert('attribute_lang', [$id, 2, 'Wrong-language attribute']);
    }
    $addCombination = static function (int $id, int $product, array $attributes, int $shop = 1) use ($insert): void {
        $insert('product_attribute', [$id, $product, 'COMB-' . $id]);
        $insert('product_attribute_shop', [$id, $shop]);
        foreach ($attributes as $attribute) { $insert('product_attribute_combination', [$id, $attribute]); }
    };
    $addCombination(1001, 101, [1, 2]);
    $addCombination(1002, 101, [3, 4]);
    $addCombination(1003, 101, [1, 4], 2);

    $helper = new MsThemeConfig\AI\CategorySourceContext($db, $link, 1, 1);
    $category = ['id_category' => 1, 'name' => 'Aanlasplaten', 'second_name' => ' <strong>Stalen</strong> aanlasplaten &amp; montageplaten ', 'parent_name' => 'Staal',
        'top_description' => '<p>Bestaande bovenbeschrijving.</p>',
        'description' => '<p>Bestaande categorie.</p>', 'additional_description' => '<p>Aanvullende informatie.</p>', 'link_rewrite' => 'aanlasplaten'];
    $source = $helper->build($category);
    check($source['category']['name'] === 'Aanlasplaten' && $source['category']['second_name'] === 'Stalen aanlasplaten & montageplaten', 'The extended category name must become plain text while preserving the original name.');
    check($source['category']['display_name'] === 'Stalen aanlasplaten & montageplaten', 'A present extended category name must become the deterministic display name.');
    check($source['category']['existing_text'] === 'Bestaande bovenbeschrijving. Bestaande categorie. Aanvullende informatie.', 'Category source must include top_description and retain the other descriptions as context.');
    check(array_column($source['products'], 'id') === [101, 102, 108], 'Descendants, active branches, shop, visibility, language and deduplication are not correctly scoped.');
    check($source['coverage'] === ['total_products' => 3, 'included_products' => 3, 'truncated' => false], 'The complete product coverage is incorrect.');
    check($db->queries <= 9, 'Catalogue details and related categories should use a bounded batch of SELECTs.');
    check($source['related_categories'] === [], 'A category without explicit connections must not invent cross-sell categories.');
    check($link->productLoads === 3, 'Variant URL generation should load at most one object per product.');
    $first = $source['products'][0];
    check($first['name'] === 'Aanlasplaat 101' && $first['second_name'] === 'Stalen aanlasplaat & montageplaat 80 × 80 × 4 mm', 'The global extended product name must become plain text while preserving the localized original name.');
    check($source['products'][1]['name'] === 'Aanlasplaat 102' && $source['products'][1]['second_name'] === 'Verzinkte stalen aanlasplaat 100 × 100 × 5 mm', 'Each extended product name must remain associated with its own product.');
    check($source['products'][2]['second_name'] === '' && $source['products'][2]['name'] === 'Aanlasplaat 108', 'A null extended product name must become empty while retaining the original name for fallback.');
    check($first['display_name'] === $first['second_name'] && $source['products'][1]['display_name'] === $source['products'][1]['second_name'], 'Each product display name must prefer its own sanitized extended name.');
    check($source['products'][2]['display_name'] === 'Aanlasplaat 108', 'A product without an extended name must expose its normal name as display name.');
    check($first['description'] === 'Staal & metaal. Maat 101 mm. Voor laswerk.', 'HTML stripping must retain word boundaries, decode entities and omit scripts.');
    check($first['features'] === [['name' => 'Kwaliteit', 'value' => 'S235'], ['name' => 'Afmetingen', 'value' => '80 × 80 × 4 mm']], 'Feature values, language, shop or placeholder filtering are incorrect.');
    check($first['combinations'][0]['attributes'] === [['name' => 'Dikte', 'value' => '8 mm'], ['name' => 'Lengte', 'value' => '30 mm']], 'Combination 1001 must retain its paired attributes and public group names.');
    check($first['combinations'][1]['attributes'] === [['name' => 'Dikte', 'value' => '10 mm'], ['name' => 'Lengte', 'value' => '40 mm']], 'Sizes from different combinations must not be mixed.');
    check(count($first['combinations']) === 2 && str_ends_with($first['combinations'][1]['url'], '&id_product_attribute=1002'), 'Variant links must target the correct existing combination in this shop.');
    check($first['url'] !== $source['products'][1]['url'], 'Separate product size variants must retain separate navigation links.');
    check($first['url'] === 'https://shop1.example/product/101-aanlasplaat-101?lang=1'
        && $source['products'][1]['url'] === 'https://shop1.example/product/102-aanlasplaat-102?lang=1', 'Extended names must not change canonical product links.');
    check($first['availability']['stock_status_verified'] === false && !isset($first['weight'], $first['width']), 'Unverified stock and shipping dimensions must not become technical specifications.');
    foreach (array_slice($source['products'], 1) as $product) {
        check($product['combinations'] === [] && $product['combination_coverage'] === ['total' => 0, 'included' => 0, 'truncated' => false], 'Products without combinations must remain complete plain products in a mixed assortment.');
        check(!str_contains($product['url'], 'id_product_attribute'), 'Plain product URLs must not invent a selected combination.');
    }
    check($source['warnings'] === [], 'Absent related categories and optional combinations must not produce missing-data warnings.');

    // When all products are plain products, attribute queries and fabricated variants must be absent.
    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'product_attribute_shop SET id_shop = 2 WHERE id_product_attribute IN (1001,1002)');
    $startQueries = $db->queries;
    $plainProducts = $helper->build($category);
    check($db->queries - $startQueries <= 8, 'An assortment without selected-shop combinations must skip the attribute-detail SELECT.');
    check($plainProducts['coverage'] === ['total_products' => 3, 'included_products' => 3, 'truncated' => false]
        && $plainProducts['related_categories'] === [] && $plainProducts['warnings'] === [], 'Plain products without cross-sell connections must remain a complete source.');
    foreach ($plainProducts['products'] as $product) {
        check($product['combinations'] === [] && $product['combination_coverage'] === ['total' => 0, 'included' => 0, 'truncated' => false], 'No selected-shop combinations must produce explicit empty arrays and zero coverage.');
        check(!str_contains($product['url'], 'id_product_attribute'), 'All plain products must retain their normal product links.');
    }
    check($plainProducts['products'][0]['features'] === $first['features'], 'Removing optional combinations must not discard product-level technical features.');
    $db->pdo->exec('UPDATE ' . _DB_PREFIX_ . 'product_attribute_shop SET id_shop = 1 WHERE id_product_attribute IN (1001,1002)');

    $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'product SET second_name = ? WHERE id_product = 102')->execute([" \t\n "]);
    $blankNames = $helper->build(array_replace($category, ['second_name' => " \t\n "]));
    check($blankNames['category']['second_name'] === '' && $blankNames['category']['name'] === 'Aanlasplaten', 'A whitespace-only extended category name must retain the original name for fallback.');
    check($blankNames['products'][1]['second_name'] === '' && $blankNames['products'][1]['name'] === 'Aanlasplaat 102', 'A whitespace-only extended product name must retain the original name for fallback.');
    $categoryWithoutSecondName = $category;
    unset($categoryWithoutSecondName['second_name']);
    $missingCategoryName = $helper->build($categoryWithoutSecondName);
    check($missingCategoryName['category']['second_name'] === '' && $missingCategoryName['category']['name'] === 'Aanlasplaten', 'An absent extended category name must become empty while retaining the original name for fallback.');
    check($missingCategoryName['category']['display_name'] === 'Aanlasplaten', 'An absent extended category name must select the normal name deterministically.');

    foreach ([null, '', " \t\n ", "\u{200B}\u{FEFF}", '<span></span>', '<p>&nbsp;<br></p>', '<p>&#8203;&nbsp;</p>', '<script>Discard this name.</script>'] as $blankSecondName) {
        $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'product SET second_name = ? WHERE id_product = 102')->execute([$blankSecondName]);
        $blank = $helper->build(array_replace($category, ['second_name' => $blankSecondName]));
        check($blank['category']['second_name'] === '' && $blank['category']['display_name'] === 'Aanlasplaten', 'Null, empty, whitespace and HTML-empty category second names must fall back after sanitization.');
        check($blank['products'][1]['second_name'] === '' && $blank['products'][1]['display_name'] === 'Aanlasplaat 102', 'Null, empty, whitespace and HTML-empty product second names must fall back after sanitization.');
    }
    $db->omitSecondNames = true;
    $missingNames = $helper->build($categoryWithoutSecondName);
    $db->omitSecondNames = false;
    foreach ($missingNames['products'] as $product) {
        check($product['second_name'] === '' && $product['display_name'] === $product['name'], 'An omitted optional second-name field must fall back without changing product identity.');
    }
    $sanitizedNormal = $helper->build(array_replace($category, ['name' => '<strong>Staal</strong> &amp; metaal', 'second_name' => '<p>&nbsp;</p>']));
    check($sanitizedNormal['category']['name'] === 'Staal & metaal' && $sanitizedNormal['category']['display_name'] === 'Staal & metaal', 'The fallback normal name must be sanitized too.');
    $meaningfulFormat = $helper->build(array_replace($category, ['second_name' => "RVS\u{200D}bouten"]));
    check($meaningfulFormat['category']['display_name'] === "RVS\u{200D}bouten", 'Format characters inside a meaningful name must not be stripped by blank detection.');

    $insert('category', [98, 100, 35, 36, 1, 0]);
    $insert('category_shop', [98, 1]);
    $insert('category_lang', [98, 1, 1, 'Lege categorie', 'lege-categorie', null]);
    $startQueries = $db->queries;
    $noProducts = $helper->build(['id_category' => 98, 'name' => 'Lege categorie', 'link_rewrite' => 'lege-categorie']);
    check($noProducts['products'] === [] && $noProducts['related_categories'] === []
        && $noProducts['category']['display_name'] === 'Lege categorie'
        && $noProducts['coverage'] === ['total_products' => 0, 'included_products' => 0, 'truncated' => false], 'An active category without products or connections must return complete empty collections and a fallback name.');
    check($db->queries - $startQueries === 3, 'An empty category needs only category scope, explicit relations and the product count.');

    // Cross-sell categories must be explicit, ordered and separate from assortment products.
    $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'category_lang SET second_name = ? WHERE id_category = 99')->execute(['RVS bouten &amp; moeren']);
    $insert('msthemeconfig_category_relation', [1, 1, 99, 0, ' <strong>Bevestiging</strong> &amp; montage ']);
    $insert('msthemeconfig_category_relation', [1, 1, 16, 1, 'Aanvullend materiaal']);
    foreach ([12, 13, 14, 15, 666, 1, 100] as $target) {
        $insert('msthemeconfig_category_relation', [1, 1, $target, 2, 'Niet opnemen']);
    }
    $insert('msthemeconfig_category_relation', [2, 1, 11, 0, 'Andere winkel']);
    $linked = $helper->build($category);
    check(array_column($linked['related_categories'], 'id') === [99, 16], 'Related targets must exclude self/home, inactive branches, deleted categories and other-shop connections.');
    check($linked['related_categories'][0] === [
        'id' => 99, 'name' => 'Categorie 99', 'second_name' => 'RVS bouten & moeren', 'display_name' => 'RVS bouten & moeren',
        'url' => 'https://shop1.example/category/99-categorie-99?lang=1', 'note' => 'Bevestiging & montage',
    ], 'Related category source must preserve sanitized names, note and the exact same-shop/language category URL.');
    check($linked['related_categories'][1]['second_name'] === '' && $linked['related_categories'][1]['display_name'] === 'Categorie 16', 'A related category without an extended name must select its normal name.');
    foreach ([null, '', " \t\n ", "\u{200B}\u{FEFF}", '<p>&nbsp;<br></p>', '<p>&#8203;&nbsp;</p>'] as $blankSecondName) {
        $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'category_lang SET second_name = ? WHERE id_category = 99')->execute([$blankSecondName]);
        $blankRelated = $helper->build($category);
        check($blankRelated['related_categories'][0]['second_name'] === '' && $blankRelated['related_categories'][0]['display_name'] === 'Categorie 99', 'Related category names must use the same null/empty/whitespace/HTML fallback as products and source categories.');
        check($blankRelated['related_categories'][0]['url'] === $linked['related_categories'][0]['url'], 'Name fallback must preserve the selected category URL.');
    }
    $db->omitSecondNames = true;
    $missingRelated = $helper->build($category);
    $db->omitSecondNames = false;
    check($missingRelated['related_categories'][0]['display_name'] === 'Categorie 99', 'An absent related-category second-name field must fall back safely.');
    check(array_column($linked['products'], 'id') === [101, 102, 108]
        && $linked['coverage']['total_products'] === 3, 'A related category must not add its products or specifications to the current assortment.');
    $reverse = $helper->build(array_replace($category, ['id_category' => 99]));
    check($reverse['related_categories'] === [], 'Category connections must not become automatic reverse connections.');

    for ($id = 200; $id < 303; ++$id) { $addProduct($id); }
    for ($id = 2000; $id < 2045; ++$id) { $addCombination($id, 101, [1, 2]); }
    $startQueries = $db->queries;
    $source = $helper->build($category);
    check($source['coverage']['total_products'] === 106 && $source['coverage']['included_products'] === 100, 'Product selection/count must have an explicit bound without losing the complete total.');
    check($source['coverage']['truncated'] && count($source['warnings']) >= 2, 'Truncated product and variant sources require warnings.');
    check($source['products'][0]['combination_coverage'] === ['total' => 47, 'included' => 40, 'truncated' => true], 'Combination truncation must retain its real total and sampled count.');
    check($db->queries - $startQueries <= 9, 'Increasing products/combinations/connections must not add per-product data queries.');

    // A large catalogue must remain valid structured JSON and advertise every reduced sample.
    foreach ($source['products'] as $product) {
        if ($product['id'] !== 101) {
            for ($n = 0; $n < 40; ++$n) { $addCombination(10000 + $product['id'] * 100 + $n, $product['id'], [1, 2]); }
        }
    }
    $db->pdo->prepare('UPDATE ' . _DB_PREFIX_ . 'product_lang SET description_short = ?, description = ?')->execute([str_repeat('één maat. ', 220), '']);
    $source = $helper->build($category);
    $json = json_encode($source, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    check(mb_strlen($json, 'UTF-8') <= 100000 && json_decode($json, true) !== null, 'The entire source must fit 100000 characters as complete valid JSON.');
    check($source['coverage']['truncated'], 'The whole-source bound must be visible.');
    foreach ($source['products'] as $product) {
        check(mb_strlen($product['description'], 'UTF-8') <= 1500, 'Descriptions must be Unicode-safe and bounded.');
        check(count($product['combinations']) === $product['combination_coverage']['included'], 'Combination coverage must reflect reductions made for the whole-source limit.');
        if ($product['combination_coverage']['included'] < $product['combination_coverage']['total']) {
            check($product['combination_coverage']['truncated'], 'Partial combination samples must be marked.');
        }
    }

    $empty = $helper->build(array_replace($category, ['id_category' => 12]));
    check($empty['products'] === [] && $empty['warnings'] !== [], 'An inactive category must not produce fabricated sources.');
    $db->fail = true;
    try { $helper->build($category); throw new LogicException('A failed SQL query must not be silently treated as an empty category.'); }
    catch (RuntimeException $error) { check(str_contains($error->getMessage(), 'konden niet worden geladen'), 'Database failures must report a safe source-loading error.'); }
    echo "AI category source checks passed: deterministic display-name fallback, optional relations/combinations, shop/language/branch scoping, paired size links, placeholders, batched queries and complete-JSON bounds; no shop database was accessed.\n";
} catch (Throwable $error) {
    fwrite(STDERR, 'AI category source check failed: ' . $error->getMessage() . "\n");
    exit(1);
}
