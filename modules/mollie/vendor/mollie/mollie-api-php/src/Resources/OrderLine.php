<?php

namespace MolliePrefix\Mollie\Api\Resources;

use MolliePrefix\Mollie\Api\MollieApiClient;
use MolliePrefix\Mollie\Api\Types\OrderLineStatus;
use MolliePrefix\Mollie\Api\Types\OrderLineType;
class OrderLine extends \MolliePrefix\Mollie\Api\Resources\BaseResource
{
    /**
     * Always 'orderline'
     *
     * @var string
     */
    public $resource;
    /**
     * Id of the order line.
     *
     * @var string
     */
    public $id;
    /**
     * The ID of the order this line belongs to.
     *
     * @example ord_kEn1PlbGa
     * @var string
     */
    public $orderId;
    /**
     * The type of product bought.
     *
     * @example physical
     * @var string
     */
    public $type;
    /**
     * A description of the order line.
     *
     * @example LEGO 4440 Forest Police Station
     * @var string
     */
    public $name;
    /**
     * The status of the order line.
     *
     * @var string
     */
    public $status;
    /**
     * Can this order line be canceled?
     *
     * @var bool
     */
    public $isCancelable;
    /**
     * The number of items in the order line.
     *
     * @var int
     */
    public $quantity;
    /**
     * The price of a single item in the order line.
     *
     * @var \stdClass
     */
    public $unitPrice;
    /**
     * Any discounts applied to the order line.
     *
     * @var \stdClass|null
     */
    public $discountAmount;
    /**
     * The total amount of the line, including VAT and discounts.
     *
     * @var \stdClass
     */
    public $totalAmount;
    /**
     * The VAT rate applied to the order line. It is defined as a string
     * and not as a float to ensure the correct number of decimals are
     * passed.
     *
     * @example "21.00"
     * @var string
     */
    public $vatRate;
    /**
     * The amount of value-added tax on the line.
     *
     * @var \stdClass
     */
    public $vatAmount;
    /**
     * The SKU, EAN, ISBN or UPC of the product sold.
     *
     * @var string|null
     */
    public $sku;
    /**
     * A link pointing to an image of the product sold.
     *
     * @var string|null
     */
    public $imageUrl;
    /**
     * A link pointing to the product page in your web shop of the product sold.
     *
     * @var string|null
     */
    public $productUrl;
    /**
     * During creation of the order you can set custom metadata on order lines that is stored with
     * the order, and given back whenever you retrieve that order line.
     *
     * @var \stdClass|mixed|null
     */
    public $metadata;
    /**
     * The order line's date and time of creation, in ISO 8601 format.
     *
     * @example 2018-08-02T09:29:56+00:00
     * @var string
     */
    public $createdAt;
    /**
     * @var \stdClass
     */
    public $_links;
    /**
     * Is this order line created?
     *
     * @return bool
     */
    public function isCreated()
    {
        return $this->status === \MolliePrefix\Mollie\Api\Types\OrderLineStatus::STATUS_CREATED;
    }
    /**
     * Is this order line paid for?
     *
     * @return bool
     */
    public function isPaid()
    {
        return $this->status === \MolliePrefix\Mollie\Api\Types\OrderLineStatus::STATUS_PAID;
    }
    /**
     * Is this order line authorized?
     *
     * @return bool
     */
    public function isAuthorized()
    {
        return $this->status === \MolliePrefix\Mollie\Api\Types\OrderLineStatus::STATUS_AUTHORIZED;
    }
    /**
     * Is this order line canceled?
     *
     * @return bool
     */
    public function isCanceled()
    {
        return $this->status === \MolliePrefix\Mollie\Api\Types\OrderLineStatus::STATUS_CANCELED;
    }
    /**
     * (Deprecated) Is this order line refunded?
     * @deprecated 2018-11-27
     *
     * @return bool
     */
    public function isRefunded()
    {
        return $this->status === \MolliePrefix\Mollie\Api\Types\OrderLineStatus::STATUS_REFUNDED;
    }
    /**
     * Is this order line shipping?
     *
     * @return bool
     */
    public function isShipping()
    {
        return $this->status === \MolliePrefix\Mollie\Api\Types\OrderLineStatus::STATUS_SHIPPING;
    }
    /**
     * Is this order line completed?
     *
     * @return bool
     */
    public function isCompleted()
    {
        return $this->status === \MolliePrefix\Mollie\Api\Types\OrderLineStatus::STATUS_COMPLETED;
    }
    /**
     * Is this order line for a physical product?
     *
     * @return bool
     */
    public function isPhysical()
    {
        return $this->type === \MolliePrefix\Mollie\Api\Types\OrderLineType::TYPE_PHYSICAL;
    }
    /**
     * Is this order line for applying a discount?
     *
     * @return bool
     */
    public function isDiscount()
    {
        return $this->type === \MolliePrefix\Mollie\Api\Types\OrderLineType::TYPE_DISCOUNT;
    }
    /**
     * Is this order line for a digital product?
     *
     * @return bool
     */
    public function isDigital()
    {
        return $this->type === \MolliePrefix\Mollie\Api\Types\OrderLineType::TYPE_DIGITAL;
    }
    /**
     * Is this order line for applying a shipping fee?
     *
     * @return bool
     */
    public function isShippingFee()
    {
        return $this->type === \MolliePrefix\Mollie\Api\Types\OrderLineType::TYPE_SHIPPING_FEE;
    }
    /**
     * Is this order line for store credit?
     *
     * @return bool
     */
    public function isStoreCredit()
    {
        return $this->type === \MolliePrefix\Mollie\Api\Types\OrderLineType::TYPE_STORE_CREDIT;
    }
    /**
     * Is this order line for a gift card?
     *
     * @return bool
     */
    public function isGiftCard()
    {
        return $this->type === \MolliePrefix\Mollie\Api\Types\OrderLineType::TYPE_GIFT_CARD;
    }
    /**
     * Is this order line for a surcharge?
     *
     * @return bool
     */
    public function isSurcharge()
    {
        return $this->type === \MolliePrefix\Mollie\Api\Types\OrderLineType::TYPE_SURCHARGE;
    }
    public function update()
    {
        $body = \json_encode(array("name" => $this->name, 'imageUrl' => $this->imageUrl, 'productUrl' => $this->productUrl, 'metadata' => $this->metadata, 'quantity' => $this->quantity, 'unitPrice' => $this->unitPrice, 'discountAmount' => $this->discountAmount, 'totalAmount' => $this->totalAmount, 'vatAmount' => $this->vatAmount, 'vatRate' => $this->vatRate));
        $url = "orders/{$this->orderId}/lines/{$this->id}";
        $result = $this->client->performHttpCall(\MolliePrefix\Mollie\Api\MollieApiClient::HTTP_PATCH, $url, $body);
        return \MolliePrefix\Mollie\Api\Resources\ResourceFactory::createFromApiResult($result, new \MolliePrefix\Mollie\Api\Resources\Order($this->client));
    }
}
