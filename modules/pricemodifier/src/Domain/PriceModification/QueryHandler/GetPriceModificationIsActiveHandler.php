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

namespace Modernesmid\Module\Pricemodifier\Domain\PriceModification\QueryHandler;

use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\PriceModificationNotFoundException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Query\GetPriceModificationIsActive;
use Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository;

class GetPriceModificationIsActiveHandler extends AbstractPriceModificationHandler
{
    /**
     * @var PriceModificationRepository
     */
    private $price_modificationRepository;

    public function __construct(PriceModificationRepository $price_modificationRepository)
    {
        $this->price_modificationRepository = $price_modificationRepository;
    }

    public function handle(GetPriceModificationIsActive $query)
    {
        $price_modificationId = $query->getPriceModificationId()->getValue();
        $price_modification = $this->price_modificationRepository->find($price_modificationId);

        if ($price_modification->getId() !== $price_modificationId) {
            throw new PriceModificationNotFoundException(sprintf('PriceModification with id "%d" was not found.', $price_modificationId));
        }

        return (bool) $price_modification->isActive();
    }
}
