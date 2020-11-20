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

use PrestaShop\AccountsAuth\Service\PsAccountsService;
use PrestaShop\Module\Ps_metrics\Adapter\LinkAdapter;
use PrestaShop\Module\Ps_metrics\Api\Analytics\Accounts;
use PrestaShop\Module\Ps_metrics\Helper\JsonHelper;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;

class AdminOauthCallbackController extends ModuleAdminController
{
    /**
     * @var Ps_metrics
     */
    public $module;
    /**
     * @var LinkAdapter
     */
    public $linkAdapter;

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
     * Main method
     *
     * @return void
     */
    public function display()
    {
        $this->linkAdapter = new LinkAdapter($this->module, $this->context->link);

        if ('PS' === \Tools::getValue('from')) {
            $this->redirectToGoogleAuthentication();
        }

        $configurationRepo = new ConfigurationRepository();
        $configurationRepo->saveActionGoogleLinked(true);

        if (false === $this->isGoogleAuthenticationDone()) {
            $configurationRepo->saveActionGoogleLinked(false);
        }

        $configurationRepo->saveModuleListState($this->getModuleListState());

        $this->disableDashboardModuleList();

        \Tools::redirectAdmin(
            $this->linkAdapter->getAdminLink(
                'AdminModules',
                true,
                [],
                [
                    'configure' => $this->module->name,
                    'google_message_error' => \Tools::getValue('message'),
                    'countProperty' => \Tools::getValue('count'),
                ]
            )
        );
    }

    /**
     * Connexion to Google OAuth by redirecting to psessentials service
     *
     * @return void
     */
    private function redirectToGoogleAuthentication()
    {
        $analyticsAccount = new Accounts();
        $analyticsAccount->create();
        $serviceResult = $analyticsAccount->generateAuthUrl([
            'state' => $this->getGoogleApiState(
                $this->linkAdapter->getAdminLink($this->module->oauthAdminController),
                (new PsAccountsService())->getShopUuidV4()
            ),
        ]);
        if (201 !== $serviceResult['httpCode']) {
            $this->ajaxDie($this->jsonHelper->jsonEncode([
                'success' => false,
            ]));
        }
        Tools::redirect($serviceResult['body']['authorizeUrl']);
    }

    /**
     * The service psessentials returns a param "status=ok" when the connection is done and valid
     *
     * @return bool
     */
    private function isGoogleAuthenticationDone()
    {
        if ('ok' === Tools::getValue('status')) {
            return true;
        }

        return false;
    }

    /**
     * Google State is a base64 json encoded
     *
     * @param string $shopRedirectUri
     * @param string|false $shopId
     *
     * @return string
     */
    private function getGoogleApiState($shopRedirectUri, $shopId)
    {
        // the use of base64_encode is necessary for the api
        return base64_encode(
            '{"redirectUri":"' . $shopRedirectUri . '","shopId":"' . $shopId . '"}'
        );
    }

    /**
     * Get the module enabled status
     *
     * @return string|false
     */
    private function getModuleListState()
    {
        $moduleListState = [];

        foreach ($this->module->moduleSubstitution as $moduleName) {
            $isModuleEnabled = Module::isEnabled($moduleName);
            $moduleListState[$moduleName] = $isModuleEnabled;
        }

        return json_encode($moduleListState);
    }

    /**
     * Disable dashboard module list moduleSubstitution when the Google Account is linked
     *
     * @return void
     */
    private function disableDashboardModuleList()
    {
        foreach ($this->module->moduleSubstitution as $moduleName) {
            $module = Module::getInstanceByName($moduleName);
            // $module returns false if module doesn't exist
            if (false !== $module) {
                $module->disable();
            }
        }
    }
}
