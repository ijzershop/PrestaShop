<?php
/**
 * 2007-2026 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\context;
if (!defined('_PS_VERSION_')) {
    exit;
}

use PrestaShop\PrestaShop\Core\Context\CountryContext;
use PrestaShop\PrestaShop\Core\Context\CurrencyContext;
use PrestaShop\PrestaShop\Core\Context\EmployeeContext;
use PrestaShop\PrestaShop\Core\Context\LanguageContext;
use PrestaShop\PrestaShop\Core\Context\ShopContext;

class DynamicContext
{
    private static function getContainer()
    {
        global $kernel;
        if ($kernel && method_exists($kernel, 'getContainer')) {
            return $kernel->getContainer();
        }

        return null;
    }

    private static function getService(string $serviceClass)
    {
        $container = self::getContainer();
        if (!$container) {
            return null;
        }

        try {
            if ($container->has($serviceClass)) {
                return $container->get($serviceClass);
            }
        } catch (\Exception $e) {
        }

        return null;
    }

    public static function getLanguageId(): int
    {
        if (class_exists(LanguageContext::class)) {
            /** @var LanguageContext|null $ctx */
            $ctx = self::getService(LanguageContext::class);
            if ($ctx) {
                return (int) $ctx->getId();
            }
        }

        return (int) \Context::getContext()->language->id;
    }

    public static function getLanguageIsoCode(): string
    {
        if (class_exists(LanguageContext::class)) {
            /** @var LanguageContext|null $ctx */
            $ctx = self::getService(LanguageContext::class);
            if ($ctx) {
                return $ctx->getIsoCode();
            }
        }

        return \Context::getContext()->language->iso_code;
    }

    public static function getShopId(): int
    {
        if (class_exists(ShopContext::class)) {
            /** @var ShopContext|null $ctx */
            $ctx = self::getService(ShopContext::class);
            if ($ctx) {
                return (int) $ctx->getId();
            }
        }

        return (int) \Context::getContext()->shop->id;
    }

    public static function getShopName(): string
    {
        if (class_exists(ShopContext::class)) {
            /** @var ShopContext|null $ctx */
            $ctx = self::getService(ShopContext::class);
            if ($ctx) {
                return $ctx->getName();
            }
        }

        return \Context::getContext()->shop->name;
    }

    public static function getShopBaseUrl(bool $ssl = true): string
    {
        return \Context::getContext()->shop->getBaseURL($ssl);
    }

    public static function getShopBaseUri(): string
    {
        return \Context::getContext()->shop->getBaseURI();
    }

    public static function getCurrencyId(): int
    {
        if (class_exists(CurrencyContext::class)) {
            /** @var CurrencyContext|null $ctx */
            $ctx = self::getService(CurrencyContext::class);
            if ($ctx) {
                return (int) $ctx->getId();
            }
        }

        $context = \Context::getContext();
        if ($context->currency) {
            return (int) $context->currency->id;
        }

        return (int) \Currency::getDefaultCurrency()->id;
    }

    public static function getCurrencyIsoCode(): string
    {
        if (class_exists(CurrencyContext::class)) {
            /** @var CurrencyContext|null $ctx */
            $ctx = self::getService(CurrencyContext::class);
            if ($ctx) {
                return $ctx->getIsoCode();
            }
        }

        $context = \Context::getContext();
        if ($context->currency) {
            return $context->currency->iso_code;
        }

        return \Currency::getDefaultCurrency()->iso_code;
    }

    public static function getCurrency(): \Currency
    {
        $context = \Context::getContext();
        if ($context->currency) {
            return $context->currency;
        }

        return \Currency::getDefaultCurrency();
    }

    public static function getEmployeeId(): int
    {
        if (class_exists(EmployeeContext::class)) {
            /** @var EmployeeContext|null $ctx */
            $ctx = self::getService(EmployeeContext::class);
            if ($ctx) {
                $employee = $ctx->getEmployee();
                if ($employee) {
                    return (int) $employee->getId();
                }
            }
        }

        $context = \Context::getContext();
        if ($context->employee) {
            return (int) $context->employee->id;
        }

        return 0;
    }

    public static function getEmployeeProfileId(): int
    {
        if (class_exists(EmployeeContext::class)) {
            /** @var EmployeeContext|null $ctx */
            $ctx = self::getService(EmployeeContext::class);
            if ($ctx) {
                $employee = $ctx->getEmployee();
                if ($employee) {
                    return (int) $employee->getProfileId();
                }
            }
        }

        $context = \Context::getContext();
        if ($context->employee) {
            return (int) $context->employee->id_profile;
        }

        return 0;
    }

    public static function getCountryId(): int
    {
        if (class_exists(CountryContext::class)) {
            /** @var CountryContext|null $ctx */
            $ctx = self::getService(CountryContext::class);
            if ($ctx) {
                return (int) $ctx->getId();
            }
        }

        if (method_exists('Tools', 'getCountry')) {
            return (int) \Tools::getCountry();
        }

        return 0;
    }

    public static function getController()
    {
        return \Context::getContext()->controller;
    }

    public static function getCustomerId(): int
    {
        $context = \Context::getContext();
        if ($context->customer) {
            return (int) $context->customer->id;
        }

        return 0;
    }

    public static function getCustomerDefaultGroup(): ?int
    {
        $context = \Context::getContext();
        if ($context->customer) {
            return (int) $context->customer->id_default_group;
        }

        return null;
    }

    public static function getCartId(): int
    {
        $context = \Context::getContext();
        if ($context->cart && \Validate::isLoadedObject($context->cart)) {
            return (int) $context->cart->id;
        }

        if (isset($context->cookie->id_cart)) {
            return (int) $context->cookie->id_cart;
        }

        return 0;
    }

    public static function getCart(): ?\Cart
    {
        return \Context::getContext()->cart;
    }

    public static function getCartAddressDelivery(): int
    {
        $context = \Context::getContext();
        if ($context->cart) {
            return (int) $context->cart->id_address_delivery;
        }

        return 0;
    }

    public static function getCookieCustomerId(): int
    {
        $context = \Context::getContext();
        if ($context->cookie) {
            return (int) $context->cookie->id_customer;
        }

        return 0;
    }

    public static function getCookieGuestId(): int
    {
        $context = \Context::getContext();
        if ($context->cookie) {
            return (int) $context->cookie->id_guest;
        }

        return 0;
    }

    public static function getCookie(): ?\Cookie
    {
        return \Context::getContext()->cookie;
    }

    public static function getLink(): \Link
    {
        return \Context::getContext()->link;
    }

    public static function getSmarty(): \Smarty
    {
        return \Context::getContext()->smarty;
    }

    public static function getLocale()
    {
        $context = \Context::getContext();
        if (method_exists($context, 'getCurrentLocale')) {
            return $context->getCurrentLocale();
        }
        if (method_exists('Tools', 'getContextLocale')) {
            return \Tools::getContextLocale($context);
        }

        return null;
    }

    public static function formatPrice(float $price): string
    {
        $locale = self::getLocale();
        if ($locale) {
            return $locale->formatPrice($price, self::getCurrencyIsoCode());
        }

        return \Tools::displayPrice($price);
    }

    public static function cloneContext(): \Context
    {
        return \Context::getContext()->cloneContext();
    }

    public static function getLegacyContext(): \Context
    {
        return \Context::getContext();
    }

    public static function getSession()
    {
        return \Context::getContext()->session ?? null;
    }
}
