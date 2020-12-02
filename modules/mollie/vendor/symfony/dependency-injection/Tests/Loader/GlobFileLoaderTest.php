<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\DependencyInjection\Tests\Loader;

use MolliePrefix\PHPUnit\Framework\TestCase;
use MolliePrefix\Symfony\Component\Config\FileLocator;
use MolliePrefix\Symfony\Component\Config\Resource\GlobResource;
use MolliePrefix\Symfony\Component\DependencyInjection\ContainerBuilder;
use MolliePrefix\Symfony\Component\DependencyInjection\Loader\GlobFileLoader;
class GlobFileLoaderTest extends \MolliePrefix\PHPUnit\Framework\TestCase
{
    public function testSupports()
    {
        $loader = new \MolliePrefix\Symfony\Component\DependencyInjection\Loader\GlobFileLoader(new \MolliePrefix\Symfony\Component\DependencyInjection\ContainerBuilder(), new \MolliePrefix\Symfony\Component\Config\FileLocator());
        $this->assertTrue($loader->supports('any-path', 'glob'), '->supports() returns true if the resource has the glob type');
        $this->assertFalse($loader->supports('any-path'), '->supports() returns false if the resource is not of glob type');
    }
    public function testLoadAddsTheGlobResourceToTheContainer()
    {
        $loader = new \MolliePrefix\Symfony\Component\DependencyInjection\Tests\Loader\GlobFileLoaderWithoutImport($container = new \MolliePrefix\Symfony\Component\DependencyInjection\ContainerBuilder(), new \MolliePrefix\Symfony\Component\Config\FileLocator());
        $loader->load(__DIR__ . '/../Fixtures/config/*');
        $this->assertEquals(new \MolliePrefix\Symfony\Component\Config\Resource\GlobResource(__DIR__ . '/../Fixtures/config', '/*', \false), $container->getResources()[1]);
    }
}
class GlobFileLoaderWithoutImport extends \MolliePrefix\Symfony\Component\DependencyInjection\Loader\GlobFileLoader
{
    public function import($resource, $type = null, $ignoreErrors = \false, $sourceResource = null)
    {
    }
}
