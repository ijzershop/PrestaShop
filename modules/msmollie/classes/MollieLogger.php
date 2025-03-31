<?php

class MollieLogger
{
    private $context;

    public function __construct()
    {
        $this->context = Context::getContext();
    }

    /**
     * @param $message
     * @param string $level
     * @param bool $withEmail
     * @param int $code
     * @return void
     */
    public function logPaymentMessage($message, string $level = 'info', bool $withEmail = true, int $code = 200): void
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
                $level === 'error' ? 1 : 3,
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
                        '{status_text}' => 'Er is een fout gedetecteerd in de Mollie betaal module.'
                    ];
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
                        '{status_text}' => 'Er is een fout gedetecteerd in de Mollie betaal module.'
                    ];
                }

                Mail::send($this->context->language->id,
                    'notification_payment',
                    'Betaal '.ucwords($level),
                    $emailContent,
                    $emailTo,
                    'ICT - '. $this->context->shop->name
                );
            }

        } catch (Exception $exception){
            PrestaShopLogger::addLog($exception->getMessage(),
                $level === 'error' ? 1 : 3,
                $exception->getCode());
        }
    }
}
