<?php
declare(strict_types=1);

namespace MsThemeConfig\AI\Search;

/** Operator-owned settings; never accept these values from a customer's request. */
final class SearchPolicy
{
    public const DEFAULTS = [
        'category_ids' => [],
        'excluded_category_ids' => [],
        'product_fields' => ['reference', 'description', 'features', 'combinations'],
        'max_categories' => 2000,
        'max_products' => 20000,
        'max_description_chars' => 600,
        'max_features' => 20,
        'max_combinations' => 12,
        'max_relation_note_chars' => 300,
        'max_snapshot_bytes' => 50000000,
        'max_context_bytes' => 16000,
        'max_context_products' => 8,
        'max_context_categories' => 6,
        'max_relation_hops' => 1,
        'max_query_chars' => 500,
        'max_snapshot_age_hours' => 48,
        'aliases' => [],
    ];

    public static function load(string $path): array
    {
        if (!is_file($path) || filesize($path) > 100000) {
            throw new \RuntimeException('Het beleidsbestand ontbreekt of is groter dan 100000 bytes.');
        }
        $json = file_get_contents($path);
        $object = json_decode($json === false ? '' : $json, false, 32, JSON_THROW_ON_ERROR);
        if (!$object instanceof \stdClass) {
            throw new \InvalidArgumentException('Het beleid moet een JSON-object zijn.');
        }
        return self::validate(json_decode($json, true, 32, JSON_THROW_ON_ERROR));
    }

    public static function validate(array $values): array
    {
        if (array_diff(array_keys($values), array_keys(self::DEFAULTS))) {
            throw new \InvalidArgumentException('Het beleid bevat onbekende instellingen.');
        }
        $policy = array_replace(self::DEFAULTS, $values);
        $ranges = [
            'max_categories' => [1, 10000], 'max_products' => [1, 100000],
            'max_description_chars' => [0, 3000], 'max_features' => [0, 40],
            'max_combinations' => [0, 40], 'max_relation_note_chars' => [0, 500],
            'max_snapshot_bytes' => [1024, 100000000], 'max_context_bytes' => [2048, 100000],
            'max_context_products' => [1, 40], 'max_context_categories' => [1, 20],
            'max_relation_hops' => [0, 2], 'max_query_chars' => [1, 2000],
            'max_snapshot_age_hours' => [1, 168],
        ];
        foreach ($ranges as $key => [$min, $max]) {
            if (!is_int($policy[$key]) || $policy[$key] < $min || $policy[$key] > $max) {
                throw new \InvalidArgumentException("Instelling {$key} moet een geheel getal van {$min} tot {$max} zijn.");
            }
        }
        foreach (['category_ids', 'excluded_category_ids'] as $key) {
            if (!is_array($policy[$key]) || !array_is_list($policy[$key]) || count($policy[$key]) > 1000) {
                throw new \InvalidArgumentException("Instelling {$key} moet een lijst met maximaal 1000 categorie-ID's zijn.");
            }
            foreach ($policy[$key] as $id) {
                if (!is_int($id) || $id < 1 || $id > 2147483647) {
                    throw new \InvalidArgumentException('Categorie-ID’s moeten positieve gehele getallen zijn.');
                }
            }
            $policy[$key] = array_values(array_unique($policy[$key]));
            sort($policy[$key], SORT_NUMERIC);
        }
        if (!is_array($policy['product_fields']) || !array_is_list($policy['product_fields'])
            || array_filter($policy['product_fields'], static fn($field): bool => !is_string($field)
                || !in_array($field, self::DEFAULTS['product_fields'], true))) {
            throw new \InvalidArgumentException('Alleen reference, description, features en combinations zijn optionele productvelden.');
        }
        // A stable order makes equivalent operator policies share the same fingerprint.
        $policy['product_fields'] = array_values(array_intersect(self::DEFAULTS['product_fields'], $policy['product_fields']));
        if (!is_array($policy['aliases']) || count($policy['aliases']) > 200) {
            throw new \InvalidArgumentException('Aliases moeten een object met maximaal 200 zoektermen zijn.');
        }
        foreach ($policy['aliases'] as $term => $alternatives) {
            if (!is_string($term) || trim($term) === '' || mb_strlen($term, 'UTF-8') > 100
                || !is_array($alternatives) || !array_is_list($alternatives) || count($alternatives) > 10) {
                throw new \InvalidArgumentException('Iedere alias moet een zoekterm met maximaal tien alternatieven bevatten.');
            }
            foreach ($alternatives as $alternative) {
                if (!is_string($alternative) || trim($alternative) === '' || mb_strlen($alternative, 'UTF-8') > 100) {
                    throw new \InvalidArgumentException('Aliasalternatieven moeten tekst van 1 tot 100 tekens zijn.');
                }
            }
        }
        return $policy;
    }

    /** A stricter export policy must not accidentally keep using an older, broader snapshot. */
    public static function sourceFingerprint(array $policy): string
    {
        $source = array_intersect_key(self::validate($policy), array_flip([
            'category_ids', 'excluded_category_ids', 'product_fields', 'max_categories', 'max_products',
            'max_description_chars', 'max_features', 'max_combinations', 'max_relation_note_chars', 'max_snapshot_bytes',
        ]));
        return hash('sha256', json_encode($source, JSON_THROW_ON_ERROR));
    }
}
