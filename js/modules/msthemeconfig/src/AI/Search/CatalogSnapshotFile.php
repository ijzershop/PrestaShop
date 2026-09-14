<?php
declare(strict_types=1);

namespace MsThemeConfig\AI\Search;

final class CatalogSnapshotFile
{
    public static function encode(array $data): string
    {
        return json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    }

    /** No bootstrap or database dependency: preview reads this local file only. */
    public static function read(string $path, array $policy): array
    {
        $localPath = realpath($path);
        $handle = $localPath !== false && is_file($localPath) ? @fopen($localPath, 'rb') : false;
        if ($handle === false) {
            throw new \RuntimeException('De catalogussnapshot kan niet worden geopend. Voer eerst export uit.');
        }
        try {
            $json = stream_get_contents($handle, $policy['max_snapshot_bytes'] + 1);
        } finally {
            fclose($handle);
        }
        if ($json === false || strlen($json) > $policy['max_snapshot_bytes']) {
            throw new \RuntimeException('De catalogussnapshot overschrijdt de ingestelde bestandsgrootte.');
        }
        $snapshot = json_decode($json, true, 64, JSON_THROW_ON_ERROR);
        if (!is_array($snapshot) || !isset($snapshot['export_policy_hash'])
            || !is_string($snapshot['export_policy_hash'])
            || !hash_equals(SearchPolicy::sourceFingerprint($policy), $snapshot['export_policy_hash'])) {
            throw new \RuntimeException('Het exportbeleid is gewijzigd of ontbreekt. Maak eerst een nieuwe catalogussnapshot.');
        }
        return $snapshot;
    }

    /** Same-directory replacement leaves the previous complete file in place on failure. */
    public static function write(string $path, array $data, int $maxBytes): void
    {
        $json = self::encode($data);
        if (strlen($json) > $maxBytes) {
            throw new \RuntimeException('De JSON-uitvoer overschrijdt de ingestelde bytegrens.');
        }
        $directory = realpath(dirname($path));
        if ($directory === false || !is_dir($directory) || !is_writable($directory)) {
            throw new \RuntimeException('De uitvoermap moet bestaan en schrijfbaar zijn.');
        }
        $target = $directory . DIRECTORY_SEPARATOR . basename($path);
        if (is_link($target)) {
            throw new \RuntimeException('Kies een gewoon uitvoerbestand, geen symbolische koppeling.');
        }
        $temporary = tempnam($directory, '.ai-search-');
        if ($temporary === false) {
            throw new \RuntimeException('Een tijdelijk uitvoerbestand kon niet worden aangemaakt.');
        }
        try {
            if (file_put_contents($temporary, $json, LOCK_EX) !== strlen($json) || !rename($temporary, $target)) {
                throw new \RuntimeException('Het uitvoerbestand kon niet volledig worden opgeslagen.');
            }
        } finally {
            if (is_file($temporary)) { unlink($temporary); }
        }
    }
}
