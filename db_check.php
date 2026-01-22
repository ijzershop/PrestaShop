<?php
require_once('config/config.inc.php');
require_once('init.php');

$db = Db::getInstance();

echo "--- Shop Info ---\n";
$shop_id = Context::getContext()->shop->id;
$lang_id = Context::getContext()->language->id;
echo "Shop ID: $shop_id, Lang ID: $lang_id\n";

echo "\n--- Children of Home (ID 2) in 'category' table ---\n";
$children = $db->executeS("SELECT id_category, id_parent, level_depth, nleft, nright, active FROM " . _DB_PREFIX_ . "category WHERE id_parent = 2");
print_r($children);

echo "\n--- Shop association for those children ---\n";
if ($children) {
    $ids = array_column($children, 'id_category');
    $associations = $db->executeS("SELECT * FROM " . _DB_PREFIX_ . "category_shop WHERE id_category IN (" . implode(',', $ids) . ")");
    print_r($associations);
}

echo "\n--- Home Category Details ---\n";
$home = $db->executeS("SELECT * FROM " . _DB_PREFIX_ . "category WHERE id_category = 2");
print_r($home);

echo "\n--- Children nleft/nright ---\n";
$child_details = $db->executeS("SELECT id_category, nleft, nright FROM " . _DB_PREFIX_ . "category WHERE id_parent = 2");
foreach ($child_details as $cd) {
    echo "ID: {$cd['id_category']}, nleft: {$cd['nleft']}, nright: {$cd['nright']}\n";
}

echo "\n--- Checking Category::getNestedCategories logic --- \n";
$groups = Customer::getGroupsStatic((int) Context::getContext()->customer->id);
echo "Groups: " . implode(',', $groups) . "\n";
