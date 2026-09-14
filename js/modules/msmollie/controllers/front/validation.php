<?php

require_once(dirname(__FILE__).'/../../../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/vendor/autoload.php');
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
            // Save cart state before payment initiation
            $this->context->cookie->__set('mollie_cart_id', $cart->id);
            $this->context->cookie->__set('mollie_cart_secure_key', $cart->secure_key);
            $this->context->cookie->write();

            $pendingReference = $this->generatePendingReference($cart->id);
            $payment = $this->createMolliePayment($apiKey, $paymentMethod, $total, $currency->iso_code, $cart, $pendingReference);

            $orderPayment = new OrderPayment();
            $orderPayment->order_reference = $pendingReference;
            $orderPayment->amount = $total;
            $orderPayment->id_currency = $currency->id;
            $orderPayment->payment_method = $paymentMethod;
            $orderPayment->transaction_id = $payment->id;
            if (!$orderPayment->save()) {
                $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Order payment is niet geldig of kan niet opgeslagen worden', 'error');
            }

            Tools::redirect($payment->getCheckoutUrl());
        } catch (Exception $e) {
            $this->errors[] = $this->module->l('An error occurred during the payment process:') . $e->getMessage();
            $this->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Error tijdens het betaal process: '. $e->getMessage(), 'error');
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
    private function createMolliePayment(string $apiKey, string $method, float $amount, string $currency, $cart, string $pendingReference): Payment|null
    {
        if(!$cart || !$cart->id) {
            return null;
        }

        // In a real implementation, this would be a call to Mollie's API
        $mollie = new MollieApiClient();
        $mollie->setApiKey(trim($apiKey));
        $this->logPaymentMessage('Mollie API client configured.', 'info', 200, true);

        // Get customer information
        $customer = new Customer($cart->id_customer);
        $cartId = (string) $cart->id;
        $firstInitial = !empty($customer->firstname) ? strtoupper(substr($customer->firstname, 0, 1)).'.' : '';
        $orderReference = $firstInitial . $customer->lastname . ' | ' . $method . ' | ' . Context::getContext()->shop_name;

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
                'method' => $method,
                'secure_key' => $customer->secure_key,
                'mollie_cart_id' => $this->context->cookie->mollie_cart_id,
                'mollie_cart_secure_key' => $this->context->cookie->mollie_cart_secure_key
            ], false),
            "cancelUrl" => $this->context->link->getModuleLink('msmollie', 'return', [
                'cart_id' => $cartId,
                'module_id' => $this->module->id,
                'method' => $method,
                'secure_key' => $customer->secure_key,
                'mollie_cart_id' => $this->context->cookie->mollie_cart_id,
                'mollie_cart_secure_key' => $this->context->cookie->mollie_cart_secure_key
            ], false),
            "webhookUrl"  => $this->context->link->getModuleLink('msmollie', 'webhook', [
                'cart_id' => $cartId,
                'module_id' => $this->module->id,
                'method' => $method,
                'secure_key' => $customer->secure_key,
            ], true),
            "method" => $method,
            "metadata" => [
                "cartId" => $cartId,
                "cart_id" => $cartId,
                "customerId" => $cart->id_customer,
                "reference" => trim($orderReference),
                "pending_reference" => $pendingReference,
            ],
            "locale" => $this->context->language->iso_code . "_" . strtoupper($this->context->country->iso_code),
            "billingEmail" => $customer->email,
        ];


        try {
            // $mollie->enableDebugging();
            $payment = $mollie->payments->create($paymentParams);
            $this->logPaymentMessage('Mollie betaling succesvol aangemaakt: ' . $payment->id, 'info', 200, true);
            return $payment;
        } catch (ApiException $e) {
            $this->logPaymentMessage('Mollie API fout: ' . $e->getMessage(), 'error', 500, true);
            $this->errors[] = $e->getMessage() . '<br/>'. print_r($paymentParams, true);
            $this->redirectWithNotifications('index.php?controller=order&step=1');
        }
    }

    private function generatePendingReference(int $cartId): string
    {
        $suffix = function_exists('random_bytes')
            ? bin2hex(random_bytes(4))
            : str_replace('.', '', uniqid('', true));

        return 'msmollie_cart_' . $cartId . '_' . $suffix;
    }

    private function logPaymentMessage($message, string $level = 'info', $withEmail = true, $code = 200): void
    {
        $this->logger->logPaymentMessage($message, $level, $withEmail, $code);
    }
}
