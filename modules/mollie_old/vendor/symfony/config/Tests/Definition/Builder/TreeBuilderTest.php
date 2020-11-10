<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Definition\Builder;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Fixtures\Builder\NodeBuilder as CustomNodeBuilder;
class TreeBuilderTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testUsingACustomNodeBuilder()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $root = $builder->root('custom', 'array', new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Fixtures\Builder\NodeBuilder());
        $nodeBuilder = $root->children();
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Tests\\Fixtures\\Builder\\NodeBuilder', $nodeBuilder);
        $nodeBuilder = $nodeBuilder->arrayNode('deeper')->children();
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Tests\\Fixtures\\Builder\\NodeBuilder', $nodeBuilder);
    }
    public function testOverrideABuiltInNodeType()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $root = $builder->root('override', 'array', new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Fixtures\Builder\NodeBuilder());
        $definition = $root->children()->variableNode('variable');
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Tests\\Fixtures\\Builder\\VariableNodeDefinition', $definition);
    }
    public function testAddANodeType()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $root = $builder->root('override', 'array', new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Fixtures\Builder\NodeBuilder());
        $definition = $root->children()->barNode('variable');
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Tests\\Fixtures\\Builder\\BarNodeDefinition', $definition);
    }
    public function testCreateABuiltInNodeTypeWithACustomNodeBuilder()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $root = $builder->root('builtin', 'array', new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Fixtures\Builder\NodeBuilder());
        $definition = $root->children()->booleanNode('boolean');
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\Builder\\BooleanNodeDefinition', $definition);
    }
    public function testPrototypedArrayNodeUseTheCustomNodeBuilder()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $root = $builder->root('override', 'array', new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Fixtures\Builder\NodeBuilder());
        $root->prototype('bar')->end();
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Tests\\Fixtures\\BarNode', $root->getNode(\true)->getPrototype());
    }
    public function testAnExtendedNodeBuilderGetsPropagatedToTheChildren()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $builder->root('propagation')->children()->setNodeClass('extended', '_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\Builder\\BooleanNodeDefinition')->node('foo', 'extended')->end()->arrayNode('child')->children()->node('foo', 'extended')->end()->end()->end()->end();
        $node = $builder->buildTree();
        $children = $node->getChildren();
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\BooleanNode', $children['foo']);
        $childChildren = $children['child']->getChildren();
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\BooleanNode', $childChildren['foo']);
    }
    public function testDefinitionInfoGetsTransferredToNode()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $builder->root('test')->info('root info')->children()->node('child', 'variable')->info('child info')->defaultValue('default')->end()->end();
        $tree = $builder->buildTree();
        $children = $tree->getChildren();
        $this->assertEquals('root info', $tree->getInfo());
        $this->assertEquals('child info', $children['child']->getInfo());
    }
    public function testDefinitionExampleGetsTransferredToNode()
    {
        $builder = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $builder->root('test')->example(['key' => 'value'])->children()->node('child', 'variable')->info('child info')->defaultValue('default')->example('example')->end()->end();
        $tree = $builder->buildTree();
        $children = $tree->getChildren();
        $this->assertIsArray($tree->getExample());
        $this->assertEquals('example', $children['child']->getExample());
    }
}
