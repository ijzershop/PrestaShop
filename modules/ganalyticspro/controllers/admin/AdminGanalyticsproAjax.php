<?php
/**
 * Google Analyics Pro
 * 
 *
 * @author    BusinessTech.fr
 * @copyright Business Tech
 * @license   Commercial
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

class AdminGanalyticsproAjaxController extends ModuleAdminController
{
    public $ssl = true;

    /**
     * init() method init module front controller
     */
    public function init()
    {
        // exec parent
        parent::init();

        // include main module class
        require_once($this->module->getLocalPath() . 'ganalyticspro.php');
        require_once(_GAP_PATH_CONF . 'hook.conf.php');
        require_once(_GAP_PATH_LIB_HOOK . 'hook-ctrl_class.php');

        // get the action to execute
        $sAction = Tools::getIsset('action') ? Tools::getValue('action') : 'orderConfirmation';

        if (!empty($sAction)) {
            // instantiate
            $oModule = new GAnalyticsPro();

            // instantiate the hook ctrl
            $oHook = new BT_GapHookCtrl('action', $sAction);

            // execute the good action
            $aContent = $oHook->run(array('employee' => true));

            unset($oModule);
            unset($aContent);
        }
    }
}
