<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Module;

use PrestaShop\Module\Ps_metrics\Adapter\LinkAdapter;

class GAInstaller
{
    /**
     * @var string
     */
    private $moduleName = 'ps_googleanalytics';

    /**
     * @var LinkAdapter
     */
    private $linkAdapter;

    /**
     * @var \Symfony\Component\DependencyInjection\ContainerInterface
     */
    protected $container;

    public function __construct(LinkAdapter $linkAdapter)
    {
        $this->linkAdapter = $linkAdapter;
    }

    /**
     * Return shop is on 1.7
     *
     * @return bool
     */
    private function isShop173()
    {
        return version_compare(_PS_VERSION_, '1.7.3.0', '>=');
    }

    /**
     * Override of native function to always retrieve Symfony container instead of legacy admin container on legacy context.
     *
     * @param string $serviceName
     *
     * @return mixed
     */
    private function get($serviceName)
    {
        if (null === $this->container) {
            $this->container = \PrestaShop\PrestaShop\Adapter\SymfonyContainer::getInstance();
        }

        return $this->container->get($serviceName);
    }

    /**
     * Check if google analitycs module is installed or not
     *
     * @return bool
     */
    public function isInstalled()
    {
        return \Module::isInstalled($this->moduleName);
    }

    /**
     * Check if google analitycs module is enabled or not
     *
     * @return bool
     */
    public function isEnabled()
    {
        return \Module::isEnabled($this->moduleName);
    }

    /**
     * returns the installation link of the ps_googleanalytics module if it is not installed. If installed, returns an empty string
     *
     * @return string
     */
    public function getInstallLink()
    {
        if (true === \Module::isInstalled($this->moduleName)) {
            return '';
        }

        if ($this->isShop173()) {
            $router = $this->get('router');

            return substr(\Tools::getShopDomainSsl(true) . __PS_BASE_URI__, 0, -1) . $router->generate('admin_module_manage_action', [
                'action' => 'install',
                'module_name' => $this->moduleName,
            ]);
        }

        return  $this->linkAdapter->getAdminLink('AdminModules', true, [], [
            'module_name' => $this->moduleName,
            'install' => $this->moduleName,
        ]);
    }

    /**
     * returns the enable link of the ps_googleanalytics module if it is not enabled. If enabled, returns an empty string
     *
     * @return string
     */
    public function getEnableLink()
    {
        if (true === \Module::isEnabled($this->moduleName)) {
            return '';
        }

        if ($this->isShop173()) {
            $router = $this->get('router');

            return substr(\Tools::getShopDomainSsl(true) . __PS_BASE_URI__, 0, -1) . $router->generate('admin_module_manage_action', [
                'action' => 'enable',
                'module_name' => $this->moduleName,
            ]);
        }

        return  $this->linkAdapter->getAdminLink('AdminModules', true, [], [
            'module_name' => $this->moduleName,
            'enable' => '1',
        ]);
    }

    /**
     * returns the configuration link of the ps_googleanalytics module if it is not configured. If configured, returns an empty string
     *
     * @return string
     */
    public function getConfigLink()
    {
        return  $this->linkAdapter->getAdminLink('AdminModules', true, [], [
            'configure' => $this->moduleName,
        ]);
    }
}
