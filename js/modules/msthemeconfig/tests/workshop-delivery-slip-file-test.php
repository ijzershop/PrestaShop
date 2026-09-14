<?php

declare(strict_types=1);

/** Offline filesystem tests: no shop bootstrap, order changes or Trello requests. */
if (PHP_SAPI !== 'cli') {
    exit(1);
}

use MsThemeConfig\Service\WorkshopDeliverySlipFile;

require_once dirname(__DIR__) . '/src/Service/WorkshopDeliverySlipFile.php';

$checks = 0;
$assert = static function (bool $condition, string $message) use (&$checks): void {
    ++$checks;
    if (!$condition) {
        throw new RuntimeException($message);
    }
};
$expectFailure = static function (callable $operation, string $message, string $privatePath) use ($assert): void {
    try {
        $operation();
    } catch (RuntimeException $exception) {
        $assert(str_contains($exception->getMessage(), $message), 'Failure explains the problem in Dutch.');
        $assert(!str_contains($exception->getMessage(), $privatePath), 'Failure does not expose a filesystem path.');

        return;
    }
    throw new RuntimeException('Expected operation to fail.');
};

$temporaryRoot = realpath(sys_get_temp_dir());
if ($temporaryRoot === false) {
    throw new RuntimeException('Test temporary directory is unavailable.');
}
$testRoot = $temporaryRoot . DIRECTORY_SEPARATOR . 'workshop-slip-test-' . bin2hex(random_bytes(8));
if (!mkdir($testRoot, 0700)) {
    throw new RuntimeException('Could not create isolated test directory.');
}
$testRoot = realpath($testRoot);
$originalDirectory = getcwd();

try {
    // An unrelated module directory reproduces the junction/deployment layout.
    $moduleDirectory = $testRoot . '/external/module/controllers/front';
    mkdir($moduleDirectory, 0700, true);
    chdir($moduleDirectory);
    $uploadDirectory = $testRoot . '/shop/upload';
    $pdf = "%PDF-1.7\nfixture with binary bytes\x00\xFF\n%%EOF\n";
    $savedPath = WorkshopDeliverySlipFile::save($uploadDirectory . '/', 421, $pdf);
    $expectedPath = realpath($uploadDirectory . '/werkplaats') . DIRECTORY_SEPARATOR . 'pakbon_421.pdf';
    $assert($savedPath === $expectedPath, 'Save returns the absolute configured upload path.');
    $assert(is_dir($uploadDirectory . '/werkplaats'), 'Missing upload/werkplaats directory is created.');
    $assert(file_get_contents($savedPath) === $pdf, 'Every generated PDF byte is preserved.');
    $assert(!file_exists($testRoot . '/external/upload'), 'Module location does not determine the upload path.');
    if (DIRECTORY_SEPARATOR !== '\\') {
        $assert((fileperms($savedPath) & 0777) === (0666 & ~umask()), 'A new slip uses normal upload permissions rather than private temporary-file permissions.');
        chmod($savedPath, 0640);
        clearstatcache(true, $savedPath);
    }

    $replacement = "%PDF-1.4\nupdated slip\n%%EOF\n";
    $assert(WorkshopDeliverySlipFile::save($uploadDirectory, 421, $replacement) === $savedPath, 'An existing slip keeps its filename.');
    $assert(file_get_contents($savedPath) === $replacement, 'An existing slip is replaced by the complete new PDF.');
    $assert(glob($uploadDirectory . '/werkplaats/.pakbon-*') === [], 'Successful writes leave no temporary files.');
    if (DIRECTORY_SEPARATOR !== '\\') {
        clearstatcache(true, $savedPath);
        $assert((fileperms($savedPath) & 0777) === 0640, 'Replacing an existing slip preserves its file permissions.');
    }

    $blockedUpload = $testRoot . '/blocked-upload';
    mkdir($blockedUpload);
    file_put_contents($blockedUpload . '/werkplaats', 'directory blocked by a file');
    $expectFailure(static fn () => WorkshopDeliverySlipFile::save($blockedUpload, 421, $pdf), 'map voor werkplaatspakbonnen', $testRoot);
    $assert(file_get_contents($blockedUpload . '/werkplaats') === 'directory blocked by a file', 'A failed directory creation preserves the blocking file.');

    mkdir($uploadDirectory . '/werkplaats/pakbon_422.pdf');
    $expectFailure(static fn () => WorkshopDeliverySlipFile::save($uploadDirectory, 422, $pdf), 'kon niet worden opgeslagen', $testRoot);
    $assert(is_dir($uploadDirectory . '/werkplaats/pakbon_422.pdf'), 'A failed replacement preserves the existing directory.');
    $assert(glob($uploadDirectory . '/werkplaats/.pakbon-*') === [], 'A failed final write removes the temporary file.');

    foreach ([null, false, '', 'Not a PDF', '<html>PDF rendering failed</html>', '%PDF-broken'] as $invalidPdf) {
        $expectFailure(static fn () => WorkshopDeliverySlipFile::save($uploadDirectory, 423, $invalidPdf), 'kon niet worden aangemaakt', $testRoot);
    }
    $assert(!file_exists($uploadDirectory . '/werkplaats/pakbon_423.pdf'), 'Invalid PDF output creates no destination file.');
    foreach ([0, -1] as $invalidId) {
        $expectFailure(static fn () => WorkshopDeliverySlipFile::save($uploadDirectory, $invalidId, $pdf), 'bestelling is niet geldig', $testRoot);
    }
    $expectFailure(static fn () => WorkshopDeliverySlipFile::save('', 421, $pdf), 'uploadmap is niet ingesteld', $testRoot);
    $assert(file_get_contents($savedPath) === $replacement, 'Failed saves do not damage an existing valid slip.');
} finally {
    if ($originalDirectory !== false) {
        chdir($originalDirectory);
    }
    // Only remove the fresh, verified fixture tree; never follow directory links.
    $verifiedRoot = realpath($testRoot);
    if ($verifiedRoot === false || $verifiedRoot !== $testRoot
        || dirname($verifiedRoot) !== $temporaryRoot
        || !str_starts_with(basename($verifiedRoot), 'workshop-slip-test-')) {
        throw new RuntimeException('Refusing cleanup outside the isolated test directory.');
    }
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($verifiedRoot, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($iterator as $entry) {
        $entryPath = $entry->getPathname();
        if (!str_starts_with($entryPath, $verifiedRoot . DIRECTORY_SEPARATOR)) {
            throw new RuntimeException('Refusing cleanup outside the isolated test directory.');
        }
        if ($entry->isDir() && !$entry->isLink()) {
            rmdir($entryPath);
        } else {
            unlink($entryPath);
        }
    }
    rmdir($verifiedRoot);
}

echo "Workshop delivery-slip file tests: {$checks} checks passed.\n";
