<?php

declare(strict_types=1);

namespace MsThemeConfig\Class;

use Address;
use Context;
use Country;
use Customer;
use DateTimeImmutable;
use DateTimeZone;
use Db;
use InvalidArgumentException;
use Language;
use Order;
use RuntimeException;
use Shop;
use Throwable;
use Validate;

/** Books and stores one return separately from the order's outbound shipment. */
final class KoopmanReturnShipment
{
    private const TABLE = 'msthemeconfig_koopman_return';
    private const COLUMNS = 'id_return, id_shop, id_order, request_key, status, tracking_number, tracking_url, label_count, message';
    private Db $db;
    private ?ExportOrdersMultipleCollies $client;
    private bool $storageReady = false;

    public function __construct(?ExportOrdersMultipleCollies $client = null, ?Db $db = null)
    {
        $this->client = $client;
        $this->db = $db ?? Db::getInstance();
    }

    public function getForOrder(Order $order): ?array
    {
        $this->validateOrder($order);
        $this->ensureStorage();
        return $this->find($order);
    }

    public function create(Order $order, array $form, string $requestKey, int $employeeId): array
    {
        $this->validateOrder($order);
        if (!preg_match('/^[a-f0-9]{32,64}$/D', $requestKey) || $employeeId < 1) {
            throw new InvalidArgumentException('Ongeldige retouraanvraag. Open het retourformulier opnieuw.');
        }
        $units = self::validatePackages($form);
        $date = self::validateDate($form['pickup_date'] ?? '');
        $message = self::text($form['order_msg'] ?? '', 180, 'Bericht aan chauffeur');
        $client = $this->getClient($order);
        $payload = $this->buildPayload($order, $client, $units, $date, $message);
        $this->ensureStorage();
        $existing = $this->find($order);
        if ($existing && ($existing['status'] !== 'failed' || $existing['request_key'] === $requestKey)) {
            return $existing;
        }
        try {
            // Authentication cannot create a shipment; failure here remains safe to correct/retry.
            $client->authenticate();
        } catch (Throwable $error) {
            throw new InvalidArgumentException('Aanmelden bij Transmission is niet gelukt. Controleer de verbinding en Koopman-inloggegevens en probeer opnieuw.');
        }

        // Claim before the POST. The unique order key also blocks a reopened form.
        $now = date('Y-m-d H:i:s');
        $sql = 'INSERT IGNORE INTO `' . _DB_PREFIX_ . self::TABLE . '` '
            . '(id_shop, id_order, id_employee, request_key, status, tracking_number, tracking_url, labels, label_count, message, date_add, date_upd) VALUES ('
            . (int) $order->id_shop . ', ' . (int) $order->id . ', ' . $employeeId . ', '
            . $this->quote($requestKey) . ", 'creating', '', '', '[]', 0, "
            . $this->quote('De retouraanvraag wordt verwerkt. Controleer de aanvraag voordat u opnieuw boekt.') . ', '
            . $this->quote($now) . ', ' . $this->quote($now) . ')';
        $this->execute($sql);
        $claimed = (int) $this->db->Affected_Rows() === 1;
        $record = $this->find($order);
        if (!$record) {
            throw new RuntimeException('De retouraanvraag kon niet veilig worden opgeslagen.');
        }
        if (!$claimed && $record['status'] === 'failed' && $record['request_key'] !== $requestKey) {
            // Only a definitive rejection may be retried, using a newly opened form.
            $this->execute('UPDATE `' . _DB_PREFIX_ . self::TABLE . '` SET status = \'creating\', request_key = '
                . $this->quote($requestKey) . ', id_employee = ' . $employeeId . ', date_upd = ' . $this->quote($now)
                . ', message = ' . $this->quote('De retouraanvraag wordt verwerkt. Controleer de aanvraag voordat u opnieuw boekt.')
                . ' WHERE ' . $this->scope($order) . " AND status = 'failed' AND request_key = " . $this->quote($record['request_key']));
            $claimed = (int) $this->db->Affected_Rows() === 1;
            $record = $this->find($order);
        }
        if (!$claimed) {
            return $record;
        }

        try {
            $rawResponse = $client->makeApiRequestRaw($client->apiOrderEndpoint, $payload, 'POST');
        } catch (Throwable $error) {
            // A timeout/transport exception does not prove that Transmission rejected it.
            return $this->finish($order, $requestKey, [
                'status' => 'uncertain',
                'message' => 'Geen bevestiging van Transmission ontvangen. Controleer de retour in het Transmission-portaal voordat u opnieuw boekt.',
            ]);
        }

        $response = is_array($rawResponse['data'] ?? null) ? $rawResponse['data'] : [];
        $data = is_array($response['data'] ?? null) ? $response['data'] : [];
        $httpStatus = (int) ($rawResponse['http_code'] ?? 0);
        $status = (int) ($response['status'] ?? $httpStatus);
        $trackingNumber = is_scalar($data['transport_number'] ?? null) ? trim((string) $data['transport_number']) : '';
        if ($httpStatus < 200 || $httpStatus >= 300 || $status < 200 || $status >= 300 || $trackingNumber === '') {
            // Conflicts/timeouts may refer to an existing booking, so do not retry them.
            $rejectionCodes = [400, 401, 403, 404, 405, 406, 415, 422, 429];
            $rejected = (in_array($httpStatus, $rejectionCodes, true) || in_array($status, $rejectionCodes, true)) && $trackingNumber === '';
            return $this->finish($order, $requestKey, [
                'status' => $rejected ? 'failed' : 'uncertain',
                'message' => $rejected
                    ? self::rejectionMessage($response, $status)
                    : 'Transmission gaf geen volledige bevestiging. Controleer de retour in het Transmission-portaal voordat u opnieuw boekt.',
            ]);
        }

        $trackingUrl = is_string($data['tracking_url'] ?? null) ? $data['tracking_url'] : '';
        if (!filter_var($trackingUrl, FILTER_VALIDATE_URL) || !in_array(strtolower((string) parse_url($trackingUrl, PHP_URL_SCHEME)), ['http', 'https'], true)) {
            $trackingUrl = '';
        }
        // Persist acceptance before handling PDFs: a label problem must never trigger another booking.
        $record = $this->finish($order, $requestKey, [
            'status' => 'created',
            'tracking_number' => substr($trackingNumber, 0, 100),
            'tracking_url' => substr($trackingUrl, 0, 2048),
            'message' => 'De retour is aangemaakt. Transmission heeft geen bruikbaar PDF-label meegestuurd; controleer het label in het Transmission-portaal.',
        ]);
        $labels = self::extractLabels($data['labels'] ?? []);
        if ($labels) {
            try {
                $record = $this->finish($order, $requestKey, [
                    'labels' => json_encode($labels, JSON_THROW_ON_ERROR),
                    'label_count' => count($labels),
                    'message' => 'De retouraanvraag is geslaagd. U kunt het retourlabel downloaden.',
                ]);
            } catch (Throwable $error) {
                // The already persisted shipment remains created if saving its label fails.
                $record['message'] = 'De retour is aangemaakt, maar het label kon niet worden opgeslagen. Download het label in het Transmission-portaal.';
            }
        }
        return $record;
    }

    public function getLabel(Order $order, int $returnId, int $labelIndex): array
    {
        $this->validateOrder($order);
        $this->ensureStorage();
        if ($returnId < 1 || $labelIndex < 0) {
            throw new InvalidArgumentException('Ongeldig retourlabel.');
        }
        $rows = $this->db->executeS('SELECT labels FROM `' . _DB_PREFIX_ . self::TABLE . '` WHERE '
            . $this->scope($order) . ' AND id_return = ' . $returnId . " AND status = 'created' LIMIT 1", true, false);
        if (!is_array($rows)) {
            throw new RuntimeException('Het retourlabel kon niet worden gelezen.');
        }
        $labels = json_decode($rows[0]['labels'] ?? '[]', true);
        $content = isset($labels[$labelIndex]) && is_string($labels[$labelIndex]) ? base64_decode($labels[$labelIndex], true) : false;
        if ($content === false || !str_starts_with($content, '%PDF-')) {
            throw new RuntimeException('Het retourlabel is niet beschikbaar.');
        }
        return ['content' => $content, 'filename' => 'retour-' . (int) $order->id . '-' . $returnId . '-' . ($labelIndex + 1) . '.pdf'];
    }

    /** Validate and expand quantity rows into individual Transmission shipment units. */
    public static function validatePackages(array $form): array
    {
        $types = $form['collie_type'] ?? null;
        if (!is_array($types) || !$types || count($types) > 100) {
            throw new InvalidArgumentException('Voeg minimaal één pakket toe (maximaal 100).');
        }
        $fields = ['collie_total', 'collie_length', 'collie_width', 'collie_height', 'collie_weight'];
        foreach ($fields as $field) {
            if (!is_array($form[$field] ?? null) || array_keys($form[$field]) !== array_keys($types)) {
                throw new InvalidArgumentException('Vul voor ieder pakket het aantal, gewicht en alle afmetingen in.');
            }
        }
        $mapping = ['COL' => 'COL', 'PLH' => 'PLH', 'MP' => 'MP', 'envelope' => 'COL', 'plaat' => 'COL', '1-meter' => 'COL', '2-meter' => 'COL', 'pallet' => 'PLH', 'balk-pallet' => 'PLH', 'plaat-pallet' => 'MP'];
        $units = [];
        foreach ($types as $key => $type) {
            if (!is_string($type) || !isset($mapping[$type])) {
                throw new InvalidArgumentException('Kies een geldig pakkettype.');
            }
            $quantity = filter_var($form['collie_total'][$key], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 100]]);
            if ($quantity === false || count($units) + $quantity > 100) {
                throw new InvalidArgumentException('Het aantal pakketten moet een geheel getal van 1 tot en met 100 zijn.');
            }
            $measurements = [];
            foreach (['length', 'width', 'height', 'weight'] as $measurement) {
                $value = $form['collie_' . $measurement][$key];
                if (!is_scalar($value) || !preg_match('/^\d+(?:[.,]\d{1,3})?$/D', (string) $value)) {
                    throw new InvalidArgumentException('Vul geldige positieve afmetingen en een gewicht in.');
                }
                $number = (float) str_replace(',', '.', (string) $value);
                if ($number <= 0 || $number > 10000) {
                    throw new InvalidArgumentException('Afmetingen en gewicht moeten groter dan 0 en maximaal 10000 zijn.');
                }
                $measurements[$measurement] = $number;
            }
            for ($i = 0; $i < $quantity; ++$i) {
                $units[] = [
                    'number' => count($units) + 1,
                    'goods_description' => 'ModerneSmid metaal producten',
                    'packages' => '1',
                    'exchange' => '0',
                    'unit_type' => $mapping[$type],
                    'measurements' => $measurements + ['volume' => '0.0000', 'loadingmeter' => '0.00'],
                    'exchange_unit' => 0,
                ];
            }
        }
        return $units;
    }

    private static function validateDate($value): string
    {
        if (!is_string($value) || !preg_match('/^\d{4}-\d{2}-\d{2}$/D', $value)) {
            throw new InvalidArgumentException('Kies een geldige ophaaldatum vanaf vandaag.');
        }
        $timezone = new DateTimeZone('Europe/Amsterdam');
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value, $timezone);
        if (!$date || $date->format('Y-m-d') !== $value || $date < new DateTimeImmutable('today', $timezone)) {
            throw new InvalidArgumentException('Kies een geldige ophaaldatum vanaf vandaag.');
        }
        return $value;
    }

    /** Use the same contact check when opening the form and when booking the pickup. */
    public static function getCustomerPhone(Address $address): string
    {
        $mobile = trim((string) $address->phone_mobile);
        $phone = $mobile !== '' ? $mobile : trim((string) $address->phone);
        return self::text($phone, 30, 'Telefoonnummer klant', true);
    }

    private function buildPayload(Order $order, ExportOrdersMultipleCollies $client, array $units, string $date, string $message): array
    {
        $address = new Address((int) $order->id_address_delivery);
        $customer = new Customer((int) $order->id_customer);
        $country = new Country((int) $address->id_country);
        if (!Validate::isLoadedObject($address) || !Validate::isLoadedObject($customer) || !Validate::isLoadedObject($country)) {
            throw new InvalidArgumentException('Het afleveradres of de klantgegevens van de bestelling ontbreken.');
        }
        $name = trim($address->firstname . ' ' . $address->lastname);
        $phone = self::getCustomerPhone($address);
        $pickup = [
            'type' => 'pickup',
            'date' => $date,
            'name' => self::text($name, 60, 'Naam klant', true),
            'name2' => self::text($address->company ?: $name, 60, 'Bedrijfsnaam klant'),
            'address1' => self::text($address->address1, 60, 'Straat klant', true),
            'housenumber' => self::text(trim((string) ($address->house_number ?? '') . ' ' . ($address->house_number_extension ?? '')), 10, 'Huisnummer klant', true),
            'postalcode' => self::text($address->postcode, 10, 'Postcode klant', true),
            'city' => self::text($address->city, 60, 'Plaats klant', true),
            'country_code' => self::text($country->iso_code, 2, 'Land klant', true),
            'contact' => [
                'language' => 'NL',
                'name' => self::text($name, 60, 'Contactpersoon', true),
                'phonenumber' => $phone,
                'email_address' => self::text($customer->email, 100, 'E-mailadres klant', true),
            ],
        ];
        $consignor = [
            'type' => 'consignor',
            'name' => self::text($client->afzenderNaam, 60, 'Naam afzender', true),
            'name2' => self::text($client->afzenderNaam2, 60, 'Tweede naam afzender'),
            'address1' => self::text($client->afzenderStraat, 60, 'Straat afzender', true),
            'housenumber' => self::text($client->afzenderHuisnr, 10, 'Huisnummer afzender', true),
            'postalcode' => self::text($client->afzenderPostcode, 10, 'Postcode afzender', true),
            'city' => self::text($client->afzenderPlaats, 60, 'Plaats afzender', true),
            'country_code' => self::text($client->afzenderLand, 2, 'Land afzender', true),
        ];
        // Type A returns use pickup + consignor, as in the original return integration.
        // Transmission rejects the generic loading/delivery roles for return orders.
        return [
            'type' => 'A',
            'depot_number' => self::text($client->apiDepot, 10, 'Transmission-depot', true),
            'customer_number' => self::text($client->apiVerlader, 30, 'Transmission-klantnummer', true),
            'date' => $date,
            'labels' => 'PDF',
            'references' => [['type' => 'NRORDER', 'reference' => self::text($order->reference . '-R', 50, 'Bestelreferentie', true)]],
            'addresses' => [$pickup, $consignor],
            'text_messages' => [['type' => 'AFLINFO', 'remarks' => $message]],
            'shipment_units' => $units,
        ];
    }

    private function getClient(Order $order): ExportOrdersMultipleCollies
    {
        if ($this->client) {
            return $this->client;
        }
        $context = Context::getContext();
        $previousShop = $context->shop;
        $previousLanguage = $context->language;
        try {
            $context->shop = new Shop((int) $order->id_shop);
            $context->language = new Language((int) $order->id_lang);
            return new ExportOrdersMultipleCollies((int) $order->id, [], false);
        } finally {
            $context->shop = $previousShop;
            $context->language = $previousLanguage;
        }
    }

    private static function rejectionMessage(array $response, int $status): string
    {
        $message = 'Transmission heeft de retouraanvraag afgewezen. Controleer de adres- en pakketgegevens en open het formulier opnieuw.';
        // Only expose documented validation errors, never raw transport/authentication exceptions.
        if (!in_array($status, [400, 406, 422], true)) {
            return $message;
        }
        $errors = $response['meta']['error_list'] ?? [];
        $details = [];
        if (is_array($errors)) {
            foreach (array_slice($errors, 0, 5) as $error) {
                if (is_array($error) && is_string($error[1] ?? null)) {
                    $detail = trim(preg_replace('/[\x00-\x1F]/', ' ', strip_tags($error[1])) ?? '');
                    if ($detail !== '') {
                        $details[] = mb_substr($detail, 0, 150);
                    }
                }
            }
        }
        return $details ? $message . ' ' . implode('; ', $details) : $message;
    }

    private static function extractLabels($labels): array
    {
        if (!is_array($labels)) {
            return [];
        }
        if (array_key_exists('label_content', $labels)) {
            $labels = [$labels];
        }
        $result = [];
        $bytes = 0;
        foreach ($labels as $label) {
            $encoded = is_array($label) ? ($label['label_content'] ?? null) : null;
            if (!is_string($encoded)) {
                continue;
            }
            // Existing Transmission label responses contain base64 data.
            $content = str_starts_with($encoded, '%PDF-') ? $encoded : base64_decode($encoded, true);
            if ($content === false || !str_starts_with($content, '%PDF-')) {
                continue;
            }
            $bytes += strlen($content);
            if ($bytes > 10 * 1024 * 1024 || count($result) >= 100) {
                return []; // Avoid exceeding the dedicated MEDIUMTEXT label storage.
            }
            $result[] = base64_encode($content);
        }
        return $result;
    }

    private static function text($value, int $max, string $field, bool $required = false): string
    {
        if (!is_scalar($value) && $value !== null) {
            throw new InvalidArgumentException($field . ' is ongeldig.');
        }
        $value = trim((string) $value);
        if (($required && $value === '') || mb_strlen($value) > $max || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', $value)) {
            throw new InvalidArgumentException($field . ' ontbreekt of is te lang (maximaal ' . $max . ' tekens).');
        }
        return $value;
    }

    private function validateOrder(Order $order): void
    {
        if (!Validate::isLoadedObject($order) || (int) $order->id_shop < 1) {
            throw new InvalidArgumentException('Bestelling niet gevonden.');
        }
    }

    private function find(Order $order): ?array
    {
        $rows = $this->db->executeS('SELECT ' . self::COLUMNS . ' FROM `' . _DB_PREFIX_ . self::TABLE . '` WHERE ' . $this->scope($order) . ' LIMIT 1', true, false);
        if (!is_array($rows)) {
            throw new RuntimeException('De opgeslagen retouraanvraag kon niet worden gelezen.');
        }
        if (!$rows) {
            return null;
        }
        $record = $rows[0];
        $record['id'] = $record['return_id'] = (int) $record['id_return'];
        $record['label_count'] = (int) $record['label_count'];
        return $record;
    }

    private function finish(Order $order, string $requestKey, array $values): array
    {
        $values['date_upd'] = date('Y-m-d H:i:s');
        $assignments = [];
        foreach ($values as $key => $value) {
            $assignments[] = '`' . $key . '` = ' . $this->quote((string) $value);
        }
        $this->execute('UPDATE `' . _DB_PREFIX_ . self::TABLE . '` SET ' . implode(', ', $assignments)
            . ' WHERE ' . $this->scope($order) . ' AND request_key = ' . $this->quote($requestKey));
        $record = $this->find($order);
        if (!$record || $record['request_key'] !== $requestKey) {
            throw new RuntimeException('De retourbevestiging kon niet worden opgeslagen. Controleer het Transmission-portaal.');
        }
        return $record;
    }

    private function scope(Order $order): string
    {
        return 'id_shop = ' . (int) $order->id_shop . ' AND id_order = ' . (int) $order->id;
    }

    private function quote(string $value): string
    {
        return "'" . pSQL($value, true) . "'";
    }

    private function execute(string $sql): void
    {
        if (!$this->db->execute($sql)) {
            throw new RuntimeException('De retouraanvraag kon niet worden opgeslagen. Controleer bestaande retouren in het Transmission-portaal.');
        }
    }

    private function ensureStorage(): void
    {
        if ($this->storageReady) {
            return;
        }
        $this->execute('CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . self::TABLE . '` (
            id_return INT UNSIGNED NOT NULL AUTO_INCREMENT,
            id_shop INT UNSIGNED NOT NULL,
            id_order INT UNSIGNED NOT NULL,
            id_employee INT UNSIGNED NOT NULL,
            request_key VARCHAR(64) NOT NULL,
            status VARCHAR(16) NOT NULL,
            tracking_number VARCHAR(100) NOT NULL,
            tracking_url VARCHAR(2048) NOT NULL,
            labels MEDIUMTEXT NOT NULL,
            label_count INT UNSIGNED NOT NULL DEFAULT 0,
            message TEXT NOT NULL,
            date_add DATETIME NOT NULL,
            date_upd DATETIME NOT NULL,
            PRIMARY KEY (id_return),
            UNIQUE KEY order_return (id_shop, id_order)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
        $this->storageReady = true;
    }
}
