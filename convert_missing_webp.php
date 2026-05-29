<?php
/**
 * Converts all images in /img/c that don't have a .webp variant.
 * Run from CLI: php convert_missing_webp.php
 */

$dir = __DIR__ . '/img/p';
$quality = 82;
$converted = 0;
$skipped = 0;
$errors = 0;

// Recursively find all jpg/jpeg/png files
function findImages(string $dir): array {
    $results = [];
    $iter = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iter as $file) {
        if ($file->isFile() && preg_match('/\.(jpg|jpeg|png)$/i', $file->getFilename())) {
            $results[] = $file->getPathname();
        }
    }
    return $results;
}

$files = findImages($dir);

foreach ($files as $src) {
    $base = preg_replace('/\.(jpg|jpeg|png)$/i', '', $src);
    $dest = $base . '.webp';

    if (file_exists($dest)) {
        $skipped++;
        continue;
    }

    // Detect actual format by magic bytes, not file extension
    $magic = file_get_contents($src, false, null, 0, 4);
    if ($magic === "\x89PNG") {
        $img = @imagecreatefrompng($src);
    } elseif (substr($magic, 0, 2) === "\xFF\xD8") {
        $img = @imagecreatefromjpeg($src);
    } else {
        $img = @imagecreatefromstring(file_get_contents($src));
    }

    if (!$img) {
        echo "ERROR reading: " . basename($src) . "\n";
        $errors++;
        continue;
    }

    if (imagewebp($img, $dest, $quality)) {
        echo "OK: " . basename($dest) . "\n";
        $converted++;
    } else {
        echo "ERROR writing: " . basename($dest) . "\n";
        $errors++;
    }

    imagedestroy($img);
}

echo "\nDone. Converted: $converted | Skipped (already exist): $skipped | Errors: $errors\n";
