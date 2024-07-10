<?php
/**
 * 2007-2022 patworx.de
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade AmazonPay to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    patworx multimedia GmbH <service@patworx.de>
 *  @copyright 2007-2022 patworx multimedia GmbH
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
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

            $postData = Tools::jsonDecode($postData);
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
                            if ((int)Configuration::get('CHANNABLE_EMPLOYEE_ID') > 0) {
                                $this->context->employee = new Employee((int)Configuration::get('CHANNABLE_EMPLOYEE_ID'));
                            }

                            $guest_checkout = Configuration::get('CHANNABLE_USE_GUEST_CHECKOUT') == '1';

                            $have_customer = false;
                            if (!$guest_checkout) {
                                $customerObject = new Customer();
                                $customer = $customerObject->getByEmail(trim($postData->customer->email));
                                if (isset($customer->active) && $customer->active) {
                                    $have_customer = true;
                                }
                            }

                            $postData = $this->prepStrings($postData);

                            if (!$have_customer) {
                                $customer = new Customer();
                                $customer->is_guest = $guest_checkout ? 1 : 0;
                                $customer->passwd = Tools::passwdGen();
                                $customer->email = $postData->customer->email;
                                $customer->id_gender = $postData->customer->gender == 'male' ? self::GENDER_MALE : self::GENDER_FEMALE;
                                $customer->firstname = $this->prepNameForValidation($postData->customer->first_name);
                                $customer->company = $postData->customer->company;
                                $customer->lastname = $this->prepNameForValidation($postData->customer->last_name);
                                if (isset($postData->customer->middle_name)) {
                                    if ($postData->customer->middle_name != '') {
                                        $customer->lastname = $this->prepNameForValidation($postData->customer->middle_name) . ' ' . $customer->lastname;
                                    }
                                }
                                $customer->save();
                            }

                            if (isset($postData->channel_name)) {
                                $new_group = false;
                                $groupAssignments = Channable::getCustomerGroupAssignments();
                                foreach ($groupAssignments as $cga) {
                                    if (trim($cga['s']) != '' && (int)$cga['g'] > 0) {
                                        if (strpos($postData->channel_name, $cga['s']) !== false) {
                                            $new_group = (int)$cga['g'];
                                        }
                                    }
                                }
                                if ($new_group) {
                                    $customer->cleanGroups();
                                    $customer->addGroups([$new_group]);
                                    $customer->id_default_group = $new_group;
                                    $customer->save();
                                }
                            }

                            if ((int)$customer->id == 0) {

                                $error_array[] = 'Customer could not be created';
                                $order_created = false;

                            } else {


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

                                $posted_products = [];
                                foreach ($postData->products as $product_key_post => $channable_product) {
                                    $product = $this->checkAndGetProductById($channable_product->id);
                                    if (!$product) {
                                        $product = $this->checkAndGetProduct($channable_product->gtin);
                                    }
                                    if ($product) {
                                        $posted_products[$product_key_post] = (int)$product->id . (isset($product->id_product_attribute) ? '_' . $product->id_product_attribute : null);
                                        $this->context->cart->updateQty(
                                            (int)$channable_product->quantity,
                                            (int)$product->id,
                                            (isset($product->id_product_attribute) ? $product->id_product_attribute : null),
                                            false,
                                            'up',
                                            0,
                                            null,
                                            false);
                                    }
                                }

                                $order = new Order();
                                $product_list = $this->context->cart->getProducts();

                                foreach ($postData->products as $product_key_post => $product) {
                                    $found_product = false;
                                    foreach ($product_list as $product_key => $product_list_product) {
                                        $check_id = $product_list_product['id_product'];
                                        if ((int)$product_list_product['id_product_attribute'] > 0) {
                                            $check_id.= '_' . (int)$product_list_product['id_product_attribute'];
                                        }
                                        if ($check_id == $posted_products[$product_key_post]) {
                                            $found_product = true;
                                            if (isset($product->tax_rate)) {
                                                $rate = $product->tax_rate;
                                            } else {
                                                $rate = $product_list[$product_key]['rate'];
                                            }
                                            $product_list[$product_key]['price'] = round((float)($product->price / (100 + $rate) * 100), 6);
                                            $product_list[$product_key]['price_without_reduction'] = $product->price;
                                            $product_list[$product_key]['price_with_reduction'] = $product->price;
                                            $product_list[$product_key]['price_with_reduction_without_tax'] = round((float)$product->price / (100 + $rate) * 100, 6);
                                            $product_list[$product_key]['total'] = round((float)(($product->price / (100 + $rate) * 100) * $product->quantity), 6);
                                            $product_list[$product_key]['total_wt'] = round((float)($product->price * $product->quantity), 6);
                                            $product_list[$product_key]['price_wt'] = round((float)$product->price, 6);
                                        }
                                    }
                                    if (!$found_product) {
                                        if (isset($product_list[$product_key_post])) {
                                            if (isset($product->tax_rate)) {
                                                $rate = $product->tax_rate;
                                            } else {
                                                $rate = $product_list[$product_key_post]['rate'];
                                            }
                                            $product_list[$product_key_post]['price'] = round((float)($product->price / (100 + $rate) * 100), 6);
                                            $product_list[$product_key_post]['price_without_reduction'] = $product->price;
                                            $product_list[$product_key_post]['price_with_reduction'] = $product->price;
                                            $product_list[$product_key_post]['price_with_reduction_without_tax'] = round((float)$product->price / (100 + $rate) * 100, 6);
                                            $product_list[$product_key_post]['total'] = round((float)(($product->price / (100 + $rate) * 100) * $product->quantity), 6);
                                            $product_list[$product_key_post]['total_wt'] = round((float)($product->price * $product->quantity), 6);
                                            $product_list[$product_key_post]['price_wt'] = round((float)$product->price, 6);
                                        }
                                    }
                                }

                                $delivery_address = new Address();
                                $delivery_address->id_customer = (int) $customer->id;
                                $delivery_address->id_country = Country::getByIso($postData->shipping->country_code);
                                $delivery_address->alias = 'Delivery Address';
                                if (isset($postData->shipping->company)) {
                                    $delivery_address->company = $postData->shipping->company;
                                }
                                $delivery_address->lastname = $this->prepNameForValidation($postData->shipping->last_name);
                                if (isset($postData->shipping->middle_name)) {
                                    if ($postData->shipping->middle_name != '') {
                                        $delivery_address->lastname = $this->prepNameForValidation($postData->shipping->middle_name) . ' ' . $delivery_address->lastname;
                                    }
                                }
                                $delivery_address->firstname = $this->prepNameForValidation($postData->shipping->first_name);
                                $delivery_address->address1 = $postData->shipping->address_line_1;
                                $delivery_address->address2 = $postData->shipping->address_line_2;
                                $delivery_address->city = $postData->shipping->city;
                                $delivery_address->postcode = $postData->shipping->zip_code;
                                $delivery_address->id_state = 0;
                                $state_id = false;
                                if (isset($postData->shipping->region) && $postData->shipping->region != '') {
                                    $state_id = State::getIdByIso($postData->shipping->region, Country::getByIso($postData->shipping->country_code));
                                    if (!$state_id) {
                                        $delivery_address->id_state = State::getIdByName($postData->shipping->region);
                                    }
                                    if ($state_id) {
                                        $delivery_address->id_state = $state_id;
                                    }
                                }
                                if (!$state_id) {
                                    if (isset($postData->shipping->region_code) && $postData->shipping->region_code != '') {
                                        $state_id = State::getIdByIso($postData->shipping->region_code, Country::getByIso($postData->shipping->country_code));
                                        if (!$state_id) {
                                            $delivery_address->id_state = State::getIdByName($postData->shipping->region_code);
                                        }
                                        if ($state_id) {
                                            $delivery_address->id_state = $state_id;
                                        }
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
                                $invoice_address->lastname = $this->prepNameForValidation($postData->billing->last_name);
                                if (isset($postData->billing->middle_name)) {
                                    if ($postData->billing->middle_name != '') {
                                        $invoice_address->lastname = $this->prepNameForValidation($postData->billing->middle_name) . ' ' . $invoice_address->lastname;
                                    }
                                }
                                $invoice_address->firstname = $this->prepNameForValidation($postData->billing->first_name);
                                $invoice_address->address1 = $postData->billing->address_line_1;
                                $invoice_address->address2 = $postData->billing->address_line_2;
                                $invoice_address->city = $postData->billing->city;
                                $invoice_address->postcode = $postData->billing->zip_code;
                                $invoice_address->id_state = 0;
                                $state_id = false;
                                if (isset($postData->billing->region) && $postData->billing->region != '') {
                                    $state_id = State::getIdByIso($postData->billing->region, Country::getByIso($postData->billing->country_code));
                                    if (!$state_id) {
                                        $invoice_address->id_state = State::getIdByName($postData->billing->region);
                                    }
                                    if ($state_id) {
                                        $invoice_address->id_state = $state_id;
                                    }
                                }
                                if (!$state_id) {
                                    if (isset($postData->billing->region_code) && $postData->billing->region_code != '') {
                                        $state_id = State::getIdByIso($postData->billing->region_code, Country::getByIso($postData->billing->country_code));
                                        if (!$state_id) {
                                            $invoice_address->id_state = State::getIdByName($postData->billing->region_code);
                                        }
                                        if ($state_id) {
                                            $invoice_address->id_state = $state_id;
                                        }
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

                                if ((float)Configuration::get('CHANNABLE_ORDER_CARRIER_TAX') > 0) {
                                    $shipping_tax_value = round((float)$postData->price->shipping / (100 + (float)Configuration::get('CHANNABLE_ORDER_CARRIER_TAX')) * 100, 6);
                                    $order->total_shipping_tax_excl = $shipping_tax_value;
                                    $order->carrier_tax_rate = (float)Configuration::get('CHANNABLE_ORDER_CARRIER_TAX');
                                } else {
                                    $shipping_tax_value = 0;
                                    $order->total_shipping_tax_excl = $postData->price->shipping;
                                }

                                if (isset($postData->price->total_with_tax)) {
                                    $order->total_paid_real = $postData->price->total_with_tax;
                                    $order->total_products = $postData->price->subtotal;
                                    $order->total_products_wt = $postData->price->subtotal_with_tax;
                                    $order->total_paid_tax_excl = $postData->price->subtotal + $shipping_tax_value;
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
                                $order->total_shipping_tax_incl = $postData->price->shipping;
                                $order->total_shipping = $postData->price->shipping;

                                $order->total_paid = $order->total_paid_tax_incl;
                                $order->round_mode = Configuration::get('PS_PRICE_ROUND_MODE');
                                $order->round_type = Configuration::get('PS_ROUND_TYPE');

                                $order->invoice_date = date("Y-m-d H:i:s");
                                $order->delivery_date = '0000-00-00 00:00:00';

                                $saved_total_paid_real = $order->total_paid_real;

                                $result = $order->add();

                                $order_status_id = Configuration::get('CHANNABLE_ORDER_STATE_IMPORT');
                                $order->setCurrentState($order_status_id);

                                $order->total_paid_real = $saved_total_paid_real;
                                $order->save();

                                $order_list = array($order);

                                $order_detail = new OrderDetail(null, null, $this->context);
                                $id_warehouse = 0;
                                if (Configuration::get('CHANNABLE_ORDER_WAREHOUSE') != '' && (int)Configuration::get('CHANNABLE_ORDER_WAREHOUSE') > 0) {
                                    $id_warehouse = (int)Configuration::get('CHANNABLE_ORDER_WAREHOUSE');
                                }
                                $id_order_invoice = 0;
                                if ($order->invoice_number > 0) {
                                    $invoice = OrderInvoice::getInvoiceByNumber($order->invoice_number);
                                    if ($invoice) {
                                        $id_order_invoice = $invoice->id;
                                    }
                                }
                                $order_detail->createList($order, $this->context->cart, $order_status_id, $order->product_list, $id_order_invoice, true, $id_warehouse);
                                $order_detail_list = array($order_detail);

                                $order_carrier = new OrderCarrier();
                                $order_carrier->id_order = $order->id;
                                $order_carrier->id_carrier = (int)$id_carrier;
                                $order_carrier->weight = $order->getTotalWeight();
                                if ((float)Configuration::get('CHANNABLE_ORDER_CARRIER_TAX') > 0) {
                                    $order_carrier->shipping_cost_tax_excl = round((float)$postData->price->shipping / (100 + (float)Configuration::get('CHANNABLE_ORDER_CARRIER_TAX')) * 100, 6);
                                } else {
                                    $order_carrier->shipping_cost_tax_excl = (float)$postData->price->shipping;
                                }
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
                                if (isset($postData->customer->customer_channel_id)) {
                                    if ($postData->customer->customer_channel_id != '') {
                                        $ordersAdditionalData = new ChannableOrdersAdditionalData();
                                        $ordersAdditionalData->id_order = (int)$order->id;
                                        $ordersAdditionalData->field_in_post = 'customer_channel_id';
                                        $ordersAdditionalData->value_in_post = $postData->customer->customer_channel_id;
                                        $ordersAdditionalData->save();
                                    }
                                }
                                foreach ($postData->products as $pKey => $product) {
                                    if (isset($product->article_number)) {
                                        if ($product->article_number != '') {
                                            $ordersAdditionalData = new ChannableOrdersAdditionalData();
                                            $ordersAdditionalData->id_order = (int)$order->id;
                                            $ordersAdditionalData->field_in_post = 'ArticleNumber - ' . $product->id . ', ' . $product->title;
                                            $ordersAdditionalData->value_in_post = $product->article_number;
                                            $ordersAdditionalData->save();
                                        }
                                    }
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

                                $order->total_paid_real = $saved_total_paid_real;
                                $order->save();

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

                                if (Configuration::get('CHANNABLE_ENABLE_NEW_ORDER_HOOK') == '1') {
                                    // Hook validate order
                                    Hook::exec('actionValidateOrder', [
                                        'cart' => $this->context->cart,
                                        'order' => $order,
                                        'customer' => $customer,
                                        'currency' => new Currency($id_currency),
                                        'orderStatus' => new OrderState((int)$order_status_id, (int) $this->context->language->id),
                                    ]);
                                }

                                $order_created = true;
                            }
                        } catch (Exception $e) {
                            /*
                            echo $e->getMessage();
                            $backtrace = debug_backtrace();
                            $fileinfo = '';
                            $callsinfo = '';
                            if (!empty($backtrace[0]) && is_array($backtrace[0])) {
                                $fileinfo = $backtrace[0]['file'] . ": " . $backtrace[0]['line'];
                                for ($x=1; $x<5; $x++) {
                                    if (!empty($backtrace[$x]) && is_array($backtrace[$x])) {
                                        $callsinfo.= "\r\n" . $backtrace[$x]['file'] . ": " . $backtrace[$x]['line'];
                                    }
                                }
                            }
                            echo $fileinfo . '<br>';
                            echo 'Backtrace: ' . $callsinfo . '<br>';
                            */
                            $error_array[] = 'Invalid address data, missing mandatory data, ' . $e->getMessage();
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
            echo Tools::jsonEncode($jsonData);
        }
        die();
    }

    /**
     * @param object $postData
     * @return mixed
     */
    private function prepStrings($postData)
    {
        if (isset($postData->customer->first_name)) {
            $postData->customer->first_name = $this->prepString($postData->customer->first_name);
        }
        if (isset($postData->customer->last_name)) {
            $postData->customer->last_name = $this->prepString($postData->customer->last_name);
        }
        if (isset($postData->customer->middle_name)) {
            $postData->customer->middle_name = $this->prepString($postData->customer->middle_name);
        }

        if (isset($postData->shipping->first_name)) {
            $postData->shipping->first_name = $this->prepString($postData->shipping->first_name);
        }
        if (isset($postData->shipping->last_name)) {
            $postData->shipping->last_name = $this->prepString($postData->shipping->last_name);
        }
        if (isset($postData->shipping->middle_name)) {
            $postData->shipping->middle_name = $this->prepString($postData->shipping->middle_name);
        }

        if (isset($postData->billing->first_name)) {
            $postData->billing->first_name = $this->prepString($postData->billing->first_name);
        }
        if (isset($postData->billing->last_name)) {
            $postData->billing->last_name = $this->prepString($postData->billing->last_name);
        }
        if (isset($postData->billing->middle_name)) {
            $postData->billing->middle_name = $this->prepString($postData->billing->middle_name);
        }
        return $postData;
    }

    /**
     * @param string $str
     * @return mixed
     */
    private function prepString($str)
    {
        $str = str_replace("/", " ", $str);
        return $str;
    }

    /**
     * @param $string
     * @return array|string|string[]|null
     */
    private function prepNameForValidation($string)
    {
        if (Configuration::get('CHANNABLE_REPLACE_NAME_CHARACTERS') == '1') {
            try {
                $string = preg_replace('/[^ \\p{Latin}]+/u', '', $string, -1);
                $string = str_replace(
                    ['í', 'é', 'ñ', 'ç'],
                    ['i', 'e', 'n', 'c'],
                    $string
                );
                return $string;
            } catch (\Exception $e) {
                return $string;
            }
        }
        return $string;
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
            if (!is_numeric($ids[0]) || !is_numeric($ids[1])) {
                return false;
            }
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
            if (!is_numeric($ids[0])) {
                return false;
            }
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
