<?php
declare(strict_types=1);

namespace Modernesmid\Module\Pricemodifier\Controller\Admin;

use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Feature;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\Shop;
use Symfony\Component\HttpFoundation\JsonResponse;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use Symfony\Component\HttpFoundation\Request;
use Exception;

/**
 *
 */
class PriceModificationsAjaxController extends FrameworkBundleAdminController
{

    public function __construct()
    {
        parent::__construct();
    }


    /**
     */
    public function fetchProductData(Request $req)
    {
        $product = new Product($req->get('id_product'));
        $result = json_encode(['cat' => $product->id_category_default, 'price' => $product->price]);
        die($result);
    }

    /**
     */
    public function select2ProductsData(Request $request)
    {
        $term = $request->get('term');
        $products = $this->findProducts($term);
        $result = json_encode(['total_count'=> count($products), 'items' => (array)$products]);
        die($result);
    }

    /**
     * @param $term
     * @return array|bool|\mysqli_result|\PDOStatement|resource
     * @throws \PrestaShopDatabaseException
     */
    private function findProducts($term){
        $id_lang = $this->getContext()->language->id;

        $sql = new DbQuery();
        $sql->select('p.`id_product` as id, p.`id_category_default`, CONCAT_WS(" - ", cl.`name`,pl.`name`) as text');
        $sql->from('product', 'p');
        $sql->join(Shop::addSqlAssociation('product', 'p'));
        $sql->leftJoin(
            'product_lang',
            'pl',
            'p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int) $id_lang . Shop::addSqlRestrictionOnLang('pl')
        );
        $sql->leftJoin('category_lang', 'cl', 'cl.`id_category` = p.`id_category_default`');
        $sql->orderBy('cl.`name` ASC');
        $sql->limit('50');

        if(!empty($term)){
            $where = ' 1 = 1 ';
            $search_items = explode(' ', $term);

            $items = [];
            foreach ($search_items as $item) {
                if(!empty($item)){
                    $items[$item][] = 'pl.`name` LIKE \'%' . pSQL($item) . '%\' ';
                }
            }

            foreach ($items as $likes) {
                $where .= ' AND (' . implode(' OR ', $likes) . ') ';
            }

            $sql->where($where);
        }

        $result = Db::getInstance()->executeS($sql);

        if (!$result) {
            return [];
        }
        return $result;
    }


    /**
     */
    public function calculatePrice(Request $request)
    {
        $store_product = $request->get('product');
        $supplier_price = $request->get('selected_formule_item');
        $formula = $request->get('formula');
        $supplier_id = $request->get('row');


        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');
        $priceMod = $repository->findOneById($supplier_id);
        try {
            $result = $this->calculateFormula($formula, $store_product, $priceMod, $supplier_price);
        } catch (Exception $exception){
            $result = json_encode(['msg' => 'Er ging iets fout tijdens het genereren van de formule']);
        }
        die($result);
    }



    /**
     *
     * Berekend de nieuwe prijs aan de hand van de formule en product id
     *
     * Beschikbare Dynamische waarden
     *
     * {HL} = Handelslengte Leverancier
     * {GL} = Gewicht leverancier
     * {PL} = Geselecteerde Prijs Leverancier
     * {HW} = Handelslengte Webshop
     * {GW} = Gewicht Webshop
     * {PW} = Oude Prijs Webshop
     * {PROC float} = Procentuele waarde
     * {NUM float} = Numerieke Waarde
     *
     * Beschikbare operators
     * + = Toevoegen
     * - =  Aftrekken
     * / = delen
     * * = vermenigvuldigen
     * ( = groep open
     * ) = groep sluiten
     * % = modulus
     *
     * @param $formula
     * @param $id_product
     * @return false|string|JsonResponse
     */
    public function calculateFormula($formula, $id_product, $priceMod, $supplier_price)
    {

        $supplierData = $priceMod->getSupplierData();
        $supplier_price_value = 0;
        $patterns = [
            '({HL})' => function () use ($supplierData) { //is Handelslengte van leverancier
                $supLength = $supplierData['attributes']->{'handelslengte'} ?? 0;
                return (float)$supLength;
            },
            '({GL})' => function () use ($supplierData) { //is gewicht van leverancier
                $supWeight = $supplierData['attributes']->{'gewicht'} ?? 0;
                return (float)$supWeight;
            },
            '({PL})' => function () use ($supplier_price, $supplierData) { //is de geslecteerde prijs van leverancier
                $supPrice = $supplierData['prices']->{$supplier_price};
                $supplier_price_value = $supPrice;
                return $supPrice;
            },
            '({HW})' => function () use ($id_product) {

                return $this->getProductFeatureValue($id_product, 32, 1)/1000;
            },
            '({GW})' => function ($matches) use ($id_product) {
                return $this->getProductFeatureValue($id_product, 45, 1);
            },
            '({PW})' => function ($matches) use ($id_product) {
                return Product::getPriceStatic($id_product, false, null, 2);
            }
        ];
        $result = preg_replace_callback_array($patterns, $formula);

        $total = 0;


        if ($this->validateGeneratedFormula($result)) {
            $math_string = 'return '.$result.';';
            $total = eval($math_string);
        }
        return json_encode(['msg' => 'formule berekend','total' => $total,'supplier_price'=> $supplier_price_value,'generated_formula' => $result]);
    }

    /**
     * Validate the sting before running eval;
     *
     * @param $string
     * @return int
     */
    private function validateGeneratedFormula($string)
    {
        $chars = str_split($string);
        $valid = 1;
        foreach ($chars as $char) {
            $charRes = preg_match('/[0-9-.+*)(\/]/', $char);
            if ($charRes == 0) {
                $valid = 0;
            }
        }
        return (bool)$valid;
    }


    /**
     * @param $id_product
     * @param $id_feature
     * @param $id_lang
     * @return array|float|int
     * @throws \PrestaShopDatabaseException
     */
    private function getProductFeatureValue($id_product, $id_feature, $id_lang = 1)
    {
        if (!Feature::isFeatureActive()) {
            return [];
        }

        $featureValue = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
            '
                SELECT fp.id_feature, fp.id_product, fp.id_feature_value, fvl.value
                FROM `' . _DB_PREFIX_ . 'feature_product` fp
                LEFT JOIN `' . _DB_PREFIX_ . 'feature_value` fv ON (fp.id_feature_value = fv.id_feature_value)
                LEFT JOIN `' . _DB_PREFIX_ . 'feature_value_lang` fvl ON (fp.id_feature_value = fvl.id_feature_value)
                WHERE fp.id_product = ' . (int)$id_product . ' AND fp.id_feature = ' . (int)$id_feature
        );

        if(empty($featureValue)){
            return 0;
        }

        return (float)$featureValue[0]['value'];
    }


}
