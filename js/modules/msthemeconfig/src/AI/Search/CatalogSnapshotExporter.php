<?php
declare(strict_types=1);

namespace MsThemeConfig\AI\Search;

/** Builds a public, Dutch catalogue snapshot with application-owned SELECTs only. */
final class CatalogSnapshotExporter
{
    private const BATCH_SIZE = 400;
    private const MAX_RELATIONS = 20;
    private array $coverage = [];

    public function __construct(
        private \Db $db,
        private \Link $link,
        private int $shopId,
        private int $langId,
        private int $visitorGroupId,
        private array $policy
    ) {
        if (min($shopId, $langId, $visitorGroupId) < 1) {
            throw new \InvalidArgumentException('Kies een geldige winkel, Nederlandse taal en bezoekersgroep.');
        }
        $this->policy = SearchPolicy::validate($policy);
    }

    public function build(): array
    {
        $this->coverage = ['categories' => 0, 'products' => 0, 'features_omitted' => 0,
            'combinations_omitted' => 0, 'category_relations_omitted' => 0,
            'product_relations_omitted' => 0, 'text_fields_truncated' => 0,
            'unnamed_categories_omitted' => 0, 'unnamed_products_omitted' => 0, 'truncated' => false];
        $prefix = _DB_PREFIX_;
        $shop = $this->shopId;
        $lang = $this->langId;
        $group = $this->visitorGroupId;
        if (!$this->rows("SELECT s.id_shop FROM {$prefix}shop s
            INNER JOIN {$prefix}lang_shop ls ON ls.id_shop = s.id_shop AND ls.id_lang = {$lang}
            INNER JOIN {$prefix}lang l ON l.id_lang = ls.id_lang
            WHERE s.id_shop = {$shop} AND s.active = 1 AND s.deleted = 0 AND l.active = 1 AND l.iso_code = 'nl'")) {
            throw new \RuntimeException('De winkel moet actief zijn en de actieve Nederlandse taal moet aan deze winkel gekoppeld zijn.');
        }

        // Access applies to the entire path, including the shop root; a public child must
        // never reveal a private, disabled or other-shop branch.
        $selection = '';
        if ($this->policy['category_ids']) {
            $selected = $this->ids($this->policy['category_ids']);
            $selection .= " AND EXISTS (SELECT 1 FROM {$prefix}category chosen
                WHERE chosen.id_category IN ({$selected}) AND chosen.nleft <= c.nleft AND chosen.nright >= c.nright)";
        }
        if ($this->policy['excluded_category_ids']) {
            $excluded = $this->ids($this->policy['excluded_category_ids']);
            $selection .= " AND NOT EXISTS (SELECT 1 FROM {$prefix}category excluded
                WHERE excluded.id_category IN ({$excluded}) AND excluded.nleft <= c.nleft AND excluded.nright >= c.nright)";
        }
        $categoryRows = $this->rows("SELECT c.id_category, c.id_parent, cl.name, cl.second_name, cl.link_rewrite
            FROM {$prefix}category c
            INNER JOIN {$prefix}category_shop cs ON cs.id_category = c.id_category AND cs.id_shop = {$shop}
            INNER JOIN {$prefix}category_lang cl ON cl.id_category = c.id_category AND cl.id_shop = {$shop} AND cl.id_lang = {$lang}
            INNER JOIN {$prefix}shop s ON s.id_shop = cs.id_shop
            INNER JOIN {$prefix}category root ON root.id_category = s.id_category
            WHERE c.active = 1 AND c.is_root_category = 0
                AND root.nleft > 0 AND root.nright > root.nleft
                AND c.nleft > root.nleft AND c.nright < root.nright
                AND NOT EXISTS (
                    SELECT 1 FROM {$prefix}category ancestor
                    LEFT JOIN {$prefix}category_shop ancestor_shop
                        ON ancestor_shop.id_category = ancestor.id_category AND ancestor_shop.id_shop = {$shop}
                    WHERE ancestor.nleft >= root.nleft AND ancestor.nleft <= c.nleft
                        AND ancestor.nright >= c.nright AND ancestor.nright <= root.nright
                        AND (ancestor.active = 0 OR ancestor_shop.id_category IS NULL OR NOT EXISTS (
                            SELECT 1 FROM {$prefix}category_group cg
                            WHERE cg.id_category = ancestor.id_category AND cg.id_group = {$group}
                        ))
                ) {$selection}
            ORDER BY c.nleft, c.id_category LIMIT " . ((int) $this->policy['max_categories'] + 1));
        if (count($categoryRows) > $this->policy['max_categories']) {
            throw new \RuntimeException('De categorieselectie overschrijdt max_categories. Verklein de selectie of verhoog de limiet.');
        }
        $categories = [];
        $aliases = [];
        foreach ($categoryRows as $row) {
            $names = $this->names($row);
            if ($names['display_name'] === '') {
                ++$this->coverage['unnamed_categories_omitted'];
                continue;
            }
            $id = (int) $row['id_category'];
            $aliases[$id] = (string) $row['link_rewrite'];
            $categories[$id] = array_merge(['id' => $id], $names, [
                'url' => $this->link->getCategoryLink($id, $row['link_rewrite'], $lang, null, $shop),
                'parent_id' => (int) $row['id_parent'], 'related_categories' => [],
            ]);
        }
        foreach ($categories as &$category) {
            // A boundary parent is represented by zero; excluded identifiers never escape.
            if (!isset($categories[$category['parent_id']])) { $category['parent_id'] = 0; }
        }
        unset($category);
        $this->categoryRelations($categories);
        $products = $categories ? $this->products($categories, $aliases) : [];
        $this->coverage['categories'] = count($categories);
        $this->coverage['products'] = count($products);
        $this->coverage['truncated'] = array_sum(array_diff_key($this->coverage,
            array_flip(['categories', 'products', 'truncated']))) > 0;
        $snapshot = ['schema_version' => 1, 'shop_id' => $shop, 'language_id' => $lang, 'language' => 'nl',
            'export_policy_hash' => SearchPolicy::sourceFingerprint($this->policy),
            'generated_at' => gmdate('Y-m-d\TH:i:s\Z'), 'categories' => array_values($categories),
            'products' => array_values($products), 'coverage' => $this->coverage];
        if (strlen(json_encode($snapshot, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR)) > $this->policy['max_snapshot_bytes']) {
            throw new \RuntimeException('De catalogus overschrijdt max_snapshot_bytes. Verklein de selectie of verhoog de limiet.');
        }
        return $snapshot;
    }

    private function categoryRelations(array &$categories): void
    {
        $prefix = _DB_PREFIX_;
        foreach (array_chunk(array_keys($categories), self::BATCH_SIZE) as $batch) {
            $ids = $this->ids($batch);
            foreach ($this->rows("SELECT id_category, id_related_category, note, position
                FROM {$prefix}msthemeconfig_category_relation
                WHERE id_shop = {$this->shopId} AND id_category IN ({$ids})
                ORDER BY id_category, position, id_related_category", 'De categoriekoppelingen konden niet worden gelezen. Controleer of de module-upgrades zijn uitgevoerd.') as $row) {
                $source = (int) $row['id_category'];
                $target = (int) $row['id_related_category'];
                if ($source === $target || !isset($categories[$source], $categories[$target])) { continue; }
                if (count($categories[$source]['related_categories']) >= self::MAX_RELATIONS) {
                    ++$this->coverage['category_relations_omitted'];
                    continue;
                }
                $categories[$source]['related_categories'][] = ['id' => $target,
                    'note' => $this->plain((string) $row['note'], $this->policy['max_relation_note_chars']),
                    'position' => (int) $row['position']];
            }
        }
    }

    private function products(array $categories, array $aliases): array
    {
        $prefix = _DB_PREFIX_;
        $shop = $this->shopId;
        $lang = $this->langId;
        $categoryIds = $this->ids(array_keys($categories));
        $fields = $this->policy['product_fields'];
        $optional = in_array('reference', $fields, true) ? ', p.reference' : '';
        if (in_array('description', $fields, true)) {
            // Some rich descriptions contain megabytes of inline image data. Bound the
            // database result before PHP parses HTML, and report the partial source.
            $optional .= ", SUBSTR(pl.description_short, 1, 12000) AS description_short,
                SUBSTR(pl.description, 1, 12000) AS description,
                CASE WHEN SUBSTR(pl.description_short, 12001, 1) <> '' OR SUBSTR(pl.description, 12001, 1) <> ''
                    THEN 1 ELSE 0 END AS raw_description_truncated";
        }
        $rows = $this->rows("SELECT p.id_product, p.second_name, pl.name, pl.link_rewrite, ps.id_category_default {$optional}
            FROM {$prefix}product p
            INNER JOIN {$prefix}product_shop ps ON ps.id_product = p.id_product AND ps.id_shop = {$shop}
            INNER JOIN {$prefix}product_lang pl ON pl.id_product = p.id_product AND pl.id_shop = {$shop} AND pl.id_lang = {$lang}
            WHERE ps.active = 1 AND ps.visibility IN ('both', 'search')
                AND COALESCE(p.id_oi_offer, 0) = 0 AND COALESCE(ps.id_oi_offer, 0) = 0
                AND EXISTS (SELECT 1 FROM {$prefix}category_product cp
                    WHERE cp.id_product = p.id_product AND cp.id_category IN ({$categoryIds}))
            ORDER BY p.id_product LIMIT " . ((int) $this->policy['max_products'] + 1));
        if (count($rows) > $this->policy['max_products']) {
            throw new \RuntimeException('De productselectie overschrijdt max_products. Verklein de selectie of verhoog de limiet.');
        }
        $products = [];
        $productRows = [];
        foreach ($rows as $row) {
            $names = $this->names($row);
            if ($names['display_name'] === '') {
                ++$this->coverage['unnamed_products_omitted'];
                continue;
            }
            $id = (int) $row['id_product'];
            $productRows[$id] = ['link_rewrite' => $row['link_rewrite']];
            $products[$id] = array_merge(['id' => $id], $names, ['url' => '',
                'category_ids' => [], 'default_category_id' => (int) $row['id_category_default'], 'related_product_ids' => []]);
            if (in_array('reference', $fields, true)) { $products[$id]['reference'] = $this->plain((string) $row['reference'], 128); }
            if (in_array('description', $fields, true)) {
                if ((int) $row['raw_description_truncated'] === 1) { ++$this->coverage['text_fields_truncated']; }
                $products[$id]['description'] = $this->plain((string) $row['description_short'] . ' ' . (string) $row['description'], $this->policy['max_description_chars']);
            }
            if (in_array('features', $fields, true)) { $products[$id]['features'] = []; }
            if (in_array('combinations', $fields, true)) { $products[$id]['combinations'] = []; }
        }
        unset($rows);
        foreach (array_chunk(array_keys($products), self::BATCH_SIZE) as $batch) {
            $ids = $this->ids($batch);
            foreach ($this->rows("SELECT DISTINCT id_product, id_category FROM {$prefix}category_product
                WHERE id_product IN ({$ids}) AND id_category IN ({$categoryIds}) ORDER BY id_product, id_category") as $row) {
                $products[(int) $row['id_product']]['category_ids'][] = (int) $row['id_category'];
            }
            if (in_array('features', $fields, true)) { $this->features($products, $ids); }
            if (in_array('combinations', $fields, true)) { $this->combinations($products, $ids); }
            foreach ($this->rows("SELECT DISTINCT id_product_1, id_product_2 FROM {$prefix}accessory
                WHERE id_product_1 IN ({$ids}) ORDER BY id_product_1, id_product_2",
                'De productkoppelingen konden niet worden gelezen. Controleer de accessoiretabel van de webshop.') as $row) {
                $source = (int) $row['id_product_1'];
                $target = (int) $row['id_product_2'];
                if ($source === $target || !isset($products[$source], $products[$target])) { continue; }
                if (count($products[$source]['related_product_ids']) >= self::MAX_RELATIONS) {
                    ++$this->coverage['product_relations_omitted'];
                    continue;
                }
                $products[$source]['related_product_ids'][] = $target;
            }
        }
        foreach ($products as $id => &$product) {
            if (!$product['category_ids']) {
                throw new \RuntimeException('De catalogus is gewijzigd tijdens het exporteren. Probeer opnieuw.');
            }
            if (!in_array($product['default_category_id'], $product['category_ids'], true)) {
                $product['default_category_id'] = $product['category_ids'][0];
            }
            $categoryAlias = $aliases[$product['default_category_id']];
            $object = $this->link->getProductObject($id, $lang, $shop);
            $product['url'] = $this->link->getProductLink($object, $productRows[$id]['link_rewrite'], $categoryAlias, null, $lang, $shop);
            foreach ($product['combinations'] ?? [] as $index => $combination) {
                $product['combinations'][$index]['url'] = $this->link->getProductLink($object,
                    $productRows[$id]['link_rewrite'], $categoryAlias, null, $lang, $shop, $combination['id']);
            }
        }
        unset($product);
        return $products;
    }

    private function features(array &$products, string $ids): void
    {
        $prefix = _DB_PREFIX_;
        foreach ($this->rows("SELECT fp.id_product, fl.name, fvl.value FROM {$prefix}feature_product fp
            INNER JOIN {$prefix}feature f ON f.id_feature = fp.id_feature
            INNER JOIN {$prefix}feature_shop fs ON fs.id_feature = f.id_feature AND fs.id_shop = {$this->shopId}
            INNER JOIN {$prefix}feature_lang fl ON fl.id_feature = fp.id_feature AND fl.id_lang = {$this->langId}
            INNER JOIN {$prefix}feature_value_lang fvl ON fvl.id_feature_value = fp.id_feature_value AND fvl.id_lang = {$this->langId}
            WHERE fp.id_product IN ({$ids}) ORDER BY fp.id_product, f.position, fp.id_feature, fp.id_feature_value") as $row) {
            $id = (int) $row['id_product'];
            if (count($products[$id]['features']) >= $this->policy['max_features']) {
                ++$this->coverage['features_omitted'];
                continue;
            }
            $name = $this->plain((string) $row['name'], 255);
            $value = $this->plain((string) $row['value'], 500);
            if ($name !== '' && preg_match('/[\p{L}\p{N}]/u', $value)) {
                $products[$id]['features'][] = ['name' => $name, 'value' => $value];
            }
        }
    }

    private function combinations(array &$products, string $ids): void
    {
        $prefix = _DB_PREFIX_;
        $combinationOwners = [];
        $reference = in_array('reference', $this->policy['product_fields'], true);
        $columns = $reference ? ', pa.reference' : '';
        foreach ($this->rows("SELECT pa.id_product, pa.id_product_attribute {$columns},
                (SELECT COUNT(*) FROM {$prefix}product_attribute_combination expected
                    WHERE expected.id_product_attribute = pa.id_product_attribute) AS attribute_count
            FROM {$prefix}product_attribute pa
            INNER JOIN {$prefix}product_attribute_shop pas
                ON pas.id_product_attribute = pa.id_product_attribute AND pas.id_shop = {$this->shopId}
            WHERE pa.id_product IN ({$ids}) ORDER BY pa.id_product, pa.id_product_attribute") as $row) {
            $id = (int) $row['id_product'];
            if (count($products[$id]['combinations']) >= $this->policy['max_combinations']) {
                ++$this->coverage['combinations_omitted'];
                continue;
            }
            $combinationId = (int) $row['id_product_attribute'];
            $combinationOwners[$combinationId] = [$id, count($products[$id]['combinations']), (int) $row['attribute_count']];
            $combination = ['id' => $combinationId, 'attributes' => []];
            if ($reference) { $combination['reference'] = $this->plain((string) $row['reference'], 128); }
            $products[$id]['combinations'][] = $combination;
        }
        foreach (array_chunk(array_keys($combinationOwners), self::BATCH_SIZE) as $batch) {
            $combinationIds = $this->ids($batch);
            foreach ($this->rows("SELECT pac.id_product_attribute, agl.public_name, agl.name AS group_name, al.name
                FROM {$prefix}product_attribute_combination pac
                INNER JOIN {$prefix}attribute a ON a.id_attribute = pac.id_attribute
                INNER JOIN {$prefix}attribute_shop ash ON ash.id_attribute = a.id_attribute AND ash.id_shop = {$this->shopId}
                INNER JOIN {$prefix}attribute_group ag ON ag.id_attribute_group = a.id_attribute_group
                INNER JOIN {$prefix}attribute_group_shop ags ON ags.id_attribute_group = ag.id_attribute_group AND ags.id_shop = {$this->shopId}
                INNER JOIN {$prefix}attribute_lang al ON al.id_attribute = a.id_attribute AND al.id_lang = {$this->langId}
                INNER JOIN {$prefix}attribute_group_lang agl ON agl.id_attribute_group = ag.id_attribute_group AND agl.id_lang = {$this->langId}
                WHERE pac.id_product_attribute IN ({$combinationIds})
                ORDER BY pac.id_product_attribute, ag.position, a.position, a.id_attribute") as $row) {
                [$id, $index] = $combinationOwners[(int) $row['id_product_attribute']];
                $name = $this->plain((string) ($row['public_name'] ?: $row['group_name']), 255);
                $value = $this->plain((string) $row['name'], 255);
                if ($name !== '' && preg_match('/[\p{L}\p{N}]/u', $value)) {
                    $products[$id]['combinations'][$index]['attributes'][] = ['name' => $name, 'value' => $value];
                }
            }
        }
        // A missing translation, shop association or meaningful value must not turn a
        // full dimension tuple into an apparently complete but partial specification.
        $changed = [];
        foreach ($combinationOwners as [$id, $index, $expectedCount]) {
            if ($expectedCount < 1 || count($products[$id]['combinations'][$index]['attributes']) !== $expectedCount) {
                unset($products[$id]['combinations'][$index]);
                $changed[$id] = true;
                ++$this->coverage['combinations_omitted'];
            }
        }
        foreach ($changed as $id => $_) { $products[$id]['combinations'] = array_values($products[$id]['combinations']); }
    }

    private function names(array $row): array
    {
        $name = $this->plain((string) $row['name'], 255);
        $second = $this->plain((string) ($row['second_name'] ?? ''), 255);
        if (preg_match('/^[\s\p{Cf}]*$/u', $name)) { $name = ''; }
        if (preg_match('/^[\s\p{Cf}]*$/u', $second)) { $second = ''; }
        return ['name' => $name, 'second_name' => $second, 'display_name' => $second !== '' ? $second : $name];
    }

    private function plain(string $html, int $limit): string
    {
        $html = preg_replace('~<(script|style)\b[^>]*>.*?(?:</\1\s*>|\z)~is', ' ', $html) ?? '';
        $html = preg_replace('~</?(?:p|div|br|li|h[1-6]|tr|td|th|ul|ol|table|section)\b[^>]*>~i', ' ', $html) ?? '';
        $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = trim(preg_replace('/[\s\x00-\x1F\x7F]+/u', ' ', $text) ?? '');
        if (mb_strlen($text, 'UTF-8') > $limit) {
            ++$this->coverage['text_fields_truncated'];
            return rtrim(mb_substr($text, 0, max(0, $limit - 1), 'UTF-8')) . ($limit > 0 ? '…' : '');
        }
        return $text;
    }

    private function ids(array $ids): string
    {
        return implode(',', array_map(static fn($id): int => (int) $id, $ids));
    }

    private function rows(string $sql, string $message = 'De openbare catalogus kon niet worden gelezen. Controleer het databaseschema en probeer opnieuw.'): array
    {
        try {
            $rows = $this->db->executeS($sql, true, false);
        } catch (\Throwable $error) {
            throw new \RuntimeException($message, 0, $error);
        }
        if (!is_array($rows)) { throw new \RuntimeException($message); }
        return $rows;
    }
}
