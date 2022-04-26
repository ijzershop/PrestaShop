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

use Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\DataProvider\FormDataProviderInterface;

class PriceModificationFormDataProvider implements FormDataProviderInterface
{
    /**
     * @var PriceModificationRepository
     */
    private $repository;

    /**
     * @param PriceModificationRepository $repository
     */
    public function __construct(PriceModificationRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * {@inheritdoc}
     */
    public function getData($price_modificationId)
    {
        $price_modification = $this->repository->findOneById($price_modificationId);

        $price_modificationData = [
            'name_supplier' => $price_modification->getNameSupplier(),
            'id_store_product' => $price_modification->getIdStoreProduct(),
            'file_supplier' => $price_modification->getFileSupplier(),
            'active' => $price_modification->isActive(),
        ];

        return $price_modificationData;
    }

    /**
     * {@inheritdoc}
     */
    public function getDefaultData()
    {
        return [
            'name_supplier' => '',
            'id_store_product' => '',
            'file_supplier' =>  'DOUMA',
            'active' => false,
        ];
    }
}
