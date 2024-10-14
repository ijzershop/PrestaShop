<?php

namespace MsThemeConfig\Service;

use DynamicProduct\classes\helpers\DynamicInputFieldsHelper;
use DynamicProduct\classes\models\DynamicConfig;
use DynamicProduct\classes\models\DynamicInput;
use MsThemeConfig\QueryResult\DmsOrderPreviewProductDetail;
use PrestaShop\PrestaShop\Adapter\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\AttributeGroup;
use PrestaShop\PrestaShop\Adapter\Entity\Carrier;
use PrestaShop\PrestaShop\Adapter\Entity\Country;
use PrestaShop\PrestaShop\Adapter\Entity\Currency;
use PrestaShop\PrestaShop\Adapter\Entity\Customer;
use PrestaShop\PrestaShop\Adapter\Entity\Group;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\OrderCarrier;
use PrestaShop\Decimal\DecimalNumber;
use PrestaShop\PrestaShop\Adapter\Address\AddressFormatter;
use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Core\Address\AddressFormatterInterface;
use PrestaShop\PrestaShop\Core\Domain\Address\ValueObject\AddressId;
use PrestaShop\PrestaShop\Core\Domain\Order\Exception\OrderNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Order\Query\GetOrderPreview;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryHandler\GetOrderPreviewHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderPreview;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderPreviewInvoiceDetails;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderPreviewProductDetail;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderPreviewShippingDetails;
use PrestaShop\PrestaShop\Core\Domain\Order\ValueObject\OrderId;
use PrestaShop\PrestaShop\Core\Domain\Shop\ValueObject\ShopConstraint;
use PrestaShop\PrestaShop\Core\Localization\Locale\Repository as LocaleRepository;
use PrestaShop\PrestaShop\Adapter\Entity\State;
use PrestaShop\PrestaShop\Adapter\Entity\StockAvailable;
use Product;
use Smarty;
use Tools;
use Validate;
use Context;

/**
 *
 */
final class DmsAdminOrderPreviewService implements GetOrderPreviewHandlerInterface
{
    /**
     * @var LocaleRepository
     */
    private $localeRepository;

    /**
     * @var string
     */
    private $locale;

    /**
     * @var AddressFormatterInterface
     */
    private $addressFormatter;

    /**
     * @param LocaleRepository $localeRepository
     * @param string $locale
     * @param AddressFormatterInterface|null $addressFormatter
     */
    public function __construct(
        LocaleRepository $localeRepository,
        string $locale,
        AddressFormatterInterface $addressFormatter = null
    ) {
        $this->localeRepository = $localeRepository;
        $this->locale = $locale;
        $this->configuration = new Configuration();
        $this->addressFormatter = $addressFormatter ?? new AddressFormatter();
    }


    public function handle(GetOrderPreview $query): OrderPreview
    {
        $order = $this->getOrder($query->getOrderId());
        $priceDisplayMethod = $this->getOrderTaxCalculationMethod($order);

        return new OrderPreview(
            $this->getInvoiceDetails($order),
            $this->getShippingDetails($order),
            $this->getProductDetails($order),
            $order->isVirtual(),
            $priceDisplayMethod == PS_TAX_INC,
            $this->addressFormatter->format(new AddressId((int) $order->id_address_invoice)),
            $this->addressFormatter->format(new AddressId((int) $order->id_address_delivery))
        );
    }

    /**
     * @param OrderId $orderId
     *
     * @return Order
     *
     * @throws OrderNotFoundException
     */
    private function getOrder(OrderId $orderId): Order
    {
        $order = new Order($orderId->getValue());
        if ($order->id !== $orderId->getValue()) {
            throw new OrderNotFoundException($orderId, sprintf('Order with id "%s" was not found.', $orderId->getValue()));
        }

        return $order;
    }

    /**
     * @param Order $order
     *
     * @return OrderPreviewInvoiceDetails
     */
    private function getInvoiceDetails(Order $order): OrderPreviewInvoiceDetails
    {
        $customer = new Customer($order->id_customer);
        if(Address::addressExists($order->id_address_invoice)){
            $address = new Address($order->id_address_invoice);
        } else {
            $failingAddressId = $this->configuration->get(
                'MSTHEMECONFIG_CUSTOM_ADDRESS_WHEN_FAIL',
                1,
                ShopConstraint::shop((int) $order->id_shop)
            );

            $address = new Address($failingAddressId);
        }
        $country = new Country($address->id_country);
        $state = new State($address->id_state);
        $stateName = Validate::isLoadedObject($state) ? $state->name : null;
        $dni = Address::dniRequired($address->id_country) ? $address->dni : null;

        return new OrderPreviewInvoiceDetails(
            $address->firstname,
            $address->lastname,
            $address->company,
            $address->vat_number,
            $address->address1,
            $address->address2,
            $address->city,
            $address->postcode,
            $stateName,
            $country->name[(int) $order->getAssociatedLanguage()->getId()],
            $customer->email ?? null,
            $address->phone,
            $dni
        );
    }


    private function getShippingDetails(Order $order): OrderPreviewShippingDetails
    {
        if(Address::addressExists($order->id_address_delivery)){
            $address = new Address($order->id_address_delivery);
        } else {
            $failingAddressId = $this->configuration->get(
                'MSTHEMECONFIG_CUSTOM_ADDRESS_WHEN_FAIL',
                1,
                ShopConstraint::shop((int) $order->id_shop)
            );

            $address = new Address($failingAddressId);
        }
        $country = new Country($address->id_country);
        $carrier = new Carrier($order->id_carrier);
        $state = new State($address->id_state);

        $carrierName = $trackingUrl = null;
        $stateName = Validate::isLoadedObject($state) ? $state->name : null;

        $orderCarrierId = $order->getIdOrderCarrier();
        $orderCarrier = new OrderCarrier($orderCarrierId);

        if (Validate::isLoadedObject($carrier)) {
            $carrierName = $carrier->name;
            $trackingUrl = str_replace('@', $orderCarrier->tracking_number ?: '@', $carrier->url);
        }

        $dni = Address::dniRequired($address->id_country) ? $address->dni : null;

        return new OrderPreviewShippingDetails(
            $address->firstname,
            $address->lastname,
            $address->company,
            $address->vat_number,
            $address->address1,
            $address->address2,
            $address->city,
            $address->postcode,
            $stateName,
            $country->name[(int) $order->getAssociatedLanguage()->getId()],
            $address->phone,
            $carrierName,
            $orderCarrier->tracking_number ?: null,
            $dni,
            $trackingUrl
        );
    }

    /**
     * @param Order $order
     *
     * @return OrderPreviewProductDetail[]
     */
    private function getProductDetails(Order $order): array
    {
        $productDetails = [];
        $currency = new Currency($order->id_currency);
        $locale = $this->localeRepository->getLocale($this->locale);

        $taxCalculationMethod = $this->getOrderTaxCalculationMethod($order);

        foreach ($order->getProductsDetail() as $detail) {
            $unitPrice = $detail['unit_price_tax_excl'];
            $totalPrice = $detail['total_price_tax_excl'];

            $totalPriceTaxIncl = new DecimalNumber($detail['total_price_tax_incl']);
            $totalPriceTaxExcl = new DecimalNumber($detail['total_price_tax_excl']);

            $totalTaxAmount = $totalPriceTaxIncl->minus($totalPriceTaxExcl);

            if (PS_TAX_INC === $taxCalculationMethod) {
                $unitPrice = $detail['unit_price_tax_incl'];
                $totalPrice = $detail['total_price_tax_incl'];
            }

            if(Product::isDynamicProduct($detail)){
                $detail['customization'] =  $this->displayAdminInputSummary($detail['customization']);
            }


            $productDetails[] = new DmsOrderPreviewProductDetail(
                AttributeGroup::stripSawCutModuleAttributeGroupName($detail['product_name']),
                $detail['product_reference'],
                StockAvailable::getLocation(
                    $detail['product_id'],
                    $detail['product_attribute_id'],
                    $detail['id_shop']
                ),
                (int) $detail['product_quantity'],
                $locale->formatPrice($unitPrice, $currency->iso_code),
                $locale->formatPrice($totalPrice, $currency->iso_code),
                $locale->formatPrice((string) $totalTaxAmount, $currency->iso_code),
                $detail['customization'],
                $detail['technical_image'],
                $detail['product_id']
            );
        }

        return $productDetails;
    }

    /**
     * @param Order $order
     *
     * @return int
     */
    private function getOrderTaxCalculationMethod(Order $order): int
    {
        $customer = new Customer($order->id_customer);

        return Group::getPriceDisplayMethod((int) $customer->id_default_group);
    }




    public function displayAdminInputSummary($id_input)
    {
        $id_lang = (int)Context::getContext()->language->id;
        $input = new DynamicInput($id_input, $id_lang, Context::getContext()->shop->getShopId());
        $input_fields[0] = $input->getInputFields();

        $dynamic_config = DynamicConfig::getByProduct($input->id_product);
        if ($dynamic_config->split_summary) {
            $grouped_fields = DynamicInputFieldsHelper::groupFields($input->id_product, $input_fields);
        } else {
            $fields = [];
            foreach ($input_fields[0] as $i => $field) {
                if($field->type !== 0){
                    if($field->type !== 2){
                        $field->visible = true;
                        $fields[$i] = $field;
                    } else {
                        $field->visible = false;
                        $fields[$i] = $field;
                    }
                }

            }
            $grouped_fields = [
                [
                    'label' => '',
                    'fields' => $fields,
                ],
            ];
        }

        $smarty = new Smarty();

        $smarty->assign([
            'id_lang' => $id_lang,
            'input' => $input,
            'grouped_fields' => $grouped_fields,
            'is_pdf' => false,
            'is_admin' => true,
        ]);

        return $smarty->fetch(_PS_ROOT_DIR_.'/modules/modernesmiddynamicproduct/views/templates/admin/display-dynamic-input-summary.tpl');
    }

}
