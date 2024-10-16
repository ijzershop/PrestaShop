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

use DateTime;
use MsThemeConfig\Core\Repository\OfferIntegrationRepository;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\DataProvider\FormDataProviderInterface;

/**
 *
 */
class OfferIntegrationFormDataProvider implements FormDataProviderInterface
{
    /**
     * @var OfferIntegrationRepository
     */
    private OfferIntegrationRepository $repository;

    /**
     * @param OfferIntegrationRepository $repository
     */
    public function __construct(OfferIntegrationRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * {@inheritdoc}
     */
    public function getData($offerIntegrationId)
    {
        $offerIntegration = $this->repository->findOneById($offerIntegrationId);

        return [
            'id_oi_offer' => $offerIntegration->getId(),
            'code' => $offerIntegration->getCode(),
            'name' => $offerIntegration->getName(),
            'email' => $offerIntegration->getEmail(),
            'phone' => $offerIntegration->getPhone(),
            'message' => $offerIntegration->getMessage(),
            'date_exp' => $offerIntegration->getDateExp(),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getDefaultData()
    {
        $newExpDate = new DateTime();
        $newExpDate->modify('+4 weeks');
        $context = \Context::getContext();

        if($context->shop != null){
            $shop_name = $context->shop->name;
        } else {
            $shop_name = 'Ijzershop';
        }

        if($context->employee != null){
            $user = substr(strtoupper((string)$context->employee->firstname), 0, 2);
        } else {
            $user = 'RO';
        }

        return [
            'id_oi_offer' => '',
            'code' => date_format(date_create(), 'Ymd') . '-' . rand ( 1000 , 9999 ),
            'name' => 'Offerte '. $shop_name . ' | ' . date_format(date_create(), 'd-m-Y'),
            'email' => '',
            'phone' => '',
            'message' => '',
            'date_exp' => $newExpDate,
        ];
    }
}
