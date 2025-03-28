<?php

namespace Mollie\Provider;

use Address;
use Tools;
use Mollie\Adapter\Context;
use Mollie\Calculator\PaymentFeeCalculator;
use Mollie\Config\Config;
use Mollie\DTO\PaymentFeeData;
use Mollie\Repository\AddressRepositoryInterface;
use MolPaymentMethod;

if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 *
 */
class PaymentFeeProviderOverride extends PaymentFeeProvider implements PaymentFeeProviderInterface
{
    /** @var Context */
    private $context;
    /** @var AddressRepositoryInterface */
    private $addressRepository;
    /** @var \Mollie\Provider\TaxCalculatorProvider */
    private $taxProvider;

    public function __construct(
        Context                                $context,
        AddressRepositoryInterface $addressRepository,
        \Mollie\Provider\TaxCalculatorProvider $taxProvider
    ) {
        $this->context = $context;
        $this->addressRepository = $addressRepository;
        $this->taxProvider = $taxProvider;
    }

    /**
     * {@inheritDoc}
     */
    public function getPaymentFee(MolPaymentMethod $paymentMethod, float $totalCartPriceTaxIncl): PaymentFeeData
    {
        // TODO handle exception on all calls.
        $surchargeFixedPriceTaxExcl = (float) $paymentMethod->surcharge_fixed_amount_tax_excl;
        $surchargePercentage = (float) $paymentMethod->surcharge_percentage;
        $surchargeLimit = (float) $paymentMethod->surcharge_limit;

        /** @var Address|null $address */
        $address = $this->addressRepository->findOneBy([
            'id_address' => $this->context->getCustomerAddressInvoiceId(),
            'deleted' => 0,
        ]);

        if (!$address || !$address->id) {
            $address = new Address();
            $address->id_country = Tools::getCountry();
            $address->id_state = 0;
        }

        $taxCalculator = $this->taxProvider->getTaxCalculator(
            (int) $paymentMethod->tax_rules_group_id,
            (int) $address->id_country,
            (int) $address->id_state
        );

        $paymentFeeCalculator = new PaymentFeeCalculator($taxCalculator, $this->context);

        // TODO it would be good to use Abstract class, which would hold common private methods and then create separate services, which would provide calculated fee.
        switch ($paymentMethod->surcharge) {
            case Config::FEE_FIXED_FEE:
                return $paymentFeeCalculator->calculateFixedFee(
                    $surchargeFixedPriceTaxExcl
                );
            case Config::FEE_PERCENTAGE:
                return $paymentFeeCalculator->calculatePercentageFee(
                    $totalCartPriceTaxIncl,
                    $surchargePercentage,
                    $surchargeLimit
                );
            case Config::FEE_FIXED_FEE_AND_PERCENTAGE:
                return $paymentFeeCalculator->calculatePercentageAndFixedPriceFee(
                    $totalCartPriceTaxIncl,
                    $surchargePercentage,
                    $surchargeFixedPriceTaxExcl,
                    $surchargeLimit
                );
        }

        return new PaymentFeeData(0.00, 0.00, 0.00, false);
    }
}
