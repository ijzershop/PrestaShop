<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Compiler;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\CheckArgumentsValidityPass;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder;
/**
 * @author Kévin Dunglas <dunglas@gmail.com>
 */
class CheckArgumentsValidityPassTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testProcess()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $definition = $container->register('foo');
        $definition->setArguments([null, 1, 'a']);
        $definition->setMethodCalls([['bar', ['a', 'b']], ['baz', ['c', 'd']]]);
        $pass = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\CheckArgumentsValidityPass();
        $pass->process($container);
        $this->assertEquals([null, 1, 'a'], $container->getDefinition('foo')->getArguments());
        $this->assertEquals([['bar', ['a', 'b']], ['baz', ['c', 'd']]], $container->getDefinition('foo')->getMethodCalls());
    }
    /**
     * @dataProvider definitionProvider
     */
    public function testException(array $arguments, array $methodCalls)
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\RuntimeException');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $definition = $container->register('foo');
        $definition->setArguments($arguments);
        $definition->setMethodCalls($methodCalls);
        $pass = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\CheckArgumentsValidityPass();
        $pass->process($container);
    }
    public function definitionProvider()
    {
        return [[[null, 'a' => 'a'], []], [[1 => 1], []], [[], [['baz', [null, 'a' => 'a']]]], [[], [['baz', [1 => 1]]]]];
    }
    public function testNoException()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $definition = $container->register('foo');
        $definition->setArguments([null, 'a' => 'a']);
        $pass = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\CheckArgumentsValidityPass(\false);
        $pass->process($container);
        $this->assertCount(1, $definition->getErrors());
    }
}
