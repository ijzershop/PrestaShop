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
if (!defined('_PS_VERSION_')) {
    exit;
}
class ContactformOverride extends Contactform {
    public function sendMessage()
    {
        $data = array(
            'secret' => Tools::getValue('RECAPTCHA_PRIVATE_KEY', Configuration::get('RECAPTCHA_PRIVATE_KEY', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')),
            'response' => $_POST['g-recaptcha-response']
        );
        $verify = curl_init();
        if(isset($verify) && $verify){
            curl_setopt($verify, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
            curl_setopt($verify, CURLOPT_POST, true);
            curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
            curl_setopt($verify, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
            $response = @curl_exec($verify);
            curl_close($verify);
            $decode = json_decode($response, true);
            if (!$decode['success'] == true) {
                $this->context->controller->errors[] = $this->trans('Formulaire invalide.', array(), 'Modules.Contactform.Shop');
            }else{
                parent::sendMessage();
            }
        }else{
            $this->context->controller->errors[] = $this->trans('Erreur de traitement.', array(), 'Modules.Contactform.Shop');
        }
    }
}
