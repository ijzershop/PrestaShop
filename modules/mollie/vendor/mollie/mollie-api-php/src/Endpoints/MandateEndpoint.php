<?php

namespace MolliePrefix\Mollie\Api\Endpoints;

use MolliePrefix\Mollie\Api\Resources\BaseCollection;
use MolliePrefix\Mollie\Api\Resources\Customer;
use MolliePrefix\Mollie\Api\Resources\Mandate;
use MolliePrefix\Mollie\Api\Resources\MandateCollection;
class MandateEndpoint extends \MolliePrefix\Mollie\Api\Endpoints\CollectionEndpointAbstract
{
    protected $resourcePath = "customers_mandates";
    /**
     * Get the object that is used by this API endpoint. Every API endpoint uses one type of object.
     *
     * @return Mandate
     */
    protected function getResourceObject()
    {
        return new \MolliePrefix\Mollie\Api\Resources\Mandate($this->client);
    }
    /**
     * Get the collection object that is used by this API endpoint. Every API endpoint uses one type of collection object.
     *
     * @param int $count
     * @param \stdClass $_links
     *
     * @return MandateCollection
     */
    protected function getResourceCollectionObject($count, $_links)
    {
        return new \MolliePrefix\Mollie\Api\Resources\MandateCollection($this->client, $count, $_links);
    }
    /**
     * @param Customer $customer
     * @param array $options
     * @param array $filters
     *
     * @return \Mollie\Api\Resources\Mandate
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function createFor(\MolliePrefix\Mollie\Api\Resources\Customer $customer, array $options = [], array $filters = [])
    {
        return $this->createForId($customer->id, $options, $filters);
    }
    /**
     * @param string $customerId
     * @param array $options
     * @param array $filters
     *
     * @return \Mollie\Api\Resources\BaseResource|\Mollie\Api\Resources\Mandate
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function createForId($customerId, array $options = [], array $filters = [])
    {
        $this->parentId = $customerId;
        return parent::rest_create($options, $filters);
    }
    /**
     * @param Customer $customer
     * @param string $mandateId
     * @param array $parameters
     *
     * @return \Mollie\Api\Resources\BaseResource|\Mollie\Api\Resources\Mandate
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function getFor(\MolliePrefix\Mollie\Api\Resources\Customer $customer, $mandateId, array $parameters = [])
    {
        return $this->getForId($customer->id, $mandateId, $parameters);
    }
    /**
     * @param string $customerId
     * @param string $mandateId
     * @param array $parameters
     * 
     * @return \Mollie\Api\Resources\BaseResource
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function getForId($customerId, $mandateId, array $parameters = [])
    {
        $this->parentId = $customerId;
        return parent::rest_read($mandateId, $parameters);
    }
    /**
     * @param Customer $customer
     * @param string $from The first resource ID you want to include in your list.
     * @param int $limit
     * @param array $parameters
     *
     * @return \Mollie\Api\Resources\BaseCollection|\Mollie\Api\Resources\MandateCollection
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function listFor(\MolliePrefix\Mollie\Api\Resources\Customer $customer, $from = null, $limit = null, array $parameters = [])
    {
        return $this->listForId($customer->id, $from, $limit, $parameters);
    }
    /**
     * @param string $customerId
     * @param null $from
     * @param null $limit
     * @param array $parameters
     *
     * @return \Mollie\Api\Resources\BaseCollection|\Mollie\Api\Resources\MandateCollection
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function listForId($customerId, $from = null, $limit = null, array $parameters = [])
    {
        $this->parentId = $customerId;
        return parent::rest_list($from, $limit, $parameters);
    }
    /**
     * @param Customer $customer
     * @param string $mandateId
     * @param array $data
     *
     * @return null
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function revokeFor(\MolliePrefix\Mollie\Api\Resources\Customer $customer, $mandateId, $data = [])
    {
        return $this->revokeForId($customer->id, $mandateId, $data);
    }
    /**
     * @param string $customerId
     * @param string $mandateId
     * @param array $data
     *
     * @return null
     * @throws \Mollie\Api\Exceptions\ApiException
     */
    public function revokeForId($customerId, $mandateId, $data = [])
    {
        $this->parentId = $customerId;
        return parent::rest_delete($mandateId, $data);
    }
}
