<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

namespace GanalyticsPro\Install;

use GanalyticsPro\Configuration\moduleConfiguration;

class installConfig implements installInterface
{
    /**
     * install() method install of module
     *
     * @param mixed $mParam
     *
     * @return bool $bReturn : true => validate install, false => invalidate install
     */
    public static function install($mParam = null)
    {
        // declare return
        $bReturn = true;

        // log jam to debug appli
        if (defined(moduleConfiguration::GAP_LOG_JAM_CONFIG) && moduleConfiguration::GAP_LOG_JAM_CONFIG) {
            $bReturn = moduleConfiguration::GAP_LOG_JAM_CONFIG;
        } else {
            if (empty($mParam['bHookOnly'])) {
                // update each constant used in module admin & display
                foreach (moduleConfiguration::getConfVar() as $sKeyName => $mVal) {
                    if (!\Configuration::updateValue($sKeyName, $mVal)) {
                        $bReturn = false;
                    }
                }
            }
            if (empty($mParam['bConfigOnly'])) {
                // register each hooks
                foreach (moduleConfiguration::GAP_HOOKS as $aHook) {
                    if (!self::isHookInstalled($aHook['name'], \GAnalyticsPro::$oModule->id)) {
                        if (!\GAnalyticsPro::$oModule->registerHook($aHook['name'])) {
                            $bReturn = false;
                        }
                    }
                }
            }
        }
        unset($mParam);

        return $bReturn;
    }

    /**
     * uninstall() method uninstall of module
     *
     * @param mixed $mParam
     *
     * @return bool $bReturn : true => validate uninstall, false => invalidate uninstall / uninstall admin tab
     */
    public static function uninstall($mParam = null)
    {
        // set return execution
        $bReturn = true;

        // log jam to debug appli
        if (defined(moduleConfiguration::GAP_LOG_JAM_CONFIG) && moduleConfiguration::GAP_LOG_JAM_CONFIG) {
            $bReturn = moduleConfiguration::GAP_LOG_JAM_CONFIG;
        } else {
            // delete global config
            foreach (moduleConfiguration::getConfVar() as $sKeyName => $mVal) {
                if (!\Configuration::deleteByName($sKeyName)) {
                    $bReturn = false;
                }
            }
        }
        unset($mParam);

        return $bReturn;
    }

    /**
     * isHookInstalled() method check if specific module is hooked to a specific hook
     *
     * @param string $sHookName
     * @param int $iModuleId
     *
     * @return int
     */
    public static function isHookInstalled($sHookName, $iModuleId)
    {
        if (version_compare(_PS_VERSION_, '1.3.6', '<')) {
            $sQuery = 'SELECT COUNT(*)
				FROM `' . _DB_PREFIX_ . 'hook_module` hm
				LEFT JOIN `' . _DB_PREFIX_ . 'hook` h ON (h.`id_hook` = hm.`id_hook`)
				WHERE h.`name` = \'' . pSQL($sHookName) . '\' AND hm.`id_module` = ' . (int) $iModuleId;

            $bReturn = \Db::getInstance()->getValue($sQuery);
        } else {
            $bReturn = \GAnalyticsPro::$oModule->isRegisteredInHook($sHookName);
        }

        return $bReturn;
    }
}
