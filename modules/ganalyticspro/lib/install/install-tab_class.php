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
class BT_InstallTab implements BT_IInstall
{
    /**
     * install() method install of module
     *
     * @param mixed $mParam
     * @return bool $bReturn : true => validate install, false => invalidate install
     */
    public static function install($mParam = null)
    {
        // declare return
        $bReturn = true;

        static $oTab;

        // instantiate
        if (null === $oTab) {
            $oTab = new Tab();
        }

        // log jam to debug appli
        if (defined('_GAP_LOG_JAM_CONFIG') && _GAP_LOG_JAM_CONFIG) {
            $bReturn = _GAP_LOG_JAM_CONFIG;
        } else {
            // set variables
            $aTmpLang = array();

            // get available languages
            $aLangs = Language::getLanguages(true);

            // loop on each admin tab
            foreach ($GLOBALS[_GAP_MODULE_NAME . '_TABS'] as $sAdminClassName => $aTab) {
                foreach ($aLangs as $aLang) {
                    $aTmpLang[$aLang['id_lang']] = array_key_exists($aLang['iso_code'],
                        $aTab['lang']) ? $aTab['lang'][$aLang['iso_code']] : $aTab['lang']['en'];
                }
                $oTab->name = $aTmpLang;
                $oTab->class_name = $sAdminClassName;
                $oTab->module = GAnalyticsPro::$oModule->name;
                $oTab->id_parent = Tab::getIdFromClassName($aTab['parent']);

                // use case - copy icon tab
                if (file_exists(_PS_MODULE_DIR_ . $oTab->module . _GAP_PATH_VIEWS . _GAP_PATH_IMG . 'admin/' . $sAdminClassName . '.gif')) {
                    @copy(_PS_MODULE_DIR_ . $oTab->module . _GAP_PATH_VIEWS . _GAP_PATH_IMG . 'admin/' . $sAdminClassName . '.gif',
                        _PS_IMG_DIR_ . 't/' . $sAdminClassName . '.gif');
                }

                // save admin tab
                if (false == $oTab->save()) {
                    $bReturn = false;
                }
            }
        }
        // destruct
        unset($mParam);
        unset($oTab);

        return $bReturn;
    }

    /**
     * uninstall() method uninstall of module
     *
     * @param mixed $mParam
     * @return bool $bReturn : true => validate uninstall, false => invalidate uninstall
     */
    public static function uninstall($mParam = null)
    {
        // set return execution
        $bReturn = true;

        // loop on each admin tab
        foreach ($GLOBALS[_GAP_MODULE_NAME . '_TABS'] as $sAdminClassName => $aTab) {
            // get ID
            $iTabId = Tab::getIdFromClassName($sAdminClassName);

            if (!empty($iTabId)) {
                // instantiate
                $oTab = new Tab($iTabId);

                // use case - check delete
                if (false == $oTab->delete()) {
                    $bReturn = false;
                } else {
                    if (!defined('_PS_IMG_DIR')) {
                        define('_PS_IMG_DIR', _PS_ROOT_DIR_ . '/img/');
                    }
                    if (file_exists(_PS_IMG_DIR . 't/' . $sAdminClassName . '.gif')) {
                        @unlink(_PS_IMG_DIR . 't/' . $sAdminClassName . '.gif');
                    }
                }
                unset($oTab);
            }
        }
        unset($mParam);

        return $bReturn;
    }
}