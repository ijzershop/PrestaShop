<?php

namespace MolliePrefix;

/**
 * Storage for additional client context.
 *
 * @package raven
 */
class Raven_Context
{
    /**
     * @var array
     */
    public $tags;
    /**
     * @var array
     */
    public $extra;
    /**
     * @var array|null
     */
    public $user;
    public function __construct()
    {
        $this->clear();
    }
    /**
     * Clean up existing context.
     */
    public function clear()
    {
        $this->tags = array();
        $this->extra = array();
        $this->user = null;
    }
}
/**
 * Storage for additional client context.
 *
 * @package raven
 */
\class_alias('MolliePrefix\\Raven_Context', 'Raven_Context', \false);
