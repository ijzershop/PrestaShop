<?php


require_once(dirname(__FILE__).'/../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/classes/MollieLogger.php');
use Mollie\Api\MollieApiClient;

/**
 *
 */
class MSMollieReturnModuleFrontController extends ModuleFrontControllerCore {

    private $logger;

    public function __construct()
    {
        $this->logger = new MollieLogger();
        $this->module = Module::getInstanceByName('msmollie');
        $this->context = Context::getContext();
        parent::__construct();
    }

    /**
     * @return void
     */
    public function postProcess(): void
    {

        $cartId = Tools::getValue('cart_id');
        $moduleId = Tools::getValue('module_id');
        $secureKey = Tools::getValue('secure_key');
        $method = Tools::getValue('method');


        $cart = new Cart($cartId);

        $this->errors = [];

        try {
            // Get payment ID from POST data
            $existingTempOrder = Db::getInstance()->getRow('
                                    SELECT * FROM '._DB_PREFIX_.'orders
                                    WHERE id_cart = '.(int)$cartId);

            if(!$existingTempOrder) {
                $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Er is geen temp order gevonden', 'error');

                $this->context->cart = $cart;
                $this->context->cart->id_lang = $this->context->language->id;
                $this->context->cart->id_currency = $this->context->currency->id;
                $this->context->cart->id_customer = $this->context->customer->id;
                $this->context->cookie->id_cart = $cart->id;
                $this->context->customer = $cart->id_customer;

                $this->errors[] = $this->module->l('Er ging iets fout met de temp order, neem contact op met onze administratie.');
                $this->redirectWithNotifications('/index.php?controller=order&step=4');
            }


            $payment  = OrderPayment::getByOrderReference($existingTempOrder['reference']);
            $customer = new Customer($existingTempOrder['id_customer']);
            $paymentId = $payment[0]->transaction_id ?? null;

            if (!$paymentId) {
                $this->logger->logPaymentMessage('Return: No payment ID received', 'error');

                $this->context->cart = $cart;
                $this->context->cart->id_lang = $this->context->language->id;
                $this->context->cart->id_currency = $this->context->currency->id;
                $this->context->cart->id_customer = $this->context->customer->id;
                $this->context->cookie->id_cart = $cart->id;
                $this->context->customer = $cart->id_customer;
                $this->errors[] = $this->module->l('Er ging iets fout met de betalings id, neem contact op met onze administratie.');
                $this->redirectWithNotifications('/index.php?controller=order&step=4');
            }

            // Get API key based on mode
            $apiKey = Configuration::get('MSMOLLIE_LIVE_MODE', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
                ? Configuration::get('MSMOLLIE_LIVE_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
                : Configuration::get('MSMOLLIE_TEST_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);

            if (empty($apiKey)) {
                $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Er is geen api key', 'error');

                $this->context->cart = $cart;
                $this->context->cart->id_lang = $this->context->language->id;
                $this->context->cart->id_currency = $this->context->currency->id;
                $this->context->cart->id_customer = $this->context->customer->id;
                $this->context->cookie->id_cart = $cart->id;
                $this->context->customer = $cart->id_customer;
                $this->errors[] = $this->module->l('Er ging iets fout met de api sleutel, neem contact op met onze administratie.');
                $this->redirectWithNotifications('/index.php?controller=order&step=4');
            }


            $resetContextAndCookie = false;
            $currency = $this->context->currency;

            // Initialize Mollie client
            $mollie = new MollieApiClient();
            $mollie->setApiKey(trim($apiKey));
            $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Api Key is set '. $apiKey, 'info');
            // Add status recheck loop
            $maxAttempts = 10;
            $set = false;
            for ($i = 0; $i < $maxAttempts; $i++) {
                sleep(1); // Wait 1 second
                $paymentCheck = $mollie->payments->get(trim($paymentId));
                // Update order status based on Mollie status
                if($paymentCheck->status == 'paid') {
                    $set = true;
                    $newStatus = Configuration::get('MSMOLLIE_DEFAULT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
                    $this->logger->logPaymentMessage("Return | Payment completed for order {$existingTempOrder['id_order']}", 'info');

                    $this->removeTempOrderRecord($existingTempOrder['id_order']);
                    $this->updateOrderPaymentRecord($existingTempOrder['reference'], $paymentCheck, true);


                    // Create the order
                    $validate =  $this->module->validateOrder(
                        (int)$cart->id,
                        (int)$newStatus,
                        (float)$cart->getOrderTotal(),
                        $method,
                        null,
                        ['transaction_id' => $paymentCheck->id ?? null],
                        (int)$currency->id,
                        false,
                        $customer->secure_key,
                        $this->context->shop,
                        $existingTempOrder['reference'],
                        false
                    );

                    if(!$validate){
                        $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order is niet geldig', 'error');
                    }

                    $this->updateOrderPaymentRecord($existingTempOrder['reference'], $paymentCheck, false);


                    Tools::redirect('https://' . $this->context->shop->domain_ssl . '/order-bevestiging?id_cart=' . $cartId . '&id_module=' . $moduleId . '&id_order=' . $existingTempOrder['id_order'] . '&key=' . $secureKey);
                    break;
                }

                if($paymentCheck->status == 'canceled') {
                    $set = true;
                    /**
                     *
                     * Canceled so the cart is reinit and payment record is removed.
                     *
                     */

                    $this->logger->logPaymentMessage("Return | Payment canceled for order {$existingTempOrder['id_order']}", 'info');
                    $this->removeTempOrderRecord($existingTempOrder['id_order']);
                    $this->updateOrderPaymentRecord($existingTempOrder['reference'], $payment);

                    $this->errors[] = $this->module->l('Betaling geannuleerd, u kunt het nogmaals proberen.');


                    try {

                        $mollie->payments->delete(trim($paymentId));
                            $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Mollie payment record removed', 'error');
                    } catch (Exception $e) {
                            $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order is niet geldig'. $e->getMessage(), 'error');
                    }


                    $this->context->cart = $cart;
                    $this->context->cart->id_lang = $this->context->language->id;
                    $this->context->cart->id_currency = $this->context->currency->id;
                    $this->context->cart->id_customer = $this->context->customer->id;
                    $this->context->cookie->id_cart = $cart->id;
                    $this->context->customer = $customer;

                    $this->redirectWithNotifications('/index.php?controller=order&step=4');
                    break;
                }


                if($paymentCheck->status == 'failed') {
                    $set = true;
                    $this->removeTempOrderRecord($existingTempOrder['id_order']);
                    $this->updateOrderPaymentRecord($existingTempOrder['reference'], $payment);

                    // Create the order
                    $validate =  $this->module->validateOrder(
                        (int)$cart->id,
                        (int)Configuration::get('PS_OS_ERROR', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
                        (float)$cart->getOrderTotal(),
                        $method,
                        null,
                        ['transaction_id' => $paymentCheck->id ?? null],
                        (int)$currency->id,
                        false,
                        $customer->secure_key,
                        $this->context->shop,
                        $existingTempOrder['reference'],
                        false
                    );

                    if(!$validate){
                        $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order is niet geldig', 'error');
                    }

                    $emptyCart =  new Cart();

                    $this->context->cart = $emptyCart;
                    $this->context->cart->id_lang = $this->context->language->id;
                    $this->context->cart->id_currency = $this->context->currency->id;
                    $this->context->cart->id_customer = $this->context->customer->id;
                    $this->context->cookie->id_cart = null;
                    $this->context->customer = $customer;


                    $this->logger->logPaymentMessage("Return | Payment failed for order {$existingTempOrder['id_order']}", 'error');
                    $this->errors[] = $this->module->l('Betaal fout! <br/>Er is een probleem met de betaling van uw bestelling. Neem even contact met ons op, wij helpen u graag verder.');

                    $order = Order::getByCartId($cart->id);
                    $this->redirectWithNotifications('/index.php?controller=order-detail&id_order='.$order->id);

                    break;
                }

                if($paymentCheck->status == 'expired'){
                    $set = true;
                    $this->logger->logPaymentMessage("Return | Payment expired for order {$existingTempOrder['id_order']}", 'warning');
                    $this->removeTempOrderRecord($existingTempOrder['id_order']);
                    $this->updateOrderPaymentRecord($existingTempOrder['reference'], $payment);
                    $this->errors[] = $this->module->l('Betaling verlopen, u heeft te lang gewacht met het afronden van de betaling, hierdoor is uw sessie afgesloten. Wilt u verder gaan, kijk goed naar uw geselecteerde betaal optie en klik dan weer op afrekenen');

                    $this->context->cart = $cart;
                    $this->context->cart->id_lang = $this->context->language->id;
                    $this->context->cart->id_currency = $this->context->currency->id;
                    $this->context->cart->id_customer = $this->context->customer->id;
                    $this->context->cookie->id_cart = $cart->id;
                    $this->context->customer = $customer;

                    $this->redirectWithNotifications('/index.php?controller=order&step=4');
                    break;
                }


                if($paymentCheck->status == 'pending'){
                    $set = true;
                    $this->removeTempOrderRecord($existingTempOrder['id_order']);
                    $this->updateOrderPaymentRecord($existingTempOrder['reference'], $payment);
                    // Create the order
                    $validate =  $this->module->validateOrder(
                        (int)$cart->id,
                        (int)Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
                        (float)$cart->getOrderTotal(),
                        $method,
                        null,
                        ['transaction_id' => $paymentCheck->id ?? null],
                        (int)$currency->id,
                        false,
                        $customer->secure_key,
                        $this->context->shop,
                        $existingTempOrder['reference'],
                        false,
                    );

                    if(!$validate){
                        $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order is niet geldig', 'error');
                    }

                    $this->logger->logPaymentMessage("Payment pending for order {$existingTempOrder['id_order']}", 'info');
                }
            }


            if($maxAttempts == $i && !$set){
                // still status open. hopefully the webhook will provide support
                    $this->removeTempOrderRecord($existingTempOrder['id_order']);
                    $this->updateOrderPaymentRecord($existingTempOrder['reference'], $payment);

                    // Create the order
                    $validate =  $this->module->validateOrder(
                        (int)$cart->id,
                        (int)Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
                        (float)$cart->getOrderTotal(),
                        $method,
                        null,
                        ['transaction_id' => $paymentCheck->id ?? null],
                        (int)$currency->id,
                        false,
                        $customer->secure_key,
                        $this->context->shop,
                        $existingTempOrder['reference'],
                        false,
                    );

                    if(!$validate){
                        $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order is niet geldig', 'error');
                    }

                    $this->logger->logPaymentMessage("Payment pending for order {$existingTempOrder['id_order']}", 'info');

                   $this->info[] = $this->module->l('Uw betaling word momenteel verwerkt, dit kan tot 30 minuten duren. Als uw betaling is ontvangen krijgt u automatisch een bestelbevestiging. Heeft u verder nog vragen neem dan even contact met ons op, wij helpen u graag verder.');

                    $order = Order::getByCartId($cart->id);

                $this->redirectWithNotifications('/index.php?controller=order-detail&id_order='.$order->id);
            }


        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Return error: ' . $e->getMessage(), 'error');
            $this->errors[] = 'Payment Return error: ' . $e->getMessage();

            $this->redirectWithNotifications('index.php');
        }
    }


    /**
     * @param $id_order
     * @return void
     */
    private function removeTempOrderRecord($id_order){
        try {
            $sql = 'DELETE FROM ' . _DB_PREFIX_ . 'orders WHERE id_order = ' . (int)$id_order;
            Db::getInstance()->execute($sql);
        } catch (Exception $e) {
            $this->logger->logPaymentMessage('removeTempOrderRecord: ' . $e->getMessage(), 'error');
        }
        $this->logger->logPaymentMessage('removeTempOrderRecord: Removed temp record', 'info');
    }



    /**
     * @param $message
     * @param string $level
     * @return void
     */
    private function logPaymentMessage($message, string $level = 'info', $withEmail=true, $code=200): void
    {

        $langId = $this->context->language->id;
        $shopId = $this->context->shop->id;
        $shopGroupId = $this->context->shop->id;
        $cartId = $this->context->cart->id ?? 0;
        $customerEmail = $this->context->customer->email ?? '';
        $customerId = $this->context->customer->id ?? 0;

        $log_message_txt = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        $log_message_txt .= "│ " . strtoupper($level) . " [" . date('Y-m-d H:i:s') . "]\n";
        $log_message_txt .= "│ " . $message . "\n";
        $log_message_txt .= "├────────────────────────────────────────\n";
        $log_message_txt .= "│ Winkelwagen ID: " . $cartId . "\n";
        $log_message_txt .= "│ Klant ID: " . $customerId . "\n";
        $log_message_txt .= "│ Klant Email: " . $customerEmail . "\n";
        $log_message_txt .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";


        try {
            PrestaShopLogger::addLog($log_message_txt,
                $level === 'error' ? 1 : 3, // Convert text level to numeric
                $code,
                'Mollie',
                true,
                true);

            if($withEmail){
                $emailTo = Configuration::get('MSMOLLIE_EMAIL_TO', $langId, $shopId, $shopGroupId, 'jelmer@ijzershop.nl');

                if($level === 'error') {
                    $emailContent = [
                        '{level}' => $level,
                        '{message}' => $message,
                        '{date}' => date('Y-m-d H:i:s'),
                        '{cart_id}' => $cartId,
                        '{customer_id}' => $customerId,
                        '{customer_email}' => $customerEmail,
                        '{status_title}' => 'Foutmelding',
                        '{status_lower}' => 'foutmelding',
                        '{status_text}' => 'Er is een fout gedetecteerd in de Mollie betaal module.'];
                } else {
                    $emailContent = [
                        '{level}' => $level,
                        '{message}' => $message,
                        '{date}' => date('Y-m-d H:i:s'),
                        '{cart_id}' => $cartId,
                        '{customer_id}' => $customerId,
                        '{customer_email}' => $customerEmail,
                        '{status_title}' => 'Notificatie',
                        '{status_lower}' => 'gebeurtenis',
                        '{status_text}' => 'Er is een fout gedetecteerd in de Mollie betaal module.'];
                }


                Mail::send($this->context->language->id,
                    'notification_payment',
                    'Betaal '.ucwords($level),
                    $emailContent,
                    $emailTo,
                    'ICT - '. $this->context->shop->name,
                );
            }

        } catch (Exception $exception){
            PrestaShopLogger::addLog($exception->getMessage(),
                $level === 'error' ? 1 : 3, // Convert text level to numeric
                $exception->getCode());
        }
    }

    public function setCurrentState($id_order_state, $order)
    {
        if (empty($id_order_state) || (int)$id_order_state === (int)$order->current_state) {
            return false;
        }
        $history = new OrderHistory();
        $history->id_order = (int)$order->id;
        $history->id_employee = (int)0;
        $use_existings_payment = !$order->hasInvoice();
        $history->changeIdOrderState((int)$id_order_state, $order->id, $use_existings_payment);
    }

    /**
     * @param string|null $reference
     * @param $payment
     * @param $delete
     * @return void
     */
    private function updateOrderPaymentRecord(?string $reference, $payment, $delete = true)
    {
        try {
            $orderPayment = OrderPayment::getByOrderReference($reference);


            if($orderPayment){
                $orderPayment = new OrderPayment($orderPayment[0]->id ?? null);

                if($delete){
                    $orderPayment->delete();
                } else {
                    $orderPayment->card_number = $payment->details->cardNumber ?? '';
                    $orderPayment->card_holder = $payment->details->cardHolder ?? '';
                    $orderPayment->card_brand = $payment->details->cardLabel ?? '';
                    $orderPayment->save();
                }

                $this->logger->logPaymentMessage('updateOrderPaymentRecord: Record '. $payment->transaction_id . ' removed!', 'info');
            }


        } catch (Exception $e) {
            $this->logger->logPaymentMessage('updateOrderPaymentRecord: ' . $e->getMessage(), 'error');
        }
    }


}
