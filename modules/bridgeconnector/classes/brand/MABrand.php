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

includeBrandFiles();

/**
 * Class MABrand
 */
class MABrand extends EM1Main implements EM1BrandInterface
{
    /**
     * @throws EM1Exception
     */
    public function getManufacturers()
    {
        $responseArray = [
            'manufacturers' => []
        ];
        try {
            $brands = $this->getBrandsList();
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_PRODUCT_NOT_FOUND, $exception->getMessage());
        }

        $manufacturers = [];
        foreach ($brands as $brand) {
            $shops = [];
            foreach ($brand->getAssociatedShops() as $shopId) {
                $shops[] = [
                    'shop_id' => (int)$shopId
                ];
            }
            $manufacturers[] = [
                'manufacturer_id' => (int)$brand->id,
                'name'            => (string)$brand->name,
                'shops'           => $shops
            ];
            unset($brand);
        }
        $responseArray['manufacturers'] = $manufacturers;
        self::generateResponse($responseArray);
    }

    /**
     * get array of Manufacturer objects
     *
     * @return array
     */
    public function getBrandsList()
    {
        // workaround for executing sql with `group by` statement
        $brandsArray = Manufacturer::getManufacturers(
            true,
            0,
            true,
            false,
            false,
            false,
            true
        );
        $brandsList = [];
        foreach ($brandsArray as $brand) {
            $brandsList[] = $this->getBrand($brand['id_manufacturer']);
        }

        return $brandsList;
    }

    /**
     * @param $brandId
     * @return Manufacturer
     */
    public function getBrand($brandId)
    {
        return new Manufacturer($brandId);
    }
}

/**
 * Included files
 */
function includeBrandFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/brand/EM1BrandInterface.php';
}
