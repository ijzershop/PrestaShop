<?php

use Mollie\Api\MollieApiClient;

require_once(dirname(__FILE__).'/../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/classes/MollieLogger.php');

$context = Context::getContext();

// Get API key based on mode
$apiKey = Configuration::get('MSMOLLIE_LIVE_MODE', $context->language->id, $context->shop->id_shop_group, $context->shop->id)
    ? Configuration::get('MSMOLLIE_LIVE_API_KEY', $context->language->id, $context->shop->id_shop_group, $context->shop->id)
    : Configuration::get('MSMOLLIE_TEST_API_KEY', $context->language->id, $context->shop->id_shop_group, $context->shop->id);

if (empty($apiKey)) {
    $logger->logPaymentMessage('Ajax Controller: postProcess: Er is geen api key', 'error');
    $this->errors[] = $this->module->l('Mollie API key is not configured.');
    $this->redirectWithNotifications('index.php?controller=order&step=1');
    return;
}



if (Tools::getValue('ajax') == 1) {
    $logger = new MollieLogger();
    if (Tools::getValue('action') == 'createPaymentLink') {
        $email = Tools::getValue('email');
        $amount = Tools::getValue('amount');
        $type = Tools::getValue('type');
        $message = Tools::getValue('message');
        $transactionId = Tools::getValue('transaction');
        $orderId = Tools::getValue('orderId');
        $order = new Order($orderId);
        $customer = $order->getCustomer();
        // In a real implementation, this would be a call to Mollie's API
        $mollie = new MollieApiClient();

        try {
            $mollie->setApiKey(trim($apiKey));
            $logger->logPaymentMessage('Api Keys is set: ' . $apiKey, 'info', 200, true);
        } catch (\Mollie\Api\Exceptions\ApiException $e) {
            $logger->logPaymentMessage('Ajax Controller: postProcess: Mollie API key is not valid', 'error');
            $this->errors[] = $this->module->l('Mollie API key is not valid.');
            $this->redirectWithNotifications('index.php?controller=order&step=1');
            return;
        }

        try {
            if ($type === 'payment') {
                $payment = $mollie->payments->create([
                    'amount' => [
                        'currency' => 'EUR',
                        'value' => number_format($amount, 2, '.', '')
                    ],
                    'description' => 'Extra betaling voor bestelling ' . $order->reference,
                    'redirectUrl' => null,
                    'webhookUrl' => $context->link->getModuleLink('msmollie', 'webhook', [
                        'cart_id' => $order->id_cart,
                        'module_id' => Module::getModuleIdByName('msmollie'),
                        'order_id' => $order->id,
                        'method' => null,
                        'secure_key' => $customer->secure_key,
                    ], true),
                    'metadata' => [
                        'order_id' => $orderId,
                        'cart_id' => null
                    ]
                ]);

                $template_vars = [
                    '{payment_link}' => $payment->getCheckoutUrl(),
                    '{message}' => $message,
                    '{amount}' => number_format($amount, 2, ',', '.'),
                ];

                Mail::Send(
                    (int)Configuration::get('PS_LANG_DEFAULT'),
                    'payment_request',
                    'Payment Request',
                    $template_vars,
                    $email,
                );

                die(json_encode([
                    'success' => true,
                    'message' => 'Payment link created and sent successfully'
                ]));
            } else {

                $payment = $mollie->payments->get($transactionId);
                $refund = $payment->refund([
                    'amount' => [
                        'currency' => 'EUR',
                        'value' => number_format($amount, 2, '.', '')
                    ],
                    'description' => 'Refund for order #' . $orderId
                ]);

                $currency = $context->currency;
                $paymentMod = new OrderPayment();
                $paymentMod->order_reference = $order->reference;
                $paymentMod->amount = $amount;
                $paymentMod->id_currency = $currency->id;
                $paymentMod->payment_method = 'refund';
                $paymentMod->transaction_id = $payment->id;

                if(!$paymentMod->save()) {
                    $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order payment is niet geldig of kan niet opgeslagen worden', 'error');
                }

                $template_vars = [
                    '{refund_amount}' => number_format($amount, 2, ',', '.'),
                    '{message}' => $message,
                    '{order_name}' => $orderId
                ];

                Mail::Send(
                    (int)Configuration::get('PS_LANG_DEFAULT'),
                    'refund',
                    'Refund Confirmation',
                    $template_vars,
                    $email
                );

                die(json_encode([
                    'success' => true,
                    'message' => 'Refund processed successfully'
                ]));
            }
        } catch (Exception $e) {
            die(json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]));
        }
    }
    }




