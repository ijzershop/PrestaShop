<?php
/**
 * MsThemeConfig module — SuperAdmin catalog backup/restore panel
 * Simple Admin controller that lets SuperAdmins trigger the CLI exporters/importers
 * and stream output to the browser via log polling.
 */

use PrestaShop\PrestaShop\Adapter\Validate;

if (!defined('_PS_VERSION_')) {
    exit;
}

class MsAdminCatalogBackupController extends ModuleAdminController
{
    public function __construct()
    {
        parent::__construct();
        $this->bootstrap = true;
        // Use default Back Office layout
        $this->show_page_header = true;
        $this->context = Context::getContext();
        $this->translator = $this->context->getTranslator();
        $this->meta_title = $this->translator->trans('Catalog backup/restore', [], 'Modules.MsThemeConfig.BackupController');
    }

    public function initContent()
    {
        // Only SuperAdmin
        if (!$this->context->employee || !$this->context->employee->isSuperAdmin()) {
            parent::initContent();
            $errorHtml = '<div class="panel"><div class="alert alert-danger">'
                . htmlspecialchars($this->translator->trans('Only SuperAdmin can access this page.', [], 'Modules.MsThemeConfig.BackupController'))
                . '</div></div>';
            $this->context->smarty->assign('ms_inner_html', $errorHtml);
            // Render wrapper via absolute path to avoid theme/template resolver converting to file:// on Windows
            $wrapperPath = _PS_MODULE_DIR_ . 'msthemeconfig' . DIRECTORY_SEPARATOR . 'views'
                . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'admin' . DIRECTORY_SEPARATOR . 'catalog_backup_wrapper.tpl';
            $this->content .= $this->context->smarty->fetch($wrapperPath);
            // Ensure the updated content is assigned to the layout renderer
            $this->context->smarty->assign('content', $this->content);
            return;
        }

        if(Tools::getValue('ajax')){
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
        // Build AJAX URL pointing to this admin controller
        $ajaxUrl = $this->context->link->getAdminLink('MsAdminCatalogBackup', true, [], ['ajax'=>true]);

        $vars = [
            'lite_display' => true,
            'show_page_header_toolbar' => false,
            'ajax_url' => $ajaxUrl,
            'data_dir' => $dataDir,
            'logs_dir' => $logsDir,
            'shop_root' => $shopRoot,
        ];

        // Render using a local Twig environment and embed inside BO layout via Smarty wrapper
        try {
            // Ensure Twig classes exist
            if (!class_exists('Twig\\Loader\\FilesystemLoader')) {
                throw new Exception('Twig is not available');
            }

            // Point loader to this module's admin templates directory
            $tplDir = _PS_MODULE_DIR_ . 'msthemeconfig' . DIRECTORY_SEPARATOR . 'views'
                . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'admin';

            $loader = new Twig\Loader\FilesystemLoader($tplDir);
            $twigEnv = new Twig\Environment($loader, [
                // No cache to keep things simple; can be enabled if needed
                'autoescape' => 'html',
            ]);

            // Bridge translations: provide a 'trans' filter compatible with the template usage
            $twigEnv->addFilter(new Twig\TwigFilter('trans', function ($message, array $parameters = [], $domain = null) {
                // Use PrestaShop's legacy translator
                return $this->translator ? $this->translator->trans($message, $parameters, $domain) : $message;
            }));

            $html = $twigEnv->render('catalog_backup.html.twig', $vars);
            parent::initContent();
            // Put rendered HTML directly into Back Office content area
            $this->content .= $html;
            // Make sure Back Office layout receives the updated content
            $this->context->smarty->assign('content', $this->content);
            return;
        } catch (Throwable $e) {
            // Graceful fallback rendered inside BO layout
            parent::initContent();
            $errorHtml = '<div class="panel"><div class="alert alert-danger">'
                . 'Twig rendering error: ' . htmlspecialchars($e->getMessage()) . '</div></div>';
            // Put error content directly into the BO content area
            $this->content .= $errorHtml;
            $this->context->smarty->assign('content', $this->content);
            return;
        }
    }

    /**
     * Handle AJAX requests for catalog backup operations
     */
    public function displayAjax()
    {
        try {
            // Verify SuperAdmin access
            if (!$this->verifySuperAdmin()) {
                $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Access denied. SuperAdmin only.']));
            }

            $action = Tools::getValue('action');

            switch ($action) {
                case 'StartExport':
                    $this->ajaxStartExport();
                    break;
                case 'StartImport':
                    $this->ajaxStartImport();
                    break;
                case 'Tail':
                    $this->ajaxTailLog();
                    break;
                case 'Download':
                    $this->ajaxDownload();
                    break;
                default:
                    $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Unknown action']));
            }
        } catch (Exception $e) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => $e->getMessage()]));
        }
    }

    /**
     * Output AJAX response and exit
     */
    private function ajaxDie(string $output): void
    {
        header('Content-Type: application/json');
        die($output);
    }

    /**
     * Verify SuperAdmin access - now works properly in admin controller
     */
    private function verifySuperAdmin(): bool
    {
        // In PrestaShop 9, employee context is properly available in admin controllers
        return $this->context->employee
            && Validate::isLoadedObject($this->context->employee)
            && $this->context->employee->isSuperAdmin();
    }

    /**
     * Start catalog export
     */
    private function ajaxStartExport(): void
    {
        $scriptsDir = _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'external' . DIRECTORY_SEPARATOR . 'modernesmid_webshop' . DIRECTORY_SEPARATOR . 'scripts';
        $dataDir = $scriptsDir . DIRECTORY_SEPARATOR . 'data';

        if (!is_dir($dataDir)) {
            @mkdir($dataDir, 0777, true);
        }

        $logsDir = $dataDir . DIRECTORY_SEPARATOR . 'logs';
        if (!is_dir($logsDir)) {
            @mkdir($logsDir, 0777, true);
        }

        $ts = date('YmdHis');
        $json = $dataDir . DIRECTORY_SEPARATOR . 'catalog-export-' . $ts . '.json';
        $log = $logsDir . DIRECTORY_SEPARATOR . 'export-' . $ts . '.log';
        $imagesPrefix = $dataDir . DIRECTORY_SEPARATOR . 'catalog-images-' . $ts;

        // Optional exports controlled by UI checkboxes
        $includeConfig = (string)Tools::getValue('include_config') === '1';
        $configMode = (string)Tools::getValue('config_mode') ?: 'used';
        if ($configMode !== 'all') { $configMode = 'used'; }
        $includeShipping = (string)Tools::getValue('include_shipping') === '1';
        $includeUploads = (string)Tools::getValue('include_uploads') === '1';
        $configJson = $dataDir . DIRECTORY_SEPARATOR . 'config-export-' . $configMode . '-' . $ts . '.json';
        $shipPayJson = $dataDir . DIRECTORY_SEPARATOR . 'shipping-payments-export-' . $ts . '.json';
        $uploadsPrefix = $dataDir . DIRECTORY_SEPARATOR . 'uploads-' . $ts;

        // Run export in-process to avoid relying on external CLI PHP
        try {
            @set_time_limit(0);
            @ini_set('max_execution_time', '0');
            @ini_set('memory_limit', '1024M');

            require_once $scriptsDir . DIRECTORY_SEPARATOR . 'export-catalog-lib.php';
            // Optional libraries
            if ($includeConfig) {
                require_once $scriptsDir . DIRECTORY_SEPARATOR . 'export-config-lib.php';
            }
            if ($includeShipping) {
                require_once $scriptsDir . DIRECTORY_SEPARATOR . 'export-shipping-payments-lib.php';
            }
            if ($includeUploads) {
                require_once $scriptsDir . DIRECTORY_SEPARATOR . 'export-uploads-lib.php';
            }

            $fh = @fopen($log, 'ab');
            if (!$fh) {
                throw new Exception('Unable to open log file for writing: ' . $log);
            }
            $logger = function (string $msg) use ($fh): void {
                $line = '[' . date('Y-m-d H:i:s') . '] ' . $msg . "\r\n";
                fwrite($fh, $line);
                fflush($fh);
            };

            $logger('Starting catalog export...');

            $result = ms_export_catalog([
                'output_json' => $json,
                'images_prefix' => $imagesPrefix,
                'part_size_bytes' => 10 * 1024 * 1024,
                // Enable detailed log lines so you can see product/category names, images, etc.
                'log_details' => true,
                // Reasonable cap to avoid excessive log sizes; adjust if needed
                'log_limit' => 200,
            ], $logger);

            $logger('Catalog export completed successfully.');

            // Optional: configuration export
            $configPathOut = null;
            if ($includeConfig && function_exists('ms_export_config')) {
                $logger('Starting configuration export (mode=' . $configMode . ')...');
                $cfg = ms_export_config([
                    'output' => $configJson,
                    'mode' => $configMode,
                ], $logger);
                $configPathOut = $cfg['json'] ?? $configJson;
                $logger('Configuration export completed.');
            }

            // Optional: shipping & payments export
            $shipPayPathOut = null;
            if ($includeShipping && function_exists('ms_export_shipping_payments')) {
                $logger('Starting shipping & payments export...');
                $sp = ms_export_shipping_payments([
                    'output' => $shipPayJson,
                ], $logger);
                $shipPayPathOut = $sp['json'] ?? $shipPayJson;
                $logger('Shipping & payments export completed.');
            }

            // Optional: uploads export
            $uploadsParts = null;
            if ($includeUploads && function_exists('ms_export_uploads')) {
                $logger('Starting uploads export...');
                $up = ms_export_uploads([
                    'output_prefix' => $uploadsPrefix,
                    'part_size_bytes' => 50 * 1024 * 1024,
                ], $logger);
                $uploadsParts = $up['parts'] ?? [];
                $logger('Uploads export completed.');
            }
            fclose($fh);

            $this->ajaxDie(json_encode([
                'ok' => true,
                'json' => $result['json'],
                'image_parts' => $result['image_parts'],
                'counts' => $result['counts'],
                'log' => $log,
                'config_json' => $configPathOut,
                'shipping_json' => $shipPayPathOut,
                'uploads_parts' => $uploadsParts,
            ]));
        } catch (Throwable $e) {
            if (isset($fh) && is_resource($fh)) { fclose($fh); }
            $this->ajaxDie(json_encode(['ok' => false, 'error' => $e->getMessage(), 'log' => $log]));
        }
    }

    /**
     * Start catalog import
     */
    private function ajaxStartImport(): void
    {
        $scriptsDir = _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'external' . DIRECTORY_SEPARATOR . 'modernesmid_webshop' . DIRECTORY_SEPARATOR . 'scripts';
        $dataDir = $scriptsDir . DIRECTORY_SEPARATOR . 'data';
        $json = Tools::getValue('json');

        if (!$json || !is_file($json)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'JSON file not found: ' . $json]));
        }

        $logsDir = $dataDir . DIRECTORY_SEPARATOR . 'logs';
        if (!is_dir($logsDir)) {
            @mkdir($logsDir, 0777, true);
        }

        $ts = date('YmdHis');
        $log = $logsDir . DIRECTORY_SEPARATOR . 'import-' . $ts . '.log';

        $cmd = 'php ' . escapeshellarg($scriptsDir . DIRECTORY_SEPARATOR . 'import-catalog.php')
             . ' --input-json=' . escapeshellarg($json) . ' --strict-shops --wipe-catalog';

        $this->spawnBackgroundProcess($cmd, $log);
    }

    /**
     * Tail log file for streaming output
     */
    private function ajaxTailLog(): void
    {
        $log = Tools::getValue('log');

        if (!$log || !is_file($log)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Log file not found']));
        }

        $offset = (int) Tools::getValue('offset', 0);
        $len = filesize($log);

        if ($offset < 0 || $offset > $len) {
            $offset = 0;
        }

        $fh = fopen($log, 'rb');
        fseek($fh, $offset);
        $chunk = stream_get_contents($fh);
        fclose($fh);

        $this->ajaxDie(json_encode(['ok' => true, 'offset' => $offset + strlen($chunk), 'data' => $chunk]));
    }

    /**
     * Spawn background process
     */
    private function spawnBackgroundProcess(string $cmd, string $log): void
    {
        // Start background process redirecting output to log
        if (PHP_OS_FAMILY === 'Windows') {
            $bg = 'start /B ' . $cmd . ' > ' . escapeshellarg($log) . ' 2>&1';
            pclose(popen($bg, 'r'));
        } else {
            $bg = $cmd . ' > ' . escapeshellarg($log) . ' 2>&1 &';
            exec($bg);
        }

        $this->ajaxDie(json_encode(['ok' => true, 'log' => $log]));
    }

    /**
     * Securely stream a backup artifact to the browser (SuperAdmin only).
     * Accepts parameter 'file' which must resolve under scripts/data and have an allowed extension.
     */
    private function ajaxDownload(): void
    {
        // Verify SuperAdmin access
        if (!$this->verifySuperAdmin()) {
            http_response_code(403);
            header('Content-Type: application/json');
            echo json_encode(['ok' => false, 'error' => 'Access denied']);
            exit;
        }

        // Compute allowed base directory (scripts/data)
        $scriptsDir = _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'external' . DIRECTORY_SEPARATOR . 'modernesmid_webshop' . DIRECTORY_SEPARATOR . 'scripts';
        $dataDir = $scriptsDir . DIRECTORY_SEPARATOR . 'data';

        $fileParam = (string)Tools::getValue('file');
        if ($fileParam === '') {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Missing file parameter']));
        }

        // Normalize path: allow both absolute paths and paths relative to dataDir
        $candidate = $fileParam;
        if (!preg_match('/^([a-zA-Z]:\\|\\\\|\/)/', $candidate)) { // looks like relative
            $candidate = $dataDir . DIRECTORY_SEPARATOR . $candidate;
        }

        // Resolve realpath safely
        $real = realpath($candidate);
        $base = realpath($dataDir);
        if ($real === false || $base === false) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'Invalid path']));
        }

        // Ensure file exists and under allowed base
        // Normalize directory separators to compare prefixes reliably
        $realNorm = rtrim(str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $real), DIRECTORY_SEPARATOR);
        $baseNorm = rtrim(str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $base), DIRECTORY_SEPARATOR);
        if (strpos($realNorm, $baseNorm) !== 0 || !is_file($realNorm)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'File not allowed or not found']));
        }

        // Restrict extensions to safe artifacts
        $ext = strtolower(pathinfo($realNorm, PATHINFO_EXTENSION));
        $allowed = ['zip', 'json', 'log'];
        if (!in_array($ext, $allowed, true)) {
            $this->ajaxDie(json_encode(['ok' => false, 'error' => 'File type not allowed']));
        }

        // Stream file
        @set_time_limit(0);
        @ini_set('memory_limit', '1024M');

        $filenameForDownload = basename($realNorm);
        $filesize = (int)filesize($realNorm);
        $mime = 'application/octet-stream';
        if ($ext === 'zip') { $mime = 'application/zip'; }
        elseif ($ext === 'json') { $mime = 'application/json'; }
        elseif ($ext === 'log') { $mime = 'text/plain'; }

        // Clear any existing output buffers to avoid memory blowup
        while (ob_get_level() > 0) { @ob_end_clean(); }

        header('Content-Description: File Transfer');
        header('Content-Type: ' . $mime);
        header('Content-Length: ' . $filesize);
        header('Content-Disposition: attachment; filename="' . rawurlencode($filenameForDownload) . '"');
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: private, max-age=0, must-revalidate');

        $chunkSize = 1024 * 1024; // 1MB
        $fh = fopen($realNorm, 'rb');
        if ($fh === false) {
            http_response_code(500);
            echo 'Unable to open file';
            exit;
        }
        while (!feof($fh)) {
            $buf = fread($fh, $chunkSize);
            if ($buf === false) { break; }
            echo $buf;
            if (function_exists('fastcgi_finish_request')) { /* no-op inside loop */ }
            @flush();
        }
        fclose($fh);
        exit;
    }
}
