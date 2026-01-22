<?php
require_once('config/config.inc.php');
require_once('init.php');

$module = Module::getInstanceByName('ps_categorytree');
if ($module) {
    $variables = $module->getWidgetVariables(null, []);
    echo "BLOCK_CATEG_ROOT_CATEGORY: " . Configuration::get('BLOCK_CATEG_ROOT_CATEGORY') . "\n";
    echo "BLOCK_CATEG_MAX_DEPTH: " . Configuration::get('BLOCK_CATEG_MAX_DEPTH') . "\n";
    echo "Categories data structure:\n";
    print_r($variables['categories']);
} else {
    echo "Module ps_categorytree not found.\n";
}
