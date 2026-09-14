<?php

declare(strict_types=1);

/** php tests/guest-account-email-test.php; does not send email or load the shop. */
if (PHP_SAPI !== 'cli') {
    exit(1);
}

require __DIR__ . '/../src/Service/GuestAccountEmail.php';

use MsThemeConfig\Service\GuestAccountEmail;

function check(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

$instructions = 'Klik op de volgende link om uw wachtwoord in te stellen:';
$html = '<html><body><p>Welkom als klant.</p></body></html>';
$text = 'Welkom als klant.';
$params = [
    'template' => 'guest_to_customer',
    'template_html' => &$html,
    'template_txt' => &$text,
];
GuestAccountEmail::ensurePasswordSetupLink($params, $instructions);
check(str_contains($html, 'href="{url}"'), 'An old HTML email must receive a clickable password setup link.');
check(strpos($html, 'href="{url}"') < strpos($html, '</body>'), 'The link must be inserted inside the email body.');
check(str_contains($text, $instructions . "\n{url}\n"), 'An old text email must receive the translated instructions and URL.');
$once = [$html, $text];
GuestAccountEmail::ensurePasswordSetupLink($params, $instructions);
check([$html, $text] === $once, 'Repeated hooks must not duplicate the password setup links.');

$updated = [
    'template' => 'guest_to_customer',
    'template_html' => '<html><body><a href="{url}">Stel uw wachtwoord in</a></body></html>',
    'template_txt' => "Stel uw wachtwoord in: {url}\n",
];
$original = $updated;
GuestAccountEmail::ensurePasswordSetupLink($updated, $instructions);
check($updated === $original, 'Newly generated templates must remain unchanged.');

$partial = [
    'template' => 'guest_to_customer',
    'template_html' => "<BODY><a HREF = '{url}'>Password</a></BODY>",
    'template_txt' => 'Welkom.',
];
$originalHtml = $partial['template_html'];
GuestAccountEmail::ensurePasswordSetupLink($partial, $instructions);
check($partial['template_html'] === $originalHtml, 'Existing links with single quotes or different casing must not duplicate.');
check(str_contains($partial['template_txt'], '{url}'), 'HTML and text missing links must be repaired independently.');

$fragment = ['template' => 'guest_to_customer', 'template_html' => '<p>Welkom.</p>'];
GuestAccountEmail::ensurePasswordSetupLink($fragment, 'Use <this> & "link":');
check(str_contains($fragment['template_html'], '&lt;this&gt; &amp; &quot;link&quot;'), 'Translated instructions must be escaped in HTML.');
check(str_contains($fragment['template_html'], 'href="{url}"'), 'HTML fragments without a body must still receive the link.');

foreach (['account', 'password_query', 'order_conf', null] as $template) {
    $other = ['template' => $template, 'template_html' => '<p>Other email.</p>', 'template_txt' => 'Other email.'];
    $original = $other;
    GuestAccountEmail::ensurePasswordSetupLink($other, $instructions);
    check($other === $original, 'Other email templates must remain unchanged.');
}

echo "Guest account email checks passed.\n";
