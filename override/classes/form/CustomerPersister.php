<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
use PrestaShop\PrestaShop\Core\Crypto\Hashing as Crypto;
use Symfony\Component\Translation\TranslatorInterface;

class CustomerPersister extends CustomerPersisterCore
{

    private function create(Customer $customer, $clearTextPassword)
    {
        if (!$clearTextPassword) {
            if (!$this->guest_allowed) {
                $this->errors['password'][] = $this->translator->trans(
                    'Password is required',
                    [],
                    'Shop.Notifications.Error'
                );

                return false;
            }

            /**
             * Warning: this is only safe provided
             * that guests cannot log in even with the generated
             * password. That's the case at least at the time of writing.
             */
            $clearTextPassword = $this->crypto->hash(
                microtime(),
                _COOKIE_KEY_
            );

            $customer->is_guest = true;
        }

        $customer->passwd = $this->crypto->hash(
            $clearTextPassword,
            _COOKIE_KEY_
        );

        if (Customer::customerExists($customer->email, false, true)) {
            $this->errors['email'][] = $this->translator->trans(
                'An account was already registered with this email address',
                [],
                'Shop.Notifications.Error'
            );

            return false;
        }

        $ok = $customer->save();

        if ($ok) {
            $this->context->updateCustomer($customer);
            $this->context->cart->update();
            // Add existing guest orders connected to the entered email adres to the new customer
            $this->connectExistingOrdersToNewCustomer($customer);
            $this->sendConfirmationMail($customer);
            Hook::exec('actionCustomerAccountAdd', array(
                'newCustomer' => $customer,
            ));
        }

        return $ok;
    }

/**
 * connect existing guest account orders with the same email adres to the newly created customer
 * @param  object $customer the newly created customer object
 */
    private function connectExistingOrdersToNewCustomer($customer){
             //warning the new customer is already created and added to this list
             $existingCustomersList = Customer::getCustomersByEmail($customer->email);
             foreach ($existingCustomersList as $key => $customerObject) {
                 if((int)$customerObject['is_guest'] == 1){
                    Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . 'orders` SET `id_customer`='.(int)$customer->id.' WHERE `id_customer` = '.(int)$customerObject['id_customer']);
                 }
             }
    }
}
