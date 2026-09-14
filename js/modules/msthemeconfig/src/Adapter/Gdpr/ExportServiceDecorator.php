<?php

namespace MsThemeConfig\Adapter\Gdpr;

use AttributeGroup;
use Cart;
use Context;
use Customer;
use Order;
use PrestaShop\Module\Psgdpr\Service\Export\ExportInterface;
use PrestaShop\Module\Psgdpr\Service\ExportService;
use PrestaShop\PrestaShop\Core\Domain\Customer\ValueObject\CustomerId;
use Product;

/** Retain readable saw-cut/customization names in the native GDPR 2.x payload. */
class ExportServiceDecorator extends ExportService
{
    private ExportService $inner;
    private Context $shopContext;

    public function __construct(ExportService $inner, Context $context)
    {
        $this->inner = $inner;
        $this->shopContext = $context;
    }

    public function exportCustomerData(CustomerId $customerId, ExportInterface $exportStrategy)
    {
        $customer = new Customer($customerId->getValue());
        $data = $this->getPrestashopInformations($customer);
        $data['modules'] = $this->getThirdPartyModulesInformations($customer);

        return $exportStrategy->getData($data);
    }

    public function getPrestashopInformations(Customer $customer)
    {
        $data = $this->inner->getPrestashopInformations($customer);
        foreach ($data['orders']['data'] as &$orderRow) {
            $orderRow['state'] = (string) ($orderRow['state'] ?? '');
        }
        unset($orderRow);

        $data['productsOrdered']['data'] = [];
        foreach (Order::getCustomerOrders($customer->id) as $orderRow) {
            $order = new Order((int) $orderRow['id_order']);
            foreach ($order->getProducts() as $product) {
                $data['productsOrdered']['data'][] = [
                    'orderReference' => $order->reference,
                    'reference' => $product['product_reference'],
                    'name' => $this->productName($product, $product['product_name'], $product['customizedDatas'] ?? []),
                    'quantity' => $product['product_quantity'],
                ];
            }
        }

        $data['productsInCart']['data'] = [];
        foreach (Cart::getCustomerCarts($customer->id, false) as $cartRow) {
            $cart = new Cart((int) $cartRow['id_cart']);
            $customizations = Product::getAllCustomizedDatas($cart->id, $this->shopContext->language->id, true, $cart->id_shop) ?: [];
            foreach ($cart->getProducts() as $product) {
                $customized = $customizations[(int) $product['id_product']][(int) $product['id_product_attribute']] ?? [];
                $data['productsInCart']['data'][] = [
                    'cartId' => $cart->id,
                    'reference' => $product['reference'],
                    'name' => $this->productName($product, $product['name'], $customized),
                    'quantity' => $product['cart_quantity'] ?? $product['quantity'],
                ];
            }
        }

        return $data;
    }

    public function getThirdPartyModulesInformations($customer): array
    {
        return $this->inner->getThirdPartyModulesInformations($customer);
    }

    private function productName(array $product, string $name, ?array $customizations): string
    {
        $name = (string) AttributeGroup::stripSawCutModuleAttributeGroupName($name, (int) $this->shopContext->language->id);
        $customizationId = (int) ($product['id_customization'] ?? 0);
        if (!$customizationId) {
            return $name;
        }

        foreach ($customizations ?? [] as $addressCustomizations) {
            $fields = $addressCustomizations[$customizationId]['datas'][Product::CUSTOMIZE_TEXTFIELD] ?? [];
            if (!$fields) {
                continue;
            }
            foreach ($fields as $field) {
                $value = trim(strip_tags(html_entity_decode((string) ($field['value'] ?? ''), ENT_QUOTES | ENT_HTML5, 'UTF-8')));
                if ($value === '') {
                    continue;
                }
                $label = trim((string) ($field['name'] ?? ''));
                $name .= ' - ' . ($label !== '' ? $label . ': ' : '') . $value;
            }
            break;
        }

        return $name;
    }
}
