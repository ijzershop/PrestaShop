<?php
declare(strict_types=1);

/** php -d allow_url_fopen=0 tests/ai-search-storefront-test.php; no shop bootstrap, database or API key. */
if (PHP_SAPI !== 'cli') { exit(1); }

require_once __DIR__ . '/../src/AI/Search/SearchPolicy.php';
require_once __DIR__ . '/../src/AI/Search/CatalogSnapshotFile.php';
require_once __DIR__ . '/../src/AI/Search/CatalogContextSelector.php';
require_once __DIR__ . '/../src/AI/Search/CatalogSearch.php';

use MsThemeConfig\AI\Search\CatalogSearch;
use MsThemeConfig\AI\Search\CatalogSnapshotFile;
use MsThemeConfig\AI\Search\SearchPolicy;

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

function reject(callable $operation, string $message): void
{
    try { $operation(); } catch (Exception $error) { return; }
    throw new RuntimeException($message);
}

// These stubs deliberately provide no catalogue or provider services.
class Db
{
    public static int $calls = 0;

    public static function getInstance(...$arguments)
    {
        ++self::$calls;
        throw new LogicException('Storefront search must never open the database.');
    }
}

class Tools
{
    public static array $values = [];

    public static function getValue($key, $default = false)
    {
        return self::$values[$key] ?? $default;
    }
}

class Configuration
{
    public static bool $enabled = true;
    public static array $reads = [];

    public static function get(...$arguments)
    {
        self::$reads[] = $arguments;
        return self::$enabled;
    }
}

class ModuleFrontController
{
    public $context;
    public $module;
    public $ajax = false;

    public function initContent() {}
}

define('_PS_VERSION_', '8.2.0');
require_once __DIR__ . '/../controllers/front/ai.php';

class FixtureSearchController extends msthemeconfigAiModuleFrontController
{
    public array $responses = [];
    public int $searchCreations = 0;
    private CatalogSearch $search;

    public function __construct(CatalogSearch $search, int $shopId = 7)
    {
        $this->search = $search;
        $this->context = (object) [
            'language' => (object) ['id' => 3],
            'shop' => (object) ['id' => $shopId, 'id_shop_group' => 2],
        ];
    }

    protected function createCatalogSearch(): CatalogSearch
    {
        ++$this->searchCreations;
        return $this->search;
    }

    protected function sendResponse($data)
    {
        $this->responses[] = ['status' => 200, 'body' => array_merge(['success' => true], $data)];
    }

    protected function sendError($message, $statusCode = 400)
    {
        $this->responses[] = ['status' => $statusCode, 'body' => ['success' => false, 'error' => $message]];
    }
}

function request(CatalogSearch $search, array $values, string $method = 'POST', bool $enabled = true): array
{
    Tools::$values = $values;
    Configuration::$enabled = $enabled;
    Configuration::$reads = [];
    $_SERVER['REQUEST_METHOD'] = $method;
    $controller = new FixtureSearchController($search);
    $controller->initContent();
    check(count($controller->responses) === 1, 'Each request must produce exactly one response.');
    return [$controller->responses[0], $controller];
}

function fixtureCategory(int $id, string $name, array $related = []): array
{
    return ['id' => $id, 'name' => $name, 'second_name' => '', 'display_name' => $name,
        'url' => 'https://shop.example/categorie/' . $id, 'parent_id' => null, 'related_categories' => $related];
}

function fixtureProduct(int $id, string $name, string $reference, int $categoryId, array $related = []): array
{
    return ['id' => $id, 'name' => $name, 'second_name' => '', 'display_name' => $name,
        'url' => 'https://shop.example/product/' . $id, 'reference' => $reference,
        'category_ids' => [$categoryId], 'default_category_id' => $categoryId,
        'description' => '', 'features' => [], 'combinations' => [], 'related_product_ids' => $related];
}

function dutchAnswer(array $result): void
{
    check(($result['response_language'] ?? null) === 'nl', 'The response language must always be Dutch.');
    check(is_string($result['answer'] ?? null) && preg_match('/\b(gevonden|zoekopdracht|catalogus|categorie|producten|product)\b/u', $result['answer']) === 1,
        'The visible answer must contain Dutch search guidance.');
    check(!str_contains($result['answer'], 'I found some products'), 'The old English demonstration answer must not return.');
}

function errorResponse(array $response, int $status): void
{
    check($response['status'] === $status && $response['body']['success'] === false, 'Unexpected error status: ' . json_encode($response));
    check(is_string($response['body']['error']) && $response['body']['error'] !== '', 'An error needs a customer-facing message.');
    check(!preg_match('/Empty query|Unknown action|Stack trace|SQLSTATE/', $response['body']['error']), 'Errors must be Dutch and sanitized.');
}

function runPublishValidation(string $directory, array $arguments): array
{
    $script = dirname(__DIR__, 3) . '/scripts/ai-search-catalog.php';
    $process = proc_open(array_merge([PHP_BINARY, '-d', 'allow_url_fopen=0', $script, 'publish', '--shop-root=' . $directory], $arguments),
        [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, $directory);
    if (!is_resource($process)) { throw new RuntimeException('Unable to start publish validation.'); }
    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    return [proc_close($process), $stdout, $stderr];
}

$directory = sys_get_temp_dir() . '/ai-search-storefront-' . bin2hex(random_bytes(6));
mkdir($directory);
try {
    $policy = SearchPolicy::validate(['aliases' => ['hinges' => ['scharnier']]]);
    $policyPath = $directory . '/policy.json';
    file_put_contents($policyPath, json_encode($policy, JSON_THROW_ON_ERROR));
    $snapshotPath = CatalogSearch::snapshotPath($directory, 7);
    check(str_replace('\\', '/', $snapshotPath) === str_replace('\\', '/', $directory) . '/catalog-shop-7-nl.json',
        'The snapshot filename must be scoped to the requested shop and Dutch language.');
    $snapshot = [
        'schema_version' => 1, 'shop_id' => 7, 'language_id' => 1, 'language' => 'nl',
        'generated_at' => gmdate('c'), 'export_policy_hash' => SearchPolicy::sourceFingerprint($policy),
        'categories' => [
            fixtureCategory(1, 'Kokers', [['id' => 2, 'note' => 'Bijbehorende productgroep', 'position' => 0]]),
            fixtureCategory(2, 'Buisverbindingen'), fixtureCategory(3, 'Scharnieren'), fixtureCategory(4, 'Plasmasnijden'),
        ],
        'products' => [
            fixtureProduct(10, 'Koker 20x20 staal', 'KOK-20', 1, [11]),
            fixtureProduct(11, 'Verbindingsstuk vierkant', 'VERB-20', 2),
            fixtureProduct(12, 'Scharnier zwaar', 'SCH-80', 3),
        ],
        'coverage' => ['total_products' => 3, 'included_products' => 3, 'truncated' => false],
    ];
    CatalogSnapshotFile::write($snapshotPath, $snapshot, $policy['max_snapshot_bytes']);
    $search = new CatalogSearch($policyPath, $directory);

    $tube = $search->search(7, 'koker');
    dutchAnswer($tube);
    check(($tube['products'][0]['id'] ?? null) === 10 && $tube['products'][0]['name'] === 'Koker 20x20 staal',
        'The reported koker query must return the real snapshot product.');
    check(in_array(11, array_column($tube['products'], 'id'), true), 'Existing accessory relationships must contribute to results.');
    $hinge = $search->search(7, 'scharnier');
    check(array_column($hinge['products'], 'id') === [12], 'Changing the query must change the returned products.');
    $english = $search->search(7, 'Please show me hinges');
    dutchAnswer($english);
    check(array_column($english['products'], 'id') === [12], 'A curated English alias must still return Dutch catalogue results.');
    $categoryOnly = $search->search(7, 'plasmasnijden');
    dutchAnswer($categoryOnly);
    check($categoryOnly['products'] === [] && array_column($categoryOnly['categories'], 'id') === [4],
        'An empty product group must still appear as a real category result.');
    foreach ([$tube, $hinge, $english, $categoryOnly] as $result) {
        check(!array_key_exists('success', $result), 'The controller owns the success envelope.');
        check(!array_intersect_key($result, array_flip(['instructions', 'source', 'query'])), 'Internal model context must not be exposed to visitors.');
        foreach (['products', 'categories'] as $kind) {
            foreach ($result[$kind] as $item) {
                check(isset($item['id'], $item['name'], $item['link']) && str_starts_with($item['link'], 'https://shop.example/'),
                    'Result records require real names, IDs and catalogue links.');
                check(!isset($item['price']), 'A snapshot without prices must never receive fabricated prices.');
                check(!array_diff(array_keys($item), ['id', 'name', 'link']), 'The storefront record projection must remain public and minimal.');
            }
        }
        check(!str_contains(json_encode($result), 'Steel Tube') && !str_contains(json_encode($result), 'Bolt M8'),
            'Demonstration products must never leak into real results.');
    }
    $empty = $search->search(7, 'onvindbaarxyz');
    dutchAnswer($empty);
    check($empty['products'] === [] && $empty['categories'] === [], 'No match must not be padded with unrelated products.');
    check(preg_match('/geen|niet|Welk product/u', $empty['answer']) === 1, 'No match needs a Dutch explanation or clarification.');

    [$response, $controller] = request($search, ['action' => 'contextualSearch', 'query' => 'koker']);
    check($response['status'] === 200 && $response['body']['success'] === true, 'The storefront action must succeed with a valid snapshot.');
    check($response['body']['products'] === $tube['products'], 'The controller must return the parser results.');
    dutchAnswer($response['body']);
    check(Configuration::$reads === [['MSTHEMECONFIG_AI_FRONTEND_ENABLED', 3, 2, 7, 0]],
        'The feature flag must use the active language, shop group and shop, defaulting to disabled.');
    check($controller->searchCreations === 1, 'A permitted request creates its catalogue search service once.');

    [$response, $controller] = request($search, ['action' => 'contextualSearch', 'query' => 'koker'], 'POST', false);
    errorResponse($response, 403);
    check($controller->searchCreations === 0, 'A disabled feature must not read a catalogue snapshot.');
    [$response, $controller] = request($search, ['action' => 'contextualSearch', 'query' => 'koker'], 'GET');
    errorResponse($response, 405);
    check($controller->searchCreations === 0, 'Non-POST requests must be rejected before catalogue loading.');
    foreach (['', '   ', ['koker'], str_repeat('x', 501), "\xC3\x28", "koker\0"] as $invalidQuery) {
        [$response] = request($search, ['action' => 'contextualSearch', 'query' => $invalidQuery]);
        errorResponse($response, 400);
    }
    [$response] = request($search, ['action' => 'unknown']);
    errorResponse($response, 400);

    foreach ([['shop_id' => 8], ['shop_id' => '7'], ['language' => 'en'], ['schema_version' => 2],
        ['generated_at' => gmdate('c', time() - 49 * 3600)], ['export_policy_hash' => str_repeat('0', 64)]] as $invalid) {
        CatalogSnapshotFile::write($snapshotPath, array_replace($snapshot, $invalid), $policy['max_snapshot_bytes']);
        reject(fn() => $search->search(7, 'koker'), 'Wrong-shop, invalid or stale snapshots must fail closed.');
        [$response] = request($search, ['action' => 'contextualSearch', 'query' => 'koker']);
        errorResponse($response, 503);
        check(!str_contains($response['body']['error'], $directory)
            && !str_contains($response['body']['error'], 'export_policy_hash')
            && !str_contains($response['body']['error'], 'exportbeleid'), 'Snapshot failures must hide internal details.');
    }
    file_put_contents($snapshotPath, '{not valid JSON');
    reject(fn() => $search->search(7, 'koker'), 'Malformed snapshot JSON must be rejected.');
    [$response] = request($search, ['action' => 'contextualSearch', 'query' => 'koker']);
    errorResponse($response, 503);
    check(!str_contains($response['body']['error'], 'Syntax error'), 'JSON parse failures must not become customer-facing errors.');
    unlink($snapshotPath);
    reject(fn() => $search->search(7, 'koker'), 'A missing snapshot must fail without a live database export.');
    [$response] = request($search, ['action' => 'contextualSearch', 'query' => 'koker']);
    errorResponse($response, 503);

    CatalogSnapshotFile::write($snapshotPath, $snapshot, $policy['max_snapshot_bytes']);
    file_put_contents($policyPath, json_encode(array_replace($policy, ['excluded_category_ids' => [1]]), JSON_THROW_ON_ERROR));
    $changedPolicySearch = new CatalogSearch($policyPath, $directory);
    reject(fn() => $changedPolicySearch->search(7, 'koker'), 'A stricter source policy must refuse the old snapshot.');
    [$response] = request($changedPolicySearch, ['action' => 'contextualSearch', 'query' => 'koker']);
    errorResponse($response, 503);

    [$dimensions] = request($search, ['action' => 'parseDimensions', 'text' => '10 cm x 25 mm']);
    check($dimensions['body']['success'] === true && $dimensions['body']['width'] == 100 && $dimensions['body']['height'] == 25,
        'Connecting catalogue search must preserve the existing dimension parser.');
    check(Db::$calls === 0, 'No tested storefront success or failure path may perform a database lookup.');

    foreach ([[], ['--shop=0'], ['--shop=2147483648'], ['--shop=7', '--config=' . $policyPath],
        ['--shop=7', '--output=' . $directory . '/override.json']] as $arguments) {
        [$status, $stdout, $stderr] = runPublishValidation($directory, $arguments);
        check($status === 1 && $stdout === '' && !str_contains($stderr, 'installatiemap'),
            'Invalid publish arguments and source/output overrides must fail before shop bootstrap: ' . $stderr);
    }
    check(!file_exists($directory . '/override.json'), 'Rejected publish arguments must not create output.');
    echo "OK: Dutch storefront catalogue results, query changes, feature and request guards, isolated snapshots and sanitized failures.\n";
} finally {
    foreach (glob($directory . '/*') as $file) { unlink($file); }
    rmdir($directory);
}
