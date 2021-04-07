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
class HTMLTemplateDeliverySlipCore extends HTMLTemplate
{
    public $order;

    /**
     * @param OrderInvoice $order_invoice
     * @param $smarty
     *
     * @throws PrestaShopException
     */
    public function __construct(OrderInvoice $order_invoice, $smarty, $bulk_mode = false)
    {
        $this->order_invoice = $order_invoice;
        $this->order = new Order($this->order_invoice->id_order);
        $this->smarty = $smarty;

        // If shop_address is null, then update it with current one.
        // But no DB save required here to avoid massive updates for bulk PDF generation case.
        // (DB: bug fixed in 1.6.1.1 with upgrade SQL script to avoid null shop_address in old orderInvoices)
        if (!isset($this->order_invoice->shop_address) || !$this->order_invoice->shop_address) {
            $this->order_invoice->shop_address = OrderInvoice::getCurrentFormattedShopAddress((int) $this->order->id_shop);
            if (!$bulk_mode) {
                OrderInvoice::fixAllShopAddresses();
            }
        }

        // header informations
        $this->date = Tools::displayDate($order_invoice->date_add);
        $prefix = Configuration::get('PS_DELIVERY_PREFIX', Context::getContext()->language->id);
        $this->title = sprintf(HTMLTemplateDeliverySlip::l('%1$s%2$06d'), $prefix, $this->order_invoice->delivery_number);

        // footer informations
        $this->shop = new Shop((int) $this->order->id_shop);
    }

    /**
     * Returns the template's HTML header.
     *
     * @return string HTML header
     */
    public function getHeader()
    {
        $this->assignCommonHeaderData();
        $total_weight = 0;
        $order_details = $this->order_invoice->getProducts();
        foreach ($order_details as $product) {
            $total_weight = (double)$total_weight+((double)$product['product_weight']*(int)$product['product_quantity']);
        }
        $carrier = $this->order->id_carrier;
        $carrierObj = new Carrier($carrier, 1);


        $this->smarty->assign(
            array('header' => $carrierObj->name,
                'reference'=> $this->order->reference,
                'delivery_date' => $this->order->delivery_date,
                'invoice_date' => $this->order->invoice_date,
                'total_weight' => $total_weight,
                'added_to_order' => $this->order->added_to_order)
        );

        return $this->smarty->fetch($this->getTemplate('header'));
    }

    /**
     * Returns the template's HTML content.
     *
     * @return string HTML content
     */
    public function getContent()
    {
        $customer_contact = [];

        $customer = new Customer((int)$this->order->id_customer);
        $customer_contact['email'] = $customer->email;

        $delivery_address = new Address((int) $this->order->id_address_delivery);
            $formatted_delivery_address = $delivery_address->firstname .' '. $delivery_address->lastname.'<br />';
            $formatted_delivery_address .= $delivery_address->company.'<br />';
            $formatted_delivery_address .= $delivery_address->address1.' '.$delivery_address->house_number.' '.$delivery_address->house_number_extension.'<br />';
            if(!empty($delivery_address->address2)){
                $formatted_delivery_address .= $delivery_address->address2.'<br />';
            }
            $formatted_delivery_address .= ucwords($delivery_address->postcode). ' ' . $delivery_address->city .'<br />';
            $formatted_delivery_address .= $delivery_address->country .'<br />';

        $customer_contact['phone'] = $delivery_address->phone;
        $customer_contact['mobile'] = $delivery_address->phone_mobile;
        $formatted_invoice_address = '';

        if ($this->order->id_address_delivery != $this->order->id_address_invoice) {
            $invoice_address = new Address((int) $this->order->id_address_invoice);

            $formatted_invoice_address .= $invoice_address->firstname .' '. $invoice_address->lastname .'<br />';
            $formatted_invoice_address .= $invoice_address->company.'<br />';
            $formatted_invoice_address .= $invoice_address->address1.' '.$invoice_address->house_number.' '.$invoice_address->house_number_extension.'<br />';
            if(!empty($invoice_address->address2)){
                $formatted_invoice_address .= $invoice_address->address2.'<br />';
            }
            $formatted_invoice_address .= ucwords($invoice_address->postcode). ' ' . $invoice_address->city .'<br />';
            $formatted_invoice_address .= $invoice_address->country .'<br />';

            $customer_contact['phone'] = $invoice_address->phone;
            $customer_contact['mobile'] = $invoice_address->phone_mobile;
        }

        $carrier = new Carrier($this->order->id_carrier);
        $carrier->name = ($carrier->name == '0' ? Configuration::get('PS_SHOP_NAME') : $carrier->name);

        $order_details = $this->order_invoice->getProducts();
        /**
         * Sort the products by product_reference
         */
        uasort($order_details, function ($item1, $item2) {
            return $item1['product_reference'] <=> $item2['product_reference'];
        });

            foreach ($order_details as &$order_detail) {
                if(!is_null($order_detail['id_oi_offer'])){
                    $descProduct = new Product($order_detail['product_id']);
                    if($descProduct){
                        $order_detail['product_desc_short'] = reset($descProduct->description_short);
                    }
                }

                if(!is_null($order_detail['customizedDatas'])){
                    foreach ($order_detail['customizedDatas'] as $addressId => $customization) {
                        if(!is_null($customization)){
                            foreach ($customization as $customizationId => $customized) {

                                if(isset($customized['datas'])){

                                    if(class_exists("Imagick") )
                                    {

                                        $file = $customized['datas'][1][0]['technical_image'];
                                        if(!is_null($file) && !empty($file)){

                                            $fileContents = file_get_contents(Context::getContext()->shop->getBaseURL(true).$file);

                                            if($fileContents != false){

                                                $doc = new SimpleXMLElement($fileContents);
                                                foreach($doc->g as $seg)
                                                {
                                                    if($seg->attributes()->id[0] == 'cutline') {
                                                        $dom=dom_import_simplexml($seg);
                                                        $dom->parentNode->removeChild($dom);
                                                    }
                                                }

                                                $im = new Imagick();
                                                $im->readImageBlob($doc->asXml());
                                                $im->setImageFormat('png24');
                                                $im->writeImage(_PS_CORE_DIR_.'/'.$file . '.png');
                                                $im->clear();
                                                $im->destroy();
                                            }
                                        }

                                    }
                                }
                            }
                        }

                    }
                }
            }


        if (Configuration::get('PS_PDF_IMG_DELIVERY')) {
            foreach ($order_details as &$order_detail) {
                if ($order_detail['image'] != null) {
                    $name = 'product_mini_' . (int) $order_detail['product_id'] . (isset($order_detail['product_attribute_id']) ? '_' . (int) $order_detail['product_attribute_id'] : '') . '.jpg';
                    $path = _PS_PROD_IMG_DIR_ . $order_detail['image']->getExistingImgPath() . '.jpg';

                    $order_detail['image_tag'] = preg_replace(
                        '/\.*' . preg_quote(__PS_BASE_URI__, '/') . '/',
                        _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR,
                        ImageManager::thumbnail($path, $name, 45, 'jpg', false),
                        1
                    );
                    if (file_exists(_PS_TMP_IMG_DIR_ . $name)) {
                        $order_detail['image_size'] = getimagesize(_PS_TMP_IMG_DIR_ . $name);
                    } else {
                        $order_detail['image_size'] = false;
                    }

                }
            }
        }


        $this->smarty->assign(array(
            'order' => $this->order,
            'order_details' => $order_details,
            'customer_contact' => $customer_contact,
            'delivery_address' => $formatted_delivery_address,
            'invoice_address' => $formatted_invoice_address,
            'order_invoice' => $this->order_invoice,
            'carrier' => $carrier,
            'display_product_images' => Configuration::get('PS_PDF_IMG_DELIVERY'),
        ));


        $tpls = array(
            'style_tab' => $this->smarty->fetch($this->getTemplate('delivery-slip.style-tab')),
            'addresses_tab' => $this->smarty->fetch($this->getTemplate('delivery-slip.addresses-tab')),
            'summary_tab' => $this->smarty->fetch($this->getTemplate('delivery-slip.summary-tab')),
            'product_tab' => $this->smarty->fetch($this->getTemplate('delivery-slip.product-tab')),
            'payment_tab' => $this->smarty->fetch($this->getTemplate('delivery-slip.payment-tab')),
        );
        $this->smarty->assign($tpls);

        return $this->smarty->fetch($this->getTemplate('delivery-slip'));
    }

    /**
     * Returns the template filename when using bulk rendering.
     *
     * @return string filename
     */
    public function getBulkFilename()
    {
        return 'deliveries.pdf';
    }

    /**
     * Returns the template filename.
     *
     * @return string filename
     */
    public function getFilename()
    {
        return Configuration::get('PS_DELIVERY_PREFIX', Context::getContext()->language->id, null, $this->order->id_shop) . sprintf('%06d', $this->order->delivery_number) . '.pdf';
    }
}
