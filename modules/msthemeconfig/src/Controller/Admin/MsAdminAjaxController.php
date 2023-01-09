<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use MsThemeConfig\Class\Offer;
use mysqli_result;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Carrier;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Mail;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\Shop;
use PrestaShop\PrestaShop\Adapter\Entity\StockAvailable;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Entity\Validate;
use PrestaShopDatabaseException;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use ValidateCore;

/**
 *
 */
class MsAdminAjaxController  extends FrameworkBundleAdminController {

    private string $moduleName;
    private \Context $context;

    public function __construct()
    {
        $this->context = Context::getContext();
        $this->moduleName = 'msthemeconfig';

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
     * @throws PrestaShopDatabaseException
     */
    public function select2ProductsData(Request $request): Response
    {
        $term = $request->get('term');
        $products = $this->findProducts($term);
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
     * @throws \PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    public function putOfferRowAction(): Response
    {

        $this->setCurrencyValue();


        if (Tools::getValue('offer-new') === "false") {
            $id_product = Tools::getValue('offer-row-id');
            $offer = new Product($id_product);
            $offer->price = number_format((float)Tools::getValue('offer-price'), 6, '.', '');
            $offer->weight = Tools::getValue('offer-weight');
            $offer->name = [1 => $_POST['offer-row-title']];
            $offer->saw_loss = 0;
            $offer->min_saw_size = 0;
            $offer->min_cut_size = 0;
            $offer->min_cut_remainder = 0;
            $offer->oi_offer_extra_shipping = Tools::getValue('offer-extra-shipping');
            $offer->description_short = [1 => Tools::purifyHTML($_POST['offer-message'])];

            $offer->update();

            $qty = (int)Tools::getValue('offer-qty', 0);
            StockAvailable::setQuantity((int)$id_product, 0, $qty);

            $offer->quantity = $qty;
            $offer->id_product = $id_product;

            return Response::create(json_encode(['msg' => 'Offer updated', 'offer' => $offer, 'error' => false]));

        } else {
            $newOfferId = "";
            if((int)Tools::getValue('offer-id') == 0){
                $newOfferIntegration = new Offer();
                $newOfferIntegration->code = Tools::getValue('offer-code');
                $newOfferIntegration->name = Tools::getValue('offer-name');
                $newOfferIntegration->email = Tools::getValue('offer-email');
                $newOfferIntegration->phone = Tools::getValue('offer-phone');
                $newOfferIntegration->message = Tools::getValue('offer-message');
                $newOfferIntegration->date_exp = Tools::getValue('offer-date-exp');
                $newOfferIntegration->save(true);
                $newOfferId = $newOfferIntegration->id;
            }

            $offer = new Product(Tools::getValue('offer-row-product'));
            $offer->id = null;

            $offer->link_rewrite =  substr( "abcdefghilkmnopqrstuvwxyz" ,mt_rand( 0 ,25 ) ,1 ) .substr( md5((string)time()) ,1 );
            $offer->available_date =  date('Y-m-d');

            if($newOfferId != ""){
                $offer->id_oi_offer = $newOfferId;
            } else {
                $offer->id_oi_offer = Tools::getValue('offer-id');
            }

            $offer->price = number_format((float)Tools::getValue('offer-price'), 6, '.', '');
            $offer->weight = Tools::getValue('offer-weight');
            $offer->name = [1 => $_POST['offer-row-title']];
            $offer->saw_loss = 0;
            $offer->min_saw_size = 0;
            $offer->min_cut_size = 0;
            $offer->min_cut_remainder = 0;
            $offer->oi_offer_extra_shipping = Tools::getValue('offer-extra-shipping');
            $offer->description_short = [1 => Tools::purifyHTML($_POST['offer-message'])];

            $offer->save();

            $qty = (int)Tools::getValue('offer-qty', 0);
            StockAvailable::setQuantity((int)$offer->id, 0, $qty);

            $this->afterAdd($offer);

            $offer->quantity = $qty;
            $offer->new = true;
            return Response::create(json_encode(['msg' => 'Offer created', 'offer' => $offer, 'error' => false, 'offer-id' => $newOfferId]));
        }
    }

    /**
     * Process delete action
     * @return Response
     */
    public function deleteAction($offer_id, Request $req): Response
    {
        if((int)$offer_id == 0){
            return Response::create(json_encode(['msg' => 'Offer failed to remove', 'error' => true]));
        }
        try {
            $offer = new Product($offer_id);
            $offer->delete();
        } catch (\PrestaShopException $e) {
            return Response::create(json_encode(['msg' => 'Offer failed to remove', 'error' => true]));
        }
        return Response::create(json_encode(['msg' => 'Offer removed','offer'=>$offer, 'error' => false]));
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

    private function setCurrencyValue() {
        if (Tools::getIsset('price')) {
            $_POST['price'] = str_replace(',', '.', Tools::getValue('price',0));
        }
    }

}
