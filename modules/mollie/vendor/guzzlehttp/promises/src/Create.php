<?php

namespace MolliePrefix\GuzzleHttp\Promise;

final class Create
{
    /**
     * Creates a promise for a value if the value is not a promise.
     *
     * @param mixed $value Promise or value.
     *
     * @return PromiseInterface
     */
    public static function promiseFor($value)
    {
        if ($value instanceof \MolliePrefix\GuzzleHttp\Promise\PromiseInterface) {
            return $value;
        }
        // Return a Guzzle promise that shadows the given promise.
        if (\is_object($value) && \method_exists($value, 'then')) {
            $wfn = \method_exists($value, 'wait') ? [$value, 'wait'] : null;
            $cfn = \method_exists($value, 'cancel') ? [$value, 'cancel'] : null;
            $promise = new \MolliePrefix\GuzzleHttp\Promise\Promise($wfn, $cfn);
            $value->then([$promise, 'resolve'], [$promise, 'reject']);
            return $promise;
        }
        return new \MolliePrefix\GuzzleHttp\Promise\FulfilledPromise($value);
    }
    /**
     * Creates a rejected promise for a reason if the reason is not a promise.
     * If the provided reason is a promise, then it is returned as-is.
     *
     * @param mixed $reason Promise or reason.
     *
     * @return PromiseInterface
     */
    public static function rejectionFor($reason)
    {
        if ($reason instanceof \MolliePrefix\GuzzleHttp\Promise\PromiseInterface) {
            return $reason;
        }
        return new \MolliePrefix\GuzzleHttp\Promise\RejectedPromise($reason);
    }
    /**
     * Create an exception for a rejected promise value.
     *
     * @param mixed $reason
     *
     * @return \Exception|\Throwable
     */
    public static function exceptionFor($reason)
    {
        if ($reason instanceof \Exception || $reason instanceof \Throwable) {
            return $reason;
        }
        return new \MolliePrefix\GuzzleHttp\Promise\RejectionException($reason);
    }
    /**
     * Returns an iterator for the given value.
     *
     * @param mixed $value
     *
     * @return \Iterator
     */
    public static function iterFor($value)
    {
        if ($value instanceof \Iterator) {
            return $value;
        }
        if (\is_array($value)) {
            return new \ArrayIterator($value);
        }
        return new \ArrayIterator([$value]);
    }
}
