<?php
// Save as check_extensions.php in your web root
$required = [
    'curl', 'gd', 'intl', 'mbstring', 'mysqli',
    'openssl', 'zip', 'fileinfo', 'dom', 'simplexml',
    'json', 'iconv'
];

echo "<h2>Web PHP Extensions Status:</h2>";
foreach ($required as $ext) {
    $status = extension_loaded($ext) ? '✅ LOADED' : '❌ MISSING';
    echo "<strong>{$ext}:</strong> {$status}<br>";
}

echo "<br><strong>PHP Version:</strong> " . phpversion();
echo "<br><strong>Config File:</strong> " . php_ini_loaded_file();
?>
