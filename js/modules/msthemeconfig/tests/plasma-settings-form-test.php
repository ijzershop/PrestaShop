<?php

declare(strict_types=1);

/** Run with PHP CLI; no shop data is changed. Uses the installed Symfony form validator. */
if (PHP_SAPI !== 'cli') {
    exit(1);
}

define('_DB_PREFIX_', 'test_');

class Shop
{
    public const CONTEXT_SHOP = 1;
    public const CONTEXT_GROUP = 2;
    public const CONTEXT_ALL = 3;
    public static int $scope = self::CONTEXT_SHOP;
    public int $id;
    public int $id_shop_group = 7;
    public function __construct(int $id) { $this->id = $id; }
    public static function getContext(): int { return self::$scope; }
}

class Context
{
    public static $instance;
    public static function getContext() { return self::$instance; }
}

class Configuration
{
    public static array $values = [];
    public static array $writes = [];
    public static function get($key, $lang = null, $group = null, $shop = null, $default = false) { return self::$values[$key] ?? $default; }
    public static function getGlobalValue($key) { return self::$values[$key] ?? false; }
    public static function updateValue($key, $value, $html, $group, $shop): bool
    {
        self::$writes[] = [$key, $value, $group, $shop];
        self::$values[$key] = $value;
        return true;
    }
}

class Db
{
    public const ON_DUPLICATE_KEY = 4;
    public static array $product = ['enabled' => 1, 'pierce_time' => '0.000000', 'feed_rate' => '900.000000'];
    public static array $featureValues = [11 => 'Staal', 12 => '3,5 mm', 13 => '1000 mm', 14 => '500'];
    public static bool $validCombination = true;
    public static array $writes = [];
    public static function getInstance(): self { return new self(); }
    public function getRow(string $sql): array { return self::$product; }
    public function getValue(string $sql) { return self::$validCombination ? 42 : false; }
    public function executeS(string $sql): array
    {
        if (preg_match('/fp\.`id_feature` = ([0-9]+)/', $sql, $match)) {
            return isset(self::$featureValues[(int) $match[1]]) ? [['value' => self::$featureValues[(int) $match[1]]]] : [];
        }
        if (str_contains($sql, 'product_attribute_combination')) {
            return [['value' => 'RVS']];
        }
        throw new RuntimeException('Unexpected test query.');
    }
    public function insert($table, $row, $nulls, $cache, $mode): bool { self::$writes[] = $row; return true; }
}

require dirname(__DIR__, 5) . '/vendor/autoload.php';
require __DIR__ . '/../src/Plasma/PlasmaSettings.php';
require __DIR__ . '/../src/Plasma/PlasmaProductForm.php';

use MsThemeConfig\Plasma\PlasmaProductForm;
use MsThemeConfig\Plasma\PlasmaSettings;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Validator\ValidatorExtension;
use Symfony\Component\Form\Forms;
use Symfony\Component\Validator\Validation;

function check(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

function rejects(callable $operation, string $message): void
{
    try {
        $operation();
    } catch (DomainException $error) {
        return;
    }
    throw new RuntimeException($message);
}

Context::$instance = (object) ['shop' => new Shop(1), 'employee' => (object) ['id' => 1, 'id_profile' => 1]];
$prefix = PlasmaSettings::PREFIX;
Configuration::$values = PlasmaSettings::defaults();
rejects(fn () => PlasmaSettings::saveRequest([$prefix . 'ENABLED' => '1']), 'Incomplete machine commissioning must block activation.');
check(Configuration::$writes === [], 'An invalid settings submission must not partly persist.');
PlasmaSettings::saveRequest([$prefix . 'FEED_RATE' => '750,25']);
check(Configuration::$values[$prefix . 'FEED_RATE'] === '750.25', 'Decimal comma must normalize before storage.');
foreach ([0, -1, INF, NAN, '1e999', 'abc', []] as $invalid) {
    rejects(fn () => PlasmaSettings::machineNumber($invalid, 'feed_rate'), 'Invalid machine feed was accepted.');
}
check(PlasmaSettings::machineNumber(0, 'pierce_time') === 0.0, 'An explicit zero pierce override must remain valid.');

Configuration::$values = array_merge(PlasmaSettings::defaults(), [
    $prefix . 'ENABLED' => '1', $prefix . 'PYTHON_BINARY' => '/opt/plasma/python',
    $prefix . 'MATERIAL_SOURCE' => 'feature:11', $prefix . 'THICKNESS_SOURCE' => 'feature:12',
    $prefix . 'WIDTH_SOURCE' => 'feature:13', $prefix . 'HEIGHT_SOURCE' => 'feature:14',
    $prefix . 'FEED_RATE' => '700', $prefix . 'PIERCE_TIME' => '2',
    $prefix . 'LEAD_IN_LENGTH' => '4', $prefix . 'OPERATING_COST_PER_MINUTE' => '3.5',
]);
$machine = PlasmaSettings::resolveProduct(42, 5, 1, 1);
check($machine['material'] === 'Steel' && $machine['thickness'] === 3.5, 'Native material and thickness mappings must normalize.');
check($machine['feed_rate'] === 900.0 && $machine['pierce_time'] === 0.0 && $machine['lead_in_length'] === 4.0, 'Product overrides must distinguish zero from inherit.');
check($machine['stock_width_mm'] === 1000.0 && $machine['stock_height_mm'] === 500.0, 'Full-sheet anchors are fixed.');
Db::$featureValues[13] = '999';
rejects(fn () => PlasmaSettings::resolveProduct(42, 5, 1, 1), 'Nonstandard stock must not quote.');
Db::$featureValues[13] = '1000';
Db::$featureValues[11] = 'Copper';
rejects(fn () => PlasmaSettings::resolveProduct(42, 5, 1, 1), 'Unsupported materials must not quote.');
Db::$featureValues[11] = 'Staal';
Configuration::$values[$prefix . 'MATERIAL_SOURCE'] = 'attribute:3';
check(PlasmaSettings::resolveProduct(42, 5, 1, 1)['material'] === 'RVS', 'Selected combination attribute must resolve material.');
rejects(fn () => PlasmaSettings::resolveProduct(42, 0, 1, 1), 'Attribute mapping needs an explicit combination.');
Db::$validCombination = false;
rejects(fn () => PlasmaSettings::resolveProduct(42, 55, 1, 1), 'Other-shop or product combinations must fail.');
Db::$validCombination = true;
Configuration::$values[$prefix . 'MATERIAL_SOURCE'] = 'feature:11';

$factory = Forms::createFormFactoryBuilder()->addExtension(new ValidatorExtension(Validation::createValidator()))->getFormFactory();
$makeForm = function () use ($factory) {
    $builder = $factory->createNamedBuilder('product', FormType::class);
    $details = $builder->create('details', FormType::class);
    $details->add('references', FormType::class);
    $builder->add($details);
    PlasmaProductForm::build(['form_builder' => $builder, 'id' => 42]);
    return $builder->getForm();
};
$form = $makeForm();
$form->submit(['details' => ['references' => [
    'plasma_enabled' => '1', 'plasma_feed_rate' => '', 'plasma_pierce_time' => '0',
    'plasma_lead_in_length' => '3.5', 'plasma_operating_cost_per_minute' => '4.25',
]]]);
check($form->isValid(), 'A valid product override form must pass the real Symfony validator.');
PlasmaProductForm::save(['id' => 42, 'form_data' => $form->getData()]);
$saved = Db::$writes[count(Db::$writes) - 1];
check($saved['id_shop'] === 1 && $saved['feed_rate'] === null && $saved['pierce_time'] === 0.0, 'Clearing an override must inherit and preserve explicit zero values.');
$badForm = $makeForm();
$badForm->submit(['details' => ['references' => ['plasma_enabled' => '1', 'plasma_feed_rate' => '-1']]]);
check(!$badForm->isValid(), 'Negative feeds must fail before product persistence.');
$beforeWrites = count(Db::$writes);
Shop::$scope = Shop::CONTEXT_ALL;
PlasmaProductForm::save(['id' => 42, 'form_data' => $form->getData()]);
check(count(Db::$writes) === $beforeWrites, 'All-shop product forms must not accidentally alter one shop.');

echo "PASS: Plasma mappings, machine validation, shop scope and Symfony product form.\n";
