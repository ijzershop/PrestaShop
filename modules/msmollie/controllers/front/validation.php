<?php

require_once(dirname(__FILE__).'/../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/classes/MollieLogger.php');
use Mollie\Api\Exceptions\ApiException;
use Mollie\Api\MollieApiClient;
use Mollie\Api\Resources\Payment;

/**
 * 2023 ModerneSmid
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 *
 * @author    ModerneSmid <info@modernesmid.nl>
 * @copyright 2023 ModerneSmid
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 **/

class MSMollieValidationModuleFrontController extends ModuleFrontController
{


    private $logger;
    public $context;
    public $module;

    public function __construct()
    {
        $this->logger = new MollieLogger();
        $this->module = Module::getInstanceByName('msmollie');
        $this->context = Context::getContext();
    }

    /**
     * @throws Exception
     */
    public function postProcess()
    {
        if (!($this->module instanceof MSMollie)) {
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Module is geen instance van MSMollie', 'error');
            Tools::redirect('index.php?controller=order&step=1');
            return;
        }

        $cart = $this->context->cart;

        if ($cart->id_customer == 0 || $cart->id_address_delivery == 0 || $cart->id_address_invoice == 0 || !$this->module->active) {
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Winkelwagen id is onjuist', 'error');
            Tools::redirect('index.php?controller=order&step=1');
            return;
        }

        $authorized = false;
        foreach (Module::getPaymentModules() as $module) {
            if ($module['name'] == 'msmollie') {
                $authorized = true;
                break;
            }
        }

        if (!$authorized) {
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Betaalmethode is niet geautoriseerd', 'error');
            die($this->module->l('This payment method is not available.'));
        }

        $customer = new Customer($cart->id_customer);
        if (!Validate::isLoadedObject($customer)) {
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Klant object is onjuist', 'error');
            Tools::redirect('index.php?controller=order&step=1');
            return;
        }

        $currency = $this->context->currency;
        $total = (float)$cart->getOrderTotal();
        $paymentMethod = Tools::getValue('method', 'ideal');

        // Get API key based on mode
        $apiKey = Configuration::get('MSMOLLIE_LIVE_MODE', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
            ? Configuration::get('MSMOLLIE_LIVE_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
            : Configuration::get('MSMOLLIE_TEST_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);

        if (empty($apiKey)) {
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Er is geen api key', 'error');
            $this->errors[] = $this->module->l('Mollie API key is not configured.');
            $this->redirectWithNotifications('index.php?controller=order&step=1');
            return;
        }

        try {
            $order = $this->generateTempOrderRule($cart->id,
                $cart->id_customer,
                $paymentMethod,
                $total,
                $cart->id_carrier,
                (int)Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id),
                $this->context->language->id,
                $currency->id);

            // Save cart state before payment initiation
            $this->context->cookie->__set('mollie_cart_id', $cart->id);
            $this->context->cookie->__set('mollie_cart_secure_key', $cart->secure_key);
            $this->context->cookie->write();

            $payment = $this->createMolliePayment($apiKey, $paymentMethod, $total, $currency->iso_code, $order);

            $orderPayment = OrderPayment::getByOrderReference($order['reference']);
            if(empty($orderPayment)){
                $orderPayment = new OrderPayment();
                $orderPayment->order_reference = $order['reference'];
                $orderPayment->amount = $total;
                $orderPayment->id_currency = $currency->id;
                $orderPayment->payment_method = $paymentMethod;
                $orderPayment->transaction_id = $payment->id;
                if(!$orderPayment->save()) {
                    $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order payment is niet geldig of kan niet opgeslagen worden', 'error');
                }
//                $orderPayment->associateTo($this->context->shop->id);
            }

            Tools::redirect($payment->getCheckoutUrl());
        } catch (Exception $e) {
            $this->errors[] = $this->module->l('An error occurred during the payment process:') . $e->getMessage();
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Error tijdens het betaal process: '. $e->getMessage(), 'error');
            $this->redirectWithNotifications('index.php?controller=order&step=1');
        }
    }

    /**
     * @param $id_cart
     * @param $id_customer
     * @return array|bool|object $tempOrder
     * @throws PrestaShopException
     */
    private function generateTempOrderRule($id_cart, $id_customer, $paymentMethod, $total, $carrier, $status, $id_lang, $id_currency): array|bool|object
    {
        $existingTempOrder = Db::getInstance()->getRow('
        SELECT * FROM '._DB_PREFIX_.'orders
        WHERE id_cart = '.(int)$id_cart
        );
        $customer = new Customer($id_customer);

        if(!$existingTempOrder || $existingTempOrder['id_customer'] != $id_customer){
            $reference = Order::generateReference();
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Geen order, we maken eentje vooraf', 'info');

            $result = Db::getInstance()->insert('orders', [
                'id_cart' => (int)$id_cart,
                'id_customer' => (int)$id_customer,
                'module' => 'msmollie',
                'gift_message' => '',
                'note' => '',
                'desired_delivery_date' => '',
                'shipping_number' => '',
                'added_to_order' => '',
                'reference' => pSQL($reference),
                'id_lang' => pSQL($id_lang),
                'id_currency' => pSQL($id_currency),
                'total_paid' => pSQL($total),
                'id_carrier' => pSQL($carrier),
                'current_state' => pSQL($status),
                'valid' => 0,
                'payment' => pSQL($paymentMethod),
                'secure_key' => $customer->secure_key,
                'date_add' => date('Y-m-d H:i:s'),
                'date_upd' => date('Y-m-d H:i:s')
            ]);

            if($result){
               $existingTempOrder = Db::getInstance()->getRow('
                SELECT * FROM '._DB_PREFIX_.'orders
                WHERE id_cart = '.(int)$id_cart
               );
           }

        }

        $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order bestaat, we gebruiken de bestaande', 'info');

        if($existingTempOrder['payment'] != $paymentMethod){
            Db::getInstance()->update('orders',
                ['payment' => pSQL($paymentMethod)],
                'id_cart = '.(int)$id_cart
            );
        }

        return $existingTempOrder;
    }


    /**
     * Create a Mollie payment (in a real module, this would be an actual API call)
     *
     * @param string $apiKey The Mollie API key
     * @param string $method The payment method (ideal, creditcard, etc.)
     * @param float $amount The payment amount
     * @param string $currency The currency code (EUR, USD, etc.)
     *
     * @return Payment|null payment response
     * @throws ApiException
     */
    private function createMolliePayment(string $apiKey, string $method, float $amount, string $currency, $order): Payment|null
    {
        if(!$order || !$order['id_order']) {
            return null;
        }

        // In a real implementation, this would be a call to Mollie's API
        $mollie = new MollieApiClient();
        $mollie->setApiKey(trim($apiKey));
        $this->logPaymentMessage('Api Keys is set: ' . $apiKey, 'info', 200, true);

        // Get customer information
        $customer = new Customer($order['id_customer']);
        $cartId = (string) $order['id_cart'];
        // Generate a unique order reference
        $firstInitial = !empty($customer->firstname) ? strtoupper(substr($customer->firstname, 0, 1)).'.' : '';
        $orderReference = $order['reference'] . '|' . $firstInitial . $customer->lastname . '|' . $method . '|' . Context::getContext()->shop_name;

        $this->logPaymentMessage('Start Mollie betaling voor order: ' . $cartId, 'info', 200, true);

        $paymentParams = [
            "amount" => [
                "currency" => $currency,
                "value" => number_format($amount, 2, '.', '')
            ],
            "description" => $orderReference,
            "redirectUrl" => $this->context->link->getModuleLink('msmollie', 'return', [
                'cart_id' => $cartId,
                'module_id' => $this->module->id,
                'order_id' => $order['id_order'],
                'method' => $method,
                'secure_key' => $customer->secure_key,
                'mollie_cart_id' => $this->context->cookie->mollie_cart_id,
                'mollie_cart_secure_key' => $this->context->cookie->mollie_cart_secure_key
                ], true),
            "cancelUrl" => $this->context->link->getModuleLink('msmollie', 'return', [
                'cart_id' => $cartId,
                'module_id' => $this->module->id,
                'order_id' => $order['id_order'],
                'method' => $method,
                'secure_key' => $customer->secure_key,
                'mollie_cart_id' => $this->context->cookie->mollie_cart_id,
                'mollie_cart_secure_key' => $this->context->cookie->mollie_cart_secure_key
                ], true),
            "webhookUrl"  => $this->context->link->getModuleLink('msmollie', 'webhook', [
                'cart_id' => $cartId,
                'module_id' => $this->module->id,
                'order_id' => $order['id_order'],
                'method' => $method,
                'secure_key' => $customer->secure_key,
            ], true),
            "method" => $method,
            "metadata" => [
                "cartId" => $cartId,
                "customerId" => $order['id_customer'],
                "reference" => $orderReference,
            ],
            "locale" => $this->context->language->iso_code . "_" . strtoupper($this->context->country->iso_code),
            "billingEmail" => $customer->email,
        ];
        try {
//            $debug = $mollie->enableDebugging();
            $payment = $mollie->payments->create($paymentParams);
            $this->logPaymentMessage('Mollie betaling succesvol aangemaakt: ' . $payment->id, 'info', 200, true);
            return $payment;
        } catch (ApiException $e) {
            $this->logPaymentMessage('Mollie API fout: ' . $e->getMessage(), 'error', 500, true);
            $this->errors[] = $e->getMessage() . '<br/>'. print_r($paymentParams, true);
            $this->redirectWithNotifications('index.php?controller=order&step=1');
        }
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
}
