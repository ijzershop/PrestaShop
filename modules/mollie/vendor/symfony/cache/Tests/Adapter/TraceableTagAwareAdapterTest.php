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

use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\FilesystemAdapter;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\TagAwareAdapter;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\TraceableTagAwareAdapter;
/**
 * @group time-sensitive
 */
class TraceableTagAwareAdapterTest extends \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Tests\Adapter\TraceableAdapterTest
{
    public function testInvalidateTags()
    {
        $pool = new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\TraceableTagAwareAdapter(new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\TagAwareAdapter(new \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\FilesystemAdapter()));
        $pool->invalidateTags(['foo']);
        $calls = $pool->getCalls();
        $this->assertCount(1, $calls);
        $call = $calls[0];
        $this->assertSame('invalidateTags', $call->name);
        $this->assertSame(0, $call->hits);
        $this->assertSame(0, $call->misses);
        $this->assertNotEmpty($call->start);
        $this->assertNotEmpty($call->end);
    }
}
