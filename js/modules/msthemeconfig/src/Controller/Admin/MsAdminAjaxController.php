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
use PDOStatement;
use PrestaShop\PrestaShop\Core\Domain\Product\Pack\ValueObject\PackStockType;
use PrestaShop\PrestaShop\Core\Domain\Product\ValueObject\ProductType;
use PrestaShopBundle\Controller\Admin\PrestaShopAdminController;
use PrestaShopDatabaseException;
use PrestaShopException;
use Product;
use Shop;
use StockAvailable;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tools;
use Address;
use Tax;

// PrestaShop 9 legacy class loading workaround
if (!interface_exists('TaxManagerInterface')) {
    require_once _PS_ROOT_DIR_ . '/classes/tax/TaxManagerInterface.php';
}
if (!class_exists('TaxRulesTaxManager')) {
    require_once _PS_ROOT_DIR_ . '/classes/tax/TaxRulesTaxManager.php';
    if (class_exists('TaxRulesTaxManagerCore') && !class_exists('TaxRulesTaxManager')) {
        class_alias('TaxRulesTaxManagerCore', 'TaxRulesTaxManager');
    }
}
if (!class_exists('TaxManagerFactory')) {
    require_once _PS_ROOT_DIR_ . '/classes/tax/TaxManagerFactory.php';
    if (class_exists('TaxManagerFactoryCore') && !class_exists('TaxManagerFactory')) {
        class_alias('TaxManagerFactoryCore', 'TaxManagerFactory');
    }
}
if (!class_exists('TaxCalculator')) {
    require_once _PS_ROOT_DIR_ . '/classes/tax/TaxCalculator.php';
    if (class_exists('TaxCalculatorCore') && !class_exists('TaxCalculator')) {
        class_alias('TaxCalculatorCore', 'TaxCalculator');
    }
}
if (!class_exists('Tax')) {
    require_once _PS_ROOT_DIR_ . '/classes/Tax.php';
    if (class_exists('TaxCore') && !class_exists('Tax')) {
        class_alias('TaxCore', 'Tax');
    }
}
if (!class_exists('Address')) {
    require_once _PS_ROOT_DIR_ . '/classes/Address.php';
    if (class_exists('AddressCore') && !class_exists('Address')) {
        class_alias('AddressCore', 'Address');
    }
}

class MsAdminAjaxController extends PrestaShopAdminController
{
    private string $moduleName;
    private Context $context;

    public function __construct()
    {
        $this->context = Context::getContext();
        $this->moduleName = 'msthemeconfig';
        $this->time_based_products = Configuration::get('MSTHEMECONFIG_TIME_BASED_PRODUCTS', $this->context->language->id, $this->context->shop->id_shop_group, $this->context->shop->id, '');
    }

    public function fetchProductData(Request $req): bool|string
    {
        $product = new Product($req->get('id_product'));

        return json_encode(['cat' => $product->id_category_default, 'price' => $product->price]);
    }

    /**
     * @param $id_product
     *
     * @return bool
     */
    public function checkTimeBased($id_product): bool
    {
        if (in_array($id_product, explode(',', $this->time_based_products))) {
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
            if ((int) $product['out_of_stock'] > 0) {
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

        return new Response(json_encode(['total_count' => count($products), 'items' => (array) $products]));
    }

    /**
     * @param $term
     *
     * @return mysqli_result|bool|array|PDOStatement
     *
     * @throws PrestaShopDatabaseException
     */
    private function findProducts($term): mysqli_result|bool|array|PDOStatement
    {
        $id_lang = $this->context->language->id;
        $id_shop = $this->context->shop->id;

        $sql = new DbQuery();
        $sql->select('p.`id_product` as id, p.`out_of_stock` as out_of_stock, p.`price` as price,p.`weight` as weight, p.`id_category_default`, CONCAT_WS(" - ", cl.`name`,pl.`name`) as text');
        $sql->from('product', 'p');
        $sql->join(Shop::addSqlAssociation('product_shop', 'ps'));
        $sql->innerJoin('product_shop', 'ps', 'p.`id_product` = ps.`id_product` AND ps.`id_shop` = ' . $id_shop . ' AND ps.`active` = 1');
        $sql->join(Shop::addSqlAssociation('product', 'p'));
        $sql->leftJoin(
            'product_lang',
            'pl',
            'p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int) $id_lang . Shop::addSqlRestrictionOnLang('pl')
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
        $where .= ' AND cl.`id_category` NOT IN (6,382,422,185) ';

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
        $qty = (int) Tools::getValue('customizationTotal');

        $customization = (int) Tools::getValue('productCustomization');
        $product = new Product($id_product);

        $staticPrice = Product::getPriceStatic($id_product,
            false,
            $customization
        );
        $name = Product::getProductName($id_product, $customization, Context::getContext()->language->id);
        $price = $staticPrice * $qty;
        $weight = (float) $product->weight * $qty;

        if (is_numeric($price)) {
            return new Response(json_encode(['product_name' => $name, 'id_product_attribute' => $id_product_attribute, 'price' => $price, 'weight' => $weight]));
        } else {
            return new Response(json_encode(['product_name' => $name, 'id_product_attribute' => $id_product_attribute, 'price' => 0.00, 'weight' => $weight]));
        }
    }

    public function putOfferRowAction(): Response
    {
        try {
            return $this->doPutOfferRowAction();
        } catch (\Throwable $e) {
            return new Response(
                json_encode([
                    'msg'       => 'Unhandled error in putOfferRowAction',
                    'error'     => true,
                    'exception' => get_class($e),
                    'detail'    => $e->getMessage(),
                    'file'      => $e->getFile(),
                    'line'      => $e->getLine(),
                ]),
                500,
                ['Content-Type' => 'application/json']
            );
        }
    }

    private function doPutOfferRowAction(): Response
    {
        set_time_limit(0);
        $t0 = microtime(true);
        $logFile = _PS_ROOT_DIR_ . '/var/logs/offer_debug.log';
        file_put_contents($logFile, date('Y-m-d H:i:s') . " [START] offer-id=" . Tools::getValue('offer-id') . " offer-new=" . Tools::getValue('offer-new') . "\n", FILE_APPEND);

        $lang_id = (int) Context::getContext()->language->id;
        $this->setCurrencyValue();
        if (!Tools::getIsset('offer-memo')) {
            return new Response(
                json_encode(['msg' => 'Offer memo field is missing', 'error' => true]),
                422,
                ['Content-Type' => 'application/json']
            );
        }
        $offerMemo = Tools::purifyHTML((string) Tools::getValue('offer-memo'));
        $catID = Configuration::get('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', $lang_id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
        $categoryArray = [(int) $catID];

        if ((int) Tools::getValue('offer-id') == 0) {
            file_put_contents($logFile, sprintf("%.3fs [OFFER_SAVE_START]\n", microtime(true) - $t0), FILE_APPEND);
            $newOfferIntegration = new Offer();
            $newOfferIntegration->code = (string) Tools::getValue('offer-code');
            $newOfferIntegration->name = (string) Tools::getValue('offer-name');
            $newOfferIntegration->email = (string) Tools::getValue('offer-email');
            $newOfferIntegration->phone = (string) Tools::getValue('offer-phone');
            $newOfferIntegration->message = (string) Tools::getValue('offer-message');
            $newOfferIntegration->date_exp = (string) Tools::getValue('offer-date-exp');
            $newOfferIntegration->save(true);
            $newOfferId = (int) $newOfferIntegration->id;
            file_put_contents($logFile, sprintf("%.3fs [OFFER_SAVE_DONE] id=%d\n", microtime(true) - $t0, $newOfferId), FILE_APPEND);
        } else {
            $newOfferId = (int) Tools::getValue('offer-id');
        }

        if ((int) $catID > 0) {
            $category = new Category($catID);
            $categoryArray[] = $category->id_parent;
        }

        if (Tools::getValue('offer-new') === 'false') {
            // Manage items voor pakket
            $id_product = (int) Tools::getValue('offer-row-id');
            $id_pack_attribute = 0;
            $qty = (int) Tools::getValue('offer-qty', 0);

            $pack = new Pack($id_product);
            $pack->price = (float) number_format((float) Tools::getValue('offer-price'), 6, '.', '');
            $pack->weight = (float) Tools::getValue('offer-weight');
            $pack->name = [$lang_id => Tools::getValue('offer-row-title')];
            $pack->saw_loss = 0;
            $pack->min_saw_size = 0;
            $pack->min_cut_size = 0;
            $pack->min_cut_remainder = 0;
            $pack->oi_offer_extra_shipping = (float) Tools::getValue('offer-extra-shipping');
            $pack->oi_offer_memo = $offerMemo;
            $pack->description = [$lang_id => Tools::purifyHTML(Tools::getValue('offer-message-short'), true, true)];
            $pack->id_category_default = (int) $catID;
            $pack->id_tax_rules_group = 1;
            $pack->out_of_stock = 0;
            $pack->quantity = $qty;
            $pack->depends_on_stock = 1;
            $pack->pack_stock_type = PackStockType::STOCK_TYPE_BOTH;
            $pack->product_type = ProductType::TYPE_PACK;
            $pack->active = true;
            $validationErrors = $pack->validateFields(false, true);
            if ($validationErrors !== true) {
                file_put_contents($logFile, sprintf("%.3fs [UPDATE_VALIDATION_FAIL] %s\n", microtime(true) - $t0, json_encode($validationErrors)), FILE_APPEND);
                return new Response(json_encode(['msg' => 'Validation failed', 'error' => true, 'validation_errors' => $validationErrors]), 422);
            }

            file_put_contents($logFile, sprintf("%.3fs [UPDATE_PACK_SAVE_START] id=%d\n", microtime(true) - $t0, $id_product), FILE_APPEND);
            try {
                $saved = $pack->save();
            } catch (\Throwable $e) {
                file_put_contents($logFile, sprintf("%.3fs [UPDATE_PACK_SAVE_EXCEPTION] %s: %s\n", microtime(true) - $t0, get_class($e), $e->getMessage()), FILE_APPEND);
                return new Response(json_encode(['msg' => 'Save failed', 'error' => true, 'exception' => get_class($e), 'detail' => $e->getMessage()]), 500);
            }
            file_put_contents($logFile, sprintf("%.3fs [UPDATE_PACK_SAVE_DONE] saved=%s\n", microtime(true) - $t0, var_export($saved, true)), FILE_APPEND);
            if (!$saved) {
                return new Response(json_encode(['msg' => 'Save returned false', 'error' => true, 'id_product' => $id_product]), 500);
            }
            if (!$this->persistOfferMemo((int) $pack->id, $offerMemo)) {
                file_put_contents($logFile, sprintf("%.3fs [UPDATE_MEMO_PERSIST_FAIL] id=%d\n", microtime(true) - $t0, (int) $pack->id), FILE_APPEND);
                return new Response(json_encode(['msg' => 'Offer memo could not be persisted', 'error' => true, 'id_product' => (int) $pack->id]), 500);
            }

            $pack->addToCategories($categoryArray);
            file_put_contents($logFile, sprintf("%.3fs [UPDATE_DELETE_ITEMS]\n", microtime(true) - $t0), FILE_APPEND);
            Pack::deleteItems((int) $id_product);

            StockAvailable::setProductOutOfStock((int) $id_product, 0, null, (int) $id_pack_attribute);
            StockAvailable::setQuantity((int) $id_product, (int) $id_pack_attribute, $qty);

            if (Tools::getIsset('stock_selected_product_id') && count(Tools::getValue('stock_selected_product_id')) > 0) {
                $ids = Tools::getValue('stock_selected_product_id');
                $totals = Tools::getValue('stock_selected_product_qty');
                $customizedValue = Tools::getValue('stock_selected_product_customization');

                for ($i = 0; $i < count($ids); ++$i) {
                    if ((int) $customizedValue[$i] > 0) {
                        $id_product_attribute_item = (int) $customizedValue[$i];
                    } else {
                        $id_product_attribute_item = 0;
                    }
                    Pack::addItem((int) $pack->id, (int) $ids[$i], (int) $totals[$i], (int) $id_product_attribute_item);
                }
            }
            // Voeg zaagsnedes toe
            $pack->packedProducts = Pack::getItemTable((int) $pack->id, $lang_id);
            foreach ($pack->packedProducts as $key => $packItem) {
                $pack->packedProducts[$key]['attributes'] = Product::getAttributesParams((int) $packItem['id_product'], (int) $packItem['id_product_attribute_item']);

                $attachProduct = new Product((int) $packItem['id_product']);
                $combinations = $attachProduct->getAttributeCombinations($lang_id);
                if (count($pack->packedProducts[$key]['attributes']) > 0) {
                    $pack->packedProducts[$key]['attribute_combinations'] = $combinations;
                    $pack->packedProducts[$key]['attributes'][0]['price'] = Product::getPriceStatic((int) $packItem['id_product'], false, (int) $packItem['id_product_attribute_item']) * (int) $packItem['pack_quantity'];
                    $pack->packedProducts[$key]['attributes'][0]['customizedValue'] = (int) $packItem['id_product_attribute_item'];
                    $pack->packedProducts[$key]['time_based_product'] = $this->checkTimeBased((int) $packItem['id_product']);
                }
            }
            return new Response(json_encode(['msg' => 'Offer updated', 'offer_id' => $pack->id, 'error' => false, 'offer' => $pack]));
        } else {
            $id_pack_attribute = 0;
            $qty = (int) Tools::getValue('offer-qty', 0);

            $pack = new Pack();
            $pack->new = true;
            $pack->link_rewrite = substr('abcdefghilkmnopqrstuvwxyz', mt_rand(0, 25), 1) . substr(md5((string) time()), 1);
            $pack->available_date = date('Y-m-d');

            $pack->id_oi_offer = $newOfferId;

            $pack->price = (float) number_format((float) Tools::getValue('offer-price'), 6, '.', '');
            $pack->weight = (float) Tools::getValue('offer-weight');
            $pack->name = [$lang_id => Tools::getValue('offer-row-title')];
            $pack->saw_loss = 0;
            $pack->min_saw_size = 0;
            $pack->min_cut_size = 0;
            $pack->min_cut_remainder = 0;
            $pack->oi_offer_extra_shipping = (float) Tools::getValue('offer-extra-shipping');
            $pack->oi_offer_memo = $offerMemo;
            $pack->description = [$lang_id => Tools::purifyHTML(Tools::getValue('offer-message-short'), true, true)];
            $pack->id_category_default = (int) $catID;
            $pack->id_tax_rules_group = 1;
            $pack->out_of_stock = 0;
            $pack->quantity = $qty;
            $pack->depends_on_stock = 1;
            $pack->pack_stock_type = PackStockType::STOCK_TYPE_BOTH;
            $pack->product_type = ProductType::TYPE_PACK;
            $pack->active = true;

            $validationErrors = $pack->validateFields(false, true);
            if ($validationErrors !== true) {
                file_put_contents($logFile, sprintf("%.3fs [CREATE_VALIDATION_FAIL] %s\n", microtime(true) - $t0, json_encode($validationErrors)), FILE_APPEND);
                return new Response(json_encode(['msg' => 'Validation failed', 'error' => true, 'validation_errors' => $validationErrors]), 422);
            }

            file_put_contents($logFile, sprintf("%.3fs [CREATE_PACK_SAVE_START]\n", microtime(true) - $t0), FILE_APPEND);
            try {
                $saved = $pack->save();
            } catch (\Throwable $e) {
                file_put_contents($logFile, sprintf("%.3fs [CREATE_PACK_SAVE_EXCEPTION] %s: %s\n", microtime(true) - $t0, get_class($e), $e->getMessage()), FILE_APPEND);
                return new Response(json_encode(['msg' => 'Save failed', 'error' => true, 'exception' => get_class($e), 'detail' => $e->getMessage()]), 500);
            }
            file_put_contents($logFile, sprintf("%.3fs [CREATE_PACK_SAVE_DONE] saved=%s id=%d\n", microtime(true) - $t0, var_export($saved, true), (int)$pack->id), FILE_APPEND);
            if (!$saved) {
                return new Response(json_encode(['msg' => 'Save returned false', 'error' => true]), 500);
            }
            if (!$this->persistOfferMemo((int) $pack->id, $offerMemo)) {
                file_put_contents($logFile, sprintf("%.3fs [CREATE_MEMO_PERSIST_FAIL] id=%d\n", microtime(true) - $t0, (int) $pack->id), FILE_APPEND);
                return new Response(json_encode(['msg' => 'Offer memo could not be persisted', 'error' => true, 'id_product' => (int) $pack->id]), 500);
            }

            $pack->addToCategories($categoryArray);

            StockAvailable::setProductOutOfStock((int) $pack->id, 0, null, (int) $id_pack_attribute);
            StockAvailable::updateQuantity((int) $pack->id, (int) $id_pack_attribute, $qty);

            if (Tools::getIsset('stock_selected_product_id') && count(Tools::getValue('stock_selected_product_id')) > 0) {
                $ids = Tools::getValue('stock_selected_product_id');
                $totals = Tools::getValue('stock_selected_product_qty');
                $customizedValue = Tools::getValue('stock_selected_product_customization');

                for ($i = 0; $i < count($ids); ++$i) {
                    if ((int) $customizedValue[$i] > 0) {
                        $id_product_attribute_item = (int) $customizedValue[$i];
                    } else {
                        $id_product_attribute_item = 0;
                    }
                    Pack::addItem((int) $pack->id, (int) $ids[$i], (int) $totals[$i], (int) $id_product_attribute_item);
                }
            }
            // Voeg zaagsnedes toe
            $pack->packedProducts = Pack::getItemTable((int) $pack->id, $lang_id);
            foreach ($pack->packedProducts as $key => $packItem) {
                $pack->packedProducts[$key]['attributes'] = Product::getAttributesParams((int) $packItem['id_product'], (int) $packItem['id_product_attribute_item']);
                $attachProduct = new Product((int) $packItem['id_product']);
                $combinations = $attachProduct->getAttributeCombinations($lang_id);
                if (count($pack->packedProducts[$key]['attributes']) > 0) {
                    $pack->packedProducts[$key]['attribute_combinations'] = $combinations;
                    $pack->packedProducts[$key]['attributes'][0]['price'] = Product::getPriceStatic((int) $packItem['id_product'], false, (int) $packItem['id_product_attribute_item']) * (int) $packItem['pack_quantity'];
                    $pack->packedProducts[$key]['attributes'][0]['customizedValue'] = (int) $packItem['id_product_attribute_item'];
                    $pack->packedProducts[$key]['time_based_product'] = $this->checkTimeBased((int) $packItem['id_product']);
                }
            }
            $this->afterAdd($pack);

            return new Response(json_encode(['msg' => 'Offer created', 'offer_id' => $pack->id, 'error' => false, 'offer-id' => $newOfferId, 'offer' => $pack]));
        }
    }

    /**
     * @throws PrestaShopDatabaseException
     */
    private function deleteExistingStockRecords($id_product): void
    {
        Db::getInstance()->execute('DELETE FROM `' . _DB_PREFIX_ . 'stock_available` WHERE `id_product` = ' . $id_product);
    }

    private function setCurrencyValue()
    {
        if (Tools::getIsset('price')) {
            $_POST['price'] = str_replace(',', '.', Tools::getValue('price', 0));
        }
    }

    /**
     * The offer-row memo belongs to the base product record, not to a shop or
     * to the offer itself. Persist and verify it explicitly after Product::save()
     * so legacy multistore columns cannot overwrite it from a NULL shop value.
     */
    private function persistOfferMemo(int $idProduct, string $memo): bool
    {
        $db = Db::getInstance();
        if (!$db->update(
            'product',
            ['oi_offer_memo' => pSQL($memo, true)],
            '`id_product` = ' . $idProduct,
            1,
            false,
            false
        )) {
            return false;
        }

        $storedMemo = $db->getValue(
            'SELECT `oi_offer_memo` FROM `' . _DB_PREFIX_ . 'product` WHERE `id_product` = ' . $idProduct,
            false
        );

        return $storedMemo !== false && (string) $storedMemo === $memo;
    }

    /**
     * After adding new product
     *
     * @param $object
     *
     * @return bool
     */
    protected function afterAdd($product): bool
    {
        // Add product to category
        $config = Configuration::get('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', $this->context->language->id, $this->context->shop->getGroup()->id, $this->context->shop->id);
        if ($config != null && is_numeric($config) && $product instanceof Product) {
            $product->addToCategories([$config]);
        }

        return true;
    }

    /**
     * Process delete action
     *
     * @return Response
     */
    public function deleteAction($offer_id, Request $req): Response
    {
        if ((int) $offer_id == 0) {
            return new Response(json_encode(['msg' => 'Offer failed to remove', 'error' => true]));
        }
        try {
            $offer = new Product($offer_id);
            $offer->delete();
        } catch (PrestaShopException $e) {
            return new Response(json_encode(['msg' => 'Offer failed to remove', 'error' => true]));
        }

        return new Response(json_encode(['msg' => 'Offer removed', 'offer' => $offer, 'error' => false]));
    }
}
