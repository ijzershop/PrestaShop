<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace PrestaShop\Module\PsAccounts\Vendor\Symfony\Component\DependencyInjection\Loader;

use PrestaShop\Module\PsAccounts\Vendor\Symfony\Component\Config\Loader\Loader;
use PrestaShop\Module\PsAccounts\Vendor\Symfony\Component\DependencyInjection\ContainerBuilder;
/**
 * ClosureLoader loads service definitions from a PHP closure.
 *
 * The Closure has access to the container as its first argument.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 */
class ClosureLoader extends Loader
{
    private $container;
    public function __construct(ContainerBuilder $container)
    {
        $this->container = $container;
    }
    /**
     * {@inheritdoc}
     */
    public function load($resource, $type = null)
    {
        \call_user_func($resource, $this->container);
    }
    /**
     * {@inheritdoc}
     */
    public function supports($resource, $type = null)
    {
        return $resource instanceof \Closure;
    }
}
