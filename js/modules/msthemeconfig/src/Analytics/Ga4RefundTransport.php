<?php
declare(strict_types=1);

namespace MsThemeConfig\Analytics;

use DomainException;
use RuntimeException;

final class Ga4RefundTransport
{
    public static function request(array $snapshot, array $payload): array
    {
        $endpoint = rtrim(trim((string)($snapshot['endpoint'] ?? '')), '/');
        $parts = parse_url($endpoint);
        if (!is_array($parts) || strtolower($parts['scheme'] ?? '') !== 'https'
            || empty($parts['host']) || ($parts['path'] ?? '') !== '/mp/collect'
            || isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment'])) {
            throw new DomainException('invalid_refund_endpoint');
        }
        $measurementId = trim((string)($snapshot['measurement_id'] ?? ''));
        $apiSecret = trim((string)($snapshot['api_secret'] ?? ''));
        if (!preg_match('/^G-[A-Z0-9]+$/D', $measurementId) || $apiSecret === '') {
            throw new DomainException('missing_refund_configuration');
        }
        $headers = ['Content-Type: application/json'];
        if (self::isFirstParty($endpoint)) {
            $consent = Ga4RefundBuilder::consent($snapshot['order']);
            $headers[] = 'X-MS-Analytics-Consent: ' . ($consent === 1 ? 'granted' : 'unknown');
            // This is an analytics-only correction, not a new advertising conversion.
            $headers[] = 'X-MS-Marketing-Consent: denied';
        }
        $body = json_encode($payload, JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);
        if (strlen($body) >= 130000) {
            throw new DomainException('refund_payload_too_large');
        }

        return [
            'url' => $endpoint . '?measurement_id=' . rawurlencode($measurementId) . '&api_secret=' . rawurlencode($apiSecret),
            'headers' => $headers,
            'body' => $body,
        ];
    }

    public static function isFirstParty(string $endpoint): bool
    {
        $host = strtolower((string)parse_url($endpoint, PHP_URL_HOST));

        return $host !== '' && $host !== 'google-analytics.com' && !str_ends_with($host, '.google-analytics.com');
    }

    /** Return codes only. Neither credentials, payloads nor remote response bodies enter logs. */
    public static function send(array $request): array
    {
        $handle = curl_init($request['url']);
        if ($handle === false) {
            throw new RuntimeException('refund_http_initialization_failed');
        }
        try {
            if (!curl_setopt_array($handle, [
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $request['body'],
                CURLOPT_HTTPHEADER => $request['headers'],
                CURLOPT_USERAGENT => 'ModernSmid-GA4-Refund/1.0',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CONNECTTIMEOUT => 2,
                CURLOPT_TIMEOUT => 5,
                CURLOPT_FOLLOWLOCATION => false,
                CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
            ])) {
                throw new RuntimeException('refund_http_configuration_failed');
            }
            curl_exec($handle);

            return [
                'http_status' => (int)curl_getinfo($handle, CURLINFO_HTTP_CODE),
                'curl_errno' => curl_errno($handle),
            ];
        } finally {
            curl_close($handle);
        }
    }

    /** A timeout or server error may occur after forwarding; never retry it automatically. */
    public static function outcome(array $response): string
    {
        $status = (int)($response['http_status'] ?? 0);
        $error = (int)($response['curl_errno'] ?? -1);
        if ($error === 0 && $status >= 200 && $status < 300) {
            return 'accepted';
        }
        // Initialization/URL/DNS/connect failures are known not to have delivered an HTTP body.
        if ($status === 0 && in_array($error, [1, 2, 3, 5, 6, 7], true)) {
            return 'failed';
        }

        return 'uncertain';
    }
}
