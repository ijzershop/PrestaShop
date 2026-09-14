<?php

declare(strict_types=1);

/**
 * php modules/msthemeconfig/tests/guest-login-test.php
 * Tests notification handling with real email validation and XLIFF translations.
 * No PrestaShop bootstrap, live database, authentication, or email delivery.
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$shopRoot = __DIR__;
while (!is_file($shopRoot . '/classes/Validate.php')) {
    $parent = dirname($shopRoot);
    if ($parent === $shopRoot) {
        throw new RuntimeException('Run this test from a PrestaShop installation.');
    }
    $shopRoot = $parent;
}
require $shopRoot . '/vendor/autoload.php';
require $shopRoot . '/classes/Validate.php';
class_alias('ValidateCore', 'Validate');
require __DIR__ . '/../src/Customer/GuestLoginNotification.php';

final class Context
{
    public $controller;
    public $customer;
    public $link;
    public $translator;
    public function getTranslator() { return $this->translator; }
    public function updateCustomer($customer) { throw new RuntimeException('A guest notification must not authenticate.'); }
}

final class Tools
{
    public static array $values = [];
    public static function isSubmit($name) { return isset(self::$values[$name]); }
    public static function getValue($name) { return self::$values[$name] ?? false; }
}

final class Customer
{
    public static array $records = [];
    public static function getCustomersByEmail($email) {
        return array_values(array_filter(self::$records, static fn(array $row): bool => strcasecmp($row['email'], $email) === 0));
    }
}

const UNKNOWN_EMAIL = 'Dit email adres is niet gevonden in ons klantbestand';
const GUEST_MESSAGE = 'You previously ordered as a guest. Please register again with this email address to create a customer account.';
const GUEST_LABEL = 'Create a customer account';
const DUTCH_MESSAGE = 'U heeft eerder als gast besteld. Registreer u opnieuw met dit e-mailadres om een klantaccount aan te maken.';

function notificationContext(string $locale = 'en-US'): Context
{
    $context = new Context();
    $context->controller = (object) ['errors' => ['email' => [UNKNOWN_EMAIL]]];
    $context->customer = (object) ['id' => null, 'is_guest' => false];
    $context->link = new class {
        public string $url = 'https://shop.example.test/registration';
        public function getPageLink($page, $ssl) {
            if ($page !== 'registration' || !$ssl) {
                throw new RuntimeException('The link must open secure account registration.');
            }
            return $this->url;
        }
    };
    $context->translator = new Symfony\Component\Translation\Translator($locale);
    $context->translator->addLoader('xlf', new Symfony\Component\Translation\Loader\XliffFileLoader());
    $context->translator->addResource('xlf', __DIR__ . '/../translations/nl-NL/ModulesMsthemeconfigShop.nl-NL.xlf', 'nl-NL', 'Modules.Msthemeconfig.Shop');
    Tools::$values = ['submitLogin' => '1', 'email' => 'guest@example.test'];
    Customer::$records = [['email' => 'guest@example.test', 'is_guest' => 1, 'deleted' => 0]];
    return $context;
}

function updatedErrors(Context $context): array
{
    $customer = clone $context->customer;
    (new MsThemeConfig\Customer\GuestLoginNotification())->update($context);
    if ($context->customer != $customer) {
        throw new RuntimeException('The notification changed the customer session.');
    }
    return $context->controller->errors;
}

function same($expected, $actual, string $name): void
{
    if ($expected !== $actual) {
        throw new RuntimeException($name . ': ' . json_encode($actual));
    }
    echo 'PASS ' . $name . PHP_EOL;
}

$context = notificationContext();
same(['email' => [GUEST_MESSAGE . ' <a href="https://shop.example.test/registration">' . GUEST_LABEL . '</a>']], updatedErrors($context), 'guest-only email receives registration guidance without login');
$context = notificationContext();
Customer::$records = [];
same($context->controller->errors, updatedErrors($context), 'unknown email retains the existing error');
$context = notificationContext();
Customer::$records[] = ['email' => 'guest@example.test', 'is_guest' => 0, 'deleted' => 0];
$context->controller->errors['email'] = ['De combinatie email adres en wachtwoord is onjuist!'];
same($context->controller->errors, updatedErrors($context), 'registered account with guest history retains wrong-password error');
$context->controller->errors['email'] = [UNKNOWN_EMAIL];
same($context->controller->errors, updatedErrors($context), 'registered account takes priority even with an unknown-email error');
$context = notificationContext();
Customer::$records[0]['deleted'] = 1;
same($context->controller->errors, updatedErrors($context), 'deleted guest alone does not receive registration guidance');
$context = notificationContext();
$context->controller->errors['email'][] = 'Another email validation error';
$context->controller->errors['password'] = ['Password is required'];
$context->controller->errors[] = 'Other module error';
$expected = $context->controller->errors;
$expected['email'][0] = GUEST_MESSAGE . ' <a href="https://shop.example.test/registration">' . GUEST_LABEL . '</a>';
same($expected, updatedErrors($context), 'unrelated email, password, and module errors are preserved');
$context = notificationContext('nl-NL');
same(['email' => [DUTCH_MESSAGE . ' <a href="https://shop.example.test/registration">Klantaccount aanmaken</a>']], updatedErrors($context), 'actual Dutch XLIFF translates guidance and link');
require __DIR__ . '/../translations/nl.php';
same(DUTCH_MESSAGE, $_MODULE['<{msthemeconfig}prestashop>shop_' . md5(GUEST_MESSAGE)] ?? null, 'legacy Dutch guidance uses the correct translation key');
same('Klantaccount aanmaken', $_MODULE['<{msthemeconfig}prestashop>shop_' . md5(GUEST_LABEL)] ?? null, 'legacy Dutch link uses the correct translation key');
$context = notificationContext();
$context->link->url = 'https://shop.example.test/registration?a="quoted"&b=<script>';
same(['email' => [GUEST_MESSAGE . ' <a href="https://shop.example.test/registration?a=&quot;quoted&quot;&amp;b=&lt;script&gt;">' . GUEST_LABEL . '</a>']], updatedErrors($context), 'dynamic registration URL is escaped');
foreach ([[], ['email' => 'guest@example.test'], ['submitLogin' => '1', 'email' => ['invalid']], ['submitLogin' => '1', 'email' => 'invalid']] as $values) {
    $context = notificationContext();
    Tools::$values = $values;
    same($context->controller->errors, updatedErrors($context), 'non-login or invalid email input is ignored');
}
