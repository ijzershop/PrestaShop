<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\DependencyInjection\Loader\Configurator\Traits;

use MolliePrefix\Symfony\Component\DependencyInjection\ChildDefinition;
use MolliePrefix\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;
/**
 * @method $this parent(string $parent)
 */
trait ParentTrait
{
    /**
     * Sets the Definition to inherit from.
     *
     * @param string $parent
     *
     * @return $this
     *
     * @throws InvalidArgumentException when parent cannot be set
     */
    protected final function setParent($parent)
    {
        if (!$this->allowParent) {
            throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('A parent cannot be defined when either "_instanceof" or "_defaults" are also defined for service prototype "%s".', $this->id));
        }
        if ($this->definition instanceof \MolliePrefix\Symfony\Component\DependencyInjection\ChildDefinition) {
            $this->definition->setParent($parent);
        } elseif ($this->definition->isAutoconfigured()) {
            throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('The service "%s" cannot have a "parent" and also have "autoconfigure". Try disabling autoconfiguration for the service.', $this->id));
        } elseif ($this->definition->getBindings()) {
            throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('The service "%s" cannot have a "parent" and also "bind" arguments.', $this->id));
        } else {
            // cast Definition to ChildDefinition
            $definition = \serialize($this->definition);
            $definition = \substr_replace($definition, '53', 2, 2);
            $definition = \substr_replace($definition, 'Child', 44, 0);
            $definition = \unserialize($definition);
            $this->definition = $definition->setParent($parent);
        }
        return $this;
    }
}
