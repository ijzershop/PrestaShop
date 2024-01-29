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

namespace GanalyticsPro\Admin;

use GanalyticsPro\ModuleLib\moduleTools;
use GanalyticsPro\Configuration\moduleConfiguration;

class adminController extends baseController
{
    /**
     * Magic Method __construct
     *
     * @param array $aParams
     */
    public function __construct(array $aParams = null)
    {
        // defines type to execute
        // use case : no key sAction sent in POST mode (no form has been posted => first page is displayed with admin-display.class.php)
        // use case : key sAction sent in POST mode (form or ajax query posted ).
        $sAction = (!\Tools::getIsset('sAction') || (\Tools::getIsset('sAction') && 'display' == \Tools::getValue('sAction'))) ? (\Tools::getIsset('sAction') ? \Tools::getValue('sAction') : 'display') : \Tools::getValue('sAction');

        // set action
        $this->setAction($sAction);

        // set type
        $this->setType();
    }

    /**
     * Magic Method __destruct
     */
    public function __destruct()
    {
    }

    /**
     * run() method execute abstract derived admin object
     *
     * @param array $aRequest : request
     *
     * @return array $aDisplay : empty => false / not empty => true
     */
    public function run($aRequest)
    {
        // set
        $aDisplay = [];
        $aParams = [];

        // include interface
        switch (self::$sAction) {
            case 'display':
                $oAdminType = adminDisplay::create();

                // update new module keys
                moduleTools::updateConfiguration();

                // get configuration options
                moduleTools::getConfiguration();

                // set js msg translation
                moduleTools::translateJsMsg();

                // set params
                $aParams['oJsTranslatedMsg'] = json_encode(moduleConfiguration::getJsMessage());

                // use case - type not define => first page requested
                if (empty(self::$sType)) {
                    // update module if necessary
                    $aParams['aUpdateErrors'] = \GAnalyticsPro::$oModule->updateModule();
                }
                break;
            case 'update':
                $oAdminType = adminUpdate::create();
                break;
            case 'delete':
                // Add class if need
                break;
            case 'send':
                // Add class if need
                break;
            default:
                $oAdminType = false;
                break;
        }

        // process data to use in view (tpl)
        if (!empty($oAdminType)) {
            // execute good action in admin
            // only displayed with key : tpl and assign in order to display good smarty template
            $aDisplay = $oAdminType->run(parent::$sType, $aRequest);

            if (!empty($aDisplay)) {
                $aDisplay['assign'] = array_merge($aDisplay['assign'], $aParams, ['bAddJsCss' => true]);
            }

            // destruct
            unset($oAdminType);
        }

        return $aDisplay;
    }
}
