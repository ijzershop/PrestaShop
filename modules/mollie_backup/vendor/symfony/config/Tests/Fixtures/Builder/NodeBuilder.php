<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\Config\Tests\Fixtures\Builder;

use MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeBuilder as BaseNodeBuilder;
class NodeBuilder extends \MolliePrefix\Symfony\Component\Config\Definition\Builder\NodeBuilder
{
    public function barNode($name)
    {
        return $this->node($name, 'bar');
    }
    protected function getNodeClass($type)
    {
        switch ($type) {
            case 'variable':
                return __NAMESPACE__ . '\\' . \ucfirst($type) . 'NodeDefinition';
            case 'bar':
                return __NAMESPACE__ . '\\' . \ucfirst($type) . 'NodeDefinition';
            default:
                return parent::getNodeClass($type);
        }
    }
}
