<?php
declare(strict_types=1);

/**
 * CLI integration regression check for the installed registration overrides.
 * Runs real forms, validation, and password hashing with in-memory persistence.
 * No shop bootstrap, database connection, customer writes, or real email.
 * php external/modernesmid_webshop/module/msthemeconfig/tests/guest-registration-test.php
 */
if (PHP_SAPI !== 'cli') { exit(1); }

use MsThemeConfig\Customer\RegistrationValidator;
use PrestaShop\PrestaShop\Core\Crypto\Hashing;
use PrestaShopBundle\Translation\TranslatorInterface;

$shopRoot = __DIR__;
while (!is_file($shopRoot . '/classes/form/CustomerForm.php')) {
    $parent = dirname($shopRoot);
    if ($parent === $shopRoot) {
        throw new RuntimeException('Run this test from a PrestaShop installation.');
    }
    $shopRoot = $parent;
}
require_once $shopRoot . '/vendor/autoload.php';
define('_COOKIE_KEY_', 'guest-registration-test-only');
// The legacy forms pass null optional fields to strlen on PHP 8.2.
error_reporting(E_ALL & ~E_DEPRECATED);

final class TestTranslator implements TranslatorInterface
{
    public function trans(string $id, array $parameters = [], ?string $domain = null, ?string $locale = null): string { return $id; }
    public function getLocale(): string { return 'en-US'; }
    public function getSourceString($translated, $domain, $locale = null) { return $translated; }
    public function isLanguageLoaded($locale) { return true; }
    public function clearLanguage($locale) {}
}

class Configuration
{
    public static array $values = [
        'PS_CUSTOMER_GROUP' => 3,
        'PS_GUEST_GROUP' => 2,
        'PS_CUSTOMER_CREATION_EMAIL' => true,
        'PS_SECURITY_PASSWORD_POLICY_MINIMUM_LENGTH' => 8,
        'PS_SECURITY_PASSWORD_POLICY_MAXIMUM_LENGTH' => 72,
        'PS_SECURITY_PASSWORD_POLICY_MINIMUM_SCORE' => 3,
    ];
    public static function get($name) { return self::$values[$name] ?? false; }
    public static function hasKey($name): bool { return array_key_exists($name, self::$values); }
}

class Tools
{
    public static function strlen($value): int { return mb_strlen((string) $value); }
}

class Language
{
    public int $id = 1;
    public string $date_format_lite = 'd-m-Y';
}

class Smarty {}
class Gender
{
    public static function getGenders($id): ArrayObject { return new ArrayObject(); }
}
class Module
{
    public static function getModuleIdByName($name): int { return 1; }
}
class Hook
{
    public static array $events = [];
    public static bool $requireConsent = false;
    public static function exec($name, $parameters = [], $moduleId = null, $arrayReturn = false)
    {
        self::$events[] = $name;
        if ($name === 'additionalCustomerFormFields' && self::$requireConsent) {
            return ['testconsent' => [(new FormField())->setName('privacy')->setType('checkbox')->setRequired(true)]];
        }
        if ($name === 'actionCustomerAccountAdd') {
            // This hook must not claim previous orders by an unverified email.
            // Its Db calls would hit the failing adapter below.
            $hooks = (new ReflectionClass(\MsThemeConfig\Class\ModernHook::class))->newInstanceWithoutConstructor();
            $hooks->hookActionCustomerAccountAdd($parameters);
        }
        return [];
    }
}
class Mail
{
    public static array $sent = [];
    public static function Send(...$arguments): bool { self::$sent[] = $arguments; return true; }
}
class Db
{
    public static function getInstance(...$arguments) { throw new RuntimeException('This test must never connect to a database.'); }
}

/** Customer persistence adapter; customerExists follows core's ignoreGuest semantics. */
class Customer
{
    public static array $records = [];
    public static array $orders = [];
    public static int $saveCount = 0;
    public static array $definition = ['fields' => [
        'firstname' => ['validate' => 'isCustomerName'],
        'lastname' => ['validate' => 'isCustomerName'],
        'email' => ['validate' => 'isEmail'],
        'optin' => ['validate' => 'isBool'],
    ]];
    public $id = 0;
    public $firstname = '';
    public $lastname = '';
    public $email = '';
    public $passwd = '';
    public $is_guest = false;
    public $id_default_group = 3;
    public array $groups = [3];

    public function __construct($id = null)
    {
        if (isset(self::$records[$id])) {
            foreach (get_object_vars(self::$records[$id]) as $key => $value) { $this->$key = $value; }
        }
    }
    public static function customerExists($email, $returnId = false, $ignoreGuest = true)
    {
        if (!Validate::isEmail($email)) { return false; }
        foreach (self::$records as $customer) {
            if (strcasecmp($customer->email, $email) === 0 && (!$ignoreGuest || !$customer->is_guest)) {
                return $returnId ? $customer->id : true;
            }
        }
        return $returnId ? 0 : false;
    }
    public function save(): bool
    {
        ++self::$saveCount;
        if (!$this->id) { $this->id = count(self::$records) + 1; }
        self::$records[$this->id] = clone $this;
        return true;
    }
    public function isGuest(): bool { return (bool) $this->is_guest; }
    public function isFieldRequired($name): bool { return false; }
    public function cleanGroups(): void { $this->groups = []; self::$records[$this->id]->groups = []; }
    public function addGroups($groups): void { $this->groups = $groups; self::$records[$this->id]->groups = $groups; }
    public function removeResetPasswordToken(): void {}
    public function sendWelcomeEmail($languageId): bool { return Mail::Send($languageId, 'account', $this->email); }
    public function getByEmail($email, $password = null, $ignoreGuest = true)
    {
        $id = self::customerExists($email, true, $ignoreGuest);
        if (!$id) { return false; }
        $customer = new self($id);
        return $password === null || (new Hashing())->checkHash($password, $customer->passwd, _COOKIE_KEY_) ? $customer : false;
    }
}

class Context
{
    public static self $instance;
    public Customer $customer;
    public Smarty $smarty;
    public Language $language;
    public object $controller;
    public object $cart;
    public object $shop;
    public function __construct(?Customer $customer = null)
    {
        self::$instance = $this;
        $this->customer = $customer ?? new Customer();
        $this->smarty = new Smarty();
        $this->language = new Language();
        $this->controller = new class {
            public string $php_self = 'registration';
            public array $errors = [];
            public function get($service) { return new Hashing(); }
        };
        $this->cart = new class {
            public int $updates = 0;
            public function update(): bool { ++$this->updates; return true; }
        };
        $this->shop = (object) ['theme' => new class {
            public function get($name): bool { return true; }
        }];
    }
    public static function getContext(): self { return self::$instance; }
    public function getTranslator(): TestTranslator { return new TestTranslator(); }
    public function updateCustomer(Customer $customer): void { $this->customer = $customer; }
}

// Load the exact current core + override implementations, rather than copying
// their business logic into the test. Composer supplies Symfony and Zxcvbn.
require_once $shopRoot . '/classes/form/FormInterface.php';
require_once $shopRoot . '/classes/form/FormFormatterInterface.php';
foreach ([
    'Validate' => '/classes/Validate.php',
    'ValidateConstraintTranslator' => '/classes/ValidateConstraintTranslator.php',
    'FormField' => '/classes/form/FormField.php',
    'AbstractForm' => '/classes/form/AbstractForm.php',
] as $class => $file) {
    require_once $shopRoot . $file;
    class_alias($class . 'Core', $class);
}
foreach (['CustomerFormatter', 'CustomerPersister', 'CustomerForm'] as $class) {
    require_once $shopRoot . '/classes/form/' . $class . '.php';
    require_once $shopRoot . '/override/classes/form/' . $class . '.php';
}
require_once __DIR__ . '/../src/Customer/RegistrationValidator.php';
require_once __DIR__ . '/../src/Class/ModernHook.php';

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}
function freshContext(?Customer $customer = null): Context
{
    Hook::$events = [];
    Mail::$sent = [];
    $_SESSION = [];
    return new Context($customer);
}
function guestFixture(string $email): Customer
{
    Customer::$records = [];
    Customer::$orders = [];
    Customer::$saveCount = 0;
    $guest = new Customer();
    $guest->firstname = 'Previous';
    $guest->lastname = 'Guest';
    $guest->email = $email;
    $guest->is_guest = true;
    $guest->id_default_group = 2;
    $guest->groups = [2];
    $guest->passwd = (new Hashing())->hash('Old guest generated secret');
    $guest->save();
    Customer::$orders[1001] = ['id_customer' => $guest->id, 'reference' => 'TEST-GUEST-ORDER'];
    return $guest;
}
function registrationValues(string $email): array
{
    return ['firstname' => 'Returning', 'lastname' => 'Shopper', 'email' => $email,
        'validate_email' => $email, 'password' => 'Fresh!Autumn#Trail-63'];
}
function register(Context $context, array $values): bool
{
    // Mirrors actionSubmitAccountBefore followed by RegistrationController's
    // CustomerForm submission. The module validates; the existing form saves.
    if (!(new RegistrationValidator())->validate($context, $values)) { return false; }
    $translator = $context->getTranslator();
    $formatter = (new CustomerFormatter($translator, $context->language))
        ->setAskForPartnerOptin(false)->setAskForBirthdate(false)->setPartnerOptinRequired(false);
    $form = new CustomerForm($context->smarty, $context, $translator, $formatter,
        new CustomerPersister($context, new Hashing(), $translator, false), []);
    return $form->setGuestAllowed(false)->fillWith($values)->submit();
}

try {
    $guest = guestFixture('returning@example.test');
    $orders = Customer::$orders;
    $oldGuest = clone Customer::$records[$guest->id];
    $context = freshContext();
    $values = registrationValues($guest->email);
    check(register($context, $values), 'Returning guest without a session could not register.');
    check(!$context->customer->is_guest && $context->customer->id !== $guest->id, 'Returning registration did not create a registered account.');
    check(Customer::$records[$guest->id] == $oldGuest && Customer::$orders === $orders, 'Registration changed the previous guest or its order ownership.');
    check((new Customer())->getByEmail($values['email'], $values['password'])->id === $context->customer->id, 'New account cannot authenticate with the chosen password.');
    check((new Customer())->getByEmail($values['email'], 'wrong-password') === false, 'New account accepts an incorrect password.');
    check(in_array('actionCustomerAccountAdd', Hook::$events, true), 'Creation hook was not dispatched.');
    check(($_SESSION['analytics_account_event'] ?? null) === 'register', 'Registered account analytics were not retained.');
    check(count(Mail::$sent) === 1, 'Registered customer did not receive one simulated welcome email.');

    $guest = guestFixture('session@example.test');
    $orders = Customer::$orders;
    $context = freshContext(new Customer($guest->id));
    $values = registrationValues($guest->email);
    check(register($context, $values), 'Guest in the current session could not register.');
    check($context->customer->id === $guest->id && count(Customer::$records) === 1, 'Session guest was duplicated instead of converted.');
    check(!Customer::$records[$guest->id]->is_guest, 'Converted customer still has the guest flag.');
    check(Customer::$records[$guest->id]->id_default_group === 3 && Customer::$records[$guest->id]->groups === [3], 'Conversion did not assign the customer group.');
    check(Customer::$orders === $orders, 'Session conversion changed order ownership.');
    check((new Customer())->getByEmail($values['email'], $values['password'])->id === $guest->id, 'Converted guest cannot authenticate.');
    check(in_array('actionCustomerAccountUpdate', Hook::$events, true), 'Conversion hook was not dispatched.');
    check(count(Mail::$sent) === 1, 'Converted guest did not receive one simulated welcome email.');

    // A real account already occupies this email after conversion. Neither a
    // matching password nor another active guest session may create a duplicate.
    foreach (['Fresh!Autumn#Trail-63', 'Different!Winter#Field-92'] as $password) {
        $before = serialize(Customer::$records);
        $saves = Customer::$saveCount;
        $context = freshContext();
        $duplicate = array_replace($values, ['password' => $password, 'email' => strtoupper($values['email']), 'validate_email' => strtoupper($values['email'])]);
        check(!register($context, $duplicate), 'Existing registered email was accepted.');
        check(Customer::$saveCount === $saves && serialize(Customer::$records) === $before, 'Duplicate registration changed customer records.');
        check($context->controller->errors !== [] && Mail::$sent === [], 'Duplicate registration did not show an error or sent mail.');
    }
    $otherGuest = new Customer();
    $otherGuest->email = 'other-guest@example.test';
    $otherGuest->is_guest = true;
    $otherGuest->save();
    $context = freshContext(new Customer($otherGuest->id));
    $saves = Customer::$saveCount;
    check(!register($context, $values), 'A different active guest could convert into an existing registered email.');
    check(Customer::$saveCount === $saves && Customer::$records[$otherGuest->id]->is_guest, 'Rejected conversion modified the guest.');

    foreach ([
        'empty password' => ['password' => ''],
        'short password' => ['password' => 'Ab2!'],
        'weak password' => ['password' => 'passwordpassword'],
        'long password' => ['password' => str_repeat('A', 73)],
        'empty first name' => ['firstname' => ''],
        'invalid first name' => ['firstname' => '<script>'],
        'empty last name' => ['lastname' => ''],
        'missing email' => ['email' => '', 'validate_email' => ''],
        'invalid email' => ['email' => 'not-an-email', 'validate_email' => 'not-an-email'],
        'mismatched email confirmation' => ['validate_email' => 'different@example.test'],
        'missing email confirmation' => ['validate_email' => ''],
    ] as $label => $invalid) {
        foreach ([false, true] as $activeGuest) {
            $guest = guestFixture('invalid@example.test');
            $before = serialize(Customer::$records);
            $orders = Customer::$orders;
            $context = freshContext($activeGuest ? new Customer($guest->id) : null);
            $saves = Customer::$saveCount;
            check(!register($context, array_replace(registrationValues($guest->email), $invalid)), 'Accepted ' . $label . ' (active guest: ' . (int) $activeGuest . ').');
            check(Customer::$saveCount === $saves && serialize(Customer::$records) === $before && Customer::$orders === $orders, 'Invalid registration changed persisted data: ' . $label);
            check($context->controller->errors !== [] && Mail::$sent === [], 'Invalid registration did not show errors or sent mail: ' . $label);
        }
    }
    $context = freshContext();
    $missingPassword = registrationValues('invalid@example.test');
    unset($missingPassword['password']);
    check(!register($context, $missingPassword), 'Omitted password was accepted.');

    Hook::$requireConsent = true;
    $context = freshContext();
    check(!register($context, registrationValues('consent@example.test')), 'Required module consent field was ignored.');
    Hook::$requireConsent = false;

    $context = freshContext();
    $context->controller->php_self = 'order';
    check((new RegistrationValidator())->validate($context, []), 'Registration validation interferes with guest checkout.');
    $checkoutGuest = guestFixture('checkout@example.test');
    $orders = Customer::$orders;
    Hook::exec('actionCustomerAccountAdd', ['newCustomer' => $checkoutGuest]);
    check(!isset($_SESSION['analytics_account_event']) && Customer::$orders === $orders, 'Guest checkout claimed orders or fired registered account analytics.');

    echo "Guest registration checks passed: new and active sessions, login hashes, customer groups, duplicate accounts, required fields/password policy, module consent, and unchanged order ownership.\n";
} catch (Throwable $error) {
    fwrite(STDERR, 'Guest registration check failed: ' . $error->getMessage() . "\n" . $error->getTraceAsString() . "\n");
    exit(1);
}
