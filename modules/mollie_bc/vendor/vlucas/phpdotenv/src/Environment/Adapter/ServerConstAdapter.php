<?php

namespace MolliePrefix\Dotenv\Environment\Adapter;

use MolliePrefix\PhpOption\None;
use MolliePrefix\PhpOption\Some;
class ServerConstAdapter implements \MolliePrefix\Dotenv\Environment\Adapter\AdapterInterface
{
    /**
     * Determines if the adapter is supported.
     *
     * @return bool
     */
    public function isSupported()
    {
        return \true;
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
        if (\array_key_exists($name, $_SERVER)) {
            return \MolliePrefix\PhpOption\Some::create($_SERVER[$name]);
        }
        return \MolliePrefix\PhpOption\None::create();
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
        $_SERVER[$name] = $value;
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
        unset($_SERVER[$name]);
    }
}
