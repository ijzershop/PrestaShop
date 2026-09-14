<?php
declare(strict_types=1);

/**
 * php tests/koopman-return-ui-test.php
 * Renders with the installed PrestaShop Twig/Smarty libraries; no shop bootstrap, database or HTTP.
 * --fixture outputs the HTML and scripts consumed by koopman-return-ui-browser-test.js.
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$shopRoot = __DIR__;
while (!is_file($shopRoot . '/vendor/smarty/smarty/libs/Smarty.class.php')) {
    $parent = dirname($shopRoot);
    if ($parent === $shopRoot) {
        throw new RuntimeException('Run inside a PrestaShop checkout with its Composer dependencies installed.');
    }
    $shopRoot = $parent;
}
require $shopRoot . '/vendor/autoload.php';
require_once $shopRoot . '/vendor/smarty/smarty/libs/Smarty.class.php';

$views = dirname(__DIR__) . '/views/';
$compile = sys_get_temp_dir() . '/koopman-ui-compile-' . bin2hex(random_bytes(6));
mkdir($compile);
$smarty = new Smarty();
$smarty->setCompileDir($compile);
$malicious = '<img src=x onerror=alert(1)>"&';
$vars = [
    'id_order' => 123,
    'order' => (object) ['reference' => $malicious],
    'retour_submit_url' => 'https://shop.example/admin/return?x=1&y=2',
    'retour_token' => $malicious,
    'retour_request_key' => '0123456789',
    'retour_pickup_date' => '2026-09-10',
    'retour_min_pickup_date' => '2026-09-09',
    'retour_address' => array_fill_keys([
        'name', 'company', 'address1', 'address2', 'house_number', 'house_number_extension',
        'postcode', 'city', 'country', 'phone',
    ], $malicious),
    'retour_packages' => [['shipping_number' => $malicious, 'length' => 30, 'width' => 20, 'height' => 10, 'weight' => 2]],
    'retour_products' => [['product_quantity' => 2, 'product_name' => $malicious]],
    'retour_created' => false,
    'retour_blocked' => false,
    'retour_message' => $malicious,
    'retour_preflight_error' => '',
    'retour_tracking' => '',
    'retour_labels' => [],
    'retour_return_id' => 456,
    'retour_send_url' => 'https://shop.example/admin/return/send?x=1&y=2',
    'retour_customer_email' => 'customer@example.com' . $malicious,
];
$checks = 0;
$check = static function (bool $ok, string $message) use (&$checks): void {
    if (!$ok) {
        throw new RuntimeException($message);
    }
    ++$checks;
};

try {
    $forms = [];
    foreach (['new', 'created', 'blocked', 'email_sent', 'email_failed', 'email_sending', 'email_uncertain', 'email_missing'] as $state) {
        $isCreated = $state === 'created' || str_starts_with($state, 'email_');
        $vars['retour_created'] = $isCreated;
        $vars['retour_blocked'] = $state === 'blocked';
        $vars['retour_tracking'] = $isCreated ? $malicious : '';
        $vars['retour_labels'] = $isCreated && $state !== 'email_missing' ? [[
            'url' => '/return/label?id=1&n=0', 'label' => $malicious,
            'preview_url' => 'https://shop.example/admin/return/preview?id=1&n=0',
        ]] : [];
        $vars['retour_notification'] = [
            'status' => str_starts_with($state, 'email_') ? substr($state, 6) : 'unsent',
            'can_send' => in_array($state, ['created', 'email_failed'], true),
            'message' => $malicious,
        ];
        $template = $smarty->createTemplate($views . 'templates/admin/retourform.tpl');
        $template->assign($vars);
        $html = $forms[$state] = $template->fetch();
        $check(str_starts_with(trim($html), '<form '), $state . ' renders without PHP/Smarty warnings');
        $check(!str_contains($html, '<img'), $state . ' must escape untrusted content');
        $check(str_contains($html, 'saveRetourRequest') === ($state === 'new'), $state . ' booking controls');
        $check(str_contains($html, 'retour-package-template') === ($state === 'new'), $state . ' package editor');
        $check(str_contains($html, 'class="retour-review-stage" hidden') === !$isCreated, $state . ' preview stage visibility');
        if ($isCreated && $state !== 'email_missing') {
            $check(str_contains($html, '/return/label?id=1&amp;n=0'), 'label URL escaped');
            $check(str_contains($html, 'preview?id=1&amp;n=0'), 'inline preview URL escaped');
        }
        if ($isCreated) {
            $check(str_contains($html, 'cancelRetourLabel'), $state . ' has Cancel action');
            $check(str_contains($html, 'class="btn btn-success sendRetourToCustomer" disabled') === !$vars['retour_notification']['can_send'], $state . ' email send availability');
        }
    }

    // Keep this fixture separate from browser fixtures: it verifies the warning
    // is actionable even though opening the popup itself remains a successful GET.
    $phoneWarning = 'Telefoonnummer klant ontbreekt. Pas het afleveradres aan. ' . $malicious;
    $phoneTemplate = $smarty->createTemplate($views . 'templates/admin/retourform.tpl');
    $phoneTemplate->assign(array_replace($vars, [
        'retour_created' => false,
        'retour_blocked' => false,
        'retour_message' => '',
        'retour_tracking' => '',
        'retour_labels' => [],
        'retour_preflight_error' => $phoneWarning,
    ]));
    $phoneHtml = $phoneTemplate->fetch();
    $check(str_starts_with(trim($phoneHtml), '<form '), 'missing-phone warning renders inside the popup form');
    $check(str_contains($phoneHtml, 'Telefoonnummer klant ontbreekt. Pas het afleveradres aan.'), 'missing-phone warning gives an actionable explanation');
    $check(str_contains($phoneHtml, htmlspecialchars($phoneWarning, ENT_QUOTES, 'UTF-8')) && !str_contains($phoneHtml, '<img'), 'phone preflight warning escapes untrusted content');
    $check(!str_contains($phoneHtml, 'retour-booking-fields') && !str_contains($phoneHtml, 'saveRetourRequest'), 'invalid phone omits booking fields and submission action');
    $check(!str_contains($phoneHtml, 'retour-package-template') && !str_contains($phoneHtml, 'addNewCollie'), 'invalid phone omits the package editor');

    $weightTemplate = $smarty->createTemplate($views . 'templates/admin/retourform.tpl');
    $weightTemplate->assign(array_replace($vars, [
        'retour_created' => false,
        'retour_blocked' => false,
        'retour_products' => [
            ['product_quantity' => 2, 'product_name' => 'Two pieces', 'retour_weight' => '2,500'],
            ['product_quantity' => 1, 'product_name' => 'Known zero', 'retour_weight' => '0,000'],
            ['product_quantity' => 1, 'product_name' => 'Unknown weight', 'retour_weight' => null],
            ['product_quantity' => $malicious, 'product_name' => $malicious, 'retour_weight' => $malicious],
        ],
    ]));
    $weightHtml = $weightTemplate->fetch();
    $check(str_contains($weightHtml, 'Gewicht: 2,500 kg'), 'product row displays formatted quantity-weight total');
    $check(str_contains($weightHtml, 'Gewicht: 0,000 kg'), 'known zero product weight remains visible');
    $check(str_contains($weightHtml, 'Gewicht onbekend') && str_contains($forms['new'], 'Gewicht onbekend'), 'null and missing product weights are described as unknown');
    $check(str_contains($weightHtml, 'Gewicht: ' . htmlspecialchars($malicious, ENT_QUOTES, 'UTF-8') . ' kg') && !str_contains($weightHtml, '<img'), 'product quantities, names and displayed weights are escaped');

    $formDocument = new DOMDocument();
    $previousLibxmlErrors = libxml_use_internal_errors(true);
    try {
        $formDocument->loadHTML($forms['new']);
    } finally {
        libxml_clear_errors();
        libxml_use_internal_errors($previousLibxmlErrors);
    }
    $formXPath = new DOMXPath($formDocument);
    $packageTypes = $formXPath->query('//template[@id="retour-package-template"]//select[@name="collie_type[]"]');
    $check($packageTypes->length === 1 && $packageTypes->item(0)->hasAttribute('required'), 'package type requires an explicit choice');
    $packageOptions = $formXPath->query('.//option', $packageTypes->item(0));
    $optionValues = [];
    foreach ($packageOptions as $option) {
        $optionValues[] = $option->getAttribute('value');
    }
    $check($optionValues === ['', 'envelope', 'plaat', '1-meter', '2-meter', 'pallet', 'plaat-pallet', 'balk-pallet'], 'package selector contains placeholder and seven local package names');
    $check(trim($packageOptions->item(1)->textContent) === 'Envelop', 'envelope has the requested Dutch label');
    foreach (['length', 'width', 'height'] as $dimension) {
        $input = $formXPath->query('//template[@id="retour-package-template"]//input[@name="collie_' . $dimension . '[]"]')->item(0);
        $check($input !== null && $input->getAttribute('min') === '0.01' && $input->getAttribute('step') === '0.01', $dimension . ' accepts two-decimal dimensions including lightweight package widths');
        $check(!$input->hasAttribute('readonly') && !$input->hasAttribute('disabled') && $input->getAttribute('value') === '', $dimension . ' starts blank and remains editable');
    }
    $weightInput = $formXPath->query('//template[@id="retour-package-template"]//input[@name="collie_weight[]"]')->item(0);
    $check($weightInput !== null && $weightInput->getAttribute('value') === '' && $weightInput->hasAttribute('required'), 'package weight starts blank and must be entered');

    $twig = new Twig\Environment(new Twig\Loader\FilesystemLoader($views), ['autoescape' => 'html']);
    $options = [
        'acceptedStates' => [5, 7], 'createdStates' => [8],
        'retourUrl' => '/admin/return?a=1&b=2', 'label' => $malicious, 'icon' => 'undo',
    ];
    $buttonTemplate = 'PrestaShop/Admin/Common/Grid/Columns/Content/koopman_retour_button.html.twig';
    foreach ([5 => true, 7 => true, 8 => true, 0 => false, 1 => false, 9 => false] as $state => $allowed) {
        $html = $twig->render($buttonTemplate, [
            'record' => ['id_order' => 123, 'current_state' => (string) $state],
            'column' => ['options' => $options],
        ]);
        $check(str_contains($html, 'createRetour') === $allowed, 'status values vs keys: ' . $state);
        $check(!str_contains($html, '<img'), 'button attributes escaped');
        if ($state === 8) {
            $check(str_contains($html, 'text-success'), 'created outside accepted still viewable');
        }
    }
    $options['acceptedStates'][] = 8;
    $html = $twig->render($buttonTemplate, [
        'record' => ['id_order' => 123, 'current_state' => 8],
        'column' => ['options' => $options],
    ]);
    $check(str_contains($html, 'text-success'), 'created precedence over accepted');

    if (in_array('--fixture', $argv, true)) {
        echo json_encode([
            'forms' => $forms,
            'jquery' => file_get_contents($shopRoot . '/js/jquery/jquery-3.7.1.min.js'),
            'koopman' => file_get_contents($views . 'js/koopman.js'),
        ], JSON_THROW_ON_ERROR);
    } else {
        echo 'Passed ' . $checks . " template assertions\n";
    }
} finally {
    foreach (glob($compile . '/*') as $compiled) {
        unlink($compiled);
    }
    rmdir($compile);
}
