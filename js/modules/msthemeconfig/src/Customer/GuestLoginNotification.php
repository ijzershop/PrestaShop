<?php
declare(strict_types=1);

namespace MsThemeConfig\Customer;

use Context;
use Customer;
use PrestaShop\PrestaShop\Core\Util\InternationalizedDomainNameConverter;
use Tools;
use Validate;

final class GuestLoginNotification
{
    public function update(Context $context): void
    {
        $controller = $context->controller;
        if (!Tools::isSubmit('submitLogin') || empty($controller->errors)) {
            return;
        }

        // The shop's login override reports authentication failures on the controller.
        // Replace only its unknown-email error after validation/authentication has run.
        $translator = $context->getTranslator();
        $unknownEmail = $translator->trans(
            'Dit email adres is niet gevonden in ons klantbestand',
            [],
            'Shop.Notifications.Error'
        );
        $emailErrors = $controller->errors['email'] ?? [];
        if (!is_array($emailErrors) || !in_array($unknownEmail, $emailErrors, true)) {
            return;
        }

        $email = Tools::getValue('email');
        if (!is_string($email)) {
            return;
        }
        $email = (new InternationalizedDomainNameConverter())->emailToUtf8($email);
        if (!Validate::isEmail($email)) {
            return;
        }

        $hasGuest = false;
        // This lookup follows PrestaShop's shared-customer shop restriction.
        foreach (Customer::getCustomersByEmail($email) ?: [] as $customer) {
            if (empty($customer['is_guest'])) {
                return;
            }
            if (empty($customer['deleted'])) {
                $hasGuest = true;
            }
        }
        if (!$hasGuest) {
            return;
        }

        $message = $translator->trans(
            'You previously ordered as a guest. Please register again with this email address to create a customer account.',
            [],
            'Modules.Msthemeconfig.Shop'
        );
        $label = $translator->trans('Create a customer account', [], 'Modules.Msthemeconfig.Shop');
        $url = $context->link->getPageLink('registration', true);
        // Notifications are rendered as HTML by the theme; escape every dynamic value.
        $notification = htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . ' <a href="'
            . htmlspecialchars($url, ENT_QUOTES, 'UTF-8') . '">'
            . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</a>';

        foreach ($emailErrors as $key => $error) {
            if ($error === $unknownEmail) {
                $controller->errors['email'][$key] = $notification;
            }
        }
    }
}
