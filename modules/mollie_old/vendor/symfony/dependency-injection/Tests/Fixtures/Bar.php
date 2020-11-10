<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures;

class Bar implements \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\BarInterface
{
    public $quz;
    public function __construct($quz = null, \_PhpScoper5eddef0da618a\NonExistent $nonExistent = null, \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\BarInterface $decorated = null, array $foo = [])
    {
        $this->quz = $quz;
    }
    public static function create(\_PhpScoper5eddef0da618a\NonExistent $nonExistent = null, $factory = null)
    {
    }
}
