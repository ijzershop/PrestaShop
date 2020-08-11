<?php
/**
 *    This file is part of eMagicOne Store Manager Bridge Connector.
 *
 *   eMagicOne Store Manager Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Store Manager Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

use PrestaShop\PrestaShop\Adapter\Product\ProductDataProvider;
use PrestaShopBundle\Controller\Admin\ProductController;
use PrestaShopBundle\Controller\Admin\ProductImageController;
use Psr\Container\ContainerInterface;

includedProductFiles();

/**
 * Class MAProducts
 */

class MAProduct extends EM1Main implements EM1ProductInterface
{
    /** @var int $languageId lang_id from request, id_lang field in database */
    private $languageId;

    /** @var string $whereQuery preparation of where query part */
    private $whereQuery = '1';

    /** @var string $orderByQuery preparation of order by query part */
    private $orderByQuery;


    /**
     * MAProduct constructor.
     *
     * @param int $languageId
     */
    public function __construct($languageId = null)
    {
        if ($languageId === null) {
            $this->languageId = self::getDefaultLanguageId();
        } else {
            $this->languageId = $languageId;
        }
    }

    /**
     * Prepare fields for products list response
     * Request is {module_url}/get_products&data=
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "page_size": (int),
     *  "page_index": (int),
     *  "sort_field": (string),
     *  "sort_direction": (string)
     * }
     *
     * @param $pageSize
     * @param $pageIndex
     * @param $sortField
     * @param $sortDirection
     * @return void Returns formatted products response with products or error code
     * @throws EM1Exception
     */
    public function getProducts($pageSize, $pageIndex, $sortField, $sortDirection)
    {
        $this->prepareProductsConditions($sortField, $sortDirection);
        self::generateResponse($this->getProductsData($pageSize, $pageIndex));
    }

    /**
     * Prepare fields for product details response
     * Request is {module_url}/get_product_details&data=
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "id": (int)
     * }
     *
     * @param int $productId
     * @return void Returns formatted product response with product details, or error code
     * @throws EM1Exception
     */
    public function getProductDetails($productId)
    {
        // Check if productId is set and greater then 0
        if ($productId < 1) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_ID_IS_INCORRECT);
        }

        try {
            $productShopsResult     = array();
            $productImagesResult    = array();
            $productLanguagesResult = array();

            // Create Product object and validate after initialisation
            /** @var ProductCore $product */
            $product = new Product($productId, true);
            if (!Validate::isLoadedObject($product)) {
                throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND);
            }

            $taxRules = TaxRulesGroup::getTaxRulesGroupsForOptions();
            $stocksByShops = $this->getProductStock($productId);
            $combinationsCountByShops = $this->getProductCombinationsCountByShops($productId);

            // Product shop assigning
            $productAssociatedShops = $product->getAssociatedShops();
            foreach ($productAssociatedShops as $shopId) {
                $productFields = new Product($product->id, true, null, $shopId);

                $quantity = 0;
                foreach ($stocksByShops as $stock) {
                    if ((int)$stock['id_shop'] === (int)$shopId) {
                        $quantity = (int)$stock['quantity'];
                        break;
                    }
                }

                $taxRuleName = '';
                foreach ($taxRules as $taxRule) {
                    if ((int)$productFields->id_tax_rules_group === (int)$taxRule['id_tax_rules_group']) {
                        $taxRuleName = (string)$taxRule['name'];
                        break;
                    }
                }

                $combinationsCount = 0;
                foreach ($combinationsCountByShops as $combinationsCountData) {
                    if ((int)$combinationsCountData['id_shop'] === (int)$shopId) {
                        $combinationsCount = (int)$combinationsCountData['combinations_count'];
                        break;
                    }
                }

                if (version_compare(_PS_VERSION_, '1.6', '>=')) {
                    $productPrice = $productFields->getPriceWithoutReduct(true);
                } else {
                    // base_price is deprecated from @deprecated 1.6.0.13
                    $productPrice = $this->round(
                        (property_exists($productFields, 'base_price') ? $productFields->base_price : 0)
                    );
                }

                if (empty($productPrice)) {
                    $productPrice = $this->round(
                        (property_exists($productFields, 'base_price') ? $productFields->base_price : 0)
                    );
                }

                $productShopsResult[] = array(
                    self::KEY_SHOP_ID                               => (int)$shopId,
                    self::KEY_STATUS                                => (bool)$productFields->active,
                    self::KEY_FORMATTED_COST_PRICE_WITHOUT_TAX      => Tools::displayPrice(
                        $productFields->wholesale_price
                    ),
                    self::KEY_RETAIL_PRICE_WITHOUT_TAX              => $productPrice,
                    self::KEY_FORMATTED_RETAIL_PRICE_WITHOUT_TAX    => Tools::displayPrice($productPrice),
                    self::KEY_QUANTITY                              => $quantity,
                    self::KEY_TAX_RULE                              => $taxRuleName,
                    self::KEY_COMBINATION_COUNT                     => $combinationsCount,
                );

                // Get all shops language values
                $productLanguageFields = $productFields->getFieldsLang();
                foreach ($productLanguageFields as $langValue) {
                    $productLanguagesResult[] = array(
                        self::KEY_LANGUAGE_ID           => (int)$langValue['id_lang'],
                        self::KEY_SHOP_ID               => (int)$langValue['id_shop'],
                        self::KEY_PRODUCT_NAME          => Tools::stripslashes($langValue['name']),
                        self::KEY_SHORT_DESCRIPTION     => Tools::stripslashes($langValue['description_short']),
                        self::KEY_DESCRIPTION           => Tools::stripslashes($langValue['description']),
                        self::KEY_LINK_REWRITE          => Tools::stripslashes($langValue['link_rewrite'])
                    );
                }
            }

            // Check images response data
            $shopImageCovers = $this->getShopImageCovers($productId);
            $images = Image::getImages($this->languageId, $product->id);
            foreach ($images as $image) {
                $shopImages = array();

                for ($j = 0, $productAssociatedShopsCount = count($productAssociatedShops);
                     $j < $productAssociatedShopsCount;
                     $j++) {
                    // Check image cover assigning to shops
                    $imageAdded = false;
                    foreach ($shopImageCovers as $shopImageCoverValue) {
                        if ((int)$productAssociatedShops[$j] === (int)$shopImageCoverValue['id_shop'] &&
                            (int)$image['id_image'] === (int)$shopImageCoverValue['id_image']
                        ) {
                            $shopImages[] = array(
                                self::KEY_SHOP_ID   => (int)$shopImageCoverValue['id_shop'],
                                self::KEY_COVER     => (bool)$shopImageCoverValue['cover']
                            );
                            $imageAdded = true;
                            continue;
                        }
                    }

                    if ($imageAdded) {
                        continue;
                    }

                    $shopImages[] = array(
                        self::KEY_SHOP_ID   => (int)$productShopsResult[$j]['shop_id'],
                        self::KEY_COVER     => false
                    );
                }

                $productImagesResult[] = array(
                    self::KEY_IMAGE_ID  => (int)$image['id_image'],
                    self::KEY_POSITION  => (int)$image['position'],
                    self::KEY_IMAGE_URL => (string)$this->getProductImageUrl(
                        $product->link_rewrite[$this->languageId],
                        (int)$image['id_image']
                    ),
                    self::KEY_SHOPS     => $shopImages
                );
            }

            $link = new Link();
            $productUrl = $link->getProductLink($product->id);

            $productResult = array(
                self::KEY_PRODUCT_ID                            => (int)$product->id,
                self::KEY_PRODUCT_TYPE                          => (string)$this->getProductType(
                    (int)$product->getType()
                ),
                self::KEY_REFERENCE                             => (string)$product->reference,
                self::KEY_EAN13                                 => (string)$product->ean13,
                self::KEY_UPC                                   => (string)$product->upc,
                self::KEY_ISBN                                  => (string)(
                property_exists($product, self::KEY_ISBN) ? $product->isbn : null
                ),
                'url'                                           => $productUrl,
                self::KEY_TOTAL_ORDERED                         => $this->getOrderedProductQuantity($productId),
                self::KEY_LANGUAGE_VALUES                       => $productLanguagesResult,
                self::KEY_IMAGES                                => $productImagesResult,
                self::KEY_SHOPS                                 => $productShopsResult
            );
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND, $exception->getMessage());
        }

        self::generateResponse($this->productResponse($productResult));
    }

    /**
     * Prepare response with searched products
     * Request is {module_url}/search_products&data=
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "search_value": (string),
     *  "page_size": (int),
     *  "page_index": (int),
     *  "sort_field": (string),
     *  "sort_direction": (string)
     * }
     *
     * @param $searchValue
     * @param $pageSize
     * @param $pageIndex
     * @param $sortField
     * @param $sortDirection
     * @return void Returns formatted products response with products or error code
     * @throws EM1Exception
     */
    public function searchProducts($searchValue, $pageSize, $pageIndex, $sortField, $sortDirection)
    {
        $this->prepareWhereSearchQueryPart($searchValue);
        $this->getProducts($pageSize, $pageIndex, $sortField, $sortDirection);
    }

    /**
     * Get products array by ids
     *
     * @param $ids
     * @param $pageSize
     * @param $pageIndex
     * @param $sortField
     * @param $sortDirection
     * @return array Returns formatted products response with products or error code
     * @throws EM1Exception
     */
    // TODO: Write annotation for getProductsByIds() method.
    public function getProductsByIds($ids, $pageSize, $pageIndex, $sortField, $sortDirection)
    {
        $this->prepareProductsConditions($sortField, $sortDirection);
        $this->prepareWhereIdsQueryPart($ids);
        return $this->getProductsData($pageSize, $pageIndex);
    }

    /**
     * @param $pageSize
     * @param $pageIndex
     * @return array Returns
     * @throws EM1Exception
     */
    // TODO: Write annotation for getProductsData() method.
    private function getProductsData($pageSize, $pageIndex)
    {
        $productsResult = array();
        // 1.6 and older does not have state column
        if (version_compare(_PS_VERSION_, 1.7, '>=')) {
            $this->whereQuery .= ' AND p.state = 1'; // get only active products
        }
        $productIds = $this->getProductsIds($pageSize, $pageIndex);
        foreach ($productIds as $productIdValue) {
            $productId = (int)$productIdValue['id_product'];

            // Create product response based on product object
            $product                = null;
            $productShopsResult     = array();
            $productImagesResult    = array();
            $productLanguagesResult = array();
            $productImagesError     = '';
            $productLangValuesError = '';
            try {
                $product = new Product($productId, true);

                $stocks = $this->getProductStock($productId);
                $combinationsCounts = $this->getProductCombinationsCountByShops($productId);

                // Product shop assigning and language values
                $productAssociatedShops = $product->getAssociatedShops();
                foreach ($productAssociatedShops as $shopId) {
                    $productFields = new Product($product->id, true, null, $shopId);

                    $quantity = 0;
                    foreach ($stocks as $stock) {
                        if ((int)$stock['id_shop'] === (int)$shopId) {
                            $quantity = (int)$stock['quantity'];
                            break;
                        }
                    }

                    $combinationsCount = 0;
                    foreach ($combinationsCounts as $combinationsCountData) {
                        if ((int)$combinationsCountData['id_shop'] === (int)$shopId) {
                            $combinationsCount = (int)$combinationsCountData['combinations_count'];
                            break;
                        }
                    }

                    if (version_compare(_PS_VERSION_, '1.6', '>=')) {
                        $productPrice = $productFields->getPriceWithoutReduct(true);
                    } else {
                        // base_price is deprecated from @deprecated 1.6.0.13
                        $productPrice = $this->round(
                            (property_exists($productFields, 'base_price') ? $productFields->{'base_price'} : 0)
                        );
                    }

                    if (empty($productPrice)) {
                        $productPrice = $this->round(
                            (property_exists($productFields, 'base_price') ? $productFields->{'base_price'} : 0)
                        );
                    }

                    $productShopsResult[] = array(
                        self::KEY_SHOP_ID                               => (int)$shopId,
                        self::KEY_STATUS                                => (bool)$productFields->active,
                        self::KEY_FORMATTED_COST_PRICE_WITHOUT_TAX      => Tools::displayPrice(
                            $productFields->wholesale_price
                        ),
                        self::KEY_RETAIL_PRICE_WITHOUT_TAX              => $productPrice,
                        self::KEY_FORMATTED_RETAIL_PRICE_WITHOUT_TAX    => Tools::displayPrice($productPrice),
                        self::KEY_QUANTITY                              => $quantity,
                        self::KEY_COMBINATION_COUNT                     => $combinationsCount,
                    );

                    $productLanguageFields = array();
                    try {
                        $productLanguageFields = $productFields->getFieldsLang();
                    } catch (Exception $exception) {
                        $productLangValuesError = $exception->getMessage();
                    }

                    if (!empty($productLanguageFields)) {
                        foreach ($productLanguageFields as $langValue) {
                            $productLanguagesResult[] = array(
                                self::KEY_LANGUAGE_ID   => (int)$langValue['id_lang'],
                                self::KEY_SHOP_ID       => (int)$langValue['id_shop'],
                                self::KEY_PRODUCT_NAME  => Tools::stripslashes($langValue['name'])
                            );
                        }
                    } else {
                        $productId = $product->id;
                        foreach (Language::getIDs(false) as $languageId) {
                            $productName = Product::getProductName((int)$product->id, null, (int)$languageId);
                            $productLanguagesResult[] = array(
                                self::KEY_LANGUAGE_ID   => (int)$languageId,
                                self::KEY_SHOP_ID       => (int)$shopId,
                                self::KEY_PRODUCT_NAME  => (!$productName ? '' : $productName)
                            );
                        }
                    }
                }

                try {
                    // Check images response data
                    $shopImageCovers = $this->getShopImageCovers($productId);
                    $images = Image::getImages($this->languageId, $product->id);
                    foreach ($images as $image) {
                        $shopImages = array();

                        for ($j = 0, $productAssociatedShopsCount = count($productAssociatedShops);
                            $j < $productAssociatedShopsCount;
                            $j++) {
                            // Check image cover assigning to shops
                            $imageAdded = false;
                            foreach ($shopImageCovers as $shopImageCoversValue) {
                                if ((int)$productAssociatedShops[$j] === (int)$shopImageCoversValue['id_shop']
                                    && (int)$image['id_image'] === (int)$shopImageCoversValue['id_image']
                                ) {
                                    $shopImages[] = array(
                                        self::KEY_SHOP_ID   => (int)$productShopsResult[$j]['shop_id'],
                                        self::KEY_COVER     => (bool)$shopImageCoversValue['cover']
                                    );

                                    $imageAdded = true;
                                    continue;
                                }
                            }

                            if ($imageAdded) {
                                continue;
                            }

                            $shopImages[] = array(
                                self::KEY_SHOP_ID   => (int)$productShopsResult[$j]['shop_id'],
                                self::KEY_COVER     => false
                            );
                        }

                        $productImagesResult[] = array(
                            self::KEY_IMAGE_ID  => (int)$image['id_image'],
                            self::KEY_POSITION  => (int)$image['position'],
                            self::KEY_IMAGE_URL => (string)$this->getProductImageUrl(
                                $product->link_rewrite[$this->languageId],
                                (int)$image['id_image']
                            ),
                            self::KEY_SHOPS     => $shopImages
                        );
                    }
                } catch (Exception $exception) {
                    $productImagesError = $exception->getMessage();
                }
            } catch (Exception $exception) {
                $errorMessage = $exception->getMessage();
                if (!empty($productImagesError)) {
                    $errorMessage .= 'image_exception - ' . $productImagesError;
                }

                if (!empty($productLangValuesError)) {
                    $errorMessage .= 'language_exception - ' . $productLangValuesError;
                }

                 throw new EM1Exception('error_while_generating_products', $errorMessage);
            }

            $productsResult[] = array(
                self::KEY_PRODUCT_ID                            => (int)$product->id,
                self::KEY_PRODUCT_TYPE                          => $this->getProductType($product->getType()),
                self::KEY_REFERENCE                             => (string)$product->reference,
                self::KEY_EAN13                                 => (string)$product->ean13,
                self::KEY_LANGUAGE_VALUES                       => $productLanguagesResult,
                self::KEY_IMAGES                                => $productImagesResult,
                self::KEY_SHOPS                                 => $productShopsResult
            );
        }

        return $this->productsResponse($productsResult);
    }

    /**
     * @param $sortField
     * @param $sortDirection
     * @throws EM1Exception
     */
    // TODO: Write annotation for prepareProductsConditions() method.
    private function prepareProductsConditions($sortField, $sortDirection)
    {
        $this->orderByQuery = $this->getOrderByQueryPart($sortField, $sortDirection);
    }

    // TODO: Write annotation for prepareWhereIdsQueryPart() method.
    private function prepareWhereIdsQueryPart($ids)
    {
        return $this->whereQuery .= ' AND p.`id_product` IN (' . $ids . ') ';
    }

    // TODO: Write annotation for prepareWhereSearchQueryPart() method.
    private function prepareWhereSearchQueryPart($searchValue)
    {
        $searchValue = pSQL($searchValue);
        $id_product_query_part = '';
        if (preg_match('/^\d+(?:,\d+)*$/', $searchValue)) {
            $id_product_query_part = /** @lang MySQL */ "p.`id_product` IN ({$searchValue}) OR";
        }

        // todo: should search product_id or product_name
        $this->whereQuery .= " AND (
            $id_product_query_part
            pl.`name` LIKE '%{$searchValue}%' OR
            p.`reference` LIKE '%{$searchValue}%' OR
            p.`ean13` LIKE '%{$searchValue}%'
        ) ";
    }

    /**
     * @param $sortField
     * @param $sortDirection
     * @return string
     * @throws EM1Exception
     */
    // TODO: Write annotation for getOrderByQueryPart() method.
    private function getOrderByQueryPart($sortField, $sortDirection)
    {
        if (!array_key_exists($sortField, self::KEY_ORDER_BY)
            || !array_key_exists($sortDirection, self::KEY_ORDER_BY_DIRECTION)
        ) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_INCORRECT_SORT_DATA);
        }

        $orderBy = self::KEY_ORDER_BY[$sortField];
        $orderByDirection = self::KEY_ORDER_BY_DIRECTION[$sortDirection];

        return "$orderBy $orderByDirection";
    }

    /**
     * @param array $productData
     * @return array
     */
    // TODO: Write annotation for productResponse() method.
    private function productResponse($productData = array())
    {
        return array(self::KEY_PRODUCT => $productData);
    }

    /**
     * @param array $productsData
     * @return array
     * @throws EM1Exception
     */
    // TODO: Write annotation for productsResponse() method.
    private function productsResponse($productsData = array())
    {
        return array(
            self::KEY_PRODUCTS       => $productsData,
            self::KEY_PRODUCTS_COUNT => (int)$this->getProductsCount()
        );
    }

    // TODO: Write annotation for getProductType() method.
    private function getProductType($typeId)
    {
        return array_key_exists($typeId, self::VALUE_PRODUCT_TYPE)
            ? self::VALUE_PRODUCT_TYPE[$typeId]
            : self::PRODUCT_TYPE_STANDARD;
    }

    /**
     * Get product image url link
     *
     * @param $linkRewrite  string  Product Link Rewrite
     * @param $imageId      int     Image Id
     * @param $imageName    string  Image Type
     * @return              string  Returns product image url link
     */
    public static function getProductImageUrl($linkRewrite, $imageId, $imageName = self::IMAGE_NAME_TYPE_HOME)
    {
        $imageUrl = '';
        $imageId = (int)$imageId;
        $linkRewrite = (string)$linkRewrite;

        if (method_exists('ImageType', 'getFormattedName')) {
            $imageType = ImageType::{'getFormattedName'}($imageName);
        } elseif (method_exists('ImageType', 'getFormatedName')) {
            $imageType = ImageType::{'getFormatedName'}($imageName);
        } else {
            $imageType = "{$imageName}_default";
        }

        if (!empty($linkRewrite) && $imageId > 0) {
            $imageUrl = Context::getContext()->link->getImageLink($linkRewrite, $imageId, $imageType);
        }

        return $imageUrl;
    }

    /**
     * @param $productId
     * @return array
     * @throws EM1Exception
     */
    private function getProductStock($productId)
    {
        $product  = new Product($productId);
        $shops = $product->getAssociatedShops();
        $product_stock = [];

        foreach ($shops as $id_shop) {
            /** @var DbQueryCore $dbQuery */
            $dbQuery = new DbQuery();

            $result = self::getQueryResult(
                $dbQuery->select('`quantity`')
                    ->from('stock_available')
                    ->where(
                        "`id_product` = {$productId}".
                        ' AND `id_product_attribute` = 0'.
                        StockAvailable::addSqlShopRestriction(null, (int)$id_shop)
                    )
            );
            if (is_array($result) && $result !== []) {
                $product_stock[] = array_merge(['id_shop' => $id_shop], $result[0]);
            }
        }
        return $product_stock;
    }

    /**
     * @param $productId
     * @return int
     * @throws EM1Exception
     */
    private function getOrderedProductQuantity($productId)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        $orderedProductQuantity = self::getQueryResult(
            $dbQuery->select('SUM(product_quantity) AS quantity')
                ->from('order_detail')
                ->where('product_id = ' . $productId)
        );

        return !empty($orderedProductQuantity) ? (int)reset($orderedProductQuantity)['quantity'] : 0;
    }

    /**
     * @param $productId
     * @return array
     * @throws EM1Exception
     */
    private function getShopImageCovers($productId)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        return self::getQueryResult(
            $dbQuery->select(
                'imageshop.`id_image`, imageshop.`id_shop`, image.`id_product`, imageshop.`cover`'
            )
                ->from('image', 'image')
                ->leftJoin('image_shop', 'imageshop', 'image.`id_image` = imageshop.`id_image`')
                ->where('image.`id_product` = ' . $productId . ' AND imageshop.`cover` = 1')
        );
    }

    private function searchProductsLikePresta(
        $searchPhrase,
        $shopId = null,
        $excludeVirtuals = false,
        $excludePacks = false,
        $disableCombination = false
    ) {
        if ($shopId === null) {
            $shopId = Configuration::get('PS_SHOP_DEFAULT');
        }
        $context = Context::getContext();

        $sql = pSQL('SELECT p.`id_product`, pl.`link_rewrite`, p.`reference`, 
                p.`quantity`, pl.`name`, image_shop.`id_image` id_image, il.`legend`, p.`cache_default_attribute`
                FROM `' . _DB_PREFIX_ . 'product` p
                ' . Shop::addSqlAssociation('product', 'p') . '
                LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON (pl.id_product = p.id_product 
                AND pl.id_lang = ' . (int)$this->languageId . Shop::addSqlRestrictionOnLang('pl') . ')
                LEFT JOIN `' . _DB_PREFIX_ . 'image_shop` image_shop
                    ON (image_shop.`id_product` = p.`id_product` AND image_shop.cover=1 
                    AND image_shop.id_shop=' . (int)$shopId . ')
                LEFT JOIN `' . _DB_PREFIX_ . 'image_lang` il ON (image_shop.`id_image` = il.`id_image` 
                AND il.`id_lang` = ' . (int)$this->languageId . ')
                WHERE (pl.name LIKE \'%' . pSQL($searchPhrase) . '%\' 
                OR p.reference LIKE \'%' . pSQL($searchPhrase) . '%\')' .
            ($excludeVirtuals ?
                'AND NOT EXISTS (SELECT 1 FROM `' . _DB_PREFIX_ .
                'product_download` pd WHERE (pd.id_product = p.id_product))' :
                '') .
            ($excludePacks ? 'AND (p.cache_is_pack IS NULL OR p.cache_is_pack = 0)' : '') .
            ' GROUP BY p.id_product');

        $items = Db::getInstance()->executeS($sql);

        if ($items && $disableCombination) {
            $results = [];
            foreach ($items as $item) {
                $results[] = [
                    'product_id'           => (int)$item['id_product'],
                    'product_attribute_id' => (int)0,
                    'name'                 => $item['name'] . (!empty($item['reference']) ?
                            ' (ref: ' . $item['reference'] . ')' : ''),
                    'reference'            => (!empty($item['reference']) ? $item['reference'] : ''),
                    'image_url'            => str_replace(
                        'http://',
                        Tools::getShopProtocol(),
                        $context->link->getImageLink(
                            $item['link_rewrite'],
                            $item['id_image'],
                            ImageType::getFormattedName('home')
                        )
                    ),
                ];
            }

            return $results;
        }
        if ($items) {
            // packs
            $results = [];
            foreach ($items as $item) {
                // check if product have combination
                if (Combination::isFeatureActive() && $item['cache_default_attribute']) {
                    $sql = pSQL('SELECT pa.`id_product_attribute`, pa.`reference`, pa.`quantity`, 
                                ag.`id_attribute_group`, 
                                pai.`id_image`, agl.`name` AS group_name, al.`name` AS attribute_name,
                                a.`id_attribute`
                            FROM `' . _DB_PREFIX_ . 'product_attribute` pa
                            ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
                            LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_combination` pac 
                            ON pac.`id_product_attribute` = pa.`id_product_attribute`
                            LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON a.`id_attribute` = pac.`id_attribute`
                            LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group` ag 
                            ON ag.`id_attribute_group` = a.`id_attribute_group`
                            LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` al 
                            ON (a.`id_attribute` = al.`id_attribute` AND al.`id_lang` = ' . (int)$this->languageId . ')
                            LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group_lang` agl 
                            ON (ag.`id_attribute_group` = agl.`id_attribute_group` 
                            AND agl.`id_lang` = ' . (int)$this->languageId . ')
                            LEFT JOIN `' . _DB_PREFIX_ . 'product_attribute_image` pai 
                            ON pai.`id_product_attribute` = pa.`id_product_attribute`
                            WHERE pa.`id_product` = ' . (int)$item['id_product'] . '
                            GROUP BY pa.`id_product_attribute`, ag.`id_attribute_group`
                            ORDER BY pa.`id_product_attribute`');

                    $combinations = Db::getInstance()->executeS($sql);
                    if (!empty($combinations)) {
                        foreach ($combinations as $combination) {
                            $results[$combination['id_product_attribute']]['product_id'] = (int)$item['id_product'];
                            $results[$combination['id_product_attribute']]['product_attribute_id'] =
                                (int)$combination['id_product_attribute'];
                            !empty($results[$combination['id_product_attribute']]['name']) ?
                                $results[$combination['id_product_attribute']]['name'] .= ' ' .
                                    $combination['group_name'] . '-' . $combination['attribute_name']
                                : $results[$combination['id_product_attribute']]['name'] =
                                $item['name'] . ' ' . $combination['group_name'] . '-' . $combination['attribute_name'];
                            if (!empty($combination['reference'])) {
                                $results[$combination['id_product_attribute']]['reference'] = $combination['reference'];
                            } else {
                                $results[$combination['id_product_attribute']]['reference'] =
                                    !empty($item['reference']) ? $item['reference'] : '';
                            }
                            if (empty($results[$combination['id_product_attribute']]['image_url'])) {
                                $results[$combination['id_product_attribute']]['image_url'] = str_replace(
                                    'http://',
                                    Tools::getShopProtocol(),
                                    $context->link->getImageLink(
                                        $item['link_rewrite'],
                                        $combination['id_image'],
                                        ImageType::getFormattedName('home')
                                    )
                                );
                            }
                            $results[$combination['id_product_attribute']]['formatted_retail_price'] =
                                Tools::displayPrice(
                                    Product::getPriceStatic(
                                        $item['id_product'],
                                        true,
                                        $combination['id_product_attribute']
                                    )
                                );
                            if (empty($combination['quantity'])) {
                                $results[$combination['id_product_attribute']]['quantity'] = (int)$item['quantity'];
                            } else {
                                $results[$combination['id_product_attribute']]['quantity'] =
                                    (int)$combination['quantity'];
                            }
                        }
                    } else {
                        $results[] = [
                            'product_id'             => (int)$item['id_product'],
                            'product_attribute_id'   => (int)0,
                            'name'                   => $item['name'],
                            'reference'              => (!empty($item['reference']) ? $item['reference'] : ''),
                            'image_url'              => str_replace(
                                'http://',
                                Tools::getShopProtocol(),
                                $context->link->getImageLink(
                                    $item['link_rewrite'],
                                    $item['id_image'],
                                    ImageType::getFormattedName('home')
                                )
                            ),
                            'formatted_retail_price' => Tools::displayPrice(
                                Product::getPriceStatic($item['id_product'])
                            ),
                            'quantity'               => (int)$item['id_product']
                        ];
                    }
                } else {
                    $results[] = [
                        'product_id'             => (int)$item['id_product'],
                        'product_attribute_id'   => (int)0,
                        'name'                   => $item['name'],
                        'reference'              => (!empty($item['reference']) ? $item['reference'] : ''),
                        'image_url'              => str_replace(
                            'http://',
                            Tools::getShopProtocol(),
                            $context->link->getImageLink(
                                $item['link_rewrite'],
                                $item['id_image'],
                                ImageType::getFormattedName('home')
                            )
                        ),
                        'formatted_retail_price' => Tools::displayPrice(Product::getPriceStatic($item['id_product'])),
                        'quantity'               => (int)$item['id_product']
                    ];
                }
            }

            return $results;
        }
        return [];
    }

    /**
     * @param $shopId
     * @param $searchPhrase
     * @param $pageSize
     * @param $pageIndex
     * @throws EM1Exception
     */
    public function searchProductsToAddInPack($shopId, $searchPhrase, $pageSize, $pageIndex)
    {
        $responseArray = [
            'products_count' => null,
            'products'       => []
        ];
        $products = $this->searchProductsLikePresta($searchPhrase, $shopId, true, true);
        $responseArray['products_count'] = count($products);
        $responseArray['products'] = array_slice($products, ($pageIndex - 1) * $pageSize, $pageSize);
        self::generateResponse($responseArray);
    }

    /**
     * @param $searchPhrase
     * @param $pageSize
     * @param $pageIndex
     */
    public function searchRelatedProductsToAdd($searchPhrase, $pageSize, $pageIndex)
    {
        $responseArray = [
            'products_count' => null,
            'products'       => []
        ];
        $products = $this->searchProductsLikePresta(
            $searchPhrase,
            null,
            false,
            false,
            true
        );
        foreach ($products as $key => $product) {
            if (array_key_exists('product_id', $product)) {
                $productObject = new Product($product['product_id'], true, $this->languageId);
            } else {
                $productObject = new Product($product['id_product'], true, $this->languageId);
            }
            if ($productObject->id === null) {
                unset($products[$key]);
            } else {
                $responseArray['products'][] = $this->getRelatedProductToAddDto($product);
            }
        }
        $responseArray['products_count'] = count($products);
        $responseArray['products'] = array_slice(
            $responseArray['products'],
            ($pageIndex - 1) * $pageSize,
            $pageSize
        );
        self::generateResponse($responseArray);
    }

    /**
     * @param $productData
     * @return array
     */
    private function getRelatedProductToAddDto($productData)
    {
        return $this->getRelatedProductDto($productData);
    }

    public function addRelatedProduct($productId, $relatedProductId)
    {
        if (!Product::existsInDatabase($productId, 'product')
            || !Product::existsInDatabase($relatedProductId, 'product')
        ) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }

        $result = self::getQueryResult(
            'SELECT * FROM `' . _DB_PREFIX_ . 'accessory` 
            WHERE `id_product_1` = ' . (int)$productId . ' AND `id_product_2` = ' . (int)$relatedProductId
        );

        // check related product link existence
        if (count($result) == 0) {
            $result = Db::getInstance()->execute(
                pSQL('INSERT INTO `' . _DB_PREFIX_ . 'accessory` 
            (`id_product_1`, `id_product_2`) VALUES (' . (int)$productId . ', ' . (int)$relatedProductId . ')')
            );
            if (!$result) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR);
            }
        }
        $productObject = new Product($productId);
        self::generateResponse(
            [
                'related_products_count' => count($productObject->getAccessories($this->languageId))
            ]
        );
    }

    /**
     * @param $pageSize
     * @param $pageIndex
     * @return array
     * @throws EM1Exception
     */
    private function getProductsIds($pageSize, $pageIndex)
    {
        return self::getQueryResult(
            /** @lang MySQL */'SELECT p.`id_product` FROM `' . _DB_PREFIX_ . 'product` p'
            . Shop::addSqlAssociation('product', 'p')
            . ' LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON p.`id_product` = pl.`id_product` 
            AND pl.`id_lang` = ' . $this->languageId .
            Shop::addSqlRestrictionOnLang('pl', (int)Shop::getContextShopID()) .
            ' LEFT JOIN `' . _DB_PREFIX_ . 'stock_available` sa ON sa.`id_product` = p.`id_product` 
                AND sa.`id_product_attribute` = 0 '
            . StockAvailable::addSqlShopRestriction(null, (int)Shop::getContextShopID(), 'sa') .
            ' WHERE ' . $this->whereQuery .
            ' ORDER BY '.$this->orderByQuery .
            ' LIMIT ' . (($pageIndex - 1) * $pageSize) . ',' . $pageSize
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getProductsCount()
    {
        return self::getQueryValue(
            /** @lang MySQL */'SELECT COUNT(p.`id_product`) AS `count` FROM `' . _DB_PREFIX_ . 'product` p 
            LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON (p.`id_product` = pl.`id_product` 
            AND pl.`id_lang` = ' .
            $this->languageId . Shop::addSqlRestrictionOnLang('pl', (int)Shop::getContextShopID()) . ') ' .
            Shop::addSqlAssociation('product', 'p') .
            ' WHERE ' . $this->whereQuery
        );
    }

    /**
     * @param $productId
     * @param $productItemId
     * @param $productAttributeId
     * @param $quantity
     * @throws EM1Exception
     */
    public function addProductToPack(
        $productId,
        $productItemId,
        $productAttributeId,
        $quantity
    ) {
        if (!Product::existsInDatabase($productId, 'product')
            || !Product::existsInDatabase($productItemId, 'product')
        ) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            Pack::addItem($productId, $productItemId, $quantity, $productAttributeId);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        self::generateResponse(
            [
                'pack_products_count' => self::getPackProductsCount($productId)
            ]
        );
    }

    public static function getPackProductsCount($productId)
    {
        return (int)count(Pack::getItems($productId, self::getDefaultLanguageId()));
    }

    /**
     * @param $productId
     * @param $pageIndex
     * @param $pageSize
     * @throws EM1Exception
     */
    public function getProductEditPackItems($productId, $pageIndex, $pageSize)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        $responseArray = [
            'pack_products'       => [],
            'pack_products_count' => self::getPackProductsCount($productId)
        ];
        $packProducts = Pack::getItems($productId, $this->languageId);
        foreach ($packProducts as $packProduct) {
            $responseArray['pack_products'][] = $this->getProductEditPackProductDto($packProduct);
        }
        $responseArray['pack_products'] = array_slice(
            $responseArray['pack_products'],
            ($pageIndex - 1) * $pageSize,
            $pageSize
        );
        self::generateResponse($responseArray);
    }

    private function getProductEditPackProductDto($packProduct)
    {
        $imageId =
            $packProduct->getImages($this->languageId) ?
                $packProduct->getImages($this->languageId)[0]['id_image'] :
                null;
        return [
            'product_item_id'           => (int)$packProduct->id,
            'product_attribute_item_id' => (int)$packProduct->id_pack_product_attribute,
            'name'                      => $packProduct->name,
            'reference'                 => $packProduct->reference,
            'image_url'                 => $imageId ?
                self::getProductImageUrl($packProduct->link_rewrite, $imageId) :
                null,
            'quantity'                  => (int)$packProduct->quantity
        ];
    }

    /**
     * @param $productId
     * @throws EM1Exception
     */
    public function getProductEditAttachedFiles($productId)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        $responseArray = [
            'attached_files'       => [],
            'attached_files_count' => 0
        ];

        $attachedFiles = $this->getAllProductAttachmentsData($productId);

        foreach ($attachedFiles as $attachedFile) {
            $responseArray['attached_files'][] = $this->getProductAttachedFileDto($attachedFile);
        }
        $responseArray['attached_files_count'] = count($responseArray['attached_files']);

        self::generateResponse($responseArray);
    }

    /**
     * @param $productId
     * @return array
     */
    private function getAllProductAttachmentsData($productId)
    {
        $attachedFiles = [];
        $languageIds = Language::getLanguages(true, false, true);
        foreach ($languageIds as $languageId) {
            $isAssignedFlag = true; // to determine which is attached to product
            $attachmentArrays = [
                Attachment::getAttachments($languageId, $productId, true), // attached to product
                Attachment::getAttachments($languageId, $productId, false) // not attached to product
            ];
            foreach ($attachmentArrays as $attachments) {
                foreach ($attachments as $attachment) {
                    // if attachment data is corrupted
                    if ($attachment['id_attachment'] == 0) {
                        continue;
                    }
                    if (array_key_exists($attachment['id_attachment'], $attachedFiles)) {
                        $attachedFiles[$attachment['id_attachment']]['id_lang'][] = $attachment['id_lang'];
                        $attachedFiles[$attachment['id_attachment']]['name'][] = $attachment['name'];
                        $attachedFiles[$attachment['id_attachment']]['description'][] = $attachment['description'];
                    } else {
                        $attachedFiles[$attachment['id_attachment']] = $attachment;
                        $attachedFiles[$attachment['id_attachment']]['is_assigned'] = $isAssignedFlag;
                        $attachedFiles[$attachment['id_attachment']]['id_lang'] = [
                            $attachment['id_lang']
                        ];
                        $attachedFiles[$attachment['id_attachment']]['name'] = [
                            $attachment['name']
                        ];
                        $attachedFiles[$attachment['id_attachment']]['description'] = [
                            $attachment['description']
                        ];
                    }
                }
                $isAssignedFlag = false;
            }
        }
        // sorting array by id_attachment field
        usort(
            $attachedFiles,
            function ($a, $b) {
                return $a['id_attachment'] - $b['id_attachment'];
            }
        );

        return $attachedFiles;
    }

    /**
     * @param $attachedFileData
     * @return array
     */
    private function getProductAttachedFileDto($attachedFileData)
    {
        $returnArray = [
            'file_id'     => (int)$attachedFileData['id_attachment'],
            'mime'        => $attachedFileData['mime'],
            'is_assigned' => (bool)$attachedFileData['is_assigned'],
            'languages'   => []
        ];

        foreach ($attachedFileData['id_lang'] as $key => $attachedFileLanguageId) {
            $attachedFileLanguageData = [
                'id_lang'     => $attachedFileLanguageId,
                'name'        => $attachedFileData['name'][$key],
                'description' => $attachedFileData['description'][$key]
            ];
            $returnArray['languages'][] = $this->getProductAttachedFileToLanguageDto($attachedFileLanguageData);
        }

        return $returnArray;
    }

    /**
     * @param $attachedFileLanguageData
     * @return array
     */
    private function getProductAttachedFileToLanguageDto($attachedFileLanguageData)
    {
        return [
            'language_id' => (int)$attachedFileLanguageData['id_lang'],
            'title'       => $attachedFileLanguageData['name'],
            'description' => $attachedFileLanguageData['description']
        ];
    }

    /**
     * @param $productId
     * @param $pageIndex
     * @param $pageSize
     * @throws EM1Exception
     */
    public function getProductEditRelatedProducts($productId, $pageIndex, $pageSize)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        $responseArray = [
            'related_products'       => [],
            'related_products_count' => 0
        ];

        $productObject = new Product($productId, true);
        $relatedProducts = $productObject->getAccessories($this->languageId);
        foreach ($relatedProducts as $relatedProduct) {
            $responseArray['related_products'][] = $this->getRelatedProductDto($relatedProduct);
        }
        $responseArray['related_products'] = array_slice(
            $responseArray['related_products'],
            ($pageIndex - 1) * $pageSize,
            $pageSize
        );
        $responseArray['related_products_count'] = count($relatedProducts);

        self::generateResponse($responseArray);
    }

    private function getRelatedProductDto($relatedProductData)
    {
        if (array_key_exists('product_id', $relatedProductData)) {
            $productObject = new Product($relatedProductData['product_id'], true, $this->languageId);
        } else {
            $productObject = new Product($relatedProductData['id_product'], true, $this->languageId);
        }
        $imageId = $productObject->getImages($this->languageId)[0]['id_image'];
        return [
            'product_id'             => $productObject->id,
            'product_type'           => $this->getProductType($productObject->getType()),
            'name'                   => $productObject->name,
            'reference'              => $productObject->reference,
            'image_url'              => self::getProductImageUrl(
                $productObject->link_rewrite,
                $imageId
            ),
            'quantity'               => $productObject->quantity,
            'formatted_retail_price' => Tools::displayPrice($productObject->price),
            'combinations_count'     => MAProductCombination::getProductCombinationsCount($productObject->id)
        ];
    }

    /**
     * @param $productId
     * @param $relatedProductId
     * @throws EM1Exception
     */
    public function deleteRelatedProduct($productId, $relatedProductId)
    {
        if (!Product::existsInDatabase($productId, 'product')
            && !Product::existsInDatabase($relatedProductId, 'product')
        ) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        $result = Db::getInstance()->delete(
            'accessory',
            'id_product_1 = ' . (int) $productId . ' AND id_product_2 = ' . (int) $relatedProductId
        );
        if (!$result) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR);
        }
        $productObject = new Product($productId, true, $this->languageId);
        self::generateResponse(
            [
                'related_products_count' => count($productObject->getAccessories($this->languageId))
            ]
        );
    }

    /**
     * @param $productId
     * @param $productItemId
     * @param $productAttributeId
     * @throws EM1Exception
     */
    public function deleteProductFromPack(
        $productId,
        $productItemId,
        $productAttributeId
    ) {
        if (!Product::existsInDatabase($productId, 'product')
            || !Product::existsInDatabase($productItemId, 'product')
        ) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            $whereStatement = "
            id_product_pack = $productId
            AND id_product_item = $productItemId
            AND id_product_attribute_item = $productAttributeId
            ";
            Db::getInstance()->delete('pack', $whereStatement);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        $packProductsCount = (int)count(Pack::getItems($productId, $this->languageId));
        self::generateResponse(
            [
                'pack_products_count' => $packProductsCount
            ]
        );
    }

    /**
     * @param $productId
     * @param $languageId
     * @param $shopId
     * @param $pageIndex
     * @param $pageSize
     * @throws EM1Exception
     */
    public function getProductEditData($productId, $languageId, $shopId, $pageIndex, $pageSize)
    {
        $responseArray = [
            'product'              => null,
            'pack_products'        => [],
            'pack_products_count'  => 0,
            'max_file_upload_size' => EM1Settings::getMaxFileUploadInBytes()
        ];
        // Check if productId is set and greater then 0
        if ($productId < 1) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_ID_IS_INCORRECT);
        } elseif (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            $responseArray['product'] = $this->productEditDto($productId, $languageId, $shopId, $pageIndex, $pageSize);
            foreach (self::getProductPackItemIds($productId, $shopId) as $packProductData) {
                $shopId = Product::getShopsByProduct($packProductData['id_product_item'])[0]['id_shop'];
                $packProduct = new Product($packProductData['id_product_item'], true, $languageId, $shopId);
                $responseArray['pack_products'][] = $this->productEditPackProductDto(
                    $packProduct,
                    $languageId,
                    $packProductData['quantity']
                );
            }
            $responseArray['pack_products_count'] = count($responseArray['pack_products']);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND, $exception->getMessage());
        }
        self::generateResponse($responseArray);
    }

    /**
     * workaround cuz default prestashop methods cannot return items according to shopId
     *
     * @param $productId
     * @param $shopId
     * @return array|false|mysqli_result|PDOStatement|resource|null
     * @throws PrestaShopDatabaseException
     */
    public static function getProductPackItemIds($productId, $shopId)
    {
        if ($shopId === -1 || $shopId === null) {
            $shopIds = Shop::getShops(true, null, true);
        } else {
            $shopIds = [$shopId];
        }
        return Db::getInstance()
            ->executeS('
                SELECT id_product_item, id_product_attribute_item, quantity 
                FROM `' . _DB_PREFIX_ . 'pack` where id_product_pack = ' . (int)$productId . '
                AND id_product_item IN (SELECT id_product 
                    FROM product_shop WHERE id_shop IN (' . implode(',', $shopIds) .')
                )
            ');
    }

    private function productEditDto($productId, $languageId, $shopId, $pageIndex, $pageSize)
    {
        $defaultShopId = (int)Configuration::get('PS_SHOP_DEFAULT');
        if ($shopId === null) {
            $productObject = new Product($productId, true, $languageId, $defaultShopId);
            $shopIds = Shop::getShops(true, null, true);
        } else {
            $productObject = new Product($productId, true, $languageId, $shopId);
            $shopIds = [$shopId];
        }

        $allShopsCombinationsCount = MAProductCombination::getProductCombinationsCount($productId);

        $combinations = [];
        $productCombinationIds = self::getQueryResult('
            SELECT 
                DISTINCT(pa.id_product_attribute)
            FROM ' . _DB_PREFIX_ . 'product_attribute pa
            INNER JOIN ' . _DB_PREFIX_ . 'product_attribute_shop pas ON
            (pas.id_product_attribute = pa.id_product_attribute
            AND pas.id_shop IN ('. implode(',', $shopIds) .'))
            WHERE pa.id_product = ' . (int)$productObject->id . '
            LIMIT ' . (($pageIndex - 1) * $pageSize). ', ' . $pageSize);
        foreach ($productCombinationIds as $combination) {
            $combinations[] = MAProductCombination::productEditCombinationDto(
                $combination['id_product_attribute'],
                $productObject,
                $shopIds,
                $languageId
            );
        }

        $shops = [];
        foreach ($shopIds as $currentShopId) {
            $shops[] = self::productEditToShopDto($productObject, $currentShopId);
        }

        $languageValues = [];
        foreach ($shopIds as $shopId) {
            $productObjectLanguageValues = new Product($productId, true, $languageId, $shopId);
            foreach ($productObjectLanguageValues->getFieldsLang() as $productFieldsLanguage) {
                $languageValues[] = self::productEditLanguageValuesDto($productFieldsLanguage);
            }
        }

        $images = [];
        $previousImageId = null;
        foreach ($productObject->getWsImages() as $image) {
            if ($previousImageId !== $image['id']) {
                $images[] = $this->productEditImageDto($productObject, $image, $shopIds);
            }
            $previousImageId = $image['id'];
        }

        return [
            'product_id'                   => (int)$productObject->id,
            'product_type'                 => (string)$this->getProductType($productObject->getType()),
            'reference'                    => (string)$productObject->reference,
            'manufacturer_id'              => (int)$productObject->id_manufacturer,
            'related_products_count'       => (int)count($productObject->getAccessories($languageId)),
            'features_count'               => (int)count($productObject->getFeatures()),
            'all_shops_combinations_count' => (int)$allShopsCombinationsCount,
            'width'                        => (float)$productObject->width,
            'height'                       => (float)$productObject->height,
            'depth'                        => (float)$productObject->depth,
            'weight'                       => (float)$productObject->weight,
            'delivery_time'                => (int)$productObject->additional_delivery_times,
            'combinations'                 => $combinations,
            'shops'                        => $shops,
            'language_values'              => $languageValues,
            'images'                       => $images
        ];
    }

    public static function productEditToShopDto($productObject, $shopId)
    {
        $assignedCarrierIds = [];
        foreach ($productObject->getCarriers() as $carrier) {
            $assignedCarrierIds[] = (int)$carrier['id_carrier'];
        }

        $combinationsCount = MAProductCombination::getProductCombinationsCount($productObject->id, $shopId);

        return [
            'shop_id'                   => (int)$shopId,
            'status'                    => (bool)$productObject->active,
            'quantity'                  => (int)$productObject->quantity,
            'price_without_tax'         => (float)$productObject->getPrice(false),
            'additional_shipping_cost'  => (float)$productObject->additional_shipping_cost,
            'assigned_carrier_ids'      => $assignedCarrierIds,
            'combinations_count'        => $combinationsCount,
            'assigned_categories_count' => (int)count(self::getProductCategoryIds($productObject->id, $shopId))
        ];
    }

    public static function getProductCategoryIds($productId, $shopId = null)
    {
        if ($shopId === null) {
            $shopIds = Shop::getShops(true, null, true);
        } else {
            $shopIds = [$shopId];
        }
        return array_column(self::getQueryResult(pSQL('
            SELECT cp.id_category
            FROM ' . _DB_PREFIX_ . 'category_product cp
            WHERE id_product = ' . (int)$productId . ' AND 
            id_category IN (
                SELECT id_category
                FROM ' . _DB_PREFIX_ . 'category_shop
                WHERE id_shop IN (' . implode(',', $shopIds) . ')
            )
        ')), 'id_category');
    }

    /**
     * @param $productId
     * @param $categoryId
     * @return bool
     */
    public static function unassignProductCategory($productId, $categoryId)
    {
        return Db::getInstance()->execute(pSQL('
            DELETE FROM ' . _DB_PREFIX_ . 'category_product
            WHERE id_category = ' . $categoryId . ' AND
            id_product = ' . $productId . '
        '));
    }

    public static function productEditLanguageValuesDto($productFieldsLanguage)
    {
        return [
            'shop_id'                     => (int)$productFieldsLanguage['id_shop'],
            'language_id'                 => (int)$productFieldsLanguage['id_lang'],
            'product_name'                => (string)$productFieldsLanguage['name'],
            'is_description_filled'       => (bool)$productFieldsLanguage['description'],
            'is_short_description_filled' => (bool)$productFieldsLanguage['description_short'],
            'delivery_in_stock'           => (string)$productFieldsLanguage['delivery_in_stock'],
            'delivery_out_of_stock'       => (string)$productFieldsLanguage['delivery_out_stock'],
            'meta_title'                  => (string)$productFieldsLanguage['meta_title'],
            'meta_description'            => (string)$productFieldsLanguage['meta_description'],
            'link_rewrite'                => (string)$productFieldsLanguage['link_rewrite']
        ];
    }

    public static function productEditImageDto($productObject, $image, $shopIds)
    {
        $imageObject = new Image($image['id']);
        $shops = [];
        foreach ($shopIds as $shopId) {
            $shops[] = self::productEditImageToShopDto($imageObject, $shopId);
        }

        $languageValues = [];
        $languages = Language::getLanguages();
        foreach ($languages as $language) {
            $imageObject = new Image($image['id'], $language['id_lang']);
            $languageImages = $productObject->getImages($language['id_lang']);
            $previousImageId = null;
            foreach ($languageImages as $imageLanguage) {
                if ($imageObject->id == $imageLanguage['id_image']
                    && $previousImageId != $imageLanguage['id_image']
                ) {
                    $languageValues[] = self::productEditImageToLanguageDto($language['id_lang'], $imageObject);
                }
                $previousImageId = $imageLanguage['id_image'];
            }
        }

        return [
            'image_id'        => (int)$imageObject->id,
            'image_url'       => (string)self::getProductImageUrl($productObject->link_rewrite, $imageObject->id),
            'position'        => (int)$imageObject->position,
            'shops'           => $shops,
            'language_values' => $languageValues
        ];
    }

    public static function productEditImageToShopDto($image, $shopId)
    {
        return [
            'shop_id' => (int)$shopId,
            'cover'   => (bool)$image->cover
        ];
    }

    public static function productEditImageToLanguageDto($languageId, $image)
    {
        return [
            'language_id' => (int)$languageId,
            'caption'     => (string)$image->legend
        ];
    }

    public static function productEditPackProductDto($packProduct, $languageId, $packQuantity)
    {
        $combinationObject = new Combination($packProduct->id_pack_product_attribute, $languageId);
        if ($combinationObject->getWsImages() !== []) {
            $imageId = $combinationObject->getWsImages()[0]['id'];
        } elseif ($packProduct->getImages($languageId) !== []) {
            $imageId = $packProduct->getImages($languageId)[0]['id_image'];
        } else {
            $imageId = null;
        }
        if ($imageId !== null) {
            $imageUrl = self::getProductImageUrl(
                $packProduct->link_rewrite,
                $imageId
            );
        } else {
            $imageUrl = '';
        }
        return [
            'product_item_id'           => (int)$packProduct->id,
            'product_attribute_item_id' => (int)$packProduct->id_pack_product_attribute,
            'name'                      => (string)$packProduct->name,
            'reference'                 => (string)$packProduct->reference,
            'image_url'                 => (string)$imageUrl,
            'quantity'                  => (int)$packQuantity
        ];
    }

    /**
     * copy & pasted product duplicate logic from prestashop core
     * in fact get_product_edit_data but for newly duplicated product
     *
     * @param $productId
     * @param $languageId
     * @param $shopId
     * @param $pageIndex
     * @param $pageSize
     * @throws EM1Exception
     */
    public function duplicateProduct($productId, $languageId, $shopId, $pageIndex, $pageSize)
    {
        if ($productId < 1) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_ID_IS_INCORRECT);
        } elseif (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }

        try {
            if (Validate::isLoadedObject($product = new Product($productId))) {
                $id_product_old = $product->id;
                if ($product->isAssociatedToShop($shopId)) {
                    $productObject = new Product($id_product_old, false, null, $shopId);
                    $product->price = $productObject->price;
                }
                unset(
                    $product->id,
                    $product->id_product
                );

                $product->indexed = 0;
                $product->active = 0;
                if ($product->add()
                    && Category::duplicateProductCategories($id_product_old, $product->id)
                    && Product::duplicateSuppliers($id_product_old, $product->id)
                    && ($combination_images = Product::duplicateAttributes($id_product_old, $product->id)) !== false
                    && GroupReduction::duplicateReduction($id_product_old, $product->id)
                    && Product::duplicateAccessories($id_product_old, $product->id)
                    && Product::duplicateFeatures($id_product_old, $product->id)
                    && Product::duplicateSpecificPrices($id_product_old, $product->id)
                    && Pack::duplicate($id_product_old, $product->id)
                    && Product::duplicateCustomizationFields($id_product_old, $product->id)
                    && Product::duplicateTags($id_product_old, $product->id)
                    && Product::duplicateDownload($id_product_old, $product->id)) {
                    if ($product->hasAttributes()) {
                        Product::updateDefaultAttribute($product->id);
                    }

                    if (!Tools::getValue('noimage') && !Image::duplicateProductImages(
                        $id_product_old,
                        $product->id,
                        $combination_images
                    )) {
                        throw new EM1Exception(
                            EM1Exception::ERROR_CODE_UNKNOWN,
                            'An error occurred while copying the image.'
                        );
                    } else {
                        Hook::exec(
                            'actionProductAdd',
                            [
                                'id_product_old' => $id_product_old,
                                'id_product'     => (int)$product->id,
                                'product'        => $product
                            ]
                        );
                        if (in_array($product->visibility, ['both', 'search'])
                            && Configuration::get('PS_SEARCH_INDEXATION')) {
                            Search::indexation(false, $product->id);
                        }
                    }
                } else {
                    throw new EM1Exception(
                        EM1Exception::ERROR_CODE_UNKNOWN,
                        'An error occurred while creating an object.'
                    );
                }
            }
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }

        if ($shopId === null || $shopId === -1) {
            $shopId = Configuration::get('PS_SHOP_DEFAULT');
        }

        $this->getProductEditData($product->id, $languageId, $shopId, $pageIndex, $pageSize);
    }

    /**
     * @throws EM1Exception
     */
    public function getNewProductData()
    {
        $productAdapter = new ProductDataProvider();
        $product = $productAdapter->getProductInstance();
        $product->id_category_default = Context::getContext()->shop->id_category;

        $product->active = 0;
        $product->state = Product::STATE_TEMP;

        //set name and link_rewrite in each lang
        $languages = Language::getLanguages();
        foreach ($languages as $lang) {
            $product->name[$lang['id_lang']] = '';
            $product->link_rewrite[$lang['id_lang']] = '';
        }

        try {
            $product->save();
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        $product->addToCategories([Context::getContext()->shop->id_category]);
        self::generateResponse(
            [
                'product_id'           => (int)$product->id,
                'max_file_upload_size' => (int)EM1Settings::getMaxFileUploadInBytes()
            ]
        );
    }

    /**
     * @param $productId
     * @param $languageId
     * @throws EM1Exception
     */
    // TODO: Write annotation for getProductEditData() method.
    public function getProductEditData1($productId, $languageId)
    {
        // Check if productId is set and greater then 0
        if ($productId < 1) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_ID_IS_INCORRECT);
        }

        try {
            $productShopsResult     = array();
            $productImagesResult    = array();
            $productLanguagesResult = array();

            // Create Product object and validate after initialisation
            /** @var ProductCore $product */
            $product = new Product($productId, true, $languageId);
            if (!Validate::isLoadedObject($product)) {
                throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND);
            }

            $taxRules = TaxRulesGroup::getTaxRulesGroupsForOptions();
            $stocks = $this->getProductStock($productId);
            $combinationsCounts = $this->getProductCombinationsCountByShops($productId);

            // Product shop assigning
            $productAssociatedShops = $product->getAssociatedShops();
            foreach ($productAssociatedShops as $shopId) {
                $productFields = new Product($product->id, true, null, $shopId);

                $quantity = 0;
                foreach ($stocks as $stock) {
                    if ((int)$stock['id_shop'] === (int)$shopId) {
                        $quantity = (int)$stock['quantity'];
                        break;
                    }
                }

                foreach ($taxRules as $taxRule) {
                    if ((int)$productFields->id_tax_rules_group === (int)$taxRule['id_tax_rules_group']) {
                        $taxRuleId      = (int)$taxRule['id_tax_rules_group'];
                        break;
                    }
                }

                $combinationsCount = 0;
                foreach ($combinationsCounts as $combinationsCountData) {
                    if ((int)$combinationsCountData['id_shop'] === (int)$shopId) {
                        $combinationsCount = (int)$combinationsCountData['combinations_count'];
                        break;
                    }
                }

                if (version_compare(_PS_VERSION_, '1.6', '>=')) {
                    $productPrice = $productFields->getPriceWithoutReduct(true);
                } else {
                    // base_price is deprecated from @deprecated 1.6.0.13
                    $productPrice = round(
                        (float)(property_exists($productFields, 'base_price') ? $productFields->base_price : 0),
                        6
                    );
                }

                if (empty($productPrice)) {
                    $productPrice = round(
                        (float)(property_exists($productFields, 'base_price') ? $productFields->base_price : 0),
                        6
                    );
                }

                $productShopsResult[] = array(
                    'shop_id'                                       => (int)$shopId,
                    'status'                                        => (bool)$productFields->active,
                    'quantity'                                      => (int)$quantity,
                    'price_without_tax'                             => (float)$productPrice,
                    'additional_shipping_cost'                      => (int)$productFields->additional_shipping_cost,
                    //ENUM('both', 'catalog', 'search', 'none')
                    'visibility'                                    => (string)$productFields->visibility,
                    'out_of_stock'                                  => (int)$productFields->out_of_stock,
                    'available_for_order'                           => (bool)$productFields->available_for_order,
                    'available_date'                                => (string)$productFields->available_date,
                    'minimal_quantity'                              => (int)$productFields->minimal_quantity,
                    'location'                                      => (string)$productFields->location,
                    'low_stock_level'                               => (int)$productFields->low_stock_threshold,
                    'low_stock_alert'                               => (bool)$productFields->low_stock_alert,
                    'retail_price_without_tax'                      => (float)$productPrice,
                    'cost_price_without_tax'                        => (float)$productFields->wholesale_price,
                    'formatted_retail_price_without_tax'            => Tools::displayPrice((float)$productPrice),
                    'formatted_cost_price_without_tax'              => Tools::displayPrice(
                        (float)$productFields->wholesale_price
                    ),
                    'tax_rule_id'                                   => (int)$taxRuleId,
                    'on_sale'                                       => (bool)$productFields->on_sale,
                    'show_price'                                    => (bool)$productFields->show_price,
                    'online_only'                                   => (bool)$productFields->online_only,
                    'unit_price_ratio'                              => (float)$productFields->unit_price_ratio,
                    'unity'                                         => (string)$productFields->unity,
                    //ENUM('new', 'used', 'refurbished')
                    'condition'                                     => (string)$productFields->condition,
                    'show_condition'                                => (bool)$productFields->show_condition,
                    'combinations_count'                            => (int)$combinationsCount,
                    'specific_prices_count'                         => (int)0,
                    'features_count'                                => (int)0,
                );

                // Get all shops language values
                $productLanguageFields = $productFields->getFieldsLang();
                foreach ($productLanguageFields as $langValue) {
                    $productLanguagesResult[] = array(
                        self::KEY_LANGUAGE_ID           => (int)$langValue['id_lang'],
                        self::KEY_PRODUCT_NAME          => Tools::stripslashes($langValue['name']),
                        self::KEY_SHORT_DESCRIPTION     => Tools::stripslashes($langValue['description_short']),
                        self::KEY_DESCRIPTION           => Tools::stripslashes($langValue['description']),
                        self::KEY_LINK_REWRITE          => Tools::stripslashes($langValue['link_rewrite']),
                        'meta_title'                    => Tools::stripslashes($langValue['meta_title']),
                        'meta_description'              => Tools::stripslashes($langValue['meta_description']),
                        'label_when_in_stock'           => Tools::stripslashes($langValue['label_when_in_stock']),
                        'label_when_out_of_stock'       => Tools::stripslashes($langValue['label_when_out_of_stock']),
                        'delivery_in_stock'             => Tools::stripslashes($langValue['delivery_in_stock']),
                        'delivery_out_of_stock'         => Tools::stripslashes($langValue['delivery_out_of_stock']),
                        self::KEY_SHOP_ID               => (int)$langValue['id_shop'],
                    );
                }
            }

            // Check images response data
            $shopImageCovers = $this->getShopImageCovers($productId);
            $images = Image::getImages($this->languageId, $product->id);
            foreach ($images as $image) {
                $shopImages = array();

                for ($j = 0, $productAssociatedShopsCount = count($productAssociatedShops);
                    $j < $productAssociatedShopsCount;
                    $j++) {
                    // Check image cover assigning to shops
                    $imageAdded = false;
                    foreach ($shopImageCovers as $shopImageCoverValue) {
                        if ((int)$productAssociatedShops[$j] === (int)$shopImageCoverValue['id_shop'] &&
                            (int)$image['id_image'] === (int)$shopImageCoverValue['id_image']
                        ) {
                            $shopImages[] = array(
                                self::KEY_SHOP_ID   => (int)$shopImageCoverValue['id_shop'],
                                self::KEY_COVER     => (bool)$shopImageCoverValue['cover']
                            );
                            $imageAdded = true;
                            continue;
                        }
                    }

                    if ($imageAdded) {
                        continue;
                    }

                    $shopImages[] = array(
                        self::KEY_SHOP_ID   => (int)$productShopsResult[$j]['shop_id'],
                        self::KEY_COVER     => false
                    );
                }

                $productImagesResult[] = array(
                    self::KEY_IMAGE_ID  => (int)$image['id_image'],
                    self::KEY_POSITION  => (int)$image['position'],
                    self::KEY_IMAGE_URL => (string)$this->getProductImageUrl(
                        $product->link_rewrite[$this->languageId],
                        (int)$image['id_image']
                    ),
                    self::KEY_SHOPS     => $shopImages
                );
            }

            $productCarriers = array();
            $productCarrier = $product->getCarriers();
            foreach ($productCarrier as $carrier) {
                $productCarriers[] = array('carrier_id' => $carrier['id_carrier']);
            }

            $tags = array();
            $tagIds = $product->getWsTags();
            foreach ($tagIds as $id) {
                $tag = new Tag($id);
                $tags[] = array(
                    'language_id'   => $tag->id_lang,
                    'tag_id'        => $tag->id,
                    'name'          => $tag->name,
                );
            }

            $productResult = array(
                self::KEY_PRODUCT_ID                            => (int)$product->id,
                self::KEY_REFERENCE                             => (string)$product->reference,
                'width'                                         => (float)$product->width,
                'height'                                        => (float)$product->height,
                'depth'                                         => (float)$product->depth,
                'weight'                                        => (float)$product->weight,
                'delivery_time'                                 => (int)$product->additional_delivery_times,
                'priority'                                      => array(),
                self::KEY_EAN13                                 => (string)$product->ean13,
                self::KEY_UPC                                   => (string)$product->upc,
                self::KEY_ISBN                                  => (string)(
                    property_exists($product, self::KEY_ISBN) ? $product->isbn : null
                ),
                self::KEY_PRODUCT_TYPE                          => (string)$this->getProductType(
                    (int)$product->getType()
                ),
                'manufacturer_id'                               => (int)$product->id_manufacturer,
                'pack_products_count'                           => (int)0,
                'related_products_count'                        => (int)0,
                'associated_products_count'                     => (int)0,
                self::KEY_TOTAL_ORDERED                         => $this->getOrderedProductQuantity($productId),
                self::KEY_SHOPS                                 => $productShopsResult,
                self::KEY_LANGUAGE_VALUES                       => $productLanguagesResult,
                self::KEY_IMAGES                                => $productImagesResult,
                'carriers'                                      => $productCarriers,
                'tags'                                          => $tags,
            );
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND, $exception->getMessage());
        }

        self::generateResponse($this->productResponse($productResult));
    }

    // TODO: Write annotation for getProducts() method
    public function getProductCreateData($languageId)
    {
        try {
            $productShopsResult     = array();
            $productImagesResult    = array();
            $productLanguagesResult = array();

            // Create Product object and validate after initialisation
            /** @var ProductCore $product */
            $product = new Product(null, true, $languageId);
            if (!Validate::isLoadedObject($product)) {
                throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND);
            }

            $taxRules = TaxRulesGroup::getTaxRulesGroupsForOptions();
            $stocks = $this->getProductStock($product->id);
            $combinationsCounts = $this->getProductCombinationsCountByShops($product->id);

            // Product shop assigning
            $productAssociatedShops = $product->getAssociatedShops();
            foreach ($productAssociatedShops as $shopId) {
                $productFields = new Product($product->id, true, null, $shopId);

                $quantity = 0;
                foreach ($stocks as $stock) {
                    if ((int)$stock['id_shop'] === (int)$shopId) {
                        $quantity = (int)$stock['quantity'];
                        break;
                    }
                }

                foreach ($taxRules as $taxRule) {
                    if ((int)$productFields->id_tax_rules_group === (int)$taxRule['id_tax_rules_group']) {
                        $taxRuleId      = (int)$taxRule['id_tax_rules_group'];
                        break;
                    }
                }

                $combinationsCount = 0;
                foreach ($combinationsCounts as $combinationsCountData) {
                    if ((int)$combinationsCountData['id_shop'] === (int)$shopId) {
                        $combinationsCount = (int)$combinationsCountData['combinations_count'];
                        break;
                    }
                }

                if (version_compare(_PS_VERSION_, '1.6', '>=')) {
                    $productPrice = $productFields->getPriceWithoutReduct(true);
                } else {
                    // base_price is deprecated from @deprecated 1.6.0.13
                    $productPrice = round(
                        (float)(property_exists($productFields, 'base_price') ? $productFields->base_price : 0),
                        6
                    );
                }

                if (empty($productPrice)) {
                    $productPrice = round(
                        (float)(property_exists($productFields, 'base_price') ? $productFields->base_price : 0),
                        6
                    );
                }

                $productShopsResult[] = array(
                    'shop_id'                                       => (int)$shopId,
                    'status'                                        => (bool)$productFields->active,
                    //ENUM('both', 'catalog', 'search', 'none')
                    'visibility'                                    => (string)$productFields->visibility,
                    'out_of_stock'                                  => (int)$productFields->out_of_stock,
                    'available_for_order'                           => (bool)$productFields->available_for_order,
                    'available_date'                                => (string)$productFields->available_date,
                    'quantity'                                      => (int)$quantity,
                    'minimal_quantity'                              => (int)$productFields->minimal_quantity,
                    'location'                                      => (string)$productFields->location,
                    'low_stock_level'                               => (int)$productFields->low_stock_threshold,
                    'low_stock_alert'                               => (bool)$productFields->low_stock_alert,
                    'additional_shipping_cost'                      => (int)$productFields->additional_shipping_cost,
                    'retail_price_without_tax'                      => (float)$productPrice,
                    'cost_price_without_tax'                        => (float)$productFields->wholesale_price,
                    'formatted_retail_price_without_tax'            => Tools::displayPrice((float)$productPrice),
                    'formatted_cost_price_without_tax'              => Tools::displayPrice(
                        (float)$productFields->wholesale_price
                    ),
                    'tax_rule_id'                                   => (int)$taxRuleId,
                    'on_sale'                                       => (bool)$productFields->on_sale,
                    'show_price'                                    => (bool)$productFields->show_price,
                    'online_only'                                   => (bool)$productFields->online_only,
                    'unit_price_ratio'                              => (float)$productFields->unit_price_ratio,
                    'unity'                                         => (string)$productFields->unity,
                    //ENUM('new', 'used', 'refurbished')
                    'condition'                                     => (string)$productFields->condition,
                    'show_condition'                                => (bool)$productFields->show_condition,
                    'combinations_count'                            => (int)$combinationsCount,
                    'specific_prices_count'                         => (int)0,
                    'features_count'                                => (int)0,
                );

                // Get all shops language values
                $productLanguageFields = $productFields->getFieldsLang();
                foreach ($productLanguageFields as $langValue) {
                    $productLanguagesResult[] = array(
                        self::KEY_LANGUAGE_ID           => (int)$langValue['id_lang'],
                        self::KEY_PRODUCT_NAME          => Tools::stripslashes($langValue['name']),
                        self::KEY_SHORT_DESCRIPTION     => Tools::stripslashes($langValue['description_short']),
                        self::KEY_DESCRIPTION           => Tools::stripslashes($langValue['description']),
                        self::KEY_LINK_REWRITE          => Tools::stripslashes($langValue['link_rewrite']),
                        'meta_title'                    => Tools::stripslashes($langValue['meta_title']),
                        'meta_description'              => Tools::stripslashes($langValue['meta_description']),
                        'label_when_in_stock'           => Tools::stripslashes($langValue['label_when_in_stock']),
                        'label_when_out_of_stock'       => Tools::stripslashes($langValue['label_when_out_of_stock']),
                        'delivery_in_stock'             => Tools::stripslashes($langValue['delivery_in_stock']),
                        'delivery_out_of_stock'         => Tools::stripslashes($langValue['delivery_out_of_stock']),
                        self::KEY_SHOP_ID               => (int)$langValue['id_shop'],
                    );
                }
            }

            // Check images response data
            $shopImageCovers = $this->getShopImageCovers($product->id);
            $images = Image::getImages($this->languageId, $product->id);
            foreach ($images as $image) {
                $shopImages = array();

                for ($j = 0, $productAssociatedShopsCount = count($productAssociatedShops);
                    $j < $productAssociatedShopsCount;
                    $j++) {
                    // Check image cover assigning to shops
                    $imageAdded = false;
                    foreach ($shopImageCovers as $shopImageCoverValue) {
                        if ((int)$productAssociatedShops[$j] === (int)$shopImageCoverValue['id_shop'] &&
                            (int)$image['id_image'] === (int)$shopImageCoverValue['id_image']
                        ) {
                            $shopImages[] = array(
                                self::KEY_SHOP_ID   => (int)$shopImageCoverValue['id_shop'],
                                self::KEY_COVER     => (bool)$shopImageCoverValue['cover']
                            );
                            $imageAdded = true;
                            continue;
                        }
                    }

                    if ($imageAdded) {
                        continue;
                    }

                    $shopImages[] = array(
                        self::KEY_SHOP_ID   => (int)$productShopsResult[$j]['shop_id'],
                        self::KEY_COVER     => false
                    );
                }

                $productImagesResult[] = array(
                    self::KEY_IMAGE_ID  => (int)$image['id_image'],
                    self::KEY_POSITION  => (int)$image['position'],
                    self::KEY_IMAGE_URL => (string)$this->getProductImageUrl(
                        $product->link_rewrite[$this->languageId],
                        (int)$image['id_image']
                    ),
                    self::KEY_SHOPS     => $shopImages
                );
            }

            $productCarriers = array();
            $productCarrier = $product->getCarriers();
            foreach ($productCarrier as $carrier) {
                $productCarriers[] = array('carrier_id' => $carrier['id_carrier']);
            }

            $tags = array();
            $tagIds = $product->getWsTags();
            foreach ($tagIds as $id) {
                $tag = new Tag($id);
                $tags[] = array(
                    'language_id'   => $tag->id_lang,
                    'tag_id'        => $tag->id,
                    'name'          => $tag->name,
                );
            }

            $productResult = array(
                self::KEY_PRODUCT_ID                            => (int)$product->id,
                self::KEY_REFERENCE                             => (string)$product->reference,
                'width'                                         => (float)$product->width,
                'height'                                        => (float)$product->height,
                'depth'                                         => (float)$product->depth,
                'weight'                                        => (float)$product->weight,
                'delivery_time'                                 => (int)$product->additional_delivery_times,
                'priority'                                      => array(),
                self::KEY_EAN13                                 => (string)$product->ean13,
                self::KEY_UPC                                   => (string)$product->upc,
                self::KEY_ISBN                                  => (string)(
                property_exists($product, self::KEY_ISBN) ? $product->isbn : null
                ),
                self::KEY_PRODUCT_TYPE                          => (string)$this->getProductType(
                    (int)$product->getType()
                ),
                'manufacturer_id'                               => (int)$product->id_manufacturer,
                'pack_products_count'                           => (int)0,
                'related_products_count'                        => (int)0,
                'associated_products_count'                     => (int)0,
                self::KEY_TOTAL_ORDERED                         => $this->getOrderedProductQuantity($product->id),
                self::KEY_SHOPS                                 => $productShopsResult,
                self::KEY_LANGUAGE_VALUES                       => $productLanguagesResult,
                self::KEY_IMAGES                                => $productImagesResult,
                'carriers'                                      => $productCarriers,
                'tags'                                          => $tags,
            );
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND, $exception->getMessage());
        }

        self::generateResponse($this->productResponse($productResult));
    }


    // TODO: Write annotation for getProducts() method.
    public function getProductSpecificPriceData()
    {
        if (version_compare(_PS_VERSION_, 1.7, '>=')) {
            return [
                $this->translator->trans('Shop', [], 'Admin.Global') => 'id_shop',
                $this->translator->trans('Currency', [], 'Admin.Global') => 'id_currency',
                $this->translator->trans('Country', [], 'Admin.Global') => 'id_country',
                $this->translator->trans('Group', [], 'Admin.Global') => 'id_group',
            ];
        }
        $module = new Bridgeconnector();
        return [
            $module->l('Shop', [], 'Admin.Global') => 'id_shop',
            $module->l('Currency', [], 'Admin.Global') => 'id_currency',
            $module->l('Country', [], 'Admin.Global') => 'id_country',
            $module->l('Group', [], 'Admin.Global') => 'id_group',
        ];
    }

    /**
     * @param $data
     * @return mixed|void
     * @throws EM1Exception
     */
    public function saveProduct($data)
    {
        if (version_compare(_PS_VERSION_, 1.7, '<')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_ADD_PRODUCT_FROM_1_7);
        }

        if ($data['product_id'] < 1) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_ID_IS_INCORRECT);
        } elseif (!Product::existsInDatabase($data['product_id'], 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        } elseif (!in_array($data['product_type'], self::VALUE_PRODUCT_TYPE)
            && $data['product_type'] !== null
        ) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_TYPE_IS_INCORRECT);
        }
        try {
            $product = new Product($data['product_id'], true);
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }

        $productData = $this->getPreparedProductData($product, $data);
        $productType = $productData['product_type'] == 'standard' ? 'simple' : $productData['product_type'];

        $product->setWsType($productType);
        if (version_compare(_PS_VERSION_, '1.7', '>=')) {
            $product->state = Product::STATE_SAVED;
        }
        $product->reference = $productData['reference'];
        $product->width = $productData['width'];
        $product->height = $productData['height'];
        $product->depth = $productData['depth'];
        $product->weight = $productData['weight'];
        $product->additional_delivery_times = $productData['delivery_time'];
        $product->id_manufacturer = $productData['manufacturer_id'];
        $product->name = $productData['product_name'];
        $product->link_rewrite = $productData['link_rewrite'];
        $product->meta_title = $productData['meta_title'];
        $product->meta_description = $productData['meta_description'];
        $product->delivery_in_stock = $productData['delivery_in_stock'];
        $product->delivery_out_stock = $productData['delivery_out_of_stock'];
        try {
            $product->save();
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }

        if ($data['shops'] !== null) {
            foreach ($data['shops'] as $shop) {
                try {
                    if ($shop['shop_id'] === -1) {
                        $product = new Product($data['product_id'], true);
                        if ($shop['quantity'] !== null) {
                            StockAvailable::setQuantity(
                                $product->id,
                                null,
                                $shop['quantity']
                            );
                        }
                    } else {
                        $product = new Product($data['product_id'], true, null, $shop['shop_id']);
                        if ($shop['quantity'] !== null) {
                            StockAvailable::setQuantity(
                                $product->id,
                                null,
                                $shop['quantity'],
                                $shop['shop_id']
                            );
                        }
                    }
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
                if ($shop['status'] !== null) {
                    $product->active = $shop['status'];
                }
                if ($shop['price_without_tax'] !== null) {
                    $product->price = $shop['price_without_tax'];
                }
                if ($shop['additional_shipping_cost'] !== null) {
                    $product->additional_shipping_cost = $shop['additional_shipping_cost'];
                }
                if ($shop['carrier_ids'] !== null) {
                    $product->setCarriers($shop['carrier_ids']);
                }
                try {
                    $product->save();
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
            }
        }

        if ($data['changed_images'] != null) {
            foreach ($data['changed_images'] as $changedImage) {
                foreach ($changedImage['shops'] as $shop) {
                    if ($shop['shop_id'] !== -1) {
                        try {
                            Shop::setContext(Shop::CONTEXT_SHOP, $shop['shop_id']);
                        } catch (Exception $e) {
                            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                        }
                        $image = new Image($changedImage['image_id']);
                        $image->cover = $shop['cover'];
                        if ($shop['cover'] === true) {
                            Image::deleteCover($product->id);
                        }
                        try {
                            $image->save();
                        } catch (Exception $e) {
                            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                        }
                        unset($image);
                    } else {
                        foreach (Shop::getShops() as $shopData) {
                            try {
                                Shop::setContext(Shop::CONTEXT_SHOP, $shopData['id_shop']);
                            } catch (Exception $e) {
                                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                            }
                            $image = new Image($changedImage['image_id']);
                            $image->cover = $shop['cover'];
                            if ($shop['cover'] === true) {
                                Image::deleteCover($product->id);
                            }
                            try {
                                $image->save();
                            } catch (Exception $e) {
                                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                            }
                        }
                    }
                    unset($image);
                }
                if ($changedImage['languages'] !== null) {
                    foreach ($changedImage['languages'] as $language) {
                        $image = new Image($changedImage['image_id'], $language['language_id']);
                        $image->legend = $language['caption'];
                        try {
                            $image->save();
                        } catch (Exception $e) {
                            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                        }
                        unset($image);
                    }
                }
            }
        }

        if ($data['deleted_images_ids'] !== null) {
            foreach ($data['deleted_images_ids'] as $imageId) {
                $image = new Image($imageId);
                $image->delete();
                unset($image);
            }
        }

        self::generateResponse();
    }

    private function getPreparedProductData($productObject, $productData)
    {
        $data = [
            'product_id'               => (int)$productObject->id,
            'product_type'             => (string)$this->getProductType($productObject->getType()),
            'reference'                => (string)$productObject->reference,
            'width'                    => (float)$productObject->width,
            'height'                   => (float)$productObject->height,
            'depth'                    => (float)$productObject->depth,
            'weight'                   => (float)$productObject->weight,
            'delivery_time'            => (int)$productObject->additional_delivery_times,
            'manufacturer_id'          => (int)$productObject->id_manufacturer,
            'product_name'             => $productObject->name,
            'link_rewrite'             => $productObject->link_rewrite,
            'meta_title'               => $productObject->meta_title,
            'meta_description'         => $productObject->meta_description,
            'delivery_in_stock'        => $productObject->delivery_in_stock,
            'delivery_out_of_stock'    => $productObject->delivery_out_stock,
        ];
        foreach ($productData as $key => $value) {
            if ($key === 'product_type' && $productData[$key] === 'pack' && $productObject->hasCombinations()) {
                foreach ($productObject->getWsCombinations() as $id) {
                    $productObject->deleteAttributeCombination($id['id']);
                }
            }
            if ($value !== null && !is_array($value)) {
                $data[$key] = $productData[$key];
            }
        }
        if ($productData['languages'] !== null) {
            foreach ($productData['languages'] as $language) {
                foreach ($language as $key => $value) {
                    if ($value !== null && !is_int($value)) {
                        $data[$key][$language['language_id']] = $value;
                    }
                }
            }
        }
        return $data;
    }

    /**
     * @param $shopId
     * @param $productId
     * @throws EM1Exception
     */
    public function getProductQuantitySettings($shopId, $productId)
    {
        $responseArray = [
            'download_id'      => null,
            'filename'         => null,
            'display_filename' => null,
            'file_size'        => null,
            'mime'             => null,
            'expiration_date'  => null,
            'downloads_number' => null,
            'days_number'      => null,
            'shops'            => [],
            'languages'        => []
        ];
        try {
            $productObject = new Product($productId, true, null, $shopId);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        if ($productObject->is_virtual && ProductDownload::isFeatureActive()) {
            $responseArray = $this->fillDownloadFileInfo($responseArray, $productObject->id);
        }
        $availableDate = null;
        if ($productObject->available_date !== '0000-00-00') {
            $availableDate = (int)self::convertTimestampToMillisecondsTimestamp(
                strtotime($productObject->available_date)
            );
        }
        $shop = [
            'shop_id'                 => (int)$shopId,
            'quantity'                => (int)$productObject->quantity,
            'min_quantity_for_sale'   => (int)$productObject->minimal_quantity,
            'stock_location'          => (string)$productObject->location,
            'low_stock_level'         => $productObject->low_stock_threshold ?
                (int)$productObject->low_stock_threshold : null,
            'low_stock_alert'         => (bool)$productObject->low_stock_alert,
            'out_of_stock'            => (int)$productObject->out_of_stock,
            'available_date'          => $availableDate,
            'default_pack_stock_type' => (int)Configuration::get('PS_PACK_STOCK_TYPE'),
            'pack_stock_type'         => (int)$productObject->pack_stock_type
        ];
        $responseArray['shops'][] = $shop;
        $languageIds = Language::getLanguages(true, $shopId, true);
        foreach ($languageIds as $languageId) {
            $language = [
                'shop_id'            => (int)$shopId,
                'language_id'        => (int)$languageId,
                'label_in_stock'     => (string)$productObject->available_now[$languageId],
                'label_out_of_stock' => (string)$productObject->available_later[$languageId]
            ];
            $responseArray['languages'][] = $language;
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $responseArray
     * @param $productId
     * @return mixed
     */
    private function fillDownloadFileInfo($responseArray, $productId)
    {
        $productDownloadObject = new ProductDownload(ProductDownload::getIdFromIdProduct($productId));

        if ($productDownloadObject->id === null) {
            return $responseArray;
        }

        $responseArray['download_id'] = (int)$productDownloadObject->id;
        $responseArray['filename'] = $fileName = $productDownloadObject->filename;
        $responseArray['display_filename'] = $productDownloadObject->display_filename;
        $responseArray['file_size'] = (int)filesize(_PS_DOWNLOAD_DIR_ . $fileName);
        $responseArray['mime'] = mime_content_type(_PS_DOWNLOAD_DIR_ . $fileName);
        $responseArray['expiration_date'] =
            (int)self::convertTimestampToMillisecondsTimestamp($productDownloadObject->date_expiration);
        $responseArray['downloads_number'] = (int)$productDownloadObject->nb_downloadable;
        $responseArray['days_number'] = (int)$productDownloadObject->nb_days_accessible;

        return $responseArray;
    }

    /**
     * @param $shopId
     * @param $productId
     * @param $quantitySettings
     * @throws EM1Exception
     */
    public function saveProductQuantitySettings(
        $shopId,
        $productId,
        $quantitySettings
    ) {
        if ($productId < 1) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_ID_IS_INCORRECT);
        } elseif (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }

        try {
            $productObject = new Product($productId, true, null, $shopId);
            if ($productObject->is_virtual && ProductDownload::isFeatureActive()) {
                if ($quantitySettings['has_associated_file'] === false) {
                    $this->deleteProductDownloadableFile(
                        ProductDownload::getIdFromIdProduct($productObject->id)
                    );
                } else {
                    $fileData = $this->uploadProductDownloadableFile(
                        $productId,
                        $quantitySettings['display_name'],
                        $quantitySettings['days_number'],
                        $quantitySettings['downloads_number'],
                        $quantitySettings['expiration_date']
                    );
                }
            }
            unset($productObject);
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }

        if ($quantitySettings['shops'] !== null) {
            foreach ($quantitySettings['shops'] as $shopKey => $shop) {
                try {
                    if ($shop['shop_id'] === -1) {
                        $shopId = null;
                    } else {
                        $shopId = $shop['shop_id'];
                    }
                    $productObject = new Product($productId, true, null, $shopId);
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
                $productShopData = [
                    'quantity'                => (int)$productObject->quantity,
                    'min_quantity_for_sale'   => (int)$productObject->minimal_quantity,
                    'stock_location'          => $productObject->location,
                    'low_stock_level'         => $productObject->low_stock_threshold,
                    'low_stock_alert'         => (bool)$productObject->low_stock_alert,
                    'out_of_stock'            => (int)$productObject->out_of_stock,
                    'available_date'          => $productObject->available_date,
                    'pack_stock_type'         => (int)$productObject->pack_stock_type
                ];
                unset($productObject);
                foreach ($shop as $key => $value) {
                    if ($key === 'available_date' && $value !== null) {
                        $shop[$key] = date('Y-m-d', self::convertMillisecondsTimestampToTimestamp($value));
                    } elseif ($value === null) {
                        $shop[$key] = $productShopData[$key];
                    }
                }
                $quantitySettings['shops'][$shopKey] = $shop;
            }
            foreach ($quantitySettings['shops'] as $shop) {
                $shopIds = [$shop['shop_id']];
                if ($shop['shop_id'] === -1) {
                    $shopIds = Shop::getShops(true, null, true);
                }
                foreach ($shopIds as $shopId) {
                    try {
                        $productObject = new Product($productId, true, null, $shopId);
                        StockAvailable::setQuantity($productId, null, $shop['quantity'], $shopId);
                        $productObject->minimal_quantity = $shop['min_quantity_for_sale'];
//                        StockAvailable::setLocation($productId, $shop['stock_location'], $shopId);
                        $productObject->low_stock_threshold = $shop['low_stock_level'];
                        $productObject->low_stock_alert = $shop['low_stock_alert'];
                        StockAvailable::setProductOutOfStock($productId, $shop['out_of_stock'], $shopId);
                        if ($shop['available_date'] !== '0000-00-00') {
                            $productObject->available_date = $shop['available_date'];
                        }
                        $productObject->pack_stock_type = $shop['pack_stock_type'];
                        $productObject->save();
                    } catch (Exception $e) {
                        throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                    }
                    unset($productObject);
                }
            }
        }
        if ($quantitySettings['languages'] !== null) {
            foreach ($quantitySettings['languages'] as $languageKey => $language) {
                try {
                    $productObject = new Product($productId, true, null, $language['shop_id']);
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
                $languageShopData = [
                    'language_id'        => (int)$language['language_id'],
                    'label_in_stock'     => (string)$productObject->available_now[$language['language_id']],
                    'label_out_of_stock' => (string)$productObject->available_later[$language['language_id']]
                ];
                foreach ($language as $key => $value) {
                    if ($value === null) {
                        $language[$key] = $languageShopData[$key];
                    }
                }
                $quantitySettings['languages'][$languageKey] = $language;
            }
            foreach ($quantitySettings['languages'] as $language) {
                $shopIds = [$language['shop_id']];
                if ($language['shop_id'] === -1) {
                    $shopIds = Shop::getShops(true, null, true);
                }
                foreach ($shopIds as $shopId) {
                    try {
                        $productObject = new Product($productId, true, null, $shopId);
                        $productObject->available_now[$language['language_id']] = $language['label_in_stock'];
                        $productObject->available_later[$language['language_id']] = $language['label_out_of_stock'];
                        $productObject->save();
                    } catch (Exception $e) {
                        throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                    }
                    unset($productObject);
                }
            }
        }
        self::generateResponse(isset($fileData) ? $fileData : []);
    }

    /**
     * @param $productDownloadId
     * @throws PrestaShopException
     */
    private function deleteProductDownloadableFile($productDownloadId)
    {
        if ($productDownloadId) {
            $productDownloadObject = new ProductDownload($productDownloadId);
            $productDownloadObject->delete();
        }
    }

    /**
     * @param $productId
     * @param $displayName
     * @param $daysNumber
     * @param $downloadsNumber
     * @param $expirationDate
     * @return array
     * @throws EM1Exception
     * @throws PrestaShopException
     */
    private function uploadProductDownloadableFile(
        $productId,
        $displayName,
        $daysNumber,
        $downloadsNumber,
        $expirationDate
    ) {
        if (!empty($_FILES)) {
            $fileName = sha1($_FILES['file']['name']);
            move_uploaded_file($_FILES['file']['tmp_name'], _PS_DOWNLOAD_DIR_ . $fileName);
        }

        $fileDataArray = [
            'display_filename'   => $displayName,
            'nb_days_accessible' => $daysNumber,
            'nb_downloadable'    => $downloadsNumber,
            'date_expiration'    => $expirationDate
        ];

        if (count(array_filter($fileDataArray, 'notEmpty')) > 0) {
            if ($productDownloadId = ProductDownload::getIdFromIdProduct($productId)) {
                $productDownloadObject = new ProductDownload($productDownloadId);
            } else {
                if (!isset($fileName)) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, '$_FILES is empty');
                }
                $productDownloadObject = new ProductDownload();
                $productDownloadObject->id_product = $productId;
                $productDownloadObject->filename = $fileName;
            }
            foreach ($fileDataArray as $field => $value) {
                if ($field === 'date_expiration') {
                    $productDownloadObject->$field =
                        date('Y-m-d', self::convertMillisecondsTimestampToTimestamp($value));
                } elseif ($value !== null) {
                    $productDownloadObject->$field = $value;
                }
            }
            $productDownloadObject->save();
        } else {
            $productDownloadId = ProductDownload::getIdFromIdProduct($productId);
            $productDownloadObject = new ProductDownload($productDownloadId);
        }

        return [
            'download_id' => (int)$productDownloadObject->id,
            'filename'    => $productDownloadObject->filename,
            'mime'        => mime_content_type(_PS_DOWNLOAD_DIR_ . $productDownloadObject->filename)
        ];
    }

    public function getProductPricingSettings($shopId, $productId)
    {
        $responseArray = [
            'shops' => []
        ];
        $shopIdFromRequest = $shopId;
        if ($shopId === null) {
            $shopId = Configuration::get('PS_SHOP_DEFAULT');
        }
        try {
            $productObject = new Product($productId, true, null, $shopId);
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        $shop = [
            'shop_id'               => (int)$shopId,
            'price'                 => (float)$productObject->price,
            'tax_rules_group_id'    => (int)$productObject->id_tax_rules_group,
            'on_sale'               => (bool)$productObject->on_sale,
            'price_per_unit'        => (float)$productObject->unit_price,
            'unity'                 => (string)$productObject->unity,
            'wholesale_price'       => (float)$productObject->wholesale_price,
            'specific_prices_count' => (int)count(self::getSpecificPriceIdsByProductId($productId, $shopIdFromRequest)),
            'priority1'             => SpecificPrice::getPriority($productId)[1],
            'priority2'             => SpecificPrice::getPriority($productId)[2],
            'priority3'             => SpecificPrice::getPriority($productId)[3],
            'priority4'             => SpecificPrice::getPriority($productId)[4],
        ];
        $responseArray['shops'][] = $shop;
        self::generateResponse($responseArray);
    }

    /**
     * reimplemented SpecificPrice::getIdsByProductId with shop filter
     *
     * @param $idProduct
     * @param $idShop
     * @param bool $idProductAttribute
     * @param int $idCart
     * @return array|false|mysqli_result|PDOStatement|resource|null
     * @throws PrestaShopDatabaseException
     */
    public static function getSpecificPriceIdsByProductId(
        $idProduct,
        $idShop,
        $idProductAttribute = false,
        $idCart = 0
    ) {
        if ($idShop === -1 || $idShop === null) {
            $idShop = implode(', ', Shop::getShops(true, null, true));
        }
        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(pSQL('
			SELECT `id_specific_price`
			FROM `' . _DB_PREFIX_ . 'specific_price`
			WHERE `id_product` = ' . (int) $idProduct . '
			AND id_product_attribute=' . (int) $idProductAttribute . '
			AND id_shop IN (0, ' . $idShop . ')
			AND id_cart=' . (int) $idCart));
    }

    /**
     * @param $productId
     * @param $productPricingSettings
     * @throws EM1Exception
     */
    public function saveProductPricingSettings($productId, $productPricingSettings)
    {
        foreach ($productPricingSettings['shops'] as $productPricingSetting) {
            $shopIds = [$productPricingSetting['shop_id']];
            if ($productPricingSetting['shop_id'] === -1) {
                $shopIds = Shop::getShops(true, null, true);
            }
            foreach ($shopIds as $shopId) {
                try {
                    $productObject = new Product($productId, true, null, $shopId);
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
                $productPricingData = [
                    'shop_id'            => (int)$shopId,
                    'price'              => (float)$productObject->price,
                    'tax_rules_group_id' => (int)$productObject->id_tax_rules_group,
                    'on_sale'            => (bool)$productObject->on_sale,
                    'price_per_unit'     => (float)$productObject->unit_price,
                    'unity'              => (string)$productObject->unity,
                    'wholesale_price'    => (float)$productObject->wholesale_price,
                    'priority1'          => SpecificPrice::getPriority($productId)[1],
                    'priority2'          => SpecificPrice::getPriority($productId)[2],
                    'priority3'          => SpecificPrice::getPriority($productId)[3],
                    'priority4'          => SpecificPrice::getPriority($productId)[4]
                ];
                foreach ($productPricingSetting as $key => $value) {
                    if ($value === null) {
                        $productPricingSetting[$key] = $productPricingData[$key];
                    }
                }
                $productObject->price = $productPricingSetting['price'];
                $productObject->id_tax_rules_group = $productPricingSetting['tax_rules_group_id'];
                $productObject->on_sale = $productPricingSetting['on_sale'];
                $productObject->unit_price = $productPricingSetting['price_per_unit'];
                $productObject->unity = $productPricingSetting['unity'];
                $productObject->wholesale_price = $productPricingSetting['wholesale_price'];
                $priorities = SpecificPrice::getPriority($productId);
                $priorities[0] = $productPricingSetting['priority1'];
                $priorities[1] = $productPricingSetting['priority2'];
                $priorities[2] = $productPricingSetting['priority3'];
                $priorities[3] = $productPricingSetting['priority4'];
                SpecificPrice::setSpecificPriority($productId, $priorities);

                try {
                    $productObject->save();
                    unset($productObject);
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
            }

            self::generateResponse();
        }
    }

    private function getProductPriorityCode($label)
    {
        $codes = [
            'Customer' => 'id_customer',
            'Country'  => 'id_country',
            'Currency' => 'id_currency',
            'Group'    => 'id_group',
            'Shop'     => 'id_shop'
        ];
        return (string)$codes[$label];
    }

    /**
     * @param $shopId
     * @param $productId
     * @throws EM1Exception
     */
    public function getProductEditShortDescription($shopId, $productId)
    {
        $responseArray = [
            'languages' => []
        ];
        $languageIds = Language::getLanguages(true, $shopId, true);
        foreach ($languageIds as $languageId) {
            try {
                $productObject = new Product($productId, true, $languageId, $shopId);
            } catch (Exception $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
            }
            $responseArray['languages'][] = [
                'shop_id'     => (int)$shopId,
                'language_id' => (int)$languageId,
                'description' => (string)$productObject->description_short
            ];
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $shopId
     * @param $productId
     * @throws EM1Exception
     */
    public function getProductEditDescription($shopId, $productId)
    {
        $responseArray = [
            'languages' => []
        ];
        $languageIds = Language::getLanguages(true, $shopId, true);
        foreach ($languageIds as $languageId) {
            try {
                $productObject = new Product($productId, true, $languageId, $shopId);
            } catch (Exception $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
            }
            $responseArray['languages'][] = [
                'shop_id'     => (int)$shopId,
                'language_id' => (int)$languageId,
                'description' => (string)$productObject->description
            ];
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function saveProductShortDescription($data)
    {
        foreach ($data['languages'] as $language) {
            $shopIds = [$language['shop_id']];
            if ($language['shop_id'] === -1) {
                $shopIds = Shop::getShops(true, null, true);
            }
            foreach ($shopIds as $shopId) {
                try {
                    $productObject = new Product($data['product_id'], false, $language['language_id'], $shopId);
                    $productObject->description_short = $language['description'];
                    $productObject->id_shop_list = [$shopId];
                    $productObject->save();
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
            }
        }
        self::generateResponse();
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function saveProductDescription($data)
    {
        foreach ($data['languages'] as $language) {
            $shopIds = [$language['shop_id']];
            if ($language['shop_id'] === -1) {
                $shopIds = Shop::getShops(true, null, true);
            }
            foreach ($shopIds as $shopId) {
                try {
                    $productObject = new Product($data['product_id'], true, $language['language_id'], $shopId);
                    $productObject->description = $language['description'];
                    $productObject->id_shop_list = [$shopId];
                    $productObject->save();
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
            }
        }
        self::generateResponse();
    }

    /**
     * @param $shopId
     * @param $productId
     * @throws EM1Exception
     */
    public function getProductEditOptions($shopId, $productId)
    {
        try {
            $productObject = new Product($productId, true, null, $shopId);
            $allAttachments = Db::getInstance()->executeS(
                pSQL('SELECT COUNT(id_attachment) AS cnt
			FROM ' . _DB_PREFIX_ . 'attachment a')
            );
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        $responseArray = [
            'isbn'                 => (string)$productObject->isbn,
            'ean13'                => (string)$productObject->ean13,
            'upc'                  => (string)$productObject->upc,
            'customizations_count' => $productObject->getCustomizationFields(false, $shopId) ?
                (int)count($productObject->getCustomizationFields(false, $shopId)) : 0,
            'attached_files_count' => $productObject->getAttachments(self::getDefaultLanguageId()) ?
                (int)count($productObject->getAttachments(self::getDefaultLanguageId())) : 0,
            'all_files_count'      => (int)$allAttachments[0]['cnt'],
            'shops'                => [],
            'tags'                 => []
        ];
        $responseArray['shops'][] = [
            'shop_id'             => (int)$shopId,
            'visibility'          => (string)$productObject->visibility,
            'available_for_order' => (bool)$productObject->available_for_order,
            'show_price'          => (bool)$productObject->show_price,
            'online_only'         => (bool)$productObject->online_only,
            'condition'           => (string)$productObject->condition,
            'show_condition'      => (string)$productObject->show_condition
        ];
        $languageIds = Language::getLanguages(true, $shopId, true);
        foreach ($languageIds as $languageId) {
            $responseArray['tags'][] = [
                'language_id' => (int)$languageId,
                'tags'        => (string)$productObject->getTags($languageId)
            ];
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function saveProductOptions($data)
    {
        try {
            $productObject = new Product($data['product_id']);
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        foreach ($data as $field => $value) {
            if ($value !== null && !is_array($value)) {
                $productObject->$field = $value;
            }
        }
        try {
            $productObject->save();
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        if ($data['shops'] !== null) {
            foreach ($data['shops'] as $shop) {
                unset($productObject);
                if ($shop['shop_id'] === -1) {
                    $shopId = null;
                } else {
                    $shopId = $shop['shop_id'];
                }
                try {
                    $productObject = new Product($data['product_id'], true, null, $shopId);
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
                }
                foreach ($shop as $field => $value) {
                    if ($value !== null) {
                        $productObject->$field = $value;
                    }
                }
                try {
                    $productObject->save();
                } catch (Exception $e) {
                    throw new EM1Exception(EM1Exception::ERROR_CODE_DATA_NOT_UPDATED, $e->getMessage());
                }
            }
        }
        if ($data['tags'] !== null) {
            unset($productObject);
            try {
                $productObject = new Product($data['product_id']);
            } catch (Exception $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
            }
            $tags = $productObject->tags;
            Tag::deleteTagsForProduct($data['product_id']);
            $languageIds = Language::getLanguages(true, false, true);
            foreach ($data['tags'] as $tagsLanguage) {
                Tag::addTags($tagsLanguage['language_id'], $data['product_id'], $tagsLanguage['tags']);
                if (($key = array_search($tagsLanguage['language_id'], $languageIds)) !== false) {
                    unset($languageIds[$key]);
                }
            }
            if (count($languageIds) > 0) {
                foreach ($languageIds as $languageId) {
                    Tag::addTags($languageId, $data['product_id'], $tags[$languageId]);
                }
            }
        }
        self::generateResponse();
    }

    /**
     * @param $id
     * @throws EM1Exception
     */
    public function deleteProductCustomizationField($id)
    {
        $shopIds = Shop::getShops(true, null, true);
        try {
            Db::getInstance()->execute(pSQL('DELETE FROM `' . _DB_PREFIX_ . 'customization_field_lang` 
                WHERE `id_customization_field` = ' . (int) $id . ' 
                AND `id_shop` IN (' . implode(',', $shopIds) . ')'));
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        self::generateResponse();
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function saveProductCustomizationField($data)
    {
        try {
            $customizationField = new CustomizationField($data['customization_field_id']);
            if ($data['type'] !== null) {
                $customizationField->type = $data['type'];
            }
            if ($data['is_required'] !== null) {
                $customizationField->required = $data['is_required'];
            }
            if ($data['languages'] !== null) {
                foreach ($data['languages'] as $language) {
                    $customizationField->name[$language['language_id']] = $language['label'];
                }
            }
            $customizationField->save();
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_DATA_NOT_UPDATED, 'Wrong customization_field_id');
        }
        self::generateResponse();
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function createProductCustomizationField($data)
    {
        try {
            $customizationField = new CustomizationField();
            $customizationField->id_product = $data['product_id'];
            $customizationField->required = $data['is_required'];
            $customizationField->type = $data['type'];
            $name = [];
            $shopIds = [];
            foreach ($data['languages'] as $language) {
                $name[$language['language_id']] = $language['label'];
                $shopIds[] = $language['shop_id'];
            }
            $customizationField->id_shop_list = $shopIds;
            $customizationField->name = $name;
            $customizationField->save();
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        self::generateResponse(['customization_field_id' => $customizationField->id]);
    }

    /**
     * @param $productId
     * @param $assignedFileIds
     */
    public function saveProductEditAssignedFiles($productId, $assignedFileIds)
    {
        Attachment::attachToProduct($productId, $assignedFileIds);
        self::generateResponse();
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function uploadProductAttachedFile($data)
    {
        if (!empty($_FILES)) {
            try {
                $attachment = new Attachment();
            } catch (Exception $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
            }
            $fileName = $_FILES['file']['name'];

            foreach ($data['languages'] as $language) {
                $attachment->name[$language['language_id']] = $language['title'];
                $attachment->description[$language['language_id']] = $language['description'];
            }

            $attachment->file = sha1($fileName);
            $attachment->file_name = $fileName;

            $pathFile = _PS_DOWNLOAD_DIR_ . sha1($fileName);
            move_uploaded_file($_FILES['file']['tmp_name'], _PS_DOWNLOAD_DIR_ . sha1($fileName));
            $fileInfo = finfo_open(FILEINFO_MIME_TYPE);

            $attachment->file_size = filesize($pathFile);
            $attachment->mime = finfo_file($fileInfo, $pathFile);
            try {
                $attachment->save();
            } catch (Exception $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
            }
            $attachment->attachProduct($data['product_id']);
            self::generateResponse([
                'file_id' => (int)$attachment->id,
                'mime'    => $attachment->mime
            ]);
        } else {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, '$_FILES is empty');
        }
    }

    /**
     * @param $productId
     * @param $shopId
     * @throws EM1Exception
     */
    public function getProductEditLanguageValues($productId, $shopId)
    {
        try {
            $productObject = new Product($productId, true, $this->languageId, $shopId);
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        $responseArray = [
            'language_values' => [
                'shop_id'                     => (int)$shopId,
                'language_id'                 => (int)$this->languageId,
                'product_name'                => (string)$productObject->name,
                'is_description_filled'       => (bool)$productObject->description,
                'is_short_description_filled' => (bool)$productObject->description_short,
                'delivery_in_stock'           => (string)$productObject->delivery_in_stock,
                'delivery_out_of_stock'       => (string)$productObject->delivery_out_stock,
                'meta_title'                  => (string)$productObject->meta_title,
                'meta_description'            => (string)$productObject->meta_description,
                'link_rewrite'                => (string)$productObject->link_rewrite
            ]
        ];

        self::generateResponse($responseArray);
    }

    /**
     * @param $productId
     * @param $shopId
     * @throws EM1Exception
     */
    public function getProductEditCustomizationFields($productId, $shopId)
    {
        $responseArray = [
            'customization_fields_count' => null,
            'customization_fields'       => []
        ];
        try {
            $productObject = new Product($productId, true, null, $shopId);
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        $customizationFields = $productObject->getCustomizationFields(false, $shopId);
        if ($customizationFields) {
            foreach ($customizationFields as $customizationField) {
                foreach ($customizationField as $languagesArray) {
                    $customizationFieldResponse = null;
                    foreach ($languagesArray as $languageArray) {
                        if ($customizationFieldResponse === null) {
                            $customizationFieldResponse = [
                                'customization_field_id' => (int)$languageArray['id_customization_field'],
                                'is_required'            => (bool)$languageArray['required'],
                                'type'                   => (int)$languageArray['type'],
                                'languages'              => []
                            ];
                        }
                        $customizationFieldResponse['languages'][] = [
                            'shop_id'     => (int)$shopId,
                            'language_id' => (int)$languageArray['id_lang'],
                            'label'       => (string)$languageArray['name']
                        ];
                    }
                    if ($customizationField !== null) {
                        $responseArray['customization_fields'][] = $customizationFieldResponse;
                    }
                }
            }
        }

        $responseArray['customization_fields_count'] = count($responseArray['customization_fields']);
        self::generateResponse($responseArray);
    }

    /**
     * @param $productId
     * @throws EM1Exception
     */
    public function deleteProduct($productId)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            $product = new Product($productId);
            $product->delete();
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND, $exception->getMessage());
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND, $exception->getMessage());
        }

        self::generateResponse();
    }

    public function deleteProductDescription($productId)
    {
        try {
            $product = new Product($productId);
            $product->setFieldsToUpdate(
                array(
                    'description' => true
                )
            );

            //map translatable
            $descriptionValues = array();
            foreach ($product->getFieldsLang() as $productLang) {
                if ($this->languageId === (int)$productLang['id_lang']) {
                    $descriptionValues[(int)$productLang['id_lang']] = '';
                    continue;
                }

                $descriptionValues[(int)$productLang['id_lang']] =
                    $product->getFieldByLang('description', (int)$productLang['id_lang']);
            }

            $product->description = $descriptionValues;
            $product->update(true);
        } catch (PrestaShopException $exception) {
            return false;
        }
        // TODO: Implement deleteProductDescription() method.
    }

    /**
     * @param $productId
     * @return array
     * @throws EM1Exception
     */
    private function getProductCombinationsCountByShops($productId)
    {
        return self::getQueryResult(
            /** @lang MySQL */'SELECT COUNT(*) AS combinations_count, `id_shop` 
            FROM `'._DB_PREFIX_.'product_attribute` pa 
            ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
            WHERE pa.`id_product` = ' . $productId . '
            GROUP BY `id_shop`'
        );
    }

    /**
     * @param $specificPrice
     * @throws EM1Exception
     */
    public function createProductSpecificPrice($specificPrice)
    {
        try {
            $specificPriceObject = new SpecificPrice();
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        $specificPriceObject->id_product = $specificPrice['product_id'];
        if ($specificPrice['shop_id'] !== null && $specificPrice['shop_id'] !== -1) {
            $specificPriceObject->id_shop = $specificPrice['shop_id'];
        } else {
            $specificPriceObject->id_shop = 0;
        }
        $specificPriceObject->id_currency = $specificPrice['currency_id'];
        $specificPriceObject->id_country = $specificPrice['country_id'];
        $specificPriceObject->id_group = $specificPrice['group_id'];
        $specificPriceObject->id_customer = $specificPrice['customer_id'];
        $specificPriceObject->id_product_attribute = $specificPrice['combination_id'];
        $specificPriceObject->price = $specificPrice['price'];
        $specificPriceObject->from_quantity = $specificPrice['from_quantity'];
        $specificPriceObject->reduction = $specificPrice['reduction'];
        $specificPriceObject->reduction_tax = $specificPrice['tax_included'];
        $specificPriceObject->reduction_type = $specificPrice['reduction_type'];
        $specificPriceObject->from = $specificPrice['available_date']
            ? date('Y-m-d', self::convertMillisecondsTimestampToTimestamp($specificPrice['available_date']))
            : '0000-00-00 00:00:00';
        $specificPriceObject->to = $specificPrice['available_to']
            ? date('Y-m-d', self::convertMillisecondsTimestampToTimestamp($specificPrice['available_to']))
            : '0000-00-00 00:00:00';
        try {
            $specificPriceObject->add();
            if ((int)$specificPriceObject->id === 0) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_SPECIFIC_PRICE_UNIQUE_CONSTRAINT);
            }

            $responseArray = [
                'specific_price_id'     => (int)$specificPriceObject->id,
                'formatted_reduction'   => (string)Tools::displayPrice((float)$specificPriceObject->reduction),
                'specific_prices_count' => self::getSpecificPricesCount(
                    $specificPriceObject->id_product,
                    $specificPrice['shop_id']
                )
            ];
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_SPECIFIC_PRICE_UNIQUE_CONSTRAINT);
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function uploadProductImage($data)
    {
        if (!empty($_FILES)) {
            try {
                $image = new Image();
                $productObject = new Product($data['product_id'], true, null, $data['shop_id']);
            } catch (Exception $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
            }

            $image->id_product = $data['product_id'];

            foreach ($data['changes']['languages'] as $language) {
                if (is_array($image->legend)) {
                    $image->legend[$language['language_id']] = $language['caption'];
                } else {
                    $image->legend = [$language['language_id'] => $language['caption']];
                }
            }

            try {
                foreach ($data['changes']['shops'] as $shop) {
                    $image->cover = $shop['cover'];
                    if ($shop['cover'] === true) {
                        $productCoverImage = Image::getCover($data['product_id']);
                        if ($productCoverImage !== null) {
                            $productCoverImageId = $productCoverImage['id_image'];
                            $productCoverImage = new Image($productCoverImageId);
                            $productCoverImage->id_product = $data['product_id'];
                            $productCoverImage->cover = false;
                            $productCoverImage->save();
                            unset($productCoverImage);
                        }
                    }
                }
                // move to specific folder manually cuz core method for product image upload has protected flag
                if (($image->validateFields(false, true)) === true &&
                    ($image->validateFieldsLang(false, true)) === true && $image->add()) {
                    $image->associateTo([$data['shop_id']]);
                    move_uploaded_file(
                        $_FILES['image']['tmp_name'],
                        $image->getPathForCreation() . '-' . ImageType::getFormattedName('home') . '.jpg'
                    );
                }
            } catch (Exception $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
            }
            $defaultLanguageId = self::getDefaultLanguageId();
            self::generateResponse([
                'image_id'  => (int)$image->id,
                'image_url' => (string)self::getProductImageUrl(
                    $productObject->link_rewrite[$defaultLanguageId],
                    $image->id
                ),
                'position'  => (int)$image->position
            ]);
        } else {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, '$_FILES is empty');
        }
    }

    /**
     * @param $specificPrice
     * @param $shopId
     * @throws EM1Exception
     */
    public function saveProductSpecificPrice($specificPrice, $shopId)
    {
        try {
            $specificPriceObject = new SpecificPrice($specificPrice['specific_price_id']);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        $specificPriceOldData = [
            'product_id'     => $specificPriceObject->id_product,
            'shop_id'        => $specificPriceObject->id_shop,
            'currency_id'    => $specificPriceObject->id_currency,
            'country_id'     => $specificPriceObject->id_country,
            'group_id'       => $specificPriceObject->id_group,
            'customer_id'    => $specificPriceObject->id_customer,
            'combination_id' => $specificPriceObject->id_product_attribute,
            'price'          => $specificPriceObject->price,
            'from_quantity'  => $specificPriceObject->from_quantity,
            'reduction'      => $specificPriceObject->reduction,
            'tax_included'   => $specificPriceObject->reduction_tax,
            'reduction_type' => $specificPriceObject->reduction_type,
            'available_from' => self::convertTimestampToMillisecondsTimestamp($specificPriceObject->from),
            'available_to'   => self::convertTimestampToMillisecondsTimestamp($specificPriceObject->to)
        ];

        foreach ($specificPrice as $field => $value) {
            if ($value === null) {
                $specificPrice[$field] = $specificPriceOldData[$field];
            }
        }

        // because MA send reduction like it shown in the admin we need to convert it to DB format
        if ($specificPriceObject->reduction_type === 'amount' && $specificPrice['reduction_type'] === 'percentage') {
            $specificPrice['reduction'] /= 100;
        } elseif ($specificPriceObject->reduction_type === 'percentage'
            && $specificPrice['reduction_type'] === 'amount'
        ) {
            $specificPrice['reduction'] *= 100;
        }

        $specificPriceObject->id_product = $specificPrice['product_id'];
        $specificPriceObject->id_shop = $specificPrice['shop_id'];
        $specificPriceObject->id_currency = $specificPrice['currency_id'];
        $specificPriceObject->id_country = $specificPrice['country_id'];
        $specificPriceObject->id_group = $specificPrice['group_id'];
        $specificPriceObject->id_customer = $specificPrice['customer_id'];
        $specificPriceObject->id_product_attribute = $specificPrice['combination_id'];
        $specificPriceObject->price = $specificPrice['price'];
        $specificPriceObject->from_quantity = $specificPrice['from_quantity'];
        $specificPriceObject->reduction = $specificPrice['reduction'];
        $specificPriceObject->reduction_tax = $specificPrice['tax_included'];
        $specificPriceObject->reduction_type = $specificPrice['reduction_type'];
        $specificPriceObject->from =
            date('Y-m-d', self::convertMillisecondsTimestampToTimestamp($specificPrice['available_from']));
        $specificPriceObject->to =
            date('Y-m-d', self::convertMillisecondsTimestampToTimestamp($specificPrice['available_to']));
        try {
            $specificPriceObject->update();

            if ($specificPriceObject->reduction_type == 'amount') {
                $reduction = (float)$specificPriceObject->reduction;
                $formattedReduction = Tools::displayPrice($reduction);
            } else {
                $reduction = $this->round((float)$specificPriceObject->reduction * 100);
                $formattedReduction = $reduction . ' %';
            }

            $responseArray = [
                'formatted_reduction'   => $formattedReduction,
                'specific_prices_count' => self::getSpecificPricesCount($specificPriceObject->id_product, $shopId)
            ];
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $productId
     * @param $shopId
     * @return int
     * @throws PrestaShopDatabaseException
     */
    public static function getSpecificPricesCount($productId, $shopId)
    {
        if ($shopId === null || $shopId === -1) {
            $specificPricesCount = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(pSQL('
			SELECT COUNT(id_specific_price) AS cnt
			FROM `' . _DB_PREFIX_ . 'specific_price`
			WHERE `id_product` = ' . (int)$productId));
        } else {
            $specificPricesCount = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(pSQL('
			SELECT COUNT(id_specific_price) AS cnt
			FROM `' . _DB_PREFIX_ . 'specific_price`
			WHERE `id_product` = ' . (int)$productId . '
			AND id_shop = ' . (int)$shopId));
        }
        return (int)$specificPricesCount[0]['cnt'];
    }

    /**
     * @param $productId
     * @param $shopId
     * @throws EM1Exception
     */
    public function getProductEditSpecificPrices($productId, $shopId)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            if ($shopId === -1 || $shopId === null) {
                $shops = Shop::getShops(true, null, true);
            } else {
                $shops = [$shopId];
            }
            $shops[] = 0;
            $specificPrices = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(pSQL('
			SELECT *
			FROM `' . _DB_PREFIX_ . 'specific_price`
			WHERE `id_product` = ' . (int) $productId . ' AND `id_shop` IN (' . implode(', ', $shops) . ')'));
            $responseArray = [
                'specific_prices_count' => count($specificPrices),
                'specific_prices'       => []
            ];
            foreach ($specificPrices as $specificPrice) {
                $responseArray['specific_prices'][] =
                    $this->getProductSpecificPriceDto($specificPrice['id_specific_price'], $shopId);
            }
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }

        self::generateResponse($responseArray);
    }

    /**
     * @param $specificPriceId
     * @param $shopId
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function getProductSpecificPriceDto($specificPriceId, $shopId)
    {
        $specificPriceObject = new SpecificPrice($specificPriceId, null, $shopId);
        $customer = new Customer($specificPriceObject->id_customer);

        if ($specificPriceObject->reduction_type == 'amount') {
            $reduction = (float)$specificPriceObject->reduction;
            $formattedReduction = Tools::displayPrice($reduction);
        } else {
            $reduction = $this->round((float)$specificPriceObject->reduction * 100);
            $formattedReduction = $reduction . ' %';
        }
        $availableFrom = $specificPriceObject->from;
        if ($specificPriceObject->from == '0000-00-00 00:00:00') {
            $availableFrom = null;
        }
        $availableTo = $specificPriceObject->to;
        if ($specificPriceObject->to == '0000-00-00 00:00:00') {
            $availableTo = null;
        }
        return [
            'specific_price_id'   => (int)$specificPriceObject->id,
            'shop_id'             => (int)$specificPriceObject->id_shop,
            'currency_id'         => (int)$specificPriceObject->id_currency,
            'country_id'          => (int)$specificPriceObject->id_country,
            'group_id'            => (int)$specificPriceObject->id_group,
            'customer_id'         => (int)$specificPriceObject->id_customer,
            'customer_first_name' => $customer->firstname,
            'customer_last_name'  => $customer->lastname,
            'combination_id'      => (int)$specificPriceObject->id_product_attribute,
            'price'               => (float)$specificPriceObject->price,
            'from_quantity'       => (int)$specificPriceObject->from_quantity,
            'reduction'           => $reduction,
            'formatted_reduction' => $formattedReduction,
            'tax_included'        => (bool)$specificPriceObject->reduction_tax,
            'reduction_type'      => (string)$specificPriceObject->reduction_type,
            'available_from'      => self::convertTimestampToMillisecondsTimestamp($availableFrom),
            'available_to'        => self::convertTimestampToMillisecondsTimestamp($availableTo)
        ];
    }

    /**
     * @param $productId
     * @param $shopId
     * @throws EM1Exception
     */
    public function getProductEditAssignedCategories($productId, $shopId)
    {
        $responseArray = [
            'categories'       => [],
            'categories_count' => count(self::getProductCategoryIds($productId, $shopId))
        ];

        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            $productObject = new Product($productId, true, $this->languageId, $shopId);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        foreach (self::getProductCategoryIds($productId, $shopId) as $categoryId) {
            $responseArray['categories'][] = $this->getAssignedProductCategoryDto(
                $categoryId,
                $productObject->id_category_default
            );
        }

        self::generateResponse($responseArray);
    }

    /**
     * @param $categoryId
     * @param $categoryDefault
     * @return array
     */
    private function getAssignedProductCategoryDto($categoryId, $categoryDefault)
    {
        $categoryObject = new Category($categoryId, $this->languageId);

        $categoryPath = $this->getCategoryPath($categoryId);

        return [
            'category_id' => (int)$categoryObject->id,
            'name'        => $categoryObject->name,
            'path'        => $categoryPath,
            'is_main'     => (bool)($categoryObject->id == $categoryDefault)
        ];
    }

    /**
     * @param $shopId
     */
    public function getProductEditCategoriesToAssign($shopId)
    {
        if ($shopId === null || $shopId == -1) {
            $shopId = Configuration::get('PS_SHOP_DEFAULT');
        }
        $responseArray = [
            'categories' => []
        ];
        $categories = Category::getSimpleCategories($this->languageId);
        foreach ($categories as $category) {
            $responseArray['categories'][] = $this->getProductCategoryDto($category['id_category'], $shopId);
        }

        self::generateResponse($responseArray);
    }

    /**
     * @param $categoryId
     * @param $shopId
     * @return array
     */
    public function getProductCategoryDto($categoryId, $shopId)
    {
        $categoryObject = new Category($categoryId, $this->languageId, $shopId);
        return [
            'category_id'        => (int)$categoryObject->id,
            'parent_category_id' => (int)$categoryObject->id_parent,
            'name'               => $categoryObject->name,
            'path'               => self::getCategoryPath($categoryObject->id),
            'position'           => (int)$categoryObject->position,
            'is_root'            => $categoryObject->level_depth == 1
        ];
    }

    /**
     * @param $productId
     * @throws EM1Exception
     */
    public function getProductEditFeatures($productId)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }

        $responseArray = [
            'all_features'           => [],
            'product_features'       => [],
            'product_features_count' => ''
        ];
        $features = Feature::getFeatures($this->languageId);
        try {
            foreach ($features as $feature) {
                $responseArray['all_features'][] = self::getFeatureDto($feature['id_feature']);
            }

            $productObject = new Product($productId);
            $productFeatures = $productObject->getFeatures();
            foreach ($productFeatures as $productFeature) {
                $responseArray['product_features'][] = self::getProductFeatureDto($productFeature);
            }
        } catch (\Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }

        $responseArray['product_features_count'] = count($responseArray['product_features']);

        self::generateResponse($responseArray);
    }

    /**
     * @param $featureId
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public static function getFeatureDto($featureId)
    {
        $featureObject = new Feature($featureId);
        $returnArray = [
            'feature_id'     => (int)$featureObject->id,
            'position'       => (int)$featureObject->position,
            'languages'      => [],
            'shops'          => [],
            'feature_values' => []
        ];

        if (is_array($featureObject->name)) {
            foreach ($featureObject->name as $languageId => $featureName) {
                $returnArray['languages'][] = self::getFeatureToLanguageDto($featureName, $languageId);
            }
        } else {
            $returnArray['languages'][] =
                self::getFeatureToLanguageDto($featureObject->name, self::getDefaultLanguageId());
        }

        foreach ($featureObject->getAssociatedShops() as $shopId) {
            $returnArray['shops'][] = (int)$shopId;
        }

        $featureValues = FeatureValue::getFeatureValues($featureObject->id);
        foreach ($featureValues as $featureValue) {
            $returnArray['feature_values'][] = self::getFeatureValueDto($featureValue);
        }

        return $returnArray;
    }

    /**
     * @param $featureName
     * @param $languageId
     * @return array
     */
    public static function getFeatureToLanguageDto($featureName, $languageId)
    {
        return [
            'language_id' => (int)$languageId,
            'name'        => $featureName
        ];
    }

    /**
     * @param $featureValueData
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public static function getFeatureValueDto($featureValueData)
    {
        $featureValueObject = new FeatureValue($featureValueData['id_feature_value']);
        $returnArray = [
            'feature_value_id' => (int)$featureValueObject->id,
            'custom'           => (bool)$featureValueObject->custom,
            'languages'        => []
        ];
        if (is_array($featureValueObject->value)) {
            foreach ($featureValueObject->value as $languageId => $value) {
                $returnArray['languages'][] = self::getFeatureValueToLanguageDto($value, $languageId);
            }
        } else {
            $returnArray['languages'][] = self::getFeatureValueToLanguageDto(
                $featureValueObject->value,
                self::getDefaultLanguageId()
            );
        }

        return $returnArray;
    }

    /**
     * @param $value
     * @param $languageId
     * @return array
     */
    public static function getFeatureValueToLanguageDto($value, $languageId)
    {
        return [
            'language_id' => $languageId,
            'value'       => $value
        ];
    }

    /**
     * @param $productFeature
     * @return array
     */
    public static function getProductFeatureDto($productFeature)
    {
        return [
            'feature_id'       => (int)$productFeature['id_feature'],
            'feature_value_id' => (int)$productFeature['id_feature_value']
        ];
    }

    /**
     * @param $data
     * @throws EM1Exception
     */
    public function addProductFeature($data)
    {
        if (!Product::existsInDatabase($data['product_id'], 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            $productObject = new Product($data['product_id']);
        } catch (\Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        $custom = is_array($data['custom_values']);
        $featureValueId = $productObject->addFeaturesToDB(
            $data['feature_id'],
            $data['feature_value_id'],
            $custom
        );
        if ($custom) {
            foreach ($data['custom_values'] as $customValue) {
                $productObject->addFeaturesCustomToDB(
                    $featureValueId,
                    $customValue['language_id'],
                    $customValue['value']
                );
            }
        }
        try {
            $productObject->save();
        } catch (\Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }

        self::generateResponse(
            [
                'feature_value_id'      => (int)$featureValueId,
                'product_features_count' => count($productObject->getFeatures())
            ]
        );
    }

    /**
     * @param $featureValueId
     * @param $data
     * @throws EM1Exception
     */
    public function updateProductFeature($featureValueId, $data)
    {
        if (!Product::existsInDatabase($data['product_id'], 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        if (!Product::existsInDatabase($featureValueId, 'feature_value')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, 'feature not found');
        }
        try {
            $productObject = new Product($data['product_id']);
        } catch (\Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        self::deleteProductFeature($featureValueId, $data['product_id']);
        $custom = !empty($data['custom_values']);
        $featureValueId = $productObject->addFeaturesToDB(
            $data['feature_id'],
            $data['feature_value_id'] ? $data['feature_value_id'] : $featureValueId,
            $custom
        );
        if ($custom) {
            foreach ($data['custom_values'] as $customValue) {
                $productObject->addFeaturesCustomToDB(
                    $featureValueId,
                    $customValue['language_id'],
                    $customValue['value']
                );
            }
        }

        self::generateResponse(
            [
                'feature_value_id' => (int)$featureValueId,
                'product_features_count' => count($productObject->getFeatures())
            ]
        );
    }

    /**
     * @param $productId
     * @param $features
     * @throws EM1Exception
     */
    public function deleteProductFeatures($productId, $features)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }

        foreach ($features as $feature) {
            self::deleteProductFeature($feature['feature_value_id'], $productId);
        }
        try {
            $productObject = new Product($productId);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }

        self::generateResponse(
            [
                'product_features_count' => count($productObject->getFeatures())
            ]
        );
    }

    /**
     * @param $featureValueId
     * @param $productId
     */
    public static function deleteProductFeature($featureValueId, $productId)
    {
        Db::getInstance(_PS_USE_SQL_SLAVE_)->delete(
            _DB_PREFIX_ . 'feature_product',
            '`id_product` = ' . (int) $productId . '
                    AND `id_feature_value` = ' . (int) $featureValueId
        );
        Db::getInstance(_PS_USE_SQL_SLAVE_)->delete(
            _DB_PREFIX_ . 'feature_value',
            '`custom` = 1
                    AND `id_feature_value` = ' . (int) $featureValueId
        );
    }

    /**
     * @param $productId
     * @param $categories
     * @throws EM1Exception
     */
    public function updateAssignedProductCategories($productId, $categories)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            $productObject = new Product($productId, true);
            $productObject->updateCategories(array_column($categories, 'category_id'), true);
            $mainCategory = array_filter(
                $categories,
                function ($value) {
                    return $value['is_main'];
                }
            );
            $productObject->id_category_default = reset($mainCategory)['category_id'];
            $productObject->save();
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }

        $responseArray = [
            'categories' => [],
            'categories_count' => 0
        ];
        foreach (self::getProductCategoryIds($productId) as $categoryId) {
            $responseArray['categories'][] = self::getAssignedProductCategoryDto(
                $categoryId,
                $productObject->id_category_default
            );
        }
        $responseArray['categories_count'] = count($responseArray['categories']);

        self::generateResponse($responseArray);
    }

    /**
     * @param $productId
     * @param $categoryId
     * @param $shopId
     * @throws EM1Exception
     */
    public function deleteProductCategory($productId, $categoryId, $shopId)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        $result = self::unassignProductCategory($productId, $categoryId);
        if ($result === true) {
            try {
                $productObject = new Product($productId, true, $this->languageId, $shopId);
                if ($productObject->id_category_default == $categoryId) {
                    $mainCategoryId = $this->updateProductMainCategoryId($productId, $shopId);
                } else {
                    $mainCategoryId = $productObject->id_category_default;
                }
            } catch (Exception $exception) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
            }
            self::generateResponse(
                [
                    'main_category_id' => (int)$mainCategoryId,
                    'categories_count' => count(self::getProductCategoryIds($productId, $shopId))
                ]
            );
        }
        throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR);
    }

    /**
     * @param $productId
     * @param null $shopId
     * @return int
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function updateProductMainCategoryId($productId, $shopId = null)
    {
        $productCategories = self::getProductCategoryIds($productId, $shopId);
        $productObject = new Product($productId, true, $this->languageId, $shopId);
        $categoryObject = new Category($productObject->id_category_default);
        $categoryId = $categoryObject->id_parent;
        while (!in_array($categoryId, $productCategories)) {
            $categoryId = $categoryObject->id_parent;
            if ($categoryObject->level_depth == 1 && !in_array($categoryId, $productCategories)) {
                $categoryId = $productCategories[0];
            } elseif ($categoryObject->level_depth == 1) {
                $categoryId = $categoryObject->id;
            }
            $categoryObject = new Category($categoryId);
        }
        $productObject->id_category_default = $categoryId;
        $productObject->save();
        return $categoryId;
    }

    public function updateMainProductCategory($productId, $categoryId, $shopId)
    {
        if (!Product::existsInDatabase($productId, 'product')) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_PRODUCT_NOT_FOUND);
        }
        try {
            $productObject = new Product($productId, true, $this->languageId, $shopId);
            $productObject->id_category_default = $categoryId;
            $productObject->save();
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        self::generateResponse();
    }

    /**
     * @param $categoryId
     * @return mixed|string
     */
    private function getCategoryPath($categoryId)
    {
        $categoryObject = new Category($categoryId, $this->languageId);
        $categoryPath = $categoryObject->name;
        while ($categoryObject->level_depth != 1) {
            $categoryObject = new Category($categoryObject->id_parent, $this->languageId);
            $categoryPath = $categoryObject->name . '>' . $categoryPath;
        }
        return $categoryPath;
    }
}

/**
 *
 */
function includedProductFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/product/EM1ProductInterface.php';
}

function notEmpty($x)
{
    return !empty($x);
}
