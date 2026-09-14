<?php

declare(strict_types=1);

/**
 * php modules/msthemeconfig/tests/registration-test.php
 * Uses the installed core form, validators and shop formatter without a database,
 * customer writes, a PrestaShop bootstrap, or email delivery.
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$shopRoot = __DIR__;
while (!is_file($shopRoot . '/classes/form/CustomerForm.php')) {
    $parent = dirname($shopRoot);
    if ($parent === $shopRoot) {
        throw new RuntimeException('Run this test from a PrestaShop installation.');
    }
    $shopRoot = $parent;
}
require $shopRoot . '/vendor/autoload.php';
require $shopRoot . '/classes/form/FormInterface.php';
require $shopRoot . '/classes/form/FormFormatterInterface.php';
foreach (['form/FormField', 'ValidateConstraintTranslator', 'Validate', 'form/AbstractForm', 'form/CustomerFormatter'] as $file) {
    require $shopRoot . '/classes/' . $file . '.php';
    $name = basename($file);
    if ($name !== 'CustomerFormatter') {
        class_alias($name . 'Core', $name);
    }
}
if (is_file($shopRoot . '/override/classes/form/CustomerFormatter.php')) {
    require $shopRoot . '/override/classes/form/CustomerFormatter.php';
} else {
    class_alias('CustomerFormatterCore', 'CustomerFormatter');
}
require $shopRoot . '/classes/form/CustomerForm.php';
require __DIR__ . '/../src/Customer/RegistrationValidator.php';

final class TestTranslator extends Symfony\Component\Translation\Translator implements PrestaShopBundle\Translation\TranslatorInterface
{
    public function getSourceString($translated, $domain, $locale = null) { return $translated; }
    public function isLanguageLoaded($locale) { return true; }
    public function clearLanguage($locale) {}
}

final class Language
{
    public int $id = 1;
    public string $date_format_lite = 'd-m-Y';
}

final class Context
{
    public $smarty;
    public $language;
    public $customer;
    public $shop;
    public $controller;
    public function getTranslator() { return new TestTranslator('en-US'); }
}

final class Customer
{
    public static array $records = [];
    public static array $definition = ['fields' => [
        'firstname' => ['validate' => 'isCustomerName'],
        'lastname' => ['validate' => 'isCustomerName'],
        'email' => ['validate' => 'isEmail'],
    ]];
    public $id = null;
    public bool $is_guest = false;
    public string $email = '';
    public function isFieldRequired($field) { return false; }
    public static function customerExists($email, $returnId = false, $ignoreGuest = true) {
        foreach (self::$records as $record) {
            if (strcasecmp($record['email'], (string) $email) === 0 && (!$ignoreGuest || !$record['is_guest'])) {
                return $returnId ? $record['id'] : true;
            }
        }
        return false;
    }
}

final class CustomerPersister
{
    public function __construct(...$args) {}
    public function save(...$args) { throw new RuntimeException('Validation must not save a customer.'); }
}

final class Configuration
{
    public static function get($name) {
        return [
            'PS_SECURITY_PASSWORD_POLICY_MINIMUM_LENGTH' => 8,
            'PS_SECURITY_PASSWORD_POLICY_MAXIMUM_LENGTH' => 72,
            'PS_SECURITY_PASSWORD_POLICY_MINIMUM_SCORE' => 3,
        ][$name] ?? false;
    }
    public static function hasKey($name) { return self::get($name) !== false; }
}

final class Tools
{
    public static function strlen($value) { return mb_strlen((string) $value); }
}

final class Gender
{
    public static function getGenders($language) { return new ArrayObject(); }
}

final class Module
{
    public static function getModuleIdByName($name) { return 1; }
}

final class Hook
{
    public static bool $rejectConsent = false;
    public static function exec($name, array $params = [], ...$args) {
        if ($name === 'additionalCustomerFormFields') {
            return ['testconsent' => [(new FormField())->setName('consent')->setType('checkbox')->setRequired(true)]];
        }
        if ($name === 'validateCustomerFormFields' && self::$rejectConsent) {
            $params['fields'][0]->addError('Consent module rejected registration.');
        }
        return [];
    }
}

function contextForRegistration(bool $guest = false): Context
{
    $context = new Context();
    $context->smarty = new Smarty();
    $context->language = new Language();
    $context->customer = new Customer();
    $context->customer->id = $guest ? 12 : null;
    $context->customer->is_guest = $guest;
    $context->shop = (object) ['theme' => new class { public function get($key) { return true; } }];
    $context->controller = new class {
        public string $php_self = 'registration';
        public array $errors = [];
        public function get($service) { return null; }
    };
    return $context;
}

function registrationValues(): array
{
    return [
        'firstname' => 'Alex', 'lastname' => 'Smith',
        'email' => 'guest@example.test', 'validate_email' => 'guest@example.test',
        'password' => 'Cobalt-bridge!7429-Violet', 'consent' => '1',
    ];
}

function checkRegistration(string $name, array $values, bool $expected, bool $guest = false): void
{
    $context = contextForRegistration($guest);
    $original = clone $context->customer;
    $actual = (new MsThemeConfig\Customer\RegistrationValidator())->validate($context, $values);
    if ($actual !== $expected || (!$actual && !$context->controller->errors) || $context->customer != $original) {
        throw new RuntimeException($name . ': ' . json_encode($context->controller->errors));
    }
    echo 'PASS ' . $name . PHP_EOL;
}

Customer::$records = [['id' => 12, 'email' => 'guest@example.test', 'is_guest' => true]];
checkRegistration('returning guest email can register in a fresh session', registrationValues(), true);
checkRegistration('current guest can register without changing the context during validation', registrationValues(), true, true);
Customer::$records[] = ['id' => 13, 'email' => 'guest@example.test', 'is_guest' => false];
checkRegistration('existing registered email cannot create another account', registrationValues(), false);
checkRegistration('guest session cannot convert to an existing registered email', registrationValues(), false, true);
Customer::$records = [];
foreach ([
    'missing password' => ['password' => ''],
    'short password' => ['password' => 'Ab4!'],
    'weak password' => ['password' => 'password123'],
    'long password' => ['password' => str_repeat('Strong!42', 10)],
    'missing first name' => ['firstname' => ''],
    'invalid first name' => ['firstname' => '<script>'],
    'invalid email' => ['email' => 'invalid', 'validate_email' => 'invalid'],
    'missing consent' => ['consent' => ''],
] as $name => $replacement) {
    checkRegistration($name . ' blocks registration', array_replace(registrationValues(), $replacement), false);
}
$withoutPassword = registrationValues();
unset($withoutPassword['password']);
checkRegistration('omitted password blocks registration', $withoutPassword, false);
if (is_file($shopRoot . '/override/classes/form/CustomerFormatter.php')) {
    checkRegistration('email confirmation mismatch blocks registration', array_replace(registrationValues(), ['validate_email' => 'other@example.test']), false);
}
Hook::$rejectConsent = true;
checkRegistration('module validation errors block registration', registrationValues(), false);
$context = contextForRegistration();
$context->controller->php_self = 'order';
if (!(new MsThemeConfig\Customer\RegistrationValidator())->validate($context, [])) {
    throw new RuntimeException('Checkout must retain its own validation flow.');
}
echo 'PASS checkout is unaffected' . PHP_EOL;
