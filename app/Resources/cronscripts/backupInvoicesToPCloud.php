<?php

declare(strict_types=1);

namespace app\Resources\cronscripts;

error_reporting(E_ALL);
ini_set('display_errors', 'on');

require_once dirname(__DIR__) . './../../config/config.inc.php';
require_once dirname(__DIR__) . './../../vendor/autoload.php';

use Customer;
use pCloud\Sdk\App;
use pCloud\Sdk\Exception;
use pCloud\Sdk\File;
use pCloud\Sdk\Folder;
use pCloud\Sdk\Request;
use PDFCore;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Currency;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\ObjectModel;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\Shop;
use PrestaShopDatabaseException;
use PrestaShopException;
use ShopCore;
use ZipArchive;

/**
 * Generates and backup all invoices and credit invoices. To clean up the prestashop webshop instance
 */
class BackupInvoicesToPCloud
{
    /**
     * @param bool $debug
     */
    public function __construct(bool $debug = true)
    {
        $this->debug = $debug;
        $this->generateInvoices = false;
        $this->deletePcloudArchivedFolder = false;


        $this->pdfInvoiceTemplate = PDFCore::TEMPLATE_INVOICE;
        $this->pdfCreditInvoiceTemplate = PDFCore::TEMPLATE_ORDER_RETURN;

        $this->completedSuccessRecords = [];
        $this->errorRecords = [];

        $this->domain = 'IJzershop';
        $this->folderBaseName = 'Backup-' . $this->domain . '-';
        $this->context = Context::getContext();

        $this->serverFolder = str_replace('private_html',
            'public_html',
            $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'facturen' . DIRECTORY_SEPARATOR);
        $this->serverFolderDownloadTemp = str_replace('private_html',
            'public_html',
            $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . 'facturendownloads' . DIRECTORY_SEPARATOR);

        $this->invoiceStatusses = ['4', '5', '6', '32', '31', '18', '19'];
        $this->creditStatusses = ['7', '14', '45'];
        $this->progressHash = "623t472834t6782364t"; //Hashcode to follow progress of zipping files

        $this->saveTime = '7'; //Seven years of backup
        $this->sleepTime = 2;

        $this->access_token = "oiGLZGJGNs1Q14RkZwEJwykZG2GI8JA9n9J0co0bxeJ66S31pCyk";
        $this->pCloudUserId = "3158945";
        $this->pCloudLocationId = "2";
        $this->rootFolderId = "8286400411"; //RootFolder for backups #07 Backups -> #07A Facturen IJzershop

        $this->pCloudApp = new App();
        $this->pCloudApp->setAccessToken($this->access_token);
        $this->pCloudApp->setLocationId($this->pCloudLocationId);

        // Create Folder instance
        $this->pCloudFolder = new Folder($this->pCloudApp);
        $this->pCloudRequest = new Request($this->pCloudApp);
    }

    /**
     * Main Backup function to run backups on all invoices. Also archive invoices older than 7 years. This script is meant to run every month on the first day
     *
     * --- Backup ---
     * Function Checks for needed online folders at pCLoud
     * Generates all invoices and credit slips needed to back up the required files, and places the in the folder on this server
     * Uploads all files in the folder to pCLoud divined folder
     *
     * --- Archiving ---
     * Archives directly on the pCloud
     *
     * OR (Because function is not working right now on pCloud)
     * Download all files in the required folder
     * Creates a zip file on this server
     * Uploads the zip file back to pCloud
     * clears all files in the temp folder
     *
     * @throws Exception
     */
    public function runBackup($locally): void
    {
        //Check for folders to upload all files to
        $folderArray = $this->checkFoldersPCloud($locally);

        if ($this->generateInvoices) {
            try {
                //Generate invoices and Credit slips
                $invoicesAndCreditInvoicesList = $this->fetchInvoicesAndCreditInvoicesList();
                if (!count($invoicesAndCreditInvoicesList['invoices']) && !count($invoicesAndCreditInvoicesList['credits'])) {
                    echo 'no files to upload';
                }

                $generateFiles = $this->createOrderSlips($invoicesAndCreditInvoicesList);
                while (!isset($generateFiles)) {
                    sleep(2);
                }
            } catch (PrestaShopDatabaseException|PrestaShopException $exception) {
                $this->addToLogFile(['location' => 'runBackup:122', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
                echo 'No pCloud folders available or failed to generate files';
            }
        }

        $uploadedFiles = $this->uploadFilesToPCloud($folderArray['month_folder_id']);
        $this->cleanServerFolder($uploadedFiles);

        if (count($this->errorRecords) > 0) {
            $this->addToLogFile($this->errorRecords);
        }
        echo 'success';
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
     * Search for year folder in root folder, if not exists create. And return folder id
     *
     * @param $name = name of the folder
     *
     */
    private function findOrCreateFolderYear($name)
    {
        try {
            $list = $this->pCloudFolder->getContent((int)$this->rootFolderId);
            $searchedFolder = 0;
            foreach ($list as $item) {
                if ($name === $item->name) {
                    $searchedFolder = $item->folderid;
                }
            }

            if ($searchedFolder === 0) {
                $searchedFolder = $this->pCloudFolder->create($name, (int)$this->rootFolderId);
            }
            return $searchedFolder;
        } catch (Exception $exception) {
            $this->addToLogFile(['location' => 'findOrCreateFolderYear:180', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Push error to error file
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
        } catch (Exception $exception) {
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
        $list = $this->pCloudFolder->getContent((int)$this->rootFolderId);
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
        } catch (Exception $exception) {
            $this->addToLogFile(['location' => 'archiveFolder:277', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Archive the folder locally.
     * First download all files then zip them locally and upload the zip file again to pCloud
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
        } catch (Exception $exception) {
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
        } catch (Exception $exception) {
            $this->addToLogFile(['location' => 'buildZip:346', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Archive the folder on pCloud. Function is now disabled on pCloud server
     */
    private function archivePCloudFolder($monthFolderId, $yearFolderId): array|\stdClass
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
        } catch (Exception $exception) {
            $this->addToLogFile(['location' => 'archivePCloudFolder:368', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     * Fetch all orders ready for printing.
     *
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function fetchInvoicesAndCreditInvoicesList(): array
    {
        $date_to = date('Y-m-d H:i:s', strtotime('-5 minutes'));
        $last_updated_date = date('Y-m-d H:i:s', strtotime('-1 year'));

        try {
            $sqlQueryInvoices = new DbQuery();
            $sqlQueryInvoices->select('oi.id_order_invoice, oi.id_order, oi.number, oi.delivery_number, oi.delivery_date, oi.total_discount_tax_excl, oi.total_discount_tax_incl, oi.total_paid_tax_excl, oi.total_paid_tax_incl, oi.total_refunded_tax_excl, oi.total_refunded_tax_incl, oi.total_products, oi.total_products_wt, oi.total_shipping_tax_excl, oi.total_shipping_tax_incl, oi.shipping_tax_computation_method, oi.total_wrapping_tax_excl, oi.total_wrapping_tax_incl, oi.shop_address, oi.note, oi.date_add');
            $sqlQueryInvoices->from('orders', 'o');
            $sqlQueryInvoices->leftJoin('order_invoice', 'oi', 'oi.id_order = o.id_order');
            $sqlQueryInvoices->where('o.current_state IN (' . implode(",", $this->invoiceStatusses) . ')' . Shop::addSqlRestriction(ShopCore::SHARE_ORDER, 'o'));
            $sqlQueryInvoices->where('o.date_upd >= \'' . pSQL($last_updated_date) . '\'');
            $sqlQueryInvoices->where('oi.date_add <= \'' . pSQL($date_to) . '\'');
            $sqlQueryInvoices->orderBy('oi.id_order_invoice ASC');
            $sqlQueryInvoices->orderBy('oi.delivery_date ASC');

            $sqlQueryCreditInvoices = new DbQuery();
            $sqlQueryCreditInvoices->select('oi.id_order_invoice, oi.id_order, oi.number, oi.delivery_number, oi.delivery_date, oi.total_discount_tax_excl, oi.total_discount_tax_incl, oi.total_paid_tax_excl, oi.total_paid_tax_incl, oi.total_refunded_tax_excl, oi.total_refunded_tax_incl, oi.total_products, oi.total_products_wt, oi.total_shipping_tax_excl, oi.total_shipping_tax_incl, oi.shipping_tax_computation_method, oi.total_wrapping_tax_excl, oi.total_wrapping_tax_incl, oi.shop_address, oi.note, oi.date_add');
            $sqlQueryCreditInvoices->from('orders', 'o');
            $sqlQueryCreditInvoices->leftJoin('order_invoice', 'oi', 'oi.id_order = o.id_order');
            $sqlQueryCreditInvoices->where('o.current_state IN (' . implode(",", $this->creditStatusses) . ')' . Shop::addSqlRestriction(ShopCore::SHARE_ORDER, 'o'));
            $sqlQueryCreditInvoices->where('o.date_upd >= \'' . pSQL($last_updated_date) . '\'');
            $sqlQueryCreditInvoices->where('oi.date_add <= \'' . pSQL($date_to) . '\'');
            $sqlQueryCreditInvoices->orderBy('oi.id_order_invoice ASC');
            $sqlQueryCreditInvoices->orderBy('oi.delivery_date ASC');

            $order_credit_invoice_list = Db::getInstance()->executeS($sqlQueryCreditInvoices);
            $order_invoice_list = Db::getInstance()->executeS($sqlQueryInvoices);

        } catch (PrestaShopDatabaseException $exception) {
            $this->addToLogFile(['location' => 'fetchInvoicesAndCreditInvoicesList:482', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }

        return
            ['invoices' => ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list),
                'credits' => ObjectModel::hydrateCollection('OrderInvoice', $order_credit_invoice_list)];
    }

    /**
     * Create order slip pdf and set all new states of the selected orders.
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
                sleep($this->sleepTime);
            }

            foreach ($invoicesAndCreditInvoicesList['credits'] as $credit) {
                $fileName = $this->generateFileName($credit, 'CRED');
                $this->generatePdfFile($credit, $this->pdfCreditInvoiceTemplate, $fileName);
                sleep($this->sleepTime);
            }
        } catch (Exception $exception) {
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
            $payment = $order->payment;
            $customer_email = $customer->email;

            $price = round((float)$object->total_paid_tax_incl, 2);
            return preg_replace(['/\s+/'], [''], $type . '-' . str_replace('-', '', $order->reference) . '-' . $customer_email . '-' . $payment . '-' . $price);
        } catch (PrestaShopException $exception) {
            $this->addToLogFile(['location' => 'generateFileName:471', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return '';
        }
    }

    /**
     * Generate Batch PDF file with all to printed delivery slips.
     *
     * Branch of function in controllers/admin/AdminPDFController.
     */
    public function generatePdfFile($object, $template, $fileName): array
    {
        try {
            $this->context->currency = new Currency(1, 1, 1);
            $pdf_file = new PDFCore($object, $template, $this->context->smarty);
            $delivery_slip_pdf = $pdf_file->render(false);

            file_put_contents($this->serverFolder . $fileName . '.pdf', $delivery_slip_pdf);
            return ['success' => true, 'error' => ''];
        } catch (PrestaShopException|Exception $exception) {
            $this->addToLogFile(['location' => 'generatePdfFile:491', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);
            return ['success' => false, 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')];
        }
    }

    /**
     *
     * Upload all files in local folder to pCloud
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
                // Create File instance
                $pCloudFileObject = new File($this->pCloudApp);
                // Upload new file in created folder
                $successFilesList[$file] = $pCloudFileObject->upload($this->serverFolder . $file, $monthFolderId, $file);
            }
            return $successFilesList;
        } catch (Exception $exception) {
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
            } catch (Exception $exception) {
                $this->addToLogFile(['location' => 'cleanServerFolder:548', 'error' => $exception->getMessage(), 'time' => date('d-m-Y H:i:s')]);

            }
        }
    }
}

$backup = new BackupInvoicesToPCloud(true);
try {
    $backup->runBackup(true);
} catch (Exception $exception) {
    echo $exception->getMessage();
}
