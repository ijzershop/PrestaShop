<?php
declare(strict_types=1);

namespace Modernesmid\Module\Pricemodifier\Controller\Admin;

use DateTime;
use Modernesmid\Module\Pricemodifier\Entity\PriceModification;
use ParseError;
use PrestaShop\OAuth2\Client\Provider\PrestaShop;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Feature;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\Shop;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use Symfony\Component\HttpFoundation\JsonResponse;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use Symfony\Component\HttpFoundation\Request;
use Exception;
use Symfony\Component\HttpFoundation\Response;

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
        $result = json_encode(['total_count' => count($products), 'items' => (array)$products]);
        die($result);
    }

    /**
     * @param $term
     * @return array|bool|\mysqli_result|\PDOStatement|resource
     * @throws \PrestaShopDatabaseException
     */
    private function findProducts($term)
    {

        $id_lang = $this->getContext()->language->id;

        $sql = new DbQuery();
        $sql->select('p.`id_product` as id, p.`id_category_default`, CONCAT_WS(" - ", cl.`name`,pl.`name`) as text');
        $sql->from('product', 'p');
        $sql->join(Shop::addSqlAssociation('product', 'p'));
        $sql->leftJoin(
            'product_lang',
            'pl',
            'p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int)$id_lang . Shop::addSqlRestrictionOnLang('pl')
        );
        $sql->leftJoin('category_lang', 'cl', 'cl.`id_category` = p.`id_category_default`');
        $sql->orderBy('cl.`name` ASC');
        $sql->limit('50');

        $where = ' 1 = 1 ';
        if (!empty($term)) {
            $search_items = explode(' ', $term);

            $items = [];
            foreach ($search_items as $item) {
                if (!empty($item)) {
                    $items[$item][] = 'pl.`name` LIKE \'%' . pSQL($item) . '%\' ';
                }
            }

            foreach ($items as $likes) {
                $where .= ' AND (' . implode(' OR ', $likes) . ') ';
            }

            $sql->where($where);
        }
        $where .= ' AND cl.`id_category` NOT IN (6,382) ';

        $sql->where($where);

        $result = Db::getInstance()->executeS($sql);

        if (!$result) {
            return [];
        }
        return $result;
    }

    /**
     * @return Response
     * @throws \PrestaShopDatabaseException
     */
    public function generateNewRulesForProducts(): Response
    {
        $products = Tools::getValue('products');
        $supplier_data = [];

        $supplier_data['attributes']['diameter'] = "";
        $supplier_data['attributes']['kwaliteit'] = "";
        $supplier_data['attributes']['uitvoering'] = "";
        $supplier_data['attributes']['handelslengte'] = "";
        $supplier_data['attributes']['kilo_per_meter'] = "";
        $supplier_data['attributes']['gewicht'] = "";
        $supplier_data['attributes']['korting'] = "";
        $supplier_data['attributes']['min_afname'] = "";
        $supplier_data['attributes']['eenheid'] = "";
        $supplier_data['attributes']['artikel_nummer'] = "";
        $supplier_data['attributes']['artikel_groep'] = "";
        $supplier_data['attributes']['barcode'] = "";
        $supplier_data['attributes']['oud_artikel'] = "";
        $supplier_data['attributes']['nieuw_artikel'] = "";

        $supplier_data['prices']['basis_prijs'] = "";
        $supplier_data['prices']['staffel_aantal_1'] = "";
        $supplier_data['prices']['staffel_prijs_1'] = "";
        $supplier_data['prices']['staffel_aantal_2'] = "";
        $supplier_data['prices']['staffel_prijs_2'] = "";
        $supplier_data['prices']['staffel_aantal_3'] = "";
        $supplier_data['prices']['staffel_prijs_3'] = "";
        $supplier_data['prices']['staffel_aantal_4'] = "";
        $supplier_data['prices']['staffel_prijs_4'] = "";
        $supplier_data['prices']['staffel_aantal_5'] = "";
        $supplier_data['prices']['staffel_prijs_5'] = "";
        $supplier_data['prices']['staffel_aantal_6'] = "";
        $supplier_data['prices']['staffel_prijs_6'] = "";
        $supplier_data['prices']['staffel_aantal_7'] = "";
        $supplier_data['prices']['staffel_prijs_7'] = "";

        $supplier_data['prices']['bruto_prijs_per_stuk'] = "";
        $supplier_data['prices']['netto_prijs_per_stuk'] = "";
        $supplier_data['prices']['prijs_per_meter'] = "";
        $supplier_data['prices']['prijs_tot_75'] = "";
        $supplier_data['prices']['prijs_tot_100'] = "";
        $supplier_data['prices']['prijs_tot_150'] = "";
        $supplier_data['prices']['prijs_tot_200'] = "";
        $supplier_data['prices']['prijs_tot_250'] = "";
        $supplier_data['prices']['prijs_tot_300'] = "";
        $supplier_data['prices']['prijs_tot_500'] = "";
        $supplier_data['prices']['prijs_tot_1000'] = "";
        $supplier_data['prices']['prijs_vanaf_500'] = "";
        $supplier_data['prices']['prijs_vanaf_300'] = "";
        $supplier_data['prices']['prijs_vanaf_1000'] = "";
        $supplier_data['prices']['stralen_menieen_per_meter'] = "";
        $supplier_data['prices']['stralen_menieen_per_100'] = "";
        $supplier_data['prices']['stralen_per_meter'] = "";
        $supplier_data['prices']['stralen_per_100'] = "";
        $supplier_data['prices']['verven_per_m1'] = "";
        $supplier_data['prices']['haaks_zagen'] = "";

        $newRules = [];
        $xml_date = new DateTime('NOW');
        $qb = Db::getInstance();

        foreach ($products as $product){
            $qb->insert('price_modification', [
                'name_supplier' => $product['product_name'],
                'file_supplier' => "HANDMATIG",
                'supplier_data' => addslashes(json_encode($supplier_data)),
                'xml_upload_date' => $xml_date->format('Y-m-d H:m:s'),
                'id_store_product' => (int)$product['id'],
                'active' => 0
            ],
                false,
                false
            );

            $newRules[] = $qb->Insert_ID();
        }

        return Response::create(json_encode($newRules));
    }


    /**
     */
    public function calculatePrice(Request $request)
    {
        $store_product = $request->get('product');
        $supplier_price = $request->get('selected_formule_item');
        $formula = $request->get('formula');
        $sup_formula = $request->get('sup_formula');
        $incr_formula = $request->get('incr_formula');
        $supplier_id = $request->get('row');


        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');
        $priceMod = $repository->findOneById($supplier_id);
        try {
            $result = $this->calculateFormula($formula, $store_product, $priceMod, $supplier_price, $sup_formula, $incr_formula);
        } catch (Exception $exception) {
            $result = json_encode(['msg' => 'Er ging iets fout tijdens het genereren van de formule']);
        }
        die($result);
    }

    /**
     * @return void
     * @throws \PrestaShopDatabaseException
     */
    public function fetchMissedProducts()
    {

        $db = Db::getInstance();
        $id_lang = $this->getContext()->language->id;

        $draw = Tools::getValue('draw');
        $page = Tools::getValue('start');
        $length = Tools::getValue('length');
        $order = Tools::getValue('order');
        $columns = Tools::getValue('columns');


        $sqlCheck = new DbQuery();
        $sqlCheck->select('GROUP_CONCAT(id_store_product) as id_store_product');
        $sqlCheck->from('price_modification', 'pm');
        $sqlCheck->where('pm.`id_store_product` > 0');
        $db->execute($sqlCheck);
        $ids = $db->getValue($sqlCheck);

        $sql = new DbQuery();
        $sql->select('CONCAT_WS(" - ", cl.`name`,pl.`name`) as product_name, p.`price`, p.`active` as active, p.`reference` as reference, p.`id_product` as id');
        $sql->from('product', 'p');
        $sql->leftJoin(
            'product_lang',
            'pl',
            'p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int)$id_lang . Shop::addSqlRestrictionOnLang('pl')
        );
        $sql->leftJoin('category_lang', 'cl', 'cl.`id_category` = p.`id_category_default`');
        $sql->where('p.`id_product` NOT IN ('.$ids.')');
        $sql->where('p.`id_category_default` NOT IN (6, 382)');
        $sql->where('p.`reference` != "CP"');
        $sql->groupBy('p.`id_product`');
        $db->executeS($sql);

        $totalRecords = $db->numRows();

        $where = ' 1 = 1 ';
        $items = [];
        foreach ($columns as $item) {
            if (!empty($item['search']['value'])) {
                switch ($item['data']) {
                    case 'product_name':
                        $term = $item['search']['value'];

                        $search_items = explode(' ', $term);

                        $items = [];
                        foreach ($search_items as $searchItem) {
                            if (!empty($searchItem)) {
                                $items[$searchItem][] = 'cl.`name` LIKE \'%' . pSQL($searchItem) . '%\' OR pl.`name` LIKE \'%' . pSQL($searchItem) . '%\' ';
                            }
                        }

                        foreach ($items as $likes) {
                            $where .= ' AND (' . implode(' OR ', $likes) . ') ';
                        }

                        $items[$item['data']][] = $where;

                        break;
                    case 'price':
                        $items[$item['data']][] = 'pl.`price` LIKE \'%' . pSQL($item['search']['value']) . '%\' ';
                        break;
                }
            }
        }

        foreach ($items as $likes) {
            $where .= ' AND (' . implode(' OR ', $likes) . ') ';
        }

        $sql->where($where);

        $columnArray = [
            'p.`id_product`',
            'product_name',
            'p.`price`'
        ];

        $orderBy = '';
        foreach ($order as $sortIndex => $sortItem){
            if($sortIndex > 0){
                $orderBy .= ' AND ' . $columnArray[$sortItem['column']] . ' ' . $sortItem['dir'] . ' ';
            } else {
                $orderBy .= $columnArray[$sortItem['column']] . ' ' . $sortItem['dir'] . ' ';
            }
        }
        $sql->orderBy($orderBy);
        $result = $db->executeS($sql);
        $totalFilteredRecords = $db->numRows();

//        $sql->limit($length, (int)$page);

        $returnDataArray = [
            'draw' => $draw,
            'recordsTotal' => (int)$totalRecords,
            'recordsFiltered' => (int)$totalFilteredRecords,
            'data' => array_slice($result,(int)$page, (int)$length)
        ];

        return die(json_encode($returnDataArray));
    }


    /**
     *
     * Berekend de nieuwe prijs aan de hand van de formule en product id
     *
     * Beschikbare Dynamische waarden
     *
     * {HL} = Handelslengte Leverancier
     * {GHL} = Gewicht leverancier
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
    public function calculateFormula($formula, $id_product, $priceMod, $supplier_price, $sup_formula=null, $incr_formula=null)
    {
        $supplierData = $priceMod->getSupplierData();

        $prices = (array)$supplierData['prices'];
        $attributes = (array)$supplierData['attributes'];
        $supplier_price_value = 0;
        $patterns = [
            '({HL})' => function () use ($attributes) { //is Handelslengte van leverancier
                $supLength = $attributes['handelslengte'] ?? 0;
                return (float)$supLength;
            },
            '({GHL})' => function () use ($attributes) { //is gewicht van leverancier
                $supWeight = $attributes['gewicht'] ?? 0;
                return (float)$supWeight;
            },
            '({GML})' => function () use ($attributes) { //is gewicht van leverancier
                $supWeightPerMeter = $attributes['kilo_per_meter'] ?? 0;
                return (float)$supWeightPerMeter;
            },
            '({PL})' => function () use ($supplier_price, $prices) { //is de geslecteerde prijs van leverancier
                $supPrice = 0;
                if (!isset($prices[$supplier_price])) {
                    return 0;
                }
                return round((float)$prices[$supplier_price], 2);
            },
            '({HW})' => function () use ($id_product) {

                return $this->getProductFeatureValue($id_product, 32, 1) / 1000;
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
        $supFormulaTotal = 0;
        $incrFormulaTotal = 0;
        $sup_result = $sup_formula;
        $incr_result = $incr_formula;
        if ($this->validateGeneratedFormula($result)) {
            $math_string = 'return ' . $result . ';';

            try {
                $total = eval($math_string);

                if($sup_formula){
                    $sup_result = preg_replace_callback_array($patterns, $sup_formula);
                    $incr_result = preg_replace_callback_array($patterns, $incr_formula);

                    if ($this->validateGeneratedFormula($sup_result)) {
                        $sup_math_string = 'return ' . $sup_result . ';';
                        $supFormulaTotal = eval($sup_math_string);
                        $incrFormulaTotal = $total - $supFormulaTotal;
                    }
                }
            } catch (ParseError $err) {
                return json_encode(['msg' => $err->getMessage(), 'total' => $total,'sup_total' => $supFormulaTotal,'incr_total' => $incrFormulaTotal, 'supplier_price' => $supplier_price_value, 'generated_formula' => $result, 'generated_sub_formula' => $sup_result, 'generated_incr_formula' => $incr_result]);
            }
        }
        return json_encode(['msg' => 'formule berekend', 'total' => $total,'sup_total' => $supFormulaTotal,'incr_total' => $incrFormulaTotal, 'supplier_price' => $supplier_price_value, 'generated_formula' => $result, 'generated_sub_formula' => $sup_result, 'generated_incr_formula' => $incr_result]);
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

        if (empty($featureValue)) {
            return 0;
        }

        return (float)$featureValue[0]['value'];
    }


}
