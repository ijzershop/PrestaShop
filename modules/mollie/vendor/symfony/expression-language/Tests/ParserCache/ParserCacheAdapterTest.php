<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Tests;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node;
use _PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParsedExpression;
use _PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter;
/**
 * @group legacy
 */
class ParserCacheAdapterTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testGetItem()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $key = 'key';
        $value = 'value';
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $poolMock->expects($this->once())->method('fetch')->with($key)->willReturn($value);
        $cacheItem = $parserCacheAdapter->getItem($key);
        $this->assertEquals($cacheItem->get(), $value);
        $this->assertEquals($cacheItem->isHit(), \true);
    }
    public function testSave()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $cacheItemMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Psr\\Cache\\CacheItemInterface')->getMock();
        $key = 'key';
        $value = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParsedExpression('1 + 1', new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node([], []));
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $poolMock->expects($this->once())->method('save')->with($key, $value);
        $cacheItemMock->expects($this->once())->method('getKey')->willReturn($key);
        $cacheItemMock->expects($this->once())->method('get')->willReturn($value);
        $parserCacheAdapter->save($cacheItemMock);
    }
    public function testGetItems()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $this->expectException(\BadMethodCallException::class);
        $parserCacheAdapter->getItems();
    }
    public function testHasItem()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $key = 'key';
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $this->expectException(\BadMethodCallException::class);
        $parserCacheAdapter->hasItem($key);
    }
    public function testClear()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $this->expectException(\BadMethodCallException::class);
        $parserCacheAdapter->clear();
    }
    public function testDeleteItem()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $key = 'key';
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $this->expectException(\BadMethodCallException::class);
        $parserCacheAdapter->deleteItem($key);
    }
    public function testDeleteItems()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $keys = ['key'];
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $this->expectException(\BadMethodCallException::class);
        $parserCacheAdapter->deleteItems($keys);
    }
    public function testSaveDeferred()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $cacheItemMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Psr\\Cache\\CacheItemInterface')->getMock();
        $this->expectException(\BadMethodCallException::class);
        $parserCacheAdapter->saveDeferred($cacheItemMock);
    }
    public function testCommit()
    {
        $poolMock = $this->getMockBuilder('_PhpScoper5eddef0da618a\\Symfony\\Component\\ExpressionLanguage\\ParserCache\\ParserCacheInterface')->getMock();
        $parserCacheAdapter = new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\ParserCache\ParserCacheAdapter($poolMock);
        $this->expectException(\BadMethodCallException::class);
        $parserCacheAdapter->commit();
    }
}
