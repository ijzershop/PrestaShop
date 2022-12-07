<?php
declare(strict_types=1);

namespace ModerneSmidMailTheme\Controller;

/**
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
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\MailTemplate\MailPreviewVariablesBuilder;
use PrestaShop\PrestaShop\Core\CommandBus\CommandBusInterface;
use PrestaShop\PrestaShop\Core\Domain\MailTemplate\Command\GenerateThemeMailTemplatesCommand;
use PrestaShop\PrestaShop\Core\Employee\ContextEmployeeProviderInterface;
use PrestaShop\PrestaShop\Core\Exception\CoreException;
use PrestaShop\PrestaShop\Core\Exception\FileNotFoundException;
use PrestaShop\PrestaShop\Core\Exception\InvalidArgumentException;
use PrestaShop\PrestaShop\Core\Form\FormHandlerInterface;
use PrestaShop\PrestaShop\Core\Language\LanguageRepositoryInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\MailTemplateInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\MailTemplateRendererInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCatalogInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\Transformation\MailVariablesTransformation;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Form\Admin\Improve\Design\MailTheme\GenerateMailsType;
use PrestaShopBundle\Form\Admin\Improve\Design\MailTheme\TranslateMailsBodyType;
use PrestaShopBundle\Security\Annotation\AdminSecurity;
use PrestaShopBundle\Service\TranslationService;
use Symfony\Bundle\TwigBundle\TwigBundle;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use PrestaShopBundle\Controller\Admin\Improve\Design\MailThemeController;

/**
 * Class MailThemeController manages mail theme generation, you can define the shop
 * mail theme, and regenerate mail in a specific language.
 *
 * Accessible via "Design > Mail Theme"
 */
class DmsMailThemeController extends FrameworkBundleAdminController
{

    public const ORDER_CONFIRMATION = 'order_conf';

    public const DOWNLOAD_PRODUCT = 'download_product';

    public const EMAIL_ALERTS_MODULE = 'ps_emailalerts';
    public const NEW_ORDER = 'new_order';
    public const RETURN_SLIP = 'return_slip';

    /**
     * This action allows to send a test mail of a specific email template, however the Mail
     * class used to send emails is not modular enough to allow sending templates on the fly.
     * This would require either:
     *  - a little modification of the Mail class to add an easy way to send a template content (rather than its name)
     *  - a full refacto of the Mail class which wouldn't be coupled to static files any more
     *
     * These modifications will be performed in a future release so for now we can only send test emails
     * with the current email theme using generated static files.
     *
     * @AdminSecurity("is_granted('read', request.get('_legacy_controller'))")
     *
     * @param string $theme
     * @param string $layout
     * @param string $locale
     * @param string $module
     *
     * @return Response
     *
     * @throws InvalidArgumentException
     */
    public function sendTestMailAction($theme, $layout, $locale, $module = '')
    {
        if (Configuration::get('PS_MAIL_THEME', null, null) !== $theme) {
            $this->addFlash(
                'error',
                $this->trans(
                    'Cannot send test email for theme %theme% because it is not your current theme',
                    'Admin.Notifications.Error',
                    [
                        '%theme%' => $theme,
                    ]
                )
            );

            return $this->redirectToRoute('admin_mail_theme_preview', ['theme' => $theme]);
        }

        /** @var ContextEmployeeProviderInterface $employeeProvider */
        $employeeProvider = $this->get('prestashop.adapter.data_provider.employee');
        $employeeData = $employeeProvider->getData();

        /** @var LanguageRepositoryInterface $languageRepository */
        $languageRepository = $this->get('prestashop.core.admin.lang.repository');
        $language = $languageRepository->getOneByLocaleOrIsoCode($locale);
        if (null === $language) {
            throw new InvalidArgumentException(sprintf('Cannot find Language with locale or isoCode %s', $locale));
        }

        if (empty($module)) {
            $templatePath = _PS_MAIL_DIR_;
        } else {
            $templatePath = _PS_MODULE_DIR_ . $module . '/mails/';
        }

        /** @var MailPreviewVariablesBuilder $variablesBuilder */

        /** @var MailPreviewVariablesBuilder $variablesBuilder */
        $variablesBuilder = $this->get('prestashop.adapter.mail_template.preview_variables_builder');

        $mailLayout = $this->getMailLayout($theme, $layout, $module);
        $mailVariables = $variablesBuilder->buildTemplateVariables($mailLayout);
        $mailVariables['{footer_blocks}'] = $this->filterFooterBlocks($mailLayout);


        if(array_key_exists('{id_order}', $mailVariables) && !is_null($mailVariables['{id_order}'])){
            $order = new Order($mailVariables['{id_order}']);
            $address = new Address($order->id_address_delivery);

            $newAddressBlock = '<span>'.$address->address1 .' '. $address->house_number.$address->house_number_extension.'<br/>';
            $newAddressBlock .= $address->postcode.' '. $address->city .'<br/>';
            $newAddressBlock .= $address->country .'<br/>';
            $newAddressBlock .= $address->phone .'<br/>';
            if(!is_null($address->phone_mobile)){
                $newAddressBlock .= $address->phone_mobile .'<br/>';
            }

            $mailVariables['{delivery_block_html}'] = $newAddressBlock;

        }

        $mailSent = Mail::send(
            $language->getId(),
            $layout,
            $this->trans('Test email %template%', 'Admin.Design.Feature', ['%template%' => $layout]),
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
                    'Admin.Notifications.Success',
                    [
                        '%layout%' => $layout,
                        '%email%' => $employeeData['email'],
                    ]
                )
            );
        } else {
            $this->addFlash(
                'error',
                $this->trans(
                    'Cannot send test email for layout %layout%',
                    'Admin.Notifications.Error',
                    [
                        '%layout%' => $layout,
                    ]
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
     */
    public static function filterFooterBlocks($templateName, $route = '') {
        $templateBlocks = json_decode(Configuration::get('MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS', Context::getContext()->language->id, null, Context::getContext()->shop->id, true));
        $templateBlocksData = $templateBlocks->{$templateName->getName()};

        $instance = SymfonyContainer::getInstance();

        switch ($route){
            case 'admin_mail_theme_generate':
                $contents = $instance->get('twig')->render(_PS_MODULE_DIR_.'ModerneSmidMailTheme/mails/themes/modernesmid/components/footer_blocks.html.twig', [
                    'footer_visibles' => (array)$templateBlocksData,
                    'locale' => Context::getContext()->language->locale,
                    'faq_page' => "{faq_page}",
                    'add_to_order' => '<b><span style="color:#777777;font-size: 16px;font-family:Open-sans, sans-serif;">Iets vergeten te bestellen?<br/></span></b><span style="color:#777777;font-size: 16px;font-family:Open-sans, sans-serif;line-height: 25px;">Plaats een nieuwe bestelling en kies voor "Toevoegen" tijdens het afrekenen. Dan worden er niet opnieuw verzendkosten berekend. Zodra uw open staande bestelling is ingepakt kunt u niet meer toevoegen.</span>',
                    'custom_footer_html' => "{custom_footer_html}",
                    'shop_name' => "{shop_name}",
                    'shop_url' => "{shop_url}",
                    'my_account_url' => "{my_account_url}",
                    'guest_tracking_url' => "{guest_tracking_url}",
                    'history_url' => "{history_url}"
                ]);
                break;
            case 'admin_mail_theme_preview_layout ':
                $contents = $instance->get('twig')->render(_PS_MODULE_DIR_.'ModerneSmidMailTheme/mails/themes/modernesmid/components/footer_blocks.html.twig', [
                    'footer_visibles' => (array)$templateBlocksData,
                    'locale' => Context::getContext()->language->locale,
                    'faq_page' => Context::getContext()->link->getCMSLink(Configuration::get('MSTHEMECONFIG_CONTACTPAGE_FAQ', Context::getContext()->language->id, null,  Context::getContext()->shop->id, ''),null,true, '',''),
                    'add_to_order' => '<b><span style="color:#777777;font-size: 16px;font-family:Open-sans, sans-serif;">Iets vergeten te bestellen?<br/></span></b><span style="color:#777777;font-size: 16px;font-family:Open-sans, sans-serif;line-height: 25px;">Plaats een nieuwe bestelling en kies voor "Toevoegen" tijdens het afrekenen. Dan worden er niet opnieuw verzendkosten berekend. Zodra uw open staande bestelling is ingepakt kunt u niet meer toevoegen.</span>',
                    'custom_footer_html' => Configuration::get('MSTHEMECONFIG_EMAIL_FOOTER_TEXT', Context::getContext()->language->id, null,  Context::getContext()->shop->id, ''),
                    'shop_name' => Context::getContext()->shop->name,
                    'shop_url' => Context::getContext()->link->getPageLink('index', true),
                    'my_account_url' => Context::getContext()->link->getPageLink('my-account', true),
                    'guest_tracking_url' => Context::getContext()->link->getPageLink('guest-tracking', true),
                    'history_url' => Context::getContext()->link->getPageLink('history', true),
                ]);
                break;
            default:
                $contents = $instance->get('twig')->render(_PS_MODULE_DIR_.'ModerneSmidMailTheme/mails/themes/modernesmid/components/footer_blocks.html.twig', [
                    'footer_visibles' => (array)$templateBlocksData,
                    'locale' => Context::getContext()->language->locale,
                    'faq_page' => Context::getContext()->link->getCMSLink(Configuration::get('MSTHEMECONFIG_CONTACTPAGE_FAQ', Context::getContext()->language->id, null,  Context::getContext()->shop->id, ''),null,true, '',''),
                    'add_to_order' => '<b><span style="color:#777777;font-size: 16px;font-family:Open-sans, sans-serif;">Iets vergeten te bestellen?<br/></span></b><span style="color:#777777;font-size: 16px;font-family:Open-sans, sans-serif;line-height: 25px;">Plaats een nieuwe bestelling en kies voor "Toevoegen" tijdens het afrekenen. Dan worden er niet opnieuw verzendkosten berekend. Zodra uw open staande bestelling is ingepakt kunt u niet meer toevoegen.</span>',
                    'custom_footer_html' => Configuration::get('MSTHEMECONFIG_EMAIL_FOOTER_TEXT', Context::getContext()->language->id, null,  Context::getContext()->shop->id, ''),
                    'shop_name' => Context::getContext()->shop->name,
                    'shop_url' => Context::getContext()->link->getPageLink('index', true),
                    'my_account_url' => Context::getContext()->link->getPageLink('my-account', true),
                    'guest_tracking_url' => Context::getContext()->link->getPageLink('guest-tracking', true),
                    'history_url' => Context::getContext()->link->getPageLink('history', true),
                ]);
                break;
        }


        return $contents;
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
    private function getMailLayout($themeName, $layoutName, $module)
    {
        /** @var ThemeCatalogInterface $themeCatalog */
        $themeCatalog = $this->get('prestashop.core.mail_template.theme_catalog');
        /** @var ThemeInterface $theme */
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
