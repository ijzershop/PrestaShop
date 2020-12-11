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
 * @category   Mollie
 * @package    Mollie
 * @link       https://www.mollie.nl
 * @codingStandardsIgnoreStart
 */

namespace Mollie\Handler\Exception;

use Exception;
use Mollie\Exception\OrderCreationException;

class OrderExceptionHandler implements ExceptionHandlerInterface
{

    public function handle(Exception $e)
    {
        if (strpos($e->getMessage(), 'billingAddress.phone')) {
            throw new OrderCreationException($e->getMessage(), OrderCreationException::WRONG_BILLING_PHONE_NUMBER_EXCEPTION);
        } elseif (strpos($e->getMessage(), 'shippingAddress.phone')) {
            throw new OrderCreationException($e->getMessage(), OrderCreationException::WRONG_SHIPPING_PHONE_NUMBER_EXCEPTION);
        } elseif (strpos($e->getMessage(), 'payment.amount')) {
            if (strpos($e->getMessage(), 'minimum')) {
                throw new OrderCreationException($e->getMessage(), OrderCreationException::ORDER_TOTAL_LOWER_THAN_MINIMUM);
            }

            if (strpos($e->getMessage(), 'maximum')) {
                throw new OrderCreationException($e->getMessage(), OrderCreationException::ORDER_TOTAL_HIGHER_THAN_MAXIMUM);
            }
        }

        throw new OrderCreationException($e->getMessage(), OrderCreationException::DEFAULT_ORDER_CREATION_EXCEPTION);
    }
}
