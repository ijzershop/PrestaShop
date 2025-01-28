<?php
/**
 * 2007-2024 TuniSoft
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
 * @copyright 2007-2024 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
use PrestaShop\PrestaShop\Adapter\Configuration;
use PrestaShopBundle\DependencyInjection\CacheAdapterFactory;
use Symfony\Component\Cache\Adapter\AdapterInterface;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;

class LegacyCompilerPass implements CompilerPassInterface
{
    /**
     * Add legacy services that need to be built using Context::getContext().
     *
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        $this->buildDefinitions([
            'configuration' => Configuration::class,
            'context' => [Context::class, 'getContext'],
            'db' => [Db::class, 'getInstance'],
        ], $container);

        $cacheDriver = $container->getParameter('cache.driver');
        $this->buildCacheDefinition($cacheDriver, $container);

        $this->buildSyntheticDefinitions(['shop' => Shop::class, 'employee' => Employee::class], $container);
    }

    private function buildDefinitions(array $keys, ContainerBuilder $container): void
    {
        foreach ($keys as $key => $class) {
            if (is_array($class)) {
                $definition = new Definition($class[0]);
                $definition->setFactory($class);
            } else {
                $definition = new Definition($class);
            }
            $definition->setPublic(true);
            $container->setDefinition($key, $definition);
        }
    }

    private function buildCacheDefinition(string $cacheDriver, ContainerBuilder $container): void
    {
        $container->setDefinition(CacheAdapterFactory::class, new Definition(CacheAdapterFactory::class));
        $definition = new Definition(AdapterInterface::class);
        $definition
            ->setPublic(true)
            ->setFactory([new Reference(CacheAdapterFactory::class), 'getCacheAdapter'])
            ->setArguments([$cacheDriver])
        ;

        $container->setDefinition($cacheDriver, $definition);
    }

    private function buildSyntheticDefinitions(array $keys, ContainerBuilder $container): void
    {
        foreach ($keys as $key => $class) {
            $definition = new Definition($class);
            $definition
                ->setSynthetic(true)
                ->setPublic(true)
            ;
            $container->setDefinition($key, $definition);
        }
    }
}
