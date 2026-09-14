<?php

declare(strict_types=1);

namespace MsThemeConfig\Plasma;

use DomainException;

/** All distances are millimetres; monetary inputs are tax exclusive. */
final class PlasmaCalculator
{
    public const BOUNDS_ERROR = 'Drawing dimensions exceed our standard 1000x500mm sheet boundaries.';

    public static function calculate(array $metrics, array $machine, float $basePrice): array
    {
        foreach (['total_length_mm', 'part_width_mm', 'part_height_mm', 'total_pierces'] as $key) {
            self::number($metrics[$key] ?? null, $key, true);
        }
        if (floor((float) $metrics['total_pierces']) !== (float) $metrics['total_pierces']) {
            throw new DomainException('Invalid pierce count.');
        }
        $width = (float) $metrics['part_width_mm'];
        $height = (float) $metrics['part_height_mm'];
        $rotation = 0;
        if ($width > 1000 || $height > 500) {
            if ($height > 1000 || $width > 500) {
                throw new DomainException(self::BOUNDS_ERROR);
            }
            $rotation = 90;
        }
        if (($metrics['success'] ?? null) !== true || ($metrics['diagnostics']['is_safe_to_cut'] ?? null) !== true
            || ($metrics['diagnostics']['open_loops_count'] ?? null) !== 0) {
            throw new DomainException('Review the drawing diagnostics and close all paths before ordering.');
        }
        foreach (['feed_rate', 'pierce_time', 'lead_in_length', 'operating_cost_per_minute'] as $key) {
            self::number($machine[$key] ?? null, $key, in_array($key, ['feed_rate', 'operating_cost_per_minute'], true));
        }
        self::number($basePrice, 'base price', false);
        $productionLength = (float) $metrics['total_length_mm'] + (int) $metrics['total_pierces'] * (float) $machine['lead_in_length'];
        $travel = $productionLength / (float) $machine['feed_rate'];
        $piercing = (int) $metrics['total_pierces'] * (float) $machine['pierce_time'] / 60;
        $surcharge = ($travel + $piercing) * (float) $machine['operating_cost_per_minute'];
        if (!is_finite($surcharge) || $surcharge > 100000000) {
            throw new DomainException('The machine configuration produces an invalid price.');
        }
        return [
            'rotation_degrees' => $rotation,
            'production_length_mm' => $productionLength,
            'travel_minutes' => $travel,
            'pierce_minutes' => $piercing,
            'machine_minutes' => $travel + $piercing,
            'surcharge_excl' => round($surcharge, 6),
            'total_price_excl' => round($basePrice + $surcharge, 6),
        ];
    }

    private static function number($value, string $label, bool $positive): void
    {
        if (!is_numeric($value) || !is_finite((float) $value) || ($positive ? (float) $value <= 0 : (float) $value < 0)) {
            throw new DomainException('Invalid ' . $label . '.');
        }
    }
}
