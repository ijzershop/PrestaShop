<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Provider;

use Shop;
use Tools;

class ShopsProvider
{
    /**
     * Get one Shop Url
     *
     * @param int $shopId
     *
     * @return array
     */
    public function getShopUrl($shopId)
    {
        $shop = Shop::getShop($shopId);
        $protocol = $this->getShopsProtocolInformations();

        return [
            'id_shop' => $shop['id_shop'],
            'domain' => $shop[$protocol['domain_type']],
            'url' => $protocol['protocol'] . $shop[$protocol['domain_type']] . $shop['uri'],
        ];
    }

    /**
     * Get all shops Urls
     *
     * @return array
     */
    public function getShopsUrl()
    {
        $shopList = Shop::getShops();
        $protocol = $this->getShopsProtocolInformations();
        $urlList = [];

        foreach ($shopList as $shop) {
            $urlList[] = [
                'id_shop' => $shop['id_shop'],
                'url' => $protocol['protocol'] . $shop[$protocol['domain_type']] . $shop['uri'],
            ];
        }

        return $urlList;
    }

    /**
     * getShopsProtocol
     *
     * @return array
     */
    protected function getShopsProtocolInformations()
    {
        if (true === Tools::usingSecureMode()) {
            return [
                'domain_type' => 'domain_ssl',
                'protocol' => 'https://',
            ];
        }

        return [
            'domain_type' => 'domain',
            'protocol' => 'http://',
        ];
    }
}
