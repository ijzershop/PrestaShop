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

namespace Modernesmid\Module\Pricemodifier\Domain\PriceModification\CommandHandler;

use Doctrine\ORM\EntityManagerInterface;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Command\ToggleIsActivePriceModificationCommand;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\CannotToggleActivePriceModificationStatusException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\PriceModificationNotFoundException;
use Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository;

class ToggleIsActivePriceModificationHandler extends AbstractPriceModificationHandler
{
    /**
     * @var PriceModificationRepository
     */
    private $price_modificationRepository;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(PriceModificationRepository $price_modificationRepository, EntityManagerInterface $entityManager)
    {
        $this->price_modificationRepository = $price_modificationRepository;
        $this->entityManager = $entityManager;
    }

    public function handle(ToggleIsActivePriceModificationCommand $command)
    {
        $price_modificationId = $command->getPriceModificationId()->getValue();
        $price_modification = $this->price_modificationRepository->find($price_modificationId);

        if ($price_modification->getId() !== $price_modificationId) {
            throw new PriceModificationNotFoundException(sprintf('PriceModification with id "%id" was not found', $price_modificationId));
        }

        if ($price_modification->isActive() != $command->getActive()) {
            $price_modification->setActive($command->getActive());

            if (false === $this->entityManager->flush()) {
                throw new CannotToggleActivePriceModificationStatusException(sprintf('Failed to change status for price_modification with id "%s"', $command->getPriceModificationId()->getValue()));
            }
        }
    }
}
