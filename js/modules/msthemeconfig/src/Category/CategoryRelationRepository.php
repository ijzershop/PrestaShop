<?php
declare(strict_types=1);

namespace MsThemeConfig\Category;

/** Explicit, directional category suggestions belonging to one shop. */
final class CategoryRelationRepository
{
    public const MAX_RELATIONS = 20;
    public const MAX_NOTE_LENGTH = 500;

    private \Db $db;

    public function __construct(\Db $db)
    {
        $this->db = $db;
    }

    public function install(): bool
    {
        return (bool) $this->db->execute('CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'msthemeconfig_category_relation` (
            `id_shop` INT UNSIGNED NOT NULL,
            `id_category` INT UNSIGNED NOT NULL,
            `id_related_category` INT UNSIGNED NOT NULL,
            `position` INT UNSIGNED NOT NULL DEFAULT 0,
            `note` VARCHAR(500) NOT NULL DEFAULT \'\',
            PRIMARY KEY (`id_shop`, `id_category`, `id_related_category`),
            KEY `related_category` (`id_related_category`, `id_shop`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci', false);
    }

    /** Includes inactive/stale selections so the editor can explicitly remove them. */
    public function getRelations(int $sourceId, int $shopId): array
    {
        $this->validateScope($sourceId, $shopId);
        $rows = $this->rows('SELECT id_related_category, note, position FROM `' . _DB_PREFIX_ . 'msthemeconfig_category_relation`
            WHERE id_category = ' . $sourceId . ' AND id_shop = ' . $shopId . '
            ORDER BY position, id_related_category');
        return array_map(static fn(array $row): array => [
            'id_related_category' => (int) $row['id_related_category'],
            'note' => (string) $row['note'],
            'position' => (int) $row['position'],
        ], $rows);
    }

    /** Inactive choices are returned for editing existing selections, not for new links. */
    public function getChoices(int $sourceId, int $shopId, int $langId): array
    {
        // New category forms have no source ID until the category itself is saved.
        if ($sourceId !== 0) { $this->positiveId($sourceId); }
        $this->positiveId($shopId);
        $this->positiveId($langId);
        $prefix = _DB_PREFIX_;
        $rows = $this->rows("SELECT c.id_category, cl.name, cl.second_name,
                COALESCE(parent_lang.name, '') AS parent_name,
                CASE WHEN c.active = 1
                    AND shop_root.nleft > 0 AND c.nleft > shop_root.nleft AND c.nright < shop_root.nright
                    AND NOT EXISTS (
                        SELECT 1 FROM {$prefix}category ancestor
                        LEFT JOIN {$prefix}category_shop ancestor_shop
                            ON ancestor_shop.id_category = ancestor.id_category AND ancestor_shop.id_shop = {$shopId}
                        WHERE ancestor.nleft >= shop_root.nleft AND ancestor.nleft <= c.nleft
                            AND ancestor.nright >= c.nright AND ancestor.nright <= shop_root.nright
                            AND (ancestor.active = 0 OR ancestor_shop.id_category IS NULL)
                    ) THEN 1 ELSE 0 END AS active
            FROM {$prefix}category c
            INNER JOIN {$prefix}category_shop cs ON cs.id_category = c.id_category AND cs.id_shop = {$shopId}
            INNER JOIN {$prefix}category_lang cl ON cl.id_category = c.id_category AND cl.id_shop = {$shopId} AND cl.id_lang = {$langId}
            INNER JOIN {$prefix}shop shop ON shop.id_shop = cs.id_shop
            INNER JOIN {$prefix}category shop_root ON shop_root.id_category = shop.id_category
            LEFT JOIN {$prefix}category_lang parent_lang ON parent_lang.id_category = c.id_parent
                AND parent_lang.id_shop = {$shopId} AND parent_lang.id_lang = {$langId}
            WHERE c.id_category <> {$sourceId} AND c.id_parent > 0 AND c.is_root_category = 0
                AND c.id_category <> shop.id_category
            ORDER BY COALESCE(NULLIF(cl.second_name, ''), cl.name), c.id_category");
        return array_map(static fn(array $row): array => [
            'id_category' => (int) $row['id_category'],
            'name' => (string) $row['name'],
            'second_name' => (string) ($row['second_name'] ?? ''),
            'parent_name' => (string) $row['parent_name'],
            'active' => (bool) $row['active'],
        ], $rows);
    }

    /** Only published targets in this shop/language can be suggested to the generator. */
    public function getRelatedCategories(int $sourceId, int $shopId, int $langId): array
    {
        $this->validateScope($sourceId, $shopId, $langId);
        $prefix = _DB_PREFIX_;
        $rows = $this->rows("SELECT c.id_category, cl.name, cl.second_name, cl.link_rewrite, relation.note, relation.position
            FROM {$prefix}msthemeconfig_category_relation relation
            INNER JOIN {$prefix}category c ON c.id_category = relation.id_related_category
            INNER JOIN {$prefix}category_shop cs ON cs.id_category = c.id_category AND cs.id_shop = relation.id_shop
            INNER JOIN {$prefix}category_lang cl ON cl.id_category = c.id_category AND cl.id_shop = relation.id_shop AND cl.id_lang = {$langId}
            INNER JOIN {$prefix}shop shop ON shop.id_shop = relation.id_shop
            INNER JOIN {$prefix}category shop_root ON shop_root.id_category = shop.id_category
            WHERE relation.id_category = {$sourceId} AND relation.id_shop = {$shopId}
                AND c.id_category <> {$sourceId} AND c.active = 1 AND c.id_parent > 0 AND c.is_root_category = 0
                AND shop_root.nleft > 0 AND c.nleft > shop_root.nleft AND c.nright < shop_root.nright
                AND NOT EXISTS (
                    SELECT 1 FROM {$prefix}category ancestor
                    LEFT JOIN {$prefix}category_shop ancestor_shop
                        ON ancestor_shop.id_category = ancestor.id_category AND ancestor_shop.id_shop = {$shopId}
                    WHERE ancestor.nleft >= shop_root.nleft AND ancestor.nleft <= c.nleft
                        AND ancestor.nright >= c.nright AND ancestor.nright <= shop_root.nright
                        AND (ancestor.active = 0 OR ancestor_shop.id_category IS NULL)
                )
            ORDER BY relation.position, c.id_category LIMIT " . self::MAX_RELATIONS);
        return array_map(static fn(array $row): array => [
            'id_category' => (int) $row['id_category'],
            'name' => (string) $row['name'],
            'second_name' => (string) ($row['second_name'] ?? ''),
            'link_rewrite' => (string) $row['link_rewrite'],
            'note' => (string) $row['note'],
            'position' => (int) $row['position'],
        ], $rows);
    }

    /** Replaces only this category's outgoing links in the selected shop. */
    public function replace(int $sourceId, int $shopId, int $langId, array $relations): void
    {
        $this->validateScope($sourceId, $shopId, $langId);
        if (count($relations) > self::MAX_RELATIONS) {
            throw new \InvalidArgumentException('Kies maximaal ' . self::MAX_RELATIONS . ' aanvullende categorieën.');
        }
        $validated = [];
        foreach ($relations as $relation) {
            if (!is_array($relation)) {
                throw new \InvalidArgumentException('Een aanvullende categorie is ongeldig.');
            }
            $targetId = $this->positiveId($relation['id_related_category'] ?? null);
            if ($targetId === $sourceId || isset($validated[$targetId])) {
                throw new \InvalidArgumentException('Kies elke aanvullende categorie eenmaal en koppel een categorie niet aan zichzelf.');
            }
            $note = $relation['note'] ?? '';
            if (!is_string($note) || !mb_check_encoding($note, 'UTF-8')) {
                throw new \InvalidArgumentException('Gebruik gewone tekst voor de toelichting.');
            }
            if (mb_strlen($note, 'UTF-8') > self::MAX_NOTE_LENGTH) {
                throw new \InvalidArgumentException('Een toelichting mag maximaal ' . self::MAX_NOTE_LENGTH . ' tekens bevatten.');
            }
            if (preg_match('/[<>\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', html_entity_decode($note, ENT_QUOTES | ENT_HTML5, 'UTF-8'))) {
                throw new \InvalidArgumentException('Gebruik gewone tekst zonder HTML voor de toelichting.');
            }
            $position = $relation['position'] ?? count($validated);
            if ((!is_int($position) && (!is_string($position) || !preg_match('/^(0|[1-9][0-9]*)$/D', $position)))
                || (float) $position < 0 || (float) $position > 4294967295) {
                throw new \InvalidArgumentException('De volgorde van de aanvullende categorieën is ongeldig.');
            }
            $validated[$targetId] = [
                'id_related_category' => $targetId,
                'note' => trim((string) preg_replace('/\s+/u', ' ', $note)),
                'position' => (int) $position,
            ];
        }

        $inTransaction = false;
        try {
            $this->execute('START TRANSACTION');
            $inTransaction = true;
            // Serialize saves for the same source/shop, including its first set of relations.
            $prefix = _DB_PREFIX_;
            $source = $this->rows("SELECT c.id_category FROM {$prefix}category c
                INNER JOIN {$prefix}category_shop cs ON cs.id_category = c.id_category AND cs.id_shop = {$shopId}
                INNER JOIN {$prefix}category_lang cl ON cl.id_category = c.id_category AND cl.id_shop = {$shopId} AND cl.id_lang = {$langId}
                WHERE c.id_category = {$sourceId} FOR UPDATE");
            if (!$source) {
                throw new \InvalidArgumentException('De categorie is niet beschikbaar in de gekozen winkel en taal.');
            }
            $choices = array_column($this->getChoices($sourceId, $shopId, $langId), null, 'id_category');
            $existing = array_column($this->getRelations($sourceId, $shopId), null, 'id_related_category');
            foreach ($validated as $targetId => $relation) {
                if (!isset($choices[$targetId])) {
                    throw new \InvalidArgumentException('Een aanvullende categorie is niet beschikbaar in de gekozen winkel en taal. Selecteer de categorieën opnieuw.');
                }
                if (!$choices[$targetId]['active'] && !isset($existing[$targetId])) {
                    throw new \InvalidArgumentException('Een nieuwe aanvullende categorie moet actief zijn.');
                }
            }

            $this->execute("DELETE FROM {$prefix}msthemeconfig_category_relation WHERE id_category = {$sourceId} AND id_shop = {$shopId}");
            foreach ($validated as $relation) {
                $note = $this->db->escape($relation['note'], true);
                $this->execute("INSERT INTO {$prefix}msthemeconfig_category_relation
                    (id_shop, id_category, id_related_category, position, note)
                    VALUES ({$shopId}, {$sourceId}, {$relation['id_related_category']}, {$relation['position']}, '{$note}')");
            }
            $this->execute('COMMIT');
            $inTransaction = false;
        } catch (\Throwable $error) {
            if ($inTransaction) {
                try { $this->db->execute('ROLLBACK', false); } catch (\Throwable $ignored) { }
            }
            if ($error instanceof \InvalidArgumentException) {
                throw $error;
            }
            throw new \RuntimeException('De aanvullende categorieën konden niet worden opgeslagen. Probeer opnieuw.', 0, $error);
        }
    }

    private function validateScope(int $sourceId, int $shopId, ?int $langId = null): void
    {
        $this->positiveId($sourceId);
        $this->positiveId($shopId);
        if ($langId !== null) { $this->positiveId($langId); }
    }

    private function positiveId($value): int
    {
        if ((!is_int($value) && (!is_string($value) || !preg_match('/^[1-9][0-9]*$/D', $value)))
            || (float) $value < 1 || (float) $value > 4294967295) {
            throw new \InvalidArgumentException('Selecteer een geldige categorie, winkel en taal.');
        }
        return (int) $value;
    }

    private function rows(string $sql): array
    {
        try {
            $rows = $this->db->executeS($sql, true, false);
            if (!is_array($rows)) { throw new \RuntimeException('Query failed.'); }
            return $rows;
        } catch (\Throwable $error) {
            throw new \RuntimeException('De aanvullende categorieën konden niet worden geladen. Probeer opnieuw.', 0, $error);
        }
    }

    private function execute(string $sql): void
    {
        if (!$this->db->execute($sql, false)) {
            throw new \RuntimeException('De aanvullende categorieën konden niet worden opgeslagen. Probeer opnieuw.');
        }
    }
}
