<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\Config\Definition\Builder;

use MolliePrefix\Symfony\Component\Config\Definition\NodeInterface;
/**
 * This is the entry class for building a config tree.
 *
 * @author Johannes M. Schmitt <schmittjoh@gmail.com>
 */
class TreeBuilder implements \MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeParentInterface
{
    protected $tree;
    protected $root;
    /**
     * @deprecated since 3.4. To be removed in 4.0
     */
    protected $builder;
    /**
     * Creates the root node.
     *
     * @param string      $name    The name of the root node
     * @param string      $type    The type of the root node
     * @param NodeBuilder $builder A custom node builder instance
     *
     * @return ArrayNodeDefinition|NodeDefinition The root node (as an ArrayNodeDefinition when the type is 'array')
     *
     * @throws \RuntimeException When the node type is not supported
     */
    public function root($name, $type = 'array', \MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeBuilder $builder = null)
    {
        $builder = $builder ?: new \MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeBuilder();
        return $this->root = $builder->node($name, $type)->setParent($this);
    }
    /**
     * Builds the tree.
     *
     * @return NodeInterface
     *
     * @throws \RuntimeException
     */
    public function buildTree()
    {
        if (null === $this->root) {
            throw new \RuntimeException('The configuration tree has no root node.');
        }
        if (null !== $this->tree) {
            return $this->tree;
        }
        return $this->tree = $this->root->getNode(\true);
    }
}
