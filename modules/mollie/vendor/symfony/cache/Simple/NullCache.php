<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Cache\Simple;

use _PhpScoper5eddef0da618a\Psr\SimpleCache\CacheInterface;
/**
 * @author Nicolas Grekas <p@tchwork.com>
 */
class NullCache implements \_PhpScoper5eddef0da618a\Psr\SimpleCache\CacheInterface
{
    /**
     * {@inheritdoc}
     */
    public function get($key, $default = null)
    {
        return $default;
    }
    /**
     * {@inheritdoc}
     */
    public function getMultiple($keys, $default = null)
    {
        foreach ($keys as $key) {
            (yield $key => $default);
        }
    }
    /**
     * {@inheritdoc}
     */
    public function has($key)
    {
        return \false;
    }
    /**
     * {@inheritdoc}
     */
    public function clear()
    {
        return \true;
    }
    /**
     * {@inheritdoc}
     */
    public function delete($key)
    {
        return \true;
    }
    /**
     * {@inheritdoc}
     */
    public function deleteMultiple($keys)
    {
        return \true;
    }
    /**
     * {@inheritdoc}
     */
    public function set($key, $value, $ttl = null)
    {
        return \false;
    }
    /**
     * {@inheritdoc}
     */
    public function setMultiple($values, $ttl = null)
    {
        return \false;
    }
}
