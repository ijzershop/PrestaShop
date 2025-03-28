<?php

use Mollie\Api\MollieApiClient;

require_once(dirname(__FILE__).'/../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');


// Get API key based on mode
$apiKey = Configuration::get('MSMOLLIE_LIVE_MODE', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
    ? Configuration::get('MSMOLLIE_LIVE_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
    : Configuration::get('MSMOLLIE_TEST_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);

if (empty($apiKey)) {
    $this->logPaymentMessage('Ajax Controller: postProcess: Er is geen api key', 'error');
    $this->errors[] = $this->module->l('Mollie API key is not configured.');
    $this->redirectWithNotifications('index.php?controller=order&step=1');
    return;
}



if (Tools::getValue('ajax') == 1) {
    if (Tools::getValue('action') == 'createPaymentLink') {
        $email = Tools::getValue('email');
        $amount = Tools::getValue('amount');
        $type = Tools::getValue('type');
        $message = Tools::getValue('message');
        $transactionId = Tools::getValue('transaction');
        $orderId = Tools::getValue('orderId');


// In a real implementation, this would be a call to Mollie's API
        $mollie = new MollieApiClient();
        try {
            $mollie->setApiKey(trim($apiKey));
            $this->logPaymentMessage('Api Keys is set: ' . $apiKey, 'info', 200, true);
        } catch (\Mollie\Api\Exceptions\ApiException $e) {
            $this->logPaymentMessage('Ajax Controller: postProcess: Mollie API key is not valid', 'error');
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
                    'description' => 'Additional payment for order #' . $orderId,
                    'redirectUrl' => $module->getReturnUrl(),
                    'webhookUrl' => $module->getWebhookUrl(),
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
                    null,
                    null,
                    null,
                    null,
                    null,
                    dirname(__FILE__) . '/mails/'
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

                $template_vars = [
                    '{refund_amount}' => number_format($amount, 2, ',', '.'),
                    '{message}' => $message,
                    '{order_reference}' => $orderId
                ];

                Mail::Send(
                    (int)Configuration::get('PS_LANG_DEFAULT'),
                    'refund_confirmation',
                    'Refund Confirmation',
                    $template_vars,
                    $email,
                    null,
                    null,
                    null,
                    null,
                    null,
                    dirname(__FILE__) . '/mails/'
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
