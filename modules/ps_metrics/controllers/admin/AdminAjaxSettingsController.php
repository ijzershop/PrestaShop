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

use PrestaShop\AccountsAuth\Service\PsBillingService;
use PrestaShop\Module\Ps_metrics\Api\Analytics\Accounts;
use PrestaShop\Module\Ps_metrics\Cache\DataCache;
use PrestaShop\Module\Ps_metrics\Helper\JsonHelper;
use PrestaShop\Module\Ps_metrics\Module\Uninstall;
use PrestaShop\Module\Ps_metrics\Provider\AnalyticsAccountsListProvider;
use PrestaShop\Module\Ps_metrics\Provider\GoogleTagProvider;
use PrestaShop\Module\Ps_metrics\Provider\ShopsProvider;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;
use PrestaShop\Module\Ps_metrics\Validation\AjaxProcessSelectAccountAnalytics;

class AdminAjaxSettingsController extends ModuleAdminController
{
    /**
     * @var JsonHelper
     */
    private $jsonHelper;

    /**
     * Load JsonHelper to avoid jsonEncode issues on AjaxDie
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->jsonHelper = new JsonHelper();
    }

    /**
     * Get all existing Google Tags in Front End shop and retrieve them
     *
     * @return void
     */
    public function ajaxProcessGetExistingGoogleTags()
    {
        $configurationRepo = new ConfigurationRepository();

        // If google Tag is already set as linked, we avoid to retrieve the Google Tag
        // Only the PSL will tell us if we sould retrieve TAGS again
        if (true === $configurationRepo->getGoogleTagLinkedValue()) {
            $this->ajaxDie('true');
        }

        $currentShop = (new ShopsProvider())->getShopUrl($this->context->shop->id);
        $findGoogleTag = new GoogleTagProvider($currentShop['url']);

        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'analytics' => $findGoogleTag->findGoogleTagsAnalytics(),
            'manager' => $findGoogleTag->findGoogleTagsManager(),
        ]));
    }

    /**
     * Select a Google Account for psessentials
     * Need webPropertyId and viewId. Returns 201 if done
     *
     * @return void
     */
    public function ajaxProcessSelectAccountAnalytics()
    {
        $this->deleteExistingCache();
        $validateData = (new AjaxProcessSelectAccountAnalytics())->validate([
            'webPropertyId' => Tools::getValue('webPropertyId'),
            'viewId' => Tools::getValue('viewId'),
        ]);

        if (false === $validateData) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
            ]));
        }

        $analyticsAccount = new Accounts();
        $analyticsAccount->create();
        $serviceResult = $analyticsAccount->setAccountSelection([
            'webPropertyId' => Tools::getValue('webPropertyId'),
            'viewId' => Tools::getValue('viewId'),
        ]);

        if (201 !== $serviceResult['httpCode']) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
                'googleAccount' => [],
            ]));
        }
        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'success' => true,
            'googleAccount' => [
                'webPropertyId' => Tools::getValue('webPropertyId'),
                'view_id' => Tools::getValue('viewId'),
                'username' => Tools::getValue('username'),
                'webPropertyName' => Tools::getValue('webPropertyName'),
            ],
        ]));
    }

    /**
     * Google Analytics Logout must enable disabled modules, unsubscribe from PsEssentials
     * Also, it must reset configuration's values
     *
     * @return void
     */
    public function ajaxProcessLogOut()
    {
        $this->deleteExistingCache();
        $uninstallGoogleAccount = new Uninstall($this->module);

        if (false === $uninstallGoogleAccount->unsubscribePsEssentials()) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
                'googleLinked' => true,
            ]));
        }

        if (false === $uninstallGoogleAccount->enableModules()) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
                'googleLinked' => true,
            ]));
        }

        if (false === $uninstallGoogleAccount->resetConfigurationValues()) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
                'googleLinked' => true,
            ]));
        }

        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'success' => true,
            'googleLinked' => false,
        ]));
    }

    /**
     * Google Analytics Logout must enable disabled modules, unsubscribe from PsEssentials
     * Also, it must reset configuration's values
     *
     * @return void
     */
    public function ajaxProcessRefreshGA()
    {
        $analyticsAccount = new Accounts();
        $analyticsAccount->create();
        $serviceResult = $analyticsAccount->refreshGA();
        if (201 !== $serviceResult['httpCode']) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
                'message' => $serviceResult['body']['error'],
            ]));
        }
        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'success' => true,
        ]));
    }

    /**
     * Google Analytics Property List
     *
     * @return void
     */
    public function ajaxProcessListProperty()
    {
        $analyticsAccount = new AnalyticsAccountsListProvider();
        $serviceResult = $analyticsAccount->getAccountsList();
        if (empty($serviceResult)) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
                'listProperty' => [],
                'error' => 'No property list on this account',
            ]));
        }

        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'success' => true,
            'listProperty' => $serviceResult,
        ]));
    }

    /**
     * Init Billing Free
     *
     * @return void
     */
    public function ajaxProcessBillingFree()
    {
        $billingService = new PsBillingService();
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip_address = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) { //whether ip is from proxy
            $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else { //whether ip is from remote address
            $ip_address = $_SERVER['REMOTE_ADDR'];
        }

        $result = $billingService->subscribeToFreePlan('ps_analytics', 'metrics-free', false, $ip_address);

        if (empty($result)) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
            ]));
        }

        $this->ajaxDie($this->jsonHelper->jsonEncode([
            'success' => true,
            'billing' => $result,
        ]));
    }

    /**
     * Delete metrics cache
     *
     * @return bool
     */
    private function deleteExistingCache()
    {
        $cache = new DataCache();

        return $cache->deleteAllCache();
    }
}
