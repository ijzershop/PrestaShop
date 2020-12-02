<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Definition;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\NodeInterface;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Processor;
class FinalizationTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testUnsetKeyWithDeepHierarchy()
    {
        $tb = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Builder\TreeBuilder();
        $tree = $tb->root('config', 'array')->children()->node('level1', 'array')->canBeUnset()->children()->node('level2', 'array')->canBeUnset()->children()->node('somevalue', 'scalar')->end()->node('anothervalue', 'scalar')->end()->end()->end()->node('level1_scalar', 'scalar')->end()->end()->end()->end()->end()->buildTree();
        $a = ['level1' => ['level2' => ['somevalue' => 'foo', 'anothervalue' => 'bar'], 'level1_scalar' => 'foo']];
        $b = ['level1' => ['level2' => \false]];
        $this->assertEquals(['level1' => ['level1_scalar' => 'foo']], $this->process($tree, [$a, $b]));
    }
    protected function process(\_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\NodeInterface $tree, array $configs)
    {
        $processor = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\Processor();
        return $processor->process($tree, $configs);
    }
}
