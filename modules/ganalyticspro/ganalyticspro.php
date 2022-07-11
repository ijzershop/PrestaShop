<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech 2022 - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 * @version 2.0.4
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

class GAnalyticsPro extends Module
{
    /**
     * @var array $aConfiguration : array of set configuration
     */
    public static $aConfiguration = array();

    /**
     * @var int $iCurrentLang : store id of default lang
     */
    public static $iCurrentLang = null;

    /**
     * @var int $sCurrentLang : store iso of default lang
     */
    public static $sCurrentLang = null;

    /**
     * @var obj $oCookie : store cookie obj
     */
    public static $oCookie = null;

    /**
     * @var obj $oModule : obj module itself
     */
    public static $oModule = array();

    /**
     * @var string $sQueryMode : query mode - detect XHR
     */
    public static $sQueryMode = null;

    /**
     * @var string $sBASE_URI : base of URI in prestashop
     */
    public static $sBASE_URI = null;

    /**
     * @var array $aErrors : array get error
     */
    public $aErrors = null;

    /**
     * @var int $iShopId : shop id used for 1.5 and for multi shop
     */
    public static $iShopId = 1;

    /**
     * @var bool $bCompare17 : get compare version for PS 1.7
     */
    public static $bCompare17 = false;

    /**
     * @var bool $bCompare1750 : get compare version for PS 1.7.5.0
     */
    public static $bCompare1750 = false;

    /**
     * @var bool $bCompare1780 : get compare version for PS 1.7.5.0
     */
    public static $bCompare1780 = false;

    /**
     * Magic Method __construct assigns few information about module and instantiate parent class
     */
    public function __construct()
    {
        require_once(dirname(__FILE__) . '/conf/common.conf.php');
        require_once(_GAP_PATH_LIB . 'warning_class.php');
        require_once(_GAP_PATH_LIB . 'module-tools_class.php');

        $this->name = 'ganalyticspro';
        $this->module_key = '7814804ce39cacda037743a3b29ee2af';
        $this->tab = 'analytics_stats';
        $this->version = '2.0.4';
        $this->author = 'Business Tech';
        $this->ps_versions_compliancy['min'] = '1.7.4.0';
        $this->need_instance = 1;

        parent::__construct();

        $this->displayName = $this->l('Google Analytics : GA4 and Universal-Analytics');
        $this->description = $this->l('Install the Google Analytics 4 (GA4) tag on your site and collect data for your GA4 and Universal Analytics (UA), with enhanced e-commerce, reports in your Google Analytics account');

        $this->confirmUninstall = $this->l('Are you sure you want to uninstall the module Google Analytics : GA4 and Universal-Analytics (your configuration will be lost)?');

        // get shop id
        self::$iShopId = $this->context->shop->id;

        // get current  lang id
        self::$iCurrentLang = $this->context->cookie->id_lang;

        // get current lang iso
        self::$sCurrentLang = BT_GapModuleTools::getLangIso();

        // get cookie obj
        self::$oCookie = $this->context->cookie;

        // compare PS versions
        self::$bCompare17 = version_compare(_PS_VERSION_, '1.7', '>=');
        self::$bCompare1750 = version_compare(_PS_VERSION_, '1.7.5.0', '>=');
        self::$bCompare1780 = version_compare(_PS_VERSION_, '1.7.8.0', '>=');

        // stock itself obj
        self::$oModule = $this;

        // set base of URI
        self::$sBASE_URI = $this->_path;

        // get configuration options
        BT_GapModuleTools::getConfiguration();

        // get call mode - Ajax or dynamic - used for clean headers and footer in ajax request
        self::$sQueryMode = Tools::getValue('sMode');
    }

    /**
     * install() method installs all mandatory structure (DB or Files) => sql queries and update values and hooks registered
     *
     * @return bool
     */
    public function install()
    {
        require_once(_GAP_PATH_CONF . 'install.conf.php');
        require_once(_GAP_PATH_LIB_INSTALL . 'install-ctrl_class.php');

        // set return
        $bReturn = true;

        if ( !parent::install()
            || !BT_InstallCtrl::run('install', 'sql', _GAP_PATH_SQL . _GAP_INSTALL_SQL_FILE)
            || !BT_InstallCtrl::run('install', 'config')
            || !BT_InstallCtrl::run('install', 'tab')
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
        require_once(_GAP_PATH_CONF . 'install.conf.php');
        require_once(_GAP_PATH_LIB_INSTALL . 'install-ctrl_class.php');

        // set return
        $bReturn = true;

        if ( !parent::uninstall()
            || !BT_InstallCtrl::run('uninstall', 'sql', _GAP_PATH_SQL . _GAP_UNINSTALL_SQL_FILE)
            || !BT_InstallCtrl::run('uninstall', 'config')
            || !BT_InstallCtrl::run('uninstall', 'tab')
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
        require_once(_GAP_PATH_CONF . 'admin.conf.php');
        require_once(_GAP_PATH_LIB_ADMIN . 'base-ctrl_class.php');
        require_once(_GAP_PATH_LIB_ADMIN . 'admin-ctrl_class.php');

        if (empty(GAnalyticsPro::$aConfiguration['GAP_UPDATE_HTML_ELEM'])) {

            // use case 1.7.0 to 1.7.8
            if (!empty(GAnalyticsPro::$bCompare17)) {
                Configuration::updateValue('GAP_JS_CATEGORY_PROD', 'li.product-miniature');
                Configuration::updateValue('GAP_JS_REMOVE_CART', 'a.remove-from-cart');
                Configuration::updateValue('GAP_JS_SHIPPING', 'input[type=radio]');
                Configuration::updateValue('GAP_JS_PAYMENT', '.ps-shown-by-js');
                Configuration::updateValue('GAP_JS_LOGIN', 'button#submit-login');
                Configuration::updateValue('GAP_JS_SIGNUP', 'div.no-account');
                Configuration::updateValue('GAP_JS_WISH_CAT', 'button.wishlist-button-add');
                Configuration::updateValue('GAP_JS_WISH_PROD', 'button.wishlist-button-add');
                Configuration::updateValue('GAP_UPDATE_HTML_ELEM', true);
            }

            if (!empty(GAnalyticsPro::$bCompare1780)) {
                Configuration::updateValue('GAP_JS_CATEGORY_PROD', 'article.product-miniature');
                Configuration::updateValue('GAP_JS_REMOVE_CART', 'a.remove-from-cart');
                Configuration::updateValue('GAP_JS_SHIPPING', 'input[type=radio]');
                Configuration::updateValue('GAP_JS_PAYMENT', '.ps-shown-by-js');
                Configuration::updateValue('GAP_JS_LOGIN', 'button#submit-login');
                Configuration::updateValue('GAP_JS_SIGNUP', 'div.no-account');
                Configuration::updateValue('GAP_JS_WISH_CAT', 'button.wishlist-button-add');
                Configuration::updateValue('GAP_JS_WISH_PROD', 'button.wishlist-button-add');
                Configuration::updateValue('GAP_UPDATE_HTML_ELEM', true);
            }
        }

        // set
        $aUpdateModule = array();

        try {
            // get controller type
            $sControllerType = (!Tools::getIsset(_GAP_PARAM_CTRL_NAME) || (Tools::getIsset(_GAP_PARAM_CTRL_NAME) && 'admin' == Tools::getValue(_GAP_PARAM_CTRL_NAME))) ? (Tools::getIsset(_GAP_PARAM_CTRL_NAME) ? Tools::getValue(_GAP_PARAM_CTRL_NAME) : 'admin') : Tools::getValue(_GAP_PARAM_CTRL_NAME);

            // instantiate matched controller object
            $oCtrl = BT_GapBaseCtrl::get($sControllerType);

            // execute good action in admin
            // only displayed with key : tpl and assign in order to display good smarty template
            $aDisplay = $oCtrl->run(array_merge($_GET, $_POST));

            // free memory
            unset($oCtrl);

            if (!empty($aDisplay)) {
                $aDisplay['assign'] = array_merge($aDisplay['assign'], array(
                    'aUpdateErrors' => $aUpdateModule,
                    'oJsTranslatedMsg' => BT_GapModuleTools::jsonEncode($GLOBALS[_GAP_MODULE_NAME . '_JS_MSG'])
                ));

                // get content
                $sContent = $this->displayModule($aDisplay['tpl'], $aDisplay['assign']);

                if (!empty(self::$sQueryMode)) {
                    echo $sContent;
                } else {
                    return $sContent;
                }
            } else {
                throw new Exception('action returns empty content', 110);
            }
        } catch (Exception $e) {
            $this->aErrors[] = array('msg' => $e->getMessage(), 'code' => $e->getCode());

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
        return ($this->_execHook('display', 'header'));
    }

    /**
     * hookDisplayHome() method displays Google Analytics
     *
     * @return string
     */
    public function hookDisplayHome()
    {
        return ($this->_execHook('display', 'home'));
    }

    /**
     * hookActionOrderStatusUpdate() method displays Google Analytics
     *
     * @param array $aParams
     * @return string
     */
    public function hookActionOrderStatusUpdate(array $aParams)
    {
        return ($this->_execHook('action', 'orderStatusUpdate', $aParams));
    }

    /**
     * _execHook() method displays selected hook content
     *
     * @param string $sHookType
     * @param array $aParams
     * @return string
     */
    private function _execHook($sHookType, $sAction, array $aParams = array())
    {
        // include
        require_once(_GAP_PATH_CONF . 'hook.conf.php');
        require_once(_GAP_PATH_LIB_HOOK . 'hook-ctrl_class.php');

        try {
            // define which hook class is executed in order to display good content in good zone in shop
            $oHook = new BT_GAPHookCtrl($sHookType, $sAction);

            // displays good block content
            $aDisplay = $oHook->run($aParams);

            // free memory
            unset($oHook);

            //execute good action in admin
            //only displayed with key : tpl and assign in order to display good smarty template
            if (!empty($aDisplay)) {
                return $this->displayModule($aDisplay['tpl'], $aDisplay['assign']);
            } else {
                throw new Exception('Choosen hook returns empty content', 110);
            }
        } catch (Exception $e) {
            $this->aErrors[] = array('msg' => $e->getMessage(), 'code' => $e->getCode());

            return $this->displayErrorModule();
        }
    }

    /**
     * setErrorHandler() method manages module error
     *
     * @param string $sTplName
     * @param array $aAssign
     */
    public function setErrorHandler($iErrno, $sErrstr, $sErrFile, $iErrLine, $aErrContext)
    {
        switch ($iErrno) {
            case E_USER_ERROR:
                $this->aErrors[] = array(
                    'msg' => 'Fatal error <b>' . $sErrstr . '</b>',
                    'code' => $iErrno,
                    'file' => $sErrFile,
                    'line' => $iErrLine,
                    'context' => $aErrContext
                );
                break;
            case E_USER_WARNING:
                $this->aErrors[] = array(
                    'msg' => 'Warning <b>' . $sErrstr . '</b>',
                    'code' => $iErrno,
                    'file' => $sErrFile,
                    'line' => $iErrLine,
                    'context' => $aErrContext
                );
                break;
            case E_USER_NOTICE:
                $this->aErrors[] = array(
                    'msg' => 'Notice <b>' . $sErrstr . '</b>',
                    'code' => $iErrno,
                    'file' => $sErrFile,
                    'line' => $iErrLine,
                    'context' => $aErrContext
                );
                break;
            default:
                $this->aErrors[] = array(
                    'msg' => 'Unknow error <b>' . $sErrstr . '</b>',
                    'code' => $iErrno,
                    'file' => $sErrFile,
                    'line' => $iErrLine,
                    'context' => $aErrContext
                );
                break;
        }
        return ($this->displayErrorModule());
    }

    /**
     * displayModule() method displays views
     *
     * @param string $sTplName
     * @param array $aAssign
     * @param bool $bUseCache
     * @param int $iICacheId
     * @return string html
     */
    public function displayModule($sTplName, $aAssign, $bUseCache = false, $iICacheId = null)
    {
        if (file_exists(_GAP_PATH_TPL . $sTplName) && is_file(_GAP_PATH_TPL . $sTplName)) {
            $aAssign = array_merge(
                $aAssign,
                array('sModuleName' => Tools::strtolower(_GAP_MODULE_NAME), 'bDebug' => _GAP_DEBUG)
            );

            // use cache
            if (!empty($bUseCache) && !empty($iICacheId)) {
                return ($this->display(__FILE__, $sTplName, $this->getCacheId($iICacheId)));
            } // not use cache
            else {
                $this->context->smarty->assign($aAssign);

                return ($this->display(__FILE__, _GAP_PATH_TPL_NAME . $sTplName));
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
     * @return string html
     */
    public function displayErrorModule()
    {
        $this->context->smarty->assign(
            array(
                'sHomeURI' => BT_GapModuleTools::truncateUri(),
                'aErrors' => $this->aErrors,
                'sModuleName' => Tools::strtolower(_GAP_MODULE_NAME),
                'bDebug' => _GAP_DEBUG,
            )
        );

        $sSubpath = (Tools::getValue('token')) ? _GAP_TPL_ADMIN_PATH : _GAP_TPL_HOOK_PATH;

        return ($this->display(__FILE__, _GAP_PATH_TPL_NAME . $sSubpath . _GAP_TPL_ERROR));
    }

    /**
     * updateModule() method updates module as necessary
     * @return array
     */
    public function updateModule()
    {
        require(_GAP_PATH_LIB . 'module-update_class.php');

        // check if update tables
        BT_GapModuleUpdate::create()->run('tables');

        // check if update fields
        BT_GapModuleUpdate::create()->run('fields');

        // check if update hooks
        BT_GapModuleUpdate::create()->run('hooks');

        // check if update templates
        BT_GapModuleUpdate::create()->run('templates');

        // check if update admin tab
        BT_GapModuleUpdate::create()->run('moduleAdminTab');

        return (BT_GapModuleUpdate::create()->aErrors);
    }
}
