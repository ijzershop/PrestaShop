<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\Yaml\Tag;

/**
 * @author Nicolas Grekas <p@tchwork.com>
 * @author Guilhem N. <egetick@gmail.com>
 */
final class TaggedValue
{
    private $tag;
    private $value;
    /**
     * @param string $tag
     * @param mixed  $value
     */
    public function __construct($tag, $value)
    {
        $this->tag = $tag;
        $this->value = $value;
    }
    /**
     * @return string
     */
    public function getTag()
    {
        return $this->tag;
    }
    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }
}
