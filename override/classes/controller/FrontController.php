<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
class FrontController extends FrontControllerCore
{
    public function getTemplateVarShop()
    {
        $shop = parent::getTemplateVarShop();
        if (Module::isEnabled('wkwebp')
            && Configuration::get('WK_WEBP_ENABLE_MODULE')
            && Configuration::get('WK_WEBP_SHOW_SHOP_LOGO')) {
            $filename = Configuration::get('PS_LOGO', (int)Context::getContext()->language->id, (int)Context::getContext()->shop->id_shop_group, (int)Context::getContext()->shop->id);
            $lastDotPosition = strrpos(Configuration::get('PS_LOGO', (int)Context::getContext()->language->id, (int)Context::getContext()->shop->id_shop_group, (int)Context::getContext()->shop->id), '.');
            if ($lastDotPosition !== false) {
                $filename = substr($filename, 0, $lastDotPosition);
            }
            $shop['logo'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                'modules/wkwebp/views/img/store/'.$filename.'.webp';
            if (isset($shop['logo_details'])) {
                $shop['logo_details']['src'] = Tools::getShopDomainSsl(true, true) . __PS_BASE_URI__ .
                    'modules/wkwebp/views/img/store/'.$filename.'.webp';
            }
        }


        if (($new_default = $this->geolocationManagement($this->context->country)) && Validate::isLoadedObject($new_default)) {
            $this->context->country = $new_default;
        } elseif (!in_array(Tools::getRemoteAddr(), ['localhost', '127.0.0.1', '::1'])) {

        $reader = new GeoIp2\Database\Reader(_PS_GEOIP_DIR_ . _PS_GEOIP_CITY_FILE_);
        $record = $reader->city(Tools::getRemoteAddr());


            $countryText = $this->trans('Krijgt u dit bericht te zien dan krijgen wij u locatie niet correct door.', [], 'Shop.Theme.Global');
            if (isset($record->country->isoCode) && $record->country->isoCode) {
                $countryName = '';
                $countryId = Country::getByIso($record->country->isoCode);
                if(!empty($countryId)){
                    $countryName = Country::getNameById($countryId, $this->context->language->id);
                }
                $countryText = $this->trans('Wij leveren niet in', [], 'Shop.Theme.Global').' '.$countryName.'. ';
            }

            $this->context->smarty->assign('geoip_msg','<div class="text-center">Wij leveren alleen binnen Nederland en Belgie. Om dit extra te beveiliging maken wij gebruik van geolocatie.<br/>
                Hierdoor is de bestelmogelijkheid alleen beschikbaar voor klanten uit Nederland & Belgie<br/>
                <h5>'.$countryText.'</h5>Maakt u gebruik van een VPN-verbinding of iets dergelijks, schakel deze dan uit om te kunnen bestellen.</div>');
                        }

        return $shop;
    }



    /**
     * Geolocation management.
     *
     * @param Country $defaultCountry
     *
     * @return Country|false
     */
    public function geolocationManagement($defaultCountry)
    {
        if (!in_array(Tools::getRemoteAddr(), ['127.0.0.1', '::1']) && !Tools::isPHPCLI()) {
            /* Check if Maxmind Database exists */
            if (@filemtime(_PS_GEOIP_DIR_ . _PS_GEOIP_CITY_FILE_)) {
                if (!in_array(strtoupper($this->context->cookie->iso_code_country), explode(';', Configuration::get('PS_ALLOWED_COUNTRIES')))) {
                    $reader = new GeoIp2\Database\Reader(_PS_GEOIP_DIR_ . _PS_GEOIP_CITY_FILE_);

                    try {
                        $record = $reader->city(Tools::getRemoteAddr());
                    } catch (\GeoIp2\Exception\AddressNotFoundException $e) {
                        $record = null;
                    }

                    if (is_object($record) && Validate::isLanguageIsoCode($record->country->isoCode) && (int) Country::getByIso(strtoupper($record->country->isoCode)) != 0) {
                        if (!in_array(strtoupper($record->country->isoCode), explode(';', Configuration::get('PS_ALLOWED_COUNTRIES'))) && !FrontController::isInWhitelistForGeolocation()) {
                            if (Configuration::get('PS_GEOLOCATION_BEHAVIOR') == _PS_GEOLOCATION_NO_CATALOG_) {
                                $this->restrictedCountry = Country::GEOLOC_FORBIDDEN;
                            } elseif (Configuration::get('PS_GEOLOCATION_BEHAVIOR') == _PS_GEOLOCATION_NO_ORDER_) {
                                $this->restrictedCountry = Country::GEOLOC_CATALOG_MODE;
                            }
                        } else {
                            $hasBeenSet = !isset($this->context->cookie->iso_code_country);
                            $this->context->cookie->iso_code_country = strtoupper($record->country->isoCode);
                        }
                    }
                }

                if (isset($this->context->cookie->iso_code_country) && $this->context->cookie->iso_code_country && !Validate::isLanguageIsoCode($this->context->cookie->iso_code_country)) {
                    $this->context->cookie->iso_code_country = Country::getIsoById((int) Configuration::get('PS_COUNTRY_DEFAULT'));
                }

                if (isset($this->context->cookie->iso_code_country) && ($idCountry = (int) Country::getByIso(strtoupper($this->context->cookie->iso_code_country)))) {
                    /* Update defaultCountry */
                    if ($defaultCountry->iso_code != $this->context->cookie->iso_code_country) {
                        $defaultCountry = new Country($idCountry);
                    }
                    if (isset($hasBeenSet) && $hasBeenSet) {
                        $this->context->cookie->id_currency = (int) ($defaultCountry->id_currency ? (int) $defaultCountry->id_currency : Currency::getDefaultCurrencyId());
                    }

                    return $defaultCountry;
                } elseif (Configuration::get('PS_GEOLOCATION_NA_BEHAVIOR') == _PS_GEOLOCATION_NO_CATALOG_ && !FrontController::isInWhitelistForGeolocation()) {
                    $this->restrictedCountry = Country::GEOLOC_FORBIDDEN;
                } elseif (Configuration::get('PS_GEOLOCATION_NA_BEHAVIOR') == _PS_GEOLOCATION_NO_ORDER_ && !FrontController::isInWhitelistForGeolocation()) {
                    $this->restrictedCountry = Country::GEOLOC_CATALOG_MODE;
                }
            }
        }

        $this->context->cookie->is_restricted_country = $this->restrictedCountry;

        return false;
    }

}
