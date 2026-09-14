<?php
/**
 * MsThemeConfig module — SuperAdmin AI product descriptions panel
 * Admin controller providing a console-like UI and AJAX endpoints to generate/edit product descriptions via AI.
 */

use PrestaShop\PrestaShop\Adapter\Validate;

if (!defined('_PS_VERSION_')) {
    exit;
}

class MsAdminAIDescriptionsController extends ModuleAdminController
{
    public function __construct()
    {
        parent::__construct();
        $this->bootstrap = true;
        $this->show_page_header = true;
        $this->context = Context::getContext();
        $this->translator = $this->context->getTranslator();
        $this->meta_title = $this->translator->trans('AI product descriptions', [], 'Modules.MsThemeConfig.AIController');
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
                . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'ai_descriptions_wrapper.tpl';
            $this->content .= $this->context->smarty->fetch($wrapperPath);
            $this->context->smarty->assign('content', $this->content);
            return;
        }

        if (Tools::getValue('ajax')) {
            $this->displayAjax();
            return;
        }

        $shopRoot = _PS_ROOT_DIR_;
        $scriptsDir = _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'external' . DIRECTORY_SEPARATOR . 'modernesmid_webshop' . DIRECTORY_SEPARATOR . 'scripts';
        $dataDir = $scriptsDir . DIRECTORY_SEPARATOR . 'data';
        if (!is_dir($dataDir)) {
            @mkdir($dataDir, 0777, true);
        }
        $logsDir = $dataDir . DIRECTORY_SEPARATOR . 'logs';
        if (!is_dir($logsDir)) {
            @mkdir($logsDir, 0777, true);
        }

        $ajaxUrl = $this->context->link->getAdminLink('MsAdminAIDescriptions', true, [], ['ajax' => true]);

        // Pass languages so the template can build a proper language selector
        $languages = Language::getLanguages(true);
        $defaultLangId = (int)Configuration::get('PS_LANG_DEFAULT');
        $contexts     = $this->loadContextFiles();
        $defaultSystemContext = !empty($contexts) ? $contexts[0]['content'] : '';

        $shops = Shop::getShops(true); // active shops only

        $vars = [
            'lite_display'             => true,
            'show_page_header_toolbar' => false,
            'ajax_url'                 => $ajaxUrl,
            'data_dir'                 => $dataDir,
            'logs_dir'                 => $logsDir,
            'shop_root'                => $shopRoot,
            'languages'                => $languages,
            'default_lang_id'          => $defaultLangId,
            'shops'                    => $shops,
            'has_anthropic_key'        => !empty(Configuration::get('MSTHEMECONFIG_ANTHROPIC_KEY')),
            'has_grok_key'             => !empty(Configuration::get('MSTHEMECONFIG_GROK_KEY')),
            'has_openai_key'           => !empty(Configuration::get('MSTHEMECONFIG_OPENAI_KEY')),
            'has_copilot_key'          => !empty(Configuration::get('MSTHEMECONFIG_COPILOT_KEY')),
            'default_system_context'   => $defaultSystemContext,
            'ai_contexts'              => $contexts,
        ];

        try {
            parent::initContent();
            if (!class_exists('Twig\\Loader\\FilesystemLoader')) {
                throw new Exception('Twig is not available');
            }
            $tplDir = _PS_MODULE_DIR_ . 'msthemeconfig' . DIRECTORY_SEPARATOR . 'views'
                . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'admin';
            $loader = new Twig\Loader\FilesystemLoader($tplDir);
            $twigEnv = new Twig\Environment($loader, ['autoescape' => 'html']);
            $twigEnv->addFilter(new Twig\TwigFilter('trans', function ($message, array $parameters = [], $domain = null) {
                return $this->translator ? $this->translator->trans($message, $parameters, $domain) : $message;
            }));
            $html = $twigEnv->render('ai_descriptions.html.twig', $vars);
            $this->content .= $html;
            $this->context->smarty->assign('content', $this->content);
            return;
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
                case 'ListCategories':
                    $this->ajaxListCategories();
                    break;
                case 'ListProducts':
                    $this->ajaxListProducts();
                    break;
                case 'ListFeaturesAttributes':
                    $this->ajaxListFeaturesAttributes();
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
     * Scan config/contexts/*.txt and return array of [name, label, content].
     * 'default' is always first; the rest sorted alphabetically.
     */
    private function loadContextFiles(): array
    {
        $ds  = DIRECTORY_SEPARATOR;
        $dir = _PS_MODULE_DIR_ . 'msthemeconfig' . $ds . 'config' . $ds . 'contexts';

        $contexts = [];
        if (is_dir($dir)) {
            $files = glob($dir . $ds . '*.txt') ?: [];
            usort($files, function ($a, $b) {
                $aBase = basename($a, '.txt');
                $bBase = basename($b, '.txt');
                if ($aBase === 'default') return -1;
                if ($bBase === 'default') return 1;
                return strcasecmp($aBase, $bBase);
            });
            foreach ($files as $file) {
                $name      = basename($file, '.txt');
                $label     = $name === 'default'
                    ? 'Default'
                    : ucwords(str_replace(['-', '_'], ' ', $name));
                $contexts[] = [
                    'name'    => $name,
                    'label'   => $label,
                    'content' => (string)file_get_contents($file),
                ];
            }
        }

        // Fallback to legacy single file
        if (empty($contexts)) {
            $fallback = _PS_MODULE_DIR_ . 'msthemeconfig' . $ds . 'config' . $ds . 'ai_system_context.txt';
            if (is_readable($fallback)) {
                $contexts[] = [
                    'name'    => 'default',
                    'label'   => 'Default',
                    'content' => (string)file_get_contents($fallback),
                ];
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

    /** Map provider slug → PS configuration key */
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
    // List endpoints
    // -------------------------------------------------------------------------

    private function ajaxListCategories(): void
    {
        $idLang = (int)Tools::getValue('id_lang', (int)Configuration::get('PS_LANG_DEFAULT'));
        $prefix = pSQL(_DB_PREFIX_);

        // Only categories that actually contain at least one product
        // Join parent category name so we can display "Parent - Child"
        $rows = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS("
            SELECT DISTINCT
                c.id_category,
                c.id_parent,
                cl.name                                        AS name,
                COALESCE(cl_parent.name, '')                   AS parent_name
            FROM {$prefix}category c
            INNER JOIN {$prefix}category_lang cl
                ON cl.id_category = c.id_category
               AND cl.id_lang = " . (int)$idLang . "
            LEFT JOIN {$prefix}category_lang cl_parent
                ON cl_parent.id_category = c.id_parent
               AND cl_parent.id_lang = " . (int)$idLang . "
            WHERE EXISTS (
                SELECT 1 FROM {$prefix}category_product cp
                WHERE cp.id_category = c.id_category
            )
            AND c.id_category > 2
            ORDER BY COALESCE(cl_parent.name, cl.name), cl.name
        ") ?: [];

        // Build display label: "Parent - Child" or just "Child" when parent is root/home
        $rootNames = ['Root', 'Home', 'Accueil', ''];
        foreach ($rows as &$row) {
            $row['label'] = (!empty($row['parent_name']) && !in_array($row['parent_name'], $rootNames))
                ? $row['parent_name'] . ' › ' . $row['name']
                : $row['name'];
        }
        unset($row);

        $this->ajaxDie(json_encode(['ok' => true, 'categories' => $rows]));
    }

    private function ajaxListProducts(): void
    {
        $idLang = (int)Tools::getValue('id_lang', (int)Configuration::get('PS_LANG_DEFAULT'));
        $q = trim((string)Tools::getValue('q', ''));
        $catIds = (string)Tools::getValue('category_ids', '');
        $limit = max(1, min(500, (int)Tools::getValue('limit', 50)));
        $prefix = pSQL(_DB_PREFIX_);

        $where = [];
        if ($q !== '') {
            $qSql = pSQL('%' . $q . '%');
            $where[] = "(pl.name LIKE '{$qSql}' OR p.reference LIKE '{$qSql}')";
        }
        if ($catIds !== '') {
            $ids = array_filter(array_map('intval', explode(',', $catIds)), function ($v) { return $v > 0; });
            if (!empty($ids)) {
                $where[] = 'p.id_product IN (SELECT id_product FROM ' . $prefix . 'category_product WHERE id_category IN (' . implode(',', $ids) . '))';
            }
        }
        $whereSql = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';
        $sql = "SELECT DISTINCT p.id_product, pl.name, p.reference
                FROM {$prefix}product p
                INNER JOIN {$prefix}product_lang pl ON (pl.id_product=p.id_product AND pl.id_lang=" . (int)$idLang . ")
                {$whereSql}
                ORDER BY pl.name
                LIMIT " . (int)$limit;
        $rows = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql) ?: [];
        $this->ajaxDie(json_encode(['ok' => true, 'products' => $rows]));
    }

    private function ajaxListFeaturesAttributes(): void
    {
        $idLang = (int)Tools::getValue('id_lang', (int)Configuration::get('PS_LANG_DEFAULT'));
        $productIdsCsv = (string)Tools::getValue('product_ids', '');
        $ids = array_values(array_unique(array_filter(array_map('intval', explode(',', $productIdsCsv)), function ($v) { return $v > 0; })));
        $prefix = pSQL(_DB_PREFIX_);

        if (empty($ids)) {
            $this->ajaxDie(json_encode(['ok' => true, 'features' => [], 'attributes' => []]));
        }

        $sqlF = "SELECT DISTINCT f.id_feature, fl.name AS feature_name, fvl.value AS feature_value
                 FROM {$prefix}feature_product fp
                 INNER JOIN {$prefix}feature f ON (f.id_feature=fp.id_feature)
                 INNER JOIN {$prefix}feature_lang fl ON (fl.id_feature=f.id_feature AND fl.id_lang=" . (int)$idLang . ")
                 INNER JOIN {$prefix}feature_value fv ON (fv.id_feature_value=fp.id_feature_value)
                 INNER JOIN {$prefix}feature_value_lang fvl ON (fvl.id_feature_value=fv.id_feature_value AND fvl.id_lang=" . (int)$idLang . ")
                 WHERE fp.id_product IN (" . implode(',', $ids) . ")
                 ORDER BY fl.name, fvl.value";
        $features = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sqlF) ?: [];

        $sqlA = "SELECT DISTINCT ag.id_attribute_group, agl.name AS group_name, a.id_attribute, al.name AS attribute_name
                 FROM {$prefix}product_attribute pa
                 INNER JOIN {$prefix}product_attribute_combination pac ON (pac.id_product_attribute=pa.id_product_attribute)
                 INNER JOIN {$prefix}attribute a ON (a.id_attribute=pac.id_attribute)
                 INNER JOIN {$prefix}attribute_lang al ON (al.id_attribute=a.id_attribute AND al.id_lang=" . (int)$idLang . ")
                 INNER JOIN {$prefix}attribute_group ag ON (ag.id_attribute_group=a.id_attribute_group)
                 INNER JOIN {$prefix}attribute_group_lang agl ON (agl.id_attribute_group=ag.id_attribute_group AND agl.id_lang=" . (int)$idLang . ")
                 WHERE pa.id_product IN (" . implode(',', $ids) . ")
                 ORDER BY agl.name, al.name";
        $attributes = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sqlA) ?: [];

        $this->ajaxDie(json_encode(['ok' => true, 'features' => $features, 'attributes' => $attributes]));
    }

    // -------------------------------------------------------------------------
    // Generate drafts
    // -------------------------------------------------------------------------

    private function ajaxGenerateDrafts(): void
    {
        // Provider + API key
        $provider = trim((string)Tools::getValue('provider', 'anthropic'));
        $apiKey   = trim((string)Tools::getValue('api_key', ''));
        if (empty($apiKey)) {
            $apiKey = (string)Configuration::get(self::providerConfigKey($provider));
        }
        if (empty($apiKey)) {
            $label = ($provider === 'grok') ? 'xAI Grok' : 'Anthropic';
            $this->ajaxDie(json_encode(['ok' => false, 'error' => $label . ' API key not configured. Enter it in the API key field above.']));
        }

        $idLang = (int)Tools::getValue('id_lang', (int)Configuration::get('PS_LANG_DEFAULT'));
        if ($idLang <= 0) {
            $idLang = (int)Configuration::get('PS_LANG_DEFAULT');
        }

        $productIdsCsv = (string)Tools::getValue('product_ids', '');
        $ids = array_values(array_unique(array_filter(array_map('intval', explode(',', $productIdsCsv)), function ($v) { return $v > 0; })));
        if (empty($ids)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'No product IDs provided']));
        }

        $overwrite      = (Tools::getValue('overwrite', '0') === '1');
        $pinterest      = (Tools::getValue('pinterest', '1') !== '0');
        $generateMeta   = (Tools::getValue('generate_meta', '1') !== '0');
        $generateJsonld = (Tools::getValue('generate_jsonld', '0') !== '0');
        $extraContext   = trim((string)Tools::getValue('extra_context', ''));
        $systemCtx      = trim((string)Tools::getValue('system_context', ''));

        if (!$pinterest) {
            $systemCtx .= "\n\nBELANGRIJK: Voeg GEEN Pinterest-link toe en sla de 'Inspiratie opdoen'-sectie volledig over. Sluit de beschrijving af na de 'Gemak & Service'-sectie.";
        }

        if ($generateMeta) {
            $systemCtx .= "\n\nVoeg ook de volgende twee velden toe aan je JSON-response:"
                . "\n- \"meta_description\": Een pakkende Nederlandse meta description van maximaal 155 tekens, plain text (geen HTML). Verwerk het productnaam en een USP."
                . "\n- \"meta_keywords\": 6-10 relevante Nederlandse zoekwoorden als komma-gescheiden string (bijv. \"staal, kokerprofiel, constructie, DIY\").";
        }

        if ($generateJsonld) {
            $systemCtx .= "\n\nVoeg ook het veld \"seo_jsonld\" toe aan je JSON-response: een geldige JSON-string (FAQPage schema) met precies 5 vragen in correct Nederlands. Geen markdown, geen code-fences — alleen de ruwe JSON-string als waarde van \"seo_jsonld\".";
        }

        // Resolve selected feature/attribute IDs from UI
        $featureIdsCsv  = (string)Tools::getValue('feature_ids', '');
        $attributeIdsCsv = (string)Tools::getValue('attribute_ids', '');
        $selectedFeatureIds  = array_values(array_filter(array_map('intval', explode(',', $featureIdsCsv))));
        $selectedAttributeIds = array_values(array_filter(array_map('intval', explode(',', $attributeIdsCsv))));

        $prefix = pSQL(_DB_PREFIX_);
        $placeholders = implode(',', $ids);

        // Fetch product data (one row per product via default category join)
        $sql = "SELECT p.id_product, pl.name, p.reference,
                       pl.description_short, pl.description,
                       cl.name AS category_name
                FROM {$prefix}product p
                INNER JOIN {$prefix}product_lang pl ON (pl.id_product=p.id_product AND pl.id_lang=" . (int)$idLang . ")
                LEFT JOIN {$prefix}category_lang cl ON (cl.id_category=p.id_category_default AND cl.id_lang=" . (int)$idLang . ")
                WHERE p.id_product IN ({$placeholders})
                GROUP BY p.id_product";
        $products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql) ?: [];

        // Fetch features — filtered to selected feature IDs when provided
        $featureFilter = !empty($selectedFeatureIds)
            ? ' AND fp.id_feature IN (' . implode(',', $selectedFeatureIds) . ')'
            : '';
        $sqlF = "SELECT fp.id_product, fl.name AS feature_name, fvl.value AS feature_value
                 FROM {$prefix}feature_product fp
                 INNER JOIN {$prefix}feature f ON (f.id_feature=fp.id_feature)
                 INNER JOIN {$prefix}feature_lang fl ON (fl.id_feature=f.id_feature AND fl.id_lang=" . (int)$idLang . ")
                 INNER JOIN {$prefix}feature_value fv ON (fv.id_feature_value=fp.id_feature_value)
                 INNER JOIN {$prefix}feature_value_lang fvl ON (fvl.id_feature_value=fv.id_feature_value AND fvl.id_lang=" . (int)$idLang . ")
                 WHERE fp.id_product IN ({$placeholders}){$featureFilter}";
        $featRows = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sqlF) ?: [];

        $featuresByProduct = [];
        foreach ($featRows as $row) {
            $featuresByProduct[(int)$row['id_product']][] = $row['feature_name'] . ': ' . $row['feature_value'];
        }

        $drafts = [];
        set_time_limit(300); // Allow up to 5 minutes for batch generation

        foreach ($products as $product) {
            $pid = (int)$product['id_product'];

            if (!$overwrite && !empty(trim(strip_tags((string)$product['description'])))) {
                $drafts[] = [
                    'id_product' => $pid,
                    'name'       => $product['name'],
                    'skipped'    => true,
                    'reason'     => 'Already has description (overwrite disabled)',
                ];
                continue;
            }

            $features    = $featuresByProduct[$pid] ?? [];
            $featureTags = implode(', ', $features);
            $userMsg     = $this->buildProductPrompt($product, $featureTags, $extraContext, $generateMeta, $generateJsonld);
            $result      = $this->callAiApi($provider, $apiKey, $systemCtx, $userMsg);

            if ($result['ok']) {
                $draft = [
                    'id_product'        => $pid,
                    'name'              => $product['name'],
                    'short_description' => $result['short_description'],
                    'long_description'  => $result['long_description'],
                ];
                if ($generateMeta) {
                    $draft['meta_description'] = $result['meta_description'] ?? '';
                    $draft['meta_keywords']    = $result['meta_keywords'] ?? '';
                }
                if ($generateJsonld) {
                    $draft['seo_jsonld'] = $result['seo_jsonld'] ?? '';
                }
                $drafts[] = $draft;
            } else {
                $drafts[] = [
                    'id_product' => $pid,
                    'name'       => $product['name'],
                    'error'      => $result['error'],
                ];
            }
        }

        $this->ajaxDie(json_encode(['ok' => true, 'drafts' => $drafts]));
    }

    /**
     * Build the user-turn prompt for one product.
     */
    private function buildProductPrompt(array $product, string $featureTags, string $extraContext, bool $generateMeta = false, bool $generateJsonld = false): string
    {
        $name      = $product['name'] ?? '';
        $category  = $product['category_name'] ?? '';
        $reference = $product['reference'] ?? '';

        $msg  = "Generate product descriptions for the following product:\n\n";
        $msg .= "* **Product Name:** {$name}\n";
        if ($reference !== '') {
            $msg .= "* **Reference:** {$reference}\n";
        }
        $msg .= "* **Product Category:** {$category}\n";
        $msg .= "* **Product Feature Tags:** {$featureTags}\n";
        if ($extraContext !== '') {
            $msg .= "\nExtra context / additional instructions:\n{$extraContext}\n";
        }
        $keys  = "- \"short_description\": A concise HTML summary of 1-2 sentences wrapped in a <p> tag (max 255 characters of visible text).\n";
        $keys .= "- \"long_description\": The full HTML description following all structure requirements from your system instructions.\n";
        if ($generateMeta) {
            $keys .= "- \"meta_description\": Pakkende Nederlandse meta description, plain text, max 155 tekens, verwerk productnaam + USP.\n";
            $keys .= "- \"meta_keywords\": 6-10 relevante Nederlandse zoekwoorden als komma-gescheiden string.\n";
        }
        if ($generateJsonld) {
            $keys .= "- \"seo_jsonld\": Een geldige JSON-string (FAQPage schema, @context schema.org) met precies 5 vragen in correct Nederlands. Sla de waarde op als een string (geen genest object — de string zelf bevat de JSON).\n";
        }
        $msg .= "\nReturn ONLY a valid JSON object — no markdown, no code fences, no explanation — with exactly these keys:\n" . $keys;
        $msg .= "\nTALKVEREISTE: Schrijf foutloos Nederlands. Controleer grammatica, spelling en zinsbouw voor elke zin. Gebruik natuurlijke, vloeiende zinnen zonder taalfouten.";

        return $msg;
    }

    /**
     * Dispatch to the correct AI provider.
     *
     * @return array{ok: bool, short_description?: string, long_description?: string, error?: string}
     */
    private function callAiApi(string $provider, string $apiKey, string $systemPrompt, string $userMessage): array
    {
        switch ($provider) {
            case 'grok':
                return $this->callOpenAiCompatible(
                    'https://api.x.ai/v1/chat/completions',
                    'grok-3-mini',
                    $apiKey, $systemPrompt, $userMessage
                );
            case 'openai':
                return $this->callOpenAiCompatible(
                    'https://api.openai.com/v1/chat/completions',
                    'gpt-4o-mini',   // goedkoop + goed genoeg voor NL productomschrijvingen
                    $apiKey, $systemPrompt, $userMessage
                );
            case 'copilot':
                return $this->callOpenAiCompatible(
                    'https://api.githubcopilot.com/chat/completions',
                    'gpt-4o-mini',
                    $apiKey, $systemPrompt, $userMessage
                );
            default:
                // Anthropic — Sonnet is ruim voldoende, Opus is overkill voor productomschrijvingen
                return $this->callAnthropicApi($apiKey, $systemPrompt, $userMessage);
        }
    }

    /**
     * Call the Anthropic Messages API.
     *
     * @return array{ok: bool, short_description?: string, long_description?: string, error?: string}
     */
    private function callAnthropicApi(string $apiKey, string $systemPrompt, string $userMessage): array
    {
        $payload = [
            'model'      => 'claude-sonnet-4-6',
            'max_tokens' => 4096,
            'messages'   => [
                ['role' => 'user', 'content' => $userMessage],
            ],
        ];
        if ($systemPrompt !== '') {
            $payload['system'] = $systemPrompt;
        }

        $response = $this->httpPost(
            'https://api.anthropic.com/v1/messages',
            json_encode($payload),
            [
                'x-api-key: ' . $apiKey,
                'anthropic-version: 2023-06-01',
                'content-type: application/json',
            ]
        );

        if (!$response['ok']) {
            return ['ok' => false, 'error' => $response['error']];
        }

        $data = json_decode($response['body'], true);
        if (empty($data['content'][0]['text'])) {
            $errMsg = isset($data['error']['message'])
                ? $data['error']['message']
                : ('HTTP ' . $response['http_code'] . ': ' . substr($response['body'], 0, 300));
            return ['ok' => false, 'error' => $errMsg];
        }

        return $this->parseAiJsonResponse($data['content'][0]['text']);
    }

    /**
     * Call any OpenAI-compatible API (xAI Grok, OpenAI, etc.).
     *
     * @return array{ok: bool, short_description?: string, long_description?: string, error?: string}
     */
    private function callOpenAiCompatible(string $endpoint, string $model, string $apiKey, string $systemPrompt, string $userMessage): array
    {
        $messages = [];
        if ($systemPrompt !== '') {
            $messages[] = ['role' => 'system', 'content' => $systemPrompt];
        }
        $messages[] = ['role' => 'user', 'content' => $userMessage];

        $payload = [
            'model'      => $model,
            'max_tokens' => 4096,
            'messages'   => $messages,
        ];

        $response = $this->httpPost(
            $endpoint,
            json_encode($payload),
            [
                'Authorization: Bearer ' . $apiKey,
                'content-type: application/json',
            ]
        );

        if (!$response['ok']) {
            return ['ok' => false, 'error' => $response['error']];
        }

        $data = json_decode($response['body'], true);
        if (empty($data['choices'][0]['message']['content'])) {
            $errMsg = isset($data['error']['message'])
                ? $data['error']['message']
                : ('HTTP ' . $response['http_code'] . ': ' . substr($response['body'], 0, 300));
            return ['ok' => false, 'error' => $errMsg];
        }

        return $this->parseAiJsonResponse($data['choices'][0]['message']['content']);
    }

    /**
     * Shared cURL POST helper.
     *
     * @return array{ok: bool, body: string, http_code: int, error?: string}
     */
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
            $errMsg  = isset($errData['error']['message'])
                ? ('HTTP ' . $httpCode . ': ' . $errData['error']['message'])
                : ('HTTP ' . $httpCode . ': ' . substr($responseBody, 0, 300));
            return ['ok' => false, 'body' => $responseBody, 'http_code' => $httpCode, 'error' => $errMsg];
        }

        return ['ok' => true, 'body' => $responseBody, 'http_code' => $httpCode];
    }

    /**
     * Parse the JSON the AI is asked to return; fall back gracefully.
     *
     * @return array{ok: bool, short_description: string, long_description: string}
     */
    private function parseAiJsonResponse(string $text): array
    {
        // Strip accidental markdown code fences the model may add
        $clean  = preg_replace('/^```(?:json)?\s*/i', '', trim($text));
        $clean  = preg_replace('/\s*```$/', '', $clean);
        $parsed = json_decode($clean, true);

        if (is_array($parsed) && array_key_exists('short_description', $parsed) && array_key_exists('long_description', $parsed)) {
            $result = [
                'ok'                => true,
                'short_description' => (string)$parsed['short_description'],
                'long_description'  => (string)$parsed['long_description'],
            ];
            if (array_key_exists('meta_description', $parsed)) {
                $result['meta_description'] = (string)$parsed['meta_description'];
            }
            if (array_key_exists('meta_keywords', $parsed)) {
                $result['meta_keywords'] = (string)$parsed['meta_keywords'];
            }
            if (array_key_exists('seo_jsonld', $parsed)) {
                // The AI may return the JSON-LD as a nested object or as a string — normalise to string
                $raw = $parsed['seo_jsonld'];
                $result['seo_jsonld'] = is_array($raw) ? json_encode($raw, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : (string)$raw;
            }
            return $result;
        }

        // Fallback: treat whole text as long description
        return ['ok' => true, 'short_description' => '', 'long_description' => $text];
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

        // Shop IDs — "0" means all shops
        $shopIdsCsv = (string)Tools::getValue('shop_ids', '0');
        $shopIds    = ($shopIdsCsv === '0' || $shopIdsCsv === '')
            ? []
            : array_values(array_unique(array_filter(array_map('intval', explode(',', $shopIdsCsv)))));

        $draftsJson = (string)Tools::getValue('drafts', '[]');
        $drafts     = json_decode($draftsJson, true);

        if (!is_array($drafts)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Invalid drafts data']));
        }

        $prefix = pSQL(_DB_PREFIX_);
        $saved  = 0;
        $errors = [];
        $db     = Db::getInstance();

        foreach ($drafts as $draft) {
            $pid = (int)($draft['id_product'] ?? 0);
            if ($pid <= 0) {
                continue;
            }

            // product_lang has no id_shop — descriptions are global
            $sets = [];
            if (isset($draft['short_description'])) {
                $sets[] = "description_short='" . $db->escape($draft['short_description'], true) . "'";
            }
            if (isset($draft['long_description'])) {
                $sets[] = "description='" . $db->escape($draft['long_description'], true) . "'";
            }
            if (isset($draft['meta_description']) && $draft['meta_description'] !== '') {
                $sets[] = "meta_description='" . $db->escape($draft['meta_description'], false) . "'";
            }
            if (isset($draft['meta_keywords']) && $draft['meta_keywords'] !== '') {
                $sets[] = "meta_keywords='" . $db->escape($draft['meta_keywords'], false) . "'";
            }
            if (empty($sets)) {
                // Still check for jsonld-only save below
            } elseif (!$db->execute("UPDATE {$prefix}product_lang SET " . implode(', ', $sets) . " WHERE id_product={$pid} AND id_lang=" . (int)$idLang)) {
                $errors[] = 'Product ' . $pid . ': description update failed';
                continue;
            }

            if (isset($draft['seo_jsonld']) && $draft['seo_jsonld'] !== '') {
                // Validate JSON before saving
                json_decode($draft['seo_jsonld']);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $db->execute("UPDATE {$prefix}product SET jsonld='" . $db->escape($draft['seo_jsonld'], false) . "' WHERE id_product={$pid}");
                } else {
                    $errors[] = 'Product ' . $pid . ': seo_jsonld is not valid JSON, skipped';
                }
            }

            if (empty($sets) && (!isset($draft['seo_jsonld']) || $draft['seo_jsonld'] === '')) {
                continue;
            }

            // If specific shops selected, activate product only in those shops
            if (!empty($shopIds)) {
                $shopPlaceholders = implode(',', $shopIds);
                $db->execute(
                    "UPDATE {$prefix}product_shop SET active=1"
                    . " WHERE id_product={$pid} AND id_shop IN ({$shopPlaceholders})"
                );
            }

            $saved++;
        }

        $this->ajaxDie(json_encode(['ok' => true, 'saved' => $saved, 'errors' => $errors]));
    }
}
