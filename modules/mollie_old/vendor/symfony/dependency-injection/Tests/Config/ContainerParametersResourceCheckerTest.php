<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Config;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\MockObject\MockObject;
use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\ResourceCheckerInterface;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Config\ContainerParametersResource;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Config\ContainerParametersResourceChecker;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerInterface;
class ContainerParametersResourceCheckerTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    /** @var ContainerParametersResource */
    private $resource;
    /** @var ResourceCheckerInterface */
    private $resourceChecker;
    /** @var ContainerInterface */
    private $container;
    protected function setUp()
    {
        $this->resource = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Config\ContainerParametersResource(['locales' => ['fr', 'en'], 'default_locale' => 'fr']);
        $this->container = $this->getMockBuilder(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerInterface::class)->getMock();
        $this->resourceChecker = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Config\ContainerParametersResourceChecker($this->container);
    }
    public function testSupports()
    {
        $this->assertTrue($this->resourceChecker->supports($this->resource));
    }
    /**
     * @dataProvider isFreshProvider
     */
    public function testIsFresh(callable $mockContainer, $expected)
    {
        $mockContainer($this->container);
        $this->assertSame($expected, $this->resourceChecker->isFresh($this->resource, \time()));
    }
    public function isFreshProvider()
    {
        (yield 'not fresh on missing parameter' => [function (\_PhpScoper5eddef0da618a\PHPUnit\Framework\MockObject\MockObject $container) {
            $container->method('hasParameter')->with('locales')->willReturn(\false);
        }, \false]);
        (yield 'not fresh on different value' => [function (\_PhpScoper5eddef0da618a\PHPUnit\Framework\MockObject\MockObject $container) {
            $container->method('getParameter')->with('locales')->willReturn(['nl', 'es']);
        }, \false]);
        (yield 'fresh on every identical parameters' => [function (\_PhpScoper5eddef0da618a\PHPUnit\Framework\MockObject\MockObject $container) {
            $container->expects($this->exactly(2))->method('hasParameter')->willReturn(\true);
            $container->expects($this->exactly(2))->method('getParameter')->withConsecutive([$this->equalTo('locales')], [$this->equalTo('default_locale')])->willReturnMap([['locales', ['fr', 'en']], ['default_locale', 'fr']]);
        }, \true]);
    }
}
