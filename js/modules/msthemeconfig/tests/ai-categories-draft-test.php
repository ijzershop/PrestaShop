<?php
declare(strict_types=1);

/** php module/msthemeconfig/tests/ai-categories-draft-test.php; no database or HTTP requests. */
if (PHP_SAPI !== 'cli') { exit(1); }
require __DIR__ . '/../src/AI/CategoryDraftValidator.php';
use MsThemeConfig\AI\CategoryDraftValidator as Validator;

function check(bool $condition, string $message): void {
    if (!$condition) { throw new RuntimeException($message); }
}
function rejected(array $draft, array $source, string $message, bool $jsonld = true, ?int $limit = null): void {
    check(Validator::validate($draft, $source, $jsonld, $limit) !== [], $message);
}
function html(string $text): string { return htmlspecialchars($text, ENT_QUOTES | ENT_HTML5, 'UTF-8'); }

$source = ['category' => ['name' => 'Staal & ijzer'], 'products' => [
    ['url' => 'https://shop.local/product?size=10&color=zwart', 'combinations' => [
        ['url' => 'https://shop.local/product?size=10&color=zwart#/maat-20'],
    ]],
]];
$faq = [];
$description = '<h1>Staal &amp; ijzer</h1><p>Bekijk <a href="' . html($source['products'][0]['url']) . '">staal 10 mm</a> en '
    . '<a href="' . html($source['products'][0]['combinations'][0]['url']) . '">staal 20 mm</a>.</p>';
for ($index = 1; $index <= 5; $index++) {
    $question = 'Wat biedt Staal & ijzer bij vraag ' . $index . '?';
    $answer = 'Antwoord ' . $index . ': kwaliteit & maatwerk in Leeuwarden.';
    $description .= '<p><strong>Q:</strong> ' . html($question) . '</p><p><strong>A:</strong> ' . html($answer) . '</p>';
    $faq[] = ['@type' => 'Question', 'name' => $question, 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $answer]];
}
$schema = ['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $faq];
$draft = ['description' => $description, 'seo_jsonld' => json_encode($schema, JSON_THROW_ON_ERROR)];
check(Validator::validate($draft, $source, true, 1500) === [], 'Valid source links, entities and matching FAQ were rejected.');
check(Validator::visibleText('<h1>Één &amp; twee</h1><p>drie&nbsp; vier<br>vijf</p>') === 'Één & twee drie vier vijf', 'Visible text boundaries/entities are incorrect.');
check(Validator::visibleText('<p>a<strong>b</strong>c</p><p>d</p>') === 'abc d', 'Inline tags must not introduce spaces.');
check(Validator::visibleText('<p>zichtbaar</p><script>verborgen</script><!-- verborgen -->') === 'zichtbaar', 'Non-visible code/comments were counted.');

$variant = $draft;
$variant['seo_jsonld'] = json_decode($draft['seo_jsonld']);
check(Validator::validate($variant, $source, true) === [], 'JSON-LD objects must be accepted.');
$variant['seo_jsonld'] = $schema;
check(Validator::validate($variant, $source, true) === [], 'Decoded JSON-LD arrays must be accepted.');
$variant['description'] = str_replace('<h1>Staal &amp; ijzer</h1>', '<h1>Stalen producten</h1>', $description);
check(Validator::validate($variant, $source, true) === [], 'A reasonable productgroup title synonym must not require exact category equality.');
$variant = ['description' => $description];
check(Validator::validate($variant, $source, false) === [], 'Unrequested JSON-LD must not be required.');

$variant = $draft;
$variant['description'] = str_replace('https://shop.local/product', 'https://invented.local/product', $description);
rejected($variant, $source, 'Invented product URLs were accepted.');
$variant['description'] = str_replace('&amp;color=zwart', '&amp;amp;color=zwart', $description);
rejected($variant, $source, 'Double-escaped URLs must not receive a second entity decode.');
$moreProducts = $source;
$moreProducts['products'][] = ['url' => 'https://shop.local/second-product'];
$moreProducts['products'][] = ['url' => 'https://shop.local/third-product'];
check(Validator::validate($draft, $moreProducts, true) === [], 'A single linked product must pass when three products are supplied.');
$variant = $draft;
$variant['description'] .= '<p><a href="https://shop.local/second-product">Tweede maat</a> <a href="https://shop.local/third-product">Derde maat</a></p>';
check(Validator::validate($variant, $moreProducts, true) === [], 'Three linked product choices should pass.');

$relatedSource = $moreProducts;
$relatedSource['related_categories'] = [
    ['id' => 20, 'name' => 'Bouten', 'second_name' => 'RVS bouten',
        'url' => 'https://shop.local/rvs-bouten?shop=2&lang=nl#assortiment', 'note' => 'Bevestigingsmateriaal bij boutverbindingen.'],
    ['id' => 21, 'name' => 'RVS moeren', 'second_name' => '',
        'url' => 'https://shop.local/rvs-moeren', 'note' => ''],
];
$crossSellHtml = '<p><strong>Wat heb je verder nodig?</strong></p><p>Ook bevestigingsmateriaal nodig? Bekijk '
    . '<a href="' . html($relatedSource['related_categories'][0]['url']) . '">RVS bouten</a> en '
    . '<a href="' . html($relatedSource['related_categories'][1]['url']) . '">RVS moeren</a>.</p>';
$relatedDraft = $variant;
$relatedDraft['description'] .= $crossSellHtml;
check(Validator::validate($relatedDraft, $relatedSource, true) === [],
    'Supplied category URLs with correctly escaped queries/fragments must pass alongside product links and matching FAQ JSON-LD.');
check(Validator::validate($variant, $relatedSource, true) === [],
    'Optional cross-sell links must not become a new blocking draft requirement.');
$categoryOnlyDraft = $draft;
$categoryOnlyDraft['description'] .= $crossSellHtml;
check(Validator::validate($categoryOnlyDraft, $relatedSource, true) === [],
    'Supplied category links and one linked product must pass without a minimum product-link count.');
foreach ([
    'https://shop.local/not-connected',
    'https://foreign.local/rvs-bouten?shop=2&lang=nl#assortiment',
    'https://shop.local/rvs-bouten?shop=2&lang=nl#invented',
] as $unsuppliedUrl) {
    $badCategoryDraft = $relatedDraft;
    $badCategoryDraft['description'] = str_replace(html($relatedSource['related_categories'][0]['url']), html($unsuppliedUrl), $relatedDraft['description']);
    check(Validator::validateSourceLinksAndHtml($badCategoryDraft, $relatedSource) !== [],
        'Unselected, foreign or altered category URLs must be rejected.');
}
$badCategoryDraft['description'] = str_replace('&amp;lang=nl', '&amp;amp;lang=nl', $relatedDraft['description']);
check(Validator::validateSourceLinksAndHtml($badCategoryDraft, $relatedSource) !== [],
    'Double-escaped category URLs must not receive a second entity decode.');
$emptyRelatedSource = $moreProducts;
$emptyRelatedSource['related_categories'] = [];
$emptyRelatedSource['category']['url'] = $relatedSource['related_categories'][0]['url'];
$emptyRelatedSource['category']['existing_text'] = $crossSellHtml;
check(Validator::validateSourceLinksAndHtml($relatedDraft, $emptyRelatedSource) !== [],
    'Current-category URLs and links in old category text must not grant permission for cross-sell links.');
check(Validator::validate($variant, $emptyRelatedSource, true) === [],
    'A source with no selected category connections must retain existing validation behavior.');
$unsafeRelatedSource = $relatedSource;
$unsafeRelatedSource['related_categories'][0]['url'] = 'javascript:alert(1)';
$badCategoryDraft['description'] = str_replace(html($relatedSource['related_categories'][0]['url']), 'javascript:alert(1)', $relatedDraft['description']);
check(Validator::validateSourceLinksAndHtml($badCategoryDraft, $unsafeRelatedSource) !== [],
    'An unsafe URI must remain blocked even if it appears in supplied category data.');
$badCategoryDraft['description'] = $relatedDraft['description'] . '<script>alert(1)</script>';
check(Validator::validateSourceLinksAndHtml($badCategoryDraft, $relatedSource) !== [],
    'Adding allowed category links must not weaken unsafe HTML detection.');

// Optional catalogue fields must work without generating empty cross-sell blocks.
$unlinkedDraft = $draft;
$unlinkedDraft['description'] = '<h1>Staal &amp; ijzer</h1><p>Lees de technische toelichting.</p>'
    . substr($description, strpos($description, '<p><strong>Q:</strong>'));
$baseProductDraft = $unlinkedDraft;
$baseProductDraft['description'] .= '<p><a href="' . html($source['products'][0]['url']) . '">Stalen product</a></p>';
for ($linkCount = 0; $linkCount <= 2; $linkCount++) {
    $fewerLinksDraft = $unlinkedDraft;
    foreach (array_slice($moreProducts['products'], 0, $linkCount) as $product) {
        $fewerLinksDraft['description'] .= '<p><a href="' . html($product['url']) . '">Stalen product</a></p>';
    }
    check(Validator::validateSourceLinksAndHtml($fewerLinksDraft, $moreProducts) === [],
        'Safe drafts with ' . $linkCount . ' product links must not be blocked when three products are supplied.');
    check(Validator::validate($fewerLinksDraft, $moreProducts, true) === [],
        'Full draft review must not request extra product links when there are ' . $linkCount . '.');
    $fewerLinksDraft['description'] = Validator::formatDescriptionForView($fewerLinksDraft['description']);
    check(Validator::validate($fewerLinksDraft, $moreProducts, true, null, true) === [],
        'Titleless icon-FAQ drafts with ' . $linkCount . ' product links must also pass.');
}
foreach (['missing', 'null', 'empty'] as $optionalState) {
    $optionalSource = ['category' => $source['category'], 'products' => [['name' => 'Stalen product', 'url' => $source['products'][0]['url']]]];
    if ($optionalState !== 'missing') {
        $optionalSource['related_categories'] = $optionalState === 'null' ? null : [];
        $optionalSource['products'][0]['combinations'] = $optionalState === 'null' ? null : [];
    }
    check(Validator::validate($baseProductDraft, $optionalSource, true) === [],
        'Base product links and matching FAQ must pass when combinations and related_categories are ' . $optionalState . '.');
    $emptyBlockDraft = $baseProductDraft;
    $emptyBlockDraft['description'] .= '<p><strong>Wat heb je verder nodig?</strong></p><p>Bekijk aanvullende categorieën.</p>';
    $optionalErrors = Validator::validate($emptyBlockDraft, $optionalSource, true);
    check(count($optionalErrors) === 1 && str_contains($optionalErrors[0], 'Wat heb je verder nodig?'),
        'A cross-sell heading without related category URLs must receive one editorial review error.');
    check(Validator::validateSourceLinksAndHtml($emptyBlockDraft, $optionalSource) === [],
        'An empty optional block is an editorial issue, not unsafe HTML or a fabricated link.');
    $unsuppliedCombination = $baseProductDraft;
    $unsuppliedCombination['description'] .= '<p><a href="' . html($source['products'][0]['combinations'][0]['url']) . '">Andere maat</a></p>';
    check(Validator::validateSourceLinksAndHtml($unsuppliedCombination, $optionalSource) !== [],
        'Absent combinations must never authorize a guessed variant URL.');

    $noProductsSource = ['category' => $source['category']];
    if ($optionalState !== 'missing') { $noProductsSource['products'] = $optionalState === 'null' ? null : []; }
    check(Validator::validate($unlinkedDraft, $noProductsSource, true) === [],
        'A draft with no product links must pass when the product list is ' . $optionalState . '.');
    $emptyBlockDraft = $unlinkedDraft;
    $emptyBlockDraft['description'] .= '<p><strong>Kijk ook eens</strong></p><ul></ul>';
    $optionalErrors = Validator::validate($emptyBlockDraft, $noProductsSource, true);
    check(count($optionalErrors) === 1 && str_contains($optionalErrors[0], 'Kijk ook eens'),
        'An empty product-link section without supplied product URLs must receive one editorial review error.');
    check(Validator::validateSourceLinksAndHtml($emptyBlockDraft, $noProductsSource) === [],
        'An unnecessary product heading must not become a source/HTML security error.');
}
$noUsableLinksSource = ['products' => [
    ['name' => 'Zonder link'], ['url' => null, 'combinations' => null],
    ['url' => '', 'combinations' => [['url' => " \t\n"], ['url' => null], []]],
], 'related_categories' => [['name' => 'Zonder link'], ['url' => null], ['url' => ''], ['url' => " \t\n"]]];
check(Validator::validate($unlinkedDraft, $noUsableLinksSource, true) === [],
    'Unlinked records and blank URLs must not create product-link requirements.');
$emptyBlockDraft = $unlinkedDraft;
$emptyBlockDraft['description'] .= '<p><strong>Wat heb je verder nodig?</strong></p><p><strong>Kijk ook eens</strong></p>';
check(count(Validator::validate($emptyBlockDraft, $noUsableLinksSource, true)) === 2,
    'Records with no usable URL must not authorize either optional section heading.');
$inlineTextDraft = $unlinkedDraft;
$inlineTextDraft['description'] .= '<p><strong>Kijk ook eens</strong> naar de genoemde eigenschappen.</p>';
check(Validator::validate($inlineTextDraft, $noUsableLinksSource, true) === [],
    'Optional-heading review must match the exact standalone heading rather than normal prose.');

$mixedLinksSource = ['products' => [
    ['name' => 'Zonder link'],
    ['url' => $source['products'][0]['url'], 'combinations' => null],
    ['name' => 'Alleen variantlink', 'combinations' => [['url' => 'https://shop.local/variant?size=20&finish=blank']]],
    ['url' => " \t\n", 'combinations' => []],
], 'related_categories' => $relatedSource['related_categories']];
$mixedLinksDraft = $baseProductDraft;
$mixedLinksDraft['description'] .= '<p><a href="https://shop.local/variant?size=20&amp;finish=blank">Andere uitvoering</a></p>' . $crossSellHtml;
check(Validator::validate($mixedLinksDraft, $mixedLinksSource, true) === [],
    'A mixed source must allow base product links and supplied combination links.');
$missingLinkedProduct = $baseProductDraft;
$missingLinkedProduct['description'] .= $crossSellHtml;
check(Validator::validate($missingLinkedProduct, $mixedLinksSource, true) === [],
    'A mixed source must allow fewer product links alongside supplied category links.');
$onlyRelatedDraft = $unlinkedDraft;
$onlyRelatedDraft['description'] .= $crossSellHtml;
check(Validator::validate($onlyRelatedDraft, $mixedLinksSource, true) === [],
    'A mixed source must allow selected category links without any product links.');
$mixedLinksSource['products'][] = ['url' => $source['products'][0]['url']];
check(Validator::validate($mixedLinksDraft, $mixedLinksSource, true) === [],
    'Duplicate supplied product URLs must not create an impossible extra distinct product requirement.');
$categoriesWithoutProducts = ['products' => [], 'related_categories' => $relatedSource['related_categories']];
$categoriesWithoutProductsDraft = $unlinkedDraft;
$categoriesWithoutProductsDraft['description'] .= $crossSellHtml;
check(Validator::validate($categoriesWithoutProductsDraft, $categoriesWithoutProducts, true) === [],
    'Selected category links can be used without requiring unavailable product links or a Kijk ook eens block.');
foreach (['<script>alert(1)</script>', '<style>p{display:none}</style>', '<iframe src="https://example.com"></iframe>',
    '<img src="https://example.com/tracker.gif">',
    '<p onclick="alert(1)">x</p>', '<a href="java&#10;script:alert(1)">x</a>', '<p style="display:none">x</p>', '<p hidden>x</p>'] as $unsafe) {
    $variant = $draft;
    $variant['description'] .= $unsafe;
    rejected($variant, $source, 'Unsafe HTML was accepted.');
}
foreach (['', '<p>Geen titel</p>', '<h1>A</h1><h1>B</h1>', '<h1><em>Staal</em></h1>', html($description)] as $invalid) {
    $variant = $draft;
    $variant['description'] = $invalid;
    rejected($variant, $source, 'Missing, encoded or invalid H1/HTML was accepted.');
}
$length = mb_strlen(Validator::visibleText($description), 'UTF-8');
check(Validator::validate($draft, $source, true, $length) === [], 'Exact visible-character limit must pass.');
rejected($draft, $source, 'Overlength visible text was accepted.', true, $length - 1);
$variant = $draft;
$variant['description'] .= '<p>' . str_repeat('é', 1600) . '</p>';
check(Validator::validate($variant, $source, true) === [], 'A null limit must leave custom length unrestricted.');
rejected($variant, $source, 'Unicode overlength content was accepted.', true, 1500);

$variant = $draft;
$variant['description'] = str_replace('Q:</strong>', 'A:</strong>', $description);
rejected($variant, $source, 'Incorrect FAQ pair order was accepted.');
$variant['description'] = $description . '<p><strong>Q:</strong> Extra Staal &amp; ijzer?</p><p><strong>A:</strong> Extra.</p>';
rejected($variant, $source, 'Six FAQ pairs were accepted.');
$variant['description'] = str_replace('Staal &amp; ijzer bij vraag 5', 'deze producten bij vraag 5', $description);
check(Validator::validate($variant, $source, false) === [], 'Natural FAQ wording must not require the exact category name.');
$variant['description'] = str_replace('Staal &amp; ijzer bij vraag', 'STAAL &amp; IJZER bij vraag', $description);
check(Validator::validate($variant, $source, false) === [], 'Category capitalization must not restrict FAQ wording.');

foreach (['{invalid}', '{}', 'null'] as $invalid) {
    $variant = $draft;
    $variant['seo_jsonld'] = $invalid;
    rejected($variant, $source, 'Invalid FAQPage JSON was accepted.');
}
$variant = $draft;
$changed = $schema;
$changed['mainEntity'][0]['acceptedAnswer']['text'] = 'Afwijkend antwoord.';
$variant['seo_jsonld'] = $changed;
rejected($variant, $source, 'JSON-LD differing from the visible answer was accepted.');
$changed = $schema;
$changed['mainEntity'][0]['name'] = 'Q: ' . $changed['mainEntity'][0]['name'];
$variant['seo_jsonld'] = $changed;
rejected($variant, $source, 'Q:/A: labels in JSON-LD were accepted.');
$changed = $schema;
$changed['mainEntity'][0]['acceptedAnswer']['text'] = str_repeat('é', 301);
$variant['seo_jsonld'] = $changed;
rejected($variant, $source, 'A JSON-LD answer over 300 Unicode characters was accepted.');
$variant['description'] = str_replace(html($faq[0]['acceptedAnswer']['text']), str_repeat('é', 301), $description);
rejected($variant, $source, 'Matching visible and JSON-LD answers over 300 characters were accepted.');
$changed['mainEntity'][0]['acceptedAnswer']['text'] = str_repeat('é', 300);
$variant['seo_jsonld'] = $changed;
$variant['description'] = str_replace(html($faq[0]['acceptedAnswer']['text']), str_repeat('é', 300), $description);
check(Validator::validate($variant, $source, true) === [], 'Exactly 300 Unicode answer characters must pass.');
$changed = $schema;
$changed['mainEntity'][0]['acceptedAnswer']['text'] = html($changed['mainEntity'][0]['acceptedAnswer']['text']);
$variant = $draft;
$variant['seo_jsonld'] = $changed;
check(Validator::validate($variant, $source, true) === [], 'Decoded JSON-LD entities should match visible text.');

$reviewDraft = $draft;
$reviewDraft['description'] = str_replace('Staal &amp; ijzer bij vraag 5', 'deze producten bij vraag 5', $description)
    . '<p>' . str_repeat('é', 1600) . '</p>';
check(Validator::validateSourceLinksAndHtml($reviewDraft, $source) === [], 'Source-safe drafts must remain reviewable despite length or JSON-LD warnings.');
check(Validator::validate($reviewDraft, $source, true, 1500) !== [], 'Full validation must retain editorial review warnings.');
$reviewDraft['description'] = str_replace('https://shop.local/product', 'https://invented.local/product', $description);
check(Validator::validateSourceLinksAndHtml($reviewDraft, $source) !== [], 'Source validation must block foreign links.');
$reviewDraft['description'] = $description . '<script>alert(1)</script>';
check(Validator::validateSourceLinksAndHtml($reviewDraft, $source) !== [], 'Source validation must block unsafe HTML.');
check(Validator::validateSourceLinksAndHtml(['description' => ''], $source) !== [], 'Source validation must block empty drafts.');
check(Validator::validateSourceLinksAndHtml($draft, $moreProducts) === [], 'Source validation must not enforce a distinct-product link requirement.');

$questionIcon = '<i class="fasl fa-circle-question" aria-hidden="true"></i>';
$answerIcon = '<i class="fasl fa-circle-info" aria-hidden="true"></i>';
$iconDescription = substr($description, 0, strpos($description, '<p><strong>Q:</strong>'));
foreach ($faq as $item) {
    $iconDescription .= '<p class="mb-0">' . $questionIcon . ' <strong>' . html($item['name']) . '</strong></p>'
        . '<p>' . $answerIcon . ' ' . html($item['acceptedAnswer']['text']) . '</p>';
}
$iconDraft = ['description' => $iconDescription, 'seo_jsonld' => $schema];
check(Validator::validate($iconDraft, $source, true, 1500) === [], 'Icon FAQs with matching plain-text JSON-LD must pass.');
check(Validator::validateSourceLinksAndHtml($iconDraft, $source) === [], 'The exact decorative FAQ icons must be allowed.');
$withoutIcons = str_replace([$questionIcon, $answerIcon], '', $iconDescription);
check(Validator::visibleText($iconDescription) === Validator::visibleText($withoutIcons), 'Decorative icons must not add visible characters.');
$iconLength = mb_strlen(Validator::visibleText($withoutIcons), 'UTF-8');
check(Validator::validate($iconDraft, $source, true, $iconLength) === [], 'The icon FAQ exact Unicode length must pass.');
rejected($iconDraft, $source, 'Icon FAQ overlength must still be detected.', true, $iconLength - 1);
$variant = $iconDraft;
$variant['description'] = str_replace($questionIcon, $answerIcon, $iconDescription);
rejected($variant, $source, 'Icon FAQ question/answer order must be enforced.');
$variant['description'] = $iconDescription . '<p>' . $questionIcon . ' <strong>Extra Staal &amp; ijzer?</strong></p><p>' . $answerIcon . ' Extra.</p>';
rejected($variant, $source, 'Six icon FAQ pairs must be rejected.');
$variant['description'] = str_replace('Staal &amp; ijzer bij vraag 5', 'deze producten bij vraag 5', $iconDescription);
check(Validator::validate($variant, $source, false) === [], 'Icon FAQ questions must allow natural wording without the exact category name.');
$variant['description'] = str_replace('<strong>Wat biedt', 'Wat biedt', $iconDescription);
rejected($variant, $source, 'Icon FAQ questions must retain their strong wrapper.');
foreach ([
    '<i class="fasl fa-circle-question" aria-hidden="true" onclick="alert(1)"></i>',
    '<i class="fasl fa-circle-question" aria-hidden="true" data-track="remote"></i>',
    '<i class="fasl fa-circle-question" aria-hidden="true">verborgen tekst</i>',
    '<i class="fasl fa-circle-question" aria-hidden="true"><strong></strong></i>',
    '<i class="fasl fa-circle-question extra" aria-hidden="true"></i>',
    '<i class="fas fa-circle-question" aria-hidden="true"></i>',
    '<i class="fasl fa-circle-question" aria-hidden="false"></i>',
    '<i class="fasl fa-circle-question"></i>',
    '<i></i>',
] as $unsafeIcon) {
    $variant = $iconDraft;
    $variant['description'] = str_replace($questionIcon, $unsafeIcon, $iconDescription);
    check(Validator::validateSourceLinksAndHtml($variant, $source) !== [], 'Unsafe, nonempty or arbitrary icons must be blocked.');
}
check(Validator::formatFaqIcons($description) === $iconDescription, 'Legacy FAQ labels must become the exact new icon structure.');
check(Validator::formatFaqIcons($iconDescription) === $iconDescription, 'Icon FAQ formatting must be idempotent.');
check(Validator::validate($draft, $source, true, 1500) === [], 'Legacy FAQ draft validation must remain supported.');
$linkedQuestion = '<p><strong>Q:</strong> Wat biedt <a href="https://shop.local/product?size=10&amp;color=zwart">Staal &amp; ijzer</a>?</p>';
$expectedLinkedQuestion = '<p class="mb-0">' . $questionIcon . ' <strong>Wat biedt <a href="https://shop.local/product?size=10&amp;color=zwart">Staal &amp; ijzer</a>?</strong></p>';
check(Validator::formatFaqIcons($linkedQuestion) === $expectedLinkedQuestion, 'Formatting must preserve inline links and their original entity escaping.');
$unrelated = '<h1>Q: Staal &amp; ijzer</h1><p><strong>Kwaliteit:</strong> h9</p><p>Q: losse tekst</p>';
check(Validator::formatFaqIcons($unrelated) === $unrelated, 'Only structured legacy FAQ labels may change.');
$unsafeLegacy = $description . '<p><strong>A:</strong> <a href="javascript:alert(1)">onveilig</a></p><script>alert(1)</script>';
$formattedUnsafe = Validator::formatFaqIcons($unsafeLegacy);
check(str_contains($formattedUnsafe, 'javascript:alert(1)') && str_contains($formattedUnsafe, '<script>alert(1)</script>'), 'Formatting must not silently sanitize unsafe markup.');
check(Validator::validateSourceLinksAndHtml(['description' => $formattedUnsafe], $source) !== [], 'Unsafe markup must still be rejected after formatting.');

$viewDraft = $iconDraft;
$viewDraft['description'] = Validator::formatDescriptionForView($description);
check(Validator::validate($viewDraft, $source, true, 1500, true) === [], 'A titleless view draft with all five spaced icon questions must pass.');
$relatedViewDraft = $relatedDraft;
$relatedViewDraft['description'] = Validator::formatDescriptionForView($relatedDraft['description']);
check(Validator::validate($relatedViewDraft, $relatedSource, true, null, true) === [],
    'Cross-sell paragraphs must remain compatible with the titleless view, five decorative icon FAQs and exact JSON-LD.');

// Reproduce delivery questions previously rejected for omitting "Koker vierkant".
$naturalSource = $source;
$naturalSource['category']['name'] = 'Koker vierkant';
$naturalQuestions = [
    'Van welk staal zijn vierkante kokers gemaakt?',
    'Welke wanddiktes zijn beschikbaar?',
    'Kan IJzershop vierkante kokers op maat zagen?',
    'Wat zijn de verzendkosten binnen Nederland?',
    'Waar wordt mijn bestelling verzonden vanuit?',
];
$naturalDraft = $viewDraft;
foreach ($naturalQuestions as $index => $question) {
    $naturalDraft['description'] = str_replace(html($faq[$index]['name']), html($question), $naturalDraft['description']);
    $naturalDraft['seo_jsonld']['mainEntity'][$index]['name'] = $question;
}
check(Validator::validate($naturalDraft, $naturalSource, true, null, true) === [],
    'Natural technical and delivery questions with matching JSON-LD must pass without repeating Koker vierkant.');
$naturalDraft['seo_jsonld']['mainEntity'][4]['name'] = 'Vanuit welk magazijn wordt mijn bestelling verzonden?';
check(Validator::validate($naturalDraft, $naturalSource, true, null, true) !== [],
    'Natural wording must not relax the exact visible FAQ/JSON-LD correspondence.');

check(!str_contains($viewDraft['description'], '<h1') && substr_count($viewDraft['description'], '<p class="mb-0">') === 5,
    'View formatting must remove the leading title and set mb-0 on all five questions.');
check(substr_count($viewDraft['description'], '<p>' . $answerIcon) === 5, 'Answer paragraphs must keep their original opening tag.');
check(Validator::formatDescriptionForView($viewDraft['description']) === $viewDraft['description'], 'View formatting must be idempotent.');
check(Validator::validate($viewDraft, $source, true) !== [], 'The default/custom context must retain its original H1 requirement.');
check(Validator::validate($iconDraft, $source, true, null, true) !== [], 'View mode must reject an extra H1.');
$variant = $viewDraft;
$variant['description'] = str_replace(' class="mb-0"', '', $viewDraft['description']);
check(Validator::validate($variant, $source, true, null, true) !== [], 'View mode must enforce mb-0 on question paragraphs.');
check(Validator::formatFaqIcons($variant['description']) === $viewDraft['description'], 'Existing icon questions must gain mb-0 without changing answers.');
foreach (['<h1 onclick="alert(1)">Staal</h1>', '<h1><a href="https://foreign.local">Staal</a></h1>', '<h1><strong>Staal</strong></h1>'] as $heading) {
    $unsafe = $heading . $viewDraft['description'];
    check(Validator::formatDescriptionForView($unsafe) === $unsafe, 'Attributes or nested markup in the title must never be discarded.');
    check(Validator::validate(['description' => $unsafe], $source, false, null, true) !== [], 'Unsafe or nested H1 markup must remain rejected.');
}
$laterHeading = '<p>Inleiding.</p><h1>Latere titel</h1>' . $viewDraft['description'];
check(Validator::formatDescriptionForView($laterHeading) === $laterHeading, 'A later H1 must not be silently removed.');
check(Validator::validate(['description' => $laterHeading], $source, false, null, true) !== [], 'A stray later H1 must be reported in view mode.');
$attributedQuestion = '<p data-note="x &amp; y" class=existing onclick="alert(1)"><strong>Q:</strong> Staal &amp; ijzer?</p>';
$expectedAttributedQuestion = '<p data-note="x &amp; y" class="existing mb-0" onclick="alert(1)">' . $questionIcon . ' <strong>Staal &amp; ijzer?</strong></p>';
check(Validator::formatFaqIcons($attributedQuestion) === $expectedAttributedQuestion, 'Question formatting must preserve existing classes, arbitrary attributes and entities.');
check(Validator::formatFaqIcons($expectedAttributedQuestion) === $expectedAttributedQuestion, 'Attributed icon question formatting must be idempotent.');
check(Validator::validateSourceLinksAndHtml(['description' => $expectedAttributedQuestion . $viewDraft['description']], $source) !== [], 'Preserved unsafe paragraph attributes must still be blocked.');
$quotedClassQuestion = "<p title=\"a > b\" class='existing'>" . $questionIcon . ' <strong>Vraag?</strong></p>';
check(Validator::formatFaqIcons($quotedClassQuestion) === str_replace("class='existing'", "class='existing mb-0'", $quotedClassQuestion), 'Existing quoted classes and quoted greater-than signs must survive formatting.');
$attributedAnswer = '<p class="answer" data-note="stay"><strong>A:</strong> Staal &amp; ijzer.</p>';
check(Validator::formatFaqIcons($attributedAnswer) === '<p class="answer" data-note="stay">' . $answerIcon . ' Staal &amp; ijzer.</p>', 'Answer classes and attributes must remain unchanged.');

echo "AI category draft validation checks passed; no database or network access.\n";
