<?php
/**
 * csoft_invisible_recaptcha_v2 front-end module version 1.1.1 for Prestashop 1.7
 * Support contact : prestashop@comonsoft.com.
 *
 * NOTICE OF LICENSE
 *
 * This source file is the property of Com'onSoft
 * that is bundled with this package.
 * It is also available through the world-wide-web at this URL:
 * https://boutique.comonsoft.com/
 *
 * @category  front-end
 * @package   csoft_invisible_recaptcha_v2
 * @author    Com'onSoft (http://www.comonsoft.com/)
 * @copyright 2016-2020. Com'onSoft and contributors
 * @version   1.1.2
 */

use GeoIp2\Exception\AddressNotFoundException;
use MaxMind\Db\Reader\InvalidDatabaseException;

if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 *
 */
class ContactformOverride extends Contactform
{

    /**
     * {@inheritdoc}
     * @throws InvalidDatabaseException|AddressNotFoundException
     */
    public function renderWidget($hookName = null, array $configuration = [])
    {
        if (!$this->active) {
            return;
        }

        $widgetVariables = $this->getWidgetVariables($hookName, $configuration);
        $widgetVariables['geo_location_block'] = false;
        $record = null;

        try {
            $reader = new GeoIp2\Database\Reader(_PS_GEOIP_DIR_ . _PS_GEOIP_CITY_FILE_);
            $record = $reader->city(Tools::getRemoteAddr());
            // $record = $reader->city("62.108.15.61"); //Nederland
            // $record = $reader->city("81.242.255.41"); //Belgie
//            $record = $reader->city("2.17.191.255"); //Duitsland
        } catch (InvalidDatabaseException|AddressNotFoundException $e){
            if(Tools::getRemoteAddr() == '::1'){
                $widgetVariables['notifications']['messages'] = $e->getMessage();
                $widgetVariables['notifications']['nw_error'] = true;
                $widgetVariables['geo_location_block'] = true;

            }
        }

        if(($record == null && Tools::getRemoteAddr() != '::1') || ($record != null && !in_array(strtolower($record->country->isoCode), ['nl', 'be']))){
            $widgetVariables['notifications']['messages'] =  'Het is niet mogelijk dit formulier buiten Nederland of België te versturen.';
            $widgetVariables['notifications']['nw_error'] = true;
            $widgetVariables['geo_location_block'] = true;
        }

        $this->smarty->assign($widgetVariables);
        return $this->display(__FILE__, 'views/templates/widget/contactform.tpl');
    }

    public function sendMessage()
    {
        if (Module::isEnabled('csoft_invisible_recaptcha_v2')) {
            $data = array(
                'secret' => Tools::getValue('RECAPTCHA_PRIVATE_KEY', Configuration::get('RECAPTCHA_PRIVATE_KEY', Context::getContext()->language->id, null, Context::getContext()->shop->id, '')),
                'response' => $_POST['g-recaptcha-response']
            );
            $verify = curl_init();
            if (isset($verify) && $verify) {
                curl_setopt($verify, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
                curl_setopt($verify, CURLOPT_POST, true);
                curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
                curl_setopt($verify, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
                $response = @curl_exec($verify);
                curl_close($verify);
                $decode = json_decode($response, true);
                if (!$decode['success'] == true) {
                    $this->context->controller->errors[] = $this->trans('Form is invalid.', array(), 'Modules.Contactform.Shop');
                } else {
                    if (!empty(Tools::getValue('gebruikers_informatie_nummer'))) {
                        $this->context->controller->success[] = $this->trans(
                            'Your message has been successfully sent to our team.',
                            [],
                            'Modules.Contactform.Shop'
                        );
                    } else {
                        parent::sendMessage();
                    }
                }
            } else {
                $this->context->controller->errors[] = $this->trans('Error by sending message.', array(), 'Modules.Contactform.Shop');
            }
        } else {
            if (!empty(Tools::getValue('gebruikers_informatie_nummer'))) {
                $this->context->controller->success[] = $this->trans(
                    'Your message has been successfully sent to our team.',
                    [],
                    'Modules.Contactform.Shop'
                );
            } else {
                parent::sendMessage();
            }
        }
    }
}
