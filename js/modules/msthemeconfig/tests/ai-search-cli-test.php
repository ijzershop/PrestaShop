<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { exit(1); }

require_once __DIR__ . '/../src/AI/Search/SearchPolicy.php';
require_once __DIR__ . '/../src/AI/Search/CatalogSnapshotFile.php';

use MsThemeConfig\AI\Search\SearchPolicy;
use MsThemeConfig\AI\Search\CatalogSnapshotFile;

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}
function runCli(string $directory, array $arguments): array
{
    $script = dirname(__DIR__, 3) . '/scripts/ai-search-catalog.php';
    $process = proc_open(array_merge([PHP_BINARY, '-d', 'allow_url_fopen=0', $script], $arguments),
        [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, $directory);
    if (!is_resource($process)) { throw new RuntimeException('Unable to start CLI fixture.'); }
    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]); fclose($pipes[2]);
    return [proc_close($process), $stdout, $stderr];
}

$directory = sys_get_temp_dir() . '/ai-search-cli-' . bin2hex(random_bytes(6));
mkdir($directory);
try {
    $policy = SearchPolicy::validate([]);
    $snapshot = [
        'schema_version' => 1, 'shop_id' => 1, 'language_id' => 1, 'language' => 'nl',
        'generated_at' => gmdate('c'), 'export_policy_hash' => SearchPolicy::sourceFingerprint($policy),
        'categories' => [['id' => 2, 'name' => 'Bouten', 'second_name' => '', 'display_name' => 'Bouten',
            'url' => 'https://shop.example/bouten', 'parent_id' => 0, 'related_categories' => []]],
        'products' => [['id' => 10, 'name' => 'RVS bout M8', 'second_name' => '', 'display_name' => 'RVS bout M8',
            'url' => 'https://shop.example/rvs-bout', 'category_ids' => [2], 'default_category_id' => 2,
            'reference' => 'BOUT-M8', 'features' => [], 'combinations' => [], 'related_product_ids' => []]],
        'coverage' => ['truncated' => false],
    ];
    $path = $directory . '/catalog.json';
    CatalogSnapshotFile::write($path, $snapshot, $policy['max_snapshot_bytes']);
    [$status, $output, $error] = runCli($directory, ['preview', '--snapshot=' . $path, '--query=BOUT-M8']);
    check($status === 0, 'Offline preview succeeds outside the shop working directory: ' . $error);
    $context = json_decode($output, true, 64, JSON_THROW_ON_ERROR);
    check($context['response_language'] === 'nl', 'CLI always returns Dutch response policy.');
    check(in_array(10, array_column($context['products'], 'id'), true), 'CLI finds a real fixture product.');
    check(strlen($output) <= $policy['max_context_bytes'], 'Exact stdout respects the JSON byte cap.');
    $contextPath = $directory . '/context.json';
    [$status, $output, $error] = runCli($directory, ['preview', '--snapshot=' . $path, '--query=BOUT-M8', '--output=' . $contextPath]);
    check($status === 0 && $output === '' && is_file($contextPath), 'Preview can write a separate exact payload: ' . $error);
    $before = file_get_contents($path);
    [$status] = runCli($directory, ['preview', '--snapshot=' . $path, '--query=BOUT-M8', '--output=' . $path]);
    check($status === 1 && file_get_contents($path) === $before, 'Preview refuses to overwrite its own source.');
    foreach ([['export', '--shop=0', '--output=' . $contextPath], ['export', '--shop=1'],
        ['preview', '--snapshot=' . $path, '--query=BOUT-M8', '--language=en'],
        ['preview', '--snapshot=' . $path, '--query=BOUT-M8', '--query=other']] as $arguments) {
        [$status] = runCli($directory, $arguments);
        check($status === 1, 'Invalid arguments fail before bootstrap.');
    }
    file_put_contents($directory . '/policy.json', json_encode(['product_fields' => []], JSON_THROW_ON_ERROR));
    [$status, $output, $error] = runCli($directory, ['preview', '--snapshot=' . $path, '--query=BOUT-M8', '--config=' . $directory . '/policy.json']);
    check($status === 1 && str_contains($error, 'exportbeleid'), 'Scope changes cannot reuse a broader snapshot.');
    echo "AI search offline CLI checks passed.\n";
} finally {
    foreach (glob($directory . '/*') as $file) { unlink($file); }
    rmdir($directory);
}
