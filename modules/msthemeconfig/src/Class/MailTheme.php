<?php

namespace MsThemeConfig\Class;

use Symfony\Component\Filesystem\Exception\ExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;

class MailTheme
{
    public function makeThemeSymlink(){
        $module_mails_path = $_SERVER['DOCUMENT_ROOT'] . "/modules/msthemeconfig/mails/themes/modernesmid";
        $prestashop_mails_path = $_SERVER['DOCUMENT_ROOT'] . 'mails/themes/modernesmid';

        try {
            $fileSystem = new Filesystem();
           $result =  $fileSystem->symlink($module_mails_path, $prestashop_mails_path);
        } catch (ExceptionInterface $e){
            return false;
        }
        return true;
    }

    public function removeThemeSymlink(){
        $module_mails_path = $_SERVER['DOCUMENT_ROOT'] . "/modules/msthemeconfig/mails/themes/modernesmid";
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
