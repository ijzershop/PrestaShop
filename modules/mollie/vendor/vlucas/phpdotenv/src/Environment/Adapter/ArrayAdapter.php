<?php

namespace MolliePrefix\Dotenv\Environment\Adapter;

use MolliePrefix\PhpOption\None;
use MolliePrefix\PhpOption\Some;
class ArrayAdapter implements \MolliePrefix\Dotenv\Environment\Adapter\AdapterInterface
{
    /**
     * The variables and their values.
     *
     * @return array<string|null>
     */
    private $variables = [];
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
        if (\array_key_exists($name, $this->variables)) {
            return \MolliePrefix\PhpOption\Some::create($this->variables[$name]);
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
        $this->variables[$name] = $value;
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
        unset($this->variables[$name]);
    }
}
