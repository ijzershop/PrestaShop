<?php
/**
 * Advertising-consent synchronization endpoint.
 *
 * The cookie modal calls this with sendBeacon after an explicit marketing choice. This persists
 * a grant (and available first-party identifiers) before a redirect payment can start, and makes
 * identifier removal after a refusal immediate.
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class MsthemeconfigAdconsentModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');

        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
            $this->respond(false, 'method');
        }

        // Trust the actual first-party consent cookie, never a POSTed boolean. A cross-site
        // request therefore cannot grant tracking or clear a consented cart by choosing a body.
        $consent = null;
        if (!empty($_COOKIE['cookie-consent'])) {
            $decoded = json_decode((string)$_COOKIE['cookie-consent'], true);
            if (is_array($decoded) && array_key_exists('marketing', $decoded)) {
                $consent = $decoded['marketing'];
            }
        }
        if ($consent === true || $consent === 1 || $consent === '1') {
            $consent = 1;
        } elseif ($consent === false || $consent === 0 || $consent === '0') {
            $consent = 0;
        } else {
            $this->respond(false, 'unknown_consent');
        }

        $context = Context::getContext();
        $idCart = (int)($context->cart->id ?? 0);
        if ($idCart <= 0) {
            $this->respond(true, 'no_cart');
        }

        $identifierCookies = [
            'ad_gclid' => ['ms_ad_gclid'],
            'ad_gbraid' => ['ms_ad_gbraid'],
            'ad_wbraid' => ['ms_ad_wbraid'],
            'ad_gcl_au' => ['_gcl_au'],
            'ad_gcl_aw' => ['_gcl_aw'],
            'ad_meta_fbp' => ['_fbp'],
            'ad_meta_fbc' => ['_fbc', 'ms_ad_fbc'],
            'ad_msclkid' => ['_uetmsclkid', 'ms_ad_msclkid'],
        ];
        $assignments = [
            '`ad_marketing_consent` = ' . $consent,
            '`date_upd` = NOW()',
        ];

        if ($consent === 0) {
            foreach (array_keys($identifierCookies) as $column) {
                $assignments[] = '`' . $column . '` = NULL';
            }
        } else {
            // A few Conversion Linker configurations suffix _gcl_aw with a destination ID.
            if (empty($_COOKIE['_gcl_aw'])) {
                foreach ($_COOKIE as $name => $value) {
                    if (is_string($name) && strpos($name, '_gcl_aw_') === 0) {
                        $identifierCookies['ad_gcl_aw'][] = $name;
                        break;
                    }
                }
            }

            foreach ($identifierCookies as $column => $cookieNames) {
                $value = '';
                foreach ($cookieNames as $cookieName) {
                    $candidate = $_COOKIE[$cookieName] ?? null;
                    if (!is_scalar($candidate)) {
                        continue;
                    }
                    $candidate = trim((string)$candidate);
                    if (preg_match('/\A[A-Za-z0-9._~:-]{1,255}\z/D', $candidate) === 1) {
                        $value = $candidate;
                        break;
                    }
                }
                if ($value !== '') {
                    $assignments[] = '`' . $column . '` = \'' . pSQL($value) . '\'';
                }
            }
        }

        try {
            $stored = (bool)Db::getInstance()->execute(
                'UPDATE `' . _DB_PREFIX_ . 'cart` SET ' . implode(', ', $assignments)
                . ' WHERE `id_cart` = ' . $idCart
            );
        } catch (Throwable $e) {
            $stored = false;
        }

        $this->respond($stored, $stored ? ($consent === 1 ? 'stored' : 'cleared') : 'database');
    }

    private function respond(bool $ok, string $status): void
    {
        die(json_encode(['ok' => $ok, 'status' => $status]));
    }
}
