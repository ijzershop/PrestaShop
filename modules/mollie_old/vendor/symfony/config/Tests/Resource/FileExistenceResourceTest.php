<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Resource;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\FileExistenceResource;
class FileExistenceResourceTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    protected $resource;
    protected $file;
    protected $time;
    protected function setUp()
    {
        $this->file = \realpath(\sys_get_temp_dir()) . '/tmp.xml';
        $this->time = \time();
        $this->resource = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\FileExistenceResource($this->file);
    }
    protected function tearDown()
    {
        if (\file_exists($this->file)) {
            \unlink($this->file);
        }
    }
    public function testToString()
    {
        $this->assertSame($this->file, (string) $this->resource);
    }
    public function testGetResource()
    {
        $this->assertSame($this->file, $this->resource->getResource(), '->getResource() returns the path to the resource');
    }
    public function testIsFreshWithExistingResource()
    {
        \touch($this->file, $this->time);
        $serialized = \serialize(new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\FileExistenceResource($this->file));
        $resource = \unserialize($serialized);
        $this->assertTrue($resource->isFresh($this->time), '->isFresh() returns true if the resource is still present');
        \unlink($this->file);
        $resource = \unserialize($serialized);
        $this->assertFalse($resource->isFresh($this->time), '->isFresh() returns false if the resource has been deleted');
    }
    public function testIsFreshWithAbsentResource()
    {
        $serialized = \serialize(new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\FileExistenceResource($this->file));
        $resource = \unserialize($serialized);
        $this->assertTrue($resource->isFresh($this->time), '->isFresh() returns true if the resource is still absent');
        \touch($this->file, $this->time);
        $resource = \unserialize($serialized);
        $this->assertFalse($resource->isFresh($this->time), '->isFresh() returns false if the resource has been created');
    }
}
