<?php
/**
 * MsThemeConfig module — SuperAdmin AI CMS page content panel
 * Generates/edits PrestaShop CMS page content via AI.
 */

use PrestaShop\PrestaShop\Adapter\Validate;

if (!defined('_PS_VERSION_')) {
    exit;
}

class MsAdminAICmsController extends ModuleAdminController
{
    public function __construct()
    {
        parent::__construct();
        $this->bootstrap = true;
        $this->show_page_header = true;
        $this->context = Context::getContext();
        $this->translator = $this->context->getTranslator();
        $this->meta_title = $this->translator->trans('AI CMS pages', [], 'Modules.MsThemeConfig.AIController');
    }

    public function initContent()
    {
        if (!$this->context->employee || !$this->context->employee->isSuperAdmin()) {
            parent::initContent();
            $errorHtml = '<div class="panel"><div class="alert alert-danger">'
                . htmlspecialchars($this->translator->trans('Only SuperAdmin can access this page.', [], 'Modules.MsThemeConfig.AIController'))
                . '</div></div>';
            $this->context->smarty->assign('ms_inner_html', $errorHtml);
            $wrapperPath = _PS_MODULE_DIR_ . 'msthemeconfig' . DIRECTORY_SEPARATOR . 'views'
                . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'ai_cms_wrapper.tpl';
            $this->content .= $this->context->smarty->fetch($wrapperPath);
            $this->context->smarty->assign('content', $this->content);
            return;
        }

        if (Tools::getValue('ajax')) {
            $this->displayAjax();
            return;
        }

        $ajaxUrl = $this->context->link->getAdminLink('MsAdminAICms', true, [], ['ajax' => true]);

        $languages        = Language::getLanguages(true);
        $defaultLangId    = (int)Configuration::get('PS_LANG_DEFAULT');
        $contexts         = $this->loadContextFiles();
        $defaultSystemCtx = !empty($contexts) ? $contexts[0]['content'] : '';

        $vars = [
            'lite_display'             => true,
            'show_page_header_toolbar' => false,
            'ajax_url'                 => $ajaxUrl,
            'languages'                => $languages,
            'default_lang_id'          => $defaultLangId,
            'has_anthropic_key'        => !empty(Configuration::get('MSTHEMECONFIG_ANTHROPIC_KEY')),
            'has_grok_key'             => !empty(Configuration::get('MSTHEMECONFIG_GROK_KEY')),
            'has_openai_key'           => !empty(Configuration::get('MSTHEMECONFIG_OPENAI_KEY')),
            'has_copilot_key'          => !empty(Configuration::get('MSTHEMECONFIG_COPILOT_KEY')),
            'default_system_context'   => $defaultSystemCtx,
            'ai_contexts'              => $contexts,
        ];

        try {
            parent::initContent();
            if (!class_exists('Twig\\Loader\\FilesystemLoader')) {
                throw new Exception('Twig is not available');
            }
            $tplDir = _PS_MODULE_DIR_ . 'msthemeconfig' . DIRECTORY_SEPARATOR . 'views'
                . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'admin';
            $loader  = new Twig\Loader\FilesystemLoader($tplDir);
            $twigEnv = new Twig\Environment($loader, ['autoescape' => 'html']);
            $twigEnv->addFilter(new Twig\TwigFilter('trans', function ($message, array $parameters = [], $domain = null) {
                return $this->translator ? $this->translator->trans($message, $parameters, $domain) : $message;
            }));
            $html = $twigEnv->render('ai_cms.html.twig', $vars);
            $this->content .= $html;
            $this->context->smarty->assign('content', $this->content);
        } catch (Throwable $e) {
            parent::initContent();
            $this->content .= '<div class="panel"><div class="alert alert-danger">Twig rendering error: ' . htmlspecialchars($e->getMessage()) . '</div></div>';
            $this->context->smarty->assign('content', $this->content);
        }
    }

    public function displayAjax()
    {
        try {
            if (!$this->verifySuperAdmin()) {
                $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Access denied. SuperAdmin only.']));
            }

            $action = Tools::getValue('action');
            switch ($action) {
                case 'ListCmsPages':
                    $this->ajaxListCmsPages();
                    break;
                case 'GenerateDrafts':
                    $this->ajaxGenerateDrafts();
                    break;
                case 'SaveDrafts':
                    $this->ajaxSaveDrafts();
                    break;
                case 'GetConfig':
                    $this->ajaxGetConfig();
                    break;
                case 'SaveConfig':
                    $this->ajaxSaveConfig();
                    break;
                default:
                    $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Unknown action']));
            }
        } catch (Exception $e) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => $e->getMessage()]));
        }
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    /**
     * Load context files — puts 'cms' first if present, then 'default', then alphabetical.
     * Skips product-specific contexts (jsonld-qa) and category context.
     */
    private function loadContextFiles(): array
    {
        $ds  = DIRECTORY_SEPARATOR;
        $dir = _PS_MODULE_DIR_ . 'msthemeconfig' . $ds . 'config' . $ds . 'contexts';

        $contexts = [];
        if (is_dir($dir)) {
            $files = glob($dir . $ds . '*.txt') ?: [];
            usort($files, function ($a, $b) {
                $an = basename($a, '.txt');
                $bn = basename($b, '.txt');
                if ($an === 'cms')     return -1;
                if ($bn === 'cms')     return 1;
                if ($an === 'default') return -1;
                if ($bn === 'default') return 1;
                return strcasecmp($an, $bn);
            });
            foreach ($files as $file) {
                $name = basename($file, '.txt');
                if (in_array($name, ['jsonld-qa', 'categories'])) {
                    continue;
                }
                $label = $name === 'cms' ? 'CMS Pagina\'s (standaard)' : ucwords(str_replace(['-', '_'], ' ', $name));
                $contexts[] = [
                    'name'    => $name,
                    'label'   => $label,
                    'content' => (string)file_get_contents($file),
                ];
            }
        }

        if (empty($contexts)) {
            $fallback = _PS_MODULE_DIR_ . 'msthemeconfig' . $ds . 'config' . $ds . 'ai_system_context.txt';
            if (is_readable($fallback)) {
                $contexts[] = ['name' => 'default', 'label' => 'Default', 'content' => (string)file_get_contents($fallback)];
            }
        }

        return $contexts;
    }

    private function ajaxDie(string $output): void
    {
        header('Content-Type: application/json');
        die($output);
    }

    private function verifySuperAdmin(): bool
    {
        return $this->context->employee
            && Validate::isLoadedObject($this->context->employee)
            && $this->context->employee->isSuperAdmin();
    }

    // -------------------------------------------------------------------------
    // Config
    // -------------------------------------------------------------------------

    private static function providerConfigKey(string $provider): string
    {
        $map = [
            'anthropic' => 'MSTHEMECONFIG_ANTHROPIC_KEY',
            'grok'      => 'MSTHEMECONFIG_GROK_KEY',
            'openai'    => 'MSTHEMECONFIG_OPENAI_KEY',
            'copilot'   => 'MSTHEMECONFIG_COPILOT_KEY',
        ];
        return $map[$provider] ?? 'MSTHEMECONFIG_ANTHROPIC_KEY';
    }

    private function ajaxGetConfig(): void
    {
        $result = ['ok' => true];
        foreach (['anthropic', 'grok', 'openai', 'copilot'] as $p) {
            $result['has_' . $p . '_key'] = !empty(Configuration::get(self::providerConfigKey($p)));
        }
        $this->ajaxDie(json_encode($result));
    }

    private function ajaxSaveConfig(): void
    {
        $provider = trim((string)Tools::getValue('provider', 'anthropic'));
        $key      = trim((string)Tools::getValue('api_key', ''));
        if (empty($key)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'API key cannot be empty']));
        }
        Configuration::updateValue(self::providerConfigKey($provider), $key);
        $this->ajaxDie(json_encode(['ok' => true]));
    }

    // -------------------------------------------------------------------------
    // List CMS pages
    // -------------------------------------------------------------------------

    private function ajaxListCmsPages(): void
    {
        $idLang = (int)Tools::getValue('id_lang', (int)Configuration::get('PS_LANG_DEFAULT'));
        $idShop = (int)$this->context->shop->id;
        $prefix = pSQL(_DB_PREFIX_);

        $rows = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS("
            SELECT cp.id_cms,
                   cpl.meta_title,
                   cpl.link_rewrite,
                   cpl.content,
                   COALESCE(cpcl.name, '') AS cms_category_name
            FROM {$prefix}cms cp
            INNER JOIN {$prefix}cms_lang cpl
                ON cpl.id_cms = cp.id_cms AND cpl.id_lang = " . (int)$idLang . " AND cpl.id_shop = " . $idShop . "
            LEFT JOIN {$prefix}cms_category_lang cpcl
                ON cpcl.id_cms_category = cp.id_cms_category AND cpcl.id_lang = " . (int)$idLang . " AND cpcl.id_shop = " . $idShop . "
            ORDER BY cpcl.name, cpl.meta_title
        ") ?: [];

        foreach ($rows as &$row) {
            $row['has_content'] = !empty(trim(strip_tags((string)$row['content'])));
            $row['label'] = $row['meta_title'] ?: $row['link_rewrite'];
            if (!empty($row['cms_category_name'])) {
                $row['label'] = $row['cms_category_name'] . ' › ' . $row['label'];
            }
            unset($row['content']); // don't send full HTML in the list
        }
        unset($row);

        $this->ajaxDie(json_encode(['ok' => true, 'pages' => $rows]));
    }

    // -------------------------------------------------------------------------
    // Generate drafts
    // -------------------------------------------------------------------------

    private function ajaxGenerateDrafts(): void
    {
        $provider = trim((string)Tools::getValue('provider', 'anthropic'));
        $apiKey   = trim((string)Tools::getValue('api_key', ''));
        if (empty($apiKey)) {
            $apiKey = (string)Configuration::get(self::providerConfigKey($provider));
        }
        if (empty($apiKey)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'API key not configured.']));
        }

        $idLang = (int)Tools::getValue('id_lang', (int)Configuration::get('PS_LANG_DEFAULT'));
        if ($idLang <= 0) {
            $idLang = (int)Configuration::get('PS_LANG_DEFAULT');
        }

        $cmsIdsCsv = (string)Tools::getValue('cms_ids', '');
        $ids = array_values(array_unique(array_filter(array_map('intval', explode(',', $cmsIdsCsv)), function ($v) { return $v > 0; })));
        if (empty($ids)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'No CMS page IDs provided']));
        }

        $overwrite      = (Tools::getValue('overwrite', '0') === '1');
        $generateMeta   = (Tools::getValue('generate_meta', '1') !== '0');
        $generateJsonld = (Tools::getValue('generate_jsonld', '0') !== '0');
        $extraContext   = trim((string)Tools::getValue('extra_context', ''));
        $systemCtx      = trim((string)Tools::getValue('system_context', ''));

        if ($generateMeta) {
            $systemCtx .= "\n\nVoeg ook de volgende velden toe aan je JSON-response:"
                . "\n- \"meta_title\": Een pakkende Nederlandse paginatitel van maximaal 60 tekens."
                . "\n- \"meta_description\": Een pakkende Nederlandse meta description van maximaal 155 tekens, plain text (geen HTML)."
                . "\n- \"meta_keywords\": 6-10 relevante Nederlandse zoekwoorden als komma-gescheiden string.";
        }

        if ($generateJsonld) {
            $systemCtx .= "\n\nVoeg ook het veld \"seo_jsonld\" toe aan je JSON-response: een geldige JSON-string (FAQPage schema) met precies 5 vragen over deze pagina in correct Nederlands. Geen markdown, geen code-fences — alleen de ruwe JSON-string als waarde van \"seo_jsonld\".";
        }

        $idShop       = (int)$this->context->shop->id;
        $prefix       = pSQL(_DB_PREFIX_);
        $placeholders = implode(',', $ids);

        $rows = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS("
            SELECT cp.id_cms, cpl.meta_title, cpl.link_rewrite, cpl.content,
                   COALESCE(cpcl.name, '') AS cms_category_name
            FROM {$prefix}cms cp
            INNER JOIN {$prefix}cms_lang cpl ON (cpl.id_cms=cp.id_cms AND cpl.id_lang=" . (int)$idLang . " AND cpl.id_shop=" . $idShop . ")
            LEFT JOIN  {$prefix}cms_category_lang cpcl ON (cpcl.id_cms_category=cp.id_cms_category AND cpcl.id_lang=" . (int)$idLang . " AND cpcl.id_shop=" . $idShop . ")
            WHERE cp.id_cms IN ({$placeholders})
        ") ?: [];

        $drafts = [];
        set_time_limit(300);

        foreach ($rows as $page) {
            $cmsId = (int)$page['id_cms'];

            if (!$overwrite && !empty(trim(strip_tags((string)$page['content'])))) {
                $drafts[] = [
                    'id_cms'  => $cmsId,
                    'name'    => $page['meta_title'] ?: $page['link_rewrite'],
                    'skipped' => true,
                    'reason'  => 'Already has content (overwrite disabled)',
                ];
                continue;
            }

            $userMsg = $this->buildCmsPrompt($page, $extraContext, $generateMeta, $generateJsonld);
            $result  = $this->callAiApi($provider, $apiKey, $systemCtx, $userMsg);

            if ($result['ok']) {
                $data  = $result['data'];
                $draft = [
                    'id_cms'  => $cmsId,
                    'name'    => $page['meta_title'] ?: $page['link_rewrite'],
                    'content' => (string)($data['content'] ?? ''),
                ];
                if ($generateMeta) {
                    $draft['meta_title']       = (string)($data['meta_title'] ?? '');
                    $draft['meta_description'] = (string)($data['meta_description'] ?? '');
                    $draft['meta_keywords']    = (string)($data['meta_keywords'] ?? '');
                }
                if ($generateJsonld && isset($data['seo_jsonld'])) {
                    $raw = $data['seo_jsonld'];
                    $draft['seo_jsonld'] = is_array($raw)
                        ? json_encode($raw, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
                        : (string)$raw;
                }
                $drafts[] = $draft;
            } else {
                $drafts[] = [
                    'id_cms' => $cmsId,
                    'name'   => $page['meta_title'] ?: $page['link_rewrite'],
                    'error'  => $result['error'] ?? 'Unknown error',
                ];
            }
        }

        $this->ajaxDie(json_encode(['ok' => true, 'drafts' => $drafts]));
    }

    private function buildCmsPrompt(array $page, string $extraContext, bool $generateMeta, bool $generateJsonld): string
    {
        $title    = $page['meta_title'] ?: $page['link_rewrite'] ?? '';
        $section  = $page['cms_category_name'] ?? '';

        $msg  = "Generate content for the following CMS information page on a Dutch e-commerce store:\n\n";
        $msg .= "* **Page Title:** {$title}\n";
        if ($section !== '') {
            $msg .= "* **Section / Category:** {$section}\n";
        }
        if ($extraContext !== '') {
            $msg .= "\nExtra context / additional instructions:\n{$extraContext}\n";
        }
        $keys  = "- \"content\": Rich HTML page content following all structure requirements from your system instructions. Use <h2>, <h3>, <p>, <ul> tags. Professional Dutch.\n";
        if ($generateMeta) {
            $keys .= "- \"meta_title\": Pakkende Nederlandse paginatitel, max 60 tekens.\n";
            $keys .= "- \"meta_description\": Pakkende Nederlandse meta description, plain text, max 155 tekens.\n";
            $keys .= "- \"meta_keywords\": 6-10 relevante Nederlandse zoekwoorden als komma-gescheiden string.\n";
        }
        if ($generateJsonld) {
            $keys .= "- \"seo_jsonld\": Een geldige JSON-string (FAQPage schema, @context schema.org) met precies 5 vragen over deze pagina in correct Nederlands. Sla op als string (geen genest object).\n";
        }
        $msg .= "\nReturn ONLY a valid JSON object — no markdown, no code fences, no explanation — with exactly these keys:\n" . $keys;
        $msg .= "\nTALKVEREISTE: Schrijf foutloos Nederlands. Gebruik een professionele, klantgerichte schrijfstijl. Geef praktische, concrete informatie.";

        return $msg;
    }

    // -------------------------------------------------------------------------
    // Save drafts
    // -------------------------------------------------------------------------

    private function ajaxSaveDrafts(): void
    {
        $idLang = (int)Tools::getValue('id_lang', (int)Configuration::get('PS_LANG_DEFAULT'));
        if ($idLang <= 0) {
            $idLang = (int)Configuration::get('PS_LANG_DEFAULT');
        }

        $draftsJson = (string)Tools::getValue('drafts', '[]');
        $drafts     = json_decode($draftsJson, true);
        if (!is_array($drafts)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Invalid drafts data']));
        }

        $idShop = (int)$this->context->shop->id;
        $prefix = pSQL(_DB_PREFIX_);
        $saved  = 0;
        $errors = [];
        $db     = Db::getInstance();

        foreach ($drafts as $draft) {
            $id = (int)($draft['id_cms'] ?? 0);
            if ($id <= 0) {
                continue;
            }

            $sets = [];
            if (isset($draft['content']) && $draft['content'] !== '') {
                $sets[] = "content='" . $db->escape($draft['content'], true) . "'";
            }
            if (isset($draft['meta_title']) && $draft['meta_title'] !== '') {
                $sets[] = "meta_title='" . $db->escape($draft['meta_title'], false) . "'";
            }
            if (isset($draft['meta_description']) && $draft['meta_description'] !== '') {
                $sets[] = "meta_description='" . $db->escape($draft['meta_description'], false) . "'";
            }
            if (isset($draft['meta_keywords']) && $draft['meta_keywords'] !== '') {
                $sets[] = "meta_keywords='" . $db->escape($draft['meta_keywords'], false) . "'";
            }

            if (!empty($sets)) {
                $sql = "UPDATE {$prefix}cms_lang SET " . implode(', ', $sets)
                     . " WHERE id_cms={$id} AND id_lang=" . (int)$idLang . " AND id_shop=" . $idShop;
                if (!$db->execute($sql)) {
                    $errors[] = 'CMS page ' . $id . ': update failed';
                    continue;
                }
            }

            // JSON-LD stored in PS Configuration (key: MS_CMS_JSONLD_{id})
            // Frontend usage: Configuration::get('MS_CMS_JSONLD_' . $id_cms)
            if (isset($draft['seo_jsonld']) && $draft['seo_jsonld'] !== '') {
                json_decode($draft['seo_jsonld']);
                if (json_last_error() === JSON_ERROR_NONE) {
                    Configuration::updateValue('MS_CMS_JSONLD_' . $id, $draft['seo_jsonld']);
                } else {
                    $errors[] = 'CMS page ' . $id . ': seo_jsonld is not valid JSON, skipped';
                }
            }

            if (empty($sets) && (!isset($draft['seo_jsonld']) || $draft['seo_jsonld'] === '')) {
                continue;
            }

            $saved++;
        }

        $this->ajaxDie(json_encode(['ok' => true, 'saved' => $saved, 'errors' => $errors]));
    }

    // -------------------------------------------------------------------------
    // AI API (shared pattern with other AI controllers)
    // -------------------------------------------------------------------------

    private function callAiApi(string $provider, string $apiKey, string $systemPrompt, string $userMessage): array
    {
        switch ($provider) {
            case 'grok':
                return $this->callOpenAiCompatible('https://api.x.ai/v1/chat/completions', 'grok-3-mini', $apiKey, $systemPrompt, $userMessage);
            case 'openai':
                return $this->callOpenAiCompatible('https://api.openai.com/v1/chat/completions', 'gpt-4o-mini', $apiKey, $systemPrompt, $userMessage);
            case 'copilot':
                return $this->callOpenAiCompatible('https://api.githubcopilot.com/chat/completions', 'gpt-4o-mini', $apiKey, $systemPrompt, $userMessage);
            default:
                return $this->callAnthropicApi($apiKey, $systemPrompt, $userMessage);
        }
    }

    private function callAnthropicApi(string $apiKey, string $systemPrompt, string $userMessage): array
    {
        $payload = ['model' => 'claude-sonnet-4-6', 'max_tokens' => 4096, 'messages' => [['role' => 'user', 'content' => $userMessage]]];
        if ($systemPrompt !== '') {
            $payload['system'] = $systemPrompt;
        }

        $response = $this->httpPost('https://api.anthropic.com/v1/messages', json_encode($payload), [
            'x-api-key: ' . $apiKey,
            'anthropic-version: 2023-06-01',
            'content-type: application/json',
        ]);
        if (!$response['ok']) {
            return ['ok' => false, 'error' => $response['error']];
        }

        $data = json_decode($response['body'], true);
        if (empty($data['content'][0]['text'])) {
            $errMsg = $data['error']['message'] ?? ('HTTP ' . $response['http_code'] . ': ' . substr($response['body'], 0, 300));
            return ['ok' => false, 'error' => $errMsg];
        }
        return $this->parseAiJsonRaw($data['content'][0]['text']);
    }

    private function callOpenAiCompatible(string $endpoint, string $model, string $apiKey, string $systemPrompt, string $userMessage): array
    {
        $messages = [];
        if ($systemPrompt !== '') {
            $messages[] = ['role' => 'system', 'content' => $systemPrompt];
        }
        $messages[] = ['role' => 'user', 'content' => $userMessage];

        $response = $this->httpPost($endpoint, json_encode(['model' => $model, 'max_tokens' => 4096, 'messages' => $messages]), [
            'Authorization: Bearer ' . $apiKey,
            'content-type: application/json',
        ]);
        if (!$response['ok']) {
            return ['ok' => false, 'error' => $response['error']];
        }

        $data = json_decode($response['body'], true);
        if (empty($data['choices'][0]['message']['content'])) {
            $errMsg = $data['error']['message'] ?? ('HTTP ' . $response['http_code'] . ': ' . substr($response['body'], 0, 300));
            return ['ok' => false, 'error' => $errMsg];
        }
        return $this->parseAiJsonRaw($data['choices'][0]['message']['content']);
    }

    private function httpPost(string $url, string $body, array $headers): array
    {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $body,
            CURLOPT_TIMEOUT        => 120,
            CURLOPT_HTTPHEADER     => $headers,
        ]);
        $responseBody = curl_exec($ch);
        $httpCode     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError    = curl_error($ch);
        curl_close($ch);

        if ($curlError) {
            return ['ok' => false, 'body' => '', 'http_code' => 0, 'error' => 'cURL error: ' . $curlError];
        }
        if ($httpCode !== 200) {
            $errData = json_decode($responseBody, true);
            $errMsg  = $errData['error']['message'] ?? ('HTTP ' . $httpCode . ': ' . substr($responseBody, 0, 300));
            return ['ok' => false, 'body' => $responseBody, 'http_code' => $httpCode, 'error' => 'HTTP ' . $httpCode . ': ' . $errMsg];
        }
        return ['ok' => true, 'body' => $responseBody, 'http_code' => $httpCode];
    }

    private function parseAiJsonRaw(string $text): array
    {
        $clean  = preg_replace('/^```(?:json)?\s*/i', '', trim($text));
        $clean  = preg_replace('/\s*```$/', '', $clean);
        $parsed = json_decode($clean, true);
        if (is_array($parsed)) {
            return ['ok' => true, 'data' => $parsed];
        }
        return ['ok' => false, 'error' => 'AI returned invalid JSON: ' . substr($clean, 0, 300)];
    }
}
