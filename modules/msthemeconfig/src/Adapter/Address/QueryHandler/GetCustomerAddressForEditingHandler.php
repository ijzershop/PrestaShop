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

namespace MsThemeConfig\Adapter\Address\QueryHandler;

use Customer;
use PrestaShop\PrestaShop\Adapter\Address\AbstractCustomerAddressHandler;
use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Core\Domain\Address\Exception\AddressException;
use PrestaShop\PrestaShop\Core\Domain\Address\Exception\AddressNotFoundException;
use MsThemeConfig\Core\Domain\Address\Query\GetCustomerAddressForEditing;
use MsThemeConfig\Core\Domain\Address\QueryHandler\GetCustomerAddressForEditingHandlerInterface;
use MsThemeConfig\Core\Domain\Address\QueryResult\EditableCustomerAddress;
use PrestaShop\PrestaShop\Core\Domain\Country\Exception\CountryConstraintException;
use PrestaShop\PrestaShop\Core\Domain\Country\ValueObject\CountryId;
use PrestaShop\PrestaShop\Core\Domain\Customer\Exception\CustomerException;
use PrestaShop\PrestaShop\Core\Domain\Customer\Exception\CustomerNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Customer\ValueObject\CustomerId;
use PrestaShop\PrestaShop\Core\Domain\Shop\ValueObject\ShopConstraint;
use PrestaShop\PrestaShop\Core\Domain\State\Exception\StateConstraintException;
use PrestaShop\PrestaShop\Core\Domain\State\ValueObject\NoStateId;
use PrestaShop\PrestaShop\Core\Domain\State\ValueObject\StateId;
use PrestaShopException;

/**
 * Handles query which gets customer address for editing
 */
final class GetCustomerAddressForEditingHandler extends AbstractCustomerAddressHandler implements GetCustomerAddressForEditingHandlerInterface
{
    /**
     * {@inheritdoc}
     *
     * @throws AddressException
     * @throws AddressNotFoundException
     * @throws CustomerException
     * @throws CustomerNotFoundException
     * @throws CountryConstraintException
     * @throws StateConstraintException
     */
    public function handle(GetCustomerAddressForEditing $query): EditableCustomerAddress
    {
        $addressId = $query->getAddressId();

        if(Address::addressExists((int)$addressId->getValue())){
            $address = $this->getAddress($addressId);
        } else {
            throw new CustomerException('Failing to load adres, please select an other or create an new adres', 0, null);
        }


        try {
            $customerId = new CustomerId((int) $address->id_customer);
            $customer = new Customer($customerId->getValue());
        } catch (PrestaShopException $e) {
            throw new CustomerException('Failed to get customer', 0, $e);
        }

        if ($customer->id !== $customerId->getValue()) {
            throw new CustomerNotFoundException($customerId, sprintf('Customer with id "%s" was not found.', $customerId->getValue()));
        }
        $reqFields = $this->getRequiredFields();
        if(is_null($this->getRequiredFields())){
            $reqFields = "";
        }

        if(empty($address->id_state)){
            $state = new NoStateId();

        } else {
            $state = new StateId((int) $address->id_state);
        }


        $editableCustomerAddress = new EditableCustomerAddress(
            $addressId,
            $customerId,
            $customer->email,
            $address->alias,
            $address->firstname,
            $address->lastname,
            $address->address1,
            $address->house_number,
            $address->house_number_extension,
            $address->city,
            new CountryId((int) $address->id_country),
            $address->postcode,
            $address->dni,
            $address->company,
            $address->vat_number,
            $address->address2,
            $state,
            $address->phone,
            $address->phone_mobile,
            $address->other,
            $reqFields
        );

        return $editableCustomerAddress;
    }
}
