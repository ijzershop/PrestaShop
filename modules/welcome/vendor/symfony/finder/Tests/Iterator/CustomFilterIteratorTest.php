<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Finder\Tests\Iterator;

use Symfony\Component\Finder\Iterator\CustomFilterIterator;

class CustomFilterIteratorTest extends IteratorTestCase
{
    public function testWithInvalidFilter()
    {
        $this->expectException('InvalidArgumentException');
        new CustomFilterIterator(new Iterator(), ['foo']);
    }

    /**
     * @dataProvider getAcceptData
     */
    public function testAccept($filters, $expected)
    {
        $inner = new Iterator(['test.php', 'test.py', 'foo.php']);

        $iterator = new CustomFilterIterator($inner, $filters);

        $this->assertIterator($expected, $iterator);
    }

    public function getAcceptData()
    {
        return [
            [[function (\SplFileInfo $fileinfo) { return false; }], []],
            [[function (\SplFileInfo $fileinfo) { return 0 === strpos($fileinfo, 'test'); }], ['test.php', 'test.py']],
            [['is_dir'], []],
        ];
    }
}
