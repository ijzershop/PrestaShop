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
  if ($('.contact-form form').length > 0) {
    $('.contact-form form').submit();
  }

  if ($('form.js-customer-form').length > 0) {
    $('form.js-customer-form').submit();
  }
};

var onloadCallback = function() {

  if ($('form button[name=submitMessage]').length > 0) {
    $('form button[name=submitMessage]').attr('id','submitMessage');
    if($('form button[name=submitMessage]').attr('disabled') == 'disabled'){
        grecaptcha.render('submitMessage', {
            'sitekey' : recaptchaKey,
            'callback' : onSubmit
        });
        $('form button[name=submitMessage]').attr('disabled','disabled');
        $('#content-wrapper form').append('<input type="hidden" name="submitMessage">');
    }else {
        grecaptcha.render('submitMessage', {
          'sitekey': recaptchaKey,
          'callback': onSubmit
        });
        $('#content-wrapper form').append('<input type="hidden" name="submitMessage">');
      }
    }
};

$(document).ready(function() {
    $('form button[name=submitMessage]').attr('id','submitMessage');
});

