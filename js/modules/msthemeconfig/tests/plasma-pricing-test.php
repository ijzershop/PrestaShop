<?php

declare(strict_types=1);

/** Run with PHP CLI. No shop bootstrap, database, filesystem mutations or network calls. */
if (PHP_SAPI !== 'cli') {
    exit(1);
}

define('_DB_PREFIX_', 'fixture_');

class Configuration
{
    public static $schemaInstalled = true;

    public static function getGlobalValue(string $key)
    {
        return self::$schemaInstalled;
    }
}

class Db
{
    public static $row = false;
    public static array $queries = [];

    public static function getInstance(): self
    {
        return new self();
    }

    public function getRow(string $query)
    {
        self::$queries[] = $query;

        return self::$row;
    }
}

class Tools
{
    public static array $conversions = [];

    public static function convertPrice(float $price, int $currency): float
    {
        self::$conversions[] = [$price, $currency];

        return $price * ($currency === 2 ? 2.0 : 1.0);
    }
}

class Product
{
    public static function getIdTaxRulesGroupByIdProduct(int $productId, $context): int
    {
        return 4;
    }
}

class TaxManagerFactory
{
    public static array $requests = [];
    public static array $taxedAmounts = [];

    public static function getManager($address, int $taxRulesGroup): self
    {
        self::$requests[] = [$address, $taxRulesGroup];

        return new self();
    }

    public function getTaxCalculator(): self
    {
        return $this;
    }

    public function addTaxes(float $amount): float
    {
        self::$taxedAmounts[] = $amount;

        return $amount * 1.21;
    }
}

require dirname(__DIR__) . '/src/Plasma/PlasmaCalculator.php';
require dirname(__DIR__) . '/src/Plasma/PlasmaHooks.php';

use MsThemeConfig\Plasma\PlasmaCalculator;
use MsThemeConfig\Plasma\PlasmaHooks;

$checks = 0;
$failures = [];
$check = static function (bool $condition, string $description) use (&$checks, &$failures): void {
    ++$checks;
    if (!$condition) {
        $failures[] = $description;
    }
};
$near = static fn (float $actual, float $expected): bool => abs($actual - $expected) < 0.000001;
$rejects = static function (callable $operation, string $description, ?string $expectedMessage = null) use ($check): void {
    try {
        $operation();
        $check(false, $description);
    } catch (DomainException $error) {
        $check($expectedMessage === null || $error->getMessage() === $expectedMessage, $description);
    }
};

$metrics = [
    'success' => true,
    'total_length_mm' => 2000,
    'total_pierces' => 4,
    'part_width_mm' => 800,
    'part_height_mm' => 400,
    'diagnostics' => ['is_safe_to_cut' => true, 'open_loops_count' => 0],
];
$machine = ['feed_rate' => 1000, 'pierce_time' => 3, 'lead_in_length' => 5, 'operating_cost_per_minute' => 10];
$quote = PlasmaCalculator::calculate($metrics, $machine, 50);
$check($near($quote['production_length_mm'], 2020), 'Add one lead-in per pierce.');
$check($near($quote['travel_minutes'], 2.02), 'Convert travel using feed in millimetres per minute.');
$check($near($quote['pierce_minutes'], 0.2), 'Convert pierce seconds to minutes.');
$check($near($quote['machine_minutes'], 2.22), 'Total machine time includes travel and pierce hover.');
$check($near($quote['surcharge_excl'], 22.2), 'Machine surcharge uses the operating cost once.');
$check($near($quote['total_price_excl'], 72.2), 'Full raw sheet price is charged once with the surcharge.');
$check($quote['rotation_degrees'] === 0, 'An ordinary drawing keeps its orientation.');

$small = PlasmaCalculator::calculate(array_replace($metrics, ['part_width_mm' => 80, 'part_height_mm' => 40]), $machine, 50);
$check($near($small['total_price_excl'], 72.2), 'A smaller envelope never prorates the full sheet price.');
$exact = PlasmaCalculator::calculate(array_replace($metrics, ['part_width_mm' => 1000, 'part_height_mm' => 500]), $machine, 50);
$check($exact['rotation_degrees'] === 0, 'The exact 1000 by 500 boundary fits.');
$rotated = PlasmaCalculator::calculate(array_replace($metrics, ['part_width_mm' => 500, 'part_height_mm' => 1000]), $machine, 50);
$check($rotated['rotation_degrees'] === 90 && $near($rotated['total_price_excl'], 72.2), 'Rotation changes orientation without changing the price.');
foreach ([[1001, 500], [501, 1000], [1200, 10]] as [$width, $height]) {
    $rejects(static fn () => PlasmaCalculator::calculate(array_replace($metrics, ['part_width_mm' => $width, 'part_height_mm' => $height]), $machine, 50),
        "Reject {$width} by {$height} even after rotation.", PlasmaCalculator::BOUNDS_ERROR);
}

foreach (['success' => false, 'total_length_mm' => 0, 'total_pierces' => 1.5, 'part_width_mm' => -1, 'part_height_mm' => INF] as $key => $invalid) {
    $rejects(static fn () => PlasmaCalculator::calculate(array_replace($metrics, [$key => $invalid]), $machine, 50), "Reject invalid geometry {$key}.");
}
foreach ([[], ['is_safe_to_cut' => false, 'open_loops_count' => 0], ['is_safe_to_cut' => true, 'open_loops_count' => 1], ['is_safe_to_cut' => true]] as $diagnostics) {
    $rejects(static fn () => PlasmaCalculator::calculate(array_replace($metrics, ['diagnostics' => $diagnostics]), $machine, 50), 'Missing or unsafe diagnostics must fail closed.');
}
$rejects(static fn () => PlasmaCalculator::calculate(array_replace($metrics, ['diagnostics' => ['is_safe_to_cut' => 'false', 'open_loops_count' => 0]]), $machine, 50),
    'A malformed safety boolean must never authorize cutting.');
$rejects(static fn () => PlasmaCalculator::calculate(array_replace($metrics, ['diagnostics' => ['is_safe_to_cut' => true, 'open_loops_count' => 'invalid']]), $machine, 50),
    'A malformed open-loop count must never authorize cutting.');
foreach ([0, -1, INF, NAN, null, ''] as $invalid) {
    $rejects(static fn () => PlasmaCalculator::calculate($metrics, array_replace($machine, ['feed_rate' => $invalid]), 50), 'Reject invalid or nonfinite feed rates.');
}
foreach (['pierce_time', 'lead_in_length', 'operating_cost_per_minute'] as $key) {
    $rejects(static fn () => PlasmaCalculator::calculate($metrics, array_replace($machine, [$key => -1]), 50), "Reject negative machine parameter {$key}.");
}
foreach ([-1, INF, NAN] as $invalid) {
    $rejects(static fn () => PlasmaCalculator::calculate($metrics, $machine, $invalid), 'Reject negative or nonfinite raw sheet prices.');
}
$noLead = PlasmaCalculator::calculate($metrics, array_replace($machine, ['lead_in_length' => 0, 'pierce_time' => 0]), 50);
$check($near($noLead['total_price_excl'], 70), 'Zero lead-in and hover time are valid machine settings.');

$price = 80.0; // Core has already applied a catalog/group discount to the sheet.
$address = (object) ['id_country' => 1];
$params = ['price' => &$price, 'id_product' => 7, 'id_product_attribute' => 3, 'id_shop' => 1, 'id_currency' => 2,
    'id_customization' => 9, 'only_reduc' => false, 'use_tax' => false, 'address' => $address, 'context' => new stdClass()];
Db::$row = ['surcharge' => '10.000000', 'id_cart' => 5];
PlasmaHooks::price($params);
$check($near($price, 100), 'The already-discounted sheet receives the complete converted surcharge.');
$check(Tools::$conversions === [[10.0, 2]], 'Convert only the surcharge exactly once into the active currency.');
$check(TaxManagerFactory::$taxedAmounts === [], 'Tax-exclusive pricing never applies tax.');
$check(str_contains(Db::$queries[0], 'q.id_customization=9') && str_contains(Db::$queries[0], 'q.id_product=7')
    && str_contains(Db::$queries[0], 'q.id_product_attribute=3') && str_contains(Db::$queries[0], 'q.id_shop=1'),
    'Price lookup binds the customization to its product, combination and shop.');

$price = 96.8; // The same discounted sheet after 21% tax.
$params['use_tax'] = true;
Tools::$conversions = [];
PlasmaHooks::price($params);
$check($near($price, 121), 'Tax-inclusive surcharge is added after the already-taxed discounted sheet price.');
$check(Tools::$conversions === [[10.0, 2]] && TaxManagerFactory::$taxedAmounts === [20.0], 'Convert once, then tax once.');
$check(TaxManagerFactory::$requests === [[$address, 4]], 'Use the active address and product tax rules.');

$priorQueries = count(Db::$queries);
$price = 7.5;
$params['only_reduc'] = true;
PlasmaHooks::price($params);
$check($near($price, 7.5) && count(Db::$queries) === $priorQueries, 'Discount-only calculations exclude the machine surcharge entirely.');
$params['only_reduc'] = false;
$params['id_customization'] = 0;
PlasmaHooks::price($params);
$check($near($price, 7.5) && count(Db::$queries) === $priorQueries, 'Ordinary products keep their original price without a plasma query.');
$params['id_customization'] = 9;
Db::$row = false;
PlasmaHooks::price($params);
$check($near($price, 7.5), 'A customization outside this product or shop adds no surcharge.');
Configuration::$schemaInstalled = false;
$priorQueries = count(Db::$queries);
PlasmaHooks::price($params);
$check(count(Db::$queries) === $priorQueries, 'Before module migration, price hooks never query absent plasma tables.');

if ($failures) {
    fwrite(STDERR, implode("\n", array_map(static fn (string $failure): string => 'FAIL: ' . $failure, $failures)) . "\n");
    fwrite(STDERR, count($failures) . " of {$checks} plasma pricing checks failed.\n");
    exit(1);
}

echo "PASS: {$checks} plasma calculation and price-hook checks.\n";
