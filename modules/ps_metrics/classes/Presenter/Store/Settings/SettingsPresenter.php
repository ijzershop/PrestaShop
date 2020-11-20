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

namespace PrestaShop\Module\Ps_metrics\Presenter\Store\Settings;

use Context;
use PrestaShop\Module\Ps_metrics\Adapter\LinkAdapter;
use PrestaShop\Module\Ps_metrics\Api\Shop\RetrieveFaq;
use PrestaShop\Module\Ps_metrics\Module\GAInstaller;
use PrestaShop\Module\Ps_metrics\Presenter\PresenterInterface;
use PrestaShop\Module\Ps_metrics\Provider\AnalyticsAccountsListProvider;
use PrestaShop\Module\Ps_metrics\Provider\GoogleTagProvider;
use PrestaShop\Module\Ps_metrics\Provider\ShopsProvider;
use PrestaShop\Module\Ps_metrics\Repository\ConfigurationRepository;
use PrestaShop\Module\Ps_metrics\Translations\SettingsTranslations;
use Ps_metrics;

class SettingsPresenter implements PresenterInterface
{
    /**
     * @var Ps_metrics
     */
    private $module;

    /**
     * @var Context
     */
    private $context;

    /**
     * @var string
     */
    private $responseApiMessage;

    /**
     * @var int
     */
    private $countProperty;

    /**
     * @param string $responseApiMessage
     * @param int $countProperty
     */
    public function __construct(Ps_metrics $module, Context $context, $responseApiMessage, $countProperty = 0)
    {
        $this->module = $module;
        $this->context = $context;
        $this->responseApiMessage = $responseApiMessage;
        $this->countProperty = $countProperty;
    }

    /**
     * Present the Setting App Vuex
     *
     * @return array
     */
    public function present()
    {
        $configurationValues = new ConfigurationRepository();
        $linkAdapter = new LinkAdapter($this->module, $this->context->link);
        $accountsList = new AnalyticsAccountsListProvider();
        $gaInstaller = new GAInstaller($linkAdapter);

        $currentShop = (new ShopsProvider())->getShopUrl($this->context->shop->id);
        $findGoogleTag = new GoogleTagProvider($currentShop['url']);

        return [
            'settings' => [
                'faq' => $this->getFaq(),
                'translations' => (new SettingsTranslations($this->module))->getTranslations(),
                'googleLinked' => (bool) $configurationValues->getGoogleLinkedValue(),
                'countProperty' => $this->countProperty,
                'googleLinkedUrl' => $linkAdapter->getAdminLink($this->module->oauthAdminController, true, [], ['from' => 'PS']),
                'googleAccountsList' => $accountsList->getAccountsList(),
                'googleAccount' => $accountsList->getSelectedAccount(),
                'googleUserName' => $accountsList->getUserName(),
                'GTAAvailable' => $findGoogleTag->findGoogleTagsAnalytics(),
                'GTMAvailable' => $findGoogleTag->findGoogleTagsManager(),
                'gaModule' => [
                    'isInstalled' => $gaInstaller->isInstalled(),
                    'isEnabled' => $gaInstaller->isEnabled(),
                    'installLink' => $gaInstaller->getInstallLink(),
                    'enableLink' => $gaInstaller->getEnableLink(),
                    'configLink' => $gaInstaller->getConfigLink(),
                ],
                'oAuthGoogleErrorMessage' => $this->responseApiMessage,
                'linkDashboard' => $linkAdapter->getAdminLink('AdminDashboard', true, [], []),
            ],
        ];
    }

    /**
     * Retrieve the faq
     *
     * @return array|bool faq or false if no faq associated to the module
     */
    private function getFaq()
    {
        $faq = new RetrieveFaq();
        $faq->setModuleKey($this->module->module_key);
        $faq->setPsVersion(_PS_VERSION_);
        $faq->setIsoCode($this->context->language->iso_code);
        $response = $faq->getFaq();

        if (200 !== $response['httpCode']) {
            return false;
        }

        // If no response in the selected language, retrieve the faq in the default language (english)
        if (false === $response['body'] && $faq->getIsoCode() !== 'en') {
            $faq->setIsoCode('en');
            $response = $faq->getFaq();
        }

        return $response['body'];
    }
}
