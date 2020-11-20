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

namespace PrestaShop\Module\Ps_metrics\Presenter\Store\Context;

use Context;
use PrestaShop\AccountsAuth\Service\PsAccountsService;
use PrestaShop\Module\Ps_metrics\Adapter\LinkAdapter;
use PrestaShop\Module\Ps_metrics\Presenter\PresenterInterface;
use PrestaShop\Module\Ps_metrics\Provider\ShopsProvider;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;
use Ps_metrics;

class ContextPresenter implements PresenterInterface
{
    /**
     * @var Ps_metrics
     */
    private $module;

    /**
     * @var Context
     */
    private $context;

    public function __construct(Ps_metrics $module, Context $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    /**
     * Tells if we can show the Dashboard App by checking if there's a refresh token and Google Linked Value
     *
     * @return bool
     */
    protected function canShowDashboardApp()
    {
        $configurationRepo = new ConfigurationRepository();
        $psxService = new PsAccountsService();

        if (null === $psxService->getFirebaseRefreshToken()) {
            return false;
        }

        if (false === $configurationRepo->getGoogleLinkedValue()) {
            return false;
        }

        return true;
    }

    /**
     * Check if the merchant is onboarded on ps accounts
     *
     * @return bool
     */
    private function psAccountsIsOnboarded()
    {
        $psxService = new PsAccountsService();

        if ($psxService->getFirebaseRefreshToken() && $psxService->isEmailValidated()) {
            return true;
        }

        return false;
    }

    /**
     * Present the Context Vuex
     *
     * @return array
     */
    public function present()
    {
        $psAccountsService = new PsAccountsService();
        $linkAdapter = new LinkAdapter($this->module, $this->context->link);
        $currentShop = (new ShopsProvider())->getShopUrl($this->context->shop->id);
        $configurationValues = new ConfigurationRepository();

        return [
            'context' => [
                'app' => $this->getCurrentVueApp(),
                'canShowDashboard' => $this->canShowDashboardApp(),
                'user' => [
                    'gaIsOnboarded' => (bool) $configurationValues->getGoogleLinkedValue(),
                    'psAccountsIsOnboarded' => $this->psAccountsIsOnboarded(),
                ],
                'version_ps' => _PS_VERSION_,
                'version_module' => $this->module->version,
                'shopId' => $psAccountsService->getShopUuidV4(),
                'isShop17' => version_compare(_PS_VERSION_, '1.7.3.0', '>='),
                'configurationLink' => $linkAdapter->getAdminLink('AdminModules', true, [], ['configure' => $this->module->name]),
                'controllersLinks' => [
                    'dashboard' => $linkAdapter->getAdminLink($this->module->ajaxDashboardController),
                    'settings' => $linkAdapter->getAdminLink($this->module->ajaxSettingsController),
                ],
                'i18n' => [
                    'isoCode' => $this->context->language->iso_code,
                    'languageLocale' => $this->context->language->language_code,
                    'currencyIsoCode' => $this->context->currency->iso_code,
                ],
                'shop' => [
                    'domain' => $currentShop['domain'],
                    'url' => $currentShop['url'],
                ],
                'readmeUrl' => $this->getReadme(),
            ],
        ];
    }

    /**
     * Get Vue App to use in terms of context Controller Name
     *
     * @return string
     */
    private function getCurrentVueApp()
    {
        if ('AdminDashboard' === $this->context->controller->controller_name) {
            return 'dashboard';
        }

        return 'settings';
    }

    /**
     * Get the documentation url depending on the current language
     *
     * @return string path of the doc
     */
    private function getReadme()
    {
        $isoCode = $this->context->language->iso_code;

        if (!file_exists(_PS_ROOT_DIR_ . _MODULE_DIR_ . $this->module->name . '/docs/readme_' . $isoCode . '.pdf')) {
            $isoCode = 'en';
        }

        return _MODULE_DIR_ . $this->module->name . '/docs/readme_' . $isoCode . '.pdf';
    }
}
