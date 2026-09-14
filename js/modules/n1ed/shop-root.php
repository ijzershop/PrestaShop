<?php

// PHP resolves module symlinks before evaluating __DIR__. Locate the shop from
// either modules/n1ed or external/modernesmid_webshop/module/n1ed.
return (static function () {
    $isShop = static function ($directory) {
        return is_file($directory . '/config/config.inc.php')
            && is_file($directory . '/init.php');
    };

    if (defined('_PS_ROOT_DIR_') && $isShop(_PS_ROOT_DIR_)) {
        return rtrim(_PS_ROOT_DIR_, '/\\');
    }

    $directory = __DIR__;
    while (true) {
        if ($isShop($directory)) {
            return $directory;
        }
        $parent = dirname($directory);
        if ($parent === $directory) {
            throw new RuntimeException('Cannot locate the PrestaShop root for N1ED.');
        }
        $directory = $parent;
    }
})();
