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
import React, { ReactElement, Suspense, useEffect, useState, lazy } from 'react';
import cx from 'classnames';
import { cloneDeep, find, forEach, isEmpty } from 'lodash';

import axios from '@shared/axios';
import LoadingDots from '@shared/components/LoadingDots';
import {
  IMollieCarrierConfig,
  IMollieCarrierConfigItem,
  IMollieCarrierConfigItems,
  ITranslations,
} from '@shared/globals';

const ConfigCarrierError = lazy(() => import(/* webpackChunkName: "carrierconfig" */ '@carrierconfig/components/CarrierConfigError'));

interface IProps {
  config: IMollieCarrierConfig;
  translations: ITranslations;
  target: string;
}

export default function CarrierConfig(props: IProps): ReactElement<{}> {
  const [carriers, setCarriers] = useState<Array<IMollieCarrierConfigItem>>(undefined);
  const [message, setMessage] = useState<string>(undefined);

  async function _init(): Promise<void> {
    const { config: { ajaxEndpoint } } = props;
    try {
      const { data: { carriers } = { carriers: null } } = await axios.get(ajaxEndpoint);
      setCarriers(carriers);
    } catch (e) {
      console.error(e);
      setCarriers(null);
      setMessage((e && e instanceof Error) ? e.message : 'Check the browser console for errors');
    }
  }

  function _carrierConfig(): IMollieCarrierConfigItems {
    const carrierConfig: IMollieCarrierConfigItems = {};
    forEach(carriers, (carrier: IMollieCarrierConfigItem) => {
      carrierConfig[carrier.id_carrier] = carrier;
    });

    return carrierConfig;
  }

  function _updateCarrierConfig(id: string, key: string, value: string|null): void {
    const newCarriers = cloneDeep(carriers);
    const config = find(newCarriers, (item: IMollieCarrierConfigItem) => item.id_carrier === id);
    if (typeof config === 'undefined') {
      return;
    }
    config[key] = value;

    setCarriers(newCarriers);
  }

  useEffect(() => {
    _init().then();
  }, []);

  const { translations, target, config: { legacy } } = props;

  if (typeof carriers === 'undefined') {
    return <LoadingDots/>;
  }

  if (!Array.isArray(carriers) || (Array.isArray(carriers) && isEmpty(carriers))) {
    return (
      <Suspense fallback={null}>
        <ConfigCarrierError message={message} retry={_init}/>
      </Suspense>
    );
  }

  return (
    <>
      <div className={cx({
        'alert': !legacy,
        'alert-info': !legacy,
        'warn': legacy,
      })}
      >
        {translations.hereYouCanConfigureCarriers}
        <br/>{translations.youCanUseTheFollowingVariables}
        <ul>
          <li><strong>@ </strong>: {translations.shippingNumber}</li>
          <li><strong>%%shipping_number%% </strong>: {translations.shippingNumber}</li>
          <li><strong>%%invoice.country_iso%%</strong>: {translations.invoiceCountryCode}</li>
          <li><strong>%%invoice.postcode%% </strong>: {translations.invoicePostcode}</li>
          <li><strong>%%delivery.country_iso%%</strong>: {translations.deliveryCountryCode}</li>
          <li><strong>%%delivery.postcode%% </strong>: {translations.deliveryPostcode}</li>
          <li><strong>%%lang_iso%% </strong>: {translations.languageCode}</li>
        </ul>
      </div>
      <table className="list form alternate table">
        <thead>
          <tr>
            <td className="left">{translations.name}</td>
            <td className="left">{translations.urlSource}</td>
            <td className="left">{translations.customUrl}</td>
          </tr>
        </thead>
        <tbody>
          {carriers.map((carrier) => (
            <tr key={carrier.id_carrier}>
              <td className="left">
                {carrier.name}
              </td>
              <td className="left">
                <select
                  value={carrier.source}
                  onChange={({ target: { value } }) => _updateCarrierConfig(carrier.id_carrier, 'source', value)}
                >
                  <option value="do_not_auto_ship">{translations.doNotAutoShip}</option>
                  <option value="no_tracking_info">{translations.noTrackingInformation}</option>
                  <option value="carrier_url">{translations.carrierUrl}</option>
                  <option value="custom_url">{translations.customUrl}</option>
                  {carrier.module && <option value="module">{translations.module}</option>}
                </select>
              </td>
              <td className="left">
                <input
                  type="text"
                  disabled={carrier.source !== 'custom_url'}
                  value={carrier.custom_url}
                  onChange={({ target: { value } }) => _updateCarrierConfig(carrier.id_carrier, 'custom_url', value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <input type="hidden" id={target} name={target} value={JSON.stringify(_carrierConfig())}/>
    </>
  );
}
