<?php
/**
 * Catalog migration script (products, combinations, categories, attributes, features, stock).
 *
 * Usage (CLI):
 *   php scripts/migrate_catalog.php --source-db=ijzershop81 --source-prefix=ps176_ --shop-group=1 --truncate
 *
 * Notes:
 * - This script assumes the source database already exists (e.g. restored from a dump).
 * - It copies only the common columns between source/target tables and fills missing
 *   required columns with safe defaults when needed.
 * - After copying, it clones shop-related rows to all shops in the given shop group.
 */

$options = getopt('', array(
    'source-db:',
    'source-prefix::',
    'target-db::',
    'target-prefix::',
    'shop-group::',
    'stock-default::',
    'source-dump-file::',
    'temp-db::',
    'recreate-temp',
    'include-customers',
    'truncate',
    'dry-run',
    'help',
));

if (isset($options['help'])) {
    echo "Usage: php scripts/migrate_catalog.php [--source-db=NAME] [--source-prefix=ps176_] [--target-db=NAME] [--target-prefix=msmid_] [--shop-group=1] [--stock-default=1000] [--include-customers] [--source-dump-file=PATH --temp-db=NAME [--recreate-temp]] [--truncate] [--dry-run]\n";
    echo "Note: Either --source-db OR (--source-dump-file AND --temp-db) must be provided.\n";
    exit(0);
}

$params = require __DIR__ . '/../app/config/parameters.php';
$dbParams = $params['parameters'];

$sourceDb = $options['source-db'] ?? null;
$sourceDumpFile = $options['source-dump-file'] ?? null;
$tempDb = $options['temp-db'] ?? null;

if ($sourceDb === null && ($sourceDumpFile === null || $tempDb === null)) {
    fwrite(STDERR, "Missing required source. Provide either --source-db or both --source-dump-file and --temp-db.\n");
    exit(1);
}

$sourcePrefix = $options['source-prefix'] ?? 'ps176_';
$targetDb = $options['target-db'] ?? $dbParams['database_name'];
$targetPrefix = $options['target-prefix'] ?? $dbParams['database_prefix'];
$shopGroupId = isset($options['shop-group']) ? (int) $options['shop-group'] : 1;
$stockDefault = isset($options['stock-default']) ? (int) $options['stock-default'] : 1000;
$recreateTemp = array_key_exists('recreate-temp', $options);
$includeCustomers = array_key_exists('include-customers', $options);
$doTruncate = array_key_exists('truncate', $options);
$dryRun = array_key_exists('dry-run', $options);

$pdoTarget = buildPdo($dbParams['database_host'], $dbParams['database_port'], $targetDb, $dbParams['database_user'], $dbParams['database_password']);

if ($sourceDumpFile !== null && $tempDb !== null) {
    $sourceDb = $tempDb;
    restoreDumpToTempDb(
        $dbParams['database_host'],
        $dbParams['database_port'],
        $dbParams['database_user'],
        $dbParams['database_password'],
        $tempDb,
        $sourceDumpFile,
        $recreateTemp,
        $dryRun
    );
}

$pdoSource = buildPdo($dbParams['database_host'], $dbParams['database_port'], $sourceDb, $dbParams['database_user'], $dbParams['database_password']);

echo "Connected to Source DB: {$sourceDb}\n";
echo "Connected to Target DB: {$targetDb}\n";

$tables = array(
    'image',
    'image_lang',
    'image_shop',
    'attachment',
    'attachment_lang',
    'product_attachment',
    'category',
    'category_lang',
    'category_shop',
    'category_group',
    'category_product',
    'attribute_group',
    'attribute_group_lang',
    'attribute_group_shop',
    'attribute',
    'attribute_lang',
    'attribute_shop',
    'feature',
    'feature_lang',
    'feature_shop',
    'feature_value',
    'feature_value_lang',
    'feature_product',
    'supplier',
    'supplier_lang',
    'supplier_shop',
    'tax',
    'tax_lang',
    'tax_rule',
    'tax_rules_group',
    'tax_rules_group_shop',
    'product',
    'product_lang',
    'product_shop',
    'product_carrier',
    'product_sale',
    'product_supplier',
    'product_tag',
    'product_download',
    'specific_price',
    'specific_price_priority',
    'specific_price_rule',
    'specific_price_rule_condition',
    'specific_price_rule_condition_group',
    'product_attribute',
    'product_attribute_lang',
    'product_attribute_shop',
    'product_attribute_combination',
    'product_attribute_image',
    'stock_available',
);

$noTruncateTables = array(
    'category',
    'category_lang',
    'category_shop',
    'category_group',
    'category_product',
);

$upsertTables = array(
    'category',
    'category_lang',
    'category_shop',
    'category_group',
    'category_product',
);

$customerTables = array(
    'customer',
    'customer_group',
    'customer_message',
    'customer_message_sync_imap',
    'customer_thread',
    'address',
);
if ($includeCustomers) {
    $tables = array_merge($tables, $customerTables);
}

echo "Source: {$sourceDb}.{$sourcePrefix}*\n";
echo "Target: {$targetDb}.{$targetPrefix}*\n";
echo "Shop group: {$shopGroupId}\n";
echo "Stock default: {$stockDefault}\n";
echo $includeCustomers ? "Include customers: yes\n" : "Include customers: no\n";
echo $doTruncate ? "Mode: truncate + copy\n" : "Mode: copy only\n";
if ($dryRun) {
    echo "Dry-run: no changes will be executed\n";
}

runStatement($pdoTarget, 'SET FOREIGN_KEY_CHECKS = 0', $dryRun);
runStatement($pdoTarget, 'SET UNIQUE_CHECKS = 0', $dryRun);

if ($doTruncate) {
    foreach ($tables as $baseTable) {
        if (in_array($baseTable, $noTruncateTables, true)) {
            echo "Skip truncate: {$baseTable} (preserve + upsert)\n";
            continue;
        }
        $targetTable = $targetPrefix . $baseTable;
        if (!tableExists($pdoTarget, $targetDb, $targetTable)) {
            echo "Skip truncate: {$targetTable} (missing)\n";
            continue;
        }
        runStatement($pdoTarget, 'TRUNCATE TABLE `' . $targetDb . '`.`' . $targetTable . '`', $dryRun);
    }
}

$warnings = array();
foreach ($tables as $baseTable) {
    $sourceTable = $sourcePrefix . $baseTable;
    $targetTable = $targetPrefix . $baseTable;
    if (!tableExists($pdoSource, $sourceDb, $sourceTable)) {
        echo "Skip copy: {$sourceTable} (missing in source)\n";
        continue;
    }
    if (!tableExists($pdoTarget, $targetDb, $targetTable)) {
        echo "Skip copy: {$targetTable} (missing in target)\n";
        continue;
    }

    $mode = in_array($baseTable, $upsertTables, true) ? 'upsert' : 'insert';
    $result = buildInsertSelect($pdoSource, $pdoTarget, $sourceDb, $targetDb, $sourceTable, $targetTable, $mode);
    if ($result['sql'] === null) {
        echo "Skip copy: {$baseTable} (no compatible columns)\n";
        continue;
    }

    runStatement($pdoTarget, $result['sql'], $dryRun);
    $warnings = array_merge($warnings, $result['warnings']);
}

syncShopGroupData($pdoTarget, $targetDb, $targetPrefix, $shopGroupId, $dryRun);
syncCategoryGroups($pdoTarget, $targetDb, $targetPrefix, $dryRun);
setStockDefaults($pdoTarget, $targetDb, $targetPrefix, $stockDefault, $dryRun);
fixProductSupplierCurrency($pdoTarget, $targetDb, $targetPrefix, $dryRun);

runStatement($pdoTarget, 'SET FOREIGN_KEY_CHECKS = 1', $dryRun);
runStatement($pdoTarget, 'SET UNIQUE_CHECKS = 1', $dryRun);

foreach ($warnings as $warning) {
    echo "Warning: {$warning}\n";
}

runChecks($pdoTarget, $pdoSource, $targetDb, $sourceDb, $targetPrefix, $sourcePrefix, $shopGroupId);
runIdConsistencyChecks($pdoTarget, $pdoSource, $targetDb, $sourceDb, $targetPrefix, $sourcePrefix);
runModelRelationChecks($pdoTarget, $targetDb, $targetPrefix);

echo "Done.\n";

function buildPdo($host, $port, $dbName, $user, $password)
{
    $portSuffix = $port ? ';port=' . $port : '';
    $dsn = 'mysql:host=' . $host . $portSuffix . ';dbname=' . $dbName . ';charset=utf8mb4';
    $pdo = new PDO($dsn, $user, $password, array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ));

    // Increase timeouts and max packet size for the session if possible
    try {
        $pdo->exec('SET SESSION wait_timeout = 28800');
        $pdo->exec('SET SESSION interactive_timeout = 28800');
        $pdo->exec('SET SESSION max_allowed_packet = 1073741824');
    } catch (Exception $e) {
        // Ignore if we don't have permissions to set these
    }

    return $pdo;
}

function restoreDumpToTempDb($host, $port, $user, $password, $dbName, $dumpFile, $recreate, $dryRun)
{
    if (!is_file($dumpFile)) {
        fwrite(STDERR, "Dump file not found: {$dumpFile}\n");
        exit(1);
    }

    $portArg = $port ? '--port=' . escapeshellarg($port) : '';
    $passArg = $password !== '' ? '--password=' . escapeshellarg($password) : '';
    $mysqlBase = 'mysql --host=' . escapeshellarg($host) . ' --user=' . escapeshellarg($user) . ' ' . $portArg . ' ' . $passArg;

    if ($recreate) {
        $dropCreate = $mysqlBase . ' -e ' . escapeshellarg('DROP DATABASE IF EXISTS `' . $dbName . '`; CREATE DATABASE `' . $dbName . '` DEFAULT CHARACTER SET utf8mb4;');
        runShell($dropCreate, $dryRun);
    } else {
        $create = $mysqlBase . ' -e ' . escapeshellarg('CREATE DATABASE IF NOT EXISTS `' . $dbName . '` DEFAULT CHARACTER SET utf8mb4;');
        runShell($create, $dryRun);
    }

    $import = $mysqlBase . ' ' . escapeshellarg($dbName) . ' < ' . escapeshellarg($dumpFile);
    runShell($import, $dryRun);
}

function runShell($command, $dryRun)
{
    echo $dryRun ? "[dry-run] {$command}\n" : "{$command}\n";
    if ($dryRun) {
        return;
    }
    $result = shell_exec($command);
    if ($result !== null) {
        echo $result;
    }
}

function tableExists(PDO $pdo, $dbName, $tableName)
{
    $stmt = $pdo->prepare('SHOW TABLES LIKE :table');
    $stmt->execute(array('table' => $tableName));
    return (bool) $stmt->fetch();
}

function getTableColumns(PDO $pdo, $dbName, $tableName)
{
    $stmt = $pdo->prepare(
        'SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_DEFAULT, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_TYPE ' .
        'FROM INFORMATION_SCHEMA.COLUMNS ' .
        'WHERE TABLE_SCHEMA = :db AND TABLE_NAME = :table ' .
        'ORDER BY ORDINAL_POSITION'
    );
    $stmt->execute(array('db' => $dbName, 'table' => $tableName));
    $columns = array();
    foreach ($stmt->fetchAll() as $row) {
        $columns[$row['COLUMN_NAME']] = array(
            'nullable' => $row['IS_NULLABLE'] === 'YES',
            'default' => $row['COLUMN_DEFAULT'],
            'data_type' => strtolower($row['DATA_TYPE']),
            'char_length' => $row['CHARACTER_MAXIMUM_LENGTH'] === null ? null : (int) $row['CHARACTER_MAXIMUM_LENGTH'],
            'column_type' => $row['COLUMN_TYPE'],
        );
    }
    return $columns;
}

function getPrimaryKeys(PDO $pdo, $dbName, $tableName)
{
    $stmt = $pdo->prepare(
        'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE ' .
        'WHERE TABLE_SCHEMA = :db AND TABLE_NAME = :table AND CONSTRAINT_NAME = \'PRIMARY\' ' .
        'ORDER BY ORDINAL_POSITION'
    );
    $stmt->execute(array('db' => $dbName, 'table' => $tableName));
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

function buildInsertSelect(PDO $pdoSource, PDO $pdoTarget, $sourceDb, $targetDb, $sourceTable, $targetTable, $mode)
{
    $sourceColumns = getTableColumns($pdoSource, $sourceDb, $sourceTable);
    $targetColumns = getTableColumns($pdoTarget, $targetDb, $targetTable);
    $primaryKeys = getPrimaryKeys($pdoTarget, $targetDb, $targetTable);

    $insertCols = array();
    $selectCols = array();
    $warnings = array();

    foreach ($targetColumns as $col => $tinfo) {
        if (isset($sourceColumns[$col])) {
            $expr = buildSelectExpression($col, $sourceColumns[$col], $tinfo);
            $insertCols[] = '`' . $col . '`';
            $selectCols[] = $expr . ' AS `' . $col . '`';
            continue;
        }

        if ($tinfo['nullable'] || $tinfo['default'] !== null) {
            continue;
        }

        $fallback = fallbackLiteral($tinfo['data_type']);
        $insertCols[] = '`' . $col . '`';
        $selectCols[] = $fallback . ' AS `' . $col . '`';
        $warnings[] = $targetTable . '.' . $col . ' missing in source; using fallback ' . $fallback;
    }

    if (!$insertCols) {
        return array('sql' => null, 'warnings' => $warnings);
    }

    $sql = 'INSERT INTO `' . $targetDb . '`.`' . $targetTable . '` (' . implode(', ', $insertCols) . ') ' .
        'SELECT ' . implode(', ', $selectCols) . ' FROM `' . $sourceDb . '`.`' . $sourceTable . '` s';

    if ($mode === 'upsert') {
        $updateCols = array();
        foreach ($insertCols as $col) {
            $clean = trim($col, '`');
            if (in_array($clean, $primaryKeys, true)) {
                continue;
            }
            $updateCols[] = $col . ' = VALUES(' . $col . ')';
        }
        if ($updateCols) {
            $sql .= ' ON DUPLICATE KEY UPDATE ' . implode(', ', $updateCols);
        } else {
            $sql = str_replace('INSERT INTO', 'INSERT IGNORE INTO', $sql);
        }
    }
    return array('sql' => $sql, 'warnings' => $warnings);
}

function buildSelectExpression($col, array $sourceInfo, array $targetInfo)
{
    $expr = 's.`' . $col . '`';

    if (isStringType($targetInfo['data_type']) && isStringType($sourceInfo['data_type'])) {
        if ($targetInfo['char_length'] !== null && $sourceInfo['char_length'] !== null && $targetInfo['char_length'] < $sourceInfo['char_length']) {
            $expr = 'LEFT(' . $expr . ', ' . $targetInfo['char_length'] . ')';
        }
        return $expr;
    }

    if (isNumericType($targetInfo['data_type']) && isStringType($sourceInfo['data_type'])) {
        if (isIntegerType($targetInfo['data_type'])) {
            return 'CAST(' . $expr . ' AS SIGNED)';
        }
        return 'CAST(' . $expr . ' AS DECIMAL(20,6))';
    }

    return $expr;
}

function isStringType($type)
{
    return in_array($type, array('char', 'varchar', 'text', 'tinytext', 'mediumtext', 'longtext', 'json'), true);
}

function isNumericType($type)
{
    return in_array($type, array('int', 'bigint', 'smallint', 'mediumint', 'tinyint', 'decimal', 'numeric', 'float', 'double'), true);
}

function isIntegerType($type)
{
    return in_array($type, array('int', 'bigint', 'smallint', 'mediumint', 'tinyint'), true);
}

function fallbackLiteral($dataType)
{
    if (isIntegerType($dataType) || in_array($dataType, array('decimal', 'numeric', 'float', 'double'), true)) {
        return '0';
    }
    if ($dataType === 'date') {
        return "'0000-00-00'";
    }
    if ($dataType === 'datetime' || $dataType === 'timestamp') {
        return "'0000-00-00 00:00:00'";
    }
    return "''";
}

function runStatement(PDO &$pdo, $sql, $dryRun)
{
    echo $dryRun ? "[dry-run] {$sql}\n" : "{$sql}\n";
    if ($dryRun) {
        return;
    }

    try {
        $pdo->exec($sql);
    } catch (PDOException $e) {
        // If "MySQL server has gone away" (2006) or "Lost connection to MySQL server during query" (2013)
        if ($e->errorInfo[1] == 2006 || $e->errorInfo[1] == 2013) {
            echo "Connection lost. Reconnecting...\n";
            reconnect($pdo);
            $pdo->exec($sql);
        } else {
            throw $e;
        }
    }
}

function reconnect(PDO &$pdo)
{
    global $dbParams, $sourceDb, $targetDb;

    // We need to know which DB this PDO belongs to.
    // This is a bit hacky since PDO doesn't expose connection params easily.
    // However, in this script we have exactly two connections: $pdoSource and $pdoTarget.

    // We'll determine which one it is based on the currently selected database in the DSN if we stored it,
    // but since we don't store it, we'll try to guess or just rebuild based on where it was called.

    // Better approach: Update runStatement to take the specific params if it fails,
    // or just allow the script to fail and let the user increase server-side timeouts.
    // Actually, for this specific script, we can just rebuild $pdoTarget or $pdoSource.

    // Since runStatement is only used for $pdoTarget in the main loop, we can assume it's target
    // OR we pass the params to runStatement.

    // Let's modify buildPdo to return a wrapper or just use globals for now as it's a CLI script.

    $pdo = buildPdo($dbParams['database_host'], $dbParams['database_port'], $targetDb, $dbParams['database_user'], $dbParams['database_password']);
}

function syncShopGroupData(PDO &$pdoTarget, $targetDb, $targetPrefix, $shopGroupId, $dryRun)
{
    $shopTable = $targetPrefix . 'shop';
    if (!tableExists($pdoTarget, $targetDb, $shopTable)) {
        echo "Skip shop sync: {$shopTable} missing\n";
        return;
    }

    $shopIds = $pdoTarget->prepare('SELECT id_shop FROM `' . $targetDb . '`.`' . $shopTable . '` WHERE id_shop_group = :group');
    $shopIds->execute(array('group' => $shopGroupId));
    $shops = $shopIds->fetchAll(PDO::FETCH_COLUMN);
    if (!$shops) {
        echo "Skip shop sync: no shops found for group {$shopGroupId}\n";
        return;
    }

    $cloneTables = array(
        array('table' => 'product_shop', 'keys' => array('id_product')),
        array('table' => 'product_attribute_shop', 'keys' => array('id_product_attribute')),
        array('table' => 'category_shop', 'keys' => array('id_category')),
        array('table' => 'attribute_group_shop', 'keys' => array('id_attribute_group')),
        array('table' => 'attribute_shop', 'keys' => array('id_attribute')),
        array('table' => 'feature_shop', 'keys' => array('id_feature')),
        array('table' => 'supplier_shop', 'keys' => array('id_supplier')),
        array('table' => 'stock_available', 'keys' => array('id_product', 'id_product_attribute')),
    );

    foreach ($cloneTables as $cfg) {
        $targetTable = $targetPrefix . $cfg['table'];
        if (!tableExists($pdoTarget, $targetDb, $targetTable)) {
            echo "Skip shop clone: {$targetTable} missing\n";
            continue;
        }
        cloneShopRows($pdoTarget, $targetDb, $targetTable, $targetPrefix, $cfg['keys'], $shopGroupId, $dryRun, $cfg['table'] === 'stock_available');
    }

    cloneLangRows($pdoTarget, $targetDb, $targetPrefix . 'product_lang', array('id_product', 'id_lang'), $shopGroupId, $targetPrefix, $dryRun);
    cloneLangRows($pdoTarget, $targetDb, $targetPrefix . 'category_lang', array('id_category', 'id_lang'), $shopGroupId, $targetPrefix, $dryRun);

    setDefaultShop($pdoTarget, $targetDb, $targetPrefix, $shopGroupId, $dryRun);
}

function syncCategoryGroups(PDO &$pdoTarget, $targetDb, $targetPrefix, $dryRun)
{
    $categoryTable = $targetPrefix . 'category';
    $groupTable = $targetPrefix . 'category_group';
    if (!tableExists($pdoTarget, $targetDb, $categoryTable) || !tableExists($pdoTarget, $targetDb, $groupTable)) {
        return;
    }

    echo "Syncing category groups (1, 2, 3) for all categories...\n";
    for ($groupId = 1; $groupId <= 3; $groupId++) {
        $sql = "INSERT IGNORE INTO `{$targetDb}`.`{$groupTable}` (id_category, id_group)
                SELECT id_category, " . (int)$groupId . " FROM `{$targetDb}`.`{$categoryTable}`";
        runStatement($pdoTarget, $sql, $dryRun);
    }
}

function setStockDefaults(PDO &$pdoTarget, $targetDb, $targetPrefix, $stockDefault, $dryRun)
{
    $stockTable = $targetPrefix . 'stock_available';
    if (tableExists($pdoTarget, $targetDb, $stockTable) && columnExists($pdoTarget, $targetDb, $stockTable, 'quantity')) {
        runStatement(
            $pdoTarget,
            'UPDATE `' . $targetDb . '`.`' . $stockTable . '` SET `quantity` = ' . (int) $stockDefault,
            $dryRun
        );
    }

    $productTable = $targetPrefix . 'product';
    if (tableExists($pdoTarget, $targetDb, $productTable) && columnExists($pdoTarget, $targetDb, $productTable, 'quantity')) {
        runStatement(
            $pdoTarget,
            'UPDATE `' . $targetDb . '`.`' . $productTable . '` SET `quantity` = ' . (int) $stockDefault,
            $dryRun
        );
    }

    $productAttrTable = $targetPrefix . 'product_attribute';
    if (tableExists($pdoTarget, $targetDb, $productAttrTable) && columnExists($pdoTarget, $targetDb, $productAttrTable, 'quantity')) {
        runStatement(
            $pdoTarget,
            'UPDATE `' . $targetDb . '`.`' . $productAttrTable . '` SET `quantity` = ' . (int) $stockDefault,
            $dryRun
        );
    }
}

function fixProductSupplierCurrency(PDO &$pdoTarget, $targetDb, $targetPrefix, $dryRun)
{
    $table = $targetPrefix . 'product_supplier';
    if (!tableExists($pdoTarget, $targetDb, $table)) {
        return;
    }
    if (!columnExists($pdoTarget, $targetDb, $table, 'id_currency')) {
        return;
    }

    $sql = 'UPDATE `' . $targetDb . '`.`' . $table . '` SET `id_currency` = 1 WHERE `id_currency` = 0 OR `id_currency` IS NULL';
    runStatement($pdoTarget, $sql, $dryRun);
}

function columnExists(PDO $pdo, $dbName, $tableName, $column)
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = :db AND TABLE_NAME = :table AND COLUMN_NAME = :column');
    $stmt->execute(array('db' => $dbName, 'table' => $tableName, 'column' => $column));
    return (int) $stmt->fetchColumn() > 0;
}

function cloneShopRows(PDO &$pdoTarget, $targetDb, $targetTable, $targetPrefix, array $keyColumns, $shopGroupId, $dryRun, $forceShopGroupZero)
{
    $columns = getTableColumns($pdoTarget, $targetDb, $targetTable);
    if (!isset($columns['id_shop'])) {
        echo "Skip shop clone: {$targetTable} has no id_shop column\n";
        return;
    }

    $selectBase = buildBaseRowQuery($targetTable, $keyColumns, 'id_shop');
    $shopTable = $targetPrefix . 'shop';
    $selectCols = array();
    foreach ($columns as $col => $info) {
        if ($col === 'id_shop') {
            $selectCols[] = 's.id_shop AS `id_shop`';
            continue;
        }
        if ($forceShopGroupZero && $col === 'id_shop_group') {
            $selectCols[] = '0 AS `id_shop_group`';
            continue;
        }
        if (in_array($col, $keyColumns, true)) {
            $selectCols[] = 'base.`' . $col . '` AS `' . $col . '`';
            continue;
        }
        $selectCols[] = 'base.`' . $col . '` AS `' . $col . '`';
    }

    $sql = 'INSERT IGNORE INTO `' . $targetDb . '`.`' . $targetTable . '` (' . implode(', ', array_map(function ($c) {
        return '`' . $c . '`';
    }, array_keys($columns))) . ') ' .
        'SELECT ' . implode(', ', $selectCols) . ' ' .
        'FROM (' . $selectBase . ') base ' .
        'JOIN `' . $targetDb . '`.`' . $shopTable . '` s ON s.id_shop_group = ' . (int) $shopGroupId;

    runStatement($pdoTarget, $sql, $dryRun);
}

function cloneLangRows(PDO &$pdoTarget, $targetDb, $targetTable, array $keyColumns, $shopGroupId, $targetPrefix, $dryRun)
{
    if (!tableExists($pdoTarget, $targetDb, $targetTable)) {
        echo "Skip lang clone: {$targetTable} missing\n";
        return;
    }

    $columns = getTableColumns($pdoTarget, $targetDb, $targetTable);
    if (!isset($columns['id_shop'])) {
        echo "Skip lang clone: {$targetTable} has no id_shop column\n";
        return;
    }

    $selectBase = buildBaseRowQuery($targetTable, $keyColumns, 'id_shop');
    $shopTable = $targetPrefix . 'shop';
    $selectCols = array();
    foreach ($columns as $col => $info) {
        if ($col === 'id_shop') {
            $selectCols[] = 's.id_shop AS `id_shop`';
            continue;
        }
        $selectCols[] = 'base.`' . $col . '` AS `' . $col . '`';
    }

    $sql = 'INSERT IGNORE INTO `' . $targetDb . '`.`' . $targetTable . '` (' . implode(', ', array_map(function ($c) {
        return '`' . $c . '`';
    }, array_keys($columns))) . ') ' .
        'SELECT ' . implode(', ', $selectCols) . ' ' .
        'FROM (' . $selectBase . ') base ' .
        'JOIN `' . $targetDb . '`.`' . $shopTable . '` s ON s.id_shop_group = ' . (int) $shopGroupId;

    runStatement($pdoTarget, $sql, $dryRun);
}

function buildBaseRowQuery($targetTable, array $keyColumns, $shopColumn)
{
    $keySelect = implode(', ', array_map(function ($col) {
        return '`' . $col . '`';
    }, $keyColumns));
    $keyJoin = implode(' AND ', array_map(function ($col) use ($shopColumn) {
        return 'pick.`' . $col . '` = base.`' . $col . '`';
    }, $keyColumns));

    return 'SELECT base.* FROM `' . $targetTable . '` base ' .
        'JOIN (SELECT ' . $keySelect . ', MIN(`' . $shopColumn . '`) AS `' . $shopColumn . '` ' .
        'FROM `' . $targetTable . '` GROUP BY ' . $keySelect . ') pick ' .
        'ON ' . $keyJoin . ' AND base.`' . $shopColumn . '` = pick.`' . $shopColumn . '`';
}

function setDefaultShop(PDO &$pdoTarget, $targetDb, $targetPrefix, $shopGroupId, $dryRun)
{
    $productTable = $targetPrefix . 'product';
    if (!tableExists($pdoTarget, $targetDb, $productTable)) {
        return;
    }

    $columns = getTableColumns($pdoTarget, $targetDb, $productTable);
    if (!isset($columns['id_shop_default'])) {
        return;
    }

    $sql = 'UPDATE `' . $targetDb . '`.`' . $productTable . '` p ' .
        'LEFT JOIN `' . $targetDb . '`.`' . $targetPrefix . 'shop` s ' .
        'ON s.id_shop = p.id_shop_default AND s.id_shop_group = ' . (int) $shopGroupId . ' ' .
        'SET p.id_shop_default = (SELECT MIN(id_shop) FROM `' . $targetDb . '`.`' . $targetPrefix . 'shop` WHERE id_shop_group = ' . (int) $shopGroupId . ') ' .
        'WHERE s.id_shop IS NULL';

    runStatement($pdoTarget, $sql, $dryRun);
}

function runChecks(PDO $pdoTarget, PDO $pdoSource, $targetDb, $sourceDb, $targetPrefix, $sourcePrefix, $shopGroupId)
{
    echo "Checks:\n";

    $combSource = countRows($pdoSource, $sourceDb, $sourcePrefix . 'product_attribute_combination');
    $combTarget = countRows($pdoTarget, $targetDb, $targetPrefix . 'product_attribute_combination');
    echo "product_attribute_combination source={$combSource} target={$combTarget}\n";

    $orphanComb = runScalar($pdoTarget,
        'SELECT COUNT(*) FROM `' . $targetDb . '`.`' . $targetPrefix . 'product_attribute_combination` pac ' .
        'LEFT JOIN `' . $targetDb . '`.`' . $targetPrefix . 'product_attribute` pa ON pa.id_product_attribute = pac.id_product_attribute ' .
        'LEFT JOIN `' . $targetDb . '`.`' . $targetPrefix . 'attribute` a ON a.id_attribute = pac.id_attribute ' .
        'WHERE pa.id_product_attribute IS NULL OR a.id_attribute IS NULL'
    );
    echo "product_attribute_combination orphans={$orphanComb}\n";

    $stockTarget = countRows($pdoTarget, $targetDb, $targetPrefix . 'stock_available');
    $stockSource = countRows($pdoSource, $sourceDb, $sourcePrefix . 'stock_available');
    echo "stock_available source={$stockSource} target={$stockTarget}\n";

    $stockOrphanProduct = runScalar($pdoTarget,
        'SELECT COUNT(*) FROM `' . $targetDb . '`.`' . $targetPrefix . 'stock_available` sa ' .
        'LEFT JOIN `' . $targetDb . '`.`' . $targetPrefix . 'product` p ON p.id_product = sa.id_product ' .
        'WHERE p.id_product IS NULL'
    );
    echo "stock_available orphans (product)={$stockOrphanProduct}\n";

    $stockOrphanAttr = runScalar($pdoTarget,
        'SELECT COUNT(*) FROM `' . $targetDb . '`.`' . $targetPrefix . 'stock_available` sa ' .
        'LEFT JOIN `' . $targetDb . '`.`' . $targetPrefix . 'product_attribute` pa ON pa.id_product_attribute = sa.id_product_attribute ' .
        'WHERE sa.id_product_attribute != 0 AND pa.id_product_attribute IS NULL'
    );
    echo "stock_available orphans (combination)={$stockOrphanAttr}\n";

    $shopCount = runScalar($pdoTarget,
        'SELECT COUNT(*) FROM `' . $targetDb . '`.`' . $targetPrefix . 'shop` WHERE id_shop_group = ' . (int) $shopGroupId
    );
    $missingStock = runScalar($pdoTarget,
        'SELECT COUNT(*) FROM (' .
        'SELECT sa.id_product, sa.id_product_attribute, COUNT(DISTINCT sa.id_shop) AS shop_count ' .
        'FROM `' . $targetDb . '`.`' . $targetPrefix . 'stock_available` sa ' .
        'GROUP BY sa.id_product, sa.id_product_attribute ' .
        'HAVING shop_count < ' . (int) $shopCount .
        ') t'
    );
    echo "stock_available missing shop rows={$missingStock}\n";

    runCombinationGroupCheck($pdoSource, $sourceDb, $sourcePrefix, '%%Zaag%%', 'source');
    runCombinationGroupCheck($pdoTarget, $targetDb, $targetPrefix, '%%Zaag%%', 'target');
    runCombinationGroupCheck($pdoSource, $sourceDb, $sourcePrefix, '%%Knip%%', 'source');
    runCombinationGroupCheck($pdoTarget, $targetDb, $targetPrefix, '%%Knip%%', 'target');

    $supplierCurrencyIssues = runScalar($pdoTarget,
        'SELECT COUNT(*) FROM `' . $targetDb . '`.`' . $targetPrefix . 'product_supplier` WHERE id_currency = 0 OR id_currency IS NULL'
    );
    echo "product_supplier id_currency invalid={$supplierCurrencyIssues}\n";
}

function runModelRelationChecks(PDO $pdoTarget, $targetDb, $targetPrefix)
{
    echo "Model relations:\n";

    $checks = array(
        array(
            'label' => 'product.id_category_default missing',
            'tables' => array('product', 'category'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product` p LEFT JOIN `{db}`.`{p}category` c ON c.id_category = p.id_category_default WHERE p.id_category_default != 0 AND c.id_category IS NULL',
        ),
        array(
            'label' => 'product.id_tax_rules_group missing',
            'tables' => array('product', 'tax_rules_group'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product` p LEFT JOIN `{db}`.`{p}tax_rules_group` trg ON trg.id_tax_rules_group = p.id_tax_rules_group WHERE p.id_tax_rules_group != 0 AND trg.id_tax_rules_group IS NULL',
        ),
        array(
            'label' => 'product.id_manufacturer missing',
            'tables' => array('product', 'manufacturer'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product` p LEFT JOIN `{db}`.`{p}manufacturer` m ON m.id_manufacturer = p.id_manufacturer WHERE p.id_manufacturer != 0 AND m.id_manufacturer IS NULL',
        ),
        array(
            'label' => 'product.id_supplier missing',
            'tables' => array('product', 'supplier'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product` p LEFT JOIN `{db}`.`{p}supplier` s ON s.id_supplier = p.id_supplier WHERE p.id_supplier != 0 AND s.id_supplier IS NULL',
        ),
        array(
            'label' => 'product_shop without product',
            'tables' => array('product_shop', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_shop` ps LEFT JOIN `{db}`.`{p}product` p ON p.id_product = ps.id_product WHERE p.id_product IS NULL',
        ),
        array(
            'label' => 'product_shop id_category_default missing',
            'tables' => array('product_shop', 'category'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_shop` ps LEFT JOIN `{db}`.`{p}category` c ON c.id_category = ps.id_category_default WHERE ps.id_category_default != 0 AND c.id_category IS NULL',
        ),
        array(
            'label' => 'product_lang without product',
            'tables' => array('product_lang', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_lang` pl LEFT JOIN `{db}`.`{p}product` p ON p.id_product = pl.id_product WHERE p.id_product IS NULL',
        ),
        array(
            'label' => 'category_lang without category',
            'tables' => array('category_lang', 'category'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}category_lang` cl LEFT JOIN `{db}`.`{p}category` c ON c.id_category = cl.id_category WHERE c.id_category IS NULL',
        ),
        array(
            'label' => 'category_shop without category',
            'tables' => array('category_shop', 'category'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}category_shop` cs LEFT JOIN `{db}`.`{p}category` c ON c.id_category = cs.id_category WHERE c.id_category IS NULL',
        ),
        array(
            'label' => 'category_product missing category or product',
            'tables' => array('category_product', 'category', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}category_product` cp LEFT JOIN `{db}`.`{p}category` c ON c.id_category = cp.id_category LEFT JOIN `{db}`.`{p}product` p ON p.id_product = cp.id_product WHERE c.id_category IS NULL OR p.id_product IS NULL',
        ),
        array(
            'label' => 'image without product',
            'tables' => array('image', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}image` i LEFT JOIN `{db}`.`{p}product` p ON p.id_product = i.id_product WHERE p.id_product IS NULL',
        ),
        array(
            'label' => 'image_lang without image',
            'tables' => array('image_lang', 'image'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}image_lang` il LEFT JOIN `{db}`.`{p}image` i ON i.id_image = il.id_image WHERE i.id_image IS NULL',
        ),
        array(
            'label' => 'image_shop without image',
            'tables' => array('image_shop', 'image'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}image_shop` ishop LEFT JOIN `{db}`.`{p}image` i ON i.id_image = ishop.id_image WHERE i.id_image IS NULL',
        ),
        array(
            'label' => 'product_attribute without product',
            'tables' => array('product_attribute', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_attribute` pa LEFT JOIN `{db}`.`{p}product` p ON p.id_product = pa.id_product WHERE p.id_product IS NULL',
        ),
        array(
            'label' => 'product_attribute_lang without product_attribute',
            'tables' => array('product_attribute_lang', 'product_attribute'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_attribute_lang` pal LEFT JOIN `{db}`.`{p}product_attribute` pa ON pa.id_product_attribute = pal.id_product_attribute WHERE pa.id_product_attribute IS NULL',
        ),
        array(
            'label' => 'product_attribute_shop without product_attribute',
            'tables' => array('product_attribute_shop', 'product_attribute'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_attribute_shop` pas LEFT JOIN `{db}`.`{p}product_attribute` pa ON pa.id_product_attribute = pas.id_product_attribute WHERE pa.id_product_attribute IS NULL',
        ),
        array(
            'label' => 'product_attribute_image missing product_attribute or image',
            'tables' => array('product_attribute_image', 'product_attribute', 'image'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_attribute_image` pai LEFT JOIN `{db}`.`{p}product_attribute` pa ON pa.id_product_attribute = pai.id_product_attribute LEFT JOIN `{db}`.`{p}image` i ON i.id_image = pai.id_image WHERE pa.id_product_attribute IS NULL OR i.id_image IS NULL',
        ),
        array(
            'label' => 'product_attachment missing product or attachment',
            'tables' => array('product_attachment', 'product', 'attachment'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_attachment` pa LEFT JOIN `{db}`.`{p}product` p ON p.id_product = pa.id_product LEFT JOIN `{db}`.`{p}attachment` a ON a.id_attachment = pa.id_attachment WHERE p.id_product IS NULL OR a.id_attachment IS NULL',
        ),
        array(
            'label' => 'product_download without product',
            'tables' => array('product_download', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_download` pd LEFT JOIN `{db}`.`{p}product` p ON p.id_product = pd.id_product WHERE p.id_product IS NULL',
        ),
        array(
            'label' => 'product_supplier missing product',
            'tables' => array('product_supplier', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_supplier` ps LEFT JOIN `{db}`.`{p}product` p ON p.id_product = ps.id_product WHERE p.id_product IS NULL',
        ),
        array(
            'label' => 'product_supplier missing combination',
            'tables' => array('product_supplier', 'product_attribute'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_supplier` ps LEFT JOIN `{db}`.`{p}product_attribute` pa ON pa.id_product_attribute = ps.id_product_attribute WHERE ps.id_product_attribute != 0 AND pa.id_product_attribute IS NULL',
        ),
        array(
            'label' => 'product_supplier missing supplier',
            'tables' => array('product_supplier', 'supplier'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_supplier` ps LEFT JOIN `{db}`.`{p}supplier` s ON s.id_supplier = ps.id_supplier WHERE ps.id_supplier != 0 AND s.id_supplier IS NULL',
        ),
        array(
            'label' => 'product_supplier missing currency',
            'tables' => array('product_supplier', 'currency'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}product_supplier` ps LEFT JOIN `{db}`.`{p}currency` c ON c.id_currency = ps.id_currency WHERE ps.id_currency != 0 AND c.id_currency IS NULL',
        ),
        array(
            'label' => 'stock_available missing product',
            'tables' => array('stock_available', 'product'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}stock_available` sa LEFT JOIN `{db}`.`{p}product` p ON p.id_product = sa.id_product WHERE p.id_product IS NULL',
        ),
        array(
            'label' => 'stock_available missing combination',
            'tables' => array('stock_available', 'product_attribute'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}stock_available` sa LEFT JOIN `{db}`.`{p}product_attribute` pa ON pa.id_product_attribute = sa.id_product_attribute WHERE sa.id_product_attribute != 0 AND pa.id_product_attribute IS NULL',
        ),
        array(
            'label' => 'stock_available missing shop',
            'tables' => array('stock_available', 'shop'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}stock_available` sa LEFT JOIN `{db}`.`{p}shop` s ON s.id_shop = sa.id_shop WHERE s.id_shop IS NULL',
        ),
        array(
            'label' => 'tax_rule missing tax',
            'tables' => array('tax_rule', 'tax'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}tax_rule` tr LEFT JOIN `{db}`.`{p}tax` t ON t.id_tax = tr.id_tax WHERE t.id_tax IS NULL',
        ),
        array(
            'label' => 'tax_rule missing tax_rules_group',
            'tables' => array('tax_rule', 'tax_rules_group'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}tax_rule` tr LEFT JOIN `{db}`.`{p}tax_rules_group` trg ON trg.id_tax_rules_group = tr.id_tax_rules_group WHERE trg.id_tax_rules_group IS NULL',
        ),
        array(
            'label' => 'tax_rules_group_shop missing tax_rules_group or shop',
            'tables' => array('tax_rules_group_shop', 'tax_rules_group', 'shop'),
            'sql' => 'SELECT COUNT(*) FROM `{db}`.`{p}tax_rules_group_shop` trgs LEFT JOIN `{db}`.`{p}tax_rules_group` trg ON trg.id_tax_rules_group = trgs.id_tax_rules_group LEFT JOIN `{db}`.`{p}shop` s ON s.id_shop = trgs.id_shop WHERE trg.id_tax_rules_group IS NULL OR s.id_shop IS NULL',
        ),
    );

    foreach ($checks as $check) {
        if (!tablesExist($pdoTarget, $targetDb, $targetPrefix, $check['tables'])) {
            echo $check['label'] . " skipped (missing table)\n";
            continue;
        }
        $sql = str_replace(
            array('{db}', '{p}'),
            array($targetDb, $targetPrefix),
            $check['sql']
        );
        $count = runScalar($pdoTarget, $sql);
        echo $check['label'] . '=' . $count . "\n";
    }
}

function tablesExist(PDO $pdo, $dbName, $prefix, array $tables)
{
    foreach ($tables as $table) {
        if (!tableExists($pdo, $dbName, $prefix . $table)) {
            return false;
        }
    }
    return true;
}

function runCombinationGroupCheck(PDO $pdo, $dbName, $prefix, $pattern, $label)
{
    $pac = $prefix . 'product_attribute_combination';
    $attr = $prefix . 'attribute';
    $grp = $prefix . 'attribute_group';
    $grpLang = $prefix . 'attribute_group_lang';
    if (!tableExists($pdo, $dbName, $pac) || !tableExists($pdo, $dbName, $attr) || !tableExists($pdo, $dbName, $grp) || !tableExists($pdo, $dbName, $grpLang)) {
        echo "combination group check ({$pattern}) skipped ({$label})\n";
        return;
    }

    $sql =
        'SELECT COUNT(*) FROM `' . $dbName . '`.`' . $pac . '` pac ' .
        'JOIN `' . $dbName . '`.`' . $attr . '` a ON a.id_attribute = pac.id_attribute ' .
        'JOIN `' . $dbName . '`.`' . $grp . '` ag ON ag.id_attribute_group = a.id_attribute_group ' .
        'JOIN `' . $dbName . '`.`' . $grpLang . '` agl ON agl.id_attribute_group = ag.id_attribute_group ' .
        'WHERE agl.name LIKE :pattern';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array('pattern' => $pattern));
    $count = (int) $stmt->fetchColumn();
    echo "combinations for groups like {$pattern} ({$label})={$count}\n";
}

function runIdConsistencyChecks(PDO $pdoTarget, PDO $pdoSource, $targetDb, $sourceDb, $targetPrefix, $sourcePrefix)
{
    $checks = array(
        array('table' => 'feature', 'id' => 'id_feature'),
        array('table' => 'feature_value', 'id' => 'id_feature_value'),
        array('table' => 'attribute_group', 'id' => 'id_attribute_group'),
        array('table' => 'attribute', 'id' => 'id_attribute'),
        array('table' => 'category', 'id' => 'id_category'),
        array('table' => 'product', 'id' => 'id_product'),
        array('table' => 'product_attribute', 'id' => 'id_product_attribute'),
    );

    echo "ID consistency:\n";
    foreach ($checks as $cfg) {
        $sourceTable = $sourcePrefix . $cfg['table'];
        $targetTable = $targetPrefix . $cfg['table'];
        if (!tableExists($pdoSource, $sourceDb, $sourceTable) || !tableExists($pdoTarget, $targetDb, $targetTable)) {
            echo "{$cfg['table']} skipped (missing table)\n";
            continue;
        }
        if (!columnExists($pdoSource, $sourceDb, $sourceTable, $cfg['id']) || !columnExists($pdoTarget, $targetDb, $targetTable, $cfg['id'])) {
            echo "{$cfg['table']} skipped (missing id column)\n";
            continue;
        }
        $sourceStats = getIdStats($pdoSource, $sourceDb, $sourceTable, $cfg['id']);
        $targetStats = getIdStats($pdoTarget, $targetDb, $targetTable, $cfg['id']);
        $status = $sourceStats === $targetStats ? 'OK' : 'MISMATCH';
        echo "{$cfg['table']} {$status} source(min={$sourceStats['min']}, max={$sourceStats['max']}, count={$sourceStats['count']}) target(min={$targetStats['min']}, max={$targetStats['max']}, count={$targetStats['count']})\n";
    }
}

function getIdStats(PDO $pdo, $dbName, $table, $column)
{
    $sql = 'SELECT MIN(`' . $column . '`) AS min_id, MAX(`' . $column . '`) AS max_id, COUNT(*) AS row_count FROM `' . $dbName . '`.`' . $table . '`';
    $stmt = $pdo->query($sql);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return array(
        'min' => (int) $row['min_id'],
        'max' => (int) $row['max_id'],
        'count' => (int) $row['row_count'],
    );
}

function countRows(PDO $pdo, $dbName, $table)
{
    if (!tableExists($pdo, $dbName, $table)) {
        return 0;
    }
    return (int) runScalar($pdo, 'SELECT COUNT(*) FROM `' . $dbName . '`.`' . $table . '`');
}

function runScalar(PDO $pdo, $sql)
{
    $stmt = $pdo->query($sql);
    return $stmt->fetchColumn();
}
