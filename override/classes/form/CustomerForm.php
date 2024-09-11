<?php
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
use PrestaShop\PrestaShop\Core\Security\PasswordPolicyConfiguration;
use PrestaShop\PrestaShop\Core\Util\InternationalizedDomainNameConverter;
use Symfony\Contracts\Translation\TranslatorInterface;
use ZxcvbnPhp\Zxcvbn;

class CustomerForm extends CustomerFormCore
{
    private $passwordRequired = true;

    public function validate()
    {
        $emailField = $this->getField('email');
        if(!empty($this->getField('password')->getValue())){
            $id_customer = Customer::customerExists($emailField->getValue(), true, true);
            $customer = $this->getCustomer();
            if ($id_customer && $id_customer != $customer->id) {
                $customerObject = new Customer();
                //Registration form login check
                $authentication = $customerObject->getByEmail(
                    $emailField->getValue(),
                    $this->getField('password')->getValue()
                );

                if($authentication){
                    //Authenticated = true Autologin Customer
                    $context = Context::getContext();
                    $context->updateCustomer($customer);
                    Hook::exec('actionAuthentication', ['customer' => $context->customer]);
                    // Login information have changed, so we check if the cart rules still apply
                    CartRule::autoRemoveFromCart($context);
                    CartRule::autoAddToCart($context);
                    return true;
                } else {
                    //Authenticated = false Show Modal
                    $checkoutMsg = [];
                    $checkoutMsg['wrongPasswordMessage']  = "Het door ingevulde email is van een klant account, maar het wachtwoord is onjuist. Wilt u het wachtwoord opnieuw opvragen?";
                    $checkoutMsg['modalChoice']  = true;
                    $checkoutMsg['email']  = $emailField->getValue();
                    Context::getContext()->checkout = json_encode($checkoutMsg);
                    return false;
                }
            }
        }

        // check birthdayField against null case is mandatory.
        $birthdayField = $this->getField('birthday');
        if (!empty($birthdayField) &&
            !empty($birthdayField->getValue()) &&
            Validate::isBirthDate($birthdayField->getValue(), Context::getContext()->language->date_format_lite)
        ) {
            $dateBuilt = DateTime::createFromFormat(
                Context::getContext()->language->date_format_lite,
                $birthdayField->getValue()
            );
            $birthdayField->setValue($dateBuilt->format('Y-m-d'));
        }

        if ($this->getField('new_password') === null
            || !empty($this->getField('new_password')->getValue())
        ) {
            $passwordField = $this->getField('new_password') ?? $this->getField('password');
            if (!empty($passwordField->getValue()) || $this->passwordRequired) {
                if (Validate::isAcceptablePasswordLength($passwordField->getValue()) === false) {
                    $passwordField->addError($this->translator->trans(
                        'Password must be between %d and %d characters long',
                        [
                            Configuration::get(PasswordPolicyConfiguration::CONFIGURATION_MINIMUM_LENGTH),
                            Configuration::get(PasswordPolicyConfiguration::CONFIGURATION_MAXIMUM_LENGTH),
                        ],
                        'Shop.Notifications.Error'
                    ));
                }

                if (Validate::isAcceptablePasswordScore($passwordField->getValue()) === false) {
                    $wordingsForScore = [
                        $this->translator->trans('Very weak', [], 'Shop.Theme.Global'),
                        $this->translator->trans('Weak', [], 'Shop.Theme.Global'),
                        $this->translator->trans('Average', [], 'Shop.Theme.Global'),
                        $this->translator->trans('Strong', [], 'Shop.Theme.Global'),
                        $this->translator->trans('Very strong', [], 'Shop.Theme.Global'),
                    ];
                    $globalErrorMessage = $this->translator->trans(
                        'The minimum score must be: %s',
                        [
                            $wordingsForScore[(int) Configuration::get(PasswordPolicyConfiguration::CONFIGURATION_MINIMUM_SCORE)],
                        ],
                        'Shop.Notifications.Error'
                    );
                    if (Context::getContext()->shop->theme->get('global_settings.new_password_policy_feature') !== true) {
                        $zxcvbn = new Zxcvbn();
                        $result = $zxcvbn->passwordStrength($passwordField->getValue());
                        if (!empty($result['feedback']['warning'])) {
                            $passwordField->addError($this->translator->trans(
                                $result['feedback']['warning'], [], 'Shop.Theme.Global'
                            ));
                        } else {
                            $passwordField->addError($globalErrorMessage);
                        }
                        foreach ($result['feedback']['suggestions'] as $suggestion) {
                            $passwordField->addError($this->translator->trans($suggestion, [], 'Shop.Theme.Global'));
                        }
                    } else {
                        $passwordField->addError($globalErrorMessage);
                    }
                }
            }
        }
        $this->validateFieldsLengths();
        $this->validateByModules();

        return true;
    }
    /**
     * This function call the hook validateCustomerFormFields of every modules
     * which added one or several fields to the customer registration form.
     *
     * Note: they won't get all the fields from the form, but only the one
     * they added.
     */
    private function validateByModules()
    {
        $formFieldsAssociated = [];
        // Group FormField instances by module name
        foreach ($this->formFields as $formField) {
            if (!empty($formField->moduleName)) {
                $formFieldsAssociated[$formField->moduleName][] = $formField;
            }
        }
        // Because of security reasons (i.e password), we don't send all
        // the values to the module but only the ones it created
        foreach ($formFieldsAssociated as $moduleName => $formFields) {
            if ($moduleId = Module::getModuleIdByName($moduleName)) {
                // ToDo : replace Hook::exec with HookFinder, because we expect a specific class here
                // Hook called only for the module concerned
                // An array [module_name => module_output] will be returned
                $validatedCustomerFormFields = Hook::exec('validateCustomerFormFields', ['fields' => $formFields], $moduleId, true);

                if (!is_array($validatedCustomerFormFields)) {
                    continue;
                }

                foreach ($validatedCustomerFormFields as $name => $field) {
                    if ($field instanceof FormFieldCore) {
                        $this->formFields[$name] = $field;
                    }
                }
            }
        }
    }
}

?>
