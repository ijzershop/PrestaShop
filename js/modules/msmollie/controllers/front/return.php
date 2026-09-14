<?php

require_once(dirname(__FILE__).'/../../../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/vendor/autoload.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/classes/MollieLogger.php');
use Mollie\Api\MollieApiClient;

/**
 * MSMollie Return Controller
 * Handles payment returns from Mollie - FALLBACK ONLY
 * Primary order creation should happen in webhook
 */
class MSMollieReturnModuleFrontController extends ModuleFrontController
{
    private $logger;
    private $mollie;
    private $cart;
    private $customer;
    private $paymentId;

    public function __construct()
    {
        parent::__construct();

        $this->logger = new MollieLogger();
        $this->module = Module::getInstanceByName('msmollie');
        $this->context = Context::getContext();
    }

    public function initContent()
    {
        parent::initContent();
        $this->logger->logPaymentMessage('Return Controller: initContent aangeroepen', 'info');
        $this->postProcess();
    }

    /**
     * Main processing method - FALLBACK LOGIC
     */
    public function postProcess(): void
    {
        try {
            // Initialize and validate request
            if (!$this->initializeRequest()) {
                return;
            }

            // Initialize Mollie client
            if (!$this->initializeMollieClient()) {
                return;
            }

            // Check if order already exists (webhook should have created it)
            // Wait briefly for webhook to complete before fallback.
            $existingOrder = $this->waitForOrderByCartId((int)$this->cart->id);

            if ($existingOrder) {
                // Order exists - webhook did its job, just redirect appropriately
                $this->handleExistingOrder($existingOrder);
            } else {
                // Order doesn't exist after waiting - decide whether to show error or fallback
                if ($this->handleNoOrderAfterWait()) {
                    return;
                }
                // Webhook failed or didn't run yet, act as fallback
                $this->handleFallbackOrderCreation();
            }

        } catch (Exception $e) {
            $this->handleException($e);
        }
    }

    /**
     * Initialize and validate the incoming request
     */
    private function initializeRequest(): bool
    {
        $cartId = Tools::getValue('cart_id');
        $moduleId = Tools::getValue('module_id');
        $secureKey = Tools::getValue('secure_key');
        $method = Tools::getValue('method');

        if (!$cartId || !$moduleId || !$secureKey) {
            $this->logger->logPaymentMessage('Return: Er ontbreken vereiste parameters', 'error');
            $this->redirectToOrderStep4('Er ontbreken vereiste parameters.');
            return false;
        }

        $this->cart = new Cart($cartId);
        if (!Validate::isLoadedObject($this->cart)) {
            $this->logger->logPaymentMessage('Return: Ongeldig winkelwagen id ' . $cartId, 'error');
            $this->redirectToOrderStep4('Ongeldige winkelwagen.');
            return false;
        }

        $this->customer = new Customer($this->cart->id_customer);
        if (!Validate::isLoadedObject($this->customer)) {
            $this->logger->logPaymentMessage('Return: Onjuist klant object voor winkelwagen met id ' . $cartId, 'error');
            $this->redirectToOrderStep4('Ongeldige klant.');
            return false;
        }

        // Get payment ID
        $this->paymentId = $this->getPaymentIdForCart($cartId);

        if (!$this->paymentId) {
            $this->logger->logPaymentMessage('Return: Geen betaal id gevonden voor winkelwagen met id ' . $cartId, 'error');
            $this->redirectToOrderStep4('Geen betalings-ID gevonden.');
            return false;
        }

        return true;
    }

    /**
     * Initialize Mollie API client
     */
    private function initializeMollieClient(): bool
    {
        $apiKey = Configuration::get('MSMOLLIE_LIVE_MODE', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
            ? Configuration::get('MSMOLLIE_LIVE_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id)
            : Configuration::get('MSMOLLIE_TEST_API_KEY', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);

        if (empty($apiKey)) {
            $this->logger->logPaymentMessage('Return: Geen api sleutel geconfigureerd', 'error');
            $this->redirectToOrderStep4('API-sleutel niet geconfigureerd.');
            return false;
        }

        try {
            $this->mollie = new MollieApiClient();
            $this->mollie->setApiKey(trim($apiKey));
            $this->logger->logPaymentMessage('Return: Mollie client geinitialisseerd', 'info');
            return true;
        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Return: initialisseren van Mollie client mislukt met volgende error: ' . $e->getMessage(), 'error');
            $this->redirectToOrderStep4('Kan geen verbinding maken met betalingsprovider.');
            return false;
        }
    }

    /**
     * Handle existing order - webhook already processed it
     */
    private function handleExistingOrder($order): void
    {
        $this->logger->logPaymentMessage("Return: Bestelling bestaat al (referentie: {$order->reference}), webhook heeft zijn werk gedaan", 'info');

        try {
            $payment = $this->mollie->payments->get(trim($this->paymentId));

            switch ($payment->status) {
                case 'paid':
                    $this->logger->logPaymentMessage("Return: Betaling succesvol, doorsturen naar bevestigingspagina voor bestelling {$order->reference}", 'info');
                    $this->redirectToConfirmation($order);
                    break;

                case 'pending':
                    $this->logger->logPaymentMessage("Return: Betaling nog in behandeling voor bestelling {$order->reference}", 'info');
                    $this->redirectToOrderDetail($order->id, 'Uw betaling wordt momenteel verwerkt. Dit kan tot 30 minuten duren.', 'info');
                    break;

                case 'failed':
                case 'expired':
                case 'canceled':
                    $this->logger->logPaymentMessage("Return: Betaling {$payment->status} voor bestelling {$order->reference}", 'info');
                    $this->restoreCartContext();
                    $this->redirectToOrderStep4('Betaling ' . $payment->status . '. U kunt het nogmaals proberen.');
                    break;

                default:
                    $this->logger->logPaymentMessage("Return: Onbekende betaal status {$payment->status} voor bestelling {$order->reference}", 'warning');
                    $this->redirectToOrderDetail($order->id, 'Uw bestelling wordt verwerkt. U ontvangt binnenkort een bevestiging.', 'info');
                    break;
            }

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Return: Fout bij ophalen payment status voor bestaande bestelling: " . $e->getMessage(), 'error');
            // Fallback to order detail page
            $this->redirectToOrderDetail($order->id, 'Uw bestelling wordt verwerkt. U ontvangt binnenkort een bevestiging.', 'info');
        }
    }

    /**
     * Handle fallback order creation when webhook failed
     */
    private function handleFallbackOrderCreation(): void
    {
        $this->logger->logPaymentMessage("Return: Geen bestaande bestelling gevonden, webhook heeft gefaald - fallback activeren", 'warning');

        // Process payment with retry logic as fallback
        $this->processPaymentWithRetry();
    }

    /**
     * If no order exists after waiting, check payment status once.
     * Return true if a redirect was performed and processing should stop.
     */
    private function handleNoOrderAfterWait(): bool
    {
        try {
            $paymentCheck = $this->mollie->payments->get(trim($this->paymentId));
            $this->logger->logPaymentMessage("Return: Geen bestelling na wachten, betaal status: {$paymentCheck->status}", 'info');

            if ($paymentCheck->status === 'pending') {
                $this->redirectToOrderStep4('Uw betaling wordt nog verwerkt. Probeer het over een minuut opnieuw. Blijft het probleem bestaan, neem dan contact op.');
                return true;
            }
        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Return: Fout bij ophalen payment status na wachten: " . $e->getMessage(), 'warning');
        }

        return false;
    }

    /**
     * Process payment with retry logic - FALLBACK ONLY
     */
    private function processPaymentWithRetry(): void
    {
        $maxAttempts = 5; // Reduced attempts since this is fallback
        $processed = false;

        for ($i = 0; $i < $maxAttempts; $i++) {
            if ($i > 0) {
                sleep(2); // Wait 2 seconds between attempts
            }

            try {
                $paymentCheck = $this->mollie->payments->get(trim($this->paymentId));
                $this->logger->logPaymentMessage("Return Fallback: Betaal status opgevraagd bij mollie #{$i}: {$paymentCheck->status}", 'info');

                $processed = $this->processPaymentStatus($paymentCheck);
                if ($processed) {
                    break;
                }

            } catch (Exception $e) {
                $this->logger->logPaymentMessage("Return Fallback: Fout bij ophalen van betaal status bij mollie (poging {$i}): " . $e->getMessage(), 'error');
                if ($i === $maxAttempts - 1) {
                    throw $e; // Re-throw on final attempt
                }
            }
        }

        // Handle case where payment is still pending after max attempts
        if (!$processed) {
            $this->handlePendingPaymentFallback();
        }
    }

    /**
     * Process payment based on its status - FALLBACK ONLY
     */
    private function processPaymentStatus($payment): bool
    {
        switch ($payment->status) {
            case 'paid':
                return $this->handlePaidPaymentFallback($payment);

            case 'canceled':
                return $this->handleCanceledPaymentFallback($payment);

            case 'failed':
                return $this->handleFailedPaymentFallback($payment);

            case 'expired':
                return $this->handleExpiredPaymentFallback($payment);

            case 'pending':
                return $this->handlePendingPaymentFallback($payment);

            default:
                $this->logger->logPaymentMessage("Return Fallback: onbekende betaal status: {$payment->status}", 'warning');
                return false;
        }
    }

    /**
     * Handle paid payment - FALLBACK ORDER CREATION
     */
    private function handlePaidPaymentFallback($payment): bool
    {
        $this->logger->logPaymentMessage("Return Fallback: Status 'betaald' afhandelen voor winkelwagen met id {$this->cart->id}", 'info');

        // Create the final order as fallback
        $newStatus = Configuration::get('MSMOLLIE_DEFAULT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
        $validate = $this->createOrder($newStatus, $payment);

        if (!$validate) {
            $this->logger->logPaymentMessage("Return Fallback: Valideren van betaal status mislukt voor winkelwagen met id {$this->cart->id}", 'error');
            $this->redirectToOrderStep4('Fout bij het valideren van de bestelling.');
            return true;
        }

        $order = Order::getByCartId($this->cart->id);
        $this->logger->logPaymentMessage("Return Fallback: Bestelling aangemaakt als fallback met referentie {$order->reference}", 'info');

        // Update Mollie payment description
        $this->updateMolliePayment($payment->id, $this->createOrderReference($order, $payment), [
            'order_id' => $order->id,
            'order_reference' => $order->reference,
            'status' => 'completed',
            'completed_at' => date('Y-m-d H:i:s'),
            'created_by' => 'fallback'
        ]);

        // Update payment record with final details
        $this->updateOrderPaymentRecord($this->cart->id, $payment);

        // Redirect to confirmation page
        $order = Order::getByCartId($this->cart->id);
        if (Validate::isLoadedObject($order)) {
            $this->redirectToConfirmation($order);
        } else {
            $this->redirectToOrderStep4('Bestelling aangemaakt maar bevestiging is nog niet beschikbaar. Probeer het opnieuw.');
        }
        return true;
    }

    /**
     * Handle failed payment - NO ORDER CREATION
     */
    private function handleFailedPaymentFallback($payment): bool
    {
        $this->logger->logPaymentMessage("Return Fallback: Status 'mislukt' afhandelen voor winkelwagen met id {$this->cart->id}", 'error');

        // Update Mollie payment description
        $this->updateMolliePayment($payment->id, $this->createFailureReference($payment, 'Mislukt'), [
            'cart_id' => $this->cart->id,
            'status' => 'failed',
            'failed_at' => date('Y-m-d H:i:s'),
            'handled_by' => 'fallback'
        ]);

        // Clean up payment record
        $this->updateOrderPaymentRecord($this->cart->id, $payment);

        // Restore cart and redirect
        $this->restoreCartContext();
        $this->redirectToOrderStep4('Betaling mislukt. U kunt het nogmaals proberen.');
        return true;
    }

    /**
     * Handle pending payment - FALLBACK ORDER CREATION
     */
    private function handlePendingPaymentFallback($payment = null): bool
    {
        $this->logger->logPaymentMessage("Return Fallback: Status 'betaling in behandeling' afhandelen voor winkelwagen met id {$this->cart->id}", 'info');

        // Create order with waiting payment status as fallback
        $waitingStatus = Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
        $validate = $this->createOrder($waitingStatus, $payment);

        if (!$validate) {
            $this->logger->logPaymentMessage('Return Fallback: betaling status verifieren mislukt', 'error');
            $this->redirectToOrderStep4('Fout bij het valideren van de bestelling.');
            return true;
        }

        $order = Order::getByCartId($this->cart->id);


        $this->logger->logPaymentMessage("Return Fallback: Bestelling aangemaakt als fallback met wachtende status en referentie {$order->reference}", 'info');

        // Update Mollie payment description
        if ($payment) {
            $this->updateMolliePayment($payment->id, $this->createPendingReference($order, $payment), [
                'order_id' => $order->id,
                'order_reference' => $order->reference,
                'status' => 'pending',
                'pending_at' => date('Y-m-d H:i:s'),
                'created_by' => 'fallback'
            ]);
        }

        // Redirect to order details with info message
        $this->redirectToOrderDetail($order->id, 'Uw betaling wordt momenteel verwerkt. Dit kan tot 30 minuten duren. Mocht u daarna nog geen bericht van ons ontvangen hebben, neem dan even contact met ons op.', 'info');
        return true;
    }


    /**
     * Handle canceled payment - NO ORDER CREATION
     */
    private function handleCanceledPaymentFallback($payment): bool
    {
        $this->logger->logPaymentMessage("Return Fallback: Status 'geannuleerd' afhandelen voor winkelwagen met id {$this->cart->id}", 'info');

        // Update Mollie payment description
        $this->updateMolliePayment($payment->id, $this->createFailureReference($payment, 'Geannuleerd'), [
            'cart_id' => $this->cart->id,
            'status' => 'canceled',
            'canceled_at' => date('Y-m-d H:i:s'),
            'handled_by' => 'fallback'
        ]);

        // Clean up payment record
        $this->updateOrderPaymentRecord($this->cart->id, $payment);

        // Restore cart and redirect
        $this->restoreCartContext();
        $this->redirectToOrderStep4('Betaling geannuleerd. U kunt het nogmaals proberen.');
        return true;
    }


    /**
     * Handle expired payment - NO ORDER CREATION
     */
    private function handleExpiredPaymentFallback($payment): bool
    {
        $this->logger->logPaymentMessage("Return Fallback: Status 'verlopen' afhandelen voor winkelwagen met id {$this->cart->id}", 'warning');

        // Update Mollie payment description
        $this->updateMolliePayment($payment->id, $this->createFailureReference($payment, 'Verlopen'), [
            'cart_id' => $this->cart->id,
            'status' => 'expired',
            'expired_at' => date('Y-m-d H:i:s'),
            'handled_by' => 'fallback'
        ]);

        // Clean up payment record
        $this->updateOrderPaymentRecord($this->cart->id, $payment);

        // Restore cart and redirect
        $this->restoreCartContext();
        $this->redirectToOrderStep4('Betaling verlopen. U heeft te lang gewacht met het afronden van de betaling.');
        return true;
    }

    /**
     * Create order reference for successful payments
     */
    private function createOrderReference($order, $payment): string
    {
        $firstInitial = !empty($this->customer->firstname) ? strtoupper(substr($this->customer->firstname, 0, 1)).'.' : '';

        return $order->reference.'|'.
            $firstInitial.'|'.
            $this->customer->lastname . ' | ' .
            ($payment->method_title ?? $payment->method) . ' | ' .
            Context::getContext()->shop_name;
    }

    /**
     * Create order reference for pending payments
     */
    private function createPendingReference($order, $payment): string
    {
        $firstInitial = !empty($this->customer->firstname) ? strtoupper(substr($this->customer->firstname, 0, 1)).'.' : '';

        return $order->reference.'| Wachtend |'.
            $firstInitial.'|'.
            $this->customer->lastname . ' | ' .
            ($payment->method_title ?? $payment->method) . ' | ' .
            Context::getContext()->shop_name;
    }

    /**
     * Create reference for failed payments
     */
    private function createFailureReference($payment, $statusText): string
    {
        $firstInitial = !empty($this->customer->firstname) ? strtoupper(substr($this->customer->firstname, 0, 1)).'.' : '';

        return 'winkelwagen ' . $this->cart->id .' | ' . $statusText . ' |' . $firstInitial.' '.
            $this->customer->lastname . ' | ' .
            ($payment->method_title ?? $payment->method) . ' | ' .
            Context::getContext()->shop_name;
    }

    /**
     * Update Mollie payment description and metadata
     */
    private function updateMolliePayment($paymentId, $description = null, $metadata = []): bool
    {
        try {
            $updateData = [];

            if ($description) {
                $updateData['description'] = $description;
            }

            if (!empty($metadata)) {
                $updateData['metadata'] = $metadata;
            }

            if (empty($updateData)) {
                return false;
            }

            $this->mollie->payments->update($paymentId, $updateData);
            $this->logger->logPaymentMessage("Return Fallback: Mollie betaling met betaal id {$paymentId} is gewijzigd", 'info');
            return true;

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Return Fallback: Wijzigen van mollie betaling met id {$paymentId} is mislukt: " . $e->getMessage(), 'warning');
            return false;
        }
    }

    /**
     * Create PrestaShop order - FALLBACK ONLY
     */
    private function createOrder($statusId, $payment): bool
    {
        try {
            $method = ($payment ? ($payment->method ?? 'Mollie') : 'Mollie');
            $currency = $this->context->currency;

            $validate = $this->module->validateOrder(
                (int)$this->cart->id,
                (int)$statusId,
                (float)$this->cart->getOrderTotal(),
                $method,
                null,
                ['transaction_id' => ($payment ? $payment->id : $this->paymentId)],
                (int)$currency->id,
                false,
                $this->customer->secure_key,
                $this->context->shop
            );

            if ($validate) {
                $order = Order::getByCartId($this->cart->id);
                // Clean up the cart-based payment record
                $this->cleanupCartPaymentRecord();
                $this->logger->logPaymentMessage("Return Fallback: Bestelling aanmaken is gelukt en heeft referentie {$order->reference}", 'info');
            } else {
                $this->logger->logPaymentMessage("Return Fallback: Bestelling aanmaken is mislukt", 'error');
            }

            return $validate;

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Return Fallback: Bestelling aanmaken is mislukt: " . $e->getMessage(), 'error');
            return false;
        }
    }

    /**
     * Update order payment record
     */
    private function updateOrderPaymentRecord(?string $reference, $payment, $delete = true): void
    {
        try {
            if ($delete) {
                // For failed payments, delete any remaining cart-based records
                $referenceWhere = $this->buildReferenceWhereClause($reference);
                $sql = 'DELETE FROM `' . _DB_PREFIX_ . 'order_payment`
                        WHERE ' . $referenceWhere;

                $result = Db::getInstance()->execute($sql);

                if ($result) {
                    $this->logger->logPaymentMessage("Return Fallback: Betaal record met referentie {$reference} is verwijderd", 'info');
                } else {
                    $this->logger->logPaymentMessage("Return Fallback: Kon betaal record met referentie {$reference} niet verwijderen", 'warning');
                }
            } else {
                // For successful payments, update the order payment record with additional details
                $orderPayments = $this->getOrderPaymentsByReference($reference);

                if ($orderPayments && isset($orderPayments[0])) {
                    $orderPayment = $orderPayments[0];

                    // Update with payment details
                    if ($payment && isset($payment->details)) {
                        $orderPayment->card_number = $payment->details->cardNumber ?? '';
                        $orderPayment->card_holder = $payment->details->cardHolder ?? '';
                        $orderPayment->card_brand = $payment->details->cardLabel ?? '';
                    }
                    $orderPayment->save();
                    $this->logger->logPaymentMessage("Return Fallback: Betaal record met referentie {$reference} is gewijzigd", 'info');
                }
            }
        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Return Fallback: Wijzigen van betaal record is mislukt: ' . $e->getMessage(), 'error');
        }
    }

    /**
     * Restore cart context for retry
     */
    private function restoreCartContext(): void
    {
        $this->context->cart = $this->cart;
        $this->context->cart->id_lang = $this->context->language->id;
        $this->context->cart->id_currency = $this->context->currency->id;
        $this->context->cart->id_customer = $this->customer->id;
        $this->context->cookie->id_cart = $this->cart->id;
        $this->context->customer = $this->customer;
    }

    /**
     * Clear cart context after completion
     */
    private function clearCartContext(): void
    {
        $emptyCart = new Cart();
        $this->context->cart = $emptyCart;
        $this->context->cart->id_lang = $this->context->language->id;
        $this->context->cart->id_currency = $this->context->currency->id;
        $this->context->cart->id_customer = $this->customer->id;
        $this->context->cookie->id_cart = null;
        $this->context->customer = $this->customer;
    }

    /**
     * Redirect to order step 4 with error
     */
    private function redirectToOrderStep4($errorMessage): void
    {
        $this->restoreCartContext();
        $this->errors[] = $this->module->l($errorMessage);
        $this->redirectWithNotifications('/index.php?controller=order&step=4');
    }

    /**
     * Redirect to order confirmation
     */
    private function redirectToConfirmation($order): void
    {
        $cartId = (int)$this->cart->id;
        $moduleId = (int)$this->module->id;
        $secureKey = $this->customer->secure_key;

        $confirmationUrl = 'https://' . $this->context->shop->domain_ssl .
            '/order-bevestiging?id_cart=' . $cartId .
            '&id_module=' . $moduleId .
            '&id_order=' . (int)$order->id .
            '&key=' . $secureKey;

        Tools::redirect($confirmationUrl);
    }

    /**
     * Wait briefly for webhook-created order
     */
    private function waitForOrderByCartId(int $cartId, int $timeoutSeconds = 6, int $intervalMs = 500)
    {
        $deadline = microtime(true) + $timeoutSeconds;

        do {
            $order = Order::getByCartId($cartId);
            if (Validate::isLoadedObject($order)) {
                return $order;
            }

            usleep($intervalMs * 1000);
        } while (microtime(true) < $deadline);

        $this->logger->logPaymentMessage("Return: Geen bestelling gevonden na wachten ({$timeoutSeconds}s) voor winkelwagen {$cartId}", 'warning');
        return null;
    }

    /**
     * Redirect to order detail page
     */
    private function redirectToOrderDetail($orderId, $message, $type = 'error'): void
    {
        if ($type === 'error') {
            $this->errors[] = $this->module->l($message);
        } else {
            $this->info[] = $this->module->l($message);
        }

        $this->redirectWithNotifications('/index.php?controller=order-detail&id_order=' . $orderId);
    }

    /**
     * Handle exceptions
     */
    private function handleException(Exception $e): void
    {
        $this->logger->logPaymentMessage('Return Fallback: Script error met bericht: ' . $e->getMessage(), 'error');
        $this->errors[] = $this->module->l('Er is een onverwachte fout opgetreden. Neem contact op met de klantenservice.');
        $this->redirectWithNotifications('/index.php');
    }

    /**
     * Set current order state
     */
    public function setCurrentState($id_order_state, $order): bool
    {
        if (empty($id_order_state) || (int)$id_order_state === (int)$order->current_state) {
            return false;
        }

        try {
            $history = new OrderHistory();
            $history->id_order = (int)$order->id;
            $history->id_employee = 0;
            $use_existing_payment = !$order->hasInvoice();
            $history->changeIdOrderState((int)$id_order_state, $order->id, $use_existing_payment);
            $history->save();
            return true;
        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Return Fallback: Wijzigen van status is mislukt: ' . $e->getMessage(), 'error');
            return false;
        }
    }




    /**
     * Clean up cart-based payment record after order creation
     */
    private function cleanupCartPaymentRecord(): void
    {
        try {
            // Delete the payment record that uses cart ID as order reference
            $referenceWhere = $this->buildReferenceWhereClause((string)$this->cart->id);
            $sql = 'DELETE FROM `' . _DB_PREFIX_ . 'order_payment`
                    WHERE ' . $referenceWhere;

            $result = Db::getInstance()->execute($sql);

            if ($result) {
                $this->logger->logPaymentMessage("Return Fallback: Winkelwagen-gebaseerde betaalrecord opgeruimd voor winkelwagen {$this->cart->id}", 'info');
            } else {
                $this->logger->logPaymentMessage("Return Fallback: Kon winkelwagen-gebaseerde betaalrecord niet opruimen voor winkelwagen {$this->cart->id}", 'warning');
            }

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Return Fallback: Fout bij opruimen van winkelwagen-gebaseerde betaalrecord: " . $e->getMessage(), 'warning');
        }
    }

    private function getPaymentIdForCart(string $cartId): ?string
    {
        try {
            $sql = new DbQuery();
            $sql->select('transaction_id')
                ->from('order_payment')
                ->where($this->buildReferenceWhereClause($cartId))
                ->orderBy('date_add DESC');

            $paymentId = Db::getInstance()->getValue($sql);
            return $paymentId ?: null;
        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Return: Fout bij ophalen betaal id via referentie: ' . $e->getMessage(), 'error');
            return null;
        }
    }

    private function buildReferenceWhereClause(string $reference): string
    {
        $like = pSQL($this->getPendingReferenceLike($reference));
        return '`order_reference` = "' . pSQL($reference) . '" OR `order_reference` LIKE "' . $like . '"';
    }

    private function getPendingReferenceLike(string $cartId): string
    {
        return 'msmollie_cart_' . $cartId . '_%';
    }

    private function getOrderPaymentsByReference(string $reference): array
    {
        $referenceWhere = $this->buildReferenceWhereClause($reference);
        $sql = new DbQuery();
        $sql->select('id_order_payment')
            ->from('order_payment')
            ->where($referenceWhere)
            ->orderBy('date_add DESC');

        $ids = Db::getInstance()->executeS($sql);
        if (!$ids) {
            return [];
        }

        $payments = [];
        foreach ($ids as $row) {
            if (isset($row['id_order_payment'])) {
                $payments[] = new OrderPayment($row['id_order_payment']);
            }
        }
        return $payments;
    }
}


