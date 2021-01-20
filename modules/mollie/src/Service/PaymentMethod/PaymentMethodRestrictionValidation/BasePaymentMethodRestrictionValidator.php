<?php
/**
 * Copyright (c) 2012-2020, Mollie B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 *
 * @author     Mollie B.V. <info@mollie.nl>
 * @copyright  Mollie B.V.
 * @license    Berkeley Software Distribution License (BSD-License 2) http://www.opensource.org/licenses/bsd-license.php
 *
 * @category   Mollie
 *
 * @see       https://www.mollie.nl
 * @codingStandardsIgnoreStart
 */

namespace Mollie\Service\PaymentMethod\PaymentMethodRestrictionValidation;

use Mollie\Adapter\LegacyContext;
use Mollie\Provider\OrderTotalProviderInterface;
use Mollie\Provider\PaymentMethod\PaymentMethodCurrencyProviderInterface;
use Mollie\Service\OrderTotal\OrderTotalServiceInterface;
use MolPaymentMethod;
use Tools;

/** Validator to check all cases for every payment method */
class BasePaymentMethodRestrictionValidator implements PaymentMethodRestrictionValidatorInterface
{
	/**
	 * @var LegacyContext
	 */
	private $context;

	/**
	 * @var PaymentMethodCurrencyProviderInterface
	 */
	private $paymentMethodCurrenciesProvider;

	/**
	 * @var OrderTotalServiceInterface
	 */
	private $orderTotalService;

	/**
	 * @var OrderTotalProviderInterface
	 */
	private $orderTotalProvider;

	public function __construct(
		LegacyContext $context,
		PaymentMethodCurrencyProviderInterface $paymentMethodCurrenciesProvider,
		OrderTotalServiceInterface $orderTotalService,
		OrderTotalProviderInterface $orderTotalProvider
	) {
		$this->context = $context;
		$this->paymentMethodCurrenciesProvider = $paymentMethodCurrenciesProvider;
		$this->orderTotalService = $orderTotalService;
		$this->orderTotalProvider = $orderTotalProvider;
	}

	/**
	 * {@inheritDoc}
	 */
	public function isValid(MolPaymentMethod $paymentMethod)
	{
		if (!$this->isPaymentMethodEnabled($paymentMethod)) {
			return false;
		}

		if (!$this->isCurrencyOptionDefinedForPaymentMethod($paymentMethod)) {
			return false;
		}

		if (!$this->isCurrencySupportedByPaymentMethod($paymentMethod)) {
			return false;
		}

		if ($this->isOrderTotalLowerThanMinimumAllowed($paymentMethod)) {
			return false;
		}

		if ($this->isOrderTotalHigherThanMaximumAllowed($paymentMethod)) {
			return false;
		}

		return true;
	}

	/**
	 * {@inheritDoc}
	 */
	public function supports(MolPaymentMethod $paymentMethod)
	{
		return true;
	}

	/**
	 * @param MolPaymentMethod $paymentMethod
	 *
	 * @return bool
	 */
	private function isCurrencyOptionDefinedForPaymentMethod($paymentMethod)
	{
		return !empty($this->paymentMethodCurrenciesProvider->provideAvailableCurrenciesByPaymentMethod($paymentMethod));
	}

	/**
	 * @param MolPaymentMethod $paymentMethod
	 *
	 * @return bool
	 */
	private function isPaymentMethodEnabled($paymentMethod)
	{
		return (bool) $paymentMethod->enabled;
	}

	/**
	 * @param MolPaymentMethod $paymentMethod
	 *
	 * @return bool
	 */
	private function isCurrencySupportedByPaymentMethod($paymentMethod)
	{
		$supportedCurrencies = $this->paymentMethodCurrenciesProvider->provideAvailableCurrenciesByPaymentMethod($paymentMethod);
		$currencyCode = Tools::strtolower($this->context->getCurrencyIsoCode());

		return in_array(
			strtolower($currencyCode),
			array_map('strtolower', $supportedCurrencies)
		);
	}

	/**
	 * @param MolPaymentMethod $paymentMethod
	 *
	 * @return bool
	 */
	private function isOrderTotalLowerThanMinimumAllowed($paymentMethod)
	{
		$orderTotal = $this->orderTotalProvider->getOrderTotal();

		return $this->orderTotalService->isOrderTotalLowerThanMinimumAllowed($paymentMethod, $orderTotal);
	}

	/**
	 * @param MolPaymentMethod $paymentMethod
	 *
	 * @return bool
	 */
	private function isOrderTotalHigherThanMaximumAllowed($paymentMethod)
	{
		$orderTotal = $this->orderTotalProvider->getOrderTotal();

		return $this->orderTotalService->isOrderTotalHigherThanMaximumAllowed($paymentMethod, $orderTotal);
	}
}
