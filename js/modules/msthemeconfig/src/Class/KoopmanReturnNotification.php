<?php

declare(strict_types=1);

namespace MsThemeConfig\Class;

use Configuration;
use Context;
use Customer;
use Db;
use InvalidArgumentException;
use Language;
use Mail;
use Order;
use RuntimeException;
use Shop;
use Throwable;
use Validate;

/** An explicit staff action emails the return number and tracking link to the customer once. */
final class KoopmanReturnNotification
{
    private const TABLE = 'msthemeconfig_koopman_return_email';
    private const TEMPLATE = 'koopman_return_created';
    private Db $db;
    private KoopmanReturnShipment $shipments;
    private bool $storageReady = false;

    public function __construct(?KoopmanReturnShipment $shipments = null, ?Db $db = null)
    {
        $this->db = $db ?? Db::getInstance();
        $this->shipments = $shipments ?? new KoopmanReturnShipment(null, $this->db);
    }

    /** Read status and prerequisites only; this never sends mail or contacts Transmission. */
    public function getForReturn(Order $order, int $returnId): array
    {
        $this->validateOrder($order, $returnId);
        $this->ensureStorage();
        $record = $this->find($order, $returnId);
        if ($record && in_array($record['status'], ['sent', 'sending', 'uncertain'], true)) {
            return $this->result($record, false);
        }
        $recipient = $this->recipient($order);
        try {
            $this->mailData($order, $returnId);
            return $this->result($record, true, $recipient);
        } catch (InvalidArgumentException $error) {
            $result = $this->result($record, false, $recipient);
            $result['message'] = $error->getMessage();
            return $result;
        }
    }

    public function send(Order $order, int $returnId, int $employeeId): array
    {
        $this->validateOrder($order, $returnId);
        if ($employeeId < 1) {
            throw new InvalidArgumentException('Een aangemelde medewerker is vereist.');
        }
        $this->ensureStorage();
        $existing = $this->find($order, $returnId);
        if ($existing && in_array($existing['status'], ['sent', 'sending', 'uncertain'], true)) {
            return $this->result($existing, false);
        }
        try {
            $data = $this->mailData($order, $returnId);
        } catch (InvalidArgumentException $error) {
            // Known local failures never reach Mail::send and can be corrected safely.
            $this->recordFailure($order, $returnId, $employeeId, $this->recipient($order), $error->getMessage());
            return $this->getForReturn($order, $returnId);
        }

        $attempt = bin2hex(random_bytes(16));
        $now = date('Y-m-d H:i:s');
        $this->insert($order, $returnId, $employeeId, $attempt, 'sending', $data['recipient'], 'De e-mail wordt verwerkt. Open het formulier opnieuw om de status te bekijken.');
        $claimed = (int) $this->db->Affected_Rows() === 1;
        if (!$claimed) {
            $this->execute('UPDATE `' . _DB_PREFIX_ . self::TABLE . '` SET status = \'sending\', attempt_token = '
                . $this->quote($attempt) . ', id_employee = ' . $employeeId . ', recipient = ' . $this->quote($data['recipient'])
                . ', message = ' . $this->quote('De e-mail wordt verwerkt. Open het formulier opnieuw om de status te bekijken.')
                . ', date_upd = ' . $this->quote($now) . ' WHERE ' . $this->scope($order, $returnId) . " AND status = 'failed'");
            $claimed = (int) $this->db->Affected_Rows() === 1;
        }
        if (!$claimed) {
            return $this->result($this->requireRecord($order, $returnId), false);
        }

        $context = Context::getContext();
        $previousShop = $context->shop;
        $previousLanguage = $context->language;
        $previousScope = Shop::getContext();
        $previousScopeId = $previousScope === Shop::CONTEXT_SHOP ? Shop::getContextShopID() : Shop::getContextShopGroupID();
        try {
            $context->shop = new Shop((int) $order->id_shop);
            $context->language = new Language((int) $order->id_lang);
            // Mail's group-level configuration fallback uses Shop's static context.
            Shop::setContext(Shop::CONTEXT_SHOP, (int) $order->id_shop);
            $sent = Mail::send(
                (int) $order->id_lang,
                self::TEMPLATE,
                'Retourzending ' . str_replace(["\r", "\n"], '', (string) $order->reference),
                [
                    '{tracking_number}' => htmlspecialchars($data['tracking_number'], ENT_QUOTES, 'UTF-8'),
                    '{tracking_url}' => htmlspecialchars($data['tracking_url'], ENT_QUOTES, 'UTF-8'),
                    '{tracking_number_text}' => $data['tracking_number'],
                    '{tracking_url_text}' => $data['tracking_url'],
                ],
                $data['recipient'],
                $data['recipient_name'],
                $data['sender'],
                $data['sender_name'],
                null, // The carrier's driver supplies the label at pickup.
                null,
                _PS_MODULE_DIR_ . 'msthemeconfig/mails/',
                false,
                (int) $order->id_shop
            );
        } catch (Throwable $error) {
            $sent = false;
        } finally {
            $context->shop = $previousShop;
            $context->language = $previousLanguage;
            if ($previousScope === null) {
                Shop::resetContext();
            } else {
                Shop::setContext($previousScope, $previousScopeId);
            }
        }
        // Mail::send also returns false for transport failures whose delivery may be ambiguous.
        $status = $sent === true || (is_int($sent) && $sent > 0) ? 'sent' : 'uncertain';
        $message = $status === 'sent'
            ? 'De retourbevestiging is naar ' . $data['recipient'] . ' verzonden.'
            : 'De verzendstatus van de e-mail is onbekend. Controleer de e-maillog voordat u deze opnieuw verstuurt.';
        try {
            $this->execute('UPDATE `' . _DB_PREFIX_ . self::TABLE . '` SET status = ' . $this->quote($status)
                . ', message = ' . $this->quote($message) . ', sent_at = ' . ($status === 'sent' ? $this->quote(date('Y-m-d H:i:s')) : 'NULL')
                . ', date_upd = ' . $this->quote(date('Y-m-d H:i:s')) . ' WHERE ' . $this->scope($order, $returnId)
                . ' AND attempt_token = ' . $this->quote($attempt) . " AND status = 'sending'");
            return $this->result($this->requireRecord($order, $returnId), false);
        } catch (Throwable $error) {
            // A sent email must not be repeated if its final status could not be saved.
            return $this->result([
                'status' => 'uncertain',
                'recipient' => $data['recipient'],
                'message' => 'De e-mailstatus kon niet worden opgeslagen. Controleer de e-maillog voordat u opnieuw verstuurt.',
            ], false);
        }
    }

    private function mailData(Order $order, int $returnId): array
    {
        $shipment = $this->shipments->getForOrder($order);
        if (!$shipment || (int) $shipment['return_id'] !== $returnId || $shipment['status'] !== 'created') {
            throw new InvalidArgumentException('Er is geen bevestigde retourzending voor deze bestelling.');
        }
        $trackingNumber = trim((string) $shipment['tracking_number']);
        $trackingUrl = trim((string) $shipment['tracking_url']);
        if ($trackingNumber === '' || !filter_var($trackingUrl, FILTER_VALIDATE_URL)
            || !in_array(strtolower((string) parse_url($trackingUrl, PHP_URL_SCHEME)), ['http', 'https'], true)) {
            throw new InvalidArgumentException('Het retournummer of de trackinglink van Transmission ontbreekt. De e-mail is niet verstuurd.');
        }
        $customer = new Customer((int) $order->id_customer);
        if (!Validate::isLoadedObject($customer) || !Validate::isEmail((string) $customer->email)) {
            throw new InvalidArgumentException('De klant heeft geen geldig e-mailadres. De e-mail is niet verstuurd.');
        }
        $shop = new Shop((int) $order->id_shop);
        $config = static fn (string $key) => Configuration::get($key, null, (int) $shop->id_shop_group, (int) $order->id_shop);
        if ((int) $config('PS_MAIL_METHOD') === Mail::METHOD_DISABLE) {
            // Core and the shop's Mail override misleadingly return true when mail is disabled.
            throw new InvalidArgumentException('E-mail versturen is uitgeschakeld voor deze winkel. De e-mail is niet verstuurd.');
        }
        $sender = (string) $config('PS_SHOP_EMAIL');
        $senderName = (string) $config('PS_SHOP_NAME');
        if (!Validate::isEmail($sender) || trim($senderName) === '') {
            throw new InvalidArgumentException('De e-mailafzender van deze winkel is niet goed ingesteld.');
        }
        $templatePath = _PS_MODULE_DIR_ . 'msthemeconfig/mails/';
        $language = (string) Language::getIsoById((int) $order->id_lang);
        $available = false;
        foreach ([$language, (string) Language::getIsoById((int) $config('PS_LANG_DEFAULT')), 'en'] as $iso) {
            if (preg_match('/^[a-z]{2,3}$/D', $iso)
                && is_file($templatePath . $iso . '/' . self::TEMPLATE . '.html')
                && is_file($templatePath . $iso . '/' . self::TEMPLATE . '.txt')) {
                $available = true;
                break;
            }
        }
        if (!$available) {
            throw new InvalidArgumentException('Het e-mailsjabloon voor de retourzending ontbreekt.');
        }
        return [
            'recipient' => (string) $customer->email,
            'recipient_name' => trim($customer->firstname . ' ' . $customer->lastname),
            'sender' => $sender,
            'sender_name' => $senderName,
            'tracking_number' => $trackingNumber,
            'tracking_url' => $trackingUrl,
        ];
    }

    private function recipient(Order $order): string
    {
        $customer = new Customer((int) $order->id_customer);
        return Validate::isLoadedObject($customer) && Validate::isEmail((string) $customer->email) ? (string) $customer->email : '';
    }

    private function result(?array $record, bool $canSend, string $recipient = ''): array
    {
        $status = $record['status'] ?? 'unsent';
        return [
            'status' => $status,
            'sent' => $status === 'sent',
            'can_send' => $canSend,
            'blocked' => in_array($status, ['sending', 'uncertain'], true),
            'message' => $record['message'] ?? '',
            'recipient' => $status === 'sent' || $recipient === '' ? ($record['recipient'] ?? $recipient) : $recipient,
            'sent_at' => $record['sent_at'] ?? '',
        ];
    }

    private function recordFailure(Order $order, int $returnId, int $employeeId, string $recipient, string $message): void
    {
        $this->insert($order, $returnId, $employeeId, bin2hex(random_bytes(16)), 'failed', $recipient, $message);
        if ((int) $this->db->Affected_Rows() === 0) {
            $this->execute('UPDATE `' . _DB_PREFIX_ . self::TABLE . '` SET message = ' . $this->quote($message)
                . ', recipient = ' . $this->quote($recipient) . ', date_upd = ' . $this->quote(date('Y-m-d H:i:s'))
                . ' WHERE ' . $this->scope($order, $returnId) . " AND status = 'failed'");
        }
    }

    private function insert(Order $order, int $returnId, int $employeeId, string $attempt, string $status, string $recipient, string $message): void
    {
        $now = date('Y-m-d H:i:s');
        $this->execute('INSERT IGNORE INTO `' . _DB_PREFIX_ . self::TABLE . '` '
            . '(id_shop, id_order, id_return, id_employee, attempt_token, status, recipient, message, date_add, date_upd) VALUES ('
            . (int) $order->id_shop . ', ' . (int) $order->id . ', ' . $returnId . ', ' . $employeeId . ', '
            . implode(', ', array_map(fn (string $value): string => $this->quote($value), [$attempt, $status, $recipient, $message, $now, $now])) . ')');
    }

    private function find(Order $order, int $returnId): ?array
    {
        $rows = $this->db->executeS('SELECT status, recipient, message, sent_at FROM `' . _DB_PREFIX_ . self::TABLE . '` WHERE '
            . $this->scope($order, $returnId) . ' LIMIT 1', true, false);
        if (!is_array($rows)) {
            throw new RuntimeException('De verzendstatus van de retourmail kon niet worden gelezen.');
        }
        return $rows[0] ?? null;
    }

    private function requireRecord(Order $order, int $returnId): array
    {
        return $this->find($order, $returnId) ?? throw new RuntimeException('De verzendstatus van de retourmail ontbreekt.');
    }

    private function validateOrder(Order $order, int $returnId): void
    {
        if (!Validate::isLoadedObject($order) || (int) $order->id_shop < 1 || $returnId < 1) {
            throw new InvalidArgumentException('De bestelling of retourzending is ongeldig.');
        }
    }

    private function scope(Order $order, int $returnId): string
    {
        return 'id_shop = ' . (int) $order->id_shop . ' AND id_order = ' . (int) $order->id . ' AND id_return = ' . $returnId;
    }

    private function quote(string $value): string
    {
        return "'" . pSQL($value, true) . "'";
    }

    private function execute(string $sql): void
    {
        if (!$this->db->execute($sql)) {
            throw new RuntimeException('De verzendstatus van de retourmail kon niet veilig worden opgeslagen.');
        }
    }

    private function ensureStorage(): void
    {
        if ($this->storageReady) {
            return;
        }
        $this->execute('CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . self::TABLE . '` (
            id_notification INT UNSIGNED NOT NULL AUTO_INCREMENT,
            id_shop INT UNSIGNED NOT NULL,
            id_order INT UNSIGNED NOT NULL,
            id_return INT UNSIGNED NOT NULL,
            id_employee INT UNSIGNED NOT NULL,
            attempt_token VARCHAR(64) NOT NULL,
            status VARCHAR(16) NOT NULL,
            recipient VARCHAR(254) NOT NULL,
            message TEXT NOT NULL,
            sent_at DATETIME NULL,
            date_add DATETIME NOT NULL,
            date_upd DATETIME NOT NULL,
            PRIMARY KEY (id_notification),
            UNIQUE KEY return_email (id_shop, id_order, id_return)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
        $this->storageReady = true;
    }
}
