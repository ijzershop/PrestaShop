<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

namespace PrestaShop\Module\PsAccounts\Factory;

use PrestaShop\Module\PsAccounts\Vendor\Monolog\Handler\RotatingFileHandler;
use PrestaShop\Module\PsAccounts\Vendor\Monolog\Logger;

class PsAccountsLogger
{
    const MAX_FILES = 15;

    /**
     * Create logger.
     *
     * @return Logger
     */
    public static function create()
    {
        $path = _PS_ROOT_DIR_ . '/var/logs/ps_accounts';

        if (version_compare(_PS_VERSION_, '1.7', '<')) {
            $path = _PS_ROOT_DIR_ . '/log/ps_accounts';
        } elseif (version_compare(_PS_VERSION_, '1.7.4', '<')) {
            $path = _PS_ROOT_DIR_ . '/app/logs/ps_accounts';
        }

        $rotatingFileHandler = new RotatingFileHandler(
            $path,
            static::MAX_FILES
        );
        $logger = new Logger('ps_accounts');
        $logger->pushHandler($rotatingFileHandler);

        return $logger;
    }
}
