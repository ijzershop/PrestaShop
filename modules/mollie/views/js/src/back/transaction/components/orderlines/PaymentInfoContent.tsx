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
 */
import React, { ReactElement, useCallback } from 'react';
import moment from 'moment';
import { get } from 'lodash';

import { formatCurrency } from '@shared/tools';
import { useMappedState } from 'redux-react-hook';

export default function PaymentInfoContent(): ReactElement<{}> {
  const { translations, order, currencies, config: { legacy } }: Partial<IMollieOrderState> = useMappedState((state: IMollieOrderState): any => ({
    order: state.order,
    currencies: state.currencies,
    translations: state.translations,
    config: state.config,
  }));

  return (
    <>
      {legacy && <h3>{translations.transactionInfo}</h3>}
      {!legacy && <h4>{translations.transactionInfo}</h4>}
      <strong>{translations.transactionId}</strong>: <span>{order.id}</span><br/>
      <strong>{translations.date}</strong>: <span>{moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span><br/>
      <strong>{translations.amount}</strong>: <span>{formatCurrency(parseFloat(order.amount.value), get(currencies, order.amount.currency))}</span><br/>
      <strong>{translations.remaining}</strong>: <span>{formatCurrency(parseFloat(order.availableRefundAmount.value), get(currencies, order.availableRefundAmount.currency))}</span><br/>
    </>
  );
}
