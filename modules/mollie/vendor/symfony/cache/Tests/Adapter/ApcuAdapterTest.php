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

use _PhpScoper5eddef0da618a\Psr\Log\NullLogger;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\ApcuAdapter;
class ApcuAdapterTest extends \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter\AdapterTestCase
{
    protected $skippedTests = ['testExpiration' => 'Testing expiration slows down the test suite', 'testHasItemReturnsFalseWhenDeferredItemIsExpired' => 'Testing expiration slows down the test suite', 'testDefaultLifeTime' => 'Testing expiration slows down the test suite'];
    public function createCachePool($defaultLifetime = 0)
    {
        if (!\function_exists('_PhpScoper5eddef0da618a\\apcu_fetch') || !\filter_var(\ini_get('apc.enabled'), \FILTER_VALIDATE_BOOLEAN)) {
            $this->markTestSkipped('APCu extension is required.');
        }
        if ('cli' === \PHP_SAPI && !\filter_var(\ini_get('apc.enable_cli'), \FILTER_VALIDATE_BOOLEAN)) {
            if ('testWithCliSapi' !== $this->getName()) {
                $this->markTestSkipped('apc.enable_cli=1 is required.');
            }
        }
        if ('\\' === \DIRECTORY_SEPARATOR) {
            $this->markTestSkipped('Fails transiently on Windows.');
        }
        return new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\ApcuAdapter(\str_replace('\\', '.', __CLASS__), $defaultLifetime);
    }
    public function testUnserializable()
    {
        $pool = $this->createCachePool();
        $item = $pool->getItem('foo');
        $item->set(function () {
        });
        $this->assertFalse($pool->save($item));
        $item = $pool->getItem('foo');
        $this->assertFalse($item->isHit());
    }
    public function testVersion()
    {
        $namespace = \str_replace('\\', '.', static::class);
        $pool1 = new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\ApcuAdapter($namespace, 0, 'p1');
        $item = $pool1->getItem('foo');
        $this->assertFalse($item->isHit());
        $this->assertTrue($pool1->save($item->set('bar')));
        $item = $pool1->getItem('foo');
        $this->assertTrue($item->isHit());
        $this->assertSame('bar', $item->get());
        $pool2 = new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\ApcuAdapter($namespace, 0, 'p2');
        $item = $pool2->getItem('foo');
        $this->assertFalse($item->isHit());
        $this->assertNull($item->get());
        $item = $pool1->getItem('foo');
        $this->assertFalse($item->isHit());
        $this->assertNull($item->get());
    }
    public function testNamespace()
    {
        $namespace = \str_replace('\\', '.', static::class);
        $pool1 = new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\ApcuAdapter($namespace . '_1', 0, 'p1');
        $item = $pool1->getItem('foo');
        $this->assertFalse($item->isHit());
        $this->assertTrue($pool1->save($item->set('bar')));
        $item = $pool1->getItem('foo');
        $this->assertTrue($item->isHit());
        $this->assertSame('bar', $item->get());
        $pool2 = new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\ApcuAdapter($namespace . '_2', 0, 'p1');
        $item = $pool2->getItem('foo');
        $this->assertFalse($item->isHit());
        $this->assertNull($item->get());
        $item = $pool1->getItem('foo');
        $this->assertTrue($item->isHit());
        $this->assertSame('bar', $item->get());
    }
    public function testWithCliSapi()
    {
        try {
            // disable PHPUnit error handler to mimic a production environment
            $isCalled = \false;
            \set_error_handler(function () use(&$isCalled) {
                $isCalled = \true;
            });
            $pool = new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\ApcuAdapter(\str_replace('\\', '.', __CLASS__));
            $pool->setLogger(new \_PhpScoper5eddef0da618a\Psr\Log\NullLogger());
            $item = $pool->getItem('foo');
            $item->isHit();
            $pool->save($item->set('bar'));
            $this->assertFalse($isCalled);
        } finally {
            \restore_error_handler();
        }
    }
}
