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

use MolliePrefix\Symfony\Component\Config\Definition\ScalarNode;
/**
 * This class provides a fluent interface for defining a node.
 *
 * @author Johannes M. Schmitt <schmittjoh@gmail.com>
 */
class ScalarNodeDefinition extends \MolliePrefix\Symfony\Component\Config\Definition\Builder\VariableNodeDefinition
{
    /**
     * Instantiate a Node.
     *
     * @return ScalarNode The node
     */
    protected function instantiateNode()
    {
        return new \MolliePrefix\Symfony\Component\Config\Definition\ScalarNode($this->name, $this->parent);
    }
}
