<?php
/**
 * 2007-2020 PrestaShop SA and Contributors
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

namespace Tests\Integration\Behaviour\Features\Context\Domain;

use Cart;
use CartRule;
use Configuration;
use Context;
use Country;
use Currency;
use Customer;
use DateInterval;
use DateTime;
use Exception;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\AddCartRuleToCartCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\AddCustomizationFieldsCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\CreateEmptyCustomerCartCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\RemoveCartRuleFromCartCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\RemoveProductFromCartCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\SetFreeShippingToCartCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\UpdateCartAddressesCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\UpdateCartCurrencyCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Command\UpdateProductQuantityInCartCommand;
use PrestaShop\PrestaShop\Core\Domain\Cart\Exception\CartException;
use PrestaShop\PrestaShop\Core\Domain\Cart\Query\GetCartInformation;
use PrestaShop\PrestaShop\Core\Domain\Cart\QueryResult\CartInformation;
use PrestaShop\PrestaShop\Core\Domain\Cart\ValueObject\CartId;
use PrestaShop\PrestaShop\Core\Domain\Product\Customization\ValueObject\CustomizationId;
use PrestaShop\PrestaShop\Core\Domain\Product\Query\SearchProducts;
use PrestaShop\PrestaShop\Core\Domain\Product\QueryResult\FoundProduct;
use Product;
use RuntimeException;
use Tests\Integration\Behaviour\Features\Context\SharedStorage;

class CartFeatureContext extends AbstractDomainFeatureContext
{
    /**
     * @Given the current currency is :currencyIsoCode
     */
    public function addCurrencyToContext($currencyIsoCode)
    {
        $currencyId = (int) Currency::getIdByIsoCode($currencyIsoCode);

        if ($currencyId) {
            $currency = new Currency($currencyId);
        } else {
            $currency = new Currency();
            $currency->name = $currencyIsoCode;
            $currency->precision = 2;
            $currency->iso_code = $currencyIsoCode;
            $currency->active = 1;
            $currency->conversion_rate = 1;
        }

        Context::getContext()->currency = $currency;
        SharedStorage::getStorage()->set($currencyIsoCode, $currency);
    }

    /**
     * @When I create an empty cart :cartReference for customer :customerReference
     *
     * @param string $cartReference
     * @param string $customerReference
     */
    public function createEmptyCartForCustomer(string $cartReference, string $customerReference)
    {
        // Clear static cache each time you create a cart
        Cart::resetStaticCache();
        /** @var Customer $customer */
        $customer = SharedStorage::getStorage()->get($customerReference);

        /** @var CartId $cartIdObject */
        $cartIdObject = $this->getCommandBus()->handle(
            new CreateEmptyCustomerCartCommand(
                (int) $customer->id
            )
        );

        SharedStorage::getStorage()->set($cartReference, $cartIdObject->getValue());
    }

    /**
     * @When I update the cart :cartReference currency to :currencyReference
     *
     * @param string $cartReference
     * @param string $currencyReference
     */
    public function updateCartCurrency(string $cartReference, string $currencyReference)
    {
        /** @var Currency $currency */
        $currency = SharedStorage::getStorage()->get($currencyReference);

        $cartId = SharedStorage::getStorage()->get($cartReference);

        $this->getCommandBus()->handle(
            new UpdateCartCurrencyCommand(
                $cartId,
                (int) $currency->id
            )
        );

        Cart::resetStaticCache();
    }

    /**
     * @When I add :quantity products :productName to the cart :cartReference
     *
     * @param int $quantity
     * @param string $productName
     * @param string $cartReference
     */
    public function addProductsToCart(int $quantity, string $productName, string $cartReference)
    {
        $productId = $this->getProductIdByName($productName);

        $this->getCommandBus()->handle(
            new UpdateProductQuantityInCartCommand(
                SharedStorage::getStorage()->get($cartReference),
                $productId,
                $quantity
            )
        );
        SharedStorage::getStorage()->set($productName, $productId);

        // Clear cart static cache or it will have no products in next calls
        Cart::resetStaticCache();
    }

    /**
     * @When I add :quantity customized products with reference :productReference to the cart :reference
     */
    public function addCustomizedProductToCarts(int $quantity, $productReference, $reference)
    {
        $productId = (int) Product::getIdByReference($productReference);
        $product = new Product($productId);
        $customizationFields = $product->getCustomizationFieldIds();
        $customizations = [];
        foreach ($customizationFields as $customizationField) {
            $customizationFieldId = (int) $customizationField['id_customization_field'];
            if (Product::CUSTOMIZE_TEXTFIELD == $customizationField['type']) {
                $customizations[$customizationFieldId] = 'Toto';
            }
        }

        $cartId = (int) SharedStorage::getStorage()->get($reference);

        /** @var CustomizationId $customizationId */
        $customizationId = $this->getCommandBus()->handle(new AddCustomizationFieldsCommand(
            $cartId,
            $productId,
            $customizations
        ));

        $this->getCommandBus()->handle(
            new UpdateProductQuantityInCartCommand(
                $cartId,
                $productId,
                $quantity,
                null,
                $customizationId->getValue()
            )
        );
    }

    /**
     * @When I select :countryIsoCode address as delivery and invoice address for customer :customerReference in cart :cartReference
     *
     * @param string $countryIsoCode
     * @param string $customerReference
     * @param string $cartReference
     */
    public function selectAddressAsDeliveryAndInvoiceAddress(string $countryIsoCode, string $customerReference, string $cartReference)
    {
        $customer = SharedStorage::getStorage()->get($customerReference);

        $getAddressByCountryIsoCode = static function ($isoCode) use ($customer) {
            $customerAddresses = $customer->getAddresses((int) Configuration::get('PS_LANG_DEFAULT'));

            foreach ($customerAddresses as $address) {
                $country = new Country($address['id_country']);

                if ($country->iso_code === $isoCode) {
                    return (int) $address['id_address'];
                }
            }

            throw new Exception(sprintf('Customer does not have address in "%s" country.', $isoCode));
        };

        $addressId = $getAddressByCountryIsoCode($countryIsoCode);

        $this->getCommandBus()->handle(
            new UpdateCartAddressesCommand(
                (int) SharedStorage::getStorage()->get($cartReference),
                $addressId,
                $addressId
            )
        );
    }

    /**
     * @When I set Free shipping to the cart :cartReference
     *
     * @param string $cartReference
     */
    public function setFreeShippingToCart(string $cartReference)
    {
        $this->getCommandBus()->handle(
            new SetFreeShippingToCartCommand(
                SharedStorage::getStorage()->get($cartReference),
                true
            )
        );
    }

    /**
     * @When I use a voucher :voucherCode for a discount of :discountAmount on the cart :cartReference
     *
     * @param string $voucherCode
     * @param float $discountAmount
     * @param string $cartReference
     *
     * @throws \PrestaShopDatabaseException
     * @throws \PrestaShopException
     */
    public function useDiscountVoucherOnCart(string $voucherCode, float $discountAmount, string $cartReference)
    {
        $cartRule = $this->createCommonCartRule($voucherCode);
        $cartRule->reduction_amount = $discountAmount;

        $this->addCartRule($cartRule);

        $this->getCommandBus()->handle(
            new AddCartRuleToCartCommand(
                SharedStorage::getStorage()->get($cartReference),
                $cartRule->id
            )
        );
    }

    /**
     * @When I use a voucher :voucherCode for a gift product :productName on the cart :cartReference
     *
     * @param string $voucherCode
     * @param string $giftProductName
     * @param string $cartReference
     */
    public function useGiftProductVoucherOnCart(string $voucherCode, string $giftProductName, string $cartReference)
    {
        $productId = $this->getProductIdByName($giftProductName);
        $cartRule = $this->createCommonCartRule($voucherCode);
        $cartRule->gift_product = $productId;

        $this->addCartRule($cartRule);

        $this->getCommandBus()->handle(
            new AddCartRuleToCartCommand(
                SharedStorage::getStorage()->get($cartReference),
                $cartRule->id
            )
        );

        $this->getSharedStorage()->set($voucherCode, $cartRule->id);
        $this->getSharedStorage()->set($giftProductName, $productId);
    }

    /**
     * @When I delete product :productName from cart :cartReference
     */
    public function deleteProduct(string $productName, string $cartReference)
    {
        $productId = (int)$this->getSharedStorage()->get($productName);
        $cartId = (int)$this->getSharedStorage()->get($cartReference);

        try {
            $this->getCommandBus()->handle(new RemoveProductFromCartCommand(
                $cartId,
                $productId
            ));
        } catch (CartException $e) {
            $this->lastException = $e;
        }
    }

    /**
     * @When I delete voucher :voucherCode from cart :cartReference
     *
     * @param string $voucherCode
     * @param string $productName
     * @param string $cartReference
     */
    public function deleteGiftCartRule(string $voucherCode, string $cartReference)
    {
        $cartId = (int) $this->getSharedStorage()->get($cartReference);
        $cartRuleId = $this->getSharedStorage()->get($voucherCode);

        $this->getCommandBus()->handle(new RemoveCartRuleFromCartCommand($cartId, $cartRuleId));
    }

    /**
     * @Then cart :cartReference should not contain product :productName
     */
    public function assertCartDoesNotContainProduct(string $cartReference, string $productName)
    {
        $productId = (int) $this->getSharedStorage()->get($productName);
        $cartInfo = $this->getCartInformationByReference($cartReference);

        /** @var CartInformation\CartProduct $cartProduct */
        foreach ($cartInfo->getProducts() as $cartProduct) {
            if ($cartProduct->getProductId() === $productId) {
                throw new RuntimeException(sprintf(
                    'Expected cart not to contain product %s, but it was found in cart',
                    $productName
                ));
            }
        }
    }

    /**
     * @Then cart :cartReference should contain product :productName
     * @Then cart :cartReference contains product :productName
     *
     * @param string $cartReference
     * @param string $productName
     */
    public function assertCartContainsProduct(string $cartReference, string $productName)
    {
        $productId = (int) $this->getSharedStorage()->get($productName);
        $cartInfo = $this->getCartInformationByReference($cartReference);

        foreach ($cartInfo->getProducts() as $cartProduct) {
            if ($cartProduct->getProductId() === $productId) {
                return;
            }
        }

        throw new RuntimeException(sprintf(
            'Expected cart to contain product %s, but it was not found',
            $productName
        ));
    }

    /**
     * @Then cart :cartReference should contain gift product :productName
     * @Given cart :cartReference contains gift product :productName
     *
     * @param string $cartReference
     * @param string $productName
     */
    public function assertCartContainsGiftProduct(string $cartReference, string $productName)
    {
        $productId = (int) $this->getSharedStorage()->get($productName);
        $cartInfo = $this->getCartInformationByReference($cartReference);

        $matchingProducts = [];

        /** @var CartInformation\CartProduct $cartProduct */
        foreach ($cartInfo->getProducts() as $cartProduct) {
            if ($cartProduct->getProductId() === $productId) {
                $matchingProducts[] = $cartProduct;
            }
        }

        if (!empty($matchingProducts)) {
            /** @var CartInformation\CartProduct $cartProduct */
            foreach ($matchingProducts as $cartProduct) {
                if ($cartProduct->isGift()) {
                    return;
                }
            }
        }

        throw new RuntimeException(sprintf(
            'Cart does not contain gift product "%s"',
            $productName
        ));
    }

    /**
     * @Then cart :cartReference should not contain gift product :productName
     * @Given cart :cartReference does not contain gift product :productName
     *
     * @param string $cartReference
     * @param string $productName
     */
    public function assertCartDoesNotContainGiftProduct(string $cartReference, string $productName)
    {
        $productId = (int) $this->getSharedStorage()->get($productName);
        $cartInfo = $this->getCartInformationByReference($cartReference);

        $matchingProducts = [];

        /** @var CartInformation\CartProduct $cartProduct */
        foreach ($cartInfo->getProducts() as $cartProduct) {
            if ($cartProduct->getProductId() === $productId) {
                $matchingProducts[] = $cartProduct;
            }
        }

        if (!empty($matchingProducts)) {
            /** @var CartInformation\CartProduct $cartProduct */
            foreach ($matchingProducts as $cartProduct) {
                if ($cartProduct->isGift()) {
                    throw new RuntimeException(sprintf(
                        'Cart contains gift product "%s"',
                        $productName
                    ));
                }
            }
        }
    }

    /**
     * @param string $cartReference
     *
     * @return CartInformation
     */
    private function getCartInformationByReference(string $cartReference): CartInformation
    {
        $cartId = $this->getSharedStorage()->get($cartReference);

        return $this->getQueryBus()->handle(new GetCartInformation($cartId));
    }

    /**
     * @param string $voucherCode
     *
     * @return CartRule
     */
    private function createCommonCartRule(string $voucherCode): CartRule
    {
        $cartRule = new CartRule();
        $cartRule->name = [Configuration::get('PS_LANG_DEFAULT') => $voucherCode];
        $cartRule->priority = 1;
        $cartRule->quantity = 1;
        $cartRule->quantity_per_user = 1;
        $now = new DateTime();
        // sub 1s to avoid bad comparisons with strictly greater than
        $now->sub(new DateInterval('P2D'));
        $cartRule->date_from = $now->format('Y-m-d H:i:s');
        $now->add(new DateInterval('P1Y'));
        $cartRule->date_to = $now->format('Y-m-d H:i:s');
        $cartRule->active = 1;
        $cartRule->code = $voucherCode;

        return $cartRule;
    }

    /**
     * @param string $productName
     *
     * @return int
     */
    private function getProductIdByName(string $productName)
    {
        $products = $this->getQueryBus()->handle(new SearchProducts($productName, 1, Context::getContext()->currency->iso_code));

        if (empty($products)) {
            throw new RuntimeException(sprintf('Product with name "%s" was not found', $productName));
        }

        /** @var FoundProduct $product */
        $product = reset($products);

        return $product->getProductId();
    }

    /**
     * @param CartRule $cartRule
     */
    private function addCartRule(CartRule $cartRule): void
    {
        if (!$cartRule->add()) {
            throw new RuntimeException('Cannot add cart rule to database');
        }
    }
}
