<?php

declare(strict_types=1);

namespace modules\msthemeconfig\cron_scripts;

require_once dirname(__DIR__) . '/../../config/config.inc.php';
require_once(dirname(__DIR__) . '/vendor/autoload.php');

// Fix for missing constants in cli
if (!defined('_PS_PRICE_COMPUTE_PRECISION_')) {
    define('_PS_PRICE_COMPUTE_PRECISION_', 6);
}

if (!defined('_PS_PRICE_DISPLAY_PRECISION_')) {
    define('_PS_PRICE_DISPLAY_PRECISION_', 2);
}
if (!defined('_PS_ROUND_UP_')) {
    define('_PS_ROUND_UP_', 0);
}
if (!defined('_PS_ROUND_DOWN_')) {
    define('_PS_ROUND_DOWN_', 1);
}
if (!defined('_PS_ROUND_HALF_UP_')) {
    define('_PS_ROUND_HALF_UP_', 2);
}
if (!defined('_PS_ROUND_HALF_DOWN_')) {
    define('_PS_ROUND_HALF_DOWN_', 3);
}
if (!defined('_PS_ROUND_HALF_EVEN_')) {
    define('_PS_ROUND_HALF_EVEN_', 4);
}
if (!defined('_PS_ROUND_HALF_ODD_')) {
    define('_PS_ROUND_HALF_ODD_', 5);
}

// Load environment variables from .env file
use DOMDocument;
use DOMException;
use ErrorException;
use Language;
use Message;
use OrderInvoice;
use OrderReturn;
use OrderSlip;
use PrestaShopBundle\Entity\Shop;
use PrestaShopCollection;
use Symfony\Component\Dotenv\Dotenv;

$dotenv = new Dotenv();
$envPath = dirname(__DIR__, 3) . '/.env';
if (file_exists($envPath)) {
    $dotenv->load($envPath);
}

error_reporting(E_ALL);
ini_set('display_errors', 'on');
date_default_timezone_set('Europe/Amsterdam');


use Address;
use Carrier;
use Country;
use Configuration;
use Context;
use Currency;
use Customer;
use Db;
use DbQuery;
use Order;
use OrderState;
use PDFCore;
use PrestaShopDatabaseException;
use PrestaShopException;
use State;
use Validate;
use ZipArchive;
use pCloud\Sdk\App;
use pCloud\Sdk\Exception;
use pCloud\Sdk\File;
use pCloud\Sdk\Folder;
use pCloud\Sdk\Request;
use stdClass;

/**
 * BackupInvoicesToPCloud - Automated Invoice Backup and Archive System
 *
 * This class provides a comprehensive solution for backing up PrestaShop invoices and credit slips
 * to pCloud storage with automatic archiving capabilities. Designed to run monthly for data retention
 * compliance and storage optimization.
 *
 * ## MAIN FUNCTIONALITY ##
 * 1. **SQL Export**: Creates MySQL dumps of orders and related tables for a 1-month window starting 3 months ago
 * 2. **PDF Generation**: Generates invoice and credit slip PDFs for specified order statuses
 * 3. **pCloud Upload**: Uploads generated files to organized folder structures on pCloud
 * 4. **Archiving**: Archives folders older than a configured retention period (default: 7 years)
 * 5. **Reconciliation**: Validates uploaded files against database records
 * 6. **Cleanup**: Removes temporary local files after a successful upload
 * 7. **Monitoring**: Comprehensive logging with metrics and error tracking
 *
 * ## CONSTRUCTOR PARAMETERS ##
 *
 * @param bool $debug (default: true)
 *   - True: Enables console output, detailed stack traces, extended logging
 *   - False: Silent execution, logs to files only, production mode
 *
 * @param string $logLevel (default: 'INFO')
 *   - 'DEBUG': All messages including detailed debugging info
 *   - 'INFO': General information about process steps and metrics
 *   - 'WARNING': Warnings about potential issues (recommended for production)
 *   - 'ERROR': Only critical errors and exceptions
 *
 * ## CLASS PROPERTIES ##
 *
 * **Configurable Parameters (can be set via web or CLI):**
 * - $invoiceStatusses: Order states that require invoice PDFs (default: [2,3,4,10,26,27,28,29,42,49,50])
 * - $creditStatusses: Order states that require credit slip PDFs (default: [7,14,45])
 * - $saveTime: Retention period in years (default: '7')
 * - $sleepTime: Delay between operations in seconds (default: 2)
 * - $access_token: pCloud API access token (from configuration or environment)
 * - $pCloudUserId: User ID for pCloud account (from configuration or environment)
 * - $pCloudLocationId: Location ID for data residency (from configuration or environment)
 * - $rootFolderId: Root folder ID for backups (from configuration or environment)
 *
 * **pCloud Configuration: **
 * - $access_token: pCloud API access token for authentication
 * - $pCloudUserId: User ID for pCloud account (configured)
 * - $pCloudLocationId: Location ID for data residency (configured)
 * - $rootFolderId: Root folder ID for backups (configured)
 *
 * **File Paths: **
 * - $serverFolder: Local directory for PDF generation and temporary storage
 * - $serverFolderDownloadTemp: Temporary folder for archive downloads
 * - $logFile: Detailed log file location
 *
 * **Processing Control: **
 * - $generateInvoices: Enable/disable PDF generation (default: true)
 * - $deletePcloudArchivedFolder: Remove archived folders after zipping (default: false)
 * - $saveTime: Retention period in years (default: '7')
 * - $sleepTime: Delay between operations in seconds (default: 2)
 *
 * **Order Status Arrays: **
 * - $invoiceStatusses: Order states that require invoice PDFs [2,3,4,10,26,27,28,29,42,49,50]
 * - $creditStatusses: Order states that require credit slip PDFs [7,14,45]
 *
 * **Templates: **
 * - $pdfInvoiceTemplate: PDF template for invoices (PDFCore::TEMPLATE_INVOICE)
 * - $pdfCreditInvoiceTemplate: PDF template for credit slips (PDFCore::TEMPLATE_ORDER_RETURN)
 *
 * **Tracking Arrays: **
 * - $completedSuccessRecords: Successfully processed records
 * - $errorRecords: Failed operations with error details
 * - $metrics: Runtime metrics and statistics
 *
 * ## CLI USAGE ##
 *
 * **Basic Usage: **
 * ```bash
 * php backupInvoicesToPCloud.php [OPTIONS]
 * ```
 *
 * **Available Options: **
 * - `--debug`, `-d`: Enable debug mode with console output (default)
 * - `--no-debug`: Disable debug mode for silent operation
 * - `--log-level LEVEL`, `-l LEVEL`: Set logging level (DEBUG|INFO|WARNING|ERROR)
 * - `--remove-orders`: Remove the orders which are backed up to the pCloud
 * - `--locally`: Process archives locally instead of using pCloud's zip feature
 * - `--help`, `-h`: Display help information
 *
 * **Common Usage Examples: **
 * ```bash
 * # Production mode with warnings only
 * php backupInvoicesToPCloud.php --no-debug --log-level WARNING
 *
 * # Development mode with full debugging
 * php backupInvoicesToPCloud.php --debug --log-level DEBUG
 *
 * # Silent mode with error logging only
 * php backupInvoicesToPCloud.php --no-debug --log-level ERROR
 *
 * # Local processing with detailed logging
 * php backupInvoicesToPCloud.php --no-debug --log-level INFO --locally
 *
 * * # Local processing with detailed logging and removing orders
 * php backupInvoicesToPCloud.php --no-debug --log-level INFO --locally --remove-orders
 *
 * # Cron job setup (monthly on 1st day)
 * 0 2 1 * * /usr/bin/php /path/to/backupInvoicesToPCloud.php --no-debug --log-level WARNING
 * ```
 *
 * ## WEB USAGE ##
 *
 * When accessed via web browser, parameters can be passed via GET:
 * - `?debug=1&log_level=DEBUG&locally=1`
 * - `?debug=0&log_level=WARNING`
 *
 * ## LOGGING & MONITORING ##
 *
 * **Log Files Generated: **
 * - `var/logs/invoice_backup_detailed.log`: Comprehensive process logging
 * - `var/logs/backup_summary.log`: Execution summaries with metrics
 * - `var/logs/invoice_backup.log`: Legacy error logging (via addToLogFile)
 *
 * **Key Metrics Tracked: **
 * - total_execution_time: Complete process duration
 * - orders_processed: Number of orders in processing window
 * - pdfs_generated: Count of PDF files created
 * - files_uploaded: Number of files uploaded to pCloud
 * - non_pdf_orders_count: Orders without corresponding PDFs
 * - errors_count/success_count: Operation success/failure rates
 *
 * ## ERROR HANDLING ##
 *
 * **Exception Types Handled: **
 * - PrestaShopDatabaseException: Database query failures
 * - PrestaShopException: General PrestaShop errors
 * - pCloud\Sdk\Exception: pCloud API errors
 * - General Exception: Filesystem and other system errors
 *
 * **Recovery Mechanisms: **
 * - Automatic retry for temporary failures
 * - Graceful degradation when optional features fail
 * - Detailed error context preservation
 * - Email notifications for critical issues (via sendMissingOrdersEmail)
 *
 * ## FOLDER STRUCTURE ##
 *
 * **pCloud Organization: **
 * ```
 * Root Folder (configured root_folder_id)
 * └── Backup-IJzershop-YYYY/
 *     └── Backup-IJzershop-MMM/
 *         ├── FACT-REFERENCE-EMAIL-PAYMENT-AMOUNT.pdf
 *         ├── CRED-REFERENCE-EMAIL-PAYMENT-AMOUNT.pdf
 *         └── orders_3months_YYYY-MM.sql
 * ```
 *
 * ## PROCESS FLOW ##
 *
 * 1. **Initialization**: Validate pCloud connection and local directories
 * 2. **Folder Setup**: Create/verify year/month folder structure on pCloud
 * 3. **SQL Export**: Generate database dump for a 1-month window (from the first day of -3 month to the last day of -2 month)
 * 4. **PDF Generation**: Create invoice/credit PDFs for eligible orders
 * 5. **File Upload**: Transfer all files to pCloud monthly folder
 * 6. **Reconciliation**: Compare database orders with uploaded PDF files
 * 7. **Archiving**: Process folders older than the retention period
 * 8. **Cleanup**: Remove local temporary files
 * 9. **Reporting**: Generate summary metrics and send notifications if needed
 *
 * ## DEPENDENCIES ##
 *
 * **Required PHP Extensions: **
 * - curl: pCloud API communication
 * - zip: Archive processing
 * - JSON: Configuration and logging
 * - mysqli/pdo: Database operations
 *
 * **Composer Packages: **
 * - pcloud/pcloud-php-sdk: pCloud integration
 *
 * **PrestaShop Classes: **
 * - Context, Order, Customer, Shop, Configuration
 * - Db, DbQuery for database operations
 * - PDFCore for PDF generation
 *
 * @package modules\msthemeconfig\cron_scripts
 * @author IJzershop Development Team
 * @version 2.1.0
 * @since 1.0.0
 *
 * @example
 * // Production cron job setup
 * $backup = new BackupInvoicesToPCloud(false, 'WARNING');
 * $backup->runBackup(false);
 *
 * @example
 * // Development debugging
 * $backup = new BackupInvoicesToPCloud(true, 'DEBUG');
 * $backup->runBackup(true);
 */
/*
====================================================================
Recommended Method Order for Readability (no behavior change)
--------------------------------------------------------------------
This class is large and handles: configuration, pCloud I/O, PDFs,
order querying/cleanup, and logging. To make it easier to navigate,
we recommend the following order inside this class:

1) Properties and constructor
2) Public high-level API
   - runBackup
3) Validation & initialization
   - validateAndWarn
   - initializePCloudConnection
4) pCloud folder workflow (structure & archiving)
   - checkFoldersPCloud
   - findOrCreateFolderYear
   - findOrCreateFolderMonth
   - archiveFolder
   - archivePCloudFolder
   - archivePCloudFolderLocally
   - buildZip
5) Data selection & preparation
   - exportOrdersSqlFromCurrentMinus3Months
   - fetchInvoicesAndCreditInvoicesListForOrders
   - fetchTableByOrderIds / fetchTableByIds
6) PDF generation helpers
   - createOrderSlips
   - generateFileName
   - generatePdfFile
7) Uploading & local cleanup
   - uploadFilesToPCloud
   - cleanServerFolder
8) Order cleanup & notifications
   - extractOrderRefsFromUploaded
   - removeBackedUpOrders
   - getOrderIdByReference
   - removeOrderCompletely
   - removeOrderRelatedData
   - sendMissingOrdersEmail
   - sendOrderRemovalFailureEmail
9) Logging & metrics
   - log / logError / logExecutionTime / trackMetric / logSummary
   - addToLogFile
10) Configuration API
   - setParametersFromArray
   - Setters (statusses, sleepTime, tokens/ids, flags, saveTime)
   - Getters (statusses, sleepTime, tokens/ids, flags, saveTime)
   - getConfiguration

Note: We intentionally do not split into multiple classes per request.
For a future refactor, physically moving methods to match this TOC are
safe in PHP and can further improve navigation. For now, this guide and
section headers below make the file easier to read.
====================================================================
*/

// ===== Section: Core Class Declaration =====
class BackupInvoicesToPCloud
{
    /**
     * Array to store tracked metrics data
     *
     * @var array<string, mixed>
     */
    private array $metrics = [];

    /**
     * Array of order status IDs requiring invoice PDFs
     *
     * @var int[]
     */
    private array $invoiceStatusses = [2, 3, 4, 10, 26, 27, 28, 29, 42, 49, 50];

    /**
     * Array of order status IDs requiring credit slip PDFs
     *
     * @var int[]
     */
    private array $creditStatusses = [7, 14, 45];

    /**
     * Retention period in years for backup archives
     *
     * @var string
     */
    private string $saveTime = '7';

    /**
     * Delay between operations in seconds
     *
     * @var int
     */
    private int $sleepTime = 2;

    /**
     * pCloud API access token for authentication
     *
     * @var string
     */
    private string $access_token;

    /**
     * User ID for pCloud account
     *
     * @var string
     */
    private string $pCloudUserId;

    /**
     * Location ID for pCloud data residency
     *
     * @var string
     */
    private string $pCloudLocationId;

    /**
     * Root folder ID for backups on pCloud
     *
     * @var string
     */
    private string $rootFolderId;

    /**
     * pCloud application instance
     *
     * @var App
     */
    private App $pCloudApp;

    /**
     * pCloud folder operations instance
     *
     * @var Folder
     */
    private Folder $pCloudFolder;

    /**
     * pCloud request instance
     *
     * @var Request
     */
    private Request $pCloudRequest;

    /**
     * Debug mode flag
     *
     * @var bool
     */
    private bool $debug;

    /**
     * Current logging level (DEBUG|INFO|WARNING|ERROR)
     *
     * @var string
     */
    private string $logLevel;

    /**
     * Path to a log file
     *
     * @var string
     */
    private string $logFile;

    /**
     * Flag to enable/disable PDF generation
     *
     * @var bool
     */
    private bool $generateInvoices;

    /**
     * Flag to enable/disable deletion of archived pCloud folders
     *
     * @var bool
     */
    private bool $deletePcloudArchivedFolder;

    /**
     * Template type for invoice PDFs
     *
     * @var string
     */
    private string $pdfInvoiceTemplate;

    /**
     * Flag to enable/disable order removal after backup
     *
     * @var bool
     */
    private bool $removeOrders = false;
    /**
     * Template type for credit slip PDFs
     *
     * @var string
     */
    private string $pdfCreditInvoiceTemplate;

    /**
     * Successfully processed records
     *
     * @var array
     */
    private array $completedSuccessRecords;

    /**
     * Failed operations with error details
     *
     * @var array
     */
    private array $errorRecords;

    /**
     * Domain name for folder structure
     *
     * @var string
     */
    private string $domain;

    /**
     * Base name for backup folders
     *
     * @var string
     */
    private string $folderBaseName;

    /**
     * PrestaShop context instance
     *
     * @var Context
     */
    private Context $context;

    /**
     * Local server folder for temporary files
     *
     * @var string
     */
    private string $serverFolder;

    /**
     * Local server folder for temporary downloads
     *
     * @var string
     */
    private string $serverFolderDownloadTemp;

    /**
     * Progress hash for tracking operations
     *
     * @var string
     */
    private string $progressHash;


    /**
     * @throws Exception
     */
    public function __construct(bool $debug = true, string $logLevel = 'INFO')
    {
        $this->debug = $debug;
        $this->logLevel = $logLevel; // DEBUG, INFO, WARNING, ERROR
        $this->logFile = dirname(__DIR__) . '/../../var/logs/invoice_backup_detailed.log';
        $this->generateInvoices = true;
        $this->deletePcloudArchivedFolder = false;

        $this->pdfInvoiceTemplate = PDFCore::TEMPLATE_INVOICE;
        $this->pdfCreditInvoiceTemplate = PDFCore::TEMPLATE_ORDER_RETURN;

        $this->completedSuccessRecords = [];
        $this->errorRecords = [];

        $this->domain = 'IJzershop';
        $this->folderBaseName = 'Backup-' . $this->domain . '-';
        $this->context = Context::getContext();

        $this->access_token = Configuration::get('PCLOUD_ACCESS_TOKEN') ?:
            $_ENV['PCLOUD_ACCESS_TOKEN'] ??
            throw new Exception('pCloud access token not configured');

        $this->pCloudUserId = Configuration::get('PCLOUD_USER_ID') ?:
            $_ENV['PCLOUD_USER_ID'] ??
            throw new Exception('pCloud access token not configured');

        $this->pCloudLocationId = Configuration::get('PCLOUD_LOCATION_ID') ?:
            $_ENV['PCLOUD_LOCATION_ID'] ??
            throw new Exception('pCloud location id not configured');

        $this->rootFolderId = Configuration::get('PCLOUD_ROOT_FOLDER_ID') ?:
            $_ENV['PCLOUD_ROOT_FOLDER_ID'] ??
            throw new Exception('pCloud root folder id not configured');

        $this->serverFolder = str_replace('private_html',
            'public_html',
            $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'facturen' . DIRECTORY_SEPARATOR);
        $this->serverFolderDownloadTemp = str_replace('private_html',
            'public_html',
            $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'facturendownloads' . DIRECTORY_SEPARATOR);

        $this->progressHash = "623t472834t6782364t"; //Hashcode to follow the progress of zipping files


        $this->ensureContainerForCli();
        // Initialize pCloud connection with current parameters
        $this->initializePCloudConnection();
    }

    /**
     * Ensure Symfony container is available for CLI operations
     */
    private function ensureContainerForCli(): void
    {
        $context = Context::getContext();

        // Check if container is already available
        if ($context->container !== null) {
            $this->log('DEBUG', 'Container already available');
            return;
        }

        $this->log('WARNING', 'Container not available, initializing kernel');

        try {
            // Initialize kernel if not done
            if (!class_exists('\AppKernel')) {
                require_once _PS_ROOT_DIR_ . '/app/AppKernel.php';
            }

            // Try AdminKernel first for admin functionality
            if (file_exists(_PS_ROOT_DIR_ . '/app/AdminKernel.php')) {
                require_once _PS_ROOT_DIR_ . '/app/AdminKernel.php';
                $kernel = new \AdminKernel('prod', false);
            } else {
                $kernel = new \AppKernel('prod', false);
            }

            // Boot the kernel (PrestaShop 9 compatible)
            try {
                // For PrestaShop 9, boot method should handle multiple calls gracefully
                $kernel->boot();
            } catch (\RuntimeException $e) {
                // If kernel is already booted, this exception might be thrown
                if (strpos($e->getMessage(), 'already booted') === false) {
                    throw $e; // Re-throw if it's not a "already booted" error
                }
                // Otherwise, continue - kernel is already booted
            }

            // Set container in context
            $container = $kernel->getContainer();
            if ($container === null) {
                throw new \Exception('Container is null after kernel boot');
            }

            $context->container = $container;

            // Set smarty function for smarty template engine
            $this->registerSmartyClassesForCli();

            $this->log('DEBUG', 'Container successfully set in context');

        } catch (\Exception $e) {
            $this->log('ERROR', 'Failed to initialize container: ' . $e->getMessage());
            throw new Exception('Failed to initialize Symfony container: ' . $e->getMessage(), 0, $e);
        }
    }


    /**
     * Register necessary Smarty classes for CLI PDF generation
     */
    private function registerSmartyClassesForCli(): void
    {
        try {
            // Ensure Smarty is initialized
            if (!$this->context->smarty) {
                require_once _PS_ROOT_DIR_ . '/config/smarty.config.inc.php';
            }

            if (!$this->context->smarty) {
                $this->log('WARNING', 'Smarty not available for class registration');
                return;
            }

            // Register classes that are commonly used in PDF templates
            $classesToRegister = [
                'AttributeGroup', 'Message', 'Product', 'Customer', 'Order',
                'Currency', 'Country', 'State', 'Tools', 'Configuration',
                'Context', 'Address', 'CustomerMessage', 'Employee', 'Language',
                'Shop', 'Tax', 'TaxRule', 'OrderDetail', 'OrderInvoice',
                'OrderSlip', 'OrderReturn', 'OrderState', 'Carrier',
                'Manufacturer', 'Supplier'
            ];

            foreach ($classesToRegister as $className) {
                if (class_exists($className)) {
                    $this->context->smarty->registerClass($className, $className);
                    $this->log('DEBUG', "Registered Smarty class: {$className}");
                }
            }

            // Register specific static methods as modifiers if needed
            if (function_exists('smartyRegisterFunction')) {
                // Register the stripSawCutModuleAttributeGroupName as a modifier
                if (class_exists('AttributeGroup')) {
                    smartyRegisterFunction(
                        $this->context->smarty,
                        'modifier',
                        'stripSawCutModuleAttributeGroupName',
                        ['AttributeGroup', 'stripSawCutModuleAttributeGroupName']
                    );
                }

                // Register Message methods
                if (class_exists('Message')) {
                    smartyRegisterFunction(
                        $this->context->smarty,
                        'function',
                        'getMessagesByOrderId',
                        ['Message', 'getMessagesByOrderId']
                    );
                }

                // Register abs and other PHP functions
                $phpFunctions = [
                    'abs', 'ceil', 'floor', 'round', 'min', 'max',
                    'strlen', 'trim', 'number_format', 'date', 'strtotime'
                ];

                foreach ($phpFunctions as $func) {
                    if (function_exists($func)) {
                        smartyRegisterFunction(
                            $this->context->smarty,
                            'modifier',
                            $func,
                            $func
                        );
                    }
                }
            } else {
                // Fallback to direct registration
                $this->context->smarty->registerPlugin('modifier', 'abs', 'abs');
                $this->context->smarty->registerPlugin('modifier', 'ceil', 'ceil');
                $this->context->smarty->registerPlugin('modifier', 'floor', 'floor');
                $this->context->smarty->registerPlugin('modifier', 'round', 'round');

                // Register Message::getMessagesByOrderId as a function
                if (class_exists('Message')) {
                    $this->context->smarty->registerPlugin(
                        'function',
                        'getMessagesByOrderId',
                        function($params, $smarty) {
                            $orderId = isset($params['order_id']) ? (int)$params['order_id'] : 0;
                            $private = isset($params['private']) ? (bool)$params['private'] : false;

                            if ($orderId && class_exists('Message')) {
                                return Message::getMessagesByOrderId($orderId, $private);
                            }
                            return [];
                        }
                    );
                }

                // Register AttributeGroup method
                if (class_exists('AttributeGroup')) {
                    $this->context->smarty->registerPlugin(
                        'modifier',
                        'stripSawCutModuleAttributeGroupName',
                        ['AttributeGroup', 'stripSawCutModuleAttributeGroupName']
                    );
                }
            }

            $this->log('DEBUG', 'Smarty classes and functions registered successfully');

        } catch (\Exception $e) {
            $this->log('WARNING', 'Failed to register Smarty classes: ' . $e->getMessage());
            // Continue execution - this shouldn't be fatal
        }
    }


    /**
     * Main Backup function to run backups on all invoices. Also, archive invoices older than 7 years old. This script is meant to run every month on the first day
     *
     * --- Backup ---
     * Checks for necessary online folders at pCloud
     * Generates all invoices and credit slips needed to back up the required files and places in the folder on this server
     * Uploads all files in the folder to the defined pCloud folder
     *
     * --- Archiving ---
     * Archives directly on the pCloud
     *
     * OR (fallback when pCloud savezip archiving fails)
     * Download all files in the required folder
     * Creates a zip file on this server
     * Uploads the zip file back to pCloud
     * clears all files in the temp folder
     *
     * @param bool $locally Flag indicating local processing
     *
     * @throws Exception
     */
    public function runBackup(bool $locally): void
    {
        $startTime = microtime(true);
        $this->log('INFO', 'Starting backup process', ['local_mode' => $locally]);

        try {
            // Pre-flight checks
            $this->validateAndWarn();

            //Check for folders to upload all files to
            $folderArray = $this->checkFoldersPCloud($locally);
            $this->log('INFO', 'pCloud folders checked', $folderArray);

            // 1) Make 3-month MySQL export with CSV and XML
            $exportStartTime = microtime(true);
            $exportInfo = $this->exportOrdersSqlFromCurrentMinus3Months();
            $this->logExecutionTime('SQL Export', $exportStartTime);

            $ordersInWindow = $exportInfo['orders_in_window'] ?? [];
            $dumpFilePath = $exportInfo['dump_path'] ?? '';
            $csvFilePath = $exportInfo['csv_path'] ?? '';
            $xmlFilePath = $exportInfo['xml_path'] ?? '';

            $this->trackMetric('orders_in_window', count($ordersInWindow));
            $this->log('INFO', 'Export completed', [
                'orders_count' => count($ordersInWindow),
                'dump_file' => $dumpFilePath,
                'csv_file' => $csvFilePath,
                'xml_file' => $xmlFilePath
            ]);

            // 2) Generate PDFs for orders in that window
            if ($this->generateInvoices) {
                try {
                    $pdfStartTime = microtime(true);
                    $invoicesAndCreditInvoicesList = $this->fetchInvoicesAndCreditInvoicesListForOrders($ordersInWindow);

                    $invoiceCount = count($invoicesAndCreditInvoicesList['invoices'] ?? []);
                    $creditCount = count($invoicesAndCreditInvoicesList['credits'] ?? []);
                    $nonPdfCount = count($invoicesAndCreditInvoicesList['nonPdfGeneratedOrders'] ?? []);

                    $this->trackMetric('invoices_found', $invoiceCount);
                    $this->trackMetric('credits_found', $creditCount);
                    $this->trackMetric('non_pdf_orders_count', $nonPdfCount);

                    if (!$invoiceCount && !$creditCount) {
                        $this->log('WARNING', 'No files to upload - no invoices or credits found');
                        echo 'no files to upload';
                        return;
                    }

                    // Store non-PDF generated orders for later use
                    $nonPdfGeneratedOrders = $invoicesAndCreditInvoicesList['nonPdfGeneratedOrders'] ?? [];

                    if (!empty($nonPdfGeneratedOrders)) {
                        $this->log('WARNING', 'Orders without PDFs found', [
                            'count' => count($nonPdfGeneratedOrders),
                            'orders' => $nonPdfGeneratedOrders
                        ]);
                        echo 'Orders without PDFs: ' . implode(', ', $nonPdfGeneratedOrders) . PHP_EOL;
                    }

                    $this->log('INFO', 'PDF generation started', [
                        'invoices' => $invoiceCount,
                        'credits' => $creditCount,
                        'non_pdf_orders' => $nonPdfCount
                    ]);

                    $generateFiles = $this->createOrderSlips($invoicesAndCreditInvoicesList);
                    $timeout = 300; // 5-minute timeout
                    $elapsed = 0;
                    while (!isset($generateFiles) && $elapsed < $timeout) {
                        sleep(2);
                        $elapsed += 2;
                        $this->log('DEBUG', 'Waiting for PDF generation to complete', ['elapsed' => $elapsed]);
                    }

                    if (!isset($generateFiles)) {
                        throw new Exception('PDF generation timeout after ' . $timeout . ' seconds');
                    }

                    $this->logExecutionTime('PDF Generation', $pdfStartTime);

                } catch (PrestaShopDatabaseException|PrestaShopException $exception) {
                    $this->logError($exception, 'PDF Generation', ['orders_count' => count($ordersInWindow)]);
                    echo 'Generating files failed: ' . $exception->getMessage() . PHP_EOL;
                    return;
                }
            }

            // 3) Upload SQL dump first
            if ($dumpFilePath && file_exists($dumpFilePath)) {
                try {
                    $uploadStartTime = microtime(true);
                    $pCloudFileObject = new File($this->pCloudApp);
                    $base = basename($dumpFilePath);
                    $pCloudFileObject->upload($dumpFilePath, $folderArray['month_folder_id'], $base);
                    $this->logExecutionTime('SQL Upload', $uploadStartTime);
                    $this->log('INFO', 'SQL dump uploaded successfully', ['filename' => $base]);
                } catch (\Exception $e) {
                    $this->logError($e, 'SQL Upload', ['file' => $dumpFilePath]);
                }
            }

            // 4) Upload PDFs to pCloud
            $uploadStartTime = microtime(true);
            $uploadedFiles = $this->uploadFilesToPCloud($folderArray['month_folder_id']);
            $this->logExecutionTime('PDF Upload', $uploadStartTime);
            $this->trackMetric('files_uploaded', count($uploadedFiles));

            $this->cleanServerFolder($uploadedFiles);
            $this->log('INFO', 'Local cleanup completed', ['files_cleaned' => count($uploadedFiles)]);

            // 5) Reconciliation and generate missing orders files
            $pdfOrderRefs = $this->extractOrderRefsFromUploaded($uploadedFiles);
            $sqlOrderRefs = $ordersInWindow;
            $missing = array_values(array_diff($sqlOrderRefs, $pdfOrderRefs));

            $this->log('INFO', 'Reconciliation completed', [
                'sql_orders' => count($sqlOrderRefs),
                'pdf_orders' => count($pdfOrderRefs),
                'missing_count' => count($missing)
            ]);

            // Generate missing orders files
            $missingCsvFile = '';
            $missingXmlFile = '';

            if (count($missing) > 0) {
                $missingCsvFile = $this->generateMissingOrdersCsv($missing);
                $missingXmlFile = $this->generateMissingOrdersXml($missing);

                $this->log('WARNING', 'Missing orders files generated', [
                    'missing_orders' => $missing,
                    'csv_file' => $missingCsvFile,
                    'xml_file' => $missingXmlFile
                ]);

                $this->sendMissingOrdersEmail($missing, count($sqlOrderRefs), count($pdfOrderRefs));
            }

            // 6) Upload CSV, XML, and missing orders files to pCloud
            $additionalFiles = array_filter([
                $csvFilePath,
                $xmlFilePath,
                $missingCsvFile,
                $missingXmlFile
            ]);

            foreach ($additionalFiles as $filePath) {
                if (file_exists($filePath)) {
                    try {
                        $pCloudFileObject = new File($this->pCloudApp);
                        $fileName = basename($filePath);
                        $pCloudFileObject->upload($filePath, $folderArray['month_folder_id'], $fileName);
                        $this->log('INFO', 'Additional file uploaded successfully', ['filename' => $fileName]);
                    } catch (\Exception $e) {
                        $this->logError($e, 'Additional File Upload', ['file' => $filePath]);
                    }
                }
            }

            // 7) Remove successfully backed-up orders if requested
            if ($this->getRemoveOrders()) {
                $this->removeBackedUpOrders($ordersInWindow, $missing);
            }

            // Final metrics and summary
            $this->trackMetric('total_execution_time', microtime(true) - $startTime);
            $this->trackMetric('orders_processed', count($ordersInWindow));
            $this->logSummary();

            if (count($this->errorRecords) > 0) {
                $this->addToLogFile($this->errorRecords);
                $this->log('ERROR', 'Process completed with errors', ['error_count' => count($this->errorRecords)]);
            } else {
                $this->log('INFO', 'Process completed successfully');
            }

            echo 'success';

        } catch (\Exception $e) {
            $this->logError($e, 'runBackup', ['local_mode' => $locally]);
            $this->trackMetric('total_execution_time', microtime(true) - $startTime);
            $this->logSummary();
            throw $e;
        }
    }

    // ===== Section: Validation & Initialization =====

    /**
     * Validate critical conditions and log warnings
     */
    private function validateAndWarn(): void
    {
        // Check disk space
        $freeSpace = disk_free_space($this->serverFolder);
        if ($freeSpace < 1024 * 1024 * 100) { // Less than 100MB
            $this->log('WARNING', 'Low disk space detected', ['free_space_mb' => round($freeSpace / 1024 / 1024, 2)]);
        }

        // Check if folders exist
        if (!is_dir($this->serverFolder)) {
            $this->log('WARNING', 'Server folder does not exist', ['folder' => $this->serverFolder]);
        }

        // Check pCloud connection
        try {
            $this->pCloudFolder->getContent((int)$this->getRootFolderId());
            $this->log('DEBUG', 'pCloud connection successful');
        } catch (\Exception $e) {
            $this->log('ERROR', 'pCloud connection failed', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Initialize pCloud connection with current parameters
     */
    private function initializePCloudConnection(): void
    {
        $this->pCloudApp = new App();
        $this->pCloudApp->setAccessToken($this->access_token);
        $this->pCloudApp->setLocationId($this->pCloudLocationId);

        // Create a Folder instance
        $this->pCloudFolder = new Folder($this->pCloudApp);
        $this->pCloudRequest = new Request($this->pCloudApp);
    }

    /**
     * Check for folders on the pCloud and return id's of these folders
     *
     * @throws Exception
     */
    private function checkFoldersPCloud($locally = false): array
    {
        $archiveId = 0;
        $currentYear = date('Y');
        $currentMonth = date('M');
        $archiveYear = date('Y', strtotime('-7 years'));

        $yearFolderId = $this->findOrCreateFolderYear($this->folderBaseName . $currentYear);
        $monthFolderId = $this->findOrCreateFolderMonth($this->folderBaseName . $currentMonth, $yearFolderId);
        //Archive folder of the month older than 7 years
        $archiveOldFolder = $this->archiveFolder($this->folderBaseName . $currentMonth, $this->folderBaseName . $archiveYear, $locally);
        if (array_key_exists('file', $archiveOldFolder)) {
            $archiveId = $archiveOldFolder['file'];
        }
        return ['year_folder_id' => $yearFolderId, 'month_folder_id' => $monthFolderId, 'archived_folder_id' => $archiveId];
    }

    /**
     * Search for year folder in the root folder, if not exists create. And return folder id
     *
     * @param $name = name of the folder
     *
     */
    private function findOrCreateFolderYear($name)
    {
        try {
            $list = $this->pCloudFolder->getContent((int)$this->getRootFolderId());
            $searchedFolder = 0;
            foreach ($list as $item) {
                if ($name === $item->name) {
                    $searchedFolder = $item->folderid;
                }
            }

            if ($searchedFolder === 0) {
                $searchedFolder = $this->pCloudFolder->create($name, (int)$this->getRootFolderId());
            }
            return $searchedFolder;
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'findOrCreateFolderYear:180', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     *
     * Search for month folder in year folder, if not exists create. And return folder id
     *
     * @param $name = name of folder
     * @param $yearFolderId = folder id of parent folder based on year
     *
     */
    private function findOrCreateFolderMonth($name, $yearFolderId)
    {
        try {
            $list = $this->pCloudFolder->getContent((int)$yearFolderId);
            $searchedFolder = 0;
            foreach ($list as $item) {
                if ($name === $item->name) {
                    $searchedFolder = $item->folderid;
                }
            }

            if ($searchedFolder === 0) {
                $searchedFolder = $this->pCloudFolder->create($name, (int)$yearFolderId);
            }
            return $searchedFolder;
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'findOrCreateFolderMonth:231', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * @param $folderNameMonth
     * @param $folderNameYear
     * @param bool $local
     * @return array
     * @throws Exception
     */
    private function archiveFolder($folderNameMonth, $folderNameYear, bool $local = false): array
    {
        $list = $this->pCloudFolder->getContent((int)$this->getRootFolderId());
        $searchedYearFolder = 0;
        $searchedMonthFolder = 0;

        foreach ($list as $item) {
            if ($folderNameYear === $item->name) {
                $searchedYearFolder = $item->folderid;
            }
        }

        if ($searchedYearFolder === 0) {
            return [];
        }

        $listMonths = $this->pCloudFolder->getContent((int)$searchedYearFolder);
        foreach ($listMonths as $item) {
            if ($folderNameMonth === $item->name) {
                $searchedMonthFolder = $item->folderid;
            }
        }

        if ($searchedMonthFolder === 0) {
            return [];
        }

        try {
            if ($local) {
                return $this->archivePCloudFolderLocally($searchedMonthFolder, $searchedYearFolder);
            } else {
                return $this->archivePCloudFolder($searchedMonthFolder, $searchedYearFolder);
            }
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'archiveFolder:277', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Archive the folder locally.
     * First download all files, then zip them locally and upload the zip file again to pCloud
     *
     */
    private function archivePCloudFolderLocally($MonthFolder, $YearFolder): array
    {
        $fileList = [];
        try {
            $list = $this->pCloudFolder->getContent((int)$MonthFolder);
            $MonthFolderInfo = $this->pCloudFolder->getMetadata((int)$MonthFolder);
            $YearFolderInfo = $this->pCloudFolder->getMetadata((int)$YearFolder);
            $year = str_replace($this->folderBaseName, '', $YearFolderInfo->metadata->name);
            $month = str_replace($this->folderBaseName, '', $MonthFolderInfo->metadata->name);

            foreach ($list as $item) {
                $file = new File($this->pCloudApp);
                $fileList[] = $file->getInfo($item->fileid);
                $file->download($item->fileid, $this->serverFolderDownloadTemp);
            }
            $zip = $this->buildZip($fileList, $year . '-' . $month . '-' . date('d-m-Y-H-i-s'));
            $file = new File($this->pCloudApp);
            $res = $file->upload($zip['zip_name'], $YearFolder);
            $zipFileId = $res->metadata->fileid;

            foreach ($fileList as $item) {
                unlink($this->serverFolderDownloadTemp . $item->metadata->name);
            }
            unlink($zip['zip_name']);
            //Remove backedUpFolder
            if ($this->deletePcloudArchivedFolder) {
                $this->pCloudFolder->deleteRecursive((int)$MonthFolder);
            }
            return ['success' => true, 'file' => $zipFileId, 'time' => date('d-m-Y H:i:s')];
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'archivePCloudFolderLocally:317', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * @param $fileList
     * @param bool $zipName
     * @return array
     */
    private function buildZip($fileList, bool|string $zipName = false): array
    {
        if (!$zipName) {
            $zipName = date('d-m-Y-H-i-s');
        }

        try {
            $filename = $this->serverFolderDownloadTemp . $zipName . '.zip';
            $zip = new ZipArchive();
            if ($zip->open($filename, ZipArchive::CREATE) === TRUE) {
                foreach ($fileList as $file) {
                    // Add files to the zip file
                    $zip->addFile($this->serverFolderDownloadTemp . $file->metadata->name, $file->metadata->name);
                }
                // All files are added, so close the zip file.
                $zip->close();
            }
            return ['zip_name' => $filename, 'status' => $zip->getStatusString()];
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'buildZip:346', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Archive the folder on pCloud. Function is now disabled on pCloud server
     */
    private function archivePCloudFolder($monthFolderId, $yearFolderId): array|stdClass
    {
        try {
            $data = $this->pCloudRequest->get("savezip", [
                'folderid' => $monthFolderId,
                'tofolderid' => $yearFolderId,
                'progresshash' => $this->progressHash
            ]);
            //Remove backedUpFolder
            if ($this->deletePcloudArchivedFolder) {
                $this->pCloudFolder->deleteRecursive((int)$monthFolderId);
            }
            return $data;
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'archivePCloudFolder:368', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Fetch invoices/credits for a specific set of order references (used for last-month PDFs)
     * @throws PrestaShopException
     */
    private function fetchInvoicesAndCreditInvoicesListForOrders(array $orderReferences): array
    {
        if (empty($orderReferences)) {
            return ['invoices' => [], 'credits' => [], 'nonPdfGeneratedOrders' => []];
        }

        $invoiceObjects = [];
        $creditObjects = [];
        $ordersWithPdfs = [];

        try {
            foreach ($orderReferences as $reference) {
                // Get order by reference
                $orderId = Db::getInstance()->getValue('
                SELECT id_order
                FROM ' . _DB_PREFIX_ . 'orders
                WHERE reference = "' . pSQL($reference) . '"
            ');

                if (!$orderId) {
                    continue;
                }

                $order = new Order($orderId);
                if (!Validate::isLoadedObject($order)) {
                    continue;
                }

                // Check if the order is in invoice status
                if (in_array($order->current_state, $this->getInvoiceStatusses())) {
                    $orderInvoices = $order->getInvoicesCollection();
                    foreach ($orderInvoices as $orderInvoice) {
                        $invoiceObjects[] = $orderInvoice;
                        $ordersWithPdfs[] = $order->reference;
                    }
                }

                // Check if the order is in credit status
                if (in_array($order->current_state, $this->getCreditStatusses())) {
                    $orderInvoices = $order->getInvoicesCollection();
                    foreach ($orderInvoices as $orderInvoice) {
                        $creditObjects[] = $orderInvoice;
                        $ordersWithPdfs[] = $order->reference;
                    }
                }
            }

            // Find orders that don't have PDFs
            $ordersWithPdfs = array_unique($ordersWithPdfs);
            $nonPdfGeneratedOrders = array_values(array_diff($orderReferences, $ordersWithPdfs));

            return [
                'invoices' => $invoiceObjects,
                'credits' => $creditObjects,
                'nonPdfGeneratedOrders' => $nonPdfGeneratedOrders
            ];

        } catch (\Exception $e) {
            $this->addToLogFile(['location' => 'fetchInvoicesAndCreditInvoicesListForOrders', 'error' => $e->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            throw $e;
        }
    }

    /**
     * Export orders and related tables for a 1-month window starting 3 months ago (from the first day of -3 month to the last day of -2 month).
     * Returns dump_path and array of order references for that window.
     */
    private function exportOrdersSqlFromCurrentMinus3Months(): array
    {
        // Window based on the current date going 3 months back: from the first day of -3 month to now
        $start = date('Y-m-d H:i:s', strtotime('first day of -3 month'));
        $end = date('Y-m-d H:i:s', strtotime('last day of -2 month'));

        // For PDFs, we use the same window as SQL now
        $windowStart = $start;
        $windowEnd = $end;

        try {
            // Collect orders in a 3-month window
            $q = new DbQuery();
            $q->select('id_order, id_customer, id_address_delivery, id_address_invoice, reference, date_add, current_state, total_paid, total_paid_tax_incl, total_paid_tax_excl, total_shipping_tax_incl, date_upd');
            $q->from('orders');
            $q->where("date_add >= '" . pSQL($start) . "'");
            $q->where("date_add <= '" . pSQL($end) . "'");
            $orders = Db::getInstance()->executeS($q);
            if (!$orders) {
                $orders = [];
            }

            $orderIds = array_map(function ($o) {
                return (int)$o['id_order'];
            }, $orders);
            $orderRefs = array_map(function ($o) {
                return $o['reference'];
            }, $orders);

            // Orders in the 3-month rolling window (for PDF generation matching the SQL window)
            $ordersInWindow = array_values(array_unique(array_map(function ($o) {
                return $o['reference'];
            }, array_filter($orders, function ($o) use ($windowStart, $windowEnd) {
                return $o['date_add'] >= $windowStart && $o['date_add'] <= $windowEnd;
            }))));

            // If no orders, still return
            if (empty($orderIds)) {
                return [
                    'dump_path' => '',
                    'csv_path' => '',
                    'xml_path' => '',
                    'orders_in_window' => $ordersInWindow,
                    'missing_orders' => []
                ];
            }

            // ... existing data collection code ...
            $customerIds = array_values(array_unique(array_map(function ($o) {
                return (int)$o['id_customer'];
            }, $orders)));
            $addrIds = array_values(array_unique(array_merge(
                array_map(function ($o) {
                    return (int)$o['id_address_delivery'];
                }, $orders),
                array_map(function ($o) {
                    return (int)$o['id_address_invoice'];
                }, $orders)
            )));

            // Fetch related tables rows
            $data = [];
            $data['orders'] = $orders;
            $data['order_detail'] = $this->fetchTableByOrderIds('order_detail', 'id_order', $orderIds);
            $data['order_invoice'] = $this->fetchTableByOrderIds('order_invoice', 'id_order', $orderIds);
            $data['order_payment'] = $this->fetchTableByOrderIds('order_payment', 'order_reference', $orderRefs, true);
            $data['order_carrier'] = $this->fetchTableByOrderIds('order_carrier', 'id_order', $orderIds);
            $data['order_history'] = $this->fetchTableByOrderIds('order_history', 'id_order', $orderIds);
            $data['customer'] = $this->fetchTableByIds('customer', 'id_customer', $customerIds);
            $data['address'] = $this->fetchTableByIds('address', 'id_address', $addrIds);

            // Ensure folder exists
            if (!is_dir($this->serverFolder)) {
                @mkdir($this->serverFolder, 0777, true);
            }

            // Generate files
            $baseFileName = 'orders-3months-' . date('Y-m');

            $sqlFile = $this->generateSqlFile($data, $baseFileName);
            $csvFile = $this->generateCsvFile($orders, $baseFileName . '-all-orders');
            $xmlFile = $this->generateXmlFile($orders, $baseFileName . '-all-orders');

            return [
                'dump_path' => $sqlFile,
                'csv_path' => $csvFile,
                'xml_path' => $xmlFile,
                'orders_in_window' => $ordersInWindow
            ];

        } catch (\Exception $e) {
            $this->addToLogFile(['location' => 'exportOrdersSqlFromCurrentMinus3Months', 'error' => $e->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return [
                'dump_path' => '',
                'csv_path' => '',
                'xml_path' => '',
                'orders_in_window' => []
            ];
        }
    }

    /**
     * Generate SQL dump file
     */
    private function generateSqlFile(array $data, string $baseFileName): string
    {
        $dump = "-- PrestaShop partial dump: orders and related tables (last 3 months)\n";
        $dump .= "-- Generated at " . date('Y-m-d H:i:s') . "\n\n";

        foreach ($data as $table => $rows) {
            if (empty($rows)) {
                continue;
            }
            $dump .= "-- Table `$table`\n";
            foreach ($rows as $row) {
                $cols = array_keys($row);
                $vals = array_map(function ($v) {
                    if ($v === null) return 'NULL';
                    return "'" . pSQL((string)$v, true) . "'";
                }, array_values($row));
                $dump .= "INSERT INTO `$table` (`" . implode('`,`', $cols) . "`) VALUES (" . implode(',', $vals) . ");\n";
            }
            $dump .= "\n";
        }

        $fileName = $baseFileName . '.sql';
        $fullPath = $this->serverFolder . $fileName;
        file_put_contents($fullPath, $dump);

        return $fullPath;
    }

    /**
     * Generate an enhanced CSV file with customer and address details
     * @param array $orders
     * @param string $baseFileName
     * @return string
     * @throws Exception
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function generateCsvFile(array $orders, string $baseFileName): string
    {
        $filePath = $this->serverFolder . $baseFileName . '.csv';

        $handle = fopen($filePath, 'w');
        if (!$handle) {
            throw new Exception("Could not create CSV file: $filePath");
        }

        // Enhanced CSV headers with human-readable data
        $headers = [
            'order_id', 'reference', 'customer_name', 'customer_email', 'customer_phone',
            'delivery_firstname', 'delivery_lastname', 'delivery_company',
            'delivery_address1', 'delivery_address2', 'delivery_postcode', 'delivery_city',
            'delivery_state', 'delivery_country',
            'invoice_firstname', 'invoice_lastname', 'invoice_company',
            'invoice_address1', 'invoice_address2', 'invoice_postcode', 'invoice_city',
            'invoice_state', 'invoice_country',
            'payment_method', 'carrier_name', 'order_state', 'total_paid_tax_incl',
            'total_paid_tax_excl', 'total_shipping_tax_incl', 'currency',
            'date_add', 'date_upd'
        ];

        fputcsv($handle, $headers);

        foreach ($orders as $order) {
            // Get customer details
            $customer = new Customer($order['id_customer']);
            $customerName = $customer->firstname . ' ' . $customer->lastname;

            // Get delivery address details
            $deliveryAddress = new Address($order['id_address_delivery']);
            $deliveryState = $deliveryAddress->id_state ? State::getNameById($deliveryAddress->id_state) : '';
            $deliveryCountry = Country::getNameById($this->context->language->id, $deliveryAddress->id_country);

            // Get invoice address details
            $invoiceAddress = new Address($order['id_address_invoice']);
            $invoiceState = $invoiceAddress->id_state ? State::getNameById($invoiceAddress->id_state) : '';
            $invoiceCountry = Country::getNameById($this->context->language->id, $invoiceAddress->id_country);

            // Get payment method
            $paymentMethod = '';
            if (!empty($order['payment'])) {
                $paymentMethod = $order['payment'];
            }

            // Get carrier name
            $carrierName = '';
            if (!empty($order['id_carrier'])) {
                $carrier = new Carrier($order['id_carrier']);
                $carrierName = $carrier->name;
            }

            // Get order state name
            $orderState = '';
            if (!empty($order['current_state'])) {
                $orderStateObj = new OrderState($order['current_state']);
                $orderState = $orderStateObj->name[$this->context->language->id] ?? '';
            }

            // Get currency
            $currency = '';
            if (!empty($order['id_currency'])) {
                $currencyObj = new Currency($order['id_currency']);
                $currency = $currencyObj->iso_code;
            }

            $orderId = $order['id_order'] ?? '';
            $reference = $order['reference'] ?? '';
            $totalPaidTaxIncl = $order['total_paid_tax_incl'] ?? '0.00';
            $totalPaidTaxExcl = $order['total_paid_tax_excl'] ?? '0.00';
            $totalShippingTaxIncl = $order['total_shipping_tax_incl'] ?? '0.00';
            $dateAdd = $order['date_add'] ?? '';
            $dateUpd = $order['date_upd'] ?? '';

            $row = [
                $orderId,
                $reference,
                $customerName,
                $customer->email,
                $customer->phone ?? '',
                $deliveryAddress->firstname,
                $deliveryAddress->lastname,
                $deliveryAddress->company,
                $deliveryAddress->address1,
                $deliveryAddress->address2,
                $deliveryAddress->postcode,
                $deliveryAddress->city,
                $deliveryState,
                $deliveryCountry,
                $invoiceAddress->firstname,
                $invoiceAddress->lastname,
                $invoiceAddress->company,
                $invoiceAddress->address1,
                $invoiceAddress->address2,
                $invoiceAddress->postcode,
                $invoiceAddress->city,
                $invoiceState,
                $invoiceCountry,
                $paymentMethod,
                $carrierName,
                $orderState,
                $totalPaidTaxIncl,
                $totalPaidTaxExcl,
                $totalShippingTaxIncl,
                $currency,
                $dateAdd,
                $dateUpd
            ];


            fputcsv($handle, $row);
        }

        fclose($handle);
        $this->log('INFO', 'Enhanced CSV file generated', ['file' => $filePath, 'orders_count' => count($orders)]);

        return $filePath;
    }

    /**
     * Generate an enhanced XML file with customer and address details
     * @param array $orders
     * @param string $baseFileName
     * @return string
     * @throws DOMException
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function generateXmlFile(array $orders, string $baseFileName): string
    {
        $filePath = $this->serverFolder . $baseFileName . '.xml';

        $dom = new DOMDocument('1.0', 'UTF-8');
        $dom->formatOutput = true;

        $root = $dom->createElement('orders');
        $dom->appendChild($root);

        foreach ($orders as $orderData) {
            $orderElement = $dom->createElement('order');
            $root->appendChild($orderElement);

            // Basic order info
            $orderElement->appendChild($dom->createElement('id_order', htmlspecialchars((string)$orderData['id_order'])));
            $orderElement->appendChild($dom->createElement('reference', htmlspecialchars((string)$orderData['reference'])));
            $orderElement->appendChild($dom->createElement('date_add', htmlspecialchars((string)$orderData['date_add'])));
            $orderElement->appendChild($dom->createElement('date_upd', htmlspecialchars((string)$orderData['date_upd'])));

            // Get customer details
            $customer = new Customer($orderData['id_customer']);
            $customerElement = $dom->createElement('customer');
            $orderElement->appendChild($customerElement);
            $customerElement->appendChild($dom->createElement('name', htmlspecialchars((string)$customer->firstname . ' ' . $customer->lastname)));
            $customerElement->appendChild($dom->createElement('email', htmlspecialchars((string)$customer->email)));

            // Get delivery address
            $deliveryAddress = new Address($orderData['id_address_delivery']);
            $deliveryElement = $dom->createElement('delivery_address');
            $orderElement->appendChild($deliveryElement);
            $deliveryElement->appendChild($dom->createElement('firstname', htmlspecialchars((string)$deliveryAddress->firstname)));
            $deliveryElement->appendChild($dom->createElement('lastname', htmlspecialchars((string)$deliveryAddress->lastname)));
            $deliveryElement->appendChild($dom->createElement('company', htmlspecialchars((string)$deliveryAddress->company)));
            $deliveryElement->appendChild($dom->createElement('address1', htmlspecialchars((string)$deliveryAddress->address1)));
            $deliveryElement->appendChild($dom->createElement('address2', htmlspecialchars((string)$deliveryAddress->address2)));
            $deliveryElement->appendChild($dom->createElement('postcode', htmlspecialchars((string)$deliveryAddress->postcode)));
            $deliveryElement->appendChild($dom->createElement('phone', htmlspecialchars((string)$deliveryAddress->phone ?? '')));
            $deliveryElement->appendChild($dom->createElement('city', htmlspecialchars((string)$deliveryAddress->city)));

            $deliveryState = $deliveryAddress->id_state ? State::getNameById($deliveryAddress->id_state) : '';
            $deliveryElement->appendChild($dom->createElement('state', htmlspecialchars((string)$deliveryState)));

            $deliveryCountry = Country::getNameById($this->context->language->id, $deliveryAddress->id_country);
            $deliveryElement->appendChild($dom->createElement('country', htmlspecialchars((string)$deliveryCountry)));

            // Get invoice address
            $invoiceAddress = new Address($orderData['id_address_invoice']);
            $invoiceElement = $dom->createElement('invoice_address');
            $orderElement->appendChild($invoiceElement);
            $invoiceElement->appendChild($dom->createElement('firstname', htmlspecialchars((string)$invoiceAddress->firstname)));
            $invoiceElement->appendChild($dom->createElement('lastname', htmlspecialchars((string)$invoiceAddress->lastname)));
            $invoiceElement->appendChild($dom->createElement('company', htmlspecialchars((string)$invoiceAddress->company)));
            $invoiceElement->appendChild($dom->createElement('address1', htmlspecialchars((string)$invoiceAddress->address1)));
            $invoiceElement->appendChild($dom->createElement('address2', htmlspecialchars((string)$invoiceAddress->address2)));
            $invoiceElement->appendChild($dom->createElement('postcode', htmlspecialchars((string)$invoiceAddress->postcode)));
            $invoiceElement->appendChild($dom->createElement('city', htmlspecialchars((string)$invoiceAddress->city)));

            $invoiceState = $invoiceAddress->id_state ? State::getNameById($invoiceAddress->id_state) : '';
            $invoiceElement->appendChild($dom->createElement('state', htmlspecialchars((string)$invoiceState)));

            $invoiceCountry = Country::getNameById($this->context->language->id, $invoiceAddress->id_country);
            $invoiceElement->appendChild($dom->createElement('country', htmlspecialchars((string)$invoiceCountry)));

            // Payment and shipping info
            $paymentMethod = $orderData['payment'] ?? '';
            $orderElement->appendChild($dom->createElement('payment_method', htmlspecialchars((string)$paymentMethod)));

            // Get carrier name
            $carrierName = '';
            if (!empty($orderData['id_carrier'])) {
                $carrier = new Carrier($orderData['id_carrier']);
                $carrierName = $carrier->name;
            }
            $orderElement->appendChild($dom->createElement('carrier_name', htmlspecialchars((string)$carrierName)));

            // Get order state name
            $orderState = '';
            if (!empty($orderData['current_state'])) {
                $orderStateObj = new OrderState($orderData['current_state']);
                $orderState = $orderStateObj->name[$this->context->language->id] ?? '';
            }
            $orderElement->appendChild($dom->createElement('order_state', htmlspecialchars((string)$orderState)));

            // Financial info
            $orderElement->appendChild($dom->createElement('total_paid_tax_incl', htmlspecialchars((string)$orderData['total_paid_tax_incl'])));
            $orderElement->appendChild($dom->createElement('total_paid_tax_excl', htmlspecialchars((string)$orderData['total_paid_tax_excl'])));
            $orderElement->appendChild($dom->createElement('total_shipping_tax_incl', htmlspecialchars((string)$orderData['total_shipping_tax_incl'])));

            // Get currency
            $currency = '';
            if (!empty($orderData['id_currency'])) {
                $currencyObj = new Currency($orderData['id_currency']);
                $currency = $currencyObj->iso_code;
            }
            $orderElement->appendChild($dom->createElement('currency', htmlspecialchars($currency)));
        }

        $dom->save($filePath);
        $this->log('INFO', 'Enhanced XML file generated', ['file' => $filePath, 'orders_count' => count($orders)]);

        return $filePath;
    }



    /**
     * Generate an enhanced CSV file for missing orders with detailed customer and address information
     * @param array $missingOrders Array of order references that are missing
     * @return string Path to generated CSV file
     */
    private function generateMissingOrdersCsv(array $missingOrders): string
    {
        if (empty($missingOrders)) {
            return '';
        }

        $baseFileName = 'missing-orders-' . date('Y-m-d-H-i-s');
        $filePath = $this->serverFolder . $baseFileName . '.csv';

        try {
            $handle = fopen($filePath, 'w');
            if (!$handle) {
                throw new Exception("Could not create missing orders CSV file: $filePath");
            }

            // Enhanced CSV header with all the detailed fields
            $header = [
                'Order ID', 'Reference', 'Date Added', 'Date Updated', 'Current State',
                'Customer Name', 'Customer Email', 'Customer Phone',
                'Delivery First Name', 'Delivery Last Name', 'Delivery Company',
                'Delivery Address 1', 'Delivery Address 2', 'Delivery Postcode',
                'Delivery City', 'Delivery State', 'Delivery Country',
                'Invoice First Name', 'Invoice Last Name', 'Invoice Company',
                'Invoice Address 1', 'Invoice Address 2', 'Invoice Postcode',
                'Invoice City', 'Invoice State', 'Invoice Country',
                'Payment Method', 'Carrier Name', 'Order State Name',
                'Total Paid (Tax Incl)', 'Total Paid (Tax Excl)', 'Total Shipping (Tax Incl)', 'Currency'
            ];
            fputcsv($handle, $header);

            // Get detailed order data for missing orders
            foreach ($missingOrders as $reference) {
                // Get order by reference
                $q = new DbQuery();
                $q->select('*');
                $q->from('orders');
                $q->where("reference = '" . pSQL($reference) . "'");
                $orderData = Db::getInstance()->getRow($q);

                if (!$orderData) {
                    // If order not found, create a minimal record
                    $row = array_fill(0, count($header), 'ORDER NOT FOUND');
                    $row[1] = $reference; // Set reference
                    fputcsv($handle, $row);
                    continue;
                }

                // Get customer details
                $customer = new Customer($orderData['id_customer']);
                $customerName = $customer->firstname . ' ' . $customer->lastname;
                $customerEmail = $customer->email ?? '';
                $customerPhone = $customer->phone ?? '';

                // Get delivery address
                $deliveryAddress = new Address($orderData['id_address_delivery']);
                $deliveryState = $deliveryAddress->id_state ? State::getNameById($deliveryAddress->id_state) : '';
                $deliveryCountry = Country::getNameById($this->context->language->id, $deliveryAddress->id_country);

                // Get invoice address
                $invoiceAddress = new Address($orderData['id_address_invoice']);
                $invoiceState = $invoiceAddress->id_state ? State::getNameById($invoiceAddress->id_state) : '';
                $invoiceCountry = Country::getNameById($this->context->language->id, $invoiceAddress->id_country);

                // Get carrier name
                $carrierName = '';
                if (!empty($orderData['id_carrier'])) {
                    $carrier = new Carrier($orderData['id_carrier']);
                    $carrierName = $carrier->name ?? '';
                }

                // Get order state name
                $orderStateName = '';
                if (!empty($orderData['current_state'])) {
                    $orderStateObj = new OrderState($orderData['current_state']);
                    $orderStateName = $orderStateObj->name[$this->context->language->id] ?? '';
                }

                // Get currency
                $currency = '';
                if (!empty($orderData['id_currency'])) {
                    $currencyObj = new Currency($orderData['id_currency']);
                    $currency = $currencyObj->iso_code ?? '';
                }

                // Build comprehensive row data
                $row = [
                    $orderData['id_order'] ?? '',
                    $orderData['reference'] ?? '',
                    $orderData['date_add'] ?? '',
                    $orderData['date_upd'] ?? '',
                    $orderData['current_state'] ?? '',
                    $customerName,
                    $customerEmail,
                    $customerPhone,
                    $deliveryAddress->firstname ?? '',
                    $deliveryAddress->lastname ?? '',
                    $deliveryAddress->company ?? '',
                    $deliveryAddress->address1 ?? '',
                    $deliveryAddress->address2 ?? '',
                    $deliveryAddress->postcode ?? '',
                    $deliveryAddress->city ?? '',
                    $deliveryState,
                    $deliveryCountry,
                    $invoiceAddress->firstname ?? '',
                    $invoiceAddress->lastname ?? '',
                    $invoiceAddress->company ?? '',
                    $invoiceAddress->address1 ?? '',
                    $invoiceAddress->address2 ?? '',
                    $invoiceAddress->postcode ?? '',
                    $invoiceAddress->city ?? '',
                    $invoiceState,
                    $invoiceCountry,
                    $orderData['payment'] ?? '',
                    $carrierName,
                    $orderStateName,
                    $orderData['total_paid_tax_incl'] ?? '',
                    $orderData['total_paid_tax_excl'] ?? '',
                    $orderData['total_shipping_tax_incl'] ?? '',
                    $currency
                ];

                fputcsv($handle, $row);
            }

            fclose($handle);
            $this->log('INFO', 'Enhanced missing orders CSV file generated', [
                'file' => $filePath,
                'missing_count' => count($missingOrders)
            ]);

            return $filePath;

        } catch (\Exception $e) {
            $this->addToLogFile([
                'location' => 'generateMissingOrdersCsv',
                'error' => $e->getMessage(),
                'time' => date('d-m-Y H:i:s')
            ]);
            return '';
        }
    }

    /**
     * Generate an enhanced XML file for missing orders with detailed customer and address information
     * @param array $missingOrders Array of order references that are missing
     * @return string Path to generated XML file
     */
    private function generateMissingOrdersXml(array $missingOrders): string
    {
        if (empty($missingOrders)) {
            return '';
        }

        $baseFileName = 'missing-orders-' . date('Y-m-d-H-i-s');
        $filePath = $this->serverFolder . $baseFileName . '.xml';

        try {
            $dom = new DOMDocument('1.0', 'UTF-8');
            $dom->formatOutput = true;

            $root = $dom->createElement('missing_orders');
            $dom->appendChild($root);

            // Get detailed order data for missing orders
            foreach ($missingOrders as $reference) {
                $orderElement = $dom->createElement('missing_order');
                $root->appendChild($orderElement);

                // Get order by reference
                $q = new DbQuery();
                $q->select('*');
                $q->from('orders');
                $q->where("reference = '" . pSQL($reference) . "'");
                $orderData = Db::getInstance()->getRow($q);

                if (!$orderData) {
                    // If order not found, create a minimal record
                    $orderElement->appendChild($dom->createElement('reference', htmlspecialchars((string)$reference)));
                    $orderElement->appendChild($dom->createElement('status', htmlspecialchars('ORDER NOT FOUND')));
                    continue;
                }

                // Basic order info
                $orderElement->appendChild($dom->createElement('id_order', htmlspecialchars((string)$orderData['id_order'])));
                $orderElement->appendChild($dom->createElement('reference', htmlspecialchars((string)$orderData['reference'])));
                $orderElement->appendChild($dom->createElement('date_add', htmlspecialchars((string)$orderData['date_add'])));
                $orderElement->appendChild($dom->createElement('date_upd', htmlspecialchars((string)$orderData['date_upd'])));

                // Get customer details
                $customer = new Customer($orderData['id_customer']);
                $customerElement = $dom->createElement('customer');
                $orderElement->appendChild($customerElement);
                $customerElement->appendChild($dom->createElement('name', htmlspecialchars((string)($customer->firstname . ' ' . $customer->lastname))));
                $customerElement->appendChild($dom->createElement('email', htmlspecialchars((string)$customer->email)));
                $customerElement->appendChild($dom->createElement('phone', htmlspecialchars((string)($customer->phone ?? ''))));

                // Get delivery address
                $deliveryAddress = new Address($orderData['id_address_delivery']);
                $deliveryElement = $dom->createElement('delivery_address');
                $orderElement->appendChild($deliveryElement);
                $deliveryElement->appendChild($dom->createElement('firstname', htmlspecialchars((string)$deliveryAddress->firstname)));
                $deliveryElement->appendChild($dom->createElement('lastname', htmlspecialchars((string)$deliveryAddress->lastname)));
                $deliveryElement->appendChild($dom->createElement('company', htmlspecialchars((string)$deliveryAddress->company)));
                $deliveryElement->appendChild($dom->createElement('address1', htmlspecialchars((string)$deliveryAddress->address1)));
                $deliveryElement->appendChild($dom->createElement('address2', htmlspecialchars((string)$deliveryAddress->address2)));
                $deliveryElement->appendChild($dom->createElement('postcode', htmlspecialchars((string)$deliveryAddress->postcode)));
                $deliveryElement->appendChild($dom->createElement('city', htmlspecialchars((string)$deliveryAddress->city)));

                $deliveryState = $deliveryAddress->id_state ? State::getNameById($deliveryAddress->id_state) : '';
                $deliveryElement->appendChild($dom->createElement('state', htmlspecialchars((string)$deliveryState)));

                $deliveryCountry = Country::getNameById($this->context->language->id, $deliveryAddress->id_country);
                $deliveryElement->appendChild($dom->createElement('country', htmlspecialchars((string)$deliveryCountry)));

                // Get invoice address
                $invoiceAddress = new Address($orderData['id_address_invoice']);
                $invoiceElement = $dom->createElement('invoice_address');
                $orderElement->appendChild($invoiceElement);
                $invoiceElement->appendChild($dom->createElement('firstname', htmlspecialchars((string)$invoiceAddress->firstname)));
                $invoiceElement->appendChild($dom->createElement('lastname', htmlspecialchars((string)$invoiceAddress->lastname)));
                $invoiceElement->appendChild($dom->createElement('company', htmlspecialchars((string)$invoiceAddress->company)));
                $invoiceElement->appendChild($dom->createElement('address1', htmlspecialchars((string)$invoiceAddress->address1)));
                $invoiceElement->appendChild($dom->createElement('address2', htmlspecialchars((string)$invoiceAddress->address2)));
                $invoiceElement->appendChild($dom->createElement('postcode', htmlspecialchars((string)$invoiceAddress->postcode)));
                $invoiceElement->appendChild($dom->createElement('city', htmlspecialchars((string)$invoiceAddress->city)));

                $invoiceState = $invoiceAddress->id_state ? State::getNameById($invoiceAddress->id_state) : '';
                $invoiceElement->appendChild($dom->createElement('state', htmlspecialchars((string)$invoiceState)));

                $invoiceCountry = Country::getNameById($this->context->language->id, $invoiceAddress->id_country);
                $invoiceElement->appendChild($dom->createElement('country', htmlspecialchars((string)$invoiceCountry)));

                // Payment and shipping info
                $paymentMethod = $orderData['payment'] ?? '';
                $orderElement->appendChild($dom->createElement('payment_method', htmlspecialchars((string)$paymentMethod)));

                // Get carrier name
                $carrierName = '';
                if (!empty($orderData['id_carrier'])) {
                    $carrier = new Carrier($orderData['id_carrier']);
                    $carrierName = $carrier->name ?? '';
                }
                $orderElement->appendChild($dom->createElement('carrier_name', htmlspecialchars((string)$carrierName)));

                // Get order state name
                $orderState = '';
                if (!empty($orderData['current_state'])) {
                    $orderStateObj = new OrderState($orderData['current_state']);
                    $orderState = $orderStateObj->name[$this->context->language->id] ?? '';
                }
                $orderElement->appendChild($dom->createElement('order_state', htmlspecialchars((string)$orderState)));

                // Financial info
                $orderElement->appendChild($dom->createElement('total_paid_tax_incl', htmlspecialchars((string)$orderData['total_paid_tax_incl'])));
                $orderElement->appendChild($dom->createElement('total_paid_tax_excl', htmlspecialchars((string)$orderData['total_paid_tax_excl'])));
                $orderElement->appendChild($dom->createElement('total_shipping_tax_incl', htmlspecialchars((string)$orderData['total_shipping_tax_incl'])));

                // Get currency
                $currency = '';
                if (!empty($orderData['id_currency'])) {
                    $currencyObj = new Currency($orderData['id_currency']);
                    $currency = $currencyObj->iso_code ?? '';
                }
                $orderElement->appendChild($dom->createElement('currency', htmlspecialchars((string)$currency)));
            }

            $dom->save($filePath);
            $this->log('INFO', 'Enhanced missing orders XML file generated', [
                'file' => $filePath,
                'missing_count' => count($missingOrders)
            ]);

            return $filePath;

        } catch (\Exception $e) {
            $this->addToLogFile([
                'location' => 'generateMissingOrdersXml',
                'error' => $e->getMessage(),
                'time' => date('d-m-Y H:i:s')
            ]);
            return '';
        }
    }


    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    private function fetchTableByOrderIds(string $table, string $col, array $idsOrRefs, bool $isRef = false): array
    {
        if (empty($idsOrRefs)) {
            return [];
        }
        $idsOrRefs = array_values(array_unique($idsOrRefs));
        if ($isRef) {
            $escaped = array_map('pSQL', $idsOrRefs);
            $in = "'" . implode("','", $escaped) . "'";
        } else {
            $in = implode(',', array_map('intval', $idsOrRefs));
        }
        $q = new DbQuery();
        $q->select('*')->from($table)->where($col . ' IN (' . $in . ')');
        return Db::getInstance()->executeS($q) ?: [];
    }

    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    private function fetchTableByIds(string $table, string $col, array $ids): array
    {
        if (empty($ids)) {
            return [];
        }
        $in = implode(',', array_map('intval', array_values(array_unique($ids))));
        $q = new DbQuery();
        $q->select('*')->from($table)->where($col . ' IN (' . $in . ')');
        return Db::getInstance()->executeS($q) ?: [];
    }

    private function extractOrderRefsFromUploaded(array $uploadedFiles): array
    {
        $refs = [];
        foreach ($uploadedFiles as $filename => $meta) {
            // Only consider FACT-PDFs (invoices)
            if (stripos($filename, 'FACT-') === 0) {
                $parts = explode('-', $filename);
                if (isset($parts[1])) {
                    $refs[] = $parts[1];
                }
            }
        }
        return array_values(array_unique($refs));
    }

    /**
     * Remove successfully backed up orders from the database
     *
     * @param array $allOrderRefs All orders that were processed
     * @param array $missingRefs Orders that are missing PDFs (will be kept)
     * @throws \Exception
     */
    private function removeBackedUpOrders(array $allOrderRefs, array $missingRefs): void
    {
        $startTime = microtime(true);
        $this->log('WARNING', 'Starting order removal process - THIS IS IRREVERSIBLE!');

        // Calculate orders to remove (all orders minus missing ones)
        $ordersToRemove = array_values(array_diff($allOrderRefs, $missingRefs));

        if (empty($ordersToRemove)) {
            $this->log('INFO', 'No orders to remove - all orders are missing PDFs');
            return;
        }

        $this->log('WARNING', 'Orders to be removed', [
            'total_orders' => count($allOrderRefs),
            'missing_orders' => count($missingRefs),
            'orders_to_remove' => count($ordersToRemove),
            'order_references' => $ordersToRemove
        ]);

        $removedCount = 0;
        $failedCount = 0;
        $failedOrders = [];

        foreach ($ordersToRemove as $orderRef) {
            try {
                $this->log('DEBUG', 'Removing order', ['reference' => $orderRef]);

                // Get order by reference
                $orderId = $this->getOrderIdByReference($orderRef);
                if (!$orderId) {
                    $this->log('WARNING', 'Order not found by reference', ['reference' => $orderRef]);
                    $failedCount++;
                    $failedOrders[] = $orderRef;
                    continue;
                }

                // Remove the order completely
                $result = $this->removeOrderCompletely($orderId);

                if ($result) {
                    $removedCount++;
                    $this->log('DEBUG', 'Order removed successfully', ['reference' => $orderRef, 'id' => $orderId]);
                } else {
                    $failedCount++;
                    $failedOrders[] = $orderRef;
                    $this->log('ERROR', 'Failed to remove order', ['reference' => $orderRef, 'id' => $orderId]);
                }

                // Add a small delay to avoid overwhelming the database
                if ($this->getSleepTime() > 0) {
                    sleep($this->getSleepTime());
                }

            } catch (\Exception $e) {
                $failedCount++;
                $failedOrders[] = $orderRef;
                $this->logError($e, 'Order Removal', ['reference' => $orderRef]);
            }
        }

        $this->logExecutionTime('Order Removal', $startTime);
        $this->trackMetric('orders_removed', $removedCount);
        $this->trackMetric('orders_removal_failed', $failedCount);

        $this->log('WARNING', 'Order removal completed', [
            'removed_count' => $removedCount,
            'failed_count' => $failedCount,
            'failed_orders' => $failedOrders
        ]);

        if ($failedCount > 0) {
            // Send email about failed removals
            $this->sendOrderRemovalFailureEmail($failedOrders, $removedCount, $failedCount);
        }
    }

    /**
     * Get order ID by order reference
     *
     * @param string $reference
     * @return int|false
     * @throws PrestaShopException
     */
    private function getOrderIdByReference(string $reference): false|int
    {
        $sql = 'SELECT id_order FROM ' . _DB_PREFIX_ . 'orders WHERE reference = "' . pSQL($reference) . '"';
        return Db::getInstance()->getValue($sql);
    }

    /**
     * Remove an order completely from the database
     *
     * @param int $orderId
     * @return bool
     * @throws PrestaShopDatabaseException|PrestaShopException
     */
    private function removeOrderCompletely(int $orderId): bool
    {
        try {
            $order = new Order($orderId);
            if (!$order->id) {
                $this->log('WARNING', 'Order not found', ['id' => $orderId]);
                return false;
            }

            // Start transaction
            $db = Db::getInstance();
            $db->execute('START TRANSACTION');

            // Remove related data in correct order to avoid foreign key constraints
            $this->removeOrderRelatedData($orderId);

            // Finally, remove the main order record
            $result = $order->delete();

            if ($result) {
                // Commit transaction
                $db->execute('COMMIT');
                return true;
            } else {
                // Rollback transaction
                $db->execute('ROLLBACK');
                return false;
            }

        } catch (\Exception $e) {
            $db = Db::getInstance();
            /** @var Db $db */
            $db->execute('ROLLBACK');
            throw $e;
        }
    }

    /**
     * Remove all data related to an order
     *
     * @param int $orderId
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function removeOrderRelatedData(int $orderId): void
    {
        $tables = [
            // Order details and products
            _DB_PREFIX_ . 'order_detail_tax' => 'id_order_detail IN (SELECT id_order_detail FROM ' . _DB_PREFIX_ . 'order_detail WHERE id_order = ' . $orderId . ')',
            _DB_PREFIX_ . 'order_detail' => 'id_order = ' . $orderId,

            // Order payments and invoices
            _DB_PREFIX_ . 'order_invoice_payment' => 'id_order_invoice IN (SELECT id_order_invoice FROM ' . _DB_PREFIX_ . 'order_invoice WHERE id_order = ' . $orderId . ')',
            _DB_PREFIX_ . 'order_invoice_tax' => 'id_order_invoice IN (SELECT id_order_invoice FROM ' . _DB_PREFIX_ . 'order_invoice WHERE id_order = ' . $orderId . ')',
            _DB_PREFIX_ . 'order_invoice' => 'id_order = ' . $orderId,
            _DB_PREFIX_ . 'order_payment' => 'order_reference IN (SELECT reference FROM ' . _DB_PREFIX_ . 'orders WHERE id_order = ' . $orderId . ')',

            // Order returns and slips
            _DB_PREFIX_ . 'order_slip_detail' => 'id_order_slip IN (SELECT id_order_slip FROM ' . _DB_PREFIX_ . 'order_slip WHERE id_order = ' . $orderId . ')',
            _DB_PREFIX_ . 'order_slip_detail_tax' => 'id_order_slip_detail IN (SELECT id_order_slip_detail FROM ' . _DB_PREFIX_ . 'order_slip_detail WHERE id_order_slip IN (SELECT id_order_slip FROM ' . _DB_PREFIX_ . 'order_slip WHERE id_order = ' . $orderId . '))',
            _DB_PREFIX_ . 'order_slip' => 'id_order = ' . $orderId,
            _DB_PREFIX_ . 'order_return_detail' => 'id_order_return IN (SELECT id_order_return FROM ' . _DB_PREFIX_ . 'order_return WHERE id_order = ' . $orderId . ')',
            _DB_PREFIX_ . 'order_return' => 'id_order = ' . $orderId,

            // Order carriers and shipping
            _DB_PREFIX_ . 'order_carrier' => 'id_order = ' . $orderId,
            _DB_PREFIX_ . 'delivery' => 'id_order = ' . $orderId,

            // Order cart
            _DB_PREFIX_ . 'order_cart_rule' => 'id_order = ' . $orderId,

            // Order history and states
            _DB_PREFIX_ . 'order_history' => 'id_order = ' . $orderId,

            // Order messages
            _DB_PREFIX_ . 'message' => 'id_order = ' . $orderId,
            _DB_PREFIX_ . 'customer_message' => 'id_order = ' . $orderId,
        ];

        foreach ($tables as $table => $condition) {
            $sql = 'DELETE FROM `' . $table . '` WHERE ' . $condition;
            $this->log('DEBUG', 'Removing related data', ['table' => $table, 'condition' => $condition]);

            if (!Db::getInstance()->execute($sql)) {
                throw new PrestaShopDatabaseException('Failed to delete from ' . $table);
            }
        }
    }

    /**
     * Send email notification about failed order removals
     *
     * @param array $failedOrders
     * @param int $removedCount
     * @param int $failedCount
     */
    private function sendOrderRemovalFailureEmail(array $failedOrders, int $removedCount, int $failedCount): void
    {
        try {
            $to = Configuration::get('PS_SHOP_EMAIL');
            if (!$to) {
                $to = 'admin@localhost';
            }

            $subject = '[CRITICAL] Order Removal Failures - Manual Intervention Required';
            $body = "Order removal process completed with errors:\n\n";
            $body .= "Successfully removed: $removedCount orders\n";
            $body .= "Failed to remove: $failedCount orders\n\n";
            $body .= "Failed order references:\n" . implode(", ", $failedOrders) . "\n\n";
            $body .= "Please check the logs and manually review these orders.\n";
            $body .= "Time: " . date('Y-m-d H:i:s');

            @mail($to, $subject, $body);

        } catch (\Exception $e) {
            $this->addToLogFile([
                'location' => 'sendOrderRemovalFailureEmail',
                'error' => $e->getMessage(),
                'time' => date('d-m-Y H:i:s')
            ]);
        }
    }


    private function sendMissingOrdersEmail(array $missingRefs, int $expected, int $actual): void
    {
        try {
            $to = Configuration::get('PS_SHOP_EMAIL');
            if (!$to) {
                $to = 'admin@localhost';
            }
            $subject = '[Backup Warning] Missing invoice PDFs for last-month orders';
            $body = "Expected PDFs: $expected\nActual PDFs: $actual\nMissing order references (" . count($missingRefs) . "):\n" . implode(", ", $missingRefs);
            @mail($to, $subject, $body);
        } catch (\Exception $e) {
            $this->addToLogFile(['location' => 'sendMissingOrdersEmail', 'error' => $e->getMessage(), 'time' => date('d-m-Y H:i:s')]);
        }
    }

    /**
     * Create an order slip PDF and set all new states of the selected orders.
     *
     * @param $invoicesAndCreditInvoicesList
     *
     * @return array
     */
    private function createOrderSlips($invoicesAndCreditInvoicesList): array
    {
        if (!count($invoicesAndCreditInvoicesList['invoices']) && !count($invoicesAndCreditInvoicesList['credits'])) {
            return ['error' => 'no invoices or credit slips available'];
        }

        try {
            foreach ($invoicesAndCreditInvoicesList['invoices'] as $invoice) {
                $fileName = $this->generateFileName($invoice);
                $this->generatePdfFile($invoice, $this->pdfInvoiceTemplate, $fileName);
                sleep($this->getSleepTime());
            }

            foreach ($invoicesAndCreditInvoicesList['credits'] as $credit) {
                $fileName = $this->generateFileName($credit, 'CRED');
                $this->generatePdfFile($credit, $this->pdfCreditInvoiceTemplate, $fileName);
                sleep($this->getSleepTime());
            }
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'createOrderSlips:445', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
        return ['success' => true, 'error' => ''];
    }

    /**
     * Generate new filenames for files. Build from:
     * type : FACT or CRED
     * order reference
     * customer_email
     * payment_method
     * total paid value
     *
     */
    private function generateFileName(mixed $object, $type = 'FACT'): string
    {
        try {
            $order = new Order($object->id_order);
            $customer = new Customer($order->id_customer);
            $payment = str_replace('|','-', $order->payment);
            $customer_email = $customer->email;

            $price = round((float)$object->total_paid_tax_incl, 2);
            return preg_replace(['/\s+/'], [''], $type . '-' . str_replace('-', '', $order->reference) . '-' . $customer_email . '-' . $payment . '-' . $price);
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'generateFileName:471', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return '';
        }
    }

    /**
     * Render a single PDF document (invoice or credit slip) for a given object.
     *
     */

    public function generatePdfFile($object, $template, $fileName): array
    {
        try {
            // Enable error reporting to catch all errors
            $old_error_reporting = error_reporting(E_ALL);

            // Ensure proper context setup for PDF generation
            if (!$this->context) {
                $this->context = Context::getContext();
            }

            // Set up the proper context for CLI execution
            if (!$this->context->shop) {
                $this->context->shop = new Shop(1);
            }

            if (!$this->context->language) {
                $this->context->language = new Language(1);
            }

            // Set up proper currency - get default currency or first available
            if (!$this->context->currency) {
                $defaultCurrencyId = Configuration::get('PS_CURRENCY_DEFAULT');
                $this->context->currency = new Currency($defaultCurrencyId ?: 1);
            }

            // Initialize Smarty if not already done
            if (!$this->context->smarty) {
                require_once _PS_ROOT_DIR_ . '/config/smarty.config.inc.php';
            }

            // Validate the object type matches the template
            $this->validateObjectForTemplate($object, $template);

            // Ensure the output directory exists and is writable
            if (!is_dir($this->serverFolder)) {
                if (!mkdir($this->serverFolder, 0755, true)) {
                    throw new PrestaShopException('Cannot create output directory: ' . $this->serverFolder);
                }
            }

            if (!is_writable($this->serverFolder)) {
                throw new PrestaShopException('Output directory is not writable: ' . $this->serverFolder);
            }
            // Use PDF class instead of PDFCore directly
            // This follows the same pattern as AdminPdfController
            $pdf_file = new \PDF($object, $template, $this->context->smarty);

            // Pre-validate the template can be created
            $testTemplate = $pdf_file->getTemplateObject($object);

            if (!$testTemplate) {
                throw new PrestaShopException("Unable to create template object for template: $template with object type: " . get_class($object));
            }

            // Set up custom error handler to catch fatal errors during rendering
            set_error_handler(function($severity, $message, $file, $line) {
                if (error_reporting() & $severity) {
                    throw new ErrorException($message, 0, $severity, $file, $line);
                }
            });

            // Buffer output to catch any unexpected output
            ob_start();

            try {
                // Render PDF to file directly (similar to AdminPdfController approach)
                $full_path = $this->serverFolder . $fileName . '.pdf';

                $file = $pdf_file->render(false);
                file_put_contents(dirname(__FILE__, 4).$full_path, $file);



            } finally {
                // Clean any buffered output and restore error handler
                $unexpected_output = ob_get_clean();
                restore_error_handler();
                error_reporting($old_error_reporting);

                if (!empty($unexpected_output)) {
                    $this->log("WARNING", "Unexpected output during PDF generation: " . substr($unexpected_output, 0, 200));
                }
            }

            // Verify file was created successfully
            if (!file_exists(dirname(__DIR__, 3).$full_path) || filesize(dirname(__DIR__, 3).$full_path) === 0) {
                throw new PrestaShopException('PDF file was not created or is empty: ' . dirname(__DIR__, 3).$full_path);
            }

            $file_size = filesize($full_path);
            $this->log("INFO", "PDF generated successfully: " . $fileName . '.pdf (' . $file_size . ' bytes)');

            return ['success' => true, 'error' => '', 'file_path' => $full_path, 'file_size' => $file_size];

        } catch (ErrorException $e) {
            $error_msg = 'PDF Generation Fatal Error: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine();
            $this->logError($e, $error_msg);
            $this->addToLogFile(['location' => 'generatePdfFile', 'error' => $error_msg, 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $error_msg, 'time' => date('d-m-Y H:i:s')];
        } catch (PrestaShopException $exception) {
            $error_msg = 'PDF Generation Error: ' . $exception->getMessage();
            $this->logError($exception, $error_msg);
            $this->addToLogFile(['location' => 'generatePdfFile', 'error' => $error_msg, 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $error_msg, 'time' => date('d-m-Y H:i:s')];
        } catch (\Exception $exception) {
            $error_msg = 'PDF Generation Unexpected Error: ' . $exception->getMessage();
            $this->logError($exception, $error_msg);
            $this->addToLogFile(['location' => 'generatePdfFile', 'error' => $error_msg, 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $error_msg, 'time' => date('d-m-Y H:i:s')];
        }
    }


    /**
     * Validate that the object type matches the expected template
     */
    /**
     * Validate that the object type matches the expected template
     * @throws PrestaShopException
     */
    private function validateObjectForTemplate($object, $template): void
    {
        switch ($template) {
            case PDFCore::TEMPLATE_INVOICE:
                // Template 'Invoice' accepts OrderInvoice objects (not Order objects as I initially thought)
                if (!($object instanceof OrderInvoice) &&
                    !is_array($object) &&
                    !($object instanceof PrestaShopCollection)) {
                    throw new PrestaShopException("Template 'Invoice' requires OrderInvoice, array, or Collection object, got: " . get_class($object));
                }

            // If it's an array or collection, validate the contents
                if (is_array($object) || ($object instanceof PrestaShopCollection)) {
                    foreach ($object as $item) {
                        if (!($item instanceof OrderInvoice)) {
                            throw new PrestaShopException("Template 'Invoice' array/collection must contain OrderInvoice objects, got: " . get_class($item));
                        }
                    }
                }
                break;

            case PDFCore::TEMPLATE_ORDER_SLIP:
                // Template 'OrderSlip' can accept OrderSlip objects or collections
                if (!($object instanceof OrderSlip) &&
                    !is_array($object) &&
                    !($object instanceof PrestaShopCollection)) {
                    throw new PrestaShopException("Template 'OrderSlip' requires OrderSlip, array, or Collection object, got: " . get_class($object));
                }

                if (is_array($object) || ($object instanceof PrestaShopCollection)) {
                    foreach ($object as $item) {
                        if (!($item instanceof OrderSlip)) {
                            throw new PrestaShopException("Template 'OrderSlip' array/collection must contain OrderSlip objects, got: " . get_class($item));
                        }
                    }
                }
                break;

            case PDFCore::TEMPLATE_ORDER_RETURN:
                // Template 'OrderReturn' requires OrderReturn objects
                if (!($object instanceof OrderReturn) &&
                    !is_array($object) &&
                    !($object instanceof PrestaShopCollection)) {
                    throw new PrestaShopException("Template 'OrderReturn' requires OrderReturn, array, or Collection object, got: " . get_class($object));
                }

                if (is_array($object) || ($object instanceof PrestaShopCollection)) {
                    foreach ($object as $item) {
                        if (!($item instanceof OrderReturn)) {
                            throw new PrestaShopException("Template 'OrderReturn' array/collection must contain OrderReturn objects, got: " . get_class($item));
                        }
                    }
                }
                break;

            case PDFCore::TEMPLATE_DELIVERY_SLIP:
                // Template 'DeliverySlip' requires Order objects
                if (!($object instanceof Order) &&
                    !is_array($object) &&
                    !($object instanceof PrestaShopCollection)) {
                    throw new PrestaShopException("Template 'DeliverySlip' requires Order, array, or Collection object, got: " . get_class($object));
                }

                if (is_array($object) || ($object instanceof PrestaShopCollection)) {
                    foreach ($object as $item) {
                        if (!($item instanceof Order)) {
                            throw new PrestaShopException("Template 'DeliverySlip' array/collection must contain Order objects, got: " . get_class($item));
                        }
                    }
                }
                break;

            default:
                throw new PrestaShopException("Unknown template: $template");
        }
    }

    /**
     * Convert OrderInvoice to Order for PDF generation
     */
    private function getOrderFromInvoice($invoiceObject)
    {
        if ($invoiceObject instanceof OrderInvoice) {
            // Get the Order object from OrderInvoice
            return new Order($invoiceObject->id_order);
        } elseif ($invoiceObject instanceof Order) {
            return $invoiceObject;
        } else {
            throw new PrestaShopException("Expected Order or OrderInvoice object, got: " . get_class($invoiceObject));
        }
    }


    /**
     *
     * Upload all files in the local folder to pCloud
     *
     */
    private function uploadFilesToPCloud($monthFolderId): array
    {
        error_reporting(E_ALL);
        ini_set('display_errors', 'on');

        try {
            $files = scandir($this->serverFolder);
            $filesList = [];
            $successFilesList = [];
            foreach ($files as $file) {
                if (!in_array($file, ['..', '.', '', ' '])) {
                    $filePath = $this->serverFolder . $file;
                    if (is_file($filePath)) {
                        $filesList[] = $file;
                    }
                }
            }
            foreach ($filesList as $file) {
                // Create a File instance
                $pCloudFileObject = new File($this->pCloudApp);
                // Upload new file in created folder
                $successFilesList[$file] = $pCloudFileObject->upload($this->serverFolder . $file, $monthFolderId, $file);
            }
            return $successFilesList;
        } catch (\Exception $exception) {
            $this->addToLogFile(['location' => 'uploadFilesToPCloud:526', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Clear the local folder of all uploaded files
     *
     * @param array $uploadedFiles
     * @return void
     */
    private function cleanServerFolder(array $uploadedFiles): void
    {
        foreach ($uploadedFiles as $filename => $meta) {
            try {
                $result = unlink($this->serverFolder . $filename);
                if ($result) {
                    $this->completedSuccessRecords[] = ['file' => $meta, 'time' => date('d-m-Y H:i:s')];
                } else {
                    $this->errorRecords[] = ['file' => $meta, 'time' => date('d-m-Y H:i:s')];
                }
            } catch (\Exception $exception) {
                $this->addToLogFile(['location' => 'cleanServerFolder:548', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);

            }
        }
    }

    // ===== Section: Logging & Metrics =====

    /**
     * Push error to an error file
     *
     * @param array $errorList
     * @return void
     */
    private function addToLogFile(array $errorList = []): void
    {
        if (count($errorList) > 0) {
            foreach ($errorList as $error) {
                if (is_array($error)) {
                    $msg = print_r($error) . "\n";
                } else {
                    $msg = $error . "\n";
                }
                file_put_contents(dirname(__DIR__) . './../../var/logs/invoice_backup.log',
                    $msg,
                    FILE_APPEND);
            }
        }
    }

    /** --- Logging functions --- */

    /**
     * Enhanced logging with different levels
     */
    private function log(string $level, string $message, array $context = [], string $location = ''): void
    {
        $levels = ['DEBUG' => 0, 'INFO' => 1, 'WARNING' => 2, 'ERROR' => 3];
        $currentLevel = $levels[$this->logLevel] ?? 1;
        $messageLevel = $levels[$level] ?? 1;

        if ($messageLevel < $currentLevel) {
            return; // Skip if below current log level
        }

        $timestamp = date('Y-m-d H:i:s');
        $contextStr = !empty($context) ? ' | Context: ' . json_encode($context) : '';
        $locationStr = $location ? " | Location: $location" : '';

        $logEntry = "[$timestamp] [$level]$locationStr $message$contextStr\n";

        // Ensure log directory exists
        $logDir = dirname($this->logFile);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }

        file_put_contents($this->logFile, $logEntry, FILE_APPEND | LOCK_EX);

        // Also, echo if debug is true
        if ($this->debug) {
            echo $logEntry;
        }
    }

    /**
     * Log execution time for performance monitoring
     */
    private function logExecutionTime(string $operation, float $startTime): void
    {
        $executionTime = microtime(true) - $startTime;
        $this->log('INFO', "Execution time for $operation: {$executionTime}s", [], 'performance');
    }


    /**
     * Track metrics throughout the process
     */
    private function trackMetric(string $key, $value): void
    {
        $this->metrics[$key] = $value;
        $this->log('DEBUG', "Metric tracked: $key = $value");
    }

    /**
     * Log final summary with all metrics
     */
    private function logSummary(): void
    {
        $summary = [
            'total_execution_time' => $this->metrics['total_execution_time'] ?? 0,
            'orders_processed' => $this->metrics['orders_processed'] ?? 0,
            'pdfs_generated' => $this->metrics['pdfs_generated'] ?? 0,
            'files_uploaded' => $this->metrics['files_uploaded'] ?? 0,
            'errors_count' => count($this->errorRecords),
            'success_count' => count($this->completedSuccessRecords),
            'non_pdf_orders_count' => $this->metrics['non_pdf_orders_count'] ?? 0,
        ];

        $this->log('INFO', 'Backup process completed', $summary, 'summary');

        // Always log the summary to a separate file for easy monitoring
        $summaryFile = dirname(__DIR__) . '/../../var/logs/backup_summary.log';
        $summaryDir = dirname($summaryFile);
        if (!is_dir($summaryDir)) {
            mkdir($summaryDir, 0755, true);
        }

        file_put_contents($summaryFile,
            "[" . date('Y-m-d H:i:s') . "] " . json_encode($summary) . "\n",
            FILE_APPEND | LOCK_EX
        );
    }

    /**
     * Enhanced error logging with stack trace and context
     */
    private function logError(\Exception $e, string $operation, array $context = []): void
    {
        $errorData = [
            'operation' => $operation,
            'error_message' => $e->getMessage(),
            'error_code' => $e->getCode(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'context' => $context,
            'timestamp' => date('Y-m-d H:i:s')
        ];

        if ($this->debug) {
            $errorData['stack_trace'] = $e->getTraceAsString();
        }

        $this->errorRecords[] = $errorData;
        $this->log('ERROR', "Exception in $operation: " . $e->getMessage(), $errorData);
    }

    /**
     * Set parameters from an associative array (for web usage)
     *
     * @param array $params Parameters array (e.g., $_GET or $_POST)
     * @return self
     */
    public function setParametersFromArray(array $params): self
    {
        if (isset($params['invoice_statuses'])) {
            $statuses = is_string($params['invoice_statuses'])
                ? array_map('trim', explode(',', $params['invoice_statuses']))
                : (array)$params['invoice_statuses'];
            $this->setInvoiceStatusses(array_map('intval', $statuses));
        }

        if (isset($params['credit_statuses'])) {
            $statuses = is_string($params['credit_statuses'])
                ? array_map('trim', explode(',', $params['credit_statuses']))
                : (array)$params['credit_statuses'];
            $this->setCreditStatusses(array_map('intval', $statuses));
        }

        if (isset($params['save_time'])) {
            $this->setSaveTime((string)$params['save_time']);
        }

        if (isset($parameters['remove_orders'])) {
            $this->setRemoveOrders((bool)$parameters['remove_orders']);
        }

        if (isset($params['sleep_time'])) {
            $this->setSleepTime((int)$params['sleep_time']);
        }

        if (isset($params['access_token'])) {
            $this->setAccessToken((string)$params['access_token']);
        }

        if (isset($params['user_id'])) {
            $this->setPCloudUserId((string)$params['user_id']);
        }

        if (isset($params['location_id'])) {
            $this->setPCloudLocationId((string)$params['location_id']);
        }

        if (isset($params['root_folder_id'])) {
            $this->setRootFolderId((string)$params['root_folder_id']);
        }

        return $this;
    }

    /**
     * Set invoice status IDs that require invoice PDFs
     *
     * @param array $statuses Array of status IDs
     * @return self
     */
    public function setInvoiceStatusses(array $statuses): self
    {
        $this->invoiceStatusses = array_map('intval', $statuses);
        return $this;
    }

    /**
     * Set credit status IDs that require credit slip PDFs
     *
     * @param array $statuses Array of status IDs
     * @return self
     */
    public function setCreditStatusses(array $statuses): self
    {
        $this->creditStatusses = array_map('intval', $statuses);
        return $this;
    }

    /**
     * Set a delay between operations in seconds
     *
     * @param int $seconds Number of seconds
     * @return self
     */
    public function setSleepTime(int $seconds): self
    {
        $this->sleepTime = $seconds;
        return $this;
    }

    /**
     * Set pCloud API access token
     *
     * @param string $token Access token
     * @return self
     */
    public function setAccessToken(string $token): self
    {
        $this->access_token = $token;
        $this->initializePCloudConnection(); // Reinitialize with a new token
        return $this;
    }

    /**
     * Set pCloud user ID
     *
     * @param string $userId User ID
     * @return self
     */
    public function setPCloudUserId(string $userId): self
    {
        $this->pCloudUserId = $userId;
        return $this;
    }

    /**
     * Set pCloud location ID for data residency
     *
     * @param string $locationId Location ID
     * @return self
     */
    public function setPCloudLocationId(string $locationId): self
    {
        $this->pCloudLocationId = $locationId;
        $this->initializePCloudConnection(); // Reinitialize with a new location
        return $this;
    }

    /**
     * Set pCloud root folder ID for backups
     *
     * @param string $folderId Folder ID
     * @return self
     */
    public function setRootFolderId(string $folderId): self
    {
        $this->rootFolderId = $folderId;
        return $this;
    }

    // Getter methods for accessing current parameter values

    /**
     * Get current invoice status IDs
     *
     * @return array
     */
    public function getInvoiceStatusses(): array
    {
        return $this->invoiceStatusses;
    }

    /**
     * Get current credit status IDs
     *
     * @return array
     */
    public function getCreditStatusses(): array
    {
        return $this->creditStatusses;
    }

    /**
     * Get the current retention period in the past years
     *
     * @return string
     */
    public function getSaveTime(): string
    {
        return $this->saveTime;
    }

    /**
     * Get current delay between operations
     *
     * @return int
     */
    public function getSleepTime(): int
    {
        return $this->sleepTime;
    }

    /**
     * Get a current access token (masked for security)
     *
     * @param bool $masked Whether to mask the token (default: true)
     * @return string
     */
    public function getAccessToken(bool $masked = true): string
    {
        if ($masked) {
            return substr($this->access_token, 0, 10) . '...' . substr($this->access_token, -5);
        }
        return $this->access_token;
    }

    /**
     * Get current pCloud user ID
     *
     * @return string
     */
    public function getPCloudUserId(): string
    {
        return $this->pCloudUserId;
    }

    /**
     * Get current pCloud location ID
     *
     * @return string
     */
    public function getPCloudLocationId(): string
    {
        return $this->pCloudLocationId;
    }

    /**
     * Get current root folder ID
     *
     * @return string
     */
    public function getRootFolderId(): string
    {
        return $this->rootFolderId;
    }

    /**
     * Set to remove an order's flag
     *
     * @param bool $remove
     * @return self
     */
    public function setRemoveOrders(bool $remove): self
    {
        $this->removeOrders = $remove;
        return $this;
    }

    /**
     * Get to remove an order flag
     *
     * @return bool
     */
    public function getRemoveOrders(): bool
    {
        return $this->removeOrders;
    }

    /**
     * Set a retention period in years
     */
    public function setSaveTime(string $saveTime): self
    {
        $this->saveTime = $saveTime;
        return $this;
    }


    /**
     * Get all current configuration parameters
     *
     * @return array
     */
    public function getConfiguration(): array
    {
        return [
            'invoice_statuses' => $this->getInvoiceStatusses(),
            'credit_statuses' => $this->creditStatusses,
            'save_time' => $this->getSaveTime(),
            'sleep_time' => $this->getSleepTime(),
            'access_token' => $this->getAccessToken(), // Masked
            'user_id' => $this->getPCloudUserId(),
            'location_id' => $this->getPCloudLocationId(),
            'root_folder_id' => $this->getRootFolderId(),
        ];
    }

}

// CLI parameter handling
function parseCliArguments(): array
{
    global $argv;

    $options = [
        'debug' => true,      // default debug mode
        'logLevel' => 'INFO', // default log level
        'locally' => false,   // default for locally parameter
        'parameters' => []    // parameters to set on the backup object
    ];

    if (!isset($argv)) {
        return $options; // Not running from CLI
    }

    for ($i = 1; $i < count($argv); $i++) {
        switch ($argv[$i]) {
            case '--debug':
            case '-d':
                $options['debug'] = true;
                break;
            case '--no-debug':
                $options['debug'] = false;
                break;
            case '--log-level':
            case '-l':
                if (isset($argv[$i + 1])) {
                    $level = strtoupper($argv[$i + 1]);
                    if (in_array($level, ['DEBUG', 'INFO', 'WARNING', 'ERROR'])) {
                        $options['logLevel'] = $level;
                        $i++; // Skip the next argument as it's the value
                    }
                }
                break;
            case '--locally':
                $options['locally'] = true;
                break;
            case '--remove-orders':
                $options['parameters']['remove_orders'] = true;
                break;
            case '--invoice-statuses':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['invoice_statuses'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--credit-statuses':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['credit_statuses'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--save-time':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['save_time'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--sleep-time':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['sleep_time'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--access-token':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['access_token'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--user-id':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['user_id'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--location-id':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['location_id'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--root-folder-id':
                if (isset($argv[$i + 1])) {
                    $options['parameters']['root_folder_id'] = $argv[$i + 1];
                    $i++;
                }
                break;
            case '--help':
            case '-h':
                echo "Usage: php backupInvoicesToPCloud.php [OPTIONS]\n\n";
                echo "Options:\n";
                echo "  --debug, -d                     Enable debug mode (default: true)\n";
                echo "  --no-debug                      Disable debug mode\n";
                echo "  --log-level, -l LEVEL           Set log level: DEBUG, INFO, WARNING, ERROR (default: INFO)\n";
                echo "  --remove-orders                 Remove backed up orders from database (DANGER!)\n";
                echo "  --locally                       Run backup locally\n";
                echo "  --invoice-statuses STATUS1,STATUS2  Set invoice status IDs (comma-separated)\n";
                echo "  --credit-statuses STATUS1,STATUS2   Set credit status IDs (comma-separated)\n";
                echo "  --save-time YEARS               Set retention period in years (default: 7)\n";
                echo "  --sleep-time SECONDS            Set delay between operations (default: 2)\n";
                echo "  --access-token TOKEN            Set pCloud access token\n";
                echo "  --user-id ID                    Set pCloud user ID (default: 3158945)\n";
                echo "  --location-id ID                Set pCloud location ID (default: 2)\n";
                echo "  --root-folder-id ID             Set pCloud root folder ID (default: 8286400411)\n";
                echo "  --help, -h                      Show this help message\n\n";
                echo "Examples:\n";
                echo "  php backupInvoicesToPCloud.php --no-debug --log-level WARNING\n";
                echo "  php backupInvoicesToPCloud.php --debug --log-level DEBUG --locally\n";
                echo "  php backupInvoicesToPCloud.php --invoice-statuses=\"1,2,3\" --save-time=5\n";
                echo "  php backupInvoicesToPCloud.php --access-token=\"new-token\" --user-id=\"999999\"\n";
                exit(0);
        }
    }

    return $options;
}

// Main execution block
if (php_sapi_name() === 'cli') {
    $options = parseCliArguments();
    try {
        $backup = new BackupInvoicesToPCloud($options['debug'], $options['logLevel']);

        // Set parameters if provided via CLI
        if (!empty($options['parameters'])) {
            $backup->setParametersFromArray($options['parameters']);
        }
        $backup->runBackup($options['locally']);
    } catch (\Exception $e) {
        echo "Fatal error: " . $e->getMessage() . "\n";
        exit(1);
    }
} else {
    // If called via web, use defaults or web parameters
    $debug = !isset($_GET['debug']) || $_GET['debug'];
    $logLevel = isset($_GET['log_level']) ? strtoupper($_GET['log_level']) : 'INFO';
    $locally = isset($_GET['locally']) && $_GET['locally'];

    try {
        $backup = new BackupInvoicesToPCloud($debug, $logLevel);
        $backup->setParametersFromArray($_GET);
        $backup->runBackup($locally);
    } catch (\Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
        return $e->getMessage();
    }
}
