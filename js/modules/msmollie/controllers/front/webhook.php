<?php

require_once(dirname(__FILE__).'/../../../../../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../../../../../init.php');
require_once(dirname(__FILE__).'/../../msmollie.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/vendor/autoload.php');
require_once(_PS_MODULE_DIR_ . 'msmollie/classes/MollieLogger.php');
use Mollie\Api\MollieApiClient;

/**
 * MSMollie Webhook Controller
 * Handles webhook notifications from Mollie and processes order status updates
 * PRIMARY responsibility for order creation and status management
 */
class MSMollieWebhookModuleFrontController extends ModuleFrontController
{
    private $logger;
    private $mollie;
    private $cartId;
    private $paymentId;
    private $order;
    private $cart;
    private $customer;
    private $orderOwnedByOtherModule = false;

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
        $this->logger->logPaymentMessage('Webhook Controller: initContent aangeroepen', 'info');
        $this->postProcess();
    }

    /**
     * Main processing method
     */
    public function postProcess(): void
    {
        try {
            // Initialize and validate request
            if (!$this->initializeRequest()) {
                return;
            }

            // Get payment ID from database
            if (!$this->getPaymentIdFromDatabase()) {
                return;
            }

            // Initialize Mollie client
            if (!$this->initializeMollieClient()) {
                return;
            }

            // Process payment status
            $this->processPaymentStatus();

        } catch (Exception $e) {
            $this->handleException($e);
        }
    }

    /**
     * Initialize and validate the incoming webhook request
     */
    private function initializeRequest(): bool
    {
        // Log incoming request for debugging
        $this->logIncomingRequest();

        $this->cartId = Tools::getValue('cart_id');

        if (!$this->cartId) {
            $this->logger->logPaymentMessage('Webhook: Er ontbreekt vereiste winkelwagen id parameter', 'error');
            $this->respondWithError(400, 'Geen winkelwagen id ontvangen');
            return false;
        }

        // Load cart and customer for order creation
        $this->cart = new Cart($this->cartId);
        if (!Validate::isLoadedObject($this->cart)) {
            $this->logger->logPaymentMessage('Webhook: Ongeldig winkelwagen id ' . $this->cartId, 'error');
            $this->respondWithError(400, 'Ongeldige winkelwagen');
            return false;
        }

        $this->customer = new Customer($this->cart->id_customer);
        if (!Validate::isLoadedObject($this->customer)) {
            $this->logger->logPaymentMessage('Webhook: Onjuist klant object voor winkelwagen met id ' . $this->cartId, 'error');
            $this->respondWithError(400, 'Ongeldige klant');
            return false;
        }

        $this->logger->logPaymentMessage("Webhook: Winkelwagen id ontvangen: {$this->cartId}", 'info');
        return true;
    }

    /**
     * Get payment ID from OrderPayment database record
     */
    private function getPaymentIdFromDatabase(): bool
    {
        try {
            // First check if order already exists
            $this->order = Order::getByCartId($this->cartId);

            if ($this->order) {
                // If the order was created by a different payment module, do not use its
                // transaction_id — that belongs to the other method, not Mollie.
                if ($this->order->module !== 'msmollie') {
                    $this->orderOwnedByOtherModule = true;
                    $this->logger->logPaymentMessage(
                        "Webhook: Bestelling {$this->order->reference} is betaald via '{$this->order->module}', niet via Mollie. " .
                        "Bestelling status wordt niet gewijzigd.",
                        'warning'
                    );
                    // Fall through to the cart-based lookup below so we can still
                    // retrieve the Mollie payment ID for description updates.
                } else {
                    // Order exists and belongs to Mollie — get the payment ID from it
                    $sql = new DbQuery();
                    $sql->select('transaction_id')
                        ->from('order_payment')
                        ->where('order_reference = "'.pSQL($this->order->reference).'"')
                        ->orderBy('date_add DESC');

                    $result = Db::getInstance()->getValue($sql);

                    if ($result) {
                        $this->paymentId = $result;
                        $this->logger->logPaymentMessage("Webhook: Betaal id gevonden via bestaande bestelling: {$this->paymentId}", 'info');
                        return true;
                    }
                }
            }

            // Order doesn't exist yet, try to find payment ID by cart reference
            $sql = new DbQuery();
            $sql->select('transaction_id, order_reference')
                ->from('order_payment')
                ->where($this->buildReferenceWhereClause($this->cartId))
                ->orderBy('date_add DESC');

            $result = Db::getInstance()->getRow($sql);

            if ($result && !empty($result['transaction_id'])) {
                $this->paymentId = $result['transaction_id'];
                $this->logger->logPaymentMessage("Webhook: Betaal id gevonden via winkelwagen id: {$this->paymentId}", 'info');
                return true;
            }

            $this->logger->logPaymentMessage("Webhook: Geen betaal id gevonden voor winkelwagen id: {$this->cartId}", 'error');
            $this->respondWithError(404, 'Geen betaal id gevonden voor deze winkelwagen');
            return false;

        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Webhook: Fout bij ophalen van betaal id uit database: ' . $e->getMessage(), 'error');
            $this->respondWithError(500, 'Database fout bij ophalen betaal id');
            return false;
        }
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
            $this->logger->logPaymentMessage('Webhook: Geen api sleutel geconfigureerd', 'error');
            $this->respondWithError(500, 'API-sleutel niet geconfigureerd');
            return false;
        }

        try {
            $this->mollie = new MollieApiClient();
            $this->mollie->setApiKey(trim($apiKey));
            $this->logger->logPaymentMessage('Webhook: Mollie client geïnitialiseerd', 'info');
            return true;
        } catch (Exception $e) {
            $this->logger->logPaymentMessage('Webhook: Initialiseren van Mollie client mislukt met volgende error: ' . $e->getMessage(), 'error');
            $this->respondWithError(500, 'Kan geen verbinding maken met betalingsprovider');
            return false;
        }
    }

    /**
     * Process payment status from Mollie
     */
    private function processPaymentStatus(): void
    {
        try {
            $payment = $this->mollie->payments->get(trim($this->paymentId));
            $this->logger->logPaymentMessage("Webhook: Betaal status opgevraagd bij mollie: {$payment->status} voor betaal id: {$this->paymentId}", 'info');

            // Process based on payment status
            $this->handlePaymentStatus($payment);

            // Respond with success
            $this->respondWithSuccess();

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Webhook: Fout bij ophalen van betaal status bij mollie voor betaal id {$this->paymentId}: " . $e->getMessage(), 'error');
            throw $e;
        }
    }

    /**
     * Handle payment status and create/update order accordingly
     */
    private function handlePaymentStatus($payment): void
    {
        switch ($payment->status) {
            case 'paid':
                $this->handlePaidPayment($payment);
                break;

            case 'failed':
                $this->handleFailedPayment($payment);
                break;

            case 'expired':
                $this->handleExpiredPayment($payment);
                break;

            case 'canceled':
                $this->handleCanceledPayment($payment);
                break;

            case 'pending':
                $this->handlePendingPayment($payment);
                break;

            default:
                $this->logger->logPaymentMessage("Webhook: Onbekende betaal status: {$payment->status} voor winkelwagen {$this->cartId}", 'warning');
                return;
        }
    }

    /**
     * Handle paid payment - CREATE ORDER
     */
    private function handlePaidPayment($payment): void
    {
        $this->logger->logPaymentMessage("Webhook: Status 'betaald' afhandelen voor winkelwagen {$this->cartId}", 'info');

        // Check if order already exists
        if (!$this->order) {
            // Create the order
            $newStatus = Configuration::get('MSMOLLIE_DEFAULT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
            $orderCreated = $this->createOrder($newStatus, $payment);

            if (!$orderCreated) {
                $this->logger->logPaymentMessage("Webhook: Bestelling aanmaken mislukt voor winkelwagen {$this->cartId}", 'error');
                return;
            }

            $this->order = Order::getByCartId($this->cartId);

            // Clean up the cart-based payment record
            $this->cleanupCartPaymentRecord();

            // Update Mollie payment description
            $this->updateMolliePaymentDescription($payment, $this->order);

            $this->logger->logPaymentMessage("Webhook: Bestelling aangemaakt met referentie {$this->order->reference}", 'info');
        } else {
            // Order exists, update status if needed — but only if it belongs to Mollie
            if (!$this->orderOwnedByOtherModule) {
                $newStatus = Configuration::get('MSMOLLIE_DEFAULT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
                $waitingStatus = Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
                // Only move to paid if the order is still in a pre-paid state (waiting for payment).
                // If it has already progressed to paid or beyond (processed, shipped, etc.), skip it
                // to prevent Mollie retry webhooks from resetting the order status.
                if ((int)$this->order->current_state === (int)$waitingStatus) {
                    $this->setCurrentState($newStatus, $this->order);
                    $this->logger->logPaymentMessage("Webhook: Bestelling status gewijzigd naar betaald voor bestelling {$this->order->reference}", 'info');
                } else {
                    $this->logger->logPaymentMessage("Webhook: Bestelling {$this->order->reference} al in status {$this->order->current_state}, status niet teruggezet naar betaald.", 'info');
                }
            }
        }
    }

    /**
     * Handle failed payment
     */
    private function handleFailedPayment($payment): void
    {
        $this->logger->logPaymentMessage("Webhook: Status 'mislukt' afhandelen voor winkelwagen {$this->cartId}", 'error');

        if ($this->order && !$this->orderOwnedByOtherModule) {
            $newStatus = (int)Configuration::get('PS_OS_ERROR', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
            if ((int)$this->order->current_state !== $newStatus) {
                $this->setCurrentState($newStatus, $this->order);
                $this->logger->logPaymentMessage("Webhook: Bestelling status gewijzigd naar mislukt voor bestelling {$this->order->reference}", 'info');
            }
        }

        $this->updateMolliePaymentDescriptionForFailure($payment, 'Mislukt');
    }

    /**
     * Handle expired payment
     */
    private function handleExpiredPayment($payment): void
    {
        $this->logger->logPaymentMessage("Webhook: Status 'verlopen' afhandelen voor winkelwagen {$this->cartId}", 'warning');

        if ($this->order && !$this->orderOwnedByOtherModule) {
            $newStatus = (int)Configuration::get('PS_OS_CANCELED', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
            if ((int)$this->order->current_state !== $newStatus) {
                $this->setCurrentState($newStatus, $this->order);
                $this->logger->logPaymentMessage("Webhook: Bestelling status gewijzigd naar verlopen voor bestelling {$this->order->reference}", 'info');
            }
        }

        $this->updateMolliePaymentDescriptionForFailure($payment, 'Verlopen');
    }

    /**
     * Handle canceled payment
     */
    private function handleCanceledPayment($payment): void
    {
        $this->logger->logPaymentMessage("Webhook: Status 'geannuleerd' afhandelen voor winkelwagen {$this->cartId}", 'info');

        if ($this->order && !$this->orderOwnedByOtherModule) {
            $newStatus = (int)Configuration::get('PS_OS_CANCELED', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
            if ((int)$this->order->current_state !== $newStatus) {
                $this->setCurrentState($newStatus, $this->order);
                $this->logger->logPaymentMessage("Webhook: Bestelling status gewijzigd naar geannuleerd voor bestelling {$this->order->reference}", 'info');
            }
        }

        $this->updateMolliePaymentDescriptionForFailure($payment, 'Geannuleerd');
    }

    /**
     * Handle pending payment - CREATE ORDER WITH PENDING STATUS
     */
    private function handlePendingPayment($payment): void
    {
        $this->logger->logPaymentMessage("Webhook: Status 'betaling in behandeling' afhandelen voor winkelwagen {$this->cartId}", 'info');

        // Check if order already exists
        if (!$this->order) {
            // Create order with waiting payment status
            $waitingStatus = Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);

            $orderCreated = $this->createOrder($waitingStatus, $payment);

            if (!$orderCreated) {
                $this->logger->logPaymentMessage("Webhook: Bestelling aanmaken mislukt voor winkelwagen {$this->cartId}", 'error');
                return;
            }

            $this->order = Order::getByCartId($this->cartId);


            // Update Mollie payment description
            $this->updateMolliePaymentDescriptionForPending($payment, $this->order);

            $this->logger->logPaymentMessage("Webhook: Bestelling aangemaakt met wachtende status en referentie {$this->order->reference}", 'info');
        } else {
            // Order exists, update status if needed — but only if it belongs to Mollie
            if (!$this->orderOwnedByOtherModule) {
                $waitingStatus = Configuration::get('MSMOLLIE_WAITING_PAYMENT_STATUS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id);
                if ((int)$this->order->current_state !== (int)$waitingStatus) {
                    $this->setCurrentState($waitingStatus, $this->order);
                    $this->logger->logPaymentMessage("Webhook: Bestelling status gewijzigd naar wachtend voor bestelling {$this->order->reference}", 'info');
                }
            }
        }
    }

    /**
     * Create PrestaShop order
     */
    private function createOrder($statusId, $payment): bool
    {
        try {
            $method = $payment->method ?? 'Mollie';
            $currency = $this->context->currency;

            $validate = $this->module->validateOrder(
                (int)$this->cart->id,
                (int)$statusId,
                (float)$this->cart->getOrderTotal(),
                $method,
                null,
                ['transaction_id' => $payment->id ?? $this->paymentId],
                (int)$currency->id,
                false,
                $this->customer->secure_key,
                $this->context->shop
            );

            if ($validate) {
                // Clean up the cart-based payment record
                $this->cleanupCartPaymentRecord();
                $this->logger->logPaymentMessage("Webhook: Bestelling aanmaken is gelukt voor winkelwagen {$this->cart->id}", 'info');
            } else {
                $this->logger->logPaymentMessage("Webhook: Bestelling aanmaken is mislukt voor winkelwagen {$this->cart->id}", 'error');
            }

            return $validate;

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Webhook: Bestelling aanmaken is mislukt: " . $e->getMessage(), 'error');
            return false;
        }
    }

    /**
     * Update Mollie payment description with order information
     */
    private function updateMolliePaymentDescription($payment, $order): void
    {
        try {
            $firstInitial = !empty($this->customer->firstname) ? strtoupper(substr($this->customer->firstname, 0, 1)).'.' : '';

            $orderReference = $order->reference.'|'.
                $firstInitial.'|'.
                $this->customer->lastname . ' | ' .
                ($payment->method_title ?? $payment->method) . ' | ' .
                Context::getContext()->shop_name;

            $metadata = [
                'order_id' => $order->id,
                'order_reference' => $order->reference,
                'cart_id' => $this->cartId,
                'status' => $payment->status,
                'updated_at' => date('Y-m-d H:i:s')
            ];

            $updateData = [
                'description' => $orderReference,
                'metadata' => $metadata
            ];

            $this->mollie->payments->update($payment->id, $updateData);
            $this->logger->logPaymentMessage("Webhook: Mollie betaling met betaal id {$payment->id} is gewijzigd", 'info');

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Webhook: Wijzigen van mollie betaling met id {$payment->id} is mislukt: " . $e->getMessage(), 'warning');
        }
    }

    /**
     * Update Mollie payment description for pending payment
     */
    private function updateMolliePaymentDescriptionForPending($payment, $order): void
    {
        try {
            $firstInitial = !empty($this->customer->firstname) ? strtoupper(substr($this->customer->firstname, 0, 1)).'.' : '';

            $orderReference = $order->reference.'| Wachtend |'.
                $firstInitial.'|'.
                $this->customer->lastname . ' | ' .
                ($payment->method_title ?? $payment->method) . ' | ' .
                Context::getContext()->shop_name;

            $metadata = [
                'order_id' => $order->id,
                'order_reference' => $order->reference,
                'cart_id' => $this->cartId,
                'status' => 'pending',
                'pending_at' => date('Y-m-d H:i:s')
            ];

            $updateData = [
                'description' => $orderReference,
                'metadata' => $metadata
            ];

            $this->mollie->payments->update($payment->id, $updateData);
            $this->logger->logPaymentMessage("Webhook: Mollie betaling met betaal id {$payment->id} is gewijzigd voor wachtende status", 'info');

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Webhook: Wijzigen van mollie betaling met id {$payment->id} is mislukt: " . $e->getMessage(), 'warning');
        }
    }

    /**
     * Update Mollie payment description for failed/expired/canceled payments
     */
    private function updateMolliePaymentDescriptionForFailure($payment, $statusText): void
    {
        try {
            $firstInitial = !empty($this->customer->firstname) ? strtoupper(substr($this->customer->firstname, 0, 1)).'.' : '';

            $orderReference = 'winkelwagen ' . $this->cartId .' | ' . $statusText . ' |' . $firstInitial.' '.
                $this->customer->lastname . ' | ' .
                ($payment->method_title ?? $payment->method) . ' | ' .
                Context::getContext()->shop_name;

            $metadata = [
                'cart_id' => $this->cartId,
                'status' => strtolower($statusText),
                'failed_at' => date('Y-m-d H:i:s')
            ];

            if ($this->order) {
                $metadata['order_id'] = $this->order->id;
                $metadata['order_reference'] = $this->order->reference;
            }

            $updateData = [
                'description' => $orderReference,
                'metadata' => $metadata
            ];

            $this->mollie->payments->update($payment->id, $updateData);
            $this->logger->logPaymentMessage("Webhook: Mollie betaling met betaal id {$payment->id} is gewijzigd voor status {$statusText}", 'info');

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Webhook: Wijzigen van mollie betaling met id {$payment->id} is mislukt: " . $e->getMessage(), 'warning');
        }
    }

    /**
     * Set current order state
     */
    private function setCurrentState($id_order_state, $order): bool
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
            $this->logger->logPaymentMessage('Webhook: Wijzigen van status is mislukt: ' . $e->getMessage(), 'error');
            return false;
        }
    }

    /**
     * Log incoming webhook request for debugging
     */
    private function logIncomingRequest(): void
    {
        $logData = [
            'timestamp' => date('Y-m-d H:i:s'),
            'method' => $_SERVER['REQUEST_METHOD'] ?? 'Unknown',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
            'post_data' => $_POST,
            'get_data' => $_GET,
            'raw_input' => file_get_contents('php://input'),
            'remote_addr' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
        ];

        $this->logger->logPaymentMessage('Webhook: Inkomend verzoek ontvangen: ' . json_encode($logData), 'info');
    }

    /**
     * Respond with error and terminate
     */
    private function respondWithError($code, $message): void
    {
        $this->logger->logPaymentMessage("Webhook: Fout response ({$code}): {$message}", 'error');
        http_response_code($code);
        die($message);
    }

    /**
     * Respond with success and terminate
     */
    private function respondWithSuccess(): void
    {
        $this->logger->logPaymentMessage('Webhook: Succesvol verwerkt', 'info');
        http_response_code(200);
        die('OK');
    }

    /**
     * Handle exceptions
     */
    private function handleException(Exception $e): void
    {
        $this->logger->logPaymentMessage('Webhook: Script error met bericht: ' . $e->getMessage(), 'error');
        http_response_code(500);
        die('Interne server fout');
    }




    /**
     * Clean up cart-based payment record after order creation
     */
    private function cleanupCartPaymentRecord(): void
    {
        try {
            // Delete the payment record that uses cart ID as order reference
            $referenceWhere = $this->buildReferenceWhereClause($this->cartId);
            $sql = 'DELETE FROM `' . _DB_PREFIX_ . 'order_payment`
                    WHERE ' . $referenceWhere;

            $result = Db::getInstance()->execute($sql);

            if ($result) {
                $this->logger->logPaymentMessage("Webhook: Winkelwagen-gebaseerde betaalrecord opgeruimd voor winkelwagen {$this->cartId}", 'info');
            } else {
                $this->logger->logPaymentMessage("Webhook: Kon winkelwagen-gebaseerde betaalrecord niet opruimen voor winkelwagen {$this->cartId}", 'warning');
            }

        } catch (Exception $e) {
            $this->logger->logPaymentMessage("Webhook: Fout bij opruimen van winkelwagen-gebaseerde betaalrecord: " . $e->getMessage(), 'warning');
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

}

