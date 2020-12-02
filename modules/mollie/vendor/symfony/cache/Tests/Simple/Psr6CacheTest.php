<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Simple;

use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\FilesystemAdapter;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Simple\Psr6Cache;
/**
 * @group time-sensitive
 */
class Psr6CacheTest extends \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Simple\CacheTestCase
{
    protected $skippedTests = ['testPrune' => 'Psr6Cache just proxies'];
    public function createSimpleCache($defaultLifetime = 0)
    {
        return new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Simple\Psr6Cache(new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\FilesystemAdapter('', $defaultLifetime));
    }
}
