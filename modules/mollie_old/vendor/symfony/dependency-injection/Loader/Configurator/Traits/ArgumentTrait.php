<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\Configurator\Traits;

trait ArgumentTrait
{
    /**
     * Sets the arguments to pass to the service constructor/factory method.
     *
     * @param array $arguments An array of arguments
     *
     * @return $this
     */
    public final function args(array $arguments)
    {
        $this->definition->setArguments(static::processValue($arguments, \true));
        return $this;
    }
    /**
     * Sets one argument to pass to the service constructor/factory method.
     *
     * @param string|int $key
     * @param mixed      $value
     *
     * @return $this
     */
    public final function arg($key, $value)
    {
        $this->definition->setArgument($key, static::processValue($value, \true));
        return $this;
    }
}
