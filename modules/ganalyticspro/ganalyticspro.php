<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech 2023 - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 * @version 2.1.6
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */
if (!defined('_PS_VERSION_')) {
    exit(1);
}

require_once dirname(__FILE__) . '/vendor/autoload.php';

use GanalyticsPro\Hook\hookController;
use GanalyticsPro\Admin\baseController;
use GanalyticsPro\ModuleLib\moduleTools;
use GanalyticsPro\ModuleLib\moduleUpdate;
use GanalyticsPro\Install\installController;
use GanalyticsPro\Configuration\moduleConfiguration;

class GAnalyticsPro extends Module
{
    /**
     * @var array : array of set configuration
     */
    public static $aConfiguration = [];

    /**
     * @var int : store id of default lang
     */
    public static $iCurrentLang = null;

    /**
     * @var int : store iso of default lang
     */
    public static $sCurrentLang = null;

    /**
     * @var obj : store cookie obj
     */
    public static $oCookie = null;

    /**
     * @var obj : obj module itself
     */
    public static $oModule = [];

    /**
     * @var string : query mode - detect XHR
     */
    public static $sQueryMode = null;

    /**
     * @var string : base of URI in prestashop
     */
    public static $sBASE_URI = null;

    /**
     * @var array : array get error
     */
    public $aErrors = null;

    /**
     * @var int : shop id used for 1.5 and for multi shop
     */
    public static $iShopId = 1;

    /**
     * @var bool : get compare version for PS 1.7
     */
    public static $bCompare17 = false;

    /**
     * @var bool
     */
    public static $bCompare1750 = false;

    /**
     * @var bool
     */
    public static $bCompare1780 = false;

    /**
     * @var bool
     */
    public static $bCompare80 = false;

    /**
     * @var obj : get context object
     */
    public static $oContext;

    /**
     * Magic Method __construct assigns few information about module and instantiate parent class
     */
    public function __construct()
    {
        $this->name = 'ganalyticspro';
        $this->module_key = '7814804ce39cacda037743a3b29ee2af';
        $this->tab = 'analytics_stats';
        $this->version = '2.1.6';
        $this->author = 'Business Tech';
        $this->ps_versions_compliancy['min'] = '1.7.4.0';
        $this->need_instance = 1;

        parent::__construct();

        $this->displayName = $this->l('Google Analytics : GA4 and Universal-Analytics');
        $this->description = $this->l('Install the Google Analytics 4 (GA4) tag on your site and collect data for your GA4 and Universal Analytics (UA), with enhanced e-commerce, reports in your Google Analytics account');

        $this->confirmUninstall = $this->l('Are you sure you want to uninstall the module Google Analytics : GA4 and Universal-Analytics (your configuration will be lost)?');
        self::$iShopId = $this->context->shop->id;
        self::$iCurrentLang = $this->context->cookie->id_lang;
        self::$oCookie = $this->context->cookie;
        self::$bCompare17 = version_compare(_PS_VERSION_, '1.7', '>=');
        self::$bCompare1750 = version_compare(_PS_VERSION_, '1.7.5.0', '>=');
        self::$bCompare1780 = version_compare(_PS_VERSION_, '1.7.8.0', '>=');
        self::$bCompare80 = version_compare(_PS_VERSION_, '8.0.0', '>=');
        self::$oModule = $this;
        self::$sBASE_URI = $this->_path;
        moduleTools::getConfiguration();
        self::$sCurrentLang = moduleTools::getLangIso();
        self::$sQueryMode = \Tools::getValue('sMode');
        self::$oContext = $this->context;
    }

    /**
     * install() method installs all mandatory structure (DB or Files) => sql queries and update values and hooks registered
     *
     * @return bool
     */
    public function install()
    {
        // set return
        $bReturn = true;

        if (
            !parent::install()
            || !installController::run('install', 'sql', moduleConfiguration::GAP_PATH_SQL . moduleConfiguration::GAP_INSTALL_SQL_FILE)
            || !installController::run('install', 'config', ['bConfigOnly' => true])
        ) {
            $bReturn = false;
        }

        return $bReturn;
    }

    /**
     * uninstall() method uninstalls all mandatory structure (DB or Files)
     *
     * @return bool
     */
    public function uninstall()
    {
        // set return
        $bReturn = true;

        if (
            !parent::uninstall()
            || !installController::run('uninstall', 'sql', moduleConfiguration::GAP_PATH_SQL . moduleConfiguration::GAP_UNINSTALL_SQL_FILE)
            || !installController::run('uninstall', 'config')
        ) {
            $bReturn = false;
        }

        return $bReturn;
    }

    /**
     * getContent() method manages all data in Back Office
     *
     * @return string
     */
    public function getContent()
    {
        if (empty(\GAnalyticsPro::$aConfiguration['GAP_UPDATE_HTML_ELEM'])) {
            \Configuration::updateValue('GAP_JS_CATEGORY_PROD', 'article.product-miniature');
            \Configuration::updateValue('GAP_JS_SHIPPING', 'input[type=radio]');
            \Configuration::updateValue('GAP_JS_PAYMENT', '.ps-shown-by-js');
            \Configuration::updateValue('GAP_JS_LOGIN', 'button#submit-login');
            \Configuration::updateValue('GAP_JS_SIGNUP', 'div.no-account');
            \Configuration::updateValue('GAP_JS_WISH_CAT', 'button.wishlist-button-add');
            \Configuration::updateValue('GAP_JS_WISH_PROD', 'button.wishlist-button-add');
            \Configuration::updateValue('GAP_UPDATE_HTML_ELEM', true);
        }

        // set
        $aUpdateModule = [];

        try {
            // get controller type
            $sControllerType = (!\Tools::getIsset(moduleConfiguration::GAP_PARAM_CTRL_NAME) || (\Tools::getIsset(moduleConfiguration::GAP_PARAM_CTRL_NAME) && 'admin' == \Tools::getValue(moduleConfiguration::GAP_PARAM_CTRL_NAME))) ? (\Tools::getIsset(moduleConfiguration::GAP_PARAM_CTRL_NAME) ? \Tools::getValue(moduleConfiguration::GAP_PARAM_CTRL_NAME) : 'admin') : \Tools::getValue(moduleConfiguration::GAP_PARAM_CTRL_NAME);

            // instantiate matched controller object
            $oCtrl = baseController::get($sControllerType);

            // execute good action in admin
            // only displayed with key : tpl and assign in order to display good smarty template
            $aDisplay = $oCtrl->run(array_merge($_GET, $_POST));

            // free memory
            unset($oCtrl);

            if (!empty($aDisplay)) {
                $aDisplay['assign'] = array_merge($aDisplay['assign'], [
                    'aUpdateErrors' => $aUpdateModule,
                    'oJsTranslatedMsg' => json_encode(moduleConfiguration::getJsMessage()),
                ]);

                // get content
                $sContent = $this->displayModule($aDisplay['tpl'], $aDisplay['assign']);

                if (!empty(self::$sQueryMode)) {
                    echo $sContent;
                } else {
                    return $sContent;
                }
            } else {
                throw new \Exception('action returns empty content', 110);
            }
        } catch (\Exception $e) {
            $this->aErrors[] = ['msg' => $e->getMessage(), 'code' => $e->getCode()];

            // get content
            $sContent = $this->displayErrorModule();

            if (!empty(self::$sQueryMode)) {
                echo $sContent;
            } else {
                return $sContent;
            }
        }
        // exit clean with XHR mode
        if (!empty(self::$sQueryMode)) {
            exit(0);
        }
    }

    /**
     * hookDisplayHeader() method displays Google Analytics
     *
     * @return string
     */
    public function hookDisplayHeader()
    {
        return $this->_execHook('display', 'header');
    }

    /**
     * hookDisplayHome() method displays Google Analytics
     *
     * @return string
     */
    public function hookDisplayHome()
    {
        return $this->_execHook('display', 'home');
    }

    /**
     * hookActionOrderStatusUpdate() method displays Google Analytics
     *
     * @param array $aParams
     *
     * @return string
     */
    public function hookActionOrderStatusUpdate(array $aParams)
    {
        return $this->_execHook('action', 'orderStatusUpdate', $aParams);
    }

    /**
     * _execHook() method displays selected hook content
     *
     * @param string $sHookType
     * @param array $aParams
     *
     * @return string
     */
    private function _execHook($sHookType, $sAction, array $aParams = [])
    {
        try {
            // define which hook class is executed in order to display good content in good zone in shop
            $oHook = new hookController($sHookType, $sAction);

            // displays good block content
            $aDisplay = $oHook->run($aParams);

            // free memory
            unset($oHook);

            // execute good action in admin
            // only displayed with key : tpl and assign in order to display good smarty template
            if (!empty($aDisplay)) {
                return $this->displayModule($aDisplay['tpl'], $aDisplay['assign']);
            } else {
                throw new \Exception('Choosen hook returns empty content', 110);
            }
        } catch (\Exception $e) {
            $this->aErrors[] = ['msg' => $e->getMessage(), 'code' => $e->getCode()];

            return $this->displayErrorModule();
        }
    }

    /**
     * displayModule() method displays views
     *
     * @param string $sTplName
     * @param array $aAssign
     * @param bool $bUseCache
     * @param int $iICacheId
     *
     * @return string html
     */
    public function displayModule($sTplName, $aAssign, $bUseCache = false, $iICacheId = null)
    {
        if (file_exists(_PS_MODULE_DIR_ . 'ganalyticspro/views/templates/' . $sTplName) && is_file(_PS_MODULE_DIR_ . 'ganalyticspro/views/templates/' . $sTplName)) {
            $aAssign = array_merge(
                $aAssign,
                ['sModuleName' => \Tools::strtolower(moduleConfiguration::GAP_MODULE_NAME), 'bDebug' => moduleConfiguration::GAP_DEBUG]
            );

            // use cache
            if (!empty($bUseCache) && !empty($iICacheId)) {
                return $this->display(__FILE__, $sTplName, $this->getCacheId($iICacheId))
                ;
            } // not use cache
            else {
                self::$oContext->smarty->assign($aAssign);

                return $this->display(__FILE__, 'views/templates/' . $sTplName)
                ;
            }
        } else {
            throw new Exception('Template "' . $sTplName . '" doesn\'t exists', 120);
        }
    }

    /**
     * displayErrorModule() method displays view with error
     *
     * @param string $sTplName
     * @param array $aAssign
     *
     * @return string html
     */
    public function displayErrorModule()
    {
        $this->context->smarty->assign(
            [
                'sHomeURI' => moduleTools::truncateUri(),
                'aErrors' => $this->aErrors,
                'sModuleName' => \Tools::strtolower(moduleConfiguration::GAP_MODULE_NAME),
                'bDebug' => moduleConfiguration::GAP_DEBUG,
            ]
        );

        return $this->display(__FILE__, 'views/templates/admin/error.tpl');
    }

    /**
     * updateModule() method updates module as necessary
     *
     * @return array
     */
    public function updateModule()
    {
        // check if update tables
        moduleUpdate::create()->run('tables');

        // check if update fields
        moduleUpdate::create()->run('fields');

        // check if update hooks
        moduleUpdate::create()->run('hooks');

        // check if update templates
        moduleUpdate::create()->run('templates');

        // check if update admin tab
        moduleUpdate::create()->run('moduleAdminTab');

        return moduleUpdate::create()->aErrors;
    }
}
