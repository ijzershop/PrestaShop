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

includedAbandonedCartFiles();

/***
 * Class MAAbandonedCart
 */

class MAAbandonedCart extends EM1Main implements EM1AbandonedCartInterface
{
    /** @var int $shopId shop_id from request, id_shop field in database */
    protected $shopId;

    /** @var int $shopGroupId shop_group_id from request, id_shop_group field in database */
    protected $shopGroupId;

    /** @var int $languageId lang_id from request, id_lang field in database */
    private $languageId;

    /** @var int $currencyId currency_id from request, id_currency field in database */
    protected $currencyId;

    /** @var string $whereQuery preparation of where query part */
    private $whereQuery = '1';

    /** @var string $orderByQuery preparation of order by query part */
    private $orderByQuery;

    /**
     * MAAbandonedCart constructor.
     *
     * @param $languageId   int Language Id from database
     * @param $currencyId   int Currency Id from database
     */
    public function __construct($languageId, $currencyId)
    {
        $this->languageId       = $languageId;
        $this->currencyId       = $currencyId;
    }

    /**
     * Get specific abandoned cart details based on {id}
     * GET  Request is {url}/get_abandoned_cart_details&data=
     * POST Request is {url}/get_abandoned_cart_details
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "id": (int),
     *  "page_size": (int),
     *  "page_index": (int)
     * }
     *
     * @param $abandonedCartId  int     Cart Id
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  void    Returns formatted abandoned cart details, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function getAbandonedCartDetails($abandonedCartId, $pageSize, $pageIndex)
    {
        // Create Cart object and validate after initialisation
        /** @var CartCore $abandonedCart */
        $abandonedCart = new Cart($abandonedCartId);
        if (!Validate::isLoadedObject($abandonedCart)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CART_NOT_FOUND);
        }

        $customerId                  = (int)$abandonedCart->id_customer;
        $abandonedCartCountAndTotal  = $this->getAbandonedCartCountAndTotal($abandonedCartId);
        $abandonedCartTotal          = $this->round($abandonedCartCountAndTotal[self::KEY_CART_TOTAL]);
        $abandonedCartCustomer       = $this->getAbandonedCartCustomerData($customerId);

        // Prepare Cart information
        $abandonedCartResult = array(
            self::KEY_CART_ID                       => (int)$abandonedCart->id,
            self::KEY_SHOP_ID                       => (int)$abandonedCart->id_shop,
            self::KEY_CUSTOMER_ID                   => $customerId,
            self::KEY_DATE_ADD                      => self::convertTimestampToMillisecondsTimestamp(
                strtotime($abandonedCart->date_add)
            ),
            self::KEY_CART_TOTAL                    => $abandonedCartTotal,
            self::KEY_FORMATTED_CART_TOTAL          => $this->displayPrice(
                $abandonedCartTotal,
                $this->currencyId,
                $this->languageId
            ),
            self::KEY_PRODUCTS_COUNT                => (int)$abandonedCartCountAndTotal[self::KEY_PRODUCTS_COUNT]
        );

        $this->abandonedCartResponse(
            array_merge(
                $abandonedCartResult,
                $abandonedCartCustomer,
                $this->getAbandonedCartProductsData($abandonedCartId, $pageSize, $pageIndex)
            )
        );
    }

    /**
     * Get abandoned carts, can be based on filters or date range filters
     * GET  Request is {url}/get_abandoned_carts&data=
     * POST Request is {url}/get_abandoned_carts
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "date_from": (int),
     *  "date_to": (int),
     *  "page_size": (int),
     *  "page_index": (int),
     *  "sort_field": (string),
     *  "sort_direction": (string)
     * }
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     * @param $sortField        string  Sorting field based on which sort is applying
     * @param $sortDirection    string  Sorting direction (means, ascending or descending)
     *
     * @return                  void    Returns formatted abandoned carts, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function getAbandonedCarts($dateFrom, $dateTo, $pageSize, $pageIndex, $sortField, $sortDirection)
    {
        // Prepare where and order by query parts
        $this->prepareParameters(
            $dateFrom,
            $dateTo,
            $sortField,
            $sortDirection
        );

        // Get Cart ids and additional information
        $abandonedCartsInformation = $this->getAbandonedCartsInformation($pageSize, $pageIndex);
        $abandonedCarts = array();
        foreach ($abandonedCartsInformation as $abandonedCartValue) {
            $abandonedCartId = (int)$abandonedCartValue[self::KEY_ID_CART];

            // Get Cart and fill array with their information
            try {
                /** @var CartCore $abandonedCart */
                $abandonedCart          = new Cart($abandonedCartId);
                $customerId             = (int)$abandonedCart->id_customer;
                $abandonedCartCustomer  = $this->getAbandonedCartCustomerData($customerId);

                $abandonedCartResult = array(
                    self::KEY_CART_ID               => (int)$abandonedCart->id,
                    self::KEY_SHOP_ID               => (int)$abandonedCart->id_shop,
                    self::KEY_CUSTOMER_ID           => $customerId,
                    self::KEY_DATE_ADD              => self::convertTimestampToMillisecondsTimestamp(
                        strtotime($abandonedCart->date_add)
                    ),
                    self::KEY_CART_TOTAL            => $abandonedCartValue[self::KEY_CART_TOTAL],
                    self::KEY_FORMATTED_CART_TOTAL  => $this->displayPrice(
                        $abandonedCartValue[self::KEY_CART_TOTAL],
                        $this->currencyId,
                        $abandonedCart->id_lang
                    ),
                    self::KEY_PRODUCTS_COUNT        => (int)$abandonedCartValue[self::KEY_CART_COUNT_PRODUCTS],
                );

                $abandonedCarts[] = array_merge(
                    $abandonedCartResult,
                    $abandonedCartCustomer
                );
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $exception->getMessage());
            }
        }

        $this->abandonedCartsResponse($abandonedCarts);
    }

    /**
     * Search abandoned carts based on search phrase.
     * GET  Request is {url}/search_abandoned_carts&data=
     * POST Request is {url}/search_abandoned_carts
     * Content-Type: application/json
     * {
     *  "token": (string),
     *  "shop_id": (int),
     *  "shop_group_id": (int),
     *  "date_from": (int),
     *  "date_to": (int),
     *  "search_phrase": (string),
     *  "page_size": (int),
     *  "page_index": (int),
     *  "sort_field": (string),
     *  "sort_direction": (string)
     * }
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     * @param $searchPhrase     string  Search phrase
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     * @param $sortField        string  Sorting field based on which sort is applying
     * @param $sortDirection    string  Sorting direction (means, ascending or descending)
     *
     * @return                  void    Returns searched formatted abandoned carts, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function searchAbandonedCartsBy(
        $dateFrom,
        $dateTo,
        $searchPhrase,
        $pageSize,
        $pageIndex,
        $sortField,
        $sortDirection
    ) {
        // Check if search phrase is set and not empty
        if (empty($searchPhrase)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_SEARCH_PHRASE_NOT_SET);
        }

        // Extend where query part based on search phrase
        $this->whereQuery .= $this->prepareSearchDataWherePart($searchPhrase);
        $this->getAbandonedCarts(
            $dateFrom,
            $dateTo,
            $pageSize,
            $pageIndex,
            $sortField,
            $sortDirection
        );
    }

    /**
     * Get specific abandoned cart products based on {id}
     * GET  Request is {url}/get_abandoned_cart_products&data=
     * POST Request is {url}/get_abandoned_cart_products
     *
     * {
     *  "token": (string),
     *  "id": (int),
     *  "page_size": (int),
     *  "page_index": (int)
     * }
     *
     * @param $abandonedCartId  int     Cart Id
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  void    Returns searched formatted abandoned carts, or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    public function getAbandonedCartProducts($abandonedCartId, $pageSize, $pageIndex)
    {
        // Create Cart object and validate after initialisation
        /** @var CartCore $abandonedCart */
        $abandonedCart = new Cart($abandonedCartId);
        if (!Validate::isLoadedObject($abandonedCart)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CART_NOT_FOUND);
        }

        self::generateResponse($this->getAbandonedCartProductsData($abandonedCartId, $pageSize, $pageIndex));
    }

    /**
     * Get cart products data
     *
     * @param $abandonedCartId  int     Cart Id
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  array   Returns cart products data
     *
     * @throws EM1Exception Custom exception
     */
    private function getAbandonedCartProductsData($abandonedCartId, $pageSize, $pageIndex)
    {
        // Get Cart product information and fill array with their information
        $cartProducts = array();
        foreach ($this->getAbandonedCartProductsInformation($abandonedCartId, $pageSize, $pageIndex) as $productValue) {
            $productId = $productValue[self::KEY_ID_PRODUCT];
            try {
                /** @var ProductCore $product */
                $product        = new Product($productId, true);
                $cart           = new Cart($abandonedCartId);

                $productShopsResult = array();
                $productAssociatedShops = $product->getAssociatedShops();
                foreach ($productAssociatedShops as $shopId) {
                    $productShopsResult[] = array(
                        self::KEY_SHOP_ID => (int)$shopId
                    );
                }

                if (version_compare(_PS_VERSION_, '1.6', '>=')) {
                    $productPrice = $product->getPriceWithoutReduct(true);
                } else {
                    // base_price is deprecated from @deprecated 1.6.0.13
                    $productPrice = $this->round(
                        (property_exists($product, 'base_price') ? $product->base_price : 0)
                    );
                }

                if (empty($productPrice)) {
                    $productPrice = $this->round(
                        (property_exists($product, 'base_price') ? $product->base_price : 0)
                    );
                }

                $cartProducts[] = array(
                    self::KEY_PRODUCT_ID                        => (int)$product->id,
                    self::KEY_PRODUCT_ATTRIBUTE_ID              => (int)$productValue[self::KEY_ID_PRODUCT_ATTRIBUTE],
                    self::KEY_CART_ID                           => (int)$abandonedCartId,
                    self::KEY_PRODUCT_NAME                      => (string)(is_array($product->name)
                        ? $product->name[$this->languageId]
                        : $product->name
                    ),
                    self::KEY_REFERENCE                         => (string)$product->reference,
                    self::KEY_QUANTITY                          => (int)$productValue[self::KEY_QUANTITY],
                    self::KEY_FORMATTED_TOTAL_PRICE_WITHOUT_TAX => $this->displayPrice(
                        $productPrice,
                        $this->currencyId,
                        $cart->id_lang
                    ),
                    self::KEY_IMAGE_URL                         => $this->getProductCoverImageUrl(
                        $product->id,
                        (is_array($product->name)
                            ? $product->link_rewrite[$this->languageId]
                            : $product->link_rewrite
                        )
                    ),
                    self::KEY_SHOPS                             => $productShopsResult
                );
            } catch (PrestaShopException $exception) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_CART_ID_IS_INCORRECT, $exception->getMessage());
            }
        }

        return array(self::KEY_PRODUCTS => $cartProducts);
    }

    private function getAbandonedCartCustomerData($customerId)
    {
        // Create Customer object and get current cart total and products count
        /** @var CustomerCore $cartCustomer */
        $customer = new Customer((int)$customerId);
        if (Validate::isLoadedObject($customer)) {
            return array(
                self::KEY_CUSTOMER_FIRST_NAME           => (string)$customer->firstname,
                self::KEY_CUSTOMER_LAST_NAME            => (string)$customer->lastname,
                self::KEY_CUSTOMER_EMAIL                => (string)$customer->email,
                self::KEY_CUSTOMER_REGISTRATION_DATE    => self::convertTimestampToMillisecondsTimestamp(
                    strtotime($customer->date_add)
                )
            );
        }

        return array(
            self::KEY_CUSTOMER_FIRST_NAME           => '',
            self::KEY_CUSTOMER_LAST_NAME            => '',
            self::KEY_CUSTOMER_EMAIL                => '',
            self::KEY_CUSTOMER_REGISTRATION_DATE    => 0
        );
    }

    /**
     * Get product cover image url link
     *
     * @param $productId    int     Product Id
     * @param $linkRewrite  string  Product Link Rewrite
     * @param $imageName    string  Image Type
     *
     * @return              string  Returns product cover image url link
     */
    private function getProductCoverImageUrl($productId, $linkRewrite, $imageName = self::IMAGE_NAME_TYPE_HOME)
    {
        $image = Product::getCover($productId);

        return $this->getProductImageUrl($linkRewrite, (int)$image[self::KEY_ID_IMAGE], $imageName);
    }

    /**
     * Get product image url link
     *
     * @param $linkRewrite  string  Product Link Rewrite
     * @param $imageId      int     Image Id
     * @param $imageName    string  Image Type
     *
     * @return              string  Returns product image url link
     */
    private function getProductImageUrl($linkRewrite, $imageId, $imageName = self::IMAGE_NAME_TYPE_HOME)
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
     * Get abandoned carts ids and additional information
     *
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  array   Return array with result or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    private function getAbandonedCartsInformation($pageSize, $pageIndex)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryResult(
            $dbQuery->select(
                'cart.id_cart, 
                SUM(
                    (product_shop.price + IFNULL(product_attribute_shop.price, 0)) * cart_product.quantity
                ) AS cart_total,
                COUNT(cart_product.id_product) AS cart_count_products'
            )
                ->from('cart', 'cart')
                ->innerJoin('cart_product', 'cart_product', 'cart_product.id_cart = cart.id_cart')
                ->leftJoin(
                    'product_shop',
                    'product_shop',
                    'product_shop.id_product = cart_product.id_product' .
                    ' AND product_shop.id_shop = cart_product.id_shop'
                )
                ->leftJoin(
                    'product_attribute_shop',
                    'product_attribute_shop',
                    'product_attribute_shop.id_product_attribute = cart_product.id_product_attribute 
                        AND product_attribute_shop.id_shop = cart_product.id_shop'
                )
                ->leftJoin('orders', 'orders', 'orders.id_cart = cart.id_cart')
                ->leftJoin('customer', 'customer', 'cart.id_customer = customer.id_customer')
                ->where($this->whereQuery)
                ->groupBy('cart.id_cart')
                ->orderBy($this->orderByQuery)
                ->limit($pageSize, $this->getLimitOffset($pageSize, $pageIndex))
        );
    }

    /**
     * Get abandoned carts count and total
     *
     * @return                  array   Return array with result or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    private function getAbandonedCartsCountAndTotal()
    {
        // Execute query after build it
        return self::getQueryRow(
            'SELECT COUNT(sum.`id_cart`) AS cart_count, SUM(sum.`cart_total`) AS cart_total FROM (
                    SELECT cart.id_cart, 
                           SUM(
                               (product_shop.price + IFNULL(product_attribute_shop.price, 0)) * cart_product.quantity
                           ) AS cart_total 
                    FROM ' . _DB_PREFIX_ . 'cart cart
                    INNER JOIN ' . _DB_PREFIX_ . 'cart_product cart_product ON cart_product.id_cart = cart.id_cart
                    LEFT JOIN ' . _DB_PREFIX_ . 'product_shop product_shop 
                        ON product_shop.id_product = cart_product.id_product 
                        AND product_shop.id_shop = cart_product.id_shop
                    LEFT JOIN ' . _DB_PREFIX_ . 'product_attribute_shop product_attribute_shop 
                        ON product_attribute_shop.id_product_attribute = cart_product.id_product_attribute 
                        AND product_attribute_shop.id_shop = cart_product.id_shop
                    LEFT JOIN ' . _DB_PREFIX_ . 'orders orders ON orders.id_cart = cart.id_cart
                    LEFT JOIN ' . _DB_PREFIX_ . 'customer customer ON customer.id_customer = cart.id_customer
                    WHERE ' . $this->whereQuery . '
                    GROUP BY cart.id_cart
            ) AS sum'
        );
    }

    /**
     * Get abandoned cart count and total
     *
     * @param $abandonedCartId  int     Cart Id
     *
     * @return                  array   Return array with result or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    private function getAbandonedCartCountAndTotal($abandonedCartId)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryRow(
            $dbQuery->select(
                'COUNT(cart_product.id_cart) AS products_count,
                        SUM(
                            (product_shop.price + IFNULL(product_attribute_shop.price, 0)) * cart_product.quantity
                        ) AS cart_total'
            )
            ->from('cart', 'cart')
            ->innerJoin('cart_product', 'cart_product', 'cart_product.id_cart = cart.id_cart')
            ->leftJoin(
                'product_shop',
                'product_shop',
                'product_shop.id_product = cart_product.id_product AND product_shop.id_shop = cart_product.id_shop'
            )
            ->leftJoin(
                'product_attribute_shop',
                'product_attribute_shop',
                'product_attribute_shop.id_product_attribute = cart_product.id_product_attribute 
                                    AND product_attribute_shop.id_shop = cart_product.id_shop'
            )
            ->leftJoin('orders', 'orders', 'orders.id_cart = cart.id_cart')
            ->leftJoin('customer', 'customer', 'cart.id_customer = customer.id_customer')
            ->where($this->whereQuery . ' AND cart.id_cart = ' . $abandonedCartId)
            ->groupBy('cart.id_cart')
        );
    }

    /**
     * Get abandoned cart product ids and additional information
     *
     * @param $abandonedCartId  int     Cart Id
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  array   Return array with result or error code if fails
     *
     * @throws EM1Exception Custom exception
     */
    private function getAbandonedCartProductsInformation($abandonedCartId, $pageSize, $pageIndex)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryResult(
            $dbQuery->select('cart_product.id_product_attribute, cart_product.id_product, cart_product.quantity')
                ->from('cart', 'cart')
                ->innerJoin('cart_product', 'cart_product', 'cart_product.id_cart = cart.id_cart')
                ->where('cart.`id_cart`=' . $abandonedCartId)
                ->limit($pageSize, $this->getLimitOffset($pageSize, $pageIndex))
        );
    }

    /**
     * Prepare where and order by query parts before using in queries
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     * @param $sortField        string  Sorting field based on which sort is applying
     * @param $sortDirection    string  Sorting direction (means, ascending or descending)
     *
     * @return                  void    initiate instance variables with values
     *
     * @throws EM1Exception Custom exception
     */
    private function prepareParameters(
        $dateFrom,
        $dateTo,
        $sortField,
        $sortDirection
    ) {
        // Prepare query parts:
        // Prepare sorting parameters
        $this->orderByQuery = $this->getOrderBy($sortField, $sortDirection);

        // Prepare where query parts
        // Only abandoned carts
        $this->whereQuery  .= ' AND orders.id_order IS NULL ';
        // Add Shop restrictions
        $this->whereQuery  .= Shop::addSqlRestriction(Shop::SHARE_ORDER, 'cart');
        // Add date range where part
        $this->whereQuery  .= $this->prepareDateRangeWherePart($dateFrom, $dateTo);
    }

    /**
     * Prepare date range query part before using in where statement
     *
     * @param $dateFrom         int     Date from get information in format of timestamp with milliseconds
     * @param $dateTo           int     Date to get information in format of timestamp with milliseconds
     *
     * @return                  string  Return part of where statement and date range values
     */
    private function prepareDateRangeWherePart($dateFrom, $dateTo)
    {
        // Prepare dates range query part
        if (!empty($dateFrom) && !empty($dateTo) && $dateTo !== -1 && $dateFrom !== -1) {
            return /** @lang MySQL */
                " AND cart.`date_add` >= '" . date(
                    EM1Constants::GLOBAL_DATE_FORMAT,
                    self::convertMillisecondsTimestampToTimestamp($dateFrom)
                ) . "' AND cart.`date_add` <= '" . date(
                    EM1Constants::GLOBAL_DATE_FORMAT,
                    self::convertMillisecondsTimestampToTimestamp($dateTo)
                ) . "' ";
        }

        return '';
    }

    /**
     * Prepare search query part before using in where statement
     *
     * @param $searchPhrase     string  Search phrase
     *
     * @return                  string  Returns part of where statement and search condition values
     */
    private function prepareSearchDataWherePart($searchPhrase)
    {
        if (preg_match('/^\d+(?:,\d+)*$/', $searchPhrase)) {
            return /** @lang MySQL */ ' AND cart.`id_cart` IN (' . pSQL($searchPhrase) . ') ';
        }

        return /** @lang MySQL */ " AND (
          CONCAT(customer.`firstname`, ' ', customer.`lastname`) LIKE '%" . pSQL($searchPhrase) . "%' OR 
          customer.`email` LIKE '%" . pSQL($searchPhrase) . "%'
        ) ";
    }

    /**
     * Get limit offset value based on pageSize and pageIndex
     *
     * @param $pageSize         int     Pagination page size number
     * @param $pageIndex        int     Pagination page index number
     *
     * @return                  int     Returns query limit offset value
     */
    private function getLimitOffset($pageSize, $pageIndex)
    {
        $limitOffset = 0;
        if ($pageIndex) {
            $limitOffset  = ($pageIndex - 1) * $pageSize;
        }

        return $limitOffset ?: 0;
    }

    /**
     * Get order by query part
     *
     * @param $sortField        string  Sorting field based on which sort is applying
     * @param $sortDirection    string  Sorting direction (means, ascending or descending)
     *
     * @return                  string  Returns order query part
     *
     * @throws EM1Exception Custom exception
     */
    private function getOrderBy($sortField, $sortDirection)
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
     * Formatted abandoned carts response
     *
     * @param $abandonedCarts   array           Array with formatted abandoned carts
     *
     * @return                  void            Returns json formatted response (Content-Type: application/json)
     *
     * @throws                  EM1Exception    Custom exception
     */
    private function abandonedCartsResponse($abandonedCarts = array())
    {
        $abandonedCartsCountAndTotal = $this->getAbandonedCartsCountAndTotal();
        self::generateResponse(
            array(
                self::KEY_CARTS                 => $abandonedCarts,
                self::KEY_CARTS_COUNT           => $abandonedCartsCountAndTotal[self::KEY_CART_COUNT],
                self::KEY_FORMATTED_CARTS_TOTAL => $this->displayPrice(
                    $abandonedCartsCountAndTotal[self::KEY_CART_TOTAL],
                    $this->currencyId,
                    $this->languageId
                )
            )
        );
    }

    /**
     * Formatted abandoned cart response
     *
     * @param $abandonedCart   array    Array with formatted abandoned cart
     *
     * @return                 void     Returns json formatted response (Content-Type: application/json)
     */
    private function abandonedCartResponse($abandonedCart)
    {
        self::generateResponse(
            array(self::KEY_CART => $abandonedCart)
        );
    }
}

/**
 * Included files
 */
function includedAbandonedCartFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME
        . '/classes/abandoned_cart/EM1AbandonedCartInterface.php';
}
