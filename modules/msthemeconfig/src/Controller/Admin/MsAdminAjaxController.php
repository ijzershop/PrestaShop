<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use Category;
use Configuration;
use Context;
use Db;
use DbQuery;
use MsThemeConfig\Class\Offer;
use mysqli_result;
use Pack;
use PrestaShop\PrestaShop\Core\Domain\Product\Pack\ValueObject\PackStockType;
use PrestaShop\PrestaShop\Core\Domain\Product\ValueObject\ProductType;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopDatabaseException;
use Product;
use Shop;
use StockAvailable;
use StockManagerFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tools;
use Warehouse;
use WarehouseProductLocation;

/**
 *
 */
class MsAdminAjaxController extends FrameworkBundleAdminController
{

    private string $moduleName;
    private \Context $context;

    public function __construct()
    {
        $this->context = Context::getContext();
        $this->moduleName = 'msthemeconfig';
        $this->time_based_products = Configuration::get('MSTHEMECONFIG_TIME_BASED_PRODUCTS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id, '');
        parent::__construct();
    }

    /**
     *
     */
    public function fetchProductData(Request $req): bool|string
    {
        $product = new Product($req->get('id_product'));
        return json_encode(['cat' => $product->id_category_default, 'price' => $product->price]);
    }

    /**
     * @param $id_product
     * @return bool
     */
    public function checkTimeBased($id_product): bool
    {
        if(in_array($id_product, explode(',',$this->time_based_products))){
            return true;
        } else {
            return false;
        }
    }

    /**
     * @throws PrestaShopDatabaseException
     */
    public function select2ProductsData(Request $request): Response
    {
        $term = $request->get('term');
        $products = $this->findProducts($term);

        foreach ($products as $key => $product) {
            $product['out_of_stock'] = StockAvailable::outOfStock($product['id']);
            if((int)$product['out_of_stock'] > 0){
                $qty = '∞';
            } else {
                $qty = Product::getQuantity($product['id']);
            }
            $attachProduct = new Product($product['id']);
            $combinations = $attachProduct->getAttributeCombinations($this->context->language->id);
            $products[$key]['time_based_product'] = $this->checkTimeBased($product['id']);
            $products[$key]['attribute_combinations'] = $combinations;

            $products[$key]['quantity'] = $qty;
        }

        return Response::create(json_encode(['total_count' => count($products), 'items' => (array)$products]));
    }

    /**
     * @param $term
     * @return mysqli_result|bool|array|\PDOStatement
     * @throws PrestaShopDatabaseException
     */
    private function findProducts($term): mysqli_result|bool|array|\PDOStatement
    {
        $id_lang = $this->getContext()->language->id;
        $id_shop = $this->getContext()->shop->id;

        $sql = new DbQuery();
        $sql->select('p.`id_product` as id, p.`out_of_stock` as out_of_stock, p.`price` as price,p.`weight` as weight, p.`id_category_default`, CONCAT_WS(" - ", cl.`name`,pl.`name`) as text');
        $sql->from('product', 'p');
        $sql->join(Shop::addSqlAssociation('product_shop', 'ps'));
        $sql->innerJoin('product_shop', 'ps','p.`id_product` = ps.`id_product` AND ps.`id_shop` = '. $id_shop . ' AND ps.`active` = 1');
        $sql->join(Shop::addSqlAssociation('product', 'p'));
        $sql->leftJoin(
            'product_lang',
            'pl',
            'p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int)$id_lang . Shop::addSqlRestrictionOnLang('pl')
        );
        $sql->leftJoin('category_lang', 'cl', 'cl.`id_category` = p.`id_category_default`');
        $sql->orderBy('cl.`name` ASC');
        $sql->groupBy('p.`id_product`');
        $sql->limit('50');

        $where = ' 1 = 1 ';
        if (!empty($term)) {
            $search_items = explode(' ', $term);

            $items = [];
            foreach ($search_items as $item) {
                if (!empty($item)) {
                    $items[$item][] = 'pl.`name` LIKE \'%' . pSQL($item) . '%\' ';
                    $items[$item][] = 'cl.`name` LIKE \'%' . pSQL($item) . '%\' ';
                }
            }

            foreach ($items as $likes) {
                $where .= ' AND (' . implode(' OR ', $likes) . ') ';
            }
            $sql->where($where);
        }
        $where .= ' AND cl.`id_category` NOT IN (6,382,185) ';

        $sql->where($where);

        $result = Db::getInstance()->executeS($sql);

        if (!$result) {
            return [];
        }
        return $result;
    }

    public function getPriceDataAction()
    {
        $id_product = Tools::getValue('idPack');
        $id_product_attribute = Tools::getValue('idPackAttribute');
        $qty = (int)Tools::getValue('customizationTotal');

        $customization = (int)Tools::getValue('productCustomization');
        $product = new Product($id_product);

        $staticPrice = Product::getPriceStatic($id_product,
            false,
            $customization
        );
        $name = Product::getProductName($id_product, $customization, Context::getContext()->language->id);
        $price = $staticPrice*$qty;
        $weight = (float)$product->weight * $qty;

        if (is_numeric($price)) {
            return Response::create(json_encode(['product_name' => $name, 'id_product_attribute' => $id_product_attribute, 'price' => $price, 'weight' => $weight]));
        } else {
            return Response::create(json_encode(['product_name' => $name, 'id_product_attribute' => $id_product_attribute, 'price' => 0.00, 'weight' => $weight]));
        }
    }


    /**
     * @throws \PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    public function putOfferRowAction(): Response
    {
        $this->setCurrencyValue();
        $catID = Configuration::get('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
        $categoryArray = [$catID];

        if ((int)Tools::getValue('offer-id') == 0) {
            $newOfferIntegration = new Offer();
            $newOfferIntegration->code = Tools::getValue('offer-code');
            $newOfferIntegration->name = Tools::getValue('offer-name');
            $newOfferIntegration->email = Tools::getValue('offer-email');
            $newOfferIntegration->phone = Tools::getValue('offer-phone');
            $newOfferIntegration->message = Tools::getValue('offer-message');
            $newOfferIntegration->date_exp = Tools::getValue('offer-date-exp');
            $newOfferIntegration->save(true);
            $newOfferId = $newOfferIntegration->id;
        } else {
            $newOfferId = (int)Tools::getValue('offer-id');
        }

        if ((int)$catID > 0) {
            $category = new Category($catID);
            $categoryArray[] = $category->id_parent;
        }

        if (Tools::getValue('offer-new') === "false") {
            //Manage items voor pakket
            $id_product = Tools::getValue('offer-row-id');
            $id_pack_attribute = null;
            $qty = (int)Tools::getValue('offer-qty', 0);

            $pack = new Pack($id_product);
            $pack->price = (float)number_format((float)Tools::getValue('offer-price'), 6, '.', '');
            $pack->weight = Tools::getValue('offer-weight');
            $pack->name = [1 => $_POST['offer-row-title']];
            $pack->saw_loss = 0;
            $pack->min_saw_size = 0;
            $pack->min_cut_size = 0;
            $pack->min_cut_remainder = 0;
            $pack->oi_offer_extra_shipping = Tools::getValue('offer-extra-shipping');
            $pack->oi_offer_memo = Tools::purifyHTML($_POST['offer-memo']);
            $pack->description_short = [1 => Tools::purifyHTML($_POST['offer-message-short'], true, true)];
            $pack->id_category_default = $catID;
            $pack->id_tax_rules_group = 1;
            $pack->out_of_stock = 0;
            $pack->quantity = $qty;
            $pack->depends_on_stock = 1;
            $pack->pack_stock_type = PackStockType::STOCK_TYPE_BOTH;
            $pack->product_type = ProductType::TYPE_PACK;
            $pack->save();
            $pack->addToCategories($categoryArray);
            $pack->setAdvancedStockManagement(1);
            $this->deleteExistingStockRecords((int)$id_product);
            Pack::deleteItems($id_product);

            StockAvailable::setProductOutOfStock((int)$id_product, false);
            StockAvailable::setQuantity((int)$id_product, (int)$id_pack_attribute, $qty);
            StockAvailable::synchronize(($id_product));


            if (Tools::getIsset('stock_selected_product_id') && count(Tools::getValue('stock_selected_product_id')) > 0) {
                $ids = Tools::getValue('stock_selected_product_id');
                $totals = Tools::getValue('stock_selected_product_qty');
                $customizedValue = Tools::getValue('stock_selected_product_customization');

                for ($i = 0; $i < count($ids); $i++) {
                    if ((int)$customizedValue[$i] > 0) {
                        $id_product_attribute = (int)$customizedValue[$i];
                    } else {
                        $id_product_attribute = 0;
                    }
                    Pack::addItem($pack->id, $ids[$i], (int)$totals[$i], $id_product_attribute);
                }
            }
            $pack->update();
            //Voeg zaagsnedes toe
            $pack->packedProducts = Pack::getItemTable($pack->id, Context::getContext()->language->id);
            foreach ($pack->packedProducts as $key => $packItem) {
                $pack->packedProducts[$key]['attributes'] = Product::getAttributesParams($packItem['id_product'], $packItem['id_product_attribute_item']);

                $attachProduct = new Product($packItem['id_product']);
                $combinations = $attachProduct->getAttributeCombinations();
                if(count($pack->packedProducts[$key]['attributes']) > 0){
                    $pack->packedProducts[$key]['attribute_combinations'] = $combinations;
                    $pack->packedProducts[$key]['attributes'][0]['price']  = Product::getPriceStatic($packItem['id_product'],false,  $packItem['id_product_attribute_item'])*(int)$packItem['pack_quantity'];
                    $pack->packedProducts[$key]['attributes'][0]['customizedValue']  = $packItem['id_product_attribute_item'];
                    $pack->packedProducts[$key]['time_based_product'] = $this->checkTimeBased($packItem['id_product']);
                }
            }

            return Response::create(json_encode(['msg' => 'Offer updated', 'offer' => $pack, 'error' => false]));

        }
        else {
            $id_pack_attribute = null;
            $id_shop = Context::getContext()->shop->getShopId();
            $qty = (int)Tools::getValue('offer-qty', 0);

            $pack = new Pack();
            $pack->new = true;
            $pack->link_rewrite = substr("abcdefghilkmnopqrstuvwxyz", mt_rand(0, 25), 1) . substr(md5((string)time()), 1);
            $pack->available_date = date('Y-m-d');


            $pack->id_oi_offer = $newOfferId;

            $pack->price = (float)number_format((float)Tools::getValue('offer-price'), 6, '.', '');
            $pack->weight = Tools::getValue('offer-weight');
            $pack->name = [1 => $_POST['offer-row-title']];
            $pack->saw_loss = 0;
            $pack->min_saw_size = 0;
            $pack->min_cut_size = 0;
            $pack->min_cut_remainder = 0;
            $pack->oi_offer_extra_shipping = Tools::getValue('offer-extra-shipping');
            $pack->oi_offer_memo = Tools::purifyHTML($_POST['offer-memo']);
            $pack->description_short = [1 => Tools::purifyHTML($_POST['offer-message-short'])];
            $pack->id_category_default = $catID;
            $pack->id_tax_rules_group = 1;
            $pack->out_of_stock = 0;
            $pack->quantity = $qty;
            $pack->depends_on_stock = 1;
            $pack->pack_stock_type = PackStockType::STOCK_TYPE_BOTH;
            $pack->product_type = ProductType::TYPE_PACK;
            $pack->save();
            $pack->addToCategories($categoryArray);
            $pack->setAdvancedStockManagement(1);

            StockAvailable::setProductOutOfStock((int)$pack->id, false);
            StockAvailable::updateQuantity((int)$pack->id, (int)$id_pack_attribute, $qty);
            StockAvailable::synchronize(($pack->id));
            if (Tools::getIsset('stock_selected_product_id') && count(Tools::getValue('stock_selected_product_id')) > 0) {
                $ids = Tools::getValue('stock_selected_product_id');
                $totals = Tools::getValue('stock_selected_product_qty');
                $customizedValue = Tools::getValue('stock_selected_product_customization');

                for ($i = 0; $i < count($ids); $i++) {
                    if ((int)$customizedValue[$i] > 0) {
                        $id_product_attribute = (int)$customizedValue[$i];
                    } else {
                        $id_product_attribute = 0;
                    }
                    Pack::addItem($pack->id, $ids[$i], (int)$totals[$i], $id_product_attribute);
                }
            }
            //Voeg zaagsnedes toe
            $pack->packedProducts = Pack::getItemTable($pack->id, Context::getContext()->language->id);
            foreach ($pack->packedProducts as $key => $packItem) {
                $pack->packedProducts[$key]['attributes'] = Product::getAttributesParams($packItem['id_product'], $packItem['id_product_attribute_item']);
                $attachProduct = new Product($packItem['id_product']);
                $combinations = $attachProduct->getAttributeCombinations();
                if(count($pack->packedProducts[$key]['attributes']) > 0){
                    $pack->packedProducts[$key]['attribute_combinations'] = $combinations;
                    $pack->packedProducts[$key]['attributes'][0]['price']  = Product::getPriceStatic($packItem['id_product'],false,  $packItem['id_product_attribute_item'])*(int)$packItem['pack_quantity'];
                    $pack->packedProducts[$key]['attributes'][0]['customizedValue']  = $packItem['id_product_attribute_item'];
                    $pack->packedProducts[$key]['time_based_product'] = $this->checkTimeBased($packItem['id_product']);
                }
            }
            $pack->update();
            $this->afterAdd($pack);

            return Response::create(json_encode(['msg' => 'Offer created', 'offer' => $pack, 'error' => false, 'offer-id' => $newOfferId]));
        }
    }


    /**
     * @throws PrestaShopDatabaseException
     */
    private function deleteExistingStockRecords($id_product): void
    {
        Db::getInstance()->execute('DELETE FROM `'._DB_PREFIX_.'stock_available` WHERE `id_product` = '.$id_product);
    }

    private function setCurrencyValue()
    {
        if (Tools::getIsset('price')) {
            $_POST['price'] = str_replace(',', '.', Tools::getValue('price', 0));
        }
    }

    /**
     * After adding new product
     * @param $object
     * @return bool
     */
    protected function afterAdd($product): bool
    {
        //Add product to category
        $config = Configuration::get('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', $this->context->language->id, $this->context->shop->getGroup()->id, $this->context->shop->id);
        if ($config != null && is_numeric($config) && $product instanceof Product) {
            $product->addToCategories([$config]);
        }

        return true;
    }

    /**
     * Process delete action
     * @return Response
     */
    public function deleteAction($offer_id, Request $req): Response
    {
        if ((int)$offer_id == 0) {
            return Response::create(json_encode(['msg' => 'Offer failed to remove', 'error' => true]));
        }
        try {
            $offer = new Product($offer_id);
            $offer->delete();
        } catch (\PrestaShopException $e) {
            return Response::create(json_encode(['msg' => 'Offer failed to remove', 'error' => true]));
        }
        return Response::create(json_encode(['msg' => 'Offer removed', 'offer' => $offer, 'error' => false]));
    }

}
