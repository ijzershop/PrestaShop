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
 * Exception class thrown when a filesystem operation failure happens.
 *
 * @author Romain Neutron <imprec@gmail.com>
 * @author Christian Gärtner <christiangaertner.film@googlemail.com>
 * @author Fabien Potencier <fabien@symfony.com>
 */
class IOException extends \RuntimeException implements \_PhpScoper5eddef0da618a\Symfony\Component\Filesystem\Exception\IOExceptionInterface
{
    private $path;
    public function __construct($message, $code = 0, \Exception $previous = null, $path = null)
    {
        $this->path = $path;
        parent::__construct($message, $code, $previous);
    }
    /**
     * {@inheritdoc}
     */
    public function getPath()
    {
        return $this->path;
    }
}
