<?php
/**
 * 2007-2018 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Core\Addon\Theme;

use PrestaShop\PrestaShop\Core\Addon\Theme\Exception\ThemeUploadException;
use PrestaShop\PrestaShop\Core\ConfigurationInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class ThemeZipUploader uploads theme to local filesystem.
 */
final class ThemeZipUploader implements ThemeUploaderInterface
{
    /**
     * @var ConfigurationInterface
     */
    private $configuration;

    /**
     * @param ConfigurationInterface $configuration
     */
    public function __construct(ConfigurationInterface $configuration)
    {
        $this->configuration = $configuration;
    }

    /**
     * {@inheritdoc}
     */
    public function upload(UploadedFile $uploadedTheme)
    {
        $this->assertThemeWasUploadedWithoutErrors($uploadedTheme);
        $this->assertUploadedFileIsZip($uploadedTheme);

        $themesDir = $this->configuration->get('_PS_ALL_THEMES_DIR_');
        $destination = $themesDir . $uploadedTheme->getClientOriginalName();

        if (!preg_match('/^[a-zA-Z0-9_.-]+$/', $uploadedTheme->getClientOriginalName())) {
            $destination = $themesDir . sha1_file($uploadedTheme->getPathname()) . '.zip';
        }

        try {
            $uploadedTheme->move($destination);
        } catch (FileException $fileException) {
            throw new ThemeUploadException(
                'Failed to move imported theme file.',
                ThemeUploadException::FAILED_TO_MOVE_FILE,
                $fileException
            );
        }

        return $destination;
    }

    /**
     * @param UploadedFile $uploadedTheme
     *
     * @throws ThemeUploadException
     */
    private function assertThemeWasUploadedWithoutErrors(UploadedFile $uploadedTheme)
    {
        if (UPLOAD_ERR_OK === $uploadedTheme->getError()) {
            return;
        }

        if (in_array($uploadedTheme->getError(), [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE])) {
            throw new ThemeUploadException(
                'Allowed file size exceeded for uploaded theme.',
                ThemeUploadException::FILE_SIZE_EXCEEDED_ERROR
            );
        }

        throw new ThemeUploadException(
            sprintf('Unknown error "%s" occurred while uploading theme.', $uploadedTheme->getError()),
            ThemeUploadException::UNKNOWN_ERROR
        );
    }

    /**
     * @param UploadedFile $uploadedTheme
     *
     * @throws ThemeUploadException
     */
    private function assertUploadedFileIsZip(UploadedFile $uploadedTheme)
    {
        preg_match('#application/zip#', $uploadedTheme->getMimeType(), $matches);

        if (empty($matches)) {
            throw new ThemeUploadException(
                'Invalid mime type of theme zip. Allowed mime type is application/zip.',
                ThemeUploadException::INVALID_MIME_TYPE
            );
        }
    }
}
