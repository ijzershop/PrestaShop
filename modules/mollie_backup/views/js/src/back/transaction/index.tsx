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
import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { StoreContext } from 'redux-react-hook'
import { throttle } from 'lodash';

import { ICurrencies, IMollieOrderConfig, ITranslations } from '@shared/globals';

import LoadingDots from '@shared/components/LoadingDots';
import {updateWarning} from "@transaction/store/actions";

const MolliePanel = lazy(() => import('@transaction/components/MolliePanel'));

export default function transactionInfo (
  target: any,
  config: IMollieOrderConfig,
  translations: ITranslations,
  currencies: ICurrencies
): void {
  (async function () {
    const [
      { default: store },
      {
        updateConfig,
        updateCurrencies,
        updateOrder,
        updatePayment,
        updateTranslations,
        updateViewportWidth,
      },
      { retrieveOrder, retrievePayment },
    ] = await Promise.all([
      import(/* webpackPrefetch: true, webpackChunkName: "transaction" */ '@transaction/store'),
      import(/* webpackPrefetch: true, webpackChunkName: "transaction" */ '@transaction/store/actions'),
      import(/* webpackPrefetch: true, webpackChunkName: "transaction" */ '@transaction/misc/ajax'),
    ]);

    // Listen for window resizes
    window.addEventListener('resize', throttle(() => {
      store.dispatch(updateViewportWidth(window.innerWidth));
    }, 200));

    store.dispatch(updateCurrencies(currencies));
    store.dispatch(updateTranslations(translations));
    store.dispatch(updateConfig(config));

    const { transactionId } = config;
    if (transactionId.substr(0, 3) === 'ord') {
      store.dispatch(updateOrder(await retrieveOrder(transactionId)));
    } else {
      store.dispatch(updatePayment(await retrievePayment(transactionId)));
    }

    render(
      <StoreContext.Provider value={store}>
        <Suspense fallback={<LoadingDots/>}>
          <MolliePanel/>
        </Suspense>
      </StoreContext.Provider>,
      typeof target === 'string' ? document.querySelector(target) : target
    );
  }());
};
