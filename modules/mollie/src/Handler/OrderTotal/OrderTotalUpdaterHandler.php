<?php

namespace Mollie\Handler\OrderTotal;

use Currency;
use Mollie\Exception\OrderTotalRestrictionException;
use Mollie\Repository\CurrencyRepositoryInterface;
use Mollie\Repository\PaymentMethodRepositoryInterface;
use Mollie\Service\OrderTotal\OrderTotalRestrictionServiceInterface;
use Mollie\Verification\OrderTotal\OrderTotalVerificationInterface;
use MolPaymentMethod;
use PrestaShopCollection;

class OrderTotalUpdaterHandler implements OrderTotalUpdaterHandlerInterface
{
	/**
	 * @var OrderTotalVerificationInterface
	 */
	private $canOrderTotalBeUpdated;

	/**
	 * @var OrderTotalRestrictionServiceInterface
	 */
	private $orderTotalRestrictionService;

	/**
	 * @var PaymentMethodRepositoryInterface
	 */
	private $paymentMethodRepository;

	/**
	 * @var CurrencyRepositoryInterface
	 */
	private $currencyRepository;

	public function __construct(
		OrderTotalVerificationInterface $canOrderTotalBeUpdated,
		OrderTotalRestrictionServiceInterface $orderTotalRestrictionService,
		PaymentMethodRepositoryInterface $paymentMethodRepository,
		CurrencyRepositoryInterface $currencyRepository
	) {
		$this->canOrderTotalBeUpdated = $canOrderTotalBeUpdated;
		$this->orderTotalRestrictionService = $orderTotalRestrictionService;
		$this->paymentMethodRepository = $paymentMethodRepository;
		$this->currencyRepository = $currencyRepository;
	}

	/**
	 * @return bool
	 *
	 * @throws OrderTotalRestrictionException
	 */
	public function handleOrderTotalUpdate()
	{
		if (!$this->canOrderTotalBeUpdated->verify()) {
			return false;
		}
		$shopId = \Context::getContext()->shop->id;
		$this->orderTotalRestrictionService->deleteOrderTotalRestrictions($shopId);

		/** @var PrestaShopCollection $paymentMethods */
		$paymentMethods = $this->paymentMethodRepository->findAllBy(['id_shop' => $shopId]);

		$currencies = $this->currencyRepository->findAll();

		/** @var Currency $currency */
		foreach ($currencies as $currency) {
			/** @var MolPaymentMethod $paymentMethod */
			foreach ($paymentMethods as $paymentMethod) {
				$this->orderTotalRestrictionService->updateOrderTotalRestrictions($currency->iso_code, $paymentMethod, $shopId);
			}
		}

		return true;
	}
}
