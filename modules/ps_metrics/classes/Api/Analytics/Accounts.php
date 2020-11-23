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

namespace PrestaShop\Module\Ps_metrics\Api\Analytics;

use PrestaShop\Module\Ps_metrics\Api\Client\AnalyticsClient;

class Accounts extends AnalyticsClient
{
    /**
     * getAccountsList
     *
     * @return array
     */
    public function getAccountsList()
    {
        $this->setRoute('/shops/' . $this->getShopId() . '/accounts/list');

        return $this->get();
    }

    /**
     * setAccountSelection
     *
     * @param array $data
     *
     * @return array
     */
    public function setAccountSelection(array $data)
    {
        $this->setRoute('/shops/' . $this->getShopId() . '/accounts/selection');

        return $this->post([
            'json' => $data,
        ]);
    }

    /**
     * unsubscribe
     *
     * @return array
     */
    public function unsubscribe()
    {
        $this->setRoute('/shops/' . $this->getShopId() . '/accounts/unsubscribe');

        return $this->post();
    }

    /**
     * refreshGA
     *
     * @return array
     */
    public function refreshGA()
    {
        $this->setRoute('/shops/' . $this->getShopId() . '/accounts/refresh');

        return $this->post();
    }

    /**
     * authUrl
     *
     * @return array
     */
    public function generateAuthUrl(array $data)
    {
        $this->setRoute('/shops/' . $this->getShopId() . '/accounts/generate-auth-url');

        return $this->post([
            'json' => $data,
        ]);
    }
}
