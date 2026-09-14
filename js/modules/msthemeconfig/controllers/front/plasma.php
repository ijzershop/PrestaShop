<?php

declare(strict_types=1);

use MsThemeConfig\Plasma\PlasmaService;

if (!defined('_PS_VERSION_')) {
    exit;
}

class msthemeconfigPlasmaModuleFrontController extends ModuleFrontController
{
    public $ssl = true;

    public function postProcess(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store, private');
        header('X-Content-Type-Options: nosniff');
        try {
            if ($_SERVER['REQUEST_METHOD'] !== 'POST'
                || !is_string(Tools::getValue('token'))
                || !hash_equals(Tools::getToken(false), Tools::getValue('token'))) {
                http_response_code(403);
                throw new DomainException('Your session has expired. Refresh the page and try again.');
            }
            $service = new PlasmaService($this->context);
            $productId = $this->integer('id_product', 1);
            $combinationId = $this->integer('id_product_attribute', 0, 0);
            if (!PlasmaService::enabled($productId)) {
                throw new DomainException('Plasma cutting is unavailable for this product.');
            }
            switch ((string) Tools::getValue('action')) {
                case 'library':
                    $result = ['success' => true, 'parts' => $service->libraryParts((string) Tools::getValue('search', ''))];
                    break;
                case 'upload':
                    $result = $service->uploadQuote($productId, $combinationId, $_FILES['drawing'] ?? []);
                    break;
                case 'quote':
                    $libraryId = $this->integer('library_id', 0, 0);
                    $result = $libraryId > 0
                        ? $service->libraryQuote($productId, $combinationId, $libraryId)
                        : $service->quote((string) Tools::getValue('quote_id'), $productId, $combinationId, $this->integer('quantity', 1, 1));
                    break;
                case 'configure':
                    $selection = Tools::getValue('enabled_contours', '[]');
                    $contours = is_string($selection) ? json_decode($selection, true) : null;
                    if (!is_array($contours) || !array_is_list($contours)) {
                        throw new DomainException('Select valid cutting contours.');
                    }
                    $result = $service->configure((string) Tools::getValue('quote_id'), $productId, $combinationId, $contours,
                        $this->decimal('offset_x_mm'), $this->decimal('offset_y_mm'), $this->integer('quantity', 1, 1));
                    break;
                case 'add':
                    $result = $service->addToCart((string) Tools::getValue('quote_id'), $productId, $combinationId, $this->integer('quantity', 1, 1));
                    break;
                default:
                    throw new DomainException('Unknown plasma action.');
            }
        } catch (DomainException $error) {
            $result = ['success' => false, 'error_message' => $error->getMessage()];
        } catch (Throwable $error) {
            PrestaShopLogger::addLog('Plasma processing: ' . $error->getMessage(), 3);
            http_response_code(500);
            $result = ['success' => false, 'error_message' => 'The plasma configuration could not be processed. Please try again or contact the shop.'];
        }
        $this->ajaxRender(json_encode($result, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE));
        exit;
    }

    private function integer(string $name, int $minimum, ?int $default = null): int
    {
        $value = Tools::getValue($name, $default);
        if (!is_scalar($value) || !preg_match('/\A\d{1,10}\z/', (string) $value) || (int) $value < $minimum || (int) $value > 2147483647) {
            throw new DomainException('Invalid ' . str_replace('_', ' ', $name) . '.');
        }
        return (int) $value;
    }

    private function decimal(string $name): float
    {
        $value = Tools::getValue($name, 0);
        if (!is_scalar($value) || !is_numeric($value) || !is_finite((float) $value)) {
            throw new DomainException('Invalid sheet position.');
        }
        return (float) $value;
    }
}
