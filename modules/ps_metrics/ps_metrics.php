<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

class Ps_metrics extends Module
{
    /** @var string */
    public $oauthAdminController;

    /** @var array */
    public $controllers;

    /** @var bool */
    public $psVersionIs17;

    /** @var array */
    public $moduleSubstitution;

    /** @var string */
    public $ajaxDashboardController;

    /** @var string */
    public $ajaxSettingsController;

    /** @var bool */
    public $bootstrap;

    /** @var string */
    public $confirmUninstall;

    /** @var \PrestaShop\ModuleLibServiceContainer\DependencyInjection\ServiceContainer */
    private $container;

    public function __construct()
    {
        $this->name = 'ps_metrics';
        $this->tab = 'advertising_marketing';
        $this->version = '1.0.1';
        $this->author = 'PrestaShop';
        $this->need_instance = 0;
        $this->module_key = '697657ffe038d20741105e95a10b12d1';
        $this->bootstrap = false;
        $this->oauthAdminController = 'AdminOauthCallback';
        $this->ajaxDashboardController = 'AdminAjaxDashboard';
        $this->ajaxSettingsController = 'AdminAjaxSettings';
        $this->controllers = [
            $this->oauthAdminController,
            $this->ajaxDashboardController,
            $this->ajaxSettingsController,
        ];
        $this->moduleSubstitution = [
            'dashactivity',
            'dashtrends',
            'dashgoals',
            'dashproducts',
        ];

        parent::__construct();

        $this->displayName = $this->l('Prestashop Metrics');
        $this->description = $this->l('Module for Prestashop Metrics.');
        $this->psVersionIs17 = (bool) version_compare(_PS_VERSION_, '1.7', '>=');
        $this->confirmUninstall = $this->l('Are you sure you want to uninstall this module?');
        $this->ps_versions_compliancy = ['min' => '1.6', 'max' => _PS_VERSION_];

        if ($this->container === null) {
            $this->container = new \PrestaShop\ModuleLibServiceContainer\DependencyInjection\ServiceContainer($this->name, $this->getLocalPath());
        }
    }

    /**
     * This method is trigger at the installation of the module
     *
     * @return bool
     */
    public function install()
    {
        $installModule = new \PrestaShop\Module\Ps_metrics\Module\Install($this);

        /** @var PrestaShop\Module\Ps_metrics\Tracker\Segment $segment */
        $segment = $this->container->getService('ps_metrics.tracker.segment');
        $segment->setMessage('Install module');
        $segment->track();

        return parent::install() &&
            $this->registerHook('dashboardZoneTwo') &&
            $installModule->updateModuleHookPosition('dashboardZoneTwo', 0) &&
            $installModule->setConfigurationValues() &&
            $installModule->installTabs() &&
            (new PrestaShop\AccountsAuth\Installer\Install())->installPsAccounts();
    }

    /**
     * Triggered at the uninstall of the module
     *
     * @return bool
     */
    public function uninstall()
    {
        $uninstallModule = new \PrestaShop\Module\Ps_metrics\Module\Uninstall($this);

        /** @var PrestaShop\Module\Ps_metrics\Tracker\Segment $segment */
        $segment = $this->container->getService('ps_metrics.tracker.segment');
        $segment->setMessage('Uninstall module');
        $segment->track();

        return parent::uninstall() &&
            $uninstallModule->resetConfigurationValues() &&
            $uninstallModule->uninstallTabs() &&
            $uninstallModule->enableModules() &&
            $uninstallModule->unsubscribePsEssentials();
    }

    /**
     * Activate current module.
     *
     * @param bool $force_all If true, enable module for all shop
     *
     * @return bool
     */
    public function enable($force_all = false)
    {
        /** @var PrestaShop\Module\Ps_metrics\Tracker\Segment $segment */
        $segment = $this->container->getService('ps_metrics.tracker.segment');
        $segment->setMessage('Enable module');
        $segment->track();

        return parent::enable($force_all);
    }

    /**
     * Desactivate current module.
     *
     * @param bool $force_all If true, disable module for all shop
     *
     * @return bool
     */
    public function disable($force_all = false)
    {
        /** @var PrestaShop\Module\Ps_metrics\Tracker\Segment $segment */
        $segment = $this->container->getService('ps_metrics.tracker.segment');
        $segment->setMessage('Disable module');
        $segment->track();

        return parent::disable($force_all);
    }

    /**
     * Load the configuration form.
     *
     * @return string
     */
    public function getContent()
    {
        $this->loadAssets(\Tools::getValue('google_message_error'), \Tools::getValue('countProperty'));
        $this->loadPsAccountsAssets();

        return $this->display(__FILE__, '/views/templates/admin/app.tpl');
    }

    /**
     * hookDashboardZoneTwo
     *
     * @return string
     */
    public function hookDashboardZoneTwo()
    {
        $this->loadAssets();

        return $this->display(__FILE__, '/views/templates/hook/HookDashboardZoneTwo.tpl');
    }

    /**
     * Load VueJs App and set JS variable for Vuex
     *
     * @param string $responseApiMessage
     * @param int $countProperty
     *
     * @return void
     */
    protected function loadAssets($responseApiMessage = 'null', $countProperty = 0)
    {
        $this->context->smarty->assign('pathVendor', $this->_path . 'views/js/chunk-vendors.js');
        $this->context->smarty->assign('pathApp', $this->_path . 'views/js/app.js');
        Media::addJsDef([
            'storePsMetrics' => (new PrestaShop\Module\Ps_metrics\Presenter\Store\StorePresenter($this, $this->context, null, (string) $responseApiMessage, (int) $countProperty))->present(),
        ]);
    }

    /**
     * See https://github.com/PrestaShopCorp/prestashop_accounts_auth
     *
     * @return void
     */
    protected function loadPsAccountsAssets()
    {
        Media::addJsDef([
            'contextPsAccounts' => (new PrestaShop\AccountsAuth\Presenter\PsAccountsPresenter($this->name))->present(),
        ]);
    }

    /**
     * Retrieve service
     *
     * @param string $serviceName
     *
     * @return object|null
     */
    public function getService($serviceName)
    {
        if ($this->container === null) {
            $this->container = new \PrestaShop\ModuleLibServiceContainer\DependencyInjection\ServiceContainer($this->name, $this->getLocalPath());
        }

        return $this->container->getService($serviceName);
    }
}
