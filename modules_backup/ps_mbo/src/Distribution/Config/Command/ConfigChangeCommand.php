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
declare(strict_types=1);

namespace PrestaShop\Module\Mbo\Distribution\Config\Command;

class ConfigChangeCommand
{
    /**
     * @var array
     */
    private $config;

    /**
     * This is the current PS version in the instance.
     *
     * @var string
     */
    private $psVersion;

    /**
     * This is the current MBO module version in the instance.
     *
     * @var string
     */
    private $mboVersion;

    /**
     * @param array $config
     * @param string $psVersion
     * @param string $mboVersion
     */
    public function __construct(array $config, string $psVersion, string $mboVersion)
    {
        $this->config = $config;
        $this->psVersion = $psVersion;
        $this->mboVersion = $mboVersion;
    }

    /**
     * @return array
     */
    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * @return string
     */
    public function getPsVersion(): string
    {
        return $this->psVersion;
    }

    /**
     * @return string
     */
    public function getMboVersion(): string
    {
        return $this->mboVersion;
    }
}
