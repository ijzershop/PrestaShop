<?php
declare(strict_types=1);

namespace Modernesmid\Module\Pricemodifier\Controller\Admin;

use ParseError;
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
        $search = Tools::getValue('search');
        $order = Tools::getValue('order');
        $columns = Tools::getValue('columns');


        $sql = new DbQuery();
        $sql->select('mp.`name_supplier` as name_supplier, mp.`file_supplier` as file_supplier,mp.`active` as active, mp.`old_price_update` as old_price_update ,mp.`updated_at` as updated_at,CONCAT_WS(" - ", cl.`name`,pl.`name`) as product_name, p.`price`');
        $sql->from('product', 'p');
        $sql->leftJoin('price_modification', 'mp', 'p.`id_product` = mp.`id_store_product`');
        $sql->leftJoin(
            'product_lang',
            'pl',
            'p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int)$id_lang . Shop::addSqlRestrictionOnLang('pl')
        );
        $sql->leftJoin('category_lang', 'cl', 'cl.`id_category` = p.`id_category_default`');

        $db->execute($sql);

        $totalRecords = $db->numRows();


        $where = ' 1 = 1 ';
        $items = [];
        foreach ($columns as $item) {
            if (!empty($item['search']['value'])) {
                switch ($item['data']) {
                    case 'name_supplier':
                        $term = $item['search']['value'];

                        $search_items = explode(' ', $term);

                        $items = [];
                        foreach ($search_items as $searchItem) {
                            if (!empty($searchItem)) {
                                $items[$searchItem][] = 'mp.`name_supplier` LIKE \'%' . pSQL($searchItem) . '%\' ';
                            }
                        }

                        foreach ($items as $likes) {
                            $where .= ' AND (' . implode(' OR ', $likes) . ') ';
                        }

                        $items[$item['data']][] = $where;
                        break;
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
                    case 'old_price_update':
                        $date = explode(',', $item['search']['value']);


                        if (empty($date[0])) {
                            $from = date('Y-m-d H:i', strtotime('1999-01-01 00:00:00'));
                        } else {
                            $from = date('Y-m-d H:i', strtotime($date[0]));
                        }

                        if (empty($date[1])) {
                            $to = date('Y-m-d 23:59:59');
                        } else {
                            $to = date('Y-m-d H:i', strtotime($date[1]));
                        }

                        $items[$item['data']][] = '(mp.`old_price_update` BETWEEN \'' . pSQL($from) . '\' AND \'' . pSQL($to) . '\') ';
                        break;
                    case 'updated_at':
                        $date = explode(',', $item['search']['value']);

                        if (empty($date[0])) {
                            $from = date('Y-m-d H:i', strtotime('1999-01-01 00:00:00'));
                        } else {
                            $from = date('Y-m-d 00:00:00', strtotime($date[0]));
                        }

                        if (empty($date[1])) {
                            $to = date('Y-m-d 23:59:59');
                        } else {
                            $to = date('Y-m-d 23:59:59', strtotime($date[1]));
                        }

                        $items[$item['data']][] = '(mp.`updated_at` BETWEEN \'' . pSQL($from) . '\' AND \'' . pSQL($to) . '\') ';
                        break;
                }

            }
        }


        foreach ($items as $likes) {
            $where .= ' AND (' . implode(' OR ', $likes) . ') ';
        }
        //first draw no search values
        if($draw == '1' && count($items) == 0){
            $baseFrom = date('Y-m-d H:i', strtotime('1999-01-01 00:00:00'));
            $baseTo = date('Y-m-d 23:59:59', strtotime('-16 weeks'));
            $where .= ' AND (mp.`updated_at` BETWEEN \'' . pSQL($baseFrom) . '\' AND \'' . pSQL($baseTo) . '\') ';
        }

        $where .= ' AND mp.`active` = 1 ';
        $sql->where($where);

        $sql->limit($length, (int)$length * (int)$page);

        $columnArray = [
          'mp.`name_supplier`',
          'product_name',
          'p.`price`',
          'mp.`old_price_update`',
          'mp.`updated_at`'
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

        $returnDataArray = [
            'start' => $page,
            'length' => $length,
            'columns' => $columns,
            'search' => $search,
            'draw' => $draw,
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $totalFilteredRecords,
            'data' => $result
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
    public function calculateFormula($formula, $id_product, $priceMod, $supplier_price)
    {

        $supplierData = $priceMod->getSupplierData();
        $supplier_price_value = 0;
        $patterns = [
            '({HL})' => function () use ($supplierData) { //is Handelslengte van leverancier
                $supLength = $supplierData['attributes']->{'handelslengte'} ?? 0;
                return (float)$supLength;
            },
            '({GHL})' => function () use ($supplierData) { //is gewicht van leverancier
                $supWeight = $supplierData['attributes']->{'gewicht'} ?? 0;
                return (float)$supWeight;
            },
            '({GML})' => function () use ($supplierData) { //is gewicht van leverancier
                $supWeightPerMeter = $supplierData['attributes']->{'kilo_per_meter'} ?? 0;
                return (float)$supWeightPerMeter;
            },
            '({PL})' => function () use ($supplier_price, $supplierData) { //is de geslecteerde prijs van leverancier
                if (!isset($supplierData['prices']->{$supplier_price})) {
                    return;
                }

                $supPrice = $supplierData['prices']->{$supplier_price};
                $supplier_price_value = $supPrice;
                return round($supPrice, 2);
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


        if ($this->validateGeneratedFormula($result)) {
            $math_string = 'return ' . $result . ';';

            try {
                $total = eval($math_string);
            } catch (ParseError $err) {
                return json_encode(['msg' => $err->getMessage(), 'total' => 0, 'supplier_price' => $supplier_price_value, 'generated_formula' => $result]);
            }
        }
        return json_encode(['msg' => 'formule berekend', 'total' => $total, 'supplier_price' => $supplier_price_value, 'generated_formula' => $result]);
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
