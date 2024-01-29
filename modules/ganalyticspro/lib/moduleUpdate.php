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

namespace GanalyticsPro\ModuleLib;

use GanalyticsPro\Common\dirReader;
use GanalyticsPro\Install\installController;
use GanalyticsPro\Configuration\moduleConfiguration;

class moduleUpdate
{
    /**
     * @var : store errors
     */
    public $aErrors = [];

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
                call_user_func_array([$this, 'update' . ucfirst($sType)], [$aParam]);
                break;
            default:
                break;
        }
    }

    /**
     * _updateTables() method update tables if required
     *
     * @param array $aParam
     */
    private function updateTables(array $aParam = null)
    {
        // set transaction
        \Db::getInstance()->Execute('BEGIN');

        if (!empty(moduleConfiguration::getSqlUpdateData()['table'])) {
            $iCount = 1;
            // loop on each elt to update SQL
            foreach (moduleConfiguration::getSqlUpdateData()['table'] as $sTable => $sSqlFile) {
                // execute query
                $bResult = \Db::getInstance()->ExecuteS('SHOW TABLES LIKE "' . _DB_PREFIX_ . strtolower(moduleConfiguration::GAP_MODULE_NAME) . '_' . \bqSQL($sTable) . '"');

                // if empty - update
                if (empty($bResult)) {
                    // use case - KO update
                    if (!installController::run('install', 'sql', moduleConfiguration::GAP_PATH_SQL . $sSqlFile)) {
                        $this->aErrors[] = [
                            'msg' => \GanalyticsPro::$oModule->l('An error occurred while updating the SQL table', 'moduleUpdate'),
                            'code' => intval(190 + $iCount),
                            'file' => $sSqlFile,
                            'context' => \GanalyticsPro::$oModule->l('SQL table involved: ', 'moduleUpdate') . $sTable,
                        ];
                        $iCount++;
                    }
                }
            }
        }

        if (empty($this->aErrors)) {
            \Db::getInstance()->Execute('COMMIT');
        } else {
            \Db::getInstance()->Execute('ROLLBACK');
        }
    }

    /**
     * _updateFields() method update fields if required
     *
     * @param array $aParam
     */
    private function updateFields(array $aParam = null)
    {
        // set transaction
        \Db::getInstance()->Execute('BEGIN');

        if (!empty(moduleConfiguration::getSqlUpdateData()['field'])) {
            $iCount = 1;
            // loop on each elt to update SQL
            foreach (moduleConfiguration::getSqlUpdateData()['field'] as $sFieldName => $aOption) {
                // execute query
                $bResult = \Db::getInstance()->ExecuteS('SHOW COLUMNS FROM ' . _DB_PREFIX_ . strtolower(moduleConfiguration::GAP_MODULE_NAME) . '_' . \bqSQL($aOption['table']) . ' LIKE "' . \pSQL($sFieldName) . '"');

                // if empty - update
                if (empty($bResult)) {
                    // use case - KO update
                    if (!installController::run('install', 'sql', moduleConfiguration::GAP_PATH_SQL . $aOption['file'])) {
                        $aErrors[] = [
                            'field' => $sFieldName,
                            'linked' => $aOption['table'],
                            'file' => $aOption['file'],
                        ];
                        $this->aErrors[] = [
                            'msg' => \GanalyticsPro::$oModule->l('An error occurred while updating the SQL field', 'moduleUpdate'),
                            'code' => intval(180 + $iCount),
                            'file' => $aOption['file'],
                            'context' => \GanalyticsPro::$oModule->l('SQL field involved: ', 'moduleUpdate') . $sFieldName,
                        ];
                        $iCount++;
                    }
                }
            }
        }

        if (empty($this->aErrors)) {
            \Db::getInstance()->Execute('COMMIT');
        } else {
            \Db::getInstance()->Execute('ROLLBACK');
        }
    }

    /**
     * _updateHooks() method update hooks if required
     *
     * @param array $aParam
     */
    private function updateHooks(array $aParam = null)
    {
        // use case - hook register ko
        if (!installController::run('install', 'config', ['bHookOnly' => true])) {
            $this->aErrors[] = [
                'msg' => \GanalyticsPro::$oModule->l('An error occurred while updating the hooks', 'moduleUpdate'),
                'code' => 170,
                'file' => \GanalyticsPro::$oModule->l('An error occurred while updating the hooks', 'moduleUpdate'),
                'context' => \GanalyticsPro::$oModule->l('An error occurred while updating the hooks', 'moduleUpdate'),
            ];
        }
    }

    /**
     * updateTemplates() method update templates if required
     *
     * @param array $aParam
     */
    private function updateTemplates(array $aParam = null)
    {
        // get templates files
        $aTplFiles = dirReader::create()->run([
            'path' => moduleConfiguration::GAP_PATH_TPL,
            'recursive' => true,
            'extension' => 'tpl',
            'subpath' => true,
        ]);

        if (!empty($aTplFiles)) {
            if (!empty(\GAnalyticsPro::$bCompare15)) {
                $smarty = \Context::getContext()->smarty;
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
     * _updateModuleAdminTab() method update module admin tab in case of an update
     *
     * @param array $aParam
     */
    private function updateModuleAdminTab(array $aParam = null)
    {
        foreach (moduleConfiguration::GAP_TABS as $sModuleTabName => $aTab) {
            if (isset($aTab['oldName'])) {
                if (\Tab::getIdFromClassName($aTab['oldName']) != false) {
                    // use case - if uninstall succeeded
                    if (installController::run('uninstall', 'tab', ['name' => $aTab['oldName']])) {
                        // install new admin tab
                        installController::run('install', 'tab', ['name' => $sModuleTabName]);
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
            $oModuleUpdate = new moduleUpdate();
        }
        return $oModuleUpdate;
    }
}
