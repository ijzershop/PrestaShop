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

namespace Modernesmid\Module\Pricemodifier\Domain\PriceModification\Query;

use Modernesmid\Module\Pricemodifier\Domain\PriceModification\ValueObject\PriceModificationId;

/**
 * Get current status (enabled/disabled) for a given price_modification
 */
class GetPriceModificationIsActive
{
    /**
     * @var PriceModificationId
     */
    private $price_modificationId;

    /**
     * @param int $price_modificationId
     *
     * @throws \Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\InvalidPriceModificationIdException
     */
    public function __construct(int $price_modificationId)
    {
        $this->price_modificationId = new PriceModificationId($price_modificationId);
    }

    /**
     * @return PriceModificationId
     */
    public function getPriceModificationId(): PriceModificationId
    {
        return $this->price_modificationId;
    }
}
