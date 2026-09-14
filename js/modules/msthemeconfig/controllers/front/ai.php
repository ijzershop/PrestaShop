<?php

use MsThemeConfig\AI\Search\CatalogSearch;

if (!defined('_PS_VERSION_')) {
    exit;
}

class msthemeconfigAiModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        $this->ajax = true;
        parent::initContent();

        $action = Tools::getValue('action');

        try {
            switch ($action) {
                case 'contextualSearch':
                    $this->handleContextualSearch();
                    break;
                case 'parseDimensions':
                    $this->handleParseDimensions();
                    break;
                default:
                    $this->sendError('Deze actie is niet beschikbaar.', 400);
            }
        } catch (Throwable $e) {
            $this->sendError('Er ging iets mis bij het verwerken van uw vraag. Probeer het later opnieuw.', 503);
        }
    }

    protected function handleContextualSearch()
    {
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
            $this->sendError('Verstuur uw zoekvraag via het zoekveld.', 405);
            return;
        }
        $shop = $this->context->shop;
        if ((int) Configuration::get('MSTHEMECONFIG_AI_FRONTEND_ENABLED', (int) $this->context->language->id,
            (int) $shop->id_shop_group, (int) $shop->id, 0) !== 1) {
            $this->sendError('De zoekassistent is momenteel niet beschikbaar.', 403);
            return;
        }
        $query = Tools::getValue('query');
        if (!is_string($query) || trim($query) === '' || !mb_check_encoding($query, 'UTF-8')
            || mb_strlen($query, 'UTF-8') > 500 || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $query)) {
            $this->sendError('Vul een zoekvraag van maximaal 500 tekens in.', 400);
            return;
        }
        try {
            $response = $this->createCatalogSearch()->search((int) $shop->id, trim($query));
        } catch (Throwable $e) {
            // Do not disclose local paths, database details or parser internals to visitors.
            $this->sendError('Zoeken is tijdelijk niet beschikbaar. Probeer het later opnieuw.', 503);
            return;
        }
        $this->sendResponse($response);
    }

    protected function createCatalogSearch(): CatalogSearch
    {
        return new CatalogSearch(dirname(__DIR__, 2) . '/config/ai-search-policy.json', _PS_ROOT_DIR_ . '/var/ai-search');
    }

    protected function handleParseDimensions()
    {
        $text = Tools::getValue('text');
        if (empty($text)) {
            $this->sendError('Vul een omschrijving met afmetingen in.', 400);
        }

        // Mocking AI parsing logic
        // Example: "plate of 10cm by 10cm" -> {width: 100, length: 100}

        $width = 0;
        $height = 0;

        // Simple regex-based fallback for demo purposes if AI is not configured
        if (preg_match('/(\d+)\s*(cm|mm)\s*(x|by)\s*(\d+)\s*(cm|mm)/i', $text, $matches)) {
            $val1 = (float)$matches[1];
            $unit1 = strtolower($matches[2]);
            $val2 = (float)$matches[4];
            $unit2 = strtolower($matches[5]);

            $width = ($unit1 === 'cm') ? $val1 * 10 : $val1;
            $height = ($unit2 === 'cm') ? $val2 * 10 : $val2;
        }

        $this->sendResponse([
            'width' => $width,
            'height' => $height,
            'original_text' => $text
        ]);
    }

    protected function sendResponse($data)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        die(json_encode(array_merge(['success' => true], $data), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }

    protected function sendError($message, $status = 400)
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        die(json_encode(['success' => false, 'response_language' => 'nl', 'error' => $message], JSON_UNESCAPED_UNICODE));
    }
}
