<?php
/**
 * 2007-2026 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
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
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\helpers;
if (!defined('_PS_VERSION_')) {
    exit;
}

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Utils;

class RotatingFileHandler extends StreamHandler
{
    protected $filename;

    /**
     * @param string $filename
     * @param int $level The minimum logging level at which this handler will be triggered
     * @param bool $bubble Whether the messages that are handled can bubble up the stack or not
     * @param int|null $file_permission Optional file permissions (default (0644) are only for owner read/write)
     * @param bool $use_locking Try to lock log file before doing any writes
     */
    public function __construct($filename, $level = Logger::DEBUG, $bubble = true, $file_permission = null, $use_locking = false)
    {
        $this->filename = Utils::canonicalizePath($filename);
        parent::__construct($filename, $level, $bubble, $file_permission, $use_locking);
    }

    public function close(): void
    {
        parent::close();
        $this->rotate();
    }

    public function reset()
    {
        parent::reset();
        $this->rotate();
    }

    /**
     * Rotates the files.
     */
    protected function rotate()
    {
        $one_month_ago = strtotime('-1 month');
        $max_age = time() - $one_month_ago;

        $c_file = $this->filename . '.c_time';
        if (!file_exists($c_file)) {
            file_put_contents($c_file, 'ok');
        }
        $c_time = filemtime($c_file);

        $file_age = time() - $c_time;
        $filesize = file_exists($this->filename) ? filesize($this->filename) : 0;

        if ($filesize && ($file_age > $max_age || $filesize === 20 * 1024 * 1024)) {
            set_error_handler(function ($errno, $errstr, $errfile, $errline) {
            });
            unlink($this->filename);
            unlink($c_file);
            restore_error_handler();
        }
    }
}
