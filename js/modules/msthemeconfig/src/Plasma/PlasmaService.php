<?php

declare(strict_types=1);

namespace MsThemeConfig\Plasma;

use DomainException;
use RuntimeException;
use Symfony\Component\Process\Process;

/** Coordinates private drawing assets, authoritative quotes and native cart customizations. */
final class PlasmaService
{
    private \Context $context;
    private \Db $db;

    public function __construct(?\Context $context = null)
    {
        $this->context = $context ?? \Context::getContext();
        $this->db = \Db::getInstance();
    }

    public static function enabled(int $productId, ?int $shopId = null): bool
    {
        $shopId = $shopId ?? (int) \Context::getContext()->shop->id;
        return (bool) PlasmaSettings::get('ENABLED', $shopId, false)
            && !empty(PlasmaSettings::product($productId, $shopId)['enabled']);
    }

    public function libraryParts(string $search = ''): array
    {
        $search = mb_substr(trim($search), 0, 100);
        $where = $search === '' ? '' : " AND (display_name LIKE '%" . pSQL($this->escapeLike($search)) . "%' OR category LIKE '%" . pSQL($this->escapeLike($search)) . "%')";
        return $this->db->executeS('SELECT id_cutfile, display_name, category FROM `' . _DB_PREFIX_ . 'plasma_cutfile_library`
            WHERE active=1 AND id_shop=' . (int) $this->context->shop->id . $where . ' ORDER BY category,display_name LIMIT 200') ?: [];
    }

    public function importLibrary(array $upload, string $name, string $category): int
    {
        $name = trim($name);
        $category = trim($category) ?: 'General';
        if ($name === '' || mb_strlen($name) > 255 || mb_strlen($category) > 100 || !\Validate::isGenericName($name) || !\Validate::isGenericName($category)) {
            throw new DomainException('Enter a valid part name and category.');
        }
        $asset = $this->parseUpload($upload);
        $metrics = $asset['metrics'];
        // A master part can only be advertised as pre-verified after all diagnostics pass.
        PlasmaCalculator::calculate($metrics, ['feed_rate' => 1, 'pierce_time' => 0, 'lead_in_length' => 0, 'operating_cost_per_minute' => 1], 0);
        $this->must($this->db->insert('plasma_cutfile_library', [
            'id_shop' => (int) $this->context->shop->id,
            'filename' => pSQL($asset['filename']), 'display_name' => pSQL($name), 'category' => pSQL($category),
            'raw_geometry_length_mm' => (float) $metrics['total_length_mm'], 'total_pierces' => (int) $metrics['total_pierces'],
            'part_width_mm' => (float) $metrics['part_width_mm'], 'part_height_mm' => (float) $metrics['part_height_mm'],
            'asset_key' => $asset['asset_key'], 'metrics_json' => pSQL($this->json($metrics), true), 'date_add' => date('Y-m-d H:i:s'),
        ]));
        return (int) $this->db->Insert_ID();
    }

    public function uploadQuote(int $productId, int $combinationId, array $upload): array
    {
        $this->product($productId, $combinationId);
        $this->ensureCart();
        $this->rateLimit();
        $asset = $this->parseUpload($upload);
        return $this->newQuote($productId, $combinationId, $asset['asset_key'], $asset['metrics'], $asset['filename']);
    }

    public function libraryQuote(int $productId, int $combinationId, int $libraryId): array
    {
        $this->product($productId, $combinationId);
        $this->ensureCart();
        $part = $this->db->getRow('SELECT * FROM `' . _DB_PREFIX_ . 'plasma_cutfile_library` WHERE id_cutfile=' . $libraryId
            . ' AND active=1 AND id_shop=' . (int) $this->context->shop->id);
        if (!$part) {
            throw new DomainException('This library part is unavailable.');
        }
        $metrics = $this->decode($part['metrics_json']);
        $this->verifyAssets($part['asset_key'], $metrics);
        return $this->newQuote($productId, $combinationId, $part['asset_key'], $metrics, $part['display_name'], $libraryId);
    }

    public function quote(string $quoteId, int $productId, int $combinationId, int $quantity = 1): array
    {
        $row = $this->ownedQuote($quoteId, $productId, $combinationId);
        return $this->quoteResponse($row, $quantity);
    }

    /** Rebuild a private immutable drawing revision from the original, never from client SVG. */
    public function configure(string $quoteId, int $productId, int $combinationId, array $contours, float $offsetX, float $offsetY, int $quantity = 1): array
    {
        $row = $this->ownedQuote($quoteId, $productId, $combinationId);
        $this->product($productId, $combinationId);
        $metrics = $this->decode($row['metrics_json']);
        $this->verifyAssets($row['asset_key'], $metrics);
        if (!is_finite($offsetX) || !is_finite($offsetY) || $offsetX < 0 || $offsetY < 0 || $offsetX > 1000 || $offsetY > 500
            || count($contours) > 1000 || count(array_unique($contours, SORT_REGULAR)) !== count($contours)) {
            throw new DomainException('Choose valid cutting contours and a position within the sheet.');
        }
        $allowed = array_column($metrics['contours'] ?? [], 'id');
        foreach ($contours as $id) {
            if (!is_int($id) || !in_array($id, $allowed, true)) {
                throw new DomainException('Invalid cutting contour.');
            }
        }
        $this->rateLimit();
        $extension = $metrics['source_extension'] ?? '';
        if (!in_array($extension, ['svg', 'dxf'], true)) {
            throw new DomainException('The original drawing is unavailable. Upload it again.');
        }
        $assetKey = bin2hex(random_bytes(32));
        $directory = $this->assetDirectory($assetKey, true);
        $input = $directory . '/source.' . $extension;
        if (!copy($this->assetDirectory($row['asset_key']) . '/source.' . $extension, $input)) {
            throw new RuntimeException('The drawing revision could not be created.');
        }
        $updated = $this->processAsset($input, $directory, [
            '--selected-contours', implode(',', $contours), '--offset-x', (string) $offsetX, '--offset-y', (string) $offsetY,
        ]);
        return $this->newQuote($productId, $combinationId, $assetKey, $updated, $row['display_name'], (int) $row['id_cutfile'], $quantity);
    }

    private function newQuote(int $productId, int $combinationId, string $assetKey, array $metrics, string $name, int $libraryId = 0, int $quantity = 1): array
    {
        $row = [
            'quote_id' => bin2hex(random_bytes(32)), 'id_shop' => (int) $this->context->shop->id,
            'id_cart' => (int) $this->context->cart->id, 'owner_hash' => $this->ownerHash(),
            'id_product' => $productId, 'id_product_attribute' => $combinationId, 'id_cutfile' => $libraryId,
            'asset_key' => $assetKey, 'display_name' => mb_substr($name, 0, 255), 'metrics_json' => $this->json($metrics),
            'machine_json' => '{}', 'surcharge' => 0,
            'expires_at' => date('Y-m-d H:i:s', time() + 7200), 'date_add' => date('Y-m-d H:i:s'),
        ];
        $data = $row;
        foreach (['display_name', 'metrics_json', 'machine_json'] as $key) {
            $data[$key] = pSQL($data[$key], true);
        }
        $this->must($this->db->insert('plasma_quote', $data));
        return $this->quoteResponse($row, $quantity);
    }

    private function quoteResponse(array $row, int $quantity = 1): array
    {
        $quantity = $this->quantity($quantity);
        $product = $this->product((int) $row['id_product'], (int) $row['id_product_attribute']);
        $metrics = $this->decode($row['metrics_json']);
        $this->verifyAssets($row['asset_key'], $metrics);
        $response = ['success' => false, 'quote_id' => $row['quote_id'], 'metrics' => $this->publicMetrics($metrics),
            'preview_svg' => $this->preview($row['asset_key']), 'preview_rotation_degrees' => (int) ($metrics['rotation_degrees'] ?? 0), 'error_message' => null];
        if (($metrics['success'] ?? null) !== true || (!empty($metrics['error_message']) && ($metrics['diagnostics']['is_safe_to_cut'] ?? null) !== true)) {
            $response['error_message'] = $metrics['error_message'] ?? 'Select at least one closed cutting contour.';
            return $response;
        }
        try {
            $machine = PlasmaSettings::resolveProduct((int) $product->id, (int) $row['id_product_attribute'], (int) $this->context->shop->id, (int) $this->context->language->id);
            $baseExcl = $this->basePrice((int) $product->id, (int) $row['id_product_attribute'], false, $quantity);
            $quote = PlasmaCalculator::calculate($metrics, $machine, 0);
            $quote['rotation_degrees'] = (int) ($metrics['rotation_degrees'] ?? $quote['rotation_degrees']);
            $surchargeDefault = $quote['surcharge_excl'];
            $surcharge = (float) \Tools::convertPrice($surchargeDefault, $this->context->currency);
            $taxedSurcharge = $this->taxedSurcharge($product, $surcharge);
            $quote['surcharge_excl'] = $surcharge;
            $quote['total_price_excl'] = $baseExcl + $surcharge;
            $quote['total_price_incl'] = $this->basePrice((int) $product->id, (int) $row['id_product_attribute'], true, $quantity) + $taxedSurcharge;
            $displayPrice = \Product::getTaxCalculationMethod((int) $this->context->customer->id) === PS_TAX_EXC ? $quote['total_price_excl'] : $quote['total_price_incl'];
            $quote['formatted_total'] = $this->context->getCurrentLocale()->formatPrice($displayPrice, $this->context->currency->iso_code);
            $quote['tax_included'] = \Product::getTaxCalculationMethod((int) $this->context->customer->id) !== PS_TAX_EXC;
            $quote['quantity'] = $quantity;
            $quote['material'] = $machine['material'];
            $quote['thickness_mm'] = $machine['thickness'];
            $this->must($this->db->update('plasma_quote', [
                'machine_json' => pSQL($this->json($machine), true), 'surcharge' => $surchargeDefault,
            ], "quote_id='" . pSQL($row['quote_id']) . "' AND id_customization IS NULL"));
            $response['success'] = true;
            $response['quote'] = $quote;
        } catch (DomainException $error) {
            $response['error_message'] = $error->getMessage();
        }
        return $response;
    }

    public function addToCart(string $quoteId, int $productId, int $combinationId, int $quantity): array
    {
        $quantity = $this->quantity($quantity);
        $row = $this->ownedQuote($quoteId, $productId, $combinationId);
        $response = $this->quoteResponse($row, $quantity);
        if (!$response['success']) {
            return $response;
        }
        $product = $this->product($productId, $combinationId);
        $this->verifyAssets($row['asset_key'], $this->decode($row['metrics_json']));
        // Serialize duplicate browser submissions for this quote and preserve a single cart line.
        $this->must($this->db->execute('START TRANSACTION'));
        try {
            $rows = $this->db->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'plasma_quote` WHERE quote_id=\'' . pSQL($quoteId) . '\' FOR UPDATE', true, false);
            $locked = $rows[0] ?? null;
            if (!$locked) {
                throw new DomainException('The quote is no longer available.');
            }
            if (!empty($locked['id_customization'])) {
                throw new DomainException('This drawing was already added. Change its quantity in your cart.');
            }
            $custom = new \Customization();
            $custom->id_product = $productId;
            $custom->id_product_attribute = $combinationId;
            $custom->id_cart = (int) $this->context->cart->id;
            $custom->id_address_delivery = (int) $this->context->cart->id_address_delivery;
            $custom->quantity = 0;
            $custom->quantity_refunded = 0;
            $custom->quantity_returned = 0;
            $custom->in_cart = 0;
            $this->must($custom->add());
            $fieldId = $this->customizationField($productId);
            $metrics = $this->decode($row['metrics_json']);
            $description = sprintf('Plasma: %s | 1000 x 500 mm full sheet | %.2f x %.2f mm | %d pierces',
                $row['display_name'], $metrics['part_width_mm'], $metrics['part_height_mm'], $metrics['total_pierces']);
            $this->must($this->db->insert('customized_data', ['id_customization' => (int) $custom->id,
                'type' => \Product::CUSTOMIZE_TEXTFIELD, 'index' => $fieldId, 'id_module' => 0,
                'value' => pSQL(mb_substr($description, 0, 1000)), 'price' => 0, 'weight' => 0]));
            $this->must($this->db->update('plasma_quote', ['id_customization' => (int) $custom->id], "quote_id='" . pSQL($quoteId) . "'"));
            $result = $this->context->cart->updateQty($quantity, $productId, $combinationId, (int) $custom->id);
            if ($result !== true) {
                throw new DomainException($result === -1 ? 'The requested quantity is below the minimum order quantity.' : 'The requested sheet quantity is unavailable.');
            }
            // The shop's SSA cart implementation still uses legacy customization quantities.
            $this->must($this->db->update('customization', ['in_cart' => 1, 'quantity' => $quantity],
                'id_customization=' . (int) $custom->id . ' AND id_cart=' . (int) $this->context->cart->id));
            $this->must($this->db->execute('COMMIT'));
            return ['success' => true, 'id_product' => $productId, 'id_product_attribute' => $combinationId,
                'id_customization' => (int) $custom->id, 'cart_url' => $this->context->link->getPageLink('cart', true, null, ['action' => 'show'])];
        } catch (\Throwable $error) {
            $this->db->execute('ROLLBACK');
            throw $error;
        }
    }

    private function customizationField(int $productId): int
    {
        $fieldId = (int) $this->db->getValue('SELECT id_customization_field FROM `' . _DB_PREFIX_ . 'customization_field`
            WHERE id_product=' . $productId . ' AND is_module=1 AND is_deleted=0 AND type=' . \Product::CUSTOMIZE_TEXTFIELD);
        if (!$fieldId) {
            $this->must($this->db->insert('customization_field', ['id_product' => $productId, 'type' => \Product::CUSTOMIZE_TEXTFIELD,
                'required' => 0, 'is_module' => 1, 'is_deleted' => 0]));
            $fieldId = (int) $this->db->Insert_ID();
            foreach (\Shop::getShops(false, null, true) as $shopId) {
                foreach (\Language::getLanguages(false) as $lang) {
                    $this->must($this->db->insert('customization_field_lang', ['id_customization_field' => $fieldId,
                        'id_shop' => (int) $shopId, 'id_lang' => (int) $lang['id_lang'], 'name' => 'Plasma drawing']));
                }
            }
        }
        // Native cart presenters only load customized lines when this feature is enabled.
        \Configuration::updateGlobalValue('PS_CUSTOMIZATION_FEATURE_ACTIVE', 1);
        return $fieldId;
    }

    private function ownedQuote(string $quoteId, int $productId, int $combinationId): array
    {
        $this->key($quoteId);
        $row = $this->db->getRow('SELECT * FROM `' . _DB_PREFIX_ . 'plasma_quote` WHERE quote_id=\'' . pSQL($quoteId)
            . '\' AND id_shop=' . (int) $this->context->shop->id . ' AND id_cart=' . (int) $this->context->cart->id
            . ' AND id_product=' . $productId . ' AND id_product_attribute=' . $combinationId, false);
        if (!$row || !hash_equals($row['owner_hash'], $this->ownerHash()) || strtotime($row['expires_at']) < time()) {
            throw new DomainException('This quote has expired or is unavailable. Please select your drawing again.');
        }
        if (!empty($row['id_customization'])) {
            throw new DomainException('This drawing was already added. Change its quantity in your cart.');
        }
        return $row;
    }

    private function product(int $productId, int $combinationId): \Product
    {
        $product = new \Product($productId, false, (int) $this->context->language->id, (int) $this->context->shop->id);
        if (!\Validate::isLoadedObject($product) || !$product->active || !$product->available_for_order
            || \Configuration::isCatalogMode() || !self::enabled($productId)
            || !$product->checkAccess((int) $this->context->customer->id)
            || !$this->db->getValue('SELECT id_product FROM `' . _DB_PREFIX_ . 'product_shop` WHERE id_product=' . $productId . ' AND id_shop=' . (int) $this->context->shop->id)) {
            throw new DomainException('Plasma cutting is unavailable for this product.');
        }
        if ($combinationId > 0) {
            $combination = new \Combination($combinationId, null, (int) $this->context->shop->id);
            if (!\Validate::isLoadedObject($combination) || (int) $combination->id_product !== $productId
                || !$this->db->getValue('SELECT id_product_attribute FROM `' . _DB_PREFIX_ . 'product_attribute_shop` WHERE id_product_attribute=' . $combinationId . ' AND id_shop=' . (int) $this->context->shop->id)) {
                throw new DomainException('Select a valid sheet variant.');
            }
        } elseif ((int) \Product::getDefaultAttribute($productId) > 0) {
            throw new DomainException('Select a sheet variant before configuring plasma cutting.');
        }
        return $product;
    }

    private function ensureCart(): void
    {
        if (!$this->context->cart->id) {
            $this->context->cart->id_shop = (int) $this->context->shop->id;
            $this->context->cart->id_shop_group = (int) $this->context->shop->id_shop_group;
            $this->context->cart->id_currency = (int) $this->context->currency->id;
            $this->context->cart->id_lang = (int) $this->context->language->id;
            $this->context->cart->id_customer = (int) $this->context->customer->id;
            $this->context->cart->id_guest = (int) $this->context->cookie->id_guest;
            $this->context->cart->secure_key = (string) $this->context->customer->secure_key;
            $this->must($this->context->cart->add());
            $this->context->cookie->id_cart = (int) $this->context->cart->id;
            $this->context->cookie->write();
        }
    }

    private function ownerHash(): string
    {
        if (!preg_match('/\A[a-f0-9]{64}\z/', (string) $this->context->cookie->plasma_session)) {
            $this->context->cookie->plasma_session = bin2hex(random_bytes(32));
            $this->context->cookie->write();
        }
        return hash('sha256', (string) $this->context->cookie->plasma_session);
    }

    private function parseUpload(array $upload): array
    {
        $filename = basename(str_replace('\\', '/', (string) ($upload['name'] ?? '')));
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if (($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || !in_array($extension, ['dxf', 'svg'], true)
            || !is_uploaded_file((string) ($upload['tmp_name'] ?? '')) || (int) ($upload['size'] ?? 0) < 1
            || (int) $upload['size'] > 10 * 1024 * 1024 || filesize($upload['tmp_name']) > 10 * 1024 * 1024) {
            throw new DomainException('Upload a DXF or SVG drawing of at most 10 MB.');
        }
        $assetKey = bin2hex(random_bytes(32));
        $directory = $this->assetDirectory($assetKey, true);
        $input = $directory . '/source.' . $extension;
        if (!move_uploaded_file($upload['tmp_name'], $input)) {
            throw new RuntimeException('The drawing could not be stored.');
        }
        return ['asset_key' => $assetKey, 'metrics' => $this->processAsset($input, $directory), 'filename' => mb_substr($filename, 0, 255)];
    }

    private function processAsset(string $input, string $directory, array $arguments = []): array
    {
        $binary = (string) PlasmaSettings::get('PYTHON_BINARY', (int) $this->context->shop->id, '');
        if ($binary === '') {
            throw new DomainException('The plasma drawing processor has not been configured.');
        }
        // The cutting engine rejects text, so it needs no fonts. ezdxf otherwise scans
        // user font directories during import, which fails for accounts without a home.
        $fontCache = $directory . '/.cache/ezdxf';
        if ((!is_dir($fontCache) && !mkdir($fontCache, 0700, true))
            || file_put_contents($fontCache . '/font_manager_cache.json', '{"version":2,"font-faces":[]}') === false) {
            throw new RuntimeException('The drawing processor cache could not be prepared.');
        }
        // Service accounts may have no user profile. Keep ezdxf configuration and cache
        // inside this private job and do not inherit an unrelated working-directory config.
        $process = new Process(array_merge([$binary, dirname(__DIR__, 2) . '/python/plasma_engine.py', $input, '--output-dir', $directory], $arguments), $directory, [
            'XDG_CONFIG_HOME' => $directory . '/.config',
            'XDG_CACHE_HOME' => $directory . '/.cache',
        ]);
        $process->setTimeout(45);
        $process->setIdleTimeout(40);
        $bytes = 0;
        $lease = null;
        for ($slot = 0; $slot < 2; ++$slot) {
            $handle = fopen(dirname($directory) . '/processor-' . $slot . '.lock', 'c');
            if ($handle && flock($handle, LOCK_EX | LOCK_NB)) {
                $lease = $handle;
                break;
            }
            if ($handle) {
                fclose($handle);
            }
        }
        if (!$lease) {
            throw new DomainException('The drawing processor is busy. Please try again shortly.');
        }
        try {
            $process->run(static function (string $type, string $buffer) use (&$bytes, $process): void {
                $bytes += strlen($buffer);
                if ($bytes > 1024 * 1024) {
                    $process->stop(0);
                    throw new RuntimeException('The drawing processor exceeded its output limit.');
                }
            });
        } catch (\Symfony\Component\Process\Exception\ProcessTimedOutException $error) {
            throw new DomainException('This drawing is too complex to process. Please simplify it.');
        } finally {
            flock($lease, LOCK_UN);
            fclose($lease);
        }
        $metrics = json_decode($process->getOutput(), true);
        if (!is_array($metrics) || !array_key_exists('success', $metrics)) {
            throw new RuntimeException('The drawing processor is unavailable. Check its Python environment.');
        }
        if (!is_file($directory . '/preview.svg') || !is_file($directory . '/optimized.dxf')) {
            throw new DomainException((string) ($metrics['error_message'] ?? 'The drawing could not be processed.'));
        }
        $metrics['source_extension'] = strtolower(pathinfo($input, PATHINFO_EXTENSION));
        foreach (['preview.svg', 'optimized.dxf', 'source.' . $metrics['source_extension']] as $file) {
            $metrics['asset_hashes'][$file] = hash_file('sha256', $directory . '/' . $file);
        }
        return $metrics;
    }

    public function assetDirectory(string $assetKey, bool $create = false): string
    {
        $this->key($assetKey);
        $root = _PS_ROOT_DIR_ . '/var/plasma';
        if (!is_dir($root) && (!mkdir($root, 0700, true) && !is_dir($root))) {
            throw new RuntimeException('The private drawing directory is unavailable.');
        }
        // Apache and IIS deny direct access. Other web servers must deny /var/ (deployment docs).
        foreach (['.htaccess' => "Require all denied\n", 'web.config' => '<?xml version="1.0"?><configuration><system.webServer><security><authorization><remove users="*" roles="" verbs=""/><add accessType="Deny" users="*"/></authorization></security></system.webServer></configuration>', 'index.php' => '<?php http_response_code(403); exit;'] as $file => $contents) {
            if (!is_file($root . '/' . $file) && file_put_contents($root . '/' . $file, $contents, LOCK_EX) === false) {
                throw new RuntimeException('Unable to protect the private drawing directory.');
            }
        }
        $path = $root . '/' . $assetKey;
        if ($create && !mkdir($path, 0700)) {
            throw new RuntimeException('The drawing directory could not be created.');
        }
        if (!is_dir($path) || realpath(dirname($path)) !== realpath($root) || is_link($path)) {
            throw new DomainException('The drawing files are unavailable.');
        }
        return $path;
    }

    private function verifyAssets(string $assetKey, array $metrics): void
    {
        $path = $this->assetDirectory($assetKey);
        $files = ['preview.svg', 'optimized.dxf'];
        if (isset($metrics['source_extension']) && in_array($metrics['source_extension'], ['svg', 'dxf'], true)) {
            $files[] = 'source.' . $metrics['source_extension'];
        }
        foreach ($files as $file) {
            if (!is_file($path . '/' . $file) || is_link($path . '/' . $file)
                || !isset($metrics['asset_hashes'][$file]) || !hash_equals($metrics['asset_hashes'][$file], hash_file('sha256', $path . '/' . $file))) {
                throw new DomainException('The drawing files have changed or are unavailable. Please upload the drawing again.');
            }
        }
    }

    private function preview(string $assetKey): string
    {
        $path = $this->assetDirectory($assetKey) . '/preview.svg';
        if (filesize($path) > 8 * 1024 * 1024) {
            throw new DomainException('The drawing preview is too complex.');
        }
        return (string) file_get_contents($path);
    }

    private function rateLimit(): void
    {
        // A server-side bucket limits CPU work even when cookies are cleared.
        $path = _PS_ROOT_DIR_ . '/var/plasma-rate-' . hash_hmac('sha256', (string) \Tools::getRemoteAddr(), _COOKIE_KEY_) . '.json';
        $handle = fopen($path, 'c+');
        if (!$handle || !flock($handle, LOCK_EX)) {
            throw new RuntimeException('The drawing processor is busy. Please try again.');
        }
        try {
            $bucket = json_decode((string) stream_get_contents($handle), true) ?: ['time' => time(), 'count' => 0];
            if ((int) $bucket['time'] < time() - 300) {
                $bucket = ['time' => time(), 'count' => 0];
            }
            if ((int) $bucket['count'] >= 20) {
                throw new DomainException('Too many drawings processed. Please wait a few minutes.');
            }
            ++$bucket['count'];
            rewind($handle);
            ftruncate($handle, 0);
            fwrite($handle, $this->json($bucket));
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }

    public function orderFiles(int $orderId): array
    {
        return $this->db->executeS('SELECT q.id_customization,q.display_name,q.asset_key,q.metrics_json,od.product_quantity
            FROM `' . _DB_PREFIX_ . 'plasma_quote` q
            INNER JOIN `' . _DB_PREFIX_ . 'order_detail` od ON od.id_customization=q.id_customization AND od.product_id=q.id_product AND od.product_attribute_id=q.id_product_attribute
            INNER JOIN `' . _DB_PREFIX_ . 'orders` o ON o.id_order=od.id_order AND o.id_cart=q.id_cart AND o.id_shop=q.id_shop
            WHERE o.id_order=' . $orderId . ' AND o.id_shop IN (' . implode(',', array_map('intval', \Shop::getContextListShopID())) . ')') ?: [];
    }

    public function orderAsset(int $orderId, int $customizationId, string $type): array
    {
        if (!in_array($type, ['dxf', 'svg'], true)) {
            throw new DomainException('Invalid drawing format.');
        }
        foreach ($this->orderFiles($orderId) as $row) {
            if ((int) $row['id_customization'] !== $customizationId) {
                continue;
            }
            $this->verifyAssets($row['asset_key'], $this->decode($row['metrics_json']));
            return ['path' => $this->assetDirectory($row['asset_key']) . ($type === 'dxf' ? '/optimized.dxf' : '/preview.svg'),
                'filename' => 'plasma-order-' . $orderId . '-part-' . $customizationId . '.' . $type,
                'mime' => $type === 'dxf' ? 'application/dxf' : 'image/svg+xml'];
        }
        throw new DomainException('This drawing does not belong to the selected order.');
    }

    private function basePrice(int $productId, int $combinationId, bool $tax, int $quantity): float
    {
        $specific = null;
        return (float) \Product::getPriceStatic($productId, $tax, $combinationId ?: false, 6, null, false, true, $quantity,
            false, (int) $this->context->customer->id, (int) $this->context->cart->id ?: null,
            (int) $this->context->cart->{\Configuration::get('PS_TAX_ADDRESS_TYPE')} ?: null, $specific, true, true, $this->context, true, 0);
    }

    private function taxedSurcharge(\Product $product, float $surcharge): float
    {
        $address = \Address::initialize((int) $this->context->cart->{\Configuration::get('PS_TAX_ADDRESS_TYPE')}, true);
        if (!\Configuration::get('PS_TAX') || (!empty($address->vat_number)
            && $address->id_country != \Configuration::get('VATNUMBER_COUNTRY') && \Configuration::get('VATNUMBER_MANAGEMENT'))) {
            return $surcharge;
        }
        return (float) \TaxManagerFactory::getManager($address, $product->id_tax_rules_group)->getTaxCalculator()->addTaxes($surcharge);
    }

    private function quantity(int $quantity): int
    {
        if ($quantity < 1 || $quantity > 100) {
            throw new DomainException('Enter a whole-sheet quantity between 1 and 100.');
        }
        return $quantity;
    }

    private function key(string $value): void
    {
        if (!preg_match('/\A[a-f0-9]{64}\z/', $value)) {
            throw new DomainException('Invalid drawing reference.');
        }
    }

    private function publicMetrics(array $metrics): array
    {
        unset($metrics['asset_hashes'], $metrics['source_extension'], $metrics['preview_filename'], $metrics['optimized_filename']);
        return $metrics;
    }

    private function decode(string $value): array
    {
        $result = json_decode($value, true, 64, JSON_THROW_ON_ERROR);
        if (!is_array($result)) {
            throw new RuntimeException('Invalid stored drawing data.');
        }
        return $result;
    }

    private function json(array $value): string
    {
        return json_encode($value, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    }

    private function escapeLike(string $value): string
    {
        return str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $value);
    }

    private function must($result): void
    {
        if (!$result) {
            throw new RuntimeException('The plasma configuration could not be saved.');
        }
    }
}
