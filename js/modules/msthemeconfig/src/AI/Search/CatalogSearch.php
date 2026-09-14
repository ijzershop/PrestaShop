<?php
declare(strict_types=1);

namespace MsThemeConfig\AI\Search;

/** Storefront adapter for the approved snapshot. Never builds a snapshot during a search. */
final class CatalogSearch
{
    public function __construct(private string $policyPath, private string $snapshotDirectory)
    {
    }

    public static function snapshotPath(string $directory, int $shopId): string
    {
        if ($shopId < 1) {
            throw new \InvalidArgumentException('Kies een geldige winkel.');
        }
        return rtrim($directory, '/\\') . '/catalog-shop-' . $shopId . '-nl.json';
    }

    public function search(int $shopId, string $query): array
    {
        $policy = SearchPolicy::load($this->policyPath);
        $snapshot = CatalogSnapshotFile::read(self::snapshotPath($this->snapshotDirectory, $shopId), $policy);
        if (($snapshot['shop_id'] ?? null) !== $shopId) {
            throw new \RuntimeException('De catalogussnapshot hoort bij een andere winkel.');
        }
        $context = (new CatalogContextSelector($policy))->select($snapshot, $query);
        $links = static function (array $records): array {
            $items = [];
            foreach ($records as $record) {
                if (!empty($record['url'])) {
                    $items[] = ['id' => $record['id'], 'name' => $record['display_name'] ?: $record['name'],
                        'link' => $record['url']];
                }
            }
            return $items;
        };
        $products = $links($context['products']);
        $categories = $links($context['categories']);
        if ($products) {
            $answer = 'Deze producten kunnen aansluiten bij uw zoekvraag. Bekijk de productpagina voor de actuele prijs en beschikbare uitvoeringen.';
        } elseif ($categories) {
            $answer = 'Ik heb passende categorieën gevonden. Kies een categorie of omschrijf het product wat preciezer.';
        } else {
            $answer = 'Ik heb geen passende producten of categorieën gevonden. Noem bijvoorbeeld het materiaal, de afmetingen of een artikelnummer.';
        }
        // Send only the public result projection to the browser, not the full model context.
        return ['response_language' => 'nl', 'answer' => $answer, 'products' => $products, 'categories' => $categories];
    }
}
