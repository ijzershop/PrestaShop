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

class BT_GapHookCtrl
{
    /**
     * @var obj $_oHook : defines hook object to display
     */
    private $_oHook = null;

    /**
     * Magic Method __construct assigns few information about module and instantiate parent class
     *
     * @param string $sType : type of interface to execute
     * @param string $sAction
     */
    public function __construct($sType, $sAction)
    {
        // include interface of hook executing
        require_once(_GAP_PATH_LIB_HOOK . 'i-hook_class.php');

        // check if file exists
        if (!file_exists(_GAP_PATH_LIB_HOOK . 'hook-' . $sType . '_class.php')) {
            throw new Exception("no valid file", 130);
        } else {
            // include matched hook object
            require_once(_GAP_PATH_LIB_HOOK . 'hook-' . $sType . '_class.php');

            if (!class_exists('BT_GapHook' . ucfirst($sType))
                && !method_exists('BT_GapHook' . ucfirst($sType), 'run')
            ) {
                throw new Exception("no valid class and method", 131);
            } else {
                // set class name
                $sClassName = 'BT_GapHook' . ucfirst($sType);

                // instantiate
                $this->_oHook = new $sClassName($sAction);
            }
        }
    }

    /**
     * execute hook
     *
     * @param array $aParams
     * @return array $aDisplay : empty => false / not empty => true
     */
    public function run(array $aParams = array())
    {
        return $this->_oHook->run($aParams);
    }
}
