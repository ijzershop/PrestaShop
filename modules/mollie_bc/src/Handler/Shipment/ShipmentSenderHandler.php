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

namespace Mollie\Handler\Shipment;

use Mollie\Exception\ShipmentCannotBeSentException;
use Mollie\Service\ExceptionService;
use Mollie\Service\Shipment\ShipmentInformationSenderInterface;
use Mollie\Verification\Shipment\ShipmentVerificationInterface;
use MolliePrefix\Mollie\Api\MollieApiClient;
use MolliePrefix\Psr\Log\LoggerInterface;
use Order;
use OrderState;

class ShipmentSenderHandler implements ShipmentSenderHandlerInterface
{
    /**
     * @var ShipmentVerificationInterface
     */
    private $canSendShipment;

    /**
     * @var ShipmentInformationSenderInterface
     */
    private $shipmentInformationSender;

    /**
     * @var ExceptionService
     */
    private $exceptionService;

    /**
     * @var LoggerInterface
     */
    private $moduleLogger;

    public function __construct(
        ShipmentVerificationInterface $canSendShipment,
        ShipmentInformationSenderInterface $shipmentInformationSender,
        ExceptionService $exceptionService,
        LoggerInterface $moduleLogger
    ) {
        $this->canSendShipment = $canSendShipment;
        $this->shipmentInformationSender = $shipmentInformationSender;
        $this->exceptionService = $exceptionService;
        $this->moduleLogger = $moduleLogger;
    }

    /**
     * @param MollieApiClient $apiClient
     * @param Order $order
     * @param OrderState $orderState
     *
     * @return bool
     */
    public function handleShipmentSender(MollieApiClient $apiClient, Order $order, OrderState $orderState)
    {
        try {
            if (!$this->canSendShipment->verify($order, $orderState)) {
                return false;
            }
        } catch (ShipmentCannotBeSentException $exception) {
            $message = $this->exceptionService->getErrorMessageForException(
                $exception,
                $this->exceptionService->getErrorMessages(),
                ['orderReference' => $order->reference]
            );
            $this->moduleLogger->error($message);

            return false;
        }

        $this->shipmentInformationSender->sendShipmentInformation($apiClient, $order);

        return true;
    }
}
