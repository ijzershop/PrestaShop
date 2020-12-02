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

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\AbstractAdapter;
class MaxIdLengthAdapterTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testLongKey()
    {
        $cache = $this->getMockBuilder(\_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter\MaxIdLengthAdapter::class)->setConstructorArgs([\str_repeat('-', 10)])->setMethods(['doHave', 'doFetch', 'doDelete', 'doSave', 'doClear'])->getMock();
        $cache->expects($this->exactly(2))->method('doHave')->withConsecutive([$this->equalTo('----------:0GTYWa9n4ed8vqNlOT2iEr:')], [$this->equalTo('----------:---------------------------------------')]);
        $cache->hasItem(\str_repeat('-', 40));
        $cache->hasItem(\str_repeat('-', 39));
    }
    public function testLongKeyVersioning()
    {
        $cache = $this->getMockBuilder(\_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter\MaxIdLengthAdapter::class)->setConstructorArgs([\str_repeat('-', 26)])->getMock();
        $cache->method('doFetch')->willReturn(['2:']);
        $reflectionClass = new \ReflectionClass(\_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\AbstractAdapter::class);
        $reflectionMethod = $reflectionClass->getMethod('getId');
        $reflectionMethod->setAccessible(\true);
        // No versioning enabled
        $this->assertEquals('--------------------------:------------', $reflectionMethod->invokeArgs($cache, [\str_repeat('-', 12)]));
        $this->assertLessThanOrEqual(50, \strlen($reflectionMethod->invokeArgs($cache, [\str_repeat('-', 12)])));
        $this->assertLessThanOrEqual(50, \strlen($reflectionMethod->invokeArgs($cache, [\str_repeat('-', 23)])));
        $this->assertLessThanOrEqual(50, \strlen($reflectionMethod->invokeArgs($cache, [\str_repeat('-', 40)])));
        $reflectionProperty = $reflectionClass->getProperty('versioningIsEnabled');
        $reflectionProperty->setAccessible(\true);
        $reflectionProperty->setValue($cache, \true);
        // Versioning enabled
        $this->assertEquals('--------------------------:2:------------', $reflectionMethod->invokeArgs($cache, [\str_repeat('-', 12)]));
        $this->assertLessThanOrEqual(50, \strlen($reflectionMethod->invokeArgs($cache, [\str_repeat('-', 12)])));
        $this->assertLessThanOrEqual(50, \strlen($reflectionMethod->invokeArgs($cache, [\str_repeat('-', 23)])));
        $this->assertLessThanOrEqual(50, \strlen($reflectionMethod->invokeArgs($cache, [\str_repeat('-', 40)])));
    }
    public function testTooLongNamespace()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\Cache\\Exception\\InvalidArgumentException');
        $this->expectExceptionMessage('Namespace must be 26 chars max, 40 given ("----------------------------------------")');
        $this->getMockBuilder(\_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter\MaxIdLengthAdapter::class)->setConstructorArgs([\str_repeat('-', 40)])->getMock();
    }
}
abstract class MaxIdLengthAdapter extends \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\AbstractAdapter
{
    protected $maxIdLength = 50;
    public function __construct($ns)
    {
        parent::__construct($ns);
    }
}
