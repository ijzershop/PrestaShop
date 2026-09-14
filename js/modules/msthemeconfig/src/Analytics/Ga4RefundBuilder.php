<?php
declare(strict_types=1);

namespace MsThemeConfig\Analytics;

use DomainException;

/**
 * Builds analytics from a persisted credit note, never from a cart or an admin form.
 * This class has no database, HTTP, cookie, session or financial side effects.
 */
final class Ga4RefundBuilder
{
    public const MAX_AGE_SECONDS = 72 * 3600;

    public static function eventId(int $shopId, int $slipId): string
    {
        return 'refund-' . $shopId . '-' . $slipId;
    }

    public static function consent(array $order): ?int
    {
        $value = $order['ga_analytics_consent'] ?? null;
        if ($value === null) {
            return null;
        }
        if (!in_array($value, [0, 1, '0', '1'], true)) {
            throw new DomainException('invalid_analytics_consent');
        }

        return (int)$value;
    }

    public static function build(array $snapshot, int $now): array
    {
        $order = $snapshot['order'];
        $slip = $snapshot['slip'];
        $lines = $snapshot['lines'];
        $orderId = (int)($order['id_order'] ?? 0);
        $shopId = (int)($order['id_shop'] ?? 0);
        $slipId = (int)($slip['id_order_slip'] ?? 0);
        if ($orderId <= 0 || $shopId <= 0 || $slipId <= 0 || (int)($slip['id_order'] ?? 0) !== $orderId) {
            throw new DomainException('credit_note_order_mismatch');
        }
        if (self::consent($order) === 0) {
            throw new DomainException('analytics_consent_denied');
        }

        $reference = trim((string)($order['reference'] ?? ''));
        if ($reference === '' || strlen($reference) > 100) {
            throw new DomainException('invalid_order_reference');
        }
        $timestamp = (int)($snapshot['timestamp'] ?? 0);
        if ($timestamp <= 0 || $timestamp > $now + 300) {
            throw new DomainException('invalid_credit_note_timestamp');
        }
        if ($now - $timestamp >= self::MAX_AGE_SECONDS) {
            throw new DomainException('credit_note_older_than_72_hours');
        }

        $currency = strtoupper((string)($snapshot['currency'] ?? ''));
        $precision = (int)($snapshot['currency_precision'] ?? 2);
        if (!preg_match('/^[A-Z]{3}$/D', $currency) || $precision < 0 || $precision > 6) {
            throw new DomainException('invalid_currency');
        }
        $factor = 10 ** $precision;
        $tolerance = 1 / $factor + 0.000001;
        $productsExcl = self::amount($slip['total_products_tax_excl'] ?? null);
        $productsIncl = self::amount($slip['total_products_tax_incl'] ?? null);
        $shippingExcl = self::amount($slip['total_shipping_tax_excl'] ?? null);
        $shippingIncl = self::amount($slip['total_shipping_tax_incl'] ?? null);

        // PS's legacy voucher modes can put a display-tax-dependent override in amount,
        // without updating both tax totals. Do not silently turn that into the full refund.
        $slipType = (int)($slip['order_slip_type'] ?? 0);
        if ($slipType === 1) {
            throw new DomainException('voucher_refund_requires_reconciliation');
        }
        if ($slipType === 2) {
            $legacyAmount = self::amount($slip['amount'] ?? null);
            if (abs($legacyAmount - $productsExcl) > $tolerance
                && abs($legacyAmount - $productsIncl) > $tolerance) {
                throw new DomainException('specific_refund_amount_requires_reconciliation');
            }
        }
        if ($productsExcl < 0 || $productsIncl < 0 || $shippingExcl < 0 || $shippingIncl < 0
            || $productsIncl + $tolerance < $productsExcl || $shippingIncl + $tolerance < $shippingExcl) {
            throw new DomainException('inconsistent_credit_note_totals');
        }
        if (round($productsIncl + $shippingIncl, $precision) <= 0) {
            throw new DomainException('zero_refund');
        }

        $clientId = trim((string)($order['ga_client_id'] ?? ''));
        if ($clientId === '') {
            // Preserve the existing purchase identity for first-party sGTM. A new random
            // numeric ID would not recover the original purchaser. Direct MP rejects this
            // legacy format, so that route requires an actual stored GA client ID.
            $clientId = 'server-' . $orderId;
        }
        $numericClientId = preg_match('/^[0-9]+\.[0-9]+$/D', $clientId) === 1;
        $legacyClientId = !empty($snapshot['first_party']) && $clientId === 'server-' . $orderId;
        if (!$numericClientId && !$legacyClientId) {
            throw new DomainException('missing_or_invalid_ga_client_id');
        }

        $positiveLines = [];
        $positiveExcl = 0.0;
        $lineTotalExcl = 0.0;
        $lineTotalIncl = 0.0;
        $amountOnly = false;
        foreach ($lines as $line) {
            if ((int)($line['id_order'] ?? 0) !== $orderId
                || (int)($line['id_order_slip'] ?? 0) !== $slipId) {
                throw new DomainException('credit_note_line_order_mismatch');
            }
            $excl = self::amount($line['amount_tax_excl'] ?? null);
            $incl = self::amount($line['amount_tax_incl'] ?? null);
            $lineTotalExcl += $excl;
            $lineTotalIncl += $incl;
            if (($excl < 0 && $incl > 0) || ($excl > 0 && $incl < 0)) {
                throw new DomainException('inconsistent_credit_note_line');
            }
            // Negative return-cost lines are retained in the credit-note totals. They are
            // a deduction from the refund, not an additional returned product.
            if ($excl < 0 || $incl < 0) {
                continue;
            }
            $quantity = (int)($line['product_quantity'] ?? 0);
            if ($quantity < 0) {
                throw new DomainException('invalid_refund_quantity');
            }
            if ($quantity === 0) {
                $amountOnly = $amountOnly || $excl > 0 || $incl > 0;
                continue;
            }
            if ((int)($line['product_id'] ?? 0) <= 0) {
                throw new DomainException('missing_refunded_product');
            }
            $positiveLines[] = $line + ['refund_line_excl' => $excl];
            $positiveExcl += $excl;
        }
        // Core also labels a voucher refund as type 2 when shipping is refunded. Matching
        // the legacy amount alone cannot prove that both tax totals include the voucher.
        if ($slipType === 2 && (abs($productsExcl - $lineTotalExcl) > $tolerance
            || abs($productsIncl - $lineTotalIncl) > $tolerance)) {
            throw new DomainException('credit_note_lines_do_not_match_totals');
        }
        if (!$amountOnly && $productsExcl > $positiveExcl + $tolerance) {
            throw new DomainException('credit_note_lines_do_not_cover_total');
        }

        $value = round($productsExcl, $precision);
        $tax = round($productsIncl + $shippingIncl - $productsExcl - $shippingExcl, $precision);
        if ($tax < 0) {
            // The line/total tolerance must never turn inconsistent totals into negative VAT.
            throw new DomainException('inconsistent_credit_note_totals');
        }
        $params = [
            'transaction_id' => $reference,
            'event_id' => self::eventId($shopId, $slipId),
            'refund_id' => (string)$slipId,
            'cart_id' => (int)($order['id_cart'] ?? 0),
            'currency' => $currency,
            'value' => $value,
            'tax' => max(0.0, $tax),
            'shipping' => round($shippingExcl, $precision),
        ];
        if (!$amountOnly && $positiveLines !== []) {
            $params['items'] = self::items($positiveLines, $positiveExcl, $value, $factor);
        }
        if ($amountOnly) {
            // A monetary correction without a returned quantity must not invent item returns.
            $params['refund_items_status'] = 'amount_only';
        }

        // Keep classification tied to the original order, not to the employee creating the credit.
        foreach (['session_type', 'order_channel', 'shop_name', 'shop_domain', 'shipping_tier',
                  'payment_type', 'traffic_type'] as $key) {
            $text = (string)($snapshot['metadata'][$key] ?? '');
            if ($text !== '') {
                $params[$key] = self::shortText($text);
            }
        }
        $params['shop_id'] = (string)$shopId;
        if (!empty($snapshot['metadata']['page_location'])) {
            $params['page_location'] = (string)$snapshot['metadata']['page_location'];
        }
        $sessionId = (string)($order['ga_session_id'] ?? '');
        if (preg_match('/^[1-9][0-9]{0,12}$/D', $sessionId)) {
            $params['original_session_id'] = $sessionId;
            // A refund weeks later must not revive the purchaser's old browsing session.
            if ($timestamp >= (int)$sessionId && $timestamp - (int)$sessionId < 24 * 3600) {
                $params['session_id'] = $sessionId;
                $params['engagement_time_msec'] = 1;
            }
        }

        return [
            'client_id' => $clientId,
            'timestamp_micros' => $timestamp * 1000000,
            'events' => [['name' => 'refund', 'params' => $params]],
        ];
    }

    private static function items(array $lines, float $positiveTotal, float $value, int $factor): array
    {
        if (count($lines) > 200) {
            throw new DomainException('too_many_refund_items');
        }
        // Distribute a net deduction (e.g. retained return costs) across the credited
        // products. Allocate whole currency units first so the item totals equal value.
        $target = (int)round($value * $factor);
        $allocations = [];
        $remainders = [];
        $allocated = 0;
        foreach ($lines as $index => $line) {
            $exact = $positiveTotal > 0 ? $target * $line['refund_line_excl'] / $positiveTotal : 0;
            $allocations[$index] = (int)floor($exact);
            $remainders[$index] = $exact - $allocations[$index];
            $allocated += $allocations[$index];
        }
        arsort($remainders, SORT_NUMERIC);
        foreach (array_keys($remainders) as $index) {
            if ($allocated >= $target) {
                break;
            }
            ++$allocations[$index];
            ++$allocated;
        }
        if ($allocated !== $target) {
            throw new DomainException('refund_item_allocation_failed');
        }

        $items = [];
        foreach ($lines as $index => $line) {
            $quantity = (int)$line['product_quantity'];
            $items[] = [
                'item_id' => (string)(int)$line['product_id'],
                'item_name' => self::shortText((string)($line['product_name'] ?? '')),
                // Keep fractional cents: e.g. 32.70 / 8 = 4.0875, not 4.09.
                'price' => $allocations[$index] / $factor / $quantity,
                'quantity' => $quantity,
            ];
        }

        return $items;
    }

    private static function amount($value): float
    {
        if (!is_numeric($value) || !is_finite((float)$value)) {
            throw new DomainException('invalid_credit_note_amount');
        }

        return (float)$value;
    }

    private static function shortText(string $text): string
    {
        return mb_substr($text, 0, 100, 'UTF-8');
    }
}
