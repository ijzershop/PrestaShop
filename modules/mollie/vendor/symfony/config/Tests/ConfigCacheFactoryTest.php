<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Config\Tests;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\ConfigCacheFactory;
class ConfigCacheFactoryTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testCacheWithInvalidCallback()
    {
        $this->expectException('InvalidArgumentException');
        $this->expectExceptionMessage('Invalid type for callback argument. Expected callable, but got "object".');
        $cacheFactory = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\ConfigCacheFactory(\true);
        $cacheFactory->cache('file', new \stdClass());
    }
}
