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

use _PhpScoper5eddef0da618a\Doctrine\DBAL\DriverManager;
use _PhpScoper5eddef0da618a\Doctrine\DBAL\Version;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\PdoAdapter;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Traits\PdoPruneableTrait;
/**
 * @group time-sensitive
 */
class PdoDbalAdapterTest extends \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter\AdapterTestCase
{
    use PdoPruneableTrait;
    protected static $dbFile;
    public static function setUpBeforeClass()
    {
        if (!\extension_loaded('pdo_sqlite')) {
            self::markTestSkipped('Extension pdo_sqlite required.');
        }
        if (\PHP_VERSION_ID >= 80000 && \class_exists(\_PhpScoper5eddef0da618a\Doctrine\DBAL\Version::class)) {
            self::markTestSkipped('Doctrine DBAL 2.x is incompatible with PHP 8.');
        }
        self::$dbFile = \tempnam(\sys_get_temp_dir(), 'sf_sqlite_cache');
        $pool = new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\PdoAdapter(\_PhpScoper5eddef0da618a\Doctrine\DBAL\DriverManager::getConnection(['driver' => 'pdo_sqlite', 'path' => self::$dbFile]));
        $pool->createTable();
    }
    public static function tearDownAfterClass()
    {
        @\unlink(self::$dbFile);
    }
    public function createCachePool($defaultLifetime = 0)
    {
        return new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\PdoAdapter(\_PhpScoper5eddef0da618a\Doctrine\DBAL\DriverManager::getConnection(['driver' => 'pdo_sqlite', 'path' => self::$dbFile]), '', $defaultLifetime);
    }
}
