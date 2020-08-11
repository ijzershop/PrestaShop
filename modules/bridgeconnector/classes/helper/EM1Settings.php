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

class EM1Settings extends EM1Main
{
    const KEY_STORE_TITLE           = 'store_title';
    const KEY_SHOP_GROUP_ID         = 'shop_group_id';
    const KEY_NAME                  = 'name';
    const KEY_SHOPS                 = 'shops';
    const KEY_SHARE_ORDERS          = 'share_orders';
    const KEY_SHARE_CUSTOMERS       = 'share_customers';
    const KEY_SHARE_STOCK           = 'share_stock';
    const KEY_IS_DEFAULT            = 'is_default';
    const KEY_SHOP_ID               = 'shop_id';
    const KEY_SHOW_SHOP_TREE        = 'show_shop_tree';
    const KEY_SHOP_GROUPS           = 'shop_groups';
    const KEY_TOKEN                 = 'token';
    const KEY_CURRENCIES            = 'currencies';
    const KEY_ID                    = 'id';
    const KEY_COLOR                 = 'color';
    const KEY_LANGUAGE_ID           = 'language_id';
    const KEY_ISO_CODE              = 'iso_code';
    const KEY_LANGUAGES             = 'languages';
    const KEY_MODULE_VERSION        = 'module_version';
    const KEY_CART_VERSION          = 'cart_version';
    const KEY_CARRIERS              = 'carriers';
    const KEY_DEFAULT_CURRENCY_ID   = 'default_currency_id';

    public static function getQrCode($hash)
    {
        $query = '';
        try {
            $query = self::getQueryResult(
                'SELECT `username`, `password` FROM `' . _DB_PREFIX_
                . "bridgeconnector_ma_users` WHERE `qr_code_hash` = '" . pSQL($hash) . "' AND `status` = 1"
            );
        } catch (EM1Exception $exception) {
            $exception->generateError();
        }

        if ($query) {
            include _PS_MODULE_DIR_ . '/bridgeconnector/views/qr_code.phtml';
            die();
        }

        self::generateResponse(array(), EM1Constants::RESPONSE_CODE_AUTH_ERROR);
    }

    public function getTokenValue($hash, $token = '')
    {
        if ($hash && !$token) {
            $token = EM1Access::getToken($hash);
            if ($token && EM1Access::checkToken($token)) {
                return array(self::KEY_TOKEN => $token);
            }
        }

        self::generateResponse(array(), EM1Constants::RESPONSE_CODE_AUTH_ERROR);
    }

    public function getStoreTitle($shopId = null)
    {
        if (empty($shopId) || $shopId < 1) {
            $shopId = (int)Configuration::get('PS_SHOP_DEFAULT');
        }

        $shop = new Shop($shopId);
        return array(self::KEY_STORE_TITLE => $shop->name);
    }

    public function getStores()
    {
        $shopGroup      = array();
        $showShopTree   = false;

        $defaultShopId      = (int)Configuration::get('PS_SHOP_DEFAULT');
        $defaultCurrencyId  = (int)Configuration::get('PS_CURRENCY_DEFAULT');
        foreach (Shop::getTree() as $shopGroupTree) {
            $shopGroupShops = array();

            foreach ($shopGroupTree[self::KEY_SHOPS] as $shop) {
                if ((int)$shop['active'] !== 1 || empty($shop['uri'])) {
                    continue;
                }

                $currencyId = (int)Configuration::get(
                    'PS_CURRENCY_DEFAULT',
                    null,
                    null,
                    (int)$shop['id_shop']
                );

                $dimensionUnit = (string)Configuration::get(
                    'PS_DIMENSION_UNIT',
                    null,
                    null,
                    (int)$shop['id_shop']
                );

                $weightUnit = (string)Configuration::get(
                    'PS_WEIGHT_UNIT',
                    null,
                    null,
                    (int)$shop['id_shop']
                );

                if (!empty($currencyId) && $defaultCurrencyId !== $currencyId) {
                    $defaultCurrencyId = $currencyId;
                }

                $shopGroupShops[] = [
                    self::KEY_SHOP_ID             => (int)$shop['id_shop'],
                    self::KEY_SHOP_GROUP_ID       => (int)$shop['id_shop_group'],
                    self::KEY_NAME                => (string)$shop['name'],
                    self::KEY_IS_DEFAULT          => $defaultShopId === (int)$shop['id_shop'],
                    self::KEY_DEFAULT_CURRENCY_ID => $defaultCurrencyId,
                    'dimension_unit'              => $dimensionUnit,
                    'weight_unit'                 => $weightUnit
                ];
            }

            if (empty($shopGroupShops)) {
                continue;
            }

            $shopGroup[] = array(
                self::KEY_SHOP_GROUP_ID     => (int)$shopGroupTree['id'],
                self::KEY_NAME              => (string)$shopGroupTree['name'],
                self::KEY_SHARE_ORDERS      => (bool)$shopGroupTree['share_order'],
                self::KEY_SHARE_CUSTOMERS   => (bool)$shopGroupTree['share_customer'],
                self::KEY_SHARE_STOCK       => (bool)$shopGroupTree['share_stock'],
                self::KEY_SHOPS             => $shopGroupShops
            );

            if (!$showShopTree) {
                $showShopTree = count($shopGroupShops) > 0;
            }
        }

        return array(
            self::KEY_SHOP_GROUPS       => $shopGroup,
            self::KEY_SHOW_SHOP_TREE    => $showShopTree && Shop::isFeatureActive()
        );
    }

    public function getCurrencies()
    {
        $currencyIds            = array();
        $currencyResult         = array();
        $currencies             = Currency::getCurrencies();

        $defaultCurrencyId      = (int)Configuration::get('PS_CURRENCY_DEFAULT');
        $i = 0;
        foreach ($currencies as $currency) {
            if (!in_array((int)$currency['id_currency'], $currencyIds, true)) {
                $currencyResult[$i]['code'] = (int)$currency['id_currency'];
                $currencyResult[$i]['symbol'] = !empty($sign = (string)$currency['sign'])
                    ? $sign
                    : (string)$currency['id_currency'];
                $currencyResult[$i]['name'] = (string)$currency['name'];
                $currencyResult[$i]['is_default_for_all_shops'] =
                    (bool)($defaultCurrencyId === (int)$currency['id_currency']);
                $currencyIds[] = (int)$currency['id_currency'];
                $i++;
            }
        }

        return array(self::KEY_CURRENCIES => $currencyResult);
    }

    public function getOrdersStatuses($langId)
    {
        $statuses = array();
        foreach (OrderState::getOrderStates($langId) as $status) {
            $statuses[] = array(
                self::KEY_ID        => (int)$status['id_order_state'],
                self::KEY_NAME      => (string)$status['name'],
                self::KEY_COLOR     => (string)$status['color']
            );
        }

        return array('order_statuses' => $statuses);
    }

    public function getLanguages()
    {
        $storeLanguagesResult = array();

        // Get field based on language
        $defaultLangId = (int)Configuration::get('PS_LANG_DEFAULT');
        foreach (Language::getLanguages() as $langValue) {
            $langId = (int)$langValue['id_lang'];
            $storeLanguagesResult[] = array(
                self::KEY_LANGUAGE_ID           => (int)$langValue['id_lang'],
                self::KEY_NAME                  => (string)$langValue['name'],
                self::KEY_ISO_CODE              => (string)$langValue['iso_code'],
                self::KEY_IS_DEFAULT            => (bool)($langId === $defaultLangId ? 1 : 0)
            );
        }

        return array(self::KEY_LANGUAGES => $storeLanguagesResult);
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    private function getCarriersData()
    {
        return self::getQueryResult(
            'SELECT c.`id_carrier`, c.`name`, c.`active`, c.`url`, cl.`id_lang`, cl.`id_shop`, cl.`delay`
            FROM `' . _DB_PREFIX_ . 'carrier` c
            LEFT JOIN `' . _DB_PREFIX_ . 'carrier_lang` cl ON (c.`id_carrier` = cl.`id_carrier`) AND cl.`id_shop` > 0
            ' . Shop::addSqlAssociation('carrier', 'c') . '
            WHERE c.`deleted` = 0 AND c.`active` = 1
            GROUP BY cl.`id_carrier`, cl.`id_lang`, cl.`id_shop`
            ORDER BY c.`position` ASC'
        );
    }

    /**
     * @return array
     * @throws EM1Exception
     */
    //todo: refactor this code in future
    public function getCarriers()
    {
        $carriersResponse = array();
        $carrierLanguageValues = array();
        $carrierData = $this->getCarriersData();
        foreach ($carrierData as $carrier) {
            if ((int)$carrier['id_lang'] === (int)Configuration::get('PS_LANG_DEFAULT')) {
                $carrierObject =  new Carrier((int)$carrier['id_carrier']);
                $carriersResponse[(int)$carrier['id_carrier']] = array(
                    'carrier_id'        => (int)$carrier['id_carrier'],
                    'name'              => (string)$carrierObject->name,
                    'status'            => (bool)$carrier['active'],
                    'url'               => (string)$carrier['url']
                );
            }

            $uniqueIdentifier = (int)$carrier['id_lang'].(int)$carrier['id_shop'];
            $carrierLanguageValues[(int)$carrier['id_carrier']]['language_values'][$uniqueIdentifier] = array(
                'shop_id'           => (int)$carrier['id_shop'],
                'language_id'       => (int)$carrier['id_lang'],
                'delay'             => (string)$carrier['delay']
            );
            $carriersResponse[(int)$carrier['id_carrier']]['language_values']
                = array_values($carrierLanguageValues[(int)$carrier['id_carrier']]['language_values']);
        }

        return array('carriers' => array_values($carriersResponse));
    }

    public function getCountries()
    {
        $countryResult = array();
        $languages = Language::getIDs();
        foreach ($languages as $languageId) {
            $countries = Country::getCountries((int)$languageId);
            foreach ($countries as $country) {
                $countryResult[] = array(
                    'id' => $country
                );
            }
        }

        return $countryResult;
    }

    public function getEmployees()
    {
        $employeesReturnData = array();
        $employees = Employee::getEmployees();
        foreach ($employees as $employee) {
            $employeesReturnData[] = array(
                'employee_id'   => (int)$employee['id_employee'],
                'first_name'    => (string)$employee['firstname'],
                'last_name'     => (string)$employee['lastname']
            );
        }

        return array('employees' => $employeesReturnData);
    }

    public function getTaxes()
    {
        $taxs = array();
        TaxRulesGroup::getTaxRulesGroupsForOptions();
        foreach (Language::getLanguages() as $langValue) {
            $langId = (int)$langValue['id_lang'];
            $tax = Tax::getTaxes($langId);
            $taxs[(int)$tax['id']] = array(
                'carrier_id'        => (int)$tax['id'],
                'name'              => (string)$tax['name'],
                'status'            => (string)$tax['status'],
            );

            $taxs[(int)$tax['id']]['language_values'][] = array(
                'shop_id'           => (int)$tax['shop_id'],
                'language_id'       => (int)$tax['language_id'],
                'delay'             => (string)$tax['delay']
            );
        }

        return array('tax' => array_values($taxs));
    }

    public static function getMaxFileUploadInBytes()
    {
        //select maximum upload size
        $max_upload = self::calculateBytes(ini_get('upload_max_filesize'));

        //select post limit
        $max_post = self::calculateBytes(ini_get('post_max_size'));

        //select memory limit
        $memory_limit = self::calculateBytes(ini_get('memory_limit'));

        // return the smallest of them, this defines the real limit
        return min($max_upload, $max_post, $memory_limit);
    }

    private static function calculateBytes($val)
    {
        $val = trim($val);
        $last = Tools::strtolower($val[Tools::strlen($val) - 1]);

        switch ($last) {
            case 'g':
                $val = (int)$val * 1024 * 1024 * 1024;
                break;
            case 'm':
                $val = (int)$val * 1024 * 1024;
                break;
            case 'k':
                $val = (int)$val * 1024;
                break;
        }

        return $val;
    }

    public function getVersions()
    {
        return array(
            self::KEY_MODULE_VERSION    => EM1Constants::MA_MODULE_REVISION,
            self::KEY_CART_VERSION      => _PS_VERSION_
        );
    }
}
