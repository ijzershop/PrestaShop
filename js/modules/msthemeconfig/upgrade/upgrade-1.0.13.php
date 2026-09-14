<?php
/**
 * Module upgrade: 1.0.13
 *
 * Keeps the offer-row memo exclusively on the base product record. Old
 * installations may still contain unused memo columns on product_shop and
 * offer_integration; those duplicate names can shadow the base value when a
 * Product is loaded in a multistore context.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_1_0_13(Module $module): bool
{
    $db = Db::getInstance();
    $columnExists = static function (string $table, string $column) use ($db): bool {
        return (bool) $db->getValue(
            'SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS'
            . ' WHERE TABLE_SCHEMA = \'' . pSQL(_DB_NAME_) . '\''
            . ' AND TABLE_NAME = \'' . pSQL(_DB_PREFIX_ . $table) . '\''
            . ' AND COLUMN_NAME = \'' . pSQL($column) . '\''
        );
    };
    $columnHasValues = static function (string $table, string $column) use ($db): ?bool {
        $count = $db->getValue(
            'SELECT COUNT(*) FROM `' . bqSQL(_DB_PREFIX_ . $table) . '`'
            . ' WHERE `' . bqSQL($column) . '` IS NOT NULL'
            . ' AND CHAR_LENGTH(`' . bqSQL($column) . '`) > 0'
        );

        return $count === false ? null : (bool) $count;
    };

    $result = true;
    if (!$columnExists('product', 'oi_offer_memo')) {
        $result = $db->execute(
            'ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `oi_offer_memo` MEDIUMTEXT DEFAULT NULL'
        ) && $result;
    } else {
        $result = $db->execute(
            'ALTER TABLE `' . _DB_PREFIX_ . 'product` MODIFY COLUMN `oi_offer_memo` MEDIUMTEXT DEFAULT NULL'
        ) && $result;
    }

    // Never discard legacy data automatically. These columns are removed only
    // when they contain no memo text; the live legacy columns are empty.
    foreach (['product_shop', 'offer_integration'] as $legacyTable) {
        if (!$columnExists($legacyTable, 'oi_offer_memo')) {
            continue;
        }

        $hasValues = $columnHasValues($legacyTable, 'oi_offer_memo');
        if ($hasValues === false) {
            $result = $db->execute(
                'ALTER TABLE `' . _DB_PREFIX_ . $legacyTable . '` DROP COLUMN `oi_offer_memo`'
            ) && $result;
        }
    }

    return $result;
}
