<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\DefinitionDecorator;
class ChildDefinitionTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testConstructor()
    {
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $this->assertSame('foo', $def->getParent());
        $this->assertSame([], $def->getChanges());
    }
    /**
     * @dataProvider getPropertyTests
     */
    public function testSetProperty($property, $changeKey)
    {
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $getter = 'get' . \ucfirst($property);
        $setter = 'set' . \ucfirst($property);
        $this->assertNull($def->{$getter}());
        $this->assertSame($def, $def->{$setter}('foo'));
        $this->assertSame('foo', $def->{$getter}());
        $this->assertSame([$changeKey => \true], $def->getChanges());
    }
    public function getPropertyTests()
    {
        return [['class', 'class'], ['factory', 'factory'], ['configurator', 'configurator'], ['file', 'file']];
    }
    public function testSetPublic()
    {
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $this->assertTrue($def->isPublic());
        $this->assertSame($def, $def->setPublic(\false));
        $this->assertFalse($def->isPublic());
        $this->assertSame(['public' => \true], $def->getChanges());
    }
    public function testSetLazy()
    {
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $this->assertFalse($def->isLazy());
        $this->assertSame($def, $def->setLazy(\false));
        $this->assertFalse($def->isLazy());
        $this->assertSame(['lazy' => \true], $def->getChanges());
    }
    public function testSetAutowired()
    {
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $this->assertFalse($def->isAutowired());
        $this->assertSame($def, $def->setAutowired(\true));
        $this->assertTrue($def->isAutowired());
        $this->assertSame(['autowired' => \true], $def->getChanges());
    }
    public function testSetArgument()
    {
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $this->assertSame([], $def->getArguments());
        $this->assertSame($def, $def->replaceArgument(0, 'foo'));
        $this->assertSame(['index_0' => 'foo'], $def->getArguments());
    }
    public function testReplaceArgumentShouldRequireIntegerIndex()
    {
        $this->expectException('InvalidArgumentException');
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $def->replaceArgument('0', 'foo');
    }
    public function testReplaceArgument()
    {
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $def->setArguments([0 => 'foo', 1 => 'bar']);
        $this->assertSame('foo', $def->getArgument(0));
        $this->assertSame('bar', $def->getArgument(1));
        $this->assertSame($def, $def->replaceArgument(1, 'baz'));
        $this->assertSame('foo', $def->getArgument(0));
        $this->assertSame('baz', $def->getArgument(1));
        $this->assertSame([0 => 'foo', 1 => 'bar', 'index_1' => 'baz'], $def->getArguments());
        $this->assertSame($def, $def->replaceArgument('$bar', 'val'));
        $this->assertSame('val', $def->getArgument('$bar'));
        $this->assertSame([0 => 'foo', 1 => 'bar', 'index_1' => 'baz', '$bar' => 'val'], $def->getArguments());
    }
    public function testGetArgumentShouldCheckBounds()
    {
        $this->expectException('OutOfBoundsException');
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $def->setArguments([0 => 'foo']);
        $def->replaceArgument(0, 'foo');
        $def->getArgument(1);
    }
    public function testDefinitionDecoratorAliasExistsForBackwardsCompatibility()
    {
        $this->assertInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition::class, new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\DefinitionDecorator('foo'));
    }
    public function testCannotCallSetAutoconfigured()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\BadMethodCallException');
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $def->setAutoconfigured(\true);
    }
    public function testCannotCallSetInstanceofConditionals()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\BadMethodCallException');
        $def = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('foo');
        $def->setInstanceofConditionals(['Foo' => new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ChildDefinition('')]);
    }
}
