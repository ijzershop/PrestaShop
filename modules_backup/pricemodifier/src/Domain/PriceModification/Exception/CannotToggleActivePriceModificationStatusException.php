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

namespace Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception;

class CannotToggleActivePriceModificationStatusException extends PriceModificationException
{
    /**
     * When fails to toggle single list grid
     */
    public const FAILED_TOGGLE = 10;

    /**
     * When fails to toggle list grid on bulk action
     */
    public const FAILED_BULK_TOGGLE = 20;
}
