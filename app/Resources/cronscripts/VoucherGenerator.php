<?php
declare(strict_types=1);

namespace app\Resources\cronscripts;

require_once dirname(__DIR__).'./../../config/config.inc.php';
require_once dirname(__DIR__).'./../../vendor/autoload.php';


use PDF;
use PrestaShop\PrestaShop\Adapter\Entity\CartRule;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Core\Foundation\Database\Exception;
use PrestaShopDatabaseException;
use PrestaShopException;


error_reporting(E_ALL); ini_set('display_errors', 'on');
/**
 * Class VoucherGenerator.
 */
class VoucherGenerator
{
    /**
     * @var array
     */
    private $errorRecords;
    /**
     * @var bool
     */
    private $debug;
    public $generatedCodes;

    /**
     * OrderSlipGenerator constructor.
     * @param false $debug
     */
    public function __construct($debug = false)
    {
        $this->generatedCodes = [];
        $this->errorRecords = [];
        $this->debug = $debug;
    }

    /**
     * @return string|null
     * @throws PrestaShopException
     */
    public function generateVouchers(): ?string
    {
        $file_to_read = fopen(_PS_ROOT_DIR_.'/upload/oliebollenboxTest.csv', 'r');

        if ($file_to_read !== FALSE) {
            while (($data = fgetcsv($file_to_read, 100, ',')) !== FALSE) {

                for ($i = 0; $i < count($data); $i++) {
                    $nameArray = explode(' ', $data[$i]);
                    $nameCode = strtolower($nameArray[0].substr($nameArray[1],0,1));
                    $result = $this->generateDiscountCode($data[$i], $nameCode);

                    if($result){
                        $this->generatedCodes[] = ['lid' => $data[$i], 'code' => $nameCode];
                    } else {
                        $this->errorRecords[] = ['lid' => $data[$i], 'code' => $nameCode];
                    }
                }
            }

            fclose($file_to_read);
        }
        return var_export($this->generatedCodes);
    }

    /**
     * @throws PrestaShopException
     */
    private function generateDiscountCode(string $name, mixed $nameCode)
    {
        $context = Context::getContext();

        try {
            if(CartRule::cartRuleExists($nameCode)){
                $rule = new CartRule(CartRule::getIdByCode($nameCode));
            } else {
                $rule = new CartRule();
            }

            $rule->id_customer = 0;
            $rule->date_from = "2023-12-05 10:00:00";
            $rule->date_to = "2024-01-01 10:00:00";
            $rule->name = ['1'=> "Ledencode voor ".$name];
            $rule->description = "code automatisch aangemaakt voor verkoop van oliebollen door ".$name;
            $rule->quantity = 9999999;
            $rule->quantity_per_user = 1000;
            $rule->priority = 1;
            $rule->partial_use = 0;
            $rule->code = $nameCode;
            $rule->minimum_amount = 0.25;
            $rule->minimum_amount_tax = 0;
            $rule->minimum_amount_currency = 1;
            $rule->minimum_amount_shipping = 1;
            $rule->country_restriction = 0;
            $rule->carrier_restriction = 0;
            $rule->group_restriction = 0;
            $rule->cart_rule_restriction = 0;
            $rule->product_restriction = 0;
            $rule->shop_restriction = 0;
            $rule->free_shipping = 1;
            $rule->reduction_percent = 0.00;
            $rule->reduction_amount = 0;
            $rule->reduction_tax = 1;
            $rule->reduction_currency = 1;
            $rule->reduction_product = 0;
            $rule->reduction_exclude_special = 0;
            $rule->gift_product = 0;
            $rule->gift_product_attribute = 0;
            $rule->highlight = 0;
            $rule->active = 1;
            $rule->save();
        } catch (Exception $e){
            $this->errorRecords[] = ['lid' => $name, 'code' => $nameCode, 'error' => $e->getMessage()];
            return false;
        }
        return true;
    }
}

try {


    die('test');
    $batch = new VoucherGenerator(true);
    $batch->generateVouchers();
} catch (PrestaShopDatabaseException | PrestaShopException $exeption) {
    return $exeption;
}
