<?php
/**
 * 2007-2019 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Core\Domain\Order\QueryResult;

class OrderProductForViewing
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $location;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $reference;

    /**
     * @var string
     */
    private $supplierReference;

    /**
     * @var int
     */
    private $quantity;

    /**
     * @var string
     */
    private $unitPrice;

    /**
     * @var string
     */
    private $totalPrice;

    /**
     * @var int
     */
    private $availableQuantity;

    /**
     * @var string|null
     */
    private $imagePath;

    /**
     * @var float
     */
    private $unitPriceTaxExclRaw;

    /**
     * @var float
     */
    private $unitPriceTaxInclRaw;

    /**
     * @var float
     */
    private $taxRate;

    /**
     * @var int
     */
    private $orderDetailId;

    /**
     * @var string
     */
    private $amountRefund;

    /**
     * @var int
     */
    private $quantityRefunded;

    /**
     * @var string
     */
    private $amountRefundable;

    /**
     * @var int
     */
    private $orderInvoiceId;

    /**
     * @var string
     */
    private $orderInvoiceNumber;

    public function __construct(
        int $orderDetailId,
        int $id,
        string $name,
        string $reference,
        string $supplierReference,
        int $quantity,
        string $unitPrice,
        string $totalPrice,
        int $availableQuantity,
        ?string $imagePath,
        float $unitPriceTaxExclRaw,
        float $unitPriceTaxInclRaw,
        float $taxRate,
        string $amountRefund,
        int $quantityRefunded,
        string $amountRefundable,
        string $location,
        ?int $orderInvoiceId,
        string $orderInvoiceNumber
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->reference = $reference;
        $this->supplierReference = $supplierReference;
        $this->quantity = $quantity;
        $this->unitPrice = $unitPrice;
        $this->totalPrice = $totalPrice;
        $this->availableQuantity = $availableQuantity;
        $this->imagePath = $imagePath;
        $this->unitPriceTaxExclRaw = $unitPriceTaxExclRaw;
        $this->unitPriceTaxInclRaw = $unitPriceTaxInclRaw;
        $this->taxRate = $taxRate;
        $this->orderDetailId = $orderDetailId;
        $this->amountRefund = $amountRefund;
        $this->quantityRefunded = $quantityRefunded;
        $this->amountRefundable = $amountRefundable;
        $this->location = $location;
        $this->orderInvoiceId = $orderInvoiceId;
        $this->orderInvoiceNumber = $orderInvoiceNumber;
    }

    /**
     * @return int
     */
    public function getOrderDetailId(): int
    {
        return $this->orderDetailId;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getReference(): string
    {
        return $this->reference;
    }

    /**
     * @return string
     */
    public function getSupplierReference(): string
    {
        return $this->supplierReference;
    }

    /**
     * @return float
     */
    public function getTaxRate(): float
    {
        return $this->taxRate;
    }

    /**
     * @return string
     */
    public function getLocation(): string
    {
        return $this->location;
    }

    /**
     * @return int
     */
    public function getQuantity(): int
    {
        return $this->quantity;
    }

    /**
     * @return string
     */
    public function getUnitPrice(): string
    {
        return $this->unitPrice;
    }

    /**
     * @return string
     */
    public function getTotalPrice(): string
    {
        return $this->totalPrice;
    }

    /**
     * @return int
     */
    public function getAvailableQuantity(): int
    {
        return $this->availableQuantity;
    }

    /**
     * @return string|null
     */
    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    /**
     * @return float
     */
    public function getUnitPriceTaxExclRaw(): float
    {
        return $this->unitPriceTaxExclRaw;
    }

    /**
     * @return float
     */
    public function getUnitPriceTaxInclRaw(): float
    {
        return $this->unitPriceTaxInclRaw;
    }

    /**
     * How much (money) has already been refunded for this product
     *
     * @return string
     */
    public function getAmountRefund(): string
    {
        return $this->amountRefund;
    }

    /**
     * How many (quantity) of this product has already been refunded
     *
     * @return int
     */
    public function getQuantityRefunded(): int
    {
        return $this->quantityRefunded;
    }

    /**
     * How much (money) can be refunded for this product
     *
     * @return string
     */
    public function getAmountRefundable(): string
    {
        return $this->amountRefundable;
    }

    /**
     * How many (quantity) of this product can be refunded
     *
     * @return int
     */
    public function getQuantityRefundable(): int
    {
        return $this->quantity - $this->quantityRefunded;
    }

    /**
     * Can this product be refunded
     *
     * @return bool
     */
    public function isRefundable(): bool
    {
        if ($this->quantity <= $this->quantityRefunded) {
            return false;
        }

        return true;
    }

    /**
     * Get the id of this product's invoice
     *
     * @return int
     */
    public function getOrderInvoiceId(): ?int
    {
        return $this->orderInvoiceId;
    }

    /**
     * Get the number (reference) of this product's invoice
     *
     * @return string
     */
    public function getOrderInvoiceNumber(): string
    {
        return $this->orderInvoiceNumber;
    }
}
