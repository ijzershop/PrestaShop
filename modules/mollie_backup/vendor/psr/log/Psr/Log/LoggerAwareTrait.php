<?php

namespace MolliePrefix\Psr\Log;

/**
 * Basic Implementation of LoggerAwareInterface.
 */
trait LoggerAwareTrait
{
    /**
     * The logger instance.
     *
     * @var LoggerInterface
     */
    protected $logger;
    /**
     * Sets a logger.
     *
     * @param LoggerInterface $logger
     */
    public function setLogger(\MolliePrefix\Psr\Log\LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
}
