<?php

namespace MolliePrefix\Mollie\Api\Resources;

use MolliePrefix\Mollie\Api\MollieApiClient;
class ResourceFactory
{
    /**
     * Create resource object from Api result
     *
     * @param object $apiResult
     * @param BaseResource $resource
     *
     * @return BaseResource
     */
    public static function createFromApiResult($apiResult, \MolliePrefix\Mollie\Api\Resources\BaseResource $resource)
    {
        foreach ($apiResult as $property => $value) {
            $resource->{$property} = $value;
        }
        return $resource;
    }
    /**
     * @param MollieApiClient $client
     * @param string $resourceClass
     * @param array $data
     * @param null $_links
     * @param null $resourceCollectionClass
     * @return mixed
     */
    public static function createBaseResourceCollection(\MolliePrefix\Mollie\Api\MollieApiClient $client, $resourceClass, $data, $_links = null, $resourceCollectionClass = null)
    {
        $resourceCollectionClass = $resourceCollectionClass ?: $resourceClass . 'Collection';
        $data = $data ?: [];
        $result = new $resourceCollectionClass(\count($data), $_links);
        foreach ($data as $item) {
            $result[] = static::createFromApiResult($item, new $resourceClass($client));
        }
        return $result;
    }
    /**
     * @param MollieApiClient $client
     * @param array $input
     * @param string $resourceClass
     * @param null $_links
     * @param null $resourceCollectionClass
     * @return mixed
     */
    public static function createCursorResourceCollection($client, array $input, $resourceClass, $_links = null, $resourceCollectionClass = null)
    {
        if (null === $resourceCollectionClass) {
            $resourceCollectionClass = $resourceClass . 'Collection';
        }
        $data = new $resourceCollectionClass($client, \count($input), $_links);
        foreach ($input as $item) {
            $data[] = static::createFromApiResult($item, new $resourceClass($client));
        }
        return $data;
    }
}
