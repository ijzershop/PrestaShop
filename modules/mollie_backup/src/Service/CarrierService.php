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

namespace Mollie\Service;

use Carrier;
use Configuration;
use Context;
use Mollie\Config\Config;
use Order;
use Validate;

class CarrierService
{
    /**
     * Get carrier configuration
     *
     * @return array
     *
     * @since 3.3.0
     */
    public function carrierConfig($trackingUrls)
    {
        if (!is_array($trackingUrls)) {
            $trackingUrls = [];
        }

        $carriers = Carrier::getCarriers(
            Context::getContext()->language->id,
            false,
            false,
            false,
            null,
            Carrier::ALL_CARRIERS
        );

        $configCarriers = [];
        foreach ($carriers as $carrier) {
            $idCarrier = (int)$carrier['id_carrier'];
            $configCarriers[] = [
                'id_carrier' => $idCarrier,
                'name' => $carrier['name'],
                'source' => isset($dbConfig[$idCarrier]) ? $trackingUrls[$idCarrier]['source'] : ($carrier['external_module_name'] ? Config::MOLLIE_CARRIER_MODULE : Config::MOLLIE_CARRIER_CARRIER),
                'module' => !empty($carrier['external_module_name']) ? $carrier['external_module_name'] : null,
                'module_name' => !empty($carrier['external_module_name']) ? $carrier['external_module_name'] : null,
                'custom_url' => isset($dbConfig[$idCarrier]) ? $trackingUrls[$idCarrier]['custom_url'] : '',
            ];
        }
        if (count($trackingUrls) !== count($configCarriers)) {
            Configuration::updateValue(Config::MOLLIE_TRACKING_URLS, json_encode($configCarriers));
        }

        return $configCarriers;
    }
}