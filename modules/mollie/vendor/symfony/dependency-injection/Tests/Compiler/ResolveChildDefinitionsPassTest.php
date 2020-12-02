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
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\ResolveChildDefinitionsPass;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\ResolveDefinitionTemplatesPass;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder;
class ResolveChildDefinitionsPassTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testProcess()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'foo')->setArguments(['moo', 'b'])->setProperty('foo', 'moo');
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->replaceArgument(0, 'a')->setProperty('foo', 'bar')->setClass('bar');
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertNotInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition::class, $def);
        $this->assertEquals('bar', $def->getClass());
        $this->assertEquals(['a', 'b'], $def->getArguments());
        $this->assertEquals(['foo' => 'bar'], $def->getProperties());
    }
    public function testProcessAppendsMethodCallsAlways()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent')->addMethodCall('foo', ['bar']);
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->addMethodCall('bar', ['foo']);
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertEquals([['foo', ['bar']], ['bar', ['foo']]], $def->getMethodCalls());
    }
    public function testProcessDoesNotCopyAbstract()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent')->setAbstract(\true);
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'));
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertFalse($def->isAbstract());
    }
    public function testProcessDoesNotCopyShared()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent')->setShared(\false);
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'));
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertTrue($def->isShared());
    }
    public function testProcessDoesNotCopyTags()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent')->addTag('foo');
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'));
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertEquals([], $def->getTags());
    }
    public function testProcessDoesNotCopyDecoratedService()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent')->setDecoratedService('foo');
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'));
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertNull($def->getDecoratedService());
    }
    public function testProcessDoesNotDropShared()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent');
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->setShared(\false);
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertFalse($def->isShared());
    }
    public function testProcessHandlesMultipleInheritance()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'foo')->setArguments(['foo', 'bar', 'c']);
        $container->setDefinition('child2', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('child1'))->replaceArgument(1, 'b');
        $container->setDefinition('child1', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->replaceArgument(0, 'a');
        $this->process($container);
        $def = $container->getDefinition('child2');
        $this->assertEquals(['a', 'b', 'c'], $def->getArguments());
        $this->assertEquals('foo', $def->getClass());
    }
    public function testSetLazyOnServiceHasParent()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'stdClass');
        $container->setDefinition('child1', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->setLazy(\true);
        $this->process($container);
        $this->assertTrue($container->getDefinition('child1')->isLazy());
    }
    public function testSetLazyOnServiceIsParent()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'stdClass')->setLazy(\true);
        $container->setDefinition('child1', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'));
        $this->process($container);
        $this->assertTrue($container->getDefinition('child1')->isLazy());
    }
    public function testSetAutowiredOnServiceHasParent()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'stdClass')->setAutowired(\true);
        $container->setDefinition('child1', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->setAutowired(\false);
        $this->process($container);
        $this->assertFalse($container->getDefinition('child1')->isAutowired());
    }
    public function testSetAutowiredOnServiceIsParent()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'stdClass')->setAutowired(\true);
        $container->setDefinition('child1', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'));
        $this->process($container);
        $this->assertTrue($container->getDefinition('child1')->isAutowired());
    }
    public function testDeepDefinitionsResolving()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'parentClass');
        $container->register('sibling', 'siblingClass')->setConfigurator(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'), 'foo')->setFactory([new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'), 'foo'])->addArgument(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->setProperty('prop', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->addMethodCall('meth', [new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent')]);
        $this->process($container);
        $configurator = $container->getDefinition('sibling')->getConfigurator();
        $this->assertSame('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Definition', \get_class($configurator));
        $this->assertSame('parentClass', $configurator->getClass());
        $factory = $container->getDefinition('sibling')->getFactory();
        $this->assertSame('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Definition', \get_class($factory[0]));
        $this->assertSame('parentClass', $factory[0]->getClass());
        $argument = $container->getDefinition('sibling')->getArgument(0);
        $this->assertSame('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Definition', \get_class($argument));
        $this->assertSame('parentClass', $argument->getClass());
        $properties = $container->getDefinition('sibling')->getProperties();
        $this->assertSame('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Definition', \get_class($properties['prop']));
        $this->assertSame('parentClass', $properties['prop']->getClass());
        $methodCalls = $container->getDefinition('sibling')->getMethodCalls();
        $this->assertSame('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Definition', \get_class($methodCalls[0][1][0]));
        $this->assertSame('parentClass', $methodCalls[0][1][0]->getClass());
    }
    public function testSetDecoratedServiceOnServiceHasParent()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'stdClass');
        $container->setDefinition('child1', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->setDecoratedService('foo', 'foo_inner', 5);
        $this->process($container);
        $this->assertEquals(['foo', 'foo_inner', 5], $container->getDefinition('child1')->getDecoratedService());
    }
    public function testDecoratedServiceCopiesDeprecatedStatusFromParent()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('deprecated_parent')->setDeprecated(\true);
        $container->setDefinition('decorated_deprecated_parent', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('deprecated_parent'));
        $this->process($container);
        $this->assertTrue($container->getDefinition('decorated_deprecated_parent')->isDeprecated());
    }
    public function testDecoratedServiceCanOverwriteDeprecatedParentStatus()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('deprecated_parent')->setDeprecated(\true);
        $container->setDefinition('decorated_deprecated_parent', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('deprecated_parent'))->setDeprecated(\false);
        $this->process($container);
        $this->assertFalse($container->getDefinition('decorated_deprecated_parent')->isDeprecated());
    }
    /**
     * @group legacy
     */
    public function testProcessMergeAutowiringTypes()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent')->addAutowiringType('Foo');
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->addAutowiringType('Bar');
        $this->process($container);
        $childDef = $container->getDefinition('child');
        $this->assertEquals(['Foo', 'Bar'], $childDef->getAutowiringTypes());
        $parentDef = $container->getDefinition('parent');
        $this->assertSame(['Foo'], $parentDef->getAutowiringTypes());
    }
    public function testProcessResolvesAliases()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'ParentClass');
        $container->setAlias('parent_alias', 'parent');
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent_alias'));
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertSame('ParentClass', $def->getClass());
    }
    public function testProcessSetsArguments()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'ParentClass')->setArguments([0]);
        $container->setDefinition('child', (new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->setArguments([1, 'index_0' => 2, 'foo' => 3]));
        $this->process($container);
        $def = $container->getDefinition('child');
        $this->assertSame([2, 1, 'foo' => 3], $def->getArguments());
    }
    public function testBindings()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'stdClass')->setBindings(['a' => '1', 'b' => '2']);
        $container->setDefinition('child', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'))->setBindings(['b' => 'B', 'c' => 'C']);
        $this->process($container);
        $bindings = [];
        foreach ($container->getDefinition('child')->getBindings() as $k => $v) {
            $bindings[$k] = $v->getValues()[0];
        }
        $this->assertEquals(['b' => 'B', 'c' => 'C', 'a' => '1'], $bindings);
    }
    public function testSetAutoconfiguredOnServiceIsParent()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('parent', 'stdClass')->setAutoconfigured(\true);
        $container->setDefinition('child1', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('parent'));
        $this->process($container);
        $this->assertFalse($container->getDefinition('child1')->isAutoconfigured());
    }
    /**
     * @group legacy
     */
    public function testAliasExistsForBackwardsCompatibility()
    {
        $this->assertInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\ResolveChildDefinitionsPass::class, new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\ResolveDefinitionTemplatesPass());
    }
    protected function process(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder $container)
    {
        $pass = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\ResolveChildDefinitionsPass();
        $pass->process($container);
    }
    public function testProcessDetectsChildDefinitionIndirectCircularReference()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\ServiceCircularReferenceException');
        $this->expectExceptionMessageRegExp('/^Circular reference detected for service "c", path: "c -> b -> a -> c"./');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->register('a');
        $container->setDefinition('b', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('a'));
        $container->setDefinition('c', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('b'));
        $container->setDefinition('a', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('c'));
        $this->process($container);
    }
}
