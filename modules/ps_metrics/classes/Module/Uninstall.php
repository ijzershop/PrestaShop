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
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;
use PrestaShopLogger;
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
     * __construct
     *
     * @param Ps_metrics|Module $module
     *
     * @return void
     */
    public function __construct(Module $module)
    {
        $this->module = $module;
    }

    /**
     * resetConfigurationValues
     *
     * @return bool
     */
    public function resetConfigurationValues()
    {
        return (new ConfigurationRepository())->saveActionGoogleLinked(false);
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
     * Enable all modules from moduleSubstitution list
     *
     * @return bool
     */
    public function enableModules()
    {
        // if the user is not onboarded, don't process unsubscribe
        if (!$this->isOnboardedWithAccountAndGoogle()) {
            return true;
        }

        $areEnabledModules = true;
        $moduleListStateCache = (new JsonHelper())->jsonDecode(
            (new ConfigurationRepository())->getModuleListState(),
            true
        );

        foreach ($this->module->moduleSubstitution as $moduleName) {
            $moduleInstance = Module::getInstanceByName($moduleName);
            // $moduleInstance returns false if module doesn't exist
            if (false !== $moduleInstance && true === $moduleListStateCache[$moduleName]) {
                $areEnabledModules = $areEnabledModules && $moduleInstance->enable();
            }
        }

        return $areEnabledModules;
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

        $unsubscribe = new Accounts();
        $unsubscribe->create();
        $unsubscribe = $unsubscribe->unsubscribe();

        if (201 === $unsubscribe['httpCode']) {
            return true;
        }

        PrestaShopLogger::addLog('[PS_METRICS] Unable to unsubscribe', 2);

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
            false === (new ConfigurationRepository())->getGoogleLinkedValue()
        ) {
            return false;
        }

        return true;
    }
}
