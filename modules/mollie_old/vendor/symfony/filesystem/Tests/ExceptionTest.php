<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Tests;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\FileNotFoundException;
use _PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\IOException;
/**
 * Test class for Filesystem.
 */
class ExceptionTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testGetPath()
    {
        $e = new \_PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\IOException('', 0, null, '/foo');
        $this->assertEquals('/foo', $e->getPath(), 'The pass should be returned.');
    }
    public function testGeneratedMessage()
    {
        $e = new \_PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\FileNotFoundException(null, 0, null, '/foo');
        $this->assertEquals('/foo', $e->getPath());
        $this->assertEquals('File "/foo" could not be found.', $e->getMessage(), 'A message should be generated.');
    }
    public function testGeneratedMessageWithoutPath()
    {
        $e = new \_PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\FileNotFoundException();
        $this->assertEquals('File could not be found.', $e->getMessage(), 'A message should be generated.');
    }
    public function testCustomMessage()
    {
        $e = new \_PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\FileNotFoundException('bar', 0, null, '/foo');
        $this->assertEquals('bar', $e->getMessage(), 'A custom message should be possible still.');
    }
}
