<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception;

/**
 * IOException interface for file and input/output stream related exceptions thrown by the component.
 *
 * @author Christian Gärtner <christiangaertner.film@googlemail.com>
 */
interface IOExceptionInterface extends \_PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\ExceptionInterface
{
    /**
     * Returns the associated path for the exception.
     *
     * @return string|null The path
     */
    public function getPath();
}
