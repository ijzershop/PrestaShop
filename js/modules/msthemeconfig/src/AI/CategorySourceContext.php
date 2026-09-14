<?php
declare(strict_types=1);

namespace MsThemeConfig\AI;

use MsThemeConfig\Category\CategoryRelationRepository;

/** Collects public catalogue facts; source text is data, never model instructions. */
final class CategorySourceContext
{
    private const MAX_PRODUCTS = 100;
    private const MAX_COMBINATIONS = 40;
    private const MAX_FEATURES = 40;
    private const MAX_DESCRIPTION_LENGTH = 1500;
    private const MAX_SOURCE_LENGTH = 100000;

    private \Db $db;
    private \Link $link;
    private int $idLang;
    private int $idShop;
    private bool $textTruncated = false;

    public function __construct(\Db $db, \Link $link, int $idLang, int $idShop)
    {
        if ($idLang < 1 || $idShop < 1) {
            throw new \InvalidArgumentException('Selecteer een geldige taal en winkel.');
        }
        $this->db = $db;
        $this->link = $link;
        $this->idLang = $idLang;
        $this->idShop = $idShop;
    }

    public function build(array $category): array
    {
        $idCategory = (int) ($category['id_category'] ?? 0);
        if ($idCategory < 1) {
            throw new \InvalidArgumentException('Selecteer een geldige categorie.');
        }
        $this->textTruncated = false;
        $prefix = _DB_PREFIX_;
        $shop = $this->idShop;
        $lang = $this->idLang;
        // Nested sets include all descendants. An inactive or other-shop branch is excluded in full.
        $categories = $this->rows("SELECT c.id_category, cl.name, cl.link_rewrite
            FROM {$prefix}category c
            INNER JOIN {$prefix}category root ON root.id_category = {$idCategory}
            INNER JOIN {$prefix}category_shop cs ON cs.id_category = c.id_category AND cs.id_shop = {$shop}
            INNER JOIN {$prefix}category_lang cl ON cl.id_category = c.id_category AND cl.id_shop = {$shop} AND cl.id_lang = {$lang}
            WHERE c.active = 1
                AND (c.id_category = root.id_category OR
                    (root.nleft > 0 AND root.nright > root.nleft AND c.nleft > root.nleft AND c.nright < root.nright))
                AND NOT EXISTS (
                    SELECT 1 FROM {$prefix}category ancestor
                    LEFT JOIN {$prefix}category_shop ancestor_shop
                        ON ancestor_shop.id_category = ancestor.id_category AND ancestor_shop.id_shop = {$shop}
                    WHERE ancestor.nleft >= root.nleft AND ancestor.nleft <= c.nleft
                        AND ancestor.nright >= c.nright AND ancestor.nright <= root.nright
                        AND (ancestor.active = 0 OR ancestor_shop.id_category IS NULL)
                )
            ORDER BY c.nleft, c.id_category");

        $categoryNames = $this->sourceNames($category);
        $source = [
            'category' => [
                'id' => $idCategory,
                'name' => $categoryNames['name'],
                'second_name' => $categoryNames['second_name'],
                'display_name' => $categoryNames['display_name'],
                'parent_name' => $this->plainText((string) ($category['parent_name'] ?? ''), 255),
                'url' => $this->link->getCategoryLink($idCategory, $category['link_rewrite'] ?? null, $lang, null, $shop),
                'existing_text' => $this->plainText(implode(' ', [
                    (string) ($category['top_description'] ?? ''),
                    (string) ($category['description'] ?? ''),
                    (string) ($category['additional_description'] ?? ''),
                ]), 3000),
            ],
            'products' => [],
            'related_categories' => [],
            'coverage' => ['total_products' => 0, 'included_products' => 0, 'truncated' => false],
            'warnings' => [],
        ];
        if (!$categories) {
            $source['warnings'][] = 'De categorie is niet actief of niet beschikbaar in de gekozen winkel en taal.';
            return $source;
        }

        // Explicit one-way editorial connections are separate from the current assortment.
        foreach ((new CategoryRelationRepository($this->db))->getRelatedCategories($idCategory, $shop, $lang) as $related) {
            $relatedId = (int) $related['id_category'];
            $relatedNames = $this->sourceNames($related);
            $source['related_categories'][] = [
                'id' => $relatedId,
                'name' => $relatedNames['name'],
                'second_name' => $relatedNames['second_name'],
                'display_name' => $relatedNames['display_name'],
                'url' => $this->link->getCategoryLink($relatedId, $related['link_rewrite'] ?? null, $lang, null, $shop),
                'note' => $this->plainText((string) ($related['note'] ?? ''), CategoryRelationRepository::MAX_NOTE_LENGTH),
            ];
        }

        $categoryIds = implode(',', array_map(static fn(array $row): int => (int) $row['id_category'], $categories));
        // EXISTS avoids duplicates when a product belongs to several included categories.
        $productScope = "FROM {$prefix}product p
            INNER JOIN {$prefix}product_shop ps ON ps.id_product = p.id_product AND ps.id_shop = {$shop}
            INNER JOIN {$prefix}product_lang pl ON pl.id_product = p.id_product AND pl.id_shop = {$shop} AND pl.id_lang = {$lang}
            WHERE ps.active = 1 AND ps.visibility IN ('both', 'catalog')
                AND EXISTS (SELECT 1 FROM {$prefix}category_product cp
                    WHERE cp.id_product = p.id_product AND cp.id_category IN ({$categoryIds}))";
        $total = (int) $this->rows("SELECT COUNT(*) AS total {$productScope}")[0]['total'];
        $source['coverage']['total_products'] = $total;
        if (!$total) {
            $source['warnings'][] = 'Geen actieve, zichtbare producten met gegevens in de gekozen taal gevonden, ook niet in ondercategorieën. Verzin geen specificaties of productlinks.';
            return $source;
        }

        $products = $this->rows("SELECT p.id_product, p.reference, p.ean13, p.second_name,
                ps.id_category_default, ps.unity, ps.available_for_order,
                pl.name, pl.link_rewrite, pl.description_short, pl.description, pl.available_now, pl.available_later
            {$productScope} ORDER BY p.id_product LIMIT " . self::MAX_PRODUCTS);
        if (!$products) {
            throw new \RuntimeException('Het assortiment is gewijzigd tijdens het laden. Probeer opnieuw.');
        }
        $ids = implode(',', array_map(static fn(array $row): int => (int) $row['id_product'], $products));
        $defaultCategoryIds = implode(',', array_unique(array_map(static fn(array $row): int => (int) $row['id_category_default'], $products)));
        $categoryAliases = [];
        foreach ($this->rows("SELECT id_category, link_rewrite FROM {$prefix}category_lang
            WHERE id_category IN ({$defaultCategoryIds}) AND id_shop = {$shop} AND id_lang = {$lang}") as $row) {
            $categoryAliases[(int) $row['id_category']] = $row['link_rewrite'];
        }

        $features = [];
        $featuresTruncated = false;
        foreach ($this->rows("SELECT fp.id_product, fl.name, fvl.value
            FROM {$prefix}feature_product fp
            INNER JOIN {$prefix}feature f ON f.id_feature = fp.id_feature
            INNER JOIN {$prefix}feature_shop fs ON fs.id_feature = f.id_feature AND fs.id_shop = {$shop}
            INNER JOIN {$prefix}feature_lang fl ON fl.id_feature = f.id_feature AND fl.id_lang = {$lang}
            INNER JOIN {$prefix}feature_value_lang fvl ON fvl.id_feature_value = fp.id_feature_value AND fvl.id_lang = {$lang}
            WHERE fp.id_product IN ({$ids}) ORDER BY fp.id_product, f.position, fp.id_feature_value") as $row) {
            $id = (int) $row['id_product'];
            if (count($features[$id] ?? []) >= self::MAX_FEATURES) {
                $featuresTruncated = true;
                continue;
            }
            $name = $this->plainText((string) $row['name'], 255);
            $value = $this->plainText((string) $row['value'], 500);
            if ($name !== '' && $value !== '' && preg_match('/[\p{L}\p{N}]/u', $value)) {
                $features[$id][] = ['name' => $name, 'value' => $value];
            }
        }

        // Fetch compact combination identifiers first; only load attributes for the bounded selection.
        $combinations = [];
        $combinationProducts = [];
        $combinationCounts = [];
        foreach ($this->rows("SELECT pa.id_product, pa.id_product_attribute, pa.reference
            FROM {$prefix}product_attribute pa
            INNER JOIN {$prefix}product_attribute_shop pas
                ON pas.id_product_attribute = pa.id_product_attribute AND pas.id_shop = {$shop}
            WHERE pa.id_product IN ({$ids}) ORDER BY pa.id_product, pa.id_product_attribute") as $row) {
            $id = (int) $row['id_product'];
            $combinationId = (int) $row['id_product_attribute'];
            $combinationCounts[$id] = ($combinationCounts[$id] ?? 0) + 1;
            if ($combinationCounts[$id] <= self::MAX_COMBINATIONS) {
                $combinations[$id][$combinationId] = [
                    'id' => $combinationId,
                    'reference' => $this->plainText((string) $row['reference'], 128),
                    'attributes' => [],
                ];
                $combinationProducts[$combinationId] = $id;
            }
        }
        if ($combinationProducts) {
            $combinationIds = implode(',', array_keys($combinationProducts));
            foreach ($this->rows("SELECT pac.id_product_attribute, agl.name AS group_name,
                    agl.public_name AS public_group_name, al.name AS attribute_name
                FROM {$prefix}product_attribute_combination pac
                INNER JOIN {$prefix}attribute a ON a.id_attribute = pac.id_attribute
                INNER JOIN {$prefix}attribute_shop ash ON ash.id_attribute = a.id_attribute AND ash.id_shop = {$shop}
                INNER JOIN {$prefix}attribute_group ag ON ag.id_attribute_group = a.id_attribute_group
                INNER JOIN {$prefix}attribute_group_shop ags ON ags.id_attribute_group = ag.id_attribute_group AND ags.id_shop = {$shop}
                INNER JOIN {$prefix}attribute_lang al ON al.id_attribute = a.id_attribute AND al.id_lang = {$lang}
                INNER JOIN {$prefix}attribute_group_lang agl ON agl.id_attribute_group = ag.id_attribute_group AND agl.id_lang = {$lang}
                WHERE pac.id_product_attribute IN ({$combinationIds})
                ORDER BY pac.id_product_attribute, ag.position, a.position, a.id_attribute") as $row) {
                $combinationId = (int) $row['id_product_attribute'];
                $id = $combinationProducts[$combinationId];
                $name = $this->plainText((string) ($row['public_group_name'] ?: $row['group_name']), 255);
                $value = $this->plainText((string) $row['attribute_name'], 255);
                if ($name !== '' && $value !== '' && preg_match('/[\p{L}\p{N}]/u', $value)) {
                    $combinations[$id][$combinationId]['attributes'][] = ['name' => $name, 'value' => $value];
                }
            }
        }

        $combinationsTruncated = false;
        foreach ($products as $row) {
            $id = (int) $row['id_product'];
            $combinationCount = $combinationCounts[$id] ?? 0;
            $combinationsTruncated = $combinationsTruncated || $combinationCount > self::MAX_COMBINATIONS;
            $description = (string) $row['description_short'];
            if ($row['description'] !== $row['description_short']) {
                $description .= ' ' . $row['description'];
            }
            // Link overrides may need the Product for route keywords and variant links.
            // Reuse one loaded object instead of loading it for every combination.
            $urlProduct = $this->link->getProductObject($id, $lang, $shop);
            $categoryAlias = $categoryAliases[(int) $row['id_category_default']] ?? null;
            $productCombinations = array_values($combinations[$id] ?? []);
            foreach ($productCombinations as &$combination) {
                $combination['url'] = $this->link->getProductLink($urlProduct, $row['link_rewrite'],
                    $categoryAlias, $row['ean13'] ?: null, $lang, $shop, $combination['id']);
            }
            unset($combination);
            $productNames = $this->sourceNames($row);
            $source['products'][] = [
                'id' => $id,
                'name' => $productNames['name'],
                'second_name' => $productNames['second_name'],
                'display_name' => $productNames['display_name'],
                'url' => $this->link->getProductLink($urlProduct, $row['link_rewrite'], $categoryAlias,
                    $row['ean13'] ?: null, $lang, $shop),
                'reference' => $this->plainText((string) $row['reference'], 128),
                'description' => $this->plainText($description, self::MAX_DESCRIPTION_LENGTH),
                'features' => $features[$id] ?? [],
                'combinations' => $productCombinations,
                'combination_coverage' => [
                    'total' => $combinationCount,
                    'included' => count($combinations[$id] ?? []),
                    'truncated' => $combinationCount > self::MAX_COMBINATIONS,
                ],
                // This is the stored unit-price label, not a material dimension or guaranteed sales unit.
                'unit_price_label' => $this->plainText((string) $row['unity'], 255),
                'availability' => [
                    'available_for_order' => (bool) $row['available_for_order'],
                    'in_stock_label' => $this->plainText((string) $row['available_now'], 255),
                    'out_of_stock_label' => $this->plainText((string) $row['available_later'], 255),
                    'stock_status_verified' => false,
                ],
            ];
        }
        $included = count($source['products']);
        $source['coverage']['included_products'] = $included;
        $source['coverage']['truncated'] = $total > $included || $combinationsTruncated || $featuresTruncated || $this->textTruncated;
        if ($total > $included) {
            $source['warnings'][] = "De bron bevat {$included} van {$total} producten. Trek geen conclusies over het volledige assortiment of alle beschikbare maten.";
        }
        if ($combinationsTruncated) {
            $source['warnings'][] = 'Per product zijn maximaal 40 bestaande combinaties opgenomen. De getoonde maten en uitvoeringen zijn geen volledige reeks.';
        }
        if ($featuresTruncated) {
            $source['warnings'][] = 'Per product zijn maximaal 40 kenmerken opgenomen.';
        }
        if ($this->textTruncated) {
            $source['warnings'][] = 'De broninformatie voor de AI is ingekort. Dit beperkt de lengte van de gegenereerde categorietekst niet. Ontbrekende eigenschappen mogen niet worden aangevuld met aannames.';
        }
        return $this->limitSourceSize($source);
    }

    /** Keep valid structured records, never cut the serialized JSON halfway through. */
    private function limitSourceSize(array $source): array
    {
        $length = static fn(array $data): int => mb_strlen((string) json_encode($data,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR), 'UTF-8');
        if ($length($source) <= self::MAX_SOURCE_LENGTH) {
            return $source;
        }
        $source['warnings'][] = 'De bronselectie is beperkt tot 100000 tekens. Producten, varianten of bronteksten kunnen ontbreken; trek geen conclusies over het volledige aanbod.';
        $source['coverage']['truncated'] = true;
        while ($length($source) > self::MAX_SOURCE_LENGTH) {
            $reduced = false;
            foreach ($source['products'] as &$product) {
                $count = count($product['combinations']);
                if ($count > 1) {
                    $product['combinations'] = array_slice($product['combinations'], 0, (int) ceil($count / 2));
                    $product['combination_coverage']['included'] = count($product['combinations']);
                    $product['combination_coverage']['truncated'] = true;
                    $reduced = true;
                }
                if (mb_strlen($product['description'], 'UTF-8') > 500) {
                    $product['description'] = $this->plainText($product['description'], 500);
                    $reduced = true;
                }
            }
            unset($product);
            if (!$reduced) {
                array_pop($source['products']);
            }
            $source['coverage']['included_products'] = count($source['products']);
        }
        return $source;
    }

    private function rows(string $sql): array
    {
        $rows = $this->db->executeS($sql);
        if (!is_array($rows)) {
            throw new \RuntimeException('De productgegevens voor deze categorie konden niet worden geladen.');
        }
        return $rows;
    }

    /** Select a usable name after removing markup and normalizing whitespace. */
    private function sourceNames(array $row): array
    {
        $name = $this->plainText((string) ($row['name'] ?? ''), 255);
        $secondName = $this->plainText((string) ($row['second_name'] ?? ''), 255);
        if (preg_match('/^[\s\p{Cf}]*$/u', $secondName)) {
            $secondName = '';
        }
        return [
            'name' => $name,
            'second_name' => $secondName,
            'display_name' => $secondName !== '' ? $secondName : $name,
        ];
    }

    private function plainText(string $html, int $limit): string
    {
        $html = preg_replace('~<(script|style)\b[^>]*>.*?</\1\s*>~is', ' ', $html) ?? '';
        $html = preg_replace('~</?(?:p|div|br|li|h[1-6]|tr|td|th|ul|ol|table|section)\b[^>]*>~i', ' ', $html) ?? '';
        $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = trim(preg_replace('/\s+/u', ' ', $text) ?? '');
        if (mb_strlen($text, 'UTF-8') > $limit) {
            $this->textTruncated = true;
            return rtrim(mb_substr($text, 0, $limit - 1, 'UTF-8')) . '…';
        }
        return $text;
    }
}
