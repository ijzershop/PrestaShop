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

namespace Modernesmid\Module\Pricemodifier\Domain\PriceModification\Command;

use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\InvalidPriceModificationIdException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\ValueObject\PriceModificationId;

class ToggleIsActivePriceModificationCommand
{
    /**
     * @var PriceModificationId
     */
    private $price_modificationId;

    /**
     * @var bool
     */
    private $active;

    /**
     * ToggleIsActivePriceModificationCommand constructor.
     *
     * @param int $price_modificationId
     * @param bool $active
     *
     * @throws InvalidPriceModificationIdException
     */
    public function __construct(int $price_modificationId, bool $active)
    {
        $this->price_modificationId = new PriceModificationId($price_modificationId);
        $this->active = $active;
    }

    /**
     * @return PriceModificationId
     */
    public function getPriceModificationId(): PriceModificationId
    {
        return $this->price_modificationId;
    }

    /**
     * @return bool
     */
    public function getActive(): bool
    {
        return $this->active;
    }
}
