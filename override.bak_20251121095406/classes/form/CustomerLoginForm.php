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
use PrestaShop\PrestaShop\Core\Util\InternationalizedDomainNameConverter;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 *
 */
class CustomerLoginForm extends CustomerLoginFormCore {

    private $context;
    public $urls;

    protected $template = 'customer/_partials/login-form.tpl';

    /**
     * @var InternationalizedDomainNameConverter
     */
    private $IDNConverter;


    public function __construct(
        Smarty $smarty,
        Context $context,
        TranslatorInterface $translator,
        CustomerLoginFormatter $formatter,
        array $urls
    ) {
        parent::__construct(
            $smarty,
            $context,
            $translator,
            $formatter,
            $urls
        );
        $this->context = $context;
        $this->translator = $translator;
        $this->formatter = $formatter;
        $this->urls = $urls;
        $this->constraintTranslator = new ValidateConstraintTranslator(
            $this->translator
        );
        $this->IDNConverter = new InternationalizedDomainNameConverter();
    }


    /**
     * @return bool
     * @throws PrestaShopException
     */
    public function submit()
    {
        if ($this->validate()) {
            Hook::exec('actionAuthenticationBefore');

            $emailExists = Customer::getCustomersByEmail($this->getValue('email'));
            $is_registered = false;
            foreach ($emailExists as $emailExist) {
                if($emailExist['is_guest'] == 0){
                    $is_registered = true;
                }
            }

            if ($is_registered) {
                $customer = new Customer();
                $authentication = $customer->getByEmail(
                    $this->getValue('email'),
                    $this->getValue('password')
                );

                if (isset($authentication->active) && !$authentication->active) {
                    Context::getContext()->controller->errors['email'][] = Context::getContext()->getTranslator()->trans('Your account isn\'t available at this time, please contact us', [], 'Shop.Notifications.Error');
                } elseif (!$authentication || !$customer->id || $customer->is_guest) {
                    if(!$authentication){
                        Context::getContext()->controller->errors['email'][] = Context::getContext()->getTranslator()->trans('De combinatie email adres en wachtwoord is onjuist!', [], 'Shop.Notifications.Error');
                    } else {
                        Context::getContext()->controller->errors['email'][] = Context::getContext()->getTranslator()->trans('Authentication failed.', [], 'Shop.Notifications.Error');
                    }
                } else {
                    Context::getContext()->updateCustomer($customer);

                    Hook::exec('actionAuthentication', ['customer' => Context::getContext()->customer]);
                }
            } else {
                Context::getContext()->controller->errors['email'][] = Context::getContext()->getTranslator()->trans('Dit email adres is niet gevonden in ons klantbestand', [], 'Shop.Notifications.Error');
            }
        }



        if(!Context::getContext()->controller->errors){
            if(!isset($this->urls['authentication'])){
                $this->errors[] = 'Authentication url is not available';
            }

            return Context::getContext()->controller->redirectWithNotifications($this->urls['authentication']);
        }

        return $this->hasErrors();
    }


    /**
     * @return array
     */
    public function getTemplateVariables()
    {
        if (!$this->formFields) {
            $this->formFields = $this->formatter->getFormat();
        }

        array_merge($this->errors, Context::getContext()->controller->errors);

        return [
            'action' => $this->action,
            'urls' => $this->urls,
            'formFields' => array_map(
                function (FormField $field) {
                    $errors = $field->getErrors();
                    if (!is_null($errors)) {
                        $field->setErrors($errors);
                    }
                    return $field->toArray();
                },
                $this->formFields
            ),
            'errors' => $this->errors,
        ];
    }
}
