<?php

declare(strict_types=1);

namespace MsThemeConfig\Service;

final class GuestAccountEmail
{
    /**
     * Older generated mail templates do not contain the password setup URL.
     * The mail hook runs before PrestaShop replaces the {url} placeholder.
     */
    public static function ensurePasswordSetupLink(array &$params, string $instructions): void
    {
        if (($params['template'] ?? null) !== 'guest_to_customer') {
            return;
        }

        if (isset($params['template_html']) && is_string($params['template_html'])
            && !preg_match('~\bhref\s*=\s*(["\'])\{url\}\1~i', $params['template_html'])
        ) {
            $paragraph = '<p style="font-family:Arial,sans-serif;font-size:16px;line-height:25px;">'
                . htmlspecialchars($instructions, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
                . '<br><a href="{url}" style="word-break:break-all;">{url}</a></p>';
            $bodyEnd = strripos($params['template_html'], '</body>');
            $params['template_html'] = $bodyEnd === false
                ? $params['template_html'] . $paragraph
                : substr_replace($params['template_html'], $paragraph, $bodyEnd, 0);
        }

        if (isset($params['template_txt']) && is_string($params['template_txt'])
            && strpos($params['template_txt'], '{url}') === false
        ) {
            $params['template_txt'] = rtrim($params['template_txt']) . "\n\n" . $instructions . "\n{url}\n";
        }
    }
}
