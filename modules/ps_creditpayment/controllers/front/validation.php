<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

/**
 * @since 1.5.0
 */
use PrestaShop\PrestaShop\Adapter\StockManager;
use PrestaShop\PrestaShop\Adapter\Entity\FileLogger;

class Ps_CreditpaymentValidationModuleFrontController extends ModuleFrontController
{
    const DEBUG_MODE = true;
    public $name = 'ps_creditpayment';

	/**
	 * @see FrontController::postProcess()
	 */
	public function postProcess()
	{
        $filePath = _PS_MODULE_DIR_.'ps_creditpayment/log/informer.log';
        $logger = new FileLogger();
        $logger->setFilename($filePath);
        $logger->logDebug('Starting example logger process.');

        if(Tools::getIsset('dynamic_data')){
            $data = json_decode(urldecode(Tools::getValue('dynamic_data')));
            $selectedCreditCustomer = (int)$data->on_credit_customer_select;

            $creditCustomer = new Customer($selectedCreditCustomer);
            $this->context->cart->id_customer = $selectedCreditCustomer;
            $this->context->cart->secure_key = $creditCustomer->secure_key;
            $this->context->cookie->selected_customer_secure_key = $creditCustomer->secure_key;
            $this->context->cookie->selected_customer_customer_firstname = $creditCustomer->firstname;
            $this->context->cookie->selected_customer_customer_lastname = $creditCustomer->lastname;
            $this->context->cookie->selected_customer_id_customer = $selectedCreditCustomer;
            $this->context->cookie->selected_customer_email = $creditCustomer->email;

            $this->context->cookie->on_credit_reference = $data->on_credit_reference;
            $this->context->cookie->on_credit_buyer = $data->on_credit_buyer;
        } else {
            $this->context->cookie->selected_customer_secure_key = '';
            $this->context->cookie->selected_customer_customer_firstname = '';
            $this->context->cookie->selected_customer_customer_lastname = '';
            $this->context->cookie->selected_customer_id_customer = '';
            $this->context->cookie->selected_customer_email = '';
            $this->context->cookie->on_credit_reference = '';
            $this->context->cookie->on_credit_buyer = '';
        }
        $cart = $this->context->cart;


        if ($cart->id_customer == 0 || $cart->id_address_delivery == 0 || $cart->id_address_invoice == 0 || !$this->module->active){
            Tools::redirect('index.php?controller=order&step=1');
        }

        // Check that this payment option is still available in case the customer changed his address just before the end of the checkout process
        $authorized = false;
        foreach (Module::getPaymentModules() as $module){
            if ($module['name'] == 'ps_creditpayment')
            {
                $authorized = true;
                break;
            }
        }

        if (!$authorized){
            die($this->module->getTranslator()->trans('This payment method is not available.', array(), 'Modules.Creditpayment.Shop'));
        }

        $customer = new Customer($cart->id_customer);
        if (!Validate::isLoadedObject($customer)){
            Tools::redirect('index.php?controller=order&step=1');
        }

        $currency = $this->context->currency;
        $total = (float)$cart->getOrderTotal(true, Cart::BOTH);
        $this->validateOrder($cart->id, Configuration::get('BANK_CREDIT_COMPLETE_STATE'), $total, 'Op Rekening', NULL, array(), (int)$currency->id, false, $this->context->cookie->selected_customer_secure_key);

        Tools::redirect('index.php?controller=order-confirmation&id_cart='.$cart->id.'&id_module='.$this->module->id.'&id_order='.$this->module->currentOrder.'&key='.$customer->secure_key.'&oncredit=true');
    }


    public function addToInformerApi($order){
        $logger = new FileLogger();
        $filePath = _PS_MODULE_DIR_.'ps_creditpayment/log/informer.log';
        $logger->setFilename($filePath);
        $logger->logDebug('Starting example logger process.');

        if(!empty($this->context->cookie->on_credit_reference)){
            $reference = $this->context->cookie->on_credit_reference;
        } else {
            $reference  = $order->reference;
        }
        $customer_comment = '';
        if(!empty($this->context->cookie->on_credit_buyer)){
            $customer_comment = 'Opgehaald door '.$this->context->cookie->on_credit_buyer . '<br>';
        }

        foreach (Message::getMessagesByOrderId($order->id, false) as $message) {
            $customer_comment .= $message['message'].'<br>';
        }

        $customer = new Customer($order->id_customer);
        $products = $order->getCartProducts();

        $payment_condition_id = Configuration::get('CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID', null, null, null, 444438);
        $currency_id = Configuration::get('CREDITPAYMENT_INFORMER_CURRENCY_ID', null, null, null, 73944);
        $vat_option = Configuration::get('CREDITPAYMENT_INFORMER_VAT_OPTION', null, null, null, 'incl'); //incl/excl
        $template_id = Configuration::get('CREDITPAYMENT_INFORMER_TEMPLATE_ID', null, null, null, 274888);
        $line_vat_id = Configuration::get('CREDITPAYMENT_INFORMER_LINE_VAT_ID', null, null, null, 840885);
        $line_category_id = Configuration::get('CREDITPAYMENT_INFORMER_LINE_LEDGER_ID', null, null, null, 7304025);

        $security_code = Configuration::get('CREDITPAYMENT_INFORMER_SECURITY_CODE', null, null, null, "62356");
        $api_key = Configuration::get('CREDITPAYMENT_INFORMER_API_KEY', null, null, null, "MEUGbrj3nT8Z4orUVznSQRMCYFxP6SySePckp0tVfJPrcB1DjO2");

        $footer = 'Wij verzoeken u vriendelijk het bovenstaande bedrag van {invoice.total} voor {invoice.vv_date} op onze bankrekening te voldoen, onder vermelding van het factuurnummer {invoice.number}.';

        //Create Card
        $query = [
            "relation_id" => (int)$customer->informer_identification,
            "reference" => $reference,
            "contact_name" => $customer->firstname . ' ' . $customer->lastname,
            "quotation_date" => date('Y-m-d'),
            "payment_condition_id" => $payment_condition_id,
            "currency_id" => $currency_id,
            "vat_option" => $vat_option,
            "template_id" => (int)$template_id,
            "comment" => $customer_comment,
            "footer" => $footer,
              "lines" => []
                ];

        foreach ($products as $product){
            $productName = $product['product_name'];

            if($product['id_category_default'] == (int)Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) && $product['description_short'] != "")
            {
                $text = new DOMDocument();
                $text->preserveWhiteSpace = false;
                $text->loadHTML(mb_convert_encoding($product['description_short'] , 'HTML-ENTITIES', 'UTF-8'));

                $productName .= '   '. $text->textContent;
            }

            if(!is_null($product['customizedDatas'])){
                $productName .= ' - '.$product['customizedDatas'][$product['id_address_delivery']][$product['id_customization']]['datas'][1][0]['value'];
            }

            $query["lines"][] = ["qty" => $product['product_quantity'],
                "description" => $productName,
                "amount" => $product['unit_price_tax_excl'],
                "discount" => $product['reduction_amount_tax_excl'],
                "vat_id" => $line_vat_id,
                "ledger_id" => $line_category_id,
                "product_id" => 617423
            ];
        }

        //Add discount rules
        foreach ($order->getCartRules() as $order_rule) {
                $query["lines"][] = ["qty" => 1,
                "description" => $order_rule['name'],
                "amount" => '-'.$order_rule['value_tax_excl'],
                "discount" => 0,
                "vat_id" => $line_vat_id,
                "ledger_id" => $line_category_id,
                "product_id" => 617423
            ];

        }

        //Add shipping product as last
        if((float)$order->total_shipping_tax_incl > 0){
            $query["lines"][] = ["qty" => 1,
                "description" => "Verzending",
                "amount" => $order->total_shipping_tax_excl,
                "discount" => 0,
                "vat_id" => $line_vat_id,
                "ledger_id" => $line_category_id,
                "product_id" => 617423
                ];

        }

        $curlCard = curl_init();

        $headers = array(
            "accept: application/json",
            "Securitycode: ".$security_code,
            "Apikey: ". $api_key,
        );


        curl_setopt_array($curlCard, array(
            CURLOPT_URL => "https://api.informer.eu/v1/salesorder",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => json_encode($query),
        ));
        $info = curl_getinfo($curlCard);
        $response = curl_exec($curlCard);

        if (!curl_errno($curlCard)) {
            $logger->logInfo('Informer call succeded result is:' . $response);
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Informer response', 1, null, 'Cart', (int) $response, true);
            $returnData = json_decode($response);
        } else {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Failed informer call', 1, null, 'Cart', (int) $reference, true);
            $logger->logInfo('Informer call failed result is:' . $response.' - of order '. $reference);
            $returnData = [];
        }
        curl_close($curlCard);

        return json_decode(json_encode($returnData),true);
    }


    /**
     * Validate an order in database overwrite function to fix secure keys conflict
     * Function called from a payment module.
     *
     * @param int $id_cart
     * @param int $id_order_state
     * @param float $amount_paid Amount really paid by customer (in the default currency)
     * @param string $payment_method Payment method (eg. 'Credit card')
     * @param null $message Message to attach to order
     * @param array $extra_vars
     * @param null $currency_special
     * @param bool $dont_touch_amount
     * @param bool $secure_key
     * @param Shop $shop
     *
     * @return bool
     *
     * @throws PrestaShopException
     */
    public function validateOrder(
        $id_cart,
        $id_order_state,
        $amount_paid,
        $payment_method = 'Unknown',
        $message = null,
        $extra_vars = array(),
        $currency_special = null,
        $dont_touch_amount = false,
        $secure_key = false,
        Shop $shop = null
    ) {
        if (self::DEBUG_MODE) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Function called', 1, null, 'Cart', (int) $id_cart, true);
        }

        if (!isset($this->context)) {
            $this->context = Context::getContext();
        }

        $this->context->cart = new Cart((int) $id_cart);

        if(isset($this->context->cookie->selected_customer_id_customer) && !empty($this->context->cookie->selected_customer_id_customer)){
            $this->context->customer = new Customer((int) $this->context->cookie->selected_customer_id_customer);
            $this->context->cart->id_customer = (int) $this->context->cookie->selected_customer_id_customer;
        } else {
            $this->context->customer = new Customer((int) $this->context->cart->id_customer);
        }

        // The tax cart is loaded before the customer so re-cache the tax calculation method
        $this->context->cart->setTaxCalculationMethod();

        $this->context->language = new Language((int) $this->context->cart->id_lang);
        $this->context->shop = ($shop ? $shop : new Shop((int) $this->context->cart->id_shop));
        ShopUrl::resetMainDomainCache();
        $id_currency = $currency_special ? (int) $currency_special : (int) $this->context->cart->id_currency;

        if(is_null($this->context->shop->id)){
            $error = $this->trans('Shop id is not defined, order already created', array(), 'Admin.Payment.Notification');
            die(Tools::displayError($error));
        } else {
            $this->context->currency = new Currency((int) $id_currency, null, (int) $this->context->shop->id);
        }

        if (Configuration::get('PS_TAX_ADDRESS_TYPE') == 'id_address_delivery') {
            $context_country = $this->context->country;
        }
        $order_status = new OrderState((int) $id_order_state, (int) $this->context->language->id);
        if (!Validate::isLoadedObject($order_status)) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Order Status cannot be loaded', 3, null, 'Cart', (int) $id_cart, true);

            throw new PrestaShopException('Can\'t load Order status');
        }
        // Does order already exists ?
        if (Validate::isLoadedObject($this->context->cart) && $this->context->cart->OrderExists() == false) {
//            if ($secure_key !== false && $secure_key != $this->context->cart->secure_key) {
//                PrestaShopLogger::addLog('PaymentModule::validateOrder - Secure key does not match', 3, null, 'Cart', (int) $id_cart, true);
//                die(Tools::displayError());
//            }


            // For each package, generate an order
            $delivery_option_list = $this->context->cart->getDeliveryOptionList();
            $package_list = $this->context->cart->getPackageList();
            $cart_delivery_option = $this->context->cart->getDeliveryOption(null,false,false);

            // If some delivery options are not defined, or not valid, use the first valid option
            foreach ($delivery_option_list as $id_address => $package) {
                if (!isset($cart_delivery_option[$id_address]) || !array_key_exists($cart_delivery_option[$id_address], $package)) {
                    foreach ($package as $key => $val) {
                        $cart_delivery_option[$id_address] = $key;

                        break;
                    }
                }
            }

            $order_list = array();
            $order_detail_list = array();

            $found = false;

            while (!$found) {
                $reference = Order::generateReference();
                $found = count(Order::getByReference($reference)) < 1;
            }

            $this->currentOrderReference = $reference;

            $cart_total_paid = (float) Tools::ps_round((float) $this->context->cart->getOrderTotal(true, Cart::BOTH), 2);

            foreach ($cart_delivery_option as $id_address => $key_carriers) {
                foreach ($delivery_option_list[$id_address][$key_carriers]['carrier_list'] as $id_carrier => $data) {
                    foreach ($data['package_list'] as $id_package) {
                        // Rewrite the id_warehouse
                        $package_list[$id_address][$id_package]['id_warehouse'] = (int) $this->context->cart->getPackageIdWarehouse($package_list[$id_address][$id_package], (int) $id_carrier);
                        $package_list[$id_address][$id_package]['id_carrier'] = $id_carrier;
                    }
                }
            }

            // Make sure CartRule caches are empty
            CartRule::cleanCache();
            $cart_rules = $this->context->cart->getCartRules();
            foreach ($cart_rules as $cart_rule) {
                if (($rule = new CartRule((int) $cart_rule['obj']->id)) && Validate::isLoadedObject($rule)) {
                    if ($error = $rule->checkValidity($this->context, true, true)) {
                        $this->context->cart->removeCartRule((int) $rule->id);
                        if (isset($this->context->cookie, $this->context->cookie->id_customer) && $this->context->cookie->id_customer && !empty($rule->code)) {
                            Tools::redirect('index.php?controller=order&submitAddDiscount=1&discount_name=' . urlencode($rule->code));
                        } else {
                            $rule_name = isset($rule->name[(int) $this->context->cart->id_lang]) ? $rule->name[(int) $this->context->cart->id_lang] : $rule->code;
                            $error = $this->trans('The cart rule named "%1s" (ID %2s) used in this cart is not valid and has been withdrawn from cart', array($rule_name, (int) $rule->id), 'Admin.Payment.Notification');
                            PrestaShopLogger::addLog($error, 3, '0000002', 'Cart', (int) $this->context->cart->id);
                        }
                    }
                }
            }

            // Amount paid by customer is not the right one -> Status = payment error
            // We don't use the following condition to avoid the float precision issues : http://www.php.net/manual/en/language.types.float.php
            // if ($order->total_paid != $order->total_paid_real)
            // We use number_format in order to compare two string
            if ($order_status->logable && number_format($cart_total_paid, _PS_PRICE_COMPUTE_PRECISION_) != number_format($amount_paid, _PS_PRICE_COMPUTE_PRECISION_)) {
                $id_order_state = Configuration::get('PS_OS_ERROR');
            }

            foreach ($package_list as $id_address => $packageByAddress) {
                foreach ($packageByAddress as $id_package => $package) {
                    $orderData = $this->createOrderFromCart(
                        $this->context->cart,
                        $this->context->currency,
                        $package['product_list'],
                        $id_address,
                        $this->context,
                        $reference,
                        $secure_key,
                        $payment_method,
                        $this->name,
                        $dont_touch_amount,
                        $amount_paid,
                        $package_list[$id_address][$id_package]['id_warehouse'],
                        $cart_total_paid,
                        self::DEBUG_MODE,
                        $order_status,
                        $id_order_state,
                        isset($this->context->cart->id_carrier) ? $this->context->cart->id_carrier : null
                    );
                    $order = $orderData['order'];
                    $order_list[] = $order;
                    $order_detail_list[] = $orderData['orderDetail'];
                }
            }
            //add shipping costs
            $order->total_shipping = $this->context->cart->getPackageShippingCost($this->context->cart->id_carrier, true);
            $order->total_shipping_tax_incl = $this->context->cart->getPackageShippingCost($this->context->cart->id_carrier, true);
            $order->total_shipping_tax_excl = $this->context->cart->getPackageShippingCost($this->context->cart->id_carrier, false);
            $order->shipping_number = '';


            // The country can only change if the address used for the calculation is the delivery address, and if multi-shipping is activated
            if (Configuration::get('PS_TAX_ADDRESS_TYPE') == 'id_address_delivery') {
                $this->context->country = $context_country;
            }

            if (!$this->context->country->active) {
                PrestaShopLogger::addLog('PaymentModule::validateOrder - Country is not active', 3, null, 'Cart', (int) $id_cart, true);

                throw new PrestaShopException('The order address country is not active.');
            }

            if (self::DEBUG_MODE) {
                PrestaShopLogger::addLog('PaymentModule::validateOrder - Payment is about to be added', 1, null, 'Cart', (int) $id_cart, true);
            }

            // Register Payment only if the order status validate the order
            if ($order_status->logable) {
                // $order is the last order loop in the foreach
                // The method addOrderPayment of the class Order make a create a paymentOrder
                // linked to the order reference and not to the order id
                if (isset($extra_vars['transaction_id'])) {
                    $transaction_id = $extra_vars['transaction_id'];
                } else {
                    $transaction_id = null;
                }

                if (!$order->addOrderPayment($amount_paid, null, $transaction_id)) {
                    PrestaShopLogger::addLog('PaymentModule::validateOrder - Cannot save Order Payment', 3, null, 'Cart', (int) $id_cart, true);

                    throw new PrestaShopException('Can\'t save Order Payment');
                }
            }




            // Next !
            $only_one_gift = false;
            $products = $this->context->cart->getProducts();

            // Make sure CartRule caches are empty
            CartRule::cleanCache();
            foreach ($order_detail_list as $key => $order_detail) {
                /** @var OrderDetail $order_detail */
                $order = $order_list[$key];
                if (isset($order->id)) {
                    if (!$secure_key) {
                        $message .= '<br />' . $this->trans('Warning: the secure key is empty, check your payment account before validation', array(), 'Admin.Payment.Notification');
                    }
                    // Optional message to attach to this order
                    if (isset($message) & !empty($message)) {
                        $msg = new Message();
                        $message = strip_tags($message, '<br>');
                        if (Validate::isCleanHtml($message)) {
                            if (self::DEBUG_MODE) {
                                PrestaShopLogger::addLog('PaymentModule::validateOrder - Message is about to be added', 1, null, 'Cart', (int) $id_cart, true);
                            }
                            $msg->message = $message;
                            $msg->id_cart = (int) $id_cart;
                            $msg->id_customer = (int) ($order->id_customer);
                            $msg->id_order = (int) $order->id;
                            $msg->private = 1;
                            $msg->add();
                        }
                    }




                    // Insert new Order detail list using cart for the current order
                    //$orderDetail = new OrderDetail(null, null, $this->context);
                    //$orderDetail->createList($order, $this->context->cart, $id_order_state);

                    // Construct order detail table for the email
                    $products_list = '';
                    $virtual_product = true;

                    $product_var_tpl_list = array();
                    foreach ($order->product_list as $product) {
                        $price = Product::getPriceStatic((int) $product['id_product'], false, ($product['id_product_attribute'] ? (int) $product['id_product_attribute'] : null), 6, null, false, true, $product['cart_quantity'], false, (int) $order->id_customer, (int) $order->id_cart, (int) $order->{Configuration::get('PS_TAX_ADDRESS_TYPE')}, $specific_price, true, true, null, true, $product['id_customization']);
                        $price_wt = Product::getPriceStatic((int) $product['id_product'], true, ($product['id_product_attribute'] ? (int) $product['id_product_attribute'] : null), 2, null, false, true, $product['cart_quantity'], false, (int) $order->id_customer, (int) $order->id_cart, (int) $order->{Configuration::get('PS_TAX_ADDRESS_TYPE')}, $specific_price, true, true, null, true, $product['id_customization']);

                        $product_price = Product::getTaxCalculationMethod() == PS_TAX_EXC ? Tools::ps_round($price, 2) : $price_wt;

                        $product_var_tpl = array(
                            'id_product' => $product['id_product'],
                            'reference' => $product['reference'],
                            'name' => $product['name'] . (isset($product['attributes']) ? ' - ' . $product['attributes'] : ''),
                            'price' => Context::getContext()->currentLocale->formatPrice($product_price * $product['quantity'], 'EUR'),
                            'quantity' => $product['quantity'],
                            'customization' => array(),
                        );

                        if (isset($product['price']) && $product['price']) {
                            $product_var_tpl['unit_price'] = Context::getContext()->currentLocale->formatPrice($product_price, 'EUR');
                            $product_var_tpl['unit_price_full'] = Context::getContext()->currentLocale->formatPrice($product_price, 'EUR')
                                . ' ' . $product['unity'];
                        } else {
                            $product_var_tpl['unit_price'] = $product_var_tpl['unit_price_full'] = '';
                        }

                        $customized_datas = Product::getAllCustomizedDatas((int) $order->id_cart, null, true, null, (int) $product['id_customization']);
                        if (isset($customized_datas[$product['id_product']][$product['id_product_attribute']])) {
                            $product_var_tpl['customization'] = array();
                            foreach ($customized_datas[$product['id_product']][$product['id_product_attribute']][$order->id_address_delivery] as $customization) {
                                $customization_text = '';
                                if (isset($customization['datas'][Product::CUSTOMIZE_TEXTFIELD])) {
                                    foreach ($customization['datas'][Product::CUSTOMIZE_TEXTFIELD] as $text) {
                                        $customization_text .= '<strong>' . $text['name'] . '</strong>: ' . $text['value'] . '<br />';
                                    }
                                }

                                if (isset($customization['datas'][Product::CUSTOMIZE_FILE])) {
                                    $customization_text .= $this->trans('%d image(s)', array(count($customization['datas'][Product::CUSTOMIZE_FILE])), 'Admin.Payment.Notification') . '<br />';
                                }

                                $customization_quantity = (int) $customization['quantity'];

                                $product_var_tpl['customization'][] = array(
                                    'customization_text' => $customization_text,
                                    'customization_quantity' => $customization_quantity,
                                    'quantity' => Context::getContext()->currentLocale->formatPrice($customization_quantity * $product_price, 'EUR'),
                                );
                            }
                        }

                        $product_var_tpl_list[] = $product_var_tpl;
                        // Check if is not a virutal product for the displaying of shipping
                        if (!$product['is_virtual']) {
                            $virtual_product &= false;
                        }
                    } // end foreach ($products)

                    $product_list_txt = '';
                    $product_list_html = '';
                    if (count($product_var_tpl_list) > 0) {
                        $product_list_txt = $this->getEmailTemplateContent('order_conf_product_list.txt', Mail::TYPE_TEXT, $product_var_tpl_list);
                        $product_list_html = $this->getEmailTemplateContent('order_conf_product_list.tpl', Mail::TYPE_HTML, $product_var_tpl_list);
                    }

                    $total_reduction_value_ti = 0;
                    $total_reduction_value_tex = 0;

                    $cart_rules_list = $this->createOrderCartRules(
                        $order,
                        $this->context->cart,
                        $order_list,
                        $total_reduction_value_ti,
                        $total_reduction_value_tex,
                        $id_order_state
                    );

                    $cart_rules_list_txt = '';
                    $cart_rules_list_html = '';
                    if (count($cart_rules_list) > 0) {
                        $cart_rules_list_txt = $this->getEmailTemplateContent('order_conf_cart_rules.txt', Mail::TYPE_TEXT, $cart_rules_list);
                        $cart_rules_list_html = $this->getEmailTemplateContent('order_conf_cart_rules.tpl', Mail::TYPE_HTML, $cart_rules_list);
                    }

                    // Specify order id for message
                    $old_message = Message::getMessageByCartId((int) $this->context->cart->id);
                    $customer_thread_id = 0;
                    if ($old_message && !$old_message['private']) {
                        $update_message = new Message((int) $old_message['id_message']);
                        $update_message->id_order = (int) $order->id;
                        $update_message->update();

                        // Add this message in the customer thread
                        $customer_thread = new CustomerThread();
                        $customer_thread->id_contact = 0;
                        $customer_thread->id_customer = (int) $order->id_customer;
                        $customer_thread->id_shop = (int) $this->context->shop->id;
                        $customer_thread->id_order = (int) $order->id;
                        $customer_thread->id_lang = (int) $this->context->language->id;
                        $customer_thread->email = $this->context->customer->email;
                        $customer_thread->status = 'open';
                        $customer_thread->token = Tools::passwdGen(12);
                        $customer_thread->add();

                        $customer_thread_id = $customer_thread->id;

                        $customer_message = new CustomerMessage();
                        $customer_message->id_customer_thread = $customer_thread_id;
                        $customer_message->id_employee = 0;
                        $customer_message->message = $update_message->message;
                        $customer_message->private = 1;

                        if (!$customer_message->add()) {
                            $this->errors[] = $this->trans('An error occurred while saving message', array(), 'Admin.Payment.Notification');
                        }
                    }

                    if (self::DEBUG_MODE) {
                        PrestaShopLogger::addLog('PaymentModule::validateOrder - Hook validateOrder is about to be called', 1, null, 'Cart', (int) $id_cart, true);
                    }

                    // Hook validate order
                    Hook::exec('actionValidateOrder', array(
                        'cart' => $this->context->cart,
                        'order' => $order,
                        'customer' => $this->context->customer,
                        'currency' => $this->context->currency,
                        'orderStatus' => $order_status,
                    ));



                    foreach ($this->context->cart->getProducts() as $product) {
                        if ($order_status->logable) {
                            ProductSale::addProductSale((int) $product['id_product'], (int) $product['cart_quantity']);
                        }
                    }

                    if (self::DEBUG_MODE) {
                        PrestaShopLogger::addLog('PaymentModule::validateOrder - Order Status is about to be added', 1, null, 'Cart', (int) $id_cart, true);
                    }

                    // Set the order status
                    $new_history = new OrderHistory();
                    $new_history->id_order = (int) $order->id;
                    $new_history->changeIdOrderState((int) $id_order_state, $order, true);
                    $new_history->add(true, $extra_vars);

                    // Switch to back order if needed
                    if (Configuration::get('PS_STOCK_MANAGEMENT') &&
                        ($order_detail->getStockState() ||
                            $order_detail->product_quantity_in_stock < 0)) {
                        $history = new OrderHistory();
                        $history->id_order = (int) $order->id;
                        $history->changeIdOrderState(Configuration::get($order->hasBeenPaid() ? 'PS_OS_OUTOFSTOCK_PAID' : 'PS_OS_OUTOFSTOCK_UNPAID'), $order, true);
                        $history->add();
                    }

                    unset($order_detail);

                    // Order is reloaded because the status just changed
                    $order = new Order((int) $order->id);

                    // updates stock in shops
                    if (Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT')) {
                        $product_list = $order->getProducts();
                        foreach ($product_list as $product) {
                            // if the available quantities depends on the physical stock
                            if (StockAvailable::dependsOnStock($product['product_id'])) {
                                // synchronizes
                                StockAvailable::synchronize($product['product_id'], $order->id_shop);
                            }
                        }
                    }

                    $order->updateOrderDetailTax();
                    // sync all stock
                    (new StockManager())->updatePhysicalProductQuantity(
                        (int) $order->id_shop,
                        (int) Configuration::get('PS_OS_ERROR'),
                        (int) Configuration::get('PS_OS_CANCELED'),
                        null,
                        (int) $order->id
                    );
                } else {
                    $error = $this->trans('Order creation failed', array(), 'Admin.Payment.Notification');
                    PrestaShopLogger::addLog($error, 4, '0000002', 'Cart', (int) ($order->id_cart));
                    die(Tools::displayError($error));
                }
            } // End foreach $order_detail_list

            // Use the last order as currentOrder
            if (isset($order) && $order->id) {
                $this->currentOrder = (int) $order->id;
            }

            if (self::DEBUG_MODE) {
                PrestaShopLogger::addLog('PaymentModule::validateOrder - End of validateOrder', 1, null, 'Cart', (int) $id_cart, true);
            }

            $resultApi = $this->addToInformerApi($order);
            $resultProjectMessage = $this->addProjectAndEmployeeToMessages($order, $customer_thread_id);
            $this->sendAdministrationMsg($order, $resultApi);
            return true;
        } else {
            $error = $this->trans('Cart cannot be loaded or an order has already been placed using this cart', array(), 'Admin.Payment.Notification');
            PrestaShopLogger::addLog($error, 4, '0000001', 'Cart', (int) ($this->context->cart->id));
            die(Tools::displayError($error));
        }
    }

    private function addProjectAndEmployeeToMessages($order, $customer_thread_id){
        $projectMessage = '';
        if(!empty($this->context->cookie->on_credit_reference)){
            $projectMessage = $projectMessage = strip_tags('Ref: '. $this->context->cookie->on_credit_reference.'<br>', '<br>');
            $this->context->cookie->on_credit_reference = '';
        }

        $customerMessage = '';
        if(!empty($this->context->cookie->on_credit_buyer)){
            $customerMessage = strip_tags('Afhaler: '.$this->context->cookie->on_credit_buyer . '<br>', '<br>');
            $this->context->cookie->on_credit_buyer = '';
        }

        if (Validate::isCleanHtml($projectMessage) && $projectMessage != '') {
            if (self::DEBUG_MODE) {
                PrestaShopLogger::addLog('PaymentModule::validateOrder - Message with on credit project info is about to be added', 1, null, 'Cart', (int)$order->id_cart, true);
            }
            $projectMsg = new Message();
            $projectMsg->message = $projectMessage;
            $projectMsg->id_cart = (int)$order->id_cart;
            $projectMsg->id_customer = (int)($order->id_customer);
            $projectMsg->id_order = (int)$order->id;
            $projectMsg->private = 0;
            $projectMsg->add();
        }

        if (Validate::isCleanHtml($customerMessage) && $customerMessage != '') {
            if (self::DEBUG_MODE) {
                PrestaShopLogger::addLog('PaymentModule::validateOrder - Message with on credit customer info is about to be added', 1, null, 'Cart', (int)$order->id_cart, true);
            }
            $customerMsg = new Message();
            $customerMsg->message = $customerMessage;
            $customerMsg->id_cart = (int)$order->id_cart;
            $customerMsg->id_customer = (int)($order->id_customer);
            $customerMsg->id_order = (int)$order->id;
            $customerMsg->private = 0;
            $customerMsg->add();
        }

        if($customer_thread_id == 0){
            // Add this message in the customer thread
            $customer_thread = new CustomerThread();
            $customer_thread->id_contact = 0;
            $customer_thread->id_customer = (int) $order->id_customer;
            $customer_thread->id_shop = (int) $this->context->shop->id;
            $customer_thread->id_order = (int) $order->id;
            $customer_thread->id_lang = (int) $this->context->language->id;
            $customer_thread->email = $this->context->customer->email;
            $customer_thread->status = 'open';
            $customer_thread->token = Tools::passwdGen(12);
            $customer_thread->add();

            $customer_thread_id = $customer_thread->id;
        }

        $customer_message = new CustomerMessage();
        $customer_message->id_customer_thread = $customer_thread_id;
        $customer_message->id_employee = 0;
        $customer_message->message = $projectMessage . $customerMessage;
        $customer_message->private = 0;
        $customer_message->add();

        return true;
    }


    /**
     * Fetch the content of $template_name inside the folder
     * current_theme/mails/current_iso_lang/ if found, otherwise in
     * mails/current_iso_lang.
     *
     * @param string $template_name template name with extension
     * @param int $mail_type Mail::TYPE_HTML or Mail::TYPE_TEXT
     * @param array $var sent to smarty as 'list'
     *
     * @return string
     */
    protected function getEmailTemplateContent($template_name, $mail_type, $var)
    {
        $email_configuration = Configuration::get('PS_MAIL_TYPE');
        if ($email_configuration != $mail_type && $email_configuration != Mail::TYPE_BOTH) {
            return '';
        }

        $pathToFindEmail = array(
            _PS_THEME_DIR_ . 'mails' . DIRECTORY_SEPARATOR . $this->context->language->iso_code . DIRECTORY_SEPARATOR . $template_name,
            _PS_THEME_DIR_ . 'mails' . DIRECTORY_SEPARATOR . 'en' . DIRECTORY_SEPARATOR . $template_name,
            _PS_MAIL_DIR_ . $this->context->language->iso_code . DIRECTORY_SEPARATOR . $template_name,
            _PS_MAIL_DIR_ . 'en' . DIRECTORY_SEPARATOR . $template_name,
        );

        foreach ($pathToFindEmail as $path) {
            if (Tools::file_exists_cache($path)) {
                $this->context->smarty->assign('list', $var);

                return $this->context->smarty->fetch($path);
            }
        }

        return '';
    }


    protected function createOrderFromCart(
        Cart $cart,
        Currency $currency,
        $productList,
        $addressId,
        $context,
        $reference,
        $secure_key,
        $payment_method,
        $name,
        $dont_touch_amount,
        $amount_paid,
        $warehouseId,
        $cart_total_paid,
        $debug,
        $order_status,
        $id_order_state,
        $carrierId = null
    ) {
        $order = new Order();
        $order->product_list = $productList;

        if (Configuration::get('PS_TAX_ADDRESS_TYPE') == 'id_address_delivery') {
            $address = new Address((int) $addressId);
            $context->country = new Country((int) $address->id_country, (int) $cart->id_lang);
            if (!$context->country->active) {
                throw new PrestaShopException('The delivery address country is not active.');
            }
        }

        $carrier = null;
        if (!$cart->isVirtualCart() && isset($carrierId)) {
            $carrier = new Carrier((int) $carrierId, (int) $cart->id_lang);
            $order->id_carrier = (int) $carrier->id;
            $carrierId = (int) $carrier->id;
        } else {
            $order->id_carrier = 0;
            $carrierId = 0;
        }

        $order->id_customer = (int) $context->cookie->selected_customer_id_customer;
        $order->id_address_invoice = (int) $cart->id_address_invoice;
        $order->id_address_delivery = (int) $addressId;
        $order->id_currency = $currency->id;
        $order->id_lang = (int) $cart->id_lang;
        $order->id_cart = (int) $cart->id;
        $order->reference = $reference;

        //-------------------------------------------------------------------- Add value added to order
        $order->added_to_order = $cart->added_to_order;

        $order->id_shop = (int) $context->shop->id;
        $order->id_shop_group = (int) $context->shop->id_shop_group;

        $order->secure_key = ($secure_key ? pSQL($secure_key) : pSQL($context->customer->secure_key));
        $order->payment = $payment_method;
        if (isset($name)) {
            $order->module = $name;
        }
        $order->recyclable = $cart->recyclable;
        $order->gift = (int) $cart->gift;
        $order->gift_message = $cart->gift_message;
        $order->mobile_theme = $cart->mobile_theme;
        $order->conversion_rate = $currency->conversion_rate;
        $amount_paid = !$dont_touch_amount ? Tools::ps_round((float) $amount_paid, _PS_PRICE_COMPUTE_PRECISION_) : $amount_paid;
        $order->total_paid_real = 0;

        $order->total_products = (float) $cart->getOrderTotal(false, Cart::ONLY_PRODUCTS, $order->product_list, $carrierId);
        $order->total_products_wt = (float) $cart->getOrderTotal(true, Cart::ONLY_PRODUCTS, $order->product_list, $carrierId);
        $order->total_discounts_tax_excl = (float) abs($cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS, $order->product_list, $carrierId));
        $order->total_discounts_tax_incl = (float) abs($cart->getOrderTotal(true, Cart::ONLY_DISCOUNTS, $order->product_list, $carrierId));
        $order->total_discounts = $order->total_discounts_tax_incl;

        $order->total_shipping_tax_excl = (float) $cart->getTotalShippingCost(null, false);
        $order->total_shipping_tax_incl = (float) $cart->getTotalShippingCost(null, true);
        if((float)$order->total_shipping_tax_incl > 0){
            $order->total_shipping = $order->total_shipping_tax_incl;
        } else {
            $order->total_shipping = $this->context->cart->getPackageShippingCost($this->context->cart->id_carrier, true);
            $order->total_shipping_tax_incl = $this->context->cart->getPackageShippingCost($this->context->cart->id_carrier, true);
            $order->total_shipping_tax_excl = $this->context->cart->getPackageShippingCost($this->context->cart->id_carrier, false);
        }


        if (null !== $carrier && Validate::isLoadedObject($carrier)) {
            $order->carrier_tax_rate = $carrier->getTaxesRate(new Address((int) $cart->{Configuration::get('PS_TAX_ADDRESS_TYPE')}));
        }

        $order->total_wrapping_tax_excl = (float) abs($cart->getOrderTotal(false, Cart::ONLY_WRAPPING, $order->product_list, $carrierId));
        $order->total_wrapping_tax_incl = (float) abs($cart->getOrderTotal(true, Cart::ONLY_WRAPPING, $order->product_list, $carrierId));
        $order->total_wrapping = $order->total_wrapping_tax_incl;

        $order->total_paid_tax_excl = (float) Tools::ps_round((float) $cart->getOrderTotal(false, Cart::BOTH, $order->product_list, $carrierId), _PS_PRICE_COMPUTE_PRECISION_);
        $order->total_paid_tax_incl = (float) Tools::ps_round((float) $cart->getOrderTotal(true, Cart::BOTH, $order->product_list, $carrierId), _PS_PRICE_COMPUTE_PRECISION_);
        $order->total_paid = $order->total_paid_tax_incl;
        $order->round_mode = Configuration::get('PS_PRICE_ROUND_MODE');
        $order->round_type = Configuration::get('PS_ROUND_TYPE');

        $order->invoice_date = '0000-00-00 00:00:00';
        $order->delivery_date = '0000-00-00 00:00:00';
        $order->desired_delivery_date = '0000-00-00 00:00:00';

        if ($debug) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Order is about to be added', 1, null, 'Cart', (int) $cart->id, true);
        }

        // Creating order
        $result = $order->add();

        if (!$result) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - Order cannot be created', 3, null, 'Cart', (int) $cart->id, true);
            throw new PrestaShopException('Can\'t save Order');
        }

        if ($debug) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - OrderDetail is about to be added', 1, null, 'Cart', (int) $cart->id, true);
        }

        // Insert new Order detail list using cart for the current order
        $order_detail = new OrderDetail(null, null, $context);
        $order_detail->createList($order, $cart, $id_order_state, $order->product_list, 0, true, $warehouseId);

        if ($debug) {
            PrestaShopLogger::addLog('PaymentModule::validateOrder - OrderCarrier is about to be added', 1, null, 'Cart', (int) $cart->id, true);
        }

        // Adding an entry in order_carrier table
        if (null !== $carrier) {
            $order_carrier = new OrderCarrier();
            $order_carrier->id_order = (int) $order->id;
            $order_carrier->id_carrier = $carrierId;
            $order_carrier->weight = (float) $order->getTotalWeight();
            $order_carrier->shipping_cost_tax_excl = (float) $order->total_shipping_tax_excl;
            $order_carrier->shipping_cost_tax_incl = (float) $order->total_shipping_tax_incl;
            $order_carrier->add();
        }
        return ['order' => $order, 'orderDetail' => $order_detail];
    }

    protected function createOrderCartRules(
        Order $order,
        Cart $cart,
        $order_list,
        $total_reduction_value_ti,
        $total_reduction_value_tex,
        $id_order_state
    ) {
        $cart_rule_used = array();

        // prepare cart calculator to correctly get the value of each cart rule
        $calculator = $cart->newCalculator($order->product_list, $cart->getCartRules(), $order->id_carrier);
        $calculator->processCalculation(_PS_PRICE_COMPUTE_PRECISION_);
        $cartRulesData = $calculator->getCartRulesData();

        $cart_rules_list = array();
        foreach ($cartRulesData as $cartRuleData) {
            $cartRule = $cartRuleData->getCartRule();
            // Here we need to get actual values from cart calculator
            $values = array(
                'tax_incl' => $cartRuleData->getDiscountApplied()->getTaxIncluded(),
                'tax_excl' => $cartRuleData->getDiscountApplied()->getTaxExcluded(),
            );

            // If the reduction is not applicable to this order, then continue with the next one
            if (!$values['tax_excl']) {
                continue;
            }

            // IF
            //  This is not multi-shipping
            //  The value of the voucher is greater than the total of the order
            //  Partial use is allowed
            //  This is an "amount" reduction, not a reduction in % or a gift
            // THEN
            //  The voucher is cloned with a new value corresponding to the remainder
            $cartRuleReductionAmountConverted = $cartRule->reduction_amount;
            if ((int) $cartRule->reduction_currency !== $cart->id_currency) {
                $cartRuleReductionAmountConverted = Tools::convertPriceFull(
                    $cartRule->reduction_amount,
                    new Currency((int) $cartRule->reduction_currency),
                    new Currency($cart->id_currency)
                );
            }
            $remainingValue = $cartRuleReductionAmountConverted - $values[$cartRule->reduction_tax ? 'tax_incl' : 'tax_excl'];
            $remainingValue = Tools::ps_round($remainingValue, _PS_PRICE_COMPUTE_PRECISION_);
            if (count($order_list) == 1 && $remainingValue > 0 && $cartRule->partial_use == 1 && $cartRuleReductionAmountConverted > 0) {
                // Create a new voucher from the original
                $voucher = new CartRule((int) $cartRule->id); // We need to instantiate the CartRule without lang parameter to allow saving it
                unset($voucher->id);

                // Set a new voucher code
                $voucher->code = empty($voucher->code) ? substr(md5($order->id . '-' . $order->id_customer . '-' . $cartRule->id), 0, 16) : $voucher->code . '-2';
                if (preg_match('/\-([0-9]{1,2})\-([0-9]{1,2})$/', $voucher->code, $matches) && $matches[1] == $matches[2]) {
                    $voucher->code = preg_replace('/' . $matches[0] . '$/', '-' . (intval($matches[1]) + 1), $voucher->code);
                }

                // Set the new voucher value
                $voucher->reduction_amount = $remainingValue;
                if ($voucher->reduction_tax) {
                    // Add total shipping amout only if reduction amount > total shipping
                    if ($voucher->free_shipping == 1 && $voucher->reduction_amount >= $order->total_shipping_tax_incl) {
                        $voucher->reduction_amount -= $order->total_shipping_tax_incl;
                    }
                } else {
                    // Add total shipping amout only if reduction amount > total shipping
                    if ($voucher->free_shipping == 1 && $voucher->reduction_amount >= $order->total_shipping_tax_excl) {
                        $voucher->reduction_amount -= $order->total_shipping_tax_excl;
                    }
                }
                if ($voucher->reduction_amount <= 0) {
                    continue;
                }

                if ($this->context->customer->isGuest()) {
                    $voucher->id_customer = 0;
                } else {
                    $voucher->id_customer = $order->id_customer;
                }

                $voucher->quantity = 1;
                $voucher->reduction_currency = $order->id_currency;
                $voucher->quantity_per_user = 1;
                if ($voucher->add()) {
                    // If the voucher has conditions, they are now copied to the new voucher
                    CartRule::copyConditions($cartRule->id, $voucher->id);
                    $orderLanguage = new Language((int) $order->id_lang);

                    $params = array(
                        '{voucher_amount}' => Context::getContext()->currentLocale->formatPrice($voucher->reduction_amount, 'EUR'),
                        '{voucher_num}' => $voucher->code,
                        '{firstname}' => $this->context->customer->firstname,
                        '{lastname}' => $this->context->customer->lastname,
                        '{id_order}' => $order->reference,
                        '{order_name}' => $order->getUniqReference(),
                    );
                    Mail::Send(
                        (int) $order->id_lang,
                        'voucher',
                        Context::getContext()->getTranslator()->trans(
                            'New voucher for your order %s',
                            array($order->reference),
                            'Emails.Subject',
                            $orderLanguage->locale
                        ),
                        $params,
                        $this->context->customer->email,
                        $this->context->customer->firstname . ' ' . $this->context->customer->lastname,
                        null, null, null, null, _PS_MAIL_DIR_, false, (int) $order->id_shop
                    );
                }

                $values['tax_incl'] = $order->total_products_wt - $total_reduction_value_ti;
                $values['tax_excl'] = $order->total_products - $total_reduction_value_tex;
                if (1 == $voucher->free_shipping) {
                    $values['tax_incl'] += $order->total_shipping_tax_incl;
                    $values['tax_excl'] += $order->total_shipping_tax_excl;
                }
            }
            $total_reduction_value_ti += $values['tax_incl'];
            $total_reduction_value_tex += $values['tax_excl'];

            $order->addCartRule($cartRule->id, $cartRule->name, $values, 0, $cartRule->free_shipping);

            if ($id_order_state != Configuration::get('PS_OS_ERROR') && $id_order_state != Configuration::get('PS_OS_CANCELED') && !in_array($cartRule->id, $cart_rule_used)) {
                $cart_rule_used[] = $cartRule->id;

                // Create a new instance of Cart Rule without id_lang, in order to update its quantity
                $cart_rule_to_update = new CartRule((int) $cartRule->id);
                $cart_rule_to_update->quantity = max(0, $cart_rule_to_update->quantity - 1);
                $cart_rule_to_update->update();
            }

            $cart_rules_list[] = array(
                'voucher_name' => $cartRule->name,
                'voucher_reduction' => ($values['tax_incl'] != 0.00 ? '-' : '') . Context::getContext()->currentLocale->formatPrice($values['tax_incl'], 'EUR'),
            );
        }
        return $cart_rules_list;
    }

   /**
     * @param $order
     * @param $resultApi
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws \PrestaShop\PrestaShop\Core\Localization\Exception\LocalizationException
     */
    private function sendAdministrationMsg($order, $resultApi)
    {
        $logger = new FileLogger();
        $filePath = _PS_MODULE_DIR_.'ps_creditpayment/log/informer.log';
        $logger->setFilename($filePath);
        $logger->logDebug('Starting example logger process.');

        $context = Context::getContext();

        $orderObject = new Order($order->id);
        $total_paid = $orderObject->getOrdersTotalPaid();
        $customer_comment = "";
        if (!empty($context->cookie->on_credit_reference)) {
            $reference = $context->cookie->on_credit_reference;
            $referenceText = ' met ref: ' . $context->cookie->on_credit_reference;
        } else {
            $reference = $order->reference;
            $referenceText = "";
        }

        if (!empty($context->cookie->on_credit_buyer)) {
            $customer_comment = 'Opgehaald door ' . $context->cookie->on_credit_buyer . $referenceText;
        }

        foreach (Message::getMessagesByOrderId($order->id, false) as $message) {
            $customer_comment .= ' <br/> - ' . $message['message'];
        }
        $customer_comment .= '<br/>Bestelreferentie van de Ijzershop: ' . $order->reference;


        $logger->logInfo('Informer call done ready to send mail:' . json_encode($resultApi));

        if (!is_null($resultApi) && array_key_exists('order_id', $resultApi)) {
            $saleOrderState = '<b style="color:#70b580; font-size: 20px;">U kunt de informer factuur inkijken op<br/> <a style="color:#ffffff" href="https://app.informer.eu/orders/sales/"> >> Informer Rekening</a>';
            $subject = 'Nieuwe op rekening bestelling, SUCCES in informer';
        } else {
            $saleOrderState = '<b style="color:#ffa500; font-size: 20px;">Aanmaken van een informer factuur is mislukt!</b>';
            $subject = 'Nieuwe op rekening bestelling, FOUT in informer';
        }

        $customer = new Customer($order->id_customer);

        // Join PDF invoice
        if ($orderObject->invoice_number) {
            $orderLanguage = new Language((int)$orderObject->id_lang);
            $currentLanguage = $context->language;
            $context->language = $orderLanguage;
            $context->getTranslator()->setLocale($orderLanguage->locale);
            $orderObject_invoice_list = $orderObject->getInvoicesCollection();
            Hook::exec('actionPDFInvoiceRender', ['order_invoice_list' => $orderObject_invoice_list]);
            $pdf = new PDF($orderObject_invoice_list, PDF::TEMPLATE_INVOICE, $context->smarty);
            $file_attachement['content'] = $pdf->render(false);
            $file_attachement['name'] = Configuration::get('PS_INVOICE_PREFIX', (int)$orderObject->id_lang, null, $orderObject->id_shop) . sprintf('%06d', $orderObject->invoice_number) . '.pdf';
            $file_attachement['mime'] = 'application/pdf';
            $context->language = $currentLanguage;
            $context->getTranslator()->setLocale($currentLanguage->locale);
        } else {
            $file_attachement = null;
        }

        $storeName = $context->shop->name;

        $sended = Mail::Send(
            Context::getContext()->language->id,
            'on_credit_msg',
            $subject,
            array(
                '{firstname}' => $customer->firstname,
                '{lastname}' => $customer->lastname,
                '{email}' => $customer->email,
                '{total_paid}' => Context::getContext()->currentLocale->formatPrice($total_paid, 'EUR'),
                '{customer_oncredit_comment}' => $customer_comment,
                '{informer_order_created}' => $saleOrderState
            ),
            'informer@ijzershop.nl',
            $storeName,
            null,
            null,
            $file_attachement,
            null,
            _PS_MAIL_DIR_,
            false,
            (int)$orderObject->id_shop
        );


    }

    /**
     * @param object Address $the_address that needs to be txt formated
     *
     * @return string the txt formated address block
     */
    protected function _getFormatedAddress(Address $the_address, $line_sep, $fields_style = array())
    {
        return AddressFormat::generateAddress($the_address, array('avoid' => array()), $line_sep, ' ', $fields_style);
    }
}
