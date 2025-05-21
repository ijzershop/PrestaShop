<?php

require_once(dirname(__FILE__).'/../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/classes/MollieLogger.php');
use Mollie\Api\MollieApiClient;

/**
 *
 */
class MSMollieWebhookModuleFrontController extends ModuleFrontController {


    private $logger;

    public function __construct()
    {
        $this->logger = new MollieLogger();
        $this->module = Module::getInstanceByName('msmollie');
        $this->context = Context::getContext();
        parent::__construct();
    }



    public function postProcess(): void
    {
        try {
            // Get payment ID from POST data
            $paymentId = Tools::getValue('id');
            if (!$paymentId) {
                $this->logger->logPaymentMessage('Webhook: No payment ID received', 'error');
                die();
            }

            // Get API key based on mode
            $apiKey = Configuration::get('MSMOLLIE_LIVE_MODE', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
                ? Configuration::get('MSMOLLIE_LIVE_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
                : Configuration::get('MSMOLLIE_TEST_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);

            if (empty($apiKey)) {
                $this->logger->logPaymentMessage('MSMollieValidationModuleFrontController: postProcess: Er is geen api key', 'error');
                return;
            }

            // Initialize Mollie client
            $mollie = new MollieApiClient();
            $mollie->setApiKey($apiKey);
            $payment = $mollie->payments->get($paymentId);

            // Get order by transaction_id
            $sql = new DbQuery();
            $sql->select('order_reference')
                ->from('order_payment')
                ->where('transaction_id = "'.pSQL($paymentId).'"');

            $orderId = Db::getInstance()->getValue($sql);
            $order = Order::getByReference($orderId);
            // Update order status based on Mollie status
            switch ($payment->status) {
                case 'paid':
                    $newStatus = Configuration::get('MSMOLLIE_DEFAULT_STATUS',  $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
                    $order->setCurrentState($newStatus);
                    $this->logger->logPaymentMessage("Webhook | Payment completed for order {$orderId}", 'info');
                    break;

                case 'failed':
                    $order->setCurrentState(Configuration::get('PS_OS_ERROR',  $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id));
                    $this->logger->logPaymentMessage("Webhook | Payment failed for order {$orderId}", 'error');
                    break;

                case 'expired':
                    $order->setCurrentState(Configuration::get('PS_OS_CANCELED',  $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id));
                    $this->logger->logPaymentMessage("Webhook | Payment expired for order {$orderId}", 'warning');
                    break;

                case 'canceled':
                    $order->setCurrentState(Configuration::get('PS_OS_CANCELED',  $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id));
                    $this->logger->logPaymentMessage("Webhook | Payment canceled for order {$orderId}", 'info');
                    break;

                case 'pending':
                    $order->setCurrentState(Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS',  $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id));
                    $this->logger->logPaymentMessage("Payment pending for order {$orderId}", 'info');
                    break;
            }

            http_response_code(200);
            die();

        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Webhook error: ' . $e->getMessage(), 'error');
            http_response_code(500);
            die();
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
