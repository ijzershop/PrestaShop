<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Cache\Tests\Adapter;

use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\Version;
use Symfony\Component\Cache\Adapter\PdoAdapter;
use Symfony\Component\Cache\Tests\Traits\PdoPruneableTrait;

/**
 * @group time-sensitive
 */
class PdoDbalAdapterTest extends AdapterTestCase
{
    use PdoPruneableTrait;

    protected static $dbFile;

    public static function setUpBeforeClass()
    {
        if (!\extension_loaded('pdo_sqlite')) {
            self::markTestSkipped('Extension pdo_sqlite required.');
        }

        if (\PHP_VERSION_ID >= 80000 && class_exists(Version::class)) {
            self::markTestSkipped('Doctrine DBAL 2.x is incompatible with PHP 8.');
        }

        self::$dbFile = tempnam(sys_get_temp_dir(), 'sf_sqlite_cache');

        $pool = new PdoAdapter(DriverManager::getConnection(['driver' => 'pdo_sqlite', 'path' => self::$dbFile]));
        $pool->createTable();
    }

    public static function tearDownAfterClass()
    {
        @unlink(self::$dbFile);
    }

    public function createCachePool($defaultLifetime = 0)
    {
        return new PdoAdapter(DriverManager::getConnection(['driver' => 'pdo_sqlite', 'path' => self::$dbFile]), '', $defaultLifetime);
    }
}
