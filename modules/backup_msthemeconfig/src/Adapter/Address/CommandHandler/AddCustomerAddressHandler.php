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

namespace MsThemeConfig\Adapter\Address\CommandHandler;

use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\Address\AbstractAddressHandler;
use MsThemeConfig\Core\Domain\Address\Command\AddCustomerAddressCommand;
use MsThemeConfig\Core\Domain\Address\CommandHandler\AddCustomerAddressHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Address\Exception\AddressConstraintException;
use PrestaShop\PrestaShop\Core\Domain\Address\Exception\AddressException;
use PrestaShop\PrestaShop\Core\Domain\Address\Exception\CannotAddAddressException;
use PrestaShop\PrestaShop\Core\Domain\Address\ValueObject\AddressId;
use PrestaShopException;

/**
 *
 */
final class AddCustomerAddressHandler extends AbstractAddressHandler implements AddCustomerAddressHandlerInterface
{
    /**
     * {@inheritdoc}
     *
     * @throws AddressException
     * @throws AddressConstraintException
     * @throws CannotAddAddressException
     */
    public function handle(AddCustomerAddressCommand|\PrestaShop\PrestaShop\Core\Domain\Address\Command\AddCustomerAddressCommand $mcommand): AddressId
    {
        $address = $this->createAddressFromCommand($mcommand);

        try {
            $this->validateAddress($address);

            if (false === $address->add()) {
                throw new CannotAddAddressException(sprintf('Failed to add new address "%s"', $mcommand->getAddress()));
            }
        } catch (PrestaShopException $e) {
            throw new AddressException(sprintf('An error occurred when adding new address "%s"', $mcommand->getAddress()));
        }

        return new AddressId((int) $address->id);
    }

    /**
     * @param AddCustomerAddressCommand $mcommand
     *
     * @return Address
     */
    private function createAddressFromCommand(AddCustomerAddressCommand $mcommand): Address
    {
        $address = new Address();

        $address->id_customer = $mcommand->getCustomerId()->getValue();
        $address->lastname = $mcommand->getLastName();
        $address->firstname = $mcommand->getFirstName();
        $address->address1 = $mcommand->getAddress();
        $address->house_number = $mcommand->getHouseNumber();
        $address->house_number_extension = $mcommand->getHouseNumberExtension();
        $address->id_country = $mcommand->getCountryId()->getValue();
        $address->city = $mcommand->getCity();
        $address->alias = $mcommand->getAddressAlias();
        $address->postcode = $mcommand->getPostCode();
        $address->address2 = $mcommand->getAddress2();
        $address->dni = $mcommand->getDni();
        $address->company = $mcommand->getCompany();
        $address->vat_number = $mcommand->getVatNumber();
        $address->id_state = $mcommand->getStateId()->getValue();
        $address->phone = $mcommand->getHomePhone();
        $address->phone_mobile = $mcommand->getMobilePhone();
        $address->other = $mcommand->getOther();

        return $address;
    }
}
