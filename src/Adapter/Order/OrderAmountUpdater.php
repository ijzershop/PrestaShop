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

declare(strict_types=1);

namespace PrestaShop\PrestaShop\Adapter\Order;

use Address;
use Cache;
use Carrier;
use Cart;
use CartRule;
use Currency;
use Customer;
use Order;
use OrderCarrier;
use OrderCartRule;
use OrderDetail;
use PrestaShop\Decimal\Number;
use PrestaShop\PrestaShop\Adapter\ContextStateManager;
use PrestaShop\PrestaShop\Core\Cart\CartRuleData;
use PrestaShop\PrestaShop\Core\Domain\Configuration\ShopConfigurationInterface;
use PrestaShop\PrestaShop\Core\Domain\Order\Exception\OrderException;
use PrestaShop\PrestaShop\Core\Domain\Shop\ValueObject\ShopConstraint;
use PrestaShop\PrestaShop\Core\Localization\CLDR\ComputingPrecision;
use PrestaShopDatabaseException;
use PrestaShopException;
use Product;
use Shop;
use Tools;
use Validate;

class OrderAmountUpdater
{
    /**
     * @var ShopConfigurationInterface
     */
    private $shopConfiguration;

    /**
     * @var ContextStateManager
     */
    private $contextStateManager;

    /**
     * @var OrderDetailUpdater
     */
    private $orderDetailUpdater;

    /**
     * @var array
     */
    private $orderConstraints = [];

    /**
     * @var bool
     */
    private $keepOrderPrices = true;

    /**
     * @param ShopConfigurationInterface $shopConfiguration
     * @param ContextStateManager $contextStateManager
     * @param OrderDetailUpdater $orderDetailUpdater
     */
    public function __construct(
        ShopConfigurationInterface $shopConfiguration,
        ContextStateManager $contextStateManager,
        OrderDetailUpdater $orderDetailUpdater
    ) {
        $this->shopConfiguration = $shopConfiguration;
        $this->contextStateManager = $contextStateManager;
        $this->orderDetailUpdater = $orderDetailUpdater;
    }

    /**
     * @param Order $order
     * @param Cart $cart
     * @param int|null $orderInvoiceId
     *
     * @throws OrderException
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function update(
        Order $order,
        Cart $cart,
        ?int $orderInvoiceId = null
    ): void {
        $this->cleanCaches();

        $this->contextStateManager
            ->saveCurrentContext()
            ->setCart($cart)
            ->setCurrency(new Currency($cart->id_currency))
            ->setCustomer(new Customer($cart->id_customer))
            ->setLanguage($cart->getAssociatedLanguage())
            ->setCountry($cart->getTaxCountry())
            ->setShop(new Shop($cart->id_shop))
        ;

        try {
            // @todo: use https://github.com/PrestaShop/decimal for price computations
            $computingPrecision = $this->getPrecisionFromCart($cart);

            // Update order details (if quantity or product price have been modified)
            $this->updateOrderDetails($order, $cart);

            // Recalculate cart rules and Fix differences between cart's cartRules and order's cartRules
            $this->updateOrderCartRules($order, $cart, $computingPrecision, $orderInvoiceId);

            // Update order totals
            $this->updateOrderTotals($order, $cart, $computingPrecision);

            // Update carrier weight for shipping cost
            $this->updateOrderCarrier($order, $cart);

            // Order::update is called after previous functions so that we only call it once
            if (!$order->update()) {
                throw new OrderException('Could not update order invoice in database.');
            }

            $this->updateOrderInvoices($order, $cart, $computingPrecision);
        } finally {
            $this->contextStateManager->restorePreviousContext();
        }
    }

    /**
     * There are many caches among legacy classes that can store previous prices
     * we need to clean them to make sure the price is completely up to date
     */
    private function cleanCaches(): void
    {
        // For many intermediate computations
        Cart::resetStaticCache();

        // For discount computation
        CartRule::resetStaticCache();
        Cache::clean('getContextualValue_*');

        // For shipping costs
        Carrier::resetStaticCache();
        Cache::clean('getPackageShippingCost_*');
    }

    /**
     * @param Order $order
     * @param Cart $cart
     * @param int $computingPrecision
     */
    private function updateOrderTotals(Order $order, Cart $cart, int $computingPrecision): void
    {
        $orderProducts = $order->getCartProducts();

        $carrierId = $order->id_carrier;
        $order->total_discounts = (float) abs($cart->getOrderTotal(true, Cart::ONLY_DISCOUNTS, $orderProducts, $carrierId, false, $this->keepOrderPrices));
        $order->total_discounts_tax_excl = (float) abs($cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS, $orderProducts, $carrierId, false, $this->keepOrderPrices));
        $order->total_discounts_tax_incl = (float) abs($cart->getOrderTotal(true, Cart::ONLY_DISCOUNTS, $orderProducts, $carrierId, false, $this->keepOrderPrices));

        // We set $useEcotax to false because
        //    $cart->getOrderTotal will fetch from order details which have already ecotax in their prices
        $useEcotax = false;
        // We should always use Cart::BOTH for the order total since it contains all products, shipping fees and cart rules
        $order->total_paid = Tools::ps_round(
            (float) $cart->getOrderTotal(true, Cart::BOTH, $orderProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
            $computingPrecision
        );
        $order->total_paid_tax_excl = Tools::ps_round(
            (float) $cart->getOrderTotal(false, Cart::BOTH, $orderProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
            $computingPrecision
        );
        $order->total_paid_tax_incl = Tools::ps_round(
            (float) $cart->getOrderTotal(true, Cart::BOTH, $orderProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
            $computingPrecision
        );

        $order->total_products = (float) $cart->getOrderTotal(false, Cart::ONLY_PRODUCTS, $orderProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax);
        $order->total_products_wt = (float) $cart->getOrderTotal(true, Cart::ONLY_PRODUCTS, $orderProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax);

        $order->total_wrapping = abs($cart->getOrderTotal(true, Cart::ONLY_WRAPPING, $orderProducts, $carrierId, false, $this->keepOrderPrices));
        $order->total_wrapping_tax_excl = abs($cart->getOrderTotal(false, Cart::ONLY_WRAPPING, $orderProducts, $carrierId, false, $this->keepOrderPrices));
        $order->total_wrapping_tax_incl = abs($cart->getOrderTotal(true, Cart::ONLY_WRAPPING, $orderProducts, $carrierId, false, $this->keepOrderPrices));

        $totalShippingTaxIncluded = $order->total_shipping_tax_incl;
        $totalShippingTaxExcluded = $order->total_shipping_tax_excl;

        $order->total_shipping = $cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $orderProducts, $carrierId, false, $this->keepOrderPrices);
        $order->total_shipping_tax_excl = $cart->getOrderTotal(false, Cart::ONLY_SHIPPING, $orderProducts, $carrierId, false, $this->keepOrderPrices);
        $order->total_shipping_tax_incl = $cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $orderProducts, $carrierId, false, $this->keepOrderPrices);

        if (!$this->getOrderConfiguration('PS_ORDER_RECALCULATE_SHIPPING', $order)) {
            $shippingDiffTaxIncluded = $order->total_shipping_tax_incl - $totalShippingTaxIncluded;
            $shippingDiffTaxExcluded = $order->total_shipping_tax_excl - $totalShippingTaxExcluded;

            $order->total_shipping = $totalShippingTaxIncluded;
            $order->total_shipping_tax_incl = $totalShippingTaxIncluded;
            $order->total_shipping_tax_excl = $totalShippingTaxExcluded;

            $order->total_paid -= $shippingDiffTaxIncluded;
            $order->total_paid_tax_incl -= $shippingDiffTaxIncluded;
            $order->total_paid_tax_excl -= $shippingDiffTaxExcluded;
        }
    }

    /**
     * @param Order $order
     * @param Cart $cart
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function updateOrderCarrier(Order $order, Cart $cart): void
    {
        $orderCarrier = new OrderCarrier((int) $order->getIdOrderCarrier());

        if (Validate::isLoadedObject($orderCarrier)) {
            $orderCarrier->weight = (float) $order->getTotalWeight();
            $orderCarrier->shipping_cost_tax_incl = (float) $order->total_shipping_tax_incl;
            $orderCarrier->shipping_cost_tax_excl = (float) $order->total_shipping_tax_excl;

            if ($orderCarrier->update()) {
                $order->weight = sprintf('%.3f ' . $this->getOrderConfiguration('PS_WEIGHT_UNIT', $order), $orderCarrier->weight);
            }
        }

        if (!$cart->isVirtualCart() && isset($order->id_carrier)) {
            $carrier = new Carrier((int) $order->id_carrier, (int) $cart->id_lang);
            if (null !== $carrier && Validate::isLoadedObject($carrier)) {
                $taxAddressId = (int) $order->{$this->getOrderConfiguration('PS_TAX_ADDRESS_TYPE', $order)};
                $order->carrier_tax_rate = $carrier->getTaxesRate(new Address($taxAddressId));
            }
        }
    }

    /**
     * @param Order $order
     * @param Cart $cart
     *
     * @throws OrderException
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function updateOrderDetails(Order $order, Cart $cart): void
    {
        // We set $useEcotax to false else $cart->getProducts apply a second time ecotax on price
        $useEcotax = false;
        // Get cart products with prices kept from order
        $cartProducts = $cart->getProducts(true, false, null, true, $this->keepOrderPrices, $useEcotax);
        foreach ($order->getCartProducts() as $orderProduct) {
            $orderDetail = new OrderDetail($orderProduct['id_order_detail'], null, $this->contextStateManager->getContext());
            $cartProduct = $this->getProductFromCart($cartProducts, (int) $orderDetail->product_id, (int) $orderDetail->product_attribute_id);

            $this->orderDetailUpdater->updateOrderDetail(
                $orderDetail,
                $order,
                new Number((string) $cartProduct['price_with_reduction_without_tax']),
                new Number((string) $cartProduct['price_with_reduction'])
            );
        }
    }

    /**
     * @param array $cartProducts
     * @param int $productId
     * @param int $productAttributeId
     *
     * @return array
     */
    private function getProductFromCart(array $cartProducts, int $productId, int $productAttributeId): array
    {
        $cartProduct = array_reduce($cartProducts, function ($carry, $item) use ($productId, $productAttributeId) {
            if (null !== $carry) {
                return $carry;
            }

            $productMatch = $item['id_product'] == $productId;
            $combinationMatch = $item['id_product_attribute'] == $productAttributeId;

            return $productMatch && $combinationMatch ? $item : null;
        });

        // This shouldn't happen, if it does something was not done before updating the Order (removing an OrderDetail maybe)
        if (null === $cartProduct) {
            throw new OrderException('Could not find the product in cart, meaning Order and Cart are out of sync');
        }

        return $cartProduct;
    }

    /**
     * Update cart rules to be synced with current cart:
     * - cart rules attached to new product may be added/removed
     * - global shop cart rules may be added/removed
     * - cart rules amount may vary because other cart rules have been added/removed
     *
     * @param Order $order
     * @param Cart $cart
     * @param int $computingPrecision
     * @param int|null $orderInvoiceId
     *
     * @throws OrderException
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function updateOrderCartRules(
        Order $order,
        Cart $cart,
        int $computingPrecision,
        ?int $orderInvoiceId
    ): void {
        CartRule::autoAddToCart();
        CartRule::autoRemoveFromCart();
        $carrierId = $order->id_carrier;

        $newCartRules = $cart->getCartRules();
        // We need the calculator to compute the discount on the whole products because they can interact with each
        // other so they can't be computed independently, it needs to keep order prices
        $calculator = $cart->newCalculator($order->getCartProducts(), $newCartRules, $carrierId, $computingPrecision, $this->keepOrderPrices);
        $calculator->processCalculation();

        foreach ($order->getCartRules() as $orderCartRuleData) {
            /** @var CartRuleData $cartRuleData */
            foreach ($calculator->getCartRulesData() as $cartRuleData) {
                $cartRule = $cartRuleData->getCartRule();
                if ($cartRule->id == $orderCartRuleData['id_cart_rule']) {
                    // Cart rule is still in the cart no need to remove it, but we update it as the amount may have changed
                    $orderCartRule = new OrderCartRule($orderCartRuleData['id_order_cart_rule']);
                    $orderCartRule->id_order = $order->id;
                    $orderCartRule->name = $cartRule->name;
                    $orderCartRule->free_shipping = $cartRule->free_shipping;
                    $orderCartRule->value = Tools::ps_round($cartRuleData->getDiscountApplied()->getTaxIncluded(), $computingPrecision);
                    $orderCartRule->value_tax_excl = Tools::ps_round($cartRuleData->getDiscountApplied()->getTaxExcluded(), $computingPrecision);
                    $orderCartRule->save();
                    continue 2;
                }
            }

            // This one is no longer in the new cart rules so we delete it
            $orderCartRule = new OrderCartRule($orderCartRuleData['id_order_cart_rule']);
            // This one really needs to be deleted because it doesn't match the applied cart rules any more
            // we don't use soft deleted here (unlike in the handler) but hard delete
            if (!$orderCartRule->delete()) {
                throw new OrderException('Could not delete order cart rule from database.');
            }
        }

        // Finally add the new cart rules that are not in the Order
        foreach ($calculator->getCartRulesData() as $cartRuleData) {
            $cartRule = $cartRuleData->getCartRule();
            foreach ($order->getCartRules() as $orderCartRuleData) {
                if ($cartRule->id == $orderCartRuleData['id_cart_rule']) {
                    // This cart rule is already present no need to add it
                    continue 2;
                }
            }

            // Add missing order cart rule
            $orderCartRule = new OrderCartRule();
            $orderCartRule->id_order = $order->id;
            $orderCartRule->id_cart_rule = $cartRule->id;
            $orderCartRule->id_order_invoice = $orderInvoiceId ?? 0;
            $orderCartRule->name = $cartRule->name;
            $orderCartRule->free_shipping = $cartRule->free_shipping;
            $orderCartRule->value = Tools::ps_round($cartRuleData->getDiscountApplied()->getTaxIncluded(), $computingPrecision);
            $orderCartRule->value_tax_excl = Tools::ps_round($cartRuleData->getDiscountApplied()->getTaxExcluded(), $computingPrecision);
            $orderCartRule->save();
        }
    }

    /**
     * @param Order $order
     * @param Cart $cart
     * @param int $computingPrecision
     *
     * @throws OrderException
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function updateOrderInvoices(Order $order, Cart $cart, int $computingPrecision): void
    {
        $invoiceProducts = [];
        foreach ($order->getCartProducts() as $orderProduct) {
            if (!empty($orderProduct['id_order_invoice'])) {
                $invoiceProducts[$orderProduct['id_order_invoice']][] = $orderProduct;
            }
        }

        $invoiceCollection = $order->getInvoicesCollection();
        $firstInvoice = $invoiceCollection->getFirst();

        foreach ($invoiceCollection as $invoice) {
            // If all the invoice's products have been removed the offset won't exist
            $currentInvoiceProducts = isset($invoiceProducts[$invoice->id]) ? $invoiceProducts[$invoice->id] : [];

            // We set $useEcotax to false because
            //    $cart->getOrderTotal will fetch from order details which have already ecotax in their prices
            $useEcotax = false;
            // Shipping are computed on first invoice only
            $carrierId = $order->id_carrier;
            $totalMethod = ($firstInvoice === null || $firstInvoice->id == $invoice->id) ? Cart::BOTH : Cart::BOTH_WITHOUT_SHIPPING;
            $invoice->total_paid_tax_excl = Tools::ps_round(
                (float) $cart->getOrderTotal(false, $totalMethod, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
                $computingPrecision
            );
            $invoice->total_paid_tax_incl = Tools::ps_round(
                (float) $cart->getOrderTotal(true, $totalMethod, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
                $computingPrecision
            );

            $invoice->total_products = Tools::ps_round(
                (float) $cart->getOrderTotal(false, Cart::ONLY_PRODUCTS, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
                $computingPrecision
            );
            $invoice->total_products_wt = Tools::ps_round(
                (float) $cart->getOrderTotal(true, Cart::ONLY_PRODUCTS, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
                $computingPrecision
            );

            $invoice->total_discount_tax_excl = Tools::ps_round(
                (float) $cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
                $computingPrecision
            );

            $invoice->total_discount_tax_incl = Tools::ps_round(
                (float) $cart->getOrderTotal(true, Cart::ONLY_DISCOUNTS, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax),
                $computingPrecision
            );

            $totalShippingTaxIncluded = $invoice->total_shipping_tax_incl;
            $totalShippingTaxExcluded = $invoice->total_shipping_tax_excl;

            $invoice->total_shipping = $cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax);
            $invoice->total_shipping_tax_excl = $cart->getOrderTotal(false, Cart::ONLY_SHIPPING, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax);
            $invoice->total_shipping_tax_incl = $cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $currentInvoiceProducts, $carrierId, false, $this->keepOrderPrices, $useEcotax);

            if (!$this->getOrderConfiguration('PS_ORDER_RECALCULATE_SHIPPING', $order)) {
                $shippingDiffTaxIncluded = $invoice->total_shipping_tax_incl - $totalShippingTaxIncluded;
                $shippingDiffTaxExcluded = $invoice->total_shipping_tax_excl - $totalShippingTaxExcluded;

                $invoice->total_shipping = $totalShippingTaxIncluded;
                $invoice->total_shipping_tax_incl = $totalShippingTaxIncluded;
                $invoice->total_shipping_tax_excl = $totalShippingTaxExcluded;

                $invoice->total_paid -= $shippingDiffTaxIncluded;
                $invoice->total_paid_tax_incl -= $shippingDiffTaxIncluded;
                $invoice->total_paid_tax_excl -= $shippingDiffTaxExcluded;
            }

            if (!$invoice->update()) {
                throw new OrderException('Could not update order invoice in database.');
            }
        }
    }

    /**
     * @param Cart $cart
     *
     * @return int
     */
    private function getPrecisionFromCart(Cart $cart): int
    {
        $computingPrecision = new ComputingPrecision();
        $currency = new Currency((int) $cart->id_currency);

        return $computingPrecision->getPrecision((int) $currency->precision);
    }

    /**
     * @param string $key
     * @param Order $order
     *
     * @return mixed
     */
    private function getOrderConfiguration(string $key, Order $order)
    {
        return $this->shopConfiguration->get($key, null, $this->getOrderShopConstraint($order));
    }

    /**
     * @param Order $order
     *
     * @return ShopConstraint
     */
    private function getOrderShopConstraint(Order $order): ShopConstraint
    {
        $constraintKey = $order->id_shop . '-' . $order->id_shop_group;
        if (!isset($this->orderConstraints[$constraintKey])) {
            $this->orderConstraints[$constraintKey] = new ShopConstraint(
                (int) $order->id_shop,
                (int) $order->id_shop_group
            );
        }

        return $this->orderConstraints[$constraintKey];
    }
}
