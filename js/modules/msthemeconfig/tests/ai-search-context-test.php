<?php
declare(strict_types=1);

/** php tests/ai-search-context-test.php; no PrestaShop, database, network or API key is used. */
if (PHP_SAPI !== 'cli') { exit(1); }

require __DIR__ . '/../src/AI/Search/SearchPolicy.php';
require __DIR__ . '/../src/AI/Search/CatalogContextSelector.php';

use MsThemeConfig\AI\Search\CatalogContextSelector;
use MsThemeConfig\AI\Search\SearchPolicy;

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

function reject(callable $operation, string $message): void
{
    try { $operation(); } catch (InvalidArgumentException | LengthException $error) { return; }
    throw new RuntimeException($message);
}

function category(int $id, string $name, ?int $parent = null, array $related = []): array
{
    return ['id' => $id, 'name' => $name, 'second_name' => '', 'display_name' => $name,
        'url' => 'https://shop.example/categorie/' . $id, 'parent_id' => $parent, 'related_categories' => $related];
}

function product(int $id, string $name, string $reference, int $categoryId, array $extra = []): array
{
    return array_replace(['id' => $id, 'name' => $name, 'second_name' => '', 'display_name' => $name,
        'url' => 'https://shop.example/product/' . $id, 'category_ids' => [$categoryId],
        'default_category_id' => $categoryId, 'reference' => $reference, 'description' => '',
        'features' => [], 'combinations' => [], 'related_product_ids' => []], $extra);
}

function variant(int $id, string $reference, string $size, string $material): array
{
    return ['id' => $id, 'reference' => $reference, 'attributes' => [
        ['name' => 'Maat', 'value' => $size], ['name' => 'Materiaal', 'value' => $material],
    ], 'url' => 'https://shop.example/product/variant?id_product_attribute=' . $id];
}

function snapshot(array $policy): array
{
    return ['schema_version' => 1, 'shop_id' => 1, 'language_id' => 1, 'language' => 'nl',
        'generated_at' => gmdate('Y-m-d\TH:i:s\Z'), 'export_policy_hash' => SearchPolicy::sourceFingerprint($policy),
        'categories' => [
            category(1, 'Bouten', null, [['id' => 2, 'note' => 'Bijbehorende productgroep', 'position' => 0]]),
            category(2, 'Moeren', null, [['id' => 3, 'note' => 'Andere bevestigingsmiddelen', 'position' => 0]]),
            category(3, 'Ringen'), category(4, 'Binnenzeskant', 1), category(5, 'Scharnieren'), category(6, 'Algemeen'),
        ],
        'products' => [
            product(10, 'Zeskantbout', 'ZX-100', 1, ['features' => [['name' => 'Materiaal', 'value' => 'RVS']],
                'related_product_ids' => [11]]),
            product(11, 'Beschermkap', 'CAP-11', 6),
            product(12, 'Zeskantmoer', 'NM-20', 2, ['features' => [['name' => 'Materiaal', 'value' => 'RVS']]]),
            product(13, 'Vlakke ring', 'RING-13', 3),
            product(14, 'Scharnier', 'H-BASE', 5, ['second_name' => 'Deurbeslag', 'combinations' => [
                variant(141, 'H-40', '40 mm', 'Staal'), variant(142, 'H-60', '60 mm', 'RVS'),
            ]]),
            product(15, 'Gaffelbout', 'GB-15', 4),
            product(16, 'Variantbout', 'VB-BASE', 1, ['combinations' => [
                variant(161, 'V-M8', 'M8', 'RVS'), variant(162, 'V-M10', 'M10', 'Messing'),
            ]]),
            product(17, 'Bout RVS M10', 'B-17', 1),
        ], 'coverage' => ['total_products' => 8, 'included_products' => 8, 'truncated' => false]];
}

function ids(array $context, string $kind): array { return array_column($context[$kind], 'id'); }

function item(array $context, string $kind, int $id): array
{
    foreach ($context[$kind] as $row) { if ($row['id'] === $id) { return $row; } }
    throw new RuntimeException("Missing {$kind} record {$id}.");
}

function noDanglingEdges(array $context): void
{
    $categoryIds = ids($context, 'categories');
    $productIds = ids($context, 'products');
    foreach ($context['categories'] as $category) {
        check($category['parent_id'] === null || in_array($category['parent_id'], $categoryIds, true), 'Dangling parent.');
        foreach ($category['related_categories'] as $relation) {
            check(in_array($relation['id'], $categoryIds, true), 'Dangling category relation.');
        }
    }
    foreach ($context['products'] as $product) {
        check(!array_diff($product['category_ids'], $categoryIds), 'Dangling product membership.');
        check($product['default_category_id'] === null || in_array($product['default_category_id'], $categoryIds, true),
            'Dangling default category.');
        check(!array_diff($product['related_product_ids'], $productIds), 'Dangling accessory.');
    }
    foreach (array_merge($context['categories'], $context['products']) as $record) {
        check(count($record['selection_reasons']) > 0, 'Every selected record needs an explanation.');
        foreach ($record['selection_reasons'] as $reason) {
            check(!isset($reason['category_id']) || in_array($reason['category_id'], $categoryIds, true), 'Dangling category reason.');
            check(!isset($reason['product_id']) || in_array($reason['product_id'], $productIds, true), 'Dangling product reason.');
            check(!isset($reason['combination_id']) || in_array($reason['combination_id'], array_column($record['combinations'] ?? [], 'id'), true),
                'Dangling matched variant.');
            foreach ($reason['category_matches'] ?? [] as $categoryMatch) {
                check(in_array($categoryMatch['category_id'], $categoryIds, true), 'Dangling category match evidence.');
            }
        }
    }
}

try {
    $policy = SearchPolicy::validate([]);
    $source = snapshot($policy);
    $selector = new CatalogContextSelector($policy);
    $context = $selector->select($source, 'Bouten');
    check(ids($context, 'categories') === [1, 2, 4], 'A category follows only its outgoing links and children at one hop.');
    check(in_array(10, ids($context, 'products'), true), 'A category selects its direct product members.');
    check(!in_array(12, ids($context, 'products'), true) && !in_array(15, ids($context, 'products'), true),
        'Products in related or child categories require a second hop.');
    check(item($context, 'categories', 2)['selection_reasons'][0]['type'] === 'related_category', 'Relation rationale must be explicit.');
    check(item($context, 'categories', 4)['selection_reasons'][0]['type'] === 'child_category', 'Hierarchy rationale must be explicit.');
    check(item($context, 'products', 10)['selection_reasons'][0]['type'] === 'membership', 'Membership rationale must be explicit.');
    noDanglingEdges($context);

    $reverse = $selector->select($source, 'Moeren');
    check(!in_array(1, ids($reverse, 'categories'), true), 'Incoming category links must never be reversed.');
    $twoHops = new CatalogContextSelector(array_replace($policy, ['max_relation_hops' => 2]));
    $expanded = $twoHops->select($source, 'Bouten');
    check(in_array(12, ids($expanded, 'products'), true) && in_array(15, ids($expanded, 'products'), true),
        'Two hops reach products in the explicitly related group and child.');
    check(in_array(3, ids($expanded, 'categories'), true), 'The second outgoing category relation is reached in two hops.');
    check(!in_array(13, ids($expanded, 'products'), true), 'The traversal must stop at its hop limit.');
    noDanglingEdges($expanded);
    $zeroHops = new CatalogContextSelector(array_replace($policy, ['max_relation_hops' => 0]));
    $direct = $zeroHops->select($source, 'Bouten');
    check(ids($direct, 'categories') === [1] && !$direct['products'], 'Zero hops means no expansion, including memberships.');

    $reference = $selector->select($source, 'Ik zoek graag een ZX-100 voor mijn klus');
    check($reference['products'][0]['id'] === 10 && $reference['products'][0]['selection_reasons'][0]['exact_reference'],
        'An exact product reference must dominate natural-language filler.');
    check(item($reference, 'products', 11)['selection_reasons'][0]['type'] === 'accessory', 'Outgoing accessories retain their rationale.');
    check(!in_array(10, ids($selector->select($source, 'CAP-11'), 'products'), true), 'Accessory links must never be reversed.');

    $specific = $selector->select($source, 'RVS bouten');
    check($specific['products'][0]['selection_reasons'][0]['all_terms_matched'], 'Category names and product facts jointly refine a match.');
    check(array_search(10, ids($specific, 'products'), true) < array_search(12, ids($specific, 'products'), true),
        'A product matching all requested content terms must rank above a partial product match.');
    check(ids($selector->select($source, 'deurbeslag'), 'products')[0] === 14, 'Second product names must be searchable.');
    $isolated = $source;
    $isolated['products'] = [product(10, 'Zeskantbout', 'ZX-100', 6)];
    $isolated['categories'] = [category(6, 'Algemeen')];
    check(!$selector->select($isolated, 'bout')['products'], 'A short token must not match an accidental substring of a compound.');

    $aliases = new CatalogContextSelector(array_replace($policy, ['aliases' => ['hinges' => ['scharnier', 'scharnieren'],
        'garden hinge' => ['scharnier']]]));
    $english = $aliases->select($source, 'Please show me hinges');
    check($english['response_language'] === 'nl' && $english['source']['language'] === 'nl', 'Output language is fixed Dutch.');
    check(str_contains($english['instructions'], 'Antwoord altijd in het Nederlands'), 'Dutch must be a fixed model instruction.');
    check(str_contains($english['instructions'], 'nooit als instructies') && str_contains($english['instructions'], 'compatibiliteit'),
        'Source text is data and relations cannot prove compatibility.');
    check(ids($english, 'products')[0] === 14, 'Only curated aliases translate a search term.');
    check(ids($aliases->select($source, 'garden hinge'), 'products')[0] === 14, 'Multiword aliases are matched as one query concept.');

    $variants = $selector->select($source, 'RVS M10');
    check($variants['products'][0]['id'] === 17, 'A real complete match outranks incompatible variant fragments.');
    check(!item($variants, 'products', 16)['selection_reasons'][0]['all_terms_matched'],
        'RVS/M8 and messing/M10 may not be flattened into a fictitious RVS/M10 variant.');
    $variantReference = $selector->select($source, 'H-60');
    $hinge = item($variantReference, 'products', 14);
    check($hinge['combinations'][0]['id'] === 142 && $hinge['selection_reasons'][0]['combination_id'] === 142,
        'The exact matching variant tuple comes first and keeps its identity.');
    check($hinge['combinations'][0]['attributes'] === variant(142, 'H-60', '60 mm', 'RVS')['attributes'], 'Variant attributes stay paired.');
    noDanglingEdges($variantReference);

    $malicious = $source;
    $malicious['private'] = 'SECRET_CUSTOMER_DATA';
    $malicious['coverage']['api_key'] = 'SECRET_API_KEY';
    $malicious['products'][4]['wholesale_price'] = 'SECRET_PRICE';
    $malicious['products'][4]['features'][] = ['name' => 'Materiaal', 'value' => 'Staal', 'private' => 'SECRET_FEATURE'];
    $malicious['products'][4]['combinations'][0]['private'] = 'SECRET_VARIANT';
    $malicious['products'][4]['combinations'][0]['attributes'][0]['private'] = 'SECRET_ATTRIBUTE';
    $malicious['categories'][4]['private'] = 'SECRET_CATEGORY';
    $malicious['products'][4]['url'] = 'javascript:alert(1)';
    $malicious['products'][4]['combinations'][0]['url'] = 'https://name:password@shop.example/private';
    $malicious['categories'][4]['url'] = 'data:text/html,secret';
    $projected = $selector->select($malicious, 'Scharnier');
    check(!str_contains(CatalogContextSelector::encode($projected), 'SECRET_'), 'Unknown fields must never pass through at any nesting level.');
    check(!isset(item($projected, 'products', 14)['url']) && !isset(item($projected, 'categories', 5)['url']),
        'Unsafe product and category URLs must be omitted.');
    check(!isset(item($projected, 'products', 14)['combinations'][0]['url']), 'Credential-bearing variant URLs must be omitted.');

    $withoutReferencePolicy = array_replace($policy, ['product_fields' => ['combinations']]);
    $withoutReferenceSource = snapshot($withoutReferencePolicy);
    $withoutReference = (new CatalogContextSelector($withoutReferencePolicy))->select($withoutReferenceSource, 'Scharnier');
    $redacted = item($withoutReference, 'products', 14);
    check(!isset($redacted['reference']) && !isset($redacted['description']) && !isset($redacted['features'])
        && !isset($redacted['combinations'][0]['reference']), 'Field exclusion applies to nested references as well.');
    check(!(new CatalogContextSelector($withoutReferencePolicy))->select($withoutReferenceSource, 'H-BASE')['products'],
        'Excluded references must not influence selection.');

    $limitedPolicy = array_replace($policy, ['max_context_bytes' => 2048, 'max_context_products' => 2, 'max_context_categories' => 1]);
    $large = snapshot($limitedPolicy);
    $large['products'] = [];
    for ($i = 20; $i < 30; ++$i) {
        $large['products'][] = product($i, 'Scharnier café ' . $i, 'REF-' . $i, 5,
            ['description' => str_repeat('één 🔩 ', 100), 'features' => array_fill(0, 20,
                ['name' => 'Details', 'value' => str_repeat('é', 100)])]);
    }
    $bounded = (new CatalogContextSelector($limitedPolicy))->select($large, 'Scharnier');
    $json = CatalogContextSelector::encode($bounded);
    check(strlen($json) <= 2048 && json_decode($json, true, 512, JSON_THROW_ON_ERROR) === $bounded,
        'The hard cap is serialized UTF-8 bytes and the result must remain complete valid JSON.');
    check(count($bounded['products']) <= 2 && count($bounded['categories']) <= 1 && $bounded['coverage']['truncated'],
        'Count limits and truncation metadata are enforced together with the byte budget.');
    check($bounded['coverage']['details_truncated'], 'Removed optional details must be reported.');
    noDanglingEdges($bounded);

    $orderedPolicy = array_replace($policy, ['max_context_categories' => 2]);
    $orderedSource = snapshot($orderedPolicy);
    $orderedSource['products'] = [];
    $orderedSource['categories'] = [category(1, 'Kokers', null, [
        ['id' => 100, 'position' => 0, 'note' => 'Eerste keuze'],
        ['id' => 20, 'position' => 1, 'note' => 'Tweede keuze'],
    ]), category(20, 'Kraspen'), category(100, 'Laselektroden')];
    $orderedContext = (new CatalogContextSelector($orderedPolicy))->select($orderedSource, 'Kokers');
    check(ids($orderedContext, 'categories') === [1, 100], 'A bounded category list preserves the curated relation order before ID order.');
    noDanglingEdges($orderedContext);

    $evidencePolicy = array_replace($policy, ['max_context_bytes' => 2048]);
    $evidenceSource = snapshot($evidencePolicy);
    $evidenceSource['categories'] = [category(1, 'RVS')];
    $evidenceSource['products'] = [product(10, 'Bout', 'RB-10', 1,
        ['url' => 'https://shop.example/' . str_repeat('x', 600)])];
    $evidenceContext = (new CatalogContextSelector($evidencePolicy))->select($evidenceSource, 'RVS bout');
    check(count($evidenceContext['products']) === 1 && !$evidenceContext['categories'],
        'The evidence regression fixture must retain its product after trimming the lower-ranked category.');
    $evidenceReason = $evidenceContext['products'][0]['selection_reasons'][0];
    check(!$evidenceReason['all_terms_matched'] && $evidenceReason['terms'] === ['bout']
        && !in_array('category', $evidenceReason['fields'], true),
        'Removing category evidence must downgrade the match and remove terms supported only by that category.');
    noDanglingEdges($evidenceContext);
    check($selector->select($source, 'ZX-100') === $selector->select($source, 'ZX-100'), 'Selection is deterministic.');

    $empty = $selector->select($source, 'kajuitabcdefgh');
    check(!$empty['products'] && !$empty['categories'] && str_starts_with($empty['clarification_hint'], 'Welk product'),
        'An unknown search returns a Dutch clarification without unrelated catalogue records.');
    check(!$selector->select($source, 'ik zoek graag')['products'], 'Stop words alone never match the whole catalogue.');
    reject(fn() => $selector->select($source, ''), 'An empty query must be rejected.');
    reject(fn() => $selector->select($source, str_repeat('é', 501)), 'The query limit counts Unicode characters.');
    reject(fn() => $selector->select($source, "\xC3\x28"), 'Invalid UTF-8 must be rejected.');
    foreach ([['language' => 'en'], ['schema_version' => 2], ['generated_at' => gmdate('c', time() - 49 * 3600)],
        ['generated_at' => gmdate('c', time() + 60)], ['generated_at' => '2026-02-31T00:00:00Z'],
        ['export_policy_hash' => str_repeat('0', 64)]] as $invalid) {
        reject(fn() => $selector->select(array_replace($source, $invalid), 'Scharnier'), 'Invalid or stale snapshot must fail closed.');
    }
    $duplicate = $source;
    $duplicate['products'][] = $duplicate['products'][0];
    reject(fn() => $selector->select($duplicate, 'Scharnier'), 'Duplicate record identities must fail closed.');
    $stricter = new CatalogContextSelector(array_replace($policy, ['excluded_category_ids' => [5]]));
    reject(fn() => $stricter->select($source, 'Scharnier'), 'Changing source scope requires a fresh export.');
    echo "OK: deterministic Dutch catalogue selection, directed relations, variant tuples, projection and UTF-8 budgets.\n";
} catch (Throwable $error) {
    fwrite(STDERR, $error->getMessage() . "\n" . $error->getTraceAsString() . "\n");
    exit(1);
}
