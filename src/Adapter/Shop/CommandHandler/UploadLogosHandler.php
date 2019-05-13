<?php
/**
 * 2007-2019 PrestaShop and Contributors
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Adapter\Shop\CommandHandler;

use ImageManager;
use PrestaShop\PrestaShop\Core\ConfigurationInterface;
use PrestaShop\PrestaShop\Core\Domain\Shop\Command\UploadLogosCommand;
use PrestaShop\PrestaShop\Core\Domain\Shop\CommandHandler\UploadLogosHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Shop\Exception\ShopConstraintException;
use PrestaShop\PrestaShop\Core\Domain\Shop\Exception\ShopException;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use PrestaShop\PrestaShop\Core\Shop\LogoUploader;
use PrestaShopException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Tools;

/**
 * Class UploadLogosHandler
 */
final class UploadLogosHandler implements UploadLogosHandlerInterface
{
    /**
     * @var ConfigurationInterface
     */
    private $configuration;

    /**
     * @var LogoUploader
     */
    private $logoUploader;

    /**
     * @var HookDispatcherInterface
     */
    private $hookDispatcher;

    /**
     * @param ConfigurationInterface $configuration
     * @param LogoUploader $logoUploader
     * @param HookDispatcherInterface $hookDispatcher
     */
    public function __construct(
        ConfigurationInterface $configuration,
        LogoUploader $logoUploader,
        HookDispatcherInterface $hookDispatcher
    ) {
        $this->configuration = $configuration;
        $this->logoUploader = $logoUploader;
        $this->hookDispatcher = $hookDispatcher;
    }

    /**
     * {@inheritdoc}
     *
     * @throws ShopConstraintException
     * @throws ShopException
     */
    public function handle(UploadLogosCommand $command)
    {
        $this->configuration->set('PS_IMG_UPDATE_TIME', time());

        try {
            if (null !== $command->getUploadedHeaderLogo()) {
                $this->uploadHeaderLogo($command->getUploadedHeaderLogo());
            }

            if (null !== $command->getUploadedMailLogo()) {
                $this->uploadMailLogo($command->getUploadedMailLogo());
            }

            if (null !== $command->getUploadedInvoiceLogo()) {
                $this->uploadInvoiceLogo($command->getUploadedInvoiceLogo());
            }

            if (null !== $command->getUploadedFavicon()) {
                $this->uploadFavicon($command->getUploadedFavicon());
            }
        } catch (PrestaShopException $exception) {
            throw new ShopException(
                'An unexpected error occurred when uploading image',
                0,
                $exception
            );
        }

        $this->hookDispatcher->dispatchWithParameters('actionAdminThemesControllerUpdate_optionsAfter');
    }

    /**
     * @param UploadedFile $uploadedFile
     *
     * @throws ShopConstraintException
     */
    private function uploadHeaderLogo(UploadedFile $uploadedFile)
    {
        $file = $this->setUploadedFileToBeCompatibleWithLegacyUploader('PS_LOGO', $uploadedFile);
        $this->assertIsValidImage($file);

        $this->logoUploader->updateHeader();
    }

    /**
     * @param UploadedFile $uploadedFile
     *
     * @throws ShopConstraintException
     */
    private function uploadMailLogo(UploadedFile $uploadedFile)
    {
        $file = $this->setUploadedFileToBeCompatibleWithLegacyUploader('PS_LOGO_MAIL', $uploadedFile);
        $this->assertIsValidImage($file);

        $this->logoUploader->updateMail();
    }

    /**
     * @param UploadedFile $uploadedHeaderLogo
     *
     * @throws ShopConstraintException
     */
    private function uploadInvoiceLogo(UploadedFile $uploadedHeaderLogo)
    {
        $file = $this->setUploadedFileToBeCompatibleWithLegacyUploader('PS_LOGO_INVOICE', $uploadedHeaderLogo);
        $this->assertIsValidImage($file);

        $this->logoUploader->updateInvoice();
    }

    /**
     * @param UploadedFile $uploadedHeaderLogo
     *
     * @throws ShopConstraintException
     */
    private function uploadFavicon(UploadedFile $uploadedHeaderLogo)
    {
        $file = $this->setUploadedFileToBeCompatibleWithLegacyUploader('PS_FAVICON', $uploadedHeaderLogo);
        $this->assertIsValidIcon($file);

        $this->logoUploader->updateFavicon();
    }

    /**
     * @param string $legacyFileName
     * @param UploadedFile $uploadedFile
     *
     * @return array
     */
    private function setUploadedFileToBeCompatibleWithLegacyUploader($legacyFileName, UploadedFile $uploadedFile)
    {
        $_FILES[$legacyFileName] = [
            'name' => $uploadedFile->getClientOriginalName(),
            'type' => $uploadedFile->getMimeType(),
            'tmp_name' => $uploadedFile->getPathname(),
            'error' => $uploadedFile->getError(),
            'size' => $uploadedFile->getSize(),
        ];

        return $_FILES;
    }

    /**
     * This is used for validating the image and throwing the translatable exception message.
     *
     * @param array $file
     *
     * @throws ShopConstraintException
     */
    private function assertIsValidImage(array $file)
    {
        $maxUploadSize = Tools::getMaxUploadSize();
        $translatableError = ImageManager::validateUpload($file, $maxUploadSize);

        if ($translatableError) {
            throw new ShopConstraintException(
                $translatableError,
                ShopConstraintException::INVALID_IMAGE
            );
        }
    }

    /**
     * @param array $file
     *
     * @throws ShopConstraintException
     */
    private function assertIsValidIcon(array $file)
    {
        $translatableError  = ImageManager::validateIconUpload($file);

        if ($translatableError) {
            throw new ShopConstraintException(
                $translatableError,
                ShopConstraintException::INVALID_ICON
            );
        }
    }
}
