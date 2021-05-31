<?php
/**
 * Copyright (c) 2012-2021, Mollie B.V.
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
        $this->orderTotalRestrictionService->deleteOrderTotalRestrictions();

        /** @var PrestaShopCollection $paymentMethods */
        $paymentMethods = $this->paymentMethodRepository->findAll();

        /** @var PrestaShopCollection $currencies */
        $currencies = $this->currencyRepository->findAll();

        /** @var Currency $currency */
        foreach ($currencies as $currency) {
            /** @var MolPaymentMethod $paymentMethod */
            foreach ($paymentMethods as $paymentMethod) {
                $this->orderTotalRestrictionService->updateOrderTotalRestrictions($currency, $paymentMethod);
            }
        }

        return true;
    }
}
