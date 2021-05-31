/*
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

var onSubmit = function(token) {
    $('form#customer-form').submit();
};

var onloadCallback = function() {
    if($('form button[data-link-action=save-customer]').attr('disabled') == 'disabled'){
        if($('#submitCreate').length) {
          grecaptcha.render('submitCreate', {
            'sitekey': recaptchaKey,
            'callback': onSubmit
          });
        }
        $('form button[data-link-action=save-customer]').attr('disabled','disabled');
    }else{
      if($('#submitCreate').length) {
        grecaptcha.render('submitCreate', {
          'sitekey': recaptchaKey,
          'callback': onSubmit
        });
      }
    }


};

$(document).ready(function() {
    $('form button[data-link-action=save-customer]').attr('id','submitCreate');
});

