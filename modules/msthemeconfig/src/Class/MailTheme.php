<?php
declare(strict_types=1);

namespace MsThemeConfig\Class;

use Symfony\Component\Filesystem\Exception\ExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;

/**
 *
 */
class MailTheme
{
    /**
     * @return bool
     */
    public function makeThemeSymlink(): bool
    {
        $module_mails_path = $_SERVER['DOCUMENT_ROOT'] . "modules/msthemeconfig/mails/themes/modernesmid";
        $prestashop_mails_path = $_SERVER['DOCUMENT_ROOT'] . 'mails/themes/modernesmid';
        try {
            $fileSystem = new Filesystem();
            $fileSystem->symlink($module_mails_path, $prestashop_mails_path, true);
        } catch (ExceptionInterface $e){
            return false;
        }
        return true;
    }

    /**
     * @return bool
     */
    public function removeThemeSymlink(): bool
    {
        $module_mails_path = $_SERVER['DOCUMENT_ROOT'] . "modules/msthemeconfig/mails/themes/modernesmid";
        $prestashop_mails_path = $_SERVER['DOCUMENT_ROOT'] . 'mails/themes/modernesmid';
        try {
            $fileSystem = new Filesystem();
            $fileSystem->remove($prestashop_mails_path);

        } catch (ExceptionInterface $e){
            return false;
        }
        return true;
    }

}
