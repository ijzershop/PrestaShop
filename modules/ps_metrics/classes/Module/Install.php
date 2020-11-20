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

use Hook;
use Language;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;
use PrestaShop\Module\Ps_metrics\Repository\HookModuleRepository;
use Ps_metrics;
use Tab;

class Install
{
    /**
     * @var Ps_metrics
     */
    private $module;

    public function __construct(Ps_metrics $module)
    {
        $this->module = $module;
    }

    /**
     * updateModuleHookPosition
     *
     * @param string $hookName
     * @param int $position
     *
     * @return bool
     */
    public function updateModuleHookPosition($hookName, $position)
    {
        $hookId = Hook::getIdByName($hookName);

        if (false === $hookId) {
            return false;
        }

        return (new HookModuleRepository())->setModuleHookPosition($hookId, $this->module->id, $position);
    }

    /**
     * setConfigurationValues
     *
     * @return bool
     */
    public function setConfigurationValues()
    {
        $configurationRepo = new ConfigurationRepository();

        return $configurationRepo->saveActionGoogleLinked(false) &&
            $configurationRepo->saveGoogleTagLinked(false);
    }

    /**
     * This method is often use to create an ajax controller
     *
     * @return bool
     */
    public function installTabs()
    {
        $installTabCompleted = true;

        foreach ($this->module->controllers as $controllerName) {
            if (Tab::getIdFromClassName($controllerName)) {
                continue;
            }

            $tab = new Tab();
            $tab->class_name = $controllerName;
            $tab->active = true;
            $tab->name = array_fill_keys(
                Language::getIDs(false),
                $this->module->displayName
            );
            $tab->id_parent = -1;
            $tab->module = $this->module->name;
            $installTabCompleted = $installTabCompleted && $tab->add();
        }

        return $installTabCompleted;
    }
}
