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

namespace Modernesmid\Module\Pricemodifier\Domain\PriceModification\ValueObject;

use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\InvalidPriceModificationIdException;

class PriceModificationId
{
    private $price_modificationId;

    /**
     * PriceModificationId constructor.
     *
     * @param int $price_modificationId
     *
     * @throws InvalidPriceModificationIdException
     */
    public function __construct($price_modificationId)
    {
        $this->assertIntegerIsGreaterThanZero($price_modificationId);

        $this->price_modificationId = $price_modificationId;
    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->price_modificationId;
    }

    /**
     * @param int $price_modificationId
     *
     * @throws InvalidPriceModificationIdException
     */
    private function assertIntegerIsGreaterThanZero($price_modificationId)
    {
        if (!is_numeric($price_modificationId) || 0 > $price_modificationId) {
            throw new InvalidPriceModificationIdException(sprintf('Invalid price_modification id %s supplied. PriceModification id must be positive integer.', var_export($price_modificationId, true)));
        }
    }
}
