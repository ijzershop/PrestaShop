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
use Doctrine\DBAL\Types\ArrayType;
use Doctrine\DBAL\Types\DateTimeType;
use Doctrine\DBAL\Types\JsonType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository")
 * @ORM\HasLifecycleCallbacks
 * @UniqueEntity("name_supplier")
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
     * @ORM\Column(name="name_supplier", type="string", length=128, nullable=false, unique=true)
     */
    private $name_supplier;

    /**
     * @var string
     *
     * @ORM\Column(name="id_store_product", type="string", length=128, nullable=false)
     */
    private $id_store_product;

    /**
     * @var string
     *
     * @ORM\Column(name="file_supplier", type="string", nullable=false)
     */
    private $file_supplier;

    /**
     * @var jsonType
     *
     * @ORM\Column(name="supplier_data", type="json", nullable=true)
     */
    private $supplier_data;

    /**
     * @var string
     *
     * @ORM\Column(name="selected_supplier_price", type="string", nullable=false)
     */
    private $selected_supplier_price;

    /**
     * @var string
     *
     * @ORM\Column(name="formula", type="string", nullable=false)
     */
    private $formula;

    /**
     * @var string
     *
     * @ORM\Column(name="increment_formula", type="string", nullable=false)
     */
    private $increment_formula;


    /**
     * @var bool
     *
     * @ORM\Column(name="active", type="boolean")
     */
    private $active;

    /**
     * @var string
     *
     * @ORM\Column(name="old_supplier_price", type="string", nullable=false)
     */
    private $old_supplier_price;

    /**
     * @var string
     *
     * @ORM\Column(name="old_store_price", type="string", nullable=false)
     */
    private $old_store_price;

    /**
     * @var datetime
     *
     * @ORM\Column(name="old_price_update", type="datetime", nullable=true)
     */
    private $old_price_update;


    /**
     * @var datetime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updated_at;


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
     * @return PriceModification
     */
    public function setId($id): PriceModification
    {
        $this->id = $id;

        return $this;
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
     * @return int
     */
    public function getIdStoreProduct(): int
    {
        return $this->id_store_product;
    }

    /**
     * @param int $id_store_product
     *
     * @return PriceModification
     */
    public function setIdStoreProduct(int $id_store_product): PriceModification
    {
        $this->id_store_product = $id_store_product;

        return $this;
    }

    /**
     * @return string
     */
    public function getFileSupplier(): string
    {
        return $this->file_supplier;
    }

    /**
     * @param string $file_supplier
     *
     * @return PriceModification
     */
    public function setFileSupplier(string $file_supplier): PriceModification
    {
        $this->file_supplier = $file_supplier;

        return $this;
    }

    /**
     * @return string
     */
    public function getSelectedSupplierPrice(): string
    {
        return $this->selected_supplier_price;
    }

    /**
     * @param string $selected_supplier_price
     *
     * @return PriceModification
     */
    public function setSelectedSupplierPrice(string $selected_supplier_price): PriceModification
    {
        $this->selected_supplier_price = $selected_supplier_price;

        return $this;
    }

    /**
     * @return string
     */
    public function getFormula(): string
    {
        return $this->formula;
    }

    /**
     * @param string $formula
     *
     * @return PriceModification
     */
    public function setFormula(string $formula): PriceModification
    {
        $this->formula = $formula;

        return $this;
    }


    /**
     * @return string
     */
    public function getIncrementFormula(): string
    {
        return $this->increment_formula;
    }

    /**
     * @param string $increment_formula
     *
     * @return PriceModification
     */
    public function setIncrementFormula(string $increment_formula): PriceModification
    {
        $this->increment_formula = $increment_formula;

        return $this;
    }

    /**
     * @return string
     */
    public function getOldSupplierPrice(): string
    {
        return $this->old_supplier_price;
    }

    /**
     * @param string $old_supplier_price
     *
     * @return PriceModification
     */
    public function setOldSupplierPrice(string $old_supplier_price): PriceModification
    {
        $this->old_supplier_price = $old_supplier_price;

        return $this;
    }

    /**
     * @return string
     */
    public function getOldStorePrice(): string
    {
        return $this->old_store_price;
    }

    /**
     * @param string $old_store_price
     *
     * @return PriceModification
     */
    public function setOldStorePrice(string $old_store_price): PriceModification
    {
        $priceList = [];
        $array = ['date' => date('Y-m-d H:i:s'), 'price' => $old_store_price];
        if(!is_null($this->old_store_price)) {
            $priceList = json_decode($this->old_store_price);

            if (json_last_error() === 0 && is_array($priceList)) {
                array_unshift($priceList,  $array);
            } elseif(floatval($priceList) > 0){
                    $array2 = ['date' => date('Y-m-d H:i:s'), 'price' => $priceList];
                    $priceList = [];
                    array_unshift($priceList, $array2);
                    array_unshift($priceList, $array);
            } else {
                    $priceList = [];
            }
        } else {
            array_unshift($priceList, $array);
        }

        if(count($priceList) > 10){
            array_pop($priceList);
        }
        $this->old_store_price = json_encode($priceList);

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getOldPriceUpdate(): DateTime
    {
        return $this->old_price_update;
    }

    /**
     * @param DateTimeType $old_price_update
     *
     * @return PriceModification
     */
    public function setOldPriceUpdate(DateTime $old_price_update): PriceModification
    {
        $this->old_price_update = $old_price_update;

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
    public function getSupplierData(): array
    {
        return (array)json_decode($this->supplier_data);
    }

    /**
     * @param string $supplier_data
     *
     * @return PriceModification
     */
    public function setSupplierData(string $supplier_data): PriceModification
    {
        $this->supplier_data = $supplier_data;

        return $this;
    }


    /**
     * @return array
     */
    public function getUpdatedAt(): array
    {
        return $this->updated_at;
    }

    /**
     * @return PriceModification
     */
    public function setUpdatedAt(): PriceModification
    {
        $dateTime = new DateTime('NOW');

        $this->updated_at = $dateTime;
        return $this;
    }
}
