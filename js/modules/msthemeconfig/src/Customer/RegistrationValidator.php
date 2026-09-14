<?php

declare(strict_types=1);

namespace MsThemeConfig\Customer;

use Configuration;
use Context;
use Customer;
use CustomerFormCore;
use CustomerFormatter;
use CustomerPersister;

/**
 * Validate registration before the shop's legacy CustomerForm override can save it.
 */
final class RegistrationValidator
{
    public function validate(Context $context, array $values): bool
    {
        if (($context->controller->php_self ?? '') !== 'registration') {
            return true;
        }

        $translator = $context->getTranslator();
        $formatter = new CustomerFormatter($translator, $context->language);
        $formatter
            ->setAskForPartnerOptin(Configuration::get('PS_CUSTOMER_OPTIN'))
            ->setAskForBirthdate(Configuration::get('PS_CUSTOMER_BIRTHDATE'))
            ->setPartnerOptinRequired((new Customer())->isFieldRequired('optin'));

        // Use core validation directly: the installed override skips required-field
        // and password errors. The current formatter retains shop and module fields.
        // This form is only validated; the normal registration flow still saves it.
        $form = new CustomerFormCore(
            $context->smarty,
            $context,
            $translator,
            $formatter,
            new CustomerPersister(
                $context,
                $context->controller->get('hashing'),
                $translator,
                false
            ),
            []
        );
        $form->setGuestAllowed(false)->fillWith($values + ['password' => '']);

        $email = $form->getField('email');
        // Guest records never reserve an email address for registration. A real
        // account must sign in instead, even if the submitted password is correct.
        if (Customer::customerExists($email->getValue(), false, true)) {
            $email->addError($translator->trans(
                'The email is already used, please choose another one or sign in',
                [],
                'Shop.Notifications.Error'
            ));
        }

        $confirmation = $form->getField('validate_email');
        if ($confirmation !== null) {
            $confirmation->addConstraint('isEmail');
            if ($email->getValue() !== $confirmation->getValue()) {
                $confirmation->addError($translator->trans(
                    'De email adressen komen niet overeen.',
                    [],
                    'Shop.Notifications.Error'
                ));
            }
        }

        if ($form->validate()) {
            return true;
        }

        // RegistrationController does not expose the hook's form. Put its errors
        // in the standard notification collection so the customer can correct it.
        foreach ($form->getErrors() as $errors) {
            foreach ($errors as $error) {
                if (!in_array($error, $context->controller->errors, true)) {
                    $context->controller->errors[] = $error;
                }
            }
        }

        return false;
    }
}
