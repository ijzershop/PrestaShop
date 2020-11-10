<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter;

use _PhpScoper5eddef0da618a\Psr\Cache\CacheItemPoolInterface;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\FilesystemAdapter;
/**
 * @group time-sensitive
 */
class FilesystemAdapterTest extends \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter\AdapterTestCase
{
    public function createCachePool($defaultLifetime = 0)
    {
        return new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\FilesystemAdapter('', $defaultLifetime);
    }
    public static function tearDownAfterClass()
    {
        self::rmdir(\sys_get_temp_dir() . '/symfony-cache');
    }
    public static function rmdir($dir)
    {
        if (!\file_exists($dir)) {
            return;
        }
        if (!$dir || 0 !== \strpos(\dirname($dir), \sys_get_temp_dir())) {
            throw new \Exception(__METHOD__ . "() operates only on subdirs of system's temp dir");
        }
        $children = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir, \RecursiveDirectoryIterator::SKIP_DOTS), \RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($children as $child) {
            if ($child->isDir()) {
                \rmdir($child);
            } else {
                \unlink($child);
            }
        }
        \rmdir($dir);
    }
    protected function isPruned(\_PhpScoper5eddef0da618a\Psr\Cache\CacheItemPoolInterface $cache, $name)
    {
        $getFileMethod = (new \ReflectionObject($cache))->getMethod('getFile');
        $getFileMethod->setAccessible(\true);
        return !\file_exists($getFileMethod->invoke($cache, $name));
    }
}
