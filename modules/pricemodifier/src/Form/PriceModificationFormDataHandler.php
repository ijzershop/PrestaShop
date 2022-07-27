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

namespace Modernesmid\Module\Pricemodifier\Form;

use Doctrine\ORM\EntityManagerInterface;
use Modernesmid\Module\Pricemodifier\Entity\PriceModification;
use Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\DataHandler\FormDataHandlerInterface;

class PriceModificationFormDataHandler implements FormDataHandlerInterface
{
    /**
     * @var PriceModificationRepository
     */
    private $price_modificationRepository;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @param PriceModificationRepository $price_modificationRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
        PriceModificationRepository $price_modificationRepository,
        EntityManagerInterface $entityManager
    ) {
        $this->price_modificationRepository = $price_modificationRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data)
    {


        $price_modification = new PriceModification();
        $price_modification->setNameSupplier($data['name_supplier']);
        $price_modification->setIdStoreProduct($data['id_store_product']);
        $price_modification->setFileSupplier($data['file_supplier']);
        $price_modification->setActive($data['active']);

        $this->entityManager->persist($price_modification);
        $this->entityManager->flush();

        return $price_modification->getId();
    }

    /**
     * {@inheritdoc}
     */
    public function update($id, array $data)
    {

        $price_modification = $this->price_modificationRepository->findOneById($id);
        $price_modification->setNameSupplier($data['name_supplier']);
        $price_modification->setIdStoreProduct($data['id_store_product']);
        $price_modification->setFileSupplier($data['file_supplier']);
        $price_modification->setActive($data['active']);

        $this->entityManager->flush();

        return $price_modification->getId();
    }
}
