<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker <jelmer@ijzershop.nl>
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

namespace MsThemeConfig\Core\Form;

use Doctrine\ORM\EntityManagerInterface;
use MsThemeConfig\Class\Offer;
use MsThemeConfig\Core\Repository\OfferIntegrationRepository;
use MsThemeConfig\Entity\OfferIntegration;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\DataHandler\FormDataHandlerInterface;

/**
 *
 */
class OfferIntegrationFormDataHandler implements FormDataHandlerInterface
{
    /**
     * @var OfferIntegrationRepository
     */
    private OfferIntegrationRepository $offerIntegrationRepository;

    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;

    /**
     * @param OfferIntegrationRepository $offerIntegrationRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
        OfferIntegrationRepository $offerIntegrationRepository,
        EntityManagerInterface $entityManager
    ) {
        $this->offerIntegrationRepository = $offerIntegrationRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data)
    {
        $existingOffer = Offer::getOfferForCode($data['code']);
        if(isset($existingOffer->id_oi_offer)){
            $offerIntegration = new OfferIntegration($existingOffer->id_oi_offer);
        } else {
            $offerIntegration = new OfferIntegration();
        }

        $offerIntegration->setCode($data['code']);
        $offerIntegration->setName($data['name']);
        $offerIntegration->setEmail($data['email']);
        $offerIntegration->setPhone($data['phone']);
        $offerIntegration->setMessage($data['message']);
        $offerIntegration->setDateExp($data['date_exp']);
        $offerIntegration->setUpdatedAt(date_create());
        $this->entityManager->persist($offerIntegration);
        $this->entityManager->flush();

        return $offerIntegration->getId();
    }

    /**
     * {@inheritdoc}
     */
    public function update($id, array $data): int
    {

        $offerIntegration = $this->offerIntegrationRepository->findOneById($id);
        $offerIntegration->setCode($data['code']);
        $offerIntegration->setName($data['name']);
        $offerIntegration->setEmail($data['email']);
        $offerIntegration->setPhone($data['phone']);
        $offerIntegration->setMessage($data['message']);
        $offerIntegration->setDateExp($data['date_exp']);
        $offerIntegration->setUpdatedAt(date_create());

        $this->entityManager->flush();

        return $offerIntegration->getId();
    }
}
