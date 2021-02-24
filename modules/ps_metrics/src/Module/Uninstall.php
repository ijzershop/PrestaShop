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

namespace PrestaShop\Module\Ps_metrics\Module;

use Module;
use PrestaShop\AccountsAuth\Service\PsAccountsService;
use PrestaShop\Module\Ps_metrics\Api\Analytics\Accounts;
use PrestaShop\Module\Ps_metrics\Helper\JsonHelper;
use PrestaShop\Module\Ps_metrics\Helper\LoggerHelper;
use PrestaShop\Module\Ps_metrics\Helper\ModuleHelper;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;
use Ps_metrics;
use Tab;
use Validate;

class Uninstall
{
    /**
     * @var Ps_metrics|Module
     */
    private $module;

    /**
     * @var ConfigurationRepository
     */
    private $configurationRepository;

    /**
     * @var JsonHelper
     */
    private $jsonHelper;

    /**
     * @var ModuleHelper
     */
    private $moduleHelper;

    /**
     * @var LoggerHelper
     */
    private $loggerHelper;

    /**
     * @var Accounts
     */
    private $accounts;

    /**
     * Uninstall constructor.
     *
     * @param Module $module
     * @param ConfigurationRepository $configurationRepository
     * @param JsonHelper $jsonHelper
     * @param ModuleHelper $moduleHelper
     * @param LoggerHelper $loggerHelper
     * @param Accounts $accounts
     */
    public function __construct(
        Module $module,
        ConfigurationRepository $configurationRepository,
        JsonHelper $jsonHelper,
        ModuleHelper $moduleHelper,
        LoggerHelper $loggerHelper,
        Accounts $accounts
    ) {
        $this->module = $module;
        $this->configurationRepository = $configurationRepository;
        $this->jsonHelper = $jsonHelper;
        $this->moduleHelper = $moduleHelper;
        $this->loggerHelper = $loggerHelper;
        $this->accounts = $accounts;
    }

    /**
     * resetConfigurationValues
     *
     * @return bool
     */
    public function resetConfigurationValues()
    {
        return $this->configurationRepository->saveActionGoogleLinked(false);
    }

    /**
     * uninstall tabs
     *
     * @return bool
     */
    public function uninstallTabs()
    {
        $uninstallTabCompleted = true;

        foreach ($this->module->controllers as $controllerName) {
            $idTab = (int) Tab::getIdFromClassName($controllerName);
            $tab = new Tab($idTab);

            if (Validate::isLoadedObject($tab)) {
                $uninstallTabCompleted = $uninstallTabCompleted && $tab->delete();
            }
        }

        return $uninstallTabCompleted;
    }

    /**
     * unsubscribePsEssentials
     *
     * @return bool
     */
    public function unsubscribePsEssentials()
    {
        // if the user is not onboarded, don't process unsubscribe
        if (!$this->isOnboardedWithAccountAndGoogle()) {
            return true;
        }

        $this->accounts->create();
        $unsubscribe = $this->accounts->unsubscribe();

        if (201 === $unsubscribe['httpCode']) {
            return true;
        }

        $this->loggerHelper->addLog('[PS_METRICS] Unable to unsubscribe', 2);

        return false;
    }

    /**
     * Check if the user is onboarded on prestashop account and google
     *
     * @return bool
     */
    private function isOnboardedWithAccountAndGoogle()
    {
        if (false === (new PsAccountsService())->getShopUuidV4() &&
            false === $this->configurationRepository->getGoogleLinkedValue()
        ) {
            return false;
        }

        return true;
    }
}
