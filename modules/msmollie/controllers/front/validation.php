<?php

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

        // Check that this payment option is still available
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

        // Get the configured order status
        $orderStatus = Configuration::get('MSMOLLIE_DEFAULT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
        if (!$orderStatus) {
            $orderStatus = Configuration::get('PS_OS_PAYMENT', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
        }

        try {
            // Simulate API call to Mollie
           $payment = $this->createMolliePayment($apiKey, $paymentMethod, $total, $currency->iso_code);

            // Create the order
           $validate =  $this->module->validateOrder(
                    (int)$cart->id,
                    (int)$orderStatus,
                    $total,
                    $this->module->l('Mollie') . '|' . $paymentMethod . '',
                    null,
                    ['transaction_id' => $payment->id ?? null],
                    (int)$currency->id,
                    false,
                    $customer->secure_key
                );

            if(!$validate){
                $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order is niet geldig', 'error');

            }


            // Redirect to order confirmation page
            Tools::redirect('index.php?controller=order-confirmation&id_cart=' . $cart->id . '&id_module=' . $this->module->id . '&id_order=' . $this->module->currentOrder . '&key=' . $customer->secure_key);
        } catch (Exception $e) {
            $this->errors[] = $this->module->l('An error occurred during the payment process: ') . $e->getMessage();
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Error tijdens het betaal process', 'error');
            $this->redirectWithNotifications('index.php?controller=order&step=1');
        }
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
    private function createMolliePayment(string $apiKey, string $method, float $amount, $currency): Payment|null
    {
        // In a real implementation, this would be a call to Mollie's API
        $mollie = new MollieApiClient();
        $mollie->setApiKey($apiKey);

        // Get customer information
        $customer = new Customer($this->context->cart->id_customer);
        $customerId = (string) $customer->id;
        $cartId = (string) $this->context->cart->id;
        // Generate a unique order reference
        $firstInitial = !empty($customer->firstname) ? strtoupper(substr($customer->firstname, 0, 1)).'.' : '';
        $orderReference = Context::getContext()->shop_name . '|' . $firstInitial . $customer->lastname . '|' . $method . '|' . $this->context->cart->id;

        $this->logPaymentMessage('Start Mollie betaling voor order: ' . $cartId, 'info', 200, true);


            $paymentParams = [
                "amount" => [
                    "currency" => $currency,
                    "value" => number_format($amount, 2, '.', '')
                ],
                "description" => $orderReference,
                "redirectUrl" => $this->context->link->getModuleLink(
                    'msmollie',
                    'return',
                    [
                        'cart_id' => $cartId,
                        'secure_key' => $this->context->customer->secure_key
                    ],
                    true
                ),
                "webhookUrl"  => $this->context->link->getModuleLink('msmollie', 'webhook', [], true),
                "method" => $method,
                "metadata" => [
                    "cartId" => $cartId,
                    "customerId" => $customerId,
                    "reference" => $orderReference,
                ],
                "locale" => $this->context->language->iso_code . "_" . strtoupper($this->context->country->iso_code),
                "billingEmail" => $customer->email,
            ];

            dd($paymentParams);
        try {
            $mollie->enableDebugging();
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
                $level,
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
                'error',
                $exception->getCode());
        }


    }
}
