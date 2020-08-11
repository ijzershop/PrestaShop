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

includedOtherFiles();

class MAOther extends EM1Main
{
    /**
     * @throws EM1Exception
     */
    public function getCountries()
    {
        $responseArray = [
            'countries' => []
        ];
        try {
            $countries = $this->getCountriesArray();
            foreach ($countries as $countryId => $country) {
                $responseArray['countries'][] = [
                    'country_id'  => (int)$countryId,
                    'shops'       => $country['shops'],
                    'languages'   => $country['languages']
                ];
            }
        } catch (Exception $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $e->getMessage());
        }

        self::generateResponse($responseArray);
    }

    /**
     * @return array
     * @throws PrestaShopDatabaseException
     */
    private function getCountriesArray()
    {
        $countriesArray = [];
        $languageIds = Language::getLanguages(true, false, true);
        foreach ($languageIds as $languageId) {
            $countries = Country::getCountries($languageId);
            foreach ($countries as $country) {
                if (!array_key_exists($country['id_country'], $countriesArray)) {
                    $countriesArray[$country['id_country']] = [
                        'shops' => $this->getCountryShops($country['id_country'])
                    ];
                }
                $countriesArray[$country['id_country']]['languages'][] = [
                    'language_id' => (int)$languageId,
                    'name' => $country['name']
                ];
            }
        }
        return $countriesArray;
    }

    /**
     * @param $countryId
     * @return array|false|mysqli_result|PDOStatement|resource|null
     * @throws PrestaShopDatabaseException
     */
    private function getCountryShops($countryId)
    {
        $countryShopIds = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
		SELECT id_shop as shop_id
		FROM `' . _DB_PREFIX_ . 'country_shop` c
		WHERE `id_country` = ' . (int)$countryId);
        foreach ($countryShopIds as $key => $countryShopId) {
            foreach ($countryShopId as $index => $value) {
                $countryShopIds[$key][$index] = (int)$value;
            }
        }
        return $countryShopIds;
    }

    public function getGroups()
    {
        $responseArray = [
            'groups' => []
        ];
        $languageIds = Language::getLanguages(true, false, true);
        $groupsResponse = [];
        foreach ($languageIds as $languageId) {
            $groups = Group::getGroups($languageId);
            foreach ($groups as $group) {
                if (!array_key_exists($group['id_group'], $groupsResponse)) {
                    $groupsResponse[$group['id_group']]['group_id'] = (int)$group['id_group'];
                }
                $groupsResponse[$group['id_group']]['languages'][] = [
                    'language_id' => (int)$languageId,
                    'name' => (string)$group['name']
                ];
            }
        }

        $responseArray['groups'] = array_values($groupsResponse);

        self::generateResponse($responseArray);
    }

    /**
     * @throws EM1Exception
     */
    public function getTaxRulesGroups()
    {
        $responseArray = [
            'tax_rules_groups' => []
        ];

        $taxRulesGroups = TaxRulesGroup::getTaxRulesGroups();
        try {
            foreach ($taxRulesGroups as $taxRulesGroup) {
                $responseArray['tax_rules_groups'][] = $this->getTaxRulesGroupDto($taxRulesGroup);
            }
        } catch (Exception $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_UNKNOWN, $exception->getMessage());
        }

        self::generateResponse($responseArray);
    }

    /**
     * @param $taxRulesGroup
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function getTaxRulesGroupDto($taxRulesGroup)
    {
        $returnArray = [
            'tax_rule_group_id' => (int)$taxRulesGroup['id_tax_rules_group'],
            'name'              => $taxRulesGroup['name'],
            'shops'             => []
        ];

        $taxRulesGroup = new TaxRulesGroup($taxRulesGroup['id_tax_rules_group']);
        $shopIds = $taxRulesGroup->getAssociatedShops();

        foreach ($shopIds as $shopId) {
            $returnArray['shops'][] = $this->getTaxRulesGroupToShopDto($shopId);
        }

        return $returnArray;
    }

    /**
     * @param $shopId
     * @return array
     */
    private function getTaxRulesGroupToShopDto($shopId)
    {
        return [
            'shop_id' => (int)$shopId
        ];
    }

    public function getProductEditAttributes($shopId)
    {
        $responseArray = [
            'attribute_groups' => []
        ];

        if ($shopId === -1 || $shopId === null) {
            Shop::setContext(Shop::CONTEXT_SHOP, (int)Configuration::get('PS_SHOP_DEFAULT'));
        } else {
            Shop::setContext(Shop::CONTEXT_SHOP, (int)$shopId);
        }

        $attributeGroups = AttributeGroup::getAttributesGroups(self::getDefaultLanguageId());
        foreach ($attributeGroups as $attributeGroup) {
            $responseArray['attribute_groups'][] = $this->getAttributesGroupDto($attributeGroup);
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $attributeGroupData
     * @return array
     */
    private function getAttributesGroupDto($attributeGroupData)
    {
        $returnArray = [
            'attribute_group_id' => (int)$attributeGroupData['id_attribute_group'],
            'name'               => $attributeGroupData['name'],
            'type'               => $attributeGroupData['group_type'],
            'attributes'         => []
        ];

        $attributes = AttributeGroup::getAttributes(
            self::getDefaultLanguageId(),
            $attributeGroupData['id_attribute_group']
        );
        $attributesReturn = [];
        foreach ($attributes as $attribute) {
            $attributesReturn[$attribute['id_attribute']] = $this->getAttributeDto($attribute);
        }
        $returnArray['attributes'] = array_values($attributesReturn);

        return $returnArray;
    }

    /**
     * @param $attributeData
     * @return array
     */
    private function getAttributeDto($attributeData)
    {
        $textureUrl = str_replace(
            getcwd() . '/',
            '',
            _PS_COL_IMG_DIR_ . $attributeData['id_attribute'] . '.jpg'
        );
        $textureUrl = Context::getContext()->link->getBaseLink() . $textureUrl;
        if (!file_exists(_PS_COL_IMG_DIR_ . $attributeData['id_attribute'] . '.jpg')) {
            $textureUrl = null;
        }
        $returnArray = [
            'attribute_id' => (int)$attributeData['id_attribute'],
            'name'         => $attributeData['name'],
            'color'        => $attributeData['color'] ? $attributeData['color'] : null,
            'texture_url'  => $textureUrl
        ];

        return $returnArray;
    }
}

function includedOtherFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
}
