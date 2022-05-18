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

class BT_GapModuleUpdate
{
    /**
     * @var $aErrors : store errors
     */
    public $aErrors = array();

    /**
     * Magic Method __construct
     */
    public function __construct()
    {
    }


    /**
     * run() method execute required function
     *
     * @param string $sType
     * @param array $aParam
     */
    public function run($sType, array $aParam = null)
    {
        // get type
        $sType = empty($sType) ? 'tables' : $sType;

        switch ($sType) {
            case 'tables': // use case - update tables
            case 'fields': // use case - update fields
            case 'hooks': // use case - update hooks
            case 'templates': // use case - update templates
            case 'moduleAdminTab': // use case - update old module admin tab version
                // execute match function
                call_user_func_array(array($this, 'update' . ucfirst($sType)), array($aParam));
                break;
            default:
                break;
        }
    }


    /**
     * updateTables() method update tables if required
     *
     * @param array $aParam
     */
    private function updateTables(array $aParam = null)
    {
        // set transaction
        Db::getInstance()->Execute('BEGIN');

        if (!empty($GLOBALS[_GAP_MODULE_NAME . '_SQL_UPDATE']['table'])) {
            // loop on each elt to update SQL
            foreach ($GLOBALS[_GAP_MODULE_NAME . '_SQL_UPDATE']['table'] as $sTable => $sSqlFile) {
                // execute query
                $bResult = Db::getInstance()->ExecuteS('SHOW TABLES LIKE "' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_' . $sTable . '"');

                // if empty - update
                if (empty($bResult)) {
                    require_once(_GAP_PATH_CONF . 'install.conf.php');
                    require_once(_GAP_PATH_LIB_INSTALL . 'install-ctrl_class.php');

                    // use case - KO update
                    if (!BT_InstallCtrl::run('install', 'sql', _GAP_PATH_SQL . $sSqlFile)) {
                        $this->aErrors[] = array('table' => $sTable, 'file' => $sSqlFile);
                    }
                }
            }
        }

        if (empty($this->aErrors)) {
            Db::getInstance()->Execute('COMMIT');
        } else {
            Db::getInstance()->Execute('ROLLBACK');
        }
    }


    /**
     * updateFields() method update fields if required
     *
     * @param array $aParam
     */
    private function updateFields(array $aParam = null)
    {
        // set transaction
        Db::getInstance()->Execute('BEGIN');

        if (!empty($GLOBALS[_GAP_MODULE_NAME . '_SQL_UPDATE']['field'])) {
            // loop on each elt to update SQL
            foreach ($GLOBALS[_GAP_MODULE_NAME . '_SQL_UPDATE']['field'] as $aOption) {
                // execute query
                $bResult = Db::getInstance()->ExecuteS('SHOW COLUMNS FROM ' . _DB_PREFIX_ . strtolower(_GAP_MODULE_NAME) . '_' . $aOption['table'] . ' LIKE "' . pSQL($aOption['field']) . '"');

                // if empty - update
                if (empty($bResult)) {
                    require_once(_GAP_PATH_CONF . 'install.conf.php');
                    require_once(_GAP_PATH_LIB_INSTALL . 'install-ctrl_class.php');

                    // use case - KO update
                    if (!BT_InstallCtrl::run('install', 'sql', _GAP_PATH_SQL . $aOption['file'])) {
                        $aErrors[] = array(
                            'field' => $aOption['field'],
                            'linked' => $aOption['table'],
                            'file' => $aOption['file']
                        );
                    }
                }
            }
        }

        if (empty($this->aErrors)) {
            Db::getInstance()->Execute('COMMIT');
        } else {
            Db::getInstance()->Execute('ROLLBACK');
        }
    }

    /**
     * updateHooks() method update hooks if required
     *
     * @param array $aParam
     */
    private function updateHooks(array $aParam = null)
    {
        require_once(_GAP_PATH_CONF . 'install.conf.php');
        require_once(_GAP_PATH_LIB_INSTALL . 'install-ctrl_class.php');

        // use case - hook register ko
        if (!BT_InstallCtrl::run('install', 'config', array('bHookOnly' => true))) {
            $this->aErrors[] = array(
                'table' => 'ps_hook_module',
                'file' => GAnalyticsPro::$oModule->l('register hooks KO')
            );
        }
    }


    /**
     * updateTemplates() method update templates if required
     *
     * @param array $aParam
     */
    private function updateTemplates(array $aParam = null)
    {
        require_once(_GAP_PATH_LIB_COMMON . 'dir-reader.class.php');

        // get templates files
        $aTplFiles = BT_MtDirReader::create()->run(array(
            'path' => _GAP_PATH_TPL,
            'recursive' => true,
            'extension' => 'tpl',
            'subpath' => true
        ));

        if (!empty($aTplFiles)) {
            if (!empty(GAnalyticsPro::$bCompare15)) {
                $smarty = Context::getContext()->smarty;
            } else {
                global $smarty;
            }

            if (method_exists($smarty, 'clearCompiledTemplate')) {
                $smarty->clearCompiledTemplate();
            } elseif (method_exists($smarty, 'clear_compiled_tpl')) {
                foreach ($aTplFiles as $aFile) {
                    $smarty->clear_compiled_tpl($aFile['filename']);
                }
            }
        }
    }


    /**
     * updateModuleAdminTab() method update module admin tab in case of an update
     *
     * @param array $aParam
     */
    private function updateModuleAdminTab(array $aParam = null)
    {
        foreach ($GLOBALS[_GAP_MODULE_NAME . '_TABS'] as $sModuleTabName => $aTab) {
            if (isset($aTab['oldName'])) {
                if (Tab::getIdFromClassName($aTab['oldName']) != false) {
                    // include install ctrl class
                    require_once(_GAP_PATH_CONF . 'install.conf.php');
                    require_once(_GAP_PATH_LIB_INSTALL . 'install-ctrl_class.php');

                    // use case - if uninstall succeeded
                    if (BT_InstallCtrl::run('uninstall', 'tab', array('name' => $aTab['oldName']))) {
                        // install new admin tab
                        //						BT_InstallCtrl::run('install', 'tab', array('name' => $sModuleTabName));
                    }
                }
            }
        }
    }

    /**
     * getErrors() method returns errors
     *
     * @return array
     */
    public function getErrors()
    {
        return $this->aErrors;
    }

    /**
     * create() method manages singleton
     *
     * @return obj
     */
    public static function create()
    {
        static $oModuleUpdate;

        if (null === $oModuleUpdate) {
            $oModuleUpdate = new BT_GapModuleUpdate();
        }
        return $oModuleUpdate;
    }
}
