<?php

declare(strict_types=1);

namespace MsThemeConfig\Service;

use RuntimeException;

final class WorkshopDeliverySlipFile
{
    /** Save the generated PDF under the shop's configured upload directory. */
    public static function save(string $uploadDirectory, int $orderId, $pdfContent): string
    {
        if ($orderId <= 0) {
            throw new RuntimeException('De bestelling is niet geldig. Open de bestelling opnieuw.');
        }
        if (!is_string($pdfContent) || !preg_match('/\A%PDF-\d\.\d/', $pdfContent)) {
            throw new RuntimeException('De pakbon kon niet worden aangemaakt. Probeer het opnieuw.');
        }
        if (trim($uploadDirectory) === '') {
            throw new RuntimeException('De uploadmap is niet ingesteld. Neem contact op met de beheerder.');
        }

        $directory = rtrim($uploadDirectory, '/\\') . DIRECTORY_SEPARATOR . 'werkplaats';
        if (!is_dir($directory) && !@mkdir($directory, 0755, true) && !is_dir($directory)) {
            throw new RuntimeException('De map voor werkplaatspakbonnen kon niet worden aangemaakt. Neem contact op met de beheerder.');
        }
        $directory = realpath($directory);
        if ($directory === false) {
            throw new RuntimeException('De map voor werkplaatspakbonnen is niet beschikbaar. Neem contact op met de beheerder.');
        }

        $filePath = $directory . DIRECTORY_SEPARATOR . 'pakbon_' . $orderId . '.pdf';
        $temporaryPath = @tempnam($directory, '.pakbon-');
        if ($temporaryPath === false) {
            throw new RuntimeException('De pakbon kon niet worden opgeslagen. Neem contact op met de beheerder.');
        }

        try {
            // Replace an existing slip only once the new PDF has been written completely.
            if (realpath(dirname($temporaryPath)) !== $directory
                || @file_put_contents($temporaryPath, $pdfContent, LOCK_EX) !== strlen($pdfContent)) {
                throw new RuntimeException('De pakbon kon niet worden opgeslagen. Neem contact op met de beheerder.');
            }

            // tempnam creates a private file; keep normal upload permissions for HTTP access.
            $permissions = is_file($filePath) ? @fileperms($filePath) : (0666 & ~umask());
            if ($permissions === false
                || !@chmod($temporaryPath, $permissions & 0777)
                || !@rename($temporaryPath, $filePath)) {
                throw new RuntimeException('De pakbon kon niet worden opgeslagen. Neem contact op met de beheerder.');
            }
        } finally {
            if (is_file($temporaryPath)) {
                @unlink($temporaryPath);
            }
        }

        return $filePath;
    }
}
