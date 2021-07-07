<?php
/**
 * 2007-2019 PrestaShop and Contributors
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
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

/**
 * @since 1.5
 */
class HTMLTemplatePhysicalOnCreditOrderSlip extends HTMLTemplateInvoice
{
    public $order;
    public $order_slip;

    /**
     * @param OrderSlip $order_slip
     * @param $smarty
     *
     * @throws PrestaShopException
     */
    public function __construct($cart, $smarty)
    {

        $this->cart = $cart;
        $this->id_cart = $this->cart->id;

        if(is_null($this->cart->id)){
            $this->order = new Order((int)Tools::getValue('id_order'));
            $this->cart = new Cart($this->order->id_cart);
            $products = $this->cart->getProducts(true);
        } else {
            $this->order = new Order();
            $products = $this->cart->getProducts(true);
        }

        foreach ($products as $key => $product) {
            $customized_datas = Product::getAllCustomizedDatas($this->id_cart, null, true, null, (int) $product['id_customization']);

            $products[$key]['customizedDatas'] = $customized_datas;
            Product::addProductCustomizationPrice($product, $customized_datas);
        }

        $this->order->products = $products;
        $this->smarty = $smarty;

        // header informations
        $this->date = Tools::displayDate(date('Y-m-d', time()));
        $this->order->date_add = date('d-m-Y', time());
        $prefix = Configuration::get('PS_CREDIT_SLIP_PREFIX', Context::getContext()->language->id);
        $this->title = sprintf(HTMLTemplateOrderSlip::l('%1$s%2$06d'), $prefix, (int) $this->id_cart);
        $this->shop = new Shop((int) $this->cart->id_shop);
    }

    /**
     * Returns the template's HTML header.
     *
     * @return string HTML header
     */
    public function getHeader()
    {
        $this->assignCommonHeaderData();
        $this->smarty->assign(array('header' => Context::getContext()->getTranslator()->trans('Aankoopbon', array(), 'Shop.Pdf')));

        return $this->smarty->fetch($this->getTemplate('header'));
    }

    /**
     * Returns the template's HTML content.
     *
     * @return string HTML content
     */
    public function getContent()
    {
        $invoice_address = new Address((int) $this->order->id_address_invoice);
        $formatted_invoice_address = $invoice_address->firstname .' '. $invoice_address->lastname.'<br />';
        if(!empty($invoice_address->company) && $invoice_address->company != ' '){
            $formatted_invoice_address .= $invoice_address->company.'<br />';
        }
        $formatted_invoice_address .= $invoice_address->address1.' '.$invoice_address->house_number.' '.$invoice_address->house_number_extension.'<br />';
        if(!empty($invoice_address->address2) && $invoice_address->address2 != ' '){
            $formatted_invoice_address .= $invoice_address->address2.'<br />';
        }
        $formatted_invoice_address .= ucwords($invoice_address->postcode). ' ' . $invoice_address->city .'<br />';
        $formatted_invoice_address .= $invoice_address->country .'<br />';

        $formatted_delivery_address = '';
        $delivery_address = '';
        if ($this->order->id_address_invoice != $this->order->id_address_delivery) {
            $delivery_address = new Address((int) $this->order->id_address_delivery);

            $formatted_delivery_address .= $delivery_address->firstname .' '. $delivery_address->lastname .'<br />';
            if(!empty($delivery_address->company) && $delivery_address->company != ' '){
                $formatted_delivery_address .= $delivery_address->company.'<br />';
            }
            $formatted_delivery_address .= $delivery_address->address1.' '.$delivery_address->house_number.' '.$delivery_address->house_number_extension.'<br />';
            if(!empty($delivery_address->address2) && $delivery_address->address2 != ' '){
                $formatted_delivery_address .= $delivery_address->address2.'<br />';
            }
            $formatted_delivery_address .= ucwords($delivery_address->postcode). ' ' . $delivery_address->city .'<br />';
            $formatted_delivery_address .= $delivery_address->country .'<br />';
        }

        $customer = new Customer((int) $this->order->id_customer);


        $this->order->total_paid_tax_excl = $this->order->total_paid_tax_incl = $this->order->total_products = $this->order->total_products_wt = 0;

            foreach ($this->order->products as &$product) {


                $product['total_price_tax_excl'] = $product['price_with_reduction_without_tax'] * $product['cart_quantity'];
                $product['total_price_tax_incl'] = $product['price_with_reduction'] * $product['cart_quantity'];

                $this->order->total_products += $product['total'];
                $this->order->total_products_wt += $product['total_wt'];
                $this->order->total_paid_tax_excl += $product['total'];
                $this->order->total_paid_tax_incl += $product['total_wt'];
            }

        unset($product); // remove reference

        $this->order->total_shipping_tax_incl = $this->order->total_shipping_tax_excl = 0;

        $tax = new Tax();
        $tax->rate = $this->order->carrier_tax_rate;
        $tax_calculator = new TaxCalculator(array($tax));
        $tax_excluded_display = Group::getPriceDisplayMethod((int) $customer->id_default_group);

        $this->order->total_shipping_tax_incl = 0;
        $this->order->total_shipping_tax_excl = 0;
        $this->order->shipping_cost_amount = 0;

        $this->order->total_paid_tax_incl += $this->order->total_shipping_tax_incl;
        $this->order->total_paid_tax_excl += $this->order->total_shipping_tax_excl;

        $total_cart_rule = 0;
        if (is_array($cart_rules = $this->cart->getCartRules())) {
            foreach ($cart_rules as $cart_rule) {
                if ($tax_excluded_display) {
                    $total_cart_rule += $cart_rule['value_tax_excl'];
                } else {
                    $total_cart_rule += $cart_rule['value'];
                }
            }
        }
var_export($this->order->products);
        $this->smarty->assign(array(
            'order' => $this->order,
            'order_details' => $this->order->products,
            'cart_rules' => $this->cart->getCartRules(),
            'delivery_address' => $formatted_delivery_address,
            'invoice_address' => $formatted_invoice_address,
            'addresses' => array('invoice' => $invoice_address, 'delivery' => $delivery_address),
            'amount_choosen' =>  false,
            'tax_excluded_display' => $tax_excluded_display,
            'total_cart_rule' => $total_cart_rule,
        ));

        $tpls = array(
            'style_tab' => $this->smarty->fetch($this->getTemplate('physical-on-credit-order-slip.style-tab')),
            'addresses_tab' => $this->smarty->fetch($this->getTemplate('physical-on-credit-order-slip.addresses-tab')),
            'summary_tab' => $this->smarty->fetch($this->getTemplate('physical-on-credit-order-slip.summary-tab')),
            'product_tab' => $this->smarty->fetch($this->getTemplate('physical-on-credit-order-slip.product-tab')),
            'total_tab' => $this->smarty->fetch($this->getTemplate('physical-on-credit-order-slip.total-tab')),
            'payment_tab' => $this->smarty->fetch($this->getTemplate('physical-on-credit-order-slip.payment-tab')),
            'tax_tab' => '',
        );
        $this->smarty->assign($tpls);

        return $this->smarty->fetch($this->getTemplate('physical-on-credit-order-slip'));
    }

    /**
     * Returns the template filename when using bulk rendering.
     *
     * @return string filename
     */
    public function getBulkFilename()
    {
        return 'on-credit-order-slips.pdf';
    }

    /**
     * Returns the template filename.
     *
     * @return string filename
     */
    public function getFilename()
    {
        return Configuration::get('PS_CREDIT_SLIP_PREFIX', Context::getContext()->language->id, null, $this->cart->id_shop) . $this->order->reference. '-' . $this->order->date_add . '.pdf';
    }

    /**
     * Returns the tax tab content.
     *
     * @return string Tax tab html content
     */
    public function getTaxTabContent()
    {
        $address = new Address((int) $this->order->{Configuration::get('PS_TAX_ADDRESS_TYPE')});
        $tax_exempt = Configuration::get('VATNUMBER_MANAGEMENT')
                            && !empty($address->vat_number)
                            && $address->id_country != Configuration::get('VATNUMBER_COUNTRY');

        $this->smarty->assign(array(
            'tax_exempt' => $tax_exempt,
            'product_tax_breakdown' => $this->getProductTaxesBreakdown(),
            'shipping_tax_breakdown' => $this->getShippingTaxesBreakdown(),
            'order' => $this->order,
            'ecotax_tax_breakdown' => $this->order_slip->getEcoTaxTaxesBreakdown(),
            'is_order_slip' => true,
            'tax_breakdowns' => $this->getTaxBreakdown(),
            'display_tax_bases_in_breakdowns' => false,
        ));

        return $this->smarty->fetch($this->getTemplate('invoice.tax-tab'));
    }

    /**
     * Returns different tax breakdown elements.
     *
     * @return array Different tax breakdown elements
     */
    protected function getTaxBreakdown()
    {
        $breakdowns = array(
            'product_tax' => $this->getProductTaxesBreakdown(),
            'shipping_tax' => $this->getShippingTaxesBreakdown(),
            'ecotax_tax' => $this->order_slip->getEcoTaxTaxesBreakdown(),
        );

        foreach ($breakdowns as $type => $bd) {
            if (empty($bd)) {
                unset($breakdowns[$type]);
            }
        }

        if (empty($breakdowns)) {
            $breakdowns = false;
        }

        if (isset($breakdowns['product_tax'])) {
            foreach ($breakdowns['product_tax'] as &$bd) {
                $bd['total_tax_excl'] = $bd['total_price_tax_excl'];
            }
        }

        if (isset($breakdowns['ecotax_tax'])) {
            foreach ($breakdowns['ecotax_tax'] as &$bd) {
                $bd['total_tax_excl'] = $bd['ecotax_tax_excl'];
                $bd['total_amount'] = $bd['ecotax_tax_incl'] - $bd['ecotax_tax_excl'];
            }
        }

        return $breakdowns;
    }

    public function getProductTaxesBreakdown()
    {
        // $breakdown will be an array with tax rates as keys and at least the columns:
        // 	- 'total_price_tax_excl'
        // 	- 'total_amount'
        $breakdown = array();

        $details = $this->order->getProductTaxesDetails($this->order->products);

        foreach ($details as $row) {
            $rate = sprintf('%.3f', $row['tax_rate']);
            if (!isset($breakdown[$rate])) {
                $breakdown[$rate] = array(
                    'total_price_tax_excl' => 0,
                    'total_amount' => 0,
                    'id_tax' => $row['id_tax'],
                    'rate' => $rate,
                );
            }

            $breakdown[$rate]['total_price_tax_excl'] += $row['total_tax_base'];
            $breakdown[$rate]['total_amount'] += $row['total_amount'];
        }

        foreach ($breakdown as $rate => $data) {
            $breakdown[$rate]['total_price_tax_excl'] = Tools::ps_round($data['total_price_tax_excl'], _PS_PRICE_COMPUTE_PRECISION_, $this->order->round_mode);
            $breakdown[$rate]['total_amount'] = Tools::ps_round($data['total_amount'], _PS_PRICE_COMPUTE_PRECISION_, $this->order->round_mode);
        }

        ksort($breakdown);

        return $breakdown;
    }

    /**
     * Returns Shipping tax breakdown elements.
     *
     * @return array Shipping tax breakdown elements
     */
    public function getShippingTaxesBreakdown()
    {
        $taxes_breakdown = array();
        $tax = new Tax();
        $tax->rate = $this->order->carrier_tax_rate;
        $tax_calculator = new TaxCalculator(array($tax));
        $customer = new Customer((int) $this->order->id_customer);
        $tax_excluded_display = Group::getPriceDisplayMethod((int) $customer->id_default_group);

        if ($tax_excluded_display) {
            $total_tax_excl = $this->order_slip->shipping_cost_amount;
            $shipping_tax_amount = $tax_calculator->addTaxes($this->order_slip->shipping_cost_amount) - $total_tax_excl;
        } else {
            $total_tax_excl = $tax_calculator->removeTaxes($this->order_slip->shipping_cost_amount);
            $shipping_tax_amount = $this->order_slip->shipping_cost_amount - $total_tax_excl;
        }

        if ($shipping_tax_amount > 0) {
            $taxes_breakdown[] = array(
                'rate' => $this->order->carrier_tax_rate,
                'total_amount' => $shipping_tax_amount,
                'total_tax_excl' => $total_tax_excl,
            );
        }

        return $taxes_breakdown;
    }
}
