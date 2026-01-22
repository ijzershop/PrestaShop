<?php
require_once('config/config.inc.php');
require_once('init.php');

$db = Db::getInstance();
$id_root = 2;

echo "Calculating new nleft/nright for category tree starting at root ID $id_root...\n";

function rebuildNestedSet($id_parent, $left) {
    $db = Db::getInstance();
    $right = $left + 1;

    $children = $db->executeS("SELECT id_category FROM " . _DB_PREFIX_ . "category WHERE id_parent = " . (int)$id_parent . " ORDER BY position ASC");

    foreach ($children as $child) {
        $right = rebuildNestedSet($child['id_category'], $right);
    }

    $db->execute("UPDATE " . _DB_PREFIX_ . "category SET nleft = " . (int)$left . ", nright = " . (int)$right . " WHERE id_category = " . (int)$id_parent);

    return $right + 1;
}

// We start from the absolute root (ID 1 usually) or just fix from ID 2 if ID 1 is okay.
// Let's check ID 1 first.
$root_root = $db->getRow("SELECT * FROM " . _DB_PREFIX_ . "category WHERE id_category = 1");
echo "Root (ID 1): nleft={$root_root['nleft']}, nright={$root_root['nright']}\n";

// Rebuild from ID 1
rebuildNestedSet(1, 1);

echo "Done rebuild.\n";

$home = $db->getRow("SELECT * FROM " . _DB_PREFIX_ . "category WHERE id_category = 2");
echo "Home (ID 2) now: nleft={$home['nleft']}, nright={$home['nright']}\n";
