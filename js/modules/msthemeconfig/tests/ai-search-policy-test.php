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
function rejects(callable $action, string $message): void
{
    try { $action(); } catch (Throwable $error) { return; }
    throw new RuntimeException($message);
}

$directory = sys_get_temp_dir() . '/ai-search-policy-' . bin2hex(random_bytes(6));
mkdir($directory);
try {
    $policy = SearchPolicy::load(__DIR__ . '/../config/ai-search-policy.json');
    check($policy === SearchPolicy::DEFAULTS, 'The documented defaults must match the shipped policy.');
    foreach ([['product_fields' => ['wholesale_price']], ['category_ids' => ['1 OR 1=1']],
        ['max_context_bytes' => -1], ['max_relation_hops' => 20], ['max_products' => '200'],
        ['language' => 'en'], ['aliases' => ['bolt' => 'bout']], ['unknown' => true]] as $invalid) {
        rejects(static fn() => SearchPolicy::validate($invalid), 'Reject invalid or unknown policy settings.');
    }
    $same = SearchPolicy::validate(['category_ids' => [3, 1, 3], 'product_fields' => ['features', 'reference']]);
    $normalized = SearchPolicy::validate(['category_ids' => [1, 3], 'product_fields' => ['reference', 'features']]);
    check(SearchPolicy::sourceFingerprint($same) === SearchPolicy::sourceFingerprint($normalized), 'Equivalent export policies share a fingerprint.');
    check(SearchPolicy::sourceFingerprint($policy) === SearchPolicy::sourceFingerprint(array_replace($policy, ['max_context_products' => 2])), 'Context limits can change without reexport.');

    $snapshot = ['export_policy_hash' => SearchPolicy::sourceFingerprint($policy), 'text' => 'Nederlandse cafétekst'];
    $path = $directory . '/catalog.json';
    CatalogSnapshotFile::write($path, $snapshot, 1024);
    check(CatalogSnapshotFile::read($path, $policy) === $snapshot, 'UTF-8 snapshot round trip.');
    $before = file_get_contents($path);
    rejects(static fn() => CatalogSnapshotFile::write($path, ['oversize' => str_repeat('x', 3000)], 1024), 'Oversized replacement must fail.');
    check(file_get_contents($path) === $before, 'A failed replacement preserves the old snapshot.');
    rejects(static fn() => CatalogSnapshotFile::read($path, array_replace($policy, ['product_fields' => []])), 'A stricter field policy requires reexport.');
    rejects(static fn() => CatalogSnapshotFile::read($path, array_replace($policy, ['excluded_category_ids' => [1]])), 'A stricter category scope requires reexport.');
    rejects(static fn() => CatalogSnapshotFile::read('data://text/plain,' . $before, $policy), 'Preview accepts only local files.');
    file_put_contents($directory . '/invalid.json', '[]');
    rejects(static fn() => SearchPolicy::load($directory . '/invalid.json'), 'Policy root must be an object.');
    check(count(glob($directory . '/.ai-search-*')) === 0, 'Temporary output files are cleaned up.');
    echo "AI search policy/file checks passed.\n";
} finally {
    foreach (glob($directory . '/*') as $file) { unlink($file); }
    rmdir($directory);
}
