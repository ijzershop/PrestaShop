<?php
/**
* 2007-2016 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2016 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

class ChannableOrderModuleFrontController extends ModuleFrontController
{

    const PAYMENT_NOT_PAID = 'not_paid';
    const PAYMENT_PAID = 'paid';
    const PAYMENT_CANCELLED = 'cancelled';

    const SHIPPING_NOT_SHIPPED = 'not_shipped';
    const SHIPPING_SHIPPED = 'shipped';
    const SHIPPING_CANCELLED = 'cancelled';

    const GENDER_MALE = '1';
    const GENDER_FEMALE = '2';

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function postProcess()
    {
        if (!Tools::getValue('key')) {
            die('Not authenticated');
        }
        if (!WebserviceKey::keyExists(Tools::getValue('key')) || !WebserviceKey::isKeyActive(Tools::getValue('key'))) {
            die('Not authenticated');
        }

        if (Tools::getValue('order')) {
            $orders = new PrestaShopCollection('Order');
            $orders->where('id_order', '=', (int)Tools::getValue('order'));
            if (!$orders->getFirst()) {
                $orders = Order::getByReference(Tools::getValue('order'));
            }
            if ($order = $orders->getFirst()) {
                $jsonData = array('id' => $order->id, 'reference' => $order->reference);
                if (in_array($order->current_state, Channable::getChannableOrderStates('SHIPPING_SHIPPED'))) {
                    $jsonData['is_shipped'] = self::SHIPPING_SHIPPED;
                } elseif (in_array($order->current_state, Channable::getChannableOrderStates('SHIPPING_CANCELLED'))) {
                    $jsonData['is_shipped'] = self::SHIPPING_CANCELLED;
                } else {
                    $jsonData['is_shipped'] = self::SHIPPING_NOT_SHIPPED;
                }
                if (trim($order->getWsShippingNumber()) != '') {
                    $jsonData['fulfillment'] = array('tracking_code' => $order->getWsShippingNumber());
                }
            }
        } else {
            $postData = Channable::fetchPhpInput();
            $postData = json_decode($postData);
            if ($postData != null) {
                $error_array = array();
                $valid = true;
                if (isset($postData->products)) {
                    foreach ($postData->products as $product) {
                        $checkedProduct = $this->checkAndGetProductById($product->id);
                        if (!$checkedProduct) {
                            $checkedProduct = $this->checkAndGetProduct($product->gtin);
                        }
                        if (!$checkedProduct) {
                            $valid = false;
                        } else {
                            if (!$checkedProduct->checkQty((int)$product->quantity)) {
                                $error_array[] = 'Product out of stock';
                            }
                        }
                    }
                }

                $ordersCheck = Order::getByReference($postData->channable_id);
                if ($order = $ordersCheck->getFirst()) {
                    $error_array[] = 'Order already exists';
                } else {
                    if (sizeof($error_array) == 0 && $valid) {
                        try {
                            $guest_checkout = Configuration::get('CHANNABLE_USE_GUEST_CHECKOUT') == '1';

                            $have_customer = false;
                            if (!$guest_checkout) {
                                $customerObject = new Customer();
                                $customer = $customerObject->getByEmail(trim($postData->customer->email));
                                if (isset($customer->active) && $customer->active) {
                                    $have_customer = true;
                                }
                            }

                            if (!$have_customer) {
                                $customer = new Customer();
                                $customer->is_guest = $guest_checkout ? 1 : 0;
                                $customer->passwd = Tools::passwdGen();
                                $customer->email = $postData->customer->email;
                                $customer->id_gender = $postData->customer->gender == 'male' ? self::GENDER_MALE : self::GENDER_FEMALE;
                                $customer->firstname = $postData->customer->first_name;
                                $customer->company = $postData->customer->company;
                                $customer->lastname = $postData->customer->last_name;
                                $customer->save();
                            }

                            $this->context->customer = $customer;
                            $this->context->cart = new Cart();

                            $id_currency = Currency::getDefaultCurrency()->id;
                            if (isset($postData->price->currency)) {
                                $currencyDetect = Currency::getIdByIsoCode($postData->price->currency);
                                if ($currencyDetect > 0) {
                                    $id_currency = (int)$currencyDetect;
                                }
                            }

                            $this->context->cart->id_currency = $id_currency;
                            $this->context->cart->id_lang = Configuration::get('PS_LANG_DEFAULT');
                            $this->context->cart->id_customer = (int) $customer->id;
                            $this->context->cart->add();

                            foreach ($postData->products as $channable_product) {
                                $product = $this->checkAndGetProductById($channable_product->id);
                                if (!$product) {
                                    $product = $this->checkAndGetProduct($channable_product->gtin);
                                }
                                if ($product) {
                                    $this->context->cart->updateQty((int)$channable_product->quantity, (int)$product->id, (isset($product->id_product_attribute) ? $product->id_product_attribute : null));
                                }
                            }

                            $order = new Order();
                            $product_list = $this->context->cart->getProducts();

                            foreach ($postData->products as $product_key => $product) {
                                if (isset($product_list[$product_key])) {
                                    if (isset($product->tax_rate)) {
                                        $rate = $product->tax_rate;
                                    } else {
                                        $rate = $product_list[$product_key]['rate'];
                                    }
                                    $product_list[$product_key]['price'] = round((float)($product->price / (100 + $rate) * 100), 6);
                                    $product_list[$product_key]['price_without_reduction'] = $product->price;
                                    $product_list[$product_key]['price_with_reduction'] = $product->price;
                                    $product_list[$product_key]['price_with_reduction_without_tax'] = $product->price / (100 + $rate) * 100;
                                    $product_list[$product_key]['total'] = (float)(($product->price / (100 + $rate) * 100) * $product->quantity);
                                    $product_list[$product_key]['total_wt'] = (float)($product->price * $product->quantity);
                                    $product_list[$product_key]['price_wt'] = round((float)$product->price, 6);
                                }
                            }

                            $delivery_address = new Address();
                            $delivery_address->id_customer = (int) $customer->id;
                            $delivery_address->id_country = Country::getByIso($postData->shipping->country_code);
                            $delivery_address->alias = 'Delivery Address';
                            $delivery_address->lastname = $postData->shipping->last_name;
                            $delivery_address->firstname = $postData->shipping->first_name;
                            $delivery_address->address1 = $postData->shipping->address_line_1;
                            $delivery_address->address2 = $postData->shipping->address_line_2;
                            $delivery_address->city = $postData->shipping->city;
                            $delivery_address->postcode = $postData->shipping->zip_code;
                            $delivery_address->id_state = 0;
                            if (isset($postData->shipping->region) && $postData->shipping->region != '') {
                                $state_id = State::getIdByIso($postData->shipping->region, Country::getByIso($postData->shipping->country_code));
                                if (!$state_id) {
                                    $delivery_address->id_state = State::getIdByName($postData->shipping->region);
                                }
                                if ($state_id) {
                                    $delivery_address->id_state = $state_id;
                                }
                            }
                            $delivery_address->phone_mobile = $postData->customer->mobile;
                            $delivery_address->phone = $postData->customer->phone;
                            $delivery_address->save();

                            $invoice_address = new Address();
                            $invoice_address->id_customer = (int) $customer->id;
                            $invoice_address->id_country = Country::getByIso($postData->billing->country_code);
                            $invoice_address->alias = 'Invoice Address';
                            if (isset($postData->billing->company)) {
                                $invoice_address->company = $postData->billing->company;
                            }
                            $invoice_address->lastname = $postData->billing->last_name;
                            $invoice_address->firstname = $postData->billing->first_name;
                            $invoice_address->address1 = $postData->billing->address_line_1;
                            $invoice_address->address2 = $postData->billing->address_line_2;
                            $invoice_address->city = $postData->billing->city;
                            $invoice_address->postcode = $postData->billing->zip_code;
                            $invoice_address->id_state = 0;
                            if (isset($postData->billing->region) && $postData->billing->region != '') {
                                $state_id = State::getIdByIso($postData->billing->region, Country::getByIso($postData->billing->country_code));
                                if (!$state_id) {
                                    $invoice_address->id_state = State::getIdByName($postData->billing->region);
                                }
                                if ($state_id) {
                                    $invoice_address->id_state = $state_id;
                                }
                            }
                            $invoice_address->phone_mobile = $postData->customer->mobile;
                            $invoice_address->phone = $postData->customer->phone;
                            if (isset($postData->billing->vat_number)) {
                                $invoice_address->vat_number = $postData->billing->vat_number;
                            }
                            $invoice_address->save();

                            $order->product_list = $product_list;
                            $carrier = null;

                            $id_carrier = Configuration::get('CHANNABLE_ORDER_CARRIER_ID_IMPORT');
                            if ((int)$id_carrier == 0) {
                                $id_carrier = (int)(Configuration::get('PS_CARRIER_DEFAULT'));
                            }
                            $order->id_carrier = $id_carrier;

                            $order->id_customer = (int)$customer->id;
                            $order->id_address_invoice = (int)$invoice_address->id;
                            $order->id_address_delivery = (int)$delivery_address->id;
                            $order->id_currency = $id_currency;
                            $order->id_lang = Configuration::get('PS_LANG_DEFAULT');
                            $order->id_cart = $this->context->cart->id;
                            $order->reference = $postData->channable_id;
                            $order->id_shop = (int)Context::getContext()->shop->id;
                            $order->id_shop_group = (int)Context::getContext()->shop->id_shop_group;

                            $order->secure_key = pSQL(md5(Tools::passwdGen()));
                            $order->payment = $postData->price->payment_method;
                            $order->module = 'channable';

                            try {
                                $currency = new Currency((int)$this->context->cart->id_currency);
                                $conversion_rate = $currency->getConversationRate();
                            } catch (\Exception $e) {
                                $conversion_rate = 0;
                            }

                            $order->conversion_rate = $conversion_rate;

                            if (isset($postData->price->total_with_tax)) {
                                $order->total_paid_real = $postData->price->total_with_tax;
                                $order->total_products = $postData->price->subtotal;
                                $order->total_products_wt = $postData->price->subtotal_with_tax;
                                $order->total_paid_tax_excl = $postData->price->subtotal;
                                $order->total_paid_tax_incl = $postData->price->total_with_tax;
                            } else {
                                $order->total_paid_real = $postData->price->total;
                                $order->total_products = $postData->price->subtotal;
                                $order->total_products_wt = $postData->price->subtotal;
                                $order->total_paid_tax_excl = $postData->price->total;
                                $order->total_paid_tax_incl = $postData->price->total;
                            }

                            $order->total_discounts_tax_excl = 0;
                            $order->total_discounts_tax_incl = 0;

                            $order->total_shipping_tax_excl = $postData->price->shipping;
                            $order->total_shipping_tax_incl = $postData->price->shipping;
                            $order->total_shipping = $postData->price->shipping;

                            $order->total_paid = $order->total_paid_tax_incl;
                            $order->round_mode = Configuration::get('PS_PRICE_ROUND_MODE');
                            $order->round_type = Configuration::get('PS_ROUND_TYPE');

                            $order->invoice_date = date("Y-m-d H:i:s");
                            $order->delivery_date = '0000-00-00 00:00:00';

                            $result = $order->add();

                            $order_status_id = Configuration::get('CHANNABLE_ORDER_STATE_IMPORT');
                            $order->setCurrentState($order_status_id);

                            $order_list = array($order);

                            $order_detail = new OrderDetail(null, null, $this->context);
                            $id_warehouse = 0;
                            if (Configuration::get('CHANNABLE_ORDER_WAREHOUSE') != '' && (int)Configuration::get('CHANNABLE_ORDER_WAREHOUSE') > 0) {
                                $id_warehouse = (int)Configuration::get('CHANNABLE_ORDER_WAREHOUSE');
                            }
                            $order_detail->createList($order, $this->context->cart, $order_status_id, $order->product_list, 0, true, $id_warehouse);
                            $order_detail_list = array($order_detail);

                            $order_carrier = new OrderCarrier();
                            $order_carrier->id_order = $order->id;
                            $order_carrier->id_carrier = (int)$id_carrier;
                            $order_carrier->shipping_cost_tax_excl = (float)$postData->price->shipping;
                            $order_carrier->shipping_cost_tax_incl = (float)$postData->price->shipping;
                            $order_carrier->save();

                            if (isset($postData->price->commission)) {
                                $ordersAdditionalData = new ChannableOrdersAdditionalData();
                                $ordersAdditionalData->id_order = (int)$order->id;
                                $ordersAdditionalData->field_in_post = 'commission';
                                $ordersAdditionalData->value_in_post = (float)$postData->price->commission;
                                $ordersAdditionalData->save();
                            }
                            if (isset($postData->channel_name)) {
                                $ordersAdditionalData = new ChannableOrdersAdditionalData();
                                $ordersAdditionalData->id_order = (int)$order->id;
                                $ordersAdditionalData->field_in_post = 'marketplace';
                                $ordersAdditionalData->value_in_post = $postData->channel_name;
                                $ordersAdditionalData->save();
                            }
                            if (isset($postData->channel_id)) {
                                $ordersAdditionalData = new ChannableOrdersAdditionalData();
                                $ordersAdditionalData->id_order = (int)$order->id;
                                $ordersAdditionalData->field_in_post = 'marketplace_order_id';
                                $ordersAdditionalData->value_in_post = $postData->channel_id;
                                $ordersAdditionalData->save();
                            }

                            $transaction_id = '';
                            if (isset($postData->price->transaction_id)) {
                                $transaction_id = $postData->price->transaction_id;
                            }

                            $orderPayment = OrderPayment::getByOrderReference(
                                $order->reference
                            );
                            if (is_array($orderPayment) && sizeof($orderPayment) > 0) {
                                $currentPaymentObject = current($orderPayment);
                                $currentPaymentObject->payment_method = $postData->price->payment_method;
                                $currentPaymentObject->transaction_id = $transaction_id;
                                $currentPaymentObject->update();
                            } else {
                                $order->addOrderPayment(
                                    $order->total_paid_real,
                                    $postData->price->payment_method,
                                    $transaction_id
                                );
                            }

                            if (Configuration::get('CHANNABLE_COMMENT_AS_NOTE') == '1') {
                                if (isset($postData->memo) && (string)$postData->memo != '') {
                                    $msg = new Message();
                                    $msg->message = $postData->memo;
                                    $msg->id_cart = (int)$order->id_cart;
                                    $msg->id_customer = (int)($order->id_customer);
                                    $msg->id_order = (int)$order->id;
                                    $msg->private = 1;
                                    $msg->add();
                                }
                            }

                            if (Configuration::get('CHANNABLE_COMMENT_AS_CUSTOMER_THREAD') == '1') {
                                if (isset($postData->memo) && (string)$postData->memo != '') {
                                    $id_customer_thread = CustomerThread::getIdCustomerThreadByEmailAndIdOrder($customer->email, $order->id);
                                    if (!$id_customer_thread) {
                                        $customer_thread = new CustomerThread();
                                        $customer_thread->id_contact = 0;
                                        $customer_thread->id_customer = (int)$order->id_customer;
                                        $customer_thread->id_shop = (int)$this->context->shop->id;
                                        $customer_thread->id_order = (int)$order->id;
                                        $customer_thread->id_lang = (int)$this->context->language->id;
                                        $customer_thread->email = $customer->email;
                                        $customer_thread->status = 'open';
                                        $customer_thread->token = Tools::passwdGen(12);
                                        $customer_thread->add();
                                    } else {
                                        $customer_thread = new CustomerThread((int)$id_customer_thread);
                                    }

                                    $customer_message = new CustomerMessage();
                                    $customer_message->id_customer_thread = $customer_thread->id;
                                    $customer_message->id_employee = 0;
                                    $customer_message->message = $postData->memo;
                                    $customer_message->private = 1;
                                    $customer_message->add();
                                }
                            }

                            $order_created = true;
                        } catch (Exception $e) {
                            echo $e->getMessage();
                            $error_array[] = 'Invalid address data, missing mandatory data';
                            $order_created = false;
                        }
                    }
                }

                if (isset($order_created) && $order_created) {
                    $jsonData = array('validated' => 'true', 'order_id' => $order->id);
                } else {
                    if (!$valid) {
                        $error_array[] = 'Product not found in database';
                    }
                    $jsonData = array('validated' => 'false', 'errors' => $error_array);
                }
            }
        }
        if (isset($jsonData)) {
            header('Content-Type: application/json');
            echo json_encode($jsonData);
        }
        die();
    }

    /**
     * @param $id
     * @return bool|Product
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function checkAndGetProductById($id)
    {
        $ids = explode("_", $id);
        if (isset($ids[0]) && isset($ids[1])) {
            $result = Db::getInstance()->executeS(
                'SELECT DISTINCT pa.`id_product_attribute` AS id_product_attribute,
                    p.`id_product` AS id
    			FROM `'._DB_PREFIX_.'product` p
           LEFT JOIN '._DB_PREFIX_.'product_attribute pa ON (p.id_product = pa.id_product)
    		   WHERE pa.`id_product` = \'' . pSQL($ids[0]) . '\'
                 AND pa.`id_product_attribute` = \'' . pSQL($ids[1]) . '\'
            '
                );
            if (sizeof($result) > 0) {
                $product = new Product($result[0]['id']);
                $attributes = $product->getAttributeCombinationsById($result[0]['id_product_attribute'], (int)Context::getContext()->language->id);
                if (isset($attributes[0]['quantity'])) {
                    $product->quantity = (int)$attributes[0]['quantity'];
                    $product->id_product_attribute = (int)$result[0]['id_product_attribute'];
                }
                return $product;
            }
        } elseif (isset($ids[0])) {
            $result = Db::getInstance()->executeS(
                'SELECT p.`id_product` AS id
    			FROM `'._DB_PREFIX_.'product` p
    		   WHERE p.`id_product` = \'' . pSQL($ids[0]) . '\'
            '
                );
            if (sizeof($result) > 0) {
                return new Product($result[0]['id']);
            }
        }
        return false;
    }

    /**
     * @param $gtin
     * @return bool|Product
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function checkAndGetProduct($gtin)
    {
        if (trim($gtin) == '') {
            return false;
        }
        $result = Db::getInstance()->executeS(
            'SELECT p.`id_product` AS id
    			FROM `'._DB_PREFIX_.'product` p
    		   WHERE p.`reference` = \'' . pSQL($gtin) . '\'
                  OR p.`ean13` = \'' . pSQL($gtin) . '\'
            '
            );
        if (sizeof($result) > 0) {
            return new Product($result[0]['id']);
        }
        $result = Db::getInstance()->executeS(
            'SELECT pa.`id_product_attribute` AS id_product_attribute,
                    p.`id_product` AS id
    			FROM `'._DB_PREFIX_.'product` p
           LEFT JOIN '._DB_PREFIX_.'product_attribute pa ON (p.id_product = pa.id_product)
    		   WHERE pa.`reference` = \'' . pSQL($gtin) . '\'
                  OR pa.`ean13` = \'' . pSQL($gtin) . '\'
            '
            );
        if (sizeof($result) > 0) {
            $product = new Product($result[0]['id']);
            $attributes = $product->getAttributeCombinationsById($result[0]['id_product_attribute'], (int)Context::getContext()->language->id);
            if (isset($attributes[0]['quantity'])) {
                $product->quantity = (int)$attributes[0]['quantity'];
                $product->id_product_attribute = (int)$result[0]['id_product_attribute'];
            }
            return $product;
        }
        return false;
    }
}
