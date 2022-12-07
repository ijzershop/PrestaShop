<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\Entity\Customer;
use PrestaShop\PrestaShop\Adapter\Entity\ModuleAdminController;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use Symfony\Component\HttpFoundation\JsonResponse;

use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;

/**
 *
 * @property Context|null $context
 */
class MsAdminThemeConfController extends FrameworkBundleAdminController {

    private string $moduleName;

    public function __construct()
    {
        $this->context = Context::getContext();
        $this->moduleName = 'msthemeconfig';

        parent::__construct();
    }

    /**
     * @return void
     */
    public function initContent(): void
    {
        $configure = $this->context->link->getAdminLink('AdminModules', false) . '&configure=' . $this->moduleName.'&module_name='.$this->moduleName.'&token='.Tools::getAdminTokenLite('AdminModules');
        Tools::redirectAdmin($configure);
    }


    /**
     * @return false|string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function ajaxProcessCreateInformerRelation()
    {
        $payment_condition_id = Configuration::get('CREDITPAYMENT_INFORMER_PAYMENT_CONDITION_ID', null, null, null,
            444438);
        $template_id = Configuration::get('CREDITPAYMENT_INFORMER_TEMPLATE_ID', null, null, null, 274888);

        $security_code = Configuration::get('CREDITPAYMENT_INFORMER_SECURITY_CODE', null, null, null, "62356");
        $api_key = Configuration::get('CREDITPAYMENT_INFORMER_API_KEY', null, null, null,
            "MEUGbrj3nT8Z4orUVznSQRMCYFxP6SySePckp0tVfJPrcB1DjO2");


        parse_str(Tools::getValue('formdata'), $relationData);

        //Create Card
        $query = [
            "relation_number" => $relationData['update_informer'] == "" ? null : $relationData['update_informer'],
            "relation_type" => "0",
            "company_name" => $relationData['company_name'] == "" ? null : $relationData['company_name'],
            "firstname" => $relationData['firstname'] == "" ? null : $relationData['firstname'],
            "surname_prefix" => $relationData['surname_prefix'] == "" ? null : $relationData['surname_prefix'],
            "surname" => $relationData['surname'] == "" ? null : $relationData['surname'],
            "street" => $relationData['street'] == "" ? null : $relationData['street'],
            "house_number" => $relationData['house_number'] == "" ? null : $relationData['house_number'],
            "house_number_suffix" => $relationData['house_number_suffix'] == "" ? null : $relationData['house_number_suffix'],
            "zip" => $relationData['zip'] == "" ? null : $relationData['zip'],
            "city" => $relationData['city'] == "" ? null : $relationData['city'],
            "country" => $relationData['country'] == "" ? null : $relationData['country'],
            "phone_number" => $relationData['phone_number'] == "" ? null : $relationData['phone_number'],
            "fax_number" => $relationData['fax_number'] == "" ? null : $relationData['fax_number'],
            "web" => $relationData['web'] == "" ? null : $relationData['web'],
            "email" => $relationData['email'] == "" ? null : $relationData['email'],
            "coc" => $relationData['coc'] == "" ? null : $relationData['coc'],
            "vat" => $relationData['vat'] == "" ? null : $relationData['vat'],
            "iban" => $relationData['iban'] == "" ? null : $relationData['iban'],
            "bic" => $relationData['bic'] == "" ? null : $relationData['bic'],
            "email_invoice" => $relationData['email'] == "" ? null : $relationData['email'],
            "sales_invoice_template_id" => $template_id,
            "payment_condition_id" => $payment_condition_id,
        ];

        $id_customer = $relationData['id_customer'];

        $customer = new Customer($id_customer);
        $customer->company = $relationData['company_name'];
        $customer->firstname = $relationData['firstname'];
        $customer->lastname = $relationData['surname_prefix'] . " " . $relationData['surname'];
        $customer->website = $relationData['web'];
        $customer->siret = $relationData['coc'];

        $custAddress = new Address(Address::getFirstCustomerAddressId($customer->id));

        $custAddress->address1 = $relationData['street'];
        $custAddress->house_number = $relationData['house_number'];
        $custAddress->house_number_extension = $relationData['house_number_suffix'];
        $custAddress->postcode = $relationData['zip'];
        $custAddress->city = $relationData['city'];
        $custAddress->phone = $relationData['phone_number'];
        $custAddress->vat_number = $relationData['vat'];
        $custAddress->save();
        $customer->update();

        $curlCard = curl_init();

        $headers = array(
            "Accept: application/json",
            "Securitycode: " . $security_code,
            "Apikey: " . $api_key,
        );

        if ((int)$relationData['update_informer'] > 0) {
            curl_setopt_array($curlCard, array(
                CURLOPT_URL => "https://api.informer.eu/v1/relation/".$relationData['update_informer'],
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 10,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'PUT',
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_POSTFIELDS => json_encode($query),
            ));
        } else {
            curl_setopt_array($curlCard, array(
                CURLOPT_URL => "https://api.informer.eu/v1/relation",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 10,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_POSTFIELDS => json_encode($query),
            ));
        }
        $info = curl_getinfo($curlCard);

        $response = curl_exec($curlCard);
        $returnData = json_decode($response);

        if (!curl_errno($curlCard) && property_exists($returnData, 'id')) {
            $customer = new Customer($id_customer);
            $customer->informer_identification = $returnData->id;
            try {
                $customer->update();

            curl_close($curlCard);
                if ((int)$relationData['update_informer'] > 0) {
                    return json_encode([
                        'error' => false,
                        'msg' => 'Klant is gewijzigd in informer',
                        'id' => $returnData->id
                    ]);
                } else {
                    return json_encode([
                        'error' => false,
                        'msg' => 'Klant is aangemaakt in informer',
                        'id' => $returnData->id
                    ]);
                }
            } catch (\PrestaShopDatabaseException|\PrestaShopException $e) {}
            return json_encode(['error' => true, 'msg'=>$returnData->error, 'id' => null]);
        }
        return json_encode(['error' => true, 'msg'=>null, 'id' => null]);
    }
}

