<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\Cache\Tests\Fixtures;

use MolliePrefix\Psr\Cache\CacheItemInterface;
use MolliePrefix\Psr\Cache\CacheItemPoolInterface;
use MolliePrefix\Symfony\Component\Cache\Adapter\ArrayAdapter;
/**
 * Adapter not implementing the {@see \Symfony\Component\Cache\Adapter\AdapterInterface}.
 *
 * @author Kévin Dunglas <dunglas@gmail.com>
 */
class ExternalAdapter implements \MolliePrefix\Psr\Cache\CacheItemPoolInterface
{
    private $cache;
    public function __construct($defaultLifetime = 0)
    {
        $this->cache = new \MolliePrefix\Symfony\Component\Cache\Adapter\ArrayAdapter($defaultLifetime);
    }
    public function getItem($key)
    {
        return $this->cache->getItem($key);
    }
    public function getItems(array $keys = [])
    {
        return $this->cache->getItems($keys);
    }
    public function hasItem($key)
    {
        return $this->cache->hasItem($key);
    }
    public function clear()
    {
        return $this->cache->clear();
    }
    public function deleteItem($key)
    {
        return $this->cache->deleteItem($key);
    }
    public function deleteItems(array $keys)
    {
        return $this->cache->deleteItems($keys);
    }
    public function save(\MolliePrefix\Psr\Cache\CacheItemInterface $item)
    {
        return $this->cache->save($item);
    }
    public function saveDeferred(\MolliePrefix\Psr\Cache\CacheItemInterface $item)
    {
        return $this->cache->saveDeferred($item);
    }
    public function commit()
    {
        return $this->cache->commit();
    }
}
