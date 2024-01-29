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

namespace GanalyticsPro\Hook;

class hookController
{
    /**
     * @var obj : defines hook object to display
     */
    private $oHook = null;

    /**
     * Magic Method __construct assigns few information about module and instantiate parent class
     *
     * @param string $sType : type of interface to execute
     * @param string $sAction
     */
    public function __construct($sType, $sAction)
    {
        if ($sType == 'display') {
            $this->oHook = new hookDisplay($sAction);
        } elseif ($sType == 'action') {
            $this->oHook = new hookAction($sAction);
        } else {
            return '';
        }
    }

    /**
     * execute hook
     *
     * @param array $aParams
     *
     * @return array $aDisplay : empty => false / not empty => true
     */
    public function run(array $aParams = [])
    {
        return $this->oHook->run($aParams);
    }
}
