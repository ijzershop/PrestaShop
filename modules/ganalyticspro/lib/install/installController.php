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

class installController
{
    /**
     * @var static : defines default action
     */
    private static $_aDefaultAction = ['install', 'uninstall'];

    /**
     * run() method execute matched install object
     *
     * @param string $sAction : action type
     * @param string $sInstallType : install/uninstall object type
     * @param mixed $mParam : param needed (optional)
     *
     * @return bool $bReturn : true => validate install / uninstall, false => invalidate install / uninstall
     */
    public static function run($sAction, $sInstallType, $mParam = null)
    {
        // declare return
        $bReturn = false;

        // check action
        if (in_array($sAction, self::$_aDefaultAction)) {
            switch ($sInstallType) {
                case 'sql':
                    $installController = new installSql();
                    if ($sAction == 'install') {
                        $bReturn = $installController::install($mParam);
                    } elseif ($sAction == 'uninstall') {
                        $bReturn = $installController::uninstall($mParam);
                    }
                    break;
                case 'config':
                    $installController = new installConfig();
                    if ($sAction == 'install') {
                        $bReturn = $installController::install($mParam);
                    } elseif ($sAction == 'uninstall') {
                        $bReturn = $installController::uninstall($mParam);
                    }
                    break;
                case 'tab':
                    $installController = new installTab();
                    if ($sAction == 'install') {
                        $bReturn = $installController::install($mParam);
                    } elseif ($sAction == 'uninstall') {
                        $bReturn = $installController::uninstall($mParam);
                    }
                    break;
                default:
                    break;
            }
        }

        return $bReturn;
    }
}
