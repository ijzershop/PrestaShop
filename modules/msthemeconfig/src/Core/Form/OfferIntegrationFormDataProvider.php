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
use Db;
use DateTime;
use Http\Client\Exception;
use MsThemeConfig\Core\Repository\OfferIntegrationRepository;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\DataProvider\FormDataProviderInterface;
use PrestaShopDatabaseException;

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


        try {
            $reference = $this->generateNextOfferNumber();
        } catch(Exception $exception) {
            $reference = 'OF-'. date_format(date_create(), 'Ymd');
        }

        return [
            'id_oi_offer' => '',
            'code' => date_format(date_create(), 'Ymd') . '-' . rand ( 1000 , 9999 ),
            'name' => 'Offerte '. $reference .' | ' . date_format(date_create(), 'd-m-Y') . ' | ' . $shop_name . ' | ' . $user,
            'email' => '',
            'phone' => '',
            'message' => '',
            'date_exp' => $newExpDate,
        ];
    }


    /**
     * @return string
     */
    public function generateNextOfferNumber(){
        $prefix = 'OF-';
        $prefixLength = strlen($prefix);
        $restLength = 9 - $prefixLength;
        $query = 'SELECT `id_oi_offer` FROM `'._DB_PREFIX_.'offer_integration` ORDER BY `id_oi_offer` DESC';
        $previousOrderId = Db::getInstance()->getValue($query, false);
        $nextOrderId = (int) str_replace($prefix, '', $previousOrderId) + 1;
        $reference = sprintf('%0'.$restLength.'d', $nextOrderId);
        return strtoupper($prefix.$reference);
    }
}
