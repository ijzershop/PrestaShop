<?php

namespace MolliePrefix\Mollie\Api\Endpoints;

use MolliePrefix\Mollie\Api\Exceptions\ApiException;
use MolliePrefix\Mollie\Api\Resources\Invoice;
use MolliePrefix\Mollie\Api\Resources\InvoiceCollection;
class InvoiceEndpoint extends \MolliePrefix\Mollie\Api\Endpoints\CollectionEndpointAbstract
{
    protected $resourcePath = "invoices";
    /**
     * Get the object that is used by this API. Every API uses one type of object.
     *
     * @return \Mollie\Api\Resources\BaseResource
     */
    protected function getResourceObject()
    {
        return new \MolliePrefix\Mollie\Api\Resources\Invoice($this->client);
    }
    /**
     * Get the collection object that is used by this API. Every API uses one type of collection object.
     *
     * @param int $count
     * @param \stdClass $_links
     *
     * @return \Mollie\Api\Resources\BaseCollection
     */
    protected function getResourceCollectionObject($count, $_links)
    {
        return new \MolliePrefix\Mollie\Api\Resources\InvoiceCollection($this->client, $count, $_links);
    }
    /**
     * Retrieve an Invoice from Mollie.
     *
     * Will throw a ApiException if the invoice id is invalid or the resource cannot be found.
     *
     * @param string $invoiceId
     * @param array $parameters
     *
     * @return Invoice
     * @throws ApiException
     */
    public function get($invoiceId, array $parameters = [])
    {
        return $this->rest_read($invoiceId, $parameters);
    }
    /**
     * Retrieves a collection of Invoices from Mollie.
     *
     * @param string $from The first invoice ID you want to include in your list.
     * @param int $limit
     * @param array $parameters
     *
     * @return InvoiceCollection
     * @throws ApiException
     */
    public function page($from = null, $limit = null, array $parameters = [])
    {
        return $this->rest_list($from, $limit, $parameters);
    }
    /**
     * This is a wrapper method for page
     *
     * @param array|null $parameters
     *
     * @return \Mollie\Api\Resources\BaseCollection
     */
    public function all(array $parameters = [])
    {
        return $this->page(null, null, $parameters);
    }
}
