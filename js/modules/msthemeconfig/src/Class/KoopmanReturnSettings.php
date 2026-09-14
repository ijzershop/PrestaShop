<?php
declare(strict_types=1);

namespace MsThemeConfig\Class;

/** The configurator stores status selections as JSON; older shops used CSV. */
final class KoopmanReturnSettings
{
    public static function parseStates($value): array
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            $value = is_array($decoded) ? $decoded : explode(',', $value);
        }
        if (!is_array($value)) {
            return [];
        }
        $states = [];
        foreach ($value as $state) {
            if (!is_int($state) && !is_string($state)) {
                continue;
            }
            $id = filter_var(is_string($state) ? trim($state) : $state, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
            if ($id !== false) {
                $states[] = $id;
            }
        }
        return array_values(array_unique($states));
    }
}
