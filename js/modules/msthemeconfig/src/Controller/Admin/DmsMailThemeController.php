<?php

declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

/*
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

use Mail;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\MailTemplate\MailPreviewVariablesBuilder;
use PrestaShop\PrestaShop\Core\Employee\ContextEmployeeProviderInterface;
use PrestaShop\PrestaShop\Core\Exception\FileNotFoundException;
use PrestaShop\PrestaShop\Core\Exception\InvalidArgumentException;
use PrestaShop\PrestaShop\Core\Language\LanguageRepositoryInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCatalogInterface;
use PrestaShopBundle\Controller\Admin\PrestaShopAdminController;
use PrestaShopBundle\Security\Attribute\AdminSecurity;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Response;
use Tools;

/**
 * Class MailThemeController manages mail theme generation, you can define the shop
 * mail theme, and regenerate mail in a specific language.
 *
 * Accessible via "Design > Mail Theme"
 */
class DmsMailThemeController extends PrestaShopAdminController
{
    public const ORDER_CONFIRMATION = 'order_conf';

    public const DOWNLOAD_PRODUCT = 'download_product';

    public const EMAIL_ALERTS_MODULE = 'ps_emailalerts';
    public const NEW_ORDER = 'new_order';
    public const RETURN_SLIP = 'return_slip';

    #[AdminSecurity("is_granted('read', request.get('_legacy_controller'))")]
    public function sendTestMailAction(
        string $theme,
        string $layout,
        string $locale,
        string $module = '',
        #[Autowire(service: 'prestashop.adapter.data_provider.employee')]
        ?ContextEmployeeProviderInterface $employeeProvider = null,
        #[Autowire(service: 'prestashop.core.admin.lang.repository')]
        ?LanguageRepositoryInterface $languageRepository = null,
        #[Autowire(service: 'prestashop.adapter.mail_template.preview_variables_builder')]
        ?MailPreviewVariablesBuilder $variablesBuilder = null,
        #[Autowire(service: 'prestashop.core.mail_template.theme_catalog')]
        ?ThemeCatalogInterface $themeCatalog = null
    ): Response {
        if ($employeeProvider === null || $languageRepository === null || $variablesBuilder === null || $themeCatalog === null) {
            $this->addFlash('error', $this->trans('Required services are unavailable.', [], 'Admin.Notifications.Error'));

            return $this->redirectToRoute('admin_mail_theme_preview', ['theme' => $theme]);
        }

        $context = Context::getContext();
        if (Configuration::get('PS_MAIL_THEME', $context->language->id, $context->shop->getGroup()->id, $context->shop->id) !== $theme) {
            $this->addFlash(
                'error',
                $this->trans(
                    'Cannot send test email for theme %theme% because it is not your current theme',
                    ['%theme%' => $theme],
                    'Admin.Notifications.Error'
                )
            );

            return $this->redirectToRoute('admin_mail_theme_preview', ['theme' => $theme]);
        }

        if (!empty($module) && !preg_match('/^[a-zA-Z0-9_-]+$/', $module)) {
            $this->addFlash('error', $this->trans('Invalid module name.', [], 'Admin.Notifications.Error'));

            return $this->redirectToRoute('admin_mail_theme_preview', ['theme' => $theme]);
        }

        $employeeData = $employeeProvider->getEmployeeContext();
        $language = $languageRepository->findOneByLocale($locale);

        if ($language === null) {
            $this->addFlash(
                'error',
                $this->trans('Cannot find language for locale %locale%', ['%locale%' => $locale], 'Admin.Notifications.Error')
            );

            return $this->redirectToRoute('admin_mail_theme_preview', ['theme' => $theme]);
        }

        $mailLayout = $this->getMailLayout($theme, $layout, $module, $themeCatalog);
        $mailVariables = $variablesBuilder->build($mailLayout, $language->getId());

        $templatePath = _PS_MAIL_DIR_;
        if (!empty($module)) {
            $templatePath = _PS_MODULE_DIR_ . $module . '/mails/';
        }

        $mailSent = Mail::send(
            (int) $language->getId(),
            $layout,
            $this->trans('Test email %template%', ['%template%' => $layout], 'Admin.Design.Feature'),
            $mailVariables,
            $employeeData['email'],
            $employeeData['firstname'] . ' ' . $employeeData['lastname'],
            $employeeData['email'],
            $employeeData['firstname'] . ' ' . $employeeData['lastname'],
            null,
            null,
            $templatePath
        );

        if ($mailSent) {
            $this->addFlash(
                'success',
                $this->trans(
                    'Test email for layout %layout% was successfully sent to %email%',
                    ['%layout%' => $layout, '%email%' => $employeeData['email']],
                    'Admin.Notifications.Success'
                )
            );
        } else {
            $this->addFlash(
                'error',
                $this->trans(
                    'Cannot send test email for layout %layout%',
                    ['%layout%' => $layout],
                    'Admin.Notifications.Error'
                )
            );
        }

        return $this->redirectToRoute('admin_mail_theme_preview', ['theme' => $theme]);
    }

    /**
     * Return array with boolean values show different blocks in footer
     * Array contains: traceOrder, add2Order, faq, review, contact
     *
     * @param $templateName
     * @param \Twig\Environment $twig
     * @param string $route
     *
     * @return string
     */
    public static function filterFooterBlocks($templateName, \Twig\Environment $twig, string $route = ''): string
    {
        $templateBlocksRaw = Configuration::get('MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS', Context::getContext()->language->id, null, Context::getContext()->shop->id, true);
        $templateBlocks = is_string($templateBlocksRaw) ? json_decode($templateBlocksRaw, true) : null;
        $layoutName = is_object($templateName) && method_exists($templateName, 'getName')
            ? (string) $templateName->getName()
            : (string) $templateName;
        $layoutName = str_replace("\0", '', $layoutName);
        $defaultBlocks = [
            'trace' => false,
            'add2order' => false,
            'faq' => false,
            'review' => false,
            'contact' => false,
        ];
        $templateBlocksData = $defaultBlocks;
        if (is_array($templateBlocks) && array_key_exists($layoutName, $templateBlocks) && is_array($templateBlocks[$layoutName])) {
            $templateBlocksData = array_merge($defaultBlocks, $templateBlocks[$layoutName]);
        }

        $addToOrderHtml = '<b><span style="color:#777777;font-size: 16px;font-family:roboto, helvetica neue, helvetica, arial, sans-serif;">Iets vergeten te bestellen?<br/></span></b><span style="color:#777777;font-size: 16px;font-family:roboto, helvetica neue, helvetica, arial, sans-serif;line-height:24px;">Plaats een nieuwe bestelling en kies voor "Toevoegen" tijdens het afrekenen. Dan worden er niet opnieuw verzendkosten berekend. Zodra uw open staande bestelling is ingepakt kunt u niet meer toevoegen.</span>';

        return match ($route) {
            'admin_mail_theme_generate' => $twig->render('@Modules/msthemeconfig/mails/themes/modernesmid/components/footer_blocks.html.twig', [
                'footer_visibles' => (array) $templateBlocksData,
                'locale' => Context::getContext()->language->locale,
                'faq_page' => '{faq_page}',
                'add_to_order' => $addToOrderHtml,
                'shop_name' => '{shop_name}',
                'shop_url' => '{shop_url}',
                'my_account_url' => '{my_account_url}',
                'guest_tracking_url' => '{guest_tracking_url}',
                'history_url' => '{history_url}',
            ]),
            default => $twig->render('@Modules/msthemeconfig/mails/themes/modernesmid/components/footer_blocks.html.twig', [
                'footer_visibles' => (array) $templateBlocksData,
                'locale' => Context::getContext()->language->locale,
                'faq_page' => Tools::safeOutput(Context::getContext()->link->getCMSLink(
                    Configuration::get('MSTHEMECONFIG_CONTACTPAGE_FAQ', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id),
                    null,
                    true,
                    Context::getContext()->language->id,
                    Context::getContext()->shop->id
                )),
                'add_to_order' => $addToOrderHtml,
                'shop_name' => Context::getContext()->shop->name,
                'shop_url' => Context::getContext()->link->getPageLink('index', true),
                'my_account_url' => Context::getContext()->link->getPageLink('my-account', true),
                'guest_tracking_url' => Context::getContext()->link->getPageLink('guest-tracking', true),
                'history_url' => Context::getContext()->link->getPageLink('history', true),
            ]),
        };
    }

    /**
     * @param string $themeName
     * @param string $layoutName
     * @param string $module
     *
     * @return LayoutInterface
     *
     * @throws FileNotFoundException
     * @throws InvalidArgumentException
     */
    private function getMailLayout(
        string $themeName,
        string $layoutName,
        string $module,
        ThemeCatalogInterface $themeCatalog
    ): LayoutInterface {
        $theme = $themeCatalog->getByName($themeName);

        /** @var LayoutInterface $layout */
        $layout = null;
        /* @var LayoutInterface $layoutInterface */
        foreach ($theme->getLayouts() as $layoutInterface) {
            if ($layoutInterface->getName() == $layoutName
                && $layoutInterface->getModuleName() == $module
            ) {
                $layout = $layoutInterface;
                break;
            }
        }

        if (null === $layout) {
            throw new FileNotFoundException(sprintf('Cannot find layout %s%s in theme %s',
                empty($module) ? '' : $module . ':', $layoutName, $themeName));
        }

        return $layout;
    }
}
