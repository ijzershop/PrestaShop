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

use PrestaShop\Module\Ps_metrics\Api\Analytics\Accounts;
use PrestaShop\Module\Ps_metrics\Helper\JsonHelper;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;

class AnalyticsAccountsListProvider
{
    /**
     * @var Accounts
     */
    private $analyticsAccount;

    /**
     * @var array
     */
    private $accountsList;

    /**
     * @var JsonHelper
     */
    private $jsonHelper;

    /**
     * @var ConfigurationRepository
     */
    private $configurationRepository;

    /**
     * AnalyticsAccountsListProvider constructor.
     *
     * @param ConfigurationRepository $configurationRepository
     * @param JsonHelper $jsonHelper
     * @param Accounts $accounts
     */
    public function __construct(
        ConfigurationRepository $configurationRepository,
        JsonHelper $jsonHelper,
        Accounts $accounts
    ) {
        $this->analyticsAccount = $accounts;
        $this->analyticsAccount->create();
        $this->accountsList = [];
        $this->configurationRepository = $configurationRepository;
        $this->jsonHelper = $jsonHelper;
    }

    /**
     * getAccountsList
     *
     * @return array
     */
    public function getAccountsList()
    {
        if (false === $this->configurationRepository->getGoogleLinkedValue()) {
            return [];
        }

        $apiReturn = $this->analyticsAccount->getAccountsList();

        if (200 !== $apiReturn['httpCode']) {
            return [];
        }

        return $this->formatAccountListArray(
                $this->jsonHelper->jsonDecode($apiReturn['body'], true)
        );
    }

    /**
     * Get the selected account from the account list
     *
     * @return mixed
     */
    public function getSelectedAccount()
    {
        foreach ($this->accountsList as $uaTag => $accountData) {
            if (true === $accountData['selected']) {
                $accountData['webPropertyId'] = $uaTag;

                return $accountData;
            }
        }

        return (object) [];
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUserName()
    {
        if (false === empty($this->accountsList)) {
            $webPropertyList = array_keys($this->accountsList);
            $firstWebProperty = current($webPropertyList);

            return $this->accountsList[$firstWebProperty]['username'];
        }

        return '';
    }

    /**
     * retrieveAccountsList
     *
     * @param array $accountList
     *
     * @return array
     */
    private function formatAccountListArray($accountList)
    {
        if (empty($accountList)) {
            return [];
        }

        foreach ($accountList as $accounts) {
            foreach ($accounts as $account) {
                $this->accountsList = array_merge($account, $this->accountsList);
            }
        }

        return $this->accountsList;
    }
}
