<?php

namespace MolliePrefix\Dotenv\Environment\Adapter;

use MolliePrefix\PhpOption\Option;
class PutenvAdapter implements \MolliePrefix\Dotenv\Environment\Adapter\AdapterInterface
{
    /**
     * Determines if the adapter is supported.
     *
     * @return bool
     */
    public function isSupported()
    {
        return \function_exists('putenv');
    }
    /**
     * Get an environment variable, if it exists.
     *
     * @param string $name
     *
     * @return \PhpOption\Option
     */
    public function get($name)
    {
        return \MolliePrefix\PhpOption\Option::fromValue(\getenv($name), \false);
    }
    /**
     * Set an environment variable.
     *
     * @param string      $name
     * @param string|null $value
     *
     * @return void
     */
    public function set($name, $value = null)
    {
        \putenv("{$name}={$value}");
    }
    /**
     * Clear an environment variable.
     *
     * @param string $name
     *
     * @return void
     */
    public function clear($name)
    {
        \putenv($name);
    }
}
