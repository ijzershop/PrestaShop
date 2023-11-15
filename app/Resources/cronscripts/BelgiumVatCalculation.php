<?php
declare(strict_types=1);

namespace app\Resources\cronscripts;

require_once dirname(__DIR__).'./../../config/config.inc.php';
require_once dirname(__DIR__).'./../../vendor/autoload.php';

use DateTime;

use Db;
use MsThemeConfig\Class\Offer;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Mail;
use PrestaShopDatabaseException;
use PrestaShopException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;


error_reporting(E_ALL); ini_set('display_errors', 'on');
/**
 * Class CalculateBelgiumVat.
 */
class CalculateBelgiumVat
{
    private $from_date;
    private $to_date;
    private $debug;

    private $fmt;

    private $address;

    /**
     * OrderSlipGenerator constructor.
     * @param false $debug
     */
    public function __construct($debug=false)
    {
        $first = new DateTime('first day of last month');
        $last = new DateTime('last day of last month');
        $this->from_date = $first->format('Y-m-d 00:00:00');
        $this->to_date = $last->format('Y-m-d 23:59:59');
        $this->debug = $debug;

        $this->fmt = numfmt_create('nl_NL', \NumberFormatter::CURRENCY);
        $this->address = 'info@v15.nl';
        $this->addressBcc = ['ingrid@demodernesmid.nl'];
    }

    /**
     * @return false|string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function calculateVat(){
        $record = $this->fetchVatDataFromOrderTable($this->from_date, $this->to_date);

        $newVatRecord = [
                            "date_from" => $record['from'],
                            "date_to" => $record['to'],
                            "total_excl"  => $record['total_belgium_order_amount_excl'],
                            "total_incl" => $record['total_belgium_order_amount_incl'],
                            "total_vat"  => $record['total_belgium_vat'],
                            "total_orders" => $record['total_belgium_orders'],
                            "reference_list" => $record['reference_list']
                        ];

        $result = Db::getInstance()->insert('modernesmid_vat_history', $newVatRecord, true, false);
        if($result === true){
            //Result is correct mail to ingrid
            return $this->sendMailAction($newVatRecord);
        }


    }


    /**
     * @throws PrestaShopDatabaseException
     */
    public function fetchVatDataFromOrderTable($from, $to): array
    {
        $vatData = [
            'from' => $from,
            'to' => $to,
            'total_belgium_orders' => 0,
            'total_belgium_order_amount_excl' => 0,
            'total_belgium_order_amount_incl' => 0,
            'total_belgium_vat' => 0
        ];

        $sqlBelgium = "SELECT `" . _DB_PREFIX_ . "orders`.`id_address_delivery`, `" . _DB_PREFIX_ . "orders`.`id_order`,GROUP_CONCAT(DISTINCT `" . _DB_PREFIX_ . "orders`.`reference`) as reference_list, count(`" . _DB_PREFIX_ . "orders`.`id_order`) as order_total_be, SUM(`" . _DB_PREFIX_ . "orders`.`total_paid_tax_incl`) as total_be_tax_incl FROM `" . _DB_PREFIX_ . "orders` LEFT JOIN `" . _DB_PREFIX_ . "address` ON `" . _DB_PREFIX_ . "orders`.`id_address_delivery` = `" . _DB_PREFIX_ . "address`.`id_address`
                WHERE `" . _DB_PREFIX_ . "address`.`id_country` = '3' AND `" . _DB_PREFIX_ . "orders`.`date_add` BETWEEN '".$from."' AND '".$to."' AND `" . _DB_PREFIX_ . "orders`.`current_state` IN ('4','5','18','21','25','26','38')";

        $resultBE = Db::getInstance()->executeS($sqlBelgium);



        $total_tax_incl = (float)$resultBE[0]['total_be_tax_incl'];
        $total_tax_excl = $total_tax_incl / 1.21;


        if($resultBE) {
            $vatData['total_belgium_orders'] = (int)$resultBE[0]['order_total_be'];
            $vatData['total_belgium_order_amount_excl'] = $total_tax_excl;
            $vatData['total_belgium_order_amount_incl'] = $total_tax_incl;
            $vatData['total_belgium_vat'] = $total_tax_incl - $total_tax_excl;
            $vatData['reference_list'] = $resultBE[0]['reference_list'];
        }
        return $vatData;
    }


    /**
     * @param $offer_id
     * @param Request $req
     * @throws \PrestaShopDatabaseException
     * @throws \PrestaShopException
     */
    public function sendMailAction($record)
    {
        $from = date('M Y', strtotime($record['date_from']));
        $to = date('M Y', strtotime($record['date_to']));

        $template = 'belgium_vat_calc';
        $template_path = _PS_MODULE_DIR_ . 'msthemeconfig/mails/';

        $total_vat = numfmt_format_currency($this->fmt, (float)$record['total_vat'], "EUR");
        $subject = $total_vat.' Belgische BTW berekend van periode '. $from . ' tot ' . $to . ' op Ijzershop.nl';

        $vars = [
            '{from}' => $from,
            '{to}' => $to,
            '{total_excl}'  => numfmt_format_currency($this->fmt, (float)$record['total_excl'], "EUR"),
            '{total_incl}' => numfmt_format_currency($this->fmt, (float)$record['total_incl'], "EUR"),
            '{total_vat}'  => $total_vat,
            '{total_orders}' => $record['total_orders'],
            '{reference_list}' => $record['reference_list']
        ];

        if (Mail::send(Context::getContext()->language->id, $template, $subject, $vars, $this->address, 'Financiële administratie', 'ijzershop nl', 'Webshop Ijzershop', null, null, $template_path, false, null, $this->addressBcc)) {
            $message = ''.$total_vat.' Belgische BTW berekend van periode '. $from . ' tot ' . $to . ' is verstuurd naar ' . $this->address;
        }
        else {
            $message = 'Er is een fout opgetreden bij het verzenden van de email!';
        }
    }

}

try {
    $batch = new CalculateBelgiumVat(true);
    $batch->calculateVat();
} catch (PrestaShopDatabaseException | PrestaShopException $exception) {
    return $exception;
}
