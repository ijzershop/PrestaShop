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

includedProductCombinationFiles();

/**
 * Class MAProductCombination
 */
class MAProductCombination extends EM1Main implements EM1ProductCombinationInterface
{
    private $languageId;

    /**
     * MAProductCombination constructor.
     * @param null $languageId
     */
    public function __construct($languageId = null)
    {
        if ($languageId === null) {
            $this->languageId = self::getDefaultLanguageId();
        } else {
            $this->languageId = $languageId;
        }
    }

    public static function productEditCombinationDto($combinationId, $productObject, $shopIds, $languageId)
    {
        $combinationObject = new Combination($combinationId);
        $imageIds = [];
        foreach (Image::getImages($languageId, $combinationObject->id_product, $combinationObject->id) as $image) {
            $imageIds[] = (int)$image['id_image'];
        }
//        if ($imageIds === [] && $coverImage = Image::getGlobalCover($combinationObject->id_product)) {
//            $imageIds[] = (int)$coverImage['id_image'];
//        }

        $shops = [];
        foreach ($shopIds as $shopId) {
            $combinationShopObject = new Combination($combinationId, null, $shopId);
            if ($combinationShopObject->id_product === null) {
                continue;
            }
            $shops[] = self::productEditCombinationToShopDto(
                $combinationShopObject,
                $shopId,
                $productObject,
                $languageId
            );
            unset($combinationShopObject);
        }

        return [
            'combination_id' => (int)$combinationObject->id,
            'name'           => (string)self::getCombinationName($combinationObject, $languageId),
            'reference'      => (string)$combinationObject->reference,
            'ean13'          => (string)$combinationObject->ean13,
            'isbn'           => (string)$combinationObject->isbn,
            'upc'            => (string)$combinationObject->upc,
            'location'       => (string)$combinationObject->location,
            'image_ids'      => $imageIds,
            'shops'          => $shops
        ];
    }

    /**
     * workaround for productEditCombinationDto
     *
     * @param $combinationObject
     * @param null $languageId
     * @return string
     */
    public static function getCombinationName($combinationObject, $languageId)
    {
        $combinationName = [];
        $attributesList = Attribute::getAttributes($languageId);
        $combinationAttributesNames = $combinationObject->getAttributesName($languageId);
        foreach ($combinationAttributesNames as $combinationAttributesName) {
            foreach ($attributesList as $attribute) {
                if ($attribute['id_attribute'] !=
                    $combinationAttributesName['id_attribute']) {
                    continue;
                }
                $combinationName[] =
                    $attribute['public_name'] .
                    ' - ' .
                    $attribute['name'];
            }
        }

        return implode(', ', $combinationName);
    }

    public static function productEditCombinationToShopDto($combinationObject, $shopId, $productObject, $languageId)
    {
        $availableDate = null;
        if ($combinationObject->available_date !== '0000-00-00') {
            $availableDate = (int)self::convertTimestampToMillisecondsTimestamp(
                strtotime($combinationObject->available_date)
            );
        }

        $shop = new Shop($shopId);
        return [
            'shop_id'               => (int)$shop->id,
            'is_default'            => (bool)$shop->isDefaultShop(),
            'quantity'              => (int)StockAvailable::getQuantityAvailableByProduct(
                $combinationObject->id_product,
                $combinationObject->id,
                $shop->id
            ),
            'available_date'        => $availableDate,
            'min_quantity_for_sale' => (int)$combinationObject->minimal_quantity,
            'low_stock_threshold'   => (int)$combinationObject->low_stock_threshold,
            'low_stock_alert'       => (bool)$combinationObject->low_stock_alert,
            'wholesale_price'       => (float)$combinationObject->wholesale_price,
            'price_impact'          => (float)$combinationObject->price,
            'unit_price_impact'     => (float)$combinationObject->unit_price_impact,
            'weight_impact'         => (float)$combinationObject->weight,
            'final_price'           => self::displayPrice(
                $productObject->getPriceWithoutReduct(false, $combinationObject->id),
                Currency::getDefaultCurrency()->id,
                $languageId
            )
        ];
    }

    public static function getShopIdByCombinationId($combinationId)
    {
        $queryResult = self::getQueryResult('
            SELECT 
                id_shop
            FROM ' . _DB_PREFIX_ . 'product_attribute_shop
            WHERE id_product_attribute = ' . (int)$combinationId . ' LIMIT 1');
        return (int)$queryResult[0]['id_shop'];
    }

    public static function getProductCombinationsCount($productId, $shopId = null)
    {
        if ($shopId === null || $shopId === -1) {
            $queryResult = self::getQueryResult('
                SELECT COUNT(*) AS cnt FROM 
                (
                    SELECT pa.id_product_attribute
                    FROM ' . _DB_PREFIX_ . 'product_attribute pa
                    WHERE pa.id_product = ' . (int)$productId . '
                    GROUP BY pa.id_product_attribute
                ) AS t');
            return (int)$queryResult[0]['cnt'];
        }
        $queryResult = self::getQueryResult('
            SELECT 
                COUNT(pa.id_product_attribute) AS cnt
            FROM ' . _DB_PREFIX_ . 'product_attribute pa
            INNER JOIN ' . _DB_PREFIX_ . 'product_attribute_shop pas ON
            (pas.id_product_attribute = pa.id_product_attribute
            AND pas.id_shop IN ('. $shopId .'))
            WHERE pa.id_product = ' . (int)$productId);
        return (int)$queryResult[0]['cnt'];
    }

    /**
     * @param $productId
     * @param $shopId
     * @param $attributes
     * @param $pageIndex
     * @param $pageSize
     * @throws EM1Exception
     */
    public function generateProductCombinations($productId, $shopId, $attributes, $pageIndex, $pageSize)
    {
        $responseArray = [
            'combinations'       => [],
            'combinations_count' => 0
        ];

        if ($shopId === null || $shopId === -1) {
            $shopIds = Shop::getShops(true, null, true);
        } else {
            $shopIds = [$shopId];
        }

        try {
            $productObject = new Product($productId, false, null, $shopId);
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }
        $this->generateProductCombinationsByAttributeIds($productObject, $attributes);
        $combinationsIds = self::getProductCombinationIds($productId, $shopIds);
        foreach ($combinationsIds as $combination) {
            $responseArray['combinations'][] = self::productEditCombinationDto(
                $combination['id_product_attribute'],
                $productObject,
                $shopIds,
                $this->languageId
            );
        }
        $responseArray['combinations'] =
            array_slice($responseArray['combinations'], ($pageIndex - 1) * $pageSize, $pageSize);
        $responseArray['combinations_count'] = self::getProductCombinationsCount($productId, $shopId);
        self::generateResponse($responseArray);
    }

    /**
     * easily generate product combinations
     *
     * @param $productObject
     * @param $attributeIds
     * @return array
     * @throws EM1Exception
     */
    private function generateProductCombinationsByAttributeIds($productObject, $attributeIds)
    {
        $options = [];
        foreach ($attributeIds as $attributeId) {
            $attributeGroupId = $this->getAttributeGroupIdByAttributeId($attributeId);
            $options[$attributeGroupId][] = $attributeId;
        }
        $combinations = array_values(AdminAttributeGeneratorController::createCombinations(array_values($options)));
        $combinationsValues = array_values(array_map(function () use ($productObject) {
            return array(
                'id_product' => $productObject->id,
            );
        }, $combinations));

        $productObject->generateMultipleCombinations($combinationsValues, $combinations, false);

        Product::updateDefaultAttribute($productObject->id);
        SpecificPriceRule::enableAnyApplication();
        SpecificPriceRule::applyAllRules(array((int) $productObject->id));

        return $this->getLastGeneratedProductCombinationsIds($productObject->id, count($combinationsValues));
    }

    /**
     * workaround for generate_product_combinations
     *
     * @param $attributeId
     * @return int
     * @throws EM1Exception
     */
    private function getAttributeGroupIdByAttributeId($attributeId)
    {
        $dbQuery = new DbQuery();

        $attributesTableData =  self::getQueryResult(
            $dbQuery->select(
                'id_attribute_group'
            )
                ->from('attribute')
                ->where('id_attribute = ' . $attributeId)
        );

        return (int)$attributesTableData[0]['id_attribute_group'];
    }

    /**
     * workaround for generate_product_combinations
     *
     * @param $productId
     * @param $numberOfCombinations
     * @return array
     * @throws EM1Exception
     */
    private function getLastGeneratedProductCombinationsIds($productId, $numberOfCombinations)
    {
        $dbQuery = new DbQuery();

        return self::getQueryResult(
            $dbQuery->select(
                'id_product_attribute'
            )
                ->from('product_attribute')
                ->where('id_product = ' . $productId)
                ->orderBy('id_product_attribute DESC')
                ->limit($numberOfCombinations)
        );
    }

    /**
     * @param $productId
     * @param $shopId
     * @param $pageIndex
     * @param $pageSize
     * @throws EM1Exception
     */
    public function getProductEditCombinations($productId, $shopId, $pageIndex, $pageSize)
    {
        if ($shopId === null || $shopId === -1) {
            $shopIds = Shop::getShops(true, null, true);
        } else {
            $shopIds = $shopId;
        }
        $combinationIds = self::getProductCombinationIds($productId, $shopIds);
        $responseArray = [
            'combinations'       => [],
            'combinations_count' => self::getProductCombinationsCount($productId, $shopId)
        ];
        $productObject = new Product($productId);
        foreach ($combinationIds as $combination) {
            $responseArray['combinations'][] = self::productEditCombinationDto(
                $combination['id_product_attribute'],
                $productObject,
                $shopIds,
                self::getDefaultLanguageId()
            );
        }
        $responseArray['combinations'] = array_slice(
            $responseArray['combinations'],
            ($pageIndex - 1) * $pageSize,
            $pageSize
        );
        self::generateResponse($responseArray);
    }

    public static function getProductCombinationIds($productId, $shopIds)
    {
        return self::getQueryResult('
            SELECT 
                DISTINCT(pa.id_product_attribute)
            FROM ' . _DB_PREFIX_ . 'product_attribute pa
            INNER JOIN ' . _DB_PREFIX_ . 'product_attribute_shop pas ON
            (pas.id_product_attribute = pa.id_product_attribute
            AND pas.id_shop IN ('. implode(',', $shopIds) .'))
            WHERE pa.id_product = ' . (int)$productId);
    }

    /**
     * @param $combination
     * @throws EM1Exception
     */
    public function saveProductCombination($combination)
    {
        try {
            $combinationObject = $this->getProductCombination($combination['combination_id']);
            foreach ($combination as $field => $value) {
                if ($field === 'location' && $value !== null) {
                    StockAvailable::setLocation(
                        $combinationObject->id_product,
                        $value,
                        null,
                        $combinationObject->id
                    );
                } elseif (!is_array($value) && $value !== null) {
                    $combinationObject->$field = $value;
                } elseif ($field === 'image_ids' && $value !== null) {
                    $combinationObject->setImages($value);
                }
            }
            $combinationObject->save();
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_DATA_NOT_UPDATED, $exception->getMessage());
        }
        try {
            if ($combination['shops'] !== null) {
                foreach ($combination['shops'] as $shopField) {
                    if ($shopField['shop_id'] === -1) {
                        $shops = array_keys(Shop::getShops());
                    } else {
                        $shops = [$shopField['shop_id']];
                    }
                    foreach ($shops as $shopId) {
                        $combinationObjectShop = $this->getProductCombination($combination['combination_id'], $shopId);
                        $combinationObjectShopData = $this->getPreparedCombinationShopData(
                            $combination['combination_id'],
                            $shopId,
                            $shopField
                        );
                        StockAvailable::setQuantity(
                            $combinationObject->id_product,
                            $combinationObject->id,
                            $combinationObjectShopData['quantity'],
                            $shopId
                        );
                        $combinationObjectShop->available_date = $combinationObjectShopData['available_date'];
                        $combinationObjectShop->minimal_quantity = $combinationObjectShopData['min_quantity_for_sale'];
                        $combinationObjectShop->low_stock_threshold = $combinationObjectShopData['low_stock_threshold'];
                        $combinationObjectShop->low_stock_alert = $combinationObjectShopData['low_stock_alert'];
                        $combinationObjectShop->wholesale_price = $combinationObjectShopData['wholesale_price'];
                        $combinationObjectShop->price = $combinationObjectShopData['price_impact'];
                        $combinationObjectShop->unit_price_impact = $combinationObjectShopData['unit_price_impact'];
                        $combinationObjectShop->weight = $combinationObjectShopData['weight_impact'];
                        try {
                            $combinationObjectShop->save();
                        } catch (Exception $exception) {
                            throw new EM1Exception(EM1Exception::ERROR_CODE_DATA_NOT_UPDATED, $exception->getMessage());
                        }
                    }
                }
            }
            unset($combinationObject);
            $combinationObject = $this->getProductCombination($combination['combination_id']);
            $productObject = new Product($combinationObject->id_product);
            $responseArray = [
                'final_price' => $this->displayPrice(
                    $combinationObject->price + $productObject->price,
                    Currency::getDefaultCurrency()->id,
                    Configuration::get('PS_LANG_DEFAULT')
                )];
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_DATA_NOT_UPDATED, $exception->getMessage());
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $combinationId
     * @param $shopId
     * @param $shop
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function getPreparedCombinationShopData($combinationId, $shopId, $shop)
    {
        $combinationObject = $this->getProductCombination($combinationId, $shopId);
        $combinationObjectShopData = [
            'quantity'              => $combinationObject->quantity,
            'available_date'        => $combinationObject->available_date,
            'min_quantity_for_sale' => $combinationObject->minimal_quantity,
            'low_stock_threshold'   => $combinationObject->low_stock_threshold,
            'low_stock_alert'       => $combinationObject->low_stock_alert,
            'wholesale_price'       => $combinationObject->wholesale_price,
            'price_impact'          => $combinationObject->price,
            'unit_price_impact'     => $combinationObject->unit_price_impact,
            'weight_impact'         => $combinationObject->weight
        ];
        foreach ($shop as $key => $value) {
            if ($key === 'available_date' && $value !== null) {
                $combinationObjectShopData[$key] = date('Y-m-d', self::convertMillisecondsTimestampToTimestamp($value));
            } elseif ($value !== null) {
                $combinationObjectShopData[$key] = $value;
            }
        }
        return $combinationObjectShopData;
    }

    /**
     * @param $combinationId
     * @param null $shopId
     * @return Combination
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getProductCombination($combinationId, $shopId = null)
    {
        return new Combination(
            $combinationId,
            null,
            $shopId
        );
    }

    /**
     * @param $productId
     * @param $shopId
     * @throws EM1Exception
     */
    public function getProductEditSpecificPriceCombinations($productId, $shopId)
    {
        $responseArray = ['combinations' => []];
        $combinations = $this->getProductCombinations($productId, $shopId);
        $languageId = self::getDefaultLanguageId();
        foreach ($combinations as $combination) {
            $combinationName = [];
            $attributesList = Attribute::getAttributes($languageId);
            $combinationAttributesNames = $combination->getAttributesName($languageId);
            foreach ($combinationAttributesNames as $combinationAttributesName) {
                foreach ($attributesList as $attribute) {
                    if ($attribute['id_attribute'] !=
                        $combinationAttributesName['id_attribute']) {
                        continue;
                    }
                    $combinationName[] =
                        $attribute['public_name'] .
                        ' - ' .
                        $attribute['name'];
                }
            }
            $responseArray['combinations'][] = [
                'combination_id' => (int)$combination->id,
                'name'           => (string)implode(', ', $combinationName)
            ];
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $productId
     * @param null $shopId
     * @return array
     * @throws EM1Exception
     */
    public function getProductCombinations($productId, $shopId = null)
    {
        $productCombinations = self::getQueryResult('
            SELECT *
            FROM ' . _DB_PREFIX_ . 'product_attribute pa' .
            Shop::addSqlAssociation('product_attribute', 'pa') . '
            WHERE pa.id_product = ' . (int)$productId . '
            GROUP BY pa.id_product_attribute');
        $combinations = [];
        foreach ($productCombinations as $combination) {
            try {
                $combinationObject = new Combination($combination['id_product_attribute'], null, $shopId);
            } catch (Exception $exception) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
            }
            $combinations[] = $combinationObject;
            unset($combinationObject);
        }
        return $combinations;
    }

    /**
     * @param $combinationId
     * @param $shopId
     * @throws EM1Exception
     */
    public function deleteProductCombination($combinationId, $shopId)
    {
        if (!Combination::existsInDatabase($combinationId, 'product_attribute')) {
            throw new EM1Exception(EM1Exception::ERROR_COMBINATION_NOT_FOUND);
        }
        try {
            $productCombination = $this->getProductCombination($combinationId, $shopId);
            $productId = $productCombination->id_product;
            $productCombination->delete();
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }
        if ($productId === null) {
            throw new EM1Exception(EM1Exception::ERROR_COMBINATION_NOT_FOUND);
        }
        self::generateResponse(
            [
                'combinations_count' => self::getProductCombinationsCount($productId, $shopId)
            ]
        );
    }
}

/**
 *
 */
function includedProductCombinationFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' .
        EM1Constants::MODULE_NAME . '/classes/product/EM1ProductCombinationInterface.php';
}
