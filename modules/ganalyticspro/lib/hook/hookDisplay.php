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

use GanalyticsPro\ModuleLib\moduleTools;
use GanalyticsPro\Configuration\moduleConfiguration;

class hookDisplay implements hookInterface
{
    /**
     * @var string : define hook type
     */
    protected $sHookType = null;

    /**
     * Magic Method __construct assigns few information about hook
     *
     * @param string
     */
    public function __construct($sHookType)
    {
        // set hook type
        $this->sHookType = $sHookType;
    }

    /**
     * Magic Method __destruct
     */
    public function __destruct()
    {
    }

    /**
     * run() method execute hook
     *
     * @param array $aParams
     *
     * @return array
     */
    public function run(array $aParams = [])
    {
        // set variables
        $aDisplayHook = [];

        switch ($this->sHookType) {
            case 'header':
                // use case - display in header
                $aDisplayHook = call_user_func([$this, 'displayHeader']);
                break;
            default:
                break;
        }

        return $aDisplayHook;
    }

    /**
     * displayHeader() method display header elements
     *
     * @return array
     */
    private function displayHeader()
    {
        $aAssign = [];

        // Use case for G4 code and the value is set
        if (!empty(\GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR'])) {
            $aAssign['btGtagSource'] = 'https://www.googletagmanager.com/gtag/js?id=' . \GAnalyticsPro::$aConfiguration['GAP_GFOUR_ID'] . '';
            $aAssign['btUseGFour'] = \GAnalyticsPro::$aConfiguration['GAP_USE_GFOUR'];

            \Media::addJsDef(['btGapTag' => moduleTools::buildJsTag()]);
            \Context::getContext()->controller->addJS(moduleConfiguration::GAP_URL_JS . 'bt_g4.js');
        }

        return ['tpl' => moduleConfiguration::GAP_TPL_HOOK_PATH . 'header.tpl', 'assign' => $aAssign];
    }
}
