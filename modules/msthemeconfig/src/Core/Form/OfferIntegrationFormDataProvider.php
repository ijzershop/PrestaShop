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
            'employee_memo' => $offerIntegration->getMemo(),
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
            'name' => 'Offerte voor ',
            'email' => '',
            'phone' => '',
            'message' => '<small>Offerte '. $shop_name .' | '. $user .' | '. date_format(date_create(), 'd-m-Y').'</small><br><br><p>Beste klant op deze pagina staat voor u ons aanbod op maat. </p><p>Heeft u nog vragen dan horen we dat graag.</p>',
            'employee_memo' => '',
            'date_exp' => $newExpDate,
        ];
    }
}
