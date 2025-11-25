<?php
/**
 * Simple diagnostics for common causes of HTTP 403 on Apache when running PrestaShop on Windows/WAMP.
 * Copy the URL to your browser: /tools/modernesmid-development-tools/http_access_check.php
 */
header('Content-Type: text/plain; charset=utf-8');

echo "PrestaShop HTTP access diagnostics\n";
echo "===============================\n\n";

// 1) Basic PHP execution
$phpOk = true;
$errors = [];

echo "PHP version: ".PHP_VERSION."\n";
echo "SAPI: ".php_sapi_name()."\n\n";

// 2) Detect Apache modules and .htaccess effectiveness
$hasApacheGetModules = function_exists('apache_get_modules');
$mods = $hasApacheGetModules ? apache_get_modules() : [];

if ($hasApacheGetModules) {
    echo "apache_get_modules() is available.\n";
    echo "- mod_rewrite: ".(in_array('mod_rewrite', $mods) ? 'ENABLED' : 'DISABLED')."\n";
    echo "- mod_env: ".(in_array('mod_env', $mods) ? 'ENABLED' : 'DISABLED')."\n";
    echo "- mod_authz_core: ".(in_array('mod_authz_core', $mods) ? 'ENABLED' : 'DISABLED')."\n";
    echo "- mod_access_compat: ".(in_array('mod_access_compat', $mods) ? 'ENABLED' : 'DISABLED')."\n\n";
} else {
    echo "apache_get_modules() not available (likely behind proxy/FPM).\n";
    echo "Cannot directly list Apache modules from PHP.\n\n";
}

// 3) Check whether .htaccess SetEnv was applied (root .htaccess sets HTTP_MOD_REWRITE On)
$envRewrite = isset($_SERVER['HTTP_MOD_REWRITE']) ? $_SERVER['HTTP_MOD_REWRITE'] : null;
echo ".htaccess SetEnv check (HTTP_MOD_REWRITE): ".($envRewrite ? $envRewrite : 'NOT SET')."\n";
if (!$envRewrite) {
    $errors[] = "It looks like .htaccess is not being applied. Ensure AllowOverride All is set for your DocumentRoot in Apache httpd.conf and that you are loading from the correct VirtualHost.";
}

echo "\nFile/dir permission quick checks (Windows):\n";
$paths = [
    'root' => __DIR__.'/../../..',
    'var' => __DIR__.'/../../../var',
    'img' => __DIR__.'/../../../img',
    'modules' => __DIR__.'/../../../modules',
    'themes' => __DIR__.'/../../../themes',
];
foreach ($paths as $label => $path) {
    $real = realpath($path);
    $ok = $real && is_dir($real) && is_readable($real);
    echo "- $label: ".($real ?: $path)." => ".($ok ? 'readable' : 'NOT READABLE')."\n";
}

echo "\nMaintenance mode/IP restriction:\n";
$hint = "If your back office is in maintenance mode with IP restriction, front office can return 403. You can disable maintenance by updating the database (ps_configuration: PS_SHOP_ENABLE=1; or via BO if accessible).";
echo $hint."\n";

if ($errors) {
    echo "\nPotential issues detected:\n";
    foreach ($errors as $e) {
        echo "- $e\n";
    }
}

echo "\nNext steps:\n";
echo "1) Ensure Apache modules are enabled: rewrite_module, headers_module, deflate_module, env_module.\n";
echo "2) In your Apache VirtualHost, set: AllowOverride All for the DocumentRoot.\n";
echo "3) Verify NTFS permissions allow Apache (httpd service account) read access to the project.\n";
echo "4) Try accessing /index.php directly to bypass any DirectoryIndex issues.\n";

