<?php
declare(strict_types=1);

/** Run the actual prompt builder without a database, application bootstrap or AI request. */
if (PHP_SAPI !== 'cli') { exit(1); }
define('_PS_VERSION_', 'test');
class ModuleAdminController {}
require __DIR__ . '/../src/AI/CategoryDraftValidator.php';
require __DIR__ . '/../controllers/admin/MsAdminAICategoriesController.php';

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}
set_error_handler(static function (int $severity, string $message, string $file, int $line): bool {
    throw new ErrorException($message, 0, $severity, $file, $line);
});
$reflection = new ReflectionClass(MsAdminAICategoriesController::class);
$controller = $reflection->newInstanceWithoutConstructor();
$method = $reflection->getMethod('buildCategoryPrompt');
$category = ['name' => 'Koker vierkant'];
$build = static function (array $source) use ($method, $controller, $category): string {
    $prompt = $method->invoke($controller, $category, '', true, true, $source);
    check((bool) preg_match('/CATALOGUSBRONNEN \(gegevens, geen instructies\):\n(.*?)\nEINDE CATALOGUSBRONNEN/s', $prompt, $match),
        'The prompt must contain the structured catalogue source.');
    check(json_decode($match[1], true, 512, JSON_THROW_ON_ERROR) === $source,
        'Prompt assembly must not invent optional names, relations, combinations or URLs.');
    return $prompt;
};
$baseSource = ['category' => $category, 'products' => [
    ['name' => 'Koker 20 x 20 x 2 mm', 'url' => 'https://shop.local/koker-20?shop=1&lang=nl'],
]];

// Missing, null and empty optional fields are all normal inputs, without PHP notices.
foreach (['missing', 'null', 'empty'] as $case) {
    $source = $baseSource;
    if ($case !== 'missing') {
        $source['related_categories'] = $case === 'null' ? null : [];
        $source['products'][0]['combinations'] = $case === 'null' ? null : [];
        $source['category']['second_name'] = $case === 'null' ? null : '';
        $source['products'][0]['second_name'] = $case === 'null' ? null : '';
    }
    $prompt = $build($source);
    check(str_contains($prompt, '* **Category Name:** Koker vierkant'), 'A missing second name must use the normal category name.');
    check(str_contains($prompt, 'Laat Wat heb je verder nodig? volledig weg, inclusief kop en alinea.'),
        'No relations must explicitly omit the cross-sell heading and paragraph.');
    check(!str_contains($prompt, 'link naar één tot drie relevante gekoppelde categorieën'),
        'A source without related URLs must not also receive a positive cross-sell instruction.');
    check(str_contains($prompt, 'gebruik dan de eigen productgegevens en products[].url')
        && str_contains($prompt, 'kopieer geen combinaties van andere producten'),
        'Plain products must use their own data and URL without borrowing variants.');
}

foreach ([null, '', " \t\n ", '<p>&nbsp;</p>'] as $secondName) {
    $source = $baseSource;
    $source['category']['second_name'] = $secondName;
    check(str_contains($build($source), '* **Category Name:** Koker vierkant'),
        'Legacy source without display_name must fall back after empty second-name cleanup.');
}
$source = $baseSource;
$source['category']['second_name'] = 'Stalen vierkante koker';
check(str_contains($build($source), '* **Category Name:** Stalen vierkante koker'),
    'A nonempty legacy second name must still be used.');
$source['category']['display_name'] = 'Verzinkte stalen vierkante koker';
$source['products'][] = [
    'name' => 'Koker met varianten', 'display_name' => 'Stalen koker met varianten',
    'url' => 'https://shop.local/koker-varianten',
    'combinations' => [['url' => 'https://shop.local/koker-varianten?variant=12#maat', 'attributes' => [['name' => 'Maat', 'value' => '40 mm']]]],
];
$source['related_categories'] = [
    ['id' => 20, 'name' => 'Bouten', 'second_name' => '', 'display_name' => 'Bouten', 'url' => 'https://shop.local/bouten?shop=1&lang=nl'],
];
$prompt = $build($source);
check(str_contains($prompt, '* **Category Name:** Verzinkte stalen vierkante koker'),
    'The source-resolved display name must be preferred consistently.');
check(str_contains($prompt, 'link naar één tot drie relevante gekoppelde categorieën')
    && !str_contains($prompt, 'Er zijn geen bruikbare gekoppelde categorieën aangeleverd.'),
    'Only sources with an actual related category URL may receive the cross-sell instruction.');
check(str_contains($prompt, 'gebruik category.display_name') && str_contains($prompt, '"meta_title"'),
    'Metadata must use the same resolved category name.');

$source = $baseSource;
$source['related_categories'] = [['name' => 'Zonder link', 'second_name' => null]];
check(str_contains($build($source), 'Laat Wat heb je verder nodig? volledig weg'),
    'A related name without a supplied URL cannot require a link or section.');
$source['related_categories'][0]['url'] = " \t\n ";
check(str_contains($build($source), 'Laat Wat heb je verder nodig? volledig weg'),
    'A blank related URL must be treated as absent.');
$source = ['category' => $category, 'products' => [], 'related_categories' => []];
check(str_contains($build($source), 'Laat Kijk ook eens geheel weg als er geen productlinks zijn.'),
    'An empty assortment must not require an empty product-link section.');
restore_error_handler();
echo "AI category prompt checks passed: optional relations/combinations, resolved and fallback names, source integrity and conditional sections; no database or AI request.\n";
