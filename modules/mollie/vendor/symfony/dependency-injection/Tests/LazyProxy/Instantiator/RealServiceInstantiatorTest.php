<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\LazyProxy\Instantiator;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\LazyProxy\Instantiator\RealServiceInstantiator;
/**
 * Tests for {@see \Symfony\Component\DependencyInjection\LazyProxy\Instantiator\RealServiceInstantiator}.
 *
 * @author Marco Pivetta <ocramius@gmail.com>
 */
class RealServiceInstantiatorTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testInstantiateProxy()
    {
        $instantiator = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\LazyProxy\Instantiator\RealServiceInstantiator();
        $instance = new \stdClass();
        $container = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\ContainerInterface')->getMock();
        $callback = function () use($instance) {
            return $instance;
        };
        $this->assertSame($instance, $instantiator->instantiateProxy($container, new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition(), 'foo', $callback));
    }
}
