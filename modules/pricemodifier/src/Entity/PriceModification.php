<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

namespace Modernesmid\Module\Pricemodifier\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository")
 * @ORM\HasLifecycleCallbacks
 */
class PriceModification
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name_supplier", type="string", length=128, nullable=false)
     */
    private $name_supplier;

    /**
     * @var string
     *
     * @ORM\Column(name="id_store_product", type="string", length=128, nullable=false)
     */
    private $id_store_product;

    /**
     * @var int
     *
     * @ORM\Column(name="file_supplier", type="integer", nullable=false)
     */
    private $file_supplier;

    /**
     * @var bool
     *
     * @ORM\Column(name="active", type="boolean")
     */
    private $active;

    public function __construct()
    {
        $this->setActive(true);
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getNameSupplier(): string
    {
        return $this->name_supplier;
    }

    /**
     * @param string $name_supplier
     *
     * @return PriceModification
     */
    public function setNameSupplier(string $name_supplier): PriceModification
    {
        $this->name_supplier = $name_supplier;

        return $this;
    }

    /**
     * @return string
     */
    public function getIdStoreProduct(): string
    {
        return $this->id_store_product;
    }

    /**
     * @param string $id_store_product
     *
     * @return PriceModification
     */
    public function setIdStoreProduct(string $id_store_product): PriceModification
    {
        $this->id_store_product = $id_store_product;

        return $this;
    }

    /**
     * @return int
     */
    public function getFileSupplier(): int
    {
        return $this->file_supplier;
    }

    /**
     * @param int $file_supplier
     *
     * @return PriceModification
     */
    public function setFileSupplier(int $file_supplier): PriceModification
    {
        $this->file_supplier = $file_supplier;

        return $this;
    }

    /**
     * Is active.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->active;
    }

    /**
     * Set active.
     *
     * @param bool $active
     *
     * @return PriceModification
     */
    public function setActive(bool $active): PriceModification
    {
        $this->active = $active;

        return $this;
    }

       /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'name_supplier' => $this->getNameSupplier(),
            'id_store_product' => $this->getIdStoreProduct(),
            'file_supplier' => $this->getFileSupplier(),
            'active' => $this->isActive(),
        ];
    }
}
